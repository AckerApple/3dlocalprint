import {
  html,
  head,
  body,
  title,
  meta,
  link,
  div,
  htmlTag,
} from "taggedjs";

export const favicon =
  'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🖨️</text></svg>';

export const htmlPage = ({
  pageTitle,
  headItems = [],
  bodyItems = [],
  bodyClass = "",
}) => {
  return html.lang`en`(
    head(
      meta.charset`UTF-8`(),
      meta.name`viewport`.content`width=device-width, initial-scale=1.0`,
      title(pageTitle),
      headItems
    ),
    body.class( bodyClass )(...bodyItems)
  );
};

export const versionBadge = () =>
  div
    .class`version-badge`
    .attr('data-app-version', '')
