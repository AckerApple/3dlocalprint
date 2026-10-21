import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import crypto from 'node:crypto';import ts from 'typescript';import {JSDOM} from 'jsdom';
const dom=new JSDOM('<main id="integrationsApp"></main>',{url:'https://3dlocalprint.com/admin/integrations/index.html'});
const token='3dlp_'+ 'a'.repeat(32)+'_'+ 'b'.repeat(43);const grantId='a'.repeat(32);const calls=[];const grants=[];const timers=[];let shell;
const window=dom.window;
const grant={id:grantId,label:'<script>never execute</script>',expiresAt:new Date(Date.now()+3600000).toISOString(),allowedModes:['sandbox'],allowedProductIds:['badge'],scopes:['catalog:read','orders:create','orders:read-own'],revokedAt:'',orderCount:0,maxOrders:2,reservedAmount:0,maxTotalAmount:4000};
const mocks={
 '../shared/firebase.js':{auth:{currentUser:{getIdToken:async()=>'synthetic-web-id-token'}},loadProducts:async()=>[{id:'badge',title:'Badges',active:true},{id:'other',title:'<img src=x onerror=alert(1)>',active:true},{id:'inactive',active:false}]},
 '../shared/adminAppShell.js':{startAdminAppShell:opts=>{shell=opts;}},'../shared/toast.js':{toast:{error:message=>{throw Error(message);}}}
};
const module={exports:{}};const context=vm.createContext({module,exports:module.exports,require:name=>mocks[name],document:window.document,location:window.location,FormData:window.FormData,crypto,console,Date,
 setTimeout:(fn)=>{timers.push(fn);return timers.length;},clearTimeout:()=>{},
 fetch:async(url,init)=>{calls.push({url,init});const body=init.body?JSON.parse(init.body):null;
  let data;if(init.method==='GET')data={integrations:structuredClone(grants)};else if(body.action==='issue'){grants.push({...grant});data={token,integration:{...grant}};}else {grants[0].revokedAt=new Date().toISOString();data={ok:true};}
  return {ok:true,json:async()=>data};
 }
});
const source=fs.readFileSync(new URL('../src/admin/integrations/integrations.ts',import.meta.url),'utf8').replaceAll('import.meta.env.VITE_FIREBASE_PROJECT_ID','"threedlocalprint"');
vm.runInContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,context);
await vm.runInContext('mount()',context);
const form=window.document.querySelector('#grantForm');const product=form.elements.namedItem('products');assert.equal(product.options.length,2);assert.equal(window.document.querySelectorAll('img').length,0);
const submit=()=>form.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));const settle=async()=>{for(let i=0;i<5;i++)await new Promise(resolve=>setImmediate(resolve));};
submit();await settle();assert.equal(calls.filter(x=>x.init.method==='POST').length,0,'approval and explicit product selection required');
product.options[0].selected=true;form.elements.namedItem('approval').checked=true;submit();await settle();
const issue=calls.find(x=>x.init.method==='POST');const body=JSON.parse(issue.init.body);assert.equal(body.action,'issue');assert.deepEqual(body.allowedProductIds,['badge']);assert.deepEqual(body.allowedModes,['sandbox']);assert.equal(body.maxOrderAmount,2000);assert.equal(body.maxQuantity,4);assert.equal(issue.init.headers.Authorization,'Bearer synthetic-web-id-token');assert.ok(issue.init.headers['X-Idempotency-Key']);
assert.equal(window.document.querySelector('#newCredential').value,token);assert.equal(form.elements.namedItem('approval').checked,false);assert.equal(window.document.querySelectorAll('script').length,0);assert.equal(window.localStorage.length,0);assert.equal(window.sessionStorage.length,0);
window.document.querySelector('#clearCredential').click();assert.equal(window.document.querySelector('#newCredential').value,'');
window.document.querySelector('#newCredential').value=token;shell.onSignedOut();assert.equal(window.document.querySelector('#newCredential').value,'');
window.document.querySelector('#grantList button').click();await settle();assert.equal(JSON.parse(calls.at(-2).init.body).action,'revoke');assert.ok(window.document.querySelector('#grantList').textContent.includes('revoked'));
console.log('PASS: real grant-page DOM requires explicit approval/products, sends narrow policy with normal web auth, displays credential once, clears on request/sign-out, revokes, escapes catalog/grant content, and does not persist credentials. Mock handlers only.');
window.close();
