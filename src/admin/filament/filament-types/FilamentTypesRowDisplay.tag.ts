import {
  tag,
  div,
  img,
  strong,
  span,
  button,
  input,
  label,
  select,
  option,
  a,
  SignalArray,
} from "taggedjs";
import { addBarcode, cancelAddType, FilamentComment, FilamentType, getBarcodeList, isAddModeType, openBarcodeScanner, openQrScanner, removeBarcode, removeType, saveType, toggleExpanded, updateBarcode } from "../filament-types.tag.js";
import { toAdminPath } from "../../shared/path-utils.js";
import type { ManufacturerItem } from "../../../types/filament.js";

const subMaterialTypes = ["silk", "matte"];
const maxSingleRating = 5;

const clampSingleRating = (value: unknown) =>
  Math.max(0, Math.min(maxSingleRating, Math.round(Number(value) || 0)));

const toSingleRatingStars = (value: unknown) => {
  const rating = clampSingleRating(value);
  if (!rating) return "";
  return `${"⭐️".repeat(rating)}${"☆".repeat(maxSingleRating - rating)}`;
};

const hasHexColor = (value: unknown) =>
  /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(String(value || "").trim());

const hasSwatchNumber = (value: unknown) => {
  if (value === null || value === undefined || value === "") return false;
  const numeric = Number(value);
  return Number.isFinite(numeric);
};

const isUnknownManufacturer = (value: unknown) =>
  String(value || "").trim().toLowerCase() === "unknown";

const normalizeComments = (value: unknown): FilamentComment[] =>
  (Array.isArray(value) ? value : [])
    .map((comment) => {
      if (!comment || typeof comment !== "object") return null;
      const text = String((comment as { text?: unknown }).text || "").trim();
      if (!text) return null;
      return {
        id: String((comment as { id?: unknown }).id || "").trim(),
        text,
        user_email: String((comment as { user_email?: unknown }).user_email || "").trim(),
        user_photo_url: String((comment as { user_photo_url?: unknown }).user_photo_url || "").trim(),
      };
    })
    .filter((comment): comment is FilamentComment => Boolean(comment?.id && comment?.text));

const makeCommentId = () =>
  globalThis.crypto?.randomUUID
    ? crypto.randomUUID()
    : `comment_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

const commenterInitial = (value: unknown) =>
  String(value || "").trim().charAt(0).toUpperCase() || "?";

const toPickerHex = (value: unknown) => {
  const text = String(value || "").trim();
  if (/^#[0-9a-fA-F]{6}$/.test(text)) return text;
  if (/^[0-9a-fA-F]{6}$/.test(text)) return `#${text}`;
  return "#000000";
};

const toValidHttpUrl = (value: unknown) => {
  const raw = String(value || "").trim();
  if (!raw) return "";
  try {
    const parsed = new URL(raw);
    return /^https?:$/i.test(parsed.protocol) ? parsed.href : "";
  } catch {
    return "";
  }
};

const getManufacturerOptions = (manufacturers: ManufacturerItem[] = []) => {
  const labels = new Set<string>();
  (Array.isArray(manufacturers) ? manufacturers : []).forEach((maker) => {
    const label = String(maker?.label || "").trim();
    if (label) labels.add(label);
  });
  labels.add("Sunlu");
  return Array.from(labels).sort((a, b) => a.localeCompare(b));
};

type FilamentTypeEditorProps = {
  item: FilamentType;
  isAddMode?: boolean;
  onSave?: (item: FilamentType) => void | Promise<void>;
  saveLabel?: string;
  saveDisabled?: boolean;
  onCancelAdd?: (item: FilamentType) => void;
  currentUser?: { email?: string; photoURL?: string } | null;
  manufacturers$: SignalArray<ManufacturerItem>;
  materialTypes: string[];
  withManufacturerEmoji: (text: string) => string;
};

type FilamentTypesRowDisplayProps = {
  types: FilamentType[];
  expandedTypeIds: Set<string>;
  currentUser?: { email?: string; photoURL?: string } | null;
  manufacturers$: SignalArray<ManufacturerItem>;
  materialTypes?: string[];
  withManufacturerEmoji?: (text: string) => string;
};

export const FilamentTypesRowDisplay = tag(({
  types = [],
  expandedTypeIds = new Set(),
  currentUser = null,
  manufacturers$,
  materialTypes = [],
  withManufacturerEmoji = (text) => text,
}: FilamentTypesRowDisplayProps) => {
  let groupTypesByManufacturer: [string, {manufacturer: ManufacturerItem, types: FilamentType[]}][] = []

  FilamentTypesRowDisplay.inputs((args) => {
    [{
      types = [],
      expandedTypeIds,
      currentUser = null,
      manufacturers$,
      materialTypes = [],
      withManufacturerEmoji = (text) => text,
    }] = args;

    groupTypesByManufacturer = getGroupTypesByManufacturer(types, manufacturers$.value)
  });

  const isExpanded = (item) => {
    if (!item?.filament_type_id) return false;
    return expandedTypeIds.has(item.filament_type_id);
  };

  return [_=> groupTypesByManufacturer.map(([, {manufacturer, types}]) => {
    return div.class`filament-type-group`(
      _=> !isUnknownManufacturer(manufacturer?.label)
        ? strong.class`filament-type-group-title`(
            _=> manufacturer.iconUrl &&
              img
                .class("filament-type-group-title-icon")
                .src(manufacturer.iconUrl)
                .alt(`${manufacturer.label} icon`)
    ,
            manufacturer.label
          )
        : null,
      div.class`filament-type-group-grid`(
        _=> types.map((item, index) =>
          div.id(`filament-type-card-${item.filament_type_id || index}`)
            .class("swatch-card")
            (
              div.class`filament-type-header`(
                _=> hasHexColor(item?.hex)
                  ? div
                      .class`summary-chip filament-type-swatch`
                      .style(_=> `background:${item.hex || ""};`)()
                  : null,
                div(
                  _=> hasSwatchNumber(item?.number)
                    ? div.class`filament-type-number`(_=> `#${item.number}`)
                    : null,
                  strong(_=> item.label),
                  div.class`filament-type-color`(
                    _=> [item.color_name, item.material_type, item.sub_material_type]
                      .filter(Boolean)
                      .join(" • ")
                  ),
                  _=> {
                    const stars = toSingleRatingStars(item.single_rating);
                    return stars ? div.class`filament-type-single-rating`(stars) : null;
                  }
                ),
                div.class`filament-type-actions`(
                  _=> item.url
                    ? a
                        .class`ghost-button filament-type-action-pill filament-type-action-first`
                        .href(item.url)
                        .attr("aria-label", "Open filament link")
                        .target`_blank`
                        .rel`noopener noreferrer`(
                        "🔗"
                      )
                    : null,
                  button
                    .type`button`
                    .class(_=> `ghost-button filament-type-action-pill ${item.url ? "filament-type-action-middle" : "filament-type-action-first"}`)
                    .attr("aria-label", _=> isExpanded(item) ? "Hide editor" : "Edit filament type")
                    .onClick(() => toggleExpanded(item))(
                    _=> isExpanded(item) ? "🙈" : "✏️"
                  ),
                  button
                    .type`button`
                    .class`ghost-button delete-button filament-type-action-pill filament-type-action-last`
                    .attr("aria-label", "Remove filament type")
                    .onClick(() => removeType(index))(
                    "🗑️"
                  )
                )
              ),
              _=> isExpanded(item) &&
                FilamentTypeEditor({
                  item,
                  isAddMode: isAddModeType(item),
                  currentUser,
                  manufacturers$,
                  materialTypes,
                  withManufacturerEmoji,
                })
            ).key(item.filament_type_id || index)
        )
      )
    ).key(manufacturer.label)
  })]
})

export const FilamentTypeEditor = tag(({
  item,
  isAddMode = false,
  onSave,
  saveLabel = "💾 Save changes",
  saveDisabled = false,
  onCancelAdd,
  currentUser = null,
  manufacturers$,
  materialTypes = [],
  withManufacturerEmoji = (text) => text,
}: FilamentTypeEditorProps) => {
  let addingComment = false;
  let newCommentText = "";
  let editingCommentId = "";
  let editingCommentText = "";

  FilamentTypeEditor.updates((args) => {
    [{
      item,
      isAddMode = false,
      onSave,
      saveLabel = "💾 Save changes",
      saveDisabled = false,
      onCancelAdd,
      currentUser = null,
      manufacturers$,
      materialTypes = [],
      withManufacturerEmoji = (text) => text,
    }] = args;
  });

  const comments = () => normalizeComments(item.comments);
  const setComments = (next: FilamentComment[]) => {
    item.comments = next;
  };

  const commitAddComment = () => {
    const text = String(newCommentText || "").trim();
    if (!text) return;
    setComments([
      ...comments(),
      {
        id: makeCommentId(),
        text,
        user_email: String(currentUser?.email || ""),
        user_photo_url: String(currentUser?.photoURL || ""),
      },
    ]);
    addingComment = false;
    newCommentText = "";
  };

  const startEditComment = (comment: FilamentComment) => {
    editingCommentId = comment.id;
    editingCommentText = comment.text;
  };

  const commitEditComment = () => {
    const text = String(editingCommentText || "").trim();
    if (!editingCommentId || !text) return;
    setComments(
      comments().map((comment) =>
        comment.id === editingCommentId
          ? { ...comment, text }
          : comment
      )
    );
    editingCommentId = "";
    editingCommentText = "";
  };

  const deleteComment = (commentId: string) => {
    setComments(comments().filter((comment) => comment.id !== commentId));
    if (editingCommentId === commentId) {
      editingCommentId = "";
      editingCommentText = "";
    }
  };

  const handleSave = () => {
    if (typeof onSave === "function") {
      return onSave(item);
    }
    return saveType(item);
  };

  const handleCancelAdd = () => {
    if (typeof onCancelAdd === "function") {
      onCancelAdd(item);
      return;
    }
    cancelAddType(item);
  };

  return div.class`filament-type-editor`(
    div.class`fields`(
      label(
        "Number",
        input
          .type`number`
          .value(_=> item.number ?? "")
          .onInput((event) => {
            item.number = Number(event.target.value);
          })()
      ),
      label(
        "Label",
        input
          .placeholder`optional`
          .value(_=> item.label ?? "")
          .onInput((event) => {
            item.label = event.target.value;
          })()
      ),
      label(
        "Single Rating",
        div.class`single-rating-control`(
          ...Array.from({ length: maxSingleRating }, (_, index) => {
            const rating = index + 1;
            return button
              .type`button`
              .class(_=> `single-rating-star ${clampSingleRating(item.single_rating) >= rating ? "is-active" : ""}`)
              .attr("aria-label", `Set single rating to ${rating} star${rating === 1 ? "" : "s"}`)
              .onClick(() => {
                item.single_rating = rating;
              })(
              "⭐️"
            );
          }),
          button
            .type`button`
            .class`ghost-button`
            .onClick(() => {
              item.single_rating = 0;
            })(
            "Clear"
          )
        )
      ),
      label(
        div.class`field-label-row`(
          span("🏭 Manufacturer"),
          a
            .class`field-label-quick-link`
            .href(toAdminPath("filament/manufacturers.html"))
            .attr("title", "View manufacturers")
            ("👁️")
        ),
        select
          .onChange((event) => {
            item.manufacturer = event?.target?.value || "";
          })(
          option
            .value``
            .selected(_=> !item.manufacturer)(
            withManufacturerEmoji("Select manufacturer")
          ),
          _=> getManufacturerOptions(manufacturers$.value).map((makerLabel) => {
            return option
              .value(makerLabel)
              .selected(_=> item.manufacturer === makerLabel)(makerLabel)
              .key(makerLabel);
          })
        )
      ),
      label(
        "Material Type",
        select
          .onChange((event) => {
            item.material_type = event?.target?.value || "";
          })(
          option
            .value``
            .selected(_=> !item.material_type)("Select material"),
          _=> materialTypes.map((materialType) =>
            option
              .value(materialType)
              .selected(_=> item.material_type === materialType)(materialType)
          )
        )
      ),
      label(
        "Sub Material Type",
        select
          .onChange((event) => {
            item.sub_material_type = event?.target?.value || "";
          })(
          option
            .value``
            .selected(_=> !item.sub_material_type)("Select sub material (optional)"),
          _=> subMaterialTypes.map((subMaterialType) =>
            option
              .value(subMaterialType)
              .selected(_=> item.sub_material_type === subMaterialType)(subMaterialType)
          )
        )
      ),
      label(
        "Color name",
        input
          .value(_=> item.color_name ?? "")
          .onInput((event) => {
            item.color_name = event.target.value;
          })()
      ),
      label(
        "Hex Color",
        div.class`hex-input-row`(
          input
            .value(_=> item.hex ?? "")
            .onInput((event) => {
              item.hex = event.target.value;
            })(),
          input
            .type`color`
            .value(_=> toPickerHex(item.hex))
            .onChange((event) => {
              item.hex = event.target.value;
            })()
        )
      ),
      label(
        "Filament code",
        input
          .value(_=> item.swatch_code ?? "")
          .onInput((event) => {
            item.swatch_code = event.target.value;
          })()
      ),
      label(
        "QR Search Data",
        div.class`qr-input-row`(
          input
            .class`qr-edit-input`
            .value(_=> item.qr_search_data ?? "")
            .onInput((event) => {
              item.qr_search_data = event.target.value;
            })(),
          button
            .type`button`
            .class`qr-scan-button`
            .onClick(() => openQrScanner(item))(
            "Scan QR"
          )
        )
      ),
      label(
        "Bar Codes",
        div.class`barcode-inputs`(
          _=> {
            const barcodes = getBarcodeList(item);
            return barcodes.map((barcode, barcodeIndex) =>
              div.class`barcode-entry`(
                input
                  .class`qr-edit-input`
                  .value(_=> barcode ?? "")
                  .onInput((event) => updateBarcode(item, barcodeIndex, event.target.value))(),
                button
                  .type`button`
                  .class`ghost-button barcode-remove`
                  .onClick(() => removeBarcode(item, barcodeIndex))(
                  "−"
                )
              ).key(`${item.filament_type_id}-${barcodeIndex}`)
            );
          },
          div.class`barcode-actions`(
            button
              .type`button`
              .class`ghost-button`
              .onClick(() => addBarcode(item))(
              "➕ Add barcode"
            ),
            button
              .type`button`
              .class`qr-scan-button`
              .onClick(() => openBarcodeScanner(item))(
              "Scan barcode"
            )
          )
        )
      ),
      label(
        div.class`url-label-row`(
          "URL",
          _=> {
            const href = toValidHttpUrl(item.url);
            return href
              ? a
                  .class`url-go-link`
                  .href(href)
                  .target`_blank`
                  .rel`noopener noreferrer`
                  .attr("aria-label", "Visit filament URL")(
                  "go"
                )
              : null;
          }
        ),
        div.class`qr-input-row`(
          input
            .type`url`
            .value(_=> item.url ?? "")
            .onInput((event) => {
              item.url = event.target.value;
            })()
        )
      ),
      label(
        "Type ID",
        input
          .readonly`true`
          .value(_=> item.filament_type_id || "")()
      ),
      div.class`filament-comments-block`(
        div.class`filament-comments-header`(
          strong("Comments"),
          _=> !addingComment
            ? button
                .type`button`
                .class`ghost-button`
                .onClick(() => {
                  addingComment = true;
                  newCommentText = "";
                })(
                "➕ Add comment"
              )
            : null
        ),
        _=> addingComment
          ? div.class`filament-comment-edit`(
              input
                .placeholder`Write a comment`
                .value(_=> newCommentText)
                .onInput((event) => {
                  newCommentText = String(event.target.value || "");
                })(),
              button
                .type`button`
                .class`add-button`
                .onClick(commitAddComment)(
                "Save"
              ),
              button
                .type`button`
                .class`ghost-button`
                .onClick(() => {
                  addingComment = false;
                  newCommentText = "";
                })(
                "Cancel"
              )
            )
          : null,
        _=> comments().map((comment) =>
          div.class`filament-comment-row`(
            comment.user_photo_url
              ? img
                  .class`filament-comment-avatar`
                  .src(comment.user_photo_url)
                  .alt(comment.user_email || "comment author")
              : div.class`filament-comment-avatar filament-comment-avatar-fallback`(
                  commenterInitial(comment.user_email)
                ),
            editingCommentId === comment.id
              ? div.class`filament-comment-edit`(
                  input
                    .value(_=> editingCommentText)
                    .onInput((event) => {
                      editingCommentText = String(event.target.value || "");
                    })(),
                  button
                    .type`button`
                    .class`add-button`
                    .onClick(commitEditComment)(
                    "Save"
                  ),
                  button
                    .type`button`
                    .class`ghost-button`
                    .onClick(() => {
                      editingCommentId = "";
                      editingCommentText = "";
                    })(
                    "Cancel"
                  )
                )
              : div.class`filament-comment-text`(comment.text),
            div.class`filament-comment-actions`(
              button
                .type`button`
                .class`ghost-button`
                .onClick(() => startEditComment(comment))(
                "✏️"
              ),
              button
                .type`button`
                .class`ghost-button delete-button`
                .onClick(() => deleteComment(comment.id))(
                "🗑️"
              )
            )
          ).key(comment.id)
        )
      )
    ),
    div.class`edit-card-footer`(
      button
        .type`button`
        .class`add-button`
        .disabled(_=> saveDisabled)
        .onClick(handleSave)(
        _=> saveLabel
      ),
      _=> isAddMode
        ? button
            .type`button`
            .class`ghost-button delete-button`
            .onClick(handleCancelAdd)(
            "Cancel add"
          )
        : null
    )
  );
});

const getGroupTypesByManufacturer = (
  items: FilamentType[],
  manufacturers: ManufacturerItem[],
) => {
  const groups = new Map<string, {
    manufacturer: ManufacturerItem,
    types: FilamentType[],
  }>()
  
  items.forEach((item) => {
    const key = item.manufacturer || "Unknown";
    const manufacturer = manufacturers.find(m => m.label === item.manufacturer) || {
      label: key,
      iconUrl: "",
    }

    if (!groups.has(key)) {
      groups.set(key, {types: [], manufacturer});
    }
    const x = groups.get(key)
    x.manufacturer = manufacturer
    x.types.push(item)
  });

  return Array.from(groups.entries()).sort(([a], [b]) => {
    const aUnknown = a === "Unknown";
    const bUnknown = b === "Unknown";
    if (aUnknown && !bUnknown) return -1;
    if (!aUnknown && bUnknown) return 1;
    return a.localeCompare(b);
  });
};
