import { loadProducts } from "./admin/shared/firebase.js";
import type { ProductItem } from "./types/product.js";
import {
  clearCart,
  loadCart,
  removeFromCart,
  updateCartItemQuantity,
  type CartItem,
} from "./cart-store.js";

const root = document.getElementById("homeCartRoot");

const formatPrice = (unitAmount = 0, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "usd").toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((Math.max(0, Number(unitAmount) || 0)) / 100);

const mapProducts = (items: ProductItem[]) =>
  new Map((Array.isArray(items) ? items : []).map((item) => [item.id, item]));

const normalizeVariations = (product: ProductItem) =>
  (Array.isArray(product?.variations) ? product.variations : [])
    .map((variation) => ({
      id: String(variation?.id || "").trim(),
      label: String(variation?.label || "").trim(),
      unitAmount: Math.max(0, Math.round(Number(variation?.unitAmount) || 0)),
      stripePriceId: String(variation?.stripePriceId || "").trim(),
      active: Boolean(variation?.active),
    }))
    .filter((variation) => variation.id && variation.label && variation.active);

const getVariationForCart = (product: ProductItem, variationId = "") => {
  const variations = normalizeVariations(product);
  const normalizedId = String(variationId || "").trim();
  if (normalizedId) {
    const matched = variations.find((variation) => variation.id === normalizedId);
    if (matched) return matched;
  }
  if (variations.length) return variations[0];
  return null;
};

const createMessageCard = (title: string, text: string) => {
  const card = document.createElement("article");
  card.className = "home-card home-card-muted";
  const h2 = document.createElement("h2");
  h2.textContent = title;
  const p = document.createElement("p");
  p.textContent = text;
  card.append(h2, p);
  return card;
};

const createLineRow = (
  item: CartItem,
  product: ProductItem,
) => {
  const row = document.createElement("div");
  row.className = "home-cart-row";

  const title = document.createElement("div");
  title.className = "home-cart-row-title";
  const variation = getVariationForCart(product, item.variationId);
  title.textContent = variation ? `${product.title} (${variation.label})` : product.title;

  const unit = document.createElement("div");
  unit.className = "home-cart-row-unit";
  unit.textContent = formatPrice(variation?.unitAmount ?? product.unitAmount, product.currency);

  const qty = document.createElement("input");
  qty.className = "home-cart-qty-input";
  qty.type = "number";
  qty.min = "1";
  qty.max = "99";
  qty.step = "1";
  qty.value = String(item.quantity);
  qty.addEventListener("change", async () => {
    updateCartItemQuantity(product.id, Number(qty.value) || 1, item.variationId || "");
  });

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "ghost-button delete-button";
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", async () => {
    removeFromCart(product.id, item.variationId || "");
  });

  const subtotal = document.createElement("div");
  subtotal.className = "home-cart-row-subtotal";
  subtotal.textContent = formatPrice(
    (variation?.unitAmount ?? product.unitAmount) * item.quantity,
    product.currency
  );

  row.append(title, unit, qty, subtotal, removeBtn);
  return row;
};

const startCheckout = async (cart: CartItem[], productsById: Map<string, ProductItem>) => {
  const lineItems = cart
    .map((item) => ({
      item,
      product: productsById.get(item.productId),
    }))
    .filter((entry) => Boolean(entry.product))
    .map(({ item, product }) => {
      const variation = product ? getVariationForCart(product, item.variationId || "") : null;
      return {
        priceId: String(variation?.stripePriceId || product?.stripePriceId || "").trim(),
        quantity: item.quantity,
        title: variation
          ? `${String(product?.title || "Product")} (${variation.label})`
          : String(product?.title || "Product"),
      };
    });

  const missing = lineItems.filter((entry) => !entry.priceId);
  if (missing.length) {
    const names = missing.map((entry) => entry.title).join(", ");
    throw new Error(`Missing Stripe price ID for: ${names}`);
  }

  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Idempotency-Key": `cart_${Date.now().toString(36)}`,
    },
    body: JSON.stringify({
      cartItems: lineItems.map((entry) => ({
        priceId: entry.priceId,
        quantity: entry.quantity,
      })),
      successUrl: `${window.location.origin}/products.html?checkout=success`,
      cancelUrl: `${window.location.origin}/cart.html`,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Checkout failed");
  }

  const payload = await response.json();
  if (payload?.url) {
    window.location.href = payload.url;
    return;
  }

  throw new Error("Checkout URL missing in response");
};

const renderCart = async () => {
  if (!root) return;
  root.innerHTML = "";

  let products: ProductItem[] = [];
  try {
    products = await loadProducts();
  } catch (error) {
    console.error("Failed loading products for cart", error);
  }

  const productsById = mapProducts(products);
  const cart = loadCart().filter((item) => productsById.has(item.productId));

  if (!cart.length) {
    root.append(createMessageCard("Your cart is empty", "Add products to start checkout."));
    return;
  }

  const panel = document.createElement("section");
  panel.className = "home-card home-cart-panel";
  const title = document.createElement("h2");
  title.textContent = "Cart Items";
  panel.append(title);

  const rows = document.createElement("div");
  rows.className = "home-cart-rows";
  cart.forEach((item) => {
    const product = productsById.get(item.productId);
    if (!product) return;
    rows.append(createLineRow(item, product));
  });
  panel.append(rows);

  const total = cart.reduce((sum, item) => {
    const product = productsById.get(item.productId);
    if (!product) return sum;
    const variation = getVariationForCart(product, item.variationId || "");
    return sum + (variation?.unitAmount ?? product.unitAmount) * item.quantity;
  }, 0);

  const footer = document.createElement("div");
  footer.className = "home-cart-footer";

  const totalLabel = document.createElement("strong");
  totalLabel.textContent = `Total: ${formatPrice(total, "usd")}`;

  const actions = document.createElement("div");
  actions.className = "home-cart-actions";

  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.className = "ghost-button";
  clearBtn.textContent = "Clear Cart";
  clearBtn.addEventListener("click", () => {
    clearCart();
  });

  const checkoutBtn = document.createElement("button");
  checkoutBtn.type = "button";
  checkoutBtn.className = "add-button";
  checkoutBtn.textContent = "Checkout";

  const status = document.createElement("span");
  status.className = "home-cart-note";

  checkoutBtn.addEventListener("click", async () => {
    checkoutBtn.disabled = true;
    status.textContent = "Opening secure checkout...";
    try {
      await startCheckout(cart, productsById);
    } catch (error) {
      console.error(error);
      status.textContent = error instanceof Error ? error.message : "Checkout failed";
      checkoutBtn.disabled = false;
    }
  });

  actions.append(clearBtn, checkoutBtn);
  footer.append(totalLabel, actions, status);
  panel.append(footer);

  root.append(panel);
};

renderCart();
window.addEventListener("cart:updated", () => {
  renderCart().catch((error) => console.error(error));
});
