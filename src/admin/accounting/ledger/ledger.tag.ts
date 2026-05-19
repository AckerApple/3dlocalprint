import {
  tag,
  tagElement,
  array,
  subscribe,
} from "taggedjs";
import {
  saveLedgerEntries,
  subscribeLedgerEntries,
  subscribeMoneyAccounts,
} from "../../shared/firebase.js";
import { AdminNav } from "../../shared/AdminNav.tag.js";
import { ledgerCategories } from "../ledger-categories.array.js";
import { replaceMountRoot } from "../../shared/ssoMount.js";
import { toast } from "../../shared/toast.js";
import { startAdminAppShell } from "../../shared/adminAppShell.js";
import { LedgerPanel } from "./LedgerPanel.tag.js";
import { LedgerEntryModal } from "./LedgerEntryModal.tag.js";
import type { LedgerEntry, LedgerStatus, MoneyAccount } from "../../../types/ledger.js";
import type {
  LedgerFilterState,
  LedgerTotals,
  LedgerDraft,
  LedgerValidationErrors,
  LedgerModalMode,
} from "./types.js";

let app = document.getElementById("ledgerApp");
const appRoot = { current: app };
const entries$ = array<LedgerEntry>([]);
const moneyAccounts$ = array<MoneyAccount>([]);
let stopLedger = null;
let stopMoneyAccounts = null;
let isAuthorized = false;
let appMounted = false;
let currentUser = null;
let isLoading = true;
let modalOpen = false;
let modalMode: LedgerModalMode = "create";
let activeEntryId = "";
let isSaving = false;
let isDeleting = false;
let submitted = false;
let accountTotals: Record<string, LedgerTotals> = {};
let handleSignOut = () => Promise.resolve();
type PendingLedgerModal =
  | { mode: "create"; accountTitle: string }
  | { mode: "edit"; entryId: string }
  | null;

let pendingLedgerModalFromUrl: PendingLedgerModal = null;

const getLedgerModalFromUrl = (): PendingLedgerModal => {
  try {
    const params = new URLSearchParams(window.location.search);
    const action = String(params.get("action") || "").trim().toLowerCase();
    const modal = String(params.get("modal") || "").trim().toLowerCase();
    const add = String(params.get("add") || "").trim().toLowerCase();
    const entry = String(params.get("entry") || "").trim();
    const accountTitle = String(params.get("account") || params.get("moneyAccount") || "").trim();

    if (action === "add" || modal === "add" || add === "1" || entry.toLowerCase() === "new") {
      return {
        mode: "create",
        accountTitle,
      };
    }

    if (entry) {
      return {
        mode: "edit",
        entryId: entry,
      };
    }
  } catch {
    return null;
  }

  return null;
};

const setLedgerModalInUrl = (modalRequest: PendingLedgerModal) => {
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete("entry");
    url.searchParams.delete("action");
    url.searchParams.delete("modal");
    url.searchParams.delete("add");
    url.searchParams.delete("account");
    url.searchParams.delete("moneyAccount");

    if (modalRequest?.mode === "edit") {
      url.searchParams.set("entry", modalRequest.entryId);
    }
    if (modalRequest?.mode === "create") {
      url.searchParams.set("action", "add");
      if (modalRequest.accountTitle) {
        url.searchParams.set("account", modalRequest.accountTitle);
      }
    }

    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState({}, "", nextUrl);
  } catch {
    // ignore URL mutation failures
  }
};

pendingLedgerModalFromUrl = getLedgerModalFromUrl();

const createFilters = (): LedgerFilterState => ({
  search: "",
  status: "",
  category: "",
  startDate: "",
  endDate: "",
});
const filters = createFilters()
let showAdvancedFilters = false;

const LOCAL_STORAGE_KEYS = {
  category: "ledger:lastCategory",
  moneyAccountTitle: "ledger:lastMoneyAccountTitle",
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const getLocalStorageValue = (key, fallback = "") => {
  try {
    return window.localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const setLocalStorageValue = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore write errors
  }
};

const getTodayIso = () => new Date().toISOString().slice(0, 10);

const createEntryId = () => {
  if (globalThis.crypto?.randomUUID) {
    return crypto.randomUUID();
  }
  const rand = Math.random().toString(36).slice(2, 10);
  return `ledger_${Date.now().toString(36)}_${rand}`;
};

const createDraft = () => ({
  title: "",
  amountType: "credit" as const,
  amount: "",
  salesTaxLiability: "",
  processingFees: "",
  moneyAccountTitle: getLocalStorageValue(
    LOCAL_STORAGE_KEYS.moneyAccountTitle,
    ""
  ),
  billingCategory: getLocalStorageValue(
    LOCAL_STORAGE_KEYS.category,
    "" // ledgerCategories[0] || "" // "Other"
  ),
  applicableDate: getTodayIso(),
  notes: "",
  status: "posted" as LedgerStatus,
});

let draft: LedgerDraft = createDraft();

const getAmountTypeFromAmount = (amount: number) =>
  amount < 0 ? "debit" : "credit";

const creditOnlyCategories = new Set([
  "Sales Revenue",
  "Owner Contribution",
  "Shipping Income",
  "Bank Bonus Income",
  "Sales Tax Collected",
]);

const debitOnlyCategories = new Set([
  "Filament",
  "Printer Parts",
  "Tools",
  "Packaging",
  "Shipping Expense",
  "Transfer to Credit Card",
  "Marketing",
  "Software",
  "Event Fees",
]);

const isCategoryAllowedForAmountType = (
  category: string,
  amountType: LedgerDraft["amountType"]
) => {
  const value = String(category || "").trim();
  if (!value || value === "Other") return true;
  if (creditOnlyCategories.has(value)) return amountType === "credit";
  if (debitOnlyCategories.has(value)) return amountType === "debit";
  return true;
};

const sortLedgerEntries = (items: LedgerEntry[]) =>
  [...items].sort((a, b) => {
    const aDate = String(a.applicableDate || "");
    const bDate = String(b.applicableDate || "");
    if (aDate !== bDate) {
      return bDate.localeCompare(aDate);
    }
    return (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0);
  });

const replaceEntries = (items: LedgerEntry[]) => {
  const next = sortLedgerEntries(Array.isArray(items) ? items : []);
  entries$.splice(0, entries$.length, ...next);
  accountTotals = {};
};

const toDisplayAmount = (value) => currency.format(Number(value) || 0);

const toDisplayNet = (value) => {
  const amount = Number(value) || 0;
  if (amount > 0) return `+${currency.format(amount)}`;
  if (amount < 0) return `-${currency.format(Math.abs(amount))}`;
  return currency.format(0);
};

const toDisplayUpdated = (value) => {
  const ts = Number(value) || 0;
  if (!ts) return "—";
  return new Date(ts).toLocaleString();
};

const normalizeLoadedEntry = (
  item: LedgerEntry
): LedgerEntry => ({
  id: String(item?.id || ""),
  amount: (() => {
    const amount = Number(item?.amount) || 0;
    const legacyDirection = String((item as any)?.direction || "");
    if (legacyDirection === "debit") return -Math.abs(amount);
    if (legacyDirection === "credit") return Math.abs(amount);
    return amount;
  })(),
  title: String(item?.title || ""),
  salesTaxLiability: Math.min(0, Number((item as any)?.salesTaxLiability) || 0),
  processingFees: Math.min(0, Number((item as any)?.processingFees) || 0),
  moneyAccountTitle: String((item as any)?.moneyAccountTitle || ""),
  billingCategory: String(item?.billingCategory || ""),
  applicableDate: String(item?.applicableDate || ""),
  notes: String(item?.notes || ""),
  status: ["pending", "posted", "reconciled"].includes(item?.status)
    ? item.status
    : "posted",
  createdAt: Number(item?.createdAt) || Date.now(),
  updatedAt: Number(item?.updatedAt) || Date.now(),
});

const entryToDraft = (entry: LedgerEntry): LedgerDraft => ({
  title: String(entry.title || ""),
  amountType: getAmountTypeFromAmount(Number(entry.amount) || 0),
  amount: Number(entry.amount).toFixed(2),
  salesTaxLiability: Number(entry.salesTaxLiability || 0)
    ? Number(entry.salesTaxLiability || 0).toFixed(2)
    : "",
  processingFees: Number(entry.processingFees || 0)
    ? Number(entry.processingFees || 0).toFixed(2)
    : "",
  moneyAccountTitle: String(entry.moneyAccountTitle || ""),
  billingCategory: String(entry.billingCategory || ""),
  applicableDate: String(entry.applicableDate || getTodayIso()),
  notes: String(entry.notes || ""),
  status: ["pending", "posted", "reconciled"].includes(entry.status)
    ? entry.status
    : "posted",
});

const isValidDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
  const parsed = new Date(`${value}T00:00:00`);
  return !Number.isNaN(parsed.getTime());
};

const validateDraft = (source: LedgerDraft): LedgerValidationErrors => {
  const next: LedgerValidationErrors = {};
  const title = String(source.title || "").trim();
  const amountRaw = String(source.amount || "").trim();
  const amount = Number(amountRaw);
  const salesTaxLiabilityRaw = String(source.salesTaxLiability || "").trim();
  const salesTaxLiability = Number(salesTaxLiabilityRaw || "0");
  const processingFeesRaw = String(source.processingFees || "").trim();
  const processingFees = Number(processingFeesRaw || "0");
  const isSalesRevenue = String(source.billingCategory || "").trim().toLowerCase() === "sales revenue";
  const decimalRule = /^-?\d+(\.\d{1,2})?$/;

  if (title.length < 2 || title.length > 80) {
    next.title = "Title must be 2-80 characters.";
  }
  if (!decimalRule.test(amountRaw) || !Number.isFinite(amount) || amount === 0) {
    next.amount = "Amount must be a non-zero number (up to 2 decimals).";
  }
  if (
    isSalesRevenue
    && salesTaxLiabilityRaw
    && (!decimalRule.test(salesTaxLiabilityRaw) || !Number.isFinite(salesTaxLiability) || salesTaxLiability >= 0)
  ) {
    next.salesTaxLiability = "Sales tax liability must be a negative number (up to 2 decimals).";
  }
  if (
    isSalesRevenue
    && processingFeesRaw
    && (!decimalRule.test(processingFeesRaw) || !Number.isFinite(processingFees) || processingFees >= 0)
  ) {
    next.processingFees = "Processing fees must be a negative number (up to 2 decimals).";
  }
  if (!String(source.moneyAccountTitle || "").trim()) {
    next.moneyAccountTitle = "Money account is required.";
  }
  if (!String(source.billingCategory || "").trim()) {
    next.billingCategory = "Billing category is required.";
  } else if (!isCategoryAllowedForAmountType(source.billingCategory, source.amountType)) {
    next.billingCategory = `${source.billingCategory} does not apply to ${source.amountType} entries.`;
  }
  if (!isValidDate(source.applicableDate)) {
    next.applicableDate = "Applicable date is required.";
  }
  if (!["pending", "posted", "reconciled"].includes(source.status)) {
    next.status = "Status must be pending, posted, or reconciled.";
  }

  return next;
};

const normalizedDraft = (): Omit<LedgerEntry, "id" | "createdAt" | "updatedAt"> => {
  const title = String(draft.title || "").trim();
  const notes = String(draft.notes || "").trim();
  const moneyAccountTitle = String(draft.moneyAccountTitle || "").trim();
  const billingCategory = String(draft.billingCategory || "").trim();
  const isSalesRevenue = draft.amountType === "credit" && billingCategory.toLowerCase() === "sales revenue";
  const amount = Math.abs(Number(draft.amount) || 0);
  return {
    title,
    notes,
    moneyAccountTitle,
    billingCategory: billingCategory || "",
    amount: draft.amountType === "debit" ? -amount : amount,
    salesTaxLiability: isSalesRevenue
      ? Math.min(0, Number(draft.salesTaxLiability || "0") || 0)
      : 0,
    processingFees: isSalesRevenue
      ? Math.min(0, Number(draft.processingFees || "0") || 0)
      : 0,
    applicableDate: draft.applicableDate,
    status: draft.status,
  };
};

const getAllCategoryOptions = (entries: LedgerEntry[]) => {
  const set = new Set(ledgerCategories);
  (Array.isArray(entries) ? entries : []).forEach((entry) => {
    if (entry.billingCategory) {
      set.add(entry.billingCategory);
    }
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b));
};

const getFilterCategories = (entries: LedgerEntry[]) => {
  const set = new Set<string>();
  (Array.isArray(entries) ? entries : []).forEach((entry) => {
    if (entry.billingCategory) {
      set.add(entry.billingCategory);
    }
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b));
};

const getFilteredEntries = (
  entries: LedgerEntry[],
  filters: LedgerFilterState
): LedgerEntry[] => {
  const search = String(filters.search || "").trim().toLowerCase();
  return sortLedgerEntries(Array.isArray(entries) ? entries : []).filter((entry) => {
    const matchesSearch = !search
      || entry.title.toLowerCase().includes(search)
      || String(entry.moneyAccountTitle || "").toLowerCase().includes(search)
      || String(entry.notes || "").toLowerCase().includes(search);
    const matchesStatus = !filters.status || entry.status === filters.status;
    const matchesCategory = !filters.category || entry.billingCategory === filters.category;
    const matchesStart = !filters.startDate || entry.applicableDate >= filters.startDate;
    const matchesEnd = !filters.endDate || entry.applicableDate <= filters.endDate;
    return (
      matchesSearch
      && matchesStatus
      && matchesCategory
      && matchesStart
      && matchesEnd
    );
  });
};

const normalizeLoadedMoneyAccount = (item: MoneyAccount): MoneyAccount => {
  const title = String(item?.title || "").trim();
  return {
    id: String(item?.id || ""),
    title,
    notes: String(item?.notes || "").trim(),
    createdAt: Number(item?.createdAt) || Date.now(),
    updatedAt: Number(item?.updatedAt) || Date.now(),
  };
};

const getMoneyAccountTitles = (items: MoneyAccount[]) =>
  (Array.isArray(items) ? items : [])
    .map((item) => String(item?.title || "").trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

const openPendingCreateModalFromUrl = (availableAccounts: MoneyAccount[]) => {
  if (pendingLedgerModalFromUrl?.mode !== "create") {
    return;
  }

  const { accountTitle } = pendingLedgerModalFromUrl;
  pendingLedgerModalFromUrl = null;
  openCreateModal(accountTitle, false, getMoneyAccountTitles(availableAccounts));
};

const openCreateModal = (accountTitle = "", syncUrl = true, availableAccountTitles?: string[]) => {
  modalMode = "create";
  activeEntryId = "";
  draft = createDraft();
  const titles = Array.isArray(availableAccountTitles)
    ? availableAccountTitles
    : getMoneyAccountTitles(moneyAccounts$.value);
  const requestedAccountTitle = String(accountTitle || "").trim();
  if (requestedAccountTitle && titles.includes(requestedAccountTitle)) {
    draft.moneyAccountTitle = requestedAccountTitle;
  }
  const currentMoneyAccountTitle = String(draft.moneyAccountTitle || "").trim();
  if (currentMoneyAccountTitle && !titles.includes(currentMoneyAccountTitle)) {
    draft.moneyAccountTitle = "";
  }
  submitted = false;
  modalOpen = true;
  if (syncUrl) {
    setLedgerModalInUrl({
      mode: "create",
      accountTitle: draft.moneyAccountTitle || requestedAccountTitle,
    });
  }
};

const openEditModal = (id: string, syncUrl = true) => {
  const entry = entries$.value.find((item) => item.id === id);

  if (!entry) {
    if (syncUrl) setLedgerModalInUrl(null);
    return false;
  }

  modalMode = "edit";
  activeEntryId = id;
  draft = entryToDraft(entry);
  const titles = getMoneyAccountTitles(moneyAccounts$.value);
  const currentMoneyAccountTitle = String(draft.moneyAccountTitle || "").trim();
  if (currentMoneyAccountTitle && !titles.includes(currentMoneyAccountTitle)) {
    draft.moneyAccountTitle = "";
  }
  submitted = false;
  modalOpen = true;
  if (syncUrl) {
    setLedgerModalInUrl({
      mode: "edit",
      entryId: id,
    });
  }
  return true;
};

const closeModal = () => {
  modalOpen = false;
  activeEntryId = "";
  submitted = false;
  isSaving = false;
  isDeleting = false;
  draft = createDraft();
  setLedgerModalInUrl(null);
};

const getSignedAmount = (entry: LedgerEntry): number => {
  return Number(entry.amount) || 0;
};

const computeTotalsForEntries = (source: LedgerEntry[]): LedgerTotals => {
  const grossPositiveTotal = source.reduce((acc, entry) => {
    const amount = getSignedAmount(entry);
    return amount > 0 ? acc + amount : acc;
  }, 0);

  const grossNegativeTotal = source.reduce((acc, entry) => {
    const amount = getSignedAmount(entry);
    return amount < 0 ? acc + amount : acc;
  }, 0);

  const reconciledTotal = source.reduce((acc, entry) => {
    if (entry.status !== "reconciled") return acc;
    return acc + getSignedAmount(entry);
  }, 0);

  const postedTotal = source.reduce((acc, entry) => {
    if (!["posted", "reconciled"].includes(entry.status)) return acc;
    return acc + getSignedAmount(entry);
  }, 0);

  const pendingAmountsTotal = source.reduce((acc, entry) => {
    if (entry.status !== "pending") return acc;
    return acc + getSignedAmount(entry);
  }, 0);

  const pendingTotal = source.reduce((acc, entry) => {
    return acc + getSignedAmount(entry);
  }, 0);

  const taxToPayTotal = source.reduce((acc, entry) => {
    return acc + (Number(entry.salesTaxLiability) || 0);
  }, 0);

  return {
    grossPositiveTotal,
    grossNegativeTotal,
    reconciledTotal,
    postedTotal,
    pendingAmountsTotal,
    pendingTotal,
    taxToPayTotal,
  };
};

const calculateAccountTotals = (accountTitle: string, source: LedgerEntry[]) => {
  if (accountTotals[accountTitle]) {
    const nextTotals = { ...accountTotals };
    delete nextTotals[accountTitle];
    accountTotals = nextTotals;
    return;
  }

  accountTotals = {
    ...accountTotals,
    [accountTitle]: computeTotalsForEntries(source),
  };
};

const handleSave = async () => {
  if (!isAuthorized) {
    toast.error("Sign in to save changes.");
    return;
  }
  submitted = true;
  const errors = validateDraft(draft);
  if (Object.keys(errors).length) {
    syncModalSaveState(true);
    return;
  }
  isSaving = true;

  const normalized = normalizedDraft();
  const now = Date.now();
  let nextEntries: LedgerEntry[] = [];
  if (modalMode === "edit" && activeEntryId) {
    nextEntries = entries$.value.map((item) =>
      item.id === activeEntryId
        ? {
            ...item,
            ...normalized,
            updatedAt: now,
          }
        : item
    );
  } else {
    nextEntries = [
      {
        id: createEntryId(),
        ...normalized,
        createdAt: now,
        updatedAt: now,
      },
      ...entries$.value,
    ];
  }

  try {
    await saveLedgerEntries(sortLedgerEntries(nextEntries));
    replaceEntries(nextEntries);
    setLocalStorageValue(LOCAL_STORAGE_KEYS.moneyAccountTitle, normalized.moneyAccountTitle);
    setLocalStorageValue(LOCAL_STORAGE_KEYS.category, normalized.billingCategory);
    toast.success(modalMode === "edit" ? "Ledger entry updated." : "Ledger entry added.");
    closeModal();
  } catch (error) {
    console.error("Failed to save ledger entries", error);
    toast.error("Save failed. Try again.");
    isSaving = false;
  }
};

const handleDelete = async () => {
  if (!activeEntryId) return;
  if (!confirm("Delete this ledger entry?")) return;
  if (!isAuthorized) {
    toast.error("Sign in to delete entries.");
    return;
  }
  isDeleting = true;
  try {
    const nextEntries = entries$.value.filter((entry) => entry.id !== activeEntryId);
    await saveLedgerEntries(sortLedgerEntries(nextEntries));
    replaceEntries(nextEntries);
    toast.success("Ledger entry deleted.");
    closeModal();
  } catch (error) {
    console.error("Failed to delete ledger entry", error);
    toast.error("Delete failed. Try again.");
    isDeleting = false;
  }
};

const syncModalSaveState = (showErrors = false) => {
  if (showErrors) {
    submitted = true;
  }
  const saveButton = document.getElementById("ledgerSaveButton")
  const errors = validateDraft(draft);
  if (saveButton) {
    ;(saveButton as any).disabled = isSaving || isDeleting
  }
  document.querySelectorAll("[data-ledger-error]").forEach((element) => {
    const field = element.getAttribute("data-ledger-error") as keyof LedgerValidationErrors | null;
    element.textContent = submitted && field && errors[field] ? String(errors[field]) : "";
  });
  document.querySelectorAll("[data-ledger-field]").forEach((element) => {
    const field = element.getAttribute("data-ledger-field") as keyof LedgerValidationErrors | null;
    element.classList.toggle("ledger-input-invalid", !!(submitted && field && errors[field]));
  });
};

const renderModal = (entries: LedgerEntry[]) => {
  const moneyAccountTitles = getMoneyAccountTitles(moneyAccounts$.value);
  return LedgerEntryModal(
    {
      modalOpen,
      modalMode,
      draft,
      entries,
      moneyAccountTitles,
      submitted,
      isSaving,
      isDeleting,
      validateDraft,
      getAllCategoryOptions,
      onClose: closeModal,
      onSave: handleSave,
      onDelete: handleDelete,
      onSyncSaveState: syncModalSaveState,
    }
  );
};

export const LedgerApp = tag(() => {
  return [
    AdminNav(handleSignOut, currentUser),
    subscribe(entries$, (entries) => {
      return subscribe(moneyAccounts$, (moneyAccounts) => {
        const filteredEntries = getFilteredEntries(entries, filters)
        const filterCategories = getFilterCategories(entries)

        return LedgerPanel({
          entries,
          filteredEntries,
          moneyAccounts,
          filterCategories,
          filters,
          showAdvancedFilters,
          setShowAdvancedFilters: (value: boolean) => {
            showAdvancedFilters = value;
          },
          onFiltersChanged: (nextFilters: LedgerFilterState) => {
            accountTotals = {};
            Object.assign(filters, nextFilters)
          },
          accountTotals,
          onCalculateAccountTotals: calculateAccountTotals,
          onOpenCreateModalForAccount: openCreateModal,
          openCreateModal,
          openEditModal,
          toDisplayAmount,
          toDisplayNet,
          renderModal,
          isLoading,
        });
      });
    })
  ];
});

const mountApp = () => {
  if (!appRoot.current || appMounted) {
    return;
  }
  const nextRoot = replaceMountRoot(appRoot);
  if (!nextRoot) return;
  nextRoot.replaceChildren();
  tagElement(LedgerApp, nextRoot);
  appMounted = true;
  app = appRoot.current;
};

const auth = startAdminAppShell({
  rootRef: appRoot,
  toast,
  setAppMounted: (value) => {
    appMounted = value;
  },
  setCurrentUser: (value) => {
    currentUser = value;
  },
  onAfterSsoMount: () => {
    app = appRoot.current;
  },
  onSignedOut: () => {
    isAuthorized = false;
    if (stopLedger) {
      stopLedger();
      stopLedger = null;
    }
    if (stopMoneyAccounts) {
      stopMoneyAccounts();
      stopMoneyAccounts = null;
    }
    isLoading = true;
  },
  onDenied: () => {
    isAuthorized = false;
    if (stopLedger) {
      stopLedger();
      stopLedger = null;
    }
    if (stopMoneyAccounts) {
      stopMoneyAccounts();
      stopMoneyAccounts = null;
    }
    isLoading = true;
  },
  onAuthorized: ({ authState }) => {
    isAuthorized = authState.isAuthorized;
    if (!stopLedger) {
      stopLedger = subscribeLedgerEntries((items) => {
        isLoading = false;
        replaceEntries((Array.isArray(items) ? items : []).map(normalizeLoadedEntry));
        if (pendingLedgerModalFromUrl?.mode === "edit") {
          const restoreId = pendingLedgerModalFromUrl.entryId;
          pendingLedgerModalFromUrl = null;
          const opened = openEditModal(restoreId, false);
          if (!opened) {
            setLedgerModalInUrl(null);
          }
        }
        if (authState.isAuthorized) {
          if (appMounted) {
            return;
          } else {
            mountApp();
          }
        }
      });
    }
    if (!stopMoneyAccounts) {
      stopMoneyAccounts = subscribeMoneyAccounts((items) => {
        const normalized = (Array.isArray(items) ? items : [])
          .map(normalizeLoadedMoneyAccount)
          .filter((item) => item.id && item.title);
        openPendingCreateModalFromUrl(normalized);
        moneyAccounts$.splice(0, moneyAccounts$.length, ...normalized);
      });
    }
    mountApp();
  },
});
handleSignOut = auth.handleSignOut;
