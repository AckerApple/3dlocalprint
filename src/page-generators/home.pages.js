import {
  link,
  header,
  img,
  h1,
  p,
  nav,
  a,
  main,
  section,
  div,
  figure,
  figcaption,
  h2,
  footer,
  script,
} from "taggedjs";
import { htmlPage, favicon } from "../../scripts/html.core.js";

const withPrefix = (prefix, path) => {
  if (!prefix) return path;
  if (prefix.endsWith("/")) return `${prefix}${path}`;
  return `${prefix}/${path}`;
};

const homeNav = (assetPrefix = "./") =>
  nav.class`home-menu`(
    a.class`home-menu-link`.href(withPrefix(assetPrefix, "index.html"))("🏠 Home"),
    a.class`home-menu-link`.href(withPrefix(assetPrefix, "products.html"))("🧩 Products"),
    a
      .class`home-menu-link`
      .href(withPrefix(assetPrefix, "cart.html"))
      .attr("data-cart-link", "true")("🛒 Cart")
  );

const homeHeader = ({
  lede,
  assetPrefix = "./",
}) =>
  header.class`page-header home-hero`(
    img
      .class("home-logo")
      .src(withPrefix(assetPrefix, "assets/logo-one-transparent.svg"))
      .alt("3D Local Print logo"),
    homeNav(assetPrefix),
    lede ? p.class`home-lede`(lede) : null
  );

const homeFooter = (assetPrefix = "./") =>
  footer.class`home-footer`(
    div.class`home-footer-inner`(
      div.class`home-footer-title`("3D Local Print LLC."),
      div.class`home-footer-tagline`("Learn. Paint. Assemble. Bring it home."),
      a.class`home-footer-email`.href("mailto:service@3dlocalprint.com")("service@3dlocalprint.com"),
      a
        .class`home-footer-admin`
        .href(withPrefix(assetPrefix, "admin/index.html"))(
        "Admin"
      ),
      div.class`home-footer-version`.attr("data-app-version", "")
    )
  );

const homeShell = ({
  pageTitle,
  heroLede,
  mainSections = [],
  bodyScripts = [],
  mainClass = "home-main",
  assetPrefix = "./",
}) => {
  const scriptItems = bodyScripts.map((scriptPath) =>
    script.type`module`.src(withPrefix(assetPrefix, scriptPath))
  );

  return htmlPage({
    pageTitle,
    headItems: [
      link.rel`icon`.href(favicon),
      link.rel`stylesheet`.href(withPrefix(assetPrefix, "admin/shared/styles.css")),
    ],
    bodyItems: [
      homeHeader({
        lede: heroLede,
        assetPrefix,
      }),
      main.class(mainClass)(...mainSections),
      homeFooter(assetPrefix),
    ].concat(
      scriptItems,
      script.type`module`.src(withPrefix(assetPrefix, "nav-cart.ts")),
      script.type`module`.src(withPrefix(assetPrefix, "admin/shared/version.ts"))
    ),
  });
};

export const homeLandingPage = ({ assetPrefix = "./" } = {}) =>
  homeShell({
    pageTitle: "3D Local Print",
    heroLede:
      "A hands-on 3D local print store where you can learn, paint, assemble, and take home custom 3D printed merchandise.",
    assetPrefix,
    mainSections: [
      section.class`cart-page-title`(
        h1("3D Local Print")
      ),
      section.class`home-info panel`(
        div(
          h2.class`output-title`("Coming soon"),
          p(
            "The storefront is opening soon. For today, we are celebrating with a craft paint party. Drop by or reach out to reserve a spot."
          )
        ),
        div.class`home-email-wrap`(
          a.class`home-email`.href("mailto:service@3dlocalprint.com")("service@3dlocalprint.com")
        )
      ),
      section.class`home-gallery`(
        figure.class`home-figure`(
          img
            .src(withPrefix(assetPrefix, "assets/printer bench.png"))
            .alt("Close-up of a 3D printer in motion")
            .loading("lazy"),
          figcaption("Learn, paint, assemble, and celebrate local makers together.")
        ),
        figure.class`home-figure`(
          img
            .src(withPrefix(assetPrefix, "assets/painting cat.png"))
            .alt("A 3D printed cat being painted")
            .loading("lazy"),
          figcaption("Paint table favorites, ready for your colors.")
        ),
        figure.class`home-figure`(
          img
            .src(withPrefix(assetPrefix, "assets/handshake print.png"))
            .alt("A handshake 3D print ready for finishing")
            .loading("lazy"),
          figcaption("Community-made pieces, finished by hand.")
        )
      ),
      section.class`home-grid`(
        div.class`home-card`(
          h2("Learn the craft"),
          p("See how ideas become models, how prints are tuned, and how finishes are made."),
          div.class`home-card-tag`("Workshops + demos")
        ),
        div.class`home-card`(
          h2("Paint night today"),
          p("Grab a printed piece, choose your colors, and make it yours with a guided paint setup."),
          div.class`home-card-tag`("Brushes + palettes")
        ),
        div.class`home-card`(
          h2("Assemble together"),
          p("Fit parts, snap joints, and finish builds with friendly help on site."),
          div.class`home-card-tag`("Hands-on assembly")
        ),
        div.class`home-card`(
          h2("Shop the merch"),
          p("Take home displays, gadgets, and custom pieces designed to show off local talent."),
          div.class`home-card-tag`("Local creators")
        )
      ),
    ],
  });

export const homeProductsPage = ({ assetPrefix = "./" } = {}) =>
  homeShell({
    pageTitle: "Products - 3D Local Print",
    heroLede: "",
    bodyScripts: ["products.ts"],
    mainClass: "home-main home-main-cart",
    assetPrefix,
    mainSections: [
      section.class`cart-page-title`(
        h1("Products")
      ),
      section.class`home-products-filter`.id("homeProductsFilter"),
      section.class`home-grid home-products-grid`.id("homeProductsGrid")(
        div.class`home-products-loading`(
          div.class`home-products-spinner`().attr("aria-hidden", "true"),
          p.class`home-products-loading-text`("Loading products...")
        )
      )
    ],
  });

export const homeProductDetailPage = ({ assetPrefix = "./" } = {}) =>
  homeShell({
    pageTitle: "Products - 3D Local Print",
    heroLede: "",
    bodyScripts: ["product.ts"],
    mainClass: "home-main home-main-cart",
    assetPrefix,
    mainSections: [
      section.class`cart-page-title`(
        h1.id("homeProductPageTitle")("Products")
      ),
      section.class`home-grid`.id("homeProductDetail")(
        div.class`home-products-loading`(
          div.class`home-products-spinner`().attr("aria-hidden", "true"),
          p.class`home-products-loading-text`("Loading product...")
        )
      ),
    ],
  });

export const homeCartPage = ({ assetPrefix = "./" } = {}) =>
  homeShell({
    pageTitle: "Cart - 3D Local Print",
    heroLede: "",
    bodyScripts: ["cart.ts"],
    mainClass: "home-main home-main-cart",
    assetPrefix,
    mainSections: [
      section.class`cart-construction-banner`(
        p("This website is under construction. Checkout is not possible at this time.")
      ),
      section.class`cart-page-title`(
        h1("Your Cart")
      ),
      section.class`home-grid`.id("homeCartRoot")(
        div.class`home-products-loading`(
          div.class`home-products-spinner`().attr("aria-hidden", "true"),
          p.class`home-products-loading-text`("Loading cart...")
        )
      ),
    ],
  });

export const homeQr1Page = ({ assetPrefix = "../" } = {}) =>
  homeShell({
    pageTitle: "Jesus Angel Keychain - 3D Local Print",
    heroLede: "",
    mainClass: "home-main home-main-cart",
    assetPrefix,
    mainSections: [
      section.class`cart-page-title`(
        h1("Jesus Angel Keychain")
      ),
      section.class`home-grid`(
        div.class`home-card`(
          img
            .class("qr1-product-image")
            .src("https://firebasestorage.googleapis.com/v0/b/threedlocalprint.firebasestorage.app/o/products%2F484b16aa-cbab-4f8b-a074-b07fe0058c70%2F1777389811396_awwj560.jpg?alt=media")
            .alt("Jesus Angel Keychain")
            .loading("lazy"),
          
          p(`🚧 We are currently working towards opening a full blown business.`),
          p(`Your support goes a long! Check back often please and thank you.`),
          p(
            "If you would like to purchase Jesus keychains, especially because they are just so cute, please email us at ",
            a
              .href("mailto:service@3dlocalprint.com?subject=Purchase Jesus Keychains")
              .style("text-decoration: none;")(
              "📧 service@3dlocalprint.com"
            )
          ),
        )
      ),
    ],
  });

export const homeNotFoundPage = ({ assetPrefix = "./" } = {}) =>
  homeShell({
    pageTitle: "Page Not Found - 3D Local Print",
    heroLede: "",
    assetPrefix,
    mainSections: [
      section.class`cart-page-title`(
        h1("Page not found")
      ),
      section.class`home-grid`(
        div.class`home-card home-card-muted`(
          h2("This page is unavailable."),
          p("If you followed a product link, we will try to route you automatically."),
          a.class`ghost-button`.href(withPrefix(assetPrefix, "products.html"))("Browse Products")
        )
      ),
    ],
    bodyScripts: ["not-found-route.ts"],
  });
