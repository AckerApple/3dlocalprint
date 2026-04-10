import { loadProducts } from "./filament/firebase.js";
import type { ProductItem } from "./types/product.js";
import { addToCart, getCartQuantity } from "./cart-store.js";

const detailRoot = document.getElementById("homeProductDetail");

const formatPrice = (unitAmount = 0, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "usd").toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((Math.max(0, Number(unitAmount) || 0)) / 100);

const getSlug = () => {
  const params = new URLSearchParams(window.location.search);
  return String(params.get("slug") || "").trim();
};

const renderMessage = (title: string, message: string) => {
  if (!detailRoot) return;
  detailRoot.innerHTML = "";
  const card = document.createElement("article");
  card.className = "home-card home-card-muted";
  const h2 = document.createElement("h2");
  h2.textContent = title;
  const p = document.createElement("p");
  p.textContent = message;
  card.append(h2, p);
  detailRoot.append(card);
};

const renderProduct = (product: ProductItem) => {
  if (!detailRoot) return;
  detailRoot.innerHTML = "";

  const card = document.createElement("article");
  card.className = "home-card home-product-detail-card";

  if (product.imageUrl) {
    const media = document.createElement("div");
    media.className = "home-product-detail-media";
    media.style.backgroundImage = `url("${product.imageUrl.replace(/"/g, "%22")}")`;
    card.append(media);
  }

  const title = document.createElement("h2");
  title.textContent = product.title;
  card.append(title);

  const description = document.createElement("p");
  description.className = "home-product-description";
  description.textContent = product.description || "No description yet.";
  card.append(description);

  const price = document.createElement("div");
  price.className = "home-card-tag";
  price.textContent = formatPrice(product.unitAmount, product.currency);
  card.append(price);

  const row = document.createElement("div");
  row.className = "home-product-detail-actions";
  const qtyInput = document.createElement("input");
  qtyInput.className = "home-cart-qty-input";
  qtyInput.type = "number";
  qtyInput.min = "1";
  qtyInput.max = "99";
  qtyInput.step = "1";
  qtyInput.value = "1";

  const addButton = document.createElement("button");
  addButton.className = "add-button";
  addButton.type = "button";
  addButton.textContent = "Add to Cart";

  const cartNote = document.createElement("span");
  cartNote.className = "home-cart-note";
  cartNote.textContent = `Cart: ${getCartQuantity()} item(s)`;

  addButton.addEventListener("click", () => {
    const quantity = Math.max(1, Math.min(99, Math.floor(Number(qtyInput.value) || 1)));
    addToCart(product.id, quantity);
    cartNote.textContent = `Added. Cart: ${getCartQuantity()} item(s)`;
  });

  row.append(qtyInput, addButton, cartNote);

  const backLink = document.createElement("a");
  backLink.className = "ghost-button";
  backLink.href = "./products.html";
  backLink.textContent = "Back to Products";
  row.append(backLink);
  card.append(row);

  detailRoot.append(card);
};

const load = async () => {
  if (!detailRoot) return;
  const slug = getSlug();
  if (!slug) {
    renderMessage("Product not found", "This product link is missing its identifier.");
    return;
  }

  try {
    const items = await loadProducts();
    const activeProducts = (Array.isArray(items) ? items : []).filter((item) => Boolean(item?.active));
    const match = activeProducts.find((item) => String(item.slug || item.id || "").trim() === slug);
    if (!match) {
      renderMessage("Product not found", "This product may have been removed or is no longer active.");
      return;
    }
    renderProduct(match);
  } catch (error) {
    console.error("Failed to load product detail", error);
    renderMessage("Product unavailable", "Please try again shortly.");
  }
};

load();
