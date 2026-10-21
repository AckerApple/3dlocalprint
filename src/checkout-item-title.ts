/** Catalog titles are raw; persisted order titles can already include the badge name. */
export function checkoutItemTitle(productTitle: string, badgeName = "", variationLabel = ""): string {
  let title = String(productTitle || "").trim();
  const nameSuffix = badgeName ? ` — Name: ${badgeName}` : "";
  // Remove only this exact trailing decoration, including repeats, before composing once.
  if (nameSuffix) {
    while (title.endsWith(nameSuffix)) title = title.slice(0, -nameSuffix.length);
  }
  const variationSuffix = variationLabel ? ` (${variationLabel})` : "";
  if (variationSuffix && !title.endsWith(variationSuffix)) title += variationSuffix;
  return title + nameSuffix;
}
