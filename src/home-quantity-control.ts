type HomeQuantityControlOptions = {
  initialQuantity?: number;
  getQuantityState?: () => number;
  setQuantityState?: (quantity: number) => void;
  onBeforeAction?: (event: Event) => void;
};

const clampQuantity = (value: number) => Math.max(1, Math.min(99, Math.floor(Number(value) || 1)));

export const createHomeQuantityControl = ({
  initialQuantity = 1,
  getQuantityState,
  setQuantityState,
  onBeforeAction,
}: HomeQuantityControlOptions) => {
  const wrap = document.createElement("div");
  wrap.className = "home-qty-wrap";

  const label = document.createElement("span");
  label.className = "home-qty-label";
  label.textContent = "Quantity";

  const control = document.createElement("div");
  control.className = "home-qty-control";

  const minus = document.createElement("button");
  minus.type = "button";
  minus.className = "ghost-button home-qty-btn";
  minus.textContent = "−";

  const plus = document.createElement("button");
  plus.type = "button";
  plus.className = "ghost-button home-qty-btn";
  plus.textContent = "+";

  const count = document.createElement("span");
  count.className = "home-qty-count";

  const getQuantity = () =>
    clampQuantity(typeof getQuantityState === "function" ? getQuantityState() : initialQuantity);

  const setQuantity = (nextValue: number) => {
    const normalized = clampQuantity(nextValue);
    if (typeof setQuantityState === "function") {
      setQuantityState(normalized);
    }
    control.innerHTML = "";
    if (normalized > 1) {
      control.append(minus);
    }
    count.textContent = String(normalized);
    control.append(count, plus);
  };

  plus.addEventListener("click", (event) => {
    onBeforeAction?.(event);
    setQuantity(getQuantity() + 1);
  });

  minus.addEventListener("click", (event) => {
    onBeforeAction?.(event);
    setQuantity(getQuantity() - 1);
  });

  setQuantity(getQuantity());
  wrap.append(label, control);

  return {
    element: wrap,
    getQuantity,
    setQuantity,
  };
};
