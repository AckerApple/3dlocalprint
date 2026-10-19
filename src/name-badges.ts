export const isNameBadgeProduct = (product: { slug?: string }) => product.slug === "custom-name-badges";
export const validateBadgeName = (value: unknown): string => {
  const name = String(value ?? "").trim();
  if (!name || name.length > 15 || /[\r\n\x00-\x1f\x7f]/.test(name)) {
    throw new Error("Enter a badge name of 1–15 characters on one line.");
  }
  return name;
};
