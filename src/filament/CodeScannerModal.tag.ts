import {
  tag,
  button,
  output,
  div,
} from "taggedjs";
import { Modal } from "./Modal.tag.js";
import { QrScannerPanel } from "./QrScanner.tag.js";

export const CodeScannerModal = tag(
  ({ title, onClose, onApply, applyLabel, ScannerPanel }) => {
    CodeScannerModal.inputs((args) => {
      const next = args?.[0] || {};
      ({ title, onClose, onApply, applyLabel, ScannerPanel } = next);
      
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
      onClose();
    };

    return Modal({
      modalOpen: true,
      title,
      className: "qr-modal",
      cardClassName: "qr-modal-card",
      onClose,
      headerActions: () =>
        pendingText
          ? button
              .type`button`
              .class`qr-modal-apply`
              .onClick(applyAndClose)(
              applyLabel || "Apply"
            )
          : null,
      content: () =>
        div.class`qr-modal-body`(
          _=> ScannerPanel({
            onResult: setPendingText,
          })
        ),
    });
  });
