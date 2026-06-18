const getProjectId = () =>
  String(import.meta.env.VITE_FIREBASE_PROJECT_ID || "threedlocalprint").trim();

const getCloudFunctionUrl = (functionName: string) =>
  `https://us-central1-${getProjectId()}.cloudfunctions.net/${functionName}`;

export const fetchApiWithFallback = async (
  relativeUrl: string,
  functionName: string,
  init?: RequestInit,
) => {
  const response = await fetch(relativeUrl, init).catch(() => null);
  const contentType = response?.headers.get("content-type") || "";
  const isLocalHost = ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
  const method = String(init?.method || "GET").toUpperCase();
  const shouldFallbackFromLocalProxy = isLocalHost && method === "GET" && response && response.status >= 500;
  if (response && response.status !== 404 && !contentType.includes("text/html") && !shouldFallbackFromLocalProxy) {
    return response;
  }

  const directUrl = new URL(getCloudFunctionUrl(functionName));
  const relative = new URL(relativeUrl, window.location.origin);
  directUrl.search = relative.search;
  return fetch(directUrl.toString(), init);
};
