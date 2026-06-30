import { auth as firebaseAuth, subscribeAgreements } from "../shared/firebase.js";
import {
  tag,
  tagElement,
  section,
  div,
  label,
  input,
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
  array,
  subscribe,
} from "taggedjs";
import { toast } from "../shared/toast.js";
import { AdminNav } from "../shared/AdminNav.tag.js";
import { Modal } from "../shared/Modal.tag.js";
import { replaceMountRoot } from "../shared/ssoMount.js";
import { startAdminAppShell } from "../shared/adminAppShell.js";
import type { AgreementRecord } from "../../types/agreement.js";

let app = document.getElementById("agreementsApp");
const appRoot = { current: app };
const agreements$ = array<AgreementRecord>([]);
let stopAgreements: null | (() => void) = null;
let appMounted = false;
let currentUser: any = null;
let currentAuthUser: null | { email?: string | null; getIdToken?: () => Promise<string> } = null;
let handleSignOut = () => Promise.resolve();

type AgreementServiceDraft = {
  label: string;
  included: boolean;
  monthlyValue: string;
  yearlyCost: string;
};

type AgreementDraft = {
  clientBusiness: string;
  clientRepresentative: string;
  customerEmail: string;
  providerName: string;
  effectiveDate: string;
  paymentDueDate: string;
  serviceStartDate: string;
  serviceEndDate: string;
  yearlyAmount: string;
  currency: string;
  services: AgreementServiceDraft[];
};

type AgreementValidationErrors = Partial<Record<"clientBusiness" | "customerEmail" | "services", string>>;

type AgreementsUiState = {
  createLoading: boolean;
  createStatusText: string;
  validationSubmitted: boolean;
  validationErrors: AgreementValidationErrors;
  sendAgreementEmailLoading: boolean;
  sendAgreementEmailStatusText: string;
  createModalOpen: boolean;
  modalMode: "create" | "edit";
  editingAgreementId: string;
  agreementDraft: AgreementDraft;
};

const todayDate = () => new Date().toISOString().slice(0, 10);

const addYearMinusDay = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  const date = year && month && day ? new Date(year, month - 1, day) : new Date();
  date.setFullYear(date.getFullYear() + 1);
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
};

const createAgreementDraft = (): AgreementDraft => {
  const today = todayDate();
  return {
    clientBusiness: "Sample Agreement",
    clientRepresentative: "",
    customerEmail: "",
    providerName: "3D Local Print LLC",
    effectiveDate: today,
    paymentDueDate: today,
    serviceStartDate: today,
    serviceEndDate: addYearMinusDay(today),
    yearlyAmount: "240.00",
    currency: "usd",
    services: [
      { label: "Email notifications", included: true, monthlyValue: "5.00", yearlyCost: "60.00" },
      { label: "Admin login system", included: true, monthlyValue: "5.00", yearlyCost: "60.00" },
      { label: "Image storage", included: true, monthlyValue: "5.00", yearlyCost: "60.00" },
      { label: "Live product catalog", included: true, monthlyValue: "5.00", yearlyCost: "60.00" },
    ],
  };
};

const agreementsUi$ = array<AgreementsUiState>([
  {
    createLoading: false,
    createStatusText: "",
    validationSubmitted: false,
    validationErrors: {},
    sendAgreementEmailLoading: false,
    sendAgreementEmailStatusText: "",
    createModalOpen: false,
    modalMode: "create",
    editingAgreementId: "",
    agreementDraft: createAgreementDraft(),
  },
]);

const getAgreementsUi = () =>
  agreementsUi$[0] || {
    createLoading: false,
    createStatusText: "",
    validationSubmitted: false,
    validationErrors: {},
    sendAgreementEmailLoading: false,
    sendAgreementEmailStatusText: "",
    createModalOpen: false,
    modalMode: "create" as const,
    editingAgreementId: "",
    agreementDraft: createAgreementDraft(),
  };

const setAgreementsUi = (patch: Partial<AgreementsUiState>) => {
  const current = getAgreementsUi();
  agreementsUi$[0] = {
    ...current,
    ...patch,
  };
};

const validateAgreementDraft = (draft: AgreementDraft): AgreementValidationErrors => {
  const errors: AgreementValidationErrors = {};
  if (!draft.clientBusiness.trim()) {
    errors.clientBusiness = "Client business is required.";
  }
  if (!draft.customerEmail.trim()) {
    errors.customerEmail = "Customer email is required.";
  }
  const hasService = draft.services.some((service) => service.label.trim());
  if (!hasService) {
    errors.services = "Add at least one service.";
  }
  return errors;
};

const getFirstValidationMessage = (errors: AgreementValidationErrors) =>
  errors.clientBusiness || errors.customerEmail || errors.services || "";

const getAgreementFieldError = (
  ui: AgreementsUiState,
  field: keyof AgreementValidationErrors
) => ui.validationSubmitted ? ui.validationErrors[field] || "" : "";

const getEditingAgreement = (ui: AgreementsUiState) =>
  ui.modalMode === "edit"
    ? agreements$.find((agreement) => agreement.id === ui.editingAgreementId) || null
    : null;

const formatMoney = (cents = 0, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "usd").toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((Math.max(0, Number(cents) || 0)) / 100);

const formatDate = (value = "") => {
  if (!value) return "-";
  const [year, month, day] = value.split("-").map(Number);
  const date = year && month && day ? new Date(year, month - 1, day) : new Date(value);
  if (Number.isNaN(date.getTime())) return value || "-";
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
};

const formatDateTime = (value = "") => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || "-";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const getAdminAgreementActionUrl = (relativeUrl: string, functionName: string) => {
  const hostname = window.location.hostname;
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
  const isFirebaseHosting = hostname.endsWith(".web.app") || hostname.endsWith(".firebaseapp.com");
  if (isLocalHost || isFirebaseHosting) {
    return relativeUrl;
  }

  const projectId = String(import.meta.env.VITE_FIREBASE_PROJECT_ID || "threedlocalprint").trim();
  return `https://us-central1-${projectId}.cloudfunctions.net/${functionName}`;
};

const createAgreementUrl = () =>
  getAdminAgreementActionUrl("/api/admin/agreements/create", "createWebsiteServicesAgreement");

const updateAgreementUrl = () =>
  getAdminAgreementActionUrl("/api/admin/agreements/update", "updateWebsiteServicesAgreement");

const sendAgreementEmailUrl = () =>
  getAdminAgreementActionUrl("/api/admin/agreements/send-email", "sendAgreementEmail");

const readErrorPayload = async (response: Response) => {
  const text = await response.text().catch(() => "");
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { error: text.slice(0, 500) };
  }
};

const stopAgreementSubscription = () => {
  if (stopAgreements) {
    stopAgreements();
    stopAgreements = null;
  }
};

const dollarsToCents = (value: string) => Math.max(0, Math.round(Number(String(value || "").replace(/[$,]/g, "")) * 100) || 0);

const centsToDollars = (value = 0) => (Math.max(0, Math.round(Number(value) || 0)) / 100).toFixed(2);

const agreementToDraft = (agreement: AgreementRecord): AgreementDraft => ({
  clientBusiness: agreement.clientBusiness || "",
  clientRepresentative: agreement.clientRepresentative || "",
  customerEmail: agreement.customerEmail || "",
  providerName: agreement.providerName || "3D Local Print LLC",
  effectiveDate: agreement.effectiveDate || todayDate(),
  paymentDueDate: agreement.paymentDueDate || todayDate(),
  serviceStartDate: agreement.serviceStartDate || todayDate(),
  serviceEndDate: agreement.serviceEndDate || addYearMinusDay(agreement.serviceStartDate || todayDate()),
  yearlyAmount: centsToDollars(agreement.yearlyAmount || agreement.amountTotal),
  currency: agreement.currency || "usd",
  services: (agreement.services?.length ? agreement.services : createAgreementDraft().services).map((service) => ({
    label: service.label || "",
    included: Boolean(service.included),
    monthlyValue: centsToDollars(Number(service.monthlyValue) || 0),
    yearlyCost: centsToDollars(Number(service.yearlyCost) || 0),
  })),
});

const openCreateAgreementModal = () => {
  setAgreementsUi({
    agreementDraft: createAgreementDraft(),
    createModalOpen: true,
    createStatusText: "",
    validationSubmitted: false,
    validationErrors: {},
    sendAgreementEmailStatusText: "",
    modalMode: "create",
    editingAgreementId: "",
  });
};

const openEditAgreementModal = (agreement: AgreementRecord) => {
  setAgreementsUi({
    agreementDraft: agreementToDraft(agreement),
    createModalOpen: true,
    createStatusText: "",
    validationSubmitted: false,
    validationErrors: {},
    sendAgreementEmailStatusText: "",
    modalMode: "edit",
    editingAgreementId: agreement.id,
  });
};

const closeCreateAgreementModal = () => {
  const ui = getAgreementsUi();
  if (ui.createLoading || ui.sendAgreementEmailLoading) return;
  setAgreementsUi({ createModalOpen: false });
};

const updateDraft = (patch: Partial<AgreementDraft>) => {
  const current = getAgreementsUi();
  const agreementDraft = { ...current.agreementDraft, ...patch };
  if (current.validationSubmitted) {
    setAgreementsUi({
      agreementDraft,
      validationErrors: validateAgreementDraft(agreementDraft),
    });
    return;
  }
  current.agreementDraft = agreementDraft;
};

const updateDraftAndRender = (patch: Partial<AgreementDraft>) => {
  const current = getAgreementsUi();
  setAgreementsUi({
    agreementDraft: { ...current.agreementDraft, ...patch },
  });
};

const updateServiceDraft = (index: number, patch: Partial<AgreementServiceDraft>) => {
  const current = getAgreementsUi();
  const currentService = current.agreementDraft.services[index];
  if (!currentService) return;
  const services = [...current.agreementDraft.services];
  services[index] = { ...currentService, ...patch };
  const agreementDraft = { ...current.agreementDraft, services };
  if (current.validationSubmitted) {
    setAgreementsUi({
      agreementDraft,
      validationErrors: validateAgreementDraft(agreementDraft),
    });
    return;
  }
  current.agreementDraft = agreementDraft;
};

const addServiceDraft = () => {
  const current = getAgreementsUi();
  setAgreementsUi({
    agreementDraft: {
      ...current.agreementDraft,
      services: [
        ...current.agreementDraft.services,
        { label: "", included: true, monthlyValue: "0.00", yearlyCost: "0.00" },
      ],
    },
  });
};

const removeServiceDraft = (index: number) => {
  const current = getAgreementsUi();
  setAgreementsUi({
    agreementDraft: {
      ...current.agreementDraft,
      services: current.agreementDraft.services.filter((_, serviceIndex) => serviceIndex !== index),
    },
  });
};

const saveAgreement = async () => {
  const currentUi = getAgreementsUi();
  if (currentUi.createLoading) return;
  const agreementDraft = currentUi.agreementDraft;
  const validationErrors = validateAgreementDraft(agreementDraft);
  const services = agreementDraft.services
    .map((service) => ({
      label: service.label.trim(),
      included: service.included,
      monthlyValue: dollarsToCents(service.monthlyValue),
      yearlyCost: dollarsToCents(service.yearlyCost),
    }))
    .filter((service) => service.label);
  if (Object.keys(validationErrors).length) {
    const message = getFirstValidationMessage(validationErrors) || "Fix the highlighted agreement fields.";
    setAgreementsUi({
      validationSubmitted: true,
      validationErrors,
      createStatusText: message,
    });
    toast.error(message);
    return;
  }

  const user = currentAuthUser || firebaseAuth.currentUser;
  if (!user || typeof user.getIdToken !== "function") {
    toast.error("Sign in again to create an agreement.");
    return;
  }
  const clientBusiness = agreementDraft.clientBusiness.trim();

  setAgreementsUi({
    createLoading: true,
    createStatusText: currentUi.modalMode === "edit" ? "Saving agreement..." : "Creating agreement...",
    validationSubmitted: false,
    validationErrors: {},
  });
  try {
    const token = await user.getIdToken();
    const isEdit = currentUi.modalMode === "edit";
    const saveUrl = isEdit ? updateAgreementUrl() : createAgreementUrl();
    const response = await fetch(saveUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...agreementDraft,
        agreementId: currentUi.editingAgreementId,
        sourceUrl: window.location.origin,
        yearlyAmount: dollarsToCents(agreementDraft.yearlyAmount),
        currency: agreementDraft.currency.trim().toLowerCase() || "usd",
        services,
      }),
    });
    const payload = await readErrorPayload(response);
    if (!response.ok) {
      const details = [payload?.error, payload?.details, payload?.code]
        .map((item) => String(item || "").trim())
        .filter(Boolean)
        .join(" ");
      throw new Error(details || `Failed to save agreement. HTTP ${response.status} from ${saveUrl}`);
    }
    const publicUrl = String(payload?.publicAgreementUrl || "");
    const actionLabel = isEdit ? "Updated" : "Created";
    setAgreementsUi({
      createStatusText: `${actionLabel} agreement for ${clientBusiness}.`,
      createModalOpen: false,
    });
    toast.success(`${actionLabel} agreement for ${clientBusiness}.`);
    if (!isEdit && publicUrl && navigator.clipboard) {
      await navigator.clipboard.writeText(publicUrl).catch(() => undefined);
      toast.success("Private agreement link copied.");
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save agreement.";
    setAgreementsUi({ createStatusText: message });
    toast.error(message, { duration: 10000 });
  } finally {
    setAgreementsUi({ createLoading: false });
  }
};

const sendAgreementEmail = async () => {
  const currentUi = getAgreementsUi();
  if (currentUi.sendAgreementEmailLoading) {
    toast.info("Agreement email is already sending.");
    return;
  }
  if (currentUi.createLoading) {
    toast.info("Wait for the agreement save to finish before sending email.");
    return;
  }
  if (currentUi.modalMode !== "edit") {
    toast.error("Save the agreement before sending email.");
    return;
  }
  const agreementId = currentUi.editingAgreementId;
  if (!agreementId) {
    toast.error("Save the agreement before sending email.");
    return;
  }
  const customerEmail = currentUi.agreementDraft.customerEmail.trim();
  if (!customerEmail) {
    toast.error("Customer email is required before sending agreement email.");
    return;
  }
  const user = currentAuthUser || firebaseAuth.currentUser;
  if (!user || typeof user.getIdToken !== "function") {
    toast.error("Sign in again to send agreement email.");
    return;
  }

  setAgreementsUi({
    sendAgreementEmailLoading: true,
    sendAgreementEmailStatusText: "Sending agreement email...",
  });
  toast.info(`Sending agreement email to ${customerEmail}...`);
  try {
    const token = await user.getIdToken();
    const response = await fetch(sendAgreementEmailUrl(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agreementId, customerEmail }),
    });
    const payload = await readErrorPayload(response);
    if (!response.ok) {
      throw new Error(String(payload?.error || "Failed to send agreement email."));
    }
    const recipient = String(payload?.customerEmail || customerEmail);
    const status = String(payload?.agreementEmailStatus || "sent");
    const message = `Sent agreement email to ${recipient} (${status}).`;
    setAgreementsUi({ sendAgreementEmailStatusText: message });
    toast.success(message, { duration: 10000 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send agreement email.";
    setAgreementsUi({ sendAgreementEmailStatusText: message });
    toast.error(message, { duration: 10000 });
  } finally {
    setAgreementsUi({ sendAgreementEmailLoading: false });
  }
};

const AcceptanceMetaItem = (labelText: string, value = "") =>
  div.class`agreement-acceptance-item`(
    span.class`orders-detail-label`(labelText),
    span.class`orders-detail-value`(value || "-")
  );

const AgreementAcceptanceMeta = (agreement: AgreementRecord | null) => {
  if (!agreement) return null;
  const browserEntries = Object.entries(agreement.acceptedBrowserMeta || {})
    .filter(([, value]) => String(value || "").trim());
  const hasAcceptanceMeta = Boolean(
    agreement.acceptedAt
      || agreement.acceptedSignerName
      || agreement.acceptedIp
      || agreement.acceptedUserAgent
      || browserEntries.length
  );

  return div.class`agreement-acceptance-section`(
    div.class`agreement-services-editor-header`(
      h2("Acceptance metadata")
    ),
    hasAcceptanceMeta
      ? div.class`agreement-acceptance-grid`(
          AcceptanceMetaItem("Signer", agreement.acceptedSignerName),
          AcceptanceMetaItem("Accepted", formatDateTime(agreement.acceptedAt)),
          AcceptanceMetaItem("IP address", agreement.acceptedIp),
          AcceptanceMetaItem("User agent", agreement.acceptedUserAgent),
          browserEntries.length
            ? div.class`agreement-acceptance-browser-meta`(
                browserEntries.map(([key, value]) =>
                  AcceptanceMetaItem(key, value).key(`browser-meta-${key}`)
                )
              )
            : null
        )
      : p.class`orders-meta`("This agreement has not been accepted yet.")
  );
};

const AgreementOrderLink = (agreement: AgreementRecord | null) => {
  if (!agreement?.orderId) return null;
  const orderHref = getOrderHref(agreement);
  if (!orderHref) return null;

  return div.class`agreement-acceptance-section`(
    div.class`agreement-services-editor-header`(
      h2("Associated order")
    ),
    div.class`agreement-acceptance-grid`(
      div.class`agreement-acceptance-item`(
        span.class`orders-detail-label`("Order"),
        a
          .class`orders-detail-value orders-detail-link`
          .href(orderHref)(agreement.orderId)
      )
    )
  );
};

const AgreementCreateForm = tag((ui: AgreementsUiState = getAgreementsUi()) => {
  let agreementDraft = ui.agreementDraft;
  let createLoading = ui.createLoading;
  let sendAgreementEmailLoading = ui.sendAgreementEmailLoading;
  let editingAgreement = getEditingAgreement(ui);
  let hasClientBusinessError = Boolean(getAgreementFieldError(ui, "clientBusiness"));
  let hasCustomerEmailError = Boolean(getAgreementFieldError(ui, "customerEmail"));
  let serviceError = getAgreementFieldError(ui, "services");
  let validationMessage = getFirstValidationMessage(ui.validationErrors);

  AgreementCreateForm.inputs((args) => {
    [ui = getAgreementsUi()] = args;
    agreementDraft = ui.agreementDraft;
    createLoading = ui.createLoading;
    sendAgreementEmailLoading = ui.sendAgreementEmailLoading;
    editingAgreement = getEditingAgreement(ui);
    hasClientBusinessError = Boolean(getAgreementFieldError(ui, "clientBusiness"));
    hasCustomerEmailError = Boolean(getAgreementFieldError(ui, "customerEmail"));
    serviceError = getAgreementFieldError(ui, "services");
    validationMessage = getFirstValidationMessage(ui.validationErrors);
  });
  return (
  div.class`agreement-create-form`(
    _=> ui.validationSubmitted && validationMessage
      ? p.class`agreement-form-error`(validationMessage)
      : null,
    div.class`agreement-create-grid`(
      label(
        "Client business",
        input
          .class(_=> `manufacturer-input${hasClientBusinessError ? " ledger-input-invalid" : ""}`)
          .attr("aria-invalid", _=> hasClientBusinessError ? "true" : "false")
          .type`text`
          .value(_=> agreementDraft.clientBusiness)
          .placeholder`Sample Agreement`
          .onInput((event) => updateDraft({ clientBusiness: String(event.target.value || "") }))(),
        p.class`ledger-field-error`(_=> getAgreementFieldError(ui, "clientBusiness"))
      ),
      label(
        "Client representative",
        input
          .class`manufacturer-input`
          .type`text`
          .value(_=> agreementDraft.clientRepresentative)
          .placeholder`Authorized signer`
          .onInput((event) => updateDraft({ clientRepresentative: String(event.target.value || "") }))()
      ),
      label(
        "Customer email",
        input
          .class(_=> `manufacturer-input${hasCustomerEmailError ? " ledger-input-invalid" : ""}`)
          .type`email`
          .attr("required", "required")
          .attr("aria-invalid", _=> hasCustomerEmailError ? "true" : "false")
          .value(_=> agreementDraft.customerEmail)
          .placeholder`customer@example.com`
          .onInput((event) => updateDraft({ customerEmail: String(event.target.value || "") }))(),
        p.class`ledger-field-error`(_=> getAgreementFieldError(ui, "customerEmail"))
      ),
      label(
        "Provider",
        input
          .class`manufacturer-input`
          .type`text`
          .value(_=> agreementDraft.providerName)
          .placeholder`3D Local Print LLC`
          .onInput((event) => updateDraft({ providerName: String(event.target.value || "") }))()
      ),
      label(
        "Currency",
        input
          .class`manufacturer-input`
          .type`text`
          .value(_=> agreementDraft.currency)
          .placeholder`usd`
          .onInput((event) => updateDraft({ currency: String(event.target.value || "") }))()
      ),
      label(
        "Effective date",
        input
          .class`manufacturer-input`
          .type`date`
          .value(_=> agreementDraft.effectiveDate)
          .onInput((event) => updateDraft({ effectiveDate: String(event.target.value || "") }))()
      ),
      label(
        "Payment due",
        input
          .class`manufacturer-input`
          .type`date`
          .value(_=> agreementDraft.paymentDueDate)
          .onInput((event) => updateDraft({ paymentDueDate: String(event.target.value || "") }))()
      ),
      label(
        "Service start",
        input
          .class`manufacturer-input`
          .type`date`
          .value(_=> agreementDraft.serviceStartDate)
          .onInput((event) => {
            const serviceStartDate = String(event.target.value || "");
            updateDraftAndRender({ serviceStartDate, serviceEndDate: addYearMinusDay(serviceStartDate) });
          })()
      ),
      label(
        "Service end",
        input
          .class`manufacturer-input`
          .type`date`
          .value(_=> agreementDraft.serviceEndDate)
          .onInput((event) => updateDraft({ serviceEndDate: String(event.target.value || "") }))()
      ),
      label(
        "Yearly amount",
        input
          .class`manufacturer-input`
          .type`number`
          .attr("min", "0.01")
          .attr("step", "0.01")
          .value(_=> agreementDraft.yearlyAmount)
          .onInput((event) => updateDraft({ yearlyAmount: String(event.target.value || "") }))()
      )
    ),
    div.class`agreement-services-editor`(
      div.class`agreement-services-editor-header`(
        h2("Services"),
        button.type`button`.class`ghost-button`.onClick(addServiceDraft)("Add service")
      ),
      _=> serviceError ? p.class`ledger-field-error`(serviceError) : null,
      _=> agreementDraft.services.map((service, index) =>
        div.class`agreement-service-row`(
          label.class`agreement-service-check`(
            input
              .type`checkbox`
              .checked(_=> service.included)
              .onChange((event) => updateServiceDraft(index, { included: Boolean(event.target.checked) }))(),
            span("Included")
          ),
          label(
            "Service",
            input
              .class`manufacturer-input`
              .type`text`
              .value(_=> service.label)
              .onInput((event) => updateServiceDraft(index, { label: String(event.target.value || "") }))()
          ),
          label(
            "Monthly value",
            input
              .class`manufacturer-input`
              .type`number`
              .attr("min", "0")
              .attr("step", "0.01")
              .value(_=> service.monthlyValue)
              .onInput((event) => updateServiceDraft(index, { monthlyValue: String(event.target.value || "") }))()
          ),
          label(
            "Yearly cost",
            input
              .class`manufacturer-input`
              .type`number`
              .attr("min", "0")
              .attr("step", "0.01")
              .value(_=> service.yearlyCost)
              .onInput((event) => updateServiceDraft(index, { yearlyCost: String(event.target.value || "") }))()
          ),
          button
            .type`button`
            .class`ghost-button`
            .disabled(_=> agreementDraft.services.length <= 1)
            .onClick(() => removeServiceDraft(index))("Remove")
        ).key(`service-${index}`)
      )
    ),
    _=> ui.modalMode === "edit" ? AgreementOrderLink(editingAgreement) : null,
    _=> ui.modalMode === "edit" ? AgreementAcceptanceMeta(editingAgreement) : null,
    div.class`auth-actions`(
      button
        .type`button`
        .class`ghost-button`
        .disabled(_=> createLoading)
        .onClick(closeCreateAgreementModal)("Cancel"),
      button
        .type`button`
        .class`add-button`
        .disabled(_=> createLoading)
        .onClick(saveAgreement)(
        _=> createLoading ? "Saving..." : ui.modalMode === "edit" ? "Save agreement" : "Create agreement"
      )
    ),
    _=> ui.modalMode === "edit"
      ? div.class`agreement-email-actions`(
          button
            .type`button`
            .class`ghost-button`
            .disabled(_=> createLoading || sendAgreementEmailLoading)
            .onClick(sendAgreementEmail)(
              _=> sendAgreementEmailLoading ? "Sending agreement email..." : "Send agreement email"
            ),
          ui.sendAgreementEmailStatusText
            ? p.class`orders-email-status`(_=> ui.sendAgreementEmailStatusText)
            : null
        )
      : null
  )
  );
});

const copyAgreementLink = async (agreement: AgreementRecord) => {
  const url = agreement.publicAgreementUrl;
  if (!url) {
    toast.error("This agreement does not have a public link.");
    return;
  }
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Private agreement link copied.");
  } catch (error) {
    console.error("Failed to copy agreement link", error);
    toast.error("Could not copy the link. Open it and copy from the address bar.");
  }
};

const getOrderHref = (agreement: AgreementRecord) => {
  if (!agreement.orderId) return "";
  const url = new URL("/admin/orders/index.html", window.location.origin);
  url.searchParams.set("orderId", agreement.orderId);
  return url.toString();
};

const AgreementRows = (agreements: AgreementRecord[]) =>
  agreements.map((agreement) =>
    tr.class`ledger-row`(
      td(
        div.class`ledger-title-stack`(
          span.class`ledger-title-cell`(agreement.clientBusiness || "Agreement"),
          p.class`orders-meta`(agreement.id)
        )
      ),
      td(
        div.class`orders-status-stack`(
          span.class(_=> `pill ledger-status-pill agreements-status-${agreement.status}`)(
            agreement.status.replace(/_/g, " ")
          ),
          agreement.paidAt ? p.class`orders-meta`(`Paid ${formatDate(agreement.paidAt)}`) : null
        )
      ),
      td(
        div.class`ledger-title-stack`(
          span.class`ledger-title-cell`(`${formatDate(agreement.serviceStartDate)} - ${formatDate(agreement.serviceEndDate)}`),
          p.class`orders-meta`(`Due ${formatDate(agreement.paymentDueDate)}`)
        )
      ),
      td(
        div.class`ledger-amount-stack`(
          span.class`ledger-amount-value ledger-amount-positive`(
            formatMoney(agreement.amountTotal || agreement.yearlyAmount, agreement.currency)
          ),
          getOrderHref(agreement)
            ? p.class`orders-meta`(
                a
                  .class`orders-meta-link`
                  .href(getOrderHref(agreement))(agreement.orderId)
              )
            : null
        )
      ),
      td(
        div.class`orders-detail-actions agreements-actions`(
          button
            .type`button`
            .class`ghost-button`
            .attr("aria-label", "Edit agreement")
            .attr("title", "Edit agreement")
            .onClick(() => openEditAgreementModal(agreement))("✏️"),
          agreement.publicAgreementUrl
            ? button
                .type`button`
                .class`ghost-button`
                .attr("aria-label", "Copy agreement link")
                .attr("title", "Copy agreement link")
                .onClick(() => copyAgreementLink(agreement))("📋")
            : null,
          agreement.publicAgreementUrl
            ? a
                .class`ghost-button`
                .href(agreement.publicAgreementUrl)
                .target`_blank`
                .rel`noreferrer`("Open")
            : null,
          getOrderHref(agreement)
            ? a
                .class`add-button`
                .href(getOrderHref(agreement))("Order")
            : null
        )
      )
    ).key(agreement.id)
  );

export const AgreementsApp = tag(() => [
  AdminNav(handleSignOut, currentUser),
  section.class`panel ledger-panel orders-panel agreements-panel`(
    div.class`ledger-header`(
      div.class`ledger-heading`(
        h1("Agreements"),
        p("Create and track private website service agreements, acceptance, and linked payments.")
      ),
      div.class`ledger-header-actions`(
        subscribe(agreementsUi$, ([ui]) =>
          button
            .type`button`
            .class`add-button`
            .disabled(_=> Boolean(ui?.createLoading))
            .onClick(openCreateAgreementModal)(
            "Add Agreement"
          )
        )
      )
    ),
    subscribe(agreementsUi$, ([ui]) =>
      ui?.createStatusText ? p.class`orders-email-status`(ui.createStatusText) : null
    ),
    subscribe(agreements$, (agreements) =>
      agreements.length
        ? div.class`ledger-table-block`(
            div.class`ledger-table-wrap`(
              table.class`ledger-table orders-table agreements-table`(
                thead(
                  tr(
                    th("Agreement"),
                    th("Status"),
                    th("Service period"),
                    th("Payment"),
                    th("Actions")
                  )
                ),
                tbody(AgreementRows(agreements))
              )
            ),
            p.class`ledger-table-hint`(`showing ${agreements.length} latest agreements`)
          )
        : p.class`ledger-empty`("No agreements yet. Add an agreement to generate a private link.")
    ),
    subscribe(agreementsUi$, ([ui]) =>
      Modal({
        modalOpen: Boolean(ui?.createModalOpen),
        title: ui?.modalMode === "edit" ? "Edit Agreement" : "Add Agreement",
        className: "ledger-modal agreements-create-modal",
        cardClassName: "ledger-modal-card agreements-create-modal-card",
        bodyClassName: "agreements-create-modal-body",
        onClose: closeCreateAgreementModal,
        content: () => AgreementCreateForm(ui || getAgreementsUi()),
      })
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
  tagElement(AgreementsApp, nextRoot);
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
    stopAgreementSubscription();
  },
  onDenied: () => {
    currentAuthUser = null;
    stopAgreementSubscription();
  },
  onAuthorized: ({ user, authState }) => {
    currentAuthUser = user || firebaseAuth.currentUser;
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
