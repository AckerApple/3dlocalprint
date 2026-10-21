import { createHash, randomBytes } from "node:crypto";
export class CheckoutLinkError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
const unavailable = (): never => { throw new CheckoutLinkError(404, "Checkout link unavailable or expired."); };
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
const shortReference = () => {
  const alphabet="0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  let value=BigInt("0x"+randomBytes(5).toString("hex"));let text="";
  for(let i=0;i<8;i++){text=alphabet[Number(value&31n)]+text;value>>=5n;}
  return "LP-"+text;
};
const orderIdValid = (id: string) => /^custom_[a-f0-9]{32}$/.test(id);
export const CHECKOUT_LINK_TTL_MS = 7 * 24 * 3600000;

// Server-managed records: never readable/writable through browser Firestore.
export async function checkoutRateLimit(db: any, identity: string, operation: string, limit: number) {
  const bucket = Math.floor(Date.now() / 60000);
  const ref = db.collection("checkout_rate_limits").doc(hash(operation + ":" + identity));
  await db.runTransaction(async (tx: any) => {
    const previous=(await tx.get(ref)).data();
    const count = previous?.bucket===bucket?Number(previous.count||0):0;
    if (count >= limit) throw new CheckoutLinkError(429, "Too many checkout requests. Try again shortly.");
    tx.set(ref, { bucket, count: count + 1, expiresAt: new Date((bucket + 120) * 60000).toISOString() });
  });
}

export async function resolveCheckoutToken(db: any, token: unknown) {
  if (typeof token !== "string" || !/^[A-Za-z0-9_-]{22}$/.test(token)) return unavailable();
  const digest = hash(token);
  const link = (await db.collection("checkout_links").doc(digest).get()).data();
  if (!link || link.revokedAt || !Number.isFinite(Date.parse(link.expiresAt)) || Date.parse(link.expiresAt) <= Date.now() || !orderIdValid(link.orderId)) return unavailable();
  const order = (await db.collection("orders").doc(link.orderId).get()).data();
  if (!order || order.orderType !== "custom_order" || order.stripeMode !== link.stripeMode) return unavailable();
  const active = (await db.collection("checkout_link_admin").doc(link.orderId).get()).data();
  if (active?.tokenHash !== digest || active.revokedAt || active.version !== link.version) return unavailable();
  return { orderId: link.orderId, sessionId: order.checkoutLinkSessionId || order.checkoutSessionId, order, tokenHash: digest };
}

export async function manageCheckoutLink(db: any, id: string, action: "get" | "issue" | "revoke", actor: string) {
  if (!orderIdValid(id)) return unavailable();
  const ref = db.collection("orders").doc(id);
  const adminRef = db.collection("checkout_link_admin").doc(id);
  // Each transaction attempt gets fresh randomness; atomic create detects even an improbable collision.
  for (let attempt = 0; attempt < 5; attempt++) {
    const token = randomBytes(16).toString("base64url");
    const reference = shortReference();
    const digest = hash(token);
    const linkRef = db.collection("checkout_links").doc(digest);
    const referenceRef = db.collection("order_reference_index").doc(reference);
    try {
      return await db.runTransaction(async (tx: any) => {
        const order = (await tx.get(ref)).data();
        const active = (await tx.get(adminRef)).data();
        if (!order || order.orderType !== "custom_order" || !["live", "sandbox"].includes(order.stripeMode)) return unavailable();
        const live = active && !active.revokedAt && Date.parse(active.expiresAt) > Date.now();
        const result = (value: any) => ({ checkoutUrl: "https://3dlocalprint.com/pay/#" + value.token, customerReference: value.customerReference, expiresAt: value.expiresAt, stripeMode: order.stripeMode });
        if (action === "get") { if (!live) return unavailable(); return result(active); }
        if (action === "revoke") {
          if (active && !active.revokedAt) {
            const revokedAt = new Date().toISOString();
            tx.set(db.collection("checkout_links").doc(active.tokenHash), { revokedAt, revokedBy: actor }, { merge: true });
            tx.set(adminRef, { revokedAt, revokedBy: actor }, { merge: true });
          }
          return { revoked: true, legacyLinkUnchanged: true, activePaymentUnchanged: true };
        }
        if (live) return result(active); // Copying again neither rotates nor extends access.
        if (["closed", "canceled"].includes(order.status)) throw new CheckoutLinkError(409, "Closed orders cannot issue payment links.");
        const [collision, referenceCollision] = await Promise.all([tx.get(linkRef), tx.get(referenceRef)]);
        if (collision.exists || (!order.customerReference && referenceCollision.exists)) throw Error("checkout_link_collision");
        const customerReference = order.customerReference || reference;
        const createdAt = new Date().toISOString();
        const expiresAt = new Date(Date.now() + CHECKOUT_LINK_TTL_MS).toISOString();
        const version = Number(active?.version || 0) + 1;
        tx.create(linkRef, { orderId: id, stripeMode: order.stripeMode, version, createdAt, expiresAt, revokedAt: "", createdBy: actor });
        // Raw token is kept only in a server-only admin record so authorized admins can copy the same link again.
        tx.set(adminRef, { token, tokenHash: digest, customerReference, version, createdAt, expiresAt, revokedAt: "", createdBy: actor });
        if (!order.customerReference) { tx.create(referenceRef, { orderId: id, createdAt }); tx.set(ref, { customerReference }, { merge: true }); }
        return result({ token, customerReference, expiresAt });
      });
    } catch (error) { if (!(error instanceof Error) || error.message !== "checkout_link_collision") throw error; }
  }
  throw new CheckoutLinkError(503, "Could not allocate a unique checkout link. Try again.");
}
