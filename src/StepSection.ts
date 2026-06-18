import { tag, section, div } from "taggedjs";
import { getQuoteUi } from "./print-model-link.js";
import { StepHeading } from "./StepHeading.js";

export const StepSection = tag((
  step: number,
  heading: () => ReturnType<typeof StepHeading>,
  bodyChildren: any[],
  persistentFooter: any = null
) => {
  let isActive = false;

  StepSection.inputs(x => {
    [step, heading, bodyChildren, persistentFooter] = x;
    const state = getQuoteUi()
    isActive = state.activeStep === step;
  });

  return section
    .class(_ => `home-card print-link-step-card${isActive ? " is-active" : " is-collapsed"}`)
    .attr("data-step", String(step))
    .attr("aria-expanded", _ => isActive ? "true" : "false")(
      heading,
      div
        .class`print-link-step-body`
        .attr("aria-hidden", _ => {
          return isActive ? "false" : "true";
        })(
          _ => bodyChildren
        ),
      persistentFooter
    ).key(`print-link-step-${step}`);
});
