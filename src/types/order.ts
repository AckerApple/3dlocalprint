export type OrderStatus =
  | "checkout_created"
  | "paid"
  | "payment_failed"
  | "canceled"
  | "unknown";

export type OrderLineItem = {
  priceId: string;
  quantity: number;
  title: string;
  unitAmount?: number;
  currency?: string;
  productId?: string;
  variationId?: string;
};

export type OrderRecord = {
  id: string;
  status: OrderStatus;
  lineItems: OrderLineItem[];
  currency: string;
  amountSubtotal: number;
  amountTax: number;
  amountShipping: number;
  amountTotal: number;
  customerEmail: string;
  customerName: string;
  checkoutSessionId: string;
  checkoutUrl: string;
  paymentIntentId: string;
  stripeCustomerId: string;
  latestStripeEventId: string;
  stripeMode: "sandbox" | "live" | "";
  notificationEmail: string;
  notificationEmailStatus: string;
  createdAt: string;
  updatedAt: string;
  paidAt: string;
  stripeDashboardUrl: string;
  adminOrderUrl: string;
  publicOrderUrl: string;
};
