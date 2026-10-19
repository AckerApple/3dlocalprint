import { array as realArray } from 'taggedjs/js/state/array.signal.js';
import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import crypto from 'node:crypto';import ts from 'typescript';
const s=fs.readFileSync(new URL('../src/admin/orders/orders.tag.ts', import.meta.url),'utf8');
const extract=(a,b)=>s.slice(s.indexOf(a),s.indexOf(b,s.indexOf(a)));
const code=`
let editingCustomOrderId='',editReturnOrderId='',selectedOrderId='preview',editingCustomOrderStripeMode='',editingCustomOrderStatus='',customOrderStripeMode='sandbox',customOrderRequestKey='',lastCustomOrderSubmission='',initialCustomOrderFormState='',privateOrderImage='',ledgerPaymentSearch='',customOrderProductSearch='',customOrderCustomerSearch='',selectedCustomOrderCustomerEmail='';
let discardOrderChangesPending=false,pendingEditNavigation=null;
let customOrderProductLookupOpen=false,customOrderCustomerLookupOpen=false,createOrderModalOpen=false,createOrderLoading=false;
let customOrderDraft={customerName:'',customerEmail:'',amountShipping:'',items:[]};let calls=[];let copied='';let confirms=0;
const orders$=realArray([{id:'preview',status:'checkout_created',orderType:'custom_order',customerName:'',customerEmail:'',stripeMode:'sandbox',amountShipping:0,lineItems:[{productId:'product',variationId:'',title:'Badges',quantity:4,unitAmount:500,currency:'usd'}]}]);
const customOrderCatalog=[];const canEditCustomOrder=o=>['checkout_created','closed'].includes(o.status);const getProductImageUrl=()=>'';const loadCustomOrderCatalog=()=>{};const refreshOrderModal=()=>{};const syncOrderUrl=()=>{};const toast={info(){},error(){},success(){}};
const currentAuthUser={getIdToken:async()=> 'local-test'};const firebaseAuth={};const isNameBadgeProduct=()=>false;const validateBadgeName=x=>x;const getUpdateOrderUrl=()=>'/local/update';const getCreateOrderUrl=()=>'/local/create';
const navigator={clipboard:{writeText:async value=>{copied=value;}}};const fetch=async(url,init)=>{calls.push({url,body:JSON.parse(init.body)});return {ok:true,json:async()=>({ok:true,orderId:'preview',checkoutUrl:'http://local.test/checkout'})};};
`+extract('const getCustomOrderFormState =','const createCustomOrder =')+extract('const createCustomOrder =','const getSelectedOrder =')+extract('const openOrderModal =','const syncModalFromUrl =')+`
async function run(){
 assert.equal(typeof orders$.some,'undefined');assert.equal(Array.isArray(orders$.value),true);
 openEditOrderModal({...orders$[0],customerName:'stale'});assert.equal(customOrderDraft.customerName,'');assert.equal(editingCustomOrderId,'preview');assert.equal(selectedOrderId,'');assert.equal(createOrderModalOpen,true);assert.equal(editReturnOrderId,'preview');
 closeCreateOrderModal();assert.equal(selectedOrderId,'preview');assert.equal(createOrderModalOpen,false);
 openEditOrderModal(orders$[0]);customOrderDraft.customerName='unsaved';closeCreateOrderModal();assert.equal(discardOrderChangesPending,true);assert.equal(createOrderModalOpen,true);assert.equal(selectedOrderId,'');keepEditingOrder();assert.equal(discardOrderChangesPending,false);assert.equal(customOrderDraft.customerName,'unsaved');
 closeCreateOrderModal();closeCreateOrderModal(true);assert.equal(selectedOrderId,'preview');assert.equal(createOrderModalOpen,false);assert.equal(orders$[0].customerName,'');
 openEditOrderModal(orders$[0]);await createCustomOrder(false);assert.equal(calls.length,1);assert.equal(calls[0].url,'/local/update');assert.equal(calls[0].body.orderId,'preview');assert.equal(calls[0].body.cartItems[0].quantity,4);assert.equal(createOrderModalOpen,false);assert.equal(selectedOrderId,'preview');assert.equal(copied,'http://local.test/checkout');
 orders$[0].status='paid';openEditOrderModal(orders$[0]);assert.equal(createOrderModalOpen,false);
 console.log('PASS: detail-to-edit uses latest same record; only one modal active; cancel/discard returns to record; canceled edits not applied; save updates same ID and returns; paid edit restriction preserved.');
}run();`;
const result=vm.runInNewContext(ts.transpileModule(code,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText,{assert,crypto,console,realArray,window:{location:{origin:'http://local.test'},confirm:()=>true}});await result;
