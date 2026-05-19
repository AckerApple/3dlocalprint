import { loadProducts } from "./admin/shared/firebase.js";
import type { ProductItem } from "./types/product.js";
import { normalizeProductCategories } from "./product-categories.js";
import { HomeCartActions } from "./home-cart-actions.js";
import {
  tag,
  tagElement,
  div,
  p,
  h2,
  span,
  label,
  select,
  option,
  a,
} from "taggedjs";

const detailRoot = document.getElementById("homeProductDetail");
const pageTitleRoot = document.getElementById("homeProductPageTitle");
let loadedProduct: ProductItem | null = null;
let selectedVariationId = "";
let messageState: { title: string; message: string } | null = null;

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

const renderProductDetail = () => {
  if (!detailRoot) return;
  detailRoot.replaceChildren();
  tagElement(ProductDetailApp, detailRoot);
};

const renderMessage = (title: string, message: string) => {
  messageState = { title, message };
  loadedProduct = null;
  if (pageTitleRoot) {
    pageTitleRoot.textContent = "Products";
  }
};

const ProductMessage = (title: string, message: string) =>
  div.class`home-card home-card-muted`(
    h2(title),
    p(message)
  );

const ProductDetailApp = tag(() => {
  if (messageState) {
    return [ProductMessage(messageState.title, messageState.message)];
  }

  const product = loadedProduct;
  if (!product) {
    return [
      div.class`home-products-loading`(
        div.class`home-products-spinner`().attr("aria-hidden", "true"),
        p.class`home-products-loading-text`("Loading product...")
      ),
    ];
  }

  const primaryImageUrl = getPrimaryImageUrl(product);
  const descriptionText = String(product.description || "").trim();
  const categories = normalizeProductCategories(product.categories);
  const variations = normalizeVariations(product);
  const selectedVariation = getSelectedVariation(product);

  return [
    div.class`home-card home-product-detail-card`(
      primaryImageUrl
        ? div
            .class`home-product-detail-media`
            .style(`background-image: url("${primaryImageUrl.replace(/"/g, "%22")}")`)()
        : null,
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
            getVariationId: () => selectedVariationId,
            initialQuantity: 1,
          })
        ),
        a.class`ghost-button`.href("../products.html")("Back to Products")
      )
    ),
  ];
});

const load = async () => {
  if (!detailRoot) return;
  renderProductDetail();
  const slug = getSlug();
  if (!slug) {
    renderMessage("Product not found", "This product link is missing its identifier.");
    return;
  }

  try {
    const items = await loadProducts();
    const activeProducts = (Array.isArray(items) ? items : []).filter((item) => Boolean(item?.active));
    const match = activeProducts.find((item) => String(item.slug || item.id || "").trim() === slug);
    if (!match) {
      renderMessage("Product not found", "This product may have been removed or is no longer active.");
      return;
    }
    loadedProduct = match;
    messageState = null;
    selectedVariationId = normalizeVariations(match)[0]?.id || "";
    if (pageTitleRoot) {
      pageTitleRoot.textContent = String(match.title || "Products").trim() || "Products";
    }
  } catch (error) {
    console.error("Failed to load product detail", error);
    renderMessage("Product unavailable", "Please try again shortly.");
  }
};

load();
