import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions";
import Stripe from "stripe";

const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");

type CheckoutCartItem = {
  priceId: string;
  quantity: number;
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
      const stripe = getStripeClient();
      const session = await stripe.checkout.sessions.create(
        {
          mode: "payment",
          success_url: request.body.successUrl,
          cancel_url: request.body.cancelUrl,
          customer_email: request.body.customerEmail,
          line_items: request.body.cartItems.map((item) => ({
            price: item.priceId,
            quantity: item.quantity,
          })),
          automatic_tax: { enabled: true },
          allow_promotion_codes: true,
          billing_address_collection: "required",
          shipping_address_collection: {
            allowed_countries: ["US", "CA"],
          },
        },
        idempotencyKey ? { idempotencyKey } : undefined,
      );

      response.status(200).json({
        sessionId: session.id,
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
          logger.warn("payment_intent.payment_failed", {
            paymentIntentId: (event.data.object as Stripe.PaymentIntent).id,
          });
          break;
        default:
          logger.debug("Unhandled Stripe event", { type: event.type });
      }

      // TODO: persist order state changes in Firestore based on your order schema.
      response.status(200).json({ received: true });
    } catch (error) {
      logger.error("stripeWebhook signature verification failed", error);
      response.status(400).send("Invalid webhook signature");
    }
  },
);
