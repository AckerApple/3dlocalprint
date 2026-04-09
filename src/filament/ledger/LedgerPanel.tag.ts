import { output, tag, section, p, div, h3, button } from "taggedjs";
import type { LedgerEntry, MoneyAccount } from "../../types/ledger.js";
import { LedgerHeader } from "./LedgerHeader.tag.js";
import { LedgerFilters } from "./LedgerFilters.tag.js";
import { LedgerEntriesTable } from "./LedgerEntriesTable.tag.js";
import type { LedgerFilterState, LedgerTotals } from "./types.js";

type LedgerPanelProps = {
  entries?: LedgerEntry[];
  filteredEntries?: LedgerEntry[];
  moneyAccounts?: MoneyAccount[];
  filterCategories?: string[];
  filters: LedgerFilterState;
  showAdvancedFilters?: boolean;
  setShowAdvancedFilters?: (value: boolean) => void;
  onFiltersChanged?: (next: LedgerFilterState) => void;
  accountTotals?: Record<string, LedgerTotals>;
  onCalculateAccountTotals?: (accountTitle: string, entries: LedgerEntry[]) => void;
  onOpenCreateModalForAccount?: (accountTitle: string) => void;
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
  moneyAccounts = [],
  filterCategories = [],
  filters = defaultFilters,
  showAdvancedFilters = false,
  setShowAdvancedFilters = () => {},
  onFiltersChanged = () => {},
  accountTotals = {},
  onCalculateAccountTotals = () => {},
  onOpenCreateModalForAccount = () => {},
  openCreateModal = () => {},
  openEditModal = () => {},
  toDisplayAmount = (value: number) => String(value),
  toDisplayNet = (value: number) => String(value),
  renderModal = () => null,
  isLoading = false,
}: LedgerPanelProps) => {
  LedgerPanel.inputs((args) => {
    [{
      entries = [],
      filteredEntries = [],
      moneyAccounts = [],
      filterCategories = [],
      filters = defaultFilters,
      showAdvancedFilters = false,
      setShowAdvancedFilters = () => {},
      onFiltersChanged = () => {},
      accountTotals = {},
      onCalculateAccountTotals = () => {},
      onOpenCreateModalForAccount = () => {},
      openCreateModal = () => {},
      openEditModal = () => {},
      toDisplayAmount = (value: number) => String(value),
      toDisplayNet = (value: number) => String(value),
      renderModal = () => null,
      isLoading = false,
    }] = args;

    openCreateModal = output(openCreateModal)
    onFiltersChanged = output(onFiltersChanged)
    onCalculateAccountTotals = output(onCalculateAccountTotals)
    onOpenCreateModalForAccount = output(onOpenCreateModalForAccount)
  });

  return [
    section.class`panel ledger-panel`(
      _=> LedgerHeader({
        onOpenCreateModal: openCreateModal,
      }),
      
      _=> LedgerFilters({
        filters,
        filterCategories,
        showAdvancedFilters,
        setShowAdvancedFilters,
        onFiltersChanged,
      }),

      _=> {
        if (isLoading) {
          return p("Loading...");
        }

        if (filteredEntries.length === 0) {
          return p.class`ledger-empty`("No entries found. Add your first entry.");
        }

        const accountSections = [...(Array.isArray(moneyAccounts) ? moneyAccounts : [])]
          .sort((a, b) =>
            String(a?.title || "").localeCompare(String(b?.title || ""))
          )
          .map((account) => {
            const title = String(account?.title || "").trim();
            return {
              key: account?.id || title,
              title,
              entries: filteredEntries.filter(
                (entry) => entry.moneyAccountTitle === title
              ),
            };
          })
          .filter((section) => section.title && section.entries.length > 0);

        if (accountSections.length === 0) {
          return p.class`ledger-empty`("No entries found for available accounts.");
        }

        return div.class`ledger-account-sections`(
          ...accountSections.map((section) =>
            div.class`ledger-account-section`(
              div.class`ledger-account-header`(
                h3.class`ledger-account-title`(section.title),
                div.class`ledger-account-actions`(
                  button
                    .type`button`
                    .class(_=> `ghost-button ledger-totals-toggle${accountTotals[section.title] ? " is-active" : ""}`)
                    .attr("aria-pressed", _=> accountTotals[section.title] ? "true" : "false")
                    .onClick(() => onCalculateAccountTotals(section.title, section.entries))(
                    "🧮 Totals"
                  ),
                  button
                    .type`button`
                    .class`ghost-button ledger-account-add`
                    .attr("aria-label", _=> `Add entry for ${section.title}`)
                    .onClick(() => onOpenCreateModalForAccount(section.title))(
                    "➕"
                  )
                )
              ),
              _=> {
                const totals = accountTotals[section.title];
                if (!totals) return null;

                return div.class`ledger-totals`(
                  p.class`ledger-net-value`(
                    `Gross positive: ${toDisplayNet(totals.grossPositiveTotal)}`
                  ),
                  p.class`ledger-net-value`(
                    `Gross negative: ${toDisplayNet(totals.grossNegativeTotal)}`
                  ),
                  p.class`ledger-net-value`(
                    `Reconciled total: ${toDisplayNet(totals.reconciledTotal)}`
                  ),
                  p.class`ledger-net-value`(
                    `Posted total: ${toDisplayNet(totals.postedTotal)}`
                  ),
                  p.class`ledger-net-value`(
                    `Pending amounts: ${toDisplayNet(totals.pendingAmountsTotal)}`
                  ),
                  p.class`ledger-net-value`(
                    `Pending total: ${toDisplayNet(totals.pendingTotal)}`
                  )
                );
              },
              LedgerEntriesTable({
                filteredEntries: section.entries,
                onOpenEditModal: openEditModal,
                toDisplayAmount,
              })
            ).key(section.key)
          )
        );
      },
    ),
    _=> renderModal(entries),
  ];
});
