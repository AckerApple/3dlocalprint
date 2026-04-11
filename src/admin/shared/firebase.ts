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
import { slugifyLocation } from "../filament/location-utils.js";
import type { ManufacturerItem } from "../../types/filament.js";
import type { ProductItem } from "../../types/product.js";
import { normalizeProductCategories } from "../../product-categories.js";

const REQUIRED_FIREBASE_ENV_KEYS = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
] as const;

if (import.meta.env.DEV) {
  const envStatus = Object.fromEntries(
    REQUIRED_FIREBASE_ENV_KEYS.map((key) => {
      const value = import.meta.env[key];
      const isSet = typeof value === "string" && value.trim().length > 0;
      return [key, isSet ? "set" : "missing"];
    })
  );
  console.info("[firebase] env status", envStatus);
}

const getRequiredEnv = (name: string, value: string | boolean | undefined): string => {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }
  throw new Error(`Missing required environment variable: ${name}`);
};

const firebaseConfig = {
  apiKey: getRequiredEnv("VITE_FIREBASE_API_KEY", import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: getRequiredEnv("VITE_FIREBASE_AUTH_DOMAIN", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: getRequiredEnv("VITE_FIREBASE_PROJECT_ID", import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: getRequiredEnv("VITE_FIREBASE_STORAGE_BUCKET", import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: getRequiredEnv("VITE_FIREBASE_MESSAGING_SENDER_ID", import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: getRequiredEnv("VITE_FIREBASE_APP_ID", import.meta.env.VITE_FIREBASE_APP_ID),
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
const MONEY_ACCOUNTS_DOC = doc(db, "ledger", "moneyAccounts");
const PRODUCTS_DOC = doc(db, "products", "list");

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

const normalizeProductItems = (items: unknown): ProductItem[] =>
  (Array.isArray(items) ? items : [])
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const id = String((item as { id?: unknown }).id || "").trim();
      const title = String((item as { title?: unknown }).title || "").trim();
      if (!id || !title) return null;
      const now = Date.now();
      const rawSlug = String((item as { slug?: unknown }).slug || "").trim();
      const slug = rawSlug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const rawVariations = (item as { variations?: unknown }).variations;
      const variations = (Array.isArray(rawVariations) ? rawVariations : [])
        .map((variation) => {
          if (!variation || typeof variation !== "object") return null;
          const label = String((variation as { label?: unknown }).label || "").trim();
          if (!label) return null;
          const id = String((variation as { id?: unknown }).id || "")
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") || `variation_${Math.random().toString(36).slice(2, 9)}`;
          return {
            id,
            label,
            unitAmount: Math.max(
              0,
              Math.round(Number((variation as { unitAmount?: unknown }).unitAmount) || 0)
            ),
            stripePriceId: String((variation as { stripePriceId?: unknown }).stripePriceId || "").trim(),
            active: Boolean((variation as { active?: unknown }).active),
          };
        })
        .filter((variation): variation is NonNullable<typeof variation> => Boolean(variation?.id && variation?.label));
      return {
        id,
        title,
        slug: slug || id,
        description: String((item as { description?: unknown }).description || "").trim(),
        imageUrl: String((item as { imageUrl?: unknown }).imageUrl || "").trim(),
        unitAmount: Math.max(0, Math.round(Number((item as { unitAmount?: unknown }).unitAmount) || 0)),
        currency: String((item as { currency?: unknown }).currency || "usd").trim().toLowerCase() || "usd",
        categories: normalizeProductCategories((item as { categories?: unknown }).categories),
        active: Boolean((item as { active?: unknown }).active),
        stripePriceId: String((item as { stripePriceId?: unknown }).stripePriceId || "").trim(),
        variations,
        taxCode: String((item as { taxCode?: unknown }).taxCode || "").trim(),
        createdAt: Number((item as { createdAt?: unknown }).createdAt) || now,
        updatedAt: Number((item as { updatedAt?: unknown }).updatedAt) || now,
      };
    })
    .filter((item): item is ProductItem => Boolean(item?.id && item?.title));

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
      moneyAccountTitle: String(item.moneyAccountTitle || "").trim(),
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

const loadMoneyAccounts = async () => {
  const snapshot = await getDoc(MONEY_ACCOUNTS_DOC);
  if (!snapshot.exists()) {
    return [];
  }
  const data = snapshot.data();
  return Array.isArray(data.items) ? data.items : [];
};

const serializeMoneyAccounts = (items = []) =>
  (Array.isArray(items) ? items : []).map((item) => {
    const id = String(item.id || "").trim();
    if (!id) {
      throw new Error("Money account id is required.");
    }
    const title = String(item.title || "").trim();
    if (!title) {
      throw new Error("Money account title is required.");
    }

    return {
      id,
      title,
      notes: String(item.notes || "").trim(),
      createdAt: Number(item.createdAt) || Date.now(),
      updatedAt: Number(item.updatedAt) || Date.now(),
    };
  });

const saveMoneyAccounts = (items) =>
  setDoc(
    MONEY_ACCOUNTS_DOC,
    {
      items: serializeMoneyAccounts(items),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

const subscribeMoneyAccounts = (callback) =>
  onSnapshot(
    MONEY_ACCOUNTS_DOC,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback([]);
        return;
      }
      const data = snapshot.data();
      callback(Array.isArray(data.items) ? data.items : []);
    },
    (error) => {
      console.error("Failed to subscribe to money accounts", error);
      callback([]);
    }
  );

const loadProducts = async () => {
  const snapshot = await getDoc(PRODUCTS_DOC);
  if (!snapshot.exists()) {
    return [];
  }
  const data = snapshot.data();
  return normalizeProductItems(data.items);
};

const saveProducts = (items: ProductItem[]) =>
  setDoc(
    PRODUCTS_DOC,
    {
      items: normalizeProductItems(items),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

const subscribeProducts = (callback) =>
  onSnapshot(
    PRODUCTS_DOC,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback([]);
        return;
      }
      const data = snapshot.data();
      callback(normalizeProductItems(data.items));
    },
    (error) => {
      console.error("Failed to subscribe to products", error);
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
  loadMoneyAccounts,
  saveMoneyAccounts,
  subscribeMoneyAccounts,
  loadProducts,
  saveProducts,
  subscribeProducts,
};
