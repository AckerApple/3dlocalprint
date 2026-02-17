export let editingTarget = {};

export const toggleRowEdit = (index, location) => {
  if (
    editingTarget &&
    editingTarget.index === index &&
    (location === undefined || editingTarget.location === location)
  ) {
    editingTarget = {};
    return;
  }
  editingTarget = {
    index,
    location: location ?? "",
  };
};

export const setEditingIndex = (index, location = "") => {
  if (index === null || index === undefined) {
    editingTarget = {};
    return;
  }
  editingTarget = { index, location };
};

export const updateEditingLocation = (index, location = "") => {
  if (!editingTarget || editingTarget.index !== index) return;
  editingTarget = { ...editingTarget, location };
};
