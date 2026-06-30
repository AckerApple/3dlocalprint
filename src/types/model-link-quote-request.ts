export type ModelLinkQuoteRequestStatus =
  | "quote_requested"
  | "quoted"
  | "approved"
  | "printing"
  | "completed"
  | "canceled";

export type ModelLinkQuoteRequestRecord = {
  id: string;
  status: ModelLinkQuoteRequestStatus | string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  marketingOptIn: boolean;
  modelItems: ModelLinkQuoteRequestItem[];
  modelLinks: string[];
  projectDetails: string;
  quantity: number;
  publicReviewUrl: string;
  adminReviewUrl: string;
  notificationEmailStatus: string;
  customerEmailStatus: string;
  createdAt: string;
  updatedAt: string;
};

export type ModelLinkQuoteRequestItem = {
  url: string;
  quantity: number;
};
