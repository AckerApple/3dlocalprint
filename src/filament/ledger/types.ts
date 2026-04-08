import type { LedgerEntry } from "../../types/ledger.js";

export type LedgerTotals = {
  reconciledTotal: number;
  postedTotal: number;
  pendingTotal: number;
};

export type LedgerFilterState = {
  search: string;
  status: "" | LedgerEntry["status"];
  category: string;
  startDate: string;
  endDate: string;
};

export type LedgerModalMode = "create" | "edit";

export type LedgerDraft = {
  title: string;
  amount: string;
  moneyAccountTitle: string;
  billingCategory: string;
  applicableDate: string;
  notes: string;
  status: LedgerEntry["status"];
};

export type LedgerValidationErrors = {
  title?: string;
  amount?: string;
  moneyAccountTitle?: string;
  billingCategory?: string;
  applicableDate?: string;
  status?: string;
};
