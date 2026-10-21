export const FIXED_TEST_PRODUCT_ID = "checkout-test-1usd";
export const FIXED_TEST_PRODUCT_SLUG = "checkout-test-1usd";
export function fixedCheckoutLine(line: any): boolean {
  return Boolean(line.badgeName) || (line.productId === FIXED_TEST_PRODUCT_ID && line.unitAmount === 100 && line.currency === "usd");
}
