import type { SiteConfig } from "../types.js";

export const petSiteConfig: SiteConfig = {
  key: "pet",
  name: "3D Pet Print",
  legalName: "3D Local Print LLC",
  domain: "3dpetprint.com",
  tagline: "Custom 3D printed keepsakes from the pets you love.",
  description:
    "Upload photos of your pet and turn them into custom 3D printed figurines, ornaments, gifts, and memorial keepsakes.",
  title: "3D Pet Print | Custom 3D Printed Pet Keepsakes",
  themeName: "blue",
  theme: {
    primary: "#2563eb",
    primaryDark: "#1e3a8a",
    primaryLight: "#dbeafe",
    accent: "#38bdf8",
  },
  nav: [
    { label: "Home", href: "index.html" },
    { label: "How It Works", href: "how-it-works.html" },
    { label: "Get Started", href: "get-started.html" },
    { label: "Contact", href: "mailto:service@3dlocalprint.com" },
  ],
  footerNote: "3D Pet Print is operated by 3D Local Print LLC.",
  contactEmail: "service@3dlocalprint.com",
  logoAlt: "3D Pet Print logo",
  logoPath: "assets/logo/3DPetPrint.svg",
};
