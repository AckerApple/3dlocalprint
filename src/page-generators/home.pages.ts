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
      a
        .class`home-print-link-feature home-print-link-feature-link`
        .href(withPrefix(assetPrefix, "print-model-link.html"))
        .ariaLabel`Start a PRINT by LINK request`(
        img
          .class`home-print-link-image`
          .src(withPrefix(assetPrefix, "assets/print_link_steps.png"))
          .alt("Web link icon for PRINT by LINK service")
          .loading("lazy"),
        div.class`home-print-link-copy`(
          div.class`home-card-tag`("PRINT by LINK"),
          h2("Have a model link? We can quote the print."),
          p("Send us a link to a 3D model, add quantities and notes, and we will review the file for a custom print quote."),
          span.class`add-button home-print-link-cta`("Start a PRINT by LINK request")
        )
      ),
      section.class`home-about-intro panel`(
        div.class`home-about-copy`(
          h2.class`output-title`("Local 3D printing in Coconut Creek"),
          p(
            "3D Local Print is a family-run business making practical, creative, and personalized 3D printed products in Coconut Creek, Florida."
          ),
          p(
            "Shop ready-made products or send us a model link for a custom print quote."
          ),
          a.class`ghost-button`.href(withPrefix(assetPrefix, "products.html"))("Browse products")
        ),
        img
          .class("home-about-image")
          .src(withPrefix(assetPrefix, "assets/about-workshop.jpg"))
          .alt("A bright family-run 3D printing workshop in Coconut Creek")
          .loading("lazy")
      ),
      section.class`home-about-split`(
        figure.class`home-figure`(
          img
            .src(withPrefix(assetPrefix, "assets/about-orders.jpg"))
            .alt("Finished 3D printed products being prepared for customer orders")
            .loading("lazy"),
          figcaption("Printed, checked, and prepared for customer orders.")
        ),
        div.class`home-about-family home-card`(
          h2("Made locally, handled personally"),
          p(
            "We print, finish, pack, and support each order as a local family business. Questions and custom requests go directly to the people making your items."
          ),
          a.class`ghost-button`.href("mailto:service@3dlocalprint.com")("Contact us")
        )
      ),
    ],
  });

export const homeOrganizationCheckoutPage = ({ assetPrefix = "./" } = {}) =>
  homeShell({
    pageTitle: "Request Organizational Checkout - 3D Local Print",
    description: "Apply for verified tax-exempt organizational checkout.",
    heroLede: "Checkout for PTAs, PTOs, schools, and nonprofit organizations.",
    assetPrefix,
    mainClass: "home-main home-main-cart organization-request-main",
    bodyScripts: ["organization-checkout-request.ts"],
    mainSections: [
      section.class`cart-page-title`(
        h1("Request organizational checkout"),
        p("Submit your organization and exemption certificate for review. Approval is required before tax-exempt checkout can be used."),
        button
          .id`organizationProcessToggle`
          .type`button`
          .class`ghost-button organization-process-toggle`
          .attr("aria-expanded", "false")
          .attr("aria-controls", "organizationProcessDetails")(
          "How organizational checkout works"
        ),
        div
          .id`organizationProcessDetails`
          .class`home-card organization-process-details`
          .attr("hidden", "")(
          h2("How the process works"),
          p(strong("1. Submit the request. "), "Provide your organization, contact, billing, exemption certificate, and intended-purchase information."),
          p(strong("2. We review it. "), "3D Local Print verifies the submitted certificate and may contact you if updated information is needed."),
          p(strong("3. Approval is connected to Stripe. "), "Once approved, your organization receives a Stripe Customer record marked as tax exempt."),
          p(strong("4. Identify the organization at checkout. "), "Select tax-exempt organizational checkout in the cart and enter the approved contact email and exemption certificate number."),
          p(strong("5. Complete payment using organization funds. "), "The order is recorded as a tax-exempt organization order and linked to the organization’s Stripe Customer."),
          p.class`legal-notice`("Approval only applies while the exemption documentation remains current. Purchases must be paid directly with organization funds and used for the organization’s exempt purpose.")
        )
      ),
      section.class`home-card organization-request-card`(
        form.id`organizationCheckoutRequestForm`.class`organization-request-form`(
          h2("Organization"),
          div.class`organization-form-grid`(
            Field("Organization name", input.name`organizationName`.required(true).maxLength(180)),
            Field("Organization type", input.name`organizationType`.required(true).placeholder`PTA, PTO, school, nonprofit…`),
            Field("Contact name", input.name`contactName`.required(true)),
            Field("Contact email", input.name`contactEmail`.type`email`.required(true)),
            Field("Phone", input.name`phone`.type`tel`.required(true)),
            Field("Exemption certificate number", input.name`exemptionCertificateNumber`.required(true)),
            Field("Certificate expiration date", input.name`certificateExpirationDate`.type`date`.required(true)),
            Field("Street address", input.name`addressLine1`.required(true)),
            Field("Address line 2 (optional)", input.name`addressLine2`),
            Field("City", input.name`city`.required(true)),
            Field("State", input.name`state`.required(true).maxLength(2).value`FL`),
            Field("ZIP code", input.name`postalCode`.required(true)),
            Field(
              "Exemption certificate (PDF or image, 5 MB maximum)",
              input.name`certificate`.type`file`.required(true).attr("accept", "application/pdf,image/jpeg,image/png,image/webp")
            )
          ),
          Field(
            "What will the organization purchase?",
            textarea.name`intendedUse`.required(true).rows(4).placeholder`Briefly describe the products or projects.`
          ),
          label.class`legal-checkbox-row organization-certification`(
            input.name`certificationAccepted`.type`checkbox`.required(true),
            span("I certify that purchases using this approval will be paid directly with organization funds and used for the organization’s exempt purpose.")
          ),
          p.class`legal-notice`("Submitting a certificate does not guarantee approval. We may request updated documentation. Stripe processes approved checkout payments."),
          button.type`submit`.class`add-button organization-submit-button`("Submit request"),
          p.id`organizationRequestStatus`.class`home-cart-note`.attr("aria-live", "polite")()
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

const PolicySection = (title: string, ...items: any[]) =>
  section.class`home-card policy-section`(
    h2(title),
    ...items
  );

const PolicyList = (...items: any[]) =>
  div.class`policy-list`(
    ...items.map((item) => p(item))
  );

const PolicyNotice = () =>
  p.class`policy-updated`("Last updated: June 30, 2026. These policies are general business communications and are not a substitute for legal advice.");

export const homePrivacyPage = ({ assetPrefix = "./" } = {}) =>
  homeShell({
    pageTitle: "Privacy Policy - 3D Local Print",
    description: "Privacy policy for 3D Local Print public website orders, quotes, agreements, and support requests.",
    heroLede: "",
    assetPrefix,
    mainClass: "home-main home-main-cart policy-main",
    mainSections: [
      section.class`cart-page-title`(
        h1("Privacy Policy"),
        PolicyNotice()
      ),
      PolicySection(
        "Information we collect",
        PolicyList(
          "Contact details such as name, email address, optional phone number, and support emails you send us.",
          "Order, quote, cart, agreement, payment status, product, quantity, pickup, delivery, project note, and model-link details you submit.",
          "Agreement acceptance records, including signer name, acceptance checkbox state, timestamps, customer email/payment status, and browser or device metadata used to document acceptance.",
          "Google sign-in profile details for pet request access, such as email, display name, and profile photo when provided by Google.",
          "Local browser storage used for cart contents and draft model-link quote requests."
        )
      ),
      PolicySection(
        "How we use information",
        PolicyList(
          "To fulfill orders, create quotes, process agreements, send transactional emails, provide support, prevent abuse, maintain security, and keep business records.",
          "To operate admin tools, product catalogs, quote request records, agreement records, receipt and order lookup pages, and customer communications.",
          "To send optional marketing only when you explicitly opt in. Transactional order, quote, agreement, receipt, and support messages are separate from marketing."
        )
      ),
      PolicySection(
        "Payments and service providers",
        PolicyList(
          "Stripe processes payment card details through secure checkout. 3D Local Print stores payment identifiers, order records, and payment status, but not full card numbers.",
          "Firebase and Google services support hosting, database records, file storage, authentication, and admin tools. Email providers support transactional email delivery.",
          "We may use service providers only as needed to operate the website, process transactions, provide customer support, comply with legal obligations, or protect the business."
        )
      ),
      PolicySection(
        "Children and family requests",
        PolicyList(
          "The website is not directed to children. Minors should not submit information directly.",
          "A parent or guardian may submit requests involving family projects, children, pets, gifts, or keepsakes."
        )
      ),
      PolicySection(
        "Choices, retention, and contact",
        PolicyList(
          "You may contact service@3dlocalprint.com to request access, correction, deletion where feasible, or marketing opt-out.",
          "We keep order, agreement, payment, quote, support, security, accounting, and legal records as reasonably needed for business operations, tax, dispute, fraud prevention, and compliance purposes.",
          "Cart and draft quote data stored in your browser can be cleared by clearing site data or using site controls where available."
        ),
        p(
          "Contact: ",
          a.href("mailto:service@3dlocalprint.com")("service@3dlocalprint.com")
        )
      ),
    ],
  });

export const homeTermsPage = ({ assetPrefix = "./" } = {}) =>
  homeShell({
    pageTitle: "Terms of Service - 3D Local Print",
    description: "Terms of service for 3D Local Print website use, orders, quote requests, and agreements.",
    heroLede: "",
    assetPrefix,
    mainClass: "home-main home-main-cart policy-main",
    mainSections: [
      section.class`cart-page-title`(
        h1("Terms of Service"),
        PolicyNotice()
      ),
      PolicySection(
        "Using this website",
        PolicyList(
          "Use this website only for lawful personal or business purposes. Provide accurate information when requesting quotes, placing orders, accepting agreements, signing in, or contacting us.",
          "If a project involves a minor, a parent or guardian should submit and manage the request.",
          "You are responsible for keeping any sign-in credentials secure and for activity submitted through your account or device."
        )
      ),
      PolicySection(
        "Customer content and print requests",
        PolicyList(
          "You are responsible for model links, files, images, notes, product information, and other content you provide.",
          "Do not submit content or print requests that are unlawful, unsafe, infringing, abusive, regulated, weapon-related, deceptive, or otherwise inappropriate.",
          "By submitting content, you confirm you have the rights or permissions needed for us to review, quote, print, communicate about, and fulfill the request."
        )
      ),
      PolicySection(
        "Custom 3D print limitations",
        PolicyList(
          "Custom prints may vary in color, finish, strength, size, surface texture, supports, layer lines, fit, and durability.",
          "We may review feasibility, ask follow-up questions, refuse a request, cancel a request, or recommend changes before accepting or producing work.",
          "3D printed items may not be suitable for food contact, children, pets, safety-critical uses, medical uses, load-bearing uses, heat exposure, or regulated purposes unless expressly agreed in writing."
        )
      ),
      PolicySection(
        "Third-party services and limits",
        PolicyList(
          "The website may rely on Stripe, Firebase, Google sign-in, email, hosting, database, and storage providers. Their outages, policy changes, fees, or technical limits may affect website features.",
          "To the fullest extent allowed by law, 3D Local Print LLC is not responsible for indirect, incidental, special, lost-profit, lost-data, business-interruption, or third-party service damages."
        )
      ),
      PolicySection(
        "Contact",
        p(
          "Questions about these terms can be sent to ",
          a.href("mailto:service@3dlocalprint.com")("service@3dlocalprint.com"),
          "."
        )
      ),
    ],
  });

export const homeSalesPolicyPage = ({ assetPrefix = "./" } = {}) =>
  homeShell({
    pageTitle: "Sales, Shipping, Refunds, and Custom Work Policy - 3D Local Print",
    description: "Sales, shipping, refund, cancellation, and custom work policy for 3D Local Print.",
    heroLede: "",
    assetPrefix,
    mainClass: "home-main home-main-cart policy-main",
    mainSections: [
      section.class`cart-page-title`(
        h1("Sales, Shipping, Refunds, and Custom Work Policy"),
        PolicyNotice()
      ),
      PolicySection(
        "Prices and payment",
        PolicyList(
          "Prices, taxes, shipping, pickup, and availability may change before checkout or final quote acceptance.",
          "Online payments are handled through Stripe secure checkout. Orders and agreements are not final until payment is accepted or we confirm the order in writing.",
          "Failed, disputed, reversed, or incomplete payments may delay, pause, or cancel fulfillment."
        )
      ),
      PolicySection(
        "Production timing and delivery",
        PolicyList(
          "Production timing depends on model complexity, material availability, printer availability, finishing needs, order volume, and customer approvals.",
          "Shipping, pickup, or delivery timing will be confirmed during checkout, quote review, or direct communication when timing matters.",
          "If no specific timing is promised, we will communicate a reasonable estimate after reviewing the order or request."
        )
      ),
      PolicySection(
        "Custom work, cancellations, and refunds",
        PolicyList(
          "Custom quote requests are reviewed before printing. We may decline requests that are unsafe, infringing, impractical, unclear, or outside current capabilities.",
          "Because custom 3D prints use material, machine time, file preparation, and finishing labor, cancellation and refund options may be limited once materials are purchased, files are prepared, printing begins, finishing begins, or custom work is completed.",
          "For custom 3D print concerns, our usual first step is to review the issue and discuss a practical retry option, such as an adjusted reprint or discounted retry, when another attempt is reasonable.",
          "Refunds may still be offered when appropriate, including when we cannot complete accepted work, a paid order is canceled before meaningful custom work begins, or another resolution is required by the situation."
        )
      ),
      PolicySection(
        "Damaged, missing, or incorrect orders",
        PolicyList(
          "Contact us promptly at service@3dlocalprint.com with your order details and photos if an item arrives damaged, missing, or materially different from the accepted order.",
          "We may request photos, return of the item, or additional information before offering a discounted retry, adjusted remake, replacement, refund, or other resolution."
        )
      ),
      PolicySection(
        "Contact",
        p(
          "Questions about sales, shipping, refunds, or custom work can be sent to ",
          a.href("mailto:service@3dlocalprint.com")("service@3dlocalprint.com"),
          "."
        )
      ),
    ],
  });

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
            p.class`pet-upload-note`("Google sign-in is active. Additional SSO providers are placeholders for now."),
            p.class`legal-notice`(
              "Google sign-in may share profile information such as your email, display name, and profile photo. 3D Pet Print is not directed to children; a parent or guardian should submit requests involving minors. See our ",
              a.class`legal-inline-link`.href(withPrefix(assetPrefix, "privacy.html"))("Privacy Policy"),
              "."
            )
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
            p.class`legal-notice`("A parent or guardian should submit pet photos and notes when a request involves a minor or family gift."),
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
      section.class`home-grid receipt-grid`.id("receiptRoot")(
        div.class`home-products-loading`(
          div.class`home-products-spinner`().attr("aria-hidden", "true"),
          p.class`home-products-loading-text`("Loading receipt...")
        )
      ),
    ],
  });

export const homeAgreementPage = ({ assetPrefix = "./" } = {}) =>
  homeShell({
    pageTitle: "Service Agreement - 3D Local Print",
    description: "Review and accept a private website technical services agreement.",
    heroLede: "",
    bodyScripts: ["agreement.ts"],
    mainClass: "home-main home-main-cart agreement-main",
    assetPrefix,
    mainSections: [
      section.class`cart-page-title`(
        h1("Service Agreement")
      ),
      section.class`home-grid agreement-grid`.id("agreementRoot")(),
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
