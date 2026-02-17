import { defineConfig } from "vite";
import { resolve } from "path";
import { readFileSync } from "fs";
import { locations } from "./src/filament/locations.array.js";
import { slugifyLocation } from "./src/filament/location-utils.js";

const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf-8")
);

export default defineConfig({
  base: "./",
  root: "src",
  publicDir: "../public",
  server: {
    allowedHosts: ["ackers-macbook.local"],
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
        filament: resolve(__dirname, "src/filament/index.html"),
        admin: resolve(__dirname, "src/filament/admin.html"),
        filamentTypes: resolve(__dirname, "src/filament/filament-types.html"),
        manufacturers: resolve(__dirname, "src/filament/manufacturers.html"),
        cameraTest: resolve(__dirname, "src/filament/camera-test.html"),
        ledger: resolve(__dirname, "src/filament/ledger.html"),
        admins: resolve(__dirname, "src/filament/admins.html"),
        ...Object.fromEntries(
          locations.map((location) => {
            const slug = slugifyLocation(location);
            return [
              [`inventory-${slug}`, resolve(__dirname, `src/filament/${slug}/index.html`)],
              [`fast-edit-${slug}`, resolve(__dirname, `src/filament/${slug}/fast-edit.html`)],
            ];
          })
          .flat()
        ),
      },
    },
  },
});
