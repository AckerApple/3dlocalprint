import type { SiteConfig } from "../types.js";

export const localSiteConfig: SiteConfig = {
  key: "local",
  name: "3D Local Print",
  legalName: "3D Local Print LLC",
  domain: "3dlocalprint.com",
  tagline: "Learn. Paint. Assemble. Bring it home.",
  description:
    "A hands-on 3D local print store where you can learn, paint, assemble, and take home custom 3D printed merchandise.",
  title: "3D Local Print",
  themeName: "orange",
  theme: {
    primary: "#de6a2e",
    primaryDark: "#7c3f1f",
    primaryLight: "#fff4e7",
    accent: "#f2b544",
  },
  nav: [
    { label: "Home", href: "index.html" },
    { label: "PRINT by LINK", href: "print-model-link.html" },
    { label: "Products", href: "products.html" },
    { label: "Cart", href: "cart.html" },
  ],
  footerNote: "Learn. Paint. Assemble. Bring it home.",
  contactEmail: "service@3dlocalprint.com",
  logoAlt: "3D Local Print logo",
  logoPath: "assets/logo/transparent.svg",
};
