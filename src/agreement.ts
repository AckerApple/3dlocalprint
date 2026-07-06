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
  ul,
  ol,
  li,
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
  description: string;
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
  termsMarkdown: string;
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

const getDefaultServiceDescription = (label = "") => {
  const normalizedLabel = label.toLowerCase();
  if (normalizedLabel.includes("email")) {
    return "Automated email notifications for website-submitted order requests, customer inquiries, and product requests. Delivery can be affected by third-party email systems, spam filtering, and customer mail settings.";
  }
  if (normalizedLabel.includes("order tracking")) {
    return "Customer-facing order lookup or tracking features for checking order status online.";
  }
  if (normalizedLabel.includes("admin")) {
    return "Protected admin access for approved business users to manage site information. This does not include customer accounts, customer dashboards, or public customer login access.";
  }
  if (normalizedLabel.includes("image")) {
    return "Storage for product, catalog, and website images used by the client website. This is not intended for unrelated file storage, backups, video hosting, or excessive unrelated uploads.";
  }
  if (normalizedLabel.includes("catalog")) {
    return "A live website product catalog that can be updated through the website system and shown to customers with current product information supplied by the client.";
  }
  return "";
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
  agreement.services.filter((service) => service.included !== false).map((service) => {
    const description = service.description || getDefaultServiceDescription(service.label);
    return (
    tr(
      td(
        div.class`agreement-service-name`(service.label),
        description
          ? p.class`agreement-service-description`(description)
          : null
      ),
      td(formatMoney(service.monthlyValue, agreement.currency)),
      td(formatMoney(service.yearlyCost, agreement.currency))
    )
    );
  });

const stripMarkdownHeading = (line: string) => line.replace(/^#{1,6}\s+/, "").trim();

const getSafeMarkdownHref = (href = "") => {
  const value = href.trim();
  if (/^(https?:|mailto:)/i.test(value) || /^(\.?\.\/|#)/.test(value)) {
    return value;
  }
  return "";
};

const parseInlineMarkdown = (text = "") => {
  const nodes: any[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null = null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      const href = getSafeMarkdownHref(match[2]);
      nodes.push(href ? a.class`legal-inline-link`.href(href)(match[1]) : match[1]);
    } else if (match[3]) {
      nodes.push(strong(match[3]));
    } else if (match[4]) {
      nodes.push(span.class`agreement-markdown-emphasis`(match[4]));
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length ? nodes : [text];
};

const renderMarkdownList = (items: string[], ordered: boolean) =>
  ordered
    ? ol(...items.map((item) => li(...parseInlineMarkdown(item))))
    : ul(...items.map((item) => li(...parseInlineMarkdown(item))));

const renderMarkdownTerms = (markdown = "") => {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: any[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let listOrdered = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(p(...parseInlineMarkdown(paragraph.join(" "))));
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push(renderMarkdownList(listItems, listOrdered));
    listItems = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    const unorderedMatch = line.match(/^[-*]\s+(.+)$/);
    const orderedMatch = line.match(/^\d+\.\s+(.+)$/);
    if (unorderedMatch || orderedMatch) {
      flushParagraph();
      const ordered = Boolean(orderedMatch);
      if (listItems.length && listOrdered !== ordered) {
        flushList();
      }
      listOrdered = ordered;
      listItems.push((orderedMatch?.[1] || unorderedMatch?.[1] || "").trim());
      return;
    }

    flushList();

    if (/^#{1,6}\s+/.test(line)) {
      flushParagraph();
      const depth = line.match(/^#+/)?.[0].length || 1;
      const headingText = stripMarkdownHeading(line);
      blocks.push(depth <= 2 ? h2(...parseInlineMarkdown(headingText)) : h3(...parseInlineMarkdown(headingText)));
      return;
    }

    paragraph.push(line);
  });

  flushParagraph();
  flushList();

  return blocks.length ? div.class`agreement-markdown-terms`(...blocks) : null;
};

const ContractTerms = (agreement: PublicAgreement) =>
  div.class`agreement-terms`(
    h3("Selected Website Services"),
    table.class`ledger-table agreement-services-table`(
      thead(tr(th("Service"), th("Monthly value"), th("Yearly cost"))),
      tbody(serviceRows(agreement))
    ),
    div.class`public-order-totals agreement-totals`(
      div(span("Total selected services"), strong(String(agreement.totalSelectedServices))),
      div(span("Total monthly value"), strong(formatMoney(agreement.totalMonthlyValue, agreement.currency))),
      div.class`public-order-total`(span("Yearly technical service cost"), strong(formatMoney(agreement.yearlyAmount, agreement.currency)))
    ),
    renderMarkdownTerms(agreement.termsMarkdown)
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
    (_: unknown) => state.loading ? AgreementLoadingPanel() : null,
    (_: unknown) => !state.loading && state.error
      ? AgreementMessage("Agreement unavailable", state.error)
      : null,
    (_: unknown) => !state.loading && !state.error && !state.agreement
      ? AgreementMessage("Agreement unavailable", "We could not load this agreement.")
      : null,
    (_: unknown) => !state.loading && !state.error && state.agreement
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
