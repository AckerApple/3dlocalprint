import {auth,loadProducts} from "../shared/firebase.js";
import {startAdminAppShell} from "../shared/adminAppShell.js";
import {toast} from "../shared/toast.js";
const rootRef={current:document.getElementById("integrationsApp")};
let clearSecretTimer:ReturnType<typeof setTimeout>|undefined;
let credentialField:HTMLTextAreaElement|null=null;
const clearSecret=()=>{if(credentialField)credentialField.value="";if(clearSecretTimer)clearTimeout(clearSecretTimer);};
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
async function mount(){
  const root=rootRef.current;if(!root)return;clearSecret();
  root.innerHTML=`<section class="panel"><a href="../orders/index.html?orderMode=live">← Orders</a><h1>Laptop order access</h1>
    <p>Permit catalog reads, unpaid-order creation, and reading this integration’s own orders. Refunds, marking paid, fulfillment, deletion, and email are excluded.</p>
    <form id="grantForm" class="agreement-create-form">
      <div class="agreement-create-grid">
        <label>Label<input name="label" class="manufacturer-input" required maxlength="80" value="My laptop"></label>
        <label>Expires in minutes<input name="expiresInMinutes" class="manufacturer-input" type="number" min="5" max="43200" value="60" required></label>
        <label>Mode<select name="mode" class="manufacturer-input"><option value="sandbox">Test only</option><option value="live">Live only</option><option value="both">Test and live</option></select></label>
        <label>Maximum per order (USD cents)<input name="maxOrderAmount" class="manufacturer-input" type="number" min="1" max="1000000" value="2000" required></label>
        <label>Total budget (USD cents)<input name="maxTotalAmount" class="manufacturer-input" type="number" min="1" max="1000000" value="4000" required></label>
        <label>Maximum orders<input name="maxOrders" class="manufacturer-input" type="number" min="1" max="1000" value="2" required></label>
        <label>Maximum items per order<input name="maxQuantity" class="manufacturer-input" type="number" min="1" max="100" value="4" required></label>
      </div>
      <label>Allowed products (select explicitly)<select name="products" class="manufacturer-input" multiple size="5" required></select></label>
      <label><input name="approval" type="checkbox" required> I approve laptop access with the products, mode, expiry, and limits above.</label>
      <button class="add-button" type="submit">Grant limited access</button>
    </form>
    <p id="grantStatus" role="status"></p>
    <label>New credential (shown once, cleared after two minutes)<textarea id="newCredential" class="manufacturer-input" readonly spellcheck="false" autocomplete="off"></textarea></label>
    <button id="clearCredential" type="button" class="ghost-button">Clear credential from page</button>
    <p>Use the CLI’s hidden login prompt on your laptop. Never paste credentials into chat, shell commands, or repository files. If issuance timed out, inspect and revoke that grant before issuing another.</p>
    <h2>Existing grants</h2><button id="reloadGrants" type="button" class="ghost-button">Refresh grants</button><div id="grantList"></div>
  </section>`;
  const form=root.querySelector<HTMLFormElement>("#grantForm")!;const status=root.querySelector<HTMLElement>("#grantStatus")!;
  credentialField=root.querySelector<HTMLTextAreaElement>("#newCredential");
  root.querySelector("#clearCredential")!.addEventListener("click",clearSecret);
  const productSelect=form.elements.namedItem("products") as HTMLSelectElement;
  const products=await loadProducts();for(const product of products.filter(p=>p.active)){const option=document.createElement("option");option.value=product.id;option.textContent=`${product.title} · ${product.id}`;productSelect.append(option);}
  const list=root.querySelector("#grantList")!;
  async function refresh(){
    const data=await request("GET");list.replaceChildren();
    for(const grant of data.integrations){const row=document.createElement("div");row.className="orders-detail-line";const text=document.createElement("p");
      text.textContent=`${grant.label} · ${grant.id} · ${grant.allowedModes.join(" / ")} · expires ${grant.expiresAt} · ${grant.revokedAt?"revoked":Date.parse(grant.expiresAt)<=Date.now()?"expired":"active"} · ${grant.orderCount}/${grant.maxOrders} orders · ${grant.reservedAmount}/${grant.maxTotalAmount} cents reserved · products ${grant.allowedProductIds.join(", ")} · scopes ${grant.scopes.join(", ")}`;
      const revoke=document.createElement("button");revoke.type="button";revoke.className="ghost-button delete-button";revoke.textContent="Revoke";revoke.disabled=Boolean(grant.revokedAt);
      revoke.addEventListener("click",()=>{revoke.disabled=true;void request("POST",{action:"revoke",id:grant.id}).then(()=>{clearSecret();return refresh();}).catch(error=>{status.textContent=error.message;revoke.disabled=false;});});row.append(text,revoke);list.append(row);
    }
  }
  root.querySelector("#reloadGrants")!.addEventListener("click",()=>{void refresh().catch(error=>status.textContent=error.message);});
  let issueKey=crypto.randomUUID();
  form.addEventListener("submit",event=>{event.preventDefault();if(!form.reportValidity())return;
    const submit=form.querySelector<HTMLButtonElement>('button[type="submit"]')!;submit.disabled=true;clearSecret();
    const data=new FormData(form);const mode=String(data.get("mode"));
    const body={action:"issue",label:String(data.get("label")),scopes:["catalog:read","orders:create","orders:read-own"],allowedProductIds:data.getAll("products"),allowedModes:mode === "both"?["sandbox","live"]:[mode],currency:"usd",
      ...Object.fromEntries(["expiresInMinutes","maxOrderAmount","maxTotalAmount","maxOrders","maxQuantity"].map(key=>[key,Number(data.get(key))]))};
    void request("POST",body,issueKey).then(result=>{if(credentialField)credentialField.value=result.token;clearSecretTimer=setTimeout(clearSecret,120000);status.textContent=`Granted ${result.integration.id}. Credential is shown once; save it only through the approved local login.`;issueKey=crypto.randomUUID();(form.elements.namedItem("approval") as HTMLInputElement).checked=false;return refresh();}).catch(error=>{status.textContent=error.message;}).finally(()=>{submit.disabled=false;});
  });
  await refresh();
}
startAdminAppShell({rootRef,toast,onAuthorized:()=>{void mount().catch(error=>toast.error(error.message));},onSignedOut:clearSecret,onDenied:clearSecret});
