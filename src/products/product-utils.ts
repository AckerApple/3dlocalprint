import type { ProductItem } from "../types/product.js";
import { normalizeProductCategories } from "../product-categories.js";

export type ProductVariationView = {
  id: string;
  label: string;
  unitAmount: number;
  stripePriceId: string;
  active: boolean;
};

export const normalizeVariations = (product: ProductItem): ProductVariationView[] =>
  (Array.isArray(product?.variations) ? product.variations : [])
    .map((variation) => ({
      id: String(variation?.id || "").trim(),
      label: String(variation?.label || "").trim(),
      unitAmount: Math.max(0, Math.round(Number(variation?.unitAmount) || 0)),
      stripePriceId: String(variation?.stripePriceId || "").trim(),
      active: Boolean(variation?.active),
    }))
    .filter((variation) => variation.id && variation.label && variation.active);

export const formatPrice = (unitAmount = 0, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "usd").toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((Math.max(0, Number(unitAmount) || 0)) / 100);

export const getDisplayPrice = (product: ProductItem) => {
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

export const getDefaultVariation = (product: ProductItem) =>
  normalizeVariations(product)[0] || null;

export const toSnippet = (value: string, max = 55) => {
  const flat = String(value || "").replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, max).trimEnd()}...`;
};

export const matchesCategory = (product: ProductItem, category: string) => {
  const next = String(category || "").trim().toLowerCase();
  if (!next) return true;
  return normalizeProductCategories(product.categories).includes(next);
};

export const getPrimaryImageUrl = (product: ProductItem) => {
  const images = Array.isArray(product?.images) ? product.images : [];
  const firstImageUrl = String(images[0]?.imageUrl || "").trim();
  if (firstImageUrl) return firstImageUrl;
  return String(product?.imageUrl || "").trim();
};

export const getFilteredProducts = (items: ProductItem[], selectedCategory = "") =>
  items
    .filter((item) => matchesCategory(item, selectedCategory))
    .sort((a, b) => String(a.title || "").localeCompare(String(b.title || "")));
