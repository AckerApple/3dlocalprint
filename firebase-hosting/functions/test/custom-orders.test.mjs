import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../src/',import.meta.url));
const transpile=s=>ts.transpileModule(s,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
const records=new Map([['admins/list',{items:['admin@example.test']}],['products/list',{items:[{id:'badge',title:'Badge',slug:'custom-name-badges',active:true,unitAmount:500,currency:'usd'}]}]]);
const clone=x=>x===undefined?undefined:structuredClone(x);
let onRead=()=>{};
const doc=path=>({path,get:async()=>{onRead(path);return {exists:records.has(path),data:()=>clone(records.get(path)),ref:doc(path)};},set:async(data,opts)=>records.set(path,opts?.merge?{...records.get(path),...clone(data)}:clone(data))});
let queue=Promise.resolve();
const db={
 collection:n=>({
  doc:id=>doc(n+'/'+id),
  where:(field,op,value)=>({limit:()=>({get:async()=>({docs:[...records].filter(([path,data])=>path.startsWith(n+'/')&&data[field]===value).map(([path,data])=>({id:path.split('/').pop(),data:()=>clone(data)}))})})})
 }),
 runTransaction:fn=>{const result=queue.then(()=>fn({get:r=>r.get(),create:(r,d)=>records.set(r.path,clone(d)),set:(r,d,o)=>r.set(d,o)}));queue=result.catch(()=>{});return result;}
};
const sessions=new Map(),idem=new Map(),files=new Map();let created=0;let activeStripeLivemode=false;
const stripe={checkout:{sessions:{create:async(params,options)=>{const key=options?.idempotencyKey; if(key&&idem.has(key)){assert.deepEqual(idem.get(key).params,clone(params));return idem.get(key).session;}const session={id:'cs_test_'+ ++created,url:'https://checkout.stripe.com/c/pay/qa_'+created,...clone(params),metadata:params.metadata,livemode:activeStripeLivemode,amount_total:params.line_items.reduce((sum,x)=>sum+x.quantity*x.price_data.unit_amount,0)+(params.shipping_options?.[0]?.shipping_rate_data.fixed_amount.amount||0),payment_status:'unpaid'};sessions.set(session.id,session);if(key)idem.set(key,{params:clone(params),session});return session;},retrieve:async id=>{if(!sessions.has(id))throw new Error('missing session');return sessions.get(id);},expire:async id=>{sessions.get(id).status='expired';}}},webhooks:{constructEvent:(body,sig)=>{if(sig!=='valid')throw Error('bad signature');return body;}}};
const mocks={'firebase-functions/v2/https':{onRequest:(_opts,handler)=>handler},'firebase-functions/params':{defineSecret:name=>({value:()=>name==='STRIPE_TEST_SECRET_KEY'?'sk_test_fake':name==='STRIPE_SECRET_KEY'?'sk_live_fake':'fake'})},'firebase-functions':{logger:{info(){},warn(){},error(){},debug(){}}},'firebase-admin/app':{getApps:()=>[{}],initializeApp(){}},'firebase-admin/auth':{getAuth:()=>({verifyIdToken:async token=>{if(token!=='authorized')throw Error('bad token');return {email:'admin@example.test'};}})},'firebase-admin/firestore':{getFirestore:()=>db},'firebase-admin/storage':{getStorage:()=>({bucket:()=>({file:path=>({save:async(bytes,opts)=>{files.set(path,{bytes,opts});},download:async()=>[files.get(path).bytes]})})})},'node:crypto':crypto,'node:tls':{},stripe:class {constructor(key){activeStripeLivemode=key.startsWith("sk_live_");return stripe;}},'./notificationTemplates':{}};
const quiet={log(){},warn(){},error(){}};
function load(name){const module={exports:{}};vm.runInNewContext(transpile(fs.readFileSync(root+name+'.ts','utf8')),{module,exports:module.exports,require:n=>{if(n in mocks)return mocks[n];throw Error('Unexpected import '+n);},Buffer,process:{env:{}},console:quiet,URL,URLSearchParams,Date,setTimeout,clearTimeout});return module.exports;}
const support=load('customOrderSupport');mocks['./customOrderSupport']=support;mocks['./orderIntegrationSupport']=load('orderIntegrationSupport');const app=load('index');
async function call(handler,{method='POST',body={},query={},auth='Bearer authorized',key='qa_order_request_0001',signature}={}){const req={method,body,query,path:"/",rawBody:body,header:n=>({'authorization':auth,'x-idempotency-key':key,'stripe-signature':signature}[n.toLowerCase()])};const res={code:200,set(){},status(n){this.code=n;return this;},json(data){this.data=data;return this;},send(data){this.data=data;return this;}};await handler(req,res);return res;}
const body={customerName:'',customerEmail:'',stripeMode:'sandbox',cartItems:[{productId:'badge',badgeName:'Alice',quantity:2}]};
let response=await call(app.createCustomOrder,{body});assert.equal(response.code,200);const id=response.data.orderId;assert.ok(response.data.adminOrderUrl.endsWith('?orderId='+id));const order=records.get('orders/'+id);assert.equal(order.customerDetailsPending,true);assert.equal(order.customerEmail,'');assert.equal(order.publicOrderUrl,'');assert.equal(order.createdByAdminEmail,'admin@example.test');assert.equal(created,1);let session=sessions.get(order.checkoutSessionId);assert.ok(!('customer_email' in session));assert.equal(session.name_collection.individual.enabled,true);assert.equal(session.name_collection.individual.optional,false);assert.equal(session.line_items[0].price_data.unit_amount,500);
response=await call(app.createCustomOrder,{body});assert.equal(created,1);assert.equal(response.data.orderId,id);
response=await call(app.createCustomOrder,{body:{...body,customerName:'different'}});assert.equal(response.code,409);
response=await call(app.createCustomOrder,{body,auth:''});assert.equal(response.code,401);
response=await call(app.getPublicOrder,{method:'GET',query:{orderId:id}});assert.equal(response.code,400);
response=await call(app.getPublicOrderReceiptLink,{method:'GET',query:{orderId:id,sessionId:'cs_wrong'}});assert.equal(response.code,404);
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j1ioAAAAASUVORK5CYII=','base64');
response=await call(app.manageOrderImage,{body:{orderId:id,mime:'image/png',base64:png.toString('base64')}});assert.equal(response.code,200);const image=records.get('orders/'+id).orderImage;assert.ok(image.path.startsWith('order-images/'+id+'/'));assert.ok(!files.get(image.path).opts.metadata.firebaseStorageDownloadTokens);
response=await call(app.manageOrderImage,{method:'GET',query:{orderId:id},auth:''});assert.equal(response.code,401);
response=await call(app.manageOrderImage,{method:'GET',query:{orderId:id}});assert.equal(response.data.base64,png.toString('base64'));
response=await call(app.manageOrderImage,{body:{orderId:id,mime:'image/svg+xml',base64:Buffer.from('<svg/>').toString('base64')}});assert.equal(response.code,400);
assert.throws(()=>support.decodeOrderImage('A'.repeat(2800004),'image/png'));assert.throws(()=>support.decodeOrderImage(png.toString('base64'),'image/jpeg'));
response=await call(app.manageOrderImage,{method:'GET',query:{orderId:'../admins/list'}});assert.equal(response.code,400);
const oldSession=session;
const updateBody={...body,orderId:id};
response=await call(app.updateCustomOrder,{body:updateBody,key:'update_qa_request_0001'});assert.equal(response.code,200);assert.equal(records.get('orders/'+id).customerEmail,'');
const afterUpdate=created;
response=await call(app.updateCustomOrder,{body:updateBody,key:'update_qa_request_0001'});assert.equal(response.code,200);assert.equal(created,afterUpdate);
session=sessions.get(records.get('orders/'+id).checkoutSessionId);
response=await call(app.getPublicOrderReceiptLink,{method:'GET',query:{orderId:id,sessionId:session.id}});assert.equal(response.code,409);
oldSession.payment_status='paid';
response=await call(app.stripeWebhook,{body:{id:'evt_old',type:'checkout.session.completed',data:{object:{id:oldSession.id}}},signature:'valid'});assert.equal(response.code,400);assert.equal(records.get('orders/'+id).status,'checkout_created');
const parallelBody = {...body,customerName:'Another pending order'};
const beforeParallel=created;
const parallel=await Promise.all([call(app.createCustomOrder,{body:parallelBody,key:'parallel_qa_request_0001'}),call(app.createCustomOrder,{body:parallelBody,key:'parallel_qa_request_0001'})]);
assert.equal(parallel[0].data.orderId,parallel[1].data.orderId);assert.equal(created,beforeParallel+1);
const event={id:'evt_qa',type:'checkout.session.completed',data:{object:{id:session.id}}};response=await call(app.stripeWebhook,{body:event,signature:'bad'});assert.equal(response.code,400);
response=await call(app.stripeWebhook,{body:event,signature:'valid'});assert.equal(response.code,200);assert.equal(records.get('orders/'+id).status,'checkout_created');
session.line_items={data:[]};session.payment_status='paid';
response=await call(app.stripeWebhook,{body:event,signature:'valid'});assert.equal(response.code,400);assert.equal(records.get('orders/'+id).status,'checkout_created');
session.customer_details={email:'recipient@example.test',individual_name:'Test Recipient'};session.payment_intent='pi_test';session.customer='cus_test';session.amount_total=1000;session.currency='usd';records.get('orders/'+id).notificationEmailStatus='sent';records.get('orders/'+id).customerOrderEmailStatus='sent';
response=await call(app.stripeWebhook,{body:event,signature:'valid'});assert.equal(response.code,200);assert.equal(records.get('orders/'+id).status,'paid');assert.equal(records.get('orders/'+id).customerName,'Test Recipient');assert.equal(records.get('orders/'+id).customerEmail,'recipient@example.test');assert.equal(records.get('orders/'+id).customerDetailsPending,false);assert.deepEqual(records.get('orders/'+id).orderImage,image);
response=await call(app.createCustomOrder,{body});assert.equal(response.code,200);assert.equal(records.get('orders/'+id).status,'paid');
assert.throws(()=>support.assertCurrentPaidSession({checkoutSessionId:'other'},session));assert.throws(()=>support.assertCurrentPaidSession({stripeMode:'live'},session));
const badgeOrderBody={customerName:'',customerEmail:'',stripeMode:'sandbox',cartItems:['Julia','Susana','Patricia','Kristen'].map(badgeName=>({productId:'badge',badgeName,quantity:1}))};
response=await call(app.createCustomOrder,{body:badgeOrderBody,key:'four_badges_names_20261020'});assert.equal(response.code,200);
const fourBadgeOrder=records.get('orders/'+response.data.orderId);assert.equal(fourBadgeOrder.amountTotal,2000);assert.equal(fourBadgeOrder.status,'checkout_created');assert.deepEqual(Array.from(fourBadgeOrder.lineItems,i=>i.badgeName),['Julia','Susana','Patricia','Kristen']);
const fourBadgeSession=sessions.get(fourBadgeOrder.checkoutSessionId);assert.ok(fourBadgeSession.line_items.every(i=>i.price_data.unit_amount===500&&i.quantity===1&&i.price_data.tax_behavior==='inclusive'));
records.get('products/list').items.push({id:'ordinary',title:'Ordinary product',slug:'ordinary',active:true,unitAmount:700,currency:'usd'});
response=await call(app.createCustomOrder,{body:{...badgeOrderBody,cartItems:[{productId:'ordinary',badgeName:'ignored',quantity:1}]},key:'ordinary_tax_behavior_20261021'});assert.equal(response.code,200);
const ordinaryOrder=records.get('orders/'+response.data.orderId);assert.equal(ordinaryOrder.lineItems[0].badgeName,'');assert.equal(sessions.get(ordinaryOrder.checkoutSessionId).line_items[0].price_data.tax_behavior,undefined);
const beforeInvalid=created;
for(const badgeName of ['', '1234567890123456']) {response=await call(app.createCustomOrder,{body:{...badgeOrderBody,cartItems:[{productId:'badge',badgeName,quantity:4}]},key:'invalid_badge_20261020'});assert.notEqual(response.code,200);assert.equal(created,beforeInvalid);}
const policy={action:'issue',label:'Synthetic local integration',expiresInMinutes:30,scopes:['catalog:read','orders:create','orders:read-own'],allowedProductIds:['badge'],allowedModes:['sandbox'],currency:'usd',maxOrderAmount:2000,maxTotalAmount:4000,maxOrders:2,maxQuantity:4};
const issue=async(key,overrides={})=>{const r=await call(app.manageOrderIntegrations,{body:{...policy,...overrides},key});assert.equal(r.code,200);return r.data;};
const credential=await issue('integration_issue_test_0001');const token=credential.token;const grantId=credential.integration.id;const integrationAuth='Bearer '+token;
assert.ok(!JSON.stringify(records.get('order_integrations/'+grantId)).includes(token));assert.equal(records.get('order_integrations/'+grantId).tokenHash.length,64);assert.equal(credential.integration.tokenHash,undefined);
response=await call(app.manageOrderIntegrations,{method:'GET'});assert.equal(response.code,200);assert.ok(!JSON.stringify(response.data).includes(token));assert.ok(!JSON.stringify(response.data).includes('tokenHash'));
response=await call(app.manageOrderIntegrations,{body:policy,key:'integration_issue_test_0001'});assert.equal(response.code,409);
response=await call(app.orderIntegrationApi,{method:'GET',query:{resource:'catalog'},auth:integrationAuth});assert.equal(response.code,200);assert.equal(response.data.products.length,1);assert.equal(response.data.products[0].unitAmount,500);
const integrationBody={...badgeOrderBody,expectedAmountTotal:2000};
response=await call(app.orderIntegrationApi,{body:integrationBody,query:{resource:'orders'},auth:integrationAuth,key:'integration_order_test_0001'});assert.equal(response.code,200);const integrationOrderId=response.data.orderId;assert.equal(response.data.paymentStatus,'unpaid');assert.equal(response.data.stripeMode,'sandbox');assert.equal(response.data.livemode,false);assert.ok(response.data.adminOrderUrl.startsWith('https://3dlocalprint.com/admin/orders/index.html?orderId='));assert.ok(response.data.adminOrderUrl.endsWith('&orderMode=test'));assert.equal(response.data.amountTotal,2000);assert.equal(records.get('orders/'+integrationOrderId).createdByIntegrationId,grantId);assert.equal(records.get('orders/'+integrationOrderId).createdByAdminEmail,'admin@example.test');
const integrationCreated=created;
response=await call(app.orderIntegrationApi,{body:integrationBody,query:{resource:'orders'},auth:integrationAuth,key:'integration_order_test_0001'});assert.equal(response.code,200);assert.equal(response.data.orderId,integrationOrderId);assert.equal(created,integrationCreated);assert.equal(records.get('order_integrations/'+grantId).orderCount,1);
response=await call(app.orderIntegrationApi,{body:{...integrationBody,customerName:'changed'},query:{resource:'orders'},auth:integrationAuth,key:'integration_order_test_0001'});assert.equal(response.code,409);
response=await call(app.orderIntegrationApi,{method:'GET',query:{resource:'orders',orderId:integrationOrderId},auth:integrationAuth});assert.equal(response.code,200);assert.equal(response.data.customerEmail,undefined);
response=await call(app.orderIntegrationApi,{method:'GET',query:{resource:'orders',orderId:id},auth:integrationAuth});assert.equal(response.code,404);
const other=await issue('integration_issue_other_0001');response=await call(app.orderIntegrationApi,{method:'GET',query:{resource:'orders',orderId:integrationOrderId},auth:'Bearer '+other.token});assert.equal(response.code,404);
for(const extra of [{stripeMode:'live'},{amountShipping:1},{cartItems:[{productId:'ordinary',quantity:1}]},{cartItems:[{productId:'badge',badgeName:'A',quantity:5}]}]) {response=await call(app.orderIntegrationApi,{body:{...integrationBody,...extra,expectedAmountTotal:undefined},query:{resource:'orders'},auth:integrationAuth,key:'integration_denied_order_0001'});assert.equal(response.code,403);}
response=await call(app.orderIntegrationApi,{body:{...integrationBody,expectedAmountTotal:1999},query:{resource:'orders'},auth:integrationAuth,key:'integration_quote_test_0001'});assert.equal(response.code,409);
for(const extra of [{status:'paid'},{paidAt:new Date().toISOString()},{action:'refund'},{orderId:integrationOrderId},{cartItems:[{productId:'badge',badgeName:'A',quantity:1,unitAmount:1}]}]) {response=await call(app.orderIntegrationApi,{body:{...integrationBody,...extra},query:{resource:'orders'},auth:integrationAuth,key:'integration_forbidden_test_0001'});assert.equal(response.code,400);}
for(const resource of ['refund','mark-paid-cash','close','delete-test-order','resend-email','update','fulfill']) {response=await call(app.orderIntegrationApi,{body:{orderId:integrationOrderId},query:{resource},auth:integrationAuth});assert.equal(response.code,405);}
for(const method of ['PUT','PATCH','DELETE']) {response=await call(app.orderIntegrationApi,{method,query:{resource:'orders'},auth:integrationAuth});assert.equal(response.code,405);}
response=await call(app.markOrderPaidByCash,{body:{orderId:integrationOrderId},auth:integrationAuth});assert.notEqual(response.code,200);assert.equal(records.get('orders/'+integrationOrderId).status,'checkout_created');
const readOnly=await issue('integration_readonly_0001',{scopes:['catalog:read']});response=await call(app.orderIntegrationApi,{body:integrationBody,query:{resource:'orders'},auth:'Bearer '+readOnly.token});assert.equal(response.code,403);
const grant=records.get('order_integrations/'+grantId);grant.expiresAt=new Date(Date.now()-1).toISOString();response=await call(app.orderIntegrationApi,{method:'GET',query:{resource:'catalog'},auth:integrationAuth});assert.equal(response.code,401);grant.expiresAt=new Date(Date.now()+60000).toISOString();
response=await call(app.manageOrderIntegrations,{body:{action:'revoke',id:grantId}});assert.equal(response.code,200);response=await call(app.orderIntegrationApi,{method:'GET',query:{resource:'catalog'},auth:integrationAuth});assert.equal(response.code,401);
const once=await issue('integration_once_only_0001',{maxOrders:1,maxTotalAmount:2000});const onceAuth='Bearer '+once.token;
const concurrent=await Promise.all(['concurrent_order_test_0001','concurrent_order_test_0002'].map(key=>call(app.orderIntegrationApi,{body:integrationBody,query:{resource:'orders'},auth:onceAuth,key})));assert.deepEqual(concurrent.map(r=>r.code).sort(),[200,403]);assert.equal(records.get('order_integrations/'+once.integration.id).orderCount,1);assert.equal(records.get('order_integrations/'+once.integration.id).reservedAmount,2000);
const repeated=await Promise.all([1,2].map(()=>call(app.orderIntegrationApi,{body:integrationBody,query:{resource:'orders'},auth:'Bearer '+other.token,key:'concurrent_same_order_0001'})));assert.equal(repeated[0].data.orderId,repeated[1].data.orderId);assert.equal(records.get('order_integrations/'+other.integration.id).orderCount,1);
const adminItems=records.get('admins/list').items;records.get('admins/list').items=[];response=await call(app.orderIntegrationApi,{method:'GET',query:{resource:'catalog'},auth:'Bearer '+other.token});assert.equal(response.code,403);records.get('admins/list').items=adminItems;
response=await call(app.orderIntegrationApi,{method:'GET',query:{resource:'catalog'},auth:'Bearer invalid'});assert.equal(response.code,401);
const lifetime=await issue('integration_lifetime_limit_0001',{maxOrders:2,maxTotalAmount:2000});
for(const [index,expected] of [[1,200],[2,403]]){response=await call(app.orderIntegrationApi,{body:integrationBody,query:{resource:'orders'},auth:'Bearer '+lifetime.token,key:'lifetime_order_test_000'+index});assert.equal(response.code,expected);}assert.equal(records.get('order_integrations/'+lifetime.integration.id).orderCount,1);
const liveGrant=await issue('integration_live_test_0001',{allowedModes:['live'],maxOrders:1,maxTotalAmount:2000});response=await call(app.orderIntegrationApi,{body:{...integrationBody,stripeMode:'live'},query:{resource:'orders'},auth:'Bearer '+liveGrant.token,key:'live_mode_synthetic_order_0001'});assert.equal(response.code,200);assert.equal(response.data.livemode,true);assert.equal(response.data.stripeMode,'live');assert.ok(response.data.adminOrderUrl.endsWith('&orderMode=live'));assert.equal(response.data.paymentStatus,'unpaid');
response=await call(app.orderIntegrationApi,{method:'GET',query:{resource:'catalog'},auth:'Bearer '+other.token.slice(0,-1)+(other.token.endsWith('a')?'b':'a')});assert.equal(response.code,401);
response=await call(app.manageOrderIntegrations,{body:{action:'issue'},auth:'Bearer '+other.token});assert.equal(response.code,401);
const existingOwnId=repeated[0].data.orderId;records.get('orders/'+existingOwnId).status='paid';records.get('orders/'+existingOwnId).paidAt=new Date().toISOString();
response=await call(app.orderIntegrationApi,{body:integrationBody,query:{resource:'orders'},auth:'Bearer '+other.token,key:'concurrent_same_order_0001'});assert.equal(response.code,200);assert.equal(response.data.paymentStatus,'paid');assert.equal(records.get('order_integrations/'+other.integration.id).orderCount,1);
const raceGrant=await issue('integration_revoke_race_0001');onRead=path=>{if(path==='products/list'){records.get('order_integrations/'+raceGrant.integration.id).revokedAt=new Date().toISOString();onRead=()=>{};}};
response=await call(app.orderIntegrationApi,{body:integrationBody,query:{resource:'orders'},auth:'Bearer '+raceGrant.token,key:'revoke_during_creation_0001'});assert.equal(response.code,401);assert.equal(records.get('order_integrations/'+raceGrant.integration.id).orderCount,0);
for(const badgeName of ['', '1234567890123456']){response=await call(app.orderIntegrationApi,{body:{...integrationBody,expectedAmountTotal:500,cartItems:[{productId:'badge',badgeName,quantity:1}]},query:{resource:'orders'},auth:'Bearer '+other.token,key:'integration_invalid_name_0001'});assert.equal(response.code,400);}
console.log('PASS: scoped integration issue/hash-only storage; catalog filtering; shared validated unpaid creation; exact quote; idempotency/conflict/concurrency; ownership; expiry/revocation/admin removal; mode/product/quantity/order/lifetime limits; forbidden operations and admin-token isolation. Synthetic tokens only; no external services.');
console.log('PASS: authenticated pending creation; trusted $5 price; required Stripe name collection; idempotent retry/conflict; private admin image authorization/path/MIME/size; public privacy; signed webhook; unpaid guard; verified customer hydration; image preservation; paid replay safety. No external services used.');
