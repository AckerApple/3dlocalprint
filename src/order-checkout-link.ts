export function orderCheckoutLink(order: {
    id?: string;
    checkoutSessionId?: string;
    checkoutLinkSessionId?: string;
}, origin = "https://3dlocalprint.com") {
    order = { ...order, checkoutSessionId: order.checkoutLinkSessionId || order.checkoutSessionId };
    if (!/^custom_[a-f0-9]{32}$/.test(order.id || "") || !/^cs_(live|test)_[A-Za-z0-9]{16,200}$/.test(order.checkoutSessionId || ""))
        return "";
    const url = new URL("/cart.html", origin);
    url.searchParams.set("orderId", order.id!);
    url.hash = new URLSearchParams({ checkout: order.checkoutSessionId! }).toString();
    return url.toString();
}
export function checkoutBlockReason(input: {
    loading: boolean;
    opening: boolean;
    embeddedOpen: boolean;
    terms: boolean;
    organization: boolean;
    verifiedOrganization: string;
    key: string;
    local: boolean;
    order?: {
        canPay: boolean;
        canStartCheckout?: boolean;
    } | null;
    orderMode: boolean;
}) {
    if (input.loading)
        return "Loading checkout…";
    if (input.opening)
        return "Opening secure checkout…";
    if (input.embeddedOpen)
        return "Checkout is already open below.";
    if (input.orderMode && !(input.order?.canStartCheckout ?? input.order?.canPay))
        return "This order is not currently payable. Refresh its status or request a current link.";
    if (!input.key.startsWith(input.local ? "pk_test_" : "pk_live_"))
        return input.local ? "Checkout requires the sandbox publishable key." : "Live checkout is not configured: a live Stripe publishable key is required.";
    if (!input.terms)
        return "Review and accept the Terms of Service and Sales Policy to continue.";
    if (input.organization && !input.verifiedOrganization)
        return "Verify the tax-exempt organization to continue.";
    return "";
}
