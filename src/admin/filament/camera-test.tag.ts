import {
  tag,
  tagElement,
  section,
  div,
  h1,
  p,
  button,
  strong,
  select,
  option,
  array,
  subscribe,
} from "taggedjs";
import { BarcodeScannerPanel } from "../shared/BarcodeScanner.tag.js";
import { AdminNav } from "../shared/AdminNav.tag.js";
import { replaceMountRoot } from "../shared/ssoMount.js";
import { startAdminAppShell } from "../shared/adminAppShell.js";
import { toast } from "../shared/toast.js";

type ScanRecord = {
  value: string;
  format?: string;
  at: number;
};

let app = document.getElementById("cameraTestApp");
const appRoot = { current: app };
const scans$ = array([] as ScanRecord[]);
let appMounted = false;
let currentUser = null;
let handleSignOut = () => Promise.resolve();
let scannerEngine: "native" | "zxing" =
  typeof window !== "undefined" &&
  typeof (window as Window & { BarcodeDetector?: unknown }).BarcodeDetector ===
    "function"
    ? "native"
    : "zxing";
let showScanner = true;
let scannerMountVersion = 0;

const addScan = (value: string) => {
  const normalized = String(value || "").trim();
  if (!normalized) return;
  scans$.unshift({
    value: normalized,
    at: Date.now(),
  });
  if (scans$.length > 30) {
    scans$.splice(30, scans$.length - 30);
  }
};

const clearScans = () => {
  scans$.splice(0, scans$.length);
};

const formatTime = (timestamp: number) =>
  new Date(timestamp).toLocaleString();

const onBarcodeResult = (value: string) => {
  addScan(value);
}

export const CameraTestApp = tag(() => [
  AdminNav(handleSignOut, currentUser),
  section.class`panel`(
    h1("📷 Camera Test"),
    p("Use this page to practice barcode scanning and inspect scanner debug details."),
    div.class`meta`(
      div.class`controls`(
        div.class`controls-group`(
          select
            .value(_=> scannerEngine)
            .onChange((event) => {
              const nextValue = String(event?.target?.value || "");
              scannerEngine = nextValue === "zxing" ? "zxing" : "native";
              scannerMountVersion += 1;
            })(
            option.value`native`("Native scanner"),
            option.value`zxing`("ZXing scanner")
          ),
          button
            .type`button`
            .class`ghost-button`
            .onClick(() => {
              showScanner = !showScanner;
              if (showScanner) {
                scannerMountVersion += 1;
              }
            })(
            _=> showScanner ? "Stop camera" : "Start camera"
          ),
          button
            .type`button`
            .class`ghost-button`
            .disabled(_=> scans$.length === 0)
            .onClick(clearScans)(
            "Clear scan history"
          ),
          div.id`count`(_=> `${scans$.length} scans`)
        )
      )
    ),
    section.class`panel`(
      _=> showScanner
        ? div(
            scannerEngine === "zxing"
              ? BarcodeScannerPanel({
                  onResult: onBarcodeResult,
                  engine: "zxing",
                  showDiagnostics: true,
                })
              : BarcodeScannerPanel({
                  onResult: onBarcodeResult,
                  engine: "native",
                  showDiagnostics: true,
                })
          )
        : p.class`ledger-empty`("Camera stopped. Click Start camera to resume.")
    ),
    section.class`panel`(
      p("Recent scans"),
      div.class`camera-test-list`(
        subscribe(scans$, (items) => {
          if (!items.length) {
            return p.class`ledger-empty`("No scans yet.");
          }
          return items.map((item, index) =>
            div.class`camera-test-row`(
              div.class`camera-test-row-index`(_=> `#${index + 1}`),
              div.class`camera-test-row-main`(
                strong(_=> item.value),
                div.class`camera-test-row-meta`(
                  div(_=> formatTime(item.at))
                )
              )
            ).key(`${item.value}-${item.at}-${index}`)
          );
        })
      )
    )
  ),
]);

const mountApp = () => {
  if (!appRoot.current || appMounted) {
    return;
  }
  const nextRoot = replaceMountRoot(appRoot);
  if (!nextRoot) return;
  nextRoot.replaceChildren();
  tagElement(CameraTestApp, nextRoot);
  appMounted = true;
  app = appRoot.current;
};

const auth = startAdminAppShell({
  rootRef: appRoot,
  toast,
  setAppMounted: (value) => {
    appMounted = value;
  },
  setCurrentUser: (value) => {
    currentUser = value;
  },
  onAfterSsoMount: () => {
    app = appRoot.current;
  },
  onAuthorized: () => {
    mountApp();
  },
});

handleSignOut = auth.handleSignOut;
