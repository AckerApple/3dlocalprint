import {createHash, randomBytes, timingSafeEqual} from "node:crypto";
export const INTEGRATION_SCOPES = ["catalog:read", "orders:create", "orders:read-own"] as const;
export type IntegrationScope = typeof INTEGRATION_SCOPES[number];
export type IntegrationGrant = {
  ownerEmail: string; label: string; tokenHash: string; scopes: IntegrationScope[];
  expiresAt: string; createdAt: string; revokedAt: string;
  allowedProductIds: string[]; allowedModes: ("sandbox" | "live")[];
  currency: "usd"; maxOrderAmount: number; maxTotalAmount: number; maxOrders: number; maxQuantity: number;
  orderCount: number; reservedAmount: number;
};
export class IntegrationError extends Error {
  constructor(public status: number, public code: string) { super(code); }
}
const fail = (status: number, code: string): never => {throw new IntegrationError(status,code);};
const integer = (x: unknown, min: number, max: number) => typeof x === "number" && Number.isSafeInteger(x) && x >= min && x <= max;
const hash = (x: string) => createHash("sha256").update(x).digest("hex");
export function parseIntegrationToken(header: string): {id: string; tokenHash: string} {
  const match = /^Bearer (3dlp_([a-f0-9]{32})_[A-Za-z0-9_-]{43})$/.exec(header);
  if (!match) return fail(401,"integration_token_invalid");
  return {id:match[2],tokenHash:hash(match[1])};
}
export function verifyIntegrationGrant(raw: any, presentedHash: string, scope: IntegrationScope, now = Date.now()): asserts raw is IntegrationGrant {
  if (!raw || !/^[a-f0-9]{64}$/.test(raw.tokenHash || "") || !/^[a-f0-9]{64}$/.test(presentedHash)
    || !timingSafeEqual(Buffer.from(raw.tokenHash,"hex"),Buffer.from(presentedHash,"hex"))
    || raw.revokedAt || !Number.isFinite(Date.parse(raw.expiresAt)) || Date.parse(raw.expiresAt) <= now) return fail(401,"integration_token_invalid");
  if (!Array.isArray(raw.scopes) || !raw.scopes.includes(scope)) return fail(403,"integration_scope_denied");
}
export function buildIntegrationGrant(body: any, ownerEmail: string, id: string, now = Date.now()): {token: string; grant: IntegrationGrant} {
  const scopes = Array.isArray(body.scopes) ? [...new Set(body.scopes)] : [];
  const products = Array.isArray(body.allowedProductIds) ? [...new Set(body.allowedProductIds)] : [];
  const modes = Array.isArray(body.allowedModes) ? [...new Set(body.allowedModes)] : [];
  if (!scopes.length || !scopes.every(x=>INTEGRATION_SCOPES.includes(x as IntegrationScope))
    || !products.length || products.length > 20 || !products.every(x=>typeof x === "string" && /^[a-zA-Z0-9_-]{1,200}$/.test(x))
    || !modes.length || !modes.every(x=>x === "live" || x === "sandbox")
    || !integer(body.expiresInMinutes,5,43200) || !integer(body.maxOrderAmount,1,1000000)
    || !integer(body.maxTotalAmount,body.maxOrderAmount,1000000) || !integer(body.maxOrders,1,1000)
    || !integer(body.maxQuantity,1,100) || body.currency !== "usd"
    || typeof body.label !== "string" || !body.label.trim() || body.label.length > 80) return fail(400,"integration_policy_invalid");
  const token = `3dlp_${id}_${randomBytes(32).toString("base64url")}`;
  return {token,grant:{ownerEmail,label:body.label.trim(),tokenHash:hash(token),scopes:scopes as IntegrationScope[],
    allowedProductIds:products as string[],allowedModes:modes as ("sandbox"|"live")[],currency:"usd",
    maxOrderAmount:body.maxOrderAmount,maxTotalAmount:body.maxTotalAmount,maxOrders:body.maxOrders,maxQuantity:body.maxQuantity,
    expiresAt:new Date(now+body.expiresInMinutes*60000).toISOString(),createdAt:new Date(now).toISOString(),revokedAt:"",orderCount:0,reservedAmount:0}};
}
export function assertIntegrationOrder(grant: IntegrationGrant, body: any, lines: {productId:string;quantity:number;unitAmount:number;currency:string}[], shipping: number, mode: string) {
  const allowedKeys = ["customerName","customerEmail","cartItems","amountShipping","stripeMode","expectedAmountTotal"];
  if (!body || Object.keys(body).some(x=>!allowedKeys.includes(x)) || !["live","sandbox"].includes(body.stripeMode)
    || !Array.isArray(body.cartItems) || !body.cartItems.length || body.cartItems.length > 100
    || body.cartItems.some((x:any)=>!x || Object.keys(x).some(k=>!["productId","variationId","badgeName","quantity"].includes(k)) || !integer(x.quantity,1,100))
    || (body.amountShipping !== undefined && !integer(body.amountShipping,0,1000000))) return fail(400,"integration_order_invalid");
  const total = lines.reduce((sum,x)=>sum+x.unitAmount*x.quantity,0)+shipping;
  if (body.expectedAmountTotal !== undefined && (!integer(body.expectedAmountTotal,1,1000000) || body.expectedAmountTotal !== total)) return fail(409,"integration_quote_changed");
  if (!grant.allowedModes.includes(mode as "live"|"sandbox") || lines.some(x=>!grant.allowedProductIds.includes(x.productId) || x.currency!==grant.currency)
    || lines.reduce((sum,x)=>sum+x.quantity,0)>grant.maxQuantity || total>grant.maxOrderAmount) return fail(403,"integration_limit_denied");
}
export function reserveIntegrationOrder(grant: IntegrationGrant, amount: number) {
  if (!integer(grant.orderCount,0,1000) || !integer(grant.reservedAmount,0,1000000)
    || grant.orderCount >= grant.maxOrders || grant.reservedAmount + amount > grant.maxTotalAmount) return fail(403,"integration_budget_exhausted");
  return {orderCount:grant.orderCount+1,reservedAmount:grant.reservedAmount+amount};
}
export function integrationSummary(id:string, grant:IntegrationGrant) {
  const {tokenHash, ...metadata}=grant;
  return {id,...metadata};
}
