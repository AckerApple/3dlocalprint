import { taxPresentation } from "../firebase-hosting/functions/src/orderTax.js";
import { createReceiptLoader } from "./receipt-loading.js";
import { clearCart } from "./cart-store.js";
import { fetchApiWithFallback } from "./api-url.js";
import { loadProducts } from "./admin/shared/firebase.js";
import {
  tag,
  tagElement,
  section,
  div,
  h2,
  h3,
  p,
  a,
  strong,
  span,
  button,
} from "taggedjs";


const root = document.getElementById("receiptRoot");
const params = new URLSearchParams(window.location.search);
const orderId = String(params.get("order_id") || "").trim();
const sessionId = String(params.get("session_id") || "").trim();
let receiptActive = true;
let receiptEmail = "";
let receiptPhase = "loading";
let receiptMessage = "Loading receipt details…";
type ReceiptLineItem = {
  productId?: string;
  title?: string;
  quantity?: number;
  unitAmount?: number;
  amountTotal?: number;
  currency?: string;
};
type ReceiptOrderSummary = {
  status?: string;
  taxBehavior?: string;
  lineItems?: ReceiptLineItem[];
  amountSubtotal?: number;
  amountTax?: number;
  amountShipping?: number;
  amountTotal?: number;
  currency?: string;
};
let receiptOrder: ReceiptOrderSummary | null = null;
const receiptProductSlugs = new Map<string, string>();
const receiptProductTitleSlugs = new Map<string, string | null>();


if (orderId) {
  clearCart();
}

const refreshReceipt = () => {
  if (!receiptActive || !root?.isConnected) return;
  mountReceipt();
};

const normalizeProductTitle = (value = "") =>
  String(value || "").trim().toLocaleLowerCase().replace(/\s+/g, " ");

const loadReceiptProductLinks = async () => {
  try {
    const products = await loadProducts();
    (Array.isArray(products) ? products : [])
      .filter((product) => Boolean(product?.active))
      .forEach((product) => {
        const productId = String(product?.id || "").trim();
        const slug = String(product?.slug || productId).trim();
        const normalizedTitle = normalizeProductTitle(product?.title);
        if (productId && slug) {
          receiptProductSlugs.set(productId, slug);
        }
        if (normalizedTitle && slug) {
          receiptProductTitleSlugs.set(
            normalizedTitle,
            receiptProductTitleSlugs.has(normalizedTitle) ? null : slug
          );
        }
      });
    refreshReceipt();
  } catch (error) {
    console.warn("Failed to load receipt product links", error);
  }
};

const getEmailFromPublicOrderUrl = (publicOrderUrl = "") => {
  try {
    return String(new URL(publicOrderUrl).searchParams.get("email") || "").trim();
  } catch {
    return "";
  }
};

const receiptLoader = createReceiptLoader({
  fetchDetails: async () => {
    if (!orderId || !sessionId) throw Object.assign(new Error("Missing receipt link"), { permanent: true });
    const requestParams = new URLSearchParams({ orderId, sessionId });
    const response = await fetchApiWithFallback(
      `/api/public/order-receipt-link?${requestParams.toString()}`,
      "getPublicOrderReceiptLink", { cache: "no-store" }
    );
    if (!response.ok) throw Object.assign(new Error("Receipt unavailable"), { permanent: [400, 401, 403].includes(response.status) });
    const payload = await response.json();
    const email = String(payload?.customerEmail || "").trim() || getEmailFromPublicOrderUrl(String(payload?.publicOrderUrl || ""));
    let order = payload?.order || null;
    if (!order && email) {
      const lookup = new URLSearchParams({ orderId, email });
      const details = await fetchApiWithFallback(`/api/public/order?${lookup}`, "getPublicOrder", { cache: "no-store" });
      if (!details.ok) throw new Error("Receipt details unavailable");
      order = (await details.json())?.order || null;
    }
    return { email, order };
  },
  update: (state) => {
    receiptPhase = state.phase;
    receiptMessage = state.message || "Loading receipt details…";
    if (state.email !== undefined) receiptEmail = state.email;
    if (state.order !== undefined) receiptOrder = state.order;
    refreshReceipt();
  },
});

const ReceiptContent = () =>
  [
    section.class`home-card receipt-card public-order-card`(
      div.class`receipt-status-pill`(receiptOrder?.status === "paid" ? "Payment received" : receiptPhase === "error" ? "Payment not confirmed" : "Confirming payment"),
      h2("Receipt"),
      orderId
        ? div.class`receipt-order-number`(
            span("Order number"),
            strong(orderId)
          )
        : div.class`receipt-order-number receipt-order-number-missing`(
            span("Order number"),
            strong("Unavailable")
          ),
      receiptEmail
        ? p.class`receipt-email-sent`(
            "Receipt email sent to: ",
            strong(receiptEmail)
          )
        : null,
      div.class`home-products-loading`(
        div.class`home-products-spinner`().attr("aria-hidden", "true").attr("style", receiptPhase === "error" ? "display:none" : ""),
        p(receiptMessage),
        button.type("button").onClick(() => { void Promise.resolve().then(() => receiptLoader.start()); })("Try again").attr("style", receiptPhase === "error" ? "" : "display:none")
      ).attr("style", receiptPhase === "ready" ? "display:none" : "").attr("role", receiptPhase === "ready" ? "none" : receiptPhase === "error" ? "alert" : "status").attr("aria-live", "polite"),
      ReceiptItems(receiptOrder)
    ),
    section.class`receipt-service-suggestions`(
      div.class`receipt-service-divider`,
      h3("Be sure to try these services"),
      div.class`receipt-actions receipt-page-actions`(
        a.class`ghost-button`.href("./products.html")("Products"),
        a.class`add-button`.href("./print-model-link.html")("🔗 Print By Link")
      )
    ),
  ];

const formatMoney = (amount = 0, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "usd",
  }).format((Number(amount) || 0) / 100);

const ReceiptItems = (order: ReceiptOrderSummary | null) => {
  const items = Array.isArray(order?.lineItems) ? order.lineItems : [];
  if (!items.length) return null;
  const tax = taxPresentation(order || {});
  const currency = String(order?.currency || items[0]?.currency || "usd");
  const lineTotal = (item: ReceiptLineItem) =>
    Number(item.amountTotal) || ((Number(item.unitAmount) || 0) * (Number(item.quantity) || 0));
  const lineLabel = (item: ReceiptLineItem) => {
    const label = `${item.title || "Item"} x ${Number(item.quantity) || 0}`;
    const slug =
      receiptProductSlugs.get(String(item.productId || "").trim()) ||
      receiptProductTitleSlugs.get(normalizeProductTitle(item.title)) ||
      "";
    return slug
      ? a.class`receipt-product-link`.href(`./product/${encodeURIComponent(slug)}`)(label)
      : span(label);
  };
  return div.class`public-order-section receipt-items-section`(
    h3("Items"),
    div.class`public-order-lines`(
      items.map((item, index) =>
        div.class`public-order-line`(
          lineLabel(item),
          strong(formatMoney(lineTotal(item), String(item.currency || currency)))
        ).key(`${item.title || "item"}-${index}`)
      )
    ),
    div.class`public-order-totals`(
      div(span(tax.subtotalLabel), strong(formatMoney(Number(order?.amountSubtotal) || 0, currency))),
      Number(order?.amountTax) ? div(span(tax.taxLabel), strong(formatMoney(Number(order?.amountTax) || 0, currency))) : null,
      Number(order?.amountShipping) ? div(span("Shipping"), strong(formatMoney(Number(order?.amountShipping) || 0, currency))) : null,
      tax.note ? p.class`receipt-tax-note`(tax.note) : null,
      div.class`public-order-total`(
        span("Total"),
        strong(formatMoney(Number(order?.amountTotal) || 0, currency))
      )
    )
  );
};

const ReceiptApp = tag(ReceiptContent);
let receiptMount: (HTMLElement & { destroy?: () => void }) | null = null;

const mountReceipt = () => {
  if (!root) return;
  // The receipt is read-only apart from Retry. Replace its small render tree to
  // avoid TaggedJS reusing stale conditional child/listener contexts.
  receiptMount?.destroy?.();
  receiptMount = document.createElement("div");
  receiptMount.style.display = "contents";
  root.replaceChildren(receiptMount);
  tagElement(ReceiptApp, receiptMount);
};

const initializeReceipt = () => {
  mountReceipt();
  receiptLoader.start();
  void loadReceiptProductLinks();
};
window.addEventListener("pagehide", () => { receiptActive = false; receiptLoader.pause(); });
window.addEventListener("pageshow", (event) => { if (event.persisted) { receiptActive = true; receiptLoader.start(); } });
window.addEventListener("popstate", () => { receiptActive = false; receiptLoader.dispose(); });
if (root) {
  const observer = new MutationObserver(() => {
    if (!root.isConnected) { receiptActive = false; receiptLoader.dispose(); receiptMount?.destroy?.(); observer.disconnect(); }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

initializeReceipt();
