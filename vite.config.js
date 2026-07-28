import { defineConfig } from "vite";
import { resolve } from "path";
import { existsSync, mkdirSync, readFileSync, copyFileSync, readdirSync } from "fs";
import { locations } from "./src/admin/filament/locations.array.js";
import { slugifyLocation } from "./src/admin/filament/location-utils.js";

const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf-8")
);
const localFunctionsOrigin = process.env.VITE_FUNCTIONS_EMULATOR_ORIGIN || "http://127.0.0.1:5001";
const siteKey = process.env.VITE_SITE_KEY === "pet" ? "pet" : "local";

const rewriteFunctionPath = (functionName, url = "") => {
  const [, query = ""] = String(url || "").split("?");
  return `/threedlocalprint/us-central1/${functionName}${query ? `?${query}` : ""}`;
};

const rewriteProductPath = (url = "") => {
  const [pathname, query = ""] = String(url || "").split("?");
  const match = pathname.match(/^\/product\/([^/?#]+)\/?$/i);
  if (!match?.[1]) return null;
  const slug = match[1];
  const search = new URLSearchParams(query);
  if (!search.get("slug")) {
    search.set("slug", slug);
  }
  return `/product.html?${search.toString()}`;
};

const rewriteQr1Path = (url = "") => {
  const [pathname, query = ""] = String(url || "").split("?");
  if (!/^\/qr1\/?$/i.test(pathname)) return null;
  return `/qr1/index.html${query ? `?${query}` : ""}`;
};

const functionProxyErrorHandler = (proxy, _options) => {
  proxy.on("error", (error, _req, res) => {
    const message = String(error?.message || "Functions emulator proxy failed.");
    if (!res.headersSent) {
      res.writeHead(502, { "Content-Type": "application/json" });
    }
    res.end(JSON.stringify({
      error: "Local Firebase Functions emulator is not reachable.",
      details: `${message}. Start the full local stack with npm run dev:full, or start Firebase emulators on http://127.0.0.1:5001.`,
    }));
  });
};

const taggedJsSourceMapStripPlugin = {
  name: "taggedjs-strip-broken-source-map-references",
  enforce: "pre",
  load(id) {
    const normalizedId = id.split("?")[0].replaceAll("\\", "/");
    if (!isTaggedJsDistFile(normalizedId)) {
      return null;
    }

    return stripSourceMapReference(readFileSync(normalizedId, "utf-8"));
  },
  transform(code, id) {
    const normalizedId = id.split("?")[0].replaceAll("\\", "/");
    if (!isTaggedJsDistFile(normalizedId)) {
      return null;
    }

    return {
      code: stripSourceMapReference(code),
      map: null,
    };
  },
};

const isTaggedJsDistFile = (id) =>
  id.endsWith(".js") &&
  (
    id.includes("/node_modules/taggedjs/js/") ||
    id.includes("/web/taggedjs/main/dist/js/")
  );

const stripSourceMapReference = (code) =>
  code.replace(/\n?\/\/# sourceMappingURL=[^\n\r]+(?:\r?\n)?$/u, "\n");

const productSlugRewritePlugin = {
  name: "product-slug-rewrite",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const method = String(req.method || "GET").toUpperCase();
      const accept = String(req.headers?.accept || "").toLowerCase();
      const productTarget = rewriteProductPath(req.url || "");
      const qr1Target = rewriteQr1Path(req.url || "");
      const isHtmlRequest = accept.includes("text/html");
      if (method === "GET" && isHtmlRequest && productTarget) {
        res.statusCode = 302;
        res.setHeader("Location", productTarget);
        res.end();
        return;
      }
      if (method === "GET" && isHtmlRequest && qr1Target) {
        req.url = qr1Target;
        next();
        return;
      }
      next();
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      const method = String(req.method || "GET").toUpperCase();
      const accept = String(req.headers?.accept || "").toLowerCase();
      const productTarget = rewriteProductPath(req.url || "");
      const qr1Target = rewriteQr1Path(req.url || "");
      const isHtmlRequest = accept.includes("text/html");
      if (method === "GET" && isHtmlRequest && productTarget) {
        res.statusCode = 302;
        res.setHeader("Location", productTarget);
        res.end();
        return;
      }
      if (method === "GET" && isHtmlRequest && qr1Target) {
        req.url = qr1Target;
        next();
        return;
      }
      next();
    });
  },
};

const copyLogoAssets = (outputDir) => {
  const logoSourceDir = resolve(__dirname, "src/assets/logo");
  if (!outputDir || !existsSync(logoSourceDir)) {
    return;
  }

  const logoOutputDir = resolve(outputDir, "assets/logo");
  mkdirSync(logoOutputDir, { recursive: true });

  readdirSync(logoSourceDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
    .forEach((entry) => {
      copyFileSync(resolve(logoSourceDir, entry.name), resolve(logoOutputDir, entry.name));
    });
};

const siteIndexPlugin = (mode) => ({
  name: "site-index-html",
  configureServer(server) {
    if (mode !== "pet") {
      return;
    }

    server.middlewares.use((req, _res, next) => {
      const method = String(req.method || "GET").toUpperCase();
      const accept = String(req.headers?.accept || "").toLowerCase();
      const url = String(req.url || "");
      const [pathname, query = ""] = url.split("?");
      const isHtmlRequest = accept.includes("text/html");
      const isAssetRequest = pathname.includes(".") && !pathname.endsWith(".html");
      const petPageTargets = {
        "/how-it-works": "/how-it-works.html",
        "/how-it-works.html": "/how-it-works.html",
        "/get-started": "/get-started.html",
        "/get-started.html": "/get-started.html",
      };

      if (method === "GET" && isHtmlRequest && petPageTargets[pathname]) {
        req.url = `${petPageTargets[pathname]}${query ? `?${query}` : ""}`;
      } else if (method === "GET" && isHtmlRequest && !isAssetRequest && pathname !== "/" && pathname !== "/index.html") {
        req.url = `/index.html${query ? `?${query}` : ""}`;
      }

      next();
    });
  },
  transformIndexHtml(html, context) {
    if (mode !== "pet") {
      return html;
    }

    const htmlPath = String(context?.path || "");
    if (htmlPath && htmlPath !== "/" && htmlPath !== "/index.html") {
      return html;
    }

    const petHtmlPath = resolve(__dirname, "src/pet.html");
    if (!existsSync(petHtmlPath)) {
      return html;
    }

    return readFileSync(petHtmlPath, "utf-8");
  },
  writeBundle(options) {
    copyLogoAssets(String(options.dir || ""));
  },
});

const publicSiteInputs = {
  main: resolve(__dirname, "src/index.html"),
  organizationCheckout: resolve(__dirname, "src/organization-checkout.html"),
  apiDocs: resolve(__dirname, "src/api-docs.html"),
  productsHome: resolve(__dirname, "src/products.html"),
  productDetail: resolve(__dirname, "src/product.html"),
  printModelLink: resolve(__dirname, "src/print-model-link.html"),
  printModelLinkOrder: resolve(__dirname, "src/print-model-link-order.html"),
  cartHome: resolve(__dirname, "src/cart.html"),
  receiptHome: resolve(__dirname, "src/receipt.html"),
  agreementHome: resolve(__dirname, "src/agreement.html"),
  privacyHome: resolve(__dirname, "src/privacy.html"),
  termsHome: resolve(__dirname, "src/terms.html"),
  salesPolicyHome: resolve(__dirname, "src/sales-policy.html"),
  orderHome: resolve(__dirname, "src/order.html"),
  qr1: resolve(__dirname, "src/qr1/index.html"),
  notFound: resolve(__dirname, "src/404.html"),
  adminHome: resolve(__dirname, "src/admin/index.html"),
  adminFilament: resolve(__dirname, "src/admin/filament/index.html"),
  adminFilamentTypes: resolve(__dirname, "src/admin/filament/types.html"),
  adminManufacturers: resolve(__dirname, "src/admin/filament/manufacturers.html"),
  adminCameraTest: resolve(__dirname, "src/admin/filament/camera-test.html"),
  adminLedger: resolve(__dirname, "src/admin/accounting/ledger.html"),
  adminMoneyAccounts: resolve(__dirname, "src/admin/accounting/money-accounts.html"),
  adminAttention: resolve(__dirname, "src/admin/attention/index.html"),
  adminProducts: resolve(__dirname, "src/admin/products/index.html"),
  adminOrders: resolve(__dirname, "src/admin/orders/index.html"),
  adminAgreements: resolve(__dirname, "src/admin/agreements/index.html"),
  adminLinkOrders: resolve(__dirname, "src/admin/link-orders/index.html"),
  adminAlertTemplates: resolve(__dirname, "src/admin/alert-templates/index.html"),
  adminOrganizationCheckout: resolve(__dirname, "src/admin/organization-checkout/index.html"),
  adminAdmins: resolve(__dirname, "src/admin/security/admins.html"),
  ...Object.fromEntries(
    locations.map((location) => {
      const slug = slugifyLocation(location);
      return [
        [`admin-inventory-${slug}`, resolve(__dirname, `src/admin/filament/${slug}/index.html`)],
        [`admin-fast-edit-${slug}`, resolve(__dirname, `src/admin/filament/${slug}/fast-edit.html`)],
      ];
    })
    .flat()
  ),
};

export default defineConfig(({ mode }) => {
  const activeSiteKey = mode === "pet" || siteKey === "pet" ? "pet" : "local";

  return {
  plugins: [taggedJsSourceMapStripPlugin, productSlugRewritePlugin, siteIndexPlugin(activeSiteKey)],
  base: "./",
  root: "src",
  envDir: "..",
  publicDir: "../public",
  server: {
    allowedHosts: ["ackers-macbook.local"],
    proxy: {
      "/api/create-checkout-session": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/createCheckoutSession",
        configure: functionProxyErrorHandler,
      },
      "/api/organization-checkout/request": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/submitOrganizationCheckoutRequest",
        configure: functionProxyErrorHandler,
      },
      "/api/organization-checkout/verify": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/verifyOrganizationCheckout",
        configure: functionProxyErrorHandler,
      },
      "/api/admin/organization-checkout/requests": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: (path) => rewriteFunctionPath("manageOrganizationCheckoutRequests", path),
        configure: functionProxyErrorHandler,
      },
      "/api/admin/organization-checkout/certificate": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: (path) => rewriteFunctionPath("downloadOrganizationCertificate", path),
        configure: functionProxyErrorHandler,
      },
      "/api/public/order-receipt-link": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: (path) => rewriteFunctionPath("getPublicOrderReceiptLink", path),
        configure: functionProxyErrorHandler,
      },
      "/api/public/order": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: (path) => rewriteFunctionPath("getPublicOrder", path),
        configure: functionProxyErrorHandler,
      },
      "/api/public/agreement/accept-checkout": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/acceptAgreementAndCreateCheckoutSession",
        configure: functionProxyErrorHandler,
      },
      "/api/public/agreement": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: (path) => rewriteFunctionPath("getPublicAgreement", path),
        configure: functionProxyErrorHandler,
      },
      "/api/admin/agreements/create-default": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/createDefaultWebsiteServicesAgreement",
        configure: functionProxyErrorHandler,
      },
      "/api/admin/agreements/create": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/createWebsiteServicesAgreement",
        configure: functionProxyErrorHandler,
      },
      "/api/admin/agreements/update": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/updateWebsiteServicesAgreement",
        configure: functionProxyErrorHandler,
      },
      "/api/admin/agreements/delete": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/deleteWebsiteServicesAgreement",
        configure: functionProxyErrorHandler,
      },
      "/api/admin/agreements/send-email": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/sendAgreementEmail",
        configure: functionProxyErrorHandler,
      },
      "/api/model-link-quote-requests": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/submitModelLinkQuoteRequest",
        configure: functionProxyErrorHandler,
      },
      "/api/public/model-link-quote-request": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: (path) => rewriteFunctionPath("getPublicModelLinkQuoteRequest", path),
        configure: functionProxyErrorHandler,
      },
      "/api/admin/orders/resend-email": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/resendOrderNotification",
        configure: functionProxyErrorHandler,
      },
      "/api/admin/orders/resend-customer-email": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/resendCustomerOrderEmail",
        configure: functionProxyErrorHandler,
      },
      "/api/admin/orders/delete-test-order": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/deleteTestOrder",
        configure: functionProxyErrorHandler,
      },
      "/api/admin/orders/cancel": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/cancelOrder",
        configure: functionProxyErrorHandler,
      },
      "/api/admin/orders/close": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/closeOrder",
        configure: functionProxyErrorHandler,
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    outDir: activeSiteKey === "pet" ? "../docs/pet" : "../docs",
    emptyOutDir: true,
    rollupOptions: {
      input: activeSiteKey === "pet"
        ? {
            main: resolve(__dirname, "src/index.html"),
            howItWorks: resolve(__dirname, "src/how-it-works.html"),
            getStarted: resolve(__dirname, "src/get-started.html"),
            privacyHome: resolve(__dirname, "src/privacy.html"),
            termsHome: resolve(__dirname, "src/terms.html"),
            salesPolicyHome: resolve(__dirname, "src/sales-policy.html"),
          }
        : publicSiteInputs,
    },
  },
};
});
