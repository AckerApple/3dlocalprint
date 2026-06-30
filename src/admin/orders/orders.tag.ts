import { auth as firebaseAuth, subscribeOrders } from "../shared/firebase.js";
import {
  tag,
  label,
  tagElement,
  section,
  div,
  table,
  thead,
  tbody,
  tr,
  th,
  td,
  span,
  p,
  h1,
  h2,
  a,
  button,
  input,
  select,
  option,
  array,
  subscribe,
} from "taggedjs";
import { Subject } from "taggedjs/js/subject/Subject.class.js";
import { toast } from "../shared/toast.js";
import { AdminNav } from "../shared/AdminNav.tag.js";
import { Modal } from "../shared/Modal.tag.js";
import { replaceMountRoot } from "../shared/ssoMount.js";
import { startAdminAppShell } from "../shared/adminAppShell.js";
import type { OrderRecord, OrderStatus } from "../../types/order.js";

let app = document.getElementById("ordersApp");
const appRoot = { current: app };
const orders$ = array<OrderRecord>([]);
const orderModal$ = new Subject<number>(0, (subscription) => {
  subscription.next(0);
});
const orderFilters$ = new Subject<number>(0, (subscription) => {
  subscription.next(0);
});
const orderStatusFilterModal$ = new Subject<number>(0, (subscription) => {
  subscription.next(0);
});
let stopOrders: null | (() => void) = null;
let appMounted = false;
let currentUser: any = null;
let currentAuthUser: null | { email?: string | null; getIdToken?: () => Promise<string> } = null;
let handleSignOut = () => Promise.resolve();
let selectedOrderId = "";
let resendEmailLoadingOrderId = "";
let resendEmailStatusText = "";
let deleteOrderLoadingId = "";
let cancelOrderLoadingId = "";
let closeOrderLoadingId = "";
let orderIdFilter = "";
let orderEmailFilter = "";
let orderTestFilter: "all" | "test" | "live" = "all";
let orderStatusFilterModalOpen = false;

const ORDER_STATUS_OPTIONS: Array<{ value: OrderStatus; label: string }> = [
  { value: "checkout_created", label: "Checkout created" },
  { value: "paid", label: "Paid" },
  { value: "payment_failed", label: "Payment failed" },
  { value: "closed", label: "Closed" },
  { value: "canceled", label: "Canceled" },
  { value: "unknown", label: "Unknown" },
];

const getDefaultOrderStatusFilters = () =>
  new Set<OrderStatus>(
    ORDER_STATUS_OPTIONS
      .map((option) => option.value)
      .filter((status) => status !== "closed" && status !== "canceled")
  );

let selectedOrderStatusFilters = getDefaultOrderStatusFilters();
let draftOrderStatusFilters = new Set<OrderStatus>(selectedOrderStatusFilters);

const getOrderIdFromUrl = () =>
  new URLSearchParams(window.location.search).get("orderId")?.trim()
  || new URLSearchParams(window.location.search).get("order_id")?.trim()
  || "";

const syncOrderUrl = (orderId = "", replace = false) => {
  const url = new URL(window.location.href);
  if (orderId) {
    url.searchParams.set("orderId", orderId);
  } else {
    url.searchParams.delete("orderId");
  }

  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (nextUrl === currentUrl) return;
  window.history[replace ? "replaceState" : "pushState"]({}, "", nextUrl);
};

const formatMoney = (cents = 0, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "usd").toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((Math.max(0, Number(cents) || 0)) / 100);

const formatDate = (value = "") => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const formatListDate = (value = "") => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

const getCustomerLabel = (order: OrderRecord) =>
  [order.customerName, order.customerEmail].filter(Boolean).join(" · ") || "—";

const getLineItemsLabel = (order: OrderRecord) =>
  order.lineItems.length
    ? order.lineItems.map((item) => `${item.quantity}x ${item.title}`).join(", ")
    : "No line items recorded";

const isTestOrder = (order: OrderRecord) =>
  order.stripeMode === "sandbox" || /\btest\b|_test_/i.test(order.id);

const isNewOrder = (order: OrderRecord) => {
  const createdAt = new Date(order.createdAt).getTime();
  if (Number.isNaN(createdAt)) return false;
  const ageMs = Date.now() - createdAt;
  return ageMs >= 0 && ageMs <= 60 * 60 * 1000;
};

const getStripePaymentIntentHref = (order: OrderRecord) => {
  if (!order.paymentIntentId) return "";
  const baseUrl = isTestOrder(order)
    ? "https://dashboard.stripe.com/test"
    : "https://dashboard.stripe.com";
  return `${baseUrl}/payments/${encodeURIComponent(order.paymentIntentId)}`;
};

const getStripeEventHref = (order: OrderRecord) => {
  if (!order.latestStripeEventId) return "";
  const baseUrl = isTestOrder(order)
    ? "https://dashboard.stripe.com/test"
    : "https://dashboard.stripe.com";
  return `${baseUrl}/events/${encodeURIComponent(order.latestStripeEventId)}`;
};

const getStripeHref = (order: OrderRecord) => {
  const paymentIntentHref = getStripePaymentIntentHref(order);
  if (paymentIntentHref) return paymentIntentHref;
  return order.stripeDashboardUrl || order.checkoutUrl || "";
};

const getPublicOrderHref = (order: OrderRecord) => {
  if (order.publicOrderUrl) return order.publicOrderUrl;
  if (!order.id || !order.customerEmail) return "";
  const url = new URL("/order.html", window.location.origin);
  url.searchParams.set("order_id", order.id);
  url.searchParams.set("email", order.customerEmail);
  return url.toString();
};

const getAgreementHref = (order: OrderRecord) => order.agreementPublicUrl || "";

const getFilteredOrders = (orders: OrderRecord[]) => {
  const idNeedle = orderIdFilter.trim().toLowerCase();
  const emailNeedle = orderEmailFilter.trim().toLowerCase();
  return orders.filter((order) => {
    if (idNeedle && !order.id.toLowerCase().includes(idNeedle)) return false;
    if (emailNeedle && !order.customerEmail.toLowerCase().includes(emailNeedle)) return false;
    if (orderTestFilter === "test" && !isTestOrder(order)) return false;
    if (orderTestFilter === "live" && isTestOrder(order)) return false;
    if (!selectedOrderStatusFilters.has(order.status)) return false;
    return true;
  });
};

const refreshOrderFilters = () =>
  orderFilters$.next((Number(orderFilters$.value) || 0) + 1);

const refreshOrderStatusFilterModal = () =>
  orderStatusFilterModal$.next((Number(orderStatusFilterModal$.value) || 0) + 1);

const getStatusFilterCount = () => selectedOrderStatusFilters.size;

const openOrderStatusFilterModal = () => {
  draftOrderStatusFilters = new Set<OrderStatus>(selectedOrderStatusFilters);
  orderStatusFilterModalOpen = true;
  refreshOrderStatusFilterModal();
};

const closeOrderStatusFilterModal = () => {
  selectedOrderStatusFilters = new Set<OrderStatus>(draftOrderStatusFilters);
  orderStatusFilterModalOpen = false;
  refreshOrderStatusFilterModal();
  refreshOrderFilters();
};

const toggleDraftOrderStatusFilter = (status: OrderStatus, checked: boolean) => {
  if (checked) {
    draftOrderStatusFilters.add(status);
  } else {
    draftOrderStatusFilters.delete(status);
  }
  refreshOrderStatusFilterModal();
};

const getAdminOrderActionUrl = (relativeUrl: string, functionName: string) => {
  const hostname = window.location.hostname;
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
  const isFirebaseHosting = hostname.endsWith(".web.app") || hostname.endsWith(".firebaseapp.com");
  if (isLocalHost || isFirebaseHosting) {
    return relativeUrl;
  }

  const projectId = String(import.meta.env.VITE_FIREBASE_PROJECT_ID || "threedlocalprint").trim();
  return `https://us-central1-${projectId}.cloudfunctions.net/${functionName}`;
};

const getResendOrderEmailUrl = (target: "internal" | "customer" = "internal") => {
  const relativeUrl = target === "customer"
    ? "/api/admin/orders/resend-customer-email"
    : "/api/admin/orders/resend-email";
  const functionName = target === "customer" ? "resendCustomerOrderEmail" : "resendOrderNotification";
  return getAdminOrderActionUrl(relativeUrl, functionName);
};

const getDeleteTestOrderUrl = () =>
  getAdminOrderActionUrl("/api/admin/orders/delete-test-order", "deleteTestOrder");

const getCancelOrderUrl = () =>
  getAdminOrderActionUrl("/api/admin/orders/cancel", "cancelOrder");

const getCloseOrderUrl = () =>
  getAdminOrderActionUrl("/api/admin/orders/close", "closeOrder");

const getSelectedOrder = () =>
  orders$.find((order) => order.id === selectedOrderId) || null;

const openOrderModal = (orderId: string, updateUrl = true) => {
  selectedOrderId = orderId;
  if (updateUrl) {
    syncOrderUrl(orderId);
  }
  orderModal$.next((Number(orderModal$.value) || 0) + 1);
};

const closeOrderModal = (updateUrl = true) => {
  selectedOrderId = "";
  if (updateUrl) {
    syncOrderUrl("");
  }
  orderModal$.next((Number(orderModal$.value) || 0) + 1);
};

const syncModalFromUrl = () => {
  const orderId = getOrderIdFromUrl();
  if (orderId) {
    openOrderModal(orderId, false);
    return;
  }
  closeOrderModal(false);
};

const onOrderRowKeyDown = (event: KeyboardEvent, orderId: string) => {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }
  event.preventDefault();
  openOrderModal(orderId);
};

const DetailItem = (label: string, value = "") =>
  div.class`orders-detail-item`(
    span.class`orders-detail-label`(label),
    span.class`orders-detail-value`(value || "—")
  );

const DetailLink = (label: string, value = "", href = "") =>
  div.class`orders-detail-item`(
    span.class`orders-detail-label`(label),
    href && value
      ? a
          .class`orders-detail-value orders-detail-link`
          .href(href)
          .target`_blank`
          .rel`noreferrer`(value)
      : span.class`orders-detail-value`(value || "—")
  );

const DetailMoney = (label: string, cents = 0, currency = "usd") =>
  DetailItem(label, formatMoney(cents, currency));

const resendOrderEmail = async (orderId: string, target: "internal" | "customer") => {
  const targetLabel = target === "customer" ? "customer order email" : "internal order email";
  console.debug(`[orders] resend ${targetLabel} clicked`, {
    orderId,
    isAlreadySending: Boolean(resendEmailLoadingOrderId),
  });
  if (!orderId || resendEmailLoadingOrderId) return;
  const user = currentAuthUser || firebaseAuth.currentUser;
  console.debug(`[orders] resend ${targetLabel} auth state`, {
    orderId,
    hasShellUser: Boolean(currentAuthUser),
    hasFirebaseCurrentUser: Boolean(firebaseAuth.currentUser),
    shellUserEmail: currentAuthUser?.email || "",
    firebaseCurrentUserEmail: firebaseAuth.currentUser?.email || "",
  });
  if (!user || typeof user.getIdToken !== "function") {
    console.warn(`[orders] resend ${targetLabel} blocked: no token-capable signed-in user`, { orderId });
    toast.error("Sign in again to resend order email.");
    return;
  }

  resendEmailLoadingOrderId = `${target}:${orderId}`;
  resendEmailStatusText = target === "customer" ? "Sending customer order email..." : "Sending internal order email...";
  orderModal$.next((Number(orderModal$.value) || 0) + 1);
  try {
    const token = await user.getIdToken();
    const resendUrl = getResendOrderEmailUrl(target);
    console.info(`[orders] sending resend ${targetLabel} request`, { orderId, resendUrl });
    const response = await fetch(resendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    });

    const payload = await response.json().catch(() => ({}));
    console.info(`[orders] resend ${targetLabel} response`, {
      orderId,
      ok: response.ok,
      status: response.status,
      payload,
    });
    if (!response.ok) {
      throw new Error(String(payload?.error || "Failed to resend order email."));
    }
    const status = String(payload?.customerEmailStatus || payload?.notificationStatus || "sent");
    const selectedOrder = getSelectedOrder();
    const recipient = target === "customer" ? selectedOrder?.customerEmail || "customer" : "service@3dlocalprint.com";
    resendEmailStatusText = `Sent ${targetLabel} to ${recipient} (${status}).`;
    toast.success(`Sent ${targetLabel} to ${recipient} for ${orderId}.`, { duration: 10000 });
  } catch (error) {
    console.error(`Failed to resend ${targetLabel}`, error);
    resendEmailStatusText = error instanceof Error ? error.message : "Failed to resend order email.";
    toast.error(resendEmailStatusText, { duration: 10000 });
  } finally {
    resendEmailLoadingOrderId = "";
    orderModal$.next((Number(orderModal$.value) || 0) + 1);
  }
};

const deleteTestOrder = async (order: OrderRecord) => {
  if (!order?.id || deleteOrderLoadingId) return;
  if (!isTestOrder(order)) {
    toast.error("Only test orders can be deleted.");
    return;
  }

  const confirmed = window.confirm(`Delete test order ${order.id}? This cannot be undone.`);
  if (!confirmed) return;

  const user = currentAuthUser || firebaseAuth.currentUser;
  if (!user || typeof user.getIdToken !== "function") {
    toast.error("Sign in again to delete this test order.");
    return;
  }

  deleteOrderLoadingId = order.id;
  orderModal$.next((Number(orderModal$.value) || 0) + 1);
  try {
    const token = await user.getIdToken();
    const response = await fetch(getDeleteTestOrderUrl(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId: order.id }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(String(payload?.error || "Failed to delete test order."));
    }

    toast.success(`Deleted test order ${order.id}.`);
    closeOrderModal();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete test order.";
    toast.error(message, { duration: 10000 });
  } finally {
    deleteOrderLoadingId = "";
    orderModal$.next((Number(orderModal$.value) || 0) + 1);
  }
};

const cancelOrder = async (order: OrderRecord) => {
  if (!order?.id || cancelOrderLoadingId) return;
  if (order.status === "canceled") {
    toast.info("This order is already canceled.");
    return;
  }

  const confirmed = window.confirm(
    `Cancel order ${order.id}? This only marks the order canceled in admin. It does not refund or void anything in Stripe.`
  );
  if (!confirmed) return;

  const user = currentAuthUser || firebaseAuth.currentUser;
  if (!user || typeof user.getIdToken !== "function") {
    toast.error("Sign in again to cancel this order.");
    return;
  }

  cancelOrderLoadingId = order.id;
  orderModal$.next((Number(orderModal$.value) || 0) + 1);
  try {
    const token = await user.getIdToken();
    const response = await fetch(getCancelOrderUrl(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId: order.id }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(String(payload?.error || "Failed to cancel order."));
    }

    toast.success(`Canceled order ${order.id}.`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to cancel order.";
    toast.error(message, { duration: 10000 });
  } finally {
    cancelOrderLoadingId = "";
    orderModal$.next((Number(orderModal$.value) || 0) + 1);
  }
};

const closeOrder = async (order: OrderRecord) => {
  if (!order?.id || closeOrderLoadingId) return;
  if (order.status === "closed") {
    toast.info("This order is already closed.");
    return;
  }

  const confirmed = window.confirm(
    `Close order ${order.id}? This marks the order closed in admin. It does not refund, void, or cancel anything in Stripe.`
  );
  if (!confirmed) return;

  const user = currentAuthUser || firebaseAuth.currentUser;
  if (!user || typeof user.getIdToken !== "function") {
    toast.error("Sign in again to close this order.");
    return;
  }

  closeOrderLoadingId = order.id;
  orderModal$.next((Number(orderModal$.value) || 0) + 1);
  try {
    const token = await user.getIdToken();
    const response = await fetch(getCloseOrderUrl(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId: order.id }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(String(payload?.error || "Failed to close order."));
    }

    toast.success(`Closed order ${order.id}.`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to close order.";
    toast.error(message, { duration: 10000 });
  } finally {
    closeOrderLoadingId = "";
    orderModal$.next((Number(orderModal$.value) || 0) + 1);
  }
};

const OrderDetailModal = () =>
  subscribe(orderModal$, () => {
    const order = getSelectedOrder();
    return Modal({
      modalOpen: Boolean(order),
      title: order ? `Order ${order.id}` : "Order",
      className: "orders-detail-modal",
      cardClassName: "orders-detail-card",
      bodyClassName: "orders-detail-body",
      onClose: closeOrderModal,
      content: () =>
        order
          ? div.class`orders-detail-grid`(
              div.class`orders-detail-section`(
                h2.class`orders-detail-section-title`("Summary"),
                DetailItem("Status", order.status.replace(/_/g, " ")),
                DetailMoney("Subtotal", order.amountSubtotal, order.currency),
                DetailMoney("Tax", order.amountTax, order.currency),
                DetailMoney("Shipping", order.amountShipping, order.currency),
                DetailMoney("Total", order.amountTotal, order.currency),
                DetailItem("Stripe mode", order.stripeMode || "—")
              ),
              div.class`orders-detail-section`(
                h2.class`orders-detail-section-title`("Customer"),
                DetailItem("Name", order.customerName),
                DetailItem("Email", order.customerEmail),
                DetailItem("Created", formatDate(order.createdAt)),
                DetailItem("Updated", formatDate(order.updatedAt)),
                DetailItem("Paid", order.paidAt ? formatDate(order.paidAt) : "")
              ),
              div.class`orders-detail-section orders-detail-section-wide`(
                h2.class`orders-detail-section-title`("Items"),
                order.lineItems.length
                  ? div.class`orders-detail-lines`(
                      order.lineItems.map((item) =>
                        div.class`orders-detail-line`(
                          span.class`orders-detail-line-title`(item.title),
                          span.class`orders-detail-line-meta`(
                            `qty ${item.quantity}`,
                            item.productId ? ` · product ${item.productId}` : "",
                            item.variationId ? ` · option ${item.variationId}` : ""
                          )
                        )
                      )
                    )
                  : p.class`orders-meta`("No line items recorded.")
              ),
              order.orderType || order.agreementId
                ? div.class`orders-detail-section orders-detail-section-wide`(
                    h2.class`orders-detail-section-title`("Agreement"),
                    DetailItem("Order type", order.orderType || ""),
                    DetailItem("Agreement", order.agreementId || ""),
                    div.class`orders-detail-actions`(
                      getAgreementHref(order)
                        ? a
                            .class`ghost-button`
                            .href(getAgreementHref(order))
                            .target`_blank`
                            .rel`noreferrer`("Open agreement")
                        : null
                    )
                  )
                : null,
              div.class`orders-detail-section orders-detail-section-wide`(
                h2.class`orders-detail-section-title`("Stripe"),
                DetailItem("Checkout session", order.checkoutSessionId),
                DetailLink("Payment intent", order.paymentIntentId, getStripePaymentIntentHref(order)),
                DetailItem("Stripe customer", order.stripeCustomerId),
                DetailLink("Latest event", order.latestStripeEventId, getStripeEventHref(order)),
                // DetailItem("Notification email", order.notificationEmail),
                DetailItem("Notification status", order.notificationEmailStatus),
                DetailItem("Admin order URL", order.adminOrderUrl),
                div.class`orders-detail-actions`(
                  getPublicOrderHref(order)
                    ? a
                        .class`add-button`
                        .href(getPublicOrderHref(order))
                        .target`_blank`
                        .rel`noreferrer`("Open public order")
                    : null,
                  getStripeHref(order)
                    ? a
                        .class`ghost-button`
                        .href(getStripeHref(order))
                        .target`_blank`
                        .rel`noreferrer`("Open Stripe")
                    : null,
                  /*
                  order.checkoutUrl
                    ? a
                        .class`ghost-button`
                        .href(order.checkoutUrl)
                        .target`_blank`
                        .rel`noreferrer`("Checkout URL")
                    : null*/
                )
              ),
              div.class`orders-detail-section orders-detail-section-wide`(
                h2.class`orders-detail-section-title`("Resend Emails"),
                div.class`orders-detail-actions`(
                  button
                    .type`button`
                    .class`add-button`
                    .disabled(_=> Boolean(resendEmailLoadingOrderId))
                    .onClick(() => resendOrderEmail(order.id, "internal"))(
                    _=> resendEmailLoadingOrderId === `internal:${order.id}` ? "Sending..." : "Resend internal order email"
                  ),
                  button
                    .type`button`
                    .class`ghost-button`
                    .disabled(_=> Boolean(resendEmailLoadingOrderId))
                    .onClick(() => resendOrderEmail(order.id, "customer"))(
                    _=> resendEmailLoadingOrderId === `customer:${order.id}` ? "Sending..." : "Resend customer order email"
                  )
                ),
                resendEmailStatusText
                  ? p.class`orders-email-status`(_=> resendEmailStatusText)
                  : null
              ),
              div.class`orders-detail-section orders-detail-section-wide orders-info-section`(
                h2.class`orders-detail-section-title`("Close Order"),
                p.class`orders-meta`("Mark this order closed in admin. This does not refund, void, or cancel anything in Stripe."),
                div.class`orders-detail-actions`(
                  button
                    .type`button`
                    .class`ghost-button`
                    .disabled(_=> order.status === "closed" || closeOrderLoadingId === order.id)
                    .onClick(() => closeOrder(order))(
                    _=> order.status === "closed"
                      ? "Order closed"
                      : closeOrderLoadingId === order.id
                        ? "Closing..."
                        : "Close order"
                  )
                )
              ),
              div.class`orders-detail-section orders-detail-section-wide orders-danger-section`(
                h2.class`orders-detail-section-title`("Cancel Order"),
                p.class`orders-meta`("Mark this order canceled in admin. This does not refund, void, or cancel anything in Stripe."),
                div.class`orders-detail-actions`(
                  button
                    .type`button`
                    .class`ghost-button delete-button`
                    .disabled(_=> order.status === "canceled" || cancelOrderLoadingId === order.id)
                    .onClick(() => cancelOrder(order))(
                    _=> order.status === "canceled"
                      ? "Order canceled"
                      : cancelOrderLoadingId === order.id
                        ? "Canceling..."
                        : "Cancel order"
                  )
                )
              ),
              isTestOrder(order)
                ? div.class`orders-detail-section orders-detail-section-wide orders-danger-section`(
                    h2.class`orders-detail-section-title`("Test Order"),
                    p.class`orders-meta`("Delete this test order from the admin list. Live orders cannot be deleted here."),
                    div.class`orders-detail-actions`(
                      button
                        .type`button`
                        .class`ghost-button delete-button`
                        .disabled(_=> deleteOrderLoadingId === order.id)
                        .onClick(() => deleteTestOrder(order))(
                        _=> deleteOrderLoadingId === order.id ? "Deleting..." : "Delete test order"
                      )
                    )
                  )
                : null
            )
          : null,
    });
  });

const stopOrderSubscription = () => {
  if (stopOrders) {
    stopOrders();
    stopOrders = null;
  }
};

const OrderFilters = () =>
  subscribe(orderFilters$, () =>
    div.class`orders-filters`(
      label.class`orders-filter-field`(
        span("Order ID"),
        input
          .class`manufacturer-input`
          .type`search`
          .placeholder`Search order id`
          .value(_=> orderIdFilter)
          .onInput((event) => {
            orderIdFilter = String(event.target.value || "");
            refreshOrderFilters();
          })()
      ),
      label.class`orders-filter-field`(
        span("Email"),
        input
          .class`manufacturer-input`
          .type`search`
          .placeholder`Search customer email`
          .value(_=> orderEmailFilter)
          .onInput((event) => {
            orderEmailFilter = String(event.target.value || "");
            refreshOrderFilters();
          })()
      ),
      label.class`orders-filter-field`(
        span("Type"),
        select
          .class`manufacturer-input`
          .value(_=> orderTestFilter)
          .onChange((event) => {
            const value = String(event.target.value || "all");
            orderTestFilter = value === "test" || value === "live" ? value : "all";
            refreshOrderFilters();
          })(
          option.value`all`("All orders"),
          option.value`test`("Test only"),
          option.value`live`("Live only")
        )
      ),
      div.class`orders-filter-field`(
        span("Status"),
        button
          .type`button`
          .class`ghost-button orders-status-filter-button`
          .onClick(openOrderStatusFilterModal)(
          _=> `Status (${getStatusFilterCount()})`
        )
      )
    )
  );

const OrderStatusFilterModal = () =>
  subscribe(orderStatusFilterModal$, () =>
    Modal({
      modalOpen: orderStatusFilterModalOpen,
      title: "Order Status Filters",
      className: "orders-status-filter-modal",
      cardClassName: "orders-status-filter-card",
      bodyClassName: "orders-status-filter-body",
      onClose: closeOrderStatusFilterModal,
      closeLabel: "Apply",
      content: () =>
        div.class`orders-status-filter-list`(
          ORDER_STATUS_OPTIONS.map((option) =>
            label.class`orders-status-filter-option`(
              input
                .type`checkbox`
                .checked(_=> draftOrderStatusFilters.has(option.value))
                .onChange((event) => {
                  toggleDraftOrderStatusFilter(option.value, Boolean(event.target.checked));
                })(),
              span(option.label)
            ).key(option.value)
          )
        ),
    })
  );

export const OrdersApp = tag(() => [
  AdminNav(handleSignOut, currentUser),
  section.class`panel ledger-panel orders-panel`(
    div.class`ledger-header`(
      div.class`ledger-heading`(
        h1("Orders"),
        p("Review checkout orders, payment status, and Stripe links.")
      )
    ),
    OrderFilters(),
    subscribe(
      orderFilters$,
      (orders) =>
        subscribe(orders$, (orders) => {
          const filteredOrders = getFilteredOrders(orders);
          return filteredOrders.length
          ? div.class`ledger-table-block`(
              div.class`ledger-table-wrap`(
                table.class`ledger-table orders-table`(
                  thead(
                    tr(
                      th("Updated"),
                      th("Status"),
                      th("Customer"),
                      th("Items"),
                      th("Total")
                    )
                  ),
                  tbody(
                    filteredOrders.map((order) =>
                      tr
                        .class`ledger-row orders-row`
                        .attr("tabindex", "0")
                        .attr("role", "button")
                        .onClick(() => openOrderModal(order.id))
                        .onKeyDown((event) => onOrderRowKeyDown(event, order.id))(
                        td(
                          div.class`orders-date-stack`(
                            div.class`orders-updated-line`(
                              span(_=> formatListDate(order.updatedAt || order.createdAt)),
                              isNewOrder(order)
                                ? span.class`pill orders-new-pill`("new")
                                : null
                            ),
                            order.paidAt ? p.class`orders-meta`(_=> `Paid ${formatListDate(order.paidAt)}`) : null
                          )
                        ),
                        td(
                          div.class`orders-status-stack`(
                            span.class(_=> `pill ledger-status-pill orders-status-${order.status}`)(
                              _=> order.status.replace(/_/g, " ")
                            ),
                            isTestOrder(order)
                              ? span.class`pill orders-test-pill`("test")
                              : null
                          )
                        ),
                        td(
                          div.class`ledger-title-stack`(
                            span.class`ledger-title-cell`(_=> getCustomerLabel(order)),
                            order.notificationEmailStatus
                              ? p.class`orders-meta`(_=> `Email: ${order.notificationEmailStatus}`)
                              : null
                          )
                        ),
                        td(
                          div.class`ledger-title-stack`(
                            span.class`ledger-title-cell`(_=> getLineItemsLabel(order)),
                            order.paymentIntentId
                              ? p.class`orders-meta`(_=> `Payment ${order.paymentIntentId}`)
                              : null
                          )
                        ),
                        td(
                          div.class`ledger-amount-stack`(
                            span.class`ledger-amount-value ledger-amount-positive`(
                              _=> formatMoney(order.amountTotal, order.currency)
                            ),
                            order.amountTax
                              ? p.class`ledger-tax-preview`(_=> `tax ${formatMoney(order.amountTax, order.currency)}`)
                              : null,
                            order.amountShipping
                              ? p.class`orders-meta`(_=> `shipping ${formatMoney(order.amountShipping, order.currency)}`)
                              : null
                          )
                        )
                      ).key(order.id)
                    )
                  )
                )
              ),
              p.class`ledger-table-hint`(_=> `showing ${filteredOrders.length} of ${orders.length} latest checkout orders`)
            )
          : p.class`ledger-empty`("No orders match the current filters.")
        })
    ),
    OrderStatusFilterModal(),
    OrderDetailModal()
  ),
]);

const mountApp = () => {
  if (!appRoot.current || appMounted) {
    return;
  }
  const nextRoot = replaceMountRoot(appRoot);
  if (!nextRoot) return;
  nextRoot.replaceChildren();
  tagElement(OrdersApp, nextRoot);
  appMounted = true;
  app = appRoot.current;
};

const adminShell = startAdminAppShell({
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
  onSignedOut: () => {
    currentAuthUser = null;
    stopOrderSubscription();
  },
  onDenied: () => {
    currentAuthUser = null;
    stopOrderSubscription();
  },
  onAuthorized: ({ user, authState }) => {
    currentAuthUser = user || firebaseAuth.currentUser;
    if (!stopOrders) {
      stopOrders = subscribeOrders((items) => {
        orders$.splice(0, orders$.length, ...items);
        if (selectedOrderId && !items.some((order) => order.id === selectedOrderId)) {
          syncModalFromUrl();
        } else if (!selectedOrderId && getOrderIdFromUrl()) {
          syncModalFromUrl();
        }
        if (authState.isAuthorized) {
          mountApp();
        }
      });
    }
    mountApp();
  },
});
handleSignOut = adminShell.handleSignOut;

window.addEventListener("popstate", syncModalFromUrl);
