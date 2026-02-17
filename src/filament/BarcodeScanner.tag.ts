import {
  tag,
  div,
  pre,
  span,
  onDestroy,
  htmlTag,
  output,
} from "taggedjs";

type BarcodeScannerProps = {
  onResult?: (value: string) => void;
  formats?: string[];
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

export const BarcodeScannerPanel = tag(
  ({ onResult, formats }: BarcodeScannerProps = {}) => {
  
  BarcodeScannerPanel.inputs((args: [BarcodeScannerProps?]) => {
    const [next = {}] = args;
    ({ onResult, formats } = next);
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
  let stream: MediaStream | null = null;
  let rafId: number | null = null;
  const previewId = `barcodePreview-${Math.random().toString(36).slice(2, 9)}`;

  const setStatus = (message: string) => {
    console.log("[barcode] status:", message);
    status = message;
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
    detector = null;
    setStatus("Camera stopped.");
  };

  const onDetected = tag.callback((value: string) => {
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
          const rawValue = result.rawValue || "";
          const format = result.format || "";
          if (rawValue) {
            onDetected(rawValue);
          }
          setOutput(rawValue || "(no data)", format);
          setStatus("Barcode detected.");
        } else {
          setStatus("Scanning...");
        }
      }
    } catch (error) {
      const stack = new Error("Barcode scan loop error").stack;
      console.error("[barcode] scan loop stack trace", stack);
      setStatus(`Scan error: ${getErrorMessage(error)}`);
    }

    rafId = requestAnimationFrame(() => scanLoop(preview));
  };

  const startScanner = async () => {
    const BarcodeDetector = (
      window as Window & { BarcodeDetector?: BarcodeDetectorCtor }
    ).BarcodeDetector;
    if (!BarcodeDetector) {
      setStatus("BarcodeDetector API is not supported in this browser.");
      return;
    }

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
      setStatus(`Camera error: ${getErrorMessage(error)}`);
      stopScanner();
    }
  };

  onDestroy(() => {
    stopScanner();
    console.log("🔴 stop barcode scanner tag destroyed");
  });

  tag.promise = startScanner();

  const formatLabel = () => {
    if (!lastText) return "";
    if (!lastFormat) return lastText;
    return `${lastText}\n\nformat: ${lastFormat}`;
  };

  return div(
    { class: "qr-panel" },
    div(
      { class: "qr-preview" },
      video({
        id: previewId,
        playsInline: true,
        muted: true,
      })
    ),
    div(
      { class: "qr-output" },
      span({ class: "qr-label" }, "Barcode Data"),
      pre({ class: "qr-text" }, _ => formatLabel() || "(no scan yet)")
    ),
    div({ class: "qr-status" }, _ => status)
  );
});
