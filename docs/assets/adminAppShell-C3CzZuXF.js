var pm=Object.defineProperty;var gm=(n,t,e)=>t in n?pm(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var Xt=(n,t,e)=>gm(n,typeof t!="symbol"?t+"":t,e);function Qn(n){return n.renderCount=n.renderCount||0,n.varCounter=0,n.state={newer:{state:[],states:[]}},n.global={blocked:[]}}function Gs(){return it.stateConfig.support}function vi(n){return Dt(n.context),it.stateConfig.support=n}const Vt=function(){};let kt=[];const pe=[];let te=[],Kt=[],dn=[],Aa=!1;const Le=[],mm=400;let Cn=0;const Wo=new Map,et={locks:0};function _m(n,t){const e=Wo.get(n);if(e!==void 0&&e>=Cn){Le[e]=t;return}const r=Le.length;Le.push(t),Wo.set(n,r)}function ym(n,t){t.textContent=n}function Wt(){et.locks>0||Tm()}function Tm(){++et.locks,Nh(),--et.locks,Vh(),Em()}function Vh(){Im();const n=dn;dn=[];for(const t of n)t[0](...t[1])}function Em(){Aa||!Le.length||wm()}function wm(){Aa=!0,requestAnimationFrame(Dh)}function Dh(){++et.locks;let n=0;for(;Cn<Le.length&&n<mm;){const t=Le[Cn];++Cn,t[0](...t[1]),++n}if(Nh(),Vh(),--et.locks,Cn<Le.length){requestAnimationFrame(Dh);return}Le.length=0,Cn=0,Wo.clear(),Aa=!1}function Nh(){const n=pe.length;for(let t=0;t<n;++t){const e=pe[t];e[0](...e[1])}if(n===pe.length)pe.length=0;else{let t=0;for(let e=n;e<pe.length;++e)pe[t]=pe[e],++t;pe.length=t}for(const t of te)t[0](...t[1]);for(const t of Kt)t[0](...t[1]);for(const t of kt)t[0](...t[1])}function Im(){kt=[],te=[],Kt=[]}function Lr(n,t){pe.push([Am,[n,t]])}function Am(n,t){n||console.debug("no element by",{_caller:t,element:n});const e=n.parentNode;e||console.debug("no parentNode by",{_caller:t,element:n}),e.removeChild(n)}function He(n,t,e){n.parentNode.insertBefore(t,n)}function ee(n,t){n.appendChild(t)}const Un=typeof document=="object"&&document.createElement("div");function vm(n){return Un.innerHTML=n,document.createTextNode(Un.innerHTML)}function Oh(n,t,e=Vt,r){const s=vm(t);He(n,s),e(s)}function bm(n,t,e=Vt){Un.innerHTML=t;const r=document.createTextNode(Un.textContent);He(n,r),e(r)}function Cm(n,t,e){Un.innerHTML=t;const r=document.createTextNode(Un.textContent);ee(n,r),e(r)}const yn="";var Ks;(function(n){n.string="string",n.number="number",n.boolean="boolean",n.undefined="undefined"})(Ks||(Ks={}));var X;(function(n){n.function="function",n.date="date",n.unknown="unknown",n.object="object"})(X||(X={}));const Sm=Date.now(),Q={tag:"html",dom:"dom",templater:"templater",tagComponent:"tagComponent",tagArray:"tagArray",host:"host",subscribe:"subscribe",signal:"signal",renderOnce:"renderOnce",stateRender:"stateRender",version:Sm};function Mh(n){if(!n)return!1;switch(n.tagJsType){case Q.dom:case Q.tag:case Q.templater:return!0}return!1}function Qr(n){const t=n==null?void 0:n.tagJsType;return t===Q.tagComponent||t===Q.stateRender}function Rm(n){return bi(n)&&typeof n.subscribe===X.function}function Xn(n){return n&&ze(n.then)}function ze(n){return typeof n===X.function}function bi(n){return typeof n===X.object&&n!==null}function qt(n){return Array.isArray(n)}function va(n){const t=n.state;if(t&&t.newest&&t.newest)return t.newest;if(n.parentContext)return va(n.parentContext)}function Ci(n){let t=n;for(;t.ownerSupport&&!Qr(t.templater);)t=t.ownerSupport;const r=t.context.state;return r&&r.newest||t}function Pm(...n){return n}function Lh(n){const t=it.stateConfig;return t.states[t.statesIndex]=n,++t.statesIndex,n(Pm)}function km(n){const t=it.stateConfig,e=t.statesIndex,u=Ci(t.prevSupport).context.state.older.states[e];let h=[];u(function(...m){return h=m,u.lastValues=h,m});const f=function(...m){return h};return t.states[t.statesIndex]=n,++t.statesIndex,n(f)}function xh(n){Dt(n);const t=it.stateConfig;t.handlers.handler=Fh,t.handlers.statesHandler=Lh,t.rearray=[];const e=t.state=[],r=t.states=[];t.statesIndex=0;const s=n.state=n.state||{};s.newer={state:e,states:r}}class Vm{}function Dm(n){const[t]=n(Vm),[e]=n(t);return[t,e]}function Nm(n){const t=n.callback;if(!t)return n.defaultValue;const[e]=Dm(t);return e}function Om(){const n=it.stateConfig,e=n.rearray[n.state.length];return n.state.push(e),e.defaultValue}function Fh(n){var o,c;const t=it.stateConfig,e=le();if(!e||!e.state){const u="State requested but TaggedJs is not currently rendering a tag or host";throw console.error(u,{config:t,context:e,function:(c=(o=t.support)==null?void 0:o.templater.wrapper)==null?void 0:c.original}),new Error(u)}const r=e.state.newer;t.state=r.state;let s=n;if(typeof n===X.function&&(s=n()),typeof s===X.function){const u=s;s=function(...f){return u(...f)},s.original=u}const i={get:function(){return Nm(i)},defaultValue:s};return t.state.push(i),s}function Mm(n){const t=new Y,e=r=>{const s=[],i=[],o=(p,m)=>{if(s[m]=!0,i[m]=p,s.length===n.length){for(const S of s)if(!S)return;r(i,h)}},c=[...n],h=c.shift().subscribe(p=>o(p,0)),f=c.map((p,m)=>p.subscribe(A=>o(A,m+1)));return h.subscriptions=f,h};return t.subscribeWith=e,t}function Lm(n,t){const e=n.findIndex(r=>r.callback===t);e!==-1&&n.splice(e,1)}function xm(n,t,e){const r=Y.globalSubCount$;Y.globalSubCount$.next(r.value+1);const s=function(){s.unsubscribe()};return s.callback=t,s.subscriptions=[],s.unsubscribe=function(){return Fm(s,e,t)},s.add=i=>(s.subscriptions.push(i),s),s.next=i=>{t(i,s)},s}function Uh(n,t,e){const r=[...t],s=r.shift(),i=f=>{if(r.length)return Uh(f,r,e);e(f)};let o=i;const h=s(n,{setHandler:f=>o=f,next:i});o(h)}function Fm(n,t,e){Lm(t,e);const r=Y.globalSubCount$;Y.globalSubCount$.next(r.value-1),n.unsubscribe=()=>n;const s=n.subscriptions;for(const i of s)i.unsubscribe();return n}const Dn=class Dn{constructor(t,e){Xt(this,"onSubscription");Xt(this,"methods",[]);Xt(this,"isSubject",!0);Xt(this,"subscribers",[]);Xt(this,"subscribeWith");Xt(this,"value");Xt(this,"set",this.next.bind(this));this.onSubscription=e,arguments.length>0&&(this.value=t)}subscribe(t){const e=xm(this,t,this.subscribers),r=this.subscribeWith;if(r){if(this.methods.length){const s=t;t=i=>{Uh(i,this.methods,o=>s(o,e))}}return r(t)}return this.subscribers.push(e),this.onSubscription&&this.onSubscription(e),e}next(t){this.value=t,this.emit()}emit(){const t=this.value,e=this.subscribers;for(const r of e)r.callback(t,r)}toPromise(){return new Promise(t=>{this.subscribe((e,r)=>{r.unsubscribe(),t(e)})})}toCallback(t){const e=this.subscribe((r,s)=>{const i=s==null?void 0:s.unsubscribe;i?i():setTimeout(()=>{e.unsubscribe()},0),t(r)});return e}pipe(...t){const e=[];"value"in this&&e.push(this.value);const r=new Dn(...e);return r.setMethods(t),r.subscribeWith=s=>this.subscribe(s),r.next=s=>this.next(s),r}setMethods(t){this.methods=t}static all(t){const e=t.map(r=>Rm(r)?r:new Dn(r,i=>(i.next(r),i)));return Mm(e)}};Xt(Dn,"globalSubCount$",new Dn(0));let Y=Dn;const Um=new Y(void 0,function(t){Gs()||t.next()}),it={stateConfig:{state:[],version:Date.now(),handlers:{handler:Fh,statesHandler:Lh}},tagClosed$:Um};function Bm(n,t){const r=n.templater.tag.values;for(const s of t)jm(r,s,n);return t}function jm(n,t,e){if(t.deleted)return;const r=t.valueIndex,s=n[r],i=t.tagJsVar;Dt(t),i.processUpdate(s,t,e,n),It(),t.value=s}function Bh(n,t){if(!n)return;const r=n.context.contexts;$m(n,t),++et.locks,Bm(n,r),--et.locks,Wt()}function $m(n,t){const e=t.templater,r=t.templater.tag,s=e.values||r.values,i=n.templater.tag;i.values=s}function qm(n,t){return Jo(n,t)}function Jo(n,t){if(n===null||typeof n!==X.object||t<0)return n;if(n instanceof Date)return new Date(n);if(n instanceof RegExp)return new RegExp(n);const e=qt(n)?[]:Object.create(Object.getPrototypeOf(n));if(qt(n))for(let r=0;r<n.length;r++)e[r]=Jo(n[r],t-1);else for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=Jo(n[r],t-1));return e}function Hm(n,t,e){return ba(n,t,e)}function ba(n,t,e){return n===t||Jm(n,t)||e<0?!0:typeof n===X.object&&typeof t===X.object?n instanceof Date&&t instanceof Date?n.getTime()===t.getTime():qt(n)&&qt(t)?Wm(n,t,e-1):qt(n)||qt(t)?!1:zm(n,t,e-1):!1}function zm(n,t,e){const r=Object.keys(n),s=Object.keys(t);if(r.length===0&&s.length===0)return!0;if(r.length!==s.length)return!1;for(const i of r)if(!s.includes(i)||!ba(n[i],t[i],e-1))return!1;return!0}function Wm(n,t,e){if(n.length!==t.length)return!1;for(let r=0;r<n.length;r++)if(!ba(n[r],t[r],e-1))return!1;return!0}function Jm(n,t){return ze(n)&&ze(t)&&n.toString()===t.toString()}function Fu(n){return n.map(Ca)}function Ca(n,t){const e=n,r=n==null?void 0:n.tagJsType;if(r)switch(r){case Q.signal:case Q.subscribe:case Q.stateRender:return;case Q.dom:case Q.tag:case Q.templater:return Fu(e.values)}return qt(n)?Fu(e):qm(n,t)}function Gm(n,t){const e=n.length;for(let r=0;r<e;++r){const s=n[r],i=t[r];if(qt(s)&&qt(i)){if(s===i)continue;return 3}if(!(typeof s===X.function&&typeof i===X.function)){if(typeof s===X.object){if(!s&&!i)continue;if(typeof t===X.object){const o=Object.entries(s);for(const c of o)if(!Km(c,i))return 3.1}continue}if(s!==i)return 3.3}}return!1}function Km([n,t],e){const r=e[n];return typeof t===X.function&&typeof r===X.function?!0:r===t}function Sa(n,t,e){return n}function Qm(n){return typeof n!==X.object||!n||n.tagJsType}function Xm(n,t,e,r,s,i){var c;const o=Object.keys(n);for(const u of o){const h=n[u],f=t[u],p=Ra(f,h,e,r,i,s+1);h===p||(c=Object.getOwnPropertyDescriptor(n,u))!=null&&c.set||(n[u]=p)}return n}function Ym(n,t,e,r,s,i){for(let o=n.length-1;o>=0;--o){const c=n[o],u=t[o];n[o]=Ra(u,c,e,r,i,s+1)}return n}function Ra(n,t,e,r,s,i){return n==null||i>s?t:typeof n===X.function?t.mem?(n.mem=t.mem,t):(n.mem=t,n):Qm(t)?t:qt(t)?Ym(t,n,e,r,i,s):Xm(t,n,e,r,i,s)}function Zm(n,t,e,r,s,i=-1){const o=t.context;if(!o.global||!o.state.newest){const A=Sa(r);r.push(...A);const S=n.propsConfig;return S.castProps=A,r}t=o.state.newest||t;const f=t.propsConfig.castProps,p=[];for(let A=0;A<r.length;++A){const S=r[A],k=f[A],V=Ra(k,S,n,e,s,i+1);p.push(V)}const m=n.propsConfig;return m.castProps=p,p}function t_(n,t){const e=n.context,r=e.global;let s=-1;const i=e.providers=e.providers||[],o=i.length-1;for(;s++<o;){const c=i[s];let u=-1;const h=c.children.length-1;for(;u++<h;){const f=c.children[u];if(r===f.context.global){c.children.splice(u,1),c.children.push(t);return}}}}function jh(n,t){const e=n.context.providers;if(e)for(const r of e)for(let s=r.children.length-1;s>=0;--s)r.children[s].context.global===t&&r.children.splice(s,1);n.context.destroy$.next(),n.context.renderCount=0}function Go(n,t){for(const e of n){const r=e.lastArray;if(r){Go(r,t);continue}const s=e.value;if((s==null?void 0:s.tagJsType)===Q.subscribe){s.destroy(e,t),e.deleted=!0;continue}const i=e.global;if(!i)continue;const o=e.state.newest,c=i.subscriptions;c&&c.forEach(qh),Qr(o.templater)&&jh(o,i);const u=e.contexts;Go(u,o),i.deleted=!0}}function $h(n,t=[],e=[]){for(const r of n){const s=r.global;if(!s)continue;const i=r.state.newest;if(i){t.push(i);const c=s.subscriptions;c&&e.push(...c)}const o=r.contexts;o&&$h(o,t,e)}return{tags:t,subs:e}}function qh(n){n.unsubscribe()}function Xr(n,t){const e=n.context;t.deleted=!0,e.renderCount=0;const r=[],s=e.contexts;return Go(s,n),n.templater.wrapper&&jh(n,t),ka(e,r),delete e.state,delete e.contexts,delete e.returnValue,delete e.providers,r}function e_(n,t,e,r,s){const i=t.arrayValue;let c=n!==(i||s);return c===!1&&i===void 0&&e.tagJsVar.hasValueChanged(t,e,void 0)&&(c=!0),c?(Pa(e),r.splice(s,1),2):0}function Pa(n){const t=n.global;n_(t,n)}function n_(n,t){var e;if(n&&((e=t.state)!=null&&e.oldest)){const r=t.state.oldest;Xr(r,n);return}t.tagJsVar.destroy(t,{})}function Hh(n){++n.updateCount;const t=n.lastArray;t&&zh(n,t)}function zh(n,t){for(let e=0;e<t.length;++e)Pa(t[e]);delete n.lastArray}function xr(n){for(let t=n.length-1;t>=0;--t){const e=n[t];r_(e),n.splice(t,1)}}function r_(n){const t=n.marker;t&&Lr(t,"destroyMarker");const e=n.domElement;Lr(e,"destroyClone")}function ka(n,t){n.contexts&&s_(n.contexts,t),n.htmlDomMeta&&xr(n.htmlDomMeta)}function s_(n,t){var e;for(const r of n){if(r.withinOwnerElement){const u=r.tagJsVar;if(u&&u.tagJsType==="host"){const h=r.supportOwner,f=u.destroy(r,h);Xn(f)&&t.push(f)}continue}const s=r.lastArray;if(s){zh(r,s);continue}const i=r.simpleValueElm;if(i){delete r.simpleValueElm,Lr(i,"smartRemoveByContext");continue}const o=r.global;if(o===void 0)continue;if(o.deleted=!0,(e=r.state)==null?void 0:e.oldest){ka(r,t);continue}}}function Ko(n){const t=n.context,e=t.global,r=t.contexts;if(r){const{subs:s,tags:i}=$h(r);for(const c of i){if(c.context.global.deleted===!0)return;Uu(c.context)}e.subscriptions&&s.forEach(qh)}Uu(t),Qn(t)}function Uu(n){n.global.deleted=!0,ka(n,[]),delete n.contexts}function Wh(n,t,e,r){const s=t.original,i=n.tagJsType===Q.stateRender,o=it.stateConfig;vi(e);let c;if(i?c=n():(c=s(...r),typeof c===X.function&&c.tagJsType===void 0&&(c=c())),!c)throw new Error(`A tag cannot return a value of type ${c===null?"null":typeof c}`);const u=e.context;return u.returnValue=c,e.returnValue=c,n.tag=c,u.state.newer={...o},It(),e}function i_(n,t){const e=n.context;++e.renderCount,o_(n.context),it.tagClosed$.next(t)}function o_(n){a_(n),c_()}function a_(n){const t=it.stateConfig,e=n||t.context;e.state=e.state||{},e.state.newer={...t};const r=t.support;e.state.newest=r}function c_(){const n=it.stateConfig;delete n.prevSupport,delete n.support,delete n.state,delete n.states,It()}function Jh(n,t,e,r){let s;const i=n.templater;if(i.tagJsType===Q.stateRender){const o=i;s=Vi(i,e,r,n.appSupport),Wh(i,o,s)}else{const o=i.wrapper;s=o(n,e,t)}return i_(s,r),s.ownerSupport=n.ownerSupport,s}function u_(n){const t=it.stateConfig;return t.rearray=n,t.state=[],t.states=[],t.statesIndex=0,t.handlers.handler=Om,t.handlers.statesHandler=km,t}function l_(n,t,e){u_(e);const r=it.stateConfig;r.prevSupport=t,vi(n)}function h_(n,t,e,r){const i=e.state.older.state;return l_(n,t,i),Jh(n,t,e,r)}function Va(n,t,e,r){xh(n.context),vi(n);const s=Jh(n,t,e,r);return It(),s}function d_(n){var r;const t=n==null?void 0:n.context,e=t==null?void 0:t.state;return(r=e==null?void 0:e.older)==null?void 0:r.state}function Da(n,t){var r;const e=Bu(n,t);return!e&&((r=t.templater.tag)!=null&&r._innerHTML)&&Bu(n.outerHTML,t)?!0:e}function Bu(n,t){const e=n.templater,r=t.templater,s=(e==null?void 0:e.tag)||n,i=r.tag;if((e==null?void 0:e.tagJsType)===Q.stateRender)return e.dom===r.dom;if(!i&&!s.returnValue)return!0;if(!s.returnValue)return!1;throw new Error(`unknown tagJsType of ${s.tagJsType}`)}function f_(n,t,e){let r;d_(t)?r=h_(n,t,e):r=Va(n,t,e);const i=!t||Da(t,r);if(i){if(t){const o=t.templater.tag;if(o&&e.renderCount>0){const c=t==null?void 0:t.templater,u=c==null?void 0:c.tag;p_(o,t,u)}}}else{t_(t,r),Ko(t);const o=r.context;o.state.oldest=r,o.state.newest=r}return r.ownerSupport=n.ownerSupport,{support:r,wasLikeTags:i}}function p_(n,t,e){if(n.tagJsType===Q.dom){const r=e==null?void 0:e.dom,s=n.dom;r!==s&&Ko(t);return}if(e){const r=e.strings;if(r){const s=r==null?void 0:r.length,i=n.strings.length;s!==i&&Ko(t)}}}function Yr(n){++n.updateCount;const t=n.global,r=n.state.newest;delete n.inputsHandler,delete n.updatesHandler,Xr(r,t),g_(n)}function g_(n){n.htmlDomMeta=[],delete n.contexts,delete n.state,delete n.global,n.renderCount=0}function m_(n,t){var o;const e=(o=t.state)==null?void 0:o.newest,r=Mh(n),s=n;if(r)return Da(s,e)?0:7;if(n==null?void 0:n.tagJsType){const c=t.value;if(!c&&n)return 88;const u=c.wrapper,h=n.wrapper;return(h==null?void 0:h.original)===(u==null?void 0:u.original)?0:88}return 8}function Si(n,t){var c;const e=t.global,r=(c=t.state)==null?void 0:c.newest,s=Mh(n),i=n;if(s)return Da(i,r)?(Qo(t,n,r),0):(Xr(r,e),Qn(t),7);if(n==null?void 0:n.tagJsType){const f=t.state.newest.ownerSupport;return Qo(t,n,f)===!0?0:88}return Yr(t),8}function Ri(n){switch(n){case void 0:case!1:case null:return yn}return n}function __(n,t){const e=Ri(n);if(t.paint){t.paint[1][1]=e;return}const r=t.simpleValueElm;te.push([ym,[e,r]])}function y_(n,t){t.value=n,t.oldTagJsVar=t.tagJsVar,t.tagJsVar=Xh(n);const e=t.placeholder,r=Ri(n),s=t.paint=[Oh,[e,r,function(o){t.simpleValueElm=o,delete t.paint},"processNowRegularValue"]];kt.push(s)}function Zr(n,t){if(n.startsWith("class."))return"class";if(n.startsWith("style."))return"style";const e=T_(n);return e!==!1?e:n==="value"&&t==="SELECT"?"value":!1}function T_(n){switch(n){case"autoselect":case"autoSelect":return"autoselect";case"autofocus":case"autoFocus":return"autofocus"}return!1}function E_(n,t,e){typeof n[t]!="object"&&(n[t]={});for(const r in e){const s=e[r];te.push([v_,[n,t,r,s]])}if(n[t].setProperty)for(const r in e){const s=e[r];te.push([A_,[n,t,r,s]])}}function w_(n,t,e){n.setAttribute(t,"")}function Ee(n,t,e){if(bi(e))return E_(n,t,e);Gh(n,t,e)}function I_(n,t,e){e?n[t]=!0:n[t]=!1}function Gh(n,t,e){if(n[t]=e,e===void 0||e===!1||e===null){n.removeAttribute(t);return}n.setAttribute(t,e)}function A_(n,t,e,r){n[t].setProperty(e,r)}function v_(n,t,e,r){n[t][e]=r}function Kh(n,t,e,r){switch(r){case"autofocus":dn.push([k_,[e]]);return;case"autoselect":dn.push([P_,[e]]);return;case"style":{const s=n.split(".");te.push([b_,[e,s,t]]);return}case"class":C_(n,t,e);return;case"value":Ee(e,n,t),dn.push([s=>{s.value=t},[e]]);return}throw new Error(`Invalid special attribute of ${r}. ${n}`)}function b_(n,t,e){const r=t[1];n.style[r]=e,n.style.setProperty(r,e)}function C_(n,t,e){const r=n.split(".");if(r.shift(),t){for(const s of r)te.push([S_,[e,s]]);return}for(const s of r)te.push([R_,[e,s]])}function S_(n,t){n.classList.add(t)}function R_(n,t){n.classList.remove(t)}function P_(n){n.select()}function k_(n){n.focus()}function V_(n,t,e,r,s){const i=n(),o={component:!1,tagJsType:"dynamic-attr",matchesInjection:h=>{const f=c.tagJsVar;if(f.matchesInjection)return f.matchesInjection(h,c)},hasValueChanged:(h,f,p)=>{const m=n();return c.tagJsVar.hasValueChanged(m,c,p)},processInit:Vt,processInitAttribute:Vt,destroy:(h,f)=>{c.tagJsVar.destroy(c,f)},processUpdate:(h,f,p,m)=>{++f.updateCount;const A=h();c.tagJsVar.processUpdate(A,c,p,m),c.value=A}},c={description:"sub-context",updateCount:0,isAttr:!0,target:r,parentContext:t,value:i,tagJsVar:Ze(i),valueIndex:-1,withinOwnerElement:!0,destroy$:new Y,render$:new Y},u={description:"override-context",updateCount:0,isAttr:!0,contexts:[c],target:r,parentContext:t,value:n,tagJsVar:o,valueIndex:-1,withinOwnerElement:!0,destroy$:new Y,render$:new Y};return c.tagJsVar.processInitAttribute(e,i,r,c.tagJsVar,c,{},s),u}function D_(n,t,e,r,s,i,o){return e.target=r,e.howToSet=s,e.attrName=n,e.isSpecial=o,t!=null&&t.tagJsType?N_(n,t,e,i,r):Pi(n,t,r,s,o,e)}function N_(n,t,e,r,s){t.processInitAttribute(n,t,s,t,e,r,Ee),e.tagJsVar=t}function Pi(n,t,e,r,s,i){if(typeof t=="function")return V_(t,i,n,e,r);if(s)return Kh(n,t,e,s);r(e,n,t)}function Qh(n,t,e,r,s,i){const o=t.tagJsVar,c=n;if(o.hasValueChanged(c,t,e)>0){o.destroy(t,e),r.removeAttribute(s);const h=Ze(n);h.isAttr=!0,h.processInitAttribute(s,n,r,h,t,e,i),t.tagJsVar=h;return}}function O_(n,t,e,r,s,i,o){r.destroy=M_,r.hasValueChanged=F_,r.processUpdate=(u,h,f)=>Qh(u,h,f,e,n,o);const c=Zr(n,e.tagName);Pi(n,t,e,o,c,s),s.tagJsVar=r}function M_(n){const t=n.target,e=n.attrName;t.removeAttribute(e)}function Xh(n){return{component:!1,tagJsType:"simple",value:n,processInitAttribute:O_,processInit:x_,destroy:Yh,hasValueChanged:U_,processUpdate:L_}}function L_(n,t,e){return n===t.value?0:Ni(t,n,e)}function x_(n,t,e,r,s){const i=Ri(n);r=t.placeholder;const o=t.paint=[Oh,[r,i,function(u){t.simpleValueElm=u,delete t.paint},"processSimpleValueInit"]];kt.push(o)}function Yh(n){const t=n.simpleValueElm;if(!t){if(n.paint){n.paint[0]=Vt;return}if(n.value===void 0||n.value===!1||n.value===null)return}delete n.simpleValueElm,Lr(t,"deleteSimpleValue")}function F_(n,t){return n==null||n===t.value?0:6}function U_(n,t){return n==null||![X.object,X.function].includes(typeof n)?(__(n,t),0):(Yh(t),6)}function B_(n,t){return qt(n)?0:(Hh(t),9)}function Ye(n,t,e){const r=t.tagJsVar.tagJsType;return r&&["tag-conversion","element"].includes(r)?(t.tagJsVar.processUpdate(n,t,e,[]),t.value=n,0):n===t.value?0:(++t.updateCount,Ni(t,n,e))}function Zh(n,t,e,r,s){const i=t.context;if(i.locked=3,e.target=e.target||r,Dt(e),e.inputsHandler){const o=t.propsConfig;e.inputsHandler(o)}e.tagJsVar.processInit(n,e,t,s,r),It(),e.value=n,delete i.locked}function td(n,t,e,r,s){const i=document.createTextNode(yn),o=ts(n,e,!0,t.context);return o.withinOwnerElement=!1,o.placeholder=i,s||(o.placeholder=r),Zh(n,t,o,s,r),s&&Kt.push([ee,[s,i]]),o}const ju=Symbol("not-casted"),j_=[];function Qs(n,t,e,r){const s=n.lastArray===void 0;s&&(n.lastArray=[]);const i=n.lastArray;let o=n.placeholder;const c=t.length,u=new Array(c).fill(ju),h=function(A){const S=u[A];if(S!==ju)return S;const k=J_(t[A]);return u[A]=k,k};let f=s?!1:c!==i.length;s||(f=$_(i,t,n,f,h).batchUpdates);const p=n.lastArray;for(let m=0;m<c;++m)o=q_(m,p,e,f,h,o,r).placeholder}function $_(n,t,e,r,s){const i=[];let o=0;const c=t.length-1;for(let u=0;u<n.length;++u){const h=n[u];if(h.locked===1&&(r=!0),h.value===null){i.push(h);continue}const f=z_(u,n,o,c,s);if(f===0){i.push(h);continue}if(f===2){u=u-1;continue}o=o+f}return e.lastArray=i,{batchUpdates:r}}function q_(n,t,e,r,s,i,o){const c=s(n),u=t[n];if(u)return H_(c,u,e,r);const h=td(c,e,t,i,o);return t.push(h),c&&(h.arrayValue=c.arrayValue||h.arrayValue),h}function H_(n,t,e,r,s,i){return r?(_m(t,[W_,[n,t,e]]),t.value=n,t):Array.isArray(n)?(t.tagJsVar.processUpdate(n,t,e,j_),t.value=n,t):(Ye(n,t,e),t)}function z_(n,t,e,r,s){const i=n-e,o=i<0||r<i,c=t[n];if(o)return Pa(c),1;c.arrayValue===void 0&&(c.arrayValue=n);const u=c.arrayValue,h=s(n);return e_(u,h,c,t,n)}function W_(n,t,e){Ye(n,t,e)}function J_(n){if(typeof n!="function")return n;const t=n;return t.tagJsType!==void 0?n:t()}function ed(n){return{component:!1,tagJsType:"array",value:n,processInitAttribute:Vt,processInit:K_,processUpdate:G_,hasValueChanged:B_,destroy:Hh}}function G_(n,t,e){if(++t.updateCount,Array.isArray(n)){Qs(t,n,e);return}Ye(n,t,e)===0&&Qs(t,n,e)}function K_(n,t,e,r,s){Qs(t,n,e,s)}function Ze(n){return(n==null?void 0:n.tagJsType)?n:Q_(n)}function Q_(n){return qt(n)?ed(n):Xh(n)}function ts(n,t,e,r,s){return{description:"getNewContext",updateCount:0,value:n,destroy$:new Y,render$:new Y,tagJsVar:s||Ze(n),withinOwnerElement:e,parentContext:r,valueIndex:r.varCounter}}function X_(n,t,e,r){const s=ts(n,t,e,r);return t.push(s),++r.varCounter,s}function Y_(n,t,e,r,s,i,o){const c=document.createTextNode(yn),u=s>0,h=X_(n,t,u,r);return h.placeholder=c,h.target=i,i?Kt.push([ee,[i,c]]):kt.push([He,[o,c,"attachDynamicDom.attachDynamicDom"]]),Zh(n,e,h,i,o),h}function Z_(n,t){return ty(n,t)}function ty(n,t,e=[]){const r=n.context;e.push({support:n,renderCount:r.renderCount,provider:t});const s=t.children;for(let i=s.length-1;i>=0;--i){const o=s[i],c=o.context;e.push({support:o,renderCount:c.renderCount,provider:t})}return e}function ey(n){const e=n.context.providers;if(!e)return[];const r=[];for(const s of e){const i=s.owner,o=Z_(i,s);r.push(...o.map(ny))}return r}function ny(n){return n.support}function ry(n){return Q.templater===n.tagJsType}function sy(n,t){const e=t.context.global;return e&&e.deleted?!1:!!iy(n,t)}function iy(n,t){const e=n.props,s=t.propsConfig.latest;if(oy(e,s))return!0;switch(n.propWatch){case Qt.IMMUTABLE:return DT(e,s);case Qt.SHALLOW:return Gm(e,s)}return!Hm(e,s,Na)}function oy(n,t){const e=n.length,r=t.length;return e!==r}function Xs(n,t=[]){const e=n.context,r=n.templater,s=ry(r),i=n.ownerSupport;if(e.locked)return t.push(n),t;if(s)return Xs(i,t);const o=n.context.global;if(o&&o.deleted===!0)return t;const c=n,u=Qr(c.templater),h=n.templater.tagJsType,p=i&&h!==Q.stateRender&&(!u||sy(c.templater,c));if(c.context.providers){const A=ey(c);t.push(...A)}return p?(Xs(i,t),u&&t.push(c),t):(t.push(c),t)}const ay=[];function nd(n){++et.locks;for(let t=0;t<n.length;++t)rd(n[t]);--et.locks,Wt()}function cy(n){++et.locks,rd(n),--et.locks,Wt()}function rd(n){const t=n.context;t.tagJsVar.processUpdate(t.value,t,n.ownerSupport,ay)}function sd(n,t,{resolvePromise:e,resolveValue:r}){return Xn(n)?n.then(uy(t,e)):r(n)}function uy(n,t){return e=>{const r=n.context,s=r.global;if(r.deleted===!0||(s==null?void 0:s.deleted)===!0)return t(e);const i=Xs(n);return nd(i),t(e)}}function ly(n,t){const e=t.context.global,r=function(i,o){if(e.deleted!==!0)return hy(r.tagFunction,r.support,i,o)};return r.tagFunction=n,r.support=t,r}function hy(n,t,e,r){const s=Ci(t),i=s.context;i.locked=1;const o=n.apply(e,r);return delete i.locked,id(o,s)}function id(n,t){const e=t.context.global;if(e!=null&&e.deleted)return;const r=Xs(t);return nd(r),sd(n,t,{resolvePromise:py,resolveValue:gy})}const dy="no-data-ever",fy="promise-no-data-ever";function py(){return fy}function gy(){return dy}function od(n,t,e){const r=e[t];if(r){let i=!1;if(n.originalStopPropagation=n.stopPropagation,n.stopPropagation=function(){i=!0,n.originalStopPropagation.call(n),n.stopPropagation=n.originalStopPropagation,delete n.originalStopPropagation},r(n),n.defaultPrevented||i)return}const s=e.parentNode;s&&od(n,t,s)}function ad(n,t,e,r){const s=n.appElement,i=my(t);t==="blur"&&(t="focusout");const c=n.context.events;if(!c[t]){const u=function(f){od(f,i,f.target)};c[t]=u,s.addEventListener(t,u)}e[i]=r,e[t]=r}function my(n){return n==="blur"&&(n="focusout"),"_"+n}function cd(n,t,e,r){const s=function(...i){return s.tagFunction(n,i)};s.tagFunction=t,s.support=e,ad(e.appSupport,r,n,s)}function ud(n){return n==null||n===!1}function ld(n,t,e,r,s,i,o,c,u){const h=ts(n,[],!0,e);return h.description="tagJsVar-attr",h.target=c,h.valueIndex=s,h.isAttr=!0,h.isNameOnly=u,h.stateOwner=Ci(i),h.supportOwner=i,Dt(h),r.processInitAttribute(o,n,c,r,h,i,Ee),It(),h.oldTagJsVar=h.tagJsVar,h.tagJsVar=r,h}function hd(n,t,e,r,s,i,o,c){if(ud(t))return;const u=typeof t;if(u===X.object){for(const h in t)$u(h,e,t,n,r,i,o,i);return i}if(u==="function"){const h=_y(c);c.tagJsVar=h,Dt(c);const f=t(c),p=Ze(f);if(It(),p!=null&&p.tagJsType){c.state={newer:{state:[],states:[]}};const m=ld(p,i,o,p,-1,r,"attr",e,!0);return m.tagJsVar=p,c.subContext=m,i}return $u("attr",e,t,n||[],r,i,o,i),i}t.length!==0&&s(e,t,yn)}function $u(n,t,e,r,s,i,o,c){const u=Zr(n,t.tagName),h=e[n],p=fd(n,h,r,t,s,Ee,i,o,u);p!==void 0&&(Array.isArray(p)?c.push(...p):c.push(p))}function _y(n){return{tagJsType:"relay",component:!1,hasValueChanged:(e,r,s)=>r.subContext.tagJsVar.hasValueChanged(e,r.subContext,s),processInitAttribute:(e,r,s,i,o,c,u)=>o.subContext.tagJsVar.processInitAttribute(e,r,s,i,o.subContext,c,u),destroy:(e,r)=>e.subContext.tagJsVar.destroy(e.subContext,r),processUpdate:(e,r,s,i)=>{const o=e(r.subContext);return r.subContext.tagJsVar.processUpdate(o,r.subContext,s,i)},processInit:(e,r,s,i,o)=>r.subContext.tagJsVar.processInit(e,r.subContext,s,i,o),matchesInjection:e=>n.subContext.tagJsVar.matchesInjection(e,n.subContext)}}function yy(n,t,e,r,s,i,o,c,u){if(e){if(ud(t)||t===""){r.removeAttribute(e);return}if(typeof e===X.object)if(typeof t===X.object)for(const p in e)p in t||te.push([qu,[r,p]]);else for(const p in e)te.push([qu,[r,p]])}const h=hd(n,t,r,s,i,o,c,u);h&&o.push(...h)}function qu(n,t){n.removeAttribute(t)}function Ty(n,t,e,r){const s=t,i=n;if(i!=null&&i.tagJsType){const c=t.value;if(!(c!=null&&c.tagJsType)){i.isAttr=!0,Dt(t),i.processInitAttribute(s.attrName,n,s.target,i,s,e,Ee),It(),s.tagJsVar=i;return}c.hasValueChanged(i,t,e);return}if(s.isNameOnly){yy(r,n,s.value,s.target,e,s.howToSet,[],s.parentContext,s),s.value=n;return}const o=s.target;Ay(n,s.attrName,s,o,e,s.howToSet,s.isSpecial),t.value=n}const dt=":tagvar",ne=":",Ys=new RegExp(dt+"(\\d+)"+ne,"g");function dd(n){return n.search&&n.startsWith(dt)?n.search(Ys):-1}function Ey(n,t,e,r,s,i,o){const c=r.length,u=[];t.forEach(f=>{if(dd(f)>=0){const m=r.length,A=Ze(f),S={description:"attribute-array-item",updateCount:0,isAttr:!0,target:e,attrName:n,withinOwnerElement:!0,tagJsVar:A,valueIndex:o.varCounter,parentContext:o,destroy$:new Y,render$:new Y};A.processUpdate=function(L,x,q,at){++x.updateCount,h(at)};const k=i[m];S.value=k,u.push(S),++o.varCounter}});function h(f){const p=wy(t,f,c).join("");s(e,n,p)}return h(i),u}function wy(n,t,e){return n.reduce((r,s)=>{if(dd(s)>=0){const o=e++,c=t[o];return r.push(c),r}return r.push(s),r},[])}function Iy(n,t,e,r,s,i,o,c,u){if(typeof t===X.function)return++s.varCounter,gd(t,o,n,e);const h=Ze(t),f={description:"dynamic-attribute",updateCount:0,isAttr:!0,target:e,attrName:n,howToSet:i,value:t,withinOwnerElement:!0,tagJsVar:h,destroy$:new Y,render$:new Y,valueIndex:u,parentContext:s};return r.push(f),h.processUpdate=Ty,D_(n,t,f,e,i,o,c),f.value=t,f}function Hu(n){return bi(n)&&"TagJsTag"in n?n.tagJsVar:-1}function fd(n,t,e,r,s,i,o,c,u){const h=Hu(n);let f=h>=0||t===void 0&&typeof n!="string",p=e[h];t!=null&&t.tagJsType?p=t:(n!=null&&n.tagJsType||typeof n=="function")&&(f=!0,p=n,t=n);const m=p;if(m!=null&&m.tagJsType)return ld(t,o,c,m,h,s,n,r,f);if(f){h===-1&&f&&(p=n);const S=ts(p,[],!0,c);return S.description="processAttribute",S.valueIndex=h,S.isAttr=!0,S.target=r,S.isNameOnly=!0,S.howToSet=i,hd(e,p,r,s,i,o,c,S),S}if(Array.isArray(t))return Ey(n,t,r,[],i,e,s.context);const A=Hu(t);if(A>=0){const S=e[A];return Iy(n,S,r,[],c,i,s,u,A)}return Pi(n,t,r,i,u,c)}function Ay(n,t,e,r,s,i,o){return ze(n)?vy(s,n,r,t,o,i):pd(n,r,t,o,i,s)}function pd(n,t,e,r,s,i){if(r!==!1){Kh(e,n,t,r);return}switch(n){case void 0:case!1:case null:te.push([by,[t,e]]);return}if(ze(n))return cd(t,n,i,e);s(t,e,n)}function vy(n,t,e,r,s,i,o){var f;const c=n.templater.wrapper;return((c==null?void 0:c.tagJsType)||((f=c==null?void 0:c.original)==null?void 0:f.tagJsType))===Q.renderOnce?pd(t,e,r,s,i,n):gd(t,n,r,e)}function gd(n,t,e,r){return n=ly(n,t),cd(r,n,t,e)}function by(n,t){n.removeAttribute(t)}function md(n,t,e,r,s){for(const i of n){const o=i[0],c=i[1],u=i[2]||!1;let h=i.length>1?Ee:w_;i[3]&&(h=i[3]);const f=s.contexts,p=fd(o,c,t,e,r,h,f,s,u)||void 0;typeof p=="object"&&(f.push(p),++s.varCounter)}}function Cy(n,t,e,r,s,i,o){t.at&&md(t.at,e,n,r,s),i?Kt.push([ee,[i,n,"appendToAttachDomElement"]]):kt.push([He,[o,n,"insertBeforeAttachDomElement"]])}function _d(n,t,e,r,s,i,o){const c=e.context,u=c.contexts;r=c;const h=[];i&&o===void 0&&(o=document.createTextNode(yn),Kt.push([ee,[i,o]]),i=void 0);for(let f=0;f<n.length;++f){const p=n[f],m=p.v;if(!isNaN(m)){const L=Number(m),x=t[L];if(ze(x)&&x.tagJsType===void 0){++r.varCounter;continue}const at=Y_(x,u,e,r,s,i,o);at.valueIndex=L;continue}const S={};if(h.push(S),p.nn==="text"){Sy(S,p,i,o);continue}const k=S.domElement=document.createElement(p.nn),V={updateCount:0,isAttrs:!0,target:k,parentContext:r,contexts:[],destroy$:new Y,render$:new Y,tagJsVar:{tagJsType:"new-parent-context"},valueIndex:-1,withinOwnerElement:!0};V.varCounter=0,Cy(k,p,t,e,V,i,o),V.target=k,p.ch&&(S.ch=_d(p.ch,t,e,V,s+1,k,o).dom)}return{dom:h,contexts:u}}function Sy(n,t,e,r){const s=n,i=s.tc=t.tc;if(e){Kt.push([Cm,[e,i,function(c){s.domElement=c}]]);return}kt.push([bm,[r,i,function(c){s.domElement=c}]])}const yd=/(:tagvar\d+:)/,zu="ondoubleclick",Ry=/([:_a-zA-Z0-9\-.]+)\s*(?:=\s*"([^"]*)"|=\s*(\S+))?/g,Py=/<\/?([a-zA-Z0-9-]+)((?:\s+[a-zA-Z_:*][\w:.-]*(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)+\s*|\s*)\/?>/g;function ky(n){const t=[],e=[],r=[];let s=null,i=-1,o=0;const c=new RegExp(Py,"g");for(n=Dy(n);o<n.length;){const u=c.exec(n);if(!u)break;const[h,f,p]=u,m=h.startsWith("</"),A=h.endsWith("/>");if(o<u.index){const L=n.slice(o,u.index);if(L.trim()){const x=Ju(L);for(let q of x)q.startsWith(dt)&&q.search(yd)>=0&&q.search(Ed)===-1&&(q=dt+ ++i+ne),Wu(s,e,q)}}if(o=u.index+h.length,m){s=r.pop()||null;continue}const S=[];let k;for(;(k=Ry.exec(p))!==null;)i=xy(k,i,t,S);const V={nn:f};S.length&&(V.at=S),s?(s.ch||(s.ch=[]),s.ch.push(V)):e.push(V),A||(r.push(s),s=V)}if(o<n.length){const u=n.slice(o);if(u.trim()){const h=Ju(u);for(const f of h)f.startsWith(dt)&&++i,Wu(s,e,f)}}return e}const Vy=new RegExp("(<!--[\\s\\S]*?-->)","g");function Dy(n){return n.replace(Vy,function(t){return t.replace(/\[l t\]/g,"[l&nbsp;t]").replace(/\[g t\]/g,"[g&nbsp;t]").replace(/</g,"[l t]").replace(/>/g,"[g t]")})}function Ny(n){return n.startsWith("on")?n.length===zu.length&&n===zu?"dblclick":n.slice(2,n.length):n}function Wu(n,t,e){const r={nn:"text",tc:Oy(e)};My(n,t,r)}function Oy(n){return n.replace(/(\[l t\]!--[\s\S]*?--\[g t\])/g,function(t){return t.replace(/\[l t\]/g,"<").replace(/\[g t\]/g,">").replace(/\[l&nbsp;t\]/g,"[l t]").replace(/\[g&nbsp;t\]/g,"[g t]")})}function My(n,t,e){n?(n.ch||(n.ch=[]),n.ch.push(e)):t.push(e)}function Ju(n){return n.split(yd).filter(Ly)}function Ly(n){return n!==""}function xy(n,t,e,r){const s=n[1]||n[3]||n[5];let o=n[2]||n[4]||n[6];if(s===void 0)return t;const c=n[2]!=="",u=o===void 0&&c,h=s.toLowerCase(),f=h.startsWith("on")?Ny(h):h;if(u){if(s.slice(0,dt.length)===dt){const q=dt+ ++t+ne;return e.push(["at",q]),r.push([q]),t}if(n[0].startsWith(s)&&n[0].slice(s.length,n[0].length).search(/\s+$/)>=0)return r.push([f]),t;const L=n[3];if(L.search(Ed)>=0){o=L;const q=[f,o];return r.push(q),t}else o=dt+ ++t+ne}c||(o=n[2]);const p=o.split(Uy).filter(S=>S.length>0);p.length>1&&(o=p,p.forEach(S=>{S.search(Ys)>=0&&++t}));const m=[f,o];console.debug("EVER GET HERE??????");const A=Zr(h,"DIV");return A&&m.push(A),f==="style"?(r.unshift(m),t):(r.push(m),t)}const Fy=new RegExp(dt+"(\\d+)"+ne,"gi"),Uy=new RegExp("("+dt+"\\d+"+ne+")","gi"),Td=dt.slice(0,dt.length-1),Ed=new RegExp(Td+"&#x72;(\\d+)"+ne,"gi"),By=Td+"&#x72;$1"+ne;function jy(n,t){const e=$y(n,t).join("");return ky(e)}function $y(n,t){return qy(n,t)}function qy(n,t){const e=[];for(let r=0;r<n.length;++r){const i=n[r].replace(Fy,By);if(r<t.length){e.push(i+dt+r+ne);continue}e.push(i)}return Hy(e,n,t),e}function Hy(n,t,e){const r=e.length-t.length;if(r>0)for(let s=r;s>0;--s)n.push(dt+(t.length+s-1)+ne)}const zy="ch";function wd(n,t,e=[],r=[]){const s=n;for(let i=0;i<s.length;i++){const o=[...r,i],c=s[i];if(c.at){const u=c.at;c.at=Jy(u,t)}if(c.ch){const u=c.ch,h=[...o,zy];c.ch=wd(u,t,e,h)}i=Wy(c,t,s,i)}return s}function Wy(n,t,e,r){if(n.nn!=="text")return r;const s=n;let i=s.tc;if(typeof i!==Ks.string)return r;let o;for(;(o=Ys.exec(i))!==null;){const c=o[1],u=parseInt(c,10);if(!isNaN(u)&&u<t){const f=dt+u+ne,p=i.slice(o.index+f.length);e.splice(r,1,{nn:"text",v:u}),i=p,Ys.lastIndex=0}}return s.tc=i,r}function Jy(n,t){const e=[];for(const r of n){const[s,i,o]=r;if(s.startsWith(dt)){const c=parseInt(s.replace(dt,""),10);if(!isNaN(c)&&c<t){e.push([{tagJsVar:c}]);continue}}if(typeof i===Ks.string&&i.startsWith(dt)){const c=parseInt(i.replace(dt,""),10);if(!isNaN(c)&&c<t){e.push([s,{tagJsVar:c},o]);continue}}e.push(r)}return e}function Gy(n,t,e){return!!(e&&e.strings.length===n.length&&e.strings.every((s,i)=>s===n[i])&&e.values.length===t.length)}function Ky(n){const t=n.map(Qy);return t.push(n.length),Number(t.join(""))}function Qy(n){return n.length}const Gu={};function Xy(n,t){const e=Ky(n),r=Gu[e];if(r&&Gy(n,t,r))return r.domMetaMap;const i=jy(n,t),o=wd(i,t.length),c={interpolation:void 0,string:void 0,strings:n,values:t,domMetaMap:o};return Gu[e]=c,o}function ki(n,t,e){const r=n.context;r.state=r.state||{};const s=r.state;s.oldest=n,s.newest=n,r.state.older=r.state.newer,++et.locks;const i=Yy(n,n.context,t,e);return r.htmlDomMeta=i.dom,--et.locks,i}function Yy(n,t,e,r){const s=Zy(n),o=n.templater.tag.values,c=[],u=n.context;return t=u,u.contexts=c,_d(s,o,n,t,0,e,r)}function Zy(n){const e=n.templater.tag;if(e.tagJsType===Q.dom)return e.dom;const r=e.strings;return Xy(r,e.values)}function Id(n,t,e,r,s){const i=vd(n,e,t);i.ownerSupport=e;const o=ki(i,r,r?void 0:s);for(const c of o.dom)c.marker&&(r?Kt.push([ee,[r,c.marker]]):kt.push([He,[s,c.marker,"subMarker"]])),c.domElement&&(r?Kt.push([ee,[r,c.domElement,"subAppendTo"]]):kt.push([He,[s,c.domElement,"subInsertBefore"]]));return i}function tT(n,t,e,r,s){return t.state={},s?Id(n,t,e,s,r):Ad(e,t)}function Ad(n,t){const e=t.state.newest,r=t.placeholder;return e.ownerSupport=n,t.value.tag&&ki(e,void 0,r),e}function vd(n,t,e){const r=LT(n,t,t.appSupport,e);return e.contexts=e.contexts||[],r}function eT(n,t,e){const r=f_(t,n,e);if(r.wasLikeTags){const s=e.state.oldest;return Bh(s,r.support),r.support}return Ad(t,e)}function nT(n){const t=n.context;return eT(n,n,t)}function rT(n){if(!n)return Vt;const t=le();if(!t)throw new Error("output must be used in render sync with a parent context");const e=va(t);if(!e)throw new Error("output must be used in render sync fashion");if(n.wrapped===!0)return n;const r=(...s)=>{const i=e.ownerSupport;return sT(s,n,i.context)};return r.wrapped=!0,r}function sT(n,t,e){Dt(e);const s=t(...n);return It(),dn.push([()=>{const i=e.global;if(i===void 0||i.deleted===!0){++et.locks;const c=e;c.tagJsVar.processUpdate(c.value,c,void 0,[]),--et.locks,Wt();return}++et.locks,nT(void 0),--et.locks,Wt()},[]]),s}function iT(n,t){++n.updateCount;const e=n.subContext,r=bd(e,t);return delete n.subContext,r}function bd(n,t){n.deleted=!0;const e=n.appendMarker;if(e&&(Lr(e,"deleteSubContext"),delete n.appendMarker),!n.hasEmitted)return;const r=n.contextItem;return r.tagJsVar.destroy(r,t),76}function oT(n,t,e,r){const s=t.tagJsType;if(!t||!s||s!==n)return r.tagJsVar.destroy(r,e),Di(t,r,e,99),99}function Cd(n,t,e){const r=t.subContext,s=oT(Q.subscribe,n,e,t);return s||(!r||!r.hasEmitted||(r.tagJsVar=n,r.valuesHandler(r.lastValues,0)),0)}function Sd(n,t,e,r){return t.hasEmitted=!0,t.contextItem=td(n,e,[],r)}function Rd(n,t,e){var o;++t.updateCount;const s=n.owner._innerHTML;s.processInit=s.oldProcessInit;const i=(o=t.subContext)==null?void 0:o.contextItem;Ni(i,s,e)}function aT(n,t,e,r,s){t.subContext={},n.processUpdate=Rd,cT(n,e,t,r,s)}function cT(n,t,e,r,s){const{appendMarker:i,insertBefore:o}=qd(s,r),c=e.subContext;c.appendMarker=i;const h=n.owner._innerHTML;h.processInit=h.oldProcessInit,Sd(h,c,t,o)}function Pd(){return{component:!1,tagJsType:"innerHTML",hasValueChanged:()=>0,processInitAttribute:Vt,processInit:aT,processUpdate:Rd,destroy:iT}}function kd(n,t){const e={component:!1,tagJsType:Q.templater,processInit:tT,processInitAttribute:Vt,processUpdate:Ye,hasValueChanged:Si,destroy:Yr,propWatch:n,props:t,key:function(s){return e.arrayValue=s,e},matchesInjection(r,s){var i;if(e.wrapper===r||((i=e.wrapper)==null?void 0:i.original)===(r==null?void 0:r.original))return s}};return e}const Fr=[];function uT(n,t){return function(s,i,o){const c=Vd(n,s,o),u=s.ownerSupport,h=Vi(n,i,u,s.appSupport,c);return Wh(n,t,h,c)}}function Vd(n,t,e){const r=n.propWatch===Qt.DEEP?Na:Bd,s=n.props,i=t.propsConfig;let o=i.castProps;const c=e==null?void 0:e.propsConfig,u=c==null?void 0:c.castProps;return u&&(i.castProps=u,o=Zm(t,e,e.ownerSupport,s,r)),o||Sa(s)}function lT(n,t,e){const r=kd(Qt.DEEP);r.tagJsType=n.tagJsType;const s=vd(r,e,t);function i(){return r.tag=n(),s}return r.wrapper=i,i.tagJsType=n.tagJsType,i.original=n.original||n,s}function hT(n,t,e,r,s){Qn(t);const i=lT(n,t,e);return Va(i,void 0,t),Id(i.templater,t,e,s,r)}function dT(n,t){const e=ki(n,t,void 0);for(const r of e.dom)r.domElement&&Kt.push([ee,[t,r.domElement]]),r.marker&&Kt.push([ee,[t,r.marker]]);return n}function fT(n,t){const r=n.Observables[0];if(!t.hasEmitted){if("withDefault"in n){t.subValueHandler(n.withDefault,0);return}if("value"in r){t.subValueHandler(r.value,0);return}return}const s=t.lastValues[0].value;t.subValueHandler(s,0)}function pT(n,t,e,r,s,i){t.destroy=zd;const o=Zr(n,e.tagName),c=function(f,p){Pi(n,f,e,Ee,o,s),Xo(p)},u=Hd(t.Observables,i,c,t,s);return s.subContext=u,s.value=t,s.tagJsVar=t,t.processUpdate=function(f,p,m){return Qh(f,s,m,e,n,Ee)},{subContext:u,onOutput:c}}function gT(n,t){if(!(n!=null&&n.tagJsType))return 1;const e=n.Observables;if(!e)return 2;const s=t.value.Observables;return!s||s.length!==e.length?3:e.every((o,c)=>o===s[c])?0:4}function Dd(n,t){return{component:!1,onOutput:Vt,tagJsType:Q.subscribe,processInitAttribute:pT,processInit:BT,hasValueChanged:gT,processUpdate:Cd,destroy:jT,callback:t,Observables:[n]}}Dd.all=mT;function mT(n,t){return Dd(Y.all(n),t)}function _T(n,t,e,r){const s={component:!1,tagJsType:"tag-conversion",processInitAttribute:Vt,processInit:(i,o,c)=>{const u=n.returnValue;return t.tagJsVar.processInit(u,t,e,r.placeholder)},processUpdate:(i,o,c)=>{if(o.locked||o.deleted)return;++o.updateCount;const u=o.value,h=u==null?void 0:u.tagJsType,p=(i==null?void 0:i.tagJsType)!==h;if(m_(i,o)||p||s.hasValueChanged(i,o,e)){s.destroy(o,e),Di(i,o,c,789);return}o.locked=467,o.render$.next();const S=o.returnValue;yT(t,i,o,S,e),delete o.locked},hasValueChanged:(i,o,c)=>{const u=n.returnValue;return t.tagJsVar.hasValueChanged(u,t,c)},destroy:(i,o)=>{++n.updateCount,n.deleted=!0,delete n.returnValue;const c=t.tagJsVar.destroy(t,e);return Xn(c)?c.then(()=>{const u=Ku(n);return Wt(),u}):(n.destroy$.next(),Ku(n))}};return s}function Nd(n,t,e){const r=n.context,s=n.returnValue,i=Ze(s);delete r.global,r.contexts=[];const o={updateCount:0,value:s,tagJsVar:i,destroy$:new Y,render$:new Y,placeholder:r.placeholder,valueIndex:-1,withinOwnerElement:!0,parentContext:r,contexts:r.contexts},c=_T(r,o,n,e);return r.subContext=o,r.tagJsVar=c,i.processInit(s,o,n,e.placeholder),n}function Od(n,t,e){const r=Vi(n,t,e,e==null?void 0:e.appSupport),s=r.propsConfig;if(s){const o=n.tagJsType!==Q.tagComponent?[]:Vd(n,r);s.castProps=o}return Va(r,t.state.newest,t)}function Md(n,t,e){const r=Od(n,t,e),s=r.templater.tag;return s?["dom","html"].includes(s.tagJsType)?(ki(r,void 0,t.placeholder),r):Nd(r,r.ownerSupport,t):r}function yT(n,t,e,r,s){const i=Sa(t.props),o=n.value;o.props=i;const c=s.propsConfig;if(c&&(c.castProps=i),(t==null?void 0:t.tagJsType)==="tagComponent"){if(n.inputsHandler=e.inputsHandler,n.updatesHandler=e.updatesHandler,e.value=t,e.inputsHandler){Dt(e);const u=e.inputsHandler;u(i),It()}if(e.updatesHandler){Dt(e);const u=e.updatesHandler;u(i),It()}}n.tagJsVar.processUpdate(r,n,s,[]),n.value=r}function Ku(n,t){delete n.returnValue,delete n.global,n.contexts=[],n.htmlDomMeta=[],delete n.inputsHandler,delete n.updatesHandler}function TT(n,t,e,r){const s=Od(n,t,e),i=s.templater.tag;return["dom","html"].includes(i.tagJsType)?dT(s,r):Nd(s,e,t)}function Ld(n,t,e,r,s){return Qn(t),s?TT(n,t,e,s):Md(n,t,e)}function ET(n){var s,i;const t=le();if(!t)throw new Error("tag.inject can only be called within a tag or host context");let e=t.parentContext;for(;e;){const o=e.contexts;if(o){for(const c of o)if(c.isAttr&&((s=c.tagJsVar)!=null&&s.matchesInjection)){const u=c.tagJsVar.matchesInjection(n,c);if(u!==void 0)return u.returnValue}}if((i=e.tagJsVar)!=null&&i.matchesInjection&&e.tagJsVar.matchesInjection(n,e))return e.returnValue;e=e.parentContext}const r=`Could not find parent context for tag.inject ${n}`;throw console.error(r,{targetItem:n,context:t}),new Error(r)}function Gt(n){return it.stateConfig.handlers.handler(n)}function wT(n){return Gt(()=>{var r;const t=n(),e=Gs();return(r=e==null?void 0:e.context)!=null&&r.global?sd(t,e,{resolvePromise:IT,resolveValue:AT}):t}),Z}function IT(n){return n}function AT(n){return n}function vT(n){return Gt(function(){le().destroy$.toCallback(n)}),Z}function bT(n,t,e,...r){const s=e(...r),i=va(n);if(!i)return s;if(!i.context.global){const o=i.context;o.tagJsVar.processUpdate(o.value,o,i.ownerSupport,[])}return Xn(s)&&s.finally(()=>{if(!n.global){const o=i.context;o.tagJsVar.processUpdate(o.value,o,i.ownerSupport,[])}}),s}function xd(n){const t=le(),e=Gt({callback:n}),r=Gt(()=>Fd(t,it.stateConfig,e));return e.callback=n,r}function Fd(n,t,e){const r=t.states;return function(...i){const o=bT(n,r,e.callback,...i);return Wt(),o}}function CT(n){const t=le(),e=i=>{Dt(t);const o=n();return It(),o},r=t.render$.subscribe(()=>{e()}),s=e();return Z.onDestroy(()=>r.unsubscribe()),s}let ST=0;const Rr=Ud("click"),Nn=Ud("mousedown");function Ud(n){return function(e){const r=xd(e);return Gt(()=>{Wd().addEventListener(n,r)}),r}}const RT={get:Wd,onclick:Rr,click:Rr,onClick:Rr,mousedown:Nn,onmousedown:Nn,onMouseDown:Nn};es("onclick",Rr);es("click",Rr);es("onMouseDown",Nn);es("onmousedown",Nn);es("mousedown",Nn);function es(n,t){Object.defineProperty(Z,n,{get(){return t},set(e){return t(e)}})}var Qt;(function(n){n.DEEP="deep",n.SHALLOW="shallow",n.NONE="none",n.IMMUTABLE="immutable"})(Qt||(Qt={}));function Z(n,t=Qt.SHALLOW){const e=function(...o){const c=kd(t,o);c.tagJsType=Q.tagComponent,c.processInit=Ld,c.hasValueChanged=Si;const u=uT(c,e);return u.original=n,c.wrapper=u,c},r=n;e.original=n,r.tags=Fr,r.setUse=it,r.ValueTypes=Q,r.tagIndex=ST++,Fr.push(e);const s=e;return s.inputs=i=>{const o=le();o.inputsHandler=i;const c=o.tagJsVar;return i(c.props),!0},s.updates=i=>{const o=le();return o.updatesHandler=i,!0},s.getInnerHTML=Pd,s}function PT(n){throw new Error("Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `")}function kT(){throw new Error("Do not call tag.renderOnce as a function but instead set it as: `(props) => tag.renderOnce = () => html`` `")}function VT(){throw new Error("Do not call tag.use as a function but instead set it as: `(props) => tag.use = (use) => html`` `")}Z.element=RT;Z.renderOnce=kT;Z.use=VT;Z.deepPropWatch=Z;Z.route=PT;Z.inject=ET;Z.output=rT;Z.onInit=wT;Z.onDestroy=vT;Z.callback=xd;Z.onRender=CT;Z.getInnerHTML=Pd;Z.app=function(n){throw new Error("Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `")};Z.immutableProps=function(t){return Z(t,Qt.IMMUTABLE)};Z.watchProps=function(t){return Z(t,Qt.SHALLOW)};Object.defineProperty(Z,"renderOnce",{set(n){n.tagJsType=Q.renderOnce,n.processInit=hT,n.processUpdate=Ye,n.destroy=Yr,n.hasValueChanged=function(){return 0}}});Object.defineProperty(Z,"use",{set(n){n.original={setUse:it,tags:Fr},n.tagJsType=Q.stateRender,n.processInit=Ld,n.processUpdate=Ye,n.hasValueChanged=Si,n.destroy=Yr}});Object.defineProperty(Z,"promise",{set(n){JT(n)}});function DT(n,t){const e=n.length;for(let r=0;r<e;++r){const s=n[r],i=t[r];if(s!==i)return 2}return!1}const Bd=3,Na=10;function NT(n,t,e){const r=n.templater;if(r.tagJsType!==Q.stateRender){switch(r.propWatch){case Qt.IMMUTABLE:return n.propsConfig={latest:t,castProps:e};case Qt.SHALLOW:return n.propsConfig={latest:t.map(OT),castProps:e}}return n.propsConfig={latest:t.map(MT),castProps:e}}}function OT(n){return Ca(n,Bd)}function MT(n){return Ca(n,Na)}function jd(n,t,e){const r={templater:n,context:t,castedProps:e,appSupport:void 0},s=t.global;return s.blocked=[],t.state||(t.state={newer:{state:[],states:[]}}),r}function $d(n,t,e,r){t.appSupport=e||t;const s=n.props;return s&&(t.propsConfig=NT(t,s,r)),t}function LT(n,t,e,r,s){const i={templater:n,context:r,castedProps:s,appSupport:void 0};return i.ownerSupport=t,i.appSupport=e,i}function Vi(n,t,e,r,s){const i=jd(n,t,s);return i.ownerSupport=e||i,i.ownerSupport.appSupport=r||i.ownerSupport,$d(n,i,r,s)}function xT(n,t,e,r){let s=e.templater||e;const i=n.templater.tag;i&&i._innerHTML&&(s=e._innerHTML);const o=Vi(s,t,r,r.appSupport),u=n.context.state.oldest;Bh(u,o)}function Qo(n,t,e){if(Qr(t))return n.global===void 0&&Qn(n),n.oldTagJsVar=n.tagJsVar,n.tagJsVar=t,FT(t,n,e),!0;if(n.global){n.oldTagJsVar=n.tagJsVar,n.tagJsVar=t;const i=n.state.newest;if(i)return typeof t===X.function||xT(i,n,t,e),!0}if(n.inputsHandler){const i=e.propsConfig;n.inputsHandler(i)}return t.processInit(t,n,e,n.placeholder),n.oldTagJsVar=n.tagJsVar,n.tagJsVar=t,!0}function FT(n,t,e){if(!t.state.newest){if(t.inputsHandler){const r=e.propsConfig;t.inputsHandler(r)}n.processInit(n,t,e,t.placeholder);return}}function Di(n,t,e,r){const s=n&&n.tagJsType;if(delete t.deleted,s){if(s===Q.renderOnce)return;Qo(t,n,e);return}if(qt(n)){Qs(t,n,e),t.oldTagJsVar=t.tagJsVar,t.tagJsVar=ed(n);return}if(typeof n===X.function){t.value=n;return}r&&y_(n,t)}function Ni(n,t,e){const s=n.tagJsVar.hasValueChanged(t,n,e);return s===0||Di(t,n,e,s),s}function qd(n,t){let e;return n&&(e=t=document.createTextNode(yn),Kt.push([ee,[n,t]])),{appendMarker:e,insertBefore:t}}function UT(n,t,e){const r=Cd(n,t,e);if(t.hasEmitted!==!0){const s=t.value.Observables;if(!s||!("value"in s[0]))return}if(r===0&&n.callback){const s=t.subContext;fT(n,s)}}function BT(n,t,e,r,s){const i=n.Observables,{appendMarker:o,insertBefore:c}=qd(s,r);let u=function(p,m,A){Sd(p,A,e,c),Xo(m),u=A.tagJsVar.onOutput=function(k,V,L){const x=L.contextItem;Ni(x,k,e),x.tagJsVar.processUpdate(k,x,e,[k]),x.value=k,Xo(V)}};const h=Hd(i,e,(f,p,m)=>u(f,p,m),n,t);return h.appendMarker=o,t.subContext=h,n.processUpdate=UT,n.onOutput=u,h}function Hd(n,t,e,r,s){function i(h,f){var p;u.lastValues[f]={value:h,tagJsVar:Ze(h),oldTagJsVar:(p=u.lastValues[f])==null?void 0:p.tagJsVar},o(u.lastValues,f)}function o(h,f){const p=u.tagJsVar;if(p==null?void 0:p.callback){Dt(s);const S=p.callback(...h.map(k=>k.value));e(S,c,u),It();return}const A=h[f].value;e(A,c,u)}let c=!0;const u={lastValues:[],subValueHandler:i,valuesHandler:o,tagJsVar:r,subscriptions:[]};return n.forEach((h,f)=>{c=!0,u.subscriptions.push(h.subscribe(p=>i(p,f))),c=!1}),r.onOutput=e,u}function zd(n){const t=n.subContext;if(!t)return;t.subscriptions.forEach(r=>r.unsubscribe()),delete n.subContext}function jT(n,t){++n.updateCount;const e=n.subContext;return zd(n),bd(e,t)}function Xo(n){n||it.stateConfig.support||Wt()}class $T extends Y{constructor(e){super(e);Xt(this,"value");this.value=e}subscribe(e){const r=super.subscribe(e);return e(this.value,r),r}}const qT=((n,t)=>Oa(n,t).pastResult),HT=n=>n;function zT(n){const t=(e,r)=>Oa(e,r,n).pastResult;return t.setup=n,Ma(()=>t,t),t}const Oa=(n,t,{init:e,before:r,final:s=HT}={})=>{const i=Gt({pastResult:void 0,values:void 0}),c=typeof n=="function"?n():n,u=i.values===void 0;let h=0;u&&typeof n=="function"&&Z.onRender(()=>{if(++h,h===1)return;const p=n();f(p)});function f(p){if(i.values===void 0){if(r&&!r(p))return i.values=p,i;const k=(e||t)(p,i.values);return i.pastResult=s(k),i.values=p,i}if(p.every((S,k)=>S===i.values[k]))return i;if(r&&!r(p))return i.values=p,i;const A=t(p,i.values);return i.pastResult=s(A),i.values.length=0,i.values.push(...p),i}return f(c)};function Ma(n,t){return Object.defineProperty(t,"noInit",{get(){const e=n();return e.setup.init=()=>{},e}}),Object.defineProperty(t,"asSubject",{get(){const e=n(),r=Gt(()=>Gs()),s=Gt(()=>new $T(void 0));Gt(()=>({state:it.stateConfig.state,states:it.stateConfig.states}));const i=(o,c)=>(Oa(o,(h,f)=>{const p=Gs(),m=c(h,f);p!==r&&r.context.state.older,s.next(m)},e.setup),s);return i.setup=e.setup,Ma(()=>i,i),i}}),Object.defineProperty(t,"truthy",{get(){const e=n();return e.setup.before=r=>r.every(s=>s),e}}),t}Ma(()=>zT({}),qT);class La extends Error{constructor(e,r,s={}){super(e);Xt(this,"details");this.name=La.name,this.details={...s,errorCode:r}}}class xa extends La{constructor(t,e){super(t,"sync-callback-error",e),this.name=xa.name}}new xa("callback() was called outside of synchronous rendering. Use `callback = callbackMaker()` to create a callback that could be called out of sync with rendering");const WT=()=>{};function JT(n){const t=le(),e=Gt({callback:WT}),r=Gt({current:void 0}),s=Gt(()=>Fd(t,it.stateConfig,e));if(r.current!==n){r.current=n;const i=n;n.then(()=>{r.current===i&&s()})}}function le(){return it.stateConfig.context}function Wd(){return le().target}const xs=[];function Dt(n){return xs.push(n),it.stateConfig.context=n}function It(){xs.pop(),it.stateConfig.context=xs[xs.length-1]}function GT(n,t,e,r,s,i,o){const c=document.createTextNode(yn);if(Fr.push(e.wrapper||{original:e}),i.placeholder=c,t.isApp=!0,!s)throw new Error(`Cannot tagElement, element received is type ${typeof s} and not type Element`);s.destroy=function(){const p=i.events;for(const A in p){const S=p[A];s.removeEventListener(A,S)}i.events={},++et.locks;const m=Xr(f,t);return--et.locks,Wt(),m},++et.locks;const u=document.createDocumentFragment();u.appendChild(c);const f=Md(e,i,{appSupport:{appElement:s,context:i},appElement:s,context:i,isRoot:!0});return f.appElement=s,o&&(r.tag=f.templater.tag),--et.locks,Wt(),s.appendChild(u),{support:f,tags:Fr,ValueTypes:Q}}function KT(n,t,e){const r=jd(n,t);return $d(n,r,r),r.appElement=e,r.context=t,t.state.oldest||(t.state.oldest=r,t.state.older=t.state.newer),t.state.newest=r,r}typeof document=="object"&&(document.taggedJs&&console.warn("🏷️🏷️ Multiple versions of taggedjs are loaded. May cause issues."),document.taggedJs=!0);const Po=[],Qu="__taggedjs_tag_element__";function QT(n,t,e){const r=t[Qu],s=Po.findIndex(m=>m.element===t);if((r||s>=0)&&console.warn("tagElement called multiple times for the same element",{element:t}),s>=0){const m=Po[s].support;Xr(m,m.context.global),Po.splice(s,1)}t[Qu]=!0,t.innerHTML="";let i=(()=>h(e));i.propWatch=Qt.NONE,i.tagJsType=Q.stateRender,i.processUpdate=Ye,i.props=[e],i.isApp=!0;const o=XT(i,t),c=o.global,u=o.state.newest;xh(u.context),vi(u);let h=n(e);const f=typeof h==X.function;f||(Qr(h)?(o.state.newest.propsConfig={latest:[e],castProps:[e]},i.propWatch=h.propWatch,i.tagJsType=h.tagJsType,i.wrapper=h.wrapper,i=h):(i.tag=h,h=n));const p=GT(n,c,i,h,t,o,f);return It(),p}function XT(n,t){const e={component:!1,tagJsType:"templater",hasValueChanged:Si,destroy:Yr,processInitAttribute:Vt,processInit:function(){console.debug("do nothing app function")},processUpdate:Ye},r={updateCount:0,value:n,valueIndex:0,varCounter:0,destroy$:new Y,render$:new Y,withinOwnerElement:!1,renderCount:0,global:void 0,state:{},tagJsVar:e};return Qn(r),r.events={},KT(n,r,t),r}function YT(n){return Array.isArray(n)&&Object.prototype.hasOwnProperty.call(n,"raw")}function ZT(n,t){return function(r,s,i){if(YT(s)){const o=[];for(let u=0;u<s.length;++u)o.push(s[u]),u<i.length&&o.push(String(i[u]??""));const c=o.join("");return t(r,[n,c])}return t(r,[n,s])}}function tE(n,t,e){const r=ns(n,n.elementFunctions);return Jd(r,t,e)}function Jd(n,t,e){function r(s){return r.toCallback(s)}return r.toCallback=e,n.listeners.push([t,r]),n.allListeners.push([t,r]),n}function Gd(n,t){const e=ns(n,n.elementFunctions);return uE(t[0],t[1],e),e}function eE(n,t){const e=ns(n,n.elementFunctions);for(const r in t){if(!Object.prototype.hasOwnProperty.call(t,r))continue;const s=t[r];e.attributes.push([r,s]),Qd(e,s),Ur(r)?ti(r,e):Ur(s)&&ti(s,e)}return e}const nE=[["alt","alt"],["ariaLabel","aria-label"],["referrerPolicy","referrerpolicy"],["autoFocus","autoFocus"],["border","border"],["id","id"],["for","for"],["fill","fill"],["content","content"],["charset","charset"],["cellPadding","cellpadding"],["cellSpacing","cellspacing"],["class","class"],["href","href"],["lang","lang"],["loading","loading"],["value","value"],["placeholder","placeholder"],["src","src"],["title","title"],["width","width"],["height","height"],["type","type"],["min","min"],["max","max"],["step","step"],["name","name"],["wrap","wrap"],["checked","checked"],["disabled","disabled"],["selected","selected"],["minLength","minLength"],["maxLength","maxLength"],["open","open"],["rel","rel"],["rows","rows"],["style","style"],["target","target"],["viewBox","viewBox"],["valign","valign"]],rE=Object.fromEntries(nE.map(([n,t])=>[n,ZT(t,Gd)])),sE=[["onClose","onclose"],["onCancel","oncancel"],["onDoubleClick","ondblclick"],["onClick","click"],["onBlur","onblur"],["onChange","onchange"],["onInput","oninput"],["contextMenu","contextmenu"],["onMouseDown","onmousedown"],["onMouseUp","onmouseup"],["onMouseOver","onmouseover"],["onMouseOut","onmouseout"],["onKeyDown","onkeydown"],["onKeyUp","onkeyup"]];function Kd(n,t){return n.attributes.push(t),Qd(n,t[1]),Ur(t[0])?ti(t[0],n):Ur(t[1])&&ti(t[1],n),n}const iE=(()=>{const n=Object.fromEntries(sE.map(([r,s])=>[r,function(o){return tE(this,s,o)}])),t=Object.fromEntries(Object.entries(rE).map(([r,s])=>[r,oE(s)])),e=t.id;return t.id=function(...s){const i=s[0];return this.arrayValue=typeof i=="function"?i():i,e.apply(this,s)},{...n,attr:function(...s){return Gd(this,s)},attrs:function(s){return eE(this,s)},key:function(r){return this.arrayValue=r,this},...t}})();function Zs(n){return iE}function Qd(n,t){let e=1;t!=null&&typeof t!="function"&&typeof t.length=="number"&&(e+=t.length),n.contentId+=e}function oE(n){return(function(e,...r){return n(this,e,r)})}function aE(n,t,e){if(bi(e)){for(const r in e){if(!Object.prototype.hasOwnProperty.call(e,r))continue;e[r]?n.classList.add(r):n.classList.remove(r)}return}Gh(n,t,e)}function ti(n,t){t.contexts||(t.contexts=[]),t.contexts.push(n),++t.contentId}function Ur(n){return Array.isArray(n)||ze(n)||(n==null?void 0:n.tagJsType)}function Xu(n,t){return(e,r)=>Kd(e,[n,r,!1,t])}function ut(n){return(t,e)=>Jd(t,n,e)}const cE=Object.fromEntries([["onClick",ut("click")],["onDoubleClick",ut("ondblclick")],["onDblClick",ut("ondblclick")],["onDblClick",ut("ondblclick")],["onBlur",ut("onblur")],["onChange",ut("onchange")],["onCancel",ut("oncancel")],["onClose",ut("onclose")],["onInput",ut("oninput")],["onMousedown",ut("onmousedown")],["onMouseDown",ut("onmousedown")],["onMouseup",ut("onmouseup")],["onMouseUp",ut("onmouseup")],["onMouseover",ut("onmouseover")],["onMouseOver",ut("onmouseup")],["onMouseout",ut("onmouseout")],["onMouseOut",ut("onmouseout")],["onKeyup",ut("onkeyup")],["onKeyUp",ut("onkeyup")],["onKeydown",ut("onkeydown")],["onKeyDown",ut("onkeydown")]]),Yu=Object.assign(Object.fromEntries(["checked","disabled","selected"].map(n=>[n,Xu(n,I_)])),{class:Xu("class",aE)},cE);function uE(n,t,e){return n in Yu?Yu[n](e,t):Kd(e,[n,t,!1,Ee])}function lE(n){return Xd(n)}function Xd(n){const t=hE(n.attributes),e=Yd(n.innerHTML);return`<${n.tagName}${t}>${e}</${n.tagName}>`}function hE(n){if(!n||n.length===0)return"";const t=[];return n.forEach(e=>{const r=e[0];if(typeof r!="string"||r.length===0)return;const s=tf(e[1]);if(s===!0){t.push(r);return}s===!1||s===void 0||s===null||t.push(`${r}="${Zd(String(s))}"`)}),t.length>0?` ${t.join(" ")}`:""}function Yd(n){return!n||n.length===0?"":n.map(t=>{const e=tf(t);return dE(e)?Xd(e):Array.isArray(e)?Yd(e):e==null||e===!1?"":Zd(String(e))}).join("")}function dE(n){return!!n&&typeof n=="object"&&typeof n.tagName=="string"}function Zd(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function tf(n){return typeof n=="function"?n():n}function ef(n,t){++n.updateCount;const e=n.contexts,r=[];if(n.paintCommands){for(let s=kt.length-1;s>=0;--s){const i=kt[s],o=n.paintCommands.indexOf(i);if(o>=0&&(kt.splice(s,1),n.paintCommands.splice(o,1),n.paintCommands.length===0))break}delete n.paintCommands,ko(n);return}if(e.length&&(ei(e,t,r),e.length=0,r.length)){const s=n.htmlDomMeta;return n.deleted=!0,Promise.all(r).then(()=>{++et.locks,xr(s),ko(n),--et.locks,Wt()})}xr(n.htmlDomMeta),ko(n)}function ko(n){n.htmlDomMeta=[],delete n.contexts,n.deleted=!0}function ei(n,t,e){const r=n[0],s=r.tagJsVar.destroy(r,t);if(r.deleted=!0,Xn(s))return e.push(s.then(()=>{if(n.length>1)return ei(n.slice(1,n.length),t,e)}));if(r.htmlDomMeta&&(xr(r.htmlDomMeta),delete r.htmlDomMeta),n.length>1)return ei(n.slice(1,n.length),t,e)}function nf(n,t,e){if(t.deleted===!0)return;if(++t.updateCount,Fa(n,t)){ef(t,e),t.htmlDomMeta=[],delete t.deleted,Di(n,t,e,789);return}const i=t.contexts,o=n.contexts||[],c=t.tagJsVar,u=n,h=c.allListeners,f=u.allListeners;for(let p=0;p<f.length;++p){const m=f[p],A=h[p][1];A.toCallback=m[1].toCallback}if(i.length!==o.length){const p=new Array(i.length);for(let m=0;m<i.length;++m)p[m]=i[m].value;throw console.info("context mismatch",{value:n,context:t,conValues:p,vContexts:o,deleted:t.deleted,contexts:i}),new Error(`Expected ${i.length} contexts but got ${o.length}`)}t.locked=79;for(let p=0;p<i.length;++p){const m=i[p];m.tagJsVar.processUpdate(o[p],m,e)}delete t.locked}function Fa(n,t){if(!n)return 1;const e=t.value;if(e===n)return 0;if(n.tagJsType!=="element")return 1;const r=n,s=e,i=r.contentId,o=s.contentId;if(i!==o)return 1;const c=r.innerHTML.length,u=s.innerHTML.length;return c!==u?1:0}function fE(n,t,e,r,s){const i=[],o={updateCount:0,parentContext:e,contexts:i,target:t,value:n,htmlDomMeta:[],tagJsVar:{component:!1,tagJsType:"dynamic-text",hasValueChanged:()=>0,processInit:Vt,processInitAttribute:Vt,destroy:(p,m)=>{++o.updateCount,i.forEach(A=>A.tagJsVar.destroy(A,m))},processUpdate:(p,m,A,S)=>{++o.updateCount,Dt(h);let k=p(h);const V=o.underFunction;delete o.underFunction,k instanceof Function&&!k.tagJsType&&(V&&k.toString()===V.toString()?k=h.value:(o.underFunction=k,k=k()));const L=h.tagJsVar.processUpdate(k,h,A,S);return h.value=k,m.value=p,It(),L}},valueIndex:-1,withinOwnerElement:!0,destroy$:new Y,render$:new Y};Dt(o);let c=n();ze(c)&&!c.tagJsType&&(o.underFunction=c,c=c());const h=sf(c,o,t,r,s);return e.contexts.push(o),o.subContext=h,It(),h}function rf(n,t,e,r,s){n.forEach(i=>{switch(typeof i){case"string":case"boolean":case"number":return Zu(i,r,s);case"function":{if(i.tagJsType==="element")break;return fE(i,r,t,e,s)}}if(i==null)return Zu(i,r,s);if(i.tagJsType==="element"){const c=of(i,t,e,t.contexts);kt.push([s,[r,c]]),t.htmlDomMeta.push({nn:c.tagName,domElement:c,at:[]});return}return sf(i,t,r,e,s)})}function sf(n,t,e,r,s){const i=ts(n,[],!0,t);if(t.contexts.push(i),i.target=e,i.placeholder=document.createTextNode(""),kt.push([s,[e,i.placeholder]]),Dt(i),i.inputsHandler){const c=r.propsConfig;i.inputsHandler(c)}return i.tagJsVar.processInit(n,i,r,i.placeholder),It(),i}function Zu(n,t,e){const r=Ri(n),s=document.createTextNode(r);return kt.push([e,[t,s]]),s}function of(n,t,e,r){const s=n.tagName,i=document.createElement(s);t.target=i;const o=n.attributes;for(let u=0;u<o.length;++u){const h=o[u],f=h[0];typeof f=="string"&&(h[2]=Zr(f,s))}md(o,[],i,e,t),rf(n.innerHTML,t,e,i,ee);const c=n.listeners;for(let u=0;u<c.length;++u)pE(n,u,e,c[u],i);return i}function pE(n,t,e,r,s){const i=r[0],o=(...c)=>{const h=n.listeners[t][1],f=Ci(e),p=f.context,m=p.updateCount;p.locked=1,++et.locks,Dt(p);const A=h(...c);return--et.locks,delete p.locked,It(),m===p.updateCount?id(A,f):(Wt(),Xn(A)?A.then(()=>{const k=f.context.state.newest;return cy(k),"promise-no-data-ever"}):"no-data-ever")};ad(e.appSupport,i,s,o)}function gE(n,t,e,r){t.contexts=t.contexts||[],t.htmlDomMeta=[],t.locked=34;const s=of(n,t,e,t.contexts);delete t.locked;const i=[He,[r,s,"htmlTag.processInit"]];kt.push(i),t.paintCommands=[i],dn.push([()=>{delete t.paintCommands},[]]);const o={nn:n.tagName,domElement:s,at:n.attributes};return t.htmlDomMeta=[o],s}function M(n){const e=ns({component:!1,tagJsType:"element",processInitAttribute:Vt,processInit:gE,destroy:ef,processUpdate:nf,hasValueChanged:Fa,tagName:n,innerHTML:[],attributes:[],contentId:0,listeners:[],allListeners:[],elementFunctions:Zs},Zs);return e.tagName=n,e}function ns(n,t){const e=function r(...s){const i={...r};i.attributes=vn(r.attributes),i.listeners=vn(r.listeners),i.allListeners=vn(r.allListeners);let o=i.contexts;i.innerHTML=s;for(let c=0;c<s.length;++c){const u=s[c];if(Ur(u)){if(u.tagJsType==="element"){tl(i.allListeners,u.allListeners),u.contexts&&(o||(o=[],i.contexts=o),tl(o,u.contexts),++i.contentId);continue}o||(o=[],i.contexts=o),o.push(u)}}return i};return Object.assign(e,n),mE(e,t(e)),e.attributes=vn(n.attributes),e.listeners=vn(n.listeners),e.allListeners=vn(n.allListeners),e.toString=function(){return lE(this)},e}function vn(n){return n.length?n.slice():[]}function tl(n,t){for(let e=0;e<t.length;++e)n.push(t[e])}function mE(n,t){for(const e in t){const r=t[e];try{n[e]=r}catch{Object.defineProperty(n,e,{value:r,writable:!0,configurable:!0,enumerable:!1})}}}const BS=_E();function _E(){const t=ns({component:!1,tagJsType:"element",processInitAttribute:Vt,processInit:yE,destroy:TE,processUpdate:nf,hasValueChanged:Fa,tagName:"no-element",innerHTML:[],attributes:[],contentId:0,listeners:[],allListeners:[],elementFunctions:Zs},Zs);return t.tagName="no-element",t}function yE(n,t,e,r){t.contexts=t.contexts||[],t.htmlDomMeta=[],rf(n.innerHTML,t,e,r,He)}function TE(n,t){++n.updateCount;const e=n.contexts,r=[];if(e.length&&(ei(e,t,r),e.length=0,r.length)){const s=n.htmlDomMeta;return Promise.all(r).then(()=>{++et.locks,xr(s),--et.locks,Wt()})}}const el=M("button"),jS=M("select"),$S=M("option"),qS=M("input"),HS=M("textarea");M("html");M("head");M("title");M("meta");M("link");M("style");M("body");M("script");M("noscript");M("hr");const zS=M("h1"),nl=M("h2");M("h3");M("h4");M("h5");M("h6");M("ol");M("ul");M("li");const rl=M("div"),WS=M("main"),Vo=M("section"),JS=M("header");M("footer");M("form");M("fieldset");M("legend");const GS=M("dialog"),KS=M("pre"),QS=M("table"),XS=M("tr"),YS=M("td"),ZS=M("th"),tR=M("thead"),eR=M("tbody");M("tfoot");M("iframe");const nR=M("a");M("u");const rR=M("img");M("br");const sR=M("label"),Do=M("p");M("small");const iR=M("span"),oR=M("strong");M("b");M("sup");M("nav");M("figure");M("figcaption");M("code");M("canvas");M("svg");M("path");M("polygon");M("rect");M("details");M("summary");const EE=()=>{};var sl={};/**
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
 */const af=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},wE=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[e++];t[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[e++],o=n[e++],c=n[e++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(u>>10)),t[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[e++],o=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return t.join("")},cf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let m=(c&15)<<2|h>>6,A=h&63;u||(A=64,o||(m=64)),r.push(e[f],e[p],e[m],e[A])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(af(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):wE(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=e[n.charAt(s++)],c=s<n.length?e[n.charAt(s)]:0;++s;const h=s<n.length?e[n.charAt(s)]:64;++s;const p=s<n.length?e[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new IE;const m=i<<2|c>>4;if(r.push(m),h!==64){const A=c<<4&240|h>>2;if(r.push(A),p!==64){const S=h<<6&192|p;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class IE extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const AE=function(n){const t=af(n);return cf.encodeByteArray(t,!0)},ni=function(n){return AE(n).replace(/\./g,"")},uf=function(n){try{return cf.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function vE(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const bE=()=>vE().__FIREBASE_DEFAULTS__,CE=()=>{if(typeof process>"u"||typeof sl>"u")return;const n=sl.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},SE=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&uf(n[1]);return t&&JSON.parse(t)},Oi=()=>{try{return EE()||bE()||CE()||SE()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},lf=n=>{var t,e;return(e=(t=Oi())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},RE=n=>{const t=lf(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},hf=()=>{var n;return(n=Oi())==null?void 0:n.config},df=n=>{var t;return(t=Oi())==null?void 0:t[`_${n}`]};/**
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
 */class PE{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
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
 */function Yn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ff(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function kE(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ni(JSON.stringify(e)),ni(JSON.stringify(o)),""].join(".")}const Pr={};function VE(){const n={prod:[],emulator:[]};for(const t of Object.keys(Pr))Pr[t]?n.emulator.push(t):n.prod.push(t);return n}function DE(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let il=!1;function pf(n,t){if(typeof window>"u"||typeof document>"u"||!Yn(window.location.host)||Pr[n]===t||Pr[n]||il)return;Pr[n]=t;function e(m){return`__firebase__banner__${m}`}const r="__firebase__banner",i=VE().prod.length>0;function o(){const m=document.getElementById(r);m&&m.remove()}function c(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function u(m,A){m.setAttribute("width","24"),m.setAttribute("id",A),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function h(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{il=!0,o()},m}function f(m,A){m.setAttribute("id",A),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function p(){const m=DE(r),A=e("text"),S=document.getElementById(A)||document.createElement("span"),k=e("learnmore"),V=document.getElementById(k)||document.createElement("a"),L=e("preprendIcon"),x=document.getElementById(L)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const q=m.element;c(q),f(V,k);const at=h();u(x,L),q.append(x,S,V,at),document.body.appendChild(q)}i?(S.innerText="Preview backend disconnected.",x.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(x.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,S.innerText="Preview backend running in this workspace."),S.setAttribute("id",A)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
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
 */function Nt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function NE(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Nt())}function OE(){var t;const n=(t=Oi())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ME(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function LE(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function xE(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function FE(){const n=Nt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function UE(){return!OE()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function BE(){try{return typeof indexedDB=="object"}catch{return!1}}function jE(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var i;t(((i=s.error)==null?void 0:i.message)||"")}}catch(e){t(e)}})}/**
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
 */const $E="FirebaseError";class be extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=$E,Object.setPrototypeOf(this,be.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,rs.prototype.create)}}class rs{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,i=this.errors[t],o=i?qE(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new be(s,c,r)}}function qE(n,t){return n.replace(HE,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const HE=/\{\$([^}]+)}/g;function zE(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}function fn(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const i=n[s],o=t[s];if(ol(i)&&ol(o)){if(!fn(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function ol(n){return n!==null&&typeof n=="object"}/**
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
 */function ss(n){const t=[];for(const[e,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(s))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function WE(n,t){const e=new JE(n,t);return e.subscribe.bind(e)}class JE{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,r){let s;if(t===void 0&&e===void 0&&r===void 0)throw new Error("Missing Observer.");GE(t,["next","error","complete"])?s=t:s={next:t,error:e,complete:r},s.next===void 0&&(s.next=No),s.error===void 0&&(s.error=No),s.complete===void 0&&(s.complete=No);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function GE(n,t){if(typeof n!="object"||n===null)return!1;for(const e of t)if(e in n&&typeof n[e]=="function")return!0;return!1}function No(){}/**
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
 */function At(n){return n&&n._delegate?n._delegate:n}class pn{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const un="[DEFAULT]";/**
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
 */class KE{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new PE;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(XE(t))try{this.getOrInitializeService({instanceIdentifier:un})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(t=un){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=un){return this.instances.has(t)}getOptions(t=un){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&t(i,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:QE(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=un){return this.component?this.component.multipleInstances?t:un:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function QE(n){return n===un?void 0:n}function XE(n){return n.instantiationMode==="EAGER"}/**
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
 */class YE{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new KE(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(z||(z={}));const ZE={debug:z.DEBUG,verbose:z.VERBOSE,info:z.INFO,warn:z.WARN,error:z.ERROR,silent:z.SILENT},tw=z.INFO,ew={[z.DEBUG]:"log",[z.VERBOSE]:"log",[z.INFO]:"info",[z.WARN]:"warn",[z.ERROR]:"error"},nw=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=ew[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Ua{constructor(t){this.name=t,this._logLevel=tw,this._logHandler=nw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in z))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?ZE[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,z.DEBUG,...t),this._logHandler(this,z.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,z.VERBOSE,...t),this._logHandler(this,z.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,z.INFO,...t),this._logHandler(this,z.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,z.WARN,...t),this._logHandler(this,z.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,z.ERROR,...t),this._logHandler(this,z.ERROR,...t)}}const rw=(n,t)=>t.some(e=>n instanceof e);let al,cl;function sw(){return al||(al=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function iw(){return cl||(cl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const gf=new WeakMap,Yo=new WeakMap,mf=new WeakMap,Oo=new WeakMap,Ba=new WeakMap;function ow(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{e(Fe(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return t.then(e=>{e instanceof IDBCursor&&gf.set(e,n)}).catch(()=>{}),Ba.set(t,n),t}function aw(n){if(Yo.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{e(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Yo.set(n,t)}let Zo={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Yo.get(n);if(t==="objectStoreNames")return n.objectStoreNames||mf.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Fe(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function cw(n){Zo=n(Zo)}function uw(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(Mo(this),t,...e);return mf.set(r,t.sort?t.sort():[t]),Fe(r)}:iw().includes(n)?function(...t){return n.apply(Mo(this),t),Fe(gf.get(this))}:function(...t){return Fe(n.apply(Mo(this),t))}}function lw(n){return typeof n=="function"?uw(n):(n instanceof IDBTransaction&&aw(n),rw(n,sw())?new Proxy(n,Zo):n)}function Fe(n){if(n instanceof IDBRequest)return ow(n);if(Oo.has(n))return Oo.get(n);const t=lw(n);return t!==n&&(Oo.set(n,t),Ba.set(t,n)),t}const Mo=n=>Ba.get(n);function hw(n,t,{blocked:e,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,t),c=Fe(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Fe(o.result),u.oldVersion,u.newVersion,Fe(o.transaction),u)}),e&&o.addEventListener("blocked",u=>e(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const dw=["get","getKey","getAll","getAllKeys","count"],fw=["put","add","delete","clear"],Lo=new Map;function ul(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(Lo.get(t))return Lo.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=fw.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||dw.includes(e)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[e](...c),s&&u.done]))[0]};return Lo.set(t,i),i}cw(n=>({...n,get:(t,e,r)=>ul(t,e)||n.get(t,e,r),has:(t,e)=>!!ul(t,e)||n.has(t,e)}));/**
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
 */class pw{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(gw(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function gw(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const ta="@firebase/app",ll="0.14.6";/**
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
 */const we=new Ua("@firebase/app"),mw="@firebase/app-compat",_w="@firebase/analytics-compat",yw="@firebase/analytics",Tw="@firebase/app-check-compat",Ew="@firebase/app-check",ww="@firebase/auth",Iw="@firebase/auth-compat",Aw="@firebase/database",vw="@firebase/data-connect",bw="@firebase/database-compat",Cw="@firebase/functions",Sw="@firebase/functions-compat",Rw="@firebase/installations",Pw="@firebase/installations-compat",kw="@firebase/messaging",Vw="@firebase/messaging-compat",Dw="@firebase/performance",Nw="@firebase/performance-compat",Ow="@firebase/remote-config",Mw="@firebase/remote-config-compat",Lw="@firebase/storage",xw="@firebase/storage-compat",Fw="@firebase/firestore",Uw="@firebase/ai",Bw="@firebase/firestore-compat",jw="firebase",$w="12.6.0";/**
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
 */const ea="[DEFAULT]",qw={[ta]:"fire-core",[mw]:"fire-core-compat",[yw]:"fire-analytics",[_w]:"fire-analytics-compat",[Ew]:"fire-app-check",[Tw]:"fire-app-check-compat",[ww]:"fire-auth",[Iw]:"fire-auth-compat",[Aw]:"fire-rtdb",[vw]:"fire-data-connect",[bw]:"fire-rtdb-compat",[Cw]:"fire-fn",[Sw]:"fire-fn-compat",[Rw]:"fire-iid",[Pw]:"fire-iid-compat",[kw]:"fire-fcm",[Vw]:"fire-fcm-compat",[Dw]:"fire-perf",[Nw]:"fire-perf-compat",[Ow]:"fire-rc",[Mw]:"fire-rc-compat",[Lw]:"fire-gcs",[xw]:"fire-gcs-compat",[Fw]:"fire-fst",[Bw]:"fire-fst-compat",[Uw]:"fire-vertex","fire-js":"fire-js",[jw]:"fire-js-all"};/**
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
 */const ri=new Map,Hw=new Map,na=new Map;function hl(n,t){try{n.container.addComponent(t)}catch(e){we.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Bn(n){const t=n.name;if(na.has(t))return we.debug(`There were multiple attempts to register component ${t}.`),!1;na.set(t,n);for(const e of ri.values())hl(e,n);for(const e of Hw.values())hl(e,n);return!0}function ja(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function Jt(n){return n==null?!1:n.settings!==void 0}/**
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
 */const zw={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ue=new rs("app","Firebase",zw);/**
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
 */class Ww{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new pn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Ue.create("app-deleted",{appName:this._name})}}/**
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
 */const Zn=$w;function _f(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:ea,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw Ue.create("bad-app-name",{appName:String(s)});if(e||(e=hf()),!e)throw Ue.create("no-options");const i=ri.get(s);if(i){if(fn(e,i.options)&&fn(r,i.config))return i;throw Ue.create("duplicate-app",{appName:s})}const o=new YE(s);for(const u of na.values())o.addComponent(u);const c=new Ww(e,r,o);return ri.set(s,c),c}function yf(n=ea){const t=ri.get(n);if(!t&&n===ea&&hf())return _f();if(!t)throw Ue.create("no-app",{appName:n});return t}function Be(n,t,e){let r=qw[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${t}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),we.warn(o.join(" "));return}Bn(new pn(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
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
 */const Jw="firebase-heartbeat-database",Gw=1,Br="firebase-heartbeat-store";let xo=null;function Tf(){return xo||(xo=hw(Jw,Gw,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Br)}catch(e){console.warn(e)}}}}).catch(n=>{throw Ue.create("idb-open",{originalErrorMessage:n.message})})),xo}async function Kw(n){try{const e=(await Tf()).transaction(Br),r=await e.objectStore(Br).get(Ef(n));return await e.done,r}catch(t){if(t instanceof be)we.warn(t.message);else{const e=Ue.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});we.warn(e.message)}}}async function dl(n,t){try{const r=(await Tf()).transaction(Br,"readwrite");await r.objectStore(Br).put(t,Ef(n)),await r.done}catch(e){if(e instanceof be)we.warn(e.message);else{const r=Ue.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});we.warn(r.message)}}}function Ef(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Qw=1024,Xw=30;class Yw{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new tI(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=fl();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Xw){const o=eI(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){we.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=fl(),{heartbeatsToSend:r,unsentEntries:s}=Zw(this._heartbeatsCache.heartbeats),i=ni(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return we.warn(e),""}}}function fl(){return new Date().toISOString().substring(0,10)}function Zw(n,t=Qw){const e=[];let r=n.slice();for(const s of n){const i=e.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),pl(e)>t){i.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),pl(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class tI{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return BE()?jE().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Kw(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return dl(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return dl(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function pl(n){return ni(JSON.stringify({version:2,heartbeats:n})).length}function eI(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
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
 */function nI(n){Bn(new pn("platform-logger",t=>new pw(t),"PRIVATE")),Bn(new pn("heartbeat",t=>new Yw(t),"PRIVATE")),Be(ta,ll,n),Be(ta,ll,"esm2020"),Be("fire-js","")}nI("");var rI="firebase",sI="12.7.0";/**
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
 */Be(rI,sI,"app");function wf(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const iI=wf,If=new rs("auth","Firebase",wf());/**
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
 */const si=new Ua("@firebase/auth");function oI(n,...t){si.logLevel<=z.WARN&&si.warn(`Auth (${Zn}): ${n}`,...t)}function Fs(n,...t){si.logLevel<=z.ERROR&&si.error(`Auth (${Zn}): ${n}`,...t)}/**
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
 */function he(n,...t){throw qa(n,...t)}function Zt(n,...t){return qa(n,...t)}function $a(n,t,e){const r={...iI(),[t]:e};return new rs("auth","Firebase",r).create(t,{appName:n.name})}function je(n){return $a(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Af(n,t,e){const r=e;if(!(t instanceof r))throw r.name!==t.constructor.name&&he(n,"argument-error"),$a(n,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function qa(n,...t){if(typeof n!="string"){const e=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(e,...r)}return If.create(n,...t)}function j(n,t,...e){if(!n)throw qa(t,...e)}function me(n){const t="INTERNAL ASSERTION FAILED: "+n;throw Fs(t),new Error(t)}function Ie(n,t){n||me(t)}/**
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
 */function ra(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function aI(){return gl()==="http:"||gl()==="https:"}function gl(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
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
 */function cI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(aI()||LE()||"connection"in navigator)?navigator.onLine:!0}function uI(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class is{constructor(t,e){this.shortDelay=t,this.longDelay=e,Ie(e>t,"Short delay should be less than long delay!"),this.isMobile=NE()||xE()}get(){return cI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Ha(n,t){Ie(n.emulator,"Emulator should always be set here");const{url:e}=n.emulator;return t?`${e}${t.startsWith("/")?t.slice(1):t}`:e}/**
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
 */class vf{static initialize(t,e,r){this.fetchImpl=t,e&&(this.headersImpl=e),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;me("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;me("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;me("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const lI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const hI=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],dI=new is(3e4,6e4);function za(n,t){return n.tenantId&&!t.tenantId?{...t,tenantId:n.tenantId}:t}async function tr(n,t,e,r,s={}){return bf(n,s,async()=>{let i={},o={};r&&(t==="GET"?o=r:i={body:JSON.stringify(r)});const c=ss({key:n.config.apiKey,...o}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h={method:t,headers:u,...i};return ME()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&Yn(n.emulatorConfig.host)&&(h.credentials="include"),vf.fetch()(await Cf(n,n.config.apiHost,e,c),h)})}async function bf(n,t,e){n._canInitEmulator=!1;const r={...lI,...t};try{const s=new pI(n),i=await Promise.race([e(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Vs(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Vs(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Vs(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw Vs(n,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw $a(n,f,h);he(n,f)}}catch(s){if(s instanceof be)throw s;he(n,"network-request-failed",{message:String(s)})}}async function fI(n,t,e,r,s={}){const i=await tr(n,t,e,r,s);return"mfaPendingCredential"in i&&he(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Cf(n,t,e,r){const s=`${t}${e}?${r}`,i=n,o=i.config.emulator?Ha(n.config,s):`${n.config.apiScheme}://${s}`;return hI.includes(e)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class pI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((e,r)=>{this.timer=setTimeout(()=>r(Zt(this.auth,"network-request-failed")),dI.get())})}}function Vs(n,t,e){const r={appName:n.name};e.email&&(r.email=e.email),e.phoneNumber&&(r.phoneNumber=e.phoneNumber);const s=Zt(n,t,r);return s.customData._tokenResponse=e,s}/**
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
 */async function gI(n,t){return tr(n,"POST","/v1/accounts:delete",t)}async function ii(n,t){return tr(n,"POST","/v1/accounts:lookup",t)}/**
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
 */function kr(n){if(n)try{const t=new Date(Number(n));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function mI(n,t=!1){const e=At(n),r=await e.getIdToken(t),s=Wa(r);j(s&&s.exp&&s.auth_time&&s.iat,e.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:kr(Fo(s.auth_time)),issuedAtTime:kr(Fo(s.iat)),expirationTime:kr(Fo(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Fo(n){return Number(n)*1e3}function Wa(n){const[t,e,r]=n.split(".");if(t===void 0||e===void 0||r===void 0)return Fs("JWT malformed, contained fewer than 3 sections"),null;try{const s=uf(e);return s?JSON.parse(s):(Fs("Failed to decode base64 JWT payload"),null)}catch(s){return Fs("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function ml(n){const t=Wa(n);return j(t,"internal-error"),j(typeof t.exp<"u","internal-error"),j(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
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
 */async function jr(n,t,e=!1){if(e)return t;try{return await t}catch(r){throw r instanceof be&&_I(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function _I({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class yI{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){if(t){const e=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),e}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class sa{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=kr(this.lastLoginAt),this.creationTime=kr(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function oi(n){var p;const t=n.auth,e=await n.getIdToken(),r=await jr(n,ii(t,{idToken:e}));j(r==null?void 0:r.users.length,t,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(p=s.providerUserInfo)!=null&&p.length?Sf(s.providerUserInfo):[],o=EI(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(o!=null&&o.length),h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new sa(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function TI(n){const t=At(n);await oi(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function EI(n,t){return[...n.filter(r=>!t.some(s=>s.providerId===r.providerId)),...t]}function Sf(n){return n.map(({providerId:t,...e})=>({providerId:t,uid:e.rawId||"",displayName:e.displayName||null,email:e.email||null,phoneNumber:e.phoneNumber||null,photoURL:e.photoUrl||null}))}/**
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
 */async function wI(n,t){const e=await bf(n,{},async()=>{const r=ss({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await Cf(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&Yn(n.emulatorConfig.host)&&(u.credentials="include"),vf.fetch()(o,u)});return{accessToken:e.access_token,expiresIn:e.expires_in,refreshToken:e.refresh_token}}async function II(n,t){return tr(n,"POST","/v2/accounts:revokeToken",za(n,t))}/**
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
 */class On{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){j(t.idToken,"internal-error"),j(typeof t.idToken<"u","internal-error"),j(typeof t.refreshToken<"u","internal-error");const e="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):ml(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}updateFromIdToken(t){j(t.length!==0,"internal-error");const e=ml(t);this.updateTokensAndExpiration(t,null,e)}async getToken(t,e=!1){return!e&&this.accessToken&&!this.isExpired?this.accessToken:(j(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:r,refreshToken:s,expiresIn:i}=await wI(t,e);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(t,e,r){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(t,e){const{refreshToken:r,accessToken:s,expirationTime:i}=e,o=new On;return r&&(j(typeof r=="string","internal-error",{appName:t}),o.refreshToken=r),s&&(j(typeof s=="string","internal-error",{appName:t}),o.accessToken=s),i&&(j(typeof i=="number","internal-error",{appName:t}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new On,this.toJSON())}_performRefresh(){return me("not implemented")}}/**
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
 */function De(n,t){j(typeof n=="string"||typeof n>"u","internal-error",{appName:t})}class Yt{constructor({uid:t,auth:e,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new yI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=e,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new sa(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(t){const e=await jr(this,this.stsTokenManager.getToken(this.auth,t));return j(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return mI(this,t)}reload(){return TI(this)}_assign(t){this!==t&&(j(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(e=>({...e})),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const e=new Yt({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return e.metadata._copy(this.metadata),e}_onReload(t){j(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let r=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),r=!0),e&&await oi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Jt(this.auth.app))return Promise.reject(je(this.auth));const t=await this.getIdToken();return await jr(this,gI(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>({...t})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){const r=e.displayName??void 0,s=e.email??void 0,i=e.phoneNumber??void 0,o=e.photoURL??void 0,c=e.tenantId??void 0,u=e._redirectEventId??void 0,h=e.createdAt??void 0,f=e.lastLoginAt??void 0,{uid:p,emailVerified:m,isAnonymous:A,providerData:S,stsTokenManager:k}=e;j(p&&k,t,"internal-error");const V=On.fromJSON(this.name,k);j(typeof p=="string",t,"internal-error"),De(r,t.name),De(s,t.name),j(typeof m=="boolean",t,"internal-error"),j(typeof A=="boolean",t,"internal-error"),De(i,t.name),De(o,t.name),De(c,t.name),De(u,t.name),De(h,t.name),De(f,t.name);const L=new Yt({uid:p,auth:t,email:s,emailVerified:m,displayName:r,isAnonymous:A,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:V,createdAt:h,lastLoginAt:f});return S&&Array.isArray(S)&&(L.providerData=S.map(x=>({...x}))),u&&(L._redirectEventId=u),L}static async _fromIdTokenResponse(t,e,r=!1){const s=new On;s.updateFromServerResponse(e);const i=new Yt({uid:e.localId,auth:t,stsTokenManager:s,isAnonymous:r});return await oi(i),i}static async _fromGetAccountInfoResponse(t,e,r){const s=e.users[0];j(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Sf(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new On;c.updateFromIdToken(r);const u=new Yt({uid:s.localId,auth:t,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new sa(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
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
 */const _l=new Map;function _e(n){Ie(n instanceof Function,"Expected a class definition");let t=_l.get(n);return t?(Ie(t instanceof n,"Instance stored in cache mismatched with class"),t):(t=new n,_l.set(n,t),t)}/**
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
 */class Rf{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return e===void 0?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}Rf.type="NONE";const yl=Rf;/**
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
 */function Us(n,t,e){return`firebase:${n}:${t}:${e}`}class Mn{constructor(t,e,r){this.persistence=t,this.auth=e,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Us(this.userKey,s.apiKey,i),this.fullPersistenceKey=Us("persistence",s.apiKey,i),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const e=await ii(this.auth,{idToken:t}).catch(()=>{});return e?Yt._fromGetAccountInfoResponse(this.auth,e,t):null}return Yt._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,e)return this.setCurrentUser(e)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,r="authUser"){if(!e.length)return new Mn(_e(yl),t,r);const s=(await Promise.all(e.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||_e(yl);const o=Us(r,t.config.apiKey,t.name);let c=null;for(const h of e)try{const f=await h._get(o);if(f){let p;if(typeof f=="string"){const m=await ii(t,{idToken:f}).catch(()=>{});if(!m)break;p=await Yt._fromGetAccountInfoResponse(t,m,f)}else p=Yt._fromJSON(t,f);h!==i&&(c=p),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Mn(i,t,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(e.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Mn(i,t,r))}}/**
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
 */function Tl(n){const t=n.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Df(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Pf(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Of(t))return"Blackberry";if(Mf(t))return"Webos";if(kf(t))return"Safari";if((t.includes("chrome/")||Vf(t))&&!t.includes("edge/"))return"Chrome";if(Nf(t))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(e);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Pf(n=Nt()){return/firefox\//i.test(n)}function kf(n=Nt()){const t=n.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Vf(n=Nt()){return/crios\//i.test(n)}function Df(n=Nt()){return/iemobile/i.test(n)}function Nf(n=Nt()){return/android/i.test(n)}function Of(n=Nt()){return/blackberry/i.test(n)}function Mf(n=Nt()){return/webos/i.test(n)}function Ja(n=Nt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function AI(n=Nt()){var t;return Ja(n)&&!!((t=window.navigator)!=null&&t.standalone)}function vI(){return FE()&&document.documentMode===10}function Lf(n=Nt()){return Ja(n)||Nf(n)||Mf(n)||Of(n)||/windows phone/i.test(n)||Df(n)}/**
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
 */function xf(n,t=[]){let e;switch(n){case"Browser":e=Tl(Nt());break;case"Worker":e=`${Tl(Nt())}-${n}`;break;default:e=n}const r=t.length?t.join(","):"FirebaseCore-web";return`${e}/JsCore/${Zn}/${r}`}/**
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
 */class bI{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,e){const r=i=>new Promise((o,c)=>{try{const u=t(i);o(u)}catch(u){c(u)}});r.onAbort=e,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const e=[];try{for(const r of this.queue)await r(t),r.onAbort&&e.push(r.onAbort)}catch(r){e.reverse();for(const s of e)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function CI(n,t={}){return tr(n,"GET","/v2/passwordPolicy",za(n,t))}/**
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
 */const SI=6;class RI{constructor(t){var r;const e=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=e.minPasswordLength??SI,e.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=e.maxPasswordLength),e.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=e.containsLowercaseCharacter),e.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=e.containsUppercaseCharacter),e.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=e.containsNumericCharacter),e.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=e.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=t.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=t.forceUpgradeOnSignin??!1,this.schemaVersion=t.schemaVersion}validatePassword(t){const e={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,e),this.validatePasswordCharacterOptions(t,e),e.isValid&&(e.isValid=e.meetsMinPasswordLength??!0),e.isValid&&(e.isValid=e.meetsMaxPasswordLength??!0),e.isValid&&(e.isValid=e.containsLowercaseLetter??!0),e.isValid&&(e.isValid=e.containsUppercaseLetter??!0),e.isValid&&(e.isValid=e.containsNumericCharacter??!0),e.isValid&&(e.isValid=e.containsNonAlphanumericCharacter??!0),e}validatePasswordLengthOptions(t,e){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(e.meetsMinPasswordLength=t.length>=r),s&&(e.meetsMaxPasswordLength=t.length<=s)}validatePasswordCharacterOptions(t,e){this.updatePasswordCharacterOptionsStatuses(e,!1,!1,!1,!1);let r;for(let s=0;s<t.length;s++)r=t.charAt(s),this.updatePasswordCharacterOptionsStatuses(e,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(t,e,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=e)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=i))}}/**
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
 */class PI{constructor(t,e,r,s){this.app=t,this.heartbeatServiceProvider=e,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new El(this),this.idTokenSubscription=new El(this),this.beforeStateQueue=new bI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=If,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=_e(e)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Mn.create(this,t),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(e),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const e=await ii(this,{idToken:t}),r=await Yt._fromGetAccountInfoResponse(this,e,t);await this.directlySetCurrentUser(r)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var i;if(Jt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const e=await this.assertedPersistence.getCurrentUser();let r=e,s=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(t);(!o||o===c)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=e,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return j(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await oi(t)}catch(e){if((e==null?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=uI()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(Jt(this.app))return Promise.reject(je(this));const e=t?At(t):null;return e&&j(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t,e=!1){if(!this._deleted)return t&&j(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),e||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return Jt(this.app)?Promise.reject(je(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return Jt(this.app)?Promise.reject(je(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(_e(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const e=this._getPasswordPolicyInternal();return e.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):e.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await CI(this),e=new RI(t);this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new rs("auth","Firebase",t())}onAuthStateChanged(t,e,r){return this.registerStateListener(this.authStateSubscription,t,e,r)}beforeAuthStateChanged(t,e){return this.beforeStateQueue.pushCallback(t,e)}onIdTokenChanged(t,e,r){return this.registerStateListener(this.idTokenSubscription,t,e,r)}authStateReady(){return new Promise((t,e)=>{if(this.currentUser)t();else{const r=this.onAuthStateChanged(()=>{r(),t()},e)}})}async revokeAccessToken(t){if(this.currentUser){const e=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:e};this.tenantId!=null&&(r.tenantId=this.tenantId),await II(this,r)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)==null?void 0:t.toJSON()}}async _setRedirectUser(t,e){const r=await this.getOrInitRedirectPersistenceManager(e);return t===null?r.removeCurrentUser():r.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&_e(t)||this._popupRedirectResolver;j(e,this,"argument-error"),this.redirectPersistenceManager=await Mn.create(this,[_e(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var e,r;return this._isInitialized&&await this.queue(async()=>{}),((e=this._currentUser)==null?void 0:e._redirectEventId)===t?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=((e=this.currentUser)==null?void 0:e.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,r,s){if(this._deleted)return()=>{};const i=typeof e=="function"?e:e.next.bind(e);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(j(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof e=="function"){const u=t.addObserver(e,r,s);return()=>{o=!0,u()}}else{const u=t.addObserver(e);return()=>{o=!0,u()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return j(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=xf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const e=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());e&&(t["X-Firebase-Client"]=e);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;if(Jt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:e.getToken());return t!=null&&t.error&&oI(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function er(n){return At(n)}class El{constructor(t){this.auth=t,this.observer=null,this.addObserver=WE(e=>this.observer=e)}get next(){return j(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Ga={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function kI(n){Ga=n}function VI(n){return Ga.loadJS(n)}function DI(){return Ga.gapiScript}function NI(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function OI(n,t){const e=ja(n,"auth");if(e.isInitialized()){const s=e.getImmediate(),i=e.getOptions();if(fn(i,t??{}))return s;he(s,"already-initialized")}return e.initialize({options:t})}function MI(n,t){const e=(t==null?void 0:t.persistence)||[],r=(Array.isArray(e)?e:[e]).map(_e);t!=null&&t.errorMap&&n._updateErrorMap(t.errorMap),n._initializeWithPersistence(r,t==null?void 0:t.popupRedirectResolver)}function LI(n,t,e){const r=er(n);j(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=!1,i=Ff(t),{host:o,port:c}=xI(t),u=c===null?"":`:${c}`,h={url:`${i}//${o}${u}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){j(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),j(fn(h,r.config.emulator)&&fn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Yn(o)?(ff(`${i}//${o}${u}`),pf("Auth",!0)):FI()}function Ff(n){const t=n.indexOf(":");return t<0?"":n.substr(0,t+1)}function xI(n){const t=Ff(n),e=/(\/\/)?([^?#/]+)/.exec(n.substr(t.length));if(!e)return{host:"",port:null};const r=e[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:wl(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:wl(o)}}}function wl(n){if(!n)return null;const t=Number(n);return isNaN(t)?null:t}function FI(){function n(){const t=document.createElement("p"),e=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",e.position="fixed",e.width="100%",e.backgroundColor="#ffffff",e.border=".1em solid #000000",e.color="#b50000",e.bottom="0px",e.left="0px",e.margin="0px",e.zIndex="10000",e.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Uf{constructor(t,e){this.providerId=t,this.signInMethod=e}toJSON(){return me("not implemented")}_getIdTokenResponse(t){return me("not implemented")}_linkToIdToken(t,e){return me("not implemented")}_getReauthenticationResolver(t){return me("not implemented")}}/**
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
 */async function Ln(n,t){return fI(n,"POST","/v1/accounts:signInWithIdp",za(n,t))}/**
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
 */const UI="http://localhost";class gn extends Uf{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const e=new gn(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(e.idToken=t.idToken),t.accessToken&&(e.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(e.nonce=t.nonce),t.pendingToken&&(e.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(e.accessToken=t.oauthToken,e.secret=t.oauthTokenSecret):he("argument-error"),e}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t,{providerId:r,signInMethod:s,...i}=e;if(!r||!s)return null;const o=new gn(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(t){const e=this.buildRequest();return Ln(t,e)}_linkToIdToken(t,e){const r=this.buildRequest();return r.idToken=e,Ln(t,r)}_getReauthenticationResolver(t){const e=this.buildRequest();return e.autoCreate=!1,Ln(t,e)}buildRequest(){const t={requestUri:UI,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const e={};this.idToken&&(e.id_token=this.idToken),this.accessToken&&(e.access_token=this.accessToken),this.secret&&(e.oauth_token_secret=this.secret),e.providerId=this.providerId,this.nonce&&!this.pendingToken&&(e.nonce=this.nonce),t.postBody=ss(e)}return t}}/**
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
 */class Mi{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
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
 */class os extends Mi{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
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
 */class Ne extends os{constructor(){super("facebook.com")}static credential(t){return gn._fromParams({providerId:Ne.PROVIDER_ID,signInMethod:Ne.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Ne.credentialFromTaggedObject(t)}static credentialFromError(t){return Ne.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Ne.credential(t.oauthAccessToken)}catch{return null}}}Ne.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ne.PROVIDER_ID="facebook.com";/**
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
 */class ge extends os{constructor(){super("google.com"),this.addScope("profile")}static credential(t,e){return gn._fromParams({providerId:ge.PROVIDER_ID,signInMethod:ge.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:e})}static credentialFromResult(t){return ge.credentialFromTaggedObject(t)}static credentialFromError(t){return ge.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:e,oauthAccessToken:r}=t;if(!e&&!r)return null;try{return ge.credential(e,r)}catch{return null}}}ge.GOOGLE_SIGN_IN_METHOD="google.com";ge.PROVIDER_ID="google.com";/**
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
 */class Oe extends os{constructor(){super("github.com")}static credential(t){return gn._fromParams({providerId:Oe.PROVIDER_ID,signInMethod:Oe.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Oe.credentialFromTaggedObject(t)}static credentialFromError(t){return Oe.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Oe.credential(t.oauthAccessToken)}catch{return null}}}Oe.GITHUB_SIGN_IN_METHOD="github.com";Oe.PROVIDER_ID="github.com";/**
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
 */class Me extends os{constructor(){super("twitter.com")}static credential(t,e){return gn._fromParams({providerId:Me.PROVIDER_ID,signInMethod:Me.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:e})}static credentialFromResult(t){return Me.credentialFromTaggedObject(t)}static credentialFromError(t){return Me.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:e,oauthTokenSecret:r}=t;if(!e||!r)return null;try{return Me.credential(e,r)}catch{return null}}}Me.TWITTER_SIGN_IN_METHOD="twitter.com";Me.PROVIDER_ID="twitter.com";/**
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
 */class jn{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,e,r,s=!1){const i=await Yt._fromIdTokenResponse(t,r,s),o=Il(r);return new jn({user:i,providerId:o,_tokenResponse:r,operationType:e})}static async _forOperation(t,e,r){await t._updateTokensIfNecessary(r,!0);const s=Il(r);return new jn({user:t,providerId:s,_tokenResponse:r,operationType:e})}}function Il(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class ai extends be{constructor(t,e,r,s){super(e.code,e.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ai.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:e.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,e,r,s){return new ai(t,e,r,s)}}function Bf(n,t,e,r){return(t==="reauthenticate"?e._getReauthenticationResolver(n):e._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ai._fromErrorAndOperation(n,i,t,r):i})}async function BI(n,t,e=!1){const r=await jr(n,t._linkToIdToken(n.auth,await n.getIdToken()),e);return jn._forOperation(n,"link",r)}/**
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
 */async function jI(n,t,e=!1){const{auth:r}=n;if(Jt(r.app))return Promise.reject(je(r));const s="reauthenticate";try{const i=await jr(n,Bf(r,s,t,n),e);j(i.idToken,r,"internal-error");const o=Wa(i.idToken);j(o,r,"internal-error");const{sub:c}=o;return j(n.uid===c,r,"user-mismatch"),jn._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&he(r,"user-mismatch"),i}}/**
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
 */async function $I(n,t,e=!1){if(Jt(n.app))return Promise.reject(je(n));const r="signIn",s=await Bf(n,r,t),i=await jn._fromIdTokenResponse(n,r,s);return e||await n._updateCurrentUser(i.user),i}/**
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
 */function qI(n,t){return At(n).setPersistence(t)}function HI(n,t,e,r){return At(n).onIdTokenChanged(t,e,r)}function zI(n,t,e){return At(n).beforeAuthStateChanged(t,e)}function WI(n,t,e,r){return At(n).onAuthStateChanged(t,e,r)}function JI(n){return At(n).signOut()}const ci="__sak";/**
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
 */class jf{constructor(t,e){this.storageRetriever=t,this.type=e}_isAvailable(){try{return this.storage?(this.storage.setItem(ci,"1"),this.storage.removeItem(ci),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,e){return this.storage.setItem(t,JSON.stringify(e)),Promise.resolve()}_get(t){const e=this.storage.getItem(t);return Promise.resolve(e?JSON.parse(e):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const GI=1e3,KI=10;class $f extends jf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,e)=>this.onStorageEvent(t,e),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Lf(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const e of Object.keys(this.listeners)){const r=this.storage.getItem(e),s=this.localCache[e];r!==s&&t(e,s,r)}}onStorageEvent(t,e=!1){if(!t.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=t.key;e?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!e&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);vI()&&i!==t.newValue&&t.newValue!==t.oldValue?setTimeout(s,KI):s()}notifyListeners(t,e){this.localCache[t]=e;const r=this.listeners[t];if(r)for(const s of Array.from(r))s(e&&JSON.parse(e))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,e,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:e,newValue:r}),!0)})},GI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,e){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,e){await super._set(t,e),this.localCache[t]=JSON.stringify(e)}async _get(t){const e=await super._get(t);return this.localCache[t]=JSON.stringify(e),e}async _remove(t){await super._remove(t),delete this.localCache[t]}}$f.type="LOCAL";const qf=$f;/**
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
 */class Hf extends jf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,e){}_removeListener(t,e){}}Hf.type="SESSION";const Ka=Hf;/**
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
 */function QI(n){return Promise.all(n.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(e){return{fulfilled:!1,reason:e}}}))}/**
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
 */class Li{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find(s=>s.isListeningto(t));if(e)return e;const r=new Li(t);return this.receivers.push(r),r}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:r,eventType:s,data:i}=e.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;e.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async h=>h(e.origin,i)),u=await QI(c);e.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(t,e){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),(!e||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Li.receivers=[];/**
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
 */function Qa(n="",t=10){let e="";for(let r=0;r<t;r++)e+=Math.floor(Math.random()*10);return n+e}/**
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
 */class XI{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const h=Qa("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const m=p;if(m.data.eventId===h)switch(m.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(m.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:t,eventId:h,data:e},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function oe(){return window}function YI(n){oe().location.href=n}/**
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
 */function zf(){return typeof oe().WorkerGlobalScope<"u"&&typeof oe().importScripts=="function"}async function ZI(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function tA(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function eA(){return zf()?self:null}/**
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
 */const Wf="firebaseLocalStorageDb",nA=1,ui="firebaseLocalStorage",Jf="fbase_key";class as{constructor(t){this.request=t}toPromise(){return new Promise((t,e)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{e(this.request.error)})})}}function xi(n,t){return n.transaction([ui],t?"readwrite":"readonly").objectStore(ui)}function rA(){const n=indexedDB.deleteDatabase(Wf);return new as(n).toPromise()}function ia(){const n=indexedDB.open(Wf,nA);return new Promise((t,e)=>{n.addEventListener("error",()=>{e(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ui,{keyPath:Jf})}catch(s){e(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ui)?t(r):(r.close(),await rA(),t(await ia()))})})}async function Al(n,t,e){const r=xi(n,!0).put({[Jf]:t,value:e});return new as(r).toPromise()}async function sA(n,t){const e=xi(n,!1).get(t),r=await new as(e).toPromise();return r===void 0?null:r.value}function vl(n,t){const e=xi(n,!0).delete(t);return new as(e).toPromise()}const iA=800,oA=3;class Gf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ia(),this.db)}async _withRetries(t){let e=0;for(;;)try{const r=await this._openDb();return await t(r)}catch(r){if(e++>oA)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return zf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Li._getInstance(eA()),this.receiver._subscribe("keyChanged",async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)})),this.receiver._subscribe("ping",async(t,e)=>["keyChanged"])}async initializeSender(){var e,r;if(this.activeServiceWorker=await ZI(),!this.activeServiceWorker)return;this.sender=new XI(this.activeServiceWorker);const t=await this.sender._send("ping",{},800);t&&(e=t[0])!=null&&e.fulfilled&&(r=t[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||tA()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await ia();return await Al(t,ci,"1"),await vl(t,ci),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite(async()=>(await this._withRetries(r=>Al(r,t,e)),this.localCache[t]=e,this.notifyServiceWorker(t)))}async _get(t){const e=await this._withRetries(r=>sA(r,t));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(e=>vl(e,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(s=>{const i=xi(s,!1).getAll();return new as(i).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const e=[],r=new Set;if(t.length!==0)for(const{fbase_key:s,value:i}of t)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),e.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),e.push(s));return e}notifyListeners(t,e){this.localCache[t]=e;const r=this.listeners[t];if(r)for(const s of Array.from(r))s(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),iA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Gf.type="LOCAL";const Kf=Gf;new is(3e4,6e4);/**
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
 */function Xa(n,t){return t?_e(t):(j(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Ya extends Uf{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return Ln(t,this._buildIdpRequest())}_linkToIdToken(t,e){return Ln(t,this._buildIdpRequest(e))}_getReauthenticationResolver(t){return Ln(t,this._buildIdpRequest())}_buildIdpRequest(t){const e={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(e.idToken=t),e}}function aA(n){return $I(n.auth,new Ya(n),n.bypassAuthState)}function cA(n){const{auth:t,user:e}=n;return j(e,t,"internal-error"),jI(e,new Ya(n),n.bypassAuthState)}async function uA(n){const{auth:t,user:e}=n;return j(e,t,"internal-error"),BI(e,new Ya(n),n.bypassAuthState)}/**
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
 */class Qf{constructor(t,e,r,s,i=!1){this.auth=t,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(e)?e:[e]}execute(){return new Promise(async(t,e)=>{this.pendingPromise={resolve:t,reject:e};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(t){const{urlResponse:e,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=t;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:e,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return aA;case"linkViaPopup":case"linkViaRedirect":return uA;case"reauthViaPopup":case"reauthViaRedirect":return cA;default:he(this.auth,"internal-error")}}resolve(t){Ie(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){Ie(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const lA=new is(2e3,1e4);async function hA(n,t,e){if(Jt(n.app))return Promise.reject(Zt(n,"operation-not-supported-in-this-environment"));const r=er(n);Af(n,t,Mi);const s=Xa(r,e);return new ln(r,"signInViaPopup",t,s).executeNotNull()}class ln extends Qf{constructor(t,e,r,s,i){super(t,e,s,i),this.provider=r,this.authWindow=null,this.pollId=null,ln.currentPopupAction&&ln.currentPopupAction.cancel(),ln.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return j(t,this.auth,"internal-error"),t}async onExecution(){Ie(this.filter.length===1,"Popup operations only handle one event");const t=Qa();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(Zt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)==null?void 0:t.associatedEvent)||null}cancel(){this.reject(Zt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ln.currentPopupAction=null}pollUserCancellation(){const t=()=>{var e,r;if((r=(e=this.authWindow)==null?void 0:e.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Zt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,lA.get())};t()}}ln.currentPopupAction=null;/**
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
 */const dA="pendingRedirect",Bs=new Map;class fA extends Qf{constructor(t,e,r=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],e,void 0,r),this.eventId=null}async execute(){let t=Bs.get(this.auth._key());if(!t){try{const r=await pA(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(r)}catch(e){t=()=>Promise.reject(e)}Bs.set(this.auth._key(),t)}return this.bypassAuthState||Bs.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const e=await this.auth._redirectUserForId(t.eventId);if(e)return this.user=e,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function pA(n,t){const e=Yf(t),r=Xf(n);if(!await r._isAvailable())return!1;const s=await r._get(e)==="true";return await r._remove(e),s}async function gA(n,t){return Xf(n)._set(Yf(t),"true")}function mA(n,t){Bs.set(n._key(),t)}function Xf(n){return _e(n._redirectPersistence)}function Yf(n){return Us(dA,n.config.apiKey,n.name)}/**
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
 */function _A(n,t,e){return yA(n,t,e)}async function yA(n,t,e){if(Jt(n.app))return Promise.reject(je(n));const r=er(n);Af(n,t,Mi),await r._initializationPromise;const s=Xa(r,e);return await gA(s,r),s._openRedirect(r,t,"signInViaRedirect")}async function TA(n,t){return await er(n)._initializationPromise,Zf(n,t,!1)}async function Zf(n,t,e=!1){if(Jt(n.app))return Promise.reject(je(n));const r=er(n),s=Xa(r,t),o=await new fA(r,s,e).execute();return o&&!e&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}/**
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
 */const EA=600*1e3;class wA{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let e=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(t,r)&&(e=!0,this.sendToConsumer(t,r),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!IA(t)||(this.hasHandledPotentialRedirect=!0,e||(this.queuedRedirectEvent=t,e=!0)),e}sendToConsumer(t,e){var r;if(t.error&&!tp(t)){const s=((r=t.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";e.onError(Zt(this.auth,s))}else e.onAuthEvent(t)}isEventForConsumer(t,e){const r=e.eventId===null||!!t.eventId&&t.eventId===e.eventId;return e.filter.includes(t.type)&&r}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=EA&&this.cachedEventUids.clear(),this.cachedEventUids.has(bl(t))}saveEventToCache(t){this.cachedEventUids.add(bl(t)),this.lastProcessedEventTime=Date.now()}}function bl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(t=>t).join("-")}function tp({type:n,error:t}){return n==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function IA(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return tp(n);default:return!1}}/**
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
 */async function AA(n,t={}){return tr(n,"GET","/v1/projects",t)}/**
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
 */const vA=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,bA=/^https?/;async function CA(n){if(n.config.emulator)return;const{authorizedDomains:t}=await AA(n);for(const e of t)try{if(SA(e))return}catch{}he(n,"unauthorized-domain")}function SA(n){const t=ra(),{protocol:e,hostname:r}=new URL(t);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?e==="chrome-extension:"&&n.replace("chrome-extension://","")===t.replace("chrome-extension://",""):e==="chrome-extension:"&&o.hostname===r}if(!bA.test(e))return!1;if(vA.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const RA=new is(3e4,6e4);function Cl(){const n=oe().___jsl;if(n!=null&&n.H){for(const t of Object.keys(n.H))if(n.H[t].r=n.H[t].r||[],n.H[t].L=n.H[t].L||[],n.H[t].r=[...n.H[t].L],n.CP)for(let e=0;e<n.CP.length;e++)n.CP[e]=null}}function PA(n){return new Promise((t,e)=>{var s,i,o;function r(){Cl(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Cl(),e(Zt(n,"network-request-failed"))},timeout:RA.get()})}if((i=(s=oe().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)t(gapi.iframes.getContext());else if((o=oe().gapi)!=null&&o.load)r();else{const c=NI("iframefcb");return oe()[c]=()=>{gapi.load?r():e(Zt(n,"network-request-failed"))},VI(`${DI()}?onload=${c}`).catch(u=>e(u))}}).catch(t=>{throw js=null,t})}let js=null;function kA(n){return js=js||PA(n),js}/**
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
 */const VA=new is(5e3,15e3),DA="__/auth/iframe",NA="emulator/auth/iframe",OA={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},MA=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function LA(n){const t=n.config;j(t.authDomain,n,"auth-domain-config-required");const e=t.emulator?Ha(t,NA):`https://${n.config.authDomain}/${DA}`,r={apiKey:t.apiKey,appName:n.name,v:Zn},s=MA.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${e}?${ss(r).slice(1)}`}async function xA(n){const t=await kA(n),e=oe().gapi;return j(e,n,"internal-error"),t.open({where:document.body,url:LA(n),messageHandlersFilter:e.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:OA,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Zt(n,"network-request-failed"),c=oe().setTimeout(()=>{i(o)},VA.get());function u(){oe().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
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
 */const FA={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},UA=500,BA=600,jA="_blank",$A="http://localhost";class Sl{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function qA(n,t,e,r=UA,s=BA){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...FA,width:r.toString(),height:s.toString(),top:i,left:o},h=Nt().toLowerCase();e&&(c=Vf(h)?jA:e),Pf(h)&&(t=t||$A,u.scrollbars="yes");const f=Object.entries(u).reduce((m,[A,S])=>`${m}${A}=${S},`,"");if(AI(h)&&c!=="_self")return HA(t||"",c),new Sl(null);const p=window.open(t||"",c,f);j(p,n,"popup-blocked");try{p.focus()}catch{}return new Sl(p)}function HA(n,t){const e=document.createElement("a");e.href=n,e.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),e.dispatchEvent(r)}/**
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
 */const zA="__/auth/handler",WA="emulator/auth/handler",JA=encodeURIComponent("fac");async function Rl(n,t,e,r,s,i){j(n.config.authDomain,n,"auth-domain-config-required"),j(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:e,redirectUrl:r,v:Zn,eventId:s};if(t instanceof Mi){t.setDefaultLanguage(n.languageCode),o.providerId=t.providerId||"",zE(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(t instanceof os){const f=t.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),h=u?`#${JA}=${encodeURIComponent(u)}`:"";return`${GA(n)}?${ss(c).slice(1)}${h}`}function GA({config:n}){return n.emulator?Ha(n,WA):`https://${n.authDomain}/${zA}`}/**
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
 */const Uo="webStorageSupport";class KA{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ka,this._completeRedirectFn=Zf,this._overrideRedirectResult=mA}async _openPopup(t,e,r,s){var o;Ie((o=this.eventManagers[t._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await Rl(t,e,r,ra(),s);return qA(t,i,Qa())}async _openRedirect(t,e,r,s){await this._originValidation(t);const i=await Rl(t,e,r,ra(),s);return YI(i),new Promise(()=>{})}_initialize(t){const e=t._key();if(this.eventManagers[e]){const{manager:s,promise:i}=this.eventManagers[e];return s?Promise.resolve(s):(Ie(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(t);return this.eventManagers[e]={promise:r},r.catch(()=>{delete this.eventManagers[e]}),r}async initAndGetManager(t){const e=await xA(t),r=new wA(t);return e.register("authEvent",s=>(j(s==null?void 0:s.authEvent,t,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:r},this.iframes[t._key()]=e,r}_isIframeWebStorageSupported(t,e){this.iframes[t._key()].send(Uo,{type:Uo},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[Uo];i!==void 0&&e(!!i),he(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=CA(t)),this.originValidationPromises[e]}get _shouldInitProactively(){return Lf()||kf()||Ja()}}const QA=KA;var Pl="@firebase/auth",kl="1.12.0";/**
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
 */class XA{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)==null?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged(r=>{t((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){j(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function YA(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ZA(n){Bn(new pn("auth",(t,{options:e})=>{const r=t.getProvider("app").getImmediate(),s=t.getProvider("heartbeat"),i=t.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;j(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:xf(n)},h=new PI(r,s,i,u);return MI(h,e),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,r)=>{t.getProvider("auth-internal").initialize()})),Bn(new pn("auth-internal",t=>{const e=er(t.getProvider("auth").getImmediate());return(r=>new XA(r))(e)},"PRIVATE").setInstantiationMode("EXPLICIT")),Be(Pl,kl,YA(n)),Be(Pl,kl,"esm2020")}/**
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
 */const tv=300,ev=df("authIdTokenMaxAge")||tv;let Vl=null;const nv=n=>async t=>{const e=t&&await t.getIdTokenResult(),r=e&&(new Date().getTime()-Date.parse(e.issuedAtTime))/1e3;if(r&&r>ev)return;const s=e==null?void 0:e.token;Vl!==s&&(Vl=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function rv(n=yf()){const t=ja(n,"auth");if(t.isInitialized())return t.getImmediate();const e=OI(n,{popupRedirectResolver:QA,persistence:[Kf,qf,Ka]}),r=df("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=nv(i.toString());zI(e,o,()=>o(e.currentUser)),HI(e,c=>o(c))}}const s=lf("auth");return s&&LI(e,`http://${s}`),e}function sv(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}kI({loadJS(n){return new Promise((t,e)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=t,r.onerror=s=>{const i=Zt("internal-error");i.customData=s,e(i)},r.type="text/javascript",r.charset="UTF-8",sv().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ZA("Browser");var Dl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var $e,ep;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(w,_){function T(){}T.prototype=_.prototype,w.F=_.prototype,w.prototype=new T,w.prototype.constructor=w,w.D=function(I,E,b){for(var y=Array(arguments.length-2),xt=2;xt<arguments.length;xt++)y[xt-2]=arguments[xt];return _.prototype[E].apply(I,y)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,_,T){T||(T=0);const I=Array(16);if(typeof _=="string")for(var E=0;E<16;++E)I[E]=_.charCodeAt(T++)|_.charCodeAt(T++)<<8|_.charCodeAt(T++)<<16|_.charCodeAt(T++)<<24;else for(E=0;E<16;++E)I[E]=_[T++]|_[T++]<<8|_[T++]<<16|_[T++]<<24;_=w.g[0],T=w.g[1],E=w.g[2];let b=w.g[3],y;y=_+(b^T&(E^b))+I[0]+3614090360&4294967295,_=T+(y<<7&4294967295|y>>>25),y=b+(E^_&(T^E))+I[1]+3905402710&4294967295,b=_+(y<<12&4294967295|y>>>20),y=E+(T^b&(_^T))+I[2]+606105819&4294967295,E=b+(y<<17&4294967295|y>>>15),y=T+(_^E&(b^_))+I[3]+3250441966&4294967295,T=E+(y<<22&4294967295|y>>>10),y=_+(b^T&(E^b))+I[4]+4118548399&4294967295,_=T+(y<<7&4294967295|y>>>25),y=b+(E^_&(T^E))+I[5]+1200080426&4294967295,b=_+(y<<12&4294967295|y>>>20),y=E+(T^b&(_^T))+I[6]+2821735955&4294967295,E=b+(y<<17&4294967295|y>>>15),y=T+(_^E&(b^_))+I[7]+4249261313&4294967295,T=E+(y<<22&4294967295|y>>>10),y=_+(b^T&(E^b))+I[8]+1770035416&4294967295,_=T+(y<<7&4294967295|y>>>25),y=b+(E^_&(T^E))+I[9]+2336552879&4294967295,b=_+(y<<12&4294967295|y>>>20),y=E+(T^b&(_^T))+I[10]+4294925233&4294967295,E=b+(y<<17&4294967295|y>>>15),y=T+(_^E&(b^_))+I[11]+2304563134&4294967295,T=E+(y<<22&4294967295|y>>>10),y=_+(b^T&(E^b))+I[12]+1804603682&4294967295,_=T+(y<<7&4294967295|y>>>25),y=b+(E^_&(T^E))+I[13]+4254626195&4294967295,b=_+(y<<12&4294967295|y>>>20),y=E+(T^b&(_^T))+I[14]+2792965006&4294967295,E=b+(y<<17&4294967295|y>>>15),y=T+(_^E&(b^_))+I[15]+1236535329&4294967295,T=E+(y<<22&4294967295|y>>>10),y=_+(E^b&(T^E))+I[1]+4129170786&4294967295,_=T+(y<<5&4294967295|y>>>27),y=b+(T^E&(_^T))+I[6]+3225465664&4294967295,b=_+(y<<9&4294967295|y>>>23),y=E+(_^T&(b^_))+I[11]+643717713&4294967295,E=b+(y<<14&4294967295|y>>>18),y=T+(b^_&(E^b))+I[0]+3921069994&4294967295,T=E+(y<<20&4294967295|y>>>12),y=_+(E^b&(T^E))+I[5]+3593408605&4294967295,_=T+(y<<5&4294967295|y>>>27),y=b+(T^E&(_^T))+I[10]+38016083&4294967295,b=_+(y<<9&4294967295|y>>>23),y=E+(_^T&(b^_))+I[15]+3634488961&4294967295,E=b+(y<<14&4294967295|y>>>18),y=T+(b^_&(E^b))+I[4]+3889429448&4294967295,T=E+(y<<20&4294967295|y>>>12),y=_+(E^b&(T^E))+I[9]+568446438&4294967295,_=T+(y<<5&4294967295|y>>>27),y=b+(T^E&(_^T))+I[14]+3275163606&4294967295,b=_+(y<<9&4294967295|y>>>23),y=E+(_^T&(b^_))+I[3]+4107603335&4294967295,E=b+(y<<14&4294967295|y>>>18),y=T+(b^_&(E^b))+I[8]+1163531501&4294967295,T=E+(y<<20&4294967295|y>>>12),y=_+(E^b&(T^E))+I[13]+2850285829&4294967295,_=T+(y<<5&4294967295|y>>>27),y=b+(T^E&(_^T))+I[2]+4243563512&4294967295,b=_+(y<<9&4294967295|y>>>23),y=E+(_^T&(b^_))+I[7]+1735328473&4294967295,E=b+(y<<14&4294967295|y>>>18),y=T+(b^_&(E^b))+I[12]+2368359562&4294967295,T=E+(y<<20&4294967295|y>>>12),y=_+(T^E^b)+I[5]+4294588738&4294967295,_=T+(y<<4&4294967295|y>>>28),y=b+(_^T^E)+I[8]+2272392833&4294967295,b=_+(y<<11&4294967295|y>>>21),y=E+(b^_^T)+I[11]+1839030562&4294967295,E=b+(y<<16&4294967295|y>>>16),y=T+(E^b^_)+I[14]+4259657740&4294967295,T=E+(y<<23&4294967295|y>>>9),y=_+(T^E^b)+I[1]+2763975236&4294967295,_=T+(y<<4&4294967295|y>>>28),y=b+(_^T^E)+I[4]+1272893353&4294967295,b=_+(y<<11&4294967295|y>>>21),y=E+(b^_^T)+I[7]+4139469664&4294967295,E=b+(y<<16&4294967295|y>>>16),y=T+(E^b^_)+I[10]+3200236656&4294967295,T=E+(y<<23&4294967295|y>>>9),y=_+(T^E^b)+I[13]+681279174&4294967295,_=T+(y<<4&4294967295|y>>>28),y=b+(_^T^E)+I[0]+3936430074&4294967295,b=_+(y<<11&4294967295|y>>>21),y=E+(b^_^T)+I[3]+3572445317&4294967295,E=b+(y<<16&4294967295|y>>>16),y=T+(E^b^_)+I[6]+76029189&4294967295,T=E+(y<<23&4294967295|y>>>9),y=_+(T^E^b)+I[9]+3654602809&4294967295,_=T+(y<<4&4294967295|y>>>28),y=b+(_^T^E)+I[12]+3873151461&4294967295,b=_+(y<<11&4294967295|y>>>21),y=E+(b^_^T)+I[15]+530742520&4294967295,E=b+(y<<16&4294967295|y>>>16),y=T+(E^b^_)+I[2]+3299628645&4294967295,T=E+(y<<23&4294967295|y>>>9),y=_+(E^(T|~b))+I[0]+4096336452&4294967295,_=T+(y<<6&4294967295|y>>>26),y=b+(T^(_|~E))+I[7]+1126891415&4294967295,b=_+(y<<10&4294967295|y>>>22),y=E+(_^(b|~T))+I[14]+2878612391&4294967295,E=b+(y<<15&4294967295|y>>>17),y=T+(b^(E|~_))+I[5]+4237533241&4294967295,T=E+(y<<21&4294967295|y>>>11),y=_+(E^(T|~b))+I[12]+1700485571&4294967295,_=T+(y<<6&4294967295|y>>>26),y=b+(T^(_|~E))+I[3]+2399980690&4294967295,b=_+(y<<10&4294967295|y>>>22),y=E+(_^(b|~T))+I[10]+4293915773&4294967295,E=b+(y<<15&4294967295|y>>>17),y=T+(b^(E|~_))+I[1]+2240044497&4294967295,T=E+(y<<21&4294967295|y>>>11),y=_+(E^(T|~b))+I[8]+1873313359&4294967295,_=T+(y<<6&4294967295|y>>>26),y=b+(T^(_|~E))+I[15]+4264355552&4294967295,b=_+(y<<10&4294967295|y>>>22),y=E+(_^(b|~T))+I[6]+2734768916&4294967295,E=b+(y<<15&4294967295|y>>>17),y=T+(b^(E|~_))+I[13]+1309151649&4294967295,T=E+(y<<21&4294967295|y>>>11),y=_+(E^(T|~b))+I[4]+4149444226&4294967295,_=T+(y<<6&4294967295|y>>>26),y=b+(T^(_|~E))+I[11]+3174756917&4294967295,b=_+(y<<10&4294967295|y>>>22),y=E+(_^(b|~T))+I[2]+718787259&4294967295,E=b+(y<<15&4294967295|y>>>17),y=T+(b^(E|~_))+I[9]+3951481745&4294967295,w.g[0]=w.g[0]+_&4294967295,w.g[1]=w.g[1]+(E+(y<<21&4294967295|y>>>11))&4294967295,w.g[2]=w.g[2]+E&4294967295,w.g[3]=w.g[3]+b&4294967295}r.prototype.v=function(w,_){_===void 0&&(_=w.length);const T=_-this.blockSize,I=this.C;let E=this.h,b=0;for(;b<_;){if(E==0)for(;b<=T;)s(this,w,b),b+=this.blockSize;if(typeof w=="string"){for(;b<_;)if(I[E++]=w.charCodeAt(b++),E==this.blockSize){s(this,I),E=0;break}}else for(;b<_;)if(I[E++]=w[b++],E==this.blockSize){s(this,I),E=0;break}}this.h=E,this.o+=_},r.prototype.A=function(){var w=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);w[0]=128;for(var _=1;_<w.length-8;++_)w[_]=0;_=this.o*8;for(var T=w.length-8;T<w.length;++T)w[T]=_&255,_/=256;for(this.v(w),w=Array(16),_=0,T=0;T<4;++T)for(let I=0;I<32;I+=8)w[_++]=this.g[T]>>>I&255;return w};function i(w,_){var T=c;return Object.prototype.hasOwnProperty.call(T,w)?T[w]:T[w]=_(w)}function o(w,_){this.h=_;const T=[];let I=!0;for(let E=w.length-1;E>=0;E--){const b=w[E]|0;I&&b==_||(T[E]=b,I=!1)}this.g=T}var c={};function u(w){return-128<=w&&w<128?i(w,function(_){return new o([_|0],_<0?-1:0)}):new o([w|0],w<0?-1:0)}function h(w){if(isNaN(w)||!isFinite(w))return p;if(w<0)return V(h(-w));const _=[];let T=1;for(let I=0;w>=T;I++)_[I]=w/T|0,T*=4294967296;return new o(_,0)}function f(w,_){if(w.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(w.charAt(0)=="-")return V(f(w.substring(1),_));if(w.indexOf("-")>=0)throw Error('number format error: interior "-" character');const T=h(Math.pow(_,8));let I=p;for(let b=0;b<w.length;b+=8){var E=Math.min(8,w.length-b);const y=parseInt(w.substring(b,b+E),_);E<8?(E=h(Math.pow(_,E)),I=I.j(E).add(h(y))):(I=I.j(T),I=I.add(h(y)))}return I}var p=u(0),m=u(1),A=u(16777216);n=o.prototype,n.m=function(){if(k(this))return-V(this).m();let w=0,_=1;for(let T=0;T<this.g.length;T++){const I=this.i(T);w+=(I>=0?I:4294967296+I)*_,_*=4294967296}return w},n.toString=function(w){if(w=w||10,w<2||36<w)throw Error("radix out of range: "+w);if(S(this))return"0";if(k(this))return"-"+V(this).toString(w);const _=h(Math.pow(w,6));var T=this;let I="";for(;;){const E=at(T,_).g;T=L(T,E.j(_));let b=((T.g.length>0?T.g[0]:T.h)>>>0).toString(w);if(T=E,S(T))return b+I;for(;b.length<6;)b="0"+b;I=b+I}},n.i=function(w){return w<0?0:w<this.g.length?this.g[w]:this.h};function S(w){if(w.h!=0)return!1;for(let _=0;_<w.g.length;_++)if(w.g[_]!=0)return!1;return!0}function k(w){return w.h==-1}n.l=function(w){return w=L(this,w),k(w)?-1:S(w)?0:1};function V(w){const _=w.g.length,T=[];for(let I=0;I<_;I++)T[I]=~w.g[I];return new o(T,~w.h).add(m)}n.abs=function(){return k(this)?V(this):this},n.add=function(w){const _=Math.max(this.g.length,w.g.length),T=[];let I=0;for(let E=0;E<=_;E++){let b=I+(this.i(E)&65535)+(w.i(E)&65535),y=(b>>>16)+(this.i(E)>>>16)+(w.i(E)>>>16);I=y>>>16,b&=65535,y&=65535,T[E]=y<<16|b}return new o(T,T[T.length-1]&-2147483648?-1:0)};function L(w,_){return w.add(V(_))}n.j=function(w){if(S(this)||S(w))return p;if(k(this))return k(w)?V(this).j(V(w)):V(V(this).j(w));if(k(w))return V(this.j(V(w)));if(this.l(A)<0&&w.l(A)<0)return h(this.m()*w.m());const _=this.g.length+w.g.length,T=[];for(var I=0;I<2*_;I++)T[I]=0;for(I=0;I<this.g.length;I++)for(let E=0;E<w.g.length;E++){const b=this.i(I)>>>16,y=this.i(I)&65535,xt=w.i(E)>>>16,nn=w.i(E)&65535;T[2*I+2*E]+=y*nn,x(T,2*I+2*E),T[2*I+2*E+1]+=b*nn,x(T,2*I+2*E+1),T[2*I+2*E+1]+=y*xt,x(T,2*I+2*E+1),T[2*I+2*E+2]+=b*xt,x(T,2*I+2*E+2)}for(w=0;w<_;w++)T[w]=T[2*w+1]<<16|T[2*w];for(w=_;w<2*_;w++)T[w]=0;return new o(T,0)};function x(w,_){for(;(w[_]&65535)!=w[_];)w[_+1]+=w[_]>>>16,w[_]&=65535,_++}function q(w,_){this.g=w,this.h=_}function at(w,_){if(S(_))throw Error("division by zero");if(S(w))return new q(p,p);if(k(w))return _=at(V(w),_),new q(V(_.g),V(_.h));if(k(_))return _=at(w,V(_)),new q(V(_.g),_.h);if(w.g.length>30){if(k(w)||k(_))throw Error("slowDivide_ only works with positive integers.");for(var T=m,I=_;I.l(w)<=0;)T=Bt(T),I=Bt(I);var E=gt(T,1),b=gt(I,1);for(I=gt(I,2),T=gt(T,2);!S(I);){var y=b.add(I);y.l(w)<=0&&(E=E.add(T),b=y),I=gt(I,1),T=gt(T,1)}return _=L(w,E.j(_)),new q(E,_)}for(E=p;w.l(_)>=0;){for(T=Math.max(1,Math.floor(w.m()/_.m())),I=Math.ceil(Math.log(T)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),b=h(T),y=b.j(_);k(y)||y.l(w)>0;)T-=I,b=h(T),y=b.j(_);S(b)&&(b=m),E=E.add(b),w=L(w,y)}return new q(E,w)}n.B=function(w){return at(this,w).h},n.and=function(w){const _=Math.max(this.g.length,w.g.length),T=[];for(let I=0;I<_;I++)T[I]=this.i(I)&w.i(I);return new o(T,this.h&w.h)},n.or=function(w){const _=Math.max(this.g.length,w.g.length),T=[];for(let I=0;I<_;I++)T[I]=this.i(I)|w.i(I);return new o(T,this.h|w.h)},n.xor=function(w){const _=Math.max(this.g.length,w.g.length),T=[];for(let I=0;I<_;I++)T[I]=this.i(I)^w.i(I);return new o(T,this.h^w.h)};function Bt(w){const _=w.g.length+1,T=[];for(let I=0;I<_;I++)T[I]=w.i(I)<<1|w.i(I-1)>>>31;return new o(T,w.h)}function gt(w,_){const T=_>>5;_%=32;const I=w.g.length-T,E=[];for(let b=0;b<I;b++)E[b]=_>0?w.i(b+T)>>>_|w.i(b+T+1)<<32-_:w.i(b+T);return new o(E,w.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,ep=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,$e=o}).apply(typeof Dl<"u"?Dl:typeof self<"u"?self:typeof window<"u"?window:{});var Ds=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var np,vr,rp,$s,oa,sp,ip,op;(function(){var n,t=Object.defineProperty;function e(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ds=="object"&&Ds];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=e(this);function s(a,l){if(l)t:{var d=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var v=a[g];if(!(v in d))break t;d=d[v]}a=a[a.length-1],g=d[a],l=l(g),l!=g&&l!=null&&t(d,a,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(l){var d=[],g;for(g in l)Object.prototype.hasOwnProperty.call(l,g)&&d.push([g,l[g]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function u(a,l,d){return a.call.apply(a.bind,arguments)}function h(a,l,d){return h=u,h.apply(null,arguments)}function f(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var g=d.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function p(a,l){function d(){}d.prototype=l.prototype,a.Z=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(g,v,C){for(var D=Array(arguments.length-2),H=2;H<arguments.length;H++)D[H-2]=arguments[H];return l.prototype[v].apply(g,D)}}var m=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function A(a){const l=a.length;if(l>0){const d=Array(l);for(let g=0;g<l;g++)d[g]=a[g];return d}return[]}function S(a,l){for(let g=1;g<arguments.length;g++){const v=arguments[g];var d=typeof v;if(d=d!="object"?d:v?Array.isArray(v)?"array":d:"null",d=="array"||d=="object"&&typeof v.length=="number"){d=a.length||0;const C=v.length||0;a.length=d+C;for(let D=0;D<C;D++)a[d+D]=v[D]}else a.push(v)}}class k{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function V(a){o.setTimeout(()=>{throw a},0)}function L(){var a=w;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class x{constructor(){this.h=this.g=null}add(l,d){const g=q.get();g.set(l,d),this.h?this.h.next=g:this.g=g,this.h=g}}var q=new k(()=>new at,a=>a.reset());class at{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Bt,gt=!1,w=new x,_=()=>{const a=Promise.resolve(void 0);Bt=()=>{a.then(T)}};function T(){for(var a;a=L();){try{a.h.call(a.g)}catch(d){V(d)}var l=q;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}gt=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var b=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,l),o.removeEventListener("test",d,l)}catch{}return a})();function y(a){return/^[\s\xa0]*$/.test(a)}function xt(a,l){E.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}p(xt,E),xt.prototype.init=function(a,l){const d=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&xt.Z.h.call(this)},xt.prototype.h=function(){xt.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var nn="closure_listenable_"+(Math.random()*1e6|0),Lg=0;function xg(a,l,d,g,v){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!g,this.ha=v,this.key=++Lg,this.da=this.fa=!1}function ms(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function _s(a,l,d){for(const g in a)l.call(d,a[g],g,a)}function Fg(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function xc(a){const l={};for(const d in a)l[d]=a[d];return l}const Fc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Uc(a,l){let d,g;for(let v=1;v<arguments.length;v++){g=arguments[v];for(d in g)a[d]=g[d];for(let C=0;C<Fc.length;C++)d=Fc[C],Object.prototype.hasOwnProperty.call(g,d)&&(a[d]=g[d])}}function ys(a){this.src=a,this.g={},this.h=0}ys.prototype.add=function(a,l,d,g,v){const C=a.toString();a=this.g[C],a||(a=this.g[C]=[],this.h++);const D=io(a,l,g,v);return D>-1?(l=a[D],d||(l.fa=!1)):(l=new xg(l,this.src,C,!!g,v),l.fa=d,a.push(l)),l};function so(a,l){const d=l.type;if(d in a.g){var g=a.g[d],v=Array.prototype.indexOf.call(g,l,void 0),C;(C=v>=0)&&Array.prototype.splice.call(g,v,1),C&&(ms(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function io(a,l,d,g){for(let v=0;v<a.length;++v){const C=a[v];if(!C.da&&C.listener==l&&C.capture==!!d&&C.ha==g)return v}return-1}var oo="closure_lm_"+(Math.random()*1e6|0),ao={};function Bc(a,l,d,g,v){if(Array.isArray(l)){for(let C=0;C<l.length;C++)Bc(a,l[C],d,g,v);return null}return d=qc(d),a&&a[nn]?a.J(l,d,c(g)?!!g.capture:!1,v):Ug(a,l,d,!1,g,v)}function Ug(a,l,d,g,v,C){if(!l)throw Error("Invalid event type");const D=c(v)?!!v.capture:!!v;let H=uo(a);if(H||(a[oo]=H=new ys(a)),d=H.add(l,d,g,D,C),d.proxy)return d;if(g=Bg(),d.proxy=g,g.src=a,g.listener=d,a.addEventListener)b||(v=D),v===void 0&&(v=!1),a.addEventListener(l.toString(),g,v);else if(a.attachEvent)a.attachEvent($c(l.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Bg(){function a(d){return l.call(a.src,a.listener,d)}const l=jg;return a}function jc(a,l,d,g,v){if(Array.isArray(l))for(var C=0;C<l.length;C++)jc(a,l[C],d,g,v);else g=c(g)?!!g.capture:!!g,d=qc(d),a&&a[nn]?(a=a.i,C=String(l).toString(),C in a.g&&(l=a.g[C],d=io(l,d,g,v),d>-1&&(ms(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete a.g[C],a.h--)))):a&&(a=uo(a))&&(l=a.g[l.toString()],a=-1,l&&(a=io(l,d,g,v)),(d=a>-1?l[a]:null)&&co(d))}function co(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[nn])so(l.i,a);else{var d=a.type,g=a.proxy;l.removeEventListener?l.removeEventListener(d,g,a.capture):l.detachEvent?l.detachEvent($c(d),g):l.addListener&&l.removeListener&&l.removeListener(g),(d=uo(l))?(so(d,a),d.h==0&&(d.src=null,l[oo]=null)):ms(a)}}}function $c(a){return a in ao?ao[a]:ao[a]="on"+a}function jg(a,l){if(a.da)a=!0;else{l=new xt(l,this);const d=a.listener,g=a.ha||a.src;a.fa&&co(a),a=d.call(g,l)}return a}function uo(a){return a=a[oo],a instanceof ys?a:null}var lo="__closure_events_fn_"+(Math.random()*1e9>>>0);function qc(a){return typeof a=="function"?a:(a[lo]||(a[lo]=function(l){return a.handleEvent(l)}),a[lo])}function St(){I.call(this),this.i=new ys(this),this.M=this,this.G=null}p(St,I),St.prototype[nn]=!0,St.prototype.removeEventListener=function(a,l,d,g){jc(this,a,l,d,g)};function Ot(a,l){var d,g=a.G;if(g)for(d=[];g;g=g.G)d.push(g);if(a=a.M,g=l.type||l,typeof l=="string")l=new E(l,a);else if(l instanceof E)l.target=l.target||a;else{var v=l;l=new E(g,a),Uc(l,v)}v=!0;let C,D;if(d)for(D=d.length-1;D>=0;D--)C=l.g=d[D],v=Ts(C,g,!0,l)&&v;if(C=l.g=a,v=Ts(C,g,!0,l)&&v,v=Ts(C,g,!1,l)&&v,d)for(D=0;D<d.length;D++)C=l.g=d[D],v=Ts(C,g,!1,l)&&v}St.prototype.N=function(){if(St.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const d=a.g[l];for(let g=0;g<d.length;g++)ms(d[g]);delete a.g[l],a.h--}}this.G=null},St.prototype.J=function(a,l,d,g){return this.i.add(String(a),l,!1,d,g)},St.prototype.K=function(a,l,d,g){return this.i.add(String(a),l,!0,d,g)};function Ts(a,l,d,g){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let v=!0;for(let C=0;C<l.length;++C){const D=l[C];if(D&&!D.da&&D.capture==d){const H=D.listener,mt=D.ha||D.src;D.fa&&so(a.i,D),v=H.call(mt,g)!==!1&&v}}return v&&!g.defaultPrevented}function $g(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function Hc(a){a.g=$g(()=>{a.g=null,a.i&&(a.i=!1,Hc(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class qg extends I{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Hc(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function cr(a){I.call(this),this.h=a,this.g={}}p(cr,I);var zc=[];function Wc(a){_s(a.g,function(l,d){this.g.hasOwnProperty(d)&&co(l)},a),a.g={}}cr.prototype.N=function(){cr.Z.N.call(this),Wc(this)},cr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ho=o.JSON.stringify,Hg=o.JSON.parse,zg=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Jc(){}function Gc(){}var ur={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function fo(){E.call(this,"d")}p(fo,E);function po(){E.call(this,"c")}p(po,E);var rn={},Kc=null;function Es(){return Kc=Kc||new St}rn.Ia="serverreachability";function Qc(a){E.call(this,rn.Ia,a)}p(Qc,E);function lr(a){const l=Es();Ot(l,new Qc(l))}rn.STAT_EVENT="statevent";function Xc(a,l){E.call(this,rn.STAT_EVENT,a),this.stat=l}p(Xc,E);function Mt(a){const l=Es();Ot(l,new Xc(l,a))}rn.Ja="timingevent";function Yc(a,l){E.call(this,rn.Ja,a),this.size=l}p(Yc,E);function hr(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function dr(){this.g=!0}dr.prototype.ua=function(){this.g=!1};function Wg(a,l,d,g,v,C){a.info(function(){if(a.g)if(C){var D="",H=C.split("&");for(let tt=0;tt<H.length;tt++){var mt=H[tt].split("=");if(mt.length>1){const Tt=mt[0];mt=mt[1];const se=Tt.split("_");D=se.length>=2&&se[1]=="type"?D+(Tt+"="+mt+"&"):D+(Tt+"=redacted&")}}}else D=null;else D=C;return"XMLHTTP REQ ("+g+") [attempt "+v+"]: "+l+`
`+d+`
`+D})}function Jg(a,l,d,g,v,C,D){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+v+"]: "+l+`
`+d+`
`+C+" "+D})}function wn(a,l,d,g){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Kg(a,d)+(g?" "+g:"")})}function Gg(a,l){a.info(function(){return"TIMEOUT: "+l})}dr.prototype.info=function(){};function Kg(a,l){if(!a.g)return l;if(!l)return null;try{const C=JSON.parse(l);if(C){for(a=0;a<C.length;a++)if(Array.isArray(C[a])){var d=C[a];if(!(d.length<2)){var g=d[1];if(Array.isArray(g)&&!(g.length<1)){var v=g[0];if(v!="noop"&&v!="stop"&&v!="close")for(let D=1;D<g.length;D++)g[D]=""}}}}return ho(C)}catch{return l}}var ws={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Zc={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},tu;function go(){}p(go,Jc),go.prototype.g=function(){return new XMLHttpRequest},tu=new go;function fr(a){return encodeURIComponent(String(a))}function Qg(a){var l=1;a=a.split(":");const d=[];for(;l>0&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function Ce(a,l,d,g){this.j=a,this.i=l,this.l=d,this.S=g||1,this.V=new cr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new eu}function eu(){this.i=null,this.g="",this.h=!1}var nu={},mo={};function _o(a,l,d){a.M=1,a.A=As(re(l)),a.u=d,a.R=!0,ru(a,null)}function ru(a,l){a.F=Date.now(),Is(a),a.B=re(a.A);var d=a.B,g=a.S;Array.isArray(g)||(g=[String(g)]),mu(d.i,"t",g),a.C=0,d=a.j.L,a.h=new eu,a.g=Ou(a.j,d?l:null,!a.u),a.P>0&&(a.O=new qg(h(a.Y,a,a.g),a.P)),l=a.V,d=a.g,g=a.ba;var v="readystatechange";Array.isArray(v)||(v&&(zc[0]=v.toString()),v=zc);for(let C=0;C<v.length;C++){const D=Bc(d,v[C],g||l.handleEvent,!1,l.h||l);if(!D)break;l.g[D.key]=D}l=a.J?xc(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),lr(),Wg(a.i,a.v,a.B,a.l,a.S,a.u)}Ce.prototype.ba=function(a){a=a.target;const l=this.O;l&&Pe(a)==3?l.j():this.Y(a)},Ce.prototype.Y=function(a){try{if(a==this.g)t:{const H=Pe(this.g),mt=this.g.ya(),tt=this.g.ca();if(!(H<3)&&(H!=3||this.g&&(this.h.h||this.g.la()||Au(this.g)))){this.K||H!=4||mt==7||(mt==8||tt<=0?lr(3):lr(2)),yo(this);var l=this.g.ca();this.X=l;var d=Xg(this);if(this.o=l==200,Jg(this.i,this.v,this.B,this.l,this.S,H,l),this.o){if(this.U&&!this.L){e:{if(this.g){var g,v=this.g;if((g=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(g)){var C=g;break e}}C=null}if(a=C)wn(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,To(this,a);else{this.o=!1,this.m=3,Mt(12),sn(this),pr(this);break t}}if(this.R){a=!0;let Tt;for(;!this.K&&this.C<d.length;)if(Tt=Yg(this,d),Tt==mo){H==4&&(this.m=4,Mt(14),a=!1),wn(this.i,this.l,null,"[Incomplete Response]");break}else if(Tt==nu){this.m=4,Mt(15),wn(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else wn(this.i,this.l,Tt,null),To(this,Tt);if(su(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),H!=4||d.length!=0||this.h.h||(this.m=1,Mt(16),a=!1),this.o=this.o&&a,!a)wn(this.i,this.l,d,"[Invalid Chunked Response]"),sn(this),pr(this);else if(d.length>0&&!this.W){this.W=!0;var D=this.j;D.g==this&&D.aa&&!D.P&&(D.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),So(D),D.P=!0,Mt(11))}}else wn(this.i,this.l,d,null),To(this,d);H==4&&sn(this),this.o&&!this.K&&(H==4?ku(this.j,this):(this.o=!1,Is(this)))}else dm(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,Mt(12)):(this.m=0,Mt(13)),sn(this),pr(this)}}}catch{}finally{}};function Xg(a){if(!su(a))return a.g.la();const l=Au(a.g);if(l==="")return"";let d="";const g=l.length,v=Pe(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return sn(a),pr(a),"";a.h.i=new o.TextDecoder}for(let C=0;C<g;C++)a.h.h=!0,d+=a.h.i.decode(l[C],{stream:!(v&&C==g-1)});return l.length=0,a.h.g+=d,a.C=0,a.h.g}function su(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Yg(a,l){var d=a.C,g=l.indexOf(`
`,d);return g==-1?mo:(d=Number(l.substring(d,g)),isNaN(d)?nu:(g+=1,g+d>l.length?mo:(l=l.slice(g,g+d),a.C=g+d,l)))}Ce.prototype.cancel=function(){this.K=!0,sn(this)};function Is(a){a.T=Date.now()+a.H,iu(a,a.H)}function iu(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=hr(h(a.aa,a),l)}function yo(a){a.D&&(o.clearTimeout(a.D),a.D=null)}Ce.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(Gg(this.i,this.B),this.M!=2&&(lr(),Mt(17)),sn(this),this.m=2,pr(this)):iu(this,this.T-a)};function pr(a){a.j.I==0||a.K||ku(a.j,a)}function sn(a){yo(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,Wc(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function To(a,l){try{var d=a.j;if(d.I!=0&&(d.g==a||Eo(d.h,a))){if(!a.L&&Eo(d.h,a)&&d.I==3){try{var g=d.Ba.g.parse(l)}catch{g=null}if(Array.isArray(g)&&g.length==3){var v=g;if(v[0]==0){t:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)Rs(d),Cs(d);else break t;Co(d),Mt(18)}}else d.xa=v[1],0<d.xa-d.K&&v[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=hr(h(d.Va,d),6e3));cu(d.h)<=1&&d.ta&&(d.ta=void 0)}else an(d,11)}else if((a.L||d.g==a)&&Rs(d),!y(l))for(v=d.Ba.g.parse(l),l=0;l<v.length;l++){let tt=v[l];const Tt=tt[0];if(!(Tt<=d.K))if(d.K=Tt,tt=tt[1],d.I==2)if(tt[0]=="c"){d.M=tt[1],d.ba=tt[2];const se=tt[3];se!=null&&(d.ka=se,d.j.info("VER="+d.ka));const cn=tt[4];cn!=null&&(d.za=cn,d.j.info("SVER="+d.za));const ke=tt[5];ke!=null&&typeof ke=="number"&&ke>0&&(g=1.5*ke,d.O=g,d.j.info("backChannelRequestTimeoutMs_="+g)),g=d;const Ve=a.g;if(Ve){const ks=Ve.g?Ve.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ks){var C=g.h;C.g||ks.indexOf("spdy")==-1&&ks.indexOf("quic")==-1&&ks.indexOf("h2")==-1||(C.j=C.l,C.g=new Set,C.h&&(wo(C,C.h),C.h=null))}if(g.G){const Ro=Ve.g?Ve.g.getResponseHeader("X-HTTP-Session-Id"):null;Ro&&(g.wa=Ro,nt(g.J,g.G,Ro))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),g=d;var D=a;if(g.na=Nu(g,g.L?g.ba:null,g.W),D.L){uu(g.h,D);var H=D,mt=g.O;mt&&(H.H=mt),H.D&&(yo(H),Is(H)),g.g=D}else Ru(g);d.i.length>0&&Ss(d)}else tt[0]!="stop"&&tt[0]!="close"||an(d,7);else d.I==3&&(tt[0]=="stop"||tt[0]=="close"?tt[0]=="stop"?an(d,7):bo(d):tt[0]!="noop"&&d.l&&d.l.qa(tt),d.A=0)}}lr(4)}catch{}}var Zg=class{constructor(a,l){this.g=a,this.map=l}};function ou(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function au(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function cu(a){return a.h?1:a.g?a.g.size:0}function Eo(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function wo(a,l){a.g?a.g.add(l):a.h=l}function uu(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}ou.prototype.cancel=function(){if(this.i=lu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function lu(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.G);return l}return A(a.i)}var hu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function tm(a,l){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const g=a[d].indexOf("=");let v,C=null;g>=0?(v=a[d].substring(0,g),C=a[d].substring(g+1)):v=a[d],l(v,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function Se(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof Se?(this.l=a.l,gr(this,a.j),this.o=a.o,this.g=a.g,mr(this,a.u),this.h=a.h,Io(this,_u(a.i)),this.m=a.m):a&&(l=String(a).match(hu))?(this.l=!1,gr(this,l[1]||"",!0),this.o=_r(l[2]||""),this.g=_r(l[3]||"",!0),mr(this,l[4]),this.h=_r(l[5]||"",!0),Io(this,l[6]||"",!0),this.m=_r(l[7]||"")):(this.l=!1,this.i=new Tr(null,this.l))}Se.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(yr(l,du,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(yr(l,du,!0),"@"),a.push(fr(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(yr(d,d.charAt(0)=="/"?rm:nm,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",yr(d,im)),a.join("")},Se.prototype.resolve=function(a){const l=re(this);let d=!!a.j;d?gr(l,a.j):d=!!a.o,d?l.o=a.o:d=!!a.g,d?l.g=a.g:d=a.u!=null;var g=a.h;if(d)mr(l,a.u);else if(d=!!a.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var v=l.h.lastIndexOf("/");v!=-1&&(g=l.h.slice(0,v+1)+g)}if(v=g,v==".."||v==".")g="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){g=v.lastIndexOf("/",0)==0,v=v.split("/");const C=[];for(let D=0;D<v.length;){const H=v[D++];H=="."?g&&D==v.length&&C.push(""):H==".."?((C.length>1||C.length==1&&C[0]!="")&&C.pop(),g&&D==v.length&&C.push("")):(C.push(H),g=!0)}g=C.join("/")}else g=v}return d?l.h=g:d=a.i.toString()!=="",d?Io(l,_u(a.i)):d=!!a.m,d&&(l.m=a.m),l};function re(a){return new Se(a)}function gr(a,l,d){a.j=d?_r(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function mr(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function Io(a,l,d){l instanceof Tr?(a.i=l,om(a.i,a.l)):(d||(l=yr(l,sm)),a.i=new Tr(l,a.l))}function nt(a,l,d){a.i.set(l,d)}function As(a){return nt(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function _r(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function yr(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,em),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function em(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var du=/[#\/\?@]/g,nm=/[#\?:]/g,rm=/[#\?]/g,sm=/[#\?@]/g,im=/#/g;function Tr(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function on(a){a.g||(a.g=new Map,a.h=0,a.i&&tm(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}n=Tr.prototype,n.add=function(a,l){on(this),this.i=null,a=In(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function fu(a,l){on(a),l=In(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function pu(a,l){return on(a),l=In(a,l),a.g.has(l)}n.forEach=function(a,l){on(this),this.g.forEach(function(d,g){d.forEach(function(v){a.call(l,v,g,this)},this)},this)};function gu(a,l){on(a);let d=[];if(typeof l=="string")pu(a,l)&&(d=d.concat(a.g.get(In(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)d=d.concat(a[l]);return d}n.set=function(a,l){return on(this),this.i=null,a=In(this,a),pu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},n.get=function(a,l){return a?(a=gu(this,a),a.length>0?String(a[0]):l):l};function mu(a,l,d){fu(a,l),d.length>0&&(a.i=null,a.g.set(In(a,l),A(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let g=0;g<l.length;g++){var d=l[g];const v=fr(d);d=gu(this,d);for(let C=0;C<d.length;C++){let D=v;d[C]!==""&&(D+="="+fr(d[C])),a.push(D)}}return this.i=a.join("&")};function _u(a){const l=new Tr;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function In(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function om(a,l){l&&!a.j&&(on(a),a.i=null,a.g.forEach(function(d,g){const v=g.toLowerCase();g!=v&&(fu(this,g),mu(this,v,d))},a)),a.j=l}function am(a,l){const d=new dr;if(o.Image){const g=new Image;g.onload=f(Re,d,"TestLoadImage: loaded",!0,l,g),g.onerror=f(Re,d,"TestLoadImage: error",!1,l,g),g.onabort=f(Re,d,"TestLoadImage: abort",!1,l,g),g.ontimeout=f(Re,d,"TestLoadImage: timeout",!1,l,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else l(!1)}function cm(a,l){const d=new dr,g=new AbortController,v=setTimeout(()=>{g.abort(),Re(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:g.signal}).then(C=>{clearTimeout(v),C.ok?Re(d,"TestPingServer: ok",!0,l):Re(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(v),Re(d,"TestPingServer: error",!1,l)})}function Re(a,l,d,g,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),g(d)}catch{}}function um(){this.g=new zg}function Ao(a){this.i=a.Sb||null,this.h=a.ab||!1}p(Ao,Jc),Ao.prototype.g=function(){return new vs(this.i,this.h)};function vs(a,l){St.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(vs,St),n=vs.prototype,n.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,wr(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Er(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,wr(this)),this.g&&(this.readyState=3,wr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;yu(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function yu(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?Er(this):wr(this),this.readyState==3&&yu(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,Er(this))},n.Na=function(a){this.g&&(this.response=a,Er(this))},n.ga=function(){this.g&&Er(this)};function Er(a){a.readyState=4,a.l=null,a.j=null,a.B=null,wr(a)}n.setRequestHeader=function(a,l){this.A.append(a,l)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function wr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(vs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Tu(a){let l="";return _s(a,function(d,g){l+=g,l+=":",l+=d,l+=`\r
`}),l}function vo(a,l,d){t:{for(g in d){var g=!1;break t}g=!0}g||(d=Tu(d),typeof a=="string"?d!=null&&fr(d):nt(a,l,d))}function ct(a){St.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(ct,St);var lm=/^https?$/i,hm=["POST","PUT"];n=ct.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,l,d,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():tu.g(),this.g.onreadystatechange=m(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(C){Eu(this,C);return}if(a=d||"",d=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var v in g)d.set(v,g[v]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const C of g.keys())d.set(C,g.get(C));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(d.keys()).find(C=>C.toLowerCase()=="content-type"),v=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(hm,l,void 0)>=0)||g||v||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[C,D]of d)this.g.setRequestHeader(C,D);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(C){Eu(this,C)}};function Eu(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,wu(a),bs(a)}function wu(a){a.A||(a.A=!0,Ot(a,"complete"),Ot(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Ot(this,"complete"),Ot(this,"abort"),bs(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),bs(this,!0)),ct.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Iu(this):this.Xa())},n.Xa=function(){Iu(this)};function Iu(a){if(a.h&&typeof i<"u"){if(a.v&&Pe(a)==4)setTimeout(a.Ca.bind(a),0);else if(Ot(a,"readystatechange"),Pe(a)==4){a.h=!1;try{const C=a.ca();t:switch(C){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break t;default:l=!1}var d;if(!(d=l)){var g;if(g=C===0){let D=String(a.D).match(hu)[1]||null;!D&&o.self&&o.self.location&&(D=o.self.location.protocol.slice(0,-1)),g=!lm.test(D?D.toLowerCase():"")}d=g}if(d)Ot(a,"complete"),Ot(a,"success");else{a.o=6;try{var v=Pe(a)>2?a.g.statusText:""}catch{v=""}a.l=v+" ["+a.ca()+"]",wu(a)}}finally{bs(a)}}}}function bs(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,l||Ot(a,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Pe(a){return a.g?a.g.readyState:0}n.ca=function(){try{return Pe(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),Hg(l)}};function Au(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function dm(a){const l={};a=(a.g&&Pe(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(y(a[g]))continue;var d=Qg(a[g]);const v=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const C=l[v]||[];l[v]=C,C.push(d)}Fg(l,function(g){return g.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ir(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function vu(a){this.za=0,this.i=[],this.j=new dr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Ir("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Ir("baseRetryDelayMs",5e3,a),this.Za=Ir("retryDelaySeedMs",1e4,a),this.Ta=Ir("forwardChannelMaxRetries",2,a),this.va=Ir("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new ou(a&&a.concurrentRequestLimit),this.Ba=new um,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=vu.prototype,n.ka=8,n.I=1,n.connect=function(a,l,d,g){Mt(0),this.W=a,this.H=l||{},d&&g!==void 0&&(this.H.OSID=d,this.H.OAID=g),this.F=this.X,this.J=Nu(this,null,this.W),Ss(this)};function bo(a){if(bu(a),a.I==3){var l=a.V++,d=re(a.J);if(nt(d,"SID",a.M),nt(d,"RID",l),nt(d,"TYPE","terminate"),Ar(a,d),l=new Ce(a,a.j,l),l.M=2,l.A=As(re(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=l.A,d=!0),d||(l.g=Ou(l.j,null),l.g.ea(l.A)),l.F=Date.now(),Is(l)}Du(a)}function Cs(a){a.g&&(So(a),a.g.cancel(),a.g=null)}function bu(a){Cs(a),a.v&&(o.clearTimeout(a.v),a.v=null),Rs(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Ss(a){if(!au(a.h)&&!a.m){a.m=!0;var l=a.Ea;Bt||_(),gt||(Bt(),gt=!0),w.add(l,a),a.D=0}}function fm(a,l){return cu(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=hr(h(a.Ea,a,l),Vu(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const v=new Ce(this,this.j,a);let C=this.o;if(this.U&&(C?(C=xc(C),Uc(C,this.U)):C=this.U),this.u!==null||this.R||(v.J=C,C=null),this.S)t:{for(var l=0,d=0;d<this.i.length;d++){e:{var g=this.i[d];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break e}g=void 0}if(g===void 0)break;if(l+=g,l>4096){l=d;break t}if(l===4096||d===this.i.length-1){l=d+1;break t}}l=1e3}else l=1e3;l=Su(this,v,l),d=re(this.J),nt(d,"RID",a),nt(d,"CVER",22),this.G&&nt(d,"X-HTTP-Session-Id",this.G),Ar(this,d),C&&(this.R?l="headers="+fr(Tu(C))+"&"+l:this.u&&vo(d,this.u,C)),wo(this.h,v),this.Ra&&nt(d,"TYPE","init"),this.S?(nt(d,"$req",l),nt(d,"SID","null"),v.U=!0,_o(v,d,null)):_o(v,d,l),this.I=2}}else this.I==3&&(a?Cu(this,a):this.i.length==0||au(this.h)||Cu(this))};function Cu(a,l){var d;l?d=l.l:d=a.V++;const g=re(a.J);nt(g,"SID",a.M),nt(g,"RID",d),nt(g,"AID",a.K),Ar(a,g),a.u&&a.o&&vo(g,a.u,a.o),d=new Ce(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),l&&(a.i=l.G.concat(a.i)),l=Su(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),wo(a.h,d),_o(d,g,l)}function Ar(a,l){a.H&&_s(a.H,function(d,g){nt(l,g,d)}),a.l&&_s({},function(d,g){nt(l,g,d)})}function Su(a,l,d){d=Math.min(a.i.length,d);const g=a.l?h(a.l.Ka,a.l,a):null;t:{var v=a.i;let H=-1;for(;;){const mt=["count="+d];H==-1?d>0?(H=v[0].g,mt.push("ofs="+H)):H=0:mt.push("ofs="+H);let tt=!0;for(let Tt=0;Tt<d;Tt++){var C=v[Tt].g;const se=v[Tt].map;if(C-=H,C<0)H=Math.max(0,v[Tt].g-100),tt=!1;else try{C="req"+C+"_"||"";try{var D=se instanceof Map?se:Object.entries(se);for(const[cn,ke]of D){let Ve=ke;c(ke)&&(Ve=ho(ke)),mt.push(C+cn+"="+encodeURIComponent(Ve))}}catch(cn){throw mt.push(C+"type="+encodeURIComponent("_badmap")),cn}}catch{g&&g(se)}}if(tt){D=mt.join("&");break t}}D=void 0}return a=a.i.splice(0,d),l.G=a,D}function Ru(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;Bt||_(),gt||(Bt(),gt=!0),w.add(l,a),a.A=0}}function Co(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=hr(h(a.Da,a),Vu(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,Pu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=hr(h(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Mt(10),Cs(this),Pu(this))};function So(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Pu(a){a.g=new Ce(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=re(a.na);nt(l,"RID","rpc"),nt(l,"SID",a.M),nt(l,"AID",a.K),nt(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&nt(l,"TO",a.ia),nt(l,"TYPE","xmlhttp"),Ar(a,l),a.u&&a.o&&vo(l,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=As(re(l)),d.u=null,d.R=!0,ru(d,a)}n.Va=function(){this.C!=null&&(this.C=null,Cs(this),Co(this),Mt(19))};function Rs(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function ku(a,l){var d=null;if(a.g==l){Rs(a),So(a),a.g=null;var g=2}else if(Eo(a.h,l))d=l.G,uu(a.h,l),g=1;else return;if(a.I!=0){if(l.o)if(g==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var v=a.D;g=Es(),Ot(g,new Yc(g,d)),Ss(a)}else Ru(a);else if(v=l.m,v==3||v==0&&l.X>0||!(g==1&&fm(a,l)||g==2&&Co(a)))switch(d&&d.length>0&&(l=a.h,l.i=l.i.concat(d)),v){case 1:an(a,5);break;case 4:an(a,10);break;case 3:an(a,6);break;default:an(a,2)}}}function Vu(a,l){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*l}function an(a,l){if(a.j.info("Error code "+l),l==2){var d=h(a.bb,a),g=a.Ua;const v=!g;g=new Se(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||gr(g,"https"),As(g),v?am(g.toString(),d):cm(g.toString(),d)}else Mt(2);a.I=0,a.l&&a.l.pa(l),Du(a),bu(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Mt(2)):(this.j.info("Failed to ping google.com"),Mt(1))};function Du(a){if(a.I=0,a.ja=[],a.l){const l=lu(a.h);(l.length!=0||a.i.length!=0)&&(S(a.ja,l),S(a.ja,a.i),a.h.i.length=0,A(a.i),a.i.length=0),a.l.oa()}}function Nu(a,l,d){var g=d instanceof Se?re(d):new Se(d);if(g.g!="")l&&(g.g=l+"."+g.g),mr(g,g.u);else{var v=o.location;g=v.protocol,l=l?l+"."+v.hostname:v.hostname,v=+v.port;const C=new Se(null);g&&gr(C,g),l&&(C.g=l),v&&mr(C,v),d&&(C.h=d),g=C}return d=a.G,l=a.wa,d&&l&&nt(g,d,l),nt(g,"VER",a.ka),Ar(a,g),g}function Ou(a,l,d){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new ct(new Ao({ab:d})):new ct(a.ma),l.Fa(a.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Mu(){}n=Mu.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Ps(){}Ps.prototype.g=function(a,l){return new jt(a,l)};function jt(a,l){St.call(this),this.g=new vu(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!y(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!y(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new An(this)}p(jt,St),jt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},jt.prototype.close=function(){bo(this.g)},jt.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=ho(a),a=d);l.i.push(new Zg(l.Ya++,a)),l.I==3&&Ss(l)},jt.prototype.N=function(){this.g.l=null,delete this.j,bo(this.g),delete this.g,jt.Z.N.call(this)};function Lu(a){fo.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){t:{for(const d in l){a=d;break t}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}p(Lu,fo);function xu(){po.call(this),this.status=1}p(xu,po);function An(a){this.g=a}p(An,Mu),An.prototype.ra=function(){Ot(this.g,"a")},An.prototype.qa=function(a){Ot(this.g,new Lu(a))},An.prototype.pa=function(a){Ot(this.g,new xu)},An.prototype.oa=function(){Ot(this.g,"b")},Ps.prototype.createWebChannel=Ps.prototype.g,jt.prototype.send=jt.prototype.o,jt.prototype.open=jt.prototype.m,jt.prototype.close=jt.prototype.close,op=function(){return new Ps},ip=function(){return Es()},sp=rn,oa={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},ws.NO_ERROR=0,ws.TIMEOUT=8,ws.HTTP_ERROR=6,$s=ws,Zc.COMPLETE="complete",rp=Zc,Gc.EventType=ur,ur.OPEN="a",ur.CLOSE="b",ur.ERROR="c",ur.MESSAGE="d",St.prototype.listen=St.prototype.J,vr=Gc,ct.prototype.listenOnce=ct.prototype.K,ct.prototype.getLastError=ct.prototype.Ha,ct.prototype.getLastErrorCode=ct.prototype.ya,ct.prototype.getStatus=ct.prototype.ca,ct.prototype.getResponseJson=ct.prototype.La,ct.prototype.getResponseText=ct.prototype.la,ct.prototype.send=ct.prototype.ea,ct.prototype.setWithCredentials=ct.prototype.Fa,np=ct}).apply(typeof Ds<"u"?Ds:typeof self<"u"?self:typeof window<"u"?window:{});const Nl="@firebase/firestore",Ol="4.9.3";/**
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
 */class Pt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Pt.UNAUTHENTICATED=new Pt(null),Pt.GOOGLE_CREDENTIALS=new Pt("google-credentials-uid"),Pt.FIRST_PARTY=new Pt("first-party-uid"),Pt.MOCK_USER=new Pt("mock-user");/**
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
 */let nr="12.7.0";/**
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
 */const mn=new Ua("@firebase/firestore");function Sn(){return mn.logLevel}function N(n,...t){if(mn.logLevel<=z.DEBUG){const e=t.map(Za);mn.debug(`Firestore (${nr}): ${n}`,...e)}}function Ae(n,...t){if(mn.logLevel<=z.ERROR){const e=t.map(Za);mn.error(`Firestore (${nr}): ${n}`,...e)}}function $n(n,...t){if(mn.logLevel<=z.WARN){const e=t.map(Za);mn.warn(`Firestore (${nr}): ${n}`,...e)}}function Za(n){if(typeof n=="string")return n;try{/**
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
 */function F(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,ap(n,r,e)}function ap(n,t,e){let r=`FIRESTORE (${nr}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Ae(r),new Error(r)}function K(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||ap(t,s,r)}function $(n,t){return n}/**
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
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class O extends be{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class ye{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
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
 */class cp{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class iv{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(Pt.UNAUTHENTICATED)))}shutdown(){}}class ov{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class av{constructor(t){this.t=t,this.currentUser=Pt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){K(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,e(u)):Promise.resolve();let i=new ye;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new ye,t.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;t.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new ye)}}),0),o()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((r=>this.i!==t?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(K(typeof r.accessToken=="string",31837,{l:r}),new cp(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return K(t===null||typeof t=="string",2055,{h:t}),new Pt(t)}}class cv{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=Pt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class uv{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new cv(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(Pt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Ml{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class lv{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Jt(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){K(this.o===void 0,3512);const r=i=>{i.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,N("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable((()=>r(i)))};const s=i=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Ml(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(K(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Ml(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function hv(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
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
 */class tc{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=hv(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<e&&(r+=t.charAt(s[i]%62))}return r}}function W(n,t){return n<t?-1:n>t?1:0}function aa(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),i=t.charAt(r);if(s!==i)return Bo(s)===Bo(i)?W(s,i):Bo(s)?1:-1}return W(n.length,t.length)}const dv=55296,fv=57343;function Bo(n){const t=n.charCodeAt(0);return t>=dv&&t<=fv}function qn(n,t,e){return n.length===t.length&&n.every(((r,s)=>e(r,t[s])))}/**
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
 */const Ll="__name__";class ie{constructor(t,e,r){e===void 0?e=0:e>t.length&&F(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&F(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return ie.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof ie?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const i=ie.compareSegments(t.get(s),e.get(s));if(i!==0)return i}return W(t.length,e.length)}static compareSegments(t,e){const r=ie.isNumericId(t),s=ie.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?ie.extractNumericId(t).compare(ie.extractNumericId(e)):aa(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return $e.fromString(t.substring(4,t.length-2))}}class rt extends ie{construct(t,e,r){return new rt(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new O(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((s=>s.length>0)))}return new rt(e)}static emptyPath(){return new rt([])}}const pv=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class bt extends ie{construct(t,e,r){return new bt(t,e,r)}static isValidIdentifier(t){return pv.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),bt.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ll}static keyField(){return new bt([Ll])}static fromServerFormat(t){const e=[];let r="",s=0;const i=()=>{if(r.length===0)throw new O(P.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let o=!1;for(;s<t.length;){const c=t[s];if(c==="\\"){if(s+1===t.length)throw new O(P.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const u=t[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new O(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new O(P.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new bt(e)}static emptyPath(){return new bt([])}}/**
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
 */class U{constructor(t){this.path=t}static fromPath(t){return new U(rt.fromString(t))}static fromName(t){return new U(rt.fromString(t).popFirst(5))}static empty(){return new U(rt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&rt.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return rt.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new U(new rt(t.slice()))}}/**
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
 */function gv(n,t,e){if(!e)throw new O(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function mv(n,t,e,r){if(t===!0&&r===!0)throw new O(P.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function xl(n){if(!U.isDocumentKey(n))throw new O(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function up(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ec(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":F(12329,{type:typeof n})}function Te(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new O(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=ec(n);throw new O(P.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
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
 */function ft(n,t){const e={typeString:n};return t&&(e.value=t),e}function cs(n,t){if(!up(n))throw new O(P.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,i="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){e=`Expected '${r}' field to equal '${i.value}'`;break}}if(e)throw new O(P.INVALID_ARGUMENT,e);return!0}/**
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
 */const Fl=-62135596800,Ul=1e6;class st{static now(){return st.fromMillis(Date.now())}static fromDate(t){return st.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*Ul);return new st(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new O(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new O(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Fl)throw new O(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new O(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ul}_compareTo(t){return this.seconds===t.seconds?W(this.nanoseconds,t.nanoseconds):W(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:st._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(cs(t,st._jsonSchema))return new st(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Fl;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}st._jsonSchemaVersion="firestore/timestamp/1.0",st._jsonSchema={type:ft("string",st._jsonSchemaVersion),seconds:ft("number"),nanoseconds:ft("number")};/**
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
 */class B{static fromTimestamp(t){return new B(t)}static min(){return new B(new st(0,0))}static max(){return new B(new st(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const $r=-1;function _v(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=B.fromTimestamp(r===1e9?new st(e+1,0):new st(e,r));return new We(s,U.empty(),t)}function yv(n){return new We(n.readTime,n.key,$r)}class We{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new We(B.min(),U.empty(),$r)}static max(){return new We(B.max(),U.empty(),$r)}}function Tv(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=U.comparator(n.documentKey,t.documentKey),e!==0?e:W(n.largestBatchId,t.largestBatchId))}/**
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
 */const Ev="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class wv{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
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
 */async function rr(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==Ev)throw n;N("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class R{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&F(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new R(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(r,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof R?e:R.resolve(e)}catch(e){return R.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):R.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):R.reject(e)}static resolve(t){return new R(((e,r)=>{e(t)}))}static reject(t){return new R(((e,r)=>{r(t)}))}static waitFor(t){return new R(((e,r)=>{let s=0,i=0,o=!1;t.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&e()}),(u=>r(u)))})),o=!0,i===s&&e()}))}static or(t){let e=R.resolve(!1);for(const r of t)e=e.next((s=>s?R.resolve(s):r()));return e}static forEach(t,e){const r=[];return t.forEach(((s,i)=>{r.push(e.call(this,s,i))})),this.waitFor(r)}static mapArray(t,e){return new R(((r,s)=>{const i=t.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;e(t[h]).next((f=>{o[h]=f,++c,c===i&&r(o)}),(f=>s(f)))}}))}static doWhile(t,e){return new R(((r,s)=>{const i=()=>{t()===!0?e().next((()=>{i()}),s):r()};i()}))}}function Iv(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function sr(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Fi{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Fi.ce=-1;/**
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
 */const nc=-1;function us(n){return n==null}function li(n){return n===0&&1/n==-1/0}function Av(n){return typeof n=="number"&&Number.isInteger(n)&&!li(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const lp="";function vv(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Bl(t)),t=bv(n.get(e),t);return Bl(t)}function bv(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":e+="";break;case lp:e+="";break;default:e+=i}}return e}function Bl(n){return n+lp+""}/**
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
 */function jl(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function tn(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function hp(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
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
 */class ot{constructor(t,e){this.comparator=t,this.root=e||vt.EMPTY}insert(t,e){return new ot(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,vt.BLACK,null,null))}remove(t){return new ot(this.comparator,this.root.remove(t,this.comparator).copy(null,null,vt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Ns(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Ns(this.root,t,this.comparator,!1)}getReverseIterator(){return new Ns(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Ns(this.root,t,this.comparator,!0)}}class Ns{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?r(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class vt{constructor(t,e,r,s,i){this.key=t,this.value=e,this.color=r??vt.RED,this.left=s??vt.EMPTY,this.right=i??vt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,i){return new vt(t??this.key,e??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const i=r(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,r),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return vt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return vt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,vt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,vt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw F(43730,{key:this.key,value:this.value});if(this.right.isRed())throw F(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw F(27949);return t+(this.isRed()?0:1)}}vt.EMPTY=null,vt.RED=!0,vt.BLACK=!1;vt.EMPTY=new class{constructor(){this.size=0}get key(){throw F(57766)}get value(){throw F(16141)}get color(){throw F(16727)}get left(){throw F(29726)}get right(){throw F(36894)}copy(t,e,r,s,i){return this}insert(t,e,r){return new vt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class yt{constructor(t){this.comparator=t,this.data=new ot(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new $l(this.data.getIterator())}getIteratorFrom(t){return new $l(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof yt)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new yt(this.comparator);return e.data=t,e}}class $l{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Ht{constructor(t){this.fields=t,t.sort(bt.comparator)}static empty(){return new Ht([])}unionWith(t){let e=new yt(bt.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Ht(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return qn(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}/**
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
 */class dp extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Ct{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new dp("Invalid base64 string: "+i):i}})(t);return new Ct(e)}static fromUint8Array(t){const e=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(t);return new Ct(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return W(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Ct.EMPTY_BYTE_STRING=new Ct("");const Cv=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Je(n){if(K(!!n,39018),typeof n=="string"){let t=0;const e=Cv.exec(n);if(K(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:lt(n.seconds),nanos:lt(n.nanos)}}function lt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ge(n){return typeof n=="string"?Ct.fromBase64String(n):Ct.fromUint8Array(n)}/**
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
 */const fp="server_timestamp",pp="__type__",gp="__previous_value__",mp="__local_write_time__";function rc(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[pp])==null?void 0:r.stringValue)===fp}function Ui(n){const t=n.mapValue.fields[gp];return rc(t)?Ui(t):t}function qr(n){const t=Je(n.mapValue.fields[mp].timestampValue);return new st(t.seconds,t.nanos)}/**
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
 */class Sv{constructor(t,e,r,s,i,o,c,u,h,f){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f}}const hi="(default)";class Hr{constructor(t,e){this.projectId=t,this.database=e||hi}static empty(){return new Hr("","")}get isDefaultDatabase(){return this.database===hi}isEqual(t){return t instanceof Hr&&t.projectId===this.projectId&&t.database===this.database}}/**
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
 */const _p="__type__",Rv="__max__",Os={mapValue:{}},yp="__vector__",di="value";function Ke(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?rc(n)?4:kv(n)?9007199254740991:Pv(n)?10:11:F(28295,{value:n})}function de(n,t){if(n===t)return!0;const e=Ke(n);if(e!==Ke(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return qr(n).isEqual(qr(t));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Je(s.timestampValue),c=Je(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(s,i){return Ge(s.bytesValue).isEqual(Ge(i.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(s,i){return lt(s.geoPointValue.latitude)===lt(i.geoPointValue.latitude)&&lt(s.geoPointValue.longitude)===lt(i.geoPointValue.longitude)})(n,t);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return lt(s.integerValue)===lt(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=lt(s.doubleValue),c=lt(i.doubleValue);return o===c?li(o)===li(c):isNaN(o)&&isNaN(c)}return!1})(n,t);case 9:return qn(n.arrayValue.values||[],t.arrayValue.values||[],de);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(jl(o)!==jl(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!de(o[u],c[u])))return!1;return!0})(n,t);default:return F(52216,{left:n})}}function zr(n,t){return(n.values||[]).find((e=>de(e,t)))!==void 0}function Hn(n,t){if(n===t)return 0;const e=Ke(n),r=Ke(t);if(e!==r)return W(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return W(n.booleanValue,t.booleanValue);case 2:return(function(i,o){const c=lt(i.integerValue||i.doubleValue),u=lt(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,t);case 3:return ql(n.timestampValue,t.timestampValue);case 4:return ql(qr(n),qr(t));case 5:return aa(n.stringValue,t.stringValue);case 6:return(function(i,o){const c=Ge(i),u=Ge(o);return c.compareTo(u)})(n.bytesValue,t.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=W(c[h],u[h]);if(f!==0)return f}return W(c.length,u.length)})(n.referenceValue,t.referenceValue);case 8:return(function(i,o){const c=W(lt(i.latitude),lt(o.latitude));return c!==0?c:W(lt(i.longitude),lt(o.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return Hl(n.arrayValue,t.arrayValue);case 10:return(function(i,o){var m,A,S,k;const c=i.fields||{},u=o.fields||{},h=(m=c[di])==null?void 0:m.arrayValue,f=(A=u[di])==null?void 0:A.arrayValue,p=W(((S=h==null?void 0:h.values)==null?void 0:S.length)||0,((k=f==null?void 0:f.values)==null?void 0:k.length)||0);return p!==0?p:Hl(h,f)})(n.mapValue,t.mapValue);case 11:return(function(i,o){if(i===Os.mapValue&&o===Os.mapValue)return 0;if(i===Os.mapValue)return 1;if(o===Os.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const m=aa(u[p],f[p]);if(m!==0)return m;const A=Hn(c[u[p]],h[f[p]]);if(A!==0)return A}return W(u.length,f.length)})(n.mapValue,t.mapValue);default:throw F(23264,{he:e})}}function ql(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return W(n,t);const e=Je(n),r=Je(t),s=W(e.seconds,r.seconds);return s!==0?s:W(e.nanos,r.nanos)}function Hl(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const i=Hn(e[s],r[s]);if(i)return i}return W(e.length,r.length)}function zn(n){return ca(n)}function ca(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const r=Je(e);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return Ge(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return U.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let r="[",s=!0;for(const i of e.values||[])s?s=!1:r+=",",r+=ca(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(e){const r=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${ca(e.fields[o])}`;return s+"}"})(n.mapValue):F(61005,{value:n})}function qs(n){switch(Ke(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Ui(n);return t?16+qs(t):16;case 5:return 2*n.stringValue.length;case 6:return Ge(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+qs(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return tn(r.fields,((i,o)=>{s+=i.length+qs(o)})),s})(n.mapValue);default:throw F(13486,{value:n})}}function ua(n){return!!n&&"integerValue"in n}function sc(n){return!!n&&"arrayValue"in n}function zl(n){return!!n&&"nullValue"in n}function Wl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Hs(n){return!!n&&"mapValue"in n}function Pv(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[_p])==null?void 0:r.stringValue)===yp}function Vr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return tn(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=Vr(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Vr(n.arrayValue.values[e]);return t}return{...n}}function kv(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Rv}/**
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
 */class Lt{constructor(t){this.value=t}static empty(){return new Lt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!Hs(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Vr(e)}setAll(t){let e=bt.emptyPath(),r={},s=[];t.forEach(((o,c)=>{if(!e.isImmediateParentOf(c)){const u=this.getFieldsMap(e);this.applyChanges(u,r,s),r={},s=[],e=c.popLast()}o?r[c.lastSegment()]=Vr(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(e);this.applyChanges(i,r,s)}delete(t){const e=this.field(t.popLast());Hs(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return de(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];Hs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){tn(e,((s,i)=>t[s]=i));for(const s of r)delete t[s]}clone(){return new Lt(Vr(this.value))}}function Tp(n){const t=[];return tn(n.fields,((e,r)=>{const s=new bt([e]);if(Hs(r)){const i=Tp(r.mapValue).fields;if(i.length===0)t.push(s);else for(const o of i)t.push(s.child(o))}else t.push(s)})),new Ht(t)}/**
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
 */class wt{constructor(t,e,r,s,i,o,c){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(t){return new wt(t,0,B.min(),B.min(),B.min(),Lt.empty(),0)}static newFoundDocument(t,e,r,s){return new wt(t,1,e,B.min(),r,s,0)}static newNoDocument(t,e){return new wt(t,2,e,B.min(),B.min(),Lt.empty(),0)}static newUnknownDocument(t,e){return new wt(t,3,e,B.min(),B.min(),Lt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Lt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Lt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof wt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new wt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class fi{constructor(t,e){this.position=t,this.inclusive=e}}function Jl(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const i=t[s],o=n.position[s];if(i.field.isKeyField()?r=U.comparator(U.fromName(o.referenceValue),e.key):r=Hn(o,e.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Gl(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!de(n.position[e],t.position[e]))return!1;return!0}/**
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
 */class pi{constructor(t,e="asc"){this.field=t,this.dir=e}}function Vv(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
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
 */class Ep{}class _t extends Ep{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Nv(t,e,r):e==="array-contains"?new Lv(t,r):e==="in"?new xv(t,r):e==="not-in"?new Fv(t,r):e==="array-contains-any"?new Uv(t,r):new _t(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Ov(t,r):new Mv(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Hn(e,this.value)):e!==null&&Ke(this.value)===Ke(e)&&this.matchesComparison(Hn(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return F(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class fe extends Ep{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new fe(t,e)}matches(t){return wp(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function wp(n){return n.op==="and"}function Ip(n){return Dv(n)&&wp(n)}function Dv(n){for(const t of n.filters)if(t instanceof fe)return!1;return!0}function la(n){if(n instanceof _t)return n.field.canonicalString()+n.op.toString()+zn(n.value);if(Ip(n))return n.filters.map((t=>la(t))).join(",");{const t=n.filters.map((e=>la(e))).join(",");return`${n.op}(${t})`}}function Ap(n,t){return n instanceof _t?(function(r,s){return s instanceof _t&&r.op===s.op&&r.field.isEqual(s.field)&&de(r.value,s.value)})(n,t):n instanceof fe?(function(r,s){return s instanceof fe&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,c)=>i&&Ap(o,s.filters[c])),!0):!1})(n,t):void F(19439)}function vp(n){return n instanceof _t?(function(e){return`${e.field.canonicalString()} ${e.op} ${zn(e.value)}`})(n):n instanceof fe?(function(e){return e.op.toString()+" {"+e.getFilters().map(vp).join(" ,")+"}"})(n):"Filter"}class Nv extends _t{constructor(t,e,r){super(t,e,r),this.key=U.fromName(r.referenceValue)}matches(t){const e=U.comparator(t.key,this.key);return this.matchesComparison(e)}}class Ov extends _t{constructor(t,e){super(t,"in",e),this.keys=bp("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Mv extends _t{constructor(t,e){super(t,"not-in",e),this.keys=bp("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function bp(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map((r=>U.fromName(r.referenceValue)))}class Lv extends _t{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return sc(e)&&zr(e.arrayValue,this.value)}}class xv extends _t{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&zr(this.value.arrayValue,e)}}class Fv extends _t{constructor(t,e){super(t,"not-in",e)}matches(t){if(zr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!zr(this.value.arrayValue,e)}}class Uv extends _t{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!sc(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>zr(this.value.arrayValue,r)))}}/**
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
 */class Bv{constructor(t,e=null,r=[],s=[],i=null,o=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function Kl(n,t=null,e=[],r=[],s=null,i=null,o=null){return new Bv(n,t,e,r,s,i,o)}function ic(n){const t=$(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((r=>la(r))).join(","),e+="|ob:",e+=t.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),us(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((r=>zn(r))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((r=>zn(r))).join(",")),t.Te=e}return t.Te}function oc(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Vv(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!Ap(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Gl(n.startAt,t.startAt)&&Gl(n.endAt,t.endAt)}function ha(n){return U.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class Bi{constructor(t,e=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function jv(n,t,e,r,s,i,o,c){return new Bi(n,t,e,r,s,i,o,c)}function ji(n){return new Bi(n)}function Ql(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function $v(n){return n.collectionGroup!==null}function Dr(n){const t=$(n);if(t.Ie===null){t.Ie=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ie.push(i),e.add(i.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new yt(bt.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(t).forEach((i=>{e.has(i.canonicalString())||i.isKeyField()||t.Ie.push(new pi(i,r))})),e.has(bt.keyField().canonicalString())||t.Ie.push(new pi(bt.keyField(),r))}return t.Ie}function ae(n){const t=$(n);return t.Ee||(t.Ee=qv(t,Dr(n))),t.Ee}function qv(n,t){if(n.limitType==="F")return Kl(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new pi(s.field,i)}));const e=n.endAt?new fi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new fi(n.startAt.position,n.startAt.inclusive):null;return Kl(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function da(n,t,e){return new Bi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function $i(n,t){return oc(ae(n),ae(t))&&n.limitType===t.limitType}function Cp(n){return`${ic(ae(n))}|lt:${n.limitType}`}function Rn(n){return`Query(target=${(function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map((s=>vp(s))).join(", ")}]`),us(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map((s=>zn(s))).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map((s=>zn(s))).join(",")),`Target(${r})`})(ae(n))}; limitType=${n.limitType})`}function qi(n,t){return t.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):U.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,t)&&(function(r,s){for(const i of Dr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,t)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,t)&&(function(r,s){return!(r.startAt&&!(function(o,c,u){const h=Jl(o,c,u);return o.inclusive?h<=0:h<0})(r.startAt,Dr(r),s)||r.endAt&&!(function(o,c,u){const h=Jl(o,c,u);return o.inclusive?h>=0:h>0})(r.endAt,Dr(r),s))})(n,t)}function Hv(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Sp(n){return(t,e)=>{let r=!1;for(const s of Dr(n)){const i=zv(s,t,e);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function zv(n,t,e){const r=n.field.isKeyField()?U.comparator(t.key,e.key):(function(i,o,c){const u=o.data.field(i),h=c.data.field(i);return u!==null&&h!==null?Hn(u,h):F(42886)})(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return F(19790,{direction:n.dir})}}/**
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
 */class Tn{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){tn(this.inner,((e,r)=>{for(const[s,i]of r)t(s,i)}))}isEmpty(){return hp(this.inner)}size(){return this.innerSize}}/**
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
 */const Wv=new ot(U.comparator);function ve(){return Wv}const Rp=new ot(U.comparator);function br(...n){let t=Rp;for(const e of n)t=t.insert(e.key,e);return t}function Pp(n){let t=Rp;return n.forEach(((e,r)=>t=t.insert(e,r.overlayedDocument))),t}function hn(){return Nr()}function kp(){return Nr()}function Nr(){return new Tn((n=>n.toString()),((n,t)=>n.isEqual(t)))}const Jv=new ot(U.comparator),Gv=new yt(U.comparator);function J(...n){let t=Gv;for(const e of n)t=t.add(e);return t}const Kv=new yt(W);function Qv(){return Kv}/**
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
 */function ac(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:li(t)?"-0":t}}function Vp(n){return{integerValue:""+n}}function Xv(n,t){return Av(t)?Vp(t):ac(n,t)}/**
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
 */class Hi{constructor(){this._=void 0}}function Yv(n,t,e){return n instanceof Wr?(function(s,i){const o={fields:{[pp]:{stringValue:fp},[mp]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&rc(i)&&(i=Ui(i)),i&&(o.fields[gp]=i),{mapValue:o}})(e,t):n instanceof Jr?Np(n,t):n instanceof Gr?Op(n,t):(function(s,i){const o=Dp(s,i),c=Xl(o)+Xl(s.Ae);return ua(o)&&ua(s.Ae)?Vp(c):ac(s.serializer,c)})(n,t)}function Zv(n,t,e){return n instanceof Jr?Np(n,t):n instanceof Gr?Op(n,t):e}function Dp(n,t){return n instanceof gi?(function(r){return ua(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(t)?t:{integerValue:0}:null}class Wr extends Hi{}class Jr extends Hi{constructor(t){super(),this.elements=t}}function Np(n,t){const e=Mp(t);for(const r of n.elements)e.some((s=>de(s,r)))||e.push(r);return{arrayValue:{values:e}}}class Gr extends Hi{constructor(t){super(),this.elements=t}}function Op(n,t){let e=Mp(t);for(const r of n.elements)e=e.filter((s=>!de(s,r)));return{arrayValue:{values:e}}}class gi extends Hi{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function Xl(n){return lt(n.integerValue||n.doubleValue)}function Mp(n){return sc(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class tb{constructor(t,e){this.field=t,this.transform=e}}function eb(n,t){return n.field.isEqual(t.field)&&(function(r,s){return r instanceof Jr&&s instanceof Jr||r instanceof Gr&&s instanceof Gr?qn(r.elements,s.elements,de):r instanceof gi&&s instanceof gi?de(r.Ae,s.Ae):r instanceof Wr&&s instanceof Wr})(n.transform,t.transform)}class nb{constructor(t,e){this.version=t,this.transformResults=e}}class Ut{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Ut}static exists(t){return new Ut(void 0,t)}static updateTime(t){return new Ut(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function zs(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class zi{}function Lp(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new cc(n.key,Ut.none()):new ls(n.key,n.data,Ut.none());{const e=n.data,r=Lt.empty();let s=new yt(bt.comparator);for(let i of t.fields)if(!s.has(i)){let o=e.field(i);o===null&&i.length>1&&(i=i.popLast(),o=e.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new en(n.key,r,new Ht(s.toArray()),Ut.none())}}function rb(n,t,e){n instanceof ls?(function(s,i,o){const c=s.value.clone(),u=Zl(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,t,e):n instanceof en?(function(s,i,o){if(!zs(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Zl(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(xp(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(n,t,e):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,t,e)}function Or(n,t,e,r){return n instanceof ls?(function(i,o,c,u){if(!zs(i.precondition,o))return c;const h=i.value.clone(),f=th(i.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(n,t,e,r):n instanceof en?(function(i,o,c,u){if(!zs(i.precondition,o))return c;const h=th(i.fieldTransforms,u,o),f=o.data;return f.setAll(xp(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,t,e,r):(function(i,o,c){return zs(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(n,t,e)}function sb(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),i=Dp(r.transform,s||null);i!=null&&(e===null&&(e=Lt.empty()),e.set(r.field,i))}return e||null}function Yl(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&qn(r,s,((i,o)=>eb(i,o)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class ls extends zi{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class en extends zi{constructor(t,e,r,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function xp(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}})),t}function Zl(n,t,e){const r=new Map;K(n.length===e.length,32656,{Re:e.length,Ve:n.length});for(let s=0;s<e.length;s++){const i=n[s],o=i.transform,c=t.data.field(i.field);r.set(i.field,Zv(o,c,e[s]))}return r}function th(n,t,e){const r=new Map;for(const s of n){const i=s.transform,o=e.data.field(s.field);r.set(s.field,Yv(i,o,t))}return r}class cc extends zi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Fp extends zi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class ib{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&rb(i,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=Or(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=Or(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=kp();return this.mutations.forEach((s=>{const i=t.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=e.has(s.key)?null:c;const u=Lp(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(B.min())})),r}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),J())}isEqual(t){return this.batchId===t.batchId&&qn(this.mutations,t.mutations,((e,r)=>Yl(e,r)))&&qn(this.baseMutations,t.baseMutations,((e,r)=>Yl(e,r)))}}class uc{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){K(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let s=(function(){return Jv})();const i=t.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new uc(t,e,r,s)}}/**
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
 */class ob{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
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
 */class ab{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var ht,G;function Up(n){switch(n){case P.OK:return F(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return F(15467,{code:n})}}function Bp(n){if(n===void 0)return Ae("GRPC error has no .code"),P.UNKNOWN;switch(n){case ht.OK:return P.OK;case ht.CANCELLED:return P.CANCELLED;case ht.UNKNOWN:return P.UNKNOWN;case ht.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ht.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ht.INTERNAL:return P.INTERNAL;case ht.UNAVAILABLE:return P.UNAVAILABLE;case ht.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ht.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ht.NOT_FOUND:return P.NOT_FOUND;case ht.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ht.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ht.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ht.ABORTED:return P.ABORTED;case ht.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ht.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ht.DATA_LOSS:return P.DATA_LOSS;default:return F(39323,{code:n})}}(G=ht||(ht={}))[G.OK=0]="OK",G[G.CANCELLED=1]="CANCELLED",G[G.UNKNOWN=2]="UNKNOWN",G[G.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",G[G.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",G[G.NOT_FOUND=5]="NOT_FOUND",G[G.ALREADY_EXISTS=6]="ALREADY_EXISTS",G[G.PERMISSION_DENIED=7]="PERMISSION_DENIED",G[G.UNAUTHENTICATED=16]="UNAUTHENTICATED",G[G.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",G[G.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",G[G.ABORTED=10]="ABORTED",G[G.OUT_OF_RANGE=11]="OUT_OF_RANGE",G[G.UNIMPLEMENTED=12]="UNIMPLEMENTED",G[G.INTERNAL=13]="INTERNAL",G[G.UNAVAILABLE=14]="UNAVAILABLE",G[G.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function cb(){return new TextEncoder}/**
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
 */const ub=new $e([4294967295,4294967295],0);function eh(n){const t=cb().encode(n),e=new ep;return e.update(t),new Uint8Array(e.digest())}function nh(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new $e([e,r],0),new $e([s,i],0)]}class lc{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new Cr(`Invalid padding: ${e}`);if(r<0)throw new Cr(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new Cr(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new Cr(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=$e.fromNumber(this.ge)}ye(t,e,r){let s=t.add(e.multiply($e.fromNumber(r)));return s.compare(ub)===1&&(s=new $e([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=eh(t),[r,s]=nh(e);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),o=new lc(i,s,e);return r.forEach((c=>o.insert(c))),o}insert(t){if(this.ge===0)return;const e=eh(t),[r,s]=nh(e);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class Cr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Wi{constructor(t,e,r,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,hs.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Wi(B.min(),s,new ot(W),ve(),J())}}class hs{constructor(t,e,r,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new hs(r,e,J(),J(),J())}}/**
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
 */class Ws{constructor(t,e,r,s){this.be=t,this.removedTargetIds=e,this.key=r,this.De=s}}class jp{constructor(t,e){this.targetId=t,this.Ce=e}}class $p{constructor(t,e,r=Ct.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class rh{constructor(){this.ve=0,this.Fe=sh(),this.Me=Ct.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=J(),e=J(),r=J();return this.Fe.forEach(((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:F(38017,{changeType:i})}})),new hs(this.Me,this.xe,t,e,r)}qe(){this.Oe=!1,this.Fe=sh()}Qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}$e(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}Ue(){this.ve+=1}Ke(){this.ve-=1,K(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class lb{constructor(t){this.Ge=t,this.ze=new Map,this.je=ve(),this.Je=Ms(),this.He=Ms(),this.Ye=new ot(W)}Ze(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Xe(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,(e=>{const r=this.nt(e);switch(t.state){case 0:this.rt(e)&&r.Le(t.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(t.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(r.We(),r.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),r.Le(t.resumeToken));break;default:F(56790,{state:t.state})}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach(((r,s)=>{this.rt(s)&&e(s)}))}st(t){const e=t.targetId,r=t.Ce.count,s=this.ot(e);if(s){const i=s.target;if(ha(i))if(r===0){const o=new U(i.path);this.et(e,o,wt.newNoDocument(o,B.min()))}else K(r===1,20013,{expectedCount:r});else{const o=this._t(e);if(o!==r){const c=this.ut(t),u=c?this.ct(c,t,o):1;if(u!==0){this.it(e);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(e,h)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=e;let o,c;try{o=Ge(r).toUint8Array()}catch(u){if(u instanceof dp)return $n("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new lc(o,s,i)}catch(u){return $n(u instanceof Cr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(t,e,r){return e.Ce.count===r-this.Pt(t,e.targetId)?0:2}Pt(t,e){const r=this.Ge.getRemoteKeysForTarget(e);let s=0;return r.forEach((i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;t.mightContain(c)||(this.et(e,i,null),s++)})),s}Tt(t){const e=new Map;this.ze.forEach(((i,o)=>{const c=this.ot(o);if(c){if(i.current&&ha(c.target)){const u=new U(c.target.path);this.It(u).has(o)||this.Et(o,u)||this.et(o,u,wt.newNoDocument(u,t))}i.Be&&(e.set(o,i.ke()),i.qe())}}));let r=J();this.He.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const h=this.ot(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(t)));const s=new Wi(t,e,this.Ye,this.je,r);return this.je=ve(),this.Je=Ms(),this.He=Ms(),this.Ye=new ot(W),s}Xe(t,e){if(!this.rt(t))return;const r=this.Et(t,e.key)?2:0;this.nt(t).Qe(e.key,r),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.He=this.He.insert(e.key,this.dt(e.key).add(t))}et(t,e,r){if(!this.rt(t))return;const s=this.nt(t);this.Et(t,e)?s.Qe(e,1):s.$e(e),this.He=this.He.insert(e,this.dt(e).delete(t)),this.He=this.He.insert(e,this.dt(e).add(t)),r&&(this.je=this.je.insert(e,r))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ue(t){this.nt(t).Ue()}nt(t){let e=this.ze.get(t);return e||(e=new rh,this.ze.set(t,e)),e}dt(t){let e=this.He.get(t);return e||(e=new yt(W),this.He=this.He.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new yt(W),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||N("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new rh),this.Ge.getRemoteKeysForTarget(t).forEach((e=>{this.et(t,e,null)}))}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function Ms(){return new ot(U.comparator)}function sh(){return new ot(U.comparator)}const hb={asc:"ASCENDING",desc:"DESCENDING"},db={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},fb={and:"AND",or:"OR"};class pb{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function fa(n,t){return n.useProto3Json||us(t)?t:{value:t}}function mi(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function qp(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function gb(n,t){return mi(n,t.toTimestamp())}function zt(n){return K(!!n,49232),B.fromTimestamp((function(e){const r=Je(e);return new st(r.seconds,r.nanos)})(n))}function hc(n,t){return pa(n,t).canonicalString()}function pa(n,t){const e=(function(s){return new rt(["projects",s.projectId,"databases",s.database])})(n).child("documents");return t===void 0?e:e.child(t)}function Hp(n){const t=rt.fromString(n);return K(Qp(t),10190,{key:t.toString()}),t}function _i(n,t){return hc(n.databaseId,t.path)}function Mr(n,t){const e=Hp(t);if(e.get(1)!==n.databaseId.projectId)throw new O(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new O(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new U(Wp(e))}function zp(n,t){return hc(n.databaseId,t)}function mb(n){const t=Hp(n);return t.length===4?rt.emptyPath():Wp(t)}function ga(n){return new rt(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Wp(n){return K(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function ih(n,t,e){return{name:_i(n,t),fields:e.value.mapValue.fields}}function _b(n,t){return"found"in t?(function(r,s){K(!!s.found,43571),s.found.name,s.found.updateTime;const i=Mr(r,s.found.name),o=zt(s.found.updateTime),c=s.found.createTime?zt(s.found.createTime):B.min(),u=new Lt({mapValue:{fields:s.found.fields}});return wt.newFoundDocument(i,o,c,u)})(n,t):"missing"in t?(function(r,s){K(!!s.missing,3894),K(!!s.readTime,22933);const i=Mr(r,s.missing),o=zt(s.readTime);return wt.newNoDocument(i,o)})(n,t):F(7234,{result:t})}function yb(n,t){let e;if("targetChange"in t){t.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:F(39313,{state:h})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(K(f===void 0||typeof f=="string",58123),Ct.fromBase64String(f||"")):(K(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Ct.fromUint8Array(f||new Uint8Array))})(n,t.targetChange.resumeToken),o=t.targetChange.cause,c=o&&(function(h){const f=h.code===void 0?P.UNKNOWN:Bp(h.code);return new O(f,h.message||"")})(o);e=new $p(r,s,i,c||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Mr(n,r.document.name),i=zt(r.document.updateTime),o=r.document.createTime?zt(r.document.createTime):B.min(),c=new Lt({mapValue:{fields:r.document.fields}}),u=wt.newFoundDocument(s,i,o,c),h=r.targetIds||[],f=r.removedTargetIds||[];e=new Ws(h,f,u.key,u)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Mr(n,r.document),i=r.readTime?zt(r.readTime):B.min(),o=wt.newNoDocument(s,i),c=r.removedTargetIds||[];e=new Ws([],c,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Mr(n,r.document),i=r.removedTargetIds||[];e=new Ws([],i,s,null)}else{if(!("filter"in t))return F(11601,{Rt:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new ab(s,i),c=r.targetId;e=new jp(c,o)}}return e}function Jp(n,t){let e;if(t instanceof ls)e={update:ih(n,t.key,t.value)};else if(t instanceof cc)e={delete:_i(n,t.key)};else if(t instanceof en)e={update:ih(n,t.key,t.data),updateMask:Sb(t.fieldMask)};else{if(!(t instanceof Fp))return F(16599,{Vt:t.type});e={verify:_i(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(i,o){const c=o.transform;if(c instanceof Wr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Jr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Gr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof gi)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw F(20930,{transform:o.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:gb(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:F(27497)})(n,t.precondition)),e}function Tb(n,t){return n&&n.length>0?(K(t!==void 0,14353),n.map((e=>(function(s,i){let o=s.updateTime?zt(s.updateTime):zt(i);return o.isEqual(B.min())&&(o=zt(i)),new nb(o,s.transformResults||[])})(e,t)))):[]}function Eb(n,t){return{documents:[zp(n,t.path)]}}function wb(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=zp(n,s);const i=(function(h){if(h.length!==0)return Kp(fe.create(h,"and"))})(t.filters);i&&(e.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((f=>(function(m){return{field:Pn(m.field),direction:vb(m.dir)}})(f)))})(t.orderBy);o&&(e.structuredQuery.orderBy=o);const c=fa(n,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(t.endAt)),{ft:e,parent:s}}function Ib(n){let t=mb(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){K(r===1,65062);const f=e.from[0];f.allDescendants?s=f.collectionId:t=t.child(f.collectionId)}let i=[];e.where&&(i=(function(p){const m=Gp(p);return m instanceof fe&&Ip(m)?m.getFilters():[m]})(e.where));let o=[];e.orderBy&&(o=(function(p){return p.map((m=>(function(S){return new pi(kn(S.field),(function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(S.direction))})(m)))})(e.orderBy));let c=null;e.limit&&(c=(function(p){let m;return m=typeof p=="object"?p.value:p,us(m)?null:m})(e.limit));let u=null;e.startAt&&(u=(function(p){const m=!!p.before,A=p.values||[];return new fi(A,m)})(e.startAt));let h=null;return e.endAt&&(h=(function(p){const m=!p.before,A=p.values||[];return new fi(A,m)})(e.endAt)),jv(t,s,o,i,c,"F",u,h)}function Ab(n,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Gp(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=kn(e.unaryFilter.field);return _t.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=kn(e.unaryFilter.field);return _t.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=kn(e.unaryFilter.field);return _t.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=kn(e.unaryFilter.field);return _t.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return F(61313);default:return F(60726)}})(n):n.fieldFilter!==void 0?(function(e){return _t.create(kn(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return F(58110);default:return F(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return fe.create(e.compositeFilter.filters.map((r=>Gp(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return F(1026)}})(e.compositeFilter.op))})(n):F(30097,{filter:n})}function vb(n){return hb[n]}function bb(n){return db[n]}function Cb(n){return fb[n]}function Pn(n){return{fieldPath:n.canonicalString()}}function kn(n){return bt.fromServerFormat(n.fieldPath)}function Kp(n){return n instanceof _t?(function(e){if(e.op==="=="){if(Wl(e.value))return{unaryFilter:{field:Pn(e.field),op:"IS_NAN"}};if(zl(e.value))return{unaryFilter:{field:Pn(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Wl(e.value))return{unaryFilter:{field:Pn(e.field),op:"IS_NOT_NAN"}};if(zl(e.value))return{unaryFilter:{field:Pn(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Pn(e.field),op:bb(e.op),value:e.value}}})(n):n instanceof fe?(function(e){const r=e.getFilters().map((s=>Kp(s)));return r.length===1?r[0]:{compositeFilter:{op:Cb(e.op),filters:r}}})(n):F(54877,{filter:n})}function Sb(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function Qp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class xe{constructor(t,e,r,s,i=B.min(),o=B.min(),c=Ct.EMPTY_BYTE_STRING,u=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(t){return new xe(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new xe(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new xe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new xe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class Rb{constructor(t){this.yt=t}}function Pb(n){const t=Ib({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?da(t,t.limit,"L"):t}/**
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
 */class kb{constructor(){this.Cn=new Vb}addToCollectionParentIndex(t,e){return this.Cn.add(e),R.resolve()}getCollectionParents(t,e){return R.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return R.resolve()}deleteFieldIndex(t,e){return R.resolve()}deleteAllFieldIndexes(t){return R.resolve()}createTargetIndexes(t,e){return R.resolve()}getDocumentsMatchingTarget(t,e){return R.resolve(null)}getIndexType(t,e){return R.resolve(0)}getFieldIndexes(t,e){return R.resolve([])}getNextCollectionGroupToUpdate(t){return R.resolve(null)}getMinOffset(t,e){return R.resolve(We.min())}getMinOffsetFromCollectionGroup(t,e){return R.resolve(We.min())}updateCollectionGroup(t,e,r){return R.resolve()}updateIndexEntries(t,e){return R.resolve()}}class Vb{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new yt(rt.comparator),i=!s.has(r);return this.index[e]=s.add(r),i}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new yt(rt.comparator)).toArray()}}/**
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
 */const oh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Xp=41943040;class Ft{static withCacheSize(t){return new Ft(t,Ft.DEFAULT_COLLECTION_PERCENTILE,Ft.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
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
 */Ft.DEFAULT_COLLECTION_PERCENTILE=10,Ft.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ft.DEFAULT=new Ft(Xp,Ft.DEFAULT_COLLECTION_PERCENTILE,Ft.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ft.DISABLED=new Ft(-1,0,0);/**
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
 */class Wn{constructor(t){this.ar=t}next(){return this.ar+=2,this.ar}static ur(){return new Wn(0)}static cr(){return new Wn(-1)}}/**
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
 */const ah="LruGarbageCollector",Db=1048576;function ch([n,t],[e,r]){const s=W(n,e);return s===0?W(t,r):s}class Nb{constructor(t){this.Ir=t,this.buffer=new yt(ch),this.Er=0}dr(){return++this.Er}Ar(t){const e=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();ch(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Ob{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(t){N(ah,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){sr(e)?N(ah,"Ignoring IndexedDB error during garbage collection: ",e):await rr(e)}await this.Vr(3e5)}))}}class Mb{constructor(t,e){this.mr=t,this.params=e}calculateTargetCount(t,e){return this.mr.gr(t).next((r=>Math.floor(e/100*r)))}nthSequenceNumber(t,e){if(e===0)return R.resolve(Fi.ce);const r=new Nb(e);return this.mr.forEachTarget(t,(s=>r.Ar(s.sequenceNumber))).next((()=>this.mr.pr(t,(s=>r.Ar(s))))).next((()=>r.maxValue))}removeTargets(t,e,r){return this.mr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.mr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(oh)):this.getCacheSize(t).next((r=>r<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),oh):this.yr(t,e)))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,e){let r,s,i,o,c,u,h;const f=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(t,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(t,r,e)))).next((p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(t,r)))).next((p=>(h=Date.now(),Sn()<=z.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function Lb(n,t){return new Mb(n,t)}/**
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
 */class xb{constructor(){this.changes=new Tn((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,wt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?R.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class Fb{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class Ub{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(r!==null&&Or(r.mutation,s,Ht.empty(),st.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.getLocalViewOfDocuments(t,r,J()).next((()=>r))))}getLocalViewOfDocuments(t,e,r=J()){const s=hn();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,r).next((i=>{let o=br();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(t,e){const r=hn();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,J())))}populateOverlays(t,e,r){const s=[];return r.forEach((i=>{e.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(t,s).next((i=>{i.forEach(((o,c)=>{e.set(o,c)}))}))}computeViews(t,e,r,s){let i=ve();const o=Nr(),c=(function(){return Nr()})();return e.forEach(((u,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof en)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),Or(f.mutation,h,f.mutation.getFieldMask(),st.now())):o.set(h.key,Ht.empty())})),this.recalculateAndSaveOverlays(t,i).next((u=>(u.forEach(((h,f)=>o.set(h,f))),e.forEach(((h,f)=>c.set(h,new Fb(f,o.get(h)??null)))),c)))}recalculateAndSaveOverlays(t,e){const r=Nr();let s=new ot(((o,c)=>o-c)),i=J();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((o=>{for(const c of o)c.keys().forEach((u=>{const h=e.get(u);if(h===null)return;let f=r.get(u)||Ht.empty();f=c.applyToLocalView(h,f),r.set(u,f);const p=(s.get(c.batchId)||J()).add(u);s=s.insert(c.batchId,p)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,p=kp();f.forEach((m=>{if(!i.has(m)){const A=Lp(e.get(m),r.get(m));A!==null&&p.set(m,A),i=i.add(m)}})),o.push(this.documentOverlayCache.saveOverlays(t,h,p))}return R.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,e,r,s){return(function(o){return U.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):$v(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-i.size):R.resolve(hn());let c=$r,u=i;return o.next((h=>R.forEach(h,((f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?R.resolve():this.remoteDocumentCache.getEntry(t,f).next((m=>{u=u.insert(f,m)}))))).next((()=>this.populateOverlays(t,h,i))).next((()=>this.computeViews(t,u,h,J()))).next((f=>({batchId:c,changes:Pp(f)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new U(e)).next((r=>{let s=br();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const i=e.collectionGroup;let o=br();return this.indexManager.getCollectionParents(t,i).next((c=>R.forEach(c,(u=>{const h=(function(p,m){return new Bi(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(e,u.child(i));return this.getDocumentsMatchingCollectionQuery(t,h,r,s).next((f=>{f.forEach(((p,m)=>{o=o.insert(p,m)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(t,e,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,i,s)))).next((o=>{i.forEach(((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,wt.newInvalidDocument(f)))}));let c=br();return o.forEach(((u,h)=>{const f=i.get(u);f!==void 0&&Or(f.mutation,h,Ht.empty(),st.now()),qi(e,h)&&(c=c.insert(u,h))})),c}))}}/**
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
 */class Bb{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,e){return R.resolve(this.Lr.get(e))}saveBundleMetadata(t,e){return this.Lr.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:zt(s.createTime)}})(e)),R.resolve()}getNamedQuery(t,e){return R.resolve(this.kr.get(e))}saveNamedQuery(t,e){return this.kr.set(e.name,(function(s){return{name:s.name,query:Pb(s.bundledQuery),readTime:zt(s.readTime)}})(e)),R.resolve()}}/**
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
 */class jb{constructor(){this.overlays=new ot(U.comparator),this.qr=new Map}getOverlay(t,e){return R.resolve(this.overlays.get(e))}getOverlays(t,e){const r=hn();return R.forEach(e,(s=>this.getOverlay(t,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(t,e,r){return r.forEach(((s,i)=>{this.St(t,e,i)})),R.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(r)),R.resolve()}getOverlaysForCollection(t,e,r){const s=hn(),i=e.length+1,o=new U(e.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!e.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return R.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let i=new ot(((h,f)=>h-f));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===e&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=hn(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=hn(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return R.resolve(c)}St(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new ob(e,r));let i=this.qr.get(e);i===void 0&&(i=J(),this.qr.set(e,i)),this.qr.set(e,i.add(r.key))}}/**
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
 */class $b{constructor(){this.sessionToken=Ct.EMPTY_BYTE_STRING}getSessionToken(t){return R.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,R.resolve()}}/**
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
 */class dc{constructor(){this.Qr=new yt(Et.$r),this.Ur=new yt(Et.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,e){const r=new Et(t,e);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(t,e){t.forEach((r=>this.addReference(r,e)))}removeReference(t,e){this.Gr(new Et(t,e))}zr(t,e){t.forEach((r=>this.removeReference(r,e)))}jr(t){const e=new U(new rt([])),r=new Et(e,t),s=new Et(e,t+1),i=[];return this.Ur.forEachInRange([r,s],(o=>{this.Gr(o),i.push(o.key)})),i}Jr(){this.Qr.forEach((t=>this.Gr(t)))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const e=new U(new rt([])),r=new Et(e,t),s=new Et(e,t+1);let i=J();return this.Ur.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(t){const e=new Et(t,0),r=this.Qr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class Et{constructor(t,e){this.key=t,this.Yr=e}static $r(t,e){return U.comparator(t.key,e.key)||W(t.Yr,e.Yr)}static Kr(t,e){return W(t.Yr,e.Yr)||U.comparator(t.key,e.key)}}/**
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
 */class qb{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.tr=1,this.Zr=new yt(Et.$r)}checkEmpty(t){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new ib(i,e,r,s);this.mutationQueue.push(o);for(const c of s)this.Zr=this.Zr.add(new Et(c.key,i)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return R.resolve(o)}lookupMutationBatch(t,e){return R.resolve(this.Xr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.ei(r),i=s<0?0:s;return R.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?nc:this.tr-1)}getAllMutationBatches(t){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new Et(e,0),s=new Et(e,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],(o=>{const c=this.Xr(o.Yr);i.push(c)})),R.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new yt(W);return e.forEach((s=>{const i=new Et(s,0),o=new Et(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,o],(c=>{r=r.add(c.Yr)}))})),R.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let i=r;U.isDocumentKey(i)||(i=i.child(""));const o=new Et(new U(i),0);let c=new yt(W);return this.Zr.forEachWhile((u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.Yr)),!0)}),o),R.resolve(this.ti(c))}ti(t){const e=[];return t.forEach((r=>{const s=this.Xr(r);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){K(this.ni(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return R.forEach(e.mutations,(s=>{const i=new Et(s.key,e.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.Zr=r}))}ir(t){}containsKey(t,e){const r=new Et(e,0),s=this.Zr.firstAfterOrEqual(r);return R.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,R.resolve()}ni(t,e){return this.ei(t)}ei(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Xr(t){const e=this.ei(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class Hb{constructor(t){this.ri=t,this.docs=(function(){return new ot(U.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),i=s?s.size:0,o=this.ri(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return R.resolve(r?r.document.mutableCopy():wt.newInvalidDocument(e))}getEntries(t,e){let r=ve();return e.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():wt.newInvalidDocument(s))})),R.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let i=ve();const o=e.path,c=new U(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Tv(yv(f),r)<=0||(s.has(f.key)||qi(e,f))&&(i=i.insert(f.key,f.mutableCopy()))}return R.resolve(i)}getAllFromCollectionGroup(t,e,r,s){F(9500)}ii(t,e){return R.forEach(this.docs,(r=>e(r)))}newChangeBuffer(t){return new zb(this)}getSize(t){return R.resolve(this.size)}}class zb extends xb{constructor(t){super(),this.Nr=t}applyChanges(t){const e=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?e.push(this.Nr.addEntry(t,s)):this.Nr.removeEntry(r)})),R.waitFor(e)}getFromCache(t,e){return this.Nr.getEntry(t,e)}getAllFromCache(t,e){return this.Nr.getEntries(t,e)}}/**
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
 */class Wb{constructor(t){this.persistence=t,this.si=new Tn((e=>ic(e)),oc),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.oi=0,this._i=new dc,this.targetCount=0,this.ai=Wn.ur()}forEachTarget(t,e){return this.si.forEach(((r,s)=>e(s))),R.resolve()}getLastRemoteSnapshotVersion(t){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return R.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.oi&&(this.oi=e),R.resolve()}Pr(t){this.si.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ai=new Wn(e),this.highestTargetId=e),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,e){return this.Pr(e),this.targetCount+=1,R.resolve()}updateTargetData(t,e){return this.Pr(e),R.resolve()}removeTargetData(t,e){return this.si.delete(e.target),this._i.jr(e.targetId),this.targetCount-=1,R.resolve()}removeTargets(t,e,r){let s=0;const i=[];return this.si.forEach(((o,c)=>{c.sequenceNumber<=e&&r.get(c.targetId)===null&&(this.si.delete(o),i.push(this.removeMatchingKeysForTargetId(t,c.targetId)),s++)})),R.waitFor(i).next((()=>s))}getTargetCount(t){return R.resolve(this.targetCount)}getTargetData(t,e){const r=this.si.get(e)||null;return R.resolve(r)}addMatchingKeys(t,e,r){return this._i.Wr(e,r),R.resolve()}removeMatchingKeys(t,e,r){this._i.zr(e,r);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach((o=>{i.push(s.markPotentiallyOrphaned(t,o))})),R.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this._i.jr(e),R.resolve()}getMatchingKeysForTargetId(t,e){const r=this._i.Hr(e);return R.resolve(r)}containsKey(t,e){return R.resolve(this._i.containsKey(e))}}/**
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
 */class Yp{constructor(t,e){this.ui={},this.overlays={},this.ci=new Fi(0),this.li=!1,this.li=!0,this.hi=new $b,this.referenceDelegate=t(this),this.Pi=new Wb(this),this.indexManager=new kb,this.remoteDocumentCache=(function(s){return new Hb(s)})((r=>this.referenceDelegate.Ti(r))),this.serializer=new Rb(e),this.Ii=new Bb(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new jb,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ui[t.toKey()];return r||(r=new qb(e,this.referenceDelegate),this.ui[t.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,e,r){N("MemoryPersistence","Starting transaction:",t);const s=new Jb(this.ci.next());return this.referenceDelegate.Ei(),r(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ai(t,e){return R.or(Object.values(this.ui).map((r=>()=>r.containsKey(t,e))))}}class Jb extends wv{constructor(t){super(),this.currentSequenceNumber=t}}class fc{constructor(t){this.persistence=t,this.Ri=new dc,this.Vi=null}static mi(t){return new fc(t)}get fi(){if(this.Vi)return this.Vi;throw F(60996)}addReference(t,e,r){return this.Ri.addReference(r,e),this.fi.delete(r.toString()),R.resolve()}removeReference(t,e,r){return this.Ri.removeReference(r,e),this.fi.add(r.toString()),R.resolve()}markPotentiallyOrphaned(t,e){return this.fi.add(e.toString()),R.resolve()}removeTarget(t,e){this.Ri.jr(e.targetId).forEach((s=>this.fi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((i=>this.fi.add(i.toString())))})).next((()=>r.removeTargetData(t,e)))}Ei(){this.Vi=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.fi,(r=>{const s=U.fromPath(r);return this.gi(t,s).next((i=>{i||e.removeEntry(s,B.min())}))})).next((()=>(this.Vi=null,e.apply(t))))}updateLimboDocument(t,e){return this.gi(t,e).next((r=>{r?this.fi.delete(e.toString()):this.fi.add(e.toString())}))}Ti(t){return 0}gi(t,e){return R.or([()=>R.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ai(t,e)])}}class yi{constructor(t,e){this.persistence=t,this.pi=new Tn((r=>vv(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Lb(this,e)}static mi(t,e){return new yi(t,e)}Ei(){}di(t){return R.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}gr(t){const e=this.wr(t);return this.persistence.getTargetCache().getTargetCount(t).next((r=>e.next((s=>r+s))))}wr(t){let e=0;return this.pr(t,(r=>{e++})).next((()=>e))}pr(t,e){return R.forEach(this.pi,((r,s)=>this.br(t,r,s).next((i=>i?R.resolve():e(s)))))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(t,(o=>this.br(t,o,e).next((c=>{c||(r++,i.removeEntry(o,B.min()))})))).next((()=>i.apply(t))).next((()=>r))}markPotentiallyOrphaned(t,e){return this.pi.set(e,t.currentSequenceNumber),R.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.pi.set(r,t.currentSequenceNumber),R.resolve()}removeReference(t,e,r){return this.pi.set(r,t.currentSequenceNumber),R.resolve()}updateLimboDocument(t,e){return this.pi.set(e,t.currentSequenceNumber),R.resolve()}Ti(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=qs(t.data.value)),e}br(t,e,r){return R.or([()=>this.persistence.Ai(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.pi.get(e);return R.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
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
 */class pc{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.Es=r,this.ds=s}static As(t,e){let r=J(),s=J();for(const i of e.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new pc(t,e.fromCache,r,s)}}/**
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
 */class Gb{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class Kb{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return UE()?8:Iv(Nt())>0?6:4})()}initialize(t,e){this.ps=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,r,s){const i={result:null};return this.ys(t,e).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ws(t,e,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new Gb;return this.Ss(t,e,o).next((c=>{if(i.result=c,this.Vs)return this.bs(t,e,o,c.size)}))})).next((()=>i.result))}bs(t,e,r,s){return r.documentReadCount<this.fs?(Sn()<=z.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",Rn(e),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),R.resolve()):(Sn()<=z.DEBUG&&N("QueryEngine","Query:",Rn(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Sn()<=z.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",Rn(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,ae(e))):R.resolve())}ys(t,e){if(Ql(e))return R.resolve(null);let r=ae(e);return this.indexManager.getIndexType(t,r).next((s=>s===0?null:(e.limit!==null&&s===1&&(e=da(e,null,"F"),r=ae(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next((i=>{const o=J(...i);return this.ps.getDocuments(t,o).next((c=>this.indexManager.getMinOffset(t,r).next((u=>{const h=this.Ds(e,c);return this.Cs(e,h,o,u.readTime)?this.ys(t,da(e,null,"F")):this.vs(t,h,e,u)}))))})))))}ws(t,e,r,s){return Ql(e)||s.isEqual(B.min())?R.resolve(null):this.ps.getDocuments(t,r).next((i=>{const o=this.Ds(e,i);return this.Cs(e,o,r,s)?R.resolve(null):(Sn()<=z.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Rn(e)),this.vs(t,o,e,_v(s,$r)).next((c=>c)))}))}Ds(t,e){let r=new yt(Sp(t));return e.forEach(((s,i)=>{qi(t,i)&&(r=r.add(i))})),r}Cs(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(t,e,r){return Sn()<=z.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",Rn(e)),this.ps.getDocumentsMatchingQuery(t,e,We.min(),r)}vs(t,e,r,s){return this.ps.getDocumentsMatchingQuery(t,r,s).next((i=>(e.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
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
 */const gc="LocalStore",Qb=3e8;class Xb{constructor(t,e,r,s){this.persistence=t,this.Fs=e,this.serializer=s,this.Ms=new ot(W),this.xs=new Tn((i=>ic(i)),oc),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(r)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Ub(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.Ms)))}}function Yb(n,t,e,r){return new Xb(n,t,e,r)}async function Zp(n,t){const e=$(n);return await e.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,e.Bs(t),e.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],c=[];let u=J();for(const h of s){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return e.localDocuments.getDocuments(r,u).next((h=>({Ls:h,removedBatchIds:o,addedBatchIds:c})))}))}))}function Zb(n,t){const e=$(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),i=e.Ns.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const p=h.batch,m=p.keys();let A=R.resolve();return m.forEach((S=>{A=A.next((()=>f.getEntry(u,S))).next((k=>{const V=h.docVersions.get(S);K(V!==null,48541),k.version.compareTo(V)<0&&(p.applyToRemoteDocument(k,h),k.isValidDocument()&&(k.setReadTime(h.commitVersion),f.addEntry(k)))}))})),A.next((()=>c.mutationQueue.removeMutationBatch(u,p)))})(e,r,t,i).next((()=>i.apply(r))).next((()=>e.mutationQueue.performConsistencyCheck(r))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let u=J();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(t)))).next((()=>e.localDocuments.getDocuments(r,s)))}))}function tg(n){const t=$(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.Pi.getLastRemoteSnapshotVersion(e)))}function tC(n,t){const e=$(n),r=t.snapshotVersion;let s=e.Ms;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=e.Ns.newChangeBuffer({trackRemovals:!0});s=e.Ms;const c=[];t.targetChanges.forEach(((f,p)=>{const m=s.get(p);if(!m)return;c.push(e.Pi.removeMatchingKeys(i,f.removedDocuments,p).next((()=>e.Pi.addMatchingKeys(i,f.addedDocuments,p))));let A=m.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(p)!==null?A=A.withResumeToken(Ct.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):f.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(f.resumeToken,r)),s=s.insert(p,A),(function(k,V,L){return k.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=Qb?!0:L.addedDocuments.size+L.modifiedDocuments.size+L.removedDocuments.size>0})(m,A,f)&&c.push(e.Pi.updateTargetData(i,A))}));let u=ve(),h=J();if(t.documentUpdates.forEach((f=>{t.resolvedLimboDocuments.has(f)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(eC(i,o,t.documentUpdates).next((f=>{u=f.ks,h=f.qs}))),!r.isEqual(B.min())){const f=e.Pi.getLastRemoteSnapshotVersion(i).next((p=>e.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(f)}return R.waitFor(c).next((()=>o.apply(i))).next((()=>e.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(e.Ms=s,i)))}function eC(n,t,e){let r=J(),s=J();return e.forEach((i=>r=r.add(i))),t.getEntries(n,r).next((i=>{let o=ve();return e.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(B.min())?(t.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(t.addEntry(u),o=o.insert(c,u)):N(gc,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{ks:o,qs:s}}))}function nC(n,t){const e=$(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=nc),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function rC(n,t){const e=$(n);return e.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return e.Pi.getTargetData(r,t).next((i=>i?(s=i,R.resolve(s)):e.Pi.allocateTargetId(r).next((o=>(s=new xe(t,o,"TargetPurposeListen",r.currentSequenceNumber),e.Pi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=e.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Ms=e.Ms.insert(r.targetId,r),e.xs.set(t,r.targetId)),r}))}async function ma(n,t,e){const r=$(n),s=r.Ms.get(t),i=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!sr(o))throw o;N(gc,`Failed to update sequence numbers for target ${t}: ${o}`)}r.Ms=r.Ms.remove(t),r.xs.delete(s.target)}function uh(n,t,e){const r=$(n);let s=B.min(),i=J();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,h,f){const p=$(u),m=p.xs.get(f);return m!==void 0?R.resolve(p.Ms.get(m)):p.Pi.getTargetData(h,f)})(r,o,ae(t)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>r.Fs.getDocumentsMatchingQuery(o,t,e?s:B.min(),e?i:J()))).next((c=>(sC(r,Hv(t),c),{documents:c,Qs:i})))))}function sC(n,t,e){let r=n.Os.get(t)||B.min();e.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Os.set(t,r)}class lh{constructor(){this.activeTargetIds=Qv()}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class iC{constructor(){this.Mo=new lh,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,e,r){this.xo[t]=e}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new lh,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class oC{Oo(t){}shutdown(){}}/**
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
 */const hh="ConnectivityMonitor";class dh{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){N(hh,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){N(hh,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Ls=null;function _a(){return Ls===null?Ls=(function(){return 268435456+Math.round(2147483648*Math.random())})():Ls++,"0x"+Ls.toString(16)}/**
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
 */const jo="RestConnection",aC={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class cC{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=e+"://"+t.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===hi?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(t,e,r,s,i){const o=_a(),c=this.zo(t,e.toUriEncodedString());N(jo,`Sending RPC '${t}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,s,i);const{host:h}=new URL(c),f=Yn(h);return this.Jo(t,c,u,r,f).then((p=>(N(jo,`Received RPC '${t}' ${o}: `,p),p)),(p=>{throw $n(jo,`RPC '${t}' ${o} failed with error: `,p,"url: ",c,"request:",r),p}))}Ho(t,e,r,s,i,o){return this.Go(t,e,r,s,i)}jo(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+nr})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,i)=>t[i]=s)),r&&r.headers.forEach(((s,i)=>t[i]=s))}zo(t,e){const r=aC[t];return`${this.Uo}/v1/${e}:${r}`}terminate(){}}/**
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
 */class uC{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}}/**
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
 */const Rt="WebChannelConnection";class lC extends cC{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,r,s,i){const o=_a();return new Promise(((c,u)=>{const h=new np;h.setWithCredentials(!0),h.listenOnce(rp.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case $s.NO_ERROR:const p=h.getResponseJson();N(Rt,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(p)),c(p);break;case $s.TIMEOUT:N(Rt,`RPC '${t}' ${o} timed out`),u(new O(P.DEADLINE_EXCEEDED,"Request time out"));break;case $s.HTTP_ERROR:const m=h.getStatus();if(N(Rt,`RPC '${t}' ${o} failed with status:`,m,"response text:",h.getResponseText()),m>0){let A=h.getResponseJson();Array.isArray(A)&&(A=A[0]);const S=A==null?void 0:A.error;if(S&&S.status&&S.message){const k=(function(L){const x=L.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(x)>=0?x:P.UNKNOWN})(S.status);u(new O(k,S.message))}else u(new O(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new O(P.UNAVAILABLE,"Connection failed."));break;default:F(9055,{l_:t,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{N(Rt,`RPC '${t}' ${o} completed.`)}}));const f=JSON.stringify(s);N(Rt,`RPC '${t}' ${o} sending request:`,s),h.send(e,"POST",f,r,15)}))}T_(t,e,r){const s=_a(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],o=op(),c=ip(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,e,r),u.encodeInitMessageHeaders=!0;const f=i.join("");N(Rt,`Creating RPC '${t}' stream ${s}: ${f}`,u);const p=o.createWebChannel(f,u);this.I_(p);let m=!1,A=!1;const S=new uC({Yo:V=>{A?N(Rt,`Not sending because RPC '${t}' stream ${s} is closed:`,V):(m||(N(Rt,`Opening RPC '${t}' stream ${s} transport.`),p.open(),m=!0),N(Rt,`RPC '${t}' stream ${s} sending:`,V),p.send(V))},Zo:()=>p.close()}),k=(V,L,x)=>{V.listen(L,(q=>{try{x(q)}catch(at){setTimeout((()=>{throw at}),0)}}))};return k(p,vr.EventType.OPEN,(()=>{A||(N(Rt,`RPC '${t}' stream ${s} transport opened.`),S.o_())})),k(p,vr.EventType.CLOSE,(()=>{A||(A=!0,N(Rt,`RPC '${t}' stream ${s} transport closed`),S.a_(),this.E_(p))})),k(p,vr.EventType.ERROR,(V=>{A||(A=!0,$n(Rt,`RPC '${t}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),S.a_(new O(P.UNAVAILABLE,"The operation could not be completed")))})),k(p,vr.EventType.MESSAGE,(V=>{var L;if(!A){const x=V.data[0];K(!!x,16349);const q=x,at=(q==null?void 0:q.error)||((L=q[0])==null?void 0:L.error);if(at){N(Rt,`RPC '${t}' stream ${s} received error:`,at);const Bt=at.status;let gt=(function(T){const I=ht[T];if(I!==void 0)return Bp(I)})(Bt),w=at.message;gt===void 0&&(gt=P.INTERNAL,w="Unknown error status: "+Bt+" with message "+at.message),A=!0,S.a_(new O(gt,w)),p.close()}else N(Rt,`RPC '${t}' stream ${s} received:`,x),S.u_(x)}})),k(c,sp.STAT_EVENT,(V=>{V.stat===oa.PROXY?N(Rt,`RPC '${t}' stream ${s} detected buffering proxy`):V.stat===oa.NOPROXY&&N(Rt,`RPC '${t}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{S.__()}),0),S}terminate(){this.c_.forEach((t=>t.close())),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter((e=>e===t))}}function $o(){return typeof document<"u"?document:null}/**
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
 */function Ji(n){return new pb(n,!0)}/**
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
 */class mc{constructor(t,e,r=1e3,s=1.5,i=6e4){this.Mi=t,this.timerId=e,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const e=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-r);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),t()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const fh="PersistentStream";class eg{constructor(t,e,r,s,i,o,c,u){this.Mi=t,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new mc(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(t){this.Q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===P.RESOURCE_EXHAUSTED?(Ae(e.toString()),Ae("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.r_(e)}K_(){}auth(){this.state=1;const t=this.W_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===e&&this.G_(r,s)}),(r=>{t((()=>{const s=new O(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(t,e){const r=this.W_(this.D_);this.stream=this.j_(t,e),this.stream.Xo((()=>{r((()=>this.listener.Xo()))})),this.stream.t_((()=>{r((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return N(fh,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Mi.enqueueAndForget((()=>this.D_===t?e():(N(fh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class hC extends eg{constructor(t,e,r,s,i,o){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,o),this.serializer=i}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=yb(this.serializer,t),r=(function(i){if(!("targetChange"in i))return B.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?B.min():o.readTime?zt(o.readTime):B.min()})(t);return this.listener.H_(e,r)}Y_(t){const e={};e.database=ga(this.serializer),e.addTarget=(function(i,o){let c;const u=o.target;if(c=ha(u)?{documents:Eb(i,u)}:{query:wb(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=qp(i,o.resumeToken);const h=fa(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(B.min())>0){c.readTime=mi(i,o.snapshotVersion.toTimestamp());const h=fa(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,t);const r=Ab(this.serializer,t);r&&(e.labels=r),this.q_(e)}Z_(t){const e={};e.database=ga(this.serializer),e.removeTarget=t,this.q_(e)}}class dC extends eg{constructor(t,e,r,s,i,o){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,o),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return K(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,K(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){K(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=Tb(t.writeResults,t.commitTime),r=zt(t.commitTime);return this.listener.na(r,e)}ra(){const t={};t.database=ga(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map((r=>Jp(this.serializer,r)))};this.q_(e)}}/**
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
 */class fC{}class pC extends fC{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new O(P.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,e,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Go(t,pa(e,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new O(P.UNKNOWN,i.toString())}))}Ho(t,e,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.Ho(t,pa(e,r),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new O(P.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class gC{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ae(e),this.aa=!1):N("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const _n="RemoteStore";class mC{constructor(t,e,r,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((o=>{r.enqueueAndForget((async()=>{En(this)&&(N(_n,"Restarting streams for network reachability change."),await(async function(u){const h=$(u);h.Ea.add(4),await ds(h),h.Ra.set("Unknown"),h.Ea.delete(4),await Gi(h)})(this))}))})),this.Ra=new gC(r,s)}}async function Gi(n){if(En(n))for(const t of n.da)await t(!0)}async function ds(n){for(const t of n.da)await t(!1)}function ng(n,t){const e=$(n);e.Ia.has(t.targetId)||(e.Ia.set(t.targetId,t),Ec(e)?Tc(e):ir(e).O_()&&yc(e,t))}function _c(n,t){const e=$(n),r=ir(e);e.Ia.delete(t),r.O_()&&rg(e,t),e.Ia.size===0&&(r.O_()?r.L_():En(e)&&e.Ra.set("Unknown"))}function yc(n,t){if(n.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(B.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}ir(n).Y_(t)}function rg(n,t){n.Va.Ue(t),ir(n).Z_(t)}function Tc(n){n.Va=new lb({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),At:t=>n.Ia.get(t)||null,ht:()=>n.datastore.serializer.databaseId}),ir(n).start(),n.Ra.ua()}function Ec(n){return En(n)&&!ir(n).x_()&&n.Ia.size>0}function En(n){return $(n).Ea.size===0}function sg(n){n.Va=void 0}async function _C(n){n.Ra.set("Online")}async function yC(n){n.Ia.forEach(((t,e)=>{yc(n,t)}))}async function TC(n,t){sg(n),Ec(n)?(n.Ra.ha(t),Tc(n)):n.Ra.set("Unknown")}async function EC(n,t,e){if(n.Ra.set("Online"),t instanceof $p&&t.state===2&&t.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ia.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ia.delete(c),s.Va.removeTarget(c))})(n,t)}catch(r){N(_n,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Ti(n,r)}else if(t instanceof Ws?n.Va.Ze(t):t instanceof jp?n.Va.st(t):n.Va.tt(t),!e.isEqual(B.min()))try{const r=await tg(n.localStore);e.compareTo(r)>=0&&await(function(i,o){const c=i.Va.Tt(o);return c.targetChanges.forEach(((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ia.get(h);f&&i.Ia.set(h,f.withResumeToken(u.resumeToken,o))}})),c.targetMismatches.forEach(((u,h)=>{const f=i.Ia.get(u);if(!f)return;i.Ia.set(u,f.withResumeToken(Ct.EMPTY_BYTE_STRING,f.snapshotVersion)),rg(i,u);const p=new xe(f.target,u,h,f.sequenceNumber);yc(i,p)})),i.remoteSyncer.applyRemoteEvent(c)})(n,e)}catch(r){N(_n,"Failed to raise snapshot:",r),await Ti(n,r)}}async function Ti(n,t,e){if(!sr(t))throw t;n.Ea.add(1),await ds(n),n.Ra.set("Offline"),e||(e=()=>tg(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{N(_n,"Retrying IndexedDB access"),await e(),n.Ea.delete(1),await Gi(n)}))}function ig(n,t){return t().catch((e=>Ti(n,e,t)))}async function Ki(n){const t=$(n),e=Qe(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:nc;for(;wC(t);)try{const s=await nC(t.localStore,r);if(s===null){t.Ta.length===0&&e.L_();break}r=s.batchId,IC(t,s)}catch(s){await Ti(t,s)}og(t)&&ag(t)}function wC(n){return En(n)&&n.Ta.length<10}function IC(n,t){n.Ta.push(t);const e=Qe(n);e.O_()&&e.X_&&e.ea(t.mutations)}function og(n){return En(n)&&!Qe(n).x_()&&n.Ta.length>0}function ag(n){Qe(n).start()}async function AC(n){Qe(n).ra()}async function vC(n){const t=Qe(n);for(const e of n.Ta)t.ea(e.mutations)}async function bC(n,t,e){const r=n.Ta.shift(),s=uc.from(r,t,e);await ig(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Ki(n)}async function CC(n,t){t&&Qe(n).X_&&await(async function(r,s){if((function(o){return Up(o)&&o!==P.ABORTED})(s.code)){const i=r.Ta.shift();Qe(r).B_(),await ig(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Ki(r)}})(n,t),og(n)&&ag(n)}async function ph(n,t){const e=$(n);e.asyncQueue.verifyOperationInProgress(),N(_n,"RemoteStore received new credentials");const r=En(e);e.Ea.add(3),await ds(e),r&&e.Ra.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await Gi(e)}async function SC(n,t){const e=$(n);t?(e.Ea.delete(2),await Gi(e)):t||(e.Ea.add(2),await ds(e),e.Ra.set("Unknown"))}function ir(n){return n.ma||(n.ma=(function(e,r,s){const i=$(e);return i.sa(),new hC(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:_C.bind(null,n),t_:yC.bind(null,n),r_:TC.bind(null,n),H_:EC.bind(null,n)}),n.da.push((async t=>{t?(n.ma.B_(),Ec(n)?Tc(n):n.Ra.set("Unknown")):(await n.ma.stop(),sg(n))}))),n.ma}function Qe(n){return n.fa||(n.fa=(function(e,r,s){const i=$(e);return i.sa(),new dC(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:AC.bind(null,n),r_:CC.bind(null,n),ta:vC.bind(null,n),na:bC.bind(null,n)}),n.da.push((async t=>{t?(n.fa.B_(),await Ki(n)):(await n.fa.stop(),n.Ta.length>0&&(N(_n,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
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
 */class wc{constructor(t,e,r,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new ye,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,i){const o=Date.now()+r,c=new wc(t,e,o,s,i);return c.start(r),c}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(P.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ic(n,t){if(Ae("AsyncQueue",`${t}: ${n}`),sr(n))return new O(P.UNAVAILABLE,`${t}: ${n}`);throw n}/**
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
 */class xn{static emptySet(t){return new xn(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||U.comparator(e.key,r.key):(e,r)=>U.comparator(e.key,r.key),this.keyedMap=br(),this.sortedSet=new ot(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,r)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof xn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new xn;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
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
 */class gh{constructor(){this.ga=new ot(U.comparator)}track(t){const e=t.doc.key,r=this.ga.get(e);r?t.type!==0&&r.type===3?this.ga=this.ga.insert(e,t):t.type===3&&r.type!==1?this.ga=this.ga.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.ga=this.ga.remove(e):t.type===1&&r.type===2?this.ga=this.ga.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):F(63341,{Rt:t,pa:r}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal(((e,r)=>{t.push(r)})),t}}class Jn{constructor(t,e,r,s,i,o,c,u,h){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(t,e,r,s,i){const o=[];return e.forEach((c=>{o.push({type:0,doc:c})})),new Jn(t,e,xn.emptySet(e),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&$i(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class RC{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((t=>t.Da()))}}class PC{constructor(){this.queries=mh(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,r){const s=$(e),i=s.queries;s.queries=mh(),i.forEach(((o,c)=>{for(const u of c.Sa)u.onError(r)}))})(this,new O(P.ABORTED,"Firestore shutting down"))}}function mh(){return new Tn((n=>Cp(n)),$i)}async function cg(n,t){const e=$(n);let r=3;const s=t.query;let i=e.queries.get(s);i?!i.ba()&&t.Da()&&(r=2):(i=new RC,r=t.Da()?0:1);try{switch(r){case 0:i.wa=await e.onListen(s,!0);break;case 1:i.wa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(o){const c=Ic(o,`Initialization of query '${Rn(t.query)}' failed`);return void t.onError(c)}e.queries.set(s,i),i.Sa.push(t),t.va(e.onlineState),i.wa&&t.Fa(i.wa)&&Ac(e)}async function ug(n,t){const e=$(n),r=t.query;let s=3;const i=e.queries.get(r);if(i){const o=i.Sa.indexOf(t);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=t.Da()?0:1:!i.ba()&&t.Da()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function kC(n,t){const e=$(n);let r=!1;for(const s of t){const i=s.query,o=e.queries.get(i);if(o){for(const c of o.Sa)c.Fa(s)&&(r=!0);o.wa=s}}r&&Ac(e)}function VC(n,t,e){const r=$(n),s=r.queries.get(t);if(s)for(const i of s.Sa)i.onError(e);r.queries.delete(t)}function Ac(n){n.Ca.forEach((t=>{t.next()}))}var ya,_h;(_h=ya||(ya={})).Ma="default",_h.Cache="cache";class lg{constructor(t,e,r){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Jn(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const r=e!=="Offline";return(!this.options.qa||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=Jn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==ya.Cache}}/**
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
 */class hg{constructor(t){this.key=t}}class dg{constructor(t){this.key=t}}class DC{constructor(t,e){this.query=t,this.Ya=e,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=J(),this.mutatedKeys=J(),this.eu=Sp(t),this.tu=new xn(this.eu)}get nu(){return this.Ya}ru(t,e){const r=e?e.iu:new gh,s=e?e.tu:this.tu;let i=e?e.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((f,p)=>{const m=s.get(f),A=qi(this.query,p)?p:null,S=!!m&&this.mutatedKeys.has(m.key),k=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let V=!1;m&&A?m.data.isEqual(A.data)?S!==k&&(r.track({type:3,doc:A}),V=!0):this.su(m,A)||(r.track({type:2,doc:A}),V=!0,(u&&this.eu(A,u)>0||h&&this.eu(A,h)<0)&&(c=!0)):!m&&A?(r.track({type:0,doc:A}),V=!0):m&&!A&&(r.track({type:1,doc:m}),V=!0,(u||h)&&(c=!0)),V&&(A?(o=o.add(A),i=k?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{tu:o,iu:r,Cs:c,mutatedKeys:i}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const i=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const o=t.iu.ya();o.sort(((f,p)=>(function(A,S){const k=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F(20277,{Rt:V})}};return k(A)-k(S)})(f.type,p.type)||this.eu(f.doc,p.doc))),this.ou(r),s=s??!1;const c=e&&!s?this._u():[],u=this.Xa.size===0&&this.current&&!s?1:0,h=u!==this.Za;return this.Za=u,o.length!==0||h?{snapshot:new Jn(this.query,t.tu,i,o,t.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new gh,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(t){return!this.Ya.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach((e=>this.Ya=this.Ya.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Ya=this.Ya.delete(e))),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Xa;this.Xa=J(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))}));const e=[];return t.forEach((r=>{this.Xa.has(r)||e.push(new dg(r))})),this.Xa.forEach((r=>{t.has(r)||e.push(new hg(r))})),e}cu(t){this.Ya=t.Qs,this.Xa=J();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return Jn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const vc="SyncEngine";class NC{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class OC{constructor(t){this.key=t,this.hu=!1}}class MC{constructor(t,e,r,s,i,o){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new Tn((c=>Cp(c)),$i),this.Iu=new Map,this.Eu=new Set,this.du=new ot(U.comparator),this.Au=new Map,this.Ru=new dc,this.Vu={},this.mu=new Map,this.fu=Wn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function LC(n,t,e=!0){const r=yg(n);let s;const i=r.Tu.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await fg(r,t,e,!0),s}async function xC(n,t){const e=yg(n);await fg(e,t,!0,!1)}async function fg(n,t,e,r){const s=await rC(n.localStore,ae(t)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,e);let c;return r&&(c=await FC(n,t,i,o==="current",s.resumeToken)),n.isPrimaryClient&&e&&ng(n.remoteStore,s),c}async function FC(n,t,e,r,s){n.pu=(p,m,A)=>(async function(k,V,L,x){let q=V.view.ru(L);q.Cs&&(q=await uh(k.localStore,V.query,!1).then((({documents:w})=>V.view.ru(w,q))));const at=x&&x.targetChanges.get(V.targetId),Bt=x&&x.targetMismatches.get(V.targetId)!=null,gt=V.view.applyChanges(q,k.isPrimaryClient,at,Bt);return Th(k,V.targetId,gt.au),gt.snapshot})(n,p,m,A);const i=await uh(n.localStore,t,!0),o=new DC(t,i.Qs),c=o.ru(i.documents),u=hs.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),h=o.applyChanges(c,n.isPrimaryClient,u);Th(n,e,h.au);const f=new NC(t,e,o);return n.Tu.set(t,f),n.Iu.has(e)?n.Iu.get(e).push(t):n.Iu.set(e,[t]),h.snapshot}async function UC(n,t,e){const r=$(n),s=r.Tu.get(t),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter((o=>!$i(o,t)))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await ma(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),e&&_c(r.remoteStore,s.targetId),Ta(r,s.targetId)})).catch(rr)):(Ta(r,s.targetId),await ma(r.localStore,s.targetId,!0))}async function BC(n,t){const e=$(n),r=e.Tu.get(t),s=e.Iu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),_c(e.remoteStore,r.targetId))}async function jC(n,t,e){const r=GC(n);try{const s=await(function(o,c){const u=$(o),h=st.now(),f=c.reduce(((A,S)=>A.add(S.key)),J());let p,m;return u.persistence.runTransaction("Locally write mutations","readwrite",(A=>{let S=ve(),k=J();return u.Ns.getEntries(A,f).next((V=>{S=V,S.forEach(((L,x)=>{x.isValidDocument()||(k=k.add(L))}))})).next((()=>u.localDocuments.getOverlayedDocuments(A,S))).next((V=>{p=V;const L=[];for(const x of c){const q=sb(x,p.get(x.key).overlayedDocument);q!=null&&L.push(new en(x.key,q,Tp(q.value.mapValue),Ut.exists(!0)))}return u.mutationQueue.addMutationBatch(A,h,L,c)})).next((V=>{m=V;const L=V.applyToLocalDocumentSet(p,k);return u.documentOverlayCache.saveOverlays(A,V.batchId,L)}))})).then((()=>({batchId:m.batchId,changes:Pp(p)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(o,c,u){let h=o.Vu[o.currentUser.toKey()];h||(h=new ot(W)),h=h.insert(c,u),o.Vu[o.currentUser.toKey()]=h})(r,s.batchId,e),await fs(r,s.changes),await Ki(r.remoteStore)}catch(s){const i=Ic(s,"Failed to persist write");e.reject(i)}}async function pg(n,t){const e=$(n);try{const r=await tC(e.localStore,t);t.targetChanges.forEach(((s,i)=>{const o=e.Au.get(i);o&&(K(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?K(o.hu,14607):s.removedDocuments.size>0&&(K(o.hu,42227),o.hu=!1))})),await fs(e,r,t)}catch(r){await rr(r)}}function yh(n,t,e){const r=$(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Tu.forEach(((i,o)=>{const c=o.view.va(t);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const u=$(o);u.onlineState=c;let h=!1;u.queries.forEach(((f,p)=>{for(const m of p.Sa)m.va(c)&&(h=!0)})),h&&Ac(u)})(r.eventManager,t),s.length&&r.Pu.H_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function $C(n,t,e){const r=$(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Au.get(t),i=s&&s.key;if(i){let o=new ot(U.comparator);o=o.insert(i,wt.newNoDocument(i,B.min()));const c=J().add(i),u=new Wi(B.min(),new Map,new ot(W),o,c);await pg(r,u),r.du=r.du.remove(i),r.Au.delete(t),bc(r)}else await ma(r.localStore,t,!1).then((()=>Ta(r,t,e))).catch(rr)}async function qC(n,t){const e=$(n),r=t.batch.batchId;try{const s=await Zb(e.localStore,t);mg(e,r,null),gg(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await fs(e,s)}catch(s){await rr(s)}}async function HC(n,t,e){const r=$(n);try{const s=await(function(o,c){const u=$(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((p=>(K(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(h,p)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(r.localStore,t);mg(r,t,e),gg(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await fs(r,s)}catch(s){await rr(s)}}function gg(n,t){(n.mu.get(t)||[]).forEach((e=>{e.resolve()})),n.mu.delete(t)}function mg(n,t,e){const r=$(n);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),r.Vu[r.currentUser.toKey()]=s}}function Ta(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Iu.get(t))n.Tu.delete(r),e&&n.Pu.yu(r,e);n.Iu.delete(t),n.isPrimaryClient&&n.Ru.jr(t).forEach((r=>{n.Ru.containsKey(r)||_g(n,r)}))}function _g(n,t){n.Eu.delete(t.path.canonicalString());const e=n.du.get(t);e!==null&&(_c(n.remoteStore,e),n.du=n.du.remove(t),n.Au.delete(e),bc(n))}function Th(n,t,e){for(const r of e)r instanceof hg?(n.Ru.addReference(r.key,t),zC(n,r)):r instanceof dg?(N(vc,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,t),n.Ru.containsKey(r.key)||_g(n,r.key)):F(19791,{wu:r})}function zC(n,t){const e=t.key,r=e.path.canonicalString();n.du.get(e)||n.Eu.has(r)||(N(vc,"New document in limbo: "+e),n.Eu.add(r),bc(n))}function bc(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const t=n.Eu.values().next().value;n.Eu.delete(t);const e=new U(rt.fromString(t)),r=n.fu.next();n.Au.set(r,new OC(e)),n.du=n.du.insert(e,r),ng(n.remoteStore,new xe(ae(ji(e.path)),r,"TargetPurposeLimboResolution",Fi.ce))}}async function fs(n,t,e){const r=$(n),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach(((c,u)=>{o.push(r.pu(u,t,e).then((h=>{var f;if((h||e)&&r.isPrimaryClient){const p=h?!h.fromCache:(f=e==null?void 0:e.targetChanges.get(u.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(h){s.push(h);const p=pc.As(u.targetId,h);i.push(p)}})))})),await Promise.all(o),r.Pu.H_(s),await(async function(u,h){const f=$(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>R.forEach(h,(m=>R.forEach(m.Es,(A=>f.persistence.referenceDelegate.addReference(p,m.targetId,A))).next((()=>R.forEach(m.ds,(A=>f.persistence.referenceDelegate.removeReference(p,m.targetId,A)))))))))}catch(p){if(!sr(p))throw p;N(gc,"Failed to update sequence numbers: "+p)}for(const p of h){const m=p.targetId;if(!p.fromCache){const A=f.Ms.get(m),S=A.snapshotVersion,k=A.withLastLimboFreeSnapshotVersion(S);f.Ms=f.Ms.insert(m,k)}}})(r.localStore,i))}async function WC(n,t){const e=$(n);if(!e.currentUser.isEqual(t)){N(vc,"User change. New user:",t.toKey());const r=await Zp(e.localStore,t);e.currentUser=t,(function(i,o){i.mu.forEach((c=>{c.forEach((u=>{u.reject(new O(P.CANCELLED,o))}))})),i.mu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await fs(e,r.Ls)}}function JC(n,t){const e=$(n),r=e.Au.get(t);if(r&&r.hu)return J().add(r.key);{let s=J();const i=e.Iu.get(t);if(!i)return s;for(const o of i){const c=e.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}function yg(n){const t=$(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=pg.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=JC.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=$C.bind(null,t),t.Pu.H_=kC.bind(null,t.eventManager),t.Pu.yu=VC.bind(null,t.eventManager),t}function GC(n){const t=$(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=qC.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=HC.bind(null,t),t}class Ei{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Ji(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return Yb(this.persistence,new Kb,t.initialUser,this.serializer)}Cu(t){return new Yp(fc.mi,this.serializer)}Du(t){return new iC}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ei.provider={build:()=>new Ei};class KC extends Ei{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){K(this.persistence.referenceDelegate instanceof yi,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Ob(r,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?Ft.withCacheSize(this.cacheSizeBytes):Ft.DEFAULT;return new Yp((r=>yi.mi(r,e)),this.serializer)}}class Ea{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>yh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=WC.bind(null,this.syncEngine),await SC(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new PC})()}createDatastore(t){const e=Ji(t.databaseInfo.databaseId),r=(function(i){return new lC(i)})(t.databaseInfo);return(function(i,o,c,u){return new pC(i,o,c,u)})(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return(function(r,s,i,o,c){return new mC(r,s,i,o,c)})(this.localStore,this.datastore,t.asyncQueue,(e=>yh(this.syncEngine,e,0)),(function(){return dh.v()?new dh:new oC})())}createSyncEngine(t,e){return(function(s,i,o,c,u,h,f){const p=new MC(s,i,o,c,u,h);return f&&(p.gu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await(async function(s){const i=$(s);N(_n,"RemoteStore shutting down."),i.Ea.add(5),await ds(i),i.Aa.shutdown(),i.Ra.set("Unknown")})(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}Ea.provider={build:()=>new Ea};/**
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
 */class Tg{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):Ae("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
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
 */class QC{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new O(P.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const e=await(async function(s,i){const o=$(s),c={documents:i.map((p=>_i(o.serializer,p)))},u=await o.Ho("BatchGetDocuments",o.serializer.databaseId,rt.emptyPath(),c,i.length),h=new Map;u.forEach((p=>{const m=_b(o.serializer,p);h.set(m.key.toString(),m)}));const f=[];return i.forEach((p=>{const m=h.get(p.toString());K(!!m,55234,{key:p}),f.push(m)})),f})(this.datastore,t);return e.forEach((r=>this.recordVersion(r))),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(t.toString())}delete(t){this.write(new cc(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach((e=>{t.delete(e.key.toString())})),t.forEach(((e,r)=>{const s=U.fromPath(r);this.mutations.push(new Fp(s,this.precondition(s)))})),await(async function(r,s){const i=$(r),o={writes:s.map((c=>Jp(i.serializer,c)))};await i.Go("Commit",i.serializer.databaseId,rt.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw F(50498,{Gu:t.constructor.name});e=B.min()}const r=this.readVersions.get(t.key.toString());if(r){if(!e.isEqual(r))throw new O(P.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?e.isEqual(B.min())?Ut.exists(!1):Ut.updateTime(e):Ut.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(B.min()))throw new O(P.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Ut.updateTime(e)}return Ut.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}/**
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
 */class XC{constructor(t,e,r,s,i){this.asyncQueue=t,this.datastore=e,this.options=r,this.updateFunction=s,this.deferred=i,this.zu=r.maxAttempts,this.M_=new mc(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_((async()=>{const t=new QC(this.datastore),e=this.Hu(t);e&&e.then((r=>{this.asyncQueue.enqueueAndForget((()=>t.commit().then((()=>{this.deferred.resolve(r)})).catch((s=>{this.Yu(s)}))))})).catch((r=>{this.Yu(r)}))}))}Hu(t){try{const e=this.updateFunction(t);return!us(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Yu(t){this.zu>0&&this.Zu(t)?(this.zu-=1,this.asyncQueue.enqueueAndForget((()=>(this.Ju(),Promise.resolve())))):this.deferred.reject(t)}Zu(t){if((t==null?void 0:t.name)==="FirebaseError"){const e=t.code;return e==="aborted"||e==="failed-precondition"||e==="already-exists"||!Up(e)}return!1}}/**
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
 */const Xe="FirestoreClient";class YC{constructor(t,e,r,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=s,this.user=Pt.UNAUTHENTICATED,this.clientId=tc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{N(Xe,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(N(Xe,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new ye;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Ic(e,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function qo(n,t){n.asyncQueue.verifyOperationInProgress(),N(Xe,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Zp(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=t}async function Eh(n,t){n.asyncQueue.verifyOperationInProgress();const e=await ZC(n);N(Xe,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener((r=>ph(t.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>ph(t.remoteStore,s))),n._onlineComponents=t}async function ZC(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N(Xe,"Using user provided OfflineComponentProvider");try{await qo(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;$n("Error using user provided cache. Falling back to memory cache: "+e),await qo(n,new Ei)}}else N(Xe,"Using default OfflineComponentProvider"),await qo(n,new KC(void 0));return n._offlineComponents}async function Cc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N(Xe,"Using user provided OnlineComponentProvider"),await Eh(n,n._uninitializedComponentsProvider._online)):(N(Xe,"Using default OnlineComponentProvider"),await Eh(n,new Ea))),n._onlineComponents}function tS(n){return Cc(n).then((t=>t.syncEngine))}function eS(n){return Cc(n).then((t=>t.datastore))}async function wa(n){const t=await Cc(n),e=t.eventManager;return e.onListen=LC.bind(null,t.syncEngine),e.onUnlisten=UC.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=xC.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=BC.bind(null,t.syncEngine),e}function nS(n,t,e={}){const r=new ye;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,h){const f=new Tg({next:m=>{f.Nu(),o.enqueueAndForget((()=>ug(i,p)));const A=m.docs.has(c);!A&&m.fromCache?h.reject(new O(P.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&m.fromCache&&u&&u.source==="server"?h.reject(new O(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(m)},error:m=>h.reject(m)}),p=new lg(ji(c.path),f,{includeMetadataChanges:!0,qa:!0});return cg(i,p)})(await wa(n),n.asyncQueue,t,e,r))),r.promise}/**
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
 */function Eg(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
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
 */const wh=new Map;/**
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
 */const wg="firestore.googleapis.com",Ih=!0;class Ah{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new O(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=wg,this.ssl=Ih}else this.host=t.host,this.ssl=t.ssl??Ih;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Xp;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Db)throw new O(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}mv("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Eg(t.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Sc{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ah({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new O(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new O(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ah(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new iv;switch(r.type){case"firstParty":return new uv(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new O(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=wh.get(e);r&&(N("ComponentProvider","Removing Datastore"),wh.delete(e),r.terminate())})(this),Promise.resolve()}}function rS(n,t,e,r={}){var h;n=Te(n,Sc);const s=Yn(t),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},c=`${t}:${e}`;s&&(ff(`https://${c}`),pf("Firestore",!0)),i.host!==wg&&i.host!==c&&$n("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:r};if(!fn(u,o)&&(n._setSettings(u),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=Pt.MOCK_USER;else{f=kE(r.mockUserToken,(h=n._app)==null?void 0:h.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new O(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Pt(m)}n._authCredentials=new ov(new cp(f,p))}}/**
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
 */class Qi{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Qi(this.firestore,t,this._query)}}class pt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Kr(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new pt(this.firestore,t,this._key)}toJSON(){return{type:pt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(cs(e,pt._jsonSchema))return new pt(t,r||null,new U(rt.fromString(e.referencePath)))}}pt._jsonSchemaVersion="firestore/documentReference/1.0",pt._jsonSchema={type:ft("string",pt._jsonSchemaVersion),referencePath:ft("string")};class Kr extends Qi{constructor(t,e,r){super(t,e,ji(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new pt(this.firestore,null,new U(t))}withConverter(t){return new Kr(this.firestore,t,this._path)}}function ps(n,t,...e){if(n=At(n),arguments.length===1&&(t=tc.newId()),gv("doc","path",t),n instanceof Sc){const r=rt.fromString(t,...e);return xl(r),new pt(n,null,new U(r))}{if(!(n instanceof pt||n instanceof Kr))throw new O(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(rt.fromString(t,...e));return xl(r),new pt(n.firestore,n instanceof Kr?n.converter:null,new U(r))}}/**
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
 */const vh="AsyncQueue";class bh{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new mc(this,"async_queue_retry"),this._c=()=>{const r=$o();r&&N(vh,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=t;const e=$o();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=$o();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new ye;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Xu.push(t),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!sr(t))throw t;N(vh,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((r=>{throw this.nc=r,this.rc=!1,Ae("INTERNAL UNHANDLED ERROR: ",Ch(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=e,e}enqueueAfterDelay(t,e,r){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=wc.createAndSchedule(this,t,e,r,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&F(47125,{Pc:Ch(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then((()=>{this.tc.sort(((e,r)=>e.targetTimeMs-r.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}dc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function Ch(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function Sh(n){return(function(e,r){if(typeof e!="object"||e===null)return!1;const s=e;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}class Gn extends Sc{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new bh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new bh(t),this._firestoreClient=void 0,await t}}}function sS(n,t){const e=typeof n=="object"?n:yf(),r=typeof n=="string"?n:hi,s=ja(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=RE("firestore");i&&rS(s,...i)}return s}function Xi(n){if(n._terminated)throw new O(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||iS(n),n._firestoreClient}function iS(n){var r,s,i;const t=n._freezeSettings(),e=(function(c,u,h,f){return new Sv(c,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Eg(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)})(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,t);n._componentsProvider||(s=t.localCache)!=null&&s._offlineComponentProvider&&((i=t.localCache)!=null&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new YC(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&(function(c){const u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}})(n._componentsProvider))}/**
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
 */class $t{constructor(t){this._byteString=t}static fromBase64String(t){try{return new $t(Ct.fromBase64String(t))}catch(e){throw new O(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new $t(Ct.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:$t._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(cs(t,$t._jsonSchema))return $t.fromBase64String(t.bytes)}}$t._jsonSchemaVersion="firestore/bytes/1.0",$t._jsonSchema={type:ft("string",$t._jsonSchemaVersion),bytes:ft("string")};/**
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
 */class Yi{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new O(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new bt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class Zi{constructor(t){this._methodName=t}}/**
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
 */class ce{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new O(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new O(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return W(this._lat,t._lat)||W(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ce._jsonSchemaVersion}}static fromJSON(t){if(cs(t,ce._jsonSchema))return new ce(t.latitude,t.longitude)}}ce._jsonSchemaVersion="firestore/geoPoint/1.0",ce._jsonSchema={type:ft("string",ce._jsonSchemaVersion),latitude:ft("number"),longitude:ft("number")};/**
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
 */class ue{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,t._values)}toJSON(){return{type:ue._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(cs(t,ue._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new ue(t.vectorValues);throw new O(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ue._jsonSchemaVersion="firestore/vectorValue/1.0",ue._jsonSchema={type:ft("string",ue._jsonSchemaVersion),vectorValues:ft("object")};/**
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
 */const oS=/^__.*__$/;class aS{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new en(t,this.data,this.fieldMask,e,this.fieldTransforms):new ls(t,this.data,e,this.fieldTransforms)}}class Ig{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new en(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Ag(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F(40011,{Ac:n})}}class Rc{constructor(t,e,r,s,i,o){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new Rc({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.Vc({path:e,fc:!1});return r.gc(t),r}yc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.Vc({path:e,fc:!1});return r.Rc(),r}wc(t){return this.Vc({path:void 0,fc:!0})}Sc(t){return wi(t,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}Rc(){if(this.path)for(let t=0;t<this.path.length;t++)this.gc(this.path.get(t))}gc(t){if(t.length===0)throw this.Sc("Document fields must not be empty");if(Ag(this.Ac)&&oS.test(t))throw this.Sc('Document fields cannot begin and end with "__"')}}class cS{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Ji(t)}Cc(t,e,r,s=!1){return new Rc({Ac:t,methodName:e,Dc:r,path:bt.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function vg(n){const t=n._freezeSettings(),e=Ji(n._databaseId);return new cS(n._databaseId,!!t.ignoreUndefinedProperties,e)}function bg(n,t,e,r,s,i={}){const o=n.Cc(i.merge||i.mergeFields?2:0,t,e,s);kc("Data must be an object, but it was:",o,r);const c=Cg(r,o);let u,h;if(i.merge)u=new Ht(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const m=Ia(t,p,e);if(!o.contains(m))throw new O(P.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);Rg(f,m)||f.push(m)}u=new Ht(f),h=o.fieldTransforms.filter((p=>u.covers(p.field)))}else u=null,h=o.fieldTransforms;return new aS(new Lt(c),u,h)}class to extends Zi{_toFieldTransform(t){if(t.Ac!==2)throw t.Ac===1?t.Sc(`${this._methodName}() can only appear at the top level of your update data`):t.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof to}}class Pc extends Zi{_toFieldTransform(t){return new tb(t.path,new Wr)}isEqual(t){return t instanceof Pc}}function uS(n,t,e,r){const s=n.Cc(1,t,e);kc("Data must be an object, but it was:",s,r);const i=[],o=Lt.empty();tn(r,((u,h)=>{const f=Vc(t,u,e);h=At(h);const p=s.yc(f);if(h instanceof to)i.push(f);else{const m=eo(h,p);m!=null&&(i.push(f),o.set(f,m))}}));const c=new Ht(i);return new Ig(o,c,s.fieldTransforms)}function lS(n,t,e,r,s,i){const o=n.Cc(1,t,e),c=[Ia(t,r,e)],u=[s];if(i.length%2!=0)throw new O(P.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<i.length;m+=2)c.push(Ia(t,i[m])),u.push(i[m+1]);const h=[],f=Lt.empty();for(let m=c.length-1;m>=0;--m)if(!Rg(h,c[m])){const A=c[m];let S=u[m];S=At(S);const k=o.yc(A);if(S instanceof to)h.push(A);else{const V=eo(S,k);V!=null&&(h.push(A),f.set(A,V))}}const p=new Ht(h);return new Ig(f,p,o.fieldTransforms)}function eo(n,t){if(Sg(n=At(n)))return kc("Unsupported field value:",t,n),Cg(n,t);if(n instanceof Zi)return(function(r,s){if(!Ag(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.fc&&t.Ac!==4)throw t.Sc("Nested arrays are not supported");return(function(r,s){const i=[];let o=0;for(const c of r){let u=eo(c,s.wc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}})(n,t)}return(function(r,s){if((r=At(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Xv(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=st.fromDate(r);return{timestampValue:mi(s.serializer,i)}}if(r instanceof st){const i=new st(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:mi(s.serializer,i)}}if(r instanceof ce)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof $t)return{bytesValue:qp(s.serializer,r._byteString)};if(r instanceof pt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Sc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:hc(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof ue)return(function(o,c){return{mapValue:{fields:{[_p]:{stringValue:yp},[di]:{arrayValue:{values:o.toArray().map((h=>{if(typeof h!="number")throw c.Sc("VectorValues must only contain numeric values.");return ac(c.serializer,h)}))}}}}}})(r,s);throw s.Sc(`Unsupported field value: ${ec(r)}`)})(n,t)}function Cg(n,t){const e={};return hp(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):tn(n,((r,s)=>{const i=eo(s,t.mc(r));i!=null&&(e[r]=i)})),{mapValue:{fields:e}}}function Sg(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof st||n instanceof ce||n instanceof $t||n instanceof pt||n instanceof Zi||n instanceof ue)}function kc(n,t,e){if(!Sg(e)||!up(e)){const r=ec(e);throw r==="an object"?t.Sc(n+" a custom object"):t.Sc(n+" "+r)}}function Ia(n,t,e){if((t=At(t))instanceof Yi)return t._internalPath;if(typeof t=="string")return Vc(n,t);throw wi("Field path arguments must be of type string or ",n,!1,void 0,e)}const hS=new RegExp("[~\\*/\\[\\]]");function Vc(n,t,e){if(t.search(hS)>=0)throw wi(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Yi(...t.split("."))._internalPath}catch{throw wi(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function wi(n,t,e,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new O(P.INVALID_ARGUMENT,c+n+u)}function Rg(n,t){return n.some((e=>e.isEqual(t)))}/**
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
 */class Ii{constructor(t,e,r,s,i){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new pt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new dS(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Pg("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class dS extends Ii{data(){return super.data()}}function Pg(n,t){return typeof t=="string"?Vc(n,t):t instanceof Yi?t._internalPath:t._delegate._internalPath}/**
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
 */function fS(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new O(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class kg{convertValue(t,e="none"){switch(Ke(t)){case 0:return null;case 1:return t.booleanValue;case 2:return lt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Ge(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw F(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return tn(t,((s,i)=>{r[s]=this.convertValue(i,e)})),r}convertVectorValue(t){var r,s,i;const e=(i=(s=(r=t.fields)==null?void 0:r[di].arrayValue)==null?void 0:s.values)==null?void 0:i.map((o=>lt(o.doubleValue)));return new ue(e)}convertGeoPoint(t){return new ce(lt(t.latitude),lt(t.longitude))}convertArray(t,e){return(t.values||[]).map((r=>this.convertValue(r,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Ui(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(qr(t));default:return null}}convertTimestamp(t){const e=Je(t);return new st(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=rt.fromString(t);K(Qp(r),9688,{name:t});const s=new Hr(r.get(1),r.get(3)),i=new U(r.popFirst(5));return s.isEqual(e)||Ae(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
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
 */function Vg(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}class pS extends kg{constructor(t){super(),this.firestore=t}convertBytes(t){return new $t(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new pt(this.firestore,null,e)}}class Vn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class qe extends Ii{constructor(t,e,r,s,i,o){super(t,e,r,s,o),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Js(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Pg("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new O(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=qe._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}qe._jsonSchemaVersion="firestore/documentSnapshot/1.0",qe._jsonSchema={type:ft("string",qe._jsonSchemaVersion),bundleSource:ft("string","DocumentSnapshot"),bundleName:ft("string"),bundle:ft("string")};class Js extends qe{data(t={}){return super.data(t)}}class Fn{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Vn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((r=>{t.call(e,new Js(this._firestore,this._userDataWriter,r.key,r,new Vn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new O(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const u=new Js(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Vn(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new Js(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Vn(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:gS(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new O(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Fn._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=tc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(e.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function gS(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F(61501,{type:n})}}/**
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
 */function no(n){n=Te(n,pt);const t=Te(n.firestore,Gn);return nS(Xi(t),n._key).then((e=>Dg(t,n,e)))}Fn._jsonSchemaVersion="firestore/querySnapshot/1.0",Fn._jsonSchema={type:ft("string",Fn._jsonSchemaVersion),bundleSource:ft("string","QuerySnapshot"),bundleName:ft("string"),bundle:ft("string")};class Dc extends kg{constructor(t){super(),this.firestore=t}convertBytes(t){return new $t(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new pt(this.firestore,null,e)}}function gs(n,t,e){n=Te(n,pt);const r=Te(n.firestore,Gn),s=Vg(n.converter,t,e);return mS(r,[bg(vg(r),"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,Ut.none())])}function ro(n,...t){var u,h,f;n=At(n);let e={includeMetadataChanges:!1,source:"default"},r=0;typeof t[r]!="object"||Sh(t[r])||(e=t[r++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(Sh(t[r])){const p=t[r];t[r]=(u=p.next)==null?void 0:u.bind(p),t[r+1]=(h=p.error)==null?void 0:h.bind(p),t[r+2]=(f=p.complete)==null?void 0:f.bind(p)}let i,o,c;if(n instanceof pt)o=Te(n.firestore,Gn),c=ji(n._key.path),i={next:p=>{t[r]&&t[r](Dg(o,n,p))},error:t[r+1],complete:t[r+2]};else{const p=Te(n,Qi);o=Te(p.firestore,Gn),c=p._query;const m=new Dc(o);i={next:A=>{t[r]&&t[r](new Fn(o,m,p,A))},error:t[r+1],complete:t[r+2]},fS(n._query)}return(function(m,A,S,k){const V=new Tg(k),L=new lg(A,V,S);return m.asyncQueue.enqueueAndForget((async()=>cg(await wa(m),L))),()=>{V.Nu(),m.asyncQueue.enqueueAndForget((async()=>ug(await wa(m),L)))}})(Xi(o),c,s,i)}function mS(n,t){return(function(r,s){const i=new ye;return r.asyncQueue.enqueueAndForget((async()=>jC(await tS(r),s,i))),i.promise})(Xi(n),t)}function Dg(n,t,e){const r=e.docs.get(t._key),s=new Dc(n);return new qe(n,s,t._key,r,new Vn(e.hasPendingWrites,e.fromCache),t.converter)}/**
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
 */const _S={maxAttempts:5};function Sr(n,t){if((n=At(n)).firestore!==t)throw new O(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
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
 */class yS{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=vg(t)}get(t){const e=Sr(t,this._firestore),r=new pS(this._firestore);return this._transaction.lookup([e._key]).then((s=>{if(!s||s.length!==1)return F(24041);const i=s[0];if(i.isFoundDocument())return new Ii(this._firestore,r,i.key,i,e.converter);if(i.isNoDocument())return new Ii(this._firestore,r,e._key,null,e.converter);throw F(18433,{doc:i})}))}set(t,e,r){const s=Sr(t,this._firestore),i=Vg(s.converter,e,r),o=bg(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,o),this}update(t,e,r,...s){const i=Sr(t,this._firestore);let o;return o=typeof(e=At(e))=="string"||e instanceof Yi?lS(this._dataReader,"Transaction.update",i._key,e,r,s):uS(this._dataReader,"Transaction.update",i._key,e),this._transaction.update(i._key,o),this}delete(t){const e=Sr(t,this._firestore);return this._transaction.delete(e._key),this}}/**
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
 */class TS extends yS{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=Sr(t,this._firestore),r=new Dc(this._firestore);return super.get(t).then((s=>new qe(this._firestore,r,e._key,s._document,new Vn(!1,!1),e.converter)))}}function ES(n,t,e){n=Te(n,Gn);const r={..._S,...e};return(function(i){if(i.maxAttempts<1)throw new O(P.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r),(function(i,o,c){const u=new ye;return i.asyncQueue.enqueueAndForget((async()=>{const h=await eS(i);new XC(i.asyncQueue,h,c,o,u).ju()})),u.promise})(Xi(n),(s=>t(new TS(n,s))),r)}function or(){return new Pc("serverTimestamp")}(function(t,e=!0){(function(s){nr=s})(Zn),Bn(new pn("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new Gn(new av(r.getProvider("auth-internal")),new lv(o,r.getProvider("app-check-internal")),(function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new O(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Hr(h.options.projectId,f)})(o,s),o);return i={useFetchStreams:e,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),Be(Nl,Ol,t),Be(Nl,Ol,"esm2020")})();const Ho=(n="")=>n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),bn=(n,t)=>{if(typeof t=="string"&&t.trim())return t.trim();throw new Error(`Missing required environment variable: ${n}`)},wS={apiKey:bn("VITE_FIREBASE_API_KEY","AIzaSyCrb9srW-7b00s6xIljzvicUZ_tXO4DeYo"),authDomain:bn("VITE_FIREBASE_AUTH_DOMAIN","auth.3dlocalprint.com"),projectId:bn("VITE_FIREBASE_PROJECT_ID","threedlocalprint"),storageBucket:bn("VITE_FIREBASE_STORAGE_BUCKET","threedlocalprint.firebasestorage.app"),messagingSenderId:bn("VITE_FIREBASE_MESSAGING_SENDER_ID","770972495364"),appId:bn("VITE_FIREBASE_APP_ID","1:770972495364:web:b1015eaaf0de32d9b84f51")},Ng=_f(wS),Kn=rv(Ng),Rh=new ge,ar=sS(Ng),Ai=ps(ar,"filament_inventory","list"),Nc=ps(ar,"filament_types","list"),Oc=ps(ar,"manufacturers","list"),Mc=ps(ar,"admins","list"),Og=ps(ar,"ledger","entries"),Ph=(n="")=>n.trim().toLowerCase(),Lc=n=>(Array.isArray(n)?n:[]).map(t=>{if(typeof t=="string")return{label:t.trim(),iconUrl:""};if(t&&typeof t=="object"){const e=String(t.label||"").trim(),r=String(t.iconUrl||"").trim();return{label:e,iconUrl:r}}return null}).filter(t=>!!(t!=null&&t.label)),IS=()=>typeof navigator<"u"&&/iPad|iPhone|iPod/i.test(navigator.userAgent||""),AS=async()=>{const n=[{key:"indexedDB",value:Kf},{key:"local",value:qf},{key:"session",value:Ka}];let t=null;for(const e of n)try{return await qI(Kn,e.value),{persistence:e.key,error:null}}catch(r){t=r,console.warn(`Failed to set ${e.key} persistence`,r)}return{persistence:"none",error:t}},vS=async()=>{let n=null,t=null;try{t=await TA(Kn)}catch(r){n=r,console.error("Firebase redirect sign-in failed",r)}const e=await AS();return{redirectError:n,redirectResult:t,persistence:e}},bS=async()=>{try{return await hA(Kn,Rh)}catch(n){if(!IS())throw n;return console.warn("Popup sign-in failed on iOS, falling back to redirect",n),_A(Kn,Rh)}},CS=()=>JI(Kn),SS=n=>WI(Kn,n),cR=async()=>{const n=await no(Ai);if(!n.exists())return null;const t=n.data();return Array.isArray(t.items)?t.items:[]},uR=n=>gs(Ai,{items:n,updatedAt:or()},{merge:!0}),lR=async()=>{const n=await no(Nc);if(!n.exists())return null;const t=n.data();return Array.isArray(t.items)?t.items:[]},hR=n=>ro(Nc,t=>{if(!t.exists()){n(null);return}const e=t.data();n(Array.isArray(e.items)?e.items:[])},t=>{console.error("Failed to subscribe to filament types",t),n(null)}),dR=n=>gs(Nc,{items:n,updatedAt:or()},{merge:!0}),fR=async({location:n="",adjustments:t={}}={})=>{const e=Ho(n),r=Object.entries(t).filter(([,s])=>Number(s));if(!(!e||!r.length))return ES(ar,async s=>{const i=await s.get(Ai);if(!i.exists())throw new Error("Filament inventory list not found.");const o=i.data(),c=Array.isArray(o.items)?o.items:[],u=c.map(f=>{if(Ho(f.location||"")!==e)return f;const p=f.filament_type_id||"";if(!p||!(p in t))return f;const m=Number(t[p])||0;if(!m)return f;const A=Number(f.spool_inventory)||0,S=Math.max(0,A+m);return{...f,spool_inventory:S}}),h=new Set(c.filter(f=>Ho(f.location||"")===e).map(f=>f.filament_type_id).filter(Boolean));r.forEach(([f,p])=>{const m=Number(p)||0;m<=0||h.has(f)||u.push({filament_type_id:f,location:n,spool_inventory:m})}),s.set(Ai,{items:u,updatedAt:or()},{merge:!0})})},pR=async()=>{const n=await no(Oc);if(!n.exists())return null;const t=n.data();return Lc(t.items)},gR=n=>ro(Oc,t=>{if(!t.exists()){n(null);return}const e=t.data();n(Lc(e.items))},t=>{console.error("Failed to subscribe to 🏭 manufacturers",t),n(null)}),mR=n=>ro(Mc,t=>{if(!t.exists()){n(null);return}const e=t.data();n(Array.isArray(e.items)?e.items:[])},t=>{console.error("Failed to subscribe to admins",t),n(null)}),_R=n=>gs(Oc,{items:Lc(n),updatedAt:or()},{merge:!0}),RS=async()=>{const n=await no(Mc);if(!n.exists())return[];const t=n.data();return Array.isArray(t.items)?t.items:[]},PS=async(n="")=>(await RS()).map(Ph).includes(Ph(n)),yR=n=>gs(Mc,{items:n,updatedAt:or()},{merge:!0}),kS=(n=[])=>(Array.isArray(n)?n:[]).map(t=>{const e=Number(t.amount);if(!Number.isFinite(e)||e===0)throw new Error("Ledger amount must be a non-zero number.");const r=String(t.title||"").trim();if(!r)throw new Error("Ledger title is required.");const s=String(t.applicableDate||"");if(!/^\d{4}-\d{2}-\d{2}$/.test(s))throw new Error("Ledger applicable date must be a valid YYYY-MM-DD value.");const i=String(t.id||"").trim();if(!i)throw new Error("Ledger id is required.");return{id:i,amount:e,title:r,billingCategory:String(t.billingCategory||"").trim()||"",applicableDate:s,notes:String(t.notes||"").trim(),status:["pending","posted","reconciled"].includes(t.status)?t.status:"posted",createdAt:Number(t.createdAt)||Date.now(),updatedAt:Number(t.updatedAt)||Date.now()}}),TR=n=>gs(Og,{items:kS(n),updatedAt:or()},{merge:!0}),ER=n=>ro(Og,t=>{if(!t.exists()){n([]);return}const e=t.data();n(Array.isArray(e.items)?e.items:[])},t=>{console.error("Failed to subscribe to ledger entries",t),n([])}),Mg=Z((n,t,e,r,s)=>(Mg.updates(i=>{[n,t,e,r,s]=i}),n==="loading"?Vo.class`panel auth-panel`(Do("Checking login...")):n==="denied"?Vo.class`panel auth-panel`(nl("Access denied"),Do.class`auth-warning`(()=>t||"This account"," is not authorized."),rl.class`auth-actions`(el.type`button`.class`add-button`.onClick(s)("Sign out"))):Vo.class`panel auth-panel`(nl("Sign in"),Do("Use Google to access the filament inventory."),rl.class`auth-actions`(el.type`button`.class`add-button`.onClick(r)("Sign in with Google"))))),VS=n=>{const t=n==null?void 0:n.current;if(!t)return null;const e=t.cloneNode(!1);return t.replaceWith(e),n.current=e,e},DS=({rootRef:n,status:t,userEmail:e,adminEmail:r,onSignIn:s,onSignOut:i,setAppMounted:o})=>{const c=VS(n);if(!c)return;o&&o(!1),c.replaceChildren();const u=Z(()=>Mg(t,e,r,s,i));QT(u,c)},kh="toast-root",NS=6e3,OS=()=>{let n=document.getElementById(kh);return n||(n=document.createElement("div"),n.id=kh,n.className="toast-root",document.body.appendChild(n),n)},MS=(n,t)=>{const e=document.createElement("div");return e.className=`toast toast-${t}`,e.setAttribute("role","status"),e.textContent=n,e},zo=(n,t={})=>{if(!n)return;const{tone:e="info",duration:r=NS}=t,s=OS(),i=MS(n,e);s.appendChild(i);const o=window.setTimeout(()=>{i.remove()},r);i.addEventListener("click",()=>{window.clearTimeout(o),i.remove()},{once:!0})},wR={info:(n,t)=>zo(n,{...t,tone:"info"}),success:(n,t)=>zo(n,{...t,tone:"success"}),error:(n,t)=>zo(n,{...t,tone:"error"})},LS=async({user:n,mountSso:t,toast:e,onDenied:r,onPermissionsError:s}={})=>{let i=!1;try{i=await PS((n==null?void 0:n.email)||"")}catch(o){return console.error("Failed to load admin list",o),typeof s=="function"&&s(o),e!=null&&e.error&&e.error("Unable to verify access. Check Firestore rules."),typeof t=="function"&&t("denied",(n==null?void 0:n.email)||"","auth:permissions"),!1}return i?!0:(typeof r=="function"&&r(),e!=null&&e.error&&e.error(`Signed in as ${(n==null?void 0:n.email)||"unknown"} but not authorized.`),typeof t=="function"&&t("denied",(n==null?void 0:n.email)||"","auth:denied"),!1)},xS=async({user:n,mountSso:t,toast:e,setCurrentUser:r,onSignedOut:s,onDenied:i,onAuthorized:o,reason:c=""}={})=>n?(typeof r=="function"&&r({email:n.email||"",photoURL:n.photoURL||""}),await LS({user:n,mountSso:t,toast:e,onDenied:i,onPermissionsError:i})?(typeof o=="function"&&o(n,c),!0):!1):(typeof r=="function"&&r(null),typeof s=="function"&&s(),typeof t=="function"&&t("login","","auth:logged-out"),!1),FS=({onUser:n,toast:t})=>{if(typeof n!="function")throw new Error("startAuthFlow requires an onUser callback.");vS().then(({redirectError:e,redirectResult:r,persistence:s})=>{var i,o;e&&((i=t==null?void 0:t.error)==null||i.call(t,"Sign-in failed after redirect. Try again.")),s!=null&&s.error&&((o=t==null?void 0:t.error)==null||o.call(t,"Safari blocked login storage. Check cookie settings.")),r!=null&&r.user&&n(r.user,"redirectResult")}).catch(e=>{var r;console.error("Failed to prepare auth",e),(r=t==null?void 0:t.error)==null||r.call(t,"Sign-in setup failed. Try again.")}),SS(e=>{n(e,"onAuthChanged")})},IR=({rootRef:n,toast:t,setAppMounted:e,setCurrentUser:r,onAuthorized:s,onSignedOut:i,onDenied:o,onAfterSsoMount:c,initialStatus:u="loading",initialReason:h="initial"})=>{const f={isAuthorized:!1},p=async()=>CS().catch(S=>{var k;console.error("Firebase sign-out failed",S),(k=t==null?void 0:t.error)==null||k.call(t,"Sign out failed. Try again.")}),m=(S,k="",V="")=>{n!=null&&n.current&&(DS({rootRef:n,status:S,userEmail:k,adminEmail:"",onSignIn:()=>bS().catch(L=>{var x;console.error("Firebase sign-in failed",L),(x=t==null?void 0:t.error)==null||x.call(t,"Sign in failed. Try again.")}),onSignOut:p,setAppMounted:e}),typeof c=="function"&&c())};return m(u,"",h),FS({onUser:async(S,k="")=>{f.isAuthorized=!1,await xS({user:S,mountSso:m,toast:t,setCurrentUser:r,onSignedOut:i,onDenied:o,onAuthorized:(L,x)=>{f.isAuthorized=!0,s==null||s({user:L,reason:x,authState:f,handleSignOut:p,mountSso:m})},reason:k})},toast:t}),{authState:f,handleSignOut:p,mountSso:m}};export{M as $,XS as A,ZS as B,eR as C,YS as D,GS as E,HS as F,ER as G,TR as H,BT as I,jT as J,UT as K,Vt as L,gT as M,Gs as N,Gt as O,mR as P,yR as Q,rT as R,BS as S,JS as T,WS as U,Q as V,Ho as W,uR as X,lR as Y,cR as Z,pR as _,nR as a,xd as a0,wT as a1,KS as a2,vT as a3,fR as a4,el as b,nl as c,rl as d,IR as e,wR as f,iR as g,zS as h,rR as i,QT as j,oR as k,sR as l,qS as m,jS as n,$S as o,Do as p,Dd as q,VS as r,Vo as s,Z as t,hR as u,gR as v,dR as w,_R as x,QS as y,tR as z};
