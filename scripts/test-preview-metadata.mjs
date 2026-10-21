import fs from 'node:fs';import assert from 'node:assert/strict';import {JSDOM} from 'jsdom';
for(const [file,path,title] of [['cart.html','/cart.html','Cart'],['pay/index.html','/pay/','Checkout'],['receipt.html','/receipt.html','Receipt'],['order.html','/order.html','Order Details'],['products.html','/products.html','Products'],['product.html','/product.html','Products'],['index.html','/','3D Local Print']]){
 for(const folder of ['src','docs']){
  const d=new JSDOM(fs.readFileSync(`${folder}/${file}`,'utf8')).window.document;const get=p=>d.querySelector(`meta[property="${p}"]`)?.content;
  assert.match(get('og:title'),new RegExp(title));assert.ok(get('og:description').length>25);assert.equal(get('og:url'),'https://3dlocalprint.com'+path);assert.equal(d.querySelector('link[rel=canonical]').href,get('og:url'));assert.equal(get('og:type'),'website');assert.equal(get('og:image'),'https://3dlocalprint.com/assets/logo/transparent.png');assert.equal(get('og:image:type'),'image/png');assert.equal(get('og:image:width'),'1254');assert.equal(get('og:image:height'),'1254');assert.equal(get('og:image:alt'),'3D Local Print logo');assert.equal(d.querySelector('meta[name="twitter:card"]').content,'summary_large_image');assert.equal(d.querySelector('meta[name="twitter:image"]').content,get('og:image'));
  const metadata=[...d.querySelectorAll('meta,link[rel=canonical]')].map(x=>x.outerHTML).join('');assert.ok(!/custom_[a-f0-9]|cs_live_|customerEmail|#checkout|session_id|orderId=/.test(metadata));
 }
}
const png=fs.readFileSync('src/assets/logo/transparent.png');assert.equal(png.readUInt32BE(16),1254);assert.equal(png.readUInt32BE(20),1254);
console.log('PASS static preview metadata: source and emitted HTML, page-specific titles/canonical URLs, OG/Twitter absolute public PNG/dimensions/alt, no order/customer/capability metadata.');
