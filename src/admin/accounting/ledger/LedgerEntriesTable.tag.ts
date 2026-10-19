import { tag, div, table, thead, tbody, tr, th, td, span, p, a, output } from "taggedjs";
import type { LedgerEntry } from "../../../types/ledger.js";

type LedgerEntriesTableProps = {
  filteredEntries?: LedgerEntry[];
  onOpenEditModal?: (id: string) => void;
  toDisplayAmount?: (value: number) => string;
};

const toNotesPreview = (value = "") => {
  const firstLine = String(value || "").split(/\r?\n/)[0]?.trim() || "";
  return firstLine.slice(0, 30);
};

const getOrderIds = (entry: LedgerEntry) => Array.from(new Set([
  ...(Array.isArray(entry.orderIds) ? entry.orderIds : []),
  entry.orderId,
].map((value) => String(value || "").trim()).filter(Boolean)));

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
              th("Created On"),
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
                  div.class`ledger-title-stack`(
                    span
                      .class`ledger-title-cell`
                      .title(_=> entry.title || "—")(
                      _=> entry.title || "—"
                    ),
                    _=> {
                      const notesPreview = toNotesPreview(entry.notes);
                      return notesPreview
                        ? p
                            .class`ledger-notes-preview`
                            .title(() => entry.notes || "")(notesPreview)
                        : null;
                    },
                    _=> getOrderIds(entry).map((orderId) =>
                      a.class`orders-detail-line-admin-link`
                        .href(`../orders/index.html?orderId=${encodeURIComponent(orderId)}`)
                        .onClick((event) => event.stopPropagation())(`🛎️ Order ${orderId}`)
                    )
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
                  div.class`ledger-amount-stack`(
                    span.class(_=> `ledger-amount-value ${
                      entry.amount > 0
                        ? "ledger-amount-positive"
                        : entry.amount < 0
                          ? "ledger-amount-negative"
                          : ""
                    }`.trim())(
                      _=> toDisplayAmount(entry.amount)
                    ),
                    _=> {
                      const tax = Number(entry.salesTaxLiability) || 0;
                      return tax
                        ? p.class`ledger-tax-preview`(_=> `tax ${toDisplayAmount(tax)}`)
                        : null;
                    },
                    _=> {
                      const fees = Number(entry.processingFees) || 0;
                      return fees
                        ? p.class`ledger-tax-preview`(_=> `fees ${toDisplayAmount(fees)}`)
                        : null;
                    }
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
