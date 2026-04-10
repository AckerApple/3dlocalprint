import { getCartQuantity } from "./cart-store.js";

const updateCartLinks = () => {
  const count = getCartQuantity();
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>("[data-cart-link='true']"),
  );
  links.forEach((link) => {
    link.textContent = count > 0 ? `🛒 Cart (${count})` : "🛒 Cart";
  });
};

updateCartLinks();
window.addEventListener("cart:updated", updateCartLinks);
window.addEventListener("storage", updateCartLinks);
