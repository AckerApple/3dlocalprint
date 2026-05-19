import { tagElement } from "taggedjs";
import { loadProducts } from "../admin/shared/firebase.js";
import { normalizeProductCategories } from "../product-categories.js";
import { ProductFilterApp } from "./ProductFilterApp.tag.js";
import { ProductGridApp } from "./ProductGridApp.tag.js";
import { getProductsUi, products$, setProductsUi } from "./state.js";

const productsRoot = document.getElementById("homeProductsGrid");
const productsFilterRoot = document.getElementById("homeProductsFilter");

const load = async () => {
  if (!productsRoot) return;
  tagElement(ProductGridApp, productsRoot);
  if (productsFilterRoot) {
    tagElement(ProductFilterApp, productsFilterRoot);
  }

  try {
    const items = await loadProducts();
    setProductsUi({ loadError: "" });
    const normalized = (Array.isArray(items) ? items : [])
      .filter((item) => Boolean(item?.active))
      .map((item) => ({
        ...item,
        categories: normalizeProductCategories(item?.categories),
      }));
    products$.splice(0, products$.length, ...normalized);
  } catch (error) {
    console.error("Failed to load products page data", error);
    setProductsUi({
      ...getProductsUi(),
      loadError: "Products are unavailable right now.",
    });
    products$.splice(0, products$.length);
  }
};

load();
