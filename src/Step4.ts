import { tag, div, button, p } from "taggedjs";
import { QuoteUiState, buildPayload, validateStep, ReviewGroup, LinkReviewValue, getQuoteUi } from "./print-model-link.js";
import { StepSection } from "./StepSection.js";
import { StepHeading } from "./StepHeading.js";

export const Step4 = tag(() => {
  let state = getQuoteUi()
  let payload = buildPayload(state);
  let missing: string[] = [];

  Step4.updates(() => {
    state = getQuoteUi()
    payload = buildPayload(state)
    missing = []

    if (validateStep(1, state)) missing.push("Step 1: paste at least one valid model link.");
    if (validateStep(2, state)) missing.push("Step 2: add your name and email.");
    if (validateStep(3, state)) missing.push("Step 3: set quantity for each link.");
  })


  return () => StepSection(
    4,
    () => StepHeading(
      4,
      "Review and submit",
      "After you send this, you will receive an email with a request link. We will review the model and reply with a quote before printing."
    ),
    [
      div.class`print-link-review`.id("printModelLinkReview")(
        _=> missing.length ? ReviewGroup("Before submitting", missing) : null,
        _=> ReviewGroup(
          "Model links",
          payload.modelItems.length ? payload.modelItems.map(LinkReviewValue) : ["Waiting for Step 1"]
        ),
        
        _=> ReviewGroup("Contact", [
          payload.customerName || "Waiting for name",
          payload.customerEmail || "Waiting for email",
          payload.customerPhone || "No phone provided",
        ]),

        _=> ReviewGroup("Total quantity", String(payload.quantity || 1)),
        _=> ReviewGroup("Additional details", payload.projectDetails || "No optional notes added.")
      ),
      button
        .class`add-button print-link-submit`
        .type("submit")
        .disabled(_ => state.submitting)(
          "SEND FOR QUOTE"
        ),
      
      () => state.statusState === "success"
        ? null
        : p
          .class`print-link-status`
          .id("printModelLinkStatus")
          .attr("role", "status")
          .attr("aria-live", "polite")
          .attr("data-state", _=> state.statusState)(
            _=> state.statusText
          ),
    ],
  );
});
