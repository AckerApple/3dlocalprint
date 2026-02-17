export const getFilamentBasePath = (pathname = window.location.pathname) => {
  const marker = "/filament/";
  const markerIndex = pathname.indexOf(marker);
  if (markerIndex === -1) return "./";
  return pathname.slice(0, markerIndex + marker.length);
};

export const toFilamentPath = (path = "", pathname = window.location.pathname) => {
  const normalized = (path || "")
    .replace(/^\/+/, "")
    .replace(/^(\.\/)+/, "");
  const basePath = getFilamentBasePath(pathname);
  if (basePath === "./") return `./${normalized}`;
  return `${basePath}${normalized}`;
};
