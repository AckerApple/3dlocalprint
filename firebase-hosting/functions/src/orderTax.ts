// Pure presentation helper shared with the receipt. Never changes financial data.
export function taxPresentation(order: { taxBehavior?: string; amountSubtotal?: number; amountTax?: number; amountShipping?: number; amountTotal?: number }) {
  const subtotal = Number(order.amountSubtotal) || 0, tax = Number(order.amountTax) || 0;
  const shipping = Number(order.amountShipping) || 0, total = Number(order.amountTotal) || 0;
  const inclusive = order.taxBehavior === "inclusive";
  const reconciled = inclusive ? subtotal + shipping === total : subtotal + tax + shipping === total;
  return {
    subtotalLabel: inclusive ? "Subtotal (tax included)" : reconciled ? "Subtotal" : "Subtotal (recorded)",
    taxLabel: inclusive ? "Tax included" : reconciled ? "Tax" : "Tax (recorded; treatment unavailable)",
    note: reconciled ? "" : "The recorded breakdown does not reconcile; the order total is authoritative.",
  };
}
export function stripeTaxBehavior(lines: any[]): "inclusive" | "exclusive" | "unknown" {
  const behaviors = lines.map(line => typeof line.price === "object" ? line.price?.tax_behavior : "unknown");
  return behaviors.length && behaviors.every(value => value === "inclusive") ? "inclusive"
    : behaviors.length && behaviors.every(value => value === "exclusive") ? "exclusive" : "unknown";
}
