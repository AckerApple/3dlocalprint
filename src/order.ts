import {
  tag,
  tagElement,
  section,
  div,
  h2,
  h3,
  p,
  a,
  span,
  strong,
  array,
  subscribe,
} from "taggedjs";
import { fetchApiWithFallback } from "./api-url.js";

type PublicOrderLineItem = {
  quantity: number;
  title: string;
  unitAmount: number;
  currency: string;
};

type PublicOrderRecord = {
  id: string;
  status: string;
  lineItems: PublicOrderLineItem[];
  currency: string;
  amountSubtotal: number;
  amountTax: number;
  amountShipping: number;
  amountTotal: number;
  customerEmail: string;
  customerName: string;
  stripeMode: "sandbox" | "live";
  createdAt: string;
  updatedAt: string;
  paidAt: string;
};

type PublicOrderState = {
  loading: boolean;
  error: string;
  order: PublicOrderRecord | null;
};

const root = document.getElementById("publicOrderRoot");
const params = new URLSearchParams(window.location.search);
const orderId = String(params.get("order_id") || params.get("orderId") || "").trim();
const email = String(params.get("email") || "").trim();

const publicOrderState$ = array<PublicOrderState>([
  {
    loading: true,
    error: "",
    order: null,
  },
]);

const getPublicOrderState = () =>
  publicOrderState$[0] || {
    loading: true,
    error: "",
    order: null,
  };

const setPublicOrderState = (patch: Partial<PublicOrderState>) => {
  const current = getPublicOrderState();
  publicOrderState$[0] = {
    ...current,
    ...patch,
  };
};

const formatMoney = (cents = 0, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "usd").toUpperCase(),
  }).format(Math.max(0, Number(cents) || 0) / 100);

const formatStatus = (status = "") =>
  String(status || "unknown").replace(/_/g, " ");

const formatDate = (value = "") => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const OrderMessage = (title: string, message: string) =>
  section.class`home-card receipt-card`(
    div.class`receipt-status-pill`("Order lookup"),
    h2(title),
    p(message),
    div.class`receipt-actions`(
      a.class`ghost-button`.href("./products.html")("Continue shopping"),
      a.class`add-button`.href("mailto:service@3dlocalprint.com")("Contact service")
    )
  );

const OrderTotals = (order: PublicOrderRecord) =>
  div.class`public-order-totals`(
    div(span("Subtotal"), strong(formatMoney(order.amountSubtotal, order.currency))),
    div(span("Tax"), strong(formatMoney(order.amountTax, order.currency))),
    div(span("Shipping"), strong(formatMoney(order.amountShipping, order.currency))),
    div.class`public-order-total`(
      span("Total"),
      strong(formatMoney(order.amountTotal, order.currency))
    )
  );

const OrderDetails = (order: PublicOrderRecord) =>
  section.class`home-card receipt-card public-order-card`(
    div.class`receipt-status-pill`(formatStatus(order.status)),
    h2("Order details"),
    div.class`receipt-order-number`(
      span("Order number"),
      strong(order.id)
    ),
    div.class`public-order-meta`(
      order.customerName ? div(strong("Name"), span(order.customerName)) : null,
      div(strong("Email"), span(order.customerEmail)),
      order.paidAt ? div(strong("Paid"), span(formatDate(order.paidAt))) : null,
      order.updatedAt ? div(strong("Updated"), span(formatDate(order.updatedAt))) : null
    ),
    div.class`public-order-section`(
      h3("Items"),
      div.class`public-order-lines`(
        order.lineItems.length
          ? order.lineItems.map((item) =>
              div.class`public-order-line`(
                div(
                  strong(item.title || "Product"),
                  span(`${Math.max(1, Math.round(Number(item.quantity) || 1))} item${item.quantity === 1 ? "" : "s"}`)
                ),
                strong(formatMoney(
                  Math.max(0, Number(item.unitAmount) || 0) * Math.max(1, Number(item.quantity) || 1),
                  item.currency || order.currency
                ))
              )
            )
          : p("No items are available for this order yet.")
      )
    ),
    OrderTotals(order),
    div.class`receipt-actions`(
      a.class`ghost-button`.href("./products.html")("Continue shopping"),
      a.class`add-button`.href(`mailto:service@3dlocalprint.com?subject=${encodeURIComponent(`Order ${order.id}`)}`)("Contact service")
    )
  );

const PublicOrderContent = (state: PublicOrderState) => {
  if (state.loading) {
    return section.class`home-card receipt-card`(
      div.class`home-products-loading`(
        div.class`home-products-spinner`().attr("aria-hidden", "true"),
        p.class`home-products-loading-text`("Loading order...")
      )
    );
  }
  if (state.error) {
    return OrderMessage("Order unavailable", state.error);
  }
  return state.order
    ? OrderDetails(state.order)
    : OrderMessage("Order unavailable", "We could not load this order.");
};

const PublicOrderApp = tag(() => subscribe(publicOrderState$, ([state]) => PublicOrderContent(state || getPublicOrderState())));

const mountPublicOrderApp = () => {
  if (!root) return;
  root.replaceChildren();
  tagElement(PublicOrderApp, root);
};

const loadOrder = async () => {
  if (!orderId || !email) {
    setPublicOrderState({
      loading: false,
      error: "This link is missing the order number or customer email.",
    });
    return;
  }

  try {
    const requestParams = new URLSearchParams({ orderId, email });
    const response = await fetchApiWithFallback(
      `/api/public/order?${requestParams.toString()}`,
      "getPublicOrder"
    );
    if (!response.ok) {
      setPublicOrderState({ error: "The order number and email did not match an order." });
      console.warn('load order failed', { response })
      return;
    }
    const payload = await response.json();
    const order = payload?.order || null;
    setPublicOrderState({
      order,
      error: order ? "" : "We could not load this order.",
    });
  } catch (error) {
    console.error("Failed to load public order", error);
    setPublicOrderState({ error: "Order details are unavailable right now." });
  } finally {
    setPublicOrderState({ loading: false });
  }
};

mountPublicOrderApp();
loadOrder();
