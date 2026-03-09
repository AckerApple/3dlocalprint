import { link, main, script } from "taggedjs";
import { htmlPage, versionBadge } from "./html.core.js";

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
}) =>
  htmlPage({
    pageTitle,
    bodyClass: "standalone-page",
    headItems: [
      link
        .rel`stylesheet`
        .href(withPrefix(assetPrefix, "styles.css"))(),
    ],
    bodyItems: [
      main
        .id(appId)
        .attr("data-location", location)
        .attr("data-location-slug", locationSlug)(),
      script
        .type`module`
        .src(withPrefix(assetPrefix, "filament-fast-edit.tag.ts"))(),
      versionBadge(),
      script
        .type`module`
        .src(withPrefix(assetPrefix, "version.ts"))(),
    ],
  });
