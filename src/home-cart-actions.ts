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
};

const addedProductIds = new Set<string>();
const actionQuantities = new Map<string, number>();

const getActionKey = (productId: string, variationId = "") => `${productId}::${variationId}`;

export const HomeCartActions = tag(({
  productId,
  getVariationId,
  initialQuantity = 1,
  getQuantityState,
  setQuantityState,
  onChange,
  onBeforeAction = () => null,
}: HomeCartActionsOptions) => {
  let variationId = String(getVariationId?.() || "").trim();
  let actionKey = getActionKey(productId, variationId);
  let isAdded = addedProductIds.has(actionKey);
  let quantityInCart = getCartItemQuantity(productId, variationId);
  let hasCartItems = quantityInCart > 0;

  HomeCartActions.inputs(x => {
    [{onChange, getQuantityState, setQuantityState}] = x

    if(onChange) {
      onChange = tag.output(onChange)
    }
    
    setQuantityState = tag.output(setQuantityState)
    isAdded = addedProductIds.has(actionKey)
    actionKey = getActionKey(productId, variationId)
    variationId = String(getVariationId?.() || "").trim()
    isAdded = addedProductIds.has(actionKey);
    quantityInCart = getCartItemQuantity(productId, variationId);
    hasCartItems = quantityInCart > 0;
  })

  const getActionQuantity = () =>
    getHomeQuantity({
      initialQuantity: actionQuantities.get(actionKey) || initialQuantity,
      getQuantityState,
    });

  const setActionQuantity = (quantity: number) => {
    actionQuantities.set(actionKey, quantity);
    setQuantityState?.(quantity);
  };

  const handleQuantityChange = (quantity: number) => {
    onChange?.(quantity);
  };

  const handleAdd = (event: Event) => {
    const quantity = getActionQuantity();
    addToCart(productId, quantity, variationId);
    addedProductIds.add(actionKey);
    onBeforeAction(event);

    window.setTimeout(tag.callback(() => {
      addedProductIds.delete(actionKey);
    }), 1200)
  };

  return div.class`home-product-actions`(
    _=> HomeQuantityControl({
      initialQuantity,
      getQuantityState: getActionQuantity,
      setQuantityState: setActionQuantity,
      onBeforeAction,
      onChange: handleQuantityChange,
    }),
    button
      .type`button`
      .class(_=> `add-button home-add-cart-btn${isAdded || hasCartItems ? " is-success" : ""}`)
      .onClick(handleAdd)(
      span.class`home-add-cart-text`(_=> {
        const qty = getActionQuantity()
        return isAdded ? "added" : `add ${qty} to cart`
      }),
      hasCartItems
        ? span.class`home-add-cart-count`(_=> `${quantityInCart} in cart`)
        : null
    ),
    _=> hasCartItems
      && button
          .type`button`
          .class`ghost-button home-view-cart-btn`
          .onClick((event) => {
            onBeforeAction?.(event);
            window.location.href = "./cart.html";
          })(
          "View cart"
        )
  )
})
