import {
  tag,
  div,
  button,
  a,
  label,
  input,
  select,
  option,
  optgroup,
  span,
  output,
} from "taggedjs";
import { locations } from "./locations.array.js";
import { describeFilamentType } from "./filament-match-utils.js";
import { toFilamentPath } from "./path-utils.js";
import {
  describeStorageLocations,
  getStorageLocationsTotal,
  normalizeStorageLocations,
} from "./storage-locations.js";

const toDraftStorageLocations = (value = []) =>
  (Array.isArray(value) ? value : []).map((entry) => ({
    name: String(entry?.name || ""),
    quantity: Math.max(0, Math.floor(Number(entry?.quantity) || 0)),
  }));

const numberHandler = (item, key) => ({
  onChange: (event) => {
    item[key] = event?.target?.value ?? "";
  },
  onKeyup: (event) => {
    item[key] = event?.target?.value ?? "";
  },
});

const getFilamentTypeGroups = (filamentTypes = []) => {
  const groups = new Map();

  (Array.isArray(filamentTypes) ? filamentTypes : []).forEach((type) => {
    const manufacturer = String(type?.manufacturer || "").trim() || "Unknown";
    if (!groups.has(manufacturer)) {
      groups.set(manufacturer, []);
    }
    groups.get(manufacturer).push(type);
  });

  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([manufacturer, types]) => [
      manufacturer,
      [...types].sort((a, b) =>
        String(a?.label || "").localeCompare(String(b?.label || ""))
      ),
    ]);
};

export const inventoryEditCard = tag(
  (
    item,
    index,
    filamentTypes,
    toggleRowEdit,
    onSave,
    onDuplicate,
    onDelete,
    onLocationChange,
    fixedLocation = ""
  ) => {
    inventoryEditCard.inputs((args) => {
      [
        item,
        index,
        filamentTypes,
        toggleRowEdit,
        onSave,
        onDuplicate,
        onDelete,
        onLocationChange,
        fixedLocation,
      ] = args;
      toggleRowEdit = output(toggleRowEdit)
      onSave = output(onSave)
      onDuplicate = output(onDuplicate)
      onDelete = output(onDelete)
      onLocationChange = output(onLocationChange)
    });
    let isDirty = false;

    const markDirty = () => {
      isDirty = true;
    };

    const handleFormChange = () => {
      isDirty = true;
    };

    item.storage_locations = toDraftStorageLocations(item?.storage_locations);

    const triggerSave = () => {
      if (!onSave || !isDirty) return;
      const result = onSave();

      const finish = () => {
        isDirty = false;
        toggleRowEdit(index, item?.location ?? "");
      };

      if (result && typeof result.then === "function") {
        result.then(finish);
        return;
      }
      finish();
    };

    const triggerDuplicate = () => {
      if (!onDuplicate) return;
      onDuplicate(index);
    };

    const triggerDelete = () => {
      if (!onDelete) return;
      onDelete(index);
    };

    const updateLocation = (event) => {
      const nextValue = event?.target?.value || "";
      item.location = nextValue;
      if (typeof onLocationChange === "function") {
        onLocationChange(index, nextValue);
      }
      markDirty();
    };

    const editFilamentHref = () => {
      if (!item?.filament_type_id) return toFilamentPath("filament-types.html");
      return `${toFilamentPath("filament-types.html")}?edit=${encodeURIComponent(item.filament_type_id)}`;
    };
    const filamentTypeGroups = getFilamentTypeGroups(filamentTypes);

    const addStorageLocation = () => {
      item.storage_locations = [
        ...(Array.isArray(item.storage_locations) ? item.storage_locations : []),
        { name: "", quantity: 1 },
      ];
      markDirty();
    };

    const removeStorageLocation = (entryIndex: number) => {
      item.storage_locations = (Array.isArray(item.storage_locations) ? item.storage_locations : [])
        .filter((_, indexToKeep) => indexToKeep !== entryIndex);
      markDirty();
    };

    const updateStorageLocationName = (entryIndex: number, value: string) => {
      const next = [...(Array.isArray(item.storage_locations) ? item.storage_locations : [])];
      if (!next[entryIndex]) return;
      next[entryIndex].name = String(value || "");
      item.storage_locations = next;
      markDirty();
    };

    const updateStorageLocationQuantity = (entryIndex: number, value: string) => {
      const next = [...(Array.isArray(item.storage_locations) ? item.storage_locations : [])];
      if (!next[entryIndex]) return;
      const quantity = Math.max(0, Math.floor(Number(value) || 0));
      next[entryIndex].quantity = quantity;
      item.storage_locations = next;
      markDirty();
    };

    const storageLocationsTotal = () =>
      getStorageLocationsTotal(normalizeStorageLocations(item?.storage_locations));

    return div.class`swatch-card`(
      div.class`edit-card-header`(
        span.class`edit-card-title`(
          _=> describeFilamentType(
            filamentTypes?.find((type) =>
              type.filament_type_id === item.filament_type_id
            )
          ) || "Filament inventory"
        )
      ),
      div
        .class`fields`
        .onInput(handleFormChange)
        .onChange(handleFormChange)
        .onKeyDown((event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            triggerSave();
          }
        })(
        label(
          "Filament type",
          select
            .onChange((event) => {
              item.filament_type_id = event?.target?.value || "";
              markDirty();
            })(
            option
              .value``
              .selected(_=> !item.filament_type_id)
              ("Select filament type"),
            _=> filamentTypeGroups.map(([manufacturer, types]) =>
              optgroup
                .attr("label", manufacturer === "Unknown" ? "🏭 Unknown" : `${manufacturer}`)(
                types.map((type) =>
                  option
                    .value(type.filament_type_id)
                    .selected(_=> item.filament_type_id === type.filament_type_id)(
                    describeFilamentType(type, { includeManufacturer: false }) || type.label || ""
                  )
                )
              )
            )
          )
        ),
        fixedLocation
          ? div(
              label("📍 Location"),
              span.class`meta-value`(fixedLocation)
            )
          : label(
              "📍 Location",
              select
                .onChange(updateLocation)(
                option
                  .value``
                  .selected(_=> !item.location)("Select location"),
                locations.map((location) =>
                  option
                    .value(location)
                    .selected(_=> item.location === location)(location)
                    .key(location)
                )
              )
            ),
        label(
          "Spool Inventory",
          input
            .type`number`
            .value(_=> item.spool_inventory ?? "")
            .onChange(numberHandler(item, "spool_inventory").onChange)
            .onKeyUp(numberHandler(item, "spool_inventory").onKeyup)()
        ),
        div.class`inventory-storage-section`(
          div.class`inventory-storage-header`(
            span.class`inventory-storage-title`("Physical storage breakdown"),
            span.class`inventory-storage-subtitle`("Optional: split this inventory across shelf/rack/bin spots")
          ),
          div.class`inventory-storage-list`(
            _=> (Array.isArray(item.storage_locations) ? item.storage_locations : []).map((entry, entryIndex) =>
              div.class`inventory-storage-row`(
                input
                  .attr("placeholder", "e.g. Shelf A / Rack 2 / Bin 3")
                  .value(() => entry?.name || "")
                  .onInput((event) =>
                    updateStorageLocationName(entryIndex, event?.target?.value || "")
                  )(),
                input
                  .type`number`
                  .attr("min", "0")
                  .attr("step", "1")
                  .attr("placeholder", "Qty")
                  .value(() => entry?.quantity ?? 0)
                  .onInput((event) =>
                    updateStorageLocationQuantity(entryIndex, event?.target?.value || "")
                  )(),
                button
                  .type`button`
                  .class`ghost-button delete-button`
                  .onClick(() => removeStorageLocation(entryIndex))(
                  "Remove"
                )
              ).key(`storage-location-${entryIndex}`)
            )
          ),
          div.class`inventory-storage-actions`(
            button
              .type`button`
              .class`ghost-button`
              .onClick(addStorageLocation)(
              "+ Add storage spot"
            ),
            _=> {
              const normalized = normalizeStorageLocations(item?.storage_locations);
              const total = storageLocationsTotal();
              const spoolCount = Number(item?.spool_inventory) || 0;
              if (!normalized.length) return "";
              return div.class`inventory-storage-total`(
                `Breakdown total: ${total} spool${total === 1 ? "" : "s"}`,
                total !== spoolCount
                  ? button
                      .type`button`
                      .class`ghost-button`
                      .onClick(() => {
                        item.spool_inventory = total;
                        markDirty();
                      })(
                      "Use this total"
                    )
                  : span.class`inventory-storage-match`("Matches spool inventory")
              );
            },
            _=> {
              const normalized = normalizeStorageLocations(item?.storage_locations);
              if (!normalized.length) return "";
              return div.class`inventory-storage-summary`(
                `Saved as: ${describeStorageLocations(normalized)}`
              );
            }
          )
        )
      ),
      div.class`edit-card-footer`(
        onSave
          ? button
              .type`button`
              .class`add-button`
              .disabled(_=> !isDirty)
              .onClick(triggerSave)(
              "💾 Save"
            )
          : null,
        onDuplicate
          ? button
              .type`button`
              .class`ghost-button`
              .onClick(triggerDuplicate)(
              "🧬 Duplicate"
            )
          : null,
        onDelete
          ? button
              .type`button`
              .class`ghost-button delete-button`
              .onClick(triggerDelete)(
              "🗑️ Delete"
            )
          : null,
        a
          .class`ghost-button`
          .href(_=> editFilamentHref())(
          "✏️ Edit filament"
        ),
        button
          .type`button`
          .class`ghost-button`
          .onClick(() => toggleRowEdit(index, item?.location ?? ""))
          .attr("aria-label", "Stop editing inventory")(
          "Done"
        )
      )
    );
  }
);
