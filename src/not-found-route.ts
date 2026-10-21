import { tagElement, tag, div, h1, p, a } from "taggedjs";
import { beginProductNavigation, delayedProductLoading, ProductLoadingStatus } from "./product-loading.js";

const fallbackRoot = document.getElementById("homeNotFoundDetail");
const loadingDelay = delayedProductLoading(() => {
  if (fallbackRoot?.isConnected) tagElement(tag(ProductLoadingStatus), fallbackRoot);
});
const cancelLoading = () => { loadingDelay.cancel(); removalObserver.disconnect(); };
const removalObserver = new MutationObserver(() => {
  if (fallbackRoot && !fallbackRoot.isConnected) cancelLoading();
});
if (fallbackRoot) removalObserver.observe(document.body, { childList: true, subtree: true });
window.addEventListener("pagehide", cancelLoading, { once: true });

const decodeSlug = (value = "") => {
  try {
    return decodeURIComponent(value).trim();
  } catch {
    return String(value || "").trim();
  }
};

const routeProductDeepLink = () => {
  const path = String(window.location.pathname || "");
  const match = path.match(/^\/product\/([^/?#]+)\/?$/i);
  if (!match?.[1]) return false;

  const slug = decodeSlug(match[1]);
  if (!slug) return false;

  const target = new URL("/product.html", window.location.origin);
  target.search = window.location.search;
  target.searchParams.set("slug", slug);
  target.hash = window.location.hash;
  beginProductNavigation(slug);
  loadingDelay.start();
  window.location.replace(`${target.pathname}${target.search}${target.hash}`);
  return true;
};

if (!routeProductDeepLink() && fallbackRoot) {
  document.title = "Page Not Found - 3D Local Print";
  tagElement(tag(() => div.class`home-card home-card-muted`(
    h1("Page not found"),
    p("This page is unavailable."),
    a.class`ghost-button`.href("/products.html")("Browse Products")
  )), fallbackRoot);
}
