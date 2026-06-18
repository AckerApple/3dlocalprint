import { div, span, h2, p, tag, output } from "taggedjs";
import { validateStep, toggleStep, type QuoteUiState, getQuoteUi } from "./print-model-link.js";

export const StepHeading = tag((
  step: number,
  title: string,
  description: string,
) => {
  let isActive = false
  let isComplete = false
  
  StepHeading.inputs(x => {
    [step, title, description] = x
    
    const state = getQuoteUi()
    isActive = state.activeStep === step;
    isComplete = step >= 1 && step <= 3 && !validateStep(step, state);
  })

  return div
    .class`print-link-step-heading`
    .attr("role", "button")
    .attr("tabindex", "0")
    .attr("aria-expanded", _=> isActive ? "true" : "false")
    .onClick(_ => {
      toggleStep(step)
    })
    .onKeyDown((event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleStep(step);
      }
    })(
      div.class`print-link-step-kicker`(
        span.class`home-card-tag`(
          _=> isComplete ? `✅ Step ${step}` : `Step ${step}`
        ),
        span.class`print-link-step-toggle-label`(
          _=> isActive ? "Collapse" : "Open"
        )
      ),
      h2(title),
      p(description)
    );
})
