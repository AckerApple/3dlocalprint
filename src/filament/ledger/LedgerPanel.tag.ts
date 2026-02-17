import { tag, section, p } from "taggedjs";
import type { LedgerEntry } from "../../types/ledger.js";
import { LedgerHeader } from "./LedgerHeader.tag.js";
import { LedgerFilters } from "./LedgerFilters.tag.js";
import { LedgerEntriesTable } from "./LedgerEntriesTable.tag.js";
import type { LedgerFilterState, LedgerTotals } from "./types.js";

type LedgerPanelProps = {
  entries?: LedgerEntry[];
  filteredEntries?: LedgerEntry[];
  filterCategories?: string[];
  filters: LedgerFilterState;
  showAdvancedFilters?: boolean;
  setShowAdvancedFilters?: (value: boolean) => void;
  totals?: LedgerTotals | null;
  calculateTotals?: () => void;
  openCreateModal?: () => void;
  openEditModal?: (id: string) => void;
  toDisplayAmount?: (value: number) => string;
  toDisplayNet?: (value: number) => string;
  renderModal?: (entries: LedgerEntry[]) => unknown;
  isLoading?: boolean;
};

const defaultFilters: LedgerFilterState = {
  search: "",
  status: "",
  category: "",
  startDate: "",
  endDate: "",
};

export const LedgerPanel = tag(({
  entries = [],
  filteredEntries = [],
  filterCategories = [],
  filters = defaultFilters,
  showAdvancedFilters = false,
  setShowAdvancedFilters = () => {},
  totals = null,
  calculateTotals = () => {},
  openCreateModal = () => {},
  openEditModal = () => {},
  toDisplayAmount = (value: number) => String(value),
  toDisplayNet = (value: number) => String(value),
  renderModal = () => null,
  isLoading = false,
}: LedgerPanelProps) => {
  LedgerPanel.updates((args) => {
    [{
      entries = [],
      filteredEntries = [],
      filterCategories = [],
      filters = defaultFilters,
      showAdvancedFilters = false,
      setShowAdvancedFilters = () => {},
      totals = null,
      calculateTotals = () => {},
      openCreateModal = () => {},
      openEditModal = () => {},
      toDisplayAmount = (value: number) => String(value),
      toDisplayNet = (value: number) => String(value),
      renderModal = () => null,
      isLoading = false,
    }] = args;
  });

  return [
    section.class`panel ledger-panel`(
      _=> LedgerHeader({
        totals,
        onCalculateTotals: calculateTotals,
        onOpenCreateModal: openCreateModal,
        toDisplayNet,
      }),
      _=> LedgerFilters({
        filters,
        filterCategories,
        showAdvancedFilters,
        setShowAdvancedFilters,
      }),
      _=> {
        if (isLoading) {
          return p("Loading...");
        }

        if (filteredEntries.length === 0) {
          return p.class`ledger-empty`("No entries found. Add your first entry.");
        }

        return LedgerEntriesTable({
          filteredEntries,
          onOpenEditModal: openEditModal,
          toDisplayAmount,
        });
      },
    ),
    _=> renderModal(entries),
  ];
});
