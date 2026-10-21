import {CheckoutStateError,prepareExistingOrderCheckout,retireExistingOrderCheckout,beginCheckoutTransition,releaseCheckoutTransition,expireUnpaidCheckout,checkoutFingerprint} from "./orderCheckoutService";
import { ownsCheckout, publicOrderCheckout } from "./orderCheckoutSupport";
import { IntegrationError, parseIntegrationToken, verifyIntegrationGrant, buildIntegrationGrant, assertIntegrationOrder, reserveIntegrationOrder, integrationSummary, type IntegrationGrant } from "./orderIntegrationSupport";
import { customOrderRequestId, customerCollection, verifiedCustomerName, assertCurrentPaidSession, decodeOrderImage } from "./customOrderSupport";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions";
import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { createHash, randomBytes } from "node:crypto";
import tls from "node:tls";
import Stripe from "stripe";
import {
  buildAgreementPaymentNotificationEmail as renderAgreementPaymentNotificationEmail,
  buildAgreementSignRequestEmail as renderAgreementSignRequestEmail,
  buildCustomerModelLinkQuoteEmail as renderCustomerModelLinkQuoteEmail,
  buildCustomerOrderEmail as renderCustomerOrderEmail,
  buildModelLinkQuoteRequestEmail as renderModelLinkQuoteRequestEmail,
  buildOrganizationCheckoutRequestEmail as renderOrganizationCheckoutRequestEmail,
  buildOrderNotificationEmail as renderOrderNotificationEmail,
} from "./notificationTemplates";

const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");
const STRIPE_TEST_SECRET_KEY = defineSecret("STRIPE_TEST_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");
const SMTP_USER = defineSecret("SMTP_USER");
const SMTP_PASS = defineSecret("SMTP_PASS");
const ORDER_NOTIFICATION_EMAIL = "service@3dlocalprint.com";
const CUSTOM_ORDER_TYPE = "custom_order";
const PUBLIC_SITE_ORIGIN = "https://3dlocalprint.com";
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);
const ALLOWED_CORS_ORIGINS = [
  "https://3dlocalprint.com",
  "https://www.3dlocalprint.com",
  /^http:\/\/localhost(?::\d+)?$/,
];

type CheckoutCartItem = {
  badgeName?: string;
  quantity: number;
  productId: string;
  variationId?: string;
};

type CreateCheckoutSessionBody = {
  cartItems: CheckoutCartItem[];
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  organizationEmail?: string;
  exemptionCertificateNumber?: string;
};

type OrganizationCheckoutRequestBody = {
  organizationName: string;
  organizationType: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  exemptionCertificateNumber: string;
  certificateExpirationDate: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  intendedUse: string;
  certificationAccepted: boolean;
  certificateFileName: string;
  certificateMimeType: string;
  certificateBase64: string;
};

type OrganizationCheckoutRequestEmailInput = {
  requestId: string;
  organizationName: string;
  organizationType: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  exemptionCertificateNumber: string;
  certificateExpirationDate: string;
  intendedUse: string;
  adminReviewUrl: string;
  createdAt: string;
};

type ProductVariation = {
  id: string;
  label: string;
  unitAmount: number;
  active: boolean;
};

type ProductItem = {
  slug?: string;
  id: string;
  title: string;
  active: boolean;
  catalogVisible: boolean;
  unitAmount: number;
  currency: string;
  variations?: ProductVariation[];
};

type CheckoutLineItem = {
  badgeName?: string;
  productId: string;
  variationId: string;
  quantity: number;
  title: string;
  unitAmount: number;
  currency: string;
};

type OrderNotificationInput = {
  orderId: string;
  status: string;
  lineItems: CheckoutLineItem[];
  currency: string;
  amountSubtotal: number;
  amountTax: number;
  amountShipping: number;
  amountTotal: number;
  customerEmail: string;
  customerName: string;
  stripeMode: "sandbox" | "live";
  adminOrderUrl: string;
  publicOrderUrl: string;
  stripeDashboardUrl: string;
};

type ModelLinkQuoteRequestInput = {
  requestId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  marketingOptIn: boolean;
  modelItems: ModelLinkQuoteRequestItem[];
  modelLinks: string[];
  projectDetails: string;
  quantity: number;
  pageUrl: string;
  publicReviewUrl: string;
  adminReviewUrl: string;
  createdAt: string;
};

type ModelLinkQuoteRequestItem = {
  url: string;
  quantity: number;
};

type AgreementSignRequestInput = {
  agreementId: string;
  clientBusiness: string;
  clientRepresentative: string;
  customerEmail: string;
  providerName: string;
  serviceStartDate: string;
  serviceEndDate: string;
  yearlyAmount: number;
  currency: string;
  publicAgreementUrl: string;
};

type AgreementPaymentNotificationInput = {
  agreementId: string;
  clientBusiness: string;
  customerEmail: string;
  customerName: string;
  acceptedSignerName: string;
  paidAt: string;
  amountTotal: number;
  currency: string;
  orderId: string;
  stripeMode: "sandbox" | "live" | "";
  adminAgreementUrl: string;
  adminOrderUrl: string;
  publicAgreementUrl: string;
  stripeDashboardUrl: string;
};

type AgreementServiceItem = {
  label: string;
  description: string;
  included: boolean;
  monthlyValue: number;
  yearlyCost: number;
};

type AgreementRecordInput = {
  id: string;
  agreementTemplateId: string;
  agreementVersion: string;
  status: string;
  clientBusiness: string;
  clientRepresentative: string;
  customerEmail: string;
  providerName: string;
  effectiveDate: string;
  paymentDueDate: string;
  serviceStartDate: string;
  serviceEndDate: string;
  yearlyAmount: number;
  currency: string;
  termsMarkdown: string;
  services: AgreementServiceItem[];
  totalSelectedServices: number;
  totalMonthlyValue: number;
  privateToken: string;
  publicAgreementUrl: string;
  acceptedSignerName: string;
  acceptedAt: string;
  acceptedIp: string;
  acceptedUserAgent: string;
  acceptedBrowserMeta: Record<string, string>;
  orderId: string;
  checkoutSessionId: string;
  checkoutUrl: string;
  paidAt: string;
  amountTotal: number;
  stripeDashboardUrl: string;
  renewalReminderStatus: string;
  renewalReminderSentAt: string;
  createdAt: string;
  updatedAt: string;
};

const AGREEMENT_ORDER_TYPE = "website_technical_services";
const WEBSITE_SERVICES_AGREEMENT_TEMPLATE_ID = "dds-sweet-shack-website-technical-services";
const CUSTOM_WEBSITE_SERVICES_AGREEMENT_TEMPLATE_ID = "custom-website-technical-services";
const WEBSITE_SERVICES_AGREEMENT_VERSION = "website-technical-services-2026-01";
const WEBSITE_SERVICES_CURRENT_AGREEMENT_ID = "agreement_dds_sweet_shack_current";
const WEBSITE_SERVICES_AGREEMENT_SERVICES: AgreementServiceItem[] = [
  {
    label: "Email Order Notifications",
    description: "Automated email notifications for website-submitted order requests, customer inquiries, and product requests. Delivery can be affected by third-party email systems, spam filtering, and customer mail settings.",
    included: true,
    monthlyValue: 500,
    yearlyCost: 6000,
  },
  {
    label: "Admin Login System",
    description: "Protected admin access for approved business users to manage site information. This does not include customer accounts, customer dashboards, or public customer login access.",
    included: true,
    monthlyValue: 500,
    yearlyCost: 6000,
  },
  {
    label: "Image Storage",
    description: "Storage for product, catalog, and website images used by the client website. This is not intended for unrelated file storage, backups, video hosting, or excessive unrelated uploads.",
    included: true,
    monthlyValue: 500,
    yearlyCost: 6000,
  },
  {
    label: "Live Product Catalog",
    description: "A live website product catalog that can be updated through the website system and shown to customers with current product information supplied by the client.",
    included: true,
    monthlyValue: 500,
    yearlyCost: 6000,
  },
];

function getDefaultAgreementServiceDescription(label = ""): string {
  const normalizedLabel = label.toLowerCase();
  if (normalizedLabel.includes("email")) {
    return "Automated email notifications for website-submitted order requests, customer inquiries, and product requests. Delivery can be affected by third-party email systems, spam filtering, and customer mail settings.";
  }
  if (normalizedLabel.includes("order tracking")) {
    return "Customer-facing order lookup or tracking features for checking order status online.";
  }
  if (normalizedLabel.includes("admin")) {
    return "Protected admin access for approved business users to manage site information. This does not include customer accounts, customer dashboards, or public customer login access.";
  }
  if (normalizedLabel.includes("image")) {
    return "Storage for product, catalog, and website images used by the client website. This is not intended for unrelated file storage, backups, video hosting, or excessive unrelated uploads.";
  }
  if (normalizedLabel.includes("catalog")) {
    return "A live website product catalog that can be updated through the website system and shown to customers with current product information supplied by the client.";
  }
  return "";
}

function getStripeClient(): Stripe {
  return new Stripe(STRIPE_SECRET_KEY.value(), {
    // Keep aligned with Stripe account API versioning strategy.
    apiVersion: "2026-02-25.clover" as Stripe.LatestApiVersion,
  });
}

function getStripeClientForMode(mode: "sandbox" | "live"): Stripe {
  const secretKey = mode === "sandbox" ? STRIPE_TEST_SECRET_KEY.value() : STRIPE_SECRET_KEY.value();
  const expectedPrefix = mode === "sandbox" ? "sk_test_" : "sk_live_";
  if (!secretKey.startsWith(expectedPrefix)) {
    throw new Error(mode === "sandbox" ? "stripe_test_mode_unavailable" : "stripe_live_mode_unavailable");
  }
  return new Stripe(secretKey, {
    apiVersion: "2026-02-25.clover" as Stripe.LatestApiVersion,
  });
}

function getStripeMode(): "sandbox" | "live" {
  return STRIPE_SECRET_KEY.value().startsWith("sk_test_") ? "sandbox" : "live";
}

function isLocalRequest(request: { header: (name: string) => string | undefined }): boolean {
  const source = request.header("origin") || request.header("referer") || "";
  if (!source) return false;
  try {
    return LOCAL_HOSTNAMES.has(new URL(source).hostname);
  } catch {
    return false;
  }
}

function getAdminDb() {
  if (!getApps().length) {
    initializeApp();
  }
  return getFirestore();
}

function getAdminAuth() {
  if (!getApps().length) {
    initializeApp();
  }
  return getAuth();
}

function getAdminBucket() {
  if (!getApps().length) {
    initializeApp();
  }
  return getStorage().bucket();
}

function createOrderId(): string {
  return `order_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function createQuoteRequestId(): string {
  return `quote_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function createAgreementId(): string {
  return `agreement_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

function formatDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addYears(date: Date, years: number): Date {
  const next = new Date(date);
  next.setFullYear(next.getFullYear() + years);
  return next;
}

function createPrivateToken(): string {
  return randomBytes(24).toString("base64url");
}

function appendUrlParams(sourceUrl: string, params: Record<string, string>): string {
  const url = new URL(sourceUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });
  return url.toString().replace("%7BCHECKOUT_SESSION_ID%7D", "{CHECKOUT_SESSION_ID}");
}

function getOriginFromUrl(sourceUrl: string): string {
  try {
    const origin = new URL(sourceUrl).origin;
    if (origin === "https://threedlocalprint.web.app" || origin === "https://threedlocalprint.firebaseapp.com") {
      return PUBLIC_SITE_ORIGIN;
    }
    return origin;
  } catch {
    return PUBLIC_SITE_ORIGIN;
  }
}

function getAdminOrderUrl(sourceUrl: string, orderId: string): string {
  const url = new URL("/admin/orders/index.html", getOriginFromUrl(sourceUrl));
  url.searchParams.set("orderId", orderId);
  return url.toString();
}

function getCanonicalAdminOrderUrl(orderId: string, storedUrl = ""): string {
  try {
    const url = new URL(storedUrl || getAdminOrderUrl(PUBLIC_SITE_ORIGIN, orderId));
    if (url.hostname === "threedlocalprint.web.app" || url.hostname === "threedlocalprint.firebaseapp.com") {
      return getAdminOrderUrl(PUBLIC_SITE_ORIGIN, orderId);
    }
    return url.toString();
  } catch {
    return getAdminOrderUrl(PUBLIC_SITE_ORIGIN, orderId);
  }
}

function getPublicOrderUrl(sourceUrl: string, orderId: string, customerEmail = ""): string {
  const url = new URL("/order.html", getOriginFromUrl(sourceUrl));
  url.searchParams.set("order_id", orderId);
  if (customerEmail) {
    url.searchParams.set("email", customerEmail);
  }
  return url.toString();
}

function getModelLinkQuotePublicUrl(sourceUrl: string, requestId: string, customerEmail = ""): string {
  const url = new URL("/print-model-link-order.html", getOriginFromUrl(sourceUrl));
  url.searchParams.set("request_id", requestId);
  if (customerEmail) {
    url.searchParams.set("email", customerEmail);
  }
  return url.toString();
}

function getModelLinkQuoteAdminUrl(sourceUrl: string, requestId: string): string {
  const url = new URL("/admin/link-orders/index.html", getOriginFromUrl(sourceUrl));
  url.searchParams.set("requestId", requestId);
  return url.toString();
}

function getAgreementPublicUrl(token: string, sourceUrl = PUBLIC_SITE_ORIGIN): string {
  const url = new URL("/agreement.html", getOriginFromUrl(sourceUrl));
  url.searchParams.set("token", token);
  return url.toString();
}

function getAgreementAdminUrl(agreementId: string, sourceUrl = PUBLIC_SITE_ORIGIN): string {
  const url = new URL("/admin/agreements/index.html", getOriginFromUrl(sourceUrl));
  url.searchParams.set("agreementId", agreementId);
  return url.toString();
}

function getCanonicalPublicOrderUrl(orderId: string, customerEmail = "", storedUrl = ""): string {
  try {
    const url = new URL(storedUrl || getPublicOrderUrl(PUBLIC_SITE_ORIGIN, orderId, customerEmail));
    if (url.hostname === "threedlocalprint.web.app" || url.hostname === "threedlocalprint.firebaseapp.com") {
      return getPublicOrderUrl(PUBLIC_SITE_ORIGIN, orderId, customerEmail);
    }
    if (!url.searchParams.get("email") && customerEmail) {
      url.searchParams.set("email", customerEmail);
    }
    return url.toString();
  } catch {
    return getPublicOrderUrl(PUBLIC_SITE_ORIGIN, orderId, customerEmail);
  }
}

function formatMoney(cents = 0, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "usd").toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((Math.max(0, Number(cents) || 0)) / 100);
}

function normalizeEmail(email = ""): string {
  return String(email || "").trim().toLowerCase();
}

function normalizeCertificateNumber(value = ""): string {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 80);
}

function organizationLookupId(email = "", certificateNumber = ""): string {
  return createHash("sha256")
    .update(`${normalizeEmail(email)}|${normalizeCertificateNumber(certificateNumber)}`)
    .digest("hex");
}

async function getApprovedOrganization(email = "", certificateNumber = "") {
  const lookupId = organizationLookupId(email, certificateNumber);
  if (!normalizeEmail(email) || !normalizeCertificateNumber(certificateNumber)) return null;
  const lookup = await getAdminDb().collection("organization_checkout_lookups").doc(lookupId).get();
  if (!lookup.exists) return null;
  const requestId = String(lookup.data()?.requestId || "").trim();
  const request = requestId
    ? await getAdminDb().collection("organization_checkout_requests").doc(requestId).get()
    : null;
  if (!request?.exists) return null;
  const data = request.data() || {};
  if (String(data.status || "") !== "approved" || !String(data.stripeCustomerId || "").trim()) return null;
  const expiration = String(data.certificateExpirationDate || "").trim();
  if (expiration && new Date(`${expiration}T23:59:59`).getTime() < Date.now()) return null;
  return { id: request.id, data };
}

async function isAdminEmail(email = ""): Promise<boolean> {
  const snapshot = await getAdminDb().collection("admins").doc("list").get();
  const data = snapshot.exists ? snapshot.data() : null;
  const admins = Array.isArray(data?.items) ? data.items : [];
  return admins.map((item) => normalizeEmail(String(item || ""))).includes(normalizeEmail(email));
}

async function requireAdmin(request: { header: (name: string) => string | undefined }): Promise<string> {
  const authorization = request.header("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    throw new Error("missing_auth_token");
  }

  const decoded = await getAdminAuth().verifyIdToken(match[1]);
  const email = String(decoded.email || "").trim();
  if (!email || !(await isAdminEmail(email))) {
    throw new Error("admin_denied");
  }
  return email;
}

function getSmtpSecret(secret: ReturnType<typeof defineSecret>, envKey: string): string {
  try {
    return secret.value();
  } catch {
    return process.env[envKey] || "";
  }
}

function isSmtpAuthError(message = ""): boolean {
  return /^smtp_535\b/.test(message) || /BadCredentials/i.test(message);
}

function escapeHtml(value: string): string {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeEmailHeader(value = ""): string {
  return String(value || "").replace(/[\r\n]+/g, " ").trim();
}

function getLineItemTotal(item: CheckoutLineItem): number {
  return Math.max(0, Math.round(Number(item.unitAmount) || 0)) * Math.max(1, Math.round(Number(item.quantity) || 1));
}

function getStatusLabel(value = ""): string {
  return String(value || "unknown").replace(/_/g, " ");
}

function getStripeDashboardBase(stripeMode: "sandbox" | "live" | "" = ""): string {
  return stripeMode === "sandbox"
    ? "https://dashboard.stripe.com/test"
    : "https://dashboard.stripe.com";
}

function getStripePaymentIntentUrl(paymentIntentId = "", stripeMode: "sandbox" | "live" | "" = ""): string {
  const normalizedId = String(paymentIntentId || "").trim();
  if (!normalizedId) return "";
  return `${getStripeDashboardBase(stripeMode)}/payments/${encodeURIComponent(normalizedId)}`;
}

function getStripePaymentSearchUrl(queryValue = "", stripeMode: "sandbox" | "live" | "" = ""): string {
  const normalizedQuery = String(queryValue || "").trim();
  if (!normalizedQuery) return "";
  return `${getStripeDashboardBase(stripeMode)}/payments?query=${encodeURIComponent(normalizedQuery)}`;
}

function isTestOrderRecord(data: Record<string, unknown> = {}): boolean {
  return String(data.stripeMode || "") === "sandbox";
}

function buildOrderNotificationEmail(order: OrderNotificationInput): { subject: string; text: string; html: string } {
  const isTest = order.stripeMode === "sandbox";
  const subject = `${isTest ? "(test) " : ""}Order ${order.orderId} created - ${formatMoney(order.amountTotal, order.currency)}`;
  const customer = [order.customerName, order.customerEmail].filter(Boolean).join(" · ") || "No customer details recorded";
  const itemLines = order.lineItems.length
    ? order.lineItems.map((item) =>
      `- ${item.quantity}x ${item.title} @ ${formatMoney(item.unitAmount, item.currency)} = ${formatMoney(getLineItemTotal(item), item.currency)}`
    ).join("\n")
    : "- No line items recorded";
  const text = [
    `Order: ${order.orderId}`,
    `Status: ${getStatusLabel(order.status)}`,
    `Mode: ${order.stripeMode}`,
    `Customer: ${customer}`,
    `Subtotal: ${formatMoney(order.amountSubtotal, order.currency)}`,
    `Tax: ${formatMoney(order.amountTax, order.currency)}`,
    `Shipping: ${formatMoney(order.amountShipping, order.currency)}`,
    `Total: ${formatMoney(order.amountTotal, order.currency)}`,
    "",
    "Items:",
    itemLines,
    "",
    `Review order: ${order.adminOrderUrl}`,
    order.publicOrderUrl ? `Customer order page: ${order.publicOrderUrl}` : "",
    order.stripeDashboardUrl ? `Stripe: ${order.stripeDashboardUrl}` : "",
  ].filter((line) => line !== "").join("\n");
  const htmlItems = order.lineItems.length
    ? order.lineItems.map((item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f1e2d8;">
          <div style="font-weight:700;color:#2c211b;">${escapeHtml(item.title)}</div>
          <div style="margin-top:3px;color:#7b6255;font-size:13px;">${escapeHtml(item.productId || "product")} ${item.variationId ? `· ${escapeHtml(item.variationId)}` : ""}</div>
        </td>
        <td align="center" style="padding:12px 8px;border-bottom:1px solid #f1e2d8;color:#2c211b;">${item.quantity}</td>
        <td align="right" style="padding:12px 0;border-bottom:1px solid #f1e2d8;color:#2c211b;">${escapeHtml(formatMoney(item.unitAmount, item.currency))}</td>
        <td align="right" style="padding:12px 0 12px 12px;border-bottom:1px solid #f1e2d8;font-weight:700;color:#2c211b;">${escapeHtml(formatMoney(getLineItemTotal(item), item.currency))}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="4" style="padding:12px 0;color:#7b6255;">No line items recorded</td></tr>`;
  const html = `
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Order created</h1>
            <div style="margin-top:10px;font-size:16px;">${escapeHtml(order.orderId)}</div>
          </div>
          <div style="padding:24px 26px;">
            <div style="display:inline-block;background:#fff0e5;color:#ad4f20;border:1px solid #f3c1a4;border-radius:999px;padding:6px 10px;font-size:13px;font-weight:700;text-transform:capitalize;">
              ${escapeHtml(getStatusLabel(order.status))} · ${escapeHtml(order.stripeMode)}
            </div>
            <h2 style="margin:20px 0 8px;font-size:18px;color:#2c211b;">Customer</h2>
            <p style="margin:0 0 20px;color:#4d3a31;line-height:1.5;">${escapeHtml(customer)}</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 22px;">
              <thead>
                <tr>
                  <th align="left" style="padding:0 0 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Item</th>
                  <th align="center" style="padding:0 8px 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Qty</th>
                  <th align="right" style="padding:0 0 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Each</th>
                  <th align="right" style="padding:0 0 8px 12px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Line</th>
                </tr>
              </thead>
              <tbody>${htmlItems}</tbody>
            </table>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fffaf6;border:1px solid #f1e2d8;border-radius:10px;">
              <tr><td style="padding:14px 16px 6px;color:#7b6255;">Subtotal</td><td align="right" style="padding:14px 16px 6px;color:#2c211b;">${escapeHtml(formatMoney(order.amountSubtotal, order.currency))}</td></tr>
              <tr><td style="padding:6px 16px;color:#7b6255;">Tax</td><td align="right" style="padding:6px 16px;color:#2c211b;">${escapeHtml(formatMoney(order.amountTax, order.currency))}</td></tr>
              <tr><td style="padding:6px 16px 14px;color:#7b6255;">Shipping</td><td align="right" style="padding:6px 16px 14px;color:#2c211b;">${escapeHtml(formatMoney(order.amountShipping, order.currency))}</td></tr>
              <tr><td style="padding:14px 16px;border-top:1px solid #f1e2d8;font-size:18px;font-weight:700;color:#2c211b;">Total</td><td align="right" style="padding:14px 16px;border-top:1px solid #f1e2d8;font-size:20px;font-weight:700;color:#de6a2e;">${escapeHtml(formatMoney(order.amountTotal, order.currency))}</td></tr>
            </table>
            <div style="margin-top:24px;">
              <a href="${escapeHtml(order.adminOrderUrl)}" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">Review order in admin</a>
              ${order.publicOrderUrl ? `<a href="${escapeHtml(order.publicOrderUrl)}" style="display:inline-block;margin-left:10px;color:#ad4f20;text-decoration:none;font-weight:700;">Customer page</a>` : ""}
              ${order.stripeDashboardUrl ? `<a href="${escapeHtml(order.stripeDashboardUrl)}" style="display:inline-block;margin-left:10px;color:#ad4f20;text-decoration:none;font-weight:700;">Open Stripe</a>` : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return { subject, text, html };
}

function buildCustomerOrderEmail(order: OrderNotificationInput): { subject: string; text: string; html: string } {
  const isTest = order.stripeMode === "sandbox";
  const subject = `${isTest ? "(test) " : ""}Your 3D Local Print order ${order.orderId}`;
  const customerGreeting = order.customerName ? `Hi ${order.customerName},` : "Hi,";
  const itemLines = order.lineItems.length
    ? order.lineItems.map((item) =>
      `- ${item.quantity}x ${item.title} @ ${formatMoney(item.unitAmount, item.currency)} = ${formatMoney(getLineItemTotal(item), item.currency)}`
    ).join("\n")
    : "- No line items recorded";
  const text = [
    customerGreeting,
    "",
    "Thanks for your order with 3D Local Print. We received your payment and will follow up if we need anything else.",
    "",
    `Order: ${order.orderId}`,
    `Subtotal: ${formatMoney(order.amountSubtotal, order.currency)}`,
    `Tax: ${formatMoney(order.amountTax, order.currency)}`,
    `Shipping: ${formatMoney(order.amountShipping, order.currency)}`,
    `Total: ${formatMoney(order.amountTotal, order.currency)}`,
    "",
    "Items:",
    itemLines,
    "",
    order.publicOrderUrl ? `Review your order: ${order.publicOrderUrl}` : "",
    "",
    "Questions? Reply to this email and we will help.",
  ].filter((line, index, lines) => line !== "" || lines[index - 1] !== "").join("\n");
  const htmlItems = order.lineItems.length
    ? order.lineItems.map((item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f1e2d8;">
          <div style="font-weight:700;color:#2c211b;">${escapeHtml(item.title)}</div>
        </td>
        <td align="center" style="padding:12px 8px;border-bottom:1px solid #f1e2d8;color:#2c211b;">${item.quantity}</td>
        <td align="right" style="padding:12px 0;border-bottom:1px solid #f1e2d8;color:#2c211b;">${escapeHtml(formatMoney(item.unitAmount, item.currency))}</td>
        <td align="right" style="padding:12px 0 12px 12px;border-bottom:1px solid #f1e2d8;font-weight:700;color:#2c211b;">${escapeHtml(formatMoney(getLineItemTotal(item), item.currency))}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="4" style="padding:12px 0;color:#7b6255;">No line items recorded</td></tr>`;
  const html = `
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Thanks for your order</h1>
            <div style="margin-top:10px;font-size:16px;">${escapeHtml(order.orderId)}</div>
          </div>
          <div style="padding:24px 26px;">
            <p style="margin:0 0 18px;color:#4d3a31;line-height:1.55;">${escapeHtml(customerGreeting)}</p>
            <p style="margin:0 0 22px;color:#4d3a31;line-height:1.55;">We received your payment and will follow up if we need anything else. Reply to this email with any questions.</p>
            ${order.publicOrderUrl ? `<div style="margin:0 0 22px;"><a href="${escapeHtml(order.publicOrderUrl)}" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">Review order details</a></div>` : ""}
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 22px;">
              <thead>
                <tr>
                  <th align="left" style="padding:0 0 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Item</th>
                  <th align="center" style="padding:0 8px 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Qty</th>
                  <th align="right" style="padding:0 0 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Each</th>
                  <th align="right" style="padding:0 0 8px 12px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Line</th>
                </tr>
              </thead>
              <tbody>${htmlItems}</tbody>
            </table>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fffaf6;border:1px solid #f1e2d8;border-radius:10px;">
              <tr><td style="padding:14px 16px 6px;color:#7b6255;">Subtotal</td><td align="right" style="padding:14px 16px 6px;color:#2c211b;">${escapeHtml(formatMoney(order.amountSubtotal, order.currency))}</td></tr>
              <tr><td style="padding:6px 16px;color:#7b6255;">Tax</td><td align="right" style="padding:6px 16px;color:#2c211b;">${escapeHtml(formatMoney(order.amountTax, order.currency))}</td></tr>
              <tr><td style="padding:6px 16px 14px;color:#7b6255;">Shipping</td><td align="right" style="padding:6px 16px 14px;color:#2c211b;">${escapeHtml(formatMoney(order.amountShipping, order.currency))}</td></tr>
              <tr><td style="padding:14px 16px;border-top:1px solid #f1e2d8;font-size:18px;font-weight:700;color:#2c211b;">Total</td><td align="right" style="padding:14px 16px;border-top:1px solid #f1e2d8;font-size:20px;font-weight:700;color:#de6a2e;">${escapeHtml(formatMoney(order.amountTotal, order.currency))}</td></tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
  return { subject, text, html };
}

async function sendOrderEmail({
  order,
  to,
  email,
  logLabel,
}: {
  order: OrderNotificationInput;
  to: string;
  email: { subject: string; text: string; html: string };
  logLabel: string;
}): Promise<string> {
  const smtpUser = getSmtpSecret(SMTP_USER, "SMTP_USER");
  const smtpPass = getSmtpSecret(SMTP_PASS, "SMTP_PASS");
  if (!smtpUser || !smtpPass) {
    return "not_configured";
  }

  logger.info(`sending ${logLabel} through SMTP`, {
    orderId: order.orderId,
    smtpUser,
    recipient: to,
  });

  const boundary = `order-${order.orderId}-${Date.now().toString(36)}`;
  const from = `3D Local Print <${ORDER_NOTIFICATION_EMAIL}>`;
  const headers = [
    `From: ${from}`,
    `To: ${to}`,
    `Reply-To: ${ORDER_NOTIFICATION_EMAIL}`,
    `Subject: ${email.subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].filter(Boolean);
  const message = [
    ...headers,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    email.text,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    email.html,
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n").replace(/\r?\n\./g, "\r\n..");

  await sendSmtpMail({
    host: "smtp.gmail.com",
    port: 465,
    user: smtpUser,
    pass: smtpPass,
    from: ORDER_NOTIFICATION_EMAIL,
    to,
    message,
  });

  return "sent";
}

async function sendOrderNotificationEmail(order: OrderNotificationInput): Promise<string> {
  return sendOrderEmail({
    order,
    to: ORDER_NOTIFICATION_EMAIL,
    email: renderOrderNotificationEmail(order),
    logLabel: "order notification email",
  });
}

async function sendCustomerOrderEmail(order: OrderNotificationInput): Promise<string> {
  const customerEmail = normalizeEmail(order.customerEmail);
  if (!customerEmail) {
    return "missing_customer_email";
  }

  return sendOrderEmail({
    order,
    to: customerEmail,
    email: renderCustomerOrderEmail(order),
    logLabel: "customer order email",
  });
}

function buildModelLinkQuoteRequestEmail(request: ModelLinkQuoteRequestInput): { subject: string; text: string; html: string } {
  const subject = sanitizeEmailHeader(`Model link quote request ${request.requestId} - ${request.customerName}`);
  const linkLines = request.modelItems.length
    ? request.modelItems.map((item) => `- ${item.quantity}x ${item.url}`).join("\n")
    : "- No model links recorded";
  const customer = [
    request.customerName,
    request.customerEmail,
    request.customerPhone,
  ].filter(Boolean).join(" · ");
  const text = [
    `Quote request: ${request.requestId}`,
    `Created: ${request.createdAt}`,
    `Customer: ${customer}`,
    `Quantity: ${request.quantity}`,
    "",
    "Model links:",
    linkLines,
    "",
    "Project details:",
    request.projectDetails || "No optional details provided.",
    "",
    request.adminReviewUrl ? `Admin review: ${request.adminReviewUrl}` : "",
    request.publicReviewUrl ? `Customer review: ${request.publicReviewUrl}` : "",
    request.pageUrl ? `Submitted from: ${request.pageUrl}` : "",
  ].filter((line) => line !== "").join("\n");
  const htmlLinks = request.modelItems.length
    ? request.modelItems.map((item) => `
      <li style="margin:0 0 8px;">
        <strong>${item.quantity}x</strong>
        <a href="${escapeHtml(item.url)}" style="color:#ad4f20;text-decoration:none;font-weight:700;">${escapeHtml(item.url)}</a>
      </li>
    `).join("")
    : `<li style="color:#7b6255;">No model links recorded</li>`;
  const html = `
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Model link quote request</h1>
            <div style="margin-top:10px;font-size:16px;">${escapeHtml(request.requestId)}</div>
          </div>
          <div style="padding:24px 26px;">
            <h2 style="margin:0 0 8px;font-size:18px;color:#2c211b;">Customer</h2>
            <p style="margin:0 0 18px;color:#4d3a31;line-height:1.5;">${escapeHtml(customer || "No customer details recorded")}</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fffaf6;border:1px solid #f1e2d8;border-radius:10px;margin:0 0 22px;">
              <tr><td style="padding:14px 16px;color:#7b6255;">Quantity</td><td align="right" style="padding:14px 16px;color:#2c211b;font-weight:700;">${request.quantity}</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Created</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">${escapeHtml(request.createdAt)}</td></tr>
            </table>
            <h2 style="margin:0 0 8px;font-size:18px;color:#2c211b;">Model links</h2>
            <ul style="margin:0 0 22px;padding-left:20px;">${htmlLinks}</ul>
            <h2 style="margin:0 0 8px;font-size:18px;color:#2c211b;">Project details</h2>
            <p style="white-space:pre-wrap;margin:0 0 22px;color:#4d3a31;line-height:1.55;">${escapeHtml(request.projectDetails || "No optional details provided.")}</p>
            <div style="margin:0 0 22px;">
              ${request.adminReviewUrl ? `<a href="${escapeHtml(request.adminReviewUrl)}" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">Review link order</a>` : ""}
              ${request.publicReviewUrl ? `<a href="${escapeHtml(request.publicReviewUrl)}" style="display:inline-block;margin-left:10px;color:#ad4f20;text-decoration:none;font-weight:700;">Customer page</a>` : ""}
            </div>
            ${request.pageUrl ? `<p style="margin:0;color:#7b6255;font-size:13px;">Submitted from ${escapeHtml(request.pageUrl)}</p>` : ""}
          </div>
        </div>
      </div>
    </div>
  `;
  return { subject, text, html };
}

async function sendModelLinkQuoteRequestEmail(request: ModelLinkQuoteRequestInput): Promise<string> {
  const smtpUser = getSmtpSecret(SMTP_USER, "SMTP_USER");
  const smtpPass = getSmtpSecret(SMTP_PASS, "SMTP_PASS");
  if (!smtpUser || !smtpPass) {
    return "not_configured";
  }

  const email = renderModelLinkQuoteRequestEmail(request);
  const boundary = `quote-${request.requestId}-${Date.now().toString(36)}`;
  const headers = [
    `From: 3D Local Print <${ORDER_NOTIFICATION_EMAIL}>`,
    `To: ${ORDER_NOTIFICATION_EMAIL}`,
    request.customerEmail ? `Reply-To: ${sanitizeEmailHeader(request.customerEmail)}` : `Reply-To: ${ORDER_NOTIFICATION_EMAIL}`,
    `Subject: ${email.subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].filter(Boolean);
  const message = [
    ...headers,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    email.text,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    email.html,
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n").replace(/\r?\n\./g, "\r\n..");

  await sendSmtpMail({
    host: "smtp.gmail.com",
    port: 465,
    user: smtpUser,
    pass: smtpPass,
    from: ORDER_NOTIFICATION_EMAIL,
    to: ORDER_NOTIFICATION_EMAIL,
    message,
  });

  return "sent";
}

async function sendOrganizationCheckoutRequestEmail(request: OrganizationCheckoutRequestEmailInput): Promise<string> {
  const smtpUser = getSmtpSecret(SMTP_USER, "SMTP_USER");
  const smtpPass = getSmtpSecret(SMTP_PASS, "SMTP_PASS");
  if (!smtpUser || !smtpPass) return "not_configured";

  const email = renderOrganizationCheckoutRequestEmail(request);
  const boundary = `organization-${request.requestId}-${Date.now().toString(36)}`;
  const message = [
    `From: 3D Local Print <${ORDER_NOTIFICATION_EMAIL}>`,
    `To: ${ORDER_NOTIFICATION_EMAIL}`,
    `Reply-To: ${sanitizeEmailHeader(request.contactEmail) || ORDER_NOTIFICATION_EMAIL}`,
    `Subject: ${email.subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    email.text,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    email.html,
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n").replace(/\r?\n\./g, "\r\n..");

  await sendSmtpMail({
    host: "smtp.gmail.com",
    port: 465,
    user: smtpUser,
    pass: smtpPass,
    from: ORDER_NOTIFICATION_EMAIL,
    to: ORDER_NOTIFICATION_EMAIL,
    message,
  });
  return "sent";
}

function buildCustomerModelLinkQuoteEmail(request: ModelLinkQuoteRequestInput): { subject: string; text: string; html: string } {
  const subject = sanitizeEmailHeader(`Your 3D Local Print quote request ${request.requestId}`);
  const greeting = request.customerName ? `Hi ${request.customerName},` : "Hi,";
  const linkLines = request.modelItems.map((item) => `- ${item.quantity}x ${item.url}`).join("\n");
  const text = [
    greeting,
    "",
    "We received your model link quote request. We will review the model, printability, material, and timing, then reply with a quote before anything is printed.",
    "",
    `Quote request: ${request.requestId}`,
    `Quantity: ${request.quantity}`,
    "",
    "Model links:",
    linkLines,
    "",
    "Project details:",
    request.projectDetails || "No optional details provided.",
    "",
    request.publicReviewUrl ? `Review your request: ${request.publicReviewUrl}` : "",
    "",
    "Questions or changes? Reply to this email.",
  ].filter((line, index, lines) => line !== "" || lines[index - 1] !== "").join("\n");
  const htmlLinks = request.modelItems.map((item) => `
    <li style="margin:0 0 8px;">
      <strong>${item.quantity}x</strong>
      <a href="${escapeHtml(item.url)}" style="color:#ad4f20;text-decoration:none;font-weight:700;">${escapeHtml(item.url)}</a>
    </li>
  `).join("");
  const html = `
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Quote request received</h1>
            <div style="margin-top:10px;font-size:16px;">${escapeHtml(request.requestId)}</div>
          </div>
          <div style="padding:24px 26px;">
            <p style="margin:0 0 18px;color:#4d3a31;line-height:1.55;">${escapeHtml(greeting)}</p>
            <p style="margin:0 0 22px;color:#4d3a31;line-height:1.55;">We received your model link quote request. We will review printability, material, and timing, then reply with a quote before anything is printed.</p>
            ${request.publicReviewUrl ? `<div style="margin:0 0 22px;"><a href="${escapeHtml(request.publicReviewUrl)}" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">Review request details</a></div>` : ""}
            <h2 style="margin:0 0 8px;font-size:18px;color:#2c211b;">Model links</h2>
            <ul style="margin:0 0 22px;padding-left:20px;">${htmlLinks}</ul>
            <h2 style="margin:0 0 8px;font-size:18px;color:#2c211b;">Quote details</h2>
            <p style="white-space:pre-wrap;margin:0;color:#4d3a31;line-height:1.55;">Total quantity: ${request.quantity}\n\n${escapeHtml(request.projectDetails || "No optional details provided.")}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  return { subject, text, html };
}

async function sendCustomerModelLinkQuoteEmail(request: ModelLinkQuoteRequestInput): Promise<string> {
  const smtpUser = getSmtpSecret(SMTP_USER, "SMTP_USER");
  const smtpPass = getSmtpSecret(SMTP_PASS, "SMTP_PASS");
  if (!smtpUser || !smtpPass) {
    return "not_configured";
  }

  const email = renderCustomerModelLinkQuoteEmail(request);
  const boundary = `quote-customer-${request.requestId}-${Date.now().toString(36)}`;
  const headers = [
    `From: 3D Local Print <${ORDER_NOTIFICATION_EMAIL}>`,
    `To: ${sanitizeEmailHeader(request.customerEmail)}`,
    `Reply-To: ${ORDER_NOTIFICATION_EMAIL}`,
    `Subject: ${email.subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].filter(Boolean);
  const message = [
    ...headers,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    email.text,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    email.html,
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n").replace(/\r?\n\./g, "\r\n..");

  await sendSmtpMail({
    host: "smtp.gmail.com",
    port: 465,
    user: smtpUser,
    pass: smtpPass,
    from: ORDER_NOTIFICATION_EMAIL,
    to: request.customerEmail,
    message,
  });

  return "sent";
}

function getAgreementSignRequestInput(agreementId: string, data: Record<string, unknown>): AgreementSignRequestInput {
  return {
    agreementId,
    clientBusiness: String(data.clientBusiness || "").trim(),
    clientRepresentative: String(data.clientRepresentative || "").trim(),
    customerEmail: normalizeEmail(String(data.customerEmail || "").trim()),
    providerName: String(data.providerName || "").trim() || "3D Local Print LLC",
    serviceStartDate: String(data.serviceStartDate || "").trim(),
    serviceEndDate: String(data.serviceEndDate || "").trim(),
    yearlyAmount: Math.max(0, Math.round(Number(data.yearlyAmount) || Number(data.amountTotal) || 0)),
    currency: String(data.currency || "usd").trim().toLowerCase() || "usd",
    publicAgreementUrl: String(data.publicAgreementUrl || "").trim(),
  };
}

async function sendAgreementSignRequestEmail(agreement: AgreementSignRequestInput): Promise<string> {
  const customerEmail = normalizeEmail(agreement.customerEmail);
  if (!customerEmail) {
    return "missing_customer_email";
  }
  if (!agreement.publicAgreementUrl) {
    return "missing_public_agreement_url";
  }

  const smtpUser = getSmtpSecret(SMTP_USER, "SMTP_USER");
  const smtpPass = getSmtpSecret(SMTP_PASS, "SMTP_PASS");
  if (!smtpUser || !smtpPass) {
    return "not_configured";
  }

  const email = renderAgreementSignRequestEmail(agreement);
  const boundary = `agreement-${agreement.agreementId}-${Date.now().toString(36)}`;
  const headers = [
    `From: 3D Local Print <${ORDER_NOTIFICATION_EMAIL}>`,
    `To: ${sanitizeEmailHeader(customerEmail)}`,
    `Reply-To: ${ORDER_NOTIFICATION_EMAIL}`,
    `Subject: ${email.subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].filter(Boolean);
  const message = [
    ...headers,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    email.text,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    email.html,
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n").replace(/\r?\n\./g, "\r\n..");

  await sendSmtpMail({
    host: "smtp.gmail.com",
    port: 465,
    user: smtpUser,
    pass: smtpPass,
    from: ORDER_NOTIFICATION_EMAIL,
    to: customerEmail,
    message,
  });

  return "sent";
}

function getAgreementPaymentNotificationInput(
  agreementId: string,
  agreementData: Record<string, unknown>,
  orderId: string,
  orderData: Record<string, unknown>,
  paidOrder: {
    amountTotal: number;
    currency: string;
    stripeDashboardUrl: string;
    customerEmail?: string;
    customerName?: string;
    adminOrderUrl?: string;
    publicOrderUrl?: string;
    stripeMode?: "sandbox" | "live";
  },
  paidAt: string,
): AgreementPaymentNotificationInput {
  const stripeMode = String(orderData.stripeMode || paidOrder.stripeMode || "") as "sandbox" | "live" | "";
  return {
    agreementId,
    clientBusiness: String(agreementData.clientBusiness || "").trim(),
    customerEmail: String(agreementData.customerEmail || orderData.customerEmail || paidOrder.customerEmail || "").trim(),
    customerName: String(orderData.customerName || paidOrder.customerName || agreementData.clientRepresentative || "").trim(),
    acceptedSignerName: String(agreementData.acceptedSignerName || "").trim(),
    paidAt,
    amountTotal: Math.max(0, Math.round(Number(paidOrder.amountTotal) || Number(orderData.amountTotal) || Number(agreementData.amountTotal) || 0)),
    currency: String(paidOrder.currency || orderData.currency || agreementData.currency || "usd").trim().toLowerCase() || "usd",
    orderId,
    stripeMode,
    adminAgreementUrl: getAgreementAdminUrl(agreementId, PUBLIC_SITE_ORIGIN),
    adminOrderUrl: String(orderData.adminOrderUrl || paidOrder.adminOrderUrl || getAdminOrderUrl(PUBLIC_SITE_ORIGIN, orderId)).trim(),
    publicAgreementUrl: String(agreementData.publicAgreementUrl || "").trim(),
    stripeDashboardUrl: String(paidOrder.stripeDashboardUrl || orderData.stripeDashboardUrl || agreementData.stripeDashboardUrl || "").trim(),
  };
}

async function sendAgreementPaymentNotificationEmail(agreement: AgreementPaymentNotificationInput): Promise<string> {
  const smtpUser = getSmtpSecret(SMTP_USER, "SMTP_USER");
  const smtpPass = getSmtpSecret(SMTP_PASS, "SMTP_PASS");
  if (!smtpUser || !smtpPass) {
    return "not_configured";
  }

  const email = renderAgreementPaymentNotificationEmail(agreement);
  const boundary = `agreement-payment-${agreement.agreementId}-${Date.now().toString(36)}`;
  const headers = [
    `From: 3D Local Print <${ORDER_NOTIFICATION_EMAIL}>`,
    `To: ${ORDER_NOTIFICATION_EMAIL}`,
    `Reply-To: ${ORDER_NOTIFICATION_EMAIL}`,
    `Subject: ${email.subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].filter(Boolean);
  const message = [
    ...headers,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    email.text,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    email.html,
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n").replace(/\r?\n\./g, "\r\n..");

  await sendSmtpMail({
    host: "smtp.gmail.com",
    port: 465,
    user: smtpUser,
    pass: smtpPass,
    from: ORDER_NOTIFICATION_EMAIL,
    to: ORDER_NOTIFICATION_EMAIL,
    message,
  });

  return "sent";
}

function normalizeNotificationLineItems(items: unknown, currency = "usd"): CheckoutLineItem[] {
  return (Array.isArray(items) ? items : [])
    .reduce<CheckoutLineItem[]>((acc, item) => {
      if (!item || typeof item !== "object") return acc;
      const raw = item as Record<string, unknown>;
      const quantity = Math.max(1, Math.round(Number(raw.quantity) || 1));
      acc.push({
        productId: String(raw.productId || "").trim(),
        variationId: String(raw.variationId || "").trim(),
        quantity,
        title: String(raw.title || raw.description || "Product").trim() || "Product",
        unitAmount: Math.max(0, Math.round(Number(raw.unitAmount) || 0)),
        currency: String(raw.currency || currency || "usd").trim().toLowerCase() || "usd",
      });
      return acc;
    }, []);
}

function getNotificationOrderInput(orderId: string, data: Record<string, unknown>): OrderNotificationInput {
  const currency = String(data.currency || "usd").trim().toLowerCase() || "usd";
  const stripeMode = String(data.stripeMode || "") === "live" ? "live" : "sandbox";
  return {
    orderId,
    status: String(data.status || "unknown").trim() || "unknown",
    lineItems: normalizeNotificationLineItems(data.lineItems, currency),
    currency,
    amountSubtotal: Math.max(0, Math.round(Number(data.amountSubtotal) || 0)),
    amountTax: Math.max(0, Math.round(Number(data.amountTax) || 0)),
    amountShipping: Math.max(0, Math.round(Number(data.amountShipping) || 0)),
    amountTotal: Math.max(0, Math.round(Number(data.amountTotal) || 0)),
    customerEmail: String(data.customerEmail || "").trim(),
    customerName: String(data.customerName || "").trim(),
    stripeMode,
    adminOrderUrl: getCanonicalAdminOrderUrl(orderId, String(data.adminOrderUrl || "").trim()),
    publicOrderUrl: getCanonicalPublicOrderUrl(
      orderId,
      String(data.customerEmail || "").trim(),
      String(data.publicOrderUrl || "").trim(),
    ),
    stripeDashboardUrl: String(data.stripeDashboardUrl || "").trim(),
  };
}

function sendSmtpMail({
  host,
  port,
  user,
  pass,
  from,
  to,
  message,
}: {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
  message: string;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect({ host, port, servername: host });
    let buffer = "";
    let pending: null | {
      expected: number[];
      resolve: (line: string) => void;
      reject: (error: Error) => void;
    } = null;

    const cleanup = () => {
      socket.removeAllListeners();
      socket.end();
    };

    const waitFor = (...expected: number[]) =>
      new Promise<string>((resolveLine, rejectLine) => {
        pending = { expected, resolve: resolveLine, reject: rejectLine };
      });

    const send = (command: string) => {
      socket.write(`${command}\r\n`);
    };

    const fail = (error: Error) => {
      cleanup();
      reject(error);
    };

    socket.setTimeout(15000, () => fail(new Error("smtp_timeout")));
    socket.on("error", fail);
    socket.on("data", (chunk) => {
      buffer += chunk.toString("utf8");
      if (!pending) return;
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const completeLine = [...lines].reverse().find((line) => /^\d{3} /.test(line));
      if (!completeLine) return;
      const code = Number(completeLine.slice(0, 3));
      const current = pending;
      if (!current.expected.includes(code)) {
        pending = null;
        fail(new Error(`smtp_${code}: ${completeLine.slice(4, 180)}`));
        return;
      }
      buffer = "";
      pending = null;
      current.resolve(completeLine);
    });

    (async () => {
      await waitFor(220);
      send("EHLO 3dlocalprint.com");
      await waitFor(250);
      send("AUTH LOGIN");
      await waitFor(334);
      send(Buffer.from(user).toString("base64"));
      await waitFor(334);
      send(Buffer.from(pass).toString("base64"));
      await waitFor(235);
      send(`MAIL FROM:<${from}>`);
      await waitFor(250);
      send(`RCPT TO:<${to}>`);
      await waitFor(250, 251);
      send("DATA");
      await waitFor(354);
      send(`${message}\r\n.`);
      await waitFor(250);
      send("QUIT");
      await waitFor(221);
      cleanup();
      resolve();
    })().catch(fail);
  });
}

function normalizeCheckoutCartItems(items: CheckoutCartItem[], maxQuantity = 99): CheckoutCartItem[] {
  return items.map((item) => ({
    productId: String(item.productId || "").trim(),
    variationId: String(item.variationId || "").trim(),
    badgeName: String(item.badgeName || "").trim(),
    quantity: Math.max(1, Math.min(maxQuantity, Math.round(Number(item.quantity) || 1))),
  }));
}

function normalizeProductItems(items: unknown): ProductItem[] {
  return (Array.isArray(items) ? items : [])
    .reduce<ProductItem[]>((acc, item) => {
      if (!item || typeof item !== "object") return acc;
      const raw = item as Record<string, unknown>;
      const id = String(raw.id || "").trim();
      const title = String(raw.title || "").trim();
      if (!id || !title) return acc;
      const variations = (Array.isArray(raw.variations) ? raw.variations : [])
        .reduce<ProductVariation[]>((variationAcc, variation) => {
          if (!variation || typeof variation !== "object") return variationAcc;
          const rawVariation = variation as Record<string, unknown>;
          const variationId = String(rawVariation.id || "").trim();
          const label = String(rawVariation.label || "").trim();
          if (!variationId || !label) return variationAcc;
          variationAcc.push({
            id: variationId,
            label,
            unitAmount: Math.max(0, Math.round(Number(rawVariation.unitAmount) || 0)),
            active: Boolean(rawVariation.active),
          });
          return variationAcc;
        }, []);
      acc.push({
        id,
        title,
        slug: String(raw.slug || "").trim(),
        active: Boolean(raw.active),
        catalogVisible: raw.catalogVisible !== false,
        unitAmount: Math.max(0, Math.round(Number(raw.unitAmount) || 0)),
        currency: String(raw.currency || "usd").trim().toLowerCase() || "usd",
        variations,
      });
      return acc;
    }, []);
}

async function loadProductCatalog(): Promise<Map<string, ProductItem>> {
  const snapshot = await getAdminDb().collection("products").doc("list").get();
  const data = snapshot.exists ? snapshot.data() : null;
  return new Map(normalizeProductItems(data?.items).map((item) => [item.id, item]));
}

function resolveCheckoutLineItems(
  cartItems: CheckoutCartItem[],
  productsById: Map<string, ProductItem>,
): CheckoutLineItem[] {
  return cartItems.map((cartItem) => {
    const product = productsById.get(cartItem.productId);
    if (!product || !product.active) {
      throw new Error(`Product is unavailable: ${cartItem.productId}`);
    }

    const activeVariations = (Array.isArray(product.variations) ? product.variations : [])
      .filter((variation) => variation.active);
    const requestedVariationId = String(cartItem.variationId || "").trim();
    const variation = requestedVariationId
      ? activeVariations.find((item) => item.id === requestedVariationId)
      : activeVariations[0] || null;
    if (requestedVariationId && !variation) {
      throw new Error(`Product option is unavailable: ${product.title}`);
    }

    const badgeName = product.slug === "custom-name-badges" ? String(cartItem.badgeName || "").trim() : "";
    if (product.slug === "custom-name-badges" && (!badgeName || badgeName.length > 15 || /[\r\n\x00-\x1f\x7f]/.test(badgeName))) {
      throw new Error("Enter a badge name of 1–15 characters on one line.");
    }
    const unitAmount = variation?.unitAmount ?? product.unitAmount;
    if (!Number.isInteger(unitAmount) || unitAmount <= 0) {
      throw new Error(`Product price is unavailable: ${product.title}`);
    }

    return {
      productId: product.id,
      variationId: variation?.id || "",
      quantity: cartItem.quantity,
      badgeName,
      title: (variation ? `${product.title} (${variation.label})` : product.title) + (badgeName ? ` — Name: ${badgeName}` : ""),
      unitAmount,
      currency: product.currency,
    };
  });
}

function resolveEditableCheckoutLineItems(
  cartItems: CheckoutCartItem[],
  productsById: Map<string, ProductItem>,
  existingItems: unknown,
  existingCurrency = "usd",
): CheckoutLineItem[] {
  const storedItems = Array.isArray(existingItems) ? existingItems : [];
  return cartItems.map((cartItem) => {
    try {
      return resolveCheckoutLineItems([cartItem], productsById)[0];
    } catch (catalogError) {
      // An existing order must never bypass current badge validation.
      if (productsById.get(cartItem.productId)?.slug === "custom-name-badges") throw catalogError;
      const storedItem = storedItems.find((item) => {
        if (!item || typeof item !== "object") return false;
        const raw = item as Record<string, unknown>;
        return String(raw.productId || "").trim() === cartItem.productId
          && String(raw.variationId || "").trim() === String(cartItem.variationId || "").trim()
          && String(raw.badgeName || String(raw.title || "").split(" — Name: ")[1] || "").trim() === String(cartItem.badgeName || "").trim();
      }) as Record<string, unknown> | undefined;
      const title = String(storedItem?.title || "").trim();
      const unitAmount = Math.max(0, Math.round(Number(storedItem?.unitAmount) || 0));
      if (!storedItem || !title || unitAmount <= 0) throw catalogError;
      return {
        productId: cartItem.productId,
        variationId: String(cartItem.variationId || "").trim(),
        quantity: cartItem.quantity,
        title,
        unitAmount,
        currency: String(storedItem.currency || existingCurrency || "usd").trim().toLowerCase() || "usd",
      };
    }
  });
}

function isAllowedCorsOrigin(origin = ""): boolean {
  return ALLOWED_CORS_ORIGINS.some((allowedOrigin) => {
    return typeof allowedOrigin === "string"
      ? allowedOrigin === origin
      : allowedOrigin.test(origin);
  });
}

function setCorsHeaders(response: { set: (field: string, value: string) => void }, origin = ""): void {
  if (isAllowedCorsOrigin(origin)) {
    response.set("Access-Control-Allow-Origin", origin);
  }
  response.set("Vary", "Origin");
  response.set("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Idempotency-Key");
  response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
}

function validateCheckoutBody(body: unknown): body is CreateCheckoutSessionBody {
  if (!body || typeof body !== "object") {
    return false;
  }

  const typedBody = body as Partial<CreateCheckoutSessionBody>;
  if (!Array.isArray(typedBody.cartItems) || typedBody.cartItems.length === 0) {
    return false;
  }

  if (typeof typedBody.successUrl !== "string" || typeof typedBody.cancelUrl !== "string") {
    return false;
  }

  return typedBody.cartItems.every((item) => {
    return (
      typeof item === "object" &&
      item !== null &&
      typeof item.productId === "string" &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
    );
  });
}

function normalizeString(value: unknown, maxLength = 1000): string {
  return String(value || "").trim().slice(0, maxLength);
}

function normalizeModelLinks(value: unknown): string[] {
  const rawLinks = Array.isArray(value)
    ? value
    : String(value || "").split(/\s+/g);
  return rawLinks
    .map((link) => normalizeString(link, 2000))
    .filter(Boolean)
    .filter((link, index, links) => links.indexOf(link) === index)
    .slice(0, 12);
}

function normalizeModelLinkQuoteItems(items: unknown, links: unknown, fallbackQuantity: unknown): ModelLinkQuoteRequestItem[] {
  const fromItems = (Array.isArray(items) ? items : [])
    .reduce<ModelLinkQuoteRequestItem[]>((acc, item) => {
      if (!item || typeof item !== "object") return acc;
      const raw = item as Record<string, unknown>;
      const url = normalizeString(raw.url, 2000);
      if (!url || acc.some((existing) => existing.url === url)) return acc;
      acc.push({
        url,
        quantity: Math.max(1, Math.min(999, Math.round(Number(raw.quantity) || 1))),
      });
      return acc;
    }, [])
    .slice(0, 12);
  if (fromItems.length) return fromItems;

  const quantity = Math.max(1, Math.min(999, Math.round(Number(fallbackQuantity) || 1)));
  return normalizeModelLinks(links).map((url) => ({ url, quantity }));
}

function isHttpUrl(value = ""): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function getModelLinkQuoteValidationError(request: Omit<ModelLinkQuoteRequestInput, "requestId" | "createdAt">): string {
  if (!request.customerName) return "Name is required.";
  if (!request.customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.customerEmail)) {
    return "A valid email is required.";
  }
  if (!request.modelItems.length) return "At least one model link is required.";
  if (request.modelItems.some((item) => !isHttpUrl(item.url))) {
    return "Every model link must start with http:// or https://.";
  }
  if (request.modelItems.some((item) => !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 999)) {
    return "Every quantity must be between 1 and 999.";
  }
  if (!Number.isInteger(request.quantity) || request.quantity < 1) {
    return "Total quantity must be at least 1.";
  }
  return "";
}

function getCheckoutErrorResponse(error: unknown): { status: number; message: string } {
  const message = error instanceof Error ? error.message : "";
  if (message.includes("head office address") && message.includes("automatic tax")) {
    return {
      status: 400,
      message: "Stripe automatic tax needs a test-mode head office address before checkout can run.",
    };
  }

  return {
    status: 500,
    message: "Failed to create checkout session",
  };
}

function buildDefaultWebsiteServicesAgreement(sourceUrl = PUBLIC_SITE_ORIGIN, agreementId = createAgreementId()): AgreementRecordInput {
  const id = agreementId;
  const token = createPrivateToken();
  const createdAt = nowIso();
  const today = new Date();
  const serviceEnd = addYears(today, 1);
  serviceEnd.setDate(serviceEnd.getDate() - 1);
  const includedServices = WEBSITE_SERVICES_AGREEMENT_SERVICES.filter((service) => service.included);
  return {
    id,
    agreementTemplateId: WEBSITE_SERVICES_AGREEMENT_TEMPLATE_ID,
    agreementVersion: WEBSITE_SERVICES_AGREEMENT_VERSION,
    status: "sent",
    clientBusiness: "DD's Sweet Shack",
    clientRepresentative: "",
    customerEmail: "",
    providerName: "",
    effectiveDate: formatDateOnly(today),
    paymentDueDate: formatDateOnly(today),
    serviceStartDate: formatDateOnly(today),
    serviceEndDate: formatDateOnly(serviceEnd),
    yearlyAmount: includedServices.reduce((total, service) => total + service.yearlyCost, 0),
    currency: "usd",
    termsMarkdown: "",
    services: WEBSITE_SERVICES_AGREEMENT_SERVICES,
    totalSelectedServices: includedServices.length,
    totalMonthlyValue: includedServices.reduce((total, service) => total + service.monthlyValue, 0),
    privateToken: token,
    publicAgreementUrl: getAgreementPublicUrl(token, sourceUrl),
    acceptedSignerName: "",
    acceptedAt: "",
    acceptedIp: "",
    acceptedUserAgent: "",
    acceptedBrowserMeta: {},
    orderId: "",
    checkoutSessionId: "",
    checkoutUrl: "",
    paidAt: "",
    amountTotal: 0,
    stripeDashboardUrl: "",
    renewalReminderStatus: "not_sent",
    renewalReminderSentAt: "",
    createdAt,
    updatedAt: createdAt,
  };
}

function normalizeAgreementServiceItems(value: unknown): AgreementServiceItem[] {
  const rawItems = Array.isArray(value) ? value : [];
  return rawItems
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const raw = item as Record<string, unknown>;
      const label = normalizeString(raw.label, 120);
      if (!label) return null;
      const monthlyValue = Math.max(0, Math.round(Number(raw.monthlyValue) || 0));
      return {
        label,
        description: normalizeString(raw.description, 700) || getDefaultAgreementServiceDescription(label),
        included: Boolean(raw.included),
        monthlyValue,
        yearlyCost: monthlyValue * 12,
      };
    })
    .filter((item): item is AgreementServiceItem => Boolean(item));
}

function normalizeBrowserMeta(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.entries(value as Record<string, unknown>)
    .slice(0, 30)
    .reduce<Record<string, string>>((next, [key, item]) => {
      const normalizedKey = normalizeString(key, 80);
      if (!normalizedKey) return next;
      next[normalizedKey] = normalizeString(String(item ?? ""), 500);
      return next;
    }, {});
}

function buildCustomWebsiteServicesAgreement(
  input: Record<string, unknown>,
  sourceUrl = PUBLIC_SITE_ORIGIN,
  agreementId = createAgreementId(),
): AgreementRecordInput {
  const id = agreementId;
  const token = createPrivateToken();
  const createdAt = nowIso();
  const today = new Date();
  const serviceStartDate = normalizeString(input.serviceStartDate, 20) || formatDateOnly(today);
  const fallbackEnd = addYears(new Date(`${serviceStartDate}T00:00:00`), 1);
  fallbackEnd.setDate(fallbackEnd.getDate() - 1);
  const services = normalizeAgreementServiceItems(input.services);
  const includedServices = services.filter((service) => service.included);
  const yearlyAmount = includedServices.reduce((total, service) => total + service.yearlyCost, 0);
  const clientBusiness = normalizeString(input.clientBusiness, 160);
  if (!clientBusiness) {
    throw new Error("client_business_required");
  }
  const customerEmail = normalizeEmail(normalizeString(input.customerEmail, 254));
  if (!customerEmail) {
    throw new Error("customer_email_required");
  }
  if (!services.length) {
    throw new Error("agreement_services_required");
  }
  return {
    id,
    agreementTemplateId: CUSTOM_WEBSITE_SERVICES_AGREEMENT_TEMPLATE_ID,
    agreementVersion: WEBSITE_SERVICES_AGREEMENT_VERSION,
    status: "sent",
    clientBusiness,
    clientRepresentative: normalizeString(input.clientRepresentative, 160),
    customerEmail,
    providerName: normalizeString(input.providerName, 160),
    effectiveDate: normalizeString(input.effectiveDate, 20) || formatDateOnly(today),
    paymentDueDate: normalizeString(input.paymentDueDate, 20) || formatDateOnly(today),
    serviceStartDate,
    serviceEndDate: normalizeString(input.serviceEndDate, 20) || formatDateOnly(fallbackEnd),
    yearlyAmount,
    currency: normalizeString(input.currency, 10).toLowerCase() || "usd",
    termsMarkdown: normalizeString(input.termsMarkdown, 30000),
    services,
    totalSelectedServices: includedServices.length,
    totalMonthlyValue: includedServices.reduce((total, service) => total + service.monthlyValue, 0),
    privateToken: token,
    publicAgreementUrl: getAgreementPublicUrl(token, sourceUrl),
    acceptedSignerName: "",
    acceptedAt: "",
    acceptedIp: "",
    acceptedUserAgent: "",
    acceptedBrowserMeta: {},
    orderId: "",
    checkoutSessionId: "",
    checkoutUrl: "",
    paidAt: "",
    amountTotal: 0,
    stripeDashboardUrl: "",
    renewalReminderStatus: "not_sent",
    renewalReminderSentAt: "",
    createdAt,
    updatedAt: createdAt,
  };
}

function buildWebsiteServicesAgreementEditableFields(input: Record<string, unknown>) {
  const today = new Date();
  const serviceStartDate = normalizeString(input.serviceStartDate, 20) || formatDateOnly(today);
  const fallbackEnd = addYears(new Date(`${serviceStartDate}T00:00:00`), 1);
  fallbackEnd.setDate(fallbackEnd.getDate() - 1);
  const services = normalizeAgreementServiceItems(input.services);
  const includedServices = services.filter((service) => service.included);
  const yearlyAmount = includedServices.reduce((total, service) => total + service.yearlyCost, 0);
  const clientBusiness = normalizeString(input.clientBusiness, 160);
  if (!clientBusiness) {
    throw new Error("client_business_required");
  }
  const customerEmail = normalizeEmail(normalizeString(input.customerEmail, 254));
  if (!customerEmail) {
    throw new Error("customer_email_required");
  }
  if (!services.length) {
    throw new Error("agreement_services_required");
  }
  return {
    clientBusiness,
    clientRepresentative: normalizeString(input.clientRepresentative, 160),
    customerEmail,
    providerName: normalizeString(input.providerName, 160),
    effectiveDate: normalizeString(input.effectiveDate, 20) || formatDateOnly(today),
    paymentDueDate: normalizeString(input.paymentDueDate, 20) || formatDateOnly(today),
    serviceStartDate,
    serviceEndDate: normalizeString(input.serviceEndDate, 20) || formatDateOnly(fallbackEnd),
    yearlyAmount,
    currency: normalizeString(input.currency, 10).toLowerCase() || "usd",
    termsMarkdown: normalizeString(input.termsMarkdown, 30000),
    services,
    totalSelectedServices: includedServices.length,
    totalMonthlyValue: includedServices.reduce((total, service) => total + service.monthlyValue, 0),
  };
}

function getPublicAgreementPayload(agreementId: string, data: Record<string, unknown>) {
  return {
    id: agreementId,
    agreementTemplateId: String(data.agreementTemplateId || ""),
    agreementVersion: String(data.agreementVersion || ""),
    status: String(data.status || "draft"),
    clientBusiness: String(data.clientBusiness || ""),
    clientRepresentative: String(data.clientRepresentative || ""),
    customerEmail: String(data.customerEmail || ""),
    providerName: String(data.providerName || ""),
    effectiveDate: String(data.effectiveDate || ""),
    paymentDueDate: String(data.paymentDueDate || ""),
    serviceStartDate: String(data.serviceStartDate || ""),
    serviceEndDate: String(data.serviceEndDate || ""),
    yearlyAmount: Math.max(0, Math.round(Number(data.yearlyAmount) || 0)),
    currency: String(data.currency || "usd").trim().toLowerCase() || "usd",
    termsMarkdown: String(data.termsMarkdown || ""),
    services: Array.isArray(data.services) ? data.services : [],
    totalSelectedServices: Math.max(0, Math.round(Number(data.totalSelectedServices) || 0)),
    totalMonthlyValue: Math.max(0, Math.round(Number(data.totalMonthlyValue) || 0)),
    acceptedSignerName: String(data.acceptedSignerName || ""),
    acceptedAt: String(data.acceptedAt || ""),
    paidAt: String(data.paidAt || ""),
    amountTotal: Math.max(0, Math.round(Number(data.amountTotal) || 0)),
    orderId: String(data.orderId || ""),
    publicAgreementUrl: String(data.publicAgreementUrl || ""),
  };
}

async function findAgreementByToken(token = "") {
  const normalizedToken = String(token || "").trim();
  if (!normalizedToken) return null;
  const snapshot = await getAdminDb()
    .collection("agreements")
    .where("privateToken", "==", normalizedToken)
    .limit(1)
    .get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ref: doc.ref,
    data: doc.data() || {},
  };
}

function getClientIp(request: { header: (name: string) => string | undefined }): string {
  const forwarded = String(request.header("x-forwarded-for") || "").split(",")[0]?.trim();
  return forwarded || String(request.header("fastly-client-ip") || request.header("x-real-ip") || "").trim();
}

async function markLinkedAgreementPaid(
  orderId: string,
  orderData: Record<string, unknown>,
  paidOrder: {
    amountTotal: number;
    currency: string;
    stripeDashboardUrl: string;
    customerEmail?: string;
    customerName?: string;
    adminOrderUrl?: string;
    publicOrderUrl?: string;
    stripeMode?: "sandbox" | "live";
  },
  paidAt: string,
  checkoutSessionId: string,
): Promise<void> {
  const linkedAgreementId = String(orderData.agreementId || "").trim();
  const orderType = String(orderData.orderType || "").trim();
  if (!linkedAgreementId || orderType !== AGREEMENT_ORDER_TYPE) {
    return;
  }

  const agreementRef = getAdminDb().collection("agreements").doc(linkedAgreementId);
  const agreementSnapshot = await agreementRef.get();
  const agreementData = agreementSnapshot.data() || {};
  const paidAgreementFields = {
    status: "paid_active",
    orderId,
    checkoutSessionId,
    paidAt,
    amountTotal: paidOrder.amountTotal,
    currency: paidOrder.currency,
    stripeDashboardUrl: paidOrder.stripeDashboardUrl,
    updatedAt: paidAt,
  };

  await agreementRef.set(paidAgreementFields, { merge: true });

  if (String(agreementData.agreementPaymentNotificationStatus || "") === "sent") {
    return;
  }

  try {
    const agreementEmail = getAgreementPaymentNotificationInput(
      linkedAgreementId,
      { ...agreementData, ...paidAgreementFields },
      orderId,
      orderData,
      paidOrder,
      paidAt,
    );
    const agreementPaymentNotificationStatus = await sendAgreementPaymentNotificationEmail(agreementEmail);
    await agreementRef.set({
      agreementPaymentNotificationEmail: ORDER_NOTIFICATION_EMAIL,
      agreementPaymentNotificationStatus,
      agreementPaymentNotificationUpdatedAt: nowIso(),
    }, { merge: true });
  } catch (error) {
    logger.error("agreement payment notification email failed", { agreementId: linkedAgreementId, orderId, error });
    await agreementRef.set({
      agreementPaymentNotificationEmail: ORDER_NOTIFICATION_EMAIL,
      agreementPaymentNotificationStatus: error instanceof Error ? `failed: ${error.message.slice(0, 160)}` : "failed",
      agreementPaymentNotificationUpdatedAt: nowIso(),
    }, { merge: true });
  }
}

export const createDefaultWebsiteServicesAgreement = onRequest(
  { region: "us-central1" },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const requestedByAdminEmail = await requireAdmin(request);
      const sourceUrl = normalizeString(request.body?.sourceUrl, 2000) || PUBLIC_SITE_ORIGIN;
      const currentAgreementRef = getAdminDb().collection("agreements").doc(WEBSITE_SERVICES_CURRENT_AGREEMENT_ID);
      const currentAgreementSnapshot = await currentAgreementRef.get();
      if (currentAgreementSnapshot.exists) {
        const data = currentAgreementSnapshot.data() || {};
        const status = String(data.status || "");
        if (["draft", "sent", "accepted", "checkout_created"].includes(status)) {
          if (!String(data.publicAgreementUrl || "").trim() && String(data.privateToken || "").trim()) {
            await currentAgreementRef.set({
              publicAgreementUrl: getAgreementPublicUrl(String(data.privateToken || ""), sourceUrl),
              updatedAt: nowIso(),
              updatedByAdminEmail: requestedByAdminEmail,
            }, { merge: true });
          }
          const updatedSnapshot = await currentAgreementRef.get();
          const updatedData = updatedSnapshot.data() || data;
          response.status(200).json({
            ok: true,
            agreement: getPublicAgreementPayload(currentAgreementSnapshot.id, updatedData),
            publicAgreementUrl: String(updatedData.publicAgreementUrl || ""),
            reused: true,
          });
          return;
        }
      }

      const agreementId = currentAgreementSnapshot.exists
        ? createAgreementId()
        : WEBSITE_SERVICES_CURRENT_AGREEMENT_ID;
      const agreement = buildDefaultWebsiteServicesAgreement(sourceUrl, agreementId);
      await getAdminDb().collection("agreements").doc(agreement.id).set({
        ...agreement,
        createdByAdminEmail: requestedByAdminEmail,
        updatedByAdminEmail: requestedByAdminEmail,
      });
      response.status(200).json({
        ok: true,
        agreement: getPublicAgreementPayload(agreement.id, agreement),
        publicAgreementUrl: agreement.publicAgreementUrl,
        reused: false,
      });
    } catch (error) {
      logger.error("createDefaultWebsiteServicesAgreement failed", error);
      const message = error instanceof Error ? error.message : "";
      const code = error && typeof error === "object" && "code" in error
        ? String((error as { code?: unknown }).code || "")
        : "";
      if (message === "missing_auth_token") {
        response.status(401).json({ error: "Sign in required." });
        return;
      }
      if (message === "admin_denied") {
        response.status(403).json({ error: "Admin access required." });
        return;
      }
      response.status(500).json({
        error: "Failed to create agreement.",
        details: message ? message.slice(0, 500) : "No error message was provided by the server.",
        code,
      });
    }
  },
);

export const createWebsiteServicesAgreement = onRequest(
  { region: "us-central1" },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const requestedByAdminEmail = await requireAdmin(request);
      const sourceUrl = normalizeString(request.body?.sourceUrl, 2000) || PUBLIC_SITE_ORIGIN;
      const agreement = buildCustomWebsiteServicesAgreement(request.body || {}, sourceUrl);
      await getAdminDb().collection("agreements").doc(agreement.id).set({
        ...agreement,
        createdByAdminEmail: requestedByAdminEmail,
        updatedByAdminEmail: requestedByAdminEmail,
      });
      response.status(200).json({
        ok: true,
        agreement: getPublicAgreementPayload(agreement.id, agreement),
        publicAgreementUrl: agreement.publicAgreementUrl,
        reused: false,
      });
    } catch (error) {
      logger.error("createWebsiteServicesAgreement failed", error);
      const message = error instanceof Error ? error.message : "";
      if (message === "missing_auth_token") {
        response.status(401).json({ error: "Sign in required." });
        return;
      }
      if (message === "admin_denied") {
        response.status(403).json({ error: "Admin access required." });
        return;
      }
      if (message === "client_business_required") {
        response.status(400).json({ error: "Client business is required." });
        return;
      }
      if (message === "customer_email_required") {
        response.status(400).json({ error: "Customer email is required." });
        return;
      }
      if (message === "agreement_services_required") {
        response.status(400).json({ error: "Add at least one service to the agreement." });
        return;
      }
      response.status(500).json({
        error: "Failed to create agreement.",
        details: message ? message.slice(0, 500) : "No error message was provided by the server.",
      });
    }
  },
);

export const updateWebsiteServicesAgreement = onRequest(
  { region: "us-central1" },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const requestedByAdminEmail = await requireAdmin(request);
      const agreementId = normalizeString(request.body?.agreementId, 200);
      if (!agreementId) {
        response.status(400).json({ error: "Agreement ID is required." });
        return;
      }
      const agreementRef = getAdminDb().collection("agreements").doc(agreementId);
      const agreementSnapshot = await agreementRef.get();
      if (!agreementSnapshot.exists) {
        response.status(404).json({ error: "Agreement not found." });
        return;
      }

      const editableFields = buildWebsiteServicesAgreementEditableFields(request.body || {});
      await agreementRef.set({
        ...editableFields,
        updatedAt: nowIso(),
        updatedByAdminEmail: requestedByAdminEmail,
      }, { merge: true });
      const updatedSnapshot = await agreementRef.get();
      const updatedData = updatedSnapshot.data() || {};
      response.status(200).json({
        ok: true,
        agreement: getPublicAgreementPayload(updatedSnapshot.id, updatedData),
        publicAgreementUrl: String(updatedData.publicAgreementUrl || ""),
      });
    } catch (error) {
      logger.error("updateWebsiteServicesAgreement failed", error);
      const message = error instanceof Error ? error.message : "";
      if (message === "missing_auth_token") {
        response.status(401).json({ error: "Sign in required." });
        return;
      }
      if (message === "admin_denied") {
        response.status(403).json({ error: "Admin access required." });
        return;
      }
      if (message === "client_business_required") {
        response.status(400).json({ error: "Client business is required." });
        return;
      }
      if (message === "customer_email_required") {
        response.status(400).json({ error: "Customer email is required." });
        return;
      }
      if (message === "agreement_services_required") {
        response.status(400).json({ error: "Add at least one service to the agreement." });
        return;
      }
      response.status(500).json({
        error: "Failed to update agreement.",
        details: message ? message.slice(0, 500) : "No error message was provided by the server.",
      });
    }
  },
);

export const deleteWebsiteServicesAgreement = onRequest(
  { region: "us-central1" },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const agreementId = normalizeString(request.body?.agreementId, 200);
      logger.info("delete agreement request received", {
        agreementId,
        hasAuthorization: Boolean(request.header("authorization")),
      });
      const requestedByAdminEmail = await requireAdmin(request);
      if (!agreementId) {
        response.status(400).json({ error: "Agreement ID is required." });
        return;
      }

      const agreementRef = getAdminDb().collection("agreements").doc(agreementId);
      const agreementSnapshot = await agreementRef.get();
      if (!agreementSnapshot.exists) {
        logger.warn("delete agreement agreement not found", { agreementId, requestedByAdminEmail });
        response.status(404).json({ error: "Agreement not found." });
        return;
      }

      await agreementRef.delete();
      logger.info("delete agreement completed", { agreementId, requestedByAdminEmail });
      response.status(200).json({ ok: true });
    } catch (error) {
      logger.error("deleteWebsiteServicesAgreement failed", error);
      const message = error instanceof Error ? error.message : "";
      if (message === "missing_auth_token") {
        response.status(401).json({ error: "Sign in required." });
        return;
      }
      if (message === "admin_denied") {
        response.status(403).json({ error: "Admin access required." });
        return;
      }
      response.status(500).json({ error: "Failed to delete agreement." });
    }
  },
);

export const sendAgreementEmail = onRequest(
  { region: "us-central1", secrets: [SMTP_USER, SMTP_PASS] },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const agreementId = normalizeString(request.body?.agreementId, 200);
      logger.info("send agreement email request received", {
        agreementId,
        hasAuthorization: Boolean(request.header("authorization")),
      });
      const requestedByAdminEmail = await requireAdmin(request);
      if (!agreementId) {
        response.status(400).json({ error: "Agreement ID is required." });
        return;
      }

      const agreementRef = getAdminDb().collection("agreements").doc(agreementId);
      const agreementSnapshot = await agreementRef.get();
      if (!agreementSnapshot.exists) {
        response.status(404).json({ error: "Agreement not found." });
        return;
      }

      const requestedCustomerEmail = normalizeEmail(normalizeString(request.body?.customerEmail, 254));
      const agreementData = {
        ...(agreementSnapshot.data() || {}),
        ...(requestedCustomerEmail ? { customerEmail: requestedCustomerEmail } : {}),
      };
      const agreement = getAgreementSignRequestInput(agreementSnapshot.id, agreementData);
      const emailStatus = await sendAgreementSignRequestEmail(agreement);
      logger.info("agreement email attempted", {
        agreementId,
        requestedByAdminEmail,
        customerEmail: agreement.customerEmail,
        emailStatus,
      });

      if (emailStatus === "missing_customer_email") {
        response.status(400).json({ error: "Agreement does not have a customer email." });
        return;
      }
      if (emailStatus === "missing_public_agreement_url") {
        response.status(400).json({ error: "Agreement does not have a public agreement link." });
        return;
      }
      if (emailStatus === "not_configured") {
        response.status(400).json({ error: "Gmail SMTP is not configured." });
        return;
      }

      await agreementRef.set({
        customerEmail: agreement.customerEmail,
        agreementEmail: agreement.customerEmail,
        agreementEmailStatus: emailStatus,
        agreementEmailUpdatedAt: nowIso(),
        agreementEmailManualSentAt: nowIso(),
        agreementEmailSentByAdminEmail: requestedByAdminEmail,
        updatedAt: nowIso(),
        updatedByAdminEmail: requestedByAdminEmail,
      }, { merge: true });

      response.status(200).json({
        ok: true,
        agreementEmailStatus: emailStatus,
        customerEmail: agreement.customerEmail,
      });
    } catch (error) {
      logger.error("send agreement email failed", error);
      const message = error instanceof Error ? error.message : "";
      if (message === "missing_auth_token") {
        response.status(401).json({ error: "Sign in required." });
        return;
      }
      if (message === "admin_denied") {
        response.status(403).json({ error: "Admin access required." });
        return;
      }
      if (isSmtpAuthError(message)) {
        response.status(400).json({
          error: "Gmail SMTP rejected SMTP_USER/SMTP_PASS. Use a Google App Password for SMTP_PASS and restart the emulator after updating firebase-hosting/.secret.local.",
        });
        return;
      }
      response.status(500).json({ error: "Failed to send agreement email." });
    }
  },
);

export const getPublicAgreement = onRequest(
  { region: "us-central1", cors: ALLOWED_CORS_ORIGINS, invoker: "public" },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "GET") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const found = await findAgreementByToken(String(request.query.token || ""));
      if (!found || String(found.data.status || "") === "canceled") {
        response.status(404).json({ error: "Agreement not found." });
        return;
      }

      response.status(200).json({
        agreement: getPublicAgreementPayload(found.id, found.data),
      });
    } catch (error) {
      logger.error("getPublicAgreement failed", error);
      response.status(500).json({ error: "Failed to load agreement." });
    }
  },
);

export const acceptAgreementAndCreateCheckoutSession = onRequest(
  { region: "us-central1", cors: ALLOWED_CORS_ORIGINS, invoker: "public", secrets: [STRIPE_SECRET_KEY] },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const body = request.body && typeof request.body === "object"
        ? request.body as Record<string, unknown>
        : {};
      const token = normalizeString(body.token, 256);
      const signerName = normalizeString(body.signerName, 160);
      const accepted = Boolean(body.accepted);
      const successUrl = normalizeString(body.successUrl, 2000);
      const cancelUrl = normalizeString(body.cancelUrl, 2000);
      const customerEmail = normalizeEmail(normalizeString(body.customerEmail, 254));
      const acceptedBrowserMeta = normalizeBrowserMeta(body.browserMeta);

      if (!token || !signerName || !accepted || !successUrl || !cancelUrl) {
        response.status(400).json({ error: "Agreement acceptance is incomplete." });
        return;
      }

      const found = await findAgreementByToken(token);
      if (!found || String(found.data.status || "") === "canceled") {
        response.status(404).json({ error: "Agreement not found." });
        return;
      }
      if (String(found.data.status || "") === "paid_active") {
        response.status(400).json({ error: "This agreement has already been paid." });
        return;
      }

      const stripeMode = getStripeMode();
      if (isLocalRequest(request) && stripeMode !== "sandbox") {
        response.status(400).json({
          error: "Local checkout requires a Stripe sandbox secret key.",
        });
        return;
      }

      const now = nowIso();
      const orderId = createOrderId();
      const agreement = getPublicAgreementPayload(found.id, found.data);
      const unitAmount = Math.max(1, Math.round(Number(agreement.yearlyAmount) || 24000));
      const currency = String(agreement.currency || "usd").trim().toLowerCase() || "usd";
      const publicOrderUrl = getPublicOrderUrl(successUrl, orderId, customerEmail);
      const adminOrderUrl = getAdminOrderUrl(successUrl, orderId);
      const lineItems: CheckoutLineItem[] = [{
        productId: AGREEMENT_ORDER_TYPE,
        variationId: agreement.agreementVersion || WEBSITE_SERVICES_AGREEMENT_VERSION,
        quantity: 1,
        title: `${agreement.clientBusiness || "Client"} yearly website technical services`,
        unitAmount,
        currency,
      }];

      const stripe = getStripeClient();
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: appendUrlParams(successUrl, {
          order_id: orderId,
          session_id: "{CHECKOUT_SESSION_ID}",
        }),
        cancel_url: appendUrlParams(cancelUrl, { agreement_id: found.id }),
        client_reference_id: orderId,
        customer_email: customerEmail || undefined,
        line_items: [{
          price_data: {
            currency,
            unit_amount: unitAmount,
            product_data: {
              name: lineItems[0].title,
              metadata: {
                productId: AGREEMENT_ORDER_TYPE,
                agreementId: found.id,
                agreementVersion: agreement.agreementVersion,
              },
            },
          },
          quantity: 1,
        }],
        automatic_tax: { enabled: false },
        allow_promotion_codes: false,
        billing_address_collection: "required",
        metadata: {
          orderId,
          orderType: AGREEMENT_ORDER_TYPE,
          agreementId: found.id,
        },
        payment_intent_data: {
          metadata: {
            orderId,
            orderType: AGREEMENT_ORDER_TYPE,
            agreementId: found.id,
          },
        },
      });

      await getAdminDb().collection("orders").doc(orderId).set({
        id: orderId,
        orderType: AGREEMENT_ORDER_TYPE,
        agreementId: found.id,
        agreementPublicUrl: String(found.data.publicAgreementUrl || ""),
        status: "checkout_created",
        lineItems,
        currency,
        amountSubtotal: unitAmount,
        amountTax: 0,
        amountShipping: 0,
        amountTotal: unitAmount,
        customerEmail,
        customerName: signerName,
        checkoutSessionId: session.id,
        checkoutUrl: session.url || "",
        paymentIntentId: "",
        latestStripeEventId: "",
        stripeMode,
        notificationEmail: ORDER_NOTIFICATION_EMAIL,
        notificationEmailStatus: "pending_payment",
        publicOrderUrl,
        createdAt: now,
        updatedAt: now,
        paidAt: "",
        stripeDashboardUrl: getStripePaymentSearchUrl(session.id, stripeMode),
        adminOrderUrl,
      });

      await found.ref.set({
        status: "checkout_created",
        acceptedSignerName: signerName,
        acceptedAt: String(found.data.acceptedAt || "") || now,
        acceptedIp: getClientIp(request),
        acceptedUserAgent: normalizeString(request.header("user-agent") || "", 500),
        acceptedBrowserMeta,
        orderId,
        checkoutSessionId: session.id,
        checkoutUrl: session.url || "",
        amountTotal: unitAmount,
        currency,
        updatedAt: now,
      }, { merge: true });

      response.status(200).json({
        ok: true,
        agreementId: found.id,
        orderId,
        sessionId: session.id,
        stripeMode,
        url: session.url,
      });
    } catch (error) {
      logger.error("acceptAgreementAndCreateCheckoutSession failed", error);
      const errorResponse = getCheckoutErrorResponse(error);
      response.status(errorResponse.status).json({ error: errorResponse.message });
    }
  },
);

export const submitModelLinkQuoteRequest = onRequest(
  { region: "us-central1", cors: ALLOWED_CORS_ORIGINS, invoker: "public", secrets: [SMTP_USER, SMTP_PASS] },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const body = request.body && typeof request.body === "object"
        ? request.body as Record<string, unknown>
        : {};
      const createdAt = nowIso();
      const requestId = createQuoteRequestId();
      const sourceUrl = normalizeString(body.pageUrl, 2000) || PUBLIC_SITE_ORIGIN;
      const customerEmail = normalizeEmail(normalizeString(body.customerEmail, 254));
      const modelItems = normalizeModelLinkQuoteItems(body.modelItems, body.modelLinks, body.quantity);
      const quantity = modelItems.reduce((total, item) => total + item.quantity, 0);
      const quoteRequest: ModelLinkQuoteRequestInput = {
        requestId,
        customerName: normalizeString(body.customerName, 160),
        customerEmail,
        customerPhone: normalizeString(body.customerPhone, 80),
        marketingOptIn: Boolean(body.marketingOptIn),
        modelItems,
        modelLinks: modelItems.map((item) => item.url),
        projectDetails: normalizeString(body.projectDetails, 5000),
        quantity,
        pageUrl: sourceUrl,
        publicReviewUrl: getModelLinkQuotePublicUrl(sourceUrl, requestId, customerEmail),
        adminReviewUrl: getModelLinkQuoteAdminUrl(sourceUrl, requestId),
        createdAt,
      };
      const validationError = getModelLinkQuoteValidationError(quoteRequest);
      if (validationError) {
        response.status(400).json({ error: validationError });
        return;
      }

      const requestRef = getAdminDb().collection("model_link_quote_requests").doc(requestId);
      await requestRef.set({
        ...quoteRequest,
        id: requestId,
        status: "quote_requested",
        notificationEmail: ORDER_NOTIFICATION_EMAIL,
        notificationEmailStatus: "pending",
        customerEmailStatus: "pending",
        updatedAt: createdAt,
        userAgent: normalizeString(request.header("user-agent") || "", 500),
        referrer: normalizeString(request.header("referer") || "", 2000),
      });

      let notificationEmailStatus = "not_sent";
      let customerEmailStatus = "not_sent";
      try {
        notificationEmailStatus = await sendModelLinkQuoteRequestEmail(quoteRequest);
      } catch (error) {
        notificationEmailStatus = isSmtpAuthError(error instanceof Error ? error.message : "")
          ? "auth_error"
          : "error";
        logger.error("model link quote request email failed", { requestId, error });
      }
      try {
        customerEmailStatus = await sendCustomerModelLinkQuoteEmail(quoteRequest);
      } catch (error) {
        customerEmailStatus = isSmtpAuthError(error instanceof Error ? error.message : "")
          ? "auth_error"
          : "error";
        logger.error("model link quote customer email failed", { requestId, error });
      }

      await requestRef.set({
        notificationEmailStatus,
        customerEmailStatus,
        notificationEmailUpdatedAt: nowIso(),
        customerEmailUpdatedAt: nowIso(),
        updatedAt: nowIso(),
      }, { merge: true });

      response.status(200).json({
        ok: true,
        requestId,
        notificationEmailStatus,
        customerEmailStatus,
        publicReviewUrl: quoteRequest.publicReviewUrl,
        adminReviewUrl: quoteRequest.adminReviewUrl,
      });
    } catch (error) {
      logger.error("submitModelLinkQuoteRequest failed", error);
      response.status(500).json({ error: "Failed to submit quote request." });
    }
  },
);

export const getPublicModelLinkQuoteRequest = onRequest(
  { region: "us-central1", cors: ALLOWED_CORS_ORIGINS, invoker: "public" },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "GET") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const requestId = String(request.query.requestId || request.query.request_id || "").trim();
      const email = normalizeEmail(String(request.query.email || ""));
      if (!requestId || !email) {
        response.status(400).json({ error: "Missing request id or email." });
        return;
      }

      const quoteSnapshot = await getAdminDb().collection("model_link_quote_requests").doc(requestId).get();
      if (!quoteSnapshot.exists) {
        response.status(404).json({ error: "Quote request not found." });
        return;
      }

      const data = quoteSnapshot.data() || {};
      if (normalizeEmail(String(data.customerEmail || "")) !== email) {
        response.status(404).json({ error: "Quote request not found." });
        return;
      }

      response.status(200).json({
        quoteRequest: {
          id: requestId,
          status: String(data.status || "quote_requested"),
          customerName: String(data.customerName || ""),
          customerEmail: String(data.customerEmail || ""),
          customerPhone: String(data.customerPhone || ""),
          marketingOptIn: Boolean(data.marketingOptIn),
          modelItems: normalizeModelLinkQuoteItems(data.modelItems, data.modelLinks, data.quantity),
          modelLinks: Array.isArray(data.modelLinks) ? data.modelLinks.map(String) : [],
          projectDetails: String(data.projectDetails || ""),
          quantity: Math.max(1, Math.round(Number(data.quantity) || 1)),
          publicReviewUrl: String(data.publicReviewUrl || ""),
          createdAt: String(data.createdAt || ""),
          updatedAt: String(data.updatedAt || ""),
        },
      });
    } catch (error) {
      logger.error("getPublicModelLinkQuoteRequest failed", error);
      response.status(500).json({ error: "Failed to load quote request." });
    }
  },
);

export const submitOrganizationCheckoutRequest = onRequest(
  { region: "us-central1", cors: ALLOWED_CORS_ORIGINS, invoker: "public", secrets: [SMTP_USER, SMTP_PASS] },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");
    if (request.method === "OPTIONS") return void response.status(204).send("");
    if (request.method !== "POST") return void response.status(405).json({ error: "Method not allowed" });

    try {
      const body = (request.body || {}) as Partial<OrganizationCheckoutRequestBody>;
      const organizationName = normalizeString(body.organizationName, 180);
      const organizationType = normalizeString(body.organizationType, 80);
      const contactName = normalizeString(body.contactName, 140);
      const contactEmail = normalizeEmail(String(body.contactEmail || ""));
      const exemptionCertificateNumber = normalizeCertificateNumber(String(body.exemptionCertificateNumber || ""));
      const certificateMimeType = normalizeString(body.certificateMimeType, 100);
      const allowedMimeTypes = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);
      if (
        !organizationName || !organizationType || !contactName || !contactEmail.includes("@")
        || !exemptionCertificateNumber || !body.certificationAccepted
        || !allowedMimeTypes.has(certificateMimeType)
      ) {
        return void response.status(400).json({ error: "Complete all required fields and attach a PDF or image certificate." });
      }
      const certificateBytes = Buffer.from(String(body.certificateBase64 || ""), "base64");
      if (!certificateBytes.length || certificateBytes.length > 5 * 1024 * 1024) {
        return void response.status(400).json({ error: "The exemption certificate must be no larger than 5 MB." });
      }

      const requestId = `orgreq_${Date.now().toString(36)}_${randomBytes(5).toString("hex")}`;
      const extension = certificateMimeType === "application/pdf"
        ? "pdf"
        : certificateMimeType === "image/png" ? "png" : certificateMimeType === "image/webp" ? "webp" : "jpg";
      const storagePath = `organization-checkout-requests/${requestId}/certificate.${extension}`;
      await getAdminBucket().file(storagePath).save(certificateBytes, {
        contentType: certificateMimeType,
        resumable: false,
        metadata: { cacheControl: "private, max-age=0, no-store" },
      });
      const createdAt = nowIso();
      const phone = normalizeString(body.phone, 40);
      const certificateExpirationDate = normalizeString(body.certificateExpirationDate, 20);
      const intendedUse = normalizeString(body.intendedUse, 1500);
      const requestRef = getAdminDb().collection("organization_checkout_requests").doc(requestId);
      await requestRef.set({
        id: requestId,
        status: "pending",
        organizationName,
        organizationType,
        contactName,
        contactEmail,
        normalizedContactEmail: contactEmail,
        phone,
        exemptionCertificateNumber,
        certificateExpirationDate,
        addressLine1: normalizeString(body.addressLine1, 180),
        addressLine2: normalizeString(body.addressLine2, 180),
        city: normalizeString(body.city, 100),
        state: normalizeString(body.state, 30).toUpperCase(),
        postalCode: normalizeString(body.postalCode, 20),
        intendedUse,
        certificateFileName: normalizeString(body.certificateFileName, 180),
        certificateMimeType,
        certificateStoragePath: storagePath,
        certificationAccepted: true,
        createdAt,
        updatedAt: createdAt,
        reviewedAt: "",
        reviewedBy: "",
        reviewNotes: "",
        stripeCustomerId: "",
        notificationEmailStatus: "pending",
      });
      let notificationEmailStatus = "not_sent";
      try {
        notificationEmailStatus = await sendOrganizationCheckoutRequestEmail({
          requestId,
          organizationName,
          organizationType,
          contactName,
          contactEmail,
          phone,
          exemptionCertificateNumber,
          certificateExpirationDate,
          intendedUse,
          adminReviewUrl: `${PUBLIC_SITE_ORIGIN}/admin/organization-checkout/index.html?requestId=${encodeURIComponent(requestId)}`,
          createdAt,
        });
      } catch (error) {
        notificationEmailStatus = isSmtpAuthError(error instanceof Error ? error.message : "")
          ? "auth_error"
          : "error";
        logger.error("organization checkout request email failed", { requestId, error });
      }
      await requestRef.set({
        notificationEmailStatus,
        notificationEmailUpdatedAt: nowIso(),
        updatedAt: nowIso(),
      }, { merge: true });
      response.status(200).json({ ok: true, requestId, notificationEmailStatus });
    } catch (error) {
      logger.error("submitOrganizationCheckoutRequest failed", error);
      response.status(500).json({ error: "Unable to submit the organization request." });
    }
  },
);

export const verifyOrganizationCheckout = onRequest(
  { region: "us-central1", cors: ALLOWED_CORS_ORIGINS, invoker: "public" },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");
    if (request.method === "OPTIONS") return void response.status(204).send("");
    if (request.method !== "POST") return void response.status(405).json({ error: "Method not allowed" });
    const body = (request.body || {}) as Record<string, unknown>;
    const organization = await getApprovedOrganization(String(body.email || ""), String(body.certificateNumber || ""));
    if (!organization) {
      return void response.status(404).json({ error: "No active approved organization matches that email and certificate number." });
    }
    response.status(200).json({
      ok: true,
      organizationId: organization.id,
      organizationName: String(organization.data.organizationName || ""),
    });
  },
);

export const manageOrganizationCheckoutRequests = onRequest(
  { region: "us-central1", cors: ALLOWED_CORS_ORIGINS, invoker: "public", secrets: [STRIPE_SECRET_KEY, SMTP_USER, SMTP_PASS] },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");
    if (request.method === "OPTIONS") return void response.status(204).send("");
    try {
      const reviewedBy = await requireAdmin(request);
      if (request.method === "GET") {
        const snapshot = await getAdminDb().collection("organization_checkout_requests").orderBy("createdAt", "desc").limit(200).get();
        return void response.status(200).json({
          requests: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), certificateStoragePath: undefined })),
        });
      }
      if (request.method !== "POST") return void response.status(405).json({ error: "Method not allowed" });
      const body = (request.body || {}) as Record<string, unknown>;
      const requestId = normalizeString(body.requestId, 120);
      const action = normalizeString(body.action, 30);
      const requestRef = getAdminDb().collection("organization_checkout_requests").doc(requestId);
      const snapshot = await requestRef.get();
      if (!snapshot.exists) return void response.status(404).json({ error: "Request not found." });
      const data = snapshot.data() || {};
      if (action === "resend_notification") {
        const notificationEmailStatus = await sendOrganizationCheckoutRequestEmail({
          requestId,
          organizationName: String(data.organizationName || ""),
          organizationType: String(data.organizationType || ""),
          contactName: String(data.contactName || ""),
          contactEmail: String(data.contactEmail || ""),
          phone: String(data.phone || ""),
          exemptionCertificateNumber: String(data.exemptionCertificateNumber || ""),
          certificateExpirationDate: String(data.certificateExpirationDate || ""),
          intendedUse: String(data.intendedUse || ""),
          adminReviewUrl: `${PUBLIC_SITE_ORIGIN}/admin/organization-checkout/index.html?requestId=${encodeURIComponent(requestId)}`,
          createdAt: String(data.createdAt || ""),
        });
        await requestRef.set({
          notificationEmailStatus,
          notificationEmailUpdatedAt: nowIso(),
          updatedAt: nowIso(),
        }, { merge: true });
        return void response.status(200).json({ ok: true, notificationEmailStatus });
      }
      if (action === "reject") {
        await requestRef.set({
          status: "rejected",
          reviewNotes: normalizeString(body.reviewNotes, 1000),
          reviewedAt: nowIso(),
          reviewedBy,
          updatedAt: nowIso(),
        }, { merge: true });
        return void response.status(200).json({ ok: true });
      }
      if (action !== "approve") return void response.status(400).json({ error: "Unknown action." });

      const stripe = getStripeClient();
      let stripeCustomerId = String(data.stripeCustomerId || "").trim();
      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          name: String(data.organizationName || ""),
          email: String(data.contactEmail || ""),
          phone: String(data.phone || "") || undefined,
          tax_exempt: "exempt",
          address: {
            line1: String(data.addressLine1 || ""),
            line2: String(data.addressLine2 || "") || undefined,
            city: String(data.city || ""),
            state: String(data.state || ""),
            postal_code: String(data.postalCode || ""),
            country: "US",
          },
          metadata: {
            organizationCheckoutRequestId: requestId,
            exemptionCertificateNumber: String(data.exemptionCertificateNumber || ""),
          },
        });
        stripeCustomerId = customer.id;
      } else {
        await stripe.customers.update(stripeCustomerId, { tax_exempt: "exempt" });
      }
      const lookupId = organizationLookupId(
        String(data.contactEmail || ""),
        String(data.exemptionCertificateNumber || ""),
      );
      await getAdminDb().collection("organization_checkout_lookups").doc(lookupId).set({
        requestId,
        stripeCustomerId,
        updatedAt: nowIso(),
      });
      await requestRef.set({
        status: "approved",
        stripeCustomerId,
        stripeMode: getStripeMode(),
        reviewNotes: normalizeString(body.reviewNotes, 1000),
        reviewedAt: nowIso(),
        reviewedBy,
        updatedAt: nowIso(),
      }, { merge: true });
      response.status(200).json({ ok: true, stripeCustomerId });
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      const status = ["missing_auth_token", "admin_denied"].includes(message) ? 403 : 500;
      logger.error("manageOrganizationCheckoutRequests failed", error);
      response.status(status).json({ error: status === 403 ? "Admin access required." : "Unable to manage organization requests." });
    }
  },
);

export const downloadOrganizationCertificate = onRequest(
  { region: "us-central1", cors: ALLOWED_CORS_ORIGINS, invoker: "public" },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");
    if (request.method === "OPTIONS") return void response.status(204).send("");
    if (request.method !== "GET") return void response.status(405).json({ error: "Method not allowed" });
    try {
      await requireAdmin(request);
      const requestId = normalizeString(request.query.requestId, 120);
      const snapshot = await getAdminDb().collection("organization_checkout_requests").doc(requestId).get();
      if (!snapshot.exists) return void response.status(404).json({ error: "Request not found." });
      const data = snapshot.data() || {};
      const [contents] = await getAdminBucket().file(String(data.certificateStoragePath || "")).download();
      response.set("Content-Type", String(data.certificateMimeType || "application/octet-stream"));
      response.set("Content-Disposition", `attachment; filename="${normalizeString(data.certificateFileName, 120).replace(/"/g, "") || "certificate"}"`);
      response.status(200).send(contents);
    } catch (error) {
      logger.error("downloadOrganizationCertificate failed", error);
      response.status(403).json({ error: "Admin access required." });
    }
  },
);

function existingOrderCheckoutDependencies() {
  return {db:getAdminDb(),stripe:getStripeClientForMode,parameters:(id:string,order:any):Stripe.Checkout.SessionCreateParams=>{
    // Frozen agreed amounts; only public preview images come from the current catalog.
    const lines=order.lineItems as any[];
    if(!Array.isArray(lines)||!lines.length||!lines.every(x=>typeof x.badgeName==="string"&&x.badgeName.trim()))throw new CheckoutStateError(409,"Only fixed-total name-badge orders currently support website checkout; use the existing order payment link for other products.");
    const subtotal=lines.reduce((sum:number,x:any)=>sum+x.quantity*x.unitAmount,0);
    if(!lines.length||lines.some(x=>!Number.isSafeInteger(x.quantity)||x.quantity<1||!Number.isSafeInteger(x.unitAmount)||x.unitAmount<1||x.currency!==order.currency||(x.badgeName&&Array.from(x.badgeName).length>15))||subtotal!==order.amountSubtotal||subtotal+Number(order.amountShipping||0)!==order.amountTotal)throw new CheckoutStateError(409,"order_agreed_amount_invalid");
    return {mode:"payment",ui_mode:"embedded",return_url:`${PUBLIC_SITE_ORIGIN}/receipt.html?order_id=${id}&session_id={CHECKOUT_SESSION_ID}`,client_reference_id:id,
      ...customerCollection(String(order.customerEmail||"")),
      line_items:lines.map(x=>({quantity:x.quantity,price_data:{currency:order.currency,unit_amount:x.unitAmount,tax_behavior:"inclusive",product_data:{name:x.title,metadata:{productId:x.productId||"",variationId:x.variationId||"",badgeName:x.badgeName||"",orderId:id}}}})),
      ...(order.amountShipping?{shipping_options:[{shipping_rate_data:{type:"fixed_amount",fixed_amount:{amount:order.amountShipping,currency:order.currency},display_name:"Shipping",tax_behavior:"inclusive"}}]}:{}),
      automatic_tax:{enabled:true},allow_promotion_codes:false,billing_address_collection:"required",metadata:{orderId:id,orderType:CUSTOM_ORDER_TYPE},payment_intent_data:{metadata:{orderId:id,orderType:CUSTOM_ORDER_TYPE}}};
  }};
}

export const createCheckoutSession = onRequest(
  { region: "us-central1", secrets: [STRIPE_SECRET_KEY, STRIPE_TEST_SECRET_KEY] },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    if(request.body?.orderId) {
      response.set("Cache-Control","private, no-store");
      try {
        if(Object.keys(request.body).some(key=>!["orderId","sessionId","termsAccepted"].includes(key)))throw new CheckoutStateError(400,"invalid_order_checkout_fields");
        response.json(await prepareExistingOrderCheckout(existingOrderCheckoutDependencies(),request.body));
      } catch(error) {response.status(error instanceof CheckoutStateError?error.status:409).json({error:error instanceof CheckoutStateError?error.code:"Order checkout unavailable. Retry or contact the store."});}
      return;
    }

    if (!validateCheckoutBody(request.body)) {
      response.status(400).json({ error: "Invalid request body" });
      return;
    }

    const idempotencyKey = request.header("x-idempotency-key") ?? undefined;

    try {
      const stripeMode = getStripeMode();
      if (isLocalRequest(request) && stripeMode !== "sandbox") {
        response.status(400).json({
          error: "Local checkout requires a Stripe sandbox secret key.",
        });
        return;
      }

      const stripe = getStripeClient();
      const orderId = createOrderId();
      const cartItems = normalizeCheckoutCartItems(request.body.cartItems);
      const lineItems = resolveCheckoutLineItems(cartItems, await loadProductCatalog());
      const organizationEmail = normalizeEmail(String(request.body.organizationEmail || ""));
      const exemptionCertificateNumber = normalizeCertificateNumber(String(request.body.exemptionCertificateNumber || ""));
      const organization = organizationEmail || exemptionCertificateNumber
        ? await getApprovedOrganization(organizationEmail, exemptionCertificateNumber)
        : null;
      if ((organizationEmail || exemptionCertificateNumber) && !organization) {
        response.status(400).json({ error: "The tax-exempt organization could not be verified or its certificate has expired." });
        return;
      }
      const organizationName = organization ? String(organization.data.organizationName || "") : "";
      const stripeCustomerId = organization ? String(organization.data.stripeCustomerId || "") : "";
      const checkoutEmail = organization
        ? String(organization.data.contactEmail || "")
        : String(request.body.customerEmail || "").trim();
      const createdAt = nowIso();
      const adminOrderUrl = getAdminOrderUrl(request.body.successUrl, orderId);
      const publicOrderUrl = getPublicOrderUrl(request.body.successUrl, orderId, checkoutEmail);
      const session = await stripe.checkout.sessions.create(
        {
          mode: "payment",
          ui_mode: "embedded",
          return_url: appendUrlParams(request.body.successUrl, {
            order_id: orderId,
            session_id: "{CHECKOUT_SESSION_ID}",
          }),
          client_reference_id: orderId,
          ...(stripeCustomerId
            ? { customer: stripeCustomerId }
            : { customer_email: request.body.customerEmail }),
          ...(stripeCustomerId
            ? { customer_update: { address: "auto" as const, name: "auto" as const, shipping: "auto" as const } }
            : {}),
          line_items: lineItems.map((item) => ({
            price_data: {
              currency: item.currency,
              unit_amount: item.unitAmount,
              product_data: {
                name: item.title,
                metadata: {
                  productId: item.productId,
                  variationId: item.variationId,
                  badgeName: item.badgeName || "",
                },
              },
            },
            quantity: item.quantity,
          })),
          automatic_tax: { enabled: true },
          allow_promotion_codes: true,
          billing_address_collection: "required",
          shipping_address_collection: {
            allowed_countries: ["US", "CA"],
          },
          metadata: {
            orderId,
            organizationCheckoutRequestId: organization?.id || "",
            organizationName,
            taxExemptCustomer: organization ? "true" : "false",
          },
          payment_intent_data: {
            metadata: {
              orderId,
              organizationCheckoutRequestId: organization?.id || "",
              taxExemptCustomer: organization ? "true" : "false",
            },
          },
        },
        idempotencyKey ? { idempotencyKey } : undefined,
      );

      await getAdminDb().collection("orders").doc(orderId).set({
        id: orderId,
        status: "checkout_created",
        lineItems,
        currency: "",
        amountSubtotal: 0,
        amountTax: 0,
        amountShipping: 0,
        amountTotal: 0,
        customerEmail: checkoutEmail,
        customerName: "",
        stripeCustomerId,
        organizationCheckoutRequestId: organization?.id || "",
        organizationName,
        exemptionCertificateNumber: organization ? String(organization.data.exemptionCertificateNumber || "") : "",
        taxExemptCustomer: Boolean(organization),
        checkoutSessionId: session.id,
        checkoutUrl: "",
        paymentIntentId: "",
        latestStripeEventId: "",
        stripeMode,
        notificationEmail: ORDER_NOTIFICATION_EMAIL,
        notificationEmailStatus: "pending_payment",
        publicOrderUrl,
        createdAt,
        updatedAt: createdAt,
        paidAt: "",
        stripeDashboardUrl: getStripePaymentSearchUrl(session.id, stripeMode),
        adminOrderUrl,
      });

      response.status(200).json({
        orderId,
        sessionId: session.id,
        stripeMode,
        taxExemptCustomer: Boolean(organization),
        organizationName,
        clientSecret: session.client_secret,
      });
    } catch (error) {
      logger.error("createCheckoutSession failed", error);
      const errorResponse = getCheckoutErrorResponse(error);
      response.status(errorResponse.status).json({ error: errorResponse.message });
    }
  },
);

// Both web-admin and scoped laptop requests use the same validated creation service.
async function createUnpaidCustomOrder(request: {body: any; header: (name: string) => string | undefined}, requestedByAdminEmail: string, integration?: IntegrationGrant & {id: string}) {
      const customerName = normalizeString(request.body?.customerName, 160);
      const customerEmail = normalizeEmail(normalizeString(request.body?.customerEmail, 254));
      const amountShipping = Math.max(0, Math.round(Number(request.body?.amountShipping) || 0));
      const sourceUrl = normalizeString(request.body?.sourceUrl, 2000) || PUBLIC_SITE_ORIGIN;

      if (customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) throw new Error("invalid_customer_email");
      const cartItems = normalizeCheckoutCartItems(
        Array.isArray(request.body?.cartItems) ? request.body.cartItems : [],
        99999,
      );
      if (!cartItems.length) throw new Error("custom_order_items_required");
      const lineItems = resolveCheckoutLineItems(cartItems, await loadProductCatalog());
      const currencies = new Set(lineItems.map((item) => item.currency));
      if (currencies.size !== 1) throw new Error("custom_order_currency_mismatch");
      const currency = lineItems[0].currency;

      const requestedStripeMode = String(request.body?.stripeMode || "live");
      const stripeMode: "sandbox" | "live" = requestedStripeMode === "sandbox" ? "sandbox" : "live";

      if (integration) assertIntegrationOrder(integration, request.body, lineItems, amountShipping, stripeMode);
      const orderId = customOrderRequestId(integration ? `${requestedByAdminEmail}:integration:${integration.id}` : requestedByAdminEmail, request.header("x-idempotency-key"));
      const creationHash = createHash("sha256").update(JSON.stringify({customerName, customerEmail, amountShipping, lineItems, stripeMode})).digest("hex");
      const orderRef = getAdminDb().collection("orders").doc(orderId);
      const saved: Record<string, any> = await getAdminDb().runTransaction(async (transaction) => {
        const snapshot = await transaction.get(orderRef);
        const integrationRef = integration ? getAdminDb().collection("order_integrations").doc(integration.id) : null;
        const currentGrant = integrationRef ? (await transaction.get(integrationRef)).data() : null;
        if (integration) {
          verifyIntegrationGrant(currentGrant, integration.tokenHash, "orders:create");
          assertIntegrationOrder(currentGrant as IntegrationGrant, request.body, lineItems, amountShipping, stripeMode);
        }
        if (snapshot.exists) {
          const data = snapshot.data() || {};
          if (data.creationHash !== creationHash) throw new Error("order_request_conflict");
          return data;
        }
        const draft = { id: orderId, orderType: CUSTOM_ORDER_TYPE, status: "checkout_created", lineItems, currency,
          amountSubtotal: lineItems.reduce((sum, item) => sum + item.unitAmount * item.quantity, 0), amountShipping,
          amountTotal: lineItems.reduce((sum, item) => sum + item.unitAmount * item.quantity, 0) + amountShipping, amountTax: 0,
          customerName, customerEmail, customerDetailsPending: !customerEmail || !customerName,
          createdAt: nowIso(), updatedAt: nowIso(), stripeMode, creationHash, createdByAdminEmail: requestedByAdminEmail,
          adminOrderUrl: getAdminOrderUrl(PUBLIC_SITE_ORIGIN, orderId), notificationEmailStatus: "pending_payment" };
        if (integration && integrationRef) {
          const amount = lineItems.reduce((sum, item) => sum + item.unitAmount * item.quantity, 0) + amountShipping;
          transaction.set(integrationRef, reserveIntegrationOrder(currentGrant as IntegrationGrant, amount), {merge:true});
          Object.assign(draft, {createdByIntegrationId: integration.id});
        }
        transaction.create(orderRef, draft);
        return draft;
      });
      if (saved.checkoutSessionId) {
        return {ok:true, orderId, checkoutSessionId:saved.checkoutSessionId,checkoutLinkSessionId:saved.checkoutLinkSessionId||saved.checkoutSessionId, adminOrderUrl: saved.adminOrderUrl, publicOrderUrl: saved.publicOrderUrl || "", checkoutUrl: saved.checkoutUrl || "", reused:true};
      }
      const createdAt = String(saved.createdAt);
      const amountSubtotal = lineItems.reduce((total, item) => total + (item.unitAmount * item.quantity), 0);
      const amountTotal = amountSubtotal + amountShipping;
      const publicOrderUrl = customerEmail ? getPublicOrderUrl(PUBLIC_SITE_ORIGIN, orderId, customerEmail) : "";
      const adminOrderUrl = getAdminOrderUrl(PUBLIC_SITE_ORIGIN, orderId);
      const successUrl = appendUrlParams(getPublicOrderUrl(PUBLIC_SITE_ORIGIN, orderId, customerEmail).replace("/order.html", "/receipt.html"), {
        session_id: "{CHECKOUT_SESSION_ID}",
      });
      const stripe = getStripeClientForMode(stripeMode);
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: successUrl,
        cancel_url: `${PUBLIC_SITE_ORIGIN}/products.html`,
        client_reference_id: orderId,
        ...customerCollection(customerEmail),
        line_items: lineItems.map((item) => ({
          price_data: {
            currency,
            unit_amount: item.unitAmount,
            ...(item.badgeName || integration ? { tax_behavior: "inclusive" as const } : {}),
            product_data: {
              name: item.title,
              metadata: { productId: item.productId, badgeName: item.badgeName || "", variationId: item.variationId, orderId },
            },
          },
          quantity: item.quantity,
        })),
        ...(amountShipping ? {
          shipping_options: [{
            shipping_rate_data: {
              type: "fixed_amount" as const,
              ...(integration ? {tax_behavior: "inclusive" as const} : {}),
              fixed_amount: { amount: amountShipping, currency },
              display_name: "Shipping",
            },
          }],
        } : {}),
        automatic_tax: { enabled: true },
        allow_promotion_codes: false,
        billing_address_collection: "required",
        metadata: { orderId, orderType: CUSTOM_ORDER_TYPE },
        payment_intent_data: { metadata: { orderId, orderType: CUSTOM_ORDER_TYPE } },
      }, {idempotencyKey: orderId});

      if (integration && (session.livemode !== (stripeMode === "live") || (session.amount_total !== null && session.amount_total !== undefined && session.amount_total !== amountTotal))) {
        throw new IntegrationError(502,"integration_checkout_mismatch");
      }
      await getAdminDb().runTransaction(async (transaction) => {
        const current = (await transaction.get(orderRef)).data() || {};
        transaction.set(orderRef, {
        id: orderId,
        orderType: CUSTOM_ORDER_TYPE,
        status: "checkout_created",
        lineItems,
        currency,
        amountSubtotal,
        amountTax: 0,
        amountShipping,
        amountTotal,
        customerEmail,
        customerName,
        checkoutSessionId: session.id,
        checkoutUrl: session.url || "",
        paymentIntentId: "",
        latestStripeEventId: "",
        stripeMode,
        notificationEmail: ORDER_NOTIFICATION_EMAIL,
        notificationEmailStatus: "pending_payment",
        publicOrderUrl,
        createdAt,
        updatedAt: createdAt,
        paidAt: "",
        stripeDashboardUrl: getStripePaymentSearchUrl(session.id, stripeMode),
        adminOrderUrl,
        createdByAdminEmail: requestedByAdminEmail,
        ...(current.status === "paid" ? current : {}),
      }, {merge:true});
      });

      return { ok: true, orderId, checkoutSessionId:session.id,adminOrderUrl, publicOrderUrl, checkoutUrl: session.url || "" };
}

export const createCustomOrder = onRequest(
  { region: "us-central1", secrets: [STRIPE_SECRET_KEY, STRIPE_TEST_SECRET_KEY] },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");
    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }
    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const requestedByAdminEmail = await requireAdmin(request);
      const result = await createUnpaidCustomOrder(request, requestedByAdminEmail);
      response.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      logger.error("createCustomOrder failed", error);
      if (["order_request_key_required", "order_request_conflict", "invalid_customer_email"].includes(message)) {
        response.status(message === "order_request_conflict" ? 409 : 400).json({error: message});
      } else if (message === "missing_auth_token") {
        response.status(401).json({ error: "Sign in required." });
      } else if (message === "admin_denied") {
        response.status(403).json({ error: "Admin access required." });
      } else if (message === "customer_email_required") {
        response.status(400).json({ error: "Customer email is required." });
      } else if (message === "custom_order_items_required") {
        response.status(400).json({ error: "Add at least one catalog product." });
      } else if (message === "custom_order_currency_mismatch") {
        response.status(400).json({ error: "All order products must use the same currency." });
      } else if (message === "stripe_test_mode_unavailable") {
        response.status(409).json({ error: "Test order creation requires STRIPE_TEST_SECRET_KEY to contain a Stripe test key." });
      } else if (message === "stripe_live_mode_unavailable") {
        response.status(409).json({ error: "Live order creation requires STRIPE_SECRET_KEY to contain a Stripe live key." });
      } else {
        response.status(500).json({ error: "Failed to create custom order." });
      }
    }
  },
);

export const updateCustomOrder = onRequest(
  { region: "us-central1", secrets: [STRIPE_SECRET_KEY, STRIPE_TEST_SECRET_KEY] },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");
    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }
    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    let editLock:any;let replacementStarted=false;
    try {
      const requestedByAdminEmail = await requireAdmin(request);
      const updateRequestId = customOrderRequestId(requestedByAdminEmail, request.header("x-idempotency-key"));
      const orderId = normalizeString(request.body?.orderId, 200);
      const customerName = normalizeString(request.body?.customerName, 160);
      const customerEmail = normalizeEmail(normalizeString(request.body?.customerEmail, 254));
      const amountShipping = Math.max(0, Math.round(Number(request.body?.amountShipping) || 0));
      const sourceUrl = normalizeString(request.body?.sourceUrl, 2000) || PUBLIC_SITE_ORIGIN;
      if (!orderId) throw new Error("custom_order_id_required");
      if (customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) throw new Error("invalid_customer_email");

      const orderRef = getAdminDb().collection("orders").doc(orderId);
      const snapshot = await orderRef.get();
      if (!snapshot.exists) throw new Error("custom_order_not_found");
      const existing = snapshot.data() || {};
      if (String(existing.orderType || "") !== CUSTOM_ORDER_TYPE) throw new Error("custom_order_not_editable");
      const existingStatus = String(existing.status || "");
      const editDigest=createHash("sha256").update(JSON.stringify(request.body)).digest("hex");
      if(existing.lastCheckoutEditRequest===updateRequestId){if(existing.lastCheckoutEditDigest!==editDigest)throw new CheckoutStateError(409,"order_request_conflict");const saved=existing.replacedByOrderId?(await getAdminDb().collection("orders").doc(existing.replacedByOrderId).get()).data()||existing:existing;response.json({ok:true,orderId:saved.id||orderId,checkoutSessionId:saved.checkoutSessionId,checkoutLinkSessionId:saved.checkoutLinkSessionId,checkoutUrl:saved.checkoutUrl||"",stripeMode:saved.stripeMode});return;}

      if (!["checkout_created", "closed"].includes(existingStatus)) throw new Error("custom_order_not_editable");

      const cartItems = normalizeCheckoutCartItems(
        Array.isArray(request.body?.cartItems) ? request.body.cartItems : [],
        99999,
      );
      if (!cartItems.length) throw new Error("custom_order_items_required");
      const lineItems = resolveEditableCheckoutLineItems(
        cartItems,
        await loadProductCatalog(),
        existing.lineItems,
        String(existing.currency || "usd"),
      );
      const currencies = new Set(lineItems.map((item) => item.currency));
      if (currencies.size !== 1) throw new Error("custom_order_currency_mismatch");
      const currency = lineItems[0].currency;
      const requestedStripeMode = String(request.body?.stripeMode || existing.stripeMode || "live");
      const stripeMode: "sandbox" | "live" = requestedStripeMode === "sandbox" ? "sandbox" : "live";
      const existingStripeMode: "sandbox" | "live" = String(existing.stripeMode || "") === "sandbox"
        ? "sandbox"
        : "live";
      const modeChanged = existingStripeMode !== stripeMode;

      if (existingStatus === "closed") {
        const amountSubtotal = lineItems.reduce((total, item) => total + (item.unitAmount * item.quantity), 0);
        const amountTotal = amountSubtotal + amountShipping;
        const updatedAt = nowIso();
        const targetOrderId = modeChanged ? updateRequestId : orderId;
        const targetOrderRef = getAdminDb().collection("orders").doc(targetOrderId);
        const closedOrderUpdate = {
          ...(modeChanged ? existing : {}),
          id: targetOrderId,
          lineItems,
          currency,
          amountSubtotal,
          amountShipping,
          amountTotal,
          customerEmail,
          customerName,
        customerDetailsPending: !customerName || !customerEmail,
          stripeMode,
          adminOrderUrl: getAdminOrderUrl(PUBLIC_SITE_ORIGIN, targetOrderId),
          publicOrderUrl: getPublicOrderUrl(sourceUrl, targetOrderId, customerEmail),
          updatedAt,
          updatedByAdminEmail: requestedByAdminEmail,
          ...(modeChanged ? { convertedFromOrderId: orderId } : {}),
        };
        await targetOrderRef.set(closedOrderUpdate, { merge: !modeChanged });
        if (modeChanged) {
          await orderRef.set({
            status: "canceled",
            replacedByOrderId: targetOrderId,
            updatedAt,
            updatedByAdminEmail: requestedByAdminEmail,
          }, { merge: true });
        }
        response.status(200).json({ ok: true, orderId: targetOrderId, closedOrderUpdated: true, modeChanged, stripeMode });
        return;
      }

      const amountSubtotal = lineItems.reduce((total, item) => total + (item.unitAmount * item.quantity), 0);
      const amountTotal = amountSubtotal + amountShipping;
      const targetOrderId = modeChanged ? updateRequestId : orderId;
      const targetOrderRef = getAdminDb().collection("orders").doc(targetOrderId);
      const publicOrderUrl = customerEmail ? getPublicOrderUrl(PUBLIC_SITE_ORIGIN, targetOrderId, customerEmail) : "";
      const successUrl = appendUrlParams(getPublicOrderUrl(PUBLIC_SITE_ORIGIN, targetOrderId, customerEmail).replace("/order.html", "/receipt.html"), { session_id: "{CHECKOUT_SESSION_ID}" });
      const stripe = getStripeClientForMode(stripeMode);
      if(existing.checkoutChannel==="embedded")existingOrderCheckoutDependencies().parameters(targetOrderId,{...existing,lineItems,currency,amountSubtotal,amountShipping,amountTotal,customerEmail});
      editLock=await beginCheckoutTransition(getAdminDb(),orderId,"edit",updateRequestId+":"+editDigest,existing.checkoutSessionId);
      await expireUnpaidCheckout(getStripeClientForMode(existingStripeMode),orderId,editLock.order,editLock.lease.id);
      replacementStarted=true;
      const session = await stripe.checkout.sessions.create(existing.checkoutChannel==="embedded" ? existingOrderCheckoutDependencies().parameters(targetOrderId,{...existing,lineItems,currency,amountSubtotal,amountShipping,amountTotal,customerEmail}) : {
        mode: "payment",
        success_url: successUrl,
        cancel_url: `${PUBLIC_SITE_ORIGIN}/products.html`,
        client_reference_id: targetOrderId,
        ...customerCollection(customerEmail),
        line_items: lineItems.map((item) => ({
          price_data: {
            currency,
            unit_amount: item.unitAmount,
            ...(item.badgeName ? { tax_behavior: "inclusive" as const } : {}),
            product_data: {
              name: item.title,
              metadata: { productId: item.productId, badgeName: item.badgeName || "", variationId: item.variationId, orderId: targetOrderId },
            },
          },
          quantity: item.quantity,
        })),
        ...(amountShipping ? {
          shipping_options: [{
            shipping_rate_data: {
              type: "fixed_amount" as const,
              fixed_amount: { amount: amountShipping, currency },
              display_name: "Shipping",
            },
          }],
        } : {}),
        automatic_tax: { enabled: true },
        allow_promotion_codes: false,
        billing_address_collection: "required",
        metadata: { orderId: targetOrderId, orderType: CUSTOM_ORDER_TYPE },
        payment_intent_data: { metadata: { orderId: targetOrderId, orderType: CUSTOM_ORDER_TYPE } },
      }, { idempotencyKey: editLock.lease.id });

      const updatedAt = nowIso();
      const updatedOrder = {
        ...(modeChanged ? existing : {}),
        id: targetOrderId,
        orderType: CUSTOM_ORDER_TYPE,
        status: "checkout_created",
        lineItems,
        currency,
        amountSubtotal,
        amountTax: 0,
        amountShipping,
        amountTotal,
        customerEmail,
        customerName,
        customerDetailsPending: !customerName || !customerEmail,
        stripeMode,
        checkoutSessionId: session.id,
        checkoutLinkSessionId: modeChanged?session.id:(existing.checkoutLinkSessionId||existing.checkoutSessionId),
        checkoutChannel:existing.checkoutChannel||"hosted",checkoutTransition:null,lastCheckoutEditRequest:updateRequestId,lastCheckoutEditDigest:editDigest,
        checkoutUrl: session.url || "",
        paymentIntentId: "",
        latestStripeEventId: "",
        stripeDashboardUrl: getStripePaymentSearchUrl(session.id, stripeMode),
        adminOrderUrl: getAdminOrderUrl(PUBLIC_SITE_ORIGIN, targetOrderId),
        publicOrderUrl,
        notificationEmailStatus: "pending_payment",
        paidAt: "",
        createdAt: modeChanged ? updatedAt : String(existing.createdAt || updatedAt),
        updatedAt,
        updatedByAdminEmail: requestedByAdminEmail,
        ...(modeChanged ? { convertedFromOrderId: orderId } : {}),
      };
      await getAdminDb().runTransaction(async(tx:any)=>{const current=(await tx.get(orderRef)).data();
        if(current?.checkoutTransition?.id!==editLock.lease.id||current.status!=="checkout_created"||current.paidAt||current.checkoutSessionId!==editLock.lease.sourceSessionId||checkoutFingerprint(current)!==editLock.lease.fingerprint)throw new CheckoutStateError(409,"checkout_changed");
        tx.set(targetOrderRef,updatedOrder,{merge:!modeChanged});
        if(modeChanged)tx.set(orderRef,{status:"canceled",checkoutTransition:null,replacedByOrderId:targetOrderId,lastCheckoutEditRequest:updateRequestId,lastCheckoutEditDigest:editDigest,updatedAt},{merge:true});
      });


      response.status(200).json({ ok: true, orderId: targetOrderId, checkoutSessionId:session.id,checkoutLinkSessionId:updatedOrder.checkoutLinkSessionId, publicOrderUrl, checkoutUrl: session.url || "", modeChanged, stripeMode });
    } catch (error) {
      if(editLock&&!replacementStarted)await releaseCheckoutTransition(getAdminDb(),editLock.ref,editLock.lease);
      const message = error instanceof Error ? error.message : "";
      logger.error("updateCustomOrder failed", error);
      if(error instanceof CheckoutStateError){response.status(error.status).json({error:error.code});return;}
      if (["order_request_key_required", "order_request_conflict", "invalid_customer_email"].includes(message)) {
        response.status(message === "order_request_conflict" ? 409 : 400).json({error: message});
      } else if (message === "missing_auth_token") {
        response.status(401).json({ error: "Sign in required." });
      } else if (message === "admin_denied") {
        response.status(403).json({ error: "Admin access required." });
      } else if (message === "customer_email_required") {
        response.status(400).json({ error: "Customer email is required." });
      } else if (message === "custom_order_not_found") {
        response.status(404).json({ error: "Order not found." });
      } else if (message === "custom_order_not_editable") {
        response.status(409).json({ error: "Only unpaid or closed custom orders can be edited." });
      } else if (message === "custom_order_items_required") {
        response.status(400).json({ error: "Add at least one catalog product." });
      } else if (message === "custom_order_currency_mismatch") {
        response.status(400).json({ error: "The order products do not use the same currency." });
      } else if (/^(Product|Product option|Product price) is unavailable:/.test(message)) {
        response.status(400).json({ error: message });
      } else if (message === "stripe_test_mode_unavailable") {
        response.status(409).json({ error: "Test order editing requires STRIPE_TEST_SECRET_KEY to contain a Stripe test key." });
      } else if (message === "stripe_live_mode_unavailable") {
        response.status(409).json({ error: "Live order editing requires STRIPE_SECRET_KEY to contain a Stripe live key." });
      } else {
        response.status(500).json({ error: "Failed to update custom order." });
      }
    }
  },
);

export const getPublicOrder = onRequest(
  { region: "us-central1" },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "GET") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const orderId = String(request.query.orderId || request.query.order_id || "").trim();
      const email = normalizeEmail(String(request.query.email || ""));
      if (!orderId || !email) {
        response.status(400).json({ error: "Missing order id or email." });
        return;
      }

      const orderSnapshot = await getAdminDb().collection("orders").doc(orderId).get();
      if (!orderSnapshot.exists) {
        response.status(404).json({ error: "Order not found." });
        return;
      }

      const data = orderSnapshot.data() || {};
      if (normalizeEmail(String(data.customerEmail || "")) !== email) {
        response.status(404).json({ error: "Order not found." });
        return;
      }

      const order = getNotificationOrderInput(orderId, data);
      response.status(200).json({
        order: {
          id: order.orderId,
          status: order.status,
          lineItems: order.lineItems,
          currency: order.currency,
          amountSubtotal: order.amountSubtotal,
          amountTax: order.amountTax,
          amountShipping: order.amountShipping,
          amountTotal: order.amountTotal,
          customerEmail: order.customerEmail,
          customerName: order.customerName,
          stripeMode: order.stripeMode,
          createdAt: String(data.createdAt || ""),
          updatedAt: String(data.updatedAt || ""),
          paidAt: String(data.paidAt || ""),
          checkoutUrl: order.status === "checkout_created" ? String(data.checkoutUrl || "") : "",
        },
      });
    } catch (error) {
      logger.error("getPublicOrder failed", error);
      response.status(500).json({ error: "Failed to load order." });
    }
  },
);

export const getPublicOrderReceiptLink = onRequest(
  { region: "us-central1", secrets: [STRIPE_SECRET_KEY] },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "GET") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const orderId = String(request.query.orderId || request.query.order_id || "").trim();
      const sessionId = String(request.query.sessionId || request.query.session_id || "").trim();
      logger.info("public order receipt link requested", { orderId, sessionId });
      if (!orderId || !sessionId) {
        response.status(400).json({ error: "Missing order id or checkout session." });
        return;
      }

      const orderSnapshot = await getAdminDb().collection("orders").doc(orderId).get();
      if (!orderSnapshot.exists) {
        response.status(404).json({ error: "Order not found." });
        return;
      }

      const data = orderSnapshot.data() || {};
      const storedSessionId = String(data.checkoutSessionId || "").trim();
      logger.info("public order receipt link order loaded", {
        orderId,
        sessionId,
        storedSessionId,
        status: String(data.status || ""),
        hasCustomerEmail: Boolean(String(data.customerEmail || "").trim()),
        hasPaymentIntentId: Boolean(String(data.paymentIntentId || "").trim()),
        paidAt: String(data.paidAt || ""),
      });
      if (!storedSessionId || storedSessionId !== sessionId) {
        response.status(404).json({ error: "Order not found." });
        return;
      }

      let customerEmail = String(data.customerEmail || "").trim();
      let publicOrderUrl = getCanonicalPublicOrderUrl(
        orderId,
        customerEmail,
        String(data.publicOrderUrl || ""),
      );
      let receiptOrderData: Record<string, unknown> = data;
      const hasStoredPaymentDetails = Boolean(String(data.paymentIntentId || "").trim())
        && String(data.status || "") === "paid"
        && Boolean(String(data.paidAt || "").trim());

      if (!customerEmail || !hasStoredPaymentDetails) {
        logger.info("public order receipt link backfilling from Stripe checkout session", {
          orderId,
          sessionId,
          reason: {
            missingCustomerEmail: !customerEmail,
            missingPaymentDetails: !hasStoredPaymentDetails,
          },
        });
        const stripe = getStripeClientForMode(data.stripeMode === "sandbox" ? "sandbox" : "live");
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items", "payment_intent"],
        });
        const sessionOrderId = String(session.metadata?.orderId || session.client_reference_id || "").trim();
        if (!sessionOrderId || sessionOrderId !== orderId) {
          response.status(404).json({ error: "Order not found." });
          return;
        }

        const paymentIntent = session.payment_intent;
        const paymentIntentId = typeof paymentIntent === "string"
          ? paymentIntent
          : String(paymentIntent?.id || "");
        const stripeCustomerId = typeof session.customer === "string"
          ? session.customer
          : String(session.customer?.id || "");
        const customerDetails = session.customer_details;
        const totalDetails = session.total_details;
        const stripeMode = session.livemode ? "live" : "sandbox";
        const isPaid = session.payment_status === "paid";
        if (!isPaid) { response.status(409).json({error:"Payment has not completed."}); return; }
        assertCurrentPaidSession(data, session);
        customerEmail = String(customerDetails?.email || session.customer_email || "").trim();
        logger.info("public order receipt link Stripe session retrieved", {
          orderId,
          sessionId,
          paymentStatus: session.payment_status,
          customerEmail,
          customerName: verifiedCustomerName(session),
          paymentIntentId,
          stripeCustomerId,
          stripeMode,
        });
        publicOrderUrl = getCanonicalPublicOrderUrl(
          orderId,
          customerEmail,
          getPublicOrderUrl(String(session.success_url || ""), orderId, customerEmail),
        );
        const lineItems = session.line_items?.data.map((item) => {
          const priceMetadata = typeof item.price === "string" ? {} : item.price?.metadata || {};
          return {
            productId: String(priceMetadata.productId || ""),
            variationId: String(priceMetadata.variationId || ""),
            quantity: item.quantity || 0,
            title: item.description || "Product",
            unitAmount: item.amount_subtotal && item.quantity ? Math.round(item.amount_subtotal / item.quantity) : 0,
            currency: String(session.currency || "usd").toLowerCase(),
          };
        }) || [];
        const paidAt = isPaid ? String(data.paidAt || nowIso()) : String(data.paidAt || "");
        const stripeDashboardUrl = paymentIntentId
          ? getStripePaymentIntentUrl(paymentIntentId, stripeMode)
          : getStripePaymentSearchUrl(session.id, stripeMode);
        receiptOrderData = {
          ...data,
          id: orderId,
          agreementId: String(data.agreementId || session.metadata?.agreementId || "").trim(),
          orderType: String(data.orderType || session.metadata?.orderType || "").trim(),
          status: isPaid ? "paid" : String(data.status || "checkout_created"),
          lineItems,
          currency: String(session.currency || data.currency || "").toLowerCase(),
          amountSubtotal: Number(session.amount_subtotal) || Number(data.amountSubtotal) || 0,
          amountTax: Number(totalDetails?.amount_tax) || Number(data.amountTax) || 0,
          amountShipping: Number(totalDetails?.amount_shipping) || Number(data.amountShipping) || 0,
          amountTotal: Number(session.amount_total) || Number(data.amountTotal) || 0,
          customerEmail,
          customerName: verifiedCustomerName(session) || String(data.customerName || ""),
          customerDetailsPending: !verifiedCustomerName(session) || !customerEmail,
          checkoutSessionId: session.id,
          paymentIntentId,
          stripeCustomerId,
          stripeMode,
          publicOrderUrl,
          paidAt,
          updatedAt: nowIso(),
          stripeDashboardUrl,
          adminOrderUrl: String(data.adminOrderUrl || getAdminOrderUrl(String(session.success_url || ""), orderId)),
        };

        await orderSnapshot.ref.set(receiptOrderData, { merge: true });
        if (isPaid) {
          await markLinkedAgreementPaid(
            orderId,
            receiptOrderData,
            {
              amountTotal: Number(receiptOrderData.amountTotal) || 0,
              currency: String(receiptOrderData.currency || "usd"),
              stripeDashboardUrl,
            },
            paidAt || nowIso(),
            session.id,
          );
        }
        logger.info("public order receipt link backfill saved", {
          orderId,
          sessionId,
          customerEmail,
          paymentIntentId,
          status: isPaid ? "paid" : String(data.status || "checkout_created"),
        });
      }

      if (String(receiptOrderData.status || "") === "paid") {
        await markLinkedAgreementPaid(
          orderId,
          receiptOrderData,
          {
            amountTotal: Number(receiptOrderData.amountTotal) || 0,
            currency: String(receiptOrderData.currency || "usd"),
            stripeDashboardUrl: String(receiptOrderData.stripeDashboardUrl || ""),
          },
          String(receiptOrderData.paidAt || nowIso()),
          String(receiptOrderData.checkoutSessionId || sessionId),
        );
      }

      if (!customerEmail) {
        response.status(404).json({ error: "Customer email is not available yet." });
        return;
      }

      response.status(200).json({
        customerEmail,
        publicOrderUrl,
        order: {
          id: orderId,
          status: String(receiptOrderData.status || ""),
          lineItems: Array.isArray(receiptOrderData.lineItems) ? receiptOrderData.lineItems : [],
          currency: String(receiptOrderData.currency || ""),
          amountSubtotal: Number(receiptOrderData.amountSubtotal) || 0,
          amountTax: Number(receiptOrderData.amountTax) || 0,
          amountShipping: Number(receiptOrderData.amountShipping) || 0,
          amountTotal: Number(receiptOrderData.amountTotal) || 0,
          customerEmail,
          customerName: String(receiptOrderData.customerName || ""),
          paidAt: String(receiptOrderData.paidAt || ""),
        },
      });
    } catch (error) {
      logger.error("getPublicOrderReceiptLink failed", error);
      response.status(500).json({ error: "Failed to load order link." });
    }
  },
);

export const stripeWebhook = onRequest(
  { region: "us-central1", secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, SMTP_USER, SMTP_PASS] },
  async (request, response) => {
    logger.info("stripeWebhook request received", {
      method: request.method,
      hasSignature: Boolean(request.header("stripe-signature")),
      userAgent: request.header("user-agent") || "",
    });

    if (request.method === "GET") {
      response.status(200).json({
        ok: true,
        route: "stripeWebhook",
        message: "Stripe webhooks must POST signed events to this URL.",
      });
      return;
    }

    if (request.method !== "POST") {
      response.status(405).send("Method not allowed");
      return;
    }

    const signature = request.header("stripe-signature");
    if (!signature) {
      response.status(400).send("Missing Stripe signature");
      return;
    }

    try {
      const stripe = getStripeClient();
      const event = stripe.webhooks.constructEvent(
        request.rawBody,
        signature,
        STRIPE_WEBHOOK_SECRET.value(),
      );

      switch (event.type) {
        case "checkout.session.async_payment_succeeded":
        case "checkout.session.completed":
          await handleCheckoutSessionCompleted(stripe, event);
          logger.info("checkout.session.completed", {
            sessionId: (event.data.object as Stripe.Checkout.Session).id,
          });
          break;
        case "payment_intent.succeeded":
          await handlePaymentIntentSucceeded(stripe, event);
          logger.info("payment_intent.succeeded", {
            paymentIntentId: (event.data.object as Stripe.PaymentIntent).id,
          });
          break;
        case "payment_intent.payment_failed":
          await handlePaymentIntentFailed(event);
          logger.warn("payment_intent.payment_failed", {
            paymentIntentId: (event.data.object as Stripe.PaymentIntent).id,
          });
          break;
        default:
          logger.debug("Unhandled Stripe event", { type: event.type });
      }
      response.status(200).json({ received: true });
    } catch (error) {
      logger.error("stripeWebhook signature verification failed", error);
      response.status(400).send("Invalid webhook signature");
    }
  },
);

export const resendOrderNotification = onRequest(
  { region: "us-central1", secrets: [SMTP_USER, SMTP_PASS] },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const orderId = String(request.body?.orderId || "").trim();
      logger.info("resend order notification request received", {
        orderId,
        hasAuthorization: Boolean(request.header("authorization")),
      });
      const requestedByAdminEmail = await requireAdmin(request);
      if (!orderId) {
        response.status(400).json({ error: "Missing orderId" });
        return;
      }
      logger.info("resend order notification authorized", { orderId, requestedByAdminEmail });

      const orderRef = getAdminDb().collection("orders").doc(orderId);
      const orderSnapshot = await orderRef.get();
      if (!orderSnapshot.exists) {
        logger.warn("resend order notification order not found", { orderId, requestedByAdminEmail });
        response.status(404).json({ error: "Order not found" });
        return;
      }

      const order = getNotificationOrderInput(orderId, orderSnapshot.data() || {});
      const notificationStatus = await sendOrderNotificationEmail(order);
      logger.info("resend order notification email attempted", {
        orderId,
        requestedByAdminEmail,
        notificationStatus,
      });
      await orderRef.set({
        notificationEmail: ORDER_NOTIFICATION_EMAIL,
        notificationEmailStatus: notificationStatus,
        notificationEmailUpdatedAt: nowIso(),
        notificationEmailManualResentAt: nowIso(),
      }, { merge: true });

      if (notificationStatus === "not_configured") {
        response.status(400).json({ error: "Gmail SMTP is not configured." });
        return;
      }

      response.status(200).json({ ok: true, notificationStatus });
    } catch (error) {
      logger.error("resend order notification failed", error);
      const message = error instanceof Error ? error.message : "";
      if (message === "missing_auth_token") {
        response.status(401).json({ error: "Sign in required." });
        return;
      }
      if (message === "admin_denied") {
        response.status(403).json({ error: "Admin access required." });
        return;
      }
      if (isSmtpAuthError(message)) {
        response.status(400).json({
          error: "Gmail SMTP rejected SMTP_USER/SMTP_PASS. Use a Google App Password for SMTP_PASS and restart the emulator after updating firebase-hosting/.secret.local.",
        });
        return;
      }
      response.status(500).json({ error: "Failed to resend order email." });
    }
  },
);

export const resendCustomerOrderEmail = onRequest(
  { region: "us-central1", secrets: [SMTP_USER, SMTP_PASS] },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const orderId = String(request.body?.orderId || "").trim();
      logger.info("resend customer order email request received", {
        orderId,
        hasAuthorization: Boolean(request.header("authorization")),
      });
      const requestedByAdminEmail = await requireAdmin(request);
      if (!orderId) {
        response.status(400).json({ error: "Missing orderId" });
        return;
      }
      logger.info("resend customer order email authorized", { orderId, requestedByAdminEmail });

      const orderRef = getAdminDb().collection("orders").doc(orderId);
      const orderSnapshot = await orderRef.get();
      if (!orderSnapshot.exists) {
        logger.warn("resend customer order email order not found", { orderId, requestedByAdminEmail });
        response.status(404).json({ error: "Order not found" });
        return;
      }

      const order = getNotificationOrderInput(orderId, orderSnapshot.data() || {});
      const customerEmailStatus = await sendCustomerOrderEmail(order);
      logger.info("resend customer order email attempted", {
        orderId,
        requestedByAdminEmail,
        customerEmail: order.customerEmail,
        customerEmailStatus,
      });

      if (customerEmailStatus === "missing_customer_email") {
        response.status(400).json({ error: "Order does not have a customer email." });
        return;
      }

      await orderRef.set({
        customerOrderEmail: order.customerEmail,
        customerOrderEmailStatus: customerEmailStatus,
        customerOrderEmailUpdatedAt: nowIso(),
        customerOrderEmailManualResentAt: nowIso(),
      }, { merge: true });

      if (customerEmailStatus === "not_configured") {
        response.status(400).json({ error: "Gmail SMTP is not configured." });
        return;
      }

      response.status(200).json({ ok: true, customerEmailStatus });
    } catch (error) {
      logger.error("resend customer order email failed", error);
      const message = error instanceof Error ? error.message : "";
      if (message === "missing_auth_token") {
        response.status(401).json({ error: "Sign in required." });
        return;
      }
      if (message === "admin_denied") {
        response.status(403).json({ error: "Admin access required." });
        return;
      }
      if (isSmtpAuthError(message)) {
        response.status(400).json({
          error: "Gmail SMTP rejected SMTP_USER/SMTP_PASS. Use a Google App Password for SMTP_PASS and restart the emulator after updating firebase-hosting/.secret.local.",
        });
        return;
      }
      response.status(500).json({ error: "Failed to resend customer order email." });
    }
  },
);

export const deleteTestOrder = onRequest(
  { region: "us-central1" },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const orderId = String(request.body?.orderId || "").trim();
      logger.info("delete test order request received", {
        orderId,
        hasAuthorization: Boolean(request.header("authorization")),
      });
      const requestedByAdminEmail = await requireAdmin(request);
      if (!orderId) {
        response.status(400).json({ error: "Missing orderId" });
        return;
      }

      const orderRef = getAdminDb().collection("orders").doc(orderId);
      const orderSnapshot = await orderRef.get();
      if (!orderSnapshot.exists) {
        logger.warn("delete test order order not found", { orderId, requestedByAdminEmail });
        response.status(404).json({ error: "Order not found" });
        return;
      }

      const data = orderSnapshot.data() || {};
      if (!isTestOrderRecord(data)) {
        logger.warn("delete test order denied for live order", {
          orderId,
          requestedByAdminEmail,
          stripeMode: String(data.stripeMode || ""),
        });
        response.status(400).json({ error: "Only test orders can be deleted." });
        return;
      }

      await orderRef.delete();
      logger.info("delete test order completed", { orderId, requestedByAdminEmail });
      response.status(200).json({ ok: true });
    } catch (error) {
      logger.error("delete test order failed", error);
      const message = error instanceof Error ? error.message : "";
      if (message === "missing_auth_token") {
        response.status(401).json({ error: "Sign in required." });
        return;
      }
      if (message === "admin_denied") {
        response.status(403).json({ error: "Admin access required." });
        return;
      }
      response.status(500).json({ error: "Failed to delete test order." });
    }
  },
);

export const cancelOrder = onRequest(
  { region: "us-central1", secrets:[STRIPE_SECRET_KEY,STRIPE_TEST_SECRET_KEY] },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const orderId = String(request.body?.orderId || "").trim();
      logger.info("cancel order request received", {
        orderId,
        hasAuthorization: Boolean(request.header("authorization")),
      });
      const requestedByAdminEmail = await requireAdmin(request);
      if (!orderId) {
        response.status(400).json({ error: "Missing orderId" });
        return;
      }

      const orderRef = getAdminDb().collection("orders").doc(orderId);
      const orderSnapshot = await orderRef.get();
      if (!orderSnapshot.exists) {
        logger.warn("cancel order order not found", { orderId, requestedByAdminEmail });
        response.status(404).json({ error: "Order not found" });
        return;
      }

      const data = orderSnapshot.data() || {};
      if(data.orderType===CUSTOM_ORDER_TYPE&&data.checkoutSessionId){response.json({ok:true,...await retireExistingOrderCheckout(existingOrderCheckoutDependencies(),orderId,"cancel",requestedByAdminEmail)});return;}
      if (String(data.status || "") === "canceled") {
        response.status(200).json({ ok: true, status: "canceled" });
        return;
      }

      const updatedAt = nowIso();
      await orderRef.set({
        status: "canceled",
        canceledAt: updatedAt,
        canceledByAdminEmail: requestedByAdminEmail,
        updatedAt,
      }, { merge: true });

      logger.info("cancel order completed", { orderId, requestedByAdminEmail });
      response.status(200).json({ ok: true, status: "canceled", canceledAt: updatedAt });
    } catch (error) {
      if(error instanceof CheckoutStateError){response.status(error.status).json({error:error.code});return;}
      logger.error("cancel order failed", error);
      const message = error instanceof Error ? error.message : "";
      if (message === "missing_auth_token") {
        response.status(401).json({ error: "Sign in required." });
        return;
      }
      if (message === "admin_denied") {
        response.status(403).json({ error: "Admin access required." });
        return;
      }
      response.status(500).json({ error: "Failed to cancel order." });
    }
  },
);

export const closeOrder = onRequest(
  { region: "us-central1", secrets:[STRIPE_SECRET_KEY,STRIPE_TEST_SECRET_KEY] },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const orderId = String(request.body?.orderId || "").trim();
      logger.info("close order request received", {
        orderId,
        hasAuthorization: Boolean(request.header("authorization")),
      });
      const requestedByAdminEmail = await requireAdmin(request);
      if (!orderId) {
        response.status(400).json({ error: "Missing orderId" });
        return;
      }

      const orderRef = getAdminDb().collection("orders").doc(orderId);
      const orderSnapshot = await orderRef.get();
      if (!orderSnapshot.exists) {
        logger.warn("close order order not found", { orderId, requestedByAdminEmail });
        response.status(404).json({ error: "Order not found" });
        return;
      }

      const data = orderSnapshot.data() || {};
      if(data.orderType===CUSTOM_ORDER_TYPE&&data.checkoutSessionId){response.json({ok:true,...await retireExistingOrderCheckout(existingOrderCheckoutDependencies(),orderId,"close",requestedByAdminEmail)});return;}
      if (String(data.status || "") === "closed") {
        response.status(200).json({ ok: true, status: "closed" });
        return;
      }

      const updatedAt = nowIso();
      await orderRef.set({
        status: "closed",
        closedAt: updatedAt,
        closedByAdminEmail: requestedByAdminEmail,
        updatedAt,
      }, { merge: true });

      logger.info("close order completed", { orderId, requestedByAdminEmail });
      response.status(200).json({ ok: true, status: "closed", closedAt: updatedAt });
    } catch (error) {
      if(error instanceof CheckoutStateError){response.status(error.status).json({error:error.code});return;}
      logger.error("close order failed", error);
      const message = error instanceof Error ? error.message : "";
      if (message === "missing_auth_token") {
        response.status(401).json({ error: "Sign in required." });
        return;
      }
      if (message === "admin_denied") {
        response.status(403).json({ error: "Admin access required." });
        return;
      }
      response.status(500).json({ error: "Failed to close order." });
    }
  },
);

export const markOrderPaidByCash = onRequest(
  { region: "us-central1" },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }
    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const orderId = String(request.body?.orderId || "").trim();
      const requestedByAdminEmail = await requireAdmin(request);
      if (!orderId) {
        response.status(400).json({ error: "Missing orderId" });
        return;
      }

      const db = getAdminDb();
      const orderRef = db.collection("orders").doc(orderId);
      const moneyAccountsRef = db.collection("ledger").doc("moneyAccounts");
      const ledgerRef = db.collection("ledger").doc("entries");
      const result = await db.runTransaction(async (transaction) => {
        const [orderSnapshot, accountsSnapshot, ledgerSnapshot] = await Promise.all([
          transaction.get(orderRef),
          transaction.get(moneyAccountsRef),
          transaction.get(ledgerRef),
        ]);
        if (!orderSnapshot.exists) throw new Error("order_not_found");

        const order = orderSnapshot.data() || {};
        const status = String(order.status || "");
        if(order.checkoutTransition||(order.checkoutChannel==="embedded"&&order.checkoutSessionId&&status!=="paid"))throw new Error("order_not_payable");
        const existingPaymentMethod = String(order.paymentMethod || "");
        if (status === "paid" && existingPaymentMethod !== "cash") {
          throw new Error("order_already_paid");
        }
        if (["closed", "canceled"].includes(status)) {
          throw new Error("order_not_payable");
        }

        const amountTotalCents = Math.max(0, Math.round(Number(order.amountTotal) || 0));
        if (!amountTotalCents) throw new Error("invalid_order_amount");
        const now = new Date();
        const nowMillis = now.getTime();
        const paidAt = String(order.paidAt || now.toISOString());
        const ledgerEntryId = `cash_order_${orderId}`;

        const accounts = Array.isArray(accountsSnapshot.data()?.items)
          ? [...accountsSnapshot.data()!.items]
          : [];
        let cashAccount = accounts.find(
          (item: Record<string, unknown>) => String(item?.title || "").trim().toLowerCase() === "cash",
        );
        if (!cashAccount) {
          cashAccount = {
            id: "cash",
            title: "Cash",
            notes: "Cash payments received for orders.",
            rewardsBillingCategory: "",
            createdAt: nowMillis,
            updatedAt: nowMillis,
          };
          accounts.push(cashAccount);
        }

        const entries = Array.isArray(ledgerSnapshot.data()?.items)
          ? [...ledgerSnapshot.data()!.items]
          : [];
        const existingEntryIndex = entries.findIndex(
          (item: Record<string, unknown>) => String(item?.id || "") === ledgerEntryId,
        );
        const entry = {
          id: ledgerEntryId,
          orderId,
          amount: amountTotalCents / 100,
          salesTaxLiability: 0,
          processingFees: 0,
          title: `Cash payment for order ${orderId}`,
          moneyAccountTitle: String(cashAccount.title || "Cash").trim() || "Cash",
          billingCategory: "Sales Revenue",
          applicableDate: paidAt.slice(0, 10),
          notes: `Automatically created when order ${orderId} was marked paid by cash.`,
          status: "posted",
          createdAt: existingEntryIndex >= 0
            ? Number(entries[existingEntryIndex]?.createdAt) || nowMillis
            : nowMillis,
          updatedAt: nowMillis,
        };
        if (existingEntryIndex >= 0) entries[existingEntryIndex] = entry;
        else entries.push(entry);

        transaction.set(moneyAccountsRef, { items: accounts, updatedAt: now }, { merge: true });
        transaction.set(ledgerRef, { items: entries, updatedAt: now }, { merge: true });
        transaction.set(orderRef, {
          status: "paid",
          paidAt,
          paymentMethod: "cash",
          cashLedgerEntryId: ledgerEntryId,
          ledgerEntryId,
          paidByAdminEmail: requestedByAdminEmail,
          updatedAt: now.toISOString(),
        }, { merge: true });

        return { paidAt, ledgerEntryId, amount: amountTotalCents / 100 };
      });

      logger.info("order marked paid by cash", { orderId, requestedByAdminEmail, ...result });
      response.status(200).json({ ok: true, status: "paid", paymentMethod: "cash", ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      logger.error("mark order paid by cash failed", { error, message });
      if (message === "missing_auth_token") {
        response.status(401).json({ error: "Sign in required." });
      } else if (message === "admin_denied") {
        response.status(403).json({ error: "Admin access required." });
      } else if (message === "order_not_found") {
        response.status(404).json({ error: "Order not found." });
      } else if (message === "order_already_paid") {
        response.status(409).json({ error: "This order is already paid by another payment method." });
      } else if (message === "order_not_payable") {
        response.status(400).json({ error: "Canceled or completed orders cannot be marked paid by cash." });
      } else if (message === "invalid_order_amount") {
        response.status(400).json({ error: "The order must have a total greater than zero." });
      } else {
        response.status(500).json({ error: "Failed to mark order paid by cash." });
      }
    }
  },
);

export const linkOrderLedgerPayment = onRequest(
  { region: "us-central1" },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");
    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }
    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }
    try {
      const requestedByAdminEmail = await requireAdmin(request);
      const orderId = normalizeString(request.body?.orderId, 200);
      const ledgerEntryId = normalizeString(request.body?.ledgerEntryId, 200);
      if (!orderId || !ledgerEntryId) throw new Error("link_ids_required");
      const db = getAdminDb();
      const orderRef = db.collection("orders").doc(orderId);
      const ledgerRef = db.collection("ledger").doc("entries");
      await db.runTransaction(async (transaction) => {
        const [orderSnapshot, ledgerSnapshot] = await Promise.all([
          transaction.get(orderRef),
          transaction.get(ledgerRef),
        ]);
        if (!orderSnapshot.exists) throw new Error("order_not_found");
        const order = orderSnapshot.data() || {};
        if (String(order.status || "") === "canceled") throw new Error("order_not_linkable");
        const currentLedgerEntryId = String(order.ledgerEntryId || order.cashLedgerEntryId || "").trim();
        if (currentLedgerEntryId && currentLedgerEntryId !== ledgerEntryId) throw new Error("order_already_linked");
        const entries = Array.isArray(ledgerSnapshot.data()?.items) ? [...ledgerSnapshot.data()!.items] : [];
        const entryIndex = entries.findIndex((item: Record<string, unknown>) => String(item?.id || "") === ledgerEntryId);
        if (entryIndex < 0) throw new Error("ledger_entry_not_found");
        const entry = { ...(entries[entryIndex] as Record<string, unknown>) };
        const linkedOrderId = String(entry.orderId || "").trim();
        if (linkedOrderId && linkedOrderId !== orderId) throw new Error("ledger_entry_already_linked");
        const amount = Number(entry.amount) || 0;
        const orderAmount = (Math.max(0, Math.round(Number(order.amountTotal) || 0))) / 100;
        if (amount <= 0 || Math.abs(amount - orderAmount) >= 0.005) throw new Error("payment_amount_mismatch");
        const now = nowIso();
        entry.orderId = orderId;
        entry.updatedAt = Date.now();
        entries[entryIndex] = entry;
        const paidAt = String(order.paidAt || (entry.applicableDate ? `${entry.applicableDate}T12:00:00.000Z` : now));
        transaction.set(ledgerRef, { items: entries, updatedAt: new Date() }, { merge: true });
        transaction.set(orderRef, {
          ledgerEntryId,
          status: String(order.status || "") === "closed" ? "closed" : "paid",
          paidAt,
          paymentMethod: String(order.paymentMethod || "ledger"),
          updatedAt: now,
          paymentLinkedByAdminEmail: requestedByAdminEmail,
        }, { merge: true });
      });
      response.status(200).json({ ok: true, orderId, ledgerEntryId });
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      const errors: Record<string, [number, string]> = {
        missing_auth_token: [401, "Sign in required."],
        admin_denied: [403, "Admin access required."],
        link_ids_required: [400, "Order ID and ledger entry ID are required."],
        order_not_found: [404, "Order not found."],
        ledger_entry_not_found: [404, "Ledger payment not found."],
        order_not_linkable: [409, "Canceled orders cannot be linked to payments."],
        order_already_linked: [409, "This order is already linked to another ledger payment."],
        ledger_entry_already_linked: [409, "This ledger payment is already linked to another order."],
        payment_amount_mismatch: [409, "The ledger payment must be a positive credit matching the order total."],
      };
      const [status, errorMessage] = errors[message] || [500, "Failed to link order and ledger payment."];
      response.status(status).json({ error: errorMessage });
    }
  },
);

export const importOrderCustomer = onRequest(
  { region: "us-central1" },
  async (request, response) => {
    setCorsHeaders(response, request.header("origin") || "");
    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }
    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
      return;
    }
    try {
      const requestedByAdminEmail = await requireAdmin(request);
      const orderId = normalizeString(request.body?.orderId, 200);
      if (!orderId) throw new Error("order_id_required");
      const db = getAdminDb();
      const orderSnapshot = await db.collection("orders").doc(orderId).get();
      if (!orderSnapshot.exists) throw new Error("order_not_found");
      const order = orderSnapshot.data() || {};
      const email = normalizeEmail(normalizeString(order.customerEmail, 254));
      if (!email) throw new Error("customer_email_required");

      const existing = await db.collection("customers")
        .where("emailNormalized", "==", email)
        .limit(1)
        .get();
      const customerRef = existing.empty
        ? db.collection("customers").doc(`customer_${createHash("sha256").update(email).digest("hex").slice(0, 24)}`)
        : existing.docs[0].ref;
      const current = existing.empty ? {} : existing.docs[0].data();
      const now = nowIso();
      await customerRef.set({
        id: customerRef.id,
        name: String(current.name || order.customerName || "").trim(),
        email: String(current.email || order.customerEmail || email).trim(),
        emailNormalized: email,
        phone: String(current.phone || order.customerPhone || "").trim(),
        notes: String(current.notes || "").trim(),
        sourceOrderId: String(current.sourceOrderId || orderId).trim(),
        createdAt: String(current.createdAt || now),
        updatedAt: now,
        updatedByAdminEmail: requestedByAdminEmail,
      }, { merge: true });
      response.status(200).json({ ok: true, customerId: customerRef.id, created: existing.empty, email });
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      logger.error("import order customer failed", error);
      if (message === "missing_auth_token") response.status(401).json({ error: "Sign in required." });
      else if (message === "admin_denied") response.status(403).json({ error: "Admin access required." });
      else if (message === "order_not_found") response.status(404).json({ error: "Order not found." });
      else if (message === "customer_email_required") response.status(400).json({ error: "The order has no customer email to import." });
      else response.status(500).json({ error: "Failed to import the order customer." });
    }
  },
);

async function handleCheckoutSessionCompleted(
  stripe: Stripe,
  event: Stripe.Event,
): Promise<void> {
  const eventSession = event.data.object as Stripe.Checkout.Session;
  await savePaidCheckoutSession(stripe, eventSession.id, event.id);
}

async function savePaidCheckoutSession(
  stripe: Stripe,
  checkoutSessionId: string,
  latestStripeEventId: string,
): Promise<void> {
  const session = await stripe.checkout.sessions.retrieve(checkoutSessionId, {
    expand: ["line_items", "payment_intent"],
  });
  if (session.payment_status !== "paid") return;
  const orderId = String(session.metadata?.orderId || session.client_reference_id || session.id);
  const paymentIntent = session.payment_intent;
  const paymentIntentId = typeof paymentIntent === "string"
    ? paymentIntent
    : String(paymentIntent?.id || "");
  const stripeCustomerId = typeof session.customer === "string"
    ? session.customer
    : String(session.customer?.id || "");
  const customerDetails = session.customer_details;
  const totalDetails = session.total_details;
  const updatedAt = nowIso();
  const stripeMode = session.livemode ? "live" : "sandbox";
  const stripeDashboardUrl = paymentIntentId
    ? getStripePaymentIntentUrl(paymentIntentId, stripeMode)
    : getStripePaymentSearchUrl(session.id, stripeMode);
  const adminOrderUrl = getAdminOrderUrl(String(session.success_url || ""), orderId);
  const publicOrderUrl = getPublicOrderUrl(
    String(session.success_url || ""),
    orderId,
    String(customerDetails?.email || session.customer_email || ""),
  );
  const orderRef = getAdminDb().collection("orders").doc(orderId);
  const existingOrder = await orderRef.get();
  const existingOrderData = existingOrder.data() || {};
  assertCurrentPaidSession(existingOrderData, session);
  if(existingOrderData.checkoutChannel==="embedded"&&(session.amount_total!==existingOrderData.amountTotal||session.currency!==existingOrderData.currency||session.livemode!==(existingOrderData.stripeMode==="live")))throw new Error("order_checkout_payment_mismatch");
  if (existingOrderData.customerDetailsPending && (!verifiedCustomerName(session) || !String(session.customer_details?.email || session.customer_email || "").trim())) throw new Error("checkout_customer_details_required");
  const previousNotificationStatus = String(existingOrderData.notificationEmailStatus || "");
  const previousCustomerEmailStatus = String(existingOrderData.customerOrderEmailStatus || "");
  const paidOrder: OrderNotificationInput = {
    orderId,
    status: "paid",
    lineItems: existingOrderData.orderType===CUSTOM_ORDER_TYPE ? existingOrderData.lineItems : session.line_items?.data.map((item) => {
      const priceMetadata = typeof item.price === "string" ? {} : item.price?.metadata || {};
      return {
        productId: String(priceMetadata.productId || ""),
        variationId: String(priceMetadata.variationId || ""),
        quantity: item.quantity || 0,
        title: item.description || "Product",
        unitAmount: item.amount_subtotal && item.quantity ? Math.round(item.amount_subtotal / item.quantity) : 0,
        currency: String(session.currency || "usd").toLowerCase(),
      };
    }) || [],
    currency: String(session.currency || "").toLowerCase(),
    amountSubtotal: Number(session.amount_subtotal) || 0,
    amountTax: Number(totalDetails?.amount_tax) || 0,
    amountShipping: Number(totalDetails?.amount_shipping) || 0,
    amountTotal: Number(session.amount_total) || 0,
    customerEmail: String(customerDetails?.email || session.customer_email || ""),
    customerName: verifiedCustomerName(session),
    stripeMode,
    adminOrderUrl,
    publicOrderUrl,
    stripeDashboardUrl,
  };

  const saveOrder = {
    id: orderId,
    status: "paid",
    currency: paidOrder.currency,
    amountSubtotal: paidOrder.amountSubtotal,
    amountTax: paidOrder.amountTax,
    amountShipping: paidOrder.amountShipping,
    amountTotal: paidOrder.amountTotal,
    customerEmail: paidOrder.customerEmail,
    customerName: paidOrder.customerName,
    customerDetailsPending: !paidOrder.customerName || !paidOrder.customerEmail,
    checkoutSessionId: session.id,
    paymentIntentId,
    stripeCustomerId,
    latestStripeEventId,
    stripeMode,
    notificationEmail: ORDER_NOTIFICATION_EMAIL,
    notificationEmailStatus: previousNotificationStatus === "sent" ? "sent" : "pending",
    publicOrderUrl,
    updatedAt,
    paidAt: updatedAt,
    stripeDashboardUrl,
    adminOrderUrl,
    stripeLineItems: session.line_items?.data.map((item) => ({
      id: item.id,
      description: item.description || "",
      quantity: item.quantity || 0,
      amountSubtotal: item.amount_subtotal || 0,
      amountTotal: item.amount_total || 0,
      priceId: typeof item.price === "string" ? item.price : item.price?.id || "",
    })) || [],
  }

  console.log('💾 saving paid order...', {
    saveOrder, // paidOrder,
    paymentIntent,
  })

  await getAdminDb().runTransaction(async(tx:any)=>{
    const current=(await tx.get(orderRef)).data()||{};assertCurrentPaidSession(current,session);
    if(current.checkoutChannel==="embedded"&&(current.amountTotal!==session.amount_total||current.currency!==session.currency))throw Error("order_checkout_payment_mismatch");
    if(["canceled","closed"].includes(current.status)&&!current.paidAt)throw Error("order_not_payable");
    tx.set(orderRef,{...saveOrder,...(current.orderType===CUSTOM_ORDER_TYPE?{lineItems:current.lineItems}:{}),status:current.status==="closed"?"closed":"paid",paidAt:current.paidAt||updatedAt},{merge:true});
  });

  await markLinkedAgreementPaid(
    orderId,
    {
      ...existingOrderData,
      agreementId: String(existingOrderData.agreementId || session.metadata?.agreementId || "").trim(),
      orderType: String(existingOrderData.orderType || session.metadata?.orderType || "").trim(),
    },
    paidOrder,
    updatedAt,
    session.id,
  );

  if (previousNotificationStatus !== "sent") {
    try {
      const notificationStatus = await sendOrderNotificationEmail(paidOrder);
      await orderRef.set({
        notificationEmailStatus: notificationStatus,
        notificationEmailUpdatedAt: nowIso(),
      }, { merge: true });
    } catch (error) {
      logger.error("order notification email failed", { orderId, error });
      await orderRef.set({
        notificationEmailStatus: error instanceof Error ? `failed: ${error.message.slice(0, 160)}` : "failed",
        notificationEmailUpdatedAt: nowIso(),
      }, { merge: true });
    }
  }

  if (previousCustomerEmailStatus !== "sent") {
    try {
      const customerEmailStatus = await sendCustomerOrderEmail(paidOrder);
      await orderRef.set({
        customerOrderEmail: paidOrder.customerEmail,
        customerOrderEmailStatus: customerEmailStatus,
        customerOrderEmailUpdatedAt: nowIso(),
      }, { merge: true });
    } catch (error) {
      logger.error("customer order email failed", { orderId, customerEmail: paidOrder.customerEmail, error });
      await orderRef.set({
        customerOrderEmail: paidOrder.customerEmail,
        customerOrderEmailStatus: error instanceof Error ? `failed: ${error.message.slice(0, 160)}` : "failed",
        customerOrderEmailUpdatedAt: nowIso(),
      }, { merge: true });
    }
  }
}

async function handlePaymentIntentSucceeded(
  stripe: Stripe,
  event: Stripe.Event,
): Promise<void> {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const orderId = String(paymentIntent.metadata?.orderId || "");
  const stripeMode = paymentIntent.livemode ? "live" : "sandbox";

  try {
    const sessions = await stripe.checkout.sessions.list({
      payment_intent: paymentIntent.id,
      limit: 1,
    });
    const checkoutSessionId = sessions.data[0]?.id || "";
    if (checkoutSessionId) {
      await savePaidCheckoutSession(stripe, checkoutSessionId, event.id);
      return;
    }
  } catch (error) {
    logger.warn("payment_intent.succeeded checkout session lookup failed", {
      paymentIntentId: paymentIntent.id,
      orderId,
      error,
    });
  }

  if (!orderId) return;
  const pending = await getAdminDb().collection("orders").doc(orderId).get();
  if(pending.data()?.orderType===CUSTOM_ORDER_TYPE)throw new Error("checkout_session_verification_required");
  if (pending.data()?.customerDetailsPending) throw new Error("checkout_customer_details_required");
  await getAdminDb().collection("orders").doc(orderId).set({
    id: orderId,
    status: "paid",
    currency: String(paymentIntent.currency || "").toLowerCase(),
    amountTotal: Math.max(0, Math.round(Number(paymentIntent.amount_received || paymentIntent.amount || 0))),
    paymentIntentId: paymentIntent.id,
    stripeCustomerId: typeof paymentIntent.customer === "string"
      ? paymentIntent.customer
      : String(paymentIntent.customer?.id || ""),
    latestStripeEventId: event.id,
    updatedAt: nowIso(),
    paidAt: nowIso(),
    stripeMode,
    stripeDashboardUrl: getStripePaymentIntentUrl(paymentIntent.id, stripeMode),
  }, { merge: true });
}

async function handlePaymentIntentFailed(event: Stripe.Event): Promise<void> {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const orderId = String(paymentIntent.metadata?.orderId || "");
  if (!orderId) return;
  const stripeMode = paymentIntent.livemode ? "live" : "sandbox";
  const orderRef=getAdminDb().collection("orders").doc(orderId);
  const initial=(await orderRef.get()).data();
  if(initial?.orderType===CUSTOM_ORDER_TYPE){
    const matches=await getStripeClientForMode(stripeMode).checkout.sessions.list({payment_intent:paymentIntent.id,limit:1});
    const session=matches.data[0];
    if(!session||session.id!==initial.checkoutSessionId||session.metadata?.orderId!==orderId||session.livemode!==(initial.stripeMode==="live"))return;
    await getAdminDb().runTransaction(async(tx:any)=>{const current=(await tx.get(orderRef)).data();
      if(current?.checkoutSessionId!==session.id||current.checkoutTransition||current.status!=="checkout_created"||current.paidAt)return;
      // A failed attempt does not close an open Checkout Session; the customer can retry in the same form.
      tx.set(orderRef,{lastPaymentFailureAt:nowIso(),latestStripeEventId:event.id,paymentIntentId:paymentIntent.id,updatedAt:nowIso()},{merge:true});
    });return;
  }

  await getAdminDb().collection("orders").doc(orderId).set({
    id: orderId,
    status: "payment_failed",
    paymentIntentId: paymentIntent.id,
    stripeCustomerId: typeof paymentIntent.customer === "string"
      ? paymentIntent.customer
      : String(paymentIntent.customer?.id || ""),
    latestStripeEventId: event.id,
    updatedAt: nowIso(),
    stripeMode,
    stripeDashboardUrl: getStripePaymentIntentUrl(paymentIntent.id, stripeMode),
  }, { merge: true });
}

// Order images are admin-only: no download tokens, public URLs, or Stripe product images.
export const manageOrderImage = onRequest({region:"us-central1"}, async (request, response) => {
  setCorsHeaders(response, request.header("origin") || "");
  response.set("Cache-Control", "private, no-store");
  if (request.method === "OPTIONS") { response.status(204).send(""); return; }
  if (!["GET","POST"].includes(request.method)) { response.status(405).send("Method not allowed"); return; }
  try {
    const actor = await requireAdmin(request);
    const orderId = String(request.method === "GET" ? request.query.orderId || "" : request.body?.orderId || "");
    if (!/^[a-zA-Z0-9_-]{1,200}$/.test(orderId)) throw new Error("invalid_order_id");
    const orderRef = getAdminDb().collection("orders").doc(orderId);
    const order = await orderRef.get();
    if (!order.exists) { response.status(404).json({error:"Order not found."}); return; }
    if (request.method === "GET") {
      const image = order.data()?.orderImage;
      if (!image || !new RegExp(`^order-images/${orderId}/[a-f0-9]{64}$`).test(String(image.path || ""))) {
        response.status(404).json({error:"No order image."}); return;
      }
      const [bytes] = await getAdminBucket().file(image.path).download();
      response.status(200).json({mime:image.mime, base64:bytes.toString("base64")}); return;
    }
    const image = decodeOrderImage(request.body?.base64, request.body?.mime);
    const path = `order-images/${orderId}/${image.hash}`;
    await getAdminBucket().file(path).save(image.bytes, {resumable:false, metadata:{contentType:image.mime,cacheControl:"private, no-store"}});
    const uploadedAt = nowIso();
    await orderRef.set({orderImage:{path,mime:image.mime,uploadedAt,uploadedByAdminEmail:actor},updatedAt:uploadedAt},{merge:true});
    logger.info("Admin order image attached", {orderId, actor, hash:image.hash});
    response.status(200).json({ok:true});
  } catch (error) {
    const code = error instanceof Error ? error.message : "";
    response.status(code === "missing_auth_token" ? 401 : code === "admin_denied" ? 403 : 400)
      .json({error:code === "invalid_order_image" ? "Choose a PNG, JPEG, or WebP image up to 2MB." : "Order image request failed."});
  }
});

async function requireOrderIntegration(request: {header:(name:string)=>string|undefined}, scope: "catalog:read"|"orders:create"|"orders:read-own") {
  const parsed = parseIntegrationToken(request.header("authorization") || "");
  const raw = (await getAdminDb().collection("order_integrations").doc(parsed.id).get()).data();
  verifyIntegrationGrant(raw, parsed.tokenHash, scope);
  if (!(await isAdminEmail(raw.ownerEmail))) throw new IntegrationError(403,"integration_owner_denied");
  return {...raw,id:parsed.id};
}
function integrationOrderView(id:string, data:Record<string,any>) {
  const mode = data.stripeMode === "live" ? "live" : "sandbox";
  const url = new URL(getAdminOrderUrl(PUBLIC_SITE_ORIGIN,id));
  url.searchParams.set("orderMode",mode === "live" ? "live" : "test");
  return {orderId:id,adminOrderUrl:url.toString(),checkoutUrl:String(data.checkoutUrl || ""),stripeMode:mode,livemode:mode === "live",
    status:String(data.status || "unknown"),paymentStatus:data.paidAt || data.status === "paid" ? "paid" : data.status === "checkout_created" ? "unpaid" : "unknown",
    amountTotal:Number(data.amountTotal || 0),currency:String(data.currency || "usd"),
    lineItems:(Array.isArray(data.lineItems)?data.lineItems:[]).map((x:any)=>({productId:x.productId,variationId:x.variationId,badgeName:x.badgeName||"",title:x.title,quantity:x.quantity,unitAmount:x.unitAmount}))};
}
function sendIntegrationFailure(response:any, error:unknown) {
  if (error instanceof IntegrationError) {response.status(error.status).json({error:error.code});return;}
  const message = error instanceof Error ? error.message : "";
  if (message === "Enter a badge name of 1–15 characters on one line." || /^(Product|Product option|Product price) is unavailable:/.test(message)) {
    response.status(400).json({error:"integration_order_invalid"});return;
  }
  const conflict = ["order_request_conflict","order_request_key_required","invalid_customer_email","custom_order_items_required","custom_order_currency_mismatch"].includes(message);
  const unavailable = ["stripe_test_mode_unavailable","stripe_live_mode_unavailable"].includes(message);
  logger.warn("order integration request failed", {kind:conflict?"validation":unavailable?"mode_unavailable":"internal"});
  response.status(message === "order_request_conflict" ? 409 : conflict ? 400 : unavailable ? 409 : 500)
    .json({error:conflict || unavailable ? message : "integration_request_failed"});
}
export const orderIntegrationApi = onRequest(
  {region:"us-central1",secrets:[STRIPE_SECRET_KEY,STRIPE_TEST_SECRET_KEY]},
  async(request,response)=>{
    response.set("Cache-Control","private, no-store");
    const resource = String(request.query.resource || request.path.split("/").filter(Boolean).at(-1) || "");
    try {
      if (request.method === "GET" && resource === "catalog") {
        const grant=await requireOrderIntegration(request,"catalog:read");
        const products=Array.from((await loadProductCatalog()).values()).filter(p=>p.active&&grant.allowedProductIds.includes(p.id));
        response.json({products:products.map(p=>({id:p.id,title:p.title,slug:p.slug,unitAmount:p.unitAmount,currency:p.currency,variations:p.variations||[],requiresBadgeName:p.slug === "custom-name-badges"})),
          limits:{allowedModes:grant.allowedModes,currency:grant.currency,maxOrderAmount:grant.maxOrderAmount,maxQuantity:grant.maxQuantity,expiresAt:grant.expiresAt}});return;
      }
      if (request.method === "POST" && resource === "orders") {
        const grant=await requireOrderIntegration(request,"orders:create");
        const result=await createUnpaidCustomOrder(request,grant.ownerEmail,grant);
        const data=(await getAdminDb().collection("orders").doc(result.orderId).get()).data() || {};
        response.json({ok:true,...integrationOrderView(result.orderId,data),reused:Boolean(result.reused)});return;
      }
      if (request.method === "GET" && resource === "orders") {
        const grant=await requireOrderIntegration(request,"orders:read-own");
        const id=String(request.query.orderId || "");
        if (!/^custom_[a-f0-9]{32}$/.test(id)) throw new IntegrationError(404,"integration_order_not_found");
        const snapshot=await getAdminDb().collection("orders").doc(id).get();const data=snapshot.data();
        if (!snapshot.exists || !data || data.createdByIntegrationId !== grant.id || data.createdByAdminEmail !== grant.ownerEmail)
          throw new IntegrationError(404,"integration_order_not_found");
        response.json({ok:true,...integrationOrderView(id,data)});return;
      }
      response.status(405).json({error:"integration_operation_not_allowed"});
    } catch(error){sendIntegrationFailure(response,error);}
  }
);
export const manageOrderIntegrations = onRequest({region:"us-central1"},async(request,response)=>{
  setCorsHeaders(response,request.header("origin") || "");response.set("Cache-Control","private, no-store");
  if(request.method === "OPTIONS"){response.status(204).send("");return;}
  try {
    let ownerEmail:string;
    try{ownerEmail=await requireAdmin(request);}catch(error){response.status(error instanceof Error && error.message === "admin_denied"?403:401).json({error:"Admin sign-in required."});return;}
    const collection=getAdminDb().collection("order_integrations");
    if(request.method === "GET"){
      const rows=await collection.where("ownerEmail","==",ownerEmail).limit(50).get();
      response.json({integrations:rows.docs.map(doc=>integrationSummary(doc.id,doc.data() as IntegrationGrant))});return;
    }
    if(request.method !== "POST"){response.status(405).json({error:"Method not allowed"});return;}
    if(request.body?.action === "issue"){
      const id=customOrderRequestId(ownerEmail,request.header("x-idempotency-key")).slice(7);
      const built=buildIntegrationGrant(request.body,ownerEmail,id);
      const catalog=await loadProductCatalog();
      if(built.grant.allowedProductIds.some(id=>!catalog.get(id)?.active))throw new IntegrationError(400,"integration_product_unavailable");
      const ref=collection.doc(id);
      await getAdminDb().runTransaction(async tx=>{if((await tx.get(ref)).exists)throw new IntegrationError(409,"integration_issue_already_used");tx.create(ref,built.grant);});
      response.json({token:built.token,integration:integrationSummary(id,built.grant),notice:"Shown once. Store only in your approved local credential store."});return;
    }
    if(request.body?.action === "revoke"){
      const id=String(request.body.id || "");if(!/^[a-f0-9]{32}$/.test(id))throw new IntegrationError(404,"integration_not_found");
      const ref=collection.doc(id);
      await getAdminDb().runTransaction(async tx=>{const data=(await tx.get(ref)).data();if(!data || data.ownerEmail !== ownerEmail)throw new IntegrationError(404,"integration_not_found");tx.set(ref,{revokedAt:nowIso()},{merge:true});});
      response.json({ok:true,id});return;
    }
    response.status(405).json({error:"integration_operation_not_allowed"});
  }catch(error){
    const message=error instanceof Error?error.message:"";
    if(message === "missing_auth_token" || message === "admin_denied"){response.status(message === "missing_auth_token"?401:403).json({error:"Admin sign-in required."});return;}
    sendIntegrationFailure(response,error);
  }
});

// Read-only buyer capability: never creates/replaces a session or reads private order images.
export const getOrderCheckout = onRequest({region:"us-central1",secrets:[STRIPE_SECRET_KEY,STRIPE_TEST_SECRET_KEY]},async(request,response)=>{
  setCorsHeaders(response,request.header("origin")||"");response.set("Cache-Control","private, no-store");response.set("Referrer-Policy","no-referrer");
  if(request.method === "OPTIONS"){response.status(204).send("");return;}
  if(request.method !== "POST"){response.status(405).json({error:"Method not allowed"});return;}
  try{
    const orderId=String(request.body?.orderId||"");const sessionId=String(request.body?.sessionId||"");
    if(!/^custom_[a-f0-9]{32}$/.test(orderId)||!/^cs_(live|test)_[A-Za-z0-9]{16,200}$/.test(sessionId)){response.status(404).json({error:"Order checkout not found."});return;}
    const snapshot=await getAdminDb().collection("orders").doc(orderId).get();const order=snapshot.data();
    if(!snapshot.exists||!ownsCheckout(order,orderId,sessionId)){response.status(404).json({error:"Order checkout not found."});return;}
    const mode=order!.stripeMode === "live"?"live":"sandbox";
    const stripe=getStripeClientForMode(mode);const session=await stripe.checkout.sessions.retrieve(order!.checkoutSessionId);
    const catalog=(await getAdminDb().collection("products").doc("list").get()).data();
    const products=new Map((Array.isArray(catalog?.items)?catalog.items:[]).map((product:any)=>[String(product.id),product]));
    response.json({order:publicOrderCheckout(orderId,order,session,products)});
  }catch{response.status(409).json({error:"This checkout cannot be verified. Request a current checkout link."});}
});
