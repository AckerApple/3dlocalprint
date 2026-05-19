import { tag, div, span, button } from "taggedjs";

export type HomeQuantityControlOptions = {
  initialQuantity?: number;
  getQuantityState: () => number;
  setQuantityState: (quantity: number) => void;
  onBeforeAction?: (event: Event) => void;
  onChange?: (quantity: number) => void;
};

const clampQuantity = (value: number) => Math.max(1, Math.min(99, Math.floor(Number(value) || 1)));

export const getHomeQuantity = ({
  initialQuantity = 1,
  getQuantityState,
}: Pick<HomeQuantityControlOptions, "initialQuantity" | "getQuantityState">) =>
  clampQuantity(typeof getQuantityState === "function" ? getQuantityState() : initialQuantity);

export const setHomeQuantity = (
  nextValue: number,
  {
    setQuantityState,
    onChange,
  }: Pick<HomeQuantityControlOptions, "setQuantityState" | "onChange">,
) => {
  const normalized = clampQuantity(nextValue);
  setQuantityState?.(normalized);
  onChange?.(normalized);
  return normalized;
};

export const HomeQuantityControl = tag(({
  initialQuantity = 1,
  getQuantityState,
  setQuantityState,
  onBeforeAction,
  onChange,
}: HomeQuantityControlOptions) => {
  let quantity = getHomeQuantity({ initialQuantity, getQuantityState });

  HomeQuantityControl.inputs(x => {
    [{ setQuantityState, getQuantityState }] = x
    setQuantityState = tag.output( setQuantityState )
    quantity = getHomeQuantity({ initialQuantity, getQuantityState });
  })

  const setQuantity = (event: Event, nextValue: number) => {
    onBeforeAction?.(event);
    setHomeQuantity(nextValue, { setQuantityState, onChange });
  };

  return div.class`home-qty-wrap`(
    span.class`home-qty-label`("Quantity"),
    div.class`home-qty-control`(
      _=> quantity > 1
        ? button
            .type`button`
            .class`ghost-button home-qty-btn`
            .onClick((event) => setQuantity(event, quantity - 1))(
            "-"
          )
        : null,
      span.class`home-qty-count`(_=> String(quantity)),
      button
        .type`button`
        .class`ghost-button home-qty-btn`
        .onClick((event) => setQuantity(event, quantity + 1))(
        "+"
      )
    )
  );
});
