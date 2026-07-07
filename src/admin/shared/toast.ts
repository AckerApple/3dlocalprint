const ROOT_ID = "toast-root";
const DEFAULT_DURATION = 6000;

type ToastTone = "info" | "success" | "error";
type ToastOptions = {
  tone?: ToastTone;
  duration?: number;
};

const ensureRoot = () => {
  let root = document.getElementById(ROOT_ID);
  if (!root) {
    root = document.createElement("div");
    root.id = ROOT_ID;
    root.className = "toast-root";
  }
  if (!root.hasAttribute("popover")) {
    root.setAttribute("popover", "manual");
  }
  if (root.parentElement !== document.body) {
    document.body.appendChild(root);
  }
  const toastRoot = root as HTMLElement & { hidePopover?: () => void; showPopover?: () => void };
  if (toastRoot.showPopover) {
    try {
      if (root.matches(":popover-open") && toastRoot.hidePopover) {
        toastRoot.hidePopover();
      }
      toastRoot.showPopover();
    } catch (error) {
      console.warn("Toast popover failed, falling back to fixed root", error);
    }
  }
  return root;
};

const buildToast = (message: string, tone: ToastTone) => {
  const toast = document.createElement("div");
  toast.className = `toast toast-${tone}`;
  toast.setAttribute("role", "status");
  toast.textContent = message;
  return toast;
};

const showToast = (message: string, options: ToastOptions = {}) => {
  if (!message) return;
  const { tone = "info", duration = DEFAULT_DURATION } = options;
  const root = ensureRoot();
  const toast = buildToast(message, tone);
  root.appendChild(toast);

  const timeoutId = window.setTimeout(() => {
    toast.remove();
  }, duration);

  toast.addEventListener(
    "click",
    () => {
      window.clearTimeout(timeoutId);
      toast.remove();
    },
    { once: true }
  );
};

export const toast = {
  info: (message: string, options?: Omit<ToastOptions, "tone">) =>
    showToast(message, { ...options, tone: "info" }),
  success: (message: string, options?: Omit<ToastOptions, "tone">) =>
    showToast(message, { ...options, tone: "success" }),
  error: (message: string, options?: Omit<ToastOptions, "tone">) =>
    showToast(message, { ...options, tone: "error" }),
};
