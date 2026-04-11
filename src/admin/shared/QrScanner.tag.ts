import QrScanner from "qr-scanner";
import {
  tag,
  callback,
  div,
  pre,
  span,
  output,
  onInit,
  htmlTag,
} from "taggedjs";

QrScanner.WORKER_PATH = new URL(
  "qr-scanner/qr-scanner-worker.min.js",
  import.meta.url
).toString();

const video = htmlTag("video");

export const QrScannerPanel = tag(({onResult}) => {
  QrScannerPanel.inputs((args) => {
    [{onResult}] = args;
    onResult = output(onResult);
  });

  let scanner: any = null;
  let status = "Idle.";
  let lastText = "";
  const previewId = `qrPreview-${Math.random().toString(36).slice(2, 9)}`;

  const setStatus = (message: string) => {
    status = message;
  };

  const stopScanner = () => {
    if (!scanner) return;

    scanner.stop();
    scanner.destroy();
    scanner = null;
    setStatus("Camera stopped.");
  };

  const onDecoded = callback((result) => {
    lastText = result?.data || "";
    setStatus("QR detected.");
    onResult(lastText);
  })

  const startScanner = async () => {
    try {
      setStatus("Requesting camera access...");
      const preview = await new Promise((resolve, reject) => {
        let attempts = 0;
        const tick = () => {
          const element = document.getElementById(previewId);
          if (element) {
            return resolve(element);
          }
          attempts += 1;
          if (attempts > 30) {
            return reject(new Error("QR preview element not found"));
          }
          requestAnimationFrame(tick);
        };
        tick();
      });

      scanner = new QrScanner(
        preview,
        onDecoded,
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: "environment",
        }
      );

      await scanner.start();

      setStatus("Scanning...");
    } catch (error: any) {
      console.error("[qr] camera error:", error);
      setStatus(`Camera error: ${error.message || error}`);
    }
  };

  tag.onDestroy(() => {
    stopScanner()
  });
  
  onInit(() => {
    startScanner();
  });

  return div.class`qr-panel`(
    div.class`qr-preview`(
      video
        .id(previewId)
        .attr("playsInline", true)
        .attr("muted", true)()
    ),
    div.class`qr-output`(
      span.class`qr-label`("QR Text"),
      pre.class`qr-text`(() => lastText || "(no scan yet)")
    ),
    div.class`qr-status`(() => status)
  );
});
