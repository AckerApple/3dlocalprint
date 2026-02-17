var fm=Object.defineProperty;var pm=(n,t,e)=>t in n?fm(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var te=(n,t,e)=>pm(n,typeof t!="symbol"?t+"":t,e);function yn(n){return n.renderCount=n.renderCount||0,n.varCounter=0,n.state={newer:{state:[],states:[]}},n.global={blocked:[]}}function Qs(){return st.stateConfig.support}function bi(n){return Mt(n.context),st.stateConfig.support=n}const Ot=function(){};let Nt=[];const Xs=[];let re=[],Yt=[],hn=[];const it={locks:0};function gm(n,t){t.textContent=n}function Zt(){it.locks>0||mm()}function mm(){++it.locks,Tm(),--it.locks,_m()}function _m(){Em();const n=hn;hn=[];for(const t of n)t[0](...t[1])}function ym(){for(const n of Xs)n[0](...n[1])}function Tm(){const n=Xs.length;ym(),Xs.splice(0,n);for(const t of re)t[0](...t[1]);for(const t of Yt)t[0](...t[1]);for(const t of Nt)t[0](...t[1])}function Em(){Nt=[],re=[],Yt=[]}function xr(n,t){Xs.push([wm,[n,t]])}function wm(n,t){const e=n.parentNode;n||console.debug("no element by",{_caller:t,element:n}),e||console.debug("no parentNode by",{_caller:t,element:n}),e.removeChild(n)}function ze(n,t,e){n.parentNode.insertBefore(t,n)}function se(n,t){n.appendChild(t)}const Un=typeof document=="object"&&document.createElement("div");function Im(n){return Un.innerHTML=n,document.createTextNode(Un.innerHTML)}function Ph(n,t,e=Ot,r){const s=Im(t);ze(n,s),e(s)}function vm(n,t,e=Ot){Un.innerHTML=t;const r=document.createTextNode(Un.textContent);ze(n,r),e(r)}function Am(n,t,e){Un.innerHTML=t;const r=document.createTextNode(Un.textContent);se(n,r),e(r)}const Tn="";var Ys;(function(n){n.string="string",n.number="number",n.boolean="boolean",n.undefined="undefined"})(Ys||(Ys={}));var X;(function(n){n.function="function",n.date="date",n.unknown="unknown",n.object="object"})(X||(X={}));const bm=Date.now(),G={tag:"html",dom:"dom",templater:"templater",tagComponent:"tagComponent",tagArray:"tagArray",host:"host",subscribe:"subscribe",signal:"signal",renderOnce:"renderOnce",stateRender:"stateRender",version:bm};function kh(n){if(!n)return!1;switch(n.tagJsType){case G.dom:case G.tag:case G.templater:return!0}return!1}function Xr(n){const t=n==null?void 0:n.tagJsType;return t===G.tagComponent||t===G.stateRender}function Cm(n){return Ci(n)&&typeof n.subscribe===X.function}function Xn(n){return n&&We(n.then)}function We(n){return typeof n===X.function}function Ci(n){return typeof n===X.object&&n!==null}function Jt(n){return Array.isArray(n)}function va(n){const t=n.state;if(t&&t.newest&&t.newest)return t.newest;if(n.parentContext)return va(n.parentContext)}function Yr(n){let t=n;for(;t.ownerSupport&&!Xr(t.templater);)t=t.ownerSupport;const r=t.context.state;return r&&r.newest||t}function Sm(...n){return n}function Vh(n){const t=st.stateConfig;return t.states[t.statesIndex]=n,++t.statesIndex,n(Sm)}function Rm(n){const t=st.stateConfig,e=t.statesIndex,u=Yr(t.prevSupport).context.state.older.states[e];let h=[];u(function(...m){return h=m,u.lastValues=h,m});const f=function(...m){return h};return t.states[t.statesIndex]=n,++t.statesIndex,n(f)}function Dh(n){Mt(n);const t=st.stateConfig;t.handlers.handler=Nh,t.handlers.statesHandler=Vh,t.rearray=[];const e=t.state=[],r=t.states=[];t.statesIndex=0;const s=n.state=n.state||{};s.newer={state:e,states:r}}class Pm{}function km(n){const[t]=n(Pm),[e]=n(t);return[t,e]}function Vm(n){const t=n.callback;if(!t)return n.defaultValue;const[e]=km(t);return e}function Dm(){const n=st.stateConfig,e=n.rearray[n.state.length];return n.state.push(e),e.defaultValue}function Nh(n){var o,c;const t=st.stateConfig,e=oe();if(!e||!e.state){const u="State requested but TaggedJs is not currently rendering a tag or host";throw console.error(u,{config:t,context:e,function:(c=(o=t.support)==null?void 0:o.templater.wrapper)==null?void 0:c.original}),new Error(u)}const r=e.state.newer;t.state=r.state;let s=n;if(typeof n===X.function&&(s=n()),typeof s===X.function){const u=s;s=function(...f){return u(...f)},s.original=u}const i={get:function(){return Vm(i)},defaultValue:s};return t.state.push(i),s}function Nm(n){const t=new Y,e=r=>{const s=[],i=[],o=(p,m)=>{if(s[m]=!0,i[m]=p,s.length===n.length){for(const S of s)if(!S)return;r(i,h)}},c=[...n],h=c.shift().subscribe(p=>o(p,0)),f=c.map((p,m)=>p.subscribe(v=>o(v,m+1)));return h.subscriptions=f,h};return t.subscribeWith=e,t}function Om(n,t){const e=n.findIndex(r=>r.callback===t);e!==-1&&n.splice(e,1)}function Mm(n,t,e){const r=Y.globalSubCount$;Y.globalSubCount$.next(r.value+1);const s=function(){s.unsubscribe()};return s.callback=t,s.subscriptions=[],s.unsubscribe=function(){return Lm(s,e,t)},s.add=i=>(s.subscriptions.push(i),s),s.next=i=>{t(i,s)},s}function Oh(n,t,e){const r=[...t],s=r.shift(),i=f=>{if(r.length)return Oh(f,r,e);e(f)};let o=i;const h=s(n,{setHandler:f=>o=f,next:i});o(h)}function Lm(n,t,e){Om(t,e);const r=Y.globalSubCount$;Y.globalSubCount$.next(r.value-1),n.unsubscribe=()=>n;const s=n.subscriptions;for(const i of s)i.unsubscribe();return n}const Dn=class Dn{constructor(t,e){te(this,"onSubscription");te(this,"methods",[]);te(this,"isSubject",!0);te(this,"subscribers",[]);te(this,"subscribeWith");te(this,"value");te(this,"set",this.next.bind(this));this.onSubscription=e,arguments.length>0&&(this.value=t)}subscribe(t){const e=Mm(this,t,this.subscribers),r=this.subscribeWith;if(r){if(this.methods.length){const s=t;t=i=>{Oh(i,this.methods,o=>s(o,e))}}return r(t)}return this.subscribers.push(e),this.onSubscription&&this.onSubscription(e),e}next(t){this.value=t,this.emit()}emit(){const t=this.value,e=this.subscribers;for(const r of e)r.callback(t,r)}toPromise(){return new Promise(t=>{this.subscribe((e,r)=>{r.unsubscribe(),t(e)})})}toCallback(t){const e=this.subscribe((r,s)=>{const i=s==null?void 0:s.unsubscribe;i?i():setTimeout(()=>e.unsubscribe(),0),t(r)});return e}pipe(...t){const e=[];"value"in this&&e.push(this.value);const r=new Dn(...e);return r.setMethods(t),r.subscribeWith=s=>this.subscribe(s),r.next=s=>this.next(s),r}setMethods(t){this.methods=t}static all(t){const e=t.map(r=>Cm(r)?r:new Dn(r,i=>(i.next(r),i)));return Nm(e)}};te(Dn,"globalSubCount$",new Dn(0));let Y=Dn;const xm=new Y(void 0,function(t){Qs()||t.next()}),st={stateConfig:{state:[],version:Date.now(),handlers:{handler:Nh,statesHandler:Vh}},tagClosed$:xm};function Fm(n,t){const r=n.templater.tag.values;for(const s of t)Um(r,s,n);return t}function Um(n,t,e){if(t.deleted)return;const r=t.valueIndex,s=n[r],i=t.tagJsVar;Mt(t),i.processUpdate(s,t,e,n),Rt(),t.value=s}function Mh(n,t){if(!n)return;console.log("context",{olderSupport:n,newerSupport:t});const r=n.context.contexts;Bm(n,t),++it.locks,Fm(n,r),--it.locks,Zt()}function Bm(n,t){const e=t.templater,r=t.templater.tag,s=e.values||r.values,i=n.templater.tag;i.values=s}function jm(n,t){return Jo(n,t)}function Jo(n,t){if(n===null||typeof n!==X.object||t<0)return n;if(n instanceof Date)return new Date(n);if(n instanceof RegExp)return new RegExp(n);const e=Jt(n)?[]:Object.create(Object.getPrototypeOf(n));if(Jt(n))for(let r=0;r<n.length;r++)e[r]=Jo(n[r],t-1);else for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=Jo(n[r],t-1));return e}function Lh(n,t,e){return Aa(n,t,e)}function Aa(n,t,e){return n===t||qm(n,t)||e<0?!0:typeof n===X.object&&typeof t===X.object?n instanceof Date&&t instanceof Date?n.getTime()===t.getTime():Jt(n)&&Jt(t)?Hm(n,t,e-1):Jt(n)||Jt(t)?!1:$m(n,t,e-1):!1}function $m(n,t,e){const r=Object.keys(n),s=Object.keys(t);if(r.length===0&&s.length===0)return!0;if(r.length!==s.length)return!1;for(const i of r)if(!s.includes(i)||!Aa(n[i],t[i],e-1))return!1;return!0}function Hm(n,t,e){if(n.length!==t.length)return!1;for(let r=0;r<n.length;r++)if(!Aa(n[r],t[r],e-1))return!1;return!0}function qm(n,t){return We(n)&&We(t)&&n.toString()===t.toString()}function Uu(n){return n.map(ba)}function ba(n,t){const e=n,r=n==null?void 0:n.tagJsType;if(r)switch(r){case G.signal:case G.subscribe:case G.stateRender:return;case G.dom:case G.tag:case G.templater:return Uu(e.values)}return Jt(n)?Uu(e):jm(n,t)}function xh(n,t){const e=n.length;for(let r=0;r<e;++r){const s=n[r],i=t[r];if(Jt(s)&&Jt(i)){if(s===i)continue;return 3}if(!(typeof s===X.function&&typeof i===X.function)){if(typeof s===X.object){if(!s&&!i)continue;if(typeof t===X.object){const o=Object.entries(s);for(const c of o)if(!zm(c,i))return 3.1}continue}if(s!==i)return 3.3}}return!1}function zm([n,t],e){const r=e[n];return typeof t===X.function&&typeof r===X.function?!0:r===t}function Fh(n,t){const e=n.context.providers;if(e)for(const r of e)for(let s=r.children.length-1;s>=0;--s)r.children[s].context.global===t&&r.children.splice(s,1);n.context.destroy$.next(),n.context.renderCount=0}function Go(n,t){for(const e of n){const r=e.lastArray;if(r){Go(r,t);continue}const s=e.value;if((s==null?void 0:s.tagJsType)===G.subscribe){s.destroy(e,t),e.deleted=!0;continue}const i=e.global;if(!i)continue;const o=e.state.newest,c=i.subscriptions;c&&c.forEach(Bh),Xr(o.templater)&&Fh(o,i);const u=e.contexts;Go(u,o),i.deleted=!0}}function Uh(n,t=[],e=[]){for(const r of n){const s=r.global;if(!s)continue;const i=r.state.newest;if(i){t.push(i);const c=s.subscriptions;c&&e.push(...c)}const o=r.contexts;o&&Uh(o,t,e)}return{tags:t,subs:e}}function Bh(n){n.unsubscribe()}function En(n,t,e){const r=t.tagJsVar.tagJsType;return r&&["tag-conversion","element"].includes(r)?(t.tagJsVar.processUpdate(n,t,e,[]),t.value=n,0):n===t.value?0:(++t.updateCount,Oi(t,n,e))}function jh(n,t,e,r,s){const i=t.context;if(i.locked=3,e.target=e.target||r,Mt(e),e.inputsHandler){const o=t.propsConfig;e.inputsHandler(o)}e.tagJsVar.processInit(n,e,t,s,r),Rt(),e.value=n,delete i.locked}function Si(n){switch(n){case void 0:case!1:case null:return Tn}return n}function Wm(n,t){const e=Si(n);if(t.paint){t.paint[1][1]=e;return}const r=t.simpleValueElm;re.push([gm,[e,r]])}function Jm(n,t){t.value=n,t.oldTagJsVar=t.tagJsVar,t.tagJsVar=zh(n);const e=t.placeholder,r=Si(n),s=t.paint=[Ph,[e,r,function(o){t.simpleValueElm=o,delete t.paint},"processNowRegularValue"]];Nt.push(s)}function Zr(n,t){if(n.startsWith("class."))return"class";if(n.startsWith("style."))return"style";const e=Gm(n);return e!==!1?e:n==="value"&&t==="SELECT"?"value":!1}function Gm(n){switch(n){case"autoselect":case"autoSelect":return"autoselect";case"autofocus":case"autoFocus":return"autofocus"}return!1}function Km(n,t,e){typeof n[t]!="object"&&(n[t]={});for(const r in e){const s=e[r];re.push([Ym,[n,t,r,s]])}if(n[t].setProperty)for(const r in e){const s=e[r];re.push([Xm,[n,t,r,s]])}}function Qm(n,t,e){n.setAttribute(t,"")}function Ie(n,t,e){if(Ci(e))return Km(n,t,e);$h(n,t,e)}function Po(n,t,e){e?n[t]=!0:n[t]=!1}function $h(n,t,e){if(n[t]=e,e===void 0||e===!1||e===null){n.removeAttribute(t);return}n.setAttribute(t,e)}function Xm(n,t,e,r){n[t].setProperty(e,r)}function Ym(n,t,e,r){n[t][e]=r}function Hh(n,t,e,r){switch(r){case"autofocus":hn.push([s_,[e]]);return;case"autoselect":hn.push([r_,[e]]);return;case"style":{const s=n.split(".");re.push([Zm,[e,s,t]]);return}case"class":t_(n,t,e);return;case"value":Ie(e,n,t),hn.push([s=>{s.value=t},[e]]);return}throw new Error(`Invalid special attribute of ${r}. ${n}`)}function Zm(n,t,e){const r=t[1];n.style[r]=e,n.style.setProperty(r,e)}function t_(n,t,e){const r=n.split(".");if(r.shift(),t){for(const s of r)re.push([e_,[e,s]]);return}for(const s of r)re.push([n_,[e,s]])}function e_(n,t){n.classList.add(t)}function n_(n,t){n.classList.remove(t)}function r_(n){n.select()}function s_(n){n.focus()}function i_(n,t,e,r,s){const i=n(),o={component:!1,tagJsType:"dynamic-attr",matchesInjection:h=>{const f=c.tagJsVar;if(f.matchesInjection)return f.matchesInjection(h,c)},hasValueChanged:(h,f,p)=>{const m=n();return c.tagJsVar.hasValueChanged(m,c,p)},processInit:Ot,processInitAttribute:Ot,destroy:(h,f)=>{c.tagJsVar.destroy(c,f)},processUpdate:(h,f,p,m)=>{++f.updateCount;const v=h();c.tagJsVar.processUpdate(v,c,p,m),c.value=v}},c={updateCount:0,isAttr:!0,target:r,parentContext:t,value:i,tagJsVar:wn(i),valueIndex:-1,withinOwnerElement:!0,destroy$:new Y,render$:new Y},u={updateCount:0,isAttr:!0,contexts:[c],target:r,parentContext:t,value:n,tagJsVar:o,valueIndex:-1,withinOwnerElement:!0,destroy$:new Y,render$:new Y};return c.tagJsVar.processInitAttribute(e,i,r,c.tagJsVar,c,{},s),u}function o_(n,t,e,r,s,i,o){return e.target=r,e.howToSet=s,e.attrName=n,e.isSpecial=o,t!=null&&t.tagJsType?a_(n,t,e,i,r):Ri(n,t,r,s,o,e)}function a_(n,t,e,r,s){t.processInitAttribute(n,t,s,t,e,r,Ie),e.tagJsVar=t}function Ri(n,t,e,r,s,i){if(typeof t=="function")return i_(t,i,n,e,r);if(s)return Hh(n,t,e,s);r(e,n,t)}function qh(n,t,e,r,s,i){const o=t.tagJsVar,c=n;if(o.hasValueChanged(c,t,e)>0){o.destroy(t,e),r.removeAttribute(s);const h=wn(n);h.isAttr=!0,h.processInitAttribute(s,n,r,h,t,e,i),t.tagJsVar=h;return}}function c_(n,t,e,r,s,i,o){r.destroy=u_,r.hasValueChanged=d_,r.processUpdate=(u,h,f)=>qh(u,h,f,e,n,o);const c=Zr(n,e.tagName);Ri(n,t,e,o,c,s),s.tagJsVar=r}function u_(n){const t=n.target,e=n.attrName;t.removeAttribute(e)}function zh(n){return{component:!1,tagJsType:"simple",value:n,processInitAttribute:c_,processInit:h_,destroy:Wh,hasValueChanged:f_,processUpdate:l_}}function l_(n,t,e){return n===t.value?0:Oi(t,n,e)}function h_(n,t,e,r,s){const i=Si(n);r=t.placeholder;const o=t.paint=[Ph,[r,i,function(u){t.simpleValueElm=u,delete t.paint},"processSimpleValueInit"]];Nt.push(o)}function Wh(n){if(!n.simpleValueElm&&n.paint){n.paint[0]=Ot;return}const t=n.simpleValueElm;delete n.simpleValueElm,xr(t,"deleteSimpleValue")}function d_(n,t){return n==null||n===t.value?0:6}function f_(n,t){return n==null||![X.object,X.function].includes(typeof n)?(Wm(n,t),0):(Wh(t),6)}function p_(n,t){return Jt(n)?0:(Kh(t),9)}function Jh(n){return{component:!1,tagJsType:"array",value:n,processInitAttribute:Ot,processInit:m_,processUpdate:g_,hasValueChanged:p_,destroy:Kh}}function g_(n,t,e){if(++t.updateCount,Array.isArray(n)){Zs(t,n,e);return}En(n,t,e)===0&&Zs(t,n,e)}function m_(n,t,e,r,s){Zs(t,n,e,s)}function wn(n){return(n==null?void 0:n.tagJsType)?n:__(n)}function __(n){return Jt(n)?Jh(n):zh(n)}function ts(n,t,e,r){return{updateCount:0,value:n,destroy$:new Y,render$:new Y,tagJsVar:wn(n),withinOwnerElement:e,parentContext:r,valueIndex:r.varCounter}}function y_(n,t,e,r){const s=ts(n,t,e,r);return t.push(s),++r.varCounter,s}function Ca(n,t,e,r,s){const i=document.createTextNode(Tn),o=ts(n,e,!0,t.context);return o.withinOwnerElement=!1,o.placeholder=i,s||(o.placeholder=r),jh(n,t,o,s,r),s&&Yt.push([se,[s,i]]),o}function Zs(n,t,e,r){const s=n.lastArray===void 0;s&&(n.lastArray=[]);const i=n.lastArray;let o=n.placeholder,c=0;const u=[];if(!s){for(let f=0;f<i.length;++f){const p=i[f];if(p.value===null){u.push(p);continue}const m=w_(t,f,i,c);if(m===0){u.push(p);continue}if(m===2){f=f-1;continue}c=c+m}n.lastArray=u}const h=t.length;for(let f=0;f<h;++f)o=T_(t,f,n.lastArray,e,o,r).placeholder}function T_(n,t,e,r,s,i){const o=Gh(n[t]),c=e[t];if(c)return E_(o,c,e,r,t,s,i);const u=Ca(o,r,e,s,i);return e.push(u),o&&(u.arrayValue=(o==null?void 0:o.arrayValue)||u.arrayValue||t),u}function E_(n,t,e,r,s,i,o){if(e.length>s)return Array.isArray(n)?(t.tagJsVar.processUpdate(n,t,r,[]),t.value=n,t):(En(n,t,r),t);const u=Ca(n,r,e,i,o);return e.push(u),u}function Gh(n){return typeof n=="function"&&n.tagJsType===void 0&&(n=n()),n}function w_(n,t,e,r){const s=n.length-1,i=t-r,o=i<0||s<i,c=e[t];if(o)return Sa(c),1;c.arrayValue===void 0&&(c.arrayValue=t);const u=c.arrayValue,h=Gh(n[t]);return I_(u,h,c,e,t)}function I_(n,t,e,r,s){const i=t.arrayValue||s;return n!==i?(Sa(e),r.splice(s,1),2):0}function Sa(n){const t=n.global;v_(t,n)}function v_(n,t){var e;if(n&&((e=t.state)!=null&&e.oldest)){const r=t.state.oldest;Yn(r,n);return}t.tagJsVar.destroy(t,{})}function Kh(n){++n.updateCount;const t=n.lastArray;Qh(n,t)}function Qh(n,t){for(let e=0;e<t.length;++e)Sa(t[e]);delete n.lastArray}function Fr(n){for(let t=n.length-1;t>=0;--t){const e=n[t];A_(e),n.splice(t,1)}}function A_(n){const t=n.marker;t&&xr(t,"destroyMarker");const e=n.domElement;xr(e,"destroyClone")}function Ra(n,t){n.contexts&&b_(n.contexts,t),n.htmlDomMeta&&Fr(n.htmlDomMeta)}function b_(n,t){var e;for(const r of n){if(r.withinOwnerElement){const u=r.tagJsVar;if(u&&u.tagJsType==="host"){const h=r.supportOwner,f=u.destroy(r,h);Xn(f)&&t.push(f)}continue}const s=r.lastArray;if(s){Qh(r,s);continue}const i=r.simpleValueElm;if(i){delete r.simpleValueElm,xr(i,"smartRemoveByContext");continue}const o=r.global;if(o===void 0)continue;if(o.deleted=!0,(e=r.state)==null?void 0:e.oldest){Ra(r,t);continue}}}function Yn(n,t){const e=n.context;t.deleted=!0,e.renderCount=0;const r=[],s=e.contexts;return Go(s,n),n.templater.wrapper&&Fh(n,t),Ra(e,r),delete e.state,delete e.contexts,delete e.returnValue,delete e.providers,r}function Pi(n,t){var r;const e=Bu(n,t);return!e&&((r=t.templater.tag)!=null&&r._innerHTML)&&Bu(n.outerHTML,t)?!0:e}function Bu(n,t){const e=n.templater,r=t.templater,s=(e==null?void 0:e.tag)||n,i=r.tag;if((e==null?void 0:e.tagJsType)===G.stateRender)return e.dom===r.dom;if(!i&&!s.returnValue)return!0;if(!s.returnValue)return!1;throw new Error(`unknown tagJsType of ${s.tagJsType}`)}function es(n){++n.updateCount;const t=n.global,r=n.state.newest;delete n.inputsHandler,delete n.updatesHandler,Yn(r,t),C_(n)}function C_(n){n.htmlDomMeta=[],delete n.contexts,delete n.state,delete n.global,n.renderCount=0}function S_(n,t){var o;const e=(o=t.state)==null?void 0:o.newest,r=kh(n),s=n;if(r)return Pi(s,e)?0:7;if(n==null?void 0:n.tagJsType){const c=t.value;if(!c&&n)return 88;const u=c.wrapper,h=n.wrapper;return(h==null?void 0:h.original)===(u==null?void 0:u.original)?0:88}return 8}function ki(n,t){var c;const e=t.global,r=(c=t.state)==null?void 0:c.newest,s=kh(n),i=n;if(s)return Pi(i,r)?(Qo(t,n,r),0):(Yn(r,e),yn(t),7);if(n==null?void 0:n.tagJsType){const f=t.state.newest.ownerSupport;return Qo(t,n,f)===!0?0:88}return es(t),8}function R_(n,t,e,r,s,i,o){const c=document.createTextNode(Tn),u=s>0,h=y_(n,t,u,r);return h.placeholder=c,h.target=i,i?Yt.push([se,[i,c]]):Nt.push([ze,[o,c,"attachDynamicDom.attachDynamicDom"]]),jh(n,e,h,i,o),h}function P_(n,t){return k_(n,t)}function k_(n,t,e=[]){const r=n.context;e.push({support:n,renderCount:r.renderCount,provider:t});const s=t.children;for(let i=s.length-1;i>=0;--i){const o=s[i],c=o.context;e.push({support:o,renderCount:c.renderCount,provider:t})}return e}function V_(n){const e=n.context.providers;if(!e)return[];const r=[];for(const s of e){const i=s.owner,o=P_(i,s);r.push(...o.map(D_))}return r}function D_(n){return n.support}function N_(n){const t=n.context;return Da(n.templater)?td(n):Zh(n,n,t)}function Pa(n,t,e){return n}function O_(n){return typeof n!==X.object||!n||n.tagJsType}function M_(n,t,e,r,s,i){var c;const o=Object.keys(n);for(const u of o){const h=n[u],f=t[u],p=ka(f,h,e,r,i,s+1);h===p||(c=Object.getOwnPropertyDescriptor(n,u))!=null&&c.set||(n[u]=p)}return n}function L_(n,t,e,r,s,i){for(let o=n.length-1;o>=0;--o){const c=n[o],u=t[o];n[o]=ka(u,c,e,r,i,s+1)}return n}function ka(n,t,e,r,s,i){return n==null||i>s?t:typeof n===X.function?t.mem?(n.mem=t.mem,t):(n.mem=t,n):O_(t)?t:Jt(t)?L_(t,n,e,r,i,s):M_(t,n,e,r,i,s)}function x_(n,t,e){var m;const r=e.global,s=e.state.newest,i=s.templater.wrapper;let o=t.templater.wrapper,c=!1;const u=t.templater.tagJsType,h=G.stateRender===u||G.renderOnce===u;if(h)c=t.templater.tagJsType===G.renderOnce||Pi(s,t);else if(i&&o){((m=s.templater.tag)==null?void 0:m._innerHTML)&&(o=t.outerHTML);const S=i.original,k=o.original;c=S===k}const f=t.templater;if(!c){B_(e,f,n);return}if(h||vT(s,f)){if(e.locked){r.blocked.push(t);return}Ur(t),++e.renderCount}}function F_(n,t,e,r,s,i=-1){const o=t.context;if(!o.global||!o.state.newest){const v=Pa(r);r.push(...v);const S=n.propsConfig;return S.castProps=v,r}t=o.state.newest||t;const f=t.propsConfig.castProps,p=[];for(let v=0;v<r.length;++v){const S=r[v],k=f[v],V=ka(k,S,n,e,s,i+1);p.push(V)}const m=n.propsConfig;return m.castProps=p,p}function U_(n,t){const e=n.context,r=e.global;let s=-1;const i=e.providers=e.providers||[],o=i.length-1;for(;s++<o;){const c=i[s];let u=-1;const h=c.children.length-1;for(;u++<h;){const f=c.children[u];if(r===f.context.global){c.children.splice(u,1),c.children.push(t);return}}}}function B_(n,t,e){const r=n.global,s=n.state.oldest;Yn(s,r),yn(n),t.processInit(t,n,e,n.placeholder)}function Ko(n){const t=n.context,e=t.global,r=t.contexts;if(console.log("contexts",{contexts:r,context:t}),r){const{subs:s,tags:i}=Uh(r);for(const c of i){if(c.context.global.deleted===!0)return;ju(c.context)}e.subscriptions&&s.forEach(Bh)}ju(t),yn(t)}function ju(n){n.global.deleted=!0,Ra(n,[]),delete n.contexts}function Xh(n,t,e,r){const s=t.original,i=n.tagJsType===G.stateRender,o=st.stateConfig;bi(e);let c;if(i?c=n():(c=s(...r),typeof c===X.function&&c.tagJsType===void 0&&(c=c())),!c)throw new Error(`A tag cannot return a value of type ${c===null?"null":typeof c}`);const u=e.context;return u.returnValue=c,e.returnValue=c,n.tag=c,u.state.newer={...o},u.inputsHandler&&u.inputsHandler(r),Rt(),e}function j_(n,t){const e=n.context;++e.renderCount,$_(n.context),st.tagClosed$.next(t)}function $_(n){H_(n),q_()}function H_(n){const t=st.stateConfig,e=n||t.context;e.state=e.state||{},e.state.newer={...t};const r=t.support;e.state.newest=r}function q_(){const n=st.stateConfig;delete n.prevSupport,delete n.support,delete n.state,delete n.states,Rt()}function Yh(n,t,e,r){let s;const i=n.templater;if(i.tagJsType===G.stateRender){const o=i;s=rs(i,e,r,n.appSupport),Xh(i,o,s)}else{const o=i.wrapper;s=o(n,e,t)}return j_(s,r),s.ownerSupport=n.ownerSupport,s}function z_(n){const t=st.stateConfig;return t.rearray=n,t.state=[],t.states=[],t.statesIndex=0,t.handlers.handler=Dm,t.handlers.statesHandler=Rm,t}function W_(n,t,e){z_(e);const r=st.stateConfig;r.prevSupport=t,bi(n)}function J_(n,t,e,r){const i=e.state.older.state;return W_(n,t,i),Yh(n,t,e,r)}function Va(n,t,e,r){Dh(n.context),bi(n);const s=Yh(n,t,e,r);return Rt(),s}function G_(n){var r;const t=n==null?void 0:n.context,e=t==null?void 0:t.state;return(r=e==null?void 0:e.older)==null?void 0:r.state}function K_(n,t,e){let r;G_(t)?r=J_(n,t,e):r=Va(n,t,e);const i=!t||Pi(t,r);if(i){if(t){const o=t.templater.tag;if(o&&e.renderCount>0){const c=t==null?void 0:t.templater,u=c==null?void 0:c.tag;Q_(o,t,u)}}}else{U_(t,r),Ko(t);const o=r.context;o.state.oldest=r,o.state.newest=r}return r.ownerSupport=n.ownerSupport,{support:r,wasLikeTags:i}}function Q_(n,t,e){if(n.tagJsType===G.dom){const r=e==null?void 0:e.dom,s=n.dom;r!==s&&Ko(t);return}if(e){const r=e.strings;if(r){const s=r==null?void 0:r.length,i=n.strings.length;s!==i&&Ko(t)}}}function Zh(n,t,e){const r=K_(t,n,e);if(r.wasLikeTags){const s=e.state.oldest;return Mh(s,r.support),r.support}return Ed(t,e)}function Da(n){return G.templater===n.tagJsType}function Ur(n){const t=n.context,e=t.global,r=n.templater,s=Da(r);if(t.locked)return e.blocked.push(n),n;if(s)return td(n);t.locked=4,e.blocked.length&&(n=e.blocked.pop(),e.blocked=[]);const i=Zh(t.state.newest,n,t);return delete t.locked,i}function td(n){const r=Yr(n).context.state.newest;return Ur(r)}function X_(n,t){const e=t.context.global;return e&&e.deleted?!1:!!Y_(n,t)}function Y_(n,t){const e=n.props,s=t.propsConfig.latest;if(ed(e,s))return!0;switch(n.propWatch){case Bt.IMMUTABLE:return Fd(e,s);case Bt.SHALLOW:return xh(e,s)}return!Lh(e,s,Di)}function ed(n,t){const e=n.length,r=t.length;return e!==r}function ti(n,t=[]){const e=n.context,r=n.templater,s=Da(r),i=n.ownerSupport;if(e.locked)return t.push(n),t;if(s)return ti(i,t);const o=n.context.global;if(o&&o.deleted===!0)return t;const c=n,u=Xr(c.templater),h=n.templater.tagJsType,p=i&&h!==G.stateRender&&(!u||X_(c.templater,c));if(c.context.providers){const v=V_(c);t.push(...v)}return p?(ti(i,t),u&&t.push(c),t):(t.push(c),t)}function Na(n){++it.locks,n.forEach(Z_),--it.locks,Zt()}function Z_(n){const t=n.context;if(!t.global){t.tagJsVar.processUpdate(t.value,t,n.ownerSupport,[]);return}const r=t.state;Ur(r.newest)}function nd(n,t,{resolvePromise:e,resolveValue:r}){return Xn(n)?n.then(ty(t,e)):r(n)}function ty(n,t){return e=>{const r=n.context,s=r.global;if(r.deleted===!0||(s==null?void 0:s.deleted)===!0)return t(e);const i=ti(n);return Na(i),t(e)}}function ey(n,t){const e=t.context.global,r=function(i,o){if(e.deleted!==!0)return ny(r.tagFunction,r.support,i,o)};return r.tagFunction=n,r.support=t,r}function ny(n,t,e,r){const s=Yr(t),i=s.context;i.locked=1;const o=n.apply(e,r);return delete i.locked,rd(o,s)}function rd(n,t){const e=t.context.global;if(e!=null&&e.deleted)return;const r=ti(t);return Na(r),nd(n,t,{resolvePromise:iy,resolveValue:oy})}const ry="no-data-ever",sy="promise-no-data-ever";function iy(){return sy}function oy(){return ry}function sd(n,t,e){const r=e[t];if(r){let i=!1;if(n.originalStopPropagation=n.stopPropagation,n.stopPropagation=function(){i=!0,n.originalStopPropagation.call(n),n.stopPropagation=n.originalStopPropagation,delete n.originalStopPropagation},r(n),n.defaultPrevented||i)return}const s=e.parentNode;s&&sd(n,t,s)}function id(n,t,e,r){const s=n.appElement,i=ay(t);t==="blur"&&(t="focusout");const c=n.context.events;if(!c[t]){const u=function(f){sd(f,i,f.target)};c[t]=u,s.addEventListener(t,u)}e[i]=r,e[t]=r}function ay(n){return n==="blur"&&(n="focusout"),"_"+n}function od(n,t,e,r){const s=function(...i){return s.tagFunction(n,i)};s.tagFunction=t,s.support=e,id(e.appSupport,r,n,s)}function ad(n){return n==null||n===!1}function cd(n,t,e,r,s,i,o){if(ad(t))return;const c=[];if(typeof t===X.object){for(const u in t){const h=Zr(u,e.tagName),f=t[u],m=hd(u,f,n,e,r,Ie,i,o,h);m!==void 0&&(Array.isArray(m)?c.push(...m):c.push(m))}return c}t.length!==0&&s(e,t,Tn)}function cy(n,t,e,r,s,i,o,c){if(e){if(ad(t)||t===""){r.removeAttribute(e);return}if(typeof e===X.object)if(typeof t===X.object)for(const f in e)f in t||re.push([$u,[r,f]]);else for(const f in e)re.push([$u,[r,f]])}const u=cd(n,t,r,s,i,o,c);u&&o.push(...u)}function $u(n,t){n.removeAttribute(t)}function ud(n,t,e,r){const s=t,i=n;if(i!=null&&i.tagJsType){const c=t.value;if(!(c!=null&&c.tagJsType)){i.isAttr=!0,Mt(t),i.processInitAttribute(s.attrName,n,s.target,i,s,e,Ie),Rt(),s.tagJsVar=i;return}c.hasValueChanged(i,t,e);return}if(s.isNameOnly){cy(r,n,s.value,s.target,e,s.howToSet,[],s.parentContext),s.value=n;return}const o=s.target;fy(n,s.attrName,s,o,e,s.howToSet,s.isSpecial),t.value=n}const dt=":tagvar",ie=":",ei=new RegExp(dt+"(\\d+)"+ie,"g");function ld(n){return n.search&&n.startsWith(dt)?n.search(ei):-1}function uy(n,t,e,r,s,i,o){const c=r.length,u=[];t.forEach(f=>{if(ld(f)>=0){const m=r.length,v=wn(f),S={updateCount:0,isAttr:!0,target:e,attrName:n,withinOwnerElement:!0,tagJsVar:v,valueIndex:o.varCounter,parentContext:o,destroy$:new Y,render$:new Y};v.processUpdate=function(L,x,H,at){++x.updateCount,h(at)};const k=i[m];S.value=k,u.push(S),++o.varCounter}});function h(f){const p=ly(t,f,c).join("");s(e,n,p)}return h(i),u}function ly(n,t,e){return n.reduce((r,s)=>{if(ld(s)>=0){const o=e++,c=t[o];return r.push(c),r}return r.push(s),r},[])}function hy(n,t,e,r,s,i,o,c,u){if(typeof t===X.function)return++s.varCounter,fd(t,o,n,e);const h=wn(t),f={updateCount:0,isAttr:!0,target:e,attrName:n,howToSet:i,value:t,withinOwnerElement:!0,tagJsVar:h,destroy$:new Y,render$:new Y,valueIndex:u,parentContext:s};return r.push(f),h.processUpdate=ud,o_(n,t,f,e,i,o,c),f.value=t,f}function Hu(n){return Ci(n)&&"TagJsTag"in n?n.tagJsVar:-1}function dy(n,t,e,r,s,i,o,c,u){const h=ts(n,t||[],!0,e);return h.target=c,h.valueIndex=s,h.isAttr=!0,h.isNameOnly=u,h.stateOwner=Yr(i),h.supportOwner=i,Mt(h),r.processInitAttribute(o,n,c,r,h,i,Ie),Rt(),h.oldTagJsVar=h.tagJsVar,h.tagJsVar=r,h}function hd(n,t,e,r,s,i,o,c,u){const h=Hu(n);let f=h>=0||t===void 0&&typeof n!="string",p=e[h];t!=null&&t.tagJsType?p=t:n!=null&&n.tagJsType&&(f=!0,p=n,t=n);const m=p;if(m!=null&&m.tagJsType)return dy(t,[],c,m,h,s,n,r,f);if(f){h===-1&&f&&(p=n);const S=ts(p,[],!0,c);S.valueIndex=h,S.isAttr=!0,S.target=r,S.isNameOnly=!0,S.howToSet=i;const k=S.tagJsVar;k.processUpdate=ud;const V=cd(e,p,r,s,i,o,c);return V&&o.push(...V),S}if(Array.isArray(t))return uy(n,t,r,[],i,e,s.context);const v=Hu(t);if(v>=0){const S=e[v];return hy(n,S,r,[],c,i,s,u,v)}return Ri(n,t,r,i,u,c)}function fy(n,t,e,r,s,i,o){return We(n)?py(s,n,r,t,o,i):dd(n,r,t,o,i,s)}function dd(n,t,e,r,s,i){if(r!==!1){Hh(e,n,t,r);return}switch(n){case void 0:case!1:case null:re.push([gy,[t,e]]);return}if(We(n))return od(t,n,i,e);s(t,e,n)}function py(n,t,e,r,s,i,o){var f;const c=n.templater.wrapper;return((c==null?void 0:c.tagJsType)||((f=c==null?void 0:c.original)==null?void 0:f.tagJsType))===G.renderOnce?dd(t,e,r,s,i,n):fd(t,n,r,e)}function fd(n,t,e,r){return n=ey(n,t),od(r,n,t,e)}function gy(n,t){n.removeAttribute(t)}function pd(n,t,e,r,s){for(const i of n){const o=i[0],c=i[1],u=i[2]||!1;let h=i.length>1?Ie:Qm;i[3]&&(h=i[3]);const f=s.contexts,p=hd(o,c,t,e,r,h,f,s,u)||void 0;typeof p=="object"&&(f.push(p),++s.varCounter)}}function my(n,t,e,r,s,i,o){t.at&&pd(t.at,e,n,r,s),i?Yt.push([se,[i,n,"appendToAttachDomElement"]]):Nt.push([ze,[o,n,"insertBeforeAttachDomElement"]])}function gd(n,t,e,r,s,i,o){const c=e.context,u=c.contexts;r=c;const h=[];i&&o===void 0&&(o=document.createTextNode(Tn),Yt.push([se,[i,o]]),i=void 0);for(let f=0;f<n.length;++f){const p=n[f],m=p.v;if(!isNaN(m)){const L=Number(m),x=t[L];if(We(x)&&x.tagJsType===void 0){++r.varCounter;continue}const at=R_(x,u,e,r,s,i,o);at.valueIndex=L;continue}const S={};if(h.push(S),p.nn==="text"){_y(S,p,i,o);continue}const k=S.domElement=document.createElement(p.nn),V={updateCount:0,isAttrs:!0,target:k,parentContext:r,contexts:[],destroy$:new Y,render$:new Y,tagJsVar:{tagJsType:"new-parent-context"},valueIndex:-1,withinOwnerElement:!0};V.varCounter=0,my(k,p,t,e,V,i,o),V.target=k,p.ch&&(S.ch=gd(p.ch,t,e,V,s+1,k,o).dom)}return{dom:h,contexts:u}}function _y(n,t,e,r){const s=n,i=s.tc=t.tc;if(e){Yt.push([Am,[e,i,function(c){s.domElement=c}]]);return}Nt.push([vm,[r,i,function(c){s.domElement=c}]])}const md=/(:tagvar\d+:)/,qu="ondoubleclick",yy=/([:_a-zA-Z0-9\-.]+)\s*(?:=\s*"([^"]*)"|=\s*(\S+))?/g,Ty=/<\/?([a-zA-Z0-9-]+)((?:\s+[a-zA-Z_:*][\w:.-]*(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)+\s*|\s*)\/?>/g;function Ey(n){const t=[],e=[],r=[];let s=null,i=-1,o=0;const c=new RegExp(Ty,"g");for(n=Iy(n);o<n.length;){const u=c.exec(n);if(!u)break;const[h,f,p]=u,m=h.startsWith("</"),v=h.endsWith("/>");if(o<u.index){const L=n.slice(o,u.index);if(L.trim()){const x=Wu(L);for(let H of x)H.startsWith(dt)&&H.search(md)>=0&&H.search(yd)===-1&&(H=dt+ ++i+ie),zu(s,e,H)}}if(o=u.index+h.length,m){s=r.pop()||null;continue}const S=[];let k;for(;(k=yy.exec(p))!==null;)i=Sy(k,i,t,S);const V={nn:f};S.length&&(V.at=S),s?(s.ch||(s.ch=[]),s.ch.push(V)):e.push(V),v||(r.push(s),s=V)}if(o<n.length){const u=n.slice(o);if(u.trim()){const h=Wu(u);for(const f of h)f.startsWith(dt)&&++i,zu(s,e,f)}}return e}const wy=new RegExp("(<!--[\\s\\S]*?-->)","g");function Iy(n){return n.replace(wy,function(t){return t.replace(/\[l t\]/g,"[l&nbsp;t]").replace(/\[g t\]/g,"[g&nbsp;t]").replace(/</g,"[l t]").replace(/>/g,"[g t]")})}function vy(n){return n.startsWith("on")?n.length===qu.length&&n===qu?"dblclick":n.slice(2,n.length):n}function zu(n,t,e){const r={nn:"text",tc:Ay(e)};by(n,t,r)}function Ay(n){return n.replace(/(\[l t\]!--[\s\S]*?--\[g t\])/g,function(t){return t.replace(/\[l t\]/g,"<").replace(/\[g t\]/g,">").replace(/\[l&nbsp;t\]/g,"[l t]").replace(/\[g&nbsp;t\]/g,"[g t]")})}function by(n,t,e){n?(n.ch||(n.ch=[]),n.ch.push(e)):t.push(e)}function Wu(n){return n.split(md).filter(Cy)}function Cy(n){return n!==""}function Sy(n,t,e,r){const s=n[1]||n[3]||n[5];let o=n[2]||n[4]||n[6];if(s===void 0)return t;const c=n[2]!=="",u=o===void 0&&c,h=s.toLowerCase(),f=h.startsWith("on")?vy(h):h;if(u){if(s.slice(0,dt.length)===dt){const H=dt+ ++t+ie;return e.push(["at",H]),r.push([H]),t}if(n[0].startsWith(s)&&n[0].slice(s.length,n[0].length).search(/\s+$/)>=0)return r.push([f]),t;const L=n[3];if(L.search(yd)>=0){o=L;const H=[f,o];return r.push(H),t}else o=dt+ ++t+ie}c||(o=n[2]);const p=o.split(Py).filter(S=>S.length>0);p.length>1&&(o=p,p.forEach(S=>{S.search(ei)>=0&&++t}));const m=[f,o];console.debug("EVER GET HERE??????");const v=Zr(h,"DIV");return v&&m.push(v),f==="style"?(r.unshift(m),t):(r.push(m),t)}const Ry=new RegExp(dt+"(\\d+)"+ie,"gi"),Py=new RegExp("("+dt+"\\d+"+ie+")","gi"),_d=dt.slice(0,dt.length-1),yd=new RegExp(_d+"&#x72;(\\d+)"+ie,"gi"),ky=_d+"&#x72;$1"+ie;function Vy(n,t){const e=Dy(n,t).join("");return Ey(e)}function Dy(n,t){return Ny(n,t)}function Ny(n,t){const e=[];for(let r=0;r<n.length;++r){const i=n[r].replace(Ry,ky);if(r<t.length){e.push(i+dt+r+ie);continue}e.push(i)}return Oy(e,n,t),e}function Oy(n,t,e){const r=e.length-t.length;if(r>0)for(let s=r;s>0;--s)n.push(dt+(t.length+s-1)+ie)}const My="ch";function Td(n,t,e=[],r=[]){const s=n;for(let i=0;i<s.length;i++){const o=[...r,i],c=s[i];if(c.at){const u=c.at;c.at=xy(u,t)}if(c.ch){const u=c.ch,h=[...o,My];c.ch=Td(u,t,e,h)}i=Ly(c,t,s,i)}return s}function Ly(n,t,e,r){if(n.nn!=="text")return r;const s=n;let i=s.tc;if(typeof i!==Ys.string)return r;let o;for(;(o=ei.exec(i))!==null;){const c=o[1],u=parseInt(c,10);if(!isNaN(u)&&u<t){const f=dt+u+ie,p=i.slice(o.index+f.length);e.splice(r,1,{nn:"text",v:u}),i=p,ei.lastIndex=0}}return s.tc=i,r}function xy(n,t){const e=[];for(const r of n){const[s,i,o]=r;if(s.startsWith(dt)){const c=parseInt(s.replace(dt,""),10);if(!isNaN(c)&&c<t){e.push([{tagJsVar:c}]);continue}}if(typeof i===Ys.string&&i.startsWith(dt)){const c=parseInt(i.replace(dt,""),10);if(!isNaN(c)&&c<t){e.push([s,{tagJsVar:c},o]);continue}}e.push(r)}return e}function Fy(n,t,e){return!!(e&&e.strings.length===n.length&&e.strings.every((s,i)=>s===n[i])&&e.values.length===t.length)}function Uy(n){const t=n.map(By);return t.push(n.length),Number(t.join(""))}function By(n){return n.length}const Ju={};function jy(n,t){const e=Uy(n),r=Ju[e];if(r&&Fy(n,t,r))return r.domMetaMap;const i=Vy(n,t),o=Td(i,t.length),c={interpolation:void 0,string:void 0,strings:n,values:t,domMetaMap:o};return Ju[e]=c,o}function Vi(n,t,e){const r=n.context;r.state=r.state||{};const s=r.state;s.oldest=n,s.newest=n,r.state.older=r.state.newer,++it.locks;const i=$y(n,n.context,t,e);return r.htmlDomMeta=i.dom,--it.locks,i}function $y(n,t,e,r){const s=Hy(n),o=n.templater.tag.values,c=[],u=n.context;return t=u,u.contexts=c,gd(s,o,n,t,0,e,r)}function Hy(n){const e=n.templater.tag;if(e.tagJsType===G.dom)return e.dom;const r=e.strings;return jy(r,e.values)}function Ed(n,t){const e=t.state.newest,r=t.placeholder;return e.ownerSupport=n,t.value.tag&&Vi(e,void 0,r),e}function wd(n,t,e){const r=ST(n,t,t.appSupport,e);return e.contexts=e.contexts||[],r}function Id(n,t,e,r,s){const i=wd(n,e,t);i.ownerSupport=e;const o=Vi(i,r,r?void 0:s);for(const c of o.dom)c.marker&&(r?Yt.push([se,[r,c.marker]]):Nt.push([ze,[s,c.marker,"subMarker"]])),c.domElement&&(r?Yt.push([se,[r,c.domElement,"subAppendTo"]]):Nt.push([ze,[s,c.domElement,"subInsertBefore"]]));return i}function qy(n,t,e,r,s){if(t.state={},t.inputsHandler){const i=e.propsConfig;t.inputsHandler(i)}return s?Id(n,t,e,s,r):Ed(e,t)}function vd(n,t){const e={component:!1,tagJsType:G.templater,processInit:qy,processInitAttribute:Ot,processUpdate:En,hasValueChanged:ki,destroy:es,propWatch:n,props:t,key:function(s){return e.arrayValue=s,e},matchesInjection(r,s){var i;if(e.wrapper===r||((i=e.wrapper)==null?void 0:i.original)===(r==null?void 0:r.original))return s}};return e}const Br=[];function zy(n,t){return function(s,i,o){const c=Ad(n,s,o),u=s.ownerSupport,h=rs(n,i,u,s.appSupport,c);return Xh(n,t,h,c)}}function Ad(n,t,e){const r=n.propWatch===Bt.DEEP?Di:Ud,s=n.props,i=t.propsConfig;let o=i.castProps;const c=e==null?void 0:e.propsConfig,u=c==null?void 0:c.castProps;return u&&(i.castProps=u,o=F_(t,e,e.ownerSupport,s,r)),o||Pa(s)}function Wy(n,t,e){const r=vd(Bt.DEEP);r.tagJsType=n.tagJsType;const s=wd(r,e,t);function i(){return r.tag=n(),s}return r.wrapper=i,i.tagJsType=n.tagJsType,i.original=n.original||n,s}function Jy(n,t,e,r,s){yn(t);const i=Wy(n,t,e);return Va(i,void 0,t),Id(i.templater,t,e,s,r)}function Gy(n,t){const e=Vi(n,t,void 0);for(const r of e.dom)r.domElement&&Yt.push([se,[t,r.domElement]]),r.marker&&Yt.push([se,[t,r.marker]]);return n}function Ky(n,t){const r=n.Observables[0];if(!t.hasEmitted){if("withDefault"in n){t.subValueHandler(n.withDefault,0);return}if("value"in r){t.subValueHandler(r.value,0);return}return}const s=t.lastValues[0].value;t.subValueHandler(s,0)}function Qy(n,t,e,r,s,i){t.destroy=qd;const o=Zr(n,e.tagName),c=function(f,p){Ri(n,f,e,Ie,o,s),Xo(p)},u=Hd(t.Observables,i,c,t,s);return s.subContext=u,s.value=t,s.tagJsVar=t,t.processUpdate=function(f,p,m){return qh(f,s,m,e,n,Ie)},{subContext:u,onOutput:c}}function Xy(n,t){if(!(n!=null&&n.tagJsType))return 1;const e=n.Observables;if(!e)return 2;const s=t.value.Observables;return!s||s.length!==e.length?3:e.every((o,c)=>o===s[c])?0:4}function Yy(n,t,e,r){if(!t||!t.tagJsType||t.tagJsType!==n)return r.tagJsVar.destroy(r,e),Ni(t,r,e,99),99}function bd(n,t,e){const r=t.subContext,s=Yy(G.subscribe,n,e,t);return s||(!r||!r.hasEmitted||(r.tagJsVar=n,r.valuesHandler(r.lastValues,0)),0)}function Cd(n,t){return{component:!1,onOutput:Ot,tagJsType:G.subscribe,processInitAttribute:Qy,processInit:VT,hasValueChanged:Xy,processUpdate:bd,destroy:DT,callback:t,Observables:[n]}}Cd.all=Zy;function Zy(n,t){return Cd(Y.all(n),t)}function tT(n,t){++n.updateCount;const e=n.subContext,r=Sd(e,t);return delete n.subContext,r}function Sd(n,t){n.deleted=!0;const e=n.appendMarker;if(e&&(xr(e,"deleteSubContext"),delete n.appendMarker),!n.hasEmitted)return;const r=n.contextItem;return r.tagJsVar.destroy(r,t),76}function Rd(n,t,e,r){return t.hasEmitted=!0,t.contextItem=Ca(n,e,[],r)}function Pd(n,t,e){var o;++t.updateCount;const s=n.owner._innerHTML;s.processInit=s.oldProcessInit;const i=(o=t.subContext)==null?void 0:o.contextItem;Oi(i,s,e)}function eT(n,t,e,r,s){t.subContext={},n.processUpdate=Pd,nT(n,e,t,r,s)}function nT(n,t,e,r,s){const{appendMarker:i,insertBefore:o}=$d(s,r),c=e.subContext;c.appendMarker=i;const h=n.owner._innerHTML;h.processInit=h.oldProcessInit,Rd(h,c,t,o)}function kd(){return{component:!1,tagJsType:"innerHTML",hasValueChanged:()=>0,processInitAttribute:Ot,processInit:eT,processUpdate:Pd,destroy:tT}}function rT(n){if(!n)return Ot;const t=oe();if(!t)throw new Error("output must be used in render sync with a parent context");const e=va(t);if(!e)throw new Error("output must be used in render sync fashion");if(n.wrapped===!0)return n;const r=(...s)=>{const i=e.ownerSupport;return sT(s,n,i.context)};return r.wrapped=!0,r}function sT(n,t,e){Mt(e);const s=t(...n);return Rt(),hn.push([()=>{const i=e.global;if(i===void 0||i.deleted===!0){++it.locks;const c=e;c.tagJsVar.processUpdate(c.value,c,void 0,[]),--it.locks,Zt();return}++it.locks,N_(void 0),--it.locks,Zt()},[]]),s}function iT(n,t,e,r){const s={component:!1,tagJsType:"tag-conversion",processInitAttribute:Ot,processInit:(i,o,c)=>{if(n.inputsHandler){const h=e.propsConfig;n.inputsHandler(h)}if(t.inputsHandler){const h=e.propsConfig;t.inputsHandler(h)}if(o.inputsHandler){const h=e.propsConfig;o.inputsHandler(h)}const u=n.returnValue;return t.tagJsVar.processInit(u,t,e,r.placeholder)},processUpdate:(i,o,c)=>{if(o.locked||o.deleted)return;++o.updateCount;const u=o.value,h=u==null?void 0:u.tagJsType,p=(i==null?void 0:i.tagJsType)!==h;if(S_(i,o)||p||s.hasValueChanged(i,o,e)){s.destroy(o,e),Ni(i,o,c,789);return}o.locked=467,o.render$.next();const S=o.returnValue;oT(t,i,o,S,e),delete o.locked},hasValueChanged:(i,o,c)=>{const u=n.returnValue;return t.tagJsVar.hasValueChanged(u,t,c)},destroy:(i,o)=>{++n.updateCount,n.deleted=!0,delete n.returnValue;const c=t.tagJsVar.destroy(t,e);return Xn(c)?c.then(()=>{const u=Gu(n);return Zt(),u}):(n.destroy$.next(),Gu(n))}};return s}function Vd(n,t,e){const r=n.context,s=n.returnValue,i=wn(s);delete r.global,r.contexts=[];const o={updateCount:0,value:s,tagJsVar:i,destroy$:new Y,render$:new Y,placeholder:r.placeholder,valueIndex:-1,withinOwnerElement:!0,parentContext:r,contexts:r.contexts},c=iT(r,o,n,e);return r.tagJsVar=c,i.processInit(s,o,n,e.placeholder),n}function Dd(n,t,e){const r=rs(n,t,e,e==null?void 0:e.appSupport),s=r.propsConfig;if(s){const o=n.tagJsType!==G.tagComponent?[]:Ad(n,r);s.castProps=o}return Va(r,t.state.newest,t)}function Nd(n,t,e){const r=Dd(n,t,e),s=r.templater.tag;return s?["dom","html"].includes(s.tagJsType)?(Vi(r,void 0,t.placeholder),r):Vd(r,r.ownerSupport,t):r}function oT(n,t,e,r,s){const i=Pa(t.props),o=n.value;o.props=i;const c=s.propsConfig;if(c&&(c.castProps=i),(t==null?void 0:t.tagJsType)==="tagComponent"){if(n.inputsHandler=e.inputsHandler,n.updatesHandler=e.updatesHandler,e.value=t,e.inputsHandler){Mt(e);const u=e.inputsHandler;u(i),Rt()}if(e.updatesHandler){Mt(e);const u=e.updatesHandler;u(i),Rt()}}n.tagJsVar.processUpdate(r,n,s,[]),n.value=r}function Gu(n,t){delete n.returnValue,delete n.global,n.contexts=[],n.htmlDomMeta=[],delete n.inputsHandler,delete n.updatesHandler}function aT(n,t,e,r){const s=Dd(n,t,e),i=s.templater.tag;return["dom","html"].includes(i.tagJsType)?Gy(s,r):Vd(s,e,t)}function Od(n,t,e,r,s){return yn(t),s?aT(n,t,e,s):Nd(n,t,e)}function cT(n){var s,i;const t=oe();if(!t)throw new Error("tag.inject can only be called within a tag or host context");let e=t.parentContext;for(;e;){const o=e.contexts;if(o){for(const c of o)if(c.isAttr&&((s=c.tagJsVar)!=null&&s.matchesInjection)){const u=c.tagJsVar.matchesInjection(n,c);if(u!==void 0)return u.returnValue}}if((i=e.tagJsVar)!=null&&i.matchesInjection&&e.tagJsVar.matchesInjection(n,e))return e.returnValue;e=e.parentContext}const r=`Could not find parent context for tag.inject ${n}`;throw console.error(r,{targetItem:n,context:t}),new Error(r)}function Xt(n){return st.stateConfig.handlers.handler(n)}function uT(n){return Xt(()=>{var r;const t=n(),e=Qs();return(r=e==null?void 0:e.context)!=null&&r.global?nd(t,e,{resolvePromise:lT,resolveValue:hT}):t}),Z}function lT(n){return n}function hT(n){return n}function dT(n){return Xt(function(){oe().destroy$.toCallback(n)}),Z}function fT(n,t,e,...r){const s=e(...r),i=va(n);if(!i)return s;if(i.context.global)Ur(i);else{const o=i.context;o.tagJsVar.processUpdate(o.value,o,i.ownerSupport,[])}return Xn(s)&&s.finally(()=>{if(n.global)Ur(i);else{const o=i.context;o.tagJsVar.processUpdate(o.value,o,i.ownerSupport,[])}}),s}function Md(n){const t=oe(),e=Xt({callback:n}),r=Xt(()=>Ld(t,st.stateConfig,e));return e.callback=n,r}function Ld(n,t,e){const r=t.states;return function(...i){const o=fT(n,r,e.callback,...i);return Zt(),o}}function pT(n){const t=oe(),e=i=>{const o=oe();Mt(t);const c=n();return Rt(),Mt(o),c},r=t.render$.subscribe(()=>{e()}),s=e();return Z.onDestroy(()=>r.unsubscribe()),s}let gT=0;const Pr=xd("click"),Nn=xd("mousedown");function xd(n){return function(e){const r=Md(e);return Xt(()=>{zd().addEventListener(n,r)}),r}}const mT={get:zd,onclick:Pr,click:Pr,onClick:Pr,mousedown:Nn,onmousedown:Nn,onMouseDown:Nn};ns("onclick",Pr);ns("click",Pr);ns("onMouseDown",Nn);ns("onmousedown",Nn);ns("mousedown",Nn);function ns(n,t){Object.defineProperty(Z,n,{get(){return t},set(e){return t(e)}})}var Bt;(function(n){n.DEEP="deep",n.SHALLOW="shallow",n.NONE="none",n.IMMUTABLE="immutable"})(Bt||(Bt={}));function Z(n,t=Bt.SHALLOW){const e=function(...o){const c=vd(t,o);c.tagJsType=G.tagComponent,c.processInit=Od,c.hasValueChanged=ki;const u=zy(c,e);return u.original=n,c.wrapper=u,c},r=n;e.original=n,r.tags=Br,r.setUse=st,r.ValueTypes=G,r.tagIndex=gT++,Br.push(e);const s=e;return s.inputs=i=>{const o=oe();return o.inputsHandler=i,!0},s.updates=i=>{const o=oe();return o.updatesHandler=i,!0},s.getInnerHTML=kd,s}function _T(n){throw new Error("Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `")}function yT(){throw new Error("Do not call tag.renderOnce as a function but instead set it as: `(props) => tag.renderOnce = () => html`` `")}function TT(){throw new Error("Do not call tag.use as a function but instead set it as: `(props) => tag.use = (use) => html`` `")}Z.element=mT;Z.renderOnce=yT;Z.use=TT;Z.deepPropWatch=Z;Z.route=_T;Z.inject=cT;Z.output=rT;Z.onInit=uT;Z.onDestroy=dT;Z.callback=Md;Z.onRender=pT;Z.getInnerHTML=kd;Z.app=function(n){throw new Error("Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `")};Z.immutableProps=function(t){return Z(t,Bt.IMMUTABLE)};Z.watchProps=function(t){return Z(t,Bt.SHALLOW)};Object.defineProperty(Z,"renderOnce",{set(n){n.tagJsType=G.renderOnce,n.processInit=Jy,n.processUpdate=En,n.destroy=es,n.hasValueChanged=function(){return 0}}});Object.defineProperty(Z,"use",{set(n){n.original={setUse:st,tags:Br},n.tagJsType=G.stateRender,n.processInit=Od,n.processUpdate=En,n.hasValueChanged=ki,n.destroy=es}});Object.defineProperty(Z,"promise",{set(n){FT(n)}});function ET(n,t,e){if(ed(n,t))return 11;switch(e){case Bt.NONE:return 1;case Bt.SHALLOW:return xh(n,t);case Bt.IMMUTABLE:return Fd(n,t)}return wT(n,t)}function wT(n,t){let e=n,r=t;return e=[...n],r=[...t||[]],e.every((i,o)=>IT(i,o,e,r))?!1:7}function IT(n,t,e,r){const s=r[t];if(typeof n===X.object){const i={...n},o={...s||{}};return Object.entries(i).every(([u,h])=>Ku(h,o[u],()=>{delete i[u],delete o[u]}))}return Ku(n,s,function(){e.splice(t,1),r.splice(t,1)})}function Ku(n,t,e){if(typeof n!==X.function)return Lh(n,t,Di)?4:!1;if(typeof t!==X.function)return!1;const s=t==null?void 0:t.original;s&&(t=s),n.original&&(n=n.original);const o=n.toString(),c=t.toString();return o===c?(e(),5):(e(),6)}function vT(n,t){const e=t.props,s=n.propsConfig.latest;return ET(e,s,n.templater.propWatch)}function Fd(n,t){const e=n.length;for(let r=0;r<e;++r){const s=n[r],i=t[r];if(s!==i)return 2}return!1}const Ud=3,Di=10;function AT(n,t,e){const r=n.templater;if(r.tagJsType!==G.stateRender){switch(r.propWatch){case Bt.IMMUTABLE:return n.propsConfig={latest:t,castProps:e};case Bt.SHALLOW:return n.propsConfig={latest:t.map(bT),castProps:e}}return n.propsConfig={latest:t.map(CT),castProps:e}}}function bT(n){return ba(n,Ud)}function CT(n){return ba(n,Di)}function Bd(n,t,e){const r={templater:n,context:t,castedProps:e,appSupport:void 0},s=t.global;return s.blocked=[],t.state||(t.state={newer:{state:[],states:[]}}),r}function jd(n,t,e,r){t.appSupport=e||t;const s=n.props;return s&&(t.propsConfig=AT(t,s,r)),t}function ST(n,t,e,r,s){const i={templater:n,context:r,castedProps:s,appSupport:void 0};return i.ownerSupport=t,i.appSupport=e,i}function rs(n,t,e,r,s){const i=Bd(n,t,s);return i.ownerSupport=e||i,i.ownerSupport.appSupport=r||i.ownerSupport,jd(n,i,r,s)}function RT(n,t,e,r){let s=e.templater||e;const i=n.templater.tag;i&&i._innerHTML&&(s=e._innerHTML);const o=rs(s,t,r,r.appSupport),u=n.context.state.oldest;Mh(u,o)}function Qo(n,t,e){if(Xr(t))return n.global===void 0&&yn(n),n.oldTagJsVar=n.tagJsVar,n.tagJsVar=t,PT(t,n,e),!0;if(n.global){n.oldTagJsVar=n.tagJsVar,n.tagJsVar=t;const i=n.state.newest;if(i)return typeof t===X.function||RT(i,n,t,e),!0}if(n.inputsHandler){const i=e.propsConfig;n.inputsHandler(i)}return t.processInit(t,n,e,n.placeholder),n.oldTagJsVar=n.tagJsVar,n.tagJsVar=t,!0}function PT(n,t,e){if(!t.state.newest){if(t.inputsHandler){const s=e.propsConfig;t.inputsHandler(s)}n.processInit(n,t,e,t.placeholder);return}const r=rs(n,t,e,e.appSupport);x_(e,r,t)}function Ni(n,t,e,r){const s=n&&n.tagJsType;if(delete t.deleted,s){if(s===G.renderOnce)return;Qo(t,n,e);return}if(Jt(n)){Zs(t,n,e),t.oldTagJsVar=t.tagJsVar,t.tagJsVar=Jh(n);return}if(typeof n===X.function){t.value=n;return}r&&Jm(n,t)}function Oi(n,t,e){const s=n.tagJsVar.hasValueChanged(t,n,e);return s===0||Ni(t,n,e,s),s}function $d(n,t){let e;return n&&(e=t=document.createTextNode(Tn),Yt.push([se,[n,t]])),{appendMarker:e,insertBefore:t}}function kT(n,t,e){const r=bd(n,t,e);if(t.hasEmitted!==!0){const s=t.value.Observables;if(!s||!("value"in s[0]))return}if(r===0&&n.callback){const s=t.subContext;Ky(n,s)}}function VT(n,t,e,r,s){const i=n.Observables,{appendMarker:o,insertBefore:c}=$d(s,r);let u=function(p,m,v){Rd(p,v,e,c),Xo(m),u=v.tagJsVar.onOutput=function(k,V,L){const x=L.contextItem;Oi(x,k,e),x.tagJsVar.processUpdate(k,x,e,[k]),x.value=k,Xo(V)}};const h=Hd(i,e,(f,p,m)=>u(f,p,m),n,t);return h.appendMarker=o,t.subContext=h,n.processUpdate=kT,n.onOutput=u,h}function Hd(n,t,e,r,s){function i(h,f){var p;u.lastValues[f]={value:h,tagJsVar:wn(h),oldTagJsVar:(p=u.lastValues[f])==null?void 0:p.tagJsVar},o(u.lastValues,f)}function o(h,f){const p=u.tagJsVar;if(p==null?void 0:p.callback){Mt(s);const S=p.callback(...h.map(k=>k.value));e(S,c,u),Rt();return}const v=h[f].value;e(v,c,u)}let c=!0;const u={lastValues:[],subValueHandler:i,valuesHandler:o,tagJsVar:r,subscriptions:[]};return n.forEach((h,f)=>{c=!0,u.subscriptions.push(h.subscribe(p=>i(p,f))),c=!1}),r.onOutput=e,u}function qd(n){const t=n.subContext;if(!t)return;t.subscriptions.forEach(r=>r.unsubscribe()),delete n.subContext}function DT(n,t){++n.updateCount;const e=n.subContext;return qd(n),Sd(e,t)}function Xo(n){n||st.stateConfig.support||Zt()}class NT extends Y{constructor(e){super(e);te(this,"value");this.value=e}subscribe(e){const r=super.subscribe(e);return e(this.value,r),r}}const OT=((n,t)=>Oa(n,t).pastResult),MT=n=>n;function LT(n){const t=(e,r)=>Oa(e,r,n).pastResult;return t.setup=n,Ma(()=>t,t),t}const Oa=(n,t,{init:e,before:r,final:s=MT}={})=>{const i=Xt({pastResult:void 0,values:void 0}),c=typeof n=="function"?n():n,u=i.values===void 0;let h=0;u&&typeof n=="function"&&Z.onRender(()=>{if(++h,h===1)return;const p=n();f(p)});function f(p){if(i.values===void 0){if(r&&!r(p))return i.values=p,i;const k=(e||t)(p,i.values);return i.pastResult=s(k),i.values=p,i}if(p.every((S,k)=>S===i.values[k]))return i;if(r&&!r(p))return i.values=p,i;const v=t(p,i.values);return i.pastResult=s(v),i.values.length=0,i.values.push(...p),i}return f(c)};function Ma(n,t){return Object.defineProperty(t,"noInit",{get(){const e=n();return e.setup.init=()=>{},e}}),Object.defineProperty(t,"asSubject",{get(){const e=n(),r=Xt(()=>Qs()),s=Xt(()=>new NT(void 0)),i=Xt(()=>({state:st.stateConfig.state,states:st.stateConfig.states})),o=(c,u)=>(Oa(c,(f,p)=>{const m=Qs(),v=u(f,p);m!==r&&(i.state,r.context.state.older),s.next(v)},e.setup),s);return o.setup=e.setup,Ma(()=>o,o),o}}),Object.defineProperty(t,"truthy",{get(){const e=n();return e.setup.before=r=>r.every(s=>s),e}}),t}Ma(()=>LT({}),OT);class La extends Error{constructor(e,r,s={}){super(e);te(this,"details");this.name=La.name,this.details={...s,errorCode:r}}}class xa extends La{constructor(t,e){super(t,"sync-callback-error",e),this.name=xa.name}}new xa("callback() was called outside of synchronous rendering. Use `callback = callbackMaker()` to create a callback that could be called out of sync with rendering");const xT=()=>{};function FT(n){const t=oe(),e=Xt({callback:xT}),r=Xt({current:void 0}),s=Xt(()=>Ld(t,st.stateConfig,e));if(r.current!==n){r.current=n;const i=n;n.then(()=>{r.current===i&&s()})}}function oe(){return st.stateConfig.context}function zd(){return oe().target}function Mt(n){return st.stateConfig.context=n}function Rt(){delete st.stateConfig.context}function UT(n,t,e,r,s,i,o){const c=document.createTextNode(Tn);if(Br.push(e.wrapper||{original:e}),i.placeholder=c,t.isApp=!0,!s)throw new Error(`Cannot tagElement, element received is type ${typeof s} and not type Element`);s.destroy=function(){const p=i.events;for(const v in p){const S=p[v];s.removeEventListener(v,S)}i.events={},++it.locks;const m=Yn(f,t);return--it.locks,Zt(),m},++it.locks;const u=document.createDocumentFragment();u.appendChild(c);const f=Nd(e,i,{appSupport:{appElement:s,context:i},appElement:s,context:i,isRoot:!0});return f.appElement=s,o&&(r.tag=f.templater.tag),--it.locks,Zt(),s.appendChild(u),{support:f,tags:Br,ValueTypes:G}}function BT(n,t,e){const r=Bd(n,t);return jd(n,r,r),r.appElement=e,r.context=t,t.state.oldest||(t.state.oldest=r,t.state.older=t.state.newer),t.state.newest=r,r}typeof document=="object"&&(document.taggedJs&&console.warn("🏷️🏷️ Multiple versions of taggedjs are loaded. May cause issues."),document.taggedJs=!0);const ko=[],Qu="__taggedjs_tag_element__";function jT(n,t,e){const r=t[Qu],s=ko.findIndex(m=>m.element===t);if((r||s>=0)&&console.warn("tagElement called multiple times for the same element",{element:t}),s>=0){const m=ko[s].support;Yn(m,m.context.global),ko.splice(s,1)}t[Qu]=!0,t.innerHTML="";let i=(()=>h(e));i.propWatch=Bt.NONE,i.tagJsType=G.stateRender,i.processUpdate=En,i.props=[e],i.isApp=!0;const o=$T(i,t),c=o.global,u=o.state.newest;Dh(u.context),bi(u);let h=n(e);const f=typeof h==X.function;f||(Xr(h)?(o.state.newest.propsConfig={latest:[e],castProps:[e]},i.propWatch=h.propWatch,i.tagJsType=h.tagJsType,i.wrapper=h.wrapper,i=h):(i.tag=h,h=n));const p=UT(n,c,i,h,t,o,f);return Rt(),p}function $T(n,t){const e={component:!1,tagJsType:"templater",hasValueChanged:ki,destroy:es,processInitAttribute:Ot,processInit:function(){console.debug("do nothing app function")},processUpdate:En},r={updateCount:0,value:n,valueIndex:0,varCounter:0,destroy$:new Y,render$:new Y,withinOwnerElement:!1,renderCount:0,global:void 0,state:{},tagJsVar:e};return yn(r),r.events={},BT(n,r,t),r}function HT(n){return Array.isArray(n)&&Object.prototype.hasOwnProperty.call(n,"raw")}function bt(n,t){return function(e,r,s){if(HT(r)){const i=r.reduce((o,c,u)=>o+c+(s[u]??""),"");return t(e,[n,i])}return t(e,[n,r])}}function qT(n,t,e){const r=ss(n,n.elementFunctions);return Wd(r,t,e)}function Wd(n,t,e){function r(s){return r.toCallback(s)}return r.toCallback=e,n.listeners.push([t,r]),n.allListeners.push([t,r]),n}function Tt(n,t){const e=ss(n,n.elementFunctions);return e.attributes.push(t),Ua(e,t[1]),dn(t[0])?Bn(t[0],e):dn(t[1])&&Bn(t[1],e),e}function zT(n,t){const e=ss(n,n.elementFunctions);return Object.entries(t).map(r=>{e.attributes.push(r),Ua(e,r[1]),dn(r[0])?Bn(r[0],e):dn(r[1])&&Bn(r[1],e)}),e}const WT=bt("style",Tt),JT=bt("id",Tt),GT=bt("class",Tt),KT=bt("href",Tt),QT=bt("value",Tt),XT=bt("placeholder",Tt),YT=bt("src",Tt),ZT=bt("title",Tt),tE=bt("type",Tt),eE=bt("checked",Tt),nE=bt("disabled",Tt),rE=bt("selected",Tt),sE=bt("minLength",Tt),iE=bt("maxLength",Tt),oE=bt("open",Tt),aE=bt("cellpadding",Tt),cE=bt("cellspacing",Tt),uE=bt("border",Tt);function Jd(n,t){return n.attributes.push(t),Ua(n,t[1]),dn(t[0])?Bn(t[0],n):dn(t[1])&&Bn(t[1],n),n}function Fa(n){function t(r){return function(s){return qT(n,r,s)}}return{onClose:t("onclose"),onCancel:t("oncancel"),onDoubleClick:t("ondblclick"),onClick:t("click"),onBlur:t("onblur"),onChange:t("onchange"),onInput:t("oninput"),contextMenu:t("contextmenu"),onMousedown:t("onmousedown"),onMouseup:t("onmouseup"),onMouseover:t("onmouseover"),onMouseout:t("onmouseout"),onKeydown:t("onkeydown"),onKeyup:t("onkeyup"),attr:(...r)=>Tt(n,r),attrs:r=>zT(n,r),key:function(r){return this.arrayValue=r,this},style:wt(WT,n),id:wt(JT,n),class:wt(GT,n),href:wt(KT,n),value:wt(QT,n),placeholder:wt(XT,n),src:wt(YT,n),type:wt(tE,n),title:wt(ZT,n),checked:wt(eE,n),disabled:wt(nE,n),selected:wt(rE,n),cellSpacing:wt(cE,n),cellPadding:wt(aE,n),border:wt(uE,n),minLength:wt(sE,n),maxLength:wt(iE,n),open:wt(oE,n)}}function Ua(n,t){let e=1;t!=null&&typeof t!="function"&&typeof t.length=="number"&&(e+=t.length),n.contentId+=e}function wt(n,t){return((e,...r)=>n(t,e,r))}function lE(n,t,e){if(Ci(e)){Object.entries(e).forEach(([r,s])=>{s?n.classList.add(r):n.classList.remove(r)});return}$h(n,t,e)}function Bn(n,t){t.contexts||(t.contexts=[]),t.contexts.push(n),++t.contentId}function dn(n){return Array.isArray(n)||We(n)||(n==null?void 0:n.tagJsType)}function Ns(n,t){return(e,r)=>Jd(e,[n,r,!1,t])}function lt(n){return(t,e)=>Wd(t,n,e)}const hE={onClick:lt("click"),onDoubleClick:lt("ondblclick"),onDblClick:lt("ondblclick"),onBlur:lt("onblur"),onChange:lt("onchange"),onCancel:lt("oncancel"),onClose:lt("onclose"),onInput:lt("oninput"),onMousedown:lt("onmousedown"),onMouseDown:lt("onmousedown"),onMouseup:lt("onmouseup"),onMouseUp:lt("onmouseup"),onMouseover:lt("onmouseover"),onMouseOver:lt("onmouseup"),onMouseout:lt("onmouseout"),onMouseOut:lt("onmouseout"),onKeyup:lt("onkeyup"),onKeyUp:lt("onkeyup"),onKeydown:lt("onkeydown"),onKeyDown:lt("onkeydown")},Xu={checked:Ns("checked",Po),disabled:Ns("disabled",Po),selected:Ns("selected",Po),class:Ns("class",lE),...hE};function dE(n,t){return Object.entries(t).reduce((r,[s,i])=>s in Xu?Xu[s](n,i):Jd(n,[s,i,!1,Ie]),n)}function fE(n){return Gd(n)}function Gd(n){const t=pE(n.attributes),e=Kd(n.innerHTML);return`<${n.tagName}${t}>${e}</${n.tagName}>`}function pE(n){if(!n||n.length===0)return"";const t=[];return n.forEach(e=>{const r=e[0];if(typeof r!="string"||r.length===0)return;const s=Xd(e[1]);if(s===!0){t.push(r);return}s===!1||s===void 0||s===null||t.push(`${r}="${Qd(String(s))}"`)}),t.length>0?` ${t.join(" ")}`:""}function Kd(n){return!n||n.length===0?"":n.map(t=>{const e=Xd(t);return gE(e)?Gd(e):Array.isArray(e)?Kd(e):e==null||e===!1?"":Qd(String(e))}).join("")}function gE(n){return!!n&&typeof n=="object"&&typeof n.tagName=="string"}function Qd(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Xd(n){return typeof n=="function"?n():n}function Yd(n,t){++n.updateCount;const e=n.contexts,r=[];if(n.paintCommands){for(let s=Nt.length-1;s>=0;--s){const i=Nt[s],o=n.paintCommands.indexOf(i);if(o>=0&&(Nt.splice(s,1),n.paintCommands.splice(o,1),n.paintCommands.length===0))break}delete n.paintCommands,Vo(n);return}if(e.length&&(ni(e,t,r),e.length=0,r.length)){const s=n.htmlDomMeta;return n.deleted=!0,Promise.all(r).then(()=>{++it.locks,Fr(s),Vo(n),--it.locks,Zt()})}Fr(n.htmlDomMeta),Vo(n)}function Vo(n){n.htmlDomMeta=[],delete n.contexts,n.deleted=!0}function ni(n,t,e){const r=n[0],s=r.tagJsVar.destroy(r,t);if(r.deleted=!0,Xn(s))return e.push(s.then(()=>{if(n.length>1)return ni(n.slice(1,n.length),t,e)}));if(r.htmlDomMeta&&(Fr(r.htmlDomMeta),delete r.htmlDomMeta),n.length>1)return ni(n.slice(1,n.length),t,e)}function Zd(n,t,e){if(t.locked||t.deleted===!0)return;if(++t.updateCount,Ba(n,t)){Yd(t,e),t.htmlDomMeta=[],delete t.deleted,Ni(n,t,e,789);return}const i=t.contexts,o=n.contexts||[],c=t.tagJsVar.allListeners;if(n.allListeners.forEach((h,f)=>{const p=c[f][1];p.toCallback=h[1].toCallback}),i.length!==o.length)throw console.info("context mismatch",{value:n,context:t,conValues:i.map(h=>h.value),vContexts:o,deleted:t.deleted}),new Error("super issue discovered");t.locked=79,i.forEach((h,f)=>{h.tagJsVar.processUpdate(o[f],h,e)}),delete t.locked}function Ba(n,t){if(!n)return 1;if(t.value===n)return 0;if(!n||n.tagJsType!=="element")return 1;const s=n.contentId,i=t.value.contentId;if(s!==i)return 1;const o=n.innerHTML.length,c=t.value.innerHTML.length;return o!==c?1:0}function mE(n,t,e,r,s){const i=[],o={updateCount:0,parentContext:e,contexts:i,target:t,value:n,htmlDomMeta:[],tagJsVar:{component:!1,tagJsType:"dynamic-text",hasValueChanged:()=>0,processInit:Ot,processInitAttribute:Ot,destroy:(p,m)=>{++o.updateCount,i.forEach(v=>v.tagJsVar.destroy(v,m))},processUpdate:(p,m,v,S)=>{++o.updateCount,Mt(h);let k=p(h);const V=o.underFunction;delete o.underFunction,k instanceof Function&&!k.tagJsType&&(V&&k.toString()===V.toString()?k=h.value:(o.underFunction=k,k=k()));const L=h.tagJsVar.processUpdate(k,h,v,S);return h.value=k,m.value=p,Rt(),L}},valueIndex:-1,withinOwnerElement:!0,destroy$:new Y,render$:new Y};Mt(o);let c=n();We(c)&&!c.tagJsType&&(o.underFunction=c,c=c());const h=ef(c,o,t,r,s);return e.contexts.push(o),Rt(),h}function tf(n,t,e,r,s){n.forEach(i=>{switch(typeof i){case"string":case"boolean":case"number":return Yu(i,r,s);case"function":{if(i.tagJsType==="element")break;return mE(i,r,t,e,s)}}if(i==null)return Yu(i,r,s);if(i.tagJsType==="element"){const c=nf(i,t,e,t.contexts);Nt.push([s,[r,c]]),t.htmlDomMeta.push({nn:c.tagName,domElement:c,at:[]});return}return ef(i,t,r,e,s)})}function ef(n,t,e,r,s){const i=ts(n,[],!0,t);if(t.contexts.push(i),i.target=e,i.placeholder=document.createTextNode(""),Nt.push([s,[e,i.placeholder]]),Mt(i),i.inputsHandler){const c=r.propsConfig;i.inputsHandler(c)}return i.tagJsVar.processInit(n,i,r,i.placeholder),Rt(),i}function Yu(n,t,e){const r=Si(n),s=document.createTextNode(r);return Nt.push([e,[t,s]]),s}function nf(n,t,e,r){const s=document.createElement(n.tagName);return t.target=s,n.attributes.forEach(i=>{const o=i[0];typeof o=="string"&&(i[2]=Zr(o,s.tagName))}),pd(n.attributes,[],s,e,t),tf(n.innerHTML,t,e,s,se),n.listeners.forEach((i,o)=>_E(n,o,e,i,s)),s}function _E(n,t,e,r,s){const i=(...o)=>{const u=n.listeners[t][1],h=Yr(e),f=h.context.updateCount;h.context.locked=1,++it.locks,Mt(h.context);const p=u(...o);return--it.locks,delete h.context.locked,Rt(),f===h.context.updateCount?rd(p,h):(Zt(),Xn(p)?p.then(()=>{const v=h.context.state.newest;return Na([v]),"promise-no-data-ever"}):"no-data-ever")};id(e.appSupport,r[0],s,i)}function yE(n,t,e,r){t.contexts=t.contexts||[],t.htmlDomMeta=[],t.locked=34;const s=nf(n,t,e,t.contexts);delete t.locked;const i=[ze,[r,s,"htmlTag.processInit"]];Nt.push(i),t.paintCommands=[i],hn.push([()=>{delete t.paintCommands},[]]);const o={nn:n.tagName,domElement:s,at:n.attributes};return t.htmlDomMeta=[o],s}function M(n){const e=ss({component:!1,tagJsType:"element",processInitAttribute:Ot,processInit:yE,destroy:Yd,processUpdate:Zd,hasValueChanged:Ba,tagName:n,innerHTML:[],attributes:[],contentId:0,listeners:[],allListeners:[],elementFunctions:Fa});return e.tagName=n,e}function ss(n,t){const e=(...r)=>{const s={...e};return s.attributes=[...e.attributes],s.listeners=[...e.listeners],s.allListeners=[...e.allListeners],r.length>0&&typeof r[0]=="object"&&r[0]!==null&&!Array.isArray(r[0])&&!r[0].tagJsType&&(dE(s,r[0]),r.splice(0,1)),s.innerHTML=r,r.forEach(i=>{if(dn(i)){if(i.tagJsType==="element"){s.allListeners.push(...i.allListeners),i.contexts&&(s.contexts?(s.contexts.push(...i.contexts),++s.contentId):(s.contexts=i.contexts,++s.contentId));return}TE(i,s)}}),s};return Object.assign(e,n),Object.assign(e,Fa(e)),e.attributes=[...n.attributes],e.listeners=[...n.listeners],e.allListeners=[...n.allListeners],e.toString=function(){return fE(this)},e}function TE(n,t){t.contexts||(t.contexts=[]),t.contexts.push(n)}const HS=EE();function EE(){const t=ss({component:!1,tagJsType:"element",processInitAttribute:Ot,processInit:wE,destroy:IE,processUpdate:Zd,hasValueChanged:Ba,tagName:"no-element",innerHTML:[],attributes:[],contentId:0,listeners:[],allListeners:[],elementFunctions:Fa});return t.tagName="no-element",t}function wE(n,t,e,r){t.contexts=t.contexts||[],t.htmlDomMeta=[],tf(n.innerHTML,t,e,r,ze)}function IE(n,t){++n.updateCount;const e=n.contexts,r=[];if(e.length&&(ni(e,t,r),e.length=0,r.length)){const s=n.htmlDomMeta;return Promise.all(r).then(()=>{++it.locks,Fr(s),--it.locks,Zt()})}}const Zu=M("button"),qS=M("select"),zS=M("option"),WS=M("input"),JS=M("textarea");M("html");M("head");M("title");M("meta");M("link");M("style");M("body");M("script");M("noscript");M("hr");const GS=M("h1"),tl=M("h2");M("h3");M("h4");M("h5");M("h6");M("ol");M("ul");M("li");const el=M("div"),KS=M("main"),Do=M("section"),QS=M("header");M("footer");M("form");M("fieldset");M("legend");const XS=M("dialog"),YS=M("pre"),ZS=M("table"),tR=M("tr"),eR=M("td"),nR=M("th"),rR=M("thead"),sR=M("tbody");M("tfoot");M("iframe");const iR=M("a");M("u");const oR=M("img");M("br");const aR=M("label"),No=M("p");M("small");const cR=M("span"),uR=M("strong");M("b");M("sup");M("nav");M("figure");M("figcaption");M("code");M("canvas");M("svg");M("path");M("polygon");M("rect");M("details");M("summary");const vE=()=>{};var nl={};/**
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
 */const rf=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},AE=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[e++];t[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[e++],o=n[e++],c=n[e++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(u>>10)),t[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[e++],o=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return t.join("")},sf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let m=(c&15)<<2|h>>6,v=h&63;u||(v=64,o||(m=64)),r.push(e[f],e[p],e[m],e[v])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(rf(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):AE(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=e[n.charAt(s++)],c=s<n.length?e[n.charAt(s)]:0;++s;const h=s<n.length?e[n.charAt(s)]:64;++s;const p=s<n.length?e[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new bE;const m=i<<2|c>>4;if(r.push(m),h!==64){const v=c<<4&240|h>>2;if(r.push(v),p!==64){const S=h<<6&192|p;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class bE extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const CE=function(n){const t=rf(n);return sf.encodeByteArray(t,!0)},ri=function(n){return CE(n).replace(/\./g,"")},of=function(n){try{return sf.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function SE(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const RE=()=>SE().__FIREBASE_DEFAULTS__,PE=()=>{if(typeof process>"u"||typeof nl>"u")return;const n=nl.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},kE=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&of(n[1]);return t&&JSON.parse(t)},Mi=()=>{try{return vE()||RE()||PE()||kE()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},af=n=>{var t,e;return(e=(t=Mi())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},VE=n=>{const t=af(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},cf=()=>{var n;return(n=Mi())==null?void 0:n.config},uf=n=>{var t;return(t=Mi())==null?void 0:t[`_${n}`]};/**
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
 */class DE{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
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
 */function Zn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function lf(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function NE(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ri(JSON.stringify(e)),ri(JSON.stringify(o)),""].join(".")}const kr={};function OE(){const n={prod:[],emulator:[]};for(const t of Object.keys(kr))kr[t]?n.emulator.push(t):n.prod.push(t);return n}function ME(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let rl=!1;function hf(n,t){if(typeof window>"u"||typeof document>"u"||!Zn(window.location.host)||kr[n]===t||kr[n]||rl)return;kr[n]=t;function e(m){return`__firebase__banner__${m}`}const r="__firebase__banner",i=OE().prod.length>0;function o(){const m=document.getElementById(r);m&&m.remove()}function c(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function u(m,v){m.setAttribute("width","24"),m.setAttribute("id",v),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function h(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{rl=!0,o()},m}function f(m,v){m.setAttribute("id",v),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function p(){const m=ME(r),v=e("text"),S=document.getElementById(v)||document.createElement("span"),k=e("learnmore"),V=document.getElementById(k)||document.createElement("a"),L=e("preprendIcon"),x=document.getElementById(L)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const H=m.element;c(H),f(V,k);const at=h();u(x,L),H.append(x,S,V,at),document.body.appendChild(H)}i?(S.innerText="Preview backend disconnected.",x.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
</defs>`,S.innerText="Preview backend running in this workspace."),S.setAttribute("id",v)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
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
 */function Lt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function LE(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Lt())}function xE(){var t;const n=(t=Mi())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function FE(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function UE(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function BE(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function jE(){const n=Lt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function $E(){return!xE()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function HE(){try{return typeof indexedDB=="object"}catch{return!1}}function qE(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var i;t(((i=s.error)==null?void 0:i.message)||"")}}catch(e){t(e)}})}/**
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
 */const zE="FirebaseError";class Se extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=zE,Object.setPrototypeOf(this,Se.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,is.prototype.create)}}class is{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,i=this.errors[t],o=i?WE(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Se(s,c,r)}}function WE(n,t){return n.replace(JE,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const JE=/\{\$([^}]+)}/g;function GE(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}function fn(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const i=n[s],o=t[s];if(sl(i)&&sl(o)){if(!fn(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function sl(n){return n!==null&&typeof n=="object"}/**
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
 */function os(n){const t=[];for(const[e,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(s))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function KE(n,t){const e=new QE(n,t);return e.subscribe.bind(e)}class QE{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,r){let s;if(t===void 0&&e===void 0&&r===void 0)throw new Error("Missing Observer.");XE(t,["next","error","complete"])?s=t:s={next:t,error:e,complete:r},s.next===void 0&&(s.next=Oo),s.error===void 0&&(s.error=Oo),s.complete===void 0&&(s.complete=Oo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function XE(n,t){if(typeof n!="object"||n===null)return!1;for(const e of t)if(e in n&&typeof n[e]=="function")return!0;return!1}function Oo(){}/**
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
 */const cn="[DEFAULT]";/**
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
 */class YE{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new DE;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(tw(t))try{this.getOrInitializeService({instanceIdentifier:cn})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(t=cn){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=cn){return this.instances.has(t)}getOptions(t=cn){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&t(i,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:ZE(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=cn){return this.component?this.component.multipleInstances?t:cn:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ZE(n){return n===cn?void 0:n}function tw(n){return n.instantiationMode==="EAGER"}/**
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
 */class ew{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new YE(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(z||(z={}));const nw={debug:z.DEBUG,verbose:z.VERBOSE,info:z.INFO,warn:z.WARN,error:z.ERROR,silent:z.SILENT},rw=z.INFO,sw={[z.DEBUG]:"log",[z.VERBOSE]:"log",[z.INFO]:"info",[z.WARN]:"warn",[z.ERROR]:"error"},iw=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=sw[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class ja{constructor(t){this.name=t,this._logLevel=rw,this._logHandler=iw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in z))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?nw[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,z.DEBUG,...t),this._logHandler(this,z.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,z.VERBOSE,...t),this._logHandler(this,z.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,z.INFO,...t),this._logHandler(this,z.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,z.WARN,...t),this._logHandler(this,z.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,z.ERROR,...t),this._logHandler(this,z.ERROR,...t)}}const ow=(n,t)=>t.some(e=>n instanceof e);let il,ol;function aw(){return il||(il=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function cw(){return ol||(ol=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const df=new WeakMap,Yo=new WeakMap,ff=new WeakMap,Mo=new WeakMap,$a=new WeakMap;function uw(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{e(Ue(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return t.then(e=>{e instanceof IDBCursor&&df.set(e,n)}).catch(()=>{}),$a.set(t,n),t}function lw(n){if(Yo.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{e(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Yo.set(n,t)}let Zo={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Yo.get(n);if(t==="objectStoreNames")return n.objectStoreNames||ff.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Ue(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function hw(n){Zo=n(Zo)}function dw(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(Lo(this),t,...e);return ff.set(r,t.sort?t.sort():[t]),Ue(r)}:cw().includes(n)?function(...t){return n.apply(Lo(this),t),Ue(df.get(this))}:function(...t){return Ue(n.apply(Lo(this),t))}}function fw(n){return typeof n=="function"?dw(n):(n instanceof IDBTransaction&&lw(n),ow(n,aw())?new Proxy(n,Zo):n)}function Ue(n){if(n instanceof IDBRequest)return uw(n);if(Mo.has(n))return Mo.get(n);const t=fw(n);return t!==n&&(Mo.set(n,t),$a.set(t,n)),t}const Lo=n=>$a.get(n);function pw(n,t,{blocked:e,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,t),c=Ue(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Ue(o.result),u.oldVersion,u.newVersion,Ue(o.transaction),u)}),e&&o.addEventListener("blocked",u=>e(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const gw=["get","getKey","getAll","getAllKeys","count"],mw=["put","add","delete","clear"],xo=new Map;function al(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(xo.get(t))return xo.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=mw.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||gw.includes(e)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[e](...c),s&&u.done]))[0]};return xo.set(t,i),i}hw(n=>({...n,get:(t,e,r)=>al(t,e)||n.get(t,e,r),has:(t,e)=>!!al(t,e)||n.has(t,e)}));/**
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
 */class _w{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(yw(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function yw(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const ta="@firebase/app",cl="0.14.6";/**
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
 */const ve=new ja("@firebase/app"),Tw="@firebase/app-compat",Ew="@firebase/analytics-compat",ww="@firebase/analytics",Iw="@firebase/app-check-compat",vw="@firebase/app-check",Aw="@firebase/auth",bw="@firebase/auth-compat",Cw="@firebase/database",Sw="@firebase/data-connect",Rw="@firebase/database-compat",Pw="@firebase/functions",kw="@firebase/functions-compat",Vw="@firebase/installations",Dw="@firebase/installations-compat",Nw="@firebase/messaging",Ow="@firebase/messaging-compat",Mw="@firebase/performance",Lw="@firebase/performance-compat",xw="@firebase/remote-config",Fw="@firebase/remote-config-compat",Uw="@firebase/storage",Bw="@firebase/storage-compat",jw="@firebase/firestore",$w="@firebase/ai",Hw="@firebase/firestore-compat",qw="firebase",zw="12.6.0";/**
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
 */const ea="[DEFAULT]",Ww={[ta]:"fire-core",[Tw]:"fire-core-compat",[ww]:"fire-analytics",[Ew]:"fire-analytics-compat",[vw]:"fire-app-check",[Iw]:"fire-app-check-compat",[Aw]:"fire-auth",[bw]:"fire-auth-compat",[Cw]:"fire-rtdb",[Sw]:"fire-data-connect",[Rw]:"fire-rtdb-compat",[Pw]:"fire-fn",[kw]:"fire-fn-compat",[Vw]:"fire-iid",[Dw]:"fire-iid-compat",[Nw]:"fire-fcm",[Ow]:"fire-fcm-compat",[Mw]:"fire-perf",[Lw]:"fire-perf-compat",[xw]:"fire-rc",[Fw]:"fire-rc-compat",[Uw]:"fire-gcs",[Bw]:"fire-gcs-compat",[jw]:"fire-fst",[Hw]:"fire-fst-compat",[$w]:"fire-vertex","fire-js":"fire-js",[qw]:"fire-js-all"};/**
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
 */const si=new Map,Jw=new Map,na=new Map;function ul(n,t){try{n.container.addComponent(t)}catch(e){ve.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function jn(n){const t=n.name;if(na.has(t))return ve.debug(`There were multiple attempts to register component ${t}.`),!1;na.set(t,n);for(const e of si.values())ul(e,n);for(const e of Jw.values())ul(e,n);return!0}function Ha(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function Qt(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Gw={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Be=new is("app","Firebase",Gw);/**
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
 */class Kw{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new pn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Be.create("app-deleted",{appName:this._name})}}/**
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
 */const tr=zw;function pf(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:ea,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw Be.create("bad-app-name",{appName:String(s)});if(e||(e=cf()),!e)throw Be.create("no-options");const i=si.get(s);if(i){if(fn(e,i.options)&&fn(r,i.config))return i;throw Be.create("duplicate-app",{appName:s})}const o=new ew(s);for(const u of na.values())o.addComponent(u);const c=new Kw(e,r,o);return si.set(s,c),c}function gf(n=ea){const t=si.get(n);if(!t&&n===ea&&cf())return pf();if(!t)throw Be.create("no-app",{appName:n});return t}function je(n,t,e){let r=Ww[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${t}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),ve.warn(o.join(" "));return}jn(new pn(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
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
 */const Qw="firebase-heartbeat-database",Xw=1,jr="firebase-heartbeat-store";let Fo=null;function mf(){return Fo||(Fo=pw(Qw,Xw,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(jr)}catch(e){console.warn(e)}}}}).catch(n=>{throw Be.create("idb-open",{originalErrorMessage:n.message})})),Fo}async function Yw(n){try{const e=(await mf()).transaction(jr),r=await e.objectStore(jr).get(_f(n));return await e.done,r}catch(t){if(t instanceof Se)ve.warn(t.message);else{const e=Be.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});ve.warn(e.message)}}}async function ll(n,t){try{const r=(await mf()).transaction(jr,"readwrite");await r.objectStore(jr).put(t,_f(n)),await r.done}catch(e){if(e instanceof Se)ve.warn(e.message);else{const r=Be.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});ve.warn(r.message)}}}function _f(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Zw=1024,tI=30;class eI{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new rI(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=hl();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>tI){const o=sI(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){ve.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=hl(),{heartbeatsToSend:r,unsentEntries:s}=nI(this._heartbeatsCache.heartbeats),i=ri(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return ve.warn(e),""}}}function hl(){return new Date().toISOString().substring(0,10)}function nI(n,t=Zw){const e=[];let r=n.slice();for(const s of n){const i=e.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),dl(e)>t){i.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),dl(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class rI{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return HE()?qE().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Yw(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return ll(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return ll(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function dl(n){return ri(JSON.stringify({version:2,heartbeats:n})).length}function sI(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
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
 */function iI(n){jn(new pn("platform-logger",t=>new _w(t),"PRIVATE")),jn(new pn("heartbeat",t=>new eI(t),"PRIVATE")),je(ta,cl,n),je(ta,cl,"esm2020"),je("fire-js","")}iI("");var oI="firebase",aI="12.7.0";/**
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
 */je(oI,aI,"app");function yf(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const cI=yf,Tf=new is("auth","Firebase",yf());/**
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
 */const ii=new ja("@firebase/auth");function uI(n,...t){ii.logLevel<=z.WARN&&ii.warn(`Auth (${tr}): ${n}`,...t)}function Bs(n,...t){ii.logLevel<=z.ERROR&&ii.error(`Auth (${tr}): ${n}`,...t)}/**
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
 */function pe(n,...t){throw za(n,...t)}function ne(n,...t){return za(n,...t)}function qa(n,t,e){const r={...cI(),[t]:e};return new is("auth","Firebase",r).create(t,{appName:n.name})}function $e(n){return qa(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ef(n,t,e){const r=e;if(!(t instanceof r))throw r.name!==t.constructor.name&&pe(n,"argument-error"),qa(n,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function za(n,...t){if(typeof n!="string"){const e=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(e,...r)}return Tf.create(n,...t)}function j(n,t,...e){if(!n)throw za(t,...e)}function ye(n){const t="INTERNAL ASSERTION FAILED: "+n;throw Bs(t),new Error(t)}function Ae(n,t){n||ye(t)}/**
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
 */function ra(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function lI(){return fl()==="http:"||fl()==="https:"}function fl(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
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
 */function hI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(lI()||UE()||"connection"in navigator)?navigator.onLine:!0}function dI(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class as{constructor(t,e){this.shortDelay=t,this.longDelay=e,Ae(e>t,"Short delay should be less than long delay!"),this.isMobile=LE()||BE()}get(){return hI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Wa(n,t){Ae(n.emulator,"Emulator should always be set here");const{url:e}=n.emulator;return t?`${e}${t.startsWith("/")?t.slice(1):t}`:e}/**
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
 */class wf{static initialize(t,e,r){this.fetchImpl=t,e&&(this.headersImpl=e),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ye("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ye("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ye("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const fI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const pI=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],gI=new as(3e4,6e4);function Ja(n,t){return n.tenantId&&!t.tenantId?{...t,tenantId:n.tenantId}:t}async function er(n,t,e,r,s={}){return If(n,s,async()=>{let i={},o={};r&&(t==="GET"?o=r:i={body:JSON.stringify(r)});const c=os({key:n.config.apiKey,...o}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h={method:t,headers:u,...i};return FE()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&Zn(n.emulatorConfig.host)&&(h.credentials="include"),wf.fetch()(await vf(n,n.config.apiHost,e,c),h)})}async function If(n,t,e){n._canInitEmulator=!1;const r={...fI,...t};try{const s=new _I(n),i=await Promise.race([e(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Os(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Os(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Os(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw Os(n,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw qa(n,f,h);pe(n,f)}}catch(s){if(s instanceof Se)throw s;pe(n,"network-request-failed",{message:String(s)})}}async function mI(n,t,e,r,s={}){const i=await er(n,t,e,r,s);return"mfaPendingCredential"in i&&pe(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function vf(n,t,e,r){const s=`${t}${e}?${r}`,i=n,o=i.config.emulator?Wa(n.config,s):`${n.config.apiScheme}://${s}`;return pI.includes(e)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class _I{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((e,r)=>{this.timer=setTimeout(()=>r(ne(this.auth,"network-request-failed")),gI.get())})}}function Os(n,t,e){const r={appName:n.name};e.email&&(r.email=e.email),e.phoneNumber&&(r.phoneNumber=e.phoneNumber);const s=ne(n,t,r);return s.customData._tokenResponse=e,s}/**
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
 */async function yI(n,t){return er(n,"POST","/v1/accounts:delete",t)}async function oi(n,t){return er(n,"POST","/v1/accounts:lookup",t)}/**
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
 */function Vr(n){if(n)try{const t=new Date(Number(n));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function TI(n,t=!1){const e=At(n),r=await e.getIdToken(t),s=Ga(r);j(s&&s.exp&&s.auth_time&&s.iat,e.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Vr(Uo(s.auth_time)),issuedAtTime:Vr(Uo(s.iat)),expirationTime:Vr(Uo(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Uo(n){return Number(n)*1e3}function Ga(n){const[t,e,r]=n.split(".");if(t===void 0||e===void 0||r===void 0)return Bs("JWT malformed, contained fewer than 3 sections"),null;try{const s=of(e);return s?JSON.parse(s):(Bs("Failed to decode base64 JWT payload"),null)}catch(s){return Bs("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function pl(n){const t=Ga(n);return j(t,"internal-error"),j(typeof t.exp<"u","internal-error"),j(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
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
 */async function $r(n,t,e=!1){if(e)return t;try{return await t}catch(r){throw r instanceof Se&&EI(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function EI({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class wI{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){if(t){const e=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),e}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class sa{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=Vr(this.lastLoginAt),this.creationTime=Vr(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ai(n){var p;const t=n.auth,e=await n.getIdToken(),r=await $r(n,oi(t,{idToken:e}));j(r==null?void 0:r.users.length,t,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(p=s.providerUserInfo)!=null&&p.length?Af(s.providerUserInfo):[],o=vI(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(o!=null&&o.length),h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new sa(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function II(n){const t=At(n);await ai(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function vI(n,t){return[...n.filter(r=>!t.some(s=>s.providerId===r.providerId)),...t]}function Af(n){return n.map(({providerId:t,...e})=>({providerId:t,uid:e.rawId||"",displayName:e.displayName||null,email:e.email||null,phoneNumber:e.phoneNumber||null,photoURL:e.photoUrl||null}))}/**
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
 */async function AI(n,t){const e=await If(n,{},async()=>{const r=os({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await vf(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&Zn(n.emulatorConfig.host)&&(u.credentials="include"),wf.fetch()(o,u)});return{accessToken:e.access_token,expiresIn:e.expires_in,refreshToken:e.refresh_token}}async function bI(n,t){return er(n,"POST","/v2/accounts:revokeToken",Ja(n,t))}/**
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
 */class On{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){j(t.idToken,"internal-error"),j(typeof t.idToken<"u","internal-error"),j(typeof t.refreshToken<"u","internal-error");const e="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):pl(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}updateFromIdToken(t){j(t.length!==0,"internal-error");const e=pl(t);this.updateTokensAndExpiration(t,null,e)}async getToken(t,e=!1){return!e&&this.accessToken&&!this.isExpired?this.accessToken:(j(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:r,refreshToken:s,expiresIn:i}=await AI(t,e);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(t,e,r){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(t,e){const{refreshToken:r,accessToken:s,expirationTime:i}=e,o=new On;return r&&(j(typeof r=="string","internal-error",{appName:t}),o.refreshToken=r),s&&(j(typeof s=="string","internal-error",{appName:t}),o.accessToken=s),i&&(j(typeof i=="number","internal-error",{appName:t}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new On,this.toJSON())}_performRefresh(){return ye("not implemented")}}/**
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
 */function Oe(n,t){j(typeof n=="string"||typeof n>"u","internal-error",{appName:t})}class ee{constructor({uid:t,auth:e,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new wI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=e,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new sa(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(t){const e=await $r(this,this.stsTokenManager.getToken(this.auth,t));return j(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return TI(this,t)}reload(){return II(this)}_assign(t){this!==t&&(j(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(e=>({...e})),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const e=new ee({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return e.metadata._copy(this.metadata),e}_onReload(t){j(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let r=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),r=!0),e&&await ai(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qt(this.auth.app))return Promise.reject($e(this.auth));const t=await this.getIdToken();return await $r(this,yI(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>({...t})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){const r=e.displayName??void 0,s=e.email??void 0,i=e.phoneNumber??void 0,o=e.photoURL??void 0,c=e.tenantId??void 0,u=e._redirectEventId??void 0,h=e.createdAt??void 0,f=e.lastLoginAt??void 0,{uid:p,emailVerified:m,isAnonymous:v,providerData:S,stsTokenManager:k}=e;j(p&&k,t,"internal-error");const V=On.fromJSON(this.name,k);j(typeof p=="string",t,"internal-error"),Oe(r,t.name),Oe(s,t.name),j(typeof m=="boolean",t,"internal-error"),j(typeof v=="boolean",t,"internal-error"),Oe(i,t.name),Oe(o,t.name),Oe(c,t.name),Oe(u,t.name),Oe(h,t.name),Oe(f,t.name);const L=new ee({uid:p,auth:t,email:s,emailVerified:m,displayName:r,isAnonymous:v,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:V,createdAt:h,lastLoginAt:f});return S&&Array.isArray(S)&&(L.providerData=S.map(x=>({...x}))),u&&(L._redirectEventId=u),L}static async _fromIdTokenResponse(t,e,r=!1){const s=new On;s.updateFromServerResponse(e);const i=new ee({uid:e.localId,auth:t,stsTokenManager:s,isAnonymous:r});return await ai(i),i}static async _fromGetAccountInfoResponse(t,e,r){const s=e.users[0];j(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Af(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new On;c.updateFromIdToken(r);const u=new ee({uid:s.localId,auth:t,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new sa(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
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
 */const gl=new Map;function Te(n){Ae(n instanceof Function,"Expected a class definition");let t=gl.get(n);return t?(Ae(t instanceof n,"Instance stored in cache mismatched with class"),t):(t=new n,gl.set(n,t),t)}/**
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
 */class bf{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return e===void 0?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}bf.type="NONE";const ml=bf;/**
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
 */function js(n,t,e){return`firebase:${n}:${t}:${e}`}class Mn{constructor(t,e,r){this.persistence=t,this.auth=e,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=js(this.userKey,s.apiKey,i),this.fullPersistenceKey=js("persistence",s.apiKey,i),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const e=await oi(this.auth,{idToken:t}).catch(()=>{});return e?ee._fromGetAccountInfoResponse(this.auth,e,t):null}return ee._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,e)return this.setCurrentUser(e)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,r="authUser"){if(!e.length)return new Mn(Te(ml),t,r);const s=(await Promise.all(e.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Te(ml);const o=js(r,t.config.apiKey,t.name);let c=null;for(const h of e)try{const f=await h._get(o);if(f){let p;if(typeof f=="string"){const m=await oi(t,{idToken:f}).catch(()=>{});if(!m)break;p=await ee._fromGetAccountInfoResponse(t,m,f)}else p=ee._fromJSON(t,f);h!==i&&(c=p),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Mn(i,t,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(e.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Mn(i,t,r))}}/**
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
 */function _l(n){const t=n.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Pf(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Cf(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Vf(t))return"Blackberry";if(Df(t))return"Webos";if(Sf(t))return"Safari";if((t.includes("chrome/")||Rf(t))&&!t.includes("edge/"))return"Chrome";if(kf(t))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(e);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Cf(n=Lt()){return/firefox\//i.test(n)}function Sf(n=Lt()){const t=n.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Rf(n=Lt()){return/crios\//i.test(n)}function Pf(n=Lt()){return/iemobile/i.test(n)}function kf(n=Lt()){return/android/i.test(n)}function Vf(n=Lt()){return/blackberry/i.test(n)}function Df(n=Lt()){return/webos/i.test(n)}function Ka(n=Lt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function CI(n=Lt()){var t;return Ka(n)&&!!((t=window.navigator)!=null&&t.standalone)}function SI(){return jE()&&document.documentMode===10}function Nf(n=Lt()){return Ka(n)||kf(n)||Df(n)||Vf(n)||/windows phone/i.test(n)||Pf(n)}/**
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
 */function Of(n,t=[]){let e;switch(n){case"Browser":e=_l(Lt());break;case"Worker":e=`${_l(Lt())}-${n}`;break;default:e=n}const r=t.length?t.join(","):"FirebaseCore-web";return`${e}/JsCore/${tr}/${r}`}/**
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
 */class RI{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,e){const r=i=>new Promise((o,c)=>{try{const u=t(i);o(u)}catch(u){c(u)}});r.onAbort=e,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const e=[];try{for(const r of this.queue)await r(t),r.onAbort&&e.push(r.onAbort)}catch(r){e.reverse();for(const s of e)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function PI(n,t={}){return er(n,"GET","/v2/passwordPolicy",Ja(n,t))}/**
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
 */const kI=6;class VI{constructor(t){var r;const e=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=e.minPasswordLength??kI,e.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=e.maxPasswordLength),e.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=e.containsLowercaseCharacter),e.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=e.containsUppercaseCharacter),e.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=e.containsNumericCharacter),e.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=e.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=t.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=t.forceUpgradeOnSignin??!1,this.schemaVersion=t.schemaVersion}validatePassword(t){const e={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,e),this.validatePasswordCharacterOptions(t,e),e.isValid&&(e.isValid=e.meetsMinPasswordLength??!0),e.isValid&&(e.isValid=e.meetsMaxPasswordLength??!0),e.isValid&&(e.isValid=e.containsLowercaseLetter??!0),e.isValid&&(e.isValid=e.containsUppercaseLetter??!0),e.isValid&&(e.isValid=e.containsNumericCharacter??!0),e.isValid&&(e.isValid=e.containsNonAlphanumericCharacter??!0),e}validatePasswordLengthOptions(t,e){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(e.meetsMinPasswordLength=t.length>=r),s&&(e.meetsMaxPasswordLength=t.length<=s)}validatePasswordCharacterOptions(t,e){this.updatePasswordCharacterOptionsStatuses(e,!1,!1,!1,!1);let r;for(let s=0;s<t.length;s++)r=t.charAt(s),this.updatePasswordCharacterOptionsStatuses(e,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(t,e,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=e)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=i))}}/**
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
 */class DI{constructor(t,e,r,s){this.app=t,this.heartbeatServiceProvider=e,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new yl(this),this.idTokenSubscription=new yl(this),this.beforeStateQueue=new RI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Tf,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=Te(e)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Mn.create(this,t),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(e),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const e=await oi(this,{idToken:t}),r=await ee._fromGetAccountInfoResponse(this,e,t);await this.directlySetCurrentUser(r)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var i;if(Qt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const e=await this.assertedPersistence.getCurrentUser();let r=e,s=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(t);(!o||o===c)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=e,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return j(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await ai(t)}catch(e){if((e==null?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=dI()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(Qt(this.app))return Promise.reject($e(this));const e=t?At(t):null;return e&&j(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t,e=!1){if(!this._deleted)return t&&j(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),e||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return Qt(this.app)?Promise.reject($e(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return Qt(this.app)?Promise.reject($e(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Te(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const e=this._getPasswordPolicyInternal();return e.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):e.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await PI(this),e=new VI(t);this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new is("auth","Firebase",t())}onAuthStateChanged(t,e,r){return this.registerStateListener(this.authStateSubscription,t,e,r)}beforeAuthStateChanged(t,e){return this.beforeStateQueue.pushCallback(t,e)}onIdTokenChanged(t,e,r){return this.registerStateListener(this.idTokenSubscription,t,e,r)}authStateReady(){return new Promise((t,e)=>{if(this.currentUser)t();else{const r=this.onAuthStateChanged(()=>{r(),t()},e)}})}async revokeAccessToken(t){if(this.currentUser){const e=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:e};this.tenantId!=null&&(r.tenantId=this.tenantId),await bI(this,r)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)==null?void 0:t.toJSON()}}async _setRedirectUser(t,e){const r=await this.getOrInitRedirectPersistenceManager(e);return t===null?r.removeCurrentUser():r.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&Te(t)||this._popupRedirectResolver;j(e,this,"argument-error"),this.redirectPersistenceManager=await Mn.create(this,[Te(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var e,r;return this._isInitialized&&await this.queue(async()=>{}),((e=this._currentUser)==null?void 0:e._redirectEventId)===t?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=((e=this.currentUser)==null?void 0:e.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,r,s){if(this._deleted)return()=>{};const i=typeof e=="function"?e:e.next.bind(e);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(j(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof e=="function"){const u=t.addObserver(e,r,s);return()=>{o=!0,u()}}else{const u=t.addObserver(e);return()=>{o=!0,u()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return j(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=Of(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const e=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());e&&(t["X-Firebase-Client"]=e);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;if(Qt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:e.getToken());return t!=null&&t.error&&uI(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function nr(n){return At(n)}class yl{constructor(t){this.auth=t,this.observer=null,this.addObserver=KE(e=>this.observer=e)}get next(){return j(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Qa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function NI(n){Qa=n}function OI(n){return Qa.loadJS(n)}function MI(){return Qa.gapiScript}function LI(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function xI(n,t){const e=Ha(n,"auth");if(e.isInitialized()){const s=e.getImmediate(),i=e.getOptions();if(fn(i,t??{}))return s;pe(s,"already-initialized")}return e.initialize({options:t})}function FI(n,t){const e=(t==null?void 0:t.persistence)||[],r=(Array.isArray(e)?e:[e]).map(Te);t!=null&&t.errorMap&&n._updateErrorMap(t.errorMap),n._initializeWithPersistence(r,t==null?void 0:t.popupRedirectResolver)}function UI(n,t,e){const r=nr(n);j(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=!1,i=Mf(t),{host:o,port:c}=BI(t),u=c===null?"":`:${c}`,h={url:`${i}//${o}${u}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){j(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),j(fn(h,r.config.emulator)&&fn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Zn(o)?(lf(`${i}//${o}${u}`),hf("Auth",!0)):jI()}function Mf(n){const t=n.indexOf(":");return t<0?"":n.substr(0,t+1)}function BI(n){const t=Mf(n),e=/(\/\/)?([^?#/]+)/.exec(n.substr(t.length));if(!e)return{host:"",port:null};const r=e[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Tl(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Tl(o)}}}function Tl(n){if(!n)return null;const t=Number(n);return isNaN(t)?null:t}function jI(){function n(){const t=document.createElement("p"),e=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",e.position="fixed",e.width="100%",e.backgroundColor="#ffffff",e.border=".1em solid #000000",e.color="#b50000",e.bottom="0px",e.left="0px",e.margin="0px",e.zIndex="10000",e.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Lf{constructor(t,e){this.providerId=t,this.signInMethod=e}toJSON(){return ye("not implemented")}_getIdTokenResponse(t){return ye("not implemented")}_linkToIdToken(t,e){return ye("not implemented")}_getReauthenticationResolver(t){return ye("not implemented")}}/**
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
 */async function Ln(n,t){return mI(n,"POST","/v1/accounts:signInWithIdp",Ja(n,t))}/**
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
 */const $I="http://localhost";class gn extends Lf{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const e=new gn(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(e.idToken=t.idToken),t.accessToken&&(e.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(e.nonce=t.nonce),t.pendingToken&&(e.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(e.accessToken=t.oauthToken,e.secret=t.oauthTokenSecret):pe("argument-error"),e}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t,{providerId:r,signInMethod:s,...i}=e;if(!r||!s)return null;const o=new gn(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(t){const e=this.buildRequest();return Ln(t,e)}_linkToIdToken(t,e){const r=this.buildRequest();return r.idToken=e,Ln(t,r)}_getReauthenticationResolver(t){const e=this.buildRequest();return e.autoCreate=!1,Ln(t,e)}buildRequest(){const t={requestUri:$I,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const e={};this.idToken&&(e.id_token=this.idToken),this.accessToken&&(e.access_token=this.accessToken),this.secret&&(e.oauth_token_secret=this.secret),e.providerId=this.providerId,this.nonce&&!this.pendingToken&&(e.nonce=this.nonce),t.postBody=os(e)}return t}}/**
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
 */class Li{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
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
 */class cs extends Li{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
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
 */class Me extends cs{constructor(){super("facebook.com")}static credential(t){return gn._fromParams({providerId:Me.PROVIDER_ID,signInMethod:Me.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Me.credentialFromTaggedObject(t)}static credentialFromError(t){return Me.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Me.credential(t.oauthAccessToken)}catch{return null}}}Me.FACEBOOK_SIGN_IN_METHOD="facebook.com";Me.PROVIDER_ID="facebook.com";/**
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
 */class _e extends cs{constructor(){super("google.com"),this.addScope("profile")}static credential(t,e){return gn._fromParams({providerId:_e.PROVIDER_ID,signInMethod:_e.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:e})}static credentialFromResult(t){return _e.credentialFromTaggedObject(t)}static credentialFromError(t){return _e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:e,oauthAccessToken:r}=t;if(!e&&!r)return null;try{return _e.credential(e,r)}catch{return null}}}_e.GOOGLE_SIGN_IN_METHOD="google.com";_e.PROVIDER_ID="google.com";/**
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
 */class Le extends cs{constructor(){super("github.com")}static credential(t){return gn._fromParams({providerId:Le.PROVIDER_ID,signInMethod:Le.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Le.credentialFromTaggedObject(t)}static credentialFromError(t){return Le.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Le.credential(t.oauthAccessToken)}catch{return null}}}Le.GITHUB_SIGN_IN_METHOD="github.com";Le.PROVIDER_ID="github.com";/**
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
 */class xe extends cs{constructor(){super("twitter.com")}static credential(t,e){return gn._fromParams({providerId:xe.PROVIDER_ID,signInMethod:xe.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:e})}static credentialFromResult(t){return xe.credentialFromTaggedObject(t)}static credentialFromError(t){return xe.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:e,oauthTokenSecret:r}=t;if(!e||!r)return null;try{return xe.credential(e,r)}catch{return null}}}xe.TWITTER_SIGN_IN_METHOD="twitter.com";xe.PROVIDER_ID="twitter.com";/**
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
 */class $n{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,e,r,s=!1){const i=await ee._fromIdTokenResponse(t,r,s),o=El(r);return new $n({user:i,providerId:o,_tokenResponse:r,operationType:e})}static async _forOperation(t,e,r){await t._updateTokensIfNecessary(r,!0);const s=El(r);return new $n({user:t,providerId:s,_tokenResponse:r,operationType:e})}}function El(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class ci extends Se{constructor(t,e,r,s){super(e.code,e.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ci.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:e.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,e,r,s){return new ci(t,e,r,s)}}function xf(n,t,e,r){return(t==="reauthenticate"?e._getReauthenticationResolver(n):e._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ci._fromErrorAndOperation(n,i,t,r):i})}async function HI(n,t,e=!1){const r=await $r(n,t._linkToIdToken(n.auth,await n.getIdToken()),e);return $n._forOperation(n,"link",r)}/**
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
 */async function qI(n,t,e=!1){const{auth:r}=n;if(Qt(r.app))return Promise.reject($e(r));const s="reauthenticate";try{const i=await $r(n,xf(r,s,t,n),e);j(i.idToken,r,"internal-error");const o=Ga(i.idToken);j(o,r,"internal-error");const{sub:c}=o;return j(n.uid===c,r,"user-mismatch"),$n._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&pe(r,"user-mismatch"),i}}/**
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
 */async function zI(n,t,e=!1){if(Qt(n.app))return Promise.reject($e(n));const r="signIn",s=await xf(n,r,t),i=await $n._fromIdTokenResponse(n,r,s);return e||await n._updateCurrentUser(i.user),i}/**
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
 */function WI(n,t){return At(n).setPersistence(t)}function JI(n,t,e,r){return At(n).onIdTokenChanged(t,e,r)}function GI(n,t,e){return At(n).beforeAuthStateChanged(t,e)}function KI(n,t,e,r){return At(n).onAuthStateChanged(t,e,r)}function QI(n){return At(n).signOut()}const ui="__sak";/**
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
 */class Ff{constructor(t,e){this.storageRetriever=t,this.type=e}_isAvailable(){try{return this.storage?(this.storage.setItem(ui,"1"),this.storage.removeItem(ui),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,e){return this.storage.setItem(t,JSON.stringify(e)),Promise.resolve()}_get(t){const e=this.storage.getItem(t);return Promise.resolve(e?JSON.parse(e):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const XI=1e3,YI=10;class Uf extends Ff{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,e)=>this.onStorageEvent(t,e),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Nf(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const e of Object.keys(this.listeners)){const r=this.storage.getItem(e),s=this.localCache[e];r!==s&&t(e,s,r)}}onStorageEvent(t,e=!1){if(!t.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=t.key;e?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!e&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);SI()&&i!==t.newValue&&t.newValue!==t.oldValue?setTimeout(s,YI):s()}notifyListeners(t,e){this.localCache[t]=e;const r=this.listeners[t];if(r)for(const s of Array.from(r))s(e&&JSON.parse(e))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,e,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:e,newValue:r}),!0)})},XI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,e){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,e){await super._set(t,e),this.localCache[t]=JSON.stringify(e)}async _get(t){const e=await super._get(t);return this.localCache[t]=JSON.stringify(e),e}async _remove(t){await super._remove(t),delete this.localCache[t]}}Uf.type="LOCAL";const Bf=Uf;/**
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
 */class jf extends Ff{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,e){}_removeListener(t,e){}}jf.type="SESSION";const Xa=jf;/**
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
 */function ZI(n){return Promise.all(n.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(e){return{fulfilled:!1,reason:e}}}))}/**
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
 */class xi{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find(s=>s.isListeningto(t));if(e)return e;const r=new xi(t);return this.receivers.push(r),r}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:r,eventType:s,data:i}=e.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;e.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async h=>h(e.origin,i)),u=await ZI(c);e.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(t,e){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),(!e||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}xi.receivers=[];/**
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
 */function Ya(n="",t=10){let e="";for(let r=0;r<t;r++)e+=Math.floor(Math.random()*10);return n+e}/**
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
 */class tv{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const h=Ya("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const m=p;if(m.data.eventId===h)switch(m.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(m.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:t,eventId:h,data:e},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function le(){return window}function ev(n){le().location.href=n}/**
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
 */function $f(){return typeof le().WorkerGlobalScope<"u"&&typeof le().importScripts=="function"}async function nv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function rv(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function sv(){return $f()?self:null}/**
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
 */const Hf="firebaseLocalStorageDb",iv=1,li="firebaseLocalStorage",qf="fbase_key";class us{constructor(t){this.request=t}toPromise(){return new Promise((t,e)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{e(this.request.error)})})}}function Fi(n,t){return n.transaction([li],t?"readwrite":"readonly").objectStore(li)}function ov(){const n=indexedDB.deleteDatabase(Hf);return new us(n).toPromise()}function ia(){const n=indexedDB.open(Hf,iv);return new Promise((t,e)=>{n.addEventListener("error",()=>{e(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(li,{keyPath:qf})}catch(s){e(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(li)?t(r):(r.close(),await ov(),t(await ia()))})})}async function wl(n,t,e){const r=Fi(n,!0).put({[qf]:t,value:e});return new us(r).toPromise()}async function av(n,t){const e=Fi(n,!1).get(t),r=await new us(e).toPromise();return r===void 0?null:r.value}function Il(n,t){const e=Fi(n,!0).delete(t);return new us(e).toPromise()}const cv=800,uv=3;class zf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ia(),this.db)}async _withRetries(t){let e=0;for(;;)try{const r=await this._openDb();return await t(r)}catch(r){if(e++>uv)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return $f()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=xi._getInstance(sv()),this.receiver._subscribe("keyChanged",async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)})),this.receiver._subscribe("ping",async(t,e)=>["keyChanged"])}async initializeSender(){var e,r;if(this.activeServiceWorker=await nv(),!this.activeServiceWorker)return;this.sender=new tv(this.activeServiceWorker);const t=await this.sender._send("ping",{},800);t&&(e=t[0])!=null&&e.fulfilled&&(r=t[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||rv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await ia();return await wl(t,ui,"1"),await Il(t,ui),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite(async()=>(await this._withRetries(r=>wl(r,t,e)),this.localCache[t]=e,this.notifyServiceWorker(t)))}async _get(t){const e=await this._withRetries(r=>av(r,t));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(e=>Il(e,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(s=>{const i=Fi(s,!1).getAll();return new us(i).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const e=[],r=new Set;if(t.length!==0)for(const{fbase_key:s,value:i}of t)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),e.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),e.push(s));return e}notifyListeners(t,e){this.localCache[t]=e;const r=this.listeners[t];if(r)for(const s of Array.from(r))s(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),cv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}zf.type="LOCAL";const Wf=zf;new as(3e4,6e4);/**
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
 */function Za(n,t){return t?Te(t):(j(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class tc extends Lf{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return Ln(t,this._buildIdpRequest())}_linkToIdToken(t,e){return Ln(t,this._buildIdpRequest(e))}_getReauthenticationResolver(t){return Ln(t,this._buildIdpRequest())}_buildIdpRequest(t){const e={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(e.idToken=t),e}}function lv(n){return zI(n.auth,new tc(n),n.bypassAuthState)}function hv(n){const{auth:t,user:e}=n;return j(e,t,"internal-error"),qI(e,new tc(n),n.bypassAuthState)}async function dv(n){const{auth:t,user:e}=n;return j(e,t,"internal-error"),HI(e,new tc(n),n.bypassAuthState)}/**
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
 */class Jf{constructor(t,e,r,s,i=!1){this.auth=t,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(e)?e:[e]}execute(){return new Promise(async(t,e)=>{this.pendingPromise={resolve:t,reject:e};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(t){const{urlResponse:e,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=t;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:e,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return lv;case"linkViaPopup":case"linkViaRedirect":return dv;case"reauthViaPopup":case"reauthViaRedirect":return hv;default:pe(this.auth,"internal-error")}}resolve(t){Ae(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){Ae(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const fv=new as(2e3,1e4);async function pv(n,t,e){if(Qt(n.app))return Promise.reject(ne(n,"operation-not-supported-in-this-environment"));const r=nr(n);Ef(n,t,Li);const s=Za(r,e);return new un(r,"signInViaPopup",t,s).executeNotNull()}class un extends Jf{constructor(t,e,r,s,i){super(t,e,s,i),this.provider=r,this.authWindow=null,this.pollId=null,un.currentPopupAction&&un.currentPopupAction.cancel(),un.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return j(t,this.auth,"internal-error"),t}async onExecution(){Ae(this.filter.length===1,"Popup operations only handle one event");const t=Ya();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(ne(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)==null?void 0:t.associatedEvent)||null}cancel(){this.reject(ne(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,un.currentPopupAction=null}pollUserCancellation(){const t=()=>{var e,r;if((r=(e=this.authWindow)==null?void 0:e.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ne(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,fv.get())};t()}}un.currentPopupAction=null;/**
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
 */const gv="pendingRedirect",$s=new Map;class mv extends Jf{constructor(t,e,r=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],e,void 0,r),this.eventId=null}async execute(){let t=$s.get(this.auth._key());if(!t){try{const r=await _v(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(r)}catch(e){t=()=>Promise.reject(e)}$s.set(this.auth._key(),t)}return this.bypassAuthState||$s.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const e=await this.auth._redirectUserForId(t.eventId);if(e)return this.user=e,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function _v(n,t){const e=Kf(t),r=Gf(n);if(!await r._isAvailable())return!1;const s=await r._get(e)==="true";return await r._remove(e),s}async function yv(n,t){return Gf(n)._set(Kf(t),"true")}function Tv(n,t){$s.set(n._key(),t)}function Gf(n){return Te(n._redirectPersistence)}function Kf(n){return js(gv,n.config.apiKey,n.name)}/**
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
 */function Ev(n,t,e){return wv(n,t,e)}async function wv(n,t,e){if(Qt(n.app))return Promise.reject($e(n));const r=nr(n);Ef(n,t,Li),await r._initializationPromise;const s=Za(r,e);return await yv(s,r),s._openRedirect(r,t,"signInViaRedirect")}async function Iv(n,t){return await nr(n)._initializationPromise,Qf(n,t,!1)}async function Qf(n,t,e=!1){if(Qt(n.app))return Promise.reject($e(n));const r=nr(n),s=Za(r,t),o=await new mv(r,s,e).execute();return o&&!e&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}/**
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
 */const vv=600*1e3;class Av{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let e=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(t,r)&&(e=!0,this.sendToConsumer(t,r),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!bv(t)||(this.hasHandledPotentialRedirect=!0,e||(this.queuedRedirectEvent=t,e=!0)),e}sendToConsumer(t,e){var r;if(t.error&&!Xf(t)){const s=((r=t.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";e.onError(ne(this.auth,s))}else e.onAuthEvent(t)}isEventForConsumer(t,e){const r=e.eventId===null||!!t.eventId&&t.eventId===e.eventId;return e.filter.includes(t.type)&&r}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=vv&&this.cachedEventUids.clear(),this.cachedEventUids.has(vl(t))}saveEventToCache(t){this.cachedEventUids.add(vl(t)),this.lastProcessedEventTime=Date.now()}}function vl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(t=>t).join("-")}function Xf({type:n,error:t}){return n==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function bv(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Xf(n);default:return!1}}/**
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
 */async function Cv(n,t={}){return er(n,"GET","/v1/projects",t)}/**
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
 */const Sv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Rv=/^https?/;async function Pv(n){if(n.config.emulator)return;const{authorizedDomains:t}=await Cv(n);for(const e of t)try{if(kv(e))return}catch{}pe(n,"unauthorized-domain")}function kv(n){const t=ra(),{protocol:e,hostname:r}=new URL(t);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?e==="chrome-extension:"&&n.replace("chrome-extension://","")===t.replace("chrome-extension://",""):e==="chrome-extension:"&&o.hostname===r}if(!Rv.test(e))return!1;if(Sv.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const Vv=new as(3e4,6e4);function Al(){const n=le().___jsl;if(n!=null&&n.H){for(const t of Object.keys(n.H))if(n.H[t].r=n.H[t].r||[],n.H[t].L=n.H[t].L||[],n.H[t].r=[...n.H[t].L],n.CP)for(let e=0;e<n.CP.length;e++)n.CP[e]=null}}function Dv(n){return new Promise((t,e)=>{var s,i,o;function r(){Al(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Al(),e(ne(n,"network-request-failed"))},timeout:Vv.get()})}if((i=(s=le().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)t(gapi.iframes.getContext());else if((o=le().gapi)!=null&&o.load)r();else{const c=LI("iframefcb");return le()[c]=()=>{gapi.load?r():e(ne(n,"network-request-failed"))},OI(`${MI()}?onload=${c}`).catch(u=>e(u))}}).catch(t=>{throw Hs=null,t})}let Hs=null;function Nv(n){return Hs=Hs||Dv(n),Hs}/**
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
 */const Ov=new as(5e3,15e3),Mv="__/auth/iframe",Lv="emulator/auth/iframe",xv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Fv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Uv(n){const t=n.config;j(t.authDomain,n,"auth-domain-config-required");const e=t.emulator?Wa(t,Lv):`https://${n.config.authDomain}/${Mv}`,r={apiKey:t.apiKey,appName:n.name,v:tr},s=Fv.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${e}?${os(r).slice(1)}`}async function Bv(n){const t=await Nv(n),e=le().gapi;return j(e,n,"internal-error"),t.open({where:document.body,url:Uv(n),messageHandlersFilter:e.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:xv,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=ne(n,"network-request-failed"),c=le().setTimeout(()=>{i(o)},Ov.get());function u(){le().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
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
 */const jv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},$v=500,Hv=600,qv="_blank",zv="http://localhost";class bl{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Wv(n,t,e,r=$v,s=Hv){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...jv,width:r.toString(),height:s.toString(),top:i,left:o},h=Lt().toLowerCase();e&&(c=Rf(h)?qv:e),Cf(h)&&(t=t||zv,u.scrollbars="yes");const f=Object.entries(u).reduce((m,[v,S])=>`${m}${v}=${S},`,"");if(CI(h)&&c!=="_self")return Jv(t||"",c),new bl(null);const p=window.open(t||"",c,f);j(p,n,"popup-blocked");try{p.focus()}catch{}return new bl(p)}function Jv(n,t){const e=document.createElement("a");e.href=n,e.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),e.dispatchEvent(r)}/**
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
 */const Gv="__/auth/handler",Kv="emulator/auth/handler",Qv=encodeURIComponent("fac");async function Cl(n,t,e,r,s,i){j(n.config.authDomain,n,"auth-domain-config-required"),j(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:e,redirectUrl:r,v:tr,eventId:s};if(t instanceof Li){t.setDefaultLanguage(n.languageCode),o.providerId=t.providerId||"",GE(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(t instanceof cs){const f=t.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),h=u?`#${Qv}=${encodeURIComponent(u)}`:"";return`${Xv(n)}?${os(c).slice(1)}${h}`}function Xv({config:n}){return n.emulator?Wa(n,Kv):`https://${n.authDomain}/${Gv}`}/**
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
 */const Bo="webStorageSupport";class Yv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Xa,this._completeRedirectFn=Qf,this._overrideRedirectResult=Tv}async _openPopup(t,e,r,s){var o;Ae((o=this.eventManagers[t._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await Cl(t,e,r,ra(),s);return Wv(t,i,Ya())}async _openRedirect(t,e,r,s){await this._originValidation(t);const i=await Cl(t,e,r,ra(),s);return ev(i),new Promise(()=>{})}_initialize(t){const e=t._key();if(this.eventManagers[e]){const{manager:s,promise:i}=this.eventManagers[e];return s?Promise.resolve(s):(Ae(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(t);return this.eventManagers[e]={promise:r},r.catch(()=>{delete this.eventManagers[e]}),r}async initAndGetManager(t){const e=await Bv(t),r=new Av(t);return e.register("authEvent",s=>(j(s==null?void 0:s.authEvent,t,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:r},this.iframes[t._key()]=e,r}_isIframeWebStorageSupported(t,e){this.iframes[t._key()].send(Bo,{type:Bo},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[Bo];i!==void 0&&e(!!i),pe(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=Pv(t)),this.originValidationPromises[e]}get _shouldInitProactively(){return Nf()||Sf()||Ka()}}const Zv=Yv;var Sl="@firebase/auth",Rl="1.12.0";/**
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
 */class tA{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)==null?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged(r=>{t((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){j(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function eA(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function nA(n){jn(new pn("auth",(t,{options:e})=>{const r=t.getProvider("app").getImmediate(),s=t.getProvider("heartbeat"),i=t.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;j(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Of(n)},h=new DI(r,s,i,u);return FI(h,e),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,r)=>{t.getProvider("auth-internal").initialize()})),jn(new pn("auth-internal",t=>{const e=nr(t.getProvider("auth").getImmediate());return(r=>new tA(r))(e)},"PRIVATE").setInstantiationMode("EXPLICIT")),je(Sl,Rl,eA(n)),je(Sl,Rl,"esm2020")}/**
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
 */const rA=300,sA=uf("authIdTokenMaxAge")||rA;let Pl=null;const iA=n=>async t=>{const e=t&&await t.getIdTokenResult(),r=e&&(new Date().getTime()-Date.parse(e.issuedAtTime))/1e3;if(r&&r>sA)return;const s=e==null?void 0:e.token;Pl!==s&&(Pl=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function oA(n=gf()){const t=Ha(n,"auth");if(t.isInitialized())return t.getImmediate();const e=xI(n,{popupRedirectResolver:Zv,persistence:[Wf,Bf,Xa]}),r=uf("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=iA(i.toString());GI(e,o,()=>o(e.currentUser)),JI(e,c=>o(c))}}const s=af("auth");return s&&UI(e,`http://${s}`),e}function aA(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}NI({loadJS(n){return new Promise((t,e)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=t,r.onerror=s=>{const i=ne("internal-error");i.customData=s,e(i)},r.type="text/javascript",r.charset="UTF-8",aA().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});nA("Browser");var kl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var He,Yf;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(w,_){function T(){}T.prototype=_.prototype,w.F=_.prototype,w.prototype=new T,w.prototype.constructor=w,w.D=function(I,E,b){for(var y=Array(arguments.length-2),jt=2;jt<arguments.length;jt++)y[jt-2]=arguments[jt];return _.prototype[E].apply(I,y)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,_,T){T||(T=0);const I=Array(16);if(typeof _=="string")for(var E=0;E<16;++E)I[E]=_.charCodeAt(T++)|_.charCodeAt(T++)<<8|_.charCodeAt(T++)<<16|_.charCodeAt(T++)<<24;else for(E=0;E<16;++E)I[E]=_[T++]|_[T++]<<8|_[T++]<<16|_[T++]<<24;_=w.g[0],T=w.g[1],E=w.g[2];let b=w.g[3],y;y=_+(b^T&(E^b))+I[0]+3614090360&4294967295,_=T+(y<<7&4294967295|y>>>25),y=b+(E^_&(T^E))+I[1]+3905402710&4294967295,b=_+(y<<12&4294967295|y>>>20),y=E+(T^b&(_^T))+I[2]+606105819&4294967295,E=b+(y<<17&4294967295|y>>>15),y=T+(_^E&(b^_))+I[3]+3250441966&4294967295,T=E+(y<<22&4294967295|y>>>10),y=_+(b^T&(E^b))+I[4]+4118548399&4294967295,_=T+(y<<7&4294967295|y>>>25),y=b+(E^_&(T^E))+I[5]+1200080426&4294967295,b=_+(y<<12&4294967295|y>>>20),y=E+(T^b&(_^T))+I[6]+2821735955&4294967295,E=b+(y<<17&4294967295|y>>>15),y=T+(_^E&(b^_))+I[7]+4249261313&4294967295,T=E+(y<<22&4294967295|y>>>10),y=_+(b^T&(E^b))+I[8]+1770035416&4294967295,_=T+(y<<7&4294967295|y>>>25),y=b+(E^_&(T^E))+I[9]+2336552879&4294967295,b=_+(y<<12&4294967295|y>>>20),y=E+(T^b&(_^T))+I[10]+4294925233&4294967295,E=b+(y<<17&4294967295|y>>>15),y=T+(_^E&(b^_))+I[11]+2304563134&4294967295,T=E+(y<<22&4294967295|y>>>10),y=_+(b^T&(E^b))+I[12]+1804603682&4294967295,_=T+(y<<7&4294967295|y>>>25),y=b+(E^_&(T^E))+I[13]+4254626195&4294967295,b=_+(y<<12&4294967295|y>>>20),y=E+(T^b&(_^T))+I[14]+2792965006&4294967295,E=b+(y<<17&4294967295|y>>>15),y=T+(_^E&(b^_))+I[15]+1236535329&4294967295,T=E+(y<<22&4294967295|y>>>10),y=_+(E^b&(T^E))+I[1]+4129170786&4294967295,_=T+(y<<5&4294967295|y>>>27),y=b+(T^E&(_^T))+I[6]+3225465664&4294967295,b=_+(y<<9&4294967295|y>>>23),y=E+(_^T&(b^_))+I[11]+643717713&4294967295,E=b+(y<<14&4294967295|y>>>18),y=T+(b^_&(E^b))+I[0]+3921069994&4294967295,T=E+(y<<20&4294967295|y>>>12),y=_+(E^b&(T^E))+I[5]+3593408605&4294967295,_=T+(y<<5&4294967295|y>>>27),y=b+(T^E&(_^T))+I[10]+38016083&4294967295,b=_+(y<<9&4294967295|y>>>23),y=E+(_^T&(b^_))+I[15]+3634488961&4294967295,E=b+(y<<14&4294967295|y>>>18),y=T+(b^_&(E^b))+I[4]+3889429448&4294967295,T=E+(y<<20&4294967295|y>>>12),y=_+(E^b&(T^E))+I[9]+568446438&4294967295,_=T+(y<<5&4294967295|y>>>27),y=b+(T^E&(_^T))+I[14]+3275163606&4294967295,b=_+(y<<9&4294967295|y>>>23),y=E+(_^T&(b^_))+I[3]+4107603335&4294967295,E=b+(y<<14&4294967295|y>>>18),y=T+(b^_&(E^b))+I[8]+1163531501&4294967295,T=E+(y<<20&4294967295|y>>>12),y=_+(E^b&(T^E))+I[13]+2850285829&4294967295,_=T+(y<<5&4294967295|y>>>27),y=b+(T^E&(_^T))+I[2]+4243563512&4294967295,b=_+(y<<9&4294967295|y>>>23),y=E+(_^T&(b^_))+I[7]+1735328473&4294967295,E=b+(y<<14&4294967295|y>>>18),y=T+(b^_&(E^b))+I[12]+2368359562&4294967295,T=E+(y<<20&4294967295|y>>>12),y=_+(T^E^b)+I[5]+4294588738&4294967295,_=T+(y<<4&4294967295|y>>>28),y=b+(_^T^E)+I[8]+2272392833&4294967295,b=_+(y<<11&4294967295|y>>>21),y=E+(b^_^T)+I[11]+1839030562&4294967295,E=b+(y<<16&4294967295|y>>>16),y=T+(E^b^_)+I[14]+4259657740&4294967295,T=E+(y<<23&4294967295|y>>>9),y=_+(T^E^b)+I[1]+2763975236&4294967295,_=T+(y<<4&4294967295|y>>>28),y=b+(_^T^E)+I[4]+1272893353&4294967295,b=_+(y<<11&4294967295|y>>>21),y=E+(b^_^T)+I[7]+4139469664&4294967295,E=b+(y<<16&4294967295|y>>>16),y=T+(E^b^_)+I[10]+3200236656&4294967295,T=E+(y<<23&4294967295|y>>>9),y=_+(T^E^b)+I[13]+681279174&4294967295,_=T+(y<<4&4294967295|y>>>28),y=b+(_^T^E)+I[0]+3936430074&4294967295,b=_+(y<<11&4294967295|y>>>21),y=E+(b^_^T)+I[3]+3572445317&4294967295,E=b+(y<<16&4294967295|y>>>16),y=T+(E^b^_)+I[6]+76029189&4294967295,T=E+(y<<23&4294967295|y>>>9),y=_+(T^E^b)+I[9]+3654602809&4294967295,_=T+(y<<4&4294967295|y>>>28),y=b+(_^T^E)+I[12]+3873151461&4294967295,b=_+(y<<11&4294967295|y>>>21),y=E+(b^_^T)+I[15]+530742520&4294967295,E=b+(y<<16&4294967295|y>>>16),y=T+(E^b^_)+I[2]+3299628645&4294967295,T=E+(y<<23&4294967295|y>>>9),y=_+(E^(T|~b))+I[0]+4096336452&4294967295,_=T+(y<<6&4294967295|y>>>26),y=b+(T^(_|~E))+I[7]+1126891415&4294967295,b=_+(y<<10&4294967295|y>>>22),y=E+(_^(b|~T))+I[14]+2878612391&4294967295,E=b+(y<<15&4294967295|y>>>17),y=T+(b^(E|~_))+I[5]+4237533241&4294967295,T=E+(y<<21&4294967295|y>>>11),y=_+(E^(T|~b))+I[12]+1700485571&4294967295,_=T+(y<<6&4294967295|y>>>26),y=b+(T^(_|~E))+I[3]+2399980690&4294967295,b=_+(y<<10&4294967295|y>>>22),y=E+(_^(b|~T))+I[10]+4293915773&4294967295,E=b+(y<<15&4294967295|y>>>17),y=T+(b^(E|~_))+I[1]+2240044497&4294967295,T=E+(y<<21&4294967295|y>>>11),y=_+(E^(T|~b))+I[8]+1873313359&4294967295,_=T+(y<<6&4294967295|y>>>26),y=b+(T^(_|~E))+I[15]+4264355552&4294967295,b=_+(y<<10&4294967295|y>>>22),y=E+(_^(b|~T))+I[6]+2734768916&4294967295,E=b+(y<<15&4294967295|y>>>17),y=T+(b^(E|~_))+I[13]+1309151649&4294967295,T=E+(y<<21&4294967295|y>>>11),y=_+(E^(T|~b))+I[4]+4149444226&4294967295,_=T+(y<<6&4294967295|y>>>26),y=b+(T^(_|~E))+I[11]+3174756917&4294967295,b=_+(y<<10&4294967295|y>>>22),y=E+(_^(b|~T))+I[2]+718787259&4294967295,E=b+(y<<15&4294967295|y>>>17),y=T+(b^(E|~_))+I[9]+3951481745&4294967295,w.g[0]=w.g[0]+_&4294967295,w.g[1]=w.g[1]+(E+(y<<21&4294967295|y>>>11))&4294967295,w.g[2]=w.g[2]+E&4294967295,w.g[3]=w.g[3]+b&4294967295}r.prototype.v=function(w,_){_===void 0&&(_=w.length);const T=_-this.blockSize,I=this.C;let E=this.h,b=0;for(;b<_;){if(E==0)for(;b<=T;)s(this,w,b),b+=this.blockSize;if(typeof w=="string"){for(;b<_;)if(I[E++]=w.charCodeAt(b++),E==this.blockSize){s(this,I),E=0;break}}else for(;b<_;)if(I[E++]=w[b++],E==this.blockSize){s(this,I),E=0;break}}this.h=E,this.o+=_},r.prototype.A=function(){var w=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);w[0]=128;for(var _=1;_<w.length-8;++_)w[_]=0;_=this.o*8;for(var T=w.length-8;T<w.length;++T)w[T]=_&255,_/=256;for(this.v(w),w=Array(16),_=0,T=0;T<4;++T)for(let I=0;I<32;I+=8)w[_++]=this.g[T]>>>I&255;return w};function i(w,_){var T=c;return Object.prototype.hasOwnProperty.call(T,w)?T[w]:T[w]=_(w)}function o(w,_){this.h=_;const T=[];let I=!0;for(let E=w.length-1;E>=0;E--){const b=w[E]|0;I&&b==_||(T[E]=b,I=!1)}this.g=T}var c={};function u(w){return-128<=w&&w<128?i(w,function(_){return new o([_|0],_<0?-1:0)}):new o([w|0],w<0?-1:0)}function h(w){if(isNaN(w)||!isFinite(w))return p;if(w<0)return V(h(-w));const _=[];let T=1;for(let I=0;w>=T;I++)_[I]=w/T|0,T*=4294967296;return new o(_,0)}function f(w,_){if(w.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(w.charAt(0)=="-")return V(f(w.substring(1),_));if(w.indexOf("-")>=0)throw Error('number format error: interior "-" character');const T=h(Math.pow(_,8));let I=p;for(let b=0;b<w.length;b+=8){var E=Math.min(8,w.length-b);const y=parseInt(w.substring(b,b+E),_);E<8?(E=h(Math.pow(_,E)),I=I.j(E).add(h(y))):(I=I.j(T),I=I.add(h(y)))}return I}var p=u(0),m=u(1),v=u(16777216);n=o.prototype,n.m=function(){if(k(this))return-V(this).m();let w=0,_=1;for(let T=0;T<this.g.length;T++){const I=this.i(T);w+=(I>=0?I:4294967296+I)*_,_*=4294967296}return w},n.toString=function(w){if(w=w||10,w<2||36<w)throw Error("radix out of range: "+w);if(S(this))return"0";if(k(this))return"-"+V(this).toString(w);const _=h(Math.pow(w,6));var T=this;let I="";for(;;){const E=at(T,_).g;T=L(T,E.j(_));let b=((T.g.length>0?T.g[0]:T.h)>>>0).toString(w);if(T=E,S(T))return b+I;for(;b.length<6;)b="0"+b;I=b+I}},n.i=function(w){return w<0?0:w<this.g.length?this.g[w]:this.h};function S(w){if(w.h!=0)return!1;for(let _=0;_<w.g.length;_++)if(w.g[_]!=0)return!1;return!0}function k(w){return w.h==-1}n.l=function(w){return w=L(this,w),k(w)?-1:S(w)?0:1};function V(w){const _=w.g.length,T=[];for(let I=0;I<_;I++)T[I]=~w.g[I];return new o(T,~w.h).add(m)}n.abs=function(){return k(this)?V(this):this},n.add=function(w){const _=Math.max(this.g.length,w.g.length),T=[];let I=0;for(let E=0;E<=_;E++){let b=I+(this.i(E)&65535)+(w.i(E)&65535),y=(b>>>16)+(this.i(E)>>>16)+(w.i(E)>>>16);I=y>>>16,b&=65535,y&=65535,T[E]=y<<16|b}return new o(T,T[T.length-1]&-2147483648?-1:0)};function L(w,_){return w.add(V(_))}n.j=function(w){if(S(this)||S(w))return p;if(k(this))return k(w)?V(this).j(V(w)):V(V(this).j(w));if(k(w))return V(this.j(V(w)));if(this.l(v)<0&&w.l(v)<0)return h(this.m()*w.m());const _=this.g.length+w.g.length,T=[];for(var I=0;I<2*_;I++)T[I]=0;for(I=0;I<this.g.length;I++)for(let E=0;E<w.g.length;E++){const b=this.i(I)>>>16,y=this.i(I)&65535,jt=w.i(E)>>>16,en=w.i(E)&65535;T[2*I+2*E]+=y*en,x(T,2*I+2*E),T[2*I+2*E+1]+=b*en,x(T,2*I+2*E+1),T[2*I+2*E+1]+=y*jt,x(T,2*I+2*E+1),T[2*I+2*E+2]+=b*jt,x(T,2*I+2*E+2)}for(w=0;w<_;w++)T[w]=T[2*w+1]<<16|T[2*w];for(w=_;w<2*_;w++)T[w]=0;return new o(T,0)};function x(w,_){for(;(w[_]&65535)!=w[_];)w[_+1]+=w[_]>>>16,w[_]&=65535,_++}function H(w,_){this.g=w,this.h=_}function at(w,_){if(S(_))throw Error("division by zero");if(S(w))return new H(p,p);if(k(w))return _=at(V(w),_),new H(V(_.g),V(_.h));if(k(_))return _=at(w,V(_)),new H(V(_.g),_.h);if(w.g.length>30){if(k(w)||k(_))throw Error("slowDivide_ only works with positive integers.");for(var T=m,I=_;I.l(w)<=0;)T=qt(T),I=qt(I);var E=gt(T,1),b=gt(I,1);for(I=gt(I,2),T=gt(T,2);!S(I);){var y=b.add(I);y.l(w)<=0&&(E=E.add(T),b=y),I=gt(I,1),T=gt(T,1)}return _=L(w,E.j(_)),new H(E,_)}for(E=p;w.l(_)>=0;){for(T=Math.max(1,Math.floor(w.m()/_.m())),I=Math.ceil(Math.log(T)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),b=h(T),y=b.j(_);k(y)||y.l(w)>0;)T-=I,b=h(T),y=b.j(_);S(b)&&(b=m),E=E.add(b),w=L(w,y)}return new H(E,w)}n.B=function(w){return at(this,w).h},n.and=function(w){const _=Math.max(this.g.length,w.g.length),T=[];for(let I=0;I<_;I++)T[I]=this.i(I)&w.i(I);return new o(T,this.h&w.h)},n.or=function(w){const _=Math.max(this.g.length,w.g.length),T=[];for(let I=0;I<_;I++)T[I]=this.i(I)|w.i(I);return new o(T,this.h|w.h)},n.xor=function(w){const _=Math.max(this.g.length,w.g.length),T=[];for(let I=0;I<_;I++)T[I]=this.i(I)^w.i(I);return new o(T,this.h^w.h)};function qt(w){const _=w.g.length+1,T=[];for(let I=0;I<_;I++)T[I]=w.i(I)<<1|w.i(I-1)>>>31;return new o(T,w.h)}function gt(w,_){const T=_>>5;_%=32;const I=w.g.length-T,E=[];for(let b=0;b<I;b++)E[b]=_>0?w.i(b+T)>>>_|w.i(b+T+1)<<32-_:w.i(b+T);return new o(E,w.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Yf=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,He=o}).apply(typeof kl<"u"?kl:typeof self<"u"?self:typeof window<"u"?window:{});var Ms=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Zf,br,tp,qs,oa,ep,np,rp;(function(){var n,t=Object.defineProperty;function e(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ms=="object"&&Ms];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=e(this);function s(a,l){if(l)t:{var d=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var A=a[g];if(!(A in d))break t;d=d[A]}a=a[a.length-1],g=d[a],l=l(g),l!=g&&l!=null&&t(d,a,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(l){var d=[],g;for(g in l)Object.prototype.hasOwnProperty.call(l,g)&&d.push([g,l[g]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function u(a,l,d){return a.call.apply(a.bind,arguments)}function h(a,l,d){return h=u,h.apply(null,arguments)}function f(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var g=d.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function p(a,l){function d(){}d.prototype=l.prototype,a.Z=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(g,A,C){for(var D=Array(arguments.length-2),q=2;q<arguments.length;q++)D[q-2]=arguments[q];return l.prototype[A].apply(g,D)}}var m=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function v(a){const l=a.length;if(l>0){const d=Array(l);for(let g=0;g<l;g++)d[g]=a[g];return d}return[]}function S(a,l){for(let g=1;g<arguments.length;g++){const A=arguments[g];var d=typeof A;if(d=d!="object"?d:A?Array.isArray(A)?"array":d:"null",d=="array"||d=="object"&&typeof A.length=="number"){d=a.length||0;const C=A.length||0;a.length=d+C;for(let D=0;D<C;D++)a[d+D]=A[D]}else a.push(A)}}class k{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function V(a){o.setTimeout(()=>{throw a},0)}function L(){var a=w;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class x{constructor(){this.h=this.g=null}add(l,d){const g=H.get();g.set(l,d),this.h?this.h.next=g:this.g=g,this.h=g}}var H=new k(()=>new at,a=>a.reset());class at{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let qt,gt=!1,w=new x,_=()=>{const a=Promise.resolve(void 0);qt=()=>{a.then(T)}};function T(){for(var a;a=L();){try{a.h.call(a.g)}catch(d){V(d)}var l=H;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}gt=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var b=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,l),o.removeEventListener("test",d,l)}catch{}return a})();function y(a){return/^[\s\xa0]*$/.test(a)}function jt(a,l){E.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}p(jt,E),jt.prototype.init=function(a,l){const d=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&jt.Z.h.call(this)},jt.prototype.h=function(){jt.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var en="closure_listenable_"+(Math.random()*1e6|0),Mg=0;function Lg(a,l,d,g,A){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!g,this.ha=A,this.key=++Mg,this.da=this.fa=!1}function ys(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Ts(a,l,d){for(const g in a)l.call(d,a[g],g,a)}function xg(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function Fc(a){const l={};for(const d in a)l[d]=a[d];return l}const Uc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Bc(a,l){let d,g;for(let A=1;A<arguments.length;A++){g=arguments[A];for(d in g)a[d]=g[d];for(let C=0;C<Uc.length;C++)d=Uc[C],Object.prototype.hasOwnProperty.call(g,d)&&(a[d]=g[d])}}function Es(a){this.src=a,this.g={},this.h=0}Es.prototype.add=function(a,l,d,g,A){const C=a.toString();a=this.g[C],a||(a=this.g[C]=[],this.h++);const D=io(a,l,g,A);return D>-1?(l=a[D],d||(l.fa=!1)):(l=new Lg(l,this.src,C,!!g,A),l.fa=d,a.push(l)),l};function so(a,l){const d=l.type;if(d in a.g){var g=a.g[d],A=Array.prototype.indexOf.call(g,l,void 0),C;(C=A>=0)&&Array.prototype.splice.call(g,A,1),C&&(ys(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function io(a,l,d,g){for(let A=0;A<a.length;++A){const C=a[A];if(!C.da&&C.listener==l&&C.capture==!!d&&C.ha==g)return A}return-1}var oo="closure_lm_"+(Math.random()*1e6|0),ao={};function jc(a,l,d,g,A){if(Array.isArray(l)){for(let C=0;C<l.length;C++)jc(a,l[C],d,g,A);return null}return d=qc(d),a&&a[en]?a.J(l,d,c(g)?!!g.capture:!1,A):Fg(a,l,d,!1,g,A)}function Fg(a,l,d,g,A,C){if(!l)throw Error("Invalid event type");const D=c(A)?!!A.capture:!!A;let q=uo(a);if(q||(a[oo]=q=new Es(a)),d=q.add(l,d,g,D,C),d.proxy)return d;if(g=Ug(),d.proxy=g,g.src=a,g.listener=d,a.addEventListener)b||(A=D),A===void 0&&(A=!1),a.addEventListener(l.toString(),g,A);else if(a.attachEvent)a.attachEvent(Hc(l.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Ug(){function a(d){return l.call(a.src,a.listener,d)}const l=Bg;return a}function $c(a,l,d,g,A){if(Array.isArray(l))for(var C=0;C<l.length;C++)$c(a,l[C],d,g,A);else g=c(g)?!!g.capture:!!g,d=qc(d),a&&a[en]?(a=a.i,C=String(l).toString(),C in a.g&&(l=a.g[C],d=io(l,d,g,A),d>-1&&(ys(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete a.g[C],a.h--)))):a&&(a=uo(a))&&(l=a.g[l.toString()],a=-1,l&&(a=io(l,d,g,A)),(d=a>-1?l[a]:null)&&co(d))}function co(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[en])so(l.i,a);else{var d=a.type,g=a.proxy;l.removeEventListener?l.removeEventListener(d,g,a.capture):l.detachEvent?l.detachEvent(Hc(d),g):l.addListener&&l.removeListener&&l.removeListener(g),(d=uo(l))?(so(d,a),d.h==0&&(d.src=null,l[oo]=null)):ys(a)}}}function Hc(a){return a in ao?ao[a]:ao[a]="on"+a}function Bg(a,l){if(a.da)a=!0;else{l=new jt(l,this);const d=a.listener,g=a.ha||a.src;a.fa&&co(a),a=d.call(g,l)}return a}function uo(a){return a=a[oo],a instanceof Es?a:null}var lo="__closure_events_fn_"+(Math.random()*1e9>>>0);function qc(a){return typeof a=="function"?a:(a[lo]||(a[lo]=function(l){return a.handleEvent(l)}),a[lo])}function kt(){I.call(this),this.i=new Es(this),this.M=this,this.G=null}p(kt,I),kt.prototype[en]=!0,kt.prototype.removeEventListener=function(a,l,d,g){$c(this,a,l,d,g)};function xt(a,l){var d,g=a.G;if(g)for(d=[];g;g=g.G)d.push(g);if(a=a.M,g=l.type||l,typeof l=="string")l=new E(l,a);else if(l instanceof E)l.target=l.target||a;else{var A=l;l=new E(g,a),Bc(l,A)}A=!0;let C,D;if(d)for(D=d.length-1;D>=0;D--)C=l.g=d[D],A=ws(C,g,!0,l)&&A;if(C=l.g=a,A=ws(C,g,!0,l)&&A,A=ws(C,g,!1,l)&&A,d)for(D=0;D<d.length;D++)C=l.g=d[D],A=ws(C,g,!1,l)&&A}kt.prototype.N=function(){if(kt.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const d=a.g[l];for(let g=0;g<d.length;g++)ys(d[g]);delete a.g[l],a.h--}}this.G=null},kt.prototype.J=function(a,l,d,g){return this.i.add(String(a),l,!1,d,g)},kt.prototype.K=function(a,l,d,g){return this.i.add(String(a),l,!0,d,g)};function ws(a,l,d,g){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let A=!0;for(let C=0;C<l.length;++C){const D=l[C];if(D&&!D.da&&D.capture==d){const q=D.listener,mt=D.ha||D.src;D.fa&&so(a.i,D),A=q.call(mt,g)!==!1&&A}}return A&&!g.defaultPrevented}function jg(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function zc(a){a.g=jg(()=>{a.g=null,a.i&&(a.i=!1,zc(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class $g extends I{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:zc(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ur(a){I.call(this),this.h=a,this.g={}}p(ur,I);var Wc=[];function Jc(a){Ts(a.g,function(l,d){this.g.hasOwnProperty(d)&&co(l)},a),a.g={}}ur.prototype.N=function(){ur.Z.N.call(this),Jc(this)},ur.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ho=o.JSON.stringify,Hg=o.JSON.parse,qg=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Gc(){}function Kc(){}var lr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function fo(){E.call(this,"d")}p(fo,E);function po(){E.call(this,"c")}p(po,E);var nn={},Qc=null;function Is(){return Qc=Qc||new kt}nn.Ia="serverreachability";function Xc(a){E.call(this,nn.Ia,a)}p(Xc,E);function hr(a){const l=Is();xt(l,new Xc(l))}nn.STAT_EVENT="statevent";function Yc(a,l){E.call(this,nn.STAT_EVENT,a),this.stat=l}p(Yc,E);function Ft(a){const l=Is();xt(l,new Yc(l,a))}nn.Ja="timingevent";function Zc(a,l){E.call(this,nn.Ja,a),this.size=l}p(Zc,E);function dr(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function fr(){this.g=!0}fr.prototype.ua=function(){this.g=!1};function zg(a,l,d,g,A,C){a.info(function(){if(a.g)if(C){var D="",q=C.split("&");for(let tt=0;tt<q.length;tt++){var mt=q[tt].split("=");if(mt.length>1){const Et=mt[0];mt=mt[1];const ce=Et.split("_");D=ce.length>=2&&ce[1]=="type"?D+(Et+"="+mt+"&"):D+(Et+"=redacted&")}}}else D=null;else D=C;return"XMLHTTP REQ ("+g+") [attempt "+A+"]: "+l+`
`+d+`
`+D})}function Wg(a,l,d,g,A,C,D){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+A+"]: "+l+`
`+d+`
`+C+" "+D})}function An(a,l,d,g){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Gg(a,d)+(g?" "+g:"")})}function Jg(a,l){a.info(function(){return"TIMEOUT: "+l})}fr.prototype.info=function(){};function Gg(a,l){if(!a.g)return l;if(!l)return null;try{const C=JSON.parse(l);if(C){for(a=0;a<C.length;a++)if(Array.isArray(C[a])){var d=C[a];if(!(d.length<2)){var g=d[1];if(Array.isArray(g)&&!(g.length<1)){var A=g[0];if(A!="noop"&&A!="stop"&&A!="close")for(let D=1;D<g.length;D++)g[D]=""}}}}return ho(C)}catch{return l}}var vs={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},tu={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},eu;function go(){}p(go,Gc),go.prototype.g=function(){return new XMLHttpRequest},eu=new go;function pr(a){return encodeURIComponent(String(a))}function Kg(a){var l=1;a=a.split(":");const d=[];for(;l>0&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function Re(a,l,d,g){this.j=a,this.i=l,this.l=d,this.S=g||1,this.V=new ur(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new nu}function nu(){this.i=null,this.g="",this.h=!1}var ru={},mo={};function _o(a,l,d){a.M=1,a.A=bs(ae(l)),a.u=d,a.R=!0,su(a,null)}function su(a,l){a.F=Date.now(),As(a),a.B=ae(a.A);var d=a.B,g=a.S;Array.isArray(g)||(g=[String(g)]),_u(d.i,"t",g),a.C=0,d=a.j.L,a.h=new nu,a.g=Mu(a.j,d?l:null,!a.u),a.P>0&&(a.O=new $g(h(a.Y,a,a.g),a.P)),l=a.V,d=a.g,g=a.ba;var A="readystatechange";Array.isArray(A)||(A&&(Wc[0]=A.toString()),A=Wc);for(let C=0;C<A.length;C++){const D=jc(d,A[C],g||l.handleEvent,!1,l.h||l);if(!D)break;l.g[D.key]=D}l=a.J?Fc(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),hr(),zg(a.i,a.v,a.B,a.l,a.S,a.u)}Re.prototype.ba=function(a){a=a.target;const l=this.O;l&&Ve(a)==3?l.j():this.Y(a)},Re.prototype.Y=function(a){try{if(a==this.g)t:{const q=Ve(this.g),mt=this.g.ya(),tt=this.g.ca();if(!(q<3)&&(q!=3||this.g&&(this.h.h||this.g.la()||Au(this.g)))){this.K||q!=4||mt==7||(mt==8||tt<=0?hr(3):hr(2)),yo(this);var l=this.g.ca();this.X=l;var d=Qg(this);if(this.o=l==200,Wg(this.i,this.v,this.B,this.l,this.S,q,l),this.o){if(this.U&&!this.L){e:{if(this.g){var g,A=this.g;if((g=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(g)){var C=g;break e}}C=null}if(a=C)An(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,To(this,a);else{this.o=!1,this.m=3,Ft(12),rn(this),gr(this);break t}}if(this.R){a=!0;let Et;for(;!this.K&&this.C<d.length;)if(Et=Xg(this,d),Et==mo){q==4&&(this.m=4,Ft(14),a=!1),An(this.i,this.l,null,"[Incomplete Response]");break}else if(Et==ru){this.m=4,Ft(15),An(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else An(this.i,this.l,Et,null),To(this,Et);if(iu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),q!=4||d.length!=0||this.h.h||(this.m=1,Ft(16),a=!1),this.o=this.o&&a,!a)An(this.i,this.l,d,"[Invalid Chunked Response]"),rn(this),gr(this);else if(d.length>0&&!this.W){this.W=!0;var D=this.j;D.g==this&&D.aa&&!D.P&&(D.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),So(D),D.P=!0,Ft(11))}}else An(this.i,this.l,d,null),To(this,d);q==4&&rn(this),this.o&&!this.K&&(q==4?Vu(this.j,this):(this.o=!1,As(this)))}else hm(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,Ft(12)):(this.m=0,Ft(13)),rn(this),gr(this)}}}catch{}finally{}};function Qg(a){if(!iu(a))return a.g.la();const l=Au(a.g);if(l==="")return"";let d="";const g=l.length,A=Ve(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return rn(a),gr(a),"";a.h.i=new o.TextDecoder}for(let C=0;C<g;C++)a.h.h=!0,d+=a.h.i.decode(l[C],{stream:!(A&&C==g-1)});return l.length=0,a.h.g+=d,a.C=0,a.h.g}function iu(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Xg(a,l){var d=a.C,g=l.indexOf(`
`,d);return g==-1?mo:(d=Number(l.substring(d,g)),isNaN(d)?ru:(g+=1,g+d>l.length?mo:(l=l.slice(g,g+d),a.C=g+d,l)))}Re.prototype.cancel=function(){this.K=!0,rn(this)};function As(a){a.T=Date.now()+a.H,ou(a,a.H)}function ou(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=dr(h(a.aa,a),l)}function yo(a){a.D&&(o.clearTimeout(a.D),a.D=null)}Re.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(Jg(this.i,this.B),this.M!=2&&(hr(),Ft(17)),rn(this),this.m=2,gr(this)):ou(this,this.T-a)};function gr(a){a.j.I==0||a.K||Vu(a.j,a)}function rn(a){yo(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,Jc(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function To(a,l){try{var d=a.j;if(d.I!=0&&(d.g==a||Eo(d.h,a))){if(!a.L&&Eo(d.h,a)&&d.I==3){try{var g=d.Ba.g.parse(l)}catch{g=null}if(Array.isArray(g)&&g.length==3){var A=g;if(A[0]==0){t:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)ks(d),Rs(d);else break t;Co(d),Ft(18)}}else d.xa=A[1],0<d.xa-d.K&&A[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=dr(h(d.Va,d),6e3));uu(d.h)<=1&&d.ta&&(d.ta=void 0)}else on(d,11)}else if((a.L||d.g==a)&&ks(d),!y(l))for(A=d.Ba.g.parse(l),l=0;l<A.length;l++){let tt=A[l];const Et=tt[0];if(!(Et<=d.K))if(d.K=Et,tt=tt[1],d.I==2)if(tt[0]=="c"){d.M=tt[1],d.ba=tt[2];const ce=tt[3];ce!=null&&(d.ka=ce,d.j.info("VER="+d.ka));const an=tt[4];an!=null&&(d.za=an,d.j.info("SVER="+d.za));const De=tt[5];De!=null&&typeof De=="number"&&De>0&&(g=1.5*De,d.O=g,d.j.info("backChannelRequestTimeoutMs_="+g)),g=d;const Ne=a.g;if(Ne){const Ds=Ne.g?Ne.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ds){var C=g.h;C.g||Ds.indexOf("spdy")==-1&&Ds.indexOf("quic")==-1&&Ds.indexOf("h2")==-1||(C.j=C.l,C.g=new Set,C.h&&(wo(C,C.h),C.h=null))}if(g.G){const Ro=Ne.g?Ne.g.getResponseHeader("X-HTTP-Session-Id"):null;Ro&&(g.wa=Ro,et(g.J,g.G,Ro))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),g=d;var D=a;if(g.na=Ou(g,g.L?g.ba:null,g.W),D.L){lu(g.h,D);var q=D,mt=g.O;mt&&(q.H=mt),q.D&&(yo(q),As(q)),g.g=D}else Pu(g);d.i.length>0&&Ps(d)}else tt[0]!="stop"&&tt[0]!="close"||on(d,7);else d.I==3&&(tt[0]=="stop"||tt[0]=="close"?tt[0]=="stop"?on(d,7):bo(d):tt[0]!="noop"&&d.l&&d.l.qa(tt),d.A=0)}}hr(4)}catch{}}var Yg=class{constructor(a,l){this.g=a,this.map=l}};function au(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function cu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function uu(a){return a.h?1:a.g?a.g.size:0}function Eo(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function wo(a,l){a.g?a.g.add(l):a.h=l}function lu(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}au.prototype.cancel=function(){if(this.i=hu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function hu(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.G);return l}return v(a.i)}var du=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Zg(a,l){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const g=a[d].indexOf("=");let A,C=null;g>=0?(A=a[d].substring(0,g),C=a[d].substring(g+1)):A=a[d],l(A,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function Pe(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof Pe?(this.l=a.l,mr(this,a.j),this.o=a.o,this.g=a.g,_r(this,a.u),this.h=a.h,Io(this,yu(a.i)),this.m=a.m):a&&(l=String(a).match(du))?(this.l=!1,mr(this,l[1]||"",!0),this.o=yr(l[2]||""),this.g=yr(l[3]||"",!0),_r(this,l[4]),this.h=yr(l[5]||"",!0),Io(this,l[6]||"",!0),this.m=yr(l[7]||"")):(this.l=!1,this.i=new Er(null,this.l))}Pe.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(Tr(l,fu,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Tr(l,fu,!0),"@"),a.push(pr(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Tr(d,d.charAt(0)=="/"?nm:em,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Tr(d,sm)),a.join("")},Pe.prototype.resolve=function(a){const l=ae(this);let d=!!a.j;d?mr(l,a.j):d=!!a.o,d?l.o=a.o:d=!!a.g,d?l.g=a.g:d=a.u!=null;var g=a.h;if(d)_r(l,a.u);else if(d=!!a.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var A=l.h.lastIndexOf("/");A!=-1&&(g=l.h.slice(0,A+1)+g)}if(A=g,A==".."||A==".")g="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){g=A.lastIndexOf("/",0)==0,A=A.split("/");const C=[];for(let D=0;D<A.length;){const q=A[D++];q=="."?g&&D==A.length&&C.push(""):q==".."?((C.length>1||C.length==1&&C[0]!="")&&C.pop(),g&&D==A.length&&C.push("")):(C.push(q),g=!0)}g=C.join("/")}else g=A}return d?l.h=g:d=a.i.toString()!=="",d?Io(l,yu(a.i)):d=!!a.m,d&&(l.m=a.m),l};function ae(a){return new Pe(a)}function mr(a,l,d){a.j=d?yr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function _r(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function Io(a,l,d){l instanceof Er?(a.i=l,im(a.i,a.l)):(d||(l=Tr(l,rm)),a.i=new Er(l,a.l))}function et(a,l,d){a.i.set(l,d)}function bs(a){return et(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function yr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Tr(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,tm),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function tm(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var fu=/[#\/\?@]/g,em=/[#\?:]/g,nm=/[#\?]/g,rm=/[#\?@]/g,sm=/#/g;function Er(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function sn(a){a.g||(a.g=new Map,a.h=0,a.i&&Zg(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}n=Er.prototype,n.add=function(a,l){sn(this),this.i=null,a=bn(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function pu(a,l){sn(a),l=bn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function gu(a,l){return sn(a),l=bn(a,l),a.g.has(l)}n.forEach=function(a,l){sn(this),this.g.forEach(function(d,g){d.forEach(function(A){a.call(l,A,g,this)},this)},this)};function mu(a,l){sn(a);let d=[];if(typeof l=="string")gu(a,l)&&(d=d.concat(a.g.get(bn(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)d=d.concat(a[l]);return d}n.set=function(a,l){return sn(this),this.i=null,a=bn(this,a),gu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},n.get=function(a,l){return a?(a=mu(this,a),a.length>0?String(a[0]):l):l};function _u(a,l,d){pu(a,l),d.length>0&&(a.i=null,a.g.set(bn(a,l),v(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let g=0;g<l.length;g++){var d=l[g];const A=pr(d);d=mu(this,d);for(let C=0;C<d.length;C++){let D=A;d[C]!==""&&(D+="="+pr(d[C])),a.push(D)}}return this.i=a.join("&")};function yu(a){const l=new Er;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function bn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function im(a,l){l&&!a.j&&(sn(a),a.i=null,a.g.forEach(function(d,g){const A=g.toLowerCase();g!=A&&(pu(this,g),_u(this,A,d))},a)),a.j=l}function om(a,l){const d=new fr;if(o.Image){const g=new Image;g.onload=f(ke,d,"TestLoadImage: loaded",!0,l,g),g.onerror=f(ke,d,"TestLoadImage: error",!1,l,g),g.onabort=f(ke,d,"TestLoadImage: abort",!1,l,g),g.ontimeout=f(ke,d,"TestLoadImage: timeout",!1,l,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else l(!1)}function am(a,l){const d=new fr,g=new AbortController,A=setTimeout(()=>{g.abort(),ke(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:g.signal}).then(C=>{clearTimeout(A),C.ok?ke(d,"TestPingServer: ok",!0,l):ke(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(A),ke(d,"TestPingServer: error",!1,l)})}function ke(a,l,d,g,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),g(d)}catch{}}function cm(){this.g=new qg}function vo(a){this.i=a.Sb||null,this.h=a.ab||!1}p(vo,Gc),vo.prototype.g=function(){return new Cs(this.i,this.h)};function Cs(a,l){kt.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(Cs,kt),n=Cs.prototype,n.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,Ir(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,wr(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ir(this)),this.g&&(this.readyState=3,Ir(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Tu(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Tu(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?wr(this):Ir(this),this.readyState==3&&Tu(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,wr(this))},n.Na=function(a){this.g&&(this.response=a,wr(this))},n.ga=function(){this.g&&wr(this)};function wr(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Ir(a)}n.setRequestHeader=function(a,l){this.A.append(a,l)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function Ir(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Cs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Eu(a){let l="";return Ts(a,function(d,g){l+=g,l+=":",l+=d,l+=`\r
`}),l}function Ao(a,l,d){t:{for(g in d){var g=!1;break t}g=!0}g||(d=Eu(d),typeof a=="string"?d!=null&&pr(d):et(a,l,d))}function ct(a){kt.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(ct,kt);var um=/^https?$/i,lm=["POST","PUT"];n=ct.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,l,d,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():eu.g(),this.g.onreadystatechange=m(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(C){wu(this,C);return}if(a=d||"",d=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var A in g)d.set(A,g[A]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const C of g.keys())d.set(C,g.get(C));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(d.keys()).find(C=>C.toLowerCase()=="content-type"),A=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(lm,l,void 0)>=0)||g||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[C,D]of d)this.g.setRequestHeader(C,D);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(C){wu(this,C)}};function wu(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,Iu(a),Ss(a)}function Iu(a){a.A||(a.A=!0,xt(a,"complete"),xt(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,xt(this,"complete"),xt(this,"abort"),Ss(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ss(this,!0)),ct.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?vu(this):this.Xa())},n.Xa=function(){vu(this)};function vu(a){if(a.h&&typeof i<"u"){if(a.v&&Ve(a)==4)setTimeout(a.Ca.bind(a),0);else if(xt(a,"readystatechange"),Ve(a)==4){a.h=!1;try{const C=a.ca();t:switch(C){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break t;default:l=!1}var d;if(!(d=l)){var g;if(g=C===0){let D=String(a.D).match(du)[1]||null;!D&&o.self&&o.self.location&&(D=o.self.location.protocol.slice(0,-1)),g=!um.test(D?D.toLowerCase():"")}d=g}if(d)xt(a,"complete"),xt(a,"success");else{a.o=6;try{var A=Ve(a)>2?a.g.statusText:""}catch{A=""}a.l=A+" ["+a.ca()+"]",Iu(a)}}finally{Ss(a)}}}}function Ss(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,l||xt(a,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Ve(a){return a.g?a.g.readyState:0}n.ca=function(){try{return Ve(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),Hg(l)}};function Au(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function hm(a){const l={};a=(a.g&&Ve(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(y(a[g]))continue;var d=Kg(a[g]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const C=l[A]||[];l[A]=C,C.push(d)}xg(l,function(g){return g.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function vr(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function bu(a){this.za=0,this.i=[],this.j=new fr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=vr("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=vr("baseRetryDelayMs",5e3,a),this.Za=vr("retryDelaySeedMs",1e4,a),this.Ta=vr("forwardChannelMaxRetries",2,a),this.va=vr("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new au(a&&a.concurrentRequestLimit),this.Ba=new cm,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=bu.prototype,n.ka=8,n.I=1,n.connect=function(a,l,d,g){Ft(0),this.W=a,this.H=l||{},d&&g!==void 0&&(this.H.OSID=d,this.H.OAID=g),this.F=this.X,this.J=Ou(this,null,this.W),Ps(this)};function bo(a){if(Cu(a),a.I==3){var l=a.V++,d=ae(a.J);if(et(d,"SID",a.M),et(d,"RID",l),et(d,"TYPE","terminate"),Ar(a,d),l=new Re(a,a.j,l),l.M=2,l.A=bs(ae(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=l.A,d=!0),d||(l.g=Mu(l.j,null),l.g.ea(l.A)),l.F=Date.now(),As(l)}Nu(a)}function Rs(a){a.g&&(So(a),a.g.cancel(),a.g=null)}function Cu(a){Rs(a),a.v&&(o.clearTimeout(a.v),a.v=null),ks(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Ps(a){if(!cu(a.h)&&!a.m){a.m=!0;var l=a.Ea;qt||_(),gt||(qt(),gt=!0),w.add(l,a),a.D=0}}function dm(a,l){return uu(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=dr(h(a.Ea,a,l),Du(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const A=new Re(this,this.j,a);let C=this.o;if(this.U&&(C?(C=Fc(C),Bc(C,this.U)):C=this.U),this.u!==null||this.R||(A.J=C,C=null),this.S)t:{for(var l=0,d=0;d<this.i.length;d++){e:{var g=this.i[d];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break e}g=void 0}if(g===void 0)break;if(l+=g,l>4096){l=d;break t}if(l===4096||d===this.i.length-1){l=d+1;break t}}l=1e3}else l=1e3;l=Ru(this,A,l),d=ae(this.J),et(d,"RID",a),et(d,"CVER",22),this.G&&et(d,"X-HTTP-Session-Id",this.G),Ar(this,d),C&&(this.R?l="headers="+pr(Eu(C))+"&"+l:this.u&&Ao(d,this.u,C)),wo(this.h,A),this.Ra&&et(d,"TYPE","init"),this.S?(et(d,"$req",l),et(d,"SID","null"),A.U=!0,_o(A,d,null)):_o(A,d,l),this.I=2}}else this.I==3&&(a?Su(this,a):this.i.length==0||cu(this.h)||Su(this))};function Su(a,l){var d;l?d=l.l:d=a.V++;const g=ae(a.J);et(g,"SID",a.M),et(g,"RID",d),et(g,"AID",a.K),Ar(a,g),a.u&&a.o&&Ao(g,a.u,a.o),d=new Re(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),l&&(a.i=l.G.concat(a.i)),l=Ru(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),wo(a.h,d),_o(d,g,l)}function Ar(a,l){a.H&&Ts(a.H,function(d,g){et(l,g,d)}),a.l&&Ts({},function(d,g){et(l,g,d)})}function Ru(a,l,d){d=Math.min(a.i.length,d);const g=a.l?h(a.l.Ka,a.l,a):null;t:{var A=a.i;let q=-1;for(;;){const mt=["count="+d];q==-1?d>0?(q=A[0].g,mt.push("ofs="+q)):q=0:mt.push("ofs="+q);let tt=!0;for(let Et=0;Et<d;Et++){var C=A[Et].g;const ce=A[Et].map;if(C-=q,C<0)q=Math.max(0,A[Et].g-100),tt=!1;else try{C="req"+C+"_"||"";try{var D=ce instanceof Map?ce:Object.entries(ce);for(const[an,De]of D){let Ne=De;c(De)&&(Ne=ho(De)),mt.push(C+an+"="+encodeURIComponent(Ne))}}catch(an){throw mt.push(C+"type="+encodeURIComponent("_badmap")),an}}catch{g&&g(ce)}}if(tt){D=mt.join("&");break t}}D=void 0}return a=a.i.splice(0,d),l.G=a,D}function Pu(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;qt||_(),gt||(qt(),gt=!0),w.add(l,a),a.A=0}}function Co(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=dr(h(a.Da,a),Du(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,ku(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=dr(h(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ft(10),Rs(this),ku(this))};function So(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function ku(a){a.g=new Re(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=ae(a.na);et(l,"RID","rpc"),et(l,"SID",a.M),et(l,"AID",a.K),et(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&et(l,"TO",a.ia),et(l,"TYPE","xmlhttp"),Ar(a,l),a.u&&a.o&&Ao(l,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=bs(ae(l)),d.u=null,d.R=!0,su(d,a)}n.Va=function(){this.C!=null&&(this.C=null,Rs(this),Co(this),Ft(19))};function ks(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Vu(a,l){var d=null;if(a.g==l){ks(a),So(a),a.g=null;var g=2}else if(Eo(a.h,l))d=l.G,lu(a.h,l),g=1;else return;if(a.I!=0){if(l.o)if(g==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var A=a.D;g=Is(),xt(g,new Zc(g,d)),Ps(a)}else Pu(a);else if(A=l.m,A==3||A==0&&l.X>0||!(g==1&&dm(a,l)||g==2&&Co(a)))switch(d&&d.length>0&&(l=a.h,l.i=l.i.concat(d)),A){case 1:on(a,5);break;case 4:on(a,10);break;case 3:on(a,6);break;default:on(a,2)}}}function Du(a,l){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*l}function on(a,l){if(a.j.info("Error code "+l),l==2){var d=h(a.bb,a),g=a.Ua;const A=!g;g=new Pe(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||mr(g,"https"),bs(g),A?om(g.toString(),d):am(g.toString(),d)}else Ft(2);a.I=0,a.l&&a.l.pa(l),Nu(a),Cu(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Ft(2)):(this.j.info("Failed to ping google.com"),Ft(1))};function Nu(a){if(a.I=0,a.ja=[],a.l){const l=hu(a.h);(l.length!=0||a.i.length!=0)&&(S(a.ja,l),S(a.ja,a.i),a.h.i.length=0,v(a.i),a.i.length=0),a.l.oa()}}function Ou(a,l,d){var g=d instanceof Pe?ae(d):new Pe(d);if(g.g!="")l&&(g.g=l+"."+g.g),_r(g,g.u);else{var A=o.location;g=A.protocol,l=l?l+"."+A.hostname:A.hostname,A=+A.port;const C=new Pe(null);g&&mr(C,g),l&&(C.g=l),A&&_r(C,A),d&&(C.h=d),g=C}return d=a.G,l=a.wa,d&&l&&et(g,d,l),et(g,"VER",a.ka),Ar(a,g),g}function Mu(a,l,d){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new ct(new vo({ab:d})):new ct(a.ma),l.Fa(a.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Lu(){}n=Lu.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Vs(){}Vs.prototype.g=function(a,l){return new zt(a,l)};function zt(a,l){kt.call(this),this.g=new bu(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!y(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!y(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Cn(this)}p(zt,kt),zt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},zt.prototype.close=function(){bo(this.g)},zt.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=ho(a),a=d);l.i.push(new Yg(l.Ya++,a)),l.I==3&&Ps(l)},zt.prototype.N=function(){this.g.l=null,delete this.j,bo(this.g),delete this.g,zt.Z.N.call(this)};function xu(a){fo.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){t:{for(const d in l){a=d;break t}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}p(xu,fo);function Fu(){po.call(this),this.status=1}p(Fu,po);function Cn(a){this.g=a}p(Cn,Lu),Cn.prototype.ra=function(){xt(this.g,"a")},Cn.prototype.qa=function(a){xt(this.g,new xu(a))},Cn.prototype.pa=function(a){xt(this.g,new Fu)},Cn.prototype.oa=function(){xt(this.g,"b")},Vs.prototype.createWebChannel=Vs.prototype.g,zt.prototype.send=zt.prototype.o,zt.prototype.open=zt.prototype.m,zt.prototype.close=zt.prototype.close,rp=function(){return new Vs},np=function(){return Is()},ep=nn,oa={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},vs.NO_ERROR=0,vs.TIMEOUT=8,vs.HTTP_ERROR=6,qs=vs,tu.COMPLETE="complete",tp=tu,Kc.EventType=lr,lr.OPEN="a",lr.CLOSE="b",lr.ERROR="c",lr.MESSAGE="d",kt.prototype.listen=kt.prototype.J,br=Kc,ct.prototype.listenOnce=ct.prototype.K,ct.prototype.getLastError=ct.prototype.Ha,ct.prototype.getLastErrorCode=ct.prototype.ya,ct.prototype.getStatus=ct.prototype.ca,ct.prototype.getResponseJson=ct.prototype.La,ct.prototype.getResponseText=ct.prototype.la,ct.prototype.send=ct.prototype.ea,ct.prototype.setWithCredentials=ct.prototype.Fa,Zf=ct}).apply(typeof Ms<"u"?Ms:typeof self<"u"?self:typeof window<"u"?window:{});const Vl="@firebase/firestore",Dl="4.9.3";/**
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
 */class Dt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Dt.UNAUTHENTICATED=new Dt(null),Dt.GOOGLE_CREDENTIALS=new Dt("google-credentials-uid"),Dt.FIRST_PARTY=new Dt("first-party-uid"),Dt.MOCK_USER=new Dt("mock-user");/**
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
 */let rr="12.7.0";/**
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
 */const mn=new ja("@firebase/firestore");function Sn(){return mn.logLevel}function N(n,...t){if(mn.logLevel<=z.DEBUG){const e=t.map(ec);mn.debug(`Firestore (${rr}): ${n}`,...e)}}function be(n,...t){if(mn.logLevel<=z.ERROR){const e=t.map(ec);mn.error(`Firestore (${rr}): ${n}`,...e)}}function Hn(n,...t){if(mn.logLevel<=z.WARN){const e=t.map(ec);mn.warn(`Firestore (${rr}): ${n}`,...e)}}function ec(n){if(typeof n=="string")return n;try{/**
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
 */function F(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,sp(n,r,e)}function sp(n,t,e){let r=`FIRESTORE (${rr}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw be(r),new Error(r)}function Q(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||sp(t,s,r)}function $(n,t){return n}/**
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
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class O extends Se{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Ee{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
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
 */class ip{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class cA{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(Dt.UNAUTHENTICATED)))}shutdown(){}}class uA{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class lA{constructor(t){this.t=t,this.currentUser=Dt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Q(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,e(u)):Promise.resolve();let i=new Ee;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ee,t.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;t.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ee)}}),0),o()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((r=>this.i!==t?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Q(typeof r.accessToken=="string",31837,{l:r}),new ip(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Q(t===null||typeof t=="string",2055,{h:t}),new Dt(t)}}class hA{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=Dt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class dA{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new hA(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(Dt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Nl{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class fA{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Qt(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){Q(this.o===void 0,3512);const r=i=>{i.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,N("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable((()=>r(i)))};const s=i=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Nl(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(Q(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Nl(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function pA(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
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
 */class nc{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=pA(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<e&&(r+=t.charAt(s[i]%62))}return r}}function W(n,t){return n<t?-1:n>t?1:0}function aa(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),i=t.charAt(r);if(s!==i)return jo(s)===jo(i)?W(s,i):jo(s)?1:-1}return W(n.length,t.length)}const gA=55296,mA=57343;function jo(n){const t=n.charCodeAt(0);return t>=gA&&t<=mA}function qn(n,t,e){return n.length===t.length&&n.every(((r,s)=>e(r,t[s])))}/**
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
 */const Ol="__name__";class ue{constructor(t,e,r){e===void 0?e=0:e>t.length&&F(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&F(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return ue.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof ue?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const i=ue.compareSegments(t.get(s),e.get(s));if(i!==0)return i}return W(t.length,e.length)}static compareSegments(t,e){const r=ue.isNumericId(t),s=ue.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?ue.extractNumericId(t).compare(ue.extractNumericId(e)):aa(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return He.fromString(t.substring(4,t.length-2))}}class nt extends ue{construct(t,e,r){return new nt(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new O(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((s=>s.length>0)))}return new nt(e)}static emptyPath(){return new nt([])}}const _A=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class St extends ue{construct(t,e,r){return new St(t,e,r)}static isValidIdentifier(t){return _A.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),St.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ol}static keyField(){return new St([Ol])}static fromServerFormat(t){const e=[];let r="",s=0;const i=()=>{if(r.length===0)throw new O(P.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let o=!1;for(;s<t.length;){const c=t[s];if(c==="\\"){if(s+1===t.length)throw new O(P.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const u=t[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new O(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new O(P.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new St(e)}static emptyPath(){return new St([])}}/**
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
 */class U{constructor(t){this.path=t}static fromPath(t){return new U(nt.fromString(t))}static fromName(t){return new U(nt.fromString(t).popFirst(5))}static empty(){return new U(nt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&nt.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return nt.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new U(new nt(t.slice()))}}/**
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
 */function yA(n,t,e){if(!e)throw new O(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function TA(n,t,e,r){if(t===!0&&r===!0)throw new O(P.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Ml(n){if(!U.isDocumentKey(n))throw new O(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function op(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function rc(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":F(12329,{type:typeof n})}function we(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new O(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=rc(n);throw new O(P.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
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
 */function ft(n,t){const e={typeString:n};return t&&(e.value=t),e}function ls(n,t){if(!op(n))throw new O(P.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,i="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){e=`Expected '${r}' field to equal '${i.value}'`;break}}if(e)throw new O(P.INVALID_ARGUMENT,e);return!0}/**
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
 */const Ll=-62135596800,xl=1e6;class rt{static now(){return rt.fromMillis(Date.now())}static fromDate(t){return rt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*xl);return new rt(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new O(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new O(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Ll)throw new O(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new O(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/xl}_compareTo(t){return this.seconds===t.seconds?W(this.nanoseconds,t.nanoseconds):W(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:rt._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(ls(t,rt._jsonSchema))return new rt(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Ll;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}rt._jsonSchemaVersion="firestore/timestamp/1.0",rt._jsonSchema={type:ft("string",rt._jsonSchemaVersion),seconds:ft("number"),nanoseconds:ft("number")};/**
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
 */class B{static fromTimestamp(t){return new B(t)}static min(){return new B(new rt(0,0))}static max(){return new B(new rt(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Hr=-1;function EA(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=B.fromTimestamp(r===1e9?new rt(e+1,0):new rt(e,r));return new Je(s,U.empty(),t)}function wA(n){return new Je(n.readTime,n.key,Hr)}class Je{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Je(B.min(),U.empty(),Hr)}static max(){return new Je(B.max(),U.empty(),Hr)}}function IA(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=U.comparator(n.documentKey,t.documentKey),e!==0?e:W(n.largestBatchId,t.largestBatchId))}/**
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
 */const vA="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class AA{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
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
 */async function sr(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==vA)throw n;N("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class R{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&F(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new R(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(r,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof R?e:R.resolve(e)}catch(e){return R.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):R.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):R.reject(e)}static resolve(t){return new R(((e,r)=>{e(t)}))}static reject(t){return new R(((e,r)=>{r(t)}))}static waitFor(t){return new R(((e,r)=>{let s=0,i=0,o=!1;t.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&e()}),(u=>r(u)))})),o=!0,i===s&&e()}))}static or(t){let e=R.resolve(!1);for(const r of t)e=e.next((s=>s?R.resolve(s):r()));return e}static forEach(t,e){const r=[];return t.forEach(((s,i)=>{r.push(e.call(this,s,i))})),this.waitFor(r)}static mapArray(t,e){return new R(((r,s)=>{const i=t.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;e(t[h]).next((f=>{o[h]=f,++c,c===i&&r(o)}),(f=>s(f)))}}))}static doWhile(t,e){return new R(((r,s)=>{const i=()=>{t()===!0?e().next((()=>{i()}),s):r()};i()}))}}function bA(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function ir(n){return n.name==="IndexedDbTransactionError"}/**
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
 */const sc=-1;function hs(n){return n==null}function hi(n){return n===0&&1/n==-1/0}function CA(n){return typeof n=="number"&&Number.isInteger(n)&&!hi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const ap="";function SA(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Fl(t)),t=RA(n.get(e),t);return Fl(t)}function RA(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":e+="";break;case ap:e+="";break;default:e+=i}}return e}function Fl(n){return n+ap+""}/**
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
 */function Ul(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function Ze(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function cp(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
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
 */class ot{constructor(t,e){this.comparator=t,this.root=e||Ct.EMPTY}insert(t,e){return new ot(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Ct.BLACK,null,null))}remove(t){return new ot(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Ct.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Ls(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Ls(this.root,t,this.comparator,!1)}getReverseIterator(){return new Ls(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Ls(this.root,t,this.comparator,!0)}}class Ls{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?r(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Ct{constructor(t,e,r,s,i){this.key=t,this.value=e,this.color=r??Ct.RED,this.left=s??Ct.EMPTY,this.right=i??Ct.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,i){return new Ct(t??this.key,e??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const i=r(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,r),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ct.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return Ct.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Ct.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Ct.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw F(43730,{key:this.key,value:this.value});if(this.right.isRed())throw F(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw F(27949);return t+(this.isRed()?0:1)}}Ct.EMPTY=null,Ct.RED=!0,Ct.BLACK=!1;Ct.EMPTY=new class{constructor(){this.size=0}get key(){throw F(57766)}get value(){throw F(16141)}get color(){throw F(16727)}get left(){throw F(29726)}get right(){throw F(36894)}copy(t,e,r,s,i){return this}insert(t,e,r){return new Ct(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class yt{constructor(t){this.comparator=t,this.data=new ot(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Bl(this.data.getIterator())}getIteratorFrom(t){return new Bl(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof yt)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new yt(this.comparator);return e.data=t,e}}class Bl{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Gt{constructor(t){this.fields=t,t.sort(St.comparator)}static empty(){return new Gt([])}unionWith(t){let e=new yt(St.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Gt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return qn(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}/**
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
 */class up extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Pt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new up("Invalid base64 string: "+i):i}})(t);return new Pt(e)}static fromUint8Array(t){const e=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(t);return new Pt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return W(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Pt.EMPTY_BYTE_STRING=new Pt("");const PA=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ge(n){if(Q(!!n,39018),typeof n=="string"){let t=0;const e=PA.exec(n);if(Q(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:ut(n.seconds),nanos:ut(n.nanos)}}function ut(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ke(n){return typeof n=="string"?Pt.fromBase64String(n):Pt.fromUint8Array(n)}/**
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
 */const lp="server_timestamp",hp="__type__",dp="__previous_value__",fp="__local_write_time__";function ic(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[hp])==null?void 0:r.stringValue)===lp}function Bi(n){const t=n.mapValue.fields[dp];return ic(t)?Bi(t):t}function qr(n){const t=Ge(n.mapValue.fields[fp].timestampValue);return new rt(t.seconds,t.nanos)}/**
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
 */class kA{constructor(t,e,r,s,i,o,c,u,h,f){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f}}const di="(default)";class zr{constructor(t,e){this.projectId=t,this.database=e||di}static empty(){return new zr("","")}get isDefaultDatabase(){return this.database===di}isEqual(t){return t instanceof zr&&t.projectId===this.projectId&&t.database===this.database}}/**
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
 */const pp="__type__",VA="__max__",xs={mapValue:{}},gp="__vector__",fi="value";function Qe(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ic(n)?4:NA(n)?9007199254740991:DA(n)?10:11:F(28295,{value:n})}function ge(n,t){if(n===t)return!0;const e=Qe(n);if(e!==Qe(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return qr(n).isEqual(qr(t));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Ge(s.timestampValue),c=Ge(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(s,i){return Ke(s.bytesValue).isEqual(Ke(i.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(s,i){return ut(s.geoPointValue.latitude)===ut(i.geoPointValue.latitude)&&ut(s.geoPointValue.longitude)===ut(i.geoPointValue.longitude)})(n,t);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return ut(s.integerValue)===ut(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=ut(s.doubleValue),c=ut(i.doubleValue);return o===c?hi(o)===hi(c):isNaN(o)&&isNaN(c)}return!1})(n,t);case 9:return qn(n.arrayValue.values||[],t.arrayValue.values||[],ge);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Ul(o)!==Ul(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!ge(o[u],c[u])))return!1;return!0})(n,t);default:return F(52216,{left:n})}}function Wr(n,t){return(n.values||[]).find((e=>ge(e,t)))!==void 0}function zn(n,t){if(n===t)return 0;const e=Qe(n),r=Qe(t);if(e!==r)return W(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return W(n.booleanValue,t.booleanValue);case 2:return(function(i,o){const c=ut(i.integerValue||i.doubleValue),u=ut(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,t);case 3:return jl(n.timestampValue,t.timestampValue);case 4:return jl(qr(n),qr(t));case 5:return aa(n.stringValue,t.stringValue);case 6:return(function(i,o){const c=Ke(i),u=Ke(o);return c.compareTo(u)})(n.bytesValue,t.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=W(c[h],u[h]);if(f!==0)return f}return W(c.length,u.length)})(n.referenceValue,t.referenceValue);case 8:return(function(i,o){const c=W(ut(i.latitude),ut(o.latitude));return c!==0?c:W(ut(i.longitude),ut(o.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return $l(n.arrayValue,t.arrayValue);case 10:return(function(i,o){var m,v,S,k;const c=i.fields||{},u=o.fields||{},h=(m=c[fi])==null?void 0:m.arrayValue,f=(v=u[fi])==null?void 0:v.arrayValue,p=W(((S=h==null?void 0:h.values)==null?void 0:S.length)||0,((k=f==null?void 0:f.values)==null?void 0:k.length)||0);return p!==0?p:$l(h,f)})(n.mapValue,t.mapValue);case 11:return(function(i,o){if(i===xs.mapValue&&o===xs.mapValue)return 0;if(i===xs.mapValue)return 1;if(o===xs.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const m=aa(u[p],f[p]);if(m!==0)return m;const v=zn(c[u[p]],h[f[p]]);if(v!==0)return v}return W(u.length,f.length)})(n.mapValue,t.mapValue);default:throw F(23264,{he:e})}}function jl(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return W(n,t);const e=Ge(n),r=Ge(t),s=W(e.seconds,r.seconds);return s!==0?s:W(e.nanos,r.nanos)}function $l(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const i=zn(e[s],r[s]);if(i)return i}return W(e.length,r.length)}function Wn(n){return ca(n)}function ca(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const r=Ge(e);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return Ke(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return U.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let r="[",s=!0;for(const i of e.values||[])s?s=!1:r+=",",r+=ca(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(e){const r=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${ca(e.fields[o])}`;return s+"}"})(n.mapValue):F(61005,{value:n})}function zs(n){switch(Qe(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Bi(n);return t?16+zs(t):16;case 5:return 2*n.stringValue.length;case 6:return Ke(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+zs(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return Ze(r.fields,((i,o)=>{s+=i.length+zs(o)})),s})(n.mapValue);default:throw F(13486,{value:n})}}function ua(n){return!!n&&"integerValue"in n}function oc(n){return!!n&&"arrayValue"in n}function Hl(n){return!!n&&"nullValue"in n}function ql(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Ws(n){return!!n&&"mapValue"in n}function DA(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[pp])==null?void 0:r.stringValue)===gp}function Dr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return Ze(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=Dr(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Dr(n.arrayValue.values[e]);return t}return{...n}}function NA(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===VA}/**
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
 */class Ut{constructor(t){this.value=t}static empty(){return new Ut({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!Ws(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Dr(e)}setAll(t){let e=St.emptyPath(),r={},s=[];t.forEach(((o,c)=>{if(!e.isImmediateParentOf(c)){const u=this.getFieldsMap(e);this.applyChanges(u,r,s),r={},s=[],e=c.popLast()}o?r[c.lastSegment()]=Dr(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(e);this.applyChanges(i,r,s)}delete(t){const e=this.field(t.popLast());Ws(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return ge(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];Ws(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){Ze(e,((s,i)=>t[s]=i));for(const s of r)delete t[s]}clone(){return new Ut(Dr(this.value))}}function mp(n){const t=[];return Ze(n.fields,((e,r)=>{const s=new St([e]);if(Ws(r)){const i=mp(r.mapValue).fields;if(i.length===0)t.push(s);else for(const o of i)t.push(s.child(o))}else t.push(s)})),new Gt(t)}/**
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
 */class vt{constructor(t,e,r,s,i,o,c){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(t){return new vt(t,0,B.min(),B.min(),B.min(),Ut.empty(),0)}static newFoundDocument(t,e,r,s){return new vt(t,1,e,B.min(),r,s,0)}static newNoDocument(t,e){return new vt(t,2,e,B.min(),B.min(),Ut.empty(),0)}static newUnknownDocument(t,e){return new vt(t,3,e,B.min(),B.min(),Ut.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Ut.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Ut.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof vt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new vt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class pi{constructor(t,e){this.position=t,this.inclusive=e}}function zl(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const i=t[s],o=n.position[s];if(i.field.isKeyField()?r=U.comparator(U.fromName(o.referenceValue),e.key):r=zn(o,e.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Wl(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!ge(n.position[e],t.position[e]))return!1;return!0}/**
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
 */class gi{constructor(t,e="asc"){this.field=t,this.dir=e}}function OA(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
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
 */class _p{}class _t extends _p{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new LA(t,e,r):e==="array-contains"?new UA(t,r):e==="in"?new BA(t,r):e==="not-in"?new jA(t,r):e==="array-contains-any"?new $A(t,r):new _t(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new xA(t,r):new FA(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(zn(e,this.value)):e!==null&&Qe(this.value)===Qe(e)&&this.matchesComparison(zn(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return F(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class me extends _p{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new me(t,e)}matches(t){return yp(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function yp(n){return n.op==="and"}function Tp(n){return MA(n)&&yp(n)}function MA(n){for(const t of n.filters)if(t instanceof me)return!1;return!0}function la(n){if(n instanceof _t)return n.field.canonicalString()+n.op.toString()+Wn(n.value);if(Tp(n))return n.filters.map((t=>la(t))).join(",");{const t=n.filters.map((e=>la(e))).join(",");return`${n.op}(${t})`}}function Ep(n,t){return n instanceof _t?(function(r,s){return s instanceof _t&&r.op===s.op&&r.field.isEqual(s.field)&&ge(r.value,s.value)})(n,t):n instanceof me?(function(r,s){return s instanceof me&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,c)=>i&&Ep(o,s.filters[c])),!0):!1})(n,t):void F(19439)}function wp(n){return n instanceof _t?(function(e){return`${e.field.canonicalString()} ${e.op} ${Wn(e.value)}`})(n):n instanceof me?(function(e){return e.op.toString()+" {"+e.getFilters().map(wp).join(" ,")+"}"})(n):"Filter"}class LA extends _t{constructor(t,e,r){super(t,e,r),this.key=U.fromName(r.referenceValue)}matches(t){const e=U.comparator(t.key,this.key);return this.matchesComparison(e)}}class xA extends _t{constructor(t,e){super(t,"in",e),this.keys=Ip("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class FA extends _t{constructor(t,e){super(t,"not-in",e),this.keys=Ip("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Ip(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map((r=>U.fromName(r.referenceValue)))}class UA extends _t{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return oc(e)&&Wr(e.arrayValue,this.value)}}class BA extends _t{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Wr(this.value.arrayValue,e)}}class jA extends _t{constructor(t,e){super(t,"not-in",e)}matches(t){if(Wr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Wr(this.value.arrayValue,e)}}class $A extends _t{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!oc(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>Wr(this.value.arrayValue,r)))}}/**
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
 */class HA{constructor(t,e=null,r=[],s=[],i=null,o=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function Jl(n,t=null,e=[],r=[],s=null,i=null,o=null){return new HA(n,t,e,r,s,i,o)}function ac(n){const t=$(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((r=>la(r))).join(","),e+="|ob:",e+=t.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),hs(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((r=>Wn(r))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((r=>Wn(r))).join(",")),t.Te=e}return t.Te}function cc(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!OA(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!Ep(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Wl(n.startAt,t.startAt)&&Wl(n.endAt,t.endAt)}function ha(n){return U.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class ji{constructor(t,e=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function qA(n,t,e,r,s,i,o,c){return new ji(n,t,e,r,s,i,o,c)}function $i(n){return new ji(n)}function Gl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function zA(n){return n.collectionGroup!==null}function Nr(n){const t=$(n);if(t.Ie===null){t.Ie=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ie.push(i),e.add(i.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new yt(St.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(t).forEach((i=>{e.has(i.canonicalString())||i.isKeyField()||t.Ie.push(new gi(i,r))})),e.has(St.keyField().canonicalString())||t.Ie.push(new gi(St.keyField(),r))}return t.Ie}function he(n){const t=$(n);return t.Ee||(t.Ee=WA(t,Nr(n))),t.Ee}function WA(n,t){if(n.limitType==="F")return Jl(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new gi(s.field,i)}));const e=n.endAt?new pi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new pi(n.startAt.position,n.startAt.inclusive):null;return Jl(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function da(n,t,e){return new ji(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Hi(n,t){return cc(he(n),he(t))&&n.limitType===t.limitType}function vp(n){return`${ac(he(n))}|lt:${n.limitType}`}function Rn(n){return`Query(target=${(function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map((s=>wp(s))).join(", ")}]`),hs(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map((s=>Wn(s))).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map((s=>Wn(s))).join(",")),`Target(${r})`})(he(n))}; limitType=${n.limitType})`}function qi(n,t){return t.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):U.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,t)&&(function(r,s){for(const i of Nr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,t)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,t)&&(function(r,s){return!(r.startAt&&!(function(o,c,u){const h=zl(o,c,u);return o.inclusive?h<=0:h<0})(r.startAt,Nr(r),s)||r.endAt&&!(function(o,c,u){const h=zl(o,c,u);return o.inclusive?h>=0:h>0})(r.endAt,Nr(r),s))})(n,t)}function JA(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Ap(n){return(t,e)=>{let r=!1;for(const s of Nr(n)){const i=GA(s,t,e);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function GA(n,t,e){const r=n.field.isKeyField()?U.comparator(t.key,e.key):(function(i,o,c){const u=o.data.field(i),h=c.data.field(i);return u!==null&&h!==null?zn(u,h):F(42886)})(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return F(19790,{direction:n.dir})}}/**
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
 */class In{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){Ze(this.inner,((e,r)=>{for(const[s,i]of r)t(s,i)}))}isEmpty(){return cp(this.inner)}size(){return this.innerSize}}/**
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
 */const KA=new ot(U.comparator);function Ce(){return KA}const bp=new ot(U.comparator);function Cr(...n){let t=bp;for(const e of n)t=t.insert(e.key,e);return t}function Cp(n){let t=bp;return n.forEach(((e,r)=>t=t.insert(e,r.overlayedDocument))),t}function ln(){return Or()}function Sp(){return Or()}function Or(){return new In((n=>n.toString()),((n,t)=>n.isEqual(t)))}const QA=new ot(U.comparator),XA=new yt(U.comparator);function J(...n){let t=XA;for(const e of n)t=t.add(e);return t}const YA=new yt(W);function ZA(){return YA}/**
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
 */function uc(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:hi(t)?"-0":t}}function Rp(n){return{integerValue:""+n}}function tb(n,t){return CA(t)?Rp(t):uc(n,t)}/**
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
 */class zi{constructor(){this._=void 0}}function eb(n,t,e){return n instanceof Jr?(function(s,i){const o={fields:{[hp]:{stringValue:lp},[fp]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ic(i)&&(i=Bi(i)),i&&(o.fields[dp]=i),{mapValue:o}})(e,t):n instanceof Gr?kp(n,t):n instanceof Kr?Vp(n,t):(function(s,i){const o=Pp(s,i),c=Kl(o)+Kl(s.Ae);return ua(o)&&ua(s.Ae)?Rp(c):uc(s.serializer,c)})(n,t)}function nb(n,t,e){return n instanceof Gr?kp(n,t):n instanceof Kr?Vp(n,t):e}function Pp(n,t){return n instanceof mi?(function(r){return ua(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(t)?t:{integerValue:0}:null}class Jr extends zi{}class Gr extends zi{constructor(t){super(),this.elements=t}}function kp(n,t){const e=Dp(t);for(const r of n.elements)e.some((s=>ge(s,r)))||e.push(r);return{arrayValue:{values:e}}}class Kr extends zi{constructor(t){super(),this.elements=t}}function Vp(n,t){let e=Dp(t);for(const r of n.elements)e=e.filter((s=>!ge(s,r)));return{arrayValue:{values:e}}}class mi extends zi{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function Kl(n){return ut(n.integerValue||n.doubleValue)}function Dp(n){return oc(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class rb{constructor(t,e){this.field=t,this.transform=e}}function sb(n,t){return n.field.isEqual(t.field)&&(function(r,s){return r instanceof Gr&&s instanceof Gr||r instanceof Kr&&s instanceof Kr?qn(r.elements,s.elements,ge):r instanceof mi&&s instanceof mi?ge(r.Ae,s.Ae):r instanceof Jr&&s instanceof Jr})(n.transform,t.transform)}class ib{constructor(t,e){this.version=t,this.transformResults=e}}class Ht{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Ht}static exists(t){return new Ht(void 0,t)}static updateTime(t){return new Ht(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Js(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Wi{}function Np(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new lc(n.key,Ht.none()):new ds(n.key,n.data,Ht.none());{const e=n.data,r=Ut.empty();let s=new yt(St.comparator);for(let i of t.fields)if(!s.has(i)){let o=e.field(i);o===null&&i.length>1&&(i=i.popLast(),o=e.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new tn(n.key,r,new Gt(s.toArray()),Ht.none())}}function ob(n,t,e){n instanceof ds?(function(s,i,o){const c=s.value.clone(),u=Xl(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,t,e):n instanceof tn?(function(s,i,o){if(!Js(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Xl(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(Op(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(n,t,e):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,t,e)}function Mr(n,t,e,r){return n instanceof ds?(function(i,o,c,u){if(!Js(i.precondition,o))return c;const h=i.value.clone(),f=Yl(i.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(n,t,e,r):n instanceof tn?(function(i,o,c,u){if(!Js(i.precondition,o))return c;const h=Yl(i.fieldTransforms,u,o),f=o.data;return f.setAll(Op(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,t,e,r):(function(i,o,c){return Js(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(n,t,e)}function ab(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),i=Pp(r.transform,s||null);i!=null&&(e===null&&(e=Ut.empty()),e.set(r.field,i))}return e||null}function Ql(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&qn(r,s,((i,o)=>sb(i,o)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class ds extends Wi{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class tn extends Wi{constructor(t,e,r,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Op(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}})),t}function Xl(n,t,e){const r=new Map;Q(n.length===e.length,32656,{Re:e.length,Ve:n.length});for(let s=0;s<e.length;s++){const i=n[s],o=i.transform,c=t.data.field(i.field);r.set(i.field,nb(o,c,e[s]))}return r}function Yl(n,t,e){const r=new Map;for(const s of n){const i=s.transform,o=e.data.field(s.field);r.set(s.field,eb(i,o,t))}return r}class lc extends Wi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Mp extends Wi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class cb{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&ob(i,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=Mr(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=Mr(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=Sp();return this.mutations.forEach((s=>{const i=t.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=e.has(s.key)?null:c;const u=Np(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(B.min())})),r}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),J())}isEqual(t){return this.batchId===t.batchId&&qn(this.mutations,t.mutations,((e,r)=>Ql(e,r)))&&qn(this.baseMutations,t.baseMutations,((e,r)=>Ql(e,r)))}}class hc{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){Q(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let s=(function(){return QA})();const i=t.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new hc(t,e,r,s)}}/**
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
 */class ub{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
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
 */class lb{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var ht,K;function Lp(n){switch(n){case P.OK:return F(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return F(15467,{code:n})}}function xp(n){if(n===void 0)return be("GRPC error has no .code"),P.UNKNOWN;switch(n){case ht.OK:return P.OK;case ht.CANCELLED:return P.CANCELLED;case ht.UNKNOWN:return P.UNKNOWN;case ht.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ht.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ht.INTERNAL:return P.INTERNAL;case ht.UNAVAILABLE:return P.UNAVAILABLE;case ht.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ht.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ht.NOT_FOUND:return P.NOT_FOUND;case ht.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ht.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ht.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ht.ABORTED:return P.ABORTED;case ht.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ht.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ht.DATA_LOSS:return P.DATA_LOSS;default:return F(39323,{code:n})}}(K=ht||(ht={}))[K.OK=0]="OK",K[K.CANCELLED=1]="CANCELLED",K[K.UNKNOWN=2]="UNKNOWN",K[K.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",K[K.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",K[K.NOT_FOUND=5]="NOT_FOUND",K[K.ALREADY_EXISTS=6]="ALREADY_EXISTS",K[K.PERMISSION_DENIED=7]="PERMISSION_DENIED",K[K.UNAUTHENTICATED=16]="UNAUTHENTICATED",K[K.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",K[K.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",K[K.ABORTED=10]="ABORTED",K[K.OUT_OF_RANGE=11]="OUT_OF_RANGE",K[K.UNIMPLEMENTED=12]="UNIMPLEMENTED",K[K.INTERNAL=13]="INTERNAL",K[K.UNAVAILABLE=14]="UNAVAILABLE",K[K.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function hb(){return new TextEncoder}/**
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
 */const db=new He([4294967295,4294967295],0);function Zl(n){const t=hb().encode(n),e=new Yf;return e.update(t),new Uint8Array(e.digest())}function th(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new He([e,r],0),new He([s,i],0)]}class dc{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new Sr(`Invalid padding: ${e}`);if(r<0)throw new Sr(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new Sr(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new Sr(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=He.fromNumber(this.ge)}ye(t,e,r){let s=t.add(e.multiply(He.fromNumber(r)));return s.compare(db)===1&&(s=new He([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Zl(t),[r,s]=th(e);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),o=new dc(i,s,e);return r.forEach((c=>o.insert(c))),o}insert(t){if(this.ge===0)return;const e=Zl(t),[r,s]=th(e);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class Sr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Ji{constructor(t,e,r,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,fs.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Ji(B.min(),s,new ot(W),Ce(),J())}}class fs{constructor(t,e,r,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new fs(r,e,J(),J(),J())}}/**
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
 */class Gs{constructor(t,e,r,s){this.be=t,this.removedTargetIds=e,this.key=r,this.De=s}}class Fp{constructor(t,e){this.targetId=t,this.Ce=e}}class Up{constructor(t,e,r=Pt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class eh{constructor(){this.ve=0,this.Fe=nh(),this.Me=Pt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=J(),e=J(),r=J();return this.Fe.forEach(((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:F(38017,{changeType:i})}})),new fs(this.Me,this.xe,t,e,r)}qe(){this.Oe=!1,this.Fe=nh()}Qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}$e(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}Ue(){this.ve+=1}Ke(){this.ve-=1,Q(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class fb{constructor(t){this.Ge=t,this.ze=new Map,this.je=Ce(),this.Je=Fs(),this.He=Fs(),this.Ye=new ot(W)}Ze(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Xe(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,(e=>{const r=this.nt(e);switch(t.state){case 0:this.rt(e)&&r.Le(t.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(t.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(r.We(),r.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),r.Le(t.resumeToken));break;default:F(56790,{state:t.state})}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach(((r,s)=>{this.rt(s)&&e(s)}))}st(t){const e=t.targetId,r=t.Ce.count,s=this.ot(e);if(s){const i=s.target;if(ha(i))if(r===0){const o=new U(i.path);this.et(e,o,vt.newNoDocument(o,B.min()))}else Q(r===1,20013,{expectedCount:r});else{const o=this._t(e);if(o!==r){const c=this.ut(t),u=c?this.ct(c,t,o):1;if(u!==0){this.it(e);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(e,h)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=e;let o,c;try{o=Ke(r).toUint8Array()}catch(u){if(u instanceof up)return Hn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new dc(o,s,i)}catch(u){return Hn(u instanceof Sr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(t,e,r){return e.Ce.count===r-this.Pt(t,e.targetId)?0:2}Pt(t,e){const r=this.Ge.getRemoteKeysForTarget(e);let s=0;return r.forEach((i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;t.mightContain(c)||(this.et(e,i,null),s++)})),s}Tt(t){const e=new Map;this.ze.forEach(((i,o)=>{const c=this.ot(o);if(c){if(i.current&&ha(c.target)){const u=new U(c.target.path);this.It(u).has(o)||this.Et(o,u)||this.et(o,u,vt.newNoDocument(u,t))}i.Be&&(e.set(o,i.ke()),i.qe())}}));let r=J();this.He.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const h=this.ot(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(t)));const s=new Ji(t,e,this.Ye,this.je,r);return this.je=Ce(),this.Je=Fs(),this.He=Fs(),this.Ye=new ot(W),s}Xe(t,e){if(!this.rt(t))return;const r=this.Et(t,e.key)?2:0;this.nt(t).Qe(e.key,r),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.He=this.He.insert(e.key,this.dt(e.key).add(t))}et(t,e,r){if(!this.rt(t))return;const s=this.nt(t);this.Et(t,e)?s.Qe(e,1):s.$e(e),this.He=this.He.insert(e,this.dt(e).delete(t)),this.He=this.He.insert(e,this.dt(e).add(t)),r&&(this.je=this.je.insert(e,r))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ue(t){this.nt(t).Ue()}nt(t){let e=this.ze.get(t);return e||(e=new eh,this.ze.set(t,e)),e}dt(t){let e=this.He.get(t);return e||(e=new yt(W),this.He=this.He.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new yt(W),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||N("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new eh),this.Ge.getRemoteKeysForTarget(t).forEach((e=>{this.et(t,e,null)}))}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function Fs(){return new ot(U.comparator)}function nh(){return new ot(U.comparator)}const pb={asc:"ASCENDING",desc:"DESCENDING"},gb={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},mb={and:"AND",or:"OR"};class _b{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function fa(n,t){return n.useProto3Json||hs(t)?t:{value:t}}function _i(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Bp(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function yb(n,t){return _i(n,t.toTimestamp())}function Kt(n){return Q(!!n,49232),B.fromTimestamp((function(e){const r=Ge(e);return new rt(r.seconds,r.nanos)})(n))}function fc(n,t){return pa(n,t).canonicalString()}function pa(n,t){const e=(function(s){return new nt(["projects",s.projectId,"databases",s.database])})(n).child("documents");return t===void 0?e:e.child(t)}function jp(n){const t=nt.fromString(n);return Q(Jp(t),10190,{key:t.toString()}),t}function yi(n,t){return fc(n.databaseId,t.path)}function Lr(n,t){const e=jp(t);if(e.get(1)!==n.databaseId.projectId)throw new O(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new O(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new U(Hp(e))}function $p(n,t){return fc(n.databaseId,t)}function Tb(n){const t=jp(n);return t.length===4?nt.emptyPath():Hp(t)}function ga(n){return new nt(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Hp(n){return Q(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function rh(n,t,e){return{name:yi(n,t),fields:e.value.mapValue.fields}}function Eb(n,t){return"found"in t?(function(r,s){Q(!!s.found,43571),s.found.name,s.found.updateTime;const i=Lr(r,s.found.name),o=Kt(s.found.updateTime),c=s.found.createTime?Kt(s.found.createTime):B.min(),u=new Ut({mapValue:{fields:s.found.fields}});return vt.newFoundDocument(i,o,c,u)})(n,t):"missing"in t?(function(r,s){Q(!!s.missing,3894),Q(!!s.readTime,22933);const i=Lr(r,s.missing),o=Kt(s.readTime);return vt.newNoDocument(i,o)})(n,t):F(7234,{result:t})}function wb(n,t){let e;if("targetChange"in t){t.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:F(39313,{state:h})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(Q(f===void 0||typeof f=="string",58123),Pt.fromBase64String(f||"")):(Q(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Pt.fromUint8Array(f||new Uint8Array))})(n,t.targetChange.resumeToken),o=t.targetChange.cause,c=o&&(function(h){const f=h.code===void 0?P.UNKNOWN:xp(h.code);return new O(f,h.message||"")})(o);e=new Up(r,s,i,c||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Lr(n,r.document.name),i=Kt(r.document.updateTime),o=r.document.createTime?Kt(r.document.createTime):B.min(),c=new Ut({mapValue:{fields:r.document.fields}}),u=vt.newFoundDocument(s,i,o,c),h=r.targetIds||[],f=r.removedTargetIds||[];e=new Gs(h,f,u.key,u)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Lr(n,r.document),i=r.readTime?Kt(r.readTime):B.min(),o=vt.newNoDocument(s,i),c=r.removedTargetIds||[];e=new Gs([],c,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Lr(n,r.document),i=r.removedTargetIds||[];e=new Gs([],i,s,null)}else{if(!("filter"in t))return F(11601,{Rt:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new lb(s,i),c=r.targetId;e=new Fp(c,o)}}return e}function qp(n,t){let e;if(t instanceof ds)e={update:rh(n,t.key,t.value)};else if(t instanceof lc)e={delete:yi(n,t.key)};else if(t instanceof tn)e={update:rh(n,t.key,t.data),updateMask:kb(t.fieldMask)};else{if(!(t instanceof Mp))return F(16599,{Vt:t.type});e={verify:yi(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(i,o){const c=o.transform;if(c instanceof Jr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Gr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Kr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof mi)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw F(20930,{transform:o.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:yb(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:F(27497)})(n,t.precondition)),e}function Ib(n,t){return n&&n.length>0?(Q(t!==void 0,14353),n.map((e=>(function(s,i){let o=s.updateTime?Kt(s.updateTime):Kt(i);return o.isEqual(B.min())&&(o=Kt(i)),new ib(o,s.transformResults||[])})(e,t)))):[]}function vb(n,t){return{documents:[$p(n,t.path)]}}function Ab(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=$p(n,s);const i=(function(h){if(h.length!==0)return Wp(me.create(h,"and"))})(t.filters);i&&(e.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((f=>(function(m){return{field:Pn(m.field),direction:Sb(m.dir)}})(f)))})(t.orderBy);o&&(e.structuredQuery.orderBy=o);const c=fa(n,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(t.endAt)),{ft:e,parent:s}}function bb(n){let t=Tb(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){Q(r===1,65062);const f=e.from[0];f.allDescendants?s=f.collectionId:t=t.child(f.collectionId)}let i=[];e.where&&(i=(function(p){const m=zp(p);return m instanceof me&&Tp(m)?m.getFilters():[m]})(e.where));let o=[];e.orderBy&&(o=(function(p){return p.map((m=>(function(S){return new gi(kn(S.field),(function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(S.direction))})(m)))})(e.orderBy));let c=null;e.limit&&(c=(function(p){let m;return m=typeof p=="object"?p.value:p,hs(m)?null:m})(e.limit));let u=null;e.startAt&&(u=(function(p){const m=!!p.before,v=p.values||[];return new pi(v,m)})(e.startAt));let h=null;return e.endAt&&(h=(function(p){const m=!p.before,v=p.values||[];return new pi(v,m)})(e.endAt)),qA(t,s,o,i,c,"F",u,h)}function Cb(n,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function zp(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=kn(e.unaryFilter.field);return _t.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=kn(e.unaryFilter.field);return _t.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=kn(e.unaryFilter.field);return _t.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=kn(e.unaryFilter.field);return _t.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return F(61313);default:return F(60726)}})(n):n.fieldFilter!==void 0?(function(e){return _t.create(kn(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return F(58110);default:return F(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return me.create(e.compositeFilter.filters.map((r=>zp(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return F(1026)}})(e.compositeFilter.op))})(n):F(30097,{filter:n})}function Sb(n){return pb[n]}function Rb(n){return gb[n]}function Pb(n){return mb[n]}function Pn(n){return{fieldPath:n.canonicalString()}}function kn(n){return St.fromServerFormat(n.fieldPath)}function Wp(n){return n instanceof _t?(function(e){if(e.op==="=="){if(ql(e.value))return{unaryFilter:{field:Pn(e.field),op:"IS_NAN"}};if(Hl(e.value))return{unaryFilter:{field:Pn(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(ql(e.value))return{unaryFilter:{field:Pn(e.field),op:"IS_NOT_NAN"}};if(Hl(e.value))return{unaryFilter:{field:Pn(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Pn(e.field),op:Rb(e.op),value:e.value}}})(n):n instanceof me?(function(e){const r=e.getFilters().map((s=>Wp(s)));return r.length===1?r[0]:{compositeFilter:{op:Pb(e.op),filters:r}}})(n):F(54877,{filter:n})}function kb(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function Jp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Fe{constructor(t,e,r,s,i=B.min(),o=B.min(),c=Pt.EMPTY_BYTE_STRING,u=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(t){return new Fe(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Fe(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Fe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Fe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class Vb{constructor(t){this.yt=t}}function Db(n){const t=bb({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?da(t,t.limit,"L"):t}/**
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
 */class Nb{constructor(){this.Cn=new Ob}addToCollectionParentIndex(t,e){return this.Cn.add(e),R.resolve()}getCollectionParents(t,e){return R.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return R.resolve()}deleteFieldIndex(t,e){return R.resolve()}deleteAllFieldIndexes(t){return R.resolve()}createTargetIndexes(t,e){return R.resolve()}getDocumentsMatchingTarget(t,e){return R.resolve(null)}getIndexType(t,e){return R.resolve(0)}getFieldIndexes(t,e){return R.resolve([])}getNextCollectionGroupToUpdate(t){return R.resolve(null)}getMinOffset(t,e){return R.resolve(Je.min())}getMinOffsetFromCollectionGroup(t,e){return R.resolve(Je.min())}updateCollectionGroup(t,e,r){return R.resolve()}updateIndexEntries(t,e){return R.resolve()}}class Ob{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new yt(nt.comparator),i=!s.has(r);return this.index[e]=s.add(r),i}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new yt(nt.comparator)).toArray()}}/**
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
 */const sh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Gp=41943040;class $t{static withCacheSize(t){return new $t(t,$t.DEFAULT_COLLECTION_PERCENTILE,$t.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
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
 */$t.DEFAULT_COLLECTION_PERCENTILE=10,$t.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,$t.DEFAULT=new $t(Gp,$t.DEFAULT_COLLECTION_PERCENTILE,$t.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),$t.DISABLED=new $t(-1,0,0);/**
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
 */class Jn{constructor(t){this.ar=t}next(){return this.ar+=2,this.ar}static ur(){return new Jn(0)}static cr(){return new Jn(-1)}}/**
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
 */const ih="LruGarbageCollector",Mb=1048576;function oh([n,t],[e,r]){const s=W(n,e);return s===0?W(t,r):s}class Lb{constructor(t){this.Ir=t,this.buffer=new yt(oh),this.Er=0}dr(){return++this.Er}Ar(t){const e=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();oh(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class xb{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(t){N(ih,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){ir(e)?N(ih,"Ignoring IndexedDB error during garbage collection: ",e):await sr(e)}await this.Vr(3e5)}))}}class Fb{constructor(t,e){this.mr=t,this.params=e}calculateTargetCount(t,e){return this.mr.gr(t).next((r=>Math.floor(e/100*r)))}nthSequenceNumber(t,e){if(e===0)return R.resolve(Ui.ce);const r=new Lb(e);return this.mr.forEachTarget(t,(s=>r.Ar(s.sequenceNumber))).next((()=>this.mr.pr(t,(s=>r.Ar(s))))).next((()=>r.maxValue))}removeTargets(t,e,r){return this.mr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.mr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(sh)):this.getCacheSize(t).next((r=>r<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),sh):this.yr(t,e)))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,e){let r,s,i,o,c,u,h;const f=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(t,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(t,r,e)))).next((p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(t,r)))).next((p=>(h=Date.now(),Sn()<=z.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function Ub(n,t){return new Fb(n,t)}/**
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
 */class Bb{constructor(){this.changes=new In((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,vt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?R.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class jb{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class $b{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(r!==null&&Mr(r.mutation,s,Gt.empty(),rt.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.getLocalViewOfDocuments(t,r,J()).next((()=>r))))}getLocalViewOfDocuments(t,e,r=J()){const s=ln();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,r).next((i=>{let o=Cr();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(t,e){const r=ln();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,J())))}populateOverlays(t,e,r){const s=[];return r.forEach((i=>{e.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(t,s).next((i=>{i.forEach(((o,c)=>{e.set(o,c)}))}))}computeViews(t,e,r,s){let i=Ce();const o=Or(),c=(function(){return Or()})();return e.forEach(((u,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof tn)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),Mr(f.mutation,h,f.mutation.getFieldMask(),rt.now())):o.set(h.key,Gt.empty())})),this.recalculateAndSaveOverlays(t,i).next((u=>(u.forEach(((h,f)=>o.set(h,f))),e.forEach(((h,f)=>c.set(h,new jb(f,o.get(h)??null)))),c)))}recalculateAndSaveOverlays(t,e){const r=Or();let s=new ot(((o,c)=>o-c)),i=J();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((o=>{for(const c of o)c.keys().forEach((u=>{const h=e.get(u);if(h===null)return;let f=r.get(u)||Gt.empty();f=c.applyToLocalView(h,f),r.set(u,f);const p=(s.get(c.batchId)||J()).add(u);s=s.insert(c.batchId,p)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,p=Sp();f.forEach((m=>{if(!i.has(m)){const v=Np(e.get(m),r.get(m));v!==null&&p.set(m,v),i=i.add(m)}})),o.push(this.documentOverlayCache.saveOverlays(t,h,p))}return R.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,e,r,s){return(function(o){return U.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):zA(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-i.size):R.resolve(ln());let c=Hr,u=i;return o.next((h=>R.forEach(h,((f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?R.resolve():this.remoteDocumentCache.getEntry(t,f).next((m=>{u=u.insert(f,m)}))))).next((()=>this.populateOverlays(t,h,i))).next((()=>this.computeViews(t,u,h,J()))).next((f=>({batchId:c,changes:Cp(f)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new U(e)).next((r=>{let s=Cr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const i=e.collectionGroup;let o=Cr();return this.indexManager.getCollectionParents(t,i).next((c=>R.forEach(c,(u=>{const h=(function(p,m){return new ji(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(e,u.child(i));return this.getDocumentsMatchingCollectionQuery(t,h,r,s).next((f=>{f.forEach(((p,m)=>{o=o.insert(p,m)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(t,e,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,i,s)))).next((o=>{i.forEach(((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,vt.newInvalidDocument(f)))}));let c=Cr();return o.forEach(((u,h)=>{const f=i.get(u);f!==void 0&&Mr(f.mutation,h,Gt.empty(),rt.now()),qi(e,h)&&(c=c.insert(u,h))})),c}))}}/**
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
 */class Hb{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,e){return R.resolve(this.Lr.get(e))}saveBundleMetadata(t,e){return this.Lr.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:Kt(s.createTime)}})(e)),R.resolve()}getNamedQuery(t,e){return R.resolve(this.kr.get(e))}saveNamedQuery(t,e){return this.kr.set(e.name,(function(s){return{name:s.name,query:Db(s.bundledQuery),readTime:Kt(s.readTime)}})(e)),R.resolve()}}/**
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
 */class qb{constructor(){this.overlays=new ot(U.comparator),this.qr=new Map}getOverlay(t,e){return R.resolve(this.overlays.get(e))}getOverlays(t,e){const r=ln();return R.forEach(e,(s=>this.getOverlay(t,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(t,e,r){return r.forEach(((s,i)=>{this.St(t,e,i)})),R.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(r)),R.resolve()}getOverlaysForCollection(t,e,r){const s=ln(),i=e.length+1,o=new U(e.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!e.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return R.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let i=new ot(((h,f)=>h-f));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===e&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=ln(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=ln(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return R.resolve(c)}St(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new ub(e,r));let i=this.qr.get(e);i===void 0&&(i=J(),this.qr.set(e,i)),this.qr.set(e,i.add(r.key))}}/**
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
 */class zb{constructor(){this.sessionToken=Pt.EMPTY_BYTE_STRING}getSessionToken(t){return R.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,R.resolve()}}/**
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
 */class pc{constructor(){this.Qr=new yt(It.$r),this.Ur=new yt(It.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,e){const r=new It(t,e);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(t,e){t.forEach((r=>this.addReference(r,e)))}removeReference(t,e){this.Gr(new It(t,e))}zr(t,e){t.forEach((r=>this.removeReference(r,e)))}jr(t){const e=new U(new nt([])),r=new It(e,t),s=new It(e,t+1),i=[];return this.Ur.forEachInRange([r,s],(o=>{this.Gr(o),i.push(o.key)})),i}Jr(){this.Qr.forEach((t=>this.Gr(t)))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const e=new U(new nt([])),r=new It(e,t),s=new It(e,t+1);let i=J();return this.Ur.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(t){const e=new It(t,0),r=this.Qr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class It{constructor(t,e){this.key=t,this.Yr=e}static $r(t,e){return U.comparator(t.key,e.key)||W(t.Yr,e.Yr)}static Kr(t,e){return W(t.Yr,e.Yr)||U.comparator(t.key,e.key)}}/**
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
 */class Wb{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.tr=1,this.Zr=new yt(It.$r)}checkEmpty(t){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new cb(i,e,r,s);this.mutationQueue.push(o);for(const c of s)this.Zr=this.Zr.add(new It(c.key,i)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return R.resolve(o)}lookupMutationBatch(t,e){return R.resolve(this.Xr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.ei(r),i=s<0?0:s;return R.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?sc:this.tr-1)}getAllMutationBatches(t){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new It(e,0),s=new It(e,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],(o=>{const c=this.Xr(o.Yr);i.push(c)})),R.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new yt(W);return e.forEach((s=>{const i=new It(s,0),o=new It(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,o],(c=>{r=r.add(c.Yr)}))})),R.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let i=r;U.isDocumentKey(i)||(i=i.child(""));const o=new It(new U(i),0);let c=new yt(W);return this.Zr.forEachWhile((u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.Yr)),!0)}),o),R.resolve(this.ti(c))}ti(t){const e=[];return t.forEach((r=>{const s=this.Xr(r);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){Q(this.ni(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return R.forEach(e.mutations,(s=>{const i=new It(s.key,e.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.Zr=r}))}ir(t){}containsKey(t,e){const r=new It(e,0),s=this.Zr.firstAfterOrEqual(r);return R.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,R.resolve()}ni(t,e){return this.ei(t)}ei(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Xr(t){const e=this.ei(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class Jb{constructor(t){this.ri=t,this.docs=(function(){return new ot(U.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),i=s?s.size:0,o=this.ri(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return R.resolve(r?r.document.mutableCopy():vt.newInvalidDocument(e))}getEntries(t,e){let r=Ce();return e.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():vt.newInvalidDocument(s))})),R.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let i=Ce();const o=e.path,c=new U(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||IA(wA(f),r)<=0||(s.has(f.key)||qi(e,f))&&(i=i.insert(f.key,f.mutableCopy()))}return R.resolve(i)}getAllFromCollectionGroup(t,e,r,s){F(9500)}ii(t,e){return R.forEach(this.docs,(r=>e(r)))}newChangeBuffer(t){return new Gb(this)}getSize(t){return R.resolve(this.size)}}class Gb extends Bb{constructor(t){super(),this.Nr=t}applyChanges(t){const e=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?e.push(this.Nr.addEntry(t,s)):this.Nr.removeEntry(r)})),R.waitFor(e)}getFromCache(t,e){return this.Nr.getEntry(t,e)}getAllFromCache(t,e){return this.Nr.getEntries(t,e)}}/**
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
 */class Kb{constructor(t){this.persistence=t,this.si=new In((e=>ac(e)),cc),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.oi=0,this._i=new pc,this.targetCount=0,this.ai=Jn.ur()}forEachTarget(t,e){return this.si.forEach(((r,s)=>e(s))),R.resolve()}getLastRemoteSnapshotVersion(t){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return R.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.oi&&(this.oi=e),R.resolve()}Pr(t){this.si.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ai=new Jn(e),this.highestTargetId=e),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,e){return this.Pr(e),this.targetCount+=1,R.resolve()}updateTargetData(t,e){return this.Pr(e),R.resolve()}removeTargetData(t,e){return this.si.delete(e.target),this._i.jr(e.targetId),this.targetCount-=1,R.resolve()}removeTargets(t,e,r){let s=0;const i=[];return this.si.forEach(((o,c)=>{c.sequenceNumber<=e&&r.get(c.targetId)===null&&(this.si.delete(o),i.push(this.removeMatchingKeysForTargetId(t,c.targetId)),s++)})),R.waitFor(i).next((()=>s))}getTargetCount(t){return R.resolve(this.targetCount)}getTargetData(t,e){const r=this.si.get(e)||null;return R.resolve(r)}addMatchingKeys(t,e,r){return this._i.Wr(e,r),R.resolve()}removeMatchingKeys(t,e,r){this._i.zr(e,r);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach((o=>{i.push(s.markPotentiallyOrphaned(t,o))})),R.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this._i.jr(e),R.resolve()}getMatchingKeysForTargetId(t,e){const r=this._i.Hr(e);return R.resolve(r)}containsKey(t,e){return R.resolve(this._i.containsKey(e))}}/**
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
 */class Kp{constructor(t,e){this.ui={},this.overlays={},this.ci=new Ui(0),this.li=!1,this.li=!0,this.hi=new zb,this.referenceDelegate=t(this),this.Pi=new Kb(this),this.indexManager=new Nb,this.remoteDocumentCache=(function(s){return new Jb(s)})((r=>this.referenceDelegate.Ti(r))),this.serializer=new Vb(e),this.Ii=new Hb(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new qb,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ui[t.toKey()];return r||(r=new Wb(e,this.referenceDelegate),this.ui[t.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,e,r){N("MemoryPersistence","Starting transaction:",t);const s=new Qb(this.ci.next());return this.referenceDelegate.Ei(),r(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ai(t,e){return R.or(Object.values(this.ui).map((r=>()=>r.containsKey(t,e))))}}class Qb extends AA{constructor(t){super(),this.currentSequenceNumber=t}}class gc{constructor(t){this.persistence=t,this.Ri=new pc,this.Vi=null}static mi(t){return new gc(t)}get fi(){if(this.Vi)return this.Vi;throw F(60996)}addReference(t,e,r){return this.Ri.addReference(r,e),this.fi.delete(r.toString()),R.resolve()}removeReference(t,e,r){return this.Ri.removeReference(r,e),this.fi.add(r.toString()),R.resolve()}markPotentiallyOrphaned(t,e){return this.fi.add(e.toString()),R.resolve()}removeTarget(t,e){this.Ri.jr(e.targetId).forEach((s=>this.fi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((i=>this.fi.add(i.toString())))})).next((()=>r.removeTargetData(t,e)))}Ei(){this.Vi=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.fi,(r=>{const s=U.fromPath(r);return this.gi(t,s).next((i=>{i||e.removeEntry(s,B.min())}))})).next((()=>(this.Vi=null,e.apply(t))))}updateLimboDocument(t,e){return this.gi(t,e).next((r=>{r?this.fi.delete(e.toString()):this.fi.add(e.toString())}))}Ti(t){return 0}gi(t,e){return R.or([()=>R.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ai(t,e)])}}class Ti{constructor(t,e){this.persistence=t,this.pi=new In((r=>SA(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Ub(this,e)}static mi(t,e){return new Ti(t,e)}Ei(){}di(t){return R.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}gr(t){const e=this.wr(t);return this.persistence.getTargetCache().getTargetCount(t).next((r=>e.next((s=>r+s))))}wr(t){let e=0;return this.pr(t,(r=>{e++})).next((()=>e))}pr(t,e){return R.forEach(this.pi,((r,s)=>this.br(t,r,s).next((i=>i?R.resolve():e(s)))))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(t,(o=>this.br(t,o,e).next((c=>{c||(r++,i.removeEntry(o,B.min()))})))).next((()=>i.apply(t))).next((()=>r))}markPotentiallyOrphaned(t,e){return this.pi.set(e,t.currentSequenceNumber),R.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.pi.set(r,t.currentSequenceNumber),R.resolve()}removeReference(t,e,r){return this.pi.set(r,t.currentSequenceNumber),R.resolve()}updateLimboDocument(t,e){return this.pi.set(e,t.currentSequenceNumber),R.resolve()}Ti(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=zs(t.data.value)),e}br(t,e,r){return R.or([()=>this.persistence.Ai(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.pi.get(e);return R.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
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
 */class mc{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.Es=r,this.ds=s}static As(t,e){let r=J(),s=J();for(const i of e.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new mc(t,e.fromCache,r,s)}}/**
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
 */class Xb{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class Yb{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return $E()?8:bA(Lt())>0?6:4})()}initialize(t,e){this.ps=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,r,s){const i={result:null};return this.ys(t,e).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ws(t,e,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new Xb;return this.Ss(t,e,o).next((c=>{if(i.result=c,this.Vs)return this.bs(t,e,o,c.size)}))})).next((()=>i.result))}bs(t,e,r,s){return r.documentReadCount<this.fs?(Sn()<=z.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",Rn(e),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),R.resolve()):(Sn()<=z.DEBUG&&N("QueryEngine","Query:",Rn(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Sn()<=z.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",Rn(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,he(e))):R.resolve())}ys(t,e){if(Gl(e))return R.resolve(null);let r=he(e);return this.indexManager.getIndexType(t,r).next((s=>s===0?null:(e.limit!==null&&s===1&&(e=da(e,null,"F"),r=he(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next((i=>{const o=J(...i);return this.ps.getDocuments(t,o).next((c=>this.indexManager.getMinOffset(t,r).next((u=>{const h=this.Ds(e,c);return this.Cs(e,h,o,u.readTime)?this.ys(t,da(e,null,"F")):this.vs(t,h,e,u)}))))})))))}ws(t,e,r,s){return Gl(e)||s.isEqual(B.min())?R.resolve(null):this.ps.getDocuments(t,r).next((i=>{const o=this.Ds(e,i);return this.Cs(e,o,r,s)?R.resolve(null):(Sn()<=z.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Rn(e)),this.vs(t,o,e,EA(s,Hr)).next((c=>c)))}))}Ds(t,e){let r=new yt(Ap(t));return e.forEach(((s,i)=>{qi(t,i)&&(r=r.add(i))})),r}Cs(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(t,e,r){return Sn()<=z.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",Rn(e)),this.ps.getDocumentsMatchingQuery(t,e,Je.min(),r)}vs(t,e,r,s){return this.ps.getDocumentsMatchingQuery(t,r,s).next((i=>(e.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
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
 */const _c="LocalStore",Zb=3e8;class tC{constructor(t,e,r,s){this.persistence=t,this.Fs=e,this.serializer=s,this.Ms=new ot(W),this.xs=new In((i=>ac(i)),cc),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(r)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new $b(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.Ms)))}}function eC(n,t,e,r){return new tC(n,t,e,r)}async function Qp(n,t){const e=$(n);return await e.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,e.Bs(t),e.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],c=[];let u=J();for(const h of s){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return e.localDocuments.getDocuments(r,u).next((h=>({Ls:h,removedBatchIds:o,addedBatchIds:c})))}))}))}function nC(n,t){const e=$(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),i=e.Ns.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const p=h.batch,m=p.keys();let v=R.resolve();return m.forEach((S=>{v=v.next((()=>f.getEntry(u,S))).next((k=>{const V=h.docVersions.get(S);Q(V!==null,48541),k.version.compareTo(V)<0&&(p.applyToRemoteDocument(k,h),k.isValidDocument()&&(k.setReadTime(h.commitVersion),f.addEntry(k)))}))})),v.next((()=>c.mutationQueue.removeMutationBatch(u,p)))})(e,r,t,i).next((()=>i.apply(r))).next((()=>e.mutationQueue.performConsistencyCheck(r))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let u=J();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(t)))).next((()=>e.localDocuments.getDocuments(r,s)))}))}function Xp(n){const t=$(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.Pi.getLastRemoteSnapshotVersion(e)))}function rC(n,t){const e=$(n),r=t.snapshotVersion;let s=e.Ms;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=e.Ns.newChangeBuffer({trackRemovals:!0});s=e.Ms;const c=[];t.targetChanges.forEach(((f,p)=>{const m=s.get(p);if(!m)return;c.push(e.Pi.removeMatchingKeys(i,f.removedDocuments,p).next((()=>e.Pi.addMatchingKeys(i,f.addedDocuments,p))));let v=m.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(p)!==null?v=v.withResumeToken(Pt.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):f.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(f.resumeToken,r)),s=s.insert(p,v),(function(k,V,L){return k.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=Zb?!0:L.addedDocuments.size+L.modifiedDocuments.size+L.removedDocuments.size>0})(m,v,f)&&c.push(e.Pi.updateTargetData(i,v))}));let u=Ce(),h=J();if(t.documentUpdates.forEach((f=>{t.resolvedLimboDocuments.has(f)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(sC(i,o,t.documentUpdates).next((f=>{u=f.ks,h=f.qs}))),!r.isEqual(B.min())){const f=e.Pi.getLastRemoteSnapshotVersion(i).next((p=>e.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(f)}return R.waitFor(c).next((()=>o.apply(i))).next((()=>e.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(e.Ms=s,i)))}function sC(n,t,e){let r=J(),s=J();return e.forEach((i=>r=r.add(i))),t.getEntries(n,r).next((i=>{let o=Ce();return e.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(B.min())?(t.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(t.addEntry(u),o=o.insert(c,u)):N(_c,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{ks:o,qs:s}}))}function iC(n,t){const e=$(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=sc),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function oC(n,t){const e=$(n);return e.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return e.Pi.getTargetData(r,t).next((i=>i?(s=i,R.resolve(s)):e.Pi.allocateTargetId(r).next((o=>(s=new Fe(t,o,"TargetPurposeListen",r.currentSequenceNumber),e.Pi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=e.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Ms=e.Ms.insert(r.targetId,r),e.xs.set(t,r.targetId)),r}))}async function ma(n,t,e){const r=$(n),s=r.Ms.get(t),i=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!ir(o))throw o;N(_c,`Failed to update sequence numbers for target ${t}: ${o}`)}r.Ms=r.Ms.remove(t),r.xs.delete(s.target)}function ah(n,t,e){const r=$(n);let s=B.min(),i=J();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,h,f){const p=$(u),m=p.xs.get(f);return m!==void 0?R.resolve(p.Ms.get(m)):p.Pi.getTargetData(h,f)})(r,o,he(t)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>r.Fs.getDocumentsMatchingQuery(o,t,e?s:B.min(),e?i:J()))).next((c=>(aC(r,JA(t),c),{documents:c,Qs:i})))))}function aC(n,t,e){let r=n.Os.get(t)||B.min();e.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Os.set(t,r)}class ch{constructor(){this.activeTargetIds=ZA()}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class cC{constructor(){this.Mo=new ch,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,e,r){this.xo[t]=e}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new ch,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class uC{Oo(t){}shutdown(){}}/**
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
 */const uh="ConnectivityMonitor";class lh{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){N(uh,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){N(uh,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Us=null;function _a(){return Us===null?Us=(function(){return 268435456+Math.round(2147483648*Math.random())})():Us++,"0x"+Us.toString(16)}/**
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
 */const $o="RestConnection",lC={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class hC{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=e+"://"+t.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===di?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(t,e,r,s,i){const o=_a(),c=this.zo(t,e.toUriEncodedString());N($o,`Sending RPC '${t}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,s,i);const{host:h}=new URL(c),f=Zn(h);return this.Jo(t,c,u,r,f).then((p=>(N($o,`Received RPC '${t}' ${o}: `,p),p)),(p=>{throw Hn($o,`RPC '${t}' ${o} failed with error: `,p,"url: ",c,"request:",r),p}))}Ho(t,e,r,s,i,o){return this.Go(t,e,r,s,i)}jo(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+rr})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,i)=>t[i]=s)),r&&r.headers.forEach(((s,i)=>t[i]=s))}zo(t,e){const r=lC[t];return`${this.Uo}/v1/${e}:${r}`}terminate(){}}/**
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
 */class dC{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}}/**
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
 */const Vt="WebChannelConnection";class fC extends hC{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,r,s,i){const o=_a();return new Promise(((c,u)=>{const h=new Zf;h.setWithCredentials(!0),h.listenOnce(tp.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case qs.NO_ERROR:const p=h.getResponseJson();N(Vt,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(p)),c(p);break;case qs.TIMEOUT:N(Vt,`RPC '${t}' ${o} timed out`),u(new O(P.DEADLINE_EXCEEDED,"Request time out"));break;case qs.HTTP_ERROR:const m=h.getStatus();if(N(Vt,`RPC '${t}' ${o} failed with status:`,m,"response text:",h.getResponseText()),m>0){let v=h.getResponseJson();Array.isArray(v)&&(v=v[0]);const S=v==null?void 0:v.error;if(S&&S.status&&S.message){const k=(function(L){const x=L.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(x)>=0?x:P.UNKNOWN})(S.status);u(new O(k,S.message))}else u(new O(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new O(P.UNAVAILABLE,"Connection failed."));break;default:F(9055,{l_:t,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{N(Vt,`RPC '${t}' ${o} completed.`)}}));const f=JSON.stringify(s);N(Vt,`RPC '${t}' ${o} sending request:`,s),h.send(e,"POST",f,r,15)}))}T_(t,e,r){const s=_a(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],o=rp(),c=np(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,e,r),u.encodeInitMessageHeaders=!0;const f=i.join("");N(Vt,`Creating RPC '${t}' stream ${s}: ${f}`,u);const p=o.createWebChannel(f,u);this.I_(p);let m=!1,v=!1;const S=new dC({Yo:V=>{v?N(Vt,`Not sending because RPC '${t}' stream ${s} is closed:`,V):(m||(N(Vt,`Opening RPC '${t}' stream ${s} transport.`),p.open(),m=!0),N(Vt,`RPC '${t}' stream ${s} sending:`,V),p.send(V))},Zo:()=>p.close()}),k=(V,L,x)=>{V.listen(L,(H=>{try{x(H)}catch(at){setTimeout((()=>{throw at}),0)}}))};return k(p,br.EventType.OPEN,(()=>{v||(N(Vt,`RPC '${t}' stream ${s} transport opened.`),S.o_())})),k(p,br.EventType.CLOSE,(()=>{v||(v=!0,N(Vt,`RPC '${t}' stream ${s} transport closed`),S.a_(),this.E_(p))})),k(p,br.EventType.ERROR,(V=>{v||(v=!0,Hn(Vt,`RPC '${t}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),S.a_(new O(P.UNAVAILABLE,"The operation could not be completed")))})),k(p,br.EventType.MESSAGE,(V=>{var L;if(!v){const x=V.data[0];Q(!!x,16349);const H=x,at=(H==null?void 0:H.error)||((L=H[0])==null?void 0:L.error);if(at){N(Vt,`RPC '${t}' stream ${s} received error:`,at);const qt=at.status;let gt=(function(T){const I=ht[T];if(I!==void 0)return xp(I)})(qt),w=at.message;gt===void 0&&(gt=P.INTERNAL,w="Unknown error status: "+qt+" with message "+at.message),v=!0,S.a_(new O(gt,w)),p.close()}else N(Vt,`RPC '${t}' stream ${s} received:`,x),S.u_(x)}})),k(c,ep.STAT_EVENT,(V=>{V.stat===oa.PROXY?N(Vt,`RPC '${t}' stream ${s} detected buffering proxy`):V.stat===oa.NOPROXY&&N(Vt,`RPC '${t}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{S.__()}),0),S}terminate(){this.c_.forEach((t=>t.close())),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter((e=>e===t))}}function Ho(){return typeof document<"u"?document:null}/**
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
 */function Gi(n){return new _b(n,!0)}/**
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
 */class yc{constructor(t,e,r=1e3,s=1.5,i=6e4){this.Mi=t,this.timerId=e,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const e=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-r);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),t()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const hh="PersistentStream";class Yp{constructor(t,e,r,s,i,o,c,u){this.Mi=t,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new yc(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(t){this.Q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===P.RESOURCE_EXHAUSTED?(be(e.toString()),be("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.r_(e)}K_(){}auth(){this.state=1;const t=this.W_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===e&&this.G_(r,s)}),(r=>{t((()=>{const s=new O(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(t,e){const r=this.W_(this.D_);this.stream=this.j_(t,e),this.stream.Xo((()=>{r((()=>this.listener.Xo()))})),this.stream.t_((()=>{r((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return N(hh,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Mi.enqueueAndForget((()=>this.D_===t?e():(N(hh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class pC extends Yp{constructor(t,e,r,s,i,o){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,o),this.serializer=i}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=wb(this.serializer,t),r=(function(i){if(!("targetChange"in i))return B.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?B.min():o.readTime?Kt(o.readTime):B.min()})(t);return this.listener.H_(e,r)}Y_(t){const e={};e.database=ga(this.serializer),e.addTarget=(function(i,o){let c;const u=o.target;if(c=ha(u)?{documents:vb(i,u)}:{query:Ab(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Bp(i,o.resumeToken);const h=fa(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(B.min())>0){c.readTime=_i(i,o.snapshotVersion.toTimestamp());const h=fa(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,t);const r=Cb(this.serializer,t);r&&(e.labels=r),this.q_(e)}Z_(t){const e={};e.database=ga(this.serializer),e.removeTarget=t,this.q_(e)}}class gC extends Yp{constructor(t,e,r,s,i,o){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,o),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return Q(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,Q(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){Q(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=Ib(t.writeResults,t.commitTime),r=Kt(t.commitTime);return this.listener.na(r,e)}ra(){const t={};t.database=ga(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map((r=>qp(this.serializer,r)))};this.q_(e)}}/**
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
 */class mC{}class _C extends mC{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new O(P.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,e,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Go(t,pa(e,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new O(P.UNKNOWN,i.toString())}))}Ho(t,e,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.Ho(t,pa(e,r),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new O(P.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class yC{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(be(e),this.aa=!1):N("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const _n="RemoteStore";class TC{constructor(t,e,r,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((o=>{r.enqueueAndForget((async()=>{vn(this)&&(N(_n,"Restarting streams for network reachability change."),await(async function(u){const h=$(u);h.Ea.add(4),await ps(h),h.Ra.set("Unknown"),h.Ea.delete(4),await Ki(h)})(this))}))})),this.Ra=new yC(r,s)}}async function Ki(n){if(vn(n))for(const t of n.da)await t(!0)}async function ps(n){for(const t of n.da)await t(!1)}function Zp(n,t){const e=$(n);e.Ia.has(t.targetId)||(e.Ia.set(t.targetId,t),Ic(e)?wc(e):or(e).O_()&&Ec(e,t))}function Tc(n,t){const e=$(n),r=or(e);e.Ia.delete(t),r.O_()&&tg(e,t),e.Ia.size===0&&(r.O_()?r.L_():vn(e)&&e.Ra.set("Unknown"))}function Ec(n,t){if(n.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(B.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}or(n).Y_(t)}function tg(n,t){n.Va.Ue(t),or(n).Z_(t)}function wc(n){n.Va=new fb({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),At:t=>n.Ia.get(t)||null,ht:()=>n.datastore.serializer.databaseId}),or(n).start(),n.Ra.ua()}function Ic(n){return vn(n)&&!or(n).x_()&&n.Ia.size>0}function vn(n){return $(n).Ea.size===0}function eg(n){n.Va=void 0}async function EC(n){n.Ra.set("Online")}async function wC(n){n.Ia.forEach(((t,e)=>{Ec(n,t)}))}async function IC(n,t){eg(n),Ic(n)?(n.Ra.ha(t),wc(n)):n.Ra.set("Unknown")}async function vC(n,t,e){if(n.Ra.set("Online"),t instanceof Up&&t.state===2&&t.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ia.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ia.delete(c),s.Va.removeTarget(c))})(n,t)}catch(r){N(_n,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Ei(n,r)}else if(t instanceof Gs?n.Va.Ze(t):t instanceof Fp?n.Va.st(t):n.Va.tt(t),!e.isEqual(B.min()))try{const r=await Xp(n.localStore);e.compareTo(r)>=0&&await(function(i,o){const c=i.Va.Tt(o);return c.targetChanges.forEach(((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ia.get(h);f&&i.Ia.set(h,f.withResumeToken(u.resumeToken,o))}})),c.targetMismatches.forEach(((u,h)=>{const f=i.Ia.get(u);if(!f)return;i.Ia.set(u,f.withResumeToken(Pt.EMPTY_BYTE_STRING,f.snapshotVersion)),tg(i,u);const p=new Fe(f.target,u,h,f.sequenceNumber);Ec(i,p)})),i.remoteSyncer.applyRemoteEvent(c)})(n,e)}catch(r){N(_n,"Failed to raise snapshot:",r),await Ei(n,r)}}async function Ei(n,t,e){if(!ir(t))throw t;n.Ea.add(1),await ps(n),n.Ra.set("Offline"),e||(e=()=>Xp(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{N(_n,"Retrying IndexedDB access"),await e(),n.Ea.delete(1),await Ki(n)}))}function ng(n,t){return t().catch((e=>Ei(n,e,t)))}async function Qi(n){const t=$(n),e=Xe(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:sc;for(;AC(t);)try{const s=await iC(t.localStore,r);if(s===null){t.Ta.length===0&&e.L_();break}r=s.batchId,bC(t,s)}catch(s){await Ei(t,s)}rg(t)&&sg(t)}function AC(n){return vn(n)&&n.Ta.length<10}function bC(n,t){n.Ta.push(t);const e=Xe(n);e.O_()&&e.X_&&e.ea(t.mutations)}function rg(n){return vn(n)&&!Xe(n).x_()&&n.Ta.length>0}function sg(n){Xe(n).start()}async function CC(n){Xe(n).ra()}async function SC(n){const t=Xe(n);for(const e of n.Ta)t.ea(e.mutations)}async function RC(n,t,e){const r=n.Ta.shift(),s=hc.from(r,t,e);await ng(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Qi(n)}async function PC(n,t){t&&Xe(n).X_&&await(async function(r,s){if((function(o){return Lp(o)&&o!==P.ABORTED})(s.code)){const i=r.Ta.shift();Xe(r).B_(),await ng(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Qi(r)}})(n,t),rg(n)&&sg(n)}async function dh(n,t){const e=$(n);e.asyncQueue.verifyOperationInProgress(),N(_n,"RemoteStore received new credentials");const r=vn(e);e.Ea.add(3),await ps(e),r&&e.Ra.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await Ki(e)}async function kC(n,t){const e=$(n);t?(e.Ea.delete(2),await Ki(e)):t||(e.Ea.add(2),await ps(e),e.Ra.set("Unknown"))}function or(n){return n.ma||(n.ma=(function(e,r,s){const i=$(e);return i.sa(),new pC(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:EC.bind(null,n),t_:wC.bind(null,n),r_:IC.bind(null,n),H_:vC.bind(null,n)}),n.da.push((async t=>{t?(n.ma.B_(),Ic(n)?wc(n):n.Ra.set("Unknown")):(await n.ma.stop(),eg(n))}))),n.ma}function Xe(n){return n.fa||(n.fa=(function(e,r,s){const i=$(e);return i.sa(),new gC(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:CC.bind(null,n),r_:PC.bind(null,n),ta:SC.bind(null,n),na:RC.bind(null,n)}),n.da.push((async t=>{t?(n.fa.B_(),await Qi(n)):(await n.fa.stop(),n.Ta.length>0&&(N(_n,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
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
 */class vc{constructor(t,e,r,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Ee,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,i){const o=Date.now()+r,c=new vc(t,e,o,s,i);return c.start(r),c}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(P.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ac(n,t){if(be("AsyncQueue",`${t}: ${n}`),ir(n))return new O(P.UNAVAILABLE,`${t}: ${n}`);throw n}/**
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
 */class xn{static emptySet(t){return new xn(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||U.comparator(e.key,r.key):(e,r)=>U.comparator(e.key,r.key),this.keyedMap=Cr(),this.sortedSet=new ot(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,r)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof xn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
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
 */class fh{constructor(){this.ga=new ot(U.comparator)}track(t){const e=t.doc.key,r=this.ga.get(e);r?t.type!==0&&r.type===3?this.ga=this.ga.insert(e,t):t.type===3&&r.type!==1?this.ga=this.ga.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.ga=this.ga.remove(e):t.type===1&&r.type===2?this.ga=this.ga.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):F(63341,{Rt:t,pa:r}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal(((e,r)=>{t.push(r)})),t}}class Gn{constructor(t,e,r,s,i,o,c,u,h){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(t,e,r,s,i){const o=[];return e.forEach((c=>{o.push({type:0,doc:c})})),new Gn(t,e,xn.emptySet(e),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Hi(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class VC{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((t=>t.Da()))}}class DC{constructor(){this.queries=ph(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,r){const s=$(e),i=s.queries;s.queries=ph(),i.forEach(((o,c)=>{for(const u of c.Sa)u.onError(r)}))})(this,new O(P.ABORTED,"Firestore shutting down"))}}function ph(){return new In((n=>vp(n)),Hi)}async function ig(n,t){const e=$(n);let r=3;const s=t.query;let i=e.queries.get(s);i?!i.ba()&&t.Da()&&(r=2):(i=new VC,r=t.Da()?0:1);try{switch(r){case 0:i.wa=await e.onListen(s,!0);break;case 1:i.wa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(o){const c=Ac(o,`Initialization of query '${Rn(t.query)}' failed`);return void t.onError(c)}e.queries.set(s,i),i.Sa.push(t),t.va(e.onlineState),i.wa&&t.Fa(i.wa)&&bc(e)}async function og(n,t){const e=$(n),r=t.query;let s=3;const i=e.queries.get(r);if(i){const o=i.Sa.indexOf(t);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=t.Da()?0:1:!i.ba()&&t.Da()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function NC(n,t){const e=$(n);let r=!1;for(const s of t){const i=s.query,o=e.queries.get(i);if(o){for(const c of o.Sa)c.Fa(s)&&(r=!0);o.wa=s}}r&&bc(e)}function OC(n,t,e){const r=$(n),s=r.queries.get(t);if(s)for(const i of s.Sa)i.onError(e);r.queries.delete(t)}function bc(n){n.Ca.forEach((t=>{t.next()}))}var ya,gh;(gh=ya||(ya={})).Ma="default",gh.Cache="cache";class ag{constructor(t,e,r){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Gn(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const r=e!=="Offline";return(!this.options.qa||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=Gn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==ya.Cache}}/**
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
 */class cg{constructor(t){this.key=t}}class ug{constructor(t){this.key=t}}class MC{constructor(t,e){this.query=t,this.Ya=e,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=J(),this.mutatedKeys=J(),this.eu=Ap(t),this.tu=new xn(this.eu)}get nu(){return this.Ya}ru(t,e){const r=e?e.iu:new fh,s=e?e.tu:this.tu;let i=e?e.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((f,p)=>{const m=s.get(f),v=qi(this.query,p)?p:null,S=!!m&&this.mutatedKeys.has(m.key),k=!!v&&(v.hasLocalMutations||this.mutatedKeys.has(v.key)&&v.hasCommittedMutations);let V=!1;m&&v?m.data.isEqual(v.data)?S!==k&&(r.track({type:3,doc:v}),V=!0):this.su(m,v)||(r.track({type:2,doc:v}),V=!0,(u&&this.eu(v,u)>0||h&&this.eu(v,h)<0)&&(c=!0)):!m&&v?(r.track({type:0,doc:v}),V=!0):m&&!v&&(r.track({type:1,doc:m}),V=!0,(u||h)&&(c=!0)),V&&(v?(o=o.add(v),i=k?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{tu:o,iu:r,Cs:c,mutatedKeys:i}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const i=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const o=t.iu.ya();o.sort(((f,p)=>(function(v,S){const k=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F(20277,{Rt:V})}};return k(v)-k(S)})(f.type,p.type)||this.eu(f.doc,p.doc))),this.ou(r),s=s??!1;const c=e&&!s?this._u():[],u=this.Xa.size===0&&this.current&&!s?1:0,h=u!==this.Za;return this.Za=u,o.length!==0||h?{snapshot:new Gn(this.query,t.tu,i,o,t.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new fh,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(t){return!this.Ya.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach((e=>this.Ya=this.Ya.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Ya=this.Ya.delete(e))),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Xa;this.Xa=J(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))}));const e=[];return t.forEach((r=>{this.Xa.has(r)||e.push(new ug(r))})),this.Xa.forEach((r=>{t.has(r)||e.push(new cg(r))})),e}cu(t){this.Ya=t.Qs,this.Xa=J();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return Gn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Cc="SyncEngine";class LC{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class xC{constructor(t){this.key=t,this.hu=!1}}class FC{constructor(t,e,r,s,i,o){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new In((c=>vp(c)),Hi),this.Iu=new Map,this.Eu=new Set,this.du=new ot(U.comparator),this.Au=new Map,this.Ru=new pc,this.Vu={},this.mu=new Map,this.fu=Jn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function UC(n,t,e=!0){const r=gg(n);let s;const i=r.Tu.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await lg(r,t,e,!0),s}async function BC(n,t){const e=gg(n);await lg(e,t,!0,!1)}async function lg(n,t,e,r){const s=await oC(n.localStore,he(t)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,e);let c;return r&&(c=await jC(n,t,i,o==="current",s.resumeToken)),n.isPrimaryClient&&e&&Zp(n.remoteStore,s),c}async function jC(n,t,e,r,s){n.pu=(p,m,v)=>(async function(k,V,L,x){let H=V.view.ru(L);H.Cs&&(H=await ah(k.localStore,V.query,!1).then((({documents:w})=>V.view.ru(w,H))));const at=x&&x.targetChanges.get(V.targetId),qt=x&&x.targetMismatches.get(V.targetId)!=null,gt=V.view.applyChanges(H,k.isPrimaryClient,at,qt);return _h(k,V.targetId,gt.au),gt.snapshot})(n,p,m,v);const i=await ah(n.localStore,t,!0),o=new MC(t,i.Qs),c=o.ru(i.documents),u=fs.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),h=o.applyChanges(c,n.isPrimaryClient,u);_h(n,e,h.au);const f=new LC(t,e,o);return n.Tu.set(t,f),n.Iu.has(e)?n.Iu.get(e).push(t):n.Iu.set(e,[t]),h.snapshot}async function $C(n,t,e){const r=$(n),s=r.Tu.get(t),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter((o=>!Hi(o,t)))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await ma(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),e&&Tc(r.remoteStore,s.targetId),Ta(r,s.targetId)})).catch(sr)):(Ta(r,s.targetId),await ma(r.localStore,s.targetId,!0))}async function HC(n,t){const e=$(n),r=e.Tu.get(t),s=e.Iu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),Tc(e.remoteStore,r.targetId))}async function qC(n,t,e){const r=XC(n);try{const s=await(function(o,c){const u=$(o),h=rt.now(),f=c.reduce(((v,S)=>v.add(S.key)),J());let p,m;return u.persistence.runTransaction("Locally write mutations","readwrite",(v=>{let S=Ce(),k=J();return u.Ns.getEntries(v,f).next((V=>{S=V,S.forEach(((L,x)=>{x.isValidDocument()||(k=k.add(L))}))})).next((()=>u.localDocuments.getOverlayedDocuments(v,S))).next((V=>{p=V;const L=[];for(const x of c){const H=ab(x,p.get(x.key).overlayedDocument);H!=null&&L.push(new tn(x.key,H,mp(H.value.mapValue),Ht.exists(!0)))}return u.mutationQueue.addMutationBatch(v,h,L,c)})).next((V=>{m=V;const L=V.applyToLocalDocumentSet(p,k);return u.documentOverlayCache.saveOverlays(v,V.batchId,L)}))})).then((()=>({batchId:m.batchId,changes:Cp(p)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(o,c,u){let h=o.Vu[o.currentUser.toKey()];h||(h=new ot(W)),h=h.insert(c,u),o.Vu[o.currentUser.toKey()]=h})(r,s.batchId,e),await gs(r,s.changes),await Qi(r.remoteStore)}catch(s){const i=Ac(s,"Failed to persist write");e.reject(i)}}async function hg(n,t){const e=$(n);try{const r=await rC(e.localStore,t);t.targetChanges.forEach(((s,i)=>{const o=e.Au.get(i);o&&(Q(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?Q(o.hu,14607):s.removedDocuments.size>0&&(Q(o.hu,42227),o.hu=!1))})),await gs(e,r,t)}catch(r){await sr(r)}}function mh(n,t,e){const r=$(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Tu.forEach(((i,o)=>{const c=o.view.va(t);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const u=$(o);u.onlineState=c;let h=!1;u.queries.forEach(((f,p)=>{for(const m of p.Sa)m.va(c)&&(h=!0)})),h&&bc(u)})(r.eventManager,t),s.length&&r.Pu.H_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function zC(n,t,e){const r=$(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Au.get(t),i=s&&s.key;if(i){let o=new ot(U.comparator);o=o.insert(i,vt.newNoDocument(i,B.min()));const c=J().add(i),u=new Ji(B.min(),new Map,new ot(W),o,c);await hg(r,u),r.du=r.du.remove(i),r.Au.delete(t),Sc(r)}else await ma(r.localStore,t,!1).then((()=>Ta(r,t,e))).catch(sr)}async function WC(n,t){const e=$(n),r=t.batch.batchId;try{const s=await nC(e.localStore,t);fg(e,r,null),dg(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await gs(e,s)}catch(s){await sr(s)}}async function JC(n,t,e){const r=$(n);try{const s=await(function(o,c){const u=$(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((p=>(Q(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(h,p)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(r.localStore,t);fg(r,t,e),dg(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await gs(r,s)}catch(s){await sr(s)}}function dg(n,t){(n.mu.get(t)||[]).forEach((e=>{e.resolve()})),n.mu.delete(t)}function fg(n,t,e){const r=$(n);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),r.Vu[r.currentUser.toKey()]=s}}function Ta(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Iu.get(t))n.Tu.delete(r),e&&n.Pu.yu(r,e);n.Iu.delete(t),n.isPrimaryClient&&n.Ru.jr(t).forEach((r=>{n.Ru.containsKey(r)||pg(n,r)}))}function pg(n,t){n.Eu.delete(t.path.canonicalString());const e=n.du.get(t);e!==null&&(Tc(n.remoteStore,e),n.du=n.du.remove(t),n.Au.delete(e),Sc(n))}function _h(n,t,e){for(const r of e)r instanceof cg?(n.Ru.addReference(r.key,t),GC(n,r)):r instanceof ug?(N(Cc,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,t),n.Ru.containsKey(r.key)||pg(n,r.key)):F(19791,{wu:r})}function GC(n,t){const e=t.key,r=e.path.canonicalString();n.du.get(e)||n.Eu.has(r)||(N(Cc,"New document in limbo: "+e),n.Eu.add(r),Sc(n))}function Sc(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const t=n.Eu.values().next().value;n.Eu.delete(t);const e=new U(nt.fromString(t)),r=n.fu.next();n.Au.set(r,new xC(e)),n.du=n.du.insert(e,r),Zp(n.remoteStore,new Fe(he($i(e.path)),r,"TargetPurposeLimboResolution",Ui.ce))}}async function gs(n,t,e){const r=$(n),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach(((c,u)=>{o.push(r.pu(u,t,e).then((h=>{var f;if((h||e)&&r.isPrimaryClient){const p=h?!h.fromCache:(f=e==null?void 0:e.targetChanges.get(u.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(h){s.push(h);const p=mc.As(u.targetId,h);i.push(p)}})))})),await Promise.all(o),r.Pu.H_(s),await(async function(u,h){const f=$(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>R.forEach(h,(m=>R.forEach(m.Es,(v=>f.persistence.referenceDelegate.addReference(p,m.targetId,v))).next((()=>R.forEach(m.ds,(v=>f.persistence.referenceDelegate.removeReference(p,m.targetId,v)))))))))}catch(p){if(!ir(p))throw p;N(_c,"Failed to update sequence numbers: "+p)}for(const p of h){const m=p.targetId;if(!p.fromCache){const v=f.Ms.get(m),S=v.snapshotVersion,k=v.withLastLimboFreeSnapshotVersion(S);f.Ms=f.Ms.insert(m,k)}}})(r.localStore,i))}async function KC(n,t){const e=$(n);if(!e.currentUser.isEqual(t)){N(Cc,"User change. New user:",t.toKey());const r=await Qp(e.localStore,t);e.currentUser=t,(function(i,o){i.mu.forEach((c=>{c.forEach((u=>{u.reject(new O(P.CANCELLED,o))}))})),i.mu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await gs(e,r.Ls)}}function QC(n,t){const e=$(n),r=e.Au.get(t);if(r&&r.hu)return J().add(r.key);{let s=J();const i=e.Iu.get(t);if(!i)return s;for(const o of i){const c=e.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}function gg(n){const t=$(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=hg.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=QC.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=zC.bind(null,t),t.Pu.H_=NC.bind(null,t.eventManager),t.Pu.yu=OC.bind(null,t.eventManager),t}function XC(n){const t=$(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=WC.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=JC.bind(null,t),t}class wi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Gi(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return eC(this.persistence,new Yb,t.initialUser,this.serializer)}Cu(t){return new Kp(gc.mi,this.serializer)}Du(t){return new cC}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}wi.provider={build:()=>new wi};class YC extends wi{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){Q(this.persistence.referenceDelegate instanceof Ti,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new xb(r,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?$t.withCacheSize(this.cacheSizeBytes):$t.DEFAULT;return new Kp((r=>Ti.mi(r,e)),this.serializer)}}class Ea{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>mh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=KC.bind(null,this.syncEngine),await kC(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new DC})()}createDatastore(t){const e=Gi(t.databaseInfo.databaseId),r=(function(i){return new fC(i)})(t.databaseInfo);return(function(i,o,c,u){return new _C(i,o,c,u)})(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return(function(r,s,i,o,c){return new TC(r,s,i,o,c)})(this.localStore,this.datastore,t.asyncQueue,(e=>mh(this.syncEngine,e,0)),(function(){return lh.v()?new lh:new uC})())}createSyncEngine(t,e){return(function(s,i,o,c,u,h,f){const p=new FC(s,i,o,c,u,h);return f&&(p.gu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await(async function(s){const i=$(s);N(_n,"RemoteStore shutting down."),i.Ea.add(5),await ps(i),i.Aa.shutdown(),i.Ra.set("Unknown")})(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}Ea.provider={build:()=>new Ea};/**
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
 */class mg{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):be("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
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
 */class ZC{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new O(P.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const e=await(async function(s,i){const o=$(s),c={documents:i.map((p=>yi(o.serializer,p)))},u=await o.Ho("BatchGetDocuments",o.serializer.databaseId,nt.emptyPath(),c,i.length),h=new Map;u.forEach((p=>{const m=Eb(o.serializer,p);h.set(m.key.toString(),m)}));const f=[];return i.forEach((p=>{const m=h.get(p.toString());Q(!!m,55234,{key:p}),f.push(m)})),f})(this.datastore,t);return e.forEach((r=>this.recordVersion(r))),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(t.toString())}delete(t){this.write(new lc(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach((e=>{t.delete(e.key.toString())})),t.forEach(((e,r)=>{const s=U.fromPath(r);this.mutations.push(new Mp(s,this.precondition(s)))})),await(async function(r,s){const i=$(r),o={writes:s.map((c=>qp(i.serializer,c)))};await i.Go("Commit",i.serializer.databaseId,nt.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw F(50498,{Gu:t.constructor.name});e=B.min()}const r=this.readVersions.get(t.key.toString());if(r){if(!e.isEqual(r))throw new O(P.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?e.isEqual(B.min())?Ht.exists(!1):Ht.updateTime(e):Ht.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(B.min()))throw new O(P.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Ht.updateTime(e)}return Ht.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}/**
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
 */class tS{constructor(t,e,r,s,i){this.asyncQueue=t,this.datastore=e,this.options=r,this.updateFunction=s,this.deferred=i,this.zu=r.maxAttempts,this.M_=new yc(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_((async()=>{const t=new ZC(this.datastore),e=this.Hu(t);e&&e.then((r=>{this.asyncQueue.enqueueAndForget((()=>t.commit().then((()=>{this.deferred.resolve(r)})).catch((s=>{this.Yu(s)}))))})).catch((r=>{this.Yu(r)}))}))}Hu(t){try{const e=this.updateFunction(t);return!hs(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Yu(t){this.zu>0&&this.Zu(t)?(this.zu-=1,this.asyncQueue.enqueueAndForget((()=>(this.Ju(),Promise.resolve())))):this.deferred.reject(t)}Zu(t){if((t==null?void 0:t.name)==="FirebaseError"){const e=t.code;return e==="aborted"||e==="failed-precondition"||e==="already-exists"||!Lp(e)}return!1}}/**
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
 */const Ye="FirestoreClient";class eS{constructor(t,e,r,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=s,this.user=Dt.UNAUTHENTICATED,this.clientId=nc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{N(Ye,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(N(Ye,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Ee;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Ac(e,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function qo(n,t){n.asyncQueue.verifyOperationInProgress(),N(Ye,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Qp(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=t}async function yh(n,t){n.asyncQueue.verifyOperationInProgress();const e=await nS(n);N(Ye,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener((r=>dh(t.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>dh(t.remoteStore,s))),n._onlineComponents=t}async function nS(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N(Ye,"Using user provided OfflineComponentProvider");try{await qo(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;Hn("Error using user provided cache. Falling back to memory cache: "+e),await qo(n,new wi)}}else N(Ye,"Using default OfflineComponentProvider"),await qo(n,new YC(void 0));return n._offlineComponents}async function Rc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N(Ye,"Using user provided OnlineComponentProvider"),await yh(n,n._uninitializedComponentsProvider._online)):(N(Ye,"Using default OnlineComponentProvider"),await yh(n,new Ea))),n._onlineComponents}function rS(n){return Rc(n).then((t=>t.syncEngine))}function sS(n){return Rc(n).then((t=>t.datastore))}async function wa(n){const t=await Rc(n),e=t.eventManager;return e.onListen=UC.bind(null,t.syncEngine),e.onUnlisten=$C.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=BC.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=HC.bind(null,t.syncEngine),e}function iS(n,t,e={}){const r=new Ee;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,h){const f=new mg({next:m=>{f.Nu(),o.enqueueAndForget((()=>og(i,p)));const v=m.docs.has(c);!v&&m.fromCache?h.reject(new O(P.UNAVAILABLE,"Failed to get document because the client is offline.")):v&&m.fromCache&&u&&u.source==="server"?h.reject(new O(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(m)},error:m=>h.reject(m)}),p=new ag($i(c.path),f,{includeMetadataChanges:!0,qa:!0});return ig(i,p)})(await wa(n),n.asyncQueue,t,e,r))),r.promise}/**
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
 */function _g(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
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
 */const Th=new Map;/**
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
 */const yg="firestore.googleapis.com",Eh=!0;class wh{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new O(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=yg,this.ssl=Eh}else this.host=t.host,this.ssl=t.ssl??Eh;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Gp;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Mb)throw new O(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}TA("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=_g(t.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Pc{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new wh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new O(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new O(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new wh(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new cA;switch(r.type){case"firstParty":return new dA(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new O(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=Th.get(e);r&&(N("ComponentProvider","Removing Datastore"),Th.delete(e),r.terminate())})(this),Promise.resolve()}}function oS(n,t,e,r={}){var h;n=we(n,Pc);const s=Zn(t),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},c=`${t}:${e}`;s&&(lf(`https://${c}`),hf("Firestore",!0)),i.host!==yg&&i.host!==c&&Hn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:r};if(!fn(u,o)&&(n._setSettings(u),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=Dt.MOCK_USER;else{f=NE(r.mockUserToken,(h=n._app)==null?void 0:h.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new O(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Dt(m)}n._authCredentials=new uA(new ip(f,p))}}/**
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
 */class Xi{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Xi(this.firestore,t,this._query)}}class pt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Qr(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new pt(this.firestore,t,this._key)}toJSON(){return{type:pt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(ls(e,pt._jsonSchema))return new pt(t,r||null,new U(nt.fromString(e.referencePath)))}}pt._jsonSchemaVersion="firestore/documentReference/1.0",pt._jsonSchema={type:ft("string",pt._jsonSchemaVersion),referencePath:ft("string")};class Qr extends Xi{constructor(t,e,r){super(t,e,$i(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new pt(this.firestore,null,new U(t))}withConverter(t){return new Qr(this.firestore,t,this._path)}}function ms(n,t,...e){if(n=At(n),arguments.length===1&&(t=nc.newId()),yA("doc","path",t),n instanceof Pc){const r=nt.fromString(t,...e);return Ml(r),new pt(n,null,new U(r))}{if(!(n instanceof pt||n instanceof Qr))throw new O(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(nt.fromString(t,...e));return Ml(r),new pt(n.firestore,n instanceof Qr?n.converter:null,new U(r))}}/**
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
 */const Ih="AsyncQueue";class vh{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new yc(this,"async_queue_retry"),this._c=()=>{const r=Ho();r&&N(Ih,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=t;const e=Ho();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=Ho();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new Ee;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Xu.push(t),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!ir(t))throw t;N(Ih,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((r=>{throw this.nc=r,this.rc=!1,be("INTERNAL UNHANDLED ERROR: ",Ah(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=e,e}enqueueAfterDelay(t,e,r){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=vc.createAndSchedule(this,t,e,r,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&F(47125,{Pc:Ah(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then((()=>{this.tc.sort(((e,r)=>e.targetTimeMs-r.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}dc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function Ah(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function bh(n){return(function(e,r){if(typeof e!="object"||e===null)return!1;const s=e;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}class Kn extends Pc{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new vh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new vh(t),this._firestoreClient=void 0,await t}}}function aS(n,t){const e=typeof n=="object"?n:gf(),r=typeof n=="string"?n:di,s=Ha(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=VE("firestore");i&&oS(s,...i)}return s}function Yi(n){if(n._terminated)throw new O(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||cS(n),n._firestoreClient}function cS(n){var r,s,i;const t=n._freezeSettings(),e=(function(c,u,h,f){return new kA(c,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,_g(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)})(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,t);n._componentsProvider||(s=t.localCache)!=null&&s._offlineComponentProvider&&((i=t.localCache)!=null&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new eS(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&(function(c){const u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}})(n._componentsProvider))}/**
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
 */class Wt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Wt(Pt.fromBase64String(t))}catch(e){throw new O(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Wt(Pt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Wt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(ls(t,Wt._jsonSchema))return Wt.fromBase64String(t.bytes)}}Wt._jsonSchemaVersion="firestore/bytes/1.0",Wt._jsonSchema={type:ft("string",Wt._jsonSchemaVersion),bytes:ft("string")};/**
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
 */class Zi{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new O(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new St(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class to{constructor(t){this._methodName=t}}/**
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
 */class de{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new O(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new O(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return W(this._lat,t._lat)||W(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:de._jsonSchemaVersion}}static fromJSON(t){if(ls(t,de._jsonSchema))return new de(t.latitude,t.longitude)}}de._jsonSchemaVersion="firestore/geoPoint/1.0",de._jsonSchema={type:ft("string",de._jsonSchemaVersion),latitude:ft("number"),longitude:ft("number")};/**
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
 */class fe{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,t._values)}toJSON(){return{type:fe._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(ls(t,fe._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new fe(t.vectorValues);throw new O(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}fe._jsonSchemaVersion="firestore/vectorValue/1.0",fe._jsonSchema={type:ft("string",fe._jsonSchemaVersion),vectorValues:ft("object")};/**
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
 */const uS=/^__.*__$/;class lS{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new tn(t,this.data,this.fieldMask,e,this.fieldTransforms):new ds(t,this.data,e,this.fieldTransforms)}}class Tg{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new tn(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Eg(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F(40011,{Ac:n})}}class kc{constructor(t,e,r,s,i,o){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new kc({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.Vc({path:e,fc:!1});return r.gc(t),r}yc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.Vc({path:e,fc:!1});return r.Rc(),r}wc(t){return this.Vc({path:void 0,fc:!0})}Sc(t){return Ii(t,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}Rc(){if(this.path)for(let t=0;t<this.path.length;t++)this.gc(this.path.get(t))}gc(t){if(t.length===0)throw this.Sc("Document fields must not be empty");if(Eg(this.Ac)&&uS.test(t))throw this.Sc('Document fields cannot begin and end with "__"')}}class hS{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Gi(t)}Cc(t,e,r,s=!1){return new kc({Ac:t,methodName:e,Dc:r,path:St.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function wg(n){const t=n._freezeSettings(),e=Gi(n._databaseId);return new hS(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Ig(n,t,e,r,s,i={}){const o=n.Cc(i.merge||i.mergeFields?2:0,t,e,s);Dc("Data must be an object, but it was:",o,r);const c=vg(r,o);let u,h;if(i.merge)u=new Gt(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const m=Ia(t,p,e);if(!o.contains(m))throw new O(P.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);bg(f,m)||f.push(m)}u=new Gt(f),h=o.fieldTransforms.filter((p=>u.covers(p.field)))}else u=null,h=o.fieldTransforms;return new lS(new Ut(c),u,h)}class eo extends to{_toFieldTransform(t){if(t.Ac!==2)throw t.Ac===1?t.Sc(`${this._methodName}() can only appear at the top level of your update data`):t.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof eo}}class Vc extends to{_toFieldTransform(t){return new rb(t.path,new Jr)}isEqual(t){return t instanceof Vc}}function dS(n,t,e,r){const s=n.Cc(1,t,e);Dc("Data must be an object, but it was:",s,r);const i=[],o=Ut.empty();Ze(r,((u,h)=>{const f=Nc(t,u,e);h=At(h);const p=s.yc(f);if(h instanceof eo)i.push(f);else{const m=no(h,p);m!=null&&(i.push(f),o.set(f,m))}}));const c=new Gt(i);return new Tg(o,c,s.fieldTransforms)}function fS(n,t,e,r,s,i){const o=n.Cc(1,t,e),c=[Ia(t,r,e)],u=[s];if(i.length%2!=0)throw new O(P.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<i.length;m+=2)c.push(Ia(t,i[m])),u.push(i[m+1]);const h=[],f=Ut.empty();for(let m=c.length-1;m>=0;--m)if(!bg(h,c[m])){const v=c[m];let S=u[m];S=At(S);const k=o.yc(v);if(S instanceof eo)h.push(v);else{const V=no(S,k);V!=null&&(h.push(v),f.set(v,V))}}const p=new Gt(h);return new Tg(f,p,o.fieldTransforms)}function no(n,t){if(Ag(n=At(n)))return Dc("Unsupported field value:",t,n),vg(n,t);if(n instanceof to)return(function(r,s){if(!Eg(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.fc&&t.Ac!==4)throw t.Sc("Nested arrays are not supported");return(function(r,s){const i=[];let o=0;for(const c of r){let u=no(c,s.wc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}})(n,t)}return(function(r,s){if((r=At(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return tb(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=rt.fromDate(r);return{timestampValue:_i(s.serializer,i)}}if(r instanceof rt){const i=new rt(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:_i(s.serializer,i)}}if(r instanceof de)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Wt)return{bytesValue:Bp(s.serializer,r._byteString)};if(r instanceof pt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Sc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:fc(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof fe)return(function(o,c){return{mapValue:{fields:{[pp]:{stringValue:gp},[fi]:{arrayValue:{values:o.toArray().map((h=>{if(typeof h!="number")throw c.Sc("VectorValues must only contain numeric values.");return uc(c.serializer,h)}))}}}}}})(r,s);throw s.Sc(`Unsupported field value: ${rc(r)}`)})(n,t)}function vg(n,t){const e={};return cp(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Ze(n,((r,s)=>{const i=no(s,t.mc(r));i!=null&&(e[r]=i)})),{mapValue:{fields:e}}}function Ag(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof rt||n instanceof de||n instanceof Wt||n instanceof pt||n instanceof to||n instanceof fe)}function Dc(n,t,e){if(!Ag(e)||!op(e)){const r=rc(e);throw r==="an object"?t.Sc(n+" a custom object"):t.Sc(n+" "+r)}}function Ia(n,t,e){if((t=At(t))instanceof Zi)return t._internalPath;if(typeof t=="string")return Nc(n,t);throw Ii("Field path arguments must be of type string or ",n,!1,void 0,e)}const pS=new RegExp("[~\\*/\\[\\]]");function Nc(n,t,e){if(t.search(pS)>=0)throw Ii(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Zi(...t.split("."))._internalPath}catch{throw Ii(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Ii(n,t,e,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new O(P.INVALID_ARGUMENT,c+n+u)}function bg(n,t){return n.some((e=>e.isEqual(t)))}/**
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
 */class vi{constructor(t,e,r,s,i){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new pt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new gS(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Cg("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class gS extends vi{data(){return super.data()}}function Cg(n,t){return typeof t=="string"?Nc(n,t):t instanceof Zi?t._internalPath:t._delegate._internalPath}/**
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
 */function mS(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new O(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Sg{convertValue(t,e="none"){switch(Qe(t)){case 0:return null;case 1:return t.booleanValue;case 2:return ut(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Ke(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw F(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return Ze(t,((s,i)=>{r[s]=this.convertValue(i,e)})),r}convertVectorValue(t){var r,s,i;const e=(i=(s=(r=t.fields)==null?void 0:r[fi].arrayValue)==null?void 0:s.values)==null?void 0:i.map((o=>ut(o.doubleValue)));return new fe(e)}convertGeoPoint(t){return new de(ut(t.latitude),ut(t.longitude))}convertArray(t,e){return(t.values||[]).map((r=>this.convertValue(r,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Bi(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(qr(t));default:return null}}convertTimestamp(t){const e=Ge(t);return new rt(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=nt.fromString(t);Q(Jp(r),9688,{name:t});const s=new zr(r.get(1),r.get(3)),i=new U(r.popFirst(5));return s.isEqual(e)||be(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
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
 */function Rg(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}class _S extends Sg{constructor(t){super(),this.firestore=t}convertBytes(t){return new Wt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new pt(this.firestore,null,e)}}class Vn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class qe extends vi{constructor(t,e,r,s,i,o){super(t,e,r,s,o),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Ks(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Cg("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new O(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=qe._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}qe._jsonSchemaVersion="firestore/documentSnapshot/1.0",qe._jsonSchema={type:ft("string",qe._jsonSchemaVersion),bundleSource:ft("string","DocumentSnapshot"),bundleName:ft("string"),bundle:ft("string")};class Ks extends qe{data(t={}){return super.data(t)}}class Fn{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Vn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((r=>{t.call(e,new Ks(this._firestore,this._userDataWriter,r.key,r,new Vn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new O(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const u=new Ks(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Vn(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new Ks(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Vn(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:yS(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new O(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Fn._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=nc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(e.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function yS(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F(61501,{type:n})}}/**
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
 */function Oc(n){n=we(n,pt);const t=we(n.firestore,Kn);return iS(Yi(t),n._key).then((e=>Pg(t,n,e)))}Fn._jsonSchemaVersion="firestore/querySnapshot/1.0",Fn._jsonSchema={type:ft("string",Fn._jsonSchemaVersion),bundleSource:ft("string","QuerySnapshot"),bundleName:ft("string"),bundle:ft("string")};class Mc extends Sg{constructor(t){super(),this.firestore=t}convertBytes(t){return new Wt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new pt(this.firestore,null,e)}}function _s(n,t,e){n=we(n,pt);const r=we(n.firestore,Kn),s=Rg(n.converter,t,e);return TS(r,[Ig(wg(r),"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,Ht.none())])}function ro(n,...t){var u,h,f;n=At(n);let e={includeMetadataChanges:!1,source:"default"},r=0;typeof t[r]!="object"||bh(t[r])||(e=t[r++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(bh(t[r])){const p=t[r];t[r]=(u=p.next)==null?void 0:u.bind(p),t[r+1]=(h=p.error)==null?void 0:h.bind(p),t[r+2]=(f=p.complete)==null?void 0:f.bind(p)}let i,o,c;if(n instanceof pt)o=we(n.firestore,Kn),c=$i(n._key.path),i={next:p=>{t[r]&&t[r](Pg(o,n,p))},error:t[r+1],complete:t[r+2]};else{const p=we(n,Xi);o=we(p.firestore,Kn),c=p._query;const m=new Mc(o);i={next:v=>{t[r]&&t[r](new Fn(o,m,p,v))},error:t[r+1],complete:t[r+2]},mS(n._query)}return(function(m,v,S,k){const V=new mg(k),L=new ag(v,V,S);return m.asyncQueue.enqueueAndForget((async()=>ig(await wa(m),L))),()=>{V.Nu(),m.asyncQueue.enqueueAndForget((async()=>og(await wa(m),L)))}})(Yi(o),c,s,i)}function TS(n,t){return(function(r,s){const i=new Ee;return r.asyncQueue.enqueueAndForget((async()=>qC(await rS(r),s,i))),i.promise})(Yi(n),t)}function Pg(n,t,e){const r=e.docs.get(t._key),s=new Mc(n);return new qe(n,s,t._key,r,new Vn(e.hasPendingWrites,e.fromCache),t.converter)}/**
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
 */const ES={maxAttempts:5};function Rr(n,t){if((n=At(n)).firestore!==t)throw new O(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
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
 */class wS{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=wg(t)}get(t){const e=Rr(t,this._firestore),r=new _S(this._firestore);return this._transaction.lookup([e._key]).then((s=>{if(!s||s.length!==1)return F(24041);const i=s[0];if(i.isFoundDocument())return new vi(this._firestore,r,i.key,i,e.converter);if(i.isNoDocument())return new vi(this._firestore,r,e._key,null,e.converter);throw F(18433,{doc:i})}))}set(t,e,r){const s=Rr(t,this._firestore),i=Rg(s.converter,e,r),o=Ig(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,o),this}update(t,e,r,...s){const i=Rr(t,this._firestore);let o;return o=typeof(e=At(e))=="string"||e instanceof Zi?fS(this._dataReader,"Transaction.update",i._key,e,r,s):dS(this._dataReader,"Transaction.update",i._key,e),this._transaction.update(i._key,o),this}delete(t){const e=Rr(t,this._firestore);return this._transaction.delete(e._key),this}}/**
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
 */class IS extends wS{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=Rr(t,this._firestore),r=new Mc(this._firestore);return super.get(t).then((s=>new qe(this._firestore,r,e._key,s._document,new Vn(!1,!1),e.converter)))}}function vS(n,t,e){n=we(n,Kn);const r={...ES,...e};return(function(i){if(i.maxAttempts<1)throw new O(P.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r),(function(i,o,c){const u=new Ee;return i.asyncQueue.enqueueAndForget((async()=>{const h=await sS(i);new tS(i.asyncQueue,h,c,o,u).ju()})),u.promise})(Yi(n),(s=>t(new IS(n,s))),r)}function ar(){return new Vc("serverTimestamp")}(function(t,e=!0){(function(s){rr=s})(tr),jn(new pn("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new Kn(new lA(r.getProvider("auth-internal")),new fA(o,r.getProvider("app-check-internal")),(function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new O(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new zr(h.options.projectId,f)})(o,s),o);return i={useFetchStreams:e,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),je(Vl,Dl,t),je(Vl,Dl,"esm2020")})();const zo=(n="")=>n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),AS={apiKey:"AIzaSyC8oBLWyTpzWLLjWdZxo8YgQ1IcYICxdcU",authDomain:"auth.3dlocalprint.com",projectId:"threedlocalprint",storageBucket:"threedlocalprint.firebasestorage.app",messagingSenderId:"770972495364",appId:"1:770972495364:web:b1015eaaf0de32d9b84f51"},kg=pf(AS),Qn=oA(kg),Ch=new _e,cr=aS(kg),Ai=ms(cr,"filament_inventory","list"),Lc=ms(cr,"filament_types","list"),Vg=ms(cr,"manufacturers","list"),xc=ms(cr,"admins","list"),Dg=ms(cr,"ledger","entries"),Sh=(n="")=>n.trim().toLowerCase(),Ng=n=>(Array.isArray(n)?n:[]).map(t=>{if(typeof t=="string")return{label:t.trim(),iconUrl:""};if(t&&typeof t=="object"){const e=String(t.label||"").trim(),r=String(t.iconUrl||"").trim();return{label:e,iconUrl:r}}return null}).filter(t=>!!(t!=null&&t.label)),bS=()=>typeof navigator<"u"&&/iPad|iPhone|iPod/i.test(navigator.userAgent||""),CS=async()=>{const n=[{key:"indexedDB",value:Wf},{key:"local",value:Bf},{key:"session",value:Xa}];let t=null;for(const e of n)try{return await WI(Qn,e.value),{persistence:e.key,error:null}}catch(r){t=r,console.warn(`Failed to set ${e.key} persistence`,r)}return{persistence:"none",error:t}},SS=async()=>{let n=null,t=null;try{t=await Iv(Qn)}catch(r){n=r,console.error("Firebase redirect sign-in failed",r)}const e=await CS();return{redirectError:n,redirectResult:t,persistence:e}},RS=async()=>{try{return await pv(Qn,Ch)}catch(n){if(!bS())throw n;return console.warn("Popup sign-in failed on iOS, falling back to redirect",n),Ev(Qn,Ch)}},PS=()=>QI(Qn),kS=n=>KI(Qn,n),hR=async()=>{const n=await Oc(Ai);if(!n.exists())return null;const t=n.data();return Array.isArray(t.items)?t.items:[]},dR=n=>_s(Ai,{items:n,updatedAt:ar()},{merge:!0}),fR=async()=>{const n=await Oc(Lc);if(!n.exists())return null;const t=n.data();return Array.isArray(t.items)?t.items:[]},pR=n=>ro(Lc,t=>{if(!t.exists()){n(null);return}const e=t.data();n(Array.isArray(e.items)?e.items:[])},t=>{console.error("Failed to subscribe to filament types",t),n(null)}),gR=n=>_s(Lc,{items:n,updatedAt:ar()},{merge:!0}),mR=async({location:n="",adjustments:t={}}={})=>{const e=zo(n),r=Object.entries(t).filter(([,s])=>Number(s));if(!(!e||!r.length))return vS(cr,async s=>{const i=await s.get(Ai);if(!i.exists())throw new Error("Filament inventory list not found.");const o=i.data(),c=Array.isArray(o.items)?o.items:[],u=c.map(f=>{if(zo(f.location||"")!==e)return f;const p=f.filament_type_id||"";if(!p||!(p in t))return f;const m=Number(t[p])||0;if(!m)return f;const v=Number(f.spool_inventory)||0,S=Math.max(0,v+m);return{...f,spool_inventory:S}}),h=new Set(c.filter(f=>zo(f.location||"")===e).map(f=>f.filament_type_id).filter(Boolean));r.forEach(([f,p])=>{const m=Number(p)||0;m<=0||h.has(f)||u.push({filament_type_id:f,location:n,spool_inventory:m})}),s.set(Ai,{items:u,updatedAt:ar()},{merge:!0})})},_R=n=>ro(Vg,t=>{if(!t.exists()){n(null);return}const e=t.data();n(Ng(e.items))},t=>{console.error("Failed to subscribe to 🏭 manufacturers",t),n(null)}),yR=n=>ro(xc,t=>{if(!t.exists()){n(null);return}const e=t.data();n(Array.isArray(e.items)?e.items:[])},t=>{console.error("Failed to subscribe to admins",t),n(null)}),TR=n=>_s(Vg,{items:Ng(n),updatedAt:ar()},{merge:!0}),VS=async()=>{const n=await Oc(xc);if(!n.exists())return[];const t=n.data();return Array.isArray(t.items)?t.items:[]},DS=async(n="")=>(await VS()).map(Sh).includes(Sh(n)),ER=n=>_s(xc,{items:n,updatedAt:ar()},{merge:!0}),NS=(n=[])=>(Array.isArray(n)?n:[]).map(t=>{const e=Number(t.amount);if(!Number.isFinite(e)||e===0)throw new Error("Ledger amount must be a non-zero number.");const r=String(t.title||"").trim();if(!r)throw new Error("Ledger title is required.");const s=String(t.applicableDate||"");if(!/^\d{4}-\d{2}-\d{2}$/.test(s))throw new Error("Ledger applicable date must be a valid YYYY-MM-DD value.");const i=String(t.id||"").trim();if(!i)throw new Error("Ledger id is required.");return{id:i,amount:e,title:r,billingCategory:String(t.billingCategory||"").trim()||"",applicableDate:s,notes:String(t.notes||"").trim(),status:["pending","posted","reconciled"].includes(t.status)?t.status:"posted",createdAt:Number(t.createdAt)||Date.now(),updatedAt:Number(t.updatedAt)||Date.now()}}),wR=n=>_s(Dg,{items:NS(n),updatedAt:ar()},{merge:!0}),IR=n=>ro(Dg,t=>{if(!t.exists()){n([]);return}const e=t.data();n(Array.isArray(e.items)?e.items:[])},t=>{console.error("Failed to subscribe to ledger entries",t),n([])}),Og=Z((n,t,e,r,s)=>(Og.updates(i=>{[n,t,e,r,s]=i}),n==="loading"?Do.class`panel auth-panel`(No("Checking login...")):n==="denied"?Do.class`panel auth-panel`(tl("Access denied"),No.class`auth-warning`(()=>t||"This account"," is not authorized."),el.class`auth-actions`(Zu({type:"button",class:"add-button",onClick:s},"Sign out"))):Do.class`panel auth-panel`(tl("Sign in"),No("Use Google to access the filament inventory."),el.class`auth-actions`(Zu({type:"button",class:"add-button",onClick:r},"Sign in with Google"))))),OS=n=>{const t=n==null?void 0:n.current;if(!t)return null;const e=t.cloneNode(!1);return t.replaceWith(e),n.current=e,e},MS=({rootRef:n,status:t,userEmail:e,adminEmail:r,onSignIn:s,onSignOut:i,setAppMounted:o})=>{const c=OS(n);if(!c)return;o&&o(!1),c.replaceChildren();const u=Z(()=>Og(t,e,r,s,i));jT(u,c)},Rh="toast-root",LS=6e3,xS=()=>{let n=document.getElementById(Rh);return n||(n=document.createElement("div"),n.id=Rh,n.className="toast-root",document.body.appendChild(n),n)},FS=(n,t)=>{const e=document.createElement("div");return e.className=`toast toast-${t}`,e.setAttribute("role","status"),e.textContent=n,e},Wo=(n,t={})=>{if(!n)return;const{tone:e="info",duration:r=LS}=t,s=xS(),i=FS(n,e);s.appendChild(i);const o=window.setTimeout(()=>{i.remove()},r);i.addEventListener("click",()=>{window.clearTimeout(o),i.remove()},{once:!0})},vR={info:(n,t)=>Wo(n,{...t,tone:"info"}),success:(n,t)=>Wo(n,{...t,tone:"success"}),error:(n,t)=>Wo(n,{...t,tone:"error"})},US=async({user:n,mountSso:t,toast:e,onDenied:r,onPermissionsError:s}={})=>{let i=!1;try{i=await DS((n==null?void 0:n.email)||"")}catch(o){return console.error("Failed to load admin list",o),typeof s=="function"&&s(o),e!=null&&e.error&&e.error("Unable to verify access. Check Firestore rules."),typeof t=="function"&&t("denied",(n==null?void 0:n.email)||"","auth:permissions"),!1}return i?!0:(typeof r=="function"&&r(),e!=null&&e.error&&e.error(`Signed in as ${(n==null?void 0:n.email)||"unknown"} but not authorized.`),typeof t=="function"&&t("denied",(n==null?void 0:n.email)||"","auth:denied"),!1)},BS=async({user:n,mountSso:t,toast:e,setCurrentUser:r,onSignedOut:s,onDenied:i,onAuthorized:o,reason:c=""}={})=>n?(typeof r=="function"&&r({email:n.email||"",photoURL:n.photoURL||""}),await US({user:n,mountSso:t,toast:e,onDenied:i,onPermissionsError:i})?(typeof o=="function"&&o(n,c),!0):!1):(typeof r=="function"&&r(null),typeof s=="function"&&s(),typeof t=="function"&&t("login","","auth:logged-out"),!1),jS=({onUser:n,toast:t}={})=>{if(typeof n!="function")throw new Error("startAuthFlow requires an onUser callback.");SS().then(({redirectError:e,redirectResult:r,persistence:s})=>{var i,o;e&&((i=t==null?void 0:t.error)==null||i.call(t,"Sign-in failed after redirect. Try again.")),s!=null&&s.error&&((o=t==null?void 0:t.error)==null||o.call(t,"Safari blocked login storage. Check cookie settings.")),r!=null&&r.user&&n(r.user,"redirectResult")}).catch(e=>{var r;console.error("Failed to prepare auth",e),(r=t==null?void 0:t.error)==null||r.call(t,"Sign-in setup failed. Try again.")}),kS(e=>{n(e,"onAuthChanged")})},AR=({rootRef:n,toast:t,setAppMounted:e,setCurrentUser:r,onAuthorized:s,onSignedOut:i,onDenied:o,onAfterSsoMount:c,initialStatus:u="loading",initialReason:h="initial"})=>{const f={isAuthorized:!1},p=async()=>PS().catch(S=>{var k;console.error("Firebase sign-out failed",S),(k=t==null?void 0:t.error)==null||k.call(t,"Sign out failed. Try again.")}),m=(S,k="",V="")=>{n!=null&&n.current&&(MS({rootRef:n,status:S,userEmail:k,adminEmail:"",onSignIn:()=>RS().catch(L=>{var x;console.error("Firebase sign-in failed",L),(x=t==null?void 0:t.error)==null||x.call(t,"Sign in failed. Try again.")}),onSignOut:p,setAppMounted:e}),typeof c=="function"&&c())};return m(u,"",h),jS({onUser:async(S,k="")=>{f.isAuthorized=!1,await BS({user:S,mountSso:m,toast:t,setCurrentUser:r,onSignedOut:i,onDenied:o,onAuthorized:(L,x)=>{f.isAuthorized=!0,s==null||s({user:L,reason:x,authState:f,handleSignOut:p,mountSso:m})},reason:k})},toast:t}),{authState:f,handleSignOut:p,mountSso:m}};export{Xy as $,oR as A,M as B,Md as C,uT as D,YS as E,dT as F,XS as G,Cd as H,Nm as I,pR as J,_R as K,gR as L,TR as M,ZS as N,rR as O,tR as P,nR as Q,sR as R,eR as S,JS as T,IR as U,wR as V,G as W,VT as X,DT as Y,kT as Z,Ot as _,qS as a,Qs as a0,Xt as a1,yR as a2,ER as a3,mR as a4,zS as b,Zu as c,el as d,iR as e,uR as f,GS as g,QS as h,WS as i,Do as j,tl as k,aR as l,KS as m,HS as n,rT as o,No as p,zo as q,dR as r,cR as s,Z as t,fR as u,hR as v,AR as w,vR as x,OS as y,jT as z};
