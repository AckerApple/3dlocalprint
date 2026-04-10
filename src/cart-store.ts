export type CartItem = {
  productId: string;
  quantity: number;
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
        quantity: clampQuantity(item?.quantity),
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
      quantity: clampQuantity(item?.quantity),
    }))
    .filter((item) => item.productId && item.quantity > 0);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new CustomEvent("cart:updated"));
};

export const getCartQuantity = () =>
  loadCart().reduce((sum, item) => sum + clampQuantity(item.quantity), 0);

export const addToCart = (productId: string, quantity: number) => {
  const id = String(productId || "").trim();
  const qty = clampQuantity(quantity);
  if (!id || qty <= 0) return;

  const cart = loadCart();
  const index = cart.findIndex((item) => item.productId === id);
  if (index === -1) {
    cart.push({ productId: id, quantity: qty });
  } else {
    cart[index].quantity = clampQuantity(cart[index].quantity + qty);
  }
  saveCart(cart);
};

export const updateCartItemQuantity = (productId: string, quantity: number) => {
  const id = String(productId || "").trim();
  if (!id) return;
  const qty = clampQuantity(quantity);
  const next = loadCart()
    .map((item) => (item.productId === id ? { ...item, quantity: qty } : item))
    .filter((item) => item.quantity > 0);
  saveCart(next);
};

export const removeFromCart = (productId: string) => {
  const id = String(productId || "").trim();
  if (!id) return;
  const next = loadCart().filter((item) => item.productId !== id);
  saveCart(next);
};

export const clearCart = () => saveCart([]);
