import { addToCart } from "./cart-store.js";
import { createHomeQuantityControl } from "./home-quantity-control.js";

type HomeCartActionsOptions = {
  productId: string;
  getVariationId?: () => string;
  initialQuantity?: number;
  getQuantityState?: () => number;
  setQuantityState?: (quantity: number) => void;
  onBeforeAction?: (event: Event) => void;
};

export const createHomeCartActions = ({
  productId,
  getVariationId,
  initialQuantity = 1,
  getQuantityState,
  setQuantityState,
  onBeforeAction,
}: HomeCartActionsOptions) => {
  const actions = document.createElement("div");
  actions.className = "home-product-actions";

  const quantityControl = createHomeQuantityControl({
    initialQuantity,
    getQuantityState,
    setQuantityState,
    onBeforeAction,
  });

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "add-button home-add-cart-btn";
  addButton.textContent = "Add to cart";

  const checkoutButton = document.createElement("button");
  checkoutButton.type = "button";
  checkoutButton.className = "ghost-button home-checkout-btn";
  checkoutButton.textContent = "Checkout";
  checkoutButton.style.display = "none";
  checkoutButton.addEventListener("click", (event) => {
    onBeforeAction?.(event);
    window.location.href = "./cart.html";
  });

  addButton.addEventListener("click", (event) => {
    onBeforeAction?.(event);
    const quantity = quantityControl.getQuantity();
    addToCart(productId, quantity, String(getVariationId?.() || "").trim());
    checkoutButton.style.display = "inline-flex";
    addButton.classList.add("is-success");
    addButton.textContent = "👍 Added";
    window.setTimeout(() => {
      addButton.classList.remove("is-success");
      addButton.textContent = "Add to cart";
    }, 1200);
  });

  actions.append(quantityControl.element, addButton, checkoutButton);
  return actions;
};
