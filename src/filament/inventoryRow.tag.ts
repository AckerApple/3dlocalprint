import { tag, noElement, output } from "taggedjs";
import { inventoryEditCard } from "./inventoryEditCard.tag.js";
import { inventorySummaryRow } from "./inventorySummaryRow.tag.js";
import { updateEditingLocation } from "./filamentDisplayFunctions.js";

export const InventoryRow = tag(
  (
    item,
    type,
    index,
    isEditMode,
    toggleRowEdit,
    filamentTypes,
    onSave,
    onDuplicate,
    onDelete,
    fixedLocation = ""
  ) => {
    InventoryRow.inputs((args) => {
      [
        item,
        type,
        index,
        isEditMode,
        toggleRowEdit,
        filamentTypes,
        onSave,
        onDuplicate,
        onDelete,
        fixedLocation,
      ] = args;
      toggleRowEdit = output(toggleRowEdit)
      onSave = output(onSave)
      onDuplicate = output(onDuplicate)
      onDelete = output(onDelete)
    });

    return noElement(
      _=> isEditMode
        ? inventoryEditCard(
            item,
            index,
            filamentTypes,
            toggleRowEdit,
            onSave,
            onDuplicate,
            onDelete,
            updateEditingLocation,
            fixedLocation
          )
        : inventorySummaryRow(
            item,
            type,
            index,
            toggleRowEdit,
            onSave,
          )
    );
  }
);
