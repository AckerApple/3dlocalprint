import { tag, div, table, thead, tbody, tr, th, td, span, p, output } from "taggedjs";
import type { LedgerEntry } from "../../types/ledger.js";

type LedgerEntriesTableProps = {
  filteredEntries?: LedgerEntry[];
  onOpenEditModal?: (id: string) => void;
  toDisplayAmount?: (value: number) => string;
};

export const LedgerEntriesTable = tag(({
  filteredEntries = [],
  onOpenEditModal = () => {},
  toDisplayAmount = (value: number) => String(value),
}: LedgerEntriesTableProps = {}) => {
  LedgerEntriesTable.inputs((args) => {
    [{
      filteredEntries = [],
      onOpenEditModal = () => {},
      toDisplayAmount = (value: number) => String(value),
    }] = args;

    onOpenEditModal = output(onOpenEditModal);
  });

  return [
    div.class`ledger-table-block`(
      div.class`ledger-table-wrap`(
        table.class`ledger-table`(
          thead(
            tr(
              th("Applicable Date"),
              th("Title"),
              th("Account"),
              th("Category"),
              th("Status"),
              th("Amount")
            )
          ),
          tbody(
            _=> filteredEntries.map((entry) =>
              tr
                .class`ledger-row`
                .onClick(() => onOpenEditModal(entry.id))(
                td(entry.applicableDate || "—"),
                td(
                  span
                    .class`ledger-title-cell`
                    .attr("title", entry.title || "—")(
                    entry.title || "—"
                  )
                ),
                td(entry.moneyAccountTitle || "—"),
                td(entry.billingCategory || "—"),
                td(
                  span.class`pill ledger-status-pill ${
                    entry.status === "pending"
                      ? "ledger-status-pending"
                      : entry.status === "reconciled"
                        ? "ledger-status-reconciled"
                        : "ledger-status-posted"
                  }`(
                    entry.status || "posted"
                  )
                ),
                td(toDisplayAmount(entry.amount))
              ).key(entry.id)
            )
          )
        )
      ),
      p.class`ledger-table-hint`("tap any row for more details")
    ),
  ];
});
