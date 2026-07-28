export type CheckoutLineItem = {
  productId: string;
  variationId: string;
  quantity: number;
  title: string;
  unitAmount: number;
  currency: string;
};

export type OrderNotificationInput = {
  orderId: string;
  status: string;
  lineItems: CheckoutLineItem[];
  currency: string;
  amountSubtotal: number;
  amountTax: number;
  amountShipping: number;
  amountTotal: number;
  customerEmail: string;
  customerName: string;
  stripeMode: "sandbox" | "live";
  adminOrderUrl: string;
  publicOrderUrl: string;
  stripeDashboardUrl: string;
};

export type ModelLinkQuoteRequestItem = {
  url: string;
  quantity: number;
};

export type ModelLinkQuoteRequestInput = {
  requestId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  modelItems: ModelLinkQuoteRequestItem[];
  modelLinks: string[];
  projectDetails: string;
  quantity: number;
  pageUrl: string;
  publicReviewUrl: string;
  adminReviewUrl: string;
  createdAt: string;
};

export type AgreementSignRequestInput = {
  agreementId: string;
  clientBusiness: string;
  clientRepresentative: string;
  customerEmail: string;
  providerName: string;
  serviceStartDate: string;
  serviceEndDate: string;
  yearlyAmount: number;
  currency: string;
  publicAgreementUrl: string;
};

export type AgreementPaymentNotificationInput = {
  agreementId: string;
  clientBusiness: string;
  customerEmail: string;
  customerName: string;
  acceptedSignerName: string;
  paidAt: string;
  amountTotal: number;
  currency: string;
  orderId: string;
  stripeMode: "sandbox" | "live" | "";
  adminAgreementUrl: string;
  adminOrderUrl: string;
  publicAgreementUrl: string;
  stripeDashboardUrl: string;
};

export type OrganizationCheckoutRequestInput = {
  requestId: string;
  organizationName: string;
  organizationType: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  exemptionCertificateNumber: string;
  certificateExpirationDate: string;
  intendedUse: string;
  adminReviewUrl: string;
  createdAt: string;
};

export type AlertTemplateOutput = {
  subject: string;
  text: string;
  html: string;
};

export type AlertTemplateCatalogItem = {
  id: string;
  name: string;
  audience: "internal" | "customer";
  trigger: string;
  sourceFunction: string;
  sampleInput: Record<string, unknown>;
  variables: string[];
  rendered: AlertTemplateOutput;
};

export function buildOrganizationCheckoutRequestEmail(request: OrganizationCheckoutRequestInput): AlertTemplateOutput {
  const subject = sanitizeEmailHeader(`Organizational checkout request ${request.requestId} - ${request.organizationName}`);
  const text = [
    `Request: ${request.requestId}`,
    `Created: ${request.createdAt}`,
    `Organization: ${request.organizationName}`,
    `Type: ${request.organizationType}`,
    `Contact: ${request.contactName} · ${request.contactEmail} · ${request.phone}`,
    `Certificate: ${request.exemptionCertificateNumber}`,
    `Certificate expiration: ${request.certificateExpirationDate}`,
    "",
    "Intended use:",
    request.intendedUse,
    "",
    `Review request: ${request.adminReviewUrl}`,
  ].join("\n");
  const html = `
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Organizational checkout request</h1>
            <div style="margin-top:10px;font-size:16px;">${escapeHtml(request.organizationName)}</div>
          </div>
          <div style="padding:24px 26px;">
            <h2 style="margin:0 0 8px;font-size:18px;">Organization</h2>
            <p style="margin:0 0 18px;line-height:1.55;">${escapeHtml(request.organizationName)} · ${escapeHtml(request.organizationType)}</p>
            <h2 style="margin:0 0 8px;font-size:18px;">Contact</h2>
            <p style="margin:0 0 18px;line-height:1.55;">${escapeHtml(request.contactName)}<br>${escapeHtml(request.contactEmail)}<br>${escapeHtml(request.phone)}</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fffaf6;border:1px solid #f1e2d8;margin:0 0 20px;">
              <tr><td style="padding:12px 14px;color:#7b6255;">Certificate</td><td style="padding:12px 14px;font-weight:700;">${escapeHtml(request.exemptionCertificateNumber)}</td></tr>
              <tr><td style="padding:12px 14px;color:#7b6255;">Expires</td><td style="padding:12px 14px;">${escapeHtml(request.certificateExpirationDate)}</td></tr>
            </table>
            <h2 style="margin:0 0 8px;font-size:18px;">Intended use</h2>
            <p style="white-space:pre-wrap;margin:0 0 22px;line-height:1.55;">${escapeHtml(request.intendedUse)}</p>
            <a href="${escapeHtml(request.adminReviewUrl)}" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">Review organizational request</a>
          </div>
        </div>
      </div>
    </div>
  `;
  return { subject, text, html };
}

const ORDER_NOTIFICATION_EMAIL = "service@3dlocalprint.com";

function formatMoney(cents = 0, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "usd").toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((Math.max(0, Number(cents) || 0)) / 100);
}

function escapeHtml(value: string): string {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeEmailHeader(value = ""): string {
  return String(value || "").replace(/[\r\n]+/g, " ").trim();
}

function getLineItemTotal(item: CheckoutLineItem): number {
  return Math.max(0, Math.round(Number(item.unitAmount) || 0)) * Math.max(1, Math.round(Number(item.quantity) || 1));
}

function getStatusLabel(value = ""): string {
  return String(value || "unknown").replace(/_/g, " ");
}

export function buildOrderNotificationEmail(order: OrderNotificationInput): AlertTemplateOutput {
  const isTest = order.stripeMode === "sandbox";
  const subject = `${isTest ? "(test) " : ""}Order ${order.orderId} created - ${formatMoney(order.amountTotal, order.currency)}`;
  const customer = [order.customerName, order.customerEmail].filter(Boolean).join(" · ") || "No customer details recorded";
  const itemLines = order.lineItems.length
    ? order.lineItems.map((item) =>
      `- ${item.quantity}x ${item.title} @ ${formatMoney(item.unitAmount, item.currency)} = ${formatMoney(getLineItemTotal(item), item.currency)}`
    ).join("\n")
    : "- No line items recorded";
  const text = [
    `Order: ${order.orderId}`,
    `Status: ${getStatusLabel(order.status)}`,
    `Mode: ${order.stripeMode}`,
    `Customer: ${customer}`,
    `Subtotal: ${formatMoney(order.amountSubtotal, order.currency)}`,
    `Tax: ${formatMoney(order.amountTax, order.currency)}`,
    `Shipping: ${formatMoney(order.amountShipping, order.currency)}`,
    `Total: ${formatMoney(order.amountTotal, order.currency)}`,
    "",
    "Items:",
    itemLines,
    "",
    `Review order: ${order.adminOrderUrl}`,
    order.publicOrderUrl ? `Customer order page: ${order.publicOrderUrl}` : "",
    order.stripeDashboardUrl ? `Stripe: ${order.stripeDashboardUrl}` : "",
  ].filter((line) => line !== "").join("\n");
  const htmlItems = order.lineItems.length
    ? order.lineItems.map((item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f1e2d8;">
          <div style="font-weight:700;color:#2c211b;">${escapeHtml(item.title)}</div>
          <div style="margin-top:3px;color:#7b6255;font-size:13px;">${escapeHtml(item.productId || "product")} ${item.variationId ? `· ${escapeHtml(item.variationId)}` : ""}</div>
        </td>
        <td align="center" style="padding:12px 8px;border-bottom:1px solid #f1e2d8;color:#2c211b;">${item.quantity}</td>
        <td align="right" style="padding:12px 0;border-bottom:1px solid #f1e2d8;color:#2c211b;">${escapeHtml(formatMoney(item.unitAmount, item.currency))}</td>
        <td align="right" style="padding:12px 0 12px 12px;border-bottom:1px solid #f1e2d8;font-weight:700;color:#2c211b;">${escapeHtml(formatMoney(getLineItemTotal(item), item.currency))}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="4" style="padding:12px 0;color:#7b6255;">No line items recorded</td></tr>`;
  const html = `
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Order created</h1>
            <div style="margin-top:10px;font-size:16px;">${escapeHtml(order.orderId)}</div>
          </div>
          <div style="padding:24px 26px;">
            <div style="display:inline-block;background:#fff0e5;color:#ad4f20;border:1px solid #f3c1a4;border-radius:999px;padding:6px 10px;font-size:13px;font-weight:700;text-transform:capitalize;">
              ${escapeHtml(getStatusLabel(order.status))} · ${escapeHtml(order.stripeMode)}
            </div>
            <h2 style="margin:20px 0 8px;font-size:18px;color:#2c211b;">Customer</h2>
            <p style="margin:0 0 20px;color:#4d3a31;line-height:1.5;">${escapeHtml(customer)}</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 22px;">
              <thead>
                <tr>
                  <th align="left" style="padding:0 0 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Item</th>
                  <th align="center" style="padding:0 8px 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Qty</th>
                  <th align="right" style="padding:0 0 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Each</th>
                  <th align="right" style="padding:0 0 8px 12px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Line</th>
                </tr>
              </thead>
              <tbody>${htmlItems}</tbody>
            </table>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fffaf6;border:1px solid #f1e2d8;border-radius:10px;">
              <tr><td style="padding:14px 16px 6px;color:#7b6255;">Subtotal</td><td align="right" style="padding:14px 16px 6px;color:#2c211b;">${escapeHtml(formatMoney(order.amountSubtotal, order.currency))}</td></tr>
              <tr><td style="padding:6px 16px;color:#7b6255;">Tax</td><td align="right" style="padding:6px 16px;color:#2c211b;">${escapeHtml(formatMoney(order.amountTax, order.currency))}</td></tr>
              <tr><td style="padding:6px 16px 14px;color:#7b6255;">Shipping</td><td align="right" style="padding:6px 16px 14px;color:#2c211b;">${escapeHtml(formatMoney(order.amountShipping, order.currency))}</td></tr>
              <tr><td style="padding:14px 16px;border-top:1px solid #f1e2d8;font-size:18px;font-weight:700;color:#2c211b;">Total</td><td align="right" style="padding:14px 16px;border-top:1px solid #f1e2d8;font-size:20px;font-weight:700;color:#de6a2e;">${escapeHtml(formatMoney(order.amountTotal, order.currency))}</td></tr>
            </table>
            <div style="margin-top:24px;">
              <a href="${escapeHtml(order.adminOrderUrl)}" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">Review order in admin</a>
              ${order.publicOrderUrl ? `<a href="${escapeHtml(order.publicOrderUrl)}" style="display:inline-block;margin-left:10px;color:#ad4f20;text-decoration:none;font-weight:700;">Customer page</a>` : ""}
              ${order.stripeDashboardUrl ? `<a href="${escapeHtml(order.stripeDashboardUrl)}" style="display:inline-block;margin-left:10px;color:#ad4f20;text-decoration:none;font-weight:700;">Open Stripe</a>` : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return { subject, text, html };
}

export function buildCustomerOrderEmail(order: OrderNotificationInput): AlertTemplateOutput {
  const isTest = order.stripeMode === "sandbox";
  const subject = `${isTest ? "(test) " : ""}Your 3D Local Print order ${order.orderId}`;
  const customerGreeting = order.customerName ? `Hi ${order.customerName},` : "Hi,";
  const itemLines = order.lineItems.length
    ? order.lineItems.map((item) =>
      `- ${item.quantity}x ${item.title} @ ${formatMoney(item.unitAmount, item.currency)} = ${formatMoney(getLineItemTotal(item), item.currency)}`
    ).join("\n")
    : "- No line items recorded";
  const text = [
    customerGreeting,
    "",
    "Thanks for your order with 3D Local Print. We received your payment and will follow up if we need anything else.",
    "",
    `Order: ${order.orderId}`,
    `Subtotal: ${formatMoney(order.amountSubtotal, order.currency)}`,
    `Tax: ${formatMoney(order.amountTax, order.currency)}`,
    `Shipping: ${formatMoney(order.amountShipping, order.currency)}`,
    `Total: ${formatMoney(order.amountTotal, order.currency)}`,
    "",
    "Items:",
    itemLines,
    "",
    order.publicOrderUrl ? `Review your order: ${order.publicOrderUrl}` : "",
    "",
    "Questions? Reply to this email and we will help.",
  ].filter((line, index, lines) => line !== "" || lines[index - 1] !== "").join("\n");
  const htmlItems = order.lineItems.length
    ? order.lineItems.map((item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f1e2d8;">
          <div style="font-weight:700;color:#2c211b;">${escapeHtml(item.title)}</div>
        </td>
        <td align="center" style="padding:12px 8px;border-bottom:1px solid #f1e2d8;color:#2c211b;">${item.quantity}</td>
        <td align="right" style="padding:12px 0;border-bottom:1px solid #f1e2d8;color:#2c211b;">${escapeHtml(formatMoney(item.unitAmount, item.currency))}</td>
        <td align="right" style="padding:12px 0 12px 12px;border-bottom:1px solid #f1e2d8;font-weight:700;color:#2c211b;">${escapeHtml(formatMoney(getLineItemTotal(item), item.currency))}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="4" style="padding:12px 0;color:#7b6255;">No line items recorded</td></tr>`;
  const html = `
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Thanks for your order</h1>
            <div style="margin-top:10px;font-size:16px;">${escapeHtml(order.orderId)}</div>
          </div>
          <div style="padding:24px 26px;">
            <p style="margin:0 0 18px;color:#4d3a31;line-height:1.55;">${escapeHtml(customerGreeting)}</p>
            <p style="margin:0 0 22px;color:#4d3a31;line-height:1.55;">We received your payment and will follow up if we need anything else. Reply to this email with any questions.</p>
            ${order.publicOrderUrl ? `<div style="margin:0 0 22px;"><a href="${escapeHtml(order.publicOrderUrl)}" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">Review order details</a></div>` : ""}
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 22px;">
              <thead>
                <tr>
                  <th align="left" style="padding:0 0 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Item</th>
                  <th align="center" style="padding:0 8px 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Qty</th>
                  <th align="right" style="padding:0 0 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Each</th>
                  <th align="right" style="padding:0 0 8px 12px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Line</th>
                </tr>
              </thead>
              <tbody>${htmlItems}</tbody>
            </table>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fffaf6;border:1px solid #f1e2d8;border-radius:10px;">
              <tr><td style="padding:14px 16px 6px;color:#7b6255;">Subtotal</td><td align="right" style="padding:14px 16px 6px;color:#2c211b;">${escapeHtml(formatMoney(order.amountSubtotal, order.currency))}</td></tr>
              <tr><td style="padding:6px 16px;color:#7b6255;">Tax</td><td align="right" style="padding:6px 16px;color:#2c211b;">${escapeHtml(formatMoney(order.amountTax, order.currency))}</td></tr>
              <tr><td style="padding:6px 16px 14px;color:#7b6255;">Shipping</td><td align="right" style="padding:6px 16px 14px;color:#2c211b;">${escapeHtml(formatMoney(order.amountShipping, order.currency))}</td></tr>
              <tr><td style="padding:14px 16px;border-top:1px solid #f1e2d8;font-size:18px;font-weight:700;color:#2c211b;">Total</td><td align="right" style="padding:14px 16px;border-top:1px solid #f1e2d8;font-size:20px;font-weight:700;color:#de6a2e;">${escapeHtml(formatMoney(order.amountTotal, order.currency))}</td></tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
  return { subject, text, html };
}

export function buildModelLinkQuoteRequestEmail(request: ModelLinkQuoteRequestInput): AlertTemplateOutput {
  const subject = sanitizeEmailHeader(`Model link quote request ${request.requestId} - ${request.customerName}`);
  const linkLines = request.modelItems.length
    ? request.modelItems.map((item) => `- ${item.quantity}x ${item.url}`).join("\n")
    : "- No model links recorded";
  const customer = [
    request.customerName,
    request.customerEmail,
    request.customerPhone,
  ].filter(Boolean).join(" · ");
  const text = [
    `Quote request: ${request.requestId}`,
    `Created: ${request.createdAt}`,
    `Customer: ${customer}`,
    `Quantity: ${request.quantity}`,
    "",
    "Model links:",
    linkLines,
    "",
    "Project details:",
    request.projectDetails || "No optional details provided.",
    "",
    request.adminReviewUrl ? `Admin review: ${request.adminReviewUrl}` : "",
    request.publicReviewUrl ? `Customer review: ${request.publicReviewUrl}` : "",
    request.pageUrl ? `Submitted from: ${request.pageUrl}` : "",
  ].filter((line) => line !== "").join("\n");
  const htmlLinks = request.modelItems.length
    ? request.modelItems.map((item) => `
      <li style="margin:0 0 8px;">
        <strong>${item.quantity}x</strong>
        <a href="${escapeHtml(item.url)}" style="color:#ad4f20;text-decoration:none;font-weight:700;">${escapeHtml(item.url)}</a>
      </li>
    `).join("")
    : `<li style="color:#7b6255;">No model links recorded</li>`;
  const html = `
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Model link quote request</h1>
            <div style="margin-top:10px;font-size:16px;">${escapeHtml(request.requestId)}</div>
          </div>
          <div style="padding:24px 26px;">
            <h2 style="margin:0 0 8px;font-size:18px;color:#2c211b;">Customer</h2>
            <p style="margin:0 0 18px;color:#4d3a31;line-height:1.5;">${escapeHtml(customer || "No customer details recorded")}</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fffaf6;border:1px solid #f1e2d8;border-radius:10px;margin:0 0 22px;">
              <tr><td style="padding:14px 16px;color:#7b6255;">Quantity</td><td align="right" style="padding:14px 16px;color:#2c211b;font-weight:700;">${request.quantity}</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Created</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">${escapeHtml(request.createdAt)}</td></tr>
            </table>
            <h2 style="margin:0 0 8px;font-size:18px;color:#2c211b;">Model links</h2>
            <ul style="margin:0 0 22px;padding-left:20px;">${htmlLinks}</ul>
            <h2 style="margin:0 0 8px;font-size:18px;color:#2c211b;">Project details</h2>
            <p style="white-space:pre-wrap;margin:0 0 22px;color:#4d3a31;line-height:1.55;">${escapeHtml(request.projectDetails || "No optional details provided.")}</p>
            <div style="margin:0 0 22px;">
              ${request.adminReviewUrl ? `<a href="${escapeHtml(request.adminReviewUrl)}" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">Review link order</a>` : ""}
              ${request.publicReviewUrl ? `<a href="${escapeHtml(request.publicReviewUrl)}" style="display:inline-block;margin-left:10px;color:#ad4f20;text-decoration:none;font-weight:700;">Customer page</a>` : ""}
            </div>
            ${request.pageUrl ? `<p style="margin:0;color:#7b6255;font-size:13px;">Submitted from ${escapeHtml(request.pageUrl)}</p>` : ""}
          </div>
        </div>
      </div>
    </div>
  `;
  return { subject, text, html };
}

export function buildCustomerModelLinkQuoteEmail(request: ModelLinkQuoteRequestInput): AlertTemplateOutput {
  const subject = sanitizeEmailHeader(`Your 3D Local Print quote request ${request.requestId}`);
  const greeting = request.customerName ? `Hi ${request.customerName},` : "Hi,";
  const linkLines = request.modelItems.map((item) => `- ${item.quantity}x ${item.url}`).join("\n");
  const text = [
    greeting,
    "",
    "We received your model link quote request. We will review the model, printability, material, and timing, then reply with a quote before anything is printed.",
    "",
    `Quote request: ${request.requestId}`,
    `Quantity: ${request.quantity}`,
    "",
    "Model links:",
    linkLines,
    "",
    "Project details:",
    request.projectDetails || "No optional details provided.",
    "",
    request.publicReviewUrl ? `Review your request: ${request.publicReviewUrl}` : "",
    "",
    "Questions or changes? Reply to this email.",
  ].filter((line, index, lines) => line !== "" || lines[index - 1] !== "").join("\n");
  const htmlLinks = request.modelItems.map((item) => `
    <li style="margin:0 0 8px;">
      <strong>${item.quantity}x</strong>
      <a href="${escapeHtml(item.url)}" style="color:#ad4f20;text-decoration:none;font-weight:700;">${escapeHtml(item.url)}</a>
    </li>
  `).join("");
  const html = `
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Quote request received</h1>
            <div style="margin-top:10px;font-size:16px;">${escapeHtml(request.requestId)}</div>
          </div>
          <div style="padding:24px 26px;">
            <p style="margin:0 0 18px;color:#4d3a31;line-height:1.55;">${escapeHtml(greeting)}</p>
            <p style="margin:0 0 22px;color:#4d3a31;line-height:1.55;">We received your model link quote request. We will review printability, material, and timing, then reply with a quote before anything is printed.</p>
            ${request.publicReviewUrl ? `<div style="margin:0 0 22px;"><a href="${escapeHtml(request.publicReviewUrl)}" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">Review request details</a></div>` : ""}
            <h2 style="margin:0 0 8px;font-size:18px;color:#2c211b;">Model links</h2>
            <ul style="margin:0 0 22px;padding-left:20px;">${htmlLinks}</ul>
            <h2 style="margin:0 0 8px;font-size:18px;color:#2c211b;">Quote details</h2>
            <p style="white-space:pre-wrap;margin:0;color:#4d3a31;line-height:1.55;">Total quantity: ${request.quantity}\n\n${escapeHtml(request.projectDetails || "No optional details provided.")}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  return { subject, text, html };
}

export function buildAgreementSignRequestEmail(agreement: AgreementSignRequestInput): AlertTemplateOutput {
  const subject = sanitizeEmailHeader(`Service Agreement for ${agreement.clientBusiness || "your business"}`);
  const greetingName = agreement.clientRepresentative || agreement.clientBusiness || "";
  const greeting = greetingName ? `Hi ${greetingName},` : "Hi,";
  const amount = formatMoney(agreement.yearlyAmount, agreement.currency);
  const servicePeriod = [agreement.serviceStartDate, agreement.serviceEndDate].filter(Boolean).join(" through ");
  const text = [
    greeting,
    "",
    "Your 3D Local Print service agreement is ready for review, signature, and payment.",
    "",
    `Agreement: ${agreement.agreementId}`,
    `Business: ${agreement.clientBusiness || "Client"}`,
    `Provider: ${agreement.providerName || "3D Local Print"}`,
    servicePeriod ? `Service period: ${servicePeriod}` : "",
    `Yearly amount: ${amount}`,
    "",
    `Review and sign: ${agreement.publicAgreementUrl}`,
    "",
    "Questions or changes? Reply to this email before signing.",
  ].filter((line, index, lines) => line !== "" || lines[index - 1] !== "").join("\n");
  const html = `
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Service agreement ready</h1>
            <div style="margin-top:10px;font-size:16px;">${escapeHtml(agreement.clientBusiness || agreement.agreementId)}</div>
          </div>
          <div style="padding:24px 26px;">
            <p style="margin:0 0 18px;color:#4d3a31;line-height:1.55;">${escapeHtml(greeting)}</p>
            <p style="margin:0 0 22px;color:#4d3a31;line-height:1.55;">Your service agreement is ready for review, signature, and payment. Please open the private agreement link below when you are ready.</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fffaf6;border:1px solid #f1e2d8;border-radius:10px;margin:0 0 22px;">
              <tr><td style="padding:14px 16px;color:#7b6255;">Agreement</td><td align="right" style="padding:14px 16px;color:#2c211b;font-weight:700;">${escapeHtml(agreement.agreementId)}</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Business</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">${escapeHtml(agreement.clientBusiness || "Client")}</td></tr>
              ${servicePeriod ? `<tr><td style="padding:0 16px 14px;color:#7b6255;">Service period</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">${escapeHtml(servicePeriod)}</td></tr>` : ""}
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Yearly amount</td><td align="right" style="padding:0 16px 14px;color:#de6a2e;font-size:18px;font-weight:700;">${escapeHtml(amount)}</td></tr>
            </table>
            <div style="margin:0 0 22px;">
              <a href="${escapeHtml(agreement.publicAgreementUrl)}" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">Review and sign agreement</a>
            </div>
            <p style="margin:0;color:#7b6255;font-size:13px;line-height:1.5;">Questions or changes? Reply to this email before signing.</p>
          </div>
        </div>
      </div>
    </div>
  `;
  return { subject, text, html };
}

export function buildAgreementPaymentNotificationEmail(agreement: AgreementPaymentNotificationInput): AlertTemplateOutput {
  const isTest = agreement.stripeMode === "sandbox";
  const amount = formatMoney(agreement.amountTotal, agreement.currency);
  const subject = sanitizeEmailHeader(`${isTest ? "(test) " : ""}Agreement paid - ${agreement.clientBusiness || agreement.agreementId} - ${amount}`);
  const customer = [agreement.customerName, agreement.customerEmail].filter(Boolean).join(" · ") || "No customer details recorded";
  const text = [
    `Agreement paid: ${agreement.agreementId}`,
    `Business: ${agreement.clientBusiness || "Client"}`,
    `Signer: ${agreement.acceptedSignerName || "Not recorded"}`,
    `Customer: ${customer}`,
    `Paid: ${agreement.paidAt || "Not recorded"}`,
    `Amount: ${amount}`,
    `Order: ${agreement.orderId || "Not recorded"}`,
    agreement.stripeMode ? `Mode: ${agreement.stripeMode}` : "",
    "",
    agreement.adminAgreementUrl ? `View agreement: ${agreement.adminAgreementUrl}` : "",
    agreement.adminOrderUrl ? `View order: ${agreement.adminOrderUrl}` : "",
    agreement.publicAgreementUrl ? `Public agreement: ${agreement.publicAgreementUrl}` : "",
    agreement.stripeDashboardUrl ? `Stripe: ${agreement.stripeDashboardUrl}` : "",
  ].filter((line) => line !== "").join("\n");
  const html = `
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Agreement paid</h1>
            <div style="margin-top:10px;font-size:16px;">${escapeHtml(agreement.clientBusiness || agreement.agreementId)}</div>
          </div>
          <div style="padding:24px 26px;">
            <div style="display:inline-block;background:#fff0e5;color:#ad4f20;border:1px solid #f3c1a4;border-radius:999px;padding:6px 10px;font-size:13px;font-weight:700;text-transform:capitalize;">
              ${escapeHtml(amount)}${agreement.stripeMode ? ` · ${escapeHtml(agreement.stripeMode)}` : ""}
            </div>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fffaf6;border:1px solid #f1e2d8;border-radius:10px;margin:22px 0;">
              <tr><td style="padding:14px 16px;color:#7b6255;">Agreement</td><td align="right" style="padding:14px 16px;color:#2c211b;font-weight:700;">${escapeHtml(agreement.agreementId)}</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Business</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">${escapeHtml(agreement.clientBusiness || "Client")}</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Customer</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">${escapeHtml(customer)}</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Signer</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">${escapeHtml(agreement.acceptedSignerName || "Not recorded")}</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Paid</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">${escapeHtml(agreement.paidAt || "Not recorded")}</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Order</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">${escapeHtml(agreement.orderId || "Not recorded")}</td></tr>
            </table>
            <div style="margin-top:24px;">
              ${agreement.adminAgreementUrl ? `<a href="${escapeHtml(agreement.adminAgreementUrl)}" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">View agreement</a>` : ""}
              ${agreement.adminOrderUrl ? `<a href="${escapeHtml(agreement.adminOrderUrl)}" style="display:inline-block;margin-left:10px;color:#ad4f20;text-decoration:none;font-weight:700;">View order</a>` : ""}
              ${agreement.stripeDashboardUrl ? `<a href="${escapeHtml(agreement.stripeDashboardUrl)}" style="display:inline-block;margin-left:10px;color:#ad4f20;text-decoration:none;font-weight:700;">Open Stripe</a>` : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return { subject, text, html };
}

export const sampleOrderNotificationInput: OrderNotificationInput = {
  orderId: "order_test_sample_123",
  status: "paid",
  lineItems: [
    {
      productId: "dragon-keychain",
      variationId: "painted",
      quantity: 2,
      title: "Dragon Keychain (Painted)",
      unitAmount: 1200,
      currency: "usd",
    },
  ],
  currency: "usd",
  amountSubtotal: 2400,
  amountTax: 168,
  amountShipping: 0,
  amountTotal: 2568,
  customerEmail: "customer@example.com",
  customerName: "Sample Customer",
  stripeMode: "sandbox",
  adminOrderUrl: "https://3dlocalprint.com/admin/orders/index.html?orderId=order_test_sample_123",
  publicOrderUrl: "https://3dlocalprint.com/order.html?order_id=order_test_sample_123&email=customer%40example.com",
  stripeDashboardUrl: "https://dashboard.stripe.com/test/payments/pi_sample",
};

export const sampleModelLinkQuoteRequestInput: ModelLinkQuoteRequestInput = {
  requestId: "quote_sample_123",
  customerName: "Sample Customer",
  customerEmail: "customer@example.com",
  customerPhone: "555-0100",
  modelItems: [
    {
      url: "https://example.com/model.stl",
      quantity: 1,
    },
  ],
  modelLinks: ["https://example.com/model.stl"],
  projectDetails: "Please print this sample model in black PLA.",
  quantity: 1,
  pageUrl: "https://3dlocalprint.com/print-model-link.html",
  publicReviewUrl: "https://3dlocalprint.com/print-model-link-order.html?request_id=quote_sample_123&email=customer%40example.com",
  adminReviewUrl: "https://3dlocalprint.com/admin/link-orders/index.html?requestId=quote_sample_123",
  createdAt: "2026-06-26T12:00:00.000Z",
};

export const sampleAgreementSignRequestInput: AgreementSignRequestInput = {
  agreementId: "agreement_sample_123",
  clientBusiness: "Sample Agreement",
  clientRepresentative: "Sample Customer",
  customerEmail: "customer@example.com",
  providerName: "3D Local Print LLC",
  serviceStartDate: "2026-06-26",
  serviceEndDate: "2027-06-25",
  yearlyAmount: 24000,
  currency: "usd",
  publicAgreementUrl: "https://3dlocalprint.com/agreement.html?token=sample_private_token",
};

export const sampleAgreementPaymentNotificationInput: AgreementPaymentNotificationInput = {
  agreementId: "agreement_sample_123",
  clientBusiness: "Sample Agreement",
  customerEmail: "customer@example.com",
  customerName: "Sample Customer",
  acceptedSignerName: "Sample Customer",
  paidAt: "2026-06-26T12:30:00.000Z",
  amountTotal: 24000,
  currency: "usd",
  orderId: "order_test_sample_123",
  stripeMode: "sandbox",
  adminAgreementUrl: "https://3dlocalprint.com/admin/agreements/index.html?agreementId=agreement_sample_123",
  adminOrderUrl: "https://3dlocalprint.com/admin/orders/index.html?orderId=order_test_sample_123",
  publicAgreementUrl: "https://3dlocalprint.com/agreement.html?token=sample_private_token",
  stripeDashboardUrl: "https://dashboard.stripe.com/test/payments/pi_sample",
};

export const sampleOrganizationCheckoutRequestInput: OrganizationCheckoutRequestInput = {
  requestId: "orgreq_sample_123",
  organizationName: "Sample Elementary PTA",
  organizationType: "PTA",
  contactName: "Sample Treasurer",
  contactEmail: "treasurer@example.org",
  phone: "555-0100",
  exemptionCertificateNumber: "85-8012345678C-0",
  certificateExpirationDate: "2027-06-30",
  intendedUse: "Purchase printed classroom organizers and event supplies using PTA funds.",
  adminReviewUrl: "https://3dlocalprint.com/admin/organization-checkout/index.html?requestId=orgreq_sample_123",
  createdAt: "2026-07-23T12:00:00.000Z",
};

const sampleVariables = (sampleInput: Record<string, unknown>) => Object.keys(sampleInput).sort();

export function getAlertTemplateCatalog(): AlertTemplateCatalogItem[] {
  const orderInput = sampleOrderNotificationInput as unknown as Record<string, unknown>;
  const quoteInput = sampleModelLinkQuoteRequestInput as unknown as Record<string, unknown>;
  const agreementInput = sampleAgreementSignRequestInput as unknown as Record<string, unknown>;
  const agreementPaymentInput = sampleAgreementPaymentNotificationInput as unknown as Record<string, unknown>;
  const organizationInput = sampleOrganizationCheckoutRequestInput as unknown as Record<string, unknown>;
  return [
    {
      id: "internal-organization-checkout-request",
      name: "Internal Organizational Checkout Request",
      audience: "internal",
      trigger: "Sent to service when an organization submits a tax-exempt checkout request.",
      sourceFunction: "buildOrganizationCheckoutRequestEmail",
      sampleInput: organizationInput,
      variables: sampleVariables(organizationInput),
      rendered: buildOrganizationCheckoutRequestEmail(sampleOrganizationCheckoutRequestInput),
    },
    {
      id: "internal-order-notification",
      name: "Internal Order Notification",
      audience: "internal",
      trigger: "Sent to service when a checkout order is paid or manually resent from admin.",
      sourceFunction: "buildOrderNotificationEmail",
      sampleInput: orderInput,
      variables: sampleVariables(orderInput),
      rendered: buildOrderNotificationEmail(sampleOrderNotificationInput),
    },
    {
      id: "customer-order-receipt",
      name: "Customer Order Receipt",
      audience: "customer",
      trigger: "Sent to the customer when a checkout order is paid or manually resent from admin.",
      sourceFunction: "buildCustomerOrderEmail",
      sampleInput: orderInput,
      variables: sampleVariables(orderInput),
      rendered: buildCustomerOrderEmail(sampleOrderNotificationInput),
    },
    {
      id: "internal-model-link-quote-request",
      name: "Internal Model-Link Quote Request",
      audience: "internal",
      trigger: "Sent to service when a customer submits the Print By Link quote form.",
      sourceFunction: "buildModelLinkQuoteRequestEmail",
      sampleInput: quoteInput,
      variables: sampleVariables(quoteInput),
      rendered: buildModelLinkQuoteRequestEmail(sampleModelLinkQuoteRequestInput),
    },
    {
      id: "customer-model-link-quote-acknowledgement",
      name: "Customer Model-Link Quote Acknowledgement",
      audience: "customer",
      trigger: "Sent to the customer after they submit the Print By Link quote form.",
      sourceFunction: "buildCustomerModelLinkQuoteEmail",
      sampleInput: quoteInput,
      variables: sampleVariables(quoteInput),
      rendered: buildCustomerModelLinkQuoteEmail(sampleModelLinkQuoteRequestInput),
    },
    {
      id: "customer-agreement-sign-request",
      name: "Customer Agreement Sign Request",
      audience: "customer",
      trigger: "Manually sent from the agreement edit screen when an admin wants the customer to review, sign, and pay.",
      sourceFunction: "buildAgreementSignRequestEmail",
      sampleInput: agreementInput,
      variables: sampleVariables(agreementInput),
      rendered: buildAgreementSignRequestEmail(sampleAgreementSignRequestInput),
    },
    {
      id: "internal-agreement-payment-notification",
      name: "Internal Agreement Payment Notification",
      audience: "internal",
      trigger: "Sent to service when a linked service agreement payment is completed.",
      sourceFunction: "buildAgreementPaymentNotificationEmail",
      sampleInput: agreementPaymentInput,
      variables: sampleVariables(agreementPaymentInput),
      rendered: buildAgreementPaymentNotificationEmail(sampleAgreementPaymentNotificationInput),
    },
  ];
}

export { ORDER_NOTIFICATION_EMAIL };
