import { tag, div, h1, p, button, output } from "taggedjs";
import type { LedgerTotals } from "./types.js";

type LedgerHeaderProps = {
  totals?: LedgerTotals | null;
  onCalculateTotals?: () => void;
  onOpenCreateModal?: () => void;
  toDisplayNet?: (value: number) => string;
};

export const LedgerHeader = tag(({
  totals = null,
  onCalculateTotals = () => {},
  onOpenCreateModal = () => {},
  toDisplayNet = (value: number) => String(value),
}: LedgerHeaderProps = {}) => {
  LedgerHeader.inputs((args) => {
    [{
      totals = null,
      onCalculateTotals = () => {},
      onOpenCreateModal = () => {},
      toDisplayNet = (value: number) => String(value),
    }] = args;

    onCalculateTotals = output(onCalculateTotals);
    onOpenCreateModal = output(onOpenCreateModal);
  });

  return div.class`ledger-header`(
    div.class`ledger-heading`(
      h1("Ledger"),
      p("Track incoming and outgoing monies in one place.")
    ),
    div.class`ledger-header-actions`(
      button
        .type`button`
        .class`ghost-button`
        .onClick(onCalculateTotals)(
        "Calculate Totals"
      ),
      button
        .type`button`
        .class`add-button`
        .onClick((e) => {
          onOpenCreateModal(e)
        })(
        "+ Add Entry"
      ),
      _=> {
        if (totals === null) {
          return null;
        }

        return div.class`ledger-totals`(
          p.class`ledger-net-value`(
            `Reconciled total: ${toDisplayNet(totals.reconciledTotal)}`
          ),
          p.class`ledger-net-value`(
            `Posted total: ${toDisplayNet(totals.postedTotal)}`
          ),
          p.class`ledger-net-value`(
            `Pending total: ${toDisplayNet(totals.pendingTotal)}`
          )
        );
      }
    )
  );
});
