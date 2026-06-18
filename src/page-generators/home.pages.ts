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
  h3,
  footer,
  script,
  meta,
  form,
  label,
  input,
  textarea,
  button,
  style,
  span,
  strong,
} from "taggedjs";
import { htmlPage, favicon } from "../../scripts/html.core.js";
import { homeFooter, homeHeaderMount, withPrefix } from "../components/shared/home.js";
import { getSiteConfig, type SiteKey } from "../sites/index.js";
import { themeToCssVariables } from "../theme/tokens.js";

const homeShell = ({
  pageTitle,
  description = "",
  heroLede,
  mainSections = [],
  bodyScripts = [],
  mainClass = "home-main",
  assetPrefix = "./",
  siteKey = "local" as SiteKey,
  extraHeadItems = [],
}) => {
  const site = getSiteConfig(siteKey);
  const scriptItems = bodyScripts.map((scriptPath) =>
    script.type`module`.src(withPrefix(assetPrefix, scriptPath))
  );

  return htmlPage({
    pageTitle,
    headItems: [
      description ? meta.name`description`.content(description) : null,
      link.rel`icon`.href(
        site.key === "pet"
          ? withPrefix(assetPrefix, site.logoPath)
          : favicon
      ),
      link.rel`stylesheet`.href(withPrefix(assetPrefix, "admin/shared/styles.css")),
      style(`:root { ${themeToCssVariables(site.theme)} }`),
      extraHeadItems,
    ],
    bodyClass: `site-${site.key} theme-${site.themeName}`,
    bodyItems: [
      homeHeaderMount({
        site,
        lede: heroLede,
        assetPrefix,
      }),
      main.class(mainClass)(...mainSections),
      homeFooter(site, assetPrefix),
    ].concat(
      scriptItems,
      script.type`module`.src(withPrefix(assetPrefix, "public-home.ts")),
      script.type`module`.src(withPrefix(assetPrefix, "nav-cart.ts")),
      script.type`module`.src(withPrefix(assetPrefix, "admin/shared/version.ts"))
    ),
  });
};

export const homeLandingPage = ({ assetPrefix = "./", siteKey = "local" as SiteKey } = {}) =>
  homeShell({
    pageTitle: getSiteConfig(siteKey).title,
    description: getSiteConfig(siteKey).description,
    heroLede:
      "Custom local 3D prints, kits, and keepsakes.",
    assetPrefix,
    siteKey,
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

const Field = (fieldLabel: string, control: any) =>
  label.class`pet-upload-field`(
    span(fieldLabel),
    control
  );

const StepTitle = (icon: string, title: string) =>
  h2.class`pet-step-title`(
    span.class`pet-step-emoji`.attr("aria-hidden", "true")(icon),
    span(title)
  );

export const petLandingPage = ({ assetPrefix = "./" } = {}) => {
  const site = getSiteConfig("pet");
  return homeShell({
    pageTitle: site.title,
    description: site.description,
    heroLede:
      "Choose how you want to begin turning favorite pet photos into a custom 3D printed keepsake.",
    assetPrefix,
    siteKey: "pet",
    mainClass: "home-main pet-choice-main",
    mainSections: [
      section.class`cart-page-title pet-hero-title`(
        h1("Turn Your Pet Photos Into Custom 3D Prints"),
        p("Start with a quick overview or jump straight into the setup flow.")
      ),
      section.class`pet-choice-grid`.attr("aria-label", "3D Pet Print options")(
        a.class`pet-choice-button pet-choice-button-info`.href(withPrefix(assetPrefix, "how-it-works.html"))(
          span.class`pet-choice-kicker`("Learn the process"),
          span.class`pet-choice-title`("How it Works"),
          span.class`pet-choice-copy`("See how photos become a reviewed, approved, and printed custom pet keepsake."),
          span.class`pet-choice-arrow`.attr("aria-hidden", "true")("Explore ->")
        ),
        a.class`pet-choice-button pet-choice-button-start`.href(withPrefix(assetPrefix, "get-started.html"))(
          span.class`pet-choice-kicker`("Begin your request"),
          span.class`pet-choice-title`("Get Started"),
          span.class`pet-choice-copy`("Sign in, prepare your photos, and follow the project steps as they open."),
          span.class`pet-choice-arrow`.attr("aria-hidden", "true")("Start ->")
        )
      ),
    ],
  });
};

export const petHowItWorksPage = ({ assetPrefix = "./" } = {}) => {
  const site = getSiteConfig("pet");
  return homeShell({
    pageTitle: `How It Works | ${site.name}`,
    description: site.description,
    heroLede:
      "A simple path for turning favorite pet photos into a custom 3D printed keepsake.",
    assetPrefix,
    siteKey: "pet",
    mainSections: [
      section.class`cart-page-title pet-hero-title`(
        h1("How 3D Pet Print Works"),
        div.class`pet-hero-actions`(
          a.class`add-button`.href(withPrefix(assetPrefix, "get-started.html"))("Get Started"),
          a.class`ghost-button`.href(withPrefix(assetPrefix, "index.html"))("Back Home")
        )
      ),
      section.class`pet-start-steps pet-how-steps`.id("how-it-works")(
        div.class`home-card pet-start-step pet-how-step`(
          div.class`pet-step-heading`(
            div.class`home-card-tag`("Section 1"),
            StepTitle("🔐", "Sign in first"),
            div.class`pet-step-status`("Account")
          ),
          div.class`pet-step-body`(
            p("Sign in so your pet print request, uploaded photos, proof previews, messages, and print status can stay connected to you."),
            p("This also helps us keep each request organized as it moves from photo review to modeling, approval, printing, and pickup or delivery planning."),
            p("3D Pet Print is operated by 3D Local Print LLC as a specialized pet-focused experience.")
          )
        ),
        div.class`home-card pet-start-step pet-how-step`(
          div.class`pet-step-heading`(
            div.class`home-card-tag`("Section 2"),
            StepTitle("📂", "Upload pet photos"),
            div.class`pet-step-status`("Photos")
          ),
          div.class`pet-step-body`(
            p("Upload clear, well-lit photos of your dog, cat, or other pet. Front and side angles are especially helpful when you have them."),
            p("Include markings, ears, tail, favorite poses, and any notes about the type of keepsake you want."),
            p("Multiple photos help us understand personality and practical modeling details before we begin.")
          )
        ),
        div.class`home-card pet-start-step pet-how-step`(
          div.class`pet-step-heading`(
            div.class`home-card-tag`("Section 3"),
            StepTitle("✅", "Review your proof"),
            div.class`pet-step-status`("Approval")
          ),
          div.class`pet-step-body`(
            p("After reviewing your photos, we prepare preview details for the custom pet print before production."),
            p("You will receive proof information to approve, with room for practical adjustments before we commit the design to printing."),
            p("The goal is to make sure the print direction matches the pet, pose, and keepsake style you expected.")
          )
        ),
        div.class`home-card pet-start-step pet-how-step`(
          div.class`pet-step-heading`(
            div.class`home-card-tag`("Section 4"),
            StepTitle("🖨️", "Printing your pet"),
            div.class`pet-step-status`("Print")
          ),
          div.class`pet-step-body`(
            p("Once approved, your pet keepsake is 3D printed, checked, and prepared for finishing, pickup, or delivery planning."),
            p("Possible keepsakes include custom pet figurines, memorial pieces, ornaments, desk buddies, and gifts for pet lovers."),
            p("You can track the request through the process as upload, proof, and status tools are added.")
          )
        )
      ),
      section.class`home-info panel pet-final-cta`(
        div(
          h2.class`output-title`("Ready to make your pet printable?"),
          p("Start with your favorite photos and a few notes about the keepsake you want to create.")
        ),
        div.class`home-email-wrap`(
          a.class`add-button`.href(withPrefix(assetPrefix, "get-started.html"))("Get Started")
        )
      ),
    ],
  });
};

export const petGetStartedPage = ({ assetPrefix = "./" } = {}) => {
  const site = getSiteConfig("pet");
  return homeShell({
    pageTitle: `Get Started | ${site.name}`,
    description: site.description,
    heroLede:
      "Custom pet keepsakes from your favorite photos.",
    assetPrefix,
    siteKey: "pet",
    bodyScripts: ["pet-get-started.ts"],
    mainClass: "home-main pet-start-main",
    mainSections: [
      section.class`cart-page-title pet-hero-title`(
        h1("Get Started"),
        div.class`pet-hero-actions`(
          a.class`ghost-button`.href(withPrefix(assetPrefix, "how-it-works.html"))("How it Works"),
          a.class`ghost-button`.href(withPrefix(assetPrefix, "index.html"))("Back Home")
        )
      ),
      section.class`pet-start-steps`(
        div.class`home-card pet-start-step pet-start-step-active`
          .attr("data-pet-step", "auth")(
          div.class`pet-step-heading`(
            div.class`home-card-tag`("Section 1"),
            StepTitle("🔐", "Sign in"),
            div.class`pet-step-status`.attr("data-pet-auth-status", "true")("Sign in required")
          ),
          div.class`pet-step-body`.attr("data-pet-step-body", "auth")(
            p.attr("data-pet-auth-message", "true")("Create or access your 3D Pet Print request with major SSO providers."),
            div.class`pet-sso-grid`(
              button.class`ghost-button`.type("button").attr("data-pet-google-signin", "true")("Continue with Google"),
              button.class`ghost-button`.type("button").disabled("true")("Continue with Apple"),
              button.class`ghost-button`.type("button").disabled("true")("Continue with Microsoft"),
              button.class`ghost-button`.type("button").disabled("true")("Continue with Facebook")
            ),
            p.class`pet-upload-note`("Google sign-in is active. Additional SSO providers are placeholders for now.")
          ),
          div.class`pet-step-body pet-auth-summary`
            .attr("data-pet-auth-summary", "true")
            .attr("hidden", "true")(
            div.class`pet-auth-user`(
              span
                .class`pet-auth-avatar`
                .attr("data-pet-auth-avatar", "true")
                .attr("aria-hidden", "true")(
                img
                  .class`pet-auth-avatar-image`
                  .attr("data-pet-auth-avatar-image", "true")
                  .attr("hidden", "true")
                  .attr("referrerpolicy", "no-referrer")
                  .alt(""),
                span
                  .class`pet-auth-avatar-fallback`
                  .attr("data-pet-auth-avatar-fallback", "true")
              ),
              span.class`pet-auth-user-copy`(
                span.class`pet-auth-user-label`("Signed in as"),
                span.class`pet-auth-user-email`.attr("data-pet-auth-email", "true")("Signed in")
              )
            )
          )
        ),
        div.class`home-card pet-start-step pet-start-step-locked`.attr("data-pet-step", "upload")(
          div.class`pet-step-heading`(
            div.class`home-card-tag`("Section 2"),
            StepTitle("📂", "Upload pet files"),
            div.class`pet-step-status`("Next")
          ),
          p.class`pet-step-lock-note`.attr("data-pet-lock-note", "upload").attr("hidden", "true")("Complete sign in before uploading pet files."),
          div.class`pet-step-body`.attr("data-pet-step-body", "upload").attr("hidden", "true")(
            p("This section will collect pet photos, reference angles, and any supporting files."),
            form.class`pet-upload-form`.attr("aria-label", "Pet print file upload placeholder")(
              Field("Photos", input.type("file").name("photos").attr("multiple", "true").attr("accept", "image/*")),
              Field("Notes", textarea.name("notes").placeholder("Tell us about your pet, pose, markings, and desired keepsake.")),
              // TODO: Connect upload storage and request creation.
              button.class`add-button`.type("button")("Upload Placeholder")
            )
          )
        ),
        div.class`home-card pet-start-step pet-start-step-muted pet-start-step-locked`.attr("data-pet-step", "review")(
          div.class`pet-step-heading`(
            div.class`home-card-tag`("Section 3"),
            StepTitle("✅", "Review and approve"),
            div.class`pet-step-status`("Locked")
          ),
          p.class`pet-step-lock-note`.attr("data-pet-lock-note", "review").attr("hidden", "true")("Finish the upload step before reviewing your pet print request."),
          div.class`pet-step-body`.attr("data-pet-step-body", "review").attr("hidden", "true")(
            p("As progress continues, this section will show previews, modeling notes, and approval actions.")
          )
        ),
        div.class`home-card pet-start-step pet-start-step-muted pet-start-step-locked`.attr("data-pet-step", "status")(
          div.class`pet-step-heading`(
            div.class`home-card-tag`("Section 4"),
            StepTitle("🖨️", "Print status"),
            div.class`pet-step-status`("Locked")
          ),
          p.class`pet-step-lock-note`.attr("data-pet-lock-note", "status").attr("hidden", "true")("Complete the earlier steps before tracking print status."),
          div.class`pet-step-body`.attr("data-pet-step-body", "status").attr("hidden", "true")(
            p("As progress continues, this section will track print preparation, finishing, pickup, or delivery details.")
          )
        )
      ),
    ],
  });
};

export const homeAboutPage = ({ assetPrefix = "./" } = {}) =>
  homeShell({
    pageTitle: "About Us - 3D Local Print",
    heroLede:
      "A high-tech family business in Coconut Creek, Florida, building a local 3D printing shop one order, print, and customer conversation at a time.",
    assetPrefix,
    mainSections: [
      section.class`cart-page-title`(
        h1("About Us")
      ),
      section.class`home-about-intro panel`(
        div.class`home-about-copy`(
          h2.class`output-title`("Built in Coconut Creek"),
          p(
            "3D Local Print is a family-run business in Coconut Creek, Florida, started on January 1, 2026, and focused on practical, creative, and personalized 3D printed products."
          ),
          p(
            "We are actively building the business while planning the shop, executing the setup, selling products, and taking customer orders now."
          ),
          a.class`ghost-button`.href(withPrefix(assetPrefix, "products.html"))("Browse products")
        ),
        img
          .class("home-about-image")
          .src(withPrefix(assetPrefix, "assets/about-workshop.jpg"))
          .alt("A bright family-run 3D printing workshop in Coconut Creek")
          .loading("lazy")
      ),
      section.class`home-about-status`(
        div.class`home-card home-about-status-card`(
          h3("Planning"),
          p("We are shaping the storefront, workflows, product catalog, and customer experience around real local demand."),
          div.class`home-card-tag`("Building up")
        ),
        div.class`home-card home-about-status-card`(
          h3("Executing"),
          p("Printers, materials, designs, finishing, and order handling are already moving from setup into daily operations."),
          div.class`home-card-tag`("In motion")
        ),
        div.class`home-card home-about-status-card`(
          h3("Selling"),
          p("Customers can already buy from available products and place orders while the larger business rollout continues."),
          div.class`home-card-tag`("Taking orders")
        )
      ),
      section.class`home-about-split`(
        figure.class`home-figure`(
          img
            .src(withPrefix(assetPrefix, "assets/about-orders.jpg"))
            .alt("Finished 3D printed products being prepared for customer orders")
            .loading("lazy"),
          figcaption("Planning, making, packing, and taking real customer orders.")
        ),
        div.class`home-about-family home-card`(
          h2("High-tech, family-run"),
          p(
            "Our work combines modern 3D printing tools with the care of a local family business. We are learning from every print, every pickup, and every custom request."
          ),
          p(
            "The goal is simple: make useful, fun, and memorable 3D printed products accessible to neighbors, makers, collectors, and families nearby."
          )
        )
      ),
    ],
  });

export const homeProductsPage = ({ assetPrefix = "./" } = {}) =>
  homeShell({
    pageTitle: "Products - 3D Local Print",
    heroLede: "",
    bodyScripts: ["products/index.ts"],
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

export const homePrintModelLinkPage = ({ assetPrefix = "./" } = {}) =>
  homeShell({
    pageTitle: "PRINT by LINK - 3D Local Print",
    description:
      "Send 3D Local Print a model link for a custom local printing quote.",
    extraHeadItems: [
      meta.attr("property", "og:type").content("website"),
      meta.attr("property", "og:title").content("PRINT by LINK"),
      meta.attr("property", "og:description").content("Found a model online? We'll print it. Share a link, get a quote, approve and print."),
      meta.attr("property", "og:url").content("https://3dlocalprint.com/print-model-link.html"),
      meta.attr("property", "og:image").content("https://3dlocalprint.com/assets/print-by-link-banner-desktop-p1J3u-wC.png"),
      meta.attr("property", "og:image:alt").content("Found a model online? We'll print it. Share a link, get a quote, approve and print."),
      meta.name("twitter:card").content("summary_large_image"),
      meta.name("twitter:title").content("PRINT by LINK"),
      meta.name("twitter:description").content("Found a model online? We'll print it. Share a link, get a quote, approve and print."),
      meta.name("twitter:image").content("https://3dlocalprint.com/assets/print-by-link-banner-desktop-p1J3u-wC.png"),
    ],
    heroLede: "Already found a model online? Send the link and get a print quote.",
    bodyScripts: ["print-model-link.ts"],
    mainClass: "home-main home-main-cart",
    assetPrefix,
    mainSections: [
      section.class`print-link-splash`(
        img
          .class`print-link-splash-image print-link-splash-image-desktop`
          .src(withPrefix(assetPrefix, "assets/print-by-link-banner-desktop.png"))
          .attr("alt", "Found a model online? We'll print it. Share a link, get a quote, approve and print.")
          .attr("loading", "eager")
          .attr("decoding", "async")(),
        img
          .class`print-link-splash-image print-link-splash-image-mobile`
          .src(withPrefix(assetPrefix, "assets/print-by-link-banner-mobile.png"))
          .attr("alt", "")
          .attr("aria-hidden", "true")
          .attr("loading", "eager")
          .attr("decoding", "async")()
      ),
      section.class`cart-page-title print-link-title`(
        h1("PRINT by LINK"),
        p(
          "Share a model from ",
          a.href("https://www.printables.com/").target("_blank").rel("noopener noreferrer")("Printables"),
          ", ",
          a.href("https://makerworld.com/en/3d-models").target("_blank").rel("noopener noreferrer")("MakerWorld"),
          ", ",
          a.href("https://www.thingiverse.com/").target("_blank").rel("noopener noreferrer")("Thingiverse"),
          ", ",
          a.href("https://cults3d.com/").target("_blank").rel("noopener noreferrer")("Cults"),
          ", ",
          a.href("https://www.myminifactory.com/").target("_blank").rel("noopener noreferrer")("MyMiniFactory"),
          ", ",
          a.href("https://www.yeggi.com/").target("_blank").rel("noopener noreferrer")("Yeggi.com"),
          ", or another source. We will review the model, estimate print time and material, then email a quote before printing."
        )
      ),
      form.class`print-link-wizard`.id("printModelLinkForm")(
        section.class`home-card print-link-step-card is-active`.attr("data-step", "1")(
          div.class`print-link-step-heading`(
            span.class`home-card-tag`("Step 1"),
            h2("🔗 Paste the link(s)"),
            p("Add one or more model pages. Public links work best because they usually include pictures, license notes, print settings, and downloadable files.")
          ),
          div.class`print-link-list`.id("modelLinksList")(
            div.class`print-link-row`(
              input.attr("data-model-link-input", "true").attr("name", "modelLinks").attr("type", "url").attr("placeholder", "Paste link to model here..."),
              button.class`ghost-button print-link-remove`.attr("type", "button").attr("aria-label", "Remove model link")("🗑️")
            )
          ),
          div.class`print-link-actions`(
            button.class`ghost-button`.id("addModelLinkButton").attr("type", "button")("Add another link"),
            button.class`add-button`.id("step1Next").attr("type", "button").attr("disabled", "true")("Next")
          )
        ),
        section.class`home-card print-link-step-card is-collapsed`.attr("data-step", "2").attr("aria-hidden", "true")(
          div.class`print-link-step-heading`(
            span.class`home-card-tag`("Step 2"),
            h2("Contact details"),
            p("We may need to ask about scale, material, color, deadline, or whether a paid model has already been purchased.")
          ),
          div.class`print-link-field`(
            label.attr("for", "customerName")("Name"),
            input.id("customerName").attr("name", "customerName").attr("autocomplete", "name")
          ),
          div.class`print-link-field`(
            label.attr("for", "customerEmail")("Email"),
            input.id("customerEmail").attr("name", "customerEmail").attr("type", "email").attr("autocomplete", "email")
          ),
          div.class`print-link-field`(
            label.attr("for", "customerPhone")("Phone or text number"),
            input.id("customerPhone").attr("name", "customerPhone").attr("autocomplete", "tel")
          ),
          div.class`print-link-actions`(
            button.class`ghost-button`.attr("type", "button").attr("data-back-step", "1")("Back"),
            button.class`add-button`.id("step2Next").attr("type", "button")("Next")
          )
        ),
        section.class`home-card print-link-step-card is-collapsed`.attr("data-step", "3").attr("aria-hidden", "true")(
          div.class`print-link-step-heading`(
            span.class`home-card-tag`("Step 3"),
            h2("Quantity and quote details"),
            p("Set a quantity for each link. Notes about color, size, material, finish, deadline, pickup, or delivery are optional.")
          ),
          div.class`print-link-quantities`.id("modelItemQuantities"),
          div.class`print-link-field`(
            label.attr("for", "projectDetails")("Additional details optional"),
            textarea.id("projectDetails").attr("name", "projectDetails").attr("placeholder", "Color, size, deadline, material preference, strength needs, finish, pickup/delivery notes...")
          ),
          div.class`print-link-actions`(
            button.class`ghost-button`.attr("type", "button").attr("data-back-step", "2")("Back"),
            button.class`add-button`.id("step3Next").attr("type", "button")("Review")
          )
        ),
        section.class`home-card print-link-step-card is-collapsed`.attr("data-step", "4").attr("aria-hidden", "true")(
          div.class`print-link-step-heading`(
            span.class`home-card-tag`("Step 4"),
            h2("Review and submit"),
            p("After you send this, you will receive an email with a request link. We will review the model and reply with a quote before printing.")
          ),
          div.class`print-link-review`.id("printModelLinkReview"),
          button.class`add-button print-link-submit`.attr("type", "submit")("SEND FOR QUOTE"),
          p.class`print-link-status`.id("printModelLinkStatus").attr("role", "status").attr("aria-live", "polite")("")
        )
      ),
    ],
  });

export const homePrintModelLinkOrderPage = ({ assetPrefix = "./" } = {}) =>
  homeShell({
    pageTitle: "Model Link Quote Request - 3D Local Print",
    description: "Review a submitted 3D Local Print model link quote request.",
    heroLede: "",
    bodyScripts: ["print-model-link-order.ts"],
    mainClass: "home-main home-main-cart",
    assetPrefix,
    mainSections: [
      section.class`cart-page-title`(
        h1("Model Link Quote Request")
      ),
      section.class`home-grid`.id("printModelLinkOrderRoot")(
        div.class`home-products-loading`(
          div.class`home-products-spinner`().attr("aria-hidden", "true"),
          p.class`home-products-loading-text`("Loading quote request...")
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
      section.class`cart-page-title`(
        h1("🛒 Your Cart")
      ),
      section.class`home-grid`.id("homeCartRoot")(
        div.class`home-products-loading`(
          div.class`home-products-spinner`().attr("aria-hidden", "true"),
          p.class`home-products-loading-text`("Loading cart...")
        )
      ),
    ],
  });

export const homeReceiptPage = ({ assetPrefix = "./" } = {}) =>
  homeShell({
    pageTitle: "Receipt - 3D Local Print",
    heroLede: "",
    bodyScripts: ["receipt.ts"],
    mainClass: "home-main home-main-cart",
    assetPrefix,
    mainSections: [
      section.class`cart-page-title`(
        h1("Receipt")
      ),
      section.class`home-grid`.id("receiptRoot")(
        div.class`home-products-loading`(
          div.class`home-products-spinner`().attr("aria-hidden", "true"),
          p.class`home-products-loading-text`("Loading receipt...")
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
