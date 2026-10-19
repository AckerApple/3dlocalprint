# Custom orders with customer details pending

Admin Orders: https://3dlocalprint.com/admin/orders/index.html

1. Add Order; leave customer name/email blank when unknown. Add catalog products, badge names and quantities, and any confirmed shipping charge. Blank contact data is stored as blank; the UI says **Customer details pending**. No fake customer record is created.
2. Create Order & Copy Link saves a private admin record and creates hosted Stripe Checkout. The admin URL includes `?orderId=...`. Creation does not send email or mark paid/fulfilled. A failed Stripe request can leave a private order without a checkout URL; reopen it in admin and use Edit Order to create a link.
3. Attach a PNG, JPEG, or WebP reference image (maximum 2MB) in the order detail. View private image fetches it with the signed-in admin token. The image is not included in public lookup or Stripe product images. One current image is shown; previous versions remain private in Storage.
4. Copy checkout link and share that link yourself. It is a Stripe-hosted session URL, not the admin link or an email-less public order URL. The recipient supplies required email and individual name at Checkout. Checkout totals can include Stripe-calculated tax.
5. Signed payment events retrieve the session from Stripe, check payment/session/mode, and populate customer details. Unpaid or replaced sessions cannot mark the record paid. Receipt return uses the matching session capability; ordinary public lookup still requires matching order ID and email. Existing post-payment notification behavior remains.
6. For an expired link, Edit Order and save to replace it. Old unpaid checkout is expired on a best-effort basis. Payment/fulfillment are separate actions; do not mark an unpaid order received or complete merely to save it.

## Authentication and endpoints

Existing Firebase user authentication and the existing admin allowlist protect creation, editing, and image access. No service-account key, new credentials, or expanded persistent access is required for this workflow.

- `POST /api/admin/orders/create` (`createCustomOrder`): optional customer name/email, catalog `cartItems`, Stripe mode, confirmed shipping amount. Require `X-Idempotency-Key` (16–100 letters/digits/underscores/hyphens). Reuse the same key and body on retries. A different body with that key returns 409. The admin identity plus key determines one durable order ID; Stripe receives a matching idempotency key.
- `POST /api/admin/orders/update` (`updateCustomOrder`): same authentication and idempotency header; existing unpaid/closed-order restrictions remain. Repeated saves of one request reuse the Stripe session. The UI changes the key when the form changes or a save succeeds.
- `POST /api/admin/orders/image` (`manageOrderImage`): order ID, MIME, base64 image. MIME allowlist, file signature, path, and size checks are server-side. Images have no public download token.
- `GET /api/admin/orders/image?orderId=...`: authenticated image bytes encoded as JSON; response is private/no-store. Arbitrary storage paths are not accepted.

Idempotency prevents transport retries and simultaneous requests from duplicating one submission. It does not infer whether two intentionally separate submissions describe the same physical order. Admin list still displays the latest 100 records; check known records before a new submission.

## Validation and deployment prerequisites

- Run `npm run test:custom-orders` in this functions directory and `npm run build`. Tests execute the real handlers with in-memory Firebase/Storage/Stripe adapters and no network access.
- Frontend build and local browser checks use isolated fixtures. Existing frontend typecheck failures remain outside this change.
- Deploy the frontend with the changed create/update/receipt/webhook functions and the new `manageOrderImage` function; include the `/api/admin/orders/image` hosting rewrite. Refresh cached admin clients so they send idempotency keys.
- Existing project configuration, Stripe mode secrets, webhook signature secret, and default private Storage bucket must already be configured. Confirm the function identity can read/write this bucket using its existing permissions. Keep Storage's default deny rule; no public image rule or download token is needed.
- Stripe API version is already pinned to `2026-02-25.clover`; native required individual-name collection needs the supported name-collection API. The installed SDK predates the field's TypeScript definition, so it is supplied through the customer-collection helper without upgrading dependencies.
- Before production rollout, verify one real sandbox hosted checkout collects name/email, redirects to receipt, and receives signed `checkout.session.completed` / `checkout.session.async_payment_succeeded` events. Local mocks do not establish account/webhook readiness. Do not use real payment or customer data for this check.
- Product catalog must contain the intended badge product (`custom-name-badges`, USD 500 cents) with approved description/image. Confirm the actual order quantity, individual badge names and image before creating the customer's live record.
