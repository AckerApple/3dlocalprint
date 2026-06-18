import { fetchApiWithFallback } from "./api-url.js";
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
  textarea,
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
};

type QuoteUiState = {
  activeStep: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  links: ModelLinkDraft[];
  projectDetails: string;
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

const quoteUi$ = array<QuoteUiState>([
  {
    activeStep: Math.max(1, Math.min(4, Math.round(Number(savedState.activeStep) || 1))),
    customerName: String(savedState.customerName || ""),
    customerEmail: String(savedState.customerEmail || ""),
    customerPhone: String(savedState.customerPhone || ""),
    links: initialLinks,
    projectDetails: String(savedState.projectDetails || ""),
    statusText: "",
    statusState: "idle",
    successRequestId: "",
    successReviewUrl: "",
    errors: {},
    submitting: false,
  },
]);

const getQuoteUi = () => quoteUi$[0];

const getModelItems = (state = getQuoteUi()): ModelItem[] =>
  state.links
    .map((item) => ({
      url: String(item.url || "").trim(),
      quantity: normalizeQuantity(item.quantity),
    }))
    .filter((item) => item.url)
    .filter((item, index, items) => items.findIndex((candidate) => candidate.url === item.url) === index);

const buildPayload = (state = getQuoteUi()): QuoteRequestPayload => {
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
  quoteUi$[0] = next;
  saveState(next);
};

const setStatus = (statusText: string, statusState: QuoteUiState["statusState"] = "idle") => {
  setQuoteUi({ statusText, statusState });
};

const validateStep = (step: number, state = getQuoteUi()) => {
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

const activateStep = (activeStep: number) => {
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

const toggleStep = (step: number) => {
  activateStep(getQuoteUi().activeStep === step ? 0 : step);
};

const goNext = (fromStep: number, toStep: number) => {
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

const addLink = () => {
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

const updateField = (
  key: "customerName" | "customerEmail" | "customerPhone" | "projectDetails",
  value: string,
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

const StepHeading = (step: number, title: string, description: string) => {
  const state = getQuoteUi();
  const isActive = state.activeStep === step;
  const isComplete = step >= 1 && step <= 3 && !validateStep(step, state);
  return div
    .class`print-link-step-heading`
    .attr("role", "button")
    .attr("tabindex", "0")
    .attr("aria-expanded", isActive ? "true" : "false")
    .onClick(() => toggleStep(step))
    .onKeyDown((event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleStep(step);
      }
    })(
    div.class`print-link-step-kicker`(
      span.class`home-card-tag`(isComplete ? `✅ Step ${step}` : `Step ${step}`),
      span.class`print-link-step-toggle-label`(isActive ? "Collapse" : "Open")
    ),
    h2(title),
    p(description)
  );
};

const ErrorText = (message = "") =>
  message ? p.class`print-link-error`(message) : null;

const StepSection = (step: number, children: any[]) => {
  const state = getQuoteUi();
  const isActive = state.activeStep === step;
  return section
    .class(`home-card print-link-step-card${isActive ? " is-active" : " is-collapsed"}`)
    .attr("data-step", String(step))
    .attr("aria-hidden", isActive ? "false" : "true")(
    children
  );
};

const RecommendedSites = () =>
  div.class`print-link-recommended-sites`(
    strong("Recommended places to find models"),
    a.href("https://makerworld.com/en/3d-models").target("_blank").rel("noopener noreferrer")("MakerWorld"),
    a.href("https://www.yeggi.com/").target("_blank").rel("noopener noreferrer")("Yeggi"),
    a.href("https://www.printables.com/").target("_blank").rel("noopener noreferrer")("Printables")
  );

const LinkRow = (item: ModelLinkDraft, canRemove: boolean) =>
  div.class`print-link-row`(
    input
      .attr("data-model-link-input", "true")
      .name("modelLinks")
      .type("url")
      .placeholder("Paste link to model here...")
      .value(() => item.url)
      .onInput((event) => updateLink(item.id, { url: String(event.target.value || "") }))(),
    button
      .class`ghost-button print-link-remove`
      .type("button")
      .ariaLabel`Remove model link`
      .disabled(() => !canRemove)
      .onClick(() => removeLink(item.id))(
      "🗑️"
    )
  ).key(item.id);

const Step1 = (state: QuoteUiState) =>
  StepSection(1, [
    StepHeading(
      1,
      "🔗 Paste the link(s)",
      "Add one or more model pages. Public links work best because they usually include pictures, license notes, print settings, and downloadable files.",
    ),
    RecommendedSites(),
    div.class(`print-link-list${state.errors.modelLinks ? " is-invalid" : ""}`).id("modelLinksList")(
      state.links.map((item) => LinkRow(item, state.links.length > 1)),
      ErrorText(state.errors.modelLinks)
    ),
    div.class`print-link-actions`(
      button.class`ghost-button`.id("addModelLinkButton").type("button").onClick(addLink)("Add link"),
      button
        .class`add-button`
        .id("step1Next")
        .type("button")
        .disabled(() => !state.links.some((item) => item.url.trim()))
        .onClick(() => goNext(1, 2))(
        "Next"
      )
    ),
  ]);

const ContactField = (
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
      .value(() => value)
      .onInput((event) => updateField(id, String(event.target.value || "")))
      .onKeyDown((event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          goNext(2, 3);
        }
      })(),
    ErrorText(error)
  );

const Step2 = (state: QuoteUiState) =>
  StepSection(2, [
    StepHeading(
      2,
      "Contact details",
      "I may need to ask about scale, material, color, deadline, or whether a paid model has already been purchased.",
    ),
    ContactField("customerName", "Name", "text", "name", state.customerName, state.errors.customerName),
    ContactField("customerEmail", "Email", "email", "email", state.customerEmail, state.errors.customerEmail),
    ContactField("customerPhone", "Phone or text number", "tel", "tel", state.customerPhone, state.errors.customerPhone),
    div.class`print-link-actions`(
      button.class`ghost-button`.type("button").onClick(() => activateStep(1))("Back"),
      button.class`add-button`.id("step2Next").type("button").onClick(() => goNext(2, 3))("Next")
    ),
  ]);

const QuantityRows = (state: QuoteUiState) => {
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
          .value(() => String(normalizeQuantity(item.quantity)))
          .onInput((event) => updateLink(item.id, { quantity: normalizeQuantity(event.target.value) }))()
      )
    ).key(`quantity-${item.id}`)
  );
};

const Step3 = (state: QuoteUiState) =>
  StepSection(3, [
    StepHeading(
      3,
      "Quantity and quote details",
      "Set a quantity for each link. Notes about color, size, material, finish, deadline, pickup, or delivery are optional.",
    ),
    div.class(`print-link-quantities${state.errors.modelItems ? " is-invalid" : ""}`).id("modelItemQuantities")(
      QuantityRows(state),
      ErrorText(state.errors.modelItems)
    ),
    div.class`print-link-field`(
      label.attr("for", "projectDetails")("Additional details optional"),
      textarea
        .id("projectDetails")
        .name("projectDetails")
        .placeholder("Color, size, deadline, material preference, strength needs, finish, pickup/delivery notes...")
        .value(() => state.projectDetails)
        .onInput((event) => updateField("projectDetails", String(event.target.value || "")))()
    ),
    div.class`print-link-actions`(
      button.class`ghost-button`.type("button").onClick(() => activateStep(2))("Back"),
      button.class`add-button`.id("step3Next").type("button").onClick(() => goNext(3, 4))("Review")
    ),
  ]);

const ReviewGroup = (labelText: string, value: any) =>
  div.class`print-link-review-group`(
    strong(labelText),
    Array.isArray(value)
      ? ul(value.map((item) => li(item)))
      : span(value || "—")
  );

const LinkReviewValue = (item: ModelItem) =>
  div.class`print-link-review-model`(
    a.href(item.url).target("_blank").rel("noopener noreferrer")(item.url),
    ul(
      li(`Quantity: ${item.quantity}`)
    )
  );

const Step4 = (state: QuoteUiState) => {
  const payload = buildPayload(state);
  const missing: string[] = [];
  if (validateStep(1, state)) missing.push("Step 1: paste at least one valid model link.");
  if (validateStep(2, state)) missing.push("Step 2: add your name and email.");
  if (validateStep(3, state)) missing.push("Step 3: set quantity for each link.");

  return StepSection(4, [
    StepHeading(
      4,
      "Review and submit",
      "After you send this, you will receive an email with a request link. I will review the model and reply with a quote before printing.",
    ),
    div.class`print-link-review`.id("printModelLinkReview")(
      missing.length ? ReviewGroup("Before submitting", missing) : null,
      ReviewGroup(
        "Model links",
        payload.modelItems.length ? payload.modelItems.map(LinkReviewValue) : ["Waiting for Step 1"],
      ),
      ReviewGroup("Contact", [
        payload.customerName || "Waiting for name",
        payload.customerEmail || "Waiting for email",
        payload.customerPhone || "No phone provided",
      ]),
      ReviewGroup("Total quantity", String(payload.quantity || 1)),
      ReviewGroup("Additional details", payload.projectDetails || "No optional notes added.")
    ),
    button
      .class`add-button print-link-submit`
      .type("submit")
      .disabled(() => state.submitting)(
      "SEND FOR QUOTE"
    ),
    state.statusState === "success"
      ? null
      : p
          .class`print-link-status`
          .id("printModelLinkStatus")
          .attr("role", "status")
          .attr("aria-live", "polite")
          .attr("data-state", state.statusState)(
          state.statusText
        ),
  ]);
};

const SuccessReceipt = (state: QuoteUiState) => {
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
  );
};

const PrintModelLinkApp = tag(() =>
  subscribe(quoteUi$, ([state]) => [
    Step1(state),
    Step2(state),
    Step3(state),
    Step4(state),
    SuccessReceipt(state),
  ])
);

if (form) {
  form.replaceChildren();
  tagElement(PrintModelLinkApp, form);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitQuoteRequest();
  });
}
