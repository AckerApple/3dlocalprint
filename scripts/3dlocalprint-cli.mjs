#!/usr/bin/env node
import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {parseArgs} from 'node:util';
import {pathToFileURL} from 'node:url';
import {createInterface} from 'node:readline';
import {Writable} from 'node:stream';
const DEFAULT_ENDPOINT='https://us-central1-threedlocalprint.cloudfunctions.net/orderIntegrationApi';
const TOKEN=/^3dlp_[a-f0-9]{32}_[A-Za-z0-9_-]{43}$/;
const KEY=/^[a-zA-Z0-9_-]{16,100}$/;
function checkedToken(value){const token=String(value||'').trim();if(!TOKEN.test(token))throw Error('Invalid integration credential format.');return token;}
function keychainService(profile){if(!/^[a-zA-Z0-9_-]{1,32}$/.test(profile))throw Error('Invalid local profile.');return '3dlocalprint.orders.'+profile;}
export function readKeychain(service,spawn=spawnSync){
 const result=spawn('/usr/bin/security',['find-generic-password','-s',service,'-a','order-cli','-w'],{encoding:'utf8',stdio:['ignore','pipe','pipe']});
 if(result.status!==0)throw Error('No approved Keychain credential. Run login after access approval, or supply --token-stdin for one command.');
 return checkedToken(result.stdout);
}
export function storeKeychain(service,token,spawn=spawnSync){
 checkedToken(token);
 if(!/^3dlocalprint\.orders\.[a-zA-Z0-9_-]{1,32}$/.test(service))throw Error('Invalid credential service.');
 // Credential is sent on stdin, never in process arguments, environment, logs, or a repo file.
 const result=spawn('/usr/bin/security',['-i'],{input:`add-generic-password -U -s "${service}" -a "order-cli" -w "${token}"\n`,encoding:'utf8',stdio:['pipe','pipe','pipe']});
 if(result.status!==0)throw Error('Keychain storage failed. No command output was logged.');
}
async function promptToken(){
 if(!process.stdin.isTTY)throw Error('Use --token-stdin for noninteractive credential entry.');
 process.stderr.write('Integration token (hidden): ');
 const mute=new Writable({write(_chunk,_encoding,next){next();}});
 const rl=createInterface({input:process.stdin,output:mute,terminal:true});
 try{return await new Promise(resolve=>rl.question('',resolve));}finally{rl.close();process.stderr.write('\n');}
}
function endpoint(value){
 const url=new URL(value||DEFAULT_ENDPOINT);
 const production=url.href===DEFAULT_ENDPOINT;
 const local=process.env.LOCALPRINT_CLI_TEST==='1'&&url.protocol==='http:'&&['127.0.0.1','localhost'].includes(url.hostname);
 if(!production&&!local)throw Error('Refusing to send credentials to an unapproved endpoint.');
 return url;
}
export async function runCli(args,io={}){
 const {values:v,positionals:p}=parseArgs({args,allowPositionals:true,options:{profile:{type:'string',default:'default'},file:{type:'string'},mode:{type:'string'},'idempotency-key':{type:'string'},'max-total':{type:'string'},'token-stdin':{type:'boolean'},'approve-keychain-storage':{type:'boolean'},endpoint:{type:'string'},help:{type:'boolean'}}});
 const output=io.output||((value)=>process.stdout.write(JSON.stringify(value,null,2)+'\n'));
 if(v.help||!p.length){output({usage:['catalog','order create --file order.json --mode live|sandbox --max-total 2000 --idempotency-key KEY','order get ORDER_ID','login --approve-keychain-storage','logout'],credential:'macOS Keychain by default; --token-stdin uses an ephemeral credential without saving it',amounts:'integer USD cents; mode is always explicit for creation'});return;}
 const service=keychainService(v.profile);
 const readStdin=io.readStdin||(()=>fs.readFileSync(0,'utf8'));
 const readToken=async()=>checkedToken(v['token-stdin']?readStdin():(io.readKeychain||readKeychain)(service));
 if(p[0]==='login'){
  if(p.length!==1||!v['approve-keychain-storage'])throw Error('Login requires separate access approval and --approve-keychain-storage.');
  const token=checkedToken(v['token-stdin']?readStdin():await(io.promptToken||promptToken)());
  (io.storeKeychain||storeKeychain)(service,token);output({credentialStored:true,profile:v.profile});return;
 }
 if(p[0]==='logout'){
  if(p.length!==1)throw Error('Unexpected logout arguments.');
  const result=(io.spawn||spawnSync)('/usr/bin/security',['delete-generic-password','-s',service,'-a','order-cli'],{stdio:['ignore','pipe','pipe']});
  if(result.status!==0)throw Error('No stored credential was removed.');output({credentialRemoved:true,profile:v.profile});return;
 }
 const url=endpoint(v.endpoint);let body;let method='GET';const headers={'Accept':'application/json'};
 if(p[0]==='catalog'&&p.length===1){url.searchParams.set('resource','catalog');}
 else if(p[0]==='order'&&p[1]==='get'&&p.length===3){
  if(!/^custom_[a-f0-9]{32}$/.test(p[2]))throw Error('Invalid order ID.');url.searchParams.set('resource','orders');url.searchParams.set('orderId',p[2]);
 }else if(p[0]==='order'&&p[1]==='create'&&p.length===2){
  if(!['live','sandbox'].includes(v.mode)||!v.file||!KEY.test(v['idempotency-key']||'')||!/^\d+$/.test(v['max-total']||'')||Number(v['max-total'])<1||Number(v['max-total'])>1000000)throw Error('Create requires --file, explicit --mode, --max-total in cents, and a stable --idempotency-key.');
  let draft;try{draft=JSON.parse((io.readFile||((path)=>fs.readFileSync(path,'utf8')))(v.file));}catch{throw Error('Order file must be readable valid JSON.');}
  if(!draft||Array.isArray(draft)||Object.keys(draft).some(k=>!['customerName','customerEmail','cartItems','amountShipping'].includes(k)))throw Error('Unexpected order fields. Only contact, cart items, and shipping may be supplied.');
  body={...draft,stripeMode:v.mode,expectedAmountTotal:Number(v['max-total'])};method='POST';url.searchParams.set('resource','orders');headers['Content-Type']='application/json';headers['X-Idempotency-Key']=v['idempotency-key'];
 }else throw Error('Unsupported command. Use --help.');
 headers.Authorization='Bearer '+await readToken();
 let response;try{response=await(io.fetch||fetch)(url,{method,headers,body:body?JSON.stringify(body):undefined,redirect:'error',signal:AbortSignal.timeout(30000)});}catch{throw Error(body?'Request outcome is unknown. Retry only with the SAME idempotency key and unchanged order, or inspect the existing order.':'Request failed without a response.');}
 const data=await response.json().catch(()=>({}));
 if(!response.ok){const code=/^[a-z_]{1,80}$/.test(data.error||'')?data.error:'request_failed';throw Error(`HTTP ${response.status}: ${code}. Retry creation only with the same idempotency key and unchanged order.`);}
 if(body){
  if(data.stripeMode!==v.mode||data.livemode!==(v.mode==='live')||data.amountTotal!==Number(v['max-total'])||data.currency!=='usd')throw Error('Order response did not match requested mode/amount. Do not retry with a new key; inspect using the same request key.');
  const admin=new URL(data.adminOrderUrl);const checkout=new URL(data.checkoutUrl);
  if(admin.origin!=='https://3dlocalprint.com'||admin.pathname!=='/admin/orders/index.html'||admin.searchParams.get('orderId')!==data.orderId||admin.searchParams.get('orderMode')!==(v.mode==='live'?'live':'test')||checkout.origin!=='https://checkout.stripe.com')throw Error('Order returned unexpected URLs; inspect the existing request before retrying.');
 }
 output(data);return data;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){runCli(process.argv.slice(2)).catch(error=>{process.stderr.write((error instanceof Error?error.message:'CLI failed')+'\n');process.exitCode=1;});}
