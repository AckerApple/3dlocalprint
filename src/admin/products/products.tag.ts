import { saveProducts, subscribeProducts } from "../shared/firebase.js";
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
  array,
  subscribe,
  a,
} from "taggedjs";
import { Modal } from "../shared/Modal.tag.js";
import { toast } from "../shared/toast.js";
import { AdminNav } from "../shared/AdminNav.tag.js";
import { replaceMountRoot } from "../shared/ssoMount.js";
import { startAdminAppShell } from "../shared/adminAppShell.js";
import type { ProductItem, ProductVariation } from "../../types/product.js";
import { PRODUCT_CATEGORIES, normalizeProductCategories } from "../../product-categories.js";

let app = document.getElementById("productsApp");
const appRoot = { current: app };
const products$ = array<ProductItem>([]);
let stopProducts = null;
let appMounted = false;
let currentUser = null;
let handleSignOut = () => Promise.resolve();

type ProductsUiState = {
  modalOpen: boolean;
  modalMode: "create" | "edit";
  modalIndex: number;
  draftProduct: ProductItem | null;
  isSaving: boolean;
};

const productsUi$ = array<ProductsUiState>([
  {
    modalOpen: false,
    modalMode: "create",
    modalIndex: -1,
    draftProduct: null,
    isSaving: false,
  },
]);

const getProductsUi = () =>
  productsUi$[0] || {
    modalOpen: false,
    modalMode: "create" as const,
    modalIndex: -1,
    draftProduct: null,
    isSaving: false,
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
        return {
          id,
          title,
          slug: toSlug(item?.slug || title) || id,
          description: String(item?.description || "").trim(),
          imageUrl: String(item?.imageUrl || "").trim(),
          unitAmount: Math.max(0, Math.round(Number(item?.unitAmount) || 0)),
          currency: String(item?.currency || "usd").trim().toLowerCase() || "usd",
          categories: normalizeProductCategories(item?.categories),
          active: Boolean(item?.active),
          stripePriceId: String(item?.stripePriceId || "").trim(),
          variations: normalizeVariations(item?.variations),
          taxCode: String(item?.taxCode || "").trim(),
          createdAt: Number(item?.createdAt) || now,
          updatedAt: now,
        } satisfies ProductItem;
      })
      .filter((item): item is ProductItem => Boolean(item))
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
    unitAmount: 0,
    currency: "usd",
    categories: [],
    active: true,
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

const openCreateModal = () => {
  setProductsUi({
    modalMode: "create",
    modalIndex: -1,
    draftProduct: createDraftProduct(),
    modalOpen: true,
    isSaving: false,
  });
};

const openEditModal = (index: number) => {
  const source = products$[index];
  if (!source) return;
  setProductsUi({
    modalMode: "edit",
    modalIndex: index,
    draftProduct: {
      ...source,
      categories: normalizeProductCategories(source.categories),
    },
    modalOpen: true,
    isSaving: false,
  });
};

const closeModal = () => {
  setProductsUi({
    modalOpen: false,
    modalIndex: -1,
    draftProduct: null,
    isSaving: false,
  });
};

const saveModalProduct = async () => {
  const { draftProduct, modalMode, modalIndex, isSaving } = getProductsUi();
  if (isSaving) return;
  if (!draftProduct) return;
  const title = String(draftProduct.title || "").trim();
  if (!title) {
    toast.error("Enter a product title.");
    return;
  }

  const now = Date.now();
  const normalized: ProductItem = {
    ...draftProduct,
    id: String(draftProduct.id || "").trim() || createId(),
    title,
    slug: toSlug(draftProduct.slug || title) || String(draftProduct.id || "").trim() || createId(),
    description: String(draftProduct.description || ""),
    imageUrl: String(draftProduct.imageUrl || "").trim(),
    unitAmount: Math.max(0, Math.round(Number(draftProduct.unitAmount) || 0)),
    currency: String(draftProduct.currency || "usd").trim().toLowerCase() || "usd",
    categories: normalizeProductCategories(draftProduct.categories),
    active: Boolean(draftProduct.active),
    stripePriceId: String(draftProduct.stripePriceId || "").trim(),
    variations: normalizeVariations(draftProduct.variations),
    taxCode: String(draftProduct.taxCode || "").trim(),
    createdAt: Number(draftProduct.createdAt) || now,
    updatedAt: now,
  };

  if (modalMode === "edit" && modalIndex >= 0) {
    const nextItems = [...products$.value];
    nextItems[modalIndex] = normalized;
    setProductsUi({ isSaving: true });
    const didSave = await persistProducts(nextItems, "Product saved.");
    setProductsUi({ isSaving: false });
    if (didSave) {
      closeModal();
    }
  } else {
    const nextItems = [...products$.value, normalized];
    setProductsUi({ isSaving: true });
    const didSave = await persistProducts(nextItems, "Product added.");
    setProductsUi({ isSaving: false });
    if (didSave) {
      closeModal();
    }
  }
};

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
              item?.imageUrl
                ? a
                    .class`product-image-link`
                    .href(item.imageUrl)
                    .target`_blank`
                    .rel`noopener noreferrer`
                    .onClick((event) => event.stopPropagation())(
                    div
                      .class("product-thumb")
                      .style(() => `background-image: url('${String(item.imageUrl || "").replace(/'/g, "%27")}')`)
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
        draggableTitle: true,
        className: "ledger-modal",
        cardClassName: "ledger-modal-card",
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
            label(
              "Image URL",
              input
                .class`manufacturer-input`
                .type`url`
                .placeholder`Image URL`
                .value(() => draftProduct?.imageUrl ?? "")
                .onInput((event) => {
                  const current = getProductsUi().draftProduct;
                  if (!current) return;
                  setProductsUi({
                    draftProduct: {
                      ...current,
                      imageUrl: String(event.target.value || ""),
                    },
                  });
                })()
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
                        setProductsUi({ isSaving: true });
                        const nextItems = products$.value.filter((_, index) => index !== ui.modalIndex);
                        const didSave = await persistProducts(nextItems, "Product removed.");
                        setProductsUi({ isSaving: false });
                        if (!didSave) return;
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
                _=> (ui?.isSaving ? "Saving..." : "Save Product")
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
              id: String(item?.id || "").trim(),
              title: String(item?.title || "").trim(),
              slug: toSlug(item?.slug || item?.title || ""),
              description: String(item?.description || "").trim(),
              imageUrl: String(item?.imageUrl || "").trim(),
              unitAmount: Math.max(0, Math.round(Number(item?.unitAmount) || 0)),
              currency: String(item?.currency || "usd").trim().toLowerCase() || "usd",
              categories: normalizeProductCategories(item?.categories),
              active: Boolean(item?.active),
              stripePriceId: String(item?.stripePriceId || "").trim(),
              variations: normalizeVariations(item?.variations),
              taxCode: String(item?.taxCode || "").trim(),
              createdAt: Number(item?.createdAt) || Date.now(),
              updatedAt: Number(item?.updatedAt) || Date.now(),
            }))
            .filter((item) => item.id && item.title)
        );
        products$.splice(0, products$.length, ...normalized);
        if (authState.isAuthorized) {
          mountApp();
        }
      });
    }
    mountApp();
  },
});
handleSignOut = auth.handleSignOut;
