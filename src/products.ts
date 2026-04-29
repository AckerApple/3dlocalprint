import { loadProducts } from "./admin/shared/firebase.js";
import type { ProductItem } from "./types/product.js";
import { PRODUCT_CATEGORIES, normalizeProductCategories } from "./product-categories.js";
import { HomeCartActions } from "./home-cart-actions.js";
import {
  tag,
  tagElement,
  div,
  a,
  h2,
  p,
  span,
  label,
  select,
  option,
} from "taggedjs";

const productsRoot = document.getElementById("homeProductsGrid");
const productsFilterRoot = document.getElementById("homeProductsFilter");
let loadedProducts: ProductItem[] = [];
let selectedCategory = "";
const selectedQuantities = new Map<string, number>();

type ProductVariationView = {
  id: string;
  label: string;
  unitAmount: number;
  stripePriceId: string;
  active: boolean;
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

const formatPrice = (unitAmount = 0, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "usd").toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((Math.max(0, Number(unitAmount) || 0)) / 100);

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

const getPrimaryImageUrl = (product: ProductItem) => {
  const images = Array.isArray(product?.images) ? product.images : [];
  const firstImageUrl = String(images[0]?.imageUrl || "").trim();
  if (firstImageUrl) return firstImageUrl;
  return String(product?.imageUrl || "").trim();
};

const getFilteredProducts = () =>
  loadedProducts
    .filter((item) => matchesCategory(item, selectedCategory))
    .sort((a, b) => String(a.title || "").localeCompare(String(b.title || "")));

const renderProducts = () => {
  if (!productsRoot) return;
  productsRoot.replaceChildren();
  tagElement(ProductGridApp, productsRoot);
};

const renderFilter = () => {
  if (!productsFilterRoot) return;
  productsFilterRoot.replaceChildren();
  tagElement(ProductFilterApp, productsFilterRoot);
};

const ProductCard = (product: ProductItem) => {
  const slug = String(product.slug || product.id || "").trim();
  const primaryImageUrl = getPrimaryImageUrl(product);
  const descriptionText = toSnippet(product.description || "", 55);
  const categories = normalizeProductCategories(product.categories);

  return div.class`home-card home-product-card`(
    a.class`home-product-link`.href(`./product/${encodeURIComponent(slug)}`)(
      primaryImageUrl
        ? div
            .class`home-product-media`
            .style(`background-image: url("${primaryImageUrl.replace(/"/g, "%22")}")`)()
        : null,
      h2(product.title),
      descriptionText
        ? p.class`home-product-snippet`(descriptionText)
        : null,
      categories.length
        ? div.class`home-product-categories`(
            categories.map((category) =>
              span.class`home-product-category-chip`(category)
            )
          )
        : null,
      div.class`home-card-tag`(_=> getDisplayPrice(product))
    ),
    HomeCartActions({
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
      requestRender: renderProducts,
    })
  );
};

const ProductGridApp = tag(() => {
  const items = getFilteredProducts();
  if (!items.length) {
    return [
      div.class`home-card home-card-muted`(
        h2("No products yet"),
        p("Products are being prepared. Please check back soon.")
      ),
    ];
  }
  return items.map((item) => ProductCard(item));
});

const ProductFilterApp = tag(() =>
  div.class`home-products-filter-wrap`(
    label.class`home-products-filter-label`(
      "Category",
      select
        .class`manufacturer-input home-products-filter-select`
        .value(_=> selectedCategory)
        .onChange((event) => {
          selectedCategory = String(event.target.value || "").trim().toLowerCase();
          renderProducts();
        })(
        option.value``("All categories"),
        PRODUCT_CATEGORIES.map((category) =>
          option.value(category)(category)
        )
      )
    )
  )
);

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
    renderProducts();
  } catch (error) {
    console.error("Failed to load products page data", error);
    loadedProducts = [];
    renderFilter();
    if (!productsRoot) return;
    productsRoot.replaceChildren();
    tagElement(
      tag(() => div.class`home-card home-card-muted`(
        h2("No products yet"),
        p("Products are unavailable right now.")
      )),
      productsRoot
    );
  }
};

load();
