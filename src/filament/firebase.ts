import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  indexedDBLocalPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";
import { slugifyLocation } from "./location-utils.js";
import type { ManufacturerItem } from "../types/filament.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8oBLWyTpzWLLjWdZxo8YgQ1IcYICxdcU",
  authDomain: "auth.3dlocalprint.com",
  projectId: "threedlocalprint",
  storageBucket: "threedlocalprint.firebasestorage.app",
  messagingSenderId: "770972495364",
  appId: "1:770972495364:web:b1015eaaf0de32d9b84f51",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

const FILAMENT_INVENTORY_DOC = doc(db, "filament_inventory", "list");
const FILAMENT_TYPES_DOC = doc(db, "filament_types", "list");
const MANUFACTURERS_DOC = doc(db, "manufacturers", "list");
const ADMINS_DOC = doc(db, "admins", "list");
const LEDGER_DOC = doc(db, "ledger", "entries");

const normalizeEmail = (email = "") => email.trim().toLowerCase();
const normalizeManufacturerItems = (items: unknown): ManufacturerItem[] =>
  (Array.isArray(items) ? items : [])
    .map((item) => {
      if (typeof item === "string") {
        return {
          label: item.trim(),
          iconUrl: "",
        };
      }
      if (item && typeof item === "object") {
        const label = String((item as { label?: unknown }).label || "").trim();
        const iconUrl = String((item as { iconUrl?: unknown }).iconUrl || "").trim();
        return {
          label,
          iconUrl,
        };
      }
      return null;
    })
    .filter((item): item is ManufacturerItem => Boolean(item?.label));

const isIOS = () =>
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/i.test(navigator.userAgent || "");

const setBestPersistence = async () => {
  const candidates = [
    { key: "indexedDB", value: indexedDBLocalPersistence },
    { key: "local", value: browserLocalPersistence },
    { key: "session", value: browserSessionPersistence },
  ];
  let lastError = null;

  for (const candidate of candidates) {
    try {
      await setPersistence(auth, candidate.value);
      return { persistence: candidate.key, error: null };
    } catch (error) {
      lastError = error;
      console.warn(`Failed to set ${candidate.key} persistence`, error);
    }
  }

  return { persistence: "none", error: lastError };
};

const prepareAuth = async () => {
  let redirectError = null;
  let redirectResult = null;

  try {
    redirectResult = await getRedirectResult(auth);
  } catch (error) {
    redirectError = error;
    console.error("Firebase redirect sign-in failed", error);
  }

  const persistence = await setBestPersistence();

  return { redirectError, redirectResult, persistence };
};

const signIn = async () => {
  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    if (!isIOS()) {
      throw error;
    }
    console.warn("Popup sign-in failed on iOS, falling back to redirect", error);
    return signInWithRedirect(auth, provider);
  }
};
const signOutUser = () => signOut(auth);
const onAuthChanged = (callback) => onAuthStateChanged(auth, callback);

const loadFilamentInventory = async () => {
  const snapshot = await getDoc(FILAMENT_INVENTORY_DOC);
  if (!snapshot.exists()) {
    return null;
  }
  const data = snapshot.data();
  return Array.isArray(data.items) ? data.items : [];
};

const saveFilamentInventory = (items) =>
  setDoc(
    FILAMENT_INVENTORY_DOC,
    {
      items,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

const loadFilamentTypes = async () => {
  const snapshot = await getDoc(FILAMENT_TYPES_DOC);
  if (!snapshot.exists()) {
    return null;
  }
  const data = snapshot.data();
  return Array.isArray(data.items) ? data.items : [];
};

const subscribeFilamentTypes = (callback) =>
  onSnapshot(
    FILAMENT_TYPES_DOC,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback(null);
        return;
      }
      const data = snapshot.data();
      callback(Array.isArray(data.items) ? data.items : []);
    },
    (error) => {
      console.error("Failed to subscribe to filament types", error);
      callback(null);
    }
  );

const saveFilamentTypes = (items) =>
  setDoc(
    FILAMENT_TYPES_DOC,
    {
      items,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

const updateFilamentInventory = async ({ location = "", adjustments = {} } = {}) => {
  const locationKey = slugifyLocation(location);
  const adjustmentEntries = Object.entries(adjustments).filter(
    ([, delta]) => Number(delta)
  );
  if (!locationKey || !adjustmentEntries.length) {
    return;
  }

  return runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(FILAMENT_INVENTORY_DOC);
    if (!snapshot.exists()) {
      throw new Error("Filament inventory list not found.");
    }
    const data = snapshot.data();
    const items = Array.isArray(data.items) ? data.items : [];
    const nextItems = items.map((item) => {
      if (slugifyLocation(item.location || "") !== locationKey) {
        return item;
      }
      const typeId = item.filament_type_id || "";
      if (!typeId || !(typeId in adjustments)) {
        return item;
      }
      const delta = Number(adjustments[typeId]) || 0;
      if (!delta) {
        return item;
      }
      const current = Number(item.spool_inventory) || 0;
      const nextValue = Math.max(0, current + delta);
      return {
        ...item,
        spool_inventory: nextValue,
      };
    });

    const existingTypeIds = new Set(
      items
        .filter((item) => slugifyLocation(item.location || "") === locationKey)
        .map((item) => item.filament_type_id)
        .filter(Boolean)
    );
    adjustmentEntries.forEach(([typeId, delta]) => {
      const numericDelta = Number(delta) || 0;
      if (numericDelta <= 0 || existingTypeIds.has(typeId)) return;
      nextItems.push({
        filament_type_id: typeId,
        location,
        spool_inventory: numericDelta,
      });
    });

    transaction.set(
      FILAMENT_INVENTORY_DOC,
      {
        items: nextItems,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  });
};

const loadManufacturers = async () => {
  const snapshot = await getDoc(MANUFACTURERS_DOC);
  if (!snapshot.exists()) {
    return null;
  }
  const data = snapshot.data();
  return normalizeManufacturerItems(data.items);
};

const subscribeManufacturers = (callback) =>
  onSnapshot(
    MANUFACTURERS_DOC,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback(null);
        return;
      }
      const data = snapshot.data();
      callback(normalizeManufacturerItems(data.items));
    },
    (error) => {
      console.error("Failed to subscribe to 🏭 manufacturers", error);
      callback(null);
    }
  );

const subscribeAdmins = (callback) =>
  onSnapshot(
    ADMINS_DOC,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback(null);
        return;
      }
      const data = snapshot.data();
      callback(Array.isArray(data.items) ? data.items : []);
    },
    (error) => {
      console.error("Failed to subscribe to admins", error);
      callback(null);
    }
  );

const saveManufacturers = (items: ManufacturerItem[]) =>
  setDoc(
    MANUFACTURERS_DOC,
    {
      items: normalizeManufacturerItems(items),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

const loadAdmins = async () => {
  const snapshot = await getDoc(ADMINS_DOC);
  if (!snapshot.exists()) {
    return [];
  }
  const data = snapshot.data();
  return Array.isArray(data.items) ? data.items : [];
};

const isAdminEmail = async (email = "") => {
  const list = await loadAdmins();
  return list.map(normalizeEmail).includes(normalizeEmail(email));
};

const saveAdmins = (items) =>
  setDoc(
    ADMINS_DOC,
    {
      items,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

const loadLedgerEntries = async () => {
  const snapshot = await getDoc(LEDGER_DOC);
  if (!snapshot.exists()) {
    return [];
  }
  const data = snapshot.data();
  return Array.isArray(data.items) ? data.items : [];
};

const serializeLedgerEntries = (items = []) =>
  (Array.isArray(items) ? items : []).map((item) => {
    const amount = Number(item.amount);
    if (!Number.isFinite(amount) || amount === 0) {
      throw new Error("Ledger amount must be a non-zero number.");
    }
    const title = String(item.title || "").trim();
    if (!title) {
      throw new Error("Ledger title is required.");
    }
    const applicableDate = String(item.applicableDate || "");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(applicableDate)) {
      throw new Error("Ledger applicable date must be a valid YYYY-MM-DD value.");
    }
    const id = String(item.id || "").trim();
    if (!id) {
      throw new Error("Ledger id is required.");
    }

    return {
      id,
      amount,
      title,
      billingCategory: String(item.billingCategory || "").trim() || "",
      applicableDate,
      notes: String(item.notes || "").trim(),
      status: ["pending", "posted", "reconciled"].includes(item.status)
        ? item.status
        : "posted",
      createdAt: Number(item.createdAt) || Date.now(),
      updatedAt: Number(item.updatedAt) || Date.now(),
    };
  });

const saveLedgerEntries = (items) =>
  setDoc(
    LEDGER_DOC,
    {
      items: serializeLedgerEntries(items),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

const subscribeLedgerEntries = (callback) =>
  onSnapshot(
    LEDGER_DOC,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback([]);
        return;
      }
      const data = snapshot.data();
      callback(Array.isArray(data.items) ? data.items : []);
    },
    (error) => {
      console.error("Failed to subscribe to ledger entries", error);
      callback([]);
    }
  );

export {
  db,
  auth,
  isAdminEmail,
  prepareAuth,
  signIn,
  signOutUser,
  onAuthChanged,
  loadFilamentInventory,
  saveFilamentInventory,
  updateFilamentInventory,
  loadFilamentTypes,
  saveFilamentTypes,
  subscribeFilamentTypes,
  loadManufacturers,
  subscribeManufacturers,
  saveManufacturers,
  subscribeAdmins,
  saveAdmins,
  loadAdmins,
  loadLedgerEntries,
  saveLedgerEntries,
  subscribeLedgerEntries,
};
