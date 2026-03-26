import { tag, div, input, select, option, button, output } from "taggedjs";
import type { LedgerStatus } from "../../types/ledger.js";
import type { LedgerFilterState } from "./types.js";

type LedgerAdvancedFiltersProps = {
  filters: LedgerFilterState;
  filterCategories?: string[];
  onFiltersChanged?: (next: LedgerFilterState) => void;
};

type LedgerFiltersProps = {
  filters: LedgerFilterState;
  filterCategories?: string[];
  showAdvancedFilters?: boolean;
  setShowAdvancedFilters?: (value: boolean) => void;
  onFiltersChanged?: (next: LedgerFilterState) => void;
};

const LedgerAdvancedFilters = tag(({
  filters,
  filterCategories = [],
  onFiltersChanged = () => {},
}: LedgerAdvancedFiltersProps) => {
  LedgerAdvancedFilters.inputs((args) => {
    [{
      filters,
      filterCategories = [],
      onFiltersChanged = () => {},
    }] = args;

    onFiltersChanged = output(onFiltersChanged);
  });

  return div.class`ledger-filters-advanced`(
    select
      .value(() => filters.category)
      .onChange((event) => {
        const next = { ...filters, category: event.target.value };
        filters = next;
        onFiltersChanged(next);
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
        const next = { ...filters, startDate: event.target.value };
        filters = next;
        onFiltersChanged(next);
      }),
    input
      .type`date`
      .value(() => filters.endDate)
      .onChange((event) => {
        const next = { ...filters, endDate: event.target.value };
        filters = next;
        onFiltersChanged(next);
      })
  );
});

export const LedgerFilters = tag(({
  filters,
  filterCategories = [],
  showAdvancedFilters = false,
  setShowAdvancedFilters = () => {},
  onFiltersChanged = () => {},
}: LedgerFiltersProps) => {
  LedgerFilters.inputs((args) => {
    [{
      filters,
      filterCategories = [],
      showAdvancedFilters = false,
      setShowAdvancedFilters = () => {},
      onFiltersChanged = () => {},
    }] = args;

    setShowAdvancedFilters = output(setShowAdvancedFilters);
    onFiltersChanged = output(onFiltersChanged);
  });

  return div.class`ledger-filters`(
    div.class`ledger-filters-primary`(
      input
        .type`search`
        .placeholder`Search title or notes`
        .value(() => filters.search)
        .onInput((event) => {
          const next = { ...filters, search: event.target.value };
          filters = next;
          onFiltersChanged(next);
        }),
      select
        .value(() => filters.status)
        .onChange((event) => {
          const next = {
            ...filters,
            status: event.target.value as LedgerStatus,
          };
          filters = next;
          onFiltersChanged(next);
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
          onFiltersChanged({ ...filters });
        })(
        showAdvancedFilters ? "Fewer filters" : "More filters"
      )
    ),
    _=> showAdvancedFilters
      ? LedgerAdvancedFilters({ filters, filterCategories, onFiltersChanged })
      : null
  );
});
