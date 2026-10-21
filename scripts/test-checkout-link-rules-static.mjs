import fs from 'node:fs';import assert from 'node:assert/strict';
const rules=fs.readFileSync(new URL('../firebase-hosting/firestore.rules',import.meta.url),'utf8');
for(const collection of ['checkout_links','checkout_link_admin','order_reference_index','checkout_rate_limits']){
 assert.match(rules,new RegExp('"'+collection+'"'));
 assert.equal((rules.match(new RegExp('"'+collection+'"','g'))||[]).length,1);
}
assert.match(rules,/allow read, write: if !\(collection in \[[^\]]+\]\) && isAdmin\(\)/);
assert.match(rules,/match \/products\/list \{\s+allow read: if true;/);
console.log('PASS: static rules review excludes all checkout-link/admin/reference/rate collections from browser catch-all access; public catalog rule preserved. This is NOT a Firestore emulator test; no Java used.');
