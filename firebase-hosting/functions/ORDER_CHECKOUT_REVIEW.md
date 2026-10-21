# Existing-order embedded checkout — local review, not deployed

## Outcome and diagnosis

The existing cart already creates Stripe embedded Checkout and mounts `initEmbeddedCheckout`. Custom orders previously created hosted sessions. A hosted session cannot be mounted as embedded. This implementation extends the existing `createCheckoutSession`/cart flow with an existing-order reference rather than adding a separate payment application.

Production's Checkout button was always disabled by `!localStripeSandboxEngaged`. There were additional TaggedJS update problems: loading state and organization input changes did not render immediately, and static product-image attributes did not refresh. These now have reactive bindings, visible blocking explanations, immediate loading, double-click protection, failed-script retry, and generation guards that destroy/ignore stale initialization after reset.

The actual live order `custom_04e553b952badf22ac7902da701d8779` was read only during diagnosis. Julia, Susana, Patricia and Kristen, quantity one each, $20 USD, and the user's product/private order images have not been changed by this local work. No first-party live checkout is claimed.

## Implemented behavior

- The exact admin action **🛒 Checkout 🔗 link** opens `/cart.html?orderId=…#checkout=…`. The high-entropy original session reference is retained as a stable buyer capability through later migration/edits; it is sent in POST bodies, not server query logs.
- The cart renders agreed names, quantities and amounts without reading, mixing, clearing or changing the buyer's ordinary shopping cart. It fetches a fresh allowlisted order preview and current public catalog images on load, focus/visibility return, and explicit Refresh. Refresh pauses while payment is opening/open to avoid replacing a mounted payment form; closing/reopening or reloading refreshes the preview.
- Private `orderImage` means admin-only Storage under `order-images/<orderId>/…`, without public download tokens. Private bytes, paths, metadata and customer contact data are excluded from buyer previews. Public product images remain public. No new visibility feature or permission was added.
- Viewing the page never creates/expires a payment session. After terms acceptance and an explicit Checkout action, the existing checkout endpoint uses a Firestore transaction lease, validates the recorded Stripe session's order/mode, expires the unpaid source and cancels any safely abandoned intent, then creates one embedded replacement with the lease ID as Stripe idempotency key. Paid, processing, requires-action and uncertain sessions fail closed. The original direct Stripe link stops working after successful retirement; no on-demand hosted fallback switching was added.
- Repeated checkout reuses the active embedded session. Unknown Stripe-create outcomes keep the lease/key for reconciliation after 60 seconds; leases older than 23 hours require manual reconciliation instead of risking reuse beyond Stripe's idempotency retention. Failed orphan cleanup retains the lock. Agreed pricing/names are fingerprinted and checked at commit. Image-only changes are preserved.
- Admin updates, cancel and close share the same lifecycle lock. Updates retire the old session before creating a replacement; migrated embedded orders remain embedded. Closed/canceled legacy unpaid records can have their still-open session retired. Paid close preserves payment history, while paid cancel and processing retirement are rejected.
- Signed payment webhooks verify the current session and embedded amount/mode/currency, preserve custom product IDs/badge names/private image, reject stale intent fallthrough, and keep a paid closed order closed on replay. A failed card attempt keeps the same Checkout session retryable.
- Cash marking refuses an unresolved transition or active embedded custom checkout, preventing a parallel cash/Stripe route. Existing hosted/non-custom cash behavior is unchanged. Coordinated embedded-to-cash conversion is outside this change.

## Deliberate scope and configuration

Existing-order migration is limited to fixed-total name-badge custom orders. This preserves the agreed $20 inclusive total; unrelated products retain their existing tax behavior and ordinary cart checkout. Non-badge custom orders keep their existing hosted payment route and are rejected by this migration endpoint rather than silently becoming tax-inclusive.

Only a test publishable key was found in existing local environment configuration. The cart supports `VITE_STRIPE_LIVE_PUBLISHABLE_KEY`, `VITE_STRIPE_TEST_PUBLISHABLE_KEY`, and the existing `VITE_STRIPE_PUBLISHABLE_KEY` fallback, choosing the key from the server's order mode and rejecting a prefix mismatch. A matching live account publishable key is required before production activation; no key value was printed or changed. Test/live account matching still needs real sandbox/production verification after configuration. No credential was created, extracted, renewed or stored.

## Verification evidence

- `npm run test:checkout-state` passed: real installed TaggedJS/jsdom normal-cart and existing-order DOM tests plus backend custom-order tests. Payment/network adapters are mocked. Covers loading/gates/retry/reset/stale initialization; four names/$20/read-only quantities; fresh public images; no cart mixing; correct server-mode key; migration concurrency/reuse/unknown outcomes/payment race/orphans; status/ownership/amount/mode/privacy; edit/cancel/close; stale webhook isolation, paid replay and abandoned-intent cancellation.
- `npm run test:order-integrations` passed: backend, CLI, grant-page, order-modal and badge-item-editor regressions. The modal test now checks real first-party link generation.
- `npm run build --prefix firebase-hosting/functions` passed.
- `npx vite build --mode localprint --outDir /tmp/3dlocalprint-checkout-final` passed; existing chunk-size warning remains.
- `npm run typecheck` still fails with exactly 394 pre-existing errors. Normalized error signatures match the prior baseline; no new checkout error signatures.
- `git diff --check` passed. No Java was used; Firestore rules emulator tests were not run. No rules changes in this stage. No real sandbox payment/session transition was run in this stage.
- Logs: `/tmp/checkout-focused-final.log`, `/tmp/checkout-aggregate-final.log`, `/tmp/checkout-backend-final.log`, `/tmp/checkout-vite-final.log`, `/tmp/checkout-typecheck-final.log`.

## Exact proposed activation scope — approval still required

1. Configure the matching existing live Stripe publishable key in local frontend build configuration. No secret/IAM/grant renewal is needed for the buyer capability flow. Use existing admin web authentication for admin actions.
2. Deploy only functions `getOrderCheckout`, `createCheckoutSession`, `createCustomOrder`, `updateCustomOrder`, `cancelOrder`, `closeOrder`, `markOrderPaidByCash`, and `stripeWebhook`. The create-custom change returns the session reference so admin creation copies the correct first-party link. The cash function only adds a lifecycle guard. Stripe bindings on create-checkout/cancel/close need both already-existing live/test secrets; no new secret is proposed.
3. Publish only the reviewed frontend cart/admin changes through the established GitHub Pages build. Do not use the broad `npm run deploy` command, which stages unrelated files. Preserve the untracked actual order request file and all user edits. The Vite proxy addition is local development only. Production already calls the direct Cloud Functions endpoint; no Firebase Hosting rewrite/rules release is needed.
4. Verify a sandbox existing-order transition, real embedded initialization, exact totals, source expiration, idempotent retry, fresh public image and terminal guards. No payment, emails or fulfillment. Creating a new sandbox fixture, if needed, requires explicit approval; the old expired integration grant cannot be reused/renewed silently.
5. With separate explicit approval, migrate **only** the existing live four-badge order, through the same public checkout endpoint. Re-read order/session first, ensure live/unpaid/$20 and exact names, retire its old unpaid hosted session and initialize embedded checkout without paying. This invalidates the previously shared direct Stripe link. Preserve the same order ID and images. Return the verified real first-party checkout and admin URLs after publication. No additional live order is needed.

Nothing has been deployed, pushed, charged, marked paid, fulfilled, emailed, or changed in the actual live order/session by this checkout implementation stage.
