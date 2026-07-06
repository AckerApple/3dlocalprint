import { subscribeAgreements, subscribeOrders } from "../shared/firebase.js";
import {
  tag,
  tagElement,
  section,
  div,
  h1,
  h2,
  p,
  a,
  span,
  table,
  thead,
  tbody,
  tr,
  th,
  td,
  array,
  subscribe,
} from "taggedjs";
import { toast } from "../shared/toast.js";
import { AdminNav } from "../shared/AdminNav.tag.js";
import { replaceMountRoot } from "../shared/ssoMount.js";
import { startAdminAppShell } from "../shared/adminAppShell.js";
import type { AgreementRecord } from "../../types/agreement.js";
import type { OrderRecord } from "../../types/order.js";

let app = document.getElementById("attentionApp");
const appRoot = { current: app };
const orders$ = array<OrderRecord>([]);
const agreements$ = array<AgreementRecord>([]);
let stopOrders: null | (() => void) = null;
let stopAgreements: null | (() => void) = null;
let appMounted = false;
let currentUser: any = null;
let handleSignOut = () => Promise.resolve();

const MS_PER_DAY = 24 * 60 * 60 * 1000;

type AgreementAttentionState = "overdue" | "urgent" | "upcoming" | "later" | "missing";

const stopSubscriptions = () => {
  if (stopOrders) {
    stopOrders();
    stopOrders = null;
  }
  if (stopAgreements) {
    stopAgreements();
    stopAgreements = null;
  }
};

const getTime = (value = "") => {
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
};

const formatDate = (value = "") => {
  if (!value) return "Date missing";
  const [year, month, day] = value.split("-").map(Number);
  const date = year && month && day ? new Date(year, month - 1, day) : new Date(value);
  if (Number.isNaN(date.getTime())) return "Date missing";
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
};

const formatDateTime = (value = "") => {
  if (!value) return "Date missing";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date missing";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const formatMoney = (cents = 0, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "usd").toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((Math.max(0, Number(cents) || 0)) / 100);

const getDateOnly = (value = "") => {
  const [year, month, day] = String(value || "").split("-").map(Number);
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getTodayStart = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

const getDaysUntilAgreementEnd = (agreement: AgreementRecord) => {
  const endDate = getDateOnly(agreement.serviceEndDate);
  if (!endDate) return null;
  return Math.ceil((endDate.getTime() - getTodayStart().getTime()) / MS_PER_DAY);
};

const getAgreementAttentionState = (daysUntilEnd: number | null): AgreementAttentionState => {
  if (daysUntilEnd === null) return "missing";
  if (daysUntilEnd < 0) return "overdue";
  if (daysUntilEnd <= 7) return "urgent";
  if (daysUntilEnd <= 14) return "upcoming";
  return "later";
};

const getAgreementAttentionLabel = (daysUntilEnd: number | null) => {
  if (daysUntilEnd === null) return "date missing";
  if (daysUntilEnd < 0) return `${Math.abs(daysUntilEnd)} days overdue`;
  if (daysUntilEnd === 0) return "ends today";
  if (daysUntilEnd === 1) return "ends tomorrow";
  return `${daysUntilEnd} days left`;
};

const isOpenOrder = (order: OrderRecord) => order.status !== "closed" && order.status !== "canceled";
const isOpenAgreement = (agreement: AgreementRecord) =>
  agreement.status !== "expired" && agreement.status !== "canceled";

const getOpenOrders = (orders: OrderRecord[]) =>
  orders
    .filter(isOpenOrder)
    .sort((a, b) => getTime(b.updatedAt || b.createdAt) - getTime(a.updatedAt || a.createdAt));

const getOpenAgreements = (agreements: AgreementRecord[]) =>
  agreements
    .filter(isOpenAgreement)
    .sort((a, b) => {
      const aDays = getDaysUntilAgreementEnd(a);
      const bDays = getDaysUntilAgreementEnd(b);
      if (aDays === null && bDays === null) {
        return getTime(b.updatedAt || b.createdAt) - getTime(a.updatedAt || a.createdAt);
      }
      if (aDays === null) return 1;
      if (bDays === null) return -1;
      return aDays - bDays;
    });

const countEndingWithin = (agreements: AgreementRecord[], days: number) =>
  getOpenAgreements(agreements).filter((agreement) => {
    const daysUntilEnd = getDaysUntilAgreementEnd(agreement);
    return daysUntilEnd !== null && daysUntilEnd >= 0 && daysUntilEnd <= days;
  }).length;

const getOrderHref = (order: OrderRecord) => {
  const url = new URL("/admin/orders/index.html", window.location.origin);
  url.searchParams.set("orderId", order.id);
  return url.toString();
};

const getAgreementHref = (agreement: AgreementRecord) => {
  const url = new URL("/admin/agreements/index.html", window.location.origin);
  url.searchParams.set("agreementId", agreement.id);
  return url.toString();
};

const getOrderSummary = (order: OrderRecord) =>
  order.lineItems.length
    ? order.lineItems.map((item) => `${item.quantity}x ${item.title}`).join(", ")
    : "No line items recorded";

const MetricCard = (label: string, value: number, tone = "") =>
  div.class(_=> `attention-metric${tone ? ` attention-metric-${tone}` : ""}`)(
    span.class`attention-metric-value`(String(value)),
    span.class`attention-metric-label`(label)
  );

const OrderRows = (orders: OrderRecord[]) =>
  orders.slice(0, 10).map((order) =>
    tr.class`ledger-row attention-row`(
      td(
        div.class`ledger-title-stack`(
          a.class`ledger-title-cell orders-detail-link`.href(getOrderHref(order))(order.id),
          p.class`orders-meta`(getOrderSummary(order))
        )
      ),
      td(
        span.class(_=> `pill ledger-status-pill orders-status-${order.status}`)(
          order.status.replace(/_/g, " ")
        )
      ),
      td(
        div.class`ledger-title-stack`(
          span.class`ledger-title-cell`(
            [order.customerName, order.customerEmail].filter(Boolean).join(" · ") || "No customer recorded"
          ),
          p.class`orders-meta`(`Updated ${formatDateTime(order.updatedAt || order.createdAt)}`)
        )
      ),
      td(
        div.class`ledger-amount-stack`(
          span.class`ledger-amount-value ledger-amount-positive`(
            formatMoney(order.amountTotal, order.currency)
          )
        )
      )
    ).key(order.id)
  );

const AgreementRows = (agreements: AgreementRecord[]) =>
  agreements.slice(0, 10).map((agreement) => {
    const daysUntilEnd = getDaysUntilAgreementEnd(agreement);
    const attentionState = getAgreementAttentionState(daysUntilEnd);
    return tr.class`ledger-row attention-row`(
      td(
        div.class`ledger-title-stack`(
          a.class`ledger-title-cell orders-detail-link`.href(getAgreementHref(agreement))(
            agreement.clientBusiness || "Agreement"
          ),
          p.class`orders-meta`(agreement.id)
        )
      ),
      td(
        div.class`orders-status-stack`(
          span.class(_=> `pill ledger-status-pill agreements-status-${agreement.status}`)(
            agreement.status.replace(/_/g, " ")
          ),
          span.class(_=> `pill attention-pill attention-pill-${attentionState}`)(
            getAgreementAttentionLabel(daysUntilEnd)
          )
        )
      ),
      td(
        div.class`ledger-title-stack`(
          span.class`ledger-title-cell`(formatDate(agreement.serviceEndDate)),
          p.class`orders-meta`(`${formatDate(agreement.serviceStartDate)} - ${formatDate(agreement.serviceEndDate)}`)
        )
      ),
      td(
        div.class`ledger-amount-stack`(
          span.class`ledger-amount-value ledger-amount-positive`(
            formatMoney(agreement.amountTotal || agreement.yearlyAmount, agreement.currency)
          ),
          agreement.customerEmail ? p.class`orders-meta`(agreement.customerEmail) : null
        )
      )
    ).key(agreement.id);
  });

const AttentionSummary = (orders: OrderRecord[], agreements: AgreementRecord[]) => {
  const openOrders = getOpenOrders(orders);
  const openAgreements = getOpenAgreements(agreements);
  return div.class`attention-summary-grid`(
    MetricCard("open orders", openOrders.length),
    MetricCard("open agreements", openAgreements.length),
    MetricCard("ending within 7 days", countEndingWithin(agreements, 7), "urgent"),
    MetricCard("ending within 14 days", countEndingWithin(agreements, 14), "upcoming")
  );
};

export const AttentionApp = tag(() => [
  AdminNav(handleSignOut, currentUser),
  section.class`panel ledger-panel orders-panel attention-panel`(
    div.class`ledger-header`(
      div.class`ledger-heading`(
        h1("Attention"),
        p("Review open orders and agreements that need attention soon.")
      )
    ),
    subscribe(orders$, (orders) =>
      subscribe(agreements$, (agreements) =>
        div.class`attention-layout`(
          AttentionSummary(orders, agreements),
          div.class`attention-section`(
            div.class`attention-section-header`(
              h2("Open orders"),
              a.class`ghost-button`.href("../orders/index.html")("All orders")
            ),
            getOpenOrders(orders).length
              ? div.class`ledger-table-block`(
                  div.class`ledger-table-wrap`(
                    table.class`ledger-table orders-table attention-table`(
                      thead(
                        tr(
                          th("Order"),
                          th("Status"),
                          th("Customer"),
                          th("Total")
                        )
                      ),
                      tbody(OrderRows(getOpenOrders(orders)))
                    )
                  ),
                  p.class`ledger-table-hint`(`showing ${Math.min(10, getOpenOrders(orders).length)} of ${getOpenOrders(orders).length} open orders`)
                )
              : p.class`ledger-empty`("No open orders need attention.")
          ),
          div.class`attention-section`(
            div.class`attention-section-header`(
              h2("Agreement reviews"),
              a.class`ghost-button`.href("../agreements/index.html")("All agreements")
            ),
            getOpenAgreements(agreements).length
              ? div.class`ledger-table-block`(
                  div.class`ledger-table-wrap`(
                    table.class`ledger-table orders-table attention-table`(
                      thead(
                        tr(
                          th("Agreement"),
                          th("Review window"),
                          th("Service end"),
                          th("Value")
                        )
                      ),
                      tbody(AgreementRows(getOpenAgreements(agreements)))
                    )
                  ),
                  p.class`ledger-table-hint`(`showing ${Math.min(10, getOpenAgreements(agreements).length)} of ${getOpenAgreements(agreements).length} open agreements`)
                )
              : p.class`ledger-empty`("No open agreements need attention.")
          )
        )
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
  tagElement(AttentionApp, nextRoot);
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
    stopSubscriptions();
  },
  onDenied: () => {
    stopSubscriptions();
  },
  onAuthorized: ({ authState }) => {
    if (!stopOrders) {
      stopOrders = subscribeOrders((items) => {
        orders$.splice(0, orders$.length, ...items);
        if (authState.isAuthorized) {
          mountApp();
        }
      });
    }
    if (!stopAgreements) {
      stopAgreements = subscribeAgreements((items) => {
        agreements$.splice(0, agreements$.length, ...items);
        if (authState.isAuthorized) {
          mountApp();
        }
      });
    }
    mountApp();
  },
});
handleSignOut = adminShell.handleSignOut;
