import {
  tag,
  h1,
  p,
  section,
  div,
  button,
  h2,
  select,
  option,
  main,
  header,
  a,
} from "taggedjs";
import { InventoryRow } from "./inventoryRow.tag.js";
import {
  editingTarget,
  toggleRowEdit,
  setEditingIndex,
} from "./filamentDisplayFunctions.js";
import { AdminNav } from "./AdminNav.tag.js";
import { locations } from "./locations.array.js";
import {
  loadFilamentInventory,
  loadFilamentTypes,
  loadManufacturers,
  saveFilamentInventory,
} from "./firebase.js";
import { slugifyLocation } from "./location-utils.js";
import { matchesLocationFilter } from "./filter-utils.js";
import { ManufacturerLabel } from "./ManufacturerLabel.tag.js";
import { getManufacturerDisplayLabel, normalizeManufacturerLabel } from "./manufacturer-utils.js";
import { normalizeBarcodeList } from "./barcode-utils.js";
import { BarcodeFilterControl } from "./BarcodeFilterControl.tag.js";
import { normalizeStorageLocations } from "./storage-locations.js";
import type {
  FilamentInventoryItem,
  FilamentType,
  ManufacturerItem,
} from "../types/filament.js";

type InventoryRowViewModel = {
  item: FilamentInventoryItem;
  index: number;
  type?: FilamentType;
};

type InventoryFilterState = {
  materialTypeFilter: string;
  subMaterialTypeFilter: string;
  barcodeFilter: string;
  locationFilter: string;
  unassignedLocation: string;
};

type ManufacturerGroup = {
  key: string;
  label: string;
  iconUrl: string;
  entries: InventoryRowViewModel[];
};

type SerializedFilamentInventoryItem = {
  filament_type_id?: string;
  location?: string;
  spool_inventory?: number;
  storage_locations?: { name: string; quantity: number }[];
};

type InventoryUser = {
  email?: string | null;
  photoURL?: string | null;
} | null;

export const FilamentInventoryApp = tag(
  (
    onSignOut: (() => Promise<void>) | undefined,
    user: InventoryUser,
    selectedLocation: string = "",
    selectedLocationSlug: string = ""
  ) => {
    FilamentInventoryApp.updates((args) => {
      [onSignOut, user, selectedLocation, selectedLocationSlug] = args;
    });

    const isLocationPage = Boolean(selectedLocation);
    const unassignedLocation = "__unassigned__";

    let data: FilamentInventoryItem[] = [];
    let filamentTypes: FilamentType[] = [];
    let hasLoaded = false;
    let isLoading = false;
    let loadError = "";
    let typesLoaded = false;
    let typesLoading = false;
    let typesError = "";
    let manufacturers: ManufacturerItem[] = [];
    let manufacturersLoaded = false;
    let manufacturersLoading = false;
    let materialTypeFilter: string = "";
    let subMaterialTypeFilter: string = "";
    let barcodeFilter: string = "";

    const addFilamentForLocation = (location: string): void => {
      data.unshift(createEmptyInventoryItem(location || locations[0] || ""));
      setEditingIndex(0, data[0]?.location || "");
    };

    const saveCurrentFilaments = () => {
      return tag.promise = saveFilamentInventoryToFirestore(data).then(() => {
        delete editingTarget.index;
      });
    };

    const duplicateFilamentAt = (index: number): void => {
      const source = data[index];
      if (!source) return;
      const clone = {
        ...source,
        location: source.location || locations[0] || "",
      };
      data.splice(index + 1, 0, clone);
      setEditingIndex(index + 1, clone.location || "");
    };

    const removeFilamentAt = (index: number): void => {
      const target = data[index];
      if (!target) return;
      if (!confirm("Remove this inventory entry?")) return;
      data.splice(index, 1);
      setEditingIndex(null);
      tag.promise = saveFilamentInventoryToFirestore(data);
    };

    const zeroOutLocationInventory = (location: string): void => {
      const locationItems = data.filter((item) => (item.location || "") === location);
      if (!locationItems.length) return;
      if (!confirm(`Zero out all spool inventory for ${location}?`)) return;
      locationItems.forEach((item) => {
        item.spool_inventory = 0;
      });
      tag.promise = saveFilamentInventoryToFirestore(data);
    };

    const filteredData = () =>
      filterFilamentInventory(data, filamentTypes, {
        materialTypeFilter,
        subMaterialTypeFilter,
        barcodeFilter,
        locationFilter: isLocationPage ? selectedLocation : "",
        unassignedLocation,
      });

    const locationPageEntries = () =>
      filteredData().filter(({ item }) => (item.location || "") === selectedLocation);

    const groupedLocationEntries = () =>
      groupLocationEntriesByManufacturer(locationPageEntries(), manufacturers);

    const startTypesLoad = () => {
      if (!loadFilamentTypes || typesLoaded || typesLoading) return;
      typesLoading = true;
      tag.promise = loadFilamentTypes()
        .then((items: FilamentType[] | null) => {
          filamentTypes = Array.isArray(items) ? items : [];
          typesLoaded = true;
          typesError = "";
        })
        .catch((error) => {
          console.error("Filament types load failed", error);
          filamentTypes = [];
          typesLoaded = true;
          typesError = "Failed to load filament types.";
        })
        .finally(() => {
          typesLoading = false;
        });
    };

    const startLoad = () => {
      if (!loadFilamentInventory || hasLoaded || isLoading) return;
      isLoading = true;
      tag.promise = loadFilamentInventory()
        .then((items: FilamentInventoryItem[] | null) => {
          loadError = "";
          data = applyFilamentInventory(items || []);
          hasLoaded = true;
        })
        .catch((error) => {
          console.error("FilamentInventoryApp load failed", error);
          loadError = "Failed to load inventory.";
          data = applyFilamentInventory([]);
          hasLoaded = true;
        })
        .finally(() => {
          isLoading = false;
        });
    };

    const startManufacturersLoad = () => {
      if (!loadManufacturers || manufacturersLoaded || manufacturersLoading) return;
      manufacturersLoading = true;
      tag.promise = loadManufacturers()
        .then((items: ManufacturerItem[] | null) => {
          manufacturers = Array.isArray(items) ? items : [];
          manufacturersLoaded = true;
        })
        .catch((error) => {
          console.error("Manufacturers load failed", error);
          manufacturers = [];
          manufacturersLoaded = true;
        })
        .finally(() => {
          manufacturersLoading = false;
        });
    };

    if (isLocationPage) {
      startTypesLoad();
      startLoad();
      startManufacturersLoad();
    }

    if (!isLocationPage) {
      return [
        header(
          AdminNav(onSignOut, user),
          h1("Filament Inventory"),
          p("Choose a location to manage filament inventory.")
        ),
        main(
          section.class`panel`(
            div.class`location-list`(
              ...locations.map((location) => {
                const slug = slugifyLocation(location);
                return div.class`location-group location-selector-card`(
                  div.class`location-title-row`(
                    h2.class`location-title`(`📍 ${location}`),
                    div.class`location-actions`(
                      a
                        .class`add-button`
                        .href(`./${slug}/index.html`)("Open inventory"),
                      a
                        .class`ghost-button location-fast-edit`
                        .href(`./${slug}/fast-edit.html`)("⚡ Fast edit")
                    )
                  )
                ).key(location);
              })
            )
          )
        ),
      ];
    }

    return [
      header(
        _=> AdminNav(onSignOut, user),
        h1(`Filament Inventory: 📍 ${selectedLocation}`),
        p("Edit filament inventory in place. Changes are saved directly to Firestore.")
      ),

      main(
        section.class`panel`(
          div.class`meta`(
            div.class`controls`(
              div.class`controls-group`(
                select
                  .value(_=> materialTypeFilter ?? "")
                  .onChange((event) => {
                    materialTypeFilter = event?.target?.value || "";
                  })(
                  option
                    .value``
                    ("Filter by material type"),
                  _=> getMaterialTypeOptions(filamentTypes).map((materialType) =>
                    option
                      .value(materialType)(
                      materialType
                    )
                  )
                ),
                select
                  .value(_=> subMaterialTypeFilter ?? "")
                  .onChange((event) => {
                    subMaterialTypeFilter = event?.target?.value || "";
                  })(
                  option
                    .value``
                    ("Filter by sub material"),
                  _=> getSubMaterialTypeOptions(filamentTypes).map((subMaterialType) =>
                    option
                      .value(subMaterialType)(
                      subMaterialType
                    )
                  )
                ),
                _=> BarcodeFilterControl({
                  value: barcodeFilter,
                  onChange: (value) => {
                    barcodeFilter = value;
                  },
                  scannerName: `inventory-bc-filter-${selectedLocationSlug || "location"}`,
                }),
                div.id`count`(_=> `${locationPageEntries().length} items`)
              )
            )
          ),
          _=> loadError && div.class`error`(loadError),
          _=> typesError && div.class`error`(typesError),
          div.id`summaryList`.class`summary-list`(
            div.class`location-group`(
              div.class`location-actions`(
                a
                  .class`ghost-button location-fast-edit`
                  .href`./fast-edit.html`
                  ("⚡ Fast edit"),
                button
                  .type`button`
                  .class`add-button`
                  .onClick(() => addFilamentForLocation(selectedLocation))(
                  "➕ Add inventory"
                ),
                button
                  .type`button`
                  .class`ghost-button delete-button`
                  .onClick(() => zeroOutLocationInventory(selectedLocation))(
                  "Zero out"
                )
              ),
              _=> groupedLocationEntries().map((group) =>
                div.class`manufacturer-group`(
                  h2(
                    ManufacturerLabel({
                      label: group.label,
                      iconUrl: group.iconUrl,
                      className: "manufacturer-group-title",
                      iconClassName: "manufacturer-group-icon",
                      nameClassName: "manufacturer-group-name",
                    })
                  ),
                  ...group.entries.map(({ item, index, type }) =>
                    InventoryRow(
                      item,
                      type,
                      index,
                      editingTarget?.index === index,
                      toggleRowEdit,
                      filamentTypes,
                      saveCurrentFilaments,
                      duplicateFilamentAt,
                      removeFilamentAt,
                      selectedLocation
                    ).key(item.filament_type_id || `item-${index}`)
                  )
                ).key(group.key)
              )
            )
          )
        )
      ),
    ];
  }
);

const normalizeLocation = (location: string): string =>
  locations.includes(location) ? location : "";

const prepareFilamentInventory = (
  items: FilamentInventoryItem[] | null | undefined
): FilamentInventoryItem[] =>
  (Array.isArray(items) ? items : [])
    .map((item) => ({
      ...item,
      location: normalizeLocation(item.location),
      storage_locations: normalizeStorageLocations(item?.storage_locations),
    }));

const serializeFilamentInventory = (
  items: FilamentInventoryItem[]
): SerializedFilamentInventoryItem[] =>
  items.map((item) => {
    const cleaned: SerializedFilamentInventoryItem = {};

    if (item.filament_type_id) cleaned.filament_type_id = item.filament_type_id;

    if (item.location) cleaned.location = item.location;
    if (item.spool_inventory !== undefined && item.spool_inventory !== "") {
      cleaned.spool_inventory = Number(item.spool_inventory) || 0;
    }
    const storageLocations = normalizeStorageLocations(item?.storage_locations);
    if (storageLocations.length) cleaned.storage_locations = storageLocations;

    return cleaned;
  });

const createEmptyInventoryItem = (
  defaultLocation: string = ""
): FilamentInventoryItem => ({
  filament_type_id: "",
  spool_inventory: 1,
  location: defaultLocation,
});

const applyFilamentInventory = (
  items: FilamentInventoryItem[] | null | undefined
): FilamentInventoryItem[] => prepareFilamentInventory(items);

const saveFilamentInventoryToFirestore = (
  items: FilamentInventoryItem[]
): Promise<void | unknown> =>
  saveFilamentInventory(serializeFilamentInventory(items))
  .catch((error) => {
    console.error("Failed to save filament inventory", error);
    alert("Save failed. Check the console for details.");
  });

const filterFilamentInventory = (
  items: FilamentInventoryItem[],
  filamentTypes: FilamentType[],
  filters: InventoryFilterState
): InventoryRowViewModel[] =>
  items.reduce((acc, item, index) => {
    const type = filamentTypes?.find(
      (entry) => entry.filament_type_id === item.filament_type_id
    );
    const matchesMaterialType =
      !filters.materialTypeFilter ||
      String(type?.material_type || "").toLowerCase() ===
        String(filters.materialTypeFilter || "").toLowerCase();
    const matchesSubMaterialType =
      !filters.subMaterialTypeFilter ||
      String(type?.sub_material_type || "").toLowerCase() ===
        String(filters.subMaterialTypeFilter || "").toLowerCase();
    const matchesLocation = matchesLocationFilter(
      item.location,
      filters.locationFilter,
      filters.unassignedLocation
    );
    const matchesBarcode = matchesBarcodeFilter(type, filters.barcodeFilter);

    if (matchesMaterialType && matchesSubMaterialType && matchesLocation && matchesBarcode) {
      acc.push({ item, index, type });
    }
    return acc;
  }, [] as InventoryRowViewModel[]);

const matchesBarcodeFilter = (type: FilamentType | undefined, filter: string): boolean => {
  const token = (filter || "").trim().toLowerCase();
  if (!token) return true;
  const barcodeList = normalizeBarcodeList(type?.barcode_search_data);
  return barcodeList.some((barcode) =>
    String(barcode || "").toLowerCase().includes(token)
  );
};

const buildManufacturerIconMap = (manufacturers: ManufacturerItem[]): Map<string, string> =>
  (Array.isArray(manufacturers) ? manufacturers : []).reduce((map, item) => {
    const key = normalizeManufacturerLabel(item?.label);
    if (!key) return map;
    map.set(key, String(item?.iconUrl || "").trim());
    return map;
  }, new Map());

const groupLocationEntriesByManufacturer = (
  entries: InventoryRowViewModel[],
  manufacturers: ManufacturerItem[]
): ManufacturerGroup[] => {
  const iconMap = buildManufacturerIconMap(manufacturers);
  const grouped = new Map<string, ManufacturerGroup>();
  entries.forEach((entry) => {
    const label = getManufacturerDisplayLabel(entry?.type?.manufacturer);
    const key = normalizeManufacturerLabel(label) || "unspecified";
    const iconUrl = iconMap.get(key) || "";
    if (!grouped.has(key)) {
      grouped.set(key, { key, label, iconUrl, entries: [] });
    }
    grouped.get(key).entries.push(entry);
  });
  return Array.from(grouped.values()).sort((a, b) => {
    if (a.key === "unspecified" && b.key !== "unspecified") return -1;
    if (b.key === "unspecified" && a.key !== "unspecified") return 1;
    return a.label.localeCompare(b.label);
  });
};

const getMaterialTypeOptions = (filamentTypes: FilamentType[]): string[] => {
  const unique = new Set(
    (Array.isArray(filamentTypes) ? filamentTypes : [])
      .map((type) => String(type?.material_type || "").trim())
      .filter(Boolean)
  );
  return Array.from(unique).sort((a, b) => a.localeCompare(b));
};

const getSubMaterialTypeOptions = (filamentTypes: FilamentType[]): string[] => {
  const unique = new Set(
    (Array.isArray(filamentTypes) ? filamentTypes : [])
      .map((type) => String(type?.sub_material_type || "").trim())
      .filter(Boolean)
  );
  return Array.from(unique).sort((a, b) => a.localeCompare(b));
};
