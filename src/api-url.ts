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
  if (response && response.status !== 404 && !contentType.includes("text/html")) {
    return response;
  }

  const directUrl = new URL(getCloudFunctionUrl(functionName));
  const relative = new URL(relativeUrl, window.location.origin);
  directUrl.search = relative.search;
  return fetch(directUrl.toString(), init);
};
