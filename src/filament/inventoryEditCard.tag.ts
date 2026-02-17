import {
  tag,
  div,
  button,
  a,
  label,
  input,
  select,
  option,
  span,
  output,
} from "taggedjs";
import { locations } from "./locations.array.js";
import { describeFilamentType } from "./filament-match-utils.js";
import { toFilamentPath } from "./path-utils.js";

const numberHandler = (item, key) => ({
  onChange: (event) => {
    item[key] = event?.target?.value ?? "";
  },
  onKeyup: (event) => {
    item[key] = event?.target?.value ?? "";
  },
});

export const inventoryEditCard = tag(
  (
    item,
    index,
    filamentTypes,
    toggleRowEdit,
    onSave,
    onDuplicate,
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
        onLocationChange,
        fixedLocation,
      ] = args;
      toggleRowEdit = output(toggleRowEdit)
      onSave = output(onSave)
      onDuplicate = output(onDuplicate)
      onLocationChange = output(onLocationChange)
    });
    let isDirty = false;

    const markDirty = () => {
      isDirty = true;
    };

    const handleFormChange = () => {
      isDirty = true;
    };

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
        .onKeydown((event) => {
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
              _=> (filamentTypes || []).map((type) =>
              option
                .value(type.filament_type_id)
                .selected(_=> item.filament_type_id === type.filament_type_id)(
                describeFilamentType(type) || type.label || ""
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
                ...locations.map((location) =>
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
            .onKeyup(numberHandler(item, "spool_inventory").onKeyup)()
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
