import {
  link,
  main,
  footer,
  div,
  a,
  img,
  h2,
  p,
} from "taggedjs";
import { htmlPage, script, favicon, versionBadge } from "./html.core.js";

const withPrefix = (prefix, path) => {
  if (!prefix) return path;
  if (prefix.endsWith("/")) return `${prefix}${path}`;
  return `${prefix}/${path}`;
};

export const filamentIndexPage = ({
  assetPrefix = "./",
  location = "",
  locationSlug = "",
  includeFooter = true,
} = {}) =>
  htmlPage({
    pageTitle: location ? `Filament Inventory - ${location}` : "Filament Inventory",
    headItems: [
      link({ rel: "icon", href: favicon }),
      link({ rel: "stylesheet", href: withPrefix(assetPrefix, "styles.css") }),
    ],
    bodyItems: [
      main({
        id: "filamentApp",
        "data-location": location,
        "data-location-slug": locationSlug,
      }),
      includeFooter
        ? footer(
            { class: "footer" },
            div(
              { class: "footer-panels" },
              a(
                {
                  class: "panel footer-panel footer-card",
                  href: "https://makerworld.com/en/models/188119-spinning-filament-swatch-display-lifts-swatches",
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                div(
                  { class: "footer-content" },
                  div(
                    h2({ class: "output-title" }, "Spinning Filament Model"),
                    p("View the model on MakerWorld")
                  ),
                  img({
                    class: "footer-gif",
                    src: "https://makerworld.bblmw.com/makerworld/model/US21aef9fc3a4df0/design/2024-02-16_ejcflxmlkh3c.gif?x-oss-process=image/resize,w_1000/format,webp",
                    alt: "Spinning filament swatch display",
                    loading: "lazy",
                  })
                )
              ),
              a(
                {
                  class: "panel footer-panel footer-card",
                  href: "https://makerworld.com/en/models/18220-bambu-lab-filament-swatches",
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                div(
                  { class: "footer-content" },
                  div(
                    h2({ class: "output-title" }, "Filament Swatch Print"),
                    p("View the filament swatch print on MakerWorld")
                  ),
                  img({
                    class: "footer-gif",
                    src: "https://makerworld.bblmw.com/makerworld/model/USad0c6a30a40e3e/design/2023-09-23_a92bec82d0c97.png?x-oss-process=image/resize,w_1000/format,webp",
                    alt: "Bambu Lab filament swatches preview",
                    loading: "lazy",
                  })
                )
              )
            ),
            div(
              { class: "footer-links" },
              a(
                {
                  href: "https://github.com/AckerApple/3dlocalprint",
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                "Project repo"
              )
            )
          )
        : null,
      script({ type: "module", src: withPrefix(assetPrefix, "index.ts") }),
      versionBadge(),
      script({ type: "module", src: withPrefix(assetPrefix, "version.ts") }),
    ],
  });
