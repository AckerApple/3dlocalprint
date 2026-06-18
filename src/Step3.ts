import { tag, div, label, textarea, button } from "taggedjs";
import { QuoteUiState, QuantityRows, ErrorText, updateField, activateStep, goNext, getQuoteUi } from "./print-model-link.js";
import { StepSection } from "./StepSection.js";
import { StepHeading } from "./StepHeading.js";

export const Step3 = tag(() => {
  let state = getQuoteUi()

  Step3.updates(() => {
    state = getQuoteUi()
  })

  return () => StepSection(
    3,
    () => StepHeading(
      3,
      "Quantity and quote details",
      "Set a quantity for each link. Notes about color, size, material, finish, deadline, pickup, or delivery are optional."
    ),
    [
      div.class(_=>`print-link-quantities${state.errors.modelItems ? " is-invalid" : ""}`)
        .id("modelItemQuantities")(
          _=> QuantityRows(state),
          _=> ErrorText(state.errors.modelItems)
        ),
      div.class`print-link-field`(
        label.attr("for", "projectDetails")("Additional details optional"),
        textarea
          .id("projectDetails")
          .name("projectDetails")
          .placeholder("Color, size, deadline, material preference, strength needs, finish, pickup/delivery notes...")
          .value(_ => state.projectDetails)
          .onInput((event) => updateField("projectDetails", String(event.target.value || "")))
      ),
      div.class`print-link-actions`(
        button.class`ghost-button`.type("button").onClick(_ => activateStep(2))
          ("Back"),
        button.class`add-button`.id("step3Next").type("button").onClick(_ => goNext(3, 4))
          ("Review")
      ),
    ],
  )
})