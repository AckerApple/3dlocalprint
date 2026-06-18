import { tag, nav, a } from "taggedjs";
import type { SiteConfig } from "../../sites/index.js";
import { withPrefix } from "./home.js";

export const homeNav = tag(function homeNavFn(
  site: SiteConfig,
  assetPrefix = "./"
) {
  return nav.class`home-menu`(
    site.nav.map((item) => {
      const link = a
        .class`home-menu-link`
        .href(withPrefix(assetPrefix, item.href));

      if (item.href === "cart.html") {
        link.attr("data-cart-link", "true");
      }

      return link(item.label);
    })
  );
});
