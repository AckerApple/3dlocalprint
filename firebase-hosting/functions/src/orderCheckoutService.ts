import { createHash, randomUUID } from "node:crypto";
import { ownsCheckout } from "./orderCheckoutSupport";
export class CheckoutStateError extends Error {
    constructor(public status: number, public code: string) { super(code); }
}
export type CheckoutDependencies = {
    db: any;
    stripe: (mode: "live" | "sandbox") => any;
    parameters: (id: string, order: any) => any;
};
const conflict = (code: string): never => { throw new CheckoutStateError(409, code); };
export const checkoutFingerprint = (o: any) => createHash("sha256").update(JSON.stringify([o.lineItems, o.currency, o.amountSubtotal, o.amountTotal, o.amountShipping, o.amountTax, o.stripeMode])).digest("hex");
const mode = (o: any): "live" | "sandbox" => { if (!["live", "sandbox"].includes(o.stripeMode))
    return conflict("checkout_mode_invalid"); return o.stripeMode; };
export function assertOrderSession(id: string, order: any, session: any) {
    if (session.id !== order.checkoutSessionId || session.livemode !== (mode(order) === "live") || session.metadata?.orderId !== id || session.client_reference_id !== id)
        conflict("checkout_session_mismatch");
}
async function intent(stripe: any, session: any) { return typeof session.payment_intent === "string" ? stripe.paymentIntents.retrieve(session.payment_intent) : session.payment_intent; }
export async function expireUnpaidCheckout(stripe: any, id: string, order: any, key: string) {
    let session = await stripe.checkout.sessions.retrieve(order.checkoutSessionId, { expand: ["payment_intent"] });
    assertOrderSession(id, order, session);
    if (session.payment_status !== "unpaid" || session.status === "complete")
        conflict("checkout_payment_in_progress_or_paid");
    let pi = await intent(stripe, session);
    if (pi && !['requires_payment_method', 'requires_confirmation', 'canceled'].includes(pi.status))
        conflict("checkout_payment_in_progress_or_paid");
    if (session.status === "open") {
        try {
            session = await stripe.checkout.sessions.expire(session.id);
        }
        catch {
            session = await stripe.checkout.sessions.retrieve(session.id, { expand: ["payment_intent"] });
        }
    }
    assertOrderSession(id, order, session);
    if (session.status !== "expired" || session.payment_status !== "unpaid")
        conflict("checkout_not_safely_expired");
    pi = await intent(stripe, session);
    if (pi && pi.status !== "canceled") {
        if (!['requires_payment_method', 'requires_confirmation'].includes(pi.status))
            conflict("checkout_payment_in_progress_or_paid");
        try {
            pi = await stripe.paymentIntents.cancel(pi.id, {}, { idempotencyKey: key + ':intent-cancel' });
        }
        catch {
            pi = await stripe.paymentIntents.retrieve(pi.id);
        }
        if (pi.status !== "canceled")
            conflict("checkout_payment_in_progress_or_paid");
    }
    return session;
}
export async function beginCheckoutTransition(db: any, id: string, kind: string, key: string, expectedSession?: string, allowedStatuses = ["checkout_created"]) {
    const ref = db.collection('orders').doc(id);
    const result = await db.runTransaction(async (tx: any) => {
        const snap = await tx.get(ref);
        if (!snap.exists)
            throw new CheckoutStateError(404, 'order_checkout_not_found');
        const order = snap.data();
        if (!allowedStatuses.includes(order.status) || order.paidAt)
            conflict('order_not_payable');
        if (expectedSession && order.checkoutSessionId !== expectedSession)
            conflict('checkout_changed');
        const previous = order.checkoutTransition;
        if (previous) {
            if (previous.kind !== kind || previous.requestKey !== key)
                conflict('checkout_transition_in_progress');
            if (!Number.isFinite(Date.parse(previous.startedAt)) || Date.now() - Date.parse(previous.startedAt) > 23 * 3600000)
                conflict('checkout_reconciliation_required');
            if (Date.now() - Date.parse(previous.startedAt) < 60000)
                conflict('checkout_transition_in_progress');
            return { order, lease: previous };
        }
        const revision = Number(order.checkoutRevision || 0) + 1;
        const lease = { id: 'checkout_' + randomUUID(), kind, requestKey: key, sourceSessionId: String(order.checkoutSessionId || ''), revision, fingerprint: checkoutFingerprint(order), startedAt: new Date().toISOString() };
        tx.set(ref, { checkoutTransition: lease, checkoutLinkSessionId: order.checkoutLinkSessionId || order.checkoutSessionId }, { merge: true });
        return { order, lease };
    });
    return { ...result, ref };
}
export async function releaseCheckoutTransition(db: any, ref: any, lease: any) { await db.runTransaction(async (tx: any) => { const current = (await tx.get(ref)).data(); if (current?.checkoutTransition?.id === lease.id)
    tx.set(ref, { checkoutTransition: null }, { merge: true }); }); }
function assertPayable(order: any) { if (order.status !== 'checkout_created' || order.paidAt)
    conflict('order_not_payable'); }
function verifyReady(id: string, order: any, session: any) {
    assertOrderSession(id, order, session);
    assertPayable(order);
    if (session.status !== 'open' || session.payment_status !== 'unpaid' || session.ui_mode !== 'embedded' || !session.client_secret || session.amount_total !== order.amountTotal || session.currency !== order.currency)
        conflict('checkout_not_payable');
}
export async function prepareExistingOrderCheckout(deps: CheckoutDependencies, input: any) {
    const id = String(input.orderId || '');
    const ref = deps.db.collection('orders').doc(id);
    const first = (await ref.get()).data();
    if (!ownsCheckout(first, id, String(input.sessionId || '')))
        throw new CheckoutStateError(404, 'order_checkout_not_found');
    if (input.termsAccepted !== true)
        throw new CheckoutStateError(400, 'checkout_terms_required');
    assertPayable(first);
    deps.parameters(id, first);
    const stripe = deps.stripe(mode(first));
    let session = await stripe.checkout.sessions.retrieve(first.checkoutSessionId, { expand: ['payment_intent'] });
    assertOrderSession(id, first, session);
    if (!first.checkoutTransition && session.ui_mode === 'embedded' && session.status === 'open') {
        const latest = (await ref.get()).data();
        if (latest.checkoutTransition || latest.checkoutSessionId !== session.id)
            conflict('checkout_changed');
        verifyReady(id, latest, session);
        return { orderId: id, sessionId: session.id, stripeMode: mode(latest), clientSecret: session.client_secret, reused: true };
    }
    const lock = await beginCheckoutTransition(deps.db, id, 'embedded', 'embedded', first.checkoutSessionId);
    let creating = false;
    let created: any;
    try {
        await expireUnpaidCheckout(stripe, id, lock.order, lock.lease.id);
        // Prices and names come exclusively from the existing agreed order, never a browser cart/catalog reprice.
        creating = true;
        created = await stripe.checkout.sessions.create(deps.parameters(id, lock.order), { idempotencyKey: lock.lease.id });
        verifyReady(id, { ...lock.order, checkoutSessionId: created.id }, created);
        await deps.db.runTransaction(async (tx: any) => {
            const current = (await tx.get(ref)).data();
            if (current.checkoutSessionId === created.id && current.checkoutRevision === lock.lease.revision)
                return;
            assertPayable(current);
            if (current.checkoutTransition?.id !== lock.lease.id || current.checkoutSessionId !== lock.lease.sourceSessionId || checkoutFingerprint(current) !== lock.lease.fingerprint)
                conflict('checkout_changed');
            tx.set(ref, { checkoutSessionId: created.id, checkoutChannel: 'embedded', checkoutUrl: '', checkoutRevision: lock.lease.revision, checkoutTransition: null, updatedAt: new Date().toISOString() }, { merge: true });
        });
        const current = (await ref.get()).data();
        verifyReady(id, current, created);
        return { orderId: id, sessionId: created.id, stripeMode: mode(current), clientSecret: created.client_secret, reused: false };
    }
    catch (error) {
        let cleaned = !created;
        if (created) {
            const current = (await ref.get()).data();
            if (current?.checkoutSessionId !== created.id) {
                try {
                    await expireUnpaidCheckout(stripe, id, { ...lock.order, checkoutSessionId: created.id }, lock.lease.id + ':orphan');
                    cleaned = true;
                }
                catch { }
            }
            else
                cleaned = true;
        }
        // An unknown Stripe-create outcome keeps the lease and its idempotency key for safe retry.
        if (!creating || (created && cleaned))
            await releaseCheckoutTransition(deps.db, ref, lock.lease);
        throw error;
    }
}
export async function retireExistingOrderCheckout(deps: CheckoutDependencies, id: string, action: 'cancel' | 'close', actor: string) {
    const ref = deps.db.collection('orders').doc(id);
    const initial = (await ref.get()).data();
    if (!initial)
        throw new CheckoutStateError(404, 'order_checkout_not_found');
    const target = action === 'close' ? 'closed' : 'canceled';
    if (initial.status === target && initial.paidAt)
        return { status: target, reused: true };
    if (initial.paidAt || initial.status === 'paid') {
        if (action !== 'close')
            conflict('paid_order_cannot_cancel');
        await deps.db.runTransaction(async (tx: any) => { const current = (await tx.get(ref)).data(); if (current.checkoutTransition)
            conflict('checkout_transition_in_progress'); if (!current.paidAt && current.status !== 'paid')
            conflict('checkout_changed'); tx.set(ref, { status: 'closed', closedAt: new Date().toISOString(), closedByAdminEmail: actor, updatedAt: new Date().toISOString() }, { merge: true }); });
        return { status: 'closed' };
    }
    const lock = await beginCheckoutTransition(deps.db, id, action, action, initial.checkoutSessionId, ['checkout_created', 'canceled', 'closed']);
    try {
        await expireUnpaidCheckout(deps.stripe(mode(lock.order)), id, lock.order, lock.lease.id);
        await deps.db.runTransaction(async (tx: any) => {
            const current = (await tx.get(ref)).data();
            if (current.paidAt || !['checkout_created', 'canceled', 'closed'].includes(current.status))
                conflict('order_not_payable');
            if (current.checkoutTransition?.id !== lock.lease.id || current.checkoutSessionId !== lock.lease.sourceSessionId)
                conflict('checkout_changed');
            const at = new Date().toISOString();
            tx.set(ref, { status: target, [action === 'close' ? 'closedAt' : 'canceledAt']: at, [action === 'close' ? 'closedByAdminEmail' : 'canceledByAdminEmail']: actor, checkoutTransition: null, updatedAt: at }, { merge: true });
        });
        return { status: target };
    }
    finally {
        await releaseCheckoutTransition(deps.db, ref, lock.lease);
    }
}
