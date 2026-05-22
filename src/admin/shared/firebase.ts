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
  collection,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { slugifyLocation } from "../filament/location-utils.js";
import type { ManufacturerItem } from "../../types/filament.js";
import type { OrderLineItem, OrderRecord, OrderStatus } from "../../types/order.js";
import type { ProductImage, ProductItem } from "../../types/product.js";
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

const normalizeStorageBucketName = (value: string): string => {
  const bucket = String(value || "")
    .trim()
    .replace(/^gs:\/\//i, "")
    .replace(/^https?:\/\/storage\.googleapis\.com\//i, "")
    .replace(/\/+$/g, "");
  if (!bucket) return bucket;
  return bucket;
};

if (import.meta.env.DEV) {
  console.info(
    "[firebase] storage bucket",
    normalizeStorageBucketName(String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || ""))
  );
}

const firebaseConfig = {
  apiKey: getRequiredEnv("VITE_FIREBASE_API_KEY", import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: getRequiredEnv("VITE_FIREBASE_AUTH_DOMAIN", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: getRequiredEnv("VITE_FIREBASE_PROJECT_ID", import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: normalizeStorageBucketName(
    getRequiredEnv("VITE_FIREBASE_STORAGE_BUCKET", import.meta.env.VITE_FIREBASE_STORAGE_BUCKET)
  ),
  messagingSenderId: getRequiredEnv("VITE_FIREBASE_MESSAGING_SENDER_ID", import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: getRequiredEnv("VITE_FIREBASE_APP_ID", import.meta.env.VITE_FIREBASE_APP_ID),
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
const MAX_PRODUCT_IMAGE_BYTES = 2 * 1024 * 1024;

const FILAMENT_INVENTORY_DOC = doc(db, "filament_inventory", "list");
const FILAMENT_TYPES_DOC = doc(db, "filament_types", "list");
const MANUFACTURERS_DOC = doc(db, "manufacturers", "list");
const ADMINS_DOC = doc(db, "admins", "list");
const LEDGER_DOC = doc(db, "ledger", "entries");
const MONEY_ACCOUNTS_DOC = doc(db, "ledger", "moneyAccounts");
const PRODUCTS_DOC = doc(db, "products", "list");
const ORDERS_COLLECTION = collection(db, "orders");

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

const normalizeProductImages = (images: unknown): ProductImage[] =>
  (Array.isArray(images) ? images : [])
    .map((image) => {
      if (!image || typeof image !== "object") return null;
      const imageUrl = String((image as { imageUrl?: unknown }).imageUrl || "").trim();
      if (!imageUrl) return null;
      const imagePath = String((image as { imagePath?: unknown }).imagePath || "").trim();
      const uploadedAt = Number((image as { uploadedAt?: unknown }).uploadedAt) || Date.now();
      const uploadedDate = String((image as { uploadedDate?: unknown }).uploadedDate || "").trim()
        || new Date(uploadedAt).toISOString();
      const location = String((image as { location?: unknown }).location || "").trim()
        || imagePath
        || imageUrl;
      return {
        imageUrl,
        imagePath,
        uploadedAt,
        uploadedDate,
        location,
      } satisfies ProductImage;
    })
    .filter((image): image is NonNullable<typeof image> => Boolean(image?.imageUrl));

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
      const images = normalizeProductImages((item as { images?: unknown }).images);
      const fallbackImageUrl = String((item as { imageUrl?: unknown }).imageUrl || "").trim();
      const fallbackImagePath = String((item as { imagePath?: unknown }).imagePath || "").trim();
      const mergedImages = images.length
        ? images
        : (fallbackImageUrl
            ? [{
                imageUrl: fallbackImageUrl,
                imagePath: fallbackImagePath,
                uploadedAt: Date.now(),
                uploadedDate: new Date().toISOString(),
                location: fallbackImagePath || fallbackImageUrl,
              } satisfies ProductImage]
            : []);
      const primaryImage = mergedImages[0];
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
        imageUrl: String(primaryImage?.imageUrl || "").trim(),
        imagePath: String(primaryImage?.imagePath || "").trim(),
        images: mergedImages,
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
    .filter((item): item is NonNullable<typeof item> => Boolean(item?.id && item?.title));

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
      salesTaxLiability: Math.min(0, Number(item.salesTaxLiability) || 0),
      processingFees: Math.min(0, Number(item.processingFees) || 0),
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

const ORDER_STATUSES = new Set<OrderStatus>([
  "checkout_created",
  "paid",
  "payment_failed",
  "canceled",
  "unknown",
]);

const normalizeOrderStatus = (value: unknown): OrderStatus => {
  const status = String(value || "").trim() as OrderStatus;
  return ORDER_STATUSES.has(status) ? status : "unknown";
};

const normalizeOrderLineItems = (items: unknown): OrderLineItem[] =>
  (Array.isArray(items) ? items : [])
    .reduce<OrderLineItem[]>((acc, item) => {
      if (!item || typeof item !== "object") return acc;
      const priceId = String((item as { priceId?: unknown }).priceId || "").trim();
      const title = String((item as { title?: unknown }).title || "").trim() || "Product";
      acc.push({
        priceId,
        quantity: Math.max(1, Math.round(Number((item as { quantity?: unknown }).quantity) || 1)),
        title,
        unitAmount: Math.max(0, Math.round(Number((item as { unitAmount?: unknown }).unitAmount) || 0)),
        currency: String((item as { currency?: unknown }).currency || "").trim().toLowerCase(),
        productId: String((item as { productId?: unknown }).productId || "").trim(),
        variationId: String((item as { variationId?: unknown }).variationId || "").trim(),
      });
      return acc;
    }, []);

const getStripeDashboardBase = (stripeMode: "sandbox" | "live" | "" = "") =>
  stripeMode === "sandbox"
    ? "https://dashboard.stripe.com/test"
    : "https://dashboard.stripe.com";

const getStripePaymentIntentUrl = (paymentIntentId = "", stripeMode: "sandbox" | "live" | "" = "") => {
  const id = String(paymentIntentId || "").trim();
  if (!id) return "";
  return `${getStripeDashboardBase(stripeMode)}/payments/${encodeURIComponent(id)}`;
};

const normalizeOrderRecord = (id: string, data: Record<string, unknown>): OrderRecord => {
  const stripeMode = ["sandbox", "live"].includes(String(data.stripeMode || ""))
    ? String(data.stripeMode) as "sandbox" | "live"
    : "";
  const paymentIntentId = String(data.paymentIntentId || "").trim();
  return {
    id: String(data.id || id || "").trim(),
    status: normalizeOrderStatus(data.status),
    lineItems: normalizeOrderLineItems(data.lineItems),
    currency: String(data.currency || "usd").trim().toLowerCase() || "usd",
    amountSubtotal: Math.max(0, Math.round(Number(data.amountSubtotal) || 0)),
    amountTax: Math.max(0, Math.round(Number(data.amountTax) || 0)),
    amountShipping: Math.max(0, Math.round(Number(data.amountShipping) || 0)),
    amountTotal: Math.max(0, Math.round(Number(data.amountTotal) || 0)),
    customerEmail: String(data.customerEmail || "").trim(),
    customerName: String(data.customerName || "").trim(),
    checkoutSessionId: String(data.checkoutSessionId || "").trim(),
    checkoutUrl: String(data.checkoutUrl || "").trim(),
    paymentIntentId,
    stripeCustomerId: String(data.stripeCustomerId || "").trim(),
    latestStripeEventId: String(data.latestStripeEventId || "").trim(),
    stripeMode,
    notificationEmail: String(data.notificationEmail || "").trim(),
    notificationEmailStatus: String(data.notificationEmailStatus || "").trim(),
    createdAt: String(data.createdAt || "").trim(),
    updatedAt: String(data.updatedAt || "").trim(),
    paidAt: String(data.paidAt || "").trim(),
    stripeDashboardUrl: getStripePaymentIntentUrl(paymentIntentId, stripeMode)
      || String(data.stripeDashboardUrl || "").trim(),
    adminOrderUrl: String(data.adminOrderUrl || "").trim(),
    publicOrderUrl: String(data.publicOrderUrl || "").trim(),
  };
};

const subscribeOrders = (callback: (items: OrderRecord[]) => void) =>
  onSnapshot(
    query(ORDERS_COLLECTION, orderBy("updatedAt", "desc"), limit(100)),
    (snapshot) => {
      callback(snapshot.docs.map((orderDoc) => normalizeOrderRecord(orderDoc.id, orderDoc.data())));
    },
    (error) => {
      console.error("Failed to subscribe to orders", error);
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
      rewardsBillingCategory: String(item.rewardsBillingCategory || "").trim(),
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

const getFileExtension = (file: File) => {
  const name = String(file?.name || "");
  const fromName = name.includes(".") ? name.split(".").pop() : "";
  const cleaned = String(fromName || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  if (cleaned) return cleaned;
  const mime = String(file?.type || "").toLowerCase();
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  if (mime === "image/avif") return "avif";
  return "bin";
};

const uploadProductImageFile = async (file: File, productId: string) => {
  if (!(file instanceof File)) {
    throw new Error("Missing image file.");
  }
  if (file.size > MAX_PRODUCT_IMAGE_BYTES) {
    throw new Error("Image must be 2MB or smaller.");
  }
  const normalizedProductId = String(productId || "").trim();
  if (!normalizedProductId) {
    throw new Error("Missing product id.");
  }
  const extension = getFileExtension(file);
  const fileKey = `${Date.now()}_${Math.random().toString(36).slice(2, 9)}.${extension}`;
  const imagePath = `products/${normalizedProductId}/${fileKey}`;
  const imageRef = storageRef(storage, imagePath);
  await uploadBytes(imageRef, file, {
    contentType: file.type || undefined,
    cacheControl: "public,max-age=31536000,immutable",
  });
  const imageUrl = await getDownloadURL(imageRef);
  return {
    imagePath,
    imageUrl,
    uploadedAt: Date.now(),
    uploadedDate: new Date().toISOString(),
    location: imagePath,
  };
};

const deleteProductImageByPath = async (imagePath = "") => {
  const normalizedPath = String(imagePath || "").trim();
  if (!normalizedPath) return;
  try {
    await deleteObject(storageRef(storage, normalizedPath));
  } catch (error: any) {
    const code = String(error?.code || "");
    if (code === "storage/object-not-found") return;
    throw error;
  }
};

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
  subscribeOrders,
  loadMoneyAccounts,
  saveMoneyAccounts,
  subscribeMoneyAccounts,
  loadProducts,
  saveProducts,
  subscribeProducts,
  uploadProductImageFile,
  deleteProductImageByPath,
};
