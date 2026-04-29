import { link, main, script } from "taggedjs";
import { htmlPage, favicon, versionBadge } from "../../scripts/html.core.js";

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
  stylePath = "styles.css",
  versionScriptPath = "version.ts",
}) =>
  htmlPage({
    pageTitle,
    bodyClass: "standalone-page",
    headItems: [
      link.rel`icon`.href(favicon),
      link
        .rel`stylesheet`
        .href(withPrefix(assetPrefix, stylePath))
    ],
    bodyItems: [
      main.id(appId)(
        script
          .type`module`
          .src( withPrefix(assetPrefix, appScript) ),

        versionBadge(),

        script
          .type`module`
          .src( withPrefix(assetPrefix, versionScriptPath) ),
      )
    ],
  });
