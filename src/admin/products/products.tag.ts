import {
  saveProducts,
  subscribeProducts,
  uploadProductImageFile,
  deleteProductImageByPath,
} from "../shared/firebase.js";
import {
  tag,
  tagElement,
  section,
  div,
  span,
  label,
  input,
  textarea,
  select,
  option,
  button,
  p,
  h1,
  strong,
  hr,
  array,
  subscribe,
  a,
} from "taggedjs";
import { Modal } from "../shared/Modal.tag.js";
import { toast } from "../shared/toast.js";
import { AdminNav } from "../shared/AdminNav.tag.js";
import { replaceMountRoot } from "../shared/ssoMount.js";
import { startAdminAppShell } from "../shared/adminAppShell.js";
import type { ProductImage, ProductItem, ProductVariation } from "../../types/product.js";
import { PRODUCT_CATEGORIES, normalizeProductCategories } from "../../product-categories.js";

let app = document.getElementById("productsApp");
const appRoot = { current: app };
const products$ = array<ProductItem>([]);
const MAX_PRODUCT_IMAGE_BYTES = 2 * 1024 * 1024;
let stopProducts = null;
let appMounted = false;
let currentUser = null;
let handleSignOut = () => Promise.resolve();
let requestedProductHandled = false;

const getRequestedProductId = () =>
  String(new URLSearchParams(window.location.search).get("productId") || "").trim();

const syncProductUrl = (productId = "") => {
  const url = new URL(window.location.href);
  if (productId) {
    url.searchParams.set("productId", productId);
  } else {
    url.searchParams.delete("productId");
  }
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
};

type ProductsUiState = {
  modalOpen: boolean;
  modalMode: "create" | "edit";
  modalIndex: number;
  draftProduct: ProductItem | null;
  isSaving: boolean;
  pendingImageFile: File | null;
  pendingImageUrl: string;
};

const productsUi$ = array<ProductsUiState>([
  {
    modalOpen: false,
    modalMode: "create",
    modalIndex: -1,
    draftProduct: null,
    isSaving: false,
    pendingImageFile: null,
    pendingImageUrl: "",
  },
]);

const getProductsUi = () =>
  productsUi$[0] || {
    modalOpen: false,
    modalMode: "create" as const,
    modalIndex: -1,
    draftProduct: null,
    isSaving: false,
    pendingImageFile: null,
    pendingImageUrl: "",
  };

const setProductsUi = (patch: Partial<ProductsUiState>) => {
  const current = getProductsUi();
  productsUi$[0] = {
    ...current,
    ...patch,
  };
};

const createId = () => {
  if (globalThis.crypto?.randomUUID) {
    return crypto.randomUUID();
  }
  const rand = Math.random().toString(36).slice(2, 10);
  return `product_${Date.now().toString(36)}_${rand}`;
};

const toSlug = (value = "") =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const centsFromInput = (value = "") => {
  const amount = Number(String(value || "").trim());
  if (!Number.isFinite(amount) || amount < 0) return 0;
  return Math.round(amount * 100);
};

const dollarsFromCents = (value = 0) => (Math.max(0, Number(value) || 0) / 100).toFixed(2);

const sortProducts = (items: ProductItem[]) =>
  [...items].sort((a, b) => String(a.title || "").localeCompare(String(b.title || "")));

const createVariationId = (label = "") => {
  const slug = String(label || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `variation_${Math.random().toString(36).slice(2, 9)}`;
};

const normalizeVariations = (
  variations: unknown,
  { allowEmptyLabel = false }: { allowEmptyLabel?: boolean } = {}
): ProductVariation[] =>
  (Array.isArray(variations) ? variations : [])
    .map((variation) => {
      if (!variation || typeof variation !== "object") return null;
      const label = String((variation as { label?: unknown }).label || "").trim();
      if (!label && !allowEmptyLabel) return null;
      return {
        id: createVariationId(String((variation as { id?: unknown }).id || "") || label || undefined),
        label,
        unitAmount: Math.max(0, Math.round(Number((variation as { unitAmount?: unknown }).unitAmount) || 0)),
        stripePriceId: String((variation as { stripePriceId?: unknown }).stripePriceId || "").trim(),
        active: Boolean((variation as { active?: unknown }).active),
      };
    })
    .filter((variation): variation is ProductVariation =>
      Boolean(variation?.id && (allowEmptyLabel || variation?.label))
    );

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

const getProductImagesWithFallback = (product: ProductItem | null | undefined): ProductImage[] => {
  const images = normalizeProductImages(product?.images);
  if (images.length) return images;
  const imageUrl = String(product?.imageUrl || "").trim();
  if (!imageUrl) return [];
  const imagePath = String(product?.imagePath || "").trim();
  const uploadedAt = Number(product?.updatedAt) || Date.now();
  return [{
    imageUrl,
    imagePath,
    uploadedAt,
    uploadedDate: new Date(uploadedAt).toISOString(),
    location: imagePath || imageUrl,
  }];
};

const getPrimaryImage = (product: ProductItem | null | undefined): ProductImage | null => {
  const images = getProductImagesWithFallback(product);
  if (images.length) return images[0];
  return null;
};

const getDefaultVariation = (product: ProductItem): ProductVariation => ({
  id: "default",
  label: "Default",
  unitAmount: Math.max(0, Math.round(Number(product?.unitAmount) || 0)),
  stripePriceId: String(product?.stripePriceId || "").trim(),
  active: true,
});

const getActiveVariations = (product: ProductItem): ProductVariation[] => {
  const variations = normalizeVariations(product?.variations);
  const active = variations.filter((variation) => variation.active);
  if (active.length) return active;
  return [getDefaultVariation(product)];
};

const normalizeProductsForSave = (items: ProductItem[]) => {
  const now = Date.now();
  return sortProducts(
    (Array.isArray(items) ? items : [])
      .map((item) => {
        const title = String(item?.title || "").trim();
        const id = String(item?.id || "").trim() || createId();
        if (!title) return null;
        const images = getProductImagesWithFallback(item);
        const primaryImage = images[0];
        return {
          id,
          title,
          slug: toSlug(item?.slug || title) || id,
          description: String(item?.description || "").trim(),
          imageUrl: String(primaryImage?.imageUrl || item?.imageUrl || "").trim(),
          imagePath: String(primaryImage?.imagePath || item?.imagePath || "").trim(),
          images,
          unitAmount: Math.max(0, Math.round(Number(item?.unitAmount) || 0)),
          currency: String(item?.currency || "usd").trim().toLowerCase() || "usd",
          categories: normalizeProductCategories(item?.categories),
          active: Boolean(item?.active),
          catalogVisible: item?.catalogVisible !== false,
          stripePriceId: String(item?.stripePriceId || "").trim(),
          variations: normalizeVariations(item?.variations),
          taxCode: String(item?.taxCode || "").trim(),
          createdAt: Number(item?.createdAt) || now,
          updatedAt: now,
        } satisfies ProductItem;
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
  );
};

const replaceProducts = (items: ProductItem[]) => {
  const normalized = sortProducts(Array.isArray(items) ? items : []);
  products$.splice(0, products$.length, ...normalized);
};

const persistProducts = async (items: ProductItem[], successMessage = "Products saved.") => {
  if (!auth.authState.isAuthorized) {
    toast.error("Sign in to save changes.");
    return false;
  }

  const normalized = normalizeProductsForSave(items);
  try {
    await saveProducts(normalized);
    replaceProducts(normalized);
    toast.success(successMessage);
    return true;
  } catch (error) {
    console.error("Failed to save products", error);
    toast.error("Save failed. Try again.");
    return false;
  }
};

const createDraftProduct = (): ProductItem => {
  const now = Date.now();
  const id = createId();
  return {
    id,
    title: "",
    slug: id,
    description: "",
    imageUrl: "",
    imagePath: "",
    images: [],
    unitAmount: 0,
    currency: "usd",
    categories: [],
    active: true,
    catalogVisible: true,
    stripePriceId: "",
    variations: [],
    taxCode: "",
    createdAt: now,
    updatedAt: now,
  };
};

const addVariationToDraft = () => {
  const current = getProductsUi().draftProduct;
  if (!current) return;
  const nextVariations = [
    ...normalizeVariations(current.variations, { allowEmptyLabel: true }),
    {
      id: createVariationId(),
      label: "",
      unitAmount: Math.max(0, Math.round(Number(current.unitAmount) || 0)),
      stripePriceId: "",
      active: true,
    },
  ];
  setProductsUi({
    draftProduct: {
      ...current,
      variations: nextVariations,
    },
  });
};

const updateVariationInDraft = (variationId: string, patch: Partial<ProductVariation>) => {
  const current = getProductsUi().draftProduct;
  if (!current) return;
  const nextVariations = normalizeVariations(current.variations, { allowEmptyLabel: true }).map((variation) =>
    variation.id === variationId
      ? {
          ...variation,
          ...patch,
        }
      : variation
  );
  setProductsUi({
    draftProduct: {
      ...current,
      variations: nextVariations,
    },
  });
};

const removeVariationFromDraft = (variationId: string) => {
  const current = getProductsUi().draftProduct;
  if (!current) return;
  const nextVariations = normalizeVariations(current.variations, { allowEmptyLabel: true }).filter(
    (variation) => variation.id !== variationId
  );
  setProductsUi({
    draftProduct: {
      ...current,
      variations: nextVariations,
    },
  });
};

const addCategoryToDraft = (category: string) => {
  const ui = getProductsUi();
  const draftProduct = ui.draftProduct;
  if (!draftProduct) return;
  const nextCategory = String(category || "").trim().toLowerCase();
  if (!nextCategory) return;
  const current = normalizeProductCategories(draftProduct.categories);
  if (current.includes(nextCategory)) return;
  setProductsUi({
    draftProduct: {
      ...draftProduct,
      categories: [...current, nextCategory],
      updatedAt: Date.now(),
    },
  });
};

const removeCategoryFromDraft = (category: string) => {
  const ui = getProductsUi();
  const draftProduct = ui.draftProduct;
  if (!draftProduct) return;
  const nextCategory = String(category || "").trim().toLowerCase();
  setProductsUi({
    draftProduct: {
      ...draftProduct,
      categories: normalizeProductCategories(draftProduct.categories).filter((item) => item !== nextCategory),
      updatedAt: Date.now(),
    },
  });
};

const removeImageFromDraft = (imageIndex: number) => {
  const current = getProductsUi().draftProduct;
  if (!current) return;
  const images = getProductImagesWithFallback(current).filter((_, index) => index !== imageIndex);
  const primary = images[0];
  setProductsUi({
    draftProduct: {
      ...current,
      images,
      imageUrl: String(primary?.imageUrl || "").trim(),
      imagePath: String(primary?.imagePath || "").trim(),
      updatedAt: Date.now(),
    },
  });
};

const openCreateModal = () => {
  syncProductUrl();
  setProductsUi({
    modalMode: "create",
    modalIndex: -1,
    draftProduct: createDraftProduct(),
    modalOpen: true,
    isSaving: false,
    pendingImageFile: null,
    pendingImageUrl: "",
  });
};

const openEditModal = (index: number) => {
  const source = products$[index];
  if (!source) return;
  syncProductUrl(source.id);
  setProductsUi({
    modalMode: "edit",
    modalIndex: index,
    draftProduct: {
      ...source,
      categories: normalizeProductCategories(source.categories),
      imagePath: String(source.imagePath || "").trim(),
      images: getProductImagesWithFallback(source),
    },
    modalOpen: true,
    isSaving: false,
    pendingImageFile: null,
    pendingImageUrl: "",
  });
};

const closeModal = () => {
  syncProductUrl();
  setProductsUi({
    modalOpen: false,
    modalIndex: -1,
    draftProduct: null,
    isSaving: false,
    pendingImageFile: null,
    pendingImageUrl: "",
  });
};

const saveModalProduct = async () => {
  const { draftProduct, modalMode, modalIndex, isSaving, pendingImageFile, pendingImageUrl } = getProductsUi();
  if (isSaving) return;
  if (!draftProduct) return;
  const title = String(draftProduct.title || "").trim();
  if (!title) {
    toast.error("Enter a product title.");
    return;
  }

  const now = Date.now();
  const normalizedId = String(draftProduct.id || "").trim() || createId();
  const existingProduct =
    modalMode === "edit" && modalIndex >= 0 ? products$.value[modalIndex] : null;
  const previousImagePaths = new Set(
    [
      ...normalizeProductImages(existingProduct?.images).map((image) => String(image?.imagePath || "").trim()),
      String(existingProduct?.imagePath || "").trim(),
    ].filter(Boolean)
  );

  const uploadedImagePaths: string[] = [];
  let nextImages = normalizeProductImages(draftProduct.images);
  const normalizedPendingImageUrl = String(pendingImageUrl || "").trim();

  setProductsUi({ isSaving: true });

  try {
    if (normalizedPendingImageUrl) {
      const pendingUrlEntry: ProductImage = {
        imageUrl: normalizedPendingImageUrl,
        imagePath: "",
        uploadedAt: now,
        uploadedDate: new Date(now).toISOString(),
        location: normalizedPendingImageUrl,
      };
      nextImages = [pendingUrlEntry, ...nextImages];
    }

    if (pendingImageFile) {
      const uploadResult = await uploadProductImageFile(
        pendingImageFile,
        normalizedId
      );
      uploadedImagePaths.push(String(uploadResult.imagePath || "").trim());
      const uploadedImage: ProductImage = {
        imageUrl: uploadResult.imageUrl,
        imagePath: uploadResult.imagePath,
        uploadedAt: uploadResult.uploadedAt,
        uploadedDate: uploadResult.uploadedDate,
        location: uploadResult.location,
      };
      nextImages = [uploadedImage, ...nextImages];
    }

    const uniqueImageMap = new Map<string, ProductImage>();
    nextImages.forEach((image) => {
      const key = `${String(image?.imagePath || "").trim()}|${String(image?.imageUrl || "").trim()}`;
      if (!key || uniqueImageMap.has(key)) return;
      uniqueImageMap.set(key, image);
    });
    nextImages = Array.from(uniqueImageMap.values());
    const primaryImage = nextImages[0];

    const normalized: ProductItem = {
      ...draftProduct,
      id: normalizedId,
      title,
      slug: toSlug(draftProduct.slug || title) || normalizedId,
      description: String(draftProduct.description || ""),
      images: nextImages,
      imagePath: String(primaryImage?.imagePath || "").trim(),
      imageUrl: String(primaryImage?.imageUrl || "").trim(),
      unitAmount: Math.max(0, Math.round(Number(draftProduct.unitAmount) || 0)),
      currency: String(draftProduct.currency || "usd").trim().toLowerCase() || "usd",
      categories: normalizeProductCategories(draftProduct.categories),
      active: Boolean(draftProduct.active),
      catalogVisible: draftProduct.catalogVisible !== false,
      stripePriceId: String(draftProduct.stripePriceId || "").trim(),
      variations: normalizeVariations(draftProduct.variations),
      taxCode: String(draftProduct.taxCode || "").trim(),
      createdAt: Number(draftProduct.createdAt) || now,
      updatedAt: now,
    };

    if (modalMode === "edit" && modalIndex >= 0) {
      const nextItems = [...products$.value];
      nextItems[modalIndex] = normalized;
      const didSave = await persistProducts(nextItems, "Product saved.");
      if (didSave) {
        const nextImagePaths = new Set(
          [
            ...normalizeProductImages(normalized.images).map((image) => String(image?.imagePath || "").trim()),
            String(normalized.imagePath || "").trim(),
          ].filter(Boolean)
        );
        const removedPaths = [...previousImagePaths].filter((path) => !nextImagePaths.has(path));
        if (removedPaths.length) {
          await Promise.all(
            removedPaths.map((path) =>
              deleteProductImageByPath(path).catch((error) => {
                console.warn("Failed to cleanup old product image", error);
              })
            )
          );
        }
        closeModal();
      }
    } else {
      const nextItems = [...products$.value, normalized];
      const didSave = await persistProducts(nextItems, "Product added.");
      if (didSave) {
        closeModal();
      }
    }
  } catch (error) {
    console.error("Failed to save product", error);
    await Promise.all(
      uploadedImagePaths.map((path) =>
        deleteProductImageByPath(path).catch((cleanupError) => {
          console.warn("Failed to cleanup uploaded product image", cleanupError);
        })
      )
    );
    const message = String((error as { message?: unknown })?.message || "").toLowerCase();
    const code = String((error as { code?: unknown })?.code || "").toLowerCase();
    if (code.startsWith("storage/") || message.includes("storage") || message.includes("cors")) {
      toast.error("Image upload failed. Verify Firebase Storage is enabled, rules allow uploads, and bucket config is correct.");
    } else {
      toast.error("Save failed. Try again.");
    }
  } finally {
    const currentUi = getProductsUi();
    if (!currentUi.modalOpen) {
      setProductsUi({
        isSaving: false,
        pendingImageFile: null,
        pendingImageUrl: "",
      });
      return;
    }
    const refreshedDraft = normalizedProductFallback(draftProduct);
    setProductsUi({
      isSaving: false,
      pendingImageFile: null,
      pendingImageUrl: "",
      draftProduct: refreshedDraft,
    });
  }
};

const normalizedProductFallback = (product: ProductItem): ProductItem => ({
  ...product,
  id: String(product?.id || "").trim() || createId(),
  title: String(product?.title || "").trim(),
  slug: toSlug(product?.slug || product?.title || "") || String(product?.id || "").trim() || createId(),
  description: String(product?.description || ""),
  images: getProductImagesWithFallback(product),
  imagePath: String(getPrimaryImage(product)?.imagePath || "").trim(),
  imageUrl: String(getPrimaryImage(product)?.imageUrl || "").trim(),
  unitAmount: Math.max(0, Math.round(Number(product?.unitAmount) || 0)),
  currency: String(product?.currency || "usd").trim().toLowerCase() || "usd",
  categories: normalizeProductCategories(product?.categories),
  active: Boolean(product?.active),
  catalogVisible: product?.catalogVisible !== false,
  stripePriceId: String(product?.stripePriceId || "").trim(),
  variations: normalizeVariations(product?.variations),
  taxCode: String(product?.taxCode || "").trim(),
  createdAt: Number(product?.createdAt) || Date.now(),
  updatedAt: Number(product?.updatedAt) || Date.now(),
});

const saveList = async () => {
  await persistProducts(products$.value, "Products saved.");
};

export const ProductsApp = tag(() => [
  AdminNav(handleSignOut, currentUser),
  section.class`panel products-panel`(
    h1("🛒 Products"),
    p("Create and manage your product catalog used by checkout."),
    div.class`products-helper`(
      "Tip: keep this as your source of truth, then connect each variant/product to Stripe price IDs."
    ),
    div.class`products-toolbar`(
      button
        .type`button`
        .class`add-button`
        .onClick(openCreateModal)(
        "➕ Add Product"
      )
    ),
    div.class`products-list products-listing`(
      subscribe(
        products$,
        (items) =>
          items.map((item, index) =>
            div.class`product-row product-list-row`
              .onClick(() => openEditModal(index))(
              getPrimaryImage(item)?.imageUrl
                ? a
                    .class`product-image-link`
                    .href(() => String(getPrimaryImage(item)?.imageUrl || ""))
                    .target`_blank`
                    .rel`noopener noreferrer`
                    .onClick((event) => event.stopPropagation())(
                    div
                      .class("product-thumb")
                      .style(() => `background-image: url('${String(getPrimaryImage(item)?.imageUrl || "").replace(/'/g, "%27")}')`)
                      ()
                    )
                : div.class`product-thumb`(),
              div.class`product-list-summary`(
                div.class`product-list-title-row`(
                  strong(_=> item?.title || "Untitled product"),
                  span.class`product-list-price`(_=> `$${dollarsFromCents(item?.unitAmount ?? 0)}`)
                ),
                div.class`product-list-meta`(
                  span(_=> item?.active ? "🟢 Active" : "⚪ Inactive"),
                  item?.catalogVisible === false
                    ? span.class`product-link-only-status`("🔗 Link only")
                    : null,
                  span(_=> {
                    const count = normalizeVariations(item?.variations).length;
                    return count > 1 ? `${count} options` : "1 option";
                  })
                ),
                div.class`product-category-pills`(
                  _=> normalizeProductCategories(item?.categories).map((category) =>
                    span.class`product-category-pill`(category).key(`${item.id}-category-${category}`)
                  )
                ),
                div.class`product-row-actions`(
                  button
                    .type`button`
                    .class`ghost-button`
                    .onClick((event) => {
                      event.stopPropagation();
                      openEditModal(index);
                    })(
                    "Edit"
                  )
                )
              )
            ).key(item.id)
          )
      )
    ),
    div.class`auth-actions`(
      button
        .type`button`
        .class`add-button`
        .onClick(saveList)(
        "💾 Save Products"
      )
    )
  ),
  subscribe(
    productsUi$,
    ([ui]) =>
      Modal({
        modalOpen: ui?.modalOpen ?? false,
        title: ui?.modalMode === "edit" ? "Edit Product" : "Add Product",
        draggableTitle: false,
        className: "ledger-modal products-modal",
        cardClassName: "ledger-modal-card products-modal-card",
        bodyClassName: "products-modal-body",
        onClose: closeModal,
        content: () => {
          const draftProduct = ui?.draftProduct;
          if (!draftProduct) return null;
          return div.class`product-fields`(
            label(
              "Title",
              input
                .class`manufacturer-input`
                .type`text`
                .placeholder`Product title`
                .value(() => draftProduct?.title ?? "")
                .onInput((event) => {
                  const current = getProductsUi().draftProduct;
                  if (!current) return;
                  setProductsUi({
                    draftProduct: {
                      ...current,
                      title: String(event.target.value || ""),
                    },
                  });
                })()
            ),
            label(
              "Slug",
              input
                .class`manufacturer-input`
                .type`text`
                .placeholder`Slug`
                .value(() => draftProduct?.slug ?? "")
                .onInput((event) => {
                  const current = getProductsUi().draftProduct;
                  if (!current) return;
                  setProductsUi({
                    draftProduct: {
                      ...current,
                      slug: String(event.target.value || ""),
                    },
                  });
                })()
            ),
            div.class`product-category-controls`(
              label(
                "Categories",
                select
                  .class`manufacturer-input`
                  .onChange((event) => {
                    const next = String(event?.target?.value || "").trim().toLowerCase();
                    addCategoryToDraft(next);
                    event.target.value = "";
                  })(
                  option.value``("Select a category"),
                  PRODUCT_CATEGORIES.map((category) =>
                    option.value(category)(category)
                  )
                )
              ),
              div.class`product-category-pills`(
                _=> normalizeProductCategories(draftProduct?.categories).map((category) =>
                  button
                    .type`button`
                    .class`product-category-pill`
                    .onClick(() => removeCategoryFromDraft(category))(
                    `${category} ✕`
                  ).key(`draft-category-${category}`)
                )
              )
            ),
            label(
              "Base price (USD)",
              input
                .class`manufacturer-input`
                .type`number`
                .step`0.01`
                .min`0`
                .placeholder`Price (USD)`
                .value(() => dollarsFromCents(draftProduct?.unitAmount ?? 0))
                .onInput((event) => {
                  const current = getProductsUi().draftProduct;
                  if (!current) return;
                  setProductsUi({
                    draftProduct: {
                      ...current,
                      unitAmount: centsFromInput(event.target.value),
                    },
                  });
                })()
            ),
            hr(),
            div.class`product-field-full`(
              strong("Product Images"),
              span.class`field-help`(
                "Add by file upload or legacy URL. New images are saved with upload time/date and location."
              ),
              label(
                "Upload image file",
                input
                  .class`manufacturer-input`
                  .type`file`
                  .attr("accept", "image/*")
                  .onChange((event) => {
                    const current = getProductsUi().draftProduct;
                    if (!current) return;
                    const target = event?.target as HTMLInputElement | null;
                    const file = target?.files?.[0] || null;
                    if (file && file.size > MAX_PRODUCT_IMAGE_BYTES) {
                      toast.error("Image must be 2MB or smaller.");
                      if (target) {
                        target.value = "";
                      }
                      setProductsUi({
                        pendingImageFile: null,
                      });
                      return;
                    }
                    setProductsUi({
                      pendingImageFile: file,
                    });
                  })(),
                _=> getProductsUi().pendingImageFile
                  ? span.class`field-help`(() => `Selected: ${getProductsUi().pendingImageFile?.name || ""}`)
                  : null
              ),
              label(
                "Add image by URL (optional)",
                input
                  .class`manufacturer-input`
                  .type`url`
                  .placeholder`https://...`
                  .value(() => getProductsUi().pendingImageUrl || "")
                  .onInput((event) => {
                    setProductsUi({
                      pendingImageUrl: String(event.target.value || ""),
                    });
                  })(),
                span.class`field-help`("Useful for migrating old externally hosted images.")
              ),
              div.class`product-image-list`(
                _=> {
                  const images = getProductImagesWithFallback(draftProduct);
                  if (!images.length) {
                    return span.class`field-help`("No saved product images yet.");
                  }
                  return images.map((image, imageIndex) =>
                    div.class`product-image-row`(
                      a
                        .class`product-image-modal-preview-link`
                        .href(image.imageUrl)
                        .target`_blank`
                        .rel`noopener noreferrer`(
                        div
                          .class`product-image-modal-preview`
                          .style(() => `background-image: url('${String(image.imageUrl || "").replace(/'/g, "%27")}')`)
                          .attr("role", "img")
                          .attr("aria-label", `Preview of product image ${imageIndex + 1}`)(),
                        span(`Image ${imageIndex + 1}`)
                      ),
                      span.class`field-help product-image-meta`(_=> `${image.uploadedDate} • ${image.location}`),
                      button
                        .type`button`
                        .class`ghost-button delete-button`
                        .onClick(() => removeImageFromDraft(imageIndex))(
                        "Remove"
                      )
                    ).key(`draft-image-${imageIndex}`)
                  );
                },
              )
            ),
            label(
              "Stripe price ID",
              input
                .class`manufacturer-input`
                .type`text`
                .placeholder`Stripe price ID`
                .value(() => draftProduct?.stripePriceId ?? "")
                .onInput((event) => {
                  const current = getProductsUi().draftProduct;
                  if (!current) return;
                  setProductsUi({
                    draftProduct: {
                      ...current,
                      stripePriceId: String(event.target.value || ""),
                    },
                  });
                })(),
              span.class`field-help`("Optional.")
            ),
            label(
              span(
                "Stripe ",
                a
                  .href("https://docs.stripe.com/tax/tax-codes")
                  .target`_blank`
                  .rel`noopener noreferrer`
                  ("tax code")
              ),
              input
                .class`manufacturer-input`
                .type`text`
                .placeholder`e.g. txcd_10000000`
                .value(() => draftProduct?.taxCode ?? "")
                .onInput((event) => {
                  const current = getProductsUi().draftProduct;
                  if (!current) return;
                  setProductsUi({
                    draftProduct: {
                      ...current,
                      taxCode: String(event.target.value || ""),
                    },
                  });
                })(),
              span.class`field-help`("Optional. Only needed when Stripe Tax is enabled.")
            ),
            label.class`product-field-full`(
              "Description",
              textarea
                .class`manufacturer-input products-description-input`
                .placeholder`Description`
                .value(() => draftProduct?.description ?? "")
                .onInput((event) => {
                  const current = getProductsUi().draftProduct;
                  if (!current) return;
                  setProductsUi({
                    draftProduct: {
                      ...current,
                      description: String(event.target.value || ""),
                    },
                  });
                })()
            ),
            div.class`product-field-full product-variations`(
              div.class`product-variations-header`(
                span("Variations"),
                button
                  .type`button`
                  .class`ghost-button`
                  .onClick(addVariationToDraft)(
                  "➕ Add option"
                )
              ),
              div.class`product-variations-list`(
                div.class`product-variation-head`(
                  span("Option"),
                  span("Price"),
                  span("Stripe price ID"),
                  span("Status"),
                  span("Remove")
                ),
                _=> normalizeVariations(draftProduct?.variations, { allowEmptyLabel: true }).map((variation) =>
                  div.class`product-variation-row`(
                    input
                      .class`manufacturer-input`
                      .type`text`
                      .placeholder`Option label`
                      .value(() => variation.label)
                      .onInput((event) => {
                        const nextLabel = String(event.target.value || "");
                        updateVariationInDraft(variation.id, {
                          label: nextLabel,
                        });
                      })(),
                    input
                      .class`manufacturer-input`
                      .type`number`
                      .step`0.01`
                      .min`0`
                      .placeholder`Option price`
                      .value(() => dollarsFromCents(variation.unitAmount))
                      .onInput((event) => {
                        updateVariationInDraft(variation.id, {
                          unitAmount: centsFromInput(event.target.value),
                        });
                      })(),
                    input
                      .class`manufacturer-input`
                      .type`text`
                      .placeholder`Stripe price ID`
                      .value(() => variation.stripePriceId)
                      .onInput((event) => {
                        updateVariationInDraft(variation.id, {
                          stripePriceId: String(event.target.value || ""),
                        });
                      })(),
                    button
                      .type`button`
                      .class`ghost-button`
                      .onClick(() => {
                        updateVariationInDraft(variation.id, {
                          active: !variation.active,
                        });
                      })(
                      _=> variation.active ? "🟢 Active" : "⚪ Inactive"
                    ),
                    button
                      .type`button`
                      .class`ghost-button delete-button`
                      .onClick(() => removeVariationFromDraft(variation.id))(
                      "Remove"
                    )
                  ).key(`variation-${variation.id}`)
                )
              ),
              span.class`field-help`(
                "Use options for one product with multiple formats (for example: with keychain / without keychain). Stripe price ID is optional per option."
              )
            ),
            div.class`product-row-actions`(
              label.class`product-catalog-visibility`(
                input
                  .type`checkbox`
                  .checked(_=> draftProduct?.catalogVisible !== false)
                  .onChange((event) => {
                    const current = getProductsUi().draftProduct;
                    if (!current) return;
                    setProductsUi({
                      draftProduct: {
                        ...current,
                        catalogVisible: Boolean(event.target.checked),
                      },
                    });
                  })(),
                "Show in public catalog"
              ),
              button
                .type`button`
                .class`ghost-button`
                .onClick(() => {
                  const current = getProductsUi().draftProduct;
                  if (!current) return;
                  setProductsUi({
                    draftProduct: {
                      ...current,
                      active: !Boolean(current.active),
                    },
                  });
                })(
                _=> (draftProduct?.active ? "🟢 Active" : "⚪ Inactive")
              ),
              ui?.modalMode === "edit"
                ? button
                    .type`button`
                    .class`ghost-button delete-button`
                    .disabled(_=> ui?.isSaving ?? false)
                    .onClick(async () => {
                      if (ui?.isSaving) return;
                      if ((ui?.modalIndex ?? -1) >= 0) {
                        const target = products$.value[ui.modalIndex];
                        const targetImagePaths = new Set(
                          [
                            ...normalizeProductImages(target?.images).map((image) =>
                              String(image?.imagePath || "").trim()
                            ),
                            String(target?.imagePath || "").trim(),
                          ].filter(Boolean)
                        );
                        setProductsUi({ isSaving: true });
                        const nextItems = products$.value.filter((_, index) => index !== ui.modalIndex);
                        const didSave = await persistProducts(nextItems, "Product removed.");
                        setProductsUi({ isSaving: false });
                        if (!didSave) return;
                        await Promise.all(
                          [...targetImagePaths].map((path) =>
                            deleteProductImageByPath(path).catch((error) => {
                              console.warn("Failed to cleanup deleted product image", error);
                            })
                          )
                        );
                      }
                      closeModal();
                    })(
                    "Remove"
                  )
                : null,
              button
                .type`button`
                .class`add-button`
                .disabled(_=> ui?.isSaving ?? false)
                .onClick(saveModalProduct)(
                _=> (ui?.isSaving ? "⏳ Saving..." : "☁️ Save Product")
              )
            )
          );
        },
      })
  ),
]);

const mountApp = () => {
  if (!appRoot.current || appMounted) {
    return;
  }
  const nextRoot = replaceMountRoot(appRoot);
  if (!nextRoot) return;
  nextRoot.replaceChildren();
  tagElement(ProductsApp, nextRoot);
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
    if (stopProducts) {
      stopProducts();
      stopProducts = null;
    }
  },
  onDenied: () => {
    if (stopProducts) {
      stopProducts();
      stopProducts = null;
    }
  },
  onAuthorized: ({ authState }) => {
    if (!stopProducts) {
      stopProducts = subscribeProducts((items) => {
        const normalized = sortProducts(
          (Array.isArray(items) ? items : [])
            .map((item) => ({
              ...(item || {}),
              id: String(item?.id || "").trim(),
              title: String(item?.title || "").trim(),
              slug: toSlug(item?.slug || item?.title || ""),
              description: String(item?.description || "").trim(),
              images: getProductImagesWithFallback(item),
              imageUrl: String(getPrimaryImage(item)?.imageUrl || item?.imageUrl || "").trim(),
              imagePath: String(getPrimaryImage(item)?.imagePath || item?.imagePath || "").trim(),
              unitAmount: Math.max(0, Math.round(Number(item?.unitAmount) || 0)),
              currency: String(item?.currency || "usd").trim().toLowerCase() || "usd",
              categories: normalizeProductCategories(item?.categories),
              active: Boolean(item?.active),
              catalogVisible: item?.catalogVisible !== false,
              stripePriceId: String(item?.stripePriceId || "").trim(),
              variations: normalizeVariations(item?.variations),
              taxCode: String(item?.taxCode || "").trim(),
              createdAt: Number(item?.createdAt) || Date.now(),
              updatedAt: Number(item?.updatedAt) || Date.now(),
            }))
            .filter((item) => item.id && item.title)
        );
        products$.splice(0, products$.length, ...normalized);
        if (!requestedProductHandled) {
          requestedProductHandled = true;
          const requestedProductId = getRequestedProductId();
          const requestedProductIndex = normalized.findIndex(
            (product) => product.id === requestedProductId
          );
          if (requestedProductIndex >= 0) {
            openEditModal(requestedProductIndex);
          }
        }
        if (authState.isAuthorized) {
          mountApp();
        }
      });
    }
    mountApp();
  },
});
handleSignOut = auth.handleSignOut;
