# Laptop order integration

The laptop CLI calls a narrow HTTPS API. It never receives Firebase admin, Google Cloud, or Stripe credentials. No MCP server or offline agent is included.

## Authentication and boundaries

The existing web-admin endpoints still require a Firebase ID token and current `admins/list` membership. The new `manageOrderIntegrations` endpoint uses that same authentication to issue and revoke grants owned by the signed-in admin. It does not accept integration tokens.

The new `orderIntegrationApi` accepts only an integration bearer token. The server stores a SHA-256 hash, owner, explicit scopes, allowed product IDs/modes, expiry, revocation time, and amount/count/quantity budgets. The raw token is returned once on issuance. Listing grants never returns hashes or credentials. Removing the owner from `admins/list`, revoking, or expiring the grant disables requests. Tokens are bearer credentials, not hardware-bound; the intended client runs only on the authorized laptop.

Permissions are limited to `catalog:read`, `orders:create`, and `orders:read-own`. There is no update, refund, paid-status, fulfillment, delete, image, email, or direct database operation. Own-order output omits customer contact and private images. Existing post-payment business notifications remain part of the website’s payment workflow, not an integration email permission.

The create adapter calls `createUnpaidCustomOrder`, the same service used by web Admin Orders. Catalog price/variation/name validation, Stripe Checkout, required customer contact collection, idempotency, and audit fields stay in one implementation. Integration input cannot supply a price, status, payment ID, or existing order ID. Integration-created orders include `createdByIntegrationId` and the verified owner email.

A Firestore transaction rechecks the grant and reserves order count and gross amount when creating a new draft. Retries of the same idempotency key/body reuse that draft and Stripe session without spending budget twice. Different content with the same key conflicts. Failed Stripe requests retain their reservation; retry the same key, rather than creating another order. Reserved budgets are not reset by payment, cancellation, or refunds. In-flight revocation is rechecked before the reservation; a request already accepted by Stripe can finish.

Integration catalog and shipping amounts are tax-inclusive to make the agreed quote/budget an exact total. Web-admin non-badge products keep their previous tax behavior; badge prices include calculated tax. The CLI requires an exact expected total and explicit live/test mode. A retry after an order is paid reports paid; it never resets payment state.

## Interfaces

Direct CLI base: `https://us-central1-threedlocalprint.cloudfunctions.net/orderIntegrationApi`

- `GET ?resource=catalog`: allowed active catalog products and current per-order limits.
- `POST ?resource=orders`: create an unpaid order using the shared service. Requires `X-Idempotency-Key` (16–100 letters/digits/underscores/hyphens).
- `GET ?resource=orders&orderId=custom_<id>`: retrieve only orders belonging to this grant.

Firebase Hosting aliases: `/api/integrations/catalog` and `/api/integrations/orders`. The CLI uses the direct function URL because the custom domain’s static hosting already uses direct function calls. Admin grant management is `manageOrderIntegrations`, with alias `/api/admin/order-integrations`.

Admin page after deployment: `https://3dlocalprint.com/admin/integrations/index.html`. It requires normal Google admin sign-in, explicit product selection and access approval, and defaults to test mode. Credential display clears on request, sign-out, or after two minutes. No credential is saved in browser storage. A lost issuance response cannot recover the raw credential; inspect/revoke that grant and issue a new one.

## CLI

Run `node scripts/3dlocalprint-cli.mjs --help` from this repo. Commands:

```sh
node scripts/3dlocalprint-cli.mjs login --approve-keychain-storage
node scripts/3dlocalprint-cli.mjs catalog
node scripts/3dlocalprint-cli.mjs order create --file order.json --mode sandbox --max-total 2000 --idempotency-key UNIQUE_STABLE_REQUEST_KEY
node scripts/3dlocalprint-cli.mjs order get custom_ORDER_ID
node scripts/3dlocalprint-cli.mjs logout
```

Login uses a hidden prompt and, only after approval, saves to macOS Keychain service `3dlocalprint.orders.default` / account `order-cli`. A different `--profile` selects a separate service. The credential is passed to `security -i` on stdin, not process arguments or environment, and command output is never logged. Logout only removes the local entry; revoke on the admin page to invalidate access server-side.

`--token-stdin` on a catalog/create/get command uses an ephemeral credential without saving it. Supply through a trusted secret-input mechanism, never a literal shell command, chat, or repository file. The CLI follows no redirects and refuses noncanonical remote endpoints. Its localhost endpoint override is enabled only with `LOCALPRINT_CLI_TEST=1` for synthetic tests.

Successful create/get output is JSON with order ID, canonical `3dlocalprint.com` admin URL including `orderMode=live|test`, checkout URL, `stripeMode`, `livemode`, recorded order/payment status, USD cents total, and named items. Creation timeout/network failure has an uncertain outcome: retry the unchanged file with the SAME key. Never generate a new key as a transport retry.

## Four-badge order body

After the real catalog entry is configured, replace `CONFIRMED_BADGE_PRODUCT_ID` below with its returned ID. Do not use the mock preview ID. Amounts are cents, and the CLI adds mode and expected total from flags.

```json
{
  "customerName": "",
  "customerEmail": "",
  "amountShipping": 0,
  "cartItems": [
    {"productId":"CONFIRMED_BADGE_PRODUCT_ID","badgeName":"Julia","quantity":1},
    {"productId":"CONFIRMED_BADGE_PRODUCT_ID","badgeName":"Susana","quantity":1},
    {"productId":"CONFIRMED_BADGE_PRODUCT_ID","badgeName":"Patricia","quantity":1},
    {"productId":"CONFIRMED_BADGE_PRODUCT_ID","badgeName":"Kristen","quantity":1}
  ]
}
```

## Validation

- `npm run test:order-integrations`: real backend handlers with in-memory Firebase/Stripe, real grant-page DOM in jsdom, real CLI localhost HTTP transport with synthetic tokens, existing modal/item tests. Keychain calls are mocked. No production credentials are read, issued, or stored.
- `npm run build --prefix firebase-hosting/functions` and `npm run build:local`: backend and frontend builds.
- `npm run typecheck`: existing frontend baseline remains 394 errors; new integration page has no reported errors.
- Deferred, **not run per the user’s no-Java instruction**: `npm run test:order-integration-rules` requires `FIRESTORE_EMULATOR_HOST=127.0.0.1:<port>` and refuses production endpoints. The isolated demo project tests denial of all client access to integration hashes/budgets and preservation of ordinary admin/catalog rules. Run it through `firebase emulators:exec --only firestore --project demo-3dlocalprint-order-integrations ...` with Java available. No production credentials are needed.

## Activation checklist — separate approval required

Code preparation does not issue credentials, configure secret storage, grant access, change IAM, or deploy anything.

1. Review the scoped Firestore Rules diff with the known verification limit: the emulator test was not run, per the user’s instruction not to use Java. Java is not a runtime requirement of this website, API, or CLI, and no Java use or installation is planned. Runtime/behavioral rules verification is not claimed.
2. Approve storing the existing working local Stripe test key as Firebase `STRIPE_TEST_SECRET_KEY`. This requires explicit approval. Do not generate a new key.
3. Approve deployment of `orderIntegrationApi`, `manageOrderIntegrations`, the already prepared create/update/image/public-order/receipt/webhook functions, the scoped Firestore Rules change and hosting rewrites, and the admin page/frontend. Use targeted deployment/build commands, not `npm run deploy` (which stages all files, commits and pushes). No other IAM changes or service-account keys are needed or proposed.
4. Configure the real badge catalog entry: active, slug `custom-name-badges`, USD 500 cents, approved description/image. If absent, create it before issuing a grant. Catalog mutation is intentionally outside the integration’s permissions; use the existing admin product workflow for this one-time setup.
5. Approve one grant for this laptop: only that badge product; the three scopes above; sandbox and live modes; 60-minute expiry; max 4 badges and $20 per order; max 2 orders and $40 reserved total (one sandbox check plus the live order). Approve local Keychain storage separately within the same activation approval. Issue it through the signed-in admin page and use the CLI’s hidden prompt; the initial approved bootstrap can instead use the existing verified allowlisted deployment-owner identity and the same policy helper for catalog/grant setup only, with all order creation still going through the scoped API; never send the token in chat. Grant issuance and Keychain login must not run before approval.
6. Through the deployed API, create and retrieve one fresh sandbox order/session, verify exact $20, names, mode, unpaid state and accessible checkout. Then create a DIFFERENT fresh live order with the four confirmed names and a different stable key. Verify persisted ownership, real live checkout, and canonical admin URL. Never promote a test record or reuse test payment IDs.
7. Return both verified live URLs. Do not send the link to Shelby, pay, or mark the order fulfilled. Revoke the short-lived grant after verification if no further access is needed.

No live order or payment link is claimed until step 6 succeeds.

## Static security review (emulator not run)

- The old recursive admin allow rule would have overridden an additional deny-only rule, because matching Firestore allow rules combine. The recursive match now excludes the top-level `order_integrations` collection. None of the existing literal collection matches grants access to it. API functions access it server-side; browser and integration credentials cannot directly read or alter hashes, expiry, revocation, or budgets through these rules.
- Existing public `/products/list` read, admin catalog writes, and ordinary admin data access remain present. No integration token is added to `admins/list`, Firebase custom claims, or IAM.
- Integration tokens cannot authenticate at the Firebase-ID-token admin endpoints; expiry, revocation, current owner membership, and operation scope are independently checked. Read-own uses both grant ID and owner identity. Another or newly issued grant cannot read the former grant’s orders; those remain available through normal web Admin Orders.
- Transactional reservation handles amount/count races and rechecks revoked/expired grants before creating the draft. The API has no generic action/update dispatcher. Prices, name limits, and checkout creation are shared with the web service.
- Raw credentials are neither logged nor persisted in server documents/browser storage. CLI credentials travel only to the fixed HTTPS function endpoint (no redirects). Local storage is an explicitly approved Keychain operation; tests mock it. Real issuance/login/Keychain behavior remains an activation smoke check, not a completed credential setup.

The review found and addressed the overlapping-rules risk. It is a static review plus application tests, not a Firestore Rules compiler/emulator verification.
