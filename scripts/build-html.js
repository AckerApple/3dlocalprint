import { mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { renderDocument } from "./html.render.js";
import { filamentIndexPage } from "./filament.index.html.js";
import { filamentStandalonePage } from "./filament.standalone.html.js";
import { filamentFastEditPage } from "./filament.fast-edit.html.js";
import { homeLandingPage, homeProductsPage, homeProductDetailPage, homeCartPage } from "./home.pages.js";

const locations = ["Fireguys", "Apples"];

const slugifyLocation = (location = "") =>
  location
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const rootDir = resolve(".");
const filamentDir = resolve(rootDir, "src/filament");
const homeDir = resolve(rootDir, "src");

const homePages = [
  {
    path: resolve(homeDir, "index.html"),
    render: () => homeLandingPage(),
  },
  {
    path: resolve(homeDir, "products.html"),
    render: () => homeProductsPage(),
  },
  {
    path: resolve(homeDir, "product.html"),
    render: () => homeProductDetailPage(),
  },
  {
    path: resolve(homeDir, "cart.html"),
    render: () => homeCartPage(),
  },
];

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
    path: resolve(filamentDir, "camera-test.html"),
    render: () =>
      filamentStandalonePage({
        pageTitle: "Camera Test",
        appId: "cameraTestApp",
        appScript: "camera-test.tag.ts",
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
    path: resolve(filamentDir, "money-accounts.html"),
    render: () =>
      filamentStandalonePage({
        pageTitle: "Money Accounts",
        appId: "moneyAccountsApp",
        appScript: "money-accounts.tag.ts",
      }),
  },
  {
    path: resolve(filamentDir, "products.html"),
    render: () =>
      filamentStandalonePage({
        pageTitle: "Products",
        appId: "productsApp",
        appScript: "products.tag.ts",
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
mkdirSync(homeDir, { recursive: true });

homePages.concat(pages, fastEditPages, locationInventoryPages).forEach((page) => {
  const dir = resolve(page.path, "..");
  mkdirSync(dir, { recursive: true });
  writeFileSync(page.path, renderDocument(page.render()), "utf-8");
});
