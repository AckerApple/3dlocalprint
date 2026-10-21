import type { ProductItem } from "./types/product.js";

/** Match the detail page's active catalog lookup; never derive routes from titles or images. */
export function productDetailLink(product?: Pick<ProductItem, "id" | "slug" | "active">): string {
  if (!product?.active) return "";
  const slug = String(product.slug || product.id || "").trim();
  return slug ? `/product/${encodeURIComponent(slug)}` : "";
}
