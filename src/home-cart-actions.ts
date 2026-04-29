import { tag, div, button, span } from "taggedjs";
import { addToCart, getCartItemQuantity } from "./cart-store.js";
import {
  HomeQuantityControl,
  getHomeQuantity,
  type HomeQuantityControlOptions,
} from "./home-quantity-control.js";

type HomeCartActionsOptions = HomeQuantityControlOptions & {
  productId: string;
  getVariationId?: () => string;
  requestRender?: () => void;
};

const addedProductIds = new Set<string>();

const getActionKey = (productId: string, variationId = "") => `${productId}::${variationId}`;

export const HomeCartActions = tag(({
  productId,
  getVariationId,
  initialQuantity = 1,
  getQuantityState,
  setQuantityState,
  onBeforeAction = () => null,
  requestRender,
}: HomeCartActionsOptions) => {
  const variationId = String(getVariationId?.() || "").trim();
  const actionKey = getActionKey(productId, variationId);
  const isAdded = addedProductIds.has(actionKey);
  const quantityInCart = getCartItemQuantity(productId, variationId);

  const handleAdd = (event: Event) => {
    const quantity = getHomeQuantity({ initialQuantity, getQuantityState });
    addToCart(productId, quantity, variationId);
    addedProductIds.add(actionKey);
    onBeforeAction(event);
    requestRender?.();

    window.setTimeout(tag.callback(() => {
      addedProductIds.delete(actionKey);
      requestRender?.();
    }), 1200)
  };

  return div.class`home-product-actions`(
    _=> HomeQuantityControl({
      initialQuantity,
      getQuantityState,
      setQuantityState,
      onBeforeAction,
    }),
    button
      .type`button`
      .class(_=> `add-button home-add-cart-btn${isAdded ? " is-success" : ""}`)
      .onClick(handleAdd)(
      span.class`home-add-cart-text`(_=> isAdded ? "added" : "add to cart"),
      quantityInCart > 0
        ? span.class`home-add-cart-count`(_=> `${quantityInCart} in cart`)
        : null
    ),
    isAdded
      ? button
          .type`button`
          .class`ghost-button home-checkout-btn`
          .onClick((event) => {
            onBeforeAction?.(event);
            window.location.href = "./cart.html";
          })(
          "Checkout"
        )
      : null
  );
});
