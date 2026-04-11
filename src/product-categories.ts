export const PRODUCT_CATEGORIES = [
  "art",
  "craft party",
  "fashion",
  "gifts",
  "hardware",
  "holidays",
  "home goods",
  "kids",
  "pinball",
  "sports",
  "themed",
  "tools",
] as const;

export const normalizeProductCategories = (categories: unknown): string[] => {
  const normalized = (Array.isArray(categories) ? categories : [])
    .map((value) => String(value || "").trim().toLowerCase())
    .filter(Boolean);
  return Array.from(new Set(normalized));
};
