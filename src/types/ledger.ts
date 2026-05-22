export type LedgerStatus = "pending" | "posted" | "reconciled";

export interface MoneyAccount {
  id: string;
  title: string;
  notes?: string;
  rewardsBillingCategory?: string;
  createdAt: number;
  updatedAt: number;
}

export interface LedgerEntry {
  id: string;
  amount: number;
  salesTaxLiability: number;
  processingFees: number;
  title: string;
  moneyAccountTitle: string;
  billingCategory: string;
  applicableDate: string;
  notes?: string;
  status: LedgerStatus;
  createdAt: number;
  updatedAt: number;
}
