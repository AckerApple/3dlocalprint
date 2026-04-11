const decodeSlug = (value = "") => {
  try {
    return decodeURIComponent(value).trim();
  } catch {
    return String(value || "").trim();
  }
};

const routeProductDeepLink = () => {
  const path = String(window.location.pathname || "");
  const match = path.match(/^(.*)\/product\/([^/?#]+)\/?$/i);
  if (!match?.[2]) return;

  const basePath = String(match[1] || "");
  const slug = decodeSlug(match[2]);
  if (!slug) return;

  const target = `${basePath}/product.html?slug=${encodeURIComponent(slug)}`;
  window.location.replace(target);
};

routeProductDeepLink();
