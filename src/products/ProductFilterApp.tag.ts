import { tag, div, label, select, option, subscribe } from "taggedjs";
import { PRODUCT_CATEGORIES } from "../product-categories.js";
import { productsUi$, setProductsUi } from "./state.js";

export const ProductFilterApp = tag(() =>
  subscribe(productsUi$, ([ui]) =>
    div.class`home-products-filter-wrap`(
      label.class`home-products-filter-label`(
        "Category",
        select
          .class`manufacturer-input home-products-filter-select`
          .value(_=> ui?.selectedCategory || "")
          .onChange((event) => {
            setProductsUi({
              selectedCategory: String(event.target.value || "").trim().toLowerCase(),
            });
          })(
          option.value``("All categories"),
          PRODUCT_CATEGORIES.map((category) =>
            option.value(category)(category)
          )
        )
      )
    )
  )
);
