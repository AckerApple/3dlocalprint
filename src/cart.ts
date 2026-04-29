import { loadProducts } from "./admin/shared/firebase.js";
import type { ProductItem } from "./types/product.js";
import {
  clearCart,
  loadCart,
  removeFromCart,
  updateCartItemQuantity,
  type CartItem,
} from "./cart-store.js";
import {
  tag,
  tagElement,
  section,
  div,
  h2,
  p,
  img,
  input,
  button,
  strong,
  span,
} from "taggedjs";
import { Subject } from "taggedjs/js/subject/Subject.class.js";
import { subscribe } from "taggedjs/js/TagJsTags/subscribe.function.js";

const root = document.getElementById("homeCartRoot");
const cartRender$ = new Subject<number>(0, (subscription) => {
  subscription.next(0);
});
let cartMounted = false;
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);
const localStripeSandboxEngaged = LOCAL_HOSTNAMES.has(window.location.hostname);

type ProductVariationView = {
  id: string;
  label: string;
  unitAmount: number;
  stripePriceId: string;
  active: boolean;
};

type CartViewState = {
  loading: boolean;
  products: ProductItem[];
  statusText: string;
  checkoutLoading: boolean;
};

const cartState: CartViewState = {
  loading: true,
  products: [],
  statusText: localStripeSandboxEngaged
    ? "Local checkout will use Stripe sandbox."
    : "Checkout is not possible while the website is under construction.",
  checkoutLoading: false,
};

const formatPrice = (unitAmount = 0, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "usd").toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((Math.max(0, Number(unitAmount) || 0)) / 100);

const mapProducts = (items: ProductItem[]) =>
  new Map((Array.isArray(items) ? items : []).map((item) => [item.id, item]));

const normalizeVariations = (product: ProductItem): ProductVariationView[] =>
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

const getPrimaryImageUrl = (product: ProductItem) => {
  const images = Array.isArray(product?.images) ? product.images : [];
  const firstImageUrl = String(images[0]?.imageUrl || "").trim();
  if (firstImageUrl) return firstImageUrl;
  return String(product?.imageUrl || "").trim();
};

const getCartViewItems = () => {
  const productsById = mapProducts(cartState.products);
  const cart = loadCart().filter((item) => productsById.has(item.productId));
  return {
    productsById,
    cart,
  };
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
        productId: String(product?.id || item.productId || "").trim(),
        variationId: String(item.variationId || "").trim(),
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
        productId: entry.productId,
        variationId: entry.variationId,
        title: entry.title,
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

const renderCartView = () => {
  if (!root) return;
  if (!cartMounted) {
    root.replaceChildren();
    tagElement(CartApp, root);
    cartMounted = true;
    return;
  }
  cartRender$.next((Number(cartRender$.value) || 0) + 1);
};

const setCheckoutStatus = (statusText: string, checkoutLoading = false) => {
  cartState.statusText = statusText;
  cartState.checkoutLoading = checkoutLoading;
  renderCartView();
};

const handleCheckout = async () => {
  const { cart, productsById } = getCartViewItems();
  setCheckoutStatus("Opening secure checkout...", true);
  try {
    await startCheckout(cart, productsById);
  } catch (error) {
    console.error(error);
    setCheckoutStatus(error instanceof Error ? error.message : "Checkout failed", false);
  }
};

const CartMessage = (title: string, text: string) =>
  div.class`home-card home-card-muted`(
    h2(title),
    p(text)
  );

const StripeSandboxBadge = () =>
  localStripeSandboxEngaged
    ? div.class`stripe-sandbox-badge`("stripe sandbox")
    : null;

const CartConstructionBanner = () =>
  localStripeSandboxEngaged
    ? null
    : section.class`cart-construction-banner`(
        p("This website is under construction. Checkout is not possible at this time.")
      );

const CartLineRow = (item: CartItem, product: ProductItem) => {
  const variation = getVariationForCart(product, item.variationId);
  const title = variation ? `${product.title} (${variation.label})` : product.title;
  const unitAmount = variation?.unitAmount ?? product.unitAmount;
  const primaryImageUrl = getPrimaryImageUrl(product);

  return div.class`home-cart-row`(
    div.class`home-cart-row-preview`(
      primaryImageUrl
        ? img
            .class("home-cart-row-image")
            .src(primaryImageUrl)
            .alt(title)
            .loading("lazy")
        : span.class`home-cart-row-image-fallback`("🛒")
    ),
    div.class`home-cart-row-title`(title),
    div.class`home-cart-field home-cart-row-unit`(
      span.class`home-cart-field-label`("Unit price"),
      span.class`home-cart-field-value`(
        _=> formatPrice(unitAmount, product.currency)
      )
    ),
    div.class`home-cart-field home-cart-row-quantity`(
      span.class`home-cart-field-label`("Quantity"),
      input
        .class`home-cart-qty-input`
        .type`number`
        .min`1`
        .max`99`
        .step`1`
        .value(_=> String(item.quantity))
        .ariaLabel`Quantity for ${title}`
        .onChange((event) => {
          updateCartItemQuantity(product.id, Number(event.target.value) || 1, item.variationId || "");
        })()
    ),
    div.class`home-cart-field home-cart-row-subtotal`(
      span.class`home-cart-field-label`("Line total"),
      span.class`home-cart-field-value`(
        _=> formatPrice(unitAmount * item.quantity, product.currency)
      )
    ),
    button
      .type`button`
      .class`ghost-button delete-button`
      .onClick(() => {
        removeFromCart(product.id, item.variationId || "");
      })(
      "🗑️ Remove"
    )
  );
};

const CartContent = () => {
  const shellItems = [
    StripeSandboxBadge(),
    CartConstructionBanner(),
  ];

  if (cartState.loading) {
    return [
      ...shellItems,
      div.class`home-products-loading`(
        div.class`home-products-spinner`().attr("aria-hidden", "true"),
        p.class`home-products-loading-text`("Loading cart...")
      ),
    ];
  }

  const { cart, productsById } = getCartViewItems();
  if (!cart.length) {
    return [
      ...shellItems,
      CartMessage("Your cart is empty", "Add products to start checkout."),
    ];
  }

  const total = cart.reduce((sum, item) => {
    const product = productsById.get(item.productId);
    if (!product) return sum;
    const variation = getVariationForCart(product, item.variationId || "");
    return sum + (variation?.unitAmount ?? product.unitAmount) * item.quantity;
  }, 0);

  return [
    ...shellItems,
    section.class`home-card home-cart-panel`(
      h2("Cart Items"),
      div.class`home-cart-rows`(
        cart.map((item) => {
          const product = productsById.get(item.productId);
          return product ? CartLineRow(item, product) : null;
        })
      ),
      div.class`home-cart-footer`(
        strong(_=> `Total: ${formatPrice(total, "usd")}`),
        div.class`home-cart-actions`(
          button
            .type`button`
            .class`ghost-button`
            .onClick(() => {
              clearCart();
            })(
            "🗑️ Clear Cart"
          ),
          button
            .type`button`
            .class`add-button`
            .disabled(_=> !localStripeSandboxEngaged || cartState.checkoutLoading)
            .onClick(handleCheckout)(
            _=> cartState.checkoutLoading ? "Opening..." : "Checkout"
          )
        ),
        span.class`home-cart-note`(_=> cartState.statusText)
      )
    ),
  ];
};

export const CartApp = tag(() => subscribe(cartRender$, CartContent));

const loadCartView = async () => {
  if (!root) return;
  renderCartView();

  try {
    cartState.products = await loadProducts();
  } catch (error) {
    console.error("Failed loading products for cart", error);
    cartState.products = [];
  } finally {
    cartState.loading = false;
    renderCartView();
  }
};

window.addEventListener("cart:updated", renderCartView);
loadCartView();
