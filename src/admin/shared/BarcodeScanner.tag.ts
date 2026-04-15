import {
  tag,
  div,
  pre,
  span,
  input,
  button,
  onDestroy,
  htmlTag,
  output,
} from "taggedjs";
import { BrowserMultiFormatReader } from "@zxing/browser";

type BarcodeScannerProps = {
  onResult?: (value: string) => void;
  formats?: string[];
  engine?: "auto" | "native" | "zxing";
  showDiagnostics?: boolean;
  minScanIntervalMs?: number;
};

type DetectedBarcode = {
  rawValue?: string;
  format?: string;
};

type BarcodeDetectorLike = {
  detect(source: HTMLVideoElement): Promise<DetectedBarcode[]>;
};

type BarcodeDetectorCtor = new (options: {
  formats: string[];
}) => BarcodeDetectorLike;

const video = htmlTag("video");
const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : String(error);
const getErrorDetails = (error: unknown) => {
  if (!error) return "";
  if (error instanceof DOMException) {
    return `${error.name}: ${error.message}`;
  }
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }
  return String(error);
};
const normalizeDetectedValue = (value: unknown) =>
  String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim();
const isNonFatalZxingNoResultError = (error: unknown) => {
  if (!error) return false;
  const name = error instanceof Error ? error.name : "";
  const message = getErrorMessage(error).toLowerCase();
  return (
    name === "NotFoundException" ||
    message.includes("not found") ||
    message.includes("no multiformat readers were able to detect the code")
  );
};

export const BarcodeScannerPanel = tag(
  ({
    onResult,
    formats,
    engine = "auto",
    showDiagnostics = false,
    minScanIntervalMs = 400,
  }: BarcodeScannerProps = {}) => {
  
  BarcodeScannerPanel.inputs((args: [BarcodeScannerProps?]) => {
    const [next = {}] = args;
    ({
      onResult,
      formats,
      engine = "auto",
      showDiagnostics = false,
      minScanIntervalMs = 400,
    } = next);
    onResult = output(onResult)
  });

  const activeFormats =
    Array.isArray(formats) && formats.length
      ? formats
      : [
          "code_128",
          "code_39",
          "code_93",
          "ean_13",
          "ean_8",
          "itf",
          "upc_a",
          "upc_e",
          "qr_code",
        ];

  let status = "Idle.";
  let lastText = "";
  let lastFormat = "";
  let detector: BarcodeDetectorLike | null = null;
  let zxingReader: BrowserMultiFormatReader | null = null;
  let zxingControls: { stop: () => void } | null = null;
  let stream: MediaStream | null = null;
  let rafId: number | null = null;
  let supportsCameraScanner = true;
  let activeScannerEngine = "native";
  let manualValue = "";
  let debugDetails = "";
  let lastDetectedAt = 0;
  const previewId = `barcodePreview-${Math.random().toString(36).slice(2, 9)}`;

  const setStatus = (message: string) => {
    status = message;
  };

  const setDebugDetails = (details = "") => {
    debugDetails = String(details || "").trim();
  };

  const setOutput = (text = "", format = "") => {
    lastText = text || "";
    lastFormat = format || "";
  };

  const stopScanner = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
    }
    if (zxingControls) {
      zxingControls.stop();
      zxingControls = null;
    }
    if (zxingReader) {
      zxingReader.reset();
      zxingReader = null;
    }
    detector = null;
    setStatus("Camera stopped.");
  };

  const onDetected = tag.callback((value: string) => {
    const now = Date.now();
    if (now - lastDetectedAt < Math.max(0, Number(minScanIntervalMs) || 0)) {
      return;
    }
    lastDetectedAt = now;
    try {
      onResult(value);
    } catch (error) {
      console.error("[barcode] onResult failed", error);
    }
  })

  const scanLoop = async (preview: HTMLVideoElement) => {
    if (!detector || !stream) {
      return;
    }

    try {
      if (preview.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
        const results = await detector.detect(preview);
        if (results.length > 0) {
          const [result] = results;
          const rawValue = normalizeDetectedValue(result.rawValue);
          const format = result.format || "";
          if (rawValue) {
            onDetected(rawValue);
          }
          setOutput(rawValue || "(no data)", format);
          setDebugDetails("");
          setStatus("Barcode detected.");
        } else {
          setStatus("Scanning...");
        }
      }
    } catch (error) {
      const stack = new Error("Barcode scan loop error").stack;
      console.error("[barcode] scan loop stack trace", stack);
      setDebugDetails(getErrorDetails(error));
      setStatus(`Scan error: ${getErrorMessage(error)}`);
    }

    rafId = requestAnimationFrame(() => scanLoop(preview));
  };

  const startScanner = async () => {
    const BarcodeDetector = (
      window as Window & { BarcodeDetector?: BarcodeDetectorCtor }
    ).BarcodeDetector;

    try {
      setStatus("Requesting camera access...");
      const preview = await new Promise<HTMLVideoElement | null>((resolve) => {
        let attempts = 0;
        const tick = () => {
          const element = document.getElementById(previewId);
          if (element instanceof HTMLVideoElement) {
            return resolve(element);
          }
          attempts += 1;
          if (attempts > 60) {
            return resolve(null);
          }
          requestAnimationFrame(tick);
        };
        tick();
      });

      if (!preview) {
        setStatus("Barcode preview not ready.");
        return;
      }

      const shouldUseZxing = engine === "zxing" || !BarcodeDetector;

      if (shouldUseZxing) {
        activeScannerEngine = "zxing";
        if (!BarcodeDetector) {
          setDebugDetails(`BarcodeDetector missing in this browser.\nUser-Agent: ${navigator.userAgent || "unknown"}`);
        } else if (engine === "zxing") {
          setDebugDetails("ZXing scanner selected manually.");
        }
        setStatus("Using ZXing fallback scanner...");
        zxingReader = new BrowserMultiFormatReader();
        zxingControls = await zxingReader.decodeFromVideoDevice(
          undefined,
          preview,
          (result, error) => {
            if (result) {
              const rawValue = normalizeDetectedValue(result.getText());
              const format = String(result.getBarcodeFormat() || "").toLowerCase();
              if (rawValue) {
                onDetected(rawValue);
              }
              setOutput(rawValue || "(no data)", format);
              setDebugDetails("");
              setStatus("Barcode detected.");
              return;
            }
            if (error) {
              if (!isNonFatalZxingNoResultError(error)) {
                setDebugDetails(getErrorDetails(error));
                setStatus(`Scan error: ${getErrorMessage(error)}`);
              } else if (!lastText) {
                setStatus("Scanning...");
              }
            }
          }
        );
        setStatus("Scanning...");
        return;
      }

      activeScannerEngine = "native";
      detector = new BarcodeDetector({
        formats: activeFormats,
      });

      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
        audio: false,
      });

      preview.srcObject = stream;
      await preview.play();
      setStatus("Scanning...");
      void scanLoop(preview);
    } catch (error) {
      console.error("[barcode] camera error:", error);
      setDebugDetails(getErrorDetails(error));
      setStatus(`Camera error: ${getErrorMessage(error)} (fallback to manual input)`);
      supportsCameraScanner = false;
      stopScanner();
    }
  };

  onDestroy(() => {
    stopScanner()
  })

  tag.promise = startScanner()

  const applyManualValue = () => {
    const value = String(manualValue || "").trim()
    if (!value) return
    setOutput(value, "manual")
    onDetected(value)
    setDebugDetails("")
    setStatus("Manual barcode applied.")
  };

  return div.class`qr-panel`(
    _=> supportsCameraScanner
      ? div.class`qr-preview`(
          video
            .attr("id", previewId)
            .attr("playsinline", true)
            .attr("muted", true)()
        )
      : div.class`qr-output`(
          span.class`qr-label`("Manual Barcode Entry"),
          input
            .value(_=> manualValue)
            .placeholder`Type or paste barcode value`
            .onInput((event) => {
              manualValue = event?.target?.value || "";
            })(),
          button
            .type`button`
            .class`ghost-button`
            .onClick(applyManualValue)(
            "Use barcode"
          )
        ),
    _=> showDiagnostics
      ? div.class`qr-output`(
          span.class`qr-label`("Barcode Data"),
          pre.class`qr-text`(_=> {
            if (!lastText) return "(no scan yet)";
            if (!lastFormat) return lastText;
            return `${lastText}\n\nformat: ${lastFormat}`;
          })
        )
      : null,
    _=> showDiagnostics
      ? div.class`qr-output`(
          span.class`qr-label`("Scanner Engine"),
          pre.class`qr-text`(_=> activeScannerEngine)
        )
      : null,
    _=> showDiagnostics && debugDetails
      ? div.class`qr-output`(
          span.class`qr-label`("Scanner Debug Details"),
          pre.class`qr-text`(_=> debugDetails)
        )
      : null,
    div.class`qr-status`(_ => status)
  );
});
