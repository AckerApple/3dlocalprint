import {
  tag,
  button,
  h2,
  output,
  dialog,
  div,
  onDestroy,
} from "taggedjs";

export const Modal = tag(({
  modalOpen = false,
  title = "",
  draggableTitle = false,
  className = "",
  cardClassName = "",
  bodyClassName = "",
  closeLabel = "Close",
  headerActions = () => null,
  onClose = () => {},
  onKeyDown = () => {},
  content = () => null,
}) => {
  Modal.inputs((args) => {
    [{
      modalOpen = false,
      title = "",
      draggableTitle = false,
      className = "",
      cardClassName = "",
      bodyClassName = "",
      closeLabel = "Close",
      headerActions = () => null,
      onClose = () => {},
      onKeyDown = () => {},
      content = () => null,
    }] = args;
    onClose = output(onClose);
    onKeyDown = output(onKeyDown);
    if (typeof headerActions !== "function") {
      headerActions = () => null;
    }
  });
  const dialogId = `modal-${Math.random().toString(36).slice(2, 9)}`;
  let offsetX = 0;
  let offsetY = 0;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragOriginX = 0;
  let dragOriginY = 0;
  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;

  const getDialog = () => document.getElementById(dialogId);
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const applyDialogTransform = () => {
    const dialogEl = getDialog();
    if (!dialogEl) return;
    dialogEl.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
  };

  const onDragMove = (event) => {
    const nextX = dragOriginX + (event.clientX - dragStartX);
    const nextY = dragOriginY + (event.clientY - dragStartY);
    offsetX = clamp(nextX, minX, maxX);
    offsetY = clamp(nextY, minY, maxY);
    applyDialogTransform();
  };

  const onDragEnd = () => {
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragEnd);
  };

  const onHeaderMouseDown = (event) => {
    if (!draggableTitle || event.button !== 0) return;
    const target = event.target instanceof HTMLElement ? event.target : null;
    if (target?.closest("button")) return;

    const dialogEl = getDialog();
    if (!dialogEl) return;

    const rect = dialogEl.getBoundingClientRect();
    const edgePadding = 16;
    minX = edgePadding - rect.left;
    maxX = window.innerWidth - rect.right - edgePadding;
    minY = edgePadding - rect.top;
    maxY = window.innerHeight - rect.bottom - edgePadding;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    dragOriginX = offsetX;
    dragOriginY = offsetY;

    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);
    event.preventDefault();
  };

  onDestroy(() => {
    onDragEnd();
  });

  const onBackdropClick = (event) => {
    if (event?.target instanceof HTMLDialogElement) {
      onClose();
    }
  };

  return [
    _=> {
      if (!modalOpen) return null;


      return dialog
        .id(dialogId)
        .class(_=> `qr-modal ${className}`.trim())
        .open(true)
        .onClick(onBackdropClick)
        .onCancel((event) => {
          event.preventDefault();
          onClose();
        })
        .onKeyDown((event) => onKeyDown(event))(
        div
          .class(_=> `qr-modal-card ${cardClassName}`.trim())(
          div
            .class(_=> `qr-modal-header${draggableTitle ? " is-draggable" : ""}`)
            .onMouseDown(onHeaderMouseDown)(
            h2.class`qr-modal-title`(title),
            div.class`qr-modal-actions`(
              _=> headerActions(),
              button
                .type`button`
                .class`qr-modal-close`
                .attr("aria-label", "Close")
                .onClick(onClose)(
                closeLabel
              )
            )
          ),
          div.class(_=> `qr-modal-body ${bodyClassName}`.trim())(
            _=> content()
          )
        )
      );
    }
  ];
});
