import { localSiteConfig } from "./local/config.js";
import { petSiteConfig } from "./pet/config.js";
import type { SiteConfig, SiteKey } from "./types.js";

export type { SiteConfig, SiteKey } from "./types.js";

export const siteConfigs: Record<SiteKey, SiteConfig> = {
  local: localSiteConfig,
  pet: petSiteConfig,
};

export const normalizeSiteKey = (value: unknown): SiteKey | null => {
  if (value === "local" || value === "pet") {
    return value;
  }
  return null;
};

export const getSiteConfig = (siteKey: SiteKey = "local") =>
  siteConfigs[siteKey] || siteConfigs.local;
