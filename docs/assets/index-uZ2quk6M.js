var Qm=Object.defineProperty;var Xm=(n,t,e)=>t in n?Qm(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var Xt=(n,t,e)=>Xm(n,typeof t!="symbol"?t+"":t,e);const Ym=()=>{};var hl={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const od=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Zm=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[e++];t[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[e++],o=n[e++],c=n[e++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(u>>10)),t[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[e++],o=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return t.join("")},ad={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let m=(c&15)<<2|h>>6,A=h&63;u||(A=64,o||(m=64)),r.push(e[f],e[p],e[m],e[A])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(od(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Zm(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=e[n.charAt(s++)],c=s<n.length?e[n.charAt(s)]:0;++s;const h=s<n.length?e[n.charAt(s)]:64;++s;const p=s<n.length?e[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new t_;const m=i<<2|c>>4;if(r.push(m),h!==64){const A=c<<4&240|h>>2;if(r.push(A),p!==64){const C=h<<6&192|p;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class t_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const e_=function(n){const t=od(n);return ad.encodeByteArray(t,!0)},si=function(n){return e_(n).replace(/\./g,"")},cd=function(n){try{return ad.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n_(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r_=()=>n_().__FIREBASE_DEFAULTS__,s_=()=>{if(typeof process>"u"||typeof hl>"u")return;const n=hl.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},i_=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&cd(n[1]);return t&&JSON.parse(t)},Di=()=>{try{return Ym()||r_()||s_()||i_()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ud=n=>{var t,e;return(e=(t=Di())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},ld=n=>{const t=ud(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},hd=()=>{var n;return(n=Di())==null?void 0:n.config},dd=n=>{var t;return(t=Di())==null?void 0:t[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o_{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Va(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fd(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[si(JSON.stringify(e)),si(JSON.stringify(o)),""].join(".")}const Mr={};function a_(){const n={prod:[],emulator:[]};for(const t of Object.keys(Mr))Mr[t]?n.emulator.push(t):n.prod.push(t);return n}function c_(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let dl=!1;function Da(n,t){if(typeof window>"u"||typeof document>"u"||!nn(window.location.host)||Mr[n]===t||Mr[n]||dl)return;Mr[n]=t;function e(m){return`__firebase__banner__${m}`}const r="__firebase__banner",i=a_().prod.length>0;function o(){const m=document.getElementById(r);m&&m.remove()}function c(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function u(m,A){m.setAttribute("width","24"),m.setAttribute("id",A),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function h(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{dl=!0,o()},m}function f(m,A){m.setAttribute("id",A),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function p(){const m=c_(r),A=e("text"),C=document.getElementById(A)||document.createElement("span"),k=e("learnmore"),V=document.getElementById(k)||document.createElement("a"),B=e("preprendIcon"),U=document.getElementById(B)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const q=m.element;c(q),f(V,k);const J=h();u(U,B),q.append(U,C,V,J),document.body.appendChild(q)}i?(C.innerText="Preview backend disconnected.",U.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(U.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",A)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function u_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Dt())}function l_(){var t;const n=(t=Di())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function h_(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function d_(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function f_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function p_(){const n=Dt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function g_(){return!l_()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function m_(){try{return typeof indexedDB=="object"}catch{return!1}}function __(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var i;t(((i=s.error)==null?void 0:i.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y_="FirebaseError";class me extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=y_,Object.setPrototypeOf(this,me.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ss.prototype.create)}}class ss{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,i=this.errors[t],o=i?T_(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new me(s,c,r)}}function T_(n,t){return n.replace(E_,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const E_=/\{\$([^}]+)}/g;function w_(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}function Tn(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const i=n[s],o=t[s];if(fl(i)&&fl(o)){if(!Tn(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function fl(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function is(n){const t=[];for(const[e,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(s))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function I_(n,t){const e=new A_(n,t);return e.subscribe.bind(e)}class A_{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,r){let s;if(t===void 0&&e===void 0&&r===void 0)throw new Error("Missing Observer.");b_(t,["next","error","complete"])?s=t:s={next:t,error:e,complete:r},s.next===void 0&&(s.next=xo),s.error===void 0&&(s.error=xo),s.complete===void 0&&(s.complete=xo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function b_(n,t){if(typeof n!="object"||n===null)return!1;for(const e of t)if(e in n&&typeof n[e]=="function")return!0;return!1}function xo(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(n){return n&&n._delegate?n._delegate:n}class Ke{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v_{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new o_;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(C_(t))try{this.getOrInitializeService({instanceIdentifier:gn})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(t=gn){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=gn){return this.instances.has(t)}getOptions(t=gn){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&t(i,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:R_(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=gn){return this.component?this.component.multipleInstances?t:gn:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function R_(n){return n===gn?void 0:n}function C_(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S_{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new v_(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(z||(z={}));const P_={debug:z.DEBUG,verbose:z.VERBOSE,info:z.INFO,warn:z.WARN,error:z.ERROR,silent:z.SILENT},k_=z.INFO,V_={[z.DEBUG]:"log",[z.VERBOSE]:"log",[z.INFO]:"info",[z.WARN]:"warn",[z.ERROR]:"error"},D_=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=V_[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Na{constructor(t){this.name=t,this._logLevel=k_,this._logHandler=D_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in z))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?P_[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,z.DEBUG,...t),this._logHandler(this,z.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,z.VERBOSE,...t),this._logHandler(this,z.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,z.INFO,...t),this._logHandler(this,z.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,z.WARN,...t),this._logHandler(this,z.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,z.ERROR,...t),this._logHandler(this,z.ERROR,...t)}}const N_=(n,t)=>t.some(e=>n instanceof e);let pl,gl;function O_(){return pl||(pl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function M_(){return gl||(gl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const pd=new WeakMap,Zo=new WeakMap,gd=new WeakMap,Uo=new WeakMap,Oa=new WeakMap;function L_(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{e($e(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return t.then(e=>{e instanceof IDBCursor&&pd.set(e,n)}).catch(()=>{}),Oa.set(t,n),t}function x_(n){if(Zo.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{e(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Zo.set(n,t)}let ta={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Zo.get(n);if(t==="objectStoreNames")return n.objectStoreNames||gd.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return $e(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function U_(n){ta=n(ta)}function F_(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(Fo(this),t,...e);return gd.set(r,t.sort?t.sort():[t]),$e(r)}:M_().includes(n)?function(...t){return n.apply(Fo(this),t),$e(pd.get(this))}:function(...t){return $e(n.apply(Fo(this),t))}}function B_(n){return typeof n=="function"?F_(n):(n instanceof IDBTransaction&&x_(n),N_(n,O_())?new Proxy(n,ta):n)}function $e(n){if(n instanceof IDBRequest)return L_(n);if(Uo.has(n))return Uo.get(n);const t=B_(n);return t!==n&&(Uo.set(n,t),Oa.set(t,n)),t}const Fo=n=>Oa.get(n);function j_(n,t,{blocked:e,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,t),c=$e(o);return r&&o.addEventListener("upgradeneeded",u=>{r($e(o.result),u.oldVersion,u.newVersion,$e(o.transaction),u)}),e&&o.addEventListener("blocked",u=>e(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const $_=["get","getKey","getAll","getAllKeys","count"],q_=["put","add","delete","clear"],Bo=new Map;function ml(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(Bo.get(t))return Bo.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=q_.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||$_.includes(e)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[e](...c),s&&u.done]))[0]};return Bo.set(t,i),i}U_(n=>({...n,get:(t,e,r)=>ml(t,e)||n.get(t,e,r),has:(t,e)=>!!ml(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H_{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(z_(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function z_(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const ea="@firebase/app",_l="0.14.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ae=new Na("@firebase/app"),W_="@firebase/app-compat",G_="@firebase/analytics-compat",J_="@firebase/analytics",K_="@firebase/app-check-compat",Q_="@firebase/app-check",X_="@firebase/auth",Y_="@firebase/auth-compat",Z_="@firebase/database",ty="@firebase/data-connect",ey="@firebase/database-compat",ny="@firebase/functions",ry="@firebase/functions-compat",sy="@firebase/installations",iy="@firebase/installations-compat",oy="@firebase/messaging",ay="@firebase/messaging-compat",cy="@firebase/performance",uy="@firebase/performance-compat",ly="@firebase/remote-config",hy="@firebase/remote-config-compat",dy="@firebase/storage",fy="@firebase/storage-compat",py="@firebase/firestore",gy="@firebase/ai",my="@firebase/firestore-compat",_y="firebase",yy="12.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const na="[DEFAULT]",Ty={[ea]:"fire-core",[W_]:"fire-core-compat",[J_]:"fire-analytics",[G_]:"fire-analytics-compat",[Q_]:"fire-app-check",[K_]:"fire-app-check-compat",[X_]:"fire-auth",[Y_]:"fire-auth-compat",[Z_]:"fire-rtdb",[ty]:"fire-data-connect",[ey]:"fire-rtdb-compat",[ny]:"fire-fn",[ry]:"fire-fn-compat",[sy]:"fire-iid",[iy]:"fire-iid-compat",[oy]:"fire-fcm",[ay]:"fire-fcm-compat",[cy]:"fire-perf",[uy]:"fire-perf-compat",[ly]:"fire-rc",[hy]:"fire-rc-compat",[dy]:"fire-gcs",[fy]:"fire-gcs-compat",[py]:"fire-fst",[my]:"fire-fst-compat",[gy]:"fire-vertex","fire-js":"fire-js",[_y]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ii=new Map,Ey=new Map,ra=new Map;function yl(n,t){try{n.container.addComponent(t)}catch(e){Ae.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function En(n){const t=n.name;if(ra.has(t))return Ae.debug(`There were multiple attempts to register component ${t}.`),!1;ra.set(t,n);for(const e of ii.values())yl(e,n);for(const e of Ey.values())yl(e,n);return!0}function Ni(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function qt(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wy={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},qe=new ss("app","Firebase",wy);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iy{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ke("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw qe.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rn=yy;function md(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:na,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw qe.create("bad-app-name",{appName:String(s)});if(e||(e=hd()),!e)throw qe.create("no-options");const i=ii.get(s);if(i){if(Tn(e,i.options)&&Tn(r,i.config))return i;throw qe.create("duplicate-app",{appName:s})}const o=new S_(s);for(const u of ra.values())o.addComponent(u);const c=new Iy(e,r,o);return ii.set(s,c),c}function Ma(n=na){const t=ii.get(n);if(!t&&n===na&&hd())return md();if(!t)throw qe.create("no-app",{appName:n});return t}function ue(n,t,e){let r=Ty[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${t}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Ae.warn(o.join(" "));return}En(new Ke(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ay="firebase-heartbeat-database",by=1,Hr="firebase-heartbeat-store";let jo=null;function _d(){return jo||(jo=j_(Ay,by,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Hr)}catch(e){console.warn(e)}}}}).catch(n=>{throw qe.create("idb-open",{originalErrorMessage:n.message})})),jo}async function vy(n){try{const e=(await _d()).transaction(Hr),r=await e.objectStore(Hr).get(yd(n));return await e.done,r}catch(t){if(t instanceof me)Ae.warn(t.message);else{const e=qe.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Ae.warn(e.message)}}}async function Tl(n,t){try{const r=(await _d()).transaction(Hr,"readwrite");await r.objectStore(Hr).put(t,yd(n)),await r.done}catch(e){if(e instanceof me)Ae.warn(e.message);else{const r=qe.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Ae.warn(r.message)}}}function yd(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ry=1024,Cy=30;class Sy{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new ky(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=El();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Cy){const o=Vy(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Ae.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=El(),{heartbeatsToSend:r,unsentEntries:s}=Py(this._heartbeatsCache.heartbeats),i=si(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return Ae.warn(e),""}}}function El(){return new Date().toISOString().substring(0,10)}function Py(n,t=Ry){const e=[];let r=n.slice();for(const s of n){const i=e.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),wl(e)>t){i.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),wl(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class ky{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return m_()?__().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await vy(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return Tl(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return Tl(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function wl(n){return si(JSON.stringify({version:2,heartbeats:n})).length}function Vy(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dy(n){En(new Ke("platform-logger",t=>new H_(t),"PRIVATE")),En(new Ke("heartbeat",t=>new Sy(t),"PRIVATE")),ue(ea,_l,n),ue(ea,_l,"esm2020"),ue("fire-js","")}Dy("");var Ny="firebase",Oy="12.7.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ue(Ny,Oy,"app");function Td(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const My=Td,Ed=new ss("auth","Firebase",Td());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oi=new Na("@firebase/auth");function Ly(n,...t){oi.logLevel<=z.WARN&&oi.warn(`Auth (${Rn}): ${n}`,...t)}function Gs(n,...t){oi.logLevel<=z.ERROR&&oi.error(`Auth (${Rn}): ${n}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(n,...t){throw xa(n,...t)}function Zt(n,...t){return xa(n,...t)}function La(n,t,e){const r={...My(),[t]:e};return new ss("auth","Firebase",r).create(t,{appName:n.name})}function He(n){return La(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function wd(n,t,e){const r=e;if(!(t instanceof r))throw r.name!==t.constructor.name&&pe(n,"argument-error"),La(n,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function xa(n,...t){if(typeof n!="string"){const e=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(e,...r)}return Ed.create(n,...t)}function j(n,t,...e){if(!n)throw xa(t,...e)}function Te(n){const t="INTERNAL ASSERTION FAILED: "+n;throw Gs(t),new Error(t)}function be(n,t){n||Te(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sa(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function xy(){return Il()==="http:"||Il()==="https:"}function Il(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uy(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(xy()||d_()||"connection"in navigator)?navigator.onLine:!0}function Fy(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(t,e){this.shortDelay=t,this.longDelay=e,be(e>t,"Short delay should be less than long delay!"),this.isMobile=u_()||f_()}get(){return Uy()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ua(n,t){be(n.emulator,"Emulator should always be set here");const{url:e}=n.emulator;return t?`${e}${t.startsWith("/")?t.slice(1):t}`:e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Id{static initialize(t,e,r){this.fetchImpl=t,e&&(this.headersImpl=e),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Te("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Te("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Te("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const By={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jy=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],$y=new os(3e4,6e4);function Fa(n,t){return n.tenantId&&!t.tenantId?{...t,tenantId:n.tenantId}:t}async function ar(n,t,e,r,s={}){return Ad(n,s,async()=>{let i={},o={};r&&(t==="GET"?o=r:i={body:JSON.stringify(r)});const c=is({key:n.config.apiKey,...o}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h={method:t,headers:u,...i};return h_()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&nn(n.emulatorConfig.host)&&(h.credentials="include"),Id.fetch()(await bd(n,n.config.apiHost,e,c),h)})}async function Ad(n,t,e){n._canInitEmulator=!1;const r={...By,...t};try{const s=new Hy(n),i=await Promise.race([e(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Fs(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Fs(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Fs(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw Fs(n,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw La(n,f,h);pe(n,f)}}catch(s){if(s instanceof me)throw s;pe(n,"network-request-failed",{message:String(s)})}}async function qy(n,t,e,r,s={}){const i=await ar(n,t,e,r,s);return"mfaPendingCredential"in i&&pe(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function bd(n,t,e,r){const s=`${t}${e}?${r}`,i=n,o=i.config.emulator?Ua(n.config,s):`${n.config.apiScheme}://${s}`;return jy.includes(e)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class Hy{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((e,r)=>{this.timer=setTimeout(()=>r(Zt(this.auth,"network-request-failed")),$y.get())})}}function Fs(n,t,e){const r={appName:n.name};e.email&&(r.email=e.email),e.phoneNumber&&(r.phoneNumber=e.phoneNumber);const s=Zt(n,t,r);return s.customData._tokenResponse=e,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zy(n,t){return ar(n,"POST","/v1/accounts:delete",t)}async function ai(n,t){return ar(n,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lr(n){if(n)try{const t=new Date(Number(n));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function Wy(n,t=!1){const e=it(n),r=await e.getIdToken(t),s=Ba(r);j(s&&s.exp&&s.auth_time&&s.iat,e.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Lr($o(s.auth_time)),issuedAtTime:Lr($o(s.iat)),expirationTime:Lr($o(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function $o(n){return Number(n)*1e3}function Ba(n){const[t,e,r]=n.split(".");if(t===void 0||e===void 0||r===void 0)return Gs("JWT malformed, contained fewer than 3 sections"),null;try{const s=cd(e);return s?JSON.parse(s):(Gs("Failed to decode base64 JWT payload"),null)}catch(s){return Gs("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Al(n){const t=Ba(n);return j(t,"internal-error"),j(typeof t.exp<"u","internal-error"),j(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zr(n,t,e=!1){if(e)return t;try{return await t}catch(r){throw r instanceof me&&Gy(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Gy({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jy{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){if(t){const e=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),e}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=Lr(this.lastLoginAt),this.creationTime=Lr(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ci(n){var p;const t=n.auth,e=await n.getIdToken(),r=await zr(n,ai(t,{idToken:e}));j(r==null?void 0:r.users.length,t,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(p=s.providerUserInfo)!=null&&p.length?vd(s.providerUserInfo):[],o=Qy(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(o!=null&&o.length),h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new ia(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function Ky(n){const t=it(n);await ci(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function Qy(n,t){return[...n.filter(r=>!t.some(s=>s.providerId===r.providerId)),...t]}function vd(n){return n.map(({providerId:t,...e})=>({providerId:t,uid:e.rawId||"",displayName:e.displayName||null,email:e.email||null,phoneNumber:e.phoneNumber||null,photoURL:e.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xy(n,t){const e=await Ad(n,{},async()=>{const r=is({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await bd(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&nn(n.emulatorConfig.host)&&(u.credentials="include"),Id.fetch()(o,u)});return{accessToken:e.access_token,expiresIn:e.expires_in,refreshToken:e.refresh_token}}async function Yy(n,t){return ar(n,"POST","/v2/accounts:revokeToken",Fa(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){j(t.idToken,"internal-error"),j(typeof t.idToken<"u","internal-error"),j(typeof t.refreshToken<"u","internal-error");const e="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):Al(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}updateFromIdToken(t){j(t.length!==0,"internal-error");const e=Al(t);this.updateTokensAndExpiration(t,null,e)}async getToken(t,e=!1){return!e&&this.accessToken&&!this.isExpired?this.accessToken:(j(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:r,refreshToken:s,expiresIn:i}=await Xy(t,e);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(t,e,r){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(t,e){const{refreshToken:r,accessToken:s,expirationTime:i}=e,o=new Wn;return r&&(j(typeof r=="string","internal-error",{appName:t}),o.refreshToken=r),s&&(j(typeof s=="string","internal-error",{appName:t}),o.accessToken=s),i&&(j(typeof i=="number","internal-error",{appName:t}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new Wn,this.toJSON())}_performRefresh(){return Te("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Me(n,t){j(typeof n=="string"||typeof n>"u","internal-error",{appName:t})}class Yt{constructor({uid:t,auth:e,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new Jy(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=e,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new ia(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(t){const e=await zr(this,this.stsTokenManager.getToken(this.auth,t));return j(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return Wy(this,t)}reload(){return Ky(this)}_assign(t){this!==t&&(j(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(e=>({...e})),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const e=new Yt({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return e.metadata._copy(this.metadata),e}_onReload(t){j(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let r=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),r=!0),e&&await ci(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(qt(this.auth.app))return Promise.reject(He(this.auth));const t=await this.getIdToken();return await zr(this,zy(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>({...t})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){const r=e.displayName??void 0,s=e.email??void 0,i=e.phoneNumber??void 0,o=e.photoURL??void 0,c=e.tenantId??void 0,u=e._redirectEventId??void 0,h=e.createdAt??void 0,f=e.lastLoginAt??void 0,{uid:p,emailVerified:m,isAnonymous:A,providerData:C,stsTokenManager:k}=e;j(p&&k,t,"internal-error");const V=Wn.fromJSON(this.name,k);j(typeof p=="string",t,"internal-error"),Me(r,t.name),Me(s,t.name),j(typeof m=="boolean",t,"internal-error"),j(typeof A=="boolean",t,"internal-error"),Me(i,t.name),Me(o,t.name),Me(c,t.name),Me(u,t.name),Me(h,t.name),Me(f,t.name);const B=new Yt({uid:p,auth:t,email:s,emailVerified:m,displayName:r,isAnonymous:A,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:V,createdAt:h,lastLoginAt:f});return C&&Array.isArray(C)&&(B.providerData=C.map(U=>({...U}))),u&&(B._redirectEventId=u),B}static async _fromIdTokenResponse(t,e,r=!1){const s=new Wn;s.updateFromServerResponse(e);const i=new Yt({uid:e.localId,auth:t,stsTokenManager:s,isAnonymous:r});return await ci(i),i}static async _fromGetAccountInfoResponse(t,e,r){const s=e.users[0];j(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?vd(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Wn;c.updateFromIdToken(r);const u=new Yt({uid:s.localId,auth:t,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new ia(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bl=new Map;function Ee(n){be(n instanceof Function,"Expected a class definition");let t=bl.get(n);return t?(be(t instanceof n,"Instance stored in cache mismatched with class"),t):(t=new n,bl.set(n,t),t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return e===void 0?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}Rd.type="NONE";const vl=Rd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Js(n,t,e){return`firebase:${n}:${t}:${e}`}class Gn{constructor(t,e,r){this.persistence=t,this.auth=e,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Js(this.userKey,s.apiKey,i),this.fullPersistenceKey=Js("persistence",s.apiKey,i),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const e=await ai(this.auth,{idToken:t}).catch(()=>{});return e?Yt._fromGetAccountInfoResponse(this.auth,e,t):null}return Yt._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,e)return this.setCurrentUser(e)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,r="authUser"){if(!e.length)return new Gn(Ee(vl),t,r);const s=(await Promise.all(e.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Ee(vl);const o=Js(r,t.config.apiKey,t.name);let c=null;for(const h of e)try{const f=await h._get(o);if(f){let p;if(typeof f=="string"){const m=await ai(t,{idToken:f}).catch(()=>{});if(!m)break;p=await Yt._fromGetAccountInfoResponse(t,m,f)}else p=Yt._fromJSON(t,f);h!==i&&(c=p),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Gn(i,t,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(e.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Gn(i,t,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rl(n){const t=n.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(kd(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Cd(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Dd(t))return"Blackberry";if(Nd(t))return"Webos";if(Sd(t))return"Safari";if((t.includes("chrome/")||Pd(t))&&!t.includes("edge/"))return"Chrome";if(Vd(t))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(e);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Cd(n=Dt()){return/firefox\//i.test(n)}function Sd(n=Dt()){const t=n.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Pd(n=Dt()){return/crios\//i.test(n)}function kd(n=Dt()){return/iemobile/i.test(n)}function Vd(n=Dt()){return/android/i.test(n)}function Dd(n=Dt()){return/blackberry/i.test(n)}function Nd(n=Dt()){return/webos/i.test(n)}function ja(n=Dt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Zy(n=Dt()){var t;return ja(n)&&!!((t=window.navigator)!=null&&t.standalone)}function tT(){return p_()&&document.documentMode===10}function Od(n=Dt()){return ja(n)||Vd(n)||Nd(n)||Dd(n)||/windows phone/i.test(n)||kd(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Md(n,t=[]){let e;switch(n){case"Browser":e=Rl(Dt());break;case"Worker":e=`${Rl(Dt())}-${n}`;break;default:e=n}const r=t.length?t.join(","):"FirebaseCore-web";return`${e}/JsCore/${Rn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eT{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,e){const r=i=>new Promise((o,c)=>{try{const u=t(i);o(u)}catch(u){c(u)}});r.onAbort=e,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const e=[];try{for(const r of this.queue)await r(t),r.onAbort&&e.push(r.onAbort)}catch(r){e.reverse();for(const s of e)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nT(n,t={}){return ar(n,"GET","/v2/passwordPolicy",Fa(n,t))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rT=6;class sT{constructor(t){var r;const e=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=e.minPasswordLength??rT,e.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=e.maxPasswordLength),e.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=e.containsLowercaseCharacter),e.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=e.containsUppercaseCharacter),e.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=e.containsNumericCharacter),e.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=e.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=t.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=t.forceUpgradeOnSignin??!1,this.schemaVersion=t.schemaVersion}validatePassword(t){const e={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,e),this.validatePasswordCharacterOptions(t,e),e.isValid&&(e.isValid=e.meetsMinPasswordLength??!0),e.isValid&&(e.isValid=e.meetsMaxPasswordLength??!0),e.isValid&&(e.isValid=e.containsLowercaseLetter??!0),e.isValid&&(e.isValid=e.containsUppercaseLetter??!0),e.isValid&&(e.isValid=e.containsNumericCharacter??!0),e.isValid&&(e.isValid=e.containsNonAlphanumericCharacter??!0),e}validatePasswordLengthOptions(t,e){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(e.meetsMinPasswordLength=t.length>=r),s&&(e.meetsMaxPasswordLength=t.length<=s)}validatePasswordCharacterOptions(t,e){this.updatePasswordCharacterOptionsStatuses(e,!1,!1,!1,!1);let r;for(let s=0;s<t.length;s++)r=t.charAt(s),this.updatePasswordCharacterOptionsStatuses(e,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(t,e,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=e)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iT{constructor(t,e,r,s){this.app=t,this.heartbeatServiceProvider=e,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Cl(this),this.idTokenSubscription=new Cl(this),this.beforeStateQueue=new eT(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ed,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=Ee(e)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Gn.create(this,t),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(e),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const e=await ai(this,{idToken:t}),r=await Yt._fromGetAccountInfoResponse(this,e,t);await this.directlySetCurrentUser(r)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var i;if(qt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const e=await this.assertedPersistence.getCurrentUser();let r=e,s=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(t);(!o||o===c)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=e,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return j(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await ci(t)}catch(e){if((e==null?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=Fy()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(qt(this.app))return Promise.reject(He(this));const e=t?it(t):null;return e&&j(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t,e=!1){if(!this._deleted)return t&&j(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),e||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return qt(this.app)?Promise.reject(He(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return qt(this.app)?Promise.reject(He(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ee(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const e=this._getPasswordPolicyInternal();return e.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):e.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await nT(this),e=new sT(t);this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new ss("auth","Firebase",t())}onAuthStateChanged(t,e,r){return this.registerStateListener(this.authStateSubscription,t,e,r)}beforeAuthStateChanged(t,e){return this.beforeStateQueue.pushCallback(t,e)}onIdTokenChanged(t,e,r){return this.registerStateListener(this.idTokenSubscription,t,e,r)}authStateReady(){return new Promise((t,e)=>{if(this.currentUser)t();else{const r=this.onAuthStateChanged(()=>{r(),t()},e)}})}async revokeAccessToken(t){if(this.currentUser){const e=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:e};this.tenantId!=null&&(r.tenantId=this.tenantId),await Yy(this,r)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)==null?void 0:t.toJSON()}}async _setRedirectUser(t,e){const r=await this.getOrInitRedirectPersistenceManager(e);return t===null?r.removeCurrentUser():r.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&Ee(t)||this._popupRedirectResolver;j(e,this,"argument-error"),this.redirectPersistenceManager=await Gn.create(this,[Ee(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var e,r;return this._isInitialized&&await this.queue(async()=>{}),((e=this._currentUser)==null?void 0:e._redirectEventId)===t?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=((e=this.currentUser)==null?void 0:e.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,r,s){if(this._deleted)return()=>{};const i=typeof e=="function"?e:e.next.bind(e);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(j(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof e=="function"){const u=t.addObserver(e,r,s);return()=>{o=!0,u()}}else{const u=t.addObserver(e);return()=>{o=!0,u()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return j(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=Md(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const e=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());e&&(t["X-Firebase-Client"]=e);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;if(qt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:e.getToken());return t!=null&&t.error&&Ly(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function cr(n){return it(n)}class Cl{constructor(t){this.auth=t,this.observer=null,this.addObserver=I_(e=>this.observer=e)}get next(){return j(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $a={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function oT(n){$a=n}function aT(n){return $a.loadJS(n)}function cT(){return $a.gapiScript}function uT(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lT(n,t){const e=Ni(n,"auth");if(e.isInitialized()){const s=e.getImmediate(),i=e.getOptions();if(Tn(i,t??{}))return s;pe(s,"already-initialized")}return e.initialize({options:t})}function hT(n,t){const e=(t==null?void 0:t.persistence)||[],r=(Array.isArray(e)?e:[e]).map(Ee);t!=null&&t.errorMap&&n._updateErrorMap(t.errorMap),n._initializeWithPersistence(r,t==null?void 0:t.popupRedirectResolver)}function dT(n,t,e){const r=cr(n);j(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=!1,i=Ld(t),{host:o,port:c}=fT(t),u=c===null?"":`:${c}`,h={url:`${i}//${o}${u}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){j(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),j(Tn(h,r.config.emulator)&&Tn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,nn(o)?(Va(`${i}//${o}${u}`),Da("Auth",!0)):pT()}function Ld(n){const t=n.indexOf(":");return t<0?"":n.substr(0,t+1)}function fT(n){const t=Ld(n),e=/(\/\/)?([^?#/]+)/.exec(n.substr(t.length));if(!e)return{host:"",port:null};const r=e[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Sl(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Sl(o)}}}function Sl(n){if(!n)return null;const t=Number(n);return isNaN(t)?null:t}function pT(){function n(){const t=document.createElement("p"),e=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",e.position="fixed",e.width="100%",e.backgroundColor="#ffffff",e.border=".1em solid #000000",e.color="#b50000",e.bottom="0px",e.left="0px",e.margin="0px",e.zIndex="10000",e.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xd{constructor(t,e){this.providerId=t,this.signInMethod=e}toJSON(){return Te("not implemented")}_getIdTokenResponse(t){return Te("not implemented")}_linkToIdToken(t,e){return Te("not implemented")}_getReauthenticationResolver(t){return Te("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jn(n,t){return qy(n,"POST","/v1/accounts:signInWithIdp",Fa(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gT="http://localhost";class wn extends xd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const e=new wn(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(e.idToken=t.idToken),t.accessToken&&(e.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(e.nonce=t.nonce),t.pendingToken&&(e.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(e.accessToken=t.oauthToken,e.secret=t.oauthTokenSecret):pe("argument-error"),e}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t,{providerId:r,signInMethod:s,...i}=e;if(!r||!s)return null;const o=new wn(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(t){const e=this.buildRequest();return Jn(t,e)}_linkToIdToken(t,e){const r=this.buildRequest();return r.idToken=e,Jn(t,r)}_getReauthenticationResolver(t){const e=this.buildRequest();return e.autoCreate=!1,Jn(t,e)}buildRequest(){const t={requestUri:gT,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const e={};this.idToken&&(e.id_token=this.idToken),this.accessToken&&(e.access_token=this.accessToken),this.secret&&(e.oauth_token_secret=this.secret),e.providerId=this.providerId,this.nonce&&!this.pendingToken&&(e.nonce=this.nonce),t.postBody=is(e)}return t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as extends Oi{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le extends as{constructor(){super("facebook.com")}static credential(t){return wn._fromParams({providerId:Le.PROVIDER_ID,signInMethod:Le.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Le.credentialFromTaggedObject(t)}static credentialFromError(t){return Le.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Le.credential(t.oauthAccessToken)}catch{return null}}}Le.FACEBOOK_SIGN_IN_METHOD="facebook.com";Le.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye extends as{constructor(){super("google.com"),this.addScope("profile")}static credential(t,e){return wn._fromParams({providerId:ye.PROVIDER_ID,signInMethod:ye.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:e})}static credentialFromResult(t){return ye.credentialFromTaggedObject(t)}static credentialFromError(t){return ye.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:e,oauthAccessToken:r}=t;if(!e&&!r)return null;try{return ye.credential(e,r)}catch{return null}}}ye.GOOGLE_SIGN_IN_METHOD="google.com";ye.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe extends as{constructor(){super("github.com")}static credential(t){return wn._fromParams({providerId:xe.PROVIDER_ID,signInMethod:xe.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return xe.credentialFromTaggedObject(t)}static credentialFromError(t){return xe.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return xe.credential(t.oauthAccessToken)}catch{return null}}}xe.GITHUB_SIGN_IN_METHOD="github.com";xe.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue extends as{constructor(){super("twitter.com")}static credential(t,e){return wn._fromParams({providerId:Ue.PROVIDER_ID,signInMethod:Ue.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:e})}static credentialFromResult(t){return Ue.credentialFromTaggedObject(t)}static credentialFromError(t){return Ue.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:e,oauthTokenSecret:r}=t;if(!e||!r)return null;try{return Ue.credential(e,r)}catch{return null}}}Ue.TWITTER_SIGN_IN_METHOD="twitter.com";Ue.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,e,r,s=!1){const i=await Yt._fromIdTokenResponse(t,r,s),o=Pl(r);return new Yn({user:i,providerId:o,_tokenResponse:r,operationType:e})}static async _forOperation(t,e,r){await t._updateTokensIfNecessary(r,!0);const s=Pl(r);return new Yn({user:t,providerId:s,_tokenResponse:r,operationType:e})}}function Pl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui extends me{constructor(t,e,r,s){super(e.code,e.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ui.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:e.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,e,r,s){return new ui(t,e,r,s)}}function Ud(n,t,e,r){return(t==="reauthenticate"?e._getReauthenticationResolver(n):e._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ui._fromErrorAndOperation(n,i,t,r):i})}async function mT(n,t,e=!1){const r=await zr(n,t._linkToIdToken(n.auth,await n.getIdToken()),e);return Yn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _T(n,t,e=!1){const{auth:r}=n;if(qt(r.app))return Promise.reject(He(r));const s="reauthenticate";try{const i=await zr(n,Ud(r,s,t,n),e);j(i.idToken,r,"internal-error");const o=Ba(i.idToken);j(o,r,"internal-error");const{sub:c}=o;return j(n.uid===c,r,"user-mismatch"),Yn._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&pe(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yT(n,t,e=!1){if(qt(n.app))return Promise.reject(He(n));const r="signIn",s=await Ud(n,r,t),i=await Yn._fromIdTokenResponse(n,r,s);return e||await n._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TT(n,t){return it(n).setPersistence(t)}function ET(n,t,e,r){return it(n).onIdTokenChanged(t,e,r)}function wT(n,t,e){return it(n).beforeAuthStateChanged(t,e)}function IT(n,t,e,r){return it(n).onAuthStateChanged(t,e,r)}function AT(n){return it(n).signOut()}const li="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{constructor(t,e){this.storageRetriever=t,this.type=e}_isAvailable(){try{return this.storage?(this.storage.setItem(li,"1"),this.storage.removeItem(li),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,e){return this.storage.setItem(t,JSON.stringify(e)),Promise.resolve()}_get(t){const e=this.storage.getItem(t);return Promise.resolve(e?JSON.parse(e):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bT=1e3,vT=10;class Bd extends Fd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,e)=>this.onStorageEvent(t,e),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Od(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const e of Object.keys(this.listeners)){const r=this.storage.getItem(e),s=this.localCache[e];r!==s&&t(e,s,r)}}onStorageEvent(t,e=!1){if(!t.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=t.key;e?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!e&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);tT()&&i!==t.newValue&&t.newValue!==t.oldValue?setTimeout(s,vT):s()}notifyListeners(t,e){this.localCache[t]=e;const r=this.listeners[t];if(r)for(const s of Array.from(r))s(e&&JSON.parse(e))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,e,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:e,newValue:r}),!0)})},bT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,e){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,e){await super._set(t,e),this.localCache[t]=JSON.stringify(e)}async _get(t){const e=await super._get(t);return this.localCache[t]=JSON.stringify(e),e}async _remove(t){await super._remove(t),delete this.localCache[t]}}Bd.type="LOCAL";const jd=Bd;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d extends Fd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,e){}_removeListener(t,e){}}$d.type="SESSION";const qa=$d;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RT(n){return Promise.all(n.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(e){return{fulfilled:!1,reason:e}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find(s=>s.isListeningto(t));if(e)return e;const r=new Mi(t);return this.receivers.push(r),r}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:r,eventType:s,data:i}=e.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;e.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async h=>h(e.origin,i)),u=await RT(c);e.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(t,e){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),(!e||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Mi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ha(n="",t=10){let e="";for(let r=0;r<t;r++)e+=Math.floor(Math.random()*10);return n+e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CT{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const h=Ha("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const m=p;if(m.data.eventId===h)switch(m.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(m.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:t,eventId:h,data:e},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function le(){return window}function ST(n){le().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qd(){return typeof le().WorkerGlobalScope<"u"&&typeof le().importScripts=="function"}async function PT(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function kT(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function VT(){return qd()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hd="firebaseLocalStorageDb",DT=1,hi="firebaseLocalStorage",zd="fbase_key";class cs{constructor(t){this.request=t}toPromise(){return new Promise((t,e)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{e(this.request.error)})})}}function Li(n,t){return n.transaction([hi],t?"readwrite":"readonly").objectStore(hi)}function NT(){const n=indexedDB.deleteDatabase(Hd);return new cs(n).toPromise()}function oa(){const n=indexedDB.open(Hd,DT);return new Promise((t,e)=>{n.addEventListener("error",()=>{e(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(hi,{keyPath:zd})}catch(s){e(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(hi)?t(r):(r.close(),await NT(),t(await oa()))})})}async function kl(n,t,e){const r=Li(n,!0).put({[zd]:t,value:e});return new cs(r).toPromise()}async function OT(n,t){const e=Li(n,!1).get(t),r=await new cs(e).toPromise();return r===void 0?null:r.value}function Vl(n,t){const e=Li(n,!0).delete(t);return new cs(e).toPromise()}const MT=800,LT=3;class Wd{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await oa(),this.db)}async _withRetries(t){let e=0;for(;;)try{const r=await this._openDb();return await t(r)}catch(r){if(e++>LT)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return qd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Mi._getInstance(VT()),this.receiver._subscribe("keyChanged",async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)})),this.receiver._subscribe("ping",async(t,e)=>["keyChanged"])}async initializeSender(){var e,r;if(this.activeServiceWorker=await PT(),!this.activeServiceWorker)return;this.sender=new CT(this.activeServiceWorker);const t=await this.sender._send("ping",{},800);t&&(e=t[0])!=null&&e.fulfilled&&(r=t[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||kT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await oa();return await kl(t,li,"1"),await Vl(t,li),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite(async()=>(await this._withRetries(r=>kl(r,t,e)),this.localCache[t]=e,this.notifyServiceWorker(t)))}async _get(t){const e=await this._withRetries(r=>OT(r,t));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(e=>Vl(e,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(s=>{const i=Li(s,!1).getAll();return new cs(i).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const e=[],r=new Set;if(t.length!==0)for(const{fbase_key:s,value:i}of t)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),e.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),e.push(s));return e}notifyListeners(t,e){this.localCache[t]=e;const r=this.listeners[t];if(r)for(const s of Array.from(r))s(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),MT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Wd.type="LOCAL";const Gd=Wd;new os(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function za(n,t){return t?Ee(t):(j(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wa extends xd{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return Jn(t,this._buildIdpRequest())}_linkToIdToken(t,e){return Jn(t,this._buildIdpRequest(e))}_getReauthenticationResolver(t){return Jn(t,this._buildIdpRequest())}_buildIdpRequest(t){const e={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(e.idToken=t),e}}function xT(n){return yT(n.auth,new Wa(n),n.bypassAuthState)}function UT(n){const{auth:t,user:e}=n;return j(e,t,"internal-error"),_T(e,new Wa(n),n.bypassAuthState)}async function FT(n){const{auth:t,user:e}=n;return j(e,t,"internal-error"),mT(e,new Wa(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd{constructor(t,e,r,s,i=!1){this.auth=t,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(e)?e:[e]}execute(){return new Promise(async(t,e)=>{this.pendingPromise={resolve:t,reject:e};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(t){const{urlResponse:e,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=t;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:e,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return xT;case"linkViaPopup":case"linkViaRedirect":return FT;case"reauthViaPopup":case"reauthViaRedirect":return UT;default:pe(this.auth,"internal-error")}}resolve(t){be(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){be(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BT=new os(2e3,1e4);async function jT(n,t,e){if(qt(n.app))return Promise.reject(Zt(n,"operation-not-supported-in-this-environment"));const r=cr(n);wd(n,t,Oi);const s=za(r,e);return new mn(r,"signInViaPopup",t,s).executeNotNull()}class mn extends Jd{constructor(t,e,r,s,i){super(t,e,s,i),this.provider=r,this.authWindow=null,this.pollId=null,mn.currentPopupAction&&mn.currentPopupAction.cancel(),mn.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return j(t,this.auth,"internal-error"),t}async onExecution(){be(this.filter.length===1,"Popup operations only handle one event");const t=Ha();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(Zt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)==null?void 0:t.associatedEvent)||null}cancel(){this.reject(Zt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,mn.currentPopupAction=null}pollUserCancellation(){const t=()=>{var e,r;if((r=(e=this.authWindow)==null?void 0:e.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Zt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,BT.get())};t()}}mn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $T="pendingRedirect",Ks=new Map;class qT extends Jd{constructor(t,e,r=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],e,void 0,r),this.eventId=null}async execute(){let t=Ks.get(this.auth._key());if(!t){try{const r=await HT(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(r)}catch(e){t=()=>Promise.reject(e)}Ks.set(this.auth._key(),t)}return this.bypassAuthState||Ks.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const e=await this.auth._redirectUserForId(t.eventId);if(e)return this.user=e,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function HT(n,t){const e=Qd(t),r=Kd(n);if(!await r._isAvailable())return!1;const s=await r._get(e)==="true";return await r._remove(e),s}async function zT(n,t){return Kd(n)._set(Qd(t),"true")}function WT(n,t){Ks.set(n._key(),t)}function Kd(n){return Ee(n._redirectPersistence)}function Qd(n){return Js($T,n.config.apiKey,n.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GT(n,t,e){return JT(n,t,e)}async function JT(n,t,e){if(qt(n.app))return Promise.reject(He(n));const r=cr(n);wd(n,t,Oi),await r._initializationPromise;const s=za(r,e);return await zT(s,r),s._openRedirect(r,t,"signInViaRedirect")}async function KT(n,t){return await cr(n)._initializationPromise,Xd(n,t,!1)}async function Xd(n,t,e=!1){if(qt(n.app))return Promise.reject(He(n));const r=cr(n),s=za(r,t),o=await new qT(r,s,e).execute();return o&&!e&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QT=600*1e3;class XT{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let e=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(t,r)&&(e=!0,this.sendToConsumer(t,r),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!YT(t)||(this.hasHandledPotentialRedirect=!0,e||(this.queuedRedirectEvent=t,e=!0)),e}sendToConsumer(t,e){var r;if(t.error&&!Yd(t)){const s=((r=t.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";e.onError(Zt(this.auth,s))}else e.onAuthEvent(t)}isEventForConsumer(t,e){const r=e.eventId===null||!!t.eventId&&t.eventId===e.eventId;return e.filter.includes(t.type)&&r}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=QT&&this.cachedEventUids.clear(),this.cachedEventUids.has(Dl(t))}saveEventToCache(t){this.cachedEventUids.add(Dl(t)),this.lastProcessedEventTime=Date.now()}}function Dl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(t=>t).join("-")}function Yd({type:n,error:t}){return n==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function YT(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Yd(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ZT(n,t={}){return ar(n,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,eE=/^https?/;async function nE(n){if(n.config.emulator)return;const{authorizedDomains:t}=await ZT(n);for(const e of t)try{if(rE(e))return}catch{}pe(n,"unauthorized-domain")}function rE(n){const t=sa(),{protocol:e,hostname:r}=new URL(t);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?e==="chrome-extension:"&&n.replace("chrome-extension://","")===t.replace("chrome-extension://",""):e==="chrome-extension:"&&o.hostname===r}if(!eE.test(e))return!1;if(tE.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sE=new os(3e4,6e4);function Nl(){const n=le().___jsl;if(n!=null&&n.H){for(const t of Object.keys(n.H))if(n.H[t].r=n.H[t].r||[],n.H[t].L=n.H[t].L||[],n.H[t].r=[...n.H[t].L],n.CP)for(let e=0;e<n.CP.length;e++)n.CP[e]=null}}function iE(n){return new Promise((t,e)=>{var s,i,o;function r(){Nl(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Nl(),e(Zt(n,"network-request-failed"))},timeout:sE.get()})}if((i=(s=le().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)t(gapi.iframes.getContext());else if((o=le().gapi)!=null&&o.load)r();else{const c=uT("iframefcb");return le()[c]=()=>{gapi.load?r():e(Zt(n,"network-request-failed"))},aT(`${cT()}?onload=${c}`).catch(u=>e(u))}}).catch(t=>{throw Qs=null,t})}let Qs=null;function oE(n){return Qs=Qs||iE(n),Qs}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aE=new os(5e3,15e3),cE="__/auth/iframe",uE="emulator/auth/iframe",lE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},hE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function dE(n){const t=n.config;j(t.authDomain,n,"auth-domain-config-required");const e=t.emulator?Ua(t,uE):`https://${n.config.authDomain}/${cE}`,r={apiKey:t.apiKey,appName:n.name,v:Rn},s=hE.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${e}?${is(r).slice(1)}`}async function fE(n){const t=await oE(n),e=le().gapi;return j(e,n,"internal-error"),t.open({where:document.body,url:dE(n),messageHandlersFilter:e.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:lE,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Zt(n,"network-request-failed"),c=le().setTimeout(()=>{i(o)},aE.get());function u(){le().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},gE=500,mE=600,_E="_blank",yE="http://localhost";class Ol{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function TE(n,t,e,r=gE,s=mE){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...pE,width:r.toString(),height:s.toString(),top:i,left:o},h=Dt().toLowerCase();e&&(c=Pd(h)?_E:e),Cd(h)&&(t=t||yE,u.scrollbars="yes");const f=Object.entries(u).reduce((m,[A,C])=>`${m}${A}=${C},`,"");if(Zy(h)&&c!=="_self")return EE(t||"",c),new Ol(null);const p=window.open(t||"",c,f);j(p,n,"popup-blocked");try{p.focus()}catch{}return new Ol(p)}function EE(n,t){const e=document.createElement("a");e.href=n,e.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),e.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wE="__/auth/handler",IE="emulator/auth/handler",AE=encodeURIComponent("fac");async function Ml(n,t,e,r,s,i){j(n.config.authDomain,n,"auth-domain-config-required"),j(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:e,redirectUrl:r,v:Rn,eventId:s};if(t instanceof Oi){t.setDefaultLanguage(n.languageCode),o.providerId=t.providerId||"",w_(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(t instanceof as){const f=t.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),h=u?`#${AE}=${encodeURIComponent(u)}`:"";return`${bE(n)}?${is(c).slice(1)}${h}`}function bE({config:n}){return n.emulator?Ua(n,IE):`https://${n.authDomain}/${wE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qo="webStorageSupport";class vE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=qa,this._completeRedirectFn=Xd,this._overrideRedirectResult=WT}async _openPopup(t,e,r,s){var o;be((o=this.eventManagers[t._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await Ml(t,e,r,sa(),s);return TE(t,i,Ha())}async _openRedirect(t,e,r,s){await this._originValidation(t);const i=await Ml(t,e,r,sa(),s);return ST(i),new Promise(()=>{})}_initialize(t){const e=t._key();if(this.eventManagers[e]){const{manager:s,promise:i}=this.eventManagers[e];return s?Promise.resolve(s):(be(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(t);return this.eventManagers[e]={promise:r},r.catch(()=>{delete this.eventManagers[e]}),r}async initAndGetManager(t){const e=await fE(t),r=new XT(t);return e.register("authEvent",s=>(j(s==null?void 0:s.authEvent,t,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:r},this.iframes[t._key()]=e,r}_isIframeWebStorageSupported(t,e){this.iframes[t._key()].send(qo,{type:qo},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[qo];i!==void 0&&e(!!i),pe(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=nE(t)),this.originValidationPromises[e]}get _shouldInitProactively(){return Od()||Sd()||ja()}}const RE=vE;var Ll="@firebase/auth",xl="1.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CE{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)==null?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged(r=>{t((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){j(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function PE(n){En(new Ke("auth",(t,{options:e})=>{const r=t.getProvider("app").getImmediate(),s=t.getProvider("heartbeat"),i=t.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;j(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Md(n)},h=new iT(r,s,i,u);return hT(h,e),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,r)=>{t.getProvider("auth-internal").initialize()})),En(new Ke("auth-internal",t=>{const e=cr(t.getProvider("auth").getImmediate());return(r=>new CE(r))(e)},"PRIVATE").setInstantiationMode("EXPLICIT")),ue(Ll,xl,SE(n)),ue(Ll,xl,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kE=300,VE=dd("authIdTokenMaxAge")||kE;let Ul=null;const DE=n=>async t=>{const e=t&&await t.getIdTokenResult(),r=e&&(new Date().getTime()-Date.parse(e.issuedAtTime))/1e3;if(r&&r>VE)return;const s=e==null?void 0:e.token;Ul!==s&&(Ul=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function NE(n=Ma()){const t=Ni(n,"auth");if(t.isInitialized())return t.getImmediate();const e=lT(n,{popupRedirectResolver:RE,persistence:[Gd,jd,qa]}),r=dd("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=DE(i.toString());wT(e,o,()=>o(e.currentUser)),ET(e,c=>o(c))}}const s=ud("auth");return s&&dT(e,`http://${s}`),e}function OE(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}oT({loadJS(n){return new Promise((t,e)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=t,r.onerror=s=>{const i=Zt("internal-error");i.customData=s,e(i)},r.type="text/javascript",r.charset="UTF-8",OE().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});PE("Browser");var Fl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ze,Zd;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(w,_){function T(){}T.prototype=_.prototype,w.F=_.prototype,w.prototype=new T,w.prototype.constructor=w,w.D=function(I,E,v){for(var y=Array(arguments.length-2),Ft=2;Ft<arguments.length;Ft++)y[Ft-2]=arguments[Ft];return _.prototype[E].apply(I,y)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,_,T){T||(T=0);const I=Array(16);if(typeof _=="string")for(var E=0;E<16;++E)I[E]=_.charCodeAt(T++)|_.charCodeAt(T++)<<8|_.charCodeAt(T++)<<16|_.charCodeAt(T++)<<24;else for(E=0;E<16;++E)I[E]=_[T++]|_[T++]<<8|_[T++]<<16|_[T++]<<24;_=w.g[0],T=w.g[1],E=w.g[2];let v=w.g[3],y;y=_+(v^T&(E^v))+I[0]+3614090360&4294967295,_=T+(y<<7&4294967295|y>>>25),y=v+(E^_&(T^E))+I[1]+3905402710&4294967295,v=_+(y<<12&4294967295|y>>>20),y=E+(T^v&(_^T))+I[2]+606105819&4294967295,E=v+(y<<17&4294967295|y>>>15),y=T+(_^E&(v^_))+I[3]+3250441966&4294967295,T=E+(y<<22&4294967295|y>>>10),y=_+(v^T&(E^v))+I[4]+4118548399&4294967295,_=T+(y<<7&4294967295|y>>>25),y=v+(E^_&(T^E))+I[5]+1200080426&4294967295,v=_+(y<<12&4294967295|y>>>20),y=E+(T^v&(_^T))+I[6]+2821735955&4294967295,E=v+(y<<17&4294967295|y>>>15),y=T+(_^E&(v^_))+I[7]+4249261313&4294967295,T=E+(y<<22&4294967295|y>>>10),y=_+(v^T&(E^v))+I[8]+1770035416&4294967295,_=T+(y<<7&4294967295|y>>>25),y=v+(E^_&(T^E))+I[9]+2336552879&4294967295,v=_+(y<<12&4294967295|y>>>20),y=E+(T^v&(_^T))+I[10]+4294925233&4294967295,E=v+(y<<17&4294967295|y>>>15),y=T+(_^E&(v^_))+I[11]+2304563134&4294967295,T=E+(y<<22&4294967295|y>>>10),y=_+(v^T&(E^v))+I[12]+1804603682&4294967295,_=T+(y<<7&4294967295|y>>>25),y=v+(E^_&(T^E))+I[13]+4254626195&4294967295,v=_+(y<<12&4294967295|y>>>20),y=E+(T^v&(_^T))+I[14]+2792965006&4294967295,E=v+(y<<17&4294967295|y>>>15),y=T+(_^E&(v^_))+I[15]+1236535329&4294967295,T=E+(y<<22&4294967295|y>>>10),y=_+(E^v&(T^E))+I[1]+4129170786&4294967295,_=T+(y<<5&4294967295|y>>>27),y=v+(T^E&(_^T))+I[6]+3225465664&4294967295,v=_+(y<<9&4294967295|y>>>23),y=E+(_^T&(v^_))+I[11]+643717713&4294967295,E=v+(y<<14&4294967295|y>>>18),y=T+(v^_&(E^v))+I[0]+3921069994&4294967295,T=E+(y<<20&4294967295|y>>>12),y=_+(E^v&(T^E))+I[5]+3593408605&4294967295,_=T+(y<<5&4294967295|y>>>27),y=v+(T^E&(_^T))+I[10]+38016083&4294967295,v=_+(y<<9&4294967295|y>>>23),y=E+(_^T&(v^_))+I[15]+3634488961&4294967295,E=v+(y<<14&4294967295|y>>>18),y=T+(v^_&(E^v))+I[4]+3889429448&4294967295,T=E+(y<<20&4294967295|y>>>12),y=_+(E^v&(T^E))+I[9]+568446438&4294967295,_=T+(y<<5&4294967295|y>>>27),y=v+(T^E&(_^T))+I[14]+3275163606&4294967295,v=_+(y<<9&4294967295|y>>>23),y=E+(_^T&(v^_))+I[3]+4107603335&4294967295,E=v+(y<<14&4294967295|y>>>18),y=T+(v^_&(E^v))+I[8]+1163531501&4294967295,T=E+(y<<20&4294967295|y>>>12),y=_+(E^v&(T^E))+I[13]+2850285829&4294967295,_=T+(y<<5&4294967295|y>>>27),y=v+(T^E&(_^T))+I[2]+4243563512&4294967295,v=_+(y<<9&4294967295|y>>>23),y=E+(_^T&(v^_))+I[7]+1735328473&4294967295,E=v+(y<<14&4294967295|y>>>18),y=T+(v^_&(E^v))+I[12]+2368359562&4294967295,T=E+(y<<20&4294967295|y>>>12),y=_+(T^E^v)+I[5]+4294588738&4294967295,_=T+(y<<4&4294967295|y>>>28),y=v+(_^T^E)+I[8]+2272392833&4294967295,v=_+(y<<11&4294967295|y>>>21),y=E+(v^_^T)+I[11]+1839030562&4294967295,E=v+(y<<16&4294967295|y>>>16),y=T+(E^v^_)+I[14]+4259657740&4294967295,T=E+(y<<23&4294967295|y>>>9),y=_+(T^E^v)+I[1]+2763975236&4294967295,_=T+(y<<4&4294967295|y>>>28),y=v+(_^T^E)+I[4]+1272893353&4294967295,v=_+(y<<11&4294967295|y>>>21),y=E+(v^_^T)+I[7]+4139469664&4294967295,E=v+(y<<16&4294967295|y>>>16),y=T+(E^v^_)+I[10]+3200236656&4294967295,T=E+(y<<23&4294967295|y>>>9),y=_+(T^E^v)+I[13]+681279174&4294967295,_=T+(y<<4&4294967295|y>>>28),y=v+(_^T^E)+I[0]+3936430074&4294967295,v=_+(y<<11&4294967295|y>>>21),y=E+(v^_^T)+I[3]+3572445317&4294967295,E=v+(y<<16&4294967295|y>>>16),y=T+(E^v^_)+I[6]+76029189&4294967295,T=E+(y<<23&4294967295|y>>>9),y=_+(T^E^v)+I[9]+3654602809&4294967295,_=T+(y<<4&4294967295|y>>>28),y=v+(_^T^E)+I[12]+3873151461&4294967295,v=_+(y<<11&4294967295|y>>>21),y=E+(v^_^T)+I[15]+530742520&4294967295,E=v+(y<<16&4294967295|y>>>16),y=T+(E^v^_)+I[2]+3299628645&4294967295,T=E+(y<<23&4294967295|y>>>9),y=_+(E^(T|~v))+I[0]+4096336452&4294967295,_=T+(y<<6&4294967295|y>>>26),y=v+(T^(_|~E))+I[7]+1126891415&4294967295,v=_+(y<<10&4294967295|y>>>22),y=E+(_^(v|~T))+I[14]+2878612391&4294967295,E=v+(y<<15&4294967295|y>>>17),y=T+(v^(E|~_))+I[5]+4237533241&4294967295,T=E+(y<<21&4294967295|y>>>11),y=_+(E^(T|~v))+I[12]+1700485571&4294967295,_=T+(y<<6&4294967295|y>>>26),y=v+(T^(_|~E))+I[3]+2399980690&4294967295,v=_+(y<<10&4294967295|y>>>22),y=E+(_^(v|~T))+I[10]+4293915773&4294967295,E=v+(y<<15&4294967295|y>>>17),y=T+(v^(E|~_))+I[1]+2240044497&4294967295,T=E+(y<<21&4294967295|y>>>11),y=_+(E^(T|~v))+I[8]+1873313359&4294967295,_=T+(y<<6&4294967295|y>>>26),y=v+(T^(_|~E))+I[15]+4264355552&4294967295,v=_+(y<<10&4294967295|y>>>22),y=E+(_^(v|~T))+I[6]+2734768916&4294967295,E=v+(y<<15&4294967295|y>>>17),y=T+(v^(E|~_))+I[13]+1309151649&4294967295,T=E+(y<<21&4294967295|y>>>11),y=_+(E^(T|~v))+I[4]+4149444226&4294967295,_=T+(y<<6&4294967295|y>>>26),y=v+(T^(_|~E))+I[11]+3174756917&4294967295,v=_+(y<<10&4294967295|y>>>22),y=E+(_^(v|~T))+I[2]+718787259&4294967295,E=v+(y<<15&4294967295|y>>>17),y=T+(v^(E|~_))+I[9]+3951481745&4294967295,w.g[0]=w.g[0]+_&4294967295,w.g[1]=w.g[1]+(E+(y<<21&4294967295|y>>>11))&4294967295,w.g[2]=w.g[2]+E&4294967295,w.g[3]=w.g[3]+v&4294967295}r.prototype.v=function(w,_){_===void 0&&(_=w.length);const T=_-this.blockSize,I=this.C;let E=this.h,v=0;for(;v<_;){if(E==0)for(;v<=T;)s(this,w,v),v+=this.blockSize;if(typeof w=="string"){for(;v<_;)if(I[E++]=w.charCodeAt(v++),E==this.blockSize){s(this,I),E=0;break}}else for(;v<_;)if(I[E++]=w[v++],E==this.blockSize){s(this,I),E=0;break}}this.h=E,this.o+=_},r.prototype.A=function(){var w=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);w[0]=128;for(var _=1;_<w.length-8;++_)w[_]=0;_=this.o*8;for(var T=w.length-8;T<w.length;++T)w[T]=_&255,_/=256;for(this.v(w),w=Array(16),_=0,T=0;T<4;++T)for(let I=0;I<32;I+=8)w[_++]=this.g[T]>>>I&255;return w};function i(w,_){var T=c;return Object.prototype.hasOwnProperty.call(T,w)?T[w]:T[w]=_(w)}function o(w,_){this.h=_;const T=[];let I=!0;for(let E=w.length-1;E>=0;E--){const v=w[E]|0;I&&v==_||(T[E]=v,I=!1)}this.g=T}var c={};function u(w){return-128<=w&&w<128?i(w,function(_){return new o([_|0],_<0?-1:0)}):new o([w|0],w<0?-1:0)}function h(w){if(isNaN(w)||!isFinite(w))return p;if(w<0)return V(h(-w));const _=[];let T=1;for(let I=0;w>=T;I++)_[I]=w/T|0,T*=4294967296;return new o(_,0)}function f(w,_){if(w.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(w.charAt(0)=="-")return V(f(w.substring(1),_));if(w.indexOf("-")>=0)throw Error('number format error: interior "-" character');const T=h(Math.pow(_,8));let I=p;for(let v=0;v<w.length;v+=8){var E=Math.min(8,w.length-v);const y=parseInt(w.substring(v,v+E),_);E<8?(E=h(Math.pow(_,E)),I=I.j(E).add(h(y))):(I=I.j(T),I=I.add(h(y)))}return I}var p=u(0),m=u(1),A=u(16777216);n=o.prototype,n.m=function(){if(k(this))return-V(this).m();let w=0,_=1;for(let T=0;T<this.g.length;T++){const I=this.i(T);w+=(I>=0?I:4294967296+I)*_,_*=4294967296}return w},n.toString=function(w){if(w=w||10,w<2||36<w)throw Error("radix out of range: "+w);if(C(this))return"0";if(k(this))return"-"+V(this).toString(w);const _=h(Math.pow(w,6));var T=this;let I="";for(;;){const E=J(T,_).g;T=B(T,E.j(_));let v=((T.g.length>0?T.g[0]:T.h)>>>0).toString(w);if(T=E,C(T))return v+I;for(;v.length<6;)v="0"+v;I=v+I}},n.i=function(w){return w<0?0:w<this.g.length?this.g[w]:this.h};function C(w){if(w.h!=0)return!1;for(let _=0;_<w.g.length;_++)if(w.g[_]!=0)return!1;return!0}function k(w){return w.h==-1}n.l=function(w){return w=B(this,w),k(w)?-1:C(w)?0:1};function V(w){const _=w.g.length,T=[];for(let I=0;I<_;I++)T[I]=~w.g[I];return new o(T,~w.h).add(m)}n.abs=function(){return k(this)?V(this):this},n.add=function(w){const _=Math.max(this.g.length,w.g.length),T=[];let I=0;for(let E=0;E<=_;E++){let v=I+(this.i(E)&65535)+(w.i(E)&65535),y=(v>>>16)+(this.i(E)>>>16)+(w.i(E)>>>16);I=y>>>16,v&=65535,y&=65535,T[E]=y<<16|v}return new o(T,T[T.length-1]&-2147483648?-1:0)};function B(w,_){return w.add(V(_))}n.j=function(w){if(C(this)||C(w))return p;if(k(this))return k(w)?V(this).j(V(w)):V(V(this).j(w));if(k(w))return V(this.j(V(w)));if(this.l(A)<0&&w.l(A)<0)return h(this.m()*w.m());const _=this.g.length+w.g.length,T=[];for(var I=0;I<2*_;I++)T[I]=0;for(I=0;I<this.g.length;I++)for(let E=0;E<w.g.length;E++){const v=this.i(I)>>>16,y=this.i(I)&65535,Ft=w.i(E)>>>16,un=w.i(E)&65535;T[2*I+2*E]+=y*un,U(T,2*I+2*E),T[2*I+2*E+1]+=v*un,U(T,2*I+2*E+1),T[2*I+2*E+1]+=y*Ft,U(T,2*I+2*E+1),T[2*I+2*E+2]+=v*Ft,U(T,2*I+2*E+2)}for(w=0;w<_;w++)T[w]=T[2*w+1]<<16|T[2*w];for(w=_;w<2*_;w++)T[w]=0;return new o(T,0)};function U(w,_){for(;(w[_]&65535)!=w[_];)w[_+1]+=w[_]>>>16,w[_]&=65535,_++}function q(w,_){this.g=w,this.h=_}function J(w,_){if(C(_))throw Error("division by zero");if(C(w))return new q(p,p);if(k(w))return _=J(V(w),_),new q(V(_.g),V(_.h));if(k(_))return _=J(w,V(_)),new q(V(_.g),_.h);if(w.g.length>30){if(k(w)||k(_))throw Error("slowDivide_ only works with positive integers.");for(var T=m,I=_;I.l(w)<=0;)T=wt(T),I=wt(I);var E=ct(T,1),v=ct(I,1);for(I=ct(I,2),T=ct(T,2);!C(I);){var y=v.add(I);y.l(w)<=0&&(E=E.add(T),v=y),I=ct(I,1),T=ct(T,1)}return _=B(w,E.j(_)),new q(E,_)}for(E=p;w.l(_)>=0;){for(T=Math.max(1,Math.floor(w.m()/_.m())),I=Math.ceil(Math.log(T)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),v=h(T),y=v.j(_);k(y)||y.l(w)>0;)T-=I,v=h(T),y=v.j(_);C(v)&&(v=m),E=E.add(v),w=B(w,y)}return new q(E,w)}n.B=function(w){return J(this,w).h},n.and=function(w){const _=Math.max(this.g.length,w.g.length),T=[];for(let I=0;I<_;I++)T[I]=this.i(I)&w.i(I);return new o(T,this.h&w.h)},n.or=function(w){const _=Math.max(this.g.length,w.g.length),T=[];for(let I=0;I<_;I++)T[I]=this.i(I)|w.i(I);return new o(T,this.h|w.h)},n.xor=function(w){const _=Math.max(this.g.length,w.g.length),T=[];for(let I=0;I<_;I++)T[I]=this.i(I)^w.i(I);return new o(T,this.h^w.h)};function wt(w){const _=w.g.length+1,T=[];for(let I=0;I<_;I++)T[I]=w.i(I)<<1|w.i(I-1)>>>31;return new o(T,w.h)}function ct(w,_){const T=_>>5;_%=32;const I=w.g.length-T,E=[];for(let v=0;v<I;v++)E[v]=_>0?w.i(v+T)>>>_|w.i(v+T+1)<<32-_:w.i(v+T);return new o(E,w.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Zd=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,ze=o}).apply(typeof Fl<"u"?Fl:typeof self<"u"?self:typeof window<"u"?window:{});var Bs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var tf,Vr,ef,Xs,aa,nf,rf,sf;(function(){var n,t=Object.defineProperty;function e(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Bs=="object"&&Bs];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=e(this);function s(a,l){if(l)t:{var d=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var b=a[g];if(!(b in d))break t;d=d[b]}a=a[a.length-1],g=d[a],l=l(g),l!=g&&l!=null&&t(d,a,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(l){var d=[],g;for(g in l)Object.prototype.hasOwnProperty.call(l,g)&&d.push([g,l[g]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function u(a,l,d){return a.call.apply(a.bind,arguments)}function h(a,l,d){return h=u,h.apply(null,arguments)}function f(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var g=d.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function p(a,l){function d(){}d.prototype=l.prototype,a.Z=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(g,b,R){for(var D=Array(arguments.length-2),H=2;H<arguments.length;H++)D[H-2]=arguments[H];return l.prototype[b].apply(g,D)}}var m=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function A(a){const l=a.length;if(l>0){const d=Array(l);for(let g=0;g<l;g++)d[g]=a[g];return d}return[]}function C(a,l){for(let g=1;g<arguments.length;g++){const b=arguments[g];var d=typeof b;if(d=d!="object"?d:b?Array.isArray(b)?"array":d:"null",d=="array"||d=="object"&&typeof b.length=="number"){d=a.length||0;const R=b.length||0;a.length=d+R;for(let D=0;D<R;D++)a[d+D]=b[D]}else a.push(b)}}class k{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function V(a){o.setTimeout(()=>{throw a},0)}function B(){var a=w;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class U{constructor(){this.h=this.g=null}add(l,d){const g=q.get();g.set(l,d),this.h?this.h.next=g:this.g=g,this.h=g}}var q=new k(()=>new J,a=>a.reset());class J{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let wt,ct=!1,w=new U,_=()=>{const a=Promise.resolve(void 0);wt=()=>{a.then(T)}};function T(){for(var a;a=B();){try{a.h.call(a.g)}catch(d){V(d)}var l=q;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}ct=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var v=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,l),o.removeEventListener("test",d,l)}catch{}return a})();function y(a){return/^[\s\xa0]*$/.test(a)}function Ft(a,l){E.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}p(Ft,E),Ft.prototype.init=function(a,l){const d=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&Ft.Z.h.call(this)},Ft.prototype.h=function(){Ft.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var un="closure_listenable_"+(Math.random()*1e6|0),ym=0;function Tm(a,l,d,g,b){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!g,this.ha=b,this.key=++ym,this.da=this.fa=!1}function bs(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function vs(a,l,d){for(const g in a)l.call(d,a[g],g,a)}function Em(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function lu(a){const l={};for(const d in a)l[d]=a[d];return l}const hu="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function du(a,l){let d,g;for(let b=1;b<arguments.length;b++){g=arguments[b];for(d in g)a[d]=g[d];for(let R=0;R<hu.length;R++)d=hu[R],Object.prototype.hasOwnProperty.call(g,d)&&(a[d]=g[d])}}function Rs(a){this.src=a,this.g={},this.h=0}Rs.prototype.add=function(a,l,d,g,b){const R=a.toString();a=this.g[R],a||(a=this.g[R]=[],this.h++);const D=po(a,l,g,b);return D>-1?(l=a[D],d||(l.fa=!1)):(l=new Tm(l,this.src,R,!!g,b),l.fa=d,a.push(l)),l};function fo(a,l){const d=l.type;if(d in a.g){var g=a.g[d],b=Array.prototype.indexOf.call(g,l,void 0),R;(R=b>=0)&&Array.prototype.splice.call(g,b,1),R&&(bs(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function po(a,l,d,g){for(let b=0;b<a.length;++b){const R=a[b];if(!R.da&&R.listener==l&&R.capture==!!d&&R.ha==g)return b}return-1}var go="closure_lm_"+(Math.random()*1e6|0),mo={};function fu(a,l,d,g,b){if(Array.isArray(l)){for(let R=0;R<l.length;R++)fu(a,l[R],d,g,b);return null}return d=mu(d),a&&a[un]?a.J(l,d,c(g)?!!g.capture:!1,b):wm(a,l,d,!1,g,b)}function wm(a,l,d,g,b,R){if(!l)throw Error("Invalid event type");const D=c(b)?!!b.capture:!!b;let H=yo(a);if(H||(a[go]=H=new Rs(a)),d=H.add(l,d,g,D,R),d.proxy)return d;if(g=Im(),d.proxy=g,g.src=a,g.listener=d,a.addEventListener)v||(b=D),b===void 0&&(b=!1),a.addEventListener(l.toString(),g,b);else if(a.attachEvent)a.attachEvent(gu(l.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Im(){function a(d){return l.call(a.src,a.listener,d)}const l=Am;return a}function pu(a,l,d,g,b){if(Array.isArray(l))for(var R=0;R<l.length;R++)pu(a,l[R],d,g,b);else g=c(g)?!!g.capture:!!g,d=mu(d),a&&a[un]?(a=a.i,R=String(l).toString(),R in a.g&&(l=a.g[R],d=po(l,d,g,b),d>-1&&(bs(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete a.g[R],a.h--)))):a&&(a=yo(a))&&(l=a.g[l.toString()],a=-1,l&&(a=po(l,d,g,b)),(d=a>-1?l[a]:null)&&_o(d))}function _o(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[un])fo(l.i,a);else{var d=a.type,g=a.proxy;l.removeEventListener?l.removeEventListener(d,g,a.capture):l.detachEvent?l.detachEvent(gu(d),g):l.addListener&&l.removeListener&&l.removeListener(g),(d=yo(l))?(fo(d,a),d.h==0&&(d.src=null,l[go]=null)):bs(a)}}}function gu(a){return a in mo?mo[a]:mo[a]="on"+a}function Am(a,l){if(a.da)a=!0;else{l=new Ft(l,this);const d=a.listener,g=a.ha||a.src;a.fa&&_o(a),a=d.call(g,l)}return a}function yo(a){return a=a[go],a instanceof Rs?a:null}var To="__closure_events_fn_"+(Math.random()*1e9>>>0);function mu(a){return typeof a=="function"?a:(a[To]||(a[To]=function(l){return a.handleEvent(l)}),a[To])}function Pt(){I.call(this),this.i=new Rs(this),this.M=this,this.G=null}p(Pt,I),Pt.prototype[un]=!0,Pt.prototype.removeEventListener=function(a,l,d,g){pu(this,a,l,d,g)};function Ot(a,l){var d,g=a.G;if(g)for(d=[];g;g=g.G)d.push(g);if(a=a.M,g=l.type||l,typeof l=="string")l=new E(l,a);else if(l instanceof E)l.target=l.target||a;else{var b=l;l=new E(g,a),du(l,b)}b=!0;let R,D;if(d)for(D=d.length-1;D>=0;D--)R=l.g=d[D],b=Cs(R,g,!0,l)&&b;if(R=l.g=a,b=Cs(R,g,!0,l)&&b,b=Cs(R,g,!1,l)&&b,d)for(D=0;D<d.length;D++)R=l.g=d[D],b=Cs(R,g,!1,l)&&b}Pt.prototype.N=function(){if(Pt.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const d=a.g[l];for(let g=0;g<d.length;g++)bs(d[g]);delete a.g[l],a.h--}}this.G=null},Pt.prototype.J=function(a,l,d,g){return this.i.add(String(a),l,!1,d,g)},Pt.prototype.K=function(a,l,d,g){return this.i.add(String(a),l,!0,d,g)};function Cs(a,l,d,g){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let b=!0;for(let R=0;R<l.length;++R){const D=l[R];if(D&&!D.da&&D.capture==d){const H=D.listener,Tt=D.ha||D.src;D.fa&&fo(a.i,D),b=H.call(Tt,g)!==!1&&b}}return b&&!g.defaultPrevented}function bm(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function _u(a){a.g=bm(()=>{a.g=null,a.i&&(a.i=!1,_u(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class vm extends I{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:_u(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function pr(a){I.call(this),this.h=a,this.g={}}p(pr,I);var yu=[];function Tu(a){vs(a.g,function(l,d){this.g.hasOwnProperty(d)&&_o(l)},a),a.g={}}pr.prototype.N=function(){pr.Z.N.call(this),Tu(this)},pr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Eo=o.JSON.stringify,Rm=o.JSON.parse,Cm=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Eu(){}function wu(){}var gr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function wo(){E.call(this,"d")}p(wo,E);function Io(){E.call(this,"c")}p(Io,E);var ln={},Iu=null;function Ss(){return Iu=Iu||new Pt}ln.Ia="serverreachability";function Au(a){E.call(this,ln.Ia,a)}p(Au,E);function mr(a){const l=Ss();Ot(l,new Au(l))}ln.STAT_EVENT="statevent";function bu(a,l){E.call(this,ln.STAT_EVENT,a),this.stat=l}p(bu,E);function Mt(a){const l=Ss();Ot(l,new bu(l,a))}ln.Ja="timingevent";function vu(a,l){E.call(this,ln.Ja,a),this.size=l}p(vu,E);function _r(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function yr(){this.g=!0}yr.prototype.ua=function(){this.g=!1};function Sm(a,l,d,g,b,R){a.info(function(){if(a.g)if(R){var D="",H=R.split("&");for(let tt=0;tt<H.length;tt++){var Tt=H[tt].split("=");if(Tt.length>1){const It=Tt[0];Tt=Tt[1];const oe=It.split("_");D=oe.length>=2&&oe[1]=="type"?D+(It+"="+Tt+"&"):D+(It+"=redacted&")}}}else D=null;else D=R;return"XMLHTTP REQ ("+g+") [attempt "+b+"]: "+l+`
`+d+`
`+D})}function Pm(a,l,d,g,b,R,D){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+b+"]: "+l+`
`+d+`
`+R+" "+D})}function On(a,l,d,g){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Vm(a,d)+(g?" "+g:"")})}function km(a,l){a.info(function(){return"TIMEOUT: "+l})}yr.prototype.info=function(){};function Vm(a,l){if(!a.g)return l;if(!l)return null;try{const R=JSON.parse(l);if(R){for(a=0;a<R.length;a++)if(Array.isArray(R[a])){var d=R[a];if(!(d.length<2)){var g=d[1];if(Array.isArray(g)&&!(g.length<1)){var b=g[0];if(b!="noop"&&b!="stop"&&b!="close")for(let D=1;D<g.length;D++)g[D]=""}}}}return Eo(R)}catch{return l}}var Ps={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ru={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Cu;function Ao(){}p(Ao,Eu),Ao.prototype.g=function(){return new XMLHttpRequest},Cu=new Ao;function Tr(a){return encodeURIComponent(String(a))}function Dm(a){var l=1;a=a.split(":");const d=[];for(;l>0&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function Pe(a,l,d,g){this.j=a,this.i=l,this.l=d,this.S=g||1,this.V=new pr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Su}function Su(){this.i=null,this.g="",this.h=!1}var Pu={},bo={};function vo(a,l,d){a.M=1,a.A=Vs(ie(l)),a.u=d,a.R=!0,ku(a,null)}function ku(a,l){a.F=Date.now(),ks(a),a.B=ie(a.A);var d=a.B,g=a.S;Array.isArray(g)||(g=[String(g)]),qu(d.i,"t",g),a.C=0,d=a.j.L,a.h=new Su,a.g=al(a.j,d?l:null,!a.u),a.P>0&&(a.O=new vm(h(a.Y,a,a.g),a.P)),l=a.V,d=a.g,g=a.ba;var b="readystatechange";Array.isArray(b)||(b&&(yu[0]=b.toString()),b=yu);for(let R=0;R<b.length;R++){const D=fu(d,b[R],g||l.handleEvent,!1,l.h||l);if(!D)break;l.g[D.key]=D}l=a.J?lu(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),mr(),Sm(a.i,a.v,a.B,a.l,a.S,a.u)}Pe.prototype.ba=function(a){a=a.target;const l=this.O;l&&De(a)==3?l.j():this.Y(a)},Pe.prototype.Y=function(a){try{if(a==this.g)t:{const H=De(this.g),Tt=this.g.ya(),tt=this.g.ca();if(!(H<3)&&(H!=3||this.g&&(this.h.h||this.g.la()||Qu(this.g)))){this.K||H!=4||Tt==7||(Tt==8||tt<=0?mr(3):mr(2)),Ro(this);var l=this.g.ca();this.X=l;var d=Nm(this);if(this.o=l==200,Pm(this.i,this.v,this.B,this.l,this.S,H,l),this.o){if(this.U&&!this.L){e:{if(this.g){var g,b=this.g;if((g=b.g?b.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(g)){var R=g;break e}}R=null}if(a=R)On(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Co(this,a);else{this.o=!1,this.m=3,Mt(12),hn(this),Er(this);break t}}if(this.R){a=!0;let It;for(;!this.K&&this.C<d.length;)if(It=Om(this,d),It==bo){H==4&&(this.m=4,Mt(14),a=!1),On(this.i,this.l,null,"[Incomplete Response]");break}else if(It==Pu){this.m=4,Mt(15),On(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else On(this.i,this.l,It,null),Co(this,It);if(Vu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),H!=4||d.length!=0||this.h.h||(this.m=1,Mt(16),a=!1),this.o=this.o&&a,!a)On(this.i,this.l,d,"[Invalid Chunked Response]"),hn(this),Er(this);else if(d.length>0&&!this.W){this.W=!0;var D=this.j;D.g==this&&D.aa&&!D.P&&(D.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Mo(D),D.P=!0,Mt(11))}}else On(this.i,this.l,d,null),Co(this,d);H==4&&hn(this),this.o&&!this.K&&(H==4?rl(this.j,this):(this.o=!1,ks(this)))}else Jm(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,Mt(12)):(this.m=0,Mt(13)),hn(this),Er(this)}}}catch{}finally{}};function Nm(a){if(!Vu(a))return a.g.la();const l=Qu(a.g);if(l==="")return"";let d="";const g=l.length,b=De(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return hn(a),Er(a),"";a.h.i=new o.TextDecoder}for(let R=0;R<g;R++)a.h.h=!0,d+=a.h.i.decode(l[R],{stream:!(b&&R==g-1)});return l.length=0,a.h.g+=d,a.C=0,a.h.g}function Vu(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Om(a,l){var d=a.C,g=l.indexOf(`
`,d);return g==-1?bo:(d=Number(l.substring(d,g)),isNaN(d)?Pu:(g+=1,g+d>l.length?bo:(l=l.slice(g,g+d),a.C=g+d,l)))}Pe.prototype.cancel=function(){this.K=!0,hn(this)};function ks(a){a.T=Date.now()+a.H,Du(a,a.H)}function Du(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=_r(h(a.aa,a),l)}function Ro(a){a.D&&(o.clearTimeout(a.D),a.D=null)}Pe.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(km(this.i,this.B),this.M!=2&&(mr(),Mt(17)),hn(this),this.m=2,Er(this)):Du(this,this.T-a)};function Er(a){a.j.I==0||a.K||rl(a.j,a)}function hn(a){Ro(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,Tu(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function Co(a,l){try{var d=a.j;if(d.I!=0&&(d.g==a||So(d.h,a))){if(!a.L&&So(d.h,a)&&d.I==3){try{var g=d.Ba.g.parse(l)}catch{g=null}if(Array.isArray(g)&&g.length==3){var b=g;if(b[0]==0){t:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)Ls(d),Os(d);else break t;Oo(d),Mt(18)}}else d.xa=b[1],0<d.xa-d.K&&b[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=_r(h(d.Va,d),6e3));Mu(d.h)<=1&&d.ta&&(d.ta=void 0)}else fn(d,11)}else if((a.L||d.g==a)&&Ls(d),!y(l))for(b=d.Ba.g.parse(l),l=0;l<b.length;l++){let tt=b[l];const It=tt[0];if(!(It<=d.K))if(d.K=It,tt=tt[1],d.I==2)if(tt[0]=="c"){d.M=tt[1],d.ba=tt[2];const oe=tt[3];oe!=null&&(d.ka=oe,d.j.info("VER="+d.ka));const pn=tt[4];pn!=null&&(d.za=pn,d.j.info("SVER="+d.za));const Ne=tt[5];Ne!=null&&typeof Ne=="number"&&Ne>0&&(g=1.5*Ne,d.O=g,d.j.info("backChannelRequestTimeoutMs_="+g)),g=d;const Oe=a.g;if(Oe){const Us=Oe.g?Oe.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Us){var R=g.h;R.g||Us.indexOf("spdy")==-1&&Us.indexOf("quic")==-1&&Us.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Po(R,R.h),R.h=null))}if(g.G){const Lo=Oe.g?Oe.g.getResponseHeader("X-HTTP-Session-Id"):null;Lo&&(g.wa=Lo,nt(g.J,g.G,Lo))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),g=d;var D=a;if(g.na=ol(g,g.L?g.ba:null,g.W),D.L){Lu(g.h,D);var H=D,Tt=g.O;Tt&&(H.H=Tt),H.D&&(Ro(H),ks(H)),g.g=D}else el(g);d.i.length>0&&Ms(d)}else tt[0]!="stop"&&tt[0]!="close"||fn(d,7);else d.I==3&&(tt[0]=="stop"||tt[0]=="close"?tt[0]=="stop"?fn(d,7):No(d):tt[0]!="noop"&&d.l&&d.l.qa(tt),d.A=0)}}mr(4)}catch{}}var Mm=class{constructor(a,l){this.g=a,this.map=l}};function Nu(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Ou(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Mu(a){return a.h?1:a.g?a.g.size:0}function So(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function Po(a,l){a.g?a.g.add(l):a.h=l}function Lu(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}Nu.prototype.cancel=function(){if(this.i=xu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function xu(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.G);return l}return A(a.i)}var Uu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Lm(a,l){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const g=a[d].indexOf("=");let b,R=null;g>=0?(b=a[d].substring(0,g),R=a[d].substring(g+1)):b=a[d],l(b,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function ke(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof ke?(this.l=a.l,wr(this,a.j),this.o=a.o,this.g=a.g,Ir(this,a.u),this.h=a.h,ko(this,Hu(a.i)),this.m=a.m):a&&(l=String(a).match(Uu))?(this.l=!1,wr(this,l[1]||"",!0),this.o=Ar(l[2]||""),this.g=Ar(l[3]||"",!0),Ir(this,l[4]),this.h=Ar(l[5]||"",!0),ko(this,l[6]||"",!0),this.m=Ar(l[7]||"")):(this.l=!1,this.i=new vr(null,this.l))}ke.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(br(l,Fu,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(br(l,Fu,!0),"@"),a.push(Tr(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(br(d,d.charAt(0)=="/"?Fm:Um,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",br(d,jm)),a.join("")},ke.prototype.resolve=function(a){const l=ie(this);let d=!!a.j;d?wr(l,a.j):d=!!a.o,d?l.o=a.o:d=!!a.g,d?l.g=a.g:d=a.u!=null;var g=a.h;if(d)Ir(l,a.u);else if(d=!!a.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var b=l.h.lastIndexOf("/");b!=-1&&(g=l.h.slice(0,b+1)+g)}if(b=g,b==".."||b==".")g="";else if(b.indexOf("./")!=-1||b.indexOf("/.")!=-1){g=b.lastIndexOf("/",0)==0,b=b.split("/");const R=[];for(let D=0;D<b.length;){const H=b[D++];H=="."?g&&D==b.length&&R.push(""):H==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),g&&D==b.length&&R.push("")):(R.push(H),g=!0)}g=R.join("/")}else g=b}return d?l.h=g:d=a.i.toString()!=="",d?ko(l,Hu(a.i)):d=!!a.m,d&&(l.m=a.m),l};function ie(a){return new ke(a)}function wr(a,l,d){a.j=d?Ar(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function Ir(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function ko(a,l,d){l instanceof vr?(a.i=l,$m(a.i,a.l)):(d||(l=br(l,Bm)),a.i=new vr(l,a.l))}function nt(a,l,d){a.i.set(l,d)}function Vs(a){return nt(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Ar(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function br(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,xm),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function xm(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Fu=/[#\/\?@]/g,Um=/[#\?:]/g,Fm=/[#\?]/g,Bm=/[#\?@]/g,jm=/#/g;function vr(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function dn(a){a.g||(a.g=new Map,a.h=0,a.i&&Lm(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}n=vr.prototype,n.add=function(a,l){dn(this),this.i=null,a=Mn(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function Bu(a,l){dn(a),l=Mn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function ju(a,l){return dn(a),l=Mn(a,l),a.g.has(l)}n.forEach=function(a,l){dn(this),this.g.forEach(function(d,g){d.forEach(function(b){a.call(l,b,g,this)},this)},this)};function $u(a,l){dn(a);let d=[];if(typeof l=="string")ju(a,l)&&(d=d.concat(a.g.get(Mn(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)d=d.concat(a[l]);return d}n.set=function(a,l){return dn(this),this.i=null,a=Mn(this,a),ju(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},n.get=function(a,l){return a?(a=$u(this,a),a.length>0?String(a[0]):l):l};function qu(a,l,d){Bu(a,l),d.length>0&&(a.i=null,a.g.set(Mn(a,l),A(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let g=0;g<l.length;g++){var d=l[g];const b=Tr(d);d=$u(this,d);for(let R=0;R<d.length;R++){let D=b;d[R]!==""&&(D+="="+Tr(d[R])),a.push(D)}}return this.i=a.join("&")};function Hu(a){const l=new vr;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function Mn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function $m(a,l){l&&!a.j&&(dn(a),a.i=null,a.g.forEach(function(d,g){const b=g.toLowerCase();g!=b&&(Bu(this,g),qu(this,b,d))},a)),a.j=l}function qm(a,l){const d=new yr;if(o.Image){const g=new Image;g.onload=f(Ve,d,"TestLoadImage: loaded",!0,l,g),g.onerror=f(Ve,d,"TestLoadImage: error",!1,l,g),g.onabort=f(Ve,d,"TestLoadImage: abort",!1,l,g),g.ontimeout=f(Ve,d,"TestLoadImage: timeout",!1,l,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else l(!1)}function Hm(a,l){const d=new yr,g=new AbortController,b=setTimeout(()=>{g.abort(),Ve(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:g.signal}).then(R=>{clearTimeout(b),R.ok?Ve(d,"TestPingServer: ok",!0,l):Ve(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(b),Ve(d,"TestPingServer: error",!1,l)})}function Ve(a,l,d,g,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),g(d)}catch{}}function zm(){this.g=new Cm}function Vo(a){this.i=a.Sb||null,this.h=a.ab||!1}p(Vo,Eu),Vo.prototype.g=function(){return new Ds(this.i,this.h)};function Ds(a,l){Pt.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(Ds,Pt),n=Ds.prototype,n.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,Cr(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Rr(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Cr(this)),this.g&&(this.readyState=3,Cr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;zu(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function zu(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?Rr(this):Cr(this),this.readyState==3&&zu(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,Rr(this))},n.Na=function(a){this.g&&(this.response=a,Rr(this))},n.ga=function(){this.g&&Rr(this)};function Rr(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Cr(a)}n.setRequestHeader=function(a,l){this.A.append(a,l)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function Cr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ds.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Wu(a){let l="";return vs(a,function(d,g){l+=g,l+=":",l+=d,l+=`\r
`}),l}function Do(a,l,d){t:{for(g in d){var g=!1;break t}g=!0}g||(d=Wu(d),typeof a=="string"?d!=null&&Tr(d):nt(a,l,d))}function lt(a){Pt.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(lt,Pt);var Wm=/^https?$/i,Gm=["POST","PUT"];n=lt.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,l,d,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Cu.g(),this.g.onreadystatechange=m(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(R){Gu(this,R);return}if(a=d||"",d=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var b in g)d.set(b,g[b]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const R of g.keys())d.set(R,g.get(R));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),b=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(Gm,l,void 0)>=0)||g||b||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,D]of d)this.g.setRequestHeader(R,D);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(R){Gu(this,R)}};function Gu(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,Ju(a),Ns(a)}function Ju(a){a.A||(a.A=!0,Ot(a,"complete"),Ot(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Ot(this,"complete"),Ot(this,"abort"),Ns(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ns(this,!0)),lt.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Ku(this):this.Xa())},n.Xa=function(){Ku(this)};function Ku(a){if(a.h&&typeof i<"u"){if(a.v&&De(a)==4)setTimeout(a.Ca.bind(a),0);else if(Ot(a,"readystatechange"),De(a)==4){a.h=!1;try{const R=a.ca();t:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break t;default:l=!1}var d;if(!(d=l)){var g;if(g=R===0){let D=String(a.D).match(Uu)[1]||null;!D&&o.self&&o.self.location&&(D=o.self.location.protocol.slice(0,-1)),g=!Wm.test(D?D.toLowerCase():"")}d=g}if(d)Ot(a,"complete"),Ot(a,"success");else{a.o=6;try{var b=De(a)>2?a.g.statusText:""}catch{b=""}a.l=b+" ["+a.ca()+"]",Ju(a)}}finally{Ns(a)}}}}function Ns(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,l||Ot(a,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function De(a){return a.g?a.g.readyState:0}n.ca=function(){try{return De(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),Rm(l)}};function Qu(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Jm(a){const l={};a=(a.g&&De(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(y(a[g]))continue;var d=Dm(a[g]);const b=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const R=l[b]||[];l[b]=R,R.push(d)}Em(l,function(g){return g.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Sr(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function Xu(a){this.za=0,this.i=[],this.j=new yr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Sr("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Sr("baseRetryDelayMs",5e3,a),this.Za=Sr("retryDelaySeedMs",1e4,a),this.Ta=Sr("forwardChannelMaxRetries",2,a),this.va=Sr("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new Nu(a&&a.concurrentRequestLimit),this.Ba=new zm,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Xu.prototype,n.ka=8,n.I=1,n.connect=function(a,l,d,g){Mt(0),this.W=a,this.H=l||{},d&&g!==void 0&&(this.H.OSID=d,this.H.OAID=g),this.F=this.X,this.J=ol(this,null,this.W),Ms(this)};function No(a){if(Yu(a),a.I==3){var l=a.V++,d=ie(a.J);if(nt(d,"SID",a.M),nt(d,"RID",l),nt(d,"TYPE","terminate"),Pr(a,d),l=new Pe(a,a.j,l),l.M=2,l.A=Vs(ie(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=l.A,d=!0),d||(l.g=al(l.j,null),l.g.ea(l.A)),l.F=Date.now(),ks(l)}il(a)}function Os(a){a.g&&(Mo(a),a.g.cancel(),a.g=null)}function Yu(a){Os(a),a.v&&(o.clearTimeout(a.v),a.v=null),Ls(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Ms(a){if(!Ou(a.h)&&!a.m){a.m=!0;var l=a.Ea;wt||_(),ct||(wt(),ct=!0),w.add(l,a),a.D=0}}function Km(a,l){return Mu(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=_r(h(a.Ea,a,l),sl(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const b=new Pe(this,this.j,a);let R=this.o;if(this.U&&(R?(R=lu(R),du(R,this.U)):R=this.U),this.u!==null||this.R||(b.J=R,R=null),this.S)t:{for(var l=0,d=0;d<this.i.length;d++){e:{var g=this.i[d];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break e}g=void 0}if(g===void 0)break;if(l+=g,l>4096){l=d;break t}if(l===4096||d===this.i.length-1){l=d+1;break t}}l=1e3}else l=1e3;l=tl(this,b,l),d=ie(this.J),nt(d,"RID",a),nt(d,"CVER",22),this.G&&nt(d,"X-HTTP-Session-Id",this.G),Pr(this,d),R&&(this.R?l="headers="+Tr(Wu(R))+"&"+l:this.u&&Do(d,this.u,R)),Po(this.h,b),this.Ra&&nt(d,"TYPE","init"),this.S?(nt(d,"$req",l),nt(d,"SID","null"),b.U=!0,vo(b,d,null)):vo(b,d,l),this.I=2}}else this.I==3&&(a?Zu(this,a):this.i.length==0||Ou(this.h)||Zu(this))};function Zu(a,l){var d;l?d=l.l:d=a.V++;const g=ie(a.J);nt(g,"SID",a.M),nt(g,"RID",d),nt(g,"AID",a.K),Pr(a,g),a.u&&a.o&&Do(g,a.u,a.o),d=new Pe(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),l&&(a.i=l.G.concat(a.i)),l=tl(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Po(a.h,d),vo(d,g,l)}function Pr(a,l){a.H&&vs(a.H,function(d,g){nt(l,g,d)}),a.l&&vs({},function(d,g){nt(l,g,d)})}function tl(a,l,d){d=Math.min(a.i.length,d);const g=a.l?h(a.l.Ka,a.l,a):null;t:{var b=a.i;let H=-1;for(;;){const Tt=["count="+d];H==-1?d>0?(H=b[0].g,Tt.push("ofs="+H)):H=0:Tt.push("ofs="+H);let tt=!0;for(let It=0;It<d;It++){var R=b[It].g;const oe=b[It].map;if(R-=H,R<0)H=Math.max(0,b[It].g-100),tt=!1;else try{R="req"+R+"_"||"";try{var D=oe instanceof Map?oe:Object.entries(oe);for(const[pn,Ne]of D){let Oe=Ne;c(Ne)&&(Oe=Eo(Ne)),Tt.push(R+pn+"="+encodeURIComponent(Oe))}}catch(pn){throw Tt.push(R+"type="+encodeURIComponent("_badmap")),pn}}catch{g&&g(oe)}}if(tt){D=Tt.join("&");break t}}D=void 0}return a=a.i.splice(0,d),l.G=a,D}function el(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;wt||_(),ct||(wt(),ct=!0),w.add(l,a),a.A=0}}function Oo(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=_r(h(a.Da,a),sl(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,nl(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=_r(h(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Mt(10),Os(this),nl(this))};function Mo(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function nl(a){a.g=new Pe(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=ie(a.na);nt(l,"RID","rpc"),nt(l,"SID",a.M),nt(l,"AID",a.K),nt(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&nt(l,"TO",a.ia),nt(l,"TYPE","xmlhttp"),Pr(a,l),a.u&&a.o&&Do(l,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=Vs(ie(l)),d.u=null,d.R=!0,ku(d,a)}n.Va=function(){this.C!=null&&(this.C=null,Os(this),Oo(this),Mt(19))};function Ls(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function rl(a,l){var d=null;if(a.g==l){Ls(a),Mo(a),a.g=null;var g=2}else if(So(a.h,l))d=l.G,Lu(a.h,l),g=1;else return;if(a.I!=0){if(l.o)if(g==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var b=a.D;g=Ss(),Ot(g,new vu(g,d)),Ms(a)}else el(a);else if(b=l.m,b==3||b==0&&l.X>0||!(g==1&&Km(a,l)||g==2&&Oo(a)))switch(d&&d.length>0&&(l=a.h,l.i=l.i.concat(d)),b){case 1:fn(a,5);break;case 4:fn(a,10);break;case 3:fn(a,6);break;default:fn(a,2)}}}function sl(a,l){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*l}function fn(a,l){if(a.j.info("Error code "+l),l==2){var d=h(a.bb,a),g=a.Ua;const b=!g;g=new ke(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||wr(g,"https"),Vs(g),b?qm(g.toString(),d):Hm(g.toString(),d)}else Mt(2);a.I=0,a.l&&a.l.pa(l),il(a),Yu(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Mt(2)):(this.j.info("Failed to ping google.com"),Mt(1))};function il(a){if(a.I=0,a.ja=[],a.l){const l=xu(a.h);(l.length!=0||a.i.length!=0)&&(C(a.ja,l),C(a.ja,a.i),a.h.i.length=0,A(a.i),a.i.length=0),a.l.oa()}}function ol(a,l,d){var g=d instanceof ke?ie(d):new ke(d);if(g.g!="")l&&(g.g=l+"."+g.g),Ir(g,g.u);else{var b=o.location;g=b.protocol,l=l?l+"."+b.hostname:b.hostname,b=+b.port;const R=new ke(null);g&&wr(R,g),l&&(R.g=l),b&&Ir(R,b),d&&(R.h=d),g=R}return d=a.G,l=a.wa,d&&l&&nt(g,d,l),nt(g,"VER",a.ka),Pr(a,g),g}function al(a,l,d){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new lt(new Vo({ab:d})):new lt(a.ma),l.Fa(a.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function cl(){}n=cl.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function xs(){}xs.prototype.g=function(a,l){return new $t(a,l)};function $t(a,l){Pt.call(this),this.g=new Xu(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!y(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!y(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Ln(this)}p($t,Pt),$t.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},$t.prototype.close=function(){No(this.g)},$t.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=Eo(a),a=d);l.i.push(new Mm(l.Ya++,a)),l.I==3&&Ms(l)},$t.prototype.N=function(){this.g.l=null,delete this.j,No(this.g),delete this.g,$t.Z.N.call(this)};function ul(a){wo.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){t:{for(const d in l){a=d;break t}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}p(ul,wo);function ll(){Io.call(this),this.status=1}p(ll,Io);function Ln(a){this.g=a}p(Ln,cl),Ln.prototype.ra=function(){Ot(this.g,"a")},Ln.prototype.qa=function(a){Ot(this.g,new ul(a))},Ln.prototype.pa=function(a){Ot(this.g,new ll)},Ln.prototype.oa=function(){Ot(this.g,"b")},xs.prototype.createWebChannel=xs.prototype.g,$t.prototype.send=$t.prototype.o,$t.prototype.open=$t.prototype.m,$t.prototype.close=$t.prototype.close,sf=function(){return new xs},rf=function(){return Ss()},nf=ln,aa={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ps.NO_ERROR=0,Ps.TIMEOUT=8,Ps.HTTP_ERROR=6,Xs=Ps,Ru.COMPLETE="complete",ef=Ru,wu.EventType=gr,gr.OPEN="a",gr.CLOSE="b",gr.ERROR="c",gr.MESSAGE="d",Pt.prototype.listen=Pt.prototype.J,Vr=wu,lt.prototype.listenOnce=lt.prototype.K,lt.prototype.getLastError=lt.prototype.Ha,lt.prototype.getLastErrorCode=lt.prototype.ya,lt.prototype.getStatus=lt.prototype.ca,lt.prototype.getResponseJson=lt.prototype.La,lt.prototype.getResponseText=lt.prototype.la,lt.prototype.send=lt.prototype.ea,lt.prototype.setWithCredentials=lt.prototype.Fa,tf=lt}).apply(typeof Bs<"u"?Bs:typeof self<"u"?self:typeof window<"u"?window:{});const Bl="@firebase/firestore",jl="4.9.3";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Vt.UNAUTHENTICATED=new Vt(null),Vt.GOOGLE_CREDENTIALS=new Vt("google-credentials-uid"),Vt.FIRST_PARTY=new Vt("first-party-uid"),Vt.MOCK_USER=new Vt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ur="12.7.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const In=new Na("@firebase/firestore");function Fn(){return In.logLevel}function O(n,...t){if(In.logLevel<=z.DEBUG){const e=t.map(Ga);In.debug(`Firestore (${ur}): ${n}`,...e)}}function ve(n,...t){if(In.logLevel<=z.ERROR){const e=t.map(Ga);In.error(`Firestore (${ur}): ${n}`,...e)}}function Zn(n,...t){if(In.logLevel<=z.WARN){const e=t.map(Ga);In.warn(`Firestore (${ur}): ${n}`,...e)}}function Ga(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(e){return JSON.stringify(e)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,of(n,r,e)}function of(n,t,e){let r=`FIRESTORE (${ur}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw ve(r),new Error(r)}function Q(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||of(t,s,r)}function $(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends me{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class ME{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(Vt.UNAUTHENTICATED)))}shutdown(){}}class LE{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class xE{constructor(t){this.t=t,this.currentUser=Vt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Q(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,e(u)):Promise.resolve();let i=new we;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new we,t.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;t.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new we)}}),0),o()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((r=>this.i!==t?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Q(typeof r.accessToken=="string",31837,{l:r}),new af(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Q(t===null||typeof t=="string",2055,{h:t}),new Vt(t)}}class UE{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=Vt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class FE{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new UE(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(Vt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class $l{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class BE{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,qt(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){Q(this.o===void 0,3512);const r=i=>{i.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,O("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable((()=>r(i)))};const s=i=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new $l(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(Q(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new $l(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jE(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=jE(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<e&&(r+=t.charAt(s[i]%62))}return r}}function W(n,t){return n<t?-1:n>t?1:0}function ca(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),i=t.charAt(r);if(s!==i)return Ho(s)===Ho(i)?W(s,i):Ho(s)?1:-1}return W(n.length,t.length)}const $E=55296,qE=57343;function Ho(n){const t=n.charCodeAt(0);return t>=$E&&t<=qE}function tr(n,t,e){return n.length===t.length&&n.every(((r,s)=>e(r,t[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ql="__name__";class ae{constructor(t,e,r){e===void 0?e=0:e>t.length&&x(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&x(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return ae.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof ae?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const i=ae.compareSegments(t.get(s),e.get(s));if(i!==0)return i}return W(t.length,e.length)}static compareSegments(t,e){const r=ae.isNumericId(t),s=ae.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?ae.extractNumericId(t).compare(ae.extractNumericId(e)):ca(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return ze.fromString(t.substring(4,t.length-2))}}class X extends ae{construct(t,e,r){return new X(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new N(S.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((s=>s.length>0)))}return new X(e)}static emptyPath(){return new X([])}}const HE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ct extends ae{construct(t,e,r){return new Ct(t,e,r)}static isValidIdentifier(t){return HE.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ct.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ql}static keyField(){return new Ct([ql])}static fromServerFormat(t){const e=[];let r="",s=0;const i=()=>{if(r.length===0)throw new N(S.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let o=!1;for(;s<t.length;){const c=t[s];if(c==="\\"){if(s+1===t.length)throw new N(S.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const u=t[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new N(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new N(S.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Ct(e)}static emptyPath(){return new Ct([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(t){this.path=t}static fromPath(t){return new L(X.fromString(t))}static fromName(t){return new L(X.fromString(t).popFirst(5))}static empty(){return new L(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&X.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return X.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new L(new X(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cf(n,t,e){if(!e)throw new N(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function zE(n,t,e,r){if(t===!0&&r===!0)throw new N(S.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Hl(n){if(!L.isDocumentKey(n))throw new N(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function zl(n){if(L.isDocumentKey(n))throw new N(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function uf(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function xi(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":x(12329,{type:typeof n})}function Ie(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new N(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=xi(n);throw new N(S.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(n,t){const e={typeString:n};return t&&(e.value=t),e}function us(n,t){if(!uf(n))throw new N(S.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,i="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){e=`Expected '${r}' field to equal '${i.value}'`;break}}if(e)throw new N(S.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wl=-62135596800,Gl=1e6;class rt{static now(){return rt.fromMillis(Date.now())}static fromDate(t){return rt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*Gl);return new rt(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new N(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new N(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Wl)throw new N(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new N(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Gl}_compareTo(t){return this.seconds===t.seconds?W(this.nanoseconds,t.nanoseconds):W(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:rt._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(us(t,rt._jsonSchema))return new rt(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Wl;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}rt._jsonSchemaVersion="firestore/timestamp/1.0",rt._jsonSchema={type:yt("string",rt._jsonSchemaVersion),seconds:yt("number"),nanoseconds:yt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{static fromTimestamp(t){return new F(t)}static min(){return new F(new rt(0,0))}static max(){return new F(new rt(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wr=-1;function WE(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=F.fromTimestamp(r===1e9?new rt(e+1,0):new rt(e,r));return new Qe(s,L.empty(),t)}function GE(n){return new Qe(n.readTime,n.key,Wr)}class Qe{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Qe(F.min(),L.empty(),Wr)}static max(){return new Qe(F.max(),L.empty(),Wr)}}function JE(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=L.comparator(n.documentKey,t.documentKey),e!==0?e:W(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KE="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class QE{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lr(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==KE)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&x(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new P(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(r,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof P?e:P.resolve(e)}catch(e){return P.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):P.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):P.reject(e)}static resolve(t){return new P(((e,r)=>{e(t)}))}static reject(t){return new P(((e,r)=>{r(t)}))}static waitFor(t){return new P(((e,r)=>{let s=0,i=0,o=!1;t.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&e()}),(u=>r(u)))})),o=!0,i===s&&e()}))}static or(t){let e=P.resolve(!1);for(const r of t)e=e.next((s=>s?P.resolve(s):r()));return e}static forEach(t,e){const r=[];return t.forEach(((s,i)=>{r.push(e.call(this,s,i))})),this.waitFor(r)}static mapArray(t,e){return new P(((r,s)=>{const i=t.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;e(t[h]).next((f=>{o[h]=f,++c,c===i&&r(o)}),(f=>s(f)))}}))}static doWhile(t,e){return new P(((r,s)=>{const i=()=>{t()===!0?e().next((()=>{i()}),s):r()};i()}))}}function XE(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function hr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Ui.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ka=-1;function ls(n){return n==null}function di(n){return n===0&&1/n==-1/0}function YE(n){return typeof n=="number"&&Number.isInteger(n)&&!di(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lf="";function ZE(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Jl(t)),t=tw(n.get(e),t);return Jl(t)}function tw(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":e+="";break;case lf:e+="";break;default:e+=i}}return e}function Jl(n){return n+lf+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kl(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function rn(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function hf(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(t,e){this.comparator=t,this.root=e||Rt.EMPTY}insert(t,e){return new ut(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Rt.BLACK,null,null))}remove(t){return new ut(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Rt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new js(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new js(this.root,t,this.comparator,!1)}getReverseIterator(){return new js(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new js(this.root,t,this.comparator,!0)}}class js{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?r(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Rt{constructor(t,e,r,s,i){this.key=t,this.value=e,this.color=r??Rt.RED,this.left=s??Rt.EMPTY,this.right=i??Rt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,i){return new Rt(t??this.key,e??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const i=r(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,r),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Rt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return Rt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Rt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Rt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw x(43730,{key:this.key,value:this.value});if(this.right.isRed())throw x(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw x(27949);return t+(this.isRed()?0:1)}}Rt.EMPTY=null,Rt.RED=!0,Rt.BLACK=!1;Rt.EMPTY=new class{constructor(){this.size=0}get key(){throw x(57766)}get value(){throw x(16141)}get color(){throw x(16727)}get left(){throw x(29726)}get right(){throw x(36894)}copy(t,e,r,s,i){return this}insert(t,e,r){return new Rt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(t){this.comparator=t,this.data=new ut(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Ql(this.data.getIterator())}getIteratorFrom(t){return new Ql(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof Et)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new Et(this.comparator);return e.data=t,e}}class Ql{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(t){this.fields=t,t.sort(Ct.comparator)}static empty(){return new zt([])}unionWith(t){let e=new Et(Ct.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new zt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return tr(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class df extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new df("Invalid base64 string: "+i):i}})(t);return new St(e)}static fromUint8Array(t){const e=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(t);return new St(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return W(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}St.EMPTY_BYTE_STRING=new St("");const ew=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Xe(n){if(Q(!!n,39018),typeof n=="string"){let t=0;const e=ew.exec(n);if(Q(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:gt(n.seconds),nanos:gt(n.nanos)}}function gt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ye(n){return typeof n=="string"?St.fromBase64String(n):St.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ff="server_timestamp",pf="__type__",gf="__previous_value__",mf="__local_write_time__";function Qa(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[pf])==null?void 0:r.stringValue)===ff}function Fi(n){const t=n.mapValue.fields[gf];return Qa(t)?Fi(t):t}function Gr(n){const t=Xe(n.mapValue.fields[mf].timestampValue);return new rt(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nw{constructor(t,e,r,s,i,o,c,u,h,f){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f}}const fi="(default)";class Jr{constructor(t,e){this.projectId=t,this.database=e||fi}static empty(){return new Jr("","")}get isDefaultDatabase(){return this.database===fi}isEqual(t){return t instanceof Jr&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _f="__type__",rw="__max__",$s={mapValue:{}},yf="__vector__",pi="value";function Ze(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Qa(n)?4:iw(n)?9007199254740991:sw(n)?10:11:x(28295,{value:n})}function ge(n,t){if(n===t)return!0;const e=Ze(n);if(e!==Ze(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Gr(n).isEqual(Gr(t));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Xe(s.timestampValue),c=Xe(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(s,i){return Ye(s.bytesValue).isEqual(Ye(i.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(s,i){return gt(s.geoPointValue.latitude)===gt(i.geoPointValue.latitude)&&gt(s.geoPointValue.longitude)===gt(i.geoPointValue.longitude)})(n,t);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return gt(s.integerValue)===gt(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=gt(s.doubleValue),c=gt(i.doubleValue);return o===c?di(o)===di(c):isNaN(o)&&isNaN(c)}return!1})(n,t);case 9:return tr(n.arrayValue.values||[],t.arrayValue.values||[],ge);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Kl(o)!==Kl(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!ge(o[u],c[u])))return!1;return!0})(n,t);default:return x(52216,{left:n})}}function Kr(n,t){return(n.values||[]).find((e=>ge(e,t)))!==void 0}function er(n,t){if(n===t)return 0;const e=Ze(n),r=Ze(t);if(e!==r)return W(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return W(n.booleanValue,t.booleanValue);case 2:return(function(i,o){const c=gt(i.integerValue||i.doubleValue),u=gt(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,t);case 3:return Xl(n.timestampValue,t.timestampValue);case 4:return Xl(Gr(n),Gr(t));case 5:return ca(n.stringValue,t.stringValue);case 6:return(function(i,o){const c=Ye(i),u=Ye(o);return c.compareTo(u)})(n.bytesValue,t.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=W(c[h],u[h]);if(f!==0)return f}return W(c.length,u.length)})(n.referenceValue,t.referenceValue);case 8:return(function(i,o){const c=W(gt(i.latitude),gt(o.latitude));return c!==0?c:W(gt(i.longitude),gt(o.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return Yl(n.arrayValue,t.arrayValue);case 10:return(function(i,o){var m,A,C,k;const c=i.fields||{},u=o.fields||{},h=(m=c[pi])==null?void 0:m.arrayValue,f=(A=u[pi])==null?void 0:A.arrayValue,p=W(((C=h==null?void 0:h.values)==null?void 0:C.length)||0,((k=f==null?void 0:f.values)==null?void 0:k.length)||0);return p!==0?p:Yl(h,f)})(n.mapValue,t.mapValue);case 11:return(function(i,o){if(i===$s.mapValue&&o===$s.mapValue)return 0;if(i===$s.mapValue)return 1;if(o===$s.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const m=ca(u[p],f[p]);if(m!==0)return m;const A=er(c[u[p]],h[f[p]]);if(A!==0)return A}return W(u.length,f.length)})(n.mapValue,t.mapValue);default:throw x(23264,{he:e})}}function Xl(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return W(n,t);const e=Xe(n),r=Xe(t),s=W(e.seconds,r.seconds);return s!==0?s:W(e.nanos,r.nanos)}function Yl(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const i=er(e[s],r[s]);if(i)return i}return W(e.length,r.length)}function nr(n){return ua(n)}function ua(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const r=Xe(e);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return Ye(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return L.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let r="[",s=!0;for(const i of e.values||[])s?s=!1:r+=",",r+=ua(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(e){const r=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${ua(e.fields[o])}`;return s+"}"})(n.mapValue):x(61005,{value:n})}function Ys(n){switch(Ze(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Fi(n);return t?16+Ys(t):16;case 5:return 2*n.stringValue.length;case 6:return Ye(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Ys(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return rn(r.fields,((i,o)=>{s+=i.length+Ys(o)})),s})(n.mapValue);default:throw x(13486,{value:n})}}function Zl(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function la(n){return!!n&&"integerValue"in n}function Xa(n){return!!n&&"arrayValue"in n}function th(n){return!!n&&"nullValue"in n}function eh(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Zs(n){return!!n&&"mapValue"in n}function sw(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[_f])==null?void 0:r.stringValue)===yf}function xr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return rn(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=xr(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=xr(n.arrayValue.values[e]);return t}return{...n}}function iw(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===rw}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(t){this.value=t}static empty(){return new xt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!Zs(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=xr(e)}setAll(t){let e=Ct.emptyPath(),r={},s=[];t.forEach(((o,c)=>{if(!e.isImmediateParentOf(c)){const u=this.getFieldsMap(e);this.applyChanges(u,r,s),r={},s=[],e=c.popLast()}o?r[c.lastSegment()]=xr(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(e);this.applyChanges(i,r,s)}delete(t){const e=this.field(t.popLast());Zs(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return ge(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];Zs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){rn(e,((s,i)=>t[s]=i));for(const s of r)delete t[s]}clone(){return new xt(xr(this.value))}}function Tf(n){const t=[];return rn(n.fields,((e,r)=>{const s=new Ct([e]);if(Zs(r)){const i=Tf(r.mapValue).fields;if(i.length===0)t.push(s);else for(const o of i)t.push(s.child(o))}else t.push(s)})),new zt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(t,e,r,s,i,o,c){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(t){return new bt(t,0,F.min(),F.min(),F.min(),xt.empty(),0)}static newFoundDocument(t,e,r,s){return new bt(t,1,e,F.min(),r,s,0)}static newNoDocument(t,e){return new bt(t,2,e,F.min(),F.min(),xt.empty(),0)}static newUnknownDocument(t,e){return new bt(t,3,e,F.min(),F.min(),xt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(F.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=xt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=xt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=F.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof bt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new bt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(t,e){this.position=t,this.inclusive=e}}function nh(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const i=t[s],o=n.position[s];if(i.field.isKeyField()?r=L.comparator(L.fromName(o.referenceValue),e.key):r=er(o,e.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function rh(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!ge(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{constructor(t,e="asc"){this.field=t,this.dir=e}}function ow(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{}class _t extends Ef{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new cw(t,e,r):e==="array-contains"?new hw(t,r):e==="in"?new dw(t,r):e==="not-in"?new fw(t,r):e==="array-contains-any"?new pw(t,r):new _t(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new uw(t,r):new lw(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(er(e,this.value)):e!==null&&Ze(this.value)===Ze(e)&&this.matchesComparison(er(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return x(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ne extends Ef{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new ne(t,e)}matches(t){return wf(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function wf(n){return n.op==="and"}function If(n){return aw(n)&&wf(n)}function aw(n){for(const t of n.filters)if(t instanceof ne)return!1;return!0}function ha(n){if(n instanceof _t)return n.field.canonicalString()+n.op.toString()+nr(n.value);if(If(n))return n.filters.map((t=>ha(t))).join(",");{const t=n.filters.map((e=>ha(e))).join(",");return`${n.op}(${t})`}}function Af(n,t){return n instanceof _t?(function(r,s){return s instanceof _t&&r.op===s.op&&r.field.isEqual(s.field)&&ge(r.value,s.value)})(n,t):n instanceof ne?(function(r,s){return s instanceof ne&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,c)=>i&&Af(o,s.filters[c])),!0):!1})(n,t):void x(19439)}function bf(n){return n instanceof _t?(function(e){return`${e.field.canonicalString()} ${e.op} ${nr(e.value)}`})(n):n instanceof ne?(function(e){return e.op.toString()+" {"+e.getFilters().map(bf).join(" ,")+"}"})(n):"Filter"}class cw extends _t{constructor(t,e,r){super(t,e,r),this.key=L.fromName(r.referenceValue)}matches(t){const e=L.comparator(t.key,this.key);return this.matchesComparison(e)}}class uw extends _t{constructor(t,e){super(t,"in",e),this.keys=vf("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class lw extends _t{constructor(t,e){super(t,"not-in",e),this.keys=vf("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function vf(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map((r=>L.fromName(r.referenceValue)))}class hw extends _t{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Xa(e)&&Kr(e.arrayValue,this.value)}}class dw extends _t{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Kr(this.value.arrayValue,e)}}class fw extends _t{constructor(t,e){super(t,"not-in",e)}matches(t){if(Kr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Kr(this.value.arrayValue,e)}}class pw extends _t{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Xa(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>Kr(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gw{constructor(t,e=null,r=[],s=[],i=null,o=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function sh(n,t=null,e=[],r=[],s=null,i=null,o=null){return new gw(n,t,e,r,s,i,o)}function Ya(n){const t=$(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((r=>ha(r))).join(","),e+="|ob:",e+=t.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),ls(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((r=>nr(r))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((r=>nr(r))).join(",")),t.Te=e}return t.Te}function Za(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!ow(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!Af(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!rh(n.startAt,t.startAt)&&rh(n.endAt,t.endAt)}function da(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(t,e=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function mw(n,t,e,r,s,i,o,c){return new dr(n,t,e,r,s,i,o,c)}function Bi(n){return new dr(n)}function ih(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Rf(n){return n.collectionGroup!==null}function Ur(n){const t=$(n);if(t.Ie===null){t.Ie=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ie.push(i),e.add(i.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Et(Ct.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(t).forEach((i=>{e.has(i.canonicalString())||i.isKeyField()||t.Ie.push(new Qr(i,r))})),e.has(Ct.keyField().canonicalString())||t.Ie.push(new Qr(Ct.keyField(),r))}return t.Ie}function he(n){const t=$(n);return t.Ee||(t.Ee=_w(t,Ur(n))),t.Ee}function _w(n,t){if(n.limitType==="F")return sh(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Qr(s.field,i)}));const e=n.endAt?new gi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new gi(n.startAt.position,n.startAt.inclusive):null;return sh(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function fa(n,t){const e=n.filters.concat([t]);return new dr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function mi(n,t,e){return new dr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function ji(n,t){return Za(he(n),he(t))&&n.limitType===t.limitType}function Cf(n){return`${Ya(he(n))}|lt:${n.limitType}`}function Bn(n){return`Query(target=${(function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map((s=>bf(s))).join(", ")}]`),ls(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map((s=>nr(s))).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map((s=>nr(s))).join(",")),`Target(${r})`})(he(n))}; limitType=${n.limitType})`}function $i(n,t){return t.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):L.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,t)&&(function(r,s){for(const i of Ur(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,t)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,t)&&(function(r,s){return!(r.startAt&&!(function(o,c,u){const h=nh(o,c,u);return o.inclusive?h<=0:h<0})(r.startAt,Ur(r),s)||r.endAt&&!(function(o,c,u){const h=nh(o,c,u);return o.inclusive?h>=0:h>0})(r.endAt,Ur(r),s))})(n,t)}function yw(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Sf(n){return(t,e)=>{let r=!1;for(const s of Ur(n)){const i=Tw(s,t,e);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Tw(n,t,e){const r=n.field.isKeyField()?L.comparator(t.key,e.key):(function(i,o,c){const u=o.data.field(i),h=c.data.field(i);return u!==null&&h!==null?er(u,h):x(42886)})(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return x(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){rn(this.inner,((e,r)=>{for(const[s,i]of r)t(s,i)}))}isEmpty(){return hf(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ew=new ut(L.comparator);function Re(){return Ew}const Pf=new ut(L.comparator);function Dr(...n){let t=Pf;for(const e of n)t=t.insert(e.key,e);return t}function kf(n){let t=Pf;return n.forEach(((e,r)=>t=t.insert(e,r.overlayedDocument))),t}function _n(){return Fr()}function Vf(){return Fr()}function Fr(){return new Cn((n=>n.toString()),((n,t)=>n.isEqual(t)))}const ww=new ut(L.comparator),Iw=new Et(L.comparator);function G(...n){let t=Iw;for(const e of n)t=t.add(e);return t}const Aw=new Et(W);function bw(){return Aw}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tc(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:di(t)?"-0":t}}function Df(n){return{integerValue:""+n}}function vw(n,t){return YE(t)?Df(t):tc(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{constructor(){this._=void 0}}function Rw(n,t,e){return n instanceof Xr?(function(s,i){const o={fields:{[pf]:{stringValue:ff},[mf]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Qa(i)&&(i=Fi(i)),i&&(o.fields[gf]=i),{mapValue:o}})(e,t):n instanceof Yr?Of(n,t):n instanceof Zr?Mf(n,t):(function(s,i){const o=Nf(s,i),c=oh(o)+oh(s.Ae);return la(o)&&la(s.Ae)?Df(c):tc(s.serializer,c)})(n,t)}function Cw(n,t,e){return n instanceof Yr?Of(n,t):n instanceof Zr?Mf(n,t):e}function Nf(n,t){return n instanceof _i?(function(r){return la(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(t)?t:{integerValue:0}:null}class Xr extends qi{}class Yr extends qi{constructor(t){super(),this.elements=t}}function Of(n,t){const e=Lf(t);for(const r of n.elements)e.some((s=>ge(s,r)))||e.push(r);return{arrayValue:{values:e}}}class Zr extends qi{constructor(t){super(),this.elements=t}}function Mf(n,t){let e=Lf(t);for(const r of n.elements)e=e.filter((s=>!ge(s,r)));return{arrayValue:{values:e}}}class _i extends qi{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function oh(n){return gt(n.integerValue||n.doubleValue)}function Lf(n){return Xa(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sw{constructor(t,e){this.field=t,this.transform=e}}function Pw(n,t){return n.field.isEqual(t.field)&&(function(r,s){return r instanceof Yr&&s instanceof Yr||r instanceof Zr&&s instanceof Zr?tr(r.elements,s.elements,ge):r instanceof _i&&s instanceof _i?ge(r.Ae,s.Ae):r instanceof Xr&&s instanceof Xr})(n.transform,t.transform)}class kw{constructor(t,e){this.version=t,this.transformResults=e}}class jt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new jt}static exists(t){return new jt(void 0,t)}static updateTime(t){return new jt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function ti(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Hi{}function xf(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new ec(n.key,jt.none()):new hs(n.key,n.data,jt.none());{const e=n.data,r=xt.empty();let s=new Et(Ct.comparator);for(let i of t.fields)if(!s.has(i)){let o=e.field(i);o===null&&i.length>1&&(i=i.popLast(),o=e.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new sn(n.key,r,new zt(s.toArray()),jt.none())}}function Vw(n,t,e){n instanceof hs?(function(s,i,o){const c=s.value.clone(),u=ch(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,t,e):n instanceof sn?(function(s,i,o){if(!ti(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=ch(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(Uf(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(n,t,e):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,t,e)}function Br(n,t,e,r){return n instanceof hs?(function(i,o,c,u){if(!ti(i.precondition,o))return c;const h=i.value.clone(),f=uh(i.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(n,t,e,r):n instanceof sn?(function(i,o,c,u){if(!ti(i.precondition,o))return c;const h=uh(i.fieldTransforms,u,o),f=o.data;return f.setAll(Uf(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,t,e,r):(function(i,o,c){return ti(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(n,t,e)}function Dw(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),i=Nf(r.transform,s||null);i!=null&&(e===null&&(e=xt.empty()),e.set(r.field,i))}return e||null}function ah(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&tr(r,s,((i,o)=>Pw(i,o)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class hs extends Hi{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class sn extends Hi{constructor(t,e,r,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Uf(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}})),t}function ch(n,t,e){const r=new Map;Q(n.length===e.length,32656,{Re:e.length,Ve:n.length});for(let s=0;s<e.length;s++){const i=n[s],o=i.transform,c=t.data.field(i.field);r.set(i.field,Cw(o,c,e[s]))}return r}function uh(n,t,e){const r=new Map;for(const s of n){const i=s.transform,o=e.data.field(s.field);r.set(s.field,Rw(i,o,t))}return r}class ec extends Hi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Ff extends Hi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nw{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&Vw(i,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=Br(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=Br(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=Vf();return this.mutations.forEach((s=>{const i=t.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=e.has(s.key)?null:c;const u=xf(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(F.min())})),r}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),G())}isEqual(t){return this.batchId===t.batchId&&tr(this.mutations,t.mutations,((e,r)=>ah(e,r)))&&tr(this.baseMutations,t.baseMutations,((e,r)=>ah(e,r)))}}class nc{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){Q(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let s=(function(){return ww})();const i=t.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new nc(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ow{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mw{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var mt,K;function Bf(n){switch(n){case S.OK:return x(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return x(15467,{code:n})}}function jf(n){if(n===void 0)return ve("GRPC error has no .code"),S.UNKNOWN;switch(n){case mt.OK:return S.OK;case mt.CANCELLED:return S.CANCELLED;case mt.UNKNOWN:return S.UNKNOWN;case mt.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case mt.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case mt.INTERNAL:return S.INTERNAL;case mt.UNAVAILABLE:return S.UNAVAILABLE;case mt.UNAUTHENTICATED:return S.UNAUTHENTICATED;case mt.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case mt.NOT_FOUND:return S.NOT_FOUND;case mt.ALREADY_EXISTS:return S.ALREADY_EXISTS;case mt.PERMISSION_DENIED:return S.PERMISSION_DENIED;case mt.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case mt.ABORTED:return S.ABORTED;case mt.OUT_OF_RANGE:return S.OUT_OF_RANGE;case mt.UNIMPLEMENTED:return S.UNIMPLEMENTED;case mt.DATA_LOSS:return S.DATA_LOSS;default:return x(39323,{code:n})}}(K=mt||(mt={}))[K.OK=0]="OK",K[K.CANCELLED=1]="CANCELLED",K[K.UNKNOWN=2]="UNKNOWN",K[K.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",K[K.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",K[K.NOT_FOUND=5]="NOT_FOUND",K[K.ALREADY_EXISTS=6]="ALREADY_EXISTS",K[K.PERMISSION_DENIED=7]="PERMISSION_DENIED",K[K.UNAUTHENTICATED=16]="UNAUTHENTICATED",K[K.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",K[K.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",K[K.ABORTED=10]="ABORTED",K[K.OUT_OF_RANGE=11]="OUT_OF_RANGE",K[K.UNIMPLEMENTED=12]="UNIMPLEMENTED",K[K.INTERNAL=13]="INTERNAL",K[K.UNAVAILABLE=14]="UNAVAILABLE",K[K.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lw(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xw=new ze([4294967295,4294967295],0);function lh(n){const t=Lw().encode(n),e=new Zd;return e.update(t),new Uint8Array(e.digest())}function hh(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new ze([e,r],0),new ze([s,i],0)]}class rc{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new Nr(`Invalid padding: ${e}`);if(r<0)throw new Nr(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new Nr(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new Nr(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=ze.fromNumber(this.ge)}ye(t,e,r){let s=t.add(e.multiply(ze.fromNumber(r)));return s.compare(xw)===1&&(s=new ze([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=lh(t),[r,s]=hh(e);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),o=new rc(i,s,e);return r.forEach((c=>o.insert(c))),o}insert(t){if(this.ge===0)return;const e=lh(t),[r,s]=hh(e);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class Nr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(t,e,r,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,ds.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new zi(F.min(),s,new ut(W),Re(),G())}}class ds{constructor(t,e,r,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new ds(r,e,G(),G(),G())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(t,e,r,s){this.be=t,this.removedTargetIds=e,this.key=r,this.De=s}}class $f{constructor(t,e){this.targetId=t,this.Ce=e}}class qf{constructor(t,e,r=St.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class dh{constructor(){this.ve=0,this.Fe=fh(),this.Me=St.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=G(),e=G(),r=G();return this.Fe.forEach(((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:x(38017,{changeType:i})}})),new ds(this.Me,this.xe,t,e,r)}qe(){this.Oe=!1,this.Fe=fh()}Qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}$e(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}Ue(){this.ve+=1}Ke(){this.ve-=1,Q(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Uw{constructor(t){this.Ge=t,this.ze=new Map,this.je=Re(),this.Je=qs(),this.He=qs(),this.Ye=new ut(W)}Ze(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Xe(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,(e=>{const r=this.nt(e);switch(t.state){case 0:this.rt(e)&&r.Le(t.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(t.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(r.We(),r.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),r.Le(t.resumeToken));break;default:x(56790,{state:t.state})}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach(((r,s)=>{this.rt(s)&&e(s)}))}st(t){const e=t.targetId,r=t.Ce.count,s=this.ot(e);if(s){const i=s.target;if(da(i))if(r===0){const o=new L(i.path);this.et(e,o,bt.newNoDocument(o,F.min()))}else Q(r===1,20013,{expectedCount:r});else{const o=this._t(e);if(o!==r){const c=this.ut(t),u=c?this.ct(c,t,o):1;if(u!==0){this.it(e);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(e,h)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=e;let o,c;try{o=Ye(r).toUint8Array()}catch(u){if(u instanceof df)return Zn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new rc(o,s,i)}catch(u){return Zn(u instanceof Nr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(t,e,r){return e.Ce.count===r-this.Pt(t,e.targetId)?0:2}Pt(t,e){const r=this.Ge.getRemoteKeysForTarget(e);let s=0;return r.forEach((i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;t.mightContain(c)||(this.et(e,i,null),s++)})),s}Tt(t){const e=new Map;this.ze.forEach(((i,o)=>{const c=this.ot(o);if(c){if(i.current&&da(c.target)){const u=new L(c.target.path);this.It(u).has(o)||this.Et(o,u)||this.et(o,u,bt.newNoDocument(u,t))}i.Be&&(e.set(o,i.ke()),i.qe())}}));let r=G();this.He.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const h=this.ot(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(t)));const s=new zi(t,e,this.Ye,this.je,r);return this.je=Re(),this.Je=qs(),this.He=qs(),this.Ye=new ut(W),s}Xe(t,e){if(!this.rt(t))return;const r=this.Et(t,e.key)?2:0;this.nt(t).Qe(e.key,r),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.He=this.He.insert(e.key,this.dt(e.key).add(t))}et(t,e,r){if(!this.rt(t))return;const s=this.nt(t);this.Et(t,e)?s.Qe(e,1):s.$e(e),this.He=this.He.insert(e,this.dt(e).delete(t)),this.He=this.He.insert(e,this.dt(e).add(t)),r&&(this.je=this.je.insert(e,r))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ue(t){this.nt(t).Ue()}nt(t){let e=this.ze.get(t);return e||(e=new dh,this.ze.set(t,e)),e}dt(t){let e=this.He.get(t);return e||(e=new Et(W),this.He=this.He.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new Et(W),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||O("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new dh),this.Ge.getRemoteKeysForTarget(t).forEach((e=>{this.et(t,e,null)}))}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function qs(){return new ut(L.comparator)}function fh(){return new ut(L.comparator)}const Fw={asc:"ASCENDING",desc:"DESCENDING"},Bw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},jw={and:"AND",or:"OR"};class $w{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function pa(n,t){return n.useProto3Json||ls(t)?t:{value:t}}function yi(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Hf(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function qw(n,t){return yi(n,t.toTimestamp())}function Jt(n){return Q(!!n,49232),F.fromTimestamp((function(e){const r=Xe(e);return new rt(r.seconds,r.nanos)})(n))}function sc(n,t){return ga(n,t).canonicalString()}function ga(n,t){const e=(function(s){return new X(["projects",s.projectId,"databases",s.database])})(n).child("documents");return t===void 0?e:e.child(t)}function zf(n){const t=X.fromString(n);return Q(Xf(t),10190,{key:t.toString()}),t}function Ti(n,t){return sc(n.databaseId,t.path)}function jr(n,t){const e=zf(t);if(e.get(1)!==n.databaseId.projectId)throw new N(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new N(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new L(Gf(e))}function Wf(n,t){return sc(n.databaseId,t)}function Hw(n){const t=zf(n);return t.length===4?X.emptyPath():Gf(t)}function ma(n){return new X(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Gf(n){return Q(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function ph(n,t,e){return{name:Ti(n,t),fields:e.value.mapValue.fields}}function zw(n,t){return"found"in t?(function(r,s){Q(!!s.found,43571),s.found.name,s.found.updateTime;const i=jr(r,s.found.name),o=Jt(s.found.updateTime),c=s.found.createTime?Jt(s.found.createTime):F.min(),u=new xt({mapValue:{fields:s.found.fields}});return bt.newFoundDocument(i,o,c,u)})(n,t):"missing"in t?(function(r,s){Q(!!s.missing,3894),Q(!!s.readTime,22933);const i=jr(r,s.missing),o=Jt(s.readTime);return bt.newNoDocument(i,o)})(n,t):x(7234,{result:t})}function Ww(n,t){let e;if("targetChange"in t){t.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:x(39313,{state:h})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(Q(f===void 0||typeof f=="string",58123),St.fromBase64String(f||"")):(Q(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),St.fromUint8Array(f||new Uint8Array))})(n,t.targetChange.resumeToken),o=t.targetChange.cause,c=o&&(function(h){const f=h.code===void 0?S.UNKNOWN:jf(h.code);return new N(f,h.message||"")})(o);e=new qf(r,s,i,c||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=jr(n,r.document.name),i=Jt(r.document.updateTime),o=r.document.createTime?Jt(r.document.createTime):F.min(),c=new xt({mapValue:{fields:r.document.fields}}),u=bt.newFoundDocument(s,i,o,c),h=r.targetIds||[],f=r.removedTargetIds||[];e=new ei(h,f,u.key,u)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=jr(n,r.document),i=r.readTime?Jt(r.readTime):F.min(),o=bt.newNoDocument(s,i),c=r.removedTargetIds||[];e=new ei([],c,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=jr(n,r.document),i=r.removedTargetIds||[];e=new ei([],i,s,null)}else{if(!("filter"in t))return x(11601,{Rt:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new Mw(s,i),c=r.targetId;e=new $f(c,o)}}return e}function Jf(n,t){let e;if(t instanceof hs)e={update:ph(n,t.key,t.value)};else if(t instanceof ec)e={delete:Ti(n,t.key)};else if(t instanceof sn)e={update:ph(n,t.key,t.data),updateMask:eI(t.fieldMask)};else{if(!(t instanceof Ff))return x(16599,{Vt:t.type});e={verify:Ti(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(i,o){const c=o.transform;if(c instanceof Xr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Yr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Zr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof _i)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw x(20930,{transform:o.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:qw(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:x(27497)})(n,t.precondition)),e}function Gw(n,t){return n&&n.length>0?(Q(t!==void 0,14353),n.map((e=>(function(s,i){let o=s.updateTime?Jt(s.updateTime):Jt(i);return o.isEqual(F.min())&&(o=Jt(i)),new kw(o,s.transformResults||[])})(e,t)))):[]}function Jw(n,t){return{documents:[Wf(n,t.path)]}}function Kw(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Wf(n,s);const i=(function(h){if(h.length!==0)return Qf(ne.create(h,"and"))})(t.filters);i&&(e.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((f=>(function(m){return{field:jn(m.field),direction:Yw(m.dir)}})(f)))})(t.orderBy);o&&(e.structuredQuery.orderBy=o);const c=pa(n,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(t.endAt)),{ft:e,parent:s}}function Qw(n){let t=Hw(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){Q(r===1,65062);const f=e.from[0];f.allDescendants?s=f.collectionId:t=t.child(f.collectionId)}let i=[];e.where&&(i=(function(p){const m=Kf(p);return m instanceof ne&&If(m)?m.getFilters():[m]})(e.where));let o=[];e.orderBy&&(o=(function(p){return p.map((m=>(function(C){return new Qr($n(C.field),(function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(C.direction))})(m)))})(e.orderBy));let c=null;e.limit&&(c=(function(p){let m;return m=typeof p=="object"?p.value:p,ls(m)?null:m})(e.limit));let u=null;e.startAt&&(u=(function(p){const m=!!p.before,A=p.values||[];return new gi(A,m)})(e.startAt));let h=null;return e.endAt&&(h=(function(p){const m=!p.before,A=p.values||[];return new gi(A,m)})(e.endAt)),mw(t,s,o,i,c,"F",u,h)}function Xw(n,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return x(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Kf(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=$n(e.unaryFilter.field);return _t.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=$n(e.unaryFilter.field);return _t.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=$n(e.unaryFilter.field);return _t.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=$n(e.unaryFilter.field);return _t.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return x(61313);default:return x(60726)}})(n):n.fieldFilter!==void 0?(function(e){return _t.create($n(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return x(58110);default:return x(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return ne.create(e.compositeFilter.filters.map((r=>Kf(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return x(1026)}})(e.compositeFilter.op))})(n):x(30097,{filter:n})}function Yw(n){return Fw[n]}function Zw(n){return Bw[n]}function tI(n){return jw[n]}function jn(n){return{fieldPath:n.canonicalString()}}function $n(n){return Ct.fromServerFormat(n.fieldPath)}function Qf(n){return n instanceof _t?(function(e){if(e.op==="=="){if(eh(e.value))return{unaryFilter:{field:jn(e.field),op:"IS_NAN"}};if(th(e.value))return{unaryFilter:{field:jn(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(eh(e.value))return{unaryFilter:{field:jn(e.field),op:"IS_NOT_NAN"}};if(th(e.value))return{unaryFilter:{field:jn(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:jn(e.field),op:Zw(e.op),value:e.value}}})(n):n instanceof ne?(function(e){const r=e.getFilters().map((s=>Qf(s)));return r.length===1?r[0]:{compositeFilter:{op:tI(e.op),filters:r}}})(n):x(54877,{filter:n})}function eI(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function Xf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(t,e,r,s,i=F.min(),o=F.min(),c=St.EMPTY_BYTE_STRING,u=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(t){return new Be(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Be(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Be(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Be(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nI{constructor(t){this.yt=t}}function rI(n){const t=Qw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?mi(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(){this.Cn=new iI}addToCollectionParentIndex(t,e){return this.Cn.add(e),P.resolve()}getCollectionParents(t,e){return P.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return P.resolve()}deleteFieldIndex(t,e){return P.resolve()}deleteAllFieldIndexes(t){return P.resolve()}createTargetIndexes(t,e){return P.resolve()}getDocumentsMatchingTarget(t,e){return P.resolve(null)}getIndexType(t,e){return P.resolve(0)}getFieldIndexes(t,e){return P.resolve([])}getNextCollectionGroupToUpdate(t){return P.resolve(null)}getMinOffset(t,e){return P.resolve(Qe.min())}getMinOffsetFromCollectionGroup(t,e){return P.resolve(Qe.min())}updateCollectionGroup(t,e,r){return P.resolve()}updateIndexEntries(t,e){return P.resolve()}}class iI{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new Et(X.comparator),i=!s.has(r);return this.index[e]=s.add(r),i}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new Et(X.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Yf=41943040;class Bt{static withCacheSize(t){return new Bt(t,Bt.DEFAULT_COLLECTION_PERCENTILE,Bt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Bt.DEFAULT_COLLECTION_PERCENTILE=10,Bt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Bt.DEFAULT=new Bt(Yf,Bt.DEFAULT_COLLECTION_PERCENTILE,Bt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Bt.DISABLED=new Bt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(t){this.ar=t}next(){return this.ar+=2,this.ar}static ur(){return new rr(0)}static cr(){return new rr(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh="LruGarbageCollector",oI=1048576;function _h([n,t],[e,r]){const s=W(n,e);return s===0?W(t,r):s}class aI{constructor(t){this.Ir=t,this.buffer=new Et(_h),this.Er=0}dr(){return++this.Er}Ar(t){const e=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();_h(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class cI{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(t){O(mh,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){hr(e)?O(mh,"Ignoring IndexedDB error during garbage collection: ",e):await lr(e)}await this.Vr(3e5)}))}}class uI{constructor(t,e){this.mr=t,this.params=e}calculateTargetCount(t,e){return this.mr.gr(t).next((r=>Math.floor(e/100*r)))}nthSequenceNumber(t,e){if(e===0)return P.resolve(Ui.ce);const r=new aI(e);return this.mr.forEachTarget(t,(s=>r.Ar(s.sequenceNumber))).next((()=>this.mr.pr(t,(s=>r.Ar(s))))).next((()=>r.maxValue))}removeTargets(t,e,r){return this.mr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.mr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(gh)):this.getCacheSize(t).next((r=>r<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),gh):this.yr(t,e)))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,e){let r,s,i,o,c,u,h;const f=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(t,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(t,r,e)))).next((p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(t,r)))).next((p=>(h=Date.now(),Fn()<=z.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function lI(n,t){return new uI(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hI{constructor(){this.changes=new Cn((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,bt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?P.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dI{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fI{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(r!==null&&Br(r.mutation,s,zt.empty(),rt.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.getLocalViewOfDocuments(t,r,G()).next((()=>r))))}getLocalViewOfDocuments(t,e,r=G()){const s=_n();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,r).next((i=>{let o=Dr();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(t,e){const r=_n();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,G())))}populateOverlays(t,e,r){const s=[];return r.forEach((i=>{e.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(t,s).next((i=>{i.forEach(((o,c)=>{e.set(o,c)}))}))}computeViews(t,e,r,s){let i=Re();const o=Fr(),c=(function(){return Fr()})();return e.forEach(((u,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof sn)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),Br(f.mutation,h,f.mutation.getFieldMask(),rt.now())):o.set(h.key,zt.empty())})),this.recalculateAndSaveOverlays(t,i).next((u=>(u.forEach(((h,f)=>o.set(h,f))),e.forEach(((h,f)=>c.set(h,new dI(f,o.get(h)??null)))),c)))}recalculateAndSaveOverlays(t,e){const r=Fr();let s=new ut(((o,c)=>o-c)),i=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((o=>{for(const c of o)c.keys().forEach((u=>{const h=e.get(u);if(h===null)return;let f=r.get(u)||zt.empty();f=c.applyToLocalView(h,f),r.set(u,f);const p=(s.get(c.batchId)||G()).add(u);s=s.insert(c.batchId,p)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,p=Vf();f.forEach((m=>{if(!i.has(m)){const A=xf(e.get(m),r.get(m));A!==null&&p.set(m,A),i=i.add(m)}})),o.push(this.documentOverlayCache.saveOverlays(t,h,p))}return P.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,e,r,s){return(function(o){return L.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Rf(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-i.size):P.resolve(_n());let c=Wr,u=i;return o.next((h=>P.forEach(h,((f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?P.resolve():this.remoteDocumentCache.getEntry(t,f).next((m=>{u=u.insert(f,m)}))))).next((()=>this.populateOverlays(t,h,i))).next((()=>this.computeViews(t,u,h,G()))).next((f=>({batchId:c,changes:kf(f)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new L(e)).next((r=>{let s=Dr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const i=e.collectionGroup;let o=Dr();return this.indexManager.getCollectionParents(t,i).next((c=>P.forEach(c,(u=>{const h=(function(p,m){return new dr(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(e,u.child(i));return this.getDocumentsMatchingCollectionQuery(t,h,r,s).next((f=>{f.forEach(((p,m)=>{o=o.insert(p,m)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(t,e,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,i,s)))).next((o=>{i.forEach(((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,bt.newInvalidDocument(f)))}));let c=Dr();return o.forEach(((u,h)=>{const f=i.get(u);f!==void 0&&Br(f.mutation,h,zt.empty(),rt.now()),$i(e,h)&&(c=c.insert(u,h))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pI{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,e){return P.resolve(this.Lr.get(e))}saveBundleMetadata(t,e){return this.Lr.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:Jt(s.createTime)}})(e)),P.resolve()}getNamedQuery(t,e){return P.resolve(this.kr.get(e))}saveNamedQuery(t,e){return this.kr.set(e.name,(function(s){return{name:s.name,query:rI(s.bundledQuery),readTime:Jt(s.readTime)}})(e)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gI{constructor(){this.overlays=new ut(L.comparator),this.qr=new Map}getOverlay(t,e){return P.resolve(this.overlays.get(e))}getOverlays(t,e){const r=_n();return P.forEach(e,(s=>this.getOverlay(t,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(t,e,r){return r.forEach(((s,i)=>{this.St(t,e,i)})),P.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(r)),P.resolve()}getOverlaysForCollection(t,e,r){const s=_n(),i=e.length+1,o=new L(e.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!e.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return P.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let i=new ut(((h,f)=>h-f));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===e&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=_n(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=_n(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return P.resolve(c)}St(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Ow(e,r));let i=this.qr.get(e);i===void 0&&(i=G(),this.qr.set(e,i)),this.qr.set(e,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mI{constructor(){this.sessionToken=St.EMPTY_BYTE_STRING}getSessionToken(t){return P.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{constructor(){this.Qr=new Et(At.$r),this.Ur=new Et(At.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,e){const r=new At(t,e);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(t,e){t.forEach((r=>this.addReference(r,e)))}removeReference(t,e){this.Gr(new At(t,e))}zr(t,e){t.forEach((r=>this.removeReference(r,e)))}jr(t){const e=new L(new X([])),r=new At(e,t),s=new At(e,t+1),i=[];return this.Ur.forEachInRange([r,s],(o=>{this.Gr(o),i.push(o.key)})),i}Jr(){this.Qr.forEach((t=>this.Gr(t)))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const e=new L(new X([])),r=new At(e,t),s=new At(e,t+1);let i=G();return this.Ur.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(t){const e=new At(t,0),r=this.Qr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class At{constructor(t,e){this.key=t,this.Yr=e}static $r(t,e){return L.comparator(t.key,e.key)||W(t.Yr,e.Yr)}static Kr(t,e){return W(t.Yr,e.Yr)||L.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _I{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.tr=1,this.Zr=new Et(At.$r)}checkEmpty(t){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Nw(i,e,r,s);this.mutationQueue.push(o);for(const c of s)this.Zr=this.Zr.add(new At(c.key,i)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return P.resolve(o)}lookupMutationBatch(t,e){return P.resolve(this.Xr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.ei(r),i=s<0?0:s;return P.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?Ka:this.tr-1)}getAllMutationBatches(t){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new At(e,0),s=new At(e,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],(o=>{const c=this.Xr(o.Yr);i.push(c)})),P.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new Et(W);return e.forEach((s=>{const i=new At(s,0),o=new At(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,o],(c=>{r=r.add(c.Yr)}))})),P.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let i=r;L.isDocumentKey(i)||(i=i.child(""));const o=new At(new L(i),0);let c=new Et(W);return this.Zr.forEachWhile((u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.Yr)),!0)}),o),P.resolve(this.ti(c))}ti(t){const e=[];return t.forEach((r=>{const s=this.Xr(r);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){Q(this.ni(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return P.forEach(e.mutations,(s=>{const i=new At(s.key,e.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.Zr=r}))}ir(t){}containsKey(t,e){const r=new At(e,0),s=this.Zr.firstAfterOrEqual(r);return P.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,P.resolve()}ni(t,e){return this.ei(t)}ei(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Xr(t){const e=this.ei(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yI{constructor(t){this.ri=t,this.docs=(function(){return new ut(L.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),i=s?s.size:0,o=this.ri(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return P.resolve(r?r.document.mutableCopy():bt.newInvalidDocument(e))}getEntries(t,e){let r=Re();return e.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():bt.newInvalidDocument(s))})),P.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let i=Re();const o=e.path,c=new L(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||JE(GE(f),r)<=0||(s.has(f.key)||$i(e,f))&&(i=i.insert(f.key,f.mutableCopy()))}return P.resolve(i)}getAllFromCollectionGroup(t,e,r,s){x(9500)}ii(t,e){return P.forEach(this.docs,(r=>e(r)))}newChangeBuffer(t){return new TI(this)}getSize(t){return P.resolve(this.size)}}class TI extends hI{constructor(t){super(),this.Nr=t}applyChanges(t){const e=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?e.push(this.Nr.addEntry(t,s)):this.Nr.removeEntry(r)})),P.waitFor(e)}getFromCache(t,e){return this.Nr.getEntry(t,e)}getAllFromCache(t,e){return this.Nr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EI{constructor(t){this.persistence=t,this.si=new Cn((e=>Ya(e)),Za),this.lastRemoteSnapshotVersion=F.min(),this.highestTargetId=0,this.oi=0,this._i=new ic,this.targetCount=0,this.ai=rr.ur()}forEachTarget(t,e){return this.si.forEach(((r,s)=>e(s))),P.resolve()}getLastRemoteSnapshotVersion(t){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return P.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.oi&&(this.oi=e),P.resolve()}Pr(t){this.si.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ai=new rr(e),this.highestTargetId=e),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,e){return this.Pr(e),this.targetCount+=1,P.resolve()}updateTargetData(t,e){return this.Pr(e),P.resolve()}removeTargetData(t,e){return this.si.delete(e.target),this._i.jr(e.targetId),this.targetCount-=1,P.resolve()}removeTargets(t,e,r){let s=0;const i=[];return this.si.forEach(((o,c)=>{c.sequenceNumber<=e&&r.get(c.targetId)===null&&(this.si.delete(o),i.push(this.removeMatchingKeysForTargetId(t,c.targetId)),s++)})),P.waitFor(i).next((()=>s))}getTargetCount(t){return P.resolve(this.targetCount)}getTargetData(t,e){const r=this.si.get(e)||null;return P.resolve(r)}addMatchingKeys(t,e,r){return this._i.Wr(e,r),P.resolve()}removeMatchingKeys(t,e,r){this._i.zr(e,r);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach((o=>{i.push(s.markPotentiallyOrphaned(t,o))})),P.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this._i.jr(e),P.resolve()}getMatchingKeysForTargetId(t,e){const r=this._i.Hr(e);return P.resolve(r)}containsKey(t,e){return P.resolve(this._i.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zf{constructor(t,e){this.ui={},this.overlays={},this.ci=new Ui(0),this.li=!1,this.li=!0,this.hi=new mI,this.referenceDelegate=t(this),this.Pi=new EI(this),this.indexManager=new sI,this.remoteDocumentCache=(function(s){return new yI(s)})((r=>this.referenceDelegate.Ti(r))),this.serializer=new nI(e),this.Ii=new pI(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new gI,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ui[t.toKey()];return r||(r=new _I(e,this.referenceDelegate),this.ui[t.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,e,r){O("MemoryPersistence","Starting transaction:",t);const s=new wI(this.ci.next());return this.referenceDelegate.Ei(),r(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ai(t,e){return P.or(Object.values(this.ui).map((r=>()=>r.containsKey(t,e))))}}class wI extends QE{constructor(t){super(),this.currentSequenceNumber=t}}class oc{constructor(t){this.persistence=t,this.Ri=new ic,this.Vi=null}static mi(t){return new oc(t)}get fi(){if(this.Vi)return this.Vi;throw x(60996)}addReference(t,e,r){return this.Ri.addReference(r,e),this.fi.delete(r.toString()),P.resolve()}removeReference(t,e,r){return this.Ri.removeReference(r,e),this.fi.add(r.toString()),P.resolve()}markPotentiallyOrphaned(t,e){return this.fi.add(e.toString()),P.resolve()}removeTarget(t,e){this.Ri.jr(e.targetId).forEach((s=>this.fi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((i=>this.fi.add(i.toString())))})).next((()=>r.removeTargetData(t,e)))}Ei(){this.Vi=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.fi,(r=>{const s=L.fromPath(r);return this.gi(t,s).next((i=>{i||e.removeEntry(s,F.min())}))})).next((()=>(this.Vi=null,e.apply(t))))}updateLimboDocument(t,e){return this.gi(t,e).next((r=>{r?this.fi.delete(e.toString()):this.fi.add(e.toString())}))}Ti(t){return 0}gi(t,e){return P.or([()=>P.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ai(t,e)])}}class Ei{constructor(t,e){this.persistence=t,this.pi=new Cn((r=>ZE(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=lI(this,e)}static mi(t,e){return new Ei(t,e)}Ei(){}di(t){return P.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}gr(t){const e=this.wr(t);return this.persistence.getTargetCache().getTargetCount(t).next((r=>e.next((s=>r+s))))}wr(t){let e=0;return this.pr(t,(r=>{e++})).next((()=>e))}pr(t,e){return P.forEach(this.pi,((r,s)=>this.br(t,r,s).next((i=>i?P.resolve():e(s)))))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(t,(o=>this.br(t,o,e).next((c=>{c||(r++,i.removeEntry(o,F.min()))})))).next((()=>i.apply(t))).next((()=>r))}markPotentiallyOrphaned(t,e){return this.pi.set(e,t.currentSequenceNumber),P.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.pi.set(r,t.currentSequenceNumber),P.resolve()}removeReference(t,e,r){return this.pi.set(r,t.currentSequenceNumber),P.resolve()}updateLimboDocument(t,e){return this.pi.set(e,t.currentSequenceNumber),P.resolve()}Ti(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Ys(t.data.value)),e}br(t,e,r){return P.or([()=>this.persistence.Ai(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.pi.get(e);return P.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.Es=r,this.ds=s}static As(t,e){let r=G(),s=G();for(const i of e.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new ac(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class II{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AI{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return g_()?8:XE(Dt())>0?6:4})()}initialize(t,e){this.ps=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,r,s){const i={result:null};return this.ys(t,e).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ws(t,e,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new II;return this.Ss(t,e,o).next((c=>{if(i.result=c,this.Vs)return this.bs(t,e,o,c.size)}))})).next((()=>i.result))}bs(t,e,r,s){return r.documentReadCount<this.fs?(Fn()<=z.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",Bn(e),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),P.resolve()):(Fn()<=z.DEBUG&&O("QueryEngine","Query:",Bn(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Fn()<=z.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",Bn(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,he(e))):P.resolve())}ys(t,e){if(ih(e))return P.resolve(null);let r=he(e);return this.indexManager.getIndexType(t,r).next((s=>s===0?null:(e.limit!==null&&s===1&&(e=mi(e,null,"F"),r=he(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next((i=>{const o=G(...i);return this.ps.getDocuments(t,o).next((c=>this.indexManager.getMinOffset(t,r).next((u=>{const h=this.Ds(e,c);return this.Cs(e,h,o,u.readTime)?this.ys(t,mi(e,null,"F")):this.vs(t,h,e,u)}))))})))))}ws(t,e,r,s){return ih(e)||s.isEqual(F.min())?P.resolve(null):this.ps.getDocuments(t,r).next((i=>{const o=this.Ds(e,i);return this.Cs(e,o,r,s)?P.resolve(null):(Fn()<=z.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Bn(e)),this.vs(t,o,e,WE(s,Wr)).next((c=>c)))}))}Ds(t,e){let r=new Et(Sf(t));return e.forEach(((s,i)=>{$i(t,i)&&(r=r.add(i))})),r}Cs(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(t,e,r){return Fn()<=z.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",Bn(e)),this.ps.getDocumentsMatchingQuery(t,e,Qe.min(),r)}vs(t,e,r,s){return this.ps.getDocumentsMatchingQuery(t,r,s).next((i=>(e.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cc="LocalStore",bI=3e8;class vI{constructor(t,e,r,s){this.persistence=t,this.Fs=e,this.serializer=s,this.Ms=new ut(W),this.xs=new Cn((i=>Ya(i)),Za),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(r)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new fI(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.Ms)))}}function RI(n,t,e,r){return new vI(n,t,e,r)}async function tp(n,t){const e=$(n);return await e.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,e.Bs(t),e.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],c=[];let u=G();for(const h of s){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return e.localDocuments.getDocuments(r,u).next((h=>({Ls:h,removedBatchIds:o,addedBatchIds:c})))}))}))}function CI(n,t){const e=$(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),i=e.Ns.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const p=h.batch,m=p.keys();let A=P.resolve();return m.forEach((C=>{A=A.next((()=>f.getEntry(u,C))).next((k=>{const V=h.docVersions.get(C);Q(V!==null,48541),k.version.compareTo(V)<0&&(p.applyToRemoteDocument(k,h),k.isValidDocument()&&(k.setReadTime(h.commitVersion),f.addEntry(k)))}))})),A.next((()=>c.mutationQueue.removeMutationBatch(u,p)))})(e,r,t,i).next((()=>i.apply(r))).next((()=>e.mutationQueue.performConsistencyCheck(r))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let u=G();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(t)))).next((()=>e.localDocuments.getDocuments(r,s)))}))}function ep(n){const t=$(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.Pi.getLastRemoteSnapshotVersion(e)))}function SI(n,t){const e=$(n),r=t.snapshotVersion;let s=e.Ms;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=e.Ns.newChangeBuffer({trackRemovals:!0});s=e.Ms;const c=[];t.targetChanges.forEach(((f,p)=>{const m=s.get(p);if(!m)return;c.push(e.Pi.removeMatchingKeys(i,f.removedDocuments,p).next((()=>e.Pi.addMatchingKeys(i,f.addedDocuments,p))));let A=m.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(p)!==null?A=A.withResumeToken(St.EMPTY_BYTE_STRING,F.min()).withLastLimboFreeSnapshotVersion(F.min()):f.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(f.resumeToken,r)),s=s.insert(p,A),(function(k,V,B){return k.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=bI?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0})(m,A,f)&&c.push(e.Pi.updateTargetData(i,A))}));let u=Re(),h=G();if(t.documentUpdates.forEach((f=>{t.resolvedLimboDocuments.has(f)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(PI(i,o,t.documentUpdates).next((f=>{u=f.ks,h=f.qs}))),!r.isEqual(F.min())){const f=e.Pi.getLastRemoteSnapshotVersion(i).next((p=>e.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(f)}return P.waitFor(c).next((()=>o.apply(i))).next((()=>e.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(e.Ms=s,i)))}function PI(n,t,e){let r=G(),s=G();return e.forEach((i=>r=r.add(i))),t.getEntries(n,r).next((i=>{let o=Re();return e.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(F.min())?(t.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(t.addEntry(u),o=o.insert(c,u)):O(cc,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{ks:o,qs:s}}))}function kI(n,t){const e=$(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=Ka),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function VI(n,t){const e=$(n);return e.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return e.Pi.getTargetData(r,t).next((i=>i?(s=i,P.resolve(s)):e.Pi.allocateTargetId(r).next((o=>(s=new Be(t,o,"TargetPurposeListen",r.currentSequenceNumber),e.Pi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=e.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Ms=e.Ms.insert(r.targetId,r),e.xs.set(t,r.targetId)),r}))}async function _a(n,t,e){const r=$(n),s=r.Ms.get(t),i=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!hr(o))throw o;O(cc,`Failed to update sequence numbers for target ${t}: ${o}`)}r.Ms=r.Ms.remove(t),r.xs.delete(s.target)}function yh(n,t,e){const r=$(n);let s=F.min(),i=G();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,h,f){const p=$(u),m=p.xs.get(f);return m!==void 0?P.resolve(p.Ms.get(m)):p.Pi.getTargetData(h,f)})(r,o,he(t)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>r.Fs.getDocumentsMatchingQuery(o,t,e?s:F.min(),e?i:G()))).next((c=>(DI(r,yw(t),c),{documents:c,Qs:i})))))}function DI(n,t,e){let r=n.Os.get(t)||F.min();e.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Os.set(t,r)}class Th{constructor(){this.activeTargetIds=bw()}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class NI{constructor(){this.Mo=new Th,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,e,r){this.xo[t]=e}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new Th,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OI{Oo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eh="ConnectivityMonitor";class wh{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){O(Eh,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){O(Eh,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hs=null;function ya(){return Hs===null?Hs=(function(){return 268435456+Math.round(2147483648*Math.random())})():Hs++,"0x"+Hs.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zo="RestConnection",MI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class LI{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=e+"://"+t.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===fi?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(t,e,r,s,i){const o=ya(),c=this.zo(t,e.toUriEncodedString());O(zo,`Sending RPC '${t}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,s,i);const{host:h}=new URL(c),f=nn(h);return this.Jo(t,c,u,r,f).then((p=>(O(zo,`Received RPC '${t}' ${o}: `,p),p)),(p=>{throw Zn(zo,`RPC '${t}' ${o} failed with error: `,p,"url: ",c,"request:",r),p}))}Ho(t,e,r,s,i,o){return this.Go(t,e,r,s,i)}jo(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+ur})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,i)=>t[i]=s)),r&&r.headers.forEach(((s,i)=>t[i]=s))}zo(t,e){const r=MI[t];return`${this.Uo}/v1/${e}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xI{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kt="WebChannelConnection";class UI extends LI{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,r,s,i){const o=ya();return new Promise(((c,u)=>{const h=new tf;h.setWithCredentials(!0),h.listenOnce(ef.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Xs.NO_ERROR:const p=h.getResponseJson();O(kt,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(p)),c(p);break;case Xs.TIMEOUT:O(kt,`RPC '${t}' ${o} timed out`),u(new N(S.DEADLINE_EXCEEDED,"Request time out"));break;case Xs.HTTP_ERROR:const m=h.getStatus();if(O(kt,`RPC '${t}' ${o} failed with status:`,m,"response text:",h.getResponseText()),m>0){let A=h.getResponseJson();Array.isArray(A)&&(A=A[0]);const C=A==null?void 0:A.error;if(C&&C.status&&C.message){const k=(function(B){const U=B.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(U)>=0?U:S.UNKNOWN})(C.status);u(new N(k,C.message))}else u(new N(S.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new N(S.UNAVAILABLE,"Connection failed."));break;default:x(9055,{l_:t,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{O(kt,`RPC '${t}' ${o} completed.`)}}));const f=JSON.stringify(s);O(kt,`RPC '${t}' ${o} sending request:`,s),h.send(e,"POST",f,r,15)}))}T_(t,e,r){const s=ya(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],o=sf(),c=rf(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,e,r),u.encodeInitMessageHeaders=!0;const f=i.join("");O(kt,`Creating RPC '${t}' stream ${s}: ${f}`,u);const p=o.createWebChannel(f,u);this.I_(p);let m=!1,A=!1;const C=new xI({Yo:V=>{A?O(kt,`Not sending because RPC '${t}' stream ${s} is closed:`,V):(m||(O(kt,`Opening RPC '${t}' stream ${s} transport.`),p.open(),m=!0),O(kt,`RPC '${t}' stream ${s} sending:`,V),p.send(V))},Zo:()=>p.close()}),k=(V,B,U)=>{V.listen(B,(q=>{try{U(q)}catch(J){setTimeout((()=>{throw J}),0)}}))};return k(p,Vr.EventType.OPEN,(()=>{A||(O(kt,`RPC '${t}' stream ${s} transport opened.`),C.o_())})),k(p,Vr.EventType.CLOSE,(()=>{A||(A=!0,O(kt,`RPC '${t}' stream ${s} transport closed`),C.a_(),this.E_(p))})),k(p,Vr.EventType.ERROR,(V=>{A||(A=!0,Zn(kt,`RPC '${t}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),C.a_(new N(S.UNAVAILABLE,"The operation could not be completed")))})),k(p,Vr.EventType.MESSAGE,(V=>{var B;if(!A){const U=V.data[0];Q(!!U,16349);const q=U,J=(q==null?void 0:q.error)||((B=q[0])==null?void 0:B.error);if(J){O(kt,`RPC '${t}' stream ${s} received error:`,J);const wt=J.status;let ct=(function(T){const I=mt[T];if(I!==void 0)return jf(I)})(wt),w=J.message;ct===void 0&&(ct=S.INTERNAL,w="Unknown error status: "+wt+" with message "+J.message),A=!0,C.a_(new N(ct,w)),p.close()}else O(kt,`RPC '${t}' stream ${s} received:`,U),C.u_(U)}})),k(c,nf.STAT_EVENT,(V=>{V.stat===aa.PROXY?O(kt,`RPC '${t}' stream ${s} detected buffering proxy`):V.stat===aa.NOPROXY&&O(kt,`RPC '${t}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{C.__()}),0),C}terminate(){this.c_.forEach((t=>t.close())),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter((e=>e===t))}}function Wo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wi(n){return new $w(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(t,e,r=1e3,s=1.5,i=6e4){this.Mi=t,this.timerId=e,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const e=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-r);s>0&&O("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),t()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ih="PersistentStream";class np{constructor(t,e,r,s,i,o,c,u){this.Mi=t,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new uc(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(t){this.Q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===S.RESOURCE_EXHAUSTED?(ve(e.toString()),ve("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.r_(e)}K_(){}auth(){this.state=1;const t=this.W_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===e&&this.G_(r,s)}),(r=>{t((()=>{const s=new N(S.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(t,e){const r=this.W_(this.D_);this.stream=this.j_(t,e),this.stream.Xo((()=>{r((()=>this.listener.Xo()))})),this.stream.t_((()=>{r((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return O(Ih,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Mi.enqueueAndForget((()=>this.D_===t?e():(O(Ih,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class FI extends np{constructor(t,e,r,s,i,o){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,o),this.serializer=i}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=Ww(this.serializer,t),r=(function(i){if(!("targetChange"in i))return F.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?F.min():o.readTime?Jt(o.readTime):F.min()})(t);return this.listener.H_(e,r)}Y_(t){const e={};e.database=ma(this.serializer),e.addTarget=(function(i,o){let c;const u=o.target;if(c=da(u)?{documents:Jw(i,u)}:{query:Kw(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Hf(i,o.resumeToken);const h=pa(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(F.min())>0){c.readTime=yi(i,o.snapshotVersion.toTimestamp());const h=pa(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,t);const r=Xw(this.serializer,t);r&&(e.labels=r),this.q_(e)}Z_(t){const e={};e.database=ma(this.serializer),e.removeTarget=t,this.q_(e)}}class BI extends np{constructor(t,e,r,s,i,o){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,o),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return Q(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,Q(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){Q(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=Gw(t.writeResults,t.commitTime),r=Jt(t.commitTime);return this.listener.na(r,e)}ra(){const t={};t.database=ma(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map((r=>Jf(this.serializer,r)))};this.q_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jI{}class $I extends jI{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new N(S.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,e,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Go(t,ga(e,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new N(S.UNKNOWN,i.toString())}))}Ho(t,e,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.Ho(t,ga(e,r),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(S.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class qI{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(ve(e),this.aa=!1):O("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const An="RemoteStore";class HI{constructor(t,e,r,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((o=>{r.enqueueAndForget((async()=>{Sn(this)&&(O(An,"Restarting streams for network reachability change."),await(async function(u){const h=$(u);h.Ea.add(4),await fs(h),h.Ra.set("Unknown"),h.Ea.delete(4),await Gi(h)})(this))}))})),this.Ra=new qI(r,s)}}async function Gi(n){if(Sn(n))for(const t of n.da)await t(!0)}async function fs(n){for(const t of n.da)await t(!1)}function rp(n,t){const e=$(n);e.Ia.has(t.targetId)||(e.Ia.set(t.targetId,t),fc(e)?dc(e):fr(e).O_()&&hc(e,t))}function lc(n,t){const e=$(n),r=fr(e);e.Ia.delete(t),r.O_()&&sp(e,t),e.Ia.size===0&&(r.O_()?r.L_():Sn(e)&&e.Ra.set("Unknown"))}function hc(n,t){if(n.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(F.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}fr(n).Y_(t)}function sp(n,t){n.Va.Ue(t),fr(n).Z_(t)}function dc(n){n.Va=new Uw({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),At:t=>n.Ia.get(t)||null,ht:()=>n.datastore.serializer.databaseId}),fr(n).start(),n.Ra.ua()}function fc(n){return Sn(n)&&!fr(n).x_()&&n.Ia.size>0}function Sn(n){return $(n).Ea.size===0}function ip(n){n.Va=void 0}async function zI(n){n.Ra.set("Online")}async function WI(n){n.Ia.forEach(((t,e)=>{hc(n,t)}))}async function GI(n,t){ip(n),fc(n)?(n.Ra.ha(t),dc(n)):n.Ra.set("Unknown")}async function JI(n,t,e){if(n.Ra.set("Online"),t instanceof qf&&t.state===2&&t.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ia.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ia.delete(c),s.Va.removeTarget(c))})(n,t)}catch(r){O(An,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await wi(n,r)}else if(t instanceof ei?n.Va.Ze(t):t instanceof $f?n.Va.st(t):n.Va.tt(t),!e.isEqual(F.min()))try{const r=await ep(n.localStore);e.compareTo(r)>=0&&await(function(i,o){const c=i.Va.Tt(o);return c.targetChanges.forEach(((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ia.get(h);f&&i.Ia.set(h,f.withResumeToken(u.resumeToken,o))}})),c.targetMismatches.forEach(((u,h)=>{const f=i.Ia.get(u);if(!f)return;i.Ia.set(u,f.withResumeToken(St.EMPTY_BYTE_STRING,f.snapshotVersion)),sp(i,u);const p=new Be(f.target,u,h,f.sequenceNumber);hc(i,p)})),i.remoteSyncer.applyRemoteEvent(c)})(n,e)}catch(r){O(An,"Failed to raise snapshot:",r),await wi(n,r)}}async function wi(n,t,e){if(!hr(t))throw t;n.Ea.add(1),await fs(n),n.Ra.set("Offline"),e||(e=()=>ep(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{O(An,"Retrying IndexedDB access"),await e(),n.Ea.delete(1),await Gi(n)}))}function op(n,t){return t().catch((e=>wi(n,e,t)))}async function Ji(n){const t=$(n),e=tn(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:Ka;for(;KI(t);)try{const s=await kI(t.localStore,r);if(s===null){t.Ta.length===0&&e.L_();break}r=s.batchId,QI(t,s)}catch(s){await wi(t,s)}ap(t)&&cp(t)}function KI(n){return Sn(n)&&n.Ta.length<10}function QI(n,t){n.Ta.push(t);const e=tn(n);e.O_()&&e.X_&&e.ea(t.mutations)}function ap(n){return Sn(n)&&!tn(n).x_()&&n.Ta.length>0}function cp(n){tn(n).start()}async function XI(n){tn(n).ra()}async function YI(n){const t=tn(n);for(const e of n.Ta)t.ea(e.mutations)}async function ZI(n,t,e){const r=n.Ta.shift(),s=nc.from(r,t,e);await op(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Ji(n)}async function tA(n,t){t&&tn(n).X_&&await(async function(r,s){if((function(o){return Bf(o)&&o!==S.ABORTED})(s.code)){const i=r.Ta.shift();tn(r).B_(),await op(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Ji(r)}})(n,t),ap(n)&&cp(n)}async function Ah(n,t){const e=$(n);e.asyncQueue.verifyOperationInProgress(),O(An,"RemoteStore received new credentials");const r=Sn(e);e.Ea.add(3),await fs(e),r&&e.Ra.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await Gi(e)}async function eA(n,t){const e=$(n);t?(e.Ea.delete(2),await Gi(e)):t||(e.Ea.add(2),await fs(e),e.Ra.set("Unknown"))}function fr(n){return n.ma||(n.ma=(function(e,r,s){const i=$(e);return i.sa(),new FI(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:zI.bind(null,n),t_:WI.bind(null,n),r_:GI.bind(null,n),H_:JI.bind(null,n)}),n.da.push((async t=>{t?(n.ma.B_(),fc(n)?dc(n):n.Ra.set("Unknown")):(await n.ma.stop(),ip(n))}))),n.ma}function tn(n){return n.fa||(n.fa=(function(e,r,s){const i=$(e);return i.sa(),new BI(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:XI.bind(null,n),r_:tA.bind(null,n),ta:YI.bind(null,n),na:ZI.bind(null,n)}),n.da.push((async t=>{t?(n.fa.B_(),await Ji(n)):(await n.fa.stop(),n.Ta.length>0&&(O(An,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(t,e,r,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new we,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,i){const o=Date.now()+r,c=new pc(t,e,o,s,i);return c.start(r),c}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(S.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function gc(n,t){if(ve("AsyncQueue",`${t}: ${n}`),hr(n))return new N(S.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{static emptySet(t){return new Kn(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||L.comparator(e.key,r.key):(e,r)=>L.comparator(e.key,r.key),this.keyedMap=Dr(),this.sortedSet=new ut(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,r)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Kn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new Kn;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bh{constructor(){this.ga=new ut(L.comparator)}track(t){const e=t.doc.key,r=this.ga.get(e);r?t.type!==0&&r.type===3?this.ga=this.ga.insert(e,t):t.type===3&&r.type!==1?this.ga=this.ga.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.ga=this.ga.remove(e):t.type===1&&r.type===2?this.ga=this.ga.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):x(63341,{Rt:t,pa:r}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal(((e,r)=>{t.push(r)})),t}}class sr{constructor(t,e,r,s,i,o,c,u,h){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(t,e,r,s,i){const o=[];return e.forEach((c=>{o.push({type:0,doc:c})})),new sr(t,e,Kn.emptySet(e),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&ji(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nA{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((t=>t.Da()))}}class rA{constructor(){this.queries=vh(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,r){const s=$(e),i=s.queries;s.queries=vh(),i.forEach(((o,c)=>{for(const u of c.Sa)u.onError(r)}))})(this,new N(S.ABORTED,"Firestore shutting down"))}}function vh(){return new Cn((n=>Cf(n)),ji)}async function up(n,t){const e=$(n);let r=3;const s=t.query;let i=e.queries.get(s);i?!i.ba()&&t.Da()&&(r=2):(i=new nA,r=t.Da()?0:1);try{switch(r){case 0:i.wa=await e.onListen(s,!0);break;case 1:i.wa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(o){const c=gc(o,`Initialization of query '${Bn(t.query)}' failed`);return void t.onError(c)}e.queries.set(s,i),i.Sa.push(t),t.va(e.onlineState),i.wa&&t.Fa(i.wa)&&mc(e)}async function lp(n,t){const e=$(n),r=t.query;let s=3;const i=e.queries.get(r);if(i){const o=i.Sa.indexOf(t);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=t.Da()?0:1:!i.ba()&&t.Da()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function sA(n,t){const e=$(n);let r=!1;for(const s of t){const i=s.query,o=e.queries.get(i);if(o){for(const c of o.Sa)c.Fa(s)&&(r=!0);o.wa=s}}r&&mc(e)}function iA(n,t,e){const r=$(n),s=r.queries.get(t);if(s)for(const i of s.Sa)i.onError(e);r.queries.delete(t)}function mc(n){n.Ca.forEach((t=>{t.next()}))}var Ta,Rh;(Rh=Ta||(Ta={})).Ma="default",Rh.Cache="cache";class hp{constructor(t,e,r){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new sr(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const r=e!=="Offline";return(!this.options.qa||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=sr.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==Ta.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dp{constructor(t){this.key=t}}class fp{constructor(t){this.key=t}}class oA{constructor(t,e){this.query=t,this.Ya=e,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=G(),this.mutatedKeys=G(),this.eu=Sf(t),this.tu=new Kn(this.eu)}get nu(){return this.Ya}ru(t,e){const r=e?e.iu:new bh,s=e?e.tu:this.tu;let i=e?e.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((f,p)=>{const m=s.get(f),A=$i(this.query,p)?p:null,C=!!m&&this.mutatedKeys.has(m.key),k=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let V=!1;m&&A?m.data.isEqual(A.data)?C!==k&&(r.track({type:3,doc:A}),V=!0):this.su(m,A)||(r.track({type:2,doc:A}),V=!0,(u&&this.eu(A,u)>0||h&&this.eu(A,h)<0)&&(c=!0)):!m&&A?(r.track({type:0,doc:A}),V=!0):m&&!A&&(r.track({type:1,doc:m}),V=!0,(u||h)&&(c=!0)),V&&(A?(o=o.add(A),i=k?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{tu:o,iu:r,Cs:c,mutatedKeys:i}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const i=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const o=t.iu.ya();o.sort(((f,p)=>(function(A,C){const k=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return x(20277,{Rt:V})}};return k(A)-k(C)})(f.type,p.type)||this.eu(f.doc,p.doc))),this.ou(r),s=s??!1;const c=e&&!s?this._u():[],u=this.Xa.size===0&&this.current&&!s?1:0,h=u!==this.Za;return this.Za=u,o.length!==0||h?{snapshot:new sr(this.query,t.tu,i,o,t.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new bh,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(t){return!this.Ya.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach((e=>this.Ya=this.Ya.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Ya=this.Ya.delete(e))),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Xa;this.Xa=G(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))}));const e=[];return t.forEach((r=>{this.Xa.has(r)||e.push(new fp(r))})),this.Xa.forEach((r=>{t.has(r)||e.push(new dp(r))})),e}cu(t){this.Ya=t.Qs,this.Xa=G();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return sr.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const _c="SyncEngine";class aA{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class cA{constructor(t){this.key=t,this.hu=!1}}class uA{constructor(t,e,r,s,i,o){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new Cn((c=>Cf(c)),ji),this.Iu=new Map,this.Eu=new Set,this.du=new ut(L.comparator),this.Au=new Map,this.Ru=new ic,this.Vu={},this.mu=new Map,this.fu=rr.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function lA(n,t,e=!0){const r=Tp(n);let s;const i=r.Tu.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await pp(r,t,e,!0),s}async function hA(n,t){const e=Tp(n);await pp(e,t,!0,!1)}async function pp(n,t,e,r){const s=await VI(n.localStore,he(t)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,e);let c;return r&&(c=await dA(n,t,i,o==="current",s.resumeToken)),n.isPrimaryClient&&e&&rp(n.remoteStore,s),c}async function dA(n,t,e,r,s){n.pu=(p,m,A)=>(async function(k,V,B,U){let q=V.view.ru(B);q.Cs&&(q=await yh(k.localStore,V.query,!1).then((({documents:w})=>V.view.ru(w,q))));const J=U&&U.targetChanges.get(V.targetId),wt=U&&U.targetMismatches.get(V.targetId)!=null,ct=V.view.applyChanges(q,k.isPrimaryClient,J,wt);return Sh(k,V.targetId,ct.au),ct.snapshot})(n,p,m,A);const i=await yh(n.localStore,t,!0),o=new oA(t,i.Qs),c=o.ru(i.documents),u=ds.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),h=o.applyChanges(c,n.isPrimaryClient,u);Sh(n,e,h.au);const f=new aA(t,e,o);return n.Tu.set(t,f),n.Iu.has(e)?n.Iu.get(e).push(t):n.Iu.set(e,[t]),h.snapshot}async function fA(n,t,e){const r=$(n),s=r.Tu.get(t),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter((o=>!ji(o,t)))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await _a(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),e&&lc(r.remoteStore,s.targetId),Ea(r,s.targetId)})).catch(lr)):(Ea(r,s.targetId),await _a(r.localStore,s.targetId,!0))}async function pA(n,t){const e=$(n),r=e.Tu.get(t),s=e.Iu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),lc(e.remoteStore,r.targetId))}async function gA(n,t,e){const r=IA(n);try{const s=await(function(o,c){const u=$(o),h=rt.now(),f=c.reduce(((A,C)=>A.add(C.key)),G());let p,m;return u.persistence.runTransaction("Locally write mutations","readwrite",(A=>{let C=Re(),k=G();return u.Ns.getEntries(A,f).next((V=>{C=V,C.forEach(((B,U)=>{U.isValidDocument()||(k=k.add(B))}))})).next((()=>u.localDocuments.getOverlayedDocuments(A,C))).next((V=>{p=V;const B=[];for(const U of c){const q=Dw(U,p.get(U.key).overlayedDocument);q!=null&&B.push(new sn(U.key,q,Tf(q.value.mapValue),jt.exists(!0)))}return u.mutationQueue.addMutationBatch(A,h,B,c)})).next((V=>{m=V;const B=V.applyToLocalDocumentSet(p,k);return u.documentOverlayCache.saveOverlays(A,V.batchId,B)}))})).then((()=>({batchId:m.batchId,changes:kf(p)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(o,c,u){let h=o.Vu[o.currentUser.toKey()];h||(h=new ut(W)),h=h.insert(c,u),o.Vu[o.currentUser.toKey()]=h})(r,s.batchId,e),await ps(r,s.changes),await Ji(r.remoteStore)}catch(s){const i=gc(s,"Failed to persist write");e.reject(i)}}async function gp(n,t){const e=$(n);try{const r=await SI(e.localStore,t);t.targetChanges.forEach(((s,i)=>{const o=e.Au.get(i);o&&(Q(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?Q(o.hu,14607):s.removedDocuments.size>0&&(Q(o.hu,42227),o.hu=!1))})),await ps(e,r,t)}catch(r){await lr(r)}}function Ch(n,t,e){const r=$(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Tu.forEach(((i,o)=>{const c=o.view.va(t);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const u=$(o);u.onlineState=c;let h=!1;u.queries.forEach(((f,p)=>{for(const m of p.Sa)m.va(c)&&(h=!0)})),h&&mc(u)})(r.eventManager,t),s.length&&r.Pu.H_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function mA(n,t,e){const r=$(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Au.get(t),i=s&&s.key;if(i){let o=new ut(L.comparator);o=o.insert(i,bt.newNoDocument(i,F.min()));const c=G().add(i),u=new zi(F.min(),new Map,new ut(W),o,c);await gp(r,u),r.du=r.du.remove(i),r.Au.delete(t),yc(r)}else await _a(r.localStore,t,!1).then((()=>Ea(r,t,e))).catch(lr)}async function _A(n,t){const e=$(n),r=t.batch.batchId;try{const s=await CI(e.localStore,t);_p(e,r,null),mp(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await ps(e,s)}catch(s){await lr(s)}}async function yA(n,t,e){const r=$(n);try{const s=await(function(o,c){const u=$(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((p=>(Q(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(h,p)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(r.localStore,t);_p(r,t,e),mp(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await ps(r,s)}catch(s){await lr(s)}}function mp(n,t){(n.mu.get(t)||[]).forEach((e=>{e.resolve()})),n.mu.delete(t)}function _p(n,t,e){const r=$(n);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),r.Vu[r.currentUser.toKey()]=s}}function Ea(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Iu.get(t))n.Tu.delete(r),e&&n.Pu.yu(r,e);n.Iu.delete(t),n.isPrimaryClient&&n.Ru.jr(t).forEach((r=>{n.Ru.containsKey(r)||yp(n,r)}))}function yp(n,t){n.Eu.delete(t.path.canonicalString());const e=n.du.get(t);e!==null&&(lc(n.remoteStore,e),n.du=n.du.remove(t),n.Au.delete(e),yc(n))}function Sh(n,t,e){for(const r of e)r instanceof dp?(n.Ru.addReference(r.key,t),TA(n,r)):r instanceof fp?(O(_c,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,t),n.Ru.containsKey(r.key)||yp(n,r.key)):x(19791,{wu:r})}function TA(n,t){const e=t.key,r=e.path.canonicalString();n.du.get(e)||n.Eu.has(r)||(O(_c,"New document in limbo: "+e),n.Eu.add(r),yc(n))}function yc(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const t=n.Eu.values().next().value;n.Eu.delete(t);const e=new L(X.fromString(t)),r=n.fu.next();n.Au.set(r,new cA(e)),n.du=n.du.insert(e,r),rp(n.remoteStore,new Be(he(Bi(e.path)),r,"TargetPurposeLimboResolution",Ui.ce))}}async function ps(n,t,e){const r=$(n),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach(((c,u)=>{o.push(r.pu(u,t,e).then((h=>{var f;if((h||e)&&r.isPrimaryClient){const p=h?!h.fromCache:(f=e==null?void 0:e.targetChanges.get(u.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(h){s.push(h);const p=ac.As(u.targetId,h);i.push(p)}})))})),await Promise.all(o),r.Pu.H_(s),await(async function(u,h){const f=$(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>P.forEach(h,(m=>P.forEach(m.Es,(A=>f.persistence.referenceDelegate.addReference(p,m.targetId,A))).next((()=>P.forEach(m.ds,(A=>f.persistence.referenceDelegate.removeReference(p,m.targetId,A)))))))))}catch(p){if(!hr(p))throw p;O(cc,"Failed to update sequence numbers: "+p)}for(const p of h){const m=p.targetId;if(!p.fromCache){const A=f.Ms.get(m),C=A.snapshotVersion,k=A.withLastLimboFreeSnapshotVersion(C);f.Ms=f.Ms.insert(m,k)}}})(r.localStore,i))}async function EA(n,t){const e=$(n);if(!e.currentUser.isEqual(t)){O(_c,"User change. New user:",t.toKey());const r=await tp(e.localStore,t);e.currentUser=t,(function(i,o){i.mu.forEach((c=>{c.forEach((u=>{u.reject(new N(S.CANCELLED,o))}))})),i.mu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await ps(e,r.Ls)}}function wA(n,t){const e=$(n),r=e.Au.get(t);if(r&&r.hu)return G().add(r.key);{let s=G();const i=e.Iu.get(t);if(!i)return s;for(const o of i){const c=e.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}function Tp(n){const t=$(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=gp.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=wA.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=mA.bind(null,t),t.Pu.H_=sA.bind(null,t.eventManager),t.Pu.yu=iA.bind(null,t.eventManager),t}function IA(n){const t=$(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=_A.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=yA.bind(null,t),t}class Ii{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Wi(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return RI(this.persistence,new AI,t.initialUser,this.serializer)}Cu(t){return new Zf(oc.mi,this.serializer)}Du(t){return new NI}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ii.provider={build:()=>new Ii};class AA extends Ii{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){Q(this.persistence.referenceDelegate instanceof Ei,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new cI(r,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?Bt.withCacheSize(this.cacheSizeBytes):Bt.DEFAULT;return new Zf((r=>Ei.mi(r,e)),this.serializer)}}class wa{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ch(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=EA.bind(null,this.syncEngine),await eA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new rA})()}createDatastore(t){const e=Wi(t.databaseInfo.databaseId),r=(function(i){return new UI(i)})(t.databaseInfo);return(function(i,o,c,u){return new $I(i,o,c,u)})(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return(function(r,s,i,o,c){return new HI(r,s,i,o,c)})(this.localStore,this.datastore,t.asyncQueue,(e=>Ch(this.syncEngine,e,0)),(function(){return wh.v()?new wh:new OI})())}createSyncEngine(t,e){return(function(s,i,o,c,u,h,f){const p=new uA(s,i,o,c,u,h);return f&&(p.gu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await(async function(s){const i=$(s);O(An,"RemoteStore shutting down."),i.Ea.add(5),await fs(i),i.Aa.shutdown(),i.Ra.set("Unknown")})(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}wa.provider={build:()=>new wa};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):ve("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bA{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new N(S.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const e=await(async function(s,i){const o=$(s),c={documents:i.map((p=>Ti(o.serializer,p)))},u=await o.Ho("BatchGetDocuments",o.serializer.databaseId,X.emptyPath(),c,i.length),h=new Map;u.forEach((p=>{const m=zw(o.serializer,p);h.set(m.key.toString(),m)}));const f=[];return i.forEach((p=>{const m=h.get(p.toString());Q(!!m,55234,{key:p}),f.push(m)})),f})(this.datastore,t);return e.forEach((r=>this.recordVersion(r))),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(t.toString())}delete(t){this.write(new ec(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach((e=>{t.delete(e.key.toString())})),t.forEach(((e,r)=>{const s=L.fromPath(r);this.mutations.push(new Ff(s,this.precondition(s)))})),await(async function(r,s){const i=$(r),o={writes:s.map((c=>Jf(i.serializer,c)))};await i.Go("Commit",i.serializer.databaseId,X.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw x(50498,{Gu:t.constructor.name});e=F.min()}const r=this.readVersions.get(t.key.toString());if(r){if(!e.isEqual(r))throw new N(S.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?e.isEqual(F.min())?jt.exists(!1):jt.updateTime(e):jt.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(F.min()))throw new N(S.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return jt.updateTime(e)}return jt.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vA{constructor(t,e,r,s,i){this.asyncQueue=t,this.datastore=e,this.options=r,this.updateFunction=s,this.deferred=i,this.zu=r.maxAttempts,this.M_=new uc(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_((async()=>{const t=new bA(this.datastore),e=this.Hu(t);e&&e.then((r=>{this.asyncQueue.enqueueAndForget((()=>t.commit().then((()=>{this.deferred.resolve(r)})).catch((s=>{this.Yu(s)}))))})).catch((r=>{this.Yu(r)}))}))}Hu(t){try{const e=this.updateFunction(t);return!ls(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Yu(t){this.zu>0&&this.Zu(t)?(this.zu-=1,this.asyncQueue.enqueueAndForget((()=>(this.Ju(),Promise.resolve())))):this.deferred.reject(t)}Zu(t){if((t==null?void 0:t.name)==="FirebaseError"){const e=t.code;return e==="aborted"||e==="failed-precondition"||e==="already-exists"||!Bf(e)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const en="FirestoreClient";class RA{constructor(t,e,r,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=s,this.user=Vt.UNAUTHENTICATED,this.clientId=Ja.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{O(en,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(O(en,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new we;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=gc(e,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function Go(n,t){n.asyncQueue.verifyOperationInProgress(),O(en,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await tp(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=t}async function Ph(n,t){n.asyncQueue.verifyOperationInProgress();const e=await CA(n);O(en,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener((r=>Ah(t.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Ah(t.remoteStore,s))),n._onlineComponents=t}async function CA(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O(en,"Using user provided OfflineComponentProvider");try{await Go(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===S.FAILED_PRECONDITION||s.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;Zn("Error using user provided cache. Falling back to memory cache: "+e),await Go(n,new Ii)}}else O(en,"Using default OfflineComponentProvider"),await Go(n,new AA(void 0));return n._offlineComponents}async function Tc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O(en,"Using user provided OnlineComponentProvider"),await Ph(n,n._uninitializedComponentsProvider._online)):(O(en,"Using default OnlineComponentProvider"),await Ph(n,new wa))),n._onlineComponents}function SA(n){return Tc(n).then((t=>t.syncEngine))}function PA(n){return Tc(n).then((t=>t.datastore))}async function Ia(n){const t=await Tc(n),e=t.eventManager;return e.onListen=lA.bind(null,t.syncEngine),e.onUnlisten=fA.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=hA.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=pA.bind(null,t.syncEngine),e}function kA(n,t,e={}){const r=new we;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,h){const f=new Ep({next:m=>{f.Nu(),o.enqueueAndForget((()=>lp(i,p)));const A=m.docs.has(c);!A&&m.fromCache?h.reject(new N(S.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&m.fromCache&&u&&u.source==="server"?h.reject(new N(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(m)},error:m=>h.reject(m)}),p=new hp(Bi(c.path),f,{includeMetadataChanges:!0,qa:!0});return up(i,p)})(await Ia(n),n.asyncQueue,t,e,r))),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wp(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kh=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ip="firestore.googleapis.com",Vh=!0;class Dh{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new N(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Ip,this.ssl=Vh}else this.host=t.host,this.ssl=t.ssl??Vh;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Yf;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<oI)throw new N(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}zE("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=wp(t.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new N(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new N(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new N(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Ki{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Dh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new N(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Dh(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new ME;switch(r.type){case"firstParty":return new FE(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=kh.get(e);r&&(O("ComponentProvider","Removing Datastore"),kh.delete(e),r.terminate())})(this),Promise.resolve()}}function VA(n,t,e,r={}){var h;n=Ie(n,Ki);const s=nn(t),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},c=`${t}:${e}`;s&&(Va(`https://${c}`),Da("Firestore",!0)),i.host!==Ip&&i.host!==c&&Zn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:r};if(!Tn(u,o)&&(n._setSettings(u),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=Vt.MOCK_USER;else{f=fd(r.mockUserToken,(h=n._app)==null?void 0:h.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new N(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Vt(m)}n._authCredentials=new LE(new af(f,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new on(this.firestore,t,this._query)}}class ht{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new We(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new ht(this.firestore,t,this._key)}toJSON(){return{type:ht._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(us(e,ht._jsonSchema))return new ht(t,r||null,new L(X.fromString(e.referencePath)))}}ht._jsonSchemaVersion="firestore/documentReference/1.0",ht._jsonSchema={type:yt("string",ht._jsonSchemaVersion),referencePath:yt("string")};class We extends on{constructor(t,e,r){super(t,e,Bi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new ht(this.firestore,null,new L(t))}withConverter(t){return new We(this.firestore,t,this._path)}}function DA(n,t,...e){if(n=it(n),cf("collection","path",t),n instanceof Ki){const r=X.fromString(t,...e);return zl(r),new We(n,null,r)}{if(!(n instanceof ht||n instanceof We))throw new N(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(X.fromString(t,...e));return zl(r),new We(n.firestore,null,r)}}function Pn(n,t,...e){if(n=it(n),arguments.length===1&&(t=Ja.newId()),cf("doc","path",t),n instanceof Ki){const r=X.fromString(t,...e);return Hl(r),new ht(n,null,new L(r))}{if(!(n instanceof ht||n instanceof We))throw new N(S.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(X.fromString(t,...e));return Hl(r),new ht(n.firestore,n instanceof We?n.converter:null,new L(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nh="AsyncQueue";class Oh{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new uc(this,"async_queue_retry"),this._c=()=>{const r=Wo();r&&O(Nh,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=t;const e=Wo();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=Wo();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new we;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Xu.push(t),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!hr(t))throw t;O(Nh,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((r=>{throw this.nc=r,this.rc=!1,ve("INTERNAL UNHANDLED ERROR: ",Mh(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=e,e}enqueueAfterDelay(t,e,r){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=pc.createAndSchedule(this,t,e,r,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&x(47125,{Pc:Mh(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then((()=>{this.tc.sort(((e,r)=>e.targetTimeMs-r.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}dc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function Mh(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lh(n){return(function(e,r){if(typeof e!="object"||e===null)return!1;const s=e;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}class ir extends Ki{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new Oh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Oh(t),this._firestoreClient=void 0,await t}}}function NA(n,t){const e=typeof n=="object"?n:Ma(),r=typeof n=="string"?n:fi,s=Ni(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=ld("firestore");i&&VA(s,...i)}return s}function Qi(n){if(n._terminated)throw new N(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||OA(n),n._firestoreClient}function OA(n){var r,s,i;const t=n._freezeSettings(),e=(function(c,u,h,f){return new nw(c,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,wp(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)})(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,t);n._componentsProvider||(s=t.localCache)!=null&&s._offlineComponentProvider&&((i=t.localCache)!=null&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new RA(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&(function(c){const u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Ht(St.fromBase64String(t))}catch(e){throw new N(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Ht(St.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Ht._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(us(t,Ht._jsonSchema))return Ht.fromBase64String(t.bytes)}}Ht._jsonSchemaVersion="firestore/bytes/1.0",Ht._jsonSchema={type:yt("string",Ht._jsonSchemaVersion),bytes:yt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new N(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ct(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new N(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new N(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return W(this._lat,t._lat)||W(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:de._jsonSchemaVersion}}static fromJSON(t){if(us(t,de._jsonSchema))return new de(t.latitude,t.longitude)}}de._jsonSchemaVersion="firestore/geoPoint/1.0",de._jsonSchema={type:yt("string",de._jsonSchemaVersion),latitude:yt("number"),longitude:yt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,t._values)}toJSON(){return{type:fe._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(us(t,fe._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new fe(t.vectorValues);throw new N(S.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}fe._jsonSchemaVersion="firestore/vectorValue/1.0",fe._jsonSchema={type:yt("string",fe._jsonSchemaVersion),vectorValues:yt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MA=/^__.*__$/;class LA{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new sn(t,this.data,this.fieldMask,e,this.fieldTransforms):new hs(t,this.data,e,this.fieldTransforms)}}class Ap{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new sn(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function bp(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw x(40011,{Ac:n})}}class Ec{constructor(t,e,r,s,i,o){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new Ec({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.Vc({path:e,fc:!1});return r.gc(t),r}yc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.Vc({path:e,fc:!1});return r.Rc(),r}wc(t){return this.Vc({path:void 0,fc:!0})}Sc(t){return Ai(t,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}Rc(){if(this.path)for(let t=0;t<this.path.length;t++)this.gc(this.path.get(t))}gc(t){if(t.length===0)throw this.Sc("Document fields must not be empty");if(bp(this.Ac)&&MA.test(t))throw this.Sc('Document fields cannot begin and end with "__"')}}class xA{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Wi(t)}Cc(t,e,r,s=!1){return new Ec({Ac:t,methodName:e,Dc:r,path:Ct.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function wc(n){const t=n._freezeSettings(),e=Wi(n._databaseId);return new xA(n._databaseId,!!t.ignoreUndefinedProperties,e)}function vp(n,t,e,r,s,i={}){const o=n.Cc(i.merge||i.mergeFields?2:0,t,e,s);Ac("Data must be an object, but it was:",o,r);const c=Rp(r,o);let u,h;if(i.merge)u=new zt(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const m=Aa(t,p,e);if(!o.contains(m))throw new N(S.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);Sp(f,m)||f.push(m)}u=new zt(f),h=o.fieldTransforms.filter((p=>u.covers(p.field)))}else u=null,h=o.fieldTransforms;return new LA(new xt(c),u,h)}class Zi extends Yi{_toFieldTransform(t){if(t.Ac!==2)throw t.Ac===1?t.Sc(`${this._methodName}() can only appear at the top level of your update data`):t.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Zi}}class Ic extends Yi{_toFieldTransform(t){return new Sw(t.path,new Xr)}isEqual(t){return t instanceof Ic}}function UA(n,t,e,r){const s=n.Cc(1,t,e);Ac("Data must be an object, but it was:",s,r);const i=[],o=xt.empty();rn(r,((u,h)=>{const f=bc(t,u,e);h=it(h);const p=s.yc(f);if(h instanceof Zi)i.push(f);else{const m=gs(h,p);m!=null&&(i.push(f),o.set(f,m))}}));const c=new zt(i);return new Ap(o,c,s.fieldTransforms)}function FA(n,t,e,r,s,i){const o=n.Cc(1,t,e),c=[Aa(t,r,e)],u=[s];if(i.length%2!=0)throw new N(S.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<i.length;m+=2)c.push(Aa(t,i[m])),u.push(i[m+1]);const h=[],f=xt.empty();for(let m=c.length-1;m>=0;--m)if(!Sp(h,c[m])){const A=c[m];let C=u[m];C=it(C);const k=o.yc(A);if(C instanceof Zi)h.push(A);else{const V=gs(C,k);V!=null&&(h.push(A),f.set(A,V))}}const p=new zt(h);return new Ap(f,p,o.fieldTransforms)}function BA(n,t,e,r=!1){return gs(e,n.Cc(r?4:3,t))}function gs(n,t){if(Cp(n=it(n)))return Ac("Unsupported field value:",t,n),Rp(n,t);if(n instanceof Yi)return(function(r,s){if(!bp(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.fc&&t.Ac!==4)throw t.Sc("Nested arrays are not supported");return(function(r,s){const i=[];let o=0;for(const c of r){let u=gs(c,s.wc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}})(n,t)}return(function(r,s){if((r=it(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return vw(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=rt.fromDate(r);return{timestampValue:yi(s.serializer,i)}}if(r instanceof rt){const i=new rt(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:yi(s.serializer,i)}}if(r instanceof de)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ht)return{bytesValue:Hf(s.serializer,r._byteString)};if(r instanceof ht){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Sc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:sc(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof fe)return(function(o,c){return{mapValue:{fields:{[_f]:{stringValue:yf},[pi]:{arrayValue:{values:o.toArray().map((h=>{if(typeof h!="number")throw c.Sc("VectorValues must only contain numeric values.");return tc(c.serializer,h)}))}}}}}})(r,s);throw s.Sc(`Unsupported field value: ${xi(r)}`)})(n,t)}function Rp(n,t){const e={};return hf(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):rn(n,((r,s)=>{const i=gs(s,t.mc(r));i!=null&&(e[r]=i)})),{mapValue:{fields:e}}}function Cp(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof rt||n instanceof de||n instanceof Ht||n instanceof ht||n instanceof Yi||n instanceof fe)}function Ac(n,t,e){if(!Cp(e)||!uf(e)){const r=xi(e);throw r==="an object"?t.Sc(n+" a custom object"):t.Sc(n+" "+r)}}function Aa(n,t,e){if((t=it(t))instanceof Xi)return t._internalPath;if(typeof t=="string")return bc(n,t);throw Ai("Field path arguments must be of type string or ",n,!1,void 0,e)}const jA=new RegExp("[~\\*/\\[\\]]");function bc(n,t,e){if(t.search(jA)>=0)throw Ai(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Xi(...t.split("."))._internalPath}catch{throw Ai(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Ai(n,t,e,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new N(S.INVALID_ARGUMENT,c+n+u)}function Sp(n,t){return n.some((e=>e.isEqual(t)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(t,e,r,s,i){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ht(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new $A(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(vc("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class $A extends bi{data(){return super.data()}}function vc(n,t){return typeof t=="string"?bc(n,t):t instanceof Xi?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qA(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new N(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Rc{}class Cc extends Rc{}function HA(n,t,...e){let r=[];t instanceof Rc&&r.push(t),r=r.concat(e),(function(i){const o=i.filter((u=>u instanceof Pc)).length,c=i.filter((u=>u instanceof Sc)).length;if(o>1||o>0&&c>0)throw new N(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class Sc extends Cc{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new Sc(t,e,r)}_apply(t){const e=this._parse(t);return Pp(t._query,e),new on(t.firestore,t.converter,fa(t._query,e))}_parse(t){const e=wc(t.firestore);return(function(i,o,c,u,h,f,p){let m;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new N(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Uh(p,f);const C=[];for(const k of p)C.push(xh(u,i,k));m={arrayValue:{values:C}}}else m=xh(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Uh(p,f),m=BA(c,o,p,f==="in"||f==="not-in");return _t.create(h,f,m)})(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}class Pc extends Rc{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new Pc(t,e)}_parse(t){const e=this._queryConstraints.map((r=>r._parse(t))).filter((r=>r.getFilters().length>0));return e.length===1?e[0]:ne.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)Pp(o,u),o=fa(o,u)})(t._query,e),new on(t.firestore,t.converter,fa(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class kc extends Cc{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new kc(t,e)}_apply(t){const e=(function(s,i,o){if(s.startAt!==null)throw new N(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new N(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Qr(i,o)})(t._query,this._field,this._direction);return new on(t.firestore,t.converter,(function(s,i){const o=s.explicitOrderBy.concat([i]);return new dr(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)})(t._query,e))}}function zA(n,t="asc"){const e=t,r=vc("orderBy",n);return kc._create(r,e)}class Vc extends Cc{constructor(t,e,r){super(),this.type=t,this._limit=e,this._limitType=r}static _create(t,e,r){return new Vc(t,e,r)}_apply(t){return new on(t.firestore,t.converter,mi(t._query,this._limit,this._limitType))}}function WA(n){return Vc._create("limit",n,"F")}function xh(n,t,e){if(typeof(e=it(e))=="string"){if(e==="")throw new N(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Rf(t)&&e.indexOf("/")!==-1)throw new N(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(X.fromString(e));if(!L.isDocumentKey(r))throw new N(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Zl(n,new L(r))}if(e instanceof ht)return Zl(n,e._key);throw new N(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${xi(e)}.`)}function Uh(n,t){if(!Array.isArray(n)||n.length===0)throw new N(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Pp(n,t){const e=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(e!==null)throw e===t.op?new N(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new N(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class kp{convertValue(t,e="none"){switch(Ze(t)){case 0:return null;case 1:return t.booleanValue;case 2:return gt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Ye(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw x(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return rn(t,((s,i)=>{r[s]=this.convertValue(i,e)})),r}convertVectorValue(t){var r,s,i;const e=(i=(s=(r=t.fields)==null?void 0:r[pi].arrayValue)==null?void 0:s.values)==null?void 0:i.map((o=>gt(o.doubleValue)));return new fe(e)}convertGeoPoint(t){return new de(gt(t.latitude),gt(t.longitude))}convertArray(t,e){return(t.values||[]).map((r=>this.convertValue(r,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Fi(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Gr(t));default:return null}}convertTimestamp(t){const e=Xe(t);return new rt(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=X.fromString(t);Q(Xf(r),9688,{name:t});const s=new Jr(r.get(1),r.get(3)),i=new L(r.popFirst(5));return s.isEqual(e)||ve(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vp(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}class GA extends kp{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ht(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new ht(this.firestore,null,e)}}class Hn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Ge extends bi{constructor(t,e,r,s,i,o){super(t,e,r,s,o),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new ni(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(vc("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new N(S.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=Ge._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}Ge._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ge._jsonSchema={type:yt("string",Ge._jsonSchemaVersion),bundleSource:yt("string","DocumentSnapshot"),bundleName:yt("string"),bundle:yt("string")};class ni extends Ge{data(t={}){return super.data(t)}}class Qn{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Hn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((r=>{t.call(e,new ni(this._firestore,this._userDataWriter,r.key,r,new Hn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new N(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const u=new ni(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Hn(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new ni(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Hn(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:JA(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new N(S.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Qn._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Ja.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(e.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function JA(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return x(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ms(n){n=Ie(n,ht);const t=Ie(n.firestore,ir);return kA(Qi(t),n._key).then((e=>Dp(t,n,e)))}Qn._jsonSchemaVersion="firestore/querySnapshot/1.0",Qn._jsonSchema={type:yt("string",Qn._jsonSchemaVersion),bundleSource:yt("string","QuerySnapshot"),bundleName:yt("string"),bundle:yt("string")};class Dc extends kp{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ht(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new ht(this.firestore,null,e)}}function kn(n,t,e){n=Ie(n,ht);const r=Ie(n.firestore,ir),s=Vp(n.converter,t,e);return KA(r,[vp(wc(r),"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,jt.none())])}function Vn(n,...t){var u,h,f;n=it(n);let e={includeMetadataChanges:!1,source:"default"},r=0;typeof t[r]!="object"||Lh(t[r])||(e=t[r++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(Lh(t[r])){const p=t[r];t[r]=(u=p.next)==null?void 0:u.bind(p),t[r+1]=(h=p.error)==null?void 0:h.bind(p),t[r+2]=(f=p.complete)==null?void 0:f.bind(p)}let i,o,c;if(n instanceof ht)o=Ie(n.firestore,ir),c=Bi(n._key.path),i={next:p=>{t[r]&&t[r](Dp(o,n,p))},error:t[r+1],complete:t[r+2]};else{const p=Ie(n,on);o=Ie(p.firestore,ir),c=p._query;const m=new Dc(o);i={next:A=>{t[r]&&t[r](new Qn(o,m,p,A))},error:t[r+1],complete:t[r+2]},qA(n._query)}return(function(m,A,C,k){const V=new Ep(k),B=new hp(A,V,C);return m.asyncQueue.enqueueAndForget((async()=>up(await Ia(m),B))),()=>{V.Nu(),m.asyncQueue.enqueueAndForget((async()=>lp(await Ia(m),B)))}})(Qi(o),c,s,i)}function KA(n,t){return(function(r,s){const i=new we;return r.asyncQueue.enqueueAndForget((async()=>gA(await SA(r),s,i))),i.promise})(Qi(n),t)}function Dp(n,t,e){const r=e.docs.get(t._key),s=new Dc(n);return new Ge(n,s,t._key,r,new Hn(e.hasPendingWrites,e.fromCache),t.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QA={maxAttempts:5};function Or(n,t){if((n=it(n)).firestore!==t)throw new N(S.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XA{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=wc(t)}get(t){const e=Or(t,this._firestore),r=new GA(this._firestore);return this._transaction.lookup([e._key]).then((s=>{if(!s||s.length!==1)return x(24041);const i=s[0];if(i.isFoundDocument())return new bi(this._firestore,r,i.key,i,e.converter);if(i.isNoDocument())return new bi(this._firestore,r,e._key,null,e.converter);throw x(18433,{doc:i})}))}set(t,e,r){const s=Or(t,this._firestore),i=Vp(s.converter,e,r),o=vp(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,o),this}update(t,e,r,...s){const i=Or(t,this._firestore);let o;return o=typeof(e=it(e))=="string"||e instanceof Xi?FA(this._dataReader,"Transaction.update",i._key,e,r,s):UA(this._dataReader,"Transaction.update",i._key,e),this._transaction.update(i._key,o),this}delete(t){const e=Or(t,this._firestore);return this._transaction.delete(e._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YA extends XA{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=Or(t,this._firestore),r=new Dc(this._firestore);return super.get(t).then((s=>new Ge(this._firestore,r,e._key,s._document,new Hn(!1,!1),e.converter)))}}function ZA(n,t,e){n=Ie(n,ir);const r={...QA,...e};return(function(i){if(i.maxAttempts<1)throw new N(S.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r),(function(i,o,c){const u=new we;return i.asyncQueue.enqueueAndForget((async()=>{const h=await PA(i);new vA(i.asyncQueue,h,c,o,u).ju()})),u.promise})(Qi(n),(s=>t(new YA(n,s))),r)}function an(){return new Ic("serverTimestamp")}(function(t,e=!0){(function(s){ur=s})(Rn),En(new Ke("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new ir(new xE(r.getProvider("auth-internal")),new BE(o,r.getProvider("app-check-internal")),(function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new N(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Jr(h.options.projectId,f)})(o,s),o);return i={useFetchStreams:e,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),ue(Bl,jl,t),ue(Bl,jl,"esm2020")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Np="firebasestorage.googleapis.com",Op="storageBucket",tb=120*1e3,eb=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft extends me{constructor(t,e,r=0){super(Jo(t),`Firebase Storage: ${e} (${Jo(t)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,ft.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return Jo(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var dt;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(dt||(dt={}));function Jo(n){return"storage/"+n}function Nc(){const n="An unknown error occurred, please check the error payload for server response.";return new ft(dt.UNKNOWN,n)}function nb(n){return new ft(dt.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function rb(n){return new ft(dt.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function sb(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new ft(dt.UNAUTHENTICATED,n)}function ib(){return new ft(dt.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function ob(n){return new ft(dt.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function ab(){return new ft(dt.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function cb(){return new ft(dt.CANCELED,"User canceled the upload/download.")}function ub(n){return new ft(dt.INVALID_URL,"Invalid URL '"+n+"'.")}function lb(n){return new ft(dt.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function hb(){return new ft(dt.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Op+"' property when initializing the app?")}function db(){return new ft(dt.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function fb(){return new ft(dt.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function pb(n){return new ft(dt.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function ba(n){return new ft(dt.INVALID_ARGUMENT,n)}function Mp(){return new ft(dt.APP_DELETED,"The Firebase app was deleted.")}function gb(n){return new ft(dt.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function $r(n,t){return new ft(dt.INVALID_FORMAT,"String does not match format '"+n+"': "+t)}function kr(n){throw new ft(dt.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(t,e){this.bucket=t,this.path_=e}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,e){let r;try{r=Wt.makeFromUrl(t,e)}catch{return new Wt(t,"")}if(r.path==="")return r;throw lb(t)}static makeFromUrl(t,e){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(J){J.path.charAt(J.path.length-1)==="/"&&(J.path_=J.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function h(J){J.path_=decodeURIComponent(J.path)}const f="v[A-Za-z0-9_]+",p=e.replace(/[.]/g,"\\."),m="(/([^?#]*).*)?$",A=new RegExp(`^https?://${p}/${f}/b/${s}/o${m}`,"i"),C={bucket:1,path:3},k=e===Np?"(?:storage.googleapis.com|storage.cloud.google.com)":e,V="([^?#]*)",B=new RegExp(`^https?://${k}/${s}/${V}`,"i"),q=[{regex:c,indices:u,postModify:i},{regex:A,indices:C,postModify:h},{regex:B,indices:{bucket:1,path:2},postModify:h}];for(let J=0;J<q.length;J++){const wt=q[J],ct=wt.regex.exec(t);if(ct){const w=ct[wt.indices.bucket];let _=ct[wt.indices.path];_||(_=""),r=new Wt(w,_),wt.postModify(r);break}}if(r==null)throw ub(t);return r}}class mb{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _b(n,t,e){let r=1,s=null,i=null,o=!1,c=0;function u(){return c===2}let h=!1;function f(...V){h||(h=!0,t.apply(null,V))}function p(V){s=setTimeout(()=>{s=null,n(A,u())},V)}function m(){i&&clearTimeout(i)}function A(V,...B){if(h){m();return}if(V){m(),f.call(null,V,...B);return}if(u()||o){m(),f.call(null,V,...B);return}r<64&&(r*=2);let q;c===1?(c=2,q=0):q=(r+Math.random())*1e3,p(q)}let C=!1;function k(V){C||(C=!0,m(),!h&&(s!==null?(V||(c=2),clearTimeout(s),p(0)):V||(c=1)))}return p(0),i=setTimeout(()=>{o=!0,k(!0)},e),k}function yb(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tb(n){return n!==void 0}function Eb(n){return typeof n=="object"&&!Array.isArray(n)}function Oc(n){return typeof n=="string"||n instanceof String}function Fh(n){return Mc()&&n instanceof Blob}function Mc(){return typeof Blob<"u"}function Bh(n,t,e,r){if(r<t)throw ba(`Invalid value for '${n}'. Expected ${t} or greater.`);if(r>e)throw ba(`Invalid value for '${n}'. Expected ${e} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(n,t,e){let r=t;return e==null&&(r=`https://${t}`),`${e}://${r}/v0${n}`}function Lp(n){const t=encodeURIComponent;let e="?";for(const r in n)if(n.hasOwnProperty(r)){const s=t(r)+"="+t(n[r]);e=e+s+"&"}return e=e.slice(0,-1),e}var yn;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(yn||(yn={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wb(n,t){const e=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=t.indexOf(n)!==-1;return e||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ib{constructor(t,e,r,s,i,o,c,u,h,f,p,m=!0,A=!1){this.url_=t,this.method_=e,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=u,this.timeout_=h,this.progressCallback_=f,this.connectionFactory_=p,this.retry=m,this.isUsingEmulator=A,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((C,k)=>{this.resolve_=C,this.reject_=k,this.start_()})}start_(){const t=(r,s)=>{if(s){r(!1,new zs(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=c=>{const u=c.loaded,h=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,h)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const c=i.getErrorCode()===yn.NO_ERROR,u=i.getStatus();if(!c||wb(u,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===yn.ABORT;r(!1,new zs(!1,null,f));return}const h=this.successCodes_.indexOf(u)!==-1;r(!0,new zs(h,i))})},e=(r,s)=>{const i=this.resolve_,o=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());Tb(u)?i(u):i()}catch(u){o(u)}else if(c!==null){const u=Nc();u.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,u)):o(u)}else if(s.canceled){const u=this.appDelete_?Mp():cb();o(u)}else{const u=ab();o(u)}};this.canceled_?e(!1,new zs(!1,null,!0)):this.backoffId_=_b(t,e,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&yb(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class zs{constructor(t,e,r){this.wasSuccessCode=t,this.connection=e,this.canceled=!!r}}function Ab(n,t){t!==null&&t.length>0&&(n.Authorization="Firebase "+t)}function bb(n,t){n["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function vb(n,t){t&&(n["X-Firebase-GMPID"]=t)}function Rb(n,t){t!==null&&(n["X-Firebase-AppCheck"]=t)}function Cb(n,t,e,r,s,i,o=!0,c=!1){const u=Lp(n.urlParams),h=n.url+u,f=Object.assign({},n.headers);return vb(f,t),Ab(f,e),bb(f,i),Rb(f,r),new Ib(h,n.method,f,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o,c)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sb(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Pb(...n){const t=Sb();if(t!==void 0){const e=new t;for(let r=0;r<n.length;r++)e.append(n[r]);return e.getBlob()}else{if(Mc())return new Blob(n);throw new ft(dt.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function kb(n,t,e){return n.webkitSlice?n.webkitSlice(t,e):n.mozSlice?n.mozSlice(t,e):n.slice?n.slice(t,e):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vb(n){if(typeof atob>"u")throw pb("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ce={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Ko{constructor(t,e){this.data=t,this.contentType=e||null}}function Db(n,t){switch(n){case ce.RAW:return new Ko(xp(t));case ce.BASE64:case ce.BASE64URL:return new Ko(Up(n,t));case ce.DATA_URL:return new Ko(Ob(t),Mb(t))}throw Nc()}function xp(n){const t=[];for(let e=0;e<n.length;e++){let r=n.charCodeAt(e);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(e<n.length-1&&(n.charCodeAt(e+1)&64512)===56320))t.push(239,191,189);else{const i=r,o=n.charCodeAt(++e);r=65536|(i&1023)<<10|o&1023,t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(t)}function Nb(n){let t;try{t=decodeURIComponent(n)}catch{throw $r(ce.DATA_URL,"Malformed data URL.")}return xp(t)}function Up(n,t){switch(n){case ce.BASE64:{const s=t.indexOf("-")!==-1,i=t.indexOf("_")!==-1;if(s||i)throw $r(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case ce.BASE64URL:{const s=t.indexOf("+")!==-1,i=t.indexOf("/")!==-1;if(s||i)throw $r(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let e;try{e=Vb(t)}catch(s){throw s.message.includes("polyfill")?s:$r(n,"Invalid character found")}const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}class Fp{constructor(t){this.base64=!1,this.contentType=null;const e=t.match(/^data:([^,]+)?,/);if(e===null)throw $r(ce.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=e[1]||null;r!=null&&(this.base64=Lb(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=t.substring(t.indexOf(",")+1)}}function Ob(n){const t=new Fp(n);return t.base64?Up(ce.BASE64,t.rest):Nb(t.rest)}function Mb(n){return new Fp(n).contentType}function Lb(n,t){return n.length>=t.length?n.substring(n.length-t.length)===t:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(t,e){let r=0,s="";Fh(t)?(this.data_=t,r=t.size,s=t.type):t instanceof ArrayBuffer?(e?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),r=this.data_.length):t instanceof Uint8Array&&(e?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),r=t.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(t,e){if(Fh(this.data_)){const r=this.data_,s=kb(r,t,e);return s===null?null:new Fe(s)}else{const r=new Uint8Array(this.data_.buffer,t,e-t);return new Fe(r,!0)}}static getBlob(...t){if(Mc()){const e=t.map(r=>r instanceof Fe?r.data_:r);return new Fe(Pb.apply(null,e))}else{const e=t.map(o=>Oc(o)?Db(ce.RAW,o).data:o.data_);let r=0;e.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return e.forEach(o=>{for(let c=0;c<o.length;c++)s[i++]=o[c]}),new Fe(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bp(n){let t;try{t=JSON.parse(n)}catch{return null}return Eb(t)?t:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xb(n){if(n.length===0)return null;const t=n.lastIndexOf("/");return t===-1?"":n.slice(0,t)}function Ub(n,t){const e=t.split("/").filter(r=>r.length>0).join("/");return n.length===0?e:n+"/"+e}function jp(n){const t=n.lastIndexOf("/",n.length-2);return t===-1?n:n.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fb(n,t){return t}class Lt{constructor(t,e,r,s){this.server=t,this.local=e||t,this.writable=!!r,this.xform=s||Fb}}let Ws=null;function Bb(n){return!Oc(n)||n.length<2?n:jp(n)}function $p(){if(Ws)return Ws;const n=[];n.push(new Lt("bucket")),n.push(new Lt("generation")),n.push(new Lt("metageneration")),n.push(new Lt("name","fullPath",!0));function t(i,o){return Bb(o)}const e=new Lt("name");e.xform=t,n.push(e);function r(i,o){return o!==void 0?Number(o):o}const s=new Lt("size");return s.xform=r,n.push(s),n.push(new Lt("timeCreated")),n.push(new Lt("updated")),n.push(new Lt("md5Hash",null,!0)),n.push(new Lt("cacheControl",null,!0)),n.push(new Lt("contentDisposition",null,!0)),n.push(new Lt("contentEncoding",null,!0)),n.push(new Lt("contentLanguage",null,!0)),n.push(new Lt("contentType",null,!0)),n.push(new Lt("metadata","customMetadata",!0)),Ws=n,Ws}function jb(n,t){function e(){const r=n.bucket,s=n.fullPath,i=new Wt(r,s);return t._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:e})}function $b(n,t,e){const r={};r.type="file";const s=e.length;for(let i=0;i<s;i++){const o=e[i];r[o.local]=o.xform(r,t[o.server])}return jb(r,n),r}function qp(n,t,e){const r=Bp(t);return r===null?null:$b(n,r,e)}function qb(n,t,e,r){const s=Bp(t);if(s===null||!Oc(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(h=>{const f=n.bucket,p=n.fullPath,m="/b/"+o(f)+"/o/"+o(p),A=to(m,e,r),C=Lp({alt:"media",token:h});return A+C})[0]}function Hb(n,t){const e={},r=t.length;for(let s=0;s<r;s++){const i=t[s];i.writable&&(e[i.server]=n[i.local])}return JSON.stringify(e)}class Lc{constructor(t,e,r,s){this.url=t,this.method=e,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hp(n){if(!n)throw Nc()}function zb(n,t){function e(r,s){const i=qp(n,s,t);return Hp(i!==null),i}return e}function Wb(n,t){function e(r,s){const i=qp(n,s,t);return Hp(i!==null),qb(i,s,n.host,n._protocol)}return e}function zp(n){function t(e,r){let s;return e.getStatus()===401?e.getErrorText().includes("Firebase App Check token is invalid")?s=ib():s=sb():e.getStatus()===402?s=rb(n.bucket):e.getStatus()===403?s=ob(n.path):s=r,s.status=e.getStatus(),s.serverResponse=r.serverResponse,s}return t}function Wp(n){const t=zp(n);function e(r,s){let i=t(r,s);return r.getStatus()===404&&(i=nb(n.path)),i.serverResponse=s.serverResponse,i}return e}function Gb(n,t,e){const r=t.fullServerUrl(),s=to(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,c=new Lc(s,i,Wb(n,e),o);return c.errorHandler=Wp(t),c}function Jb(n,t){const e=t.fullServerUrl(),r=to(e,n.host,n._protocol),s="DELETE",i=n.maxOperationRetryTime;function o(u,h){}const c=new Lc(r,s,o,i);return c.successCodes=[200,204],c.errorHandler=Wp(t),c}function Kb(n,t){return n&&n.contentType||t&&t.type()||"application/octet-stream"}function Qb(n,t,e){const r=Object.assign({},e);return r.fullPath=n.path,r.size=t.size(),r.contentType||(r.contentType=Kb(null,t)),r}function Xb(n,t,e,r,s){const i=t.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function c(){let q="";for(let J=0;J<2;J++)q=q+Math.random().toString().slice(2);return q}const u=c();o["Content-Type"]="multipart/related; boundary="+u;const h=Qb(t,r,s),f=Hb(h,e),p="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+u+`\r
Content-Type: `+h.contentType+`\r
\r
`,m=`\r
--`+u+"--",A=Fe.getBlob(p,r,m);if(A===null)throw db();const C={name:h.fullPath},k=to(i,n.host,n._protocol),V="POST",B=n.maxUploadRetryTime,U=new Lc(k,V,zb(n,e),B);return U.urlParams=C,U.headers=o,U.body=A.uploadData(),U.errorHandler=zp(t),U}class Yb{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=yn.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=yn.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=yn.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,e,r,s,i){if(this.sent_)throw kr("cannot .send() more than once");if(nn(t)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(e,t,!0),i!==void 0)for(const o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw kr("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw kr("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw kr("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw kr("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class Zb extends Yb{initXhr(){this.xhr_.responseType="text"}}function xc(){return new Zb}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(t,e){this._service=t,e instanceof Wt?this._location=e:this._location=Wt.makeFromUrl(e,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,e){return new bn(t,e)}get root(){const t=new Wt(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return jp(this._location.path)}get storage(){return this._service}get parent(){const t=xb(this._location.path);if(t===null)return null;const e=new Wt(this._location.bucket,t);return new bn(this._service,e)}_throwIfRoot(t){if(this._location.path==="")throw gb(t)}}function tv(n,t,e){n._throwIfRoot("uploadBytes");const r=Xb(n.storage,n._location,$p(),new Fe(t,!0),e);return n.storage.makeRequestWithTokens(r,xc).then(s=>({metadata:s,ref:n}))}function ev(n){n._throwIfRoot("getDownloadURL");const t=Gb(n.storage,n._location,$p());return n.storage.makeRequestWithTokens(t,xc).then(e=>{if(e===null)throw fb();return e})}function nv(n){n._throwIfRoot("deleteObject");const t=Jb(n.storage,n._location);return n.storage.makeRequestWithTokens(t,xc)}function rv(n,t){const e=Ub(n._location.path,t),r=new Wt(n._location.bucket,e);return new bn(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sv(n){return/^[A-Za-z]+:\/\//.test(n)}function iv(n,t){return new bn(n,t)}function Gp(n,t){if(n instanceof Uc){const e=n;if(e._bucket==null)throw hb();const r=new bn(e,e._bucket);return t!=null?Gp(r,t):r}else return t!==void 0?rv(n,t):n}function ov(n,t){if(t&&sv(t)){if(n instanceof Uc)return iv(n,t);throw ba("To use ref(service, url), the first argument must be a Storage instance.")}else return Gp(n,t)}function jh(n,t){const e=t==null?void 0:t[Op];return e==null?null:Wt.makeFromBucketSpec(e,n)}function av(n,t,e,r={}){n.host=`${t}:${e}`;const s=nn(t);s&&(Va(`https://${n.host}/b`),Da("Storage",!0)),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:fd(i,n.app.options.projectId))}class Uc{constructor(t,e,r,s,i,o=!1){this.app=t,this._authProvider=e,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=o,this._bucket=null,this._host=Np,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=tb,this._maxUploadRetryTime=eb,this._requests=new Set,s!=null?this._bucket=Wt.makeFromBucketSpec(s,this._host):this._bucket=jh(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=Wt.makeFromBucketSpec(this._url,t):this._bucket=jh(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){Bh("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){Bh("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const e=await t.getToken();if(e!==null)return e.accessToken}return null}async _getAppCheckToken(){if(qt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new bn(this,t)}_makeRequest(t,e,r,s,i=!0){if(this._deleted)return new mb(Mp());{const o=Cb(t,this._appId,r,s,e,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(t,e){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,e,r,s).getPromise()}}const $h="@firebase/storage",qh="0.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jp="storage";function cv(n,t,e){return n=it(n),tv(n,t,e)}function uv(n){return n=it(n),ev(n)}function lv(n){return n=it(n),nv(n)}function Kp(n,t){return n=it(n),ov(n,t)}function hv(n=Ma(),t){n=it(n);const r=Ni(n,Jp).getImmediate({identifier:t}),s=ld("storage");return s&&dv(r,...s),r}function dv(n,t,e,r={}){av(n,t,e,r)}function fv(n,{instanceIdentifier:t}){const e=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new Uc(e,r,s,t,Rn)}function pv(){En(new Ke(Jp,fv,"PUBLIC").setMultipleInstances(!0)),ue($h,qh,""),ue($h,qh,"esm2020")}pv();const Qo=(n="")=>n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),iP=["art","craft party","fashion","gifts","hardware","holidays","home goods","kids","pinball","sports","themed","tools"],gv=n=>{const t=(Array.isArray(n)?n:[]).map(e=>String(e||"").trim().toLowerCase()).filter(Boolean);return Array.from(new Set(t))},xn=(n,t)=>{if(typeof t=="string"&&t.trim())return t.trim();throw new Error(`Missing required environment variable: ${n}`)},mv=n=>{const t=String(n||"").trim().replace(/^gs:\/\//i,"").replace(/^https?:\/\/storage\.googleapis\.com\//i,"").replace(/\/+$/g,"");return t},_v={apiKey:xn("VITE_FIREBASE_API_KEY","AIzaSyCrb9srW-7b00s6xIljzvicUZ_tXO4DeYo"),authDomain:xn("VITE_FIREBASE_AUTH_DOMAIN","auth.3dlocalprint.com"),projectId:xn("VITE_FIREBASE_PROJECT_ID","threedlocalprint"),storageBucket:mv(xn("VITE_FIREBASE_STORAGE_BUCKET","threedlocalprint.firebasestorage.app")),messagingSenderId:xn("VITE_FIREBASE_MESSAGING_SENDER_ID","770972495364"),appId:xn("VITE_FIREBASE_APP_ID","1:770972495364:web:b1015eaaf0de32d9b84f51")},Fc=md(_v),or=NE(Fc),Hh=new ye,Se=NA(Fc),Qp=hv(Fc),yv=2*1024*1024,vi=Pn(Se,"filament_inventory","list"),Bc=Pn(Se,"filament_types","list"),jc=Pn(Se,"manufacturers","list"),$c=Pn(Se,"admins","list"),Xp=Pn(Se,"ledger","entries"),Yp=Pn(Se,"ledger","moneyAccounts"),qc=Pn(Se,"products","list"),Tv=DA(Se,"orders"),zh=(n="")=>n.trim().toLowerCase(),Hc=n=>(Array.isArray(n)?n:[]).map(t=>{if(typeof t=="string")return{label:t.trim(),iconUrl:""};if(t&&typeof t=="object"){const e=String(t.label||"").trim(),r=String(t.iconUrl||"").trim();return{label:e,iconUrl:r}}return null}).filter(t=>!!(t!=null&&t.label)),Ev=n=>(Array.isArray(n)?n:[]).map(t=>{if(!t||typeof t!="object")return null;const e=String(t.imageUrl||"").trim();if(!e)return null;const r=String(t.imagePath||"").trim(),s=Number(t.uploadedAt)||Date.now(),i=String(t.uploadedDate||"").trim()||new Date(s).toISOString(),o=String(t.location||"").trim()||r||e;return{imageUrl:e,imagePath:r,uploadedAt:s,uploadedDate:i,location:o}}).filter(t=>!!(t!=null&&t.imageUrl)),zc=n=>(Array.isArray(n)?n:[]).map(t=>{if(!t||typeof t!="object")return null;const e=String(t.id||"").trim(),r=String(t.title||"").trim();if(!e||!r)return null;const s=Date.now(),o=String(t.slug||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),c=Ev(t.images),u=String(t.imageUrl||"").trim(),h=String(t.imagePath||"").trim(),f=c.length?c:u?[{imageUrl:u,imagePath:h,uploadedAt:Date.now(),uploadedDate:new Date().toISOString(),location:h||u}]:[],p=f[0],m=t.variations,A=(Array.isArray(m)?m:[]).map(C=>{if(!C||typeof C!="object")return null;const k=String(C.label||"").trim();return k?{id:String(C.id||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||`variation_${Math.random().toString(36).slice(2,9)}`,label:k,unitAmount:Math.max(0,Math.round(Number(C.unitAmount)||0)),stripePriceId:String(C.stripePriceId||"").trim(),active:!!C.active}:null}).filter(C=>!!(C!=null&&C.id&&(C!=null&&C.label)));return{id:e,title:r,slug:o||e,description:String(t.description||"").trim(),imageUrl:String((p==null?void 0:p.imageUrl)||"").trim(),imagePath:String((p==null?void 0:p.imagePath)||"").trim(),images:f,unitAmount:Math.max(0,Math.round(Number(t.unitAmount)||0)),currency:String(t.currency||"usd").trim().toLowerCase()||"usd",categories:gv(t.categories),active:!!t.active,stripePriceId:String(t.stripePriceId||"").trim(),variations:A,taxCode:String(t.taxCode||"").trim(),createdAt:Number(t.createdAt)||s,updatedAt:Number(t.updatedAt)||s}}).filter(t=>!!(t!=null&&t.id&&(t!=null&&t.title))),wv=()=>typeof navigator<"u"&&/iPad|iPhone|iPod/i.test(navigator.userAgent||""),Iv=async()=>{const n=[{key:"indexedDB",value:Gd},{key:"local",value:jd},{key:"session",value:qa}];let t=null;for(const e of n)try{return await TT(or,e.value),{persistence:e.key,error:null}}catch(r){t=r,console.warn(`Failed to set ${e.key} persistence`,r)}return{persistence:"none",error:t}},oP=async()=>{let n=null,t=null;try{t=await KT(or)}catch(r){n=r,console.error("Firebase redirect sign-in failed",r)}const e=await Iv();return{redirectError:n,redirectResult:t,persistence:e}},aP=async()=>{try{return await jT(or,Hh)}catch(n){if(!wv())throw n;return console.warn("Popup sign-in failed on iOS, falling back to redirect",n),GT(or,Hh)}},cP=()=>AT(or),uP=n=>IT(or,n),lP=async()=>{const n=await ms(vi);if(!n.exists())return null;const t=n.data();return Array.isArray(t.items)?t.items:[]},hP=n=>kn(vi,{items:n,updatedAt:an()},{merge:!0}),dP=async()=>{const n=await ms(Bc);if(!n.exists())return null;const t=n.data();return Array.isArray(t.items)?t.items:[]},fP=n=>Vn(Bc,t=>{if(!t.exists()){n(null);return}const e=t.data();n(Array.isArray(e.items)?e.items:[])},t=>{console.error("Failed to subscribe to filament types",t),n(null)}),pP=n=>kn(Bc,{items:n,updatedAt:an()},{merge:!0}),gP=async({location:n="",adjustments:t={}}={})=>{const e=Qo(n),r=Object.entries(t).filter(([,s])=>Number(s));if(!(!e||!r.length))return ZA(Se,async s=>{const i=await s.get(vi);if(!i.exists())throw new Error("Filament inventory list not found.");const o=i.data(),c=Array.isArray(o.items)?o.items:[],u=c.map(f=>{if(Qo(f.location||"")!==e)return f;const p=f.filament_type_id||"";if(!p||!(p in t))return f;const m=Number(t[p])||0;if(!m)return f;const A=Number(f.spool_inventory)||0,C=Math.max(0,A+m);return{...f,spool_inventory:C}}),h=new Set(c.filter(f=>Qo(f.location||"")===e).map(f=>f.filament_type_id).filter(Boolean));r.forEach(([f,p])=>{const m=Number(p)||0;m<=0||h.has(f)||u.push({filament_type_id:f,location:n,spool_inventory:m})}),s.set(vi,{items:u,updatedAt:an()},{merge:!0})})},mP=async()=>{const n=await ms(jc);if(!n.exists())return null;const t=n.data();return Hc(t.items)},_P=n=>Vn(jc,t=>{if(!t.exists()){n(null);return}const e=t.data();n(Hc(e.items))},t=>{console.error("Failed to subscribe to 🏭 manufacturers",t),n(null)}),yP=n=>Vn($c,t=>{if(!t.exists()){n(null);return}const e=t.data();n(Array.isArray(e.items)?e.items:[])},t=>{console.error("Failed to subscribe to admins",t),n(null)}),TP=n=>kn(jc,{items:Hc(n),updatedAt:an()},{merge:!0}),Av=async()=>{const n=await ms($c);if(!n.exists())return[];const t=n.data();return Array.isArray(t.items)?t.items:[]},EP=async(n="")=>(await Av()).map(zh).includes(zh(n)),wP=n=>kn($c,{items:n,updatedAt:an()},{merge:!0}),bv=(n=[])=>(Array.isArray(n)?n:[]).map(t=>{const e=Number(t.amount);if(!Number.isFinite(e)||e===0)throw new Error("Ledger amount must be a non-zero number.");const r=String(t.title||"").trim();if(!r)throw new Error("Ledger title is required.");const s=String(t.applicableDate||"");if(!/^\d{4}-\d{2}-\d{2}$/.test(s))throw new Error("Ledger applicable date must be a valid YYYY-MM-DD value.");const i=String(t.id||"").trim();if(!i)throw new Error("Ledger id is required.");return{id:i,amount:e,salesTaxLiability:Math.min(0,Number(t.salesTaxLiability)||0),processingFees:Math.min(0,Number(t.processingFees)||0),title:r,moneyAccountTitle:String(t.moneyAccountTitle||"").trim(),billingCategory:String(t.billingCategory||"").trim()||"",applicableDate:s,notes:String(t.notes||"").trim(),status:["pending","posted","reconciled"].includes(t.status)?t.status:"posted",createdAt:Number(t.createdAt)||Date.now(),updatedAt:Number(t.updatedAt)||Date.now()}}),IP=n=>kn(Xp,{items:bv(n),updatedAt:an()},{merge:!0}),AP=n=>Vn(Xp,t=>{if(!t.exists()){n([]);return}const e=t.data();n(Array.isArray(e.items)?e.items:[])},t=>{console.error("Failed to subscribe to ledger entries",t),n([])}),vv=new Set(["checkout_created","paid","payment_failed","canceled","unknown"]),Rv=n=>{const t=String(n||"").trim();return vv.has(t)?t:"unknown"},Cv=n=>(Array.isArray(n)?n:[]).reduce((t,e)=>{if(!e||typeof e!="object")return t;const r=String(e.priceId||"").trim(),s=String(e.title||"").trim()||"Product";return t.push({priceId:r,quantity:Math.max(1,Math.round(Number(e.quantity)||1)),title:s,productId:String(e.productId||"").trim(),variationId:String(e.variationId||"").trim()}),t},[]),Sv=(n,t)=>({id:String(t.id||n||"").trim(),status:Rv(t.status),lineItems:Cv(t.lineItems),currency:String(t.currency||"usd").trim().toLowerCase()||"usd",amountSubtotal:Math.max(0,Math.round(Number(t.amountSubtotal)||0)),amountTax:Math.max(0,Math.round(Number(t.amountTax)||0)),amountShipping:Math.max(0,Math.round(Number(t.amountShipping)||0)),amountTotal:Math.max(0,Math.round(Number(t.amountTotal)||0)),customerEmail:String(t.customerEmail||"").trim(),customerName:String(t.customerName||"").trim(),checkoutSessionId:String(t.checkoutSessionId||"").trim(),checkoutUrl:String(t.checkoutUrl||"").trim(),paymentIntentId:String(t.paymentIntentId||"").trim(),latestStripeEventId:String(t.latestStripeEventId||"").trim(),stripeMode:["sandbox","live"].includes(String(t.stripeMode||""))?String(t.stripeMode):"",notificationEmail:String(t.notificationEmail||"").trim(),notificationEmailStatus:String(t.notificationEmailStatus||"").trim(),createdAt:String(t.createdAt||"").trim(),updatedAt:String(t.updatedAt||"").trim(),paidAt:String(t.paidAt||"").trim(),stripeDashboardUrl:String(t.stripeDashboardUrl||"").trim()}),bP=n=>Vn(HA(Tv,zA("updatedAt","desc"),WA(100)),t=>{n(t.docs.map(e=>Sv(e.id,e.data())))},t=>{console.error("Failed to subscribe to orders",t),n([])}),Pv=(n=[])=>(Array.isArray(n)?n:[]).map(t=>{const e=String(t.id||"").trim();if(!e)throw new Error("Money account id is required.");const r=String(t.title||"").trim();if(!r)throw new Error("Money account title is required.");return{id:e,title:r,notes:String(t.notes||"").trim(),createdAt:Number(t.createdAt)||Date.now(),updatedAt:Number(t.updatedAt)||Date.now()}}),vP=n=>kn(Yp,{items:Pv(n),updatedAt:an()},{merge:!0}),RP=n=>Vn(Yp,t=>{if(!t.exists()){n([]);return}const e=t.data();n(Array.isArray(e.items)?e.items:[])},t=>{console.error("Failed to subscribe to money accounts",t),n([])}),CP=async()=>{const n=await ms(qc);if(!n.exists())return[];const t=n.data();return zc(t.items)},SP=n=>kn(qc,{items:zc(n),updatedAt:an()},{merge:!0}),PP=n=>Vn(qc,t=>{if(!t.exists()){n([]);return}const e=t.data();n(zc(e.items))},t=>{console.error("Failed to subscribe to products",t),n([])}),kv=n=>{const t=String((n==null?void 0:n.name)||""),e=t.includes(".")?t.split(".").pop():"",r=String(e||"").toLowerCase().replace(/[^a-z0-9]/g,"");if(r)return r;const s=String((n==null?void 0:n.type)||"").toLowerCase();return s==="image/jpeg"?"jpg":s==="image/png"?"png":s==="image/webp"?"webp":s==="image/gif"?"gif":s==="image/avif"?"avif":"bin"},kP=async(n,t)=>{if(!(n instanceof File))throw new Error("Missing image file.");if(n.size>yv)throw new Error("Image must be 2MB or smaller.");const e=String(t||"").trim();if(!e)throw new Error("Missing product id.");const r=kv(n),s=`${Date.now()}_${Math.random().toString(36).slice(2,9)}.${r}`,i=`products/${e}/${s}`,o=Kp(Qp,i);await cv(o,n,{contentType:n.type||void 0,cacheControl:"public,max-age=31536000,immutable"});const c=await uv(o);return{imagePath:i,imageUrl:c,uploadedAt:Date.now(),uploadedDate:new Date().toISOString(),location:i}},VP=async(n="")=>{const t=String(n||"").trim();if(t)try{await lv(Kp(Qp,t))}catch(e){if(String((e==null?void 0:e.code)||"")==="storage/object-not-found")return;throw e}};function _s(n){return n.renderCount=n.renderCount||0,n.varCounter=0,n.state={newer:{state:[],states:[]}},n.global={blocked:[]}}function Ri(){return ot.stateConfig.support}function eo(n){return Nt(n.context),ot.stateConfig.support=n}const Ut=function(){};let te=[];const _e=[];let re=[],no=[],Je=[],Wc=!1;const je=[],Vv=400;let qn=0;const va=new Map,st={locks:0};function Dv(n,t){const e=va.get(n);if(e!==void 0&&e>=qn){je[e]=t;return}const r=je.length;je.push(t),va.set(n,r)}function Nv(n,t){t.textContent=n}function Kt(){st.locks>0||Ov()}function Ov(){++st.locks,eg(),--st.locks,Zp(),Mv()}function Zp(){xv();const n=Je;Je=[];for(const t of n)t[0](...t[1])}function Mv(){Wc||!je.length||Lv()}function Lv(){Wc=!0,requestAnimationFrame(tg)}function tg(){++st.locks;let n=0;for(;qn<je.length&&n<Vv;){const t=je[qn];++qn,t[0](...t[1]),++n}if(eg(),Zp(),--st.locks,qn<je.length){requestAnimationFrame(tg);return}je.length=0,qn=0,va.clear(),Wc=!1}function eg(){const n=_e.length;for(let t=0;t<n;++t){const e=_e[t];e[0](...e[1])}if(n===_e.length)_e.length=0;else{let t=0;for(let e=n;e<_e.length;++e)_e[t]=_e[e],++t;_e.length=t}for(const t of re)t[0](...t[1]);for(const t of no)t[0](...t[1]);for(const t of te)t[0](...t[1])}function xv(){te=[],re=[],no=[]}function ts(n,t){_e.push([Uv,[n,t]])}function Uv(n,t){n||console.debug("no element by",{_caller:t,element:n});const e=n.parentNode;e||console.debug("no parentNode by",{_caller:t,element:n}),e.removeChild(n)}function Gc(n,t,e){n.parentNode.insertBefore(t,n)}function Jc(n,t){n.appendChild(t)}typeof document=="object"&&document.createElement("div");function Fv(n){return document.createTextNode(n)}function ng(n,t,e=Ut,r){const s=Fv(t);Gc(n,s),e(s)}const ys="";var Wh;(function(n){n.string="string",n.number="number",n.boolean="boolean",n.undefined="undefined"})(Wh||(Wh={}));var Z;(function(n){n.function="function",n.date="date",n.unknown="unknown",n.object="object"})(Z||(Z={}));const Bv=Date.now(),Y={tag:"html",dom:"dom",templater:"templater",tagComponent:"tagComponent",tagArray:"tagArray",host:"host",subscribe:"subscribe",signal:"signal",stateRender:"stateRender",version:Bv};function rg(n){if(!n)return!1;switch(n.tagJsType){case Y.dom:case Y.tag:case Y.templater:return!0}return!1}function Ts(n){const t=n==null?void 0:n.tagJsType;return t===Y.tagComponent||t===Y.stateRender}function jv(n){return ro(n)&&typeof n.subscribe===Z.function}function Dn(n){return n&&vn(n.then)}function vn(n){return typeof n===Z.function}function ro(n){return typeof n===Z.object&&n!==null}function Gt(n){return Array.isArray(n)}function Kc(n){const t=n.state;if(t&&t.newest&&t.newest)return t.newest;if(n.parentContext)return Kc(n.parentContext)}function so(n){let t=n;for(;t.ownerSupport&&!Ts(t.templater);)t=t.ownerSupport;const r=t.context.state;return r&&r.newest||t}function $v(...n){return n}function sg(n){const t=ot.stateConfig;return t.states[t.statesIndex]=n,++t.statesIndex,n($v)}function qv(n){const t=ot.stateConfig,e=t.statesIndex,u=so(t.prevSupport).context.state.older.states[e];let h=[];u(function(...m){return h=m,u.lastValues=h,m});const f=function(...m){return h};return t.states[t.statesIndex]=n,++t.statesIndex,n(f)}function ig(n){Nt(n);const t=ot.stateConfig;t.handlers.handler=og,t.handlers.statesHandler=sg,t.rearray=[];const e=t.state=[],r=t.states=[];t.statesIndex=0;const s=n.state=n.state||{};s.newer={state:e,states:r}}class Hv{}function zv(n){const[t]=n(Hv),[e]=n(t);return[t,e]}function Wv(n){const t=n.callback;if(!t)return n.defaultValue;const[e]=zv(t);return e}function Gv(){const n=ot.stateConfig,e=n.rearray[n.state.length];return n.state.push(e),e.defaultValue}function og(n){var o,c;const t=ot.stateConfig,e=ee();if(!e||!e.state){const u="State requested but TaggedJs is not currently rendering a tag or host";throw console.error(u,{config:t,context:e,function:(c=(o=t.support)==null?void 0:o.templater.wrapper)==null?void 0:c.original}),new Error(u)}const r=e.state.newer;t.state=r.state;let s=n;if(typeof n===Z.function&&(s=n()),typeof s===Z.function){const u=s;s=function(...f){return u(...f)},s.original=u}const i={get:function(){return Wv(i)},defaultValue:s};return t.state.push(i),s}function Jv(n){const t=new et,e=r=>{const s=[],i=[],o=(p,m)=>{if(s[m]=!0,i[m]=p,s.length===n.length){for(const C of s)if(!C)return;r(i,h)}},c=[...n],h=c.shift().subscribe(p=>o(p,0)),f=c.map((p,m)=>p.subscribe(A=>o(A,m+1)));return h.subscriptions=f,h};return t.subscribeWith=e,t}function Kv(n,t){const e=n.findIndex(r=>r.callback===t);e!==-1&&n.splice(e,1)}function Qv(n,t,e){const r=et.globalSubCount$;et.globalSubCount$.next(r.value+1);const s=function(){s.unsubscribe()};return s.callback=t,s.subscriptions=[],s.unsubscribe=function(){return Xv(s,e,t)},s.add=i=>(s.subscriptions.push(i),s),s.next=i=>{t(i,s)},s}function ag(n,t,e){const r=[...t],s=r.shift(),i=f=>{if(r.length)return ag(f,r,e);e(f)};let o=i;const h=s(n,{setHandler:f=>o=f,next:i});o(h)}function Xv(n,t,e){Kv(t,e);const r=et.globalSubCount$;et.globalSubCount$.next(r.value-1),n.unsubscribe=()=>n;const s=n.subscriptions;for(const i of s)i.unsubscribe();return n}const zn=class zn{constructor(t,e){Xt(this,"onSubscription");Xt(this,"methods",[]);Xt(this,"isSubject",!0);Xt(this,"subscribers",[]);Xt(this,"subscribeWith");Xt(this,"value");Xt(this,"set",this.next.bind(this));this.onSubscription=e,arguments.length>0&&(this.value=t)}subscribe(t){const e=Qv(this,t,this.subscribers),r=this.subscribeWith;if(r){if(this.methods.length){const s=t;t=i=>{ag(i,this.methods,o=>s(o,e))}}return r(t)}return this.subscribers.push(e),this.onSubscription&&this.onSubscription(e),e}next(t){this.value=t,this.emit()}emit(){const t=this.value,e=this.subscribers;for(const r of e)r.callback(t,r)}toPromise(){return new Promise(t=>{this.subscribe((e,r)=>{r.unsubscribe(),t(e)})})}toCallback(t){const e=this.subscribe((r,s)=>{const i=s==null?void 0:s.unsubscribe;i?i():setTimeout(()=>{e.unsubscribe()},0),t(r)});return e}pipe(...t){const e=[];"value"in this&&e.push(this.value);const r=new zn(...e);return r.setMethods(t),r.subscribeWith=s=>this.subscribe(s),r.next=s=>this.next(s),r}setMethods(t){this.methods=t}static all(t){const e=t.map(r=>jv(r)?r:new zn(r,i=>(i.next(r),i)));return Jv(e)}};Xt(zn,"globalSubCount$",new zn(0));let et=zn;const Yv=new et(void 0,function(t){Ri()||t.next()}),ot={stateConfig:{state:[],version:Date.now(),handlers:{handler:og,statesHandler:sg}},tagClosed$:Yv};function Zv(n,t){const r=n.templater.tag.values;for(const s of t)tR(r,s,n);return t}function tR(n,t,e){if(t.deleted)return;const r=t.tagJsVar;Nt(t),r.processUpdate("",t,e,n),vt()}function cg(n,t){if(!n)return;const r=n.context.contexts;eR(n,t),++st.locks,Zv(n,r),--st.locks,Kt()}function eR(n,t){const e=t.templater,r=t.templater.tag,s=e.values||r.values,i=n.templater.tag;i.values=s}function nR(n,t){return Ra(n,t)}function Ra(n,t){if(n===null||typeof n!==Z.object||t<0)return n;if(n instanceof Date)return new Date(n);if(n instanceof RegExp)return new RegExp(n);const e=Gt(n)?[]:Object.create(Object.getPrototypeOf(n));if(Gt(n))for(let r=0;r<n.length;r++)e[r]=Ra(n[r],t-1);else for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=Ra(n[r],t-1));return e}function rR(n,t,e){return Qc(n,t,e)}function Qc(n,t,e){return n===t||oR(n,t)||e<0?!0:typeof n===Z.object&&typeof t===Z.object?n instanceof Date&&t instanceof Date?n.getTime()===t.getTime():Gt(n)&&Gt(t)?iR(n,t,e-1):Gt(n)||Gt(t)?!1:sR(n,t,e-1):!1}function sR(n,t,e){const r=Object.keys(n),s=Object.keys(t);if(r.length===0&&s.length===0)return!0;if(r.length!==s.length)return!1;for(const i of r)if(!s.includes(i)||!Qc(n[i],t[i],e-1))return!1;return!0}function iR(n,t,e){if(n.length!==t.length)return!1;for(let r=0;r<n.length;r++)if(!Qc(n[r],t[r],e-1))return!1;return!0}function oR(n,t){return vn(n)&&vn(t)&&n.toString()===t.toString()}function Gh(n){return n.map(Xc)}function Xc(n,t){const e=n,r=n==null?void 0:n.tagJsType;if(r)switch(r){case Y.signal:case Y.subscribe:case Y.stateRender:return;case Y.dom:case Y.tag:case Y.templater:return Gh(e.values)}return Gt(n)?Gh(e):nR(n,t)}function aR(n,t){const e=n.length;for(let r=0;r<e;++r){const s=n[r],i=t[r];if(Gt(s)&&Gt(i)){if(s===i)continue;return 3}if(!(typeof s===Z.function&&typeof i===Z.function)){if(typeof s===Z.object){if(!s&&!i)continue;if(typeof t===Z.object){const o=Object.entries(s);for(const c of o)if(!cR(c,i))return 3.1}continue}if(s!==i)return 3.3}}return!1}function cR([n,t],e){const r=e[n];return typeof t===Z.function&&typeof r===Z.function?!0:r===t}function Yc(n,t,e){return n}function uR(n){return typeof n!==Z.object||!n||n.tagJsType}function lR(n,t,e,r,s,i){var c;const o=Object.keys(n);for(const u of o){const h=n[u],f=t[u],p=Zc(f,h,e,r,i,s+1);h===p||(c=Object.getOwnPropertyDescriptor(n,u))!=null&&c.set||(n[u]=p)}return n}function hR(n,t,e,r,s,i){for(let o=n.length-1;o>=0;--o){const c=n[o],u=t[o];n[o]=Zc(u,c,e,r,i,s+1)}return n}function Zc(n,t,e,r,s,i){return n==null||i>s?t:typeof n===Z.function?t.mem?(n.mem=t.mem,t):(n.mem=t,n):uR(t)?t:Gt(t)?hR(t,n,e,r,i,s):lR(t,n,e,r,i,s)}function dR(n,t,e,r,s,i=-1){const o=t.context;if(!o.global||!o.state.newest){const A=Yc(r);r.push(...A);const C=n.propsConfig;return C.castProps=A,r}t=o.state.newest||t;const f=t.propsConfig.castProps,p=[];for(let A=0;A<r.length;++A){const C=r[A],k=f[A],V=Zc(k,C,n,e,s,i+1);p.push(V)}const m=n.propsConfig;return m.castProps=p,p}function fR(n,t){const e=n.context,r=e.global;let s=-1;const i=e.providers=e.providers||[],o=i.length-1;for(;s++<o;){const c=i[s];let u=-1;const h=c.children.length-1;for(;u++<h;){const f=c.children[u];if(r===f.context.global){c.children.splice(u,1),c.children.push(t);return}}}}function ug(n,t){const e=n.context.providers;if(e)for(const r of e)for(let s=r.children.length-1;s>=0;--s)r.children[s].context.global===t&&r.children.splice(s,1);n.context.destroy$.next(),n.context.renderCount=0}function Ca(n,t){for(const e of n){const r=e.lastArray;if(r){Ca(r,t);continue}const s=e.value;if((s==null?void 0:s.tagJsType)===Y.subscribe){s.destroy(e,t),e.deleted=!0;continue}const i=e.global;if(!i)continue;const o=e.state.newest,c=i.subscriptions;c&&c.forEach(hg),Ts(o.templater)&&ug(o,i);const u=e.contexts;Ca(u,o),i.deleted=!0}}function lg(n,t=[],e=[]){for(const r of n){const s=r.global;if(!s)continue;const i=r.state.newest;if(i){t.push(i);const c=s.subscriptions;c&&e.push(...c)}const o=r.contexts;o&&lg(o,t,e)}return{tags:t,subs:e}}function hg(n){n.unsubscribe()}function Es(n,t){const e=n.context;t.deleted=!0,e.renderCount=0;const r=[],s=e.contexts;return Ca(s,n),n.templater.wrapper&&ug(n,t),eu(e,r),delete e.state,delete e.contexts,delete e.returnValue,delete e.providers,r}function pR(n,t,e,r,s){const i=t==null?void 0:t.arrayValue;let c=n!==(i||s);return c===!1&&i===void 0&&e.tagJsVar.hasValueChanged(t,e,void 0)&&(c=!0),c?(tu(e),r.splice(s,1),2):0}function tu(n){const t=n.global;gR(t,n)}function gR(n,t){var e;if(n&&((e=t.state)!=null&&e.oldest)){const r=t.state.oldest;Es(r,n);return}t.tagJsVar.destroy(t,{})}function dg(n){++n.updateCount;const t=n.lastArray;t&&fg(n,t)}function fg(n,t){for(let e=0;e<t.length;++e)tu(t[e]);delete n.lastArray}function es(n){for(let t=n.length-1;t>=0;--t){const e=n[t];mR(e),n.splice(t,1)}}function mR(n){const t=n.marker;t&&ts(t,"destroyMarker");const e=n.domElement;ts(e,"destroyClone")}function eu(n,t){n.contexts&&_R(n.contexts,t),n.htmlDomMeta&&es(n.htmlDomMeta)}function _R(n,t){var e;for(const r of n){if(r.withinOwnerElement){const u=r.tagJsVar;if(u&&u.tagJsType==="host"){const h=r.supportOwner,f=u.destroy(r,h);Dn(f)&&t.push(f)}continue}const s=r.lastArray;if(s){fg(r,s);continue}const i=r.simpleValueElm;if(i){delete r.simpleValueElm,ts(i,"smartRemoveByContext");continue}const o=r.global;if(o===void 0)continue;if(o.deleted=!0,(e=r.state)==null?void 0:e.oldest){eu(r,t);continue}}}function Sa(n){const t=n.context,e=t.global,r=t.contexts;if(r){const{subs:s,tags:i}=lg(r);for(const c of i){if(c.context.global.deleted===!0)return;Jh(c.context)}e.subscriptions&&s.forEach(hg)}Jh(t),_s(t)}function Jh(n){n.global.deleted=!0,eu(n,[]),delete n.contexts}function pg(n,t,e,r){const s=t.original,i=n.tagJsType===Y.stateRender,o=ot.stateConfig;eo(e);let c;if(i?c=n():(c=s(...r),typeof c===Z.function&&c.tagJsType===void 0&&(c=c())),!c)throw new Error(`A tag cannot return a value of type ${c===null?"null":typeof c}`);const u=e.context;return u.returnValue=c,e.returnValue=c,n.tag=c,u.state.newer={...o},vt(),e}function yR(n,t){const e=n.context;++e.renderCount,TR(n.context),ot.tagClosed$.next(t)}function TR(n){ER(n),wR()}function ER(n){const t=ot.stateConfig,e=n||t.context;e.state=e.state||{},e.state.newer={...t};const r=t.support;e.state.newest=r}function wR(){const n=ot.stateConfig;delete n.prevSupport,delete n.support,delete n.state,delete n.states,vt()}function gg(n,t,e,r){let s;const i=n.templater;if(i.tagJsType===Y.stateRender){const o=i;s=ho(i,e,r,n.appSupport),pg(i,o,s)}else{const o=i.wrapper;s=o(n,e,t)}return yR(s,r),s.ownerSupport=n.ownerSupport,s}function IR(n){const t=ot.stateConfig;return t.rearray=n,t.state=[],t.states=[],t.statesIndex=0,t.handlers.handler=Gv,t.handlers.statesHandler=qv,t}function AR(n,t,e){IR(e);const r=ot.stateConfig;r.prevSupport=t,eo(n)}function bR(n,t,e,r){const i=e.state.older.state;return AR(n,t,i),gg(n,t,e,r)}function mg(n,t,e,r){ig(n.context),eo(n);const s=gg(n,t,e,r);return vt(),s}function vR(n){var r;const t=n==null?void 0:n.context,e=t==null?void 0:t.state;return(r=e==null?void 0:e.older)==null?void 0:r.state}function nu(n,t){var r;const e=Kh(n,t);return!e&&((r=t.templater.tag)!=null&&r._innerHTML)&&Kh(n.outerHTML,t)?!0:e}function Kh(n,t){const e=n.templater,r=t.templater,s=(e==null?void 0:e.tag)||n,i=r.tag;if((e==null?void 0:e.tagJsType)===Y.stateRender)return e.dom===r.dom;if(!i&&!s.returnValue)return!0;if(!s.returnValue)return!1;throw new Error(`unknown tagJsType of ${s.tagJsType}`)}function RR(n,t,e){let r;vR(t)?r=bR(n,t,e):r=mg(n,t,e);const i=!t||nu(t,r);if(i){if(t){const o=t.templater.tag;if(o&&e.renderCount>0){const c=t==null?void 0:t.templater,u=c==null?void 0:c.tag;CR(o,t,u)}}}else{fR(t,r),Sa(t);const o=r.context;o.state.oldest=r,o.state.newest=r}return r.ownerSupport=n.ownerSupport,{support:r,wasLikeTags:i}}function CR(n,t,e){if(n.tagJsType===Y.dom){const r=e==null?void 0:e.dom,s=n.dom;r!==s&&Sa(t);return}if(e){const r=e.strings;if(r){const s=r==null?void 0:r.length,i=n.strings.length;s!==i&&Sa(t)}}}function SR(n,t,e){const r=RR(t,n,e);if(r.wasLikeTags){const s=e.state.oldest;return cg(s,r.support),r.support}}function PR(n){const t=n.context;return SR(n,n,t)}function kR(n){if(!n)return Ut;const t=ee();if(!t)throw new Error("output must be used in render sync with a parent context");const e=Kc(t);if(!e)throw new Error("output must be used in render sync fashion");if(n.wrapped===!0)return n;const r=(...s)=>{const i=e.ownerSupport;return VR(s,n,i.context)};return r.wrapped=!0,r}function VR(n,t,e){Nt(e);const r=t(...n);return DR(r,e)}function DR(n,t){vt();const r=()=>{const s=t.global;if(s===void 0||s.deleted===!0){++st.locks;const o=t;o.tagJsVar.processUpdate(o.value,o,void 0,[]),--st.locks,Kt();return}++st.locks,PR(void 0),--st.locks,Kt()};return Dn(n)&&n.then(()=>{Je.push([r,[]])}),Je.push([r,[]]),n}function NR(n,t){++n.updateCount;const e=n.subContext,r=_g(e,t);return delete n.subContext,r}function _g(n,t){n.deleted=!0;const e=n.appendMarker;if(e&&(ts(e,"deleteSubContext"),delete n.appendMarker),!n.hasEmitted)return;const r=n.contextItem;return r.tagJsVar.destroy(r,t),76}function OR(n,t,e,r){const s=t.tagJsType;if(!t||!s||s!==n)return r.tagJsVar.destroy(r,e),Is(t,r,e,99),99}function yg(n,t,e){const r=t.subContext,s=OR(Y.subscribe,n,e,t);return s||(!r||!r.hasEmitted||(r.tagJsVar=n,r.valuesHandler(r.lastValues,0)),0)}function MR(n,t,e,r,s){const i=t.context;if(i.locked=3,e.target=e.target||r,Nt(e),e.inputsHandler){const o=t.propsConfig;e.inputsHandler(o)}e.tagJsVar.processInit(n,e,t,s,r),vt(),e.value=n,delete i.locked}function io(n){switch(n){case void 0:case!1:case null:return ys}return n}function LR(n,t){const e=io(n);if(t.paint){t.paint[1][1]=e;return}const r=t.simpleValueElm;re.push([Nv,[e,r]])}function xR(n,t){t.value=n,t.oldTagJsVar=t.tagJsVar,t.tagJsVar=Ig(n);const e=t.placeholder,r=io(n),s=t.paint=[ng,[e,r,function(o){t.simpleValueElm=o,delete t.paint},"processNowRegularValue"]];te.push(s)}function oo(n,t){if(n.startsWith("class."))return"class";if(n.startsWith("style."))return"style";const e=UR(n);return e!==!1?e:n==="value"&&t==="SELECT"?"value":!1}function UR(n){switch(n){case"autoselect":case"autoSelect":return"autoselect";case"autofocus":case"autoFocus":return"autofocus"}return!1}function FR(n,t,e){typeof n[t]!="object"&&(n[t]={});for(const r in e){const s=e[r];re.push([qR,[n,t,r,s]])}if(n[t].setProperty)for(const r in e){const s=e[r];re.push([$R,[n,t,r,s]])}}function BR(n,t,e){n.setAttribute(t,"")}function Ce(n,t,e){if(ro(e))return FR(n,t,e);Tg(n,t,e)}function jR(n,t,e){e?n[t]=!0:n[t]=!1}function Tg(n,t,e){if(n[t]=e,e===void 0||e===!1||e===null){n.removeAttribute(t);return}n.setAttribute(t,e)}function $R(n,t,e,r){n[t].setProperty(e,r)}function qR(n,t,e,r){n[t][e]=r}function Eg(n,t,e,r){switch(r){case"autofocus":Je.push([KR,[e]]);return;case"autoselect":Je.push([JR,[e]]);return;case"style":{const s=n.split(".");re.push([HR,[e,s,t]]);return}case"class":zR(n,t,e);return;case"value":Ce(e,n,t),Je.push([s=>{s.value=t},[e]]);return}throw new Error(`Invalid special attribute of ${r}. ${n}`)}function HR(n,t,e){const r=t[1];n.style[r]=e,n.style.setProperty(r,e)}function zR(n,t,e){const r=n.split(".");if(r.shift(),t){for(const s of r)re.push([WR,[e,s]]);return}for(const s of r)re.push([GR,[e,s]])}function WR(n,t){n.classList.add(t)}function GR(n,t){n.classList.remove(t)}function JR(n){n.select()}function KR(n){n.focus()}function QR(n,t,e,r,s){const i=n(),o={component:!1,tagJsType:"dynamic-attr",matchesInjection:h=>{const f=c.tagJsVar;if(f.matchesInjection)return f.matchesInjection(h,c)},hasValueChanged:(h,f,p)=>{const m=n();return c.tagJsVar.hasValueChanged(m,c,p)},processInit:Ut,processInitAttribute:Ut,destroy:(h,f)=>{c.tagJsVar.destroy(c,f)},processUpdate:(h,f,p,m)=>{++f.updateCount;const A=h();c.tagJsVar.processUpdate(A,c,p,m),c.value=A}},c={description:"sub-context",updateCount:0,isAttr:!0,target:r,parentContext:t,value:i,tagJsVar:cn(i),withinOwnerElement:!0,destroy$:new et,render$:new et},u={description:"override-context",updateCount:0,isAttr:!0,contexts:[c],target:r,parentContext:t,value:n,tagJsVar:o,withinOwnerElement:!0,destroy$:new et,render$:new et};return c.tagJsVar.processInitAttribute(e,i,r,c.tagJsVar,c,{},s),u}function XR(n,t,e,r,s,i,o){return e.target=r,e.howToSet=s,e.attrName=n,e.isSpecial=o,t!=null&&t.tagJsType?YR(n,t,e,i,r):ao(n,t,r,s,o,e)}function YR(n,t,e,r,s){t.processInitAttribute(n,t,s,t,e,r,Ce),e.tagJsVar=t}function ao(n,t,e,r,s,i){if(typeof t=="function")return QR(t,i,n,e,r);if(s)return Eg(n,t,e,s);r(e,n,t)}function wg(n,t,e,r,s,i){const o=t.tagJsVar,c=n;if(o.hasValueChanged(c,t,e)>0){o.destroy(t,e),r.removeAttribute(s);const h=cn(n);h.isAttr=!0,h.processInitAttribute(s,n,r,h,t,e,i),t.tagJsVar=h;return}}function ZR(n,t,e,r,s,i,o){r.destroy=tC,r.hasValueChanged=rC,r.processUpdate=(u,h,f)=>wg(u,h,f,e,n,o);const c=oo(n,e.tagName);ao(n,t,e,o,c,s),s.tagJsVar=r}function tC(n){const t=n.target,e=n.attrName;t.removeAttribute(e)}function Ig(n){return{component:!1,tagJsType:"simple",value:n,processInitAttribute:ZR,processInit:nC,destroy:Ag,hasValueChanged:sC,processUpdate:eC}}function eC(n,t,e){return n===t.value?0:su(t,n,e)}function nC(n,t,e,r,s){const i=io(n);r=t.placeholder;const o=t.paint=[ng,[r,i,function(u){t.simpleValueElm=u,delete t.paint},"processSimpleValueInit"]];te.push(o)}function Ag(n){const t=n.simpleValueElm;if(!t){if(n.paint){n.paint[0]=Ut;return}if(n.value===void 0||n.value===!1||n.value===null)return}delete n.simpleValueElm,ts(t,"deleteSimpleValue")}function rC(n,t){return n==null||n===t.value?0:6}function sC(n,t){return n==null||![Z.object,Z.function].includes(typeof n)?(LR(n,t),0):(Ag(t),6)}function iC(n,t){return Gt(n)?0:9}function Nn(n,t,e){const r=t.tagJsVar.processUpdate(n,t,e,[]);return t.value=n,r||0}const Qh=Symbol("not-casted"),oC=[];function Ci(n,t,e,r){const s=n.lastArray===void 0;s&&(n.lastArray=[]);const i=n.lastArray;let o=n.placeholder;const c=t.length,u=new Array(c).fill(Qh),h=function(A){const C=u[A];if(C!==Qh)return C;const k=dC(t[A]);return u[A]=k,k};let f=s?!1:c!==i.length;s||(f=aC(i,t,n,f,h).batchUpdates);const p=n.lastArray;for(let m=0;m<c;++m)o=cC(m,p,e,f,h,o,r).placeholder}function aC(n,t,e,r,s){const i=[];let o=0;const c=t.length-1;for(let u=0;u<n.length;++u){const h=n[u];if(h.locked===1&&(r=!0),h.value===null){i.push(h);continue}const f=lC(u,n,o,c,s);if(f===0){i.push(h);continue}if(f===2){u=u-1;continue}o=o+f}return e.lastArray=i,{batchUpdates:r}}function cC(n,t,e,r,s,i,o){const c=s(n),u=t[n];if(u)return uC(c,u,e,r);const h=vg(c,e,t,i,o);return t.push(h),c&&(h.arrayValue=c.arrayValue||h.arrayValue),h}function uC(n,t,e,r,s,i){return r?(Dv(t,[hC,[n,t,e]]),t.value=n,t):Array.isArray(n)?(t.tagJsVar.processUpdate(n,t,e,oC),t.value=n,t):(Nn(n,t,e),t)}function lC(n,t,e,r,s){const i=n-e,o=i<0||r<i,c=t[n];if(o)return tu(c),1;c.arrayValue===void 0&&(c.arrayValue=n);const u=c.arrayValue,h=s(n);return pR(u,h,c,t,n)}function hC(n,t,e){Nn(n,t,e)}function dC(n){if(typeof n!="function")return n;const t=n;return t.tagJsType!==void 0?n:t()}function bg(n){return{component:!1,tagJsType:"array",value:n,processInitAttribute:Ut,processInit:pC,processUpdate:fC,hasValueChanged:iC,destroy:dg}}function fC(n,t,e){++t.updateCount;const s=t.tagJsVar.hasValueChanged(n,t,e);return s?(dg(t),Is(n,t,e,s),s):Array.isArray(n)||Nn(n,t,e)===0?(Ci(t,n,e),0):1}function pC(n,t,e,r,s){Ci(t,n,e,s)}function cn(n){return(n==null?void 0:n.tagJsType)?n:gC(n)}function gC(n){return Gt(n)?bg(n):Ig(n)}function co(n,t,e,r,s){return{description:"getNewContext",updateCount:0,value:n,destroy$:new et,render$:new et,tagJsVar:s||cn(n),withinOwnerElement:e,parentContext:r}}function vg(n,t,e,r,s){const i=document.createTextNode(ys),o=co(n,e,!0,t.context);return o.withinOwnerElement=!1,o.placeholder=i,s||(o.placeholder=r),MR(n,t,o,s,r),s&&no.push([Jc,[s,i]]),o}function Rg(n,t,e,r){return t.hasEmitted=!0,t.contextItem=vg(n,e,[],r)}function Cg(n,t,e){var o;++t.updateCount;const s=n.owner._innerHTML;s.processInit=s.oldProcessInit;const i=(o=t.subContext)==null?void 0:o.contextItem;su(i,s,e)}function mC(n,t,e,r,s){t.subContext={},n.processUpdate=Cg,_C(n,e,t,r,s)}function _C(n,t,e,r,s){const{appendMarker:i,insertBefore:o}=Hg(s,r),c=e.subContext;c.appendMarker=i;const h=n.owner._innerHTML;h.processInit=h.oldProcessInit,Rg(h,c,t,o)}function Sg(){return{component:!1,tagJsType:"innerHTML",hasValueChanged:()=>0,processInitAttribute:Ut,processInit:mC,processUpdate:Cg,destroy:NR}}function uo(n){++n.updateCount;const t=n.global,r=n.state.newest;delete n.inputsHandler,delete n.updatesHandler,Es(r,t),yC(n)}function yC(n){n.htmlDomMeta=[],delete n.contexts,delete n.state,delete n.global,n.renderCount=0}function TC(n,t){var o;const e=(o=t.state)==null?void 0:o.newest,r=rg(n),s=n;if(r)return nu(s,e)?0:7;if(n==null?void 0:n.tagJsType){const c=t.value;if(!c&&n)return 88;const u=c.wrapper,h=n.wrapper;return(h==null?void 0:h.original)===(u==null?void 0:u.original)?0:88}return 8}function lo(n,t){var c;const e=t.global,r=(c=t.state)==null?void 0:c.newest,s=rg(n),i=n;if(s)return nu(i,r)?(Pa(t,n,r),0):(Es(r,e),_s(t),7);if(n==null?void 0:n.tagJsType){const f=t.state.newest.ownerSupport;return Pa(t,n,f)===!0?0:88}return uo(t),8}function EC(n,t){const e={component:!1,tagJsType:Y.templater,processInit:"",processInitAttribute:Ut,processUpdate:Nn,hasValueChanged:lo,destroy:uo,propWatch:n,props:t,key:function(s){return e.arrayValue=s,e},matchesInjection(r,s){var i;if(e.wrapper===r||((i=e.wrapper)==null?void 0:i.original)===(r==null?void 0:r.original))return s}};return e}const ns=[];function wC(n,t){return function(s,i,o){const c=Pg(n,s,o),u=s.ownerSupport,h=ho(n,i,u,s.appSupport,c);return pg(n,t,h,c)}}function Pg(n,t,e){const r=n.propWatch===se.DEEP?ru:jg,s=n.props,i=t.propsConfig;let o=i.castProps;const c=e==null?void 0:e.propsConfig,u=c==null?void 0:c.castProps;return u&&(i.castProps=u,o=dR(t,e,e.ownerSupport,s,r)),o||Yc(s)}function IC(n,t){const r=n.Observables[0];if(!t.hasEmitted){if("withDefault"in n){t.subValueHandler(n.withDefault,0);return}if("value"in r){t.subValueHandler(r.value,0);return}return}const s=t.lastValues[0].value;t.subValueHandler(s,0)}function AC(n,t,e,r,s,i){t.destroy=Wg;const o=oo(n,e.tagName),c=function(f,p){ao(n,f,e,Ce,o,s),ka(p)},u=zg(t.Observables,i,c,t,s);return s.subContext=u,s.value=t,s.tagJsVar=t,t.processUpdate=function(f,p,m){return wg(f,s,m,e,n,Ce)},{subContext:u,onOutput:c}}function bC(n,t){if(!(n!=null&&n.tagJsType))return 1;const e=n.Observables;if(!e)return 2;const s=t.value.Observables;return!s||s.length!==e.length?3:e.every((o,c)=>o===s[c])?0:4}function kg(n,t){return{component:!1,onOutput:Ut,tagJsType:Y.subscribe,processInitAttribute:AC,processInit:sS,hasValueChanged:bC,processUpdate:yg,destroy:iS,callback:t,Observables:[n]}}kg.all=vC;function vC(n,t){return kg(et.all(n),t)}function RC(n,t,e,r){const s={component:!1,tagJsType:"tag-conversion",processInitAttribute:Ut,processInit:(i,o,c)=>{const u=n.returnValue;return t.tagJsVar.processInit(u,t,e,r.placeholder)},processUpdate:(i,o,c)=>{if(o.locked||o.deleted)return;++o.updateCount;const u=o.value,h=u==null?void 0:u.tagJsType,p=(i==null?void 0:i.tagJsType)!==h;if(TC(i,o)||p||s.hasValueChanged(i,o,e)){s.destroy(o,e),Is(i,o,c,789);return}o.locked=467,o.render$.next();const C=o.returnValue;CC(t,i,o,C,e),delete o.locked},hasValueChanged:(i,o,c)=>{const u=n.returnValue;return t.tagJsVar.hasValueChanged(u,t,c)},destroy:(i,o)=>{++n.updateCount,n.deleted=!0,delete n.returnValue;const c=t.tagJsVar.destroy(t,e);return Dn(c)?c.then(()=>{const u=Xh(n);return Kt(),u}):(n.destroy$.next(),Xh(n))}};return s}function Vg(n,t,e){const r=n.context,s=n.returnValue,i=cn(s);delete r.global,r.contexts=[];const o={updateCount:0,value:s,tagJsVar:i,destroy$:new et,render$:new et,placeholder:r.placeholder,withinOwnerElement:!0,parentContext:r,contexts:r.contexts},c=RC(r,o,n,e);return r.subContext=o,r.tagJsVar=c,i.processInit(s,o,n,e.placeholder),n}function Dg(n,t,e){const r=ho(n,t,e,e==null?void 0:e.appSupport),s=r.propsConfig;if(s){const o=n.tagJsType!==Y.tagComponent?[]:Pg(n,r);s.castProps=o}return mg(r,t.state.newest,t)}function Ng(n,t,e){const r=Dg(n,t,e);return r.templater.tag?Vg(r,r.ownerSupport,t):r}function CC(n,t,e,r,s){const i=Yc(t.props),o=n.value;o.props=i;const c=s.propsConfig;if(c&&(c.castProps=i),(t==null?void 0:t.tagJsType)==="tagComponent"){if(n.inputsHandler=e.inputsHandler,n.updatesHandler=e.updatesHandler,e.value=t,e.inputsHandler){Nt(e);const u=e.inputsHandler;u(i),vt()}if(e.updatesHandler){Nt(e);const u=e.updatesHandler;u(i),vt()}}n.tagJsVar.processUpdate(r,n,s,[]),n.value=r}function Xh(n,t){delete n.returnValue,delete n.global,n.contexts=[],n.htmlDomMeta=[],delete n.inputsHandler,delete n.updatesHandler}function SC(n,t,e,r){const s=Dg(n,t,e);return Vg(s,e,t)}function Og(n,t,e,r,s){return _s(t),s?SC(n,t,e):Ng(n,t,e)}function PC(n){var s,i;const t=ee();if(!t)throw new Error("tag.inject can only be called within a tag or host context");let e=t.parentContext;for(;e;){const o=e.contexts;if(o){for(const c of o)if(c.isAttr&&((s=c.tagJsVar)!=null&&s.matchesInjection)){const u=c.tagJsVar.matchesInjection(n,c);if(u!==void 0)return u.returnValue}}if((i=e.tagJsVar)!=null&&i.matchesInjection&&e.tagJsVar.matchesInjection(n,e))return e.returnValue;e=e.parentContext}const r=`Could not find parent context for tag.inject ${n}`;throw console.error(r,{targetItem:n,context:t}),new Error(r)}function kC(n,t){return VC(n,t)}function VC(n,t,e=[]){const r=n.context;e.push({support:n,renderCount:r.renderCount,provider:t});const s=t.children;for(let i=s.length-1;i>=0;--i){const o=s[i],c=o.context;e.push({support:o,renderCount:c.renderCount,provider:t})}return e}function DC(n){const e=n.context.providers;if(!e)return[];const r=[];for(const s of e){const i=s.owner,o=kC(i,s);r.push(...o.map(NC))}return r}function NC(n){return n.support}function OC(n){return Y.templater===n.tagJsType}function MC(n,t){const e=t.context.global;return e&&e.deleted?!1:!!LC(n,t)}function LC(n,t){const e=n.props,s=t.propsConfig.latest;if(xC(e,s))return!0;switch(n.propWatch){case se.IMMUTABLE:return XC(e,s);case se.SHALLOW:return aR(e,s)}return!rR(e,s,ru)}function xC(n,t){const e=n.length,r=t.length;return e!==r}function Si(n,t=[]){const e=n.context,r=n.templater,s=OC(r),i=n.ownerSupport;if(e.locked)return t.push(n),t;if(s)return Si(i,t);const o=n.context.global;if(o&&o.deleted===!0)return t;const c=n,u=Ts(c.templater),h=n.templater.tagJsType,p=i&&h!==Y.stateRender&&(!u||MC(c.templater,c));if(c.context.providers){const A=DC(c);t.push(...A)}return p?(Si(i,t),u&&t.push(c),t):(t.push(c),t)}const UC=[];function Mg(n){++st.locks;for(let t=0;t<n.length;++t)Lg(n[t]);--st.locks,Kt()}function FC(n){++st.locks,Lg(n),--st.locks,Kt()}function Lg(n){const t=n.context;t.tagJsVar.processUpdate(t.value,t,n.ownerSupport,UC)}function xg(n,t,{resolvePromise:e,resolveValue:r}){return Dn(n)?n.then(BC(t,e)):r(n)}function BC(n,t){return e=>{const r=n.context,s=r.global;if(r.deleted===!0||(s==null?void 0:s.deleted)===!0)return t(e);const i=Si(n);return Mg(i),t(e)}}function Qt(n){return ot.stateConfig.handlers.handler(n)}function jC(n){return Qt(()=>{var r;const t=n(),e=Ri();return(r=e==null?void 0:e.context)!=null&&r.global?xg(t,e,{resolvePromise:$C,resolveValue:qC}):t}),at}function $C(n){return n}function qC(n){return n}function HC(n){return Qt(function(){ee().destroy$.toCallback(n)}),at}function zC(n,t,e,...r){const s=e(...r),i=Kc(n);if(!i)return s;if(!i.context.global){const o=i.context;o.tagJsVar.processUpdate(o.value,o,i.ownerSupport,[])}return Dn(s)&&s.finally(()=>{if(!n.global){const o=i.context;o.tagJsVar.processUpdate(o.value,o,i.ownerSupport,[])}}),s}function Ug(n){const t=ee(),e=Qt({callback:n}),r=Qt(()=>Fg(t,ot.stateConfig,e));return e.callback=n,r}function Fg(n,t,e){const r=t.states;return function(...i){const o=zC(n,r,e.callback,...i);return Kt(),o}}function WC(n){const t=ee(),e=i=>{Nt(t);const o=n();return vt(),o},r=t.render$.subscribe(()=>{e()}),s=e();return at.onDestroy(()=>r.unsubscribe()),s}let GC=0;const qr=Bg("click"),Xn=Bg("mousedown");function Bg(n){return function(e){const r=Ug(e);return Qt(()=>{Gg().addEventListener(n,r)}),r}}const JC={get:Gg,onclick:qr,click:qr,onClick:qr,mousedown:Xn,onmousedown:Xn,onMouseDown:Xn};ws("onclick",qr);ws("click",qr);ws("onMouseDown",Xn);ws("onmousedown",Xn);ws("mousedown",Xn);function ws(n,t){Object.defineProperty(at,n,{get(){return t},set(e){return t(e)}})}var se;(function(n){n.DEEP="deep",n.SHALLOW="shallow",n.NONE="none",n.IMMUTABLE="immutable"})(se||(se={}));function at(n,t=se.SHALLOW){if(ee())throw new Error("A TaggedJs tag was created within a running tag. All component tags must be created outside of anyother tag");const r=function(...c){const u=EC(t,c);u.tagJsType=Y.tagComponent,u.processInit=Og,u.hasValueChanged=lo;const h=wC(u,r);return h.original=n,u.wrapper=h,u},s=n;r.original=n,s.tags=ns,s.setUse=ot,s.ValueTypes=Y,s.tagIndex=GC++,ns.push(r);const i=r;return i.inputs=o=>{const c=ee();c.inputsHandler=o;const u=c.tagJsVar;return o(u.props),!0},i.updates=o=>{const c=ee();return c.updatesHandler=o,!0},i.getInnerHTML=Sg,i}function KC(n){throw new Error("Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `")}function QC(){throw new Error("Do not call tag.use as a function but instead set it as: `(props) => tag.use = (use) => html`` `")}at.element=JC;at.use=QC;at.deepPropWatch=at;at.route=KC;at.inject=PC;at.output=kR;at.onInit=jC;at.onDestroy=HC;at.callback=Ug;at.onRender=WC;at.getInnerHTML=Sg;at.app=function(n){throw new Error("Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `")};at.immutableProps=function(t){return at(t,se.IMMUTABLE)};at.watchProps=function(t){return at(t,se.SHALLOW)};Object.defineProperty(at,"use",{set(n){n.original={setUse:ot,tags:ns},n.tagJsType=Y.stateRender,n.processInit=Og,n.processUpdate=Nn,n.hasValueChanged=lo,n.destroy=uo}});Object.defineProperty(at,"promise",{set(n){hS(n)}});function XC(n,t){const e=n.length;for(let r=0;r<e;++r){const s=n[r],i=t[r];if(s!==i)return 2}return!1}const jg=3,ru=10;function YC(n,t,e){const r=n.templater;if(r.tagJsType!==Y.stateRender){switch(r.propWatch){case se.IMMUTABLE:return n.propsConfig={latest:t,castProps:e};case se.SHALLOW:return n.propsConfig={latest:t.map(ZC),castProps:e}}return n.propsConfig={latest:t.map(tS),castProps:e}}}function ZC(n){return Xc(n,jg)}function tS(n){return Xc(n,ru)}function $g(n,t,e){const r={templater:n,context:t,castedProps:e,appSupport:void 0},s=t.global;return s.blocked=[],t.state||(t.state={newer:{state:[],states:[]}}),r}function qg(n,t,e,r){t.appSupport=e||t;const s=n.props;return s&&(t.propsConfig=YC(t,s,r)),t}function ho(n,t,e,r,s){const i=$g(n,t,s);return i.ownerSupport=e||i,i.ownerSupport.appSupport=r||i.ownerSupport,qg(n,i,r,s)}function eS(n,t,e,r){let s=e.templater||e;const i=n.templater.tag;i&&i._innerHTML&&(s=e._innerHTML);const o=ho(s,t,r,r.appSupport),u=n.context.state.oldest;cg(u,o)}function Pa(n,t,e){if(Ts(t))return n.global===void 0&&_s(n),n.oldTagJsVar=n.tagJsVar,n.tagJsVar=t,nS(t,n,e),!0;if(n.global){n.oldTagJsVar=n.tagJsVar,n.tagJsVar=t;const i=n.state.newest;if(i)return typeof t===Z.function||eS(i,n,t,e),!0}if(n.inputsHandler){const i=e.propsConfig;n.inputsHandler(i)}return t.processInit(t,n,e,n.placeholder),n.oldTagJsVar=n.tagJsVar,n.tagJsVar=t,!0}function nS(n,t,e){if(!t.state.newest){if(t.inputsHandler){const r=e.propsConfig;t.inputsHandler(r)}n.processInit(n,t,e,t.placeholder);return}}function Is(n,t,e,r){const s=n&&n.tagJsType;if(delete t.deleted,s){Pa(t,n,e);return}if(Gt(n)){Ci(t,n,e),t.oldTagJsVar=t.tagJsVar,t.tagJsVar=bg(n);return}if(typeof n===Z.function){t.value=n;return}r&&xR(n,t)}function su(n,t,e){const s=n.tagJsVar.hasValueChanged(t,n,e);return s===0||Is(t,n,e,s),s}function Hg(n,t){let e;return n&&(e=t=document.createTextNode(ys),no.push([Jc,[n,t]])),{appendMarker:e,insertBefore:t}}function rS(n,t,e){const r=yg(n,t,e);if(t.hasEmitted!==!0){const s=t.value.Observables;if(!s||!("value"in s[0]))return}if(r===0&&n.callback){const s=t.subContext;IC(n,s)}}function sS(n,t,e,r,s){const i=n.Observables,{appendMarker:o,insertBefore:c}=Hg(s,r);let u=function(p,m,A){Rg(p,A,e,c),ka(m),u=A.tagJsVar.onOutput=function(k,V,B){const U=B.contextItem;su(U,k,e),U.tagJsVar.processUpdate(k,U,e,[k]),U.value=k,ka(V)}};const h=zg(i,e,(f,p,m)=>u(f,p,m),n,t);return h.appendMarker=o,t.subContext=h,n.processUpdate=rS,n.onOutput=u,h}function zg(n,t,e,r,s){function i(h,f){var p;u.lastValues[f]={value:h,tagJsVar:cn(h),oldTagJsVar:(p=u.lastValues[f])==null?void 0:p.tagJsVar},o(u.lastValues,f)}function o(h,f){const p=u.tagJsVar;if(p==null?void 0:p.callback){Nt(s);const C=p.callback(...h.map(k=>k.value));e(C,c,u),vt();return}const A=h[f].value;e(A,c,u)}let c=!0;const u={lastValues:[],subValueHandler:i,valuesHandler:o,tagJsVar:r,subscriptions:[]};return n.forEach((h,f)=>{c=!0,u.subscriptions.push(h.subscribe(p=>i(p,f))),c=!1}),r.onOutput=e,u}function Wg(n){const t=n.subContext;if(!t)return;t.subscriptions.forEach(r=>r.unsubscribe()),delete n.subContext}function iS(n,t){++n.updateCount;const e=n.subContext;return Wg(n),_g(e,t)}function ka(n){n||ot.stateConfig.support||Kt()}class oS extends et{constructor(e){super(e);Xt(this,"value");this.value=e}subscribe(e){const r=super.subscribe(e);return e(this.value,r),r}}const aS=((n,t)=>iu(n,t).pastResult),cS=n=>n;function uS(n){const t=(e,r)=>iu(e,r,n).pastResult;return t.setup=n,ou(()=>t,t),t}const iu=(n,t,{init:e,before:r,final:s=cS}={})=>{const i=Qt({pastResult:void 0,values:void 0}),c=typeof n=="function"?n():n,u=i.values===void 0;let h=0;u&&typeof n=="function"&&at.onRender(()=>{if(++h,h===1)return;const p=n();f(p)});function f(p){if(i.values===void 0){if(r&&!r(p))return i.values=p,i;const k=(e||t)(p,i.values);return i.pastResult=s(k),i.values=p,i}if(p.every((C,k)=>C===i.values[k]))return i;if(r&&!r(p))return i.values=p,i;const A=t(p,i.values);return i.pastResult=s(A),i.values.length=0,i.values.push(...p),i}return f(c)};function ou(n,t){return Object.defineProperty(t,"noInit",{get(){const e=n();return e.setup.init=()=>{},e}}),Object.defineProperty(t,"asSubject",{get(){const e=n(),r=Qt(()=>Ri()),s=Qt(()=>new oS(void 0));Qt(()=>({state:ot.stateConfig.state,states:ot.stateConfig.states}));const i=(o,c)=>(iu(o,(h,f)=>{const p=Ri(),m=c(h,f);p!==r&&r.context.state.older,s.next(m)},e.setup),s);return i.setup=e.setup,ou(()=>i,i),i}}),Object.defineProperty(t,"truthy",{get(){const e=n();return e.setup.before=r=>r.every(s=>s),e}}),t}ou(()=>uS({}),aS);class au extends Error{constructor(e,r,s={}){super(e);Xt(this,"details");this.name=au.name,this.details={...s,errorCode:r}}}class cu extends au{constructor(t,e){super(t,"sync-callback-error",e),this.name=cu.name}}new cu("callback() was called outside of synchronous rendering. Use `callback = callbackMaker()` to create a callback that could be called out of sync with rendering");const lS=()=>{};function hS(n){const t=ee(),e=Qt({callback:lS}),r=Qt({current:void 0}),s=Qt(()=>Fg(t,ot.stateConfig,e));if(r.current!==n){r.current=n;const i=n;n.then(()=>{r.current===i&&s()})}}function ee(){return ot.stateConfig.context}function Gg(){return ee().target}const ri=[];function Nt(n){return ri.push(n),ot.stateConfig.context=n}function vt(){ri.pop(),ot.stateConfig.context=ri[ri.length-1]}function dS(n,t,e,r,s,i,o){const c=document.createTextNode(ys);if(ns.push(e.wrapper||{original:e}),i.placeholder=c,t.isApp=!0,!s)throw new Error(`Cannot tagElement, element received is type ${typeof s} and not type Element`);s.destroy=function(){const p=i.events;for(const A in p){const C=p[A];s.removeEventListener(A,C)}i.events={},++st.locks;const m=Es(f,t);return--st.locks,Kt(),m},++st.locks;const u=document.createDocumentFragment();u.appendChild(c);const f=Ng(e,i,{appSupport:{appElement:s,context:i},appElement:s,context:i,isRoot:!0});return f.appElement=s,o&&(r.tag=f.templater.tag),--st.locks,Kt(),s.appendChild(u),{support:f,tags:ns,ValueTypes:Y}}function fS(n,t,e){const r=$g(n,t);return qg(n,r,r),r.appElement=e,r.context=t,t.state.oldest||(t.state.oldest=r,t.state.older=t.state.newer),t.state.newest=r,r}typeof document=="object"&&(document.taggedJs&&console.warn("🏷️🏷️ Multiple versions of taggedjs are loaded. May cause issues."),document.taggedJs=!0);const Xo=[],Yh="__taggedjs_tag_element__";function DP(n,t,e){const r=t[Yh],s=Xo.findIndex(m=>m.element===t);if((r||s>=0)&&console.warn("tagElement called multiple times for the same element",{element:t}),s>=0){const m=Xo[s].support;Es(m,m.context.global),Xo.splice(s,1)}t[Yh]=!0,t.innerHTML="";let i=(()=>h(e));i.propWatch=se.NONE,i.tagJsType=Y.stateRender,i.processUpdate=Nn,i.props=[e],i.isApp=!0;const o=pS(i,t),c=o.global,u=o.state.newest;ig(u.context),eo(u);let h=n(e);const f=typeof h==Z.function;f||(Ts(h)?(o.state.newest.propsConfig={latest:[e],castProps:[e]},i.propWatch=h.propWatch,i.tagJsType=h.tagJsType,i.wrapper=h.wrapper,i=h):(i.tag=h,h=n));const p=dS(n,c,i,h,t,o,f);return vt(),p}function pS(n,t){const e={component:!1,tagJsType:"templater",hasValueChanged:lo,destroy:uo,processInitAttribute:Ut,processInit:function(){console.debug("do nothing app function")},processUpdate:Nn},r={updateCount:0,value:n,varCounter:0,destroy$:new et,render$:new et,withinOwnerElement:!1,renderCount:0,global:void 0,state:{},tagJsVar:e};return _s(r),r.events={},fS(n,r,t),r}const Jg=":tagvar",gS=":";function mS(n){return Array.isArray(n)&&Object.prototype.hasOwnProperty.call(n,"raw")}function _S(n,t){return function(r,s,i){if(mS(s)){const o=[];for(let u=0;u<s.length;++u)o.push(s[u]),u<i.length&&o.push(String(i[u]??""));const c=o.join("");return t(r,[n,c])}return t(r,[n,s])}}const yS=[["alt","alt"],["ariaLabel","aria-label"],["referrerPolicy","referrerpolicy"],["autoFocus","autoFocus"],["border","border"],["id","id"],["for","for"],["fill","fill"],["content","content"],["charset","charset"],["cellPadding","cellpadding"],["cellSpacing","cellspacing"],["class","class"],["href","href"],["lang","lang"],["loading","loading"],["value","value"],["placeholder","placeholder"],["src","src"],["title","title"],["width","width"],["height","height"],["type","type"],["min","min"],["max","max"],["step","step"],["name","name"],["wrap","wrap"],["checked","checked"],["disabled","disabled"],["selected","selected"],["minLength","minLength"],["maxLength","maxLength"],["inputMode","inputMode"],["open","open"],["rel","rel"],["required","required"],["readonly","readonly"],["readOnly","readonly"],["rows","rows"],["style","style"],["target","target"],["viewBox","viewBox"],["valign","valign"]];function TS(n,t,e){const r=As(n,n.elementFunctions);return Kg(r,t,e)}function Kg(n,t,e){function r(s){return r.toCallback(s)}return r.toCallback=e,n.listeners.push([t,r]),n.allListeners.push([t,r]),n}function Qg(n,t){const e=As(n,n.elementFunctions);return CS(t[0],t[1],e),e}function ES(n,t){const e=As(n,n.elementFunctions);for(const r in t){if(!Object.prototype.hasOwnProperty.call(t,r))continue;const s=t[r];e.attributes.push([r,s]),Yg(e,s),rs(r)?ki(r,e):rs(s)&&ki(s,e)}return e}const wS=Object.fromEntries(yS.map(([n,t])=>[n,_S(t,Qg)])),IS=[["onClose","onclose"],["onCancel","oncancel"],["onDoubleClick","ondblclick"],["onClick","click"],["onBlur","onblur"],["onChange","onchange"],["onInput","oninput"],["contextMenu","contextmenu"],["onMouseDown","onmousedown"],["onMouseUp","onmouseup"],["onMouseOver","onmouseover"],["onMouseOut","onmouseout"],["onKeyDown","onkeydown"],["onKeyUp","onkeyup"]];function Xg(n,t){return n.attributes.push(t),Yg(n,t[1]),rs(t[0])?ki(t[0],n):rs(t[1])&&ki(t[1],n),n}const AS=(()=>{const n=Object.fromEntries(IS.map(([r,s])=>[r,function(o){return TS(this,s,o)}])),t=Object.fromEntries(Object.entries(wS).map(([r,s])=>[r,bS(s)])),e=t.id;return t.id=function(...s){const i=s[0];return this.arrayValue=typeof i=="function"?i():i,e.apply(this,s)},{...n,attr:function(...s){return Qg(this,s)},attrs:function(s){return ES(this,s)},key:function(r){return this.arrayValue=r,this},...t}})();function Pi(n){return AS}function Yg(n,t){let e=1;t!=null&&typeof t!="function"&&typeof t.length=="number"&&(e+=t.length),n.contentId+=e}function bS(n){return(function(e,...r){return n(this,e,r)})}function vS(n,t,e){if(ro(e)){for(const r in e){if(!Object.prototype.hasOwnProperty.call(e,r))continue;e[r]?n.classList.add(r):n.classList.remove(r)}return}Tg(n,t,e)}function ki(n,t){t.contexts||(t.contexts=[]),t.contexts.push(n),++t.contentId}function rs(n){return Array.isArray(n)||vn(n)||(n==null?void 0:n.tagJsType)}function Zh(n,t){return(e,r)=>Xg(e,[n,r,!1,t])}function pt(n){return(t,e)=>Kg(t,n,e)}const RS=Object.fromEntries([["onClick",pt("click")],["onDoubleClick",pt("ondblclick")],["onDblClick",pt("ondblclick")],["onDblClick",pt("ondblclick")],["onBlur",pt("onblur")],["onChange",pt("onchange")],["onCancel",pt("oncancel")],["onClose",pt("onclose")],["onInput",pt("oninput")],["onMousedown",pt("onmousedown")],["onMouseDown",pt("onmousedown")],["onMouseup",pt("onmouseup")],["onMouseUp",pt("onmouseup")],["onMouseover",pt("onmouseover")],["onMouseOver",pt("onmouseup")],["onMouseout",pt("onmouseout")],["onMouseOut",pt("onmouseout")],["onKeyup",pt("onkeyup")],["onKeyUp",pt("onkeyup")],["onKeydown",pt("onkeydown")],["onKeyDown",pt("onkeydown")]]),td=Object.assign(Object.fromEntries(["checked","disabled","selected"].map(n=>[n,Zh(n,jR)])),{class:Zh("class",vS)},RS);function CS(n,t,e){return n in td?td[n](e,t):Xg(e,[n,t,!1,Ce])}function SS(n){return Zg(n)}function Zg(n){const t=PS(n.attributes),e=tm(n.innerHTML);return`<${n.tagName}${t}>${e}</${n.tagName}>`}function PS(n){if(!n||n.length===0)return"";const t=[];return n.forEach(e=>{const r=e[0];if(typeof r!="string"||r.length===0)return;const s=nm(e[1]);if(s===!0){t.push(r);return}s===!1||s===void 0||s===null||t.push(`${r}="${em(String(s))}"`)}),t.length>0?` ${t.join(" ")}`:""}function tm(n){return!n||n.length===0?"":n.map(t=>{const e=nm(t);return kS(e)?Zg(e):Array.isArray(e)?tm(e):e==null||e===!1?"":em(String(e))}).join("")}function kS(n){return!!n&&typeof n=="object"&&typeof n.tagName=="string"}function em(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function nm(n){return typeof n=="function"?n():n}function rm(n,t){++n.updateCount;const e=n.contexts,r=[];if(n.paintCommands){for(let s=te.length-1;s>=0;--s){const i=te[s],o=n.paintCommands.indexOf(i);if(o>=0&&(te.splice(s,1),n.paintCommands.splice(o,1),n.paintCommands.length===0))break}delete n.paintCommands,Yo(n);return}if(e.length&&(Vi(e,t,r),e.length=0,r.length)){const s=n.htmlDomMeta;return n.deleted=!0,Promise.all(r).then(()=>{++st.locks,es(s),Yo(n),--st.locks,Kt()})}es(n.htmlDomMeta),Yo(n)}function Yo(n){n.htmlDomMeta=[],delete n.contexts,n.deleted=!0}function Vi(n,t,e){const r=n[0],s=r.tagJsVar.destroy(r,t);if(r.deleted=!0,Dn(s))return e.push(s.then(()=>{if(n.length>1)return Vi(n.slice(1,n.length),t,e)}));if(r.htmlDomMeta&&(es(r.htmlDomMeta),delete r.htmlDomMeta),n.length>1)return Vi(n.slice(1,n.length),t,e)}function sm(n,t,e){if(t.deleted===!0)return;if(++t.updateCount,uu(n,t)){rm(t,e),t.htmlDomMeta=[],delete t.deleted,Is(n,t,e,789);return}const i=t.contexts,o=n.contexts||[],c=t.tagJsVar,u=n,h=c.allListeners,f=u.allListeners;for(let p=0;p<f.length;++p){const m=f[p],A=h[p][1];A.toCallback=m[1].toCallback}if(i.length!==o.length){const p=new Array(i.length);for(let m=0;m<i.length;++m)p[m]=i[m].value;throw console.info("context mismatch",{value:n,context:t,conValues:p,vContexts:o,deleted:t.deleted,contexts:i}),new Error(`Expected ${i.length} contexts but got ${o.length}`)}t.locked=79;for(let p=0;p<i.length;++p){const m=i[p];m.tagJsVar.processUpdate(o[p],m,e)}delete t.locked}function uu(n,t){if(!n)return 1;const e=t.value;if(e===n)return 0;if(n.tagJsType!=="element"||e===null)return 1;const r=n,s=e,i=r.contentId,o=s.contentId;if(i!==o)return 1;const c=r.innerHTML.length,u=s.innerHTML.length;return c!==u?1:0}function im(n,t,e){const r=e[t];if(r){let i=!1;if(n.originalStopPropagation=n.stopPropagation,n.stopPropagation=function(){i=!0,n.originalStopPropagation.call(n),n.stopPropagation=n.originalStopPropagation,delete n.originalStopPropagation},r(n),n.defaultPrevented||i)return}const s=e.parentNode;s&&im(n,t,s)}function om(n,t,e,r){const s=n.appElement,i=VS(t);t==="blur"&&(t="focusout");const c=n.context.events;if(!c[t]){const u=function(f){im(f,i,f.target)};c[t]=u,s.addEventListener(t,u)}e[i]=r,e[t]=r}function VS(n){return n==="blur"&&(n="focusout"),"_"+n}function DS(n,t){const e=t.context.global,r=function(i,o){if(e.deleted!==!0)return NS(r.tagFunction,r.support,i,o)};return r.tagFunction=n,r.support=t,r}function NS(n,t,e,r){const s=so(t),i=s.context;i.locked=1;const o=n.apply(e,r);return delete i.locked,am(o,s)}function am(n,t){const e=t.context.global;if(e!=null&&e.deleted)return;const r=Si(t);return Mg(r),xg(n,t,{resolvePromise:LS,resolveValue:xS})}const OS="no-data-ever",MS="promise-no-data-ever";function LS(){return MS}function xS(){return OS}function cm(n,t,e,r){const s=function(...i){return s.tagFunction(n,i)};s.tagFunction=t,s.support=e,om(e.appSupport,r,n,s)}function um(n){return n==null||n===!1}function lm(n,t,e,r,s,i,o,c,u){const h=co(n,[],!0,e);return h.description="tagJsVar-attr",h.target=c,h.isAttr=!0,h.isNameOnly=u,h.stateOwner=so(i),h.supportOwner=i,Nt(h),r.processInitAttribute(o,n,c,r,h,i,Ce),vt(),h.oldTagJsVar=h.tagJsVar,h.tagJsVar=r,h}function hm(n,t,e,r,s,i,o,c){if(um(t))return;const u=typeof t;if(u===Z.object){for(const h in t)ed(h,e,t,n,r,i,o,i);return i}if(u==="function"){const h=US(c);c.tagJsVar=h,Nt(c);const f=t(c),p=cn(f);if(vt(),p!=null&&p.tagJsType){c.state={newer:{state:[],states:[]}};const m=lm(p,i,o,p,-1,r,"attr",e,!0);return m.tagJsVar=p,c.subContext=m,i}return ed("attr",e,t,n||[],r,i,o,i),i}t.length!==0&&s(e,t,ys)}function ed(n,t,e,r,s,i,o,c){const u=oo(n,t.tagName),h=e[n],p=fm(n,h,r,t,s,Ce,i,o,u);p!==void 0&&(Array.isArray(p)?c.push(...p):c.push(p))}function US(n){return{tagJsType:"relay",component:!1,hasValueChanged:(e,r,s)=>r.subContext.tagJsVar.hasValueChanged(e,r.subContext,s),processInitAttribute:(e,r,s,i,o,c,u)=>o.subContext.tagJsVar.processInitAttribute(e,r,s,i,o.subContext,c,u),destroy:(e,r)=>e.subContext.tagJsVar.destroy(e.subContext,r),processUpdate:(e,r,s,i)=>{const o=e(r.subContext);return r.subContext.tagJsVar.processUpdate(o,r.subContext,s,i)},processInit:(e,r,s,i,o)=>r.subContext.tagJsVar.processInit(e,r.subContext,s,i,o),matchesInjection:e=>n.subContext.tagJsVar.matchesInjection(e,n.subContext)}}function FS(n,t,e,r,s,i,o,c,u){if(e){if(um(t)||t===""){r.removeAttribute(e);return}if(typeof e===Z.object)if(typeof t===Z.object)for(const p in e)p in t||re.push([nd,[r,p]]);else for(const p in e)re.push([nd,[r,p]])}const h=hm(n,t,r,s,i,o,c,u);h&&o.push(...h)}function nd(n,t){n.removeAttribute(t)}function BS(n,t,e,r){const s=t,i=n;if(i!=null&&i.tagJsType){const c=t.value;if(!(c!=null&&c.tagJsType)){i.isAttr=!0,Nt(t),i.processInitAttribute(s.attrName,n,s.target,i,s,e,Ce),vt(),s.tagJsVar=i;return}c.hasValueChanged(i,t,e);return}if(s.isNameOnly){FS(r,n,s.value,s.target,e,s.howToSet,[],s.parentContext,s),s.value=n;return}const o=s.target;zS(n,s.attrName,s,o,e,s.howToSet,s.isSpecial),t.value=n}const jS=new RegExp(Jg+"(\\d+)"+gS,"g");function dm(n){return n.search&&n.startsWith(Jg)?n.search(jS):-1}function $S(n,t,e,r,s,i,o){const c=r.length,u=[];t.forEach(f=>{if(dm(f)>=0){const m=r.length,A=cn(f),C={description:"attribute-array-item",updateCount:0,isAttr:!0,target:e,attrName:n,withinOwnerElement:!0,tagJsVar:A,parentContext:o,destroy$:new et,render$:new et};A.processUpdate=function(B,U,q,J){++U.updateCount,h(J)};const k=i[m];C.value=k,u.push(C),++o.varCounter}});function h(f){const p=qS(t,f,c).join("");s(e,n,p)}return h(i),u}function qS(n,t,e){return n.reduce((r,s)=>{if(dm(s)>=0){const o=e++,c=t[o];return r.push(c),r}return r.push(s),r},[])}function HS(n,t,e,r,s,i,o,c,u){if(typeof t===Z.function)return++s.varCounter,pm(t,o,n,e);const h=cn(t),f={description:"dynamic-attribute",updateCount:0,isAttr:!0,target:e,attrName:n,howToSet:i,value:t,withinOwnerElement:!0,tagJsVar:h,destroy$:new et,render$:new et,parentContext:s};return r.push(f),h.processUpdate=BS,XR(n,t,f,e,i,o,c),f.value=t,f}function rd(n){return ro(n)&&"TagJsTag"in n?n.tagJsVar:-1}function fm(n,t,e,r,s,i,o,c,u){const h=rd(n);let f=h>=0||t===void 0&&typeof n!="string",p=e[h];t!=null&&t.tagJsType?p=t:(n!=null&&n.tagJsType||typeof n=="function")&&(f=!0,p=n,t=n);const m=p;if(m!=null&&m.tagJsType)return lm(t,o,c,m,h,s,n,r,f);if(f){h===-1&&f&&(p=n);const C=co(p,[],!0,c);return C.description="processAttribute",C.isAttr=!0,C.target=r,C.isNameOnly=!0,C.howToSet=i,hm(e,p,r,s,i,o,c,C),C}if(Array.isArray(t))return $S(n,t,r,[],i,e,s.context);const A=rd(t);if(A>=0){const C=e[A];return HS(n,C,r,[],c,i,s,u)}return ao(n,t,r,i,u,c)}function zS(n,t,e,r,s,i,o){return vn(n)?GS(s,n,r,t):WS(n,r,t,o,i,s)}function WS(n,t,e,r,s,i){if(r!==!1){Eg(e,n,t,r);return}switch(n){case void 0:case!1:case null:re.push([JS,[t,e]]);return}if(vn(n))return cm(t,n,i,e);s(t,e,n)}function GS(n,t,e,r){return pm(t,n,r,e)}function pm(n,t,e,r){return n=DS(n,t),cm(r,n,t,e)}function JS(n,t){n.removeAttribute(t)}function KS(n,t,e,r,s){for(const i of n){const o=i[0],c=i[1],u=i[2]||!1;let h=i.length>1?Ce:BR;i[3]&&(h=i[3]);const f=s.contexts,p=fm(o,c,t,e,r,h,f,s,u)||void 0;typeof p=="object"&&(f.push(p),++s.varCounter)}}function QS(n,t,e,r,s){const i=[],o={updateCount:0,parentContext:e,contexts:i,target:t,value:n,htmlDomMeta:[],tagJsVar:{component:!1,tagJsType:"dynamic-text",hasValueChanged:()=>0,processInit:Ut,processInitAttribute:Ut,destroy:(p,m)=>{++o.updateCount,i.forEach(A=>A.tagJsVar.destroy(A,m))},processUpdate:(p,m,A,C)=>{++o.updateCount,Nt(h);let k=p(h);const V=o.underFunction;delete o.underFunction,k instanceof Function&&!k.tagJsType&&(V&&k.toString()===V.toString()?k=h.value:(o.underFunction=k,k=k()));const B=h.tagJsVar.processUpdate(k,h,A,C);return h.value=k,m.value=p,vt(),B}},withinOwnerElement:!0,destroy$:new et,render$:new et};Nt(o);let c=n();vn(c)&&!c.tagJsType&&(o.underFunction=c,c=c());const h=mm(c,o,t,r,s);return e.contexts.push(o),o.subContext=h,vt(),h}function gm(n,t,e,r,s){n.forEach(i=>{switch(typeof i){case"string":case"boolean":case"number":return sd(i,r,s);case"function":{if(i.tagJsType==="element")break;return QS(i,r,t,e,s)}}if(i==null)return sd(i,r,s);if(i.tagJsType==="element"){const c=_m(i,t,e,t.contexts);te.push([s,[r,c]]),t.htmlDomMeta.push({nn:c.tagName,domElement:c,at:[]});return}return mm(i,t,r,e,s)})}function mm(n,t,e,r,s){const i=co(n,[],!0,t);if(t.contexts.push(i),i.target=e,i.placeholder=document.createTextNode(""),te.push([s,[e,i.placeholder]]),Nt(i),i.inputsHandler){const c=r.propsConfig;i.inputsHandler(c)}return i.tagJsVar.processInit(n,i,r,i.placeholder),vt(),i}function sd(n,t,e){const r=io(n),s=document.createTextNode(r);return te.push([e,[t,s]]),s}function _m(n,t,e,r){const s=n.tagName,i=document.createElement(s);t.target=i;const o=n.attributes;for(let u=0;u<o.length;++u){const h=o[u],f=h[0];typeof f=="string"&&(h[2]=oo(f,s))}KS(o,[],i,e,t),gm(n.innerHTML,t,e,i,Jc);const c=n.listeners;for(let u=0;u<c.length;++u)XS(n,u,e,c[u],i);return i}function XS(n,t,e,r,s){const i=r[0],o=(...c)=>{const h=n.listeners[t][1],f=so(e),p=f.context,m=p.updateCount;p.locked=1,++st.locks,Nt(p);const A=h(...c);return--st.locks,delete p.locked,vt(),m===p.updateCount?am(A,f):(Kt(),Dn(A)?A.then(()=>{const k=f.context.state.newest;return FC(k),"promise-no-data-ever"}):"no-data-ever")};om(e.appSupport,i,s,o)}function YS(n,t,e,r){t.contexts=t.contexts||[],t.htmlDomMeta=[],t.locked=34;const s=_m(n,t,e,t.contexts);delete t.locked;const i=[Gc,[r,s,"htmlTag.processInit"]];te.push(i),t.paintCommands=[i],Je.push([()=>{delete t.paintCommands},[]]);const o={nn:n.tagName,domElement:s,at:n.attributes};return t.htmlDomMeta=[o],s}function M(n){const e=As({component:!1,tagJsType:"element",processInitAttribute:Ut,processInit:YS,destroy:rm,processUpdate:sm,hasValueChanged:uu,tagName:n,innerHTML:[],attributes:[],contentId:0,listeners:[],allListeners:[],elementFunctions:Pi},Pi);return e.tagName=n,e}function As(n,t){const e=function r(...s){const i={...r};i.attributes=Un(r.attributes),i.listeners=Un(r.listeners),i.allListeners=Un(r.allListeners);let o=i.contexts;i.innerHTML=s;for(let c=0;c<s.length;++c){const u=s[c];if(rs(u)){if(u.tagJsType==="element"){id(i.allListeners,u.allListeners),u.contexts&&(o||(o=[],i.contexts=o),id(o,u.contexts),++i.contentId);continue}o||(o=[],i.contexts=o),o.push(u)}}return i};return Object.assign(e,n),ZS(e,t(e)),e.attributes=Un(n.attributes),e.listeners=Un(n.listeners),e.allListeners=Un(n.allListeners),e.toString=function(){return SS(this)},e}function Un(n){return n.length?n.slice():[]}function id(n,t){for(let e=0;e<t.length;++e)n.push(t[e])}function ZS(n,t){for(const e in t){const r=t[e];try{n[e]=r}catch{Object.defineProperty(n,e,{value:r,writable:!0,configurable:!0,enumerable:!1})}}}const NP=tP();function tP(){const t=As({component:!1,tagJsType:"element",processInitAttribute:Ut,processInit:eP,destroy:nP,processUpdate:sm,hasValueChanged:uu,tagName:"no-element",innerHTML:[],attributes:[],contentId:0,listeners:[],allListeners:[],elementFunctions:Pi},Pi);return t.tagName="no-element",t}function eP(n,t,e,r){t.contexts=t.contexts||[],t.htmlDomMeta=[],gm(n.innerHTML,t,e,r,Gc)}function nP(n,t){++n.updateCount;const e=n.contexts,r=[];if(e.length&&(Vi(e,t,r),e.length=0,r.length)){const s=n.htmlDomMeta;return Promise.all(r).then(()=>{++st.locks,es(s),--st.locks,Kt()})}}const OP=M("button"),MP=M("select"),LP=M("option"),xP=M("optgroup"),UP=M("input"),FP=M("textarea");M("html");M("head");M("title");M("meta");M("link");M("style");M("body");M("script");M("noscript");const BP=M("hr"),jP=M("h1"),$P=M("h2"),qP=M("h3");M("h4");M("h5");M("h6");M("ol");M("ul");M("li");const HP=M("div"),zP=M("main"),WP=M("section"),GP=M("header");M("footer");M("form");M("fieldset");M("legend");const JP=M("dialog"),KP=M("pre"),QP=M("table"),XP=M("tr"),YP=M("td"),ZP=M("th"),t0=M("thead"),e0=M("tbody");M("tfoot");M("iframe");const n0=M("a");M("u");const r0=M("img");M("br");const s0=M("label"),i0=M("p");M("small");const o0=M("span"),a0=M("strong");M("b");M("sup");M("nav");M("figure");M("figcaption");M("code");M("canvas");M("svg");M("path");M("polygon");M("rect");M("details");M("summary");export{wP as $,XP as A,ZP as B,e0 as C,YP as D,qP as E,FP as F,AP as G,RP as H,IP as I,vP as J,BP as K,VP as L,PP as M,kP as N,SP as O,iP as P,bP as Q,sS as R,et as S,iS as T,rS as U,Y as V,Ut as W,bC as X,Ri as Y,Qt as Z,yP as _,n0 as a,xP as a0,NP as a1,GP as a2,zP as a3,Qo as a4,hP as a5,dP as a6,lP as a7,mP as a8,M as a9,Ug as aa,jC as ab,KP as ac,HC as ad,JP as ae,gP as af,EP as ag,oP as ah,uP as ai,cP as aj,aP as ak,o0 as b,DP as c,HP as d,CP as e,OP as f,kg as g,$P as h,WP as i,a0 as j,r0 as k,s0 as l,UP as m,gv as n,LP as o,i0 as p,jP as q,fP as r,MP as s,at as t,_P as u,pP as v,TP as w,kR as x,QP as y,t0 as z};
