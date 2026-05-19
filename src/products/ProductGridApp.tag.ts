import { tag, div, a, h2, p, span, subscribe } from "taggedjs";
import type { ProductItem } from "../types/product.js";
import { normalizeProductCategories } from "../product-categories.js";
import { HomeCartActions } from "../home-cart-actions.js";
import { products$, productsUi$, selectedQuantities } from "./state.js";
import {
  getDefaultVariation,
  getDisplayPrice,
  getFilteredProducts,
  getPrimaryImageUrl,
  toSnippet,
} from "./product-utils.js";

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
    _=> HomeCartActions({
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
    })
  );
};

export const ProductGridApp = tag(() =>
  subscribe(productsUi$, ([ui]) =>
    subscribe(products$, (products) => {
      const loadError = ui?.loadError || "";
      if (loadError) {
        return [
          div.class`home-card home-card-muted`(
            h2("No products yet"),
            p(loadError)
          ),
        ];
      }

      const items = getFilteredProducts(products, ui?.selectedCategory || "");
      if (!items.length) {
        return [
          div.class`home-card home-card-muted`(
            h2("No products yet"),
            p("Products are being prepared. Please check back soon.")
          ),
        ];
      }
      return items.map((item) => ProductCard(item));
    })
  )
);
