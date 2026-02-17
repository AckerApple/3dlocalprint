export type LedgerStatus = "pending" | "posted" | "reconciled";

export interface LedgerEntry {
  id: string;
  amount: number;
  title: string;
  billingCategory: string;
  applicableDate: string;
  notes?: string;
  status: LedgerStatus;
  createdAt: number;
  updatedAt: number;
}
