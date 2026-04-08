var Qg=Object.defineProperty;var Xg=(n,t,e)=>t in n?Qg(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var Jt=(n,t,e)=>Xg(n,typeof t!="symbol"?t+"":t,e);function Hr(n){return n.renderCount=n.renderCount||0,n.varCounter=0,n.state={newer:{state:[],states:[]}},n.global={blocked:[]}}function js(){return it.stateConfig.support}function gi(n){return Pt(n.context),it.stateConfig.support=n}const Ot=function(){};let Kt=[];const le=[];let Xt=[],mi=[],sn=[],pa=!1;const De=[],Yg=400;let In=0;const xo=new Map,st={locks:0};function Zg(n,t){const e=xo.get(n);if(e!==void 0&&e>=In){De[e]=t;return}const r=De.length;De.push(t),xo.set(n,r)}function tm(n,t){t.textContent=n}function Ht(){st.locks>0||em()}function em(){++st.locks,vh(),--st.locks,Ih(),nm()}function Ih(){sm();const n=sn;sn=[];for(const t of n)t[0](...t[1])}function nm(){pa||!De.length||rm()}function rm(){pa=!0,requestAnimationFrame(Ah)}function Ah(){++st.locks;let n=0;for(;In<De.length&&n<Yg;){const t=De[In];++In,t[0](...t[1]),++n}if(vh(),Ih(),--st.locks,In<De.length){requestAnimationFrame(Ah);return}De.length=0,In=0,xo.clear(),pa=!1}function vh(){const n=le.length;for(let t=0;t<n;++t){const e=le[t];e[0](...e[1])}if(n===le.length)le.length=0;else{let t=0;for(let e=n;e<le.length;++e)le[t]=le[e],++t;le.length=t}for(const t of Xt)t[0](...t[1]);for(const t of mi)t[0](...t[1]);for(const t of Kt)t[0](...t[1])}function sm(){Kt=[],Xt=[],mi=[]}function kr(n,t){le.push([im,[n,t]])}function im(n,t){n||console.debug("no element by",{_caller:t,element:n});const e=n.parentNode;e||console.debug("no parentNode by",{_caller:t,element:n}),e.removeChild(n)}function ga(n,t,e){n.parentNode.insertBefore(t,n)}function ma(n,t){n.appendChild(t)}const Vu=typeof document=="object"&&document.createElement("div");function om(n){return Vu.innerHTML=n,document.createTextNode(Vu.innerHTML)}function bh(n,t,e=Ot,r){const s=om(t);ga(n,s),e(s)}const zr="";var Du;(function(n){n.string="string",n.number="number",n.boolean="boolean",n.undefined="undefined"})(Du||(Du={}));var X;(function(n){n.function="function",n.date="date",n.unknown="unknown",n.object="object"})(X||(X={}));const am=Date.now(),Q={tag:"html",dom:"dom",templater:"templater",tagComponent:"tagComponent",tagArray:"tagArray",host:"host",subscribe:"subscribe",signal:"signal",stateRender:"stateRender",version:am};function Ch(n){if(!n)return!1;switch(n.tagJsType){case Q.dom:case Q.tag:case Q.templater:return!0}return!1}function Wr(n){const t=n==null?void 0:n.tagJsType;return t===Q.tagComponent||t===Q.stateRender}function cm(n){return _i(n)&&typeof n.subscribe===X.function}function zn(n){return n&&on(n.then)}function on(n){return typeof n===X.function}function _i(n){return typeof n===X.object&&n!==null}function jt(n){return Array.isArray(n)}function _a(n){const t=n.state;if(t&&t.newest&&t.newest)return t.newest;if(n.parentContext)return _a(n.parentContext)}function yi(n){let t=n;for(;t.ownerSupport&&!Wr(t.templater);)t=t.ownerSupport;const r=t.context.state;return r&&r.newest||t}function um(...n){return n}function Sh(n){const t=it.stateConfig;return t.states[t.statesIndex]=n,++t.statesIndex,n(um)}function lm(n){const t=it.stateConfig,e=t.statesIndex,l=yi(t.prevSupport).context.state.older.states[e];let h=[];l(function(...m){return h=m,l.lastValues=h,m});const f=function(...m){return h};return t.states[t.statesIndex]=n,++t.statesIndex,n(f)}function Rh(n){Pt(n);const t=it.stateConfig;t.handlers.handler=Ph,t.handlers.statesHandler=Sh,t.rearray=[];const e=t.state=[],r=t.states=[];t.statesIndex=0;const s=n.state=n.state||{};s.newer={state:e,states:r}}class hm{}function dm(n){const[t]=n(hm),[e]=n(t);return[t,e]}function fm(n){const t=n.callback;if(!t)return n.defaultValue;const[e]=dm(t);return e}function pm(){const n=it.stateConfig,e=n.rearray[n.state.length];return n.state.push(e),e.defaultValue}function Ph(n){var a,c;const t=it.stateConfig,e=oe();if(!e||!e.state){const l="State requested but TaggedJs is not currently rendering a tag or host";throw console.error(l,{config:t,context:e,function:(c=(a=t.support)==null?void 0:a.templater.wrapper)==null?void 0:c.original}),new Error(l)}const r=e.state.newer;t.state=r.state;let s=n;if(typeof n===X.function&&(s=n()),typeof s===X.function){const l=s;s=function(...f){return l(...f)},s.original=l}const i={get:function(){return fm(i)},defaultValue:s};return t.state.push(i),s}function gm(n){const t=new Z,e=r=>{const s=[],i=[],a=(p,m)=>{if(s[m]=!0,i[m]=p,s.length===n.length){for(const S of s)if(!S)return;r(i,h)}},c=[...n],h=c.shift().subscribe(p=>a(p,0)),f=c.map((p,m)=>p.subscribe(A=>a(A,m+1)));return h.subscriptions=f,h};return t.subscribeWith=e,t}function mm(n,t){const e=n.findIndex(r=>r.callback===t);e!==-1&&n.splice(e,1)}function _m(n,t,e){const r=Z.globalSubCount$;Z.globalSubCount$.next(r.value+1);const s=function(){s.unsubscribe()};return s.callback=t,s.subscriptions=[],s.unsubscribe=function(){return ym(s,e,t)},s.add=i=>(s.subscriptions.push(i),s),s.next=i=>{t(i,s)},s}function kh(n,t,e){const r=[...t],s=r.shift(),i=f=>{if(r.length)return kh(f,r,e);e(f)};let a=i;const h=s(n,{setHandler:f=>a=f,next:i});a(h)}function ym(n,t,e){mm(t,e);const r=Z.globalSubCount$;Z.globalSubCount$.next(r.value-1),n.unsubscribe=()=>n;const s=n.subscriptions;for(const i of s)i.unsubscribe();return n}const Rn=class Rn{constructor(t,e){Jt(this,"onSubscription");Jt(this,"methods",[]);Jt(this,"isSubject",!0);Jt(this,"subscribers",[]);Jt(this,"subscribeWith");Jt(this,"value");Jt(this,"set",this.next.bind(this));this.onSubscription=e,arguments.length>0&&(this.value=t)}subscribe(t){const e=_m(this,t,this.subscribers),r=this.subscribeWith;if(r){if(this.methods.length){const s=t;t=i=>{kh(i,this.methods,a=>s(a,e))}}return r(t)}return this.subscribers.push(e),this.onSubscription&&this.onSubscription(e),e}next(t){this.value=t,this.emit()}emit(){const t=this.value,e=this.subscribers;for(const r of e)r.callback(t,r)}toPromise(){return new Promise(t=>{this.subscribe((e,r)=>{r.unsubscribe(),t(e)})})}toCallback(t){const e=this.subscribe((r,s)=>{const i=s==null?void 0:s.unsubscribe;i?i():setTimeout(()=>{e.unsubscribe()},0),t(r)});return e}pipe(...t){const e=[];"value"in this&&e.push(this.value);const r=new Rn(...e);return r.setMethods(t),r.subscribeWith=s=>this.subscribe(s),r.next=s=>this.next(s),r}setMethods(t){this.methods=t}static all(t){const e=t.map(r=>cm(r)?r:new Rn(r,i=>(i.next(r),i)));return gm(e)}};Jt(Rn,"globalSubCount$",new Rn(0));let Z=Rn;const Tm=new Z(void 0,function(t){js()||t.next()}),it={stateConfig:{state:[],version:Date.now(),handlers:{handler:Ph,statesHandler:Sh}},tagClosed$:Tm};function Em(n,t){const r=n.templater.tag.values;for(const s of t)wm(r,s,n);return t}function wm(n,t,e){if(t.deleted)return;const r=t.tagJsVar;Pt(t),r.processUpdate("",t,e,n),wt()}function Vh(n,t){if(!n)return;const r=n.context.contexts;Im(n,t),++st.locks,Em(n,r),--st.locks,Ht()}function Im(n,t){const e=t.templater,r=t.templater.tag,s=e.values||r.values,i=n.templater.tag;i.values=s}function Am(n,t){return Uo(n,t)}function Uo(n,t){if(n===null||typeof n!==X.object||t<0)return n;if(n instanceof Date)return new Date(n);if(n instanceof RegExp)return new RegExp(n);const e=jt(n)?[]:Object.create(Object.getPrototypeOf(n));if(jt(n))for(let r=0;r<n.length;r++)e[r]=Uo(n[r],t-1);else for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=Uo(n[r],t-1));return e}function vm(n,t,e){return ya(n,t,e)}function ya(n,t,e){return n===t||Sm(n,t)||e<0?!0:typeof n===X.object&&typeof t===X.object?n instanceof Date&&t instanceof Date?n.getTime()===t.getTime():jt(n)&&jt(t)?Cm(n,t,e-1):jt(n)||jt(t)?!1:bm(n,t,e-1):!1}function bm(n,t,e){const r=Object.keys(n),s=Object.keys(t);if(r.length===0&&s.length===0)return!0;if(r.length!==s.length)return!1;for(const i of r)if(!s.includes(i)||!ya(n[i],t[i],e-1))return!1;return!0}function Cm(n,t,e){if(n.length!==t.length)return!1;for(let r=0;r<n.length;r++)if(!ya(n[r],t[r],e-1))return!1;return!0}function Sm(n,t){return on(n)&&on(t)&&n.toString()===t.toString()}function Nu(n){return n.map(Ta)}function Ta(n,t){const e=n,r=n==null?void 0:n.tagJsType;if(r)switch(r){case Q.signal:case Q.subscribe:case Q.stateRender:return;case Q.dom:case Q.tag:case Q.templater:return Nu(e.values)}return jt(n)?Nu(e):Am(n,t)}function Rm(n,t){const e=n.length;for(let r=0;r<e;++r){const s=n[r],i=t[r];if(jt(s)&&jt(i)){if(s===i)continue;return 3}if(!(typeof s===X.function&&typeof i===X.function)){if(typeof s===X.object){if(!s&&!i)continue;if(typeof t===X.object){const a=Object.entries(s);for(const c of a)if(!Pm(c,i))return 3.1}continue}if(s!==i)return 3.3}}return!1}function Pm([n,t],e){const r=e[n];return typeof t===X.function&&typeof r===X.function?!0:r===t}function Ea(n,t,e){return n}function km(n){return typeof n!==X.object||!n||n.tagJsType}function Vm(n,t,e,r,s,i){var c;const a=Object.keys(n);for(const l of a){const h=n[l],f=t[l],p=wa(f,h,e,r,i,s+1);h===p||(c=Object.getOwnPropertyDescriptor(n,l))!=null&&c.set||(n[l]=p)}return n}function Dm(n,t,e,r,s,i){for(let a=n.length-1;a>=0;--a){const c=n[a],l=t[a];n[a]=wa(l,c,e,r,i,s+1)}return n}function wa(n,t,e,r,s,i){return n==null||i>s?t:typeof n===X.function?t.mem?(n.mem=t.mem,t):(n.mem=t,n):km(t)?t:jt(t)?Dm(t,n,e,r,i,s):Vm(t,n,e,r,i,s)}function Nm(n,t,e,r,s,i=-1){const a=t.context;if(!a.global||!a.state.newest){const A=Ea(r);r.push(...A);const S=n.propsConfig;return S.castProps=A,r}t=a.state.newest||t;const f=t.propsConfig.castProps,p=[];for(let A=0;A<r.length;++A){const S=r[A],k=f[A],V=wa(k,S,n,e,s,i+1);p.push(V)}const m=n.propsConfig;return m.castProps=p,p}function Om(n,t){const e=n.context,r=e.global;let s=-1;const i=e.providers=e.providers||[],a=i.length-1;for(;s++<a;){const c=i[s];let l=-1;const h=c.children.length-1;for(;l++<h;){const f=c.children[l];if(r===f.context.global){c.children.splice(l,1),c.children.push(t);return}}}}function Dh(n,t){const e=n.context.providers;if(e)for(const r of e)for(let s=r.children.length-1;s>=0;--s)r.children[s].context.global===t&&r.children.splice(s,1);n.context.destroy$.next(),n.context.renderCount=0}function Fo(n,t){for(const e of n){const r=e.lastArray;if(r){Fo(r,t);continue}const s=e.value;if((s==null?void 0:s.tagJsType)===Q.subscribe){s.destroy(e,t),e.deleted=!0;continue}const i=e.global;if(!i)continue;const a=e.state.newest,c=i.subscriptions;c&&c.forEach(Oh),Wr(a.templater)&&Dh(a,i);const l=e.contexts;Fo(l,a),i.deleted=!0}}function Nh(n,t=[],e=[]){for(const r of n){const s=r.global;if(!s)continue;const i=r.state.newest;if(i){t.push(i);const c=s.subscriptions;c&&e.push(...c)}const a=r.contexts;a&&Nh(a,t,e)}return{tags:t,subs:e}}function Oh(n){n.unsubscribe()}function Jr(n,t){const e=n.context;t.deleted=!0,e.renderCount=0;const r=[],s=e.contexts;return Fo(s,n),n.templater.wrapper&&Dh(n,t),Aa(e,r),delete e.state,delete e.contexts,delete e.returnValue,delete e.providers,r}function Mm(n,t,e,r,s){const i=t==null?void 0:t.arrayValue;let c=n!==(i||s);return c===!1&&i===void 0&&e.tagJsVar.hasValueChanged(t,e,void 0)&&(c=!0),c?(Ia(e),r.splice(s,1),2):0}function Ia(n){const t=n.global;Lm(t,n)}function Lm(n,t){var e;if(n&&((e=t.state)!=null&&e.oldest)){const r=t.state.oldest;Jr(r,n);return}t.tagJsVar.destroy(t,{})}function Mh(n){++n.updateCount;const t=n.lastArray;t&&Lh(n,t)}function Lh(n,t){for(let e=0;e<t.length;++e)Ia(t[e]);delete n.lastArray}function Vr(n){for(let t=n.length-1;t>=0;--t){const e=n[t];xm(e),n.splice(t,1)}}function xm(n){const t=n.marker;t&&kr(t,"destroyMarker");const e=n.domElement;kr(e,"destroyClone")}function Aa(n,t){n.contexts&&Um(n.contexts,t),n.htmlDomMeta&&Vr(n.htmlDomMeta)}function Um(n,t){var e;for(const r of n){if(r.withinOwnerElement){const l=r.tagJsVar;if(l&&l.tagJsType==="host"){const h=r.supportOwner,f=l.destroy(r,h);zn(f)&&t.push(f)}continue}const s=r.lastArray;if(s){Lh(r,s);continue}const i=r.simpleValueElm;if(i){delete r.simpleValueElm,kr(i,"smartRemoveByContext");continue}const a=r.global;if(a===void 0)continue;if(a.deleted=!0,(e=r.state)==null?void 0:e.oldest){Aa(r,t);continue}}}function Bo(n){const t=n.context,e=t.global,r=t.contexts;if(r){const{subs:s,tags:i}=Nh(r);for(const c of i){if(c.context.global.deleted===!0)return;Ou(c.context)}e.subscriptions&&s.forEach(Oh)}Ou(t),Hr(t)}function Ou(n){n.global.deleted=!0,Aa(n,[]),delete n.contexts}function xh(n,t,e,r){const s=t.original,i=n.tagJsType===Q.stateRender,a=it.stateConfig;gi(e);let c;if(i?c=n():(c=s(...r),typeof c===X.function&&c.tagJsType===void 0&&(c=c())),!c)throw new Error(`A tag cannot return a value of type ${c===null?"null":typeof c}`);const l=e.context;return l.returnValue=c,e.returnValue=c,n.tag=c,l.state.newer={...a},wt(),e}function Fm(n,t){const e=n.context;++e.renderCount,Bm(n.context),it.tagClosed$.next(t)}function Bm(n){jm(n),$m()}function jm(n){const t=it.stateConfig,e=n||t.context;e.state=e.state||{},e.state.newer={...t};const r=t.support;e.state.newest=r}function $m(){const n=it.stateConfig;delete n.prevSupport,delete n.support,delete n.state,delete n.states,wt()}function Uh(n,t,e,r){let s;const i=n.templater;if(i.tagJsType===Q.stateRender){const a=i;s=bi(i,e,r,n.appSupport),xh(i,a,s)}else{const a=i.wrapper;s=a(n,e,t)}return Fm(s,r),s.ownerSupport=n.ownerSupport,s}function qm(n){const t=it.stateConfig;return t.rearray=n,t.state=[],t.states=[],t.statesIndex=0,t.handlers.handler=pm,t.handlers.statesHandler=lm,t}function Hm(n,t,e){qm(e);const r=it.stateConfig;r.prevSupport=t,gi(n)}function zm(n,t,e,r){const i=e.state.older.state;return Hm(n,t,i),Uh(n,t,e,r)}function Fh(n,t,e,r){Rh(n.context),gi(n);const s=Uh(n,t,e,r);return wt(),s}function Wm(n){var r;const t=n==null?void 0:n.context,e=t==null?void 0:t.state;return(r=e==null?void 0:e.older)==null?void 0:r.state}function va(n,t){var r;const e=Mu(n,t);return!e&&((r=t.templater.tag)!=null&&r._innerHTML)&&Mu(n.outerHTML,t)?!0:e}function Mu(n,t){const e=n.templater,r=t.templater,s=(e==null?void 0:e.tag)||n,i=r.tag;if((e==null?void 0:e.tagJsType)===Q.stateRender)return e.dom===r.dom;if(!i&&!s.returnValue)return!0;if(!s.returnValue)return!1;throw new Error(`unknown tagJsType of ${s.tagJsType}`)}function Jm(n,t,e){let r;Wm(t)?r=zm(n,t,e):r=Fh(n,t,e);const i=!t||va(t,r);if(i){if(t){const a=t.templater.tag;if(a&&e.renderCount>0){const c=t==null?void 0:t.templater,l=c==null?void 0:c.tag;Gm(a,t,l)}}}else{Om(t,r),Bo(t);const a=r.context;a.state.oldest=r,a.state.newest=r}return r.ownerSupport=n.ownerSupport,{support:r,wasLikeTags:i}}function Gm(n,t,e){if(n.tagJsType===Q.dom){const r=e==null?void 0:e.dom,s=n.dom;r!==s&&Bo(t);return}if(e){const r=e.strings;if(r){const s=r==null?void 0:r.length,i=n.strings.length;s!==i&&Bo(t)}}}function Km(n,t,e){const r=Jm(t,n,e);if(r.wasLikeTags){const s=e.state.oldest;return Vh(s,r.support),r.support}}function Qm(n){const t=n.context;return Km(n,n,t)}function Xm(n){if(!n)return Ot;const t=oe();if(!t)throw new Error("output must be used in render sync with a parent context");const e=_a(t);if(!e)throw new Error("output must be used in render sync fashion");if(n.wrapped===!0)return n;const r=(...s)=>{const i=e.ownerSupport;return Ym(s,n,i.context)};return r.wrapped=!0,r}function Ym(n,t,e){Pt(e);const s=t(...n);return wt(),sn.push([()=>{const i=e.global;if(i===void 0||i.deleted===!0){++st.locks;const c=e;c.tagJsVar.processUpdate(c.value,c,void 0,[]),--st.locks,Ht();return}++st.locks,Qm(void 0),--st.locks,Ht()},[]]),s}function Zm(n,t){++n.updateCount;const e=n.subContext,r=Bh(e,t);return delete n.subContext,r}function Bh(n,t){n.deleted=!0;const e=n.appendMarker;if(e&&(kr(e,"deleteSubContext"),delete n.appendMarker),!n.hasEmitted)return;const r=n.contextItem;return r.tagJsVar.destroy(r,t),76}function t_(n,t,e,r){const s=t.tagJsType;if(!t||!s||s!==n)return r.tagJsVar.destroy(r,e),Kr(t,r,e,99),99}function jh(n,t,e){const r=t.subContext,s=t_(Q.subscribe,n,e,t);return s||(!r||!r.hasEmitted||(r.tagJsVar=n,r.valuesHandler(r.lastValues,0)),0)}function e_(n,t,e,r,s){const i=t.context;if(i.locked=3,e.target=e.target||r,Pt(e),e.inputsHandler){const a=t.propsConfig;e.inputsHandler(a)}e.tagJsVar.processInit(n,e,t,s,r),wt(),e.value=n,delete i.locked}function Ti(n){switch(n){case void 0:case!1:case null:return zr}return n}function n_(n,t){const e=Ti(n);if(t.paint){t.paint[1][1]=e;return}const r=t.simpleValueElm;Xt.push([tm,[e,r]])}function r_(n,t){t.value=n,t.oldTagJsVar=t.tagJsVar,t.tagJsVar=zh(n);const e=t.placeholder,r=Ti(n),s=t.paint=[bh,[e,r,function(a){t.simpleValueElm=a,delete t.paint},"processNowRegularValue"]];Kt.push(s)}function Ei(n,t){if(n.startsWith("class."))return"class";if(n.startsWith("style."))return"style";const e=s_(n);return e!==!1?e:n==="value"&&t==="SELECT"?"value":!1}function s_(n){switch(n){case"autoselect":case"autoSelect":return"autoselect";case"autofocus":case"autoFocus":return"autofocus"}return!1}function i_(n,t,e){typeof n[t]!="object"&&(n[t]={});for(const r in e){const s=e[r];Xt.push([u_,[n,t,r,s]])}if(n[t].setProperty)for(const r in e){const s=e[r];Xt.push([c_,[n,t,r,s]])}}function o_(n,t,e){n.setAttribute(t,"")}function me(n,t,e){if(_i(e))return i_(n,t,e);$h(n,t,e)}function a_(n,t,e){e?n[t]=!0:n[t]=!1}function $h(n,t,e){if(n[t]=e,e===void 0||e===!1||e===null){n.removeAttribute(t);return}n.setAttribute(t,e)}function c_(n,t,e,r){n[t].setProperty(e,r)}function u_(n,t,e,r){n[t][e]=r}function qh(n,t,e,r){switch(r){case"autofocus":sn.push([g_,[e]]);return;case"autoselect":sn.push([p_,[e]]);return;case"style":{const s=n.split(".");Xt.push([l_,[e,s,t]]);return}case"class":h_(n,t,e);return;case"value":me(e,n,t),sn.push([s=>{s.value=t},[e]]);return}throw new Error(`Invalid special attribute of ${r}. ${n}`)}function l_(n,t,e){const r=t[1];n.style[r]=e,n.style.setProperty(r,e)}function h_(n,t,e){const r=n.split(".");if(r.shift(),t){for(const s of r)Xt.push([d_,[e,s]]);return}for(const s of r)Xt.push([f_,[e,s]])}function d_(n,t){n.classList.add(t)}function f_(n,t){n.classList.remove(t)}function p_(n){n.select()}function g_(n){n.focus()}function m_(n,t,e,r,s){const i=n(),a={component:!1,tagJsType:"dynamic-attr",matchesInjection:h=>{const f=c.tagJsVar;if(f.matchesInjection)return f.matchesInjection(h,c)},hasValueChanged:(h,f,p)=>{const m=n();return c.tagJsVar.hasValueChanged(m,c,p)},processInit:Ot,processInitAttribute:Ot,destroy:(h,f)=>{c.tagJsVar.destroy(c,f)},processUpdate:(h,f,p,m)=>{++f.updateCount;const A=h();c.tagJsVar.processUpdate(A,c,p,m),c.value=A}},c={description:"sub-context",updateCount:0,isAttr:!0,target:r,parentContext:t,value:i,tagJsVar:We(i),withinOwnerElement:!0,destroy$:new Z,render$:new Z},l={description:"override-context",updateCount:0,isAttr:!0,contexts:[c],target:r,parentContext:t,value:n,tagJsVar:a,withinOwnerElement:!0,destroy$:new Z,render$:new Z};return c.tagJsVar.processInitAttribute(e,i,r,c.tagJsVar,c,{},s),l}function __(n,t,e,r,s,i,a){return e.target=r,e.howToSet=s,e.attrName=n,e.isSpecial=a,t!=null&&t.tagJsType?y_(n,t,e,i,r):wi(n,t,r,s,a,e)}function y_(n,t,e,r,s){t.processInitAttribute(n,t,s,t,e,r,me),e.tagJsVar=t}function wi(n,t,e,r,s,i){if(typeof t=="function")return m_(t,i,n,e,r);if(s)return qh(n,t,e,s);r(e,n,t)}function Hh(n,t,e,r,s,i){const a=t.tagJsVar,c=n;if(a.hasValueChanged(c,t,e)>0){a.destroy(t,e),r.removeAttribute(s);const h=We(n);h.isAttr=!0,h.processInitAttribute(s,n,r,h,t,e,i),t.tagJsVar=h;return}}function T_(n,t,e,r,s,i,a){r.destroy=E_,r.hasValueChanged=A_,r.processUpdate=(l,h,f)=>Hh(l,h,f,e,n,a);const c=Ei(n,e.tagName);wi(n,t,e,a,c,s),s.tagJsVar=r}function E_(n){const t=n.target,e=n.attrName;t.removeAttribute(e)}function zh(n){return{component:!1,tagJsType:"simple",value:n,processInitAttribute:T_,processInit:I_,destroy:Wh,hasValueChanged:v_,processUpdate:w_}}function w_(n,t,e){return n===t.value?0:Ca(t,n,e)}function I_(n,t,e,r,s){const i=Ti(n);r=t.placeholder;const a=t.paint=[bh,[r,i,function(l){t.simpleValueElm=l,delete t.paint},"processSimpleValueInit"]];Kt.push(a)}function Wh(n){const t=n.simpleValueElm;if(!t){if(n.paint){n.paint[0]=Ot;return}if(n.value===void 0||n.value===!1||n.value===null)return}delete n.simpleValueElm,kr(t,"deleteSimpleValue")}function A_(n,t){return n==null||n===t.value?0:6}function v_(n,t){return n==null||![X.object,X.function].includes(typeof n)?(n_(n,t),0):(Wh(t),6)}function b_(n,t){return jt(n)?0:9}function dn(n,t,e){const r=t.tagJsVar.processUpdate(n,t,e,[]);return t.value=n,r||0}const Lu=Symbol("not-casted"),C_=[];function $s(n,t,e,r){const s=n.lastArray===void 0;s&&(n.lastArray=[]);const i=n.lastArray;let a=n.placeholder;const c=t.length,l=new Array(c).fill(Lu),h=function(A){const S=l[A];if(S!==Lu)return S;const k=D_(t[A]);return l[A]=k,k};let f=s?!1:c!==i.length;s||(f=S_(i,t,n,f,h).batchUpdates);const p=n.lastArray;for(let m=0;m<c;++m)a=R_(m,p,e,f,h,a,r).placeholder}function S_(n,t,e,r,s){const i=[];let a=0;const c=t.length-1;for(let l=0;l<n.length;++l){const h=n[l];if(h.locked===1&&(r=!0),h.value===null){i.push(h);continue}const f=k_(l,n,a,c,s);if(f===0){i.push(h);continue}if(f===2){l=l-1;continue}a=a+f}return e.lastArray=i,{batchUpdates:r}}function R_(n,t,e,r,s,i,a){const c=s(n),l=t[n];if(l)return P_(c,l,e,r);const h=Gh(c,e,t,i,a);return t.push(h),c&&(h.arrayValue=c.arrayValue||h.arrayValue),h}function P_(n,t,e,r,s,i){return r?(Zg(t,[V_,[n,t,e]]),t.value=n,t):Array.isArray(n)?(t.tagJsVar.processUpdate(n,t,e,C_),t.value=n,t):(dn(n,t,e),t)}function k_(n,t,e,r,s){const i=n-e,a=i<0||r<i,c=t[n];if(a)return Ia(c),1;c.arrayValue===void 0&&(c.arrayValue=n);const l=c.arrayValue,h=s(n);return Mm(l,h,c,t,n)}function V_(n,t,e){dn(n,t,e)}function D_(n){if(typeof n!="function")return n;const t=n;return t.tagJsType!==void 0?n:t()}function Jh(n){return{component:!1,tagJsType:"array",value:n,processInitAttribute:Ot,processInit:O_,processUpdate:N_,hasValueChanged:b_,destroy:Mh}}function N_(n,t,e){++t.updateCount;const s=t.tagJsVar.hasValueChanged(n,t,e);return s?(Mh(t),Kr(n,t,e,s),s):Array.isArray(n)||dn(n,t,e)===0?($s(t,n,e),0):1}function O_(n,t,e,r,s){$s(t,n,e,s)}function We(n){return(n==null?void 0:n.tagJsType)?n:M_(n)}function M_(n){return jt(n)?Jh(n):zh(n)}function Ii(n,t,e,r,s){return{description:"getNewContext",updateCount:0,value:n,destroy$:new Z,render$:new Z,tagJsVar:s||We(n),withinOwnerElement:e,parentContext:r}}function Gh(n,t,e,r,s){const i=document.createTextNode(zr),a=Ii(n,e,!0,t.context);return a.withinOwnerElement=!1,a.placeholder=i,s||(a.placeholder=r),e_(n,t,a,s,r),s&&mi.push([ma,[s,i]]),a}function Kh(n,t,e,r){return t.hasEmitted=!0,t.contextItem=Gh(n,e,[],r)}function Qh(n,t,e){var a;++t.updateCount;const s=n.owner._innerHTML;s.processInit=s.oldProcessInit;const i=(a=t.subContext)==null?void 0:a.contextItem;Ca(i,s,e)}function L_(n,t,e,r,s){t.subContext={},n.processUpdate=Qh,x_(n,e,t,r,s)}function x_(n,t,e,r,s){const{appendMarker:i,insertBefore:a}=fd(s,r),c=e.subContext;c.appendMarker=i;const h=n.owner._innerHTML;h.processInit=h.oldProcessInit,Kh(h,c,t,a)}function Xh(){return{component:!1,tagJsType:"innerHTML",hasValueChanged:()=>0,processInitAttribute:Ot,processInit:L_,processUpdate:Qh,destroy:Zm}}function Ai(n){++n.updateCount;const t=n.global,r=n.state.newest;delete n.inputsHandler,delete n.updatesHandler,Jr(r,t),U_(n)}function U_(n){n.htmlDomMeta=[],delete n.contexts,delete n.state,delete n.global,n.renderCount=0}function F_(n,t){var a;const e=(a=t.state)==null?void 0:a.newest,r=Ch(n),s=n;if(r)return va(s,e)?0:7;if(n==null?void 0:n.tagJsType){const c=t.value;if(!c&&n)return 88;const l=c.wrapper,h=n.wrapper;return(h==null?void 0:h.original)===(l==null?void 0:l.original)?0:88}return 8}function vi(n,t){var c;const e=t.global,r=(c=t.state)==null?void 0:c.newest,s=Ch(n),i=n;if(s)return va(i,r)?(jo(t,n,r),0):(Jr(r,e),Hr(t),7);if(n==null?void 0:n.tagJsType){const f=t.state.newest.ownerSupport;return jo(t,n,f)===!0?0:88}return Ai(t),8}function B_(n,t){const e={component:!1,tagJsType:Q.templater,processInit:"",processInitAttribute:Ot,processUpdate:dn,hasValueChanged:vi,destroy:Ai,propWatch:n,props:t,key:function(s){return e.arrayValue=s,e},matchesInjection(r,s){var i;if(e.wrapper===r||((i=e.wrapper)==null?void 0:i.original)===(r==null?void 0:r.original))return s}};return e}const Dr=[];function j_(n,t){return function(s,i,a){const c=Yh(n,s,a),l=s.ownerSupport,h=bi(n,i,l,s.appSupport,c);return xh(n,t,h,c)}}function Yh(n,t,e){const r=n.propWatch===Yt.DEEP?ba:ld,s=n.props,i=t.propsConfig;let a=i.castProps;const c=e==null?void 0:e.propsConfig,l=c==null?void 0:c.castProps;return l&&(i.castProps=l,a=Nm(t,e,e.ownerSupport,s,r)),a||Ea(s)}function $_(n,t){const r=n.Observables[0];if(!t.hasEmitted){if("withDefault"in n){t.subValueHandler(n.withDefault,0);return}if("value"in r){t.subValueHandler(r.value,0);return}return}const s=t.lastValues[0].value;t.subValueHandler(s,0)}function q_(n,t,e,r,s,i){t.destroy=gd;const a=Ei(n,e.tagName),c=function(f,p){wi(n,f,e,me,a,s),$o(p)},l=pd(t.Observables,i,c,t,s);return s.subContext=l,s.value=t,s.tagJsVar=t,t.processUpdate=function(f,p,m){return Hh(f,s,m,e,n,me)},{subContext:l,onOutput:c}}function H_(n,t){if(!(n!=null&&n.tagJsType))return 1;const e=n.Observables;if(!e)return 2;const s=t.value.Observables;return!s||s.length!==e.length?3:e.every((a,c)=>a===s[c])?0:4}function Zh(n,t){return{component:!1,onOutput:Ot,tagJsType:Q.subscribe,processInitAttribute:q_,processInit:vy,hasValueChanged:H_,processUpdate:jh,destroy:by,callback:t,Observables:[n]}}Zh.all=z_;function z_(n,t){return Zh(Z.all(n),t)}function W_(n,t,e,r){const s={component:!1,tagJsType:"tag-conversion",processInitAttribute:Ot,processInit:(i,a,c)=>{const l=n.returnValue;return t.tagJsVar.processInit(l,t,e,r.placeholder)},processUpdate:(i,a,c)=>{if(a.locked||a.deleted)return;++a.updateCount;const l=a.value,h=l==null?void 0:l.tagJsType,p=(i==null?void 0:i.tagJsType)!==h;if(F_(i,a)||p||s.hasValueChanged(i,a,e)){s.destroy(a,e),Kr(i,a,c,789);return}a.locked=467,a.render$.next();const S=a.returnValue;J_(t,i,a,S,e),delete a.locked},hasValueChanged:(i,a,c)=>{const l=n.returnValue;return t.tagJsVar.hasValueChanged(l,t,c)},destroy:(i,a)=>{++n.updateCount,n.deleted=!0,delete n.returnValue;const c=t.tagJsVar.destroy(t,e);return zn(c)?c.then(()=>{const l=xu(n);return Ht(),l}):(n.destroy$.next(),xu(n))}};return s}function td(n,t,e){const r=n.context,s=n.returnValue,i=We(s);delete r.global,r.contexts=[];const a={updateCount:0,value:s,tagJsVar:i,destroy$:new Z,render$:new Z,placeholder:r.placeholder,withinOwnerElement:!0,parentContext:r,contexts:r.contexts},c=W_(r,a,n,e);return r.subContext=a,r.tagJsVar=c,i.processInit(s,a,n,e.placeholder),n}function ed(n,t,e){const r=bi(n,t,e,e==null?void 0:e.appSupport),s=r.propsConfig;if(s){const a=n.tagJsType!==Q.tagComponent?[]:Yh(n,r);s.castProps=a}return Fh(r,t.state.newest,t)}function nd(n,t,e){const r=ed(n,t,e);return r.templater.tag?td(r,r.ownerSupport,t):r}function J_(n,t,e,r,s){const i=Ea(t.props),a=n.value;a.props=i;const c=s.propsConfig;if(c&&(c.castProps=i),(t==null?void 0:t.tagJsType)==="tagComponent"){if(n.inputsHandler=e.inputsHandler,n.updatesHandler=e.updatesHandler,e.value=t,e.inputsHandler){Pt(e);const l=e.inputsHandler;l(i),wt()}if(e.updatesHandler){Pt(e);const l=e.updatesHandler;l(i),wt()}}n.tagJsVar.processUpdate(r,n,s,[]),n.value=r}function xu(n,t){delete n.returnValue,delete n.global,n.contexts=[],n.htmlDomMeta=[],delete n.inputsHandler,delete n.updatesHandler}function G_(n,t,e,r){const s=ed(n,t,e);return td(s,e,t)}function rd(n,t,e,r,s){return Hr(t),s?G_(n,t,e):nd(n,t,e)}function K_(n){var s,i;const t=oe();if(!t)throw new Error("tag.inject can only be called within a tag or host context");let e=t.parentContext;for(;e;){const a=e.contexts;if(a){for(const c of a)if(c.isAttr&&((s=c.tagJsVar)!=null&&s.matchesInjection)){const l=c.tagJsVar.matchesInjection(n,c);if(l!==void 0)return l.returnValue}}if((i=e.tagJsVar)!=null&&i.matchesInjection&&e.tagJsVar.matchesInjection(n,e))return e.returnValue;e=e.parentContext}const r=`Could not find parent context for tag.inject ${n}`;throw console.error(r,{targetItem:n,context:t}),new Error(r)}function Q_(n,t){return X_(n,t)}function X_(n,t,e=[]){const r=n.context;e.push({support:n,renderCount:r.renderCount,provider:t});const s=t.children;for(let i=s.length-1;i>=0;--i){const a=s[i],c=a.context;e.push({support:a,renderCount:c.renderCount,provider:t})}return e}function Y_(n){const e=n.context.providers;if(!e)return[];const r=[];for(const s of e){const i=s.owner,a=Q_(i,s);r.push(...a.map(Z_))}return r}function Z_(n){return n.support}function ty(n){return Q.templater===n.tagJsType}function ey(n,t){const e=t.context.global;return e&&e.deleted?!1:!!ny(n,t)}function ny(n,t){const e=n.props,s=t.propsConfig.latest;if(ry(e,s))return!0;switch(n.propWatch){case Yt.IMMUTABLE:return _y(e,s);case Yt.SHALLOW:return Rm(e,s)}return!vm(e,s,ba)}function ry(n,t){const e=n.length,r=t.length;return e!==r}function qs(n,t=[]){const e=n.context,r=n.templater,s=ty(r),i=n.ownerSupport;if(e.locked)return t.push(n),t;if(s)return qs(i,t);const a=n.context.global;if(a&&a.deleted===!0)return t;const c=n,l=Wr(c.templater),h=n.templater.tagJsType,p=i&&h!==Q.stateRender&&(!l||ey(c.templater,c));if(c.context.providers){const A=Y_(c);t.push(...A)}return p?(qs(i,t),l&&t.push(c),t):(t.push(c),t)}const sy=[];function sd(n){++st.locks;for(let t=0;t<n.length;++t)id(n[t]);--st.locks,Ht()}function iy(n){++st.locks,id(n),--st.locks,Ht()}function id(n){const t=n.context;t.tagJsVar.processUpdate(t.value,t,n.ownerSupport,sy)}function od(n,t,{resolvePromise:e,resolveValue:r}){return zn(n)?n.then(oy(t,e)):r(n)}function oy(n,t){return e=>{const r=n.context,s=r.global;if(r.deleted===!0||(s==null?void 0:s.deleted)===!0)return t(e);const i=qs(n);return sd(i),t(e)}}function Wt(n){return it.stateConfig.handlers.handler(n)}function ay(n){return Wt(()=>{var r;const t=n(),e=js();return(r=e==null?void 0:e.context)!=null&&r.global?od(t,e,{resolvePromise:cy,resolveValue:uy}):t}),tt}function cy(n){return n}function uy(n){return n}function ly(n){return Wt(function(){oe().destroy$.toCallback(n)}),tt}function hy(n,t,e,...r){const s=e(...r),i=_a(n);if(!i)return s;if(!i.context.global){const a=i.context;a.tagJsVar.processUpdate(a.value,a,i.ownerSupport,[])}return zn(s)&&s.finally(()=>{if(!n.global){const a=i.context;a.tagJsVar.processUpdate(a.value,a,i.ownerSupport,[])}}),s}function ad(n){const t=oe(),e=Wt({callback:n}),r=Wt(()=>cd(t,it.stateConfig,e));return e.callback=n,r}function cd(n,t,e){const r=t.states;return function(...i){const a=hy(n,r,e.callback,...i);return Ht(),a}}function dy(n){const t=oe(),e=i=>{Pt(t);const a=n();return wt(),a},r=t.render$.subscribe(()=>{e()}),s=e();return tt.onDestroy(()=>r.unsubscribe()),s}let fy=0;const Ir=ud("click"),Pn=ud("mousedown");function ud(n){return function(e){const r=ad(e);return Wt(()=>{md().addEventListener(n,r)}),r}}const py={get:md,onclick:Ir,click:Ir,onClick:Ir,mousedown:Pn,onmousedown:Pn,onMouseDown:Pn};Gr("onclick",Ir);Gr("click",Ir);Gr("onMouseDown",Pn);Gr("onmousedown",Pn);Gr("mousedown",Pn);function Gr(n,t){Object.defineProperty(tt,n,{get(){return t},set(e){return t(e)}})}var Yt;(function(n){n.DEEP="deep",n.SHALLOW="shallow",n.NONE="none",n.IMMUTABLE="immutable"})(Yt||(Yt={}));function tt(n,t=Yt.SHALLOW){const e=function(...a){const c=B_(t,a);c.tagJsType=Q.tagComponent,c.processInit=rd,c.hasValueChanged=vi;const l=j_(c,e);return l.original=n,c.wrapper=l,c},r=n;e.original=n,r.tags=Dr,r.setUse=it,r.ValueTypes=Q,r.tagIndex=fy++,Dr.push(e);const s=e;return s.inputs=i=>{const a=oe();a.inputsHandler=i;const c=a.tagJsVar;return i(c.props),!0},s.updates=i=>{const a=oe();return a.updatesHandler=i,!0},s.getInnerHTML=Xh,s}function gy(n){throw new Error("Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `")}function my(){throw new Error("Do not call tag.use as a function but instead set it as: `(props) => tag.use = (use) => html`` `")}tt.element=py;tt.use=my;tt.deepPropWatch=tt;tt.route=gy;tt.inject=K_;tt.output=Xm;tt.onInit=ay;tt.onDestroy=ly;tt.callback=ad;tt.onRender=dy;tt.getInnerHTML=Xh;tt.app=function(n){throw new Error("Do not call tag.route as a function but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `")};tt.immutableProps=function(t){return tt(t,Yt.IMMUTABLE)};tt.watchProps=function(t){return tt(t,Yt.SHALLOW)};Object.defineProperty(tt,"use",{set(n){n.original={setUse:it,tags:Dr},n.tagJsType=Q.stateRender,n.processInit=rd,n.processUpdate=dn,n.hasValueChanged=vi,n.destroy=Ai}});Object.defineProperty(tt,"promise",{set(n){Vy(n)}});function _y(n,t){const e=n.length;for(let r=0;r<e;++r){const s=n[r],i=t[r];if(s!==i)return 2}return!1}const ld=3,ba=10;function yy(n,t,e){const r=n.templater;if(r.tagJsType!==Q.stateRender){switch(r.propWatch){case Yt.IMMUTABLE:return n.propsConfig={latest:t,castProps:e};case Yt.SHALLOW:return n.propsConfig={latest:t.map(Ty),castProps:e}}return n.propsConfig={latest:t.map(Ey),castProps:e}}}function Ty(n){return Ta(n,ld)}function Ey(n){return Ta(n,ba)}function hd(n,t,e){const r={templater:n,context:t,castedProps:e,appSupport:void 0},s=t.global;return s.blocked=[],t.state||(t.state={newer:{state:[],states:[]}}),r}function dd(n,t,e,r){t.appSupport=e||t;const s=n.props;return s&&(t.propsConfig=yy(t,s,r)),t}function bi(n,t,e,r,s){const i=hd(n,t,s);return i.ownerSupport=e||i,i.ownerSupport.appSupport=r||i.ownerSupport,dd(n,i,r,s)}function wy(n,t,e,r){let s=e.templater||e;const i=n.templater.tag;i&&i._innerHTML&&(s=e._innerHTML);const a=bi(s,t,r,r.appSupport),l=n.context.state.oldest;Vh(l,a)}function jo(n,t,e){if(Wr(t))return n.global===void 0&&Hr(n),n.oldTagJsVar=n.tagJsVar,n.tagJsVar=t,Iy(t,n,e),!0;if(n.global){n.oldTagJsVar=n.tagJsVar,n.tagJsVar=t;const i=n.state.newest;if(i)return typeof t===X.function||wy(i,n,t,e),!0}if(n.inputsHandler){const i=e.propsConfig;n.inputsHandler(i)}return t.processInit(t,n,e,n.placeholder),n.oldTagJsVar=n.tagJsVar,n.tagJsVar=t,!0}function Iy(n,t,e){if(!t.state.newest){if(t.inputsHandler){const r=e.propsConfig;t.inputsHandler(r)}n.processInit(n,t,e,t.placeholder);return}}function Kr(n,t,e,r){const s=n&&n.tagJsType;if(delete t.deleted,s){jo(t,n,e);return}if(jt(n)){$s(t,n,e),t.oldTagJsVar=t.tagJsVar,t.tagJsVar=Jh(n);return}if(typeof n===X.function){t.value=n;return}r&&r_(n,t)}function Ca(n,t,e){const s=n.tagJsVar.hasValueChanged(t,n,e);return s===0||Kr(t,n,e,s),s}function fd(n,t){let e;return n&&(e=t=document.createTextNode(zr),mi.push([ma,[n,t]])),{appendMarker:e,insertBefore:t}}function Ay(n,t,e){const r=jh(n,t,e);if(t.hasEmitted!==!0){const s=t.value.Observables;if(!s||!("value"in s[0]))return}if(r===0&&n.callback){const s=t.subContext;$_(n,s)}}function vy(n,t,e,r,s){const i=n.Observables,{appendMarker:a,insertBefore:c}=fd(s,r);let l=function(p,m,A){Kh(p,A,e,c),$o(m),l=A.tagJsVar.onOutput=function(k,V,$){const F=$.contextItem;Ca(F,k,e),F.tagJsVar.processUpdate(k,F,e,[k]),F.value=k,$o(V)}};const h=pd(i,e,(f,p,m)=>l(f,p,m),n,t);return h.appendMarker=a,t.subContext=h,n.processUpdate=Ay,n.onOutput=l,h}function pd(n,t,e,r,s){function i(h,f){var p;l.lastValues[f]={value:h,tagJsVar:We(h),oldTagJsVar:(p=l.lastValues[f])==null?void 0:p.tagJsVar},a(l.lastValues,f)}function a(h,f){const p=l.tagJsVar;if(p==null?void 0:p.callback){Pt(s);const S=p.callback(...h.map(k=>k.value));e(S,c,l),wt();return}const A=h[f].value;e(A,c,l)}let c=!0;const l={lastValues:[],subValueHandler:i,valuesHandler:a,tagJsVar:r,subscriptions:[]};return n.forEach((h,f)=>{c=!0,l.subscriptions.push(h.subscribe(p=>i(p,f))),c=!1}),r.onOutput=e,l}function gd(n){const t=n.subContext;if(!t)return;t.subscriptions.forEach(r=>r.unsubscribe()),delete n.subContext}function by(n,t){++n.updateCount;const e=n.subContext;return gd(n),Bh(e,t)}function $o(n){n||it.stateConfig.support||Ht()}class Cy extends Z{constructor(e){super(e);Jt(this,"value");this.value=e}subscribe(e){const r=super.subscribe(e);return e(this.value,r),r}}const Sy=((n,t)=>Sa(n,t).pastResult),Ry=n=>n;function Py(n){const t=(e,r)=>Sa(e,r,n).pastResult;return t.setup=n,Ra(()=>t,t),t}const Sa=(n,t,{init:e,before:r,final:s=Ry}={})=>{const i=Wt({pastResult:void 0,values:void 0}),c=typeof n=="function"?n():n,l=i.values===void 0;let h=0;l&&typeof n=="function"&&tt.onRender(()=>{if(++h,h===1)return;const p=n();f(p)});function f(p){if(i.values===void 0){if(r&&!r(p))return i.values=p,i;const k=(e||t)(p,i.values);return i.pastResult=s(k),i.values=p,i}if(p.every((S,k)=>S===i.values[k]))return i;if(r&&!r(p))return i.values=p,i;const A=t(p,i.values);return i.pastResult=s(A),i.values.length=0,i.values.push(...p),i}return f(c)};function Ra(n,t){return Object.defineProperty(t,"noInit",{get(){const e=n();return e.setup.init=()=>{},e}}),Object.defineProperty(t,"asSubject",{get(){const e=n(),r=Wt(()=>js()),s=Wt(()=>new Cy(void 0));Wt(()=>({state:it.stateConfig.state,states:it.stateConfig.states}));const i=(a,c)=>(Sa(a,(h,f)=>{const p=js(),m=c(h,f);p!==r&&r.context.state.older,s.next(m)},e.setup),s);return i.setup=e.setup,Ra(()=>i,i),i}}),Object.defineProperty(t,"truthy",{get(){const e=n();return e.setup.before=r=>r.every(s=>s),e}}),t}Ra(()=>Py({}),Sy);class Pa extends Error{constructor(e,r,s={}){super(e);Jt(this,"details");this.name=Pa.name,this.details={...s,errorCode:r}}}class ka extends Pa{constructor(t,e){super(t,"sync-callback-error",e),this.name=ka.name}}new ka("callback() was called outside of synchronous rendering. Use `callback = callbackMaker()` to create a callback that could be called out of sync with rendering");const ky=()=>{};function Vy(n){const t=oe(),e=Wt({callback:ky}),r=Wt({current:void 0}),s=Wt(()=>cd(t,it.stateConfig,e));if(r.current!==n){r.current=n;const i=n;n.then(()=>{r.current===i&&s()})}}function oe(){return it.stateConfig.context}function md(){return oe().target}const ks=[];function Pt(n){return ks.push(n),it.stateConfig.context=n}function wt(){ks.pop(),it.stateConfig.context=ks[ks.length-1]}function Dy(n,t,e,r,s,i,a){const c=document.createTextNode(zr);if(Dr.push(e.wrapper||{original:e}),i.placeholder=c,t.isApp=!0,!s)throw new Error(`Cannot tagElement, element received is type ${typeof s} and not type Element`);s.destroy=function(){const p=i.events;for(const A in p){const S=p[A];s.removeEventListener(A,S)}i.events={},++st.locks;const m=Jr(f,t);return--st.locks,Ht(),m},++st.locks;const l=document.createDocumentFragment();l.appendChild(c);const f=nd(e,i,{appSupport:{appElement:s,context:i},appElement:s,context:i,isRoot:!0});return f.appElement=s,a&&(r.tag=f.templater.tag),--st.locks,Ht(),s.appendChild(l),{support:f,tags:Dr,ValueTypes:Q}}function Ny(n,t,e){const r=hd(n,t);return dd(n,r,r),r.appElement=e,r.context=t,t.state.oldest||(t.state.oldest=r,t.state.older=t.state.newer),t.state.newest=r,r}typeof document=="object"&&(document.taggedJs&&console.warn("🏷️🏷️ Multiple versions of taggedjs are loaded. May cause issues."),document.taggedJs=!0);const Eo=[],Uu="__taggedjs_tag_element__";function Oy(n,t,e){const r=t[Uu],s=Eo.findIndex(m=>m.element===t);if((r||s>=0)&&console.warn("tagElement called multiple times for the same element",{element:t}),s>=0){const m=Eo[s].support;Jr(m,m.context.global),Eo.splice(s,1)}t[Uu]=!0,t.innerHTML="";let i=(()=>h(e));i.propWatch=Yt.NONE,i.tagJsType=Q.stateRender,i.processUpdate=dn,i.props=[e],i.isApp=!0;const a=My(i,t),c=a.global,l=a.state.newest;Rh(l.context),gi(l);let h=n(e);const f=typeof h==X.function;f||(Wr(h)?(a.state.newest.propsConfig={latest:[e],castProps:[e]},i.propWatch=h.propWatch,i.tagJsType=h.tagJsType,i.wrapper=h.wrapper,i=h):(i.tag=h,h=n));const p=Dy(n,c,i,h,t,a,f);return wt(),p}function My(n,t){const e={component:!1,tagJsType:"templater",hasValueChanged:vi,destroy:Ai,processInitAttribute:Ot,processInit:function(){console.debug("do nothing app function")},processUpdate:dn},r={updateCount:0,value:n,varCounter:0,destroy$:new Z,render$:new Z,withinOwnerElement:!1,renderCount:0,global:void 0,state:{},tagJsVar:e};return Hr(r),r.events={},Ny(n,r,t),r}const _d=":tagvar",Ly=":";function xy(n){return Array.isArray(n)&&Object.prototype.hasOwnProperty.call(n,"raw")}function Uy(n,t){return function(r,s,i){if(xy(s)){const a=[];for(let l=0;l<s.length;++l)a.push(s[l]),l<i.length&&a.push(String(i[l]??""));const c=a.join("");return t(r,[n,c])}return t(r,[n,s])}}const Fy=[["alt","alt"],["ariaLabel","aria-label"],["referrerPolicy","referrerpolicy"],["autoFocus","autoFocus"],["border","border"],["id","id"],["for","for"],["fill","fill"],["content","content"],["charset","charset"],["cellPadding","cellpadding"],["cellSpacing","cellspacing"],["class","class"],["href","href"],["lang","lang"],["loading","loading"],["value","value"],["placeholder","placeholder"],["src","src"],["title","title"],["width","width"],["height","height"],["type","type"],["min","min"],["max","max"],["step","step"],["name","name"],["wrap","wrap"],["checked","checked"],["disabled","disabled"],["selected","selected"],["minLength","minLength"],["maxLength","maxLength"],["open","open"],["rel","rel"],["rows","rows"],["style","style"],["target","target"],["viewBox","viewBox"],["valign","valign"]];function By(n,t,e){const r=Qr(n,n.elementFunctions);return yd(r,t,e)}function yd(n,t,e){function r(s){return r.toCallback(s)}return r.toCallback=e,n.listeners.push([t,r]),n.allListeners.push([t,r]),n}function Td(n,t){const e=Qr(n,n.elementFunctions);return Gy(t[0],t[1],e),e}function jy(n,t){const e=Qr(n,n.elementFunctions);for(const r in t){if(!Object.prototype.hasOwnProperty.call(t,r))continue;const s=t[r];e.attributes.push([r,s]),wd(e,s),Nr(r)?zs(r,e):Nr(s)&&zs(s,e)}return e}const $y=Object.fromEntries(Fy.map(([n,t])=>[n,Uy(t,Td)])),qy=[["onClose","onclose"],["onCancel","oncancel"],["onDoubleClick","ondblclick"],["onClick","click"],["onBlur","onblur"],["onChange","onchange"],["onInput","oninput"],["contextMenu","contextmenu"],["onMouseDown","onmousedown"],["onMouseUp","onmouseup"],["onMouseOver","onmouseover"],["onMouseOut","onmouseout"],["onKeyDown","onkeydown"],["onKeyUp","onkeyup"]];function Ed(n,t){return n.attributes.push(t),wd(n,t[1]),Nr(t[0])?zs(t[0],n):Nr(t[1])&&zs(t[1],n),n}const Hy=(()=>{const n=Object.fromEntries(qy.map(([r,s])=>[r,function(a){return By(this,s,a)}])),t=Object.fromEntries(Object.entries($y).map(([r,s])=>[r,zy(s)])),e=t.id;return t.id=function(...s){const i=s[0];return this.arrayValue=typeof i=="function"?i():i,e.apply(this,s)},{...n,attr:function(...s){return Td(this,s)},attrs:function(s){return jy(this,s)},key:function(r){return this.arrayValue=r,this},...t}})();function Hs(n){return Hy}function wd(n,t){let e=1;t!=null&&typeof t!="function"&&typeof t.length=="number"&&(e+=t.length),n.contentId+=e}function zy(n){return(function(e,...r){return n(this,e,r)})}function Wy(n,t,e){if(_i(e)){for(const r in e){if(!Object.prototype.hasOwnProperty.call(e,r))continue;e[r]?n.classList.add(r):n.classList.remove(r)}return}$h(n,t,e)}function zs(n,t){t.contexts||(t.contexts=[]),t.contexts.push(n),++t.contentId}function Nr(n){return Array.isArray(n)||on(n)||(n==null?void 0:n.tagJsType)}function Fu(n,t){return(e,r)=>Ed(e,[n,r,!1,t])}function ct(n){return(t,e)=>yd(t,n,e)}const Jy=Object.fromEntries([["onClick",ct("click")],["onDoubleClick",ct("ondblclick")],["onDblClick",ct("ondblclick")],["onDblClick",ct("ondblclick")],["onBlur",ct("onblur")],["onChange",ct("onchange")],["onCancel",ct("oncancel")],["onClose",ct("onclose")],["onInput",ct("oninput")],["onMousedown",ct("onmousedown")],["onMouseDown",ct("onmousedown")],["onMouseup",ct("onmouseup")],["onMouseUp",ct("onmouseup")],["onMouseover",ct("onmouseover")],["onMouseOver",ct("onmouseup")],["onMouseout",ct("onmouseout")],["onMouseOut",ct("onmouseout")],["onKeyup",ct("onkeyup")],["onKeyUp",ct("onkeyup")],["onKeydown",ct("onkeydown")],["onKeyDown",ct("onkeydown")]]),Bu=Object.assign(Object.fromEntries(["checked","disabled","selected"].map(n=>[n,Fu(n,a_)])),{class:Fu("class",Wy)},Jy);function Gy(n,t,e){return n in Bu?Bu[n](e,t):Ed(e,[n,t,!1,me])}function Ky(n){return Id(n)}function Id(n){const t=Qy(n.attributes),e=Ad(n.innerHTML);return`<${n.tagName}${t}>${e}</${n.tagName}>`}function Qy(n){if(!n||n.length===0)return"";const t=[];return n.forEach(e=>{const r=e[0];if(typeof r!="string"||r.length===0)return;const s=bd(e[1]);if(s===!0){t.push(r);return}s===!1||s===void 0||s===null||t.push(`${r}="${vd(String(s))}"`)}),t.length>0?` ${t.join(" ")}`:""}function Ad(n){return!n||n.length===0?"":n.map(t=>{const e=bd(t);return Xy(e)?Id(e):Array.isArray(e)?Ad(e):e==null||e===!1?"":vd(String(e))}).join("")}function Xy(n){return!!n&&typeof n=="object"&&typeof n.tagName=="string"}function vd(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function bd(n){return typeof n=="function"?n():n}function Cd(n,t){++n.updateCount;const e=n.contexts,r=[];if(n.paintCommands){for(let s=Kt.length-1;s>=0;--s){const i=Kt[s],a=n.paintCommands.indexOf(i);if(a>=0&&(Kt.splice(s,1),n.paintCommands.splice(a,1),n.paintCommands.length===0))break}delete n.paintCommands,wo(n);return}if(e.length&&(Ws(e,t,r),e.length=0,r.length)){const s=n.htmlDomMeta;return n.deleted=!0,Promise.all(r).then(()=>{++st.locks,Vr(s),wo(n),--st.locks,Ht()})}Vr(n.htmlDomMeta),wo(n)}function wo(n){n.htmlDomMeta=[],delete n.contexts,n.deleted=!0}function Ws(n,t,e){const r=n[0],s=r.tagJsVar.destroy(r,t);if(r.deleted=!0,zn(s))return e.push(s.then(()=>{if(n.length>1)return Ws(n.slice(1,n.length),t,e)}));if(r.htmlDomMeta&&(Vr(r.htmlDomMeta),delete r.htmlDomMeta),n.length>1)return Ws(n.slice(1,n.length),t,e)}function Sd(n,t,e){if(t.deleted===!0)return;if(++t.updateCount,Va(n,t)){Cd(t,e),t.htmlDomMeta=[],delete t.deleted,Kr(n,t,e,789);return}const i=t.contexts,a=n.contexts||[],c=t.tagJsVar,l=n,h=c.allListeners,f=l.allListeners;for(let p=0;p<f.length;++p){const m=f[p],A=h[p][1];A.toCallback=m[1].toCallback}if(i.length!==a.length){const p=new Array(i.length);for(let m=0;m<i.length;++m)p[m]=i[m].value;throw console.info("context mismatch",{value:n,context:t,conValues:p,vContexts:a,deleted:t.deleted,contexts:i}),new Error(`Expected ${i.length} contexts but got ${a.length}`)}t.locked=79;for(let p=0;p<i.length;++p){const m=i[p];m.tagJsVar.processUpdate(a[p],m,e)}delete t.locked}function Va(n,t){if(!n)return 1;const e=t.value;if(e===n)return 0;if(n.tagJsType!=="element"||e===null)return 1;const r=n,s=e,i=r.contentId,a=s.contentId;if(i!==a)return 1;const c=r.innerHTML.length,l=s.innerHTML.length;return c!==l?1:0}function Rd(n,t,e){const r=e[t];if(r){let i=!1;if(n.originalStopPropagation=n.stopPropagation,n.stopPropagation=function(){i=!0,n.originalStopPropagation.call(n),n.stopPropagation=n.originalStopPropagation,delete n.originalStopPropagation},r(n),n.defaultPrevented||i)return}const s=e.parentNode;s&&Rd(n,t,s)}function Pd(n,t,e,r){const s=n.appElement,i=Yy(t);t==="blur"&&(t="focusout");const c=n.context.events;if(!c[t]){const l=function(f){Rd(f,i,f.target)};c[t]=l,s.addEventListener(t,l)}e[i]=r,e[t]=r}function Yy(n){return n==="blur"&&(n="focusout"),"_"+n}function Zy(n,t){const e=t.context.global,r=function(i,a){if(e.deleted!==!0)return tT(r.tagFunction,r.support,i,a)};return r.tagFunction=n,r.support=t,r}function tT(n,t,e,r){const s=yi(t),i=s.context;i.locked=1;const a=n.apply(e,r);return delete i.locked,kd(a,s)}function kd(n,t){const e=t.context.global;if(e!=null&&e.deleted)return;const r=qs(t);return sd(r),od(n,t,{resolvePromise:rT,resolveValue:sT})}const eT="no-data-ever",nT="promise-no-data-ever";function rT(){return nT}function sT(){return eT}function Vd(n,t,e,r){const s=function(...i){return s.tagFunction(n,i)};s.tagFunction=t,s.support=e,Pd(e.appSupport,r,n,s)}function Dd(n){return n==null||n===!1}function Nd(n,t,e,r,s,i,a,c,l){const h=Ii(n,[],!0,e);return h.description="tagJsVar-attr",h.target=c,h.isAttr=!0,h.isNameOnly=l,h.stateOwner=yi(i),h.supportOwner=i,Pt(h),r.processInitAttribute(a,n,c,r,h,i,me),wt(),h.oldTagJsVar=h.tagJsVar,h.tagJsVar=r,h}function Od(n,t,e,r,s,i,a,c){if(Dd(t))return;const l=typeof t;if(l===X.object){for(const h in t)ju(h,e,t,n,r,i,a,i);return i}if(l==="function"){const h=iT(c);c.tagJsVar=h,Pt(c);const f=t(c),p=We(f);if(wt(),p!=null&&p.tagJsType){c.state={newer:{state:[],states:[]}};const m=Nd(p,i,a,p,-1,r,"attr",e,!0);return m.tagJsVar=p,c.subContext=m,i}return ju("attr",e,t,n||[],r,i,a,i),i}t.length!==0&&s(e,t,zr)}function ju(n,t,e,r,s,i,a,c){const l=Ei(n,t.tagName),h=e[n],p=Ld(n,h,r,t,s,me,i,a,l);p!==void 0&&(Array.isArray(p)?c.push(...p):c.push(p))}function iT(n){return{tagJsType:"relay",component:!1,hasValueChanged:(e,r,s)=>r.subContext.tagJsVar.hasValueChanged(e,r.subContext,s),processInitAttribute:(e,r,s,i,a,c,l)=>a.subContext.tagJsVar.processInitAttribute(e,r,s,i,a.subContext,c,l),destroy:(e,r)=>e.subContext.tagJsVar.destroy(e.subContext,r),processUpdate:(e,r,s,i)=>{const a=e(r.subContext);return r.subContext.tagJsVar.processUpdate(a,r.subContext,s,i)},processInit:(e,r,s,i,a)=>r.subContext.tagJsVar.processInit(e,r.subContext,s,i,a),matchesInjection:e=>n.subContext.tagJsVar.matchesInjection(e,n.subContext)}}function oT(n,t,e,r,s,i,a,c,l){if(e){if(Dd(t)||t===""){r.removeAttribute(e);return}if(typeof e===X.object)if(typeof t===X.object)for(const p in e)p in t||Xt.push([$u,[r,p]]);else for(const p in e)Xt.push([$u,[r,p]])}const h=Od(n,t,r,s,i,a,c,l);h&&a.push(...h)}function $u(n,t){n.removeAttribute(t)}function aT(n,t,e,r){const s=t,i=n;if(i!=null&&i.tagJsType){const c=t.value;if(!(c!=null&&c.tagJsType)){i.isAttr=!0,Pt(t),i.processInitAttribute(s.attrName,n,s.target,i,s,e,me),wt(),s.tagJsVar=i;return}c.hasValueChanged(i,t,e);return}if(s.isNameOnly){oT(r,n,s.value,s.target,e,s.howToSet,[],s.parentContext,s),s.value=n;return}const a=s.target;dT(n,s.attrName,s,a,e,s.howToSet,s.isSpecial),t.value=n}const cT=new RegExp(_d+"(\\d+)"+Ly,"g");function Md(n){return n.search&&n.startsWith(_d)?n.search(cT):-1}function uT(n,t,e,r,s,i,a){const c=r.length,l=[];t.forEach(f=>{if(Md(f)>=0){const m=r.length,A=We(f),S={description:"attribute-array-item",updateCount:0,isAttr:!0,target:e,attrName:n,withinOwnerElement:!0,tagJsVar:A,parentContext:a,destroy$:new Z,render$:new Z};A.processUpdate=function($,F,K,lt){++F.updateCount,h(lt)};const k=i[m];S.value=k,l.push(S),++a.varCounter}});function h(f){const p=lT(t,f,c).join("");s(e,n,p)}return h(i),l}function lT(n,t,e){return n.reduce((r,s)=>{if(Md(s)>=0){const a=e++,c=t[a];return r.push(c),r}return r.push(s),r},[])}function hT(n,t,e,r,s,i,a,c,l){if(typeof t===X.function)return++s.varCounter,xd(t,a,n,e);const h=We(t),f={description:"dynamic-attribute",updateCount:0,isAttr:!0,target:e,attrName:n,howToSet:i,value:t,withinOwnerElement:!0,tagJsVar:h,destroy$:new Z,render$:new Z,parentContext:s};return r.push(f),h.processUpdate=aT,__(n,t,f,e,i,a,c),f.value=t,f}function qu(n){return _i(n)&&"TagJsTag"in n?n.tagJsVar:-1}function Ld(n,t,e,r,s,i,a,c,l){const h=qu(n);let f=h>=0||t===void 0&&typeof n!="string",p=e[h];t!=null&&t.tagJsType?p=t:(n!=null&&n.tagJsType||typeof n=="function")&&(f=!0,p=n,t=n);const m=p;if(m!=null&&m.tagJsType)return Nd(t,a,c,m,h,s,n,r,f);if(f){h===-1&&f&&(p=n);const S=Ii(p,[],!0,c);return S.description="processAttribute",S.isAttr=!0,S.target=r,S.isNameOnly=!0,S.howToSet=i,Od(e,p,r,s,i,a,c,S),S}if(Array.isArray(t))return uT(n,t,r,[],i,e,s.context);const A=qu(t);if(A>=0){const S=e[A];return hT(n,S,r,[],c,i,s,l)}return wi(n,t,r,i,l,c)}function dT(n,t,e,r,s,i,a){return on(n)?pT(s,n,r,t):fT(n,r,t,a,i,s)}function fT(n,t,e,r,s,i){if(r!==!1){qh(e,n,t,r);return}switch(n){case void 0:case!1:case null:Xt.push([gT,[t,e]]);return}if(on(n))return Vd(t,n,i,e);s(t,e,n)}function pT(n,t,e,r){return xd(t,n,r,e)}function xd(n,t,e,r){return n=Zy(n,t),Vd(r,n,t,e)}function gT(n,t){n.removeAttribute(t)}function mT(n,t,e,r,s){for(const i of n){const a=i[0],c=i[1],l=i[2]||!1;let h=i.length>1?me:o_;i[3]&&(h=i[3]);const f=s.contexts,p=Ld(a,c,t,e,r,h,f,s,l)||void 0;typeof p=="object"&&(f.push(p),++s.varCounter)}}function _T(n,t,e,r,s){const i=[],a={updateCount:0,parentContext:e,contexts:i,target:t,value:n,htmlDomMeta:[],tagJsVar:{component:!1,tagJsType:"dynamic-text",hasValueChanged:()=>0,processInit:Ot,processInitAttribute:Ot,destroy:(p,m)=>{++a.updateCount,i.forEach(A=>A.tagJsVar.destroy(A,m))},processUpdate:(p,m,A,S)=>{++a.updateCount,Pt(h);let k=p(h);const V=a.underFunction;delete a.underFunction,k instanceof Function&&!k.tagJsType&&(V&&k.toString()===V.toString()?k=h.value:(a.underFunction=k,k=k()));const $=h.tagJsVar.processUpdate(k,h,A,S);return h.value=k,m.value=p,wt(),$}},withinOwnerElement:!0,destroy$:new Z,render$:new Z};Pt(a);let c=n();on(c)&&!c.tagJsType&&(a.underFunction=c,c=c());const h=Fd(c,a,t,r,s);return e.contexts.push(a),a.subContext=h,wt(),h}function Ud(n,t,e,r,s){n.forEach(i=>{switch(typeof i){case"string":case"boolean":case"number":return Hu(i,r,s);case"function":{if(i.tagJsType==="element")break;return _T(i,r,t,e,s)}}if(i==null)return Hu(i,r,s);if(i.tagJsType==="element"){const c=Bd(i,t,e,t.contexts);Kt.push([s,[r,c]]),t.htmlDomMeta.push({nn:c.tagName,domElement:c,at:[]});return}return Fd(i,t,r,e,s)})}function Fd(n,t,e,r,s){const i=Ii(n,[],!0,t);if(t.contexts.push(i),i.target=e,i.placeholder=document.createTextNode(""),Kt.push([s,[e,i.placeholder]]),Pt(i),i.inputsHandler){const c=r.propsConfig;i.inputsHandler(c)}return i.tagJsVar.processInit(n,i,r,i.placeholder),wt(),i}function Hu(n,t,e){const r=Ti(n),s=document.createTextNode(r);return Kt.push([e,[t,s]]),s}function Bd(n,t,e,r){const s=n.tagName,i=document.createElement(s);t.target=i;const a=n.attributes;for(let l=0;l<a.length;++l){const h=a[l],f=h[0];typeof f=="string"&&(h[2]=Ei(f,s))}mT(a,[],i,e,t),Ud(n.innerHTML,t,e,i,ma);const c=n.listeners;for(let l=0;l<c.length;++l)yT(n,l,e,c[l],i);return i}function yT(n,t,e,r,s){const i=r[0],a=(...c)=>{const h=n.listeners[t][1],f=yi(e),p=f.context,m=p.updateCount;p.locked=1,++st.locks,Pt(p);const A=h(...c);return--st.locks,delete p.locked,wt(),m===p.updateCount?kd(A,f):(Ht(),zn(A)?A.then(()=>{const k=f.context.state.newest;return iy(k),"promise-no-data-ever"}):"no-data-ever")};Pd(e.appSupport,i,s,a)}function TT(n,t,e,r){t.contexts=t.contexts||[],t.htmlDomMeta=[],t.locked=34;const s=Bd(n,t,e,t.contexts);delete t.locked;const i=[ga,[r,s,"htmlTag.processInit"]];Kt.push(i),t.paintCommands=[i],sn.push([()=>{delete t.paintCommands},[]]);const a={nn:n.tagName,domElement:s,at:n.attributes};return t.htmlDomMeta=[a],s}function O(n){const e=Qr({component:!1,tagJsType:"element",processInitAttribute:Ot,processInit:TT,destroy:Cd,processUpdate:Sd,hasValueChanged:Va,tagName:n,innerHTML:[],attributes:[],contentId:0,listeners:[],allListeners:[],elementFunctions:Hs},Hs);return e.tagName=n,e}function Qr(n,t){const e=function r(...s){const i={...r};i.attributes=En(r.attributes),i.listeners=En(r.listeners),i.allListeners=En(r.allListeners);let a=i.contexts;i.innerHTML=s;for(let c=0;c<s.length;++c){const l=s[c];if(Nr(l)){if(l.tagJsType==="element"){zu(i.allListeners,l.allListeners),l.contexts&&(a||(a=[],i.contexts=a),zu(a,l.contexts),++i.contentId);continue}a||(a=[],i.contexts=a),a.push(l)}}return i};return Object.assign(e,n),ET(e,t(e)),e.attributes=En(n.attributes),e.listeners=En(n.listeners),e.allListeners=En(n.allListeners),e.toString=function(){return Ky(this)},e}function En(n){return n.length?n.slice():[]}function zu(n,t){for(let e=0;e<t.length;++e)n.push(t[e])}function ET(n,t){for(const e in t){const r=t[e];try{n[e]=r}catch{Object.defineProperty(n,e,{value:r,writable:!0,configurable:!0,enumerable:!1})}}}const zC=wT();function wT(){const t=Qr({component:!1,tagJsType:"element",processInitAttribute:Ot,processInit:IT,destroy:AT,processUpdate:Sd,hasValueChanged:Va,tagName:"no-element",innerHTML:[],attributes:[],contentId:0,listeners:[],allListeners:[],elementFunctions:Hs},Hs);return t.tagName="no-element",t}function IT(n,t,e,r){t.contexts=t.contexts||[],t.htmlDomMeta=[],Ud(n.innerHTML,t,e,r,ga)}function AT(n,t){++n.updateCount;const e=n.contexts,r=[];if(e.length&&(Ws(e,t,r),e.length=0,r.length)){const s=n.htmlDomMeta;return Promise.all(r).then(()=>{++st.locks,Vr(s),--st.locks,Ht()})}}const Wu=O("button"),WC=O("select"),JC=O("option"),GC=O("optgroup"),KC=O("input"),QC=O("textarea");O("html");O("head");O("title");O("meta");O("link");O("style");O("body");O("script");O("noscript");O("hr");const XC=O("h1"),Ju=O("h2");O("h3");O("h4");O("h5");O("h6");O("ol");O("ul");O("li");const Gu=O("div"),YC=O("main"),Io=O("section"),ZC=O("header");O("footer");O("form");O("fieldset");O("legend");const tS=O("dialog"),eS=O("pre"),nS=O("table"),rS=O("tr"),sS=O("td"),iS=O("th"),oS=O("thead"),aS=O("tbody");O("tfoot");O("iframe");const cS=O("a");O("u");const uS=O("img");O("br");const lS=O("label"),Ao=O("p");O("small");const hS=O("span"),dS=O("strong");O("b");O("sup");O("nav");O("figure");O("figcaption");O("code");O("canvas");O("svg");O("path");O("polygon");O("rect");O("details");O("summary");const vT=()=>{};var Ku={};/**
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
 */const jd=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},bT=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[e++];t[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[e++],a=n[e++],c=n[e++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(l>>10)),t[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[e++],a=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return t.join("")},$d={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,l=s+2<n.length,h=l?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let m=(c&15)<<2|h>>6,A=h&63;l||(A=64,a||(m=64)),r.push(e[f],e[p],e[m],e[A])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(jd(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):bT(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=e[n.charAt(s++)],c=s<n.length?e[n.charAt(s)]:0;++s;const h=s<n.length?e[n.charAt(s)]:64;++s;const p=s<n.length?e[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new CT;const m=i<<2|c>>4;if(r.push(m),h!==64){const A=c<<4&240|h>>2;if(r.push(A),p!==64){const S=h<<6&192|p;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class CT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ST=function(n){const t=jd(n);return $d.encodeByteArray(t,!0)},Js=function(n){return ST(n).replace(/\./g,"")},qd=function(n){try{return $d.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function RT(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const PT=()=>RT().__FIREBASE_DEFAULTS__,kT=()=>{if(typeof process>"u"||typeof Ku>"u")return;const n=Ku.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},VT=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&qd(n[1]);return t&&JSON.parse(t)},Ci=()=>{try{return vT()||PT()||kT()||VT()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Hd=n=>{var t,e;return(e=(t=Ci())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},DT=n=>{const t=Hd(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},zd=()=>{var n;return(n=Ci())==null?void 0:n.config},Wd=n=>{var t;return(t=Ci())==null?void 0:t[`_${n}`]};/**
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
 */class NT{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
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
 */function Wn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Jd(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function OT(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Js(JSON.stringify(e)),Js(JSON.stringify(a)),""].join(".")}const Ar={};function MT(){const n={prod:[],emulator:[]};for(const t of Object.keys(Ar))Ar[t]?n.emulator.push(t):n.prod.push(t);return n}function LT(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let Qu=!1;function Gd(n,t){if(typeof window>"u"||typeof document>"u"||!Wn(window.location.host)||Ar[n]===t||Ar[n]||Qu)return;Ar[n]=t;function e(m){return`__firebase__banner__${m}`}const r="__firebase__banner",i=MT().prod.length>0;function a(){const m=document.getElementById(r);m&&m.remove()}function c(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function l(m,A){m.setAttribute("width","24"),m.setAttribute("id",A),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function h(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{Qu=!0,a()},m}function f(m,A){m.setAttribute("id",A),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function p(){const m=LT(r),A=e("text"),S=document.getElementById(A)||document.createElement("span"),k=e("learnmore"),V=document.getElementById(k)||document.createElement("a"),$=e("preprendIcon"),F=document.getElementById($)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const K=m.element;c(K),f(V,k);const lt=h();l(F,$),K.append(F,S,V,lt),document.body.appendChild(K)}i?(S.innerText="Preview backend disconnected.",F.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(F.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function kt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function xT(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(kt())}function UT(){var t;const n=(t=Ci())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function FT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function BT(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function jT(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function $T(){const n=kt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function qT(){return!UT()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function HT(){try{return typeof indexedDB=="object"}catch{return!1}}function zT(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var i;t(((i=s.error)==null?void 0:i.message)||"")}}catch(e){t(e)}})}/**
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
 */const WT="FirebaseError";class we extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=WT,Object.setPrototypeOf(this,we.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Xr.prototype.create)}}class Xr{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,i=this.errors[t],a=i?JT(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new we(s,c,r)}}function JT(n,t){return n.replace(GT,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const GT=/\{\$([^}]+)}/g;function KT(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}function an(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const i=n[s],a=t[s];if(Xu(i)&&Xu(a)){if(!an(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function Xu(n){return n!==null&&typeof n=="object"}/**
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
 */function Yr(n){const t=[];for(const[e,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(s))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function QT(n,t){const e=new XT(n,t);return e.subscribe.bind(e)}class XT{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,r){let s;if(t===void 0&&e===void 0&&r===void 0)throw new Error("Missing Observer.");YT(t,["next","error","complete"])?s=t:s={next:t,error:e,complete:r},s.next===void 0&&(s.next=vo),s.error===void 0&&(s.error=vo),s.complete===void 0&&(s.complete=vo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function YT(n,t){if(typeof n!="object"||n===null)return!1;for(const e of t)if(e in n&&typeof n[e]=="function")return!0;return!1}function vo(){}/**
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
 */function It(n){return n&&n._delegate?n._delegate:n}class cn{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const en="[DEFAULT]";/**
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
 */class ZT{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new NT;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(eE(t))try{this.getOrInitializeService({instanceIdentifier:en})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(t=en){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=en){return this.instances.has(t)}getOptions(t=en){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&t(i,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:tE(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=en){return this.component?this.component.multipleInstances?t:en:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function tE(n){return n===en?void 0:n}function eE(n){return n.instantiationMode==="EAGER"}/**
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
 */class nE{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new ZT(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var H;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(H||(H={}));const rE={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},sE=H.INFO,iE={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},oE=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=iE[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Da{constructor(t){this.name=t,this._logLevel=sE,this._logHandler=oE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in H))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?rE[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...t),this._logHandler(this,H.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...t),this._logHandler(this,H.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,H.INFO,...t),this._logHandler(this,H.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,H.WARN,...t),this._logHandler(this,H.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...t),this._logHandler(this,H.ERROR,...t)}}const aE=(n,t)=>t.some(e=>n instanceof e);let Yu,Zu;function cE(){return Yu||(Yu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function uE(){return Zu||(Zu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Kd=new WeakMap,qo=new WeakMap,Qd=new WeakMap,bo=new WeakMap,Na=new WeakMap;function lE(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{e(Oe(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&Kd.set(e,n)}).catch(()=>{}),Na.set(t,n),t}function hE(n){if(qo.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{e(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});qo.set(n,t)}let Ho={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return qo.get(n);if(t==="objectStoreNames")return n.objectStoreNames||Qd.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Oe(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function dE(n){Ho=n(Ho)}function fE(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(Co(this),t,...e);return Qd.set(r,t.sort?t.sort():[t]),Oe(r)}:uE().includes(n)?function(...t){return n.apply(Co(this),t),Oe(Kd.get(this))}:function(...t){return Oe(n.apply(Co(this),t))}}function pE(n){return typeof n=="function"?fE(n):(n instanceof IDBTransaction&&hE(n),aE(n,cE())?new Proxy(n,Ho):n)}function Oe(n){if(n instanceof IDBRequest)return lE(n);if(bo.has(n))return bo.get(n);const t=pE(n);return t!==n&&(bo.set(n,t),Na.set(t,n)),t}const Co=n=>Na.get(n);function gE(n,t,{blocked:e,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,t),c=Oe(a);return r&&a.addEventListener("upgradeneeded",l=>{r(Oe(a.result),l.oldVersion,l.newVersion,Oe(a.transaction),l)}),e&&a.addEventListener("blocked",l=>e(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const mE=["get","getKey","getAll","getAllKeys","count"],_E=["put","add","delete","clear"],So=new Map;function tl(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(So.get(t))return So.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=_E.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||mE.includes(e)))return;const i=async function(a,...c){const l=this.transaction(a,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[e](...c),s&&l.done]))[0]};return So.set(t,i),i}dE(n=>({...n,get:(t,e,r)=>tl(t,e)||n.get(t,e,r),has:(t,e)=>!!tl(t,e)||n.has(t,e)}));/**
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
 */class yE{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(TE(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function TE(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const zo="@firebase/app",el="0.14.6";/**
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
 */const _e=new Da("@firebase/app"),EE="@firebase/app-compat",wE="@firebase/analytics-compat",IE="@firebase/analytics",AE="@firebase/app-check-compat",vE="@firebase/app-check",bE="@firebase/auth",CE="@firebase/auth-compat",SE="@firebase/database",RE="@firebase/data-connect",PE="@firebase/database-compat",kE="@firebase/functions",VE="@firebase/functions-compat",DE="@firebase/installations",NE="@firebase/installations-compat",OE="@firebase/messaging",ME="@firebase/messaging-compat",LE="@firebase/performance",xE="@firebase/performance-compat",UE="@firebase/remote-config",FE="@firebase/remote-config-compat",BE="@firebase/storage",jE="@firebase/storage-compat",$E="@firebase/firestore",qE="@firebase/ai",HE="@firebase/firestore-compat",zE="firebase",WE="12.6.0";/**
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
 */const Wo="[DEFAULT]",JE={[zo]:"fire-core",[EE]:"fire-core-compat",[IE]:"fire-analytics",[wE]:"fire-analytics-compat",[vE]:"fire-app-check",[AE]:"fire-app-check-compat",[bE]:"fire-auth",[CE]:"fire-auth-compat",[SE]:"fire-rtdb",[RE]:"fire-data-connect",[PE]:"fire-rtdb-compat",[kE]:"fire-fn",[VE]:"fire-fn-compat",[DE]:"fire-iid",[NE]:"fire-iid-compat",[OE]:"fire-fcm",[ME]:"fire-fcm-compat",[LE]:"fire-perf",[xE]:"fire-perf-compat",[UE]:"fire-rc",[FE]:"fire-rc-compat",[BE]:"fire-gcs",[jE]:"fire-gcs-compat",[$E]:"fire-fst",[HE]:"fire-fst-compat",[qE]:"fire-vertex","fire-js":"fire-js",[zE]:"fire-js-all"};/**
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
 */const Gs=new Map,GE=new Map,Jo=new Map;function nl(n,t){try{n.container.addComponent(t)}catch(e){_e.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Mn(n){const t=n.name;if(Jo.has(t))return _e.debug(`There were multiple attempts to register component ${t}.`),!1;Jo.set(t,n);for(const e of Gs.values())nl(e,n);for(const e of GE.values())nl(e,n);return!0}function Oa(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function zt(n){return n==null?!1:n.settings!==void 0}/**
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
 */const KE={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Me=new Xr("app","Firebase",KE);/**
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
 */class QE{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new cn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Me.create("app-deleted",{appName:this._name})}}/**
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
 */const Jn=WE;function Xd(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:Wo,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw Me.create("bad-app-name",{appName:String(s)});if(e||(e=zd()),!e)throw Me.create("no-options");const i=Gs.get(s);if(i){if(an(e,i.options)&&an(r,i.config))return i;throw Me.create("duplicate-app",{appName:s})}const a=new nE(s);for(const l of Jo.values())a.addComponent(l);const c=new QE(e,r,a);return Gs.set(s,c),c}function Yd(n=Wo){const t=Gs.get(n);if(!t&&n===Wo&&zd())return Xd();if(!t)throw Me.create("no-app",{appName:n});return t}function Le(n,t,e){let r=JE[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${t}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),_e.warn(a.join(" "));return}Mn(new cn(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
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
 */const XE="firebase-heartbeat-database",YE=1,Or="firebase-heartbeat-store";let Ro=null;function Zd(){return Ro||(Ro=gE(XE,YE,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Or)}catch(e){console.warn(e)}}}}).catch(n=>{throw Me.create("idb-open",{originalErrorMessage:n.message})})),Ro}async function ZE(n){try{const e=(await Zd()).transaction(Or),r=await e.objectStore(Or).get(tf(n));return await e.done,r}catch(t){if(t instanceof we)_e.warn(t.message);else{const e=Me.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});_e.warn(e.message)}}}async function rl(n,t){try{const r=(await Zd()).transaction(Or,"readwrite");await r.objectStore(Or).put(t,tf(n)),await r.done}catch(e){if(e instanceof we)_e.warn(e.message);else{const r=Me.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});_e.warn(r.message)}}}function tf(n){return`${n.name}!${n.options.appId}`}/**
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
 */const tw=1024,ew=30;class nw{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new sw(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=sl();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>ew){const a=iw(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){_e.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=sl(),{heartbeatsToSend:r,unsentEntries:s}=rw(this._heartbeatsCache.heartbeats),i=Js(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return _e.warn(e),""}}}function sl(){return new Date().toISOString().substring(0,10)}function rw(n,t=tw){const e=[];let r=n.slice();for(const s of n){const i=e.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),il(e)>t){i.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),il(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class sw{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return HT()?zT().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await ZE(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return rl(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return rl(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function il(n){return Js(JSON.stringify({version:2,heartbeats:n})).length}function iw(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
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
 */function ow(n){Mn(new cn("platform-logger",t=>new yE(t),"PRIVATE")),Mn(new cn("heartbeat",t=>new nw(t),"PRIVATE")),Le(zo,el,n),Le(zo,el,"esm2020"),Le("fire-js","")}ow("");var aw="firebase",cw="12.7.0";/**
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
 */Le(aw,cw,"app");function ef(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const uw=ef,nf=new Xr("auth","Firebase",ef());/**
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
 */const Ks=new Da("@firebase/auth");function lw(n,...t){Ks.logLevel<=H.WARN&&Ks.warn(`Auth (${Jn}): ${n}`,...t)}function Vs(n,...t){Ks.logLevel<=H.ERROR&&Ks.error(`Auth (${Jn}): ${n}`,...t)}/**
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
 */function ae(n,...t){throw La(n,...t)}function Qt(n,...t){return La(n,...t)}function Ma(n,t,e){const r={...uw(),[t]:e};return new Xr("auth","Firebase",r).create(t,{appName:n.name})}function xe(n){return Ma(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function rf(n,t,e){const r=e;if(!(t instanceof r))throw r.name!==t.constructor.name&&ae(n,"argument-error"),Ma(n,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function La(n,...t){if(typeof n!="string"){const e=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(e,...r)}return nf.create(n,...t)}function B(n,t,...e){if(!n)throw La(t,...e)}function de(n){const t="INTERNAL ASSERTION FAILED: "+n;throw Vs(t),new Error(t)}function ye(n,t){n||de(t)}/**
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
 */function Go(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function hw(){return ol()==="http:"||ol()==="https:"}function ol(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
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
 */function dw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(hw()||BT()||"connection"in navigator)?navigator.onLine:!0}function fw(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Zr{constructor(t,e){this.shortDelay=t,this.longDelay=e,ye(e>t,"Short delay should be less than long delay!"),this.isMobile=xT()||jT()}get(){return dw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function xa(n,t){ye(n.emulator,"Emulator should always be set here");const{url:e}=n.emulator;return t?`${e}${t.startsWith("/")?t.slice(1):t}`:e}/**
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
 */class sf{static initialize(t,e,r){this.fetchImpl=t,e&&(this.headersImpl=e),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;de("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;de("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;de("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const pw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const gw=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],mw=new Zr(3e4,6e4);function Ua(n,t){return n.tenantId&&!t.tenantId?{...t,tenantId:n.tenantId}:t}async function Gn(n,t,e,r,s={}){return of(n,s,async()=>{let i={},a={};r&&(t==="GET"?a=r:i={body:JSON.stringify(r)});const c=Yr({key:n.config.apiKey,...a}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const h={method:t,headers:l,...i};return FT()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&Wn(n.emulatorConfig.host)&&(h.credentials="include"),sf.fetch()(await af(n,n.config.apiHost,e,c),h)})}async function of(n,t,e){n._canInitEmulator=!1;const r={...pw,...t};try{const s=new yw(n),i=await Promise.race([e(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw vs(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw vs(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw vs(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw vs(n,"user-disabled",a);const f=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Ma(n,f,h);ae(n,f)}}catch(s){if(s instanceof we)throw s;ae(n,"network-request-failed",{message:String(s)})}}async function _w(n,t,e,r,s={}){const i=await Gn(n,t,e,r,s);return"mfaPendingCredential"in i&&ae(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function af(n,t,e,r){const s=`${t}${e}?${r}`,i=n,a=i.config.emulator?xa(n.config,s):`${n.config.apiScheme}://${s}`;return gw.includes(e)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class yw{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((e,r)=>{this.timer=setTimeout(()=>r(Qt(this.auth,"network-request-failed")),mw.get())})}}function vs(n,t,e){const r={appName:n.name};e.email&&(r.email=e.email),e.phoneNumber&&(r.phoneNumber=e.phoneNumber);const s=Qt(n,t,r);return s.customData._tokenResponse=e,s}/**
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
 */async function Tw(n,t){return Gn(n,"POST","/v1/accounts:delete",t)}async function Qs(n,t){return Gn(n,"POST","/v1/accounts:lookup",t)}/**
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
 */function vr(n){if(n)try{const t=new Date(Number(n));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function Ew(n,t=!1){const e=It(n),r=await e.getIdToken(t),s=Fa(r);B(s&&s.exp&&s.auth_time&&s.iat,e.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:vr(Po(s.auth_time)),issuedAtTime:vr(Po(s.iat)),expirationTime:vr(Po(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Po(n){return Number(n)*1e3}function Fa(n){const[t,e,r]=n.split(".");if(t===void 0||e===void 0||r===void 0)return Vs("JWT malformed, contained fewer than 3 sections"),null;try{const s=qd(e);return s?JSON.parse(s):(Vs("Failed to decode base64 JWT payload"),null)}catch(s){return Vs("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function al(n){const t=Fa(n);return B(t,"internal-error"),B(typeof t.exp<"u","internal-error"),B(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
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
 */async function Mr(n,t,e=!1){if(e)return t;try{return await t}catch(r){throw r instanceof we&&ww(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function ww({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class Iw{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){if(t){const e=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),e}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Ko{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=vr(this.lastLoginAt),this.creationTime=vr(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Xs(n){var p;const t=n.auth,e=await n.getIdToken(),r=await Mr(n,Qs(t,{idToken:e}));B(r==null?void 0:r.users.length,t,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(p=s.providerUserInfo)!=null&&p.length?cf(s.providerUserInfo):[],a=vw(n.providerData,i),c=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),h=c?l:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Ko(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function Aw(n){const t=It(n);await Xs(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function vw(n,t){return[...n.filter(r=>!t.some(s=>s.providerId===r.providerId)),...t]}function cf(n){return n.map(({providerId:t,...e})=>({providerId:t,uid:e.rawId||"",displayName:e.displayName||null,email:e.email||null,phoneNumber:e.phoneNumber||null,photoURL:e.photoUrl||null}))}/**
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
 */async function bw(n,t){const e=await of(n,{},async()=>{const r=Yr({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await af(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return n.emulatorConfig&&Wn(n.emulatorConfig.host)&&(l.credentials="include"),sf.fetch()(a,l)});return{accessToken:e.access_token,expiresIn:e.expires_in,refreshToken:e.refresh_token}}async function Cw(n,t){return Gn(n,"POST","/v2/accounts:revokeToken",Ua(n,t))}/**
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
 */class kn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){B(t.idToken,"internal-error"),B(typeof t.idToken<"u","internal-error"),B(typeof t.refreshToken<"u","internal-error");const e="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):al(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}updateFromIdToken(t){B(t.length!==0,"internal-error");const e=al(t);this.updateTokensAndExpiration(t,null,e)}async getToken(t,e=!1){return!e&&this.accessToken&&!this.isExpired?this.accessToken:(B(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:r,refreshToken:s,expiresIn:i}=await bw(t,e);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(t,e,r){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(t,e){const{refreshToken:r,accessToken:s,expirationTime:i}=e,a=new kn;return r&&(B(typeof r=="string","internal-error",{appName:t}),a.refreshToken=r),s&&(B(typeof s=="string","internal-error",{appName:t}),a.accessToken=s),i&&(B(typeof i=="number","internal-error",{appName:t}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new kn,this.toJSON())}_performRefresh(){return de("not implemented")}}/**
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
 */function Re(n,t){B(typeof n=="string"||typeof n>"u","internal-error",{appName:t})}class Gt{constructor({uid:t,auth:e,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new Iw(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=e,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ko(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(t){const e=await Mr(this,this.stsTokenManager.getToken(this.auth,t));return B(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return Ew(this,t)}reload(){return Aw(this)}_assign(t){this!==t&&(B(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(e=>({...e})),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const e=new Gt({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return e.metadata._copy(this.metadata),e}_onReload(t){B(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let r=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),r=!0),e&&await Xs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(zt(this.auth.app))return Promise.reject(xe(this.auth));const t=await this.getIdToken();return await Mr(this,Tw(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>({...t})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){const r=e.displayName??void 0,s=e.email??void 0,i=e.phoneNumber??void 0,a=e.photoURL??void 0,c=e.tenantId??void 0,l=e._redirectEventId??void 0,h=e.createdAt??void 0,f=e.lastLoginAt??void 0,{uid:p,emailVerified:m,isAnonymous:A,providerData:S,stsTokenManager:k}=e;B(p&&k,t,"internal-error");const V=kn.fromJSON(this.name,k);B(typeof p=="string",t,"internal-error"),Re(r,t.name),Re(s,t.name),B(typeof m=="boolean",t,"internal-error"),B(typeof A=="boolean",t,"internal-error"),Re(i,t.name),Re(a,t.name),Re(c,t.name),Re(l,t.name),Re(h,t.name),Re(f,t.name);const $=new Gt({uid:p,auth:t,email:s,emailVerified:m,displayName:r,isAnonymous:A,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:V,createdAt:h,lastLoginAt:f});return S&&Array.isArray(S)&&($.providerData=S.map(F=>({...F}))),l&&($._redirectEventId=l),$}static async _fromIdTokenResponse(t,e,r=!1){const s=new kn;s.updateFromServerResponse(e);const i=new Gt({uid:e.localId,auth:t,stsTokenManager:s,isAnonymous:r});return await Xs(i),i}static async _fromGetAccountInfoResponse(t,e,r){const s=e.users[0];B(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?cf(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new kn;c.updateFromIdToken(r);const l=new Gt({uid:s.localId,auth:t,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Ko(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(l,h),l}}/**
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
 */const cl=new Map;function fe(n){ye(n instanceof Function,"Expected a class definition");let t=cl.get(n);return t?(ye(t instanceof n,"Instance stored in cache mismatched with class"),t):(t=new n,cl.set(n,t),t)}/**
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
 */class uf{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return e===void 0?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}uf.type="NONE";const ul=uf;/**
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
 */function Ds(n,t,e){return`firebase:${n}:${t}:${e}`}class Vn{constructor(t,e,r){this.persistence=t,this.auth=e,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Ds(this.userKey,s.apiKey,i),this.fullPersistenceKey=Ds("persistence",s.apiKey,i),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const e=await Qs(this.auth,{idToken:t}).catch(()=>{});return e?Gt._fromGetAccountInfoResponse(this.auth,e,t):null}return Gt._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,e)return this.setCurrentUser(e)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,r="authUser"){if(!e.length)return new Vn(fe(ul),t,r);const s=(await Promise.all(e.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||fe(ul);const a=Ds(r,t.config.apiKey,t.name);let c=null;for(const h of e)try{const f=await h._get(a);if(f){let p;if(typeof f=="string"){const m=await Qs(t,{idToken:f}).catch(()=>{});if(!m)break;p=await Gt._fromGetAccountInfoResponse(t,m,f)}else p=Gt._fromJSON(t,f);h!==i&&(c=p),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Vn(i,t,r):(i=l[0],c&&await i._set(a,c.toJSON()),await Promise.all(e.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new Vn(i,t,r))}}/**
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
 */function ll(n){const t=n.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(ff(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(lf(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(gf(t))return"Blackberry";if(mf(t))return"Webos";if(hf(t))return"Safari";if((t.includes("chrome/")||df(t))&&!t.includes("edge/"))return"Chrome";if(pf(t))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(e);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function lf(n=kt()){return/firefox\//i.test(n)}function hf(n=kt()){const t=n.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function df(n=kt()){return/crios\//i.test(n)}function ff(n=kt()){return/iemobile/i.test(n)}function pf(n=kt()){return/android/i.test(n)}function gf(n=kt()){return/blackberry/i.test(n)}function mf(n=kt()){return/webos/i.test(n)}function Ba(n=kt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Sw(n=kt()){var t;return Ba(n)&&!!((t=window.navigator)!=null&&t.standalone)}function Rw(){return $T()&&document.documentMode===10}function _f(n=kt()){return Ba(n)||pf(n)||mf(n)||gf(n)||/windows phone/i.test(n)||ff(n)}/**
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
 */function yf(n,t=[]){let e;switch(n){case"Browser":e=ll(kt());break;case"Worker":e=`${ll(kt())}-${n}`;break;default:e=n}const r=t.length?t.join(","):"FirebaseCore-web";return`${e}/JsCore/${Jn}/${r}`}/**
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
 */class Pw{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,e){const r=i=>new Promise((a,c)=>{try{const l=t(i);a(l)}catch(l){c(l)}});r.onAbort=e,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const e=[];try{for(const r of this.queue)await r(t),r.onAbort&&e.push(r.onAbort)}catch(r){e.reverse();for(const s of e)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function kw(n,t={}){return Gn(n,"GET","/v2/passwordPolicy",Ua(n,t))}/**
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
 */const Vw=6;class Dw{constructor(t){var r;const e=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=e.minPasswordLength??Vw,e.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=e.maxPasswordLength),e.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=e.containsLowercaseCharacter),e.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=e.containsUppercaseCharacter),e.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=e.containsNumericCharacter),e.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=e.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=t.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=t.forceUpgradeOnSignin??!1,this.schemaVersion=t.schemaVersion}validatePassword(t){const e={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,e),this.validatePasswordCharacterOptions(t,e),e.isValid&&(e.isValid=e.meetsMinPasswordLength??!0),e.isValid&&(e.isValid=e.meetsMaxPasswordLength??!0),e.isValid&&(e.isValid=e.containsLowercaseLetter??!0),e.isValid&&(e.isValid=e.containsUppercaseLetter??!0),e.isValid&&(e.isValid=e.containsNumericCharacter??!0),e.isValid&&(e.isValid=e.containsNonAlphanumericCharacter??!0),e}validatePasswordLengthOptions(t,e){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(e.meetsMinPasswordLength=t.length>=r),s&&(e.meetsMaxPasswordLength=t.length<=s)}validatePasswordCharacterOptions(t,e){this.updatePasswordCharacterOptionsStatuses(e,!1,!1,!1,!1);let r;for(let s=0;s<t.length;s++)r=t.charAt(s),this.updatePasswordCharacterOptionsStatuses(e,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(t,e,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=e)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=i))}}/**
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
 */class Nw{constructor(t,e,r,s){this.app=t,this.heartbeatServiceProvider=e,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new hl(this),this.idTokenSubscription=new hl(this),this.beforeStateQueue=new Pw(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=nf,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=fe(e)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Vn.create(this,t),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(e),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const e=await Qs(this,{idToken:t}),r=await Gt._fromGetAccountInfoResponse(this,e,t);await this.directlySetCurrentUser(r)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var i;if(zt(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const e=await this.assertedPersistence.getCurrentUser();let r=e,s=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=r==null?void 0:r._redirectEventId,l=await this.tryRedirectSignIn(t);(!a||a===c)&&(l!=null&&l.user)&&(r=l.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=e,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return B(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await Xs(t)}catch(e){if((e==null?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=fw()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(zt(this.app))return Promise.reject(xe(this));const e=t?It(t):null;return e&&B(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t,e=!1){if(!this._deleted)return t&&B(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),e||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return zt(this.app)?Promise.reject(xe(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return zt(this.app)?Promise.reject(xe(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(fe(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const e=this._getPasswordPolicyInternal();return e.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):e.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await kw(this),e=new Dw(t);this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new Xr("auth","Firebase",t())}onAuthStateChanged(t,e,r){return this.registerStateListener(this.authStateSubscription,t,e,r)}beforeAuthStateChanged(t,e){return this.beforeStateQueue.pushCallback(t,e)}onIdTokenChanged(t,e,r){return this.registerStateListener(this.idTokenSubscription,t,e,r)}authStateReady(){return new Promise((t,e)=>{if(this.currentUser)t();else{const r=this.onAuthStateChanged(()=>{r(),t()},e)}})}async revokeAccessToken(t){if(this.currentUser){const e=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:e};this.tenantId!=null&&(r.tenantId=this.tenantId),await Cw(this,r)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)==null?void 0:t.toJSON()}}async _setRedirectUser(t,e){const r=await this.getOrInitRedirectPersistenceManager(e);return t===null?r.removeCurrentUser():r.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&fe(t)||this._popupRedirectResolver;B(e,this,"argument-error"),this.redirectPersistenceManager=await Vn.create(this,[fe(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var e,r;return this._isInitialized&&await this.queue(async()=>{}),((e=this._currentUser)==null?void 0:e._redirectEventId)===t?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=((e=this.currentUser)==null?void 0:e.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,r,s){if(this._deleted)return()=>{};const i=typeof e=="function"?e:e.next.bind(e);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(B(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof e=="function"){const l=t.addObserver(e,r,s);return()=>{a=!0,l()}}else{const l=t.addObserver(e);return()=>{a=!0,l()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return B(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=yf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const e=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());e&&(t["X-Firebase-Client"]=e);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;if(zt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:e.getToken());return t!=null&&t.error&&lw(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Kn(n){return It(n)}class hl{constructor(t){this.auth=t,this.observer=null,this.addObserver=QT(e=>this.observer=e)}get next(){return B(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let ja={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Ow(n){ja=n}function Mw(n){return ja.loadJS(n)}function Lw(){return ja.gapiScript}function xw(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Uw(n,t){const e=Oa(n,"auth");if(e.isInitialized()){const s=e.getImmediate(),i=e.getOptions();if(an(i,t??{}))return s;ae(s,"already-initialized")}return e.initialize({options:t})}function Fw(n,t){const e=(t==null?void 0:t.persistence)||[],r=(Array.isArray(e)?e:[e]).map(fe);t!=null&&t.errorMap&&n._updateErrorMap(t.errorMap),n._initializeWithPersistence(r,t==null?void 0:t.popupRedirectResolver)}function Bw(n,t,e){const r=Kn(n);B(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=!1,i=Tf(t),{host:a,port:c}=jw(t),l=c===null?"":`:${c}`,h={url:`${i}//${a}${l}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){B(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),B(an(h,r.config.emulator)&&an(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Wn(a)?(Jd(`${i}//${a}${l}`),Gd("Auth",!0)):$w()}function Tf(n){const t=n.indexOf(":");return t<0?"":n.substr(0,t+1)}function jw(n){const t=Tf(n),e=/(\/\/)?([^?#/]+)/.exec(n.substr(t.length));if(!e)return{host:"",port:null};const r=e[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:dl(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:dl(a)}}}function dl(n){if(!n)return null;const t=Number(n);return isNaN(t)?null:t}function $w(){function n(){const t=document.createElement("p"),e=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",e.position="fixed",e.width="100%",e.backgroundColor="#ffffff",e.border=".1em solid #000000",e.color="#b50000",e.bottom="0px",e.left="0px",e.margin="0px",e.zIndex="10000",e.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Ef{constructor(t,e){this.providerId=t,this.signInMethod=e}toJSON(){return de("not implemented")}_getIdTokenResponse(t){return de("not implemented")}_linkToIdToken(t,e){return de("not implemented")}_getReauthenticationResolver(t){return de("not implemented")}}/**
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
 */async function Dn(n,t){return _w(n,"POST","/v1/accounts:signInWithIdp",Ua(n,t))}/**
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
 */const qw="http://localhost";class un extends Ef{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const e=new un(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(e.idToken=t.idToken),t.accessToken&&(e.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(e.nonce=t.nonce),t.pendingToken&&(e.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(e.accessToken=t.oauthToken,e.secret=t.oauthTokenSecret):ae("argument-error"),e}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t,{providerId:r,signInMethod:s,...i}=e;if(!r||!s)return null;const a=new un(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(t){const e=this.buildRequest();return Dn(t,e)}_linkToIdToken(t,e){const r=this.buildRequest();return r.idToken=e,Dn(t,r)}_getReauthenticationResolver(t){const e=this.buildRequest();return e.autoCreate=!1,Dn(t,e)}buildRequest(){const t={requestUri:qw,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const e={};this.idToken&&(e.id_token=this.idToken),this.accessToken&&(e.access_token=this.accessToken),this.secret&&(e.oauth_token_secret=this.secret),e.providerId=this.providerId,this.nonce&&!this.pendingToken&&(e.nonce=this.nonce),t.postBody=Yr(e)}return t}}/**
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
 */class Si{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ts extends Si{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
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
 */class Pe extends ts{constructor(){super("facebook.com")}static credential(t){return un._fromParams({providerId:Pe.PROVIDER_ID,signInMethod:Pe.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Pe.credentialFromTaggedObject(t)}static credentialFromError(t){return Pe.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Pe.credential(t.oauthAccessToken)}catch{return null}}}Pe.FACEBOOK_SIGN_IN_METHOD="facebook.com";Pe.PROVIDER_ID="facebook.com";/**
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
 */class he extends ts{constructor(){super("google.com"),this.addScope("profile")}static credential(t,e){return un._fromParams({providerId:he.PROVIDER_ID,signInMethod:he.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:e})}static credentialFromResult(t){return he.credentialFromTaggedObject(t)}static credentialFromError(t){return he.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:e,oauthAccessToken:r}=t;if(!e&&!r)return null;try{return he.credential(e,r)}catch{return null}}}he.GOOGLE_SIGN_IN_METHOD="google.com";he.PROVIDER_ID="google.com";/**
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
 */class ke extends ts{constructor(){super("github.com")}static credential(t){return un._fromParams({providerId:ke.PROVIDER_ID,signInMethod:ke.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return ke.credentialFromTaggedObject(t)}static credentialFromError(t){return ke.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return ke.credential(t.oauthAccessToken)}catch{return null}}}ke.GITHUB_SIGN_IN_METHOD="github.com";ke.PROVIDER_ID="github.com";/**
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
 */class Ve extends ts{constructor(){super("twitter.com")}static credential(t,e){return un._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:e})}static credentialFromResult(t){return Ve.credentialFromTaggedObject(t)}static credentialFromError(t){return Ve.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:e,oauthTokenSecret:r}=t;if(!e||!r)return null;try{return Ve.credential(e,r)}catch{return null}}}Ve.TWITTER_SIGN_IN_METHOD="twitter.com";Ve.PROVIDER_ID="twitter.com";/**
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
 */class Ln{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,e,r,s=!1){const i=await Gt._fromIdTokenResponse(t,r,s),a=fl(r);return new Ln({user:i,providerId:a,_tokenResponse:r,operationType:e})}static async _forOperation(t,e,r){await t._updateTokensIfNecessary(r,!0);const s=fl(r);return new Ln({user:t,providerId:s,_tokenResponse:r,operationType:e})}}function fl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Ys extends we{constructor(t,e,r,s){super(e.code,e.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Ys.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:e.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,e,r,s){return new Ys(t,e,r,s)}}function wf(n,t,e,r){return(t==="reauthenticate"?e._getReauthenticationResolver(n):e._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ys._fromErrorAndOperation(n,i,t,r):i})}async function Hw(n,t,e=!1){const r=await Mr(n,t._linkToIdToken(n.auth,await n.getIdToken()),e);return Ln._forOperation(n,"link",r)}/**
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
 */async function zw(n,t,e=!1){const{auth:r}=n;if(zt(r.app))return Promise.reject(xe(r));const s="reauthenticate";try{const i=await Mr(n,wf(r,s,t,n),e);B(i.idToken,r,"internal-error");const a=Fa(i.idToken);B(a,r,"internal-error");const{sub:c}=a;return B(n.uid===c,r,"user-mismatch"),Ln._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&ae(r,"user-mismatch"),i}}/**
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
 */async function Ww(n,t,e=!1){if(zt(n.app))return Promise.reject(xe(n));const r="signIn",s=await wf(n,r,t),i=await Ln._fromIdTokenResponse(n,r,s);return e||await n._updateCurrentUser(i.user),i}/**
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
 */function Jw(n,t){return It(n).setPersistence(t)}function Gw(n,t,e,r){return It(n).onIdTokenChanged(t,e,r)}function Kw(n,t,e){return It(n).beforeAuthStateChanged(t,e)}function Qw(n,t,e,r){return It(n).onAuthStateChanged(t,e,r)}function Xw(n){return It(n).signOut()}const Zs="__sak";/**
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
 */class If{constructor(t,e){this.storageRetriever=t,this.type=e}_isAvailable(){try{return this.storage?(this.storage.setItem(Zs,"1"),this.storage.removeItem(Zs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,e){return this.storage.setItem(t,JSON.stringify(e)),Promise.resolve()}_get(t){const e=this.storage.getItem(t);return Promise.resolve(e?JSON.parse(e):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Yw=1e3,Zw=10;class Af extends If{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,e)=>this.onStorageEvent(t,e),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=_f(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const e of Object.keys(this.listeners)){const r=this.storage.getItem(e),s=this.localCache[e];r!==s&&t(e,s,r)}}onStorageEvent(t,e=!1){if(!t.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const r=t.key;e?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!e&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);Rw()&&i!==t.newValue&&t.newValue!==t.oldValue?setTimeout(s,Zw):s()}notifyListeners(t,e){this.localCache[t]=e;const r=this.listeners[t];if(r)for(const s of Array.from(r))s(e&&JSON.parse(e))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,e,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:e,newValue:r}),!0)})},Yw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,e){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,e){await super._set(t,e),this.localCache[t]=JSON.stringify(e)}async _get(t){const e=await super._get(t);return this.localCache[t]=JSON.stringify(e),e}async _remove(t){await super._remove(t),delete this.localCache[t]}}Af.type="LOCAL";const vf=Af;/**
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
 */class bf extends If{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,e){}_removeListener(t,e){}}bf.type="SESSION";const $a=bf;/**
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
 */function tI(n){return Promise.all(n.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(e){return{fulfilled:!1,reason:e}}}))}/**
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
 */class Ri{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find(s=>s.isListeningto(t));if(e)return e;const r=new Ri(t);return this.receivers.push(r),r}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:r,eventType:s,data:i}=e.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;e.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async h=>h(e.origin,i)),l=await tI(c);e.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(t,e){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),(!e||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ri.receivers=[];/**
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
 */function qa(n="",t=10){let e="";for(let r=0;r<t;r++)e+=Math.floor(Math.random()*10);return n+e}/**
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
 */class eI{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,l)=>{const h=qa("",20);s.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const m=p;if(m.data.eventId===h)switch(m.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(m.data.response);break;default:clearTimeout(f),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:t,eventId:h,data:e},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function ne(){return window}function nI(n){ne().location.href=n}/**
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
 */function Cf(){return typeof ne().WorkerGlobalScope<"u"&&typeof ne().importScripts=="function"}async function rI(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function sI(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function iI(){return Cf()?self:null}/**
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
 */const Sf="firebaseLocalStorageDb",oI=1,ti="firebaseLocalStorage",Rf="fbase_key";class es{constructor(t){this.request=t}toPromise(){return new Promise((t,e)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{e(this.request.error)})})}}function Pi(n,t){return n.transaction([ti],t?"readwrite":"readonly").objectStore(ti)}function aI(){const n=indexedDB.deleteDatabase(Sf);return new es(n).toPromise()}function Qo(){const n=indexedDB.open(Sf,oI);return new Promise((t,e)=>{n.addEventListener("error",()=>{e(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ti,{keyPath:Rf})}catch(s){e(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ti)?t(r):(r.close(),await aI(),t(await Qo()))})})}async function pl(n,t,e){const r=Pi(n,!0).put({[Rf]:t,value:e});return new es(r).toPromise()}async function cI(n,t){const e=Pi(n,!1).get(t),r=await new es(e).toPromise();return r===void 0?null:r.value}function gl(n,t){const e=Pi(n,!0).delete(t);return new es(e).toPromise()}const uI=800,lI=3;class Pf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Qo(),this.db)}async _withRetries(t){let e=0;for(;;)try{const r=await this._openDb();return await t(r)}catch(r){if(e++>lI)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Cf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ri._getInstance(iI()),this.receiver._subscribe("keyChanged",async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)})),this.receiver._subscribe("ping",async(t,e)=>["keyChanged"])}async initializeSender(){var e,r;if(this.activeServiceWorker=await rI(),!this.activeServiceWorker)return;this.sender=new eI(this.activeServiceWorker);const t=await this.sender._send("ping",{},800);t&&(e=t[0])!=null&&e.fulfilled&&(r=t[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||sI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await Qo();return await pl(t,Zs,"1"),await gl(t,Zs),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite(async()=>(await this._withRetries(r=>pl(r,t,e)),this.localCache[t]=e,this.notifyServiceWorker(t)))}async _get(t){const e=await this._withRetries(r=>cI(r,t));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(e=>gl(e,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(s=>{const i=Pi(s,!1).getAll();return new es(i).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const e=[],r=new Set;if(t.length!==0)for(const{fbase_key:s,value:i}of t)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),e.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),e.push(s));return e}notifyListeners(t,e){this.localCache[t]=e;const r=this.listeners[t];if(r)for(const s of Array.from(r))s(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),uI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Pf.type="LOCAL";const kf=Pf;new Zr(3e4,6e4);/**
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
 */function Ha(n,t){return t?fe(t):(B(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class za extends Ef{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return Dn(t,this._buildIdpRequest())}_linkToIdToken(t,e){return Dn(t,this._buildIdpRequest(e))}_getReauthenticationResolver(t){return Dn(t,this._buildIdpRequest())}_buildIdpRequest(t){const e={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(e.idToken=t),e}}function hI(n){return Ww(n.auth,new za(n),n.bypassAuthState)}function dI(n){const{auth:t,user:e}=n;return B(e,t,"internal-error"),zw(e,new za(n),n.bypassAuthState)}async function fI(n){const{auth:t,user:e}=n;return B(e,t,"internal-error"),Hw(e,new za(n),n.bypassAuthState)}/**
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
 */class Vf{constructor(t,e,r,s,i=!1){this.auth=t,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(e)?e:[e]}execute(){return new Promise(async(t,e)=>{this.pendingPromise={resolve:t,reject:e};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(t){const{urlResponse:e,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=t;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:e,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return hI;case"linkViaPopup":case"linkViaRedirect":return fI;case"reauthViaPopup":case"reauthViaRedirect":return dI;default:ae(this.auth,"internal-error")}}resolve(t){ye(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){ye(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const pI=new Zr(2e3,1e4);async function gI(n,t,e){if(zt(n.app))return Promise.reject(Qt(n,"operation-not-supported-in-this-environment"));const r=Kn(n);rf(n,t,Si);const s=Ha(r,e);return new nn(r,"signInViaPopup",t,s).executeNotNull()}class nn extends Vf{constructor(t,e,r,s,i){super(t,e,s,i),this.provider=r,this.authWindow=null,this.pollId=null,nn.currentPopupAction&&nn.currentPopupAction.cancel(),nn.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return B(t,this.auth,"internal-error"),t}async onExecution(){ye(this.filter.length===1,"Popup operations only handle one event");const t=qa();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(Qt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)==null?void 0:t.associatedEvent)||null}cancel(){this.reject(Qt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,nn.currentPopupAction=null}pollUserCancellation(){const t=()=>{var e,r;if((r=(e=this.authWindow)==null?void 0:e.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Qt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,pI.get())};t()}}nn.currentPopupAction=null;/**
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
 */const mI="pendingRedirect",Ns=new Map;class _I extends Vf{constructor(t,e,r=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],e,void 0,r),this.eventId=null}async execute(){let t=Ns.get(this.auth._key());if(!t){try{const r=await yI(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(r)}catch(e){t=()=>Promise.reject(e)}Ns.set(this.auth._key(),t)}return this.bypassAuthState||Ns.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const e=await this.auth._redirectUserForId(t.eventId);if(e)return this.user=e,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function yI(n,t){const e=Nf(t),r=Df(n);if(!await r._isAvailable())return!1;const s=await r._get(e)==="true";return await r._remove(e),s}async function TI(n,t){return Df(n)._set(Nf(t),"true")}function EI(n,t){Ns.set(n._key(),t)}function Df(n){return fe(n._redirectPersistence)}function Nf(n){return Ds(mI,n.config.apiKey,n.name)}/**
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
 */function wI(n,t,e){return II(n,t,e)}async function II(n,t,e){if(zt(n.app))return Promise.reject(xe(n));const r=Kn(n);rf(n,t,Si),await r._initializationPromise;const s=Ha(r,e);return await TI(s,r),s._openRedirect(r,t,"signInViaRedirect")}async function AI(n,t){return await Kn(n)._initializationPromise,Of(n,t,!1)}async function Of(n,t,e=!1){if(zt(n.app))return Promise.reject(xe(n));const r=Kn(n),s=Ha(r,t),a=await new _I(r,s,e).execute();return a&&!e&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,t)),a}/**
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
 */const vI=600*1e3;class bI{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let e=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(t,r)&&(e=!0,this.sendToConsumer(t,r),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!CI(t)||(this.hasHandledPotentialRedirect=!0,e||(this.queuedRedirectEvent=t,e=!0)),e}sendToConsumer(t,e){var r;if(t.error&&!Mf(t)){const s=((r=t.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";e.onError(Qt(this.auth,s))}else e.onAuthEvent(t)}isEventForConsumer(t,e){const r=e.eventId===null||!!t.eventId&&t.eventId===e.eventId;return e.filter.includes(t.type)&&r}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=vI&&this.cachedEventUids.clear(),this.cachedEventUids.has(ml(t))}saveEventToCache(t){this.cachedEventUids.add(ml(t)),this.lastProcessedEventTime=Date.now()}}function ml(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(t=>t).join("-")}function Mf({type:n,error:t}){return n==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function CI(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Mf(n);default:return!1}}/**
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
 */async function SI(n,t={}){return Gn(n,"GET","/v1/projects",t)}/**
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
 */const RI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,PI=/^https?/;async function kI(n){if(n.config.emulator)return;const{authorizedDomains:t}=await SI(n);for(const e of t)try{if(VI(e))return}catch{}ae(n,"unauthorized-domain")}function VI(n){const t=Go(),{protocol:e,hostname:r}=new URL(t);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?e==="chrome-extension:"&&n.replace("chrome-extension://","")===t.replace("chrome-extension://",""):e==="chrome-extension:"&&a.hostname===r}if(!PI.test(e))return!1;if(RI.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const DI=new Zr(3e4,6e4);function _l(){const n=ne().___jsl;if(n!=null&&n.H){for(const t of Object.keys(n.H))if(n.H[t].r=n.H[t].r||[],n.H[t].L=n.H[t].L||[],n.H[t].r=[...n.H[t].L],n.CP)for(let e=0;e<n.CP.length;e++)n.CP[e]=null}}function NI(n){return new Promise((t,e)=>{var s,i,a;function r(){_l(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{_l(),e(Qt(n,"network-request-failed"))},timeout:DI.get()})}if((i=(s=ne().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)t(gapi.iframes.getContext());else if((a=ne().gapi)!=null&&a.load)r();else{const c=xw("iframefcb");return ne()[c]=()=>{gapi.load?r():e(Qt(n,"network-request-failed"))},Mw(`${Lw()}?onload=${c}`).catch(l=>e(l))}}).catch(t=>{throw Os=null,t})}let Os=null;function OI(n){return Os=Os||NI(n),Os}/**
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
 */const MI=new Zr(5e3,15e3),LI="__/auth/iframe",xI="emulator/auth/iframe",UI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},FI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function BI(n){const t=n.config;B(t.authDomain,n,"auth-domain-config-required");const e=t.emulator?xa(t,xI):`https://${n.config.authDomain}/${LI}`,r={apiKey:t.apiKey,appName:n.name,v:Jn},s=FI.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${e}?${Yr(r).slice(1)}`}async function jI(n){const t=await OI(n),e=ne().gapi;return B(e,n,"internal-error"),t.open({where:document.body,url:BI(n),messageHandlersFilter:e.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:UI,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Qt(n,"network-request-failed"),c=ne().setTimeout(()=>{i(a)},MI.get());function l(){ne().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(a)})}))}/**
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
 */const $I={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},qI=500,HI=600,zI="_blank",WI="http://localhost";class yl{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function JI(n,t,e,r=qI,s=HI){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l={...$I,width:r.toString(),height:s.toString(),top:i,left:a},h=kt().toLowerCase();e&&(c=df(h)?zI:e),lf(h)&&(t=t||WI,l.scrollbars="yes");const f=Object.entries(l).reduce((m,[A,S])=>`${m}${A}=${S},`,"");if(Sw(h)&&c!=="_self")return GI(t||"",c),new yl(null);const p=window.open(t||"",c,f);B(p,n,"popup-blocked");try{p.focus()}catch{}return new yl(p)}function GI(n,t){const e=document.createElement("a");e.href=n,e.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),e.dispatchEvent(r)}/**
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
 */const KI="__/auth/handler",QI="emulator/auth/handler",XI=encodeURIComponent("fac");async function Tl(n,t,e,r,s,i){B(n.config.authDomain,n,"auth-domain-config-required"),B(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:e,redirectUrl:r,v:Jn,eventId:s};if(t instanceof Si){t.setDefaultLanguage(n.languageCode),a.providerId=t.providerId||"",KT(t.getCustomParameters())||(a.customParameters=JSON.stringify(t.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(t instanceof ts){const f=t.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=await n._getAppCheckToken(),h=l?`#${XI}=${encodeURIComponent(l)}`:"";return`${YI(n)}?${Yr(c).slice(1)}${h}`}function YI({config:n}){return n.emulator?xa(n,QI):`https://${n.authDomain}/${KI}`}/**
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
 */const ko="webStorageSupport";class ZI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=$a,this._completeRedirectFn=Of,this._overrideRedirectResult=EI}async _openPopup(t,e,r,s){var a;ye((a=this.eventManagers[t._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await Tl(t,e,r,Go(),s);return JI(t,i,qa())}async _openRedirect(t,e,r,s){await this._originValidation(t);const i=await Tl(t,e,r,Go(),s);return nI(i),new Promise(()=>{})}_initialize(t){const e=t._key();if(this.eventManagers[e]){const{manager:s,promise:i}=this.eventManagers[e];return s?Promise.resolve(s):(ye(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(t);return this.eventManagers[e]={promise:r},r.catch(()=>{delete this.eventManagers[e]}),r}async initAndGetManager(t){const e=await jI(t),r=new bI(t);return e.register("authEvent",s=>(B(s==null?void 0:s.authEvent,t,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:r},this.iframes[t._key()]=e,r}_isIframeWebStorageSupported(t,e){this.iframes[t._key()].send(ko,{type:ko},s=>{var a;const i=(a=s==null?void 0:s[0])==null?void 0:a[ko];i!==void 0&&e(!!i),ae(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=kI(t)),this.originValidationPromises[e]}get _shouldInitProactively(){return _f()||hf()||Ba()}}const tA=ZI;var El="@firebase/auth",wl="1.12.0";/**
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
 */class eA{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)==null?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged(r=>{t((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){B(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function nA(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function rA(n){Mn(new cn("auth",(t,{options:e})=>{const r=t.getProvider("app").getImmediate(),s=t.getProvider("heartbeat"),i=t.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;B(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:yf(n)},h=new Nw(r,s,i,l);return Fw(h,e),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,r)=>{t.getProvider("auth-internal").initialize()})),Mn(new cn("auth-internal",t=>{const e=Kn(t.getProvider("auth").getImmediate());return(r=>new eA(r))(e)},"PRIVATE").setInstantiationMode("EXPLICIT")),Le(El,wl,nA(n)),Le(El,wl,"esm2020")}/**
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
 */const sA=300,iA=Wd("authIdTokenMaxAge")||sA;let Il=null;const oA=n=>async t=>{const e=t&&await t.getIdTokenResult(),r=e&&(new Date().getTime()-Date.parse(e.issuedAtTime))/1e3;if(r&&r>iA)return;const s=e==null?void 0:e.token;Il!==s&&(Il=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function aA(n=Yd()){const t=Oa(n,"auth");if(t.isInitialized())return t.getImmediate();const e=Uw(n,{popupRedirectResolver:tA,persistence:[kf,vf,$a]}),r=Wd("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=oA(i.toString());Kw(e,a,()=>a(e.currentUser)),Gw(e,c=>a(c))}}const s=Hd("auth");return s&&Bw(e,`http://${s}`),e}function cA(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Ow({loadJS(n){return new Promise((t,e)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=t,r.onerror=s=>{const i=Qt("internal-error");i.customData=s,e(i)},r.type="text/javascript",r.charset="UTF-8",cA().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});rA("Browser");var Al=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ue,Lf;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(w,_){function T(){}T.prototype=_.prototype,w.F=_.prototype,w.prototype=new T,w.prototype.constructor=w,w.D=function(I,E,b){for(var y=Array(arguments.length-2),Mt=2;Mt<arguments.length;Mt++)y[Mt-2]=arguments[Mt];return _.prototype[E].apply(I,y)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,_,T){T||(T=0);const I=Array(16);if(typeof _=="string")for(var E=0;E<16;++E)I[E]=_.charCodeAt(T++)|_.charCodeAt(T++)<<8|_.charCodeAt(T++)<<16|_.charCodeAt(T++)<<24;else for(E=0;E<16;++E)I[E]=_[T++]|_[T++]<<8|_[T++]<<16|_[T++]<<24;_=w.g[0],T=w.g[1],E=w.g[2];let b=w.g[3],y;y=_+(b^T&(E^b))+I[0]+3614090360&4294967295,_=T+(y<<7&4294967295|y>>>25),y=b+(E^_&(T^E))+I[1]+3905402710&4294967295,b=_+(y<<12&4294967295|y>>>20),y=E+(T^b&(_^T))+I[2]+606105819&4294967295,E=b+(y<<17&4294967295|y>>>15),y=T+(_^E&(b^_))+I[3]+3250441966&4294967295,T=E+(y<<22&4294967295|y>>>10),y=_+(b^T&(E^b))+I[4]+4118548399&4294967295,_=T+(y<<7&4294967295|y>>>25),y=b+(E^_&(T^E))+I[5]+1200080426&4294967295,b=_+(y<<12&4294967295|y>>>20),y=E+(T^b&(_^T))+I[6]+2821735955&4294967295,E=b+(y<<17&4294967295|y>>>15),y=T+(_^E&(b^_))+I[7]+4249261313&4294967295,T=E+(y<<22&4294967295|y>>>10),y=_+(b^T&(E^b))+I[8]+1770035416&4294967295,_=T+(y<<7&4294967295|y>>>25),y=b+(E^_&(T^E))+I[9]+2336552879&4294967295,b=_+(y<<12&4294967295|y>>>20),y=E+(T^b&(_^T))+I[10]+4294925233&4294967295,E=b+(y<<17&4294967295|y>>>15),y=T+(_^E&(b^_))+I[11]+2304563134&4294967295,T=E+(y<<22&4294967295|y>>>10),y=_+(b^T&(E^b))+I[12]+1804603682&4294967295,_=T+(y<<7&4294967295|y>>>25),y=b+(E^_&(T^E))+I[13]+4254626195&4294967295,b=_+(y<<12&4294967295|y>>>20),y=E+(T^b&(_^T))+I[14]+2792965006&4294967295,E=b+(y<<17&4294967295|y>>>15),y=T+(_^E&(b^_))+I[15]+1236535329&4294967295,T=E+(y<<22&4294967295|y>>>10),y=_+(E^b&(T^E))+I[1]+4129170786&4294967295,_=T+(y<<5&4294967295|y>>>27),y=b+(T^E&(_^T))+I[6]+3225465664&4294967295,b=_+(y<<9&4294967295|y>>>23),y=E+(_^T&(b^_))+I[11]+643717713&4294967295,E=b+(y<<14&4294967295|y>>>18),y=T+(b^_&(E^b))+I[0]+3921069994&4294967295,T=E+(y<<20&4294967295|y>>>12),y=_+(E^b&(T^E))+I[5]+3593408605&4294967295,_=T+(y<<5&4294967295|y>>>27),y=b+(T^E&(_^T))+I[10]+38016083&4294967295,b=_+(y<<9&4294967295|y>>>23),y=E+(_^T&(b^_))+I[15]+3634488961&4294967295,E=b+(y<<14&4294967295|y>>>18),y=T+(b^_&(E^b))+I[4]+3889429448&4294967295,T=E+(y<<20&4294967295|y>>>12),y=_+(E^b&(T^E))+I[9]+568446438&4294967295,_=T+(y<<5&4294967295|y>>>27),y=b+(T^E&(_^T))+I[14]+3275163606&4294967295,b=_+(y<<9&4294967295|y>>>23),y=E+(_^T&(b^_))+I[3]+4107603335&4294967295,E=b+(y<<14&4294967295|y>>>18),y=T+(b^_&(E^b))+I[8]+1163531501&4294967295,T=E+(y<<20&4294967295|y>>>12),y=_+(E^b&(T^E))+I[13]+2850285829&4294967295,_=T+(y<<5&4294967295|y>>>27),y=b+(T^E&(_^T))+I[2]+4243563512&4294967295,b=_+(y<<9&4294967295|y>>>23),y=E+(_^T&(b^_))+I[7]+1735328473&4294967295,E=b+(y<<14&4294967295|y>>>18),y=T+(b^_&(E^b))+I[12]+2368359562&4294967295,T=E+(y<<20&4294967295|y>>>12),y=_+(T^E^b)+I[5]+4294588738&4294967295,_=T+(y<<4&4294967295|y>>>28),y=b+(_^T^E)+I[8]+2272392833&4294967295,b=_+(y<<11&4294967295|y>>>21),y=E+(b^_^T)+I[11]+1839030562&4294967295,E=b+(y<<16&4294967295|y>>>16),y=T+(E^b^_)+I[14]+4259657740&4294967295,T=E+(y<<23&4294967295|y>>>9),y=_+(T^E^b)+I[1]+2763975236&4294967295,_=T+(y<<4&4294967295|y>>>28),y=b+(_^T^E)+I[4]+1272893353&4294967295,b=_+(y<<11&4294967295|y>>>21),y=E+(b^_^T)+I[7]+4139469664&4294967295,E=b+(y<<16&4294967295|y>>>16),y=T+(E^b^_)+I[10]+3200236656&4294967295,T=E+(y<<23&4294967295|y>>>9),y=_+(T^E^b)+I[13]+681279174&4294967295,_=T+(y<<4&4294967295|y>>>28),y=b+(_^T^E)+I[0]+3936430074&4294967295,b=_+(y<<11&4294967295|y>>>21),y=E+(b^_^T)+I[3]+3572445317&4294967295,E=b+(y<<16&4294967295|y>>>16),y=T+(E^b^_)+I[6]+76029189&4294967295,T=E+(y<<23&4294967295|y>>>9),y=_+(T^E^b)+I[9]+3654602809&4294967295,_=T+(y<<4&4294967295|y>>>28),y=b+(_^T^E)+I[12]+3873151461&4294967295,b=_+(y<<11&4294967295|y>>>21),y=E+(b^_^T)+I[15]+530742520&4294967295,E=b+(y<<16&4294967295|y>>>16),y=T+(E^b^_)+I[2]+3299628645&4294967295,T=E+(y<<23&4294967295|y>>>9),y=_+(E^(T|~b))+I[0]+4096336452&4294967295,_=T+(y<<6&4294967295|y>>>26),y=b+(T^(_|~E))+I[7]+1126891415&4294967295,b=_+(y<<10&4294967295|y>>>22),y=E+(_^(b|~T))+I[14]+2878612391&4294967295,E=b+(y<<15&4294967295|y>>>17),y=T+(b^(E|~_))+I[5]+4237533241&4294967295,T=E+(y<<21&4294967295|y>>>11),y=_+(E^(T|~b))+I[12]+1700485571&4294967295,_=T+(y<<6&4294967295|y>>>26),y=b+(T^(_|~E))+I[3]+2399980690&4294967295,b=_+(y<<10&4294967295|y>>>22),y=E+(_^(b|~T))+I[10]+4293915773&4294967295,E=b+(y<<15&4294967295|y>>>17),y=T+(b^(E|~_))+I[1]+2240044497&4294967295,T=E+(y<<21&4294967295|y>>>11),y=_+(E^(T|~b))+I[8]+1873313359&4294967295,_=T+(y<<6&4294967295|y>>>26),y=b+(T^(_|~E))+I[15]+4264355552&4294967295,b=_+(y<<10&4294967295|y>>>22),y=E+(_^(b|~T))+I[6]+2734768916&4294967295,E=b+(y<<15&4294967295|y>>>17),y=T+(b^(E|~_))+I[13]+1309151649&4294967295,T=E+(y<<21&4294967295|y>>>11),y=_+(E^(T|~b))+I[4]+4149444226&4294967295,_=T+(y<<6&4294967295|y>>>26),y=b+(T^(_|~E))+I[11]+3174756917&4294967295,b=_+(y<<10&4294967295|y>>>22),y=E+(_^(b|~T))+I[2]+718787259&4294967295,E=b+(y<<15&4294967295|y>>>17),y=T+(b^(E|~_))+I[9]+3951481745&4294967295,w.g[0]=w.g[0]+_&4294967295,w.g[1]=w.g[1]+(E+(y<<21&4294967295|y>>>11))&4294967295,w.g[2]=w.g[2]+E&4294967295,w.g[3]=w.g[3]+b&4294967295}r.prototype.v=function(w,_){_===void 0&&(_=w.length);const T=_-this.blockSize,I=this.C;let E=this.h,b=0;for(;b<_;){if(E==0)for(;b<=T;)s(this,w,b),b+=this.blockSize;if(typeof w=="string"){for(;b<_;)if(I[E++]=w.charCodeAt(b++),E==this.blockSize){s(this,I),E=0;break}}else for(;b<_;)if(I[E++]=w[b++],E==this.blockSize){s(this,I),E=0;break}}this.h=E,this.o+=_},r.prototype.A=function(){var w=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);w[0]=128;for(var _=1;_<w.length-8;++_)w[_]=0;_=this.o*8;for(var T=w.length-8;T<w.length;++T)w[T]=_&255,_/=256;for(this.v(w),w=Array(16),_=0,T=0;T<4;++T)for(let I=0;I<32;I+=8)w[_++]=this.g[T]>>>I&255;return w};function i(w,_){var T=c;return Object.prototype.hasOwnProperty.call(T,w)?T[w]:T[w]=_(w)}function a(w,_){this.h=_;const T=[];let I=!0;for(let E=w.length-1;E>=0;E--){const b=w[E]|0;I&&b==_||(T[E]=b,I=!1)}this.g=T}var c={};function l(w){return-128<=w&&w<128?i(w,function(_){return new a([_|0],_<0?-1:0)}):new a([w|0],w<0?-1:0)}function h(w){if(isNaN(w)||!isFinite(w))return p;if(w<0)return V(h(-w));const _=[];let T=1;for(let I=0;w>=T;I++)_[I]=w/T|0,T*=4294967296;return new a(_,0)}function f(w,_){if(w.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(w.charAt(0)=="-")return V(f(w.substring(1),_));if(w.indexOf("-")>=0)throw Error('number format error: interior "-" character');const T=h(Math.pow(_,8));let I=p;for(let b=0;b<w.length;b+=8){var E=Math.min(8,w.length-b);const y=parseInt(w.substring(b,b+E),_);E<8?(E=h(Math.pow(_,E)),I=I.j(E).add(h(y))):(I=I.j(T),I=I.add(h(y)))}return I}var p=l(0),m=l(1),A=l(16777216);n=a.prototype,n.m=function(){if(k(this))return-V(this).m();let w=0,_=1;for(let T=0;T<this.g.length;T++){const I=this.i(T);w+=(I>=0?I:4294967296+I)*_,_*=4294967296}return w},n.toString=function(w){if(w=w||10,w<2||36<w)throw Error("radix out of range: "+w);if(S(this))return"0";if(k(this))return"-"+V(this).toString(w);const _=h(Math.pow(w,6));var T=this;let I="";for(;;){const E=lt(T,_).g;T=$(T,E.j(_));let b=((T.g.length>0?T.g[0]:T.h)>>>0).toString(w);if(T=E,S(T))return b+I;for(;b.length<6;)b="0"+b;I=b+I}},n.i=function(w){return w<0?0:w<this.g.length?this.g[w]:this.h};function S(w){if(w.h!=0)return!1;for(let _=0;_<w.g.length;_++)if(w.g[_]!=0)return!1;return!0}function k(w){return w.h==-1}n.l=function(w){return w=$(this,w),k(w)?-1:S(w)?0:1};function V(w){const _=w.g.length,T=[];for(let I=0;I<_;I++)T[I]=~w.g[I];return new a(T,~w.h).add(m)}n.abs=function(){return k(this)?V(this):this},n.add=function(w){const _=Math.max(this.g.length,w.g.length),T=[];let I=0;for(let E=0;E<=_;E++){let b=I+(this.i(E)&65535)+(w.i(E)&65535),y=(b>>>16)+(this.i(E)>>>16)+(w.i(E)>>>16);I=y>>>16,b&=65535,y&=65535,T[E]=y<<16|b}return new a(T,T[T.length-1]&-2147483648?-1:0)};function $(w,_){return w.add(V(_))}n.j=function(w){if(S(this)||S(w))return p;if(k(this))return k(w)?V(this).j(V(w)):V(V(this).j(w));if(k(w))return V(this.j(V(w)));if(this.l(A)<0&&w.l(A)<0)return h(this.m()*w.m());const _=this.g.length+w.g.length,T=[];for(var I=0;I<2*_;I++)T[I]=0;for(I=0;I<this.g.length;I++)for(let E=0;E<w.g.length;E++){const b=this.i(I)>>>16,y=this.i(I)&65535,Mt=w.i(E)>>>16,Ke=w.i(E)&65535;T[2*I+2*E]+=y*Ke,F(T,2*I+2*E),T[2*I+2*E+1]+=b*Ke,F(T,2*I+2*E+1),T[2*I+2*E+1]+=y*Mt,F(T,2*I+2*E+1),T[2*I+2*E+2]+=b*Mt,F(T,2*I+2*E+2)}for(w=0;w<_;w++)T[w]=T[2*w+1]<<16|T[2*w];for(w=_;w<2*_;w++)T[w]=0;return new a(T,0)};function F(w,_){for(;(w[_]&65535)!=w[_];)w[_+1]+=w[_]>>>16,w[_]&=65535,_++}function K(w,_){this.g=w,this.h=_}function lt(w,_){if(S(_))throw Error("division by zero");if(S(w))return new K(p,p);if(k(w))return _=lt(V(w),_),new K(V(_.g),V(_.h));if(k(_))return _=lt(w,V(_)),new K(V(_.g),_.h);if(w.g.length>30){if(k(w)||k(_))throw Error("slowDivide_ only works with positive integers.");for(var T=m,I=_;I.l(w)<=0;)T=Ut(T),I=Ut(I);var E=pt(T,1),b=pt(I,1);for(I=pt(I,2),T=pt(T,2);!S(I);){var y=b.add(I);y.l(w)<=0&&(E=E.add(T),b=y),I=pt(I,1),T=pt(T,1)}return _=$(w,E.j(_)),new K(E,_)}for(E=p;w.l(_)>=0;){for(T=Math.max(1,Math.floor(w.m()/_.m())),I=Math.ceil(Math.log(T)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),b=h(T),y=b.j(_);k(y)||y.l(w)>0;)T-=I,b=h(T),y=b.j(_);S(b)&&(b=m),E=E.add(b),w=$(w,y)}return new K(E,w)}n.B=function(w){return lt(this,w).h},n.and=function(w){const _=Math.max(this.g.length,w.g.length),T=[];for(let I=0;I<_;I++)T[I]=this.i(I)&w.i(I);return new a(T,this.h&w.h)},n.or=function(w){const _=Math.max(this.g.length,w.g.length),T=[];for(let I=0;I<_;I++)T[I]=this.i(I)|w.i(I);return new a(T,this.h|w.h)},n.xor=function(w){const _=Math.max(this.g.length,w.g.length),T=[];for(let I=0;I<_;I++)T[I]=this.i(I)^w.i(I);return new a(T,this.h^w.h)};function Ut(w){const _=w.g.length+1,T=[];for(let I=0;I<_;I++)T[I]=w.i(I)<<1|w.i(I-1)>>>31;return new a(T,w.h)}function pt(w,_){const T=_>>5;_%=32;const I=w.g.length-T,E=[];for(let b=0;b<I;b++)E[b]=_>0?w.i(b+T)>>>_|w.i(b+T+1)<<32-_:w.i(b+T);return new a(E,w.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Lf=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Ue=a}).apply(typeof Al<"u"?Al:typeof self<"u"?self:typeof window<"u"?window:{});var bs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var xf,yr,Uf,Ms,Xo,Ff,Bf,jf;(function(){var n,t=Object.defineProperty;function e(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof bs=="object"&&bs];for(var u=0;u<o.length;++u){var d=o[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=e(this);function s(o,u){if(u)t:{var d=r;o=o.split(".");for(var g=0;g<o.length-1;g++){var v=o[g];if(!(v in d))break t;d=d[v]}o=o[o.length-1],g=d[o],u=u(g),u!=g&&u!=null&&t(d,o,{configurable:!0,writable:!0,value:u})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(u){var d=[],g;for(g in u)Object.prototype.hasOwnProperty.call(u,g)&&d.push([g,u[g]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function c(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function l(o,u,d){return o.call.apply(o.bind,arguments)}function h(o,u,d){return h=l,h.apply(null,arguments)}function f(o,u){var d=Array.prototype.slice.call(arguments,1);return function(){var g=d.slice();return g.push.apply(g,arguments),o.apply(this,g)}}function p(o,u){function d(){}d.prototype=u.prototype,o.Z=u.prototype,o.prototype=new d,o.prototype.constructor=o,o.Ob=function(g,v,C){for(var D=Array(arguments.length-2),q=2;q<arguments.length;q++)D[q-2]=arguments[q];return u.prototype[v].apply(g,D)}}var m=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function A(o){const u=o.length;if(u>0){const d=Array(u);for(let g=0;g<u;g++)d[g]=o[g];return d}return[]}function S(o,u){for(let g=1;g<arguments.length;g++){const v=arguments[g];var d=typeof v;if(d=d!="object"?d:v?Array.isArray(v)?"array":d:"null",d=="array"||d=="object"&&typeof v.length=="number"){d=o.length||0;const C=v.length||0;o.length=d+C;for(let D=0;D<C;D++)o[d+D]=v[D]}else o.push(v)}}class k{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function V(o){a.setTimeout(()=>{throw o},0)}function $(){var o=w;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class F{constructor(){this.h=this.g=null}add(u,d){const g=K.get();g.set(u,d),this.h?this.h.next=g:this.g=g,this.h=g}}var K=new k(()=>new lt,o=>o.reset());class lt{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Ut,pt=!1,w=new F,_=()=>{const o=Promise.resolve(void 0);Ut=()=>{o.then(T)}};function T(){for(var o;o=$();){try{o.h.call(o.g)}catch(d){V(d)}var u=K;u.j(o),u.h<100&&(u.h++,o.next=u.g,u.g=o)}pt=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var b=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};a.addEventListener("test",d,u),a.removeEventListener("test",d,u)}catch{}return o})();function y(o){return/^[\s\xa0]*$/.test(o)}function Mt(o,u){E.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,u)}p(Mt,E),Mt.prototype.init=function(o,u){const d=this.type=o.type,g=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget,u||(d=="mouseover"?u=o.fromElement:d=="mouseout"&&(u=o.toElement)),this.relatedTarget=u,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&Mt.Z.h.call(this)},Mt.prototype.h=function(){Mt.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Ke="closure_listenable_"+(Math.random()*1e6|0),yg=0;function Tg(o,u,d,g,v){this.listener=o,this.proxy=null,this.src=u,this.type=d,this.capture=!!g,this.ha=v,this.key=++yg,this.da=this.fa=!1}function us(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function ls(o,u,d){for(const g in o)u.call(d,o[g],g,o)}function Eg(o,u){for(const d in o)u.call(void 0,o[d],d,o)}function kc(o){const u={};for(const d in o)u[d]=o[d];return u}const Vc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Dc(o,u){let d,g;for(let v=1;v<arguments.length;v++){g=arguments[v];for(d in g)o[d]=g[d];for(let C=0;C<Vc.length;C++)d=Vc[C],Object.prototype.hasOwnProperty.call(g,d)&&(o[d]=g[d])}}function hs(o){this.src=o,this.g={},this.h=0}hs.prototype.add=function(o,u,d,g,v){const C=o.toString();o=this.g[C],o||(o=this.g[C]=[],this.h++);const D=Qi(o,u,g,v);return D>-1?(u=o[D],d||(u.fa=!1)):(u=new Tg(u,this.src,C,!!g,v),u.fa=d,o.push(u)),u};function Ki(o,u){const d=u.type;if(d in o.g){var g=o.g[d],v=Array.prototype.indexOf.call(g,u,void 0),C;(C=v>=0)&&Array.prototype.splice.call(g,v,1),C&&(us(u),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Qi(o,u,d,g){for(let v=0;v<o.length;++v){const C=o[v];if(!C.da&&C.listener==u&&C.capture==!!d&&C.ha==g)return v}return-1}var Xi="closure_lm_"+(Math.random()*1e6|0),Yi={};function Nc(o,u,d,g,v){if(Array.isArray(u)){for(let C=0;C<u.length;C++)Nc(o,u[C],d,g,v);return null}return d=Lc(d),o&&o[Ke]?o.J(u,d,c(g)?!!g.capture:!1,v):wg(o,u,d,!1,g,v)}function wg(o,u,d,g,v,C){if(!u)throw Error("Invalid event type");const D=c(v)?!!v.capture:!!v;let q=to(o);if(q||(o[Xi]=q=new hs(o)),d=q.add(u,d,g,D,C),d.proxy)return d;if(g=Ig(),d.proxy=g,g.src=o,g.listener=d,o.addEventListener)b||(v=D),v===void 0&&(v=!1),o.addEventListener(u.toString(),g,v);else if(o.attachEvent)o.attachEvent(Mc(u.toString()),g);else if(o.addListener&&o.removeListener)o.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Ig(){function o(d){return u.call(o.src,o.listener,d)}const u=Ag;return o}function Oc(o,u,d,g,v){if(Array.isArray(u))for(var C=0;C<u.length;C++)Oc(o,u[C],d,g,v);else g=c(g)?!!g.capture:!!g,d=Lc(d),o&&o[Ke]?(o=o.i,C=String(u).toString(),C in o.g&&(u=o.g[C],d=Qi(u,d,g,v),d>-1&&(us(u[d]),Array.prototype.splice.call(u,d,1),u.length==0&&(delete o.g[C],o.h--)))):o&&(o=to(o))&&(u=o.g[u.toString()],o=-1,u&&(o=Qi(u,d,g,v)),(d=o>-1?u[o]:null)&&Zi(d))}function Zi(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[Ke])Ki(u.i,o);else{var d=o.type,g=o.proxy;u.removeEventListener?u.removeEventListener(d,g,o.capture):u.detachEvent?u.detachEvent(Mc(d),g):u.addListener&&u.removeListener&&u.removeListener(g),(d=to(u))?(Ki(d,o),d.h==0&&(d.src=null,u[Xi]=null)):us(o)}}}function Mc(o){return o in Yi?Yi[o]:Yi[o]="on"+o}function Ag(o,u){if(o.da)o=!0;else{u=new Mt(u,this);const d=o.listener,g=o.ha||o.src;o.fa&&Zi(o),o=d.call(g,u)}return o}function to(o){return o=o[Xi],o instanceof hs?o:null}var eo="__closure_events_fn_"+(Math.random()*1e9>>>0);function Lc(o){return typeof o=="function"?o:(o[eo]||(o[eo]=function(u){return o.handleEvent(u)}),o[eo])}function Ct(){I.call(this),this.i=new hs(this),this.M=this,this.G=null}p(Ct,I),Ct.prototype[Ke]=!0,Ct.prototype.removeEventListener=function(o,u,d,g){Oc(this,o,u,d,g)};function Vt(o,u){var d,g=o.G;if(g)for(d=[];g;g=g.G)d.push(g);if(o=o.M,g=u.type||u,typeof u=="string")u=new E(u,o);else if(u instanceof E)u.target=u.target||o;else{var v=u;u=new E(g,o),Dc(u,v)}v=!0;let C,D;if(d)for(D=d.length-1;D>=0;D--)C=u.g=d[D],v=ds(C,g,!0,u)&&v;if(C=u.g=o,v=ds(C,g,!0,u)&&v,v=ds(C,g,!1,u)&&v,d)for(D=0;D<d.length;D++)C=u.g=d[D],v=ds(C,g,!1,u)&&v}Ct.prototype.N=function(){if(Ct.Z.N.call(this),this.i){var o=this.i;for(const u in o.g){const d=o.g[u];for(let g=0;g<d.length;g++)us(d[g]);delete o.g[u],o.h--}}this.G=null},Ct.prototype.J=function(o,u,d,g){return this.i.add(String(o),u,!1,d,g)},Ct.prototype.K=function(o,u,d,g){return this.i.add(String(o),u,!0,d,g)};function ds(o,u,d,g){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();let v=!0;for(let C=0;C<u.length;++C){const D=u[C];if(D&&!D.da&&D.capture==d){const q=D.listener,gt=D.ha||D.src;D.fa&&Ki(o.i,D),v=q.call(gt,g)!==!1&&v}}return v&&!g.defaultPrevented}function vg(o,u){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=h(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(o,u||0)}function xc(o){o.g=vg(()=>{o.g=null,o.i&&(o.i=!1,xc(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class bg extends I{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:xc(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function nr(o){I.call(this),this.h=o,this.g={}}p(nr,I);var Uc=[];function Fc(o){ls(o.g,function(u,d){this.g.hasOwnProperty(d)&&Zi(u)},o),o.g={}}nr.prototype.N=function(){nr.Z.N.call(this),Fc(this)},nr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var no=a.JSON.stringify,Cg=a.JSON.parse,Sg=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function Bc(){}function jc(){}var rr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ro(){E.call(this,"d")}p(ro,E);function so(){E.call(this,"c")}p(so,E);var Qe={},$c=null;function fs(){return $c=$c||new Ct}Qe.Ia="serverreachability";function qc(o){E.call(this,Qe.Ia,o)}p(qc,E);function sr(o){const u=fs();Vt(u,new qc(u))}Qe.STAT_EVENT="statevent";function Hc(o,u){E.call(this,Qe.STAT_EVENT,o),this.stat=u}p(Hc,E);function Dt(o){const u=fs();Vt(u,new Hc(u,o))}Qe.Ja="timingevent";function zc(o,u){E.call(this,Qe.Ja,o),this.size=u}p(zc,E);function ir(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},u)}function or(){this.g=!0}or.prototype.ua=function(){this.g=!1};function Rg(o,u,d,g,v,C){o.info(function(){if(o.g)if(C){var D="",q=C.split("&");for(let Y=0;Y<q.length;Y++){var gt=q[Y].split("=");if(gt.length>1){const yt=gt[0];gt=gt[1];const te=yt.split("_");D=te.length>=2&&te[1]=="type"?D+(yt+"="+gt+"&"):D+(yt+"=redacted&")}}}else D=null;else D=C;return"XMLHTTP REQ ("+g+") [attempt "+v+"]: "+u+`
`+d+`
`+D})}function Pg(o,u,d,g,v,C,D){o.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+v+"]: "+u+`
`+d+`
`+C+" "+D})}function _n(o,u,d,g){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Vg(o,d)+(g?" "+g:"")})}function kg(o,u){o.info(function(){return"TIMEOUT: "+u})}or.prototype.info=function(){};function Vg(o,u){if(!o.g)return u;if(!u)return null;try{const C=JSON.parse(u);if(C){for(o=0;o<C.length;o++)if(Array.isArray(C[o])){var d=C[o];if(!(d.length<2)){var g=d[1];if(Array.isArray(g)&&!(g.length<1)){var v=g[0];if(v!="noop"&&v!="stop"&&v!="close")for(let D=1;D<g.length;D++)g[D]=""}}}}return no(C)}catch{return u}}var ps={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Wc={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Jc;function io(){}p(io,Bc),io.prototype.g=function(){return new XMLHttpRequest},Jc=new io;function ar(o){return encodeURIComponent(String(o))}function Dg(o){var u=1;o=o.split(":");const d=[];for(;u>0&&o.length;)d.push(o.shift()),u--;return o.length&&d.push(o.join(":")),d}function Ie(o,u,d,g){this.j=o,this.i=u,this.l=d,this.S=g||1,this.V=new nr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Gc}function Gc(){this.i=null,this.g="",this.h=!1}var Kc={},oo={};function ao(o,u,d){o.M=1,o.A=ms(Zt(u)),o.u=d,o.R=!0,Qc(o,null)}function Qc(o,u){o.F=Date.now(),gs(o),o.B=Zt(o.A);var d=o.B,g=o.S;Array.isArray(g)||(g=[String(g)]),uu(d.i,"t",g),o.C=0,d=o.j.L,o.h=new Gc,o.g=Su(o.j,d?u:null,!o.u),o.P>0&&(o.O=new bg(h(o.Y,o,o.g),o.P)),u=o.V,d=o.g,g=o.ba;var v="readystatechange";Array.isArray(v)||(v&&(Uc[0]=v.toString()),v=Uc);for(let C=0;C<v.length;C++){const D=Nc(d,v[C],g||u.handleEvent,!1,u.h||u);if(!D)break;u.g[D.key]=D}u=o.J?kc(o.J):{},o.u?(o.v||(o.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,u)):(o.v="GET",o.g.ea(o.B,o.v,null,u)),sr(),Rg(o.i,o.v,o.B,o.l,o.S,o.u)}Ie.prototype.ba=function(o){o=o.target;const u=this.O;u&&be(o)==3?u.j():this.Y(o)},Ie.prototype.Y=function(o){try{if(o==this.g)t:{const q=be(this.g),gt=this.g.ya(),Y=this.g.ca();if(!(q<3)&&(q!=3||this.g&&(this.h.h||this.g.la()||mu(this.g)))){this.K||q!=4||gt==7||(gt==8||Y<=0?sr(3):sr(2)),co(this);var u=this.g.ca();this.X=u;var d=Ng(this);if(this.o=u==200,Pg(this.i,this.v,this.B,this.l,this.S,q,u),this.o){if(this.U&&!this.L){e:{if(this.g){var g,v=this.g;if((g=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(g)){var C=g;break e}}C=null}if(o=C)_n(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,uo(this,o);else{this.o=!1,this.m=3,Dt(12),Xe(this),cr(this);break t}}if(this.R){o=!0;let yt;for(;!this.K&&this.C<d.length;)if(yt=Og(this,d),yt==oo){q==4&&(this.m=4,Dt(14),o=!1),_n(this.i,this.l,null,"[Incomplete Response]");break}else if(yt==Kc){this.m=4,Dt(15),_n(this.i,this.l,d,"[Invalid Chunk]"),o=!1;break}else _n(this.i,this.l,yt,null),uo(this,yt);if(Xc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),q!=4||d.length!=0||this.h.h||(this.m=1,Dt(16),o=!1),this.o=this.o&&o,!o)_n(this.i,this.l,d,"[Invalid Chunked Response]"),Xe(this),cr(this);else if(d.length>0&&!this.W){this.W=!0;var D=this.j;D.g==this&&D.aa&&!D.P&&(D.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),yo(D),D.P=!0,Dt(11))}}else _n(this.i,this.l,d,null),uo(this,d);q==4&&Xe(this),this.o&&!this.K&&(q==4?Au(this.j,this):(this.o=!1,gs(this)))}else Gg(this.g),u==400&&d.indexOf("Unknown SID")>0?(this.m=3,Dt(12)):(this.m=0,Dt(13)),Xe(this),cr(this)}}}catch{}finally{}};function Ng(o){if(!Xc(o))return o.g.la();const u=mu(o.g);if(u==="")return"";let d="";const g=u.length,v=be(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return Xe(o),cr(o),"";o.h.i=new a.TextDecoder}for(let C=0;C<g;C++)o.h.h=!0,d+=o.h.i.decode(u[C],{stream:!(v&&C==g-1)});return u.length=0,o.h.g+=d,o.C=0,o.h.g}function Xc(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Og(o,u){var d=o.C,g=u.indexOf(`
`,d);return g==-1?oo:(d=Number(u.substring(d,g)),isNaN(d)?Kc:(g+=1,g+d>u.length?oo:(u=u.slice(g,g+d),o.C=g+d,u)))}Ie.prototype.cancel=function(){this.K=!0,Xe(this)};function gs(o){o.T=Date.now()+o.H,Yc(o,o.H)}function Yc(o,u){if(o.D!=null)throw Error("WatchDog timer not null");o.D=ir(h(o.aa,o),u)}function co(o){o.D&&(a.clearTimeout(o.D),o.D=null)}Ie.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(kg(this.i,this.B),this.M!=2&&(sr(),Dt(17)),Xe(this),this.m=2,cr(this)):Yc(this,this.T-o)};function cr(o){o.j.I==0||o.K||Au(o.j,o)}function Xe(o){co(o);var u=o.O;u&&typeof u.dispose=="function"&&u.dispose(),o.O=null,Fc(o.V),o.g&&(u=o.g,o.g=null,u.abort(),u.dispose())}function uo(o,u){try{var d=o.j;if(d.I!=0&&(d.g==o||lo(d.h,o))){if(!o.L&&lo(d.h,o)&&d.I==3){try{var g=d.Ba.g.parse(u)}catch{g=null}if(Array.isArray(g)&&g.length==3){var v=g;if(v[0]==0){t:if(!d.v){if(d.g)if(d.g.F+3e3<o.F)ws(d),Ts(d);else break t;_o(d),Dt(18)}}else d.xa=v[1],0<d.xa-d.K&&v[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=ir(h(d.Va,d),6e3));eu(d.h)<=1&&d.ta&&(d.ta=void 0)}else Ze(d,11)}else if((o.L||d.g==o)&&ws(d),!y(u))for(v=d.Ba.g.parse(u),u=0;u<v.length;u++){let Y=v[u];const yt=Y[0];if(!(yt<=d.K))if(d.K=yt,Y=Y[1],d.I==2)if(Y[0]=="c"){d.M=Y[1],d.ba=Y[2];const te=Y[3];te!=null&&(d.ka=te,d.j.info("VER="+d.ka));const tn=Y[4];tn!=null&&(d.za=tn,d.j.info("SVER="+d.za));const Ce=Y[5];Ce!=null&&typeof Ce=="number"&&Ce>0&&(g=1.5*Ce,d.O=g,d.j.info("backChannelRequestTimeoutMs_="+g)),g=d;const Se=o.g;if(Se){const As=Se.g?Se.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(As){var C=g.h;C.g||As.indexOf("spdy")==-1&&As.indexOf("quic")==-1&&As.indexOf("h2")==-1||(C.j=C.l,C.g=new Set,C.h&&(ho(C,C.h),C.h=null))}if(g.G){const To=Se.g?Se.g.getResponseHeader("X-HTTP-Session-Id"):null;To&&(g.wa=To,et(g.J,g.G,To))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-o.F,d.j.info("Handshake RTT: "+d.T+"ms")),g=d;var D=o;if(g.na=Cu(g,g.L?g.ba:null,g.W),D.L){nu(g.h,D);var q=D,gt=g.O;gt&&(q.H=gt),q.D&&(co(q),gs(q)),g.g=D}else wu(g);d.i.length>0&&Es(d)}else Y[0]!="stop"&&Y[0]!="close"||Ze(d,7);else d.I==3&&(Y[0]=="stop"||Y[0]=="close"?Y[0]=="stop"?Ze(d,7):mo(d):Y[0]!="noop"&&d.l&&d.l.qa(Y),d.A=0)}}sr(4)}catch{}}var Mg=class{constructor(o,u){this.g=o,this.map=u}};function Zc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function tu(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function eu(o){return o.h?1:o.g?o.g.size:0}function lo(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function ho(o,u){o.g?o.g.add(u):o.h=u}function nu(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}Zc.prototype.cancel=function(){if(this.i=ru(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function ru(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const d of o.g.values())u=u.concat(d.G);return u}return A(o.i)}var su=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Lg(o,u){if(o){o=o.split("&");for(let d=0;d<o.length;d++){const g=o[d].indexOf("=");let v,C=null;g>=0?(v=o[d].substring(0,g),C=o[d].substring(g+1)):v=o[d],u(v,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function Ae(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;o instanceof Ae?(this.l=o.l,ur(this,o.j),this.o=o.o,this.g=o.g,lr(this,o.u),this.h=o.h,fo(this,lu(o.i)),this.m=o.m):o&&(u=String(o).match(su))?(this.l=!1,ur(this,u[1]||"",!0),this.o=hr(u[2]||""),this.g=hr(u[3]||"",!0),lr(this,u[4]),this.h=hr(u[5]||"",!0),fo(this,u[6]||"",!0),this.m=hr(u[7]||"")):(this.l=!1,this.i=new fr(null,this.l))}Ae.prototype.toString=function(){const o=[];var u=this.j;u&&o.push(dr(u,iu,!0),":");var d=this.g;return(d||u=="file")&&(o.push("//"),(u=this.o)&&o.push(dr(u,iu,!0),"@"),o.push(ar(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&o.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(dr(d,d.charAt(0)=="/"?Fg:Ug,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",dr(d,jg)),o.join("")},Ae.prototype.resolve=function(o){const u=Zt(this);let d=!!o.j;d?ur(u,o.j):d=!!o.o,d?u.o=o.o:d=!!o.g,d?u.g=o.g:d=o.u!=null;var g=o.h;if(d)lr(u,o.u);else if(d=!!o.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var v=u.h.lastIndexOf("/");v!=-1&&(g=u.h.slice(0,v+1)+g)}if(v=g,v==".."||v==".")g="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){g=v.lastIndexOf("/",0)==0,v=v.split("/");const C=[];for(let D=0;D<v.length;){const q=v[D++];q=="."?g&&D==v.length&&C.push(""):q==".."?((C.length>1||C.length==1&&C[0]!="")&&C.pop(),g&&D==v.length&&C.push("")):(C.push(q),g=!0)}g=C.join("/")}else g=v}return d?u.h=g:d=o.i.toString()!=="",d?fo(u,lu(o.i)):d=!!o.m,d&&(u.m=o.m),u};function Zt(o){return new Ae(o)}function ur(o,u,d){o.j=d?hr(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function lr(o,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);o.u=u}else o.u=null}function fo(o,u,d){u instanceof fr?(o.i=u,$g(o.i,o.l)):(d||(u=dr(u,Bg)),o.i=new fr(u,o.l))}function et(o,u,d){o.i.set(u,d)}function ms(o){return et(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function hr(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function dr(o,u,d){return typeof o=="string"?(o=encodeURI(o).replace(u,xg),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function xg(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var iu=/[#\/\?@]/g,Ug=/[#\?:]/g,Fg=/[#\?]/g,Bg=/[#\?@]/g,jg=/#/g;function fr(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function Ye(o){o.g||(o.g=new Map,o.h=0,o.i&&Lg(o.i,function(u,d){o.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=fr.prototype,n.add=function(o,u){Ye(this),this.i=null,o=yn(this,o);let d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(u),this.h+=1,this};function ou(o,u){Ye(o),u=yn(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function au(o,u){return Ye(o),u=yn(o,u),o.g.has(u)}n.forEach=function(o,u){Ye(this),this.g.forEach(function(d,g){d.forEach(function(v){o.call(u,v,g,this)},this)},this)};function cu(o,u){Ye(o);let d=[];if(typeof u=="string")au(o,u)&&(d=d.concat(o.g.get(yn(o,u))));else for(o=Array.from(o.g.values()),u=0;u<o.length;u++)d=d.concat(o[u]);return d}n.set=function(o,u){return Ye(this),this.i=null,o=yn(this,o),au(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=cu(this,o),o.length>0?String(o[0]):u):u};function uu(o,u,d){ou(o,u),d.length>0&&(o.i=null,o.g.set(yn(o,u),A(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(let g=0;g<u.length;g++){var d=u[g];const v=ar(d);d=cu(this,d);for(let C=0;C<d.length;C++){let D=v;d[C]!==""&&(D+="="+ar(d[C])),o.push(D)}}return this.i=o.join("&")};function lu(o){const u=new fr;return u.i=o.i,o.g&&(u.g=new Map(o.g),u.h=o.h),u}function yn(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function $g(o,u){u&&!o.j&&(Ye(o),o.i=null,o.g.forEach(function(d,g){const v=g.toLowerCase();g!=v&&(ou(this,g),uu(this,v,d))},o)),o.j=u}function qg(o,u){const d=new or;if(a.Image){const g=new Image;g.onload=f(ve,d,"TestLoadImage: loaded",!0,u,g),g.onerror=f(ve,d,"TestLoadImage: error",!1,u,g),g.onabort=f(ve,d,"TestLoadImage: abort",!1,u,g),g.ontimeout=f(ve,d,"TestLoadImage: timeout",!1,u,g),a.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=o}else u(!1)}function Hg(o,u){const d=new or,g=new AbortController,v=setTimeout(()=>{g.abort(),ve(d,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:g.signal}).then(C=>{clearTimeout(v),C.ok?ve(d,"TestPingServer: ok",!0,u):ve(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(v),ve(d,"TestPingServer: error",!1,u)})}function ve(o,u,d,g,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),g(d)}catch{}}function zg(){this.g=new Sg}function po(o){this.i=o.Sb||null,this.h=o.ab||!1}p(po,Bc),po.prototype.g=function(){return new _s(this.i,this.h)};function _s(o,u){Ct.call(this),this.H=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(_s,Ct),n=_s.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=u,this.readyState=1,gr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(u.body=o),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,pr(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,gr(this)),this.g&&(this.readyState=3,gr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;hu(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function hu(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?pr(this):gr(this),this.readyState==3&&hu(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,pr(this))},n.Na=function(o){this.g&&(this.response=o,pr(this))},n.ga=function(){this.g&&pr(this)};function pr(o){o.readyState=4,o.l=null,o.j=null,o.B=null,gr(o)}n.setRequestHeader=function(o,u){this.A.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=u.next();return o.join(`\r
`)};function gr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(_s.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function du(o){let u="";return ls(o,function(d,g){u+=g,u+=":",u+=d,u+=`\r
`}),u}function go(o,u,d){t:{for(g in d){var g=!1;break t}g=!0}g||(d=du(d),typeof o=="string"?d!=null&&ar(d):et(o,u,d))}function at(o){Ct.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(at,Ct);var Wg=/^https?$/i,Jg=["POST","PUT"];n=at.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,u,d,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Jc.g(),this.g.onreadystatechange=m(h(this.Ca,this));try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(C){fu(this,C);return}if(o=d||"",d=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var v in g)d.set(v,g[v]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const C of g.keys())d.set(C,g.get(C));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(d.keys()).find(C=>C.toLowerCase()=="content-type"),v=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Jg,u,void 0)>=0)||g||v||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[C,D]of d)this.g.setRequestHeader(C,D);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(C){fu(this,C)}};function fu(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.o=5,pu(o),ys(o)}function pu(o){o.A||(o.A=!0,Vt(o,"complete"),Vt(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Vt(this,"complete"),Vt(this,"abort"),ys(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ys(this,!0)),at.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?gu(this):this.Xa())},n.Xa=function(){gu(this)};function gu(o){if(o.h&&typeof i<"u"){if(o.v&&be(o)==4)setTimeout(o.Ca.bind(o),0);else if(Vt(o,"readystatechange"),be(o)==4){o.h=!1;try{const C=o.ca();t:switch(C){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break t;default:u=!1}var d;if(!(d=u)){var g;if(g=C===0){let D=String(o.D).match(su)[1]||null;!D&&a.self&&a.self.location&&(D=a.self.location.protocol.slice(0,-1)),g=!Wg.test(D?D.toLowerCase():"")}d=g}if(d)Vt(o,"complete"),Vt(o,"success");else{o.o=6;try{var v=be(o)>2?o.g.statusText:""}catch{v=""}o.l=v+" ["+o.ca()+"]",pu(o)}}finally{ys(o)}}}}function ys(o,u){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const d=o.g;o.g=null,u||Vt(o,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function be(o){return o.g?o.g.readyState:0}n.ca=function(){try{return be(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Cg(u)}};function mu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Gg(o){const u={};o=(o.g&&be(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<o.length;g++){if(y(o[g]))continue;var d=Dg(o[g]);const v=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const C=u[v]||[];u[v]=C,C.push(d)}Eg(u,function(g){return g.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function mr(o,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||u}function _u(o){this.za=0,this.i=[],this.j=new or,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=mr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=mr("baseRetryDelayMs",5e3,o),this.Za=mr("retryDelaySeedMs",1e4,o),this.Ta=mr("forwardChannelMaxRetries",2,o),this.va=mr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Zc(o&&o.concurrentRequestLimit),this.Ba=new zg,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=_u.prototype,n.ka=8,n.I=1,n.connect=function(o,u,d,g){Dt(0),this.W=o,this.H=u||{},d&&g!==void 0&&(this.H.OSID=d,this.H.OAID=g),this.F=this.X,this.J=Cu(this,null,this.W),Es(this)};function mo(o){if(yu(o),o.I==3){var u=o.V++,d=Zt(o.J);if(et(d,"SID",o.M),et(d,"RID",u),et(d,"TYPE","terminate"),_r(o,d),u=new Ie(o,o.j,u),u.M=2,u.A=ms(Zt(d)),d=!1,a.navigator&&a.navigator.sendBeacon)try{d=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!d&&a.Image&&(new Image().src=u.A,d=!0),d||(u.g=Su(u.j,null),u.g.ea(u.A)),u.F=Date.now(),gs(u)}bu(o)}function Ts(o){o.g&&(yo(o),o.g.cancel(),o.g=null)}function yu(o){Ts(o),o.v&&(a.clearTimeout(o.v),o.v=null),ws(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Es(o){if(!tu(o.h)&&!o.m){o.m=!0;var u=o.Ea;Ut||_(),pt||(Ut(),pt=!0),w.add(u,o),o.D=0}}function Kg(o,u){return eu(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=u.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=ir(h(o.Ea,o,u),vu(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const v=new Ie(this,this.j,o);let C=this.o;if(this.U&&(C?(C=kc(C),Dc(C,this.U)):C=this.U),this.u!==null||this.R||(v.J=C,C=null),this.S)t:{for(var u=0,d=0;d<this.i.length;d++){e:{var g=this.i[d];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break e}g=void 0}if(g===void 0)break;if(u+=g,u>4096){u=d;break t}if(u===4096||d===this.i.length-1){u=d+1;break t}}u=1e3}else u=1e3;u=Eu(this,v,u),d=Zt(this.J),et(d,"RID",o),et(d,"CVER",22),this.G&&et(d,"X-HTTP-Session-Id",this.G),_r(this,d),C&&(this.R?u="headers="+ar(du(C))+"&"+u:this.u&&go(d,this.u,C)),ho(this.h,v),this.Ra&&et(d,"TYPE","init"),this.S?(et(d,"$req",u),et(d,"SID","null"),v.U=!0,ao(v,d,null)):ao(v,d,u),this.I=2}}else this.I==3&&(o?Tu(this,o):this.i.length==0||tu(this.h)||Tu(this))};function Tu(o,u){var d;u?d=u.l:d=o.V++;const g=Zt(o.J);et(g,"SID",o.M),et(g,"RID",d),et(g,"AID",o.K),_r(o,g),o.u&&o.o&&go(g,o.u,o.o),d=new Ie(o,o.j,d,o.D+1),o.u===null&&(d.J=o.o),u&&(o.i=u.G.concat(o.i)),u=Eu(o,d,1e3),d.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),ho(o.h,d),ao(d,g,u)}function _r(o,u){o.H&&ls(o.H,function(d,g){et(u,g,d)}),o.l&&ls({},function(d,g){et(u,g,d)})}function Eu(o,u,d){d=Math.min(o.i.length,d);const g=o.l?h(o.l.Ka,o.l,o):null;t:{var v=o.i;let q=-1;for(;;){const gt=["count="+d];q==-1?d>0?(q=v[0].g,gt.push("ofs="+q)):q=0:gt.push("ofs="+q);let Y=!0;for(let yt=0;yt<d;yt++){var C=v[yt].g;const te=v[yt].map;if(C-=q,C<0)q=Math.max(0,v[yt].g-100),Y=!1;else try{C="req"+C+"_"||"";try{var D=te instanceof Map?te:Object.entries(te);for(const[tn,Ce]of D){let Se=Ce;c(Ce)&&(Se=no(Ce)),gt.push(C+tn+"="+encodeURIComponent(Se))}}catch(tn){throw gt.push(C+"type="+encodeURIComponent("_badmap")),tn}}catch{g&&g(te)}}if(Y){D=gt.join("&");break t}}D=void 0}return o=o.i.splice(0,d),u.G=o,D}function wu(o){if(!o.g&&!o.v){o.Y=1;var u=o.Da;Ut||_(),pt||(Ut(),pt=!0),w.add(u,o),o.A=0}}function _o(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=ir(h(o.Da,o),vu(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,Iu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=ir(h(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Dt(10),Ts(this),Iu(this))};function yo(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Iu(o){o.g=new Ie(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var u=Zt(o.na);et(u,"RID","rpc"),et(u,"SID",o.M),et(u,"AID",o.K),et(u,"CI",o.F?"0":"1"),!o.F&&o.ia&&et(u,"TO",o.ia),et(u,"TYPE","xmlhttp"),_r(o,u),o.u&&o.o&&go(u,o.u,o.o),o.O&&(o.g.H=o.O);var d=o.g;o=o.ba,d.M=1,d.A=ms(Zt(u)),d.u=null,d.R=!0,Qc(d,o)}n.Va=function(){this.C!=null&&(this.C=null,Ts(this),_o(this),Dt(19))};function ws(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Au(o,u){var d=null;if(o.g==u){ws(o),yo(o),o.g=null;var g=2}else if(lo(o.h,u))d=u.G,nu(o.h,u),g=1;else return;if(o.I!=0){if(u.o)if(g==1){d=u.u?u.u.length:0,u=Date.now()-u.F;var v=o.D;g=fs(),Vt(g,new zc(g,d)),Es(o)}else wu(o);else if(v=u.m,v==3||v==0&&u.X>0||!(g==1&&Kg(o,u)||g==2&&_o(o)))switch(d&&d.length>0&&(u=o.h,u.i=u.i.concat(d)),v){case 1:Ze(o,5);break;case 4:Ze(o,10);break;case 3:Ze(o,6);break;default:Ze(o,2)}}}function vu(o,u){let d=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(d*=2),d*u}function Ze(o,u){if(o.j.info("Error code "+u),u==2){var d=h(o.bb,o),g=o.Ua;const v=!g;g=new Ae(g||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||ur(g,"https"),ms(g),v?qg(g.toString(),d):Hg(g.toString(),d)}else Dt(2);o.I=0,o.l&&o.l.pa(u),bu(o),yu(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Dt(2)):(this.j.info("Failed to ping google.com"),Dt(1))};function bu(o){if(o.I=0,o.ja=[],o.l){const u=ru(o.h);(u.length!=0||o.i.length!=0)&&(S(o.ja,u),S(o.ja,o.i),o.h.i.length=0,A(o.i),o.i.length=0),o.l.oa()}}function Cu(o,u,d){var g=d instanceof Ae?Zt(d):new Ae(d);if(g.g!="")u&&(g.g=u+"."+g.g),lr(g,g.u);else{var v=a.location;g=v.protocol,u=u?u+"."+v.hostname:v.hostname,v=+v.port;const C=new Ae(null);g&&ur(C,g),u&&(C.g=u),v&&lr(C,v),d&&(C.h=d),g=C}return d=o.G,u=o.wa,d&&u&&et(g,d,u),et(g,"VER",o.ka),_r(o,g),g}function Su(o,u,d){if(u&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Aa&&!o.ma?new at(new po({ab:d})):new at(o.ma),u.Fa(o.L),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ru(){}n=Ru.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Is(){}Is.prototype.g=function(o,u){return new Ft(o,u)};function Ft(o,u){Ct.call(this),this.g=new _u(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(o?o["X-WebChannel-Client-Profile"]=u.sa:o={"X-WebChannel-Client-Profile":u.sa}),this.g.U=o,(o=u&&u.Qb)&&!y(o)&&(this.g.u=o),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!y(u)&&(this.g.G=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Tn(this)}p(Ft,Ct),Ft.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ft.prototype.close=function(){mo(this.g)},Ft.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.v&&(d={},d.__data__=no(o),o=d);u.i.push(new Mg(u.Ya++,o)),u.I==3&&Es(u)},Ft.prototype.N=function(){this.g.l=null,delete this.j,mo(this.g),delete this.g,Ft.Z.N.call(this)};function Pu(o){ro.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){t:{for(const d in u){o=d;break t}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}p(Pu,ro);function ku(){so.call(this),this.status=1}p(ku,so);function Tn(o){this.g=o}p(Tn,Ru),Tn.prototype.ra=function(){Vt(this.g,"a")},Tn.prototype.qa=function(o){Vt(this.g,new Pu(o))},Tn.prototype.pa=function(o){Vt(this.g,new ku)},Tn.prototype.oa=function(){Vt(this.g,"b")},Is.prototype.createWebChannel=Is.prototype.g,Ft.prototype.send=Ft.prototype.o,Ft.prototype.open=Ft.prototype.m,Ft.prototype.close=Ft.prototype.close,jf=function(){return new Is},Bf=function(){return fs()},Ff=Qe,Xo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},ps.NO_ERROR=0,ps.TIMEOUT=8,ps.HTTP_ERROR=6,Ms=ps,Wc.COMPLETE="complete",Uf=Wc,jc.EventType=rr,rr.OPEN="a",rr.CLOSE="b",rr.ERROR="c",rr.MESSAGE="d",Ct.prototype.listen=Ct.prototype.J,yr=jc,at.prototype.listenOnce=at.prototype.K,at.prototype.getLastError=at.prototype.Ha,at.prototype.getLastErrorCode=at.prototype.ya,at.prototype.getStatus=at.prototype.ca,at.prototype.getResponseJson=at.prototype.La,at.prototype.getResponseText=at.prototype.la,at.prototype.send=at.prototype.ea,at.prototype.setWithCredentials=at.prototype.Fa,xf=at}).apply(typeof bs<"u"?bs:typeof self<"u"?self:typeof window<"u"?window:{});const vl="@firebase/firestore",bl="4.9.3";/**
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
 */class Rt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Rt.UNAUTHENTICATED=new Rt(null),Rt.GOOGLE_CREDENTIALS=new Rt("google-credentials-uid"),Rt.FIRST_PARTY=new Rt("first-party-uid"),Rt.MOCK_USER=new Rt("mock-user");/**
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
 */let Qn="12.7.0";/**
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
 */const ln=new Da("@firebase/firestore");function An(){return ln.logLevel}function N(n,...t){if(ln.logLevel<=H.DEBUG){const e=t.map(Wa);ln.debug(`Firestore (${Qn}): ${n}`,...e)}}function Te(n,...t){if(ln.logLevel<=H.ERROR){const e=t.map(Wa);ln.error(`Firestore (${Qn}): ${n}`,...e)}}function xn(n,...t){if(ln.logLevel<=H.WARN){const e=t.map(Wa);ln.warn(`Firestore (${Qn}): ${n}`,...e)}}function Wa(n){if(typeof n=="string")return n;try{/**
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
 */function L(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,$f(n,r,e)}function $f(n,t,e){let r=`FIRESTORE (${Qn}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Te(r),new Error(r)}function G(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||$f(t,s,r)}function j(n,t){return n}/**
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
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends we{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class pe{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
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
 */class qf{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class uA{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(Rt.UNAUTHENTICATED)))}shutdown(){}}class lA{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class hA{constructor(t){this.t=t,this.currentUser=Rt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){G(this.o===void 0,42304);let r=this.i;const s=l=>this.i!==r?(r=this.i,e(l)):Promise.resolve();let i=new pe;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new pe,t.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const l=i;t.enqueueRetryable((async()=>{await l.promise,await s(this.currentUser)}))},c=l=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((l=>c(l))),setTimeout((()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new pe)}}),0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((r=>this.i!==t?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(G(typeof r.accessToken=="string",31837,{l:r}),new qf(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return G(t===null||typeof t=="string",2055,{h:t}),new Rt(t)}}class dA{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=Rt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class fA{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new dA(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(Rt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Cl{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class pA{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,zt(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){G(this.o===void 0,3512);const r=i=>{i.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,N("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable((()=>r(i)))};const s=i=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Cl(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(G(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Cl(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function gA(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
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
 */class Ja{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=gA(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<e&&(r+=t.charAt(s[i]%62))}return r}}function z(n,t){return n<t?-1:n>t?1:0}function Yo(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),i=t.charAt(r);if(s!==i)return Vo(s)===Vo(i)?z(s,i):Vo(s)?1:-1}return z(n.length,t.length)}const mA=55296,_A=57343;function Vo(n){const t=n.charCodeAt(0);return t>=mA&&t<=_A}function Un(n,t,e){return n.length===t.length&&n.every(((r,s)=>e(r,t[s])))}/**
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
 */const Sl="__name__";class ee{constructor(t,e,r){e===void 0?e=0:e>t.length&&L(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&L(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return ee.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof ee?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const i=ee.compareSegments(t.get(s),e.get(s));if(i!==0)return i}return z(t.length,e.length)}static compareSegments(t,e){const r=ee.isNumericId(t),s=ee.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?ee.extractNumericId(t).compare(ee.extractNumericId(e)):Yo(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Ue.fromString(t.substring(4,t.length-2))}}class nt extends ee{construct(t,e,r){return new nt(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new M(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((s=>s.length>0)))}return new nt(e)}static emptyPath(){return new nt([])}}const yA=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class vt extends ee{construct(t,e,r){return new vt(t,e,r)}static isValidIdentifier(t){return yA.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),vt.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Sl}static keyField(){return new vt([Sl])}static fromServerFormat(t){const e=[];let r="",s=0;const i=()=>{if(r.length===0)throw new M(P.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;s<t.length;){const c=t[s];if(c==="\\"){if(s+1===t.length)throw new M(P.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const l=t[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new M(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=l,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new M(P.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new vt(e)}static emptyPath(){return new vt([])}}/**
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
 */class x{constructor(t){this.path=t}static fromPath(t){return new x(nt.fromString(t))}static fromName(t){return new x(nt.fromString(t).popFirst(5))}static empty(){return new x(nt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&nt.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return nt.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new x(new nt(t.slice()))}}/**
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
 */function TA(n,t,e){if(!e)throw new M(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function EA(n,t,e,r){if(t===!0&&r===!0)throw new M(P.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Rl(n){if(!x.isDocumentKey(n))throw new M(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Hf(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Ga(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":L(12329,{type:typeof n})}function ge(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new M(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Ga(n);throw new M(P.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
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
 */function dt(n,t){const e={typeString:n};return t&&(e.value=t),e}function ns(n,t){if(!Hf(n))throw new M(P.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,i="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){e=`Expected '${r}' field to equal '${i.value}'`;break}}if(e)throw new M(P.INVALID_ARGUMENT,e);return!0}/**
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
 */const Pl=-62135596800,kl=1e6;class rt{static now(){return rt.fromMillis(Date.now())}static fromDate(t){return rt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*kl);return new rt(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new M(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new M(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Pl)throw new M(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new M(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/kl}_compareTo(t){return this.seconds===t.seconds?z(this.nanoseconds,t.nanoseconds):z(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:rt._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(ns(t,rt._jsonSchema))return new rt(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Pl;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}rt._jsonSchemaVersion="firestore/timestamp/1.0",rt._jsonSchema={type:dt("string",rt._jsonSchemaVersion),seconds:dt("number"),nanoseconds:dt("number")};/**
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
 */class U{static fromTimestamp(t){return new U(t)}static min(){return new U(new rt(0,0))}static max(){return new U(new rt(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Lr=-1;function wA(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=U.fromTimestamp(r===1e9?new rt(e+1,0):new rt(e,r));return new Be(s,x.empty(),t)}function IA(n){return new Be(n.readTime,n.key,Lr)}class Be{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Be(U.min(),x.empty(),Lr)}static max(){return new Be(U.max(),x.empty(),Lr)}}function AA(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=x.comparator(n.documentKey,t.documentKey),e!==0?e:z(n.largestBatchId,t.largestBatchId))}/**
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
 */const vA="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class bA{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
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
 */async function Xn(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==vA)throw n;N("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class R{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&L(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new R(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(r,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof R?e:R.resolve(e)}catch(e){return R.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):R.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):R.reject(e)}static resolve(t){return new R(((e,r)=>{e(t)}))}static reject(t){return new R(((e,r)=>{r(t)}))}static waitFor(t){return new R(((e,r)=>{let s=0,i=0,a=!1;t.forEach((c=>{++s,c.next((()=>{++i,a&&i===s&&e()}),(l=>r(l)))})),a=!0,i===s&&e()}))}static or(t){let e=R.resolve(!1);for(const r of t)e=e.next((s=>s?R.resolve(s):r()));return e}static forEach(t,e){const r=[];return t.forEach(((s,i)=>{r.push(e.call(this,s,i))})),this.waitFor(r)}static mapArray(t,e){return new R(((r,s)=>{const i=t.length,a=new Array(i);let c=0;for(let l=0;l<i;l++){const h=l;e(t[h]).next((f=>{a[h]=f,++c,c===i&&r(a)}),(f=>s(f)))}}))}static doWhile(t,e){return new R(((r,s)=>{const i=()=>{t()===!0?e().next((()=>{i()}),s):r()};i()}))}}function CA(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Yn(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class ki{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}ki.ce=-1;/**
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
 */const Ka=-1;function rs(n){return n==null}function ei(n){return n===0&&1/n==-1/0}function SA(n){return typeof n=="number"&&Number.isInteger(n)&&!ei(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const zf="";function RA(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Vl(t)),t=PA(n.get(e),t);return Vl(t)}function PA(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":e+="";break;case zf:e+="";break;default:e+=i}}return e}function Vl(n){return n+zf+""}/**
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
 */function Dl(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function Je(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Wf(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
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
 */class ot{constructor(t,e){this.comparator=t,this.root=e||At.EMPTY}insert(t,e){return new ot(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,At.BLACK,null,null))}remove(t){return new ot(this.comparator,this.root.remove(t,this.comparator).copy(null,null,At.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Cs(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Cs(this.root,t,this.comparator,!1)}getReverseIterator(){return new Cs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Cs(this.root,t,this.comparator,!0)}}class Cs{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?r(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class At{constructor(t,e,r,s,i){this.key=t,this.value=e,this.color=r??At.RED,this.left=s??At.EMPTY,this.right=i??At.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,i){return new At(t??this.key,e??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const i=r(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,r),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return At.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return At.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,At.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,At.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw L(43730,{key:this.key,value:this.value});if(this.right.isRed())throw L(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw L(27949);return t+(this.isRed()?0:1)}}At.EMPTY=null,At.RED=!0,At.BLACK=!1;At.EMPTY=new class{constructor(){this.size=0}get key(){throw L(57766)}get value(){throw L(16141)}get color(){throw L(16727)}get left(){throw L(29726)}get right(){throw L(36894)}copy(t,e,r,s,i){return this}insert(t,e,r){return new At(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class _t{constructor(t){this.comparator=t,this.data=new ot(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Nl(this.data.getIterator())}getIteratorFrom(t){return new Nl(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof _t)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new _t(this.comparator);return e.data=t,e}}class Nl{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class $t{constructor(t){this.fields=t,t.sort(vt.comparator)}static empty(){return new $t([])}unionWith(t){let e=new _t(vt.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new $t(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Un(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}/**
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
 */class Jf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class bt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Jf("Invalid base64 string: "+i):i}})(t);return new bt(e)}static fromUint8Array(t){const e=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(t);return new bt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return z(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}bt.EMPTY_BYTE_STRING=new bt("");const kA=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function je(n){if(G(!!n,39018),typeof n=="string"){let t=0;const e=kA.exec(n);if(G(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:ut(n.seconds),nanos:ut(n.nanos)}}function ut(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function $e(n){return typeof n=="string"?bt.fromBase64String(n):bt.fromUint8Array(n)}/**
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
 */const Gf="server_timestamp",Kf="__type__",Qf="__previous_value__",Xf="__local_write_time__";function Qa(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Kf])==null?void 0:r.stringValue)===Gf}function Vi(n){const t=n.mapValue.fields[Qf];return Qa(t)?Vi(t):t}function xr(n){const t=je(n.mapValue.fields[Xf].timestampValue);return new rt(t.seconds,t.nanos)}/**
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
 */class VA{constructor(t,e,r,s,i,a,c,l,h,f){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h,this.isUsingEmulator=f}}const ni="(default)";class Ur{constructor(t,e){this.projectId=t,this.database=e||ni}static empty(){return new Ur("","")}get isDefaultDatabase(){return this.database===ni}isEqual(t){return t instanceof Ur&&t.projectId===this.projectId&&t.database===this.database}}/**
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
 */const Yf="__type__",DA="__max__",Ss={mapValue:{}},Zf="__vector__",ri="value";function qe(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Qa(n)?4:OA(n)?9007199254740991:NA(n)?10:11:L(28295,{value:n})}function ce(n,t){if(n===t)return!0;const e=qe(n);if(e!==qe(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return xr(n).isEqual(xr(t));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=je(s.timestampValue),c=je(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(s,i){return $e(s.bytesValue).isEqual($e(i.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(s,i){return ut(s.geoPointValue.latitude)===ut(i.geoPointValue.latitude)&&ut(s.geoPointValue.longitude)===ut(i.geoPointValue.longitude)})(n,t);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return ut(s.integerValue)===ut(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ut(s.doubleValue),c=ut(i.doubleValue);return a===c?ei(a)===ei(c):isNaN(a)&&isNaN(c)}return!1})(n,t);case 9:return Un(n.arrayValue.values||[],t.arrayValue.values||[],ce);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Dl(a)!==Dl(c))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!ce(a[l],c[l])))return!1;return!0})(n,t);default:return L(52216,{left:n})}}function Fr(n,t){return(n.values||[]).find((e=>ce(e,t)))!==void 0}function Fn(n,t){if(n===t)return 0;const e=qe(n),r=qe(t);if(e!==r)return z(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return z(n.booleanValue,t.booleanValue);case 2:return(function(i,a){const c=ut(i.integerValue||i.doubleValue),l=ut(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1})(n,t);case 3:return Ol(n.timestampValue,t.timestampValue);case 4:return Ol(xr(n),xr(t));case 5:return Yo(n.stringValue,t.stringValue);case 6:return(function(i,a){const c=$e(i),l=$e(a);return c.compareTo(l)})(n.bytesValue,t.bytesValue);case 7:return(function(i,a){const c=i.split("/"),l=a.split("/");for(let h=0;h<c.length&&h<l.length;h++){const f=z(c[h],l[h]);if(f!==0)return f}return z(c.length,l.length)})(n.referenceValue,t.referenceValue);case 8:return(function(i,a){const c=z(ut(i.latitude),ut(a.latitude));return c!==0?c:z(ut(i.longitude),ut(a.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return Ml(n.arrayValue,t.arrayValue);case 10:return(function(i,a){var m,A,S,k;const c=i.fields||{},l=a.fields||{},h=(m=c[ri])==null?void 0:m.arrayValue,f=(A=l[ri])==null?void 0:A.arrayValue,p=z(((S=h==null?void 0:h.values)==null?void 0:S.length)||0,((k=f==null?void 0:f.values)==null?void 0:k.length)||0);return p!==0?p:Ml(h,f)})(n.mapValue,t.mapValue);case 11:return(function(i,a){if(i===Ss.mapValue&&a===Ss.mapValue)return 0;if(i===Ss.mapValue)return 1;if(a===Ss.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=a.fields||{},f=Object.keys(h);l.sort(),f.sort();for(let p=0;p<l.length&&p<f.length;++p){const m=Yo(l[p],f[p]);if(m!==0)return m;const A=Fn(c[l[p]],h[f[p]]);if(A!==0)return A}return z(l.length,f.length)})(n.mapValue,t.mapValue);default:throw L(23264,{he:e})}}function Ol(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return z(n,t);const e=je(n),r=je(t),s=z(e.seconds,r.seconds);return s!==0?s:z(e.nanos,r.nanos)}function Ml(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const i=Fn(e[s],r[s]);if(i)return i}return z(e.length,r.length)}function Bn(n){return Zo(n)}function Zo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const r=je(e);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return $e(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return x.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let r="[",s=!0;for(const i of e.values||[])s?s=!1:r+=",",r+=Zo(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(e){const r=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${Zo(e.fields[a])}`;return s+"}"})(n.mapValue):L(61005,{value:n})}function Ls(n){switch(qe(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Vi(n);return t?16+Ls(t):16;case 5:return 2*n.stringValue.length;case 6:return $e(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Ls(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return Je(r.fields,((i,a)=>{s+=i.length+Ls(a)})),s})(n.mapValue);default:throw L(13486,{value:n})}}function ta(n){return!!n&&"integerValue"in n}function Xa(n){return!!n&&"arrayValue"in n}function Ll(n){return!!n&&"nullValue"in n}function xl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function xs(n){return!!n&&"mapValue"in n}function NA(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Yf])==null?void 0:r.stringValue)===Zf}function br(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return Je(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=br(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=br(n.arrayValue.values[e]);return t}return{...n}}function OA(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===DA}/**
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
 */class Nt{constructor(t){this.value=t}static empty(){return new Nt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!xs(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=br(e)}setAll(t){let e=vt.emptyPath(),r={},s=[];t.forEach(((a,c)=>{if(!e.isImmediateParentOf(c)){const l=this.getFieldsMap(e);this.applyChanges(l,r,s),r={},s=[],e=c.popLast()}a?r[c.lastSegment()]=br(a):s.push(c.lastSegment())}));const i=this.getFieldsMap(e);this.applyChanges(i,r,s)}delete(t){const e=this.field(t.popLast());xs(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return ce(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];xs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){Je(e,((s,i)=>t[s]=i));for(const s of r)delete t[s]}clone(){return new Nt(br(this.value))}}function tp(n){const t=[];return Je(n.fields,((e,r)=>{const s=new vt([e]);if(xs(r)){const i=tp(r.mapValue).fields;if(i.length===0)t.push(s);else for(const a of i)t.push(s.child(a))}else t.push(s)})),new $t(t)}/**
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
 */class Et{constructor(t,e,r,s,i,a,c){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(t){return new Et(t,0,U.min(),U.min(),U.min(),Nt.empty(),0)}static newFoundDocument(t,e,r,s){return new Et(t,1,e,U.min(),r,s,0)}static newNoDocument(t,e){return new Et(t,2,e,U.min(),U.min(),Nt.empty(),0)}static newUnknownDocument(t,e){return new Et(t,3,e,U.min(),U.min(),Nt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Nt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Nt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Et&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Et(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class si{constructor(t,e){this.position=t,this.inclusive=e}}function Ul(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const i=t[s],a=n.position[s];if(i.field.isKeyField()?r=x.comparator(x.fromName(a.referenceValue),e.key):r=Fn(a,e.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Fl(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!ce(n.position[e],t.position[e]))return!1;return!0}/**
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
 */class ii{constructor(t,e="asc"){this.field=t,this.dir=e}}function MA(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
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
 */class ep{}class mt extends ep{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new xA(t,e,r):e==="array-contains"?new BA(t,r):e==="in"?new jA(t,r):e==="not-in"?new $A(t,r):e==="array-contains-any"?new qA(t,r):new mt(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new UA(t,r):new FA(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Fn(e,this.value)):e!==null&&qe(this.value)===qe(e)&&this.matchesComparison(Fn(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return L(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ue extends ep{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new ue(t,e)}matches(t){return np(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function np(n){return n.op==="and"}function rp(n){return LA(n)&&np(n)}function LA(n){for(const t of n.filters)if(t instanceof ue)return!1;return!0}function ea(n){if(n instanceof mt)return n.field.canonicalString()+n.op.toString()+Bn(n.value);if(rp(n))return n.filters.map((t=>ea(t))).join(",");{const t=n.filters.map((e=>ea(e))).join(",");return`${n.op}(${t})`}}function sp(n,t){return n instanceof mt?(function(r,s){return s instanceof mt&&r.op===s.op&&r.field.isEqual(s.field)&&ce(r.value,s.value)})(n,t):n instanceof ue?(function(r,s){return s instanceof ue&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,c)=>i&&sp(a,s.filters[c])),!0):!1})(n,t):void L(19439)}function ip(n){return n instanceof mt?(function(e){return`${e.field.canonicalString()} ${e.op} ${Bn(e.value)}`})(n):n instanceof ue?(function(e){return e.op.toString()+" {"+e.getFilters().map(ip).join(" ,")+"}"})(n):"Filter"}class xA extends mt{constructor(t,e,r){super(t,e,r),this.key=x.fromName(r.referenceValue)}matches(t){const e=x.comparator(t.key,this.key);return this.matchesComparison(e)}}class UA extends mt{constructor(t,e){super(t,"in",e),this.keys=op("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class FA extends mt{constructor(t,e){super(t,"not-in",e),this.keys=op("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function op(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map((r=>x.fromName(r.referenceValue)))}class BA extends mt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Xa(e)&&Fr(e.arrayValue,this.value)}}class jA extends mt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Fr(this.value.arrayValue,e)}}class $A extends mt{constructor(t,e){super(t,"not-in",e)}matches(t){if(Fr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Fr(this.value.arrayValue,e)}}class qA extends mt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Xa(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>Fr(this.value.arrayValue,r)))}}/**
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
 */class HA{constructor(t,e=null,r=[],s=[],i=null,a=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Te=null}}function Bl(n,t=null,e=[],r=[],s=null,i=null,a=null){return new HA(n,t,e,r,s,i,a)}function Ya(n){const t=j(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((r=>ea(r))).join(","),e+="|ob:",e+=t.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),rs(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((r=>Bn(r))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((r=>Bn(r))).join(",")),t.Te=e}return t.Te}function Za(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!MA(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!sp(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Fl(n.startAt,t.startAt)&&Fl(n.endAt,t.endAt)}function na(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class Di{constructor(t,e=null,r=[],s=[],i=null,a="F",c=null,l=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=l,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function zA(n,t,e,r,s,i,a,c){return new Di(n,t,e,r,s,i,a,c)}function Ni(n){return new Di(n)}function jl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function WA(n){return n.collectionGroup!==null}function Cr(n){const t=j(n);if(t.Ie===null){t.Ie=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ie.push(i),e.add(i.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new _t(vt.comparator);return a.filters.forEach((l=>{l.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(t).forEach((i=>{e.has(i.canonicalString())||i.isKeyField()||t.Ie.push(new ii(i,r))})),e.has(vt.keyField().canonicalString())||t.Ie.push(new ii(vt.keyField(),r))}return t.Ie}function re(n){const t=j(n);return t.Ee||(t.Ee=JA(t,Cr(n))),t.Ee}function JA(n,t){if(n.limitType==="F")return Bl(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new ii(s.field,i)}));const e=n.endAt?new si(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new si(n.startAt.position,n.startAt.inclusive):null;return Bl(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function ra(n,t,e){return new Di(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Oi(n,t){return Za(re(n),re(t))&&n.limitType===t.limitType}function ap(n){return`${Ya(re(n))}|lt:${n.limitType}`}function vn(n){return`Query(target=${(function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map((s=>ip(s))).join(", ")}]`),rs(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map((s=>Bn(s))).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map((s=>Bn(s))).join(",")),`Target(${r})`})(re(n))}; limitType=${n.limitType})`}function Mi(n,t){return t.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):x.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,t)&&(function(r,s){for(const i of Cr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,t)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,t)&&(function(r,s){return!(r.startAt&&!(function(a,c,l){const h=Ul(a,c,l);return a.inclusive?h<=0:h<0})(r.startAt,Cr(r),s)||r.endAt&&!(function(a,c,l){const h=Ul(a,c,l);return a.inclusive?h>=0:h>0})(r.endAt,Cr(r),s))})(n,t)}function GA(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function cp(n){return(t,e)=>{let r=!1;for(const s of Cr(n)){const i=KA(s,t,e);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function KA(n,t,e){const r=n.field.isKeyField()?x.comparator(t.key,e.key):(function(i,a,c){const l=a.data.field(i),h=c.data.field(i);return l!==null&&h!==null?Fn(l,h):L(42886)})(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return L(19790,{direction:n.dir})}}/**
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
 */class fn{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){Je(this.inner,((e,r)=>{for(const[s,i]of r)t(s,i)}))}isEmpty(){return Wf(this.inner)}size(){return this.innerSize}}/**
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
 */const QA=new ot(x.comparator);function Ee(){return QA}const up=new ot(x.comparator);function Tr(...n){let t=up;for(const e of n)t=t.insert(e.key,e);return t}function lp(n){let t=up;return n.forEach(((e,r)=>t=t.insert(e,r.overlayedDocument))),t}function rn(){return Sr()}function hp(){return Sr()}function Sr(){return new fn((n=>n.toString()),((n,t)=>n.isEqual(t)))}const XA=new ot(x.comparator),YA=new _t(x.comparator);function W(...n){let t=YA;for(const e of n)t=t.add(e);return t}const ZA=new _t(z);function tv(){return ZA}/**
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
 */function tc(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ei(t)?"-0":t}}function dp(n){return{integerValue:""+n}}function ev(n,t){return SA(t)?dp(t):tc(n,t)}/**
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
 */class Li{constructor(){this._=void 0}}function nv(n,t,e){return n instanceof Br?(function(s,i){const a={fields:{[Kf]:{stringValue:Gf},[Xf]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Qa(i)&&(i=Vi(i)),i&&(a.fields[Qf]=i),{mapValue:a}})(e,t):n instanceof jr?pp(n,t):n instanceof $r?gp(n,t):(function(s,i){const a=fp(s,i),c=$l(a)+$l(s.Ae);return ta(a)&&ta(s.Ae)?dp(c):tc(s.serializer,c)})(n,t)}function rv(n,t,e){return n instanceof jr?pp(n,t):n instanceof $r?gp(n,t):e}function fp(n,t){return n instanceof oi?(function(r){return ta(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(t)?t:{integerValue:0}:null}class Br extends Li{}class jr extends Li{constructor(t){super(),this.elements=t}}function pp(n,t){const e=mp(t);for(const r of n.elements)e.some((s=>ce(s,r)))||e.push(r);return{arrayValue:{values:e}}}class $r extends Li{constructor(t){super(),this.elements=t}}function gp(n,t){let e=mp(t);for(const r of n.elements)e=e.filter((s=>!ce(s,r)));return{arrayValue:{values:e}}}class oi extends Li{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function $l(n){return ut(n.integerValue||n.doubleValue)}function mp(n){return Xa(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class sv{constructor(t,e){this.field=t,this.transform=e}}function iv(n,t){return n.field.isEqual(t.field)&&(function(r,s){return r instanceof jr&&s instanceof jr||r instanceof $r&&s instanceof $r?Un(r.elements,s.elements,ce):r instanceof oi&&s instanceof oi?ce(r.Ae,s.Ae):r instanceof Br&&s instanceof Br})(n.transform,t.transform)}class ov{constructor(t,e){this.version=t,this.transformResults=e}}class xt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new xt}static exists(t){return new xt(void 0,t)}static updateTime(t){return new xt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Us(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class xi{}function _p(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new ec(n.key,xt.none()):new ss(n.key,n.data,xt.none());{const e=n.data,r=Nt.empty();let s=new _t(vt.comparator);for(let i of t.fields)if(!s.has(i)){let a=e.field(i);a===null&&i.length>1&&(i=i.popLast(),a=e.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Ge(n.key,r,new $t(s.toArray()),xt.none())}}function av(n,t,e){n instanceof ss?(function(s,i,a){const c=s.value.clone(),l=Hl(s.fieldTransforms,i,a.transformResults);c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(n,t,e):n instanceof Ge?(function(s,i,a){if(!Us(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=Hl(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(yp(s)),l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(n,t,e):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,t,e)}function Rr(n,t,e,r){return n instanceof ss?(function(i,a,c,l){if(!Us(i.precondition,a))return c;const h=i.value.clone(),f=zl(i.fieldTransforms,l,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null})(n,t,e,r):n instanceof Ge?(function(i,a,c,l){if(!Us(i.precondition,a))return c;const h=zl(i.fieldTransforms,l,a),f=a.data;return f.setAll(yp(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,t,e,r):(function(i,a,c){return Us(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c})(n,t,e)}function cv(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),i=fp(r.transform,s||null);i!=null&&(e===null&&(e=Nt.empty()),e.set(r.field,i))}return e||null}function ql(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Un(r,s,((i,a)=>iv(i,a)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class ss extends xi{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ge extends xi{constructor(t,e,r,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function yp(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}})),t}function Hl(n,t,e){const r=new Map;G(n.length===e.length,32656,{Re:e.length,Ve:n.length});for(let s=0;s<e.length;s++){const i=n[s],a=i.transform,c=t.data.field(i.field);r.set(i.field,rv(a,c,e[s]))}return r}function zl(n,t,e){const r=new Map;for(const s of n){const i=s.transform,a=e.data.field(s.field);r.set(s.field,nv(i,a,t))}return r}class ec extends xi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Tp extends xi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class uv{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&av(i,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=Rr(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=Rr(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=hp();return this.mutations.forEach((s=>{const i=t.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=e.has(s.key)?null:c;const l=_p(a,c);l!==null&&r.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(U.min())})),r}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),W())}isEqual(t){return this.batchId===t.batchId&&Un(this.mutations,t.mutations,((e,r)=>ql(e,r)))&&Un(this.baseMutations,t.baseMutations,((e,r)=>ql(e,r)))}}class nc{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){G(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let s=(function(){return XA})();const i=t.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new nc(t,e,r,s)}}/**
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
 */class lv{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
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
 */class hv{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var ht,J;function Ep(n){switch(n){case P.OK:return L(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return L(15467,{code:n})}}function wp(n){if(n===void 0)return Te("GRPC error has no .code"),P.UNKNOWN;switch(n){case ht.OK:return P.OK;case ht.CANCELLED:return P.CANCELLED;case ht.UNKNOWN:return P.UNKNOWN;case ht.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ht.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ht.INTERNAL:return P.INTERNAL;case ht.UNAVAILABLE:return P.UNAVAILABLE;case ht.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ht.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ht.NOT_FOUND:return P.NOT_FOUND;case ht.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ht.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ht.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ht.ABORTED:return P.ABORTED;case ht.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ht.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ht.DATA_LOSS:return P.DATA_LOSS;default:return L(39323,{code:n})}}(J=ht||(ht={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function dv(){return new TextEncoder}/**
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
 */const fv=new Ue([4294967295,4294967295],0);function Wl(n){const t=dv().encode(n),e=new Lf;return e.update(t),new Uint8Array(e.digest())}function Jl(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new Ue([e,r],0),new Ue([s,i],0)]}class rc{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new Er(`Invalid padding: ${e}`);if(r<0)throw new Er(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new Er(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new Er(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=Ue.fromNumber(this.ge)}ye(t,e,r){let s=t.add(e.multiply(Ue.fromNumber(r)));return s.compare(fv)===1&&(s=new Ue([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Wl(t),[r,s]=Jl(e);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),a=new rc(i,s,e);return r.forEach((c=>a.insert(c))),a}insert(t){if(this.ge===0)return;const e=Wl(t),[r,s]=Jl(e);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class Er extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Ui{constructor(t,e,r,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,is.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Ui(U.min(),s,new ot(z),Ee(),W())}}class is{constructor(t,e,r,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new is(r,e,W(),W(),W())}}/**
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
 */class Fs{constructor(t,e,r,s){this.be=t,this.removedTargetIds=e,this.key=r,this.De=s}}class Ip{constructor(t,e){this.targetId=t,this.Ce=e}}class Ap{constructor(t,e,r=bt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class Gl{constructor(){this.ve=0,this.Fe=Kl(),this.Me=bt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=W(),e=W(),r=W();return this.Fe.forEach(((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:L(38017,{changeType:i})}})),new is(this.Me,this.xe,t,e,r)}qe(){this.Oe=!1,this.Fe=Kl()}Qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}$e(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}Ue(){this.ve+=1}Ke(){this.ve-=1,G(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class pv{constructor(t){this.Ge=t,this.ze=new Map,this.je=Ee(),this.Je=Rs(),this.He=Rs(),this.Ye=new ot(z)}Ze(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Xe(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,(e=>{const r=this.nt(e);switch(t.state){case 0:this.rt(e)&&r.Le(t.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(t.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(r.We(),r.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),r.Le(t.resumeToken));break;default:L(56790,{state:t.state})}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach(((r,s)=>{this.rt(s)&&e(s)}))}st(t){const e=t.targetId,r=t.Ce.count,s=this.ot(e);if(s){const i=s.target;if(na(i))if(r===0){const a=new x(i.path);this.et(e,a,Et.newNoDocument(a,U.min()))}else G(r===1,20013,{expectedCount:r});else{const a=this._t(e);if(a!==r){const c=this.ut(t),l=c?this.ct(c,t,a):1;if(l!==0){this.it(e);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(e,h)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=e;let a,c;try{a=$e(r).toUint8Array()}catch(l){if(l instanceof Jf)return xn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new rc(a,s,i)}catch(l){return xn(l instanceof Er?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ct(t,e,r){return e.Ce.count===r-this.Pt(t,e.targetId)?0:2}Pt(t,e){const r=this.Ge.getRemoteKeysForTarget(e);let s=0;return r.forEach((i=>{const a=this.Ge.ht(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;t.mightContain(c)||(this.et(e,i,null),s++)})),s}Tt(t){const e=new Map;this.ze.forEach(((i,a)=>{const c=this.ot(a);if(c){if(i.current&&na(c.target)){const l=new x(c.target.path);this.It(l).has(a)||this.Et(a,l)||this.et(a,l,Et.newNoDocument(l,t))}i.Be&&(e.set(a,i.ke()),i.qe())}}));let r=W();this.He.forEach(((i,a)=>{let c=!0;a.forEachWhile((l=>{const h=this.ot(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.je.forEach(((i,a)=>a.setReadTime(t)));const s=new Ui(t,e,this.Ye,this.je,r);return this.je=Ee(),this.Je=Rs(),this.He=Rs(),this.Ye=new ot(z),s}Xe(t,e){if(!this.rt(t))return;const r=this.Et(t,e.key)?2:0;this.nt(t).Qe(e.key,r),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.He=this.He.insert(e.key,this.dt(e.key).add(t))}et(t,e,r){if(!this.rt(t))return;const s=this.nt(t);this.Et(t,e)?s.Qe(e,1):s.$e(e),this.He=this.He.insert(e,this.dt(e).delete(t)),this.He=this.He.insert(e,this.dt(e).add(t)),r&&(this.je=this.je.insert(e,r))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ue(t){this.nt(t).Ue()}nt(t){let e=this.ze.get(t);return e||(e=new Gl,this.ze.set(t,e)),e}dt(t){let e=this.He.get(t);return e||(e=new _t(z),this.He=this.He.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new _t(z),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||N("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new Gl),this.Ge.getRemoteKeysForTarget(t).forEach((e=>{this.et(t,e,null)}))}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function Rs(){return new ot(x.comparator)}function Kl(){return new ot(x.comparator)}const gv={asc:"ASCENDING",desc:"DESCENDING"},mv={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},_v={and:"AND",or:"OR"};class yv{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function sa(n,t){return n.useProto3Json||rs(t)?t:{value:t}}function ai(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function vp(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Tv(n,t){return ai(n,t.toTimestamp())}function qt(n){return G(!!n,49232),U.fromTimestamp((function(e){const r=je(e);return new rt(r.seconds,r.nanos)})(n))}function sc(n,t){return ia(n,t).canonicalString()}function ia(n,t){const e=(function(s){return new nt(["projects",s.projectId,"databases",s.database])})(n).child("documents");return t===void 0?e:e.child(t)}function bp(n){const t=nt.fromString(n);return G(Vp(t),10190,{key:t.toString()}),t}function ci(n,t){return sc(n.databaseId,t.path)}function Pr(n,t){const e=bp(t);if(e.get(1)!==n.databaseId.projectId)throw new M(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new M(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new x(Sp(e))}function Cp(n,t){return sc(n.databaseId,t)}function Ev(n){const t=bp(n);return t.length===4?nt.emptyPath():Sp(t)}function oa(n){return new nt(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Sp(n){return G(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Ql(n,t,e){return{name:ci(n,t),fields:e.value.mapValue.fields}}function wv(n,t){return"found"in t?(function(r,s){G(!!s.found,43571),s.found.name,s.found.updateTime;const i=Pr(r,s.found.name),a=qt(s.found.updateTime),c=s.found.createTime?qt(s.found.createTime):U.min(),l=new Nt({mapValue:{fields:s.found.fields}});return Et.newFoundDocument(i,a,c,l)})(n,t):"missing"in t?(function(r,s){G(!!s.missing,3894),G(!!s.readTime,22933);const i=Pr(r,s.missing),a=qt(s.readTime);return Et.newNoDocument(i,a)})(n,t):L(7234,{result:t})}function Iv(n,t){let e;if("targetChange"in t){t.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:L(39313,{state:h})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(G(f===void 0||typeof f=="string",58123),bt.fromBase64String(f||"")):(G(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),bt.fromUint8Array(f||new Uint8Array))})(n,t.targetChange.resumeToken),a=t.targetChange.cause,c=a&&(function(h){const f=h.code===void 0?P.UNKNOWN:wp(h.code);return new M(f,h.message||"")})(a);e=new Ap(r,s,i,c||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Pr(n,r.document.name),i=qt(r.document.updateTime),a=r.document.createTime?qt(r.document.createTime):U.min(),c=new Nt({mapValue:{fields:r.document.fields}}),l=Et.newFoundDocument(s,i,a,c),h=r.targetIds||[],f=r.removedTargetIds||[];e=new Fs(h,f,l.key,l)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Pr(n,r.document),i=r.readTime?qt(r.readTime):U.min(),a=Et.newNoDocument(s,i),c=r.removedTargetIds||[];e=new Fs([],c,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Pr(n,r.document),i=r.removedTargetIds||[];e=new Fs([],i,s,null)}else{if(!("filter"in t))return L(11601,{Rt:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new hv(s,i),c=r.targetId;e=new Ip(c,a)}}return e}function Rp(n,t){let e;if(t instanceof ss)e={update:Ql(n,t.key,t.value)};else if(t instanceof ec)e={delete:ci(n,t.key)};else if(t instanceof Ge)e={update:Ql(n,t.key,t.data),updateMask:Vv(t.fieldMask)};else{if(!(t instanceof Tp))return L(16599,{Vt:t.type});e={verify:ci(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(i,a){const c=a.transform;if(c instanceof Br)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof jr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof $r)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof oi)return{fieldPath:a.field.canonicalString(),increment:c.Ae};throw L(20930,{transform:a.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Tv(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:L(27497)})(n,t.precondition)),e}function Av(n,t){return n&&n.length>0?(G(t!==void 0,14353),n.map((e=>(function(s,i){let a=s.updateTime?qt(s.updateTime):qt(i);return a.isEqual(U.min())&&(a=qt(i)),new ov(a,s.transformResults||[])})(e,t)))):[]}function vv(n,t){return{documents:[Cp(n,t.path)]}}function bv(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Cp(n,s);const i=(function(h){if(h.length!==0)return kp(ue.create(h,"and"))})(t.filters);i&&(e.structuredQuery.where=i);const a=(function(h){if(h.length!==0)return h.map((f=>(function(m){return{field:bn(m.field),direction:Rv(m.dir)}})(f)))})(t.orderBy);a&&(e.structuredQuery.orderBy=a);const c=sa(n,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(t.endAt)),{ft:e,parent:s}}function Cv(n){let t=Ev(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){G(r===1,65062);const f=e.from[0];f.allDescendants?s=f.collectionId:t=t.child(f.collectionId)}let i=[];e.where&&(i=(function(p){const m=Pp(p);return m instanceof ue&&rp(m)?m.getFilters():[m]})(e.where));let a=[];e.orderBy&&(a=(function(p){return p.map((m=>(function(S){return new ii(Cn(S.field),(function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(S.direction))})(m)))})(e.orderBy));let c=null;e.limit&&(c=(function(p){let m;return m=typeof p=="object"?p.value:p,rs(m)?null:m})(e.limit));let l=null;e.startAt&&(l=(function(p){const m=!!p.before,A=p.values||[];return new si(A,m)})(e.startAt));let h=null;return e.endAt&&(h=(function(p){const m=!p.before,A=p.values||[];return new si(A,m)})(e.endAt)),zA(t,s,a,i,c,"F",l,h)}function Sv(n,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Pp(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Cn(e.unaryFilter.field);return mt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Cn(e.unaryFilter.field);return mt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Cn(e.unaryFilter.field);return mt.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Cn(e.unaryFilter.field);return mt.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return L(61313);default:return L(60726)}})(n):n.fieldFilter!==void 0?(function(e){return mt.create(Cn(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return L(58110);default:return L(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return ue.create(e.compositeFilter.filters.map((r=>Pp(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return L(1026)}})(e.compositeFilter.op))})(n):L(30097,{filter:n})}function Rv(n){return gv[n]}function Pv(n){return mv[n]}function kv(n){return _v[n]}function bn(n){return{fieldPath:n.canonicalString()}}function Cn(n){return vt.fromServerFormat(n.fieldPath)}function kp(n){return n instanceof mt?(function(e){if(e.op==="=="){if(xl(e.value))return{unaryFilter:{field:bn(e.field),op:"IS_NAN"}};if(Ll(e.value))return{unaryFilter:{field:bn(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(xl(e.value))return{unaryFilter:{field:bn(e.field),op:"IS_NOT_NAN"}};if(Ll(e.value))return{unaryFilter:{field:bn(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:bn(e.field),op:Pv(e.op),value:e.value}}})(n):n instanceof ue?(function(e){const r=e.getFilters().map((s=>kp(s)));return r.length===1?r[0]:{compositeFilter:{op:kv(e.op),filters:r}}})(n):L(54877,{filter:n})}function Vv(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function Vp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Ne{constructor(t,e,r,s,i=U.min(),a=U.min(),c=bt.EMPTY_BYTE_STRING,l=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(t){return new Ne(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Ne(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Ne(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Ne(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class Dv{constructor(t){this.yt=t}}function Nv(n){const t=Cv({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ra(t,t.limit,"L"):t}/**
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
 */class Ov{constructor(){this.Cn=new Mv}addToCollectionParentIndex(t,e){return this.Cn.add(e),R.resolve()}getCollectionParents(t,e){return R.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return R.resolve()}deleteFieldIndex(t,e){return R.resolve()}deleteAllFieldIndexes(t){return R.resolve()}createTargetIndexes(t,e){return R.resolve()}getDocumentsMatchingTarget(t,e){return R.resolve(null)}getIndexType(t,e){return R.resolve(0)}getFieldIndexes(t,e){return R.resolve([])}getNextCollectionGroupToUpdate(t){return R.resolve(null)}getMinOffset(t,e){return R.resolve(Be.min())}getMinOffsetFromCollectionGroup(t,e){return R.resolve(Be.min())}updateCollectionGroup(t,e,r){return R.resolve()}updateIndexEntries(t,e){return R.resolve()}}class Mv{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new _t(nt.comparator),i=!s.has(r);return this.index[e]=s.add(r),i}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new _t(nt.comparator)).toArray()}}/**
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
 */const Xl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Dp=41943040;class Lt{static withCacheSize(t){return new Lt(t,Lt.DEFAULT_COLLECTION_PERCENTILE,Lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
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
 */Lt.DEFAULT_COLLECTION_PERCENTILE=10,Lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Lt.DEFAULT=new Lt(Dp,Lt.DEFAULT_COLLECTION_PERCENTILE,Lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Lt.DISABLED=new Lt(-1,0,0);/**
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
 */class jn{constructor(t){this.ar=t}next(){return this.ar+=2,this.ar}static ur(){return new jn(0)}static cr(){return new jn(-1)}}/**
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
 */const Yl="LruGarbageCollector",Lv=1048576;function Zl([n,t],[e,r]){const s=z(n,e);return s===0?z(t,r):s}class xv{constructor(t){this.Ir=t,this.buffer=new _t(Zl),this.Er=0}dr(){return++this.Er}Ar(t){const e=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();Zl(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Uv{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(t){N(Yl,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Yn(e)?N(Yl,"Ignoring IndexedDB error during garbage collection: ",e):await Xn(e)}await this.Vr(3e5)}))}}class Fv{constructor(t,e){this.mr=t,this.params=e}calculateTargetCount(t,e){return this.mr.gr(t).next((r=>Math.floor(e/100*r)))}nthSequenceNumber(t,e){if(e===0)return R.resolve(ki.ce);const r=new xv(e);return this.mr.forEachTarget(t,(s=>r.Ar(s.sequenceNumber))).next((()=>this.mr.pr(t,(s=>r.Ar(s))))).next((()=>r.maxValue))}removeTargets(t,e,r){return this.mr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.mr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(Xl)):this.getCacheSize(t).next((r=>r<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Xl):this.yr(t,e)))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,e){let r,s,i,a,c,l,h;const f=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(t,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(t,r,e)))).next((p=>(i=p,l=Date.now(),this.removeOrphanedDocuments(t,r)))).next((p=>(h=Date.now(),An()<=H.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${p} documents in `+(h-l)+`ms
Total Duration: ${h-f}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function Bv(n,t){return new Fv(n,t)}/**
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
 */class jv{constructor(){this.changes=new fn((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Et.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?R.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class $v{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class qv{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(r!==null&&Rr(r.mutation,s,$t.empty(),rt.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.getLocalViewOfDocuments(t,r,W()).next((()=>r))))}getLocalViewOfDocuments(t,e,r=W()){const s=rn();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,r).next((i=>{let a=Tr();return i.forEach(((c,l)=>{a=a.insert(c,l.overlayedDocument)})),a}))))}getOverlayedDocuments(t,e){const r=rn();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,W())))}populateOverlays(t,e,r){const s=[];return r.forEach((i=>{e.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(t,s).next((i=>{i.forEach(((a,c)=>{e.set(a,c)}))}))}computeViews(t,e,r,s){let i=Ee();const a=Sr(),c=(function(){return Sr()})();return e.forEach(((l,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Ge)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Rr(f.mutation,h,f.mutation.getFieldMask(),rt.now())):a.set(h.key,$t.empty())})),this.recalculateAndSaveOverlays(t,i).next((l=>(l.forEach(((h,f)=>a.set(h,f))),e.forEach(((h,f)=>c.set(h,new $v(f,a.get(h)??null)))),c)))}recalculateAndSaveOverlays(t,e){const r=Sr();let s=new ot(((a,c)=>a-c)),i=W();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((a=>{for(const c of a)c.keys().forEach((l=>{const h=e.get(l);if(h===null)return;let f=r.get(l)||$t.empty();f=c.applyToLocalView(h,f),r.set(l,f);const p=(s.get(c.batchId)||W()).add(l);s=s.insert(c.batchId,p)}))})).next((()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,f=l.value,p=hp();f.forEach((m=>{if(!i.has(m)){const A=_p(e.get(m),r.get(m));A!==null&&p.set(m,A),i=i.add(m)}})),a.push(this.documentOverlayCache.saveOverlays(t,h,p))}return R.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,e,r,s){return(function(a){return x.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):WA(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-i.size):R.resolve(rn());let c=Lr,l=i;return a.next((h=>R.forEach(h,((f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?R.resolve():this.remoteDocumentCache.getEntry(t,f).next((m=>{l=l.insert(f,m)}))))).next((()=>this.populateOverlays(t,h,i))).next((()=>this.computeViews(t,l,h,W()))).next((f=>({batchId:c,changes:lp(f)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new x(e)).next((r=>{let s=Tr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const i=e.collectionGroup;let a=Tr();return this.indexManager.getCollectionParents(t,i).next((c=>R.forEach(c,(l=>{const h=(function(p,m){return new Di(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(e,l.child(i));return this.getDocumentsMatchingCollectionQuery(t,h,r,s).next((f=>{f.forEach(((p,m)=>{a=a.insert(p,m)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(t,e,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,i,s)))).next((a=>{i.forEach(((l,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,Et.newInvalidDocument(f)))}));let c=Tr();return a.forEach(((l,h)=>{const f=i.get(l);f!==void 0&&Rr(f.mutation,h,$t.empty(),rt.now()),Mi(e,h)&&(c=c.insert(l,h))})),c}))}}/**
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
 */class Hv{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,e){return R.resolve(this.Lr.get(e))}saveBundleMetadata(t,e){return this.Lr.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:qt(s.createTime)}})(e)),R.resolve()}getNamedQuery(t,e){return R.resolve(this.kr.get(e))}saveNamedQuery(t,e){return this.kr.set(e.name,(function(s){return{name:s.name,query:Nv(s.bundledQuery),readTime:qt(s.readTime)}})(e)),R.resolve()}}/**
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
 */class zv{constructor(){this.overlays=new ot(x.comparator),this.qr=new Map}getOverlay(t,e){return R.resolve(this.overlays.get(e))}getOverlays(t,e){const r=rn();return R.forEach(e,(s=>this.getOverlay(t,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(t,e,r){return r.forEach(((s,i)=>{this.St(t,e,i)})),R.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(r)),R.resolve()}getOverlaysForCollection(t,e,r){const s=rn(),i=e.length+1,a=new x(e.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!e.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return R.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let i=new ot(((h,f)=>h-f));const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===e&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=rn(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=rn(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return R.resolve(c)}St(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new lv(e,r));let i=this.qr.get(e);i===void 0&&(i=W(),this.qr.set(e,i)),this.qr.set(e,i.add(r.key))}}/**
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
 */class Wv{constructor(){this.sessionToken=bt.EMPTY_BYTE_STRING}getSessionToken(t){return R.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,R.resolve()}}/**
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
 */class ic{constructor(){this.Qr=new _t(Tt.$r),this.Ur=new _t(Tt.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,e){const r=new Tt(t,e);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(t,e){t.forEach((r=>this.addReference(r,e)))}removeReference(t,e){this.Gr(new Tt(t,e))}zr(t,e){t.forEach((r=>this.removeReference(r,e)))}jr(t){const e=new x(new nt([])),r=new Tt(e,t),s=new Tt(e,t+1),i=[];return this.Ur.forEachInRange([r,s],(a=>{this.Gr(a),i.push(a.key)})),i}Jr(){this.Qr.forEach((t=>this.Gr(t)))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const e=new x(new nt([])),r=new Tt(e,t),s=new Tt(e,t+1);let i=W();return this.Ur.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(t){const e=new Tt(t,0),r=this.Qr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class Tt{constructor(t,e){this.key=t,this.Yr=e}static $r(t,e){return x.comparator(t.key,e.key)||z(t.Yr,e.Yr)}static Kr(t,e){return z(t.Yr,e.Yr)||x.comparator(t.key,e.key)}}/**
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
 */class Jv{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.tr=1,this.Zr=new _t(Tt.$r)}checkEmpty(t){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new uv(i,e,r,s);this.mutationQueue.push(a);for(const c of s)this.Zr=this.Zr.add(new Tt(c.key,i)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return R.resolve(a)}lookupMutationBatch(t,e){return R.resolve(this.Xr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.ei(r),i=s<0?0:s;return R.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?Ka:this.tr-1)}getAllMutationBatches(t){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new Tt(e,0),s=new Tt(e,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],(a=>{const c=this.Xr(a.Yr);i.push(c)})),R.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new _t(z);return e.forEach((s=>{const i=new Tt(s,0),a=new Tt(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],(c=>{r=r.add(c.Yr)}))})),R.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let i=r;x.isDocumentKey(i)||(i=i.child(""));const a=new Tt(new x(i),0);let c=new _t(z);return this.Zr.forEachWhile((l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.Yr)),!0)}),a),R.resolve(this.ti(c))}ti(t){const e=[];return t.forEach((r=>{const s=this.Xr(r);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){G(this.ni(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return R.forEach(e.mutations,(s=>{const i=new Tt(s.key,e.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.Zr=r}))}ir(t){}containsKey(t,e){const r=new Tt(e,0),s=this.Zr.firstAfterOrEqual(r);return R.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,R.resolve()}ni(t,e){return this.ei(t)}ei(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Xr(t){const e=this.ei(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class Gv{constructor(t){this.ri=t,this.docs=(function(){return new ot(x.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),i=s?s.size:0,a=this.ri(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return R.resolve(r?r.document.mutableCopy():Et.newInvalidDocument(e))}getEntries(t,e){let r=Ee();return e.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Et.newInvalidDocument(s))})),R.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let i=Ee();const a=e.path,c=new x(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:f}}=l.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||AA(IA(f),r)<=0||(s.has(f.key)||Mi(e,f))&&(i=i.insert(f.key,f.mutableCopy()))}return R.resolve(i)}getAllFromCollectionGroup(t,e,r,s){L(9500)}ii(t,e){return R.forEach(this.docs,(r=>e(r)))}newChangeBuffer(t){return new Kv(this)}getSize(t){return R.resolve(this.size)}}class Kv extends jv{constructor(t){super(),this.Nr=t}applyChanges(t){const e=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?e.push(this.Nr.addEntry(t,s)):this.Nr.removeEntry(r)})),R.waitFor(e)}getFromCache(t,e){return this.Nr.getEntry(t,e)}getAllFromCache(t,e){return this.Nr.getEntries(t,e)}}/**
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
 */class Qv{constructor(t){this.persistence=t,this.si=new fn((e=>Ya(e)),Za),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.oi=0,this._i=new ic,this.targetCount=0,this.ai=jn.ur()}forEachTarget(t,e){return this.si.forEach(((r,s)=>e(s))),R.resolve()}getLastRemoteSnapshotVersion(t){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return R.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.oi&&(this.oi=e),R.resolve()}Pr(t){this.si.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ai=new jn(e),this.highestTargetId=e),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,e){return this.Pr(e),this.targetCount+=1,R.resolve()}updateTargetData(t,e){return this.Pr(e),R.resolve()}removeTargetData(t,e){return this.si.delete(e.target),this._i.jr(e.targetId),this.targetCount-=1,R.resolve()}removeTargets(t,e,r){let s=0;const i=[];return this.si.forEach(((a,c)=>{c.sequenceNumber<=e&&r.get(c.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(t,c.targetId)),s++)})),R.waitFor(i).next((()=>s))}getTargetCount(t){return R.resolve(this.targetCount)}getTargetData(t,e){const r=this.si.get(e)||null;return R.resolve(r)}addMatchingKeys(t,e,r){return this._i.Wr(e,r),R.resolve()}removeMatchingKeys(t,e,r){this._i.zr(e,r);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach((a=>{i.push(s.markPotentiallyOrphaned(t,a))})),R.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this._i.jr(e),R.resolve()}getMatchingKeysForTargetId(t,e){const r=this._i.Hr(e);return R.resolve(r)}containsKey(t,e){return R.resolve(this._i.containsKey(e))}}/**
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
 */class Np{constructor(t,e){this.ui={},this.overlays={},this.ci=new ki(0),this.li=!1,this.li=!0,this.hi=new Wv,this.referenceDelegate=t(this),this.Pi=new Qv(this),this.indexManager=new Ov,this.remoteDocumentCache=(function(s){return new Gv(s)})((r=>this.referenceDelegate.Ti(r))),this.serializer=new Dv(e),this.Ii=new Hv(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new zv,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ui[t.toKey()];return r||(r=new Jv(e,this.referenceDelegate),this.ui[t.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,e,r){N("MemoryPersistence","Starting transaction:",t);const s=new Xv(this.ci.next());return this.referenceDelegate.Ei(),r(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ai(t,e){return R.or(Object.values(this.ui).map((r=>()=>r.containsKey(t,e))))}}class Xv extends bA{constructor(t){super(),this.currentSequenceNumber=t}}class oc{constructor(t){this.persistence=t,this.Ri=new ic,this.Vi=null}static mi(t){return new oc(t)}get fi(){if(this.Vi)return this.Vi;throw L(60996)}addReference(t,e,r){return this.Ri.addReference(r,e),this.fi.delete(r.toString()),R.resolve()}removeReference(t,e,r){return this.Ri.removeReference(r,e),this.fi.add(r.toString()),R.resolve()}markPotentiallyOrphaned(t,e){return this.fi.add(e.toString()),R.resolve()}removeTarget(t,e){this.Ri.jr(e.targetId).forEach((s=>this.fi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((i=>this.fi.add(i.toString())))})).next((()=>r.removeTargetData(t,e)))}Ei(){this.Vi=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.fi,(r=>{const s=x.fromPath(r);return this.gi(t,s).next((i=>{i||e.removeEntry(s,U.min())}))})).next((()=>(this.Vi=null,e.apply(t))))}updateLimboDocument(t,e){return this.gi(t,e).next((r=>{r?this.fi.delete(e.toString()):this.fi.add(e.toString())}))}Ti(t){return 0}gi(t,e){return R.or([()=>R.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ai(t,e)])}}class ui{constructor(t,e){this.persistence=t,this.pi=new fn((r=>RA(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Bv(this,e)}static mi(t,e){return new ui(t,e)}Ei(){}di(t){return R.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}gr(t){const e=this.wr(t);return this.persistence.getTargetCache().getTargetCount(t).next((r=>e.next((s=>r+s))))}wr(t){let e=0;return this.pr(t,(r=>{e++})).next((()=>e))}pr(t,e){return R.forEach(this.pi,((r,s)=>this.br(t,r,s).next((i=>i?R.resolve():e(s)))))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(t,(a=>this.br(t,a,e).next((c=>{c||(r++,i.removeEntry(a,U.min()))})))).next((()=>i.apply(t))).next((()=>r))}markPotentiallyOrphaned(t,e){return this.pi.set(e,t.currentSequenceNumber),R.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.pi.set(r,t.currentSequenceNumber),R.resolve()}removeReference(t,e,r){return this.pi.set(r,t.currentSequenceNumber),R.resolve()}updateLimboDocument(t,e){return this.pi.set(e,t.currentSequenceNumber),R.resolve()}Ti(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Ls(t.data.value)),e}br(t,e,r){return R.or([()=>this.persistence.Ai(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.pi.get(e);return R.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
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
 */class ac{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.Es=r,this.ds=s}static As(t,e){let r=W(),s=W();for(const i of e.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new ac(t,e.fromCache,r,s)}}/**
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
 */class Yv{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class Zv{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return qT()?8:CA(kt())>0?6:4})()}initialize(t,e){this.ps=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,r,s){const i={result:null};return this.ys(t,e).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.ws(t,e,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new Yv;return this.Ss(t,e,a).next((c=>{if(i.result=c,this.Vs)return this.bs(t,e,a,c.size)}))})).next((()=>i.result))}bs(t,e,r,s){return r.documentReadCount<this.fs?(An()<=H.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",vn(e),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),R.resolve()):(An()<=H.DEBUG&&N("QueryEngine","Query:",vn(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(An()<=H.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",vn(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,re(e))):R.resolve())}ys(t,e){if(jl(e))return R.resolve(null);let r=re(e);return this.indexManager.getIndexType(t,r).next((s=>s===0?null:(e.limit!==null&&s===1&&(e=ra(e,null,"F"),r=re(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next((i=>{const a=W(...i);return this.ps.getDocuments(t,a).next((c=>this.indexManager.getMinOffset(t,r).next((l=>{const h=this.Ds(e,c);return this.Cs(e,h,a,l.readTime)?this.ys(t,ra(e,null,"F")):this.vs(t,h,e,l)}))))})))))}ws(t,e,r,s){return jl(e)||s.isEqual(U.min())?R.resolve(null):this.ps.getDocuments(t,r).next((i=>{const a=this.Ds(e,i);return this.Cs(e,a,r,s)?R.resolve(null):(An()<=H.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),vn(e)),this.vs(t,a,e,wA(s,Lr)).next((c=>c)))}))}Ds(t,e){let r=new _t(cp(t));return e.forEach(((s,i)=>{Mi(t,i)&&(r=r.add(i))})),r}Cs(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(t,e,r){return An()<=H.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",vn(e)),this.ps.getDocumentsMatchingQuery(t,e,Be.min(),r)}vs(t,e,r,s){return this.ps.getDocumentsMatchingQuery(t,r,s).next((i=>(e.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
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
 */const cc="LocalStore",tb=3e8;class eb{constructor(t,e,r,s){this.persistence=t,this.Fs=e,this.serializer=s,this.Ms=new ot(z),this.xs=new fn((i=>Ya(i)),Za),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(r)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new qv(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.Ms)))}}function nb(n,t,e,r){return new eb(n,t,e,r)}async function Op(n,t){const e=j(n);return await e.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,e.Bs(t),e.mutationQueue.getAllMutationBatches(r)))).next((i=>{const a=[],c=[];let l=W();for(const h of s){a.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}return e.localDocuments.getDocuments(r,l).next((h=>({Ls:h,removedBatchIds:a,addedBatchIds:c})))}))}))}function rb(n,t){const e=j(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),i=e.Ns.newChangeBuffer({trackRemovals:!0});return(function(c,l,h,f){const p=h.batch,m=p.keys();let A=R.resolve();return m.forEach((S=>{A=A.next((()=>f.getEntry(l,S))).next((k=>{const V=h.docVersions.get(S);G(V!==null,48541),k.version.compareTo(V)<0&&(p.applyToRemoteDocument(k,h),k.isValidDocument()&&(k.setReadTime(h.commitVersion),f.addEntry(k)))}))})),A.next((()=>c.mutationQueue.removeMutationBatch(l,p)))})(e,r,t,i).next((()=>i.apply(r))).next((()=>e.mutationQueue.performConsistencyCheck(r))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let l=W();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l})(t)))).next((()=>e.localDocuments.getDocuments(r,s)))}))}function Mp(n){const t=j(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.Pi.getLastRemoteSnapshotVersion(e)))}function sb(n,t){const e=j(n),r=t.snapshotVersion;let s=e.Ms;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=e.Ns.newChangeBuffer({trackRemovals:!0});s=e.Ms;const c=[];t.targetChanges.forEach(((f,p)=>{const m=s.get(p);if(!m)return;c.push(e.Pi.removeMatchingKeys(i,f.removedDocuments,p).next((()=>e.Pi.addMatchingKeys(i,f.addedDocuments,p))));let A=m.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(p)!==null?A=A.withResumeToken(bt.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):f.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(f.resumeToken,r)),s=s.insert(p,A),(function(k,V,$){return k.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=tb?!0:$.addedDocuments.size+$.modifiedDocuments.size+$.removedDocuments.size>0})(m,A,f)&&c.push(e.Pi.updateTargetData(i,A))}));let l=Ee(),h=W();if(t.documentUpdates.forEach((f=>{t.resolvedLimboDocuments.has(f)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(ib(i,a,t.documentUpdates).next((f=>{l=f.ks,h=f.qs}))),!r.isEqual(U.min())){const f=e.Pi.getLastRemoteSnapshotVersion(i).next((p=>e.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(f)}return R.waitFor(c).next((()=>a.apply(i))).next((()=>e.localDocuments.getLocalViewOfDocuments(i,l,h))).next((()=>l))})).then((i=>(e.Ms=s,i)))}function ib(n,t,e){let r=W(),s=W();return e.forEach((i=>r=r.add(i))),t.getEntries(n,r).next((i=>{let a=Ee();return e.forEach(((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(U.min())?(t.removeEntry(c,l.readTime),a=a.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(t.addEntry(l),a=a.insert(c,l)):N(cc,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)})),{ks:a,qs:s}}))}function ob(n,t){const e=j(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=Ka),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function ab(n,t){const e=j(n);return e.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return e.Pi.getTargetData(r,t).next((i=>i?(s=i,R.resolve(s)):e.Pi.allocateTargetId(r).next((a=>(s=new Ne(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.Pi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=e.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Ms=e.Ms.insert(r.targetId,r),e.xs.set(t,r.targetId)),r}))}async function aa(n,t,e){const r=j(n),s=r.Ms.get(t),i=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!Yn(a))throw a;N(cc,`Failed to update sequence numbers for target ${t}: ${a}`)}r.Ms=r.Ms.remove(t),r.xs.delete(s.target)}function th(n,t,e){const r=j(n);let s=U.min(),i=W();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(l,h,f){const p=j(l),m=p.xs.get(f);return m!==void 0?R.resolve(p.Ms.get(m)):p.Pi.getTargetData(h,f)})(r,a,re(t)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,c.targetId).next((l=>{i=l}))})).next((()=>r.Fs.getDocumentsMatchingQuery(a,t,e?s:U.min(),e?i:W()))).next((c=>(cb(r,GA(t),c),{documents:c,Qs:i})))))}function cb(n,t,e){let r=n.Os.get(t)||U.min();e.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Os.set(t,r)}class eh{constructor(){this.activeTargetIds=tv()}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class ub{constructor(){this.Mo=new eh,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,e,r){this.xo[t]=e}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new eh,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class lb{Oo(t){}shutdown(){}}/**
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
 */const nh="ConnectivityMonitor";class rh{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){N(nh,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){N(nh,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Ps=null;function ca(){return Ps===null?Ps=(function(){return 268435456+Math.round(2147483648*Math.random())})():Ps++,"0x"+Ps.toString(16)}/**
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
 */const Do="RestConnection",hb={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class db{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=e+"://"+t.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===ni?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(t,e,r,s,i){const a=ca(),c=this.zo(t,e.toUriEncodedString());N(Do,`Sending RPC '${t}' ${a}:`,c,r);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(l,s,i);const{host:h}=new URL(c),f=Wn(h);return this.Jo(t,c,l,r,f).then((p=>(N(Do,`Received RPC '${t}' ${a}: `,p),p)),(p=>{throw xn(Do,`RPC '${t}' ${a} failed with error: `,p,"url: ",c,"request:",r),p}))}Ho(t,e,r,s,i,a){return this.Go(t,e,r,s,i)}jo(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Qn})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,i)=>t[i]=s)),r&&r.headers.forEach(((s,i)=>t[i]=s))}zo(t,e){const r=hb[t];return`${this.Uo}/v1/${e}:${r}`}terminate(){}}/**
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
 */class fb{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}}/**
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
 */const St="WebChannelConnection";class pb extends db{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,r,s,i){const a=ca();return new Promise(((c,l)=>{const h=new xf;h.setWithCredentials(!0),h.listenOnce(Uf.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Ms.NO_ERROR:const p=h.getResponseJson();N(St,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(p)),c(p);break;case Ms.TIMEOUT:N(St,`RPC '${t}' ${a} timed out`),l(new M(P.DEADLINE_EXCEEDED,"Request time out"));break;case Ms.HTTP_ERROR:const m=h.getStatus();if(N(St,`RPC '${t}' ${a} failed with status:`,m,"response text:",h.getResponseText()),m>0){let A=h.getResponseJson();Array.isArray(A)&&(A=A[0]);const S=A==null?void 0:A.error;if(S&&S.status&&S.message){const k=(function($){const F=$.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(F)>=0?F:P.UNKNOWN})(S.status);l(new M(k,S.message))}else l(new M(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new M(P.UNAVAILABLE,"Connection failed."));break;default:L(9055,{l_:t,streamId:a,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{N(St,`RPC '${t}' ${a} completed.`)}}));const f=JSON.stringify(s);N(St,`RPC '${t}' ${a} sending request:`,s),h.send(e,"POST",f,r,15)}))}T_(t,e,r){const s=ca(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=jf(),c=Bf(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.jo(l.initMessageHeaders,e,r),l.encodeInitMessageHeaders=!0;const f=i.join("");N(St,`Creating RPC '${t}' stream ${s}: ${f}`,l);const p=a.createWebChannel(f,l);this.I_(p);let m=!1,A=!1;const S=new fb({Yo:V=>{A?N(St,`Not sending because RPC '${t}' stream ${s} is closed:`,V):(m||(N(St,`Opening RPC '${t}' stream ${s} transport.`),p.open(),m=!0),N(St,`RPC '${t}' stream ${s} sending:`,V),p.send(V))},Zo:()=>p.close()}),k=(V,$,F)=>{V.listen($,(K=>{try{F(K)}catch(lt){setTimeout((()=>{throw lt}),0)}}))};return k(p,yr.EventType.OPEN,(()=>{A||(N(St,`RPC '${t}' stream ${s} transport opened.`),S.o_())})),k(p,yr.EventType.CLOSE,(()=>{A||(A=!0,N(St,`RPC '${t}' stream ${s} transport closed`),S.a_(),this.E_(p))})),k(p,yr.EventType.ERROR,(V=>{A||(A=!0,xn(St,`RPC '${t}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),S.a_(new M(P.UNAVAILABLE,"The operation could not be completed")))})),k(p,yr.EventType.MESSAGE,(V=>{var $;if(!A){const F=V.data[0];G(!!F,16349);const K=F,lt=(K==null?void 0:K.error)||(($=K[0])==null?void 0:$.error);if(lt){N(St,`RPC '${t}' stream ${s} received error:`,lt);const Ut=lt.status;let pt=(function(T){const I=ht[T];if(I!==void 0)return wp(I)})(Ut),w=lt.message;pt===void 0&&(pt=P.INTERNAL,w="Unknown error status: "+Ut+" with message "+lt.message),A=!0,S.a_(new M(pt,w)),p.close()}else N(St,`RPC '${t}' stream ${s} received:`,F),S.u_(F)}})),k(c,Ff.STAT_EVENT,(V=>{V.stat===Xo.PROXY?N(St,`RPC '${t}' stream ${s} detected buffering proxy`):V.stat===Xo.NOPROXY&&N(St,`RPC '${t}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{S.__()}),0),S}terminate(){this.c_.forEach((t=>t.close())),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter((e=>e===t))}}function No(){return typeof document<"u"?document:null}/**
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
 */function Fi(n){return new yv(n,!0)}/**
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
 */class uc{constructor(t,e,r=1e3,s=1.5,i=6e4){this.Mi=t,this.timerId=e,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const e=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-r);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),t()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const sh="PersistentStream";class Lp{constructor(t,e,r,s,i,a,c,l){this.Mi=t,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new uc(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(t){this.Q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===P.RESOURCE_EXHAUSTED?(Te(e.toString()),Te("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.r_(e)}K_(){}auth(){this.state=1;const t=this.W_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===e&&this.G_(r,s)}),(r=>{t((()=>{const s=new M(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(t,e){const r=this.W_(this.D_);this.stream=this.j_(t,e),this.stream.Xo((()=>{r((()=>this.listener.Xo()))})),this.stream.t_((()=>{r((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return N(sh,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Mi.enqueueAndForget((()=>this.D_===t?e():(N(sh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class gb extends Lp{constructor(t,e,r,s,i,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,a),this.serializer=i}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=Iv(this.serializer,t),r=(function(i){if(!("targetChange"in i))return U.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?U.min():a.readTime?qt(a.readTime):U.min()})(t);return this.listener.H_(e,r)}Y_(t){const e={};e.database=oa(this.serializer),e.addTarget=(function(i,a){let c;const l=a.target;if(c=na(l)?{documents:vv(i,l)}:{query:bv(i,l).ft},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=vp(i,a.resumeToken);const h=sa(i,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(U.min())>0){c.readTime=ai(i,a.snapshotVersion.toTimestamp());const h=sa(i,a.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,t);const r=Sv(this.serializer,t);r&&(e.labels=r),this.q_(e)}Z_(t){const e={};e.database=oa(this.serializer),e.removeTarget=t,this.q_(e)}}class mb extends Lp{constructor(t,e,r,s,i,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return G(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,G(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){G(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=Av(t.writeResults,t.commitTime),r=qt(t.commitTime);return this.listener.na(r,e)}ra(){const t={};t.database=oa(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map((r=>Rp(this.serializer,r)))};this.q_(e)}}/**
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
 */class _b{}class yb extends _b{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new M(P.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,e,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.Go(t,ia(e,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new M(P.UNKNOWN,i.toString())}))}Ho(t,e,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,c])=>this.connection.Ho(t,ia(e,r),s,a,c,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new M(P.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class Tb{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Te(e),this.aa=!1):N("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const hn="RemoteStore";class Eb{constructor(t,e,r,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((a=>{r.enqueueAndForget((async()=>{pn(this)&&(N(hn,"Restarting streams for network reachability change."),await(async function(l){const h=j(l);h.Ea.add(4),await os(h),h.Ra.set("Unknown"),h.Ea.delete(4),await Bi(h)})(this))}))})),this.Ra=new Tb(r,s)}}async function Bi(n){if(pn(n))for(const t of n.da)await t(!0)}async function os(n){for(const t of n.da)await t(!1)}function xp(n,t){const e=j(n);e.Ia.has(t.targetId)||(e.Ia.set(t.targetId,t),fc(e)?dc(e):Zn(e).O_()&&hc(e,t))}function lc(n,t){const e=j(n),r=Zn(e);e.Ia.delete(t),r.O_()&&Up(e,t),e.Ia.size===0&&(r.O_()?r.L_():pn(e)&&e.Ra.set("Unknown"))}function hc(n,t){if(n.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(U.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Zn(n).Y_(t)}function Up(n,t){n.Va.Ue(t),Zn(n).Z_(t)}function dc(n){n.Va=new pv({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),At:t=>n.Ia.get(t)||null,ht:()=>n.datastore.serializer.databaseId}),Zn(n).start(),n.Ra.ua()}function fc(n){return pn(n)&&!Zn(n).x_()&&n.Ia.size>0}function pn(n){return j(n).Ea.size===0}function Fp(n){n.Va=void 0}async function wb(n){n.Ra.set("Online")}async function Ib(n){n.Ia.forEach(((t,e)=>{hc(n,t)}))}async function Ab(n,t){Fp(n),fc(n)?(n.Ra.ha(t),dc(n)):n.Ra.set("Unknown")}async function vb(n,t,e){if(n.Ra.set("Online"),t instanceof Ap&&t.state===2&&t.cause)try{await(async function(s,i){const a=i.cause;for(const c of i.targetIds)s.Ia.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.Ia.delete(c),s.Va.removeTarget(c))})(n,t)}catch(r){N(hn,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await li(n,r)}else if(t instanceof Fs?n.Va.Ze(t):t instanceof Ip?n.Va.st(t):n.Va.tt(t),!e.isEqual(U.min()))try{const r=await Mp(n.localStore);e.compareTo(r)>=0&&await(function(i,a){const c=i.Va.Tt(a);return c.targetChanges.forEach(((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const f=i.Ia.get(h);f&&i.Ia.set(h,f.withResumeToken(l.resumeToken,a))}})),c.targetMismatches.forEach(((l,h)=>{const f=i.Ia.get(l);if(!f)return;i.Ia.set(l,f.withResumeToken(bt.EMPTY_BYTE_STRING,f.snapshotVersion)),Up(i,l);const p=new Ne(f.target,l,h,f.sequenceNumber);hc(i,p)})),i.remoteSyncer.applyRemoteEvent(c)})(n,e)}catch(r){N(hn,"Failed to raise snapshot:",r),await li(n,r)}}async function li(n,t,e){if(!Yn(t))throw t;n.Ea.add(1),await os(n),n.Ra.set("Offline"),e||(e=()=>Mp(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{N(hn,"Retrying IndexedDB access"),await e(),n.Ea.delete(1),await Bi(n)}))}function Bp(n,t){return t().catch((e=>li(n,e,t)))}async function ji(n){const t=j(n),e=He(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:Ka;for(;bb(t);)try{const s=await ob(t.localStore,r);if(s===null){t.Ta.length===0&&e.L_();break}r=s.batchId,Cb(t,s)}catch(s){await li(t,s)}jp(t)&&$p(t)}function bb(n){return pn(n)&&n.Ta.length<10}function Cb(n,t){n.Ta.push(t);const e=He(n);e.O_()&&e.X_&&e.ea(t.mutations)}function jp(n){return pn(n)&&!He(n).x_()&&n.Ta.length>0}function $p(n){He(n).start()}async function Sb(n){He(n).ra()}async function Rb(n){const t=He(n);for(const e of n.Ta)t.ea(e.mutations)}async function Pb(n,t,e){const r=n.Ta.shift(),s=nc.from(r,t,e);await Bp(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await ji(n)}async function kb(n,t){t&&He(n).X_&&await(async function(r,s){if((function(a){return Ep(a)&&a!==P.ABORTED})(s.code)){const i=r.Ta.shift();He(r).B_(),await Bp(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await ji(r)}})(n,t),jp(n)&&$p(n)}async function ih(n,t){const e=j(n);e.asyncQueue.verifyOperationInProgress(),N(hn,"RemoteStore received new credentials");const r=pn(e);e.Ea.add(3),await os(e),r&&e.Ra.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await Bi(e)}async function Vb(n,t){const e=j(n);t?(e.Ea.delete(2),await Bi(e)):t||(e.Ea.add(2),await os(e),e.Ra.set("Unknown"))}function Zn(n){return n.ma||(n.ma=(function(e,r,s){const i=j(e);return i.sa(),new gb(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:wb.bind(null,n),t_:Ib.bind(null,n),r_:Ab.bind(null,n),H_:vb.bind(null,n)}),n.da.push((async t=>{t?(n.ma.B_(),fc(n)?dc(n):n.Ra.set("Unknown")):(await n.ma.stop(),Fp(n))}))),n.ma}function He(n){return n.fa||(n.fa=(function(e,r,s){const i=j(e);return i.sa(),new mb(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:Sb.bind(null,n),r_:kb.bind(null,n),ta:Rb.bind(null,n),na:Pb.bind(null,n)}),n.da.push((async t=>{t?(n.fa.B_(),await ji(n)):(await n.fa.stop(),n.Ta.length>0&&(N(hn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
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
 */class pc{constructor(t,e,r,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new pe,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,i){const a=Date.now()+r,c=new pc(t,e,a,s,i);return c.start(r),c}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(P.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function gc(n,t){if(Te("AsyncQueue",`${t}: ${n}`),Yn(n))return new M(P.UNAVAILABLE,`${t}: ${n}`);throw n}/**
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
 */class Nn{static emptySet(t){return new Nn(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||x.comparator(e.key,r.key):(e,r)=>x.comparator(e.key,r.key),this.keyedMap=Tr(),this.sortedSet=new ot(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,r)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Nn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new Nn;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
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
 */class oh{constructor(){this.ga=new ot(x.comparator)}track(t){const e=t.doc.key,r=this.ga.get(e);r?t.type!==0&&r.type===3?this.ga=this.ga.insert(e,t):t.type===3&&r.type!==1?this.ga=this.ga.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.ga=this.ga.remove(e):t.type===1&&r.type===2?this.ga=this.ga.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):L(63341,{Rt:t,pa:r}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal(((e,r)=>{t.push(r)})),t}}class $n{constructor(t,e,r,s,i,a,c,l,h){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(t,e,r,s,i){const a=[];return e.forEach((c=>{a.push({type:0,doc:c})})),new $n(t,e,Nn.emptySet(e),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Oi(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class Db{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((t=>t.Da()))}}class Nb{constructor(){this.queries=ah(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,r){const s=j(e),i=s.queries;s.queries=ah(),i.forEach(((a,c)=>{for(const l of c.Sa)l.onError(r)}))})(this,new M(P.ABORTED,"Firestore shutting down"))}}function ah(){return new fn((n=>ap(n)),Oi)}async function qp(n,t){const e=j(n);let r=3;const s=t.query;let i=e.queries.get(s);i?!i.ba()&&t.Da()&&(r=2):(i=new Db,r=t.Da()?0:1);try{switch(r){case 0:i.wa=await e.onListen(s,!0);break;case 1:i.wa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const c=gc(a,`Initialization of query '${vn(t.query)}' failed`);return void t.onError(c)}e.queries.set(s,i),i.Sa.push(t),t.va(e.onlineState),i.wa&&t.Fa(i.wa)&&mc(e)}async function Hp(n,t){const e=j(n),r=t.query;let s=3;const i=e.queries.get(r);if(i){const a=i.Sa.indexOf(t);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=t.Da()?0:1:!i.ba()&&t.Da()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function Ob(n,t){const e=j(n);let r=!1;for(const s of t){const i=s.query,a=e.queries.get(i);if(a){for(const c of a.Sa)c.Fa(s)&&(r=!0);a.wa=s}}r&&mc(e)}function Mb(n,t,e){const r=j(n),s=r.queries.get(t);if(s)for(const i of s.Sa)i.onError(e);r.queries.delete(t)}function mc(n){n.Ca.forEach((t=>{t.next()}))}var ua,ch;(ch=ua||(ua={})).Ma="default",ch.Cache="cache";class zp{constructor(t,e,r){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new $n(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const r=e!=="Offline";return(!this.options.qa||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=$n.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==ua.Cache}}/**
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
 */class Wp{constructor(t){this.key=t}}class Jp{constructor(t){this.key=t}}class Lb{constructor(t,e){this.query=t,this.Ya=e,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=W(),this.mutatedKeys=W(),this.eu=cp(t),this.tu=new Nn(this.eu)}get nu(){return this.Ya}ru(t,e){const r=e?e.iu:new oh,s=e?e.tu:this.tu;let i=e?e.mutatedKeys:this.mutatedKeys,a=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((f,p)=>{const m=s.get(f),A=Mi(this.query,p)?p:null,S=!!m&&this.mutatedKeys.has(m.key),k=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let V=!1;m&&A?m.data.isEqual(A.data)?S!==k&&(r.track({type:3,doc:A}),V=!0):this.su(m,A)||(r.track({type:2,doc:A}),V=!0,(l&&this.eu(A,l)>0||h&&this.eu(A,h)<0)&&(c=!0)):!m&&A?(r.track({type:0,doc:A}),V=!0):m&&!A&&(r.track({type:1,doc:m}),V=!0,(l||h)&&(c=!0)),V&&(A?(a=a.add(A),i=k?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{tu:a,iu:r,Cs:c,mutatedKeys:i}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const i=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const a=t.iu.ya();a.sort(((f,p)=>(function(A,S){const k=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L(20277,{Rt:V})}};return k(A)-k(S)})(f.type,p.type)||this.eu(f.doc,p.doc))),this.ou(r),s=s??!1;const c=e&&!s?this._u():[],l=this.Xa.size===0&&this.current&&!s?1:0,h=l!==this.Za;return this.Za=l,a.length!==0||h?{snapshot:new $n(this.query,t.tu,i,a,t.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new oh,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(t){return!this.Ya.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach((e=>this.Ya=this.Ya.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Ya=this.Ya.delete(e))),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Xa;this.Xa=W(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))}));const e=[];return t.forEach((r=>{this.Xa.has(r)||e.push(new Jp(r))})),this.Xa.forEach((r=>{t.has(r)||e.push(new Wp(r))})),e}cu(t){this.Ya=t.Qs,this.Xa=W();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return $n.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const _c="SyncEngine";class xb{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class Ub{constructor(t){this.key=t,this.hu=!1}}class Fb{constructor(t,e,r,s,i,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new fn((c=>ap(c)),Oi),this.Iu=new Map,this.Eu=new Set,this.du=new ot(x.comparator),this.Au=new Map,this.Ru=new ic,this.Vu={},this.mu=new Map,this.fu=jn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Bb(n,t,e=!0){const r=Zp(n);let s;const i=r.Tu.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Gp(r,t,e,!0),s}async function jb(n,t){const e=Zp(n);await Gp(e,t,!0,!1)}async function Gp(n,t,e,r){const s=await ab(n.localStore,re(t)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,e);let c;return r&&(c=await $b(n,t,i,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&xp(n.remoteStore,s),c}async function $b(n,t,e,r,s){n.pu=(p,m,A)=>(async function(k,V,$,F){let K=V.view.ru($);K.Cs&&(K=await th(k.localStore,V.query,!1).then((({documents:w})=>V.view.ru(w,K))));const lt=F&&F.targetChanges.get(V.targetId),Ut=F&&F.targetMismatches.get(V.targetId)!=null,pt=V.view.applyChanges(K,k.isPrimaryClient,lt,Ut);return lh(k,V.targetId,pt.au),pt.snapshot})(n,p,m,A);const i=await th(n.localStore,t,!0),a=new Lb(t,i.Qs),c=a.ru(i.documents),l=is.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),h=a.applyChanges(c,n.isPrimaryClient,l);lh(n,e,h.au);const f=new xb(t,e,a);return n.Tu.set(t,f),n.Iu.has(e)?n.Iu.get(e).push(t):n.Iu.set(e,[t]),h.snapshot}async function qb(n,t,e){const r=j(n),s=r.Tu.get(t),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter((a=>!Oi(a,t)))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await aa(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),e&&lc(r.remoteStore,s.targetId),la(r,s.targetId)})).catch(Xn)):(la(r,s.targetId),await aa(r.localStore,s.targetId,!0))}async function Hb(n,t){const e=j(n),r=e.Tu.get(t),s=e.Iu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),lc(e.remoteStore,r.targetId))}async function zb(n,t,e){const r=Yb(n);try{const s=await(function(a,c){const l=j(a),h=rt.now(),f=c.reduce(((A,S)=>A.add(S.key)),W());let p,m;return l.persistence.runTransaction("Locally write mutations","readwrite",(A=>{let S=Ee(),k=W();return l.Ns.getEntries(A,f).next((V=>{S=V,S.forEach((($,F)=>{F.isValidDocument()||(k=k.add($))}))})).next((()=>l.localDocuments.getOverlayedDocuments(A,S))).next((V=>{p=V;const $=[];for(const F of c){const K=cv(F,p.get(F.key).overlayedDocument);K!=null&&$.push(new Ge(F.key,K,tp(K.value.mapValue),xt.exists(!0)))}return l.mutationQueue.addMutationBatch(A,h,$,c)})).next((V=>{m=V;const $=V.applyToLocalDocumentSet(p,k);return l.documentOverlayCache.saveOverlays(A,V.batchId,$)}))})).then((()=>({batchId:m.batchId,changes:lp(p)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(a,c,l){let h=a.Vu[a.currentUser.toKey()];h||(h=new ot(z)),h=h.insert(c,l),a.Vu[a.currentUser.toKey()]=h})(r,s.batchId,e),await as(r,s.changes),await ji(r.remoteStore)}catch(s){const i=gc(s,"Failed to persist write");e.reject(i)}}async function Kp(n,t){const e=j(n);try{const r=await sb(e.localStore,t);t.targetChanges.forEach(((s,i)=>{const a=e.Au.get(i);a&&(G(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?G(a.hu,14607):s.removedDocuments.size>0&&(G(a.hu,42227),a.hu=!1))})),await as(e,r,t)}catch(r){await Xn(r)}}function uh(n,t,e){const r=j(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Tu.forEach(((i,a)=>{const c=a.view.va(t);c.snapshot&&s.push(c.snapshot)})),(function(a,c){const l=j(a);l.onlineState=c;let h=!1;l.queries.forEach(((f,p)=>{for(const m of p.Sa)m.va(c)&&(h=!0)})),h&&mc(l)})(r.eventManager,t),s.length&&r.Pu.H_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Wb(n,t,e){const r=j(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Au.get(t),i=s&&s.key;if(i){let a=new ot(x.comparator);a=a.insert(i,Et.newNoDocument(i,U.min()));const c=W().add(i),l=new Ui(U.min(),new Map,new ot(z),a,c);await Kp(r,l),r.du=r.du.remove(i),r.Au.delete(t),yc(r)}else await aa(r.localStore,t,!1).then((()=>la(r,t,e))).catch(Xn)}async function Jb(n,t){const e=j(n),r=t.batch.batchId;try{const s=await rb(e.localStore,t);Xp(e,r,null),Qp(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await as(e,s)}catch(s){await Xn(s)}}async function Gb(n,t,e){const r=j(n);try{const s=await(function(a,c){const l=j(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return l.mutationQueue.lookupMutationBatch(h,c).next((p=>(G(p!==null,37113),f=p.keys(),l.mutationQueue.removeMutationBatch(h,p)))).next((()=>l.mutationQueue.performConsistencyCheck(h))).next((()=>l.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>l.localDocuments.getDocuments(h,f)))}))})(r.localStore,t);Xp(r,t,e),Qp(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await as(r,s)}catch(s){await Xn(s)}}function Qp(n,t){(n.mu.get(t)||[]).forEach((e=>{e.resolve()})),n.mu.delete(t)}function Xp(n,t,e){const r=j(n);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),r.Vu[r.currentUser.toKey()]=s}}function la(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Iu.get(t))n.Tu.delete(r),e&&n.Pu.yu(r,e);n.Iu.delete(t),n.isPrimaryClient&&n.Ru.jr(t).forEach((r=>{n.Ru.containsKey(r)||Yp(n,r)}))}function Yp(n,t){n.Eu.delete(t.path.canonicalString());const e=n.du.get(t);e!==null&&(lc(n.remoteStore,e),n.du=n.du.remove(t),n.Au.delete(e),yc(n))}function lh(n,t,e){for(const r of e)r instanceof Wp?(n.Ru.addReference(r.key,t),Kb(n,r)):r instanceof Jp?(N(_c,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,t),n.Ru.containsKey(r.key)||Yp(n,r.key)):L(19791,{wu:r})}function Kb(n,t){const e=t.key,r=e.path.canonicalString();n.du.get(e)||n.Eu.has(r)||(N(_c,"New document in limbo: "+e),n.Eu.add(r),yc(n))}function yc(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const t=n.Eu.values().next().value;n.Eu.delete(t);const e=new x(nt.fromString(t)),r=n.fu.next();n.Au.set(r,new Ub(e)),n.du=n.du.insert(e,r),xp(n.remoteStore,new Ne(re(Ni(e.path)),r,"TargetPurposeLimboResolution",ki.ce))}}async function as(n,t,e){const r=j(n),s=[],i=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach(((c,l)=>{a.push(r.pu(l,t,e).then((h=>{var f;if((h||e)&&r.isPrimaryClient){const p=h?!h.fromCache:(f=e==null?void 0:e.targetChanges.get(l.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(h){s.push(h);const p=ac.As(l.targetId,h);i.push(p)}})))})),await Promise.all(a),r.Pu.H_(s),await(async function(l,h){const f=j(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>R.forEach(h,(m=>R.forEach(m.Es,(A=>f.persistence.referenceDelegate.addReference(p,m.targetId,A))).next((()=>R.forEach(m.ds,(A=>f.persistence.referenceDelegate.removeReference(p,m.targetId,A)))))))))}catch(p){if(!Yn(p))throw p;N(cc,"Failed to update sequence numbers: "+p)}for(const p of h){const m=p.targetId;if(!p.fromCache){const A=f.Ms.get(m),S=A.snapshotVersion,k=A.withLastLimboFreeSnapshotVersion(S);f.Ms=f.Ms.insert(m,k)}}})(r.localStore,i))}async function Qb(n,t){const e=j(n);if(!e.currentUser.isEqual(t)){N(_c,"User change. New user:",t.toKey());const r=await Op(e.localStore,t);e.currentUser=t,(function(i,a){i.mu.forEach((c=>{c.forEach((l=>{l.reject(new M(P.CANCELLED,a))}))})),i.mu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await as(e,r.Ls)}}function Xb(n,t){const e=j(n),r=e.Au.get(t);if(r&&r.hu)return W().add(r.key);{let s=W();const i=e.Iu.get(t);if(!i)return s;for(const a of i){const c=e.Tu.get(a);s=s.unionWith(c.view.nu)}return s}}function Zp(n){const t=j(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Kp.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Xb.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Wb.bind(null,t),t.Pu.H_=Ob.bind(null,t.eventManager),t.Pu.yu=Mb.bind(null,t.eventManager),t}function Yb(n){const t=j(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Jb.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Gb.bind(null,t),t}class hi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Fi(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return nb(this.persistence,new Zv,t.initialUser,this.serializer)}Cu(t){return new Np(oc.mi,this.serializer)}Du(t){return new ub}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}hi.provider={build:()=>new hi};class Zb extends hi{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){G(this.persistence.referenceDelegate instanceof ui,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Uv(r,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?Lt.withCacheSize(this.cacheSizeBytes):Lt.DEFAULT;return new Np((r=>ui.mi(r,e)),this.serializer)}}class ha{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>uh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Qb.bind(null,this.syncEngine),await Vb(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new Nb})()}createDatastore(t){const e=Fi(t.databaseInfo.databaseId),r=(function(i){return new pb(i)})(t.databaseInfo);return(function(i,a,c,l){return new yb(i,a,c,l)})(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return(function(r,s,i,a,c){return new Eb(r,s,i,a,c)})(this.localStore,this.datastore,t.asyncQueue,(e=>uh(this.syncEngine,e,0)),(function(){return rh.v()?new rh:new lb})())}createSyncEngine(t,e){return(function(s,i,a,c,l,h,f){const p=new Fb(s,i,a,c,l,h);return f&&(p.gu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await(async function(s){const i=j(s);N(hn,"RemoteStore shutting down."),i.Ea.add(5),await os(i),i.Aa.shutdown(),i.Ra.set("Unknown")})(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}ha.provider={build:()=>new ha};/**
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
 */class tg{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):Te("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
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
 */class tC{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new M(P.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const e=await(async function(s,i){const a=j(s),c={documents:i.map((p=>ci(a.serializer,p)))},l=await a.Ho("BatchGetDocuments",a.serializer.databaseId,nt.emptyPath(),c,i.length),h=new Map;l.forEach((p=>{const m=wv(a.serializer,p);h.set(m.key.toString(),m)}));const f=[];return i.forEach((p=>{const m=h.get(p.toString());G(!!m,55234,{key:p}),f.push(m)})),f})(this.datastore,t);return e.forEach((r=>this.recordVersion(r))),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(t.toString())}delete(t){this.write(new ec(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach((e=>{t.delete(e.key.toString())})),t.forEach(((e,r)=>{const s=x.fromPath(r);this.mutations.push(new Tp(s,this.precondition(s)))})),await(async function(r,s){const i=j(r),a={writes:s.map((c=>Rp(i.serializer,c)))};await i.Go("Commit",i.serializer.databaseId,nt.emptyPath(),a)})(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw L(50498,{Gu:t.constructor.name});e=U.min()}const r=this.readVersions.get(t.key.toString());if(r){if(!e.isEqual(r))throw new M(P.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?e.isEqual(U.min())?xt.exists(!1):xt.updateTime(e):xt.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(U.min()))throw new M(P.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return xt.updateTime(e)}return xt.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}/**
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
 */class eC{constructor(t,e,r,s,i){this.asyncQueue=t,this.datastore=e,this.options=r,this.updateFunction=s,this.deferred=i,this.zu=r.maxAttempts,this.M_=new uc(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_((async()=>{const t=new tC(this.datastore),e=this.Hu(t);e&&e.then((r=>{this.asyncQueue.enqueueAndForget((()=>t.commit().then((()=>{this.deferred.resolve(r)})).catch((s=>{this.Yu(s)}))))})).catch((r=>{this.Yu(r)}))}))}Hu(t){try{const e=this.updateFunction(t);return!rs(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Yu(t){this.zu>0&&this.Zu(t)?(this.zu-=1,this.asyncQueue.enqueueAndForget((()=>(this.Ju(),Promise.resolve())))):this.deferred.reject(t)}Zu(t){if((t==null?void 0:t.name)==="FirebaseError"){const e=t.code;return e==="aborted"||e==="failed-precondition"||e==="already-exists"||!Ep(e)}return!1}}/**
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
 */const ze="FirestoreClient";class nC{constructor(t,e,r,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=s,this.user=Rt.UNAUTHENTICATED,this.clientId=Ja.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{N(ze,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(N(ze,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new pe;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=gc(e,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function Oo(n,t){n.asyncQueue.verifyOperationInProgress(),N(ze,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Op(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=t}async function hh(n,t){n.asyncQueue.verifyOperationInProgress();const e=await rC(n);N(ze,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener((r=>ih(t.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>ih(t.remoteStore,s))),n._onlineComponents=t}async function rC(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N(ze,"Using user provided OfflineComponentProvider");try{await Oo(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;xn("Error using user provided cache. Falling back to memory cache: "+e),await Oo(n,new hi)}}else N(ze,"Using default OfflineComponentProvider"),await Oo(n,new Zb(void 0));return n._offlineComponents}async function Tc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N(ze,"Using user provided OnlineComponentProvider"),await hh(n,n._uninitializedComponentsProvider._online)):(N(ze,"Using default OnlineComponentProvider"),await hh(n,new ha))),n._onlineComponents}function sC(n){return Tc(n).then((t=>t.syncEngine))}function iC(n){return Tc(n).then((t=>t.datastore))}async function da(n){const t=await Tc(n),e=t.eventManager;return e.onListen=Bb.bind(null,t.syncEngine),e.onUnlisten=qb.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=jb.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Hb.bind(null,t.syncEngine),e}function oC(n,t,e={}){const r=new pe;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,l,h){const f=new tg({next:m=>{f.Nu(),a.enqueueAndForget((()=>Hp(i,p)));const A=m.docs.has(c);!A&&m.fromCache?h.reject(new M(P.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&m.fromCache&&l&&l.source==="server"?h.reject(new M(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(m)},error:m=>h.reject(m)}),p=new zp(Ni(c.path),f,{includeMetadataChanges:!0,qa:!0});return qp(i,p)})(await da(n),n.asyncQueue,t,e,r))),r.promise}/**
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
 */function eg(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
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
 */const dh=new Map;/**
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
 */const ng="firestore.googleapis.com",fh=!0;class ph{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new M(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=ng,this.ssl=fh}else this.host=t.host,this.ssl=t.ssl??fh;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Dp;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Lv)throw new M(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}EA("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=eg(t.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new M(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new M(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new M(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Ec{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ph({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new M(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ph(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new uA;switch(r.type){case"firstParty":return new fA(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new M(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=dh.get(e);r&&(N("ComponentProvider","Removing Datastore"),dh.delete(e),r.terminate())})(this),Promise.resolve()}}function aC(n,t,e,r={}){var h;n=ge(n,Ec);const s=Wn(t),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},c=`${t}:${e}`;s&&(Jd(`https://${c}`),Gd("Firestore",!0)),i.host!==ng&&i.host!==c&&xn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...i,host:c,ssl:s,emulatorOptions:r};if(!an(l,a)&&(n._setSettings(l),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=Rt.MOCK_USER;else{f=OT(r.mockUserToken,(h=n._app)==null?void 0:h.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new M(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Rt(m)}n._authCredentials=new lA(new qf(f,p))}}/**
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
 */class $i{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new $i(this.firestore,t,this._query)}}class ft{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new qr(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new ft(this.firestore,t,this._key)}toJSON(){return{type:ft._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(ns(e,ft._jsonSchema))return new ft(t,r||null,new x(nt.fromString(e.referencePath)))}}ft._jsonSchemaVersion="firestore/documentReference/1.0",ft._jsonSchema={type:dt("string",ft._jsonSchemaVersion),referencePath:dt("string")};class qr extends $i{constructor(t,e,r){super(t,e,Ni(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new ft(this.firestore,null,new x(t))}withConverter(t){return new qr(this.firestore,t,this._path)}}function tr(n,t,...e){if(n=It(n),arguments.length===1&&(t=Ja.newId()),TA("doc","path",t),n instanceof Ec){const r=nt.fromString(t,...e);return Rl(r),new ft(n,null,new x(r))}{if(!(n instanceof ft||n instanceof qr))throw new M(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(nt.fromString(t,...e));return Rl(r),new ft(n.firestore,n instanceof qr?n.converter:null,new x(r))}}/**
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
 */const gh="AsyncQueue";class mh{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new uc(this,"async_queue_retry"),this._c=()=>{const r=No();r&&N(gh,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=t;const e=No();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=No();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new pe;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Xu.push(t),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!Yn(t))throw t;N(gh,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((r=>{throw this.nc=r,this.rc=!1,Te("INTERNAL UNHANDLED ERROR: ",_h(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=e,e}enqueueAfterDelay(t,e,r){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=pc.createAndSchedule(this,t,e,r,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&L(47125,{Pc:_h(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then((()=>{this.tc.sort(((e,r)=>e.targetTimeMs-r.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}dc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function _h(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function yh(n){return(function(e,r){if(typeof e!="object"||e===null)return!1;const s=e;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}class qn extends Ec{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new mh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new mh(t),this._firestoreClient=void 0,await t}}}function cC(n,t){const e=typeof n=="object"?n:Yd(),r=typeof n=="string"?n:ni,s=Oa(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=DT("firestore");i&&aC(s,...i)}return s}function qi(n){if(n._terminated)throw new M(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||uC(n),n._firestoreClient}function uC(n){var r,s,i;const t=n._freezeSettings(),e=(function(c,l,h,f){return new VA(c,l,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,eg(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)})(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,t);n._componentsProvider||(s=t.localCache)!=null&&s._offlineComponentProvider&&((i=t.localCache)!=null&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new nC(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&(function(c){const l=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(l),_online:l}})(n._componentsProvider))}/**
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
 */class Bt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Bt(bt.fromBase64String(t))}catch(e){throw new M(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Bt(bt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Bt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(ns(t,Bt._jsonSchema))return Bt.fromBase64String(t.bytes)}}Bt._jsonSchemaVersion="firestore/bytes/1.0",Bt._jsonSchema={type:dt("string",Bt._jsonSchemaVersion),bytes:dt("string")};/**
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
 */class Hi{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new M(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new vt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class zi{constructor(t){this._methodName=t}}/**
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
 */class se{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new M(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new M(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return z(this._lat,t._lat)||z(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:se._jsonSchemaVersion}}static fromJSON(t){if(ns(t,se._jsonSchema))return new se(t.latitude,t.longitude)}}se._jsonSchemaVersion="firestore/geoPoint/1.0",se._jsonSchema={type:dt("string",se._jsonSchemaVersion),latitude:dt("number"),longitude:dt("number")};/**
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
 */class ie{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,t._values)}toJSON(){return{type:ie._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(ns(t,ie._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new ie(t.vectorValues);throw new M(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ie._jsonSchemaVersion="firestore/vectorValue/1.0",ie._jsonSchema={type:dt("string",ie._jsonSchemaVersion),vectorValues:dt("object")};/**
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
 */const lC=/^__.*__$/;class hC{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Ge(t,this.data,this.fieldMask,e,this.fieldTransforms):new ss(t,this.data,e,this.fieldTransforms)}}class rg{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new Ge(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function sg(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L(40011,{Ac:n})}}class wc{constructor(t,e,r,s,i,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new wc({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.Vc({path:e,fc:!1});return r.gc(t),r}yc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.Vc({path:e,fc:!1});return r.Rc(),r}wc(t){return this.Vc({path:void 0,fc:!0})}Sc(t){return di(t,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}Rc(){if(this.path)for(let t=0;t<this.path.length;t++)this.gc(this.path.get(t))}gc(t){if(t.length===0)throw this.Sc("Document fields must not be empty");if(sg(this.Ac)&&lC.test(t))throw this.Sc('Document fields cannot begin and end with "__"')}}class dC{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Fi(t)}Cc(t,e,r,s=!1){return new wc({Ac:t,methodName:e,Dc:r,path:vt.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ig(n){const t=n._freezeSettings(),e=Fi(n._databaseId);return new dC(n._databaseId,!!t.ignoreUndefinedProperties,e)}function og(n,t,e,r,s,i={}){const a=n.Cc(i.merge||i.mergeFields?2:0,t,e,s);Ac("Data must be an object, but it was:",a,r);const c=ag(r,a);let l,h;if(i.merge)l=new $t(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const m=fa(t,p,e);if(!a.contains(m))throw new M(P.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);ug(f,m)||f.push(m)}l=new $t(f),h=a.fieldTransforms.filter((p=>l.covers(p.field)))}else l=null,h=a.fieldTransforms;return new hC(new Nt(c),l,h)}class Wi extends zi{_toFieldTransform(t){if(t.Ac!==2)throw t.Ac===1?t.Sc(`${this._methodName}() can only appear at the top level of your update data`):t.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Wi}}class Ic extends zi{_toFieldTransform(t){return new sv(t.path,new Br)}isEqual(t){return t instanceof Ic}}function fC(n,t,e,r){const s=n.Cc(1,t,e);Ac("Data must be an object, but it was:",s,r);const i=[],a=Nt.empty();Je(r,((l,h)=>{const f=vc(t,l,e);h=It(h);const p=s.yc(f);if(h instanceof Wi)i.push(f);else{const m=Ji(h,p);m!=null&&(i.push(f),a.set(f,m))}}));const c=new $t(i);return new rg(a,c,s.fieldTransforms)}function pC(n,t,e,r,s,i){const a=n.Cc(1,t,e),c=[fa(t,r,e)],l=[s];if(i.length%2!=0)throw new M(P.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<i.length;m+=2)c.push(fa(t,i[m])),l.push(i[m+1]);const h=[],f=Nt.empty();for(let m=c.length-1;m>=0;--m)if(!ug(h,c[m])){const A=c[m];let S=l[m];S=It(S);const k=a.yc(A);if(S instanceof Wi)h.push(A);else{const V=Ji(S,k);V!=null&&(h.push(A),f.set(A,V))}}const p=new $t(h);return new rg(f,p,a.fieldTransforms)}function Ji(n,t){if(cg(n=It(n)))return Ac("Unsupported field value:",t,n),ag(n,t);if(n instanceof zi)return(function(r,s){if(!sg(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.fc&&t.Ac!==4)throw t.Sc("Nested arrays are not supported");return(function(r,s){const i=[];let a=0;for(const c of r){let l=Ji(c,s.wc(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}})(n,t)}return(function(r,s){if((r=It(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return ev(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=rt.fromDate(r);return{timestampValue:ai(s.serializer,i)}}if(r instanceof rt){const i=new rt(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ai(s.serializer,i)}}if(r instanceof se)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Bt)return{bytesValue:vp(s.serializer,r._byteString)};if(r instanceof ft){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:sc(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof ie)return(function(a,c){return{mapValue:{fields:{[Yf]:{stringValue:Zf},[ri]:{arrayValue:{values:a.toArray().map((h=>{if(typeof h!="number")throw c.Sc("VectorValues must only contain numeric values.");return tc(c.serializer,h)}))}}}}}})(r,s);throw s.Sc(`Unsupported field value: ${Ga(r)}`)})(n,t)}function ag(n,t){const e={};return Wf(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Je(n,((r,s)=>{const i=Ji(s,t.mc(r));i!=null&&(e[r]=i)})),{mapValue:{fields:e}}}function cg(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof rt||n instanceof se||n instanceof Bt||n instanceof ft||n instanceof zi||n instanceof ie)}function Ac(n,t,e){if(!cg(e)||!Hf(e)){const r=Ga(e);throw r==="an object"?t.Sc(n+" a custom object"):t.Sc(n+" "+r)}}function fa(n,t,e){if((t=It(t))instanceof Hi)return t._internalPath;if(typeof t=="string")return vc(n,t);throw di("Field path arguments must be of type string or ",n,!1,void 0,e)}const gC=new RegExp("[~\\*/\\[\\]]");function vc(n,t,e){if(t.search(gC)>=0)throw di(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Hi(...t.split("."))._internalPath}catch{throw di(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function di(n,t,e,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${r}`),a&&(l+=` in document ${s}`),l+=")"),new M(P.INVALID_ARGUMENT,c+n+l)}function ug(n,t){return n.some((e=>e.isEqual(t)))}/**
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
 */class fi{constructor(t,e,r,s,i){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ft(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new mC(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(lg("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class mC extends fi{data(){return super.data()}}function lg(n,t){return typeof t=="string"?vc(n,t):t instanceof Hi?t._internalPath:t._delegate._internalPath}/**
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
 */function _C(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new M(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class hg{convertValue(t,e="none"){switch(qe(t)){case 0:return null;case 1:return t.booleanValue;case 2:return ut(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes($e(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw L(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return Je(t,((s,i)=>{r[s]=this.convertValue(i,e)})),r}convertVectorValue(t){var r,s,i;const e=(i=(s=(r=t.fields)==null?void 0:r[ri].arrayValue)==null?void 0:s.values)==null?void 0:i.map((a=>ut(a.doubleValue)));return new ie(e)}convertGeoPoint(t){return new se(ut(t.latitude),ut(t.longitude))}convertArray(t,e){return(t.values||[]).map((r=>this.convertValue(r,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Vi(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(xr(t));default:return null}}convertTimestamp(t){const e=je(t);return new rt(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=nt.fromString(t);G(Vp(r),9688,{name:t});const s=new Ur(r.get(1),r.get(3)),i=new x(r.popFirst(5));return s.isEqual(e)||Te(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
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
 */function dg(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}class yC extends hg{constructor(t){super(),this.firestore=t}convertBytes(t){return new Bt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new ft(this.firestore,null,e)}}class Sn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Fe extends fi{constructor(t,e,r,s,i,a){super(t,e,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Bs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(lg("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new M(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=Fe._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}Fe._jsonSchemaVersion="firestore/documentSnapshot/1.0",Fe._jsonSchema={type:dt("string",Fe._jsonSchemaVersion),bundleSource:dt("string","DocumentSnapshot"),bundleName:dt("string"),bundle:dt("string")};class Bs extends Fe{data(t={}){return super.data(t)}}class On{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Sn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((r=>{t.call(e,new Bs(this._firestore,this._userDataWriter,r.key,r,new Sn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new M(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((c=>{const l=new Bs(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Sn(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const l=new Bs(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Sn(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:TC(c.type),doc:l,oldIndex:h,newIndex:f}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new M(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=On._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Ja.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(e.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function TC(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L(61501,{type:n})}}/**
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
 */function Gi(n){n=ge(n,ft);const t=ge(n.firestore,qn);return oC(qi(t),n._key).then((e=>fg(t,n,e)))}On._jsonSchemaVersion="firestore/querySnapshot/1.0",On._jsonSchema={type:dt("string",On._jsonSchemaVersion),bundleSource:dt("string","QuerySnapshot"),bundleName:dt("string"),bundle:dt("string")};class bc extends hg{constructor(t){super(),this.firestore=t}convertBytes(t){return new Bt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new ft(this.firestore,null,e)}}function er(n,t,e){n=ge(n,ft);const r=ge(n.firestore,qn),s=dg(n.converter,t,e);return EC(r,[og(ig(r),"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,xt.none())])}function cs(n,...t){var l,h,f;n=It(n);let e={includeMetadataChanges:!1,source:"default"},r=0;typeof t[r]!="object"||yh(t[r])||(e=t[r++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(yh(t[r])){const p=t[r];t[r]=(l=p.next)==null?void 0:l.bind(p),t[r+1]=(h=p.error)==null?void 0:h.bind(p),t[r+2]=(f=p.complete)==null?void 0:f.bind(p)}let i,a,c;if(n instanceof ft)a=ge(n.firestore,qn),c=Ni(n._key.path),i={next:p=>{t[r]&&t[r](fg(a,n,p))},error:t[r+1],complete:t[r+2]};else{const p=ge(n,$i);a=ge(p.firestore,qn),c=p._query;const m=new bc(a);i={next:A=>{t[r]&&t[r](new On(a,m,p,A))},error:t[r+1],complete:t[r+2]},_C(n._query)}return(function(m,A,S,k){const V=new tg(k),$=new zp(A,V,S);return m.asyncQueue.enqueueAndForget((async()=>qp(await da(m),$))),()=>{V.Nu(),m.asyncQueue.enqueueAndForget((async()=>Hp(await da(m),$)))}})(qi(a),c,s,i)}function EC(n,t){return(function(r,s){const i=new pe;return r.asyncQueue.enqueueAndForget((async()=>zb(await sC(r),s,i))),i.promise})(qi(n),t)}function fg(n,t,e){const r=e.docs.get(t._key),s=new bc(n);return new Fe(n,s,t._key,r,new Sn(e.hasPendingWrites,e.fromCache),t.converter)}/**
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
 */const wC={maxAttempts:5};function wr(n,t){if((n=It(n)).firestore!==t)throw new M(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
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
 */class IC{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=ig(t)}get(t){const e=wr(t,this._firestore),r=new yC(this._firestore);return this._transaction.lookup([e._key]).then((s=>{if(!s||s.length!==1)return L(24041);const i=s[0];if(i.isFoundDocument())return new fi(this._firestore,r,i.key,i,e.converter);if(i.isNoDocument())return new fi(this._firestore,r,e._key,null,e.converter);throw L(18433,{doc:i})}))}set(t,e,r){const s=wr(t,this._firestore),i=dg(s.converter,e,r),a=og(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,a),this}update(t,e,r,...s){const i=wr(t,this._firestore);let a;return a=typeof(e=It(e))=="string"||e instanceof Hi?pC(this._dataReader,"Transaction.update",i._key,e,r,s):fC(this._dataReader,"Transaction.update",i._key,e),this._transaction.update(i._key,a),this}delete(t){const e=wr(t,this._firestore);return this._transaction.delete(e._key),this}}/**
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
 */class AC extends IC{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=wr(t,this._firestore),r=new bc(this._firestore);return super.get(t).then((s=>new Fe(this._firestore,r,e._key,s._document,new Sn(!1,!1),e.converter)))}}function vC(n,t,e){n=ge(n,qn);const r={...wC,...e};return(function(i){if(i.maxAttempts<1)throw new M(P.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r),(function(i,a,c){const l=new pe;return i.asyncQueue.enqueueAndForget((async()=>{const h=await iC(i);new eC(i.asyncQueue,h,c,a,l).ju()})),l.promise})(qi(n),(s=>t(new AC(n,s))),r)}function gn(){return new Ic("serverTimestamp")}(function(t,e=!0){(function(s){Qn=s})(Jn),Mn(new cn("firestore",((r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new qn(new hA(r.getProvider("auth-internal")),new pA(a,r.getProvider("app-check-internal")),(function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new M(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ur(h.options.projectId,f)})(a,s),a);return i={useFetchStreams:e,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),Le(vl,bl,t),Le(vl,bl,"esm2020")})();const Mo=(n="")=>n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),wn=(n,t)=>{if(typeof t=="string"&&t.trim())return t.trim();throw new Error(`Missing required environment variable: ${n}`)},bC={apiKey:wn("VITE_FIREBASE_API_KEY","AIzaSyCrb9srW-7b00s6xIljzvicUZ_tXO4DeYo"),authDomain:wn("VITE_FIREBASE_AUTH_DOMAIN","auth.3dlocalprint.com"),projectId:wn("VITE_FIREBASE_PROJECT_ID","threedlocalprint"),storageBucket:wn("VITE_FIREBASE_STORAGE_BUCKET","threedlocalprint.firebasestorage.app"),messagingSenderId:wn("VITE_FIREBASE_MESSAGING_SENDER_ID","770972495364"),appId:wn("VITE_FIREBASE_APP_ID","1:770972495364:web:b1015eaaf0de32d9b84f51")},pg=Xd(bC),Hn=aA(pg),Th=new he,mn=cC(pg),pi=tr(mn,"filament_inventory","list"),Cc=tr(mn,"filament_types","list"),Sc=tr(mn,"manufacturers","list"),Rc=tr(mn,"admins","list"),gg=tr(mn,"ledger","entries"),mg=tr(mn,"ledger","moneyAccounts"),Eh=(n="")=>n.trim().toLowerCase(),Pc=n=>(Array.isArray(n)?n:[]).map(t=>{if(typeof t=="string")return{label:t.trim(),iconUrl:""};if(t&&typeof t=="object"){const e=String(t.label||"").trim(),r=String(t.iconUrl||"").trim();return{label:e,iconUrl:r}}return null}).filter(t=>!!(t!=null&&t.label)),CC=()=>typeof navigator<"u"&&/iPad|iPhone|iPod/i.test(navigator.userAgent||""),SC=async()=>{const n=[{key:"indexedDB",value:kf},{key:"local",value:vf},{key:"session",value:$a}];let t=null;for(const e of n)try{return await Jw(Hn,e.value),{persistence:e.key,error:null}}catch(r){t=r,console.warn(`Failed to set ${e.key} persistence`,r)}return{persistence:"none",error:t}},RC=async()=>{let n=null,t=null;try{t=await AI(Hn)}catch(r){n=r,console.error("Firebase redirect sign-in failed",r)}const e=await SC();return{redirectError:n,redirectResult:t,persistence:e}},PC=async()=>{try{return await gI(Hn,Th)}catch(n){if(!CC())throw n;return console.warn("Popup sign-in failed on iOS, falling back to redirect",n),wI(Hn,Th)}},kC=()=>Xw(Hn),VC=n=>Qw(Hn,n),pS=async()=>{const n=await Gi(pi);if(!n.exists())return null;const t=n.data();return Array.isArray(t.items)?t.items:[]},gS=n=>er(pi,{items:n,updatedAt:gn()},{merge:!0}),mS=async()=>{const n=await Gi(Cc);if(!n.exists())return null;const t=n.data();return Array.isArray(t.items)?t.items:[]},_S=n=>cs(Cc,t=>{if(!t.exists()){n(null);return}const e=t.data();n(Array.isArray(e.items)?e.items:[])},t=>{console.error("Failed to subscribe to filament types",t),n(null)}),yS=n=>er(Cc,{items:n,updatedAt:gn()},{merge:!0}),TS=async({location:n="",adjustments:t={}}={})=>{const e=Mo(n),r=Object.entries(t).filter(([,s])=>Number(s));if(!(!e||!r.length))return vC(mn,async s=>{const i=await s.get(pi);if(!i.exists())throw new Error("Filament inventory list not found.");const a=i.data(),c=Array.isArray(a.items)?a.items:[],l=c.map(f=>{if(Mo(f.location||"")!==e)return f;const p=f.filament_type_id||"";if(!p||!(p in t))return f;const m=Number(t[p])||0;if(!m)return f;const A=Number(f.spool_inventory)||0,S=Math.max(0,A+m);return{...f,spool_inventory:S}}),h=new Set(c.filter(f=>Mo(f.location||"")===e).map(f=>f.filament_type_id).filter(Boolean));r.forEach(([f,p])=>{const m=Number(p)||0;m<=0||h.has(f)||l.push({filament_type_id:f,location:n,spool_inventory:m})}),s.set(pi,{items:l,updatedAt:gn()},{merge:!0})})},ES=async()=>{const n=await Gi(Sc);if(!n.exists())return null;const t=n.data();return Pc(t.items)},wS=n=>cs(Sc,t=>{if(!t.exists()){n(null);return}const e=t.data();n(Pc(e.items))},t=>{console.error("Failed to subscribe to 🏭 manufacturers",t),n(null)}),IS=n=>cs(Rc,t=>{if(!t.exists()){n(null);return}const e=t.data();n(Array.isArray(e.items)?e.items:[])},t=>{console.error("Failed to subscribe to admins",t),n(null)}),AS=n=>er(Sc,{items:Pc(n),updatedAt:gn()},{merge:!0}),DC=async()=>{const n=await Gi(Rc);if(!n.exists())return[];const t=n.data();return Array.isArray(t.items)?t.items:[]},NC=async(n="")=>(await DC()).map(Eh).includes(Eh(n)),vS=n=>er(Rc,{items:n,updatedAt:gn()},{merge:!0}),OC=(n=[])=>(Array.isArray(n)?n:[]).map(t=>{const e=Number(t.amount);if(!Number.isFinite(e)||e===0)throw new Error("Ledger amount must be a non-zero number.");const r=String(t.title||"").trim();if(!r)throw new Error("Ledger title is required.");const s=String(t.applicableDate||"");if(!/^\d{4}-\d{2}-\d{2}$/.test(s))throw new Error("Ledger applicable date must be a valid YYYY-MM-DD value.");const i=String(t.id||"").trim();if(!i)throw new Error("Ledger id is required.");return{id:i,amount:e,title:r,moneyAccountTitle:String(t.moneyAccountTitle||"").trim(),billingCategory:String(t.billingCategory||"").trim()||"",applicableDate:s,notes:String(t.notes||"").trim(),status:["pending","posted","reconciled"].includes(t.status)?t.status:"posted",createdAt:Number(t.createdAt)||Date.now(),updatedAt:Number(t.updatedAt)||Date.now()}}),bS=n=>er(gg,{items:OC(n),updatedAt:gn()},{merge:!0}),CS=n=>cs(gg,t=>{if(!t.exists()){n([]);return}const e=t.data();n(Array.isArray(e.items)?e.items:[])},t=>{console.error("Failed to subscribe to ledger entries",t),n([])}),MC=(n=[])=>(Array.isArray(n)?n:[]).map(t=>{const e=String(t.id||"").trim();if(!e)throw new Error("Money account id is required.");const r=String(t.title||"").trim();if(!r)throw new Error("Money account title is required.");return{id:e,title:r,notes:String(t.notes||"").trim(),createdAt:Number(t.createdAt)||Date.now(),updatedAt:Number(t.updatedAt)||Date.now()}}),SS=n=>er(mg,{items:MC(n),updatedAt:gn()},{merge:!0}),RS=n=>cs(mg,t=>{if(!t.exists()){n([]);return}const e=t.data();n(Array.isArray(e.items)?e.items:[])},t=>{console.error("Failed to subscribe to money accounts",t),n([])}),_g=tt((n,t,e,r,s)=>(_g.updates(i=>{[n,t,e,r,s]=i}),n==="loading"?Io.class`panel auth-panel`(Ao("Checking login...")):n==="denied"?Io.class`panel auth-panel`(Ju("Access denied"),Ao.class`auth-warning`(()=>t||"This account"," is not authorized."),Gu.class`auth-actions`(Wu.type`button`.class`add-button`.onClick(s)("Sign out"))):Io.class`panel auth-panel`(Ju("Sign in"),Ao("Use Google to access the filament inventory."),Gu.class`auth-actions`(Wu.type`button`.class`add-button`.onClick(r)("Sign in with Google"))))),LC=n=>{const t=n==null?void 0:n.current;if(!t)return null;const e=t.cloneNode(!1);return t.replaceWith(e),n.current=e,e},xC=({rootRef:n,status:t,userEmail:e,adminEmail:r,onSignIn:s,onSignOut:i,setAppMounted:a})=>{const c=LC(n);if(!c)return;a&&a(!1),c.replaceChildren();const l=tt(()=>_g(t,e,r,s,i));Oy(l,c)},wh="toast-root",UC=6e3,FC=()=>{let n=document.getElementById(wh);return n||(n=document.createElement("div"),n.id=wh,n.className="toast-root",document.body.appendChild(n),n)},BC=(n,t)=>{const e=document.createElement("div");return e.className=`toast toast-${t}`,e.setAttribute("role","status"),e.textContent=n,e},Lo=(n,t={})=>{if(!n)return;const{tone:e="info",duration:r=UC}=t,s=FC(),i=BC(n,e);s.appendChild(i);const a=window.setTimeout(()=>{i.remove()},r);i.addEventListener("click",()=>{window.clearTimeout(a),i.remove()},{once:!0})},PS={info:(n,t)=>Lo(n,{...t,tone:"info"}),success:(n,t)=>Lo(n,{...t,tone:"success"}),error:(n,t)=>Lo(n,{...t,tone:"error"})},jC=async({user:n,mountSso:t,toast:e,onDenied:r,onPermissionsError:s}={})=>{let i=!1;try{i=await NC((n==null?void 0:n.email)||"")}catch(a){return console.error("Failed to load admin list",a),typeof s=="function"&&s(a),e!=null&&e.error&&e.error("Unable to verify access. Check Firestore rules."),typeof t=="function"&&t("denied",(n==null?void 0:n.email)||"","auth:permissions"),!1}return i?!0:(typeof r=="function"&&r(),e!=null&&e.error&&e.error(`Signed in as ${(n==null?void 0:n.email)||"unknown"} but not authorized.`),typeof t=="function"&&t("denied",(n==null?void 0:n.email)||"","auth:denied"),!1)},$C=async({user:n,mountSso:t,toast:e,setCurrentUser:r,onSignedOut:s,onDenied:i,onAuthorized:a,reason:c=""}={})=>n?(typeof r=="function"&&r({email:n.email||"",photoURL:n.photoURL||""}),await jC({user:n,mountSso:t,toast:e,onDenied:i,onPermissionsError:i})?(typeof a=="function"&&a(n,c),!0):!1):(typeof r=="function"&&r(null),typeof s=="function"&&s(),typeof t=="function"&&t("login","","auth:logged-out"),!1),qC=({onUser:n,toast:t})=>{if(typeof n!="function")throw new Error("startAuthFlow requires an onUser callback.");RC().then(({redirectError:e,redirectResult:r,persistence:s})=>{var i,a;e&&((i=t==null?void 0:t.error)==null||i.call(t,"Sign-in failed after redirect. Try again.")),s!=null&&s.error&&((a=t==null?void 0:t.error)==null||a.call(t,"Safari blocked login storage. Check cookie settings.")),r!=null&&r.user&&n(r.user,"redirectResult")}).catch(e=>{var r;console.error("Failed to prepare auth",e),(r=t==null?void 0:t.error)==null||r.call(t,"Sign-in setup failed. Try again.")}),VC(e=>{n(e,"onAuthChanged")})},kS=({rootRef:n,toast:t,setAppMounted:e,setCurrentUser:r,onAuthorized:s,onSignedOut:i,onDenied:a,onAfterSsoMount:c,initialStatus:l="loading",initialReason:h="initial"})=>{const f={isAuthorized:!1},p=async()=>kC().catch(S=>{var k;console.error("Firebase sign-out failed",S),(k=t==null?void 0:t.error)==null||k.call(t,"Sign out failed. Try again.")}),m=(S,k="",V="")=>{n!=null&&n.current&&(xC({rootRef:n,status:S,userEmail:k,adminEmail:"",onSignIn:()=>PC().catch($=>{var F;console.error("Firebase sign-in failed",$),(F=t==null?void 0:t.error)==null||F.call(t,"Sign in failed. Try again.")}),onSignOut:p,setAppMounted:e}),typeof c=="function"&&c())};return m(l,"",h),qC({onUser:async(S,k="")=>{f.isAuthorized=!1,await $C({user:S,mountSso:m,toast:t,setCurrentUser:r,onSignedOut:i,onDenied:a,onAuthorized:($,F)=>{f.isAuthorized=!0,s==null||s({user:$,reason:F,authState:f,handleSignOut:p,mountSso:m})},reason:k})},toast:t}),{authState:f,handleSignOut:p,mountSso:m}};export{mS as $,oS as A,rS as B,iS as C,aS as D,sS as E,tS as F,QC as G,CS as H,RS as I,bS as J,SS as K,vy as L,by as M,Ay as N,Ot as O,H_ as P,js as Q,Wt as R,IS as S,vS as T,GC as U,Q as V,zC as W,ZC as X,YC as Y,Mo as Z,gS as _,cS as a,pS as a0,ES as a1,O as a2,ad as a3,ay as a4,eS as a5,ly as a6,TS as a7,Wu as b,Ju as c,Gu as d,kS as e,PS as f,hS as g,XC as h,uS as i,Oy as j,dS as k,lS as l,KC as m,WC as n,JC as o,Ao as p,Zh as q,LC as r,Io as s,tt as t,_S as u,wS as v,yS as w,AS as x,Xm as y,nS as z};
