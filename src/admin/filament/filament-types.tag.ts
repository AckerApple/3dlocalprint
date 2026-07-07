import {
  tag,
  tagElement,
  section,
  div,
  input,
  button,
  select,
  option,
  label,
  h1,
  p,
  subscribe,
  array,
} from "taggedjs";
import { materialTypes } from "./materialTypes.array.js";
import { AdminNav } from "../shared/AdminNav.tag.js";
import {
  saveFilamentTypes,
  subscribeFilamentTypes,
  subscribeManufacturers,
} from "../shared/firebase.js";
import { normalizeBarcodeList, extractBarcodeToken } from "../shared/barcode-utils.js";
import { extractQrToken } from "../shared/qr-utils.js";
import { CodeScannerModal } from "../shared/CodeScannerModal.tag.js";
import { BarcodeScannerPanel } from "../shared/BarcodeScanner.tag.js";
import { BarcodeFilterControl } from "../shared/BarcodeFilterControl.tag.js";
import { Modal } from "../shared/Modal.tag.js";
import { filterByManufacturerAndMaterial } from "./filter-utils.js";
import { withManufacturerEmoji } from "../shared/adminNavItems.js";
import { replaceMountRoot } from "../shared/ssoMount.js";
import { toast } from "../shared/toast.js";
import { startAdminAppShell } from "../shared/adminAppShell.js";
import { FilamentTypeEditor, FilamentTypesRowDisplay } from "./filament-types/FilamentTypesRowDisplay.tag.js";
import type { ManufacturerItem } from "../../types/filament.js";

export type FilamentType = {
  filament_type_id: string;
  number: number;
  label: string;
  single_rating?: number;
  comments?: FilamentComment[];
  manufacturer?: string;
  material_type?: string;
  sub_material_type?: string;
  color_name?: string;
  swatch_code?: string;
  qr_search_data?: string;
  barcode_search_data?: string[];
  hex?: string;
  url?: string;
};

export type FilamentComment = {
  id: string;
  text: string;
  user_email: string;
  user_photo_url: string;
};

type FilamentTypeInput = {
  filament_type_id?: string;
  number?: number | string;
  label?: string;
  single_rating?: number | string;
  comments?: unknown;
  manufacturer?: string;
  material_type?: string;
  sub_material_type?: string;
  color_name?: string;
  swatch_code?: string;
  qr_search_data?: string;
  barcode_search_data?: string[] | string;
  hex?: string;
  url?: string;
};

let app = document.getElementById("filamentTypesApp");
const appRoot = { current: app };

const types$ = array([] as FilamentType[])
const manufacturers$ = array([] as ManufacturerItem[])
let stopTypes = null

let stopManufacturers = null;
let manufacturerFilter = "";
let materialTypeFilter = "";
let barcodeFilter = "";
let activeQrItem = null;
let activeBarcodeItem = null;
let addTypeModalOpen = false;
let addTypeDraft: FilamentType | null = null;
let addTypeIsSaving = false;
let appMounted = false;
let currentUser = null;
let handleSignOut = () => Promise.resolve();
const expandedTypeIds = new Set();
const addModeTypeIds = new Set<string>();
let pendingFocusTypeId = "";
const editTypeId = typeof window !== "undefined"
  ? new URLSearchParams(window.location.search).get("edit")
  : "";
const addTypeParams = typeof window !== "undefined"
  ? new URLSearchParams(window.location.search)
  : null;
const addTypeMode = String(addTypeParams?.get("mode") || "").trim().toLowerCase();
const addTypeRequested = Boolean(addTypeParams?.has("add")) || addTypeMode === "add";
const addTypeBarcode = String(addTypeParams?.get("barcode") || "").trim();
let addTypeApplied = false;
if (editTypeId) {
  expandedTypeIds.add(editTypeId);
}

const createFilamentTypeId = () => {
  if (globalThis.crypto?.randomUUID) {
    return crypto.randomUUID();
  }
  const rand = Math.random().toString(36).slice(2, 10);
  return `filament_${Date.now().toString(36)}_${rand}`;
};

const createEmptyFilamentType = (): FilamentType => ({
  filament_type_id: createFilamentTypeId(),
  number: null,
  label: "",
  single_rating: 0,
  comments: [],
  manufacturer: "",
  material_type: "",
  sub_material_type: "",
  color_name: "",
  swatch_code: "",
  qr_search_data: "",
  barcode_search_data: [],
  hex: "",
  url: "",
});

const normalizeComments = (value: unknown): FilamentComment[] =>
  (Array.isArray(value) ? value : [])
    .map((comment) => {
      if (!comment || typeof comment !== "object") return null;
      const text = String((comment as { text?: unknown }).text || "").trim();
      if (!text) return null;
      return {
        id: String((comment as { id?: unknown }).id || "").trim() || createFilamentTypeId(),
        text,
        user_email: String((comment as { user_email?: unknown }).user_email || "").trim(),
        user_photo_url: String((comment as { user_photo_url?: unknown }).user_photo_url || "").trim(),
      };
    })
    .filter((comment): comment is FilamentComment => Boolean(comment));


const addType = (options: { barcode?: string } = {}) => {
  const next = createEmptyFilamentType();
  const barcode = String(options?.barcode || "").trim();
  if (barcode) {
    next.barcode_search_data = [barcode];
  }
  addTypeDraft = next;
  addTypeModalOpen = true;
};

const resetAddTypeModal = () => {
  addTypeModalOpen = false;
  addTypeDraft = null;
  addTypeIsSaving = false;
};

const cancelAddTypeModal = () => {
  if (!addTypeDraft) {
    resetAddTypeModal();
    return;
  }
  if (!confirm("Abandon adding this filament type?")) return;
  if (activeQrItem === addTypeDraft) activeQrItem = null;
  if (activeBarcodeItem === addTypeDraft) activeBarcodeItem = null;
  resetAddTypeModal();
};

const saveAddTypeFromModal = async (item?: FilamentType) => {
  const draft = item || addTypeDraft;
  if (!draft || addTypeIsSaving) return false;
  if (!auth.authState.isAuthorized) {
    toast.error("Sign in to save changes.");
    return false;
  }
  addTypeIsSaving = true;
  try {
    const cleaned = serializeFilamentTypes([...types$.value, draft]);
    await saveFilamentTypes(cleaned);
    toast.success("Filament type saved.");
    resetAddTypeModal();
    return true;
  } catch (error) {
    console.error("Failed to save filament types", error);
    toast.error("Save failed. Try again.");
    return false;
  } finally {
    addTypeIsSaving = false;
  }
};

export const removeType = (index) => {
  const label = types$[index]?.label || "this filament type";
  if (!confirm(`Remove ${label}?`)) return;
  const id = types$[index]?.filament_type_id;
  if (id) {
    expandedTypeIds.delete(id);
    addModeTypeIds.delete(id);
  }
  types$.splice(index, 1);
};

export const isAddModeType = (item) => {
  const id = String(item?.filament_type_id || "").trim();
  if (!id) return false;
  return addModeTypeIds.has(id);
};

export const cancelAddType = (item) => {
  const id = String(item?.filament_type_id || "").trim();
  if (!id || !addModeTypeIds.has(id)) return;
  if (!confirm("Abandon adding this filament type?")) return;
  const index = types$.findIndex((entry) => String(entry?.filament_type_id || "").trim() === id);
  if (index === -1) return;
  addModeTypeIds.delete(id);
  expandedTypeIds.delete(id);
  types$.splice(index, 1);
};

const saveList = async () => {
  if (!auth.authState.isAuthorized) {
    toast.error("Sign in to save changes.");
    return false;
  }
  try {
    const cleaned = serializeFilamentTypes(types$.value);
    await saveFilamentTypes(cleaned);
    toast.success("Filament types saved.");
    return true;
  } catch (error) {
    console.error("Failed to save filament types", error);
    toast.error("Save failed. Try again.");
    return false;
  }
};

export const saveType = async (item) => {
  const didSave = await saveList();
  if (!didSave) return;
  const id = item?.filament_type_id;
  if (!id) return;
  addModeTypeIds.delete(id);
  expandedTypeIds.delete(id);
};

export const getBarcodeList = (item) => normalizeBarcodeList(item.barcode_search_data);

export const updateBarcode = (item, index, value) => {
  const next = getBarcodeList(item);
  next[index] = (value || "").trim();
  item.barcode_search_data = next.filter(Boolean);
};

export const addBarcode = (item) => {
  const next = getBarcodeList(item);
  next.push("");
  item.barcode_search_data = next;
};

export const removeBarcode = (item, index) => {
  const next = getBarcodeList(item);
  next.splice(index, 1);
  item.barcode_search_data = next;
};

export const openQrScanner = (item) => {
  activeQrItem = item;
};

export const openBarcodeScanner = (item) => {
  activeBarcodeItem = item;
};

const applyQrScan = (text) => {
  if (!activeQrItem) return;
  const token = extractQrToken(text || "");
  activeQrItem.qr_search_data = token || text || "";
  activeQrItem = null;
};

const applyBarcodeScan = (text) => {
  if (!activeBarcodeItem) return;
  const token = extractBarcodeToken(text || "");
  const value = (token || text || "").trim();
  if (!value) return;
  const next = getBarcodeList(activeBarcodeItem);
  if (!next.includes(value)) {
    next.push(value);
  }
  activeBarcodeItem.barcode_search_data = next;
  activeBarcodeItem = null;
};

const clearFilters = () => {
  manufacturerFilter = "";
  materialTypeFilter = "";
  barcodeFilter = "";
};

const matchesBarcodeFilter = (item, filter) => {
  const token = (filter || "").trim().toLowerCase();
  if (!token) return true;
  const barcodeList = normalizeBarcodeList(item?.barcode_search_data);
  return barcodeList.some((barcode) =>
    String(barcode || "").toLowerCase().includes(token)
  );
};

const filteredTypesFrom = (types: FilamentType[]) =>
  filterByManufacturerAndMaterial(types, {
    manufacturerFilter,
    materialTypeFilter,
  }).filter((item) => matchesBarcodeFilter(item, barcodeFilter));

const filteredTypes = () => filteredTypesFrom(types$.value);

export const toggleExpanded = (item) => {
  const id = item?.filament_type_id;
  if (!id) return;
  if (expandedTypeIds.has(id)) {
    expandedTypeIds.delete(id);
  } else {
    expandedTypeIds.add(id);
  }
};

export const FilamentTypesApp = tag(() => {
  return [
    AdminNav(handleSignOut, currentUser),

    section.class`panel`(
      div.class`filament-types-header`(
        h1("Filament Types"),
        p("Manage filament type details used by inventory."),
      ),
      div.class`meta`(
        div.class`controls`(
          div.class`controls-group`(
            button
              .type`button`
              .class`add-button`
              .onClick(addType)(
                "➕ Add filament type"
              ),
            select
              .value(() => manufacturerFilter ?? "")
              .onChange((event) => {
                manufacturerFilter = event?.target?.value || "";
              })(
                option.value``("🏭 Filter by manufacturer"),
                subscribe(manufacturers$, manufacturers => {
                  return manufacturers.map((maker) =>
                    option.value(maker.label)(maker.label)
                  )
                })
              ),
            select
              .value(() => materialTypeFilter ?? "")
              .onChange((event) => {
                materialTypeFilter = event?.target?.value || "";
              })(
                option.value``("Filter by material type"),
                _ => materialTypes.map((materialType) =>
                  option.value(materialType)(materialType)
                )
              ),
            BarcodeFilterControl({
              value: barcodeFilter,
              onChange: (value) => {
                barcodeFilter = value;
              },
              scannerName: "bc-filter-scanner",
            }),
            button
              .type`button`
              .class`ghost-button`
              .disabled(() =>
                !manufacturerFilter && !materialTypeFilter && !barcodeFilter
              )
              .onClick(clearFilters)(
                "Clear filters"
              ),
          )
        )
      ),
      div.class`filament-types-count-line`(
        subscribe(types$, (types) => {
          const displayed = filteredTypesFrom(types).length;
          const total = types.length;
          const noun = displayed === 1 ? "type" : "types";
          return `Showing ${displayed} filament ${noun}${displayed === total ? "" : ` of ${total}`}`;
        })
      ),
      div.class`swatch-grid`(
        subscribe(
          types$,
          (types) => {
            if (!types.length) {
              return
            }

            return FilamentTypesRowDisplay({
              types: filteredTypes(),
              expandedTypeIds,
              manufacturers$,
              currentUser,
              materialTypes,
              withManufacturerEmoji,
            })
          }
        ),
      ),
      _ => activeQrItem &&
        CodeScannerModal({
          name: 'qr-scanner-',
          title: "Scan QR",
          onClose: () => {
            activeQrItem = null;
          },
          onApply: applyQrScan,
          applyLabel: "Apply QR",
        }),
      _ => activeBarcodeItem &&
        CodeScannerModal({
          name: 'bc-scanner-',
          title: "Scan barcode",
          onClose: () => {
            activeBarcodeItem = null;
          },
          onApply: applyBarcodeScan,
          applyLabel: "Apply barcode",
          ScannerPanel: BarcodeScannerPanel,
        }),
      _ => Modal({
        modalOpen: addTypeModalOpen,
        title: "Add Filament Type",
        draggableTitle: true,
        className: "ledger-modal",
        cardClassName: "ledger-modal-card",
        onClose: cancelAddTypeModal,
        content: () => addTypeDraft
          ? FilamentTypeEditor({
            item: addTypeDraft,
            isAddMode: true,
            onSave: saveAddTypeFromModal,
            saveLabel: addTypeIsSaving ? "⏳ Saving..." : "☁️ Save type",
            saveDisabled: addTypeIsSaving,
            onCancelAdd: cancelAddTypeModal,
            currentUser,
            manufacturers$,
            materialTypes,
            withManufacturerEmoji,
          })
          : null,
      }),
    ),
  ]
});

const serializeFilamentTypes = (items: FilamentTypeInput[]): FilamentType[] =>
  (Array.isArray(items) ? items : []).map((item) => {
    const rating = Math.max(0, Math.min(5, Math.round(Number(item.single_rating) || 0)));
    const comments = normalizeComments(item.comments);
    const cleaned: FilamentType = {
      filament_type_id: item.filament_type_id || createFilamentTypeId(),
      number: item.number ? Number(item.number) || 0 : 0,
      label: item.label || "",
      single_rating: rating,
      comments,
    };
    if (item.manufacturer) cleaned.manufacturer = item.manufacturer;
    if (item.material_type) cleaned.material_type = item.material_type;
    if (item.sub_material_type) cleaned.sub_material_type = item.sub_material_type;
    if (item.color_name) cleaned.color_name = item.color_name;
    if (item.swatch_code) cleaned.swatch_code = item.swatch_code;
    if (item.qr_search_data) cleaned.qr_search_data = item.qr_search_data;
    const barcodeList = normalizeBarcodeList(item.barcode_search_data);
    if (barcodeList.length) cleaned.barcode_search_data = barcodeList;
    if (item.hex) cleaned.hex = item.hex;
    if (item.url) cleaned.url = item.url;
    return cleaned;
  });

const mountApp = () => {
  if (!appRoot.current || appMounted) {
    return;
  }
  const nextRoot = replaceMountRoot(appRoot);
  if (!nextRoot) return;
  nextRoot.replaceChildren();
  tagElement(FilamentTypesApp, nextRoot);
  appMounted = true;
  app = appRoot.current;
};
const auth = startAdminAppShell({
  rootRef: appRoot,
  toast,
  setAppMounted: (value) => {
    appMounted = value;
  },
  setCurrentUser: (value) => {
    currentUser = value;
  },
  onAfterSsoMount: () => {
    app = appRoot.current;
  },
  onSignedOut: () => {
    if (stopTypes) {
      stopTypes();
      stopTypes = null;
    }
    if (stopManufacturers) {
      stopManufacturers();
      stopManufacturers = null;
    }
  },
  onDenied: () => {
    if (stopTypes) {
      stopTypes();
      stopTypes = null;
    }
    if (stopManufacturers) {
      stopManufacturers();
      stopManufacturers = null;
    }
  },
  onAuthorized: ({ authState }) => {
    if (!addTypeApplied && addTypeRequested) {
      addType({ barcode: addTypeBarcode });
      addTypeApplied = true;
    }
    if (!stopTypes) {
      stopTypes = subscribeFilamentTypes((items) => {
        types$.length = 0

        if (Array.isArray(items)) {
          items
            .map((item) => ({
              ...item,
              single_rating: Math.max(0, Math.min(5, Math.round(Number(item?.single_rating) || 0))),
              comments: normalizeComments(item?.comments),
              barcode_search_data: normalizeBarcodeList(item?.barcode_search_data).filter(Boolean),
            }))
            .forEach((item) => {
              types$.push(item);
            });
        }

        if (appMounted) {
          return;
        }
        if (authState.isAuthorized) {
          mountApp()
        }
      });
    }
    if (!stopManufacturers) {
      stopManufacturers = subscribeManufacturers((items) => {
        manufacturers$.length = 0

        if (Array.isArray(items) && items.length) {
          items
            .map((item) => ({
              label: String(item?.label || "").trim(),
              iconUrl: String(item?.iconUrl || "").trim(),
            }))
            .forEach((item) => {
              manufacturers$.push(item);
            });
        }

        if (appMounted) {
          return
        }

        if (authState.isAuthorized) {
          mountApp();
        }
      });
    }
    mountApp("auth:authorized");
  },
});
handleSignOut = auth.handleSignOut;
