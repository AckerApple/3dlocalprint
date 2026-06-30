export type AgreementStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "checkout_created"
  | "paid_active"
  | "expired"
  | "canceled";

export type AgreementServiceItem = {
  label: string;
  included: boolean;
  monthlyValue: number;
  yearlyCost: number;
};

export type AgreementRecord = {
  id: string;
  agreementTemplateId: string;
  agreementVersion: string;
  status: AgreementStatus;
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
  agreementEmail: string;
  agreementEmailStatus: string;
  agreementEmailUpdatedAt: string;
  agreementEmailManualSentAt: string;
  renewalReminderStatus: string;
  renewalReminderSentAt: string;
  createdAt: string;
  updatedAt: string;
};
