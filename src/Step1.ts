import { tag, div, button } from "taggedjs";
import { QuoteUiState, LinkRow, ErrorText, addLink, goNext, getQuoteUi } from "./print-model-link.js";
import { StepSection } from "./StepSection.js";
import { StepHeading } from "./StepHeading.js";

const isAcceptedLink = (value: string) => {
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const Step1 = tag(() => {
  let state = getQuoteUi()

  Step1.updates(() => {
    state = getQuoteUi()
  })

  return () => StepSection(
    1,
    () => StepHeading(
      1,
      "🔗 Paste the link(s)",
      "Add one or more model pages. Public links work best because they usually include pictures, license notes, print settings, and downloadable files."
    ),
    [
      div.id("modelLinksList")
        .class(_=> `print-link-list${state.errors.modelLinks ? " is-invalid" : ""}`)(
          _=> state.links.map((item) => LinkRow(item, state.links.length > 1)),
          _=> ErrorText(state.errors.modelLinks)
        ),
      div.class`print-link-actions`(
        button.class`ghost-button`.id("addModelLinkButton").type("button")
          .onClick(_ => addLink())("Add another link"),
        button
          .class`add-button`
          .id("step1Next")
          .type("button")
          .disabled(_ => !state.links.some((item) => item.url.trim()))
          .onClick(_ => goNext(1, 2))(
            "Next"
          )
      ),
    ],
    () => {
      const acceptedCount = state.links.filter((item) => isAcceptedLink(item.url)).length;
      return div.class`print-link-step-persistent print-link-link-count`(
        `✅ ${acceptedCount} ${acceptedCount === 1 ? "link" : "links"} accepted`
      );
    },
  );
});
