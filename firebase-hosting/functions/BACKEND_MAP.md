# Backend Map

This map explains the Firebase Functions backend behind the public HTTP API. The Swagger/OpenAPI surface is maintained at `public/backend/openapi.json`, and the human-readable Swagger UI page is built from `src/api-docs.html`.

## HTTP Surface

Firebase Hosting rewrites `/api/...` paths to HTTPS functions in `firebase-hosting/firebase.json`.

- Checkout: `createCheckoutSession`
- Stripe webhooks: `stripeWebhook`
- Public orders: `getPublicOrder`, `getPublicOrderReceiptLink`
- Agreements: `getPublicAgreement`, `acceptAgreementAndCreateCheckoutSession`, `createDefaultWebsiteServicesAgreement`, `createWebsiteServicesAgreement`, `updateWebsiteServicesAgreement`, `sendAgreementEmail`
- Quote requests: `submitModelLinkQuoteRequest`, `getPublicModelLinkQuoteRequest`
- Admin orders and email: `resendOrderNotification`, `resendCustomerOrderEmail`, `deleteTestOrder`, `cancelOrder`, `closeOrder`

## Firestore Collections

### `orders`

Used by checkout, webhooks, receipt lookup, public order lookup, and admin order actions.

- Created when a cart checkout or agreement checkout starts.
- Updated by Stripe webhook events when payment succeeds or fails.
- May be backfilled by receipt lookup when Stripe redirects back before webhook processing is fully reflected.
- Admin email resend endpoints write notification status metadata.
- Admin cancel and close endpoints update only local admin status metadata; they do not refund, void, or cancel anything in Stripe.
- Test order delete removes sandbox/test orders only.

### `agreements`

Used by agreement admin tools, public agreement pages, agreement checkout, and agreement payment processing.

- Admin create/update endpoints create and merge agreement records.
- Public token lookup reads agreements for customer review.
- Public accept-checkout records signer name, acceptance, browser metadata, and checkout status.
- Stripe webhook or receipt-link handling marks linked agreements paid when payment is confirmed.
- Agreement email endpoint records manual send status and recipient metadata.

### `modelLinkQuoteRequests`

Used by PRINT by LINK quote submission and customer quote review.

- Public quote submission creates request records with contact details, model links/items, quantities, project details, page URL, and marketing opt-in.
- Public quote lookup reads by request ID plus customer email.
- Notification email status is stored when submission email is attempted.

### Product/Catalog Data

Checkout resolves product and variation IDs server-side before sending line items to Stripe. Product and catalog data are not exposed as raw backend APIs in this map; public product pages and admin product tools read/write their Firestore-backed records through the frontend/admin data layer.

## External Services

- Stripe creates checkout sessions and sends signed webhook events.
- Gmail SMTP sends transactional order, customer order, agreement, and quote notification email when configured.
- Firebase Authentication protects admin-only endpoints with Firebase ID tokens and approved admin checks.

## Documentation Maintenance

When adding or changing an HTTP function:

1. Add or update the Hosting rewrite in `firebase-hosting/firebase.json`.
2. Add or update the matching Vite local proxy in `vite.config.js` when local browser calls need `/api/...`.
3. Update `public/backend/openapi.json`.
4. Update this map when Firestore collections or side effects change.
5. Run `npm run build` and verify `docs/api-docs.html` and `docs/backend/openapi.json`.
