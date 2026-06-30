import { tag, div, button, noElement, p, label, input, span, a } from "taggedjs";
import { QuoteUiState, ContactField, activateStep, goNext, getQuoteUi, updateField } from "./print-model-link.js";
import { StepSection } from "./StepSection.js";
import { StepHeading } from "./StepHeading.js";

export const Step2 = tag(() => {
  let state = getQuoteUi()
  
  Step2.inputs(() => {
    state = getQuoteUi()
  })

  return noElement(() => {
    return StepSection(
      2,
      () => StepHeading(
        2,
        "Contact details",
        "We may need to ask about scale, material, color, deadline, or whether a paid model has already been purchased.",
      ),
      [
        ContactField(
          "customerName", "Name", "text", "name",
          state.customerName,
          state.errors.customerName
        ),
        ContactField(
          "customerEmail", "Email", "email", "email",
          state.customerEmail,
          state.errors.customerEmail
        ),
        ContactField(
          "customerPhone", "Phone or text number", "tel", "tel",
          state.customerPhone,
          state.errors.customerPhone
        ),
        p.class`legal-notice`(
          "Quote requests collect your contact details, model links, quantities, project notes, and this page URL so we can review the request, email a confirmation, and follow up with a quote. See our ",
          a.class`legal-inline-link`.href("./privacy.html")("Privacy Policy"),
          "."
        ),
        label.class`legal-checkbox-row`(
          input
            .type`checkbox`
            .checked(_=> Boolean(state.marketingOptIn))
            .onChange((event) => updateField("marketingOptIn", Boolean(event.target.checked)))(),
          span("Email me occasional 3D Local Print updates and offers. I can opt out later.")
        ),
        div.class`print-link-actions`(
          button.class`ghost-button`.type("button").onClick(_ => activateStep(1))
            ("Back"),
          button.class`add-button`.id("step2Next").type("button").onClick(_ => goNext(2, 3))
            ("Next")
        ),
      ],
    )
  })
})
