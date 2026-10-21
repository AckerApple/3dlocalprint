export type OrderStatus =
  | "checkout_created"
  | "paid"
  | "payment_failed"
  | "closed"
  | "canceled"
  | "unknown";

export type OrderLineItem = {
  badgeName?: string;
  priceId: string;
  quantity: number;
  title: string;
  unitAmount?: number;
  currency?: string;
  productId?: string;
  variationId?: string;
};

export type OrderRecord = {
  customerDetailsPending?: boolean;
  orderImage?: {path: string; mime: string; uploadedAt: string};
  id: string;
  orderType?: string;
  agreementId?: string;
  agreementPublicUrl?: string;
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
  checkoutLinkSessionId?: string;
  checkoutChannel?: string;
  paymentIntentId: string;
  stripeCustomerId: string;
  organizationCheckoutRequestId: string;
  organizationName: string;
  exemptionCertificateNumber: string;
  taxExemptCustomer: boolean;
  latestStripeEventId: string;
  stripeMode: "sandbox" | "live" | "";
  notificationEmail: string;
  notificationEmailStatus: string;
  createdAt: string;
  updatedAt: string;
  paidAt: string;
  paymentMethod: string;
  cashLedgerEntryId: string;
  ledgerEntryId: string;
  stripeDashboardUrl: string;
  adminOrderUrl: string;
  publicOrderUrl: string;
};
