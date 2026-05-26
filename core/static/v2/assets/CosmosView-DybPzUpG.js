const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-Bj2wMeSL.js","assets/vue-Cvl-Tb45.js","assets/index-RjWMaq7c.css","assets/OrbitControls-DCk6bNAa.js","assets/labels-BdVxDIC9.js"])))=>i.map(i=>d[i]);
import{_ as yt,a as xn}from"./index-Bj2wMeSL.js";import{m as Cm,u as De,c as Ct,l as yn,s as G,f as W,F as et,v as Wt,e as Le,w as fe,x as qe,b as E,C as At,z as Zt,D as si,y as Si,E as fn,p as Cs,o as Ot,i as ln,A as Lo,h as wa,n as au,r as Gi,q as us,t as Sf,j as La,d as Qn}from"./vue-Cvl-Tb45.js";function Rm(r,e){if(r.kind!==e.kind)return!1;if(r.kind==="global_overview")return!0;const t=r.lifeline_id,n=e.lifeline_id;if(t&&n)return t===n;const i=r.entity_id,s=e.entity_id;return i&&s?i===s:!1}const Hi=Cm("cosmos",()=>{const r=De(null),e=De({kind:"global_overview"}),t=De(!1),n=De(null),i=De(null),s=De([{state:{kind:"global_overview"},title:"全局"}]),a=De(0),o=Ct(()=>a.value>0),l=Ct(()=>a.value<s.value.length-1);function c(H){switch(H.kind){case"global_overview":return"全局";case"region_zoom":return r.value?.lifelines.find(ue=>ue.id===H.lifeline_id)?.name||H.lifeline_id||"?";case"node_focus":case"relation_reveal":{const ae=H.entity_id,ye=r.value?.entities.find($=>$.id===ae)?.title||ae;return H.kind==="relation_reveal"?`${ye} · 关联`:ye}}}function u(H){const ae=s.value[a.value];ae&&Rm(ae.state,H)||(s.value=s.value.slice(0,a.value+1),s.value.push({state:{...H},title:c(H)}),s.value.length>50?s.value.shift():a.value=s.value.length-1)}function d(H){p(`leave_${e.value.kind}`,e.value),e.value=H,i.value=null,p(`enter_${H.kind}`,H)}function h(H){i.value=H}const f={};function p(H,ae){f[H]?.forEach(ue=>ue(ae))}function _(H,ae){f[H]||(f[H]=[]),f[H].push(ae)}async function g(){if(!r.value){t.value=!0;try{const{apiRequest:H}=await yt(async()=>{const{apiRequest:ae}=await import("./index-Bj2wMeSL.js").then(ue=>ue.c);return{apiRequest:ae}},__vite__mapDeps([0,1,2]));r.value=await H("/cosmos"),s.value=[{state:{kind:"global_overview"},title:"全局"}],a.value=0}catch{try{const ae=await fetch("/mock/cosmos.json");r.value=await ae.json(),s.value=[{state:{kind:"global_overview"},title:"全局"}],a.value=0}catch{n.value="Cosmos 数据加载失败"}}finally{t.value=!1}}}function m(H){u(H),d(H)}function v(){o.value&&(a.value--,d(s.value[a.value].state))}function x(){l.value&&(a.value++,d(s.value[a.value].state))}const y=De(null),S=Ct(()=>y.value!==null);function M(H){y.value=H}async function C(){if(!y.value)return null;try{await y.value.redo();const H=y.value.action;return y.value=null,H}catch{return await b(),y.value=null,null}}async function b(){r.value=null,n.value=null,pe.value.clear(),await g()}async function T(H){const{createLifeline:ae}=await yt(async()=>{const{createLifeline:ue}=await import("./index-Bj2wMeSL.js").then(ye=>ye.e);return{createLifeline:ue}},__vite__mapDeps([0,1,2]));await ae(H),await b()}async function P(H,ae){const{updateLifeline:ue}=await yt(async()=>{const{updateLifeline:ye}=await import("./index-Bj2wMeSL.js").then($=>$.e);return{updateLifeline:ye}},__vite__mapDeps([0,1,2]));await ue(H,ae),await b()}async function L(H){const{deleteLifeline:ae}=await yt(async()=>{const{deleteLifeline:ue}=await import("./index-Bj2wMeSL.js").then(ye=>ye.e);return{deleteLifeline:ue}},__vite__mapDeps([0,1,2]));await ae(H),await b()}async function B(H,ae,ue){const{mountEntity:ye}=await yt(async()=>{const{mountEntity:$}=await import("./index-Bj2wMeSL.js").then(D=>D.e);return{mountEntity:$}},__vite__mapDeps([0,1,2]));await ye(H,ae,ue),await b()}async function Q(H,ae){const ye=r.value?.associations.find($=>$.id===H)?.status;if(ye&&ye!==ae&&M({action:ae==="accepted"?"确认关联":"拒绝关联",redo:async()=>{await Q(H,ye)}}),r.value){const $=r.value.associations.findIndex(D=>D.id===H);$!==-1&&(r.value={...r.value,associations:[...r.value.associations.slice(0,$),{...r.value.associations[$],status:ae},...r.value.associations.slice($+1)]})}try{const{reviewAssociation:$}=await yt(async()=>{const{reviewAssociation:D}=await import("./index-Bj2wMeSL.js").then(U=>U.e);return{reviewAssociation:D}},__vite__mapDeps([0,1,2]));await $(H,ae)}catch{await b()}}async function J(H,ae,ue){const ye=`${H}:${ae}`,$=r.value?.entities.find(U=>U.id===ye)?.title;$&&$!==ue&&M({action:"修改标题",redo:async()=>{await J(H,ae,$)}});const{updateEntity:D}=await yt(async()=>{const{updateEntity:U}=await import("./index-Bj2wMeSL.js").then(O=>O.e);return{updateEntity:U}},__vite__mapDeps([0,1,2]));await D(H,ae,{title:ue}),await b()}async function z(H,ae){const ue=`${H}:${ae}`,ye=r.value?.entities.find(D=>D.id===ue);if(ye){const D={title:ye.title,lifeline_id:ye.lifeline_id};M({action:`删除 entity "${ye.title.slice(0,20)}"`,redo:async()=>{if(H==="task"){const{createTask:U}=await yt(async()=>{const{createTask:j}=await import("./index-Bj2wMeSL.js").then(q=>q.e);return{createTask:j}},__vite__mapDeps([0,1,2])),O=await U({title:D.title});D.lifeline_id&&await B("task",O.id,D.lifeline_id)}else if(H==="memory"){const{createMemory:U}=await yt(async()=>{const{createMemory:j}=await import("./index-Bj2wMeSL.js").then(q=>q.e);return{createMemory:j}},__vite__mapDeps([0,1,2])),O=await U({category:"fact",content:D.title});D.lifeline_id&&await B("memory",O.id,D.lifeline_id)}else if(H==="decision"){const{createDecision:U}=await yt(async()=>{const{createDecision:j}=await import("./index-Bj2wMeSL.js").then(q=>q.e);return{createDecision:j}},__vite__mapDeps([0,1,2])),O=await U({title:D.title,decision:D.title});D.lifeline_id&&await B("decision",O.id,D.lifeline_id)}else{const{addNote:U}=await yt(async()=>{const{addNote:j}=await import("./index-Bj2wMeSL.js").then(q=>q.e);return{addNote:j}},__vite__mapDeps([0,1,2])),O=await U(D.title);D.lifeline_id&&await B("item",O.id,D.lifeline_id)}await b()}})}const{deleteEntity:$}=await yt(async()=>{const{deleteEntity:D}=await import("./index-Bj2wMeSL.js").then(U=>U.e);return{deleteEntity:D}},__vite__mapDeps([0,1,2]));await $(H,ae),await b()}async function Y(H){const{createAssociation:ae}=await yt(async()=>{const{createAssociation:ue}=await import("./index-Bj2wMeSL.js").then(ye=>ye.e);return{createAssociation:ue}},__vite__mapDeps([0,1,2]));await ae({...H,status:"accepted"}),await b()}async function K(H,ae){const{updateAssociation:ue}=await yt(async()=>{const{updateAssociation:ye}=await import("./index-Bj2wMeSL.js").then($=>$.e);return{updateAssociation:ye}},__vite__mapDeps([0,1,2]));await ue(H,ae),await b()}async function de(H){const ae=r.value?.associations.find(ye=>ye.id===H);if(ae){const ye={from:ae.from,to:ae.to,relation_type:ae.relation_type,confidence:ae.confidence,evidence:ae.evidence||[]};M({action:"删除关联",redo:async()=>{await Y(ye)}})}const{deleteAssociation:ue}=await yt(async()=>{const{deleteAssociation:ye}=await import("./index-Bj2wMeSL.js").then($=>$.e);return{deleteAssociation:ye}},__vite__mapDeps([0,1,2]));await ue(H),await b()}const pe=De(new Map),ve=De(null),Ce=De(null);function Be(H,ae){ve.value={fromId:H,fromTitle:ae}}function st(){ve.value=null}function dt(H){Ce.value=H}function tt(){Ce.value=null}return{data:r,state:e,loading:t,error:n,load:g,reload:b,transition:m,on:_,createLifeline:T,updateLifeline:P,deleteLifeline:L,mountEntity:B,reviewAssociation:Q,selectedAssocId:i,selectAssociation:h,updateEntityTitle:J,deleteEntityById:z,canGoBack:o,canGoForward:l,navigateBack:v,navigateForward:x,canUndo:S,undoLast:C,createAssoc:Y,updateAssoc:K,deleteAssoc:de,selectingTarget:ve,startSelectingTarget:Be,cancelSelecting:st,editAssoc:Ce,openEditAssoc:dt,closeEditAssoc:tt,entityDetailCache:pe}});/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Al="184",Im={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Pm={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},wf=0,ou=1,Ef=2,Lm=3,Dm=0,Zr=1,Tf=2,pr=3,Bi=0,An=1,xi=2,wi=0,Ls=1,lu=2,cu=3,uu=4,Af=5,Um=6,ns=100,Cf=101,Rf=102,If=103,Pf=104,Lf=200,Df=201,Uf=202,Nf=203,Do=204,Uo=205,Ff=206,Of=207,kf=208,Bf=209,zf=210,Vf=211,Gf=212,Hf=213,Wf=214,No=0,Fo=1,Oo=2,Fs=3,ko=4,Bo=5,zo=6,Vo=7,Ea=0,Xf=1,$f=2,oi=0,Ru=1,Iu=2,Pu=3,Lu=4,Du=5,Uu=6,Nu=7,du="attached",qf="detached",Cl=300,Ei=301,as=302,Kr=303,Jr=304,Er=306,aa=1e3,Un=1001,oa=1002,Kt=1003,Fu=1004,Nm=1004,mr=1005,Fm=1005,Bt=1006,jr=1007,Om=1007,bi=1008,km=1008,Ln=1009,Ou=1010,ku=1011,xr=1012,Rl=1013,Kn=1014,En=1015,Ti=1016,Il=1017,Pl=1018,yr=1020,Bu=35902,zu=35899,Vu=1021,Gu=1022,Tn=1023,Ai=1026,is=1027,Ll=1028,Ta=1029,os=1030,Dl=1031,Bm=1032,Ul=1033,Qr=33776,ea=33777,ta=33778,na=33779,Go=35840,Ho=35841,Wo=35842,Xo=35843,$o=36196,qo=37492,Yo=37496,Zo=37488,Ko=37489,la=37490,Jo=37491,jo=37808,Qo=37809,el=37810,tl=37811,nl=37812,il=37813,sl=37814,rl=37815,al=37816,ol=37817,ll=37818,cl=37819,ul=37820,dl=37821,hl=36492,fl=36494,pl=36495,ml=36283,gl=36284,ca=36285,_l=36286,Yf=2200,Zf=2201,Kf=2202,ua=2300,vl=2301,Ro=2302,hu=2303,Rs=2400,Is=2401,da=2402,Nl=2500,Hu=2501,zm=0,Vm=1,Gm=2,Jf=3200,Hm=3201,Wm=3202,Xm=3203,zi=0,jf=1,Ni="",Pn="srgb",ha="srgb-linear",fa="linear",Rt="srgb",$m="",qm="rg",Ym="ga",Zm=0,Ts=7680,Km=7681,Jm=7682,jm=7683,Qm=34055,eg=34056,tg=5386,ng=512,ig=513,sg=514,rg=515,ag=516,og=517,lg=518,fu=519,Qf=512,ep=513,tp=514,Fl=515,np=516,ip=517,Ol=518,sp=519,pa=35044,cg=35048,ug=35040,dg=35045,hg=35049,fg=35041,pg=35046,mg=35050,gg=35042,_g="100",pu="300 es",Hn=2e3,Os=2001,vg={COMPUTE:"compute",RENDER:"render"},xg={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},yg={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},bg={TEXTURE_COMPARE:"depthTextureCompare"};function Mg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}const Sg={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function gr(r,e){return new Sg[r](e)}function rp(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function ma(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function ap(){const r=ma("canvas");return r.style.display="block",r}const Rd={};let ls=null;function wg(r){ls=r}function Eg(){return ls}function ga(...r){const e="THREE."+r.shift();ls?ls("log",e,...r):console.log(e,...r)}function op(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Re(...r){r=op(r);const e="THREE."+r.shift();if(ls)ls("warn",e,...r);else{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function Ye(...r){r=op(r);const e="THREE."+r.shift();if(ls)ls("error",e,...r);else{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function xl(...r){const e=r.join(" ");e in Rd||(Rd[e]=!0,Re(...r))}function Tg(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Ag={[No]:Fo,[Oo]:zo,[ko]:Vo,[Fs]:Bo,[Fo]:No,[zo]:Oo,[Vo]:ko,[Bo]:Fs};class ui{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Id=1234567;const Ds=Math.PI/180,br=180/Math.PI;function Xn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(mn[r&255]+mn[r>>8&255]+mn[r>>16&255]+mn[r>>24&255]+"-"+mn[e&255]+mn[e>>8&255]+"-"+mn[e>>16&15|64]+mn[e>>24&255]+"-"+mn[t&63|128]+mn[t>>8&255]+"-"+mn[t>>16&255]+mn[t>>24&255]+mn[n&255]+mn[n>>8&255]+mn[n>>16&255]+mn[n>>24&255]).toLowerCase()}function at(r,e,t){return Math.max(e,Math.min(t,r))}function Wu(r,e){return(r%e+e)%e}function Cg(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Rg(r,e,t){return r!==e?(t-r)/(e-r):0}function ia(r,e,t){return(1-t)*r+t*e}function Ig(r,e,t,n){return ia(r,e,1-Math.exp(-t*n))}function Pg(r,e=1){return e-Math.abs(Wu(r,e*2)-e)}function Lg(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Dg(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Ug(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Ng(r,e){return r+Math.random()*(e-r)}function Fg(r){return r*(.5-Math.random())}function Og(r){r!==void 0&&(Id=r);let e=Id+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function kg(r){return r*Ds}function Bg(r){return r*br}function zg(r){return(r&r-1)===0&&r!==0}function Vg(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Gg(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Hg(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),d=s((e-n)/2),h=a((e-n)/2),f=s((n-e)/2),p=a((n-e)/2);switch(i){case"XYX":r.set(o*u,l*d,l*h,o*c);break;case"YZY":r.set(l*h,o*u,l*d,o*c);break;case"ZXZ":r.set(l*d,l*h,o*u,o*c);break;case"XZX":r.set(o*u,l*p,l*f,o*c);break;case"YXY":r.set(l*f,o*u,l*p,o*c);break;case"ZYZ":r.set(l*p,l*f,o*u,o*c);break;default:Re("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function wn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function pt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const yl={DEG2RAD:Ds,RAD2DEG:br,generateUUID:Xn,clamp:at,euclideanModulo:Wu,mapLinear:Cg,inverseLerp:Rg,lerp:ia,damp:Ig,pingpong:Pg,smoothstep:Lg,smootherstep:Dg,randInt:Ug,randFloat:Ng,randFloatSpread:Fg,seededRandom:Og,degToRad:kg,radToDeg:Bg,isPowerOfTwo:zg,ceilPowerOfTwo:Vg,floorPowerOfTwo:Gg,setQuaternionFromProperEuler:Hg,normalize:pt,denormalize:wn},Sd=class Sd{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(at(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(at(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Sd.prototype.isVector2=!0;let ge=Sd;class vn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3],h=s[a+0],f=s[a+1],p=s[a+2],_=s[a+3];if(d!==_||l!==h||c!==f||u!==p){let g=l*h+c*f+u*p+d*_;g<0&&(h=-h,f=-f,p=-p,_=-_,g=-g);let m=1-o;if(g<.9995){const v=Math.acos(g),x=Math.sin(v);m=Math.sin(m*v)/x,o=Math.sin(o*v)/x,l=l*m+h*o,c=c*m+f*o,u=u*m+p*o,d=d*m+_*o}else{l=l*m+h*o,c=c*m+f*o,u=u*m+p*o,d=d*m+_*o;const v=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=v,c*=v,u*=v,d*=v}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[a],h=s[a+1],f=s[a+2],p=s[a+3];return e[t]=o*p+u*d+l*f-c*h,e[t+1]=l*p+u*h+c*d-o*f,e[t+2]=c*p+u*f+o*h-l*d,e[t+3]=u*p-o*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),d=o(s/2),h=l(n/2),f=l(i/2),p=l(s/2);switch(a){case"XYZ":this._x=h*u*d+c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d-h*f*p;break;case"YXZ":this._x=h*u*d+c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d+h*f*p;break;case"ZXY":this._x=h*u*d-c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d-h*f*p;break;case"ZYX":this._x=h*u*d-c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d+h*f*p;break;case"YZX":this._x=h*u*d+c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d-h*f*p;break;case"XZY":this._x=h*u*d-c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d+h*f*p;break;default:Re("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(at(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+i*c-s*l,this._y=i*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const wd=class wd{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Pd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Pd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),u=2*(o*t-s*i),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-s*d,this.z=i+l*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this.z=at(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this.z=at(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(at(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return uc.copy(this).projectOnVector(e),this.sub(uc)}reflect(e){return this.sub(uc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(at(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};wd.prototype.isVector3=!0;let I=wd;const uc=new I,Pd=new vn,Ed=class Ed{constructor(e,t,n,i,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],p=n[8],_=i[0],g=i[3],m=i[6],v=i[1],x=i[4],y=i[7],S=i[2],M=i[5],C=i[8];return s[0]=a*_+o*v+l*S,s[3]=a*g+o*x+l*M,s[6]=a*m+o*y+l*C,s[1]=c*_+u*v+d*S,s[4]=c*g+u*x+d*M,s[7]=c*m+u*y+d*C,s[2]=h*_+f*v+p*S,s[5]=h*g+f*x+p*M,s[8]=h*m+f*y+p*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*s,f=c*s-a*l,p=t*d+n*h+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=d*_,e[1]=(i*c-u*n)*_,e[2]=(o*n-i*a)*_,e[3]=h*_,e[4]=(u*t-i*l)*_,e[5]=(i*s-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(dc.makeScale(e,t)),this}rotate(e){return this.premultiply(dc.makeRotation(-e)),this}translate(e,t){return this.premultiply(dc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Ed.prototype.isMatrix3=!0;let ct=Ed;const dc=new ct,Ld=new ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dd=new ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Wg(){const r={enabled:!0,workingColorSpace:ha,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Rt&&(i.r=ki(i.r),i.g=ki(i.g),i.b=ki(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Rt&&(i.r=vr(i.r),i.g=vr(i.g),i.b=vr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ni?fa:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return xl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return xl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[ha]:{primaries:e,whitePoint:n,transfer:fa,toXYZ:Ld,fromXYZ:Dd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Pn},outputColorSpaceConfig:{drawingBufferColorSpace:Pn}},[Pn]:{primaries:e,whitePoint:n,transfer:Rt,toXYZ:Ld,fromXYZ:Dd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Pn}}}),r}const xt=Wg();function ki(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function vr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let $s;class lp{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{$s===void 0&&($s=ma("canvas")),$s.width=e.width,$s.height=e.height;const i=$s.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=$s}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ma("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=ki(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ki(t[n]/255)*255):t[n]=ki(t[n]);return{data:t,width:e.width,height:e.height}}else return Re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Xg=0;class ss{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xg++}),this.uuid=Xn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(hc(i[a].image)):s.push(hc(i[a]))}else s=hc(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function hc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?lp.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Re("Texture: Unable to serialize Texture."),{})}let $g=0;const fc=new I;class Vt extends ui{constructor(e=Vt.DEFAULT_IMAGE,t=Vt.DEFAULT_MAPPING,n=Un,i=Un,s=Bt,a=bi,o=Tn,l=Ln,c=Vt.DEFAULT_ANISOTROPY,u=Ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$g++}),this.uuid=Xn(),this.name="",this.source=new ss(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ge(0,0),this.repeat=new ge(1,1),this.center=new ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(fc).x}get height(){return this.source.getSize(fc).y}get depth(){return this.source.getSize(fc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Re(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Re(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Cl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case aa:e.x=e.x-Math.floor(e.x);break;case Un:e.x=e.x<0?0:1;break;case oa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case aa:e.y=e.y-Math.floor(e.y);break;case Un:e.y=e.y<0?0:1;break;case oa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Vt.DEFAULT_IMAGE=null;Vt.DEFAULT_MAPPING=Cl;Vt.DEFAULT_ANISOTROPY=1;const Td=class Td{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,y=(f+1)/2,S=(m+1)/2,M=(u+h)/4,C=(d+_)/4,b=(p+g)/4;return x>y&&x>S?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=M/n,s=C/n):y>S?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=M/i,s=b/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=C/s,i=b/s),this.set(n,i,s,t),this}let v=Math.sqrt((g-p)*(g-p)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(d-_)/v,this.z=(h-u)/v,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this.z=at(this.z,e.z,t.z),this.w=at(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this.z=at(this.z,e,t),this.w=at(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(at(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Td.prototype.isVector4=!0;let Mt=Td;class Xu extends ui{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Mt(0,0,e,t),this.scissorTest=!1,this.viewport=new Mt(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},s=new Vt(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new ss(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $n extends Xu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class kl extends Vt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class qg extends $n{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new kl(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class Bl extends Vt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yg extends $n{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Bl(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}const Tl=class Tl{constructor(e,t,n,i,s,a,o,l,c,u,d,h,f,p,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,u,d,h,f,p,_,g)}set(e,t,n,i,s,a,o,l,c,u,d,h,f,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=h,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Tl().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/qs.setFromMatrixColumn(e,0).length(),s=1/qs.setFromMatrixColumn(e,1).length(),a=1/qs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=a*u,f=a*d,p=o*u,_=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+p*c,t[5]=h-_*c,t[9]=-o*l,t[2]=_-h*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,f=l*d,p=c*u,_=c*d;t[0]=h+_*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-p,t[6]=_+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,f=l*d,p=c*u,_=c*d;t[0]=h-_*o,t[4]=-a*d,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*u,t[9]=_-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,f=a*d,p=o*u,_=o*d;t[0]=l*u,t[4]=p*c-f,t[8]=h*c+_,t[1]=l*d,t[5]=_*c+h,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*u,t[4]=_-h*d,t[8]=p*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+p,t[10]=h-_*d}else if(e.order==="XZY"){const h=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+_,t[5]=a*u,t[9]=f*d-p,t[2]=p*d-f,t[6]=o*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zg,e,Kg)}lookAt(e,t,n){const i=this.elements;return Bn.subVectors(e,t),Bn.lengthSq()===0&&(Bn.z=1),Bn.normalize(),Yi.crossVectors(n,Bn),Yi.lengthSq()===0&&(Math.abs(n.z)===1?Bn.x+=1e-4:Bn.z+=1e-4,Bn.normalize(),Yi.crossVectors(n,Bn)),Yi.normalize(),Da.crossVectors(Bn,Yi),i[0]=Yi.x,i[4]=Da.x,i[8]=Bn.x,i[1]=Yi.y,i[5]=Da.y,i[9]=Bn.y,i[2]=Yi.z,i[6]=Da.z,i[10]=Bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],v=n[3],x=n[7],y=n[11],S=n[15],M=i[0],C=i[4],b=i[8],T=i[12],P=i[1],L=i[5],B=i[9],Q=i[13],J=i[2],z=i[6],Y=i[10],K=i[14],de=i[3],pe=i[7],ve=i[11],Ce=i[15];return s[0]=a*M+o*P+l*J+c*de,s[4]=a*C+o*L+l*z+c*pe,s[8]=a*b+o*B+l*Y+c*ve,s[12]=a*T+o*Q+l*K+c*Ce,s[1]=u*M+d*P+h*J+f*de,s[5]=u*C+d*L+h*z+f*pe,s[9]=u*b+d*B+h*Y+f*ve,s[13]=u*T+d*Q+h*K+f*Ce,s[2]=p*M+_*P+g*J+m*de,s[6]=p*C+_*L+g*z+m*pe,s[10]=p*b+_*B+g*Y+m*ve,s[14]=p*T+_*Q+g*K+m*Ce,s[3]=v*M+x*P+y*J+S*de,s[7]=v*C+x*L+y*z+S*pe,s[11]=v*b+x*B+y*Y+S*ve,s[15]=v*T+x*Q+y*K+S*Ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15],v=l*f-c*h,x=o*f-c*d,y=o*h-l*d,S=a*f-c*u,M=a*h-l*u,C=a*d-o*u;return t*(_*v-g*x+m*y)-n*(p*v-g*S+m*M)+i*(p*x-_*S+m*C)-s*(p*y-_*M+g*C)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],v=t*o-n*a,x=t*l-i*a,y=t*c-s*a,S=n*l-i*o,M=n*c-s*o,C=i*c-s*l,b=u*_-d*p,T=u*g-h*p,P=u*m-f*p,L=d*g-h*_,B=d*m-f*_,Q=h*m-f*g,J=v*Q-x*B+y*L+S*P-M*T+C*b;if(J===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/J;return e[0]=(o*Q-l*B+c*L)*z,e[1]=(i*B-n*Q-s*L)*z,e[2]=(_*C-g*M+m*S)*z,e[3]=(h*M-d*C-f*S)*z,e[4]=(l*P-a*Q-c*T)*z,e[5]=(t*Q-i*P+s*T)*z,e[6]=(g*y-p*C-m*x)*z,e[7]=(u*C-h*y+f*x)*z,e[8]=(a*B-o*P+c*b)*z,e[9]=(n*P-t*B-s*b)*z,e[10]=(p*M-_*y+m*v)*z,e[11]=(d*y-u*M-f*v)*z,e[12]=(o*T-a*L-l*b)*z,e[13]=(t*L-n*T+i*b)*z,e[14]=(_*x-p*S-g*v)*z,e[15]=(u*S-d*x+h*v)*z,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,d=o+o,h=s*c,f=s*u,p=s*d,_=a*u,g=a*d,m=o*d,v=l*c,x=l*u,y=l*d,S=n.x,M=n.y,C=n.z;return i[0]=(1-(_+m))*S,i[1]=(f+y)*S,i[2]=(p-x)*S,i[3]=0,i[4]=(f-y)*M,i[5]=(1-(h+m))*M,i[6]=(g+v)*M,i[7]=0,i[8]=(p+x)*C,i[9]=(g-v)*C,i[10]=(1-(h+_))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=qs.set(i[0],i[1],i[2]).length();const o=qs.set(i[4],i[5],i[6]).length(),l=qs.set(i[8],i[9],i[10]).length();s<0&&(a=-a),ei.copy(this);const c=1/a,u=1/o,d=1/l;return ei.elements[0]*=c,ei.elements[1]*=c,ei.elements[2]*=c,ei.elements[4]*=u,ei.elements[5]*=u,ei.elements[6]*=u,ei.elements[8]*=d,ei.elements[9]*=d,ei.elements[10]*=d,t.setFromRotationMatrix(ei),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,s,a,o=Hn,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i);let p,_;if(l)p=s/(a-s),_=a*s/(a-s);else if(o===Hn)p=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Os)p=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=Hn,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-i),h=-(t+e)/(t-e),f=-(n+i)/(n-i);let p,_;if(l)p=1/(a-s),_=a/(a-s);else if(o===Hn)p=-2/(a-s),_=-(a+s)/(a-s);else if(o===Os)p=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Tl.prototype.isMatrix4=!0;let rt=Tl;const qs=new I,ei=new rt,Zg=new I(0,0,0),Kg=new I(1,1,1),Yi=new I,Da=new I,Bn=new I,Ud=new rt,Nd=new vn;class ci{constructor(e=0,t=0,n=0,i=ci.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],d=i[2],h=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(at(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-at(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(at(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-at(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(at(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-at(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Re("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ud.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ud,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Nd.setFromEuler(this),this.setFromQuaternion(Nd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ci.DEFAULT_ORDER="XYZ";class zl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Jg=0;const Fd=new I,Ys=new vn,Ri=new rt,Ua=new I,Lr=new I,jg=new I,Qg=new vn,Od=new I(1,0,0),kd=new I(0,1,0),Bd=new I(0,0,1),zd={type:"added"},e_={type:"removed"},Zs={type:"childadded",child:null},pc={type:"childremoved",child:null};class St extends ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jg++}),this.uuid=Xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new I,t=new ci,n=new vn,i=new I(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new rt},normalMatrix:{value:new ct}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.multiply(Ys),this}rotateOnWorldAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.premultiply(Ys),this}rotateX(e){return this.rotateOnAxis(Od,e)}rotateY(e){return this.rotateOnAxis(kd,e)}rotateZ(e){return this.rotateOnAxis(Bd,e)}translateOnAxis(e,t){return Fd.copy(e).applyQuaternion(this.quaternion),this.position.add(Fd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Od,e)}translateY(e){return this.translateOnAxis(kd,e)}translateZ(e){return this.translateOnAxis(Bd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ua.copy(e):Ua.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(Lr,Ua,this.up):Ri.lookAt(Ua,Lr,this.up),this.quaternion.setFromRotationMatrix(Ri),i&&(Ri.extractRotation(i.matrixWorld),Ys.setFromRotationMatrix(Ri),this.quaternion.premultiply(Ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ye("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zd),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null):Ye("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(e_),pc.child=e,this.dispatchEvent(pc),pc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zd),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Lr,e,jg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Lr,Qg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}St.DEFAULT_UP=new I(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class _r extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const t_={type:"move"};class Io{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _r,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _r,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _r,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&h>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(t_)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new _r;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const cp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},Na={h:0,s:0,l:0};function mc(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Fe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Pn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,xt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=xt.workingColorSpace){return this.r=e,this.g=t,this.b=n,xt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=xt.workingColorSpace){if(e=Wu(e,1),t=at(t,0,1),n=at(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=mc(a,s,e+1/3),this.g=mc(a,s,e),this.b=mc(a,s,e-1/3)}return xt.colorSpaceToWorking(this,i),this}setStyle(e,t=Pn){function n(s){s!==void 0&&parseFloat(s)<1&&Re("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Re("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Re("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Pn){const n=cp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Re("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}copyLinearToSRGB(e){return this.r=vr(e.r),this.g=vr(e.g),this.b=vr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pn){return xt.workingToColorSpace(gn.copy(this),e),Math.round(at(gn.r*255,0,255))*65536+Math.round(at(gn.g*255,0,255))*256+Math.round(at(gn.b*255,0,255))}getHexString(e=Pn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=xt.workingColorSpace){xt.workingToColorSpace(gn.copy(this),t);const n=gn.r,i=gn.g,s=gn.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=xt.workingColorSpace){return xt.workingToColorSpace(gn.copy(this),t),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=Pn){xt.workingToColorSpace(gn.copy(this),e);const t=gn.r,n=gn.g,i=gn.b;return e!==Pn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Zi),this.setHSL(Zi.h+e,Zi.s+t,Zi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Zi),e.getHSL(Na);const n=ia(Zi.h,Na.h,t),i=ia(Zi.s,Na.s,t),s=ia(Zi.l,Na.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new Fe;Fe.NAMES=cp;class Vl{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Fe(e),this.density=t}clone(){return new Vl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Gl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Fe(e),this.near=t,this.far=n}clone(){return new Gl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class $u extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ci,this.environmentIntensity=1,this.environmentRotation=new ci,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const ti=new I,Ii=new I,gc=new I,Pi=new I,Ks=new I,Js=new I,Vd=new I,_c=new I,vc=new I,xc=new I,yc=new Mt,bc=new Mt,Mc=new Mt;class Dn{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ti.subVectors(e,t),i.cross(ti);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){ti.subVectors(i,t),Ii.subVectors(n,t),gc.subVectors(e,t);const a=ti.dot(ti),o=ti.dot(Ii),l=ti.dot(gc),c=Ii.dot(Ii),u=Ii.dot(gc),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const h=1/d,f=(c*l-o*u)*h,p=(a*u-o*l)*h;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Pi)===null?!1:Pi.x>=0&&Pi.y>=0&&Pi.x+Pi.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,Pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Pi.x),l.addScaledVector(a,Pi.y),l.addScaledVector(o,Pi.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return yc.setScalar(0),bc.setScalar(0),Mc.setScalar(0),yc.fromBufferAttribute(e,t),bc.fromBufferAttribute(e,n),Mc.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(yc,s.x),a.addScaledVector(bc,s.y),a.addScaledVector(Mc,s.z),a}static isFrontFacing(e,t,n,i){return ti.subVectors(n,t),Ii.subVectors(e,t),ti.cross(Ii).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ti.subVectors(this.c,this.b),Ii.subVectors(this.a,this.b),ti.cross(Ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Dn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Dn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Dn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Dn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Dn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;Ks.subVectors(i,n),Js.subVectors(s,n),_c.subVectors(e,n);const l=Ks.dot(_c),c=Js.dot(_c);if(l<=0&&c<=0)return t.copy(n);vc.subVectors(e,i);const u=Ks.dot(vc),d=Js.dot(vc);if(u>=0&&d<=u)return t.copy(i);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Ks,a);xc.subVectors(e,s);const f=Ks.dot(xc),p=Js.dot(xc);if(p>=0&&f<=p)return t.copy(s);const _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Js,o);const g=u*p-f*d;if(g<=0&&d-u>=0&&f-p>=0)return Vd.subVectors(s,i),o=(d-u)/(d-u+(f-p)),t.copy(i).addScaledVector(Vd,o);const m=1/(g+_+h);return a=_*m,o=h*m,t.copy(n).addScaledVector(Ks,a).addScaledVector(Js,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Qt{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ni.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ni.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ni.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ni):ni.fromBufferAttribute(s,a),ni.applyMatrix4(e.matrixWorld),this.expandByPoint(ni);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Fa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Fa.copy(n.boundingBox)),Fa.applyMatrix4(e.matrixWorld),this.union(Fa)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ni),ni.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Dr),Oa.subVectors(this.max,Dr),js.subVectors(e.a,Dr),Qs.subVectors(e.b,Dr),er.subVectors(e.c,Dr),Ki.subVectors(Qs,js),Ji.subVectors(er,Qs),ps.subVectors(js,er);let t=[0,-Ki.z,Ki.y,0,-Ji.z,Ji.y,0,-ps.z,ps.y,Ki.z,0,-Ki.x,Ji.z,0,-Ji.x,ps.z,0,-ps.x,-Ki.y,Ki.x,0,-Ji.y,Ji.x,0,-ps.y,ps.x,0];return!Sc(t,js,Qs,er,Oa)||(t=[1,0,0,0,1,0,0,0,1],!Sc(t,js,Qs,er,Oa))?!1:(ka.crossVectors(Ki,Ji),t=[ka.x,ka.y,ka.z],Sc(t,js,Qs,er,Oa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ni).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ni).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Li=[new I,new I,new I,new I,new I,new I,new I,new I],ni=new I,Fa=new Qt,js=new I,Qs=new I,er=new I,Ki=new I,Ji=new I,ps=new I,Dr=new I,Oa=new I,ka=new I,ms=new I;function Sc(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){ms.fromArray(r,s);const o=i.x*Math.abs(ms.x)+i.y*Math.abs(ms.y)+i.z*Math.abs(ms.z),l=e.dot(ms),c=t.dot(ms),u=n.dot(ms);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Fi=n_();function n_(){const r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,s[l]=c|u}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}function In(r){Math.abs(r)>65504&&Re("DataUtils.toHalfFloat(): Value out of range."),r=at(r,-65504,65504),Fi.floatView[0]=r;const e=Fi.uint32View[0],t=e>>23&511;return Fi.baseTable[t]+((e&8388607)>>Fi.shiftTable[t])}function $r(r){const e=r>>10;return Fi.uint32View[0]=Fi.mantissaTable[Fi.offsetTable[e]+(r&1023)]+Fi.exponentTable[e],Fi.floatView[0]}class i_{static toHalfFloat(e){return In(e)}static fromHalfFloat(e){return $r(e)}}const Jt=new I,Ba=new ge;let s_=0;class Ut extends ui{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:s_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=pa,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ba.fromBufferAttribute(this,t),Ba.applyMatrix3(e),this.setXY(t,Ba.x,Ba.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix3(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array),s=pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==pa&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class r_ extends Ut{constructor(e,t,n){super(new Int8Array(e),t,n)}}class a_ extends Ut{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class o_ extends Ut{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class l_ extends Ut{constructor(e,t,n){super(new Int16Array(e),t,n)}}class qu extends Ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class c_ extends Ut{constructor(e,t,n){super(new Int32Array(e),t,n)}}class Yu extends Ut{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class u_ extends Ut{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=$r(this.array[e*this.itemSize]);return this.normalized&&(t=wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize]=In(t),this}getY(e){let t=$r(this.array[e*this.itemSize+1]);return this.normalized&&(t=wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+1]=In(t),this}getZ(e){let t=$r(this.array[e*this.itemSize+2]);return this.normalized&&(t=wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+2]=In(t),this}getW(e){let t=$r(this.array[e*this.itemSize+3]);return this.normalized&&(t=wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+3]=In(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.array[e+0]=In(t),this.array[e+1]=In(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array)),this.array[e+0]=In(t),this.array[e+1]=In(n),this.array[e+2]=In(i),this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array),s=pt(s,this.array)),this.array[e+0]=In(t),this.array[e+1]=In(n),this.array[e+2]=In(i),this.array[e+3]=In(s),this}}class Ge extends Ut{constructor(e,t,n){super(new Float32Array(e),t,n)}}const d_=new Qt,Ur=new I,wc=new I;class en{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):d_.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ur.subVectors(e,this.center);const t=Ur.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ur,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(wc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ur.copy(e.center).add(wc)),this.expandByPoint(Ur.copy(e.center).sub(wc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let h_=0;const Zn=new rt,Ec=new St,tr=new I,zn=new Qt,Nr=new Qt,rn=new I;class ut extends ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:h_++}),this.uuid=Xn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Mg(e)?Yu:qu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ct().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Zn.makeRotationFromQuaternion(e),this.applyMatrix4(Zn),this}rotateX(e){return Zn.makeRotationX(e),this.applyMatrix4(Zn),this}rotateY(e){return Zn.makeRotationY(e),this.applyMatrix4(Zn),this}rotateZ(e){return Zn.makeRotationZ(e),this.applyMatrix4(Zn),this}translate(e,t,n){return Zn.makeTranslation(e,t,n),this.applyMatrix4(Zn),this}scale(e,t,n){return Zn.makeScale(e,t,n),this.applyMatrix4(Zn),this}lookAt(e){return Ec.lookAt(e),Ec.updateMatrix(),this.applyMatrix4(Ec.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(tr).negate(),this.translate(tr.x,tr.y,tr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ge(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];zn.setFromBufferAttribute(s),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,zn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,zn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(zn.min),this.boundingBox.expandByPoint(zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ye('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new en);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(zn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Nr.setFromBufferAttribute(o),this.morphTargetsRelative?(rn.addVectors(zn.min,Nr.min),zn.expandByPoint(rn),rn.addVectors(zn.max,Nr.max),zn.expandByPoint(rn)):(zn.expandByPoint(Nr.min),zn.expandByPoint(Nr.max))}zn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)rn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(rn));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)rn.fromBufferAttribute(o,c),l&&(tr.fromBufferAttribute(e,c),rn.add(tr)),i=Math.max(i,n.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Ye('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ye("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ut(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let b=0;b<n.count;b++)o[b]=new I,l[b]=new I;const c=new I,u=new I,d=new I,h=new ge,f=new ge,p=new ge,_=new I,g=new I;function m(b,T,P){c.fromBufferAttribute(n,b),u.fromBufferAttribute(n,T),d.fromBufferAttribute(n,P),h.fromBufferAttribute(s,b),f.fromBufferAttribute(s,T),p.fromBufferAttribute(s,P),u.sub(c),d.sub(c),f.sub(h),p.sub(h);const L=1/(f.x*p.y-p.x*f.y);isFinite(L)&&(_.copy(u).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(L),g.copy(d).multiplyScalar(f.x).addScaledVector(u,-p.x).multiplyScalar(L),o[b].add(_),o[T].add(_),o[P].add(_),l[b].add(g),l[T].add(g),l[P].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let b=0,T=v.length;b<T;++b){const P=v[b],L=P.start,B=P.count;for(let Q=L,J=L+B;Q<J;Q+=3)m(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}const x=new I,y=new I,S=new I,M=new I;function C(b){S.fromBufferAttribute(i,b),M.copy(S);const T=o[b];x.copy(T),x.sub(S.multiplyScalar(S.dot(T))).normalize(),y.crossVectors(M,T);const L=y.dot(l[b])<0?-1:1;a.setXYZW(b,x.x,x.y,x.z,L)}for(let b=0,T=v.length;b<T;++b){const P=v[b],L=P.start,B=P.count;for(let Q=L,J=L+B;Q<J;Q+=3)C(e.getX(Q+0)),C(e.getX(Q+1)),C(e.getX(Q+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ut(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const i=new I,s=new I,a=new I,o=new I,l=new I,c=new I,u=new I,d=new I;if(e)for(let h=0,f=e.count;h<f;h+=3){const p=e.getX(h+0),_=e.getX(h+1),g=e.getX(h+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),u.subVectors(a,s),d.subVectors(i,s),u.cross(d),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)i.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(i,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)rn.fromBufferAttribute(e,t),rn.normalize(),e.setXYZ(t,rn.x,rn.y,rn.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u);let f=0,p=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*u;for(let m=0;m<u;m++)h[p++]=c[f++]}return new Ut(h,u,d)}if(this.index===null)return Re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ut,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Hl{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=pa,this.updateRanges=[],this.version=0,this.uuid=Xn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const bn=new I;class Wn{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyMatrix4(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyNormalMatrix(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.transformDirection(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array),s=pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){ga("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Ut(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Wn(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ga("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let f_=0;class cn extends ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:f_++}),this.uuid=Xn(),this.name="",this.type="Material",this.blending=Ls,this.side=Bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Do,this.blendDst=Uo,this.blendEquation=ns,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Fe(0,0,0),this.blendAlpha=0,this.depthFunc=Fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ts,this.stencilZFail=Ts,this.stencilZPass=Ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Re(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Re(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ls&&(n.blending=this.blending),this.side!==Bi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Do&&(n.blendSrc=this.blendSrc),this.blendDst!==Uo&&(n.blendDst=this.blendDst),this.blendEquation!==ns&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Fs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ts&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ts&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ts&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Zu extends cn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Fe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let nr;const Fr=new I,ir=new I,sr=new I,rr=new ge,Or=new ge,up=new rt,za=new I,kr=new I,Va=new I,Gd=new ge,Tc=new ge,Hd=new ge;class dp extends St{constructor(e=new Zu){if(super(),this.isSprite=!0,this.type="Sprite",nr===void 0){nr=new ut;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Hl(t,5);nr.setIndex([0,1,2,0,2,3]),nr.setAttribute("position",new Wn(n,3,0,!1)),nr.setAttribute("uv",new Wn(n,2,3,!1))}this.geometry=nr,this.material=e,this.center=new ge(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ye('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ir.setFromMatrixScale(this.matrixWorld),up.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),sr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ir.multiplyScalar(-sr.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;Ga(za.set(-.5,-.5,0),sr,a,ir,i,s),Ga(kr.set(.5,-.5,0),sr,a,ir,i,s),Ga(Va.set(.5,.5,0),sr,a,ir,i,s),Gd.set(0,0),Tc.set(1,0),Hd.set(1,1);let o=e.ray.intersectTriangle(za,kr,Va,!1,Fr);if(o===null&&(Ga(kr.set(-.5,.5,0),sr,a,ir,i,s),Tc.set(0,1),o=e.ray.intersectTriangle(za,Va,kr,!1,Fr),o===null))return;const l=e.ray.origin.distanceTo(Fr);l<e.near||l>e.far||t.push({distance:l,point:Fr.clone(),uv:Dn.getInterpolation(Fr,za,kr,Va,Gd,Tc,Hd,new ge),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ga(r,e,t,n,i,s){rr.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Or.x=s*rr.x-i*rr.y,Or.y=i*rr.x+s*rr.y):Or.copy(rr),r.copy(e),r.x+=Or.x,r.y+=Or.y,r.applyMatrix4(up)}const Ha=new I,Wd=new I;class hp extends St{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const s=t[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let s;for(s=0;s<i.length&&!(t<i[s].distance);s++);return i.splice(s,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let s=t[n].distance;if(t[n].object.visible&&(s-=s*t[n].hysteresis),e<s)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){Ha.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(Ha);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){Ha.setFromMatrixPosition(e.matrixWorld),Wd.setFromMatrixPosition(this.matrixWorld);const n=Ha.distanceTo(Wd)/e.zoom;t[0].object.visible=!0;let i,s;for(i=1,s=t.length;i<s;i++){let a=t[i].distance;if(t[i].object.visible&&(a-=a*t[i].hysteresis),n>=a)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const a=n[i];t.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return t}}const Di=new I,Ac=new I,Wa=new I,ji=new I,Cc=new I,Xa=new I,Rc=new I;class Tr{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Di)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Di.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Di.copy(this.origin).addScaledVector(this.direction,t),Di.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ac.copy(e).add(t).multiplyScalar(.5),Wa.copy(t).sub(e).normalize(),ji.copy(this.origin).sub(Ac);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Wa),o=ji.dot(this.direction),l=-ji.dot(Wa),c=ji.lengthSq(),u=Math.abs(1-a*a);let d,h,f,p;if(u>0)if(d=a*l-o,h=a*o-l,p=s*u,d>=0)if(h>=-p)if(h<=p){const _=1/u;d*=_,h*=_,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-p?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c):h<=p?(d=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+c):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Ac).addScaledVector(Wa,h),f}intersectSphere(e,t){Di.subVectors(e.center,this.origin);const n=Di.dot(this.direction),i=Di.dot(Di)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,i=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,i=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Di)!==null}intersectTriangle(e,t,n,i,s){Cc.subVectors(t,e),Xa.subVectors(n,e),Rc.crossVectors(Cc,Xa);let a=this.direction.dot(Rc),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ji.subVectors(this.origin,e);const l=o*this.direction.dot(Xa.crossVectors(ji,Xa));if(l<0)return null;const c=o*this.direction.dot(Cc.cross(ji));if(c<0||l+c>a)return null;const u=-o*ji.dot(Rc);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class an extends cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=Ea,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Xd=new rt,gs=new Tr,$a=new en,$d=new I,qa=new I,Ya=new I,Za=new I,Ic=new I,Ka=new I,qd=new I,Ja=new I;class Lt extends St{constructor(e=new ut,t=new an){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){Ka.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(Ic.fromBufferAttribute(d,e),a?Ka.addScaledVector(Ic,u):Ka.addScaledVector(Ic.sub(t),u))}t.add(Ka)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$a.copy(n.boundingSphere),$a.applyMatrix4(s),gs.copy(e.ray).recast(e.near),!($a.containsPoint(gs.origin)===!1&&(gs.intersectSphere($a,$d)===null||gs.origin.distanceToSquared($d)>(e.far-e.near)**2))&&(Xd.copy(s).invert(),gs.copy(e.ray).applyMatrix4(Xd),!(n.boundingBox!==null&&gs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,gs)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=h.length;p<_;p++){const g=h[p],m=a[g.materialIndex],v=Math.max(g.start,f.start),x=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let y=v,S=x;y<S;y+=3){const M=o.getX(y),C=o.getX(y+1),b=o.getX(y+2);i=ja(this,m,e,n,c,u,d,M,C,b),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const v=o.getX(g),x=o.getX(g+1),y=o.getX(g+2);i=ja(this,a,e,n,c,u,d,v,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,_=h.length;p<_;p++){const g=h[p],m=a[g.materialIndex],v=Math.max(g.start,f.start),x=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=v,S=x;y<S;y+=3){const M=y,C=y+1,b=y+2;i=ja(this,m,e,n,c,u,d,M,C,b),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const v=g,x=g+1,y=g+2;i=ja(this,a,e,n,c,u,d,v,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function p_(r,e,t,n,i,s,a,o){let l;if(e.side===An?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===Bi,o),l===null)return null;Ja.copy(o),Ja.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Ja);return c<t.near||c>t.far?null:{distance:c,point:Ja.clone(),object:r}}function ja(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,qa),r.getVertexPosition(l,Ya),r.getVertexPosition(c,Za);const u=p_(r,e,t,n,qa,Ya,Za,qd);if(u){const d=new I;Dn.getBarycoord(qd,qa,Ya,Za,d),i&&(u.uv=Dn.getInterpolatedAttribute(i,o,l,c,d,new ge)),s&&(u.uv1=Dn.getInterpolatedAttribute(s,o,l,c,d,new ge)),a&&(u.normal=Dn.getInterpolatedAttribute(a,o,l,c,d,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new I,materialIndex:0};Dn.getNormal(qa,Ya,Za,h.normal),u.face=h,u.barycoord=d}return u}const Br=new Mt,Yd=new Mt,Zd=new Mt,m_=new Mt,Kd=new rt,Qa=new I,Pc=new en,Jd=new rt,Lc=new Tr;class fp extends Lt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=du,this.bindMatrix=new rt,this.bindMatrixInverse=new rt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Qt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Qa),this.boundingBox.expandByPoint(Qa)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new en),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Qa),this.boundingSphere.expandByPoint(Qa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Pc.copy(this.boundingSphere),Pc.applyMatrix4(i),e.ray.intersectsSphere(Pc)!==!1&&(Jd.copy(i).invert(),Lc.copy(e.ray).applyMatrix4(Jd),!(this.boundingBox!==null&&Lc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Lc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Mt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===du?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===qf?this.bindMatrixInverse.copy(this.bindMatrix).invert():Re("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Yd.fromBufferAttribute(i.attributes.skinIndex,e),Zd.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Br.copy(t),t.set(0,0,0,0)):(Br.set(...t,1),t.set(0,0,0)),Br.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const a=Zd.getComponent(s);if(a!==0){const o=Yd.getComponent(s);Kd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(m_.copy(Br).applyMatrix4(Kd),a)}}return t.isVector4&&(t.w=Br.w),t.applyMatrix4(this.bindMatrixInverse)}}class Ku extends St{constructor(){super(),this.isBone=!0,this.type="Bone"}}class li extends Vt{constructor(e=null,t=1,n=1,i,s,a,o,l,c=Kt,u=Kt,d,h){super(null,a,o,l,c,u,i,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const jd=new rt,g_=new rt;class Wl{constructor(e=[],t=[]){this.uuid=Xn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Re("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new rt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new rt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:g_;jd.multiplyMatrices(o,t[s]),jd.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Wl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new li(t,e,e,Tn,En);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(Re("Skeleton: No bone found with UUID:",s),a=new Ku),this.bones.push(a),this.boneInverses.push(new rt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class Mr extends Ut{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ar=new rt,Qd=new rt,eo=[],eh=new Qt,__=new rt,zr=new Lt,Vr=new en;class pp extends Lt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Mr(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,__)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Qt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ar),eh.copy(e.boundingBox).applyMatrix4(ar),this.boundingBox.union(eh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new en),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ar),Vr.copy(e.boundingSphere).applyMatrix4(ar),this.boundingSphere.union(Vr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(zr.geometry=this.geometry,zr.material=this.material,zr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vr.copy(this.boundingSphere),Vr.applyMatrix4(n),e.ray.intersectsSphere(Vr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,ar),Qd.multiplyMatrices(n,ar),zr.matrixWorld=Qd,zr.raycast(e,eo);for(let a=0,o=eo.length;a<o;a++){const l=eo[a];l.instanceId=s,l.object=this,t.push(l)}eo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Mr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new li(new Float32Array(i*this.count),i,this.count,Ll,En));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Dc=new I,v_=new I,x_=new ct;class ts{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Dc.subVectors(n,t).cross(v_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(Dc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||x_.getNormalMatrix(e),i=this.coplanarPoint(Dc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _s=new en,y_=new ge(.5,.5),to=new I;class Ar{constructor(e=new ts,t=new ts,n=new ts,i=new ts,s=new ts,a=new ts){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Hn,n=!1){const i=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],d=s[5],h=s[6],f=s[7],p=s[8],_=s[9],g=s[10],m=s[11],v=s[12],x=s[13],y=s[14],S=s[15];if(i[0].setComponents(c-a,f-u,m-p,S-v).normalize(),i[1].setComponents(c+a,f+u,m+p,S+v).normalize(),i[2].setComponents(c+o,f+d,m+_,S+x).normalize(),i[3].setComponents(c-o,f-d,m-_,S-x).normalize(),n)i[4].setComponents(l,h,g,y).normalize(),i[5].setComponents(c-l,f-h,m-g,S-y).normalize();else if(i[4].setComponents(c-l,f-h,m-g,S-y).normalize(),t===Hn)i[5].setComponents(c+l,f+h,m+g,S+y).normalize();else if(t===Os)i[5].setComponents(l,h,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_s.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_s.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_s)}intersectsSprite(e){_s.center.set(0,0,0);const t=y_.distanceTo(e.center);return _s.radius=.7071067811865476+t,_s.applyMatrix4(e.matrixWorld),this.intersectsSphere(_s)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(to.x=i.normal.x>0?e.max.x:e.min.x,to.y=i.normal.y>0?e.max.y:e.min.y,to.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(to)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const fi=new rt,pi=new Ar;class Xl{constructor(){this.coordinateSystem=Hn}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(fi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),pi.setFromProjectionMatrix(fi,i.coordinateSystem,i.reversedDepth),pi.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(fi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),pi.setFromProjectionMatrix(fi,i.coordinateSystem,i.reversedDepth),pi.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(fi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),pi.setFromProjectionMatrix(fi,i.coordinateSystem,i.reversedDepth),pi.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(fi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),pi.setFromProjectionMatrix(fi,i.coordinateSystem,i.reversedDepth),pi.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(fi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),pi.setFromProjectionMatrix(fi,i.coordinateSystem,i.reversedDepth),pi.containsPoint(e))return!0}return!1}clone(){return new Xl}}function Uc(r,e){return r-e}function b_(r,e){return r.z-e.z}function M_(r,e){return e.z-r.z}class S_{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){const s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});const o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}}const Rn=new rt,w_=new Fe(1,1,1),th=new Ar,E_=new Xl,no=new Qt,vs=new en,Gr=new I,nh=new I,T_=new I,Nc=new S_,_n=new Lt,io=[];function A_(r,e,t=0){const n=e.itemSize;if(r.isInterleavedBufferAttribute||r.array.constructor!==e.array.constructor){const i=r.count;for(let s=0;s<i;s++)for(let a=0;a<n;a++)e.setComponent(s+t,a,r.getComponent(s,a))}else e.array.set(r.array,t*n);e.needsUpdate=!0}function xs(r,e){if(r.constructor!==e.constructor){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++)e[n]=r[n]}else{const t=Math.min(r.length,e.length);e.set(new r.constructor(r.buffer,0,t))}}class mp extends Lt{constructor(e,t,n=t*2,i){super(new ut,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new li(t,e,e,Tn,En);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new li(t,e,e,Ta,Kn);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new li(t,e,e,Tn,En);n.colorSpace=xt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in e.attributes){const a=e.getAttribute(s),{array:o,itemSize:l,normalized:c}=a,u=new o.constructor(n*l),d=new Ut(u,l,c);t.setAttribute(s,d)}if(e.getIndex()!==null){const s=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Ut(s,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=e.getAttribute(n),s=t.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){const t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){const t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qt);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,Rn),this.getBoundingBoxAt(s,no).applyMatrix4(Rn),e.union(no)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new en);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,Rn),this.getBoundingSphereAt(s,vs).applyMatrix4(Rn),e.union(vs)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Uc),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const s=this._matricesTexture;Rn.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;const a=this._colorsTexture;return a&&(w_.toArray(a.image.data,i*4),a.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const a=e.getIndex();if(a!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?a.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Uc),l=this._availableGeometryIds.shift(),s[l]=i):(l=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),a=t.getIndex(),o=this._geometryInfo[e];if(i&&a.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");const l=o.vertexStart,c=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(const u in n.attributes){const d=t.getAttribute(u),h=n.getAttribute(u);A_(d,h,l);const f=d.itemSize;for(let p=d.count,_=c;p<_;p++){const g=l+p;for(let m=0;m<f;m++)h.setComponent(g,m,0)}h.needsUpdate=!0,h.addUpdateRange(l*f,c*f)}if(i){const u=o.indexStart,d=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let h=0;h<a.count;h++)s.setX(u+h,l+a.getX(h));for(let h=a.count,f=d;h<f;h++)s.setX(u+h,l);s.needsUpdate=!0,s.addUpdateRange(u,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0;const n=this._geometryInfo,i=n.map((a,o)=>o).sort((a,o)=>n[a].vertexStart-n[o].vertexStart),s=this.geometry;for(let a=0,o=n.length;a<o;a++){const l=i[a],c=n[l];if(c.active!==!1){if(s.index!==null){if(c.indexStart!==t){const{indexStart:u,vertexStart:d,reservedIndexCount:h}=c,f=s.index,p=f.array,_=e-d;for(let g=u;g<u+h;g++)p[g]=p[g]+_;f.array.copyWithin(t,u,u+h),f.addUpdateRange(t,h),f.needsUpdate=!0,c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){const{vertexStart:u,reservedVertexCount:d}=c,h=s.attributes;for(const f in h){const p=h[f],{array:_,itemSize:g}=p;_.copyWithin(e*g,u*g,(u+d)*g),p.addUpdateRange(e*g,d*g),p.needsUpdate=!0}c.vertexStart=e}e+=c.reservedVertexCount,c.start=s.index?c.indexStart:c.vertexStart}}return this._nextIndexStart=t,this._nextVertexStart=e,this._visibilityChanged=!0,this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){const s=new Qt,a=n.index,o=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let u=l;a&&(u=a.getX(u)),s.expandByPoint(Gr.fromBufferAttribute(o,u))}i.boundingBox=s}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){const s=new en;this.getBoundingBoxAt(e,no),no.getCenter(s.center);const a=n.index,o=n.attributes.position;let l=0;for(let c=i.start,u=i.start+i.count;c<u;c++){let d=c;a&&(d=a.getX(d)),Gr.fromBufferAttribute(o,d),l=Math.max(l,s.center.distanceToSquared(Gr))}s.radius=Math.sqrt(l),i.boundingSphere=s}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);const n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null?t.isVector4?t.set(1,1,1,1):t.setRGB(1,1,1):t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(Uc);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const i=new Int32Array(e),s=new Int32Array(e);xs(this._multiDrawCounts,i),xs(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=e;const a=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),xs(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),xs(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),xs(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const s=this.geometry;s.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new ut,this._initializeGeometry(s));const a=this.geometry;s.index&&xs(s.index.array,a.index.array);for(const o in s.attributes)xs(s.attributes[o].array,a.attributes[o].array)}raycast(e,t){const n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,a=this.geometry;_n.material=this.material,_n.geometry.index=a.index,_n.geometry.attributes=a.attributes,_n.geometry.boundingBox===null&&(_n.geometry.boundingBox=new Qt),_n.geometry.boundingSphere===null&&(_n.geometry.boundingSphere=new en);for(let o=0,l=n.length;o<l;o++){if(!n[o].visible||!n[o].active)continue;const c=n[o].geometryIndex,u=i[c];_n.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(o,_n.matrixWorld).premultiply(s),this.getBoundingBoxAt(c,_n.geometry.boundingBox),this.getBoundingSphereAt(c,_n.geometry.boundingSphere),_n.raycast(e,io);for(let d=0,h=io.length;d<h;d++){const f=io[d];f.object=this,f.batchId=o,t.push(f)}io.length=0}_n.material=null,_n.geometry.index=null,_n.geometry.attributes={},_n.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const a=i.getIndex();let o=a===null?1:a.array.BYTES_PER_ELEMENT,l=1;s.wireframe&&(l=2,o=i.attributes.position.count>65535?4:2);const c=this._instanceInfo,u=this._multiDrawStarts,d=this._multiDrawCounts,h=this._geometryInfo,f=this.perObjectFrustumCulled,p=this._indirectTexture,_=p.image.data,g=n.isArrayCamera?E_:th;f&&!n.isArrayCamera&&(Rn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),th.setFromProjectionMatrix(Rn,n.coordinateSystem,n.reversedDepth));let m=0;if(this.sortObjects){Rn.copy(this.matrixWorld).invert(),Gr.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Rn),nh.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(Rn);for(let y=0,S=c.length;y<S;y++)if(c[y].visible&&c[y].active){const M=c[y].geometryIndex;this.getMatrixAt(y,Rn),this.getBoundingSphereAt(M,vs).applyMatrix4(Rn);let C=!1;if(f&&(C=!g.intersectsSphere(vs,n)),!C){const b=h[M],T=T_.subVectors(vs.center,Gr).dot(nh);Nc.push(b.start,b.count,T,y)}}const v=Nc.list,x=this.customSort;x===null?v.sort(s.transparent?M_:b_):x.call(this,v,n);for(let y=0,S=v.length;y<S;y++){const M=v[y];u[m]=M.start*o*l,d[m]=M.count*l,_[m]=M.index,m++}Nc.reset()}else for(let v=0,x=c.length;v<x;v++)if(c[v].visible&&c[v].active){const y=c[v].geometryIndex;let S=!1;if(f&&(this.getMatrixAt(v,Rn),this.getBoundingSphereAt(y,vs).applyMatrix4(Rn),S=!g.intersectsSphere(vs,n)),!S){const M=h[y];u[m]=M.start*o*l,d[m]=M.count*l,_[m]=v,m++}}p.needsUpdate=!0,this._multiDrawCount=m,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,s,a){this.onBeforeRender(e,null,i,s,a)}}class Cn extends cn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const bl=new I,Ml=new I,ih=new rt,Hr=new Tr,so=new en,Fc=new I,sh=new I;class cs extends St{constructor(e=new ut,t=new Cn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)bl.fromBufferAttribute(t,i-1),Ml.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=bl.distanceTo(Ml);e.setAttribute("lineDistance",new Ge(n,1))}else Re("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),so.copy(n.boundingSphere),so.applyMatrix4(i),so.radius+=s,e.ray.intersectsSphere(so)===!1)return;ih.copy(i).invert(),Hr.copy(e.ray).applyMatrix4(ih);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=c){const m=u.getX(_),v=u.getX(_+1),x=ro(this,e,Hr,l,m,v,_);x&&t.push(x)}if(this.isLineLoop){const _=u.getX(p-1),g=u.getX(f),m=ro(this,e,Hr,l,_,g,p-1);m&&t.push(m)}}else{const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=c){const m=ro(this,e,Hr,l,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){const _=ro(this,e,Hr,l,p-1,f,p-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ro(r,e,t,n,i,s,a){const o=r.geometry.attributes.position;if(bl.fromBufferAttribute(o,i),Ml.fromBufferAttribute(o,s),t.distanceSqToSegment(bl,Ml,Fc,sh)>n)return;Fc.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Fc);if(!(c<e.near||c>e.far))return{distance:c,point:sh.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const rh=new I,ah=new I;class Ci extends cs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)rh.fromBufferAttribute(t,i),ah.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+rh.distanceTo(ah);e.setAttribute("lineDistance",new Ge(n,1))}else Re("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class gp extends cs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Ju extends cn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const oh=new rt,mu=new Tr,ao=new en,oo=new I;class _p extends St{constructor(e=new ut,t=new Ju){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ao.copy(n.boundingSphere),ao.applyMatrix4(i),ao.radius+=s,e.ray.intersectsSphere(ao)===!1)return;oh.copy(i).invert(),mu.copy(e.ray).applyMatrix4(oh);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=h,_=f;p<_;p++){const g=c.getX(p);oo.fromBufferAttribute(d,g),lh(oo,g,l,i,e,t,this)}}else{const h=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let p=h,_=f;p<_;p++)oo.fromBufferAttribute(d,p),lh(oo,p,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function lh(r,e,t,n,i,s,a){const o=mu.distanceSqToPoint(r);if(o<t){const l=new I;mu.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class vp extends Vt{constructor(e,t,n,i,s=Bt,a=Bt,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;const u=this;function d(){u.needsUpdate=!0,u._requestVideoFrameCallbackId=e.requestVideoFrameCallback(d)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(d))}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}}class C_ extends vp{constructor(e,t,n,i,s,a,o,l){super({},e,t,n,i,s,a,o,l),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(e){this.image=e,this.needsUpdate=!0}}class R_ extends Vt{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=Kt,this.minFilter=Kt,this.generateMipmaps=!1,this.needsUpdate=!0}}class $l extends Vt{constructor(e,t,n,i,s,a,o,l,c,u,d,h){super(null,a,o,l,c,u,i,s,d,h),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class I_ extends $l{constructor(e,t,n,i,s,a){super(e,t,n,s,a),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Un,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class P_ extends $l{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,Ei),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class Aa extends Vt{constructor(e=[],t=Ei,n,i,s,a,o,l,c,u){super(e,t,n,i,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class L_ extends Vt{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class D_ extends Vt{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;const u=e?e.parentNode:null;u!==null&&"requestPaint"in u&&(u.onpaint=()=>{this.needsUpdate=!0},u.requestPaint())}dispose(){const e=this.image?this.image.parentNode:null;e!==null&&"onpaint"in e&&(e.onpaint=null),super.dispose()}}class ks extends Vt{constructor(e,t,n=Kn,i,s,a,o=Kt,l=Kt,c,u=Ai,d=1){if(u!==Ai&&u!==is)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,i,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ss(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class xp extends ks{constructor(e,t=Kn,n=Ei,i,s,a=Kt,o=Kt,l,c=Ai){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,i,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class ju extends Vt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ds extends ut{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],d=[];let h=0,f=0;p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ge(c,3)),this.setAttribute("normal",new Ge(u,3)),this.setAttribute("uv",new Ge(d,2));function p(_,g,m,v,x,y,S,M,C,b,T){const P=y/C,L=S/b,B=y/2,Q=S/2,J=M/2,z=C+1,Y=b+1;let K=0,de=0;const pe=new I;for(let ve=0;ve<Y;ve++){const Ce=ve*L-Q;for(let Be=0;Be<z;Be++){const st=Be*P-B;pe[_]=st*v,pe[g]=Ce*x,pe[m]=J,c.push(pe.x,pe.y,pe.z),pe[_]=0,pe[g]=0,pe[m]=M>0?1:-1,u.push(pe.x,pe.y,pe.z),d.push(Be/C),d.push(1-ve/b),K+=1}}for(let ve=0;ve<b;ve++)for(let Ce=0;Ce<C;Ce++){const Be=h+Ce+z*ve,st=h+Ce+z*(ve+1),dt=h+(Ce+1)+z*(ve+1),tt=h+(Ce+1)+z*ve;l.push(Be,st,tt),l.push(st,dt,tt),de+=6}o.addGroup(f,de,T),f+=de,h+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ds(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ql extends ut{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const a=[],o=[],l=[],c=[],u=t/2,d=Math.PI/2*e,h=t,f=2*d+h,p=n*2+s,_=i+1,g=new I,m=new I;for(let v=0;v<=p;v++){let x=0,y=0,S=0,M=0;if(v<=n){const T=v/n,P=T*Math.PI/2;y=-u-e*Math.cos(P),S=e*Math.sin(P),M=-e*Math.cos(P),x=T*d}else if(v<=n+s){const T=(v-n)/s;y=-u+T*t,S=e,M=0,x=d+T*h}else{const T=(v-n-s)/n,P=T*Math.PI/2;y=u+e*Math.sin(P),S=e*Math.cos(P),M=e*Math.sin(P),x=d+h+T*d}const C=Math.max(0,Math.min(1,x/f));let b=0;v===0?b=.5/i:v===p&&(b=-.5/i);for(let T=0;T<=i;T++){const P=T/i,L=P*Math.PI*2,B=Math.sin(L),Q=Math.cos(L);m.x=-S*Q,m.y=y,m.z=S*B,o.push(m.x,m.y,m.z),g.set(-S*Q,M,S*B),g.normalize(),l.push(g.x,g.y,g.z),c.push(P+b,C)}if(v>0){const T=(v-1)*_;for(let P=0;P<i;P++){const L=T+P,B=T+P+1,Q=v*_+P,J=v*_+P+1;a.push(L,B,Q),a.push(B,J,Q)}}}this.setIndex(a),this.setAttribute("position",new Ge(o,3)),this.setAttribute("normal",new Ge(l,3)),this.setAttribute("uv",new Ge(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ql(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Yl extends ut{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new I,u=new ge;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){const f=n+d/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new Ge(a,3)),this.setAttribute("normal",new Ge(o,3)),this.setAttribute("uv",new Ge(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yl(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ca extends ut{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],d=[],h=[],f=[];let p=0;const _=[],g=n/2;let m=0;v(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new Ge(d,3)),this.setAttribute("normal",new Ge(h,3)),this.setAttribute("uv",new Ge(f,2));function v(){const y=new I,S=new I;let M=0;const C=(t-e)/n;for(let b=0;b<=s;b++){const T=[],P=b/s,L=P*(t-e)+e;for(let B=0;B<=i;B++){const Q=B/i,J=Q*l+o,z=Math.sin(J),Y=Math.cos(J);S.x=L*z,S.y=-P*n+g,S.z=L*Y,d.push(S.x,S.y,S.z),y.set(z,C,Y).normalize(),h.push(y.x,y.y,y.z),f.push(Q,1-P),T.push(p++)}_.push(T)}for(let b=0;b<i;b++)for(let T=0;T<s;T++){const P=_[T][b],L=_[T+1][b],B=_[T+1][b+1],Q=_[T][b+1];(e>0||T!==0)&&(u.push(P,L,Q),M+=3),(t>0||T!==s-1)&&(u.push(L,B,Q),M+=3)}c.addGroup(m,M,0),m+=M}function x(y){const S=p,M=new ge,C=new I;let b=0;const T=y===!0?e:t,P=y===!0?1:-1;for(let B=1;B<=i;B++)d.push(0,g*P,0),h.push(0,P,0),f.push(.5,.5),p++;const L=p;for(let B=0;B<=i;B++){const J=B/i*l+o,z=Math.cos(J),Y=Math.sin(J);C.x=T*Y,C.y=g*P,C.z=T*z,d.push(C.x,C.y,C.z),h.push(0,P,0),M.x=z*.5+.5,M.y=Y*.5*P+.5,f.push(M.x,M.y),p++}for(let B=0;B<i;B++){const Q=S+B,J=L+B;y===!0?u.push(J,J+1,Q):u.push(J+1,J,Q),b+=3}c.addGroup(m,b,y===!0?1:2),m+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ca(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Vs extends Ca{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Vs(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class hs extends ut{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],a=[];o(i),c(n),u(),this.setAttribute("position",new Ge(s,3)),this.setAttribute("normal",new Ge(s.slice(),3)),this.setAttribute("uv",new Ge(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const x=new I,y=new I,S=new I;for(let M=0;M<t.length;M+=3)f(t[M+0],x),f(t[M+1],y),f(t[M+2],S),l(x,y,S,v)}function l(v,x,y,S){const M=S+1,C=[];for(let b=0;b<=M;b++){C[b]=[];const T=v.clone().lerp(y,b/M),P=x.clone().lerp(y,b/M),L=M-b;for(let B=0;B<=L;B++)B===0&&b===M?C[b][B]=T:C[b][B]=T.clone().lerp(P,B/L)}for(let b=0;b<M;b++)for(let T=0;T<2*(M-b)-1;T++){const P=Math.floor(T/2);T%2===0?(h(C[b][P+1]),h(C[b+1][P]),h(C[b][P])):(h(C[b][P+1]),h(C[b+1][P+1]),h(C[b+1][P]))}}function c(v){const x=new I;for(let y=0;y<s.length;y+=3)x.x=s[y+0],x.y=s[y+1],x.z=s[y+2],x.normalize().multiplyScalar(v),s[y+0]=x.x,s[y+1]=x.y,s[y+2]=x.z}function u(){const v=new I;for(let x=0;x<s.length;x+=3){v.x=s[x+0],v.y=s[x+1],v.z=s[x+2];const y=g(v)/2/Math.PI+.5,S=m(v)/Math.PI+.5;a.push(y,1-S)}p(),d()}function d(){for(let v=0;v<a.length;v+=6){const x=a[v+0],y=a[v+2],S=a[v+4],M=Math.max(x,y,S),C=Math.min(x,y,S);M>.9&&C<.1&&(x<.2&&(a[v+0]+=1),y<.2&&(a[v+2]+=1),S<.2&&(a[v+4]+=1))}}function h(v){s.push(v.x,v.y,v.z)}function f(v,x){const y=v*3;x.x=e[y+0],x.y=e[y+1],x.z=e[y+2]}function p(){const v=new I,x=new I,y=new I,S=new I,M=new ge,C=new ge,b=new ge;for(let T=0,P=0;T<s.length;T+=9,P+=6){v.set(s[T+0],s[T+1],s[T+2]),x.set(s[T+3],s[T+4],s[T+5]),y.set(s[T+6],s[T+7],s[T+8]),M.set(a[P+0],a[P+1]),C.set(a[P+2],a[P+3]),b.set(a[P+4],a[P+5]),S.copy(v).add(x).add(y).divideScalar(3);const L=g(S);_(M,P+0,v,L),_(C,P+2,x,L),_(b,P+4,y,L)}}function _(v,x,y,S){S<0&&v.x===1&&(a[x]=v.x-1),y.x===0&&y.z===0&&(a[x]=S/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hs(e.vertices,e.indices,e.radius,e.detail)}}class Zl extends hs{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Zl(e.radius,e.detail)}}const lo=new I,co=new I,Oc=new I,uo=new Dn;class yp extends ut{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(Ds*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],d=new Array(3),h={},f=[];for(let p=0;p<l;p+=3){a?(c[0]=a.getX(p),c[1]=a.getX(p+1),c[2]=a.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);const{a:_,b:g,c:m}=uo;if(_.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),uo.getNormal(Oc),d[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,d[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,d[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let v=0;v<3;v++){const x=(v+1)%3,y=d[v],S=d[x],M=uo[u[v]],C=uo[u[x]],b=`${y}_${S}`,T=`${S}_${y}`;T in h&&h[T]?(Oc.dot(h[T].normal)<=s&&(f.push(M.x,M.y,M.z),f.push(C.x,C.y,C.z)),h[T]=null):b in h||(h[b]={index0:c[v],index1:c[x],normal:Oc.clone()})}}for(const p in h)if(h[p]){const{index0:_,index1:g}=h[p];lo.fromBufferAttribute(o,_),co.fromBufferAttribute(o,g),f.push(lo.x,lo.y,lo.z),f.push(co.x,co.y,co.z)}this.setAttribute("position",new Ge(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class di{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Re("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);const u=n[i],h=n[i+1]-u,f=(a-u)/h;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new ge:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new I,i=[],s=[],a=[],o=new I,l=new rt;for(let f=0;f<=e;f++){const p=f/e;i[f]=this.getTangentAt(p,new I)}s[0]=new I,a[0]=new I;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),d=Math.abs(i[0].y),h=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(at(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(at(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),a[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Kl extends di{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ge){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class bp extends Kl{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Qu(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,d){let h=(a-s)/c-(o-s)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+d)+(l-o)/d;h*=u,f*=u,i(a,o,h,f)},calc:function(s){const a=s*s,o=a*s;return r+e*s+t*a+n*o}}}const ch=new I,uh=new I,kc=new Qu,Bc=new Qu,zc=new Qu;class Mp extends di{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new I){const n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=i[(o-1)%s]:(uh.subVectors(i[0],i[1]).add(i[0]),c=uh);const d=i[o%s],h=i[(o+1)%s];if(this.closed||o+2<s?u=i[(o+2)%s]:(ch.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=ch),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(h),f),g=Math.pow(h.distanceToSquared(u),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),kc.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,p,_,g),Bc.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,p,_,g),zc.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,p,_,g)}else this.curveType==="catmullrom"&&(kc.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),Bc.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),zc.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return n.set(kc.calc(l),Bc.calc(l),zc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new I().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function dh(r,e,t,n,i){const s=(n-e)*.5,a=(i-t)*.5,o=r*r,l=r*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*r+t}function U_(r,e){const t=1-r;return t*t*e}function N_(r,e){return 2*(1-r)*r*e}function F_(r,e){return r*r*e}function sa(r,e,t,n){return U_(r,e)+N_(r,t)+F_(r,n)}function O_(r,e){const t=1-r;return t*t*t*e}function k_(r,e){const t=1-r;return 3*t*t*r*e}function B_(r,e){return 3*(1-r)*r*r*e}function z_(r,e){return r*r*r*e}function ra(r,e,t,n,i){return O_(r,e)+k_(r,t)+B_(r,n)+z_(r,i)}class ed extends di{constructor(e=new ge,t=new ge,n=new ge,i=new ge){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ge){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ra(e,i.x,s.x,a.x,o.x),ra(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Sp extends di{constructor(e=new I,t=new I,n=new I,i=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new I){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ra(e,i.x,s.x,a.x,o.x),ra(e,i.y,s.y,a.y,o.y),ra(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class td extends di{constructor(e=new ge,t=new ge){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ge){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ge){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class wp extends di{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class nd extends di{constructor(e=new ge,t=new ge,n=new ge){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ge){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(sa(e,i.x,s.x,a.x),sa(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class id extends di{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(sa(e,i.x,s.x,a.x),sa(e,i.y,s.y,a.y),sa(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class sd extends di{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ge){const n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],u=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(dh(o,l.x,c.x,u.x,d.x),dh(o,l.y,c.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ge().fromArray(i))}return this}}var Sl=Object.freeze({__proto__:null,ArcCurve:bp,CatmullRomCurve3:Mp,CubicBezierCurve:ed,CubicBezierCurve3:Sp,EllipseCurve:Kl,LineCurve:td,LineCurve3:wp,QuadraticBezierCurve:nd,QuadraticBezierCurve3:id,SplineCurve:sd});class Ep extends di{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Sl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const a=s[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Sl[i.type]().fromJSON(i))}return this}}class wl extends Ep{constructor(e){super(),this.type="Path",this.currentPoint=new ge,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new td(this.currentPoint.clone(),new ge(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new nd(this.currentPoint.clone(),new ge(e,t),new ge(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){const o=new ed(this.currentPoint.clone(),new ge(e,t),new ge(n,i),new ge(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new sd(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){const c=new Kl(e,t,n,i,s,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Us extends wl{constructor(e){super(e),this.uuid=Xn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new wl().fromJSON(i))}return this}}function V_(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=Tp(r,0,i,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=$_(r,e,s,t)),r.length>80*t){o=r[0],l=r[1];let u=o,d=l;for(let h=t;h<i;h+=t){const f=r[h],p=r[h+1];f<o&&(o=f),p<l&&(l=p),f>u&&(u=f),p>d&&(d=p)}c=Math.max(u-o,d-l),c=c!==0?32767/c:0}return _a(s,a,t,o,l,c,0),a}function Tp(r,e,t,n,i){let s;if(i===iv(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=hh(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=hh(a/n|0,r[a],r[a+1],s);return s&&Sr(s,s.next)&&(xa(s),s=s.next),s}function Bs(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(Sr(t,t.next)||zt(t.prev,t,t.next)===0)){if(xa(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function _a(r,e,t,n,i,s,a){if(!r)return;!a&&s&&J_(r,n,i,s);let o=r;for(;r.prev!==r.next;){const l=r.prev,c=r.next;if(s?H_(r,n,i,s):G_(r)){e.push(l.i,r.i,c.i),xa(r),r=c.next,o=c.next;continue}if(r=c,r===o){a?a===1?(r=W_(Bs(r),e),_a(r,e,t,n,i,s,2)):a===2&&X_(r,e,t,n,i,s):_a(Bs(r),e,t,n,i,s,1);break}}}function G_(r){const e=r.prev,t=r,n=r.next;if(zt(e,t,n)>=0)return!1;const i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(i,s,a),d=Math.min(o,l,c),h=Math.max(i,s,a),f=Math.max(o,l,c);let p=n.next;for(;p!==e;){if(p.x>=u&&p.x<=h&&p.y>=d&&p.y<=f&&qr(i,o,s,l,a,c,p.x,p.y)&&zt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function H_(r,e,t,n){const i=r.prev,s=r,a=r.next;if(zt(i,s,a)>=0)return!1;const o=i.x,l=s.x,c=a.x,u=i.y,d=s.y,h=a.y,f=Math.min(o,l,c),p=Math.min(u,d,h),_=Math.max(o,l,c),g=Math.max(u,d,h),m=gu(f,p,e,t,n),v=gu(_,g,e,t,n);let x=r.prevZ,y=r.nextZ;for(;x&&x.z>=m&&y&&y.z<=v;){if(x.x>=f&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==a&&qr(o,u,l,d,c,h,x.x,x.y)&&zt(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==a&&qr(o,u,l,d,c,h,y.x,y.y)&&zt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=m;){if(x.x>=f&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==a&&qr(o,u,l,d,c,h,x.x,x.y)&&zt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=v;){if(y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==a&&qr(o,u,l,d,c,h,y.x,y.y)&&zt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function W_(r,e){let t=r;do{const n=t.prev,i=t.next.next;!Sr(n,i)&&Cp(n,t,t.next,i)&&va(n,i)&&va(i,n)&&(e.push(n.i,t.i,i.i),xa(t),xa(t.next),t=r=i),t=t.next}while(t!==r);return Bs(t)}function X_(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&ev(a,o)){let l=Rp(a,o);a=Bs(a,a.next),l=Bs(l,l.next),_a(a,e,t,n,i,s,0),_a(l,e,t,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function $_(r,e,t,n){const i=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*n,l=s<a-1?e[s+1]*n:r.length,c=Tp(r,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Q_(c))}i.sort(q_);for(let s=0;s<i.length;s++)t=Y_(i[s],t);return t}function q_(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Y_(r,e){const t=Z_(r,e);if(!t)return e;const n=Rp(t,r);return Bs(n,n.next),Bs(t,t.next)}function Z_(r,e){let t=e;const n=r.x,i=r.y;let s=-1/0,a;if(Sr(r,t))return t;do{if(Sr(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const d=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>s&&(s=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Ap(i<c?n:s,i,l,c,i<c?s:n,i,t.x,t.y)){const d=Math.abs(i-t.y)/(n-t.x);va(t,r)&&(d<u||d===u&&(t.x>a.x||t.x===a.x&&K_(a,t)))&&(a=t,u=d)}t=t.next}while(t!==o);return a}function K_(r,e){return zt(r.prev,r,e.prev)<0&&zt(e.next,r,r.next)<0}function J_(r,e,t,n){let i=r;do i.z===0&&(i.z=gu(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,j_(i)}function j_(r){let e,t=1;do{let n=r,i;r=null;let s=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=a}s.nextZ=null,t*=2}while(e>1);return r}function gu(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function Q_(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Ap(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function qr(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&Ap(r,e,t,n,i,s,a,o)}function ev(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!tv(r,e)&&(va(r,e)&&va(e,r)&&nv(r,e)&&(zt(r.prev,r,e.prev)||zt(r,e.prev,e))||Sr(r,e)&&zt(r.prev,r,r.next)>0&&zt(e.prev,e,e.next)>0)}function zt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Sr(r,e){return r.x===e.x&&r.y===e.y}function Cp(r,e,t,n){const i=fo(zt(r,e,t)),s=fo(zt(r,e,n)),a=fo(zt(t,n,r)),o=fo(zt(t,n,e));return!!(i!==s&&a!==o||i===0&&ho(r,t,e)||s===0&&ho(r,n,e)||a===0&&ho(t,r,n)||o===0&&ho(t,e,n))}function ho(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function fo(r){return r>0?1:r<0?-1:0}function tv(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Cp(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function va(r,e){return zt(r.prev,r,r.next)<0?zt(r,e,r.next)>=0&&zt(r,r.prev,e)>=0:zt(r,e,r.prev)<0||zt(r,r.next,e)<0}function nv(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Rp(r,e){const t=_u(r.i,r.x,r.y),n=_u(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function hh(r,e,t,n){const i=_u(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function xa(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function _u(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function iv(r,e,t,n){let i=0;for(let s=e,a=t-n;s<t;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}class sv{static triangulate(e,t,n=2){return V_(e,t,n)}}class ai{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return ai.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];fh(e),ph(n,e);let a=e.length;t.forEach(fh);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,ph(n,t[l]);const o=sv.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function fh(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function ph(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class Jl extends ut{constructor(e=new Us([new ge(.5,.5),new ge(-.5,.5),new ge(-.5,-.5),new ge(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new Ge(i,3)),this.setAttribute("uv",new Ge(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1;let h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:rv;let x,y=!1,S,M,C,b;if(m){x=m.getSpacedPoints(u),y=!0,h=!1;const j=m.isCatmullRomCurve3?m.closed:!1;S=m.computeFrenetFrames(u,j),M=new I,C=new I,b=new I}h||(g=0,f=0,p=0,_=0);const T=o.extractPoints(c);let P=T.shape;const L=T.holes;if(!ai.isClockWise(P)){P=P.reverse();for(let j=0,q=L.length;j<q;j++){const ne=L[j];ai.isClockWise(ne)&&(L[j]=ne.reverse())}}function Q(j){const ne=10000000000000001e-36;let oe=j[0];for(let me=1;me<=j.length;me++){const $e=me%j.length,F=j[$e],it=F.x-oe.x,ze=F.y-oe.y,nt=it*it+ze*ze,Me=Math.max(Math.abs(F.x),Math.abs(F.y),Math.abs(oe.x),Math.abs(oe.y)),Tt=ne*Me*Me;if(nt<=Tt){j.splice($e,1),me--;continue}oe=F}}Q(P),L.forEach(Q);const J=L.length,z=P;for(let j=0;j<J;j++){const q=L[j];P=P.concat(q)}function Y(j,q,ne){return q||Ye("ExtrudeGeometry: vec does not exist"),j.clone().addScaledVector(q,ne)}const K=P.length;function de(j,q,ne){let oe,me,$e;const F=j.x-q.x,it=j.y-q.y,ze=ne.x-j.x,nt=ne.y-j.y,Me=F*F+it*it,Tt=F*nt-it*ze;if(Math.abs(Tt)>Number.EPSILON){const R=Math.sqrt(Me),w=Math.sqrt(ze*ze+nt*nt),Z=q.x-it/R,ce=q.y+F/R,_e=ne.x-nt/w,be=ne.y+ze/w,Se=((_e-Z)*nt-(be-ce)*ze)/(F*nt-it*ze);oe=Z+F*Se-j.x,me=ce+it*Se-j.y;const re=oe*oe+me*me;if(re<=2)return new ge(oe,me);$e=Math.sqrt(re/2)}else{let R=!1;F>Number.EPSILON?ze>Number.EPSILON&&(R=!0):F<-Number.EPSILON?ze<-Number.EPSILON&&(R=!0):Math.sign(it)===Math.sign(nt)&&(R=!0),R?(oe=-it,me=F,$e=Math.sqrt(Me)):(oe=F,me=it,$e=Math.sqrt(Me/2))}return new ge(oe/$e,me/$e)}const pe=[];for(let j=0,q=z.length,ne=q-1,oe=j+1;j<q;j++,ne++,oe++)ne===q&&(ne=0),oe===q&&(oe=0),pe[j]=de(z[j],z[ne],z[oe]);const ve=[];let Ce,Be=pe.concat();for(let j=0,q=J;j<q;j++){const ne=L[j];Ce=[];for(let oe=0,me=ne.length,$e=me-1,F=oe+1;oe<me;oe++,$e++,F++)$e===me&&($e=0),F===me&&(F=0),Ce[oe]=de(ne[oe],ne[$e],ne[F]);ve.push(Ce),Be=Be.concat(Ce)}let st;if(g===0)st=ai.triangulateShape(z,L);else{const j=[],q=[];for(let ne=0;ne<g;ne++){const oe=ne/g,me=f*Math.cos(oe*Math.PI/2),$e=p*Math.sin(oe*Math.PI/2)+_;for(let F=0,it=z.length;F<it;F++){const ze=Y(z[F],pe[F],$e);ye(ze.x,ze.y,-me),oe===0&&j.push(ze)}for(let F=0,it=J;F<it;F++){const ze=L[F];Ce=ve[F];const nt=[];for(let Me=0,Tt=ze.length;Me<Tt;Me++){const R=Y(ze[Me],Ce[Me],$e);ye(R.x,R.y,-me),oe===0&&nt.push(R)}oe===0&&q.push(nt)}}st=ai.triangulateShape(j,q)}const dt=st.length,tt=p+_;for(let j=0;j<K;j++){const q=h?Y(P[j],Be[j],tt):P[j];y?(C.copy(S.normals[0]).multiplyScalar(q.x),M.copy(S.binormals[0]).multiplyScalar(q.y),b.copy(x[0]).add(C).add(M),ye(b.x,b.y,b.z)):ye(q.x,q.y,0)}for(let j=1;j<=u;j++)for(let q=0;q<K;q++){const ne=h?Y(P[q],Be[q],tt):P[q];y?(C.copy(S.normals[j]).multiplyScalar(ne.x),M.copy(S.binormals[j]).multiplyScalar(ne.y),b.copy(x[j]).add(C).add(M),ye(b.x,b.y,b.z)):ye(ne.x,ne.y,d/u*j)}for(let j=g-1;j>=0;j--){const q=j/g,ne=f*Math.cos(q*Math.PI/2),oe=p*Math.sin(q*Math.PI/2)+_;for(let me=0,$e=z.length;me<$e;me++){const F=Y(z[me],pe[me],oe);ye(F.x,F.y,d+ne)}for(let me=0,$e=L.length;me<$e;me++){const F=L[me];Ce=ve[me];for(let it=0,ze=F.length;it<ze;it++){const nt=Y(F[it],Ce[it],oe);y?ye(nt.x,nt.y+x[u-1].y,x[u-1].x+ne):ye(nt.x,nt.y,d+ne)}}}H(),ae();function H(){const j=i.length/3;if(h){let q=0,ne=K*q;for(let oe=0;oe<dt;oe++){const me=st[oe];$(me[2]+ne,me[1]+ne,me[0]+ne)}q=u+g*2,ne=K*q;for(let oe=0;oe<dt;oe++){const me=st[oe];$(me[0]+ne,me[1]+ne,me[2]+ne)}}else{for(let q=0;q<dt;q++){const ne=st[q];$(ne[2],ne[1],ne[0])}for(let q=0;q<dt;q++){const ne=st[q];$(ne[0]+K*u,ne[1]+K*u,ne[2]+K*u)}}n.addGroup(j,i.length/3-j,0)}function ae(){const j=i.length/3;let q=0;ue(z,q),q+=z.length;for(let ne=0,oe=L.length;ne<oe;ne++){const me=L[ne];ue(me,q),q+=me.length}n.addGroup(j,i.length/3-j,1)}function ue(j,q){let ne=j.length;for(;--ne>=0;){const oe=ne;let me=ne-1;me<0&&(me=j.length-1);for(let $e=0,F=u+g*2;$e<F;$e++){const it=K*$e,ze=K*($e+1),nt=q+oe+it,Me=q+me+it,Tt=q+me+ze,R=q+oe+ze;D(nt,Me,Tt,R)}}}function ye(j,q,ne){l.push(j),l.push(q),l.push(ne)}function $(j,q,ne){U(j),U(q),U(ne);const oe=i.length/3,me=v.generateTopUV(n,i,oe-3,oe-2,oe-1);O(me[0]),O(me[1]),O(me[2])}function D(j,q,ne,oe){U(j),U(q),U(oe),U(q),U(ne),U(oe);const me=i.length/3,$e=v.generateSideWallUV(n,i,me-6,me-3,me-2,me-1);O($e[0]),O($e[1]),O($e[3]),O($e[1]),O($e[2]),O($e[3])}function U(j){i.push(l[j*3+0]),i.push(l[j*3+1]),i.push(l[j*3+2])}function O(j){s.push(j.x),s.push(j.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return av(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];n.push(o)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Sl[i.type]().fromJSON(i)),new Jl(n,e.options)}}const rv={generateTopUV:function(r,e,t,n,i){const s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],u=e[i*3+1];return[new ge(s,a),new ge(o,l),new ge(c,u)]},generateSideWallUV:function(r,e,t,n,i,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],d=e[n*3+2],h=e[i*3],f=e[i*3+1],p=e[i*3+2],_=e[s*3],g=e[s*3+1],m=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new ge(a,1-l),new ge(c,1-d),new ge(h,1-p),new ge(_,1-m)]:[new ge(o,1-l),new ge(u,1-d),new ge(f,1-p),new ge(g,1-m)]}};function av(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class jl extends hs{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new jl(e.radius,e.detail)}}class Ql extends ut{constructor(e=[new ge(0,-.5),new ge(.5,0),new ge(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=at(i,0,Math.PI*2);const s=[],a=[],o=[],l=[],c=[],u=1/t,d=new I,h=new ge,f=new I,p=new I,_=new I;let g=0,m=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,f.x=m*1,f.y=-g,f.z=m*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(p)}for(let v=0;v<=t;v++){const x=n+v*u*i,y=Math.sin(x),S=Math.cos(x);for(let M=0;M<=e.length-1;M++){d.x=e[M].x*y,d.y=e[M].y,d.z=e[M].x*S,a.push(d.x,d.y,d.z),h.x=v/t,h.y=M/(e.length-1),o.push(h.x,h.y);const C=l[3*M+0]*y,b=l[3*M+1],T=l[3*M+0]*S;c.push(C,b,T)}}for(let v=0;v<t;v++)for(let x=0;x<e.length-1;x++){const y=x+v*e.length,S=y,M=y+e.length,C=y+e.length+1,b=y+1;s.push(S,M,b),s.push(C,b,M)}this.setIndex(s),this.setAttribute("position",new Ge(a,3)),this.setAttribute("uv",new Ge(o,2)),this.setAttribute("normal",new Ge(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ql(e.points,e.segments,e.phiStart,e.phiLength)}}class Cr extends hs{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Cr(e.radius,e.detail)}}class Rr extends ut{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,d=e/o,h=t/l,f=[],p=[],_=[],g=[];for(let m=0;m<u;m++){const v=m*h-a;for(let x=0;x<c;x++){const y=x*d-s;p.push(y,-v,0),_.push(0,0,1),g.push(x/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<o;v++){const x=v+c*m,y=v+c*(m+1),S=v+1+c*(m+1),M=v+1+c*m;f.push(x,y,M),f.push(y,S,M)}this.setIndex(f),this.setAttribute("position",new Ge(p,3)),this.setAttribute("normal",new Ge(_,3)),this.setAttribute("uv",new Ge(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rr(e.width,e.height,e.widthSegments,e.heightSegments)}}class ec extends ut{constructor(e=.5,t=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],u=[];let d=e;const h=(t-e)/i,f=new I,p=new ge;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){const m=s+g/n*a;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,u.push(p.x,p.y)}d+=h}for(let _=0;_<i;_++){const g=_*(n+1);for(let m=0;m<n;m++){const v=m+g,x=v,y=v+n+1,S=v+n+2,M=v+1;o.push(x,y,M),o.push(y,S,M)}}this.setIndex(o),this.setAttribute("position",new Ge(l,3)),this.setAttribute("normal",new Ge(c,3)),this.setAttribute("uv",new Ge(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ec(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class tc extends ut{constructor(e=new Us([new ge(0,.5),new ge(-.5,-.5),new ge(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Ge(i,3)),this.setAttribute("normal",new Ge(s,3)),this.setAttribute("uv",new Ge(a,2));function c(u){const d=i.length/3,h=u.extractPoints(t);let f=h.shape;const p=h.holes;ai.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){const v=p[g];ai.isClockWise(v)===!0&&(p[g]=v.reverse())}const _=ai.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){const v=p[g];f=f.concat(v)}for(let g=0,m=f.length;g<m;g++){const v=f[g];i.push(v.x,v.y,0),s.push(0,0,1),a.push(v.x,v.y)}for(let g=0,m=_.length;g<m;g++){const v=_[g],x=v[0]+d,y=v[1]+d,S=v[2]+d;n.push(x,y,S),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return ov(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const a=t[e.shapes[i]];n.push(a)}return new tc(n,e.curveSegments)}}function ov(r,e){if(e.shapes=[],Array.isArray(r))for(let t=0,n=r.length;t<n;t++){const i=r[t];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e}class ri extends ut{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],d=new I,h=new I,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const v=[],x=m/n;let y=0;m===0&&a===0?y=.5/t:m===n&&l===Math.PI&&(y=-.5/t);for(let S=0;S<=t;S++){const M=S/t;d.x=-e*Math.cos(i+M*s)*Math.sin(a+x*o),d.y=e*Math.cos(a+x*o),d.z=e*Math.sin(i+M*s)*Math.sin(a+x*o),p.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),g.push(M+y,1-x),v.push(c++)}u.push(v)}for(let m=0;m<n;m++)for(let v=0;v<t;v++){const x=u[m][v+1],y=u[m][v],S=u[m+1][v],M=u[m+1][v+1];(m!==0||a>0)&&f.push(x,y,M),(m!==n-1||l<Math.PI)&&f.push(y,S,M)}this.setIndex(f),this.setAttribute("position",new Ge(p,3)),this.setAttribute("normal",new Ge(_,3)),this.setAttribute("uv",new Ge(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ri(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ra extends hs{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ra(e.radius,e.detail)}}class zs extends ut{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);const l=[],c=[],u=[],d=[],h=new I,f=new I,p=new I;for(let _=0;_<=n;_++){const g=a+_/n*o;for(let m=0;m<=i;m++){const v=m/i*s;f.x=(e+t*Math.cos(g))*Math.cos(v),f.y=(e+t*Math.cos(g))*Math.sin(v),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),p.subVectors(f,h).normalize(),u.push(p.x,p.y,p.z),d.push(m/i),d.push(_/n)}}for(let _=1;_<=n;_++)for(let g=1;g<=i;g++){const m=(i+1)*_+g-1,v=(i+1)*(_-1)+g-1,x=(i+1)*(_-1)+g,y=(i+1)*_+g;l.push(m,v,y),l.push(v,x,y)}this.setIndex(l),this.setAttribute("position",new Ge(c,3)),this.setAttribute("normal",new Ge(u,3)),this.setAttribute("uv",new Ge(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zs(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class nc extends ut{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);const o=[],l=[],c=[],u=[],d=new I,h=new I,f=new I,p=new I,_=new I,g=new I,m=new I;for(let x=0;x<=n;++x){const y=x/n*s*Math.PI*2;v(y,s,a,e,f),v(y+.01,s,a,e,p),g.subVectors(p,f),m.addVectors(p,f),_.crossVectors(g,m),m.crossVectors(_,g),_.normalize(),m.normalize();for(let S=0;S<=i;++S){const M=S/i*Math.PI*2,C=-t*Math.cos(M),b=t*Math.sin(M);d.x=f.x+(C*m.x+b*_.x),d.y=f.y+(C*m.y+b*_.y),d.z=f.z+(C*m.z+b*_.z),l.push(d.x,d.y,d.z),h.subVectors(d,f).normalize(),c.push(h.x,h.y,h.z),u.push(x/n),u.push(S/i)}}for(let x=1;x<=n;x++)for(let y=1;y<=i;y++){const S=(i+1)*(x-1)+(y-1),M=(i+1)*x+(y-1),C=(i+1)*x+y,b=(i+1)*(x-1)+y;o.push(S,M,b),o.push(M,C,b)}this.setIndex(o),this.setAttribute("position",new Ge(l,3)),this.setAttribute("normal",new Ge(c,3)),this.setAttribute("uv",new Ge(u,2));function v(x,y,S,M,C){const b=Math.cos(x),T=Math.sin(x),P=S/y*x,L=Math.cos(P);C.x=M*(2+L)*.5*b,C.y=M*(2+L)*T*.5,C.z=M*Math.sin(P)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nc(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class ic extends ut{constructor(e=new id(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new I,l=new I,c=new ge;let u=new I;const d=[],h=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new Ge(d,3)),this.setAttribute("normal",new Ge(h,3)),this.setAttribute("uv",new Ge(f,2));function _(){for(let x=0;x<t;x++)g(x);g(s===!1?t:0),v(),m()}function g(x){u=e.getPointAt(x/t,u);const y=a.normals[x],S=a.binormals[x];for(let M=0;M<=i;M++){const C=M/i*Math.PI*2,b=Math.sin(C),T=-Math.cos(C);l.x=T*y.x+b*S.x,l.y=T*y.y+b*S.y,l.z=T*y.z+b*S.z,l.normalize(),h.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,d.push(o.x,o.y,o.z)}}function m(){for(let x=1;x<=t;x++)for(let y=1;y<=i;y++){const S=(i+1)*(x-1)+(y-1),M=(i+1)*x+(y-1),C=(i+1)*x+y,b=(i+1)*(x-1)+y;p.push(S,M,b),p.push(M,C,b)}}function v(){for(let x=0;x<=t;x++)for(let y=0;y<=i;y++)c.x=x/t,c.y=y/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ic(new Sl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class rd extends ut{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new I,s=new I;if(e.index!==null){const a=e.attributes.position,o=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const d=l[c],h=d.start,f=d.count;for(let p=h,_=h+f;p<_;p+=3)for(let g=0;g<3;g++){const m=o.getX(p+g),v=o.getX(p+(g+1)%3);i.fromBufferAttribute(a,m),s.fromBufferAttribute(a,v),mh(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{const a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){const u=3*o+c,d=3*o+(c+1)%3;i.fromBufferAttribute(a,u),s.fromBufferAttribute(a,d),mh(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Ge(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function mh(r,e,t){const n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var gh=Object.freeze({__proto__:null,BoxGeometry:ds,CapsuleGeometry:ql,CircleGeometry:Yl,ConeGeometry:Vs,CylinderGeometry:Ca,DodecahedronGeometry:Zl,EdgesGeometry:yp,ExtrudeGeometry:Jl,IcosahedronGeometry:jl,LatheGeometry:Ql,OctahedronGeometry:Cr,PlaneGeometry:Rr,PolyhedronGeometry:hs,RingGeometry:ec,ShapeGeometry:tc,SphereGeometry:ri,TetrahedronGeometry:Ra,TorusGeometry:zs,TorusKnotGeometry:nc,TubeGeometry:ic,WireframeGeometry:rd});class Ip extends cn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Fe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}function wr(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];if(_h(i))i.isRenderTargetTexture?(Re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(_h(i[0])){const s=[];for(let a=0,o=i.length;a<o;a++)s[a]=i[a].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Mn(r){const e={};for(let t=0;t<r.length;t++){const n=wr(r[t]);for(const i in n)e[i]=n[i]}return e}function _h(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function lv(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Pp(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:xt.workingColorSpace}const sc={clone:wr,merge:Mn};var cv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,uv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qn extends cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cv,this.fragmentShader=uv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=wr(e.uniforms),this.uniformsGroups=lv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ad extends qn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class od extends cn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zi,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Lp extends od{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ge(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return at(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Fe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Fe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Fe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Dp extends cn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Fe(16777215),this.specular=new Fe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zi,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=Ea,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Up extends cn{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Fe(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zi,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class Np extends cn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zi,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Fp extends cn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zi,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=Ea,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ld extends cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Jf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class cd extends cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Op extends cn{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Fe(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zi,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}}class kp extends Cn{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function Ps(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Bp(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function vu(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function ud(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}function dv(r,e,t,n,i=30){const s=r.clone();s.name=e;const a=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],u=c.getValueSize(),d=[],h=[];for(let f=0;f<c.times.length;++f){const p=c.times[f]*i;if(!(p<t||p>=n)){d.push(c.times[f]);for(let _=0;_<u;++_)h.push(c.values[f*u+_])}}d.length!==0&&(c.times=Ps(d,c.times.constructor),c.values=Ps(h,c.values.constructor),a.push(c))}s.tracks=a;let o=1/0;for(let l=0;l<s.tracks.length;++l)o>s.tracks[l].times[0]&&(o=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*o);return s.resetDuration(),s}function hv(r,e=0,t=r,n=30){n<=0&&(n=30);const i=t.tracks.length,s=e/n;for(let a=0;a<i;++a){const o=t.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;const c=r.tracks.find(function(m){return m.name===o.name&&m.ValueTypeName===l});if(c===void 0)continue;let u=0;const d=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=d/3);let h=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=f/3);const p=o.times.length-1;let _;if(s<=o.times[0]){const m=u,v=d-u;_=o.values.slice(m,v)}else if(s>=o.times[p]){const m=p*d+u,v=m+d-u;_=o.values.slice(m,v)}else{const m=o.createInterpolant(),v=u,x=d-u;m.evaluate(s),_=m.resultBuffer.slice(v,x)}l==="quaternion"&&new vn().fromArray(_).normalize().conjugate().toArray(_);const g=c.times.length;for(let m=0;m<g;++m){const v=m*f+h;if(l==="quaternion")vn.multiplyQuaternionsFlat(c.values,v,_,0,c.values,v);else{const x=f-h*2;for(let y=0;y<x;++y)c.values[v+y]-=_[y]}}}return r.blendMode=Hu,r}class fv{static convertArray(e,t){return Ps(e,t)}static isTypedArray(e){return rp(e)}static getKeyframeOrder(e){return Bp(e)}static sortedArray(e,t,n){return vu(e,t,n)}static flattenJSON(e,t,n,i){ud(e,t,n,i)}static subclip(e,t,n,i,s=30){return dv(e,t,n,i,s)}static makeClipAdditive(e,t=0,n=e,i=30){return hv(e,t,n,i)}}class Ir{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class zp extends Ir{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Rs,endingEnd:Rs}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Is:s=e,o=2*t-n;break;case da:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Is:a=e,l=2*n-t;break;case da:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),_=p*p,g=_*p,m=-h*g+2*h*_-h*p,v=(1+h)*g+(-1.5-2*h)*_+(-.5+h)*p+1,x=(-1-f)*g+(1.5+f)*_+.5*p,y=f*g-f*_;for(let S=0;S!==o;++S)s[S]=m*a[u+S]+v*a[c+S]+x*a[l+S]+y*a[d+S];return s}}class dd extends Ir{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(i-t),d=1-u;for(let h=0;h!==o;++h)s[h]=a[c+h]*d+a[l+h]*u;return s}}class Vp extends Ir{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Gp extends Ir{interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.settings||this.DefaultSettings_,d=u.inTangents,h=u.outTangents;if(!d||!h){const _=(n-t)/(i-t),g=1-_;for(let m=0;m!==o;++m)s[m]=a[c+m]*g+a[l+m]*_;return s}const f=o*2,p=e-1;for(let _=0;_!==o;++_){const g=a[c+_],m=a[l+_],v=p*f+_*2,x=h[v],y=h[v+1],S=e*f+_*2,M=d[S],C=d[S+1];let b=(n-t)/(i-t),T,P,L,B,Q;for(let J=0;J<8;J++){T=b*b,P=T*b,L=1-b,B=L*L,Q=B*L;const Y=Q*t+3*B*b*x+3*L*T*M+P*i-n;if(Math.abs(Y)<1e-10)break;const K=3*B*(x-t)+6*L*b*(M-x)+3*T*(i-M);if(Math.abs(K)<1e-10)break;b=b-Y/K,b=Math.max(0,Math.min(1,b))}s[_]=Q*g+3*B*b*y+3*L*T*C+P*m}return s}}class Jn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ps(t,this.TimeBufferType),this.values=Ps(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ps(e.times,Array),values:Ps(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Vp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new dd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new zp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new Gp(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case ua:t=this.InterpolantFactoryMethodDiscrete;break;case vl:t=this.InterpolantFactoryMethodLinear;break;case Ro:t=this.InterpolantFactoryMethodSmooth;break;case hu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Re("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ua;case this.InterpolantFactoryMethodLinear:return vl;case this.InterpolantFactoryMethodSmooth:return Ro;case this.InterpolantFactoryMethodBezier:return hu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Ye("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(Ye("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){Ye("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ye("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&rp(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){Ye("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ro,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(i)l=!0;else{const d=o*n,h=d-n,f=d+n;for(let p=0;p!==n;++p){const _=t[d+p];if(_!==t[h+p]||_!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const d=o*n,h=a*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Jn.prototype.ValueTypeName="";Jn.prototype.TimeBufferType=Float32Array;Jn.prototype.ValueBufferType=Float32Array;Jn.prototype.DefaultInterpolation=vl;class Gs extends Jn{constructor(e,t,n){super(e,t,n)}}Gs.prototype.ValueTypeName="bool";Gs.prototype.ValueBufferType=Array;Gs.prototype.DefaultInterpolation=ua;Gs.prototype.InterpolantFactoryMethodLinear=void 0;Gs.prototype.InterpolantFactoryMethodSmooth=void 0;class hd extends Jn{constructor(e,t,n,i){super(e,t,n,i)}}hd.prototype.ValueTypeName="color";class ya extends Jn{constructor(e,t,n,i){super(e,t,n,i)}}ya.prototype.ValueTypeName="number";class Hp extends Ir{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let u=c+o;c!==u;c+=4)vn.slerpFlat(s,0,a,c-o,a,c,l);return s}}class Ia extends Jn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Hp(this.times,this.values,this.getValueSize(),e)}}Ia.prototype.ValueTypeName="quaternion";Ia.prototype.InterpolantFactoryMethodSmooth=void 0;class Hs extends Jn{constructor(e,t,n){super(e,t,n)}}Hs.prototype.ValueTypeName="string";Hs.prototype.ValueBufferType=Array;Hs.prototype.DefaultInterpolation=ua;Hs.prototype.InterpolantFactoryMethodLinear=void 0;Hs.prototype.InterpolantFactoryMethodSmooth=void 0;class ba extends Jn{constructor(e,t,n,i){super(e,t,n,i)}}ba.prototype.ValueTypeName="vector";class Ma{constructor(e="",t=-1,n=[],i=Nl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Xn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(mv(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(Jn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const u=Bp(l);l=vu(l,1,u),c=vu(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new ya(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],u=c.name.match(s);if(u&&u.length>1){const d=u[1];let h=i[d];h||(i[d]=h=[]),h.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(Re("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Ye("AnimationClip: No animation in JSONLoader data."),null;const n=function(d,h,f,p,_){if(f.length!==0){const g=[],m=[];ud(f,g,m,p),g.length!==0&&_.push(new d(h,g,m))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const h=c[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const f={};let p;for(p=0;p<h.length;p++)if(h[p].morphTargets)for(let _=0;_<h[p].morphTargets.length;_++)f[h[p].morphTargets[_]]=-1;for(const _ in f){const g=[],m=[];for(let v=0;v!==h[p].morphTargets.length;++v){const x=h[p];g.push(x.time),m.push(x.morphTarget===_?1:0)}i.push(new ya(".morphTargetInfluence["+_+"]",g,m))}l=f.length*a}else{const f=".bones["+t[d].name+"]";n(ba,f+".position",h,"pos",i),n(Ia,f+".quaternion",h,"rot",i),n(ba,f+".scale",h,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function pv(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ya;case"vector":case"vector2":case"vector3":case"vector4":return ba;case"color":return hd;case"quaternion":return Ia;case"bool":case"boolean":return Gs;case"string":return Hs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function mv(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=pv(r.type);if(r.times===void 0){const t=[],n=[];ud(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Mi={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(vh(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!vh(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function vh(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class fd{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&i.onStart!==void 0&&i.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){const f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Wp=new fd;class Nn{constructor(e){this.manager=e!==void 0?e:Wp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Nn.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ui={};class gv extends Error{constructor(e,t){super(e),this.response=t}}class Vi extends Nn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Mi.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(Ui[e]!==void 0){Ui[e].push({onLoad:t,onProgress:n,onError:i});return}Ui[e]=[],Ui[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Re("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Ui[e],d=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=h?parseInt(h):0,p=f!==0;let _=0;const g=new ReadableStream({start(m){v();function v(){d.read().then(({done:x,value:y})=>{if(x)m.close();else{_+=y.byteLength;const S=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let M=0,C=u.length;M<C;M++){const b=u[M];b.onProgress&&b.onProgress(S)}m.enqueue(y),v()}},x=>{m.error(x)})}}});return new Response(g)}else throw new gv(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{Mi.add(`file:${e}`,c);const u=Ui[e];delete Ui[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=Ui[e];if(u===void 0)throw this.manager.itemError(e),c;delete Ui[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class _v extends Nn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new Vi(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):Ye(l),s.manager.itemError(e)}},n,i)}parse(e){const t=[];for(let n=0;n<e.length;n++){const i=Ma.parse(e[n]);t.push(i)}return t}}class vv extends Nn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=[],o=new $l,l=new Vi(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(s.withCredentials);let c=0;function u(d){l.load(e[d],function(h){const f=s.parse(h,!0);a[d]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(o.minFilter=Bt),o.image=a,o.format=f.format,o.needsUpdate=!0,t&&t(o))},n,i)}if(Array.isArray(e))for(let d=0,h=e.length;d<h;++d)u(d);else l.load(e,function(d){const h=s.parse(d,!0);if(h.isCubemap){const f=h.mipmaps.length/h.mipmapCount;for(let p=0;p<f;p++){a[p]={mipmaps:[]};for(let _=0;_<h.mipmapCount;_++)a[p].mipmaps.push(h.mipmaps[p*h.mipmapCount+_]),a[p].format=h.format,a[p].width=h.width,a[p].height=h.height}o.image=a}else o.image.width=h.width,o.image.height=h.height,o.mipmaps=h.mipmaps;h.mipmapCount===1&&(o.minFilter=Bt),o.format=h.format,o.needsUpdate=!0,t&&t(o)},n,i);return o}}const or=new WeakMap;class Sa extends Nn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Mi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let d=or.get(a);d===void 0&&(d=[],or.set(a,d)),d.push({onLoad:t,onError:i})}return a}const o=ma("img");function l(){u(),t&&t(this);const d=or.get(this)||[];for(let h=0;h<d.length;h++){const f=d[h];f.onLoad&&f.onLoad(this)}or.delete(this),s.manager.itemEnd(e)}function c(d){u(),i&&i(d),Mi.remove(`image:${e}`);const h=or.get(this)||[];for(let f=0;f<h.length;f++){const p=h[f];p.onError&&p.onError(d)}or.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Mi.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class xv extends Nn{constructor(e){super(e)}load(e,t,n,i){const s=new Aa;s.colorSpace=Pn;const a=new Sa(this.manager);a.setCrossOrigin(this.crossOrigin),a.setPath(this.path);let o=0;function l(c){a.load(e[c],function(u){s.images[c]=u,o++,o===6&&(s.needsUpdate=!0,t&&t(s))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return s}}class yv extends Nn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new li,o=new Vi(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(e,function(l){let c;try{c=s.parse(l)}catch(u){i!==void 0?i(u):Ye(u);return}c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:Un,a.wrapT=c.wrapT!==void 0?c.wrapT:Un,a.magFilter=c.magFilter!==void 0?c.magFilter:Bt,a.minFilter=c.minFilter!==void 0?c.minFilter:Bt,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(a.colorSpace=c.colorSpace),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=bi),c.mipmapCount===1&&(a.minFilter=Bt),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,t&&t(a,c)},n,i),a}}class bv extends Nn{constructor(e){super(e)}load(e,t,n,i){const s=new Vt,a=new Sa(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class fs extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Fe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Xp extends fs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Fe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Vc=new rt,xh=new I,yh=new I;class pd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ge(512,512),this.mapType=Ln,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ar,this._frameExtents=new ge(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;xh.setFromMatrixPosition(e.matrixWorld),t.position.copy(xh),yh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yh),t.updateMatrixWorld(),Vc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vc,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Os||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Vc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const po=new I,mo=new vn,mi=new I;class rc extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=Hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(po,mo,mi),mi.x===1&&mi.y===1&&mi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(po,mo,mi.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(po,mo,mi),mi.x===1&&mi.y===1&&mi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(po,mo,mi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Qi=new I,bh=new ge,Mh=new ge;class on extends rc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=br*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ds*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return br*2*Math.atan(Math.tan(Ds*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z),Qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z)}getViewSize(e,t){return this.getViewBounds(e,bh,Mh),t.subVectors(Mh,bh)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ds*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Mv extends pd{constructor(){super(new on(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=br*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class $p extends fs{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Mv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class Sv extends pd{constructor(){super(new on(90,1,.5,500)),this.isPointLightShadow=!0}}class qp extends fs{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Sv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Pa extends rc{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class wv extends pd{constructor(){super(new Pa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Yp extends fs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new wv}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Zp extends fs{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Kp extends fs{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class md{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new I)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,s=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.282095),t.addScaledVector(a[1],.488603*i),t.addScaledVector(a[2],.488603*s),t.addScaledVector(a[3],.488603*n),t.addScaledVector(a[4],1.092548*(n*i)),t.addScaledVector(a[5],1.092548*(i*s)),t.addScaledVector(a[6],.315392*(3*s*s-1)),t.addScaledVector(a[7],1.092548*(n*s)),t.addScaledVector(a[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,s=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.886227),t.addScaledVector(a[1],2*.511664*i),t.addScaledVector(a[2],2*.511664*s),t.addScaledVector(a[3],2*.511664*n),t.addScaledVector(a[4],2*.429043*n*i),t.addScaledVector(a[5],2*.429043*i*s),t.addScaledVector(a[6],.743125*s*s-.247708),t.addScaledVector(a[7],2*.429043*n*s),t.addScaledVector(a[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,s=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*s,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*s,t[6]=.315392*(3*s*s-1),t[7]=1.092548*n*s,t[8]=.546274*(n*n-i*i)}}class Jp extends fs{constructor(e=new md,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class ac extends Nn{constructor(e){super(e),this.textures={}}load(e,t,n,i){const s=this,a=new Vi(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):Ye(l),s.manager.itemError(e)}},n,i)}parse(e){const t=this.textures;function n(s){return t[s]===void 0&&Re("MaterialLoader: Undefined texture",s),t[s]}const i=this.createMaterialFromType(e.type);if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=e.sheen),e.sheenColor!==void 0&&(i.sheenColor=new Fe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(i.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.specularIntensity!==void 0&&(i.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(i.dispersion=e.dispersion),e.iridescence!==void 0&&(i.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(i.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.attenuationDistance!==void 0&&(i.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(i.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.shadowSide!==void 0&&(i.shadowSide=e.shadowSide),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(i.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(i.depthFunc=e.depthFunc),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(i.blendSrc=e.blendSrc),e.blendDst!==void 0&&(i.blendDst=e.blendDst),e.blendEquation!==void 0&&(i.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(i.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(i.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==void 0&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(i.dithering=e.dithering),e.alphaToCoverage!==void 0&&(i.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(i.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(i.allowOverride=e.allowOverride),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const s in e.uniforms){const a=e.uniforms[s];switch(i.uniforms[s]={},a.type){case"t":i.uniforms[s].value=n(a.value);break;case"c":i.uniforms[s].value=new Fe().setHex(a.value);break;case"v2":i.uniforms[s].value=new ge().fromArray(a.value);break;case"v3":i.uniforms[s].value=new I().fromArray(a.value);break;case"v4":i.uniforms[s].value=new Mt().fromArray(a.value);break;case"m3":i.uniforms[s].value=new ct().fromArray(a.value);break;case"m4":i.uniforms[s].value=new rt().fromArray(a.value);break;default:i.uniforms[s].value=a.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(i.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)i.extensions[s]=e.extensions[s];if(e.lights!==void 0&&(i.lights=e.lights),e.clipping!==void 0&&(i.clipping=e.clipping),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),i.normalScale=new ge().fromArray(s)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(i.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapRotation!==void 0&&i.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new ge().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(i.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(i.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(i.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(i.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(e.sheenRoughnessMap)),i}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return ac.createMaterialFromType(e)}static createMaterialFromType(e){const t={ShadowMaterial:Ip,SpriteMaterial:Zu,RawShaderMaterial:ad,ShaderMaterial:qn,PointsMaterial:Ju,MeshPhysicalMaterial:Lp,MeshStandardMaterial:od,MeshPhongMaterial:Dp,MeshToonMaterial:Up,MeshNormalMaterial:Np,MeshLambertMaterial:Fp,MeshDepthMaterial:ld,MeshDistanceMaterial:cd,MeshBasicMaterial:an,MeshMatcapMaterial:Op,LineDashedMaterial:kp,LineBasicMaterial:Cn,Material:cn};return new t[e]}}class xu{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class gd extends ut{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class jp extends Nn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new Vi(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):Ye(l),s.manager.itemError(e)}},n,i)}parse(e){const t={},n={};function i(f,p){if(t[p]!==void 0)return t[p];const g=f.interleavedBuffers[p],m=s(f,g.buffer),v=gr(g.type,m),x=new Hl(v,g.stride);return x.uuid=g.uuid,t[p]=x,x}function s(f,p){if(n[p]!==void 0)return n[p];const g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}const a=e.isInstancedBufferGeometry?new gd:new ut,o=e.data.index;if(o!==void 0){const f=gr(o.type,o.array);a.setIndex(new Ut(f,1))}const l=e.data.attributes;for(const f in l){const p=l[f];let _;if(p.isInterleavedBufferAttribute){const g=i(e.data,p.data);_=new Wn(g,p.itemSize,p.offset,p.normalized)}else{const g=gr(p.type,p.array),m=p.isInstancedBufferAttribute?Mr:Ut;_=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(_.name=p.name),p.usage!==void 0&&_.setUsage(p.usage),a.setAttribute(f,_)}const c=e.data.morphAttributes;if(c)for(const f in c){const p=c[f],_=[];for(let g=0,m=p.length;g<m;g++){const v=p[g];let x;if(v.isInterleavedBufferAttribute){const y=i(e.data,v.data);x=new Wn(y,v.itemSize,v.offset,v.normalized)}else{const y=gr(v.type,v.array);x=new Ut(y,v.itemSize,v.normalized)}v.name!==void 0&&(x.name=v.name),_.push(x)}a.morphAttributes[f]=_}e.data.morphTargetsRelative&&(a.morphTargetsRelative=!0);const d=e.data.groups||e.data.drawcalls||e.data.offsets;if(d!==void 0)for(let f=0,p=d.length;f!==p;++f){const _=d[f];a.addGroup(_.start,_.count,_.materialIndex)}const h=e.data.boundingSphere;return h!==void 0&&(a.boundingSphere=new en().fromJSON(h)),e.name&&(a.name=e.name),e.userData&&(a.userData=e.userData),a}}const Gc={};class Ev extends Nn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=this.path===""?xu.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||a;const o=new Vi(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(d){i!==void 0&&i(d),Ye("ObjectLoader: Can't parse "+e+".",d.message);return}const u=c.metadata;if(u===void 0||u.type===void 0||u.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),Ye("ObjectLoader: Can't load "+e);return}s.parse(c,t)},n,i)}async loadAsync(e,t){const n=this,i=this.path===""?xu.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;const s=new Vi(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const a=await s.loadAsync(e,t);let o;try{o=JSON.parse(a)}catch(c){throw new Error("ObjectLoader: Can't parse "+e+". "+c.message)}const l=o.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(o)}parse(e,t){const n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),s=this.parseGeometries(e.geometries,i),a=this.parseImages(e.images,function(){t!==void 0&&t(c)}),o=this.parseTextures(e.textures,a),l=this.parseMaterials(e.materials,o),c=this.parseObject(e.object,s,l,o,n),u=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,u),this.bindLightTargets(c),t!==void 0){let d=!1;for(const h in a)if(a[h].data instanceof HTMLImageElement){d=!0;break}d===!1&&t(c)}return c}async parseAsync(e){const t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),s=await this.parseImagesAsync(e.images),a=this.parseTextures(e.textures,s),o=this.parseMaterials(e.materials,a),l=this.parseObject(e.object,i,o,a,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}static registerGeometry(e,t){Gc[e]=t}parseShapes(e){const t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){const s=new Us().fromJSON(e[n]);t[s.uuid]=s}return t}parseSkeletons(e,t){const n={},i={};if(t.traverse(function(s){s.isBone&&(i[s.uuid]=s)}),e!==void 0)for(let s=0,a=e.length;s<a;s++){const o=new Wl().fromJSON(e[s],i);n[o.uuid]=o}return n}parseGeometries(e,t){const n={};if(e!==void 0){const i=new jp;for(let s=0,a=e.length;s<a;s++){let o;const l=e[s];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":o=i.parse(l);break;default:l.type in gh?o=gh[l.type].fromJSON(l,t):l.type in Gc?o=Gc[l.type].fromJSON(l,t):Re(`ObjectLoader: Unknown geometry type "${l.type}". Use .registerGeometry() before starting the deserialization process.`)}o.uuid=l.uuid,l.name!==void 0&&(o.name=l.name),l.userData!==void 0&&(o.userData=l.userData),n[l.uuid]=o}}return n}parseMaterials(e,t){const n={},i={};if(e!==void 0){const s=new ac;s.setTextures(t);for(let a=0,o=e.length;a<o;a++){const l=e[a];n[l.uuid]===void 0&&(n[l.uuid]=s.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){const t={};if(e!==void 0)for(let n=0;n<e.length;n++){const i=e[n],s=Ma.parse(i);t[s.uuid]=s}return t}parseImages(e,t){const n=this,i={};let s;function a(l){return n.manager.itemStart(l),s.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function o(l){if(typeof l=="string"){const c=l,u=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return a(u)}else return l.data?{data:gr(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){const l=new fd(t);s=new Sa(l),s.setCrossOrigin(this.crossOrigin);for(let c=0,u=e.length;c<u;c++){const d=e[c],h=d.url;if(Array.isArray(h)){const f=[];for(let p=0,_=h.length;p<_;p++){const g=h[p],m=o(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new li(m.data,m.width,m.height)))}i[d.uuid]=new ss(f)}else{const f=o(d.url);i[d.uuid]=new ss(f)}}}return i}async parseImagesAsync(e){const t=this,n={};let i;async function s(a){if(typeof a=="string"){const o=a,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(o)?o:t.resourcePath+o;return await i.loadAsync(l)}else return a.data?{data:gr(a.type,a.data),width:a.width,height:a.height}:null}if(e!==void 0&&e.length>0){i=new Sa(this.manager),i.setCrossOrigin(this.crossOrigin);for(let a=0,o=e.length;a<o;a++){const l=e[a],c=l.url;if(Array.isArray(c)){const u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d],p=await s(f);p!==null&&(p instanceof HTMLImageElement?u.push(p):u.push(new li(p.data,p.width,p.height)))}n[l.uuid]=new ss(u)}else{const u=await s(l.url);n[l.uuid]=new ss(u)}}}return n}parseTextures(e,t){function n(s,a){return typeof s=="number"?s:(Re("ObjectLoader.parseTexture: Constant should be in numeric form.",s),a[s])}const i={};if(e!==void 0)for(let s=0,a=e.length;s<a;s++){const o=e[s];o.image===void 0&&Re('ObjectLoader: No "image" specified for',o.uuid),t[o.image]===void 0&&Re("ObjectLoader: Undefined image",o.image);const l=t[o.image],c=l.data;let u;Array.isArray(c)?(u=new Aa,c.length===6&&(u.needsUpdate=!0)):(c&&c.data?u=new li:u=new Vt,c&&(u.needsUpdate=!0)),u.source=l,u.uuid=o.uuid,o.name!==void 0&&(u.name=o.name),o.mapping!==void 0&&(u.mapping=n(o.mapping,Tv)),o.channel!==void 0&&(u.channel=o.channel),o.offset!==void 0&&u.offset.fromArray(o.offset),o.repeat!==void 0&&u.repeat.fromArray(o.repeat),o.center!==void 0&&u.center.fromArray(o.center),o.rotation!==void 0&&(u.rotation=o.rotation),o.wrap!==void 0&&(u.wrapS=n(o.wrap[0],Sh),u.wrapT=n(o.wrap[1],Sh)),o.format!==void 0&&(u.format=o.format),o.internalFormat!==void 0&&(u.internalFormat=o.internalFormat),o.type!==void 0&&(u.type=o.type),o.colorSpace!==void 0&&(u.colorSpace=o.colorSpace),o.minFilter!==void 0&&(u.minFilter=n(o.minFilter,wh)),o.magFilter!==void 0&&(u.magFilter=n(o.magFilter,wh)),o.anisotropy!==void 0&&(u.anisotropy=o.anisotropy),o.flipY!==void 0&&(u.flipY=o.flipY),o.generateMipmaps!==void 0&&(u.generateMipmaps=o.generateMipmaps),o.premultiplyAlpha!==void 0&&(u.premultiplyAlpha=o.premultiplyAlpha),o.unpackAlignment!==void 0&&(u.unpackAlignment=o.unpackAlignment),o.compareFunction!==void 0&&(u.compareFunction=o.compareFunction),o.normalized!==void 0&&(u.normalized=o.normalized),o.userData!==void 0&&(u.userData=o.userData),i[o.uuid]=u}return i}parseObject(e,t,n,i,s){let a;function o(h){return t[h]===void 0&&Re("ObjectLoader: Undefined geometry",h),t[h]}function l(h){if(h!==void 0){if(Array.isArray(h)){const f=[];for(let p=0,_=h.length;p<_;p++){const g=h[p];n[g]===void 0&&Re("ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[h]===void 0&&Re("ObjectLoader: Undefined material",h),n[h]}}function c(h){return i[h]===void 0&&Re("ObjectLoader: Undefined texture",h),i[h]}let u,d;switch(e.type){case"Scene":a=new $u,e.background!==void 0&&(Number.isInteger(e.background)?a.background=new Fe(e.background):a.background=c(e.background)),e.environment!==void 0&&(a.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?a.fog=new Gl(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(a.fog=new Vl(e.fog.color,e.fog.density)),e.fog.name!==""&&(a.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(a.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(a.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&a.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(a.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&a.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":a=new on(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(a.focus=e.focus),e.zoom!==void 0&&(a.zoom=e.zoom),e.filmGauge!==void 0&&(a.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(a.filmOffset=e.filmOffset),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"OrthographicCamera":a=new Pa(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(a.zoom=e.zoom),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"AmbientLight":a=new Zp(e.color,e.intensity);break;case"DirectionalLight":a=new Yp(e.color,e.intensity),a.target=e.target||"";break;case"PointLight":a=new qp(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":a=new Kp(e.color,e.intensity,e.width,e.height);break;case"SpotLight":a=new $p(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),a.target=e.target||"";break;case"HemisphereLight":a=new Xp(e.color,e.groundColor,e.intensity);break;case"LightProbe":const h=new md().fromArray(e.sh);a=new Jp(h,e.intensity);break;case"SkinnedMesh":u=o(e.geometry),d=l(e.material),a=new fp(u,d),e.bindMode!==void 0&&(a.bindMode=e.bindMode),e.bindMatrix!==void 0&&a.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(a.skeleton=e.skeleton);break;case"Mesh":u=o(e.geometry),d=l(e.material),a=new Lt(u,d);break;case"InstancedMesh":u=o(e.geometry),d=l(e.material);const f=e.count,p=e.instanceMatrix,_=e.instanceColor;a=new pp(u,d,f),a.instanceMatrix=new Mr(new Float32Array(p.array),16),_!==void 0&&(a.instanceColor=new Mr(new Float32Array(_.array),_.itemSize));break;case"BatchedMesh":u=o(e.geometry),d=l(e.material),a=new mp(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,d),a.geometry=u,a.perObjectFrustumCulled=e.perObjectFrustumCulled,a.sortObjects=e.sortObjects,a._drawRanges=e.drawRanges,a._reservedRanges=e.reservedRanges,a._geometryInfo=e.geometryInfo.map(g=>{let m=null,v=null;return g.boundingBox!==void 0&&(m=new Qt().fromJSON(g.boundingBox)),g.boundingSphere!==void 0&&(v=new en().fromJSON(g.boundingSphere)),{...g,boundingBox:m,boundingSphere:v}}),a._instanceInfo=e.instanceInfo,a._availableInstanceIds=e._availableInstanceIds,a._availableGeometryIds=e._availableGeometryIds,a._nextIndexStart=e.nextIndexStart,a._nextVertexStart=e.nextVertexStart,a._geometryCount=e.geometryCount,a._maxInstanceCount=e.maxInstanceCount,a._maxVertexCount=e.maxVertexCount,a._maxIndexCount=e.maxIndexCount,a._geometryInitialized=e.geometryInitialized,a._matricesTexture=c(e.matricesTexture.uuid),a._indirectTexture=c(e.indirectTexture.uuid),e.colorsTexture!==void 0&&(a._colorsTexture=c(e.colorsTexture.uuid)),e.boundingSphere!==void 0&&(a.boundingSphere=new en().fromJSON(e.boundingSphere)),e.boundingBox!==void 0&&(a.boundingBox=new Qt().fromJSON(e.boundingBox));break;case"LOD":a=new hp;break;case"Line":a=new cs(o(e.geometry),l(e.material));break;case"LineLoop":a=new gp(o(e.geometry),l(e.material));break;case"LineSegments":a=new Ci(o(e.geometry),l(e.material));break;case"PointCloud":case"Points":a=new _p(o(e.geometry),l(e.material));break;case"Sprite":a=new dp(l(e.material));break;case"Group":a=new _r;break;case"Bone":a=new Ku;break;default:a=new St}if(a.uuid=e.uuid,e.name!==void 0&&(a.name=e.name),e.matrix!==void 0?(a.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(a.matrixAutoUpdate=e.matrixAutoUpdate),a.matrixAutoUpdate&&a.matrix.decompose(a.position,a.quaternion,a.scale)):(e.position!==void 0&&a.position.fromArray(e.position),e.rotation!==void 0&&a.rotation.fromArray(e.rotation),e.quaternion!==void 0&&a.quaternion.fromArray(e.quaternion),e.scale!==void 0&&a.scale.fromArray(e.scale)),e.up!==void 0&&a.up.fromArray(e.up),e.pivot!==void 0&&(a.pivot=new I().fromArray(e.pivot)),e.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),e.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=e.morphTargetInfluences.slice()),e.castShadow!==void 0&&(a.castShadow=e.castShadow),e.receiveShadow!==void 0&&(a.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(a.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(a.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(a.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(a.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&a.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(a.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(a.visible=e.visible),e.frustumCulled!==void 0&&(a.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(a.renderOrder=e.renderOrder),e.static!==void 0&&(a.static=e.static),e.userData!==void 0&&(a.userData=e.userData),e.layers!==void 0&&(a.layers.mask=e.layers),e.children!==void 0){const h=e.children;for(let f=0;f<h.length;f++)a.add(this.parseObject(h[f],t,n,i,s))}if(e.animations!==void 0){const h=e.animations;for(let f=0;f<h.length;f++){const p=h[f];a.animations.push(s[p])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(a.autoUpdate=e.autoUpdate);const h=e.levels;for(let f=0;f<h.length;f++){const p=h[f],_=a.getObjectByProperty("uuid",p.object);_!==void 0&&a.addLevel(_,p.distance,p.hysteresis)}}return a}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=t[n.skeleton];i===void 0?Re("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){const n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new St}})}}const Tv={UVMapping:Cl,CubeReflectionMapping:Ei,CubeRefractionMapping:as,EquirectangularReflectionMapping:Kr,EquirectangularRefractionMapping:Jr,CubeUVReflectionMapping:Er},Sh={RepeatWrapping:aa,ClampToEdgeWrapping:Un,MirroredRepeatWrapping:oa},wh={NearestFilter:Kt,NearestMipmapNearestFilter:Fu,NearestMipmapLinearFilter:mr,LinearFilter:Bt,LinearMipmapNearestFilter:jr,LinearMipmapLinearFilter:bi},Hc=new WeakMap;class Av extends Nn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Re("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Re("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Mi.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{Hc.has(a)===!0?(i&&i(Hc.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(c),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){Mi.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e)}).catch(function(c){i&&i(c),Hc.set(l,c),Mi.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Mi.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}let go;class _d{static getContext(){return go===void 0&&(go=new(window.AudioContext||window.webkitAudioContext)),go}static setContext(e){go=e}}class Cv extends Nn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new Vi(this.manager);a.setResponseType("arraybuffer"),a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){try{const c=l.slice(0),u=_d.getContext(),d=e+"#decode";s.manager.itemStart(d),u.decodeAudioData(c,function(h){t(h),s.manager.itemEnd(d)}).catch(function(h){o(h),s.manager.itemEnd(d)})}catch(c){o(c)}},n,i);function o(l){i?i(l):Ye(l),s.manager.itemError(e)}}}const Eh=new rt,Th=new rt,ys=new rt;class Rv{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new on,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new on,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,ys.copy(e.projectionMatrix);const i=t.eyeSep/2,s=i*t.near/t.focus,a=t.near*Math.tan(Ds*t.fov*.5)/t.zoom;let o,l;Th.elements[12]=-i,Eh.elements[12]=i,o=-a*t.aspect+s,l=a*t.aspect+s,ys.elements[0]=2*t.near/(l-o),ys.elements[8]=(l+o)/(l-o),this.cameraL.projectionMatrix.copy(ys),o=-a*t.aspect-s,l=a*t.aspect-s,ys.elements[0]=2*t.near/(l-o),ys.elements[8]=(l+o)/(l-o),this.cameraR.projectionMatrix.copy(ys)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(Th),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(Eh)}}const lr=-90,cr=1;class Qp extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new on(lr,cr,e,t);i.layers=this.layers,this.add(i);const s=new on(lr,cr,e,t);s.layers=this.layers,this.add(s);const a=new on(lr,cr,e,t);a.layers=this.layers,this.add(a);const o=new on(lr,cr,e,t);o.layers=this.layers,this.add(o);const l=new on(lr,cr,e,t);l.layers=this.layers,this.add(l);const c=new on(lr,cr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Hn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Os)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class em extends on{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class tm{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Iv.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Iv(){this._document.hidden===!1&&this.reset()}const bs=new I,Wc=new vn,Pv=new I,Ms=new I,Ss=new I;class Lv extends St{constructor(){super(),this.type="AudioListener",this.context=_d.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new tm}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e),this._timer.update();const t=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(bs,Wc,Pv),Ms.set(0,0,-1).applyQuaternion(Wc),Ss.set(0,1,0).applyQuaternion(Wc),t.positionX){const n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(bs.x,n),t.positionY.linearRampToValueAtTime(bs.y,n),t.positionZ.linearRampToValueAtTime(bs.z,n),t.forwardX.linearRampToValueAtTime(Ms.x,n),t.forwardY.linearRampToValueAtTime(Ms.y,n),t.forwardZ.linearRampToValueAtTime(Ms.z,n),t.upX.linearRampToValueAtTime(Ss.x,n),t.upY.linearRampToValueAtTime(Ss.y,n),t.upZ.linearRampToValueAtTime(Ss.z,n)}else t.setPosition(bs.x,bs.y,bs.z),t.setOrientation(Ms.x,Ms.y,Ms.z,Ss.x,Ss.y,Ss.z)}}class nm extends St{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){Re("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){Re("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){Re("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){Re("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){Re("Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(Re("Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){Re("Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}copy(e,t){return super.copy(e,t),e.sourceType!=="buffer"?(Re("Audio: Audio source type cannot be copied."),this):(this.autoplay=e.autoplay,this.buffer=e.buffer,this.detune=e.detune,this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.offset=e.offset,this.duration=e.duration,this.playbackRate=e.playbackRate,this.hasPlaybackControl=e.hasPlaybackControl,this.sourceType=e.sourceType,this.filters=e.filters.slice(),this)}clone(e){return new this.constructor(this.listener).copy(this,e)}}const ws=new I,Ah=new vn,Dv=new I,Es=new I;class Uv extends nm{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(ws,Ah,Dv),Es.set(0,0,1).applyQuaternion(Ah);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(ws.x,n),t.positionY.linearRampToValueAtTime(ws.y,n),t.positionZ.linearRampToValueAtTime(ws.z,n),t.orientationX.linearRampToValueAtTime(Es.x,n),t.orientationY.linearRampToValueAtTime(Es.y,n),t.orientationZ.linearRampToValueAtTime(Es.z,n)}else t.setPosition(ws.x,ws.y,ws.z),t.setOrientation(Es.x,Es.y,Es.z)}}class Nv{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}}class im{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,a;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,a=i;s!==a;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){vn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const a=this._workIndex*s;vn.multiplyQuaternionsFlat(e,a,e,t,e,n),vn.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,s){const a=1-i;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,s){for(let a=0;a!==s;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const vd="\\[\\]\\.:\\/",Fv=new RegExp("["+vd+"]","g"),xd="[^"+vd+"]",Ov="[^"+vd.replace("\\.","")+"]",kv=/((?:WC+[\/:])*)/.source.replace("WC",xd),Bv=/(WCOD+)?/.source.replace("WCOD",Ov),zv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",xd),Vv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",xd),Gv=new RegExp("^"+kv+Bv+zv+Vv+"$"),Hv=["material","materials","bones","map"];class Wv{constructor(e,t,n){const i=n||Et.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Et{constructor(e,t,n){this.path=t,this.parsedPath=n||Et.parseTrackName(t),this.node=Et.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Et.Composite(e,t,n):new Et(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Fv,"")}static parseTrackName(e){const t=Gv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Hv.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Et.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Re("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ye("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ye("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ye("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ye("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ye("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;Ye("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Et.Composite=Wv;Et.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Et.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Et.prototype.GetterByBindingType=[Et.prototype._getValue_direct,Et.prototype._getValue_array,Et.prototype._getValue_arrayElement,Et.prototype._getValue_toArray];Et.prototype.SetterByBindingTypeAndVersioning=[[Et.prototype._setValue_direct,Et.prototype._setValue_direct_setNeedsUpdate,Et.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_array,Et.prototype._setValue_array_setNeedsUpdate,Et.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_arrayElement,Et.prototype._setValue_arrayElement_setNeedsUpdate,Et.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_fromArray,Et.prototype._setValue_fromArray_setNeedsUpdate,Et.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Xv{constructor(){this.isAnimationObjectGroup=!0,this.uuid=Xn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,a=s.length;let o,l=e.length,c=this.nCachedObjects_;for(let u=0,d=arguments.length;u!==d;++u){const h=arguments[u],f=h.uuid;let p=t[f];if(p===void 0){p=l++,t[f]=p,e.push(h);for(let _=0,g=a;_!==g;++_)s[_].push(new Et(h,n[_],i[_]))}else if(p<c){o=e[p];const _=--c,g=e[_];t[g.uuid]=p,e[p]=g,t[f]=_,e[_]=h;for(let m=0,v=a;m!==v;++m){const x=s[m],y=x[_];let S=x[p];x[p]=y,S===void 0&&(S=new Et(h,n[m],i[m])),x[_]=S}}else e[p]!==o&&Ye("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_;for(let a=0,o=arguments.length;a!==o;++a){const l=arguments[a],c=l.uuid,u=t[c];if(u!==void 0&&u>=s){const d=s++,h=e[d];t[h.uuid]=u,e[u]=h,t[c]=d,e[d]=l;for(let f=0,p=i;f!==p;++f){const _=n[f],g=_[d],m=_[u];_[u]=g,_[d]=m}}}this.nCachedObjects_=s}uncache(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_,a=e.length;for(let o=0,l=arguments.length;o!==l;++o){const c=arguments[o],u=c.uuid,d=t[u];if(d!==void 0)if(delete t[u],d<s){const h=--s,f=e[h],p=--a,_=e[p];t[f.uuid]=d,e[d]=f,t[_.uuid]=h,e[h]=_,e.pop();for(let g=0,m=i;g!==m;++g){const v=n[g],x=v[h],y=v[p];v[d]=x,v[h]=y,v.pop()}}else{const h=--a,f=e[h];h>0&&(t[f.uuid]=d),e[d]=f,e.pop();for(let p=0,_=i;p!==_;++p){const g=n[p];g[d]=g[h],g.pop()}}}this.nCachedObjects_=s}subscribe_(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const s=this._bindings;if(i!==void 0)return s[i];const a=this._paths,o=this._parsedPaths,l=this._objects,c=l.length,u=this.nCachedObjects_,d=new Array(c);i=s.length,n[e]=i,a.push(e),o.push(t),s.push(d);for(let h=u,f=l.length;h!==f;++h){const p=l[h];d[h]=new Et(p,e,t)}return d}unsubscribe_(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,s=this._parsedPaths,a=this._bindings,o=a.length-1,l=a[o],c=e[o];t[c]=n,a[n]=l,a.pop(),s[n]=s[o],s.pop(),i[n]=i[o],i.pop()}}}class sm{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,a=s.length,o=new Array(a),l={endingStart:Rs,endingEnd:Rs};for(let c=0;c!==a;++c){const u=s[c].createInterpolant(null);o[c]=u,u.settings&&Object.assign(l,u.settings),u.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Zf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,s=e._clip.duration,a=s/i,o=i/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Hu:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(a),c[u].accumulateAdditive(o);break;case Nl:default:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(a),c[u].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const a=n===Kf;if(e===0)return s===-1?i:a&&(s&1)===1?t-i:i;if(n===Yf){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=s,this.time=i;if(a&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Is,i.endingEnd=Is):(e?i.endingStart=this.zeroSlopeAtStart?Is:Rs:i.endingStart=da,t?i.endingEnd=this.zeroSlopeAtEnd?Is:Rs:i.endingEnd=da)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}}const $v=new Float32Array(1);class qv extends ui{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let u=c[l];u===void 0&&(u={},c[l]=u);for(let d=0;d!==s;++d){const h=i[d],f=h.name;let p=u[f];if(p!==void 0)++p.referenceCount,a[d]=p;else{if(p=a[d],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}const _=t&&t._propertyBindings[d].binding.parsedPath;p=new im(Et.create(n,f,_),h.ValueTypeName,h.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),a[d]=p}o[d].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;const d=o.actionByRoot,h=(e._localRoot||this._root).uuid;delete d[h],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new dd(new Float32Array(2),new Float32Array(2),1,$v),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let a=typeof e=="string"?Ma.findByName(i,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Nl),l!==void 0){const d=l.actionByRoot[s];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const u=new sm(this,a,t,n);return this._bindAction(u,c),this._addInactiveAction(u,o,s),u}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?Ma.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const u=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=u,t[u]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class Yv extends Xu{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isRenderTarget3D=!0,this.depth=n,this.texture=new Bl(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class yd{constructor(e){this.value=e}clone(){return new yd(this.value.clone===void 0?this.value:this.value.clone())}}let Zv=0;class Kv extends ui{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:Zv++}),this.name="",this.usage=pa,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){const s=Array.isArray(t[n])?t[n]:[t[n]];for(let a=0;a<s.length;a++)this.uniforms.push(s[a].clone())}return this}clone(){return new this.constructor().copy(this)}}class El extends Hl{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class Jv{constructor(e,t,n,i,s,a=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=s,this.normalized=a,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}const Ch=new rt;class jv{constructor(e,t,n=0,i=1/0){this.ray=new Tr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new zl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ye("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ch.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ch),this}intersectObject(e,t=!0,n=[]){return yu(e,this,n,t),n.sort(Rh),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)yu(e[i],this,n,t);return n.sort(Rh),n}}function Rh(r,e){return r.distance-e.distance}function yu(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let a=0,o=s.length;a<o;a++)yu(s[a],e,t,!0)}}class Qv{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Re("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class e0{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=at(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(at(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class t0{constructor(e=1,t=0,n=0){this.radius=e,this.theta=t,this.y=n}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}}const Ad=class Ad{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};Ad.prototype.isMatrix2=!0;let bu=Ad;const Ih=new ge;class n0{constructor(e=new ge(1/0,1/0),t=new ge(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ih.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ih).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ph=new I,_o=new I,ur=new I,dr=new I,Xc=new I,i0=new I,s0=new I;class rm{constructor(e=new I,t=new I){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Ph.subVectors(e,this.start),_o.subVectors(this.end,this.start);const n=_o.dot(_o);if(n===0)return 0;let s=_o.dot(Ph)/n;return t&&(s=at(s,0,1)),s}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=i0,n=s0){const i=10000000000000001e-32;let s,a;const o=this.start,l=e.start,c=this.end,u=e.end;ur.subVectors(c,o),dr.subVectors(u,l),Xc.subVectors(o,l);const d=ur.dot(ur),h=dr.dot(dr),f=dr.dot(Xc);if(d<=i&&h<=i)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(d<=i)s=0,a=f/h,a=at(a,0,1);else{const p=ur.dot(Xc);if(h<=i)a=0,s=at(-p/d,0,1);else{const _=ur.dot(dr),g=d*h-_*_;g!==0?s=at((_*f-p*h)/g,0,1):s=0,a=(_*s+f)/h,a<0?(a=0,s=at(-p/d,0,1)):a>1&&(a=1,s=at((_-p)/d,0,1))}}return t.copy(o).addScaledVector(ur,s),n.copy(l).addScaledVector(dr,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const Lh=new I;class r0 extends St{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new ut,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let a=0,o=1,l=32;a<l;a++,o++){const c=a/l*Math.PI*2,u=o/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(u),Math.sin(u),1)}n.setAttribute("position",new Ge(i,3));const s=new Cn({fog:!1,toneMapped:!1});this.cone=new Ci(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),Lh.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Lh),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const es=new I,vo=new rt,$c=new rt;class a0 extends Ci{constructor(e){const t=am(e),n=new ut,i=[],s=[];for(let c=0;c<t.length;c++){const u=t[c];u.parent&&u.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(0,0,0),s.push(0,0,0))}n.setAttribute("position",new Ge(i,3)),n.setAttribute("color",new Ge(s,3));const a=new Cn({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,a),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1;const o=new Fe(255),l=new Fe(65280);this.setColors(o,l)}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");$c.copy(this.root.matrixWorld).invert();for(let s=0,a=0;s<t.length;s++){const o=t[s];o.parent&&o.parent.isBone&&(vo.multiplyMatrices($c,o.matrixWorld),es.setFromMatrixPosition(vo),i.setXYZ(a,es.x,es.y,es.z),vo.multiplyMatrices($c,o.parent.matrixWorld),es.setFromMatrixPosition(vo),i.setXYZ(a+1,es.x,es.y,es.z),a+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}setColors(e,t){const i=this.geometry.getAttribute("color");for(let s=0;s<i.count;s+=2)i.setXYZ(s,e.r,e.g,e.b),i.setXYZ(s+1,t.r,t.g,t.b);return i.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}function am(r){const e=[];r.isBone===!0&&e.push(r);for(let t=0;t<r.children.length;t++)e.push(...am(r.children[t]));return e}class o0 extends Lt{constructor(e,t,n){const i=new ri(t,4,2),s=new an({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const l0=new I,Dh=new Fe,Uh=new Fe;class c0 extends St{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new Cr(t);i.rotateY(Math.PI*.5),this.material=new an({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const s=i.getAttribute("position"),a=new Float32Array(s.count*3);i.setAttribute("color",new Ut(a,3)),this.add(new Lt(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");Dh.copy(this.light.color),Uh.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){const s=n<i/2?Dh:Uh;t.setXYZ(n,s.r,s.g,s.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(l0.setFromMatrixPosition(this.light.matrixWorld).negate())}}class u0 extends Ci{constructor(e=10,t=10,n=4473924,i=8947848){n=new Fe(n),i=new Fe(i);const s=t/2,a=e/t,o=e/2,l=[],c=[];for(let h=0,f=0,p=-o;h<=t;h++,p+=a){l.push(-o,0,p,o,0,p),l.push(p,0,-o,p,0,o);const _=h===s?n:i;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}const u=new ut;u.setAttribute("position",new Ge(l,3)),u.setAttribute("color",new Ge(c,3));const d=new Cn({vertexColors:!0,toneMapped:!1});super(u,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class d0 extends Ci{constructor(e=10,t=16,n=8,i=64,s=4473924,a=8947848){s=new Fe(s),a=new Fe(a);const o=[],l=[];if(t>1)for(let d=0;d<t;d++){const h=d/t*(Math.PI*2),f=Math.sin(h)*e,p=Math.cos(h)*e;o.push(0,0,0),o.push(f,0,p);const _=d&1?s:a;l.push(_.r,_.g,_.b),l.push(_.r,_.g,_.b)}for(let d=0;d<n;d++){const h=d&1?s:a,f=e-e/n*d;for(let p=0;p<i;p++){let _=p/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f;o.push(g,0,m),l.push(h.r,h.g,h.b),_=(p+1)/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f,o.push(g,0,m),l.push(h.r,h.g,h.b)}}const c=new ut;c.setAttribute("position",new Ge(o,3)),c.setAttribute("color",new Ge(l,3));const u=new Cn({vertexColors:!0,toneMapped:!1});super(c,u),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Nh=new I,xo=new I,Fh=new I;class h0 extends St{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new ut;i.setAttribute("position",new Ge([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const s=new Cn({fog:!1,toneMapped:!1});this.lightPlane=new cs(i,s),this.add(this.lightPlane),i=new ut,i.setAttribute("position",new Ge([0,0,0,0,0,1],3)),this.targetLine=new cs(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Nh.setFromMatrixPosition(this.light.matrixWorld),xo.setFromMatrixPosition(this.light.target.matrixWorld),Fh.subVectors(xo,Nh),this.lightPlane.lookAt(xo),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(xo),this.targetLine.scale.z=Fh.length()}}const yo=new I,Ht=new rc;class f0 extends Ci{constructor(e){const t=new ut,n=new Cn({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(p,_){l(p),l(_)}function l(p){i.push(0,0,0),s.push(0,0,0),a[p]===void 0&&(a[p]=[]),a[p].push(i.length/3-1)}t.setAttribute("position",new Ge(i,3)),t.setAttribute("color",new Ge(s,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();const c=new Fe(16755200),u=new Fe(16711680),d=new Fe(43775),h=new Fe(16777215),f=new Fe(3355443);this.setColors(c,u,d,h,f)}setColors(e,t,n,i,s){const o=this.geometry.getAttribute("color");return o.setXYZ(0,e.r,e.g,e.b),o.setXYZ(1,e.r,e.g,e.b),o.setXYZ(2,e.r,e.g,e.b),o.setXYZ(3,e.r,e.g,e.b),o.setXYZ(4,e.r,e.g,e.b),o.setXYZ(5,e.r,e.g,e.b),o.setXYZ(6,e.r,e.g,e.b),o.setXYZ(7,e.r,e.g,e.b),o.setXYZ(8,e.r,e.g,e.b),o.setXYZ(9,e.r,e.g,e.b),o.setXYZ(10,e.r,e.g,e.b),o.setXYZ(11,e.r,e.g,e.b),o.setXYZ(12,e.r,e.g,e.b),o.setXYZ(13,e.r,e.g,e.b),o.setXYZ(14,e.r,e.g,e.b),o.setXYZ(15,e.r,e.g,e.b),o.setXYZ(16,e.r,e.g,e.b),o.setXYZ(17,e.r,e.g,e.b),o.setXYZ(18,e.r,e.g,e.b),o.setXYZ(19,e.r,e.g,e.b),o.setXYZ(20,e.r,e.g,e.b),o.setXYZ(21,e.r,e.g,e.b),o.setXYZ(22,e.r,e.g,e.b),o.setXYZ(23,e.r,e.g,e.b),o.setXYZ(24,t.r,t.g,t.b),o.setXYZ(25,t.r,t.g,t.b),o.setXYZ(26,t.r,t.g,t.b),o.setXYZ(27,t.r,t.g,t.b),o.setXYZ(28,t.r,t.g,t.b),o.setXYZ(29,t.r,t.g,t.b),o.setXYZ(30,t.r,t.g,t.b),o.setXYZ(31,t.r,t.g,t.b),o.setXYZ(32,n.r,n.g,n.b),o.setXYZ(33,n.r,n.g,n.b),o.setXYZ(34,n.r,n.g,n.b),o.setXYZ(35,n.r,n.g,n.b),o.setXYZ(36,n.r,n.g,n.b),o.setXYZ(37,n.r,n.g,n.b),o.setXYZ(38,i.r,i.g,i.b),o.setXYZ(39,i.r,i.g,i.b),o.setXYZ(40,s.r,s.g,s.b),o.setXYZ(41,s.r,s.g,s.b),o.setXYZ(42,s.r,s.g,s.b),o.setXYZ(43,s.r,s.g,s.b),o.setXYZ(44,s.r,s.g,s.b),o.setXYZ(45,s.r,s.g,s.b),o.setXYZ(46,s.r,s.g,s.b),o.setXYZ(47,s.r,s.g,s.b),o.setXYZ(48,s.r,s.g,s.b),o.setXYZ(49,s.r,s.g,s.b),o.needsUpdate=!0,this}update(){const e=this.geometry,t=this.pointMap,n=1,i=1;let s,a;if(Ht.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)s=1,a=0;else if(this.camera.coordinateSystem===Hn)s=-1,a=1;else if(this.camera.coordinateSystem===Os)s=0,a=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);Yt("c",t,e,Ht,0,0,s),Yt("t",t,e,Ht,0,0,a),Yt("n1",t,e,Ht,-n,-i,s),Yt("n2",t,e,Ht,n,-i,s),Yt("n3",t,e,Ht,-n,i,s),Yt("n4",t,e,Ht,n,i,s),Yt("f1",t,e,Ht,-n,-i,a),Yt("f2",t,e,Ht,n,-i,a),Yt("f3",t,e,Ht,-n,i,a),Yt("f4",t,e,Ht,n,i,a),Yt("u1",t,e,Ht,n*.7,i*1.1,s),Yt("u2",t,e,Ht,-n*.7,i*1.1,s),Yt("u3",t,e,Ht,0,i*2,s),Yt("cf1",t,e,Ht,-n,0,a),Yt("cf2",t,e,Ht,n,0,a),Yt("cf3",t,e,Ht,0,-i,a),Yt("cf4",t,e,Ht,0,i,a),Yt("cn1",t,e,Ht,-n,0,s),Yt("cn2",t,e,Ht,n,0,s),Yt("cn3",t,e,Ht,0,-i,s),Yt("cn4",t,e,Ht,0,i,s),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function Yt(r,e,t,n,i,s,a){yo.set(i,s,a).unproject(n);const o=e[r];if(o!==void 0){const l=t.getAttribute("position");for(let c=0,u=o.length;c<u;c++)l.setXYZ(o[c],yo.x,yo.y,yo.z)}}const bo=new Qt;class p0 extends Ci{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),s=new ut;s.setIndex(new Ut(n,1)),s.setAttribute("position",new Ut(i,3)),super(s,new Cn({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&bo.setFromObject(this.object),bo.isEmpty())return;const e=bo.min,t=bo.max,n=this.geometry.attributes.position,i=n.array;i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=e.x,i[4]=t.y,i[5]=t.z,i[6]=e.x,i[7]=e.y,i[8]=t.z,i[9]=t.x,i[10]=e.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=e.z,i[15]=e.x,i[16]=t.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=t.x,i[22]=e.y,i[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class m0 extends Ci{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new ut;s.setIndex(new Ut(n,1)),s.setAttribute("position",new Ge(i,3)),super(s,new Cn({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class g0 extends cs{constructor(e,t=1,n=16776960){const i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],a=new ut;a.setAttribute("position",new Ge(s,3)),a.computeBoundingSphere(),super(a,new Cn({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const o=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new ut;l.setAttribute("position",new Ge(o,3)),l.computeBoundingSphere(),this.add(new Lt(l,new an({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Oh=new I;let Mo,qc;class _0 extends St{constructor(e=new I(0,0,1),t=new I(0,0,0),n=1,i=16776960,s=n*.2,a=s*.2){super(),this.type="ArrowHelper",Mo===void 0&&(Mo=new ut,Mo.setAttribute("position",new Ge([0,0,0,0,1,0],3)),qc=new Vs(.5,1,5,1),qc.translate(0,-.5,0)),this.position.copy(t),this.line=new cs(Mo,new Cn({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Lt(qc,new an({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,s,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Oh.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Oh,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class v0 extends Ci{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new ut;i.setAttribute("position",new Ge(t,3)),i.setAttribute("color",new Ge(n,3));const s=new Cn({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){const i=new Fe,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class x0{constructor(){this.type="ShapePath",this.color=new Fe,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new wl,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,s,a){return this.currentPath.bezierCurveTo(e,t,n,i,s,a),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(m){const v=[];for(let x=0,y=m.length;x<y;x++){const S=m[x],M=new Us;M.curves=S.curves,v.push(M)}return v}function n(m,v){const x=v.length;let y=!1;for(let S=x-1,M=0;M<x;S=M++){let C=v[S],b=v[M],T=b.x-C.x,P=b.y-C.y;if(Math.abs(P)>Number.EPSILON){if(P<0&&(C=v[M],T=-T,b=v[S],P=-P),m.y<C.y||m.y>b.y)continue;if(m.y===C.y){if(m.x===C.x)return!0}else{const L=P*(m.x-C.x)-T*(m.y-C.y);if(L===0)return!0;if(L<0)continue;y=!y}}else{if(m.y!==C.y)continue;if(b.x<=m.x&&m.x<=C.x||C.x<=m.x&&m.x<=b.x)return!0}}return y}const i=ai.isClockWise,s=this.subPaths;if(s.length===0)return[];let a,o,l;const c=[];if(s.length===1)return o=s[0],l=new Us,l.curves=o.curves,c.push(l),c;let u=!i(s[0].getPoints());u=e?!u:u;const d=[],h=[];let f=[],p=0,_;h[p]=void 0,f[p]=[];for(let m=0,v=s.length;m<v;m++)o=s[m],_=o.getPoints(),a=i(_),a=e?!a:a,a?(!u&&h[p]&&p++,h[p]={s:new Us,p:_},h[p].s.curves=o.curves,u&&p++,f[p]=[]):f[p].push({h:o,p:_[0]});if(!h[0])return t(s);if(h.length>1){let m=!1,v=0;for(let x=0,y=h.length;x<y;x++)d[x]=[];for(let x=0,y=h.length;x<y;x++){const S=f[x];for(let M=0;M<S.length;M++){const C=S[M];let b=!0;for(let T=0;T<h.length;T++)n(C.p,h[T].p)&&(x!==T&&v++,b?(b=!1,d[T].push(C)):m=!0);b&&d[x].push(C)}}v>0&&m===!1&&(f=d)}let g;for(let m=0,v=h.length;m<v;m++){l=h[m].s,c.push(l),g=f[m];for(let x=0,y=g.length;x<y;x++)l.holes.push(g[x].h)}return c}}class y0 extends ui{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Re("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function b0(r,e){const t=r.image&&r.image.width?r.image.width/r.image.height:1;return t>e?(r.repeat.x=1,r.repeat.y=t/e,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2):(r.repeat.x=e/t,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0),r}function M0(r,e){const t=r.image&&r.image.width?r.image.width/r.image.height:1;return t>e?(r.repeat.x=e/t,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0):(r.repeat.x=1,r.repeat.y=t/e,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2),r}function S0(r){return r.repeat.x=1,r.repeat.y=1,r.offset.x=0,r.offset.y=0,r}function Mu(r,e,t,n){const i=w0(n);switch(t){case Vu:return r*e;case Ll:return r*e/i.components*i.byteLength;case Ta:return r*e/i.components*i.byteLength;case os:return r*e*2/i.components*i.byteLength;case Dl:return r*e*2/i.components*i.byteLength;case Gu:return r*e*3/i.components*i.byteLength;case Tn:return r*e*4/i.components*i.byteLength;case Ul:return r*e*4/i.components*i.byteLength;case Qr:case ea:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case ta:case na:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ho:case Xo:return Math.max(r,16)*Math.max(e,8)/4;case Go:case Wo:return Math.max(r,8)*Math.max(e,8)/2;case $o:case qo:case Zo:case Ko:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Yo:case la:case Jo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case jo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Qo:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case el:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case tl:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case nl:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case il:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case sl:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case rl:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case al:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case ol:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case ll:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case cl:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case ul:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case dl:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case hl:case fl:case pl:return Math.ceil(r/4)*Math.ceil(e/4)*16;case ml:case gl:return Math.ceil(r/4)*Math.ceil(e/4)*8;case ca:case _l:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function w0(r){switch(r){case Ln:case Ou:return{byteLength:1,components:1};case xr:case ku:case Ti:return{byteLength:2,components:1};case Il:case Pl:return{byteLength:2,components:4};case Kn:case Rl:case En:return{byteLength:4,components:1};case Bu:case zu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}class E0{static contain(e,t){return b0(e,t)}static cover(e,t){return M0(e,t)}static fill(e){return S0(e)}static getByteLength(e,t,n,i){return Mu(e,t,n,i)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Al}}));typeof window<"u"&&(window.__THREE__?Re("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Al);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function om(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function T0(r){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,h=r.createBuffer();r.bindBuffer(l,h),r.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,o),d.length===0)r.bufferSubData(c,0,u);else{d.sort((f,p)=>f.start-p.start);let h=0;for(let f=1;f<d.length;f++){const p=d[h],_=d[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++h,d[h]=_)}d.length=h+1;for(let f=0,p=d.length;f<p;f++){const _=d[f];r.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var A0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,C0=`#ifdef USE_ALPHAHASH
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
#endif`,R0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,I0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,P0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,L0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,D0=`#ifdef USE_AOMAP
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
#endif`,U0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,N0=`#ifdef USE_BATCHING
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
#endif`,F0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,O0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,k0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,B0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,z0=`#ifdef USE_IRIDESCENCE
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
#endif`,V0=`#ifdef USE_BUMPMAP
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
#endif`,G0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,H0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,W0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,X0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,q0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Y0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Z0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,K0=`#define PI 3.141592653589793
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
} // validated`,J0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,j0=`vec3 transformedNormal = objectNormal;
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
#endif`,Q0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ex=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,tx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,nx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ix="gl_FragColor = linearToOutputTexel( gl_FragColor );",sx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rx=`#ifdef USE_ENVMAP
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
#endif`,ax=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ox=`#ifdef USE_ENVMAP
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
#endif`,lx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cx=`#ifdef USE_ENVMAP
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
#endif`,ux=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,px=`#ifdef USE_GRADIENTMAP
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
}`,mx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_x=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vx=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,xx=`#ifdef USE_ENVMAP
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
#endif`,yx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wx=`PhysicalMaterial material;
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
#endif`,Ex=`uniform sampler2D dfgLUT;
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
}`,Tx=`
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
#endif`,Ax=`#if defined( RE_IndirectDiffuse )
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
#endif`,Cx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rx=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Ix=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Px=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ux=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Nx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Fx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ox=`#if defined( USE_POINTS_UV )
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
#endif`,kx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Vx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hx=`#ifdef USE_MORPHTARGETS
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
#endif`,Wx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,$x=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,qx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kx=`#ifdef USE_NORMALMAP
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
#endif`,Jx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ey=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ty=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ny=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,iy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ry=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ay=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,oy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ly=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,uy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,hy=`float getShadowMask() {
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
}`,fy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,py=`#ifdef USE_SKINNING
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
#endif`,my=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gy=`#ifdef USE_SKINNING
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
#endif`,_y=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,by=`#ifdef USE_TRANSMISSION
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
#endif`,My=`#ifdef USE_TRANSMISSION
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
#endif`,Sy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ey=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ty=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ay=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cy=`uniform sampler2D t2D;
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
}`,Ry=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Iy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Py=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ly=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dy=`#include <common>
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
}`,Uy=`#if DEPTH_PACKING == 3200
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
}`,Ny=`#define DISTANCE
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
}`,Fy=`#define DISTANCE
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
}`,Oy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ky=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,By=`uniform float scale;
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
}`,zy=`uniform vec3 diffuse;
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
}`,Vy=`#include <common>
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
}`,Gy=`uniform vec3 diffuse;
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
}`,Hy=`#define LAMBERT
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
}`,Wy=`#define LAMBERT
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
}`,Xy=`#define MATCAP
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
}`,$y=`#define MATCAP
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
}`,qy=`#define NORMAL
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
}`,Yy=`#define NORMAL
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
}`,Zy=`#define PHONG
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
}`,Ky=`#define PHONG
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
}`,Jy=`#define STANDARD
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
}`,jy=`#define STANDARD
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
}`,Qy=`#define TOON
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
}`,eb=`#define TOON
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
}`,tb=`uniform float size;
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
}`,nb=`uniform vec3 diffuse;
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
}`,ib=`#include <common>
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
}`,sb=`uniform vec3 color;
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
}`,rb=`uniform float rotation;
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
}`,ab=`uniform vec3 diffuse;
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
}`,mt={alphahash_fragment:A0,alphahash_pars_fragment:C0,alphamap_fragment:R0,alphamap_pars_fragment:I0,alphatest_fragment:P0,alphatest_pars_fragment:L0,aomap_fragment:D0,aomap_pars_fragment:U0,batching_pars_vertex:N0,batching_vertex:F0,begin_vertex:O0,beginnormal_vertex:k0,bsdfs:B0,iridescence_fragment:z0,bumpmap_pars_fragment:V0,clipping_planes_fragment:G0,clipping_planes_pars_fragment:H0,clipping_planes_pars_vertex:W0,clipping_planes_vertex:X0,color_fragment:$0,color_pars_fragment:q0,color_pars_vertex:Y0,color_vertex:Z0,common:K0,cube_uv_reflection_fragment:J0,defaultnormal_vertex:j0,displacementmap_pars_vertex:Q0,displacementmap_vertex:ex,emissivemap_fragment:tx,emissivemap_pars_fragment:nx,colorspace_fragment:ix,colorspace_pars_fragment:sx,envmap_fragment:rx,envmap_common_pars_fragment:ax,envmap_pars_fragment:ox,envmap_pars_vertex:lx,envmap_physical_pars_fragment:xx,envmap_vertex:cx,fog_vertex:ux,fog_pars_vertex:dx,fog_fragment:hx,fog_pars_fragment:fx,gradientmap_pars_fragment:px,lightmap_pars_fragment:mx,lights_lambert_fragment:gx,lights_lambert_pars_fragment:_x,lights_pars_begin:vx,lights_toon_fragment:yx,lights_toon_pars_fragment:bx,lights_phong_fragment:Mx,lights_phong_pars_fragment:Sx,lights_physical_fragment:wx,lights_physical_pars_fragment:Ex,lights_fragment_begin:Tx,lights_fragment_maps:Ax,lights_fragment_end:Cx,lightprobes_pars_fragment:Rx,logdepthbuf_fragment:Ix,logdepthbuf_pars_fragment:Px,logdepthbuf_pars_vertex:Lx,logdepthbuf_vertex:Dx,map_fragment:Ux,map_pars_fragment:Nx,map_particle_fragment:Fx,map_particle_pars_fragment:Ox,metalnessmap_fragment:kx,metalnessmap_pars_fragment:Bx,morphinstance_vertex:zx,morphcolor_vertex:Vx,morphnormal_vertex:Gx,morphtarget_pars_vertex:Hx,morphtarget_vertex:Wx,normal_fragment_begin:Xx,normal_fragment_maps:$x,normal_pars_fragment:qx,normal_pars_vertex:Yx,normal_vertex:Zx,normalmap_pars_fragment:Kx,clearcoat_normal_fragment_begin:Jx,clearcoat_normal_fragment_maps:jx,clearcoat_pars_fragment:Qx,iridescence_pars_fragment:ey,opaque_fragment:ty,packing:ny,premultiplied_alpha_fragment:iy,project_vertex:sy,dithering_fragment:ry,dithering_pars_fragment:ay,roughnessmap_fragment:oy,roughnessmap_pars_fragment:ly,shadowmap_pars_fragment:cy,shadowmap_pars_vertex:uy,shadowmap_vertex:dy,shadowmask_pars_fragment:hy,skinbase_vertex:fy,skinning_pars_vertex:py,skinning_vertex:my,skinnormal_vertex:gy,specularmap_fragment:_y,specularmap_pars_fragment:vy,tonemapping_fragment:xy,tonemapping_pars_fragment:yy,transmission_fragment:by,transmission_pars_fragment:My,uv_pars_fragment:Sy,uv_pars_vertex:wy,uv_vertex:Ey,worldpos_vertex:Ty,background_vert:Ay,background_frag:Cy,backgroundCube_vert:Ry,backgroundCube_frag:Iy,cube_vert:Py,cube_frag:Ly,depth_vert:Dy,depth_frag:Uy,distance_vert:Ny,distance_frag:Fy,equirect_vert:Oy,equirect_frag:ky,linedashed_vert:By,linedashed_frag:zy,meshbasic_vert:Vy,meshbasic_frag:Gy,meshlambert_vert:Hy,meshlambert_frag:Wy,meshmatcap_vert:Xy,meshmatcap_frag:$y,meshnormal_vert:qy,meshnormal_frag:Yy,meshphong_vert:Zy,meshphong_frag:Ky,meshphysical_vert:Jy,meshphysical_frag:jy,meshtoon_vert:Qy,meshtoon_frag:eb,points_vert:tb,points_frag:nb,shadow_vert:ib,shadow_frag:sb,sprite_vert:rb,sprite_frag:ab},Pe={common:{diffuse:{value:new Fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new Fe(16777215)},opacity:{value:1},center:{value:new ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},Sn={basic:{uniforms:Mn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:mt.meshbasic_vert,fragmentShader:mt.meshbasic_frag},lambert:{uniforms:Mn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new Fe(0)},envMapIntensity:{value:1}}]),vertexShader:mt.meshlambert_vert,fragmentShader:mt.meshlambert_frag},phong:{uniforms:Mn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new Fe(0)},specular:{value:new Fe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:mt.meshphong_vert,fragmentShader:mt.meshphong_frag},standard:{uniforms:Mn([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new Fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag},toon:{uniforms:Mn([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new Fe(0)}}]),vertexShader:mt.meshtoon_vert,fragmentShader:mt.meshtoon_frag},matcap:{uniforms:Mn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:mt.meshmatcap_vert,fragmentShader:mt.meshmatcap_frag},points:{uniforms:Mn([Pe.points,Pe.fog]),vertexShader:mt.points_vert,fragmentShader:mt.points_frag},dashed:{uniforms:Mn([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:mt.linedashed_vert,fragmentShader:mt.linedashed_frag},depth:{uniforms:Mn([Pe.common,Pe.displacementmap]),vertexShader:mt.depth_vert,fragmentShader:mt.depth_frag},normal:{uniforms:Mn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:mt.meshnormal_vert,fragmentShader:mt.meshnormal_frag},sprite:{uniforms:Mn([Pe.sprite,Pe.fog]),vertexShader:mt.sprite_vert,fragmentShader:mt.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:mt.background_vert,fragmentShader:mt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:mt.backgroundCube_vert,fragmentShader:mt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:mt.cube_vert,fragmentShader:mt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:mt.equirect_vert,fragmentShader:mt.equirect_frag},distance:{uniforms:Mn([Pe.common,Pe.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:mt.distance_vert,fragmentShader:mt.distance_frag},shadow:{uniforms:Mn([Pe.lights,Pe.fog,{color:{value:new Fe(0)},opacity:{value:1}}]),vertexShader:mt.shadow_vert,fragmentShader:mt.shadow_frag}};Sn.physical={uniforms:Mn([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new Fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new Fe(0)},specularColor:{value:new Fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag};const So={r:0,b:0,g:0},ob=new rt,lm=new ct;lm.set(-1,0,0,0,1,0,0,0,1);function lb(r,e,t,n,i,s){const a=new Fe(0);let o=i===!0?0:1,l,c,u=null,d=0,h=null;function f(v){let x=v.isScene===!0?v.background:null;if(x&&x.isTexture){const y=v.backgroundBlurriness>0;x=e.get(x,y)}return x}function p(v){let x=!1;const y=f(v);y===null?g(a,o):y&&y.isColor&&(g(y,1),x=!0);const S=r.xr.getEnvironmentBlendMode();S==="additive"?t.buffers.color.setClear(0,0,0,1,s):S==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||x)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function _(v,x){const y=f(x);y&&(y.isCubeTexture||y.mapping===Er)?(c===void 0&&(c=new Lt(new ds(1,1,1),new qn({name:"BackgroundCubeMaterial",uniforms:wr(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,M,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(ob.makeRotationFromEuler(x.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(lm),c.material.toneMapped=xt.getTransfer(y.colorSpace)!==Rt,(u!==y||d!==y.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,h=r.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Lt(new Rr(2,2),new qn({name:"BackgroundMaterial",uniforms:wr(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:Bi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=xt.getTransfer(y.colorSpace)!==Rt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||h!==r.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,h=r.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function g(v,x){v.getRGB(So,Pp(r)),t.buffers.color.setClear(So.r,So.g,So.b,x,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),o=x,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(a,o)},render:p,addToRenderList:_,dispose:m}}function cb(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=h(null);let s=i,a=!1;function o(L,B,Q,J,z){let Y=!1;const K=d(L,J,Q,B);s!==K&&(s=K,c(s.object)),Y=f(L,J,Q,z),Y&&p(L,J,Q,z),z!==null&&e.update(z,r.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,y(L,B,Q,J),z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return r.createVertexArray()}function c(L){return r.bindVertexArray(L)}function u(L){return r.deleteVertexArray(L)}function d(L,B,Q,J){const z=J.wireframe===!0;let Y=n[B.id];Y===void 0&&(Y={},n[B.id]=Y);const K=L.isInstancedMesh===!0?L.id:0;let de=Y[K];de===void 0&&(de={},Y[K]=de);let pe=de[Q.id];pe===void 0&&(pe={},de[Q.id]=pe);let ve=pe[z];return ve===void 0&&(ve=h(l()),pe[z]=ve),ve}function h(L){const B=[],Q=[],J=[];for(let z=0;z<t;z++)B[z]=0,Q[z]=0,J[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:Q,attributeDivisors:J,object:L,attributes:{},index:null}}function f(L,B,Q,J){const z=s.attributes,Y=B.attributes;let K=0;const de=Q.getAttributes();for(const pe in de)if(de[pe].location>=0){const Ce=z[pe];let Be=Y[pe];if(Be===void 0&&(pe==="instanceMatrix"&&L.instanceMatrix&&(Be=L.instanceMatrix),pe==="instanceColor"&&L.instanceColor&&(Be=L.instanceColor)),Ce===void 0||Ce.attribute!==Be||Be&&Ce.data!==Be.data)return!0;K++}return s.attributesNum!==K||s.index!==J}function p(L,B,Q,J){const z={},Y=B.attributes;let K=0;const de=Q.getAttributes();for(const pe in de)if(de[pe].location>=0){let Ce=Y[pe];Ce===void 0&&(pe==="instanceMatrix"&&L.instanceMatrix&&(Ce=L.instanceMatrix),pe==="instanceColor"&&L.instanceColor&&(Ce=L.instanceColor));const Be={};Be.attribute=Ce,Ce&&Ce.data&&(Be.data=Ce.data),z[pe]=Be,K++}s.attributes=z,s.attributesNum=K,s.index=J}function _(){const L=s.newAttributes;for(let B=0,Q=L.length;B<Q;B++)L[B]=0}function g(L){m(L,0)}function m(L,B){const Q=s.newAttributes,J=s.enabledAttributes,z=s.attributeDivisors;Q[L]=1,J[L]===0&&(r.enableVertexAttribArray(L),J[L]=1),z[L]!==B&&(r.vertexAttribDivisor(L,B),z[L]=B)}function v(){const L=s.newAttributes,B=s.enabledAttributes;for(let Q=0,J=B.length;Q<J;Q++)B[Q]!==L[Q]&&(r.disableVertexAttribArray(Q),B[Q]=0)}function x(L,B,Q,J,z,Y,K){K===!0?r.vertexAttribIPointer(L,B,Q,z,Y):r.vertexAttribPointer(L,B,Q,J,z,Y)}function y(L,B,Q,J){_();const z=J.attributes,Y=Q.getAttributes(),K=B.defaultAttributeValues;for(const de in Y){const pe=Y[de];if(pe.location>=0){let ve=z[de];if(ve===void 0&&(de==="instanceMatrix"&&L.instanceMatrix&&(ve=L.instanceMatrix),de==="instanceColor"&&L.instanceColor&&(ve=L.instanceColor)),ve!==void 0){const Ce=ve.normalized,Be=ve.itemSize,st=e.get(ve);if(st===void 0)continue;const dt=st.buffer,tt=st.type,H=st.bytesPerElement,ae=tt===r.INT||tt===r.UNSIGNED_INT||ve.gpuType===Rl;if(ve.isInterleavedBufferAttribute){const ue=ve.data,ye=ue.stride,$=ve.offset;if(ue.isInstancedInterleavedBuffer){for(let D=0;D<pe.locationSize;D++)m(pe.location+D,ue.meshPerAttribute);L.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let D=0;D<pe.locationSize;D++)g(pe.location+D);r.bindBuffer(r.ARRAY_BUFFER,dt);for(let D=0;D<pe.locationSize;D++)x(pe.location+D,Be/pe.locationSize,tt,Ce,ye*H,($+Be/pe.locationSize*D)*H,ae)}else{if(ve.isInstancedBufferAttribute){for(let ue=0;ue<pe.locationSize;ue++)m(pe.location+ue,ve.meshPerAttribute);L.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let ue=0;ue<pe.locationSize;ue++)g(pe.location+ue);r.bindBuffer(r.ARRAY_BUFFER,dt);for(let ue=0;ue<pe.locationSize;ue++)x(pe.location+ue,Be/pe.locationSize,tt,Ce,Be*H,Be/pe.locationSize*ue*H,ae)}}else if(K!==void 0){const Ce=K[de];if(Ce!==void 0)switch(Ce.length){case 2:r.vertexAttrib2fv(pe.location,Ce);break;case 3:r.vertexAttrib3fv(pe.location,Ce);break;case 4:r.vertexAttrib4fv(pe.location,Ce);break;default:r.vertexAttrib1fv(pe.location,Ce)}}}}v()}function S(){T();for(const L in n){const B=n[L];for(const Q in B){const J=B[Q];for(const z in J){const Y=J[z];for(const K in Y)u(Y[K].object),delete Y[K];delete J[z]}}delete n[L]}}function M(L){if(n[L.id]===void 0)return;const B=n[L.id];for(const Q in B){const J=B[Q];for(const z in J){const Y=J[z];for(const K in Y)u(Y[K].object),delete Y[K];delete J[z]}}delete n[L.id]}function C(L){for(const B in n){const Q=n[B];for(const J in Q){const z=Q[J];if(z[L.id]===void 0)continue;const Y=z[L.id];for(const K in Y)u(Y[K].object),delete Y[K];delete z[L.id]}}}function b(L){for(const B in n){const Q=n[B],J=L.isInstancedMesh===!0?L.id:0,z=Q[J];if(z!==void 0){for(const Y in z){const K=z[Y];for(const de in K)u(K[de].object),delete K[de];delete z[Y]}delete Q[J],Object.keys(Q).length===0&&delete n[B]}}}function T(){P(),a=!0,s!==i&&(s=i,c(s.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:S,releaseStatesOfGeometry:M,releaseStatesOfObject:b,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function ub(r,e,t){let n;function i(l){n=l}function s(l,c){r.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(r.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let f=0;f<u;f++)h+=c[f];t.update(h,n,1)}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function db(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==Tn&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const b=C===Ti&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Ln&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==En&&!b)}function l(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Re("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Re("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),S=r.getParameter(r.MAX_SAMPLES),M=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:x,maxFragmentUniforms:y,maxSamples:S,samples:M}}function hb(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new ts,o=new ct,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||n!==0||i;return i=h,n=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const p=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,m=r.get(d);if(!i||p===null||p.length===0||s&&!g)s?u(null):c();else{const v=s?0:n,x=v*4;let y=m.clippingState||null;l.value=y,y=u(p,h,x,f);for(let S=0;S!==x;++S)y[S]=t[S];m.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,p){const _=d!==null?d.length:0;let g=null;if(_!==0){if(g=l.value,p!==!0||g===null){const m=f+_*4,v=h.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let x=0,y=f;x!==_;++x,y+=4)a.copy(d[x]).applyMatrix4(v,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}const rs=4,kh=[.125,.215,.35,.446,.526,.582],As=20,fb=256,Wr=new Pa,Bh=new Fe;let Yc=null,Zc=0,Kc=0,Jc=!1;const pb=new I;class Su{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:a=256,position:o=pb}=s;Yc=this._renderer.getRenderTarget(),Zc=this._renderer.getActiveCubeFace(),Kc=this._renderer.getActiveMipmapLevel(),Jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Yc,Zc,Kc),this._renderer.xr.enabled=Jc,e.scissorTest=!1,hr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ei||e.mapping===as?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Yc=this._renderer.getRenderTarget(),Zc=this._renderer.getActiveCubeFace(),Kc=this._renderer.getActiveMipmapLevel(),Jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:Ti,format:Tn,colorSpace:ha,depthBuffer:!1},i=zh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zh(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=mb(s)),this._blurMaterial=_b(s,e,t),this._ggxMaterial=gb(s,e,t)}return i}_compileMaterial(e){const t=new Lt(new ut,e);this._renderer.compile(t,Wr)}_sceneToCubeUV(e,t,n,i,s){const l=new on(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Bh),d.toneMapping=oi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Lt(new ds,new an({name:"PMREM.Background",side:An,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let m=!1;const v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,m=!0):(g.color.copy(Bh),m=!0);for(let x=0;x<6;x++){const y=x%3;y===0?(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[x],s.y,s.z)):y===1?(l.up.set(0,0,c[x]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[x],s.z)):(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[x]));const S=this._cubeSize;hr(i,y*S,x>2?S:0,S,S),d.setRenderTarget(i),m&&d.render(_,l),d.render(e,l)}d.toneMapping=f,d.autoClear=h,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ei||e.mapping===as;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vh());const s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;hr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Wr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=0+c*1.25,f=d*h,{_lodMax:p}=this,_=this._sizeLods[n],g=3*_*(n>p-rs?n-p+rs:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,hr(s,g,m,3*_,2*_),i.setRenderTarget(s),i.render(o,Wr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-n,hr(e,g,m,3*_,2*_),i.setRenderTarget(e),i.render(o,Wr)}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ye("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[i];d.material=c;const h=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*As-1),_=s/p,g=isFinite(s)?1+Math.floor(u*_):As;g>As&&Re(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${As}`);const m=[];let v=0;for(let C=0;C<As;++C){const b=C/_,T=Math.exp(-b*b/2);m.push(T),C===0?v+=T:C<g&&(v+=2*T)}for(let C=0;C<m.length;C++)m[C]=m[C]/v;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:x}=this;h.dTheta.value=p,h.mipInt.value=x-n;const y=this._sizeLods[i],S=3*y*(i>x-rs?i-x+rs:0),M=4*(this._cubeSize-y);hr(t,S,M,3*y,2*y),l.setRenderTarget(t),l.render(d,Wr)}}function mb(r){const e=[],t=[],n=[];let i=r;const s=r-rs+1+kh.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>r-rs?l=kh[a-r+rs-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,p=6,_=3,g=2,m=1,v=new Float32Array(_*p*f),x=new Float32Array(g*p*f),y=new Float32Array(m*p*f);for(let M=0;M<f;M++){const C=M%3*2/3-1,b=M>2?0:-1,T=[C,b,0,C+2/3,b,0,C+2/3,b+1,0,C,b,0,C+2/3,b+1,0,C,b+1,0];v.set(T,_*p*M),x.set(h,g*p*M);const P=[M,M,M,M,M,M];y.set(P,m*p*M)}const S=new ut;S.setAttribute("position",new Ut(v,_)),S.setAttribute("uv",new Ut(x,g)),S.setAttribute("faceIndex",new Ut(y,m)),n.push(new Lt(S,null)),i>rs&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function zh(r,e,t){const n=new $n(r,e,t);return n.texture.mapping=Er,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function hr(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function gb(r,e,t){return new qn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:fb,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:oc(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function _b(r,e,t){const n=new Float32Array(As),i=new I(0,1,0);return new qn({name:"SphericalGaussianBlur",defines:{n:As,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:oc(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Vh(){return new qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oc(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Gh(){return new qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function oc(){return`

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
	`}class bd extends $n{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Aa(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ds(5,5,5),s=new qn({name:"CubemapFromEquirect",uniforms:wr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:An,blending:wi});s.uniforms.tEquirect.value=t;const a=new Lt(i,s),o=t.minFilter;return t.minFilter===bi&&(t.minFilter=Bt),new Qp(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}function vb(r){let e=new WeakMap,t=new WeakMap,n=null;function i(h,f=!1){return h==null?null:f?a(h):s(h)}function s(h){if(h&&h.isTexture){const f=h.mapping;if(f===Kr||f===Jr)if(e.has(h)){const p=e.get(h).texture;return o(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const _=new bd(p.height);return _.fromEquirectangularTexture(r,h),e.set(h,_),h.addEventListener("dispose",c),o(_.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const f=h.mapping,p=f===Kr||f===Jr,_=f===Ei||f===as;if(p||_){let g=t.get(h);const m=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return n===null&&(n=new Su(r)),g=p?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{const v=h.image;return p&&v&&v.height>0||_&&v&&l(v)?(n===null&&(n=new Su(r)),g=p?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,f){return f===Kr?h.mapping=Ei:f===Jr&&(h.mapping=as),h}function l(h){let f=0;const p=6;for(let _=0;_<p;_++)h[_]!==void 0&&f++;return f===p}function c(h){const f=h.target;f.removeEventListener("dispose",c);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function u(h){const f=h.target;f.removeEventListener("dispose",u);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function xb(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&xl("WebGLRenderer: "+n+" extension not supported."),i}}}function yb(r,e,t,n){const i={},s=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const p in h.attributes)e.remove(h.attributes[p]);h.removeEventListener("dispose",a),delete i[h.id];const f=s.get(h);f&&(e.remove(f),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return i[h.id]===!0||(h.addEventListener("dispose",a),i[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const f in h)e.update(h[f],r.ARRAY_BUFFER)}function c(d){const h=[],f=d.index,p=d.attributes.position;let _=0;if(p===void 0)return;if(f!==null){const v=f.array;_=f.version;for(let x=0,y=v.length;x<y;x+=3){const S=v[x+0],M=v[x+1],C=v[x+2];h.push(S,M,M,C,C,S)}}else{const v=p.array;_=p.version;for(let x=0,y=v.length/3-1;x<y;x+=3){const S=x+0,M=x+1,C=x+2;h.push(S,M,M,C,C,S)}}const g=new(p.count>=65535?Yu:qu)(h,1);g.version=_;const m=s.get(d);m&&e.remove(m),s.set(d,g)}function u(d){const h=s.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function bb(r,e,t){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,h){r.drawElements(n,h,s,d*a),t.update(h,n,1)}function c(d,h,f){f!==0&&(r.drawElementsInstanced(n,h,s,d*a,f),t.update(h,n,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,d,0,f);let _=0;for(let g=0;g<f;g++)_+=h[g];t.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Mb(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:Ye("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Sb(r,e,t){const n=new WeakMap,i=new Mt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let T=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();const f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let x=0;f===!0&&(x=1),p===!0&&(x=2),_===!0&&(x=3);let y=o.attributes.position.count*x,S=1;y>e.maxTextureSize&&(S=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const M=new Float32Array(y*S*4*d),C=new kl(M,y,S,d);C.type=En,C.needsUpdate=!0;const b=x*4;for(let P=0;P<d;P++){const L=g[P],B=m[P],Q=v[P],J=y*S*4*P;for(let z=0;z<L.count;z++){const Y=z*b;f===!0&&(i.fromBufferAttribute(L,z),M[J+Y+0]=i.x,M[J+Y+1]=i.y,M[J+Y+2]=i.z,M[J+Y+3]=0),p===!0&&(i.fromBufferAttribute(B,z),M[J+Y+4]=i.x,M[J+Y+5]=i.y,M[J+Y+6]=i.z,M[J+Y+7]=0),_===!0&&(i.fromBufferAttribute(Q,z),M[J+Y+8]=i.x,M[J+Y+9]=i.y,M[J+Y+10]=i.z,M[J+Y+11]=Q.itemSize===4?i.w:1)}}h={count:d,texture:C,size:new ge(y,S)},n.set(o,h),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",p),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",h.size)}return{update:s}}function wb(r,e,t,n,i){let s=new WeakMap;function a(c){const u=i.render.frame,d=c.geometry,h=e.get(c,d);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return h}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const Eb={[Ru]:"LINEAR_TONE_MAPPING",[Iu]:"REINHARD_TONE_MAPPING",[Pu]:"CINEON_TONE_MAPPING",[Lu]:"ACES_FILMIC_TONE_MAPPING",[Uu]:"AGX_TONE_MAPPING",[Nu]:"NEUTRAL_TONE_MAPPING",[Du]:"CUSTOM_TONE_MAPPING"};function Tb(r,e,t,n,i){const s=new $n(e,t,{type:r,depthBuffer:n,stencilBuffer:i,depthTexture:n?new ks(e,t):void 0}),a=new $n(e,t,{type:Ti,depthBuffer:!1,stencilBuffer:!1}),o=new ut;o.setAttribute("position",new Ge([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Ge([0,2,0,0,2,0],2));const l=new ad({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new Lt(o,l),u=new Pa(-1,1,1,-1,0,1);let d=null,h=null,f=!1,p,_=null,g=[],m=!1;this.setSize=function(v,x){s.setSize(v,x),a.setSize(v,x);for(let y=0;y<g.length;y++){const S=g[y];S.setSize&&S.setSize(v,x)}},this.setEffects=function(v){g=v,m=g.length>0&&g[0].isRenderPass===!0;const x=s.width,y=s.height;for(let S=0;S<g.length;S++){const M=g[S];M.setSize&&M.setSize(x,y)}},this.begin=function(v,x){if(f||v.toneMapping===oi&&g.length===0)return!1;if(_=x,x!==null){const y=x.width,S=x.height;(s.width!==y||s.height!==S)&&this.setSize(y,S)}return m===!1&&v.setRenderTarget(s),p=v.toneMapping,v.toneMapping=oi,!0},this.hasRenderPass=function(){return m},this.end=function(v,x){v.toneMapping=p,f=!0;let y=s,S=a;for(let M=0;M<g.length;M++){const C=g[M];if(C.enabled!==!1&&(C.render(v,S,y,x),C.needsSwap!==!1)){const b=y;y=S,S=b}}if(d!==v.outputColorSpace||h!==v.toneMapping){d=v.outputColorSpace,h=v.toneMapping,l.defines={},xt.getTransfer(d)===Rt&&(l.defines.SRGB_TRANSFER="");const M=Eb[h];M&&(l.defines[M]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,v.setRenderTarget(_),v.render(c,u),_=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const cm=new Vt,wu=new ks(1,1),um=new kl,dm=new Bl,hm=new Aa,Hh=[],Wh=[],Xh=new Float32Array(16),$h=new Float32Array(9),qh=new Float32Array(4);function Pr(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Hh[i];if(s===void 0&&(s=new Float32Array(i),Hh[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function tn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function nn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function lc(r,e){let t=Wh[e];t===void 0&&(t=new Int32Array(e),Wh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Ab(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Cb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;r.uniform2fv(this.addr,e),nn(t,e)}}function Rb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(tn(t,e))return;r.uniform3fv(this.addr,e),nn(t,e)}}function Ib(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;r.uniform4fv(this.addr,e),nn(t,e)}}function Pb(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;qh.set(n),r.uniformMatrix2fv(this.addr,!1,qh),nn(t,n)}}function Lb(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;$h.set(n),r.uniformMatrix3fv(this.addr,!1,$h),nn(t,n)}}function Db(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;Xh.set(n),r.uniformMatrix4fv(this.addr,!1,Xh),nn(t,n)}}function Ub(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Nb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;r.uniform2iv(this.addr,e),nn(t,e)}}function Fb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;r.uniform3iv(this.addr,e),nn(t,e)}}function Ob(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;r.uniform4iv(this.addr,e),nn(t,e)}}function kb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Bb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;r.uniform2uiv(this.addr,e),nn(t,e)}}function zb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;r.uniform3uiv(this.addr,e),nn(t,e)}}function Vb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;r.uniform4uiv(this.addr,e),nn(t,e)}}function Gb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(wu.compareFunction=t.isReversedDepthBuffer()?Ol:Fl,s=wu):s=cm,t.setTexture2D(e||s,i)}function Hb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||dm,i)}function Wb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||hm,i)}function Xb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||um,i)}function $b(r){switch(r){case 5126:return Ab;case 35664:return Cb;case 35665:return Rb;case 35666:return Ib;case 35674:return Pb;case 35675:return Lb;case 35676:return Db;case 5124:case 35670:return Ub;case 35667:case 35671:return Nb;case 35668:case 35672:return Fb;case 35669:case 35673:return Ob;case 5125:return kb;case 36294:return Bb;case 36295:return zb;case 36296:return Vb;case 35678:case 36198:case 36298:case 36306:case 35682:return Gb;case 35679:case 36299:case 36307:return Hb;case 35680:case 36300:case 36308:case 36293:return Wb;case 36289:case 36303:case 36311:case 36292:return Xb}}function qb(r,e){r.uniform1fv(this.addr,e)}function Yb(r,e){const t=Pr(e,this.size,2);r.uniform2fv(this.addr,t)}function Zb(r,e){const t=Pr(e,this.size,3);r.uniform3fv(this.addr,t)}function Kb(r,e){const t=Pr(e,this.size,4);r.uniform4fv(this.addr,t)}function Jb(r,e){const t=Pr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function jb(r,e){const t=Pr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Qb(r,e){const t=Pr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function eM(r,e){r.uniform1iv(this.addr,e)}function tM(r,e){r.uniform2iv(this.addr,e)}function nM(r,e){r.uniform3iv(this.addr,e)}function iM(r,e){r.uniform4iv(this.addr,e)}function sM(r,e){r.uniform1uiv(this.addr,e)}function rM(r,e){r.uniform2uiv(this.addr,e)}function aM(r,e){r.uniform3uiv(this.addr,e)}function oM(r,e){r.uniform4uiv(this.addr,e)}function lM(r,e,t){const n=this.cache,i=e.length,s=lc(t,i);tn(n,s)||(r.uniform1iv(this.addr,s),nn(n,s));let a;this.type===r.SAMPLER_2D_SHADOW?a=wu:a=cm;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,s[o])}function cM(r,e,t){const n=this.cache,i=e.length,s=lc(t,i);tn(n,s)||(r.uniform1iv(this.addr,s),nn(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||dm,s[a])}function uM(r,e,t){const n=this.cache,i=e.length,s=lc(t,i);tn(n,s)||(r.uniform1iv(this.addr,s),nn(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||hm,s[a])}function dM(r,e,t){const n=this.cache,i=e.length,s=lc(t,i);tn(n,s)||(r.uniform1iv(this.addr,s),nn(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||um,s[a])}function hM(r){switch(r){case 5126:return qb;case 35664:return Yb;case 35665:return Zb;case 35666:return Kb;case 35674:return Jb;case 35675:return jb;case 35676:return Qb;case 5124:case 35670:return eM;case 35667:case 35671:return tM;case 35668:case 35672:return nM;case 35669:case 35673:return iM;case 5125:return sM;case 36294:return rM;case 36295:return aM;case 36296:return oM;case 35678:case 36198:case 36298:case 36306:case 35682:return lM;case 35679:case 36299:case 36307:return cM;case 35680:case 36300:case 36308:case 36293:return uM;case 36289:case 36303:case 36311:case 36292:return dM}}class fM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=$b(t.type)}}class pM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=hM(t.type)}}class mM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const jc=/(\w+)(\])?(\[|\.)?/g;function Yh(r,e){r.seq.push(e),r.map[e.id]=e}function gM(r,e,t){const n=r.name,i=n.length;for(jc.lastIndex=0;;){const s=jc.exec(n),a=jc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Yh(t,c===void 0?new fM(o,r,e):new pM(o,r,e));break}else{let d=t.map[o];d===void 0&&(d=new mM(o),Yh(t,d)),t=d}}}class Po{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);gM(o,l,this)}const i=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Zh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const _M=37297;let vM=0;function xM(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Kh=new ct;function yM(r){xt._getMatrix(Kh,xt.workingColorSpace,r);const e=`mat3( ${Kh.elements.map(t=>t.toFixed(4))} )`;switch(xt.getTransfer(r)){case fa:return[e,"LinearTransferOETF"];case Rt:return[e,"sRGBTransferOETF"];default:return Re("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Jh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+xM(r.getShaderSource(e),o)}else return s}function bM(r,e){const t=yM(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const MM={[Ru]:"Linear",[Iu]:"Reinhard",[Pu]:"Cineon",[Lu]:"ACESFilmic",[Uu]:"AgX",[Nu]:"Neutral",[Du]:"Custom"};function SM(r,e){const t=MM[e];return t===void 0?(Re("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const wo=new I;function wM(){xt.getLuminanceCoefficients(wo);const r=wo.x.toFixed(4),e=wo.y.toFixed(4),t=wo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function EM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yr).join(`
`)}function TM(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function AM(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function Yr(r){return r!==""}function jh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Qh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const CM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Eu(r){return r.replace(CM,IM)}const RM=new Map;function IM(r,e){let t=mt[e];if(t===void 0){const n=RM.get(e);if(n!==void 0)t=mt[n],Re('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Eu(t)}const PM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ef(r){return r.replace(PM,LM)}function LM(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function tf(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const DM={[Zr]:"SHADOWMAP_TYPE_PCF",[pr]:"SHADOWMAP_TYPE_VSM"};function UM(r){return DM[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const NM={[Ei]:"ENVMAP_TYPE_CUBE",[as]:"ENVMAP_TYPE_CUBE",[Er]:"ENVMAP_TYPE_CUBE_UV"};function FM(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":NM[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const OM={[as]:"ENVMAP_MODE_REFRACTION"};function kM(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":OM[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const BM={[Ea]:"ENVMAP_BLENDING_MULTIPLY",[Xf]:"ENVMAP_BLENDING_MIX",[$f]:"ENVMAP_BLENDING_ADD"};function zM(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":BM[r.combine]||"ENVMAP_BLENDING_NONE"}function VM(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function GM(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=UM(t),c=FM(t),u=kM(t),d=zM(t),h=VM(t),f=EM(t),p=TM(s),_=i.createProgram();let g,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Yr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Yr).join(`
`),m.length>0&&(m+=`
`)):(g=[tf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yr).join(`
`),m=[tf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==oi?"#define TONE_MAPPING":"",t.toneMapping!==oi?mt.tonemapping_pars_fragment:"",t.toneMapping!==oi?SM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",mt.colorspace_pars_fragment,bM("linearToOutputTexel",t.outputColorSpace),wM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Yr).join(`
`)),a=Eu(a),a=jh(a,t),a=Qh(a,t),o=Eu(o),o=jh(o,t),o=Qh(o,t),a=ef(a),o=ef(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===pu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===pu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=v+g+a,y=v+m+o,S=Zh(i,i.VERTEX_SHADER,x),M=Zh(i,i.FRAGMENT_SHADER,y);i.attachShader(_,S),i.attachShader(_,M),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(L){if(r.debug.checkShaderErrors){const B=i.getProgramInfoLog(_)||"",Q=i.getShaderInfoLog(S)||"",J=i.getShaderInfoLog(M)||"",z=B.trim(),Y=Q.trim(),K=J.trim();let de=!0,pe=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(de=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,S,M);else{const ve=Jh(i,S,"vertex"),Ce=Jh(i,M,"fragment");Ye("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+z+`
`+ve+`
`+Ce)}else z!==""?Re("WebGLProgram: Program Info Log:",z):(Y===""||K==="")&&(pe=!1);pe&&(L.diagnostics={runnable:de,programLog:z,vertexShader:{log:Y,prefix:g},fragmentShader:{log:K,prefix:m}})}i.deleteShader(S),i.deleteShader(M),b=new Po(i,_),T=AM(i,_)}let b;this.getUniforms=function(){return b===void 0&&C(this),b};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(_,_M)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=vM++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=M,this}let HM=0;class WM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new XM(e),t.set(e,n)),n}}class XM{constructor(e){this.id=HM++,this.code=e,this.usedTimes=0}}function $M(r){return r===os||r===la||r===ca}function qM(r,e,t,n,i,s){const a=new zl,o=new WM,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer;let h=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(b){return l.add(b),b===0?"uv":`uv${b}`}function _(b,T,P,L,B,Q){const J=L.fog,z=B.geometry,Y=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?L.environment:null,K=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,de=e.get(b.envMap||Y,K),pe=de&&de.mapping===Er?de.image.height:null,ve=f[b.type];b.precision!==null&&(h=n.getMaxPrecision(b.precision),h!==b.precision&&Re("WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));const Ce=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Be=Ce!==void 0?Ce.length:0;let st=0;z.morphAttributes.position!==void 0&&(st=1),z.morphAttributes.normal!==void 0&&(st=2),z.morphAttributes.color!==void 0&&(st=3);let dt,tt,H,ae;if(ve){const k=Sn[ve];dt=k.vertexShader,tt=k.fragmentShader}else dt=b.vertexShader,tt=b.fragmentShader,o.update(b),H=o.getVertexShaderID(b),ae=o.getFragmentShaderID(b);const ue=r.getRenderTarget(),ye=r.state.buffers.depth.getReversed(),$=B.isInstancedMesh===!0,D=B.isBatchedMesh===!0,U=!!b.map,O=!!b.matcap,j=!!de,q=!!b.aoMap,ne=!!b.lightMap,oe=!!b.bumpMap,me=!!b.normalMap,$e=!!b.displacementMap,F=!!b.emissiveMap,it=!!b.metalnessMap,ze=!!b.roughnessMap,nt=b.anisotropy>0,Me=b.clearcoat>0,Tt=b.dispersion>0,R=b.iridescence>0,w=b.sheen>0,Z=b.transmission>0,ce=nt&&!!b.anisotropyMap,_e=Me&&!!b.clearcoatMap,be=Me&&!!b.clearcoatNormalMap,Se=Me&&!!b.clearcoatRoughnessMap,re=R&&!!b.iridescenceMap,he=R&&!!b.iridescenceThicknessMap,Ue=w&&!!b.sheenColorMap,Ve=w&&!!b.sheenRoughnessMap,Ae=!!b.specularMap,Ee=!!b.specularColorMap,lt=!!b.specularIntensityMap,ht=Z&&!!b.transmissionMap,bt=Z&&!!b.thicknessMap,V=!!b.gradientMap,we=!!b.alphaMap,le=b.alphaTest>0,Oe=!!b.alphaHash,Te=!!b.extensions;let xe=oi;b.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(xe=r.toneMapping);const N={shaderID:ve,shaderType:b.type,shaderName:b.name,vertexShader:dt,fragmentShader:tt,defines:b.defines,customVertexShaderID:H,customFragmentShaderID:ae,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:D,batchingColor:D&&B._colorsTexture!==null,instancing:$,instancingColor:$&&B.instanceColor!==null,instancingMorph:$&&B.morphTexture!==null,outputColorSpace:ue===null?r.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:xt.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:U,matcap:O,envMap:j,envMapMode:j&&de.mapping,envMapCubeUVHeight:pe,aoMap:q,lightMap:ne,bumpMap:oe,normalMap:me,displacementMap:$e,emissiveMap:F,normalMapObjectSpace:me&&b.normalMapType===jf,normalMapTangentSpace:me&&b.normalMapType===zi,packedNormalMap:me&&b.normalMapType===zi&&$M(b.normalMap.format),metalnessMap:it,roughnessMap:ze,anisotropy:nt,anisotropyMap:ce,clearcoat:Me,clearcoatMap:_e,clearcoatNormalMap:be,clearcoatRoughnessMap:Se,dispersion:Tt,iridescence:R,iridescenceMap:re,iridescenceThicknessMap:he,sheen:w,sheenColorMap:Ue,sheenRoughnessMap:Ve,specularMap:Ae,specularColorMap:Ee,specularIntensityMap:lt,transmission:Z,transmissionMap:ht,thicknessMap:bt,gradientMap:V,opaque:b.transparent===!1&&b.blending===Ls&&b.alphaToCoverage===!1,alphaMap:we,alphaTest:le,alphaHash:Oe,combine:b.combine,mapUv:U&&p(b.map.channel),aoMapUv:q&&p(b.aoMap.channel),lightMapUv:ne&&p(b.lightMap.channel),bumpMapUv:oe&&p(b.bumpMap.channel),normalMapUv:me&&p(b.normalMap.channel),displacementMapUv:$e&&p(b.displacementMap.channel),emissiveMapUv:F&&p(b.emissiveMap.channel),metalnessMapUv:it&&p(b.metalnessMap.channel),roughnessMapUv:ze&&p(b.roughnessMap.channel),anisotropyMapUv:ce&&p(b.anisotropyMap.channel),clearcoatMapUv:_e&&p(b.clearcoatMap.channel),clearcoatNormalMapUv:be&&p(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&p(b.clearcoatRoughnessMap.channel),iridescenceMapUv:re&&p(b.iridescenceMap.channel),iridescenceThicknessMapUv:he&&p(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ue&&p(b.sheenColorMap.channel),sheenRoughnessMapUv:Ve&&p(b.sheenRoughnessMap.channel),specularMapUv:Ae&&p(b.specularMap.channel),specularColorMapUv:Ee&&p(b.specularColorMap.channel),specularIntensityMapUv:lt&&p(b.specularIntensityMap.channel),transmissionMapUv:ht&&p(b.transmissionMap.channel),thicknessMapUv:bt&&p(b.thicknessMap.channel),alphaMapUv:we&&p(b.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(me||nt),vertexNormals:!!z.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!z.attributes.uv&&(U||we),fog:!!J,useFog:b.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||z.attributes.normal===void 0&&me===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ye,skinning:B.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Be,morphTextureStride:st,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:Q.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:xe,decodeVideoTexture:U&&b.map.isVideoTexture===!0&&xt.getTransfer(b.map.colorSpace)===Rt,decodeVideoTextureEmissive:F&&b.emissiveMap.isVideoTexture===!0&&xt.getTransfer(b.emissiveMap.colorSpace)===Rt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===xi,flipSided:b.side===An,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Te&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Te&&b.extensions.multiDraw===!0||D)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return N.vertexUv1s=l.has(1),N.vertexUv2s=l.has(2),N.vertexUv3s=l.has(3),l.clear(),N}function g(b){const T=[];if(b.shaderID?T.push(b.shaderID):(T.push(b.customVertexShaderID),T.push(b.customFragmentShaderID)),b.defines!==void 0)for(const P in b.defines)T.push(P),T.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(m(T,b),v(T,b),T.push(r.outputColorSpace)),T.push(b.customProgramCacheKey),T.join()}function m(b,T){b.push(T.precision),b.push(T.outputColorSpace),b.push(T.envMapMode),b.push(T.envMapCubeUVHeight),b.push(T.mapUv),b.push(T.alphaMapUv),b.push(T.lightMapUv),b.push(T.aoMapUv),b.push(T.bumpMapUv),b.push(T.normalMapUv),b.push(T.displacementMapUv),b.push(T.emissiveMapUv),b.push(T.metalnessMapUv),b.push(T.roughnessMapUv),b.push(T.anisotropyMapUv),b.push(T.clearcoatMapUv),b.push(T.clearcoatNormalMapUv),b.push(T.clearcoatRoughnessMapUv),b.push(T.iridescenceMapUv),b.push(T.iridescenceThicknessMapUv),b.push(T.sheenColorMapUv),b.push(T.sheenRoughnessMapUv),b.push(T.specularMapUv),b.push(T.specularColorMapUv),b.push(T.specularIntensityMapUv),b.push(T.transmissionMapUv),b.push(T.thicknessMapUv),b.push(T.combine),b.push(T.fogExp2),b.push(T.sizeAttenuation),b.push(T.morphTargetsCount),b.push(T.morphAttributeCount),b.push(T.numDirLights),b.push(T.numPointLights),b.push(T.numSpotLights),b.push(T.numSpotLightMaps),b.push(T.numHemiLights),b.push(T.numRectAreaLights),b.push(T.numDirLightShadows),b.push(T.numPointLightShadows),b.push(T.numSpotLightShadows),b.push(T.numSpotLightShadowsWithMaps),b.push(T.numLightProbes),b.push(T.shadowMapType),b.push(T.toneMapping),b.push(T.numClippingPlanes),b.push(T.numClipIntersection),b.push(T.depthPacking)}function v(b,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),b.push(a.mask)}function x(b){const T=f[b.type];let P;if(T){const L=Sn[T];P=sc.clone(L.uniforms)}else P=b.uniforms;return P}function y(b,T){let P=u.get(T);return P!==void 0?++P.usedTimes:(P=new GM(r,T,b,i),c.push(P),u.set(T,P)),P}function S(b){if(--b.usedTimes===0){const T=c.indexOf(b);c[T]=c[c.length-1],c.pop(),u.delete(b.cacheKey),b.destroy()}}function M(b){o.remove(b)}function C(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:x,acquireProgram:y,releaseProgram:S,releaseShaderCache:M,programs:c,dispose:C}}function YM(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function ZM(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function nf(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function sf(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,p,_,g,m){let v=r[e];return v===void 0?(v={id:h.id,object:h,geometry:f,material:p,materialVariant:a(h),groupOrder:_,renderOrder:h.renderOrder,z:g,group:m},r[e]=v):(v.id=h.id,v.object=h,v.geometry=f,v.material=p,v.materialVariant=a(h),v.groupOrder=_,v.renderOrder=h.renderOrder,v.z=g,v.group=m),e++,v}function l(h,f,p,_,g,m){const v=o(h,f,p,_,g,m);p.transmission>0?n.push(v):p.transparent===!0?i.push(v):t.push(v)}function c(h,f,p,_,g,m){const v=o(h,f,p,_,g,m);p.transmission>0?n.unshift(v):p.transparent===!0?i.unshift(v):t.unshift(v)}function u(h,f){t.length>1&&t.sort(h||ZM),n.length>1&&n.sort(f||nf),i.length>1&&i.sort(f||nf)}function d(){for(let h=e,f=r.length;h<f;h++){const p=r[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:l,unshift:c,finish:d,sort:u}}function KM(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new sf,r.set(n,[a])):i>=s.length?(a=new sf,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function JM(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Fe};break;case"SpotLight":t={position:new I,direction:new I,color:new Fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Fe,groundColor:new Fe};break;case"RectAreaLight":t={color:new Fe,position:new I,halfWidth:new I,halfHeight:new I};break}return r[e.id]=t,t}}}function jM(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let QM=0;function eS(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function tS(r){const e=new JM,t=jM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const i=new I,s=new rt,a=new rt;function o(c){let u=0,d=0,h=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,v=0,x=0,y=0,S=0,M=0,C=0;c.sort(eS);for(let T=0,P=c.length;T<P;T++){const L=c[T],B=L.color,Q=L.intensity,J=L.distance;let z=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===os?z=L.shadow.map.texture:z=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)u+=B.r*Q,d+=B.g*Q,h+=B.b*Q;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(L.sh.coefficients[Y],Q);C++}else if(L.isDirectionalLight){const Y=e.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const K=L.shadow,de=t.get(L);de.shadowIntensity=K.intensity,de.shadowBias=K.bias,de.shadowNormalBias=K.normalBias,de.shadowRadius=K.radius,de.shadowMapSize=K.mapSize,n.directionalShadow[f]=de,n.directionalShadowMap[f]=z,n.directionalShadowMatrix[f]=L.shadow.matrix,v++}n.directional[f]=Y,f++}else if(L.isSpotLight){const Y=e.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(B).multiplyScalar(Q),Y.distance=J,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,n.spot[_]=Y;const K=L.shadow;if(L.map&&(n.spotLightMap[S]=L.map,S++,K.updateMatrices(L),L.castShadow&&M++),n.spotLightMatrix[_]=K.matrix,L.castShadow){const de=t.get(L);de.shadowIntensity=K.intensity,de.shadowBias=K.bias,de.shadowNormalBias=K.normalBias,de.shadowRadius=K.radius,de.shadowMapSize=K.mapSize,n.spotShadow[_]=de,n.spotShadowMap[_]=z,y++}_++}else if(L.isRectAreaLight){const Y=e.get(L);Y.color.copy(B).multiplyScalar(Q),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),n.rectArea[g]=Y,g++}else if(L.isPointLight){const Y=e.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){const K=L.shadow,de=t.get(L);de.shadowIntensity=K.intensity,de.shadowBias=K.bias,de.shadowNormalBias=K.normalBias,de.shadowRadius=K.radius,de.shadowMapSize=K.mapSize,de.shadowCameraNear=K.camera.near,de.shadowCameraFar=K.camera.far,n.pointShadow[p]=de,n.pointShadowMap[p]=z,n.pointShadowMatrix[p]=L.shadow.matrix,x++}n.point[p]=Y,p++}else if(L.isHemisphereLight){const Y=e.get(L);Y.skyColor.copy(L.color).multiplyScalar(Q),Y.groundColor.copy(L.groundColor).multiplyScalar(Q),n.hemi[m]=Y,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pe.LTC_FLOAT_1,n.rectAreaLTC2=Pe.LTC_FLOAT_2):(n.rectAreaLTC1=Pe.LTC_HALF_1,n.rectAreaLTC2=Pe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const b=n.hash;(b.directionalLength!==f||b.pointLength!==p||b.spotLength!==_||b.rectAreaLength!==g||b.hemiLength!==m||b.numDirectionalShadows!==v||b.numPointShadows!==x||b.numSpotShadows!==y||b.numSpotMaps!==S||b.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=y+S-M,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=C,b.directionalLength=f,b.pointLength=p,b.spotLength=_,b.rectAreaLength=g,b.hemiLength=m,b.numDirectionalShadows=v,b.numPointShadows=x,b.numSpotShadows=y,b.numSpotMaps=S,b.numLightProbes=C,n.version=QM++)}function l(c,u){let d=0,h=0,f=0,p=0,_=0;const g=u.matrixWorldInverse;for(let m=0,v=c.length;m<v;m++){const x=c[m];if(x.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),d++}else if(x.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(x.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),a.identity(),s.copy(x.matrixWorld),s.premultiply(g),a.extractRotation(s),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),p++}else if(x.isPointLight){const y=n.point[h];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),h++}else if(x.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(g),_++}}}return{setup:o,setupView:l,state:n}}function rf(r){const e=new tS(r),t=[],n=[],i=[];function s(h){d.camera=h,t.length=0,n.length=0,i.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function l(h){i.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function nS(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new rf(r),e.set(i,[o])):s>=a.length?(o=new rf(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const iS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sS=`uniform sampler2D shadow_pass;
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
}`,rS=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],aS=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],af=new rt,Xr=new I,Qc=new I;function oS(r,e,t){let n=new Ar;const i=new ge,s=new ge,a=new Mt,o=new ld,l=new cd,c={},u=t.maxTextureSize,d={[Bi]:An,[An]:Bi,[xi]:xi},h=new qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ge},radius:{value:4}},vertexShader:iS,fragmentShader:sS}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const p=new ut;p.setAttribute("position",new Ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Lt(p,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zr;let m=this.type;this.render=function(M,C,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||M.length===0)return;this.type===Tf&&(Re("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Zr);const T=r.getRenderTarget(),P=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),B=r.state;B.setBlending(wi),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const Q=m!==this.type;Q&&C.traverse(function(J){J.material&&(Array.isArray(J.material)?J.material.forEach(z=>z.needsUpdate=!0):J.material.needsUpdate=!0)});for(let J=0,z=M.length;J<z;J++){const Y=M[J],K=Y.shadow;if(K===void 0){Re("WebGLShadowMap:",Y,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;i.copy(K.mapSize);const de=K.getFrameExtents();i.multiply(de),s.copy(K.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/de.x),i.x=s.x*de.x,K.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/de.y),i.y=s.y*de.y,K.mapSize.y=s.y));const pe=r.state.buffers.depth.getReversed();if(K.camera._reversedDepth=pe,K.map===null||Q===!0){if(K.map!==null&&(K.map.depthTexture!==null&&(K.map.depthTexture.dispose(),K.map.depthTexture=null),K.map.dispose()),this.type===pr){if(Y.isPointLight){Re("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}K.map=new $n(i.x,i.y,{format:os,type:Ti,minFilter:Bt,magFilter:Bt,generateMipmaps:!1}),K.map.texture.name=Y.name+".shadowMap",K.map.depthTexture=new ks(i.x,i.y,En),K.map.depthTexture.name=Y.name+".shadowMapDepth",K.map.depthTexture.format=Ai,K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Kt,K.map.depthTexture.magFilter=Kt}else Y.isPointLight?(K.map=new bd(i.x),K.map.depthTexture=new xp(i.x,Kn)):(K.map=new $n(i.x,i.y),K.map.depthTexture=new ks(i.x,i.y,Kn)),K.map.depthTexture.name=Y.name+".shadowMap",K.map.depthTexture.format=Ai,this.type===Zr?(K.map.depthTexture.compareFunction=pe?Ol:Fl,K.map.depthTexture.minFilter=Bt,K.map.depthTexture.magFilter=Bt):(K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Kt,K.map.depthTexture.magFilter=Kt);K.camera.updateProjectionMatrix()}const ve=K.map.isWebGLCubeRenderTarget?6:1;for(let Ce=0;Ce<ve;Ce++){if(K.map.isWebGLCubeRenderTarget)r.setRenderTarget(K.map,Ce),r.clear();else{Ce===0&&(r.setRenderTarget(K.map),r.clear());const Be=K.getViewport(Ce);a.set(s.x*Be.x,s.y*Be.y,s.x*Be.z,s.y*Be.w),B.viewport(a)}if(Y.isPointLight){const Be=K.camera,st=K.matrix,dt=Y.distance||Be.far;dt!==Be.far&&(Be.far=dt,Be.updateProjectionMatrix()),Xr.setFromMatrixPosition(Y.matrixWorld),Be.position.copy(Xr),Qc.copy(Be.position),Qc.add(rS[Ce]),Be.up.copy(aS[Ce]),Be.lookAt(Qc),Be.updateMatrixWorld(),st.makeTranslation(-Xr.x,-Xr.y,-Xr.z),af.multiplyMatrices(Be.projectionMatrix,Be.matrixWorldInverse),K._frustum.setFromProjectionMatrix(af,Be.coordinateSystem,Be.reversedDepth)}else K.updateMatrices(Y);n=K.getFrustum(),y(C,b,K.camera,Y,this.type)}K.isPointLightShadow!==!0&&this.type===pr&&v(K,b),K.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(T,P,L)};function v(M,C){const b=e.update(_);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new $n(i.x,i.y,{format:os,type:Ti})),h.uniforms.shadow_pass.value=M.map.depthTexture,h.uniforms.resolution.value=M.mapSize,h.uniforms.radius.value=M.radius,r.setRenderTarget(M.mapPass),r.clear(),r.renderBufferDirect(C,null,b,h,_,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,r.setRenderTarget(M.map),r.clear(),r.renderBufferDirect(C,null,b,f,_,null)}function x(M,C,b,T){let P=null;const L=b.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(L!==void 0)P=L;else if(P=b.isPointLight===!0?l:o,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const B=P.uuid,Q=C.uuid;let J=c[B];J===void 0&&(J={},c[B]=J);let z=J[Q];z===void 0&&(z=P.clone(),J[Q]=z,C.addEventListener("dispose",S)),P=z}if(P.visible=C.visible,P.wireframe=C.wireframe,T===pr?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:d[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,b.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const B=r.properties.get(P);B.light=b}return P}function y(M,C,b,T,P){if(M.visible===!1)return;if(M.layers.test(C.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&P===pr)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,M.matrixWorld);const Q=e.update(M),J=M.material;if(Array.isArray(J)){const z=Q.groups;for(let Y=0,K=z.length;Y<K;Y++){const de=z[Y],pe=J[de.materialIndex];if(pe&&pe.visible){const ve=x(M,pe,T,P);M.onBeforeShadow(r,M,C,b,Q,ve,de),r.renderBufferDirect(b,null,Q,ve,M,de),M.onAfterShadow(r,M,C,b,Q,ve,de)}}}else if(J.visible){const z=x(M,J,T,P);M.onBeforeShadow(r,M,C,b,Q,z,null),r.renderBufferDirect(b,null,Q,z,M,null),M.onAfterShadow(r,M,C,b,Q,z,null)}}const B=M.children;for(let Q=0,J=B.length;Q<J;Q++)y(B[Q],C,b,T,P)}function S(M){M.target.removeEventListener("dispose",S);for(const b in c){const T=c[b],P=M.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function lS(r,e){function t(){let V=!1;const we=new Mt;let le=null;const Oe=new Mt(0,0,0,0);return{setMask:function(Te){le!==Te&&!V&&(r.colorMask(Te,Te,Te,Te),le=Te)},setLocked:function(Te){V=Te},setClear:function(Te,xe,N,k,se){se===!0&&(Te*=k,xe*=k,N*=k),we.set(Te,xe,N,k),Oe.equals(we)===!1&&(r.clearColor(Te,xe,N,k),Oe.copy(we))},reset:function(){V=!1,le=null,Oe.set(-1,0,0,0)}}}function n(){let V=!1,we=!1,le=null,Oe=null,Te=null;return{setReversed:function(xe){if(we!==xe){const N=e.get("EXT_clip_control");xe?N.clipControlEXT(N.LOWER_LEFT_EXT,N.ZERO_TO_ONE_EXT):N.clipControlEXT(N.LOWER_LEFT_EXT,N.NEGATIVE_ONE_TO_ONE_EXT),we=xe;const k=Te;Te=null,this.setClear(k)}},getReversed:function(){return we},setTest:function(xe){xe?ue(r.DEPTH_TEST):ye(r.DEPTH_TEST)},setMask:function(xe){le!==xe&&!V&&(r.depthMask(xe),le=xe)},setFunc:function(xe){if(we&&(xe=Ag[xe]),Oe!==xe){switch(xe){case No:r.depthFunc(r.NEVER);break;case Fo:r.depthFunc(r.ALWAYS);break;case Oo:r.depthFunc(r.LESS);break;case Fs:r.depthFunc(r.LEQUAL);break;case ko:r.depthFunc(r.EQUAL);break;case Bo:r.depthFunc(r.GEQUAL);break;case zo:r.depthFunc(r.GREATER);break;case Vo:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Oe=xe}},setLocked:function(xe){V=xe},setClear:function(xe){Te!==xe&&(Te=xe,we&&(xe=1-xe),r.clearDepth(xe))},reset:function(){V=!1,le=null,Oe=null,Te=null,we=!1}}}function i(){let V=!1,we=null,le=null,Oe=null,Te=null,xe=null,N=null,k=null,se=null;return{setTest:function(Ie){V||(Ie?ue(r.STENCIL_TEST):ye(r.STENCIL_TEST))},setMask:function(Ie){we!==Ie&&!V&&(r.stencilMask(Ie),we=Ie)},setFunc:function(Ie,Xe,Ke){(le!==Ie||Oe!==Xe||Te!==Ke)&&(r.stencilFunc(Ie,Xe,Ke),le=Ie,Oe=Xe,Te=Ke)},setOp:function(Ie,Xe,Ke){(xe!==Ie||N!==Xe||k!==Ke)&&(r.stencilOp(Ie,Xe,Ke),xe=Ie,N=Xe,k=Ke)},setLocked:function(Ie){V=Ie},setClear:function(Ie){se!==Ie&&(r.clearStencil(Ie),se=Ie)},reset:function(){V=!1,we=null,le=null,Oe=null,Te=null,xe=null,N=null,k=null,se=null}}}const s=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let u={},d={},h={},f=new WeakMap,p=[],_=null,g=!1,m=null,v=null,x=null,y=null,S=null,M=null,C=null,b=new Fe(0,0,0),T=0,P=!1,L=null,B=null,Q=null,J=null,z=null;const Y=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,de=0;const pe=r.getParameter(r.VERSION);pe.indexOf("WebGL")!==-1?(de=parseFloat(/^WebGL (\d)/.exec(pe)[1]),K=de>=1):pe.indexOf("OpenGL ES")!==-1&&(de=parseFloat(/^OpenGL ES (\d)/.exec(pe)[1]),K=de>=2);let ve=null,Ce={};const Be=r.getParameter(r.SCISSOR_BOX),st=r.getParameter(r.VIEWPORT),dt=new Mt().fromArray(Be),tt=new Mt().fromArray(st);function H(V,we,le,Oe){const Te=new Uint8Array(4),xe=r.createTexture();r.bindTexture(V,xe),r.texParameteri(V,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(V,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let N=0;N<le;N++)V===r.TEXTURE_3D||V===r.TEXTURE_2D_ARRAY?r.texImage3D(we,0,r.RGBA,1,1,Oe,0,r.RGBA,r.UNSIGNED_BYTE,Te):r.texImage2D(we+N,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Te);return xe}const ae={};ae[r.TEXTURE_2D]=H(r.TEXTURE_2D,r.TEXTURE_2D,1),ae[r.TEXTURE_CUBE_MAP]=H(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[r.TEXTURE_2D_ARRAY]=H(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ae[r.TEXTURE_3D]=H(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ue(r.DEPTH_TEST),a.setFunc(Fs),oe(!1),me(ou),ue(r.CULL_FACE),q(wi);function ue(V){u[V]!==!0&&(r.enable(V),u[V]=!0)}function ye(V){u[V]!==!1&&(r.disable(V),u[V]=!1)}function $(V,we){return h[V]!==we?(r.bindFramebuffer(V,we),h[V]=we,V===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=we),V===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=we),!0):!1}function D(V,we){let le=p,Oe=!1;if(V){le=f.get(we),le===void 0&&(le=[],f.set(we,le));const Te=V.textures;if(le.length!==Te.length||le[0]!==r.COLOR_ATTACHMENT0){for(let xe=0,N=Te.length;xe<N;xe++)le[xe]=r.COLOR_ATTACHMENT0+xe;le.length=Te.length,Oe=!0}}else le[0]!==r.BACK&&(le[0]=r.BACK,Oe=!0);Oe&&r.drawBuffers(le)}function U(V){return _!==V?(r.useProgram(V),_=V,!0):!1}const O={[ns]:r.FUNC_ADD,[Cf]:r.FUNC_SUBTRACT,[Rf]:r.FUNC_REVERSE_SUBTRACT};O[If]=r.MIN,O[Pf]=r.MAX;const j={[Lf]:r.ZERO,[Df]:r.ONE,[Uf]:r.SRC_COLOR,[Do]:r.SRC_ALPHA,[zf]:r.SRC_ALPHA_SATURATE,[kf]:r.DST_COLOR,[Ff]:r.DST_ALPHA,[Nf]:r.ONE_MINUS_SRC_COLOR,[Uo]:r.ONE_MINUS_SRC_ALPHA,[Bf]:r.ONE_MINUS_DST_COLOR,[Of]:r.ONE_MINUS_DST_ALPHA,[Vf]:r.CONSTANT_COLOR,[Gf]:r.ONE_MINUS_CONSTANT_COLOR,[Hf]:r.CONSTANT_ALPHA,[Wf]:r.ONE_MINUS_CONSTANT_ALPHA};function q(V,we,le,Oe,Te,xe,N,k,se,Ie){if(V===wi){g===!0&&(ye(r.BLEND),g=!1);return}if(g===!1&&(ue(r.BLEND),g=!0),V!==Af){if(V!==m||Ie!==P){if((v!==ns||S!==ns)&&(r.blendEquation(r.FUNC_ADD),v=ns,S=ns),Ie)switch(V){case Ls:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case lu:r.blendFunc(r.ONE,r.ONE);break;case cu:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case uu:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ye("WebGLState: Invalid blending: ",V);break}else switch(V){case Ls:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case lu:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case cu:Ye("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case uu:Ye("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ye("WebGLState: Invalid blending: ",V);break}x=null,y=null,M=null,C=null,b.set(0,0,0),T=0,m=V,P=Ie}return}Te=Te||we,xe=xe||le,N=N||Oe,(we!==v||Te!==S)&&(r.blendEquationSeparate(O[we],O[Te]),v=we,S=Te),(le!==x||Oe!==y||xe!==M||N!==C)&&(r.blendFuncSeparate(j[le],j[Oe],j[xe],j[N]),x=le,y=Oe,M=xe,C=N),(k.equals(b)===!1||se!==T)&&(r.blendColor(k.r,k.g,k.b,se),b.copy(k),T=se),m=V,P=!1}function ne(V,we){V.side===xi?ye(r.CULL_FACE):ue(r.CULL_FACE);let le=V.side===An;we&&(le=!le),oe(le),V.blending===Ls&&V.transparent===!1?q(wi):q(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),a.setFunc(V.depthFunc),a.setTest(V.depthTest),a.setMask(V.depthWrite),s.setMask(V.colorWrite);const Oe=V.stencilWrite;o.setTest(Oe),Oe&&(o.setMask(V.stencilWriteMask),o.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),o.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),F(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?ue(r.SAMPLE_ALPHA_TO_COVERAGE):ye(r.SAMPLE_ALPHA_TO_COVERAGE)}function oe(V){L!==V&&(V?r.frontFace(r.CW):r.frontFace(r.CCW),L=V)}function me(V){V!==wf?(ue(r.CULL_FACE),V!==B&&(V===ou?r.cullFace(r.BACK):V===Ef?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ye(r.CULL_FACE),B=V}function $e(V){V!==Q&&(K&&r.lineWidth(V),Q=V)}function F(V,we,le){V?(ue(r.POLYGON_OFFSET_FILL),(J!==we||z!==le)&&(J=we,z=le,a.getReversed()&&(we=-we),r.polygonOffset(we,le))):ye(r.POLYGON_OFFSET_FILL)}function it(V){V?ue(r.SCISSOR_TEST):ye(r.SCISSOR_TEST)}function ze(V){V===void 0&&(V=r.TEXTURE0+Y-1),ve!==V&&(r.activeTexture(V),ve=V)}function nt(V,we,le){le===void 0&&(ve===null?le=r.TEXTURE0+Y-1:le=ve);let Oe=Ce[le];Oe===void 0&&(Oe={type:void 0,texture:void 0},Ce[le]=Oe),(Oe.type!==V||Oe.texture!==we)&&(ve!==le&&(r.activeTexture(le),ve=le),r.bindTexture(V,we||ae[V]),Oe.type=V,Oe.texture=we)}function Me(){const V=Ce[ve];V!==void 0&&V.type!==void 0&&(r.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function Tt(){try{r.compressedTexImage2D(...arguments)}catch(V){Ye("WebGLState:",V)}}function R(){try{r.compressedTexImage3D(...arguments)}catch(V){Ye("WebGLState:",V)}}function w(){try{r.texSubImage2D(...arguments)}catch(V){Ye("WebGLState:",V)}}function Z(){try{r.texSubImage3D(...arguments)}catch(V){Ye("WebGLState:",V)}}function ce(){try{r.compressedTexSubImage2D(...arguments)}catch(V){Ye("WebGLState:",V)}}function _e(){try{r.compressedTexSubImage3D(...arguments)}catch(V){Ye("WebGLState:",V)}}function be(){try{r.texStorage2D(...arguments)}catch(V){Ye("WebGLState:",V)}}function Se(){try{r.texStorage3D(...arguments)}catch(V){Ye("WebGLState:",V)}}function re(){try{r.texImage2D(...arguments)}catch(V){Ye("WebGLState:",V)}}function he(){try{r.texImage3D(...arguments)}catch(V){Ye("WebGLState:",V)}}function Ue(V){return d[V]!==void 0?d[V]:r.getParameter(V)}function Ve(V,we){d[V]!==we&&(r.pixelStorei(V,we),d[V]=we)}function Ae(V){dt.equals(V)===!1&&(r.scissor(V.x,V.y,V.z,V.w),dt.copy(V))}function Ee(V){tt.equals(V)===!1&&(r.viewport(V.x,V.y,V.z,V.w),tt.copy(V))}function lt(V,we){let le=c.get(we);le===void 0&&(le=new WeakMap,c.set(we,le));let Oe=le.get(V);Oe===void 0&&(Oe=r.getUniformBlockIndex(we,V.name),le.set(V,Oe))}function ht(V,we){const Oe=c.get(we).get(V);l.get(we)!==Oe&&(r.uniformBlockBinding(we,Oe,V.__bindingPointIndex),l.set(we,Oe))}function bt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),u={},d={},ve=null,Ce={},h={},f=new WeakMap,p=[],_=null,g=!1,m=null,v=null,x=null,y=null,S=null,M=null,C=null,b=new Fe(0,0,0),T=0,P=!1,L=null,B=null,Q=null,J=null,z=null,dt.set(0,0,r.canvas.width,r.canvas.height),tt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ue,disable:ye,bindFramebuffer:$,drawBuffers:D,useProgram:U,setBlending:q,setMaterial:ne,setFlipSided:oe,setCullFace:me,setLineWidth:$e,setPolygonOffset:F,setScissorTest:it,activeTexture:ze,bindTexture:nt,unbindTexture:Me,compressedTexImage2D:Tt,compressedTexImage3D:R,texImage2D:re,texImage3D:he,pixelStorei:Ve,getParameter:Ue,updateUBOMapping:lt,uniformBlockBinding:ht,texStorage2D:be,texStorage3D:Se,texSubImage2D:w,texSubImage3D:Z,compressedTexSubImage2D:ce,compressedTexSubImage3D:_e,scissor:Ae,viewport:Ee,reset:bt}}function cS(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ge,u=new WeakMap,d=new Set;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,w){return p?new OffscreenCanvas(R,w):ma("canvas")}function g(R,w,Z){let ce=1;const _e=Tt(R);if((_e.width>Z||_e.height>Z)&&(ce=Z/Math.max(_e.width,_e.height)),ce<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const be=Math.floor(ce*_e.width),Se=Math.floor(ce*_e.height);h===void 0&&(h=_(be,Se));const re=w?_(be,Se):h;return re.width=be,re.height=Se,re.getContext("2d").drawImage(R,0,0,be,Se),Re("WebGLRenderer: Texture has been resized from ("+_e.width+"x"+_e.height+") to ("+be+"x"+Se+")."),re}else return"data"in R&&Re("WebGLRenderer: Image in DataTexture is too big ("+_e.width+"x"+_e.height+")."),R;return R}function m(R){return R.generateMipmaps}function v(R){r.generateMipmap(R)}function x(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(R,w,Z,ce,_e,be=!1){if(R!==null){if(r[R]!==void 0)return r[R];Re("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Se;ce&&(Se=e.get("EXT_texture_norm16"),Se||Re("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let re=w;if(w===r.RED&&(Z===r.FLOAT&&(re=r.R32F),Z===r.HALF_FLOAT&&(re=r.R16F),Z===r.UNSIGNED_BYTE&&(re=r.R8),Z===r.UNSIGNED_SHORT&&Se&&(re=Se.R16_EXT),Z===r.SHORT&&Se&&(re=Se.R16_SNORM_EXT)),w===r.RED_INTEGER&&(Z===r.UNSIGNED_BYTE&&(re=r.R8UI),Z===r.UNSIGNED_SHORT&&(re=r.R16UI),Z===r.UNSIGNED_INT&&(re=r.R32UI),Z===r.BYTE&&(re=r.R8I),Z===r.SHORT&&(re=r.R16I),Z===r.INT&&(re=r.R32I)),w===r.RG&&(Z===r.FLOAT&&(re=r.RG32F),Z===r.HALF_FLOAT&&(re=r.RG16F),Z===r.UNSIGNED_BYTE&&(re=r.RG8),Z===r.UNSIGNED_SHORT&&Se&&(re=Se.RG16_EXT),Z===r.SHORT&&Se&&(re=Se.RG16_SNORM_EXT)),w===r.RG_INTEGER&&(Z===r.UNSIGNED_BYTE&&(re=r.RG8UI),Z===r.UNSIGNED_SHORT&&(re=r.RG16UI),Z===r.UNSIGNED_INT&&(re=r.RG32UI),Z===r.BYTE&&(re=r.RG8I),Z===r.SHORT&&(re=r.RG16I),Z===r.INT&&(re=r.RG32I)),w===r.RGB_INTEGER&&(Z===r.UNSIGNED_BYTE&&(re=r.RGB8UI),Z===r.UNSIGNED_SHORT&&(re=r.RGB16UI),Z===r.UNSIGNED_INT&&(re=r.RGB32UI),Z===r.BYTE&&(re=r.RGB8I),Z===r.SHORT&&(re=r.RGB16I),Z===r.INT&&(re=r.RGB32I)),w===r.RGBA_INTEGER&&(Z===r.UNSIGNED_BYTE&&(re=r.RGBA8UI),Z===r.UNSIGNED_SHORT&&(re=r.RGBA16UI),Z===r.UNSIGNED_INT&&(re=r.RGBA32UI),Z===r.BYTE&&(re=r.RGBA8I),Z===r.SHORT&&(re=r.RGBA16I),Z===r.INT&&(re=r.RGBA32I)),w===r.RGB&&(Z===r.UNSIGNED_SHORT&&Se&&(re=Se.RGB16_EXT),Z===r.SHORT&&Se&&(re=Se.RGB16_SNORM_EXT),Z===r.UNSIGNED_INT_5_9_9_9_REV&&(re=r.RGB9_E5),Z===r.UNSIGNED_INT_10F_11F_11F_REV&&(re=r.R11F_G11F_B10F)),w===r.RGBA){const he=be?fa:xt.getTransfer(_e);Z===r.FLOAT&&(re=r.RGBA32F),Z===r.HALF_FLOAT&&(re=r.RGBA16F),Z===r.UNSIGNED_BYTE&&(re=he===Rt?r.SRGB8_ALPHA8:r.RGBA8),Z===r.UNSIGNED_SHORT&&Se&&(re=Se.RGBA16_EXT),Z===r.SHORT&&Se&&(re=Se.RGBA16_SNORM_EXT),Z===r.UNSIGNED_SHORT_4_4_4_4&&(re=r.RGBA4),Z===r.UNSIGNED_SHORT_5_5_5_1&&(re=r.RGB5_A1)}return(re===r.R16F||re===r.R32F||re===r.RG16F||re===r.RG32F||re===r.RGBA16F||re===r.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function S(R,w){let Z;return R?w===null||w===Kn||w===yr?Z=r.DEPTH24_STENCIL8:w===En?Z=r.DEPTH32F_STENCIL8:w===xr&&(Z=r.DEPTH24_STENCIL8,Re("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Kn||w===yr?Z=r.DEPTH_COMPONENT24:w===En?Z=r.DEPTH_COMPONENT32F:w===xr&&(Z=r.DEPTH_COMPONENT16),Z}function M(R,w){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Kt&&R.minFilter!==Bt?Math.log2(Math.max(w.width,w.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?w.mipmaps.length:1}function C(R){const w=R.target;w.removeEventListener("dispose",C),T(w),w.isVideoTexture&&u.delete(w),w.isHTMLTexture&&d.delete(w)}function b(R){const w=R.target;w.removeEventListener("dispose",b),L(w)}function T(R){const w=n.get(R);if(w.__webglInit===void 0)return;const Z=R.source,ce=f.get(Z);if(ce){const _e=ce[w.__cacheKey];_e.usedTimes--,_e.usedTimes===0&&P(R),Object.keys(ce).length===0&&f.delete(Z)}n.remove(R)}function P(R){const w=n.get(R);r.deleteTexture(w.__webglTexture);const Z=R.source,ce=f.get(Z);delete ce[w.__cacheKey],a.memory.textures--}function L(R){const w=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let ce=0;ce<6;ce++){if(Array.isArray(w.__webglFramebuffer[ce]))for(let _e=0;_e<w.__webglFramebuffer[ce].length;_e++)r.deleteFramebuffer(w.__webglFramebuffer[ce][_e]);else r.deleteFramebuffer(w.__webglFramebuffer[ce]);w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer[ce])}else{if(Array.isArray(w.__webglFramebuffer))for(let ce=0;ce<w.__webglFramebuffer.length;ce++)r.deleteFramebuffer(w.__webglFramebuffer[ce]);else r.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&r.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ce=0;ce<w.__webglColorRenderbuffer.length;ce++)w.__webglColorRenderbuffer[ce]&&r.deleteRenderbuffer(w.__webglColorRenderbuffer[ce]);w.__webglDepthRenderbuffer&&r.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const Z=R.textures;for(let ce=0,_e=Z.length;ce<_e;ce++){const be=n.get(Z[ce]);be.__webglTexture&&(r.deleteTexture(be.__webglTexture),a.memory.textures--),n.remove(Z[ce])}n.remove(R)}let B=0;function Q(){B=0}function J(){return B}function z(R){B=R}function Y(){const R=B;return R>=i.maxTextures&&Re("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),B+=1,R}function K(R){const w=[];return w.push(R.wrapS),w.push(R.wrapT),w.push(R.wrapR||0),w.push(R.magFilter),w.push(R.minFilter),w.push(R.anisotropy),w.push(R.internalFormat),w.push(R.format),w.push(R.type),w.push(R.generateMipmaps),w.push(R.premultiplyAlpha),w.push(R.flipY),w.push(R.unpackAlignment),w.push(R.colorSpace),w.join()}function de(R,w){const Z=n.get(R);if(R.isVideoTexture&&nt(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&Z.__version!==R.version){const ce=R.image;if(ce===null)Re("WebGLRenderer: Texture marked for update but no image data found.");else if(ce.complete===!1)Re("WebGLRenderer: Texture marked for update but image is incomplete");else{ye(Z,R,w);return}}else R.isExternalTexture&&(Z.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,Z.__webglTexture,r.TEXTURE0+w)}function pe(R,w){const Z=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&Z.__version!==R.version){ye(Z,R,w);return}else R.isExternalTexture&&(Z.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,Z.__webglTexture,r.TEXTURE0+w)}function ve(R,w){const Z=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&Z.__version!==R.version){ye(Z,R,w);return}t.bindTexture(r.TEXTURE_3D,Z.__webglTexture,r.TEXTURE0+w)}function Ce(R,w){const Z=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&Z.__version!==R.version){$(Z,R,w);return}t.bindTexture(r.TEXTURE_CUBE_MAP,Z.__webglTexture,r.TEXTURE0+w)}const Be={[aa]:r.REPEAT,[Un]:r.CLAMP_TO_EDGE,[oa]:r.MIRRORED_REPEAT},st={[Kt]:r.NEAREST,[Fu]:r.NEAREST_MIPMAP_NEAREST,[mr]:r.NEAREST_MIPMAP_LINEAR,[Bt]:r.LINEAR,[jr]:r.LINEAR_MIPMAP_NEAREST,[bi]:r.LINEAR_MIPMAP_LINEAR},dt={[Qf]:r.NEVER,[sp]:r.ALWAYS,[ep]:r.LESS,[Fl]:r.LEQUAL,[tp]:r.EQUAL,[Ol]:r.GEQUAL,[np]:r.GREATER,[ip]:r.NOTEQUAL};function tt(R,w){if(w.type===En&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Bt||w.magFilter===jr||w.magFilter===mr||w.magFilter===bi||w.minFilter===Bt||w.minFilter===jr||w.minFilter===mr||w.minFilter===bi)&&Re("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,Be[w.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,Be[w.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,Be[w.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,st[w.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,st[w.minFilter]),w.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,dt[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Kt||w.minFilter!==mr&&w.minFilter!==bi||w.type===En&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const Z=e.get("EXT_texture_filter_anisotropic");r.texParameterf(R,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function H(R,w){let Z=!1;R.__webglInit===void 0&&(R.__webglInit=!0,w.addEventListener("dispose",C));const ce=w.source;let _e=f.get(ce);_e===void 0&&(_e={},f.set(ce,_e));const be=K(w);if(be!==R.__cacheKey){_e[be]===void 0&&(_e[be]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,Z=!0),_e[be].usedTimes++;const Se=_e[R.__cacheKey];Se!==void 0&&(_e[R.__cacheKey].usedTimes--,Se.usedTimes===0&&P(w)),R.__cacheKey=be,R.__webglTexture=_e[be].texture}return Z}function ae(R,w,Z){return Math.floor(Math.floor(R/Z)/w)}function ue(R,w,Z,ce){const be=R.updateRanges;if(be.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,w.width,w.height,Z,ce,w.data);else{be.sort((Ve,Ae)=>Ve.start-Ae.start);let Se=0;for(let Ve=1;Ve<be.length;Ve++){const Ae=be[Se],Ee=be[Ve],lt=Ae.start+Ae.count,ht=ae(Ee.start,w.width,4),bt=ae(Ae.start,w.width,4);Ee.start<=lt+1&&ht===bt&&ae(Ee.start+Ee.count-1,w.width,4)===ht?Ae.count=Math.max(Ae.count,Ee.start+Ee.count-Ae.start):(++Se,be[Se]=Ee)}be.length=Se+1;const re=t.getParameter(r.UNPACK_ROW_LENGTH),he=t.getParameter(r.UNPACK_SKIP_PIXELS),Ue=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,w.width);for(let Ve=0,Ae=be.length;Ve<Ae;Ve++){const Ee=be[Ve],lt=Math.floor(Ee.start/4),ht=Math.ceil(Ee.count/4),bt=lt%w.width,V=Math.floor(lt/w.width),we=ht,le=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,bt),t.pixelStorei(r.UNPACK_SKIP_ROWS,V),t.texSubImage2D(r.TEXTURE_2D,0,bt,V,we,le,Z,ce,w.data)}R.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,re),t.pixelStorei(r.UNPACK_SKIP_PIXELS,he),t.pixelStorei(r.UNPACK_SKIP_ROWS,Ue)}}function ye(R,w,Z){let ce=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ce=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ce=r.TEXTURE_3D);const _e=H(R,w),be=w.source;t.bindTexture(ce,R.__webglTexture,r.TEXTURE0+Z);const Se=n.get(be);if(be.version!==Se.__version||_e===!0){if(t.activeTexture(r.TEXTURE0+Z),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){const le=xt.getPrimaries(xt.workingColorSpace),Oe=w.colorSpace===Ni?null:xt.getPrimaries(w.colorSpace),Te=w.colorSpace===Ni||le===Oe?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te)}t.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment);let he=g(w.image,!1,i.maxTextureSize);he=Me(w,he);const Ue=s.convert(w.format,w.colorSpace),Ve=s.convert(w.type);let Ae=y(w.internalFormat,Ue,Ve,w.normalized,w.colorSpace,w.isVideoTexture);tt(ce,w);let Ee;const lt=w.mipmaps,ht=w.isVideoTexture!==!0,bt=Se.__version===void 0||_e===!0,V=be.dataReady,we=M(w,he);if(w.isDepthTexture)Ae=S(w.format===is,w.type),bt&&(ht?t.texStorage2D(r.TEXTURE_2D,1,Ae,he.width,he.height):t.texImage2D(r.TEXTURE_2D,0,Ae,he.width,he.height,0,Ue,Ve,null));else if(w.isDataTexture)if(lt.length>0){ht&&bt&&t.texStorage2D(r.TEXTURE_2D,we,Ae,lt[0].width,lt[0].height);for(let le=0,Oe=lt.length;le<Oe;le++)Ee=lt[le],ht?V&&t.texSubImage2D(r.TEXTURE_2D,le,0,0,Ee.width,Ee.height,Ue,Ve,Ee.data):t.texImage2D(r.TEXTURE_2D,le,Ae,Ee.width,Ee.height,0,Ue,Ve,Ee.data);w.generateMipmaps=!1}else ht?(bt&&t.texStorage2D(r.TEXTURE_2D,we,Ae,he.width,he.height),V&&ue(w,he,Ue,Ve)):t.texImage2D(r.TEXTURE_2D,0,Ae,he.width,he.height,0,Ue,Ve,he.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){ht&&bt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,we,Ae,lt[0].width,lt[0].height,he.depth);for(let le=0,Oe=lt.length;le<Oe;le++)if(Ee=lt[le],w.format!==Tn)if(Ue!==null)if(ht){if(V)if(w.layerUpdates.size>0){const Te=Mu(Ee.width,Ee.height,w.format,w.type);for(const xe of w.layerUpdates){const N=Ee.data.subarray(xe*Te/Ee.data.BYTES_PER_ELEMENT,(xe+1)*Te/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,le,0,0,xe,Ee.width,Ee.height,1,Ue,N)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,le,0,0,0,Ee.width,Ee.height,he.depth,Ue,Ee.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,le,Ae,Ee.width,Ee.height,he.depth,0,Ee.data,0,0);else Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ht?V&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,le,0,0,0,Ee.width,Ee.height,he.depth,Ue,Ve,Ee.data):t.texImage3D(r.TEXTURE_2D_ARRAY,le,Ae,Ee.width,Ee.height,he.depth,0,Ue,Ve,Ee.data)}else{ht&&bt&&t.texStorage2D(r.TEXTURE_2D,we,Ae,lt[0].width,lt[0].height);for(let le=0,Oe=lt.length;le<Oe;le++)Ee=lt[le],w.format!==Tn?Ue!==null?ht?V&&t.compressedTexSubImage2D(r.TEXTURE_2D,le,0,0,Ee.width,Ee.height,Ue,Ee.data):t.compressedTexImage2D(r.TEXTURE_2D,le,Ae,Ee.width,Ee.height,0,Ee.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ht?V&&t.texSubImage2D(r.TEXTURE_2D,le,0,0,Ee.width,Ee.height,Ue,Ve,Ee.data):t.texImage2D(r.TEXTURE_2D,le,Ae,Ee.width,Ee.height,0,Ue,Ve,Ee.data)}else if(w.isDataArrayTexture)if(ht){if(bt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,we,Ae,he.width,he.height,he.depth),V)if(w.layerUpdates.size>0){const le=Mu(he.width,he.height,w.format,w.type);for(const Oe of w.layerUpdates){const Te=he.data.subarray(Oe*le/he.data.BYTES_PER_ELEMENT,(Oe+1)*le/he.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Oe,he.width,he.height,1,Ue,Ve,Te)}w.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,Ue,Ve,he.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ae,he.width,he.height,he.depth,0,Ue,Ve,he.data);else if(w.isData3DTexture)ht?(bt&&t.texStorage3D(r.TEXTURE_3D,we,Ae,he.width,he.height,he.depth),V&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,Ue,Ve,he.data)):t.texImage3D(r.TEXTURE_3D,0,Ae,he.width,he.height,he.depth,0,Ue,Ve,he.data);else if(w.isFramebufferTexture){if(bt)if(ht)t.texStorage2D(r.TEXTURE_2D,we,Ae,he.width,he.height);else{let le=he.width,Oe=he.height;for(let Te=0;Te<we;Te++)t.texImage2D(r.TEXTURE_2D,Te,Ae,le,Oe,0,Ue,Ve,null),le>>=1,Oe>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in r){const le=r.canvas;if(le.hasAttribute("layoutsubtree")||le.setAttribute("layoutsubtree","true"),he.parentNode!==le){le.appendChild(he),d.add(w),le.onpaint=k=>{const se=k.changedElements;for(const Ie of d)se.includes(Ie.image)&&(Ie.needsUpdate=!0)},le.requestPaint();return}const Oe=0,Te=r.RGBA,xe=r.RGBA,N=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,Oe,Te,xe,N,he),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(lt.length>0){if(ht&&bt){const le=Tt(lt[0]);t.texStorage2D(r.TEXTURE_2D,we,Ae,le.width,le.height)}for(let le=0,Oe=lt.length;le<Oe;le++)Ee=lt[le],ht?V&&t.texSubImage2D(r.TEXTURE_2D,le,0,0,Ue,Ve,Ee):t.texImage2D(r.TEXTURE_2D,le,Ae,Ue,Ve,Ee);w.generateMipmaps=!1}else if(ht){if(bt){const le=Tt(he);t.texStorage2D(r.TEXTURE_2D,we,Ae,le.width,le.height)}V&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ue,Ve,he)}else t.texImage2D(r.TEXTURE_2D,0,Ae,Ue,Ve,he);m(w)&&v(ce),Se.__version=be.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function $(R,w,Z){if(w.image.length!==6)return;const ce=H(R,w),_e=w.source;t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+Z);const be=n.get(_e);if(_e.version!==be.__version||ce===!0){t.activeTexture(r.TEXTURE0+Z);const Se=xt.getPrimaries(xt.workingColorSpace),re=w.colorSpace===Ni?null:xt.getPrimaries(w.colorSpace),he=w.colorSpace===Ni||Se===re?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Ue=w.isCompressedTexture||w.image[0].isCompressedTexture,Ve=w.image[0]&&w.image[0].isDataTexture,Ae=[];for(let xe=0;xe<6;xe++)!Ue&&!Ve?Ae[xe]=g(w.image[xe],!0,i.maxCubemapSize):Ae[xe]=Ve?w.image[xe].image:w.image[xe],Ae[xe]=Me(w,Ae[xe]);const Ee=Ae[0],lt=s.convert(w.format,w.colorSpace),ht=s.convert(w.type),bt=y(w.internalFormat,lt,ht,w.normalized,w.colorSpace),V=w.isVideoTexture!==!0,we=be.__version===void 0||ce===!0,le=_e.dataReady;let Oe=M(w,Ee);tt(r.TEXTURE_CUBE_MAP,w);let Te;if(Ue){V&&we&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Oe,bt,Ee.width,Ee.height);for(let xe=0;xe<6;xe++){Te=Ae[xe].mipmaps;for(let N=0;N<Te.length;N++){const k=Te[N];w.format!==Tn?lt!==null?V?le&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,N,0,0,k.width,k.height,lt,k.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,N,bt,k.width,k.height,0,k.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,N,0,0,k.width,k.height,lt,ht,k.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,N,bt,k.width,k.height,0,lt,ht,k.data)}}}else{if(Te=w.mipmaps,V&&we){Te.length>0&&Oe++;const xe=Tt(Ae[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Oe,bt,xe.width,xe.height)}for(let xe=0;xe<6;xe++)if(Ve){V?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,Ae[xe].width,Ae[xe].height,lt,ht,Ae[xe].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,bt,Ae[xe].width,Ae[xe].height,0,lt,ht,Ae[xe].data);for(let N=0;N<Te.length;N++){const se=Te[N].image[xe].image;V?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,N+1,0,0,se.width,se.height,lt,ht,se.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,N+1,bt,se.width,se.height,0,lt,ht,se.data)}}else{V?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,lt,ht,Ae[xe]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,bt,lt,ht,Ae[xe]);for(let N=0;N<Te.length;N++){const k=Te[N];V?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,N+1,0,0,lt,ht,k.image[xe]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,N+1,bt,lt,ht,k.image[xe])}}}m(w)&&v(r.TEXTURE_CUBE_MAP),be.__version=_e.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function D(R,w,Z,ce,_e,be){const Se=s.convert(Z.format,Z.colorSpace),re=s.convert(Z.type),he=y(Z.internalFormat,Se,re,Z.normalized,Z.colorSpace),Ue=n.get(w),Ve=n.get(Z);if(Ve.__renderTarget=w,!Ue.__hasExternalTextures){const Ae=Math.max(1,w.width>>be),Ee=Math.max(1,w.height>>be);_e===r.TEXTURE_3D||_e===r.TEXTURE_2D_ARRAY?t.texImage3D(_e,be,he,Ae,Ee,w.depth,0,Se,re,null):t.texImage2D(_e,be,he,Ae,Ee,0,Se,re,null)}t.bindFramebuffer(r.FRAMEBUFFER,R),ze(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ce,_e,Ve.__webglTexture,0,it(w)):(_e===r.TEXTURE_2D||_e>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&_e<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ce,_e,Ve.__webglTexture,be),t.bindFramebuffer(r.FRAMEBUFFER,null)}function U(R,w,Z){if(r.bindRenderbuffer(r.RENDERBUFFER,R),w.depthBuffer){const ce=w.depthTexture,_e=ce&&ce.isDepthTexture?ce.type:null,be=S(w.stencilBuffer,_e),Se=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;ze(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,it(w),be,w.width,w.height):Z?r.renderbufferStorageMultisample(r.RENDERBUFFER,it(w),be,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,be,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Se,r.RENDERBUFFER,R)}else{const ce=w.textures;for(let _e=0;_e<ce.length;_e++){const be=ce[_e],Se=s.convert(be.format,be.colorSpace),re=s.convert(be.type),he=y(be.internalFormat,Se,re,be.normalized,be.colorSpace);ze(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,it(w),he,w.width,w.height):Z?r.renderbufferStorageMultisample(r.RENDERBUFFER,it(w),he,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,he,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function O(R,w,Z){const ce=w.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,R),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const _e=n.get(w.depthTexture);if(_e.__renderTarget=w,(!_e.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),ce){if(_e.__webglInit===void 0&&(_e.__webglInit=!0,w.depthTexture.addEventListener("dispose",C)),_e.__webglTexture===void 0){_e.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,_e.__webglTexture),tt(r.TEXTURE_CUBE_MAP,w.depthTexture);const Ue=s.convert(w.depthTexture.format),Ve=s.convert(w.depthTexture.type);let Ae;w.depthTexture.format===Ai?Ae=r.DEPTH_COMPONENT24:w.depthTexture.format===is&&(Ae=r.DEPTH24_STENCIL8);for(let Ee=0;Ee<6;Ee++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,Ae,w.width,w.height,0,Ue,Ve,null)}}else de(w.depthTexture,0);const be=_e.__webglTexture,Se=it(w),re=ce?r.TEXTURE_CUBE_MAP_POSITIVE_X+Z:r.TEXTURE_2D,he=w.depthTexture.format===is?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(w.depthTexture.format===Ai)ze(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,he,re,be,0,Se):r.framebufferTexture2D(r.FRAMEBUFFER,he,re,be,0);else if(w.depthTexture.format===is)ze(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,he,re,be,0,Se):r.framebufferTexture2D(r.FRAMEBUFFER,he,re,be,0);else throw new Error("Unknown depthTexture format")}function j(R){const w=n.get(R),Z=R.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==R.depthTexture){const ce=R.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ce){const _e=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ce.removeEventListener("dispose",_e)};ce.addEventListener("dispose",_e),w.__depthDisposeCallback=_e}w.__boundDepthTexture=ce}if(R.depthTexture&&!w.__autoAllocateDepthBuffer)if(Z)for(let ce=0;ce<6;ce++)O(w.__webglFramebuffer[ce],R,ce);else{const ce=R.texture.mipmaps;ce&&ce.length>0?O(w.__webglFramebuffer[0],R,0):O(w.__webglFramebuffer,R,0)}else if(Z){w.__webglDepthbuffer=[];for(let ce=0;ce<6;ce++)if(t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[ce]),w.__webglDepthbuffer[ce]===void 0)w.__webglDepthbuffer[ce]=r.createRenderbuffer(),U(w.__webglDepthbuffer[ce],R,!1);else{const _e=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,be=w.__webglDepthbuffer[ce];r.bindRenderbuffer(r.RENDERBUFFER,be),r.framebufferRenderbuffer(r.FRAMEBUFFER,_e,r.RENDERBUFFER,be)}}else{const ce=R.texture.mipmaps;if(ce&&ce.length>0?t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=r.createRenderbuffer(),U(w.__webglDepthbuffer,R,!1);else{const _e=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,be=w.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,be),r.framebufferRenderbuffer(r.FRAMEBUFFER,_e,r.RENDERBUFFER,be)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function q(R,w,Z){const ce=n.get(R);w!==void 0&&D(ce.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),Z!==void 0&&j(R)}function ne(R){const w=R.texture,Z=n.get(R),ce=n.get(w);R.addEventListener("dispose",b);const _e=R.textures,be=R.isWebGLCubeRenderTarget===!0,Se=_e.length>1;if(Se||(ce.__webglTexture===void 0&&(ce.__webglTexture=r.createTexture()),ce.__version=w.version,a.memory.textures++),be){Z.__webglFramebuffer=[];for(let re=0;re<6;re++)if(w.mipmaps&&w.mipmaps.length>0){Z.__webglFramebuffer[re]=[];for(let he=0;he<w.mipmaps.length;he++)Z.__webglFramebuffer[re][he]=r.createFramebuffer()}else Z.__webglFramebuffer[re]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){Z.__webglFramebuffer=[];for(let re=0;re<w.mipmaps.length;re++)Z.__webglFramebuffer[re]=r.createFramebuffer()}else Z.__webglFramebuffer=r.createFramebuffer();if(Se)for(let re=0,he=_e.length;re<he;re++){const Ue=n.get(_e[re]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=r.createTexture(),a.memory.textures++)}if(R.samples>0&&ze(R)===!1){Z.__webglMultisampledFramebuffer=r.createFramebuffer(),Z.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,Z.__webglMultisampledFramebuffer);for(let re=0;re<_e.length;re++){const he=_e[re];Z.__webglColorRenderbuffer[re]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,Z.__webglColorRenderbuffer[re]);const Ue=s.convert(he.format,he.colorSpace),Ve=s.convert(he.type),Ae=y(he.internalFormat,Ue,Ve,he.normalized,he.colorSpace,R.isXRRenderTarget===!0),Ee=it(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ee,Ae,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.RENDERBUFFER,Z.__webglColorRenderbuffer[re])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(Z.__webglDepthRenderbuffer=r.createRenderbuffer(),U(Z.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(be){t.bindTexture(r.TEXTURE_CUBE_MAP,ce.__webglTexture),tt(r.TEXTURE_CUBE_MAP,w);for(let re=0;re<6;re++)if(w.mipmaps&&w.mipmaps.length>0)for(let he=0;he<w.mipmaps.length;he++)D(Z.__webglFramebuffer[re][he],R,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+re,he);else D(Z.__webglFramebuffer[re],R,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(w)&&v(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let re=0,he=_e.length;re<he;re++){const Ue=_e[re],Ve=n.get(Ue);let Ae=r.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Ae=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Ae,Ve.__webglTexture),tt(Ae,Ue),D(Z.__webglFramebuffer,R,Ue,r.COLOR_ATTACHMENT0+re,Ae,0),m(Ue)&&v(Ae)}t.unbindTexture()}else{let re=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(re=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(re,ce.__webglTexture),tt(re,w),w.mipmaps&&w.mipmaps.length>0)for(let he=0;he<w.mipmaps.length;he++)D(Z.__webglFramebuffer[he],R,w,r.COLOR_ATTACHMENT0,re,he);else D(Z.__webglFramebuffer,R,w,r.COLOR_ATTACHMENT0,re,0);m(w)&&v(re),t.unbindTexture()}R.depthBuffer&&j(R)}function oe(R){const w=R.textures;for(let Z=0,ce=w.length;Z<ce;Z++){const _e=w[Z];if(m(_e)){const be=x(R),Se=n.get(_e).__webglTexture;t.bindTexture(be,Se),v(be),t.unbindTexture()}}}const me=[],$e=[];function F(R){if(R.samples>0){if(ze(R)===!1){const w=R.textures,Z=R.width,ce=R.height;let _e=r.COLOR_BUFFER_BIT;const be=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Se=n.get(R),re=w.length>1;if(re)for(let Ue=0;Ue<w.length;Ue++)t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ue,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ue,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);const he=R.texture.mipmaps;he&&he.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let Ue=0;Ue<w.length;Ue++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(_e|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(_e|=r.STENCIL_BUFFER_BIT)),re){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Se.__webglColorRenderbuffer[Ue]);const Ve=n.get(w[Ue]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ve,0)}r.blitFramebuffer(0,0,Z,ce,0,0,Z,ce,_e,r.NEAREST),l===!0&&(me.length=0,$e.length=0,me.push(r.COLOR_ATTACHMENT0+Ue),R.depthBuffer&&R.resolveDepthBuffer===!1&&(me.push(be),$e.push(be),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,$e)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,me))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),re)for(let Ue=0;Ue<w.length;Ue++){t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ue,r.RENDERBUFFER,Se.__webglColorRenderbuffer[Ue]);const Ve=n.get(w[Ue]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ue,r.TEXTURE_2D,Ve,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const w=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[w])}}}function it(R){return Math.min(i.maxSamples,R.samples)}function ze(R){const w=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function nt(R){const w=a.render.frame;u.get(R)!==w&&(u.set(R,w),R.update())}function Me(R,w){const Z=R.colorSpace,ce=R.format,_e=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||Z!==ha&&Z!==Ni&&(xt.getTransfer(Z)===Rt?(ce!==Tn||_e!==Ln)&&Re("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ye("WebGLTextures: Unsupported texture color space:",Z)),w}function Tt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=Q,this.getTextureUnits=J,this.setTextureUnits=z,this.setTexture2D=de,this.setTexture2DArray=pe,this.setTexture3D=ve,this.setTextureCube=Ce,this.rebindTextures=q,this.setupRenderTarget=ne,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=j,this.setupFrameBufferTexture=D,this.useMultisampledRTT=ze,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function fm(r,e){function t(n,i=Ni){let s;const a=xt.getTransfer(i);if(n===Ln)return r.UNSIGNED_BYTE;if(n===Il)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Pl)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Bu)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===zu)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ou)return r.BYTE;if(n===ku)return r.SHORT;if(n===xr)return r.UNSIGNED_SHORT;if(n===Rl)return r.INT;if(n===Kn)return r.UNSIGNED_INT;if(n===En)return r.FLOAT;if(n===Ti)return r.HALF_FLOAT;if(n===Vu)return r.ALPHA;if(n===Gu)return r.RGB;if(n===Tn)return r.RGBA;if(n===Ai)return r.DEPTH_COMPONENT;if(n===is)return r.DEPTH_STENCIL;if(n===Ll)return r.RED;if(n===Ta)return r.RED_INTEGER;if(n===os)return r.RG;if(n===Dl)return r.RG_INTEGER;if(n===Ul)return r.RGBA_INTEGER;if(n===Qr||n===ea||n===ta||n===na)if(a===Rt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Qr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ea)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ta)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===na)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Qr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ea)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ta)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===na)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Go||n===Ho||n===Wo||n===Xo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Go)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ho)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Wo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Xo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===$o||n===qo||n===Yo||n===Zo||n===Ko||n===la||n===Jo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===$o||n===qo)return a===Rt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Yo)return a===Rt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Zo)return s.COMPRESSED_R11_EAC;if(n===Ko)return s.COMPRESSED_SIGNED_R11_EAC;if(n===la)return s.COMPRESSED_RG11_EAC;if(n===Jo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===jo||n===Qo||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===al||n===ol||n===ll||n===cl||n===ul||n===dl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===jo)return a===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Qo)return a===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===el)return a===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===tl)return a===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===nl)return a===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===il)return a===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===sl)return a===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===rl)return a===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===al)return a===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ol)return a===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ll)return a===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===cl)return a===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ul)return a===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===dl)return a===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===hl||n===fl||n===pl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===hl)return a===Rt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===fl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===pl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ml||n===gl||n===ca||n===_l)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===ml)return s.COMPRESSED_RED_RGTC1_EXT;if(n===gl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ca)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===_l)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===yr?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const uS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dS=`
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

}`;class hS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new ju(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new qn({vertexShader:uS,fragmentShader:dS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Lt(new Rr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fS extends ui{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,p=null;const _=typeof XRWebGLBinding<"u",g=new hS,m={},v=t.getContextAttributes();let x=null,y=null;const S=[],M=[],C=new ge;let b=null;const T=new on;T.viewport=new Mt;const P=new on;P.viewport=new Mt;const L=[T,P],B=new em;let Q=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let ae=S[H];return ae===void 0&&(ae=new Io,S[H]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(H){let ae=S[H];return ae===void 0&&(ae=new Io,S[H]=ae),ae.getGripSpace()},this.getHand=function(H){let ae=S[H];return ae===void 0&&(ae=new Io,S[H]=ae),ae.getHandSpace()};function z(H){const ae=M.indexOf(H.inputSource);if(ae===-1)return;const ue=S[ae];ue!==void 0&&(ue.update(H.inputSource,H.frame,c||a),ue.dispatchEvent({type:H.type,data:H.inputSource}))}function Y(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",K);for(let H=0;H<S.length;H++){const ae=M[H];ae!==null&&(M[H]=null,S[H].disconnect(ae))}Q=null,J=null,g.reset();for(const H in m)delete m[H];e.setRenderTarget(x),f=null,h=null,d=null,i=null,y=null,tt.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){s=H,n.isPresenting===!0&&Re("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,n.isPresenting===!0&&Re("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(H){if(i=H,i!==null){if(x=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",K),v.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,ye=null,$=null;v.depth&&($=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=v.stencil?is:Ai,ye=v.stencil?yr:Kn);const D={colorFormat:t.RGBA8,depthFormat:$,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(D),i.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new $n(h.textureWidth,h.textureHeight,{format:Tn,type:Ln,depthTexture:new ks(h.textureWidth,h.textureHeight,ye,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ue={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,ue),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new $n(f.framebufferWidth,f.framebufferHeight,{format:Tn,type:Ln,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),tt.setContext(i),tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function K(H){for(let ae=0;ae<H.removed.length;ae++){const ue=H.removed[ae],ye=M.indexOf(ue);ye>=0&&(M[ye]=null,S[ye].disconnect(ue))}for(let ae=0;ae<H.added.length;ae++){const ue=H.added[ae];let ye=M.indexOf(ue);if(ye===-1){for(let D=0;D<S.length;D++)if(D>=M.length){M.push(ue),ye=D;break}else if(M[D]===null){M[D]=ue,ye=D;break}if(ye===-1)break}const $=S[ye];$&&$.connect(ue)}}const de=new I,pe=new I;function ve(H,ae,ue){de.setFromMatrixPosition(ae.matrixWorld),pe.setFromMatrixPosition(ue.matrixWorld);const ye=de.distanceTo(pe),$=ae.projectionMatrix.elements,D=ue.projectionMatrix.elements,U=$[14]/($[10]-1),O=$[14]/($[10]+1),j=($[9]+1)/$[5],q=($[9]-1)/$[5],ne=($[8]-1)/$[0],oe=(D[8]+1)/D[0],me=U*ne,$e=U*oe,F=ye/(-ne+oe),it=F*-ne;if(ae.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(it),H.translateZ(F),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),$[10]===-1)H.projectionMatrix.copy(ae.projectionMatrix),H.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const ze=U+F,nt=O+F,Me=me-it,Tt=$e+(ye-it),R=j*O/nt*ze,w=q*O/nt*ze;H.projectionMatrix.makePerspective(Me,Tt,R,w,ze,nt),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function Ce(H,ae){ae===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(ae.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(i===null)return;let ae=H.near,ue=H.far;g.texture!==null&&(g.depthNear>0&&(ae=g.depthNear),g.depthFar>0&&(ue=g.depthFar)),B.near=P.near=T.near=ae,B.far=P.far=T.far=ue,(Q!==B.near||J!==B.far)&&(i.updateRenderState({depthNear:B.near,depthFar:B.far}),Q=B.near,J=B.far),B.layers.mask=H.layers.mask|6,T.layers.mask=B.layers.mask&-5,P.layers.mask=B.layers.mask&-3;const ye=H.parent,$=B.cameras;Ce(B,ye);for(let D=0;D<$.length;D++)Ce($[D],ye);$.length===2?ve(B,T,P):B.projectionMatrix.copy(T.projectionMatrix),Be(H,B,ye)};function Be(H,ae,ue){ue===null?H.matrix.copy(ae.matrixWorld):(H.matrix.copy(ue.matrixWorld),H.matrix.invert(),H.matrix.multiply(ae.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(ae.projectionMatrix),H.projectionMatrixInverse.copy(ae.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=br*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(H){l=H,h!==null&&(h.fixedFoveation=H),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=H)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(B)},this.getCameraTexture=function(H){return m[H]};let st=null;function dt(H,ae){if(u=ae.getViewerPose(c||a),p=ae,u!==null){const ue=u.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let ye=!1;ue.length!==B.cameras.length&&(B.cameras.length=0,ye=!0);for(let O=0;O<ue.length;O++){const j=ue[O];let q=null;if(f!==null)q=f.getViewport(j);else{const oe=d.getViewSubImage(h,j);q=oe.viewport,O===0&&(e.setRenderTargetTextures(y,oe.colorTexture,oe.depthStencilTexture),e.setRenderTarget(y))}let ne=L[O];ne===void 0&&(ne=new on,ne.layers.enable(O),ne.viewport=new Mt,L[O]=ne),ne.matrix.fromArray(j.transform.matrix),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.projectionMatrix.fromArray(j.projectionMatrix),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert(),ne.viewport.set(q.x,q.y,q.width,q.height),O===0&&(B.matrix.copy(ne.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),ye===!0&&B.cameras.push(ne)}const $=i.enabledFeatures;if($&&$.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){d=n.getBinding();const O=d.getDepthInformation(ue[0]);O&&O.isValid&&O.texture&&g.init(O,i.renderState)}if($&&$.includes("camera-access")&&_){e.state.unbindTexture(),d=n.getBinding();for(let O=0;O<ue.length;O++){const j=ue[O].camera;if(j){let q=m[j];q||(q=new ju,m[j]=q);const ne=d.getCameraImage(j);q.sourceTexture=ne}}}}for(let ue=0;ue<S.length;ue++){const ye=M[ue],$=S[ue];ye!==null&&$!==void 0&&$.update(ye,ae,c||a)}st&&st(H,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),p=null}const tt=new om;tt.setAnimationLoop(dt),this.setAnimationLoop=function(H){st=H},this.dispose=function(){}}}const pS=new rt,pm=new ct;pm.set(-1,0,0,0,1,0,0,0,1);function mS(r,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Pp(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,v,x,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),d(g,m)):m.isMeshPhongMaterial?(s(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),h(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),_(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,v,x):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===An&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===An&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const v=e.get(m),x=v.envMap,y=v.envMapRotation;x&&(g.envMap.value=x,g.envMapRotation.value.setFromMatrix4(pS.makeRotationFromEuler(y)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(pm),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,v,x){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=x*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,v){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===An&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const v=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function gS(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,x){const y=x.program;n.uniformBlockBinding(v,y)}function c(v,x){let y=i[v.id];y===void 0&&(p(v),y=u(v),i[v.id]=y,v.addEventListener("dispose",g));const S=x.program;n.updateUBOMapping(v,S);const M=e.render.frame;s[v.id]!==M&&(h(v),s[v.id]=M)}function u(v){const x=d();v.__bindingPointIndex=x;const y=r.createBuffer(),S=v.__size,M=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,S,M),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,y),y}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Ye("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const x=i[v.id],y=v.uniforms,S=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let M=0,C=y.length;M<C;M++){const b=Array.isArray(y[M])?y[M]:[y[M]];for(let T=0,P=b.length;T<P;T++){const L=b[T];if(f(L,M,T,S)===!0){const B=L.__offset,Q=Array.isArray(L.value)?L.value:[L.value];let J=0;for(let z=0;z<Q.length;z++){const Y=Q[z],K=_(Y);typeof Y=="number"||typeof Y=="boolean"?(L.__data[0]=Y,r.bufferSubData(r.UNIFORM_BUFFER,B+J,L.__data)):Y.isMatrix3?(L.__data[0]=Y.elements[0],L.__data[1]=Y.elements[1],L.__data[2]=Y.elements[2],L.__data[3]=0,L.__data[4]=Y.elements[3],L.__data[5]=Y.elements[4],L.__data[6]=Y.elements[5],L.__data[7]=0,L.__data[8]=Y.elements[6],L.__data[9]=Y.elements[7],L.__data[10]=Y.elements[8],L.__data[11]=0):ArrayBuffer.isView(Y)?L.__data.set(new Y.constructor(Y.buffer,Y.byteOffset,L.__data.length)):(Y.toArray(L.__data,J),J+=K.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,B,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(v,x,y,S){const M=v.value,C=x+"_"+y;if(S[C]===void 0)return typeof M=="number"||typeof M=="boolean"?S[C]=M:ArrayBuffer.isView(M)?S[C]=M.slice():S[C]=M.clone(),!0;{const b=S[C];if(typeof M=="number"||typeof M=="boolean"){if(b!==M)return S[C]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(b.equals(M)===!1)return b.copy(M),!0}}return!1}function p(v){const x=v.uniforms;let y=0;const S=16;for(let C=0,b=x.length;C<b;C++){const T=Array.isArray(x[C])?x[C]:[x[C]];for(let P=0,L=T.length;P<L;P++){const B=T[P],Q=Array.isArray(B.value)?B.value:[B.value];for(let J=0,z=Q.length;J<z;J++){const Y=Q[J],K=_(Y),de=y%S,pe=de%K.boundary,ve=de+pe;y+=pe,ve!==0&&S-ve<K.storage&&(y+=S-ve),B.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=y,y+=K.storage}}}const M=y%S;return M>0&&(y+=S-M),v.__size=y,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?Re("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(x.boundary=16,x.storage=v.byteLength):Re("WebGLRenderer: Unsupported uniform value type.",v),x}function g(v){const x=v.target;x.removeEventListener("dispose",g);const y=a.indexOf(x.__bindingPointIndex);a.splice(y,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function m(){for(const v in i)r.deleteBuffer(i[v]);a=[],i={},s={}}return{bind:l,update:c,dispose:m}}const _S=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let gi=null;function vS(){return gi===null&&(gi=new li(_S,16,16,os,Ti),gi.name="DFG_LUT",gi.minFilter=Bt,gi.magFilter=Bt,gi.wrapS=Un,gi.wrapT=Un,gi.generateMipmaps=!1,gi.needsUpdate=!0),gi}class mm{constructor(e={}){const{canvas:t=ap(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=Ln}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const _=f,g=new Set([Ul,Dl,Ta]),m=new Set([Ln,Kn,xr,yr,Il,Pl]),v=new Uint32Array(4),x=new Int32Array(4),y=new I;let S=null,M=null;const C=[],b=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let L=!1,B=null;this._outputColorSpace=Pn;let Q=0,J=0,z=null,Y=-1,K=null;const de=new Mt,pe=new Mt;let ve=null;const Ce=new Fe(0);let Be=0,st=t.width,dt=t.height,tt=1,H=null,ae=null;const ue=new Mt(0,0,st,dt),ye=new Mt(0,0,st,dt);let $=!1;const D=new Ar;let U=!1,O=!1;const j=new rt,q=new I,ne=new Mt,oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let me=!1;function $e(){return z===null?tt:1}let F=n;function it(A,X){return t.getContext(A,X)}try{const A={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Al}`),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",N,!1),t.addEventListener("webglcontextcreationerror",k,!1),F===null){const X="webgl2";if(F=it(X,A),F===null)throw it(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw Ye("WebGLRenderer: "+A.message),A}let ze,nt,Me,Tt,R,w,Z,ce,_e,be,Se,re,he,Ue,Ve,Ae,Ee,lt,ht,bt,V,we,le;function Oe(){ze=new xb(F),ze.init(),V=new fm(F,ze),nt=new db(F,ze,e,V),Me=new lS(F,ze),nt.reversedDepthBuffer&&h&&Me.buffers.depth.setReversed(!0),Tt=new Mb(F),R=new YM,w=new cS(F,ze,Me,R,nt,V,Tt),Z=new vb(P),ce=new T0(F),we=new cb(F,ce),_e=new yb(F,ce,Tt,we),be=new wb(F,_e,ce,we,Tt),lt=new Sb(F,nt,w),Ve=new hb(R),Se=new qM(P,Z,ze,nt,we,Ve),re=new mS(P,R),he=new KM,Ue=new nS(ze),Ee=new lb(P,Z,Me,be,p,l),Ae=new oS(P,be,nt),le=new gS(F,Tt,nt,Me),ht=new ub(F,ze,Tt),bt=new bb(F,ze,Tt),Tt.programs=Se.programs,P.capabilities=nt,P.extensions=ze,P.properties=R,P.renderLists=he,P.shadowMap=Ae,P.state=Me,P.info=Tt}Oe(),_!==Ln&&(T=new Tb(_,t.width,t.height,i,s));const Te=new fS(P,F);this.xr=Te,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const A=ze.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=ze.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(A){A!==void 0&&(tt=A,this.setSize(st,dt,!1))},this.getSize=function(A){return A.set(st,dt)},this.setSize=function(A,X,ie=!0){if(Te.isPresenting){Re("WebGLRenderer: Can't change size while VR device is presenting.");return}st=A,dt=X,t.width=Math.floor(A*tt),t.height=Math.floor(X*tt),ie===!0&&(t.style.width=A+"px",t.style.height=X+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,A,X)},this.getDrawingBufferSize=function(A){return A.set(st*tt,dt*tt).floor()},this.setDrawingBufferSize=function(A,X,ie){st=A,dt=X,tt=ie,t.width=Math.floor(A*ie),t.height=Math.floor(X*ie),this.setViewport(0,0,A,X)},this.setEffects=function(A){if(_===Ln){Ye("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let X=0;X<A.length;X++)if(A[X].isOutputPass===!0){Re("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(de)},this.getViewport=function(A){return A.copy(ue)},this.setViewport=function(A,X,ie,ee){A.isVector4?ue.set(A.x,A.y,A.z,A.w):ue.set(A,X,ie,ee),Me.viewport(de.copy(ue).multiplyScalar(tt).round())},this.getScissor=function(A){return A.copy(ye)},this.setScissor=function(A,X,ie,ee){A.isVector4?ye.set(A.x,A.y,A.z,A.w):ye.set(A,X,ie,ee),Me.scissor(pe.copy(ye).multiplyScalar(tt).round())},this.getScissorTest=function(){return $},this.setScissorTest=function(A){Me.setScissorTest($=A)},this.setOpaqueSort=function(A){H=A},this.setTransparentSort=function(A){ae=A},this.getClearColor=function(A){return A.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor(...arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha(...arguments)},this.clear=function(A=!0,X=!0,ie=!0){let ee=0;if(A){let te=!1;if(z!==null){const ke=z.texture.format;te=g.has(ke)}if(te){const ke=z.texture.type,We=m.has(ke),Ne=Ee.getClearColor(),Ze=Ee.getClearAlpha(),Je=Ne.r,ft=Ne.g,_t=Ne.b;We?(v[0]=Je,v[1]=ft,v[2]=_t,v[3]=Ze,F.clearBufferuiv(F.COLOR,0,v)):(x[0]=Je,x[1]=ft,x[2]=_t,x[3]=Ze,F.clearBufferiv(F.COLOR,0,x))}else ee|=F.COLOR_BUFFER_BIT}X&&(ee|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ie&&(ee|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ee!==0&&F.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),B=A},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",N,!1),t.removeEventListener("webglcontextcreationerror",k,!1),Ee.dispose(),he.dispose(),Ue.dispose(),R.dispose(),Z.dispose(),be.dispose(),we.dispose(),le.dispose(),Se.dispose(),Te.dispose(),Te.removeEventListener("sessionstart",je),Te.removeEventListener("sessionend",Pt),ot.stop()};function xe(A){A.preventDefault(),ga("WebGLRenderer: Context Lost."),L=!0}function N(){ga("WebGLRenderer: Context Restored."),L=!1;const A=Tt.autoReset,X=Ae.enabled,ie=Ae.autoUpdate,ee=Ae.needsUpdate,te=Ae.type;Oe(),Tt.autoReset=A,Ae.enabled=X,Ae.autoUpdate=ie,Ae.needsUpdate=ee,Ae.type=te}function k(A){Ye("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function se(A){const X=A.target;X.removeEventListener("dispose",se),Ie(X)}function Ie(A){Xe(A),R.remove(A)}function Xe(A){const X=R.get(A).programs;X!==void 0&&(X.forEach(function(ie){Se.releaseProgram(ie)}),A.isShaderMaterial&&Se.releaseShaderCache(A))}this.renderBufferDirect=function(A,X,ie,ee,te,ke){X===null&&(X=oe);const We=te.isMesh&&te.matrixWorld.determinant()<0,Ne=Mm(A,X,ie,ee,te);Me.setMaterial(ee,We);let Ze=ie.index,Je=1;if(ee.wireframe===!0){if(Ze=_e.getWireframeAttribute(ie),Ze===void 0)return;Je=2}const ft=ie.drawRange,_t=ie.attributes.position;let Qe=ft.start*Je,Dt=(ft.start+ft.count)*Je;ke!==null&&(Qe=Math.max(Qe,ke.start*Je),Dt=Math.min(Dt,(ke.start+ke.count)*Je)),Ze!==null?(Qe=Math.max(Qe,0),Dt=Math.min(Dt,Ze.count)):_t!=null&&(Qe=Math.max(Qe,0),Dt=Math.min(Dt,_t.count));const $t=Dt-Qe;if($t<0||$t===1/0)return;we.setup(te,ee,Ne,ie,Ze);let Gt,Nt=ht;if(Ze!==null&&(Gt=ce.get(Ze),Nt=bt,Nt.setIndex(Gt)),te.isMesh)ee.wireframe===!0?(Me.setLineWidth(ee.wireframeLinewidth*$e()),Nt.setMode(F.LINES)):Nt.setMode(F.TRIANGLES);else if(te.isLine){let pn=ee.linewidth;pn===void 0&&(pn=1),Me.setLineWidth(pn*$e()),te.isLineSegments?Nt.setMode(F.LINES):te.isLineLoop?Nt.setMode(F.LINE_LOOP):Nt.setMode(F.LINE_STRIP)}else te.isPoints?Nt.setMode(F.POINTS):te.isSprite&&Nt.setMode(F.TRIANGLES);if(te.isBatchedMesh)if(ze.get("WEBGL_multi_draw"))Nt.renderMultiDraw(te._multiDrawStarts,te._multiDrawCounts,te._multiDrawCount);else{const pn=te._multiDrawStarts,He=te._multiDrawCounts,kn=te._multiDrawCount,wt=Ze?ce.get(Ze).bytesPerElement:1,Yn=R.get(ee).currentProgram.getUniforms();for(let hi=0;hi<kn;hi++)Yn.setValue(F,"_gl_DrawID",hi),Nt.render(pn[hi]/wt,He[hi])}else if(te.isInstancedMesh)Nt.renderInstances(Qe,$t,te.count);else if(ie.isInstancedBufferGeometry){const pn=ie._maxInstanceCount!==void 0?ie._maxInstanceCount:1/0,He=Math.min(ie.instanceCount,pn);Nt.renderInstances(Qe,$t,He)}else Nt.render(Qe,$t)};function Ke(A,X,ie){A.transparent===!0&&A.side===xi&&A.forceSinglePass===!1?(A.side=An,A.needsUpdate=!0,Xt(A,X,ie),A.side=Bi,A.needsUpdate=!0,Xt(A,X,ie),A.side=xi):Xt(A,X,ie)}this.compile=function(A,X,ie=null){ie===null&&(ie=A),M=Ue.get(ie),M.init(X),b.push(M),ie.traverseVisible(function(te){te.isLight&&te.layers.test(X.layers)&&(M.pushLight(te),te.castShadow&&M.pushShadow(te))}),A!==ie&&A.traverseVisible(function(te){te.isLight&&te.layers.test(X.layers)&&(M.pushLight(te),te.castShadow&&M.pushShadow(te))}),M.setupLights();const ee=new Set;return A.traverse(function(te){if(!(te.isMesh||te.isPoints||te.isLine||te.isSprite))return;const ke=te.material;if(ke)if(Array.isArray(ke))for(let We=0;We<ke.length;We++){const Ne=ke[We];Ke(Ne,ie,te),ee.add(Ne)}else Ke(ke,ie,te),ee.add(ke)}),M=b.pop(),ee},this.compileAsync=function(A,X,ie=null){const ee=this.compile(A,X,ie);return new Promise(te=>{function ke(){if(ee.forEach(function(We){R.get(We).currentProgram.isReady()&&ee.delete(We)}),ee.size===0){te(A);return}setTimeout(ke,10)}ze.get("KHR_parallel_shader_compile")!==null?ke():setTimeout(ke,10)})};let vt=null;function It(A){vt&&vt(A)}function je(){ot.stop()}function Pt(){ot.start()}const ot=new om;ot.setAnimationLoop(It),typeof self<"u"&&ot.setContext(self),this.setAnimationLoop=function(A){vt=A,Te.setAnimationLoop(A),A===null?ot.stop():ot.start()},Te.addEventListener("sessionstart",je),Te.addEventListener("sessionend",Pt),this.render=function(A,X){if(X!==void 0&&X.isCamera!==!0){Ye("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;B!==null&&B.renderStart(A,X);const ie=Te.enabled===!0&&Te.isPresenting===!0,ee=T!==null&&(z===null||ie)&&T.begin(P,z);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Te.enabled===!0&&Te.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Te.cameraAutoUpdate===!0&&Te.updateCamera(X),X=Te.getCamera()),A.isScene===!0&&A.onBeforeRender(P,A,X,z),M=Ue.get(A,b.length),M.init(X),M.state.textureUnits=w.getTextureUnits(),b.push(M),j.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),D.setFromProjectionMatrix(j,Hn,X.reversedDepth),O=this.localClippingEnabled,U=Ve.init(this.clippingPlanes,O),S=he.get(A,C.length),S.init(),C.push(S),Te.enabled===!0&&Te.isPresenting===!0){const We=P.xr.getDepthSensingMesh();We!==null&&gt(We,X,-1/0,P.sortObjects)}gt(A,X,0,P.sortObjects),S.finish(),P.sortObjects===!0&&S.sort(H,ae),me=Te.enabled===!1||Te.isPresenting===!1||Te.hasDepthSensing()===!1,me&&Ee.addToRenderList(S,A),this.info.render.frame++,U===!0&&Ve.beginShadows();const te=M.state.shadowsArray;if(Ae.render(te,A,X),U===!0&&Ve.endShadows(),this.info.autoReset===!0&&this.info.reset(),(ee&&T.hasRenderPass())===!1){const We=S.opaque,Ne=S.transmissive;if(M.setupLights(),X.isArrayCamera){const Ze=X.cameras;if(Ne.length>0)for(let Je=0,ft=Ze.length;Je<ft;Je++){const _t=Ze[Je];Fn(We,Ne,A,_t)}me&&Ee.render(A);for(let Je=0,ft=Ze.length;Je<ft;Je++){const _t=Ze[Je];jt(S,A,_t,_t.viewport)}}else Ne.length>0&&Fn(We,Ne,A,X),me&&Ee.render(A),jt(S,A,X)}z!==null&&J===0&&(w.updateMultisampleRenderTarget(z),w.updateRenderTargetMipmap(z)),ee&&T.end(P),A.isScene===!0&&A.onAfterRender(P,A,X),we.resetDefaultState(),Y=-1,K=null,b.pop(),b.length>0?(M=b[b.length-1],w.setTextureUnits(M.state.textureUnits),U===!0&&Ve.setGlobalState(P.clippingPlanes,M.state.camera)):M=null,C.pop(),C.length>0?S=C[C.length-1]:S=null,B!==null&&B.renderEnd()};function gt(A,X,ie,ee){if(A.visible===!1)return;if(A.layers.test(X.layers)){if(A.isGroup)ie=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(X);else if(A.isLightProbeGrid)M.pushLightProbeGrid(A);else if(A.isLight)M.pushLight(A),A.castShadow&&M.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||D.intersectsSprite(A)){ee&&ne.setFromMatrixPosition(A.matrixWorld).applyMatrix4(j);const We=be.update(A),Ne=A.material;Ne.visible&&S.push(A,We,Ne,ie,ne.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||D.intersectsObject(A))){const We=be.update(A),Ne=A.material;if(ee&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ne.copy(A.boundingSphere.center)):(We.boundingSphere===null&&We.computeBoundingSphere(),ne.copy(We.boundingSphere.center)),ne.applyMatrix4(A.matrixWorld).applyMatrix4(j)),Array.isArray(Ne)){const Ze=We.groups;for(let Je=0,ft=Ze.length;Je<ft;Je++){const _t=Ze[Je],Qe=Ne[_t.materialIndex];Qe&&Qe.visible&&S.push(A,We,Qe,ie,ne.z,_t)}}else Ne.visible&&S.push(A,We,Ne,ie,ne.z,null)}}const ke=A.children;for(let We=0,Ne=ke.length;We<Ne;We++)gt(ke[We],X,ie,ee)}function jt(A,X,ie,ee){const{opaque:te,transmissive:ke,transparent:We}=A;M.setupLightsView(ie),U===!0&&Ve.setGlobalState(P.clippingPlanes,ie),ee&&Me.viewport(de.copy(ee)),te.length>0&&On(te,X,ie),ke.length>0&&On(ke,X,ie),We.length>0&&On(We,X,ie),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function Fn(A,X,ie,ee){if((ie.isScene===!0?ie.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[ee.id]===void 0){const Qe=ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[ee.id]=new $n(1,1,{generateMipmaps:!0,type:Qe?Ti:Ln,minFilter:bi,samples:Math.max(4,nt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:xt.workingColorSpace})}const ke=M.state.transmissionRenderTarget[ee.id],We=ee.viewport||de;ke.setSize(We.z*P.transmissionResolutionScale,We.w*P.transmissionResolutionScale);const Ne=P.getRenderTarget(),Ze=P.getActiveCubeFace(),Je=P.getActiveMipmapLevel();P.setRenderTarget(ke),P.getClearColor(Ce),Be=P.getClearAlpha(),Be<1&&P.setClearColor(16777215,.5),P.clear(),me&&Ee.render(ie);const ft=P.toneMapping;P.toneMapping=oi;const _t=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),M.setupLightsView(ee),U===!0&&Ve.setGlobalState(P.clippingPlanes,ee),On(A,ie,ee),w.updateMultisampleRenderTarget(ke),w.updateRenderTargetMipmap(ke),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let Dt=0,$t=X.length;Dt<$t;Dt++){const Gt=X[Dt],{object:Nt,geometry:pn,material:He,group:kn}=Gt;if(He.side===xi&&Nt.layers.test(ee.layers)){const wt=He.side;He.side=An,He.needsUpdate=!0,sn(Nt,ie,ee,pn,He,kn),He.side=wt,He.needsUpdate=!0,Qe=!0}}Qe===!0&&(w.updateMultisampleRenderTarget(ke),w.updateRenderTargetMipmap(ke))}P.setRenderTarget(Ne,Ze,Je),P.setClearColor(Ce,Be),_t!==void 0&&(ee.viewport=_t),P.toneMapping=ft}function On(A,X,ie){const ee=X.isScene===!0?X.overrideMaterial:null;for(let te=0,ke=A.length;te<ke;te++){const We=A[te],{object:Ne,geometry:Ze,group:Je}=We;let ft=We.material;ft.allowOverride===!0&&ee!==null&&(ft=ee),Ne.layers.test(ie.layers)&&sn(Ne,X,ie,Ze,ft,Je)}}function sn(A,X,ie,ee,te,ke){A.onBeforeRender(P,X,ie,ee,te,ke),A.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),te.onBeforeRender(P,X,ie,ee,A,ke),te.transparent===!0&&te.side===xi&&te.forceSinglePass===!1?(te.side=An,te.needsUpdate=!0,P.renderBufferDirect(ie,X,ee,te,A,ke),te.side=Bi,te.needsUpdate=!0,P.renderBufferDirect(ie,X,ee,te,A,ke),te.side=xi):P.renderBufferDirect(ie,X,ee,te,A,ke),A.onAfterRender(P,X,ie,ee,te,ke)}function Xt(A,X,ie){X.isScene!==!0&&(X=oe);const ee=R.get(A),te=M.state.lights,ke=M.state.shadowsArray,We=te.state.version,Ne=Se.getParameters(A,te.state,ke,X,ie,M.state.lightProbeGridArray),Ze=Se.getProgramCacheKey(Ne);let Je=ee.programs;ee.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?X.environment:null,ee.fog=X.fog;const ft=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;ee.envMap=Z.get(A.envMap||ee.environment,ft),ee.envMapRotation=ee.environment!==null&&A.envMap===null?X.environmentRotation:A.envMapRotation,Je===void 0&&(A.addEventListener("dispose",se),Je=new Map,ee.programs=Je);let _t=Je.get(Ze);if(_t!==void 0){if(ee.currentProgram===_t&&ee.lightsStateVersion===We)return Wi(A,Ne),_t}else Ne.uniforms=Se.getUniforms(A),B!==null&&A.isNodeMaterial&&B.build(A,ie,Ne),A.onBeforeCompile(Ne,P),_t=Se.acquireProgram(Ne,Ze),Je.set(Ze,_t),ee.uniforms=Ne.uniforms;const Qe=ee.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Qe.clippingPlanes=Ve.uniform),Wi(A,Ne),ee.needsLights=wm(A),ee.lightsStateVersion=We,ee.needsLights&&(Qe.ambientLightColor.value=te.state.ambient,Qe.lightProbe.value=te.state.probe,Qe.directionalLights.value=te.state.directional,Qe.directionalLightShadows.value=te.state.directionalShadow,Qe.spotLights.value=te.state.spot,Qe.spotLightShadows.value=te.state.spotShadow,Qe.rectAreaLights.value=te.state.rectArea,Qe.ltc_1.value=te.state.rectAreaLTC1,Qe.ltc_2.value=te.state.rectAreaLTC2,Qe.pointLights.value=te.state.point,Qe.pointLightShadows.value=te.state.pointShadow,Qe.hemisphereLights.value=te.state.hemi,Qe.directionalShadowMatrix.value=te.state.directionalShadowMatrix,Qe.spotLightMatrix.value=te.state.spotLightMatrix,Qe.spotLightMap.value=te.state.spotLightMap,Qe.pointShadowMatrix.value=te.state.pointShadowMatrix),ee.lightProbeGrid=M.state.lightProbeGridArray.length>0,ee.currentProgram=_t,ee.uniformsList=null,_t}function jn(A){if(A.uniformsList===null){const X=A.currentProgram.getUniforms();A.uniformsList=Po.seqWithValue(X.seq,A.uniforms)}return A.uniformsList}function Wi(A,X){const ie=R.get(A);ie.outputColorSpace=X.outputColorSpace,ie.batching=X.batching,ie.batchingColor=X.batchingColor,ie.instancing=X.instancing,ie.instancingColor=X.instancingColor,ie.instancingMorph=X.instancingMorph,ie.skinning=X.skinning,ie.morphTargets=X.morphTargets,ie.morphNormals=X.morphNormals,ie.morphColors=X.morphColors,ie.morphTargetsCount=X.morphTargetsCount,ie.numClippingPlanes=X.numClippingPlanes,ie.numIntersection=X.numClipIntersection,ie.vertexAlphas=X.vertexAlphas,ie.vertexTangents=X.vertexTangents,ie.toneMapping=X.toneMapping}function bm(A,X){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;y.setFromMatrixPosition(X.matrixWorld);for(let ie=0,ee=A.length;ie<ee;ie++){const te=A[ie];if(te.texture!==null&&te.boundingBox.containsPoint(y))return te}return null}function Mm(A,X,ie,ee,te){X.isScene!==!0&&(X=oe),w.resetTextureUnits();const ke=X.fog,We=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial?X.environment:null,Ne=z===null?P.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:xt.workingColorSpace,Ze=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial&&!ee.envMap||ee.isMeshPhongMaterial&&!ee.envMap,Je=Z.get(ee.envMap||We,Ze),ft=ee.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,_t=!!ie.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),Qe=!!ie.morphAttributes.position,Dt=!!ie.morphAttributes.normal,$t=!!ie.morphAttributes.color;let Gt=oi;ee.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(Gt=P.toneMapping);const Nt=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,pn=Nt!==void 0?Nt.length:0,He=R.get(ee),kn=M.state.lights;if(U===!0&&(O===!0||A!==K)){const kt=A===K&&ee.id===Y;Ve.setState(ee,A,kt)}let wt=!1;ee.version===He.__version?(He.needsLights&&He.lightsStateVersion!==kn.state.version||He.outputColorSpace!==Ne||te.isBatchedMesh&&He.batching===!1||!te.isBatchedMesh&&He.batching===!0||te.isBatchedMesh&&He.batchingColor===!0&&te.colorTexture===null||te.isBatchedMesh&&He.batchingColor===!1&&te.colorTexture!==null||te.isInstancedMesh&&He.instancing===!1||!te.isInstancedMesh&&He.instancing===!0||te.isSkinnedMesh&&He.skinning===!1||!te.isSkinnedMesh&&He.skinning===!0||te.isInstancedMesh&&He.instancingColor===!0&&te.instanceColor===null||te.isInstancedMesh&&He.instancingColor===!1&&te.instanceColor!==null||te.isInstancedMesh&&He.instancingMorph===!0&&te.morphTexture===null||te.isInstancedMesh&&He.instancingMorph===!1&&te.morphTexture!==null||He.envMap!==Je||ee.fog===!0&&He.fog!==ke||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==Ve.numPlanes||He.numIntersection!==Ve.numIntersection)||He.vertexAlphas!==ft||He.vertexTangents!==_t||He.morphTargets!==Qe||He.morphNormals!==Dt||He.morphColors!==$t||He.toneMapping!==Gt||He.morphTargetsCount!==pn||!!He.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(wt=!0):(wt=!0,He.__version=ee.version);let Yn=He.currentProgram;wt===!0&&(Yn=Xt(ee,X,te),B&&ee.isNodeMaterial&&B.onUpdateProgram(ee,Yn,He));let hi=!1,Xi=!1,Ws=!1;const Ft=Yn.getUniforms(),qt=He.uniforms;if(Me.useProgram(Yn.program)&&(hi=!0,Xi=!0,Ws=!0),ee.id!==Y&&(Y=ee.id,Xi=!0),He.needsLights){const kt=bm(M.state.lightProbeGridArray,te);He.lightProbeGrid!==kt&&(He.lightProbeGrid=kt,Xi=!0)}if(hi||K!==A){Me.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Ft.setValue(F,"projectionMatrix",A.projectionMatrix),Ft.setValue(F,"viewMatrix",A.matrixWorldInverse);const qi=Ft.map.cameraPosition;qi!==void 0&&qi.setValue(F,q.setFromMatrixPosition(A.matrixWorld)),nt.logarithmicDepthBuffer&&Ft.setValue(F,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&Ft.setValue(F,"isOrthographic",A.isOrthographicCamera===!0),K!==A&&(K=A,Xi=!0,Ws=!0)}if(He.needsLights&&(kn.state.directionalShadowMap.length>0&&Ft.setValue(F,"directionalShadowMap",kn.state.directionalShadowMap,w),kn.state.spotShadowMap.length>0&&Ft.setValue(F,"spotShadowMap",kn.state.spotShadowMap,w),kn.state.pointShadowMap.length>0&&Ft.setValue(F,"pointShadowMap",kn.state.pointShadowMap,w)),te.isSkinnedMesh){Ft.setOptional(F,te,"bindMatrix"),Ft.setOptional(F,te,"bindMatrixInverse");const kt=te.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),Ft.setValue(F,"boneTexture",kt.boneTexture,w))}te.isBatchedMesh&&(Ft.setOptional(F,te,"batchingTexture"),Ft.setValue(F,"batchingTexture",te._matricesTexture,w),Ft.setOptional(F,te,"batchingIdTexture"),Ft.setValue(F,"batchingIdTexture",te._indirectTexture,w),Ft.setOptional(F,te,"batchingColorTexture"),te._colorsTexture!==null&&Ft.setValue(F,"batchingColorTexture",te._colorsTexture,w));const $i=ie.morphAttributes;if(($i.position!==void 0||$i.normal!==void 0||$i.color!==void 0)&&lt.update(te,ie,Yn),(Xi||He.receiveShadow!==te.receiveShadow)&&(He.receiveShadow=te.receiveShadow,Ft.setValue(F,"receiveShadow",te.receiveShadow)),(ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial)&&ee.envMap===null&&X.environment!==null&&(qt.envMapIntensity.value=X.environmentIntensity),qt.dfgLUT!==void 0&&(qt.dfgLUT.value=vS()),Xi){if(Ft.setValue(F,"toneMappingExposure",P.toneMappingExposure),He.needsLights&&Sm(qt,Ws),ke&&ee.fog===!0&&re.refreshFogUniforms(qt,ke),re.refreshMaterialUniforms(qt,ee,tt,dt,M.state.transmissionRenderTarget[A.id]),He.needsLights&&He.lightProbeGrid){const kt=He.lightProbeGrid;qt.probesSH.value=kt.texture,qt.probesMin.value.copy(kt.boundingBox.min),qt.probesMax.value.copy(kt.boundingBox.max),qt.probesResolution.value.copy(kt.resolution)}Po.upload(F,jn(He),qt,w)}if(ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(Po.upload(F,jn(He),qt,w),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&Ft.setValue(F,"center",te.center),Ft.setValue(F,"modelViewMatrix",te.modelViewMatrix),Ft.setValue(F,"normalMatrix",te.normalMatrix),Ft.setValue(F,"modelMatrix",te.matrixWorld),ee.uniformsGroups!==void 0){const kt=ee.uniformsGroups;for(let qi=0,Xs=kt.length;qi<Xs;qi++){const Cd=kt[qi];le.update(Cd,Yn),le.bind(Cd,Yn)}}return Yn}function Sm(A,X){A.ambientLightColor.needsUpdate=X,A.lightProbe.needsUpdate=X,A.directionalLights.needsUpdate=X,A.directionalLightShadows.needsUpdate=X,A.pointLights.needsUpdate=X,A.pointLightShadows.needsUpdate=X,A.spotLights.needsUpdate=X,A.spotLightShadows.needsUpdate=X,A.rectAreaLights.needsUpdate=X,A.hemisphereLights.needsUpdate=X}function wm(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return Q},this.getActiveMipmapLevel=function(){return J},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(A,X,ie){const ee=R.get(A);ee.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),R.get(A.texture).__webglTexture=X,R.get(A.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:ie,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,X){const ie=R.get(A);ie.__webglFramebuffer=X,ie.__useDefaultFramebuffer=X===void 0};const Em=F.createFramebuffer();this.setRenderTarget=function(A,X=0,ie=0){z=A,Q=X,J=ie;let ee=null,te=!1,ke=!1;if(A){const Ne=R.get(A);if(Ne.__useDefaultFramebuffer!==void 0){Me.bindFramebuffer(F.FRAMEBUFFER,Ne.__webglFramebuffer),de.copy(A.viewport),pe.copy(A.scissor),ve=A.scissorTest,Me.viewport(de),Me.scissor(pe),Me.setScissorTest(ve),Y=-1;return}else if(Ne.__webglFramebuffer===void 0)w.setupRenderTarget(A);else if(Ne.__hasExternalTextures)w.rebindTextures(A,R.get(A.texture).__webglTexture,R.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const ft=A.depthTexture;if(Ne.__boundDepthTexture!==ft){if(ft!==null&&R.has(ft)&&(A.width!==ft.image.width||A.height!==ft.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(A)}}const Ze=A.texture;(Ze.isData3DTexture||Ze.isDataArrayTexture||Ze.isCompressedArrayTexture)&&(ke=!0);const Je=R.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Je[X])?ee=Je[X][ie]:ee=Je[X],te=!0):A.samples>0&&w.useMultisampledRTT(A)===!1?ee=R.get(A).__webglMultisampledFramebuffer:Array.isArray(Je)?ee=Je[ie]:ee=Je,de.copy(A.viewport),pe.copy(A.scissor),ve=A.scissorTest}else de.copy(ue).multiplyScalar(tt).floor(),pe.copy(ye).multiplyScalar(tt).floor(),ve=$;if(ie!==0&&(ee=Em),Me.bindFramebuffer(F.FRAMEBUFFER,ee)&&Me.drawBuffers(A,ee),Me.viewport(de),Me.scissor(pe),Me.setScissorTest(ve),te){const Ne=R.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ne.__webglTexture,ie)}else if(ke){const Ne=X;for(let Ze=0;Ze<A.textures.length;Ze++){const Je=R.get(A.textures[Ze]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Ze,Je.__webglTexture,ie,Ne)}}else if(A!==null&&ie!==0){const Ne=R.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ne.__webglTexture,ie)}Y=-1},this.readRenderTargetPixels=function(A,X,ie,ee,te,ke,We,Ne=0){if(!(A&&A.isWebGLRenderTarget)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ze=R.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&We!==void 0&&(Ze=Ze[We]),Ze){Me.bindFramebuffer(F.FRAMEBUFFER,Ze);try{const Je=A.textures[Ne],ft=Je.format,_t=Je.type;if(A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Ne),!nt.textureFormatReadable(ft)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!nt.textureTypeReadable(_t)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=A.width-ee&&ie>=0&&ie<=A.height-te&&F.readPixels(X,ie,ee,te,V.convert(ft),V.convert(_t),ke)}finally{const Je=z!==null?R.get(z).__webglFramebuffer:null;Me.bindFramebuffer(F.FRAMEBUFFER,Je)}}},this.readRenderTargetPixelsAsync=async function(A,X,ie,ee,te,ke,We,Ne=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ze=R.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&We!==void 0&&(Ze=Ze[We]),Ze)if(X>=0&&X<=A.width-ee&&ie>=0&&ie<=A.height-te){Me.bindFramebuffer(F.FRAMEBUFFER,Ze);const Je=A.textures[Ne],ft=Je.format,_t=Je.type;if(A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Ne),!nt.textureFormatReadable(ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!nt.textureTypeReadable(_t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Qe=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Qe),F.bufferData(F.PIXEL_PACK_BUFFER,ke.byteLength,F.STREAM_READ),F.readPixels(X,ie,ee,te,V.convert(ft),V.convert(_t),0);const Dt=z!==null?R.get(z).__webglFramebuffer:null;Me.bindFramebuffer(F.FRAMEBUFFER,Dt);const $t=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Tg(F,$t,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Qe),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,ke),F.deleteBuffer(Qe),F.deleteSync($t),ke}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,X=null,ie=0){const ee=Math.pow(2,-ie),te=Math.floor(A.image.width*ee),ke=Math.floor(A.image.height*ee),We=X!==null?X.x:0,Ne=X!==null?X.y:0;w.setTexture2D(A,0),F.copyTexSubImage2D(F.TEXTURE_2D,ie,0,0,We,Ne,te,ke),Me.unbindTexture()};const Tm=F.createFramebuffer(),Am=F.createFramebuffer();this.copyTextureToTexture=function(A,X,ie=null,ee=null,te=0,ke=0){let We,Ne,Ze,Je,ft,_t,Qe,Dt,$t;const Gt=A.isCompressedTexture?A.mipmaps[ke]:A.image;if(ie!==null)We=ie.max.x-ie.min.x,Ne=ie.max.y-ie.min.y,Ze=ie.isBox3?ie.max.z-ie.min.z:1,Je=ie.min.x,ft=ie.min.y,_t=ie.isBox3?ie.min.z:0;else{const qt=Math.pow(2,-te);We=Math.floor(Gt.width*qt),Ne=Math.floor(Gt.height*qt),A.isDataArrayTexture?Ze=Gt.depth:A.isData3DTexture?Ze=Math.floor(Gt.depth*qt):Ze=1,Je=0,ft=0,_t=0}ee!==null?(Qe=ee.x,Dt=ee.y,$t=ee.z):(Qe=0,Dt=0,$t=0);const Nt=V.convert(X.format),pn=V.convert(X.type);let He;X.isData3DTexture?(w.setTexture3D(X,0),He=F.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(w.setTexture2DArray(X,0),He=F.TEXTURE_2D_ARRAY):(w.setTexture2D(X,0),He=F.TEXTURE_2D),Me.activeTexture(F.TEXTURE0),Me.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,X.flipY),Me.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),Me.pixelStorei(F.UNPACK_ALIGNMENT,X.unpackAlignment);const kn=Me.getParameter(F.UNPACK_ROW_LENGTH),wt=Me.getParameter(F.UNPACK_IMAGE_HEIGHT),Yn=Me.getParameter(F.UNPACK_SKIP_PIXELS),hi=Me.getParameter(F.UNPACK_SKIP_ROWS),Xi=Me.getParameter(F.UNPACK_SKIP_IMAGES);Me.pixelStorei(F.UNPACK_ROW_LENGTH,Gt.width),Me.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Gt.height),Me.pixelStorei(F.UNPACK_SKIP_PIXELS,Je),Me.pixelStorei(F.UNPACK_SKIP_ROWS,ft),Me.pixelStorei(F.UNPACK_SKIP_IMAGES,_t);const Ws=A.isDataArrayTexture||A.isData3DTexture,Ft=X.isDataArrayTexture||X.isData3DTexture;if(A.isDepthTexture){const qt=R.get(A),$i=R.get(X),kt=R.get(qt.__renderTarget),qi=R.get($i.__renderTarget);Me.bindFramebuffer(F.READ_FRAMEBUFFER,kt.__webglFramebuffer),Me.bindFramebuffer(F.DRAW_FRAMEBUFFER,qi.__webglFramebuffer);for(let Xs=0;Xs<Ze;Xs++)Ws&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,R.get(A).__webglTexture,te,_t+Xs),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,R.get(X).__webglTexture,ke,$t+Xs)),F.blitFramebuffer(Je,ft,We,Ne,Qe,Dt,We,Ne,F.DEPTH_BUFFER_BIT,F.NEAREST);Me.bindFramebuffer(F.READ_FRAMEBUFFER,null),Me.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(te!==0||A.isRenderTargetTexture||R.has(A)){const qt=R.get(A),$i=R.get(X);Me.bindFramebuffer(F.READ_FRAMEBUFFER,Tm),Me.bindFramebuffer(F.DRAW_FRAMEBUFFER,Am);for(let kt=0;kt<Ze;kt++)Ws?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,qt.__webglTexture,te,_t+kt):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,qt.__webglTexture,te),Ft?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,$i.__webglTexture,ke,$t+kt):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,$i.__webglTexture,ke),te!==0?F.blitFramebuffer(Je,ft,We,Ne,Qe,Dt,We,Ne,F.COLOR_BUFFER_BIT,F.NEAREST):Ft?F.copyTexSubImage3D(He,ke,Qe,Dt,$t+kt,Je,ft,We,Ne):F.copyTexSubImage2D(He,ke,Qe,Dt,Je,ft,We,Ne);Me.bindFramebuffer(F.READ_FRAMEBUFFER,null),Me.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Ft?A.isDataTexture||A.isData3DTexture?F.texSubImage3D(He,ke,Qe,Dt,$t,We,Ne,Ze,Nt,pn,Gt.data):X.isCompressedArrayTexture?F.compressedTexSubImage3D(He,ke,Qe,Dt,$t,We,Ne,Ze,Nt,Gt.data):F.texSubImage3D(He,ke,Qe,Dt,$t,We,Ne,Ze,Nt,pn,Gt):A.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,ke,Qe,Dt,We,Ne,Nt,pn,Gt.data):A.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,ke,Qe,Dt,Gt.width,Gt.height,Nt,Gt.data):F.texSubImage2D(F.TEXTURE_2D,ke,Qe,Dt,We,Ne,Nt,pn,Gt);Me.pixelStorei(F.UNPACK_ROW_LENGTH,kn),Me.pixelStorei(F.UNPACK_IMAGE_HEIGHT,wt),Me.pixelStorei(F.UNPACK_SKIP_PIXELS,Yn),Me.pixelStorei(F.UNPACK_SKIP_ROWS,hi),Me.pixelStorei(F.UNPACK_SKIP_IMAGES,Xi),ke===0&&X.generateMipmaps&&F.generateMipmap(He),Me.unbindTexture()},this.initRenderTarget=function(A){R.get(A).__webglFramebuffer===void 0&&w.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?w.setTextureCube(A,0):A.isData3DTexture?w.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?w.setTexture2DArray(A,0):w.setTexture2D(A,0),Me.unbindTexture()},this.resetState=function(){Q=0,J=0,z=null,Me.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=xt._getDrawingBufferColorSpace(e),t.unpackColorSpace=xt._getUnpackColorSpace()}}const xS=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Lu,AddEquation:ns,AddOperation:$f,AdditiveAnimationBlendMode:Hu,AdditiveBlending:lu,AgXToneMapping:Uu,AlphaFormat:Vu,AlwaysCompare:sp,AlwaysDepth:Fo,AlwaysStencilFunc:fu,AmbientLight:Zp,AnimationAction:sm,AnimationClip:Ma,AnimationLoader:_v,AnimationMixer:qv,AnimationObjectGroup:Xv,AnimationUtils:fv,ArcCurve:bp,ArrayCamera:em,ArrowHelper:_0,AttachedBindMode:du,Audio:nm,AudioAnalyser:Nv,AudioContext:_d,AudioListener:Lv,AudioLoader:Cv,AxesHelper:v0,BackSide:An,BasicDepthPacking:Jf,BasicShadowMap:Dm,BatchedMesh:mp,BezierInterpolant:Gp,Bone:Ku,BooleanKeyframeTrack:Gs,Box2:n0,Box3:Qt,Box3Helper:m0,BoxGeometry:ds,BoxHelper:p0,BufferAttribute:Ut,BufferGeometry:ut,BufferGeometryLoader:jp,ByteType:Ou,Cache:Mi,Camera:rc,CameraHelper:f0,CanvasTexture:L_,CapsuleGeometry:ql,CatmullRomCurve3:Mp,CineonToneMapping:Pu,CircleGeometry:Yl,ClampToEdgeWrapping:Un,Clock:Qv,Color:Fe,ColorKeyframeTrack:hd,ColorManagement:xt,Compatibility:bg,CompressedArrayTexture:I_,CompressedCubeTexture:P_,CompressedTexture:$l,CompressedTextureLoader:vv,ConeGeometry:Vs,ConstantAlphaFactor:Hf,ConstantColorFactor:Vf,Controls:y0,CubeCamera:Qp,CubeDepthTexture:xp,CubeReflectionMapping:Ei,CubeRefractionMapping:as,CubeTexture:Aa,CubeTextureLoader:xv,CubeUVReflectionMapping:Er,CubicBezierCurve:ed,CubicBezierCurve3:Sp,CubicInterpolant:zp,CullFaceBack:ou,CullFaceFront:Ef,CullFaceFrontBack:Lm,CullFaceNone:wf,Curve:di,CurvePath:Ep,CustomBlending:Af,CustomToneMapping:Du,CylinderGeometry:Ca,Cylindrical:t0,Data3DTexture:Bl,DataArrayTexture:kl,DataTexture:li,DataTextureLoader:yv,DataUtils:i_,DecrementStencilOp:jm,DecrementWrapStencilOp:eg,DefaultLoadingManager:Wp,DepthFormat:Ai,DepthStencilFormat:is,DepthTexture:ks,DetachedBindMode:qf,DirectionalLight:Yp,DirectionalLightHelper:h0,DiscreteInterpolant:Vp,DodecahedronGeometry:Zl,DoubleSide:xi,DstAlphaFactor:Ff,DstColorFactor:kf,DynamicCopyUsage:mg,DynamicDrawUsage:cg,DynamicReadUsage:hg,EdgesGeometry:yp,EllipseCurve:Kl,EqualCompare:tp,EqualDepth:ko,EqualStencilFunc:sg,EquirectangularReflectionMapping:Kr,EquirectangularRefractionMapping:Jr,Euler:ci,EventDispatcher:ui,ExternalTexture:ju,ExtrudeGeometry:Jl,FileLoader:Vi,Float16BufferAttribute:u_,Float32BufferAttribute:Ge,FloatType:En,Fog:Gl,FogExp2:Vl,FramebufferTexture:R_,FrontSide:Bi,Frustum:Ar,FrustumArray:Xl,GLBufferAttribute:Jv,GLSL1:_g,GLSL3:pu,GreaterCompare:np,GreaterDepth:zo,GreaterEqualCompare:Ol,GreaterEqualDepth:Bo,GreaterEqualStencilFunc:lg,GreaterStencilFunc:ag,GridHelper:u0,Group:_r,HTMLTexture:D_,HalfFloatType:Ti,HemisphereLight:Xp,HemisphereLightHelper:c0,IcosahedronGeometry:jl,ImageBitmapLoader:Av,ImageLoader:Sa,ImageUtils:lp,IncrementStencilOp:Jm,IncrementWrapStencilOp:Qm,InstancedBufferAttribute:Mr,InstancedBufferGeometry:gd,InstancedInterleavedBuffer:El,InstancedMesh:pp,Int16BufferAttribute:l_,Int32BufferAttribute:c_,Int8BufferAttribute:r_,IntType:Rl,InterleavedBuffer:Hl,InterleavedBufferAttribute:Wn,Interpolant:Ir,InterpolateBezier:hu,InterpolateDiscrete:ua,InterpolateLinear:vl,InterpolateSmooth:Ro,InterpolationSamplingMode:yg,InterpolationSamplingType:xg,InvertStencilOp:tg,KeepStencilOp:Ts,KeyframeTrack:Jn,LOD:hp,LatheGeometry:Ql,Layers:zl,LessCompare:ep,LessDepth:Oo,LessEqualCompare:Fl,LessEqualDepth:Fs,LessEqualStencilFunc:rg,LessStencilFunc:ig,Light:fs,LightProbe:Jp,Line:cs,Line3:rm,LineBasicMaterial:Cn,LineCurve:td,LineCurve3:wp,LineDashedMaterial:kp,LineLoop:gp,LineSegments:Ci,LinearFilter:Bt,LinearInterpolant:dd,LinearMipMapLinearFilter:km,LinearMipMapNearestFilter:Om,LinearMipmapLinearFilter:bi,LinearMipmapNearestFilter:jr,LinearSRGBColorSpace:ha,LinearToneMapping:Ru,LinearTransfer:fa,Loader:Nn,LoaderUtils:xu,LoadingManager:fd,LoopOnce:Yf,LoopPingPong:Kf,LoopRepeat:Zf,MOUSE:Im,Material:cn,MaterialBlending:Um,MaterialLoader:ac,MathUtils:yl,Matrix2:bu,Matrix3:ct,Matrix4:rt,MaxEquation:Pf,Mesh:Lt,MeshBasicMaterial:an,MeshDepthMaterial:ld,MeshDistanceMaterial:cd,MeshLambertMaterial:Fp,MeshMatcapMaterial:Op,MeshNormalMaterial:Np,MeshPhongMaterial:Dp,MeshPhysicalMaterial:Lp,MeshStandardMaterial:od,MeshToonMaterial:Up,MinEquation:If,MirroredRepeatWrapping:oa,MixOperation:Xf,MultiplyBlending:uu,MultiplyOperation:Ea,NearestFilter:Kt,NearestMipMapLinearFilter:Fm,NearestMipMapNearestFilter:Nm,NearestMipmapLinearFilter:mr,NearestMipmapNearestFilter:Fu,NeutralToneMapping:Nu,NeverCompare:Qf,NeverDepth:No,NeverStencilFunc:ng,NoBlending:wi,NoColorSpace:Ni,NoNormalPacking:$m,NoToneMapping:oi,NormalAnimationBlendMode:Nl,NormalBlending:Ls,NormalGAPacking:Ym,NormalRGPacking:qm,NotEqualCompare:ip,NotEqualDepth:Vo,NotEqualStencilFunc:og,NumberKeyframeTrack:ya,Object3D:St,ObjectLoader:Ev,ObjectSpaceNormalMap:jf,OctahedronGeometry:Cr,OneFactor:Df,OneMinusConstantAlphaFactor:Wf,OneMinusConstantColorFactor:Gf,OneMinusDstAlphaFactor:Of,OneMinusDstColorFactor:Bf,OneMinusSrcAlphaFactor:Uo,OneMinusSrcColorFactor:Nf,OrthographicCamera:Pa,PCFShadowMap:Zr,PCFSoftShadowMap:Tf,PMREMGenerator:Su,Path:wl,PerspectiveCamera:on,Plane:ts,PlaneGeometry:Rr,PlaneHelper:g0,PointLight:qp,PointLightHelper:o0,Points:_p,PointsMaterial:Ju,PolarGridHelper:d0,PolyhedronGeometry:hs,PositionalAudio:Uv,PropertyBinding:Et,PropertyMixer:im,QuadraticBezierCurve:nd,QuadraticBezierCurve3:id,Quaternion:vn,QuaternionKeyframeTrack:Ia,QuaternionLinearInterpolant:Hp,R11_EAC_Format:Zo,RED_GREEN_RGTC2_Format:ca,RED_RGTC1_Format:ml,REVISION:Al,RG11_EAC_Format:la,RGBADepthPacking:Hm,RGBAFormat:Tn,RGBAIntegerFormat:Ul,RGBA_ASTC_10x10_Format:cl,RGBA_ASTC_10x5_Format:al,RGBA_ASTC_10x6_Format:ol,RGBA_ASTC_10x8_Format:ll,RGBA_ASTC_12x10_Format:ul,RGBA_ASTC_12x12_Format:dl,RGBA_ASTC_4x4_Format:jo,RGBA_ASTC_5x4_Format:Qo,RGBA_ASTC_5x5_Format:el,RGBA_ASTC_6x5_Format:tl,RGBA_ASTC_6x6_Format:nl,RGBA_ASTC_8x5_Format:il,RGBA_ASTC_8x6_Format:sl,RGBA_ASTC_8x8_Format:rl,RGBA_BPTC_Format:hl,RGBA_ETC2_EAC_Format:Yo,RGBA_PVRTC_2BPPV1_Format:Xo,RGBA_PVRTC_4BPPV1_Format:Wo,RGBA_S3TC_DXT1_Format:ea,RGBA_S3TC_DXT3_Format:ta,RGBA_S3TC_DXT5_Format:na,RGBDepthPacking:Wm,RGBFormat:Gu,RGBIntegerFormat:Bm,RGB_BPTC_SIGNED_Format:fl,RGB_BPTC_UNSIGNED_Format:pl,RGB_ETC1_Format:$o,RGB_ETC2_Format:qo,RGB_PVRTC_2BPPV1_Format:Ho,RGB_PVRTC_4BPPV1_Format:Go,RGB_S3TC_DXT1_Format:Qr,RGDepthPacking:Xm,RGFormat:os,RGIntegerFormat:Dl,RawShaderMaterial:ad,Ray:Tr,Raycaster:jv,RectAreaLight:Kp,RedFormat:Ll,RedIntegerFormat:Ta,ReinhardToneMapping:Iu,RenderTarget:Xu,RenderTarget3D:Yv,RepeatWrapping:aa,ReplaceStencilOp:Km,ReverseSubtractEquation:Rf,RingGeometry:ec,SIGNED_R11_EAC_Format:Ko,SIGNED_RED_GREEN_RGTC2_Format:_l,SIGNED_RED_RGTC1_Format:gl,SIGNED_RG11_EAC_Format:Jo,SRGBColorSpace:Pn,SRGBTransfer:Rt,Scene:$u,ShaderChunk:mt,ShaderLib:Sn,ShaderMaterial:qn,ShadowMaterial:Ip,Shape:Us,ShapeGeometry:tc,ShapePath:x0,ShapeUtils:ai,ShortType:ku,Skeleton:Wl,SkeletonHelper:a0,SkinnedMesh:fp,Source:ss,Sphere:en,SphereGeometry:ri,Spherical:e0,SphericalHarmonics3:md,SplineCurve:sd,SpotLight:$p,SpotLightHelper:r0,Sprite:dp,SpriteMaterial:Zu,SrcAlphaFactor:Do,SrcAlphaSaturateFactor:zf,SrcColorFactor:Uf,StaticCopyUsage:pg,StaticDrawUsage:pa,StaticReadUsage:dg,StereoCamera:Rv,StreamCopyUsage:gg,StreamDrawUsage:ug,StreamReadUsage:fg,StringKeyframeTrack:Hs,SubtractEquation:Cf,SubtractiveBlending:cu,TOUCH:Pm,TangentSpaceNormalMap:zi,TetrahedronGeometry:Ra,Texture:Vt,TextureLoader:bv,TextureUtils:E0,Timer:tm,TimestampQuery:vg,TorusGeometry:zs,TorusKnotGeometry:nc,Triangle:Dn,TriangleFanDrawMode:Gm,TriangleStripDrawMode:Vm,TrianglesDrawMode:zm,TubeGeometry:ic,UVMapping:Cl,Uint16BufferAttribute:qu,Uint32BufferAttribute:Yu,Uint8BufferAttribute:a_,Uint8ClampedBufferAttribute:o_,Uniform:yd,UniformsGroup:Kv,UniformsLib:Pe,UniformsUtils:sc,UnsignedByteType:Ln,UnsignedInt101111Type:zu,UnsignedInt248Type:yr,UnsignedInt5999Type:Bu,UnsignedIntType:Kn,UnsignedShort4444Type:Il,UnsignedShort5551Type:Pl,UnsignedShortType:xr,VSMShadowMap:pr,Vector2:ge,Vector3:I,Vector4:Mt,VectorKeyframeTrack:ba,VideoFrameTexture:C_,VideoTexture:vp,WebGL3DRenderTarget:Yg,WebGLArrayRenderTarget:qg,WebGLCoordinateSystem:Hn,WebGLCubeRenderTarget:bd,WebGLRenderTarget:$n,WebGLRenderer:mm,WebGLUtils:fm,WebGPUCoordinateSystem:Os,WebXRController:Io,WireframeGeometry:rd,WrapAroundEnding:da,ZeroCurvatureEnding:Rs,ZeroFactor:Lf,ZeroSlopeEnding:Is,ZeroStencilOp:Zm,createCanvasElement:ap,error:Ye,getConsoleFunction:Eg,log:ga,setConsoleFunction:wg,warn:Re,warnOnce:xl},Symbol.toStringTag,{value:"Module"})),of=new Qt,Eo=new I;class gm extends gd{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new Ge(e,3)),this.setAttribute("uv",new Ge(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new El(t,6,1);return this.setAttribute("instanceStart",new Wn(n,3,0)),this.setAttribute("instanceEnd",new Wn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new El(t,6,1);return this.setAttribute("instanceColorStart",new Wn(n,3,0)),this.setAttribute("instanceColorEnd",new Wn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new rd(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qt);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),of.setFromBufferAttribute(t),this.boundingBox.union(of))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new en),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Eo.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Eo)),Eo.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Eo));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}Pe.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ge(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Sn.line={uniforms:sc.merge([Pe.common,Pe.fog,Pe.line]),vertexShader:`
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
		`};class cc extends qn{constructor(e){super({type:"LineMaterial",uniforms:sc.clone(Sn.line.uniforms),vertexShader:Sn.line.vertexShader,fragmentShader:Sn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const eu=new Mt,lf=new I,cf=new I,un=new Mt,dn=new Mt,_i=new Mt,tu=new I,nu=new rt,hn=new rm,uf=new I,To=new Qt,Ao=new en,vi=new Mt;let yi,Ns;function df(r,e,t){return vi.set(0,0,-e,1).applyMatrix4(r.projectionMatrix),vi.multiplyScalar(1/vi.w),vi.x=Ns/t.width,vi.y=Ns/t.height,vi.applyMatrix4(r.projectionMatrixInverse),vi.multiplyScalar(1/vi.w),Math.abs(Math.max(vi.x,vi.y))}function yS(r,e){const t=r.matrixWorld,n=r.geometry,i=n.attributes.instanceStart,s=n.attributes.instanceEnd,a=Math.min(n.instanceCount,i.count);for(let o=0,l=a;o<l;o++){hn.start.fromBufferAttribute(i,o),hn.end.fromBufferAttribute(s,o),hn.applyMatrix4(t);const c=new I,u=new I;yi.distanceSqToSegment(hn.start,hn.end,u,c),u.distanceTo(c)<Ns*.5&&e.push({point:u,pointOnLine:c,distance:yi.origin.distanceTo(u),object:r,face:null,faceIndex:o,uv:null,uv1:null})}}function bS(r,e,t){const n=e.projectionMatrix,s=r.material.resolution,a=r.matrixWorld,o=r.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,u=Math.min(o.instanceCount,l.count),d=-e.near;yi.at(1,_i),_i.w=1,_i.applyMatrix4(e.matrixWorldInverse),_i.applyMatrix4(n),_i.multiplyScalar(1/_i.w),_i.x*=s.x/2,_i.y*=s.y/2,_i.z=0,tu.copy(_i),nu.multiplyMatrices(e.matrixWorldInverse,a);for(let h=0,f=u;h<f;h++){if(un.fromBufferAttribute(l,h),dn.fromBufferAttribute(c,h),un.w=1,dn.w=1,un.applyMatrix4(nu),dn.applyMatrix4(nu),un.z>d&&dn.z>d)continue;if(un.z>d){const x=un.z-dn.z,y=(un.z-d)/x;un.lerp(dn,y)}else if(dn.z>d){const x=dn.z-un.z,y=(dn.z-d)/x;dn.lerp(un,y)}un.applyMatrix4(n),dn.applyMatrix4(n),un.multiplyScalar(1/un.w),dn.multiplyScalar(1/dn.w),un.x*=s.x/2,un.y*=s.y/2,dn.x*=s.x/2,dn.y*=s.y/2,hn.start.copy(un),hn.start.z=0,hn.end.copy(dn),hn.end.z=0;const _=hn.closestPointToPointParameter(tu,!0);hn.at(_,uf);const g=yl.lerp(un.z,dn.z,_),m=g>=-1&&g<=1,v=tu.distanceTo(uf)<Ns*.5;if(m&&v){hn.start.fromBufferAttribute(l,h),hn.end.fromBufferAttribute(c,h),hn.start.applyMatrix4(a),hn.end.applyMatrix4(a);const x=new I,y=new I;yi.distanceSqToSegment(hn.start,hn.end,y,x),t.push({point:y,pointOnLine:x,distance:yi.origin.distanceTo(y),object:r,face:null,faceIndex:h,uv:null,uv1:null})}}}class MS extends Lt{constructor(e=new gm,t=new cc({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)lf.fromBufferAttribute(t,a),cf.fromBufferAttribute(n,a),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+lf.distanceTo(cf);const s=new El(i,2,1);return e.setAttribute("instanceDistanceStart",new Wn(s,1,0)),e.setAttribute("instanceDistanceEnd",new Wn(s,1,1)),this}raycast(e,t){const n=this.material.worldUnits,i=e.camera;i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;yi=e.ray;const a=this.matrixWorld,o=this.geometry,l=this.material;Ns=l.linewidth+s,o.boundingSphere===null&&o.computeBoundingSphere(),Ao.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=Ns*.5;else{const d=Math.max(i.near,Ao.distanceToPoint(yi.origin));c=df(i,d,l.resolution)}if(Ao.radius+=c,yi.intersectsSphere(Ao)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),To.copy(o.boundingBox).applyMatrix4(a);let u;if(n)u=Ns*.5;else{const d=Math.max(i.near,To.distanceToPoint(yi.origin));u=df(i,d,l.resolution)}To.expandByScalar(u),yi.intersectsBox(To)!==!1&&(n?yS(this,t):bS(this,i,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(eu),this.material.uniforms.resolution.value.set(eu.z,eu.w))}}class Md extends gm{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}setFromPoints(e){const t=e.length-1,n=new Float32Array(6*t);for(let i=0;i<t;i++)n[6*i]=e[i].x,n[6*i+1]=e[i].y,n[6*i+2]=e[i].z||0,n[6*i+3]=e[i+1].x,n[6*i+4]=e[i+1].y,n[6*i+5]=e[i+1].z||0;return super.setPositions(n),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class _m extends MS{constructor(e=new Md,t=new cc({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}class vm extends St{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new ge(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const fr=new I,hf=new rt,ff=new rt,pf=new I,mf=new I;class SS{constructor(e={}){const t=this;let n,i,s,a;const o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.sortObjects=!0,this.getSize=function(){return{width:n,height:i}},this.render=function(p,_){p.matrixWorldAutoUpdate===!0&&p.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),hf.copy(_.matrixWorldInverse),ff.multiplyMatrices(_.projectionMatrix,hf),u(p,p,_),this.sortObjects&&f(p)},this.setSize=function(p,_){n=p,i=_,s=n/2,a=i/2,l.style.width=p+"px",l.style.height=_+"px"};function c(p){p.isCSS2DObject&&(p.element.style.display="none");for(let _=0,g=p.children.length;_<g;_++)c(p.children[_])}function u(p,_,g){if(p.visible===!1){c(p);return}if(p.isCSS2DObject){fr.setFromMatrixPosition(p.matrixWorld),fr.applyMatrix4(ff);const m=fr.z>=-1&&fr.z<=1&&p.layers.test(g.layers)===!0,v=p.element;v.style.display=m===!0?"":"none",m===!0&&(p.onBeforeRender(t,_,g),v.style.transform="translate("+-100*p.center.x+"%,"+-100*p.center.y+"%)translate("+(fr.x*s+s)+"px,"+(-fr.y*a+a)+"px)",v.parentNode!==l&&l.appendChild(v),p.onAfterRender(t,_,g));const x={distanceToCameraSquared:d(g,p)};o.objects.set(p,x)}for(let m=0,v=p.children.length;m<v;m++)u(p.children[m],_,g)}function d(p,_){return pf.setFromMatrixPosition(p.matrixWorld),mf.setFromMatrixPosition(_.matrixWorld),pf.distanceToSquared(mf)}function h(p){const _=[];return p.traverseVisible(function(g){g.isCSS2DObject&&_.push(g)}),_}function f(p){const _=h(p).sort(function(m,v){if(m.renderOrder!==v.renderOrder)return v.renderOrder-m.renderOrder;const x=o.objects.get(m).distanceToCameraSquared,y=o.objects.get(v).distanceToCameraSquared;return x-y}),g=_.length;for(let m=0,v=_.length;m<v;m++)_[m].element.style.zIndex=g-m}}}const gf=Object.freeze(Object.defineProperty({__proto__:null,CSS2DObject:vm,CSS2DRenderer:SS},Symbol.toStringTag,{value:"Module"})),Oi={R0:.35,R1:1.6,R2:2.2,R3:3};function xm(r){const e=[];e.push({id:r.root.id,name:r.root.name,layer:0,position:new I(0,0,Oi.R0)});const t=r.lifelines.filter(i=>i.parent_id===r.root.id),n=t.length;return t.forEach((i,s)=>{const a=s/n*Math.PI*2,o=iu(Oi.R1,a,0);e.push({id:i.id,name:i.name,layer:1,position:o,parentId:r.root.id})}),r.lifelines.filter(i=>i.parent_id!==r.root.id).forEach(i=>{const s=e.find(f=>f.id===i.parent_id);if(!s)return;const a=r.lifelines.filter(f=>f.parent_id===i.parent_id),o=a.findIndex(f=>f.id===i.id),l=Math.atan2(s.position.y,s.position.x),c=Math.PI/4,u=o-(a.length-1)/2,d=l+u*(c/Math.max(a.length,1)),h=iu(Oi.R2,d,(Math.random()-.5)*.15);e.push({id:i.id,name:i.name,layer:2,position:h,parentId:i.parent_id})}),r.entities.forEach(i=>{const s=e.find(f=>f.id===i.lifeline_id);if(!s)return;const a=r.entities.filter(f=>f.lifeline_id===i.lifeline_id),o=a.findIndex(f=>f.id===i.id),l=Math.atan2(s.position.y,s.position.x),c=Math.PI/6,u=o-(a.length-1)/2,d=l+u*(c/Math.max(a.length,1)),h=iu(Oi.R3,d+(Math.random()-.5)*.08,(Math.random()-.5)*.12);e.push({id:i.id,name:i.title,layer:3,position:h,parentId:i.lifeline_id,kind:i.kind,meta:i.meta})}),e}function iu(r,e,t){const n=r*Math.cos(t)*Math.cos(e),i=r*Math.sin(t),s=r*Math.cos(t)*Math.sin(e);return new I(n,i,s)}function wS(r,e,t,n){const i=r.find(x=>x.id===e);if(!i)return{targets:new Map,constellationIds:new Set};const s=i.position.clone(),a=n.clone().normalize(),o=new I(0,1,0),l=new I().crossVectors(a,o);if(l.length()<.001){const x=new I(1,0,0);l.crossVectors(a,x).normalize()}else l.normalize();const c=new I().crossVectors(l,a).normalize(),u=new Map,d=new Set;u.set(e,s.clone()),d.add(e);const h=[];let f=i.parentId;for(;f&&h.length<2;){const x=r.find(y=>y.id===f);if(x)h.push(x),f=x.parentId;else break}h.forEach((x,y)=>{const S=s.clone().addScaledVector(a,.18+y*.14).addScaledVector(c,.06);u.set(x.id,S),d.add(x.id)});const p=r.filter(x=>x.id!==e&&x.layer===3&&x.parentId===i.parentId).slice(0,12);p.forEach((x,y)=>{const S=p.length===1?0:(y/(p.length-1)-.5)*(Math.PI*2/3),M=s.clone().addScaledVector(a,.12).addScaledVector(l,Math.cos(S)*.25).addScaledVector(c,Math.sin(S)*.25);u.set(x.id,M),d.add(x.id)});const _=new Set;for(const x of t)x.confidence>=.7&&x.status!=="rejected"&&(x.from===e&&_.add(x.to),x.to===e&&_.add(x.from));const g=r.filter(x=>_.has(x.id)&&!d.has(x.id)).slice(0,6);g.forEach((x,y)=>{const S=g.length===1?0:(y/(g.length-1)-.5)*(Math.PI/2),M=s.clone().addScaledVector(a,-.08).addScaledVector(l,Math.cos(S)*.22).addScaledVector(c,Math.sin(S)*.22);u.set(x.id,M),d.add(x.id)});const m=new Set;for(const x of t)x.confidence>=.3&&x.confidence<.7&&x.status!=="rejected"&&(x.from===e&&m.add(x.to),x.to===e&&m.add(x.from));const v=r.filter(x=>m.has(x.id)&&!d.has(x.id)).slice(0,6);return v.forEach((x,y)=>{const S=v.length===1?0:(y/(v.length-1)-.5)*(Math.PI*5/6),M=s.clone().addScaledVector(a,-.04).addScaledVector(l,Math.cos(S)*.38).addScaledVector(c,Math.sin(S)*.38);u.set(x.id,M),d.add(x.id)}),{targets:u,constellationIds:d}}const ES=Object.freeze(Object.defineProperty({__proto__:null,RADII:Oi,computeFocusLayout:wS,computeLayout:xm},Symbol.toStringTag,{value:"Module"}));function ii(r){const e=getComputedStyle(document.documentElement).getPropertyValue(r).trim();if(!e)return"#6ee7d0";const t=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);return t?"#"+[t[1],t[2],t[3]].map(n=>parseInt(n).toString(16).padStart(2,"0")).join(""):e}function TS(r){const e=[];for(const t of r)e.push(t.x,t.y,t.z);return e}async function AS(r,e){const t=new $u;t.background=new Fe("#07090d");const n=r.clientWidth,i=r.clientHeight,s=new ge(n,i),a=new on(60,n/i,.1,20);a.position.set(0,2.5,5.5),a.lookAt(0,0,0);const o=new mm({canvas:r,antialias:!0});o.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.setSize(n,i);const l=xm(e),c=[],u=[],d=[],h=[];for(const x of l){let y,S;const M=x.layer===0||x.layer===1?1:x.layer===2?.9:.85;if(x.layer===0)y=new ri(.06,16,16),S=new an({color:ii("--accent")});else if(x.layer===1)y=new ri(.05,12,12),S=new an({color:ii("--accent"),transparent:!0,opacity:M});else if(x.layer===2)y=new ri(.03,8,8),S=new an({color:ii("--text-2"),transparent:!0,opacity:M});else{x.kind==="task"?y=new ds(.022,.022,.022):x.kind==="decision"?y=new Cr(.022):x.kind==="memory"?y=new ri(.02,8,8):x.kind==="item"?y=new Ra(.02):y=new ri(.015,8,8);const T={task:"--accent",memory:"--text-2",decision:"--warm",item:"--text-3"}[x.kind||""]||"--text-3";let P=M;x.kind==="task"&&x.meta&&(x.meta.status==="done"?P=.4:x.meta.status==="cancelled"?P=.25:x.meta.priority==="high"&&(P=.95)),S=new an({color:ii(T),transparent:!0,opacity:P})}const C=new Lt(y,S);if(C.position.copy(x.position),C.userData={id:x.id,name:x.name,kind:x.kind,layer:x.layer,parentId:x.parentId,homePosition:x.position.clone(),targetPosition:x.position.clone()},x.layer===3&&x.kind==="task"&&x.meta&&(x.meta.status==="done"?C.scale.setScalar(.75):x.meta.status==="cancelled"&&C.scale.setScalar(.6)),t.add(C),c.push(C),u.push(C),x.layer===3){const b=new ri(.04,8,8),T=new an({visible:!1}),P=new Lt(b,T);P.position.copy(x.position),P.userData=C.userData,u.push(P)}}for(const x of l){if(!x.parentId)continue;const y=l.find(P=>P.id===x.parentId);if(!y)continue;const S=8,M=[];for(let P=0;P<=S;P++){const L=P/S,B=new I().lerpVectors(y.position,x.position,L).normalize().multiplyScalar(y.position.length()*(1-L)+x.position.length()*L);M.push(B)}const C=new Md;C.setPositions(TS(M));const b=new cc({color:new Fe(ii("--line-2")),linewidth:1.5,worldUnits:!1,resolution:s,transparent:!0,opacity:.65,depthTest:!0});h.push(b);const T=new _m(C,b);T.computeLineDistances(),T.userData={fromLayer:y.layer,toLayer:x.layer},t.add(T),d.push(T)}const f=new zs(Oi.R1,.006,8,80),p=new Lt(f,new an({color:ii("--line-2"),transparent:!0,opacity:.12}));p.rotation.x=yl.degToRad(15),t.add(p);const _=new zs(Oi.R2,.004,8,80),g=new Lt(_,new an({color:ii("--line-2"),transparent:!0,opacity:.08}));g.rotation.x=yl.degToRad(15),t.add(g);function m(x,y){s.set(x,y),h.forEach(S=>{S.resolution.set(x,y)})}function v(){t.traverse(x=>{if(x instanceof Lt){x.geometry?.dispose();const y=x.material;y instanceof cn&&(Array.isArray(y)?y.forEach(S=>S.dispose()):y.dispose())}}),d.forEach(x=>{x.geometry?.dispose()}),h.forEach(x=>x.dispose()),o.dispose()}return{scene:t,camera:a,renderer:o,nodes:c,pickables:u,lines:d,orbit:p,layoutNodes:l,dispose:v,setResolution:m}}const _f=1,CS=3.5;function RS(r){return Math.max(_f,Math.min(CS,_f+(r-.3)*3.57))}function IS(r,e,t,n){const i=new I().subVectors(e,r).normalize(),s=.03+n*.005,a=new Vs(s,s*2.5,6,1),o=new an({color:new Fe(t)}),l=new Lt(a,o),c=e.clone().addScaledVector(i,-.04);l.position.copy(c);const u=new vn;return u.setFromUnitVectors(new I(0,1,0),i),l.setRotationFromQuaternion(u),l}function PS(r,e,t,n,i){const s=i||new ge(window.innerWidth,window.innerHeight),a=[],o=e.associations.filter(c=>(c.from===n||c.to===n)&&c.confidence>=.7).slice(0,20),l={co_occurrence:"--text-3",causal:"--accent",tension:"--warm",derived_from:"--accent-dim",manual:"--accent"};for(const c of o){const u=t.find(x=>x.id===c.from),d=t.find(x=>x.id===c.to);if(!u||!d)continue;const h=new Md;h.setPositions([u.position.x,u.position.y,u.position.z,d.position.x,d.position.y,d.position.z]);const f=RS(c.confidence),p=.5+(c.confidence-.5)*.8,_=ii(l[c.relation_type]||"--text-3"),g=new cc({color:new Fe(_),linewidth:f,worldUnits:!1,resolution:s,transparent:!0,opacity:c.status==="pending"?p*.8:p,depthTest:!1,dashed:c.status==="pending",dashSize:.06,gapSize:.04}),m=new _m(h,g);m.computeLineDistances(),m.userData={associationId:c.id,...c,_origLinewidth:f,_origColor:m.material.color.getHex()},r.add(m);let v;c.status==="accepted"&&(v=IS(u.position,d.position,_,f),r.add(v)),a.push({line:m,data:c,fromNode:u,toNode:d,arrow:v})}return a}function LS(r,e,t=.05){r.forEach(n=>{const i=n.userData.id,s=n.material;e.has(i)?(s.opacity=1,s.transparent=!0):(s.opacity=t,s.transparent=!0),s.needsUpdate=!0})}function vf(r){r.forEach(e=>{const t=e.userData.layer,n=t===0||t===1?1:t===2?.9:.85,i=e.material;i.opacity=n,i.transparent=!0,i.needsUpdate=!0})}function DS(r,e,t=6){const n=1-Math.exp(-t*e);for(const i of r){const s=i.userData.targetPosition;s&&i.position.lerp(s,n)}}function US(r,e,t=.06){ym(r,e,t)}function ym(r,e,t=.06){for(const n of r){const i=n.userData.id,s=n.userData.layer,a=n.material;if(e.has(i)){const o=s===0||s===1?1:s===2?.9:.85;a.opacity=o}else a.opacity=t;a.transparent=!0,a.needsUpdate=!0}}function NS(r,e,t){const n=new zs(.04,.004,8,16),i=new an({color:new Fe(t),transparent:!0,opacity:.5}),s=new Lt(n,i);return s.position.copy(e),s.name="focusHalo",s.renderOrder=999,s.material.depthTest=!1,s.material.depthWrite=!1,r.add(s),s}function su(r){const e=r.getObjectByName("focusHalo");if(e&&(r.remove(e),e.geometry&&e.geometry.dispose(),e.material)){const t=e.material;Array.isArray(t)?t.forEach(n=>n.dispose()):t.dispose()}}const xf=[10551280,16771744,16752895,10526880];let Tu=[],Au=[];function FS(r,e,t,n){Cu(n);const i=new Set(t.flatMap(a=>[...a.pathEntityIds])),s=new Set(t.flatMap(a=>[...a.pathAssocIds]));for(const a of r)if(a.userData.layer===3&&!i.has(a.userData.id)){const o=a.material;o.opacity=.3,o.transparent=!0,o.needsUpdate=!0}for(const a of e)s.has(a.data.id)||(a.line.material.opacity=.1);for(const a of t){const o=a.isCurrent?1.3:1.1,l=a.isCurrent?2:1;for(const c of r){const u=c.userData.id;if(!a.pathEntityIds.has(u))continue;const d=c.material;d._pathOrigColor=d._pathOrigColor??d.color.getHex(),u===a.startId?(c.scale.setScalar(1.5),d.color.set("#80ff80")):u===a.endId?(c.scale.setScalar(1.5),d.color.set("#ffaa44")):(c.scale.setScalar(o),d.color.set(a.color)),d.needsUpdate=!0}for(const c of e){if(!a.pathAssocIds.has(c.data.id))continue;const u=c.line.material;u._pathOrigLinewidth=u._pathOrigLinewidth??u.linewidth,u.linewidth=(u._pathOrigLinewidth||1.5)*l,u.opacity=1,a.isCurrent&&OS(c.fromNode,c.toNode,a.color,n)}}}function OS(r,e,t,n){const i=new I().addVectors(r.position,e.position).multiplyScalar(.5),s=new I().subVectors(e.position,r.position).normalize(),a=new Vs(.015,.04,6),o=new an({color:t}),l=new Lt(a,o);l.position.copy(i),l.quaternion.setFromUnitVectors(new I(0,1,0),s),l.userData.isPathCone=!0,n.add(l),Au.push(l)}function kS(r,e,t){for(let n=1;n<r.length-1;n++){const i=e.find(o=>o.userData.id===r[n]);if(!i)continue;const s=document.createElement("div");s.style.cssText="width:18px;height:18px;border-radius:50%;background:var(--accent);color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;",s.textContent=String(n);const a=new vm(s);a.position.copy(i.position.clone().add(new I(0,.05,0))),a.userData.isPathLabel=!0,t.add(a),Tu.push(a)}}function Cu(r){for(const e of Tu)r.remove(e);for(const e of Au)r.remove(e),e.geometry?.dispose(),e.material.dispose();Tu=[],Au=[]}function yf(r,e){for(const t of r){const n=t.material;n._pathOrigColor!==void 0&&(n.color.setHex(n._pathOrigColor),delete n._pathOrigColor,t.scale.setScalar(1),n.needsUpdate=!0)}for(const t of e){const n=t.line.material;n._pathOrigLinewidth!==void 0&&(n.linewidth=n._pathOrigLinewidth,delete n._pathOrigLinewidth),n.opacity=n.opacity<.2?.8:n.opacity}}function BS(r){return r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2}let Gn=null;function Co(r,e,t,n,i,s=800){Gn={elapsed:0,duration:s,from:{position:r.position.clone(),target:e.target.clone(),fov:r.fov},to:{position:t.clone(),target:n.clone(),fov:i}}}function zS(r,e,t){if(!Gn)return!1;Gn.elapsed+=r*1e3;const n=Math.min(Gn.elapsed/Gn.duration,1),i=BS(n);return e.position.lerpVectors(Gn.from.position,Gn.to.position,i),t.target.lerpVectors(Gn.from.target,Gn.to.target,i),e.fov=Gn.from.fov+(Gn.to.fov-Gn.from.fov)*i,e.updateProjectionMatrix(),n>=1?(Gn=null,!1):!0}const VS={class:"breadcrumb"},GS={key:0,class:"sep"},HS=["onClick"],WS={key:2,class:"crumb-current"},XS=yn({__name:"Breadcrumb",props:{state:{}},emits:["nav"],setup(r,{emit:e}){const t=r,n=e,i=Hi(),s=Ct(()=>{const a=t.state,o=[{label:"Atlas",action:{kind:"global_overview"}}],l=a.kind==="region_zoom"?a.lifeline_id:a.kind==="node_focus"||a.kind==="relation_reveal"?i.data?.entities.find(d=>d.id===a.entity_id)?.lifeline_id:null;if(!l)return o;const c=[];let u=l;for(;u;){const d=i.data?.lifelines.find(f=>f.id===u);if(!d)break;const h=d.parent_id==="ROOT"?1:2;c.unshift({id:d.id,name:d.name,layer:h}),u=d.parent_id!=="ROOT"?d.parent_id:void 0}for(const d of c)o.push({label:d.name,action:{kind:"region_zoom",lifeline_id:d.id}});if(a.kind==="node_focus"||a.kind==="relation_reveal"){const d=a.entity_id,h=i.data?.entities.find(f=>f.id===d);h&&o.push({label:h.title.slice(0,20),action:null}),a.kind==="relation_reveal"&&o.push({label:"(关联)",action:null})}return o});return(a,o)=>(G(),W("div",VS,[(G(!0),W(et,null,Wt(s.value,(l,c)=>(G(),W(et,{key:c},[c>0?(G(),W("span",GS,"›")):Le("",!0),l.action?(G(),W("button",{key:1,class:"crumb-link",onClick:u=>n("nav",l.action)},fe(l.label),9,HS)):(G(),W("span",WS,fe(l.label),1))],64))),128))]))}}),$S=xn(XS,[["__scopeId","data-v-54bd57ef"]]),qS={key:0,class:"lifeline-panel"},YS={class:"panel-header"},ZS={class:"stats-row"},KS={class:"stats-count"},JS={class:"stats-kinds"},jS={class:"kind-t"},QS={class:"kind-m"},e1={class:"kind-d"},t1={class:"kind-i"},n1={key:0,class:"inline-form"},i1=["value"],s1={class:"form-actions"},r1={key:0,class:"drop-line"},a1=["onDragstart","onDragover","onDrop"],o1=["onClick"],l1=["onClick","onDblclick"],c1={class:"kind-t"},u1={class:"kind-m"},d1={class:"kind-d"},h1={class:"kind-i"},f1={class:"badge"},p1={key:0,class:"actions"},m1=["onClick"],g1=["onClick"],_1=["onKeyup"],v1={class:"form-actions"},x1=["onClick"],y1=["onClick"],b1={key:0,class:"confirm-delete"},M1={class:"form-actions"},S1=["onClick"],w1=["onClick"],E1={class:"entity-kind"},T1={class:"entity-title"},A1=["onClick"],C1=["onClick"],R1={key:1,class:"empty"},I1={class:"search-box"},P1={key:0,class:"loading-text"},L1={key:1,class:"search-results"},D1={key:0,class:"loading-text"},U1=["onClick"],N1={class:"entity-kind"},F1={class:"entity-title"},O1={key:0,class:"mounted-tag"},k1=yn({__name:"LifelinePanel",emits:["focus-lifeline","focus-entity"],setup(r,{emit:e}){const t=e,n=Hi(),i=Ct(()=>{const D=n.state;return D.kind==="region_zoom"?D.lifeline_id??null:D.kind==="node_focus"||D.kind==="relation_reveal"?n.data?.entities.find(U=>U.id===D.entity_id)?.lifeline_id??null:null}),s=Ct(()=>{const D=n.state;return D.kind==="node_focus"||D.kind==="relation_reveal"?D.entity_id??null:null}),a=Ct(()=>{if(!n.data)return{lifelines:0,entities:0,byKind:{task:0,memory:0,decision:0,item:0}};const D={task:0,memory:0,decision:0,item:0};for(const U of n.data.entities)D[U.kind]!==void 0&&D[U.kind]++;return{lifelines:n.data.lifelines.length,entities:n.data.entities.length,byKind:D}});function o(D){const U={task:0,memory:0,decision:0,item:0};if(!n.data)return U;for(const O of n.data.entities)O.lifeline_id===D&&U[O.kind]!==void 0&&U[O.kind]++;return U}const l=De(new Set),c=De(!1),u=De(null),d=De(null),h=De(null),f=De(null),p=De(-1),_=De(null);function g(D,U){f.value={id:U.id,parentId:U.parent_id},_.value=U.parent_id,D.dataTransfer&&(D.dataTransfer.effectAllowed="move",D.dataTransfer.setData("text/plain",U.id))}function m(D,U){D.preventDefault(),p.value=U}function v(){p.value=-1}function x(D){D.preventDefault()}async function y(D,U,O){if(D.preventDefault(),p.value=-1,!f.value||!n.data)return;const{id:j,parentId:q}=f.value;if(q!==O){f.value=null,_.value=null;return}const ne=n.data.lifelines.filter(nt=>nt.parent_id===q);ne.sort((nt,Me)=>nt.order_index-Me.order_index);const oe=ne.findIndex(nt=>nt.id===j);if(oe===-1||oe===U){f.value=null,_.value=null;return}const me=[...ne.slice(0,oe),...ne.slice(oe+1)],$e=U>oe?U-1:U,F=$e>0?me[$e-1]:null,it=$e<me.length?me[$e]:null;let ze;F?it?ze=(F.order_index+it.order_index)/2:ze=F.order_index+1:ze=(it?.order_index??1)-1,f.value=null,_.value=null,await n.updateLifeline(j,{order_index:ze})}function S(){f.value=null,_.value=null,p.value=-1}const M=De(""),C=De([]),b=De(!1),T=De(""),P=De(""),L=De("ROOT"),B=De(""),Q=Ct(()=>{if(!n.data)return[];const D=n.data.lifelines,U={};for(const j of D){const q=j.parent_id;U[q]||(U[q]=[]),U[q].push(j)}function O(j,q){return(U[j]||[]).map(oe=>({lifeline:oe,children:O(oe.id,q+1),depth:q}))}return O("ROOT",0)});function J(D){return n.data?n.data.entities.filter(U=>U.lifeline_id===D).length:0}function z(D){return n.data?n.data.entities.filter(U=>U.lifeline_id===D):[]}function Y(D){l.value.has(D)?l.value.delete(D):l.value.add(D)}function K(D){return l.value.has(D)}function de(D){return i.value===D}function pe(D){t("focus-lifeline",D)}async function ve(){!T.value.trim()||!P.value.trim()||(await n.createLifeline({id:T.value.trim(),name:P.value.trim(),parent_id:L.value==="ROOT"?void 0:L.value}),T.value="",P.value="",L.value="ROOT",c.value=!1)}function Ce(D){u.value=D.id,B.value=D.name}async function Be(D){B.value.trim()&&B.value!==D.name&&await n.updateLifeline(D.id,{name:B.value.trim()}),u.value=null}function st(){u.value=null}async function dt(D){await n.deleteLifeline(D.id),d.value=null}async function tt(D){const U=D.id.split(":"),O=U[0],j=parseInt(U.slice(1).join(":"),10);await n.mountEntity(O,j,null)}async function H(D){h.value=D,M.value="",C.value=[]}async function ae(){const D=M.value.trim();if(!(!D||D.length<1)){b.value=!0;try{const{searchAll:U}=await yt(async()=>{const{searchAll:q}=await import("./index-Bj2wMeSL.js").then(ne=>ne.e);return{searchAll:q}},__vite__mapDeps([0,1,2])),O=await U(D,5),j=[];for(const q of O.items||[]){const ne=`item:${q.id}`,oe=n.data?.entities.find(me=>me.id===ne);j.push({id:ne,kind:"item",title:q.content?.slice(0,60)||"",lifeline_id:oe?.lifeline_id,mounted_name:oe?.lifeline_id?n.data?.lifelines.find(me=>me.id===oe.lifeline_id)?.name||oe.lifeline_id:void 0})}for(const q of O.tasks||[]){const ne=`task:${q.id}`,oe=n.data?.entities.find(me=>me.id===ne);j.push({id:ne,kind:"task",title:q.title?.slice(0,60)||"",lifeline_id:oe?.lifeline_id,mounted_name:oe?.lifeline_id?n.data?.lifelines.find(me=>me.id===oe.lifeline_id)?.name||oe.lifeline_id:void 0})}for(const q of O.memories||[]){const ne=`memory:${q.id}`,oe=n.data?.entities.find(me=>me.id===ne);j.push({id:ne,kind:"memory",title:q.content?.slice(0,60)||"",lifeline_id:oe?.lifeline_id,mounted_name:oe?.lifeline_id?n.data?.lifelines.find(me=>me.id===oe.lifeline_id)?.name||oe.lifeline_id:void 0})}for(const q of O.decisions||[]){const ne=`decision:${q.id}`,oe=n.data?.entities.find(me=>me.id===ne);j.push({id:ne,kind:"decision",title:q.title?.slice(0,60)||"",lifeline_id:oe?.lifeline_id,mounted_name:oe?.lifeline_id?n.data?.lifelines.find(me=>me.id===oe.lifeline_id)?.name||oe.lifeline_id:void 0})}C.value=j}finally{b.value=!1}}}async function ue(D){if(!h.value)return;const U=D.id.split(":"),O=U[0],j=parseInt(U.slice(1).join(":"),10);await n.mountEntity(O,j,h.value),h.value=null,C.value=[]}function ye(){h.value=null,C.value=[]}function $(){return n.data?[{id:"ROOT",name:"ROOT (根级)"},...n.data.lifelines.map(D=>({id:D.id,name:D.name}))]:[{id:"ROOT",name:"ROOT (根级)"}]}return(D,U)=>qe(n).data?(G(),W("div",qS,[E("div",YS,[U[10]||(U[10]=E("span",{class:"panel-title"},"Lifeline",-1)),E("button",{class:"btn-text",onClick:U[0]||(U[0]=O=>c.value=!c.value)},"+ 新建")]),E("div",ZS,[E("span",KS,fe(a.value.lifelines)+" lifeline · "+fe(a.value.entities)+" entity",1),E("span",JS,[E("span",jS,"T:"+fe(a.value.byKind.task),1),E("span",QS,"M:"+fe(a.value.byKind.memory),1),E("span",e1,"D:"+fe(a.value.byKind.decision),1),E("span",t1,"I:"+fe(a.value.byKind.item),1)])]),c.value?(G(),W("div",n1,[At(E("input",{"onUpdate:modelValue":U[1]||(U[1]=O=>T.value=O),class:"field",placeholder:"ID (英文短名)",onKeyup:si(ve,["enter"])},null,544),[[Zt,T.value]]),At(E("input",{"onUpdate:modelValue":U[2]||(U[2]=O=>P.value=O),class:"field",placeholder:"显示名称",onKeyup:si(ve,["enter"])},null,544),[[Zt,P.value]]),At(E("select",{"onUpdate:modelValue":U[3]||(U[3]=O=>L.value=O),class:"field"},[(G(!0),W(et,null,Wt($(),O=>(G(),W("option",{key:O.id,value:O.id},fe(O.name),9,i1))),128))],512),[[Si,L.value]]),E("div",s1,[E("button",{class:"btn-text",onClick:ve},"保存"),E("button",{class:"btn-text",onClick:U[4]||(U[4]=O=>c.value=!1)},"取消")])])):Le("",!0),E("div",{class:"tree",onDragover:x,onDrop:U[7]||(U[7]=fn(()=>{},["prevent"]))},[(G(!0),W(et,null,Wt(Q.value,(O,j)=>(G(),W(et,{key:O.lifeline.id},[p.value===j&&_.value===O.lifeline.parent_id?(G(),W("div",r1)):Le("",!0),E("div",{class:Ot(["tree-row",{active:de(O.lifeline.id),dragging:f.value?.id===O.lifeline.id}]),style:Cs({paddingLeft:O.depth*16+4+"px"}),draggable:!0,onDragstart:q=>g(q,O.lifeline),onDragover:q=>m(q,j),onDragleave:v,onDrop:q=>y(q,j,O.lifeline.parent_id),onDragend:S},[E("span",{class:Ot(["drag-handle",{visible:f.value}])},"⠿",2),E("span",{class:"arrow",onClick:q=>Y(O.lifeline.id)},fe(K(O.lifeline.id)?"▼":"▶"),9,o1),E("span",{class:"name",onClick:q=>pe(O.lifeline.id),onDblclick:fn(q=>Ce(O.lifeline),["stop"])},[ln(fe(O.lifeline.name)+" ",1),K(O.lifeline.id)?(G(),W(et,{key:0},[E("span",c1,"T:"+fe(o(O.lifeline.id).task),1),E("span",u1,"M:"+fe(o(O.lifeline.id).memory),1),E("span",d1,"D:"+fe(o(O.lifeline.id).decision),1),E("span",h1,"I:"+fe(o(O.lifeline.id).item),1)],64)):Le("",!0),E("span",f1,"("+fe(J(O.lifeline.id))+")",1)],40,l1),u.value!==O.lifeline.id?(G(),W("span",p1,[E("button",{class:"btn-icon",onClick:fn(q=>Ce(O.lifeline),["stop"]),title:"编辑名称"},"✎",8,m1),E("button",{class:"btn-icon",onClick:fn(q=>d.value=O.lifeline.id,["stop"]),title:"删除 lifeline"},"✕",8,g1)])):Le("",!0)],46,a1),u.value===O.lifeline.id?(G(),W("div",{key:1,class:"inline-edit",style:Cs({paddingLeft:O.depth*16+20+"px"})},[At(E("input",{"onUpdate:modelValue":U[5]||(U[5]=q=>B.value=q),class:"field",onKeyup:[si(q=>Be(O.lifeline),["enter"]),si(st,["esc"])]},null,40,_1),[[Zt,B.value]]),E("div",v1,[E("button",{class:"btn-text",onClick:q=>Be(O.lifeline)},"保存",8,x1),E("button",{class:"btn-text",onClick:st},"取消"),d.value!==O.lifeline.id?(G(),W("button",{key:0,class:"btn-text danger",onClick:q=>d.value=O.lifeline.id},"删除",8,y1)):Le("",!0)]),d.value===O.lifeline.id?(G(),W("div",b1,[ln(" 确定删除「"+fe(O.lifeline.name)+"」？挂载的 "+fe(J(O.lifeline.id))+" 个 entity 将被卸载。 ",1),E("div",M1,[E("button",{class:"btn-text danger",onClick:q=>dt(O.lifeline)},"确认删除",8,S1),E("button",{class:"btn-text",onClick:U[6]||(U[6]=q=>d.value=null)},"取消")])])):Le("",!0)],4)):Le("",!0),K(O.lifeline.id)?(G(),W(et,{key:2},[(G(!0),W(et,null,Wt(z(O.lifeline.id),q=>(G(),W("div",{key:q.id,class:Ot(["entity-row",{active:s.value===q.id}]),style:Cs({paddingLeft:O.depth*16+28+"px"}),onClick:ne=>t("focus-entity",q.id)},[E("span",E1,fe(q.kind[0].toUpperCase()),1),E("span",T1,fe(q.title.slice(0,30)),1),E("button",{class:"btn-icon",onClick:fn(ne=>tt(q),["stop"]),title:"卸载"},"×",8,A1)],14,w1))),128)),E("div",{class:"entity-row add-entity",style:Cs({paddingLeft:O.depth*16+28+"px"})},[E("button",{class:"btn-text",onClick:q=>H(O.lifeline.id)},"+ 关联 entity",8,C1)],4)],64)):Le("",!0)],64))),128))],32),Q.value.length===0&&!c.value?(G(),W("div",R1,[U[11]||(U[11]=E("div",{class:"empty-icon"},"◇",-1)),U[12]||(U[12]=E("div",{class:"empty-title"},"暂无 Lifeline",-1)),U[13]||(U[13]=E("div",{class:"empty-desc"},[ln(' Lifeline 是实体分类的主线，例如"健康""学习""工作"。'),E("br"),ln(" 创建后实体将分布在 3D 球面上。 ")],-1)),E("button",{class:"btn-text",onClick:U[8]||(U[8]=O=>c.value=!0)},"+ 创建第一个 Lifeline")])):Le("",!0),h.value?(G(),W("div",{key:2,class:"search-overlay",onClick:fn(ye,["self"])},[E("div",I1,[At(E("input",{"onUpdate:modelValue":U[9]||(U[9]=O=>M.value=O),class:"field",placeholder:"搜索 entity...",onKeyup:si(ae,["enter"])},null,544),[[Zt,M.value]]),E("button",{class:"btn-text",onClick:ae},"搜索"),b.value?(G(),W("div",P1,"搜索中...")):(G(),W("div",L1,[C.value.length===0&&M.value?(G(),W("div",D1,"无结果")):Le("",!0),(G(!0),W(et,null,Wt(C.value,O=>(G(),W("div",{key:O.id,class:Ot(["search-row",{mounted:O.mounted_name}]),onClick:j=>O.mounted_name?null:ue(O)},[E("span",N1,fe(O.kind[0].toUpperCase()),1),E("span",F1,fe(O.title.slice(0,40)),1),O.mounted_name?(G(),W("span",O1,"已归类到 "+fe(O.mounted_name),1)):Le("",!0)],10,U1))),128))]))])])):Le("",!0)])):Le("",!0)}}),B1=xn(k1,[["__scopeId","data-v-0c96ae5f"]]),z1={key:0,class:"node-detail-card"},V1={class:"card-header"},G1={class:"kind-badge"},H1={class:"entity-id-row"},W1=["title"],X1={class:"lifeline-path"},$1={key:1,class:"no-lifeline"},q1={key:0,class:"detail-loading"},Y1={key:1,class:"detail-error"},Z1={key:2,class:"detail-section"},K1={key:0,class:"field-row"},J1=["onDblclick"],j1=["onClick"],Q1={key:1,class:"field-row"},ew=["onDblclick"],tw=["onClick"],nw={key:2,class:"field-row"},iw=["onDblclick"],sw=["onClick"],rw={key:3,class:"field-row"},aw=["onDblclick"],ow=["onClick"],lw={key:4,class:"field-row"},cw=["onDblclick"],uw=["onClick"],dw={key:5,class:"field-row"},hw=["onDblclick"],fw=["onClick"],pw={key:6,class:"field-row"},mw=["onDblclick"],gw=["onClick"],_w={key:7,class:"field-row"},vw=["onDblclick"],xw=["onClick"],yw={key:8,class:"field-row"},bw={class:"field-value"},Mw=["onClick"],Sw={key:9,class:"field-row"},ww={class:"field-value"},Ew=["onClick"],Tw={key:10,class:"field-row"},Aw={class:"field-label"},Cw={class:"field-value readonly"},Rw={key:11,class:"field-row"},Iw={class:"field-label"},Pw=["onDblclick"],Lw={key:0,class:"field-row"},Dw={class:"field-value readonly"},Uw={key:3,class:"actions-section"},Nw={key:4,class:"assoc-summary"},Fw={class:"assoc-type-counts"},Ow={key:0,class:"assoc-summary-list"},kw=["onClick"],Bw={class:"assoc-summary-type"},zw={class:"assoc-summary-conf"},Vw={class:"assoc-summary-arrow"},Gw={class:"assoc-summary-kind"},Hw={class:"assoc-summary-title"},Ww={key:0,class:"assoc-summary-more"},Xw={class:"assoc-section"},$w={class:"assoc-title"},qw={key:0,class:"empty-text"},Yw=["onClick"],Zw={class:"confidence"},Kw={key:0,class:"assoc-actions"},Jw=["onClick"],jw=["onClick"],Qw={class:"assoc-edit-actions"},eE=["onClick"],tE=["onClick"],nE=["onClick"],iE={key:0,class:"evidence-block"},sE={class:"evidence-title"},rE={key:0,class:"no-evidence"},aE={class:"evidence-excerpt"},oE={class:"evidence-meta"},lE={class:"evidence-type"},cE={class:"evidence-weight"},uE=yn({__name:"NodeDetailCard",emits:["edit-assoc","delete-assoc","copied","enter-relation","navigate-entity"],setup(r,{expose:e,emit:t}){const n=Hi(),i=Ct(()=>{const $=n.state;if($.kind!=="node_focus"&&$.kind!=="relation_reveal")return null;const D=$.entity_id;return n.data?.entities.find(U=>U.id===D)??null}),s=De(null),a=De(!1),o=De(!1);async function l(){if(!i.value)return;const $=i.value.id,D=n.entityDetailCache.get($);if(D){s.value=D;return}a.value=!0,o.value=!1;try{const U=$.split(":"),O=U[0],j=parseInt(U.slice(1).join(":"),10);let q={};if(O==="task"){const{getTask:ne}=await yt(async()=>{const{getTask:me}=await import("./index-Bj2wMeSL.js").then($e=>$e.e);return{getTask:me}},__vite__mapDeps([0,1,2])),oe=await ne(j);q=oe.task||oe}else if(O==="memory"){const{getMemory:ne}=await yt(async()=>{const{getMemory:me}=await import("./index-Bj2wMeSL.js").then($e=>$e.e);return{getMemory:me}},__vite__mapDeps([0,1,2])),oe=await ne(j);q=oe.memory||oe}else if(O==="decision"){const{getDecision:ne}=await yt(async()=>{const{getDecision:me}=await import("./index-Bj2wMeSL.js").then($e=>$e.e);return{getDecision:me}},__vite__mapDeps([0,1,2])),oe=await ne(j);q=oe.decision||oe}else if(O==="item"){const{getItem:ne}=await yt(async()=>{const{getItem:me}=await import("./index-Bj2wMeSL.js").then($e=>$e.e);return{getItem:me}},__vite__mapDeps([0,1,2])),oe=await ne(j);q=oe.item||oe}s.value=q,n.entityDetailCache.set($,q)}catch{o.value=!0}finally{a.value=!1}}Lo(()=>i.value?.id,()=>{s.value=null,l()},{immediate:!0});const c=De(!1),u=De(null),d=De("");function h(){i.value&&(d.value=i.value.title,c.value=!0,au(()=>u.value?.focus()))}async function f(){if(!i.value)return;const $=d.value.trim();if(!$||$===i.value.title){c.value=!1;return}const D=i.value.id.split(":"),U=D[0],O=parseInt(D.slice(1).join(":"),10);try{await n.updateEntityTitle(U,O,$)}catch{await n.reload()}c.value=!1}function p(){c.value=!1}function _($){$.key==="Enter"?($.stopPropagation(),f()):$.key==="Escape"&&($.stopPropagation(),p())}const g=De(null),m=De(null),v=De("");function x($){if(!s.value)return;const D=s.value[$];v.value=D!=null?String(D):"",g.value=$,au(()=>m.value?.focus())}async function y(){if(!i.value||!g.value||!s.value)return;const $=g.value,D=v.value.trim();if(D===String(s.value[$]||"")){g.value=null;return}const U=i.value.id.split(":"),O=U[0],j=parseInt(U.slice(1).join(":"),10);try{const{updateEntityField:q}=await yt(async()=>{const{updateEntityField:ne}=await import("./index-Bj2wMeSL.js").then(oe=>oe.e);return{updateEntityField:ne}},__vite__mapDeps([0,1,2]));await q(O,j,{[$]:D}),s.value={...s.value,[$]:D},n.entityDetailCache.set(i.value.id,s.value)}catch{}g.value=null}function S(){g.value=null}function M($){$.key==="Escape"?($.stopPropagation(),S()):($.key==="Enter"&&!($.target instanceof HTMLTextAreaElement)||($.ctrlKey||$.metaKey)&&$.key==="Enter"&&$.target instanceof HTMLTextAreaElement)&&($.stopPropagation(),y())}async function C(){if(!i.value||!s.value)return;const $=i.value.id.split(":"),D=parseInt($.slice(1).join(":"),10),U=s.value.status;try{if(U==="todo"){const{markTaskDone:O}=await yt(async()=>{const{markTaskDone:j}=await import("./index-Bj2wMeSL.js").then(q=>q.e);return{markTaskDone:j}},__vite__mapDeps([0,1,2]));await O(D),s.value={...s.value,status:"done"}}else{const{markTaskTodo:O}=await yt(async()=>{const{markTaskTodo:j}=await import("./index-Bj2wMeSL.js").then(q=>q.e);return{markTaskTodo:j}},__vite__mapDeps([0,1,2]));await O(D),s.value={...s.value,status:"todo"}}n.entityDetailCache.set(i.value.id,s.value),await n.reload()}catch{await n.reload()}}async function b(){if(!i.value||!s.value)return;const $=i.value.id.split(":"),D=parseInt($.slice(1).join(":"),10),U=s.value.status;try{if(U==="candidate"){const{confirmMemory:O}=await yt(async()=>{const{confirmMemory:j}=await import("./index-Bj2wMeSL.js").then(q=>q.e);return{confirmMemory:j}},__vite__mapDeps([0,1,2]));await O(D),s.value={...s.value,status:"confirmed"}}else{const{archiveMemory:O}=await yt(async()=>{const{archiveMemory:j}=await import("./index-Bj2wMeSL.js").then(q=>q.e);return{archiveMemory:j}},__vite__mapDeps([0,1,2]));await O(D),s.value={...s.value,status:"archived"}}n.entityDetailCache.set(i.value.id,s.value),await n.reload()}catch{await n.reload()}}const T=t;e({startEditTitle:h});const P=Ct(()=>{if(!i.value||!n.data)return[];const $=i.value.id,D=[];for(const U of n.data.associations){if(U.status==="rejected")continue;const O=U.from===$,j=U.to===$;if(!O&&!j)continue;const q=O?U.to:U.from,ne=n.data.entities.find(oe=>oe.id===q);ne&&D.push({assoc:U,isFrom:O,target:ne})}return D}),L=Ct(()=>P.value.slice(0,5)),B=Ct(()=>{const $={};for(const{assoc:D}of P.value)$[D.relation_type]=($[D.relation_type]||0)+1;return $}),Q=De(!0);function J($){T("navigate-entity",$)}function z($){return{co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[$]||$}const Y=Ct(()=>{if(!i.value||!n.data)return[];const $=i.value.id;return n.data.associations.filter(D=>(D.from===$||D.to===$)&&D.status!=="rejected")}),K=Ct(()=>{if(!i.value||!n.data)return null;const $=i.value.lifeline_id;if(!$)return null;const D=n.data.lifelines.find(U=>U.id===$);return D?{id:D.id,name:D.name}:null});function de($){return $==="task"?"T":$==="memory"?"M":$==="decision"?"D":$==="item"?"I":"?"}function pe($){switch($){case"co_occurrence":return"共现";case"causal":return"因果";case"tension":return"张力";case"derived_from":return"衍生";default:return $}}function ve($){switch($){case"causal":return"var(--accent)";case"tension":return"var(--text-5)";case"derived_from":return"var(--text-4)";default:return"var(--text-3)"}}function Ce($){const D=i.value.id,O=$.from===D?$.to:$.from,j=O.split(":")[0],q=n.data?.entities.find(ne=>ne.id===O);return{id:O,kind:j,title:q?.title||O}}function Be($){const D=Ce($);n.transition({kind:"node_focus",entity_kind:D.kind,entity_id:D.id})}function st($){n.transition({kind:"region_zoom",lifeline_id:$})}async function dt($){await navigator.clipboard.writeText($),T("copied")}async function tt($){const D=`[${$.kind}] ${$.title} (\`${$.id}\`)`;await navigator.clipboard.writeText(D),T("copied")}async function H($){await n.reviewAssociation($,"accepted")}async function ae($){await n.reviewAssociation($,"rejected")}function ue($){return $?$.slice(0,10):""}function ye($){return $==="detail"||$==="content"||$==="decision"||$==="context"||$==="reasoning"||$==="expected_outcome"}return($,D)=>i.value?(G(),W("div",z1,[E("div",V1,[E("span",G1,fe(de(i.value.kind)),1),c.value?At((G(),W("input",{key:0,ref_key:"editInput",ref:u,"onUpdate:modelValue":D[0]||(D[0]=U=>d.value=U),class:"title-input",onBlur:f,onKeydown:_},null,544)),[[Zt,d.value]]):(G(),W("span",{key:1,class:"entity-name",onDblclick:h},fe(i.value.title.slice(0,40)),33))]),E("div",H1,[E("span",{class:"entity-id",onClick:D[1]||(D[1]=U=>dt(i.value.id)),title:"点击复制 "+i.value.id},fe(i.value.id),9,W1),E("button",{class:"btn-copy-md",onClick:D[2]||(D[2]=U=>tt(i.value)),title:"复制为 Markdown"},"⎘")]),E("div",X1,[K.value?(G(),W("span",{key:0,class:"lifeline-link",onClick:D[3]||(D[3]=U=>st(K.value.id))},fe(K.value.name),1)):(G(),W("span",$1,"未归类"))]),a.value?(G(),W("div",q1,"加载详情…")):o.value?(G(),W("div",Y1,[D[17]||(D[17]=ln(" 加载详情失败 ",-1)),E("button",{class:"btn-retry",onClick:l},"重试")])):s.value?(G(),W("div",Z1,[D[39]||(D[39]=E("div",{class:"section-title"},"详情",-1)),(G(!0),W(et,null,Wt(Object.keys(s.value).filter(U=>!["id","created_at","updated_at","completed_at","due_date","estimated_minutes"].includes(U)),U=>(G(),W(et,{key:U},[U==="title"&&i.value.kind!=="item"?(G(),W("div",K1,[D[18]||(D[18]=E("span",{class:"field-label"},"标题",-1)),g.value===U?At((G(),W("input",{key:0,ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":D[4]||(D[4]=O=>v.value=O),class:"field-input",onKeydown:M,onBlur:y},null,544)),[[Zt,v.value]]):(G(),W(et,{key:1},[E("span",{class:"field-value",onDblclick:O=>x(U)},fe(s.value[U]?.slice(0,80)||"—"),41,J1),E("button",{class:"field-edit-btn",onClick:O=>x(U)},"✎",8,j1)],64))])):U==="content"&&(i.value.kind==="memory"||i.value.kind==="item")?(G(),W("div",Q1,[D[19]||(D[19]=E("span",{class:"field-label"},"内容",-1)),g.value===U?(G(),W(et,{key:0},[At(E("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":D[5]||(D[5]=O=>v.value=O),class:"field-textarea",rows:"3",onKeydown:M},null,544),[[Zt,v.value]]),E("div",{class:"field-actions"},[E("button",{class:"btn-save",onClick:y},"保存"),E("button",{class:"btn-cancel",onClick:S},"取消")])],64)):(G(),W(et,{key:1},[E("span",{class:"field-value multiline",onDblclick:O=>x(U)},fe(s.value[U]?.slice(0,200)||"—"),41,ew),E("button",{class:"field-edit-btn",onClick:O=>x(U)},"✎",8,tw)],64))])):U==="detail"&&i.value.kind==="task"?(G(),W("div",nw,[D[20]||(D[20]=E("span",{class:"field-label"},"描述",-1)),g.value===U?(G(),W(et,{key:0},[At(E("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":D[6]||(D[6]=O=>v.value=O),class:"field-textarea",rows:"3",onKeydown:M},null,544),[[Zt,v.value]]),E("div",{class:"field-actions"},[E("button",{class:"btn-save",onClick:y},"保存"),E("button",{class:"btn-cancel",onClick:S},"取消")])],64)):(G(),W(et,{key:1},[E("span",{class:"field-value multiline",onDblclick:O=>x(U)},fe(s.value[U]?.slice(0,200)||"—"),41,iw),E("button",{class:"field-edit-btn",onClick:O=>x(U)},"✎",8,sw)],64))])):U==="decision"&&i.value.kind==="decision"?(G(),W("div",rw,[D[21]||(D[21]=E("span",{class:"field-label"},"决策",-1)),g.value===U?(G(),W(et,{key:0},[At(E("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":D[7]||(D[7]=O=>v.value=O),class:"field-textarea",rows:"3",onKeydown:M},null,544),[[Zt,v.value]]),E("div",{class:"field-actions"},[E("button",{class:"btn-save",onClick:y},"保存"),E("button",{class:"btn-cancel",onClick:S},"取消")])],64)):(G(),W(et,{key:1},[E("span",{class:"field-value multiline",onDblclick:O=>x(U)},fe(s.value[U]?.slice(0,200)||"—"),41,aw),E("button",{class:"field-edit-btn",onClick:O=>x(U)},"✎",8,ow)],64))])):U==="context"&&i.value.kind==="decision"?(G(),W("div",lw,[D[22]||(D[22]=E("span",{class:"field-label"},"背景",-1)),g.value===U?(G(),W(et,{key:0},[At(E("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":D[8]||(D[8]=O=>v.value=O),class:"field-textarea",rows:"2",onKeydown:M},null,544),[[Zt,v.value]]),E("div",{class:"field-actions"},[E("button",{class:"btn-save",onClick:y},"保存"),E("button",{class:"btn-cancel",onClick:S},"取消")])],64)):(G(),W(et,{key:1},[E("span",{class:"field-value multiline",onDblclick:O=>x(U)},fe(s.value[U]?.slice(0,120)||"—"),41,cw),E("button",{class:"field-edit-btn",onClick:O=>x(U)},"✎",8,uw)],64))])):U==="reasoning"&&i.value.kind==="decision"?(G(),W("div",dw,[D[23]||(D[23]=E("span",{class:"field-label"},"推理",-1)),g.value===U?(G(),W(et,{key:0},[At(E("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":D[9]||(D[9]=O=>v.value=O),class:"field-textarea",rows:"2",onKeydown:M},null,544),[[Zt,v.value]]),E("div",{class:"field-actions"},[E("button",{class:"btn-save",onClick:y},"保存"),E("button",{class:"btn-cancel",onClick:S},"取消")])],64)):(G(),W(et,{key:1},[E("span",{class:"field-value multiline",onDblclick:O=>x(U)},fe(s.value[U]?.slice(0,120)||"—"),41,hw),E("button",{class:"field-edit-btn",onClick:O=>x(U)},"✎",8,fw)],64))])):U==="expected_outcome"&&i.value.kind==="decision"?(G(),W("div",pw,[D[24]||(D[24]=E("span",{class:"field-label"},"预期",-1)),g.value===U?(G(),W(et,{key:0},[At(E("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":D[10]||(D[10]=O=>v.value=O),class:"field-textarea",rows:"2",onKeydown:M},null,544),[[Zt,v.value]]),E("div",{class:"field-actions"},[E("button",{class:"btn-save",onClick:y},"保存"),E("button",{class:"btn-cancel",onClick:S},"取消")])],64)):(G(),W(et,{key:1},[E("span",{class:"field-value multiline",onDblclick:O=>x(U)},fe(s.value[U]?.slice(0,120)||"—"),41,mw),E("button",{class:"field-edit-btn",onClick:O=>x(U)},"✎",8,gw)],64))])):U==="priority"&&i.value.kind==="task"?(G(),W("div",_w,[D[26]||(D[26]=E("span",{class:"field-label"},"优先级",-1)),g.value===U?At((G(),W("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":D[11]||(D[11]=O=>v.value=O),class:"field-select",onBlur:y,onKeydown:[si(y,["enter"]),si(S,["escape"])]},[...D[25]||(D[25]=[E("option",{value:"high"},"高",-1),E("option",{value:"medium"},"中",-1),E("option",{value:"low"},"低",-1)])],544)),[[Si,v.value]]):(G(),W(et,{key:1},[E("span",{class:"field-value",onDblclick:O=>x(U)},fe(s.value[U]||"medium"),41,vw),E("button",{class:"field-edit-btn",onClick:O=>x(U)},"✎",8,xw)],64))])):U==="status"&&i.value.kind!=="item"?(G(),W("div",yw,[D[35]||(D[35]=E("span",{class:"field-label"},"状态",-1)),g.value===U?At((G(),W("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":D[12]||(D[12]=O=>v.value=O),class:"field-select",onBlur:y,onKeydown:[si(y,["enter"]),si(S,["escape"])]},[i.value.kind==="task"?(G(),W(et,{key:0},[D[27]||(D[27]=E("option",{value:"todo"},"待办",-1)),D[28]||(D[28]=E("option",{value:"done"},"完成",-1)),D[29]||(D[29]=E("option",{value:"cancelled"},"取消",-1))],64)):i.value.kind==="memory"?(G(),W(et,{key:1},[D[30]||(D[30]=E("option",{value:"candidate"},"候选",-1)),D[31]||(D[31]=E("option",{value:"confirmed"},"已确认",-1)),D[32]||(D[32]=E("option",{value:"archived"},"归档",-1))],64)):(G(),W(et,{key:2},[D[33]||(D[33]=E("option",{value:"pending"},"待回顾",-1)),D[34]||(D[34]=E("option",{value:"reviewed"},"已回顾",-1))],64))],544)),[[Si,v.value]]):(G(),W(et,{key:1},[E("span",bw,fe(s.value[U]),1),E("button",{class:"field-edit-btn",onClick:O=>x(U)},"✎",8,Mw)],64))])):U==="category"&&i.value.kind==="memory"?(G(),W("div",Sw,[D[37]||(D[37]=E("span",{class:"field-label"},"分类",-1)),g.value===U?At((G(),W("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":D[13]||(D[13]=O=>v.value=O),class:"field-select",onBlur:y,onKeydown:[si(y,["enter"]),si(S,["escape"])]},[...D[36]||(D[36]=[wa('<option value="fact" data-v-00ca8067>事实</option><option value="preference" data-v-00ca8067>偏好</option><option value="goal" data-v-00ca8067>目标</option><option value="relationship" data-v-00ca8067>关系</option><option value="event" data-v-00ca8067>事件</option>',5)])],544)),[[Si,v.value]]):(G(),W(et,{key:1},[E("span",ww,fe(s.value[U]),1),E("button",{class:"field-edit-btn",onClick:O=>x(U)},"✎",8,Ew)],64))])):U==="source"||U==="type"?(G(),W("div",Tw,[E("span",Aw,fe(U==="source"?"来源":"类型"),1),E("span",Cw,fe(s.value[U]||"—"),1)])):!ye(U)&&U!=="title"?(G(),W("div",Rw,[E("span",Iw,fe(U),1),g.value===U?At((G(),W("input",{key:0,ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":D[14]||(D[14]=O=>v.value=O),class:"field-input",onKeydown:M,onBlur:y},null,544)),[[Zt,v.value]]):(G(),W("span",{key:1,class:"field-value",onDblclick:O=>x(U)},fe(s.value[U]?.slice(0,60)||"—"),41,Pw))])):Le("",!0)],64))),128)),s.value.created_at?(G(),W("div",Lw,[D[38]||(D[38]=E("span",{class:"field-label"},"创建时间",-1)),E("span",Dw,fe(ue(s.value.created_at)),1)])):Le("",!0)])):Le("",!0),s.value?(G(),W("div",Uw,[i.value.kind==="task"&&s.value.status!=="cancelled"?(G(),W("button",{key:0,class:"btn-action",onClick:C},fe(s.value.status==="todo"?"标记完成":"重开任务"),1)):Le("",!0),i.value.kind==="memory"&&s.value.status!=="archived"?(G(),W("button",{key:1,class:"btn-action",onClick:b},fe(s.value.status==="candidate"?"确认":"归档"),1)):Le("",!0)])):Le("",!0),P.value.length>0?(G(),W("div",Nw,[E("div",{class:"assoc-title",onClick:D[16]||(D[16]=U=>Q.value=!Q.value)},[ln(" 关联 ("+fe(P.value.length)+") ",1),E("span",Fw,[(G(!0),W(et,null,Wt(B.value,(U,O)=>(G(),W("span",{key:O,class:"assoc-type-cnt"},fe(z(O))+":"+fe(U),1))),128))]),E("button",{class:"btn-r",onClick:D[15]||(D[15]=fn(U=>T("enter-relation"),["stop"])),title:"查看关联 (R)"},"R")]),Q.value?(G(),W("div",Ow,[(G(!0),W(et,null,Wt(L.value,U=>(G(),W("div",{key:U.assoc.id,class:Ot(["assoc-summary-row",{pending:U.assoc.status==="pending"}]),onClick:O=>J(U.target.id)},[E("span",Bw,fe(z(U.assoc.relation_type)),1),E("span",zw,fe(Math.round(U.assoc.confidence*100))+"%",1),E("span",Vw,fe(U.isFrom?"→":"←"),1),E("span",Gw,fe(de(U.target.kind)),1),E("span",Hw,fe(U.target.title.slice(0,25)),1)],10,kw))),128)),P.value.length>5?(G(),W("div",Ww," … 查看全部 (共 "+fe(P.value.length)+" 条) ",1)):Le("",!0)])):Le("",!0)])):Le("",!0),E("div",Xw,[E("div",$w,"关联 ("+fe(Y.value.length)+")",1),Y.value.length===0?(G(),W("div",qw,"暂无关联")):Le("",!0),(G(!0),W(et,null,Wt(Y.value,U=>(G(),W("div",{key:U.id,class:"assoc-wrapper"},[E("div",{class:Ot(["assoc-row",{pending:U.status==="pending",expanded:qe(n).selectedAssocId===U.id}])},[E("span",{class:"rel-badge",style:Cs({color:ve(U.relation_type)})},"["+fe(pe(U.relation_type))+"]",5),E("span",{class:"assoc-target",onClick:fn(O=>Be(U),["stop"])},fe(Ce(U).title.slice(0,30)),9,Yw),E("span",Zw,fe(Math.round(U.confidence*100))+"%",1),E("span",{class:Ot(["status-badge",U.status])},fe(U.status==="accepted"?"已确认":"待定"),3),U.status==="pending"?(G(),W("span",Kw,[E("button",{class:"btn-accept",onClick:O=>H(U.id)},"✓",8,Jw),E("button",{class:"btn-reject",onClick:O=>ae(U.id)},"✗",8,jw)])):Le("",!0),E("span",Qw,[E("button",{class:"btn-edit-assoc",onClick:fn(O=>T("edit-assoc",U),["stop"])},"✎",8,eE),E("button",{class:"btn-del-assoc",onClick:fn(O=>T("delete-assoc",U.id),["stop"])},"✕",8,tE)]),E("button",{class:"btn-expand",onClick:fn(O=>qe(n).selectedAssocId===U.id?qe(n).selectAssociation(null):qe(n).selectAssociation(U.id),["stop"])},fe(qe(n).selectedAssocId===U.id?"▾":"▸"),9,nE)],2),qe(n).selectedAssocId===U.id?(G(),W("div",iE,[E("div",sE,"证据 ("+fe(U.evidence?.length||0)+" 条)",1),!U.evidence||U.evidence.length===0?(G(),W("div",rE,"暂无证据详情")):Le("",!0),(G(!0),W(et,null,Wt(U.evidence,(O,j)=>(G(),W("div",{key:j,class:"evidence-item"},[E("div",aE,'"'+fe(O.excerpt.slice(0,120))+fe(O.excerpt.length>120?"…":"")+'"',1),E("div",oE,[E("span",lE,fe(O.type),1),E("span",cE,"权重: "+fe(Math.round(O.weight*100))+"%",1)])]))),128))])):Le("",!0)]))),128))])])):Le("",!0)}}),dE=xn(uE,[["__scopeId","data-v-00ca8067"]]),hE={class:"atlas-search"},fE={key:0,class:"results"},pE={class:"kind-chips"},mE={key:0,class:"no-results"},gE=["onClick"],_E={class:"result-kind"},vE={class:"result-info"},xE={class:"result-title"},yE={class:"result-path"},bE={key:1,class:"recent"},ME=["onClick"],ru="atlas_recent_searches",SE=5,wE=yn({__name:"AtlasSearch",emits:["select","close"],setup(r,{emit:e}){function t(){try{return JSON.parse(localStorage.getItem(ru)||"[]")}catch{return[]}}function n(S){localStorage.setItem(ru,JSON.stringify(S))}const i=De(t());function s(S){const M=S.trim();if(!M)return;const C=t().filter(T=>T!==M);C.unshift(M);const b=C.slice(0,SE);n(b),i.value=b}function a(){localStorage.removeItem(ru),i.value=[]}function o(S){c.value=S,s(S),d.value?.focus()}const l=Hi(),c=De(""),u=De(0),d=De(null),h=De(null),f=Ct(()=>{const S=c.value.trim().toLowerCase();if(!S||!l.data)return[];const M=[];for(const C of l.data.entities)C.title.toLowerCase().includes(S)&&M.push({id:C.id,kind:C.kind,title:C.title,path:g(C.lifeline_id),layer:3});for(const C of l.data.lifelines)if(C.name.toLowerCase().includes(S)){const b=C.parent_id==="ROOT"?1:2,T=l.data.lifelines.find(L=>L.id===C.parent_id),P=T?T.name:"根级 lifeline";M.push({id:C.id,kind:"lifeline",title:C.name,path:P,layer:b})}return M.sort((C,b)=>{const T=C.title.toLowerCase()===S?0:C.title.toLowerCase().startsWith(S)?1:2,P=b.title.toLowerCase()===S?0:b.title.toLowerCase().startsWith(S)?1:2;return T-P||C.title.length-b.title.length}),M.slice(0,8)}),p=Ct(()=>h.value?f.value.filter(S=>S.kind===h.value):f.value);function _(S){h.value=h.value===S?null:S}function g(S){if(!l.data)return"";const M=[];let C=l.data.lifelines.find(b=>b.id===S);for(;C;){M.unshift(C.name);const b=C?.parent_id;C=b?l.data.lifelines.find(T=>T.id===b):void 0}return M.length>=2?`${M[M.length-1]} · ${M[0]}`:M.join(" · ")}function m(S){return S==="lifeline"?"L":S[0].toUpperCase()}function v(S){s(c.value),y("select",S),y("close")}function x(S){S.key==="ArrowDown"?(S.preventDefault(),u.value=Math.min(u.value+1,f.value.length-1)):S.key==="ArrowUp"?(S.preventDefault(),u.value=Math.max(u.value-1,0)):S.key==="Enter"?(S.preventDefault(),f.value[u.value]&&v(f.value[u.value])):S.key==="Escape"&&(S.preventDefault(),y("close"))}const y=e;return Gi(()=>{d.value?.focus()}),(S,M)=>(G(),W("div",hE,[At(E("input",{ref_key:"inputEl",ref:d,"onUpdate:modelValue":M[0]||(M[0]=C=>c.value=C),class:"search-input",placeholder:"搜索 entity 或 lifeline…",onKeydown:x},null,544),[[Zt,c.value]]),c.value.trim()?(G(),W("div",fE,[E("div",pE,[E("button",{class:Ot(["kind-chip",{active:!h.value}]),onClick:M[1]||(M[1]=C=>h.value=null)},"全部",2),E("button",{class:Ot(["kind-chip",{active:h.value==="task"}]),onClick:M[2]||(M[2]=C=>_("task"))},"T",2),E("button",{class:Ot(["kind-chip",{active:h.value==="memory"}]),onClick:M[3]||(M[3]=C=>_("memory"))},"M",2),E("button",{class:Ot(["kind-chip",{active:h.value==="decision"}]),onClick:M[4]||(M[4]=C=>_("decision"))},"D",2),E("button",{class:Ot(["kind-chip",{active:h.value==="item"}]),onClick:M[5]||(M[5]=C=>_("item"))},"I",2)]),p.value.length===0?(G(),W("div",mE,"无匹配结果")):Le("",!0),(G(!0),W(et,null,Wt(p.value,(C,b)=>(G(),W("div",{key:C.id,class:Ot(["result-row",{selected:b===u.value}]),onClick:T=>v(C)},[E("span",_E,fe(m(C.kind)),1),E("div",vE,[E("div",xE,fe(C.title),1),E("div",yE,fe(C.path),1)])],10,gE))),128))])):i.value.length>0?(G(),W("div",bE,[M[6]||(M[6]=E("div",{class:"recent-title"},"最近搜索",-1)),(G(!0),W(et,null,Wt(i.value,(C,b)=>(G(),W("div",{key:b,class:"recent-row",onClick:T=>o(C)},fe(C),9,ME))),128)),E("button",{class:"recent-clear",onClick:a},"清除历史")])):Le("",!0)]))}}),EE=xn(wE,[["__scopeId","data-v-700b2580"]]),TE={key:0,class:"submenu"},AE=["disabled","onClick"],CE=["disabled","onClick"],RE={key:0,class:"subitem empty"},IE=yn({__name:"ContextMenu",props:{target:{},x:{},y:{}},emits:["close","edit-title","delete-entity","move-lifeline","edit-lifeline-name","associate-to","find-path-to","copy-title","delete-lifeline","quick-create"],setup(r,{emit:e}){const t=r,n=e,i=Hi(),s=De(null),a=De(null),o=Ct(()=>{let M=t.x,C=t.y;return M+200>window.innerWidth&&(M=window.innerWidth-200-4),C+300>window.innerHeight&&(C=window.innerHeight-300-4),{left:`${M}px`,top:`${C}px`}}),l=Ct(()=>t.target.layer===3),c=Ct(()=>i.data?i.data.lifelines.filter(S=>S.parent_id==="ROOT").map(S=>({...S,children:i.data.lifelines.filter(M=>M.parent_id===S.id)})):[]),u=Ct(()=>!i.data||!t.target.id?null:i.data.entities.find(S=>S.id===t.target.id)?.lifeline_id??null);function d(){n("edit-title",t.target),n("close")}function h(){n("delete-entity",t.target),n("close")}function f(y){n("move-lifeline",t.target.id,y),n("close")}function p(){n("associate-to",t.target),n("close")}function _(){n("find-path-to",t.target),n("close")}function g(){n("copy-title",t.target),n("close")}function m(){n("edit-lifeline-name",t.target),n("close")}function v(y){s.value&&!s.value.contains(y.target)&&n("close")}function x(y){y.key==="Escape"&&n("close")}return Gi(()=>{document.addEventListener("pointerdown",v,!0),document.addEventListener("keydown",x)}),us(()=>{document.removeEventListener("pointerdown",v,!0),document.removeEventListener("keydown",x)}),(y,S)=>(G(),W("div",{ref_key:"menuRef",ref:s,class:"ctx-menu",style:Cs(o.value)},[l.value?(G(),W(et,{key:0},[E("button",{class:"ctx-item",onClick:d},"编辑标题…"),E("div",{class:"ctx-item has-sub",onPointerenter:S[0]||(S[0]=M=>a.value="lifeline"),onPointerleave:S[1]||(S[1]=M=>a.value=null)},[S[4]||(S[4]=ln(" 移动到 lifeline ▸ ",-1)),a.value==="lifeline"?(G(),W("div",TE,[(G(!0),W(et,null,Wt(c.value,M=>(G(),W(et,{key:M.id},[E("button",{class:Ot(["subitem r1-item",{current:M.id===u.value}]),disabled:M.id===u.value,onClick:C=>f(M.id)},fe(M.name),11,AE),(G(!0),W(et,null,Wt(M.children,C=>(G(),W("button",{key:C.id,class:Ot(["subitem r2-item",{current:C.id===u.value}]),disabled:C.id===u.value,onClick:b=>f(C.id)},fe(C.name),11,CE))),128))],64))),128)),c.value.length===0?(G(),W("div",RE,"暂无 lifeline")):Le("",!0)])):Le("",!0)],32),E("button",{class:"ctx-item",onClick:p},"关联到…"),E("button",{class:"ctx-item",onClick:_},"查找路径到…"),E("button",{class:"ctx-item",onClick:g},"复制标题"),S[5]||(S[5]=E("div",{class:"ctx-separator"},null,-1)),E("button",{class:"ctx-item danger",onClick:h},"删除")],64)):(G(),W(et,{key:1},[E("button",{class:"ctx-item",onClick:S[2]||(S[2]=M=>{n("quick-create",t.target.id),n("close")})},"新建 entity…"),S[6]||(S[6]=E("div",{class:"ctx-separator"},null,-1)),E("button",{class:"ctx-item",onClick:m},"编辑名称…"),S[7]||(S[7]=E("div",{class:"ctx-separator"},null,-1)),E("button",{class:"ctx-item danger",onClick:S[3]||(S[3]=M=>{n("delete-lifeline",t.target.id,t.target.title),n("close")})},"删除 lifeline")],64))],4))}}),PE=xn(IE,[["__scopeId","data-v-59974e34"]]),LE={class:"confirm-title"},DE={key:0,class:"confirm-message"},UE={class:"confirm-actions"},NE=yn({__name:"ConfirmDialog",props:{title:{},message:{default:""},confirmLabel:{default:"确认"},cancelLabel:{default:"取消"},danger:{type:Boolean,default:!1}},emits:["confirm","cancel"],setup(r,{emit:e}){const t=e;function n(i){i.key==="Escape"&&t("cancel"),i.key==="Enter"&&t("confirm")}return Gi(()=>{document.addEventListener("keydown",n)}),us(()=>{document.removeEventListener("keydown",n)}),(i,s)=>(G(),W("div",{class:"confirm-overlay",onPointerdown:s[3]||(s[3]=a=>t("cancel"))},[E("div",{class:"confirm-dialog",onPointerdown:s[2]||(s[2]=fn(()=>{},["stop"]))},[E("div",LE,fe(r.title),1),r.message?(G(),W("div",DE,fe(r.message),1)):Le("",!0),E("div",UE,[E("button",{class:"confirm-btn cancel-btn",onClick:s[0]||(s[0]=a=>t("cancel"))},fe(r.cancelLabel),1),E("button",{class:Ot(["confirm-btn",r.danger?"danger-btn":"primary-btn"]),onClick:s[1]||(s[1]=a=>t("confirm"))},fe(r.confirmLabel),3)])],32)],32))}}),FE=xn(NE,[["__scopeId","data-v-128fcad2"]]),OE={class:"dialog"},kE={class:"dialog-title"},BE={class:"field-row"},zE={class:"entity-ref"},VE={class:"field-row"},GE={class:"entity-ref"},HE={key:0,class:"status-row"},WE={class:"field-row"},XE=["value"],$E={class:"field-row"},qE={class:"label"},YE={class:"conf-value"},ZE={class:"evidence-section"},KE=["onUpdate:modelValue"],JE=["onUpdate:modelValue"],jE=["onClick"],QE={class:"dialog-actions"},eT={key:1,class:"delete-area"},tT={key:2,class:"delete-confirm"},nT=yn({__name:"AssociationEditDialog",props:{fromId:{},fromTitle:{},toId:{},toTitle:{},existing:{}},emits:["cancel","create","update","delete"],setup(r,{emit:e}){const t=r,n=e,i=De(t.existing?.relation_type||"manual"),s=De(t.existing?.confidence??.7),a=Sf(t.existing?.evidence?.length?t.existing.evidence.map(_=>({..._})):[{type:"manual",excerpt:"",weight:.8}]),o=!t.existing,l=De(!1),c=[{value:"co_occurrence",label:"共现"},{value:"causal",label:"因果"},{value:"tension",label:"张力"},{value:"derived_from",label:"衍生"},{value:"manual",label:"人工标注"}];function u(){a.length<5&&a.push({type:"manual",excerpt:"",weight:.5})}function d(_){a.length>1&&a.splice(_,1)}function h(){o?n("create",{from:t.fromId,to:t.toId,relation_type:i.value,confidence:s.value,evidence:a.filter(_=>_.excerpt.trim())}):n("update",{association_id:t.existing.id,relation_type:i.value,confidence:s.value,evidence:a.filter(_=>_.excerpt.trim())})}function f(){n("delete",t.existing.id)}function p(_){_.key==="Escape"&&n("cancel")}return Gi(()=>{document.addEventListener("keydown",p)}),us(()=>{document.removeEventListener("keydown",p)}),(_,g)=>(G(),W("div",{class:"dialog-overlay",onClick:g[5]||(g[5]=fn(m=>n("cancel"),["self"]))},[E("div",OE,[E("div",kE,fe(o?"新建关联":"编辑关联"),1),E("div",BE,[g[6]||(g[6]=E("span",{class:"label"},"从",-1)),E("span",zE,fe(r.fromTitle.slice(0,30)),1)]),E("div",VE,[g[7]||(g[7]=E("span",{class:"label"},"到",-1)),E("span",GE,fe(r.toTitle.slice(0,30)),1)]),o?Le("",!0):(G(),W("div",HE,[g[8]||(g[8]=E("span",{class:"label"},"状态",-1)),E("span",{class:Ot(["status-badge",t.existing.status])},fe(t.existing.status==="accepted"?"已确认":t.existing.status==="rejected"?"已拒绝":"待定"),3)])),E("div",WE,[g[9]||(g[9]=E("label",{class:"label",for:"rel-type"},"关系类型",-1)),At(E("select",{id:"rel-type","onUpdate:modelValue":g[0]||(g[0]=m=>i.value=m),class:"field"},[(G(),W(et,null,Wt(c,m=>E("option",{key:m.value,value:m.value},fe(m.label),9,XE)),64))],512),[[Si,i.value]])]),E("div",$E,[E("label",qE,[g[10]||(g[10]=ln(" 信心度 ",-1)),E("span",YE,fe(s.value.toFixed(2)),1)]),At(E("input",{"onUpdate:modelValue":g[1]||(g[1]=m=>s.value=m),type:"range",min:"0.3",max:"1.0",step:"0.01",class:"slider"},null,512),[[Zt,s.value,void 0,{number:!0}]])]),E("div",ZE,[g[12]||(g[12]=E("span",{class:"label"},"证据",-1)),(G(!0),W(et,null,Wt(a,(m,v)=>(G(),W("div",{key:v,class:"evidence-edit-row"},[At(E("select",{"onUpdate:modelValue":x=>m.type=x,class:"field evidence-type-sel"},[...g[11]||(g[11]=[wa('<option value="manual" data-v-0ae04a56>人工标注</option><option value="semantic" data-v-0ae04a56>语义相似</option><option value="co_occurrence" data-v-0ae04a56>共现统计</option><option value="temporal" data-v-0ae04a56>时间序列</option><option value="causal_hint" data-v-0ae04a56>因果模式</option>',5)])],8,KE),[[Si,m.type]]),At(E("input",{"onUpdate:modelValue":x=>m.excerpt=x,class:"field evidence-excerpt",placeholder:"证据摘要（10-120 字）"},null,8,JE),[[Zt,m.excerpt]]),a.length>1?(G(),W("button",{key:0,class:"btn-icon",onClick:x=>d(v)},"×",8,jE)):Le("",!0)]))),128)),a.length<5?(G(),W("button",{key:0,class:"btn-text",onClick:u},"+ 添加证据")):Le("",!0)]),E("div",QE,[E("button",{class:"btn-cancel",onClick:g[2]||(g[2]=m=>n("cancel"))},"取消"),E("button",{class:"btn-submit",onClick:h},fe(o?"创建关联":"保存修改"),1)]),!o&&!l.value?(G(),W("div",eT,[E("button",{class:"btn-delete",onClick:g[3]||(g[3]=m=>l.value=!0)},"删除关联")])):Le("",!0),l.value?(G(),W("div",tT,[g[13]||(g[13]=ln(" 确定删除此关联？ ",-1)),E("button",{class:"btn-delete",onClick:f},"确认删除"),E("button",{class:"btn-text",onClick:g[4]||(g[4]=m=>l.value=!1)},"取消")])):Le("",!0)])]))}}),iT=xn(nT,[["__scopeId","data-v-0ae04a56"]]),sT={class:"legend-section"},rT={class:"legend-section"},aT=yn({__name:"LegendBar",props:{showAssoc:{type:Boolean},filter:{}},emits:["update:filter"],setup(r,{emit:e}){const t=r,n=e,i=De(!1),s=De(!1);let a;function o(){i.value=!1,a&&clearTimeout(a),a=window.setTimeout(()=>{s.value||(i.value=!0)},5e3)}Gi(()=>o()),us(()=>{a&&clearTimeout(a)}),Lo(()=>t.showAssoc,()=>o());function l(f){const p={types:{...t.filter.types},statuses:{...t.filter.statuses}};p.types[f]=!p.types[f],n("update:filter",p)}function c(f){const p={types:{...t.filter.types},statuses:{...t.filter.statuses}};p.statuses[f]=!p.statuses[f],n("update:filter",p)}function u(){const p=!(Object.values(t.filter.types).every(_=>_)&&Object.values(t.filter.statuses).every(_=>_));n("update:filter",{types:{causal:p,co_occurrence:p,tension:p,derived_from:p,manual:p},statuses:{accepted:p,pending:p,rejected:p}})}function d(){n("update:filter",{types:{causal:!0,co_occurrence:!0,tension:!0,derived_from:!0,manual:!0},statuses:{accepted:!0,pending:!0,rejected:!0}})}const h=Ct(()=>!Object.values(t.filter.types).every(f=>f)||!Object.values(t.filter.statuses).every(f=>f));return(f,p)=>(G(),W("div",{class:Ot(["legend-bar",{faded:i.value&&!s.value}]),onMouseenter:p[6]||(p[6]=_=>{s.value=!0,i.value=!1}),onMouseleave:p[7]||(p[7]=_=>{s.value=!1,o()})},[p[15]||(p[15]=wa('<div class="legend-section" data-v-da16eab0><span class="legend-title" data-v-da16eab0>节点</span><span class="legend-item" data-v-da16eab0><span class="dot task" data-v-da16eab0>■</span> 任务</span><span class="legend-item" data-v-da16eab0><span class="dot memory" data-v-da16eab0>●</span> 记忆</span><span class="legend-item" data-v-da16eab0><span class="dot decision" data-v-da16eab0>◆</span> 决策</span><span class="legend-item" data-v-da16eab0><span class="dot item" data-v-da16eab0>▲</span> 条目</span></div>',1)),r.showAssoc?(G(),W(et,{key:0},[p[13]||(p[13]=E("div",{class:"legend-sep"},"|",-1)),E("div",sT,[p[12]||(p[12]=E("span",{class:"legend-title"},"关联",-1)),E("span",{class:Ot(["legend-item",{inactive:!r.filter.types.causal}]),onClick:p[0]||(p[0]=_=>l("causal"))},[...p[8]||(p[8]=[E("span",{class:"line-sample causal"},null,-1),ln(" 因果",-1)])],2),E("span",{class:Ot(["legend-item",{inactive:!r.filter.types.co_occurrence}]),onClick:p[1]||(p[1]=_=>l("co_occurrence"))},[...p[9]||(p[9]=[E("span",{class:"line-sample co"},null,-1),ln(" 共现",-1)])],2),E("span",{class:Ot(["legend-item",{inactive:!r.filter.types.tension}]),onClick:p[2]||(p[2]=_=>l("tension"))},[...p[10]||(p[10]=[E("span",{class:"line-sample tension"},null,-1),ln(" 张力",-1)])],2),E("span",{class:Ot(["legend-item",{inactive:!r.filter.types.derived_from}]),onClick:p[3]||(p[3]=_=>l("derived_from"))},[...p[11]||(p[11]=[E("span",{class:"line-sample derived"},null,-1),ln(" 衍生",-1)])],2)]),p[14]||(p[14]=E("div",{class:"legend-sep"},"|",-1)),E("div",rT,[E("span",{class:Ot(["legend-item",{inactive:!r.filter.statuses.accepted}]),onClick:p[4]||(p[4]=_=>c("accepted"))},"已确认",2),E("span",{class:Ot(["legend-item",{inactive:!r.filter.statuses.pending}]),onClick:p[5]||(p[5]=_=>c("pending"))},"待确认",2)]),E("span",{class:Ot(["legend-item",{inactive:Object.values(r.filter.types).every(_=>_)&&Object.values(r.filter.statuses).every(_=>_)}]),onClick:u},"全部",2),h.value?(G(),W("span",{key:0,class:"legend-reset",onClick:d},"重置")):Le("",!0)],64)):Le("",!0)],34))}}),oT=xn(aT,[["__scopeId","data-v-da16eab0"]]),Vn=180,lT=yn({__name:"Minimap",props:{layoutNodes:{},camera:{},controls:{},worldRadius:{},focusedLifelineId:{}},emits:["jump"],setup(r,{emit:e}){const t=r,n=e,i=De(null);let s=0;function a(c){const u=Vn/(t.worldRadius*2.4),d=Vn/2,h=Vn/2;return{x:d+c.x*u,y:h-c.z*u}}function o(){const c=i.value;if(!c)return;const u=c.getContext("2d");if(!u)return;const d=window.devicePixelRatio||1;c.width=Vn*d,c.height=Vn*d,u.scale(d,d),u.fillStyle="rgba(7, 9, 13, 0.85)",u.beginPath(),u.roundRect(0,0,Vn,Vn,8),u.fill(),u.strokeStyle="rgba(255,255,255,0.06)",u.lineWidth=1,u.beginPath(),u.arc(Vn/2,Vn/2,Vn/2.6,0,Math.PI*2),u.stroke();const h=t.layoutNodes.filter(p=>p.layer===1),f=t.layoutNodes.filter(p=>p.layer===2);for(const p of f){const _=a(p.position);u.fillStyle="rgba(255,255,255,0.2)",u.beginPath(),u.arc(_.x,_.y,2,0,Math.PI*2),u.fill()}for(const p of h){const _=a(p.position);p.id===t.focusedLifelineId&&(u.strokeStyle="#6ee7d0",u.lineWidth=2,u.beginPath(),u.arc(_.x,_.y,5,0,Math.PI*2),u.stroke()),u.fillStyle="#6ee7d0",u.beginPath(),u.arc(_.x,_.y,3,0,Math.PI*2),u.fill()}if(t.camera&&t.controls){const p=t.camera.position,_=a(p),g=t.controls.target||new I(0,0,0),m=a(g);u.strokeStyle="#6ee7d0",u.lineWidth=1;const v=22+(p.length()-2)*5,x=16+(p.length()-2)*3.5;u.strokeRect(_.x-v/2,_.y-x/2,v,x),u.beginPath(),u.moveTo(_.x,_.y),u.lineTo(m.x,m.y),u.strokeStyle="rgba(110,231,208,0.3)",u.stroke()}s=requestAnimationFrame(o)}function l(c){if(!i.value?.getBoundingClientRect())return;const d=c.offsetX,h=c.offsetY,f=Vn/(t.worldRadius*2.4),p=Vn/2,_=Vn/2,g=(d-p)/f,m=-(h-_)/f,x=new I(g,.3,m).normalize().clone().multiplyScalar(4.5),y=new I(0,0,0);n("jump",x,y)}return Gi(()=>{s=requestAnimationFrame(o)}),us(()=>{cancelAnimationFrame(s)}),(c,u)=>(G(),W("canvas",{ref_key:"canvasRef",ref:i,class:"minimap",width:180,height:180,onClick:l},null,512))}}),cT=xn(lT,[["__scopeId","data-v-210e4d3a"]]),uT={key:0,class:"path-panel"},dT={class:"path-title"},hT={key:0},fT={class:"path-steps"},pT=["onClick"],mT={class:"path-kind"},gT={class:"path-e-title"},_T={key:0,class:"path-assoc"},vT={class:"path-a-type"},xT={class:"path-a-conf"},yT={class:"path-actions"},bT=["disabled"],MT=["disabled"],ST={key:1,class:"path-panel"},wT=yn({__name:"PathPanel",props:{paths:{},currentPathIndex:{},fromTitle:{},toTitle:{}},emits:["prev-path","next-path","clear","focus-entity","copied"],setup(r,{emit:e}){const t=r,n=e;async function i(){let c=`**路径（${a.value} 跳）**：
`;s.value.forEach((u,d)=>{c+=`${d+1}. ${u.entityTitle} (\`${u.entityId}\`)
`,u.assocId&&(c+=`   [${o(u.assocType||"")} ${u.assocConfidence?Math.round(u.assocConfidence*100)+"%":""}] →
`)}),await navigator.clipboard.writeText(c),n("copied")}const s=Ct(()=>t.paths[t.currentPathIndex]||[]),a=Ct(()=>s.value.length-1);function o(c){return{co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[c]||c}function l(c){const u=c.split(":")[0];return u==="task"?"T":u==="memory"?"M":u==="decision"?"D":u==="item"?"I":"?"}return(c,u)=>r.paths.length>0?(G(),W("div",uT,[E("div",dT,[ln("路径（"+fe(a.value)+" 跳）",1),r.paths.length>1?(G(),W("span",hT," 共 "+fe(r.paths.length)+" 条 · "+fe(r.currentPathIndex+1)+"/"+fe(r.paths.length),1)):Le("",!0)]),E("div",fT,[(G(!0),W(et,null,Wt(s.value,(d,h)=>(G(),W(et,{key:h},[E("div",{class:"path-entity",onClick:f=>n("focus-entity",d.entityId)},[E("span",mT,fe(l(d.entityId)),1),E("span",gT,fe(d.entityTitle.slice(0,30)),1)],8,pT),d.assocId?(G(),W("div",_T,[u[4]||(u[4]=E("span",{class:"path-line"},"┊",-1)),E("span",vT,"["+fe(o(d.assocType||""))+"]",1),E("span",xT,fe(d.assocConfidence?Math.round(d.assocConfidence*100)+"%":""),1)])):Le("",!0)],64))),128))]),E("div",yT,[r.paths.length>1?(G(),W("button",{key:0,class:"path-btn",disabled:r.currentPathIndex===0,onClick:u[0]||(u[0]=d=>n("prev-path"))},"上一条",8,bT)):Le("",!0),r.paths.length>1?(G(),W("button",{key:1,class:"path-btn",disabled:r.currentPathIndex>=r.paths.length-1,onClick:u[1]||(u[1]=d=>n("next-path"))},"下一条",8,MT)):Le("",!0),E("button",{class:"path-btn",onClick:i},"复制路径"),E("button",{class:"path-btn clear",onClick:u[2]||(u[2]=d=>n("clear"))},"清除")])])):(G(),W("div",ST,[u[5]||(u[5]=E("div",{class:"path-title"},"未找到路径",-1)),u[6]||(u[6]=E("div",{class:"path-none"},"深度 5 内无连接",-1)),E("button",{class:"path-btn clear",onClick:u[3]||(u[3]=d=>n("clear"))},"关闭")]))}}),ET=xn(wT,[["__scopeId","data-v-cb34b2fb"]]),TT={class:"sp-panel"},AT={class:"sp-header"},CT=yn({__name:"ShortcutPanel",emits:["close"],setup(r,{emit:e}){const t=e;function n(i){(i.key==="?"||i.key==="Escape")&&t("close")}return Gi(()=>{document.addEventListener("keydown",n)}),us(()=>{document.removeEventListener("keydown",n)}),(i,s)=>(G(),W("div",{class:"sp-overlay",onClick:s[1]||(s[1]=fn(a=>t("close"),["self"]))},[E("div",TT,[E("div",AT,[s[2]||(s[2]=E("span",{class:"sp-title"},"快捷键参考",-1)),E("button",{class:"sp-close",onClick:s[0]||(s[0]=a=>t("close"))},"✕")]),s[3]||(s[3]=wa('<div class="sp-grid" data-v-4c3ba46f><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>全局</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Ctrl+K</kbd> <kbd data-v-4c3ba46f>/</kbd> <span data-v-4c3ba46f>搜索 entity/lifeline</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>?</kbd> <span data-v-4c3ba46f>显示/隐藏此面板</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>滚轮</kbd> <span data-v-4c3ba46f>缩放</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>拖拽</kbd> <span data-v-4c3ba46f>旋转</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>global_overview</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>左键点击 R1</kbd> <span data-v-4c3ba46f>进入 lifeline 区域</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>region_zoom</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>返回全局视图</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>左键点击 R2/R3</kbd> <span data-v-4c3ba46f>聚焦 entity</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>右键 R1/R2</kbd> <span data-v-4c3ba46f>新建 entity / 编辑名称</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>node_focus</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>返回 lifeline 区域</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>R</kbd> <span data-v-4c3ba46f>查看关联（relation_reveal）</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>右键 entity</kbd> <span data-v-4c3ba46f>编辑/移动/删除/关联/路径查找</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>双击标题</kbd> <span data-v-4c3ba46f>内联编辑标题</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>relation_reveal</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>返回 node_focus</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>R</kbd> <span data-v-4c3ba46f>退出关联视图</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>点击关联线</kbd> <span data-v-4c3ba46f>查看证据</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>筛选条</kbd> <span data-v-4c3ba46f>按类型/信心度过滤</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>路径查找</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>右键 → 查找路径</kbd> <span data-v-4c3ba46f>进入路径选择模式</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>退出路径模式</span></div></div></div>',1))])]))}}),RT=xn(CT,[["__scopeId","data-v-4c3ba46f"]]),IT={class:"qcd-dialog"},PT={class:"qcd-header"},LT={class:"qcd-field"},DT={key:0,class:"qcd-field"},UT={key:1,class:"qcd-field"},NT={key:2,class:"qcd-field"},FT={key:3,class:"qcd-field"},OT={class:"qcd-field"},kT=["value"],BT={class:"qcd-actions"},zT=["disabled"],VT=yn({__name:"QuickCreateDialog",props:{defaultLifelineId:{}},emits:["close"],setup(r,{emit:e}){const t=r,n=e,i=Hi(),s=De("task"),a=De(""),o=De(""),l=De(""),c=De("fact"),u=De(t.defaultLifelineId||""),d=De(!1),h=Ct(()=>s.value==="task"?a.value.trim():s.value==="memory"?o.value.trim():s.value==="decision"?a.value.trim():s.value==="item"?o.value.trim():!1),f=Ct(()=>{const g=[];if(!i.data)return g;const m=i.data.lifelines.filter(v=>v.parent_id==="ROOT");for(const v of m){g.push({id:v.id,name:v.name,depth:0});const x=i.data.lifelines.filter(y=>y.parent_id===v.id);for(const y of x)g.push({id:y.id,name:"  "+y.name,depth:1})}return g});async function p(){if(!(!h.value||d.value)){d.value=!0;try{let g,m=s.value;if(s.value==="task"){const{createTask:v}=await yt(async()=>{const{createTask:y}=await import("./index-Bj2wMeSL.js").then(S=>S.e);return{createTask:y}},__vite__mapDeps([0,1,2]));g=(await v({title:a.value.trim()})).id}else if(s.value==="memory"){const{createMemory:v}=await yt(async()=>{const{createMemory:y}=await import("./index-Bj2wMeSL.js").then(S=>S.e);return{createMemory:y}},__vite__mapDeps([0,1,2]));g=(await v({category:c.value,content:o.value.trim()})).id}else if(s.value==="decision"){const{createDecision:v}=await yt(async()=>{const{createDecision:y}=await import("./index-Bj2wMeSL.js").then(S=>S.e);return{createDecision:y}},__vite__mapDeps([0,1,2]));g=(await v({title:a.value.trim(),decision:l.value.trim()})).id}else{const{addNote:v}=await yt(async()=>{const{addNote:y}=await import("./index-Bj2wMeSL.js").then(S=>S.e);return{addNote:y}},__vite__mapDeps([0,1,2]));g=(await v(o.value.trim())).id,m="item"}u.value&&await i.mountEntity(m,g,u.value),await i.reload(),n("close")}finally{d.value=!1}}}function _(g){g.key==="Escape"&&n("close")}return Gi(()=>{document.addEventListener("keydown",_)}),us(()=>{document.removeEventListener("keydown",_)}),(g,m)=>(G(),W("div",{class:"qcd-overlay",onClick:m[8]||(m[8]=fn(v=>n("close"),["self"]))},[E("div",IT,[E("div",PT,[m[9]||(m[9]=E("span",{class:"qcd-title"},"快速创建",-1)),E("button",{class:"qcd-close",onClick:m[0]||(m[0]=v=>n("close"))},"✕")]),E("div",LT,[m[11]||(m[11]=E("label",{class:"qcd-label"},"类型",-1)),At(E("select",{"onUpdate:modelValue":m[1]||(m[1]=v=>s.value=v),class:"qcd-select"},[...m[10]||(m[10]=[E("option",{value:"task"},"任务",-1),E("option",{value:"memory"},"记忆",-1),E("option",{value:"decision"},"决策",-1),E("option",{value:"item"},"条目",-1)])],512),[[Si,s.value]])]),s.value==="task"||s.value==="decision"?(G(),W("div",DT,[m[12]||(m[12]=E("label",{class:"qcd-label"},"标题",-1)),At(E("input",{"onUpdate:modelValue":m[2]||(m[2]=v=>a.value=v),class:"qcd-input",placeholder:"输入标题…"},null,512),[[Zt,a.value]])])):Le("",!0),s.value==="memory"||s.value==="item"?(G(),W("div",UT,[m[13]||(m[13]=E("label",{class:"qcd-label"},"内容",-1)),At(E("input",{"onUpdate:modelValue":m[3]||(m[3]=v=>o.value=v),class:"qcd-input",placeholder:"输入内容…"},null,512),[[Zt,o.value]])])):Le("",!0),s.value==="decision"?(G(),W("div",NT,[m[14]||(m[14]=E("label",{class:"qcd-label"},"决策",-1)),At(E("input",{"onUpdate:modelValue":m[4]||(m[4]=v=>l.value=v),class:"qcd-input",placeholder:"决策描述（选填）"},null,512),[[Zt,l.value]])])):Le("",!0),s.value==="memory"?(G(),W("div",FT,[m[16]||(m[16]=E("label",{class:"qcd-label"},"分类",-1)),At(E("select",{"onUpdate:modelValue":m[5]||(m[5]=v=>c.value=v),class:"qcd-select"},[...m[15]||(m[15]=[wa('<option value="fact" data-v-22486ab5>事实</option><option value="preference" data-v-22486ab5>偏好</option><option value="goal" data-v-22486ab5>目标</option><option value="relationship" data-v-22486ab5>关系</option><option value="event" data-v-22486ab5>事件</option>',5)])],512),[[Si,c.value]])])):Le("",!0),E("div",OT,[m[18]||(m[18]=E("label",{class:"qcd-label"},"归类",-1)),At(E("select",{"onUpdate:modelValue":m[6]||(m[6]=v=>u.value=v),class:"qcd-select"},[m[17]||(m[17]=E("option",{value:""},"不挂载",-1)),(G(!0),W(et,null,Wt(f.value,v=>(G(),W("option",{key:v.id,value:v.id},fe(v.name),9,kT))),128))],512),[[Si,u.value]])]),E("div",BT,[E("button",{class:"qcd-btn cancel",onClick:m[7]||(m[7]=v=>n("close"))},"取消"),E("button",{class:"qcd-btn submit",disabled:!h.value||d.value,onClick:p},fe(d.value?"创建中…":"创建"),9,zT)])])]))}}),GT=xn(VT,[["__scopeId","data-v-22486ab5"]]),HT={class:"pending-panel"},WT={class:"pending-header"},XT={class:"pending-count"},$T={key:0,class:"pending-empty"},qT={class:"pending-list"},YT={class:"pending-assoc-info"},ZT={class:"pending-rel"},KT={class:"pending-conf"},JT={class:"pending-entity from"},jT={class:"pending-kind"},QT=["onClick"],eA={class:"pending-entity to"},tA={class:"pending-kind"},nA=["onClick"],iA=["onClick"],sA={class:"ev-toggle-icon"},rA={key:1,class:"no-evidence"},aA={key:2,class:"evidence-list"},oA={class:"ev-header"},lA={class:"ev-type"},cA={class:"ev-weight"},uA={class:"ev-weight-track"},dA=["title"],hA={class:"pending-actions"},fA=["onClick"],pA=["onClick"],mA=yn({__name:"PendingReviewPanel",emits:["close","focus-entity"],setup(r,{emit:e}){const t=Hi(),n=De(new Set);function i(f){n.value.has(f)?n.value.delete(f):n.value.add(f),n.value=new Set(n.value)}function s(f){return{semantic:"语义",keyword:"关键词",co_occurrence:"共现",temporal:"时序",causal:"因果",manual:"手动"}[f]||f}const a=e,o=Ct(()=>t.data?t.data.associations.filter(f=>f.status==="pending").map(f=>{const p=t.data?.entities.find(g=>g.id===f.from),_=t.data?.entities.find(g=>g.id===f.to);return{assoc:f,fromTitle:p?.title||f.from,toTitle:_?.title||f.to}}):[]);function l(f){return{co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[f]||f}function c(f){const p=f.split(":")[0];return p==="task"?"T":p==="memory"?"M":p==="decision"?"D":p==="item"?"I":"?"}async function u(f){await t.reviewAssociation(f,"accepted")}async function d(f){await t.reviewAssociation(f,"rejected")}function h(f){a("focus-entity",f),a("close")}return(f,p)=>(G(),W("div",HT,[E("div",WT,[p[1]||(p[1]=E("span",{class:"pending-title"},"待确认关联",-1)),E("span",XT,"共 "+fe(o.value.length)+" 条",1),E("button",{class:"pending-close",onClick:p[0]||(p[0]=_=>a("close"))},"✕")]),o.value.length===0?(G(),W("div",$T,"无待确认关联")):Le("",!0),E("div",qT,[(G(!0),W(et,null,Wt(o.value,_=>(G(),W("div",{key:_.assoc.id,class:"pending-item"},[E("div",YT,[E("span",ZT,fe(l(_.assoc.relation_type)),1),E("span",KT,fe(Math.round(_.assoc.confidence*100))+"%",1)]),E("div",JT,[E("span",jT,fe(c(_.assoc.from)),1),E("span",{class:"pending-entity-title",onClick:g=>h(_.assoc.from)},fe(_.fromTitle.slice(0,30)),9,QT)]),p[2]||(p[2]=E("div",{class:"pending-arrow"},"→",-1)),E("div",eA,[E("span",tA,fe(c(_.assoc.to)),1),E("span",{class:"pending-entity-title",onClick:g=>h(_.assoc.to)},fe(_.toTitle.slice(0,30)),9,nA)]),_.assoc.evidence&&_.assoc.evidence.length>0?(G(),W("div",{key:0,class:"evidence-toggle",onClick:g=>i(_.assoc.id)},[E("span",sA,fe(n.value.has(_.assoc.id)?"▾":"▸"),1),E("span",null,fe(_.assoc.evidence.length)+" 条证据",1)],8,iA)):(G(),W("div",rA,"无证据")),n.value.has(_.assoc.id)&&_.assoc.evidence?(G(),W("div",aA,[(G(!0),W(et,null,Wt(_.assoc.evidence||[],(g,m)=>(G(),W("div",{key:m,class:"ev-item"},[E("div",oA,[E("span",lA,fe(s(g.type)),1),E("span",cA,fe(Math.round(g.weight*100))+"%",1)]),E("div",uA,[E("div",{class:"ev-weight-fill",style:Cs({width:g.weight*100+"%"})},null,4)]),E("div",{class:"ev-excerpt",title:g.excerpt},fe(g.excerpt.slice(0,100))+fe(g.excerpt.length>100?"…":""),9,dA)]))),128))])):Le("",!0),E("div",hA,[E("button",{class:"pending-btn accept",onClick:g=>u(_.assoc.id)},"✓",8,fA),E("button",{class:"pending-btn reject",onClick:g=>d(_.assoc.id)},"✗",8,pA)])]))),128))])]))}}),gA=xn(mA,[["__scopeId","data-v-85412e96"]]),_A={class:"export-dialog"},vA={class:"export-stats"},xA={class:"stat-row"},yA={class:"stat-row"},bA={class:"stat-row"},MA={class:"export-options"},SA=yn({__name:"ExportDialog",emits:["close"],setup(r,{emit:e}){const t=Hi(),n=e,i=Ct(()=>t.data?.lifelines.length||0),s=Ct(()=>t.data?.entities.length||0),a=Ct(()=>t.data?.associations.length||0);function o(u){return{co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[u]||u}function l(u){const d=[],h=new Date().toISOString().slice(0,10);d.push(`# Axiom Atlas 导出 — ${h}`,"","## 概览","");const f={task:0,memory:0,decision:0,item:0};for(const g of u.entities)f[g.kind]!==void 0&&f[g.kind]++;const p={accepted:0,pending:0,rejected:0};for(const g of u.associations)p[g.status]!==void 0&&p[g.status]++;d.push(`- Lifeline: ${u.lifelines.length} 条`),d.push(`- Entity: ${u.entities.length} 个 (Task ${f.task}, Memory ${f.memory}, Decision ${f.decision}, Item ${f.item})`),d.push(`- 关联: ${u.associations.length} 条 (已确认 ${p.accepted}, 待确认 ${p.pending}, 已拒绝 ${p.rejected})`,"");const _=new Map(u.entities.map(g=>[g.id,g]));for(const g of u.lifelines){d.push(`## Lifeline: ${g.name}`,"");const m=u.entities.filter(v=>v.lifeline_id===g.id);if(m.length===0){d.push("_无 entity_","");continue}for(const v of m){d.push(`- ${v.id} ${v.title}`);for(const x of u.associations){if(x.from!==v.id&&x.to!==v.id)continue;const y=x.from===v.id,S=y?x.to:x.from,M=_.get(S);d.push(`  - ${o(x.relation_type)} ${y?"→":"←"} ${M?.title||S} (${Math.round(x.confidence*100)}%)`)}d.push("")}}return d.join(`
`)}function c(u){if(!t.data)return;const d=new Date().toISOString().slice(0,10);let h,f,p;u==="json"?(h=JSON.stringify({exported_at:new Date().toISOString(),schema_version:t.data.schema_version,root:t.data.root,lifelines:t.data.lifelines,entities:t.data.entities,associations:t.data.associations},null,2),f=`axiom-export-${d}.json`,p="application/json"):(h=l(t.data),f=`axiom-export-${d}.md`,p="text/markdown");const _=new Blob([h],{type:p}),g=URL.createObjectURL(_),m=document.createElement("a");m.href=g,m.download=f,m.click(),URL.revokeObjectURL(g),n("close")}return(u,d)=>(G(),W("div",{class:"export-overlay",onClick:d[3]||(d[3]=fn(h=>n("close"),["self"]))},[E("div",_A,[d[9]||(d[9]=E("div",{class:"export-title"},"导出 Atlas 数据",-1)),E("div",vA,[E("div",xA,[d[4]||(d[4]=E("span",null,"Lifeline",-1)),E("span",null,fe(i.value),1)]),E("div",yA,[d[5]||(d[5]=E("span",null,"Entity",-1)),E("span",null,fe(s.value),1)]),E("div",bA,[d[6]||(d[6]=E("span",null,"关联",-1)),E("span",null,fe(a.value),1)])]),E("div",MA,[E("button",{class:"export-opt",onClick:d[0]||(d[0]=h=>c("json"))},[...d[7]||(d[7]=[E("span",{class:"opt-title"},"JSON",-1),E("span",{class:"opt-desc"},"完整数据，可用于备份或导入",-1)])]),E("button",{class:"export-opt",onClick:d[1]||(d[1]=h=>c("markdown"))},[...d[8]||(d[8]=[E("span",{class:"opt-title"},"Markdown",-1),E("span",{class:"opt-desc"},"可读摘要，按 Lifeline 分组",-1)])])]),E("button",{class:"export-cancel",onClick:d[2]||(d[2]=h=>n("close"))},"取消")])]))}}),wA=xn(SA,[["__scopeId","data-v-0e950a62"]]),EA={class:"recent-panel"},TA={class:"recent-header"},AA={key:0,class:"recent-empty"},CA={class:"recent-list"},RA=["onClick"],IA={class:"recent-kind"},PA={class:"recent-info"},LA={class:"recent-entity-title"},DA={class:"recent-lifeline"},bf="axiom_recent_entities",UA=yn({__name:"RecentPanel",emits:["close","focus-entity"],setup(r,{emit:e}){function t(){try{return JSON.parse(localStorage.getItem(bf)||"[]")}catch{return[]}}const n=De(t()),i=e;function s(l){return l==="task"?"T":l==="memory"?"M":l==="decision"?"D":l==="item"?"I":"?"}function a(l){i("focus-entity",l),i("close")}function o(){localStorage.removeItem(bf),n.value=[]}return(l,c)=>(G(),W("div",EA,[E("div",TA,[c[1]||(c[1]=E("span",{class:"recent-title"},"最近访问",-1)),n.value.length>0?(G(),W("button",{key:0,class:"recent-clear",onClick:o},"清除")):Le("",!0),E("button",{class:"recent-close",onClick:c[0]||(c[0]=u=>i("close"))},"✕")]),n.value.length===0?(G(),W("div",AA,"暂无访问记录")):Le("",!0),E("div",CA,[(G(!0),W(et,null,Wt(n.value,u=>(G(),W("div",{key:u.entityId,class:"recent-item",onClick:d=>a(u.entityId)},[E("span",IA,fe(s(u.kind)),1),E("div",PA,[E("span",LA,fe(u.title.slice(0,28)),1),E("span",DA,fe(u.lifelineName),1)])],8,RA))),128))])]))}}),NA=xn(UA,[["__scopeId","data-v-384b0941"]]),FA={class:"cosmos-view"},OA={class:"cosmos-hud"},kA=["disabled"],BA=["disabled"],zA={key:0,class:"overlay-state"},VA={key:1,class:"overlay-state"},GA={key:2,class:"overlay-state"},HA={key:0,class:"tooltip"},WA={class:"create-actions"},XA=["disabled"],$A={key:5,class:"select-hint"},qA={key:6,class:"select-hint"},YA={key:13,class:"copy-toast"},ZA={key:14,class:"minimap-wrapper"},KA={key:15,class:"assoc-filter-bar"},JA={class:"filter-chips"},jA=["onClick"],QA={class:"filter-slider"},eC={class:"filter-label"},tC={class:"filter-count"},nC={key:0,class:"filter-empty"},Mf="axiom_recent_entities",iC=1.5,sC=yn({__name:"CosmosView",setup(r){const e=Hi(),t=De(null);let n=null,i=null,s=0,a=[],o="";const l=De(!1),c=De(!1),u=De(!1);let d;const h=De(!1),f=De(),p=De(!1),_=De(!1),g=De(!1);function m(N){const k=e.data?.entities.find(Xe=>Xe.id===N);if(!k)return;const se=e.data?.lifelines.find(Xe=>Xe.id===k.lifeline_id),Ie={entityId:N,title:k.title,kind:k.kind,lifelineId:k.lifeline_id,lifelineName:se?.name||"",visitedAt:Date.now()};try{const Xe=localStorage.getItem(Mf)||"[]",vt=JSON.parse(Xe).filter(It=>It.entityId!==N);vt.unshift(Ie),localStorage.setItem(Mf,JSON.stringify(vt.slice(0,10)))}catch{}}const v=Ct(()=>e.data?e.data.associations.filter(N=>N.status==="pending").length:0);function x(N){f.value=N,h.value=!0}const y=De(null),S=De(null);function M(N,k,se,Ie){return new Promise(Xe=>{S.value={title:N,message:k,confirmLabel:se,danger:Ie,resolve:Xe}})}const C=De(null),b=De(!0),T=De(!1);let P,L=null,B=null;const Q=De({types:{causal:!0,co_occurrence:!0,tension:!0,derived_from:!0,manual:!0},statuses:{accepted:!0,pending:!0,rejected:!0}}),J=Sf({types:["co_occurrence","causal","tension","derived_from","manual"],minConfidence:0,status:"all"});function z(){for(const N of a){const k=J.types.includes(N.data.relation_type),se=N.data.confidence>=J.minConfidence,Ie=J.status==="all"||N.data.status===J.status,Xe=Q.value,Ke=Xe.types[N.data.relation_type]??!0,vt=Xe.statuses[N.data.status]??!0,It=k&&se&&Ie&&Ke&&vt;N.line.visible=It,N.arrow&&(N.arrow.visible=It)}}function Y(N){J.types.includes(N)?J.types.length>1&&(J.types=J.types.filter(k=>k!==N)):J.types=[...J.types,N],z()}const K=Ct(()=>a.filter(N=>N.line.visible).length),de=De(null),pe=De(null),ve=De(0);function Ce(N,k){if(!e.data)return[];const se=new Map;for(const je of e.data.associations)je.status!=="rejected"&&(se.has(je.from)||se.set(je.from,[]),se.has(je.to)||se.set(je.to,[]),se.get(je.from).push({to:je.to,assocId:je.id,type:je.relation_type,confidence:je.confidence}),se.get(je.to).push({to:je.from,assocId:je.id,type:je.relation_type,confidence:je.confidence}));const Ie=new Set,Xe=[{id:N,path:[{entityId:N,entityTitle:"",assocId:null,assocType:null,assocConfidence:null}]}];Ie.add(N);const Ke=[];let vt=-1;const It=5;for(;Xe.length>0;){const{id:je,path:Pt}=Xe.shift();if(vt>-1&&Pt.length>vt)break;if(je===k){Pt.forEach(ot=>{ot.entityTitle||(ot.entityTitle=e.data?.entities.find(gt=>gt.id===ot.entityId)?.title||ot.entityId)}),Ke.push(Pt),vt=Pt.length;continue}if(!(Pt.length>=It)){for(const ot of se.get(je)||[])if(!Ie.has(ot.to)||vt>-1&&Pt.length<vt){Ie.add(ot.to);const gt=e.data?.entities.find(jt=>jt.id===ot.to);Xe.push({id:ot.to,path:[...Pt,{entityId:ot.to,entityTitle:gt?.title||ot.to,assocId:ot.assocId,assocType:ot.type,assocConfidence:ot.confidence}]})}}}return Ke}function Be(N){de.value={id:N.id,title:N.title}}function st(N){if(!de.value)return;if(N===de.value.id){tt();return}const k=Ce(de.value.id,N);pe.value=k.length>0?k:[],ve.value=0,de.value=null,k.length>0&&n&&dt(k[0])}function dt(N){if(!n||!e.data)return;yf(n.nodes,a),Cu(n.scene);const k=N.map(Ke=>Ke.entityId),se=new Set(N.filter(Ke=>Ke.assocId).map(Ke=>Ke.assocId)),Ie={startId:k[0],endId:k[k.length-1],pathEntityIds:new Set(k),pathAssocIds:se,color:xf[ve.value%xf.length],isCurrent:!0},Xe=a.filter(Ke=>se.has(Ke.data.id));FS(n.nodes,Xe.length>0?Xe:a,[Ie],n.scene),kS(k,n.nodes,n.scene)}function tt(){de.value=null,pe.value=null,ve.value=0,n&&(yf(n.nodes,a),Cu(n.scene))}function H(){pe.value&&(ve.value=Math.max(0,ve.value-1),dt(pe.value[ve.value]))}function ae(){pe.value&&(ve.value=Math.min(pe.value.length-1,ve.value+1),dt(pe.value[ve.value]))}function ue(N){const k=N.split(":");e.transition({kind:"node_focus",entity_kind:k[0],entity_id:N})}function ye(){u.value=!0,d&&clearTimeout(d),d=window.setTimeout(()=>{u.value=!1},1500)}function $(N){navigator.clipboard.writeText(N.title).then(()=>ye())}async function D(N,k){window.confirm(`确定删除 lifeline「${k}」？挂载的 entity 将被卸载。`)&&(await e.deleteLifeline(N),e.transition({kind:"global_overview"}))}function U(){ye()}function O(){ye()}function j(){le()}function q(N){if(!e.data)return;const k=e.data.entities.find(se=>se.id===N);k&&e.transition({kind:"node_focus",entity_kind:k.kind,entity_id:N})}let ne=null,oe=null,me=null;async function $e(){if(!e.data||!t.value)return;const N=await yt(()=>Promise.resolve().then(()=>xS),void 0),k=(await yt(async()=>{const{OrbitControls:je}=await import("./OrbitControls-DCk6bNAa.js");return{OrbitControls:je}},__vite__mapDeps([3,0,1,2]))).OrbitControls,{CSS2DRenderer:se}=await yt(async()=>{const{CSS2DRenderer:je}=await Promise.resolve().then(()=>gf);return{CSS2DRenderer:je}},void 0);n=await AS(t.value,e.data),i=new k(n.camera,n.renderer.domElement),i.enableDamping=!0,i.dampingFactor=.08,i.enableZoom=!0,i.zoomSpeed=.6,i.enablePan=!1,i.minDistance=.5,i.maxDistance=9,ne=new se,ne.setSize(window.innerWidth,window.innerHeight),ne.domElement.style.position="absolute",ne.domElement.style.top="0",ne.domElement.style.pointerEvents="none",document.querySelector(".cosmos-view")?.appendChild(ne.domElement);const{createLabelGroup:Ie}=await yt(async()=>{const{createLabelGroup:je}=await import("./labels-BdVxDIC9.js");return{createLabelGroup:je}},__vite__mapDeps([4,0,1,2]));oe=Ie(),oe.create(n.scene,n.layoutNodes);const Xe=new Map;for(const je of e.data.entities)Xe.set(je.lifeline_id,(Xe.get(je.lifeline_id)||0)+1);for(const je of n.layoutNodes){if(je.layer!==1&&je.layer!==2)continue;const Pt=document.createElement("div"),ot=Xe.get(je.id)||0;Pt.textContent=String(ot),Pt.style.cssText="font-size:9px;color:var(--text-4);font-family:var(--font-mono);text-align:center;";const{CSS2DObject:gt}=await yt(async()=>{const{CSS2DObject:Fn}=await Promise.resolve().then(()=>gf);return{CSS2DObject:Fn}},void 0),jt=new gt(Pt);jt.position.copy(je.position.clone().add(new I(0,-.07,0))),n.scene.add(jt)}me=n.setResolution,window.addEventListener("resize",ze);const Ke=new N.Raycaster,vt=new N.Vector2;t.value.addEventListener("click",je=>{if(!n)return;if(vt.x=je.offsetX/t.value.clientWidth*2-1,vt.y=-(je.offsetY/t.value.clientHeight)*2+1,Ke.setFromCamera(vt,n.camera),de.value){const sn=Ke.intersectObjects(n.pickables);if(sn.length>0){const Xt=sn[0].object;if(Xt.userData.layer===3){st(Xt.userData.id);return}}tt();return}if(e.selectingTarget){const sn=Ke.intersectObjects(n.pickables);if(sn.length>0){const Xt=sn[0].object;if(Xt.userData.layer===3&&Xt.userData.id!==e.selectingTarget.fromId){const jn=e.data?.entities.find(Wi=>Wi.id===Xt.userData.id)?.title||"";e.openEditAssoc({id:"",from:e.selectingTarget.fromId,fromTitle:e.selectingTarget.fromTitle,to:Xt.userData.id,toTitle:jn,relation_type:"manual",confidence:.7,status:"accepted",evidence:[]}),e.cancelSelecting();return}}e.cancelSelecting();return}if(e.state.kind==="relation_reveal"&&a.length>0){const sn=Ke.intersectObjects(a.map(Xt=>Xt.line));if(sn.length>0){const Xt=sn[0].object,jn=a.find(Wi=>Wi.line===Xt);if(jn){e.selectedAssocId===jn.data.id?e.selectAssociation(null):e.selectAssociation(jn.data.id);return}}}const Pt=Ke.intersectObjects(n.pickables);if(Pt.length===0){if(e.selectAssociation(null),e.state.kind==="node_focus"||e.state.kind==="relation_reveal"){const sn=e.state.entity_id,jn=e.data?.entities.find(Wi=>Wi.id===sn)?.lifeline_id;jn?e.transition({kind:"region_zoom",lifeline_id:jn}):e.transition({kind:"global_overview"})}else e.state.kind==="region_zoom"&&e.transition({kind:"global_overview"});return}e.selectAssociation(null);const ot=Pt[0].object,gt=ot.userData.layer,jt=ot.userData.id,Fn=ot.userData.kind,On=e.state;On.kind==="global_overview"&&gt===1?e.transition({kind:"region_zoom",lifeline_id:jt}):On.kind==="region_zoom"&&(gt===2||gt===3)?e.transition({kind:"node_focus",entity_kind:Fn||"lifeline",entity_id:jt}):On.kind==="node_focus"?e.transition({kind:"node_focus",entity_kind:Fn||"lifeline",entity_id:jt}):On.kind==="relation_reveal"&&(Oe(),e.transition({kind:"node_focus",entity_kind:Fn||"lifeline",entity_id:jt}))}),t.value.addEventListener("mousemove",je=>{if(!n)return;vt.x=je.offsetX/t.value.clientWidth*2-1,vt.y=-(je.offsetY/t.value.clientHeight)*2+1,Ke.setFromCamera(vt,n.camera);const Pt=Ke.intersectObjects(n.pickables);if(Pt.length>0){const gt=Pt[0].object;gt!==L&&(Me(),L=gt,nt(gt)),t.value.style.cursor=e.selectingTarget?"crosshair":"pointer"}else Me(),t.value.style.cursor=e.selectingTarget?"crosshair":"";if(e.state.kind!=="relation_reveal")return;const ot=Ke.intersectObjects(n.lines.concat(a.map(gt=>gt.line)));if(ot.length>0&&a.some(gt=>gt.line===ot[0].object)){const gt=a.find(jt=>jt.line===ot[0].object);gt&&(o=gt.data.evidence?.[0]?.excerpt||"",gt.line!==B&&(R(),B=gt.line,Tt(gt)))}else o="",R()}),t.value.addEventListener("contextmenu",je=>{if(je.preventDefault(),!n||!e.data)return;vt.x=je.offsetX/t.value.clientWidth*2-1,vt.y=-(je.offsetY/t.value.clientHeight)*2+1,Ke.setFromCamera(vt,n.camera);const Pt=Ke.intersectObjects(n.pickables);if(Pt.length===0){const sn=e.state.kind;(sn==="global_overview"||sn==="region_zoom")&&x(),y.value=null;return}if(e.state.kind==="global_overview"){y.value=null;return}const ot=Pt[0].object,gt=ot.userData.id,jt=ot.userData.kind,Fn=ot.userData.layer;if(Fn<1||Fn>3){y.value=null;return}let On="";Fn<=2?On=e.data.lifelines.find(Xt=>Xt.id===gt)?.name||gt:On=e.data.entities.find(Xt=>Xt.id===gt)?.title||gt,y.value={x:je.clientX,y:je.clientY,target:{id:gt,kind:jt,title:On,layer:Fn}}}),window.addEventListener("keydown",we),document.querySelector(".cosmos-hud")?.addEventListener("mouseenter",()=>{b.value=!0,P&&clearTimeout(P)}),P=window.setTimeout(()=>{b.value=!1,T.value=!0},3e3),Te()}function F(N){e.transition({kind:"region_zoom",lifeline_id:N})}function it(N){if(!e.data)return;const k=e.data.entities.find(se=>se.id===N);k&&e.transition({kind:"node_focus",entity_kind:k.kind,entity_id:N})}function ze(){if(!ne||!me)return;const N=window.innerWidth,k=window.innerHeight;ne.setSize(N,k),me(N,k)}function nt(N){N.scale.setScalar(iC);const k=N.material;k._origColor=k._origColor??k.color.getHex(),k.color.set(ii("--accent")),k.needsUpdate=!0}function Me(){if(!L)return;L.scale.setScalar(1);const N=L.material;N._origColor!==void 0&&(N.color.setHex(N._origColor),delete N._origColor,N.needsUpdate=!0),L=null}function Tt(N){const k=N.line.material;k._origLinewidth=k._origLinewidth??k.linewidth,k._origColor=k._origColor??k.color.getHex(),k.linewidth=k._origLinewidth*1.3,k.color.set(ii("--accent")),k.needsUpdate=!0,a.forEach(se=>{if(se.line!==N.line){const Ie=se.line.material;Ie.transparent=!0,Ie._origOpacity=Ie._origOpacity??Ie.opacity,Ie.opacity=(Ie._origOpacity||.8)*.3,Ie.needsUpdate=!0}})}function R(){if(!B)return;const N=B.material;N._origLinewidth!==void 0&&(N.linewidth=N._origLinewidth,delete N._origLinewidth),N._origColor!==void 0&&(N.color.setHex(N._origColor),delete N._origColor),N.needsUpdate=!0,a.forEach(k=>{const se=k.line.material;se._origOpacity!==void 0&&(se.opacity=se._origOpacity,delete se._origOpacity,se.needsUpdate=!0)}),B=null}function w(N){if(l.value=!1,!!n)if(N.kind==="lifeline")if(N.layer===1)e.transition({kind:"region_zoom",lifeline_id:N.id});else{let k=e.data?.lifelines.find(se=>se.id===N.id)?.parent_id;for(;k&&k!=="ROOT";){const se=e.data?.lifelines.find(Ie=>Ie.id===k);if(se&&se.parent_id==="ROOT")break;k=se?.parent_id}k&&k!=="ROOT"&&e.transition({kind:"region_zoom",lifeline_id:k})}else e.transition({kind:"node_focus",entity_kind:N.kind,entity_id:N.id})}function Z(N){N.layer===3&&C.value?.startEditTitle()}async function ce(N){if(!await M(`确定删除「${N.title.slice(0,30)}」？`,"此操作不可撤销。","删除",!0))return;const se=N.id.split(":"),Ie=se[0],Xe=parseInt(se.slice(1).join(":"),10);try{await e.deleteEntityById(Ie,Xe)}catch{await e.reload()}const Ke=e.state;if((Ke.kind==="node_focus"||Ke.kind==="relation_reveal")&&Ke.entity_id===N.id){const It=e.data?.entities.find(je=>je.id===N.id)?.lifeline_id;It?e.transition({kind:"region_zoom",lifeline_id:It}):e.transition({kind:"global_overview"})}}async function _e(N,k){const se=N.split(":"),Ie=se[0],Xe=parseInt(se.slice(1).join(":"),10);try{await e.mountEntity(Ie,Xe,k)}catch{await e.reload()}}const be=De(null),Se=De(""),re=De(null);function he(N){be.value={id:N.id,name:N.title},Se.value=N.title,au(()=>re.value?.focus())}async function Ue(){if(!be.value)return;const N=Se.value.trim();if(!N||N===be.value.name){be.value=null;return}try{await e.updateLifeline(be.value.id,{name:N}),be.value=null}catch{await e.reload(),be.value=null}}function Ve(N){N.key==="Enter"?(N.stopPropagation(),Ue()):N.key==="Escape"&&(N.stopPropagation(),be.value=null)}function Ae(N){e.startSelectingTarget(N.id,N.title)}async function Ee(N){await e.createAssoc(N),e.closeEditAssoc()}async function lt(N){await e.updateAssoc(N.association_id,{relation_type:N.relation_type,confidence:N.confidence,evidence:N.evidence}),e.closeEditAssoc()}async function ht(N){e.closeEditAssoc(),await e.deleteAssoc(N)}async function bt(N){if(!e.data)return;const k=e.state;if(k.kind!=="node_focus"&&k.kind!=="relation_reveal")return;const se=k.entity_id;if(!e.data.entities.find(It=>It.id===se))return;const Xe=e.data.associations.find(It=>It.id===N.id);if(!Xe)return;const Ke=e.data.entities.find(It=>It.id===Xe.from),vt=e.data.entities.find(It=>It.id===Xe.to);e.openEditAssoc({id:Xe.id,from:Xe.from,fromTitle:Ke?.title||Xe.from,to:Xe.to,toTitle:vt?.title||Xe.to,relation_type:Xe.relation_type,confidence:Xe.confidence,status:Xe.status,evidence:Xe.evidence||[]})}async function V(N){await M("删除关联","确定删除这条关联？此操作不可撤销。","确认删除",!0)&&await e.deleteAssoc(N)}function we(N){if((N.ctrlKey||N.metaKey)&&N.key==="k"){N.preventDefault(),N.stopPropagation(),l.value=!l.value;return}if((N.ctrlKey||N.metaKey)&&N.key==="n"){N.preventDefault();let se;const Ie=e.state.kind;if(Ie==="region_zoom")se=e.state.lifeline_id;else if(Ie==="node_focus"||Ie==="relation_reveal"){const Xe=e.state.entity_id;se=e.data?.entities.find(Ke=>Ke.id===Xe)?.lifeline_id}x(se);return}if(N.key==="/"&&!l.value){const se=N.target;if(se.tagName==="INPUT"||se.tagName==="TEXTAREA")return;N.preventDefault(),l.value=!0;return}if(N.key==="?"){const se=N.target;if(se.tagName==="INPUT"||se.tagName==="TEXTAREA")return;N.preventDefault(),c.value=!c.value;return}if(N.altKey&&N.key==="ArrowLeft"){N.preventDefault(),e.navigateBack();return}if(N.altKey&&N.key==="ArrowRight"){N.preventDefault(),e.navigateForward();return}if((N.ctrlKey||N.metaKey)&&N.key==="e"){N.preventDefault(),_.value=!0;return}if((N.ctrlKey||N.metaKey)&&N.key==="z"){N.preventDefault(),e.undoLast().then(se=>{se&&ye()});return}const k=e.state;if(N.key==="Escape"){if(e.selectingTarget){e.cancelSelecting();return}if(de.value||pe.value){tt();return}if(l.value){l.value=!1;return}k.kind==="relation_reveal"?(Oe(),e.transition({kind:"node_focus",entity_kind:k.entity_kind,entity_id:k.entity_id})):k.kind==="node_focus"?e.transition({kind:k.lifeline_id?"region_zoom":"global_overview",lifeline_id:k.lifeline_id}):k.kind==="region_zoom"&&e.transition({kind:"global_overview"})}(N.key==="r"||N.key==="R")&&(k.kind==="node_focus"?le():k.kind==="relation_reveal"&&Oe())}function le(){if(!e.data||!n)return;const N=e.state;if(N.kind!=="node_focus")return;const k=N.entity_id;e.transition({kind:"relation_reveal",entity_kind:N.entity_kind,entity_id:k}),a=PS(n.scene,e.data,n.layoutNodes,k,new ge(t.value.clientWidth,t.value.clientHeight));const se=new Set([k]);a.forEach(Ie=>{se.add(Ie.fromNode.id),se.add(Ie.toNode.id)}),LS(n.nodes,se),z()}function Oe(){n&&(R(),a.forEach(N=>{if(n.scene.remove(N.line),N.line.geometry?.dispose(),N.line.material){const k=N.line.material;Array.isArray(k)?k.forEach(se=>se.dispose()):k.dispose()}N.arrow&&(n.scene.remove(N.arrow),N.arrow.geometry?.dispose(),N.arrow.material instanceof cn&&N.arrow.material.dispose())}),a=[],vf(n.nodes))}function Te(){if(!n)return;s=requestAnimationFrame(Te),i?.update(),zS(.016,n.camera,i);const N=n.camera.position.length(),k=N>3.5?1:N>=2?2:3,se=e.state.kind==="node_focus"||e.state.kind==="relation_reveal";n.nodes.forEach(Ie=>{const Xe=Ie.userData.layer;Ie.visible=se||Xe<=k}),n.lines.forEach(Ie=>{const Xe=Ie.userData?.fromLayer??3,Ke=Ie.userData?.toLayer??3;Ie.visible=se||Math.max(Xe,Ke)<=k}),DS(n.nodes,.016),oe&&oe.syncPositions(n.nodes),n.renderer.render(n.scene,n.camera),oe&&ne&&(oe.update(e.state,n.camera,e.data?.associations),ne.render(n.scene,n.camera))}async function xe(){if(!n)return;const N=e.state,k=n.layoutNodes;if(N.kind==="global_overview"){su(n.scene);for(const se of n.nodes)se.userData.targetPosition=se.userData.homePosition.clone();vf(n.nodes),Co(n.camera,i,new I(0,2.5,5.5),new I(0,0,0),60,800)}else if(N.kind==="region_zoom"){su(n.scene);for(const Ke of n.nodes)Ke.userData.targetPosition=Ke.userData.homePosition.clone();const se=N.lifeline_id;let Xe=k.find(Ke=>Ke.id===se&&Ke.layer===1);if(!Xe){const Ke=k.find(vt=>vt.id===se);if(Ke){let vt=Ke.parentId;for(;vt;){const It=k.find(je=>je.id===vt);if(It&&It.layer===1){Xe=It;break}vt=It?.parentId}}}if(Xe){const Ke=Xe.position.clone().normalize(),vt=Oi.R1+1.8;Co(n.camera,i,Ke.clone().multiplyScalar(vt),Xe.position,50,800);const It=Xe.id,je=new Set,Pt=[It];for(;Pt.length>0;){const ot=Pt.shift();je.add(ot),k.filter(gt=>gt.parentId===ot).forEach(gt=>Pt.push(gt.id))}ym(n.nodes,je)}}else if(N.kind==="node_focus"||N.kind==="relation_reveal"){const se=N.entity_id,Ie=k.find(ot=>ot.id===se);if(!Ie)return;su(n.scene),NS(n.scene,Ie.position,ii("--accent"));const Xe=Ie.position.clone().normalize(),Ke=Ie.position.length()+.6,vt=Xe.clone().multiplyScalar(Ke);Co(n.camera,i,vt,Ie.position,N.kind==="node_focus"?35:55,800);const{computeFocusLayout:It}=await yt(async()=>{const{computeFocusLayout:ot}=await Promise.resolve().then(()=>ES);return{computeFocusLayout:ot}},void 0),{targets:je,constellationIds:Pt}=It(k,se,e.data?.associations||[],Xe);for(const ot of n.nodes){const gt=ot.userData.id,jt=je.get(gt);ot.userData.targetPosition=jt?jt.clone():ot.userData.homePosition.clone()}US(n.nodes,Pt)}}return Lo(()=>e.state,N=>{N.kind==="node_focus"&&m(N.entity_id),xe()},{deep:!0}),Lo(()=>e.state.kind,()=>{b.value=!0,T.value=!1,P&&clearTimeout(P),P=window.setTimeout(()=>{b.value=!1,T.value=!0},3e3)}),Gi(async()=>{await e.load(),e.data&&await $e()}),us(()=>{cancelAnimationFrame(s),n?.dispose(),i?.dispose(),window.removeEventListener("keydown",we),window.removeEventListener("resize",ze),oe&&(oe.dispose(),oe=null),ne?.domElement&&ne.domElement.remove(),P&&clearTimeout(P)}),(N,k)=>(G(),W("div",FA,[E("div",OA,[La($S,{state:qe(e).state,onNav:k[0]||(k[0]=se=>qe(e).transition(se))},null,8,["state"]),qe(e).state.kind!=="global_overview"?(G(),W("button",{key:0,class:"home-btn",onClick:k[1]||(k[1]=se=>qe(e).transition({kind:"global_overview"})),title:"回到全局"},"⌂")):Le("",!0),E("button",{class:"nav-btn",disabled:!qe(e).canGoBack,onClick:k[2]||(k[2]=se=>qe(e).navigateBack()),title:"后退 (Alt+←)"},"←",8,kA),E("button",{class:"nav-btn",disabled:!qe(e).canGoForward,onClick:k[3]||(k[3]=se=>qe(e).navigateForward()),title:"前进 (Alt+→)"},"→",8,BA),v.value>0?(G(),W("button",{key:1,class:"pending-trigger",onClick:k[4]||(k[4]=se=>p.value=!p.value)}," 待确认 "+fe(v.value),1)):Le("",!0),qe(e).data?(G(),W("button",{key:2,class:"export-trigger",onClick:k[5]||(k[5]=se=>_.value=!0),title:"导出数据 (Ctrl+E)"},"导出")):Le("",!0),E("button",{class:"nav-btn",onClick:k[6]||(k[6]=se=>g.value=!g.value),title:"最近访问"},"🕐"),l.value?(G(),Qn(EE,{key:3,onSelect:w,onClose:k[7]||(k[7]=se=>l.value=!1)})):Le("",!0),l.value?Le("",!0):(G(),Qn(B1,{key:4,onFocusLifeline:F,onFocusEntity:it})),l.value?Le("",!0):(G(),W("button",{key:5,class:"search-trigger",onClick:k[8]||(k[8]=se=>l.value=!0)},"搜索 ⌘K"))]),qe(e).loading?(G(),W("div",zA,[...k[29]||(k[29]=[E("div",{class:"loader-ring"},null,-1),E("div",{class:"state-text"},"加载 Atlas…",-1)])])):qe(e).error?(G(),W("div",VA,[k[30]||(k[30]=E("div",{class:"state-text"},"Cosmos 数据加载失败",-1)),k[31]||(k[31]=E("div",{class:"state-sub"},"API 和 mock 均不可用",-1)),E("button",{class:"retry-btn",onClick:k[9]||(k[9]=se=>qe(e).reload())},"重试")])):qe(e).data&&qe(e).data.lifelines.length===0?(G(),W("div",GA,[...k[32]||(k[32]=[E("div",{class:"state-text"},"暂无 lifeline",-1),E("div",{class:"state-sub"},"在左侧面板中创建第一条 lifeline 来开始构建知识星球",-1)])])):Le("",!0),!qe(e).loading&&!qe(e).error&&qe(e).data&&qe(e).data.lifelines.length>0?(G(),W(et,{key:3},[E("canvas",{ref_key:"canvasRef",ref:t,class:"cosmos-canvas"},null,512),La(dE,{ref_key:"nodeDetailRef",ref:C,onEditAssoc:bt,onDeleteAssoc:V,onCopied:O,onEnterRelation:j,onNavigateEntity:q},null,512),qe(o)&&qe(e).state.kind==="relation_reveal"?(G(),W("div",HA,fe(qe(o)),1)):Le("",!0),b.value?(G(),W("div",{key:1,class:Ot(["shortcuts-hint",{fade:T.value}])},[qe(e).state.kind==="global_overview"?(G(),W(et,{key:0},[ln("点击 R1 进入 lifeline   滚轮缩放   拖拽旋转   Ctrl+K 搜索")],64)):qe(e).state.kind==="region_zoom"?(G(),W(et,{key:1},[ln("点击 R2/R3 聚焦 entity   滚轮缩放   Esc 返回全局   Ctrl+K 搜索")],64)):qe(e).state.kind==="node_focus"?(G(),W(et,{key:2},[ln("R 查看关联   Esc 返回 lifeline   拖拽旋转")],64)):qe(e).state.kind==="relation_reveal"?(G(),W(et,{key:3},[ln("Esc 返回焦点   点击关联线查看证据   底部筛选")],64)):Le("",!0)],2)):Le("",!0),y.value?(G(),Qn(PE,{key:2,target:y.value.target,x:y.value.x,y:y.value.y,onClose:k[10]||(k[10]=se=>y.value=null),onEditTitle:Z,onDeleteEntity:ce,onMoveLifeline:_e,onEditLifelineName:he,onAssociateTo:Ae,onFindPathTo:Be,onCopyTitle:$,onDeleteLifeline:D,onQuickCreate:x},null,8,["target","x","y"])):Le("",!0),S.value?(G(),Qn(FE,{key:3,title:S.value.title,message:S.value.message,"confirm-label":S.value.confirmLabel,danger:S.value.danger,onConfirm:k[11]||(k[11]=se=>{S.value.resolve(!0),S.value=null}),onCancel:k[12]||(k[12]=se=>{S.value.resolve(!1),S.value=null})},null,8,["title","message","confirm-label","danger"])):Le("",!0),be.value?(G(),W("div",{key:4,class:"create-overlay",onPointerdown:k[16]||(k[16]=se=>be.value=null)},[E("div",{class:"create-dialog",onPointerdown:k[15]||(k[15]=fn(()=>{},["stop"]))},[k[33]||(k[33]=E("div",{class:"create-title"},"编辑 lifeline 名称",-1)),At(E("input",{ref_key:"lifelineEditEl",ref:re,"onUpdate:modelValue":k[13]||(k[13]=se=>Se.value=se),class:"create-input",onKeydown:Ve},null,544),[[Zt,Se.value]]),E("div",WA,[E("button",{class:"confirm-btn cancel-btn",onClick:k[14]||(k[14]=se=>be.value=null)},"取消"),E("button",{class:"confirm-btn primary-btn",disabled:!Se.value.trim(),onClick:Ue},"保存",8,XA)])],32)],32)):Le("",!0)],64)):Le("",!0),qe(e).editAssoc?(G(),Qn(iT,{key:4,"from-id":qe(e).editAssoc.from,"from-title":qe(e).editAssoc.fromTitle,"to-id":qe(e).editAssoc.to,"to-title":qe(e).editAssoc.toTitle,existing:qe(e).editAssoc.id?{id:qe(e).editAssoc.id,relation_type:qe(e).editAssoc.relation_type,confidence:qe(e).editAssoc.confidence,status:qe(e).editAssoc.status,evidence:qe(e).editAssoc.evidence}:void 0,onCancel:k[17]||(k[17]=se=>qe(e).closeEditAssoc()),onCreate:Ee,onUpdate:lt,onDelete:ht},null,8,["from-id","from-title","to-id","to-title","existing"])):Le("",!0),qe(e).selectingTarget?(G(),W("div",$A," crosshair 点击目标 entity 来创建关联 (Esc 取消) ")):Le("",!0),de.value?(G(),W("div",qA," crosshair 点击目标 entity 查找最短路径 (Esc 取消) ")):Le("",!0),pe.value?(G(),Qn(ET,{key:7,paths:pe.value,"current-path-index":ve.value,"from-title":pe.value[ve.value]?.[0]?.entityTitle||"","to-title":pe.value[ve.value]?.[pe.value[ve.value].length-1]?.entityTitle||"",onPrevPath:H,onNextPath:ae,onClear:tt,onFocusEntity:ue,onCopied:U},null,8,["paths","current-path-index","from-title","to-title"])):Le("",!0),c.value?(G(),Qn(RT,{key:8,onClose:k[18]||(k[18]=se=>c.value=!1)})):Le("",!0),h.value?(G(),Qn(GT,{key:9,"default-lifeline-id":f.value,onClose:k[19]||(k[19]=se=>h.value=!1)},null,8,["default-lifeline-id"])):Le("",!0),p.value?(G(),Qn(gA,{key:10,onClose:k[20]||(k[20]=se=>p.value=!1),onFocusEntity:k[21]||(k[21]=se=>{p.value=!1,it(se)})})):Le("",!0),_.value?(G(),Qn(wA,{key:11,onClose:k[22]||(k[22]=se=>_.value=!1)})):Le("",!0),g.value?(G(),Qn(NA,{key:12,onClose:k[23]||(k[23]=se=>g.value=!1),onFocusEntity:k[24]||(k[24]=se=>{g.value=!1,it(se)})})):Le("",!0),u.value?(G(),W("div",YA,"已复制到剪贴板")):Le("",!0),La(oT,{"show-assoc":qe(e).state.kind==="relation_reveal",filter:Q.value,"onUpdate:filter":k[25]||(k[25]=se=>{Q.value=se,z()})},null,8,["show-assoc","filter"]),qe(n)&&qe(e).state.kind!=="node_focus"&&qe(e).state.kind!=="relation_reveal"?(G(),W("div",ZA,[La(cT,{"layout-nodes":qe(n).layoutNodes,camera:qe(n).camera,controls:qe(i),"world-radius":qe(Oi).R3,"focused-lifeline-id":qe(e).state.kind==="region_zoom"?qe(e).state.lifeline_id:null,onJump:k[26]||(k[26]=(se,Ie)=>qe(Co)(qe(n).camera,qe(i),se,Ie,60,800))},null,8,["layout-nodes","camera","controls","world-radius","focused-lifeline-id"])])):Le("",!0),qe(e).state.kind==="relation_reveal"?(G(),W("div",KA,[E("div",JA,[(G(),W(et,null,Wt(["co_occurrence","causal","tension","derived_from","manual"],se=>E("button",{key:se,class:Ot(["filter-chip",{active:J.types.includes(se)}]),onClick:Ie=>Y(se)},fe({co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[se]),11,jA)),64))]),E("div",QA,[E("span",eC,"信心度 ≥ "+fe(J.minConfidence.toFixed(2)),1),At(E("input",{"onUpdate:modelValue":k[27]||(k[27]=se=>J.minConfidence=se),type:"range",min:"0",max:"1",step:"0.05",class:"filter-range",onInput:z},null,544),[[Zt,J.minConfidence,void 0,{number:!0}]])]),At(E("select",{"onUpdate:modelValue":k[28]||(k[28]=se=>J.status=se),class:"filter-select",onChange:z},[...k[34]||(k[34]=[E("option",{value:"all"},"全部",-1),E("option",{value:"accepted"},"已确认",-1),E("option",{value:"pending"},"待定",-1)])],544),[[Si,J.status]]),E("span",tC,"显示 "+fe(K.value)+"/"+fe(qe(a).length)+" 条关联",1),qe(a).length>0&&K.value===0?(G(),W("span",nC,"当前筛选条件下无可见关联")):Le("",!0)])):Le("",!0)]))}}),rC=xn(sC,[["__scopeId","data-v-c48e0708"]]),lC=Object.freeze(Object.defineProperty({__proto__:null,default:rC},Symbol.toStringTag,{value:"Module"}));export{vm as C,Im as M,ts as P,vn as Q,Tr as R,e0 as S,Pm as T,ge as V,y0 as a,lC as b,yl as c,I as d};
