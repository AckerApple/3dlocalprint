import type { LedgerEntry } from "../../../types/ledger.js";

export type LedgerTotals = {
  grossPositiveTotal: number;
  grossNegativeTotal: number;
  reconciledTotal: number;
  postedTotal: number;
  pendingAmountsTotal: number;
  pendingTotal: number;
  taxToPayTotal: number;
  rewardsBillingCategory?: string;
  rewardsYtdTotal?: number;
};

export type LedgerFilterState = {
  search: string;
  status: "" | LedgerEntry["status"];
  category: string;
  startDate: string;
  endDate: string;
};

export type LedgerModalMode = "create" | "edit";

export type LedgerAmountType = "credit" | "debit";

export type LedgerDraft = {
  title: string;
  amountType: LedgerAmountType;
  amount: string;
  salesTaxLiability: string;
  processingFees: string;
  moneyAccountTitle: string;
  billingCategory: string;
  applicableDate: string;
  notes: string;
  status: LedgerEntry["status"];
};

export type LedgerValidationErrors = {
  title?: string;
  amount?: string;
  salesTaxLiability?: string;
  processingFees?: string;
  moneyAccountTitle?: string;
  billingCategory?: string;
  applicableDate?: string;
  status?: string;
};
