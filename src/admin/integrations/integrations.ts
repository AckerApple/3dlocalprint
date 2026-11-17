import {auth,loadProducts} from "../shared/firebase.js";
import {startAdminAppShell} from "../shared/adminAppShell.js";
import {toast} from "../shared/toast.js";
const rootRef={current:document.getElementById("integrationsApp")};
let clearSecretTimer:ReturnType<typeof setTimeout>|undefined;
let credentialField:HTMLTextAreaElement|null=null;
let credentialPanel:HTMLElement|null=null;
let secretVersion=0;
const clearSecret=()=>{
  secretVersion++;
  if(credentialField)credentialField.value="";
  if(credentialPanel)credentialPanel.hidden=true;
  if(clearSecretTimer)clearTimeout(clearSecretTimer);
  clearSecretTimer=undefined;
};
window.addEventListener("pagehide",clearSecret);
function endpoint(){
  if(["localhost","127.0.0.1"].includes(location.hostname)||location.hostname.endsWith(".web.app")||location.hostname.endsWith(".firebaseapp.com"))return "/api/admin/order-integrations";
  return `https://us-central1-${import.meta.env.VITE_FIREBASE_PROJECT_ID || "threedlocalprint"}.cloudfunctions.net/manageOrderIntegrations`;
}
async function request(method:string,body?:unknown,key?:string){
  if(!auth.currentUser)throw Error("Sign in again.");
  const response=await fetch(endpoint(),{method,headers:{Authorization:`Bearer ${await auth.currentUser.getIdToken()}`,"Content-Type":"application/json",...(key?{"X-Idempotency-Key":key}:{})},body:body?JSON.stringify(body):undefined,cache:"no-store"});
  const data=await response.json().catch(()=>({}));
  if(!response.ok)throw Error(typeof data.error === "string" ? data.error : "Request failed.");
  return data;
}
function dollarsToCents(value: string): number {
  if (!/^[0-9]+(?:[.][0-9]{1,2})?$/.test(value)) throw Error("Enter amounts in dollars with at most two decimal places.");
  const [dollars,cents=""] = value.split(".");
  const amount=Number(dollars)*100+Number(cents.padEnd(2,"0"));
  if(!Number.isSafeInteger(amount)||amount<1||amount>1000000)throw Error("Amounts must be between $0.01 and $10,000.00.");
  return amount;
}
async function mount(){
  const root=rootRef.current;if(!root)return;clearSecret();
  root.innerHTML=`<section class="panel"><a href="../orders/index.html?orderMode=live">← Orders</a><h1>Laptop order access</h1>
    <p>Permit catalog reads, unpaid-order creation, and reading this integration’s own orders. Refunds, marking paid, fulfillment, deletion, and email are excluded.</p>
    <details id="grantPanel"><summary>Set up laptop access</summary>
    <form id="grantForm" class="agreement-create-form">
      <div class="agreement-create-grid">
        <label>Label<input name="label" class="manufacturer-input" required maxlength="80" value="My laptop"></label>
        <label>Expires in minutes<input name="expiresInMinutes" class="manufacturer-input" type="number" min="5" max="43200" value="60" required></label>
        <label>Mode<select name="mode" class="manufacturer-input"><option value="sandbox">Test only</option><option value="live">Live only</option><option value="both">Test and live</option></select></label>
        <label>Maximum per order (USD)<input name="maxOrderAmount" class="manufacturer-input" type="text" inputmode="decimal" pattern="[0-9]+([.][0-9]{1,2})?" value="200.00" required></label>
        <label>Total budget (USD)<input name="maxTotalAmount" class="manufacturer-input" type="text" inputmode="decimal" pattern="[0-9]+([.][0-9]{1,2})?" value="200.00" required></label>
        <label>Maximum orders<input name="maxOrders" class="manufacturer-input" type="number" min="1" max="1000" value="2" required></label>
      </div>
      <p id="productScopeMeaning">Applies to all active products, including products added later. Inactive products cannot be ordered.</p>
      <label><input name="restrictProducts" type="checkbox"> Choose specific products (optional)</label>
      <label id="productSelection" hidden>Products<select name="products" class="manufacturer-input" multiple size="5" disabled></select></label>
      <label><input name="approval" type="checkbox" required> I approve laptop access with the product scope, mode, expiry, and limits above.</label>
      <button class="add-button" type="submit">Grant limited access</button>
    </form>
    <section id="credentialPanel" hidden aria-labelledby="credentialHeading">
      <h2 id="credentialHeading">New credential</h2>
      <label>Shown once, cleared after two minutes<textarea id="newCredential" class="manufacturer-input" readonly spellcheck="false" autocomplete="off"></textarea></label>
      <button id="clearCredential" type="button" class="ghost-button">Clear credential from page</button>
      <p>Use the CLI’s hidden login prompt on your laptop. Never paste credentials into chat, shell commands, or repository files.</p>
    </section>
    <button id="closeGrantPanel" type="button" class="ghost-button">Close setup</button>
    </details>
    <p id="grantStatus" role="status"></p>
    <p>If issuance timed out or a key was cleared before saving, inspect and revoke that grant before issuing another.</p>
    <h2>Existing grants</h2><button id="reloadGrants" type="button" class="ghost-button">Refresh grants</button><div id="grantList"></div>
  </section>`;
  const form=root.querySelector<HTMLFormElement>("#grantForm")!;const status=root.querySelector<HTMLElement>("#grantStatus")!;
  const panel=root.querySelector<HTMLDetailsElement>("#grantPanel")!;
  credentialField=root.querySelector<HTMLTextAreaElement>("#newCredential");
  credentialPanel=root.querySelector<HTMLElement>("#credentialPanel");
  root.querySelector("#clearCredential")!.addEventListener("click",clearSecret);
  panel.querySelector("summary")!.addEventListener("click",()=>{if(panel.open)clearSecret();});
  panel.addEventListener("toggle",()=>{if(!panel.open)clearSecret();});
  const closePanel=()=>{panel.open=false;clearSecret();panel.querySelector("summary")?.focus();};
  root.querySelector("#closeGrantPanel")!.addEventListener("click",closePanel);
  panel.addEventListener("keydown",event=>{if(event.key === "Escape"){event.preventDefault();closePanel();}});
  const productSelect=form.elements.namedItem("products") as HTMLSelectElement;
  const restrictProducts=form.elements.namedItem("restrictProducts") as HTMLInputElement;
  restrictProducts.addEventListener("change",()=>{
    productSelect.disabled=!restrictProducts.checked;
    productSelect.required=restrictProducts.checked;
    root.querySelector<HTMLElement>("#productSelection")!.hidden=!restrictProducts.checked;
    root.querySelector<HTMLElement>("#productScopeMeaning")!.textContent=restrictProducts.checked
      ? "Applies only to the selected products while they remain active."
      : "Applies to all active products, including products added later. Inactive products cannot be ordered.";
  });
  const products=await loadProducts();for(const product of products.filter(p=>p.active)){const option=document.createElement("option");option.value=product.id;option.textContent=`${product.title} · ${product.id}`;productSelect.append(option);}
  const list=root.querySelector("#grantList")!;
  async function refresh(){
    const data=await request("GET");list.replaceChildren();
    for(const grant of data.integrations){const row=document.createElement("div");row.className="orders-detail-line";const text=document.createElement("p");
      const ids=Array.isArray(grant.allowedProductIds)?grant.allowedProductIds:[];
      const selectedPolicy=(grant.productScope === undefined || grant.productScope === "selected") && ids.length>0 && ids.every((id:unknown)=>typeof id === "string" && /^[a-zA-Z0-9_-]{1,200}$/.test(id));
      const productScope=grant.productScope === "all_active" && Array.isArray(grant.allowedProductIds) && ids.length === 0
        ? "all active products (including future additions)" : selectedPolicy ? `selected products: ${ids.join(", ")}` : "invalid product scope; no product access";
      const itemPolicy=grant.quantityScope === "request_limit" && grant.maxQuantity === undefined ? "standard request limits"
        : grant.quantityScope === undefined && Number.isInteger(grant.maxQuantity) && grant.maxQuantity>=1 && grant.maxQuantity<=100 ? `${grant.maxQuantity} items/order` : "invalid item policy; no order access";
      text.textContent=`${grant.label} · ${grant.id} · ${grant.allowedModes.join(" / ")} · expires ${grant.expiresAt} · ${grant.revokedAt?"revoked":Date.parse(grant.expiresAt)<=Date.now()?"expired":"active"} · ${grant.orderCount}/${grant.maxOrders} orders · ${grant.reservedAmount}/${grant.maxTotalAmount} cents reserved · ${productScope} · ${itemPolicy} · scopes ${grant.scopes.join(", ")}`;
      const revoke=document.createElement("button");revoke.type="button";revoke.className="ghost-button delete-button";revoke.textContent="Revoke";revoke.disabled=Boolean(grant.revokedAt);
      revoke.addEventListener("click",()=>{revoke.disabled=true;void request("POST",{action:"revoke",id:grant.id}).then(()=>{clearSecret();return refresh();}).catch(error=>{status.textContent=error.message;revoke.disabled=false;});});row.append(text,revoke);list.append(row);
    }
  }
  root.querySelector("#reloadGrants")!.addEventListener("click",()=>{void refresh().catch(error=>status.textContent=error.message);});
  let issueKey=crypto.randomUUID();
  form.addEventListener("submit",event=>{event.preventDefault();if(!panel.open||!form.reportValidity())return;
    const submit=form.querySelector<HTMLButtonElement>('button[type="submit"]')!;if(submit.disabled)return;
    const data=new FormData(form);const mode=String(data.get("mode"));
    let maxOrderAmount:number,maxTotalAmount:number;
    try{maxOrderAmount=dollarsToCents(String(data.get("maxOrderAmount")));maxTotalAmount=dollarsToCents(String(data.get("maxTotalAmount")));if(maxTotalAmount<maxOrderAmount)throw Error("Total budget must be at least the maximum per order.");}
    catch(error){status.textContent=error instanceof Error?error.message:"Invalid amount.";return;}
    submit.disabled=true;clearSecret();const version=secretVersion;
    const body={action:"issue",label:String(data.get("label")),scopes:["catalog:read","orders:create","orders:read-own"],productScope:restrictProducts.checked?"selected":"all_active",allowedProductIds:restrictProducts.checked?data.getAll("products"):[],allowedModes:mode === "both"?["sandbox","live"]:[mode],currency:"usd",quantityScope:"request_limit",maxOrderAmount,maxTotalAmount,
      ...Object.fromEntries(["expiresInMinutes","maxOrders"].map(key=>[key,Number(data.get(key))]))};
    void request("POST",body,issueKey).then(result=>{
      const token=typeof result.token === "string" && /^3dlp_[a-f0-9]{32}_[A-Za-z0-9_-]{43}$/.test(result.token)?result.token:"";
      const canReveal=Boolean(token&&version===secretVersion&&panel.open&&root.isConnected&&auth.currentUser);
      if(canReveal&&credentialField&&credentialPanel){credentialField.value=token;credentialPanel.hidden=false;clearSecretTimer=setTimeout(clearSecret,120000);}
      status.textContent=canReveal?`Granted ${result.integration.id}. Credential is shown once; save it only through the approved local login.`:`Granted ${result.integration.id}, but the credential was not displayed because setup was dismissed. Revoke this grant before creating another.`;
      issueKey=crypto.randomUUID();(form.elements.namedItem("approval") as HTMLInputElement).checked=false;return refresh();
    }).catch(error=>{status.textContent=error.message;}).finally(()=>{submit.disabled=false;});
  });
  await refresh();
}
startAdminAppShell({rootRef,toast,onAuthorized:()=>{void mount().catch(error=>toast.error(error.message));},onSignedOut:clearSecret,onDenied:clearSecret});
