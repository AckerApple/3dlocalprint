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
  array,
  subscribe,
} from "taggedjs";

const root = document.getElementById("receiptRoot");
const params = new URLSearchParams(window.location.search);
const orderId = String(params.get("order_id") || "").trim();
const sessionId = String(params.get("session_id") || "").trim();
let receiptEmail = "";
type ReceiptLineItem = {
  productId?: string;
  title?: string;
  quantity?: number;
  unitAmount?: number;
  amountTotal?: number;
  currency?: string;
};
type ReceiptOrderSummary = {
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
const receiptRender$ = array([{ version: 0 }]);

if (orderId) {
  clearCart();
}

const refreshReceipt = () => {
  receiptRender$[0] = { version: Number(receiptRender$[0]?.version || 0) + 1 };
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

const loadPublicOrder = async (email = "") => {
  const lookupEmail = String(email || receiptEmail || "").trim();
  if (!orderId || !lookupEmail || receiptOrder) return;

  const requestParams = new URLSearchParams({ orderId, email: lookupEmail });
  const response = await fetchApiWithFallback(
    `/api/public/order?${requestParams.toString()}`,
    "getPublicOrder"
  );
  if (!response.ok) {
    console.warn("Failed to load receipt order details", { response });
    return;
  }

  const payload = await response.json();
  receiptOrder = payload?.order || null;
  refreshReceipt();
};

const loadPublicOrderUrl = async (attempt = 1) => {
  if (!orderId || !sessionId) return;
  try {
    const requestParams = new URLSearchParams({ orderId, sessionId });
    const response = await fetchApiWithFallback(
      `/api/public/order-receipt-link?${requestParams.toString()}`,
      "getPublicOrderReceiptLink"
    );
    if (!response.ok) {
      if (attempt < 8) {
        window.setTimeout(() => loadPublicOrderUrl(attempt + 1), 1500);
      }
      return;
    }
    const payload = await response.json();
    receiptEmail = String(payload?.customerEmail || "").trim();
    if (!receiptEmail) {
      receiptEmail = getEmailFromPublicOrderUrl(String(payload?.publicOrderUrl || ""));
    }
    receiptOrder = payload?.order || null;
    refreshReceipt();
    if (!receiptOrder) {
      await loadPublicOrder(receiptEmail);
    }
  } catch (error) {
    console.warn("Failed to load receipt order link", error);
  }
};

const ReceiptContent = () =>
  [
    section.class`home-card receipt-card public-order-card`(
      div.class`receipt-status-pill`("Payment received"),
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
      div(span("Subtotal"), strong(formatMoney(Number(order?.amountSubtotal) || 0, currency))),
      Number(order?.amountTax) ? div(span("Tax"), strong(formatMoney(Number(order?.amountTax) || 0, currency))) : null,
      Number(order?.amountShipping) ? div(span("Shipping"), strong(formatMoney(Number(order?.amountShipping) || 0, currency))) : null,
      div.class`public-order-total`(
        span("Total"),
        strong(formatMoney(Number(order?.amountTotal) || 0, currency))
      )
    )
  );
};

const ReceiptApp = tag(() => subscribe(receiptRender$, ReceiptContent));

const mountReceipt = () => {
  if (!root) return;
  root.replaceChildren();
  tagElement(ReceiptApp, root);
};

const initializeReceipt = async () => {
  await loadReceiptProductLinks();
  mountReceipt();
  loadPublicOrderUrl();
};

initializeReceipt();
