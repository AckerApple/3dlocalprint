import {
  tag,
  tagElement,
  array,
  subscribe,
  p,
} from "taggedjs";
import {
  saveLedgerEntries,
  subscribeLedgerEntries,
} from "../firebase.js";
import { AdminNav } from "../AdminNav.tag.js";
import { ledgerCategories } from "../ledger-categories.array.js";
import { replaceMountRoot } from "../ssoMount.js";
import { toast } from "../toast.js";
import { startAdminAppShell } from "../adminAppShell.js";
import { LedgerPanel } from "./LedgerPanel.tag.js";
import { LedgerEntryModal } from "./LedgerEntryModal.tag.js";
import type { LedgerEntry, LedgerStatus } from "../../types/ledger.js";
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
let stopLedger = null;
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
let totals: LedgerTotals | null = null;
let handleSignOut = () => Promise.resolve();

const filters: LedgerFilterState = {
  search: "",
  status: "",
  category: "",
  startDate: "",
  endDate: "",
};
let showAdvancedFilters = false;

const LOCAL_STORAGE_KEYS = {
  category: "ledger:lastCategory",
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
  amount: "",
  billingCategory: getLocalStorageValue(
    LOCAL_STORAGE_KEYS.category,
    "" // ledgerCategories[0] || "" // "Other"
  ),
  applicableDate: getTodayIso(),
  notes: "",
  status: "posted" as LedgerStatus,
});

let draft: LedgerDraft = createDraft();

const sortLedgerEntries = (items: LedgerEntry[]) =>
  [...items].sort((a, b) => {
    const aDate = String(a.applicableDate || "");
    const bDate = String(b.applicableDate || "");
    if (aDate !== bDate) {
      return bDate.localeCompare(aDate);
    }
    return (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0);
  });

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
  amount: Number(entry.amount).toFixed(2),
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
  const decimalRule = /^-?\d+(\.\d{1,2})?$/;

  if (title.length < 2 || title.length > 80) {
    next.title = "Title must be 2-80 characters.";
  }
  if (!decimalRule.test(amountRaw) || !Number.isFinite(amount) || amount === 0) {
    next.amount = "Amount must be a non-zero number (up to 2 decimals).";
  }
  if (!String(source.billingCategory || "").trim()) {
    next.billingCategory = "Billing category is required.";
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
  const billingCategory = String(draft.billingCategory || "").trim();
  return {
    title,
    notes,
    billingCategory: billingCategory || "",
    amount: Number(draft.amount),
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

const getFilteredEntries = (entries: LedgerEntry[]): LedgerEntry[] => {
  const search = filters.search.trim().toLowerCase();
  return sortLedgerEntries(Array.isArray(entries) ? entries : []).filter((entry) => {
    const matchesSearch = !search
      || entry.title.toLowerCase().includes(search)
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

const openCreateModal = () => {
  modalMode = "create";
  activeEntryId = "";
  draft = createDraft();
  submitted = false;
  modalOpen = true;
};

const openEditModal = (id: string) => {
  const entry = entries$.value.find((item) => item.id === id);

  if (!entry) return;

  modalMode = "edit";
  activeEntryId = id;
  draft = entryToDraft(entry);
  submitted = false;
  modalOpen = true;
};

const closeModal = () => {
  modalOpen = false;
  submitted = false;
  isSaving = false;
  isDeleting = false;
  draft = createDraft();
};

const getSignedAmount = (entry: LedgerEntry): number => {
  return Number(entry.amount) || 0;
};

const calculateTotals = () => {
  const reconciledTotal = entries$.value.reduce((acc, entry) => {
    if (entry.status !== "reconciled") return acc;
    return acc + getSignedAmount(entry);
  }, 0);

  const postedTotal = entries$.value.reduce((acc, entry) => {
    if (!["posted", "reconciled"].includes(entry.status)) return acc;
    return acc + getSignedAmount(entry);
  }, 0);

  const pendingTotal = entries$.value.reduce((acc, entry) => {
    return acc + getSignedAmount(entry);
  }, 0);

  totals = {
    reconciledTotal,
    postedTotal,
    pendingTotal,
  }

  toast.info(
    `Reconciled: ${toDisplayNet(reconciledTotal)} | Posted: ${toDisplayNet(postedTotal)} | Pending: ${toDisplayNet(pendingTotal)}`
  );
};

const handleSave = async () => {
  if (!isAuthorized) {
    toast.error("Sign in to save changes.");
    return;
  }
  submitted = true;
  const errors = validateDraft(draft);
  if (Object.keys(errors).length) {
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
    await saveLedgerEntries(nextEntries);
    toast.success("Ledger entry deleted.");
    closeModal();
  } catch (error) {
    console.error("Failed to delete ledger entry", error);
    toast.error("Delete failed. Try again.");
    isDeleting = false;
  }
};

const syncModalSaveState = () => {
  const saveButton = document.getElementById("ledgerSaveButton")
  if (!saveButton) return
  const isValid = Object.keys(validateDraft(draft)).length === 0
  ;(saveButton as any).disabled = !isValid || isSaving || isDeleting
};

const renderModal = (entries: LedgerEntry[]) => {
  return LedgerEntryModal(
    {
      modalOpen,
      modalMode,
      draft,
      entries,
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
    subscribe(entries$, entries => {
      const filteredEntries = getFilteredEntries(entries);
      const filterCategories = getFilterCategories(entries);

      return LedgerPanel({
        entries,
        filteredEntries,
        filterCategories,
        filters,
        showAdvancedFilters,
        setShowAdvancedFilters: (value: boolean) => {
          showAdvancedFilters = value;
        },
        totals,
        calculateTotals,
        openCreateModal,
        openEditModal,
        toDisplayAmount,
        toDisplayNet,
        renderModal,
        isLoading,
      });
    }),
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
    isLoading = true;
  },
  onDenied: () => {
    isAuthorized = false;
    if (stopLedger) {
      stopLedger();
      stopLedger = null;
    }
    isLoading = true;
  },
  onAuthorized: ({ authState }) => {
    isAuthorized = authState.isAuthorized;
    if (!stopLedger) {
      stopLedger = subscribeLedgerEntries((items) => {
        isLoading = false;
        entries$.value.length = 0;
        entries$.push(
          ...sortLedgerEntries(
            (Array.isArray(items) ? items : []).map(normalizeLoadedEntry)
          )
        );
        if (authState.isAuthorized) {
          if (appMounted) {
            return;
          } else {
            mountApp();
          }
        }
      });
    }
    mountApp();
  },
});
handleSignOut = auth.handleSignOut;
