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
                td(_=> entry.applicableDate || "—"),
                td(
                  span
                    .class`ledger-title-cell`
                    .title(_=> entry.title || "—")(
                    _=> entry.title || "—"
                  )
                ),
                td(_=> entry.billingCategory || "—"),
                td(
                  span.class(_=> `pill ledger-status-pill ${
                    entry.status === "pending"
                      ? "ledger-status-pending"
                      : entry.status === "reconciled"
                        ? "ledger-status-reconciled"
                        : "ledger-status-posted"
                  }`)(
                    _=> entry.status || "posted"
                  )
                ),
                td(
                  span.class(_=> `ledger-amount-value ${
                    entry.amount > 0
                      ? "ledger-amount-positive"
                      : entry.amount < 0
                        ? "ledger-amount-negative"
                        : ""
                  }`.trim())(
                    _=> toDisplayAmount(entry.amount)
                  )
                )
              ).key(entry.id)
            )
          )
        )
      ),
      p.class`ledger-table-hint`("tap any row for more details")
    ),
  ];
});
