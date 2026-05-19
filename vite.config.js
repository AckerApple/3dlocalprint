import { defineConfig } from "vite";
import { resolve } from "path";
import { readFileSync } from "fs";
import { locations } from "./src/admin/filament/locations.array.js";
import { slugifyLocation } from "./src/admin/filament/location-utils.js";

const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf-8")
);
const localFunctionsOrigin = process.env.VITE_FUNCTIONS_EMULATOR_ORIGIN || "http://127.0.0.1:5001";

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

export default defineConfig({
  plugins: [productSlugRewritePlugin],
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
      },
      "/api/public/order-receipt-link": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: (path) => rewriteFunctionPath("getPublicOrderReceiptLink", path),
      },
      "/api/public/order": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: (path) => rewriteFunctionPath("getPublicOrder", path),
      },
      "/api/admin/orders/resend-email": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/resendOrderNotification",
      },
      "/api/admin/orders/resend-customer-email": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/resendCustomerOrderEmail",
      },
      "/api/admin/orders/delete-test-order": {
        target: localFunctionsOrigin,
        changeOrigin: true,
        rewrite: () => "/threedlocalprint/us-central1/deleteTestOrder",
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        aboutHome: resolve(__dirname, "src/about.html"),
        productsHome: resolve(__dirname, "src/products.html"),
        productDetail: resolve(__dirname, "src/product.html"),
        cartHome: resolve(__dirname, "src/cart.html"),
        receiptHome: resolve(__dirname, "src/receipt.html"),
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
        adminProducts: resolve(__dirname, "src/admin/products/index.html"),
        adminOrders: resolve(__dirname, "src/admin/orders/index.html"),
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
      },
    },
  },
});
