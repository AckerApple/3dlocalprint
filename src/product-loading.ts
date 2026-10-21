import { div, p, htmlTag } from "taggedjs";

export const PRODUCT_LOADING_DELAY_MS = 3000;

const NAVIGATION_START_KEY = "product-loading-navigation";

// Carry only a public slug and timestamp across the static fallback redirect.
export function beginProductNavigation(slug: string) {
  try { window.sessionStorage.setItem(NAVIGATION_START_KEY, JSON.stringify({ slug, startedAt: Date.now() })); }
  catch { /* Loading still works when session storage is unavailable. */ }
}

export function productNavigationDelay(slug: string): number {
  try {
    const raw = window.sessionStorage.getItem(NAVIGATION_START_KEY);
    window.sessionStorage.removeItem(NAVIGATION_START_KEY);
    const navigation = JSON.parse(raw || "null");
    const age = Date.now() - navigation?.startedAt;
    if (navigation?.slug === slug && Number.isFinite(age) && age >= 0 && age <= 300000) {
      return Math.max(0, PRODUCT_LOADING_DELAY_MS - age);
    }
  } catch { /* A new load gets the normal delay. */ }
  return PRODUCT_LOADING_DELAY_MS;
}

export function delayedProductLoading(show: () => void) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let generation = 0;
  const cancel = () => {
    generation++;
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  };
  return {
    cancel,
    start(delayMs = PRODUCT_LOADING_DELAY_MS) {
      cancel();
      const current = generation;
      timer = setTimeout(() => {
        if (current !== generation) return;
        timer = undefined;
        show();
      }, delayMs);
    },
  };
}

export const ProductLoadingStatus = () => div.class`product-loading-status`
  .attr("role", "status").attr("aria-live", "polite")
  .style("width:100%;display:grid;gap:0.5rem")(
    p("Loading product…"),
    htmlTag("progress").ariaLabel("Loading product")
      .style("width:100%;height:0.65rem;accent-color:var(--site-primary)")()
  );
