import { tag, div, input, button, output } from "taggedjs";
import { extractBarcodeToken } from "./barcode-utils.js";
import { CodeScannerModal } from "./CodeScannerModal.tag.js";
import { BarcodeScannerPanel } from "./BarcodeScanner.tag.js";

const BARCODE_FILTER_FORMATS = [
  "code_128",
  "code_39",
  "code_93",
  "ean_13",
  "ean_8",
  "itf",
  "upc_a",
  "upc_e",
];

type BarcodeFilterControlProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  scanButtonLabel?: string;
  scannerTitle?: string;
  scannerName?: string;
  applyLabel?: string;
};

export const BarcodeFilterControl = tag(({
  value = "",
  onChange,
  placeholder = "Filter by barcode",
  scanButtonLabel = "Scan barcode filter",
  scannerTitle = "Scan barcode filter",
  scannerName = "bc-filter-scanner",
  applyLabel = "Apply barcode filter",
}: BarcodeFilterControlProps = {}) => {
  BarcodeFilterControl.inputs((args) => {
    [{
      value = "",
      onChange,
      placeholder = "Filter by barcode",
      scanButtonLabel = "Scan barcode filter",
      scannerTitle = "Scan barcode filter",
      scannerName = "bc-filter-scanner",
      applyLabel = "Apply barcode filter",
    } = {}] = args;
    onChange = output(onChange);
  });

  let isScannerOpen = false;

  const setValue = (nextValue = "") => {
    if (typeof onChange === "function") {
      onChange(String(nextValue || "").trim());
    }
  };

  const applyScan = (text = "") => {
    const token = extractBarcodeToken(text || "");
    const normalized = (token || text || "").trim();
    if (!normalized) return;
    setValue(normalized);
    isScannerOpen = false;
  };

  return div.class`barcode-filter-control`(
    input
      .value(() => value ?? "")
      .onInput((event) => {
        setValue(event?.target?.value || "");
      })
      .attr("placeholder", placeholder)(),
    button
      .type`button`
      .class`ghost-button`
      .onClick(() => {
        isScannerOpen = true;
      })(
      scanButtonLabel
    ),
    _=> isScannerOpen &&
      CodeScannerModal({
        name: scannerName,
        title: scannerTitle,
        onClose: () => {
          isScannerOpen = false;
        },
        onApply: applyScan,
        applyLabel,
        ScannerPanel: ({ onResult }) =>
          BarcodeScannerPanel({
            onResult,
            formats: BARCODE_FILTER_FORMATS,
          }),
      })
  );
});
