import { loadProducts } from "./admin/shared/firebase.js";
import type { ProductItem } from "./types/product.js";
import { PRODUCT_CATEGORIES, normalizeProductCategories } from "./product-categories.js";
import { createHomeCartActions } from "./home-cart-actions.js";

const productsRoot = document.getElementById("homeProductsGrid");
const productsFilterRoot = document.getElementById("homeProductsFilter");
let loadedProducts: ProductItem[] = [];
let selectedCategory = "";
const selectedQuantities = new Map<string, number>();

const normalizeVariations = (product: ProductItem) =>
  (Array.isArray(product?.variations) ? product.variations : [])
    .map((variation) => ({
      id: String(variation?.id || "").trim(),
      label: String(variation?.label || "").trim(),
      unitAmount: Math.max(0, Math.round(Number(variation?.unitAmount) || 0)),
      stripePriceId: String(variation?.stripePriceId || "").trim(),
      active: Boolean(variation?.active),
    }))
    .filter((variation) => variation.id && variation.label && variation.active);

const getDisplayPrice = (product: ProductItem) => {
  const variations = normalizeVariations(product);
  if (!variations.length) {
    return formatPrice(product.unitAmount, product.currency);
  }
  if (variations.length === 1) {
    return formatPrice(variations[0].unitAmount, product.currency);
  }
  const min = variations.reduce(
    (acc, variation) => Math.min(acc, variation.unitAmount),
    Number.POSITIVE_INFINITY
  );
  return `From ${formatPrice(min, product.currency)}`;
};

const getDefaultVariation = (product: ProductItem) => normalizeVariations(product)[0] || null;

const formatPrice = (unitAmount = 0, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "usd").toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((Math.max(0, Number(unitAmount) || 0)) / 100);

const toSnippet = (value: string, max = 55) => {
  const flat = String(value || "").replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, max).trimEnd()}...`;
};

const matchesCategory = (product: ProductItem, category: string) => {
  const next = String(category || "").trim().toLowerCase();
  if (!next) return true;
  return normalizeProductCategories(product.categories).includes(next);
};

const buildCard = (product: ProductItem) => {
  const card = document.createElement("article");
  card.className = "home-card home-product-card";
  const slug = String(product.slug || product.id || "").trim();
  const link = document.createElement("a");
  link.className = "home-product-link";
  link.href = `./product/${encodeURIComponent(slug)}`;

  if (product.imageUrl) {
    const media = document.createElement("div");
    media.className = "home-product-media";
    media.style.backgroundImage = `url("${product.imageUrl.replace(/"/g, "%22")}")`;
    link.append(media);
  }

  const title = document.createElement("h2");
  title.textContent = product.title;
  link.append(title);

  const descriptionText = toSnippet(product.description || "", 55);
  if (descriptionText) {
    const description = document.createElement("p");
    description.className = "home-product-snippet";
    description.textContent = descriptionText;
    link.append(description);
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
    link.append(categoriesWrap);
  }

  const price = document.createElement("div");
  price.className = "home-card-tag";
  price.textContent = getDisplayPrice(product);
  link.append(price);

  card.append(link);

  const actions = createHomeCartActions({
    productId: product.id,
    getVariationId: () => getDefaultVariation(product)?.id || "",
    initialQuantity: 1,
    getQuantityState: () => selectedQuantities.get(product.id) || 1,
    setQuantityState: (quantity) => {
      selectedQuantities.set(product.id, quantity);
    },
    onBeforeAction: (event) => {
      event.preventDefault();
      event.stopPropagation();
    },
  });
  card.append(actions);

  return card;
};

const renderEmpty = (message: string) => {
  if (!productsRoot) return;
  productsRoot.innerHTML = "";

  const card = document.createElement("article");
  card.className = "home-card home-card-muted";
  const title = document.createElement("h2");
  title.textContent = "No products yet";
  const body = document.createElement("p");
  body.textContent = message;
  card.append(title, body);
  productsRoot.append(card);
};

const renderProducts = (items: ProductItem[]) => {
  if (!productsRoot) return;
  productsRoot.innerHTML = "";

  if (!items.length) {
    renderEmpty("Products are being prepared. Please check back soon.");
    return;
  }

  items.forEach((item) => {
    productsRoot.append(buildCard(item));
  });
};

const renderFilteredProducts = () => {
  const filtered = loadedProducts
    .filter((item) => matchesCategory(item, selectedCategory))
    .sort((a, b) => String(a.title || "").localeCompare(String(b.title || "")));
  renderProducts(filtered);
};

const renderFilter = () => {
  if (!productsFilterRoot) return;
  productsFilterRoot.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.className = "home-products-filter-wrap";

  const label = document.createElement("label");
  label.className = "home-products-filter-label";
  label.textContent = "Category";

  const select = document.createElement("select");
  select.className = "manufacturer-input home-products-filter-select";

  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = "All categories";
  select.append(allOption);

  PRODUCT_CATEGORIES.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.append(option);
  });

  select.value = selectedCategory;
  select.addEventListener("change", () => {
    selectedCategory = String(select.value || "").trim().toLowerCase();
    renderFilteredProducts();
  });

  label.append(select);
  wrap.append(label);
  productsFilterRoot.append(wrap);
};

const load = async () => {
  if (!productsRoot) return;
  try {
    const items = await loadProducts();
    loadedProducts = (Array.isArray(items) ? items : [])
      .filter((item) => Boolean(item?.active))
      .map((item) => ({
        ...item,
        categories: normalizeProductCategories(item?.categories),
      }));
    renderFilter();
    renderFilteredProducts();
  } catch (error) {
    console.error("Failed to load products page data", error);
    renderEmpty("Products are unavailable right now.");
  }
};

load();
