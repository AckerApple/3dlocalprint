import { createHash, randomUUID } from "node:crypto";

// SMTP acceptance and a Firestore commit cannot be atomic. Unknown outcomes are
// held for operator review, never automatically resent after a lease expires.
export async function deliverPaymentNotifications(db: any, ref: any, paymentId: string,
  recipients: { kind: "admin" | "customer"; email: string; send: () => Promise<string> }[], now = () => Date.now()) {
  let retryNeeded = false;
  const outcomes: Record<string, string> = {};
  for (const recipient of recipients) {
    const flag = recipient.kind === "admin" ? "notificationEmailStatus" : "customerOrderEmailStatus";
    const key = createHash("sha256").update(`${paymentId}:${recipient.kind}:${recipient.email.trim().toLowerCase()}`).digest("hex");
    const claimId = randomUUID();
    const claim = await db.runTransaction(async (tx: any) => {
      const data = (await tx.get(ref)).data() || {};
      if (data.paymentIntentId !== paymentId || !data.paidAt || !["paid", "closed"].includes(data.status)) return "stale_payment";
      if (data[flag] === "sent") return "sent";
      if (data.paymentNotificationCoordination !== "v1") return "legacy_review";
      if (!recipient.email) return "missing_recipient";
      const records = data.paymentNotifications || {}, previous = records[key];
      if (previous?.state === "sent") {
        tx.set(ref, { [flag]: "sent" }, { merge: true });
        return "sent";
      }
      if (previous?.state === "uncertain") return "uncertain";
      if (previous?.state === "sending") {
        if (previous.leaseExpiresAt > now()) return "sending";
        tx.set(ref, { paymentNotifications: { ...records, [key]: { ...previous, state: "uncertain", updatedAt: now() } }, [flag]: "delivery_uncertain" }, { merge: true });
        return "uncertain";
      }
      if (previous?.attempts >= 3) {
        tx.set(ref, { [flag]: "delivery_retry_exhausted" }, { merge: true });
        return "retry_exhausted";
      }
      if (previous?.nextRetryAt > now()) return "retry_wait";
      tx.set(ref, { paymentNotifications: { ...records, [key]: { state: "sending", claimId, attempts: (previous?.attempts || 0) + 1, leaseExpiresAt: now() + 120000, updatedAt: now() } } }, { merge: true });
      return "claimed";
    });
    if (claim !== "claimed") {
      outcomes[recipient.kind] = claim;
      if (claim === "retry_wait") retryNeeded = true;
      continue;
    }
    let state = "uncertain";
    try {
      const result = await recipient.send();
      state = result === "sent" ? "sent" : "retryable";
    } catch (error) {
      state = (error as any)?.deliveryOutcome === "not_accepted" ? "retryable" : "uncertain";
    }
    // A failed finalization leaves the durable sending claim in place. A later
    // invocation converts its expired lease to uncertain, not a duplicate send.
    await db.runTransaction(async (tx: any) => {
      const data = (await tx.get(ref)).data() || {}, records = data.paymentNotifications || {};
      if (records[key]?.claimId !== claimId) throw new Error("notification_claim_changed");
      tx.set(ref, { paymentNotifications: { ...records, [key]: { ...records[key], state, updatedAt: now(), nextRetryAt: state === "retryable" ? now() + 60000 : 0 } },
        ...(recipient.kind === "admin" ? { notificationEmail: recipient.email } : { customerOrderEmail: recipient.email }),
        [flag]: state === "sent" ? "sent" : state === "uncertain" ? "delivery_uncertain" : "delivery_retryable",
        [recipient.kind === "admin" ? "notificationEmailUpdatedAt" : "customerOrderEmailUpdatedAt"]: new Date(now()).toISOString(),
      }, { merge: true });
    });
    outcomes[recipient.kind] = state;
    if (state === "retryable") retryNeeded = true;
  }
  return { outcomes, retryNeeded };
}
