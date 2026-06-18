import { fetchApiWithFallback } from "./api-url.js";

type PublicQuoteRequest = {
  id: string;
  status: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  modelItems: Array<{
    url: string;
    quantity: number;
  }>;
  modelLinks: string[];
  projectDetails: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

const root = document.getElementById("printModelLinkOrderRoot");
const params = new URLSearchParams(window.location.search);
const requestId = String(params.get("request_id") || params.get("requestId") || "").trim();
const email = String(params.get("email") || "").trim();

const formatStatus = (status = "") =>
  String(status || "quote_requested").replace(/_/g, " ");

const formatDate = (value = "") => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const el = (tagName: string, className = "", text = "") => {
  const node = document.createElement(tagName);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
};

const detailRow = (label: string, value: string) => {
  const row = el("div", "public-order-meta-row");
  row.append(el("strong", "", label), el("span", "", value || "—"));
  return row;
};

const getQuoteModelItems = (quote: PublicQuoteRequest) =>
  Array.isArray(quote.modelItems) && quote.modelItems.length
    ? quote.modelItems
    : quote.modelLinks.map((url) => ({ url, quantity: quote.quantity || 1 }));

const renderMessage = (title: string, message: string) => {
  if (!root) return;
  const card = el("section", "home-card receipt-card");
  card.append(
    el("div", "receipt-status-pill", "Quote request"),
    el("h2", "", title),
    el("p", "", message),
  );
  root.replaceChildren(card);
};

const renderQuoteRequest = (quote: PublicQuoteRequest) => {
  if (!root) return;
  const card = el("section", "home-card receipt-card public-order-card");
  card.append(
    el("div", "receipt-status-pill", formatStatus(quote.status)),
    el("h2", "", "Request details"),
  );

  const requestNumber = el("div", "receipt-order-number");
  requestNumber.append(el("span", "", "Request number"), el("strong", "", quote.id));
  card.append(requestNumber);

  const meta = el("div", "public-order-meta");
  meta.append(
    detailRow("Name", quote.customerName),
    detailRow("Email", quote.customerEmail),
    detailRow("Phone", quote.customerPhone || "Not provided"),
    detailRow("Quantity", String(quote.quantity || 1)),
    detailRow("Submitted", formatDate(quote.createdAt)),
  );
  card.append(meta);

  const linksSection = el("div", "public-order-section");
  linksSection.append(el("h3", "", "Model links"));
  const links = el("div", "public-order-lines");
  getQuoteModelItems(quote).forEach((item) => {
    const row = el("div", "public-order-line");
    row.append(el("span", "", `${item.quantity}x`));
    const link = document.createElement("a");
    link.href = item.url;
    link.textContent = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    row.append(link);
    links.append(row);
  });
  linksSection.append(links);
  card.append(linksSection);

  const detailsSection = el("div", "public-order-section");
  detailsSection.append(el("h3", "", "Quote details"), el("p", "", quote.projectDetails || "No details provided."));
  card.append(detailsSection);

  root.replaceChildren(card);
};

const loadQuoteRequest = async () => {
  if (!requestId || !email) {
    renderMessage("Request unavailable", "This link is missing the request number or customer email.");
    return;
  }

  try {
    const requestParams = new URLSearchParams({ requestId, email });
    const response = await fetchApiWithFallback(
      `/api/public/model-link-quote-request?${requestParams.toString()}`,
      "getPublicModelLinkQuoteRequest",
    );
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload?.quoteRequest) {
      renderMessage("Request unavailable", "The request number and email did not match a quote request.");
      return;
    }
    renderQuoteRequest(payload.quoteRequest);
  } catch (error) {
    console.error("Failed to load model link quote request", error);
    renderMessage("Request unavailable", "Quote request details are unavailable right now.");
  }
};

loadQuoteRequest();
