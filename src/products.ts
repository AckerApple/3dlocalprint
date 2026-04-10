import { loadProducts } from "./filament/firebase.js";
import type { ProductItem } from "./types/product.js";

const productsRoot = document.getElementById("homeProductsGrid");

const formatPrice = (unitAmount = 0, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "usd").toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((Math.max(0, Number(unitAmount) || 0)) / 100);

const toSnippet = (value: string, max = 55) => {
  const flat = String(value || "").replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, max).trimEnd()}...`;
};

const buildCard = (product: ProductItem) => {
  const slug = String(product.slug || product.id || "").trim();
  const link = document.createElement("a");
  link.className = "home-product-link";
  link.href = `./product.html?slug=${encodeURIComponent(slug)}`;

  const card = document.createElement("article");
  card.className = "home-card home-product-card";

  if (product.imageUrl) {
    const media = document.createElement("div");
    media.className = "home-product-media";
    media.style.backgroundImage = `url("${product.imageUrl.replace(/"/g, "%22")}")`;
    card.append(media);
  }

  const title = document.createElement("h2");
  title.textContent = product.title;
  card.append(title);

  const description = document.createElement("p");
  description.className = "home-product-snippet";
  description.textContent = toSnippet(product.description || "No description yet.", 55);
  card.append(description);

  const price = document.createElement("div");
  price.className = "home-card-tag";
  price.textContent = formatPrice(product.unitAmount, product.currency);
  card.append(price);

  link.append(card);
  return link;
};

const renderEmpty = (message: string) => {
  if (!productsRoot) return;
  productsRoot.innerHTML = "";

  const card = document.createElement("article");
  card.className = "home-card home-card-muted";
  const title = document.createElement("h2");
  title.textContent = "No products yet";
  const body = document.createElement("p");
  body.textContent = message;
  card.append(title, body);
  productsRoot.append(card);
};

const renderProducts = (items: ProductItem[]) => {
  if (!productsRoot) return;
  productsRoot.innerHTML = "";

  if (!items.length) {
    renderEmpty("Products are being prepared. Please check back soon.");
    return;
  }

  items.forEach((item) => {
    productsRoot.append(buildCard(item));
  });
};

const load = async () => {
  if (!productsRoot) return;
  try {
    const items = await loadProducts();
    const activeProducts = (Array.isArray(items) ? items : [])
      .filter((item) => Boolean(item?.active))
      .sort((a, b) => String(a.title || "").localeCompare(String(b.title || "")));
    renderProducts(activeProducts);
  } catch (error) {
    console.error("Failed to load products page data", error);
    renderEmpty("Products are unavailable right now.");
  }
};

load();
