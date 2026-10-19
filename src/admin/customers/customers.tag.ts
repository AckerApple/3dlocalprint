import { saveCustomer, subscribeCustomers } from "../shared/firebase.js";
import {
  tag, tagElement, section, div, table, thead, tbody, tr, th, td,
  input, textarea, label, button, p, h1, array, subscribe,
} from "taggedjs";
import { AdminNav } from "../shared/AdminNav.tag.js";
import { Modal } from "../shared/Modal.tag.js";
import { toast } from "../shared/toast.js";
import { replaceMountRoot } from "../shared/ssoMount.js";
import { startAdminAppShell } from "../shared/adminAppShell.js";
import type { CustomerRecord } from "../../types/customer.js";

let app = document.getElementById("customersApp");
const appRoot = { current: app };
const customers$ = array<CustomerRecord>([]);
let stopCustomers: null | (() => void) = null;
let appMounted = false;
let currentUser: any = null;
let handleSignOut = () => Promise.resolve();
let search = "";
let modalOpen = false;
let isSaving = false;
let draft: CustomerRecord | null = null;
let requestedCustomerHandled = false;

const normalizeEmail = (value = "") => String(value || "").trim().toLowerCase();
const createCustomerId = () => globalThis.crypto?.randomUUID?.()
  || `customer_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
const createDraft = (): CustomerRecord => ({
  id: createCustomerId(), name: "", email: "", emailNormalized: "", phone: "", notes: "",
  sourceOrderId: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
});
const filteredCustomers = () => {
  const needle = search.trim().toLowerCase();
  return [...customers$.value]
    .filter((customer) => !needle || [customer.name, customer.email, customer.phone, customer.notes]
      .some((value) => String(value || "").toLowerCase().includes(needle)))
    .sort((a, b) => (a.name || a.email).localeCompare(b.name || b.email));
};
const refresh = () => customers$.splice(0, customers$.length, ...customers$.value);
const openCustomer = (customer?: CustomerRecord) => {
  draft = customer ? { ...customer } : createDraft();
  modalOpen = true;
  refresh();
};
const closeCustomer = () => {
  if (isSaving) return;
  modalOpen = false;
  draft = null;
  refresh();
};
const persistCustomer = async (keepOpen = false) => {
  if (!draft || isSaving) return;
  const emailNormalized = normalizeEmail(draft.email);
  if (!emailNormalized || !emailNormalized.includes("@")) {
    toast.error("Enter a valid customer email.");
    return;
  }
  const duplicate = customers$.value.find((item: CustomerRecord) =>
    item.id !== draft?.id && normalizeEmail(item.email) === emailNormalized
  );
  if (duplicate) {
    toast.error(`A customer already uses ${emailNormalized}.`);
    return;
  }
  isSaving = true;
  refresh();
  try {
    await saveCustomer({ ...draft, email: draft.email.trim(), emailNormalized });
    toast.success("Customer saved.");
    if (!keepOpen) closeCustomer();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Failed to save customer.");
  } finally {
    isSaving = false;
    if (!keepOpen) {
      modalOpen = false;
      draft = null;
    }
    refresh();
  }
};

const CustomerModal = () => subscribe(customers$, () => Modal({
  modalOpen,
  title: draft?.name || draft?.email || "New Customer",
  className: "ledger-modal",
  cardClassName: "ledger-modal-card",
  bodyClassName: "orders-detail-body",
  onClose: closeCustomer,
  content: () => draft ? div.class`agreement-create-form`(
    p.class`orders-meta`("Orders are associated with this customer by normalized email. Changing the email changes which orders match this record."),
    div.class`agreement-create-grid`(
      label("Name", input.class`manufacturer-input`.type`text`.value(() => draft?.name || "")
        .onInput((event) => { if (draft) draft.name = String(event.target.value || ""); })()),
      label("Email", input.class`manufacturer-input`.type`email`.required`true`.value(() => draft?.email || "")
        .onInput((event) => { if (draft) draft.email = String(event.target.value || ""); })()),
      label("Phone", input.class`manufacturer-input`.type`tel`.value(() => draft?.phone || "")
        .onInput((event) => { if (draft) draft.phone = String(event.target.value || ""); })())
    ),
    label("Notes", textarea.class`manufacturer-input`.rows`5`.value(() => draft?.notes || "")
      .onInput((event) => { if (draft) draft.notes = String(event.target.value || ""); })()),
    draft.sourceOrderId ? p.class`orders-meta`(`Originally imported from order ${draft.sourceOrderId}.`) : null,
    div.class`auth-actions`(
      button.type`button`.class`ghost-button`.disabled(() => isSaving).onClick(closeCustomer)("Cancel"),
      button.type`button`.class`add-button`.attr("data-pin-save", "true")
        .attr("title", "Hold Shift while clicking to save and keep this modal open")
        .disabled(() => isSaving).onClick((event) => persistCustomer(Boolean(event.shiftKey)))(
        () => isSaving ? "Saving..." : "Save customer"
      )
    )
  ) : null,
}));

export const CustomersApp = tag(() => [
  AdminNav(handleSignOut, currentUser),
  section.class`panel ledger-panel`(
    div.class`ledger-header`(
      div.class`ledger-heading`(h1("Customers"), p("Customer records associated with orders by email address.")),
      button.type`button`.class`add-button`.onClick(() => openCustomer())("Add Customer")
    ),
    input.class`manufacturer-input`.type`search`.placeholder`Search name, email, phone, or notes`
      .value(() => search).onInput((event) => { search = String(event.target.value || ""); refresh(); })(),
    subscribe(customers$, () => filteredCustomers().length
      ? div.class`ledger-table-wrap`(
          table.class`ledger-table`(
            thead(tr(th("Name"), th("Email"), th("Phone"), th("Updated"), th(""))),
            tbody(filteredCustomers().map((customer) => tr(
              td(customer.name || "—"), td(customer.email), td(customer.phone || "—"),
              td(customer.updatedAt ? new Date(customer.updatedAt).toLocaleDateString() : "—"),
              td(button.type`button`.class`ghost-button`.onClick(() => openCustomer(customer))("Edit"))
            ).key(customer.id)))
          )
        )
      : p.class`ledger-empty`("No customers found.")),
    CustomerModal(),
  ),
]);

const mountApp = () => {
  if (!appRoot.current || appMounted) return;
  const nextRoot = replaceMountRoot(appRoot);
  if (!nextRoot) return;
  nextRoot.replaceChildren();
  tagElement(CustomersApp, nextRoot);
  appMounted = true;
  app = appRoot.current;
};
const auth = startAdminAppShell({
  rootRef: appRoot,
  toast,
  setAppMounted: (value) => { appMounted = value; },
  setCurrentUser: (value) => { currentUser = value; },
  onAfterSsoMount: () => { app = appRoot.current; },
  onSignedOut: () => { stopCustomers?.(); stopCustomers = null; },
  onDenied: () => { stopCustomers?.(); stopCustomers = null; },
  onAuthorized: () => {
    if (!stopCustomers) {
      stopCustomers = subscribeCustomers((items) => {
        customers$.splice(0, customers$.length, ...items);
        if (!requestedCustomerHandled) {
          requestedCustomerHandled = true;
          const requestedId = String(new URLSearchParams(window.location.search).get("customerId") || "").trim();
          const requested = items.find((item) => item.id === requestedId);
          if (requested) openCustomer(requested);
        }
        mountApp();
      });
    }
    mountApp();
  },
});
handleSignOut = auth.handleSignOut;
