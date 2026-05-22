import type { SiteKey } from "../sites/types.js";

export function getSiteKey(): SiteKey {
  const envSite = import.meta.env.VITE_SITE_KEY;
  if (envSite === "pet" || envSite === "local") return envSite;

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host.includes("3dpetprint")) return "pet";
    if (host.includes("3dlocalprint")) return "local";
  }

  return "local";
}
