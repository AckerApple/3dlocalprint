export const matchesTextFilter = (value, filter) =>
  !filter || (value || "").toLowerCase() === filter.toLowerCase();

export const matchesLocationFilter = (value, filter, unassignedToken) => {
  if (!filter) return true;
  if (filter === unassignedToken) return !value;
  return (value || "").toLowerCase() === filter.toLowerCase();
};

export const filterByManufacturerAndMaterial = (items, filters) =>
  items.filter((item) => {
    const matchesManufacturer = matchesTextFilter(
      item.manufacturer,
      filters.manufacturerFilter
    );
    const matchesMaterial = matchesTextFilter(
      item.material_type,
      filters.materialTypeFilter
    );
    return matchesManufacturer && matchesMaterial;
  });
