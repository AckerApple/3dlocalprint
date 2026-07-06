const getProjectId = () =>
  String(import.meta.env.VITE_FIREBASE_PROJECT_ID || "threedlocalprint").trim();

const getCloudFunctionUrl = (functionName: string) =>
  `https://us-central1-${getProjectId()}.cloudfunctions.net/${functionName}`;

const fetchCloudFunction = (
  relativeUrl: string,
  functionName: string,
  init?: RequestInit,
) => {
  const directUrl = new URL(getCloudFunctionUrl(functionName));
  const relative = new URL(relativeUrl, window.location.origin);
  directUrl.search = relative.search;
  return fetch(directUrl.toString(), init);
};

export const fetchApiWithFallback = async (
  relativeUrl: string,
  functionName: string,
  init?: RequestInit,
) => {
  const isLiveStaticHost = ["3dlocalprint.com", "www.3dlocalprint.com"].includes(window.location.hostname);
  if (isLiveStaticHost) {
    return fetchCloudFunction(relativeUrl, functionName, init);
  }

  const response = await fetch(relativeUrl, init).catch(() => null);
  const contentType = response?.headers.get("content-type") || "";
  const isLocalHost = ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
  const method = String(init?.method || "GET").toUpperCase();
  const shouldFallbackFromLocalProxy = isLocalHost && method === "GET" && response && response.status >= 500;
  const shouldFallbackFromStaticHost = response
    && ([404, 405].includes(response.status) || contentType.includes("text/html"));
  if (response && !shouldFallbackFromStaticHost && !shouldFallbackFromLocalProxy) {
    return response;
  }

  return fetchCloudFunction(relativeUrl, functionName, init);
};
