const decodeSlug = (value = "") => {
  try {
    return decodeURIComponent(value).trim();
  } catch {
    return String(value || "").trim();
  }
};

const routeProductDeepLink = () => {
  const path = String(window.location.pathname || "");
  const match = path.match(/^\/product\/([^/?#]+)\/?$/i);
  if (!match?.[1]) return;

  const slug = decodeSlug(match[1]);
  if (!slug) return;

  const target = new URL("/product.html", window.location.origin);
  target.search = window.location.search;
  target.searchParams.set("slug", slug);
  target.hash = window.location.hash;
  window.location.replace(`${target.pathname}${target.search}${target.hash}`);
};

routeProductDeepLink();
