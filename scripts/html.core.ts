import {
  html,
  head,
  body,
  title,
  meta,
  link,
  div,
} from "taggedjs";
import { readFileSync } from "fs";
import { resolve } from "path";

type HtmlPageOptions = {
  pageTitle: string;
  headItems?: any[];
  bodyItems?: any[];
  bodyClass?: string;
};

const faviconSvg = readFileSync(
  resolve(process.cwd(), "src/assets/logo/transparent.svg"),
  "utf-8"
).trim();

export const favicon = `data:image/svg+xml,${encodeURIComponent(faviconSvg)}`;

export const htmlPage = ({
  pageTitle,
  headItems = [],
  bodyItems = [],
  bodyClass = "",
}: HtmlPageOptions) => {
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
    .attr("data-app-version", "")
