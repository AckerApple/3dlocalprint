import { saveProducts, subscribeProducts } from "./firebase.js";
import {
  tag,
  tagElement,
  section,
  div,
  span,
  label,
  input,
  textarea,
  button,
  p,
  h1,
  array,
  subscribe,
  a,
} from "taggedjs";
import { toast } from "./toast.js";
import { AdminNav } from "./AdminNav.tag.js";
import { replaceMountRoot } from "./ssoMount.js";
import { startAdminAppShell } from "./adminAppShell.js";
import type { ProductItem } from "../types/product.js";

let app = document.getElementById("productsApp");
const appRoot = { current: app };
const products$ = array<ProductItem>([]);
let stopProducts = null;
let appMounted = false;
let currentUser = null;
let handleSignOut = () => Promise.resolve();

let newTitle = "";
let newPrice = "";
let newImageUrl = "";

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

const addProduct = () => {
  const title = String(newTitle || "").trim();
  if (!title) {
    toast.error("Enter a product title.");
    return;
  }

  const now = Date.now();
  const id = createId();
  const slug = toSlug(title) || id;
  products$.push({
    id,
    title,
    slug,
    description: "",
    imageUrl: String(newImageUrl || "").trim(),
    unitAmount: centsFromInput(newPrice),
    currency: "usd",
    active: true,
    stripePriceId: "",
    taxCode: "",
    createdAt: now,
    updatedAt: now,
  });
  const sorted = sortProducts(products$.value);
  products$.splice(0, products$.length, ...sorted);

  newTitle = "";
  newPrice = "";
  newImageUrl = "";
};

const removeProduct = (index: number) => {
  products$.splice(index, 1);
};

const saveList = async () => {
  if (!auth.authState.isAuthorized) {
    toast.error("Sign in to save changes.");
    return;
  }

  const now = Date.now();
  const normalized = sortProducts(
    products$.value
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
          active: Boolean(item?.active),
          stripePriceId: String(item?.stripePriceId || "").trim(),
          taxCode: String(item?.taxCode || "").trim(),
          createdAt: Number(item?.createdAt) || now,
          updatedAt: now,
        } satisfies ProductItem;
      })
      .filter((item): item is ProductItem => Boolean(item))
  );

  try {
    await saveProducts(normalized);
    toast.success("Products saved.");
  } catch (error) {
    console.error("Failed to save products", error);
    toast.error("Save failed. Try again.");
  }
};

export const ProductsApp = tag(() => [
  AdminNav(handleSignOut, currentUser),
  section.class`panel products-panel`(
    h1("🛒 Products"),
    p("Create and manage your product catalog used by checkout."),
    div.class`products-helper`(
      "Tip: keep this as your source of truth, then connect each variant/product to Stripe price IDs."
    ),
    div.class`products-list`(
      subscribe(
        products$,
        (items) =>
          items.map((item, index) =>
            div.class`product-row`(
              item?.imageUrl
                ? a
                    .class`product-image-link`
                    .href(item.imageUrl)
                    .attr("target", "_blank")
                    .attr("rel", "noopener noreferrer")(
                    div
                      .class("product-thumb")
                      .style(() => `background-image: url('${String(item.imageUrl || "").replace(/'/g, "%27")}')`)
                      ()
                  )
                : div.class`product-thumb`(),
              div.class`product-fields`(
                input
                  .class`manufacturer-input`
                  .type`text`
                  .attr("placeholder", "Product title")
                  .value(() => item?.title ?? "")
                  .onInput((event) => {
                    products$[index] = {
                      ...products$[index],
                      title: String(event.target.value || ""),
                      updatedAt: Date.now(),
                    };
                  })(),
                input
                  .class`manufacturer-input`
                  .type`text`
                  .attr("placeholder", "Slug")
                  .value(() => item?.slug ?? "")
                  .onInput((event) => {
                    products$[index] = {
                      ...products$[index],
                      slug: String(event.target.value || ""),
                      updatedAt: Date.now(),
                    };
                  })(),
                input
                  .class`manufacturer-input`
                  .type`number`
                  .attr("step", "0.01")
                  .attr("min", "0")
                  .attr("placeholder", "Price (USD)")
                  .value(() => dollarsFromCents(item?.unitAmount ?? 0))
                  .onInput((event) => {
                    products$[index] = {
                      ...products$[index],
                      unitAmount: centsFromInput(event.target.value),
                      updatedAt: Date.now(),
                    };
                  })(),
                input
                  .class`manufacturer-input`
                  .type`url`
                  .attr("placeholder", "Image URL")
                  .value(() => item?.imageUrl ?? "")
                  .onInput((event) => {
                    products$[index] = {
                      ...products$[index],
                      imageUrl: String(event.target.value || ""),
                      updatedAt: Date.now(),
                    };
                  })(),
                input
                  .class`manufacturer-input`
                  .type`text`
                  .attr("placeholder", "Stripe price ID (optional)")
                  .value(() => item?.stripePriceId ?? "")
                  .onInput((event) => {
                    products$[index] = {
                      ...products$[index],
                      stripePriceId: String(event.target.value || ""),
                      updatedAt: Date.now(),
                    };
                  })(),
                label(
                  span(
                    "Stripe ",
                    a
                      .href("https://docs.stripe.com/tax/tax-codes")
                      .attr("target", "_blank")
                      .attr("rel", "noopener noreferrer")
                      ("tax code"),
                    " (optional)"
                  ),
                  input
                    .class`manufacturer-input`
                    .type`text`
                    .attr("placeholder", "e.g. txcd_10000000")
                    .value(() => item?.taxCode ?? "")
                    .onInput((event) => {
                      products$[index] = {
                        ...products$[index],
                        taxCode: String(event.target.value || ""),
                        updatedAt: Date.now(),
                      };
                    })(),
                  span.class`field-help`("Only needed when Stripe Tax is enabled.")
                ),
                label(
                  "Description",
                  textarea
                    .class`manufacturer-input products-description-input`
                    .attr("placeholder", "Description")
                    .value(() => item?.description ?? "")
                    .onInput((event) => {
                      products$[index] = {
                        ...products$[index],
                        description: String(event.target.value || ""),
                        updatedAt: Date.now(),
                      };
                    })
                ),
                div.class`product-row-actions`(
                  button
                    .type`button`
                    .class`ghost-button`
                    .onClick(() => {
                      products$[index] = {
                        ...products$[index],
                        active: !Boolean(products$[index]?.active),
                        updatedAt: Date.now(),
                      };
                    })(
                    _=> (item?.active ? "🟢 Active" : "⚪ Inactive")
                  ),
                  button
                    .type`button`
                    .class`ghost-button delete-button`
                    .onClick(() => removeProduct(index))(
                    "Remove"
                  )
                )
              )
            ).key(item.id)
          )
      )
    ),
    div.class`manufacturer-add`(
      input
        .class`manufacturer-input`
        .type`text`
        .attr("placeholder", "New product title")
        .value(() => newTitle)
        .onInput((event) => {
          newTitle = event.target.value;
        })(),
      input
        .class`manufacturer-input`
        .type`number`
        .attr("step", "0.01")
        .attr("min", "0")
        .attr("placeholder", "New price (USD)")
        .value(() => newPrice)
        .onInput((event) => {
          newPrice = event.target.value;
        })(),
      input
        .class`manufacturer-input`
        .type`url`
        .attr("placeholder", "New image URL (optional)")
        .value(() => newImageUrl)
        .onInput((event) => {
          newImageUrl = event.target.value;
        })(),
      button
        .type`button`
        .class`add-button`
        .onClick(addProduct)(
        "➕ Add Product"
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
              active: Boolean(item?.active),
              stripePriceId: String(item?.stripePriceId || "").trim(),
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
