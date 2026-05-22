import type { SiteTheme } from "../sites/types.js";

export const themeToCssVariables = (theme: SiteTheme) =>
  [
    `--site-primary: ${theme.primary};`,
    `--site-primary-dark: ${theme.primaryDark};`,
    `--site-primary-light: ${theme.primaryLight};`,
    `--site-accent: ${theme.accent};`,
  ].join(" ");
