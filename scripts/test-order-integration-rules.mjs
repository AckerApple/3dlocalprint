import fs from 'node:fs';
import {initializeTestEnvironment,assertFails,assertSucceeds} from '@firebase/rules-unit-testing';
import {doc,getDoc,setDoc,collection,getDocs} from 'firebase/firestore';
const address=process.env.FIRESTORE_EMULATOR_HOST;
if(!address||!/^(127\.0\.0\.1|localhost):\d+$/.test(address)){console.error('Rules tests require an isolated localhost Firestore emulator; no production connection is allowed.');process.exit(2);}
const [host,port]=address.split(':');
const env=await initializeTestEnvironment({projectId:'demo-3dlocalprint-order-integrations',firestore:{host,port:Number(port),rules:fs.readFileSync(new URL('../firebase-hosting/firestore.rules',import.meta.url),'utf8')}});
try{
 await env.withSecurityRulesDisabled(async ctx=>{const db=ctx.firestore();await setDoc(doc(db,'admins/list'),{items:['admin@example.test']});await setDoc(doc(db,'products/list'),{items:[]});await setDoc(doc(db,'orders/example'),{status:'checkout_created'});await setDoc(doc(db,'order_integrations/example'),{tokenHash:'synthetic-hash-only'});});
 const admin=env.authenticatedContext('admin',{email:'admin@example.test'}).firestore();
 const outsider=env.authenticatedContext('outsider',{email:'outsider@example.test'}).firestore();
 const anonymous=env.unauthenticatedContext().firestore();
 for(const db of [admin,outsider,anonymous]){
  await assertFails(getDoc(doc(db,'order_integrations/example')));
  await assertFails(setDoc(doc(db,'order_integrations/new'),{scopes:['orders:create']}));
  await assertFails(getDocs(collection(db,'order_integrations')));
 }
 await assertSucceeds(getDoc(doc(admin,'orders/example')));await assertSucceeds(setDoc(doc(admin,'orders/example'),{status:'checkout_created'}));
 await assertSucceeds(getDoc(doc(anonymous,'products/list')));await assertSucceeds(setDoc(doc(admin,'products/list'),{items:[]}));
 await assertFails(getDoc(doc(outsider,'orders/example')));await assertFails(setDoc(doc(outsider,'products/list'),{items:[]}));
 console.log('PASS: integration hashes/budgets are server-only for all clients; existing admin order/catalog and public catalog permissions preserved. Isolated emulator only.');
}finally{await env.cleanup();}
