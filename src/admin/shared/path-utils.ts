export const getAdminBasePath = (pathname = window.location.pathname) => {
  const marker = "/admin/";
  const markerIndex = pathname.indexOf(marker);
  if (markerIndex === -1) return "/admin/";
  return pathname.slice(0, markerIndex + marker.length);
};

export const toAdminPath = (path = "", pathname = window.location.pathname) => {
  const normalized = (path || "")
    .replace(/^\/+/, "")
    .replace(/^(\.\/)+/, "")
    .replace(/^admin\//, "");
  const basePath = getAdminBasePath(pathname);
  return `${basePath}${normalized}`;
};

// Temporary alias to keep existing imports stable while migrating names.
export const toFilamentPath = toAdminPath;
