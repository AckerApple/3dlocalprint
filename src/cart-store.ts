import { validateBadgeName } from "./name-badges.js";
export type CartItem = {
  productId: string;
  variationId?: string;
  quantity: number;
  badgeName?: string;
};

const CART_STORAGE_KEY = "threedlocalprint_cart_v1";

const clampQuantity = (value: unknown) => {
  const next = Math.floor(Number(value) || 0);
  return Math.max(0, Math.min(99, next));
};

export const loadCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => ({
        productId: String(item?.productId || "").trim(),
        variationId: String(item?.variationId || "").trim(),
        quantity: clampQuantity(item?.quantity),
        badgeName: String(item?.badgeName || "").trim(),
      }))
      .filter((item) => item.productId && item.quantity > 0);
  } catch {
    return [];
  }
};

export const saveCart = (items: CartItem[]) => {
  const normalized = (Array.isArray(items) ? items : [])
    .map((item) => ({
      productId: String(item?.productId || "").trim(),
      variationId: String(item?.variationId || "").trim(),
      quantity: clampQuantity(item?.quantity),
        badgeName: String(item?.badgeName || "").trim(),
    }))
    .filter((item) => item.productId && item.quantity > 0);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new CustomEvent("cart:updated"));
};

export const getCartQuantity = () =>
  loadCart().reduce((sum, item) => sum + clampQuantity(item.quantity), 0);

export const getCartItemQuantity = (productId: string, variationId = "", badgeName?: string) => {
  const id = String(productId || "").trim();
  const variant = String(variationId || "").trim();
  if (!id) return 0;
  return loadCart()
    .filter((item) => item.productId === id && String(item.variationId || "") === variant && (badgeName === undefined || String(item.badgeName || "") === badgeName))
    .reduce((sum, item) => sum + clampQuantity(item.quantity), 0);
};

export const addToCart = (productId: string, quantity: number, variationId = "", badgeName = "") => {
  const id = String(productId || "").trim();
  const variant = String(variationId || "").trim();
  if (badgeName) badgeName = validateBadgeName(badgeName);
  const qty = clampQuantity(quantity);
  if (!id || qty <= 0) return;

  const cart = loadCart();
  const index = cart.findIndex((item) => item.productId === id && String(item.variationId || "") === variant && String(item.badgeName || "") === badgeName);
  if (index === -1) {
    cart.push({ productId: id, variationId: variant, badgeName, quantity: qty });
  } else {
    cart[index].quantity = clampQuantity(cart[index].quantity + qty);
  }
  saveCart(cart);
};

export const updateCartItemQuantity = (productId: string, quantity: number, variationId = "", badgeName = "") => {
  const id = String(productId || "").trim();
  const variant = String(variationId || "").trim();
  if (!id) return;
  if (badgeName) badgeName = validateBadgeName(badgeName);
  const qty = clampQuantity(quantity);
  const next = loadCart()
    .map((item) =>
      item.productId === id && String(item.variationId || "") === variant && String(item.badgeName || "") === badgeName
        ? { ...item, quantity: qty }
        : item
    )
    .filter((item) => item.quantity > 0);
  saveCart(next);
};

export const removeFromCart = (productId: string, variationId = "", badgeName = "") => {
  const id = String(productId || "").trim();
  const variant = String(variationId || "").trim();
  if (!id) return;
  const next = loadCart().filter(
    (item) => !(item.productId === id && String(item.variationId || "") === variant && String(item.badgeName || "") === badgeName)
  );
  saveCart(next);
};

export const clearCart = () => saveCart([]);
