import { fetchApiWithFallback } from "./api-url.js";

const form = document.getElementById("organizationCheckoutRequestForm") as HTMLFormElement | null;
const status = document.getElementById("organizationRequestStatus");
const submitButton = form?.querySelector<HTMLButtonElement>('button[type="submit"]') || null;
const processToggle = document.getElementById("organizationProcessToggle") as HTMLButtonElement | null;
const processDetails = document.getElementById("organizationProcessDetails");

processToggle?.addEventListener("click", () => {
  const expanded = processToggle.getAttribute("aria-expanded") === "true";
  processToggle.setAttribute("aria-expanded", String(!expanded));
  processToggle.textContent = expanded
    ? "How organizational checkout works"
    : "Hide organizational checkout process";
  if (processDetails) processDetails.hidden = expanded;
});

const readFileAsBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Unable to read the certificate."));
    reader.onload = () => resolve(String(reader.result || "").split(",")[1] || "");
    reader.readAsDataURL(file);
  });

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const certificate = data.get("certificate");
  if (!(certificate instanceof File) || !certificate.size) return;
  if (certificate.size > 5 * 1024 * 1024) {
    if (status) status.textContent = "The certificate must be no larger than 5 MB.";
    return;
  }

  if (submitButton) submitButton.disabled = true;
  if (status) status.textContent = "Submitting your request…";
  try {
    const response = await fetchApiWithFallback(
      "/api/organization-checkout/request",
      "submitOrganizationCheckoutRequest",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationName: data.get("organizationName"),
          organizationType: data.get("organizationType"),
          contactName: data.get("contactName"),
          contactEmail: data.get("contactEmail"),
          phone: data.get("phone"),
          exemptionCertificateNumber: data.get("exemptionCertificateNumber"),
          certificateExpirationDate: data.get("certificateExpirationDate"),
          addressLine1: data.get("addressLine1"),
          addressLine2: data.get("addressLine2"),
          city: data.get("city"),
          state: data.get("state"),
          postalCode: data.get("postalCode"),
          intendedUse: data.get("intendedUse"),
          certificationAccepted: data.get("certificationAccepted") === "on",
          certificateFileName: certificate.name,
          certificateMimeType: certificate.type,
          certificateBase64: await readFileAsBase64(certificate),
        }),
      },
    );
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Unable to submit the request.");
    form.reset();
    if (status) {
      status.textContent = `✅ Request ${payload.requestId} was submitted. We will contact you after reviewing the certificate.`;
    }
  } catch (error) {
    if (status) status.textContent = error instanceof Error ? error.message : "Unable to submit the request.";
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});
