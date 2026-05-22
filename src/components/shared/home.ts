import { a, div, footer, header, img, nav, p, tag } from "taggedjs";
import type { SiteConfig } from "../../sites/index.js";

type HomeHeaderOptions = {
  site: SiteConfig;
  lede?: string;
  assetPrefix?: string;
};

export const withPrefix = (prefix: string, path: string) => {
  if (!prefix) return path;
  if (path.startsWith("#") || path.startsWith("mailto:") || path.startsWith("http")) {
    return path;
  }
  if (prefix.endsWith("/")) return `${prefix}${path}`;
  return `${prefix}/${path}`;
};

export const homeNav = tag((
  site: SiteConfig,
  assetPrefix = "./",
) =>
  nav.class`home-menu`(
    site.nav.map((item) => {
      const link = a
        .class`home-menu-link`
        .href(withPrefix(assetPrefix, item.href));

      if (item.href === "cart.html") {
        link.attr("data-cart-link", "true");
      }

      return link(item.label);
    }),
  ),
);

export const homeHeader = tag(({
  site,
  lede,
  assetPrefix = "./",
}: HomeHeaderOptions) =>
  header
    .class`page-header home-hero`
    .attr("data-site-key", site.key)
    .attr("data-asset-prefix", assetPrefix)
    .attr("data-home-lede", lede || "")(
      div.class`home-header-row`(
        img
          .class(`home-logo site-logo site-logo-${site.key}`)
          .src(withPrefix(assetPrefix, site.logoPath))
          .alt(site.logoAlt),
        
        div(
          div.class`home-nav-root`(
            _=> homeNav(
              site,
              assetPrefix,
            ),
          ),
          lede ? p.class`home-lede`(lede) : null
        )
      ),
    )
);

export const homeHeaderMount = (options: HomeHeaderOptions) =>
  div
    .attr("data-home-header-root", "true")
    .attr("data-site-key", options.site.key)
    .attr("data-asset-prefix", options.assetPrefix || "./")
    .attr("data-home-lede", options.lede || "")(
      homeHeader(options) as any
    );

export const homeFooter = (site: SiteConfig, assetPrefix = "./") =>
  footer.class`home-footer`(
    div.class`home-footer-inner`(
      div.class`home-footer-title`(site.key === "pet" ? site.name : `${site.legalName}.`),
      div.class`home-footer-tagline`(site.footerNote),
      a.class`home-footer-email`.href(`mailto:${site.contactEmail}`)(site.contactEmail),
      site.key === "local"
        ? a.class`home-footer-admin`.href(withPrefix(assetPrefix, "admin/index.html"))("Admin")
        : null,
      div.class`home-footer-version`.attr("data-app-version", "")
    )
  );
