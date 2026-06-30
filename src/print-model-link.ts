import { fetchApiWithFallback } from "./api-url.js";
import { Step1 } from "./Step1.js";
import { Step2 } from "./Step2.js";
import { Step3 } from "./Step3.js";
import { Step4 } from "./Step4.js";
import {
  a,
  array,
  button,
  div,
  h2,
  input,
  label,
  li,
  p,
  section,
  span,
  strong,
  tag,
  tagElement,
  ul,
} from "taggedjs";
import { subscribe } from "taggedjs/js/TagJsTags/subscribe.function.js";

type ModelItem = {
  url: string;
  quantity: number;
};

type ModelLinkDraft = ModelItem & {
  id: string;
};

type QuoteRequestPayload = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  modelItems: ModelItem[];
  modelLinks: string[];
  projectDetails: string;
  quantity: number;
  pageUrl: string;
  marketingOptIn: boolean;
};

export type QuoteUiState = {
  activeStep: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  links: ModelLinkDraft[];
  projectDetails: string;
  marketingOptIn: boolean;
  statusText: string;
  statusState: "idle" | "success" | "error";
  successRequestId: string;
  successReviewUrl: string;
  errors: Record<string, string>;
  submitting: boolean;
};

type SavedQuoteRequestState = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  modelItems: ModelItem[];
  projectDetails: string;
  marketingOptIn: boolean;
  activeStep: number;
};

const STORAGE_KEY = "3dlocalprint:model-link-quote-request:v1";
const form = document.getElementById("printModelLinkForm") as HTMLFormElement | null;

const createDraftId = () =>
  globalThis.crypto?.randomUUID?.() || `link_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;

const normalizeQuantity = (value: unknown) =>
  Math.max(1, Math.min(999, Math.round(Number(value) || 1)));

const isLikelyUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const readSavedState = (): Partial<SavedQuoteRequestState> => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Partial<SavedQuoteRequestState>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

const savedState = readSavedState();
const createEmptyLinks = () => [{ id: createDraftId(), url: "", quantity: 1 }];
const initialLinks = Array.isArray(savedState.modelItems) && savedState.modelItems.length
  ? savedState.modelItems.map((item) => ({
      id: createDraftId(),
      url: String(item.url || ""),
      quantity: normalizeQuantity(item.quantity),
    }))
  : createEmptyLinks();

const getSavedActiveStep = () =>
  Math.max(1, Math.min(4, Math.round(Number(savedState.activeStep) || 1)));

const getInitialActiveStep = (state: QuoteUiState) => {
  const savedActiveStep = getSavedActiveStep();
  const firstInvalid = getFirstInvalidStep(state);
  if (!firstInvalid) return 4;
  return Math.min(savedActiveStep, firstInvalid.step);
};

const quoteUi$ = array<QuoteUiState>([
  {
    activeStep: 1,
    customerName: String(savedState.customerName || ""),
    customerEmail: String(savedState.customerEmail || ""),
    customerPhone: String(savedState.customerPhone || ""),
    links: initialLinks,
    projectDetails: String(savedState.projectDetails || ""),
    marketingOptIn: Boolean(savedState.marketingOptIn),
    statusText: "",
    statusState: "idle",
    successRequestId: "",
    successReviewUrl: "",
    errors: {},
    submitting: false,
  },
]);

export const getQuoteUi = () => quoteUi$[0];

const getModelItems = (state = getQuoteUi()): ModelItem[] =>
  state.links
    .map((item) => ({
      url: String(item.url || "").trim(),
      quantity: normalizeQuantity(item.quantity),
    }))
    .filter((item) => item.url)
    .filter((item, index, items) => items.findIndex((candidate) => candidate.url === item.url) === index);

export const buildPayload = (state = getQuoteUi()): QuoteRequestPayload => {
  const modelItems = getModelItems(state);
  return {
    customerName: state.customerName.trim(),
    customerEmail: state.customerEmail.trim(),
    customerPhone: state.customerPhone.trim(),
    modelItems,
    modelLinks: modelItems.map((item) => item.url),
    projectDetails: state.projectDetails.trim(),
    quantity: modelItems.reduce((total, item) => total + item.quantity, 0) || 1,
    pageUrl: window.location.href,
    marketingOptIn: Boolean(state.marketingOptIn),
  };
};

const saveState = (state = getQuoteUi()) => {
  try {
    const payload = buildPayload(state);
    const saved: SavedQuoteRequestState = {
      customerName: state.customerName,
      customerEmail: state.customerEmail,
      customerPhone: state.customerPhone,
      modelItems: payload.modelItems,
      projectDetails: state.projectDetails,
      marketingOptIn: Boolean(state.marketingOptIn),
      activeStep: state.activeStep,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  } catch {
    // Draft persistence is best-effort; quote submission should still work.
  }
};

const clearSavedState = () => {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
};

const setQuoteUi = (patch: Partial<QuoteUiState>) => {
  const next = {
    ...getQuoteUi(),
    ...patch,
  };
  quoteUi$.splice(0, 1, next);
  saveState(next);
};

const setStatus = (statusText: string, statusState: QuoteUiState["statusState"] = "idle") => {
  setQuoteUi({ statusText, statusState });
};

export const validateStep = (step: number, state = getQuoteUi()) => {
  const payload = buildPayload(state);
  if (step === 1) {
    if (!payload.modelItems.length) return { key: "modelLinks", message: "Paste at least one model link." };
    if (payload.modelItems.some((item) => !isLikelyUrl(item.url))) {
      return { key: "modelLinks", message: "Each model link should start with http:// or https://." };
    }
  }
  if (step === 2) {
    if (!payload.customerName) return { key: "customerName", message: "Please enter your name." };
    if (!payload.customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.customerEmail)) {
      return { key: "customerEmail", message: "Please enter a valid email address." };
    }
  }
  if (step === 3) {
    if (!payload.modelItems.length) return { key: "modelItems", message: "Paste at least one model link before setting quantities." };
    if (payload.modelItems.some((item) => !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 999)) {
      return { key: "modelItems", message: "Every quantity must be between 1 and 999." };
    }
  }
  return null;
};

const getFirstInvalidStep = (state = getQuoteUi()) => {
  const error = validateStep(1, state) || validateStep(2, state) || validateStep(3, state);
  if (!error) return null;
  if (error.key === "customerName" || error.key === "customerEmail") return { step: 2, error };
  if (error.key === "modelItems") return { step: 3, error };
  return { step: 1, error };
};

quoteUi$[0].activeStep = getInitialActiveStep(quoteUi$[0]);

export const activateStep = (activeStep: number) => {
  const state = getQuoteUi();
  setQuoteUi({
    activeStep: Math.max(0, Math.min(4, activeStep)),
    errors: {},
    statusText: state.statusState === "success" ? state.statusText : "",
    statusState: state.statusState === "success" ? "success" : "idle",
    successRequestId: state.statusState === "success" ? state.successRequestId : "",
    successReviewUrl: state.statusState === "success" ? state.successReviewUrl : "",
  });
};

export const toggleStep = (step: number) => {
  const state = getQuoteUi()
  activateStep(state.activeStep === step ? 0 : step);
  return state
};

export const goNext = (fromStep: number, toStep: number) => {
  const error = validateStep(fromStep);
  if (error) {
    setQuoteUi({
      errors: { [error.key]: error.message },
      statusText: error.message,
      statusState: "error",
    });
    return;
  }
  activateStep(toStep);
};

const updateLink = (id: string, patch: Partial<ModelLinkDraft>) => {
  const state = getQuoteUi();
  setQuoteUi({
    links: state.links.map((item) => item.id === id ? { ...item, ...patch } : item),
    errors: { ...state.errors, modelLinks: "", modelItems: "" },
    statusText: state.statusState === "error" ? "" : state.statusText,
    statusState: state.statusState === "error" ? "idle" : state.statusState,
  });
};

export const addLink = () => {
  const state = getQuoteUi();
  setQuoteUi({
    links: [...state.links, { id: createDraftId(), url: "", quantity: 1 }],
    errors: { ...state.errors, modelLinks: "", modelItems: "" },
  });
};

const removeLink = (id: string) => {
  const state = getQuoteUi();
  const nextLinks = state.links.filter((item) => item.id !== id);
  setQuoteUi({
    links: nextLinks.length ? nextLinks : createEmptyLinks(),
    errors: { ...state.errors, modelLinks: "", modelItems: "" },
  });
};

export const updateField = (
  key: "customerName" | "customerEmail" | "customerPhone" | "projectDetails" | "marketingOptIn",
  value: string | boolean,
) => {
  const state = getQuoteUi();
  setQuoteUi({
    [key]: value,
    errors: { ...state.errors, [key]: "" },
    statusText: state.statusState === "error" ? "" : state.statusText,
    statusState: state.statusState === "error" ? "idle" : state.statusState,
  } as Partial<QuoteUiState>);
};

const readResponseBody = async (response: Response) => {
  const text = await response.text().catch(() => "");
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { error: text };
  }
};

const submitQuoteRequest = async () => {
  const invalid = getFirstInvalidStep();
  if (invalid) {
    setQuoteUi({
      activeStep: invalid.step,
      errors: { [invalid.error.key]: invalid.error.message },
      statusText: invalid.error.message,
      statusState: "error",
    });
    return;
  }

  const payload = buildPayload();
  setQuoteUi({ submitting: true, statusText: "Sending quote request...", statusState: "idle", errors: {} });

  try {
    const response = await fetchApiWithFallback(
      "/api/model-link-quote-requests",
      "submitModelLinkQuoteRequest",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const result = await readResponseBody(response) as { error?: string; requestId?: string; publicReviewUrl?: string };
    if (!response.ok) {
      const fallbackMessage = window.location.hostname === "localhost"
        ? "Could not send the quote request. Start the Firebase Functions emulator or deploy the updated function before testing submit."
        : "Could not send the quote request.";
      throw new Error(String(result?.error || fallbackMessage));
    }

    const requestId = String(result?.requestId || "").trim();
    const publicReviewUrl = String(result?.publicReviewUrl || "").trim();
    clearSavedState();
    setQuoteUi({
      activeStep: 1,
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      links: createEmptyLinks(),
      projectDetails: "",
      marketingOptIn: false,
      submitting: false,
      statusText: requestId
        ? `Quote request ${requestId} was sent. A confirmation email is on the way.${publicReviewUrl ? ` Review link: ${publicReviewUrl}` : ""}`
        : "Quote request sent. A confirmation email is on the way.",
      statusState: "success",
      successRequestId: requestId,
      successReviewUrl: publicReviewUrl,
      errors: {},
    });
  } catch (error) {
    console.error("Failed to submit model link quote request", error);
    setQuoteUi({
      submitting: false,
      statusText: error instanceof Error ? error.message : "Could not send the quote request.",
      statusState: "error",
      successRequestId: "",
      successReviewUrl: "",
    });
  }
};

export const ErrorText = (message = "") =>
  message ? p.class`print-link-error`(message) : null;

export const LinkRow = (item: ModelLinkDraft, canRemove: boolean) =>
  div.class`print-link-row`(
    input
      .attr("data-model-link-input", "true")
      .name("modelLinks")
      .type("url")
      .placeholder("Paste link to model here...")
      .value(_ => item.url)
      .onInput((event) => updateLink(item.id, { url: String(event.target.value || "") }))(),
    button
      .class`ghost-button print-link-remove`
      .type("button")
      .ariaLabel`Remove model link`
      .disabled(_ => !canRemove)
      .onClick(_ => removeLink(item.id))(
      "🗑️"
    )
  ).key(item.id);

export const ContactField = (
  id: "customerName" | "customerEmail" | "customerPhone",
  labelText: string,
  type: string,
  autocomplete: string,
  value: string,
  error = "",
) =>
  div.class(`print-link-field${error ? " is-invalid" : ""}`)(
    label.attr("for", id)(labelText),
    input
      .id(id)
      .name(id)
      .type(type)
      .attr("autocomplete", autocomplete)
      .value(_ => value)
      .onInput((event) => updateField(id, String(event.target.value || "")))
      .onKeyDown((event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          goNext(2, 3);
        }
      })(),
    ErrorText(error)
  );

export const QuantityRows = (state: QuoteUiState) => {
  const validLinks = state.links.filter((item) => item.url.trim());
  if (!validLinks.length) {
    return p.class`print-link-placeholder`("Paste at least one model link in Step 1 to set quantities here.");
  }

  return validLinks.map((item) =>
    div.class`print-link-quantity-row`(
      a.href(item.url).target("_blank").rel("noopener noreferrer")(item.url),
      label(
        "Qty",
        input
          .type("number")
          .min("1")
          .max("999")
          .value(_ => String(normalizeQuantity(item.quantity)))
          .onInput((event) => updateLink(item.id, { quantity: normalizeQuantity(event.target.value) }))()
      )
    ).key(`quantity-${item.id}`)
  );
};

export const ReviewGroup = (labelText: string, value: any) =>
  div.class`print-link-review-group`(
    strong(labelText),
    Array.isArray(value)
      ? ul(value.map((item) => li(item)))
      : span(value || "—")
  );

export const LinkReviewValue = (item: ModelItem) =>
  div.class`print-link-review-model`(
    a.href(item.url).target("_blank").rel("noopener noreferrer")(item.url),
    ul(
      li(`Quantity: ${item.quantity}`)
    )
  );

const SuccessReceipt = tag(() => {
  let state = getQuoteUi()

  SuccessReceipt.updates(() => {
    state = getQuoteUi()
  })

  return [
    () => {
      if (state.statusState !== "success" || !state.statusText) return null;

      return section
        .class`print-link-success-receipt`
        .id("printModelLinkStatus")
        .attr("role", "status")
        .attr("aria-live", "polite")
        .attr("data-state", "success")(
        div.class`print-link-success-badge`("Quote sent"),
        h2("Your quote request is on its way"),
        p(
          state.successRequestId
            ? [
                "Quote request ",
                strong(state.successRequestId),
                " was sent. A confirmation email is on the way.",
              ]
            : "Quote request sent. A confirmation email is on the way."
        ),
        state.successReviewUrl
          ? p.class`print-link-success-review`(
              span("Review link:"),
              a.href(state.successReviewUrl).target("_blank").rel("noopener noreferrer")(state.successReviewUrl)
            )
          : null,
        p.class`print-link-success-note`("The form has been reset so you can send another model link quote request.")
      ).key("print-link-success-receipt")

    }
  ]
})

const PrintModelLinkApp = tag(function PrintModelLinkAppFn(){
  return subscribe(quoteUi$, ([state]) => [
    Step1(),
    Step2(),
    Step3(),
    Step4(),
    SuccessReceipt(),
  ])
});

if (form) {
  form.replaceChildren();
  tagElement(PrintModelLinkApp, form);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitQuoteRequest();
  });
}
