import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import ts from 'typescript';
const s=fs.readFileSync(new URL('../src/admin/orders/orders.tag.ts', import.meta.url),'utf8');
const logic=s.slice(s.indexOf('const isCustomOrderBadgeItem ='),s.indexOf('const removeCustomOrderItem ='));
const code=`let refreshes=0;const refreshOrderModal=()=>refreshes++;const customOrderCatalog=[{id:'badge',slug:'custom-name-badges'}];const isNameBadgeProduct=p=>p.slug==='custom-name-badges';let customOrderDraft={items:[{productId:'badge',badgeName:'',quantity:4,unitAmount:500,currency:'usd'}]};${logic}
splitCustomOrderBadgeNames(0);assert.equal(customOrderDraft.items.length,4);assert.equal(customOrderDraft.items.reduce((sum,x)=>sum+x.quantity*x.unitAmount,0),2000);assert.ok(customOrderDraft.items.every(x=>x.quantity===1&&x.badgeName===''));
const names=['QA One','QA Two','QA Three','QA Four'];customOrderDraft.items.forEach((x,i)=>x.badgeName=names[i]);assert.deepEqual(customOrderDraft.items.map(x=>x.badgeName),names);
customOrderDraft.items=[{productId:'badge',badgeName:'QA Existing',quantity:4,unitAmount:500}];splitCustomOrderBadgeNames(0);assert.equal(customOrderDraft.items[0].badgeName,'QA Existing');assert.ok(customOrderDraft.items.slice(1).every(x=>x.badgeName===''));
addCustomOrderBadgeName(0);assert.equal(customOrderDraft.items[1].quantity,1);assert.equal(customOrderDraft.items[1].badgeName,'');customOrderDraft.items[1].badgeName='New';assert.equal(customOrderDraft.items[0].badgeName,'QA Existing');
customOrderDraft.items=[{productId:'ordinary',quantity:4,unitAmount:500}];splitCustomOrderBadgeNames(0);addCustomOrderBadgeName(0);assert.equal(customOrderDraft.items.length,1);
console.log('PASS: split four badges preserves $20, independent blank name fields, existing first name, new name copy=1, ordinary item guard.');`;
vm.runInNewContext(ts.transpileModule(code,{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText,{assert,console});
