import { loadProducts } from "./admin/shared/firebase.js";
import type { ProductItem } from "./types/product.js";
import { normalizeProductCategories } from "./product-categories.js";
import { createHomeCartActions } from "./home-cart-actions.js";

const detailRoot = document.getElementById("homeProductDetail");
const pageTitleRoot = document.getElementById("homeProductPageTitle");

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

const renderMessage = (title: string, message: string) => {
  if (!detailRoot) return;
  if (pageTitleRoot) {
    pageTitleRoot.textContent = "Products";
  }
  detailRoot.innerHTML = "";
  const card = document.createElement("article");
  card.className = "home-card home-card-muted";
  const h2 = document.createElement("h2");
  h2.textContent = title;
  const p = document.createElement("p");
  p.textContent = message;
  card.append(h2, p);
  detailRoot.append(card);
};

const renderProduct = (product: ProductItem) => {
  if (!detailRoot) return;
  if (pageTitleRoot) {
    pageTitleRoot.textContent = String(product.title || "Products").trim() || "Products";
  }
  detailRoot.innerHTML = "";

  const card = document.createElement("article");
  card.className = "home-card home-product-detail-card";

  if (product.imageUrl) {
    const media = document.createElement("div");
    media.className = "home-product-detail-media";
    media.style.backgroundImage = `url("${product.imageUrl.replace(/"/g, "%22")}")`;
    card.append(media);
  }

  const descriptionText = String(product.description || "").trim();
  if (descriptionText) {
    const description = document.createElement("p");
    description.className = "home-product-description";
    description.textContent = descriptionText;
    card.append(description);
  }

  const categories = normalizeProductCategories(product.categories);
  if (categories.length) {
    const categoriesWrap = document.createElement("div");
    categoriesWrap.className = "home-product-categories";
    categories.forEach((category) => {
      const chip = document.createElement("span");
      chip.className = "home-product-category-chip";
      chip.textContent = category;
      categoriesWrap.append(chip);
    });
    card.append(categoriesWrap);
  }

  const price = document.createElement("div");
  price.className = "home-card-tag";
  const variations = normalizeVariations(product);
  const defaultVariation = variations[0] || null;
  price.textContent = formatPrice(defaultVariation?.unitAmount ?? product.unitAmount, product.currency);
  card.append(price);

  const row = document.createElement("div");
  row.className = "home-product-detail-actions";

  let selectedVariationId = defaultVariation?.id || "";
  if (variations.length) {
    const variationLabel = document.createElement("label");
    variationLabel.className = "home-products-filter-label";
    variationLabel.textContent = "OPTIONS";

    const variationSelect = document.createElement("select");
    variationSelect.className = "manufacturer-input home-products-filter-select";
    variations.forEach((variation) => {
      const item = document.createElement("option");
      item.value = variation.id;
      item.textContent = `${variation.label} - ${formatPrice(variation.unitAmount, product.currency)}`;
      variationSelect.append(item);
    });
    variationSelect.value = selectedVariationId;
    variationSelect.addEventListener("change", () => {
      selectedVariationId = String(variationSelect.value || "").trim();
      const next = variations.find((variation) => variation.id === selectedVariationId) || defaultVariation;
      price.textContent = formatPrice(next?.unitAmount ?? product.unitAmount, product.currency);
    });
    variationLabel.append(variationSelect);
    row.append(variationLabel);
  }

  const cartActions = createHomeCartActions({
    productId: product.id,
    getVariationId: () => selectedVariationId,
    initialQuantity: 1,
  });
  cartActions.classList.add("home-product-detail-cart-actions");
  row.append(cartActions);

  const backLink = document.createElement("a");
  backLink.className = "ghost-button";
  backLink.href = "../products.html";
  backLink.textContent = "Back to Products";
  row.append(backLink);
  card.append(row);

  detailRoot.append(card);
};

const load = async () => {
  if (!detailRoot) return;
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
    renderProduct(match);
  } catch (error) {
    console.error("Failed to load product detail", error);
    renderMessage("Product unavailable", "Please try again shortly.");
  }
};

load();
