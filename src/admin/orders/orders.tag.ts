import { subscribeOrders } from "../shared/firebase.js";
import {
  tag,
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
  a,
  array,
  subscribe,
} from "taggedjs";
import { toast } from "../shared/toast.js";
import { AdminNav } from "../shared/AdminNav.tag.js";
import { replaceMountRoot } from "../shared/ssoMount.js";
import { startAdminAppShell } from "../shared/adminAppShell.js";
import type { OrderRecord } from "../../types/order.js";

let app = document.getElementById("ordersApp");
const appRoot = { current: app };
const orders$ = array<OrderRecord>([]);
let stopOrders: null | (() => void) = null;
let appMounted = false;
let currentUser: any = null;
let handleSignOut = () => Promise.resolve();

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

const getCustomerLabel = (order: OrderRecord) =>
  [order.customerName, order.customerEmail].filter(Boolean).join(" · ") || "—";

const getLineItemsLabel = (order: OrderRecord) =>
  order.lineItems.length
    ? order.lineItems.map((item) => `${item.quantity}x ${item.title}`).join(", ")
    : "No line items recorded";

const getStripeHref = (order: OrderRecord) =>
  order.stripeDashboardUrl || order.checkoutUrl || "";

const stopOrderSubscription = () => {
  if (stopOrders) {
    stopOrders();
    stopOrders = null;
  }
};

export const OrdersApp = tag(() => [
  AdminNav(handleSignOut, currentUser),
  section.class`panel ledger-panel orders-panel`(
    div.class`ledger-header`(
      div.class`ledger-heading`(
        h1("Orders"),
        p("Review checkout orders, payment status, and Stripe links.")
      )
    ),
    subscribe(
      orders$,
      (orders) =>
        orders.length
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
                      th("Stripe")
                    )
                  ),
                  tbody(
                    orders.map((order) =>
                      tr.class`ledger-row orders-row`(
                        td(
                          div.class`orders-date-stack`(
                            span(_=> formatDate(order.updatedAt || order.createdAt)),
                            order.paidAt ? p.class`orders-meta`(_=> `Paid ${formatDate(order.paidAt)}`) : null
                          )
                        ),
                        td(
                          span.class(_=> `pill ledger-status-pill orders-status-${order.status}`)(
                            _=> order.status.replace(/_/g, " ")
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
                            order.stripeMode
                              ? p.class`orders-meta`(_=> `Stripe ${order.stripeMode}`)
                              : null,
                            order.checkoutSessionId
                              ? p.class`orders-meta`(_=> `Session ${order.checkoutSessionId}`)
                              : null,
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
                          getStripeHref(order)
                            ? a
                                .class`orders-stripe-link`
                                .href(getStripeHref(order))
                                .target`_blank`
                                .rel`noreferrer`("Open")
                            : span.class`orders-meta`("—")
                        )
                      ).key(order.id)
                    )
                  )
                )
              ),
              p.class`ledger-table-hint`("showing the latest 100 checkout orders")
            )
          : p.class`ledger-empty`("No orders found yet.")
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
  tagElement(OrdersApp, nextRoot);
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
  onSignedOut: stopOrderSubscription,
  onDenied: stopOrderSubscription,
  onAuthorized: ({ authState }) => {
    if (!stopOrders) {
      stopOrders = subscribeOrders((items) => {
        orders$.splice(0, orders$.length, ...items);
        if (authState.isAuthorized) {
          mountApp();
        }
      });
    }
    mountApp();
  },
});
handleSignOut = auth.handleSignOut;
