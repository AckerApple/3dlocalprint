import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions";
import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import tls from "node:tls";
import Stripe from "stripe";

const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");
const SMTP_USER = defineSecret("SMTP_USER");
const SMTP_PASS = defineSecret("SMTP_PASS");
const ORDER_NOTIFICATION_EMAIL = "service@3dlocalprint.com";
const PUBLIC_SITE_ORIGIN = "https://3dlocalprint.com";
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);

type CheckoutCartItem = {
  quantity: number;
  productId: string;
  variationId?: string;
};

type CreateCheckoutSessionBody = {
  cartItems: CheckoutCartItem[];
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
};

type ProductVariation = {
  id: string;
  label: string;
  unitAmount: number;
  active: boolean;
};

type ProductItem = {
  id: string;
  title: string;
  active: boolean;
  unitAmount: number;
  currency: string;
  variations?: ProductVariation[];
};

type CheckoutLineItem = {
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

function getStripeClient(): Stripe {
  return new Stripe(STRIPE_SECRET_KEY.value(), {
    // Keep aligned with Stripe account API versioning strategy.
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

function createOrderId(stripeMode: "sandbox" | "live"): string {
  const modeLabel = stripeMode === "sandbox" ? "test_" : "";
  return `order_${modeLabel}${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function createQuoteRequestId(): string {
  return `quote_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function nowIso(): string {
  return new Date().toISOString();
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

function isTestOrderRecord(orderId = "", data: Record<string, unknown> = {}): boolean {
  return String(data.stripeMode || "") === "sandbox" || /\btest\b|_test_/i.test(orderId);
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
    email: buildOrderNotificationEmail(order),
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
    email: buildCustomerOrderEmail(order),
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

  const email = buildModelLinkQuoteRequestEmail(request);
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

function buildCustomerModelLinkQuoteEmail(request: ModelLinkQuoteRequestInput): { subject: string; text: string; html: string } {
  const subject = sanitizeEmailHeader(`Your 3D Local Print quote request ${request.requestId}`);
  const greeting = request.customerName ? `Hi ${request.customerName},` : "Hi,";
  const linkLines = request.modelItems.map((item) => `- ${item.quantity}x ${item.url}`).join("\n");
  const text = [
    greeting,
    "",
    "I received your model link quote request. I will review the model, printability, material, and timing, then reply with a quote before anything is printed.",
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
            <p style="margin:0 0 22px;color:#4d3a31;line-height:1.55;">I received your model link quote request. I will review printability, material, and timing, then reply with a quote before anything is printed.</p>
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

  const email = buildCustomerModelLinkQuoteEmail(request);
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

function normalizeCheckoutCartItems(items: CheckoutCartItem[]): CheckoutCartItem[] {
  return items.map((item) => ({
    productId: String(item.productId || "").trim(),
    variationId: String(item.variationId || "").trim(),
    quantity: Math.max(1, Math.min(99, Math.round(Number(item.quantity) || 1))),
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
        active: Boolean(raw.active),
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

    const unitAmount = variation?.unitAmount ?? product.unitAmount;
    if (!Number.isInteger(unitAmount) || unitAmount <= 0) {
      throw new Error(`Product price is unavailable: ${product.title}`);
    }

    return {
      productId: product.id,
      variationId: variation?.id || "",
      quantity: cartItem.quantity,
      title: variation ? `${product.title} (${variation.label})` : product.title,
      unitAmount,
      currency: product.currency,
    };
  });
}

function setCorsHeaders(response: { set: (field: string, value: string) => void }): void {
  response.set("Access-Control-Allow-Origin", "*");
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

export const submitModelLinkQuoteRequest = onRequest(
  { region: "us-central1", secrets: [SMTP_USER, SMTP_PASS] },
  async (request, response) => {
    setCorsHeaders(response);

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
  { region: "us-central1" },
  async (request, response) => {
    setCorsHeaders(response);

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

export const createCheckoutSession = onRequest(
  { region: "us-central1", secrets: [STRIPE_SECRET_KEY] },
  async (request, response) => {
    setCorsHeaders(response);

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed" });
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
      const orderId = createOrderId(stripeMode);
      const cartItems = normalizeCheckoutCartItems(request.body.cartItems);
      const lineItems = resolveCheckoutLineItems(cartItems, await loadProductCatalog());
      const createdAt = nowIso();
      const adminOrderUrl = getAdminOrderUrl(request.body.successUrl, orderId);
      const publicOrderUrl = getPublicOrderUrl(request.body.successUrl, orderId, String(request.body.customerEmail || "").trim());
      const session = await stripe.checkout.sessions.create(
        {
          mode: "payment",
          success_url: appendUrlParams(request.body.successUrl, {
            order_id: orderId,
            session_id: "{CHECKOUT_SESSION_ID}",
          }),
          cancel_url: appendUrlParams(request.body.cancelUrl, { order_id: orderId }),
          client_reference_id: orderId,
          customer_email: request.body.customerEmail,
          line_items: lineItems.map((item) => ({
            price_data: {
              currency: item.currency,
              unit_amount: item.unitAmount,
              product_data: {
                name: item.title,
                metadata: {
                  productId: item.productId,
                  variationId: item.variationId,
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
          },
          payment_intent_data: {
            metadata: {
              orderId,
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
        customerEmail: String(request.body.customerEmail || "").trim(),
        customerName: "",
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
      });

      response.status(200).json({
        orderId,
        sessionId: session.id,
        stripeMode,
        url: session.url,
      });
    } catch (error) {
      logger.error("createCheckoutSession failed", error);
      const errorResponse = getCheckoutErrorResponse(error);
      response.status(errorResponse.status).json({ error: errorResponse.message });
    }
  },
);

export const getPublicOrder = onRequest(
  { region: "us-central1" },
  async (request, response) => {
    setCorsHeaders(response);

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
    setCorsHeaders(response);

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
      if (storedSessionId && storedSessionId !== sessionId) {
        response.status(404).json({ error: "Order not found." });
        return;
      }

      let customerEmail = String(data.customerEmail || "").trim();
      let publicOrderUrl = getCanonicalPublicOrderUrl(
        orderId,
        customerEmail,
        String(data.publicOrderUrl || ""),
      );
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
        const stripe = getStripeClient();
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items", "payment_intent"],
        });
        const sessionOrderId = String(session.metadata?.orderId || session.client_reference_id || "").trim();
        if (sessionOrderId && sessionOrderId !== orderId) {
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
        customerEmail = String(customerDetails?.email || session.customer_email || "").trim();
        logger.info("public order receipt link Stripe session retrieved", {
          orderId,
          sessionId,
          paymentStatus: session.payment_status,
          customerEmail,
          customerName: String(customerDetails?.name || ""),
          paymentIntentId,
          stripeCustomerId,
          stripeMode,
        });
        publicOrderUrl = getCanonicalPublicOrderUrl(
          orderId,
          customerEmail,
          getPublicOrderUrl(String(session.success_url || ""), orderId, customerEmail),
        );

        await orderSnapshot.ref.set({
          id: orderId,
          status: isPaid ? "paid" : String(data.status || "checkout_created"),
          lineItems: session.line_items?.data.map((item) => {
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
          currency: String(session.currency || data.currency || "").toLowerCase(),
          amountSubtotal: Number(session.amount_subtotal) || Number(data.amountSubtotal) || 0,
          amountTax: Number(totalDetails?.amount_tax) || Number(data.amountTax) || 0,
          amountShipping: Number(totalDetails?.amount_shipping) || Number(data.amountShipping) || 0,
          amountTotal: Number(session.amount_total) || Number(data.amountTotal) || 0,
          customerEmail,
          customerName: String(customerDetails?.name || data.customerName || ""),
          checkoutSessionId: session.id,
          paymentIntentId,
          stripeCustomerId,
          stripeMode,
          publicOrderUrl,
          paidAt: isPaid ? String(data.paidAt || nowIso()) : String(data.paidAt || ""),
          updatedAt: nowIso(),
          stripeDashboardUrl: paymentIntentId
            ? getStripePaymentIntentUrl(paymentIntentId, stripeMode)
            : getStripePaymentSearchUrl(session.id, stripeMode),
          adminOrderUrl: String(data.adminOrderUrl || getAdminOrderUrl(String(session.success_url || ""), orderId)),
        }, { merge: true });
        logger.info("public order receipt link backfill saved", {
          orderId,
          sessionId,
          customerEmail,
          paymentIntentId,
          status: isPaid ? "paid" : String(data.status || "checkout_created"),
        });
      }

      if (!customerEmail) {
        response.status(404).json({ error: "Customer email is not available yet." });
        return;
      }

      response.status(200).json({
        customerEmail,
        publicOrderUrl,
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
    setCorsHeaders(response);

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
    setCorsHeaders(response);

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
    setCorsHeaders(response);

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
      if (!isTestOrderRecord(orderId, data)) {
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
  const previousNotificationStatus = String(existingOrderData.notificationEmailStatus || "");
  const previousCustomerEmailStatus = String(existingOrderData.customerOrderEmailStatus || "");
  const paidOrder: OrderNotificationInput = {
    orderId,
    status: "paid",
    lineItems: session.line_items?.data.map((item) => {
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
    customerName: String(customerDetails?.name || ""),
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

  await orderRef.set(saveOrder, { merge: true });

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
