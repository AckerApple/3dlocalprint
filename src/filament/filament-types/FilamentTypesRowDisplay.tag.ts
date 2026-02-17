import {
  tag,
  div,
  img,
  strong,
  button,
  input,
  label,
  select,
  option,
  a,
  SignalArray,
} from "taggedjs";
import { addBarcode, FilamentType, getBarcodeList, openBarcodeScanner, openQrScanner, removeBarcode, removeType, saveType, toggleExpanded, updateBarcode } from "../filament-types.tag";
import type { ManufacturerItem } from "../../types/filament.js";

const subMaterialTypes = ["silk", "matte"];

const toPickerHex = (value: unknown) => {
  const text = String(value || "").trim();
  if (/^#[0-9a-fA-F]{6}$/.test(text)) return text;
  if (/^[0-9a-fA-F]{6}$/.test(text)) return `#${text}`;
  return "#000000";
};

type FilamentTypeEditorProps = {
  item: FilamentType;
  manufacturers$: SignalArray<ManufacturerItem>;
  materialTypes: string[];
  withManufacturerEmoji: (text: string) => string;
};

type FilamentTypesRowDisplayProps = {
  types: FilamentType[];
  expandedTypeIds: Set<string>;
  manufacturers$: SignalArray<ManufacturerItem>;
  materialTypes?: string[];
  withManufacturerEmoji?: (text: string) => string;
};

export const FilamentTypesRowDisplay = tag(({
  types = [],
  expandedTypeIds = new Set(),
  manufacturers$,
  materialTypes = [],
  withManufacturerEmoji = (text) => text,
}: FilamentTypesRowDisplayProps) => {
  let groupTypesByManufacturer: [string, {manufacturer: ManufacturerItem, types: FilamentType[]}][] = []

  FilamentTypesRowDisplay.inputs((args) => {
    [{
      types = [],
      expandedTypeIds,
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
      strong.class`filament-type-group-title`(
        _=> manufacturer.iconUrl &&
          img({
            class: "filament-type-group-title-icon",
            src: manufacturer.iconUrl,
            alt: `${manufacturer.label} icon`,
          }),
        manufacturer.label === "Unknown" ? "🏭 Unknown" : manufacturer.label
      ),
      _=> types.map((item, index) =>
        div({
          class: "swatch-card",
          id: `filament-type-card-${item.filament_type_id || index}`,
        },
          div.class`filament-type-header`(
            div
              .class`summary-chip filament-type-swatch`
              .style(_=> `background:${item.hex || ""};`)(),
            div(
              strong(_=> item.label),
              div.class`filament-type-color`(
                _=> [item.color_name, item.material_type, item.sub_material_type]
                  .filter(Boolean)
                  .join(" • ")
              )
            ),
            div.class`filament-type-actions`(
              _=> item.url
                ? a
                    .class`ghost-button`
                    .href(item.url)
                    .attr("target", "_blank")
                    .attr("rel", "noopener noreferrer")(
                    "🔗 Link"
                  )
                : null,
              button
                .type`button`
                .class`ghost-button`
                .onClick(() => toggleExpanded(item))(
                _=> isExpanded(item) ? "Hide" : "✏️ Edit"
              ),
              button
                .type`button`
                .class`ghost-button delete-button`
                .onClick(() => removeType(index))(
                "🗑️ Remove"
              )
            )
          ),
          _=> isExpanded(item) &&
            FilamentTypeEditor({
              item,
              manufacturers$,
              materialTypes,
              withManufacturerEmoji,
            })
        ).key(item.filament_type_id || index)
      )
    ).key(manufacturer.label)
  })]
})

const FilamentTypeEditor = tag(({
  item,
  manufacturers$,
  materialTypes = [],
  withManufacturerEmoji = (text) => text,
}: FilamentTypeEditorProps) => {
  FilamentTypeEditor.updates((args) => {
    [{
      item,
      manufacturers$,
      materialTypes = [],
      withManufacturerEmoji = (text) => text,
    }] = args;
  });

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
        "🏭 Manufacturer",
        select
          .onChange((event) => {
            item.manufacturer = event?.target?.value || "";
          })(
          option
            .value``
            .selected(_=> !item.manufacturer)(
            withManufacturerEmoji("Select manufacturer")
          ),
          _=> manufacturers$.value.map((maker) => {
            const makerLabel = String(maker?.label || "").trim();
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
                  .value(barcode ?? "")
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
        "URL",
        input
          .type`url`
          .value(_=> item.url ?? "")
          .onInput((event) => {
            item.url = event.target.value;
          })()
      ),
      label(
        "Type ID",
        input
          .attr("readonly", true)
          .value(_=> item.filament_type_id || "")()
      )
    ),
    div.class`edit-card-footer`(
      button
        .type`button`
        .class`add-button`
        .onClick(() => saveType(item))(
        "💾 Save changes"
      )
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
