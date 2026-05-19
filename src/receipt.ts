import { clearCart } from "./cart-store.js";
import { fetchApiWithFallback } from "./api-url.js";
import {
  tag,
  tagElement,
  section,
  div,
  h2,
  p,
  a,
  strong,
  span,
} from "taggedjs";

const root = document.getElementById("receiptRoot");
const params = new URLSearchParams(window.location.search);
const orderId = String(params.get("order_id") || "").trim();
const sessionId = String(params.get("session_id") || "").trim();
let publicOrderUrl = "";
let receiptEmail = "";

if (orderId) {
  clearCart();
}

const contactSubject = orderId
  ? `Order ${orderId}`
  : "Receipt support";
const contactBody = orderId
  ? `Hello,\n\nI have a question about order ${orderId}.\n`
  : "Hello,\n\nI have a question about my checkout.\n";
const contactHref = `mailto:service@3dlocalprint.com?${[
  `subject=${encodeURIComponent(contactSubject)}`,
  `body=${encodeURIComponent(contactBody)}`,
].join("&")}`;

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
    publicOrderUrl = String(payload?.publicOrderUrl || "").trim();
    receiptEmail = String(payload?.customerEmail || "").trim();
    renderReceipt();
  } catch (error) {
    console.warn("Failed to load receipt order link", error);
  }
};

const ReceiptApp = tag(() =>
  section.class`home-card receipt-card`(
    div.class`receipt-status-pill`("Payment received"),
    h2("Thank you for your order."),
    orderId
      ? div.class`receipt-order-number`(
          span("Order number"),
          publicOrderUrl
            ? a.class`receipt-order-link`.href(publicOrderUrl)(orderId)
            : strong(orderId)
        )
      : div.class`receipt-order-number receipt-order-number-missing`(
          span("Order number"),
          strong("Unavailable")
        ),
    p(
      orderId
        ? "Your order was received. Please keep this order number for pickup, support, or follow-up questions."
        : "Checkout returned without an order number. Please contact us if your payment completed."
    ),
    receiptEmail
      ? p.class`receipt-email-sent`(
          "Receipt email sent to: ",
          strong(receiptEmail)
        )
      : null,
    div.class`receipt-actions`(
      a.class`ghost-button`.href("./products.html")("Continue shopping"),
      a.class`add-button`.href(contactHref)("Contact service")
    )
  )
);

const renderReceipt = () => {
  if (!root) return;
  root.replaceChildren();
  tagElement(ReceiptApp, root);
};

renderReceipt();
loadPublicOrderUrl();
