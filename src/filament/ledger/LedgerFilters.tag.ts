import { tag, div, input, select, option, button } from "taggedjs";
import type { LedgerStatus } from "../../types/ledger.js";
import type { LedgerFilterState } from "./types.js";

type LedgerAdvancedFiltersProps = {
  filters: LedgerFilterState;
  filterCategories?: string[];
};

type LedgerFiltersProps = {
  filters: LedgerFilterState;
  filterCategories?: string[];
  showAdvancedFilters?: boolean;
  setShowAdvancedFilters?: (value: boolean) => void;
};

const LedgerAdvancedFilters = tag(({
  filters,
  filterCategories = [],
}: LedgerAdvancedFiltersProps) => {
  LedgerAdvancedFilters.updates((args) => {
    [{
      filters,
      filterCategories = [],
    }] = args;
  });

  return div.class`ledger-filters-advanced`(
    select
      .value(() => filters.category)
      .onChange((event) => {
        filters.category = event.target.value;
      })(
      option.value``("All categories"),
      ...filterCategories.map((category) =>
        option.value(category)(category)
      )
    ),
    input
      .type`date`
      .value(() => filters.startDate)
      .onChange((event) => {
        filters.startDate = event.target.value;
      }),
    input
      .type`date`
      .value(() => filters.endDate)
      .onChange((event) => {
        filters.endDate = event.target.value;
      })
  );
});

export const LedgerFilters = tag(({
  filters,
  filterCategories = [],
  showAdvancedFilters = false,
  setShowAdvancedFilters = () => {},
}: LedgerFiltersProps) => {
  LedgerFilters.updates((args) => {
    [{
      filters,
      filterCategories = [],
      showAdvancedFilters = false,
      setShowAdvancedFilters = () => {},
    }] = args;
  });

  return div.class`ledger-filters`(
    div.class`ledger-filters-primary`(
      input
        .type`search`
        .placeholder`Search title or notes`
        .value(() => filters.search)
        .onInput((event) => {
          filters.search = event.target.value;
        }),
      select
        .value(() => filters.status)
        .onChange((event) => {
          filters.status = event.target.value as LedgerStatus;
        })(
        option.value``("All statuses"),
        option.value`pending`("⏳ Pending"),
        option.value`posted`("🏦 Posted"),
        option.value`reconciled`("✅ Reconciled")
      ),
      button
        .type`button`
        .class`ghost-button`
        .onClick(() => {
          const next = !showAdvancedFilters;
          showAdvancedFilters = next;
          setShowAdvancedFilters(next);
        })(
        showAdvancedFilters ? "Fewer filters" : "More filters"
      )
    ),
    _=> showAdvancedFilters
      ? LedgerAdvancedFilters({ filters, filterCategories })
      : null
  );
});
