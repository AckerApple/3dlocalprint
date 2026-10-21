import { checkoutBlockReason } from "./order-checkout-link.js";
import { isNameBadgeProduct, validateBadgeName } from "./name-badges.js";
import { loadProducts } from "./admin/shared/firebase.js";
import { fetchApiWithFallback } from "./api-url.js";
import type { ProductItem } from "./types/product.js";
import {
  clearCart,
  loadCart,
  removeFromCart,
  updateCartItemQuantity,
  type CartItem,
} from "./cart-store.js";
import {
  tag,
  tagElement,
  section,
  div,
  h2,
  p,
  img,
  input,
  label,
  a,
  button,
  strong,
  span,
} from "taggedjs";
import { Subject } from "taggedjs/js/subject/Subject.class.js";
import { subscribe } from "taggedjs/js/TagJsTags/subscribe.function.js";

const root = document.getElementById("homeCartRoot");
const cartRender$ = new Subject<number>(0, (subscription) => {
  subscription.next(0);
});
let cartMounted = false;
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);
const localStripeSandboxEngaged = LOCAL_HOSTNAMES.has(window.location.hostname);
let stripePublishableKey = String(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "").trim();
const orderId=new URLSearchParams(window.location.search).get("orderId")||"";
const orderSessionProof=new URLSearchParams(window.location.hash.slice(1)).get("checkout")||"";
const orderMode=Boolean(orderId);
type OrderCheckoutView={id:string;canPay:boolean;canStartCheckout:boolean;stripeMode:string;status:string;paymentStatus:string;currency:string;amountTotal:number;lineItems:Array<{productId:string;variationId:string;badgeName:string;title:string;quantity:number;unitAmount:number;currency:string;imageUrl:string}>};
let existingOrder:OrderCheckoutView|null=null;
let previewGeneration=0;
const expectedSandbox=()=>orderMode?existingOrder?.stripeMode==="sandbox":localStripeSandboxEngaged;
const selectOrderKey=()=>{const fallback=String(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY||"").trim();const explicit=String(expectedSandbox()?import.meta.env.VITE_STRIPE_TEST_PUBLISHABLE_KEY||"":import.meta.env.VITE_STRIPE_LIVE_PUBLISHABLE_KEY||"").trim();stripePublishableKey=explicit||fallback;};
selectOrderKey();
const STRIPE_JS_URL = "https://js.stripe.com/clover/stripe.js";

type EmbeddedCheckout = {
  mount: (selector: string | HTMLElement) => void;
  destroy: () => void;
};

type StripeClient = {
  initEmbeddedCheckout: (options: { clientSecret: string }) => Promise<EmbeddedCheckout>;
};

declare global {
  interface Window {
    Stripe?: (publishableKey: string) => StripeClient;
  }
}

let embeddedCheckout: EmbeddedCheckout | null = null;
let stripeScriptPromise: Promise<void> | null = null;
let checkoutGeneration = 0;

type ProductVariationView = {
  id: string;
  label: string;
  unitAmount: number;
  active: boolean;
};

type CartViewState = {
  loading: boolean;
  products: ProductItem[];
  statusText: string;
  checkoutLoading: boolean;
  termsAccepted: boolean;
  organizationCheckout: boolean;
  organizationEmail: string;
  exemptionCertificateNumber: string;
  verifiedOrganizationName: string;
  organizationVerifyLoading: boolean;
  embeddedCheckoutOpen: boolean;
};

const savedOrganizationIdentity = (() => {
  try {
    return JSON.parse(localStorage.getItem("organizationCheckoutIdentity") || "{}");
  } catch {
    return {};
  }
})();

const cartState: CartViewState = {
  loading: true,
  products: [],
  statusText: "",
  checkoutLoading: false,
  termsAccepted: false,
  organizationCheckout: Boolean(savedOrganizationIdentity.email),
  organizationEmail: String(savedOrganizationIdentity.email || ""),
  exemptionCertificateNumber: String(savedOrganizationIdentity.certificateNumber || ""),
  verifiedOrganizationName: "",
  organizationVerifyLoading: false,
  embeddedCheckoutOpen: false,
};

const loadStripeJs = () => {
  if (window.Stripe) return Promise.resolve();
  if (stripeScriptPromise) return stripeScriptPromise;
  stripeScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${STRIPE_JS_URL}"]`);
    const script = existingScript || document.createElement("script");
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => { stripeScriptPromise=null; script.remove(); reject(new Error("Stripe checkout could not be loaded. Try again.")); }, { once: true });
    if (!existingScript) {
      script.src = STRIPE_JS_URL;
      script.async = true;
      document.head.append(script);
    }
  });
  return stripeScriptPromise;
};

const mountEmbeddedCheckout = async (clientSecret: string, generation: number) => {
  if (!stripePublishableKey) {
    throw new Error("Stripe publishable key is not configured.");
  }
  
  await loadStripeJs();
  
  if (!window.Stripe) {
    throw new Error("Stripe checkout is unavailable.");
  }
  if (generation !== checkoutGeneration) return;
  const candidate = await window.Stripe(stripePublishableKey).initEmbeddedCheckout({ clientSecret });
  if (generation !== checkoutGeneration || !cartState.embeddedCheckoutOpen) { candidate.destroy(); return; }
  if (!document.getElementById("stripeEmbeddedCheckout")) await new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));
  const container=document.getElementById("stripeEmbeddedCheckout");
  if (!container || generation !== checkoutGeneration) {candidate.destroy();return;}
  embeddedCheckout?.destroy();
  embeddedCheckout=candidate;
  candidate.mount(container);
};

const formatPrice = (unitAmount = 0, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "usd").toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((Math.max(0, Number(unitAmount) || 0)) / 100);

const mapProducts = (items: ProductItem[]) =>
  new Map((Array.isArray(items) ? items : []).map((item) => [item.id, item]));

const normalizeVariations = (product: ProductItem): ProductVariationView[] =>
  (Array.isArray(product?.variations) ? product.variations : [])
    .map((variation) => ({
      id: String(variation?.id || "").trim(),
      label: String(variation?.label || "").trim(),
      unitAmount: Math.max(0, Math.round(Number(variation?.unitAmount) || 0)),
      active: Boolean(variation?.active),
    }))
    .filter((variation) => variation.id && variation.label && variation.active);

const getVariationForCart = (product: ProductItem, variationId = "") => {
  const variations = normalizeVariations(product);
  const normalizedId = String(variationId || "").trim();
  if (normalizedId) {
    const matched = variations.find((variation) => variation.id === normalizedId);
    if (matched) return matched;
  }
  if (variations.length) return variations[0];
  return null;
};

const getPrimaryImageUrl = (product: ProductItem) => {
  const images = Array.isArray(product?.images) ? product.images : [];
  const firstImageUrl = String(images[0]?.imageUrl || "").trim();
  if (firstImageUrl) return firstImageUrl;
  return String(product?.imageUrl || "").trim();
};

const getCartViewItems = () => {
  if(orderMode){
    const lines=existingOrder?.lineItems||[];
    const productsById=new Map(lines.map((x,i)=>[String(i),{id:String(i),title:x.title,unitAmount:x.unitAmount,currency:x.currency,imageUrl:x.imageUrl,images:[],variations:[]} as unknown as ProductItem]));
    return {productsById,cart:lines.map((x,i)=>({productId:String(i),variationId:"",badgeName:x.badgeName,quantity:x.quantity}))};
  }
  const productsById = mapProducts(cartState.products);
  const cart = loadCart().filter((item) => productsById.has(item.productId));
  return {
    productsById,
    cart,
  };
};

const startCheckout = async (cart: CartItem[], productsById: Map<string, ProductItem>, generation: number) => {
  const lineItems = cart
    .map((item) => ({
      item,
      product: productsById.get(item.productId),
    }))
    .filter((entry) => Boolean(entry.product))
    .map(({ item, product }) => {
      return {
        quantity: item.quantity,
        productId: String(product?.id || item.productId || "").trim(),
        variationId: String(item.variationId || "").trim(),
        badgeName: product && isNameBadgeProduct(product) ? validateBadgeName(item.badgeName) : "",
      };
    });

  const response = await fetchApiWithFallback("/api/create-checkout-session", "createCheckoutSession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Idempotency-Key": `cart_${Date.now().toString(36)}`,
    },
    body: JSON.stringify(orderMode?{orderId,sessionId:orderSessionProof,termsAccepted:cartState.termsAccepted}:{
      cartItems: lineItems.map((entry) => ({
        productId: entry.productId,
        variationId: entry.variationId,
        quantity: entry.quantity,
        badgeName: entry.badgeName,
      })),
      successUrl: `${window.location.origin}/receipt.html`,
      cancelUrl: `${window.location.origin}/cart.html`,
      organizationEmail: cartState.organizationCheckout ? cartState.organizationEmail : "",
      exemptionCertificateNumber: cartState.organizationCheckout ? cartState.exemptionCertificateNumber : "",
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Checkout failed");
  }

  const payload = await response.json();
  if (generation !== checkoutGeneration) return;
  const expectedMode=expectedSandbox()?"sandbox":"live";
  if(payload.stripeMode !== expectedMode)throw new Error("Checkout mode does not match this page. No payment form was opened.");
  const clientSecret = String(payload?.clientSecret || "").trim();
  if (clientSecret) {
    cartState.embeddedCheckoutOpen = true;
    setCheckoutStatus("", false);
    renderCartView();
    await mountEmbeddedCheckout(clientSecret,generation);
    return;
  }

  throw new Error("Embedded Checkout session missing in response");
};

const verifyOrganization = async () => {
  cartState.organizationVerifyLoading = true;
  cartState.verifiedOrganizationName = "";
  setCheckoutStatus("Verifying organization…");
  renderCartView();
  try {
    const response = await fetchApiWithFallback(
      "/api/organization-checkout/verify",
      "verifyOrganizationCheckout",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cartState.organizationEmail,
          certificateNumber: cartState.exemptionCertificateNumber,
        }),
      },
    );
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Organization could not be verified.");
    cartState.verifiedOrganizationName = String(payload.organizationName || "");
    localStorage.setItem("organizationCheckoutIdentity", JSON.stringify({
      email: cartState.organizationEmail,
      certificateNumber: cartState.exemptionCertificateNumber,
    }));
    setCheckoutStatus(`Tax-exempt checkout verified for ${cartState.verifiedOrganizationName}.`);
  } catch (error) {
    setCheckoutStatus(error instanceof Error ? error.message : "Organization could not be verified.");
  } finally {
    cartState.organizationVerifyLoading = false;
    renderCartView();
  }
};

const renderCartView = () => {
  if (!root) return;
  if (!cartMounted) {
    root.replaceChildren();
    tagElement(CartApp, root);
    cartMounted = true;
    return;
  }
  cartRender$.next((Number(cartRender$.value) || 0) + 1);
};

const setCheckoutStatus = (statusText: string, checkoutLoading = false) => {
  cartState.statusText = statusText;
  cartState.checkoutLoading = checkoutLoading;
};

const checkoutDisabledReason = () => checkoutBlockReason({loading:cartState.loading,opening:cartState.checkoutLoading,embeddedOpen:cartState.embeddedCheckoutOpen,terms:cartState.termsAccepted,organization:!orderMode&&cartState.organizationCheckout,verifiedOrganization:cartState.verifiedOrganizationName,key:stripePublishableKey,local:expectedSandbox(),orderMode,order:existingOrder});

const resetCheckout = () => {
  checkoutGeneration++;
  embeddedCheckout?.destroy();embeddedCheckout=null;
  cartState.embeddedCheckoutOpen=false;cartState.checkoutLoading=false;cartState.statusText="";
};

const handleCheckout = async () => {
  if(cartState.checkoutLoading||cartState.embeddedCheckoutOpen)return;
  const { cart, productsById } = getCartViewItems();
  const reason=checkoutDisabledReason();
  if (reason || !cart.length) {
    setCheckoutStatus(reason || "Your cart is empty.", false);
    renderCartView();
    return;
  }
  const generation=++checkoutGeneration;
  setCheckoutStatus("Opening secure checkout...", true);
  renderCartView();
  try {
    await startCheckout(cart, productsById,generation);
  } catch (error) {
    if(generation !== checkoutGeneration)return;
    embeddedCheckout?.destroy();
    embeddedCheckout = null;
    cartState.embeddedCheckoutOpen = false;
    setCheckoutStatus(error instanceof Error ? error.message : "Checkout failed", false);
    renderCartView();
  } finally {
    if(generation === checkoutGeneration){cartState.checkoutLoading=false;renderCartView();}
  }
};

const CartMessage = (title: string, text: string) =>
  div.class`home-card home-card-muted`(
    h2(title),
    p(text)
  );

const StripeSandboxBadge = () =>
  expectedSandbox()
    ? div.class`stripe-sandbox-badge`("stripe sandbox")
    : null;

const CartLineRow = (item: CartItem, product: ProductItem) => {
  const variation = getVariationForCart(product, item.variationId);
  const title = (variation ? `${product.title} (${variation.label})` : product.title) + (item.badgeName ? ` — Name: ${item.badgeName}` : "");
  const unitAmount = variation?.unitAmount ?? product.unitAmount;
  const primaryImageUrl = getPrimaryImageUrl(product);

  return div.class`home-cart-row`(
    div.class`home-cart-row-preview`(
      primaryImageUrl
        ? img
            .class("home-cart-row-image")
            .src(_=>primaryImageUrl)
            .alt(_=>title)
            .loading("lazy")
        : span.class`home-cart-row-image-fallback`("🛒")
    ),
    div.class`home-cart-row-title`(_=>title),
    div.class`home-cart-field home-cart-row-unit`(
      span.class`home-cart-field-label`("Unit price"),
      span.class`home-cart-field-value`(
        _=> formatPrice(unitAmount, product.currency)
      )
    ),
    div.class`home-cart-field home-cart-row-quantity`(
      span.class`home-cart-field-label`("Quantity"),
      orderMode ? span(_=>String(item.quantity)) : input
        .class`home-cart-qty-input`
        .type`number`
        .min`1`
        .max`99`
        .step`1`
        .value(_=> String(item.quantity))
        .ariaLabel`Quantity for ${title}`
        .onChange((event) => {
          updateCartItemQuantity(product.id, Number(event.target.value) || 1, item.variationId || "", item.badgeName || "");
        })()
    ),
    div.class`home-cart-field home-cart-row-subtotal`(
      span.class`home-cart-field-label`("Item total"),
      span.class`home-cart-field-value`(
        _=> formatPrice(unitAmount * item.quantity, product.currency)
      )
    ),
    orderMode ? null : button
      .type`button`
      .class`ghost-button delete-button`
      .onClick(() => {
        removeFromCart(product.id, item.variationId || "", item.badgeName || "");
      })(
      "🗑️ Remove"
    )
  );
};

const CartContent = () => {
  const shellItems = [
    StripeSandboxBadge(),
  ];

  if (cartState.loading) {
    return [
      ...shellItems,
      div.class`home-products-loading`(
        div.class`home-products-spinner`().attr("aria-hidden", "true"),
        p.class`home-products-loading-text`("Loading cart...")
      ),
    ];
  }

  const { cart, productsById } = getCartViewItems();
  if (!cart.length) {
    return [
      ...shellItems,
      orderMode?button.type`button`.class`ghost-button`.onClick(()=>refreshOrderCheckout())("Refresh order"):null,
      CartMessage(orderMode?"Order checkout unavailable":"Your cart is empty", orderMode?(cartState.statusText||"Request a current order checkout link."):"Add products to start checkout."),
    ];
  }

  const total = orderMode&&existingOrder?existingOrder.amountTotal:cart.reduce((sum, item) => {
    const product = productsById.get(item.productId);
    if (!product) return sum;
    const variation = getVariationForCart(product, item.variationId || "");
    return sum + (variation?.unitAmount ?? product.unitAmount) * item.quantity;
  }, 0);

  return [
    ...shellItems,
    section.class`home-card home-cart-panel`(
      h2(orderMode?"Order Items":"Cart Items"),
      orderMode? p(_=>`Order ${orderId} · ${existingOrder?.stripeMode} · ${existingOrder?.paymentStatus}`):null,
      div.class`home-cart-rows`(
        cart.map((item) => {
          const product = productsById.get(item.productId);
          return product ? CartLineRow(item, product) : null;
        })
      ),
      div.class`home-cart-footer`(
        strong(_=> `Total: ${formatPrice(total, "usd")}`),
        p.class`legal-notice`(
          "Checkout opens secure Stripe payment. Stripe processes payment details; 3D Local Print receives order and payment status information, not full card numbers."
        ),
        label.class`legal-checkbox-row`(
          input
            .type`checkbox`
            .checked(_=> cartState.termsAccepted)
            .onChange((event) => {
              cartState.termsAccepted = Boolean(event.target.checked);
              cartState.statusText="";
              renderCartView();
            })(),
          span(
            "I agree to the ",
            a.class`legal-inline-link`.href("./terms.html")("Terms of Service"),
            " and ",
            a.class`legal-inline-link`.href("./sales-policy.html")("Sales Policy"),
            "."
          )
        ),
        div.class`home-cart-actions`(
          orderMode ? button.type`button`.class`ghost-button`.onClick(()=>refreshOrderCheckout())("Refresh order") : button
            .type`button`
            .class`ghost-button`
            .onClick(() => {
              clearCart();
            })(
            "🗑️ Clear Cart"
          ),
          button
            .type`button`
            .class`add-button`
            .id`checkoutAction`
            .disabled(_=> Boolean(checkoutDisabledReason()))
            .onClick(handleCheckout)(
            _=> cartState.checkoutLoading
              ? "💳 Opening..."
              : cartState.embeddedCheckoutOpen
                ? "💳 Checkout opened below"
                : "💳 Checkout"
          )
        ),
        span.class`home-cart-note`.attr("role","status")(_=> cartState.statusText || checkoutDisabledReason()),
        _=> cartState.embeddedCheckoutOpen ? button.type`button`.class`ghost-button`.onClick(()=>{resetCheckout();renderCartView();})("Close payment form") : null,
        _=> {
          return cartState.embeddedCheckoutOpen
          ? stripePayArea()
          : null
        },
        orderMode ? null : div.class`organization-checkout-box`(
          label.class`legal-checkbox-row`(
            input
              .type`checkbox`
              .checked(_=> cartState.organizationCheckout)
              .onChange((event) => {
                cartState.organizationCheckout = Boolean(event.target.checked);
                cartState.verifiedOrganizationName = "";
                cartState.statusText="";
                renderCartView();
              })(),
            span("Purchasing for an approved tax-exempt organization")
          ),
          _=> cartState.organizationCheckout
            ? div.class`organization-checkout-fields`(
                label(
                  span("Organization contact email"),
                  input
                    .type`email`
                    .value(_=> cartState.organizationEmail)
                    .onInput((event) => {
                      cartState.organizationEmail = event.target.value;
                      cartState.verifiedOrganizationName = "";
                      renderCartView();
                    })()
                ),
                label(
                  span("Exemption certificate number"),
                  input
                    .value(_=> cartState.exemptionCertificateNumber)
                    .onInput((event) => {
                      cartState.exemptionCertificateNumber = event.target.value;
                      cartState.verifiedOrganizationName = "";
                      renderCartView();
                    })()
                ),
                button
                  .type`button`
                  .class`ghost-button`
                  .disabled(_=> cartState.organizationVerifyLoading || !cartState.organizationEmail || !cartState.exemptionCertificateNumber)
                  .onClick(verifyOrganization)(
                    _=> cartState.organizationVerifyLoading ? "Verifying…" : "Verify organization"
                  ),
                _=> cartState.verifiedOrganizationName
                  ? strong.class`organization-verified`(_=> `✓ ${cartState.verifiedOrganizationName}`)
                  : a.class`legal-inline-link`.href("./organization-checkout.html")("Not approved yet? Request organizational checkout")
              )
            : null
        )
      )
    ),
  ];
};

export const CartApp = tag(() => subscribe(cartRender$, CartContent));

const loadCartView = async () => {
  if (!root) return;
  renderCartView();

  try {
    if(orderMode)await refreshOrderCheckout();else cartState.products = await loadProducts();
  } catch (error) {
    console.error("Failed loading products for cart", error);
    cartState.products = [];
  } finally {
    cartState.loading = false;
    renderCartView();
  }
};

async function refreshOrderCheckout(){
  if(!orderMode||cartState.checkoutLoading||cartState.embeddedCheckoutOpen)return;
  const generation=++previewGeneration;
  try{
    const response=await fetchApiWithFallback("/api/order-checkout","getOrderCheckout",{method:"POST",cache:"no-store",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderId,sessionId:orderSessionProof})});
    const payload=await response.json();if(generation!==previewGeneration)return;
    if(!response.ok||!payload.order)throw Error(payload.error||"Order checkout unavailable.");
    existingOrder=payload.order;selectOrderKey();cartState.statusText="";
  }catch(error){if(generation!==previewGeneration)return;existingOrder=null;cartState.statusText=error instanceof Error?error.message:"Unable to refresh order.";}
  finally{if(generation===previewGeneration){cartState.loading=false;renderCartView();}}
}
window.addEventListener("focus",()=>{if(orderMode)void refreshOrderCheckout();});
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&orderMode)void refreshOrderCheckout();});
window.addEventListener("cart:updated", ()=>{if(!orderMode){resetCheckout();renderCartView();}});
loadCartView();

const stripePayArea = tag(() => {
  return div.class`embedded-checkout-shell`(
    h2("Secure checkout"),
    p.class`home-cart-note`("Payment is securely processed by Stripe without leaving this website."),
    div
      .id`stripeEmbeddedCheckout`
      .class`embedded-checkout-container`
  )
})