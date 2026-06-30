import { fetchApiWithFallback } from "./api-url.js";
import {
  tag,
  tagElement,
  section,
  div,
  h2,
  h3,
  p,
  table,
  thead,
  tbody,
  tr,
  th,
  td,
  label,
  input,
  button,
  span,
  strong,
  a,
  array,
  subscribe,
} from "taggedjs";

type AgreementServiceItem = {
  label: string;
  included: boolean;
  monthlyValue: number;
  yearlyCost: number;
};

type PublicAgreement = {
  id: string;
  agreementVersion: string;
  status: string;
  clientBusiness: string;
  clientRepresentative: string;
  providerName: string;
  effectiveDate: string;
  paymentDueDate: string;
  serviceStartDate: string;
  serviceEndDate: string;
  yearlyAmount: number;
  currency: string;
  services: AgreementServiceItem[];
  totalSelectedServices: number;
  totalMonthlyValue: number;
  acceptedSignerName: string;
  acceptedAt: string;
  paidAt: string;
  amountTotal: number;
  orderId: string;
};

type AgreementState = {
  loading: boolean;
  checkoutLoading: boolean;
  error: string;
  statusText: string;
  signerName: string;
  accepted: boolean;
  customerEmail: string;
  agreement: PublicAgreement | null;
};

const root = document.getElementById("agreementRoot");
const params = new URLSearchParams(window.location.search);
const token = String(params.get("token") || "").trim();

const agreementState$ = array<AgreementState>([
  {
    loading: true,
    checkoutLoading: false,
    error: "",
    statusText: "",
    signerName: "",
    accepted: false,
    customerEmail: "",
    agreement: null,
  },
]);

const getAgreementState = () =>
  agreementState$[0] || {
    loading: true,
    checkoutLoading: false,
    error: "",
    statusText: "",
    signerName: "",
    accepted: false,
    customerEmail: "",
    agreement: null,
  };

const setAgreementState = (patch: Partial<AgreementState>) => {
  const current = getAgreementState();
  agreementState$[0] = {
    ...current,
    ...patch,
  };
};

const formatMoney = (cents = 0, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "usd").toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((Math.max(0, Number(cents) || 0)) / 100);

const formatDate = (value = "") => {
  if (!value) return "";
  const [year, month, day] = value.split("-").map(Number);
  const date = year && month && day ? new Date(year, month - 1, day) : new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
};

const getAgreementBrowserMeta = () => ({
  userAgent: navigator.userAgent || "",
  language: navigator.language || "",
  languages: Array.isArray(navigator.languages) ? navigator.languages.join(", ") : "",
  platform: navigator.platform || "",
  vendor: navigator.vendor || "",
  cookieEnabled: String(navigator.cookieEnabled),
  screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
  viewport: `${window.innerWidth || 0}x${window.innerHeight || 0}`,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
  timezoneOffsetMinutes: String(new Date().getTimezoneOffset()),
});

const serviceRows = (agreement: PublicAgreement) =>
  agreement.services.map((service) =>
    tr(
      td(service.label),
      td(service.included ? "Yes" : "No"),
      td(formatMoney(service.monthlyValue, agreement.currency)),
      td(formatMoney(service.yearlyCost, agreement.currency))
    )
  );

const ContractTerms = (agreement: PublicAgreement) =>
  div.class`agreement-terms`(
    h3("Service Agreement"),
    p(`This Service Agreement is between ${agreement.providerName || "the service provider"} and ${agreement.clientBusiness || "the client"} for selected yearly technical services for the ${agreement.clientBusiness || "client"} website.`),
    p("The selected services support website features such as email notifications, admin access, image storage, and a live product catalog. Personal time, setup work, development work, and labor are donated as a family courtesy and are not included as a paid labor charge."),
    h3("Selected Website Services"),
    table.class`ledger-table agreement-services-table`(
      thead(tr(th("Service"), th("Included"), th("Monthly value"), th("Yearly cost"))),
      tbody(serviceRows(agreement))
    ),
    div.class`public-order-totals agreement-totals`(
      div(span("Total selected services"), strong(String(agreement.totalSelectedServices))),
      div(span("Total monthly value"), strong(formatMoney(agreement.totalMonthlyValue, agreement.currency))),
      div.class`public-order-total`(span("Yearly technical service cost"), strong(formatMoney(agreement.yearlyAmount, agreement.currency)))
    ),
    h3("Payment Terms"),
    p(`The selected technical services are billed yearly in advance. Amount due is ${formatMoney(agreement.yearlyAmount, agreement.currency)} for a 12-month service period.`),
    p(`Service period: ${formatDate(agreement.serviceStartDate)} through ${formatDate(agreement.serviceEndDate)}. Payment is due before the yearly service period begins.`),
    h3("No Automatic Renewal"),
    p("This agreement does not automatically renew. To continue the selected services for another year, the client must confirm renewal and pay the next yearly technical service cost in advance."),
    p("If the client does not renew and pay before the next service period begins, the selected paid services may be paused, disabled, removed, or left inactive."),
    h3("Included Services"),
    p("Email Order Notifications allows the website system to send automated email notifications related to website-submitted order requests, customer inquiries, or product requests. Email delivery is not guaranteed and can be affected by third-party conditions outside the service provider's control."),
    p(`Admin Login System provides a protected admin area for ${agreement.clientBusiness || "the client"} for approved business users. This agreement does not include customer accounts, customer login access, customer dashboards, or customer order tracking.`),
    p(`Image Storage provides image storage needed for product and catalog images used on the ${agreement.clientBusiness || "client"} website. It is not intended for unrelated file storage, personal backups, video hosting, or excessive unrelated uploads.`),
    p("Live Product Catalog allows the website to display a live product catalog that can be updated through the website system."),
    h3("Services Not Included"),
    p(`Unless separately agreed in writing, this agreement does not include online order tracking, customer login accounts, payment processing for ${agreement.clientBusiness || "the client"} customers, online checkout, payment provider fees, domain registration, premium hosting, major redesigns, new unrelated pages, marketing, SEO, photography, copywriting, legal, tax, accounting, compliance advice, or emergency support outside reasonable availability.`),
    h3("Support, Responsibilities, and Ownership"),
    p("Reasonable support may include fixing issues related to the selected services, answering basic usage questions, and making small adjustments connected to included features. Large changes, new features, major redesigns, or work outside the selected services are not included."),
    p(`${agreement.clientBusiness || "The client"} is responsible for accurate business information, product details, images, prices, descriptions, availability, content review, and keeping admin credentials secure.`),
    p(`${agreement.clientBusiness || "The client"} owns its business name, product photos, descriptions, logos, branding, and business content. The service provider may own or reuse general website code, tools, templates, setup processes, and technical methods unless separately agreed in writing.`),
    h3("Third-Party Services and Limitations"),
    p("Some features may rely on third-party services such as email, hosting, database, image storage, authentication, or domain providers. The service provider is not responsible for outages, pricing changes, policy changes, restrictions, service limits, or technical issues caused by third-party services."),
    p("The service provider will make reasonable efforts to keep the selected services working properly, but is not responsible for lost sales, missed orders, undelivered emails, customer mistakes, incorrect product information, third-party outages, business interruptions, spam filtering, account restrictions, or damages beyond the amount paid under this agreement for the current yearly service period."),
    h3("Agreement Term and Acceptance"),
    p("This agreement begins on the service start date and continues for 12 months. A new 12-month service period begins only if the client confirms renewal and pays the yearly technical service cost in advance."),
    p("By typing a signer name, checking acceptance, and paying through secure checkout, the client agrees to the selected services, yearly cost, payment terms, and conditions listed in this agreement.")
  );

const AgreementMessage = (title: string, message: string) =>
  section.class`home-card receipt-card`(
    div.class`receipt-status-pill`("Agreement"),
    h2(title),
    p(message),
    div.class`receipt-actions`(
      a.class`ghost-button`.href("mailto:service@3dlocalprint.com")("Contact service")
    )
  );

const AcceptancePanel = (agreement: PublicAgreement, state: AgreementState) => {
  const isPaid = agreement.status === "paid_active";
  const canPay = state.signerName.trim().length >= 2 && state.accepted && !state.checkoutLoading && !isPaid;
  return section.class`home-card receipt-card agreement-acceptance-card`(
    div.class`receipt-status-pill`(isPaid ? "Paid" : "Acceptance"),
    h2(isPaid ? "Agreement paid" : "Accept and pay"),
    isPaid
      ? p(`Payment was received${agreement.paidAt ? ` on ${formatDate(agreement.paidAt)}` : ""}. Order ${agreement.orderId || "recorded"}.`)
      : p(`Type the authorized signer name for ${agreement.clientBusiness}, accept the agreement, and continue to secure checkout for ${formatMoney(agreement.yearlyAmount, agreement.currency)}.`),
    isPaid
      ? null
      : label.class`pet-upload-field agreement-field`(
          span("Signer name"),
          input
            .class`manufacturer-input`
            .type`text`
            .value(_=> state.signerName)
            .placeholder`Authorized signer`
            .onInput((event) => {
              setAgreementState({ signerName: String(event.target.value || "") });
            })()
        ),
    isPaid
      ? null
      : label.class`agreement-checkbox-row`(
          input
            .type`checkbox`
            .checked(_=> state.accepted)
            .onChange((event) => {
              setAgreementState({ accepted: Boolean(event.target.checked) });
            })(),
          span(
            "I have reviewed and accept this Service Agreement, including the no automatic renewal terms, the ",
            a.class`legal-inline-link`.href("./terms.html")("Terms of Service"),
            ", and the ",
            a.class`legal-inline-link`.href("./sales-policy.html")("Sales Policy"),
            "."
          )
        ),
    isPaid
      ? null
      : p.class`legal-notice`(
          "Agreement checkout records signer name, acceptance, customer/payment status, and browser/device metadata for the acceptance record. Payment opens secure Stripe checkout. See our ",
          a.class`legal-inline-link`.href("./privacy.html")("Privacy Policy"),
          "."
        ),
    state.statusText ? p.class`print-link-status`(state.statusText) : null,
    div.class`receipt-actions`(
      isPaid
        ? a.class`add-button`.href(`mailto:service@3dlocalprint.com?subject=${encodeURIComponent(`Agreement ${agreement.id}`)}`)("Contact service")
        : button
            .type`button`
            .class`add-button`
            .disabled(_=> !canPay)
            .onClick(startAgreementCheckout)(
            _=> state.checkoutLoading ? "Opening checkout..." : `Pay ${formatMoney(agreement.yearlyAmount, agreement.currency)}`
          )
    )
  );
};

const AgreementDetails = (agreement: PublicAgreement, state: AgreementState) =>
  [
    section.class`home-card receipt-card agreement-summary-card`(
      div.class`receipt-status-pill`(agreement.status.replace(/_/g, " ")),
      h2(agreement.clientBusiness || "Service Agreement"),
      div.class`public-order-meta`(
        div(strong("Agreement"), span(agreement.id)),
        div(strong("Effective"), span(formatDate(agreement.effectiveDate))),
        div(strong("Due"), span(formatDate(agreement.paymentDueDate))),
        div(strong("Service period"), span(`${formatDate(agreement.serviceStartDate)} - ${formatDate(agreement.serviceEndDate)}`))
      )
    ),
    section.class`home-card agreement-contract-card`(
      ContractTerms(agreement)
    ),
    AcceptancePanel(agreement, state),
  ];

const AgreementLoadingPanel = tag(() =>
  section.class`home-card receipt-card`(
    div.class`home-products-loading`(
      div.class`home-products-spinner`.ariaHidden`true`,
      p.class`home-products-loading-text`("...Loading agreement...")
    )
  )
);

const AgreementContent = tag((state: AgreementState = getAgreementState()) => {
  AgreementContent.inputs((args) => {
    [state = getAgreementState()] = args;
  });

  return [
    _=> state.loading ? AgreementLoadingPanel() : null,
    _=> !state.loading && state.error
      ? AgreementMessage("Agreement unavailable", state.error)
      : null,
    _=> !state.loading && !state.error && !state.agreement
      ? AgreementMessage("Agreement unavailable", "We could not load this agreement.")
      : null,
    _=> !state.loading && !state.error && state.agreement
      ? AgreementDetails(state.agreement, state)
      : null,
  ];
});

const AgreementApp = tag(() =>
  subscribe(
    agreementState$,
    function agreeAppSubCallback([state]) {
      return AgreementContent(state || getAgreementState())
    }
  )
)

const mountAgreementApp = () => {
  if (!root) return;
  root.replaceChildren();
  tagElement(AgreementApp, root);
};

const loadAgreement = async () => {
  if (!token) {
    setAgreementState({
      loading: false,
      error: "This agreement link is missing its private token.",
    });
    return;
  }

  try {
    const requestParams = new URLSearchParams({ token });
    const response = await fetchApiWithFallback(
      `/api/public/agreement?${requestParams.toString()}`,
      "getPublicAgreement"
    );
    if (!response.ok) {
      setAgreementState({ error: "This agreement link is invalid or no longer available." });
      return;
    }
    const payload = await response.json();
    const agreement = payload?.agreement || null;
    setAgreementState({
      agreement,
      error: agreement ? "" : "We could not load this agreement.",
    });
  } catch (error) {
    console.error("Failed to load agreement", error);
    setAgreementState({ error: "Agreement details are unavailable right now." });
  } finally {
    setAgreementState({ loading: false });
  }
};

async function startAgreementCheckout() {
  const state = getAgreementState();
  const agreement = state.agreement;
  if (!agreement || state.checkoutLoading) return;
  setAgreementState({
    checkoutLoading: true,
    statusText: "Opening secure checkout...",
  });
  try {
    const latestState = getAgreementState();
    const response = await fetchApiWithFallback(
      "/api/public/agreement/accept-checkout",
      "acceptAgreementAndCreateCheckoutSession",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Idempotency-Key": `agreement_${agreement.id}_${Date.now().toString(36)}`,
        },
        body: JSON.stringify({
          token,
          signerName: latestState.signerName,
          accepted: latestState.accepted,
          customerEmail: "",
          browserMeta: getAgreementBrowserMeta(),
          successUrl: `${window.location.origin}/receipt.html`,
          cancelUrl: window.location.href,
        }),
      }
    );
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(String(payload?.error || "Checkout failed."));
    }
    if (payload?.url) {
      window.location.href = payload.url;
      return;
    }
    throw new Error("Checkout URL missing in response.");
  } catch (error) {
    console.error("Agreement checkout failed", error);
    setAgreementState({
      checkoutLoading: false,
      statusText: error instanceof Error ? error.message : "Checkout failed.",
    });
  }
}

mountAgreementApp();
loadAgreement();
