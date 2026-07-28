import { tag, tagElement, section, div, h1, h2, p, span, button, a, subscribe } from "taggedjs";
import { Subject } from "taggedjs/js/subject/Subject.class.js";
import { AdminNav } from "../shared/AdminNav.tag.js";
import { replaceMountRoot } from "../shared/ssoMount.js";
import { startAdminAppShell } from "../shared/adminAppShell.js";
import { toast } from "../shared/toast.js";

type OrganizationRequest = Record<string, unknown> & { id: string };

let app = document.getElementById("organizationCheckoutAdminApp");
const appRoot = { current: app };
let appMounted = false;
let currentUser: any = null;
let authUser: any = null;
let handleSignOut = () => Promise.resolve();
let requests: OrganizationRequest[] = [];
let statusText = "Loading requests…";
let actionRequestId = "";
const refresh$ = new Subject<number>(0, (subscription) => subscription.next(0));

const render = () => {
  refresh$.next((Number(refresh$.value) || 0) + 1);
};

const api = async (path: string, init: RequestInit = {}) => {
  const token = await authUser?.getIdToken?.();
  return fetch(path, {
    ...init,
    headers: { ...init.headers, Authorization: `Bearer ${token}` },
  });
};

const loadRequests = async () => {
  statusText = "Loading requests…";
  render();
  try {
    const response = await api("/api/admin/organization-checkout/requests");
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Unable to load requests.");
    requests = Array.isArray(payload.requests) ? payload.requests : [];
    statusText = requests.length ? "" : "No organization requests yet.";
  } catch (error) {
    statusText = error instanceof Error ? error.message : "Unable to load requests.";
  }
  render();
};

const reviewRequest = async (requestId: string, action: "approve" | "reject" | "resend_notification") => {
  const reviewNotes = action === "resend_notification"
    ? ""
    : window.prompt(`${action === "approve" ? "Approval" : "Rejection"} notes (optional)`, "") ?? "";
  actionRequestId = requestId;
  render();
  try {
    const response = await api("/api/admin/organization-checkout/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId, action, reviewNotes }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Unable to update request.");
    toast.success(
      action === "approve"
        ? `Approved. Stripe customer: ${payload.stripeCustomerId}`
        : action === "reject"
          ? "Request rejected."
          : `Notification email: ${payload.notificationEmailStatus}`
    );
    await loadRequests();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Unable to update request.");
  } finally {
    actionRequestId = "";
    render();
  }
};

const downloadCertificate = async (request: OrganizationRequest) => {
  try {
    const response = await api(`/api/admin/organization-checkout/certificate?requestId=${encodeURIComponent(request.id)}`);
    if (!response.ok) throw new Error("Unable to download certificate.");
    const url = URL.createObjectURL(await response.blob());
    const link = document.createElement("a");
    link.href = url;
    link.download = String(request.certificateFileName || "certificate");
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Unable to download certificate.");
  }
};

const Detail = (label: string, value: unknown) =>
  p.class`orders-meta`(span.class`organization-detail-label`(`${label}: `), String(value || "—"));

const RequestCard = (request: OrganizationRequest) =>
  section.class`home-card organization-admin-card`(
    div.class`organization-admin-card-header`(
      div(
        h2(String(request.organizationName || "Organization")),
        span.class(_=> `pill organization-status-${String(request.status || "pending")}`)(String(request.status || "pending"))
      ),
      span.class`orders-meta`(String(request.id))
    ),
    div.class`organization-admin-details`(
      Detail("Type", request.organizationType),
      Detail("Contact", request.contactName),
      Detail("Email", request.contactEmail),
      Detail("Phone", request.phone),
      Detail("Certificate", request.exemptionCertificateNumber),
      Detail("Expires", request.certificateExpirationDate),
      Detail("Address", `${request.addressLine1 || ""}, ${request.city || ""}, ${request.state || ""} ${request.postalCode || ""}`),
      Detail("Intended use", request.intendedUse),
      Detail("Stripe customer", request.stripeCustomerId),
      Detail("Notification email", request.notificationEmailStatus),
      Detail("Reviewed by", request.reviewedBy),
      Detail("Notes", request.reviewNotes)
    ),
    div.class`orders-detail-actions`(
      button.type`button`.class`ghost-button`.onClick(() => downloadCertificate(request))("Download certificate"),
      button.type`button`.class`ghost-button`.disabled(actionRequestId === request.id).onClick(() => reviewRequest(request.id, "resend_notification"))("Resend notification email"),
      String(request.status || "") !== "approved"
        ? button.type`button`.class`add-button`.disabled(actionRequestId === request.id).onClick(() => reviewRequest(request.id, "approve"))(
            actionRequestId === request.id ? "Working…" : "Approve & create Stripe customer"
          )
        : a.class`ghost-button`.href(
            `https://dashboard.stripe.com/${request.stripeMode === "sandbox" ? "test/" : ""}customers/${encodeURIComponent(String(request.stripeCustomerId || ""))}`
          ).target`_blank`("Open in Stripe"),
      String(request.status || "") !== "rejected"
        ? button.type`button`.class`ghost-button delete-button`.disabled(actionRequestId === request.id).onClick(() => reviewRequest(request.id, "reject"))("Reject")
        : null
    )
  );

export const OrganizationCheckoutAdminApp = tag(() => [
  AdminNav(handleSignOut, currentUser),
  subscribe(refresh$, () =>
    section.class`panel ledger-panel`(
      div.class`ledger-header`(
        div.class`ledger-heading`(
          h1("Organizational Checkout"),
          p("Review exemption certificates. Approval creates a tax-exempt Stripe Customer used by checkout.")
        ),
        button.type`button`.class`ghost-button`.onClick(loadRequests)("Refresh")
      ),
      statusText ? p.class`orders-meta`(statusText) : null,
      div.class`organization-admin-list`(requests.map(RequestCard))
    )
  ),
]);

const adminShell = startAdminAppShell({
  rootRef: appRoot,
  toast,
  setAppMounted: (value) => { appMounted = value; },
  setCurrentUser: (value) => { currentUser = value; },
  onAfterSsoMount: () => { app = appRoot.current; },
  onAuthorized: ({ user }) => {
    authUser = user;
    if (!appMounted) {
      const root = replaceMountRoot(appRoot);
      if (root) {
        appMounted = true;
        root.replaceChildren();
        tagElement(OrganizationCheckoutAdminApp, root);
        loadRequests();
      }
    }
  },
});

handleSignOut = adminShell.handleSignOut;
