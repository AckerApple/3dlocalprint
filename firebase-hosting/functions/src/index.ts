import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions";
import { getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import Stripe from "stripe";

const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");
const ORDER_NOTIFICATION_EMAIL = "service@3dlocalprint.com";
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);

type CheckoutCartItem = {
  priceId: string;
  quantity: number;
  productId?: string;
  variationId?: string;
  title?: string;
};

type CreateCheckoutSessionBody = {
  cartItems: CheckoutCartItem[];
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
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

function createOrderId(): string {
  return `order_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
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

function normalizeCheckoutCartItems(items: CheckoutCartItem[]) {
  return items.map((item) => ({
    priceId: String(item.priceId || "").trim(),
    quantity: Math.max(1, Math.round(Number(item.quantity) || 1)),
    productId: String(item.productId || "").trim(),
    variationId: String(item.variationId || "").trim(),
    title: String(item.title || "Product").trim() || "Product",
  }));
}

function setCorsHeaders(response: { set: (field: string, value: string) => void }): void {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type, X-Idempotency-Key");
  response.set("Access-Control-Allow-Methods", "POST, OPTIONS");
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
      typeof item.priceId === "string" &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
    );
  });
}

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
      const orderId = createOrderId();
      const lineItems = normalizeCheckoutCartItems(request.body.cartItems);
      const createdAt = nowIso();
      const session = await stripe.checkout.sessions.create(
        {
          mode: "payment",
          success_url: appendUrlParams(request.body.successUrl, { order_id: orderId, session_id: "{CHECKOUT_SESSION_ID}" }),
          cancel_url: appendUrlParams(request.body.cancelUrl, { order_id: orderId }),
          client_reference_id: orderId,
          customer_email: request.body.customerEmail,
          line_items: lineItems.map((item) => ({
            price: item.priceId,
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
        notificationEmailStatus: "not_configured",
        createdAt,
        updatedAt: createdAt,
        paidAt: "",
        stripeDashboardUrl: `https://dashboard.stripe.com/payments?query=${encodeURIComponent(session.id)}`,
      });

      response.status(200).json({
        orderId,
        sessionId: session.id,
        stripeMode,
        url: session.url,
      });
    } catch (error) {
      logger.error("createCheckoutSession failed", error);
      response.status(500).json({ error: "Failed to create checkout session" });
    }
  },
);

export const stripeWebhook = onRequest(
  { region: "us-central1", secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET] },
  async (request, response) => {
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

async function handleCheckoutSessionCompleted(
  stripe: Stripe,
  event: Stripe.Event,
): Promise<void> {
  const eventSession = event.data.object as Stripe.Checkout.Session;
  const session = await stripe.checkout.sessions.retrieve(eventSession.id, {
    expand: ["line_items", "payment_intent"],
  });
  const orderId = String(session.metadata?.orderId || session.client_reference_id || session.id);
  const paymentIntent = session.payment_intent;
  const paymentIntentId = typeof paymentIntent === "string"
    ? paymentIntent
    : String(paymentIntent?.id || "");
  const customerDetails = session.customer_details;
  const totalDetails = session.total_details;
  const updatedAt = nowIso();
  await getAdminDb().collection("orders").doc(orderId).set({
    id: orderId,
    status: "paid",
    currency: String(session.currency || "").toLowerCase(),
    amountSubtotal: Number(session.amount_subtotal) || 0,
    amountTax: Number(totalDetails?.amount_tax) || 0,
    amountShipping: Number(totalDetails?.amount_shipping) || 0,
    amountTotal: Number(session.amount_total) || 0,
    customerEmail: String(customerDetails?.email || session.customer_email || ""),
    customerName: String(customerDetails?.name || ""),
    checkoutSessionId: session.id,
    paymentIntentId,
    latestStripeEventId: event.id,
    stripeMode: session.livemode ? "live" : "sandbox",
    notificationEmail: ORDER_NOTIFICATION_EMAIL,
    notificationEmailStatus: "not_configured",
    updatedAt,
    paidAt: updatedAt,
    stripeDashboardUrl: paymentIntentId
      ? `https://dashboard.stripe.com/payments/${paymentIntentId}`
      : `https://dashboard.stripe.com/payments?query=${encodeURIComponent(session.id)}`,
    stripeLineItems: session.line_items?.data.map((item) => ({
      id: item.id,
      description: item.description || "",
      quantity: item.quantity || 0,
      amountSubtotal: item.amount_subtotal || 0,
      amountTotal: item.amount_total || 0,
      priceId: typeof item.price === "string" ? item.price : item.price?.id || "",
    })) || [],
  }, { merge: true });
}

async function handlePaymentIntentFailed(event: Stripe.Event): Promise<void> {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const orderId = String(paymentIntent.metadata?.orderId || "");
  if (!orderId) return;
  await getAdminDb().collection("orders").doc(orderId).set({
    id: orderId,
    status: "payment_failed",
    paymentIntentId: paymentIntent.id,
    latestStripeEventId: event.id,
    updatedAt: nowIso(),
    stripeDashboardUrl: `https://dashboard.stripe.com/payments/${paymentIntent.id}`,
  }, { merge: true });
}
