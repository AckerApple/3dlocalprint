import { tag, div, h1, p, button, output } from "taggedjs";

type LedgerHeaderProps = {
  onOpenCreateModal?: () => void;
};

export const LedgerHeader = tag(({
  onOpenCreateModal = () => {},
}: LedgerHeaderProps = {}) => {
  LedgerHeader.inputs((args) => {
    [{
      onOpenCreateModal = () => {},
    }] = args;

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
        .class`add-button`
        .onClick((e) => {
          onOpenCreateModal(e)
        })(
        "+ Add Entry"
      )
    )
  );
});
