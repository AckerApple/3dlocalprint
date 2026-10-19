import { createHash } from "node:crypto";
export function customOrderRequestId(actor: string, key: unknown): string {
  if (typeof key !== "string" || !/^[a-zA-Z0-9_-]{16,100}$/.test(key)) throw new Error("order_request_key_required");
  return "custom_" + createHash("sha256").update(actor.toLowerCase() + ":" + key).digest("hex").slice(0,32);
}
export const customerCollection = (email: string) => ({
  ...(email ? { customer_email: email } : {}),
  name_collection: { individual: { enabled: true, optional: false } },
});
export function verifiedCustomerName(session: { customer_details?: unknown }): string {
  const details = session.customer_details as { individual_name?: string; name?: string } | null;
  return String(details?.individual_name || details?.name || "").trim();
}
export function assertCurrentPaidSession(order: Record<string, unknown>, session: {id: string; payment_status: string; livemode: boolean}): void {
  if (order.checkoutSessionId && order.checkoutSessionId !== session.id) throw new Error("order_session_mismatch");
  if (order.stripeMode && (order.stripeMode === "live") !== session.livemode) throw new Error("order_mode_mismatch");
  if (session.payment_status !== "paid") throw new Error("order_payment_not_paid");
}
export function decodeOrderImage(base64: unknown, mime: unknown): {bytes: Buffer; mime: string; hash: string} {
  if (typeof base64 !== "string" || base64.length > 2800000 || !/^[A-Za-z0-9+/]*={0,2}$/.test(base64)) throw new Error("invalid_order_image");
  const bytes = Buffer.from(base64, "base64");
  const type = String(mime || "");
  const valid = type === "image/png" ? bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))
    : type === "image/jpeg" ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
    : type === "image/webp" ? bytes.toString("ascii",0,4) === "RIFF" && bytes.toString("ascii",8,12) === "WEBP" : false;
  if (!valid || bytes.length > 2*1024*1024) throw new Error("invalid_order_image");
  return {bytes,mime:type,hash:createHash("sha256").update(bytes).digest("hex")};
}
