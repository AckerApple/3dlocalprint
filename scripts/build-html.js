import { mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { renderDocument } from "./html.render.js";
import { filamentIndexPage } from "./filament.index.html.js";
import { filamentStandalonePage } from "./filament.standalone.html.js";
import { filamentFastEditPage } from "./filament.fast-edit.html.js";

const locations = ["Fireguys", "Apples"];

const slugifyLocation = (location = "") =>
  location
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const rootDir = resolve(".");
const filamentDir = resolve(rootDir, "src/filament");

const pages = [
  {
    path: resolve(filamentDir, "index.html"),
    render: () => filamentIndexPage(),
  },
  {
    path: resolve(filamentDir, "admin.html"),
    render: () =>
      filamentStandalonePage({
        pageTitle: "Admin Home",
        appId: "adminHomeApp",
        appScript: "admin-home.tag.ts",
      }),
  },
  {
    path: resolve(filamentDir, "filament-types.html"),
    render: () =>
      filamentStandalonePage({
        pageTitle: "Filament Types",
        appId: "filamentTypesApp",
        appScript: "filament-types.tag.ts",
      }),
  },
  {
    path: resolve(filamentDir, "manufacturers.html"),
    render: () =>
      filamentStandalonePage({
        pageTitle: "🏭 Manage Filament Manufacturers",
        appId: "manufacturersApp",
        appScript: "manufacturers.tag.ts",
      }),
  },
  {
    path: resolve(filamentDir, "ledger.html"),
    render: () =>
      filamentStandalonePage({
        pageTitle: "Ledger",
        appId: "ledgerApp",
        appScript: "ledger/ledger.tag.ts",
      }),
  },
  {
    path: resolve(filamentDir, "admins.html"),
    render: () =>
      filamentStandalonePage({
        pageTitle: "Manage Admins",
        appId: "adminsApp",
        appScript: "admins.tag.ts",
      }),
  },
];

const fastEditPages = locations.map((location) => {
  const locationSlug = slugifyLocation(location);
  return {
    path: resolve(filamentDir, locationSlug, "fast-edit.html"),
    render: () =>
      filamentFastEditPage({
        pageTitle: `Fast Edit - ${location}`,
        appId: "fastEditApp",
        location,
        locationSlug,
        assetPrefix: "../",
      }),
  };
});

const locationInventoryPages = locations.map((location) => {
  const locationSlug = slugifyLocation(location);
  return {
    path: resolve(filamentDir, locationSlug, "index.html"),
    render: () =>
      filamentIndexPage({
        assetPrefix: "../",
        location,
        locationSlug,
        includeFooter: false,
      }),
  };
});

mkdirSync(filamentDir, { recursive: true });

pages.concat(fastEditPages, locationInventoryPages).forEach((page) => {
  const dir = resolve(page.path, "..");
  mkdirSync(dir, { recursive: true });
  writeFileSync(page.path, renderDocument(page.render()), "utf-8");
});
