import { link, main } from "taggedjs";
import { htmlPage, script, versionBadge } from "./html.core.js";

const withPrefix = (prefix, path) => {
  if (!prefix) return path;
  if (prefix.endsWith("/")) return `${prefix}${path}`;
  return `${prefix}/${path}`;
};

export const filamentStandalonePage = ({
  pageTitle,
  appId,
  appScript,
  assetPrefix = "./",
}) =>
  htmlPage({
    pageTitle,
    bodyClass: "standalone-page",
    headItems: [link({ rel: "stylesheet", href: withPrefix(assetPrefix, "styles.css") })],
    bodyItems: [
      main({ id: appId }),
      script({ type: "module", src: withPrefix(assetPrefix, appScript) }),
      versionBadge(),
      script({ type: "module", src: withPrefix(assetPrefix, "version.ts") }),
    ],
  });
