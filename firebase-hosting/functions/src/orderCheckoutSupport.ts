import { fixedCheckoutLine } from "./fixedCheckout";
import { createHash, timingSafeEqual } from "node:crypto";
export function ownsCheckout(order: any, orderId: string, sessionId: string) {
    if (!/^custom_[a-f0-9]{32}$/.test(orderId) || !/^cs_(live|test)_[A-Za-z0-9]{16,200}$/.test(sessionId) || order?.orderType !== "custom_order")
        return false;
    const digest = (x: string) => createHash("sha256").update(x).digest();
    return typeof order.checkoutSessionId === "string" && timingSafeEqual(digest(order.checkoutLinkSessionId || order.checkoutSessionId), digest(sessionId));
}
export function publicProductImage(product: any): string {
    if (!product || product.active === false || product.catalogVisible === false)
        return "";
    const urls = [...(Array.isArray(product.images) ? product.images.map((x: any) => x?.imageUrl) : []), product.imageUrl];
    for (const raw of urls) {
        try {
            const url = new URL(String(raw || ""));
            if (url.protocol !== "https:" || url.username || url.password)
                continue;
            if (/(^|\/)order-images\//i.test(decodeURIComponent(url.pathname)))
                continue;
            return url.toString();
        }
        catch { }
    }
    return "";
}
export function publicOrderCheckout(orderId: string, order: any, session: any, products: Map<string, any>) {
    const lines = Array.isArray(order.lineItems) ? order.lineItems : [];
    const currency = String(order.currency || "");
    const shipping = Number(order.amountShipping || 0);
    if (!lines.length || !Number.isSafeInteger(shipping) || shipping < 0 || lines.some((x: any) => !Number.isSafeInteger(x.quantity) || x.quantity < 1 || !Number.isSafeInteger(x.unitAmount) || x.unitAmount < 1 || (x.currency && x.currency !== currency)))
        throw Error("order_checkout_invalid");
    const subtotal = lines.reduce((sum: number, x: any) => sum + x.quantity * x.unitAmount, 0);
    const total = Number(order.amountTotal);
    if (!Number.isSafeInteger(total) || total !== subtotal + shipping + (lines.every(fixedCheckoutLine) ? 0 : Number(order.amountTax || 0)))
        throw Error("order_checkout_invalid");
    const mode = order.stripeMode;
    if (!["live", "sandbox"].includes(mode) || session.id !== order.checkoutSessionId || session.livemode !== (mode === "live") || session.client_reference_id !== orderId || session.metadata?.orderId !== orderId)
        throw Error("order_checkout_mismatch");
    const storedStatus = String(order.status || "unknown");
    const paymentStatus = session.payment_status === "paid" || order.paidAt || storedStatus === "paid" ? "paid" : session.status === "complete" ? "processing" : session.status === "expired" ? "expired" : "unpaid";
    const canPay = storedStatus === "checkout_created" && paymentStatus === "unpaid" && session.status === "open";
    if (canPay && (session.amount_total !== total || session.currency !== currency))
        throw Error("order_checkout_mismatch");
    const canStartCheckout = lines.every(fixedCheckoutLine) && storedStatus === "checkout_created" && !order.checkoutTransition && ["unpaid", "expired"].includes(paymentStatus);
    let checkoutUrl = "";
    if (canPay && session.ui_mode !== "embedded") {
        const url = new URL(String(session.url || ""));
        if (url.origin !== "https://checkout.stripe.com")
            throw Error("order_checkout_mismatch");
        checkoutUrl = url.toString();
    }
    return { id: orderId, customerReference: String(order.customerReference || ""), status: storedStatus, paymentStatus, canPay, canStartCheckout, checkoutUrl, stripeMode: mode, livemode: mode === "live", currency, amountSubtotal: subtotal, amountShipping: shipping, amountTax: Number(order.amountTax || 0), amountTotal: total,
        lineItems: lines.map((x: any) => ({ productId: String(x.productId || ""), variationId: String(x.variationId || ""), title: String(x.title || ""), badgeName: String(x.badgeName || ""), quantity: x.quantity, unitAmount: x.unitAmount, currency, imageUrl: publicProductImage(products.get(x.productId)) })) };
}
