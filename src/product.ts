import { delayedProductLoading, productNavigationDelay, ProductLoadingStatus } from "./product-loading.js";
import { isNameBadgeProduct, validateBadgeName } from "./name-badges.js";
import { loadProducts } from "./admin/shared/firebase.js";
import type { ProductItem } from "./types/product.js";
import { normalizeProductCategories } from "./product-categories.js";
import { HomeCartActions } from "./home-cart-actions.js";
import {
  tag,
  button,
  tagElement,
  div,
  p,
  img,
  h1,
  h2,
  span,
  label,
  select,
  input,
  option,
  a,
  array,
  subscribe,
} from "taggedjs";

const detailRoot = document.getElementById("homeProductDetail");
const pageTitleRoot = document.getElementById("homeProductPageTitle");
let loadedProduct: ProductItem | null = null;
let selectedVariationId = "";
let messageState: { title: string; message: string; retry: boolean } | null = null;
let loadingVisible = false;
let loadGeneration = 0;
let detailMounted = false;
let initialNavigation = true;
let selectedQuantity = 1;
let badgeName = "";
const productDetailRender$ = array([{ version: 0 }]);

type ProductVariationView = {
  id: string;
  label: string;
  unitAmount: number;
  stripePriceId: string;
  active: boolean;
};

const formatPrice = (unitAmount = 0, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "usd").toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((Math.max(0, Number(unitAmount) || 0)) / 100);

const getSlug = () => {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = String(params.get("slug") || "").trim();
  if (fromQuery) {
    return fromQuery;
  }
  const pathMatch = window.location.pathname.match(/\/product\/([^/?#]+)\/?$/i);
  if (!pathMatch?.[1]) {
    return "";
  }
  try {
    return decodeURIComponent(pathMatch[1]).trim();
  } catch {
    return String(pathMatch[1] || "").trim();
  }
};

const canonicalizeProductUrl = () => {
  const url = new URL(window.location.href);
  const slug = String(url.searchParams.get("slug") || "").trim();
  if (!slug || !/\/product\.html$/i.test(url.pathname)) {
    return;
  }

  url.pathname = url.pathname.replace(
    /\/product\.html$/i,
    `/product/${encodeURIComponent(slug)}`
  );
  url.searchParams.delete("slug");
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
};

canonicalizeProductUrl();

const normalizeVariations = (product: ProductItem): ProductVariationView[] =>
  (Array.isArray(product?.variations) ? product.variations : [])
    .map((variation) => ({
      id: String(variation?.id || "").trim(),
      label: String(variation?.label || "").trim(),
      unitAmount: Math.max(0, Math.round(Number(variation?.unitAmount) || 0)),
      stripePriceId: String(variation?.stripePriceId || "").trim(),
      active: Boolean(variation?.active),
    }))
    .filter((variation) => variation.id && variation.label && variation.active);

const getPrimaryImageUrl = (product: ProductItem) => {
  const images = Array.isArray(product?.images) ? product.images : [];
  const firstImageUrl = String(images[0]?.imageUrl || "").trim();
  if (firstImageUrl) return firstImageUrl;
  return String(product?.imageUrl || "").trim();
};

const getSelectedVariation = (product: ProductItem) => {
  const variations = normalizeVariations(product);
  return variations.find((variation) => variation.id === selectedVariationId) || variations[0] || null;
};

const notifyProductDetail = () => {
  productDetailRender$[0] = { version: Number(productDetailRender$[0]?.version || 0) + 1 };
};

const setProductIndexing = (catalogVisible: boolean) => {
  let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (!robots) {
    robots = document.createElement("meta");
    robots.name = "robots";
    document.head.append(robots);
  }
  robots.content = catalogVisible ? "index, follow" : "noindex, nofollow";
};

const mountProductDetail = () => {
  if (!detailRoot) return;
  detailRoot.replaceChildren();
  tagElement(ProductDetailApp, detailRoot);
};

const renderMessage = (title: string, message: string, retry = false) => {
  messageState = { title, message, retry };
  loadedProduct = null;
  if (pageTitleRoot) {
    pageTitleRoot.textContent = "Products";
  }
  notifyProductDetail();
};

const ProductMessage = (title: string, message: string, retry: boolean) =>
  div.class`home-card home-card-muted`(
    h2(title),
    p(message),
    retry ? button.type`button`.class`ghost-button`.onClick(()=>void load())("Try again") : null
  );

const ProductDetailContent = () => {
  if (messageState) {
    return [ProductMessage(messageState.title, messageState.message, messageState.retry)];
  }

  const product = loadedProduct;
  if (!product) return loadingVisible ? [ProductLoadingStatus()] : [];

  const primaryImageUrl = getPrimaryImageUrl(product);
  const descriptionText = String(product.description || "").trim();
  const categories = normalizeProductCategories(product.categories);
  const variations = normalizeVariations(product);
  const selectedVariation = getSelectedVariation(product);

  return [
    div.class`home-card home-product-detail-card`(
      primaryImageUrl
        ? img
            .class`home-product-detail-media`
            .src(primaryImageUrl)
            .alt(String(product.title || "Product image"))
            .loading("eager")
        : null,
      div.class`home-product-detail-info`(
        h1.class`home-product-detail-title`(product.title),
        descriptionText
          ? p.class`home-product-description`(descriptionText)
          : null,
        categories.length
          ? div.class`home-product-categories`(
              categories.map((category) =>
                span.class`home-product-category-chip`(category)
              )
            )
          : null,
        div.class`home-card-tag`(
          _=> formatPrice(selectedVariation?.unitAmount ?? product.unitAmount, product.currency)
        ),
        div.class`home-product-detail-actions`(
          isNameBadgeProduct(product) ? div(
            label("Name on badge (required, up to 15 characters)",
              input.type`text`.attr("maxlength", "15").attr("required", "").value(() => badgeName)
                .onInput((event) => { badgeName = event.target.value; })()
            ),
            p("Quantity makes copies of this name. For different names, add each name separately.")
          ) : null,
          variations.length
            ? label.class`home-products-filter-label`(
                "OPTIONS",
                select
                  .class`manufacturer-input home-products-filter-select`
                  .value(_=> selectedVariation?.id || "")
                  .onChange((event) => {
                    selectedVariationId = String(event.target.value || "").trim();
                  })(
                  variations.map((variation) =>
                    option.value(variation.id)(
                      _=> `${variation.label} - ${formatPrice(variation.unitAmount, product.currency)}`
                    )
                  )
                )
              )
            : null,
          div.class`home-product-detail-cart-actions`(
            _=> HomeCartActions({
              productId: product.id,
              getBadgeName: isNameBadgeProduct(product) ? () => validateBadgeName(badgeName) : undefined,
              getVariationId: () => selectedVariationId,
              initialQuantity: 1,
              getQuantityState: () => selectedQuantity,
              setQuantityState: (quantity) => {
                selectedQuantity = quantity;
              },
            })
          ),
          a.class`ghost-button`.href("../products.html")("Back to Products")
        )
      )
    ),
  ];
};

const ProductDetailApp = tag(() => subscribe(productDetailRender$, ProductDetailContent));

const loadingDelay = delayedProductLoading(() => {
  if (!detailRoot?.isConnected) return;
  loadingVisible = true;
  notifyProductDetail();
});

const stopLoading = () => {
  loadGeneration++;
  loadingDelay.cancel();
  loadingVisible = false;
  detailRoot?.setAttribute("aria-busy", "false");
};

const load = async () => {
  if (!detailRoot?.isConnected) return;
  const generation = ++loadGeneration;
  loadingDelay.cancel();
  loadingVisible = false;
  loadedProduct = null;
  messageState = null;
  detailRoot.setAttribute("aria-busy", "true");
  pageTitleRoot?.closest(".cart-page-title")?.setAttribute("hidden", "");
  if (!detailMounted) { mountProductDetail(); detailMounted = true; }
  else notifyProductDetail();
  const slug = getSlug();
  if (!slug) {
    detailRoot.setAttribute("aria-busy", "false");
    renderMessage("Product not found", "This product link is missing its identifier.");
    return;
  }
  loadingDelay.start(initialNavigation ? productNavigationDelay(slug) : undefined);
  initialNavigation = false;
  try {
    const items = await loadProducts();
    if (generation !== loadGeneration || !detailRoot.isConnected || getSlug() !== slug) return;
    if (!Array.isArray(items)) throw new Error("Invalid product catalog response");
    const activeProducts = items.filter((item) => Boolean(item?.active));
    const match = activeProducts.find((item) => String(item.slug || item.id || "").trim() === slug);
    if (!match) {
      renderMessage("Product not found", "This product may have been removed or is no longer active.");
      return;
    }
    loadedProduct = match;
    setProductIndexing(match.catalogVisible !== false);
    messageState = null;
    selectedVariationId = normalizeVariations(match)[0]?.id || "";
    notifyProductDetail();
  } catch (error) {
    if (generation !== loadGeneration || !detailRoot.isConnected || getSlug() !== slug) return;
    console.error("Failed to load product detail", error);
    renderMessage("Product unavailable", "The product could not be loaded. Please try again.", true);
  } finally {
    if (generation === loadGeneration) {
      loadingDelay.cancel();
      loadingVisible = false;
      detailRoot.setAttribute("aria-busy", "false");
    }
  }
};

window.addEventListener("pagehide", stopLoading);
window.addEventListener("pageshow", (event) => { if (event.persisted) void load(); });
window.addEventListener("popstate", () => { canonicalizeProductUrl(); void load(); });
const removalObserver = new MutationObserver(() => {
  if (detailRoot && !detailRoot.isConnected) { stopLoading(); removalObserver.disconnect(); }
});
if (detailRoot) removalObserver.observe(document.body, { childList: true, subtree: true });
void load();
