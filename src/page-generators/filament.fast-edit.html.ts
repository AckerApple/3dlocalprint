import { link, main, script } from "taggedjs";
import { htmlPage, favicon, versionBadge } from "../../scripts/html.core.js";

const withPrefix = (prefix, path) => {
  if (!prefix) return path;
  if (prefix.endsWith("/")) return `${prefix}${path}`;
  return `${prefix}/${path}`;
};

export const filamentFastEditPage = ({
  pageTitle,
  appId,
  location,
  locationSlug,
  assetPrefix = "../",
  stylePath = "styles.css",
  appScriptPath = "filament-fast-edit.tag.ts",
  versionScriptPath = "version.ts",
}) =>
  htmlPage({
    pageTitle,
    bodyClass: "standalone-page",
    headItems: [
      link.rel`icon`.href(favicon),
      link
        .rel`stylesheet`
        .href(withPrefix(assetPrefix, stylePath))(),
    ],
    bodyItems: [
      main
        .id(appId)
        .attr("data-location", location)
        .attr("data-location-slug", locationSlug)(),
      script
        .type`module`
        .src(withPrefix(assetPrefix, appScriptPath))(),
      versionBadge(),
      script
        .type`module`
        .src(withPrefix(assetPrefix, versionScriptPath))(),
    ],
  });
