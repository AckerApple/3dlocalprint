import { array } from "taggedjs";
import type { ProductItem } from "../types/product.js";

export type ProductsUiState = {
  loadError: string;
  selectedCategory: string;
};

export const products$ = array<ProductItem>([]);
export const productsUi$ = array<ProductsUiState>([
  { loadError: "", selectedCategory: "" },
]);
export const selectedQuantities = new Map<string, number>();

export const getProductsUi = () =>
  productsUi$[0] || { loadError: "", selectedCategory: "" };

export const setProductsUi = (patch: Partial<ProductsUiState>) => {
  productsUi$[0] = {
    ...getProductsUi(),
    ...patch,
  };
};

export const refreshProductsUi = () => {
  productsUi$[0] = { ...getProductsUi() };
};
