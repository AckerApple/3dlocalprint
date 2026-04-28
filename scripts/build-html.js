import { mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { renderDocument } from "./html.render.js";
import { filamentIndexPage } from "./filament.index.html.js";
import { filamentStandalonePage } from "./filament.standalone.html.js";
import { filamentFastEditPage } from "./filament.fast-edit.html.js";
import {
  homeLandingPage,
  homeProductsPage,
  homeProductDetailPage,
  homeCartPage,
  homeQr1Page,
  homeNotFoundPage,
} from "./home.pages.js";

const locations = ["Fireguys", "Apples"];

const slugifyLocation = (location = "") =>
  location
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const rootDir = resolve(".");
const homeDir = resolve(rootDir, "src");
const qr1Dir = resolve(homeDir, "qr1");
const adminDir = resolve(rootDir, "src/admin");
const adminFilamentDir = resolve(adminDir, "filament");
const adminAccountingDir = resolve(adminDir, "accounting");
const adminProductsDir = resolve(adminDir, "products");
const adminSecurityDir = resolve(adminDir, "security");

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
  {
    path: resolve(qr1Dir, "index.html"),
    render: () => homeQr1Page(),
  },
  {
    path: resolve(homeDir, "404.html"),
    render: () => homeNotFoundPage(),
  },
];

const pages = [
  {
    path: resolve(adminDir, "index.html"),
    render: () =>
      filamentStandalonePage({
        pageTitle: "Admin Home",
        appId: "adminHomeApp",
        appScript: "./filament/admin-home.tag.ts",
        stylePath: "./shared/styles.css",
        versionScriptPath: "./shared/version.ts",
      }),
  },
  {
    path: resolve(adminFilamentDir, "index.html"),
    render: () =>
      filamentIndexPage({
        stylePath: "../shared/styles.css",
        appScriptPath: "./index.ts",
        versionScriptPath: "../shared/version.ts",
      }),
  },
  {
    path: resolve(adminFilamentDir, "types.html"),
    render: () =>
      filamentStandalonePage({
        pageTitle: "Filament Types",
        appId: "filamentTypesApp",
        appScript: "./filament-types.tag.ts",
        stylePath: "../shared/styles.css",
        versionScriptPath: "../shared/version.ts",
      }),
  },
  {
    path: resolve(adminFilamentDir, "manufacturers.html"),
    render: () =>
      filamentStandalonePage({
        pageTitle: "🏭 Manage Filament Manufacturers",
        appId: "manufacturersApp",
        appScript: "./manufacturers.tag.ts",
        stylePath: "../shared/styles.css",
        versionScriptPath: "../shared/version.ts",
      }),
  },
  {
    path: resolve(adminFilamentDir, "camera-test.html"),
    render: () =>
      filamentStandalonePage({
        pageTitle: "Camera Test",
        appId: "cameraTestApp",
        appScript: "./camera-test.tag.ts",
        stylePath: "../shared/styles.css",
        versionScriptPath: "../shared/version.ts",
      }),
  },
  {
    path: resolve(adminAccountingDir, "ledger.html"),
    render: () =>
      filamentStandalonePage({
        pageTitle: "Ledger",
        appId: "ledgerApp",
        appScript: "./ledger/ledger.tag.ts",
        stylePath: "../shared/styles.css",
        versionScriptPath: "../shared/version.ts",
      }),
  },
  {
    path: resolve(adminAccountingDir, "money-accounts.html"),
    render: () =>
      filamentStandalonePage({
        pageTitle: "Money Accounts",
        appId: "moneyAccountsApp",
        appScript: "./money-accounts.tag.ts",
        stylePath: "../shared/styles.css",
        versionScriptPath: "../shared/version.ts",
      }),
  },
  {
    path: resolve(adminProductsDir, "index.html"),
    render: () =>
      filamentStandalonePage({
        pageTitle: "Products",
        appId: "productsApp",
        appScript: "./products.tag.ts",
        stylePath: "../shared/styles.css",
        versionScriptPath: "../shared/version.ts",
      }),
  },
  {
    path: resolve(adminSecurityDir, "admins.html"),
    render: () =>
      filamentStandalonePage({
        pageTitle: "Manage Admins",
        appId: "adminsApp",
        appScript: "./admins.tag.ts",
        stylePath: "../shared/styles.css",
        versionScriptPath: "../shared/version.ts",
      }),
  },
];

const fastEditPages = locations.map((location) => {
  const locationSlug = slugifyLocation(location);
  return {
    path: resolve(adminFilamentDir, locationSlug, "fast-edit.html"),
    render: () =>
      filamentFastEditPage({
        pageTitle: `Fast Edit - ${location}`,
        appId: "fastEditApp",
        location,
        locationSlug,
        assetPrefix: "./",
        stylePath: "../../shared/styles.css",
        appScriptPath: "../filament-fast-edit.tag.ts",
        versionScriptPath: "../../shared/version.ts",
      }),
  };
});

const locationInventoryPages = locations.map((location) => {
  const locationSlug = slugifyLocation(location);
  return {
    path: resolve(adminFilamentDir, locationSlug, "index.html"),
    render: () =>
      filamentIndexPage({
        assetPrefix: "./",
        stylePath: "../../shared/styles.css",
        appScriptPath: "../index.ts",
        versionScriptPath: "../../shared/version.ts",
        location,
        locationSlug,
        includeFooter: false,
      }),
  };
});

mkdirSync(homeDir, { recursive: true });
mkdirSync(adminDir, { recursive: true });

homePages.concat(pages, fastEditPages, locationInventoryPages).forEach((page) => {
  const dir = resolve(page.path, "..");
  mkdirSync(dir, { recursive: true });
  writeFileSync(page.path, renderDocument(page.render()), "utf-8");
});
