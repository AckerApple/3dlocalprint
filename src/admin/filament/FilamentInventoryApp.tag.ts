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
  optgroup,
  label,
  input,
  main,
  header,
  a,
  hr,
} from "taggedjs";
import { InventoryRow } from "./inventoryRow.tag.js";
import {
  editingTarget,
  toggleRowEdit,
  setEditingIndex,
} from "./filamentDisplayFunctions.js";
import { AdminNav } from "../shared/AdminNav.tag.js";
import { locations } from "./locations.array.js";
import {
  loadFilamentInventory,
  loadFilamentTypes,
  loadManufacturers,
  saveFilamentInventory,
} from "../shared/firebase.js";
import { slugifyLocation } from "./location-utils.js";
import { matchesLocationFilter } from "./filter-utils.js";
import { ManufacturerLabel } from "./ManufacturerLabel.tag.js";
import { getManufacturerDisplayLabel, normalizeManufacturerLabel } from "./manufacturer-utils.js";
import { normalizeBarcodeList } from "../shared/barcode-utils.js";
import { BarcodeFilterControl } from "../shared/BarcodeFilterControl.tag.js";
import { normalizeStorageLocations } from "./storage-locations.js";
import { BarcodeScannerPanel } from "../shared/BarcodeScanner.tag.js";
import { Modal } from "../shared/Modal.tag.js";
import { extractBarcodeToken, findBarcodeMatches } from "../shared/barcode-utils.js";
import type {
  FilamentInventoryItem,
  FilamentType,
  ManufacturerItem,
} from "../../types/filament.js";

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

const createTonePlayer = () => {
  let context: AudioContext | null = null;
  const play = (frequency: number, durationMs: number) => {
    try {
      if (!context) {
        context = new AudioContext();
      }
      if (context.state === "suspended") {
        context.resume().catch(() => {});
      }
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.value = 0.12;
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + durationMs / 1000);
    } catch (error) {
      console.warn("Audio tone failed", error);
    }
  };
  return {
    success: () => play(880, 120),
    fail: () => play(220, 180),
  };
};

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
    const tone = createTonePlayer();

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
    let addInventoryModalOpen = false;
    let addInventoryScannerOpen = false;
    let addInventoryStatus = "";
    let addInventoryIsSaving = false;
    let manualFilamentTypeId = "";
    let manualSpoolCount = "1";
    let addKeepOpenOnScan = false;
    let addLastScan = { key: "", at: 0 };
    let removeInventoryModalOpen = false;
    let removeInventoryScannerOpen = false;
    let removeInventoryStatus = "";
    let removeInventoryIsSaving = false;
    let removeKeepOpenOnScan = false;
    let removeLastScan = { key: "", at: 0 };
    const scanCooldownMs = 1200;

    const closeAddInventoryModal = () => {
      addInventoryModalOpen = false;
      addInventoryScannerOpen = false;
      addInventoryStatus = "";
      addInventoryIsSaving = false;
      manualFilamentTypeId = "";
      manualSpoolCount = "1";
      addKeepOpenOnScan = false;
      addLastScan = { key: "", at: 0 };
    };
    const closeRemoveInventoryModal = () => {
      removeInventoryModalOpen = false;
      removeInventoryScannerOpen = false;
      removeInventoryStatus = "";
      removeInventoryIsSaving = false;
      removeKeepOpenOnScan = false;
      removeLastScan = { key: "", at: 0 };
    };

    const addInventoryByTypeId = async (
      filamentTypeId: string,
      spoolCount = 1,
      closeAfterSave = true
    ) => {
      const normalizedTypeId = String(filamentTypeId || "").trim();
      const quantity = Math.max(1, Math.floor(Number(spoolCount) || 1));
      if (!normalizedTypeId || !selectedLocation) return;
      if (addInventoryIsSaving) return;
      addInventoryIsSaving = true;
      try {
        const existing = data.find(
          (item) =>
            String(item?.filament_type_id || "").trim() === normalizedTypeId &&
            String(item?.location || "").trim() === selectedLocation
        );
        if (existing) {
          existing.spool_inventory = Math.max(0, Number(existing.spool_inventory) || 0) + quantity;
        } else {
          data.unshift({
            filament_type_id: normalizedTypeId,
            spool_inventory: quantity,
            location: selectedLocation,
            storage_locations: [],
          });
        }
        await saveFilamentInventoryToFirestore(data);
        if (closeAfterSave) {
          closeAddInventoryModal();
        } else {
          addInventoryStatus = "Inventory added. Ready for next scan.";
        }
      } finally {
        addInventoryIsSaving = false;
      }
    };

    const addFromScan = async (rawValue: string) => {
      if (addInventoryIsSaving) return;
      const token = extractBarcodeToken(rawValue || "");
      const normalized = String(token || rawValue || "").trim();
      if (!normalized) {
        addInventoryStatus = "No barcode value detected.";
        tone.fail();
        return;
      }
      const now = Date.now();
      const normalizedKey = `raw:${normalized.toLowerCase()}`;
      if (normalizedKey === addLastScan.key && now - addLastScan.at < scanCooldownMs) {
        return;
      }
      const matches = findBarcodeMatches(filamentTypes, normalized);
      const first = matches?.[0];
      const typeId = String(first?.filament_type_id || "").trim();
      if (!typeId) {
        addLastScan = { key: normalizedKey, at: now };
        addInventoryStatus = `No filament type matched barcode: ${normalized}`;
        tone.fail();
        return;
      }
      const typeKey = `type:${typeId.toLowerCase()}`;
      if (typeKey === addLastScan.key && now - addLastScan.at < scanCooldownMs) {
        return;
      }
      addLastScan = { key: typeKey, at: now };
      addInventoryStatus = `Matched ${first?.label || first?.color_name || typeId}. Adding...`;
      tone.success();
      const keepOpen = addKeepOpenOnScan;
      await addInventoryByTypeId(typeId, 1, false);
      if (!keepOpen) {
        closeAddInventoryModal();
      }
    };
    const removeInventoryByTypeId = async (
      filamentTypeId: string,
      spoolCount = 1,
      closeAfterSave = true
    ) => {
      const normalizedTypeId = String(filamentTypeId || "").trim();
      const quantity = Math.max(1, Math.floor(Number(spoolCount) || 1));
      if (!normalizedTypeId || !selectedLocation) return;
      if (removeInventoryIsSaving) return;
      removeInventoryIsSaving = true;
      try {
        const existing = data.find(
          (item) =>
            String(item?.filament_type_id || "").trim() === normalizedTypeId &&
            String(item?.location || "").trim() === selectedLocation
        );
        if (!existing) {
          removeInventoryStatus = "No matching inventory item found for this location.";
          tone.fail();
          return;
        }
        const current = Math.max(0, Number(existing.spool_inventory) || 0);
        if (current <= 0) {
          removeInventoryStatus = "Inventory is already zero for this item.";
          tone.fail();
          return;
        }
        existing.spool_inventory = Math.max(0, current - quantity);
        await saveFilamentInventoryToFirestore(data);
        if (closeAfterSave) {
          closeRemoveInventoryModal();
        } else {
          removeInventoryStatus = "Inventory removed. Ready for next scan.";
        }
      } finally {
        removeInventoryIsSaving = false;
      }
    };
    const removeFromScan = async (rawValue: string) => {
      if (removeInventoryIsSaving) return;
      const token = extractBarcodeToken(rawValue || "");
      const normalized = String(token || rawValue || "").trim();
      if (!normalized) {
        removeInventoryStatus = "No barcode value detected.";
        tone.fail();
        return;
      }
      const now = Date.now();
      const normalizedKey = `raw:${normalized.toLowerCase()}`;
      if (normalizedKey === removeLastScan.key && now - removeLastScan.at < scanCooldownMs) {
        return;
      }
      const matches = findBarcodeMatches(filamentTypes, normalized);
      const first = matches?.[0];
      const typeId = String(first?.filament_type_id || "").trim();
      if (!typeId) {
        removeLastScan = { key: normalizedKey, at: now };
        removeInventoryStatus = `No filament type matched barcode: ${normalized}`;
        tone.fail();
        return;
      }
      const typeKey = `type:${typeId.toLowerCase()}`;
      if (typeKey === removeLastScan.key && now - removeLastScan.at < scanCooldownMs) {
        return;
      }
      removeLastScan = { key: typeKey, at: now };
      removeInventoryStatus = `Matched ${first?.label || first?.color_name || typeId}. Removing...`;
      tone.success();
      const keepOpen = removeKeepOpenOnScan;
      await removeInventoryByTypeId(typeId, 1, false);
      if (!keepOpen) {
        closeRemoveInventoryModal();
      }
    };

    const onAddScanResult = tag.callback((value: string) => {
      const task = addFromScan(value);
      tag.promise = task;
      return task;
    });

    const onRemoveScanResult = tag.callback((value: string) => {
      const task = removeFromScan(value);
      tag.promise = task;
      return task;
    });

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
      filteredData().filter(({ item }) =>
        (item.location || "") === selectedLocation &&
        (Number(item?.spool_inventory) || 0) > 0
      );

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
              locations.map((location) => {
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
                  .class`add-button inventory-add-action`
                  .onClick(() => {
                    addInventoryModalOpen = true;
                    addInventoryScannerOpen = false;
                    addInventoryStatus = "";
                    addKeepOpenOnScan = false;
                  })(
                  "➕ Add inventory"
                ),
                button
                  .type`button`
                  .class`ghost-button inventory-remove-action`
                  .onClick(() => {
                    removeInventoryModalOpen = true;
                    removeInventoryScannerOpen = false;
                    removeInventoryStatus = "";
                    removeKeepOpenOnScan = false;
                  })(
                  "➖ Remove inventory"
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
                  group.entries.map(({ item, index, type }) =>
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
        ),
        _=> Modal({
          modalOpen: addInventoryModalOpen,
          title: "Add Inventory",
          draggableTitle: true,
          className: "ledger-modal inventory-add-modal",
          cardClassName: "ledger-modal-card",
          onClose: closeAddInventoryModal,
          content: () =>
            div.class`manufacturer-output`(
              p("Scan a filament barcode to add 1 spool to this location."),
              button
                .type`button`
                .class`add-button inventory-add-action`
                .onClick(() => {
                  addInventoryScannerOpen = !addInventoryScannerOpen;
                })(
                _=> addInventoryScannerOpen ? "📸 hide scanner" : "📸 scan product code"
              ),
              _=> addInventoryScannerOpen
                ? div.class`inventory-add-scanner`(
                    BarcodeScannerPanel({
                      onResult: onAddScanResult,
                    })
                  )
                : null,
              label.class`inventory-scan-keep-open`(
                input
                  .type`checkbox`
                  .checked(_=> addKeepOpenOnScan)
                  .onChange((event) => {
                    addKeepOpenOnScan = Boolean(event?.target?.checked);
                  })(),
                "Keep modal open while scanning"
              ),
              _=> addInventoryStatus ? p.class`manufacturer-helper`(_=> addInventoryStatus) : null,
              hr(),
              p("Manual entry"),
              select
                .class`manufacturer-input`
                .value(_=> manualFilamentTypeId)
                .onChange((event) => {
                  manualFilamentTypeId = String(event?.target?.value || "").trim();
                })(
                option.value``("Select filament type"),
                _=> getFilamentTypeGroupsByManufacturer(filamentTypes).map(([manufacturer, types]) =>
                  optgroup
                    .attr("label", manufacturer === "Unknown" ? "🏭 Unknown" : manufacturer)(
                    types.map((type) => {
                      const typeId = String(type?.filament_type_id || "").trim();
                      const label = String(type?.label || type?.color_name || typeId).trim();
                      return option.value(typeId)(label).key(typeId);
                    })
                  )
                )
              ),
              div.class`manufacturer-add`(
                input
                  .class`manufacturer-input`
                  .type`number`
                  .min`1`
                  .step`1`
                  .value(_=> manualSpoolCount)
                  .onInput((event) => {
                    manualSpoolCount = String(event?.target?.value || "1");
                  })(),
                button
                  .type`button`
                  .class`add-button inventory-add-action`
                  .disabled(_=> !manualFilamentTypeId || addInventoryIsSaving)
                  .onClick(() => {
                    void addInventoryByTypeId(manualFilamentTypeId, Number(manualSpoolCount) || 1);
                  })(
                  _=> (addInventoryIsSaving ? "Adding..." : "Add to inventory")
                )
              )
            ),
        }),
        _=> Modal({
          modalOpen: removeInventoryModalOpen,
          title: "Remove Inventory",
          draggableTitle: true,
          className: "ledger-modal",
          cardClassName: "ledger-modal-card",
          onClose: closeRemoveInventoryModal,
          content: () =>
            div.class`manufacturer-output`(
              p("Scan a filament barcode to remove 1 spool from this location."),
              button
                .type`button`
                .class`ghost-button inventory-remove-action`
                .onClick(() => {
                  removeInventoryScannerOpen = !removeInventoryScannerOpen;
                })(
                _=> removeInventoryScannerOpen ? "📸 hide scanner" : "📸 scan product code"
              ),
              _=> removeInventoryScannerOpen
                ? div.class`inventory-add-scanner`(
                    BarcodeScannerPanel({
                      onResult: onRemoveScanResult,
                    })
                  )
                : null,
              label.class`inventory-scan-keep-open`(
                input
                  .type`checkbox`
                  .checked(_=> removeKeepOpenOnScan)
                  .onChange((event) => {
                    removeKeepOpenOnScan = Boolean(event?.target?.checked);
                  })(),
                "Keep modal open while scanning"
              ),
              _=> removeInventoryStatus ? p.class`manufacturer-helper`(_=> removeInventoryStatus) : null
            ),
        })
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

const getFilamentTypeGroupsByManufacturer = (
  filamentTypes: FilamentType[]
): [string, FilamentType[]][] => {
  const groups = new Map<string, FilamentType[]>();
  (Array.isArray(filamentTypes) ? filamentTypes : []).forEach((type) => {
    const manufacturer = getManufacturerDisplayLabel(type?.manufacturer, "Unknown");
    if (!groups.has(manufacturer)) {
      groups.set(manufacturer, []);
    }
    groups.get(manufacturer)?.push(type);
  });
  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([manufacturer, types]) => [
      manufacturer,
      [...types].sort((a, b) =>
        String(a?.label || a?.color_name || a?.filament_type_id || "").localeCompare(
          String(b?.label || b?.color_name || b?.filament_type_id || "")
        )
      ),
    ]);
};
