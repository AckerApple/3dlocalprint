import assert from 'node:assert/strict';
import http from 'node:http';
import {runCli,readKeychain,storeKeychain} from './3dlocalprint-cli.mjs';
const token='3dlp_'+ 'a'.repeat(32)+'_'+ 'b'.repeat(43);
const id='custom_'+ 'c'.repeat(32);const key='cli_order_request_20261021';
const draft={customerName:'',customerEmail:'',amountShipping:0,cartItems:['Julia','Susana','Patricia','Kristen'].map(badgeName=>({productId:'badge',badgeName,quantity:1}))};
const outputs=[];let requests=[];
const result=(mode)=>({orderId:id,stripeMode:mode,livemode:mode==='live',amountTotal:2000,currency:'usd',status:'checkout_created',paymentStatus:'unpaid',adminOrderUrl:`https://3dlocalprint.com/admin/orders/index.html?orderId=${id}&orderMode=${mode==='live'?'live':'test'}`,checkoutUrl:'https://checkout.stripe.com/c/pay/synthetic-only'});
const io={readStdin:()=>token,readFile:()=>JSON.stringify(draft),output:x=>outputs.push(x),fetch:async(url,init)=>{requests.push({url:new URL(url),init});return {ok:true,json:async()=>init.method==='POST'?result(JSON.parse(init.body).stripeMode):{products:[]}};}};
const create=['order','create','--file','order.json','--mode','sandbox','--max-total','2000','--idempotency-key',key,'--token-stdin'];
await runCli(create,io);assert.equal(outputs.at(-1).livemode,false);assert.equal(requests[0].init.headers.Authorization,'Bearer '+token);assert.equal(requests[0].init.headers['X-Idempotency-Key'],key);assert.equal(requests[0].init.redirect,'error');assert.deepEqual(JSON.parse(requests[0].init.body),{...draft,stripeMode:'sandbox',expectedAmountTotal:2000});assert.ok(!JSON.stringify(outputs).includes(token));
await runCli(create.map(x=>x==='sandbox'?'live':x),io);assert.equal(outputs.at(-1).livemode,true);await runCli(['order','get',id,'--token-stdin'],io);assert.equal(requests.at(-1).url.searchParams.get('orderId'),id);
await runCli(['catalog','--token-stdin'],io);assert.equal(requests.at(-1).url.searchParams.get('resource'),'catalog');
for(const bad of [create.filter(x=>x!=='--mode'&&x!=='sandbox'),['refund',id],['order','delete',id],['order','create','--token',token],create.concat(['--endpoint','https://attacker.invalid/api'])])await assert.rejects(()=>runCli(bad,io));
await assert.rejects(()=>runCli(create,{...io,readFile:()=>JSON.stringify({...draft,status:'paid'})}),/Unexpected order fields/);
await assert.rejects(()=>runCli(create,{...io,readFile:()=>token}),/valid JSON/);
await assert.rejects(()=>runCli(create,{...io,fetch:async()=>{throw Error('network failed');}}),/SAME idempotency key/);
await assert.rejects(()=>runCli(create,{...io,fetch:async()=>({ok:true,json:async()=>({...result('sandbox'),amountTotal:2100})})}),/did not match/);
await assert.rejects(()=>runCli(create,{...io,fetch:async()=>({ok:false,status:401,json:async()=>({error:token})})}),error=>!error.message.includes(token)&&error.message.includes('request_failed'));
let stored=0;await assert.rejects(()=>runCli(['login','--token-stdin'],{...io,storeKeychain:()=>stored++}),/separate access approval/);assert.equal(stored,0);
await runCli(['login','--approve-keychain-storage','--token-stdin'],{...io,storeKeychain:(_service,value)=>{assert.equal(value,token);stored++;}});assert.equal(stored,1);assert.ok(!JSON.stringify(outputs).includes(token));
let command;
storeKeychain('3dlocalprint.orders.default',token,(bin,args,opts)=>{command={bin,args,opts};return {status:0};});assert.ok(!command.args.includes(token));assert.ok(command.opts.input.includes(token));assert.equal(command.bin,'/usr/bin/security');
assert.equal(readKeychain('3dlocalprint.orders.default',()=>({status:0,stdout:token})),token);assert.throws(()=>readKeychain('3dlocalprint.orders.default',()=>({status:1,stderr:token})),error=>!error.message.includes(token));
// Wire test uses only a synthetic token and an isolated localhost server, not the user's browser.
process.env.LOCALPRINT_CLI_TEST='1';let wire;
const server=http.createServer(async(req,res)=>{let body='';for await(const chunk of req)body+=chunk;wire={headers:req.headers,body:JSON.parse(body)};res.setHeader('Content-Type','application/json');res.end(JSON.stringify(result('sandbox')));});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));try{const port=server.address().port;await runCli(create.concat(['--endpoint',`http://127.0.0.1:${port}/`]),{...io,fetch:globalThis.fetch});assert.equal(wire.headers.authorization,'Bearer '+token);assert.equal(wire.headers['x-idempotency-key'],key);assert.deepEqual(wire.body.cartItems.map(x=>x.badgeName),['Julia','Susana','Patricia','Kristen']);}finally{await new Promise(resolve=>server.close(resolve));delete process.env.LOCALPRINT_CLI_TEST;}
console.log('PASS: CLI wire request, explicit modes, exact quote, stable idempotency, URLs, forbidden commands, endpoint/redirect restrictions, uncertain outcomes, credential redaction, and mocked Keychain/ephemeral input. No real credentials accessed or stored.');
