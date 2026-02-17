import {
  tag,
  button,
  h2,
  output,
  dialog,
  div,
  onDestroy,
} from "taggedjs";
import { QrScannerPanel } from "./QrScanner.tag.js";

export const CodeScannerModal = tag(
  ({ title, onClose, onApply, applyLabel, ScannerPanel, name }) => {
    CodeScannerModal.inputs((args) => {
      const next = args?.[0] || {};
      ({ title, onClose, onApply, applyLabel, ScannerPanel, name } = next);
      
      if (typeof onClose === "function") {
        onClose = output(onClose);
      } else {
        onClose = () => {};
      }

      if (typeof onApply === "function") {
        onApply = output(onApply);
      } else {
        onApply = null;
      }
      if (typeof ScannerPanel !== "function") {
        ScannerPanel = QrScannerPanel;
      }
    });

    if (typeof ScannerPanel !== "function") {
      ScannerPanel = QrScannerPanel;
    }
    const dialogId = `${name}-${Math.random().toString(36).slice(2, 9)}`;

    const closeDialog = () => {
      const dialogEl = document.getElementById(dialogId);
      if (dialogEl?.close) {
        dialogEl.close();
      }

      // onClose();
    };

    onDestroy(() => {
      closeDialog()
      onClose()
    })

    let pendingText = "";

    const setPendingText = (text) => {
      pendingText = text || "";
      if (onApply) {
        onApply(pendingText);
      }
    };

    const applyAndClose = () => {
      if (onApply) {
        onApply(pendingText);
      }
      closeDialog();
    };

    const onBackdropClick = (event) => {
      if (event.target.nodeName === "DIALOG") {
        closeDialog();
      }
    };

    const onDialogClose = () => {
      onClose();
    };

    const onDialogCancel = (event) => {
      if (event?.preventDefault) {
        event.preventDefault();
      }
      closeDialog();
    };

    return dialog
      .id(dialogId)
      .class`qr-modal`
      .open(true)
      .onClick(onBackdropClick)
      .onClose(onDialogClose)
      .onCancel(onDialogCancel)(
      div.class`qr-modal-card`(
        div.class`qr-modal-header`(
          h2.class`qr-modal-title`(title),
          div.class`qr-modal-actions`(
            _=> pendingText &&
              button
                .type`button`
                .class`qr-modal-apply`
                .onClick(applyAndClose)(
                applyLabel || "Apply"
              ),
            button
              .type`button`
              .class`qr-modal-close`
              .attr("aria-label", "Close")
              .onClick(() => closeDialog())(
              "Close"
            )
          )
        ),
        div.class`qr-modal-body`(
          _=> ScannerPanel({
            onResult: setPendingText,
          })
        )
      )
    )
  });
