export type SiteKey = "local" | "pet";

export type SiteTheme = {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  accent: string;
};

export type SiteNavItem = {
  label: string;
  href: string;
};

export type SiteConfig = {
  key: SiteKey;
  name: string;
  legalName: string;
  domain: string;
  tagline: string;
  description: string;
  title: string;
  themeName: "orange" | "blue";
  theme: SiteTheme;
  nav: SiteNavItem[];
  footerNote: string;
  contactEmail: string;
  logoAlt: string;
  logoPath: string;
};
