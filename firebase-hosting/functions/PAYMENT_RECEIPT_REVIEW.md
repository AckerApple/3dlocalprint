# Receipt, link previews, and payment notification review

Local only; publication requires approval. No emails, Stripe charges, order edits,
short-link tokens, IAM changes, credential changes, or live replay was performed.

## Notification behavior

Both signed Stripe success handlers use the same verified session and a Firestore
transaction to claim each order/payment/recipient delivery. Claims are keyed by a
SHA-256 of the payment, role and normalized destination (no address in the key).
Existing `sent` flags win. Previously paid records without coordination metadata
are held as legacy and never automatically replayed. Receipt backfill initializes
coordination for newly paid records so it cannot suppress the initial emails.

Each claim has a two-minute lease. Successful SMTP DATA acceptance marks sent;
QUIT failure cannot invalidate acceptance. Confirmed nonacceptance retries after
60 seconds, at most three attempts, using subsequent Stripe delivery attempts;
retryable processing returns HTTP503. No background worker or new collection is
introduced. Recipient failures are independent. Unknown post-DATA transport
outcomes, expired send leases, or accepted messages whose final database commit
failed are held as uncertain. Inspect provider delivery records before an explicit
admin resend: SMTP and Firestore cannot provide atomic exactly-once delivery.
Existing authenticated manual resend actions remain explicit operator actions.

## Tax and receipt

Verified expanded Stripe price `tax_behavior` is persisted and allowlisted to
buyer endpoints. Only explicit inclusive semantics produce “Tax included” and
“Subtotal (tax included)”. Exclusive additive totals keep existing labels; ambiguous
legacy/mixed or unreconciled amounts are labeled recorded with an explanatory
note. Stored financial amounts are never recalculated. The existing paid $1 record
has no new taxBehavior metadata, so it receives legacy wording unless separately
reconciled with verified Stripe evidence; no live backfill is authorized here.

Receipt details load immediately beside a spinner, independently of optional
catalog links. Pending details automatically retry eight times at 1.5-second
intervals, with genuine errors and manual retry, generation guards and navigation
cleanup. Small read-only TaggedJS render trees are explicitly torn down before
replacement to avoid stale conditional/listener contexts.

## Publication scope

Frontend public HTML/required bundles: receipt, customer order page, branded static
Open Graph/Twitter previews using the existing public logo. Static metadata never
contains order IDs, emails, tokens or private images. iMessage caching cannot be
guaranteed without device testing.

Backend functions only: `stripeWebhook`, `getPublicOrderReceiptLink`, `getPublicOrder`,
`resendOrderNotification`, `resendCustomerOrderEmail`. Shared SMTP behavior is
included in these deployed function revisions only. No rules/index/Hosting/IAM or
secret deployment is required. No historical event replay or order migration is
part of publication.

Checks use mock Stripe, Firestore and SMTP/TLS; concurrency, event replay/order,
partial failures, safe retries, uncertainty, legacy sent state and tax semantics
are covered. Java/Firestore emulator is not used. Existing frontend type errors
must be reported separately from passing backend and focused tests.

Reference: https://docs.stripe.com/webhooks documents duplicate and unordered
events and webhook retries; coordination is by payment and recipient so distinct
success events for one payment cannot duplicate mail.
