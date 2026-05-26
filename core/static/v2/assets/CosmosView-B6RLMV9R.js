const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-8k7U5G8h.js","assets/vue-Cvl-Tb45.js","assets/index-RjWMaq7c.css","assets/OrbitControls-DLbav2l9.js","assets/labels-C11nZikY.js"])))=>i.map(i=>d[i]);
import{_ as yt,a as wn}from"./index-8k7U5G8h.js";import{m as Tm,u as Ie,c as At,l as En,s as G,f as Y,F as je,v as Yt,e as Pe,w as fe,x as $e,b as A,C as Tt,z as qt,D as ti,y as Mi,E as dn,p as Ts,o as Nt,i as an,A as Io,h as Ma,n as su,r as Vi,q as ls,t as bf,j as Ia,d as di}from"./vue-Cvl-Tb45.js";function Am(r,e){if(r.kind!==e.kind)return!1;if(r.kind==="global_overview")return!0;const t=r.lifeline_id,n=e.lifeline_id;if(t&&n)return t===n;const i=r.entity_id,s=e.entity_id;return i&&s?i===s:!1}const Gi=Tm("cosmos",()=>{const r=Ie(null),e=Ie({kind:"global_overview"}),t=Ie(!1),n=Ie(null),i=Ie(null),s=Ie([{state:{kind:"global_overview"},title:"全局"}]),a=Ie(0),o=At(()=>a.value>0),l=At(()=>a.value<s.value.length-1);function c(H){switch(H.kind){case"global_overview":return"全局";case"region_zoom":return r.value?.lifelines.find(de=>de.id===H.lifeline_id)?.name||H.lifeline_id||"?";case"node_focus":case"relation_reveal":{const ae=H.entity_id,_e=r.value?.entities.find(Z=>Z.id===ae)?.title||ae;return H.kind==="relation_reveal"?`${_e} · 关联`:_e}}}function u(H){const ae=s.value[a.value];ae&&Am(ae.state,H)||(s.value=s.value.slice(0,a.value+1),s.value.push({state:{...H},title:c(H)}),s.value.length>50?s.value.shift():a.value=s.value.length-1)}function d(H){p(`leave_${e.value.kind}`,e.value),e.value=H,i.value=null,p(`enter_${H.kind}`,H)}function h(H){i.value=H}const f={};function p(H,ae){f[H]?.forEach(de=>de(ae))}function v(H,ae){f[H]||(f[H]=[]),f[H].push(ae)}async function g(){if(!r.value){t.value=!0;try{const{apiRequest:H}=await yt(async()=>{const{apiRequest:ae}=await import("./index-8k7U5G8h.js").then(de=>de.c);return{apiRequest:ae}},__vite__mapDeps([0,1,2]));r.value=await H("/cosmos"),s.value=[{state:{kind:"global_overview"},title:"全局"}],a.value=0}catch{try{const ae=await fetch("/mock/cosmos.json");r.value=await ae.json(),s.value=[{state:{kind:"global_overview"},title:"全局"}],a.value=0}catch{n.value="Cosmos 数据加载失败"}}finally{t.value=!1}}}function m(H){u(H),d(H)}function _(){o.value&&(a.value--,d(s.value[a.value].state))}function x(){l.value&&(a.value++,d(s.value[a.value].state))}const y=Ie(null),w=At(()=>y.value!==null);function M(H){y.value=H}async function C(){if(!y.value)return null;try{await y.value.redo();const H=y.value.action;return y.value=null,H}catch{return await b(),y.value=null,null}}async function b(){r.value=null,n.value=null,ve.value.clear(),await g()}async function E(H){const{createLifeline:ae}=await yt(async()=>{const{createLifeline:de}=await import("./index-8k7U5G8h.js").then(_e=>_e.e);return{createLifeline:de}},__vite__mapDeps([0,1,2]));await ae(H),await b()}async function P(H,ae){const{updateLifeline:de}=await yt(async()=>{const{updateLifeline:_e}=await import("./index-8k7U5G8h.js").then(Z=>Z.e);return{updateLifeline:_e}},__vite__mapDeps([0,1,2]));await de(H,ae),await b()}async function D(H){const{deleteLifeline:ae}=await yt(async()=>{const{deleteLifeline:de}=await import("./index-8k7U5G8h.js").then(_e=>_e.e);return{deleteLifeline:de}},__vite__mapDeps([0,1,2]));await ae(H),await b()}async function k(H,ae,de){const{mountEntity:_e}=await yt(async()=>{const{mountEntity:Z}=await import("./index-8k7U5G8h.js").then(L=>L.e);return{mountEntity:Z}},__vite__mapDeps([0,1,2]));await _e(H,ae,de),await b()}async function Q(H,ae){const _e=r.value?.associations.find(Z=>Z.id===H)?.status;if(_e&&_e!==ae&&M({action:ae==="accepted"?"确认关联":"拒绝关联",redo:async()=>{await Q(H,_e)}}),r.value){const Z=r.value.associations.findIndex(L=>L.id===H);Z!==-1&&(r.value={...r.value,associations:[...r.value.associations.slice(0,Z),{...r.value.associations[Z],status:ae},...r.value.associations.slice(Z+1)]})}try{const{reviewAssociation:Z}=await yt(async()=>{const{reviewAssociation:L}=await import("./index-8k7U5G8h.js").then(F=>F.e);return{reviewAssociation:L}},__vite__mapDeps([0,1,2]));await Z(H,ae)}catch{await b()}}async function ne(H,ae,de){const _e=`${H}:${ae}`,Z=r.value?.entities.find(F=>F.id===_e)?.title;Z&&Z!==de&&M({action:"修改标题",redo:async()=>{await ne(H,ae,Z)}});const{updateEntity:L}=await yt(async()=>{const{updateEntity:F}=await import("./index-8k7U5G8h.js").then(B=>B.e);return{updateEntity:F}},__vite__mapDeps([0,1,2]));await L(H,ae,{title:de}),await b()}async function V(H,ae){const de=`${H}:${ae}`,_e=r.value?.entities.find(L=>L.id===de);if(_e){const L={title:_e.title,lifeline_id:_e.lifeline_id};M({action:`删除 entity "${_e.title.slice(0,20)}"`,redo:async()=>{if(H==="task"){const{createTask:F}=await yt(async()=>{const{createTask:K}=await import("./index-8k7U5G8h.js").then(W=>W.e);return{createTask:K}},__vite__mapDeps([0,1,2])),B=await F({title:L.title});L.lifeline_id&&await k("task",B.id,L.lifeline_id)}else if(H==="memory"){const{createMemory:F}=await yt(async()=>{const{createMemory:K}=await import("./index-8k7U5G8h.js").then(W=>W.e);return{createMemory:K}},__vite__mapDeps([0,1,2])),B=await F({category:"fact",content:L.title});L.lifeline_id&&await k("memory",B.id,L.lifeline_id)}else if(H==="decision"){const{createDecision:F}=await yt(async()=>{const{createDecision:K}=await import("./index-8k7U5G8h.js").then(W=>W.e);return{createDecision:K}},__vite__mapDeps([0,1,2])),B=await F({title:L.title,decision:L.title});L.lifeline_id&&await k("decision",B.id,L.lifeline_id)}else{const{addNote:F}=await yt(async()=>{const{addNote:K}=await import("./index-8k7U5G8h.js").then(W=>W.e);return{addNote:K}},__vite__mapDeps([0,1,2])),B=await F(L.title);L.lifeline_id&&await k("item",B.id,L.lifeline_id)}await b()}})}const{deleteEntity:Z}=await yt(async()=>{const{deleteEntity:L}=await import("./index-8k7U5G8h.js").then(F=>F.e);return{deleteEntity:L}},__vite__mapDeps([0,1,2]));await Z(H,ae),await b()}async function $(H){const{createAssociation:ae}=await yt(async()=>{const{createAssociation:de}=await import("./index-8k7U5G8h.js").then(_e=>_e.e);return{createAssociation:de}},__vite__mapDeps([0,1,2]));await ae({...H,status:"accepted"}),await b()}async function q(H,ae){const{updateAssociation:de}=await yt(async()=>{const{updateAssociation:_e}=await import("./index-8k7U5G8h.js").then(Z=>Z.e);return{updateAssociation:_e}},__vite__mapDeps([0,1,2]));await de(H,ae),await b()}async function ce(H){const ae=r.value?.associations.find(_e=>_e.id===H);if(ae){const _e={from:ae.from,to:ae.to,relation_type:ae.relation_type,confidence:ae.confidence,evidence:ae.evidence||[]};M({action:"删除关联",redo:async()=>{await $(_e)}})}const{deleteAssociation:de}=await yt(async()=>{const{deleteAssociation:_e}=await import("./index-8k7U5G8h.js").then(Z=>Z.e);return{deleteAssociation:_e}},__vite__mapDeps([0,1,2]));await de(H),await b()}const ve=Ie(new Map),be=Ie(null),Ae=Ie(null);function Oe(H,ae){be.value={fromId:H,fromTitle:ae}}function et(){be.value=null}function ht(H){Ae.value=H}function tt(){Ae.value=null}return{data:r,state:e,loading:t,error:n,load:g,reload:b,transition:m,on:v,createLifeline:E,updateLifeline:P,deleteLifeline:D,mountEntity:k,reviewAssociation:Q,selectedAssocId:i,selectAssociation:h,updateEntityTitle:ne,deleteEntityById:V,canGoBack:o,canGoForward:l,navigateBack:_,navigateForward:x,canUndo:w,undoLast:C,createAssoc:$,updateAssoc:q,deleteAssoc:ce,selectingTarget:be,startSelectingTarget:Oe,cancelSelecting:et,editAssoc:Ae,openEditAssoc:ht,closeEditAssoc:tt,entityDetailCache:ve}});/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const El="184",Cm={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Rm={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Mf=0,ru=1,Sf=2,Im=3,Pm=0,qr=1,wf=2,hr=3,ki=0,Sn=1,_i=2,Si=0,Is=1,au=2,ou=3,lu=4,Ef=5,Lm=6,es=100,Tf=101,Af=102,Cf=103,Rf=104,If=200,Pf=201,Lf=202,Df=203,Po=204,Lo=205,Uf=206,Nf=207,Ff=208,Of=209,kf=210,Bf=211,zf=212,Vf=213,Gf=214,Do=0,Uo=1,No=2,Us=3,Fo=4,Oo=5,ko=6,Bo=7,Sa=0,Hf=1,Wf=2,si=0,Au=1,Cu=2,Ru=3,Iu=4,Pu=5,Lu=6,Du=7,cu="attached",Xf="detached",Tl=300,wi=301,ss=302,Yr=303,Zr=304,Sr=306,sa=1e3,Dn=1001,ra=1002,Zt=1003,Uu=1004,Dm=1004,fr=1005,Um=1005,Ot=1006,Kr=1007,Nm=1007,yi=1008,Fm=1008,Pn=1009,Nu=1010,Fu=1011,vr=1012,Al=1013,qn=1014,bn=1015,Ei=1016,Cl=1017,Rl=1018,_r=1020,Ou=35902,ku=35899,Bu=1021,zu=1022,Mn=1023,Ti=1026,ts=1027,Il=1028,wa=1029,rs=1030,Pl=1031,Om=1032,Ll=1033,Jr=33776,jr=33777,Qr=33778,ea=33779,zo=35840,Vo=35841,Go=35842,Ho=35843,Wo=36196,Xo=37492,$o=37496,qo=37488,Yo=37489,aa=37490,Zo=37491,Ko=37808,Jo=37809,jo=37810,Qo=37811,el=37812,tl=37813,nl=37814,il=37815,sl=37816,rl=37817,al=37818,ol=37819,ll=37820,cl=37821,ul=36492,dl=36494,hl=36495,fl=36283,pl=36284,oa=36285,ml=36286,$f=2200,qf=2201,Yf=2202,la=2300,gl=2301,Ao=2302,uu=2303,As=2400,Cs=2401,ca=2402,Dl=2500,Vu=2501,km=0,Bm=1,zm=2,Zf=3200,Vm=3201,Gm=3202,Hm=3203,Bi=0,Kf=1,Ui="",In="srgb",ua="srgb-linear",da="linear",Ct="srgb",Wm="",Xm="rg",$m="ga",qm=0,ws=7680,Ym=7681,Zm=7682,Km=7683,Jm=34055,jm=34056,Qm=5386,eg=512,tg=513,ng=514,ig=515,sg=516,rg=517,ag=518,du=519,Jf=512,jf=513,Qf=514,Ul=515,ep=516,tp=517,Nl=518,np=519,ha=35044,og=35048,lg=35040,cg=35045,ug=35049,dg=35041,hg=35046,fg=35050,pg=35042,mg="100",hu="300 es",zn=2e3,Ns=2001,gg={COMPUTE:"compute",RENDER:"render"},vg={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},_g={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},xg={TEXTURE_COMPARE:"depthTextureCompare"};function yg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}const bg={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function pr(r,e){return new bg[r](e)}function ip(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function fa(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function sp(){const r=fa("canvas");return r.style.display="block",r}const Rd={};let as=null;function Mg(r){as=r}function Sg(){return as}function pa(...r){const e="THREE."+r.shift();as?as("log",e,...r):console.log(e,...r)}function rp(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Ce(...r){r=rp(r);const e="THREE."+r.shift();if(as)as("warn",e,...r);else{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function qe(...r){r=rp(r);const e="THREE."+r.shift();if(as)as("error",e,...r);else{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function vl(...r){const e=r.join(" ");e in Rd||(Rd[e]=!0,Ce(...r))}function wg(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Eg={[Do]:Uo,[No]:ko,[Fo]:Bo,[Us]:Oo,[Uo]:Do,[ko]:No,[Bo]:Fo,[Oo]:Us};class oi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const fn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Id=1234567;const Ps=Math.PI/180,xr=180/Math.PI;function Gn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(fn[r&255]+fn[r>>8&255]+fn[r>>16&255]+fn[r>>24&255]+"-"+fn[e&255]+fn[e>>8&255]+"-"+fn[e>>16&15|64]+fn[e>>24&255]+"-"+fn[t&63|128]+fn[t>>8&255]+"-"+fn[t>>16&255]+fn[t>>24&255]+fn[n&255]+fn[n>>8&255]+fn[n>>16&255]+fn[n>>24&255]).toLowerCase()}function st(r,e,t){return Math.max(e,Math.min(t,r))}function Gu(r,e){return(r%e+e)%e}function Tg(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Ag(r,e,t){return r!==e?(t-r)/(e-r):0}function ta(r,e,t){return(1-t)*r+t*e}function Cg(r,e,t,n){return ta(r,e,1-Math.exp(-t*n))}function Rg(r,e=1){return e-Math.abs(Gu(r,e*2)-e)}function Ig(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Pg(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Lg(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Dg(r,e){return r+Math.random()*(e-r)}function Ug(r){return r*(.5-Math.random())}function Ng(r){r!==void 0&&(Id=r);let e=Id+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Fg(r){return r*Ps}function Og(r){return r*xr}function kg(r){return(r&r-1)===0&&r!==0}function Bg(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function zg(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Vg(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),d=s((e-n)/2),h=a((e-n)/2),f=s((n-e)/2),p=a((n-e)/2);switch(i){case"XYX":r.set(o*u,l*d,l*h,o*c);break;case"YZY":r.set(l*h,o*u,l*d,o*c);break;case"ZXZ":r.set(l*d,l*h,o*u,o*c);break;case"XZX":r.set(o*u,l*p,l*f,o*c);break;case"YXY":r.set(l*f,o*u,l*p,o*c);break;case"ZYZ":r.set(l*p,l*f,o*u,o*c);break;default:Ce("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function yn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function dt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const _l={DEG2RAD:Ps,RAD2DEG:xr,generateUUID:Gn,clamp:st,euclideanModulo:Gu,mapLinear:Tg,inverseLerp:Ag,lerp:ta,damp:Cg,pingpong:Rg,smoothstep:Ig,smootherstep:Pg,randInt:Lg,randFloat:Dg,randFloatSpread:Ug,seededRandom:Ng,degToRad:Fg,radToDeg:Og,isPowerOfTwo:kg,ceilPowerOfTwo:Bg,floorPowerOfTwo:zg,setQuaternionFromProperEuler:Vg,normalize:dt,denormalize:yn},bd=class bd{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};bd.prototype.isVector2=!0;let pe=bd;class gn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3],h=s[a+0],f=s[a+1],p=s[a+2],v=s[a+3];if(d!==v||l!==h||c!==f||u!==p){let g=l*h+c*f+u*p+d*v;g<0&&(h=-h,f=-f,p=-p,v=-v,g=-g);let m=1-o;if(g<.9995){const _=Math.acos(g),x=Math.sin(_);m=Math.sin(m*_)/x,o=Math.sin(o*_)/x,l=l*m+h*o,c=c*m+f*o,u=u*m+p*o,d=d*m+v*o}else{l=l*m+h*o,c=c*m+f*o,u=u*m+p*o,d=d*m+v*o;const _=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=_,c*=_,u*=_,d*=_}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[a],h=s[a+1],f=s[a+2],p=s[a+3];return e[t]=o*p+u*d+l*f-c*h,e[t+1]=l*p+u*h+c*d-o*f,e[t+2]=c*p+u*f+o*h-l*d,e[t+3]=u*p-o*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),d=o(s/2),h=l(n/2),f=l(i/2),p=l(s/2);switch(a){case"XYZ":this._x=h*u*d+c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d-h*f*p;break;case"YXZ":this._x=h*u*d+c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d+h*f*p;break;case"ZXY":this._x=h*u*d-c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d-h*f*p;break;case"ZYX":this._x=h*u*d-c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d+h*f*p;break;case"YZX":this._x=h*u*d+c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d-h*f*p;break;case"XZY":this._x=h*u*d-c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d+h*f*p;break;default:Ce("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+i*c-s*l,this._y=i*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Md=class Md{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Pd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Pd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),u=2*(o*t-s*i),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-s*d,this.z=i+l*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return lc.copy(this).projectOnVector(e),this.sub(lc)}reflect(e){return this.sub(lc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Md.prototype.isVector3=!0;let I=Md;const lc=new I,Pd=new gn,Sd=class Sd{constructor(e,t,n,i,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],p=n[8],v=i[0],g=i[3],m=i[6],_=i[1],x=i[4],y=i[7],w=i[2],M=i[5],C=i[8];return s[0]=a*v+o*_+l*w,s[3]=a*g+o*x+l*M,s[6]=a*m+o*y+l*C,s[1]=c*v+u*_+d*w,s[4]=c*g+u*x+d*M,s[7]=c*m+u*y+d*C,s[2]=h*v+f*_+p*w,s[5]=h*g+f*x+p*M,s[8]=h*m+f*y+p*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*s,f=c*s-a*l,p=t*d+n*h+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=d*v,e[1]=(i*c-u*n)*v,e[2]=(o*n-i*a)*v,e[3]=h*v,e[4]=(u*t-i*l)*v,e[5]=(i*s-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(cc.makeScale(e,t)),this}rotate(e){return this.premultiply(cc.makeRotation(-e)),this}translate(e,t){return this.premultiply(cc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Sd.prototype.isMatrix3=!0;let at=Sd;const cc=new at,Ld=new at().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dd=new at().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Gg(){const r={enabled:!0,workingColorSpace:ua,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Ct&&(i.r=Oi(i.r),i.g=Oi(i.g),i.b=Oi(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ct&&(i.r=gr(i.r),i.g=gr(i.g),i.b=gr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ui?da:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return vl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return vl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[ua]:{primaries:e,whitePoint:n,transfer:da,toXYZ:Ld,fromXYZ:Dd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:In},outputColorSpaceConfig:{drawingBufferColorSpace:In}},[In]:{primaries:e,whitePoint:n,transfer:Ct,toXYZ:Ld,fromXYZ:Dd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:In}}}),r}const vt=Gg();function Oi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function gr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ws;class ap{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ws===void 0&&(Ws=fa("canvas")),Ws.width=e.width,Ws.height=e.height;const i=Ws.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ws}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=fa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Oi(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Oi(t[n]/255)*255):t[n]=Oi(t[n]);return{data:t,width:e.width,height:e.height}}else return Ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Hg=0;class ns{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hg++}),this.uuid=Gn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(uc(i[a].image)):s.push(uc(i[a]))}else s=uc(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function uc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?ap.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Ce("Texture: Unable to serialize Texture."),{})}let Wg=0;const dc=new I;class zt extends oi{constructor(e=zt.DEFAULT_IMAGE,t=zt.DEFAULT_MAPPING,n=Dn,i=Dn,s=Ot,a=yi,o=Mn,l=Pn,c=zt.DEFAULT_ANISOTROPY,u=Ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wg++}),this.uuid=Gn(),this.name="",this.source=new ns(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new pe(0,0),this.repeat=new pe(1,1),this.center=new pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new at,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(dc).x}get height(){return this.source.getSize(dc).y}get depth(){return this.source.getSize(dc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ce(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ce(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Tl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case sa:e.x=e.x-Math.floor(e.x);break;case Dn:e.x=e.x<0?0:1;break;case ra:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case sa:e.y=e.y-Math.floor(e.y);break;case Dn:e.y=e.y<0?0:1;break;case ra:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=Tl;zt.DEFAULT_ANISOTROPY=1;const wd=class wd{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,y=(f+1)/2,w=(m+1)/2,M=(u+h)/4,C=(d+v)/4,b=(p+g)/4;return x>y&&x>w?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=M/n,s=C/n):y>w?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=M/i,s=b/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=C/s,i=b/s),this.set(n,i,s,t),this}let _=Math.sqrt((g-p)*(g-p)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(_)<.001&&(_=1),this.x=(g-p)/_,this.y=(d-v)/_,this.z=(h-u)/_,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};wd.prototype.isVector4=!0;let bt=wd;class Hu extends oi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ot,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},s=new zt(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Ot,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new ns(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Hn extends Hu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Fl extends zt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Xg extends Hn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Fl(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class Ol extends zt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $g extends Hn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Ol(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}const wl=class wl{constructor(e,t,n,i,s,a,o,l,c,u,d,h,f,p,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,u,d,h,f,p,v,g)}set(e,t,n,i,s,a,o,l,c,u,d,h,f,p,v,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=h,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new wl().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Xs.setFromMatrixColumn(e,0).length(),s=1/Xs.setFromMatrixColumn(e,1).length(),a=1/Xs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=a*u,f=a*d,p=o*u,v=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+p*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,f=l*d,p=c*u,v=c*d;t[0]=h+v*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-p,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,f=l*d,p=c*u,v=c*d;t[0]=h-v*o,t[4]=-a*d,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,f=a*d,p=o*u,v=o*d;t[0]=l*u,t[4]=p*c-f,t[8]=h*c+v,t[1]=l*d,t[5]=v*c+h,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*c,p=o*l,v=o*c;t[0]=l*u,t[4]=v-h*d,t[8]=p*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+p,t[10]=h-v*d}else if(e.order==="XZY"){const h=a*l,f=a*c,p=o*l,v=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+v,t[5]=a*u,t[9]=f*d-p,t[2]=p*d-f,t[6]=o*u,t[10]=v*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qg,e,Yg)}lookAt(e,t,n){const i=this.elements;return Fn.subVectors(e,t),Fn.lengthSq()===0&&(Fn.z=1),Fn.normalize(),$i.crossVectors(n,Fn),$i.lengthSq()===0&&(Math.abs(n.z)===1?Fn.x+=1e-4:Fn.z+=1e-4,Fn.normalize(),$i.crossVectors(n,Fn)),$i.normalize(),Pa.crossVectors(Fn,$i),i[0]=$i.x,i[4]=Pa.x,i[8]=Fn.x,i[1]=$i.y,i[5]=Pa.y,i[9]=Fn.y,i[2]=$i.z,i[6]=Pa.z,i[10]=Fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],p=n[2],v=n[6],g=n[10],m=n[14],_=n[3],x=n[7],y=n[11],w=n[15],M=i[0],C=i[4],b=i[8],E=i[12],P=i[1],D=i[5],k=i[9],Q=i[13],ne=i[2],V=i[6],$=i[10],q=i[14],ce=i[3],ve=i[7],be=i[11],Ae=i[15];return s[0]=a*M+o*P+l*ne+c*ce,s[4]=a*C+o*D+l*V+c*ve,s[8]=a*b+o*k+l*$+c*be,s[12]=a*E+o*Q+l*q+c*Ae,s[1]=u*M+d*P+h*ne+f*ce,s[5]=u*C+d*D+h*V+f*ve,s[9]=u*b+d*k+h*$+f*be,s[13]=u*E+d*Q+h*q+f*Ae,s[2]=p*M+v*P+g*ne+m*ce,s[6]=p*C+v*D+g*V+m*ve,s[10]=p*b+v*k+g*$+m*be,s[14]=p*E+v*Q+g*q+m*Ae,s[3]=_*M+x*P+y*ne+w*ce,s[7]=_*C+x*D+y*V+w*ve,s[11]=_*b+x*k+y*$+w*be,s[15]=_*E+x*Q+y*q+w*Ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],p=e[3],v=e[7],g=e[11],m=e[15],_=l*f-c*h,x=o*f-c*d,y=o*h-l*d,w=a*f-c*u,M=a*h-l*u,C=a*d-o*u;return t*(v*_-g*x+m*y)-n*(p*_-g*w+m*M)+i*(p*x-v*w+m*C)-s*(p*y-v*M+g*C)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],p=e[12],v=e[13],g=e[14],m=e[15],_=t*o-n*a,x=t*l-i*a,y=t*c-s*a,w=n*l-i*o,M=n*c-s*o,C=i*c-s*l,b=u*v-d*p,E=u*g-h*p,P=u*m-f*p,D=d*g-h*v,k=d*m-f*v,Q=h*m-f*g,ne=_*Q-x*k+y*D+w*P-M*E+C*b;if(ne===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/ne;return e[0]=(o*Q-l*k+c*D)*V,e[1]=(i*k-n*Q-s*D)*V,e[2]=(v*C-g*M+m*w)*V,e[3]=(h*M-d*C-f*w)*V,e[4]=(l*P-a*Q-c*E)*V,e[5]=(t*Q-i*P+s*E)*V,e[6]=(g*y-p*C-m*x)*V,e[7]=(u*C-h*y+f*x)*V,e[8]=(a*k-o*P+c*b)*V,e[9]=(n*P-t*k-s*b)*V,e[10]=(p*M-v*y+m*_)*V,e[11]=(d*y-u*M-f*_)*V,e[12]=(o*E-a*D-l*b)*V,e[13]=(t*D-n*E+i*b)*V,e[14]=(v*x-p*w-g*_)*V,e[15]=(u*w-d*x+h*_)*V,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,d=o+o,h=s*c,f=s*u,p=s*d,v=a*u,g=a*d,m=o*d,_=l*c,x=l*u,y=l*d,w=n.x,M=n.y,C=n.z;return i[0]=(1-(v+m))*w,i[1]=(f+y)*w,i[2]=(p-x)*w,i[3]=0,i[4]=(f-y)*M,i[5]=(1-(h+m))*M,i[6]=(g+_)*M,i[7]=0,i[8]=(p+x)*C,i[9]=(g-_)*C,i[10]=(1-(h+v))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Xs.set(i[0],i[1],i[2]).length();const o=Xs.set(i[4],i[5],i[6]).length(),l=Xs.set(i[8],i[9],i[10]).length();s<0&&(a=-a),Jn.copy(this);const c=1/a,u=1/o,d=1/l;return Jn.elements[0]*=c,Jn.elements[1]*=c,Jn.elements[2]*=c,Jn.elements[4]*=u,Jn.elements[5]*=u,Jn.elements[6]*=u,Jn.elements[8]*=d,Jn.elements[9]*=d,Jn.elements[10]*=d,t.setFromRotationMatrix(Jn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,s,a,o=zn,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i);let p,v;if(l)p=s/(a-s),v=a*s/(a-s);else if(o===zn)p=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===Ns)p=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=zn,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-i),h=-(t+e)/(t-e),f=-(n+i)/(n-i);let p,v;if(l)p=1/(a-s),v=a/(a-s);else if(o===zn)p=-2/(a-s),v=-(a+s)/(a-s);else if(o===Ns)p=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};wl.prototype.isMatrix4=!0;let it=wl;const Xs=new I,Jn=new it,qg=new I(0,0,0),Yg=new I(1,1,1),$i=new I,Pa=new I,Fn=new I,Ud=new it,Nd=new gn;class ai{constructor(e=0,t=0,n=0,i=ai.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],d=i[2],h=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-st(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(st(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-st(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(st(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Ce("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ud.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ud,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Nd.setFromEuler(this),this.setFromQuaternion(Nd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ai.DEFAULT_ORDER="XYZ";class kl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Zg=0;const Fd=new I,$s=new gn,Ci=new it,La=new I,Ir=new I,Kg=new I,Jg=new gn,Od=new I(1,0,0),kd=new I(0,1,0),Bd=new I(0,0,1),zd={type:"added"},jg={type:"removed"},qs={type:"childadded",child:null},hc={type:"childremoved",child:null};class Mt extends oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zg++}),this.uuid=Gn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();const e=new I,t=new ai,n=new gn,i=new I(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new it},normalMatrix:{value:new at}}),this.matrix=new it,this.matrixWorld=new it,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return $s.setFromAxisAngle(e,t),this.quaternion.multiply($s),this}rotateOnWorldAxis(e,t){return $s.setFromAxisAngle(e,t),this.quaternion.premultiply($s),this}rotateX(e){return this.rotateOnAxis(Od,e)}rotateY(e){return this.rotateOnAxis(kd,e)}rotateZ(e){return this.rotateOnAxis(Bd,e)}translateOnAxis(e,t){return Fd.copy(e).applyQuaternion(this.quaternion),this.position.add(Fd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Od,e)}translateY(e){return this.translateOnAxis(kd,e)}translateZ(e){return this.translateOnAxis(Bd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ci.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?La.copy(e):La.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ci.lookAt(Ir,La,this.up):Ci.lookAt(La,Ir,this.up),this.quaternion.setFromRotationMatrix(Ci),i&&(Ci.extractRotation(i.matrixWorld),$s.setFromRotationMatrix(Ci),this.quaternion.premultiply($s.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zd),qs.child=e,this.dispatchEvent(qs),qs.child=null):qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(jg),hc.child=e,this.dispatchEvent(hc),hc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ci),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zd),qs.child=e,this.dispatchEvent(qs),qs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,e,Kg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,Jg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Mt.DEFAULT_UP=new I(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class mr extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qg={type:"move"};class Co{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&h>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Qg)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new mr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const op={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},Da={h:0,s:0,l:0};function fc(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Ne{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=In){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,vt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=vt.workingColorSpace){return this.r=e,this.g=t,this.b=n,vt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=vt.workingColorSpace){if(e=Gu(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=fc(a,s,e+1/3),this.g=fc(a,s,e),this.b=fc(a,s,e-1/3)}return vt.colorSpaceToWorking(this,i),this}setStyle(e,t=In){function n(s){s!==void 0&&parseFloat(s)<1&&Ce("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ce("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ce("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=In){const n=op[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ce("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Oi(e.r),this.g=Oi(e.g),this.b=Oi(e.b),this}copyLinearToSRGB(e){return this.r=gr(e.r),this.g=gr(e.g),this.b=gr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=In){return vt.workingToColorSpace(pn.copy(this),e),Math.round(st(pn.r*255,0,255))*65536+Math.round(st(pn.g*255,0,255))*256+Math.round(st(pn.b*255,0,255))}getHexString(e=In){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=vt.workingColorSpace){vt.workingToColorSpace(pn.copy(this),t);const n=pn.r,i=pn.g,s=pn.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=vt.workingColorSpace){return vt.workingToColorSpace(pn.copy(this),t),e.r=pn.r,e.g=pn.g,e.b=pn.b,e}getStyle(e=In){vt.workingToColorSpace(pn.copy(this),e);const t=pn.r,n=pn.g,i=pn.b;return e!==In?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(qi),this.setHSL(qi.h+e,qi.s+t,qi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(qi),e.getHSL(Da);const n=ta(qi.h,Da.h,t),i=ta(qi.s,Da.s,t),s=ta(qi.l,Da.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const pn=new Ne;Ne.NAMES=op;class Bl{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ne(e),this.density=t}clone(){return new Bl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class zl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ne(e),this.near=t,this.far=n}clone(){return new zl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Wu extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ai,this.environmentIntensity=1,this.environmentRotation=new ai,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const jn=new I,Ri=new I,pc=new I,Ii=new I,Ys=new I,Zs=new I,Vd=new I,mc=new I,gc=new I,vc=new I,_c=new bt,xc=new bt,yc=new bt;class Ln{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),jn.subVectors(e,t),i.cross(jn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){jn.subVectors(i,t),Ri.subVectors(n,t),pc.subVectors(e,t);const a=jn.dot(jn),o=jn.dot(Ri),l=jn.dot(pc),c=Ri.dot(Ri),u=Ri.dot(pc),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const h=1/d,f=(c*l-o*u)*h,p=(a*u-o*l)*h;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,Ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ii.x),l.addScaledVector(a,Ii.y),l.addScaledVector(o,Ii.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return _c.setScalar(0),xc.setScalar(0),yc.setScalar(0),_c.fromBufferAttribute(e,t),xc.fromBufferAttribute(e,n),yc.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(_c,s.x),a.addScaledVector(xc,s.y),a.addScaledVector(yc,s.z),a}static isFrontFacing(e,t,n,i){return jn.subVectors(n,t),Ri.subVectors(e,t),jn.cross(Ri).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jn.subVectors(this.c,this.b),Ri.subVectors(this.a,this.b),jn.cross(Ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ln.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ln.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Ln.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Ln.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ln.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;Ys.subVectors(i,n),Zs.subVectors(s,n),mc.subVectors(e,n);const l=Ys.dot(mc),c=Zs.dot(mc);if(l<=0&&c<=0)return t.copy(n);gc.subVectors(e,i);const u=Ys.dot(gc),d=Zs.dot(gc);if(u>=0&&d<=u)return t.copy(i);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Ys,a);vc.subVectors(e,s);const f=Ys.dot(vc),p=Zs.dot(vc);if(p>=0&&f<=p)return t.copy(s);const v=f*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Zs,o);const g=u*p-f*d;if(g<=0&&d-u>=0&&f-p>=0)return Vd.subVectors(s,i),o=(d-u)/(d-u+(f-p)),t.copy(i).addScaledVector(Vd,o);const m=1/(g+v+h);return a=v*m,o=h*m,t.copy(n).addScaledVector(Ys,a).addScaledVector(Zs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Jt{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Qn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Qn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Qn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Qn):Qn.fromBufferAttribute(s,a),Qn.applyMatrix4(e.matrixWorld),this.expandByPoint(Qn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ua.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ua.copy(n.boundingBox)),Ua.applyMatrix4(e.matrixWorld),this.union(Ua)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qn),Qn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Pr),Na.subVectors(this.max,Pr),Ks.subVectors(e.a,Pr),Js.subVectors(e.b,Pr),js.subVectors(e.c,Pr),Yi.subVectors(Js,Ks),Zi.subVectors(js,Js),hs.subVectors(Ks,js);let t=[0,-Yi.z,Yi.y,0,-Zi.z,Zi.y,0,-hs.z,hs.y,Yi.z,0,-Yi.x,Zi.z,0,-Zi.x,hs.z,0,-hs.x,-Yi.y,Yi.x,0,-Zi.y,Zi.x,0,-hs.y,hs.x,0];return!bc(t,Ks,Js,js,Na)||(t=[1,0,0,0,1,0,0,0,1],!bc(t,Ks,Js,js,Na))?!1:(Fa.crossVectors(Yi,Zi),t=[Fa.x,Fa.y,Fa.z],bc(t,Ks,Js,js,Na))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Pi=[new I,new I,new I,new I,new I,new I,new I,new I],Qn=new I,Ua=new Jt,Ks=new I,Js=new I,js=new I,Yi=new I,Zi=new I,hs=new I,Pr=new I,Na=new I,Fa=new I,fs=new I;function bc(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){fs.fromArray(r,s);const o=i.x*Math.abs(fs.x)+i.y*Math.abs(fs.y)+i.z*Math.abs(fs.z),l=e.dot(fs),c=t.dot(fs),u=n.dot(fs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Ni=e0();function e0(){const r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,s[l]=c|u}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}function Rn(r){Math.abs(r)>65504&&Ce("DataUtils.toHalfFloat(): Value out of range."),r=st(r,-65504,65504),Ni.floatView[0]=r;const e=Ni.uint32View[0],t=e>>23&511;return Ni.baseTable[t]+((e&8388607)>>Ni.shiftTable[t])}function Wr(r){const e=r>>10;return Ni.uint32View[0]=Ni.mantissaTable[Ni.offsetTable[e]+(r&1023)]+Ni.exponentTable[e],Ni.floatView[0]}class t0{static toHalfFloat(e){return Rn(e)}static fromHalfFloat(e){return Wr(e)}}const Kt=new I,Oa=new pe;let n0=0;class Lt extends oi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:n0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ha,this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Oa.fromBufferAttribute(this,t),Oa.applyMatrix3(e),this.setXY(t,Oa.x,Oa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix3(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=dt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),i=dt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),i=dt(i,this.array),s=dt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ha&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class i0 extends Lt{constructor(e,t,n){super(new Int8Array(e),t,n)}}class s0 extends Lt{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class r0 extends Lt{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class a0 extends Lt{constructor(e,t,n){super(new Int16Array(e),t,n)}}class Xu extends Lt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class o0 extends Lt{constructor(e,t,n){super(new Int32Array(e),t,n)}}class $u extends Lt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class l0 extends Lt{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=Wr(this.array[e*this.itemSize]);return this.normalized&&(t=yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize]=Rn(t),this}getY(e){let t=Wr(this.array[e*this.itemSize+1]);return this.normalized&&(t=yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+1]=Rn(t),this}getZ(e){let t=Wr(this.array[e*this.itemSize+2]);return this.normalized&&(t=yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+2]=Rn(t),this}getW(e){let t=Wr(this.array[e*this.itemSize+3]);return this.normalized&&(t=yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+3]=Rn(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.array[e+0]=Rn(t),this.array[e+1]=Rn(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),i=dt(i,this.array)),this.array[e+0]=Rn(t),this.array[e+1]=Rn(n),this.array[e+2]=Rn(i),this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),i=dt(i,this.array),s=dt(s,this.array)),this.array[e+0]=Rn(t),this.array[e+1]=Rn(n),this.array[e+2]=Rn(i),this.array[e+3]=Rn(s),this}}class Ge extends Lt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const c0=new Jt,Lr=new I,Mc=new I;class jt{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):c0.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Lr.subVectors(e,this.center);const t=Lr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Lr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Mc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Lr.copy(e.center).add(Mc)),this.expandByPoint(Lr.copy(e.center).sub(Mc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let u0=0;const $n=new it,Sc=new Mt,Qs=new I,On=new Jt,Dr=new Jt,nn=new I;class ot extends oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=Gn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(yg(e)?$u:Xu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new at().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return $n.makeRotationFromQuaternion(e),this.applyMatrix4($n),this}rotateX(e){return $n.makeRotationX(e),this.applyMatrix4($n),this}rotateY(e){return $n.makeRotationY(e),this.applyMatrix4($n),this}rotateZ(e){return $n.makeRotationZ(e),this.applyMatrix4($n),this}translate(e,t,n){return $n.makeTranslation(e,t,n),this.applyMatrix4($n),this}scale(e,t,n){return $n.makeScale(e,t,n),this.applyMatrix4($n),this}lookAt(e){return Sc.lookAt(e),Sc.updateMatrix(),this.applyMatrix4(Sc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qs).negate(),this.translate(Qs.x,Qs.y,Qs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ge(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];On.setFromBufferAttribute(s),this.morphTargetsRelative?(nn.addVectors(this.boundingBox.min,On.min),this.boundingBox.expandByPoint(nn),nn.addVectors(this.boundingBox.max,On.max),this.boundingBox.expandByPoint(nn)):(this.boundingBox.expandByPoint(On.min),this.boundingBox.expandByPoint(On.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(On.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Dr.setFromBufferAttribute(o),this.morphTargetsRelative?(nn.addVectors(On.min,Dr.min),On.expandByPoint(nn),nn.addVectors(On.max,Dr.max),On.expandByPoint(nn)):(On.expandByPoint(Dr.min),On.expandByPoint(Dr.max))}On.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)nn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(nn));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)nn.fromBufferAttribute(o,c),l&&(Qs.fromBufferAttribute(e,c),nn.add(Qs)),i=Math.max(i,n.distanceToSquared(nn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Lt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let b=0;b<n.count;b++)o[b]=new I,l[b]=new I;const c=new I,u=new I,d=new I,h=new pe,f=new pe,p=new pe,v=new I,g=new I;function m(b,E,P){c.fromBufferAttribute(n,b),u.fromBufferAttribute(n,E),d.fromBufferAttribute(n,P),h.fromBufferAttribute(s,b),f.fromBufferAttribute(s,E),p.fromBufferAttribute(s,P),u.sub(c),d.sub(c),f.sub(h),p.sub(h);const D=1/(f.x*p.y-p.x*f.y);isFinite(D)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(D),g.copy(d).multiplyScalar(f.x).addScaledVector(u,-p.x).multiplyScalar(D),o[b].add(v),o[E].add(v),o[P].add(v),l[b].add(g),l[E].add(g),l[P].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let b=0,E=_.length;b<E;++b){const P=_[b],D=P.start,k=P.count;for(let Q=D,ne=D+k;Q<ne;Q+=3)m(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}const x=new I,y=new I,w=new I,M=new I;function C(b){w.fromBufferAttribute(i,b),M.copy(w);const E=o[b];x.copy(E),x.sub(w.multiplyScalar(w.dot(E))).normalize(),y.crossVectors(M,E);const D=y.dot(l[b])<0?-1:1;a.setXYZW(b,x.x,x.y,x.z,D)}for(let b=0,E=_.length;b<E;++b){const P=_[b],D=P.start,k=P.count;for(let Q=D,ne=D+k;Q<ne;Q+=3)C(e.getX(Q+0)),C(e.getX(Q+1)),C(e.getX(Q+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Lt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const i=new I,s=new I,a=new I,o=new I,l=new I,c=new I,u=new I,d=new I;if(e)for(let h=0,f=e.count;h<f;h+=3){const p=e.getX(h+0),v=e.getX(h+1),g=e.getX(h+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),u.subVectors(a,s),d.subVectors(i,s),u.cross(d),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)i.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(i,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)nn.fromBufferAttribute(e,t),nn.normalize(),e.setXYZ(t,nn.x,nn.y,nn.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u);let f=0,p=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*u;for(let m=0;m<u;m++)h[p++]=c[f++]}return new Lt(h,u,d)}if(this.index===null)return Ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ot,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vl{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ha,this.updateRanges=[],this.version=0,this.uuid=Gn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const vn=new I;class Vn{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.applyMatrix4(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.applyNormalMatrix(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.transformDirection(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=dt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=yn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=yn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=yn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=yn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),i=dt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),i=dt(i,this.array),s=dt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){pa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Lt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Vn(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){pa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let d0=0;class on extends oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:d0++}),this.uuid=Gn(),this.name="",this.type="Material",this.blending=Is,this.side=ki,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Po,this.blendDst=Lo,this.blendEquation=es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=Us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=du,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ws,this.stencilZFail=ws,this.stencilZPass=ws,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ce(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ce(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Is&&(n.blending=this.blending),this.side!==ki&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Po&&(n.blendSrc=this.blendSrc),this.blendDst!==Lo&&(n.blendDst=this.blendDst),this.blendEquation!==es&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Us&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==du&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ws&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ws&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ws&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class qu extends on{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let er;const Ur=new I,tr=new I,nr=new I,ir=new pe,Nr=new pe,lp=new it,ka=new I,Fr=new I,Ba=new I,Gd=new pe,wc=new pe,Hd=new pe;class cp extends Mt{constructor(e=new qu){if(super(),this.isSprite=!0,this.type="Sprite",er===void 0){er=new ot;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Vl(t,5);er.setIndex([0,1,2,0,2,3]),er.setAttribute("position",new Vn(n,3,0,!1)),er.setAttribute("uv",new Vn(n,2,3,!1))}this.geometry=er,this.material=e,this.center=new pe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&qe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),tr.setFromMatrixScale(this.matrixWorld),lp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),nr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&tr.multiplyScalar(-nr.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;za(ka.set(-.5,-.5,0),nr,a,tr,i,s),za(Fr.set(.5,-.5,0),nr,a,tr,i,s),za(Ba.set(.5,.5,0),nr,a,tr,i,s),Gd.set(0,0),wc.set(1,0),Hd.set(1,1);let o=e.ray.intersectTriangle(ka,Fr,Ba,!1,Ur);if(o===null&&(za(Fr.set(-.5,.5,0),nr,a,tr,i,s),wc.set(0,1),o=e.ray.intersectTriangle(ka,Ba,Fr,!1,Ur),o===null))return;const l=e.ray.origin.distanceTo(Ur);l<e.near||l>e.far||t.push({distance:l,point:Ur.clone(),uv:Ln.getInterpolation(Ur,ka,Fr,Ba,Gd,wc,Hd,new pe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function za(r,e,t,n,i,s){ir.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Nr.x=s*ir.x-i*ir.y,Nr.y=i*ir.x+s*ir.y):Nr.copy(ir),r.copy(e),r.x+=Nr.x,r.y+=Nr.y,r.applyMatrix4(lp)}const Va=new I,Wd=new I;class up extends Mt{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const s=t[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let s;for(s=0;s<i.length&&!(t<i[s].distance);s++);return i.splice(s,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let s=t[n].distance;if(t[n].object.visible&&(s-=s*t[n].hysteresis),e<s)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){Va.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(Va);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){Va.setFromMatrixPosition(e.matrixWorld),Wd.setFromMatrixPosition(this.matrixWorld);const n=Va.distanceTo(Wd)/e.zoom;t[0].object.visible=!0;let i,s;for(i=1,s=t.length;i<s;i++){let a=t[i].distance;if(t[i].object.visible&&(a-=a*t[i].hysteresis),n>=a)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const a=n[i];t.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return t}}const Li=new I,Ec=new I,Ga=new I,Ki=new I,Tc=new I,Ha=new I,Ac=new I;class wr{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Li.copy(this.origin).addScaledVector(this.direction,t),Li.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ec.copy(e).add(t).multiplyScalar(.5),Ga.copy(t).sub(e).normalize(),Ki.copy(this.origin).sub(Ec);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Ga),o=Ki.dot(this.direction),l=-Ki.dot(Ga),c=Ki.lengthSq(),u=Math.abs(1-a*a);let d,h,f,p;if(u>0)if(d=a*l-o,h=a*o-l,p=s*u,d>=0)if(h>=-p)if(h<=p){const v=1/u;d*=v,h*=v,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-p?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c):h<=p?(d=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+c):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Ec).addScaledVector(Ga,h),f}intersectSphere(e,t){Li.subVectors(e.center,this.origin);const n=Li.dot(this.direction),i=Li.dot(Li)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,i=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,i=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Li)!==null}intersectTriangle(e,t,n,i,s){Tc.subVectors(t,e),Ha.subVectors(n,e),Ac.crossVectors(Tc,Ha);let a=this.direction.dot(Ac),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ki.subVectors(this.origin,e);const l=o*this.direction.dot(Ha.crossVectors(Ki,Ha));if(l<0)return null;const c=o*this.direction.dot(Tc.cross(Ki));if(c<0||l+c>a)return null;const u=-o*Ki.dot(Ac);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class sn extends on{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ai,this.combine=Sa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Xd=new it,ps=new wr,Wa=new jt,$d=new I,Xa=new I,$a=new I,qa=new I,Cc=new I,Ya=new I,qd=new I,Za=new I;class Rt extends Mt{constructor(e=new ot,t=new sn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){Ya.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(Cc.fromBufferAttribute(d,e),a?Ya.addScaledVector(Cc,u):Ya.addScaledVector(Cc.sub(t),u))}t.add(Ya)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Wa.copy(n.boundingSphere),Wa.applyMatrix4(s),ps.copy(e.ray).recast(e.near),!(Wa.containsPoint(ps.origin)===!1&&(ps.intersectSphere(Wa,$d)===null||ps.origin.distanceToSquared($d)>(e.far-e.near)**2))&&(Xd.copy(s).invert(),ps.copy(e.ray).applyMatrix4(Xd),!(n.boundingBox!==null&&ps.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ps)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=h.length;p<v;p++){const g=h[p],m=a[g.materialIndex],_=Math.max(g.start,f.start),x=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let y=_,w=x;y<w;y+=3){const M=o.getX(y),C=o.getX(y+1),b=o.getX(y+2);i=Ka(this,m,e,n,c,u,d,M,C,b),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const _=o.getX(g),x=o.getX(g+1),y=o.getX(g+2);i=Ka(this,a,e,n,c,u,d,_,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,v=h.length;p<v;p++){const g=h[p],m=a[g.materialIndex],_=Math.max(g.start,f.start),x=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=_,w=x;y<w;y+=3){const M=y,C=y+1,b=y+2;i=Ka(this,m,e,n,c,u,d,M,C,b),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const _=g,x=g+1,y=g+2;i=Ka(this,a,e,n,c,u,d,_,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function h0(r,e,t,n,i,s,a,o){let l;if(e.side===Sn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===ki,o),l===null)return null;Za.copy(o),Za.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Za);return c<t.near||c>t.far?null:{distance:c,point:Za.clone(),object:r}}function Ka(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,Xa),r.getVertexPosition(l,$a),r.getVertexPosition(c,qa);const u=h0(r,e,t,n,Xa,$a,qa,qd);if(u){const d=new I;Ln.getBarycoord(qd,Xa,$a,qa,d),i&&(u.uv=Ln.getInterpolatedAttribute(i,o,l,c,d,new pe)),s&&(u.uv1=Ln.getInterpolatedAttribute(s,o,l,c,d,new pe)),a&&(u.normal=Ln.getInterpolatedAttribute(a,o,l,c,d,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new I,materialIndex:0};Ln.getNormal(Xa,$a,qa,h.normal),u.face=h,u.barycoord=d}return u}const Or=new bt,Yd=new bt,Zd=new bt,f0=new bt,Kd=new it,Ja=new I,Rc=new jt,Jd=new it,Ic=new wr;class dp extends Rt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=cu,this.bindMatrix=new it,this.bindMatrixInverse=new it,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Jt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ja),this.boundingBox.expandByPoint(Ja)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new jt),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ja),this.boundingSphere.expandByPoint(Ja)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rc.copy(this.boundingSphere),Rc.applyMatrix4(i),e.ray.intersectsSphere(Rc)!==!1&&(Jd.copy(i).invert(),Ic.copy(e.ray).applyMatrix4(Jd),!(this.boundingBox!==null&&Ic.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ic)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new bt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===cu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Xf?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ce("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Yd.fromBufferAttribute(i.attributes.skinIndex,e),Zd.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Or.copy(t),t.set(0,0,0,0)):(Or.set(...t,1),t.set(0,0,0)),Or.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const a=Zd.getComponent(s);if(a!==0){const o=Yd.getComponent(s);Kd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(f0.copy(Or).applyMatrix4(Kd),a)}}return t.isVector4&&(t.w=Or.w),t.applyMatrix4(this.bindMatrixInverse)}}class Yu extends Mt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class ri extends zt{constructor(e=null,t=1,n=1,i,s,a,o,l,c=Zt,u=Zt,d,h){super(null,a,o,l,c,u,i,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const jd=new it,p0=new it;class Gl{constructor(e=[],t=[]){this.uuid=Gn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ce("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new it)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new it;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:p0;jd.multiplyMatrices(o,t[s]),jd.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Gl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new ri(t,e,e,Mn,bn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(Ce("Skeleton: No bone found with UUID:",s),a=new Yu),this.bones.push(a),this.boneInverses.push(new it().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class yr extends Lt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const sr=new it,Qd=new it,ja=[],eh=new Jt,m0=new it,kr=new Rt,Br=new jt;class hp extends Rt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new yr(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,m0)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Jt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,sr),eh.copy(e.boundingBox).applyMatrix4(sr),this.boundingBox.union(eh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new jt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,sr),Br.copy(e.boundingSphere).applyMatrix4(sr),this.boundingSphere.union(Br)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(kr.geometry=this.geometry,kr.material=this.material,kr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Br.copy(this.boundingSphere),Br.applyMatrix4(n),e.ray.intersectsSphere(Br)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,sr),Qd.multiplyMatrices(n,sr),kr.matrixWorld=Qd,kr.raycast(e,ja);for(let a=0,o=ja.length;a<o;a++){const l=ja[a];l.instanceId=s,l.object=this,t.push(l)}ja.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new yr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ri(new Float32Array(i*this.count),i,this.count,Il,bn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Pc=new I,g0=new I,v0=new at;class Qi{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Pc.subVectors(n,t).cross(g0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(Pc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||v0.getNormalMatrix(e),i=this.coplanarPoint(Pc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ms=new jt,_0=new pe(.5,.5),Qa=new I;class Er{constructor(e=new Qi,t=new Qi,n=new Qi,i=new Qi,s=new Qi,a=new Qi){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zn,n=!1){const i=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],d=s[5],h=s[6],f=s[7],p=s[8],v=s[9],g=s[10],m=s[11],_=s[12],x=s[13],y=s[14],w=s[15];if(i[0].setComponents(c-a,f-u,m-p,w-_).normalize(),i[1].setComponents(c+a,f+u,m+p,w+_).normalize(),i[2].setComponents(c+o,f+d,m+v,w+x).normalize(),i[3].setComponents(c-o,f-d,m-v,w-x).normalize(),n)i[4].setComponents(l,h,g,y).normalize(),i[5].setComponents(c-l,f-h,m-g,w-y).normalize();else if(i[4].setComponents(c-l,f-h,m-g,w-y).normalize(),t===zn)i[5].setComponents(c+l,f+h,m+g,w+y).normalize();else if(t===Ns)i[5].setComponents(l,h,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ms.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ms.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ms)}intersectsSprite(e){ms.center.set(0,0,0);const t=_0.distanceTo(e.center);return ms.radius=.7071067811865476+t,ms.applyMatrix4(e.matrixWorld),this.intersectsSphere(ms)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Qa.x=i.normal.x>0?e.max.x:e.min.x,Qa.y=i.normal.y>0?e.max.y:e.min.y,Qa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Qa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const hi=new it,fi=new Er;class Hl{constructor(){this.coordinateSystem=zn}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(hi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),fi.setFromProjectionMatrix(hi,i.coordinateSystem,i.reversedDepth),fi.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(hi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),fi.setFromProjectionMatrix(hi,i.coordinateSystem,i.reversedDepth),fi.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(hi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),fi.setFromProjectionMatrix(hi,i.coordinateSystem,i.reversedDepth),fi.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(hi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),fi.setFromProjectionMatrix(hi,i.coordinateSystem,i.reversedDepth),fi.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(hi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),fi.setFromProjectionMatrix(hi,i.coordinateSystem,i.reversedDepth),fi.containsPoint(e))return!0}return!1}clone(){return new Hl}}function Lc(r,e){return r-e}function x0(r,e){return r.z-e.z}function y0(r,e){return e.z-r.z}class b0{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){const s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});const o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}}const Cn=new it,M0=new Ne(1,1,1),th=new Er,S0=new Hl,eo=new Jt,gs=new jt,zr=new I,nh=new I,w0=new I,Dc=new b0,mn=new Rt,to=[];function E0(r,e,t=0){const n=e.itemSize;if(r.isInterleavedBufferAttribute||r.array.constructor!==e.array.constructor){const i=r.count;for(let s=0;s<i;s++)for(let a=0;a<n;a++)e.setComponent(s+t,a,r.getComponent(s,a))}else e.array.set(r.array,t*n);e.needsUpdate=!0}function vs(r,e){if(r.constructor!==e.constructor){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++)e[n]=r[n]}else{const t=Math.min(r.length,e.length);e.set(new r.constructor(r.buffer,0,t))}}class fp extends Rt{constructor(e,t,n=t*2,i){super(new ot,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new ri(t,e,e,Mn,bn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new ri(t,e,e,wa,qn);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new ri(t,e,e,Mn,bn);n.colorSpace=vt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in e.attributes){const a=e.getAttribute(s),{array:o,itemSize:l,normalized:c}=a,u=new o.constructor(n*l),d=new Lt(u,l,c);t.setAttribute(s,d)}if(e.getIndex()!==null){const s=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Lt(s,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=e.getAttribute(n),s=t.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){const t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){const t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jt);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,Cn),this.getBoundingBoxAt(s,eo).applyMatrix4(Cn),e.union(eo)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jt);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,Cn),this.getBoundingSphereAt(s,gs).applyMatrix4(Cn),e.union(gs)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Lc),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const s=this._matricesTexture;Cn.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;const a=this._colorsTexture;return a&&(M0.toArray(a.image.data,i*4),a.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const a=e.getIndex();if(a!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?a.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Lc),l=this._availableGeometryIds.shift(),s[l]=i):(l=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),a=t.getIndex(),o=this._geometryInfo[e];if(i&&a.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");const l=o.vertexStart,c=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(const u in n.attributes){const d=t.getAttribute(u),h=n.getAttribute(u);E0(d,h,l);const f=d.itemSize;for(let p=d.count,v=c;p<v;p++){const g=l+p;for(let m=0;m<f;m++)h.setComponent(g,m,0)}h.needsUpdate=!0,h.addUpdateRange(l*f,c*f)}if(i){const u=o.indexStart,d=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let h=0;h<a.count;h++)s.setX(u+h,l+a.getX(h));for(let h=a.count,f=d;h<f;h++)s.setX(u+h,l);s.needsUpdate=!0,s.addUpdateRange(u,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0;const n=this._geometryInfo,i=n.map((a,o)=>o).sort((a,o)=>n[a].vertexStart-n[o].vertexStart),s=this.geometry;for(let a=0,o=n.length;a<o;a++){const l=i[a],c=n[l];if(c.active!==!1){if(s.index!==null){if(c.indexStart!==t){const{indexStart:u,vertexStart:d,reservedIndexCount:h}=c,f=s.index,p=f.array,v=e-d;for(let g=u;g<u+h;g++)p[g]=p[g]+v;f.array.copyWithin(t,u,u+h),f.addUpdateRange(t,h),f.needsUpdate=!0,c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){const{vertexStart:u,reservedVertexCount:d}=c,h=s.attributes;for(const f in h){const p=h[f],{array:v,itemSize:g}=p;v.copyWithin(e*g,u*g,(u+d)*g),p.addUpdateRange(e*g,d*g),p.needsUpdate=!0}c.vertexStart=e}e+=c.reservedVertexCount,c.start=s.index?c.indexStart:c.vertexStart}}return this._nextIndexStart=t,this._nextVertexStart=e,this._visibilityChanged=!0,this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){const s=new Jt,a=n.index,o=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let u=l;a&&(u=a.getX(u)),s.expandByPoint(zr.fromBufferAttribute(o,u))}i.boundingBox=s}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){const s=new jt;this.getBoundingBoxAt(e,eo),eo.getCenter(s.center);const a=n.index,o=n.attributes.position;let l=0;for(let c=i.start,u=i.start+i.count;c<u;c++){let d=c;a&&(d=a.getX(d)),zr.fromBufferAttribute(o,d),l=Math.max(l,s.center.distanceToSquared(zr))}s.radius=Math.sqrt(l),i.boundingSphere=s}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);const n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null?t.isVector4?t.set(1,1,1,1):t.setRGB(1,1,1):t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(Lc);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const i=new Int32Array(e),s=new Int32Array(e);vs(this._multiDrawCounts,i),vs(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=e;const a=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),vs(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),vs(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),vs(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const s=this.geometry;s.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new ot,this._initializeGeometry(s));const a=this.geometry;s.index&&vs(s.index.array,a.index.array);for(const o in s.attributes)vs(s.attributes[o].array,a.attributes[o].array)}raycast(e,t){const n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,a=this.geometry;mn.material=this.material,mn.geometry.index=a.index,mn.geometry.attributes=a.attributes,mn.geometry.boundingBox===null&&(mn.geometry.boundingBox=new Jt),mn.geometry.boundingSphere===null&&(mn.geometry.boundingSphere=new jt);for(let o=0,l=n.length;o<l;o++){if(!n[o].visible||!n[o].active)continue;const c=n[o].geometryIndex,u=i[c];mn.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(o,mn.matrixWorld).premultiply(s),this.getBoundingBoxAt(c,mn.geometry.boundingBox),this.getBoundingSphereAt(c,mn.geometry.boundingSphere),mn.raycast(e,to);for(let d=0,h=to.length;d<h;d++){const f=to[d];f.object=this,f.batchId=o,t.push(f)}to.length=0}mn.material=null,mn.geometry.index=null,mn.geometry.attributes={},mn.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const a=i.getIndex();let o=a===null?1:a.array.BYTES_PER_ELEMENT,l=1;s.wireframe&&(l=2,o=i.attributes.position.count>65535?4:2);const c=this._instanceInfo,u=this._multiDrawStarts,d=this._multiDrawCounts,h=this._geometryInfo,f=this.perObjectFrustumCulled,p=this._indirectTexture,v=p.image.data,g=n.isArrayCamera?S0:th;f&&!n.isArrayCamera&&(Cn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),th.setFromProjectionMatrix(Cn,n.coordinateSystem,n.reversedDepth));let m=0;if(this.sortObjects){Cn.copy(this.matrixWorld).invert(),zr.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Cn),nh.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(Cn);for(let y=0,w=c.length;y<w;y++)if(c[y].visible&&c[y].active){const M=c[y].geometryIndex;this.getMatrixAt(y,Cn),this.getBoundingSphereAt(M,gs).applyMatrix4(Cn);let C=!1;if(f&&(C=!g.intersectsSphere(gs,n)),!C){const b=h[M],E=w0.subVectors(gs.center,zr).dot(nh);Dc.push(b.start,b.count,E,y)}}const _=Dc.list,x=this.customSort;x===null?_.sort(s.transparent?y0:x0):x.call(this,_,n);for(let y=0,w=_.length;y<w;y++){const M=_[y];u[m]=M.start*o*l,d[m]=M.count*l,v[m]=M.index,m++}Dc.reset()}else for(let _=0,x=c.length;_<x;_++)if(c[_].visible&&c[_].active){const y=c[_].geometryIndex;let w=!1;if(f&&(this.getMatrixAt(_,Cn),this.getBoundingSphereAt(y,gs).applyMatrix4(Cn),w=!g.intersectsSphere(gs,n)),!w){const M=h[y];u[m]=M.start*o*l,d[m]=M.count*l,v[m]=_,m++}}p.needsUpdate=!0,this._multiDrawCount=m,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,s,a){this.onBeforeRender(e,null,i,s,a)}}class Tn extends on{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const xl=new I,yl=new I,ih=new it,Vr=new wr,no=new jt,Uc=new I,sh=new I;class os extends Mt{constructor(e=new ot,t=new Tn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)xl.fromBufferAttribute(t,i-1),yl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=xl.distanceTo(yl);e.setAttribute("lineDistance",new Ge(n,1))}else Ce("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),no.copy(n.boundingSphere),no.applyMatrix4(i),no.radius+=s,e.ray.intersectsSphere(no)===!1)return;ih.copy(i).invert(),Vr.copy(e.ray).applyMatrix4(ih);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let v=f,g=p-1;v<g;v+=c){const m=u.getX(v),_=u.getX(v+1),x=io(this,e,Vr,l,m,_,v);x&&t.push(x)}if(this.isLineLoop){const v=u.getX(p-1),g=u.getX(f),m=io(this,e,Vr,l,v,g,p-1);m&&t.push(m)}}else{const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let v=f,g=p-1;v<g;v+=c){const m=io(this,e,Vr,l,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){const v=io(this,e,Vr,l,p-1,f,p-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function io(r,e,t,n,i,s,a){const o=r.geometry.attributes.position;if(xl.fromBufferAttribute(o,i),yl.fromBufferAttribute(o,s),t.distanceSqToSegment(xl,yl,Uc,sh)>n)return;Uc.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Uc);if(!(c<e.near||c>e.far))return{distance:c,point:sh.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const rh=new I,ah=new I;class Ai extends os{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)rh.fromBufferAttribute(t,i),ah.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+rh.distanceTo(ah);e.setAttribute("lineDistance",new Ge(n,1))}else Ce("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class pp extends os{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Zu extends on{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const oh=new it,fu=new wr,so=new jt,ro=new I;class mp extends Mt{constructor(e=new ot,t=new Zu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),so.copy(n.boundingSphere),so.applyMatrix4(i),so.radius+=s,e.ray.intersectsSphere(so)===!1)return;oh.copy(i).invert(),fu.copy(e.ray).applyMatrix4(oh);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=h,v=f;p<v;p++){const g=c.getX(p);ro.fromBufferAttribute(d,g),lh(ro,g,l,i,e,t,this)}}else{const h=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let p=h,v=f;p<v;p++)ro.fromBufferAttribute(d,p),lh(ro,p,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function lh(r,e,t,n,i,s,a){const o=fu.distanceSqToPoint(r);if(o<t){const l=new I;fu.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class gp extends zt{constructor(e,t,n,i,s=Ot,a=Ot,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;const u=this;function d(){u.needsUpdate=!0,u._requestVideoFrameCallbackId=e.requestVideoFrameCallback(d)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(d))}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}}class T0 extends gp{constructor(e,t,n,i,s,a,o,l){super({},e,t,n,i,s,a,o,l),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(e){this.image=e,this.needsUpdate=!0}}class A0 extends zt{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=Zt,this.minFilter=Zt,this.generateMipmaps=!1,this.needsUpdate=!0}}class Wl extends zt{constructor(e,t,n,i,s,a,o,l,c,u,d,h){super(null,a,o,l,c,u,i,s,d,h),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class C0 extends Wl{constructor(e,t,n,i,s,a){super(e,t,n,s,a),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Dn,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class R0 extends Wl{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,wi),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class Ea extends zt{constructor(e=[],t=wi,n,i,s,a,o,l,c,u){super(e,t,n,i,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class I0 extends zt{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class P0 extends zt{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;const u=e?e.parentNode:null;u!==null&&"requestPaint"in u&&(u.onpaint=()=>{this.needsUpdate=!0},u.requestPaint())}dispose(){const e=this.image?this.image.parentNode:null;e!==null&&"onpaint"in e&&(e.onpaint=null),super.dispose()}}class Fs extends zt{constructor(e,t,n=qn,i,s,a,o=Zt,l=Zt,c,u=Ti,d=1){if(u!==Ti&&u!==ts)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,i,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ns(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class vp extends Fs{constructor(e,t=qn,n=wi,i,s,a=Zt,o=Zt,l,c=Ti){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,i,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ku extends zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class cs extends ot{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],d=[];let h=0,f=0;p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ge(c,3)),this.setAttribute("normal",new Ge(u,3)),this.setAttribute("uv",new Ge(d,2));function p(v,g,m,_,x,y,w,M,C,b,E){const P=y/C,D=w/b,k=y/2,Q=w/2,ne=M/2,V=C+1,$=b+1;let q=0,ce=0;const ve=new I;for(let be=0;be<$;be++){const Ae=be*D-Q;for(let Oe=0;Oe<V;Oe++){const et=Oe*P-k;ve[v]=et*_,ve[g]=Ae*x,ve[m]=ne,c.push(ve.x,ve.y,ve.z),ve[v]=0,ve[g]=0,ve[m]=M>0?1:-1,u.push(ve.x,ve.y,ve.z),d.push(Oe/C),d.push(1-be/b),q+=1}}for(let be=0;be<b;be++)for(let Ae=0;Ae<C;Ae++){const Oe=h+Ae+V*be,et=h+Ae+V*(be+1),ht=h+(Ae+1)+V*(be+1),tt=h+(Ae+1)+V*be;l.push(Oe,et,tt),l.push(et,ht,tt),ce+=6}o.addGroup(f,ce,E),f+=ce,h+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Xl extends ot{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const a=[],o=[],l=[],c=[],u=t/2,d=Math.PI/2*e,h=t,f=2*d+h,p=n*2+s,v=i+1,g=new I,m=new I;for(let _=0;_<=p;_++){let x=0,y=0,w=0,M=0;if(_<=n){const E=_/n,P=E*Math.PI/2;y=-u-e*Math.cos(P),w=e*Math.sin(P),M=-e*Math.cos(P),x=E*d}else if(_<=n+s){const E=(_-n)/s;y=-u+E*t,w=e,M=0,x=d+E*h}else{const E=(_-n-s)/n,P=E*Math.PI/2;y=u+e*Math.sin(P),w=e*Math.cos(P),M=e*Math.sin(P),x=d+h+E*d}const C=Math.max(0,Math.min(1,x/f));let b=0;_===0?b=.5/i:_===p&&(b=-.5/i);for(let E=0;E<=i;E++){const P=E/i,D=P*Math.PI*2,k=Math.sin(D),Q=Math.cos(D);m.x=-w*Q,m.y=y,m.z=w*k,o.push(m.x,m.y,m.z),g.set(-w*Q,M,w*k),g.normalize(),l.push(g.x,g.y,g.z),c.push(P+b,C)}if(_>0){const E=(_-1)*v;for(let P=0;P<i;P++){const D=E+P,k=E+P+1,Q=_*v+P,ne=_*v+P+1;a.push(D,k,Q),a.push(k,ne,Q)}}}this.setIndex(a),this.setAttribute("position",new Ge(o,3)),this.setAttribute("normal",new Ge(l,3)),this.setAttribute("uv",new Ge(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xl(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class $l extends ot{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new I,u=new pe;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){const f=n+d/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new Ge(a,3)),this.setAttribute("normal",new Ge(o,3)),this.setAttribute("uv",new Ge(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $l(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ta extends ot{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],d=[],h=[],f=[];let p=0;const v=[],g=n/2;let m=0;_(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new Ge(d,3)),this.setAttribute("normal",new Ge(h,3)),this.setAttribute("uv",new Ge(f,2));function _(){const y=new I,w=new I;let M=0;const C=(t-e)/n;for(let b=0;b<=s;b++){const E=[],P=b/s,D=P*(t-e)+e;for(let k=0;k<=i;k++){const Q=k/i,ne=Q*l+o,V=Math.sin(ne),$=Math.cos(ne);w.x=D*V,w.y=-P*n+g,w.z=D*$,d.push(w.x,w.y,w.z),y.set(V,C,$).normalize(),h.push(y.x,y.y,y.z),f.push(Q,1-P),E.push(p++)}v.push(E)}for(let b=0;b<i;b++)for(let E=0;E<s;E++){const P=v[E][b],D=v[E+1][b],k=v[E+1][b+1],Q=v[E][b+1];(e>0||E!==0)&&(u.push(P,D,Q),M+=3),(t>0||E!==s-1)&&(u.push(D,k,Q),M+=3)}c.addGroup(m,M,0),m+=M}function x(y){const w=p,M=new pe,C=new I;let b=0;const E=y===!0?e:t,P=y===!0?1:-1;for(let k=1;k<=i;k++)d.push(0,g*P,0),h.push(0,P,0),f.push(.5,.5),p++;const D=p;for(let k=0;k<=i;k++){const ne=k/i*l+o,V=Math.cos(ne),$=Math.sin(ne);C.x=E*$,C.y=g*P,C.z=E*V,d.push(C.x,C.y,C.z),h.push(0,P,0),M.x=V*.5+.5,M.y=$*.5*P+.5,f.push(M.x,M.y),p++}for(let k=0;k<i;k++){const Q=w+k,ne=D+k;y===!0?u.push(ne,ne+1,Q):u.push(ne+1,ne,Q),b+=3}c.addGroup(m,b,y===!0?1:2),m+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ta(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Bs extends Ta{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Bs(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class us extends ot{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],a=[];o(i),c(n),u(),this.setAttribute("position",new Ge(s,3)),this.setAttribute("normal",new Ge(s.slice(),3)),this.setAttribute("uv",new Ge(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(_){const x=new I,y=new I,w=new I;for(let M=0;M<t.length;M+=3)f(t[M+0],x),f(t[M+1],y),f(t[M+2],w),l(x,y,w,_)}function l(_,x,y,w){const M=w+1,C=[];for(let b=0;b<=M;b++){C[b]=[];const E=_.clone().lerp(y,b/M),P=x.clone().lerp(y,b/M),D=M-b;for(let k=0;k<=D;k++)k===0&&b===M?C[b][k]=E:C[b][k]=E.clone().lerp(P,k/D)}for(let b=0;b<M;b++)for(let E=0;E<2*(M-b)-1;E++){const P=Math.floor(E/2);E%2===0?(h(C[b][P+1]),h(C[b+1][P]),h(C[b][P])):(h(C[b][P+1]),h(C[b+1][P+1]),h(C[b+1][P]))}}function c(_){const x=new I;for(let y=0;y<s.length;y+=3)x.x=s[y+0],x.y=s[y+1],x.z=s[y+2],x.normalize().multiplyScalar(_),s[y+0]=x.x,s[y+1]=x.y,s[y+2]=x.z}function u(){const _=new I;for(let x=0;x<s.length;x+=3){_.x=s[x+0],_.y=s[x+1],_.z=s[x+2];const y=g(_)/2/Math.PI+.5,w=m(_)/Math.PI+.5;a.push(y,1-w)}p(),d()}function d(){for(let _=0;_<a.length;_+=6){const x=a[_+0],y=a[_+2],w=a[_+4],M=Math.max(x,y,w),C=Math.min(x,y,w);M>.9&&C<.1&&(x<.2&&(a[_+0]+=1),y<.2&&(a[_+2]+=1),w<.2&&(a[_+4]+=1))}}function h(_){s.push(_.x,_.y,_.z)}function f(_,x){const y=_*3;x.x=e[y+0],x.y=e[y+1],x.z=e[y+2]}function p(){const _=new I,x=new I,y=new I,w=new I,M=new pe,C=new pe,b=new pe;for(let E=0,P=0;E<s.length;E+=9,P+=6){_.set(s[E+0],s[E+1],s[E+2]),x.set(s[E+3],s[E+4],s[E+5]),y.set(s[E+6],s[E+7],s[E+8]),M.set(a[P+0],a[P+1]),C.set(a[P+2],a[P+3]),b.set(a[P+4],a[P+5]),w.copy(_).add(x).add(y).divideScalar(3);const D=g(w);v(M,P+0,_,D),v(C,P+2,x,D),v(b,P+4,y,D)}}function v(_,x,y,w){w<0&&_.x===1&&(a[x]=_.x-1),y.x===0&&y.z===0&&(a[x]=w/2/Math.PI+.5)}function g(_){return Math.atan2(_.z,-_.x)}function m(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new us(e.vertices,e.indices,e.radius,e.detail)}}class ql extends us{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ql(e.radius,e.detail)}}const ao=new I,oo=new I,Nc=new I,lo=new Ln;class _p extends ot{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(Ps*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],d=new Array(3),h={},f=[];for(let p=0;p<l;p+=3){a?(c[0]=a.getX(p),c[1]=a.getX(p+1),c[2]=a.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);const{a:v,b:g,c:m}=lo;if(v.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),lo.getNormal(Nc),d[0]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,d[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,d[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let _=0;_<3;_++){const x=(_+1)%3,y=d[_],w=d[x],M=lo[u[_]],C=lo[u[x]],b=`${y}_${w}`,E=`${w}_${y}`;E in h&&h[E]?(Nc.dot(h[E].normal)<=s&&(f.push(M.x,M.y,M.z),f.push(C.x,C.y,C.z)),h[E]=null):b in h||(h[b]={index0:c[_],index1:c[x],normal:Nc.clone()})}}for(const p in h)if(h[p]){const{index0:v,index1:g}=h[p];ao.fromBufferAttribute(o,v),oo.fromBufferAttribute(o,g),f.push(ao.x,ao.y,ao.z),f.push(oo.x,oo.y,oo.z)}this.setAttribute("position",new Ge(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class li{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ce("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);const u=n[i],h=n[i+1]-u,f=(a-u)/h;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new pe:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new I,i=[],s=[],a=[],o=new I,l=new it;for(let f=0;f<=e;f++){const p=f/e;i[f]=this.getTangentAt(p,new I)}s[0]=new I,a[0]=new I;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),d=Math.abs(i[0].y),h=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(st(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(st(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),a[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Yl extends li{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new pe){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class xp extends Yl{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Ju(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,d){let h=(a-s)/c-(o-s)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+d)+(l-o)/d;h*=u,f*=u,i(a,o,h,f)},calc:function(s){const a=s*s,o=a*s;return r+e*s+t*a+n*o}}}const ch=new I,uh=new I,Fc=new Ju,Oc=new Ju,kc=new Ju;class yp extends li{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new I){const n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=i[(o-1)%s]:(uh.subVectors(i[0],i[1]).add(i[0]),c=uh);const d=i[o%s],h=i[(o+1)%s];if(this.closed||o+2<s?u=i[(o+2)%s]:(ch.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=ch),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(h),f),g=Math.pow(h.distanceToSquared(u),f);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),Fc.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,p,v,g),Oc.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,p,v,g),kc.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,p,v,g)}else this.curveType==="catmullrom"&&(Fc.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),Oc.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),kc.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return n.set(Fc.calc(l),Oc.calc(l),kc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new I().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function dh(r,e,t,n,i){const s=(n-e)*.5,a=(i-t)*.5,o=r*r,l=r*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*r+t}function L0(r,e){const t=1-r;return t*t*e}function D0(r,e){return 2*(1-r)*r*e}function U0(r,e){return r*r*e}function na(r,e,t,n){return L0(r,e)+D0(r,t)+U0(r,n)}function N0(r,e){const t=1-r;return t*t*t*e}function F0(r,e){const t=1-r;return 3*t*t*r*e}function O0(r,e){return 3*(1-r)*r*r*e}function k0(r,e){return r*r*r*e}function ia(r,e,t,n,i){return N0(r,e)+F0(r,t)+O0(r,n)+k0(r,i)}class ju extends li{constructor(e=new pe,t=new pe,n=new pe,i=new pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new pe){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ia(e,i.x,s.x,a.x,o.x),ia(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class bp extends li{constructor(e=new I,t=new I,n=new I,i=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new I){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ia(e,i.x,s.x,a.x,o.x),ia(e,i.y,s.y,a.y,o.y),ia(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Qu extends li{constructor(e=new pe,t=new pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new pe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Mp extends li{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ed extends li{constructor(e=new pe,t=new pe,n=new pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new pe){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(na(e,i.x,s.x,a.x),na(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class td extends li{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(na(e,i.x,s.x,a.x),na(e,i.y,s.y,a.y),na(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class nd extends li{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new pe){const n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],u=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(dh(o,l.x,c.x,u.x,d.x),dh(o,l.y,c.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new pe().fromArray(i))}return this}}var bl=Object.freeze({__proto__:null,ArcCurve:xp,CatmullRomCurve3:yp,CubicBezierCurve:ju,CubicBezierCurve3:bp,EllipseCurve:Yl,LineCurve:Qu,LineCurve3:Mp,QuadraticBezierCurve:ed,QuadraticBezierCurve3:td,SplineCurve:nd});class Sp extends li{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new bl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const a=s[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new bl[i.type]().fromJSON(i))}return this}}class Ml extends Sp{constructor(e){super(),this.type="Path",this.currentPoint=new pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Qu(this.currentPoint.clone(),new pe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new ed(this.currentPoint.clone(),new pe(e,t),new pe(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){const o=new ju(this.currentPoint.clone(),new pe(e,t),new pe(n,i),new pe(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new nd(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){const c=new Yl(e,t,n,i,s,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ls extends Ml{constructor(e){super(e),this.uuid=Gn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Ml().fromJSON(i))}return this}}function B0(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=wp(r,0,i,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=W0(r,e,s,t)),r.length>80*t){o=r[0],l=r[1];let u=o,d=l;for(let h=t;h<i;h+=t){const f=r[h],p=r[h+1];f<o&&(o=f),p<l&&(l=p),f>u&&(u=f),p>d&&(d=p)}c=Math.max(u-o,d-l),c=c!==0?32767/c:0}return ma(s,a,t,o,l,c,0),a}function wp(r,e,t,n,i){let s;if(i===tv(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=hh(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=hh(a/n|0,r[a],r[a+1],s);return s&&br(s,s.next)&&(va(s),s=s.next),s}function Os(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(br(t,t.next)||Bt(t.prev,t,t.next)===0)){if(va(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ma(r,e,t,n,i,s,a){if(!r)return;!a&&s&&Z0(r,n,i,s);let o=r;for(;r.prev!==r.next;){const l=r.prev,c=r.next;if(s?V0(r,n,i,s):z0(r)){e.push(l.i,r.i,c.i),va(r),r=c.next,o=c.next;continue}if(r=c,r===o){a?a===1?(r=G0(Os(r),e),ma(r,e,t,n,i,s,2)):a===2&&H0(r,e,t,n,i,s):ma(Os(r),e,t,n,i,s,1);break}}}function z0(r){const e=r.prev,t=r,n=r.next;if(Bt(e,t,n)>=0)return!1;const i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(i,s,a),d=Math.min(o,l,c),h=Math.max(i,s,a),f=Math.max(o,l,c);let p=n.next;for(;p!==e;){if(p.x>=u&&p.x<=h&&p.y>=d&&p.y<=f&&Xr(i,o,s,l,a,c,p.x,p.y)&&Bt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function V0(r,e,t,n){const i=r.prev,s=r,a=r.next;if(Bt(i,s,a)>=0)return!1;const o=i.x,l=s.x,c=a.x,u=i.y,d=s.y,h=a.y,f=Math.min(o,l,c),p=Math.min(u,d,h),v=Math.max(o,l,c),g=Math.max(u,d,h),m=pu(f,p,e,t,n),_=pu(v,g,e,t,n);let x=r.prevZ,y=r.nextZ;for(;x&&x.z>=m&&y&&y.z<=_;){if(x.x>=f&&x.x<=v&&x.y>=p&&x.y<=g&&x!==i&&x!==a&&Xr(o,u,l,d,c,h,x.x,x.y)&&Bt(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==a&&Xr(o,u,l,d,c,h,y.x,y.y)&&Bt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=m;){if(x.x>=f&&x.x<=v&&x.y>=p&&x.y<=g&&x!==i&&x!==a&&Xr(o,u,l,d,c,h,x.x,x.y)&&Bt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=_;){if(y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==a&&Xr(o,u,l,d,c,h,y.x,y.y)&&Bt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function G0(r,e){let t=r;do{const n=t.prev,i=t.next.next;!br(n,i)&&Tp(n,t,t.next,i)&&ga(n,i)&&ga(i,n)&&(e.push(n.i,t.i,i.i),va(t),va(t.next),t=r=i),t=t.next}while(t!==r);return Os(t)}function H0(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&j0(a,o)){let l=Ap(a,o);a=Os(a,a.next),l=Os(l,l.next),ma(a,e,t,n,i,s,0),ma(l,e,t,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function W0(r,e,t,n){const i=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*n,l=s<a-1?e[s+1]*n:r.length,c=wp(r,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(J0(c))}i.sort(X0);for(let s=0;s<i.length;s++)t=$0(i[s],t);return t}function X0(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function $0(r,e){const t=q0(r,e);if(!t)return e;const n=Ap(t,r);return Os(n,n.next),Os(t,t.next)}function q0(r,e){let t=e;const n=r.x,i=r.y;let s=-1/0,a;if(br(r,t))return t;do{if(br(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const d=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>s&&(s=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Ep(i<c?n:s,i,l,c,i<c?s:n,i,t.x,t.y)){const d=Math.abs(i-t.y)/(n-t.x);ga(t,r)&&(d<u||d===u&&(t.x>a.x||t.x===a.x&&Y0(a,t)))&&(a=t,u=d)}t=t.next}while(t!==o);return a}function Y0(r,e){return Bt(r.prev,r,e.prev)<0&&Bt(e.next,r,r.next)<0}function Z0(r,e,t,n){let i=r;do i.z===0&&(i.z=pu(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,K0(i)}function K0(r){let e,t=1;do{let n=r,i;r=null;let s=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=a}s.nextZ=null,t*=2}while(e>1);return r}function pu(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function J0(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Ep(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function Xr(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&Ep(r,e,t,n,i,s,a,o)}function j0(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!Q0(r,e)&&(ga(r,e)&&ga(e,r)&&ev(r,e)&&(Bt(r.prev,r,e.prev)||Bt(r,e.prev,e))||br(r,e)&&Bt(r.prev,r,r.next)>0&&Bt(e.prev,e,e.next)>0)}function Bt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function br(r,e){return r.x===e.x&&r.y===e.y}function Tp(r,e,t,n){const i=uo(Bt(r,e,t)),s=uo(Bt(r,e,n)),a=uo(Bt(t,n,r)),o=uo(Bt(t,n,e));return!!(i!==s&&a!==o||i===0&&co(r,t,e)||s===0&&co(r,n,e)||a===0&&co(t,r,n)||o===0&&co(t,e,n))}function co(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function uo(r){return r>0?1:r<0?-1:0}function Q0(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Tp(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function ga(r,e){return Bt(r.prev,r,r.next)<0?Bt(r,e,r.next)>=0&&Bt(r,r.prev,e)>=0:Bt(r,e,r.prev)<0||Bt(r,r.next,e)<0}function ev(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Ap(r,e){const t=mu(r.i,r.x,r.y),n=mu(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function hh(r,e,t,n){const i=mu(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function va(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function mu(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function tv(r,e,t,n){let i=0;for(let s=e,a=t-n;s<t;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}class nv{static triangulate(e,t,n=2){return B0(e,t,n)}}class ii{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return ii.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];fh(e),ph(n,e);let a=e.length;t.forEach(fh);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,ph(n,t[l]);const o=nv.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function fh(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function ph(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class Zl extends ot{constructor(e=new Ls([new pe(.5,.5),new pe(-.5,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new Ge(i,3)),this.setAttribute("uv",new Ge(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1;let h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:iv;let x,y=!1,w,M,C,b;if(m){x=m.getSpacedPoints(u),y=!0,h=!1;const K=m.isCatmullRomCurve3?m.closed:!1;w=m.computeFrenetFrames(u,K),M=new I,C=new I,b=new I}h||(g=0,f=0,p=0,v=0);const E=o.extractPoints(c);let P=E.shape;const D=E.holes;if(!ii.isClockWise(P)){P=P.reverse();for(let K=0,W=D.length;K<W;K++){const se=D[K];ii.isClockWise(se)&&(D[K]=se.reverse())}}function Q(K){const se=10000000000000001e-36;let ue=K[0];for(let me=1;me<=K.length;me++){const Xe=me%K.length,O=K[Xe],nt=O.x-ue.x,ze=O.y-ue.y,Qe=nt*nt+ze*ze,xe=Math.max(Math.abs(O.x),Math.abs(O.y),Math.abs(ue.x),Math.abs(ue.y)),Et=se*xe*xe;if(Qe<=Et){K.splice(Xe,1),me--;continue}ue=O}}Q(P),D.forEach(Q);const ne=D.length,V=P;for(let K=0;K<ne;K++){const W=D[K];P=P.concat(W)}function $(K,W,se){return W||qe("ExtrudeGeometry: vec does not exist"),K.clone().addScaledVector(W,se)}const q=P.length;function ce(K,W,se){let ue,me,Xe;const O=K.x-W.x,nt=K.y-W.y,ze=se.x-K.x,Qe=se.y-K.y,xe=O*O+nt*nt,Et=O*Qe-nt*ze;if(Math.abs(Et)>Number.EPSILON){const R=Math.sqrt(xe),S=Math.sqrt(ze*ze+Qe*Qe),J=W.x-nt/R,oe=W.y+O/R,ge=se.x-Qe/S,Me=se.y+ze/S,Ee=((ge-J)*Qe-(Me-oe)*ze)/(O*Qe-nt*ze);ue=J+O*Ee-K.x,me=oe+nt*Ee-K.y;const re=ue*ue+me*me;if(re<=2)return new pe(ue,me);Xe=Math.sqrt(re/2)}else{let R=!1;O>Number.EPSILON?ze>Number.EPSILON&&(R=!0):O<-Number.EPSILON?ze<-Number.EPSILON&&(R=!0):Math.sign(nt)===Math.sign(Qe)&&(R=!0),R?(ue=-nt,me=O,Xe=Math.sqrt(xe)):(ue=O,me=nt,Xe=Math.sqrt(xe/2))}return new pe(ue/Xe,me/Xe)}const ve=[];for(let K=0,W=V.length,se=W-1,ue=K+1;K<W;K++,se++,ue++)se===W&&(se=0),ue===W&&(ue=0),ve[K]=ce(V[K],V[se],V[ue]);const be=[];let Ae,Oe=ve.concat();for(let K=0,W=ne;K<W;K++){const se=D[K];Ae=[];for(let ue=0,me=se.length,Xe=me-1,O=ue+1;ue<me;ue++,Xe++,O++)Xe===me&&(Xe=0),O===me&&(O=0),Ae[ue]=ce(se[ue],se[Xe],se[O]);be.push(Ae),Oe=Oe.concat(Ae)}let et;if(g===0)et=ii.triangulateShape(V,D);else{const K=[],W=[];for(let se=0;se<g;se++){const ue=se/g,me=f*Math.cos(ue*Math.PI/2),Xe=p*Math.sin(ue*Math.PI/2)+v;for(let O=0,nt=V.length;O<nt;O++){const ze=$(V[O],ve[O],Xe);_e(ze.x,ze.y,-me),ue===0&&K.push(ze)}for(let O=0,nt=ne;O<nt;O++){const ze=D[O];Ae=be[O];const Qe=[];for(let xe=0,Et=ze.length;xe<Et;xe++){const R=$(ze[xe],Ae[xe],Xe);_e(R.x,R.y,-me),ue===0&&Qe.push(R)}ue===0&&W.push(Qe)}}et=ii.triangulateShape(K,W)}const ht=et.length,tt=p+v;for(let K=0;K<q;K++){const W=h?$(P[K],Oe[K],tt):P[K];y?(C.copy(w.normals[0]).multiplyScalar(W.x),M.copy(w.binormals[0]).multiplyScalar(W.y),b.copy(x[0]).add(C).add(M),_e(b.x,b.y,b.z)):_e(W.x,W.y,0)}for(let K=1;K<=u;K++)for(let W=0;W<q;W++){const se=h?$(P[W],Oe[W],tt):P[W];y?(C.copy(w.normals[K]).multiplyScalar(se.x),M.copy(w.binormals[K]).multiplyScalar(se.y),b.copy(x[K]).add(C).add(M),_e(b.x,b.y,b.z)):_e(se.x,se.y,d/u*K)}for(let K=g-1;K>=0;K--){const W=K/g,se=f*Math.cos(W*Math.PI/2),ue=p*Math.sin(W*Math.PI/2)+v;for(let me=0,Xe=V.length;me<Xe;me++){const O=$(V[me],ve[me],ue);_e(O.x,O.y,d+se)}for(let me=0,Xe=D.length;me<Xe;me++){const O=D[me];Ae=be[me];for(let nt=0,ze=O.length;nt<ze;nt++){const Qe=$(O[nt],Ae[nt],ue);y?_e(Qe.x,Qe.y+x[u-1].y,x[u-1].x+se):_e(Qe.x,Qe.y,d+se)}}}H(),ae();function H(){const K=i.length/3;if(h){let W=0,se=q*W;for(let ue=0;ue<ht;ue++){const me=et[ue];Z(me[2]+se,me[1]+se,me[0]+se)}W=u+g*2,se=q*W;for(let ue=0;ue<ht;ue++){const me=et[ue];Z(me[0]+se,me[1]+se,me[2]+se)}}else{for(let W=0;W<ht;W++){const se=et[W];Z(se[2],se[1],se[0])}for(let W=0;W<ht;W++){const se=et[W];Z(se[0]+q*u,se[1]+q*u,se[2]+q*u)}}n.addGroup(K,i.length/3-K,0)}function ae(){const K=i.length/3;let W=0;de(V,W),W+=V.length;for(let se=0,ue=D.length;se<ue;se++){const me=D[se];de(me,W),W+=me.length}n.addGroup(K,i.length/3-K,1)}function de(K,W){let se=K.length;for(;--se>=0;){const ue=se;let me=se-1;me<0&&(me=K.length-1);for(let Xe=0,O=u+g*2;Xe<O;Xe++){const nt=q*Xe,ze=q*(Xe+1),Qe=W+ue+nt,xe=W+me+nt,Et=W+me+ze,R=W+ue+ze;L(Qe,xe,Et,R)}}}function _e(K,W,se){l.push(K),l.push(W),l.push(se)}function Z(K,W,se){F(K),F(W),F(se);const ue=i.length/3,me=_.generateTopUV(n,i,ue-3,ue-2,ue-1);B(me[0]),B(me[1]),B(me[2])}function L(K,W,se,ue){F(K),F(W),F(ue),F(W),F(se),F(ue);const me=i.length/3,Xe=_.generateSideWallUV(n,i,me-6,me-3,me-2,me-1);B(Xe[0]),B(Xe[1]),B(Xe[3]),B(Xe[1]),B(Xe[2]),B(Xe[3])}function F(K){i.push(l[K*3+0]),i.push(l[K*3+1]),i.push(l[K*3+2])}function B(K){s.push(K.x),s.push(K.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return sv(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];n.push(o)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new bl[i.type]().fromJSON(i)),new Zl(n,e.options)}}const iv={generateTopUV:function(r,e,t,n,i){const s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],u=e[i*3+1];return[new pe(s,a),new pe(o,l),new pe(c,u)]},generateSideWallUV:function(r,e,t,n,i,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],d=e[n*3+2],h=e[i*3],f=e[i*3+1],p=e[i*3+2],v=e[s*3],g=e[s*3+1],m=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new pe(a,1-l),new pe(c,1-d),new pe(h,1-p),new pe(v,1-m)]:[new pe(o,1-l),new pe(u,1-d),new pe(f,1-p),new pe(g,1-m)]}};function sv(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Kl extends us{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Kl(e.radius,e.detail)}}class Jl extends ot{constructor(e=[new pe(0,-.5),new pe(.5,0),new pe(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=st(i,0,Math.PI*2);const s=[],a=[],o=[],l=[],c=[],u=1/t,d=new I,h=new pe,f=new I,p=new I,v=new I;let g=0,m=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:g=e[_+1].x-e[_].x,m=e[_+1].y-e[_].y,f.x=m*1,f.y=-g,f.z=m*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:g=e[_+1].x-e[_].x,m=e[_+1].y-e[_].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(p)}for(let _=0;_<=t;_++){const x=n+_*u*i,y=Math.sin(x),w=Math.cos(x);for(let M=0;M<=e.length-1;M++){d.x=e[M].x*y,d.y=e[M].y,d.z=e[M].x*w,a.push(d.x,d.y,d.z),h.x=_/t,h.y=M/(e.length-1),o.push(h.x,h.y);const C=l[3*M+0]*y,b=l[3*M+1],E=l[3*M+0]*w;c.push(C,b,E)}}for(let _=0;_<t;_++)for(let x=0;x<e.length-1;x++){const y=x+_*e.length,w=y,M=y+e.length,C=y+e.length+1,b=y+1;s.push(w,M,b),s.push(C,b,M)}this.setIndex(s),this.setAttribute("position",new Ge(a,3)),this.setAttribute("uv",new Ge(o,2)),this.setAttribute("normal",new Ge(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jl(e.points,e.segments,e.phiStart,e.phiLength)}}class Tr extends us{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Tr(e.radius,e.detail)}}class Ar extends ot{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,d=e/o,h=t/l,f=[],p=[],v=[],g=[];for(let m=0;m<u;m++){const _=m*h-a;for(let x=0;x<c;x++){const y=x*d-s;p.push(y,-_,0),v.push(0,0,1),g.push(x/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let _=0;_<o;_++){const x=_+c*m,y=_+c*(m+1),w=_+1+c*(m+1),M=_+1+c*m;f.push(x,y,M),f.push(y,w,M)}this.setIndex(f),this.setAttribute("position",new Ge(p,3)),this.setAttribute("normal",new Ge(v,3)),this.setAttribute("uv",new Ge(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ar(e.width,e.height,e.widthSegments,e.heightSegments)}}class jl extends ot{constructor(e=.5,t=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],u=[];let d=e;const h=(t-e)/i,f=new I,p=new pe;for(let v=0;v<=i;v++){for(let g=0;g<=n;g++){const m=s+g/n*a;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,u.push(p.x,p.y)}d+=h}for(let v=0;v<i;v++){const g=v*(n+1);for(let m=0;m<n;m++){const _=m+g,x=_,y=_+n+1,w=_+n+2,M=_+1;o.push(x,y,M),o.push(y,w,M)}}this.setIndex(o),this.setAttribute("position",new Ge(l,3)),this.setAttribute("normal",new Ge(c,3)),this.setAttribute("uv",new Ge(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ql extends ot{constructor(e=new Ls([new pe(0,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Ge(i,3)),this.setAttribute("normal",new Ge(s,3)),this.setAttribute("uv",new Ge(a,2));function c(u){const d=i.length/3,h=u.extractPoints(t);let f=h.shape;const p=h.holes;ii.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){const _=p[g];ii.isClockWise(_)===!0&&(p[g]=_.reverse())}const v=ii.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){const _=p[g];f=f.concat(_)}for(let g=0,m=f.length;g<m;g++){const _=f[g];i.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let g=0,m=v.length;g<m;g++){const _=v[g],x=_[0]+d,y=_[1]+d,w=_[2]+d;n.push(x,y,w),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return rv(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const a=t[e.shapes[i]];n.push(a)}return new Ql(n,e.curveSegments)}}function rv(r,e){if(e.shapes=[],Array.isArray(r))for(let t=0,n=r.length;t<n;t++){const i=r[t];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e}class ni extends ot{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],d=new I,h=new I,f=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const _=[],x=m/n;let y=0;m===0&&a===0?y=.5/t:m===n&&l===Math.PI&&(y=-.5/t);for(let w=0;w<=t;w++){const M=w/t;d.x=-e*Math.cos(i+M*s)*Math.sin(a+x*o),d.y=e*Math.cos(a+x*o),d.z=e*Math.sin(i+M*s)*Math.sin(a+x*o),p.push(d.x,d.y,d.z),h.copy(d).normalize(),v.push(h.x,h.y,h.z),g.push(M+y,1-x),_.push(c++)}u.push(_)}for(let m=0;m<n;m++)for(let _=0;_<t;_++){const x=u[m][_+1],y=u[m][_],w=u[m+1][_],M=u[m+1][_+1];(m!==0||a>0)&&f.push(x,y,M),(m!==n-1||l<Math.PI)&&f.push(y,w,M)}this.setIndex(f),this.setAttribute("position",new Ge(p,3)),this.setAttribute("normal",new Ge(v,3)),this.setAttribute("uv",new Ge(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ni(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Aa extends us{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Aa(e.radius,e.detail)}}class ks extends ot{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);const l=[],c=[],u=[],d=[],h=new I,f=new I,p=new I;for(let v=0;v<=n;v++){const g=a+v/n*o;for(let m=0;m<=i;m++){const _=m/i*s;f.x=(e+t*Math.cos(g))*Math.cos(_),f.y=(e+t*Math.cos(g))*Math.sin(_),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),p.subVectors(f,h).normalize(),u.push(p.x,p.y,p.z),d.push(m/i),d.push(v/n)}}for(let v=1;v<=n;v++)for(let g=1;g<=i;g++){const m=(i+1)*v+g-1,_=(i+1)*(v-1)+g-1,x=(i+1)*(v-1)+g,y=(i+1)*v+g;l.push(m,_,y),l.push(_,x,y)}this.setIndex(l),this.setAttribute("position",new Ge(c,3)),this.setAttribute("normal",new Ge(u,3)),this.setAttribute("uv",new Ge(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ks(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ec extends ot{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);const o=[],l=[],c=[],u=[],d=new I,h=new I,f=new I,p=new I,v=new I,g=new I,m=new I;for(let x=0;x<=n;++x){const y=x/n*s*Math.PI*2;_(y,s,a,e,f),_(y+.01,s,a,e,p),g.subVectors(p,f),m.addVectors(p,f),v.crossVectors(g,m),m.crossVectors(v,g),v.normalize(),m.normalize();for(let w=0;w<=i;++w){const M=w/i*Math.PI*2,C=-t*Math.cos(M),b=t*Math.sin(M);d.x=f.x+(C*m.x+b*v.x),d.y=f.y+(C*m.y+b*v.y),d.z=f.z+(C*m.z+b*v.z),l.push(d.x,d.y,d.z),h.subVectors(d,f).normalize(),c.push(h.x,h.y,h.z),u.push(x/n),u.push(w/i)}}for(let x=1;x<=n;x++)for(let y=1;y<=i;y++){const w=(i+1)*(x-1)+(y-1),M=(i+1)*x+(y-1),C=(i+1)*x+y,b=(i+1)*(x-1)+y;o.push(w,M,b),o.push(M,C,b)}this.setIndex(o),this.setAttribute("position",new Ge(l,3)),this.setAttribute("normal",new Ge(c,3)),this.setAttribute("uv",new Ge(u,2));function _(x,y,w,M,C){const b=Math.cos(x),E=Math.sin(x),P=w/y*x,D=Math.cos(P);C.x=M*(2+D)*.5*b,C.y=M*(2+D)*E*.5,C.z=M*Math.sin(P)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ec(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class tc extends ot{constructor(e=new td(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new I,l=new I,c=new pe;let u=new I;const d=[],h=[],f=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new Ge(d,3)),this.setAttribute("normal",new Ge(h,3)),this.setAttribute("uv",new Ge(f,2));function v(){for(let x=0;x<t;x++)g(x);g(s===!1?t:0),_(),m()}function g(x){u=e.getPointAt(x/t,u);const y=a.normals[x],w=a.binormals[x];for(let M=0;M<=i;M++){const C=M/i*Math.PI*2,b=Math.sin(C),E=-Math.cos(C);l.x=E*y.x+b*w.x,l.y=E*y.y+b*w.y,l.z=E*y.z+b*w.z,l.normalize(),h.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,d.push(o.x,o.y,o.z)}}function m(){for(let x=1;x<=t;x++)for(let y=1;y<=i;y++){const w=(i+1)*(x-1)+(y-1),M=(i+1)*x+(y-1),C=(i+1)*x+y,b=(i+1)*(x-1)+y;p.push(w,M,b),p.push(M,C,b)}}function _(){for(let x=0;x<=t;x++)for(let y=0;y<=i;y++)c.x=x/t,c.y=y/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new tc(new bl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class id extends ot{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new I,s=new I;if(e.index!==null){const a=e.attributes.position,o=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const d=l[c],h=d.start,f=d.count;for(let p=h,v=h+f;p<v;p+=3)for(let g=0;g<3;g++){const m=o.getX(p+g),_=o.getX(p+(g+1)%3);i.fromBufferAttribute(a,m),s.fromBufferAttribute(a,_),mh(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{const a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){const u=3*o+c,d=3*o+(c+1)%3;i.fromBufferAttribute(a,u),s.fromBufferAttribute(a,d),mh(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Ge(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function mh(r,e,t){const n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var gh=Object.freeze({__proto__:null,BoxGeometry:cs,CapsuleGeometry:Xl,CircleGeometry:$l,ConeGeometry:Bs,CylinderGeometry:Ta,DodecahedronGeometry:ql,EdgesGeometry:_p,ExtrudeGeometry:Zl,IcosahedronGeometry:Kl,LatheGeometry:Jl,OctahedronGeometry:Tr,PlaneGeometry:Ar,PolyhedronGeometry:us,RingGeometry:jl,ShapeGeometry:Ql,SphereGeometry:ni,TetrahedronGeometry:Aa,TorusGeometry:ks,TorusKnotGeometry:ec,TubeGeometry:tc,WireframeGeometry:id});class Cp extends on{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ne(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}function Mr(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];if(vh(i))i.isRenderTargetTexture?(Ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(vh(i[0])){const s=[];for(let a=0,o=i.length;a<o;a++)s[a]=i[a].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function _n(r){const e={};for(let t=0;t<r.length;t++){const n=Mr(r[t]);for(const i in n)e[i]=n[i]}return e}function vh(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function av(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Rp(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:vt.workingColorSpace}const nc={clone:Mr,merge:_n};var ov=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wn extends on{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ov,this.fragmentShader=lv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Mr(e.uniforms),this.uniformsGroups=av(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class sd extends Wn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class rd extends on{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bi,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ai,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ip extends rd{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return st(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ne(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ne(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ne(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Pp extends on{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ne(16777215),this.specular=new Ne(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bi,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ai,this.combine=Sa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Lp extends on{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Ne(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bi,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class Dp extends on{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bi,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Up extends on{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bi,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ai,this.combine=Sa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ad extends on{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class od extends on{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Np extends on{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Ne(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bi,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Fp extends Tn{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function Rs(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Op(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function gu(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function ld(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}function cv(r,e,t,n,i=30){const s=r.clone();s.name=e;const a=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],u=c.getValueSize(),d=[],h=[];for(let f=0;f<c.times.length;++f){const p=c.times[f]*i;if(!(p<t||p>=n)){d.push(c.times[f]);for(let v=0;v<u;++v)h.push(c.values[f*u+v])}}d.length!==0&&(c.times=Rs(d,c.times.constructor),c.values=Rs(h,c.values.constructor),a.push(c))}s.tracks=a;let o=1/0;for(let l=0;l<s.tracks.length;++l)o>s.tracks[l].times[0]&&(o=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*o);return s.resetDuration(),s}function uv(r,e=0,t=r,n=30){n<=0&&(n=30);const i=t.tracks.length,s=e/n;for(let a=0;a<i;++a){const o=t.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;const c=r.tracks.find(function(m){return m.name===o.name&&m.ValueTypeName===l});if(c===void 0)continue;let u=0;const d=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=d/3);let h=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=f/3);const p=o.times.length-1;let v;if(s<=o.times[0]){const m=u,_=d-u;v=o.values.slice(m,_)}else if(s>=o.times[p]){const m=p*d+u,_=m+d-u;v=o.values.slice(m,_)}else{const m=o.createInterpolant(),_=u,x=d-u;m.evaluate(s),v=m.resultBuffer.slice(_,x)}l==="quaternion"&&new gn().fromArray(v).normalize().conjugate().toArray(v);const g=c.times.length;for(let m=0;m<g;++m){const _=m*f+h;if(l==="quaternion")gn.multiplyQuaternionsFlat(c.values,_,v,0,c.values,_);else{const x=f-h*2;for(let y=0;y<x;++y)c.values[_+y]-=v[y]}}}return r.blendMode=Vu,r}class dv{static convertArray(e,t){return Rs(e,t)}static isTypedArray(e){return ip(e)}static getKeyframeOrder(e){return Op(e)}static sortedArray(e,t,n){return gu(e,t,n)}static flattenJSON(e,t,n,i){ld(e,t,n,i)}static subclip(e,t,n,i,s=30){return cv(e,t,n,i,s)}static makeClipAdditive(e,t=0,n=e,i=30){return uv(e,t,n,i)}}class Cr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class kp extends Cr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:As,endingEnd:As}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Cs:s=e,o=2*t-n;break;case ca:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Cs:a=e,l=2*n-t;break;case ca:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),v=p*p,g=v*p,m=-h*g+2*h*v-h*p,_=(1+h)*g+(-1.5-2*h)*v+(-.5+h)*p+1,x=(-1-f)*g+(1.5+f)*v+.5*p,y=f*g-f*v;for(let w=0;w!==o;++w)s[w]=m*a[u+w]+_*a[c+w]+x*a[l+w]+y*a[d+w];return s}}class cd extends Cr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(i-t),d=1-u;for(let h=0;h!==o;++h)s[h]=a[c+h]*d+a[l+h]*u;return s}}class Bp extends Cr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class zp extends Cr{interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.settings||this.DefaultSettings_,d=u.inTangents,h=u.outTangents;if(!d||!h){const v=(n-t)/(i-t),g=1-v;for(let m=0;m!==o;++m)s[m]=a[c+m]*g+a[l+m]*v;return s}const f=o*2,p=e-1;for(let v=0;v!==o;++v){const g=a[c+v],m=a[l+v],_=p*f+v*2,x=h[_],y=h[_+1],w=e*f+v*2,M=d[w],C=d[w+1];let b=(n-t)/(i-t),E,P,D,k,Q;for(let ne=0;ne<8;ne++){E=b*b,P=E*b,D=1-b,k=D*D,Q=k*D;const $=Q*t+3*k*b*x+3*D*E*M+P*i-n;if(Math.abs($)<1e-10)break;const q=3*k*(x-t)+6*D*b*(M-x)+3*E*(i-M);if(Math.abs(q)<1e-10)break;b=b-$/q,b=Math.max(0,Math.min(1,b))}s[v]=Q*g+3*k*b*y+3*D*E*C+P*m}return s}}class Yn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Rs(t,this.TimeBufferType),this.values=Rs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Rs(e.times,Array),values:Rs(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Bp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new cd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new kp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new zp(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case la:t=this.InterpolantFactoryMethodDiscrete;break;case gl:t=this.InterpolantFactoryMethodLinear;break;case Ao:t=this.InterpolantFactoryMethodSmooth;break;case uu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ce("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return la;case this.InterpolantFactoryMethodLinear:return gl;case this.InterpolantFactoryMethodSmooth:return Ao;case this.InterpolantFactoryMethodBezier:return uu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(qe("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(qe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){qe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){qe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&ip(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){qe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ao,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(i)l=!0;else{const d=o*n,h=d-n,f=d+n;for(let p=0;p!==n;++p){const v=t[d+p];if(v!==t[h+p]||v!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const d=o*n,h=a*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Yn.prototype.ValueTypeName="";Yn.prototype.TimeBufferType=Float32Array;Yn.prototype.ValueBufferType=Float32Array;Yn.prototype.DefaultInterpolation=gl;class zs extends Yn{constructor(e,t,n){super(e,t,n)}}zs.prototype.ValueTypeName="bool";zs.prototype.ValueBufferType=Array;zs.prototype.DefaultInterpolation=la;zs.prototype.InterpolantFactoryMethodLinear=void 0;zs.prototype.InterpolantFactoryMethodSmooth=void 0;class ud extends Yn{constructor(e,t,n,i){super(e,t,n,i)}}ud.prototype.ValueTypeName="color";class _a extends Yn{constructor(e,t,n,i){super(e,t,n,i)}}_a.prototype.ValueTypeName="number";class Vp extends Cr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let u=c+o;c!==u;c+=4)gn.slerpFlat(s,0,a,c-o,a,c,l);return s}}class Ca extends Yn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Vp(this.times,this.values,this.getValueSize(),e)}}Ca.prototype.ValueTypeName="quaternion";Ca.prototype.InterpolantFactoryMethodSmooth=void 0;class Vs extends Yn{constructor(e,t,n){super(e,t,n)}}Vs.prototype.ValueTypeName="string";Vs.prototype.ValueBufferType=Array;Vs.prototype.DefaultInterpolation=la;Vs.prototype.InterpolantFactoryMethodLinear=void 0;Vs.prototype.InterpolantFactoryMethodSmooth=void 0;class xa extends Yn{constructor(e,t,n,i){super(e,t,n,i)}}xa.prototype.ValueTypeName="vector";class ya{constructor(e="",t=-1,n=[],i=Dl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Gn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(fv(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(Yn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const u=Op(l);l=gu(l,1,u),c=gu(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new _a(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],u=c.name.match(s);if(u&&u.length>1){const d=u[1];let h=i[d];h||(i[d]=h=[]),h.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(Ce("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return qe("AnimationClip: No animation in JSONLoader data."),null;const n=function(d,h,f,p,v){if(f.length!==0){const g=[],m=[];ld(f,g,m,p),g.length!==0&&v.push(new d(h,g,m))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const h=c[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const f={};let p;for(p=0;p<h.length;p++)if(h[p].morphTargets)for(let v=0;v<h[p].morphTargets.length;v++)f[h[p].morphTargets[v]]=-1;for(const v in f){const g=[],m=[];for(let _=0;_!==h[p].morphTargets.length;++_){const x=h[p];g.push(x.time),m.push(x.morphTarget===v?1:0)}i.push(new _a(".morphTargetInfluence["+v+"]",g,m))}l=f.length*a}else{const f=".bones["+t[d].name+"]";n(xa,f+".position",h,"pos",i),n(Ca,f+".quaternion",h,"rot",i),n(xa,f+".scale",h,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function hv(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return _a;case"vector":case"vector2":case"vector3":case"vector4":return xa;case"color":return ud;case"quaternion":return Ca;case"bool":case"boolean":return zs;case"string":return Vs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function fv(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=hv(r.type);if(r.times===void 0){const t=[],n=[];ld(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const bi={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(_h(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!_h(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function _h(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class dd{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&i.onStart!==void 0&&i.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){const f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Gp=new dd;class Un{constructor(e){this.manager=e!==void 0?e:Gp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Un.DEFAULT_MATERIAL_NAME="__DEFAULT";const Di={};class pv extends Error{constructor(e,t){super(e),this.response=t}}class zi extends Un{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=bi.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(Di[e]!==void 0){Di[e].push({onLoad:t,onProgress:n,onError:i});return}Di[e]=[],Di[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ce("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Di[e],d=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=h?parseInt(h):0,p=f!==0;let v=0;const g=new ReadableStream({start(m){_();function _(){d.read().then(({done:x,value:y})=>{if(x)m.close();else{v+=y.byteLength;const w=new ProgressEvent("progress",{lengthComputable:p,loaded:v,total:f});for(let M=0,C=u.length;M<C;M++){const b=u[M];b.onProgress&&b.onProgress(w)}m.enqueue(y),_()}},x=>{m.error(x)})}}});return new Response(g)}else throw new pv(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{bi.add(`file:${e}`,c);const u=Di[e];delete Di[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=Di[e];if(u===void 0)throw this.manager.itemError(e),c;delete Di[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class mv extends Un{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new zi(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):qe(l),s.manager.itemError(e)}},n,i)}parse(e){const t=[];for(let n=0;n<e.length;n++){const i=ya.parse(e[n]);t.push(i)}return t}}class gv extends Un{constructor(e){super(e)}load(e,t,n,i){const s=this,a=[],o=new Wl,l=new zi(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(s.withCredentials);let c=0;function u(d){l.load(e[d],function(h){const f=s.parse(h,!0);a[d]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(o.minFilter=Ot),o.image=a,o.format=f.format,o.needsUpdate=!0,t&&t(o))},n,i)}if(Array.isArray(e))for(let d=0,h=e.length;d<h;++d)u(d);else l.load(e,function(d){const h=s.parse(d,!0);if(h.isCubemap){const f=h.mipmaps.length/h.mipmapCount;for(let p=0;p<f;p++){a[p]={mipmaps:[]};for(let v=0;v<h.mipmapCount;v++)a[p].mipmaps.push(h.mipmaps[p*h.mipmapCount+v]),a[p].format=h.format,a[p].width=h.width,a[p].height=h.height}o.image=a}else o.image.width=h.width,o.image.height=h.height,o.mipmaps=h.mipmaps;h.mipmapCount===1&&(o.minFilter=Ot),o.format=h.format,o.needsUpdate=!0,t&&t(o)},n,i);return o}}const rr=new WeakMap;class ba extends Un{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=bi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let d=rr.get(a);d===void 0&&(d=[],rr.set(a,d)),d.push({onLoad:t,onError:i})}return a}const o=fa("img");function l(){u(),t&&t(this);const d=rr.get(this)||[];for(let h=0;h<d.length;h++){const f=d[h];f.onLoad&&f.onLoad(this)}rr.delete(this),s.manager.itemEnd(e)}function c(d){u(),i&&i(d),bi.remove(`image:${e}`);const h=rr.get(this)||[];for(let f=0;f<h.length;f++){const p=h[f];p.onError&&p.onError(d)}rr.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),bi.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class vv extends Un{constructor(e){super(e)}load(e,t,n,i){const s=new Ea;s.colorSpace=In;const a=new ba(this.manager);a.setCrossOrigin(this.crossOrigin),a.setPath(this.path);let o=0;function l(c){a.load(e[c],function(u){s.images[c]=u,o++,o===6&&(s.needsUpdate=!0,t&&t(s))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return s}}class _v extends Un{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new ri,o=new zi(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(e,function(l){let c;try{c=s.parse(l)}catch(u){i!==void 0?i(u):qe(u);return}c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:Dn,a.wrapT=c.wrapT!==void 0?c.wrapT:Dn,a.magFilter=c.magFilter!==void 0?c.magFilter:Ot,a.minFilter=c.minFilter!==void 0?c.minFilter:Ot,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(a.colorSpace=c.colorSpace),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=yi),c.mipmapCount===1&&(a.minFilter=Ot),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,t&&t(a,c)},n,i),a}}class xv extends Un{constructor(e){super(e)}load(e,t,n,i){const s=new zt,a=new ba(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class ds extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Hp extends ds{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Bc=new it,xh=new I,yh=new I;class hd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new pe(512,512),this.mapType=Pn,this.map=null,this.mapPass=null,this.matrix=new it,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Er,this._frameExtents=new pe(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;xh.setFromMatrixPosition(e.matrixWorld),t.position.copy(xh),yh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yh),t.updateMatrixWorld(),Bc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bc,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ns||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Bc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ho=new I,fo=new gn,pi=new I;class ic extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new it,this.projectionMatrix=new it,this.projectionMatrixInverse=new it,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ho,fo,pi),pi.x===1&&pi.y===1&&pi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ho,fo,pi.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(ho,fo,pi),pi.x===1&&pi.y===1&&pi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ho,fo,pi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ji=new I,bh=new pe,Mh=new pe;class rn extends ic{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=xr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ps*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xr*2*Math.atan(Math.tan(Ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z)}getViewSize(e,t){return this.getViewBounds(e,bh,Mh),t.subVectors(Mh,bh)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ps*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class yv extends hd{constructor(){super(new rn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=xr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Wp extends ds{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new yv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class bv extends hd{constructor(){super(new rn(90,1,.5,500)),this.isPointLightShadow=!0}}class Xp extends ds{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new bv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Ra extends ic{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Mv extends hd{constructor(){super(new Ra(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class $p extends ds{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new Mv}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class qp extends ds{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Yp extends ds{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class fd{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new I)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,s=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.282095),t.addScaledVector(a[1],.488603*i),t.addScaledVector(a[2],.488603*s),t.addScaledVector(a[3],.488603*n),t.addScaledVector(a[4],1.092548*(n*i)),t.addScaledVector(a[5],1.092548*(i*s)),t.addScaledVector(a[6],.315392*(3*s*s-1)),t.addScaledVector(a[7],1.092548*(n*s)),t.addScaledVector(a[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,s=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.886227),t.addScaledVector(a[1],2*.511664*i),t.addScaledVector(a[2],2*.511664*s),t.addScaledVector(a[3],2*.511664*n),t.addScaledVector(a[4],2*.429043*n*i),t.addScaledVector(a[5],2*.429043*i*s),t.addScaledVector(a[6],.743125*s*s-.247708),t.addScaledVector(a[7],2*.429043*n*s),t.addScaledVector(a[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,s=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*s,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*s,t[6]=.315392*(3*s*s-1),t[7]=1.092548*n*s,t[8]=.546274*(n*n-i*i)}}class Zp extends ds{constructor(e=new fd,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class sc extends Un{constructor(e){super(e),this.textures={}}load(e,t,n,i){const s=this,a=new zi(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):qe(l),s.manager.itemError(e)}},n,i)}parse(e){const t=this.textures;function n(s){return t[s]===void 0&&Ce("MaterialLoader: Undefined texture",s),t[s]}const i=this.createMaterialFromType(e.type);if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=e.sheen),e.sheenColor!==void 0&&(i.sheenColor=new Ne().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(i.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.specularIntensity!==void 0&&(i.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(i.dispersion=e.dispersion),e.iridescence!==void 0&&(i.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(i.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.attenuationDistance!==void 0&&(i.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(i.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.shadowSide!==void 0&&(i.shadowSide=e.shadowSide),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(i.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(i.depthFunc=e.depthFunc),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(i.blendSrc=e.blendSrc),e.blendDst!==void 0&&(i.blendDst=e.blendDst),e.blendEquation!==void 0&&(i.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(i.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(i.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==void 0&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(i.dithering=e.dithering),e.alphaToCoverage!==void 0&&(i.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(i.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(i.allowOverride=e.allowOverride),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const s in e.uniforms){const a=e.uniforms[s];switch(i.uniforms[s]={},a.type){case"t":i.uniforms[s].value=n(a.value);break;case"c":i.uniforms[s].value=new Ne().setHex(a.value);break;case"v2":i.uniforms[s].value=new pe().fromArray(a.value);break;case"v3":i.uniforms[s].value=new I().fromArray(a.value);break;case"v4":i.uniforms[s].value=new bt().fromArray(a.value);break;case"m3":i.uniforms[s].value=new at().fromArray(a.value);break;case"m4":i.uniforms[s].value=new it().fromArray(a.value);break;default:i.uniforms[s].value=a.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(i.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)i.extensions[s]=e.extensions[s];if(e.lights!==void 0&&(i.lights=e.lights),e.clipping!==void 0&&(i.clipping=e.clipping),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),i.normalScale=new pe().fromArray(s)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(i.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapRotation!==void 0&&i.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new pe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(i.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(i.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(i.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(i.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(e.sheenRoughnessMap)),i}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return sc.createMaterialFromType(e)}static createMaterialFromType(e){const t={ShadowMaterial:Cp,SpriteMaterial:qu,RawShaderMaterial:sd,ShaderMaterial:Wn,PointsMaterial:Zu,MeshPhysicalMaterial:Ip,MeshStandardMaterial:rd,MeshPhongMaterial:Pp,MeshToonMaterial:Lp,MeshNormalMaterial:Dp,MeshLambertMaterial:Up,MeshDepthMaterial:ad,MeshDistanceMaterial:od,MeshBasicMaterial:sn,MeshMatcapMaterial:Np,LineDashedMaterial:Fp,LineBasicMaterial:Tn,Material:on};return new t[e]}}class vu{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class pd extends ot{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class Kp extends Un{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new zi(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):qe(l),s.manager.itemError(e)}},n,i)}parse(e){const t={},n={};function i(f,p){if(t[p]!==void 0)return t[p];const g=f.interleavedBuffers[p],m=s(f,g.buffer),_=pr(g.type,m),x=new Vl(_,g.stride);return x.uuid=g.uuid,t[p]=x,x}function s(f,p){if(n[p]!==void 0)return n[p];const g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}const a=e.isInstancedBufferGeometry?new pd:new ot,o=e.data.index;if(o!==void 0){const f=pr(o.type,o.array);a.setIndex(new Lt(f,1))}const l=e.data.attributes;for(const f in l){const p=l[f];let v;if(p.isInterleavedBufferAttribute){const g=i(e.data,p.data);v=new Vn(g,p.itemSize,p.offset,p.normalized)}else{const g=pr(p.type,p.array),m=p.isInstancedBufferAttribute?yr:Lt;v=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(v.name=p.name),p.usage!==void 0&&v.setUsage(p.usage),a.setAttribute(f,v)}const c=e.data.morphAttributes;if(c)for(const f in c){const p=c[f],v=[];for(let g=0,m=p.length;g<m;g++){const _=p[g];let x;if(_.isInterleavedBufferAttribute){const y=i(e.data,_.data);x=new Vn(y,_.itemSize,_.offset,_.normalized)}else{const y=pr(_.type,_.array);x=new Lt(y,_.itemSize,_.normalized)}_.name!==void 0&&(x.name=_.name),v.push(x)}a.morphAttributes[f]=v}e.data.morphTargetsRelative&&(a.morphTargetsRelative=!0);const d=e.data.groups||e.data.drawcalls||e.data.offsets;if(d!==void 0)for(let f=0,p=d.length;f!==p;++f){const v=d[f];a.addGroup(v.start,v.count,v.materialIndex)}const h=e.data.boundingSphere;return h!==void 0&&(a.boundingSphere=new jt().fromJSON(h)),e.name&&(a.name=e.name),e.userData&&(a.userData=e.userData),a}}const zc={};class Sv extends Un{constructor(e){super(e)}load(e,t,n,i){const s=this,a=this.path===""?vu.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||a;const o=new zi(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(d){i!==void 0&&i(d),qe("ObjectLoader: Can't parse "+e+".",d.message);return}const u=c.metadata;if(u===void 0||u.type===void 0||u.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),qe("ObjectLoader: Can't load "+e);return}s.parse(c,t)},n,i)}async loadAsync(e,t){const n=this,i=this.path===""?vu.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;const s=new zi(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const a=await s.loadAsync(e,t);let o;try{o=JSON.parse(a)}catch(c){throw new Error("ObjectLoader: Can't parse "+e+". "+c.message)}const l=o.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(o)}parse(e,t){const n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),s=this.parseGeometries(e.geometries,i),a=this.parseImages(e.images,function(){t!==void 0&&t(c)}),o=this.parseTextures(e.textures,a),l=this.parseMaterials(e.materials,o),c=this.parseObject(e.object,s,l,o,n),u=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,u),this.bindLightTargets(c),t!==void 0){let d=!1;for(const h in a)if(a[h].data instanceof HTMLImageElement){d=!0;break}d===!1&&t(c)}return c}async parseAsync(e){const t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),s=await this.parseImagesAsync(e.images),a=this.parseTextures(e.textures,s),o=this.parseMaterials(e.materials,a),l=this.parseObject(e.object,i,o,a,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}static registerGeometry(e,t){zc[e]=t}parseShapes(e){const t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){const s=new Ls().fromJSON(e[n]);t[s.uuid]=s}return t}parseSkeletons(e,t){const n={},i={};if(t.traverse(function(s){s.isBone&&(i[s.uuid]=s)}),e!==void 0)for(let s=0,a=e.length;s<a;s++){const o=new Gl().fromJSON(e[s],i);n[o.uuid]=o}return n}parseGeometries(e,t){const n={};if(e!==void 0){const i=new Kp;for(let s=0,a=e.length;s<a;s++){let o;const l=e[s];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":o=i.parse(l);break;default:l.type in gh?o=gh[l.type].fromJSON(l,t):l.type in zc?o=zc[l.type].fromJSON(l,t):Ce(`ObjectLoader: Unknown geometry type "${l.type}". Use .registerGeometry() before starting the deserialization process.`)}o.uuid=l.uuid,l.name!==void 0&&(o.name=l.name),l.userData!==void 0&&(o.userData=l.userData),n[l.uuid]=o}}return n}parseMaterials(e,t){const n={},i={};if(e!==void 0){const s=new sc;s.setTextures(t);for(let a=0,o=e.length;a<o;a++){const l=e[a];n[l.uuid]===void 0&&(n[l.uuid]=s.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){const t={};if(e!==void 0)for(let n=0;n<e.length;n++){const i=e[n],s=ya.parse(i);t[s.uuid]=s}return t}parseImages(e,t){const n=this,i={};let s;function a(l){return n.manager.itemStart(l),s.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function o(l){if(typeof l=="string"){const c=l,u=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return a(u)}else return l.data?{data:pr(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){const l=new dd(t);s=new ba(l),s.setCrossOrigin(this.crossOrigin);for(let c=0,u=e.length;c<u;c++){const d=e[c],h=d.url;if(Array.isArray(h)){const f=[];for(let p=0,v=h.length;p<v;p++){const g=h[p],m=o(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new ri(m.data,m.width,m.height)))}i[d.uuid]=new ns(f)}else{const f=o(d.url);i[d.uuid]=new ns(f)}}}return i}async parseImagesAsync(e){const t=this,n={};let i;async function s(a){if(typeof a=="string"){const o=a,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(o)?o:t.resourcePath+o;return await i.loadAsync(l)}else return a.data?{data:pr(a.type,a.data),width:a.width,height:a.height}:null}if(e!==void 0&&e.length>0){i=new ba(this.manager),i.setCrossOrigin(this.crossOrigin);for(let a=0,o=e.length;a<o;a++){const l=e[a],c=l.url;if(Array.isArray(c)){const u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d],p=await s(f);p!==null&&(p instanceof HTMLImageElement?u.push(p):u.push(new ri(p.data,p.width,p.height)))}n[l.uuid]=new ns(u)}else{const u=await s(l.url);n[l.uuid]=new ns(u)}}}return n}parseTextures(e,t){function n(s,a){return typeof s=="number"?s:(Ce("ObjectLoader.parseTexture: Constant should be in numeric form.",s),a[s])}const i={};if(e!==void 0)for(let s=0,a=e.length;s<a;s++){const o=e[s];o.image===void 0&&Ce('ObjectLoader: No "image" specified for',o.uuid),t[o.image]===void 0&&Ce("ObjectLoader: Undefined image",o.image);const l=t[o.image],c=l.data;let u;Array.isArray(c)?(u=new Ea,c.length===6&&(u.needsUpdate=!0)):(c&&c.data?u=new ri:u=new zt,c&&(u.needsUpdate=!0)),u.source=l,u.uuid=o.uuid,o.name!==void 0&&(u.name=o.name),o.mapping!==void 0&&(u.mapping=n(o.mapping,wv)),o.channel!==void 0&&(u.channel=o.channel),o.offset!==void 0&&u.offset.fromArray(o.offset),o.repeat!==void 0&&u.repeat.fromArray(o.repeat),o.center!==void 0&&u.center.fromArray(o.center),o.rotation!==void 0&&(u.rotation=o.rotation),o.wrap!==void 0&&(u.wrapS=n(o.wrap[0],Sh),u.wrapT=n(o.wrap[1],Sh)),o.format!==void 0&&(u.format=o.format),o.internalFormat!==void 0&&(u.internalFormat=o.internalFormat),o.type!==void 0&&(u.type=o.type),o.colorSpace!==void 0&&(u.colorSpace=o.colorSpace),o.minFilter!==void 0&&(u.minFilter=n(o.minFilter,wh)),o.magFilter!==void 0&&(u.magFilter=n(o.magFilter,wh)),o.anisotropy!==void 0&&(u.anisotropy=o.anisotropy),o.flipY!==void 0&&(u.flipY=o.flipY),o.generateMipmaps!==void 0&&(u.generateMipmaps=o.generateMipmaps),o.premultiplyAlpha!==void 0&&(u.premultiplyAlpha=o.premultiplyAlpha),o.unpackAlignment!==void 0&&(u.unpackAlignment=o.unpackAlignment),o.compareFunction!==void 0&&(u.compareFunction=o.compareFunction),o.normalized!==void 0&&(u.normalized=o.normalized),o.userData!==void 0&&(u.userData=o.userData),i[o.uuid]=u}return i}parseObject(e,t,n,i,s){let a;function o(h){return t[h]===void 0&&Ce("ObjectLoader: Undefined geometry",h),t[h]}function l(h){if(h!==void 0){if(Array.isArray(h)){const f=[];for(let p=0,v=h.length;p<v;p++){const g=h[p];n[g]===void 0&&Ce("ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[h]===void 0&&Ce("ObjectLoader: Undefined material",h),n[h]}}function c(h){return i[h]===void 0&&Ce("ObjectLoader: Undefined texture",h),i[h]}let u,d;switch(e.type){case"Scene":a=new Wu,e.background!==void 0&&(Number.isInteger(e.background)?a.background=new Ne(e.background):a.background=c(e.background)),e.environment!==void 0&&(a.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?a.fog=new zl(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(a.fog=new Bl(e.fog.color,e.fog.density)),e.fog.name!==""&&(a.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(a.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(a.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&a.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(a.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&a.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":a=new rn(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(a.focus=e.focus),e.zoom!==void 0&&(a.zoom=e.zoom),e.filmGauge!==void 0&&(a.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(a.filmOffset=e.filmOffset),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"OrthographicCamera":a=new Ra(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(a.zoom=e.zoom),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"AmbientLight":a=new qp(e.color,e.intensity);break;case"DirectionalLight":a=new $p(e.color,e.intensity),a.target=e.target||"";break;case"PointLight":a=new Xp(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":a=new Yp(e.color,e.intensity,e.width,e.height);break;case"SpotLight":a=new Wp(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),a.target=e.target||"";break;case"HemisphereLight":a=new Hp(e.color,e.groundColor,e.intensity);break;case"LightProbe":const h=new fd().fromArray(e.sh);a=new Zp(h,e.intensity);break;case"SkinnedMesh":u=o(e.geometry),d=l(e.material),a=new dp(u,d),e.bindMode!==void 0&&(a.bindMode=e.bindMode),e.bindMatrix!==void 0&&a.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(a.skeleton=e.skeleton);break;case"Mesh":u=o(e.geometry),d=l(e.material),a=new Rt(u,d);break;case"InstancedMesh":u=o(e.geometry),d=l(e.material);const f=e.count,p=e.instanceMatrix,v=e.instanceColor;a=new hp(u,d,f),a.instanceMatrix=new yr(new Float32Array(p.array),16),v!==void 0&&(a.instanceColor=new yr(new Float32Array(v.array),v.itemSize));break;case"BatchedMesh":u=o(e.geometry),d=l(e.material),a=new fp(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,d),a.geometry=u,a.perObjectFrustumCulled=e.perObjectFrustumCulled,a.sortObjects=e.sortObjects,a._drawRanges=e.drawRanges,a._reservedRanges=e.reservedRanges,a._geometryInfo=e.geometryInfo.map(g=>{let m=null,_=null;return g.boundingBox!==void 0&&(m=new Jt().fromJSON(g.boundingBox)),g.boundingSphere!==void 0&&(_=new jt().fromJSON(g.boundingSphere)),{...g,boundingBox:m,boundingSphere:_}}),a._instanceInfo=e.instanceInfo,a._availableInstanceIds=e._availableInstanceIds,a._availableGeometryIds=e._availableGeometryIds,a._nextIndexStart=e.nextIndexStart,a._nextVertexStart=e.nextVertexStart,a._geometryCount=e.geometryCount,a._maxInstanceCount=e.maxInstanceCount,a._maxVertexCount=e.maxVertexCount,a._maxIndexCount=e.maxIndexCount,a._geometryInitialized=e.geometryInitialized,a._matricesTexture=c(e.matricesTexture.uuid),a._indirectTexture=c(e.indirectTexture.uuid),e.colorsTexture!==void 0&&(a._colorsTexture=c(e.colorsTexture.uuid)),e.boundingSphere!==void 0&&(a.boundingSphere=new jt().fromJSON(e.boundingSphere)),e.boundingBox!==void 0&&(a.boundingBox=new Jt().fromJSON(e.boundingBox));break;case"LOD":a=new up;break;case"Line":a=new os(o(e.geometry),l(e.material));break;case"LineLoop":a=new pp(o(e.geometry),l(e.material));break;case"LineSegments":a=new Ai(o(e.geometry),l(e.material));break;case"PointCloud":case"Points":a=new mp(o(e.geometry),l(e.material));break;case"Sprite":a=new cp(l(e.material));break;case"Group":a=new mr;break;case"Bone":a=new Yu;break;default:a=new Mt}if(a.uuid=e.uuid,e.name!==void 0&&(a.name=e.name),e.matrix!==void 0?(a.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(a.matrixAutoUpdate=e.matrixAutoUpdate),a.matrixAutoUpdate&&a.matrix.decompose(a.position,a.quaternion,a.scale)):(e.position!==void 0&&a.position.fromArray(e.position),e.rotation!==void 0&&a.rotation.fromArray(e.rotation),e.quaternion!==void 0&&a.quaternion.fromArray(e.quaternion),e.scale!==void 0&&a.scale.fromArray(e.scale)),e.up!==void 0&&a.up.fromArray(e.up),e.pivot!==void 0&&(a.pivot=new I().fromArray(e.pivot)),e.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),e.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=e.morphTargetInfluences.slice()),e.castShadow!==void 0&&(a.castShadow=e.castShadow),e.receiveShadow!==void 0&&(a.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(a.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(a.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(a.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(a.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&a.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(a.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(a.visible=e.visible),e.frustumCulled!==void 0&&(a.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(a.renderOrder=e.renderOrder),e.static!==void 0&&(a.static=e.static),e.userData!==void 0&&(a.userData=e.userData),e.layers!==void 0&&(a.layers.mask=e.layers),e.children!==void 0){const h=e.children;for(let f=0;f<h.length;f++)a.add(this.parseObject(h[f],t,n,i,s))}if(e.animations!==void 0){const h=e.animations;for(let f=0;f<h.length;f++){const p=h[f];a.animations.push(s[p])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(a.autoUpdate=e.autoUpdate);const h=e.levels;for(let f=0;f<h.length;f++){const p=h[f],v=a.getObjectByProperty("uuid",p.object);v!==void 0&&a.addLevel(v,p.distance,p.hysteresis)}}return a}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=t[n.skeleton];i===void 0?Ce("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){const n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new Mt}})}}const wv={UVMapping:Tl,CubeReflectionMapping:wi,CubeRefractionMapping:ss,EquirectangularReflectionMapping:Yr,EquirectangularRefractionMapping:Zr,CubeUVReflectionMapping:Sr},Sh={RepeatWrapping:sa,ClampToEdgeWrapping:Dn,MirroredRepeatWrapping:ra},wh={NearestFilter:Zt,NearestMipmapNearestFilter:Uu,NearestMipmapLinearFilter:fr,LinearFilter:Ot,LinearMipmapNearestFilter:Kr,LinearMipmapLinearFilter:yi},Vc=new WeakMap;class Ev extends Un{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ce("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ce("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=bi.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{Vc.has(a)===!0?(i&&i(Vc.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(c),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){bi.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e)}).catch(function(c){i&&i(c),Vc.set(l,c),bi.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});bi.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}let po;class md{static getContext(){return po===void 0&&(po=new(window.AudioContext||window.webkitAudioContext)),po}static setContext(e){po=e}}class Tv extends Un{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new zi(this.manager);a.setResponseType("arraybuffer"),a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){try{const c=l.slice(0),u=md.getContext(),d=e+"#decode";s.manager.itemStart(d),u.decodeAudioData(c,function(h){t(h),s.manager.itemEnd(d)}).catch(function(h){o(h),s.manager.itemEnd(d)})}catch(c){o(c)}},n,i);function o(l){i?i(l):qe(l),s.manager.itemError(e)}}}const Eh=new it,Th=new it,_s=new it;class Av{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new rn,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new rn,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,_s.copy(e.projectionMatrix);const i=t.eyeSep/2,s=i*t.near/t.focus,a=t.near*Math.tan(Ps*t.fov*.5)/t.zoom;let o,l;Th.elements[12]=-i,Eh.elements[12]=i,o=-a*t.aspect+s,l=a*t.aspect+s,_s.elements[0]=2*t.near/(l-o),_s.elements[8]=(l+o)/(l-o),this.cameraL.projectionMatrix.copy(_s),o=-a*t.aspect-s,l=a*t.aspect-s,_s.elements[0]=2*t.near/(l-o),_s.elements[8]=(l+o)/(l-o),this.cameraR.projectionMatrix.copy(_s)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(Th),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(Eh)}}const ar=-90,or=1;class Jp extends Mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new rn(ar,or,e,t);i.layers=this.layers,this.add(i);const s=new rn(ar,or,e,t);s.layers=this.layers,this.add(s);const a=new rn(ar,or,e,t);a.layers=this.layers,this.add(a);const o=new rn(ar,or,e,t);o.layers=this.layers,this.add(o);const l=new rn(ar,or,e,t);l.layers=this.layers,this.add(l);const c=new rn(ar,or,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===zn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ns)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class jp extends rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Qp{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Cv.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Cv(){this._document.hidden===!1&&this.reset()}const xs=new I,Gc=new gn,Rv=new I,ys=new I,bs=new I;class Iv extends Mt{constructor(){super(),this.type="AudioListener",this.context=md.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new Qp}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e),this._timer.update();const t=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(xs,Gc,Rv),ys.set(0,0,-1).applyQuaternion(Gc),bs.set(0,1,0).applyQuaternion(Gc),t.positionX){const n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(xs.x,n),t.positionY.linearRampToValueAtTime(xs.y,n),t.positionZ.linearRampToValueAtTime(xs.z,n),t.forwardX.linearRampToValueAtTime(ys.x,n),t.forwardY.linearRampToValueAtTime(ys.y,n),t.forwardZ.linearRampToValueAtTime(ys.z,n),t.upX.linearRampToValueAtTime(bs.x,n),t.upY.linearRampToValueAtTime(bs.y,n),t.upZ.linearRampToValueAtTime(bs.z,n)}else t.setPosition(xs.x,xs.y,xs.z),t.setOrientation(ys.x,ys.y,ys.z,bs.x,bs.y,bs.z)}}class em extends Mt{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){Ce("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){Ce("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){Ce("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){Ce("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){Ce("Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(Ce("Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){Ce("Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}copy(e,t){return super.copy(e,t),e.sourceType!=="buffer"?(Ce("Audio: Audio source type cannot be copied."),this):(this.autoplay=e.autoplay,this.buffer=e.buffer,this.detune=e.detune,this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.offset=e.offset,this.duration=e.duration,this.playbackRate=e.playbackRate,this.hasPlaybackControl=e.hasPlaybackControl,this.sourceType=e.sourceType,this.filters=e.filters.slice(),this)}clone(e){return new this.constructor(this.listener).copy(this,e)}}const Ms=new I,Ah=new gn,Pv=new I,Ss=new I;class Lv extends em{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(Ms,Ah,Pv),Ss.set(0,0,1).applyQuaternion(Ah);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(Ms.x,n),t.positionY.linearRampToValueAtTime(Ms.y,n),t.positionZ.linearRampToValueAtTime(Ms.z,n),t.orientationX.linearRampToValueAtTime(Ss.x,n),t.orientationY.linearRampToValueAtTime(Ss.y,n),t.orientationZ.linearRampToValueAtTime(Ss.z,n)}else t.setPosition(Ms.x,Ms.y,Ms.z),t.setOrientation(Ss.x,Ss.y,Ss.z)}}class Dv{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}}class tm{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,a;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,a=i;s!==a;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){gn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const a=this._workIndex*s;gn.multiplyQuaternionsFlat(e,a,e,t,e,n),gn.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,s){const a=1-i;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,s){for(let a=0;a!==s;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const gd="\\[\\]\\.:\\/",Uv=new RegExp("["+gd+"]","g"),vd="[^"+gd+"]",Nv="[^"+gd.replace("\\.","")+"]",Fv=/((?:WC+[\/:])*)/.source.replace("WC",vd),Ov=/(WCOD+)?/.source.replace("WCOD",Nv),kv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",vd),Bv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",vd),zv=new RegExp("^"+Fv+Ov+kv+Bv+"$"),Vv=["material","materials","bones","map"];class Gv{constructor(e,t,n){const i=n||wt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class wt{constructor(e,t,n){this.path=t,this.parsedPath=n||wt.parseTrackName(t),this.node=wt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new wt.Composite(e,t,n):new wt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Uv,"")}static parseTrackName(e){const t=zv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Vv.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=wt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ce("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){qe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){qe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){qe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){qe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){qe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;qe("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}wt.Composite=Gv;wt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};wt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};wt.prototype.GetterByBindingType=[wt.prototype._getValue_direct,wt.prototype._getValue_array,wt.prototype._getValue_arrayElement,wt.prototype._getValue_toArray];wt.prototype.SetterByBindingTypeAndVersioning=[[wt.prototype._setValue_direct,wt.prototype._setValue_direct_setNeedsUpdate,wt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_array,wt.prototype._setValue_array_setNeedsUpdate,wt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_arrayElement,wt.prototype._setValue_arrayElement_setNeedsUpdate,wt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_fromArray,wt.prototype._setValue_fromArray_setNeedsUpdate,wt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Hv{constructor(){this.isAnimationObjectGroup=!0,this.uuid=Gn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,a=s.length;let o,l=e.length,c=this.nCachedObjects_;for(let u=0,d=arguments.length;u!==d;++u){const h=arguments[u],f=h.uuid;let p=t[f];if(p===void 0){p=l++,t[f]=p,e.push(h);for(let v=0,g=a;v!==g;++v)s[v].push(new wt(h,n[v],i[v]))}else if(p<c){o=e[p];const v=--c,g=e[v];t[g.uuid]=p,e[p]=g,t[f]=v,e[v]=h;for(let m=0,_=a;m!==_;++m){const x=s[m],y=x[v];let w=x[p];x[p]=y,w===void 0&&(w=new wt(h,n[m],i[m])),x[v]=w}}else e[p]!==o&&qe("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_;for(let a=0,o=arguments.length;a!==o;++a){const l=arguments[a],c=l.uuid,u=t[c];if(u!==void 0&&u>=s){const d=s++,h=e[d];t[h.uuid]=u,e[u]=h,t[c]=d,e[d]=l;for(let f=0,p=i;f!==p;++f){const v=n[f],g=v[d],m=v[u];v[u]=g,v[d]=m}}}this.nCachedObjects_=s}uncache(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_,a=e.length;for(let o=0,l=arguments.length;o!==l;++o){const c=arguments[o],u=c.uuid,d=t[u];if(d!==void 0)if(delete t[u],d<s){const h=--s,f=e[h],p=--a,v=e[p];t[f.uuid]=d,e[d]=f,t[v.uuid]=h,e[h]=v,e.pop();for(let g=0,m=i;g!==m;++g){const _=n[g],x=_[h],y=_[p];_[d]=x,_[h]=y,_.pop()}}else{const h=--a,f=e[h];h>0&&(t[f.uuid]=d),e[d]=f,e.pop();for(let p=0,v=i;p!==v;++p){const g=n[p];g[d]=g[h],g.pop()}}}this.nCachedObjects_=s}subscribe_(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const s=this._bindings;if(i!==void 0)return s[i];const a=this._paths,o=this._parsedPaths,l=this._objects,c=l.length,u=this.nCachedObjects_,d=new Array(c);i=s.length,n[e]=i,a.push(e),o.push(t),s.push(d);for(let h=u,f=l.length;h!==f;++h){const p=l[h];d[h]=new wt(p,e,t)}return d}unsubscribe_(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,s=this._parsedPaths,a=this._bindings,o=a.length-1,l=a[o],c=e[o];t[c]=n,a[n]=l,a.pop(),s[n]=s[o],s.pop(),i[n]=i[o],i.pop()}}}class nm{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,a=s.length,o=new Array(a),l={endingStart:As,endingEnd:As};for(let c=0;c!==a;++c){const u=s[c].createInterpolant(null);o[c]=u,u.settings&&Object.assign(l,u.settings),u.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=qf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,s=e._clip.duration,a=s/i,o=i/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Vu:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(a),c[u].accumulateAdditive(o);break;case Dl:default:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(a),c[u].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const a=n===Yf;if(e===0)return s===-1?i:a&&(s&1)===1?t-i:i;if(n===$f){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=s,this.time=i;if(a&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Cs,i.endingEnd=Cs):(e?i.endingStart=this.zeroSlopeAtStart?Cs:As:i.endingStart=ca,t?i.endingEnd=this.zeroSlopeAtEnd?Cs:As:i.endingEnd=ca)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}}const Wv=new Float32Array(1);class Xv extends oi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let u=c[l];u===void 0&&(u={},c[l]=u);for(let d=0;d!==s;++d){const h=i[d],f=h.name;let p=u[f];if(p!==void 0)++p.referenceCount,a[d]=p;else{if(p=a[d],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}const v=t&&t._propertyBindings[d].binding.parsedPath;p=new tm(wt.create(n,f,v),h.ValueTypeName,h.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),a[d]=p}o[d].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;const d=o.actionByRoot,h=(e._localRoot||this._root).uuid;delete d[h],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new cd(new Float32Array(2),new Float32Array(2),1,Wv),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let a=typeof e=="string"?ya.findByName(i,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Dl),l!==void 0){const d=l.actionByRoot[s];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const u=new nm(this,a,t,n);return this._bindAction(u,c),this._addInactiveAction(u,o,s),u}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?ya.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const u=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=u,t[u]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class $v extends Hu{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isRenderTarget3D=!0,this.depth=n,this.texture=new Ol(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class _d{constructor(e){this.value=e}clone(){return new _d(this.value.clone===void 0?this.value:this.value.clone())}}let qv=0;class Yv extends oi{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:qv++}),this.name="",this.usage=ha,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){const s=Array.isArray(t[n])?t[n]:[t[n]];for(let a=0;a<s.length;a++)this.uniforms.push(s[a].clone())}return this}clone(){return new this.constructor().copy(this)}}class Sl extends Vl{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class Zv{constructor(e,t,n,i,s,a=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=s,this.normalized=a,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}const Ch=new it;class Kv{constructor(e,t,n=0,i=1/0){this.ray=new wr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new kl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):qe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ch.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ch),this}intersectObject(e,t=!0,n=[]){return _u(e,this,n,t),n.sort(Rh),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)_u(e[i],this,n,t);return n.sort(Rh),n}}function Rh(r,e){return r.distance-e.distance}function _u(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let a=0,o=s.length;a<o;a++)_u(s[a],e,t,!0)}}class Jv{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Ce("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class jv{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=st(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(st(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Qv{constructor(e=1,t=0,n=0){this.radius=e,this.theta=t,this.y=n}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}}const Ed=class Ed{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};Ed.prototype.isMatrix2=!0;let xu=Ed;const Ih=new pe;class e_{constructor(e=new pe(1/0,1/0),t=new pe(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ih.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ih).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ph=new I,mo=new I,lr=new I,cr=new I,Hc=new I,t_=new I,n_=new I;class im{constructor(e=new I,t=new I){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Ph.subVectors(e,this.start),mo.subVectors(this.end,this.start);const n=mo.dot(mo);if(n===0)return 0;let s=mo.dot(Ph)/n;return t&&(s=st(s,0,1)),s}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=t_,n=n_){const i=10000000000000001e-32;let s,a;const o=this.start,l=e.start,c=this.end,u=e.end;lr.subVectors(c,o),cr.subVectors(u,l),Hc.subVectors(o,l);const d=lr.dot(lr),h=cr.dot(cr),f=cr.dot(Hc);if(d<=i&&h<=i)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(d<=i)s=0,a=f/h,a=st(a,0,1);else{const p=lr.dot(Hc);if(h<=i)a=0,s=st(-p/d,0,1);else{const v=lr.dot(cr),g=d*h-v*v;g!==0?s=st((v*f-p*h)/g,0,1):s=0,a=(v*s+f)/h,a<0?(a=0,s=st(-p/d,0,1)):a>1&&(a=1,s=st((v-p)/d,0,1))}}return t.copy(o).addScaledVector(lr,s),n.copy(l).addScaledVector(cr,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const Lh=new I;class i_ extends Mt{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new ot,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let a=0,o=1,l=32;a<l;a++,o++){const c=a/l*Math.PI*2,u=o/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(u),Math.sin(u),1)}n.setAttribute("position",new Ge(i,3));const s=new Tn({fog:!1,toneMapped:!1});this.cone=new Ai(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),Lh.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Lh),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const ji=new I,go=new it,Wc=new it;class s_ extends Ai{constructor(e){const t=sm(e),n=new ot,i=[],s=[];for(let c=0;c<t.length;c++){const u=t[c];u.parent&&u.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(0,0,0),s.push(0,0,0))}n.setAttribute("position",new Ge(i,3)),n.setAttribute("color",new Ge(s,3));const a=new Tn({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,a),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1;const o=new Ne(255),l=new Ne(65280);this.setColors(o,l)}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");Wc.copy(this.root.matrixWorld).invert();for(let s=0,a=0;s<t.length;s++){const o=t[s];o.parent&&o.parent.isBone&&(go.multiplyMatrices(Wc,o.matrixWorld),ji.setFromMatrixPosition(go),i.setXYZ(a,ji.x,ji.y,ji.z),go.multiplyMatrices(Wc,o.parent.matrixWorld),ji.setFromMatrixPosition(go),i.setXYZ(a+1,ji.x,ji.y,ji.z),a+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}setColors(e,t){const i=this.geometry.getAttribute("color");for(let s=0;s<i.count;s+=2)i.setXYZ(s,e.r,e.g,e.b),i.setXYZ(s+1,t.r,t.g,t.b);return i.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}function sm(r){const e=[];r.isBone===!0&&e.push(r);for(let t=0;t<r.children.length;t++)e.push(...sm(r.children[t]));return e}class r_ extends Rt{constructor(e,t,n){const i=new ni(t,4,2),s=new sn({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const a_=new I,Dh=new Ne,Uh=new Ne;class o_ extends Mt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new Tr(t);i.rotateY(Math.PI*.5),this.material=new sn({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const s=i.getAttribute("position"),a=new Float32Array(s.count*3);i.setAttribute("color",new Lt(a,3)),this.add(new Rt(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");Dh.copy(this.light.color),Uh.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){const s=n<i/2?Dh:Uh;t.setXYZ(n,s.r,s.g,s.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(a_.setFromMatrixPosition(this.light.matrixWorld).negate())}}class l_ extends Ai{constructor(e=10,t=10,n=4473924,i=8947848){n=new Ne(n),i=new Ne(i);const s=t/2,a=e/t,o=e/2,l=[],c=[];for(let h=0,f=0,p=-o;h<=t;h++,p+=a){l.push(-o,0,p,o,0,p),l.push(p,0,-o,p,0,o);const v=h===s?n:i;v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3}const u=new ot;u.setAttribute("position",new Ge(l,3)),u.setAttribute("color",new Ge(c,3));const d=new Tn({vertexColors:!0,toneMapped:!1});super(u,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class c_ extends Ai{constructor(e=10,t=16,n=8,i=64,s=4473924,a=8947848){s=new Ne(s),a=new Ne(a);const o=[],l=[];if(t>1)for(let d=0;d<t;d++){const h=d/t*(Math.PI*2),f=Math.sin(h)*e,p=Math.cos(h)*e;o.push(0,0,0),o.push(f,0,p);const v=d&1?s:a;l.push(v.r,v.g,v.b),l.push(v.r,v.g,v.b)}for(let d=0;d<n;d++){const h=d&1?s:a,f=e-e/n*d;for(let p=0;p<i;p++){let v=p/i*(Math.PI*2),g=Math.sin(v)*f,m=Math.cos(v)*f;o.push(g,0,m),l.push(h.r,h.g,h.b),v=(p+1)/i*(Math.PI*2),g=Math.sin(v)*f,m=Math.cos(v)*f,o.push(g,0,m),l.push(h.r,h.g,h.b)}}const c=new ot;c.setAttribute("position",new Ge(o,3)),c.setAttribute("color",new Ge(l,3));const u=new Tn({vertexColors:!0,toneMapped:!1});super(c,u),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Nh=new I,vo=new I,Fh=new I;class u_ extends Mt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new ot;i.setAttribute("position",new Ge([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const s=new Tn({fog:!1,toneMapped:!1});this.lightPlane=new os(i,s),this.add(this.lightPlane),i=new ot,i.setAttribute("position",new Ge([0,0,0,0,0,1],3)),this.targetLine=new os(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Nh.setFromMatrixPosition(this.light.matrixWorld),vo.setFromMatrixPosition(this.light.target.matrixWorld),Fh.subVectors(vo,Nh),this.lightPlane.lookAt(vo),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(vo),this.targetLine.scale.z=Fh.length()}}const _o=new I,Gt=new ic;class d_ extends Ai{constructor(e){const t=new ot,n=new Tn({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(p,v){l(p),l(v)}function l(p){i.push(0,0,0),s.push(0,0,0),a[p]===void 0&&(a[p]=[]),a[p].push(i.length/3-1)}t.setAttribute("position",new Ge(i,3)),t.setAttribute("color",new Ge(s,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();const c=new Ne(16755200),u=new Ne(16711680),d=new Ne(43775),h=new Ne(16777215),f=new Ne(3355443);this.setColors(c,u,d,h,f)}setColors(e,t,n,i,s){const o=this.geometry.getAttribute("color");return o.setXYZ(0,e.r,e.g,e.b),o.setXYZ(1,e.r,e.g,e.b),o.setXYZ(2,e.r,e.g,e.b),o.setXYZ(3,e.r,e.g,e.b),o.setXYZ(4,e.r,e.g,e.b),o.setXYZ(5,e.r,e.g,e.b),o.setXYZ(6,e.r,e.g,e.b),o.setXYZ(7,e.r,e.g,e.b),o.setXYZ(8,e.r,e.g,e.b),o.setXYZ(9,e.r,e.g,e.b),o.setXYZ(10,e.r,e.g,e.b),o.setXYZ(11,e.r,e.g,e.b),o.setXYZ(12,e.r,e.g,e.b),o.setXYZ(13,e.r,e.g,e.b),o.setXYZ(14,e.r,e.g,e.b),o.setXYZ(15,e.r,e.g,e.b),o.setXYZ(16,e.r,e.g,e.b),o.setXYZ(17,e.r,e.g,e.b),o.setXYZ(18,e.r,e.g,e.b),o.setXYZ(19,e.r,e.g,e.b),o.setXYZ(20,e.r,e.g,e.b),o.setXYZ(21,e.r,e.g,e.b),o.setXYZ(22,e.r,e.g,e.b),o.setXYZ(23,e.r,e.g,e.b),o.setXYZ(24,t.r,t.g,t.b),o.setXYZ(25,t.r,t.g,t.b),o.setXYZ(26,t.r,t.g,t.b),o.setXYZ(27,t.r,t.g,t.b),o.setXYZ(28,t.r,t.g,t.b),o.setXYZ(29,t.r,t.g,t.b),o.setXYZ(30,t.r,t.g,t.b),o.setXYZ(31,t.r,t.g,t.b),o.setXYZ(32,n.r,n.g,n.b),o.setXYZ(33,n.r,n.g,n.b),o.setXYZ(34,n.r,n.g,n.b),o.setXYZ(35,n.r,n.g,n.b),o.setXYZ(36,n.r,n.g,n.b),o.setXYZ(37,n.r,n.g,n.b),o.setXYZ(38,i.r,i.g,i.b),o.setXYZ(39,i.r,i.g,i.b),o.setXYZ(40,s.r,s.g,s.b),o.setXYZ(41,s.r,s.g,s.b),o.setXYZ(42,s.r,s.g,s.b),o.setXYZ(43,s.r,s.g,s.b),o.setXYZ(44,s.r,s.g,s.b),o.setXYZ(45,s.r,s.g,s.b),o.setXYZ(46,s.r,s.g,s.b),o.setXYZ(47,s.r,s.g,s.b),o.setXYZ(48,s.r,s.g,s.b),o.setXYZ(49,s.r,s.g,s.b),o.needsUpdate=!0,this}update(){const e=this.geometry,t=this.pointMap,n=1,i=1;let s,a;if(Gt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)s=1,a=0;else if(this.camera.coordinateSystem===zn)s=-1,a=1;else if(this.camera.coordinateSystem===Ns)s=0,a=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);$t("c",t,e,Gt,0,0,s),$t("t",t,e,Gt,0,0,a),$t("n1",t,e,Gt,-n,-i,s),$t("n2",t,e,Gt,n,-i,s),$t("n3",t,e,Gt,-n,i,s),$t("n4",t,e,Gt,n,i,s),$t("f1",t,e,Gt,-n,-i,a),$t("f2",t,e,Gt,n,-i,a),$t("f3",t,e,Gt,-n,i,a),$t("f4",t,e,Gt,n,i,a),$t("u1",t,e,Gt,n*.7,i*1.1,s),$t("u2",t,e,Gt,-n*.7,i*1.1,s),$t("u3",t,e,Gt,0,i*2,s),$t("cf1",t,e,Gt,-n,0,a),$t("cf2",t,e,Gt,n,0,a),$t("cf3",t,e,Gt,0,-i,a),$t("cf4",t,e,Gt,0,i,a),$t("cn1",t,e,Gt,-n,0,s),$t("cn2",t,e,Gt,n,0,s),$t("cn3",t,e,Gt,0,-i,s),$t("cn4",t,e,Gt,0,i,s),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function $t(r,e,t,n,i,s,a){_o.set(i,s,a).unproject(n);const o=e[r];if(o!==void 0){const l=t.getAttribute("position");for(let c=0,u=o.length;c<u;c++)l.setXYZ(o[c],_o.x,_o.y,_o.z)}}const xo=new Jt;class h_ extends Ai{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),s=new ot;s.setIndex(new Lt(n,1)),s.setAttribute("position",new Lt(i,3)),super(s,new Tn({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&xo.setFromObject(this.object),xo.isEmpty())return;const e=xo.min,t=xo.max,n=this.geometry.attributes.position,i=n.array;i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=e.x,i[4]=t.y,i[5]=t.z,i[6]=e.x,i[7]=e.y,i[8]=t.z,i[9]=t.x,i[10]=e.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=e.z,i[15]=e.x,i[16]=t.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=t.x,i[22]=e.y,i[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class f_ extends Ai{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new ot;s.setIndex(new Lt(n,1)),s.setAttribute("position",new Ge(i,3)),super(s,new Tn({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class p_ extends os{constructor(e,t=1,n=16776960){const i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],a=new ot;a.setAttribute("position",new Ge(s,3)),a.computeBoundingSphere(),super(a,new Tn({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const o=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new ot;l.setAttribute("position",new Ge(o,3)),l.computeBoundingSphere(),this.add(new Rt(l,new sn({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Oh=new I;let yo,Xc;class m_ extends Mt{constructor(e=new I(0,0,1),t=new I(0,0,0),n=1,i=16776960,s=n*.2,a=s*.2){super(),this.type="ArrowHelper",yo===void 0&&(yo=new ot,yo.setAttribute("position",new Ge([0,0,0,0,1,0],3)),Xc=new Bs(.5,1,5,1),Xc.translate(0,-.5,0)),this.position.copy(t),this.line=new os(yo,new Tn({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Rt(Xc,new sn({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,s,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Oh.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Oh,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class g_ extends Ai{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new ot;i.setAttribute("position",new Ge(t,3)),i.setAttribute("color",new Ge(n,3));const s=new Tn({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){const i=new Ne,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class v_{constructor(){this.type="ShapePath",this.color=new Ne,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new Ml,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,s,a){return this.currentPath.bezierCurveTo(e,t,n,i,s,a),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(m){const _=[];for(let x=0,y=m.length;x<y;x++){const w=m[x],M=new Ls;M.curves=w.curves,_.push(M)}return _}function n(m,_){const x=_.length;let y=!1;for(let w=x-1,M=0;M<x;w=M++){let C=_[w],b=_[M],E=b.x-C.x,P=b.y-C.y;if(Math.abs(P)>Number.EPSILON){if(P<0&&(C=_[M],E=-E,b=_[w],P=-P),m.y<C.y||m.y>b.y)continue;if(m.y===C.y){if(m.x===C.x)return!0}else{const D=P*(m.x-C.x)-E*(m.y-C.y);if(D===0)return!0;if(D<0)continue;y=!y}}else{if(m.y!==C.y)continue;if(b.x<=m.x&&m.x<=C.x||C.x<=m.x&&m.x<=b.x)return!0}}return y}const i=ii.isClockWise,s=this.subPaths;if(s.length===0)return[];let a,o,l;const c=[];if(s.length===1)return o=s[0],l=new Ls,l.curves=o.curves,c.push(l),c;let u=!i(s[0].getPoints());u=e?!u:u;const d=[],h=[];let f=[],p=0,v;h[p]=void 0,f[p]=[];for(let m=0,_=s.length;m<_;m++)o=s[m],v=o.getPoints(),a=i(v),a=e?!a:a,a?(!u&&h[p]&&p++,h[p]={s:new Ls,p:v},h[p].s.curves=o.curves,u&&p++,f[p]=[]):f[p].push({h:o,p:v[0]});if(!h[0])return t(s);if(h.length>1){let m=!1,_=0;for(let x=0,y=h.length;x<y;x++)d[x]=[];for(let x=0,y=h.length;x<y;x++){const w=f[x];for(let M=0;M<w.length;M++){const C=w[M];let b=!0;for(let E=0;E<h.length;E++)n(C.p,h[E].p)&&(x!==E&&_++,b?(b=!1,d[E].push(C)):m=!0);b&&d[x].push(C)}}_>0&&m===!1&&(f=d)}let g;for(let m=0,_=h.length;m<_;m++){l=h[m].s,c.push(l),g=f[m];for(let x=0,y=g.length;x<y;x++)l.holes.push(g[x].h)}return c}}class __ extends oi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ce("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function x_(r,e){const t=r.image&&r.image.width?r.image.width/r.image.height:1;return t>e?(r.repeat.x=1,r.repeat.y=t/e,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2):(r.repeat.x=e/t,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0),r}function y_(r,e){const t=r.image&&r.image.width?r.image.width/r.image.height:1;return t>e?(r.repeat.x=e/t,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0):(r.repeat.x=1,r.repeat.y=t/e,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2),r}function b_(r){return r.repeat.x=1,r.repeat.y=1,r.offset.x=0,r.offset.y=0,r}function yu(r,e,t,n){const i=M_(n);switch(t){case Bu:return r*e;case Il:return r*e/i.components*i.byteLength;case wa:return r*e/i.components*i.byteLength;case rs:return r*e*2/i.components*i.byteLength;case Pl:return r*e*2/i.components*i.byteLength;case zu:return r*e*3/i.components*i.byteLength;case Mn:return r*e*4/i.components*i.byteLength;case Ll:return r*e*4/i.components*i.byteLength;case Jr:case jr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Qr:case ea:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Vo:case Ho:return Math.max(r,16)*Math.max(e,8)/4;case zo:case Go:return Math.max(r,8)*Math.max(e,8)/2;case Wo:case Xo:case qo:case Yo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case $o:case aa:case Zo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ko:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Jo:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case jo:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Qo:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case el:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case tl:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case nl:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case il:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case sl:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case rl:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case al:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case ol:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case ll:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case cl:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case ul:case dl:case hl:return Math.ceil(r/4)*Math.ceil(e/4)*16;case fl:case pl:return Math.ceil(r/4)*Math.ceil(e/4)*8;case oa:case ml:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function M_(r){switch(r){case Pn:case Nu:return{byteLength:1,components:1};case vr:case Fu:case Ei:return{byteLength:2,components:1};case Cl:case Rl:return{byteLength:2,components:4};case qn:case Al:case bn:return{byteLength:4,components:1};case Ou:case ku:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}class S_{static contain(e,t){return x_(e,t)}static cover(e,t){return y_(e,t)}static fill(e){return b_(e)}static getByteLength(e,t,n,i){return yu(e,t,n,i)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:El}}));typeof window<"u"&&(window.__THREE__?Ce("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=El);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function rm(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function w_(r){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,h=r.createBuffer();r.bindBuffer(l,h),r.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,o),d.length===0)r.bufferSubData(c,0,u);else{d.sort((f,p)=>f.start-p.start);let h=0;for(let f=1;f<d.length;f++){const p=d[h],v=d[f];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++h,d[h]=v)}d.length=h+1;for(let f=0,p=d.length;f<p;f++){const v=d[f];r.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var E_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,T_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,A_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,C_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,R_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,I_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,P_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,L_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,D_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,U_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,N_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,F_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,O_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,k_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,B_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,z_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,V_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,G_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,H_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,W_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,X_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,$_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,q_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Y_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Z_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,K_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,J_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,j_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Q_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ex=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tx="gl_FragColor = linearToOutputTexel( gl_FragColor );",nx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ix=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,sx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,rx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ax=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ox=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,lx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ux=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,px=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,vx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,_x=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Sx=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,wx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ex=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Tx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ax=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Cx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ix=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Px=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Lx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Dx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ux=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Nx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ox=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Bx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Gx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Wx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Xx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$x=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Yx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Zx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Kx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ey=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,ty=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ny=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,iy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ry=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ay=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,oy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ly=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,cy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,uy=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,dy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hy=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,fy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,py=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,my=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_y=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,xy=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,yy=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,by=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,My=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,wy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ey=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ty=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ay=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ry=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Iy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Py=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ly=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Dy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Uy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Ny=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Oy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ky=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,By=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zy=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Wy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,$y=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,qy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ky=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jy=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,eb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ib=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ft={alphahash_fragment:E_,alphahash_pars_fragment:T_,alphamap_fragment:A_,alphamap_pars_fragment:C_,alphatest_fragment:R_,alphatest_pars_fragment:I_,aomap_fragment:P_,aomap_pars_fragment:L_,batching_pars_vertex:D_,batching_vertex:U_,begin_vertex:N_,beginnormal_vertex:F_,bsdfs:O_,iridescence_fragment:k_,bumpmap_pars_fragment:B_,clipping_planes_fragment:z_,clipping_planes_pars_fragment:V_,clipping_planes_pars_vertex:G_,clipping_planes_vertex:H_,color_fragment:W_,color_pars_fragment:X_,color_pars_vertex:$_,color_vertex:q_,common:Y_,cube_uv_reflection_fragment:Z_,defaultnormal_vertex:K_,displacementmap_pars_vertex:J_,displacementmap_vertex:j_,emissivemap_fragment:Q_,emissivemap_pars_fragment:ex,colorspace_fragment:tx,colorspace_pars_fragment:nx,envmap_fragment:ix,envmap_common_pars_fragment:sx,envmap_pars_fragment:rx,envmap_pars_vertex:ax,envmap_physical_pars_fragment:vx,envmap_vertex:ox,fog_vertex:lx,fog_pars_vertex:cx,fog_fragment:ux,fog_pars_fragment:dx,gradientmap_pars_fragment:hx,lightmap_pars_fragment:fx,lights_lambert_fragment:px,lights_lambert_pars_fragment:mx,lights_pars_begin:gx,lights_toon_fragment:_x,lights_toon_pars_fragment:xx,lights_phong_fragment:yx,lights_phong_pars_fragment:bx,lights_physical_fragment:Mx,lights_physical_pars_fragment:Sx,lights_fragment_begin:wx,lights_fragment_maps:Ex,lights_fragment_end:Tx,lightprobes_pars_fragment:Ax,logdepthbuf_fragment:Cx,logdepthbuf_pars_fragment:Rx,logdepthbuf_pars_vertex:Ix,logdepthbuf_vertex:Px,map_fragment:Lx,map_pars_fragment:Dx,map_particle_fragment:Ux,map_particle_pars_fragment:Nx,metalnessmap_fragment:Fx,metalnessmap_pars_fragment:Ox,morphinstance_vertex:kx,morphcolor_vertex:Bx,morphnormal_vertex:zx,morphtarget_pars_vertex:Vx,morphtarget_vertex:Gx,normal_fragment_begin:Hx,normal_fragment_maps:Wx,normal_pars_fragment:Xx,normal_pars_vertex:$x,normal_vertex:qx,normalmap_pars_fragment:Yx,clearcoat_normal_fragment_begin:Zx,clearcoat_normal_fragment_maps:Kx,clearcoat_pars_fragment:Jx,iridescence_pars_fragment:jx,opaque_fragment:Qx,packing:ey,premultiplied_alpha_fragment:ty,project_vertex:ny,dithering_fragment:iy,dithering_pars_fragment:sy,roughnessmap_fragment:ry,roughnessmap_pars_fragment:ay,shadowmap_pars_fragment:oy,shadowmap_pars_vertex:ly,shadowmap_vertex:cy,shadowmask_pars_fragment:uy,skinbase_vertex:dy,skinning_pars_vertex:hy,skinning_vertex:fy,skinnormal_vertex:py,specularmap_fragment:my,specularmap_pars_fragment:gy,tonemapping_fragment:vy,tonemapping_pars_fragment:_y,transmission_fragment:xy,transmission_pars_fragment:yy,uv_pars_fragment:by,uv_pars_vertex:My,uv_vertex:Sy,worldpos_vertex:wy,background_vert:Ey,background_frag:Ty,backgroundCube_vert:Ay,backgroundCube_frag:Cy,cube_vert:Ry,cube_frag:Iy,depth_vert:Py,depth_frag:Ly,distance_vert:Dy,distance_frag:Uy,equirect_vert:Ny,equirect_frag:Fy,linedashed_vert:Oy,linedashed_frag:ky,meshbasic_vert:By,meshbasic_frag:zy,meshlambert_vert:Vy,meshlambert_frag:Gy,meshmatcap_vert:Hy,meshmatcap_frag:Wy,meshnormal_vert:Xy,meshnormal_frag:$y,meshphong_vert:qy,meshphong_frag:Yy,meshphysical_vert:Zy,meshphysical_frag:Ky,meshtoon_vert:Jy,meshtoon_frag:jy,points_vert:Qy,points_frag:eb,shadow_vert:tb,shadow_frag:nb,sprite_vert:ib,sprite_frag:sb},Re={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new at}},envmap:{envMap:{value:null},envMapRotation:{value:new at},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new at}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new at}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new at},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new at},normalScale:{value:new pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new at},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new at}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new at}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new at}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0},uvTransform:{value:new at}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}}},xn={basic:{uniforms:_n([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:ft.meshbasic_vert,fragmentShader:ft.meshbasic_frag},lambert:{uniforms:_n([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Ne(0)},envMapIntensity:{value:1}}]),vertexShader:ft.meshlambert_vert,fragmentShader:ft.meshlambert_frag},phong:{uniforms:_n([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ft.meshphong_vert,fragmentShader:ft.meshphong_frag},standard:{uniforms:_n([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag},toon:{uniforms:_n([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new Ne(0)}}]),vertexShader:ft.meshtoon_vert,fragmentShader:ft.meshtoon_frag},matcap:{uniforms:_n([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:ft.meshmatcap_vert,fragmentShader:ft.meshmatcap_frag},points:{uniforms:_n([Re.points,Re.fog]),vertexShader:ft.points_vert,fragmentShader:ft.points_frag},dashed:{uniforms:_n([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ft.linedashed_vert,fragmentShader:ft.linedashed_frag},depth:{uniforms:_n([Re.common,Re.displacementmap]),vertexShader:ft.depth_vert,fragmentShader:ft.depth_frag},normal:{uniforms:_n([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:ft.meshnormal_vert,fragmentShader:ft.meshnormal_frag},sprite:{uniforms:_n([Re.sprite,Re.fog]),vertexShader:ft.sprite_vert,fragmentShader:ft.sprite_frag},background:{uniforms:{uvTransform:{value:new at},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ft.background_vert,fragmentShader:ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new at}},vertexShader:ft.backgroundCube_vert,fragmentShader:ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ft.cube_vert,fragmentShader:ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ft.equirect_vert,fragmentShader:ft.equirect_frag},distance:{uniforms:_n([Re.common,Re.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ft.distance_vert,fragmentShader:ft.distance_frag},shadow:{uniforms:_n([Re.lights,Re.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:ft.shadow_vert,fragmentShader:ft.shadow_frag}};xn.physical={uniforms:_n([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new at},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new at},clearcoatNormalScale:{value:new pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new at},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new at},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new at},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new at},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new at},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new at},transmissionSamplerSize:{value:new pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new at},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new at},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new at},anisotropyVector:{value:new pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new at}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag};const bo={r:0,b:0,g:0},rb=new it,am=new at;am.set(-1,0,0,0,1,0,0,0,1);function ab(r,e,t,n,i,s){const a=new Ne(0);let o=i===!0?0:1,l,c,u=null,d=0,h=null;function f(_){let x=_.isScene===!0?_.background:null;if(x&&x.isTexture){const y=_.backgroundBlurriness>0;x=e.get(x,y)}return x}function p(_){let x=!1;const y=f(_);y===null?g(a,o):y&&y.isColor&&(g(y,1),x=!0);const w=r.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||x)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function v(_,x){const y=f(x);y&&(y.isCubeTexture||y.mapping===Sr)?(c===void 0&&(c=new Rt(new cs(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:Mr(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:Sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,M,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(rb.makeRotationFromEuler(x.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(am),c.material.toneMapped=vt.getTransfer(y.colorSpace)!==Ct,(u!==y||d!==y.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,h=r.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Rt(new Ar(2,2),new Wn({name:"BackgroundMaterial",uniforms:Mr(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:ki,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=vt.getTransfer(y.colorSpace)!==Ct,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||h!==r.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,h=r.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function g(_,x){_.getRGB(bo,Rp(r)),t.buffers.color.setClear(bo.r,bo.g,bo.b,x,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,x=1){a.set(_),o=x,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,g(a,o)},render:p,addToRenderList:v,dispose:m}}function ob(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=h(null);let s=i,a=!1;function o(D,k,Q,ne,V){let $=!1;const q=d(D,ne,Q,k);s!==q&&(s=q,c(s.object)),$=f(D,ne,Q,V),$&&p(D,ne,Q,V),V!==null&&e.update(V,r.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,y(D,k,Q,ne),V!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return r.createVertexArray()}function c(D){return r.bindVertexArray(D)}function u(D){return r.deleteVertexArray(D)}function d(D,k,Q,ne){const V=ne.wireframe===!0;let $=n[k.id];$===void 0&&($={},n[k.id]=$);const q=D.isInstancedMesh===!0?D.id:0;let ce=$[q];ce===void 0&&(ce={},$[q]=ce);let ve=ce[Q.id];ve===void 0&&(ve={},ce[Q.id]=ve);let be=ve[V];return be===void 0&&(be=h(l()),ve[V]=be),be}function h(D){const k=[],Q=[],ne=[];for(let V=0;V<t;V++)k[V]=0,Q[V]=0,ne[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:Q,attributeDivisors:ne,object:D,attributes:{},index:null}}function f(D,k,Q,ne){const V=s.attributes,$=k.attributes;let q=0;const ce=Q.getAttributes();for(const ve in ce)if(ce[ve].location>=0){const Ae=V[ve];let Oe=$[ve];if(Oe===void 0&&(ve==="instanceMatrix"&&D.instanceMatrix&&(Oe=D.instanceMatrix),ve==="instanceColor"&&D.instanceColor&&(Oe=D.instanceColor)),Ae===void 0||Ae.attribute!==Oe||Oe&&Ae.data!==Oe.data)return!0;q++}return s.attributesNum!==q||s.index!==ne}function p(D,k,Q,ne){const V={},$=k.attributes;let q=0;const ce=Q.getAttributes();for(const ve in ce)if(ce[ve].location>=0){let Ae=$[ve];Ae===void 0&&(ve==="instanceMatrix"&&D.instanceMatrix&&(Ae=D.instanceMatrix),ve==="instanceColor"&&D.instanceColor&&(Ae=D.instanceColor));const Oe={};Oe.attribute=Ae,Ae&&Ae.data&&(Oe.data=Ae.data),V[ve]=Oe,q++}s.attributes=V,s.attributesNum=q,s.index=ne}function v(){const D=s.newAttributes;for(let k=0,Q=D.length;k<Q;k++)D[k]=0}function g(D){m(D,0)}function m(D,k){const Q=s.newAttributes,ne=s.enabledAttributes,V=s.attributeDivisors;Q[D]=1,ne[D]===0&&(r.enableVertexAttribArray(D),ne[D]=1),V[D]!==k&&(r.vertexAttribDivisor(D,k),V[D]=k)}function _(){const D=s.newAttributes,k=s.enabledAttributes;for(let Q=0,ne=k.length;Q<ne;Q++)k[Q]!==D[Q]&&(r.disableVertexAttribArray(Q),k[Q]=0)}function x(D,k,Q,ne,V,$,q){q===!0?r.vertexAttribIPointer(D,k,Q,V,$):r.vertexAttribPointer(D,k,Q,ne,V,$)}function y(D,k,Q,ne){v();const V=ne.attributes,$=Q.getAttributes(),q=k.defaultAttributeValues;for(const ce in $){const ve=$[ce];if(ve.location>=0){let be=V[ce];if(be===void 0&&(ce==="instanceMatrix"&&D.instanceMatrix&&(be=D.instanceMatrix),ce==="instanceColor"&&D.instanceColor&&(be=D.instanceColor)),be!==void 0){const Ae=be.normalized,Oe=be.itemSize,et=e.get(be);if(et===void 0)continue;const ht=et.buffer,tt=et.type,H=et.bytesPerElement,ae=tt===r.INT||tt===r.UNSIGNED_INT||be.gpuType===Al;if(be.isInterleavedBufferAttribute){const de=be.data,_e=de.stride,Z=be.offset;if(de.isInstancedInterleavedBuffer){for(let L=0;L<ve.locationSize;L++)m(ve.location+L,de.meshPerAttribute);D.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let L=0;L<ve.locationSize;L++)g(ve.location+L);r.bindBuffer(r.ARRAY_BUFFER,ht);for(let L=0;L<ve.locationSize;L++)x(ve.location+L,Oe/ve.locationSize,tt,Ae,_e*H,(Z+Oe/ve.locationSize*L)*H,ae)}else{if(be.isInstancedBufferAttribute){for(let de=0;de<ve.locationSize;de++)m(ve.location+de,be.meshPerAttribute);D.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=be.meshPerAttribute*be.count)}else for(let de=0;de<ve.locationSize;de++)g(ve.location+de);r.bindBuffer(r.ARRAY_BUFFER,ht);for(let de=0;de<ve.locationSize;de++)x(ve.location+de,Oe/ve.locationSize,tt,Ae,Oe*H,Oe/ve.locationSize*de*H,ae)}}else if(q!==void 0){const Ae=q[ce];if(Ae!==void 0)switch(Ae.length){case 2:r.vertexAttrib2fv(ve.location,Ae);break;case 3:r.vertexAttrib3fv(ve.location,Ae);break;case 4:r.vertexAttrib4fv(ve.location,Ae);break;default:r.vertexAttrib1fv(ve.location,Ae)}}}}_()}function w(){E();for(const D in n){const k=n[D];for(const Q in k){const ne=k[Q];for(const V in ne){const $=ne[V];for(const q in $)u($[q].object),delete $[q];delete ne[V]}}delete n[D]}}function M(D){if(n[D.id]===void 0)return;const k=n[D.id];for(const Q in k){const ne=k[Q];for(const V in ne){const $=ne[V];for(const q in $)u($[q].object),delete $[q];delete ne[V]}}delete n[D.id]}function C(D){for(const k in n){const Q=n[k];for(const ne in Q){const V=Q[ne];if(V[D.id]===void 0)continue;const $=V[D.id];for(const q in $)u($[q].object),delete $[q];delete V[D.id]}}}function b(D){for(const k in n){const Q=n[k],ne=D.isInstancedMesh===!0?D.id:0,V=Q[ne];if(V!==void 0){for(const $ in V){const q=V[$];for(const ce in q)u(q[ce].object),delete q[ce];delete V[$]}delete Q[ne],Object.keys(Q).length===0&&delete n[k]}}}function E(){P(),a=!0,s!==i&&(s=i,c(s.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:E,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:M,releaseStatesOfObject:b,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:g,disableUnusedAttributes:_}}function lb(r,e,t){let n;function i(l){n=l}function s(l,c){r.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(r.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let f=0;f<u;f++)h+=c[f];t.update(h,n,1)}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function cb(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==Mn&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const b=C===Ei&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Pn&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==bn&&!b)}function l(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ce("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Ce("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),_=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=r.getParameter(r.MAX_SAMPLES),M=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:_,maxVaryings:x,maxFragmentUniforms:y,maxSamples:w,samples:M}}function ub(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Qi,o=new at,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||n!==0||i;return i=h,n=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const p=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,m=r.get(d);if(!i||p===null||p.length===0||s&&!g)s?u(null):c();else{const _=s?0:n,x=_*4;let y=m.clippingState||null;l.value=y,y=u(p,h,x,f);for(let w=0;w!==x;++w)y[w]=t[w];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,p){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=l.value,p!==!0||g===null){const m=f+v*4,_=h.matrixWorldInverse;o.getNormalMatrix(_),(g===null||g.length<m)&&(g=new Float32Array(m));for(let x=0,y=f;x!==v;++x,y+=4)a.copy(d[x]).applyMatrix4(_,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}const is=4,kh=[.125,.215,.35,.446,.526,.582],Es=20,db=256,Gr=new Ra,Bh=new Ne;let $c=null,qc=0,Yc=0,Zc=!1;const hb=new I;class bu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:a=256,position:o=hb}=s;$c=this._renderer.getRenderTarget(),qc=this._renderer.getActiveCubeFace(),Yc=this._renderer.getActiveMipmapLevel(),Zc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget($c,qc,Yc),this._renderer.xr.enabled=Zc,e.scissorTest=!1,ur(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===wi||e.mapping===ss?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$c=this._renderer.getRenderTarget(),qc=this._renderer.getActiveCubeFace(),Yc=this._renderer.getActiveMipmapLevel(),Zc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ot,minFilter:Ot,generateMipmaps:!1,type:Ei,format:Mn,colorSpace:ua,depthBuffer:!1},i=zh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zh(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=fb(s)),this._blurMaterial=mb(s,e,t),this._ggxMaterial=pb(s,e,t)}return i}_compileMaterial(e){const t=new Rt(new ot,e);this._renderer.compile(t,Gr)}_sceneToCubeUV(e,t,n,i,s){const l=new rn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Bh),d.toneMapping=si,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Rt(new cs,new sn({name:"PMREM.Background",side:Sn,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let m=!1;const _=e.background;_?_.isColor&&(g.color.copy(_),e.background=null,m=!0):(g.color.copy(Bh),m=!0);for(let x=0;x<6;x++){const y=x%3;y===0?(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[x],s.y,s.z)):y===1?(l.up.set(0,0,c[x]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[x],s.z)):(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[x]));const w=this._cubeSize;ur(i,y*w,x>2?w:0,w,w),d.setRenderTarget(i),m&&d.render(v,l),d.render(e,l)}d.toneMapping=f,d.autoClear=h,e.background=_}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===wi||e.mapping===ss;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vh());const s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ur(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Gr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=0+c*1.25,f=d*h,{_lodMax:p}=this,v=this._sizeLods[n],g=3*v*(n>p-is?n-p+is:0),m=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,ur(s,g,m,3*v,2*v),i.setRenderTarget(s),i.render(o,Gr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-n,ur(e,g,m,3*v,2*v),i.setRenderTarget(e),i.render(o,Gr)}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&qe("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[i];d.material=c;const h=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Es-1),v=s/p,g=isFinite(s)?1+Math.floor(u*v):Es;g>Es&&Ce(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Es}`);const m=[];let _=0;for(let C=0;C<Es;++C){const b=C/v,E=Math.exp(-b*b/2);m.push(E),C===0?_+=E:C<g&&(_+=2*E)}for(let C=0;C<m.length;C++)m[C]=m[C]/_;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:x}=this;h.dTheta.value=p,h.mipInt.value=x-n;const y=this._sizeLods[i],w=3*y*(i>x-is?i-x+is:0),M=4*(this._cubeSize-y);ur(t,w,M,3*y,2*y),l.setRenderTarget(t),l.render(d,Gr)}}function fb(r){const e=[],t=[],n=[];let i=r;const s=r-is+1+kh.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>r-is?l=kh[a-r+is-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,p=6,v=3,g=2,m=1,_=new Float32Array(v*p*f),x=new Float32Array(g*p*f),y=new Float32Array(m*p*f);for(let M=0;M<f;M++){const C=M%3*2/3-1,b=M>2?0:-1,E=[C,b,0,C+2/3,b,0,C+2/3,b+1,0,C,b,0,C+2/3,b+1,0,C,b+1,0];_.set(E,v*p*M),x.set(h,g*p*M);const P=[M,M,M,M,M,M];y.set(P,m*p*M)}const w=new ot;w.setAttribute("position",new Lt(_,v)),w.setAttribute("uv",new Lt(x,g)),w.setAttribute("faceIndex",new Lt(y,m)),n.push(new Rt(w,null)),i>is&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function zh(r,e,t){const n=new Hn(r,e,t);return n.texture.mapping=Sr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ur(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function pb(r,e,t){return new Wn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:db,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:rc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function mb(r,e,t){const n=new Float32Array(Es),i=new I(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:Es,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:rc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Vh(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Gh(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function rc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class xd extends Hn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ea(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new cs(5,5,5),s=new Wn({name:"CubemapFromEquirect",uniforms:Mr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Sn,blending:Si});s.uniforms.tEquirect.value=t;const a=new Rt(i,s),o=t.minFilter;return t.minFilter===yi&&(t.minFilter=Ot),new Jp(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}function gb(r){let e=new WeakMap,t=new WeakMap,n=null;function i(h,f=!1){return h==null?null:f?a(h):s(h)}function s(h){if(h&&h.isTexture){const f=h.mapping;if(f===Yr||f===Zr)if(e.has(h)){const p=e.get(h).texture;return o(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const v=new xd(p.height);return v.fromEquirectangularTexture(r,h),e.set(h,v),h.addEventListener("dispose",c),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const f=h.mapping,p=f===Yr||f===Zr,v=f===wi||f===ss;if(p||v){let g=t.get(h);const m=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return n===null&&(n=new bu(r)),g=p?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{const _=h.image;return p&&_&&_.height>0||v&&_&&l(_)?(n===null&&(n=new bu(r)),g=p?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,f){return f===Yr?h.mapping=wi:f===Zr&&(h.mapping=ss),h}function l(h){let f=0;const p=6;for(let v=0;v<p;v++)h[v]!==void 0&&f++;return f===p}function c(h){const f=h.target;f.removeEventListener("dispose",c);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function u(h){const f=h.target;f.removeEventListener("dispose",u);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function vb(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&vl("WebGLRenderer: "+n+" extension not supported."),i}}}function _b(r,e,t,n){const i={},s=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const p in h.attributes)e.remove(h.attributes[p]);h.removeEventListener("dispose",a),delete i[h.id];const f=s.get(h);f&&(e.remove(f),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return i[h.id]===!0||(h.addEventListener("dispose",a),i[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const f in h)e.update(h[f],r.ARRAY_BUFFER)}function c(d){const h=[],f=d.index,p=d.attributes.position;let v=0;if(p===void 0)return;if(f!==null){const _=f.array;v=f.version;for(let x=0,y=_.length;x<y;x+=3){const w=_[x+0],M=_[x+1],C=_[x+2];h.push(w,M,M,C,C,w)}}else{const _=p.array;v=p.version;for(let x=0,y=_.length/3-1;x<y;x+=3){const w=x+0,M=x+1,C=x+2;h.push(w,M,M,C,C,w)}}const g=new(p.count>=65535?$u:Xu)(h,1);g.version=v;const m=s.get(d);m&&e.remove(m),s.set(d,g)}function u(d){const h=s.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function xb(r,e,t){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,h){r.drawElements(n,h,s,d*a),t.update(h,n,1)}function c(d,h,f){f!==0&&(r.drawElementsInstanced(n,h,s,d*a,f),t.update(h,n,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,d,0,f);let v=0;for(let g=0;g<f;g++)v+=h[g];t.update(v,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function yb(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:qe("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function bb(r,e,t){const n=new WeakMap,i=new bt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let E=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();const f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let x=0;f===!0&&(x=1),p===!0&&(x=2),v===!0&&(x=3);let y=o.attributes.position.count*x,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const M=new Float32Array(y*w*4*d),C=new Fl(M,y,w,d);C.type=bn,C.needsUpdate=!0;const b=x*4;for(let P=0;P<d;P++){const D=g[P],k=m[P],Q=_[P],ne=y*w*4*P;for(let V=0;V<D.count;V++){const $=V*b;f===!0&&(i.fromBufferAttribute(D,V),M[ne+$+0]=i.x,M[ne+$+1]=i.y,M[ne+$+2]=i.z,M[ne+$+3]=0),p===!0&&(i.fromBufferAttribute(k,V),M[ne+$+4]=i.x,M[ne+$+5]=i.y,M[ne+$+6]=i.z,M[ne+$+7]=0),v===!0&&(i.fromBufferAttribute(Q,V),M[ne+$+8]=i.x,M[ne+$+9]=i.y,M[ne+$+10]=i.z,M[ne+$+11]=Q.itemSize===4?i.w:1)}}h={count:d,texture:C,size:new pe(y,w)},n.set(o,h),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",p),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",h.size)}return{update:s}}function Mb(r,e,t,n,i){let s=new WeakMap;function a(c){const u=i.render.frame,d=c.geometry,h=e.get(c,d);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return h}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const Sb={[Au]:"LINEAR_TONE_MAPPING",[Cu]:"REINHARD_TONE_MAPPING",[Ru]:"CINEON_TONE_MAPPING",[Iu]:"ACES_FILMIC_TONE_MAPPING",[Lu]:"AGX_TONE_MAPPING",[Du]:"NEUTRAL_TONE_MAPPING",[Pu]:"CUSTOM_TONE_MAPPING"};function wb(r,e,t,n,i){const s=new Hn(e,t,{type:r,depthBuffer:n,stencilBuffer:i,depthTexture:n?new Fs(e,t):void 0}),a=new Hn(e,t,{type:Ei,depthBuffer:!1,stencilBuffer:!1}),o=new ot;o.setAttribute("position",new Ge([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Ge([0,2,0,0,2,0],2));const l=new sd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new Rt(o,l),u=new Ra(-1,1,1,-1,0,1);let d=null,h=null,f=!1,p,v=null,g=[],m=!1;this.setSize=function(_,x){s.setSize(_,x),a.setSize(_,x);for(let y=0;y<g.length;y++){const w=g[y];w.setSize&&w.setSize(_,x)}},this.setEffects=function(_){g=_,m=g.length>0&&g[0].isRenderPass===!0;const x=s.width,y=s.height;for(let w=0;w<g.length;w++){const M=g[w];M.setSize&&M.setSize(x,y)}},this.begin=function(_,x){if(f||_.toneMapping===si&&g.length===0)return!1;if(v=x,x!==null){const y=x.width,w=x.height;(s.width!==y||s.height!==w)&&this.setSize(y,w)}return m===!1&&_.setRenderTarget(s),p=_.toneMapping,_.toneMapping=si,!0},this.hasRenderPass=function(){return m},this.end=function(_,x){_.toneMapping=p,f=!0;let y=s,w=a;for(let M=0;M<g.length;M++){const C=g[M];if(C.enabled!==!1&&(C.render(_,w,y,x),C.needsSwap!==!1)){const b=y;y=w,w=b}}if(d!==_.outputColorSpace||h!==_.toneMapping){d=_.outputColorSpace,h=_.toneMapping,l.defines={},vt.getTransfer(d)===Ct&&(l.defines.SRGB_TRANSFER="");const M=Sb[h];M&&(l.defines[M]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,_.setRenderTarget(v),_.render(c,u),v=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const om=new zt,Mu=new Fs(1,1),lm=new Fl,cm=new Ol,um=new Ea,Hh=[],Wh=[],Xh=new Float32Array(16),$h=new Float32Array(9),qh=new Float32Array(4);function Rr(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Hh[i];if(s===void 0&&(s=new Float32Array(i),Hh[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Qt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function en(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function ac(r,e){let t=Wh[e];t===void 0&&(t=new Int32Array(e),Wh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Eb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Tb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;r.uniform2fv(this.addr,e),en(t,e)}}function Ab(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Qt(t,e))return;r.uniform3fv(this.addr,e),en(t,e)}}function Cb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;r.uniform4fv(this.addr,e),en(t,e)}}function Rb(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Qt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),en(t,e)}else{if(Qt(t,n))return;qh.set(n),r.uniformMatrix2fv(this.addr,!1,qh),en(t,n)}}function Ib(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Qt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),en(t,e)}else{if(Qt(t,n))return;$h.set(n),r.uniformMatrix3fv(this.addr,!1,$h),en(t,n)}}function Pb(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Qt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),en(t,e)}else{if(Qt(t,n))return;Xh.set(n),r.uniformMatrix4fv(this.addr,!1,Xh),en(t,n)}}function Lb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Db(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;r.uniform2iv(this.addr,e),en(t,e)}}function Ub(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Qt(t,e))return;r.uniform3iv(this.addr,e),en(t,e)}}function Nb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;r.uniform4iv(this.addr,e),en(t,e)}}function Fb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Ob(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;r.uniform2uiv(this.addr,e),en(t,e)}}function kb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Qt(t,e))return;r.uniform3uiv(this.addr,e),en(t,e)}}function Bb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;r.uniform4uiv(this.addr,e),en(t,e)}}function zb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Mu.compareFunction=t.isReversedDepthBuffer()?Nl:Ul,s=Mu):s=om,t.setTexture2D(e||s,i)}function Vb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||cm,i)}function Gb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||um,i)}function Hb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||lm,i)}function Wb(r){switch(r){case 5126:return Eb;case 35664:return Tb;case 35665:return Ab;case 35666:return Cb;case 35674:return Rb;case 35675:return Ib;case 35676:return Pb;case 5124:case 35670:return Lb;case 35667:case 35671:return Db;case 35668:case 35672:return Ub;case 35669:case 35673:return Nb;case 5125:return Fb;case 36294:return Ob;case 36295:return kb;case 36296:return Bb;case 35678:case 36198:case 36298:case 36306:case 35682:return zb;case 35679:case 36299:case 36307:return Vb;case 35680:case 36300:case 36308:case 36293:return Gb;case 36289:case 36303:case 36311:case 36292:return Hb}}function Xb(r,e){r.uniform1fv(this.addr,e)}function $b(r,e){const t=Rr(e,this.size,2);r.uniform2fv(this.addr,t)}function qb(r,e){const t=Rr(e,this.size,3);r.uniform3fv(this.addr,t)}function Yb(r,e){const t=Rr(e,this.size,4);r.uniform4fv(this.addr,t)}function Zb(r,e){const t=Rr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Kb(r,e){const t=Rr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Jb(r,e){const t=Rr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function jb(r,e){r.uniform1iv(this.addr,e)}function Qb(r,e){r.uniform2iv(this.addr,e)}function eM(r,e){r.uniform3iv(this.addr,e)}function tM(r,e){r.uniform4iv(this.addr,e)}function nM(r,e){r.uniform1uiv(this.addr,e)}function iM(r,e){r.uniform2uiv(this.addr,e)}function sM(r,e){r.uniform3uiv(this.addr,e)}function rM(r,e){r.uniform4uiv(this.addr,e)}function aM(r,e,t){const n=this.cache,i=e.length,s=ac(t,i);Qt(n,s)||(r.uniform1iv(this.addr,s),en(n,s));let a;this.type===r.SAMPLER_2D_SHADOW?a=Mu:a=om;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,s[o])}function oM(r,e,t){const n=this.cache,i=e.length,s=ac(t,i);Qt(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||cm,s[a])}function lM(r,e,t){const n=this.cache,i=e.length,s=ac(t,i);Qt(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||um,s[a])}function cM(r,e,t){const n=this.cache,i=e.length,s=ac(t,i);Qt(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||lm,s[a])}function uM(r){switch(r){case 5126:return Xb;case 35664:return $b;case 35665:return qb;case 35666:return Yb;case 35674:return Zb;case 35675:return Kb;case 35676:return Jb;case 5124:case 35670:return jb;case 35667:case 35671:return Qb;case 35668:case 35672:return eM;case 35669:case 35673:return tM;case 5125:return nM;case 36294:return iM;case 36295:return sM;case 36296:return rM;case 35678:case 36198:case 36298:case 36306:case 35682:return aM;case 35679:case 36299:case 36307:return oM;case 35680:case 36300:case 36308:case 36293:return lM;case 36289:case 36303:case 36311:case 36292:return cM}}class dM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Wb(t.type)}}class hM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=uM(t.type)}}class fM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const Kc=/(\w+)(\])?(\[|\.)?/g;function Yh(r,e){r.seq.push(e),r.map[e.id]=e}function pM(r,e,t){const n=r.name,i=n.length;for(Kc.lastIndex=0;;){const s=Kc.exec(n),a=Kc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Yh(t,c===void 0?new dM(o,r,e):new hM(o,r,e));break}else{let d=t.map[o];d===void 0&&(d=new fM(o),Yh(t,d)),t=d}}}class Ro{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);pM(o,l,this)}const i=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Zh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const mM=37297;let gM=0;function vM(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Kh=new at;function _M(r){vt._getMatrix(Kh,vt.workingColorSpace,r);const e=`mat3( ${Kh.elements.map(t=>t.toFixed(4))} )`;switch(vt.getTransfer(r)){case da:return[e,"LinearTransferOETF"];case Ct:return[e,"sRGBTransferOETF"];default:return Ce("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Jh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+vM(r.getShaderSource(e),o)}else return s}function xM(r,e){const t=_M(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const yM={[Au]:"Linear",[Cu]:"Reinhard",[Ru]:"Cineon",[Iu]:"ACESFilmic",[Lu]:"AgX",[Du]:"Neutral",[Pu]:"Custom"};function bM(r,e){const t=yM[e];return t===void 0?(Ce("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Mo=new I;function MM(){vt.getLuminanceCoefficients(Mo);const r=Mo.x.toFixed(4),e=Mo.y.toFixed(4),t=Mo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function SM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($r).join(`
`)}function wM(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function EM(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function $r(r){return r!==""}function jh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Qh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const TM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Su(r){return r.replace(TM,CM)}const AM=new Map;function CM(r,e){let t=ft[e];if(t===void 0){const n=AM.get(e);if(n!==void 0)t=ft[n],Ce('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Su(t)}const RM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ef(r){return r.replace(RM,IM)}function IM(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function tf(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const PM={[qr]:"SHADOWMAP_TYPE_PCF",[hr]:"SHADOWMAP_TYPE_VSM"};function LM(r){return PM[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const DM={[wi]:"ENVMAP_TYPE_CUBE",[ss]:"ENVMAP_TYPE_CUBE",[Sr]:"ENVMAP_TYPE_CUBE_UV"};function UM(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":DM[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const NM={[ss]:"ENVMAP_MODE_REFRACTION"};function FM(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":NM[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const OM={[Sa]:"ENVMAP_BLENDING_MULTIPLY",[Hf]:"ENVMAP_BLENDING_MIX",[Wf]:"ENVMAP_BLENDING_ADD"};function kM(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":OM[r.combine]||"ENVMAP_BLENDING_NONE"}function BM(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function zM(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=LM(t),c=UM(t),u=FM(t),d=kM(t),h=BM(t),f=SM(t),p=wM(s),v=i.createProgram();let g,m,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter($r).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter($r).join(`
`),m.length>0&&(m+=`
`)):(g=[tf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($r).join(`
`),m=[tf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==si?"#define TONE_MAPPING":"",t.toneMapping!==si?ft.tonemapping_pars_fragment:"",t.toneMapping!==si?bM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ft.colorspace_pars_fragment,xM("linearToOutputTexel",t.outputColorSpace),MM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($r).join(`
`)),a=Su(a),a=jh(a,t),a=Qh(a,t),o=Su(o),o=jh(o,t),o=Qh(o,t),a=ef(a),o=ef(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===hu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===hu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=_+g+a,y=_+m+o,w=Zh(i,i.VERTEX_SHADER,x),M=Zh(i,i.FRAGMENT_SHADER,y);i.attachShader(v,w),i.attachShader(v,M),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function C(D){if(r.debug.checkShaderErrors){const k=i.getProgramInfoLog(v)||"",Q=i.getShaderInfoLog(w)||"",ne=i.getShaderInfoLog(M)||"",V=k.trim(),$=Q.trim(),q=ne.trim();let ce=!0,ve=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(ce=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,w,M);else{const be=Jh(i,w,"vertex"),Ae=Jh(i,M,"fragment");qe("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+V+`
`+be+`
`+Ae)}else V!==""?Ce("WebGLProgram: Program Info Log:",V):($===""||q==="")&&(ve=!1);ve&&(D.diagnostics={runnable:ce,programLog:V,vertexShader:{log:$,prefix:g},fragmentShader:{log:q,prefix:m}})}i.deleteShader(w),i.deleteShader(M),b=new Ro(i,v),E=EM(i,v)}let b;this.getUniforms=function(){return b===void 0&&C(this),b};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(v,mM)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=gM++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=M,this}let VM=0;class GM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new HM(e),t.set(e,n)),n}}class HM{constructor(e){this.id=VM++,this.code=e,this.usedTimes=0}}function WM(r){return r===rs||r===aa||r===oa}function XM(r,e,t,n,i,s){const a=new kl,o=new GM,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer;let h=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(b){return l.add(b),b===0?"uv":`uv${b}`}function v(b,E,P,D,k,Q){const ne=D.fog,V=k.geometry,$=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?D.environment:null,q=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,ce=e.get(b.envMap||$,q),ve=ce&&ce.mapping===Sr?ce.image.height:null,be=f[b.type];b.precision!==null&&(h=n.getMaxPrecision(b.precision),h!==b.precision&&Ce("WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));const Ae=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Oe=Ae!==void 0?Ae.length:0;let et=0;V.morphAttributes.position!==void 0&&(et=1),V.morphAttributes.normal!==void 0&&(et=2),V.morphAttributes.color!==void 0&&(et=3);let ht,tt,H,ae;if(be){const ye=xn[be];ht=ye.vertexShader,tt=ye.fragmentShader}else ht=b.vertexShader,tt=b.fragmentShader,o.update(b),H=o.getVertexShaderID(b),ae=o.getFragmentShaderID(b);const de=r.getRenderTarget(),_e=r.state.buffers.depth.getReversed(),Z=k.isInstancedMesh===!0,L=k.isBatchedMesh===!0,F=!!b.map,B=!!b.matcap,K=!!ce,W=!!b.aoMap,se=!!b.lightMap,ue=!!b.bumpMap,me=!!b.normalMap,Xe=!!b.displacementMap,O=!!b.emissiveMap,nt=!!b.metalnessMap,ze=!!b.roughnessMap,Qe=b.anisotropy>0,xe=b.clearcoat>0,Et=b.dispersion>0,R=b.iridescence>0,S=b.sheen>0,J=b.transmission>0,oe=Qe&&!!b.anisotropyMap,ge=xe&&!!b.clearcoatMap,Me=xe&&!!b.clearcoatNormalMap,Ee=xe&&!!b.clearcoatRoughnessMap,re=R&&!!b.iridescenceMap,he=R&&!!b.iridescenceThicknessMap,De=S&&!!b.sheenColorMap,Ve=S&&!!b.sheenRoughnessMap,Te=!!b.specularMap,we=!!b.specularColorMap,rt=!!b.specularIntensityMap,lt=J&&!!b.transmissionMap,xt=J&&!!b.thicknessMap,z=!!b.gradientMap,Se=!!b.alphaMap,le=b.alphaTest>0,ke=!!b.alphaHash,U=!!b.extensions;let N=si;b.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(N=r.toneMapping);const j={shaderID:be,shaderType:b.type,shaderName:b.name,vertexShader:ht,fragmentShader:tt,defines:b.defines,customVertexShaderID:H,customFragmentShaderID:ae,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:L,batchingColor:L&&k._colorsTexture!==null,instancing:Z,instancingColor:Z&&k.instanceColor!==null,instancingMorph:Z&&k.morphTexture!==null,outputColorSpace:de===null?r.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:vt.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:F,matcap:B,envMap:K,envMapMode:K&&ce.mapping,envMapCubeUVHeight:ve,aoMap:W,lightMap:se,bumpMap:ue,normalMap:me,displacementMap:Xe,emissiveMap:O,normalMapObjectSpace:me&&b.normalMapType===Kf,normalMapTangentSpace:me&&b.normalMapType===Bi,packedNormalMap:me&&b.normalMapType===Bi&&WM(b.normalMap.format),metalnessMap:nt,roughnessMap:ze,anisotropy:Qe,anisotropyMap:oe,clearcoat:xe,clearcoatMap:ge,clearcoatNormalMap:Me,clearcoatRoughnessMap:Ee,dispersion:Et,iridescence:R,iridescenceMap:re,iridescenceThicknessMap:he,sheen:S,sheenColorMap:De,sheenRoughnessMap:Ve,specularMap:Te,specularColorMap:we,specularIntensityMap:rt,transmission:J,transmissionMap:lt,thicknessMap:xt,gradientMap:z,opaque:b.transparent===!1&&b.blending===Is&&b.alphaToCoverage===!1,alphaMap:Se,alphaTest:le,alphaHash:ke,combine:b.combine,mapUv:F&&p(b.map.channel),aoMapUv:W&&p(b.aoMap.channel),lightMapUv:se&&p(b.lightMap.channel),bumpMapUv:ue&&p(b.bumpMap.channel),normalMapUv:me&&p(b.normalMap.channel),displacementMapUv:Xe&&p(b.displacementMap.channel),emissiveMapUv:O&&p(b.emissiveMap.channel),metalnessMapUv:nt&&p(b.metalnessMap.channel),roughnessMapUv:ze&&p(b.roughnessMap.channel),anisotropyMapUv:oe&&p(b.anisotropyMap.channel),clearcoatMapUv:ge&&p(b.clearcoatMap.channel),clearcoatNormalMapUv:Me&&p(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&p(b.clearcoatRoughnessMap.channel),iridescenceMapUv:re&&p(b.iridescenceMap.channel),iridescenceThicknessMapUv:he&&p(b.iridescenceThicknessMap.channel),sheenColorMapUv:De&&p(b.sheenColorMap.channel),sheenRoughnessMapUv:Ve&&p(b.sheenRoughnessMap.channel),specularMapUv:Te&&p(b.specularMap.channel),specularColorMapUv:we&&p(b.specularColorMap.channel),specularIntensityMapUv:rt&&p(b.specularIntensityMap.channel),transmissionMapUv:lt&&p(b.transmissionMap.channel),thicknessMapUv:xt&&p(b.thicknessMap.channel),alphaMapUv:Se&&p(b.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(me||Qe),vertexNormals:!!V.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!V.attributes.uv&&(F||Se),fog:!!ne,useFog:b.fog===!0,fogExp2:!!ne&&ne.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||V.attributes.normal===void 0&&me===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:_e,skinning:k.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Oe,morphTextureStride:et,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:Q.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:N,decodeVideoTexture:F&&b.map.isVideoTexture===!0&&vt.getTransfer(b.map.colorSpace)===Ct,decodeVideoTextureEmissive:O&&b.emissiveMap.isVideoTexture===!0&&vt.getTransfer(b.emissiveMap.colorSpace)===Ct,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===_i,flipSided:b.side===Sn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:U&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(U&&b.extensions.multiDraw===!0||L)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return j.vertexUv1s=l.has(1),j.vertexUv2s=l.has(2),j.vertexUv3s=l.has(3),l.clear(),j}function g(b){const E=[];if(b.shaderID?E.push(b.shaderID):(E.push(b.customVertexShaderID),E.push(b.customFragmentShaderID)),b.defines!==void 0)for(const P in b.defines)E.push(P),E.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(m(E,b),_(E,b),E.push(r.outputColorSpace)),E.push(b.customProgramCacheKey),E.join()}function m(b,E){b.push(E.precision),b.push(E.outputColorSpace),b.push(E.envMapMode),b.push(E.envMapCubeUVHeight),b.push(E.mapUv),b.push(E.alphaMapUv),b.push(E.lightMapUv),b.push(E.aoMapUv),b.push(E.bumpMapUv),b.push(E.normalMapUv),b.push(E.displacementMapUv),b.push(E.emissiveMapUv),b.push(E.metalnessMapUv),b.push(E.roughnessMapUv),b.push(E.anisotropyMapUv),b.push(E.clearcoatMapUv),b.push(E.clearcoatNormalMapUv),b.push(E.clearcoatRoughnessMapUv),b.push(E.iridescenceMapUv),b.push(E.iridescenceThicknessMapUv),b.push(E.sheenColorMapUv),b.push(E.sheenRoughnessMapUv),b.push(E.specularMapUv),b.push(E.specularColorMapUv),b.push(E.specularIntensityMapUv),b.push(E.transmissionMapUv),b.push(E.thicknessMapUv),b.push(E.combine),b.push(E.fogExp2),b.push(E.sizeAttenuation),b.push(E.morphTargetsCount),b.push(E.morphAttributeCount),b.push(E.numDirLights),b.push(E.numPointLights),b.push(E.numSpotLights),b.push(E.numSpotLightMaps),b.push(E.numHemiLights),b.push(E.numRectAreaLights),b.push(E.numDirLightShadows),b.push(E.numPointLightShadows),b.push(E.numSpotLightShadows),b.push(E.numSpotLightShadowsWithMaps),b.push(E.numLightProbes),b.push(E.shadowMapType),b.push(E.toneMapping),b.push(E.numClippingPlanes),b.push(E.numClipIntersection),b.push(E.depthPacking)}function _(b,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),b.push(a.mask)}function x(b){const E=f[b.type];let P;if(E){const D=xn[E];P=nc.clone(D.uniforms)}else P=b.uniforms;return P}function y(b,E){let P=u.get(E);return P!==void 0?++P.usedTimes:(P=new zM(r,E,b,i),c.push(P),u.set(E,P)),P}function w(b){if(--b.usedTimes===0){const E=c.indexOf(b);c[E]=c[c.length-1],c.pop(),u.delete(b.cacheKey),b.destroy()}}function M(b){o.remove(b)}function C(){o.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:x,acquireProgram:y,releaseProgram:w,releaseShaderCache:M,programs:c,dispose:C}}function $M(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function qM(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function nf(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function sf(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,p,v,g,m){let _=r[e];return _===void 0?(_={id:h.id,object:h,geometry:f,material:p,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:g,group:m},r[e]=_):(_.id=h.id,_.object=h,_.geometry=f,_.material=p,_.materialVariant=a(h),_.groupOrder=v,_.renderOrder=h.renderOrder,_.z=g,_.group=m),e++,_}function l(h,f,p,v,g,m){const _=o(h,f,p,v,g,m);p.transmission>0?n.push(_):p.transparent===!0?i.push(_):t.push(_)}function c(h,f,p,v,g,m){const _=o(h,f,p,v,g,m);p.transmission>0?n.unshift(_):p.transparent===!0?i.unshift(_):t.unshift(_)}function u(h,f){t.length>1&&t.sort(h||qM),n.length>1&&n.sort(f||nf),i.length>1&&i.sort(f||nf)}function d(){for(let h=e,f=r.length;h<f;h++){const p=r[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:l,unshift:c,finish:d,sort:u}}function YM(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new sf,r.set(n,[a])):i>=s.length?(a=new sf,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function ZM(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Ne};break;case"SpotLight":t={position:new I,direction:new I,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new I,halfWidth:new I,halfHeight:new I};break}return r[e.id]=t,t}}}function KM(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let JM=0;function jM(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function QM(r){const e=new ZM,t=KM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const i=new I,s=new it,a=new it;function o(c){let u=0,d=0,h=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,p=0,v=0,g=0,m=0,_=0,x=0,y=0,w=0,M=0,C=0;c.sort(jM);for(let E=0,P=c.length;E<P;E++){const D=c[E],k=D.color,Q=D.intensity,ne=D.distance;let V=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===rs?V=D.shadow.map.texture:V=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=k.r*Q,d+=k.g*Q,h+=k.b*Q;else if(D.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(D.sh.coefficients[$],Q);C++}else if(D.isDirectionalLight){const $=e.get(D);if($.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const q=D.shadow,ce=t.get(D);ce.shadowIntensity=q.intensity,ce.shadowBias=q.bias,ce.shadowNormalBias=q.normalBias,ce.shadowRadius=q.radius,ce.shadowMapSize=q.mapSize,n.directionalShadow[f]=ce,n.directionalShadowMap[f]=V,n.directionalShadowMatrix[f]=D.shadow.matrix,_++}n.directional[f]=$,f++}else if(D.isSpotLight){const $=e.get(D);$.position.setFromMatrixPosition(D.matrixWorld),$.color.copy(k).multiplyScalar(Q),$.distance=ne,$.coneCos=Math.cos(D.angle),$.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),$.decay=D.decay,n.spot[v]=$;const q=D.shadow;if(D.map&&(n.spotLightMap[w]=D.map,w++,q.updateMatrices(D),D.castShadow&&M++),n.spotLightMatrix[v]=q.matrix,D.castShadow){const ce=t.get(D);ce.shadowIntensity=q.intensity,ce.shadowBias=q.bias,ce.shadowNormalBias=q.normalBias,ce.shadowRadius=q.radius,ce.shadowMapSize=q.mapSize,n.spotShadow[v]=ce,n.spotShadowMap[v]=V,y++}v++}else if(D.isRectAreaLight){const $=e.get(D);$.color.copy(k).multiplyScalar(Q),$.halfWidth.set(D.width*.5,0,0),$.halfHeight.set(0,D.height*.5,0),n.rectArea[g]=$,g++}else if(D.isPointLight){const $=e.get(D);if($.color.copy(D.color).multiplyScalar(D.intensity),$.distance=D.distance,$.decay=D.decay,D.castShadow){const q=D.shadow,ce=t.get(D);ce.shadowIntensity=q.intensity,ce.shadowBias=q.bias,ce.shadowNormalBias=q.normalBias,ce.shadowRadius=q.radius,ce.shadowMapSize=q.mapSize,ce.shadowCameraNear=q.camera.near,ce.shadowCameraFar=q.camera.far,n.pointShadow[p]=ce,n.pointShadowMap[p]=V,n.pointShadowMatrix[p]=D.shadow.matrix,x++}n.point[p]=$,p++}else if(D.isHemisphereLight){const $=e.get(D);$.skyColor.copy(D.color).multiplyScalar(Q),$.groundColor.copy(D.groundColor).multiplyScalar(Q),n.hemi[m]=$,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Re.LTC_FLOAT_1,n.rectAreaLTC2=Re.LTC_FLOAT_2):(n.rectAreaLTC1=Re.LTC_HALF_1,n.rectAreaLTC2=Re.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const b=n.hash;(b.directionalLength!==f||b.pointLength!==p||b.spotLength!==v||b.rectAreaLength!==g||b.hemiLength!==m||b.numDirectionalShadows!==_||b.numPointShadows!==x||b.numSpotShadows!==y||b.numSpotMaps!==w||b.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=y+w-M,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=C,b.directionalLength=f,b.pointLength=p,b.spotLength=v,b.rectAreaLength=g,b.hemiLength=m,b.numDirectionalShadows=_,b.numPointShadows=x,b.numSpotShadows=y,b.numSpotMaps=w,b.numLightProbes=C,n.version=JM++)}function l(c,u){let d=0,h=0,f=0,p=0,v=0;const g=u.matrixWorldInverse;for(let m=0,_=c.length;m<_;m++){const x=c[m];if(x.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),d++}else if(x.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(x.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),a.identity(),s.copy(x.matrixWorld),s.premultiply(g),a.extractRotation(s),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),p++}else if(x.isPointLight){const y=n.point[h];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),h++}else if(x.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function rf(r){const e=new QM(r),t=[],n=[],i=[];function s(h){d.camera=h,t.length=0,n.length=0,i.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function l(h){i.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function eS(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new rf(r),e.set(i,[o])):s>=a.length?(o=new rf(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const tS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,iS=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],sS=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],af=new it,Hr=new I,Jc=new I;function rS(r,e,t){let n=new Er;const i=new pe,s=new pe,a=new bt,o=new ad,l=new od,c={},u=t.maxTextureSize,d={[ki]:Sn,[Sn]:ki,[_i]:_i},h=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pe},radius:{value:4}},vertexShader:tS,fragmentShader:nS}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const p=new ot;p.setAttribute("position",new Lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Rt(p,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qr;let m=this.type;this.render=function(M,C,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||M.length===0)return;this.type===wf&&(Ce("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=qr);const E=r.getRenderTarget(),P=r.getActiveCubeFace(),D=r.getActiveMipmapLevel(),k=r.state;k.setBlending(Si),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const Q=m!==this.type;Q&&C.traverse(function(ne){ne.material&&(Array.isArray(ne.material)?ne.material.forEach(V=>V.needsUpdate=!0):ne.material.needsUpdate=!0)});for(let ne=0,V=M.length;ne<V;ne++){const $=M[ne],q=$.shadow;if(q===void 0){Ce("WebGLShadowMap:",$,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;i.copy(q.mapSize);const ce=q.getFrameExtents();i.multiply(ce),s.copy(q.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/ce.x),i.x=s.x*ce.x,q.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/ce.y),i.y=s.y*ce.y,q.mapSize.y=s.y));const ve=r.state.buffers.depth.getReversed();if(q.camera._reversedDepth=ve,q.map===null||Q===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===hr){if($.isPointLight){Ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new Hn(i.x,i.y,{format:rs,type:Ei,minFilter:Ot,magFilter:Ot,generateMipmaps:!1}),q.map.texture.name=$.name+".shadowMap",q.map.depthTexture=new Fs(i.x,i.y,bn),q.map.depthTexture.name=$.name+".shadowMapDepth",q.map.depthTexture.format=Ti,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Zt,q.map.depthTexture.magFilter=Zt}else $.isPointLight?(q.map=new xd(i.x),q.map.depthTexture=new vp(i.x,qn)):(q.map=new Hn(i.x,i.y),q.map.depthTexture=new Fs(i.x,i.y,qn)),q.map.depthTexture.name=$.name+".shadowMap",q.map.depthTexture.format=Ti,this.type===qr?(q.map.depthTexture.compareFunction=ve?Nl:Ul,q.map.depthTexture.minFilter=Ot,q.map.depthTexture.magFilter=Ot):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Zt,q.map.depthTexture.magFilter=Zt);q.camera.updateProjectionMatrix()}const be=q.map.isWebGLCubeRenderTarget?6:1;for(let Ae=0;Ae<be;Ae++){if(q.map.isWebGLCubeRenderTarget)r.setRenderTarget(q.map,Ae),r.clear();else{Ae===0&&(r.setRenderTarget(q.map),r.clear());const Oe=q.getViewport(Ae);a.set(s.x*Oe.x,s.y*Oe.y,s.x*Oe.z,s.y*Oe.w),k.viewport(a)}if($.isPointLight){const Oe=q.camera,et=q.matrix,ht=$.distance||Oe.far;ht!==Oe.far&&(Oe.far=ht,Oe.updateProjectionMatrix()),Hr.setFromMatrixPosition($.matrixWorld),Oe.position.copy(Hr),Jc.copy(Oe.position),Jc.add(iS[Ae]),Oe.up.copy(sS[Ae]),Oe.lookAt(Jc),Oe.updateMatrixWorld(),et.makeTranslation(-Hr.x,-Hr.y,-Hr.z),af.multiplyMatrices(Oe.projectionMatrix,Oe.matrixWorldInverse),q._frustum.setFromProjectionMatrix(af,Oe.coordinateSystem,Oe.reversedDepth)}else q.updateMatrices($);n=q.getFrustum(),y(C,b,q.camera,$,this.type)}q.isPointLightShadow!==!0&&this.type===hr&&_(q,b),q.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(E,P,D)};function _(M,C){const b=e.update(v);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Hn(i.x,i.y,{format:rs,type:Ei})),h.uniforms.shadow_pass.value=M.map.depthTexture,h.uniforms.resolution.value=M.mapSize,h.uniforms.radius.value=M.radius,r.setRenderTarget(M.mapPass),r.clear(),r.renderBufferDirect(C,null,b,h,v,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,r.setRenderTarget(M.map),r.clear(),r.renderBufferDirect(C,null,b,f,v,null)}function x(M,C,b,E){let P=null;const D=b.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(D!==void 0)P=D;else if(P=b.isPointLight===!0?l:o,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const k=P.uuid,Q=C.uuid;let ne=c[k];ne===void 0&&(ne={},c[k]=ne);let V=ne[Q];V===void 0&&(V=P.clone(),ne[Q]=V,C.addEventListener("dispose",w)),P=V}if(P.visible=C.visible,P.wireframe=C.wireframe,E===hr?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:d[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,b.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const k=r.properties.get(P);k.light=b}return P}function y(M,C,b,E,P){if(M.visible===!1)return;if(M.layers.test(C.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&P===hr)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,M.matrixWorld);const Q=e.update(M),ne=M.material;if(Array.isArray(ne)){const V=Q.groups;for(let $=0,q=V.length;$<q;$++){const ce=V[$],ve=ne[ce.materialIndex];if(ve&&ve.visible){const be=x(M,ve,E,P);M.onBeforeShadow(r,M,C,b,Q,be,ce),r.renderBufferDirect(b,null,Q,be,M,ce),M.onAfterShadow(r,M,C,b,Q,be,ce)}}}else if(ne.visible){const V=x(M,ne,E,P);M.onBeforeShadow(r,M,C,b,Q,V,null),r.renderBufferDirect(b,null,Q,V,M,null),M.onAfterShadow(r,M,C,b,Q,V,null)}}const k=M.children;for(let Q=0,ne=k.length;Q<ne;Q++)y(k[Q],C,b,E,P)}function w(M){M.target.removeEventListener("dispose",w);for(const b in c){const E=c[b],P=M.target.uuid;P in E&&(E[P].dispose(),delete E[P])}}}function aS(r,e){function t(){let z=!1;const Se=new bt;let le=null;const ke=new bt(0,0,0,0);return{setMask:function(U){le!==U&&!z&&(r.colorMask(U,U,U,U),le=U)},setLocked:function(U){z=U},setClear:function(U,N,j,ye,Be){Be===!0&&(U*=ye,N*=ye,j*=ye),Se.set(U,N,j,ye),ke.equals(Se)===!1&&(r.clearColor(U,N,j,ye),ke.copy(Se))},reset:function(){z=!1,le=null,ke.set(-1,0,0,0)}}}function n(){let z=!1,Se=!1,le=null,ke=null,U=null;return{setReversed:function(N){if(Se!==N){const j=e.get("EXT_clip_control");N?j.clipControlEXT(j.LOWER_LEFT_EXT,j.ZERO_TO_ONE_EXT):j.clipControlEXT(j.LOWER_LEFT_EXT,j.NEGATIVE_ONE_TO_ONE_EXT),Se=N;const ye=U;U=null,this.setClear(ye)}},getReversed:function(){return Se},setTest:function(N){N?de(r.DEPTH_TEST):_e(r.DEPTH_TEST)},setMask:function(N){le!==N&&!z&&(r.depthMask(N),le=N)},setFunc:function(N){if(Se&&(N=Eg[N]),ke!==N){switch(N){case Do:r.depthFunc(r.NEVER);break;case Uo:r.depthFunc(r.ALWAYS);break;case No:r.depthFunc(r.LESS);break;case Us:r.depthFunc(r.LEQUAL);break;case Fo:r.depthFunc(r.EQUAL);break;case Oo:r.depthFunc(r.GEQUAL);break;case ko:r.depthFunc(r.GREATER);break;case Bo:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ke=N}},setLocked:function(N){z=N},setClear:function(N){U!==N&&(U=N,Se&&(N=1-N),r.clearDepth(N))},reset:function(){z=!1,le=null,ke=null,U=null,Se=!1}}}function i(){let z=!1,Se=null,le=null,ke=null,U=null,N=null,j=null,ye=null,Be=null;return{setTest:function(Le){z||(Le?de(r.STENCIL_TEST):_e(r.STENCIL_TEST))},setMask:function(Le){Se!==Le&&!z&&(r.stencilMask(Le),Se=Le)},setFunc:function(Le,pt,_t){(le!==Le||ke!==pt||U!==_t)&&(r.stencilFunc(Le,pt,_t),le=Le,ke=pt,U=_t)},setOp:function(Le,pt,_t){(N!==Le||j!==pt||ye!==_t)&&(r.stencilOp(Le,pt,_t),N=Le,j=pt,ye=_t)},setLocked:function(Le){z=Le},setClear:function(Le){Be!==Le&&(r.clearStencil(Le),Be=Le)},reset:function(){z=!1,Se=null,le=null,ke=null,U=null,N=null,j=null,ye=null,Be=null}}}const s=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let u={},d={},h={},f=new WeakMap,p=[],v=null,g=!1,m=null,_=null,x=null,y=null,w=null,M=null,C=null,b=new Ne(0,0,0),E=0,P=!1,D=null,k=null,Q=null,ne=null,V=null;const $=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,ce=0;const ve=r.getParameter(r.VERSION);ve.indexOf("WebGL")!==-1?(ce=parseFloat(/^WebGL (\d)/.exec(ve)[1]),q=ce>=1):ve.indexOf("OpenGL ES")!==-1&&(ce=parseFloat(/^OpenGL ES (\d)/.exec(ve)[1]),q=ce>=2);let be=null,Ae={};const Oe=r.getParameter(r.SCISSOR_BOX),et=r.getParameter(r.VIEWPORT),ht=new bt().fromArray(Oe),tt=new bt().fromArray(et);function H(z,Se,le,ke){const U=new Uint8Array(4),N=r.createTexture();r.bindTexture(z,N),r.texParameteri(z,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(z,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let j=0;j<le;j++)z===r.TEXTURE_3D||z===r.TEXTURE_2D_ARRAY?r.texImage3D(Se,0,r.RGBA,1,1,ke,0,r.RGBA,r.UNSIGNED_BYTE,U):r.texImage2D(Se+j,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,U);return N}const ae={};ae[r.TEXTURE_2D]=H(r.TEXTURE_2D,r.TEXTURE_2D,1),ae[r.TEXTURE_CUBE_MAP]=H(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[r.TEXTURE_2D_ARRAY]=H(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ae[r.TEXTURE_3D]=H(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),de(r.DEPTH_TEST),a.setFunc(Us),ue(!1),me(ru),de(r.CULL_FACE),W(Si);function de(z){u[z]!==!0&&(r.enable(z),u[z]=!0)}function _e(z){u[z]!==!1&&(r.disable(z),u[z]=!1)}function Z(z,Se){return h[z]!==Se?(r.bindFramebuffer(z,Se),h[z]=Se,z===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=Se),z===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=Se),!0):!1}function L(z,Se){let le=p,ke=!1;if(z){le=f.get(Se),le===void 0&&(le=[],f.set(Se,le));const U=z.textures;if(le.length!==U.length||le[0]!==r.COLOR_ATTACHMENT0){for(let N=0,j=U.length;N<j;N++)le[N]=r.COLOR_ATTACHMENT0+N;le.length=U.length,ke=!0}}else le[0]!==r.BACK&&(le[0]=r.BACK,ke=!0);ke&&r.drawBuffers(le)}function F(z){return v!==z?(r.useProgram(z),v=z,!0):!1}const B={[es]:r.FUNC_ADD,[Tf]:r.FUNC_SUBTRACT,[Af]:r.FUNC_REVERSE_SUBTRACT};B[Cf]=r.MIN,B[Rf]=r.MAX;const K={[If]:r.ZERO,[Pf]:r.ONE,[Lf]:r.SRC_COLOR,[Po]:r.SRC_ALPHA,[kf]:r.SRC_ALPHA_SATURATE,[Ff]:r.DST_COLOR,[Uf]:r.DST_ALPHA,[Df]:r.ONE_MINUS_SRC_COLOR,[Lo]:r.ONE_MINUS_SRC_ALPHA,[Of]:r.ONE_MINUS_DST_COLOR,[Nf]:r.ONE_MINUS_DST_ALPHA,[Bf]:r.CONSTANT_COLOR,[zf]:r.ONE_MINUS_CONSTANT_COLOR,[Vf]:r.CONSTANT_ALPHA,[Gf]:r.ONE_MINUS_CONSTANT_ALPHA};function W(z,Se,le,ke,U,N,j,ye,Be,Le){if(z===Si){g===!0&&(_e(r.BLEND),g=!1);return}if(g===!1&&(de(r.BLEND),g=!0),z!==Ef){if(z!==m||Le!==P){if((_!==es||w!==es)&&(r.blendEquation(r.FUNC_ADD),_=es,w=es),Le)switch(z){case Is:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case au:r.blendFunc(r.ONE,r.ONE);break;case ou:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case lu:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:qe("WebGLState: Invalid blending: ",z);break}else switch(z){case Is:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case au:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case ou:qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case lu:qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qe("WebGLState: Invalid blending: ",z);break}x=null,y=null,M=null,C=null,b.set(0,0,0),E=0,m=z,P=Le}return}U=U||Se,N=N||le,j=j||ke,(Se!==_||U!==w)&&(r.blendEquationSeparate(B[Se],B[U]),_=Se,w=U),(le!==x||ke!==y||N!==M||j!==C)&&(r.blendFuncSeparate(K[le],K[ke],K[N],K[j]),x=le,y=ke,M=N,C=j),(ye.equals(b)===!1||Be!==E)&&(r.blendColor(ye.r,ye.g,ye.b,Be),b.copy(ye),E=Be),m=z,P=!1}function se(z,Se){z.side===_i?_e(r.CULL_FACE):de(r.CULL_FACE);let le=z.side===Sn;Se&&(le=!le),ue(le),z.blending===Is&&z.transparent===!1?W(Si):W(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),s.setMask(z.colorWrite);const ke=z.stencilWrite;o.setTest(ke),ke&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),O(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?de(r.SAMPLE_ALPHA_TO_COVERAGE):_e(r.SAMPLE_ALPHA_TO_COVERAGE)}function ue(z){D!==z&&(z?r.frontFace(r.CW):r.frontFace(r.CCW),D=z)}function me(z){z!==Mf?(de(r.CULL_FACE),z!==k&&(z===ru?r.cullFace(r.BACK):z===Sf?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):_e(r.CULL_FACE),k=z}function Xe(z){z!==Q&&(q&&r.lineWidth(z),Q=z)}function O(z,Se,le){z?(de(r.POLYGON_OFFSET_FILL),(ne!==Se||V!==le)&&(ne=Se,V=le,a.getReversed()&&(Se=-Se),r.polygonOffset(Se,le))):_e(r.POLYGON_OFFSET_FILL)}function nt(z){z?de(r.SCISSOR_TEST):_e(r.SCISSOR_TEST)}function ze(z){z===void 0&&(z=r.TEXTURE0+$-1),be!==z&&(r.activeTexture(z),be=z)}function Qe(z,Se,le){le===void 0&&(be===null?le=r.TEXTURE0+$-1:le=be);let ke=Ae[le];ke===void 0&&(ke={type:void 0,texture:void 0},Ae[le]=ke),(ke.type!==z||ke.texture!==Se)&&(be!==le&&(r.activeTexture(le),be=le),r.bindTexture(z,Se||ae[z]),ke.type=z,ke.texture=Se)}function xe(){const z=Ae[be];z!==void 0&&z.type!==void 0&&(r.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function Et(){try{r.compressedTexImage2D(...arguments)}catch(z){qe("WebGLState:",z)}}function R(){try{r.compressedTexImage3D(...arguments)}catch(z){qe("WebGLState:",z)}}function S(){try{r.texSubImage2D(...arguments)}catch(z){qe("WebGLState:",z)}}function J(){try{r.texSubImage3D(...arguments)}catch(z){qe("WebGLState:",z)}}function oe(){try{r.compressedTexSubImage2D(...arguments)}catch(z){qe("WebGLState:",z)}}function ge(){try{r.compressedTexSubImage3D(...arguments)}catch(z){qe("WebGLState:",z)}}function Me(){try{r.texStorage2D(...arguments)}catch(z){qe("WebGLState:",z)}}function Ee(){try{r.texStorage3D(...arguments)}catch(z){qe("WebGLState:",z)}}function re(){try{r.texImage2D(...arguments)}catch(z){qe("WebGLState:",z)}}function he(){try{r.texImage3D(...arguments)}catch(z){qe("WebGLState:",z)}}function De(z){return d[z]!==void 0?d[z]:r.getParameter(z)}function Ve(z,Se){d[z]!==Se&&(r.pixelStorei(z,Se),d[z]=Se)}function Te(z){ht.equals(z)===!1&&(r.scissor(z.x,z.y,z.z,z.w),ht.copy(z))}function we(z){tt.equals(z)===!1&&(r.viewport(z.x,z.y,z.z,z.w),tt.copy(z))}function rt(z,Se){let le=c.get(Se);le===void 0&&(le=new WeakMap,c.set(Se,le));let ke=le.get(z);ke===void 0&&(ke=r.getUniformBlockIndex(Se,z.name),le.set(z,ke))}function lt(z,Se){const ke=c.get(Se).get(z);l.get(Se)!==ke&&(r.uniformBlockBinding(Se,ke,z.__bindingPointIndex),l.set(Se,ke))}function xt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),u={},d={},be=null,Ae={},h={},f=new WeakMap,p=[],v=null,g=!1,m=null,_=null,x=null,y=null,w=null,M=null,C=null,b=new Ne(0,0,0),E=0,P=!1,D=null,k=null,Q=null,ne=null,V=null,ht.set(0,0,r.canvas.width,r.canvas.height),tt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:de,disable:_e,bindFramebuffer:Z,drawBuffers:L,useProgram:F,setBlending:W,setMaterial:se,setFlipSided:ue,setCullFace:me,setLineWidth:Xe,setPolygonOffset:O,setScissorTest:nt,activeTexture:ze,bindTexture:Qe,unbindTexture:xe,compressedTexImage2D:Et,compressedTexImage3D:R,texImage2D:re,texImage3D:he,pixelStorei:Ve,getParameter:De,updateUBOMapping:rt,uniformBlockBinding:lt,texStorage2D:Me,texStorage3D:Ee,texSubImage2D:S,texSubImage3D:J,compressedTexSubImage2D:oe,compressedTexSubImage3D:ge,scissor:Te,viewport:we,reset:xt}}function oS(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new pe,u=new WeakMap,d=new Set;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,S){return p?new OffscreenCanvas(R,S):fa("canvas")}function g(R,S,J){let oe=1;const ge=Et(R);if((ge.width>J||ge.height>J)&&(oe=J/Math.max(ge.width,ge.height)),oe<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Me=Math.floor(oe*ge.width),Ee=Math.floor(oe*ge.height);h===void 0&&(h=v(Me,Ee));const re=S?v(Me,Ee):h;return re.width=Me,re.height=Ee,re.getContext("2d").drawImage(R,0,0,Me,Ee),Ce("WebGLRenderer: Texture has been resized from ("+ge.width+"x"+ge.height+") to ("+Me+"x"+Ee+")."),re}else return"data"in R&&Ce("WebGLRenderer: Image in DataTexture is too big ("+ge.width+"x"+ge.height+")."),R;return R}function m(R){return R.generateMipmaps}function _(R){r.generateMipmap(R)}function x(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(R,S,J,oe,ge,Me=!1){if(R!==null){if(r[R]!==void 0)return r[R];Ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Ee;oe&&(Ee=e.get("EXT_texture_norm16"),Ee||Ce("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let re=S;if(S===r.RED&&(J===r.FLOAT&&(re=r.R32F),J===r.HALF_FLOAT&&(re=r.R16F),J===r.UNSIGNED_BYTE&&(re=r.R8),J===r.UNSIGNED_SHORT&&Ee&&(re=Ee.R16_EXT),J===r.SHORT&&Ee&&(re=Ee.R16_SNORM_EXT)),S===r.RED_INTEGER&&(J===r.UNSIGNED_BYTE&&(re=r.R8UI),J===r.UNSIGNED_SHORT&&(re=r.R16UI),J===r.UNSIGNED_INT&&(re=r.R32UI),J===r.BYTE&&(re=r.R8I),J===r.SHORT&&(re=r.R16I),J===r.INT&&(re=r.R32I)),S===r.RG&&(J===r.FLOAT&&(re=r.RG32F),J===r.HALF_FLOAT&&(re=r.RG16F),J===r.UNSIGNED_BYTE&&(re=r.RG8),J===r.UNSIGNED_SHORT&&Ee&&(re=Ee.RG16_EXT),J===r.SHORT&&Ee&&(re=Ee.RG16_SNORM_EXT)),S===r.RG_INTEGER&&(J===r.UNSIGNED_BYTE&&(re=r.RG8UI),J===r.UNSIGNED_SHORT&&(re=r.RG16UI),J===r.UNSIGNED_INT&&(re=r.RG32UI),J===r.BYTE&&(re=r.RG8I),J===r.SHORT&&(re=r.RG16I),J===r.INT&&(re=r.RG32I)),S===r.RGB_INTEGER&&(J===r.UNSIGNED_BYTE&&(re=r.RGB8UI),J===r.UNSIGNED_SHORT&&(re=r.RGB16UI),J===r.UNSIGNED_INT&&(re=r.RGB32UI),J===r.BYTE&&(re=r.RGB8I),J===r.SHORT&&(re=r.RGB16I),J===r.INT&&(re=r.RGB32I)),S===r.RGBA_INTEGER&&(J===r.UNSIGNED_BYTE&&(re=r.RGBA8UI),J===r.UNSIGNED_SHORT&&(re=r.RGBA16UI),J===r.UNSIGNED_INT&&(re=r.RGBA32UI),J===r.BYTE&&(re=r.RGBA8I),J===r.SHORT&&(re=r.RGBA16I),J===r.INT&&(re=r.RGBA32I)),S===r.RGB&&(J===r.UNSIGNED_SHORT&&Ee&&(re=Ee.RGB16_EXT),J===r.SHORT&&Ee&&(re=Ee.RGB16_SNORM_EXT),J===r.UNSIGNED_INT_5_9_9_9_REV&&(re=r.RGB9_E5),J===r.UNSIGNED_INT_10F_11F_11F_REV&&(re=r.R11F_G11F_B10F)),S===r.RGBA){const he=Me?da:vt.getTransfer(ge);J===r.FLOAT&&(re=r.RGBA32F),J===r.HALF_FLOAT&&(re=r.RGBA16F),J===r.UNSIGNED_BYTE&&(re=he===Ct?r.SRGB8_ALPHA8:r.RGBA8),J===r.UNSIGNED_SHORT&&Ee&&(re=Ee.RGBA16_EXT),J===r.SHORT&&Ee&&(re=Ee.RGBA16_SNORM_EXT),J===r.UNSIGNED_SHORT_4_4_4_4&&(re=r.RGBA4),J===r.UNSIGNED_SHORT_5_5_5_1&&(re=r.RGB5_A1)}return(re===r.R16F||re===r.R32F||re===r.RG16F||re===r.RG32F||re===r.RGBA16F||re===r.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function w(R,S){let J;return R?S===null||S===qn||S===_r?J=r.DEPTH24_STENCIL8:S===bn?J=r.DEPTH32F_STENCIL8:S===vr&&(J=r.DEPTH24_STENCIL8,Ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===qn||S===_r?J=r.DEPTH_COMPONENT24:S===bn?J=r.DEPTH_COMPONENT32F:S===vr&&(J=r.DEPTH_COMPONENT16),J}function M(R,S){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Zt&&R.minFilter!==Ot?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function C(R){const S=R.target;S.removeEventListener("dispose",C),E(S),S.isVideoTexture&&u.delete(S),S.isHTMLTexture&&d.delete(S)}function b(R){const S=R.target;S.removeEventListener("dispose",b),D(S)}function E(R){const S=n.get(R);if(S.__webglInit===void 0)return;const J=R.source,oe=f.get(J);if(oe){const ge=oe[S.__cacheKey];ge.usedTimes--,ge.usedTimes===0&&P(R),Object.keys(oe).length===0&&f.delete(J)}n.remove(R)}function P(R){const S=n.get(R);r.deleteTexture(S.__webglTexture);const J=R.source,oe=f.get(J);delete oe[S.__cacheKey],a.memory.textures--}function D(R){const S=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(S.__webglFramebuffer[oe]))for(let ge=0;ge<S.__webglFramebuffer[oe].length;ge++)r.deleteFramebuffer(S.__webglFramebuffer[oe][ge]);else r.deleteFramebuffer(S.__webglFramebuffer[oe]);S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer[oe])}else{if(Array.isArray(S.__webglFramebuffer))for(let oe=0;oe<S.__webglFramebuffer.length;oe++)r.deleteFramebuffer(S.__webglFramebuffer[oe]);else r.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&r.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let oe=0;oe<S.__webglColorRenderbuffer.length;oe++)S.__webglColorRenderbuffer[oe]&&r.deleteRenderbuffer(S.__webglColorRenderbuffer[oe]);S.__webglDepthRenderbuffer&&r.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const J=R.textures;for(let oe=0,ge=J.length;oe<ge;oe++){const Me=n.get(J[oe]);Me.__webglTexture&&(r.deleteTexture(Me.__webglTexture),a.memory.textures--),n.remove(J[oe])}n.remove(R)}let k=0;function Q(){k=0}function ne(){return k}function V(R){k=R}function $(){const R=k;return R>=i.maxTextures&&Ce("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),k+=1,R}function q(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function ce(R,S){const J=n.get(R);if(R.isVideoTexture&&Qe(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&J.__version!==R.version){const oe=R.image;if(oe===null)Ce("WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)Ce("WebGLRenderer: Texture marked for update but image is incomplete");else{_e(J,R,S);return}}else R.isExternalTexture&&(J.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,J.__webglTexture,r.TEXTURE0+S)}function ve(R,S){const J=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&J.__version!==R.version){_e(J,R,S);return}else R.isExternalTexture&&(J.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,J.__webglTexture,r.TEXTURE0+S)}function be(R,S){const J=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&J.__version!==R.version){_e(J,R,S);return}t.bindTexture(r.TEXTURE_3D,J.__webglTexture,r.TEXTURE0+S)}function Ae(R,S){const J=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&J.__version!==R.version){Z(J,R,S);return}t.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture,r.TEXTURE0+S)}const Oe={[sa]:r.REPEAT,[Dn]:r.CLAMP_TO_EDGE,[ra]:r.MIRRORED_REPEAT},et={[Zt]:r.NEAREST,[Uu]:r.NEAREST_MIPMAP_NEAREST,[fr]:r.NEAREST_MIPMAP_LINEAR,[Ot]:r.LINEAR,[Kr]:r.LINEAR_MIPMAP_NEAREST,[yi]:r.LINEAR_MIPMAP_LINEAR},ht={[Jf]:r.NEVER,[np]:r.ALWAYS,[jf]:r.LESS,[Ul]:r.LEQUAL,[Qf]:r.EQUAL,[Nl]:r.GEQUAL,[ep]:r.GREATER,[tp]:r.NOTEQUAL};function tt(R,S){if(S.type===bn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Ot||S.magFilter===Kr||S.magFilter===fr||S.magFilter===yi||S.minFilter===Ot||S.minFilter===Kr||S.minFilter===fr||S.minFilter===yi)&&Ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,Oe[S.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,Oe[S.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,Oe[S.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,et[S.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,et[S.minFilter]),S.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,ht[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Zt||S.minFilter!==fr&&S.minFilter!==yi||S.type===bn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");r.texParameterf(R,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function H(R,S){let J=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",C));const oe=S.source;let ge=f.get(oe);ge===void 0&&(ge={},f.set(oe,ge));const Me=q(S);if(Me!==R.__cacheKey){ge[Me]===void 0&&(ge[Me]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,J=!0),ge[Me].usedTimes++;const Ee=ge[R.__cacheKey];Ee!==void 0&&(ge[R.__cacheKey].usedTimes--,Ee.usedTimes===0&&P(S)),R.__cacheKey=Me,R.__webglTexture=ge[Me].texture}return J}function ae(R,S,J){return Math.floor(Math.floor(R/J)/S)}function de(R,S,J,oe){const Me=R.updateRanges;if(Me.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,S.width,S.height,J,oe,S.data);else{Me.sort((Ve,Te)=>Ve.start-Te.start);let Ee=0;for(let Ve=1;Ve<Me.length;Ve++){const Te=Me[Ee],we=Me[Ve],rt=Te.start+Te.count,lt=ae(we.start,S.width,4),xt=ae(Te.start,S.width,4);we.start<=rt+1&&lt===xt&&ae(we.start+we.count-1,S.width,4)===lt?Te.count=Math.max(Te.count,we.start+we.count-Te.start):(++Ee,Me[Ee]=we)}Me.length=Ee+1;const re=t.getParameter(r.UNPACK_ROW_LENGTH),he=t.getParameter(r.UNPACK_SKIP_PIXELS),De=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,S.width);for(let Ve=0,Te=Me.length;Ve<Te;Ve++){const we=Me[Ve],rt=Math.floor(we.start/4),lt=Math.ceil(we.count/4),xt=rt%S.width,z=Math.floor(rt/S.width),Se=lt,le=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,xt),t.pixelStorei(r.UNPACK_SKIP_ROWS,z),t.texSubImage2D(r.TEXTURE_2D,0,xt,z,Se,le,J,oe,S.data)}R.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,re),t.pixelStorei(r.UNPACK_SKIP_PIXELS,he),t.pixelStorei(r.UNPACK_SKIP_ROWS,De)}}function _e(R,S,J){let oe=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(oe=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(oe=r.TEXTURE_3D);const ge=H(R,S),Me=S.source;t.bindTexture(oe,R.__webglTexture,r.TEXTURE0+J);const Ee=n.get(Me);if(Me.version!==Ee.__version||ge===!0){if(t.activeTexture(r.TEXTURE0+J),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){const le=vt.getPrimaries(vt.workingColorSpace),ke=S.colorSpace===Ui?null:vt.getPrimaries(S.colorSpace),U=S.colorSpace===Ui||le===ke?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,U)}t.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment);let he=g(S.image,!1,i.maxTextureSize);he=xe(S,he);const De=s.convert(S.format,S.colorSpace),Ve=s.convert(S.type);let Te=y(S.internalFormat,De,Ve,S.normalized,S.colorSpace,S.isVideoTexture);tt(oe,S);let we;const rt=S.mipmaps,lt=S.isVideoTexture!==!0,xt=Ee.__version===void 0||ge===!0,z=Me.dataReady,Se=M(S,he);if(S.isDepthTexture)Te=w(S.format===ts,S.type),xt&&(lt?t.texStorage2D(r.TEXTURE_2D,1,Te,he.width,he.height):t.texImage2D(r.TEXTURE_2D,0,Te,he.width,he.height,0,De,Ve,null));else if(S.isDataTexture)if(rt.length>0){lt&&xt&&t.texStorage2D(r.TEXTURE_2D,Se,Te,rt[0].width,rt[0].height);for(let le=0,ke=rt.length;le<ke;le++)we=rt[le],lt?z&&t.texSubImage2D(r.TEXTURE_2D,le,0,0,we.width,we.height,De,Ve,we.data):t.texImage2D(r.TEXTURE_2D,le,Te,we.width,we.height,0,De,Ve,we.data);S.generateMipmaps=!1}else lt?(xt&&t.texStorage2D(r.TEXTURE_2D,Se,Te,he.width,he.height),z&&de(S,he,De,Ve)):t.texImage2D(r.TEXTURE_2D,0,Te,he.width,he.height,0,De,Ve,he.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){lt&&xt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Se,Te,rt[0].width,rt[0].height,he.depth);for(let le=0,ke=rt.length;le<ke;le++)if(we=rt[le],S.format!==Mn)if(De!==null)if(lt){if(z)if(S.layerUpdates.size>0){const U=yu(we.width,we.height,S.format,S.type);for(const N of S.layerUpdates){const j=we.data.subarray(N*U/we.data.BYTES_PER_ELEMENT,(N+1)*U/we.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,le,0,0,N,we.width,we.height,1,De,j)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,le,0,0,0,we.width,we.height,he.depth,De,we.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,le,Te,we.width,we.height,he.depth,0,we.data,0,0);else Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else lt?z&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,le,0,0,0,we.width,we.height,he.depth,De,Ve,we.data):t.texImage3D(r.TEXTURE_2D_ARRAY,le,Te,we.width,we.height,he.depth,0,De,Ve,we.data)}else{lt&&xt&&t.texStorage2D(r.TEXTURE_2D,Se,Te,rt[0].width,rt[0].height);for(let le=0,ke=rt.length;le<ke;le++)we=rt[le],S.format!==Mn?De!==null?lt?z&&t.compressedTexSubImage2D(r.TEXTURE_2D,le,0,0,we.width,we.height,De,we.data):t.compressedTexImage2D(r.TEXTURE_2D,le,Te,we.width,we.height,0,we.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?z&&t.texSubImage2D(r.TEXTURE_2D,le,0,0,we.width,we.height,De,Ve,we.data):t.texImage2D(r.TEXTURE_2D,le,Te,we.width,we.height,0,De,Ve,we.data)}else if(S.isDataArrayTexture)if(lt){if(xt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Se,Te,he.width,he.height,he.depth),z)if(S.layerUpdates.size>0){const le=yu(he.width,he.height,S.format,S.type);for(const ke of S.layerUpdates){const U=he.data.subarray(ke*le/he.data.BYTES_PER_ELEMENT,(ke+1)*le/he.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ke,he.width,he.height,1,De,Ve,U)}S.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,De,Ve,he.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Te,he.width,he.height,he.depth,0,De,Ve,he.data);else if(S.isData3DTexture)lt?(xt&&t.texStorage3D(r.TEXTURE_3D,Se,Te,he.width,he.height,he.depth),z&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,De,Ve,he.data)):t.texImage3D(r.TEXTURE_3D,0,Te,he.width,he.height,he.depth,0,De,Ve,he.data);else if(S.isFramebufferTexture){if(xt)if(lt)t.texStorage2D(r.TEXTURE_2D,Se,Te,he.width,he.height);else{let le=he.width,ke=he.height;for(let U=0;U<Se;U++)t.texImage2D(r.TEXTURE_2D,U,Te,le,ke,0,De,Ve,null),le>>=1,ke>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in r){const le=r.canvas;if(le.hasAttribute("layoutsubtree")||le.setAttribute("layoutsubtree","true"),he.parentNode!==le){le.appendChild(he),d.add(S),le.onpaint=ye=>{const Be=ye.changedElements;for(const Le of d)Be.includes(Le.image)&&(Le.needsUpdate=!0)},le.requestPaint();return}const ke=0,U=r.RGBA,N=r.RGBA,j=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,ke,U,N,j,he),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(rt.length>0){if(lt&&xt){const le=Et(rt[0]);t.texStorage2D(r.TEXTURE_2D,Se,Te,le.width,le.height)}for(let le=0,ke=rt.length;le<ke;le++)we=rt[le],lt?z&&t.texSubImage2D(r.TEXTURE_2D,le,0,0,De,Ve,we):t.texImage2D(r.TEXTURE_2D,le,Te,De,Ve,we);S.generateMipmaps=!1}else if(lt){if(xt){const le=Et(he);t.texStorage2D(r.TEXTURE_2D,Se,Te,le.width,le.height)}z&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,De,Ve,he)}else t.texImage2D(r.TEXTURE_2D,0,Te,De,Ve,he);m(S)&&_(oe),Ee.__version=Me.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function Z(R,S,J){if(S.image.length!==6)return;const oe=H(R,S),ge=S.source;t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+J);const Me=n.get(ge);if(ge.version!==Me.__version||oe===!0){t.activeTexture(r.TEXTURE0+J);const Ee=vt.getPrimaries(vt.workingColorSpace),re=S.colorSpace===Ui?null:vt.getPrimaries(S.colorSpace),he=S.colorSpace===Ui||Ee===re?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const De=S.isCompressedTexture||S.image[0].isCompressedTexture,Ve=S.image[0]&&S.image[0].isDataTexture,Te=[];for(let N=0;N<6;N++)!De&&!Ve?Te[N]=g(S.image[N],!0,i.maxCubemapSize):Te[N]=Ve?S.image[N].image:S.image[N],Te[N]=xe(S,Te[N]);const we=Te[0],rt=s.convert(S.format,S.colorSpace),lt=s.convert(S.type),xt=y(S.internalFormat,rt,lt,S.normalized,S.colorSpace),z=S.isVideoTexture!==!0,Se=Me.__version===void 0||oe===!0,le=ge.dataReady;let ke=M(S,we);tt(r.TEXTURE_CUBE_MAP,S);let U;if(De){z&&Se&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ke,xt,we.width,we.height);for(let N=0;N<6;N++){U=Te[N].mipmaps;for(let j=0;j<U.length;j++){const ye=U[j];S.format!==Mn?rt!==null?z?le&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+N,j,0,0,ye.width,ye.height,rt,ye.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+N,j,xt,ye.width,ye.height,0,ye.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+N,j,0,0,ye.width,ye.height,rt,lt,ye.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+N,j,xt,ye.width,ye.height,0,rt,lt,ye.data)}}}else{if(U=S.mipmaps,z&&Se){U.length>0&&ke++;const N=Et(Te[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ke,xt,N.width,N.height)}for(let N=0;N<6;N++)if(Ve){z?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+N,0,0,0,Te[N].width,Te[N].height,rt,lt,Te[N].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+N,0,xt,Te[N].width,Te[N].height,0,rt,lt,Te[N].data);for(let j=0;j<U.length;j++){const Be=U[j].image[N].image;z?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+N,j+1,0,0,Be.width,Be.height,rt,lt,Be.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+N,j+1,xt,Be.width,Be.height,0,rt,lt,Be.data)}}else{z?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+N,0,0,0,rt,lt,Te[N]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+N,0,xt,rt,lt,Te[N]);for(let j=0;j<U.length;j++){const ye=U[j];z?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+N,j+1,0,0,rt,lt,ye.image[N]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+N,j+1,xt,rt,lt,ye.image[N])}}}m(S)&&_(r.TEXTURE_CUBE_MAP),Me.__version=ge.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function L(R,S,J,oe,ge,Me){const Ee=s.convert(J.format,J.colorSpace),re=s.convert(J.type),he=y(J.internalFormat,Ee,re,J.normalized,J.colorSpace),De=n.get(S),Ve=n.get(J);if(Ve.__renderTarget=S,!De.__hasExternalTextures){const Te=Math.max(1,S.width>>Me),we=Math.max(1,S.height>>Me);ge===r.TEXTURE_3D||ge===r.TEXTURE_2D_ARRAY?t.texImage3D(ge,Me,he,Te,we,S.depth,0,Ee,re,null):t.texImage2D(ge,Me,he,Te,we,0,Ee,re,null)}t.bindFramebuffer(r.FRAMEBUFFER,R),ze(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,oe,ge,Ve.__webglTexture,0,nt(S)):(ge===r.TEXTURE_2D||ge>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ge<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,oe,ge,Ve.__webglTexture,Me),t.bindFramebuffer(r.FRAMEBUFFER,null)}function F(R,S,J){if(r.bindRenderbuffer(r.RENDERBUFFER,R),S.depthBuffer){const oe=S.depthTexture,ge=oe&&oe.isDepthTexture?oe.type:null,Me=w(S.stencilBuffer,ge),Ee=S.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;ze(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,nt(S),Me,S.width,S.height):J?r.renderbufferStorageMultisample(r.RENDERBUFFER,nt(S),Me,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,Me,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ee,r.RENDERBUFFER,R)}else{const oe=S.textures;for(let ge=0;ge<oe.length;ge++){const Me=oe[ge],Ee=s.convert(Me.format,Me.colorSpace),re=s.convert(Me.type),he=y(Me.internalFormat,Ee,re,Me.normalized,Me.colorSpace);ze(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,nt(S),he,S.width,S.height):J?r.renderbufferStorageMultisample(r.RENDERBUFFER,nt(S),he,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,he,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function B(R,S,J){const oe=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ge=n.get(S.depthTexture);if(ge.__renderTarget=S,(!ge.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),oe){if(ge.__webglInit===void 0&&(ge.__webglInit=!0,S.depthTexture.addEventListener("dispose",C)),ge.__webglTexture===void 0){ge.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,ge.__webglTexture),tt(r.TEXTURE_CUBE_MAP,S.depthTexture);const De=s.convert(S.depthTexture.format),Ve=s.convert(S.depthTexture.type);let Te;S.depthTexture.format===Ti?Te=r.DEPTH_COMPONENT24:S.depthTexture.format===ts&&(Te=r.DEPTH24_STENCIL8);for(let we=0;we<6;we++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Te,S.width,S.height,0,De,Ve,null)}}else ce(S.depthTexture,0);const Me=ge.__webglTexture,Ee=nt(S),re=oe?r.TEXTURE_CUBE_MAP_POSITIVE_X+J:r.TEXTURE_2D,he=S.depthTexture.format===ts?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(S.depthTexture.format===Ti)ze(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,he,re,Me,0,Ee):r.framebufferTexture2D(r.FRAMEBUFFER,he,re,Me,0);else if(S.depthTexture.format===ts)ze(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,he,re,Me,0,Ee):r.framebufferTexture2D(r.FRAMEBUFFER,he,re,Me,0);else throw new Error("Unknown depthTexture format")}function K(R){const S=n.get(R),J=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const oe=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),oe){const ge=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,oe.removeEventListener("dispose",ge)};oe.addEventListener("dispose",ge),S.__depthDisposeCallback=ge}S.__boundDepthTexture=oe}if(R.depthTexture&&!S.__autoAllocateDepthBuffer)if(J)for(let oe=0;oe<6;oe++)B(S.__webglFramebuffer[oe],R,oe);else{const oe=R.texture.mipmaps;oe&&oe.length>0?B(S.__webglFramebuffer[0],R,0):B(S.__webglFramebuffer,R,0)}else if(J){S.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[oe]),S.__webglDepthbuffer[oe]===void 0)S.__webglDepthbuffer[oe]=r.createRenderbuffer(),F(S.__webglDepthbuffer[oe],R,!1);else{const ge=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Me=S.__webglDepthbuffer[oe];r.bindRenderbuffer(r.RENDERBUFFER,Me),r.framebufferRenderbuffer(r.FRAMEBUFFER,ge,r.RENDERBUFFER,Me)}}else{const oe=R.texture.mipmaps;if(oe&&oe.length>0?t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=r.createRenderbuffer(),F(S.__webglDepthbuffer,R,!1);else{const ge=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Me=S.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Me),r.framebufferRenderbuffer(r.FRAMEBUFFER,ge,r.RENDERBUFFER,Me)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function W(R,S,J){const oe=n.get(R);S!==void 0&&L(oe.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),J!==void 0&&K(R)}function se(R){const S=R.texture,J=n.get(R),oe=n.get(S);R.addEventListener("dispose",b);const ge=R.textures,Me=R.isWebGLCubeRenderTarget===!0,Ee=ge.length>1;if(Ee||(oe.__webglTexture===void 0&&(oe.__webglTexture=r.createTexture()),oe.__version=S.version,a.memory.textures++),Me){J.__webglFramebuffer=[];for(let re=0;re<6;re++)if(S.mipmaps&&S.mipmaps.length>0){J.__webglFramebuffer[re]=[];for(let he=0;he<S.mipmaps.length;he++)J.__webglFramebuffer[re][he]=r.createFramebuffer()}else J.__webglFramebuffer[re]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){J.__webglFramebuffer=[];for(let re=0;re<S.mipmaps.length;re++)J.__webglFramebuffer[re]=r.createFramebuffer()}else J.__webglFramebuffer=r.createFramebuffer();if(Ee)for(let re=0,he=ge.length;re<he;re++){const De=n.get(ge[re]);De.__webglTexture===void 0&&(De.__webglTexture=r.createTexture(),a.memory.textures++)}if(R.samples>0&&ze(R)===!1){J.__webglMultisampledFramebuffer=r.createFramebuffer(),J.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let re=0;re<ge.length;re++){const he=ge[re];J.__webglColorRenderbuffer[re]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,J.__webglColorRenderbuffer[re]);const De=s.convert(he.format,he.colorSpace),Ve=s.convert(he.type),Te=y(he.internalFormat,De,Ve,he.normalized,he.colorSpace,R.isXRRenderTarget===!0),we=nt(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,we,Te,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.RENDERBUFFER,J.__webglColorRenderbuffer[re])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(J.__webglDepthRenderbuffer=r.createRenderbuffer(),F(J.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Me){t.bindTexture(r.TEXTURE_CUBE_MAP,oe.__webglTexture),tt(r.TEXTURE_CUBE_MAP,S);for(let re=0;re<6;re++)if(S.mipmaps&&S.mipmaps.length>0)for(let he=0;he<S.mipmaps.length;he++)L(J.__webglFramebuffer[re][he],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+re,he);else L(J.__webglFramebuffer[re],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(S)&&_(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let re=0,he=ge.length;re<he;re++){const De=ge[re],Ve=n.get(De);let Te=r.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Te=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Te,Ve.__webglTexture),tt(Te,De),L(J.__webglFramebuffer,R,De,r.COLOR_ATTACHMENT0+re,Te,0),m(De)&&_(Te)}t.unbindTexture()}else{let re=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(re=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(re,oe.__webglTexture),tt(re,S),S.mipmaps&&S.mipmaps.length>0)for(let he=0;he<S.mipmaps.length;he++)L(J.__webglFramebuffer[he],R,S,r.COLOR_ATTACHMENT0,re,he);else L(J.__webglFramebuffer,R,S,r.COLOR_ATTACHMENT0,re,0);m(S)&&_(re),t.unbindTexture()}R.depthBuffer&&K(R)}function ue(R){const S=R.textures;for(let J=0,oe=S.length;J<oe;J++){const ge=S[J];if(m(ge)){const Me=x(R),Ee=n.get(ge).__webglTexture;t.bindTexture(Me,Ee),_(Me),t.unbindTexture()}}}const me=[],Xe=[];function O(R){if(R.samples>0){if(ze(R)===!1){const S=R.textures,J=R.width,oe=R.height;let ge=r.COLOR_BUFFER_BIT;const Me=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ee=n.get(R),re=S.length>1;if(re)for(let De=0;De<S.length;De++)t.bindFramebuffer(r.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Ee.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer);const he=R.texture.mipmaps;he&&he.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let De=0;De<S.length;De++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ge|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ge|=r.STENCIL_BUFFER_BIT)),re){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ee.__webglColorRenderbuffer[De]);const Ve=n.get(S[De]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ve,0)}r.blitFramebuffer(0,0,J,oe,0,0,J,oe,ge,r.NEAREST),l===!0&&(me.length=0,Xe.length=0,me.push(r.COLOR_ATTACHMENT0+De),R.depthBuffer&&R.resolveDepthBuffer===!1&&(me.push(Me),Xe.push(Me),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Xe)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,me))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),re)for(let De=0;De<S.length;De++){t.bindFramebuffer(r.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.RENDERBUFFER,Ee.__webglColorRenderbuffer[De]);const Ve=n.get(S[De]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Ee.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.TEXTURE_2D,Ve,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const S=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[S])}}}function nt(R){return Math.min(i.maxSamples,R.samples)}function ze(R){const S=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Qe(R){const S=a.render.frame;u.get(R)!==S&&(u.set(R,S),R.update())}function xe(R,S){const J=R.colorSpace,oe=R.format,ge=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||J!==ua&&J!==Ui&&(vt.getTransfer(J)===Ct?(oe!==Mn||ge!==Pn)&&Ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qe("WebGLTextures: Unsupported texture color space:",J)),S}function Et(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=$,this.resetTextureUnits=Q,this.getTextureUnits=ne,this.setTextureUnits=V,this.setTexture2D=ce,this.setTexture2DArray=ve,this.setTexture3D=be,this.setTextureCube=Ae,this.rebindTextures=W,this.setupRenderTarget=se,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=O,this.setupDepthRenderbuffer=K,this.setupFrameBufferTexture=L,this.useMultisampledRTT=ze,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function dm(r,e){function t(n,i=Ui){let s;const a=vt.getTransfer(i);if(n===Pn)return r.UNSIGNED_BYTE;if(n===Cl)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Rl)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Ou)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===ku)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Nu)return r.BYTE;if(n===Fu)return r.SHORT;if(n===vr)return r.UNSIGNED_SHORT;if(n===Al)return r.INT;if(n===qn)return r.UNSIGNED_INT;if(n===bn)return r.FLOAT;if(n===Ei)return r.HALF_FLOAT;if(n===Bu)return r.ALPHA;if(n===zu)return r.RGB;if(n===Mn)return r.RGBA;if(n===Ti)return r.DEPTH_COMPONENT;if(n===ts)return r.DEPTH_STENCIL;if(n===Il)return r.RED;if(n===wa)return r.RED_INTEGER;if(n===rs)return r.RG;if(n===Pl)return r.RG_INTEGER;if(n===Ll)return r.RGBA_INTEGER;if(n===Jr||n===jr||n===Qr||n===ea)if(a===Ct)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Jr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Qr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ea)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Jr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===jr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Qr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ea)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===zo||n===Vo||n===Go||n===Ho)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===zo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Vo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Go)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ho)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Wo||n===Xo||n===$o||n===qo||n===Yo||n===aa||n===Zo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Wo||n===Xo)return a===Ct?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===$o)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===qo)return s.COMPRESSED_R11_EAC;if(n===Yo)return s.COMPRESSED_SIGNED_R11_EAC;if(n===aa)return s.COMPRESSED_RG11_EAC;if(n===Zo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ko||n===Jo||n===jo||n===Qo||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===al||n===ol||n===ll||n===cl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ko)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Jo)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===jo)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Qo)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===el)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===tl)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===nl)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===il)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===sl)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===rl)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===al)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ol)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ll)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===cl)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ul||n===dl||n===hl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===ul)return a===Ct?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===dl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===hl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===fl||n===pl||n===oa||n===ml)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===fl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===pl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===oa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ml)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===_r?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const lS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class uS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Ku(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Wn({vertexShader:lS,fragmentShader:cS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Rt(new Ar(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class dS extends oi{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,p=null;const v=typeof XRWebGLBinding<"u",g=new uS,m={},_=t.getContextAttributes();let x=null,y=null;const w=[],M=[],C=new pe;let b=null;const E=new rn;E.viewport=new bt;const P=new rn;P.viewport=new bt;const D=[E,P],k=new jp;let Q=null,ne=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let ae=w[H];return ae===void 0&&(ae=new Co,w[H]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(H){let ae=w[H];return ae===void 0&&(ae=new Co,w[H]=ae),ae.getGripSpace()},this.getHand=function(H){let ae=w[H];return ae===void 0&&(ae=new Co,w[H]=ae),ae.getHandSpace()};function V(H){const ae=M.indexOf(H.inputSource);if(ae===-1)return;const de=w[ae];de!==void 0&&(de.update(H.inputSource,H.frame,c||a),de.dispatchEvent({type:H.type,data:H.inputSource}))}function $(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",$),i.removeEventListener("inputsourceschange",q);for(let H=0;H<w.length;H++){const ae=M[H];ae!==null&&(M[H]=null,w[H].disconnect(ae))}Q=null,ne=null,g.reset();for(const H in m)delete m[H];e.setRenderTarget(x),f=null,h=null,d=null,i=null,y=null,tt.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){s=H,n.isPresenting===!0&&Ce("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,n.isPresenting===!0&&Ce("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(H){if(i=H,i!==null){if(x=e.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",$),i.addEventListener("inputsourceschange",q),_.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,_e=null,Z=null;_.depth&&(Z=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=_.stencil?ts:Ti,_e=_.stencil?_r:qn);const L={colorFormat:t.RGBA8,depthFormat:Z,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(L),i.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new Hn(h.textureWidth,h.textureHeight,{format:Mn,type:Pn,depthTexture:new Fs(h.textureWidth,h.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const de={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,de),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Hn(f.framebufferWidth,f.framebufferHeight,{format:Mn,type:Pn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),tt.setContext(i),tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function q(H){for(let ae=0;ae<H.removed.length;ae++){const de=H.removed[ae],_e=M.indexOf(de);_e>=0&&(M[_e]=null,w[_e].disconnect(de))}for(let ae=0;ae<H.added.length;ae++){const de=H.added[ae];let _e=M.indexOf(de);if(_e===-1){for(let L=0;L<w.length;L++)if(L>=M.length){M.push(de),_e=L;break}else if(M[L]===null){M[L]=de,_e=L;break}if(_e===-1)break}const Z=w[_e];Z&&Z.connect(de)}}const ce=new I,ve=new I;function be(H,ae,de){ce.setFromMatrixPosition(ae.matrixWorld),ve.setFromMatrixPosition(de.matrixWorld);const _e=ce.distanceTo(ve),Z=ae.projectionMatrix.elements,L=de.projectionMatrix.elements,F=Z[14]/(Z[10]-1),B=Z[14]/(Z[10]+1),K=(Z[9]+1)/Z[5],W=(Z[9]-1)/Z[5],se=(Z[8]-1)/Z[0],ue=(L[8]+1)/L[0],me=F*se,Xe=F*ue,O=_e/(-se+ue),nt=O*-se;if(ae.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(nt),H.translateZ(O),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),Z[10]===-1)H.projectionMatrix.copy(ae.projectionMatrix),H.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const ze=F+O,Qe=B+O,xe=me-nt,Et=Xe+(_e-nt),R=K*B/Qe*ze,S=W*B/Qe*ze;H.projectionMatrix.makePerspective(xe,Et,R,S,ze,Qe),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function Ae(H,ae){ae===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(ae.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(i===null)return;let ae=H.near,de=H.far;g.texture!==null&&(g.depthNear>0&&(ae=g.depthNear),g.depthFar>0&&(de=g.depthFar)),k.near=P.near=E.near=ae,k.far=P.far=E.far=de,(Q!==k.near||ne!==k.far)&&(i.updateRenderState({depthNear:k.near,depthFar:k.far}),Q=k.near,ne=k.far),k.layers.mask=H.layers.mask|6,E.layers.mask=k.layers.mask&-5,P.layers.mask=k.layers.mask&-3;const _e=H.parent,Z=k.cameras;Ae(k,_e);for(let L=0;L<Z.length;L++)Ae(Z[L],_e);Z.length===2?be(k,E,P):k.projectionMatrix.copy(E.projectionMatrix),Oe(H,k,_e)};function Oe(H,ae,de){de===null?H.matrix.copy(ae.matrixWorld):(H.matrix.copy(de.matrixWorld),H.matrix.invert(),H.matrix.multiply(ae.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(ae.projectionMatrix),H.projectionMatrixInverse.copy(ae.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=xr*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(H){l=H,h!==null&&(h.fixedFoveation=H),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=H)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(k)},this.getCameraTexture=function(H){return m[H]};let et=null;function ht(H,ae){if(u=ae.getViewerPose(c||a),p=ae,u!==null){const de=u.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let _e=!1;de.length!==k.cameras.length&&(k.cameras.length=0,_e=!0);for(let B=0;B<de.length;B++){const K=de[B];let W=null;if(f!==null)W=f.getViewport(K);else{const ue=d.getViewSubImage(h,K);W=ue.viewport,B===0&&(e.setRenderTargetTextures(y,ue.colorTexture,ue.depthStencilTexture),e.setRenderTarget(y))}let se=D[B];se===void 0&&(se=new rn,se.layers.enable(B),se.viewport=new bt,D[B]=se),se.matrix.fromArray(K.transform.matrix),se.matrix.decompose(se.position,se.quaternion,se.scale),se.projectionMatrix.fromArray(K.projectionMatrix),se.projectionMatrixInverse.copy(se.projectionMatrix).invert(),se.viewport.set(W.x,W.y,W.width,W.height),B===0&&(k.matrix.copy(se.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),_e===!0&&k.cameras.push(se)}const Z=i.enabledFeatures;if(Z&&Z.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){d=n.getBinding();const B=d.getDepthInformation(de[0]);B&&B.isValid&&B.texture&&g.init(B,i.renderState)}if(Z&&Z.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let B=0;B<de.length;B++){const K=de[B].camera;if(K){let W=m[K];W||(W=new Ku,m[K]=W);const se=d.getCameraImage(K);W.sourceTexture=se}}}}for(let de=0;de<w.length;de++){const _e=M[de],Z=w[de];_e!==null&&Z!==void 0&&Z.update(_e,ae,c||a)}et&&et(H,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),p=null}const tt=new rm;tt.setAnimationLoop(ht),this.setAnimationLoop=function(H){et=H},this.dispose=function(){}}}const hS=new it,hm=new at;hm.set(-1,0,0,0,1,0,0,0,1);function fS(r,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Rp(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,_,x,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),d(g,m)):m.isMeshPhongMaterial?(s(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),h(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),v(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,_,x):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Sn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Sn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const _=e.get(m),x=_.envMap,y=_.envMapRotation;x&&(g.envMap.value=x,g.envMapRotation.value.setFromMatrix4(hS.makeRotationFromEuler(y)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(hm),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,_,x){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*_,g.scale.value=x*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,_){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Sn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const _=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function pS(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,x){const y=x.program;n.uniformBlockBinding(_,y)}function c(_,x){let y=i[_.id];y===void 0&&(p(_),y=u(_),i[_.id]=y,_.addEventListener("dispose",g));const w=x.program;n.updateUBOMapping(_,w);const M=e.render.frame;s[_.id]!==M&&(h(_),s[_.id]=M)}function u(_){const x=d();_.__bindingPointIndex=x;const y=r.createBuffer(),w=_.__size,M=_.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,w,M),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,y),y}function d(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const x=i[_.id],y=_.uniforms,w=_.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let M=0,C=y.length;M<C;M++){const b=Array.isArray(y[M])?y[M]:[y[M]];for(let E=0,P=b.length;E<P;E++){const D=b[E];if(f(D,M,E,w)===!0){const k=D.__offset,Q=Array.isArray(D.value)?D.value:[D.value];let ne=0;for(let V=0;V<Q.length;V++){const $=Q[V],q=v($);typeof $=="number"||typeof $=="boolean"?(D.__data[0]=$,r.bufferSubData(r.UNIFORM_BUFFER,k+ne,D.__data)):$.isMatrix3?(D.__data[0]=$.elements[0],D.__data[1]=$.elements[1],D.__data[2]=$.elements[2],D.__data[3]=0,D.__data[4]=$.elements[3],D.__data[5]=$.elements[4],D.__data[6]=$.elements[5],D.__data[7]=0,D.__data[8]=$.elements[6],D.__data[9]=$.elements[7],D.__data[10]=$.elements[8],D.__data[11]=0):ArrayBuffer.isView($)?D.__data.set(new $.constructor($.buffer,$.byteOffset,D.__data.length)):($.toArray(D.__data,ne),ne+=q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(_,x,y,w){const M=_.value,C=x+"_"+y;if(w[C]===void 0)return typeof M=="number"||typeof M=="boolean"?w[C]=M:ArrayBuffer.isView(M)?w[C]=M.slice():w[C]=M.clone(),!0;{const b=w[C];if(typeof M=="number"||typeof M=="boolean"){if(b!==M)return w[C]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(b.equals(M)===!1)return b.copy(M),!0}}return!1}function p(_){const x=_.uniforms;let y=0;const w=16;for(let C=0,b=x.length;C<b;C++){const E=Array.isArray(x[C])?x[C]:[x[C]];for(let P=0,D=E.length;P<D;P++){const k=E[P],Q=Array.isArray(k.value)?k.value:[k.value];for(let ne=0,V=Q.length;ne<V;ne++){const $=Q[ne],q=v($),ce=y%w,ve=ce%q.boundary,be=ce+ve;y+=ve,be!==0&&w-be<q.storage&&(y+=w-be),k.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=q.storage}}}const M=y%w;return M>0&&(y+=w-M),_.__size=y,_.__cache={},this}function v(_){const x={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(x.boundary=4,x.storage=4):_.isVector2?(x.boundary=8,x.storage=8):_.isVector3||_.isColor?(x.boundary=16,x.storage=12):_.isVector4?(x.boundary=16,x.storage=16):_.isMatrix3?(x.boundary=48,x.storage=48):_.isMatrix4?(x.boundary=64,x.storage=64):_.isTexture?Ce("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(x.boundary=16,x.storage=_.byteLength):Ce("WebGLRenderer: Unsupported uniform value type.",_),x}function g(_){const x=_.target;x.removeEventListener("dispose",g);const y=a.indexOf(x.__bindingPointIndex);a.splice(y,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function m(){for(const _ in i)r.deleteBuffer(i[_]);a=[],i={},s={}}return{bind:l,update:c,dispose:m}}const mS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let mi=null;function gS(){return mi===null&&(mi=new ri(mS,16,16,rs,Ei),mi.name="DFG_LUT",mi.minFilter=Ot,mi.magFilter=Ot,mi.wrapS=Dn,mi.wrapT=Dn,mi.generateMipmaps=!1,mi.needsUpdate=!0),mi}class fm{constructor(e={}){const{canvas:t=sp(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=Pn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const v=f,g=new Set([Ll,Pl,wa]),m=new Set([Pn,qn,vr,_r,Cl,Rl]),_=new Uint32Array(4),x=new Int32Array(4),y=new I;let w=null,M=null;const C=[],b=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let D=!1,k=null;this._outputColorSpace=In;let Q=0,ne=0,V=null,$=-1,q=null;const ce=new bt,ve=new bt;let be=null;const Ae=new Ne(0);let Oe=0,et=t.width,ht=t.height,tt=1,H=null,ae=null;const de=new bt(0,0,et,ht),_e=new bt(0,0,et,ht);let Z=!1;const L=new Er;let F=!1,B=!1;const K=new it,W=new I,se=new bt,ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let me=!1;function Xe(){return V===null?tt:1}let O=n;function nt(T,X){return t.getContext(T,X)}try{const T={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${El}`),t.addEventListener("webglcontextlost",N,!1),t.addEventListener("webglcontextrestored",j,!1),t.addEventListener("webglcontextcreationerror",ye,!1),O===null){const X="webgl2";if(O=nt(X,T),O===null)throw nt(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw qe("WebGLRenderer: "+T.message),T}let ze,Qe,xe,Et,R,S,J,oe,ge,Me,Ee,re,he,De,Ve,Te,we,rt,lt,xt,z,Se,le;function ke(){ze=new vb(O),ze.init(),z=new dm(O,ze),Qe=new cb(O,ze,e,z),xe=new aS(O,ze),Qe.reversedDepthBuffer&&h&&xe.buffers.depth.setReversed(!0),Et=new yb(O),R=new $M,S=new oS(O,ze,xe,R,Qe,z,Et),J=new gb(P),oe=new w_(O),Se=new ob(O,oe),ge=new _b(O,oe,Et,Se),Me=new Mb(O,ge,oe,Se,Et),rt=new bb(O,Qe,S),Ve=new ub(R),Ee=new XM(P,J,ze,Qe,Se,Ve),re=new fS(P,R),he=new YM,De=new eS(ze),we=new ab(P,J,xe,Me,p,l),Te=new rS(P,Me,Qe),le=new pS(O,Et,Qe,xe),lt=new lb(O,ze,Et),xt=new xb(O,ze,Et),Et.programs=Ee.programs,P.capabilities=Qe,P.extensions=ze,P.properties=R,P.renderLists=he,P.shadowMap=Te,P.state=xe,P.info=Et}ke(),v!==Pn&&(E=new wb(v,t.width,t.height,i,s));const U=new dS(P,O);this.xr=U,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const T=ze.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ze.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(T){T!==void 0&&(tt=T,this.setSize(et,ht,!1))},this.getSize=function(T){return T.set(et,ht)},this.setSize=function(T,X,ie=!0){if(U.isPresenting){Ce("WebGLRenderer: Can't change size while VR device is presenting.");return}et=T,ht=X,t.width=Math.floor(T*tt),t.height=Math.floor(X*tt),ie===!0&&(t.style.width=T+"px",t.style.height=X+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,T,X)},this.getDrawingBufferSize=function(T){return T.set(et*tt,ht*tt).floor()},this.setDrawingBufferSize=function(T,X,ie){et=T,ht=X,tt=ie,t.width=Math.floor(T*ie),t.height=Math.floor(X*ie),this.setViewport(0,0,T,X)},this.setEffects=function(T){if(v===Pn){qe("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let X=0;X<T.length;X++)if(T[X].isOutputPass===!0){Ce("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(ce)},this.getViewport=function(T){return T.copy(de)},this.setViewport=function(T,X,ie,ee){T.isVector4?de.set(T.x,T.y,T.z,T.w):de.set(T,X,ie,ee),xe.viewport(ce.copy(de).multiplyScalar(tt).round())},this.getScissor=function(T){return T.copy(_e)},this.setScissor=function(T,X,ie,ee){T.isVector4?_e.set(T.x,T.y,T.z,T.w):_e.set(T,X,ie,ee),xe.scissor(ve.copy(_e).multiplyScalar(tt).round())},this.getScissorTest=function(){return Z},this.setScissorTest=function(T){xe.setScissorTest(Z=T)},this.setOpaqueSort=function(T){H=T},this.setTransparentSort=function(T){ae=T},this.getClearColor=function(T){return T.copy(we.getClearColor())},this.setClearColor=function(){we.setClearColor(...arguments)},this.getClearAlpha=function(){return we.getClearAlpha()},this.setClearAlpha=function(){we.setClearAlpha(...arguments)},this.clear=function(T=!0,X=!0,ie=!0){let ee=0;if(T){let te=!1;if(V!==null){const Fe=V.texture.format;te=g.has(Fe)}if(te){const Fe=V.texture.type,We=m.has(Fe),Ue=we.getClearColor(),Ye=we.getClearAlpha(),Ke=Ue.r,ut=Ue.g,mt=Ue.b;We?(_[0]=Ke,_[1]=ut,_[2]=mt,_[3]=Ye,O.clearBufferuiv(O.COLOR,0,_)):(x[0]=Ke,x[1]=ut,x[2]=mt,x[3]=Ye,O.clearBufferiv(O.COLOR,0,x))}else ee|=O.COLOR_BUFFER_BIT}X&&(ee|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ie&&(ee|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ee!==0&&O.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),k=T},this.dispose=function(){t.removeEventListener("webglcontextlost",N,!1),t.removeEventListener("webglcontextrestored",j,!1),t.removeEventListener("webglcontextcreationerror",ye,!1),we.dispose(),he.dispose(),De.dispose(),R.dispose(),J.dispose(),Me.dispose(),Se.dispose(),le.dispose(),Ee.dispose(),U.dispose(),U.removeEventListener("sessionstart",ct),U.removeEventListener("sessionend",gt),kt.stop()};function N(T){T.preventDefault(),pa("WebGLRenderer: Context Lost."),D=!0}function j(){pa("WebGLRenderer: Context Restored."),D=!1;const T=Et.autoReset,X=Te.enabled,ie=Te.autoUpdate,ee=Te.needsUpdate,te=Te.type;ke(),Et.autoReset=T,Te.enabled=X,Te.autoUpdate=ie,Te.needsUpdate=ee,Te.type=te}function ye(T){qe("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Be(T){const X=T.target;X.removeEventListener("dispose",Be),Le(X)}function Le(T){pt(T),R.remove(T)}function pt(T){const X=R.get(T).programs;X!==void 0&&(X.forEach(function(ie){Ee.releaseProgram(ie)}),T.isShaderMaterial&&Ee.releaseShaderCache(T))}this.renderBufferDirect=function(T,X,ie,ee,te,Fe){X===null&&(X=ue);const We=te.isMesh&&te.matrixWorld.determinant()<0,Ue=ym(T,X,ie,ee,te);xe.setMaterial(ee,We);let Ye=ie.index,Ke=1;if(ee.wireframe===!0){if(Ye=ge.getWireframeAttribute(ie),Ye===void 0)return;Ke=2}const ut=ie.drawRange,mt=ie.attributes.position;let Je=ut.start*Ke,Pt=(ut.start+ut.count)*Ke;Fe!==null&&(Je=Math.max(Je,Fe.start*Ke),Pt=Math.min(Pt,(Fe.start+Fe.count)*Ke)),Ye!==null?(Je=Math.max(Je,0),Pt=Math.min(Pt,Ye.count)):mt!=null&&(Je=Math.max(Je,0),Pt=Math.min(Pt,mt.count));const Wt=Pt-Je;if(Wt<0||Wt===1/0)return;Se.setup(te,ee,Ue,ie,Ye);let Vt,Dt=lt;if(Ye!==null&&(Vt=oe.get(Ye),Dt=xt,Dt.setIndex(Vt)),te.isMesh)ee.wireframe===!0?(xe.setLineWidth(ee.wireframeLinewidth*Xe()),Dt.setMode(O.LINES)):Dt.setMode(O.TRIANGLES);else if(te.isLine){let hn=ee.linewidth;hn===void 0&&(hn=1),xe.setLineWidth(hn*Xe()),te.isLineSegments?Dt.setMode(O.LINES):te.isLineLoop?Dt.setMode(O.LINE_LOOP):Dt.setMode(O.LINE_STRIP)}else te.isPoints?Dt.setMode(O.POINTS):te.isSprite&&Dt.setMode(O.TRIANGLES);if(te.isBatchedMesh)if(ze.get("WEBGL_multi_draw"))Dt.renderMultiDraw(te._multiDrawStarts,te._multiDrawCounts,te._multiDrawCount);else{const hn=te._multiDrawStarts,He=te._multiDrawCounts,Nn=te._multiDrawCount,St=Ye?oe.get(Ye).bytesPerElement:1,Xn=R.get(ee).currentProgram.getUniforms();for(let ui=0;ui<Nn;ui++)Xn.setValue(O,"_gl_DrawID",ui),Dt.render(hn[ui]/St,He[ui])}else if(te.isInstancedMesh)Dt.renderInstances(Je,Wt,te.count);else if(ie.isInstancedBufferGeometry){const hn=ie._maxInstanceCount!==void 0?ie._maxInstanceCount:1/0,He=Math.min(ie.instanceCount,hn);Dt.renderInstances(Je,Wt,He)}else Dt.render(Je,Wt)};function _t(T,X,ie){T.transparent===!0&&T.side===_i&&T.forceSinglePass===!1?(T.side=Sn,T.needsUpdate=!0,ci(T,X,ie),T.side=ki,T.needsUpdate=!0,ci(T,X,ie),T.side=_i):ci(T,X,ie)}this.compile=function(T,X,ie=null){ie===null&&(ie=T),M=De.get(ie),M.init(X),b.push(M),ie.traverseVisible(function(te){te.isLight&&te.layers.test(X.layers)&&(M.pushLight(te),te.castShadow&&M.pushShadow(te))}),T!==ie&&T.traverseVisible(function(te){te.isLight&&te.layers.test(X.layers)&&(M.pushLight(te),te.castShadow&&M.pushShadow(te))}),M.setupLights();const ee=new Set;return T.traverse(function(te){if(!(te.isMesh||te.isPoints||te.isLine||te.isSprite))return;const Fe=te.material;if(Fe)if(Array.isArray(Fe))for(let We=0;We<Fe.length;We++){const Ue=Fe[We];_t(Ue,ie,te),ee.add(Ue)}else _t(Fe,ie,te),ee.add(Fe)}),M=b.pop(),ee},this.compileAsync=function(T,X,ie=null){const ee=this.compile(T,X,ie);return new Promise(te=>{function Fe(){if(ee.forEach(function(We){R.get(We).currentProgram.isReady()&&ee.delete(We)}),ee.size===0){te(T);return}setTimeout(Fe,10)}ze.get("KHR_parallel_shader_compile")!==null?Fe():setTimeout(Fe,10)})};let Ze=null;function It(T){Ze&&Ze(T)}function ct(){kt.stop()}function gt(){kt.start()}const kt=new rm;kt.setAnimationLoop(It),typeof self<"u"&&kt.setContext(self),this.setAnimationLoop=function(T){Ze=T,U.setAnimationLoop(T),T===null?kt.stop():kt.start()},U.addEventListener("sessionstart",ct),U.addEventListener("sessionend",gt),this.render=function(T,X){if(X!==void 0&&X.isCamera!==!0){qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;k!==null&&k.renderStart(T,X);const ie=U.enabled===!0&&U.isPresenting===!0,ee=E!==null&&(V===null||ie)&&E.begin(P,V);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),U.enabled===!0&&U.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(U.cameraAutoUpdate===!0&&U.updateCamera(X),X=U.getCamera()),T.isScene===!0&&T.onBeforeRender(P,T,X,V),M=De.get(T,b.length),M.init(X),M.state.textureUnits=S.getTextureUnits(),b.push(M),K.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),L.setFromProjectionMatrix(K,zn,X.reversedDepth),B=this.localClippingEnabled,F=Ve.init(this.clippingPlanes,B),w=he.get(T,C.length),w.init(),C.push(w),U.enabled===!0&&U.isPresenting===!0){const We=P.xr.getDepthSensingMesh();We!==null&&An(We,X,-1/0,P.sortObjects)}An(T,X,0,P.sortObjects),w.finish(),P.sortObjects===!0&&w.sort(H,ae),me=U.enabled===!1||U.isPresenting===!1||U.hasDepthSensing()===!1,me&&we.addToRenderList(w,T),this.info.render.frame++,F===!0&&Ve.beginShadows();const te=M.state.shadowsArray;if(Te.render(te,T,X),F===!0&&Ve.endShadows(),this.info.autoReset===!0&&this.info.reset(),(ee&&E.hasRenderPass())===!1){const We=w.opaque,Ue=w.transmissive;if(M.setupLights(),X.isArrayCamera){const Ye=X.cameras;if(Ue.length>0)for(let Ke=0,ut=Ye.length;Ke<ut;Ke++){const mt=Ye[Ke];tn(We,Ue,T,mt)}me&&we.render(T);for(let Ke=0,ut=Ye.length;Ke<ut;Ke++){const mt=Ye[Ke];Zn(w,T,mt,mt.viewport)}}else Ue.length>0&&tn(We,Ue,T,X),me&&we.render(T),Zn(w,T,X)}V!==null&&ne===0&&(S.updateMultisampleRenderTarget(V),S.updateRenderTargetMipmap(V)),ee&&E.end(P),T.isScene===!0&&T.onAfterRender(P,T,X),Se.resetDefaultState(),$=-1,q=null,b.pop(),b.length>0?(M=b[b.length-1],S.setTextureUnits(M.state.textureUnits),F===!0&&Ve.setGlobalState(P.clippingPlanes,M.state.camera)):M=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,k!==null&&k.renderEnd()};function An(T,X,ie,ee){if(T.visible===!1)return;if(T.layers.test(X.layers)){if(T.isGroup)ie=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(X);else if(T.isLightProbeGrid)M.pushLightProbeGrid(T);else if(T.isLight)M.pushLight(T),T.castShadow&&M.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||L.intersectsSprite(T)){ee&&se.setFromMatrixPosition(T.matrixWorld).applyMatrix4(K);const We=Me.update(T),Ue=T.material;Ue.visible&&w.push(T,We,Ue,ie,se.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||L.intersectsObject(T))){const We=Me.update(T),Ue=T.material;if(ee&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),se.copy(T.boundingSphere.center)):(We.boundingSphere===null&&We.computeBoundingSphere(),se.copy(We.boundingSphere.center)),se.applyMatrix4(T.matrixWorld).applyMatrix4(K)),Array.isArray(Ue)){const Ye=We.groups;for(let Ke=0,ut=Ye.length;Ke<ut;Ke++){const mt=Ye[Ke],Je=Ue[mt.materialIndex];Je&&Je.visible&&w.push(T,We,Je,ie,se.z,mt)}}else Ue.visible&&w.push(T,We,Ue,ie,se.z,null)}}const Fe=T.children;for(let We=0,Ue=Fe.length;We<Ue;We++)An(Fe[We],X,ie,ee)}function Zn(T,X,ie,ee){const{opaque:te,transmissive:Fe,transparent:We}=T;M.setupLightsView(ie),F===!0&&Ve.setGlobalState(P.clippingPlanes,ie),ee&&xe.viewport(ce.copy(ee)),te.length>0&&Ht(te,X,ie),Fe.length>0&&Ht(Fe,X,ie),We.length>0&&Ht(We,X,ie),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function tn(T,X,ie,ee){if((ie.isScene===!0?ie.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[ee.id]===void 0){const Je=ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[ee.id]=new Hn(1,1,{generateMipmaps:!0,type:Je?Ei:Pn,minFilter:yi,samples:Math.max(4,Qe.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:vt.workingColorSpace})}const Fe=M.state.transmissionRenderTarget[ee.id],We=ee.viewport||ce;Fe.setSize(We.z*P.transmissionResolutionScale,We.w*P.transmissionResolutionScale);const Ue=P.getRenderTarget(),Ye=P.getActiveCubeFace(),Ke=P.getActiveMipmapLevel();P.setRenderTarget(Fe),P.getClearColor(Ae),Oe=P.getClearAlpha(),Oe<1&&P.setClearColor(16777215,.5),P.clear(),me&&we.render(ie);const ut=P.toneMapping;P.toneMapping=si;const mt=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),M.setupLightsView(ee),F===!0&&Ve.setGlobalState(P.clippingPlanes,ee),Ht(T,ie,ee),S.updateMultisampleRenderTarget(Fe),S.updateRenderTargetMipmap(Fe),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let Pt=0,Wt=X.length;Pt<Wt;Pt++){const Vt=X[Pt],{object:Dt,geometry:hn,material:He,group:Nn}=Vt;if(He.side===_i&&Dt.layers.test(ee.layers)){const St=He.side;He.side=Sn,He.needsUpdate=!0,Kn(Dt,ie,ee,hn,He,Nn),He.side=St,He.needsUpdate=!0,Je=!0}}Je===!0&&(S.updateMultisampleRenderTarget(Fe),S.updateRenderTargetMipmap(Fe))}P.setRenderTarget(Ue,Ye,Ke),P.setClearColor(Ae,Oe),mt!==void 0&&(ee.viewport=mt),P.toneMapping=ut}function Ht(T,X,ie){const ee=X.isScene===!0?X.overrideMaterial:null;for(let te=0,Fe=T.length;te<Fe;te++){const We=T[te],{object:Ue,geometry:Ye,group:Ke}=We;let ut=We.material;ut.allowOverride===!0&&ee!==null&&(ut=ee),Ue.layers.test(ie.layers)&&Kn(Ue,X,ie,Ye,ut,Ke)}}function Kn(T,X,ie,ee,te,Fe){T.onBeforeRender(P,X,ie,ee,te,Fe),T.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),te.onBeforeRender(P,X,ie,ee,T,Fe),te.transparent===!0&&te.side===_i&&te.forceSinglePass===!1?(te.side=Sn,te.needsUpdate=!0,P.renderBufferDirect(ie,X,ee,te,T,Fe),te.side=ki,te.needsUpdate=!0,P.renderBufferDirect(ie,X,ee,te,T,Fe),te.side=_i):P.renderBufferDirect(ie,X,ee,te,T,Fe),T.onAfterRender(P,X,ie,ee,te,Fe)}function ci(T,X,ie){X.isScene!==!0&&(X=ue);const ee=R.get(T),te=M.state.lights,Fe=M.state.shadowsArray,We=te.state.version,Ue=Ee.getParameters(T,te.state,Fe,X,ie,M.state.lightProbeGridArray),Ye=Ee.getProgramCacheKey(Ue);let Ke=ee.programs;ee.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?X.environment:null,ee.fog=X.fog;const ut=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;ee.envMap=J.get(T.envMap||ee.environment,ut),ee.envMapRotation=ee.environment!==null&&T.envMap===null?X.environmentRotation:T.envMapRotation,Ke===void 0&&(T.addEventListener("dispose",Be),Ke=new Map,ee.programs=Ke);let mt=Ke.get(Ye);if(mt!==void 0){if(ee.currentProgram===mt&&ee.lightsStateVersion===We)return Ad(T,Ue),mt}else Ue.uniforms=Ee.getUniforms(T),k!==null&&T.isNodeMaterial&&k.build(T,ie,Ue),T.onBeforeCompile(Ue,P),mt=Ee.acquireProgram(Ue,Ye),Ke.set(Ye,mt),ee.uniforms=Ue.uniforms;const Je=ee.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Je.clippingPlanes=Ve.uniform),Ad(T,Ue),ee.needsLights=Mm(T),ee.lightsStateVersion=We,ee.needsLights&&(Je.ambientLightColor.value=te.state.ambient,Je.lightProbe.value=te.state.probe,Je.directionalLights.value=te.state.directional,Je.directionalLightShadows.value=te.state.directionalShadow,Je.spotLights.value=te.state.spot,Je.spotLightShadows.value=te.state.spotShadow,Je.rectAreaLights.value=te.state.rectArea,Je.ltc_1.value=te.state.rectAreaLTC1,Je.ltc_2.value=te.state.rectAreaLTC2,Je.pointLights.value=te.state.point,Je.pointLightShadows.value=te.state.pointShadow,Je.hemisphereLights.value=te.state.hemi,Je.directionalShadowMatrix.value=te.state.directionalShadowMatrix,Je.spotLightMatrix.value=te.state.spotLightMatrix,Je.spotLightMap.value=te.state.spotLightMap,Je.pointShadowMatrix.value=te.state.pointShadowMatrix),ee.lightProbeGrid=M.state.lightProbeGridArray.length>0,ee.currentProgram=mt,ee.uniformsList=null,mt}function Td(T){if(T.uniformsList===null){const X=T.currentProgram.getUniforms();T.uniformsList=Ro.seqWithValue(X.seq,T.uniforms)}return T.uniformsList}function Ad(T,X){const ie=R.get(T);ie.outputColorSpace=X.outputColorSpace,ie.batching=X.batching,ie.batchingColor=X.batchingColor,ie.instancing=X.instancing,ie.instancingColor=X.instancingColor,ie.instancingMorph=X.instancingMorph,ie.skinning=X.skinning,ie.morphTargets=X.morphTargets,ie.morphNormals=X.morphNormals,ie.morphColors=X.morphColors,ie.morphTargetsCount=X.morphTargetsCount,ie.numClippingPlanes=X.numClippingPlanes,ie.numIntersection=X.numClipIntersection,ie.vertexAlphas=X.vertexAlphas,ie.vertexTangents=X.vertexTangents,ie.toneMapping=X.toneMapping}function xm(T,X){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;y.setFromMatrixPosition(X.matrixWorld);for(let ie=0,ee=T.length;ie<ee;ie++){const te=T[ie];if(te.texture!==null&&te.boundingBox.containsPoint(y))return te}return null}function ym(T,X,ie,ee,te){X.isScene!==!0&&(X=ue),S.resetTextureUnits();const Fe=X.fog,We=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial?X.environment:null,Ue=V===null?P.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:vt.workingColorSpace,Ye=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial&&!ee.envMap||ee.isMeshPhongMaterial&&!ee.envMap,Ke=J.get(ee.envMap||We,Ye),ut=ee.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,mt=!!ie.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),Je=!!ie.morphAttributes.position,Pt=!!ie.morphAttributes.normal,Wt=!!ie.morphAttributes.color;let Vt=si;ee.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(Vt=P.toneMapping);const Dt=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,hn=Dt!==void 0?Dt.length:0,He=R.get(ee),Nn=M.state.lights;if(F===!0&&(B===!0||T!==q)){const Ft=T===q&&ee.id===$;Ve.setState(ee,T,Ft)}let St=!1;ee.version===He.__version?(He.needsLights&&He.lightsStateVersion!==Nn.state.version||He.outputColorSpace!==Ue||te.isBatchedMesh&&He.batching===!1||!te.isBatchedMesh&&He.batching===!0||te.isBatchedMesh&&He.batchingColor===!0&&te.colorTexture===null||te.isBatchedMesh&&He.batchingColor===!1&&te.colorTexture!==null||te.isInstancedMesh&&He.instancing===!1||!te.isInstancedMesh&&He.instancing===!0||te.isSkinnedMesh&&He.skinning===!1||!te.isSkinnedMesh&&He.skinning===!0||te.isInstancedMesh&&He.instancingColor===!0&&te.instanceColor===null||te.isInstancedMesh&&He.instancingColor===!1&&te.instanceColor!==null||te.isInstancedMesh&&He.instancingMorph===!0&&te.morphTexture===null||te.isInstancedMesh&&He.instancingMorph===!1&&te.morphTexture!==null||He.envMap!==Ke||ee.fog===!0&&He.fog!==Fe||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==Ve.numPlanes||He.numIntersection!==Ve.numIntersection)||He.vertexAlphas!==ut||He.vertexTangents!==mt||He.morphTargets!==Je||He.morphNormals!==Pt||He.morphColors!==Wt||He.toneMapping!==Vt||He.morphTargetsCount!==hn||!!He.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(St=!0):(St=!0,He.__version=ee.version);let Xn=He.currentProgram;St===!0&&(Xn=ci(ee,X,te),k&&ee.isNodeMaterial&&k.onUpdateProgram(ee,Xn,He));let ui=!1,Hi=!1,Gs=!1;const Ut=Xn.getUniforms(),Xt=He.uniforms;if(xe.useProgram(Xn.program)&&(ui=!0,Hi=!0,Gs=!0),ee.id!==$&&($=ee.id,Hi=!0),He.needsLights){const Ft=xm(M.state.lightProbeGridArray,te);He.lightProbeGrid!==Ft&&(He.lightProbeGrid=Ft,Hi=!0)}if(ui||q!==T){xe.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Ut.setValue(O,"projectionMatrix",T.projectionMatrix),Ut.setValue(O,"viewMatrix",T.matrixWorldInverse);const Xi=Ut.map.cameraPosition;Xi!==void 0&&Xi.setValue(O,W.setFromMatrixPosition(T.matrixWorld)),Qe.logarithmicDepthBuffer&&Ut.setValue(O,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&Ut.setValue(O,"isOrthographic",T.isOrthographicCamera===!0),q!==T&&(q=T,Hi=!0,Gs=!0)}if(He.needsLights&&(Nn.state.directionalShadowMap.length>0&&Ut.setValue(O,"directionalShadowMap",Nn.state.directionalShadowMap,S),Nn.state.spotShadowMap.length>0&&Ut.setValue(O,"spotShadowMap",Nn.state.spotShadowMap,S),Nn.state.pointShadowMap.length>0&&Ut.setValue(O,"pointShadowMap",Nn.state.pointShadowMap,S)),te.isSkinnedMesh){Ut.setOptional(O,te,"bindMatrix"),Ut.setOptional(O,te,"bindMatrixInverse");const Ft=te.skeleton;Ft&&(Ft.boneTexture===null&&Ft.computeBoneTexture(),Ut.setValue(O,"boneTexture",Ft.boneTexture,S))}te.isBatchedMesh&&(Ut.setOptional(O,te,"batchingTexture"),Ut.setValue(O,"batchingTexture",te._matricesTexture,S),Ut.setOptional(O,te,"batchingIdTexture"),Ut.setValue(O,"batchingIdTexture",te._indirectTexture,S),Ut.setOptional(O,te,"batchingColorTexture"),te._colorsTexture!==null&&Ut.setValue(O,"batchingColorTexture",te._colorsTexture,S));const Wi=ie.morphAttributes;if((Wi.position!==void 0||Wi.normal!==void 0||Wi.color!==void 0)&&rt.update(te,ie,Xn),(Hi||He.receiveShadow!==te.receiveShadow)&&(He.receiveShadow=te.receiveShadow,Ut.setValue(O,"receiveShadow",te.receiveShadow)),(ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial)&&ee.envMap===null&&X.environment!==null&&(Xt.envMapIntensity.value=X.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=gS()),Hi){if(Ut.setValue(O,"toneMappingExposure",P.toneMappingExposure),He.needsLights&&bm(Xt,Gs),Fe&&ee.fog===!0&&re.refreshFogUniforms(Xt,Fe),re.refreshMaterialUniforms(Xt,ee,tt,ht,M.state.transmissionRenderTarget[T.id]),He.needsLights&&He.lightProbeGrid){const Ft=He.lightProbeGrid;Xt.probesSH.value=Ft.texture,Xt.probesMin.value.copy(Ft.boundingBox.min),Xt.probesMax.value.copy(Ft.boundingBox.max),Xt.probesResolution.value.copy(Ft.resolution)}Ro.upload(O,Td(He),Xt,S)}if(ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(Ro.upload(O,Td(He),Xt,S),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&Ut.setValue(O,"center",te.center),Ut.setValue(O,"modelViewMatrix",te.modelViewMatrix),Ut.setValue(O,"normalMatrix",te.normalMatrix),Ut.setValue(O,"modelMatrix",te.matrixWorld),ee.uniformsGroups!==void 0){const Ft=ee.uniformsGroups;for(let Xi=0,Hs=Ft.length;Xi<Hs;Xi++){const Cd=Ft[Xi];le.update(Cd,Xn),le.bind(Cd,Xn)}}return Xn}function bm(T,X){T.ambientLightColor.needsUpdate=X,T.lightProbe.needsUpdate=X,T.directionalLights.needsUpdate=X,T.directionalLightShadows.needsUpdate=X,T.pointLights.needsUpdate=X,T.pointLightShadows.needsUpdate=X,T.spotLights.needsUpdate=X,T.spotLightShadows.needsUpdate=X,T.rectAreaLights.needsUpdate=X,T.hemisphereLights.needsUpdate=X}function Mm(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return Q},this.getActiveMipmapLevel=function(){return ne},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(T,X,ie){const ee=R.get(T);ee.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),R.get(T.texture).__webglTexture=X,R.get(T.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:ie,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,X){const ie=R.get(T);ie.__webglFramebuffer=X,ie.__useDefaultFramebuffer=X===void 0};const Sm=O.createFramebuffer();this.setRenderTarget=function(T,X=0,ie=0){V=T,Q=X,ne=ie;let ee=null,te=!1,Fe=!1;if(T){const Ue=R.get(T);if(Ue.__useDefaultFramebuffer!==void 0){xe.bindFramebuffer(O.FRAMEBUFFER,Ue.__webglFramebuffer),ce.copy(T.viewport),ve.copy(T.scissor),be=T.scissorTest,xe.viewport(ce),xe.scissor(ve),xe.setScissorTest(be),$=-1;return}else if(Ue.__webglFramebuffer===void 0)S.setupRenderTarget(T);else if(Ue.__hasExternalTextures)S.rebindTextures(T,R.get(T.texture).__webglTexture,R.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const ut=T.depthTexture;if(Ue.__boundDepthTexture!==ut){if(ut!==null&&R.has(ut)&&(T.width!==ut.image.width||T.height!==ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");S.setupDepthRenderbuffer(T)}}const Ye=T.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(Fe=!0);const Ke=R.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ke[X])?ee=Ke[X][ie]:ee=Ke[X],te=!0):T.samples>0&&S.useMultisampledRTT(T)===!1?ee=R.get(T).__webglMultisampledFramebuffer:Array.isArray(Ke)?ee=Ke[ie]:ee=Ke,ce.copy(T.viewport),ve.copy(T.scissor),be=T.scissorTest}else ce.copy(de).multiplyScalar(tt).floor(),ve.copy(_e).multiplyScalar(tt).floor(),be=Z;if(ie!==0&&(ee=Sm),xe.bindFramebuffer(O.FRAMEBUFFER,ee)&&xe.drawBuffers(T,ee),xe.viewport(ce),xe.scissor(ve),xe.setScissorTest(be),te){const Ue=R.get(T.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ue.__webglTexture,ie)}else if(Fe){const Ue=X;for(let Ye=0;Ye<T.textures.length;Ye++){const Ke=R.get(T.textures[Ye]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Ye,Ke.__webglTexture,ie,Ue)}}else if(T!==null&&ie!==0){const Ue=R.get(T.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ue.__webglTexture,ie)}$=-1},this.readRenderTargetPixels=function(T,X,ie,ee,te,Fe,We,Ue=0){if(!(T&&T.isWebGLRenderTarget)){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ye=R.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&We!==void 0&&(Ye=Ye[We]),Ye){xe.bindFramebuffer(O.FRAMEBUFFER,Ye);try{const Ke=T.textures[Ue],ut=Ke.format,mt=Ke.type;if(T.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Ue),!Qe.textureFormatReadable(ut)){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Qe.textureTypeReadable(mt)){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=T.width-ee&&ie>=0&&ie<=T.height-te&&O.readPixels(X,ie,ee,te,z.convert(ut),z.convert(mt),Fe)}finally{const Ke=V!==null?R.get(V).__webglFramebuffer:null;xe.bindFramebuffer(O.FRAMEBUFFER,Ke)}}},this.readRenderTargetPixelsAsync=async function(T,X,ie,ee,te,Fe,We,Ue=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ye=R.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&We!==void 0&&(Ye=Ye[We]),Ye)if(X>=0&&X<=T.width-ee&&ie>=0&&ie<=T.height-te){xe.bindFramebuffer(O.FRAMEBUFFER,Ye);const Ke=T.textures[Ue],ut=Ke.format,mt=Ke.type;if(T.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Ue),!Qe.textureFormatReadable(ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Qe.textureTypeReadable(mt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Je=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Je),O.bufferData(O.PIXEL_PACK_BUFFER,Fe.byteLength,O.STREAM_READ),O.readPixels(X,ie,ee,te,z.convert(ut),z.convert(mt),0);const Pt=V!==null?R.get(V).__webglFramebuffer:null;xe.bindFramebuffer(O.FRAMEBUFFER,Pt);const Wt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await wg(O,Wt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Je),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Fe),O.deleteBuffer(Je),O.deleteSync(Wt),Fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,X=null,ie=0){const ee=Math.pow(2,-ie),te=Math.floor(T.image.width*ee),Fe=Math.floor(T.image.height*ee),We=X!==null?X.x:0,Ue=X!==null?X.y:0;S.setTexture2D(T,0),O.copyTexSubImage2D(O.TEXTURE_2D,ie,0,0,We,Ue,te,Fe),xe.unbindTexture()};const wm=O.createFramebuffer(),Em=O.createFramebuffer();this.copyTextureToTexture=function(T,X,ie=null,ee=null,te=0,Fe=0){let We,Ue,Ye,Ke,ut,mt,Je,Pt,Wt;const Vt=T.isCompressedTexture?T.mipmaps[Fe]:T.image;if(ie!==null)We=ie.max.x-ie.min.x,Ue=ie.max.y-ie.min.y,Ye=ie.isBox3?ie.max.z-ie.min.z:1,Ke=ie.min.x,ut=ie.min.y,mt=ie.isBox3?ie.min.z:0;else{const Xt=Math.pow(2,-te);We=Math.floor(Vt.width*Xt),Ue=Math.floor(Vt.height*Xt),T.isDataArrayTexture?Ye=Vt.depth:T.isData3DTexture?Ye=Math.floor(Vt.depth*Xt):Ye=1,Ke=0,ut=0,mt=0}ee!==null?(Je=ee.x,Pt=ee.y,Wt=ee.z):(Je=0,Pt=0,Wt=0);const Dt=z.convert(X.format),hn=z.convert(X.type);let He;X.isData3DTexture?(S.setTexture3D(X,0),He=O.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(S.setTexture2DArray(X,0),He=O.TEXTURE_2D_ARRAY):(S.setTexture2D(X,0),He=O.TEXTURE_2D),xe.activeTexture(O.TEXTURE0),xe.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,X.flipY),xe.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),xe.pixelStorei(O.UNPACK_ALIGNMENT,X.unpackAlignment);const Nn=xe.getParameter(O.UNPACK_ROW_LENGTH),St=xe.getParameter(O.UNPACK_IMAGE_HEIGHT),Xn=xe.getParameter(O.UNPACK_SKIP_PIXELS),ui=xe.getParameter(O.UNPACK_SKIP_ROWS),Hi=xe.getParameter(O.UNPACK_SKIP_IMAGES);xe.pixelStorei(O.UNPACK_ROW_LENGTH,Vt.width),xe.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Vt.height),xe.pixelStorei(O.UNPACK_SKIP_PIXELS,Ke),xe.pixelStorei(O.UNPACK_SKIP_ROWS,ut),xe.pixelStorei(O.UNPACK_SKIP_IMAGES,mt);const Gs=T.isDataArrayTexture||T.isData3DTexture,Ut=X.isDataArrayTexture||X.isData3DTexture;if(T.isDepthTexture){const Xt=R.get(T),Wi=R.get(X),Ft=R.get(Xt.__renderTarget),Xi=R.get(Wi.__renderTarget);xe.bindFramebuffer(O.READ_FRAMEBUFFER,Ft.__webglFramebuffer),xe.bindFramebuffer(O.DRAW_FRAMEBUFFER,Xi.__webglFramebuffer);for(let Hs=0;Hs<Ye;Hs++)Gs&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,R.get(T).__webglTexture,te,mt+Hs),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,R.get(X).__webglTexture,Fe,Wt+Hs)),O.blitFramebuffer(Ke,ut,We,Ue,Je,Pt,We,Ue,O.DEPTH_BUFFER_BIT,O.NEAREST);xe.bindFramebuffer(O.READ_FRAMEBUFFER,null),xe.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(te!==0||T.isRenderTargetTexture||R.has(T)){const Xt=R.get(T),Wi=R.get(X);xe.bindFramebuffer(O.READ_FRAMEBUFFER,wm),xe.bindFramebuffer(O.DRAW_FRAMEBUFFER,Em);for(let Ft=0;Ft<Ye;Ft++)Gs?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Xt.__webglTexture,te,mt+Ft):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Xt.__webglTexture,te),Ut?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Wi.__webglTexture,Fe,Wt+Ft):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Wi.__webglTexture,Fe),te!==0?O.blitFramebuffer(Ke,ut,We,Ue,Je,Pt,We,Ue,O.COLOR_BUFFER_BIT,O.NEAREST):Ut?O.copyTexSubImage3D(He,Fe,Je,Pt,Wt+Ft,Ke,ut,We,Ue):O.copyTexSubImage2D(He,Fe,Je,Pt,Ke,ut,We,Ue);xe.bindFramebuffer(O.READ_FRAMEBUFFER,null),xe.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Ut?T.isDataTexture||T.isData3DTexture?O.texSubImage3D(He,Fe,Je,Pt,Wt,We,Ue,Ye,Dt,hn,Vt.data):X.isCompressedArrayTexture?O.compressedTexSubImage3D(He,Fe,Je,Pt,Wt,We,Ue,Ye,Dt,Vt.data):O.texSubImage3D(He,Fe,Je,Pt,Wt,We,Ue,Ye,Dt,hn,Vt):T.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Fe,Je,Pt,We,Ue,Dt,hn,Vt.data):T.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Fe,Je,Pt,Vt.width,Vt.height,Dt,Vt.data):O.texSubImage2D(O.TEXTURE_2D,Fe,Je,Pt,We,Ue,Dt,hn,Vt);xe.pixelStorei(O.UNPACK_ROW_LENGTH,Nn),xe.pixelStorei(O.UNPACK_IMAGE_HEIGHT,St),xe.pixelStorei(O.UNPACK_SKIP_PIXELS,Xn),xe.pixelStorei(O.UNPACK_SKIP_ROWS,ui),xe.pixelStorei(O.UNPACK_SKIP_IMAGES,Hi),Fe===0&&X.generateMipmaps&&O.generateMipmap(He),xe.unbindTexture()},this.initRenderTarget=function(T){R.get(T).__webglFramebuffer===void 0&&S.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?S.setTextureCube(T,0):T.isData3DTexture?S.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?S.setTexture2DArray(T,0):S.setTexture2D(T,0),xe.unbindTexture()},this.resetState=function(){Q=0,ne=0,V=null,xe.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=vt._getDrawingBufferColorSpace(e),t.unpackColorSpace=vt._getUnpackColorSpace()}}const vS=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Iu,AddEquation:es,AddOperation:Wf,AdditiveAnimationBlendMode:Vu,AdditiveBlending:au,AgXToneMapping:Lu,AlphaFormat:Bu,AlwaysCompare:np,AlwaysDepth:Uo,AlwaysStencilFunc:du,AmbientLight:qp,AnimationAction:nm,AnimationClip:ya,AnimationLoader:mv,AnimationMixer:Xv,AnimationObjectGroup:Hv,AnimationUtils:dv,ArcCurve:xp,ArrayCamera:jp,ArrowHelper:m_,AttachedBindMode:cu,Audio:em,AudioAnalyser:Dv,AudioContext:md,AudioListener:Iv,AudioLoader:Tv,AxesHelper:g_,BackSide:Sn,BasicDepthPacking:Zf,BasicShadowMap:Pm,BatchedMesh:fp,BezierInterpolant:zp,Bone:Yu,BooleanKeyframeTrack:zs,Box2:e_,Box3:Jt,Box3Helper:f_,BoxGeometry:cs,BoxHelper:h_,BufferAttribute:Lt,BufferGeometry:ot,BufferGeometryLoader:Kp,ByteType:Nu,Cache:bi,Camera:ic,CameraHelper:d_,CanvasTexture:I0,CapsuleGeometry:Xl,CatmullRomCurve3:yp,CineonToneMapping:Ru,CircleGeometry:$l,ClampToEdgeWrapping:Dn,Clock:Jv,Color:Ne,ColorKeyframeTrack:ud,ColorManagement:vt,Compatibility:xg,CompressedArrayTexture:C0,CompressedCubeTexture:R0,CompressedTexture:Wl,CompressedTextureLoader:gv,ConeGeometry:Bs,ConstantAlphaFactor:Vf,ConstantColorFactor:Bf,Controls:__,CubeCamera:Jp,CubeDepthTexture:vp,CubeReflectionMapping:wi,CubeRefractionMapping:ss,CubeTexture:Ea,CubeTextureLoader:vv,CubeUVReflectionMapping:Sr,CubicBezierCurve:ju,CubicBezierCurve3:bp,CubicInterpolant:kp,CullFaceBack:ru,CullFaceFront:Sf,CullFaceFrontBack:Im,CullFaceNone:Mf,Curve:li,CurvePath:Sp,CustomBlending:Ef,CustomToneMapping:Pu,CylinderGeometry:Ta,Cylindrical:Qv,Data3DTexture:Ol,DataArrayTexture:Fl,DataTexture:ri,DataTextureLoader:_v,DataUtils:t0,DecrementStencilOp:Km,DecrementWrapStencilOp:jm,DefaultLoadingManager:Gp,DepthFormat:Ti,DepthStencilFormat:ts,DepthTexture:Fs,DetachedBindMode:Xf,DirectionalLight:$p,DirectionalLightHelper:u_,DiscreteInterpolant:Bp,DodecahedronGeometry:ql,DoubleSide:_i,DstAlphaFactor:Uf,DstColorFactor:Ff,DynamicCopyUsage:fg,DynamicDrawUsage:og,DynamicReadUsage:ug,EdgesGeometry:_p,EllipseCurve:Yl,EqualCompare:Qf,EqualDepth:Fo,EqualStencilFunc:ng,EquirectangularReflectionMapping:Yr,EquirectangularRefractionMapping:Zr,Euler:ai,EventDispatcher:oi,ExternalTexture:Ku,ExtrudeGeometry:Zl,FileLoader:zi,Float16BufferAttribute:l0,Float32BufferAttribute:Ge,FloatType:bn,Fog:zl,FogExp2:Bl,FramebufferTexture:A0,FrontSide:ki,Frustum:Er,FrustumArray:Hl,GLBufferAttribute:Zv,GLSL1:mg,GLSL3:hu,GreaterCompare:ep,GreaterDepth:ko,GreaterEqualCompare:Nl,GreaterEqualDepth:Oo,GreaterEqualStencilFunc:ag,GreaterStencilFunc:sg,GridHelper:l_,Group:mr,HTMLTexture:P0,HalfFloatType:Ei,HemisphereLight:Hp,HemisphereLightHelper:o_,IcosahedronGeometry:Kl,ImageBitmapLoader:Ev,ImageLoader:ba,ImageUtils:ap,IncrementStencilOp:Zm,IncrementWrapStencilOp:Jm,InstancedBufferAttribute:yr,InstancedBufferGeometry:pd,InstancedInterleavedBuffer:Sl,InstancedMesh:hp,Int16BufferAttribute:a0,Int32BufferAttribute:o0,Int8BufferAttribute:i0,IntType:Al,InterleavedBuffer:Vl,InterleavedBufferAttribute:Vn,Interpolant:Cr,InterpolateBezier:uu,InterpolateDiscrete:la,InterpolateLinear:gl,InterpolateSmooth:Ao,InterpolationSamplingMode:_g,InterpolationSamplingType:vg,InvertStencilOp:Qm,KeepStencilOp:ws,KeyframeTrack:Yn,LOD:up,LatheGeometry:Jl,Layers:kl,LessCompare:jf,LessDepth:No,LessEqualCompare:Ul,LessEqualDepth:Us,LessEqualStencilFunc:ig,LessStencilFunc:tg,Light:ds,LightProbe:Zp,Line:os,Line3:im,LineBasicMaterial:Tn,LineCurve:Qu,LineCurve3:Mp,LineDashedMaterial:Fp,LineLoop:pp,LineSegments:Ai,LinearFilter:Ot,LinearInterpolant:cd,LinearMipMapLinearFilter:Fm,LinearMipMapNearestFilter:Nm,LinearMipmapLinearFilter:yi,LinearMipmapNearestFilter:Kr,LinearSRGBColorSpace:ua,LinearToneMapping:Au,LinearTransfer:da,Loader:Un,LoaderUtils:vu,LoadingManager:dd,LoopOnce:$f,LoopPingPong:Yf,LoopRepeat:qf,MOUSE:Cm,Material:on,MaterialBlending:Lm,MaterialLoader:sc,MathUtils:_l,Matrix2:xu,Matrix3:at,Matrix4:it,MaxEquation:Rf,Mesh:Rt,MeshBasicMaterial:sn,MeshDepthMaterial:ad,MeshDistanceMaterial:od,MeshLambertMaterial:Up,MeshMatcapMaterial:Np,MeshNormalMaterial:Dp,MeshPhongMaterial:Pp,MeshPhysicalMaterial:Ip,MeshStandardMaterial:rd,MeshToonMaterial:Lp,MinEquation:Cf,MirroredRepeatWrapping:ra,MixOperation:Hf,MultiplyBlending:lu,MultiplyOperation:Sa,NearestFilter:Zt,NearestMipMapLinearFilter:Um,NearestMipMapNearestFilter:Dm,NearestMipmapLinearFilter:fr,NearestMipmapNearestFilter:Uu,NeutralToneMapping:Du,NeverCompare:Jf,NeverDepth:Do,NeverStencilFunc:eg,NoBlending:Si,NoColorSpace:Ui,NoNormalPacking:Wm,NoToneMapping:si,NormalAnimationBlendMode:Dl,NormalBlending:Is,NormalGAPacking:$m,NormalRGPacking:Xm,NotEqualCompare:tp,NotEqualDepth:Bo,NotEqualStencilFunc:rg,NumberKeyframeTrack:_a,Object3D:Mt,ObjectLoader:Sv,ObjectSpaceNormalMap:Kf,OctahedronGeometry:Tr,OneFactor:Pf,OneMinusConstantAlphaFactor:Gf,OneMinusConstantColorFactor:zf,OneMinusDstAlphaFactor:Nf,OneMinusDstColorFactor:Of,OneMinusSrcAlphaFactor:Lo,OneMinusSrcColorFactor:Df,OrthographicCamera:Ra,PCFShadowMap:qr,PCFSoftShadowMap:wf,PMREMGenerator:bu,Path:Ml,PerspectiveCamera:rn,Plane:Qi,PlaneGeometry:Ar,PlaneHelper:p_,PointLight:Xp,PointLightHelper:r_,Points:mp,PointsMaterial:Zu,PolarGridHelper:c_,PolyhedronGeometry:us,PositionalAudio:Lv,PropertyBinding:wt,PropertyMixer:tm,QuadraticBezierCurve:ed,QuadraticBezierCurve3:td,Quaternion:gn,QuaternionKeyframeTrack:Ca,QuaternionLinearInterpolant:Vp,R11_EAC_Format:qo,RED_GREEN_RGTC2_Format:oa,RED_RGTC1_Format:fl,REVISION:El,RG11_EAC_Format:aa,RGBADepthPacking:Vm,RGBAFormat:Mn,RGBAIntegerFormat:Ll,RGBA_ASTC_10x10_Format:ol,RGBA_ASTC_10x5_Format:sl,RGBA_ASTC_10x6_Format:rl,RGBA_ASTC_10x8_Format:al,RGBA_ASTC_12x10_Format:ll,RGBA_ASTC_12x12_Format:cl,RGBA_ASTC_4x4_Format:Ko,RGBA_ASTC_5x4_Format:Jo,RGBA_ASTC_5x5_Format:jo,RGBA_ASTC_6x5_Format:Qo,RGBA_ASTC_6x6_Format:el,RGBA_ASTC_8x5_Format:tl,RGBA_ASTC_8x6_Format:nl,RGBA_ASTC_8x8_Format:il,RGBA_BPTC_Format:ul,RGBA_ETC2_EAC_Format:$o,RGBA_PVRTC_2BPPV1_Format:Ho,RGBA_PVRTC_4BPPV1_Format:Go,RGBA_S3TC_DXT1_Format:jr,RGBA_S3TC_DXT3_Format:Qr,RGBA_S3TC_DXT5_Format:ea,RGBDepthPacking:Gm,RGBFormat:zu,RGBIntegerFormat:Om,RGB_BPTC_SIGNED_Format:dl,RGB_BPTC_UNSIGNED_Format:hl,RGB_ETC1_Format:Wo,RGB_ETC2_Format:Xo,RGB_PVRTC_2BPPV1_Format:Vo,RGB_PVRTC_4BPPV1_Format:zo,RGB_S3TC_DXT1_Format:Jr,RGDepthPacking:Hm,RGFormat:rs,RGIntegerFormat:Pl,RawShaderMaterial:sd,Ray:wr,Raycaster:Kv,RectAreaLight:Yp,RedFormat:Il,RedIntegerFormat:wa,ReinhardToneMapping:Cu,RenderTarget:Hu,RenderTarget3D:$v,RepeatWrapping:sa,ReplaceStencilOp:Ym,ReverseSubtractEquation:Af,RingGeometry:jl,SIGNED_R11_EAC_Format:Yo,SIGNED_RED_GREEN_RGTC2_Format:ml,SIGNED_RED_RGTC1_Format:pl,SIGNED_RG11_EAC_Format:Zo,SRGBColorSpace:In,SRGBTransfer:Ct,Scene:Wu,ShaderChunk:ft,ShaderLib:xn,ShaderMaterial:Wn,ShadowMaterial:Cp,Shape:Ls,ShapeGeometry:Ql,ShapePath:v_,ShapeUtils:ii,ShortType:Fu,Skeleton:Gl,SkeletonHelper:s_,SkinnedMesh:dp,Source:ns,Sphere:jt,SphereGeometry:ni,Spherical:jv,SphericalHarmonics3:fd,SplineCurve:nd,SpotLight:Wp,SpotLightHelper:i_,Sprite:cp,SpriteMaterial:qu,SrcAlphaFactor:Po,SrcAlphaSaturateFactor:kf,SrcColorFactor:Lf,StaticCopyUsage:hg,StaticDrawUsage:ha,StaticReadUsage:cg,StereoCamera:Av,StreamCopyUsage:pg,StreamDrawUsage:lg,StreamReadUsage:dg,StringKeyframeTrack:Vs,SubtractEquation:Tf,SubtractiveBlending:ou,TOUCH:Rm,TangentSpaceNormalMap:Bi,TetrahedronGeometry:Aa,Texture:zt,TextureLoader:xv,TextureUtils:S_,Timer:Qp,TimestampQuery:gg,TorusGeometry:ks,TorusKnotGeometry:ec,Triangle:Ln,TriangleFanDrawMode:zm,TriangleStripDrawMode:Bm,TrianglesDrawMode:km,TubeGeometry:tc,UVMapping:Tl,Uint16BufferAttribute:Xu,Uint32BufferAttribute:$u,Uint8BufferAttribute:s0,Uint8ClampedBufferAttribute:r0,Uniform:_d,UniformsGroup:Yv,UniformsLib:Re,UniformsUtils:nc,UnsignedByteType:Pn,UnsignedInt101111Type:ku,UnsignedInt248Type:_r,UnsignedInt5999Type:Ou,UnsignedIntType:qn,UnsignedShort4444Type:Cl,UnsignedShort5551Type:Rl,UnsignedShortType:vr,VSMShadowMap:hr,Vector2:pe,Vector3:I,Vector4:bt,VectorKeyframeTrack:xa,VideoFrameTexture:T0,VideoTexture:gp,WebGL3DRenderTarget:$g,WebGLArrayRenderTarget:Xg,WebGLCoordinateSystem:zn,WebGLCubeRenderTarget:xd,WebGLRenderTarget:Hn,WebGLRenderer:fm,WebGLUtils:dm,WebGPUCoordinateSystem:Ns,WebXRController:Co,WireframeGeometry:id,WrapAroundEnding:ca,ZeroCurvatureEnding:As,ZeroFactor:If,ZeroSlopeEnding:Cs,ZeroStencilOp:qm,createCanvasElement:sp,error:qe,getConsoleFunction:Sg,log:pa,setConsoleFunction:Mg,warn:Ce,warnOnce:vl},Symbol.toStringTag,{value:"Module"})),of=new Jt,So=new I;class pm extends pd{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new Ge(e,3)),this.setAttribute("uv",new Ge(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new Sl(t,6,1);return this.setAttribute("instanceStart",new Vn(n,3,0)),this.setAttribute("instanceEnd",new Vn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new Sl(t,6,1);return this.setAttribute("instanceColorStart",new Vn(n,3,0)),this.setAttribute("instanceColorEnd",new Vn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new id(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jt);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),of.setFromBufferAttribute(t),this.boundingBox.union(of))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jt),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)So.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(So)),So.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(So));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}Re.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new pe(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};xn.line={uniforms:nc.merge([Re.common,Re.fog,Re.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class oc extends Wn{constructor(e){super({type:"LineMaterial",uniforms:nc.clone(xn.line.uniforms),vertexShader:xn.line.vertexShader,fragmentShader:xn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const jc=new bt,lf=new I,cf=new I,ln=new bt,cn=new bt,gi=new bt,Qc=new I,eu=new it,un=new im,uf=new I,wo=new Jt,Eo=new jt,vi=new bt;let xi,Ds;function df(r,e,t){return vi.set(0,0,-e,1).applyMatrix4(r.projectionMatrix),vi.multiplyScalar(1/vi.w),vi.x=Ds/t.width,vi.y=Ds/t.height,vi.applyMatrix4(r.projectionMatrixInverse),vi.multiplyScalar(1/vi.w),Math.abs(Math.max(vi.x,vi.y))}function _S(r,e){const t=r.matrixWorld,n=r.geometry,i=n.attributes.instanceStart,s=n.attributes.instanceEnd,a=Math.min(n.instanceCount,i.count);for(let o=0,l=a;o<l;o++){un.start.fromBufferAttribute(i,o),un.end.fromBufferAttribute(s,o),un.applyMatrix4(t);const c=new I,u=new I;xi.distanceSqToSegment(un.start,un.end,u,c),u.distanceTo(c)<Ds*.5&&e.push({point:u,pointOnLine:c,distance:xi.origin.distanceTo(u),object:r,face:null,faceIndex:o,uv:null,uv1:null})}}function xS(r,e,t){const n=e.projectionMatrix,s=r.material.resolution,a=r.matrixWorld,o=r.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,u=Math.min(o.instanceCount,l.count),d=-e.near;xi.at(1,gi),gi.w=1,gi.applyMatrix4(e.matrixWorldInverse),gi.applyMatrix4(n),gi.multiplyScalar(1/gi.w),gi.x*=s.x/2,gi.y*=s.y/2,gi.z=0,Qc.copy(gi),eu.multiplyMatrices(e.matrixWorldInverse,a);for(let h=0,f=u;h<f;h++){if(ln.fromBufferAttribute(l,h),cn.fromBufferAttribute(c,h),ln.w=1,cn.w=1,ln.applyMatrix4(eu),cn.applyMatrix4(eu),ln.z>d&&cn.z>d)continue;if(ln.z>d){const x=ln.z-cn.z,y=(ln.z-d)/x;ln.lerp(cn,y)}else if(cn.z>d){const x=cn.z-ln.z,y=(cn.z-d)/x;cn.lerp(ln,y)}ln.applyMatrix4(n),cn.applyMatrix4(n),ln.multiplyScalar(1/ln.w),cn.multiplyScalar(1/cn.w),ln.x*=s.x/2,ln.y*=s.y/2,cn.x*=s.x/2,cn.y*=s.y/2,un.start.copy(ln),un.start.z=0,un.end.copy(cn),un.end.z=0;const v=un.closestPointToPointParameter(Qc,!0);un.at(v,uf);const g=_l.lerp(ln.z,cn.z,v),m=g>=-1&&g<=1,_=Qc.distanceTo(uf)<Ds*.5;if(m&&_){un.start.fromBufferAttribute(l,h),un.end.fromBufferAttribute(c,h),un.start.applyMatrix4(a),un.end.applyMatrix4(a);const x=new I,y=new I;xi.distanceSqToSegment(un.start,un.end,y,x),t.push({point:y,pointOnLine:x,distance:xi.origin.distanceTo(y),object:r,face:null,faceIndex:h,uv:null,uv1:null})}}}class yS extends Rt{constructor(e=new pm,t=new oc({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)lf.fromBufferAttribute(t,a),cf.fromBufferAttribute(n,a),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+lf.distanceTo(cf);const s=new Sl(i,2,1);return e.setAttribute("instanceDistanceStart",new Vn(s,1,0)),e.setAttribute("instanceDistanceEnd",new Vn(s,1,1)),this}raycast(e,t){const n=this.material.worldUnits,i=e.camera;i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;xi=e.ray;const a=this.matrixWorld,o=this.geometry,l=this.material;Ds=l.linewidth+s,o.boundingSphere===null&&o.computeBoundingSphere(),Eo.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=Ds*.5;else{const d=Math.max(i.near,Eo.distanceToPoint(xi.origin));c=df(i,d,l.resolution)}if(Eo.radius+=c,xi.intersectsSphere(Eo)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),wo.copy(o.boundingBox).applyMatrix4(a);let u;if(n)u=Ds*.5;else{const d=Math.max(i.near,wo.distanceToPoint(xi.origin));u=df(i,d,l.resolution)}wo.expandByScalar(u),xi.intersectsBox(wo)!==!1&&(n?_S(this,t):xS(this,i,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(jc),this.material.uniforms.resolution.value.set(jc.z,jc.w))}}class yd extends pm{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}setFromPoints(e){const t=e.length-1,n=new Float32Array(6*t);for(let i=0;i<t;i++)n[6*i]=e[i].x,n[6*i+1]=e[i].y,n[6*i+2]=e[i].z||0,n[6*i+3]=e[i+1].x,n[6*i+4]=e[i+1].y,n[6*i+5]=e[i+1].z||0;return super.setPositions(n),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class mm extends yS{constructor(e=new yd,t=new oc({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}class gm extends Mt{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new pe(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const dr=new I,hf=new it,ff=new it,pf=new I,mf=new I;class bS{constructor(e={}){const t=this;let n,i,s,a;const o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.sortObjects=!0,this.getSize=function(){return{width:n,height:i}},this.render=function(p,v){p.matrixWorldAutoUpdate===!0&&p.updateMatrixWorld(),v.parent===null&&v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),hf.copy(v.matrixWorldInverse),ff.multiplyMatrices(v.projectionMatrix,hf),u(p,p,v),this.sortObjects&&f(p)},this.setSize=function(p,v){n=p,i=v,s=n/2,a=i/2,l.style.width=p+"px",l.style.height=v+"px"};function c(p){p.isCSS2DObject&&(p.element.style.display="none");for(let v=0,g=p.children.length;v<g;v++)c(p.children[v])}function u(p,v,g){if(p.visible===!1){c(p);return}if(p.isCSS2DObject){dr.setFromMatrixPosition(p.matrixWorld),dr.applyMatrix4(ff);const m=dr.z>=-1&&dr.z<=1&&p.layers.test(g.layers)===!0,_=p.element;_.style.display=m===!0?"":"none",m===!0&&(p.onBeforeRender(t,v,g),_.style.transform="translate("+-100*p.center.x+"%,"+-100*p.center.y+"%)translate("+(dr.x*s+s)+"px,"+(-dr.y*a+a)+"px)",_.parentNode!==l&&l.appendChild(_),p.onAfterRender(t,v,g));const x={distanceToCameraSquared:d(g,p)};o.objects.set(p,x)}for(let m=0,_=p.children.length;m<_;m++)u(p.children[m],v,g)}function d(p,v){return pf.setFromMatrixPosition(p.matrixWorld),mf.setFromMatrixPosition(v.matrixWorld),pf.distanceToSquared(mf)}function h(p){const v=[];return p.traverseVisible(function(g){g.isCSS2DObject&&v.push(g)}),v}function f(p){const v=h(p).sort(function(m,_){if(m.renderOrder!==_.renderOrder)return _.renderOrder-m.renderOrder;const x=o.objects.get(m).distanceToCameraSquared,y=o.objects.get(_).distanceToCameraSquared;return x-y}),g=v.length;for(let m=0,_=v.length;m<_;m++)v[m].element.style.zIndex=g-m}}}const gf=Object.freeze(Object.defineProperty({__proto__:null,CSS2DObject:gm,CSS2DRenderer:bS},Symbol.toStringTag,{value:"Module"})),Fi={R0:.35,R1:1.6,R2:2.2,R3:3};function vm(r){const e=[];e.push({id:r.root.id,name:r.root.name,layer:0,position:new I(0,0,Fi.R0)});const t=r.lifelines.filter(i=>i.parent_id===r.root.id),n=t.length;return t.forEach((i,s)=>{const a=s/n*Math.PI*2,o=tu(Fi.R1,a,0);e.push({id:i.id,name:i.name,layer:1,position:o,parentId:r.root.id})}),r.lifelines.filter(i=>i.parent_id!==r.root.id).forEach(i=>{const s=e.find(f=>f.id===i.parent_id);if(!s)return;const a=r.lifelines.filter(f=>f.parent_id===i.parent_id),o=a.findIndex(f=>f.id===i.id),l=Math.atan2(s.position.y,s.position.x),c=Math.PI/4,u=o-(a.length-1)/2,d=l+u*(c/Math.max(a.length,1)),h=tu(Fi.R2,d,(Math.random()-.5)*.15);e.push({id:i.id,name:i.name,layer:2,position:h,parentId:i.parent_id})}),r.entities.forEach(i=>{const s=e.find(f=>f.id===i.lifeline_id);if(!s)return;const a=r.entities.filter(f=>f.lifeline_id===i.lifeline_id),o=a.findIndex(f=>f.id===i.id),l=Math.atan2(s.position.y,s.position.x),c=Math.PI/6,u=o-(a.length-1)/2,d=l+u*(c/Math.max(a.length,1)),h=tu(Fi.R3,d+(Math.random()-.5)*.08,(Math.random()-.5)*.12);e.push({id:i.id,name:i.title,layer:3,position:h,parentId:i.lifeline_id,kind:i.kind,meta:i.meta})}),e}function tu(r,e,t){const n=r*Math.cos(t)*Math.cos(e),i=r*Math.sin(t),s=r*Math.cos(t)*Math.sin(e);return new I(n,i,s)}function MS(r,e,t,n){const i=r.find(x=>x.id===e);if(!i)return{targets:new Map,constellationIds:new Set};const s=i.position.clone(),a=n.clone().normalize(),o=new I(0,1,0),l=new I().crossVectors(a,o);if(l.length()<.001){const x=new I(1,0,0);l.crossVectors(a,x).normalize()}else l.normalize();const c=new I().crossVectors(l,a).normalize(),u=new Map,d=new Set;u.set(e,s.clone()),d.add(e);const h=[];let f=i.parentId;for(;f&&h.length<2;){const x=r.find(y=>y.id===f);if(x)h.push(x),f=x.parentId;else break}h.forEach((x,y)=>{const w=s.clone().addScaledVector(a,.18+y*.14).addScaledVector(c,.06);u.set(x.id,w),d.add(x.id)});const p=r.filter(x=>x.id!==e&&x.layer===3&&x.parentId===i.parentId).slice(0,12);p.forEach((x,y)=>{const w=p.length===1?0:(y/(p.length-1)-.5)*(Math.PI*2/3),M=s.clone().addScaledVector(a,.12).addScaledVector(l,Math.cos(w)*.25).addScaledVector(c,Math.sin(w)*.25);u.set(x.id,M),d.add(x.id)});const v=new Set;for(const x of t)x.confidence>=.7&&x.status!=="rejected"&&(x.from===e&&v.add(x.to),x.to===e&&v.add(x.from));const g=r.filter(x=>v.has(x.id)&&!d.has(x.id)).slice(0,6);g.forEach((x,y)=>{const w=g.length===1?0:(y/(g.length-1)-.5)*(Math.PI/2),M=s.clone().addScaledVector(a,-.08).addScaledVector(l,Math.cos(w)*.22).addScaledVector(c,Math.sin(w)*.22);u.set(x.id,M),d.add(x.id)});const m=new Set;for(const x of t)x.confidence>=.3&&x.confidence<.7&&x.status!=="rejected"&&(x.from===e&&m.add(x.to),x.to===e&&m.add(x.from));const _=r.filter(x=>m.has(x.id)&&!d.has(x.id)).slice(0,6);return _.forEach((x,y)=>{const w=_.length===1?0:(y/(_.length-1)-.5)*(Math.PI*5/6),M=s.clone().addScaledVector(a,-.04).addScaledVector(l,Math.cos(w)*.38).addScaledVector(c,Math.sin(w)*.38);u.set(x.id,M),d.add(x.id)}),{targets:u,constellationIds:d}}const SS=Object.freeze(Object.defineProperty({__proto__:null,RADII:Fi,computeFocusLayout:MS,computeLayout:vm},Symbol.toStringTag,{value:"Module"}));function ei(r){const e=getComputedStyle(document.documentElement).getPropertyValue(r).trim();if(!e)return"#6ee7d0";const t=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);return t?"#"+[t[1],t[2],t[3]].map(n=>parseInt(n).toString(16).padStart(2,"0")).join(""):e}function wS(r){const e=[];for(const t of r)e.push(t.x,t.y,t.z);return e}async function ES(r,e){const t=new Wu;t.background=new Ne("#07090d");const n=r.clientWidth,i=r.clientHeight,s=new pe(n,i),a=new rn(60,n/i,.1,20);a.position.set(0,2.5,5.5),a.lookAt(0,0,0);const o=new fm({canvas:r,antialias:!0});o.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.setSize(n,i);const l=vm(e),c=[],u=[],d=[],h=[];for(const x of l){let y,w;const M=x.layer===0||x.layer===1?1:x.layer===2?.9:.85;if(x.layer===0)y=new ni(.06,16,16),w=new sn({color:ei("--accent")});else if(x.layer===1)y=new ni(.05,12,12),w=new sn({color:ei("--accent"),transparent:!0,opacity:M});else if(x.layer===2)y=new ni(.03,8,8),w=new sn({color:ei("--text-2"),transparent:!0,opacity:M});else{x.kind==="task"?y=new cs(.022,.022,.022):x.kind==="decision"?y=new Tr(.022):x.kind==="memory"?y=new ni(.02,8,8):x.kind==="item"?y=new Aa(.02):y=new ni(.015,8,8);const E={task:"--accent",memory:"--text-2",decision:"--warm",item:"--text-3"}[x.kind||""]||"--text-3";let P=M;x.kind==="task"&&x.meta&&(x.meta.status==="done"?P=.4:x.meta.status==="cancelled"?P=.25:x.meta.priority==="high"&&(P=.95)),w=new sn({color:ei(E),transparent:!0,opacity:P})}const C=new Rt(y,w);if(C.position.copy(x.position),C.userData={id:x.id,name:x.name,kind:x.kind,layer:x.layer,parentId:x.parentId,homePosition:x.position.clone(),targetPosition:x.position.clone()},x.layer===3&&x.kind==="task"&&x.meta&&(x.meta.status==="done"?C.scale.setScalar(.75):x.meta.status==="cancelled"&&C.scale.setScalar(.6)),t.add(C),c.push(C),u.push(C),x.layer===3){const b=new ni(.04,8,8),E=new sn({visible:!1}),P=new Rt(b,E);P.position.copy(x.position),P.userData=C.userData,u.push(P)}}for(const x of l){if(!x.parentId)continue;const y=l.find(P=>P.id===x.parentId);if(!y)continue;const w=8,M=[];for(let P=0;P<=w;P++){const D=P/w,k=new I().lerpVectors(y.position,x.position,D).normalize().multiplyScalar(y.position.length()*(1-D)+x.position.length()*D);M.push(k)}const C=new yd;C.setPositions(wS(M));const b=new oc({color:new Ne(ei("--line-2")),linewidth:1.5,worldUnits:!1,resolution:s,transparent:!0,opacity:.65,depthTest:!0});h.push(b);const E=new mm(C,b);E.computeLineDistances(),E.userData={fromLayer:y.layer,toLayer:x.layer},t.add(E),d.push(E)}const f=new ks(Fi.R1,.006,8,80),p=new Rt(f,new sn({color:ei("--line-2"),transparent:!0,opacity:.12}));p.rotation.x=_l.degToRad(15),t.add(p);const v=new ks(Fi.R2,.004,8,80),g=new Rt(v,new sn({color:ei("--line-2"),transparent:!0,opacity:.08}));g.rotation.x=_l.degToRad(15),t.add(g);function m(x,y){s.set(x,y),h.forEach(w=>{w.resolution.set(x,y)})}function _(){t.traverse(x=>{if(x instanceof Rt){x.geometry?.dispose();const y=x.material;y instanceof on&&(Array.isArray(y)?y.forEach(w=>w.dispose()):y.dispose())}}),d.forEach(x=>{x.geometry?.dispose()}),h.forEach(x=>x.dispose()),o.dispose()}return{scene:t,camera:a,renderer:o,nodes:c,pickables:u,lines:d,orbit:p,layoutNodes:l,dispose:_,setResolution:m}}const vf=1,TS=3.5;function AS(r){return Math.max(vf,Math.min(TS,vf+(r-.3)*3.57))}function CS(r,e,t,n){const i=new I().subVectors(e,r).normalize(),s=.03+n*.005,a=new Bs(s,s*2.5,6,1),o=new sn({color:new Ne(t)}),l=new Rt(a,o),c=e.clone().addScaledVector(i,-.04);l.position.copy(c);const u=new gn;return u.setFromUnitVectors(new I(0,1,0),i),l.setRotationFromQuaternion(u),l}function RS(r,e,t,n,i){const s=i||new pe(window.innerWidth,window.innerHeight),a=[],o=e.associations.filter(c=>(c.from===n||c.to===n)&&c.confidence>=.7).slice(0,20),l={co_occurrence:"--text-3",causal:"--accent",tension:"--warm",derived_from:"--accent-dim",manual:"--accent"};for(const c of o){const u=t.find(x=>x.id===c.from),d=t.find(x=>x.id===c.to);if(!u||!d)continue;const h=new yd;h.setPositions([u.position.x,u.position.y,u.position.z,d.position.x,d.position.y,d.position.z]);const f=AS(c.confidence),p=.5+(c.confidence-.5)*.8,v=ei(l[c.relation_type]||"--text-3"),g=new oc({color:new Ne(v),linewidth:f,worldUnits:!1,resolution:s,transparent:!0,opacity:c.status==="pending"?p*.8:p,depthTest:!1,dashed:c.status==="pending",dashSize:.06,gapSize:.04}),m=new mm(h,g);m.computeLineDistances(),m.userData={associationId:c.id,...c,_origLinewidth:f,_origColor:m.material.color.getHex()},r.add(m);let _;c.status==="accepted"&&(_=CS(u.position,d.position,v,f),r.add(_)),a.push({line:m,data:c,fromNode:u,toNode:d,arrow:_})}return a}function IS(r,e,t=.05){r.forEach(n=>{const i=n.userData.id,s=n.material;e.has(i)?(s.opacity=1,s.transparent=!0):(s.opacity=t,s.transparent=!0),s.needsUpdate=!0})}function _f(r){r.forEach(e=>{const t=e.userData.layer,n=t===0||t===1?1:t===2?.9:.85,i=e.material;i.opacity=n,i.transparent=!0,i.needsUpdate=!0})}function PS(r,e,t=6){const n=1-Math.exp(-t*e);for(const i of r){const s=i.userData.targetPosition;s&&i.position.lerp(s,n)}}function LS(r,e,t=.06){_m(r,e,t)}function _m(r,e,t=.06){for(const n of r){const i=n.userData.id,s=n.userData.layer,a=n.material;if(e.has(i)){const o=s===0||s===1?1:s===2?.9:.85;a.opacity=o}else a.opacity=t;a.transparent=!0,a.needsUpdate=!0}}function DS(r,e,t){const n=new ks(.04,.004,8,16),i=new sn({color:new Ne(t),transparent:!0,opacity:.5}),s=new Rt(n,i);return s.position.copy(e),s.name="focusHalo",s.renderOrder=999,s.material.depthTest=!1,s.material.depthWrite=!1,r.add(s),s}function nu(r){const e=r.getObjectByName("focusHalo");if(e&&(r.remove(e),e.geometry&&e.geometry.dispose(),e.material)){const t=e.material;Array.isArray(t)?t.forEach(n=>n.dispose()):t.dispose()}}const xf=[10551280,16771744,16752895,10526880];let wu=[],Eu=[];function US(r,e,t,n){Tu(n);const i=new Set(t.flatMap(a=>[...a.pathEntityIds])),s=new Set(t.flatMap(a=>[...a.pathAssocIds]));for(const a of r)if(a.userData.layer===3&&!i.has(a.userData.id)){const o=a.material;o.opacity=.3,o.transparent=!0,o.needsUpdate=!0}for(const a of e)s.has(a.data.id)||(a.line.material.opacity=.1);for(const a of t){const o=a.isCurrent?1.3:1.1,l=a.isCurrent?2:1;for(const c of r){const u=c.userData.id;if(!a.pathEntityIds.has(u))continue;const d=c.material;d._pathOrigColor=d._pathOrigColor??d.color.getHex(),u===a.startId?(c.scale.setScalar(1.5),d.color.set("#80ff80")):u===a.endId?(c.scale.setScalar(1.5),d.color.set("#ffaa44")):(c.scale.setScalar(o),d.color.set(a.color)),d.needsUpdate=!0}for(const c of e){if(!a.pathAssocIds.has(c.data.id))continue;const u=c.line.material;u._pathOrigLinewidth=u._pathOrigLinewidth??u.linewidth,u.linewidth=(u._pathOrigLinewidth||1.5)*l,u.opacity=1,a.isCurrent&&NS(c.fromNode,c.toNode,a.color,n)}}}function NS(r,e,t,n){const i=new I().addVectors(r.position,e.position).multiplyScalar(.5),s=new I().subVectors(e.position,r.position).normalize(),a=new Bs(.015,.04,6),o=new sn({color:t}),l=new Rt(a,o);l.position.copy(i),l.quaternion.setFromUnitVectors(new I(0,1,0),s),l.userData.isPathCone=!0,n.add(l),Eu.push(l)}function FS(r,e,t){for(let n=1;n<r.length-1;n++){const i=e.find(o=>o.userData.id===r[n]);if(!i)continue;const s=document.createElement("div");s.style.cssText="width:18px;height:18px;border-radius:50%;background:var(--accent);color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;",s.textContent=String(n);const a=new gm(s);a.position.copy(i.position.clone().add(new I(0,.05,0))),a.userData.isPathLabel=!0,t.add(a),wu.push(a)}}function Tu(r){for(const e of wu)r.remove(e);for(const e of Eu)r.remove(e),e.geometry?.dispose(),e.material.dispose();wu=[],Eu=[]}function yf(r,e){for(const t of r){const n=t.material;n._pathOrigColor!==void 0&&(n.color.setHex(n._pathOrigColor),delete n._pathOrigColor,t.scale.setScalar(1),n.needsUpdate=!0)}for(const t of e){const n=t.line.material;n._pathOrigLinewidth!==void 0&&(n.linewidth=n._pathOrigLinewidth,delete n._pathOrigLinewidth),n.opacity=n.opacity<.2?.8:n.opacity}}function OS(r){return r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2}let Bn=null;function To(r,e,t,n,i,s=800){Bn={elapsed:0,duration:s,from:{position:r.position.clone(),target:e.target.clone(),fov:r.fov},to:{position:t.clone(),target:n.clone(),fov:i}}}function kS(r,e,t){if(!Bn)return!1;Bn.elapsed+=r*1e3;const n=Math.min(Bn.elapsed/Bn.duration,1),i=OS(n);return e.position.lerpVectors(Bn.from.position,Bn.to.position,i),t.target.lerpVectors(Bn.from.target,Bn.to.target,i),e.fov=Bn.from.fov+(Bn.to.fov-Bn.from.fov)*i,e.updateProjectionMatrix(),n>=1?(Bn=null,!1):!0}const BS={class:"breadcrumb"},zS={key:0,class:"sep"},VS=["onClick"],GS={key:2,class:"crumb-current"},HS=En({__name:"Breadcrumb",props:{state:{}},emits:["nav"],setup(r,{emit:e}){const t=r,n=e,i=Gi(),s=At(()=>{const a=t.state,o=[{label:"Atlas",action:{kind:"global_overview"}}],l=a.kind==="region_zoom"?a.lifeline_id:a.kind==="node_focus"||a.kind==="relation_reveal"?i.data?.entities.find(d=>d.id===a.entity_id)?.lifeline_id:null;if(!l)return o;const c=[];let u=l;for(;u;){const d=i.data?.lifelines.find(f=>f.id===u);if(!d)break;const h=d.parent_id==="ROOT"?1:2;c.unshift({id:d.id,name:d.name,layer:h}),u=d.parent_id!=="ROOT"?d.parent_id:void 0}for(const d of c)o.push({label:d.name,action:{kind:"region_zoom",lifeline_id:d.id}});if(a.kind==="node_focus"||a.kind==="relation_reveal"){const d=a.entity_id,h=i.data?.entities.find(f=>f.id===d);h&&o.push({label:h.title.slice(0,20),action:null}),a.kind==="relation_reveal"&&o.push({label:"(关联)",action:null})}return o});return(a,o)=>(G(),Y("div",BS,[(G(!0),Y(je,null,Yt(s.value,(l,c)=>(G(),Y(je,{key:c},[c>0?(G(),Y("span",zS,"›")):Pe("",!0),l.action?(G(),Y("button",{key:1,class:"crumb-link",onClick:u=>n("nav",l.action)},fe(l.label),9,VS)):(G(),Y("span",GS,fe(l.label),1))],64))),128))]))}}),WS=wn(HS,[["__scopeId","data-v-54bd57ef"]]),XS={key:0,class:"lifeline-panel"},$S={class:"panel-header"},qS={class:"stats-row"},YS={class:"stats-count"},ZS={class:"stats-kinds"},KS={class:"kind-t"},JS={class:"kind-m"},jS={class:"kind-d"},QS={class:"kind-i"},e1={key:0,class:"inline-form"},t1=["value"],n1={class:"form-actions"},i1={key:0,class:"drop-line"},s1=["onDragstart","onDragover","onDrop"],r1=["onClick"],a1=["onClick","onDblclick"],o1={class:"kind-t"},l1={class:"kind-m"},c1={class:"kind-d"},u1={class:"kind-i"},d1={class:"badge"},h1={key:0,class:"actions"},f1=["onClick"],p1=["onClick"],m1=["onKeyup"],g1={class:"form-actions"},v1=["onClick"],_1=["onClick"],x1={key:0,class:"confirm-delete"},y1={class:"form-actions"},b1=["onClick"],M1=["onClick"],S1={class:"entity-kind"},w1={class:"entity-title"},E1=["onClick"],T1=["onClick"],A1={key:1,class:"empty"},C1={class:"search-box"},R1={key:0,class:"loading-text"},I1={key:1,class:"search-results"},P1={key:0,class:"loading-text"},L1=["onClick"],D1={class:"entity-kind"},U1={class:"entity-title"},N1={key:0,class:"mounted-tag"},F1=En({__name:"LifelinePanel",emits:["focus-lifeline","focus-entity"],setup(r,{emit:e}){const t=e,n=Gi(),i=At(()=>{const L=n.state;return L.kind==="region_zoom"?L.lifeline_id??null:L.kind==="node_focus"||L.kind==="relation_reveal"?n.data?.entities.find(F=>F.id===L.entity_id)?.lifeline_id??null:null}),s=At(()=>{const L=n.state;return L.kind==="node_focus"||L.kind==="relation_reveal"?L.entity_id??null:null}),a=At(()=>{if(!n.data)return{lifelines:0,entities:0,byKind:{task:0,memory:0,decision:0,item:0}};const L={task:0,memory:0,decision:0,item:0};for(const F of n.data.entities)L[F.kind]!==void 0&&L[F.kind]++;return{lifelines:n.data.lifelines.length,entities:n.data.entities.length,byKind:L}});function o(L){const F={task:0,memory:0,decision:0,item:0};if(!n.data)return F;for(const B of n.data.entities)B.lifeline_id===L&&F[B.kind]!==void 0&&F[B.kind]++;return F}const l=Ie(new Set),c=Ie(!1),u=Ie(null),d=Ie(null),h=Ie(null),f=Ie(null),p=Ie(-1),v=Ie(null);function g(L,F){f.value={id:F.id,parentId:F.parent_id},v.value=F.parent_id,L.dataTransfer&&(L.dataTransfer.effectAllowed="move",L.dataTransfer.setData("text/plain",F.id))}function m(L,F){L.preventDefault(),p.value=F}function _(){p.value=-1}function x(L){L.preventDefault()}async function y(L,F,B){if(L.preventDefault(),p.value=-1,!f.value||!n.data)return;const{id:K,parentId:W}=f.value;if(W!==B){f.value=null,v.value=null;return}const se=n.data.lifelines.filter(Qe=>Qe.parent_id===W);se.sort((Qe,xe)=>Qe.order_index-xe.order_index);const ue=se.findIndex(Qe=>Qe.id===K);if(ue===-1||ue===F){f.value=null,v.value=null;return}const me=[...se.slice(0,ue),...se.slice(ue+1)],Xe=F>ue?F-1:F,O=Xe>0?me[Xe-1]:null,nt=Xe<me.length?me[Xe]:null;let ze;O?nt?ze=(O.order_index+nt.order_index)/2:ze=O.order_index+1:ze=(nt?.order_index??1)-1,f.value=null,v.value=null,await n.updateLifeline(K,{order_index:ze})}function w(){f.value=null,v.value=null,p.value=-1}const M=Ie(""),C=Ie([]),b=Ie(!1),E=Ie(""),P=Ie(""),D=Ie("ROOT"),k=Ie(""),Q=At(()=>{if(!n.data)return[];const L=n.data.lifelines,F={};for(const K of L){const W=K.parent_id;F[W]||(F[W]=[]),F[W].push(K)}function B(K,W){return(F[K]||[]).map(ue=>({lifeline:ue,children:B(ue.id,W+1),depth:W}))}return B("ROOT",0)});function ne(L){return n.data?n.data.entities.filter(F=>F.lifeline_id===L).length:0}function V(L){return n.data?n.data.entities.filter(F=>F.lifeline_id===L):[]}function $(L){l.value.has(L)?l.value.delete(L):l.value.add(L)}function q(L){return l.value.has(L)}function ce(L){return i.value===L}function ve(L){t("focus-lifeline",L)}async function be(){!E.value.trim()||!P.value.trim()||(await n.createLifeline({id:E.value.trim(),name:P.value.trim(),parent_id:D.value==="ROOT"?void 0:D.value}),E.value="",P.value="",D.value="ROOT",c.value=!1)}function Ae(L){u.value=L.id,k.value=L.name}async function Oe(L){k.value.trim()&&k.value!==L.name&&await n.updateLifeline(L.id,{name:k.value.trim()}),u.value=null}function et(){u.value=null}async function ht(L){await n.deleteLifeline(L.id),d.value=null}async function tt(L){const F=L.id.split(":"),B=F[0],K=parseInt(F.slice(1).join(":"),10);await n.mountEntity(B,K,null)}async function H(L){h.value=L,M.value="",C.value=[]}async function ae(){const L=M.value.trim();if(!(!L||L.length<1)){b.value=!0;try{const{searchAll:F}=await yt(async()=>{const{searchAll:W}=await import("./index-8k7U5G8h.js").then(se=>se.e);return{searchAll:W}},__vite__mapDeps([0,1,2])),B=await F(L,5),K=[];for(const W of B.items||[]){const se=`item:${W.id}`,ue=n.data?.entities.find(me=>me.id===se);K.push({id:se,kind:"item",title:W.content?.slice(0,60)||"",lifeline_id:ue?.lifeline_id,mounted_name:ue?.lifeline_id?n.data?.lifelines.find(me=>me.id===ue.lifeline_id)?.name||ue.lifeline_id:void 0})}for(const W of B.tasks||[]){const se=`task:${W.id}`,ue=n.data?.entities.find(me=>me.id===se);K.push({id:se,kind:"task",title:W.title?.slice(0,60)||"",lifeline_id:ue?.lifeline_id,mounted_name:ue?.lifeline_id?n.data?.lifelines.find(me=>me.id===ue.lifeline_id)?.name||ue.lifeline_id:void 0})}for(const W of B.memories||[]){const se=`memory:${W.id}`,ue=n.data?.entities.find(me=>me.id===se);K.push({id:se,kind:"memory",title:W.content?.slice(0,60)||"",lifeline_id:ue?.lifeline_id,mounted_name:ue?.lifeline_id?n.data?.lifelines.find(me=>me.id===ue.lifeline_id)?.name||ue.lifeline_id:void 0})}for(const W of B.decisions||[]){const se=`decision:${W.id}`,ue=n.data?.entities.find(me=>me.id===se);K.push({id:se,kind:"decision",title:W.title?.slice(0,60)||"",lifeline_id:ue?.lifeline_id,mounted_name:ue?.lifeline_id?n.data?.lifelines.find(me=>me.id===ue.lifeline_id)?.name||ue.lifeline_id:void 0})}C.value=K}finally{b.value=!1}}}async function de(L){if(!h.value)return;const F=L.id.split(":"),B=F[0],K=parseInt(F.slice(1).join(":"),10);await n.mountEntity(B,K,h.value),h.value=null,C.value=[]}function _e(){h.value=null,C.value=[]}function Z(){return n.data?[{id:"ROOT",name:"ROOT (根级)"},...n.data.lifelines.map(L=>({id:L.id,name:L.name}))]:[{id:"ROOT",name:"ROOT (根级)"}]}return(L,F)=>$e(n).data?(G(),Y("div",XS,[A("div",$S,[F[10]||(F[10]=A("span",{class:"panel-title"},"Lifeline",-1)),A("button",{class:"btn-text",onClick:F[0]||(F[0]=B=>c.value=!c.value)},"+ 新建")]),A("div",qS,[A("span",YS,fe(a.value.lifelines)+" lifeline · "+fe(a.value.entities)+" entity",1),A("span",ZS,[A("span",KS,"T:"+fe(a.value.byKind.task),1),A("span",JS,"M:"+fe(a.value.byKind.memory),1),A("span",jS,"D:"+fe(a.value.byKind.decision),1),A("span",QS,"I:"+fe(a.value.byKind.item),1)])]),c.value?(G(),Y("div",e1,[Tt(A("input",{"onUpdate:modelValue":F[1]||(F[1]=B=>E.value=B),class:"field",placeholder:"ID (英文短名)",onKeyup:ti(be,["enter"])},null,544),[[qt,E.value]]),Tt(A("input",{"onUpdate:modelValue":F[2]||(F[2]=B=>P.value=B),class:"field",placeholder:"显示名称",onKeyup:ti(be,["enter"])},null,544),[[qt,P.value]]),Tt(A("select",{"onUpdate:modelValue":F[3]||(F[3]=B=>D.value=B),class:"field"},[(G(!0),Y(je,null,Yt(Z(),B=>(G(),Y("option",{key:B.id,value:B.id},fe(B.name),9,t1))),128))],512),[[Mi,D.value]]),A("div",n1,[A("button",{class:"btn-text",onClick:be},"保存"),A("button",{class:"btn-text",onClick:F[4]||(F[4]=B=>c.value=!1)},"取消")])])):Pe("",!0),A("div",{class:"tree",onDragover:x,onDrop:F[7]||(F[7]=dn(()=>{},["prevent"]))},[(G(!0),Y(je,null,Yt(Q.value,(B,K)=>(G(),Y(je,{key:B.lifeline.id},[p.value===K&&v.value===B.lifeline.parent_id?(G(),Y("div",i1)):Pe("",!0),A("div",{class:Nt(["tree-row",{active:ce(B.lifeline.id),dragging:f.value?.id===B.lifeline.id}]),style:Ts({paddingLeft:B.depth*16+4+"px"}),draggable:!0,onDragstart:W=>g(W,B.lifeline),onDragover:W=>m(W,K),onDragleave:_,onDrop:W=>y(W,K,B.lifeline.parent_id),onDragend:w},[A("span",{class:Nt(["drag-handle",{visible:f.value}])},"⠿",2),A("span",{class:"arrow",onClick:W=>$(B.lifeline.id)},fe(q(B.lifeline.id)?"▼":"▶"),9,r1),A("span",{class:"name",onClick:W=>ve(B.lifeline.id),onDblclick:dn(W=>Ae(B.lifeline),["stop"])},[an(fe(B.lifeline.name)+" ",1),q(B.lifeline.id)?(G(),Y(je,{key:0},[A("span",o1,"T:"+fe(o(B.lifeline.id).task),1),A("span",l1,"M:"+fe(o(B.lifeline.id).memory),1),A("span",c1,"D:"+fe(o(B.lifeline.id).decision),1),A("span",u1,"I:"+fe(o(B.lifeline.id).item),1)],64)):Pe("",!0),A("span",d1,"("+fe(ne(B.lifeline.id))+")",1)],40,a1),u.value!==B.lifeline.id?(G(),Y("span",h1,[A("button",{class:"btn-icon",onClick:dn(W=>Ae(B.lifeline),["stop"]),title:"编辑名称"},"✎",8,f1),A("button",{class:"btn-icon",onClick:dn(W=>d.value=B.lifeline.id,["stop"]),title:"删除 lifeline"},"✕",8,p1)])):Pe("",!0)],46,s1),u.value===B.lifeline.id?(G(),Y("div",{key:1,class:"inline-edit",style:Ts({paddingLeft:B.depth*16+20+"px"})},[Tt(A("input",{"onUpdate:modelValue":F[5]||(F[5]=W=>k.value=W),class:"field",onKeyup:[ti(W=>Oe(B.lifeline),["enter"]),ti(et,["esc"])]},null,40,m1),[[qt,k.value]]),A("div",g1,[A("button",{class:"btn-text",onClick:W=>Oe(B.lifeline)},"保存",8,v1),A("button",{class:"btn-text",onClick:et},"取消"),d.value!==B.lifeline.id?(G(),Y("button",{key:0,class:"btn-text danger",onClick:W=>d.value=B.lifeline.id},"删除",8,_1)):Pe("",!0)]),d.value===B.lifeline.id?(G(),Y("div",x1,[an(" 确定删除「"+fe(B.lifeline.name)+"」？挂载的 "+fe(ne(B.lifeline.id))+" 个 entity 将被卸载。 ",1),A("div",y1,[A("button",{class:"btn-text danger",onClick:W=>ht(B.lifeline)},"确认删除",8,b1),A("button",{class:"btn-text",onClick:F[6]||(F[6]=W=>d.value=null)},"取消")])])):Pe("",!0)],4)):Pe("",!0),q(B.lifeline.id)?(G(),Y(je,{key:2},[(G(!0),Y(je,null,Yt(V(B.lifeline.id),W=>(G(),Y("div",{key:W.id,class:Nt(["entity-row",{active:s.value===W.id}]),style:Ts({paddingLeft:B.depth*16+28+"px"}),onClick:se=>t("focus-entity",W.id)},[A("span",S1,fe(W.kind[0].toUpperCase()),1),A("span",w1,fe(W.title.slice(0,30)),1),A("button",{class:"btn-icon",onClick:dn(se=>tt(W),["stop"]),title:"卸载"},"×",8,E1)],14,M1))),128)),A("div",{class:"entity-row add-entity",style:Ts({paddingLeft:B.depth*16+28+"px"})},[A("button",{class:"btn-text",onClick:W=>H(B.lifeline.id)},"+ 关联 entity",8,T1)],4)],64)):Pe("",!0)],64))),128))],32),Q.value.length===0&&!c.value?(G(),Y("div",A1,[F[11]||(F[11]=A("div",{class:"empty-icon"},"◇",-1)),F[12]||(F[12]=A("div",{class:"empty-title"},"暂无 Lifeline",-1)),F[13]||(F[13]=A("div",{class:"empty-desc"},[an(' Lifeline 是实体分类的主线，例如"健康""学习""工作"。'),A("br"),an(" 创建后实体将分布在 3D 球面上。 ")],-1)),A("button",{class:"btn-text",onClick:F[8]||(F[8]=B=>c.value=!0)},"+ 创建第一个 Lifeline")])):Pe("",!0),h.value?(G(),Y("div",{key:2,class:"search-overlay",onClick:dn(_e,["self"])},[A("div",C1,[Tt(A("input",{"onUpdate:modelValue":F[9]||(F[9]=B=>M.value=B),class:"field",placeholder:"搜索 entity...",onKeyup:ti(ae,["enter"])},null,544),[[qt,M.value]]),A("button",{class:"btn-text",onClick:ae},"搜索"),b.value?(G(),Y("div",R1,"搜索中...")):(G(),Y("div",I1,[C.value.length===0&&M.value?(G(),Y("div",P1,"无结果")):Pe("",!0),(G(!0),Y(je,null,Yt(C.value,B=>(G(),Y("div",{key:B.id,class:Nt(["search-row",{mounted:B.mounted_name}]),onClick:K=>B.mounted_name?null:de(B)},[A("span",D1,fe(B.kind[0].toUpperCase()),1),A("span",U1,fe(B.title.slice(0,40)),1),B.mounted_name?(G(),Y("span",N1,"已归类到 "+fe(B.mounted_name),1)):Pe("",!0)],10,L1))),128))]))])])):Pe("",!0)])):Pe("",!0)}}),O1=wn(F1,[["__scopeId","data-v-0c96ae5f"]]),k1={key:0,class:"node-detail-card"},B1={class:"card-header"},z1={class:"kind-badge"},V1={class:"entity-id-row"},G1=["title"],H1={class:"lifeline-path"},W1={key:1,class:"no-lifeline"},X1={key:0,class:"detail-loading"},$1={key:1,class:"detail-error"},q1={key:2,class:"detail-section"},Y1={key:0,class:"field-row"},Z1=["onDblclick"],K1=["onClick"],J1={key:1,class:"field-row"},j1=["onDblclick"],Q1=["onClick"],ew={key:2,class:"field-row"},tw=["onDblclick"],nw=["onClick"],iw={key:3,class:"field-row"},sw=["onDblclick"],rw=["onClick"],aw={key:4,class:"field-row"},ow=["onDblclick"],lw=["onClick"],cw={key:5,class:"field-row"},uw=["onDblclick"],dw=["onClick"],hw={key:6,class:"field-row"},fw=["onDblclick"],pw=["onClick"],mw={key:7,class:"field-row"},gw=["onDblclick"],vw=["onClick"],_w={key:8,class:"field-row"},xw={class:"field-value"},yw=["onClick"],bw={key:9,class:"field-row"},Mw={class:"field-value"},Sw=["onClick"],ww={key:10,class:"field-row"},Ew={class:"field-label"},Tw={class:"field-value readonly"},Aw={key:11,class:"field-row"},Cw={class:"field-label"},Rw=["onDblclick"],Iw={key:0,class:"field-row"},Pw={class:"field-value readonly"},Lw={key:3,class:"actions-section"},Dw={key:4,class:"assoc-summary"},Uw={class:"assoc-type-counts"},Nw={key:0,class:"assoc-summary-list"},Fw=["onClick"],Ow={class:"assoc-summary-type"},kw={class:"assoc-summary-conf"},Bw={class:"assoc-summary-arrow"},zw={class:"assoc-summary-kind"},Vw={class:"assoc-summary-title"},Gw={key:0,class:"assoc-summary-more"},Hw={class:"assoc-section"},Ww={class:"assoc-title"},Xw={key:0,class:"empty-text"},$w=["onClick"],qw={class:"confidence"},Yw={key:0,class:"assoc-actions"},Zw=["onClick"],Kw=["onClick"],Jw={class:"assoc-edit-actions"},jw=["onClick"],Qw=["onClick"],eE=["onClick"],tE={key:0,class:"evidence-block"},nE={class:"evidence-title"},iE={key:0,class:"no-evidence"},sE={class:"evidence-excerpt"},rE={class:"evidence-meta"},aE={class:"evidence-type"},oE={class:"evidence-weight"},lE=En({__name:"NodeDetailCard",emits:["edit-assoc","delete-assoc","copied","enter-relation","navigate-entity"],setup(r,{expose:e,emit:t}){const n=Gi(),i=At(()=>{const Z=n.state;if(Z.kind!=="node_focus"&&Z.kind!=="relation_reveal")return null;const L=Z.entity_id;return n.data?.entities.find(F=>F.id===L)??null}),s=Ie(null),a=Ie(!1),o=Ie(!1);async function l(){if(!i.value)return;const Z=i.value.id,L=n.entityDetailCache.get(Z);if(L){s.value=L;return}a.value=!0,o.value=!1;try{const F=Z.split(":"),B=F[0],K=parseInt(F.slice(1).join(":"),10);let W={};if(B==="task"){const{getTask:se}=await yt(async()=>{const{getTask:me}=await import("./index-8k7U5G8h.js").then(Xe=>Xe.e);return{getTask:me}},__vite__mapDeps([0,1,2])),ue=await se(K);W=ue.task||ue}else if(B==="memory"){const{getMemory:se}=await yt(async()=>{const{getMemory:me}=await import("./index-8k7U5G8h.js").then(Xe=>Xe.e);return{getMemory:me}},__vite__mapDeps([0,1,2])),ue=await se(K);W=ue.memory||ue}else if(B==="decision"){const{getDecision:se}=await yt(async()=>{const{getDecision:me}=await import("./index-8k7U5G8h.js").then(Xe=>Xe.e);return{getDecision:me}},__vite__mapDeps([0,1,2])),ue=await se(K);W=ue.decision||ue}else if(B==="item"){const{getItem:se}=await yt(async()=>{const{getItem:me}=await import("./index-8k7U5G8h.js").then(Xe=>Xe.e);return{getItem:me}},__vite__mapDeps([0,1,2])),ue=await se(K);W=ue.item||ue}s.value=W,n.entityDetailCache.set(Z,W)}catch{o.value=!0}finally{a.value=!1}}Io(()=>i.value?.id,()=>{s.value=null,l()},{immediate:!0});const c=Ie(!1),u=Ie(null),d=Ie("");function h(){i.value&&(d.value=i.value.title,c.value=!0,su(()=>u.value?.focus()))}async function f(){if(!i.value)return;const Z=d.value.trim();if(!Z||Z===i.value.title){c.value=!1;return}const L=i.value.id.split(":"),F=L[0],B=parseInt(L.slice(1).join(":"),10);try{await n.updateEntityTitle(F,B,Z)}catch{await n.reload()}c.value=!1}function p(){c.value=!1}function v(Z){Z.key==="Enter"?(Z.stopPropagation(),f()):Z.key==="Escape"&&(Z.stopPropagation(),p())}const g=Ie(null),m=Ie(null),_=Ie("");function x(Z){if(!s.value)return;const L=s.value[Z];_.value=L!=null?String(L):"",g.value=Z,su(()=>m.value?.focus())}async function y(){if(!i.value||!g.value||!s.value)return;const Z=g.value,L=_.value.trim();if(L===String(s.value[Z]||"")){g.value=null;return}const F=i.value.id.split(":"),B=F[0],K=parseInt(F.slice(1).join(":"),10);try{const{updateEntityField:W}=await yt(async()=>{const{updateEntityField:se}=await import("./index-8k7U5G8h.js").then(ue=>ue.e);return{updateEntityField:se}},__vite__mapDeps([0,1,2]));await W(B,K,{[Z]:L}),s.value={...s.value,[Z]:L},n.entityDetailCache.set(i.value.id,s.value)}catch{}g.value=null}function w(){g.value=null}function M(Z){Z.key==="Escape"?(Z.stopPropagation(),w()):(Z.key==="Enter"&&!(Z.target instanceof HTMLTextAreaElement)||(Z.ctrlKey||Z.metaKey)&&Z.key==="Enter"&&Z.target instanceof HTMLTextAreaElement)&&(Z.stopPropagation(),y())}async function C(){if(!i.value||!s.value)return;const Z=i.value.id.split(":"),L=parseInt(Z.slice(1).join(":"),10),F=s.value.status;try{if(F==="todo"){const{markTaskDone:B}=await yt(async()=>{const{markTaskDone:K}=await import("./index-8k7U5G8h.js").then(W=>W.e);return{markTaskDone:K}},__vite__mapDeps([0,1,2]));await B(L),s.value={...s.value,status:"done"}}else{const{markTaskTodo:B}=await yt(async()=>{const{markTaskTodo:K}=await import("./index-8k7U5G8h.js").then(W=>W.e);return{markTaskTodo:K}},__vite__mapDeps([0,1,2]));await B(L),s.value={...s.value,status:"todo"}}n.entityDetailCache.set(i.value.id,s.value),await n.reload()}catch{await n.reload()}}async function b(){if(!i.value||!s.value)return;const Z=i.value.id.split(":"),L=parseInt(Z.slice(1).join(":"),10),F=s.value.status;try{if(F==="candidate"){const{confirmMemory:B}=await yt(async()=>{const{confirmMemory:K}=await import("./index-8k7U5G8h.js").then(W=>W.e);return{confirmMemory:K}},__vite__mapDeps([0,1,2]));await B(L),s.value={...s.value,status:"confirmed"}}else{const{archiveMemory:B}=await yt(async()=>{const{archiveMemory:K}=await import("./index-8k7U5G8h.js").then(W=>W.e);return{archiveMemory:K}},__vite__mapDeps([0,1,2]));await B(L),s.value={...s.value,status:"archived"}}n.entityDetailCache.set(i.value.id,s.value),await n.reload()}catch{await n.reload()}}const E=t;e({startEditTitle:h});const P=At(()=>{if(!i.value||!n.data)return[];const Z=i.value.id,L=[];for(const F of n.data.associations){if(F.status==="rejected")continue;const B=F.from===Z,K=F.to===Z;if(!B&&!K)continue;const W=B?F.to:F.from,se=n.data.entities.find(ue=>ue.id===W);se&&L.push({assoc:F,isFrom:B,target:se})}return L}),D=At(()=>P.value.slice(0,5)),k=At(()=>{const Z={};for(const{assoc:L}of P.value)Z[L.relation_type]=(Z[L.relation_type]||0)+1;return Z}),Q=Ie(!0);function ne(Z){E("navigate-entity",Z)}function V(Z){return{co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[Z]||Z}const $=At(()=>{if(!i.value||!n.data)return[];const Z=i.value.id;return n.data.associations.filter(L=>(L.from===Z||L.to===Z)&&L.status!=="rejected")}),q=At(()=>{if(!i.value||!n.data)return null;const Z=i.value.lifeline_id;if(!Z)return null;const L=n.data.lifelines.find(F=>F.id===Z);return L?{id:L.id,name:L.name}:null});function ce(Z){return Z==="task"?"T":Z==="memory"?"M":Z==="decision"?"D":Z==="item"?"I":"?"}function ve(Z){switch(Z){case"co_occurrence":return"共现";case"causal":return"因果";case"tension":return"张力";case"derived_from":return"衍生";default:return Z}}function be(Z){switch(Z){case"causal":return"var(--accent)";case"tension":return"var(--text-5)";case"derived_from":return"var(--text-4)";default:return"var(--text-3)"}}function Ae(Z){const L=i.value.id,B=Z.from===L?Z.to:Z.from,K=B.split(":")[0],W=n.data?.entities.find(se=>se.id===B);return{id:B,kind:K,title:W?.title||B}}function Oe(Z){const L=Ae(Z);n.transition({kind:"node_focus",entity_kind:L.kind,entity_id:L.id})}function et(Z){n.transition({kind:"region_zoom",lifeline_id:Z})}async function ht(Z){await navigator.clipboard.writeText(Z),E("copied")}async function tt(Z){const L=`[${Z.kind}] ${Z.title} (\`${Z.id}\`)`;await navigator.clipboard.writeText(L),E("copied")}async function H(Z){await n.reviewAssociation(Z,"accepted")}async function ae(Z){await n.reviewAssociation(Z,"rejected")}function de(Z){return Z?Z.slice(0,10):""}function _e(Z){return Z==="detail"||Z==="content"||Z==="decision"||Z==="context"||Z==="reasoning"||Z==="expected_outcome"}return(Z,L)=>i.value?(G(),Y("div",k1,[A("div",B1,[A("span",z1,fe(ce(i.value.kind)),1),c.value?Tt((G(),Y("input",{key:0,ref_key:"editInput",ref:u,"onUpdate:modelValue":L[0]||(L[0]=F=>d.value=F),class:"title-input",onBlur:f,onKeydown:v},null,544)),[[qt,d.value]]):(G(),Y("span",{key:1,class:"entity-name",onDblclick:h},fe(i.value.title.slice(0,40)),33))]),A("div",V1,[A("span",{class:"entity-id",onClick:L[1]||(L[1]=F=>ht(i.value.id)),title:"点击复制 "+i.value.id},fe(i.value.id),9,G1),A("button",{class:"btn-copy-md",onClick:L[2]||(L[2]=F=>tt(i.value)),title:"复制为 Markdown"},"⎘")]),A("div",H1,[q.value?(G(),Y("span",{key:0,class:"lifeline-link",onClick:L[3]||(L[3]=F=>et(q.value.id))},fe(q.value.name),1)):(G(),Y("span",W1,"未归类"))]),a.value?(G(),Y("div",X1,"加载详情…")):o.value?(G(),Y("div",$1,[L[17]||(L[17]=an(" 加载详情失败 ",-1)),A("button",{class:"btn-retry",onClick:l},"重试")])):s.value?(G(),Y("div",q1,[L[39]||(L[39]=A("div",{class:"section-title"},"详情",-1)),(G(!0),Y(je,null,Yt(Object.keys(s.value).filter(F=>!["id","created_at","updated_at","completed_at","due_date","estimated_minutes"].includes(F)),F=>(G(),Y(je,{key:F},[F==="title"&&i.value.kind!=="item"?(G(),Y("div",Y1,[L[18]||(L[18]=A("span",{class:"field-label"},"标题",-1)),g.value===F?Tt((G(),Y("input",{key:0,ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":L[4]||(L[4]=B=>_.value=B),class:"field-input",onKeydown:M,onBlur:y},null,544)),[[qt,_.value]]):(G(),Y(je,{key:1},[A("span",{class:"field-value",onDblclick:B=>x(F)},fe(s.value[F]?.slice(0,80)||"—"),41,Z1),A("button",{class:"field-edit-btn",onClick:B=>x(F)},"✎",8,K1)],64))])):F==="content"&&(i.value.kind==="memory"||i.value.kind==="item")?(G(),Y("div",J1,[L[19]||(L[19]=A("span",{class:"field-label"},"内容",-1)),g.value===F?(G(),Y(je,{key:0},[Tt(A("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":L[5]||(L[5]=B=>_.value=B),class:"field-textarea",rows:"3",onKeydown:M},null,544),[[qt,_.value]]),A("div",{class:"field-actions"},[A("button",{class:"btn-save",onClick:y},"保存"),A("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(G(),Y(je,{key:1},[A("span",{class:"field-value multiline",onDblclick:B=>x(F)},fe(s.value[F]?.slice(0,200)||"—"),41,j1),A("button",{class:"field-edit-btn",onClick:B=>x(F)},"✎",8,Q1)],64))])):F==="detail"&&i.value.kind==="task"?(G(),Y("div",ew,[L[20]||(L[20]=A("span",{class:"field-label"},"描述",-1)),g.value===F?(G(),Y(je,{key:0},[Tt(A("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":L[6]||(L[6]=B=>_.value=B),class:"field-textarea",rows:"3",onKeydown:M},null,544),[[qt,_.value]]),A("div",{class:"field-actions"},[A("button",{class:"btn-save",onClick:y},"保存"),A("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(G(),Y(je,{key:1},[A("span",{class:"field-value multiline",onDblclick:B=>x(F)},fe(s.value[F]?.slice(0,200)||"—"),41,tw),A("button",{class:"field-edit-btn",onClick:B=>x(F)},"✎",8,nw)],64))])):F==="decision"&&i.value.kind==="decision"?(G(),Y("div",iw,[L[21]||(L[21]=A("span",{class:"field-label"},"决策",-1)),g.value===F?(G(),Y(je,{key:0},[Tt(A("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":L[7]||(L[7]=B=>_.value=B),class:"field-textarea",rows:"3",onKeydown:M},null,544),[[qt,_.value]]),A("div",{class:"field-actions"},[A("button",{class:"btn-save",onClick:y},"保存"),A("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(G(),Y(je,{key:1},[A("span",{class:"field-value multiline",onDblclick:B=>x(F)},fe(s.value[F]?.slice(0,200)||"—"),41,sw),A("button",{class:"field-edit-btn",onClick:B=>x(F)},"✎",8,rw)],64))])):F==="context"&&i.value.kind==="decision"?(G(),Y("div",aw,[L[22]||(L[22]=A("span",{class:"field-label"},"背景",-1)),g.value===F?(G(),Y(je,{key:0},[Tt(A("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":L[8]||(L[8]=B=>_.value=B),class:"field-textarea",rows:"2",onKeydown:M},null,544),[[qt,_.value]]),A("div",{class:"field-actions"},[A("button",{class:"btn-save",onClick:y},"保存"),A("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(G(),Y(je,{key:1},[A("span",{class:"field-value multiline",onDblclick:B=>x(F)},fe(s.value[F]?.slice(0,120)||"—"),41,ow),A("button",{class:"field-edit-btn",onClick:B=>x(F)},"✎",8,lw)],64))])):F==="reasoning"&&i.value.kind==="decision"?(G(),Y("div",cw,[L[23]||(L[23]=A("span",{class:"field-label"},"推理",-1)),g.value===F?(G(),Y(je,{key:0},[Tt(A("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":L[9]||(L[9]=B=>_.value=B),class:"field-textarea",rows:"2",onKeydown:M},null,544),[[qt,_.value]]),A("div",{class:"field-actions"},[A("button",{class:"btn-save",onClick:y},"保存"),A("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(G(),Y(je,{key:1},[A("span",{class:"field-value multiline",onDblclick:B=>x(F)},fe(s.value[F]?.slice(0,120)||"—"),41,uw),A("button",{class:"field-edit-btn",onClick:B=>x(F)},"✎",8,dw)],64))])):F==="expected_outcome"&&i.value.kind==="decision"?(G(),Y("div",hw,[L[24]||(L[24]=A("span",{class:"field-label"},"预期",-1)),g.value===F?(G(),Y(je,{key:0},[Tt(A("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":L[10]||(L[10]=B=>_.value=B),class:"field-textarea",rows:"2",onKeydown:M},null,544),[[qt,_.value]]),A("div",{class:"field-actions"},[A("button",{class:"btn-save",onClick:y},"保存"),A("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(G(),Y(je,{key:1},[A("span",{class:"field-value multiline",onDblclick:B=>x(F)},fe(s.value[F]?.slice(0,120)||"—"),41,fw),A("button",{class:"field-edit-btn",onClick:B=>x(F)},"✎",8,pw)],64))])):F==="priority"&&i.value.kind==="task"?(G(),Y("div",mw,[L[26]||(L[26]=A("span",{class:"field-label"},"优先级",-1)),g.value===F?Tt((G(),Y("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":L[11]||(L[11]=B=>_.value=B),class:"field-select",onBlur:y,onKeydown:[ti(y,["enter"]),ti(w,["escape"])]},[...L[25]||(L[25]=[A("option",{value:"high"},"高",-1),A("option",{value:"medium"},"中",-1),A("option",{value:"low"},"低",-1)])],544)),[[Mi,_.value]]):(G(),Y(je,{key:1},[A("span",{class:"field-value",onDblclick:B=>x(F)},fe(s.value[F]||"medium"),41,gw),A("button",{class:"field-edit-btn",onClick:B=>x(F)},"✎",8,vw)],64))])):F==="status"&&i.value.kind!=="item"?(G(),Y("div",_w,[L[35]||(L[35]=A("span",{class:"field-label"},"状态",-1)),g.value===F?Tt((G(),Y("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":L[12]||(L[12]=B=>_.value=B),class:"field-select",onBlur:y,onKeydown:[ti(y,["enter"]),ti(w,["escape"])]},[i.value.kind==="task"?(G(),Y(je,{key:0},[L[27]||(L[27]=A("option",{value:"todo"},"待办",-1)),L[28]||(L[28]=A("option",{value:"done"},"完成",-1)),L[29]||(L[29]=A("option",{value:"cancelled"},"取消",-1))],64)):i.value.kind==="memory"?(G(),Y(je,{key:1},[L[30]||(L[30]=A("option",{value:"candidate"},"候选",-1)),L[31]||(L[31]=A("option",{value:"confirmed"},"已确认",-1)),L[32]||(L[32]=A("option",{value:"archived"},"归档",-1))],64)):(G(),Y(je,{key:2},[L[33]||(L[33]=A("option",{value:"pending"},"待回顾",-1)),L[34]||(L[34]=A("option",{value:"reviewed"},"已回顾",-1))],64))],544)),[[Mi,_.value]]):(G(),Y(je,{key:1},[A("span",xw,fe(s.value[F]),1),A("button",{class:"field-edit-btn",onClick:B=>x(F)},"✎",8,yw)],64))])):F==="category"&&i.value.kind==="memory"?(G(),Y("div",bw,[L[37]||(L[37]=A("span",{class:"field-label"},"分类",-1)),g.value===F?Tt((G(),Y("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":L[13]||(L[13]=B=>_.value=B),class:"field-select",onBlur:y,onKeydown:[ti(y,["enter"]),ti(w,["escape"])]},[...L[36]||(L[36]=[Ma('<option value="fact" data-v-00ca8067>事实</option><option value="preference" data-v-00ca8067>偏好</option><option value="goal" data-v-00ca8067>目标</option><option value="relationship" data-v-00ca8067>关系</option><option value="event" data-v-00ca8067>事件</option>',5)])],544)),[[Mi,_.value]]):(G(),Y(je,{key:1},[A("span",Mw,fe(s.value[F]),1),A("button",{class:"field-edit-btn",onClick:B=>x(F)},"✎",8,Sw)],64))])):F==="source"||F==="type"?(G(),Y("div",ww,[A("span",Ew,fe(F==="source"?"来源":"类型"),1),A("span",Tw,fe(s.value[F]||"—"),1)])):!_e(F)&&F!=="title"?(G(),Y("div",Aw,[A("span",Cw,fe(F),1),g.value===F?Tt((G(),Y("input",{key:0,ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":L[14]||(L[14]=B=>_.value=B),class:"field-input",onKeydown:M,onBlur:y},null,544)),[[qt,_.value]]):(G(),Y("span",{key:1,class:"field-value",onDblclick:B=>x(F)},fe(s.value[F]?.slice(0,60)||"—"),41,Rw))])):Pe("",!0)],64))),128)),s.value.created_at?(G(),Y("div",Iw,[L[38]||(L[38]=A("span",{class:"field-label"},"创建时间",-1)),A("span",Pw,fe(de(s.value.created_at)),1)])):Pe("",!0)])):Pe("",!0),s.value?(G(),Y("div",Lw,[i.value.kind==="task"&&s.value.status!=="cancelled"?(G(),Y("button",{key:0,class:"btn-action",onClick:C},fe(s.value.status==="todo"?"标记完成":"重开任务"),1)):Pe("",!0),i.value.kind==="memory"&&s.value.status!=="archived"?(G(),Y("button",{key:1,class:"btn-action",onClick:b},fe(s.value.status==="candidate"?"确认":"归档"),1)):Pe("",!0)])):Pe("",!0),P.value.length>0?(G(),Y("div",Dw,[A("div",{class:"assoc-title",onClick:L[16]||(L[16]=F=>Q.value=!Q.value)},[an(" 关联 ("+fe(P.value.length)+") ",1),A("span",Uw,[(G(!0),Y(je,null,Yt(k.value,(F,B)=>(G(),Y("span",{key:B,class:"assoc-type-cnt"},fe(V(B))+":"+fe(F),1))),128))]),A("button",{class:"btn-r",onClick:L[15]||(L[15]=dn(F=>E("enter-relation"),["stop"])),title:"查看关联 (R)"},"R")]),Q.value?(G(),Y("div",Nw,[(G(!0),Y(je,null,Yt(D.value,F=>(G(),Y("div",{key:F.assoc.id,class:Nt(["assoc-summary-row",{pending:F.assoc.status==="pending"}]),onClick:B=>ne(F.target.id)},[A("span",Ow,fe(V(F.assoc.relation_type)),1),A("span",kw,fe(Math.round(F.assoc.confidence*100))+"%",1),A("span",Bw,fe(F.isFrom?"→":"←"),1),A("span",zw,fe(ce(F.target.kind)),1),A("span",Vw,fe(F.target.title.slice(0,25)),1)],10,Fw))),128)),P.value.length>5?(G(),Y("div",Gw," … 查看全部 (共 "+fe(P.value.length)+" 条) ",1)):Pe("",!0)])):Pe("",!0)])):Pe("",!0),A("div",Hw,[A("div",Ww,"关联 ("+fe($.value.length)+")",1),$.value.length===0?(G(),Y("div",Xw,"暂无关联")):Pe("",!0),(G(!0),Y(je,null,Yt($.value,F=>(G(),Y("div",{key:F.id,class:"assoc-wrapper"},[A("div",{class:Nt(["assoc-row",{pending:F.status==="pending",expanded:$e(n).selectedAssocId===F.id}])},[A("span",{class:"rel-badge",style:Ts({color:be(F.relation_type)})},"["+fe(ve(F.relation_type))+"]",5),A("span",{class:"assoc-target",onClick:dn(B=>Oe(F),["stop"])},fe(Ae(F).title.slice(0,30)),9,$w),A("span",qw,fe(Math.round(F.confidence*100))+"%",1),A("span",{class:Nt(["status-badge",F.status])},fe(F.status==="accepted"?"已确认":"待定"),3),F.status==="pending"?(G(),Y("span",Yw,[A("button",{class:"btn-accept",onClick:B=>H(F.id)},"✓",8,Zw),A("button",{class:"btn-reject",onClick:B=>ae(F.id)},"✗",8,Kw)])):Pe("",!0),A("span",Jw,[A("button",{class:"btn-edit-assoc",onClick:dn(B=>E("edit-assoc",F),["stop"])},"✎",8,jw),A("button",{class:"btn-del-assoc",onClick:dn(B=>E("delete-assoc",F.id),["stop"])},"✕",8,Qw)]),A("button",{class:"btn-expand",onClick:dn(B=>$e(n).selectedAssocId===F.id?$e(n).selectAssociation(null):$e(n).selectAssociation(F.id),["stop"])},fe($e(n).selectedAssocId===F.id?"▾":"▸"),9,eE)],2),$e(n).selectedAssocId===F.id?(G(),Y("div",tE,[A("div",nE,"证据 ("+fe(F.evidence?.length||0)+" 条)",1),!F.evidence||F.evidence.length===0?(G(),Y("div",iE,"暂无证据详情")):Pe("",!0),(G(!0),Y(je,null,Yt(F.evidence,(B,K)=>(G(),Y("div",{key:K,class:"evidence-item"},[A("div",sE,'"'+fe(B.excerpt.slice(0,120))+fe(B.excerpt.length>120?"…":"")+'"',1),A("div",rE,[A("span",aE,fe(B.type),1),A("span",oE,"权重: "+fe(Math.round(B.weight*100))+"%",1)])]))),128))])):Pe("",!0)]))),128))])])):Pe("",!0)}}),cE=wn(lE,[["__scopeId","data-v-00ca8067"]]),uE={class:"atlas-search"},dE={key:0,class:"results"},hE={class:"kind-chips"},fE={key:0,class:"no-results"},pE=["onClick"],mE={class:"result-kind"},gE={class:"result-info"},vE={class:"result-title"},_E={class:"result-path"},xE={key:1,class:"recent"},yE=["onClick"],iu="atlas_recent_searches",bE=5,ME=En({__name:"AtlasSearch",emits:["select","close"],setup(r,{emit:e}){function t(){try{return JSON.parse(localStorage.getItem(iu)||"[]")}catch{return[]}}function n(w){localStorage.setItem(iu,JSON.stringify(w))}const i=Ie(t());function s(w){const M=w.trim();if(!M)return;const C=t().filter(E=>E!==M);C.unshift(M);const b=C.slice(0,bE);n(b),i.value=b}function a(){localStorage.removeItem(iu),i.value=[]}function o(w){c.value=w,s(w),d.value?.focus()}const l=Gi(),c=Ie(""),u=Ie(0),d=Ie(null),h=Ie(null),f=At(()=>{const w=c.value.trim().toLowerCase();if(!w||!l.data)return[];const M=[];for(const C of l.data.entities)C.title.toLowerCase().includes(w)&&M.push({id:C.id,kind:C.kind,title:C.title,path:g(C.lifeline_id),layer:3});for(const C of l.data.lifelines)if(C.name.toLowerCase().includes(w)){const b=C.parent_id==="ROOT"?1:2,E=l.data.lifelines.find(D=>D.id===C.parent_id),P=E?E.name:"根级 lifeline";M.push({id:C.id,kind:"lifeline",title:C.name,path:P,layer:b})}return M.sort((C,b)=>{const E=C.title.toLowerCase()===w?0:C.title.toLowerCase().startsWith(w)?1:2,P=b.title.toLowerCase()===w?0:b.title.toLowerCase().startsWith(w)?1:2;return E-P||C.title.length-b.title.length}),M.slice(0,8)}),p=At(()=>h.value?f.value.filter(w=>w.kind===h.value):f.value);function v(w){h.value=h.value===w?null:w}function g(w){if(!l.data)return"";const M=[];let C=l.data.lifelines.find(b=>b.id===w);for(;C;){M.unshift(C.name);const b=C?.parent_id;C=b?l.data.lifelines.find(E=>E.id===b):void 0}return M.length>=2?`${M[M.length-1]} · ${M[0]}`:M.join(" · ")}function m(w){return w==="lifeline"?"L":w[0].toUpperCase()}function _(w){s(c.value),y("select",w),y("close")}function x(w){w.key==="ArrowDown"?(w.preventDefault(),u.value=Math.min(u.value+1,f.value.length-1)):w.key==="ArrowUp"?(w.preventDefault(),u.value=Math.max(u.value-1,0)):w.key==="Enter"?(w.preventDefault(),f.value[u.value]&&_(f.value[u.value])):w.key==="Escape"&&(w.preventDefault(),y("close"))}const y=e;return Vi(()=>{d.value?.focus()}),(w,M)=>(G(),Y("div",uE,[Tt(A("input",{ref_key:"inputEl",ref:d,"onUpdate:modelValue":M[0]||(M[0]=C=>c.value=C),class:"search-input",placeholder:"搜索 entity 或 lifeline…",onKeydown:x},null,544),[[qt,c.value]]),c.value.trim()?(G(),Y("div",dE,[A("div",hE,[A("button",{class:Nt(["kind-chip",{active:!h.value}]),onClick:M[1]||(M[1]=C=>h.value=null)},"全部",2),A("button",{class:Nt(["kind-chip",{active:h.value==="task"}]),onClick:M[2]||(M[2]=C=>v("task"))},"T",2),A("button",{class:Nt(["kind-chip",{active:h.value==="memory"}]),onClick:M[3]||(M[3]=C=>v("memory"))},"M",2),A("button",{class:Nt(["kind-chip",{active:h.value==="decision"}]),onClick:M[4]||(M[4]=C=>v("decision"))},"D",2),A("button",{class:Nt(["kind-chip",{active:h.value==="item"}]),onClick:M[5]||(M[5]=C=>v("item"))},"I",2)]),p.value.length===0?(G(),Y("div",fE,"无匹配结果")):Pe("",!0),(G(!0),Y(je,null,Yt(p.value,(C,b)=>(G(),Y("div",{key:C.id,class:Nt(["result-row",{selected:b===u.value}]),onClick:E=>_(C)},[A("span",mE,fe(m(C.kind)),1),A("div",gE,[A("div",vE,fe(C.title),1),A("div",_E,fe(C.path),1)])],10,pE))),128))])):i.value.length>0?(G(),Y("div",xE,[M[6]||(M[6]=A("div",{class:"recent-title"},"最近搜索",-1)),(G(!0),Y(je,null,Yt(i.value,(C,b)=>(G(),Y("div",{key:b,class:"recent-row",onClick:E=>o(C)},fe(C),9,yE))),128)),A("button",{class:"recent-clear",onClick:a},"清除历史")])):Pe("",!0)]))}}),SE=wn(ME,[["__scopeId","data-v-700b2580"]]),wE={key:0,class:"submenu"},EE=["disabled","onClick"],TE=["disabled","onClick"],AE={key:0,class:"subitem empty"},CE=En({__name:"ContextMenu",props:{target:{},x:{},y:{}},emits:["close","edit-title","delete-entity","move-lifeline","edit-lifeline-name","associate-to","find-path-to","copy-title","delete-lifeline","quick-create"],setup(r,{emit:e}){const t=r,n=e,i=Gi(),s=Ie(null),a=Ie(null),o=At(()=>{let M=t.x,C=t.y;return M+200>window.innerWidth&&(M=window.innerWidth-200-4),C+300>window.innerHeight&&(C=window.innerHeight-300-4),{left:`${M}px`,top:`${C}px`}}),l=At(()=>t.target.layer===3),c=At(()=>i.data?i.data.lifelines.filter(w=>w.parent_id==="ROOT").map(w=>({...w,children:i.data.lifelines.filter(M=>M.parent_id===w.id)})):[]),u=At(()=>!i.data||!t.target.id?null:i.data.entities.find(w=>w.id===t.target.id)?.lifeline_id??null);function d(){n("edit-title",t.target),n("close")}function h(){n("delete-entity",t.target),n("close")}function f(y){n("move-lifeline",t.target.id,y),n("close")}function p(){n("associate-to",t.target),n("close")}function v(){n("find-path-to",t.target),n("close")}function g(){n("copy-title",t.target),n("close")}function m(){n("edit-lifeline-name",t.target),n("close")}function _(y){s.value&&!s.value.contains(y.target)&&n("close")}function x(y){y.key==="Escape"&&n("close")}return Vi(()=>{document.addEventListener("pointerdown",_,!0),document.addEventListener("keydown",x)}),ls(()=>{document.removeEventListener("pointerdown",_,!0),document.removeEventListener("keydown",x)}),(y,w)=>(G(),Y("div",{ref_key:"menuRef",ref:s,class:"ctx-menu",style:Ts(o.value)},[l.value?(G(),Y(je,{key:0},[A("button",{class:"ctx-item",onClick:d},"编辑标题…"),A("div",{class:"ctx-item has-sub",onPointerenter:w[0]||(w[0]=M=>a.value="lifeline"),onPointerleave:w[1]||(w[1]=M=>a.value=null)},[w[4]||(w[4]=an(" 移动到 lifeline ▸ ",-1)),a.value==="lifeline"?(G(),Y("div",wE,[(G(!0),Y(je,null,Yt(c.value,M=>(G(),Y(je,{key:M.id},[A("button",{class:Nt(["subitem r1-item",{current:M.id===u.value}]),disabled:M.id===u.value,onClick:C=>f(M.id)},fe(M.name),11,EE),(G(!0),Y(je,null,Yt(M.children,C=>(G(),Y("button",{key:C.id,class:Nt(["subitem r2-item",{current:C.id===u.value}]),disabled:C.id===u.value,onClick:b=>f(C.id)},fe(C.name),11,TE))),128))],64))),128)),c.value.length===0?(G(),Y("div",AE,"暂无 lifeline")):Pe("",!0)])):Pe("",!0)],32),A("button",{class:"ctx-item",onClick:p},"关联到…"),A("button",{class:"ctx-item",onClick:v},"查找路径到…"),A("button",{class:"ctx-item",onClick:g},"复制标题"),w[5]||(w[5]=A("div",{class:"ctx-separator"},null,-1)),A("button",{class:"ctx-item danger",onClick:h},"删除")],64)):(G(),Y(je,{key:1},[A("button",{class:"ctx-item",onClick:w[2]||(w[2]=M=>{n("quick-create",t.target.id),n("close")})},"新建 entity…"),w[6]||(w[6]=A("div",{class:"ctx-separator"},null,-1)),A("button",{class:"ctx-item",onClick:m},"编辑名称…"),w[7]||(w[7]=A("div",{class:"ctx-separator"},null,-1)),A("button",{class:"ctx-item danger",onClick:w[3]||(w[3]=M=>{n("delete-lifeline",t.target.id,t.target.title),n("close")})},"删除 lifeline")],64))],4))}}),RE=wn(CE,[["__scopeId","data-v-59974e34"]]),IE={class:"confirm-title"},PE={key:0,class:"confirm-message"},LE={class:"confirm-actions"},DE=En({__name:"ConfirmDialog",props:{title:{},message:{default:""},confirmLabel:{default:"确认"},cancelLabel:{default:"取消"},danger:{type:Boolean,default:!1}},emits:["confirm","cancel"],setup(r,{emit:e}){const t=e;function n(i){i.key==="Escape"&&t("cancel"),i.key==="Enter"&&t("confirm")}return Vi(()=>{document.addEventListener("keydown",n)}),ls(()=>{document.removeEventListener("keydown",n)}),(i,s)=>(G(),Y("div",{class:"confirm-overlay",onPointerdown:s[3]||(s[3]=a=>t("cancel"))},[A("div",{class:"confirm-dialog",onPointerdown:s[2]||(s[2]=dn(()=>{},["stop"]))},[A("div",IE,fe(r.title),1),r.message?(G(),Y("div",PE,fe(r.message),1)):Pe("",!0),A("div",LE,[A("button",{class:"confirm-btn cancel-btn",onClick:s[0]||(s[0]=a=>t("cancel"))},fe(r.cancelLabel),1),A("button",{class:Nt(["confirm-btn",r.danger?"danger-btn":"primary-btn"]),onClick:s[1]||(s[1]=a=>t("confirm"))},fe(r.confirmLabel),3)])],32)],32))}}),UE=wn(DE,[["__scopeId","data-v-128fcad2"]]),NE={class:"dialog"},FE={class:"dialog-title"},OE={class:"field-row"},kE={class:"entity-ref"},BE={class:"field-row"},zE={class:"entity-ref"},VE={key:0,class:"status-row"},GE={class:"field-row"},HE=["value"],WE={class:"field-row"},XE={class:"label"},$E={class:"conf-value"},qE={class:"evidence-section"},YE=["onUpdate:modelValue"],ZE=["onUpdate:modelValue"],KE=["onClick"],JE={class:"dialog-actions"},jE={key:1,class:"delete-area"},QE={key:2,class:"delete-confirm"},eT=En({__name:"AssociationEditDialog",props:{fromId:{},fromTitle:{},toId:{},toTitle:{},existing:{}},emits:["cancel","create","update","delete"],setup(r,{emit:e}){const t=r,n=e,i=Ie(t.existing?.relation_type||"manual"),s=Ie(t.existing?.confidence??.7),a=bf(t.existing?.evidence?.length?t.existing.evidence.map(v=>({...v})):[{type:"manual",excerpt:"",weight:.8}]),o=!t.existing,l=Ie(!1),c=[{value:"co_occurrence",label:"共现"},{value:"causal",label:"因果"},{value:"tension",label:"张力"},{value:"derived_from",label:"衍生"},{value:"manual",label:"人工标注"}];function u(){a.length<5&&a.push({type:"manual",excerpt:"",weight:.5})}function d(v){a.length>1&&a.splice(v,1)}function h(){o?n("create",{from:t.fromId,to:t.toId,relation_type:i.value,confidence:s.value,evidence:a.filter(v=>v.excerpt.trim())}):n("update",{association_id:t.existing.id,relation_type:i.value,confidence:s.value,evidence:a.filter(v=>v.excerpt.trim())})}function f(){n("delete",t.existing.id)}function p(v){v.key==="Escape"&&n("cancel")}return Vi(()=>{document.addEventListener("keydown",p)}),ls(()=>{document.removeEventListener("keydown",p)}),(v,g)=>(G(),Y("div",{class:"dialog-overlay",onClick:g[5]||(g[5]=dn(m=>n("cancel"),["self"]))},[A("div",NE,[A("div",FE,fe(o?"新建关联":"编辑关联"),1),A("div",OE,[g[6]||(g[6]=A("span",{class:"label"},"从",-1)),A("span",kE,fe(r.fromTitle.slice(0,30)),1)]),A("div",BE,[g[7]||(g[7]=A("span",{class:"label"},"到",-1)),A("span",zE,fe(r.toTitle.slice(0,30)),1)]),o?Pe("",!0):(G(),Y("div",VE,[g[8]||(g[8]=A("span",{class:"label"},"状态",-1)),A("span",{class:Nt(["status-badge",t.existing.status])},fe(t.existing.status==="accepted"?"已确认":t.existing.status==="rejected"?"已拒绝":"待定"),3)])),A("div",GE,[g[9]||(g[9]=A("label",{class:"label",for:"rel-type"},"关系类型",-1)),Tt(A("select",{id:"rel-type","onUpdate:modelValue":g[0]||(g[0]=m=>i.value=m),class:"field"},[(G(),Y(je,null,Yt(c,m=>A("option",{key:m.value,value:m.value},fe(m.label),9,HE)),64))],512),[[Mi,i.value]])]),A("div",WE,[A("label",XE,[g[10]||(g[10]=an(" 信心度 ",-1)),A("span",$E,fe(s.value.toFixed(2)),1)]),Tt(A("input",{"onUpdate:modelValue":g[1]||(g[1]=m=>s.value=m),type:"range",min:"0.3",max:"1.0",step:"0.01",class:"slider"},null,512),[[qt,s.value,void 0,{number:!0}]])]),A("div",qE,[g[12]||(g[12]=A("span",{class:"label"},"证据",-1)),(G(!0),Y(je,null,Yt(a,(m,_)=>(G(),Y("div",{key:_,class:"evidence-edit-row"},[Tt(A("select",{"onUpdate:modelValue":x=>m.type=x,class:"field evidence-type-sel"},[...g[11]||(g[11]=[Ma('<option value="manual" data-v-0ae04a56>人工标注</option><option value="semantic" data-v-0ae04a56>语义相似</option><option value="co_occurrence" data-v-0ae04a56>共现统计</option><option value="temporal" data-v-0ae04a56>时间序列</option><option value="causal_hint" data-v-0ae04a56>因果模式</option>',5)])],8,YE),[[Mi,m.type]]),Tt(A("input",{"onUpdate:modelValue":x=>m.excerpt=x,class:"field evidence-excerpt",placeholder:"证据摘要（10-120 字）"},null,8,ZE),[[qt,m.excerpt]]),a.length>1?(G(),Y("button",{key:0,class:"btn-icon",onClick:x=>d(_)},"×",8,KE)):Pe("",!0)]))),128)),a.length<5?(G(),Y("button",{key:0,class:"btn-text",onClick:u},"+ 添加证据")):Pe("",!0)]),A("div",JE,[A("button",{class:"btn-cancel",onClick:g[2]||(g[2]=m=>n("cancel"))},"取消"),A("button",{class:"btn-submit",onClick:h},fe(o?"创建关联":"保存修改"),1)]),!o&&!l.value?(G(),Y("div",jE,[A("button",{class:"btn-delete",onClick:g[3]||(g[3]=m=>l.value=!0)},"删除关联")])):Pe("",!0),l.value?(G(),Y("div",QE,[g[13]||(g[13]=an(" 确定删除此关联？ ",-1)),A("button",{class:"btn-delete",onClick:f},"确认删除"),A("button",{class:"btn-text",onClick:g[4]||(g[4]=m=>l.value=!1)},"取消")])):Pe("",!0)])]))}}),tT=wn(eT,[["__scopeId","data-v-0ae04a56"]]),nT={class:"legend-section"},iT={class:"legend-section"},sT=En({__name:"LegendBar",props:{showAssoc:{type:Boolean},filter:{}},emits:["update:filter"],setup(r,{emit:e}){const t=r,n=e,i=Ie(!1),s=Ie(!1);let a;function o(){i.value=!1,a&&clearTimeout(a),a=window.setTimeout(()=>{s.value||(i.value=!0)},5e3)}Vi(()=>o()),ls(()=>{a&&clearTimeout(a)}),Io(()=>t.showAssoc,()=>o());function l(f){const p={types:{...t.filter.types},statuses:{...t.filter.statuses}};p.types[f]=!p.types[f],n("update:filter",p)}function c(f){const p={types:{...t.filter.types},statuses:{...t.filter.statuses}};p.statuses[f]=!p.statuses[f],n("update:filter",p)}function u(){const p=!(Object.values(t.filter.types).every(v=>v)&&Object.values(t.filter.statuses).every(v=>v));n("update:filter",{types:{causal:p,co_occurrence:p,tension:p,derived_from:p,manual:p},statuses:{accepted:p,pending:p,rejected:p}})}function d(){n("update:filter",{types:{causal:!0,co_occurrence:!0,tension:!0,derived_from:!0,manual:!0},statuses:{accepted:!0,pending:!0,rejected:!0}})}const h=At(()=>!Object.values(t.filter.types).every(f=>f)||!Object.values(t.filter.statuses).every(f=>f));return(f,p)=>(G(),Y("div",{class:Nt(["legend-bar",{faded:i.value&&!s.value}]),onMouseenter:p[6]||(p[6]=v=>{s.value=!0,i.value=!1}),onMouseleave:p[7]||(p[7]=v=>{s.value=!1,o()})},[p[15]||(p[15]=Ma('<div class="legend-section" data-v-da16eab0><span class="legend-title" data-v-da16eab0>节点</span><span class="legend-item" data-v-da16eab0><span class="dot task" data-v-da16eab0>■</span> 任务</span><span class="legend-item" data-v-da16eab0><span class="dot memory" data-v-da16eab0>●</span> 记忆</span><span class="legend-item" data-v-da16eab0><span class="dot decision" data-v-da16eab0>◆</span> 决策</span><span class="legend-item" data-v-da16eab0><span class="dot item" data-v-da16eab0>▲</span> 条目</span></div>',1)),r.showAssoc?(G(),Y(je,{key:0},[p[13]||(p[13]=A("div",{class:"legend-sep"},"|",-1)),A("div",nT,[p[12]||(p[12]=A("span",{class:"legend-title"},"关联",-1)),A("span",{class:Nt(["legend-item",{inactive:!r.filter.types.causal}]),onClick:p[0]||(p[0]=v=>l("causal"))},[...p[8]||(p[8]=[A("span",{class:"line-sample causal"},null,-1),an(" 因果",-1)])],2),A("span",{class:Nt(["legend-item",{inactive:!r.filter.types.co_occurrence}]),onClick:p[1]||(p[1]=v=>l("co_occurrence"))},[...p[9]||(p[9]=[A("span",{class:"line-sample co"},null,-1),an(" 共现",-1)])],2),A("span",{class:Nt(["legend-item",{inactive:!r.filter.types.tension}]),onClick:p[2]||(p[2]=v=>l("tension"))},[...p[10]||(p[10]=[A("span",{class:"line-sample tension"},null,-1),an(" 张力",-1)])],2),A("span",{class:Nt(["legend-item",{inactive:!r.filter.types.derived_from}]),onClick:p[3]||(p[3]=v=>l("derived_from"))},[...p[11]||(p[11]=[A("span",{class:"line-sample derived"},null,-1),an(" 衍生",-1)])],2)]),p[14]||(p[14]=A("div",{class:"legend-sep"},"|",-1)),A("div",iT,[A("span",{class:Nt(["legend-item",{inactive:!r.filter.statuses.accepted}]),onClick:p[4]||(p[4]=v=>c("accepted"))},"已确认",2),A("span",{class:Nt(["legend-item",{inactive:!r.filter.statuses.pending}]),onClick:p[5]||(p[5]=v=>c("pending"))},"待确认",2)]),A("span",{class:Nt(["legend-item",{inactive:Object.values(r.filter.types).every(v=>v)&&Object.values(r.filter.statuses).every(v=>v)}]),onClick:u},"全部",2),h.value?(G(),Y("span",{key:0,class:"legend-reset",onClick:d},"重置")):Pe("",!0)],64)):Pe("",!0)],34))}}),rT=wn(sT,[["__scopeId","data-v-da16eab0"]]),kn=180,aT=En({__name:"Minimap",props:{layoutNodes:{},camera:{},controls:{},worldRadius:{},focusedLifelineId:{}},emits:["jump"],setup(r,{emit:e}){const t=r,n=e,i=Ie(null);let s=0;function a(c){const u=kn/(t.worldRadius*2.4),d=kn/2,h=kn/2;return{x:d+c.x*u,y:h-c.z*u}}function o(){const c=i.value;if(!c)return;const u=c.getContext("2d");if(!u)return;const d=window.devicePixelRatio||1;c.width=kn*d,c.height=kn*d,u.scale(d,d),u.fillStyle="rgba(7, 9, 13, 0.85)",u.beginPath(),u.roundRect(0,0,kn,kn,8),u.fill(),u.strokeStyle="rgba(255,255,255,0.06)",u.lineWidth=1,u.beginPath(),u.arc(kn/2,kn/2,kn/2.6,0,Math.PI*2),u.stroke();const h=t.layoutNodes.filter(p=>p.layer===1),f=t.layoutNodes.filter(p=>p.layer===2);for(const p of f){const v=a(p.position);u.fillStyle="rgba(255,255,255,0.2)",u.beginPath(),u.arc(v.x,v.y,2,0,Math.PI*2),u.fill()}for(const p of h){const v=a(p.position);p.id===t.focusedLifelineId&&(u.strokeStyle="#6ee7d0",u.lineWidth=2,u.beginPath(),u.arc(v.x,v.y,5,0,Math.PI*2),u.stroke()),u.fillStyle="#6ee7d0",u.beginPath(),u.arc(v.x,v.y,3,0,Math.PI*2),u.fill()}if(t.camera&&t.controls){const p=t.camera.position,v=a(p),g=t.controls.target||new I(0,0,0),m=a(g);u.strokeStyle="#6ee7d0",u.lineWidth=1;const _=22+(p.length()-2)*5,x=16+(p.length()-2)*3.5;u.strokeRect(v.x-_/2,v.y-x/2,_,x),u.beginPath(),u.moveTo(v.x,v.y),u.lineTo(m.x,m.y),u.strokeStyle="rgba(110,231,208,0.3)",u.stroke()}s=requestAnimationFrame(o)}function l(c){if(!i.value?.getBoundingClientRect())return;const d=c.offsetX,h=c.offsetY,f=kn/(t.worldRadius*2.4),p=kn/2,v=kn/2,g=(d-p)/f,m=-(h-v)/f,x=new I(g,.3,m).normalize().clone().multiplyScalar(4.5),y=new I(0,0,0);n("jump",x,y)}return Vi(()=>{s=requestAnimationFrame(o)}),ls(()=>{cancelAnimationFrame(s)}),(c,u)=>(G(),Y("canvas",{ref_key:"canvasRef",ref:i,class:"minimap",width:180,height:180,onClick:l},null,512))}}),oT=wn(aT,[["__scopeId","data-v-210e4d3a"]]),lT={key:0,class:"path-panel"},cT={class:"path-title"},uT={key:0},dT={class:"path-steps"},hT=["onClick"],fT={class:"path-kind"},pT={class:"path-e-title"},mT={key:0,class:"path-assoc"},gT={class:"path-a-type"},vT={class:"path-a-conf"},_T={class:"path-actions"},xT=["disabled"],yT=["disabled"],bT={key:1,class:"path-panel"},MT=En({__name:"PathPanel",props:{paths:{},currentPathIndex:{},fromTitle:{},toTitle:{}},emits:["prev-path","next-path","clear","focus-entity","copied"],setup(r,{emit:e}){const t=r,n=e;async function i(){let c=`**路径（${a.value} 跳）**：
`;s.value.forEach((u,d)=>{c+=`${d+1}. ${u.entityTitle} (\`${u.entityId}\`)
`,u.assocId&&(c+=`   [${o(u.assocType||"")} ${u.assocConfidence?Math.round(u.assocConfidence*100)+"%":""}] →
`)}),await navigator.clipboard.writeText(c),n("copied")}const s=At(()=>t.paths[t.currentPathIndex]||[]),a=At(()=>s.value.length-1);function o(c){return{co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[c]||c}function l(c){const u=c.split(":")[0];return u==="task"?"T":u==="memory"?"M":u==="decision"?"D":u==="item"?"I":"?"}return(c,u)=>r.paths.length>0?(G(),Y("div",lT,[A("div",cT,[an("路径（"+fe(a.value)+" 跳）",1),r.paths.length>1?(G(),Y("span",uT," 共 "+fe(r.paths.length)+" 条 · "+fe(r.currentPathIndex+1)+"/"+fe(r.paths.length),1)):Pe("",!0)]),A("div",dT,[(G(!0),Y(je,null,Yt(s.value,(d,h)=>(G(),Y(je,{key:h},[A("div",{class:"path-entity",onClick:f=>n("focus-entity",d.entityId)},[A("span",fT,fe(l(d.entityId)),1),A("span",pT,fe(d.entityTitle.slice(0,30)),1)],8,hT),d.assocId?(G(),Y("div",mT,[u[4]||(u[4]=A("span",{class:"path-line"},"┊",-1)),A("span",gT,"["+fe(o(d.assocType||""))+"]",1),A("span",vT,fe(d.assocConfidence?Math.round(d.assocConfidence*100)+"%":""),1)])):Pe("",!0)],64))),128))]),A("div",_T,[r.paths.length>1?(G(),Y("button",{key:0,class:"path-btn",disabled:r.currentPathIndex===0,onClick:u[0]||(u[0]=d=>n("prev-path"))},"上一条",8,xT)):Pe("",!0),r.paths.length>1?(G(),Y("button",{key:1,class:"path-btn",disabled:r.currentPathIndex>=r.paths.length-1,onClick:u[1]||(u[1]=d=>n("next-path"))},"下一条",8,yT)):Pe("",!0),A("button",{class:"path-btn",onClick:i},"复制路径"),A("button",{class:"path-btn clear",onClick:u[2]||(u[2]=d=>n("clear"))},"清除")])])):(G(),Y("div",bT,[u[5]||(u[5]=A("div",{class:"path-title"},"未找到路径",-1)),u[6]||(u[6]=A("div",{class:"path-none"},"深度 5 内无连接",-1)),A("button",{class:"path-btn clear",onClick:u[3]||(u[3]=d=>n("clear"))},"关闭")]))}}),ST=wn(MT,[["__scopeId","data-v-cb34b2fb"]]),wT={class:"sp-panel"},ET={class:"sp-header"},TT=En({__name:"ShortcutPanel",emits:["close"],setup(r,{emit:e}){const t=e;function n(i){(i.key==="?"||i.key==="Escape")&&t("close")}return Vi(()=>{document.addEventListener("keydown",n)}),ls(()=>{document.removeEventListener("keydown",n)}),(i,s)=>(G(),Y("div",{class:"sp-overlay",onClick:s[1]||(s[1]=dn(a=>t("close"),["self"]))},[A("div",wT,[A("div",ET,[s[2]||(s[2]=A("span",{class:"sp-title"},"快捷键参考",-1)),A("button",{class:"sp-close",onClick:s[0]||(s[0]=a=>t("close"))},"✕")]),s[3]||(s[3]=Ma('<div class="sp-grid" data-v-4c3ba46f><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>全局</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Ctrl+K</kbd> <kbd data-v-4c3ba46f>/</kbd> <span data-v-4c3ba46f>搜索 entity/lifeline</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>?</kbd> <span data-v-4c3ba46f>显示/隐藏此面板</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>滚轮</kbd> <span data-v-4c3ba46f>缩放</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>拖拽</kbd> <span data-v-4c3ba46f>旋转</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>global_overview</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>左键点击 R1</kbd> <span data-v-4c3ba46f>进入 lifeline 区域</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>region_zoom</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>返回全局视图</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>左键点击 R2/R3</kbd> <span data-v-4c3ba46f>聚焦 entity</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>右键 R1/R2</kbd> <span data-v-4c3ba46f>新建 entity / 编辑名称</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>node_focus</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>返回 lifeline 区域</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>R</kbd> <span data-v-4c3ba46f>查看关联（relation_reveal）</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>右键 entity</kbd> <span data-v-4c3ba46f>编辑/移动/删除/关联/路径查找</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>双击标题</kbd> <span data-v-4c3ba46f>内联编辑标题</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>relation_reveal</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>返回 node_focus</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>R</kbd> <span data-v-4c3ba46f>退出关联视图</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>点击关联线</kbd> <span data-v-4c3ba46f>查看证据</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>筛选条</kbd> <span data-v-4c3ba46f>按类型/信心度过滤</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>路径查找</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>右键 → 查找路径</kbd> <span data-v-4c3ba46f>进入路径选择模式</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>退出路径模式</span></div></div></div>',1))])]))}}),AT=wn(TT,[["__scopeId","data-v-4c3ba46f"]]),CT={class:"qcd-dialog"},RT={class:"qcd-header"},IT={class:"qcd-field"},PT={key:0,class:"qcd-field"},LT={key:1,class:"qcd-field"},DT={key:2,class:"qcd-field"},UT={key:3,class:"qcd-field"},NT={class:"qcd-field"},FT=["value"],OT={class:"qcd-actions"},kT=["disabled"],BT=En({__name:"QuickCreateDialog",props:{defaultLifelineId:{}},emits:["close"],setup(r,{emit:e}){const t=r,n=e,i=Gi(),s=Ie("task"),a=Ie(""),o=Ie(""),l=Ie(""),c=Ie("fact"),u=Ie(t.defaultLifelineId||""),d=Ie(!1),h=At(()=>s.value==="task"?a.value.trim():s.value==="memory"?o.value.trim():s.value==="decision"?a.value.trim():s.value==="item"?o.value.trim():!1),f=At(()=>{const g=[];if(!i.data)return g;const m=i.data.lifelines.filter(_=>_.parent_id==="ROOT");for(const _ of m){g.push({id:_.id,name:_.name,depth:0});const x=i.data.lifelines.filter(y=>y.parent_id===_.id);for(const y of x)g.push({id:y.id,name:"  "+y.name,depth:1})}return g});async function p(){if(!(!h.value||d.value)){d.value=!0;try{let g,m=s.value;if(s.value==="task"){const{createTask:_}=await yt(async()=>{const{createTask:y}=await import("./index-8k7U5G8h.js").then(w=>w.e);return{createTask:y}},__vite__mapDeps([0,1,2]));g=(await _({title:a.value.trim()})).id}else if(s.value==="memory"){const{createMemory:_}=await yt(async()=>{const{createMemory:y}=await import("./index-8k7U5G8h.js").then(w=>w.e);return{createMemory:y}},__vite__mapDeps([0,1,2]));g=(await _({category:c.value,content:o.value.trim()})).id}else if(s.value==="decision"){const{createDecision:_}=await yt(async()=>{const{createDecision:y}=await import("./index-8k7U5G8h.js").then(w=>w.e);return{createDecision:y}},__vite__mapDeps([0,1,2]));g=(await _({title:a.value.trim(),decision:l.value.trim()})).id}else{const{addNote:_}=await yt(async()=>{const{addNote:y}=await import("./index-8k7U5G8h.js").then(w=>w.e);return{addNote:y}},__vite__mapDeps([0,1,2]));g=(await _(o.value.trim())).id,m="item"}u.value&&await i.mountEntity(m,g,u.value),await i.reload(),n("close")}finally{d.value=!1}}}function v(g){g.key==="Escape"&&n("close")}return Vi(()=>{document.addEventListener("keydown",v)}),ls(()=>{document.removeEventListener("keydown",v)}),(g,m)=>(G(),Y("div",{class:"qcd-overlay",onClick:m[8]||(m[8]=dn(_=>n("close"),["self"]))},[A("div",CT,[A("div",RT,[m[9]||(m[9]=A("span",{class:"qcd-title"},"快速创建",-1)),A("button",{class:"qcd-close",onClick:m[0]||(m[0]=_=>n("close"))},"✕")]),A("div",IT,[m[11]||(m[11]=A("label",{class:"qcd-label"},"类型",-1)),Tt(A("select",{"onUpdate:modelValue":m[1]||(m[1]=_=>s.value=_),class:"qcd-select"},[...m[10]||(m[10]=[A("option",{value:"task"},"任务",-1),A("option",{value:"memory"},"记忆",-1),A("option",{value:"decision"},"决策",-1),A("option",{value:"item"},"条目",-1)])],512),[[Mi,s.value]])]),s.value==="task"||s.value==="decision"?(G(),Y("div",PT,[m[12]||(m[12]=A("label",{class:"qcd-label"},"标题",-1)),Tt(A("input",{"onUpdate:modelValue":m[2]||(m[2]=_=>a.value=_),class:"qcd-input",placeholder:"输入标题…"},null,512),[[qt,a.value]])])):Pe("",!0),s.value==="memory"||s.value==="item"?(G(),Y("div",LT,[m[13]||(m[13]=A("label",{class:"qcd-label"},"内容",-1)),Tt(A("input",{"onUpdate:modelValue":m[3]||(m[3]=_=>o.value=_),class:"qcd-input",placeholder:"输入内容…"},null,512),[[qt,o.value]])])):Pe("",!0),s.value==="decision"?(G(),Y("div",DT,[m[14]||(m[14]=A("label",{class:"qcd-label"},"决策",-1)),Tt(A("input",{"onUpdate:modelValue":m[4]||(m[4]=_=>l.value=_),class:"qcd-input",placeholder:"决策描述（选填）"},null,512),[[qt,l.value]])])):Pe("",!0),s.value==="memory"?(G(),Y("div",UT,[m[16]||(m[16]=A("label",{class:"qcd-label"},"分类",-1)),Tt(A("select",{"onUpdate:modelValue":m[5]||(m[5]=_=>c.value=_),class:"qcd-select"},[...m[15]||(m[15]=[Ma('<option value="fact" data-v-22486ab5>事实</option><option value="preference" data-v-22486ab5>偏好</option><option value="goal" data-v-22486ab5>目标</option><option value="relationship" data-v-22486ab5>关系</option><option value="event" data-v-22486ab5>事件</option>',5)])],512),[[Mi,c.value]])])):Pe("",!0),A("div",NT,[m[18]||(m[18]=A("label",{class:"qcd-label"},"归类",-1)),Tt(A("select",{"onUpdate:modelValue":m[6]||(m[6]=_=>u.value=_),class:"qcd-select"},[m[17]||(m[17]=A("option",{value:""},"不挂载",-1)),(G(!0),Y(je,null,Yt(f.value,_=>(G(),Y("option",{key:_.id,value:_.id},fe(_.name),9,FT))),128))],512),[[Mi,u.value]])]),A("div",OT,[A("button",{class:"qcd-btn cancel",onClick:m[7]||(m[7]=_=>n("close"))},"取消"),A("button",{class:"qcd-btn submit",disabled:!h.value||d.value,onClick:p},fe(d.value?"创建中…":"创建"),9,kT)])])]))}}),zT=wn(BT,[["__scopeId","data-v-22486ab5"]]),VT={class:"pending-panel"},GT={class:"pending-header"},HT={class:"pending-count"},WT={key:0,class:"pending-empty"},XT={class:"pending-list"},$T={class:"pending-assoc-info"},qT={class:"pending-rel"},YT={class:"pending-conf"},ZT={class:"pending-entity from"},KT={class:"pending-kind"},JT=["onClick"],jT={class:"pending-entity to"},QT={class:"pending-kind"},eA=["onClick"],tA=["onClick"],nA={class:"ev-toggle-icon"},iA={key:1,class:"no-evidence"},sA={key:2,class:"evidence-list"},rA={class:"ev-header"},aA={class:"ev-type"},oA={class:"ev-weight"},lA={class:"ev-weight-track"},cA=["title"],uA={class:"pending-actions"},dA=["onClick"],hA=["onClick"],fA=En({__name:"PendingReviewPanel",emits:["close","focus-entity"],setup(r,{emit:e}){const t=Gi(),n=Ie(new Set);function i(f){n.value.has(f)?n.value.delete(f):n.value.add(f),n.value=new Set(n.value)}function s(f){return{semantic:"语义",keyword:"关键词",co_occurrence:"共现",temporal:"时序",causal:"因果",manual:"手动"}[f]||f}const a=e,o=At(()=>t.data?t.data.associations.filter(f=>f.status==="pending").map(f=>{const p=t.data?.entities.find(g=>g.id===f.from),v=t.data?.entities.find(g=>g.id===f.to);return{assoc:f,fromTitle:p?.title||f.from,toTitle:v?.title||f.to}}):[]);function l(f){return{co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[f]||f}function c(f){const p=f.split(":")[0];return p==="task"?"T":p==="memory"?"M":p==="decision"?"D":p==="item"?"I":"?"}async function u(f){await t.reviewAssociation(f,"accepted")}async function d(f){await t.reviewAssociation(f,"rejected")}function h(f){a("focus-entity",f),a("close")}return(f,p)=>(G(),Y("div",VT,[A("div",GT,[p[1]||(p[1]=A("span",{class:"pending-title"},"待确认关联",-1)),A("span",HT,"共 "+fe(o.value.length)+" 条",1),A("button",{class:"pending-close",onClick:p[0]||(p[0]=v=>a("close"))},"✕")]),o.value.length===0?(G(),Y("div",WT,"无待确认关联")):Pe("",!0),A("div",XT,[(G(!0),Y(je,null,Yt(o.value,v=>(G(),Y("div",{key:v.assoc.id,class:"pending-item"},[A("div",$T,[A("span",qT,fe(l(v.assoc.relation_type)),1),A("span",YT,fe(Math.round(v.assoc.confidence*100))+"%",1)]),A("div",ZT,[A("span",KT,fe(c(v.assoc.from)),1),A("span",{class:"pending-entity-title",onClick:g=>h(v.assoc.from)},fe(v.fromTitle.slice(0,30)),9,JT)]),p[2]||(p[2]=A("div",{class:"pending-arrow"},"→",-1)),A("div",jT,[A("span",QT,fe(c(v.assoc.to)),1),A("span",{class:"pending-entity-title",onClick:g=>h(v.assoc.to)},fe(v.toTitle.slice(0,30)),9,eA)]),v.assoc.evidence&&v.assoc.evidence.length>0?(G(),Y("div",{key:0,class:"evidence-toggle",onClick:g=>i(v.assoc.id)},[A("span",nA,fe(n.value.has(v.assoc.id)?"▾":"▸"),1),A("span",null,fe(v.assoc.evidence.length)+" 条证据",1)],8,tA)):(G(),Y("div",iA,"无证据")),n.value.has(v.assoc.id)&&v.assoc.evidence?(G(),Y("div",sA,[(G(!0),Y(je,null,Yt(v.assoc.evidence||[],(g,m)=>(G(),Y("div",{key:m,class:"ev-item"},[A("div",rA,[A("span",aA,fe(s(g.type)),1),A("span",oA,fe(Math.round(g.weight*100))+"%",1)]),A("div",lA,[A("div",{class:"ev-weight-fill",style:Ts({width:g.weight*100+"%"})},null,4)]),A("div",{class:"ev-excerpt",title:g.excerpt},fe(g.excerpt.slice(0,100))+fe(g.excerpt.length>100?"…":""),9,cA)]))),128))])):Pe("",!0),A("div",uA,[A("button",{class:"pending-btn accept",onClick:g=>u(v.assoc.id)},"✓",8,dA),A("button",{class:"pending-btn reject",onClick:g=>d(v.assoc.id)},"✗",8,hA)])]))),128))])]))}}),pA=wn(fA,[["__scopeId","data-v-85412e96"]]),mA={class:"export-dialog"},gA={class:"export-stats"},vA={class:"stat-row"},_A={class:"stat-row"},xA={class:"stat-row"},yA={class:"export-options"},bA=En({__name:"ExportDialog",emits:["close"],setup(r,{emit:e}){const t=Gi(),n=e,i=At(()=>t.data?.lifelines.length||0),s=At(()=>t.data?.entities.length||0),a=At(()=>t.data?.associations.length||0);function o(u){return{co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[u]||u}function l(u){const d=[],h=new Date().toISOString().slice(0,10);d.push(`# Axiom Atlas 导出 — ${h}`,"","## 概览","");const f={task:0,memory:0,decision:0,item:0};for(const g of u.entities)f[g.kind]!==void 0&&f[g.kind]++;const p={accepted:0,pending:0,rejected:0};for(const g of u.associations)p[g.status]!==void 0&&p[g.status]++;d.push(`- Lifeline: ${u.lifelines.length} 条`),d.push(`- Entity: ${u.entities.length} 个 (Task ${f.task}, Memory ${f.memory}, Decision ${f.decision}, Item ${f.item})`),d.push(`- 关联: ${u.associations.length} 条 (已确认 ${p.accepted}, 待确认 ${p.pending}, 已拒绝 ${p.rejected})`,"");const v=new Map(u.entities.map(g=>[g.id,g]));for(const g of u.lifelines){d.push(`## Lifeline: ${g.name}`,"");const m=u.entities.filter(_=>_.lifeline_id===g.id);if(m.length===0){d.push("_无 entity_","");continue}for(const _ of m){d.push(`- ${_.id} ${_.title}`);for(const x of u.associations){if(x.from!==_.id&&x.to!==_.id)continue;const y=x.from===_.id,w=y?x.to:x.from,M=v.get(w);d.push(`  - ${o(x.relation_type)} ${y?"→":"←"} ${M?.title||w} (${Math.round(x.confidence*100)}%)`)}d.push("")}}return d.join(`
`)}function c(u){if(!t.data)return;const d=new Date().toISOString().slice(0,10);let h,f,p;u==="json"?(h=JSON.stringify({exported_at:new Date().toISOString(),schema_version:t.data.schema_version,root:t.data.root,lifelines:t.data.lifelines,entities:t.data.entities,associations:t.data.associations},null,2),f=`axiom-export-${d}.json`,p="application/json"):(h=l(t.data),f=`axiom-export-${d}.md`,p="text/markdown");const v=new Blob([h],{type:p}),g=URL.createObjectURL(v),m=document.createElement("a");m.href=g,m.download=f,m.click(),URL.revokeObjectURL(g),n("close")}return(u,d)=>(G(),Y("div",{class:"export-overlay",onClick:d[3]||(d[3]=dn(h=>n("close"),["self"]))},[A("div",mA,[d[9]||(d[9]=A("div",{class:"export-title"},"导出 Atlas 数据",-1)),A("div",gA,[A("div",vA,[d[4]||(d[4]=A("span",null,"Lifeline",-1)),A("span",null,fe(i.value),1)]),A("div",_A,[d[5]||(d[5]=A("span",null,"Entity",-1)),A("span",null,fe(s.value),1)]),A("div",xA,[d[6]||(d[6]=A("span",null,"关联",-1)),A("span",null,fe(a.value),1)])]),A("div",yA,[A("button",{class:"export-opt",onClick:d[0]||(d[0]=h=>c("json"))},[...d[7]||(d[7]=[A("span",{class:"opt-title"},"JSON",-1),A("span",{class:"opt-desc"},"完整数据，可用于备份或导入",-1)])]),A("button",{class:"export-opt",onClick:d[1]||(d[1]=h=>c("markdown"))},[...d[8]||(d[8]=[A("span",{class:"opt-title"},"Markdown",-1),A("span",{class:"opt-desc"},"可读摘要，按 Lifeline 分组",-1)])])]),A("button",{class:"export-cancel",onClick:d[2]||(d[2]=h=>n("close"))},"取消")])]))}}),MA=wn(bA,[["__scopeId","data-v-0e950a62"]]),SA={class:"cosmos-view"},wA={class:"cosmos-hud"},EA=["disabled"],TA=["disabled"],AA={key:0,class:"overlay-state"},CA={key:1,class:"overlay-state"},RA={key:2,class:"overlay-state"},IA={key:0,class:"tooltip"},PA={class:"create-actions"},LA=["disabled"],DA={key:5,class:"select-hint"},UA={key:6,class:"select-hint"},NA={key:12,class:"copy-toast"},FA={key:13,class:"minimap-wrapper"},OA={key:14,class:"assoc-filter-bar"},kA={class:"filter-chips"},BA=["onClick"],zA={class:"filter-slider"},VA={class:"filter-label"},GA={class:"filter-count"},HA={key:0,class:"filter-empty"},WA=1.5,XA=En({__name:"CosmosView",setup(r){const e=Gi(),t=Ie(null);let n=null,i=null,s=0,a=[],o="";const l=Ie(!1),c=Ie(!1),u=Ie(!1);let d;const h=Ie(!1),f=Ie(),p=Ie(!1),v=Ie(!1),g=At(()=>e.data?e.data.associations.filter(U=>U.status==="pending").length:0);function m(U){f.value=U,h.value=!0}const _=Ie(null),x=Ie(null);function y(U,N,j,ye){return new Promise(Be=>{x.value={title:U,message:N,confirmLabel:j,danger:ye,resolve:Be}})}const w=Ie(null),M=Ie(!0),C=Ie(!1);let b,E=null,P=null;const D=Ie({types:{causal:!0,co_occurrence:!0,tension:!0,derived_from:!0,manual:!0},statuses:{accepted:!0,pending:!0,rejected:!0}}),k=bf({types:["co_occurrence","causal","tension","derived_from","manual"],minConfidence:0,status:"all"});function Q(){for(const U of a){const N=k.types.includes(U.data.relation_type),j=U.data.confidence>=k.minConfidence,ye=k.status==="all"||U.data.status===k.status,Be=D.value,Le=Be.types[U.data.relation_type]??!0,pt=Be.statuses[U.data.status]??!0,_t=N&&j&&ye&&Le&&pt;U.line.visible=_t,U.arrow&&(U.arrow.visible=_t)}}function ne(U){k.types.includes(U)?k.types.length>1&&(k.types=k.types.filter(N=>N!==U)):k.types=[...k.types,U],Q()}const V=At(()=>a.filter(U=>U.line.visible).length),$=Ie(null),q=Ie(null),ce=Ie(0);function ve(U,N){if(!e.data)return[];const j=new Map;for(const Ze of e.data.associations)Ze.status!=="rejected"&&(j.has(Ze.from)||j.set(Ze.from,[]),j.has(Ze.to)||j.set(Ze.to,[]),j.get(Ze.from).push({to:Ze.to,assocId:Ze.id,type:Ze.relation_type,confidence:Ze.confidence}),j.get(Ze.to).push({to:Ze.from,assocId:Ze.id,type:Ze.relation_type,confidence:Ze.confidence}));const ye=new Set,Be=[{id:U,path:[{entityId:U,entityTitle:"",assocId:null,assocType:null,assocConfidence:null}]}];ye.add(U);const Le=[];let pt=-1;const _t=5;for(;Be.length>0;){const{id:Ze,path:It}=Be.shift();if(pt>-1&&It.length>pt)break;if(Ze===N){It.forEach(ct=>{ct.entityTitle||(ct.entityTitle=e.data?.entities.find(gt=>gt.id===ct.entityId)?.title||ct.entityId)}),Le.push(It),pt=It.length;continue}if(!(It.length>=_t)){for(const ct of j.get(Ze)||[])if(!ye.has(ct.to)||pt>-1&&It.length<pt){ye.add(ct.to);const gt=e.data?.entities.find(kt=>kt.id===ct.to);Be.push({id:ct.to,path:[...It,{entityId:ct.to,entityTitle:gt?.title||ct.to,assocId:ct.assocId,assocType:ct.type,assocConfidence:ct.confidence}]})}}}return Le}function be(U){$.value={id:U.id,title:U.title}}function Ae(U){if(!$.value)return;if(U===$.value.id){et();return}const N=ve($.value.id,U);q.value=N.length>0?N:[],ce.value=0,$.value=null,N.length>0&&n&&Oe(N[0])}function Oe(U){if(!n||!e.data)return;yf(n.nodes,a),Tu(n.scene);const N=U.map(Le=>Le.entityId),j=new Set(U.filter(Le=>Le.assocId).map(Le=>Le.assocId)),ye={startId:N[0],endId:N[N.length-1],pathEntityIds:new Set(N),pathAssocIds:j,color:xf[ce.value%xf.length],isCurrent:!0},Be=a.filter(Le=>j.has(Le.data.id));US(n.nodes,Be.length>0?Be:a,[ye],n.scene),FS(N,n.nodes,n.scene)}function et(){$.value=null,q.value=null,ce.value=0,n&&(yf(n.nodes,a),Tu(n.scene))}function ht(){q.value&&(ce.value=Math.max(0,ce.value-1),Oe(q.value[ce.value]))}function tt(){q.value&&(ce.value=Math.min(q.value.length-1,ce.value+1),Oe(q.value[ce.value]))}function H(U){const N=U.split(":");e.transition({kind:"node_focus",entity_kind:N[0],entity_id:U})}function ae(){u.value=!0,d&&clearTimeout(d),d=window.setTimeout(()=>{u.value=!1},1500)}function de(U){navigator.clipboard.writeText(U.title).then(()=>ae())}async function _e(U,N){window.confirm(`确定删除 lifeline「${N}」？挂载的 entity 将被卸载。`)&&(await e.deleteLifeline(U),e.transition({kind:"global_overview"}))}function Z(){ae()}function L(){ae()}function F(){z()}function B(U){if(!e.data)return;const N=e.data.entities.find(j=>j.id===U);N&&e.transition({kind:"node_focus",entity_kind:N.kind,entity_id:U})}let K=null,W=null,se=null;async function ue(){if(!e.data||!t.value)return;const U=await yt(()=>Promise.resolve().then(()=>vS),void 0),N=(await yt(async()=>{const{OrbitControls:Ze}=await import("./OrbitControls-DLbav2l9.js");return{OrbitControls:Ze}},__vite__mapDeps([3,0,1,2]))).OrbitControls,{CSS2DRenderer:j}=await yt(async()=>{const{CSS2DRenderer:Ze}=await Promise.resolve().then(()=>gf);return{CSS2DRenderer:Ze}},void 0);n=await ES(t.value,e.data),i=new N(n.camera,n.renderer.domElement),i.enableDamping=!0,i.dampingFactor=.08,i.enableZoom=!0,i.zoomSpeed=.6,i.enablePan=!1,i.minDistance=.5,i.maxDistance=9,K=new j,K.setSize(window.innerWidth,window.innerHeight),K.domElement.style.position="absolute",K.domElement.style.top="0",K.domElement.style.pointerEvents="none",document.querySelector(".cosmos-view")?.appendChild(K.domElement);const{createLabelGroup:ye}=await yt(async()=>{const{createLabelGroup:Ze}=await import("./labels-C11nZikY.js");return{createLabelGroup:Ze}},__vite__mapDeps([4,0,1,2]));W=ye(),W.create(n.scene,n.layoutNodes);const Be=new Map;for(const Ze of e.data.entities)Be.set(Ze.lifeline_id,(Be.get(Ze.lifeline_id)||0)+1);for(const Ze of n.layoutNodes){if(Ze.layer!==1&&Ze.layer!==2)continue;const It=document.createElement("div"),ct=Be.get(Ze.id)||0;It.textContent=String(ct),It.style.cssText="font-size:9px;color:var(--text-4);font-family:var(--font-mono);text-align:center;";const{CSS2DObject:gt}=await yt(async()=>{const{CSS2DObject:An}=await Promise.resolve().then(()=>gf);return{CSS2DObject:An}},void 0),kt=new gt(It);kt.position.copy(Ze.position.clone().add(new I(0,-.07,0))),n.scene.add(kt)}se=n.setResolution,window.addEventListener("resize",O);const Le=new U.Raycaster,pt=new U.Vector2;t.value.addEventListener("click",Ze=>{if(!n)return;if(pt.x=Ze.offsetX/t.value.clientWidth*2-1,pt.y=-(Ze.offsetY/t.value.clientHeight)*2+1,Le.setFromCamera(pt,n.camera),$.value){const tn=Le.intersectObjects(n.pickables);if(tn.length>0){const Ht=tn[0].object;if(Ht.userData.layer===3){Ae(Ht.userData.id);return}}et();return}if(e.selectingTarget){const tn=Le.intersectObjects(n.pickables);if(tn.length>0){const Ht=tn[0].object;if(Ht.userData.layer===3&&Ht.userData.id!==e.selectingTarget.fromId){const Kn=e.data?.entities.find(ci=>ci.id===Ht.userData.id)?.title||"";e.openEditAssoc({id:"",from:e.selectingTarget.fromId,fromTitle:e.selectingTarget.fromTitle,to:Ht.userData.id,toTitle:Kn,relation_type:"manual",confidence:.7,status:"accepted",evidence:[]}),e.cancelSelecting();return}}e.cancelSelecting();return}if(e.state.kind==="relation_reveal"&&a.length>0){const tn=Le.intersectObjects(a.map(Ht=>Ht.line));if(tn.length>0){const Ht=tn[0].object,Kn=a.find(ci=>ci.line===Ht);if(Kn){e.selectedAssocId===Kn.data.id?e.selectAssociation(null):e.selectAssociation(Kn.data.id);return}}}const It=Le.intersectObjects(n.pickables);if(It.length===0){if(e.selectAssociation(null),e.state.kind==="node_focus"||e.state.kind==="relation_reveal"){const tn=e.state.entity_id,Kn=e.data?.entities.find(ci=>ci.id===tn)?.lifeline_id;Kn?e.transition({kind:"region_zoom",lifeline_id:Kn}):e.transition({kind:"global_overview"})}else e.state.kind==="region_zoom"&&e.transition({kind:"global_overview"});return}e.selectAssociation(null);const ct=It[0].object,gt=ct.userData.layer,kt=ct.userData.id,An=ct.userData.kind,Zn=e.state;Zn.kind==="global_overview"&&gt===1?e.transition({kind:"region_zoom",lifeline_id:kt}):Zn.kind==="region_zoom"&&(gt===2||gt===3)?e.transition({kind:"node_focus",entity_kind:An||"lifeline",entity_id:kt}):Zn.kind==="node_focus"?e.transition({kind:"node_focus",entity_kind:An||"lifeline",entity_id:kt}):Zn.kind==="relation_reveal"&&(Se(),e.transition({kind:"node_focus",entity_kind:An||"lifeline",entity_id:kt}))}),t.value.addEventListener("mousemove",Ze=>{if(!n)return;pt.x=Ze.offsetX/t.value.clientWidth*2-1,pt.y=-(Ze.offsetY/t.value.clientHeight)*2+1,Le.setFromCamera(pt,n.camera);const It=Le.intersectObjects(n.pickables);if(It.length>0){const gt=It[0].object;gt!==E&&(ze(),E=gt,nt(gt)),t.value.style.cursor=e.selectingTarget?"crosshair":"pointer"}else ze(),t.value.style.cursor=e.selectingTarget?"crosshair":"";if(e.state.kind!=="relation_reveal")return;const ct=Le.intersectObjects(n.lines.concat(a.map(gt=>gt.line)));if(ct.length>0&&a.some(gt=>gt.line===ct[0].object)){const gt=a.find(kt=>kt.line===ct[0].object);gt&&(o=gt.data.evidence?.[0]?.excerpt||"",gt.line!==P&&(xe(),P=gt.line,Qe(gt)))}else o="",xe()}),t.value.addEventListener("contextmenu",Ze=>{if(Ze.preventDefault(),!n||!e.data)return;pt.x=Ze.offsetX/t.value.clientWidth*2-1,pt.y=-(Ze.offsetY/t.value.clientHeight)*2+1,Le.setFromCamera(pt,n.camera);const It=Le.intersectObjects(n.pickables);if(It.length===0){const tn=e.state.kind;(tn==="global_overview"||tn==="region_zoom")&&m(),_.value=null;return}if(e.state.kind==="global_overview"){_.value=null;return}const ct=It[0].object,gt=ct.userData.id,kt=ct.userData.kind,An=ct.userData.layer;if(An<1||An>3){_.value=null;return}let Zn="";An<=2?Zn=e.data.lifelines.find(Ht=>Ht.id===gt)?.name||gt:Zn=e.data.entities.find(Ht=>Ht.id===gt)?.title||gt,_.value={x:Ze.clientX,y:Ze.clientY,target:{id:gt,kind:kt,title:Zn,layer:An}}}),window.addEventListener("keydown",xt),document.querySelector(".cosmos-hud")?.addEventListener("mouseenter",()=>{M.value=!0,b&&clearTimeout(b)}),b=window.setTimeout(()=>{M.value=!1,C.value=!0},3e3),le()}function me(U){e.transition({kind:"region_zoom",lifeline_id:U})}function Xe(U){if(!e.data)return;const N=e.data.entities.find(j=>j.id===U);N&&e.transition({kind:"node_focus",entity_kind:N.kind,entity_id:U})}function O(){if(!K||!se)return;const U=window.innerWidth,N=window.innerHeight;K.setSize(U,N),se(U,N)}function nt(U){U.scale.setScalar(WA);const N=U.material;N._origColor=N._origColor??N.color.getHex(),N.color.set(ei("--accent")),N.needsUpdate=!0}function ze(){if(!E)return;E.scale.setScalar(1);const U=E.material;U._origColor!==void 0&&(U.color.setHex(U._origColor),delete U._origColor,U.needsUpdate=!0),E=null}function Qe(U){const N=U.line.material;N._origLinewidth=N._origLinewidth??N.linewidth,N._origColor=N._origColor??N.color.getHex(),N.linewidth=N._origLinewidth*1.3,N.color.set(ei("--accent")),N.needsUpdate=!0,a.forEach(j=>{if(j.line!==U.line){const ye=j.line.material;ye.transparent=!0,ye._origOpacity=ye._origOpacity??ye.opacity,ye.opacity=(ye._origOpacity||.8)*.3,ye.needsUpdate=!0}})}function xe(){if(!P)return;const U=P.material;U._origLinewidth!==void 0&&(U.linewidth=U._origLinewidth,delete U._origLinewidth),U._origColor!==void 0&&(U.color.setHex(U._origColor),delete U._origColor),U.needsUpdate=!0,a.forEach(N=>{const j=N.line.material;j._origOpacity!==void 0&&(j.opacity=j._origOpacity,delete j._origOpacity,j.needsUpdate=!0)}),P=null}function Et(U){if(l.value=!1,!!n)if(U.kind==="lifeline")if(U.layer===1)e.transition({kind:"region_zoom",lifeline_id:U.id});else{let N=e.data?.lifelines.find(j=>j.id===U.id)?.parent_id;for(;N&&N!=="ROOT";){const j=e.data?.lifelines.find(ye=>ye.id===N);if(j&&j.parent_id==="ROOT")break;N=j?.parent_id}N&&N!=="ROOT"&&e.transition({kind:"region_zoom",lifeline_id:N})}else e.transition({kind:"node_focus",entity_kind:U.kind,entity_id:U.id})}function R(U){U.layer===3&&w.value?.startEditTitle()}async function S(U){if(!await y(`确定删除「${U.title.slice(0,30)}」？`,"此操作不可撤销。","删除",!0))return;const j=U.id.split(":"),ye=j[0],Be=parseInt(j.slice(1).join(":"),10);try{await e.deleteEntityById(ye,Be)}catch{await e.reload()}const Le=e.state;if((Le.kind==="node_focus"||Le.kind==="relation_reveal")&&Le.entity_id===U.id){const _t=e.data?.entities.find(Ze=>Ze.id===U.id)?.lifeline_id;_t?e.transition({kind:"region_zoom",lifeline_id:_t}):e.transition({kind:"global_overview"})}}async function J(U,N){const j=U.split(":"),ye=j[0],Be=parseInt(j.slice(1).join(":"),10);try{await e.mountEntity(ye,Be,N)}catch{await e.reload()}}const oe=Ie(null),ge=Ie(""),Me=Ie(null);function Ee(U){oe.value={id:U.id,name:U.title},ge.value=U.title,su(()=>Me.value?.focus())}async function re(){if(!oe.value)return;const U=ge.value.trim();if(!U||U===oe.value.name){oe.value=null;return}try{await e.updateLifeline(oe.value.id,{name:U}),oe.value=null}catch{await e.reload(),oe.value=null}}function he(U){U.key==="Enter"?(U.stopPropagation(),re()):U.key==="Escape"&&(U.stopPropagation(),oe.value=null)}function De(U){e.startSelectingTarget(U.id,U.title)}async function Ve(U){await e.createAssoc(U),e.closeEditAssoc()}async function Te(U){await e.updateAssoc(U.association_id,{relation_type:U.relation_type,confidence:U.confidence,evidence:U.evidence}),e.closeEditAssoc()}async function we(U){e.closeEditAssoc(),await e.deleteAssoc(U)}async function rt(U){if(!e.data)return;const N=e.state;if(N.kind!=="node_focus"&&N.kind!=="relation_reveal")return;const j=N.entity_id;if(!e.data.entities.find(_t=>_t.id===j))return;const Be=e.data.associations.find(_t=>_t.id===U.id);if(!Be)return;const Le=e.data.entities.find(_t=>_t.id===Be.from),pt=e.data.entities.find(_t=>_t.id===Be.to);e.openEditAssoc({id:Be.id,from:Be.from,fromTitle:Le?.title||Be.from,to:Be.to,toTitle:pt?.title||Be.to,relation_type:Be.relation_type,confidence:Be.confidence,status:Be.status,evidence:Be.evidence||[]})}async function lt(U){await y("删除关联","确定删除这条关联？此操作不可撤销。","确认删除",!0)&&await e.deleteAssoc(U)}function xt(U){if((U.ctrlKey||U.metaKey)&&U.key==="k"){U.preventDefault(),U.stopPropagation(),l.value=!l.value;return}if((U.ctrlKey||U.metaKey)&&U.key==="n"){U.preventDefault();let j;const ye=e.state.kind;if(ye==="region_zoom")j=e.state.lifeline_id;else if(ye==="node_focus"||ye==="relation_reveal"){const Be=e.state.entity_id;j=e.data?.entities.find(Le=>Le.id===Be)?.lifeline_id}m(j);return}if(U.key==="/"&&!l.value){const j=U.target;if(j.tagName==="INPUT"||j.tagName==="TEXTAREA")return;U.preventDefault(),l.value=!0;return}if(U.key==="?"){const j=U.target;if(j.tagName==="INPUT"||j.tagName==="TEXTAREA")return;U.preventDefault(),c.value=!c.value;return}if(U.altKey&&U.key==="ArrowLeft"){U.preventDefault(),e.navigateBack();return}if(U.altKey&&U.key==="ArrowRight"){U.preventDefault(),e.navigateForward();return}if((U.ctrlKey||U.metaKey)&&U.key==="e"){U.preventDefault(),v.value=!0;return}if((U.ctrlKey||U.metaKey)&&U.key==="z"){U.preventDefault(),e.undoLast().then(j=>{j&&ae()});return}const N=e.state;if(U.key==="Escape"){if(e.selectingTarget){e.cancelSelecting();return}if($.value||q.value){et();return}if(l.value){l.value=!1;return}N.kind==="relation_reveal"?(Se(),e.transition({kind:"node_focus",entity_kind:N.entity_kind,entity_id:N.entity_id})):N.kind==="node_focus"?e.transition({kind:N.lifeline_id?"region_zoom":"global_overview",lifeline_id:N.lifeline_id}):N.kind==="region_zoom"&&e.transition({kind:"global_overview"})}(U.key==="r"||U.key==="R")&&(N.kind==="node_focus"?z():N.kind==="relation_reveal"&&Se())}function z(){if(!e.data||!n)return;const U=e.state;if(U.kind!=="node_focus")return;const N=U.entity_id;e.transition({kind:"relation_reveal",entity_kind:U.entity_kind,entity_id:N}),a=RS(n.scene,e.data,n.layoutNodes,N,new pe(t.value.clientWidth,t.value.clientHeight));const j=new Set([N]);a.forEach(ye=>{j.add(ye.fromNode.id),j.add(ye.toNode.id)}),IS(n.nodes,j),Q()}function Se(){n&&(xe(),a.forEach(U=>{if(n.scene.remove(U.line),U.line.geometry?.dispose(),U.line.material){const N=U.line.material;Array.isArray(N)?N.forEach(j=>j.dispose()):N.dispose()}U.arrow&&(n.scene.remove(U.arrow),U.arrow.geometry?.dispose(),U.arrow.material instanceof on&&U.arrow.material.dispose())}),a=[],_f(n.nodes))}function le(){if(!n)return;s=requestAnimationFrame(le),i?.update(),kS(.016,n.camera,i);const U=n.camera.position.length(),N=U>3.5?1:U>=2?2:3,j=e.state.kind==="node_focus"||e.state.kind==="relation_reveal";n.nodes.forEach(ye=>{const Be=ye.userData.layer;ye.visible=j||Be<=N}),n.lines.forEach(ye=>{const Be=ye.userData?.fromLayer??3,Le=ye.userData?.toLayer??3;ye.visible=j||Math.max(Be,Le)<=N}),PS(n.nodes,.016),W&&W.syncPositions(n.nodes),n.renderer.render(n.scene,n.camera),W&&K&&(W.update(e.state,n.camera,e.data?.associations),K.render(n.scene,n.camera))}async function ke(){if(!n)return;const U=e.state,N=n.layoutNodes;if(U.kind==="global_overview"){nu(n.scene);for(const j of n.nodes)j.userData.targetPosition=j.userData.homePosition.clone();_f(n.nodes),To(n.camera,i,new I(0,2.5,5.5),new I(0,0,0),60,800)}else if(U.kind==="region_zoom"){nu(n.scene);for(const Le of n.nodes)Le.userData.targetPosition=Le.userData.homePosition.clone();const j=U.lifeline_id;let Be=N.find(Le=>Le.id===j&&Le.layer===1);if(!Be){const Le=N.find(pt=>pt.id===j);if(Le){let pt=Le.parentId;for(;pt;){const _t=N.find(Ze=>Ze.id===pt);if(_t&&_t.layer===1){Be=_t;break}pt=_t?.parentId}}}if(Be){const Le=Be.position.clone().normalize(),pt=Fi.R1+1.8;To(n.camera,i,Le.clone().multiplyScalar(pt),Be.position,50,800);const _t=Be.id,Ze=new Set,It=[_t];for(;It.length>0;){const ct=It.shift();Ze.add(ct),N.filter(gt=>gt.parentId===ct).forEach(gt=>It.push(gt.id))}_m(n.nodes,Ze)}}else if(U.kind==="node_focus"||U.kind==="relation_reveal"){const j=U.entity_id,ye=N.find(ct=>ct.id===j);if(!ye)return;nu(n.scene),DS(n.scene,ye.position,ei("--accent"));const Be=ye.position.clone().normalize(),Le=ye.position.length()+.6,pt=Be.clone().multiplyScalar(Le);To(n.camera,i,pt,ye.position,U.kind==="node_focus"?35:55,800);const{computeFocusLayout:_t}=await yt(async()=>{const{computeFocusLayout:ct}=await Promise.resolve().then(()=>SS);return{computeFocusLayout:ct}},void 0),{targets:Ze,constellationIds:It}=_t(N,j,e.data?.associations||[],Be);for(const ct of n.nodes){const gt=ct.userData.id,kt=Ze.get(gt);ct.userData.targetPosition=kt?kt.clone():ct.userData.homePosition.clone()}LS(n.nodes,It)}}return Io(()=>e.state,ke,{deep:!0}),Io(()=>e.state.kind,()=>{M.value=!0,C.value=!1,b&&clearTimeout(b),b=window.setTimeout(()=>{M.value=!1,C.value=!0},3e3)}),Vi(async()=>{await e.load(),e.data&&await ue()}),ls(()=>{cancelAnimationFrame(s),n?.dispose(),i?.dispose(),window.removeEventListener("keydown",xt),window.removeEventListener("resize",O),W&&(W.dispose(),W=null),K?.domElement&&K.domElement.remove(),b&&clearTimeout(b)}),(U,N)=>(G(),Y("div",SA,[A("div",wA,[Ia(WS,{state:$e(e).state,onNav:N[0]||(N[0]=j=>$e(e).transition(j))},null,8,["state"]),$e(e).state.kind!=="global_overview"?(G(),Y("button",{key:0,class:"home-btn",onClick:N[1]||(N[1]=j=>$e(e).transition({kind:"global_overview"})),title:"回到全局"},"⌂")):Pe("",!0),A("button",{class:"nav-btn",disabled:!$e(e).canGoBack,onClick:N[2]||(N[2]=j=>$e(e).navigateBack()),title:"后退 (Alt+←)"},"←",8,EA),A("button",{class:"nav-btn",disabled:!$e(e).canGoForward,onClick:N[3]||(N[3]=j=>$e(e).navigateForward()),title:"前进 (Alt+→)"},"→",8,TA),g.value>0?(G(),Y("button",{key:1,class:"pending-trigger",onClick:N[4]||(N[4]=j=>p.value=!p.value)}," 待确认 "+fe(g.value),1)):Pe("",!0),$e(e).data?(G(),Y("button",{key:2,class:"export-trigger",onClick:N[5]||(N[5]=j=>v.value=!0),title:"导出数据 (Ctrl+E)"},"导出")):Pe("",!0),l.value?(G(),di(SE,{key:3,onSelect:Et,onClose:N[6]||(N[6]=j=>l.value=!1)})):Pe("",!0),l.value?Pe("",!0):(G(),di(O1,{key:4,onFocusLifeline:me,onFocusEntity:Xe})),l.value?Pe("",!0):(G(),Y("button",{key:5,class:"search-trigger",onClick:N[7]||(N[7]=j=>l.value=!0)},"搜索 ⌘K"))]),$e(e).loading?(G(),Y("div",AA,[...N[26]||(N[26]=[A("div",{class:"loader-ring"},null,-1),A("div",{class:"state-text"},"加载 Atlas…",-1)])])):$e(e).error?(G(),Y("div",CA,[N[27]||(N[27]=A("div",{class:"state-text"},"Cosmos 数据加载失败",-1)),N[28]||(N[28]=A("div",{class:"state-sub"},"API 和 mock 均不可用",-1)),A("button",{class:"retry-btn",onClick:N[8]||(N[8]=j=>$e(e).reload())},"重试")])):$e(e).data&&$e(e).data.lifelines.length===0?(G(),Y("div",RA,[...N[29]||(N[29]=[A("div",{class:"state-text"},"暂无 lifeline",-1),A("div",{class:"state-sub"},"在左侧面板中创建第一条 lifeline 来开始构建知识星球",-1)])])):Pe("",!0),!$e(e).loading&&!$e(e).error&&$e(e).data&&$e(e).data.lifelines.length>0?(G(),Y(je,{key:3},[A("canvas",{ref_key:"canvasRef",ref:t,class:"cosmos-canvas"},null,512),Ia(cE,{ref_key:"nodeDetailRef",ref:w,onEditAssoc:rt,onDeleteAssoc:lt,onCopied:L,onEnterRelation:F,onNavigateEntity:B},null,512),$e(o)&&$e(e).state.kind==="relation_reveal"?(G(),Y("div",IA,fe($e(o)),1)):Pe("",!0),M.value?(G(),Y("div",{key:1,class:Nt(["shortcuts-hint",{fade:C.value}])},[$e(e).state.kind==="global_overview"?(G(),Y(je,{key:0},[an("点击 R1 进入 lifeline   滚轮缩放   拖拽旋转   Ctrl+K 搜索")],64)):$e(e).state.kind==="region_zoom"?(G(),Y(je,{key:1},[an("点击 R2/R3 聚焦 entity   滚轮缩放   Esc 返回全局   Ctrl+K 搜索")],64)):$e(e).state.kind==="node_focus"?(G(),Y(je,{key:2},[an("R 查看关联   Esc 返回 lifeline   拖拽旋转")],64)):$e(e).state.kind==="relation_reveal"?(G(),Y(je,{key:3},[an("Esc 返回焦点   点击关联线查看证据   底部筛选")],64)):Pe("",!0)],2)):Pe("",!0),_.value?(G(),di(RE,{key:2,target:_.value.target,x:_.value.x,y:_.value.y,onClose:N[9]||(N[9]=j=>_.value=null),onEditTitle:R,onDeleteEntity:S,onMoveLifeline:J,onEditLifelineName:Ee,onAssociateTo:De,onFindPathTo:be,onCopyTitle:de,onDeleteLifeline:_e,onQuickCreate:m},null,8,["target","x","y"])):Pe("",!0),x.value?(G(),di(UE,{key:3,title:x.value.title,message:x.value.message,"confirm-label":x.value.confirmLabel,danger:x.value.danger,onConfirm:N[10]||(N[10]=j=>{x.value.resolve(!0),x.value=null}),onCancel:N[11]||(N[11]=j=>{x.value.resolve(!1),x.value=null})},null,8,["title","message","confirm-label","danger"])):Pe("",!0),oe.value?(G(),Y("div",{key:4,class:"create-overlay",onPointerdown:N[15]||(N[15]=j=>oe.value=null)},[A("div",{class:"create-dialog",onPointerdown:N[14]||(N[14]=dn(()=>{},["stop"]))},[N[30]||(N[30]=A("div",{class:"create-title"},"编辑 lifeline 名称",-1)),Tt(A("input",{ref_key:"lifelineEditEl",ref:Me,"onUpdate:modelValue":N[12]||(N[12]=j=>ge.value=j),class:"create-input",onKeydown:he},null,544),[[qt,ge.value]]),A("div",PA,[A("button",{class:"confirm-btn cancel-btn",onClick:N[13]||(N[13]=j=>oe.value=null)},"取消"),A("button",{class:"confirm-btn primary-btn",disabled:!ge.value.trim(),onClick:re},"保存",8,LA)])],32)],32)):Pe("",!0)],64)):Pe("",!0),$e(e).editAssoc?(G(),di(tT,{key:4,"from-id":$e(e).editAssoc.from,"from-title":$e(e).editAssoc.fromTitle,"to-id":$e(e).editAssoc.to,"to-title":$e(e).editAssoc.toTitle,existing:$e(e).editAssoc.id?{id:$e(e).editAssoc.id,relation_type:$e(e).editAssoc.relation_type,confidence:$e(e).editAssoc.confidence,status:$e(e).editAssoc.status,evidence:$e(e).editAssoc.evidence}:void 0,onCancel:N[16]||(N[16]=j=>$e(e).closeEditAssoc()),onCreate:Ve,onUpdate:Te,onDelete:we},null,8,["from-id","from-title","to-id","to-title","existing"])):Pe("",!0),$e(e).selectingTarget?(G(),Y("div",DA," crosshair 点击目标 entity 来创建关联 (Esc 取消) ")):Pe("",!0),$.value?(G(),Y("div",UA," crosshair 点击目标 entity 查找最短路径 (Esc 取消) ")):Pe("",!0),q.value?(G(),di(ST,{key:7,paths:q.value,"current-path-index":ce.value,"from-title":q.value[ce.value]?.[0]?.entityTitle||"","to-title":q.value[ce.value]?.[q.value[ce.value].length-1]?.entityTitle||"",onPrevPath:ht,onNextPath:tt,onClear:et,onFocusEntity:H,onCopied:Z},null,8,["paths","current-path-index","from-title","to-title"])):Pe("",!0),c.value?(G(),di(AT,{key:8,onClose:N[17]||(N[17]=j=>c.value=!1)})):Pe("",!0),h.value?(G(),di(zT,{key:9,"default-lifeline-id":f.value,onClose:N[18]||(N[18]=j=>h.value=!1)},null,8,["default-lifeline-id"])):Pe("",!0),p.value?(G(),di(pA,{key:10,onClose:N[19]||(N[19]=j=>p.value=!1),onFocusEntity:N[20]||(N[20]=j=>{p.value=!1,Xe(j)})})):Pe("",!0),v.value?(G(),di(MA,{key:11,onClose:N[21]||(N[21]=j=>v.value=!1)})):Pe("",!0),u.value?(G(),Y("div",NA,"已复制到剪贴板")):Pe("",!0),Ia(rT,{"show-assoc":$e(e).state.kind==="relation_reveal",filter:D.value,"onUpdate:filter":N[22]||(N[22]=j=>{D.value=j,Q()})},null,8,["show-assoc","filter"]),$e(n)&&$e(e).state.kind!=="node_focus"&&$e(e).state.kind!=="relation_reveal"?(G(),Y("div",FA,[Ia(oT,{"layout-nodes":$e(n).layoutNodes,camera:$e(n).camera,controls:$e(i),"world-radius":$e(Fi).R3,"focused-lifeline-id":$e(e).state.kind==="region_zoom"?$e(e).state.lifeline_id:null,onJump:N[23]||(N[23]=(j,ye)=>$e(To)($e(n).camera,$e(i),j,ye,60,800))},null,8,["layout-nodes","camera","controls","world-radius","focused-lifeline-id"])])):Pe("",!0),$e(e).state.kind==="relation_reveal"?(G(),Y("div",OA,[A("div",kA,[(G(),Y(je,null,Yt(["co_occurrence","causal","tension","derived_from","manual"],j=>A("button",{key:j,class:Nt(["filter-chip",{active:k.types.includes(j)}]),onClick:ye=>ne(j)},fe({co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[j]),11,BA)),64))]),A("div",zA,[A("span",VA,"信心度 ≥ "+fe(k.minConfidence.toFixed(2)),1),Tt(A("input",{"onUpdate:modelValue":N[24]||(N[24]=j=>k.minConfidence=j),type:"range",min:"0",max:"1",step:"0.05",class:"filter-range",onInput:Q},null,544),[[qt,k.minConfidence,void 0,{number:!0}]])]),Tt(A("select",{"onUpdate:modelValue":N[25]||(N[25]=j=>k.status=j),class:"filter-select",onChange:Q},[...N[31]||(N[31]=[A("option",{value:"all"},"全部",-1),A("option",{value:"accepted"},"已确认",-1),A("option",{value:"pending"},"待定",-1)])],544),[[Mi,k.status]]),A("span",GA,"显示 "+fe(V.value)+"/"+fe($e(a).length)+" 条关联",1),$e(a).length>0&&V.value===0?(G(),Y("span",HA,"当前筛选条件下无可见关联")):Pe("",!0)])):Pe("",!0)]))}}),$A=wn(XA,[["__scopeId","data-v-7882d037"]]),ZA=Object.freeze(Object.defineProperty({__proto__:null,default:$A},Symbol.toStringTag,{value:"Module"}));export{gm as C,Cm as M,Qi as P,gn as Q,wr as R,jv as S,Rm as T,pe as V,__ as a,ZA as b,_l as c,I as d};
