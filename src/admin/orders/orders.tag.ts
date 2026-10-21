import {orderCheckoutLink} from "../../order-checkout-link.js";
import { isNameBadgeProduct, validateBadgeName } from "../../name-badges.js";
import { auth as firebaseAuth, loadProducts, subscribeCustomers, subscribeLedgerEntries, subscribeOrders } from "../shared/firebase.js";
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
  img,
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
import type { ProductItem } from "../../types/product.js";
import type { CustomerRecord } from "../../types/customer.js";
import type { LedgerEntry } from "../../types/ledger.js";

type CustomOrderDraftItem = {
  productId: string;
  variationId: string;
  badgeName?: string;
  title: string;
  unitAmount: number;
  currency: string;
  quantity: number;
  imageUrl: string;
};

let app = document.getElementById("ordersApp");
const appRoot = { current: app };
const orders$ = array<OrderRecord>([]);
const customers$ = array<CustomerRecord>([]);
const ledgerEntries$ = array<LedgerEntry>([]);
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
let stopCustomers: null | (() => void) = null;
let stopLedgerEntries: null | (() => void) = null;
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
let cashPaymentLoadingId = "";
let ledgerPaymentLinkLoadingId = "";
let ledgerPaymentSearch = "";
let importCustomerLoadingOrderId = "";
let orderProductLinksLoaded = false;
const initialOrderFilterParams = new URLSearchParams(window.location.search);
let orderIdFilter = String(initialOrderFilterParams.get("filterOrderId") || "");
let orderEmailFilter = String(initialOrderFilterParams.get("filterEmail") || "");
const initialOrderModeFilter = String(initialOrderFilterParams.get("orderMode") || "live");
let orderTestFilter: "all" | "test" | "live" = initialOrderModeFilter === "all" || initialOrderModeFilter === "test"
  ? initialOrderModeFilter
  : "live";
let orderStatusFilterModalOpen = false;
let createOrderModalOpen = false;
let createOrderLoading = false;
let customOrderRequestKey = crypto.randomUUID();
let lastCustomOrderSubmission = "";
let imageBusy = false;
let privateOrderImage = "";
let editingCustomOrderId = "";
let editReturnOrderId = "";
let discardOrderChangesPending = false;
let pendingEditNavigation: { orderId: string } | null = null;
let editingCustomOrderStripeMode: "sandbox" | "live" | "" = "";
let editingCustomOrderStatus: OrderStatus | "" = "";
let customOrderStripeMode: "sandbox" | "live" = "live";
let customOrderCatalog: ProductItem[] = [];
let customOrderProductSearch = "";
let customOrderProductLookupOpen = false;
let customOrderCustomerSearch = "";
let customOrderCustomerLookupOpen = false;
let selectedCustomOrderCustomerEmail = "";
let initialCustomOrderFormState = "";
let customOrderDraft = {
  customerName: "",
  customerEmail: "",
  amountShipping: "",
  items: [] as CustomOrderDraftItem[],
};

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
if (initialOrderFilterParams.has("statuses")) {
  const requestedStatuses = new Set(
    String(initialOrderFilterParams.get("statuses") || "")
      .split(",")
      .map((status) => status.trim())
      .filter((status): status is OrderStatus =>
        ORDER_STATUS_OPTIONS.some((option) => option.value === status)
      )
  );
  selectedOrderStatusFilters = requestedStatuses;
}
let draftOrderStatusFilters = new Set<OrderStatus>(selectedOrderStatusFilters);

const syncOrderFiltersToUrl = () => {
  const url = new URL(window.location.href);
  const normalizedOrderId = orderIdFilter.trim();
  const normalizedEmail = orderEmailFilter.trim();
  if (normalizedOrderId) url.searchParams.set("filterOrderId", normalizedOrderId);
  else url.searchParams.delete("filterOrderId");
  if (normalizedEmail) url.searchParams.set("filterEmail", normalizedEmail);
  else url.searchParams.delete("filterEmail");
  url.searchParams.set("orderMode", orderTestFilter);
  url.searchParams.set(
    "statuses",
    ORDER_STATUS_OPTIONS
      .filter((option) => selectedOrderStatusFilters.has(option.value))
      .map((option) => option.value)
      .join(",")
  );
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
};

const applyOrderFiltersFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  orderIdFilter = String(params.get("filterOrderId") || "");
  orderEmailFilter = String(params.get("filterEmail") || "");
  const mode = String(params.get("orderMode") || "live");
  orderTestFilter = mode === "all" || mode === "test" ? mode : "live";
  selectedOrderStatusFilters = params.has("statuses")
    ? new Set<OrderStatus>(
        String(params.get("statuses") || "")
          .split(",")
          .filter((status): status is OrderStatus =>
            ORDER_STATUS_OPTIONS.some((option) => option.value === status)
          )
      )
    : getDefaultOrderStatusFilters();
  draftOrderStatusFilters = new Set<OrderStatus>(selectedOrderStatusFilters);
  refreshOrderFilters();
};

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
  [order.customerName, order.customerEmail].filter(Boolean).join(" · ") || "Customer details pending";

const getLineItemsLabel = (order: OrderRecord) =>
  order.lineItems.length
    ? order.lineItems.map((item) => `${item.quantity}x ${item.title}`).join(", ")
    : "No line items recorded";

const isTestOrder = (order: OrderRecord) =>
  order.stripeMode === "sandbox";

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
  if (!order.customerEmail) return "";
  if (order.publicOrderUrl) return order.publicOrderUrl;
  if (!order.id || !order.customerEmail) return "";
  const url = new URL("/order.html", window.location.origin);
  url.searchParams.set("order_id", order.id);
  url.searchParams.set("email", order.customerEmail);
  return url.toString();
};

const getAgreementHref = (order: OrderRecord) => order.agreementPublicUrl || "";

const orderProductSlugs = new Map<string, string>();
const orderProductTitleSlugs = new Map<string, string | null>();
const orderProductTitleIds = new Map<string, string | null>();
const orderProductIds = new Set<string>();
const orderProductImages = new Map<string, string>();
const orderProductTitleImages = new Map<string, string | null>();

const normalizeProductTitle = (value = "") =>
  String(value || "").trim().toLocaleLowerCase().replace(/\s+/g, " ");

const loadOrderProductLinks = async () => {
  if (orderProductLinksLoaded) return;
  orderProductLinksLoaded = true;
  try {
    const products = await loadProducts();
    (Array.isArray(products) ? products : [])
      .forEach((product) => {
        const productId = String(product?.id || "").trim();
        const slug = String(product?.slug || productId).trim();
        const normalizedTitle = normalizeProductTitle(product?.title);
        if (productId) {
          orderProductIds.add(productId);
        }
        const imageUrl = String(product?.imageUrl || "").trim();
        if (productId && imageUrl) {
          orderProductImages.set(productId, imageUrl);
        }
        if (normalizedTitle && imageUrl) {
          orderProductTitleImages.set(
            normalizedTitle,
            orderProductTitleImages.has(normalizedTitle) ? null : imageUrl
          );
        }
        if (productId && slug && product?.active) {
          orderProductSlugs.set(productId, slug);
        }
        if (normalizedTitle && slug && product?.active) {
          orderProductTitleSlugs.set(
            normalizedTitle,
            orderProductTitleSlugs.has(normalizedTitle) ? null : slug
          );
        }
        if (normalizedTitle && productId) {
          orderProductTitleIds.set(
            normalizedTitle,
            orderProductTitleIds.has(normalizedTitle) ? null : productId
          );
        }
      });
    refreshOrderModal();
  } catch (error) {
    orderProductLinksLoaded = false;
    console.warn("Failed to load order product links", error);
  }
};

const getProductHref = (productId = "", title = "") => {
  const slug =
    orderProductSlugs.get(String(productId || "").trim())
    || orderProductTitleSlugs.get(normalizeProductTitle(title))
    || "";
  return slug ? `../../product/${encodeURIComponent(slug)}` : "";
};

const getProductAdminHref = (productId = "", title = "") => {
  const normalizedProductId = String(productId || "").trim();
  const resolvedProductId =
    (normalizedProductId && orderProductIds.has(normalizedProductId) ? normalizedProductId : "")
    || orderProductTitleIds.get(normalizeProductTitle(title))
    || "";
  return resolvedProductId
    ? `../products/index.html?productId=${encodeURIComponent(resolvedProductId)}`
    : "";
};

const getProductImageUrl = (productId = "", title = "") =>
  orderProductImages.get(String(productId || "").trim())
  || orderProductTitleImages.get(normalizeProductTitle(title))
  || "";

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
  syncOrderFiltersToUrl();
};

const toggleDraftOrderStatusFilter = (status: OrderStatus, checked: boolean) => {
  if (checked) {
    draftOrderStatusFilters.add(status);
  } else {
    draftOrderStatusFilters.delete(status);
  }
  refreshOrderStatusFilterModal();
};

const areAllDraftOrderStatusesSelected = () =>
  ORDER_STATUS_OPTIONS.every((option) => draftOrderStatusFilters.has(option.value));

const toggleAllDraftOrderStatusFilters = () => {
  draftOrderStatusFilters = areAllDraftOrderStatusesSelected()
    ? new Set<OrderStatus>()
    : new Set<OrderStatus>(ORDER_STATUS_OPTIONS.map((option) => option.value));
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

const getMarkPaidCashUrl = () =>
  getAdminOrderActionUrl("/api/admin/orders/mark-paid-cash", "markOrderPaidByCash");

const getLinkOrderLedgerPaymentUrl = () =>
  getAdminOrderActionUrl("/api/admin/orders/link-ledger-payment", "linkOrderLedgerPayment");

const getCreateOrderUrl = () =>
  getAdminOrderActionUrl("/api/admin/orders/create", "createCustomOrder");

const getUpdateOrderUrl = () =>
  getAdminOrderActionUrl("/api/admin/orders/update", "updateCustomOrder");

const getImportOrderCustomerUrl = () =>
  getAdminOrderActionUrl("/api/admin/orders/import-customer", "importOrderCustomer");

const canEditCustomOrder = (order: OrderRecord) =>
  order.orderType === "custom_order" && ["checkout_created", "closed"].includes(order.status);

const loadCustomOrderCatalog = () => {
  loadProducts().then((products) => {
    customOrderCatalog = (Array.isArray(products) ? products : []).filter((product) => product.active);
    refreshOrderModal();
  }).catch(() => toast.error("Could not load the product catalog."));
};

const getCustomOrderFormState = () => JSON.stringify({
  customerName: customOrderDraft.customerName,
  customerEmail: customOrderDraft.customerEmail,
  amountShipping: customOrderDraft.amountShipping,
  items: customOrderDraft.items,
  stripeMode: customOrderStripeMode,
});

const openCreateOrderModal = () => {
  discardOrderChangesPending = false;
  pendingEditNavigation = null;
  editReturnOrderId = "";
  customOrderDraft = {
    customerName: "",
    customerEmail: "",
    amountShipping: "",
    items: [],
  };
  customOrderProductSearch = "";
  customOrderProductLookupOpen = false;
  customOrderCustomerSearch = "";
  customOrderCustomerLookupOpen = false;
  selectedCustomOrderCustomerEmail = "";
  editingCustomOrderId = "";
  editingCustomOrderStripeMode = "";
  editingCustomOrderStatus = "";
  customOrderStripeMode = "live";
  initialCustomOrderFormState = getCustomOrderFormState();
  customOrderRequestKey = crypto.randomUUID();
  createOrderModalOpen = true;
  refreshOrderModal();
  loadCustomOrderCatalog();
};

const openEditOrderModal = (order: OrderRecord) => {
  const latestOrder = orders$.find((item) => item.id === order.id);
  if (!latestOrder) { toast.info("This order is no longer available."); return; }
  order = latestOrder;
  if (!canEditCustomOrder(order)) {
    toast.info("Only unpaid or closed custom orders can be edited.");
    return;
  }
  discardOrderChangesPending = false;
  pendingEditNavigation = null;
  editReturnOrderId = selectedOrderId === order.id ? order.id : "";
  customOrderDraft = {
    customerName: order.customerName || "",
    customerEmail: order.customerEmail || "",
    amountShipping: order.amountShipping ? (order.amountShipping / 100).toFixed(2) : "",
    items: order.lineItems.map((item) => ({
      productId: String(item.productId || ""),
      variationId: String(item.variationId || ""),
      badgeName: item.badgeName || item.title.split(" — Name: ")[1] || "",
      title: item.title,
      unitAmount: Number(item.unitAmount) || 0,
      currency: item.currency || order.currency || "usd",
      quantity: Math.max(1, Number(item.quantity) || 1),
      imageUrl: getProductImageUrl(String(item.productId || ""), item.title),
    })),
  };
  customOrderProductSearch = "";
  customOrderProductLookupOpen = false;
  customOrderCustomerSearch = "";
  customOrderCustomerLookupOpen = false;
  selectedCustomOrderCustomerEmail = "";
  editingCustomOrderId = order.id;
  editingCustomOrderStripeMode = order.stripeMode;
  editingCustomOrderStatus = order.status;
  customOrderStripeMode = order.stripeMode === "sandbox" ? "sandbox" : "live";
  initialCustomOrderFormState = getCustomOrderFormState();
  customOrderRequestKey = crypto.randomUUID();
  createOrderModalOpen = true;
  closeOrderModal(false);
  refreshOrderModal();
  loadCustomOrderCatalog();
};

const keepEditingOrder = () => {
  discardOrderChangesPending = false;
  pendingEditNavigation = null;
  syncOrderUrl(editingCustomOrderId, true);
  refreshOrderModal();
};

const closeCreateOrderModal = (discardChanges: unknown = false) => {
  if (createOrderLoading) return;
  if (discardChanges !== true && getCustomOrderFormState() !== initialCustomOrderFormState) {
    discardOrderChangesPending = true;
    refreshOrderModal();
    return;
  }
  const returnOrderId = editReturnOrderId;
  const navigation = pendingEditNavigation;
  createOrderModalOpen = false;
  discardOrderChangesPending = false;
  pendingEditNavigation = null;
  editingCustomOrderId = "";
  editReturnOrderId = "";
  editingCustomOrderStripeMode = "";
  editingCustomOrderStatus = "";
  if (navigation) {
    syncOrderUrl(navigation.orderId, true);
    if (navigation.orderId) openOrderModal(navigation.orderId, false);
    else closeOrderModal(false);
  } else if (returnOrderId && orders$.value.some((order: OrderRecord) => order.id === returnOrderId)) {
    openOrderModal(returnOrderId, false);
  } else refreshOrderModal();
};

const createCustomOrder = async (keepOpen = false) => {
  if (createOrderLoading) return;
  const user = currentAuthUser || firebaseAuth.currentUser;
  if (!user || typeof user.getIdToken !== "function") {
    toast.error("Sign in again to create an order.");
    return;
  }
  if (!customOrderDraft.items.length) {
    toast.error("At least one catalog item is required.");
    return;
  }

  try {
    for (const item of customOrderDraft.items) {
      if (customOrderCatalog.some((product) => product.id === item.productId && isNameBadgeProduct(product))) {
        item.badgeName = validateBadgeName(item.badgeName);
      }
    }
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Enter a badge name.");
    return;
  }
  const submissionState = getCustomOrderFormState();
  if (lastCustomOrderSubmission && lastCustomOrderSubmission !== submissionState) customOrderRequestKey = crypto.randomUUID();
  lastCustomOrderSubmission = submissionState;
  createOrderLoading = true;
  refreshOrderModal();
  try {
    const token = await user.getIdToken();
    const isEditing = Boolean(editingCustomOrderId);
    const editedOrderId = editingCustomOrderId;
    const response = await fetch(isEditing ? getUpdateOrderUrl() : getCreateOrderUrl(), {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "X-Idempotency-Key": customOrderRequestKey },
      body: JSON.stringify({
        ...customOrderDraft,
        orderId: editingCustomOrderId,
        stripeMode: customOrderStripeMode,
        cartItems: customOrderDraft.items.map((item) => ({
          productId: item.productId,
          variationId: item.variationId,
          badgeName: item.badgeName || "",
          quantity: item.quantity,
        })),
        amountShipping: Math.round((Number(customOrderDraft.amountShipping) || 0) * 100),
        currency: "usd",
        sourceUrl: window.location.origin,
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(String(payload?.error || "Failed to create custom order."));
    const checkoutUrl = orderCheckoutLink({id:String(payload?.orderId||""),checkoutSessionId:String(payload?.checkoutSessionId||""),checkoutLinkSessionId:String(payload?.checkoutLinkSessionId||"")});
    if (checkoutUrl && navigator.clipboard) {
      await navigator.clipboard.writeText(checkoutUrl).catch(() => {});
    }
    customOrderRequestKey = crypto.randomUUID();
    discardOrderChangesPending = false;
    pendingEditNavigation = null;
    if (keepOpen) {
      editingCustomOrderId = String(payload?.orderId || editingCustomOrderId);
      if (editReturnOrderId) editReturnOrderId = editingCustomOrderId;
      editingCustomOrderStripeMode = customOrderStripeMode;
      editingCustomOrderStatus = String(payload?.status || editingCustomOrderStatus);
      initialCustomOrderFormState = getCustomOrderFormState();
    } else {
      createOrderModalOpen = false;
      editReturnOrderId = "";
      editingCustomOrderId = "";
      editingCustomOrderStripeMode = "";
      editingCustomOrderStatus = "";
    }
    toast.success(isEditing
      ? payload?.closedOrderUpdated
        ? "Closed order updated. Its status and payment history were preserved."
        : "Custom order updated. Replacement payment link copied."
      : checkoutUrl ? "Custom order created. 🛒 Checkout 🔗 link copied." : "Custom order created.");
    const savedOrderId = String(payload?.orderId || editedOrderId || "");
    if (!keepOpen && savedOrderId) openOrderModal(savedOrderId);
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Failed to create custom order.", { duration: 10000 });
  } finally {
    createOrderLoading = false;
    refreshOrderModal();
  }
};

const getSelectedOrder = () =>
  orders$.find((order) => order.id === selectedOrderId) || null;

const getLinkedLedgerEntry = (order: OrderRecord) => {
  const explicitId = order.ledgerEntryId || order.cashLedgerEntryId;
  return ledgerEntries$.value.find((entry: LedgerEntry) =>
    entry.id === explicitId || entry.orderId === order.id || entry.id === `cash_order_${order.id}`
  ) || null;
};

const getLedgerPaymentMatches = (order: OrderRecord) => {
  const needle = ledgerPaymentSearch.trim().toLowerCase();
  if (needle.length < 2) return [];
  return ledgerEntries$.value.filter((entry: LedgerEntry) => {
    if ((Number(entry.amount) || 0) <= 0) return false;
    if (entry.orderId && entry.orderId !== order.id) return false;
    return [entry.id, entry.title, entry.moneyAccountTitle, entry.applicableDate, entry.amount]
      .some((value) => String(value || "").toLowerCase().includes(needle));
  }).slice(0, 12);
};

const refreshOrderModal = () =>
  orderModal$.next((Number(orderModal$.value) || 0) + 1);

const openOrderModal = (orderId: string, updateUrl = true) => {
  privateOrderImage = "";
  selectedOrderId = orderId;
  if (updateUrl) {
    syncOrderUrl(orderId);
  }
  refreshOrderModal();
};

const closeOrderModal = (updateUrl = true) => {
  privateOrderImage = "";
  selectedOrderId = "";
  ledgerPaymentSearch = "";
  if (updateUrl) {
    syncOrderUrl("");
  }
  refreshOrderModal();
};

const syncModalFromUrl = () => {
  const orderId = getOrderIdFromUrl();
  if (createOrderModalOpen) {
    if (createOrderLoading) { syncOrderUrl(editingCustomOrderId, true); return; }
    pendingEditNavigation = { orderId };
    if (getCustomOrderFormState() !== initialCustomOrderFormState) {
      discardOrderChangesPending = true;
      syncOrderUrl(editingCustomOrderId, true);
      refreshOrderModal();
    } else closeCreateOrderModal(true);
    return;
  }
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

const DetailItem = tag((
  label: string,
  value = "",
) => {
  DetailItem.updates(x => [label, value] = x)

  return div.class`orders-detail-item`(
    span.class`orders-detail-label`(_=> label),
    span.class`orders-detail-value`(_=> value || "—")
  )
});

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
    `Cancel order ${order.id}? For an unpaid custom order, its payment session is retired first. Paid or processing payments cannot be canceled here. No refund is issued.`
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
    `Complete order ${order.id}? An unpaid custom order’s payment session is retired first. A paid order keeps its payment history; no refund is issued.`
  );
  if (!confirmed) return;

  const user = currentAuthUser || firebaseAuth.currentUser;
  if (!user || typeof user.getIdToken !== "function") {
    toast.error("Sign in again to complete this order.");
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
      throw new Error(String(payload?.error || "Failed to complete order."));
    }

    toast.success(`Completed order ${order.id}. The order is now closed.`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to complete order.";
    toast.error(message, { duration: 10000 });
  } finally {
    closeOrderLoadingId = "";
    orderModal$.next((Number(orderModal$.value) || 0) + 1);
  }
};

const markOrderPaidByCash = async (order: OrderRecord) => {
  if (!order?.id || cashPaymentLoadingId) return;
  if (order.status === "paid") {
    toast.info("This order is already paid.");
    return;
  }
  if (["closed", "canceled"].includes(order.status)) {
    toast.error("Canceled or completed orders cannot be marked paid.");
    return;
  }
  const confirmed = window.confirm(
    `Mark order ${order.id} paid by cash for ${formatMoney(order.amountTotal, order.currency)}? This will post the payment to the Cash money account.`
  );
  if (!confirmed) return;

  const user = currentAuthUser || firebaseAuth.currentUser;
  if (!user || typeof user.getIdToken !== "function") {
    toast.error("Sign in again to record this cash payment.");
    return;
  }

  cashPaymentLoadingId = order.id;
  refreshOrderModal();
  try {
    const token = await user.getIdToken();
    const response = await fetch(getMarkPaidCashUrl(), {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order.id }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(String(payload?.error || "Failed to record cash payment."));
    toast.success(`Order ${order.id} was marked paid and posted to Cash.`);
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Failed to record cash payment.", { duration: 10000 });
  } finally {
    cashPaymentLoadingId = "";
    refreshOrderModal();
  }
};

const linkExistingLedgerPayment = async (order: OrderRecord, requestedLedgerEntryId = "") => {
  if (!order?.id || ledgerPaymentLinkLoadingId) return;
  const ledgerEntryId = requestedLedgerEntryId.trim();
  if (!ledgerEntryId || ledgerEntryId === order.ledgerEntryId) return;
  const user = currentAuthUser || firebaseAuth.currentUser;
  if (!user || typeof user.getIdToken !== "function") {
    toast.error("Sign in again to link this payment.");
    return;
  }
  ledgerPaymentLinkLoadingId = order.id;
  refreshOrderModal();
  try {
    const token = await user.getIdToken();
    const response = await fetch(getLinkOrderLedgerPaymentUrl(), {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order.id, ledgerEntryId }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(String(payload?.error || "Failed to link payment."));
    toast.success(`Linked ledger payment ${ledgerEntryId} to order ${order.id}.`);
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Failed to link payment.", { duration: 10000 });
  } finally {
    ledgerPaymentLinkLoadingId = "";
    refreshOrderModal();
  }
};

const findCustomerByEmail = (email = "") => {
  const normalized = String(email || "").trim().toLowerCase();
  return customers$.value.find((customer: CustomerRecord) => customer.emailNormalized === normalized) || null;
};

const getCustomerAdminHref = (customer: CustomerRecord) =>
  `../customers/index.html?customerId=${encodeURIComponent(customer.id)}`;

const importOrderCustomer = async (order: OrderRecord) => {
  if (!order?.id || importCustomerLoadingOrderId) return;
  const user = currentAuthUser || firebaseAuth.currentUser;
  if (!user || typeof user.getIdToken !== "function") {
    toast.error("Sign in again to import this customer.");
    return;
  }
  importCustomerLoadingOrderId = order.id;
  refreshOrderModal();
  try {
    const token = await user.getIdToken();
    const response = await fetch(getImportOrderCustomerUrl(), {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order.id }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(String(payload?.error || "Failed to import customer."));
    toast.success(payload?.created ? "Customer created from order." : "Existing customer matched by email.");
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Failed to import customer.");
  } finally {
    importCustomerLoadingOrderId = "";
    refreshOrderModal();
  }
};

const managePrivateOrderImage = async (order: OrderRecord, file?: File) => {
  if (imageBusy) return;
  if (file && (file.size > 2*1024*1024 || !["image/png","image/jpeg","image/webp"].includes(file.type))) { toast.error("Choose a PNG, JPEG, or WebP image up to 2MB."); return; }
  imageBusy = true;
  try {
    refreshOrderModal();
    const user = currentAuthUser || firebaseAuth.currentUser;
    if (!user?.getIdToken) throw new Error("Sign in required.");
    const token = await user.getIdToken();
    const url = getAdminOrderActionUrl("/api/admin/orders/image", "manageOrderImage");
    let body: string | undefined;
    if (file) {
      const bytes = new Uint8Array(await file.arrayBuffer());
      let binary = ""; for (const byte of bytes) binary += String.fromCharCode(byte);
      body = JSON.stringify({orderId:order.id,mime:file.type,base64:btoa(binary)});
    }
    const response = await fetch(file ? url : `${url}?orderId=${encodeURIComponent(order.id)}`, {
      method:file ? "POST" : "GET", headers:{Authorization:`Bearer ${token}`, "Content-Type":"application/json"}, body,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Image request failed.");
    if (file) { privateOrderImage = ""; toast.success("Private order image attached."); }
    else if (selectedOrderId === order.id && ["image/png","image/jpeg","image/webp"].includes(data.mime)) privateOrderImage = `data:${data.mime};base64,${data.base64}`;
  } catch (error) { toast.error(error instanceof Error ? error.message : "Image request failed."); }
  finally { imageBusy = false; refreshOrderModal(); }
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
      headerActions: () => button.type`button`.class`ghost-button`
        .disabled(() => !order || !canEditCustomOrder(order))
        .attr("title", order && canEditCustomOrder(order) ? "Edit this order" : "Only unpaid or closed custom orders can be edited")
        .onClick(() => { const current = getSelectedOrder(); if (current) openEditOrderModal(current); })("✏️ Edit"),
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
                DetailItem("Payment method", order.paymentMethod || (order.paymentIntentId ? "Stripe" : "—")),
                DetailItem("Stripe mode", order.stripeMode || "—")
              ),
              div.class`orders-detail-section`(
                h2.class`orders-detail-section-title`("👤 Customer"),
                DetailItem("Name", order.customerName || "Customer details pending"),
                DetailItem("Email", order.customerEmail),
                DetailItem("Created", formatDate(order.createdAt)),
                DetailItem("Updated", formatDate(order.updatedAt)),
                DetailItem("Paid", order.paidAt ? formatDate(order.paidAt) : ""),
                div.class`orders-detail-actions`(
                  (() => {
                    const customer = findCustomerByEmail(order.customerEmail);
                    return customer
                      ? a.class`ghost-button`.href(getCustomerAdminHref(customer))("Open customer")
                      : button.type`button`.class`ghost-button`
                          .disabled(_=> !order.customerEmail || importCustomerLoadingOrderId === order.id)
                          .onClick(() => importOrderCustomer(order))(
                            _=> importCustomerLoadingOrderId === order.id ? "Importing..." : "Import customer"
                          );
                  })()
                )
              ),
              div.class`orders-detail-section orders-detail-section-wide`(
                h2.class`orders-detail-section-title`("Items"),
                order.lineItems.length
                  ? div.class`orders-detail-lines`(
                      order.lineItems.map((item) => {
                        const productHref = getProductHref(item.productId, item.title);
                        const productAdminHref = getProductAdminHref(item.productId, item.title);
                        const productImageUrl = getProductImageUrl(item.productId, item.title);
                        return div.class`orders-detail-line`(
                          div.class`order-product-line-main`(
                            productImageUrl
                              ? img.class`order-product-thumbnail`.src(productImageUrl).alt("")()
                              : null,
                            div(
                              productHref
                                ? a
                                    .class`orders-detail-line-title orders-detail-line-link`
                                    .href(productHref)(item.title)
                                : span.class`orders-detail-line-title`(item.title),
                              span.class`orders-detail-line-meta`(
                                `qty ${item.quantity}`,
                                item.productId ? ` · product ${item.productId}` : "",
                                item.variationId ? ` · option ${item.variationId}` : ""
                              )
                            )
                          ),
                          productAdminHref
                            ? a
                                .class`orders-detail-line-admin-link`
                                .href(productAdminHref)("Edit product")
                            : null
                        );
                      })
                    )
                  : p.class`orders-meta`("No line items recorded.")
              ),
              order.agreementId || order.agreementPublicUrl
                ? div.class`orders-detail-section orders-detail-section-wide`(
                    h2.class`orders-detail-section-title`("📄 Agreement"),
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
                h2.class`orders-detail-section-title`("📒 Payment ledger"),
                (() => {
                  const linkedEntry = getLinkedLedgerEntry(order);
                  if (linkedEntry) {
                    const href = `../accounting/ledger.html?entry=${encodeURIComponent(linkedEntry.id)}`;
                    return div(
                      div.class`orders-detail-item`(
                        span.class`orders-detail-label`("Ledger payment"),
                        a.class`orders-detail-value orders-detail-link`.href(href)(
                          `${linkedEntry.title} · ${formatMoney(linkedEntry.amount * 100, order.currency)}`
                        )
                      ),
                      div.class`orders-detail-actions`(a.class`ghost-button`.href(href)("Open ledger payment"))
                    );
                  }
                  const matches = getLedgerPaymentMatches(order);
                  return div(
                    p.class`orders-meta`("No ledger payment is linked. Search by payment title, ID, account, date, or amount."),
                    input.class`manufacturer-input`.type`search`.placeholder`Search existing ledger payments`
                      .value(_=> ledgerPaymentSearch)
                      .onInput((event) => {
                        ledgerPaymentSearch = String(event.target.value || "");
                        refreshOrderModal();
                      })(),
                    ledgerPaymentSearch.trim().length >= 2
                      ? div.class`orders-detail-lines custom-order-product-results`(
                          matches.length
                            ? matches.map((entry: LedgerEntry) =>
                                div.class`orders-detail-line`(
                                  div.class`ledger-title-stack`(
                                    span.class`orders-detail-line-title`(entry.title || entry.id),
                                    span.class`orders-detail-line-meta`(`${formatMoney(entry.amount * 100, order.currency)} · ${entry.applicableDate} · ${entry.moneyAccountTitle} · ${entry.id}`)
                                  ),
                                  button.type`button`.class`ghost-button`
                                    .disabled(_=> ledgerPaymentLinkLoadingId === order.id)
                                    .onClick(() => linkExistingLedgerPayment(order, entry.id))("Link payment")
                                ).key(entry.id)
                              )
                            : p.class`orders-meta`("No matching unlinked credit payments found.")
                        )
                      : null
                  );
                })()
              ),
              div.class`orders-detail-section orders-detail-section-wide`(
                h2.class`orders-detail-section-title`("Private order image"),
                p.class`orders-meta`("Visible to admins only. PNG, JPEG, or WebP up to 2MB. Uploading another image replaces the displayed image."),
                input.type`file`.attr("accept", "image/png,image/jpeg,image/webp").disabled(() => imageBusy)
                  .onChange((event) => { const file = event.target.files?.[0]; if (file) void managePrivateOrderImage(order, file); })(),
                button.type`button`.class`ghost-button`.disabled(() => imageBusy || !order.orderImage)
                  .onClick(() => managePrivateOrderImage(order))("View private image"),
                div(_=> privateOrderImage ? img.src(privateOrderImage).alt("Private order reference").style("max-width:100%;max-height:320px;object-fit:contain")() : null)
              ),
              div.class`orders-detail-section orders-detail-section-wide`(
                h2.class`orders-detail-section-title`("🛒 Checkout 🔗 link"),
                p.class`orders-meta`("Share the website checkout link. It displays current public product images; private order images remain admin-only. Starting payment retires the previous unpaid Stripe link."),
                p.class`orders-meta`.style("overflow-wrap:anywhere;user-select:all")(orderCheckoutLink(order) || "Checkout link unavailable."),
                button.type`button`.class`ghost-button`.disabled(() => !orderCheckoutLink(order) || order.status !== "checkout_created")
                  .onClick(async () => { try { await navigator.clipboard.writeText(orderCheckoutLink(order)); toast.success("🛒 Checkout 🔗 link copied."); } catch { toast.info("Select and copy the 🛒 Checkout 🔗 link above."); } })("Copy 🛒 Checkout 🔗 link"),
                a.class`ghost-button`.href(orderCheckoutLink(order)).target`_blank`.rel`noreferrer`("🛒 Checkout 🔗 link")
              ),
              div.class`orders-detail-section orders-detail-section-wide`(
                h2.class`orders-detail-section-title`("🐠 Stripe"),
                DetailItem("Checkout session", order.checkoutSessionId),
                DetailLink("Payment intent", order.paymentIntentId, getStripePaymentIntentHref(order)),
                DetailItem("Stripe customer", order.stripeCustomerId),
                DetailLink("Latest event", order.latestStripeEventId, getStripeEventHref(order)),
                // DetailItem("Notification email", order.notificationEmail),
                DetailItem("Notification status", order.notificationEmailStatus),
                DetailItem("Admin order URL", order.adminOrderUrl),
                div.class`orders-detail-actions`(
                  button.type`button`.class`ghost-button`
                    .disabled(_=> !canEditCustomOrder(order))
                    .attr("title", canEditCustomOrder(order) ? "Edit order" : "Only unpaid or closed custom orders can be edited")
                    .onClick(() => openEditOrderModal(order))("✏️ Edit Order"),
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
              order.taxExemptCustomer
                ? div.class`orders-detail-section orders-detail-section-wide organization-order-detail`(
                    h2.class`orders-detail-section-title`("🏫 Tax-exempt organization order"),
                    DetailItem("Organization", order.organizationName),
                    DetailItem("Organization request", order.organizationCheckoutRequestId),
                    DetailItem("Certificate number", order.exemptionCertificateNumber),
                    DetailItem("Stripe customer", order.stripeCustomerId)
                  )
                : null,
              div.class`orders-detail-section orders-detail-section-wide`(
                h2.class`orders-detail-section-title`("📧 Resend Emails"),
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
              _=> !["paid", "canceled", "closed"].includes(order.status) &&
                div.class`orders-detail-section orders-detail-section-wide orders-info-section`(
                  h2.class`orders-detail-section-title`("Cash Payment"),
                  p.class`orders-meta`(`Record ${formatMoney(order.amountTotal, order.currency)} as received in cash. A Cash money account will be created automatically if needed.`),
                  div.class`orders-detail-actions`(
                    button.type`button`.class`add-button`
                      .disabled(_=> cashPaymentLoadingId === order.id || order.amountTotal <= 0)
                      .onClick(() => markOrderPaidByCash(order))(
                        _=> cashPaymentLoadingId === order.id ? "Recording..." : "Mark paid by cash"
                      )
                  )
                ),
              _=> !['canceled', 'closed'].includes(order.status) && 
                div.class`orders-detail-section orders-detail-section-wide orders-info-section`(
                  h2.class`orders-detail-section-title`("Complete Order"),
                  p.class`orders-meta`("For unpaid custom orders, closing retires the payment session first. Paid orders retain their payment history. No refund is issued."),
                  div.class`orders-detail-actions`(
                    button
                      .type`button`
                      .class`add-button`
                      .disabled(_=> order.status === "closed" || closeOrderLoadingId === order.id)
                      .onClick(() => closeOrder(order))(
                      _=> order.status === "closed"
                        ? "Order completed"
                        : closeOrderLoadingId === order.id
                          ? "Completing..."
                          : "Complete order"
                    )
                  )
                ),
              _=> !['canceled', 'closed'].includes(order.status) && 
                div.class`orders-detail-section orders-detail-section-wide orders-danger-section`(
                  h2.class`orders-detail-section-title`("Cancel Order"),
                  p.class`orders-meta`("Canceling an unpaid custom order retires its payment session. Paid or processing payments cannot be canceled here. No refund is issued."),
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
                    p.class`orders-meta`("Delete this test order from the admin list. Live orders cannot be deleted here."),
                    div.class`orders-detail-actions`(
                      button
                        .type`button`
                        .class`ghost-button delete-button`
                        .disabled(_=> deleteOrderLoadingId === order.id)
                        .onClick(() => deleteTestOrder(order))(
                        _=> deleteOrderLoadingId === order.id ? "Deleting..." : "🗑️ Delete test order"
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
  if (stopCustomers) {
    stopCustomers();
    stopCustomers = null;
  }
  if (stopLedgerEntries) {
    stopLedgerEntries();
    stopLedgerEntries = null;
  }
};

const getCustomOrderProductMatches = () => {
  const needle = customOrderProductSearch.trim().toLowerCase();
  if (needle.length < 3) return [];
  return customOrderCatalog.filter((product) =>
    [product.title, product.id, product.slug]
      .some((value) => String(value || "").toLowerCase().includes(needle))
  ).slice(0, 12);
};

const getCustomOrderCustomerMatches = () => {
  const needle = customOrderCustomerSearch.trim().toLowerCase();
  if (needle.length < 2) return [];
  return customers$.value.filter((customer: CustomerRecord) =>
    [customer.name, customer.email, customer.phone]
      .some((value) => String(value || "").toLowerCase().includes(needle))
  ).slice(0, 10);
};

const selectCustomOrderCustomer = (customer: CustomerRecord) => {
  customOrderDraft.customerName = customer.name;
  customOrderDraft.customerEmail = customer.email;
  selectedCustomOrderCustomerEmail = customer.emailNormalized;
  customOrderCustomerSearch = "";
  refreshOrderModal();
};

const clearCustomOrderCustomer = () => {
  selectedCustomOrderCustomerEmail = "";
  customOrderDraft.customerName = "";
  customOrderDraft.customerEmail = "";
  refreshOrderModal();
};

const addCustomOrderItem = (product: ProductItem, variationId = "") => {
  const variation = (product.variations || []).find((item) => item.id === variationId);
  const existing = customOrderDraft.items.find((item) =>
    item.productId === product.id && item.variationId === variationId
  );
  if (existing && !isNameBadgeProduct(product)) {
    existing.quantity = Math.min(99, existing.quantity + 1);
  } else {
    customOrderDraft.items.push({
      productId: product.id,
      variationId,
      title: variation ? `${product.title} (${variation.label})` : product.title,
      unitAmount: variation?.unitAmount ?? product.unitAmount,
      currency: product.currency || "usd",
      quantity: 1,
      imageUrl: product.imageUrl || "",
    });
  }
  refreshOrderModal();
};

const updateCustomOrderItemQuantity = (index: number, value: unknown) => {
  const item = customOrderDraft.items[index];
  if (!item) return;
  item.quantity = Math.max(1, Math.min(99999, Math.round(Number(value) || 1)));
  refreshOrderModal();
};

const isCustomOrderBadgeItem = (item: CustomOrderDraftItem) =>
  Boolean(item.badgeName) || customOrderCatalog.some((product) =>
    product.id === item.productId && isNameBadgeProduct(product));

const addCustomOrderBadgeName = () => {
  const item = [...customOrderDraft.items].reverse().find(isCustomOrderBadgeItem);
  if (!item) return;
  customOrderDraft.items.push({ ...item, badgeName: "", quantity: 1 });
  refreshOrderModal();
};

const removeCustomOrderItem = (index: number) => {
  customOrderDraft.items.splice(index, 1);
  refreshOrderModal();
};

const CreateOrderModal = () =>
  subscribe(orderModal$, () => Modal({
    modalOpen: createOrderModalOpen,
    title: editingCustomOrderId ? "Edit Order" : "Add Custom Order",
    className: "ledger-modal orders-create-modal",
    cardClassName: "ledger-modal-card",
    bodyClassName: "orders-detail-body",
    onClose: closeCreateOrderModal,
    content: () => div.class`agreement-create-form`(
      _=> discardOrderChangesPending ? div.class`orders-detail-section`.attr("role", "alert")(
        p("Discard your unsaved changes?"),
        div.class`auth-actions`(
          button.type`button`.class`ghost-button`.onClick(keepEditingOrder)("Keep editing"),
          button.type`button`.class`delete-button`.onClick(() => closeCreateOrderModal(true))("Discard changes")
        )
      ) : null,
      _=> editingCustomOrderId ? p.class`orders-meta`(`Order ID: ${editingCustomOrderId}`) : null,
      p.class`orders-meta`(editingCustomOrderId
        ? editingCustomOrderStatus === "closed"
          ? "Update this closed order without reopening it or changing its payment history."
          : "Update this unpaid order. Its previous Stripe checkout will be replaced."
        : "Create a private order. Customer details may be left pending; the recipient must provide their name and email at Stripe checkout. Copy the 🛒 Checkout 🔗 link to share it."),
      button.type`button`.class`ghost-button`.onClick(() => {
        customOrderCustomerLookupOpen = !customOrderCustomerLookupOpen;
        refreshOrderModal();
      })(_=> customOrderCustomerLookupOpen ? "Hide customer lookup" : "👤 Customer lookup"),
      _=> customOrderCustomerLookupOpen
        ? div.class`orders-detail-section orders-detail-section-wide`(
            h2.class`orders-detail-section-title`("👤 Customer lookup"),
            _=> selectedCustomOrderCustomerEmail
              ? div.class`orders-detail-actions`(
                  p.class`orders-meta`(`Using saved customer: ${customOrderDraft.customerName || customOrderDraft.customerEmail} · ${customOrderDraft.customerEmail}`),
                  button.type`button`.class`ghost-button`.onClick(clearCustomOrderCustomer)("Use manual details instead")
                )
              : input.class`manufacturer-input`.type`search`.placeholder`Search saved customers by name, email, or phone`
                  .value(_=> customOrderCustomerSearch)
                  .onInput((event) => {
                    customOrderCustomerSearch = String(event.target.value || "");
                    refreshOrderModal();
                  })(),
            _=> !selectedCustomOrderCustomerEmail && customOrderCustomerSearch.trim().length >= 2
              ? div.class`orders-detail-lines custom-order-product-results`(
                  getCustomOrderCustomerMatches().length
                    ? getCustomOrderCustomerMatches().map((customer: CustomerRecord) =>
                        div.class`orders-detail-line`(
                          div.class`ledger-title-stack`(
                            span.class`orders-detail-line-title`(customer.name || customer.email),
                            span.class`orders-detail-line-meta`([customer.email, customer.phone].filter(Boolean).join(" · "))
                          ),
                          button.type`button`.class`ghost-button`.onClick(() => selectCustomOrderCustomer(customer))("Select")
                        ).key(customer.id)
                      )
                    : p.class`orders-meta`("No saved customers match. Enter the order details manually below.")
                )
              : null
          )
        : null,
      div.class`agreement-create-grid`(
        label("Customer name (optional until checkout)", input.class`manufacturer-input`.type`text`.disabled(_=> Boolean(selectedCustomOrderCustomerEmail)).value(_=> customOrderDraft.customerName)
          .onInput((event) => { customOrderDraft.customerName = String(event.target.value || ""); })()),
        label("Customer email (optional until checkout)", input.class`manufacturer-input`.type`email`.disabled(_=> Boolean(selectedCustomOrderCustomerEmail)).value(_=> customOrderDraft.customerEmail)
          .onInput((event) => { customOrderDraft.customerEmail = String(event.target.value || ""); })()),
        label("Shipping Cost", input.class`manufacturer-input`.type`number`.attr("min", "0").attr("step", "0.01")
          .value(_=> customOrderDraft.amountShipping).onInput((event) => { customOrderDraft.amountShipping = String(event.target.value || ""); })())
      ),
      div.class`orders-detail-section orders-detail-section-wide`(
        h2.class`orders-detail-section-title`("Order items"),
        p.class`orders-meta`("For different badge names, use one row per name with qty = 1. Enter one name per field, not a comma-separated list. qty makes identical badges with that row’s name."),
        button.type`button`.class`ghost-button`.onClick(() => {
          customOrderProductLookupOpen = !customOrderProductLookupOpen;
          refreshOrderModal();
        })(_=> customOrderProductLookupOpen ? "Hide product lookup" : "Product lookup"),
        _=> customOrderProductLookupOpen
          ? div.class`orders-detail-section`(
              input.class`manufacturer-input`.type`search`.placeholder`Search by product name, code, or slug`
                .value(_=> customOrderProductSearch)
                .onInput((event) => {
                  customOrderProductSearch = String(event.target.value || "");
                  refreshOrderModal();
                })(),
              _=> customOrderProductSearch.trim().length < 3
                ? p.class`orders-meta`("Enter at least 3 characters to search the catalog.")
                : div.class`orders-detail-lines custom-order-product-results`(
                    getCustomOrderProductMatches().length
                      ? getCustomOrderProductMatches().map((product) => {
                          const variations = (product.variations || []).filter((variation) => variation.active);
                          return div.class`orders-detail-line custom-order-product-result`(
                            div.class`custom-order-product-details`(
                              product.imageUrl
                                ? img.class`order-product-thumbnail`.src(product.imageUrl).alt("")()
                                : null,
                              div(
                                span.class`orders-detail-line-title`(product.title),
                                span.class`orders-detail-line-meta`(`${product.id} · ${product.slug}`)
                              )
                            ),
                            variations.length
                              ? div.class`orders-detail-actions`(
                                  variations.map((variation) =>
                                    button.type`button`.class`ghost-button`.onClick(() => addCustomOrderItem(product, variation.id))(
                                      `${variation.label} · ${formatMoney(variation.unitAmount, product.currency)}`
                                    ).key(`${product.id}-${variation.id}`)
                                  )
                                )
                              : button.type`button`.class`ghost-button`.onClick(() => addCustomOrderItem(product))(
                                  `Add · ${formatMoney(product.unitAmount, product.currency)}`
                                )
                          ).key(product.id);
                        })
                      : p.class`orders-meta`("No matching products found.")
                  )
            )
          : null,
        _=> customOrderDraft.items.length
          ? div.class`orders-detail-lines`(
              customOrderDraft.items.map((item, index) =>
                div.class(() => `orders-detail-line custom-order-item-row${isCustomOrderBadgeItem(item) ? " custom-order-badge-row" : ""}`)(
                  div.class`order-product-line-main`(
                    item.imageUrl
                      ? img.class`order-product-thumbnail`.src(item.imageUrl).alt("")()
                      : null,
                    div(
                      span.class`orders-detail-line-title`(item.title),
                      span.class`orders-detail-line-meta`(`${formatMoney(item.unitAmount, item.currency)} each`)
                    )
                  ),
                  div.class`custom-order-item-controls`(
                    _=> isCustomOrderBadgeItem(item)
                      ? label.class`custom-order-badge-name-field`(
                          span(`Printed name · row ${index + 1} (1–15 characters)`),
                          input.class`manufacturer-input`.type`text`.attr("maxlength", "15").attr("required", "").placeholder`One name only`
                            .value(() => item.badgeName || "")
                            .onInput((event) => { item.badgeName = event.target.value; })()
                        ) : null,
                    label.class`custom-order-quantity-field`(
                      span("qty"),
                      input.class`manufacturer-input custom-order-quantity-input`.type`number`.attr("min", "1").attr("max", "99999")
                        .value(_=> String(item.quantity)).onInput((event) => updateCustomOrderItemQuantity(index, event.target.value))()
                    ),
                    button.type`button`.class`ghost-button delete-button`
                      .attr("aria-label", `Remove item ${index + 1}: ${item.title}`)
                      .attr("title", `Remove item ${index + 1}`)
                      .onClick(() => removeCustomOrderItem(index))("🗑️")
                  )
                ).key(`${item.productId}-${item.variationId}-${index}`)
              )
            )
          : p.class`orders-meta`("Search the catalog and add at least one product."),
        _=> customOrderDraft.items.some(isCustomOrderBadgeItem)
          ? button.type`button`.class`ghost-button`.onClick(addCustomOrderBadgeName)("+ Add another name")
          : null
      ),
      div.class`orders-detail-section orders-detail-section-wide`(
        h2.class`orders-detail-section-title`("Order mode"),
        div.class`orders-detail-actions`(
          span.class(_=> `pill ${customOrderStripeMode === "sandbox" ? "orders-test-pill" : "orders-status-paid"}`)(
            _=> customOrderStripeMode === "sandbox" ? "🧪 Test order" : "🟢 Live order"
          ),
          button.type`button`.class`ghost-button`
            .disabled(_=> createOrderLoading)
            .onClick(() => {
              customOrderStripeMode = customOrderStripeMode === "sandbox" ? "live" : "sandbox";
              refreshOrderModal();
            })(_=> {
              const targetMode = customOrderStripeMode === "sandbox" ? "live" : "test";
              return editingCustomOrderId ? `Move to ${targetMode} order` : `Create as ${targetMode} order`;
            })
        ),
        p.class`orders-meta`(_=> {
          if (editingCustomOrderId && customOrderStripeMode !== editingCustomOrderStripeMode) {
            return editingCustomOrderStatus === "closed"
              ? `This closed order will be recorded as a ${customOrderStripeMode === "sandbox" ? "test" : "live"} order.`
              : `Changing to ${customOrderStripeMode === "sandbox" ? "test" : "live"} mode will replace the unpaid order and its Stripe checkout.`;
          }
          return customOrderStripeMode === "sandbox"
            ? "This is a test order. Stripe sandbox payments do not collect real money."
            : "This is a live order and can collect a real payment.";
        })
      ),
      div.class`auth-actions`(
        button.type`button`.class`ghost-button`.disabled(_=> createOrderLoading).onClick(closeCreateOrderModal)("Cancel"),
        button.type`button`.class`add-button`
          .attr("data-pin-save", "true")
          .attr("title", "Hold Shift while clicking to save and keep this modal open")
          .disabled(_=> createOrderLoading)
          .onClick((event) => createCustomOrder(Boolean(event.shiftKey)))(
          _=> createOrderLoading
            ? editingCustomOrderId ? "Updating order..." : "Creating payment link..."
            : editingCustomOrderId
              ? editingCustomOrderStatus === "closed" ? "Save Order" : "Save Order & Copy Link"
              : "Create Order & Copy Link"
        )
      )
    ),
  }));

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
            syncOrderFiltersToUrl();
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
            syncOrderFiltersToUrl();
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
            syncOrderFiltersToUrl();
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
        div(
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
          div.class`auth-actions orders-status-filter-actions`(
            button
              .type`button`
              .class`ghost-button`
              .attr("aria-label", _=> areAllDraftOrderStatusesSelected()
                ? "Remove all order status filters"
                : "Select all order status filters")
              .onClick(toggleAllDraftOrderStatusFilters)(
                _=> areAllDraftOrderStatusesSelected() ? "Remove all" : "Select all"
              )
          )
        ),
    })
  );

export const OrdersApp = tag(() => [
  AdminNav(handleSignOut, currentUser),
  section.class`panel ledger-panel orders-panel`(
    div.class`ledger-header`(
      div.class`ledger-heading`(
        h1("🛎️ Orders"),
        p("Review checkout orders, payment status, and Stripe links.")
      ),
      button.type`button`.class`add-button`.onClick(openCreateOrderModal)("Add Order")
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
                      th("Total"),
                      th("Actions")
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
                            order.paidAt && order.status !== "paid"
                              ? span.class`pill ledger-status-pill orders-status-paid`("Paid")
                              : null,
                            isTestOrder(order)
                              ? span.class`pill orders-test-pill`("test")
                              : null,
                            order.taxExemptCustomer
                              ? span.class`pill organization-tax-exempt-pill`("tax exempt")
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
                        ),
                        td(
                          button.type`button`.class`ghost-button`
                            .disabled(_=> !canEditCustomOrder(order))
                            .attr("aria-label", `Edit order ${order.id}`)
                            .attr("title", canEditCustomOrder(order) ? "Edit order" : "Only unpaid or closed custom orders can be edited")
                            .onClick((event) => {
                              event.stopPropagation();
                              openEditOrderModal(order);
                            })("✏️")
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
    CreateOrderModal(),
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
    void loadOrderProductLinks();
    if (!stopOrders) {
      stopOrders = subscribeOrders((items) => {
        orders$.splice(0, orders$.length, ...items);
        if (selectedOrderId && !items.some((order) => order.id === selectedOrderId)) {
          syncModalFromUrl();
        } else if (!selectedOrderId && getOrderIdFromUrl()) {
          syncModalFromUrl();
        } else if (selectedOrderId) {
          refreshOrderModal();
        }
        if (authState.isAuthorized) {
          mountApp();
        }
      });
    }
    if (!stopCustomers) {
      stopCustomers = subscribeCustomers((items) => {
        customers$.splice(0, customers$.length, ...items);
        if (selectedOrderId || createOrderModalOpen) refreshOrderModal();
      });
    }
    if (!stopLedgerEntries) {
      stopLedgerEntries = subscribeLedgerEntries((items) => {
        ledgerEntries$.splice(0, ledgerEntries$.length, ...(Array.isArray(items) ? items : []));
        if (selectedOrderId) refreshOrderModal();
      });
    }
    mountApp();
  },
});
handleSignOut = adminShell.handleSignOut;

window.addEventListener("popstate", () => {
  applyOrderFiltersFromUrl();
  syncModalFromUrl();
});
