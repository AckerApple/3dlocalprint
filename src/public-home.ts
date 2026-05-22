import { tagElement } from "taggedjs";
import { homeHeader } from "./components/shared/home.js";
import { getSiteConfig, normalizeSiteKey } from "./sites/index.js";

const mountHomeHeader = (root: HTMLElement) => {
  const siteKey = normalizeSiteKey(root.dataset.siteKey) || "local";
  const assetPrefix = root.dataset.assetPrefix || "./";
  const lede = root.dataset.homeLede || "";
  const site = getSiteConfig(siteKey);

  tagElement(homeHeader as any, root, [{ site, lede, assetPrefix }]);
};

document
  .querySelectorAll<HTMLElement>("[data-home-header-root]")
  .forEach((root) => {
    try {
      mountHomeHeader(root);
    } catch (error) {
      console.warn("Failed to mount public home header", error);
    }
  });
