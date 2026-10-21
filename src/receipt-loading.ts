// Receipt details can lag the payment redirect; never infer payment from the URL.
export function createReceiptLoader(options: {
  fetchDetails: () => Promise<{ email: string; order: any }>;
  update: (state: { phase: string; email?: string; order?: any; message?: string }) => void;
  schedule?: (callback: () => void, delay: number) => any;
  cancel?: (timer: any) => void;
}) {
  const schedule = options.schedule || window.setTimeout.bind(window);
  const cancel = options.cancel || window.clearTimeout.bind(window);
  let generation = 0, timer: any, disposed = false;
  const stop = () => { generation++; if (timer !== undefined) cancel(timer); timer = undefined; };
  const start = () => {
    if (disposed) return;
    stop(); const current = generation;
    options.update({ phase: 'loading' });
    const attempt = async (number: number) => {
      if (disposed || current !== generation) return;
      try {
        const result = await options.fetchDetails();
        if (disposed || current !== generation) return;
        const paid = result.order?.status === 'paid';
        const complete = Array.isArray(result.order?.lineItems) && result.order.lineItems.length > 0;
        const terminal = ['canceled', 'closed', 'payment_failed'].includes(result.order?.status);
        if (paid && complete) { options.update({ phase: 'ready', ...result }); return; }
        if (terminal) { options.update({ phase: 'error', ...result, message: 'Payment was not completed for this order.' }); return; }
        options.update({ phase: 'pending', ...result, message: paid ? 'Loading receipt details…' : 'Waiting for payment confirmation…' });
      } catch (error) {
        if (disposed || current !== generation) return;
        if ((error as any)?.permanent) {
          options.update({ phase: 'error', message: 'This receipt link is invalid or unavailable.' }); return;
        }
        options.update({ phase: 'pending', message: 'Receipt details are not available yet. Retrying…' });
      }
      if (number < 8) timer = schedule(() => { timer = undefined; void attempt(number + 1); }, 1500);
      else options.update({ phase: 'error', message: 'Receipt details could not be confirmed yet. Please try again.' });
    };
    void attempt(1);
  };
  return { start, pause: stop, dispose: () => { stop(); disposed = true; } };
}
