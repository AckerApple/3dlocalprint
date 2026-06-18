import { subscribeModelLinkQuoteRequests } from "../shared/firebase.js";
import {
  a,
  array,
  button,
  div,
  h1,
  h2,
  p,
  section,
  span,
  strong,
  tag,
  tagElement,
} from "taggedjs";
import { toast } from "../shared/toast.js";
import { AdminNav } from "../shared/AdminNav.tag.js";
import { replaceMountRoot } from "../shared/ssoMount.js";
import { startAdminAppShell } from "../shared/adminAppShell.js";
import type { ModelLinkQuoteRequestRecord } from "../../types/model-link-quote-request.js";

let app = document.getElementById("linkOrdersApp");
const appRoot = { current: app };
const quoteRequests$ = array<ModelLinkQuoteRequestRecord>([]);
let stopQuoteRequests: null | (() => void) = null;
let appMounted = false;
let currentUser: any = null;
let handleSignOut = () => Promise.resolve();
let selectedRequestId = new URLSearchParams(window.location.search).get("requestId")?.trim() || "";

const formatDate = (value = "") => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const formatStatus = (status = "") =>
  String(status || "quote_requested").replace(/_/g, " ");

const syncRequestUrl = (requestId = "") => {
  const url = new URL(window.location.href);
  if (requestId) {
    url.searchParams.set("requestId", requestId);
  } else {
    url.searchParams.delete("requestId");
  }
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
};

const getSelectedRequest = () =>
  quoteRequests$.find((item) => item.id === selectedRequestId) || quoteRequests$[0] || null;

const getRequestModelItems = (request: ModelLinkQuoteRequestRecord) =>
  request.modelItems.length
    ? request.modelItems
    : request.modelLinks.map((url) => ({ url, quantity: request.quantity || 1 }));

const selectRequest = (requestId: string) => {
  selectedRequestId = requestId;
  syncRequestUrl(requestId);
  renderApp();
};

const LinkOrdersApp = tag(() => {
  const selected = getSelectedRequest();
  return [
    AdminNav(handleSignOut, currentUser),
    section.class`orders-panel`(
      div.class`ledger-title-stack`(
        h1("Link Orders"),
        p("Model-link quote requests submitted from the public PRINT by LINK page.")
      ),
      div.class`link-orders-layout`(
        div.class`link-orders-list`(
          quoteRequests$.length
            ? quoteRequests$.map((request) =>
                button
                  .type`button`
                  .class(`link-order-row${request.id === selected?.id ? " is-active" : ""}`)
                  .onClick(() => selectRequest(request.id))(
                    strong(request.id),
                    span([request.customerName, request.customerEmail].filter(Boolean).join(" · ") || "No customer"),
                    span(`${formatStatus(request.status)} · ${formatDate(request.createdAt)}`)
                  )
              )
            : div.class`home-products-loading`(
                div.class`home-products-spinner`().attr("aria-hidden", "true"),
                p.class`home-products-loading-text`("Loading link orders...")
              )
        ),
        selected
          ? div.class`link-order-detail`(
              div.class`receipt-status-pill`(formatStatus(selected.status)),
              h2(selected.id),
              div.class`public-order-meta`(
                detail("Name", selected.customerName),
                detail("Email", selected.customerEmail),
                detail("Phone", selected.customerPhone || "Not provided"),
                detail("Quantity", String(selected.quantity || 1)),
                detail("Submitted", formatDate(selected.createdAt)),
                detail("Internal email", selected.notificationEmailStatus || "—"),
                detail("Customer email", selected.customerEmailStatus || "—")
              ),
              div.class`public-order-section`(
                h2("Model links"),
                getRequestModelItems(selected).map((item) =>
                  div.class`public-order-line`(
                    span(`${item.quantity}x`),
                    a.class`receipt-order-link`.href(item.url).target("_blank").rel("noopener noreferrer")(item.url)
                  )
                )
              ),
              div.class`public-order-section`(
                h2("Quote details"),
                p(selected.projectDetails || "No details provided.")
              ),
              div.class`receipt-actions`(
                selected.publicReviewUrl
                  ? a.class`ghost-button`.href(selected.publicReviewUrl).target("_blank").rel("noopener noreferrer")("Customer page")
                  : null,
                a.class`add-button`.href(`mailto:${selected.customerEmail}?subject=${encodeURIComponent(`Quote ${selected.id}`)}`)("Reply with quote")
              )
            )
          : div.class`link-order-detail`(
              h2("No link order selected"),
              p("Select a request to review details.")
            )
      )
    ),
  ];
});

const detail = (labelText: string, value: string) =>
  div(strong(labelText), span(value || "—"));

const renderApp = () => {
  if (!appRoot.current) return;
  const nextRoot = replaceMountRoot(appRoot);
  if (!nextRoot) return;
  nextRoot.replaceChildren();
  tagElement(LinkOrdersApp, nextRoot);
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
  onSignedOut: () => {
    if (stopQuoteRequests) {
      stopQuoteRequests();
      stopQuoteRequests = null;
    }
  },
  onDenied: () => {
    if (stopQuoteRequests) {
      stopQuoteRequests();
      stopQuoteRequests = null;
    }
  },
  onAuthorized: ({ authState }) => {
    if (!stopQuoteRequests) {
      stopQuoteRequests = subscribeModelLinkQuoteRequests((items) => {
        quoteRequests$.splice(0, quoteRequests$.length, ...(Array.isArray(items) ? items : []));
        if (!selectedRequestId && quoteRequests$[0]) {
          selectedRequestId = quoteRequests$[0].id;
          syncRequestUrl(selectedRequestId);
        }
        if (authState.isAuthorized || appMounted) {
          renderApp();
        }
      });
    }
    renderApp();
  },
});
handleSignOut = auth.handleSignOut;
