const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CcsMsRh8.js","assets/vue-Cvl-Tb45.js","assets/index-RjWMaq7c.css","assets/OrbitControls-CsLW2n6Y.js","assets/CSS2DRenderer-BYnuz-iR.js","assets/labels-DDFPsODQ.js"])))=>i.map(i=>d[i]);
import{_ as Et,a as Si}from"./index-CcsMsRh8.js";import{m as dm,u as $e,l as wi,s as se,f as ae,b as F,w as Fe,e as Ze,c as In,x as ut,C as Tt,z as kt,D as Bn,y as ds,F as lt,v as gn,p as Ys,o as Pn,i as _s,E as ni,A as pu,h as _o,n as Yc,r as ar,q as la,t as of,j as Kl,d as mr}from"./vue-Cvl-Tb45.js";const ca=dm("cosmos",()=>{const r=$e(null),e=$e({kind:"global_overview"}),t=$e(!1),n=$e(null),i=$e(null);function s(z){i.value=z}const a={};function o(z,L){a[z]?.forEach(B=>B(L))}function l(z,L){a[z]||(a[z]=[]),a[z].push(L)}async function c(){if(!r.value){t.value=!0;try{const{apiRequest:z}=await Et(async()=>{const{apiRequest:L}=await import("./index-CcsMsRh8.js").then(B=>B.c);return{apiRequest:L}},__vite__mapDeps([0,1,2]));r.value=await z("/cosmos")}catch{try{const L=await fetch("/mock/cosmos.json");r.value=await L.json()}catch{n.value="Cosmos 数据加载失败"}}finally{t.value=!1}}}function u(z){o(`leave_${e.value.kind}`,e.value),e.value=z,i.value=null,o(`enter_${z.kind}`,z)}async function d(){r.value=null,n.value=null,C.value.clear(),await c()}async function h(z){const{createLifeline:L}=await Et(async()=>{const{createLifeline:B}=await import("./index-CcsMsRh8.js").then(V=>V.e);return{createLifeline:B}},__vite__mapDeps([0,1,2]));await L(z),await d()}async function f(z,L){const{updateLifeline:B}=await Et(async()=>{const{updateLifeline:V}=await import("./index-CcsMsRh8.js").then(oe=>oe.e);return{updateLifeline:V}},__vite__mapDeps([0,1,2]));await B(z,L),await d()}async function p(z){const{deleteLifeline:L}=await Et(async()=>{const{deleteLifeline:B}=await import("./index-CcsMsRh8.js").then(V=>V.e);return{deleteLifeline:B}},__vite__mapDeps([0,1,2]));await L(z),await d()}async function v(z,L,B){const{mountEntity:V}=await Et(async()=>{const{mountEntity:oe}=await import("./index-CcsMsRh8.js").then(Q=>Q.e);return{mountEntity:oe}},__vite__mapDeps([0,1,2]));await V(z,L,B),await d()}async function g(z,L){if(r.value){const B=r.value.associations.findIndex(V=>V.id===z);B!==-1&&(r.value={...r.value,associations:[...r.value.associations.slice(0,B),{...r.value.associations[B],status:L},...r.value.associations.slice(B+1)]})}try{const{reviewAssociation:B}=await Et(async()=>{const{reviewAssociation:V}=await import("./index-CcsMsRh8.js").then(oe=>oe.e);return{reviewAssociation:V}},__vite__mapDeps([0,1,2]));await B(z,L)}catch{await d()}}async function m(z,L,B){const{updateEntity:V}=await Et(async()=>{const{updateEntity:oe}=await import("./index-CcsMsRh8.js").then(Q=>Q.e);return{updateEntity:oe}},__vite__mapDeps([0,1,2]));await V(z,L,{title:B}),await d()}async function x(z,L){const{deleteEntity:B}=await Et(async()=>{const{deleteEntity:V}=await import("./index-CcsMsRh8.js").then(oe=>oe.e);return{deleteEntity:V}},__vite__mapDeps([0,1,2]));await B(z,L),await d()}async function _(z,L,B){const{createEntity:V}=await Et(async()=>{const{createEntity:oe}=await import("./index-CcsMsRh8.js").then(Q=>Q.e);return{createEntity:oe}},__vite__mapDeps([0,1,2]));await V(z,L,B),await d()}async function y(z){const{createAssociation:L}=await Et(async()=>{const{createAssociation:B}=await import("./index-CcsMsRh8.js").then(V=>V.e);return{createAssociation:B}},__vite__mapDeps([0,1,2]));await L({...z,status:"accepted"}),await d()}async function E(z,L){const{updateAssociation:B}=await Et(async()=>{const{updateAssociation:V}=await import("./index-CcsMsRh8.js").then(oe=>oe.e);return{updateAssociation:V}},__vite__mapDeps([0,1,2]));await B(z,L),await d()}async function S(z){const{deleteAssociation:L}=await Et(async()=>{const{deleteAssociation:B}=await import("./index-CcsMsRh8.js").then(V=>V.e);return{deleteAssociation:B}},__vite__mapDeps([0,1,2]));await L(z),await d()}const C=$e(new Map),M=$e(null),T=$e(null);function I(z,L){M.value={fromId:z,fromTitle:L}}function P(){M.value=null}function k(z){T.value=z}function Z(){T.value=null}return{data:r,state:e,loading:t,error:n,load:c,reload:d,transition:u,on:l,createLifeline:h,updateLifeline:f,deleteLifeline:p,mountEntity:v,reviewAssociation:g,selectedAssocId:i,selectAssociation:s,updateEntityTitle:m,deleteEntityById:x,createEntityUnderLifeline:_,createAssoc:y,updateAssoc:E,deleteAssoc:S,selectingTarget:M,startSelectingTarget:I,cancelSelecting:P,editAssoc:T,openEditAssoc:k,closeEditAssoc:Z,entityDetailCache:C}});/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const dl="184",fm={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},pm={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},lf=0,Zc=1,cf=2,mm=3,gm=0,Dr=1,uf=2,Zs=3,yi=0,cn=1,ei=2,ri=0,fs=1,Jc=2,Kc=3,jc=4,hf=5,_m=6,Fi=100,df=101,ff=102,pf=103,mf=104,gf=200,_f=201,vf=202,xf=203,vo=204,xo=205,yf=206,Mf=207,bf=208,Sf=209,wf=210,Ef=211,Af=212,Tf=213,Cf=214,yo=0,Mo=1,bo=2,vs=3,So=4,wo=5,Eo=6,Ao=7,ua=0,Rf=1,If=2,Vn=0,mu=1,gu=2,_u=3,vu=4,xu=5,yu=6,Mu=7,Qc="attached",Pf="detached",fl=300,ai=301,Vi=302,Ur=303,Nr=304,or=306,Wr=1e3,_n=1001,Xr=1002,Ot=1003,bu=1004,vm=1004,Js=1005,xm=1005,Ct=1006,Fr=1007,ym=1007,ii=1008,Mm=1008,pn=1009,Su=1010,wu=1011,er=1012,pl=1013,Ln=1014,on=1015,oi=1016,ml=1017,gl=1018,tr=1020,Eu=35902,Au=35899,Tu=1021,Cu=1022,ln=1023,li=1026,Oi=1027,_l=1028,ha=1029,Gi=1030,vl=1031,bm=1032,xl=1033,Or=33776,Br=33777,kr=33778,zr=33779,To=35840,Co=35841,Ro=35842,Io=35843,Po=36196,Lo=37492,Do=37496,Uo=37488,No=37489,qr=37490,Fo=37491,Oo=37808,Bo=37809,ko=37810,zo=37811,Vo=37812,Go=37813,Ho=37814,Wo=37815,Xo=37816,qo=37817,$o=37818,Yo=37819,Zo=37820,Jo=37821,Ko=36492,jo=36494,Qo=36495,el=36283,tl=36284,$r=36285,nl=36286,Lf=2200,Df=2201,Uf=2202,Yr=2300,il=2301,po=2302,eu=2303,cs=2400,us=2401,Zr=2402,yl=2500,Ru=2501,Sm=0,wm=1,Em=2,Nf=3200,Am=3201,Tm=3202,Cm=3203,Mi=0,Ff=1,_i="",fn="srgb",Jr="srgb-linear",Kr="linear",vt="srgb",Rm="",Im="rg",Pm="ga",Lm=0,os=7680,Dm=7681,Um=7682,Nm=7683,Fm=34055,Om=34056,Bm=5386,km=512,zm=513,Vm=514,Gm=515,Hm=516,Wm=517,Xm=518,tu=519,Of=512,Bf=513,kf=514,Ml=515,zf=516,Vf=517,bl=518,Gf=519,jr=35044,qm=35048,$m=35040,Ym=35045,Zm=35049,Jm=35041,Km=35046,jm=35050,Qm=35042,eg="100",nu="300 es",Sn=2e3,xs=2001,tg={COMPUTE:"compute",RENDER:"render"},ng={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},ig={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},sg={TEXTURE_COMPARE:"depthTextureCompare"};function rg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}const ag={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function Ks(r,e){return new ag[r](e)}function Hf(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Qr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Wf(){const r=Qr("canvas");return r.style.display="block",r}const bh={};let Hi=null;function og(r){Hi=r}function lg(){return Hi}function ea(...r){const e="THREE."+r.shift();Hi?Hi("log",e,...r):console.log(e,...r)}function Xf(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function we(...r){r=Xf(r);const e="THREE."+r.shift();if(Hi)Hi("warn",e,...r);else{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function ze(...r){r=Xf(r);const e="THREE."+r.shift();if(Hi)Hi("error",e,...r);else{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function sl(...r){const e=r.join(" ");e in bh||(bh[e]=!0,we(...r))}function cg(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const ug={[yo]:Mo,[bo]:Eo,[So]:Ao,[vs]:wo,[Mo]:yo,[Eo]:bo,[Ao]:So,[wo]:vs};class Wn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Sh=1234567;const ps=Math.PI/180,nr=180/Math.PI;function En(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(jt[r&255]+jt[r>>8&255]+jt[r>>16&255]+jt[r>>24&255]+"-"+jt[e&255]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[t&63|128]+jt[t>>8&255]+"-"+jt[t>>16&255]+jt[t>>24&255]+jt[n&255]+jt[n>>8&255]+jt[n>>16&255]+jt[n>>24&255]).toLowerCase()}function Ke(r,e,t){return Math.max(e,Math.min(t,r))}function Iu(r,e){return(r%e+e)%e}function hg(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function dg(r,e,t){return r!==e?(t-r)/(e-r):0}function Vr(r,e,t){return(1-t)*r+t*e}function fg(r,e,t,n){return Vr(r,e,1-Math.exp(-t*n))}function pg(r,e=1){return e-Math.abs(Iu(r,e*2)-e)}function mg(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function gg(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function _g(r,e){return r+Math.floor(Math.random()*(e-r+1))}function vg(r,e){return r+Math.random()*(e-r)}function xg(r){return r*(.5-Math.random())}function yg(r){r!==void 0&&(Sh=r);let e=Sh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Mg(r){return r*ps}function bg(r){return r*nr}function Sg(r){return(r&r-1)===0&&r!==0}function wg(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Eg(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Ag(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),d=s((e-n)/2),h=a((e-n)/2),f=s((n-e)/2),p=a((n-e)/2);switch(i){case"XYX":r.set(o*u,l*d,l*h,o*c);break;case"YZY":r.set(l*h,o*u,l*d,o*c);break;case"ZXZ":r.set(l*d,l*h,o*u,o*c);break;case"XZX":r.set(o*u,l*p,l*f,o*c);break;case"YXY":r.set(l*f,o*u,l*p,o*c);break;case"ZYZ":r.set(l*p,l*f,o*u,o*c);break;default:we("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function an(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function at(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const rl={DEG2RAD:ps,RAD2DEG:nr,generateUUID:En,clamp:Ke,euclideanModulo:Iu,mapLinear:hg,inverseLerp:dg,lerp:Vr,damp:fg,pingpong:pg,smoothstep:mg,smootherstep:gg,randInt:_g,randFloat:vg,randFloatSpread:xg,seededRandom:yg,degToRad:Mg,radToDeg:bg,isPowerOfTwo:Sg,ceilPowerOfTwo:wg,floorPowerOfTwo:Eg,setQuaternionFromProperEuler:Ag,normalize:at,denormalize:an},ch=class ch{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ch.prototype.isVector2=!0;let he=ch;class tn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3],h=s[a+0],f=s[a+1],p=s[a+2],v=s[a+3];if(d!==v||l!==h||c!==f||u!==p){let g=l*h+c*f+u*p+d*v;g<0&&(h=-h,f=-f,p=-p,v=-v,g=-g);let m=1-o;if(g<.9995){const x=Math.acos(g),_=Math.sin(x);m=Math.sin(m*x)/_,o=Math.sin(o*x)/_,l=l*m+h*o,c=c*m+f*o,u=u*m+p*o,d=d*m+v*o}else{l=l*m+h*o,c=c*m+f*o,u=u*m+p*o,d=d*m+v*o;const x=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=x,c*=x,u*=x,d*=x}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[a],h=s[a+1],f=s[a+2],p=s[a+3];return e[t]=o*p+u*d+l*f-c*h,e[t+1]=l*p+u*h+c*d-o*f,e[t+2]=c*p+u*f+o*h-l*d,e[t+3]=u*p-o*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),d=o(s/2),h=l(n/2),f=l(i/2),p=l(s/2);switch(a){case"XYZ":this._x=h*u*d+c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d-h*f*p;break;case"YXZ":this._x=h*u*d+c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d+h*f*p;break;case"ZXY":this._x=h*u*d-c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d-h*f*p;break;case"ZYX":this._x=h*u*d-c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d+h*f*p;break;case"YZX":this._x=h*u*d+c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d-h*f*p;break;case"XZY":this._x=h*u*d-c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d+h*f*p;break;default:we("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+i*c-s*l,this._y=i*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const uh=class uh{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(wh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(wh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),u=2*(o*t-s*i),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-s*d,this.z=i+l*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return jl.copy(this).projectOnVector(e),this.sub(jl)}reflect(e){return this.sub(jl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};uh.prototype.isVector3=!0;let R=uh;const jl=new R,wh=new tn,hh=class hh{constructor(e,t,n,i,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],p=n[8],v=i[0],g=i[3],m=i[6],x=i[1],_=i[4],y=i[7],E=i[2],S=i[5],C=i[8];return s[0]=a*v+o*x+l*E,s[3]=a*g+o*_+l*S,s[6]=a*m+o*y+l*C,s[1]=c*v+u*x+d*E,s[4]=c*g+u*_+d*S,s[7]=c*m+u*y+d*C,s[2]=h*v+f*x+p*E,s[5]=h*g+f*_+p*S,s[8]=h*m+f*y+p*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*s,f=c*s-a*l,p=t*d+n*h+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=d*v,e[1]=(i*c-u*n)*v,e[2]=(o*n-i*a)*v,e[3]=h*v,e[4]=(u*t-i*l)*v,e[5]=(i*s-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ql.makeScale(e,t)),this}rotate(e){return this.premultiply(Ql.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ql.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};hh.prototype.isMatrix3=!0;let nt=hh;const Ql=new nt,Eh=new nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ah=new nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Tg(){const r={enabled:!0,workingColorSpace:Jr,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===vt&&(i.r=xi(i.r),i.g=xi(i.g),i.b=xi(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===vt&&(i.r=Qs(i.r),i.g=Qs(i.g),i.b=Qs(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===_i?Kr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return sl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return sl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Jr]:{primaries:e,whitePoint:n,transfer:Kr,toXYZ:Eh,fromXYZ:Ah,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:fn},outputColorSpaceConfig:{drawingBufferColorSpace:fn}},[fn]:{primaries:e,whitePoint:n,transfer:vt,toXYZ:Eh,fromXYZ:Ah,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:fn}}}),r}const dt=Tg();function xi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Qs(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ts;class qf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ts===void 0&&(Ts=Qr("canvas")),Ts.width=e.width,Ts.height=e.height;const i=Ts.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ts}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Qr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=xi(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(xi(t[n]/255)*255):t[n]=xi(t[n]);return{data:t,width:e.width,height:e.height}}else return we("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Cg=0;class Bi{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cg++}),this.uuid=En(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(ec(i[a].image)):s.push(ec(i[a]))}else s=ec(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function ec(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?qf.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(we("Texture: Unable to serialize Texture."),{})}let Rg=0;const tc=new R;class It extends Wn{constructor(e=It.DEFAULT_IMAGE,t=It.DEFAULT_MAPPING,n=_n,i=_n,s=Ct,a=ii,o=ln,l=pn,c=It.DEFAULT_ANISOTROPY,u=_i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rg++}),this.uuid=En(),this.name="",this.source=new Bi(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(tc).x}get height(){return this.source.getSize(tc).y}get depth(){return this.source.getSize(tc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){we(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){we(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wr:e.x=e.x-Math.floor(e.x);break;case _n:e.x=e.x<0?0:1;break;case Xr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wr:e.y=e.y-Math.floor(e.y);break;case _n:e.y=e.y<0?0:1;break;case Xr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=fl;It.DEFAULT_ANISOTROPY=1;const dh=class dh{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,y=(f+1)/2,E=(m+1)/2,S=(u+h)/4,C=(d+v)/4,M=(p+g)/4;return _>y&&_>E?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=S/n,s=C/n):y>E?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=S/i,s=M/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=C/s,i=M/s),this.set(n,i,s,t),this}let x=Math.sqrt((g-p)*(g-p)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(g-p)/x,this.y=(d-v)/x,this.z=(h-u)/x,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};dh.prototype.isVector4=!0;let pt=dh;class Pu extends Wn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ct,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},s=new It(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Ct,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Bi(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class An extends Pu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Sl extends It{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ig extends An{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Sl(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class wl extends It{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pg extends An{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new wl(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}const hl=class hl{constructor(e,t,n,i,s,a,o,l,c,u,d,h,f,p,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,u,d,h,f,p,v,g)}set(e,t,n,i,s,a,o,l,c,u,d,h,f,p,v,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=h,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new hl().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Cs.setFromMatrixColumn(e,0).length(),s=1/Cs.setFromMatrixColumn(e,1).length(),a=1/Cs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=a*u,f=a*d,p=o*u,v=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+p*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,f=l*d,p=c*u,v=c*d;t[0]=h+v*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-p,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,f=l*d,p=c*u,v=c*d;t[0]=h-v*o,t[4]=-a*d,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,f=a*d,p=o*u,v=o*d;t[0]=l*u,t[4]=p*c-f,t[8]=h*c+v,t[1]=l*d,t[5]=v*c+h,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*c,p=o*l,v=o*c;t[0]=l*u,t[4]=v-h*d,t[8]=p*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+p,t[10]=h-v*d}else if(e.order==="XZY"){const h=a*l,f=a*c,p=o*l,v=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+v,t[5]=a*u,t[9]=f*d-p,t[2]=p*d-f,t[6]=o*u,t[10]=v*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Lg,e,Dg)}lookAt(e,t,n){const i=this.elements;return yn.subVectors(e,t),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),Ci.crossVectors(n,yn),Ci.lengthSq()===0&&(Math.abs(n.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),Ci.crossVectors(n,yn)),Ci.normalize(),xa.crossVectors(yn,Ci),i[0]=Ci.x,i[4]=xa.x,i[8]=yn.x,i[1]=Ci.y,i[5]=xa.y,i[9]=yn.y,i[2]=Ci.z,i[6]=xa.z,i[10]=yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],p=n[2],v=n[6],g=n[10],m=n[14],x=n[3],_=n[7],y=n[11],E=n[15],S=i[0],C=i[4],M=i[8],T=i[12],I=i[1],P=i[5],k=i[9],Z=i[13],z=i[2],L=i[6],B=i[10],V=i[14],oe=i[3],Q=i[7],le=i[11],ie=i[15];return s[0]=a*S+o*I+l*z+c*oe,s[4]=a*C+o*P+l*L+c*Q,s[8]=a*M+o*k+l*B+c*le,s[12]=a*T+o*Z+l*V+c*ie,s[1]=u*S+d*I+h*z+f*oe,s[5]=u*C+d*P+h*L+f*Q,s[9]=u*M+d*k+h*B+f*le,s[13]=u*T+d*Z+h*V+f*ie,s[2]=p*S+v*I+g*z+m*oe,s[6]=p*C+v*P+g*L+m*Q,s[10]=p*M+v*k+g*B+m*le,s[14]=p*T+v*Z+g*V+m*ie,s[3]=x*S+_*I+y*z+E*oe,s[7]=x*C+_*P+y*L+E*Q,s[11]=x*M+_*k+y*B+E*le,s[15]=x*T+_*Z+y*V+E*ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],p=e[3],v=e[7],g=e[11],m=e[15],x=l*f-c*h,_=o*f-c*d,y=o*h-l*d,E=a*f-c*u,S=a*h-l*u,C=a*d-o*u;return t*(v*x-g*_+m*y)-n*(p*x-g*E+m*S)+i*(p*_-v*E+m*C)-s*(p*y-v*S+g*C)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],p=e[12],v=e[13],g=e[14],m=e[15],x=t*o-n*a,_=t*l-i*a,y=t*c-s*a,E=n*l-i*o,S=n*c-s*o,C=i*c-s*l,M=u*v-d*p,T=u*g-h*p,I=u*m-f*p,P=d*g-h*v,k=d*m-f*v,Z=h*m-f*g,z=x*Z-_*k+y*P+E*I-S*T+C*M;if(z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/z;return e[0]=(o*Z-l*k+c*P)*L,e[1]=(i*k-n*Z-s*P)*L,e[2]=(v*C-g*S+m*E)*L,e[3]=(h*S-d*C-f*E)*L,e[4]=(l*I-a*Z-c*T)*L,e[5]=(t*Z-i*I+s*T)*L,e[6]=(g*y-p*C-m*_)*L,e[7]=(u*C-h*y+f*_)*L,e[8]=(a*k-o*I+c*M)*L,e[9]=(n*I-t*k-s*M)*L,e[10]=(p*S-v*y+m*x)*L,e[11]=(d*y-u*S-f*x)*L,e[12]=(o*T-a*P-l*M)*L,e[13]=(t*P-n*T+i*M)*L,e[14]=(v*_-p*E-g*x)*L,e[15]=(u*E-d*_+h*x)*L,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,d=o+o,h=s*c,f=s*u,p=s*d,v=a*u,g=a*d,m=o*d,x=l*c,_=l*u,y=l*d,E=n.x,S=n.y,C=n.z;return i[0]=(1-(v+m))*E,i[1]=(f+y)*E,i[2]=(p-_)*E,i[3]=0,i[4]=(f-y)*S,i[5]=(1-(h+m))*S,i[6]=(g+x)*S,i[7]=0,i[8]=(p+_)*C,i[9]=(g-x)*C,i[10]=(1-(h+v))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Cs.set(i[0],i[1],i[2]).length();const o=Cs.set(i[4],i[5],i[6]).length(),l=Cs.set(i[8],i[9],i[10]).length();s<0&&(a=-a),Un.copy(this);const c=1/a,u=1/o,d=1/l;return Un.elements[0]*=c,Un.elements[1]*=c,Un.elements[2]*=c,Un.elements[4]*=u,Un.elements[5]*=u,Un.elements[6]*=u,Un.elements[8]*=d,Un.elements[9]*=d,Un.elements[10]*=d,t.setFromRotationMatrix(Un),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,s,a,o=Sn,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i);let p,v;if(l)p=s/(a-s),v=a*s/(a-s);else if(o===Sn)p=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===xs)p=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=Sn,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-i),h=-(t+e)/(t-e),f=-(n+i)/(n-i);let p,v;if(l)p=1/(a-s),v=a/(a-s);else if(o===Sn)p=-2/(a-s),v=-(a+s)/(a-s);else if(o===xs)p=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};hl.prototype.isMatrix4=!0;let tt=hl;const Cs=new R,Un=new tt,Lg=new R(0,0,0),Dg=new R(1,1,1),Ci=new R,xa=new R,yn=new R,Th=new tt,Ch=new tn;class Hn{constructor(e=0,t=0,n=0,i=Hn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],d=i[2],h=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:we("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Th.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Th,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ch.setFromEuler(this),this.setFromQuaternion(Ch,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Hn.DEFAULT_ORDER="XYZ";class El{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ug=0;const Rh=new R,Rs=new tn,hi=new tt,ya=new R,gr=new R,Ng=new R,Fg=new tn,Ih=new R(1,0,0),Ph=new R(0,1,0),Lh=new R(0,0,1),Dh={type:"added"},Og={type:"removed"},Is={type:"childadded",child:null},nc={type:"childremoved",child:null};class _t extends Wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ug++}),this.uuid=En(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_t.DEFAULT_UP.clone();const e=new R,t=new Hn,n=new tn,i=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new tt},normalMatrix:{value:new nt}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=_t.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new El,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.multiply(Rs),this}rotateOnWorldAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.premultiply(Rs),this}rotateX(e){return this.rotateOnAxis(Ih,e)}rotateY(e){return this.rotateOnAxis(Ph,e)}rotateZ(e){return this.rotateOnAxis(Lh,e)}translateOnAxis(e,t){return Rh.copy(e).applyQuaternion(this.quaternion),this.position.add(Rh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ih,e)}translateY(e){return this.translateOnAxis(Ph,e)}translateZ(e){return this.translateOnAxis(Lh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ya.copy(e):ya.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(gr,ya,this.up):hi.lookAt(ya,gr,this.up),this.quaternion.setFromRotationMatrix(hi),i&&(hi.extractRotation(i.matrixWorld),Rs.setFromRotationMatrix(hi),this.quaternion.premultiply(Rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Dh),Is.child=e,this.dispatchEvent(Is),Is.child=null):ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Og),nc.child=e,this.dispatchEvent(nc),nc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(hi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Dh),Is.child=e,this.dispatchEvent(Is),Is.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,e,Ng),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,Fg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}_t.DEFAULT_UP=new R(0,1,0);_t.DEFAULT_MATRIX_AUTO_UPDATE=!0;_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class js extends _t{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Bg={type:"move"};class mo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new js,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new js,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new js,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&h>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Bg)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new js;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const $f={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ri={h:0,s:0,l:0},Ma={h:0,s:0,l:0};function ic(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Pe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=fn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=dt.workingColorSpace){if(e=Iu(e,1),t=Ke(t,0,1),n=Ke(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=ic(a,s,e+1/3),this.g=ic(a,s,e),this.b=ic(a,s,e-1/3)}return dt.colorSpaceToWorking(this,i),this}setStyle(e,t=fn){function n(s){s!==void 0&&parseFloat(s)<1&&we("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:we("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);we("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=fn){const n=$f[e.toLowerCase()];return n!==void 0?this.setHex(n,t):we("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xi(e.r),this.g=xi(e.g),this.b=xi(e.b),this}copyLinearToSRGB(e){return this.r=Qs(e.r),this.g=Qs(e.g),this.b=Qs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=fn){return dt.workingToColorSpace(Qt.copy(this),e),Math.round(Ke(Qt.r*255,0,255))*65536+Math.round(Ke(Qt.g*255,0,255))*256+Math.round(Ke(Qt.b*255,0,255))}getHexString(e=fn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.workingToColorSpace(Qt.copy(this),t);const n=Qt.r,i=Qt.g,s=Qt.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=dt.workingColorSpace){return dt.workingToColorSpace(Qt.copy(this),t),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=fn){dt.workingToColorSpace(Qt.copy(this),e);const t=Qt.r,n=Qt.g,i=Qt.b;return e!==fn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ri),this.setHSL(Ri.h+e,Ri.s+t,Ri.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ri),e.getHSL(Ma);const n=Vr(Ri.h,Ma.h,t),i=Vr(Ri.s,Ma.s,t),s=Vr(Ri.l,Ma.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qt=new Pe;Pe.NAMES=$f;class Al{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Pe(e),this.density=t}clone(){return new Al(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Tl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Pe(e),this.near=t,this.far=n}clone(){return new Tl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Lu extends _t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hn,this.environmentIntensity=1,this.environmentRotation=new Hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Nn=new R,di=new R,sc=new R,fi=new R,Ps=new R,Ls=new R,Uh=new R,rc=new R,ac=new R,oc=new R,lc=new pt,cc=new pt,uc=new pt;class mn{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Nn.subVectors(e,t),i.cross(Nn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Nn.subVectors(i,t),di.subVectors(n,t),sc.subVectors(e,t);const a=Nn.dot(Nn),o=Nn.dot(di),l=Nn.dot(sc),c=di.dot(di),u=di.dot(sc),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const h=1/d,f=(c*l-o*u)*h,p=(a*u-o*l)*h;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,fi)===null?!1:fi.x>=0&&fi.y>=0&&fi.x+fi.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,fi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,fi.x),l.addScaledVector(a,fi.y),l.addScaledVector(o,fi.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return lc.setScalar(0),cc.setScalar(0),uc.setScalar(0),lc.fromBufferAttribute(e,t),cc.fromBufferAttribute(e,n),uc.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(lc,s.x),a.addScaledVector(cc,s.y),a.addScaledVector(uc,s.z),a}static isFrontFacing(e,t,n,i){return Nn.subVectors(n,t),di.subVectors(e,t),Nn.cross(di).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Nn.subVectors(this.c,this.b),di.subVectors(this.a,this.b),Nn.cross(di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return mn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;Ps.subVectors(i,n),Ls.subVectors(s,n),rc.subVectors(e,n);const l=Ps.dot(rc),c=Ls.dot(rc);if(l<=0&&c<=0)return t.copy(n);ac.subVectors(e,i);const u=Ps.dot(ac),d=Ls.dot(ac);if(u>=0&&d<=u)return t.copy(i);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Ps,a);oc.subVectors(e,s);const f=Ps.dot(oc),p=Ls.dot(oc);if(p>=0&&f<=p)return t.copy(s);const v=f*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Ls,o);const g=u*p-f*d;if(g<=0&&d-u>=0&&f-p>=0)return Uh.subVectors(s,i),o=(d-u)/(d-u+(f-p)),t.copy(i).addScaledVector(Uh,o);const m=1/(g+v+h);return a=v*m,o=h*m,t.copy(n).addScaledVector(Ps,a).addScaledVector(Ls,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class zt{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Fn):Fn.fromBufferAttribute(s,a),Fn.applyMatrix4(e.matrixWorld),this.expandByPoint(Fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ba.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ba.copy(n.boundingBox)),ba.applyMatrix4(e.matrixWorld),this.union(ba)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Fn),Fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_r),Sa.subVectors(this.max,_r),Ds.subVectors(e.a,_r),Us.subVectors(e.b,_r),Ns.subVectors(e.c,_r),Ii.subVectors(Us,Ds),Pi.subVectors(Ns,Us),Zi.subVectors(Ds,Ns);let t=[0,-Ii.z,Ii.y,0,-Pi.z,Pi.y,0,-Zi.z,Zi.y,Ii.z,0,-Ii.x,Pi.z,0,-Pi.x,Zi.z,0,-Zi.x,-Ii.y,Ii.x,0,-Pi.y,Pi.x,0,-Zi.y,Zi.x,0];return!hc(t,Ds,Us,Ns,Sa)||(t=[1,0,0,0,1,0,0,0,1],!hc(t,Ds,Us,Ns,Sa))?!1:(wa.crossVectors(Ii,Pi),t=[wa.x,wa.y,wa.z],hc(t,Ds,Us,Ns,Sa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const pi=[new R,new R,new R,new R,new R,new R,new R,new R],Fn=new R,ba=new zt,Ds=new R,Us=new R,Ns=new R,Ii=new R,Pi=new R,Zi=new R,_r=new R,Sa=new R,wa=new R,Ji=new R;function hc(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Ji.fromArray(r,s);const o=i.x*Math.abs(Ji.x)+i.y*Math.abs(Ji.y)+i.z*Math.abs(Ji.z),l=e.dot(Ji),c=t.dot(Ji),u=n.dot(Ji);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const vi=kg();function kg(){const r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,s[l]=c|u}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}function dn(r){Math.abs(r)>65504&&we("DataUtils.toHalfFloat(): Value out of range."),r=Ke(r,-65504,65504),vi.floatView[0]=r;const e=vi.uint32View[0],t=e>>23&511;return vi.baseTable[t]+((e&8388607)>>vi.shiftTable[t])}function Ir(r){const e=r>>10;return vi.uint32View[0]=vi.mantissaTable[vi.offsetTable[e]+(r&1023)]+vi.exponentTable[e],vi.floatView[0]}class zg{static toHalfFloat(e){return dn(e)}static fromHalfFloat(e){return Ir(e)}}const Bt=new R,Ea=new he;let Vg=0;class bt extends Wn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Vg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=jr,this.updateRanges=[],this.gpuType=on,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ea.fromBufferAttribute(this,t),Ea.applyMatrix3(e),this.setXY(t,Ea.x,Ea.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=an(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=an(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=an(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=an(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=an(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==jr&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Gg extends bt{constructor(e,t,n){super(new Int8Array(e),t,n)}}class Hg extends bt{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class Wg extends bt{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class Xg extends bt{constructor(e,t,n){super(new Int16Array(e),t,n)}}class Du extends bt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class qg extends bt{constructor(e,t,n){super(new Int32Array(e),t,n)}}class Uu extends bt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class $g extends bt{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=Ir(this.array[e*this.itemSize]);return this.normalized&&(t=an(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=dn(t),this}getY(e){let t=Ir(this.array[e*this.itemSize+1]);return this.normalized&&(t=an(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=dn(t),this}getZ(e){let t=Ir(this.array[e*this.itemSize+2]);return this.normalized&&(t=an(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=dn(t),this}getW(e){let t=Ir(this.array[e*this.itemSize+3]);return this.normalized&&(t=an(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=dn(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.array[e+0]=dn(t),this.array[e+1]=dn(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array)),this.array[e+0]=dn(t),this.array[e+1]=dn(n),this.array[e+2]=dn(i),this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array),s=at(s,this.array)),this.array[e+0]=dn(t),this.array[e+1]=dn(n),this.array[e+2]=dn(i),this.array[e+3]=dn(s),this}}class Ue extends bt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Yg=new zt,vr=new R,dc=new R;class Vt{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Yg.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vr.subVectors(e,this.center);const t=vr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(vr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(dc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vr.copy(e.center).add(dc)),this.expandByPoint(vr.copy(e.center).sub(dc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Zg=0;const Rn=new tt,fc=new _t,Fs=new R,Mn=new zt,xr=new zt,Wt=new R;class it extends Wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zg++}),this.uuid=En(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rg(e)?Uu:Du)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new nt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Rn.makeRotationFromQuaternion(e),this.applyMatrix4(Rn),this}rotateX(e){return Rn.makeRotationX(e),this.applyMatrix4(Rn),this}rotateY(e){return Rn.makeRotationY(e),this.applyMatrix4(Rn),this}rotateZ(e){return Rn.makeRotationZ(e),this.applyMatrix4(Rn),this}translate(e,t,n){return Rn.makeTranslation(e,t,n),this.applyMatrix4(Rn),this}scale(e,t,n){return Rn.makeScale(e,t,n),this.applyMatrix4(Rn),this}lookAt(e){return fc.lookAt(e),fc.updateMatrix(),this.applyMatrix4(fc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fs).negate(),this.translate(Fs.x,Fs.y,Fs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ue(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&we("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Mn.setFromBufferAttribute(s),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(Mn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];xr.setFromBufferAttribute(o),this.morphTargetsRelative?(Wt.addVectors(Mn.min,xr.min),Mn.expandByPoint(Wt),Wt.addVectors(Mn.max,xr.max),Mn.expandByPoint(Wt)):(Mn.expandByPoint(xr.min),Mn.expandByPoint(xr.max))}Mn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Wt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Wt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Wt.fromBufferAttribute(o,c),l&&(Fs.fromBufferAttribute(e,c),Wt.add(Fs)),i=Math.max(i,n.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let M=0;M<n.count;M++)o[M]=new R,l[M]=new R;const c=new R,u=new R,d=new R,h=new he,f=new he,p=new he,v=new R,g=new R;function m(M,T,I){c.fromBufferAttribute(n,M),u.fromBufferAttribute(n,T),d.fromBufferAttribute(n,I),h.fromBufferAttribute(s,M),f.fromBufferAttribute(s,T),p.fromBufferAttribute(s,I),u.sub(c),d.sub(c),f.sub(h),p.sub(h);const P=1/(f.x*p.y-p.x*f.y);isFinite(P)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(P),g.copy(d).multiplyScalar(f.x).addScaledVector(u,-p.x).multiplyScalar(P),o[M].add(v),o[T].add(v),o[I].add(v),l[M].add(g),l[T].add(g),l[I].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let M=0,T=x.length;M<T;++M){const I=x[M],P=I.start,k=I.count;for(let Z=P,z=P+k;Z<z;Z+=3)m(e.getX(Z+0),e.getX(Z+1),e.getX(Z+2))}const _=new R,y=new R,E=new R,S=new R;function C(M){E.fromBufferAttribute(i,M),S.copy(E);const T=o[M];_.copy(T),_.sub(E.multiplyScalar(E.dot(T))).normalize(),y.crossVectors(S,T);const P=y.dot(l[M])<0?-1:1;a.setXYZW(M,_.x,_.y,_.z,P)}for(let M=0,T=x.length;M<T;++M){const I=x[M],P=I.start,k=I.count;for(let Z=P,z=P+k;Z<z;Z+=3)C(e.getX(Z+0)),C(e.getX(Z+1)),C(e.getX(Z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new bt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const i=new R,s=new R,a=new R,o=new R,l=new R,c=new R,u=new R,d=new R;if(e)for(let h=0,f=e.count;h<f;h+=3){const p=e.getX(h+0),v=e.getX(h+1),g=e.getX(h+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),u.subVectors(a,s),d.subVectors(i,s),u.cross(d),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)i.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(i,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u);let f=0,p=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*u;for(let m=0;m<u;m++)h[p++]=c[f++]}return new bt(h,u,d)}if(this.index===null)return we("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new it,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Cl{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=jr,this.updateRanges=[],this.version=0,this.uuid=En()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=En()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=En()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const nn=new R;class wn{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix4(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyNormalMatrix(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.transformDirection(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=an(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=an(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=an(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=an(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=an(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){ea("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new bt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new wn(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ea("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Jg=0;class qt extends Wn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jg++}),this.uuid=En(),this.name="",this.type="Material",this.blending=fs,this.side=yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vo,this.blendDst=xo,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pe(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=os,this.stencilZFail=os,this.stencilZPass=os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){we(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){we(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==fs&&(n.blending=this.blending),this.side!==yi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==vo&&(n.blendSrc=this.blendSrc),this.blendDst!==xo&&(n.blendDst=this.blendDst),this.blendEquation!==Fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==tu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==os&&(n.stencilFail=this.stencilFail),this.stencilZFail!==os&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==os&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Nu extends qt{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Pe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Os;const yr=new R,Bs=new R,ks=new R,zs=new he,Mr=new he,Yf=new tt,Aa=new R,br=new R,Ta=new R,Nh=new he,pc=new he,Fh=new he;class Zf extends _t{constructor(e=new Nu){if(super(),this.isSprite=!0,this.type="Sprite",Os===void 0){Os=new it;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Cl(t,5);Os.setIndex([0,1,2,0,2,3]),Os.setAttribute("position",new wn(n,3,0,!1)),Os.setAttribute("uv",new wn(n,2,3,!1))}this.geometry=Os,this.material=e,this.center=new he(.5,.5),this.count=1}raycast(e,t){e.camera===null&&ze('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Bs.setFromMatrixScale(this.matrixWorld),Yf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ks.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Bs.multiplyScalar(-ks.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;Ca(Aa.set(-.5,-.5,0),ks,a,Bs,i,s),Ca(br.set(.5,-.5,0),ks,a,Bs,i,s),Ca(Ta.set(.5,.5,0),ks,a,Bs,i,s),Nh.set(0,0),pc.set(1,0),Fh.set(1,1);let o=e.ray.intersectTriangle(Aa,br,Ta,!1,yr);if(o===null&&(Ca(br.set(-.5,.5,0),ks,a,Bs,i,s),pc.set(0,1),o=e.ray.intersectTriangle(Aa,Ta,br,!1,yr),o===null))return;const l=e.ray.origin.distanceTo(yr);l<e.near||l>e.far||t.push({distance:l,point:yr.clone(),uv:mn.getInterpolation(yr,Aa,br,Ta,Nh,pc,Fh,new he),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ca(r,e,t,n,i,s){zs.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Mr.x=s*zs.x-i*zs.y,Mr.y=i*zs.x+s*zs.y):Mr.copy(zs),r.copy(e),r.x+=Mr.x,r.y+=Mr.y,r.applyMatrix4(Yf)}const Ra=new R,Oh=new R;class Jf extends _t{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const s=t[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let s;for(s=0;s<i.length&&!(t<i[s].distance);s++);return i.splice(s,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let s=t[n].distance;if(t[n].object.visible&&(s-=s*t[n].hysteresis),e<s)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){Ra.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(Ra);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){Ra.setFromMatrixPosition(e.matrixWorld),Oh.setFromMatrixPosition(this.matrixWorld);const n=Ra.distanceTo(Oh)/e.zoom;t[0].object.visible=!0;let i,s;for(i=1,s=t.length;i<s;i++){let a=t[i].distance;if(t[i].object.visible&&(a-=a*t[i].hysteresis),n>=a)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const a=n[i];t.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return t}}const mi=new R,mc=new R,Ia=new R,Li=new R,gc=new R,Pa=new R,_c=new R;class lr{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(mi.copy(this.origin).addScaledVector(this.direction,t),mi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){mc.copy(e).add(t).multiplyScalar(.5),Ia.copy(t).sub(e).normalize(),Li.copy(this.origin).sub(mc);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Ia),o=Li.dot(this.direction),l=-Li.dot(Ia),c=Li.lengthSq(),u=Math.abs(1-a*a);let d,h,f,p;if(u>0)if(d=a*l-o,h=a*o-l,p=s*u,d>=0)if(h>=-p)if(h<=p){const v=1/u;d*=v,h*=v,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-p?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c):h<=p?(d=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+c):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(mc).addScaledVector(Ia,h),f}intersectSphere(e,t){mi.subVectors(e.center,this.origin);const n=mi.dot(this.direction),i=mi.dot(mi)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,i=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,i=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,mi)!==null}intersectTriangle(e,t,n,i,s){gc.subVectors(t,e),Pa.subVectors(n,e),_c.crossVectors(gc,Pa);let a=this.direction.dot(_c),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Li.subVectors(this.origin,e);const l=o*this.direction.dot(Pa.crossVectors(Li,Pa));if(l<0)return null;const c=o*this.direction.dot(gc.cross(Li));if(c<0||l+c>a)return null;const u=-o*Li.dot(_c);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Jt extends qt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=ua,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Bh=new tt,Ki=new lr,La=new Vt,kh=new R,Da=new R,Ua=new R,Na=new R,vc=new R,Fa=new R,zh=new R,Oa=new R;class Mt extends _t{constructor(e=new it,t=new Jt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){Fa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(vc.fromBufferAttribute(d,e),a?Fa.addScaledVector(vc,u):Fa.addScaledVector(vc.sub(t),u))}t.add(Fa)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),La.copy(n.boundingSphere),La.applyMatrix4(s),Ki.copy(e.ray).recast(e.near),!(La.containsPoint(Ki.origin)===!1&&(Ki.intersectSphere(La,kh)===null||Ki.origin.distanceToSquared(kh)>(e.far-e.near)**2))&&(Bh.copy(s).invert(),Ki.copy(e.ray).applyMatrix4(Bh),!(n.boundingBox!==null&&Ki.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ki)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=h.length;p<v;p++){const g=h[p],m=a[g.materialIndex],x=Math.max(g.start,f.start),_=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let y=x,E=_;y<E;y+=3){const S=o.getX(y),C=o.getX(y+1),M=o.getX(y+2);i=Ba(this,m,e,n,c,u,d,S,C,M),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const x=o.getX(g),_=o.getX(g+1),y=o.getX(g+2);i=Ba(this,a,e,n,c,u,d,x,_,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,v=h.length;p<v;p++){const g=h[p],m=a[g.materialIndex],x=Math.max(g.start,f.start),_=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=x,E=_;y<E;y+=3){const S=y,C=y+1,M=y+2;i=Ba(this,m,e,n,c,u,d,S,C,M),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const x=g,_=g+1,y=g+2;i=Ba(this,a,e,n,c,u,d,x,_,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function Kg(r,e,t,n,i,s,a,o){let l;if(e.side===cn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===yi,o),l===null)return null;Oa.copy(o),Oa.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Oa);return c<t.near||c>t.far?null:{distance:c,point:Oa.clone(),object:r}}function Ba(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,Da),r.getVertexPosition(l,Ua),r.getVertexPosition(c,Na);const u=Kg(r,e,t,n,Da,Ua,Na,zh);if(u){const d=new R;mn.getBarycoord(zh,Da,Ua,Na,d),i&&(u.uv=mn.getInterpolatedAttribute(i,o,l,c,d,new he)),s&&(u.uv1=mn.getInterpolatedAttribute(s,o,l,c,d,new he)),a&&(u.normal=mn.getInterpolatedAttribute(a,o,l,c,d,new R),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new R,materialIndex:0};mn.getNormal(Da,Ua,Na,h.normal),u.face=h,u.barycoord=d}return u}const Sr=new pt,Vh=new pt,Gh=new pt,jg=new pt,Hh=new tt,ka=new R,xc=new Vt,Wh=new tt,yc=new lr;class Kf extends Mt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Qc,this.bindMatrix=new tt,this.bindMatrixInverse=new tt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new zt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ka),this.boundingBox.expandByPoint(ka)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Vt),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ka),this.boundingSphere.expandByPoint(ka)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xc.copy(this.boundingSphere),xc.applyMatrix4(i),e.ray.intersectsSphere(xc)!==!1&&(Wh.copy(i).invert(),yc.copy(e.ray).applyMatrix4(Wh),!(this.boundingBox!==null&&yc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,yc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new pt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Qc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Pf?this.bindMatrixInverse.copy(this.bindMatrix).invert():we("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Vh.fromBufferAttribute(i.attributes.skinIndex,e),Gh.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Sr.copy(t),t.set(0,0,0,0)):(Sr.set(...t,1),t.set(0,0,0)),Sr.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const a=Gh.getComponent(s);if(a!==0){const o=Vh.getComponent(s);Hh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(jg.copy(Sr).applyMatrix4(Hh),a)}}return t.isVector4&&(t.w=Sr.w),t.applyMatrix4(this.bindMatrixInverse)}}class Fu extends _t{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Gn extends It{constructor(e=null,t=1,n=1,i,s,a,o,l,c=Ot,u=Ot,d,h){super(null,a,o,l,c,u,i,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Xh=new tt,Qg=new tt;class Rl{constructor(e=[],t=[]){this.uuid=En(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){we("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new tt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new tt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:Qg;Xh.multiplyMatrices(o,t[s]),Xh.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Rl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Gn(t,e,e,ln,on);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(we("Skeleton: No bone found with UUID:",s),a=new Fu),this.bones.push(a),this.boneInverses.push(new tt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class ir extends bt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Vs=new tt,qh=new tt,za=[],$h=new zt,e_=new tt,wr=new Mt,Er=new Vt;class jf extends Mt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ir(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,e_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Vs),$h.copy(e.boundingBox).applyMatrix4(Vs),this.boundingBox.union($h)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Vt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Vs),Er.copy(e.boundingSphere).applyMatrix4(Vs),this.boundingSphere.union(Er)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(wr.geometry=this.geometry,wr.material=this.material,wr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Er.copy(this.boundingSphere),Er.applyMatrix4(n),e.ray.intersectsSphere(Er)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Vs),qh.multiplyMatrices(n,Vs),wr.matrixWorld=qh,wr.raycast(e,za);for(let a=0,o=za.length;a<o;a++){const l=za[a];l.instanceId=s,l.object=this,t.push(l)}za.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ir(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Gn(new Float32Array(i*this.count),i,this.count,_l,on));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Mc=new R,t_=new R,n_=new nt;class Ni{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Mc.subVectors(n,t).cross(t_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(Mc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||n_.getNormalMatrix(e),i=this.coplanarPoint(Mc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ji=new Vt,i_=new he(.5,.5),Va=new R;class cr{constructor(e=new Ni,t=new Ni,n=new Ni,i=new Ni,s=new Ni,a=new Ni){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Sn,n=!1){const i=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],d=s[5],h=s[6],f=s[7],p=s[8],v=s[9],g=s[10],m=s[11],x=s[12],_=s[13],y=s[14],E=s[15];if(i[0].setComponents(c-a,f-u,m-p,E-x).normalize(),i[1].setComponents(c+a,f+u,m+p,E+x).normalize(),i[2].setComponents(c+o,f+d,m+v,E+_).normalize(),i[3].setComponents(c-o,f-d,m-v,E-_).normalize(),n)i[4].setComponents(l,h,g,y).normalize(),i[5].setComponents(c-l,f-h,m-g,E-y).normalize();else if(i[4].setComponents(c-l,f-h,m-g,E-y).normalize(),t===Sn)i[5].setComponents(c+l,f+h,m+g,E+y).normalize();else if(t===xs)i[5].setComponents(l,h,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ji)}intersectsSprite(e){ji.center.set(0,0,0);const t=i_.distanceTo(e.center);return ji.radius=.7071067811865476+t,ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(ji)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Va.x=i.normal.x>0?e.max.x:e.min.x,Va.y=i.normal.y>0?e.max.y:e.min.y,Va.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Va)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Yn=new tt,Zn=new cr;class Il{constructor(){this.coordinateSystem=Sn}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(Yn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Zn.setFromProjectionMatrix(Yn,i.coordinateSystem,i.reversedDepth),Zn.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(Yn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Zn.setFromProjectionMatrix(Yn,i.coordinateSystem,i.reversedDepth),Zn.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(Yn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Zn.setFromProjectionMatrix(Yn,i.coordinateSystem,i.reversedDepth),Zn.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(Yn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Zn.setFromProjectionMatrix(Yn,i.coordinateSystem,i.reversedDepth),Zn.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(Yn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Zn.setFromProjectionMatrix(Yn,i.coordinateSystem,i.reversedDepth),Zn.containsPoint(e))return!0}return!1}clone(){return new Il}}function bc(r,e){return r-e}function s_(r,e){return r.z-e.z}function r_(r,e){return e.z-r.z}class a_{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){const s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});const o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}}const hn=new tt,o_=new Pe(1,1,1),Yh=new cr,l_=new Il,Ga=new zt,Qi=new Vt,Ar=new R,Zh=new R,c_=new R,Sc=new a_,en=new Mt,Ha=[];function u_(r,e,t=0){const n=e.itemSize;if(r.isInterleavedBufferAttribute||r.array.constructor!==e.array.constructor){const i=r.count;for(let s=0;s<i;s++)for(let a=0;a<n;a++)e.setComponent(s+t,a,r.getComponent(s,a))}else e.array.set(r.array,t*n);e.needsUpdate=!0}function es(r,e){if(r.constructor!==e.constructor){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++)e[n]=r[n]}else{const t=Math.min(r.length,e.length);e.set(new r.constructor(r.buffer,0,t))}}class Qf extends Mt{constructor(e,t,n=t*2,i){super(new it,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new Gn(t,e,e,ln,on);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new Gn(t,e,e,ha,Ln);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new Gn(t,e,e,ln,on);n.colorSpace=dt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in e.attributes){const a=e.getAttribute(s),{array:o,itemSize:l,normalized:c}=a,u=new o.constructor(n*l),d=new bt(u,l,c);t.setAttribute(s,d)}if(e.getIndex()!==null){const s=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new bt(s,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=e.getAttribute(n),s=t.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){const t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){const t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zt);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,hn),this.getBoundingBoxAt(s,Ga).applyMatrix4(hn),e.union(Ga)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vt);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,hn),this.getBoundingSphereAt(s,Qi).applyMatrix4(hn),e.union(Qi)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(bc),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const s=this._matricesTexture;hn.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;const a=this._colorsTexture;return a&&(o_.toArray(a.image.data,i*4),a.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const a=e.getIndex();if(a!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?a.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(bc),l=this._availableGeometryIds.shift(),s[l]=i):(l=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),a=t.getIndex(),o=this._geometryInfo[e];if(i&&a.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");const l=o.vertexStart,c=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(const u in n.attributes){const d=t.getAttribute(u),h=n.getAttribute(u);u_(d,h,l);const f=d.itemSize;for(let p=d.count,v=c;p<v;p++){const g=l+p;for(let m=0;m<f;m++)h.setComponent(g,m,0)}h.needsUpdate=!0,h.addUpdateRange(l*f,c*f)}if(i){const u=o.indexStart,d=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let h=0;h<a.count;h++)s.setX(u+h,l+a.getX(h));for(let h=a.count,f=d;h<f;h++)s.setX(u+h,l);s.needsUpdate=!0,s.addUpdateRange(u,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0;const n=this._geometryInfo,i=n.map((a,o)=>o).sort((a,o)=>n[a].vertexStart-n[o].vertexStart),s=this.geometry;for(let a=0,o=n.length;a<o;a++){const l=i[a],c=n[l];if(c.active!==!1){if(s.index!==null){if(c.indexStart!==t){const{indexStart:u,vertexStart:d,reservedIndexCount:h}=c,f=s.index,p=f.array,v=e-d;for(let g=u;g<u+h;g++)p[g]=p[g]+v;f.array.copyWithin(t,u,u+h),f.addUpdateRange(t,h),f.needsUpdate=!0,c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){const{vertexStart:u,reservedVertexCount:d}=c,h=s.attributes;for(const f in h){const p=h[f],{array:v,itemSize:g}=p;v.copyWithin(e*g,u*g,(u+d)*g),p.addUpdateRange(e*g,d*g),p.needsUpdate=!0}c.vertexStart=e}e+=c.reservedVertexCount,c.start=s.index?c.indexStart:c.vertexStart}}return this._nextIndexStart=t,this._nextVertexStart=e,this._visibilityChanged=!0,this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){const s=new zt,a=n.index,o=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let u=l;a&&(u=a.getX(u)),s.expandByPoint(Ar.fromBufferAttribute(o,u))}i.boundingBox=s}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){const s=new Vt;this.getBoundingBoxAt(e,Ga),Ga.getCenter(s.center);const a=n.index,o=n.attributes.position;let l=0;for(let c=i.start,u=i.start+i.count;c<u;c++){let d=c;a&&(d=a.getX(d)),Ar.fromBufferAttribute(o,d),l=Math.max(l,s.center.distanceToSquared(Ar))}s.radius=Math.sqrt(l),i.boundingSphere=s}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);const n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null?t.isVector4?t.set(1,1,1,1):t.setRGB(1,1,1):t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(bc);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const i=new Int32Array(e),s=new Int32Array(e);es(this._multiDrawCounts,i),es(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=e;const a=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),es(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),es(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),es(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const s=this.geometry;s.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new it,this._initializeGeometry(s));const a=this.geometry;s.index&&es(s.index.array,a.index.array);for(const o in s.attributes)es(s.attributes[o].array,a.attributes[o].array)}raycast(e,t){const n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,a=this.geometry;en.material=this.material,en.geometry.index=a.index,en.geometry.attributes=a.attributes,en.geometry.boundingBox===null&&(en.geometry.boundingBox=new zt),en.geometry.boundingSphere===null&&(en.geometry.boundingSphere=new Vt);for(let o=0,l=n.length;o<l;o++){if(!n[o].visible||!n[o].active)continue;const c=n[o].geometryIndex,u=i[c];en.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(o,en.matrixWorld).premultiply(s),this.getBoundingBoxAt(c,en.geometry.boundingBox),this.getBoundingSphereAt(c,en.geometry.boundingSphere),en.raycast(e,Ha);for(let d=0,h=Ha.length;d<h;d++){const f=Ha[d];f.object=this,f.batchId=o,t.push(f)}Ha.length=0}en.material=null,en.geometry.index=null,en.geometry.attributes={},en.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const a=i.getIndex();let o=a===null?1:a.array.BYTES_PER_ELEMENT,l=1;s.wireframe&&(l=2,o=i.attributes.position.count>65535?4:2);const c=this._instanceInfo,u=this._multiDrawStarts,d=this._multiDrawCounts,h=this._geometryInfo,f=this.perObjectFrustumCulled,p=this._indirectTexture,v=p.image.data,g=n.isArrayCamera?l_:Yh;f&&!n.isArrayCamera&&(hn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),Yh.setFromProjectionMatrix(hn,n.coordinateSystem,n.reversedDepth));let m=0;if(this.sortObjects){hn.copy(this.matrixWorld).invert(),Ar.setFromMatrixPosition(n.matrixWorld).applyMatrix4(hn),Zh.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(hn);for(let y=0,E=c.length;y<E;y++)if(c[y].visible&&c[y].active){const S=c[y].geometryIndex;this.getMatrixAt(y,hn),this.getBoundingSphereAt(S,Qi).applyMatrix4(hn);let C=!1;if(f&&(C=!g.intersectsSphere(Qi,n)),!C){const M=h[S],T=c_.subVectors(Qi.center,Ar).dot(Zh);Sc.push(M.start,M.count,T,y)}}const x=Sc.list,_=this.customSort;_===null?x.sort(s.transparent?r_:s_):_.call(this,x,n);for(let y=0,E=x.length;y<E;y++){const S=x[y];u[m]=S.start*o*l,d[m]=S.count*l,v[m]=S.index,m++}Sc.reset()}else for(let x=0,_=c.length;x<_;x++)if(c[x].visible&&c[x].active){const y=c[x].geometryIndex;let E=!1;if(f&&(this.getMatrixAt(x,hn),this.getBoundingSphereAt(y,Qi).applyMatrix4(hn),E=!g.intersectsSphere(Qi,n)),!E){const S=h[y];u[m]=S.start*o*l,d[m]=S.count*l,v[m]=x,m++}}p.needsUpdate=!0,this._multiDrawCount=m,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,s,a){this.onBeforeRender(e,null,i,s,a)}}class un extends qt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Pe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const al=new R,ol=new R,Jh=new tt,Tr=new lr,Wa=new Vt,wc=new R,Kh=new R;class Wi extends _t{constructor(e=new it,t=new un){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)al.fromBufferAttribute(t,i-1),ol.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=al.distanceTo(ol);e.setAttribute("lineDistance",new Ue(n,1))}else we("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wa.copy(n.boundingSphere),Wa.applyMatrix4(i),Wa.radius+=s,e.ray.intersectsSphere(Wa)===!1)return;Jh.copy(i).invert(),Tr.copy(e.ray).applyMatrix4(Jh);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let v=f,g=p-1;v<g;v+=c){const m=u.getX(v),x=u.getX(v+1),_=Xa(this,e,Tr,l,m,x,v);_&&t.push(_)}if(this.isLineLoop){const v=u.getX(p-1),g=u.getX(f),m=Xa(this,e,Tr,l,v,g,p-1);m&&t.push(m)}}else{const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let v=f,g=p-1;v<g;v+=c){const m=Xa(this,e,Tr,l,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){const v=Xa(this,e,Tr,l,p-1,f,p-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Xa(r,e,t,n,i,s,a){const o=r.geometry.attributes.position;if(al.fromBufferAttribute(o,i),ol.fromBufferAttribute(o,s),t.distanceSqToSegment(al,ol,wc,Kh)>n)return;wc.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(wc);if(!(c<e.near||c>e.far))return{distance:c,point:Kh.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const jh=new R,Qh=new R;class ci extends Wi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)jh.fromBufferAttribute(t,i),Qh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+jh.distanceTo(Qh);e.setAttribute("lineDistance",new Ue(n,1))}else we("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ep extends Wi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Ou extends qt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Pe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ed=new tt,iu=new lr,qa=new Vt,$a=new R;class tp extends _t{constructor(e=new it,t=new Ou){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qa.copy(n.boundingSphere),qa.applyMatrix4(i),qa.radius+=s,e.ray.intersectsSphere(qa)===!1)return;ed.copy(i).invert(),iu.copy(e.ray).applyMatrix4(ed);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=h,v=f;p<v;p++){const g=c.getX(p);$a.fromBufferAttribute(d,g),td($a,g,l,i,e,t,this)}}else{const h=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let p=h,v=f;p<v;p++)$a.fromBufferAttribute(d,p),td($a,p,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function td(r,e,t,n,i,s,a){const o=iu.distanceSqToPoint(r);if(o<t){const l=new R;iu.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class np extends It{constructor(e,t,n,i,s=Ct,a=Ct,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;const u=this;function d(){u.needsUpdate=!0,u._requestVideoFrameCallbackId=e.requestVideoFrameCallback(d)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(d))}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}}class h_ extends np{constructor(e,t,n,i,s,a,o,l){super({},e,t,n,i,s,a,o,l),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(e){this.image=e,this.needsUpdate=!0}}class d_ extends It{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=Ot,this.minFilter=Ot,this.generateMipmaps=!1,this.needsUpdate=!0}}class Pl extends It{constructor(e,t,n,i,s,a,o,l,c,u,d,h){super(null,a,o,l,c,u,i,s,d,h),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class f_ extends Pl{constructor(e,t,n,i,s,a){super(e,t,n,s,a),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=_n,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class p_ extends Pl{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,ai),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class da extends It{constructor(e=[],t=ai,n,i,s,a,o,l,c,u){super(e,t,n,i,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class m_ extends It{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class g_ extends It{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;const u=e?e.parentNode:null;u!==null&&"requestPaint"in u&&(u.onpaint=()=>{this.needsUpdate=!0},u.requestPaint())}dispose(){const e=this.image?this.image.parentNode:null;e!==null&&"onpaint"in e&&(e.onpaint=null),super.dispose()}}class ys extends It{constructor(e,t,n=Ln,i,s,a,o=Ot,l=Ot,c,u=li,d=1){if(u!==li&&u!==Oi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,i,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Bi(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class ip extends ys{constructor(e,t=Ln,n=ai,i,s,a=Ot,o=Ot,l,c=li){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,i,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Bu extends It{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Xi extends it{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],d=[];let h=0,f=0;p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ue(c,3)),this.setAttribute("normal",new Ue(u,3)),this.setAttribute("uv",new Ue(d,2));function p(v,g,m,x,_,y,E,S,C,M,T){const I=y/C,P=E/M,k=y/2,Z=E/2,z=S/2,L=C+1,B=M+1;let V=0,oe=0;const Q=new R;for(let le=0;le<B;le++){const ie=le*P-Z;for(let H=0;H<L;H++){const W=H*I-k;Q[v]=W*x,Q[g]=ie*_,Q[m]=z,c.push(Q.x,Q.y,Q.z),Q[v]=0,Q[g]=0,Q[m]=S>0?1:-1,u.push(Q.x,Q.y,Q.z),d.push(H/C),d.push(1-le/M),V+=1}}for(let le=0;le<M;le++)for(let ie=0;ie<C;ie++){const H=h+ie+L*le,W=h+ie+L*(le+1),X=h+(ie+1)+L*(le+1),te=h+(ie+1)+L*le;l.push(H,W,te),l.push(W,X,te),oe+=6}o.addGroup(f,oe,T),f+=oe,h+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ll extends it{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const a=[],o=[],l=[],c=[],u=t/2,d=Math.PI/2*e,h=t,f=2*d+h,p=n*2+s,v=i+1,g=new R,m=new R;for(let x=0;x<=p;x++){let _=0,y=0,E=0,S=0;if(x<=n){const T=x/n,I=T*Math.PI/2;y=-u-e*Math.cos(I),E=e*Math.sin(I),S=-e*Math.cos(I),_=T*d}else if(x<=n+s){const T=(x-n)/s;y=-u+T*t,E=e,S=0,_=d+T*h}else{const T=(x-n-s)/n,I=T*Math.PI/2;y=u+e*Math.sin(I),E=e*Math.cos(I),S=e*Math.sin(I),_=d+h+T*d}const C=Math.max(0,Math.min(1,_/f));let M=0;x===0?M=.5/i:x===p&&(M=-.5/i);for(let T=0;T<=i;T++){const I=T/i,P=I*Math.PI*2,k=Math.sin(P),Z=Math.cos(P);m.x=-E*Z,m.y=y,m.z=E*k,o.push(m.x,m.y,m.z),g.set(-E*Z,S,E*k),g.normalize(),l.push(g.x,g.y,g.z),c.push(I+M,C)}if(x>0){const T=(x-1)*v;for(let I=0;I<i;I++){const P=T+I,k=T+I+1,Z=x*v+I,z=x*v+I+1;a.push(P,k,Z),a.push(k,z,Z)}}}this.setIndex(a),this.setAttribute("position",new Ue(o,3)),this.setAttribute("normal",new Ue(l,3)),this.setAttribute("uv",new Ue(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ll(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Dl extends it{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new R,u=new he;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){const f=n+d/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new Ue(a,3)),this.setAttribute("normal",new Ue(o,3)),this.setAttribute("uv",new Ue(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dl(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class fa extends it{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],d=[],h=[],f=[];let p=0;const v=[],g=n/2;let m=0;x(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new Ue(d,3)),this.setAttribute("normal",new Ue(h,3)),this.setAttribute("uv",new Ue(f,2));function x(){const y=new R,E=new R;let S=0;const C=(t-e)/n;for(let M=0;M<=s;M++){const T=[],I=M/s,P=I*(t-e)+e;for(let k=0;k<=i;k++){const Z=k/i,z=Z*l+o,L=Math.sin(z),B=Math.cos(z);E.x=P*L,E.y=-I*n+g,E.z=P*B,d.push(E.x,E.y,E.z),y.set(L,C,B).normalize(),h.push(y.x,y.y,y.z),f.push(Z,1-I),T.push(p++)}v.push(T)}for(let M=0;M<i;M++)for(let T=0;T<s;T++){const I=v[T][M],P=v[T+1][M],k=v[T+1][M+1],Z=v[T][M+1];(e>0||T!==0)&&(u.push(I,P,Z),S+=3),(t>0||T!==s-1)&&(u.push(P,k,Z),S+=3)}c.addGroup(m,S,0),m+=S}function _(y){const E=p,S=new he,C=new R;let M=0;const T=y===!0?e:t,I=y===!0?1:-1;for(let k=1;k<=i;k++)d.push(0,g*I,0),h.push(0,I,0),f.push(.5,.5),p++;const P=p;for(let k=0;k<=i;k++){const z=k/i*l+o,L=Math.cos(z),B=Math.sin(z);C.x=T*B,C.y=g*I,C.z=T*L,d.push(C.x,C.y,C.z),h.push(0,I,0),S.x=L*.5+.5,S.y=B*.5*I+.5,f.push(S.x,S.y),p++}for(let k=0;k<i;k++){const Z=E+k,z=P+k;y===!0?u.push(z,z+1,Z):u.push(z+1,z,Z),M+=3}c.addGroup(m,M,y===!0?1:2),m+=M}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fa(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ur extends fa{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new ur(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class qi extends it{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],a=[];o(i),c(n),u(),this.setAttribute("position",new Ue(s,3)),this.setAttribute("normal",new Ue(s.slice(),3)),this.setAttribute("uv",new Ue(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const _=new R,y=new R,E=new R;for(let S=0;S<t.length;S+=3)f(t[S+0],_),f(t[S+1],y),f(t[S+2],E),l(_,y,E,x)}function l(x,_,y,E){const S=E+1,C=[];for(let M=0;M<=S;M++){C[M]=[];const T=x.clone().lerp(y,M/S),I=_.clone().lerp(y,M/S),P=S-M;for(let k=0;k<=P;k++)k===0&&M===S?C[M][k]=T:C[M][k]=T.clone().lerp(I,k/P)}for(let M=0;M<S;M++)for(let T=0;T<2*(S-M)-1;T++){const I=Math.floor(T/2);T%2===0?(h(C[M][I+1]),h(C[M+1][I]),h(C[M][I])):(h(C[M][I+1]),h(C[M+1][I+1]),h(C[M+1][I]))}}function c(x){const _=new R;for(let y=0;y<s.length;y+=3)_.x=s[y+0],_.y=s[y+1],_.z=s[y+2],_.normalize().multiplyScalar(x),s[y+0]=_.x,s[y+1]=_.y,s[y+2]=_.z}function u(){const x=new R;for(let _=0;_<s.length;_+=3){x.x=s[_+0],x.y=s[_+1],x.z=s[_+2];const y=g(x)/2/Math.PI+.5,E=m(x)/Math.PI+.5;a.push(y,1-E)}p(),d()}function d(){for(let x=0;x<a.length;x+=6){const _=a[x+0],y=a[x+2],E=a[x+4],S=Math.max(_,y,E),C=Math.min(_,y,E);S>.9&&C<.1&&(_<.2&&(a[x+0]+=1),y<.2&&(a[x+2]+=1),E<.2&&(a[x+4]+=1))}}function h(x){s.push(x.x,x.y,x.z)}function f(x,_){const y=x*3;_.x=e[y+0],_.y=e[y+1],_.z=e[y+2]}function p(){const x=new R,_=new R,y=new R,E=new R,S=new he,C=new he,M=new he;for(let T=0,I=0;T<s.length;T+=9,I+=6){x.set(s[T+0],s[T+1],s[T+2]),_.set(s[T+3],s[T+4],s[T+5]),y.set(s[T+6],s[T+7],s[T+8]),S.set(a[I+0],a[I+1]),C.set(a[I+2],a[I+3]),M.set(a[I+4],a[I+5]),E.copy(x).add(_).add(y).divideScalar(3);const P=g(E);v(S,I+0,x,P),v(C,I+2,_,P),v(M,I+4,y,P)}}function v(x,_,y,E){E<0&&x.x===1&&(a[_]=x.x-1),y.x===0&&y.z===0&&(a[_]=E/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qi(e.vertices,e.indices,e.radius,e.detail)}}class Ul extends qi{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ul(e.radius,e.detail)}}const Ya=new R,Za=new R,Ec=new R,Ja=new mn;class sp extends it{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(ps*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],d=new Array(3),h={},f=[];for(let p=0;p<l;p+=3){a?(c[0]=a.getX(p),c[1]=a.getX(p+1),c[2]=a.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);const{a:v,b:g,c:m}=Ja;if(v.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),Ja.getNormal(Ec),d[0]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,d[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,d[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let x=0;x<3;x++){const _=(x+1)%3,y=d[x],E=d[_],S=Ja[u[x]],C=Ja[u[_]],M=`${y}_${E}`,T=`${E}_${y}`;T in h&&h[T]?(Ec.dot(h[T].normal)<=s&&(f.push(S.x,S.y,S.z),f.push(C.x,C.y,C.z)),h[T]=null):M in h||(h[M]={index0:c[x],index1:c[_],normal:Ec.clone()})}}for(const p in h)if(h[p]){const{index0:v,index1:g}=h[p];Ya.fromBufferAttribute(o,v),Za.fromBufferAttribute(o,g),f.push(Ya.x,Ya.y,Ya.z),f.push(Za.x,Za.y,Za.z)}this.setAttribute("position",new Ue(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Xn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){we("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);const u=n[i],h=n[i+1]-u,f=(a-u)/h;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new he:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new R,i=[],s=[],a=[],o=new R,l=new tt;for(let f=0;f<=e;f++){const p=f/e;i[f]=this.getTangentAt(p,new R)}s[0]=new R,a[0]=new R;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),d=Math.abs(i[0].y),h=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(Ke(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(Ke(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),a[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Nl extends Xn{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new he){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class rp extends Nl{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ku(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,d){let h=(a-s)/c-(o-s)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+d)+(l-o)/d;h*=u,f*=u,i(a,o,h,f)},calc:function(s){const a=s*s,o=a*s;return r+e*s+t*a+n*o}}}const nd=new R,id=new R,Ac=new ku,Tc=new ku,Cc=new ku;class ap extends Xn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new R){const n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=i[(o-1)%s]:(id.subVectors(i[0],i[1]).add(i[0]),c=id);const d=i[o%s],h=i[(o+1)%s];if(this.closed||o+2<s?u=i[(o+2)%s]:(nd.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=nd),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(h),f),g=Math.pow(h.distanceToSquared(u),f);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),Ac.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,p,v,g),Tc.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,p,v,g),Cc.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,p,v,g)}else this.curveType==="catmullrom"&&(Ac.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),Tc.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),Cc.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return n.set(Ac.calc(l),Tc.calc(l),Cc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new R().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function sd(r,e,t,n,i){const s=(n-e)*.5,a=(i-t)*.5,o=r*r,l=r*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*r+t}function __(r,e){const t=1-r;return t*t*e}function v_(r,e){return 2*(1-r)*r*e}function x_(r,e){return r*r*e}function Gr(r,e,t,n){return __(r,e)+v_(r,t)+x_(r,n)}function y_(r,e){const t=1-r;return t*t*t*e}function M_(r,e){const t=1-r;return 3*t*t*r*e}function b_(r,e){return 3*(1-r)*r*r*e}function S_(r,e){return r*r*r*e}function Hr(r,e,t,n,i){return y_(r,e)+M_(r,t)+b_(r,n)+S_(r,i)}class zu extends Xn{constructor(e=new he,t=new he,n=new he,i=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new he){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Hr(e,i.x,s.x,a.x,o.x),Hr(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class op extends Xn{constructor(e=new R,t=new R,n=new R,i=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new R){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Hr(e,i.x,s.x,a.x,o.x),Hr(e,i.y,s.y,a.y,o.y),Hr(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Vu extends Xn{constructor(e=new he,t=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new he){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new he){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class lp extends Xn{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Gu extends Xn{constructor(e=new he,t=new he,n=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new he){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Gr(e,i.x,s.x,a.x),Gr(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hu extends Xn{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Gr(e,i.x,s.x,a.x),Gr(e,i.y,s.y,a.y),Gr(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Wu extends Xn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new he){const n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],u=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(sd(o,l.x,c.x,u.x,d.x),sd(o,l.y,c.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new he().fromArray(i))}return this}}var ll=Object.freeze({__proto__:null,ArcCurve:rp,CatmullRomCurve3:ap,CubicBezierCurve:zu,CubicBezierCurve3:op,EllipseCurve:Nl,LineCurve:Vu,LineCurve3:lp,QuadraticBezierCurve:Gu,QuadraticBezierCurve3:Hu,SplineCurve:Wu});class cp extends Xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ll[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const a=s[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new ll[i.type]().fromJSON(i))}return this}}class cl extends cp{constructor(e){super(),this.type="Path",this.currentPoint=new he,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Vu(this.currentPoint.clone(),new he(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new Gu(this.currentPoint.clone(),new he(e,t),new he(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){const o=new zu(this.currentPoint.clone(),new he(e,t),new he(n,i),new he(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Wu(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){const c=new Nl(e,t,n,i,s,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ms extends cl{constructor(e){super(e),this.uuid=En(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new cl().fromJSON(i))}return this}}function w_(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=up(r,0,i,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=R_(r,e,s,t)),r.length>80*t){o=r[0],l=r[1];let u=o,d=l;for(let h=t;h<i;h+=t){const f=r[h],p=r[h+1];f<o&&(o=f),p<l&&(l=p),f>u&&(u=f),p>d&&(d=p)}c=Math.max(u-o,d-l),c=c!==0?32767/c:0}return ta(s,a,t,o,l,c,0),a}function up(r,e,t,n,i){let s;if(i===z_(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=rd(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=rd(a/n|0,r[a],r[a+1],s);return s&&sr(s,s.next)&&(ia(s),s=s.next),s}function Ms(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(sr(t,t.next)||Rt(t.prev,t,t.next)===0)){if(ia(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ta(r,e,t,n,i,s,a){if(!r)return;!a&&s&&U_(r,n,i,s);let o=r;for(;r.prev!==r.next;){const l=r.prev,c=r.next;if(s?A_(r,n,i,s):E_(r)){e.push(l.i,r.i,c.i),ia(r),r=c.next,o=c.next;continue}if(r=c,r===o){a?a===1?(r=T_(Ms(r),e),ta(r,e,t,n,i,s,2)):a===2&&C_(r,e,t,n,i,s):ta(Ms(r),e,t,n,i,s,1);break}}}function E_(r){const e=r.prev,t=r,n=r.next;if(Rt(e,t,n)>=0)return!1;const i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(i,s,a),d=Math.min(o,l,c),h=Math.max(i,s,a),f=Math.max(o,l,c);let p=n.next;for(;p!==e;){if(p.x>=u&&p.x<=h&&p.y>=d&&p.y<=f&&Pr(i,o,s,l,a,c,p.x,p.y)&&Rt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function A_(r,e,t,n){const i=r.prev,s=r,a=r.next;if(Rt(i,s,a)>=0)return!1;const o=i.x,l=s.x,c=a.x,u=i.y,d=s.y,h=a.y,f=Math.min(o,l,c),p=Math.min(u,d,h),v=Math.max(o,l,c),g=Math.max(u,d,h),m=su(f,p,e,t,n),x=su(v,g,e,t,n);let _=r.prevZ,y=r.nextZ;for(;_&&_.z>=m&&y&&y.z<=x;){if(_.x>=f&&_.x<=v&&_.y>=p&&_.y<=g&&_!==i&&_!==a&&Pr(o,u,l,d,c,h,_.x,_.y)&&Rt(_.prev,_,_.next)>=0||(_=_.prevZ,y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==a&&Pr(o,u,l,d,c,h,y.x,y.y)&&Rt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;_&&_.z>=m;){if(_.x>=f&&_.x<=v&&_.y>=p&&_.y<=g&&_!==i&&_!==a&&Pr(o,u,l,d,c,h,_.x,_.y)&&Rt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;y&&y.z<=x;){if(y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==a&&Pr(o,u,l,d,c,h,y.x,y.y)&&Rt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function T_(r,e){let t=r;do{const n=t.prev,i=t.next.next;!sr(n,i)&&dp(n,t,t.next,i)&&na(n,i)&&na(i,n)&&(e.push(n.i,t.i,i.i),ia(t),ia(t.next),t=r=i),t=t.next}while(t!==r);return Ms(t)}function C_(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&O_(a,o)){let l=fp(a,o);a=Ms(a,a.next),l=Ms(l,l.next),ta(a,e,t,n,i,s,0),ta(l,e,t,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function R_(r,e,t,n){const i=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*n,l=s<a-1?e[s+1]*n:r.length,c=up(r,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(F_(c))}i.sort(I_);for(let s=0;s<i.length;s++)t=P_(i[s],t);return t}function I_(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function P_(r,e){const t=L_(r,e);if(!t)return e;const n=fp(t,r);return Ms(n,n.next),Ms(t,t.next)}function L_(r,e){let t=e;const n=r.x,i=r.y;let s=-1/0,a;if(sr(r,t))return t;do{if(sr(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const d=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>s&&(s=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&hp(i<c?n:s,i,l,c,i<c?s:n,i,t.x,t.y)){const d=Math.abs(i-t.y)/(n-t.x);na(t,r)&&(d<u||d===u&&(t.x>a.x||t.x===a.x&&D_(a,t)))&&(a=t,u=d)}t=t.next}while(t!==o);return a}function D_(r,e){return Rt(r.prev,r,e.prev)<0&&Rt(e.next,r,r.next)<0}function U_(r,e,t,n){let i=r;do i.z===0&&(i.z=su(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,N_(i)}function N_(r){let e,t=1;do{let n=r,i;r=null;let s=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=a}s.nextZ=null,t*=2}while(e>1);return r}function su(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function F_(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function hp(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function Pr(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&hp(r,e,t,n,i,s,a,o)}function O_(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!B_(r,e)&&(na(r,e)&&na(e,r)&&k_(r,e)&&(Rt(r.prev,r,e.prev)||Rt(r,e.prev,e))||sr(r,e)&&Rt(r.prev,r,r.next)>0&&Rt(e.prev,e,e.next)>0)}function Rt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function sr(r,e){return r.x===e.x&&r.y===e.y}function dp(r,e,t,n){const i=ja(Rt(r,e,t)),s=ja(Rt(r,e,n)),a=ja(Rt(t,n,r)),o=ja(Rt(t,n,e));return!!(i!==s&&a!==o||i===0&&Ka(r,t,e)||s===0&&Ka(r,n,e)||a===0&&Ka(t,r,n)||o===0&&Ka(t,e,n))}function Ka(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function ja(r){return r>0?1:r<0?-1:0}function B_(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&dp(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function na(r,e){return Rt(r.prev,r,r.next)<0?Rt(r,e,r.next)>=0&&Rt(r,r.prev,e)>=0:Rt(r,e,r.prev)<0||Rt(r,r.next,e)<0}function k_(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function fp(r,e){const t=ru(r.i,r.x,r.y),n=ru(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function rd(r,e,t,n){const i=ru(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ia(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function ru(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function z_(r,e,t,n){let i=0;for(let s=e,a=t-n;s<t;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}class V_{static triangulate(e,t,n=2){return w_(e,t,n)}}class zn{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return zn.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];ad(e),od(n,e);let a=e.length;t.forEach(ad);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,od(n,t[l]);const o=V_.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function ad(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function od(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class Fl extends it{constructor(e=new ms([new he(.5,.5),new he(-.5,.5),new he(-.5,-.5),new he(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new Ue(i,3)),this.setAttribute("uv",new Ue(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1;let h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,x=t.UVGenerator!==void 0?t.UVGenerator:G_;let _,y=!1,E,S,C,M;if(m){_=m.getSpacedPoints(u),y=!0,h=!1;const de=m.isCatmullRomCurve3?m.closed:!1;E=m.computeFrenetFrames(u,de),S=new R,C=new R,M=new R}h||(g=0,f=0,p=0,v=0);const T=o.extractPoints(c);let I=T.shape;const P=T.holes;if(!zn.isClockWise(I)){I=I.reverse();for(let de=0,xe=P.length;de<xe;de++){const pe=P[de];zn.isClockWise(pe)&&(P[de]=pe.reverse())}}function Z(de){const pe=10000000000000001e-36;let Re=de[0];for(let Ee=1;Ee<=de.length;Ee++){const Je=Ee%de.length,D=de[Je],Qe=D.x-Re.x,Be=D.y-Re.y,et=Qe*Qe+Be*Be,U=Math.max(Math.abs(D.x),Math.abs(D.y),Math.abs(Re.x),Math.abs(Re.y)),q=pe*U*U;if(et<=q){de.splice(Je,1),Ee--;continue}Re=D}}Z(I),P.forEach(Z);const z=P.length,L=I;for(let de=0;de<z;de++){const xe=P[de];I=I.concat(xe)}function B(de,xe,pe){return xe||ze("ExtrudeGeometry: vec does not exist"),de.clone().addScaledVector(xe,pe)}const V=I.length;function oe(de,xe,pe){let Re,Ee,Je;const D=de.x-xe.x,Qe=de.y-xe.y,Be=pe.x-de.x,et=pe.y-de.y,U=D*D+Qe*Qe,q=D*et-Qe*Be;if(Math.abs(q)>Number.EPSILON){const w=Math.sqrt(U),b=Math.sqrt(Be*Be+et*et),N=xe.x-Qe/w,J=xe.y+D/w,ue=pe.x-et/b,re=pe.y+Be/b,ge=((ue-N)*et-(re-J)*Be)/(D*et-Qe*Be);Re=N+D*ge-de.x,Ee=J+Qe*ge-de.y;const ee=Re*Re+Ee*Ee;if(ee<=2)return new he(Re,Ee);Je=Math.sqrt(ee/2)}else{let w=!1;D>Number.EPSILON?Be>Number.EPSILON&&(w=!0):D<-Number.EPSILON?Be<-Number.EPSILON&&(w=!0):Math.sign(Qe)===Math.sign(et)&&(w=!0),w?(Re=-Qe,Ee=D,Je=Math.sqrt(U)):(Re=D,Ee=Qe,Je=Math.sqrt(U/2))}return new he(Re/Je,Ee/Je)}const Q=[];for(let de=0,xe=L.length,pe=xe-1,Re=de+1;de<xe;de++,pe++,Re++)pe===xe&&(pe=0),Re===xe&&(Re=0),Q[de]=oe(L[de],L[pe],L[Re]);const le=[];let ie,H=Q.concat();for(let de=0,xe=z;de<xe;de++){const pe=P[de];ie=[];for(let Re=0,Ee=pe.length,Je=Ee-1,D=Re+1;Re<Ee;Re++,Je++,D++)Je===Ee&&(Je=0),D===Ee&&(D=0),ie[Re]=oe(pe[Re],pe[Je],pe[D]);le.push(ie),H=H.concat(ie)}let W;if(g===0)W=zn.triangulateShape(L,P);else{const de=[],xe=[];for(let pe=0;pe<g;pe++){const Re=pe/g,Ee=f*Math.cos(Re*Math.PI/2),Je=p*Math.sin(Re*Math.PI/2)+v;for(let D=0,Qe=L.length;D<Qe;D++){const Be=B(L[D],Q[D],Je);Ce(Be.x,Be.y,-Ee),Re===0&&de.push(Be)}for(let D=0,Qe=z;D<Qe;D++){const Be=P[D];ie=le[D];const et=[];for(let U=0,q=Be.length;U<q;U++){const w=B(Be[U],ie[U],Je);Ce(w.x,w.y,-Ee),Re===0&&et.push(w)}Re===0&&xe.push(et)}}W=zn.triangulateShape(de,xe)}const X=W.length,te=p+v;for(let de=0;de<V;de++){const xe=h?B(I[de],H[de],te):I[de];y?(C.copy(E.normals[0]).multiplyScalar(xe.x),S.copy(E.binormals[0]).multiplyScalar(xe.y),M.copy(_[0]).add(C).add(S),Ce(M.x,M.y,M.z)):Ce(xe.x,xe.y,0)}for(let de=1;de<=u;de++)for(let xe=0;xe<V;xe++){const pe=h?B(I[xe],H[xe],te):I[xe];y?(C.copy(E.normals[de]).multiplyScalar(pe.x),S.copy(E.binormals[de]).multiplyScalar(pe.y),M.copy(_[de]).add(C).add(S),Ce(M.x,M.y,M.z)):Ce(pe.x,pe.y,d/u*de)}for(let de=g-1;de>=0;de--){const xe=de/g,pe=f*Math.cos(xe*Math.PI/2),Re=p*Math.sin(xe*Math.PI/2)+v;for(let Ee=0,Je=L.length;Ee<Je;Ee++){const D=B(L[Ee],Q[Ee],Re);Ce(D.x,D.y,d+pe)}for(let Ee=0,Je=P.length;Ee<Je;Ee++){const D=P[Ee];ie=le[Ee];for(let Qe=0,Be=D.length;Qe<Be;Qe++){const et=B(D[Qe],ie[Qe],Re);y?Ce(et.x,et.y+_[u-1].y,_[u-1].x+pe):Ce(et.x,et.y,d+pe)}}}K(),fe();function K(){const de=i.length/3;if(h){let xe=0,pe=V*xe;for(let Re=0;Re<X;Re++){const Ee=W[Re];Ge(Ee[2]+pe,Ee[1]+pe,Ee[0]+pe)}xe=u+g*2,pe=V*xe;for(let Re=0;Re<X;Re++){const Ee=W[Re];Ge(Ee[0]+pe,Ee[1]+pe,Ee[2]+pe)}}else{for(let xe=0;xe<X;xe++){const pe=W[xe];Ge(pe[2],pe[1],pe[0])}for(let xe=0;xe<X;xe++){const pe=W[xe];Ge(pe[0]+V*u,pe[1]+V*u,pe[2]+V*u)}}n.addGroup(de,i.length/3-de,0)}function fe(){const de=i.length/3;let xe=0;me(L,xe),xe+=L.length;for(let pe=0,Re=P.length;pe<Re;pe++){const Ee=P[pe];me(Ee,xe),xe+=Ee.length}n.addGroup(de,i.length/3-de,1)}function me(de,xe){let pe=de.length;for(;--pe>=0;){const Re=pe;let Ee=pe-1;Ee<0&&(Ee=de.length-1);for(let Je=0,D=u+g*2;Je<D;Je++){const Qe=V*Je,Be=V*(Je+1),et=xe+Re+Qe,U=xe+Ee+Qe,q=xe+Ee+Be,w=xe+Re+Be;ke(et,U,q,w)}}}function Ce(de,xe,pe){l.push(de),l.push(xe),l.push(pe)}function Ge(de,xe,pe){ft(de),ft(xe),ft(pe);const Re=i.length/3,Ee=x.generateTopUV(n,i,Re-3,Re-2,Re-1);je(Ee[0]),je(Ee[1]),je(Ee[2])}function ke(de,xe,pe,Re){ft(de),ft(xe),ft(Re),ft(xe),ft(pe),ft(Re);const Ee=i.length/3,Je=x.generateSideWallUV(n,i,Ee-6,Ee-3,Ee-2,Ee-1);je(Je[0]),je(Je[1]),je(Je[3]),je(Je[1]),je(Je[2]),je(Je[3])}function ft(de){i.push(l[de*3+0]),i.push(l[de*3+1]),i.push(l[de*3+2])}function je(de){s.push(de.x),s.push(de.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return H_(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];n.push(o)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new ll[i.type]().fromJSON(i)),new Fl(n,e.options)}}const G_={generateTopUV:function(r,e,t,n,i){const s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],u=e[i*3+1];return[new he(s,a),new he(o,l),new he(c,u)]},generateSideWallUV:function(r,e,t,n,i,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],d=e[n*3+2],h=e[i*3],f=e[i*3+1],p=e[i*3+2],v=e[s*3],g=e[s*3+1],m=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new he(a,1-l),new he(c,1-d),new he(h,1-p),new he(v,1-m)]:[new he(o,1-l),new he(u,1-d),new he(f,1-p),new he(g,1-m)]}};function H_(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Ol extends qi{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ol(e.radius,e.detail)}}class Bl extends it{constructor(e=[new he(0,-.5),new he(.5,0),new he(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Ke(i,0,Math.PI*2);const s=[],a=[],o=[],l=[],c=[],u=1/t,d=new R,h=new he,f=new R,p=new R,v=new R;let g=0,m=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:g=e[x+1].x-e[x].x,m=e[x+1].y-e[x].y,f.x=m*1,f.y=-g,f.z=m*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:g=e[x+1].x-e[x].x,m=e[x+1].y-e[x].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(p)}for(let x=0;x<=t;x++){const _=n+x*u*i,y=Math.sin(_),E=Math.cos(_);for(let S=0;S<=e.length-1;S++){d.x=e[S].x*y,d.y=e[S].y,d.z=e[S].x*E,a.push(d.x,d.y,d.z),h.x=x/t,h.y=S/(e.length-1),o.push(h.x,h.y);const C=l[3*S+0]*y,M=l[3*S+1],T=l[3*S+0]*E;c.push(C,M,T)}}for(let x=0;x<t;x++)for(let _=0;_<e.length-1;_++){const y=_+x*e.length,E=y,S=y+e.length,C=y+e.length+1,M=y+1;s.push(E,S,M),s.push(C,M,S)}this.setIndex(s),this.setAttribute("position",new Ue(a,3)),this.setAttribute("uv",new Ue(o,2)),this.setAttribute("normal",new Ue(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bl(e.points,e.segments,e.phiStart,e.phiLength)}}class hr extends qi{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new hr(e.radius,e.detail)}}class dr extends it{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,d=e/o,h=t/l,f=[],p=[],v=[],g=[];for(let m=0;m<u;m++){const x=m*h-a;for(let _=0;_<c;_++){const y=_*d-s;p.push(y,-x,0),v.push(0,0,1),g.push(_/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<o;x++){const _=x+c*m,y=x+c*(m+1),E=x+1+c*(m+1),S=x+1+c*m;f.push(_,y,S),f.push(y,E,S)}this.setIndex(f),this.setAttribute("position",new Ue(p,3)),this.setAttribute("normal",new Ue(v,3)),this.setAttribute("uv",new Ue(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dr(e.width,e.height,e.widthSegments,e.heightSegments)}}class kl extends it{constructor(e=.5,t=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],u=[];let d=e;const h=(t-e)/i,f=new R,p=new he;for(let v=0;v<=i;v++){for(let g=0;g<=n;g++){const m=s+g/n*a;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,u.push(p.x,p.y)}d+=h}for(let v=0;v<i;v++){const g=v*(n+1);for(let m=0;m<n;m++){const x=m+g,_=x,y=x+n+1,E=x+n+2,S=x+1;o.push(_,y,S),o.push(y,E,S)}}this.setIndex(o),this.setAttribute("position",new Ue(l,3)),this.setAttribute("normal",new Ue(c,3)),this.setAttribute("uv",new Ue(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class zl extends it{constructor(e=new ms([new he(0,.5),new he(-.5,-.5),new he(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Ue(i,3)),this.setAttribute("normal",new Ue(s,3)),this.setAttribute("uv",new Ue(a,2));function c(u){const d=i.length/3,h=u.extractPoints(t);let f=h.shape;const p=h.holes;zn.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){const x=p[g];zn.isClockWise(x)===!0&&(p[g]=x.reverse())}const v=zn.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){const x=p[g];f=f.concat(x)}for(let g=0,m=f.length;g<m;g++){const x=f[g];i.push(x.x,x.y,0),s.push(0,0,1),a.push(x.x,x.y)}for(let g=0,m=v.length;g<m;g++){const x=v[g],_=x[0]+d,y=x[1]+d,E=x[2]+d;n.push(_,y,E),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return W_(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const a=t[e.shapes[i]];n.push(a)}return new zl(n,e.curveSegments)}}function W_(r,e){if(e.shapes=[],Array.isArray(r))for(let t=0,n=r.length;t<n;t++){const i=r[t];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e}class kn extends it{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],d=new R,h=new R,f=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const x=[],_=m/n;let y=0;m===0&&a===0?y=.5/t:m===n&&l===Math.PI&&(y=-.5/t);for(let E=0;E<=t;E++){const S=E/t;d.x=-e*Math.cos(i+S*s)*Math.sin(a+_*o),d.y=e*Math.cos(a+_*o),d.z=e*Math.sin(i+S*s)*Math.sin(a+_*o),p.push(d.x,d.y,d.z),h.copy(d).normalize(),v.push(h.x,h.y,h.z),g.push(S+y,1-_),x.push(c++)}u.push(x)}for(let m=0;m<n;m++)for(let x=0;x<t;x++){const _=u[m][x+1],y=u[m][x],E=u[m+1][x],S=u[m+1][x+1];(m!==0||a>0)&&f.push(_,y,S),(m!==n-1||l<Math.PI)&&f.push(y,E,S)}this.setIndex(f),this.setAttribute("position",new Ue(p,3)),this.setAttribute("normal",new Ue(v,3)),this.setAttribute("uv",new Ue(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class pa extends qi{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new pa(e.radius,e.detail)}}class bs extends it{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);const l=[],c=[],u=[],d=[],h=new R,f=new R,p=new R;for(let v=0;v<=n;v++){const g=a+v/n*o;for(let m=0;m<=i;m++){const x=m/i*s;f.x=(e+t*Math.cos(g))*Math.cos(x),f.y=(e+t*Math.cos(g))*Math.sin(x),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),p.subVectors(f,h).normalize(),u.push(p.x,p.y,p.z),d.push(m/i),d.push(v/n)}}for(let v=1;v<=n;v++)for(let g=1;g<=i;g++){const m=(i+1)*v+g-1,x=(i+1)*(v-1)+g-1,_=(i+1)*(v-1)+g,y=(i+1)*v+g;l.push(m,x,y),l.push(x,_,y)}this.setIndex(l),this.setAttribute("position",new Ue(c,3)),this.setAttribute("normal",new Ue(u,3)),this.setAttribute("uv",new Ue(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bs(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Vl extends it{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);const o=[],l=[],c=[],u=[],d=new R,h=new R,f=new R,p=new R,v=new R,g=new R,m=new R;for(let _=0;_<=n;++_){const y=_/n*s*Math.PI*2;x(y,s,a,e,f),x(y+.01,s,a,e,p),g.subVectors(p,f),m.addVectors(p,f),v.crossVectors(g,m),m.crossVectors(v,g),v.normalize(),m.normalize();for(let E=0;E<=i;++E){const S=E/i*Math.PI*2,C=-t*Math.cos(S),M=t*Math.sin(S);d.x=f.x+(C*m.x+M*v.x),d.y=f.y+(C*m.y+M*v.y),d.z=f.z+(C*m.z+M*v.z),l.push(d.x,d.y,d.z),h.subVectors(d,f).normalize(),c.push(h.x,h.y,h.z),u.push(_/n),u.push(E/i)}}for(let _=1;_<=n;_++)for(let y=1;y<=i;y++){const E=(i+1)*(_-1)+(y-1),S=(i+1)*_+(y-1),C=(i+1)*_+y,M=(i+1)*(_-1)+y;o.push(E,S,M),o.push(S,C,M)}this.setIndex(o),this.setAttribute("position",new Ue(l,3)),this.setAttribute("normal",new Ue(c,3)),this.setAttribute("uv",new Ue(u,2));function x(_,y,E,S,C){const M=Math.cos(_),T=Math.sin(_),I=E/y*_,P=Math.cos(I);C.x=S*(2+P)*.5*M,C.y=S*(2+P)*T*.5,C.z=S*Math.sin(I)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vl(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class Gl extends it{constructor(e=new Hu(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new R,l=new R,c=new he;let u=new R;const d=[],h=[],f=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new Ue(d,3)),this.setAttribute("normal",new Ue(h,3)),this.setAttribute("uv",new Ue(f,2));function v(){for(let _=0;_<t;_++)g(_);g(s===!1?t:0),x(),m()}function g(_){u=e.getPointAt(_/t,u);const y=a.normals[_],E=a.binormals[_];for(let S=0;S<=i;S++){const C=S/i*Math.PI*2,M=Math.sin(C),T=-Math.cos(C);l.x=T*y.x+M*E.x,l.y=T*y.y+M*E.y,l.z=T*y.z+M*E.z,l.normalize(),h.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,d.push(o.x,o.y,o.z)}}function m(){for(let _=1;_<=t;_++)for(let y=1;y<=i;y++){const E=(i+1)*(_-1)+(y-1),S=(i+1)*_+(y-1),C=(i+1)*_+y,M=(i+1)*(_-1)+y;p.push(E,S,M),p.push(S,C,M)}}function x(){for(let _=0;_<=t;_++)for(let y=0;y<=i;y++)c.x=_/t,c.y=y/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Gl(new ll[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Xu extends it{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new R,s=new R;if(e.index!==null){const a=e.attributes.position,o=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const d=l[c],h=d.start,f=d.count;for(let p=h,v=h+f;p<v;p+=3)for(let g=0;g<3;g++){const m=o.getX(p+g),x=o.getX(p+(g+1)%3);i.fromBufferAttribute(a,m),s.fromBufferAttribute(a,x),ld(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{const a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){const u=3*o+c,d=3*o+(c+1)%3;i.fromBufferAttribute(a,u),s.fromBufferAttribute(a,d),ld(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Ue(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function ld(r,e,t){const n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var cd=Object.freeze({__proto__:null,BoxGeometry:Xi,CapsuleGeometry:Ll,CircleGeometry:Dl,ConeGeometry:ur,CylinderGeometry:fa,DodecahedronGeometry:Ul,EdgesGeometry:sp,ExtrudeGeometry:Fl,IcosahedronGeometry:Ol,LatheGeometry:Bl,OctahedronGeometry:hr,PlaneGeometry:dr,PolyhedronGeometry:qi,RingGeometry:kl,ShapeGeometry:zl,SphereGeometry:kn,TetrahedronGeometry:pa,TorusGeometry:bs,TorusKnotGeometry:Vl,TubeGeometry:Gl,WireframeGeometry:Xu});class pp extends qt{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Pe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}function rr(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];if(ud(i))i.isRenderTargetTexture?(we("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(ud(i[0])){const s=[];for(let a=0,o=i.length;a<o;a++)s[a]=i[a].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function sn(r){const e={};for(let t=0;t<r.length;t++){const n=rr(r[t]);for(const i in n)e[i]=n[i]}return e}function ud(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function X_(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function mp(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}const Hl={clone:rr,merge:sn};var q_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tn extends qt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=q_,this.fragmentShader=$_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rr(e.uniforms),this.uniformsGroups=X_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class qu extends Tn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class $u extends qt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mi,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gp extends $u{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new he(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ke(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Pe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Pe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Pe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class _p extends qt{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Pe(16777215),this.specular=new Pe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mi,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=ua,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class vp extends qt{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Pe(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mi,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class xp extends qt{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mi,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class yp extends qt{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mi,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=ua,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Yu extends qt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Zu extends qt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Mp extends qt{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Pe(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mi,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}}class bp extends un{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function hs(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Sp(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function au(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function Ju(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}function Y_(r,e,t,n,i=30){const s=r.clone();s.name=e;const a=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],u=c.getValueSize(),d=[],h=[];for(let f=0;f<c.times.length;++f){const p=c.times[f]*i;if(!(p<t||p>=n)){d.push(c.times[f]);for(let v=0;v<u;++v)h.push(c.values[f*u+v])}}d.length!==0&&(c.times=hs(d,c.times.constructor),c.values=hs(h,c.values.constructor),a.push(c))}s.tracks=a;let o=1/0;for(let l=0;l<s.tracks.length;++l)o>s.tracks[l].times[0]&&(o=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*o);return s.resetDuration(),s}function Z_(r,e=0,t=r,n=30){n<=0&&(n=30);const i=t.tracks.length,s=e/n;for(let a=0;a<i;++a){const o=t.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;const c=r.tracks.find(function(m){return m.name===o.name&&m.ValueTypeName===l});if(c===void 0)continue;let u=0;const d=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=d/3);let h=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=f/3);const p=o.times.length-1;let v;if(s<=o.times[0]){const m=u,x=d-u;v=o.values.slice(m,x)}else if(s>=o.times[p]){const m=p*d+u,x=m+d-u;v=o.values.slice(m,x)}else{const m=o.createInterpolant(),x=u,_=d-u;m.evaluate(s),v=m.resultBuffer.slice(x,_)}l==="quaternion"&&new tn().fromArray(v).normalize().conjugate().toArray(v);const g=c.times.length;for(let m=0;m<g;++m){const x=m*f+h;if(l==="quaternion")tn.multiplyQuaternionsFlat(c.values,x,v,0,c.values,x);else{const _=f-h*2;for(let y=0;y<_;++y)c.values[x+y]-=v[y]}}}return r.blendMode=Ru,r}class J_{static convertArray(e,t){return hs(e,t)}static isTypedArray(e){return Hf(e)}static getKeyframeOrder(e){return Sp(e)}static sortedArray(e,t,n){return au(e,t,n)}static flattenJSON(e,t,n,i){Ju(e,t,n,i)}static subclip(e,t,n,i,s=30){return Y_(e,t,n,i,s)}static makeClipAdditive(e,t=0,n=e,i=30){return Z_(e,t,n,i)}}class fr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class wp extends fr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:cs,endingEnd:cs}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case us:s=e,o=2*t-n;break;case Zr:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case us:a=e,l=2*n-t;break;case Zr:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),v=p*p,g=v*p,m=-h*g+2*h*v-h*p,x=(1+h)*g+(-1.5-2*h)*v+(-.5+h)*p+1,_=(-1-f)*g+(1.5+f)*v+.5*p,y=f*g-f*v;for(let E=0;E!==o;++E)s[E]=m*a[u+E]+x*a[c+E]+_*a[l+E]+y*a[d+E];return s}}class Ku extends fr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(i-t),d=1-u;for(let h=0;h!==o;++h)s[h]=a[c+h]*d+a[l+h]*u;return s}}class Ep extends fr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Ap extends fr{interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.settings||this.DefaultSettings_,d=u.inTangents,h=u.outTangents;if(!d||!h){const v=(n-t)/(i-t),g=1-v;for(let m=0;m!==o;++m)s[m]=a[c+m]*g+a[l+m]*v;return s}const f=o*2,p=e-1;for(let v=0;v!==o;++v){const g=a[c+v],m=a[l+v],x=p*f+v*2,_=h[x],y=h[x+1],E=e*f+v*2,S=d[E],C=d[E+1];let M=(n-t)/(i-t),T,I,P,k,Z;for(let z=0;z<8;z++){T=M*M,I=T*M,P=1-M,k=P*P,Z=k*P;const B=Z*t+3*k*M*_+3*P*T*S+I*i-n;if(Math.abs(B)<1e-10)break;const V=3*k*(_-t)+6*P*M*(S-_)+3*T*(i-S);if(Math.abs(V)<1e-10)break;M=M-B/V,M=Math.max(0,Math.min(1,M))}s[v]=Z*g+3*k*M*y+3*P*T*C+I*m}return s}}class Dn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=hs(t,this.TimeBufferType),this.values=hs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:hs(e.times,Array),values:hs(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ep(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ku(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new wp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new Ap(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Yr:t=this.InterpolantFactoryMethodDiscrete;break;case il:t=this.InterpolantFactoryMethodLinear;break;case po:t=this.InterpolantFactoryMethodSmooth;break;case eu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return we("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Yr;case this.InterpolantFactoryMethodLinear:return il;case this.InterpolantFactoryMethodSmooth:return po;case this.InterpolantFactoryMethodBezier:return eu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(ze("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(ze("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){ze("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){ze("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&Hf(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){ze("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===po,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(i)l=!0;else{const d=o*n,h=d-n,f=d+n;for(let p=0;p!==n;++p){const v=t[d+p];if(v!==t[h+p]||v!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const d=o*n,h=a*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Dn.prototype.ValueTypeName="";Dn.prototype.TimeBufferType=Float32Array;Dn.prototype.ValueBufferType=Float32Array;Dn.prototype.DefaultInterpolation=il;class Ss extends Dn{constructor(e,t,n){super(e,t,n)}}Ss.prototype.ValueTypeName="bool";Ss.prototype.ValueBufferType=Array;Ss.prototype.DefaultInterpolation=Yr;Ss.prototype.InterpolantFactoryMethodLinear=void 0;Ss.prototype.InterpolantFactoryMethodSmooth=void 0;class ju extends Dn{constructor(e,t,n,i){super(e,t,n,i)}}ju.prototype.ValueTypeName="color";class sa extends Dn{constructor(e,t,n,i){super(e,t,n,i)}}sa.prototype.ValueTypeName="number";class Tp extends fr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let u=c+o;c!==u;c+=4)tn.slerpFlat(s,0,a,c-o,a,c,l);return s}}class ma extends Dn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Tp(this.times,this.values,this.getValueSize(),e)}}ma.prototype.ValueTypeName="quaternion";ma.prototype.InterpolantFactoryMethodSmooth=void 0;class ws extends Dn{constructor(e,t,n){super(e,t,n)}}ws.prototype.ValueTypeName="string";ws.prototype.ValueBufferType=Array;ws.prototype.DefaultInterpolation=Yr;ws.prototype.InterpolantFactoryMethodLinear=void 0;ws.prototype.InterpolantFactoryMethodSmooth=void 0;class ra extends Dn{constructor(e,t,n,i){super(e,t,n,i)}}ra.prototype.ValueTypeName="vector";class aa{constructor(e="",t=-1,n=[],i=yl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=En(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(j_(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(Dn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const u=Sp(l);l=au(l,1,u),c=au(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new sa(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],u=c.name.match(s);if(u&&u.length>1){const d=u[1];let h=i[d];h||(i[d]=h=[]),h.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(we("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return ze("AnimationClip: No animation in JSONLoader data."),null;const n=function(d,h,f,p,v){if(f.length!==0){const g=[],m=[];Ju(f,g,m,p),g.length!==0&&v.push(new d(h,g,m))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const h=c[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const f={};let p;for(p=0;p<h.length;p++)if(h[p].morphTargets)for(let v=0;v<h[p].morphTargets.length;v++)f[h[p].morphTargets[v]]=-1;for(const v in f){const g=[],m=[];for(let x=0;x!==h[p].morphTargets.length;++x){const _=h[p];g.push(_.time),m.push(_.morphTarget===v?1:0)}i.push(new sa(".morphTargetInfluence["+v+"]",g,m))}l=f.length*a}else{const f=".bones["+t[d].name+"]";n(ra,f+".position",h,"pos",i),n(ma,f+".quaternion",h,"rot",i),n(ra,f+".scale",h,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function K_(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return sa;case"vector":case"vector2":case"vector3":case"vector4":return ra;case"color":return ju;case"quaternion":return ma;case"bool":case"boolean":return Ss;case"string":return ws}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function j_(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=K_(r.type);if(r.times===void 0){const t=[],n=[];Ju(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const si={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(hd(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!hd(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function hd(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Qu{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&i.onStart!==void 0&&i.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){const f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Cp=new Qu;class vn{constructor(e){this.manager=e!==void 0?e:Cp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}vn.DEFAULT_MATERIAL_NAME="__DEFAULT";const gi={};class Q_ extends Error{constructor(e,t){super(e),this.response=t}}class bi extends vn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=si.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(gi[e]!==void 0){gi[e].push({onLoad:t,onProgress:n,onError:i});return}gi[e]=[],gi[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&we("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=gi[e],d=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=h?parseInt(h):0,p=f!==0;let v=0;const g=new ReadableStream({start(m){x();function x(){d.read().then(({done:_,value:y})=>{if(_)m.close();else{v+=y.byteLength;const E=new ProgressEvent("progress",{lengthComputable:p,loaded:v,total:f});for(let S=0,C=u.length;S<C;S++){const M=u[S];M.onProgress&&M.onProgress(E)}m.enqueue(y),x()}},_=>{m.error(_)})}}});return new Response(g)}else throw new Q_(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{si.add(`file:${e}`,c);const u=gi[e];delete gi[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=gi[e];if(u===void 0)throw this.manager.itemError(e),c;delete gi[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class e0 extends vn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new bi(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):ze(l),s.manager.itemError(e)}},n,i)}parse(e){const t=[];for(let n=0;n<e.length;n++){const i=aa.parse(e[n]);t.push(i)}return t}}class t0 extends vn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=[],o=new Pl,l=new bi(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(s.withCredentials);let c=0;function u(d){l.load(e[d],function(h){const f=s.parse(h,!0);a[d]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(o.minFilter=Ct),o.image=a,o.format=f.format,o.needsUpdate=!0,t&&t(o))},n,i)}if(Array.isArray(e))for(let d=0,h=e.length;d<h;++d)u(d);else l.load(e,function(d){const h=s.parse(d,!0);if(h.isCubemap){const f=h.mipmaps.length/h.mipmapCount;for(let p=0;p<f;p++){a[p]={mipmaps:[]};for(let v=0;v<h.mipmapCount;v++)a[p].mipmaps.push(h.mipmaps[p*h.mipmapCount+v]),a[p].format=h.format,a[p].width=h.width,a[p].height=h.height}o.image=a}else o.image.width=h.width,o.image.height=h.height,o.mipmaps=h.mipmaps;h.mipmapCount===1&&(o.minFilter=Ct),o.format=h.format,o.needsUpdate=!0,t&&t(o)},n,i);return o}}const Gs=new WeakMap;class oa extends vn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=si.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let d=Gs.get(a);d===void 0&&(d=[],Gs.set(a,d)),d.push({onLoad:t,onError:i})}return a}const o=Qr("img");function l(){u(),t&&t(this);const d=Gs.get(this)||[];for(let h=0;h<d.length;h++){const f=d[h];f.onLoad&&f.onLoad(this)}Gs.delete(this),s.manager.itemEnd(e)}function c(d){u(),i&&i(d),si.remove(`image:${e}`);const h=Gs.get(this)||[];for(let f=0;f<h.length;f++){const p=h[f];p.onError&&p.onError(d)}Gs.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),si.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class n0 extends vn{constructor(e){super(e)}load(e,t,n,i){const s=new da;s.colorSpace=fn;const a=new oa(this.manager);a.setCrossOrigin(this.crossOrigin),a.setPath(this.path);let o=0;function l(c){a.load(e[c],function(u){s.images[c]=u,o++,o===6&&(s.needsUpdate=!0,t&&t(s))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return s}}class i0 extends vn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new Gn,o=new bi(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(e,function(l){let c;try{c=s.parse(l)}catch(u){i!==void 0?i(u):ze(u);return}c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:_n,a.wrapT=c.wrapT!==void 0?c.wrapT:_n,a.magFilter=c.magFilter!==void 0?c.magFilter:Ct,a.minFilter=c.minFilter!==void 0?c.minFilter:Ct,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(a.colorSpace=c.colorSpace),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=ii),c.mipmapCount===1&&(a.minFilter=Ct),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,t&&t(a,c)},n,i),a}}class s0 extends vn{constructor(e){super(e)}load(e,t,n,i){const s=new It,a=new oa(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class $i extends _t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Pe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Rp extends $i{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Rc=new tt,dd=new R,fd=new R;class eh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.mapType=pn,this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cr,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;dd.setFromMatrixPosition(e.matrixWorld),t.position.copy(dd),fd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(fd),t.updateMatrixWorld(),Rc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rc,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===xs||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Rc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Qa=new R,eo=new tn,Jn=new R;class Wl extends _t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=Sn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Qa,eo,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Qa,eo,Jn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Qa,eo,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Qa,eo,Jn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Di=new R,pd=new he,md=new he;class Xt extends Wl{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=nr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ps*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return nr*2*Math.atan(Math.tan(ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Di.x,Di.y).multiplyScalar(-e/Di.z),Di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Di.x,Di.y).multiplyScalar(-e/Di.z)}getViewSize(e,t){return this.getViewBounds(e,pd,md),t.subVectors(md,pd)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ps*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class r0 extends eh{constructor(){super(new Xt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=nr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Ip extends $i{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new r0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class a0 extends eh{constructor(){super(new Xt(90,1,.5,500)),this.isPointLightShadow=!0}}class Pp extends $i{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new a0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class ga extends Wl{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class o0 extends eh{constructor(){super(new ga(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Lp extends $i{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.shadow=new o0}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Dp extends $i{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Up extends $i{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class th{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new R)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,s=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.282095),t.addScaledVector(a[1],.488603*i),t.addScaledVector(a[2],.488603*s),t.addScaledVector(a[3],.488603*n),t.addScaledVector(a[4],1.092548*(n*i)),t.addScaledVector(a[5],1.092548*(i*s)),t.addScaledVector(a[6],.315392*(3*s*s-1)),t.addScaledVector(a[7],1.092548*(n*s)),t.addScaledVector(a[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,s=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.886227),t.addScaledVector(a[1],2*.511664*i),t.addScaledVector(a[2],2*.511664*s),t.addScaledVector(a[3],2*.511664*n),t.addScaledVector(a[4],2*.429043*n*i),t.addScaledVector(a[5],2*.429043*i*s),t.addScaledVector(a[6],.743125*s*s-.247708),t.addScaledVector(a[7],2*.429043*n*s),t.addScaledVector(a[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,s=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*s,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*s,t[6]=.315392*(3*s*s-1),t[7]=1.092548*n*s,t[8]=.546274*(n*n-i*i)}}class Np extends $i{constructor(e=new th,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class Xl extends vn{constructor(e){super(e),this.textures={}}load(e,t,n,i){const s=this,a=new bi(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):ze(l),s.manager.itemError(e)}},n,i)}parse(e){const t=this.textures;function n(s){return t[s]===void 0&&we("MaterialLoader: Undefined texture",s),t[s]}const i=this.createMaterialFromType(e.type);if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=e.sheen),e.sheenColor!==void 0&&(i.sheenColor=new Pe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(i.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.specularIntensity!==void 0&&(i.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(i.dispersion=e.dispersion),e.iridescence!==void 0&&(i.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(i.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.attenuationDistance!==void 0&&(i.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(i.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.shadowSide!==void 0&&(i.shadowSide=e.shadowSide),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(i.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(i.depthFunc=e.depthFunc),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(i.blendSrc=e.blendSrc),e.blendDst!==void 0&&(i.blendDst=e.blendDst),e.blendEquation!==void 0&&(i.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(i.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(i.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==void 0&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(i.dithering=e.dithering),e.alphaToCoverage!==void 0&&(i.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(i.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(i.allowOverride=e.allowOverride),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const s in e.uniforms){const a=e.uniforms[s];switch(i.uniforms[s]={},a.type){case"t":i.uniforms[s].value=n(a.value);break;case"c":i.uniforms[s].value=new Pe().setHex(a.value);break;case"v2":i.uniforms[s].value=new he().fromArray(a.value);break;case"v3":i.uniforms[s].value=new R().fromArray(a.value);break;case"v4":i.uniforms[s].value=new pt().fromArray(a.value);break;case"m3":i.uniforms[s].value=new nt().fromArray(a.value);break;case"m4":i.uniforms[s].value=new tt().fromArray(a.value);break;default:i.uniforms[s].value=a.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(i.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)i.extensions[s]=e.extensions[s];if(e.lights!==void 0&&(i.lights=e.lights),e.clipping!==void 0&&(i.clipping=e.clipping),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),i.normalScale=new he().fromArray(s)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(i.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapRotation!==void 0&&i.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new he().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(i.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(i.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(i.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(i.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(e.sheenRoughnessMap)),i}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return Xl.createMaterialFromType(e)}static createMaterialFromType(e){const t={ShadowMaterial:pp,SpriteMaterial:Nu,RawShaderMaterial:qu,ShaderMaterial:Tn,PointsMaterial:Ou,MeshPhysicalMaterial:gp,MeshStandardMaterial:$u,MeshPhongMaterial:_p,MeshToonMaterial:vp,MeshNormalMaterial:xp,MeshLambertMaterial:yp,MeshDepthMaterial:Yu,MeshDistanceMaterial:Zu,MeshBasicMaterial:Jt,MeshMatcapMaterial:Mp,LineDashedMaterial:bp,LineBasicMaterial:un,Material:qt};return new t[e]}}class ou{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class nh extends it{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class Fp extends vn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new bi(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):ze(l),s.manager.itemError(e)}},n,i)}parse(e){const t={},n={};function i(f,p){if(t[p]!==void 0)return t[p];const g=f.interleavedBuffers[p],m=s(f,g.buffer),x=Ks(g.type,m),_=new Cl(x,g.stride);return _.uuid=g.uuid,t[p]=_,_}function s(f,p){if(n[p]!==void 0)return n[p];const g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}const a=e.isInstancedBufferGeometry?new nh:new it,o=e.data.index;if(o!==void 0){const f=Ks(o.type,o.array);a.setIndex(new bt(f,1))}const l=e.data.attributes;for(const f in l){const p=l[f];let v;if(p.isInterleavedBufferAttribute){const g=i(e.data,p.data);v=new wn(g,p.itemSize,p.offset,p.normalized)}else{const g=Ks(p.type,p.array),m=p.isInstancedBufferAttribute?ir:bt;v=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(v.name=p.name),p.usage!==void 0&&v.setUsage(p.usage),a.setAttribute(f,v)}const c=e.data.morphAttributes;if(c)for(const f in c){const p=c[f],v=[];for(let g=0,m=p.length;g<m;g++){const x=p[g];let _;if(x.isInterleavedBufferAttribute){const y=i(e.data,x.data);_=new wn(y,x.itemSize,x.offset,x.normalized)}else{const y=Ks(x.type,x.array);_=new bt(y,x.itemSize,x.normalized)}x.name!==void 0&&(_.name=x.name),v.push(_)}a.morphAttributes[f]=v}e.data.morphTargetsRelative&&(a.morphTargetsRelative=!0);const d=e.data.groups||e.data.drawcalls||e.data.offsets;if(d!==void 0)for(let f=0,p=d.length;f!==p;++f){const v=d[f];a.addGroup(v.start,v.count,v.materialIndex)}const h=e.data.boundingSphere;return h!==void 0&&(a.boundingSphere=new Vt().fromJSON(h)),e.name&&(a.name=e.name),e.userData&&(a.userData=e.userData),a}}const Ic={};class l0 extends vn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=this.path===""?ou.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||a;const o=new bi(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(d){i!==void 0&&i(d),ze("ObjectLoader: Can't parse "+e+".",d.message);return}const u=c.metadata;if(u===void 0||u.type===void 0||u.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),ze("ObjectLoader: Can't load "+e);return}s.parse(c,t)},n,i)}async loadAsync(e,t){const n=this,i=this.path===""?ou.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;const s=new bi(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const a=await s.loadAsync(e,t);let o;try{o=JSON.parse(a)}catch(c){throw new Error("ObjectLoader: Can't parse "+e+". "+c.message)}const l=o.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(o)}parse(e,t){const n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),s=this.parseGeometries(e.geometries,i),a=this.parseImages(e.images,function(){t!==void 0&&t(c)}),o=this.parseTextures(e.textures,a),l=this.parseMaterials(e.materials,o),c=this.parseObject(e.object,s,l,o,n),u=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,u),this.bindLightTargets(c),t!==void 0){let d=!1;for(const h in a)if(a[h].data instanceof HTMLImageElement){d=!0;break}d===!1&&t(c)}return c}async parseAsync(e){const t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),s=await this.parseImagesAsync(e.images),a=this.parseTextures(e.textures,s),o=this.parseMaterials(e.materials,a),l=this.parseObject(e.object,i,o,a,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}static registerGeometry(e,t){Ic[e]=t}parseShapes(e){const t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){const s=new ms().fromJSON(e[n]);t[s.uuid]=s}return t}parseSkeletons(e,t){const n={},i={};if(t.traverse(function(s){s.isBone&&(i[s.uuid]=s)}),e!==void 0)for(let s=0,a=e.length;s<a;s++){const o=new Rl().fromJSON(e[s],i);n[o.uuid]=o}return n}parseGeometries(e,t){const n={};if(e!==void 0){const i=new Fp;for(let s=0,a=e.length;s<a;s++){let o;const l=e[s];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":o=i.parse(l);break;default:l.type in cd?o=cd[l.type].fromJSON(l,t):l.type in Ic?o=Ic[l.type].fromJSON(l,t):we(`ObjectLoader: Unknown geometry type "${l.type}". Use .registerGeometry() before starting the deserialization process.`)}o.uuid=l.uuid,l.name!==void 0&&(o.name=l.name),l.userData!==void 0&&(o.userData=l.userData),n[l.uuid]=o}}return n}parseMaterials(e,t){const n={},i={};if(e!==void 0){const s=new Xl;s.setTextures(t);for(let a=0,o=e.length;a<o;a++){const l=e[a];n[l.uuid]===void 0&&(n[l.uuid]=s.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){const t={};if(e!==void 0)for(let n=0;n<e.length;n++){const i=e[n],s=aa.parse(i);t[s.uuid]=s}return t}parseImages(e,t){const n=this,i={};let s;function a(l){return n.manager.itemStart(l),s.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function o(l){if(typeof l=="string"){const c=l,u=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return a(u)}else return l.data?{data:Ks(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){const l=new Qu(t);s=new oa(l),s.setCrossOrigin(this.crossOrigin);for(let c=0,u=e.length;c<u;c++){const d=e[c],h=d.url;if(Array.isArray(h)){const f=[];for(let p=0,v=h.length;p<v;p++){const g=h[p],m=o(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new Gn(m.data,m.width,m.height)))}i[d.uuid]=new Bi(f)}else{const f=o(d.url);i[d.uuid]=new Bi(f)}}}return i}async parseImagesAsync(e){const t=this,n={};let i;async function s(a){if(typeof a=="string"){const o=a,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(o)?o:t.resourcePath+o;return await i.loadAsync(l)}else return a.data?{data:Ks(a.type,a.data),width:a.width,height:a.height}:null}if(e!==void 0&&e.length>0){i=new oa(this.manager),i.setCrossOrigin(this.crossOrigin);for(let a=0,o=e.length;a<o;a++){const l=e[a],c=l.url;if(Array.isArray(c)){const u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d],p=await s(f);p!==null&&(p instanceof HTMLImageElement?u.push(p):u.push(new Gn(p.data,p.width,p.height)))}n[l.uuid]=new Bi(u)}else{const u=await s(l.url);n[l.uuid]=new Bi(u)}}}return n}parseTextures(e,t){function n(s,a){return typeof s=="number"?s:(we("ObjectLoader.parseTexture: Constant should be in numeric form.",s),a[s])}const i={};if(e!==void 0)for(let s=0,a=e.length;s<a;s++){const o=e[s];o.image===void 0&&we('ObjectLoader: No "image" specified for',o.uuid),t[o.image]===void 0&&we("ObjectLoader: Undefined image",o.image);const l=t[o.image],c=l.data;let u;Array.isArray(c)?(u=new da,c.length===6&&(u.needsUpdate=!0)):(c&&c.data?u=new Gn:u=new It,c&&(u.needsUpdate=!0)),u.source=l,u.uuid=o.uuid,o.name!==void 0&&(u.name=o.name),o.mapping!==void 0&&(u.mapping=n(o.mapping,c0)),o.channel!==void 0&&(u.channel=o.channel),o.offset!==void 0&&u.offset.fromArray(o.offset),o.repeat!==void 0&&u.repeat.fromArray(o.repeat),o.center!==void 0&&u.center.fromArray(o.center),o.rotation!==void 0&&(u.rotation=o.rotation),o.wrap!==void 0&&(u.wrapS=n(o.wrap[0],gd),u.wrapT=n(o.wrap[1],gd)),o.format!==void 0&&(u.format=o.format),o.internalFormat!==void 0&&(u.internalFormat=o.internalFormat),o.type!==void 0&&(u.type=o.type),o.colorSpace!==void 0&&(u.colorSpace=o.colorSpace),o.minFilter!==void 0&&(u.minFilter=n(o.minFilter,_d)),o.magFilter!==void 0&&(u.magFilter=n(o.magFilter,_d)),o.anisotropy!==void 0&&(u.anisotropy=o.anisotropy),o.flipY!==void 0&&(u.flipY=o.flipY),o.generateMipmaps!==void 0&&(u.generateMipmaps=o.generateMipmaps),o.premultiplyAlpha!==void 0&&(u.premultiplyAlpha=o.premultiplyAlpha),o.unpackAlignment!==void 0&&(u.unpackAlignment=o.unpackAlignment),o.compareFunction!==void 0&&(u.compareFunction=o.compareFunction),o.normalized!==void 0&&(u.normalized=o.normalized),o.userData!==void 0&&(u.userData=o.userData),i[o.uuid]=u}return i}parseObject(e,t,n,i,s){let a;function o(h){return t[h]===void 0&&we("ObjectLoader: Undefined geometry",h),t[h]}function l(h){if(h!==void 0){if(Array.isArray(h)){const f=[];for(let p=0,v=h.length;p<v;p++){const g=h[p];n[g]===void 0&&we("ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[h]===void 0&&we("ObjectLoader: Undefined material",h),n[h]}}function c(h){return i[h]===void 0&&we("ObjectLoader: Undefined texture",h),i[h]}let u,d;switch(e.type){case"Scene":a=new Lu,e.background!==void 0&&(Number.isInteger(e.background)?a.background=new Pe(e.background):a.background=c(e.background)),e.environment!==void 0&&(a.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?a.fog=new Tl(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(a.fog=new Al(e.fog.color,e.fog.density)),e.fog.name!==""&&(a.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(a.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(a.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&a.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(a.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&a.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":a=new Xt(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(a.focus=e.focus),e.zoom!==void 0&&(a.zoom=e.zoom),e.filmGauge!==void 0&&(a.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(a.filmOffset=e.filmOffset),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"OrthographicCamera":a=new ga(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(a.zoom=e.zoom),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"AmbientLight":a=new Dp(e.color,e.intensity);break;case"DirectionalLight":a=new Lp(e.color,e.intensity),a.target=e.target||"";break;case"PointLight":a=new Pp(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":a=new Up(e.color,e.intensity,e.width,e.height);break;case"SpotLight":a=new Ip(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),a.target=e.target||"";break;case"HemisphereLight":a=new Rp(e.color,e.groundColor,e.intensity);break;case"LightProbe":const h=new th().fromArray(e.sh);a=new Np(h,e.intensity);break;case"SkinnedMesh":u=o(e.geometry),d=l(e.material),a=new Kf(u,d),e.bindMode!==void 0&&(a.bindMode=e.bindMode),e.bindMatrix!==void 0&&a.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(a.skeleton=e.skeleton);break;case"Mesh":u=o(e.geometry),d=l(e.material),a=new Mt(u,d);break;case"InstancedMesh":u=o(e.geometry),d=l(e.material);const f=e.count,p=e.instanceMatrix,v=e.instanceColor;a=new jf(u,d,f),a.instanceMatrix=new ir(new Float32Array(p.array),16),v!==void 0&&(a.instanceColor=new ir(new Float32Array(v.array),v.itemSize));break;case"BatchedMesh":u=o(e.geometry),d=l(e.material),a=new Qf(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,d),a.geometry=u,a.perObjectFrustumCulled=e.perObjectFrustumCulled,a.sortObjects=e.sortObjects,a._drawRanges=e.drawRanges,a._reservedRanges=e.reservedRanges,a._geometryInfo=e.geometryInfo.map(g=>{let m=null,x=null;return g.boundingBox!==void 0&&(m=new zt().fromJSON(g.boundingBox)),g.boundingSphere!==void 0&&(x=new Vt().fromJSON(g.boundingSphere)),{...g,boundingBox:m,boundingSphere:x}}),a._instanceInfo=e.instanceInfo,a._availableInstanceIds=e._availableInstanceIds,a._availableGeometryIds=e._availableGeometryIds,a._nextIndexStart=e.nextIndexStart,a._nextVertexStart=e.nextVertexStart,a._geometryCount=e.geometryCount,a._maxInstanceCount=e.maxInstanceCount,a._maxVertexCount=e.maxVertexCount,a._maxIndexCount=e.maxIndexCount,a._geometryInitialized=e.geometryInitialized,a._matricesTexture=c(e.matricesTexture.uuid),a._indirectTexture=c(e.indirectTexture.uuid),e.colorsTexture!==void 0&&(a._colorsTexture=c(e.colorsTexture.uuid)),e.boundingSphere!==void 0&&(a.boundingSphere=new Vt().fromJSON(e.boundingSphere)),e.boundingBox!==void 0&&(a.boundingBox=new zt().fromJSON(e.boundingBox));break;case"LOD":a=new Jf;break;case"Line":a=new Wi(o(e.geometry),l(e.material));break;case"LineLoop":a=new ep(o(e.geometry),l(e.material));break;case"LineSegments":a=new ci(o(e.geometry),l(e.material));break;case"PointCloud":case"Points":a=new tp(o(e.geometry),l(e.material));break;case"Sprite":a=new Zf(l(e.material));break;case"Group":a=new js;break;case"Bone":a=new Fu;break;default:a=new _t}if(a.uuid=e.uuid,e.name!==void 0&&(a.name=e.name),e.matrix!==void 0?(a.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(a.matrixAutoUpdate=e.matrixAutoUpdate),a.matrixAutoUpdate&&a.matrix.decompose(a.position,a.quaternion,a.scale)):(e.position!==void 0&&a.position.fromArray(e.position),e.rotation!==void 0&&a.rotation.fromArray(e.rotation),e.quaternion!==void 0&&a.quaternion.fromArray(e.quaternion),e.scale!==void 0&&a.scale.fromArray(e.scale)),e.up!==void 0&&a.up.fromArray(e.up),e.pivot!==void 0&&(a.pivot=new R().fromArray(e.pivot)),e.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),e.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=e.morphTargetInfluences.slice()),e.castShadow!==void 0&&(a.castShadow=e.castShadow),e.receiveShadow!==void 0&&(a.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(a.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(a.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(a.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(a.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&a.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(a.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(a.visible=e.visible),e.frustumCulled!==void 0&&(a.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(a.renderOrder=e.renderOrder),e.static!==void 0&&(a.static=e.static),e.userData!==void 0&&(a.userData=e.userData),e.layers!==void 0&&(a.layers.mask=e.layers),e.children!==void 0){const h=e.children;for(let f=0;f<h.length;f++)a.add(this.parseObject(h[f],t,n,i,s))}if(e.animations!==void 0){const h=e.animations;for(let f=0;f<h.length;f++){const p=h[f];a.animations.push(s[p])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(a.autoUpdate=e.autoUpdate);const h=e.levels;for(let f=0;f<h.length;f++){const p=h[f],v=a.getObjectByProperty("uuid",p.object);v!==void 0&&a.addLevel(v,p.distance,p.hysteresis)}}return a}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=t[n.skeleton];i===void 0?we("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){const n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new _t}})}}const c0={UVMapping:fl,CubeReflectionMapping:ai,CubeRefractionMapping:Vi,EquirectangularReflectionMapping:Ur,EquirectangularRefractionMapping:Nr,CubeUVReflectionMapping:or},gd={RepeatWrapping:Wr,ClampToEdgeWrapping:_n,MirroredRepeatWrapping:Xr},_d={NearestFilter:Ot,NearestMipmapNearestFilter:bu,NearestMipmapLinearFilter:Js,LinearFilter:Ct,LinearMipmapNearestFilter:Fr,LinearMipmapLinearFilter:ii},Pc=new WeakMap;class u0 extends vn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&we("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&we("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=si.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{Pc.has(a)===!0?(i&&i(Pc.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(c),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){si.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e)}).catch(function(c){i&&i(c),Pc.set(l,c),si.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});si.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}let to;class ih{static getContext(){return to===void 0&&(to=new(window.AudioContext||window.webkitAudioContext)),to}static setContext(e){to=e}}class h0 extends vn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new bi(this.manager);a.setResponseType("arraybuffer"),a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){try{const c=l.slice(0),u=ih.getContext(),d=e+"#decode";s.manager.itemStart(d),u.decodeAudioData(c,function(h){t(h),s.manager.itemEnd(d)}).catch(function(h){o(h),s.manager.itemEnd(d)})}catch(c){o(c)}},n,i);function o(l){i?i(l):ze(l),s.manager.itemError(e)}}}const vd=new tt,xd=new tt,ts=new tt;class d0{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Xt,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Xt,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,ts.copy(e.projectionMatrix);const i=t.eyeSep/2,s=i*t.near/t.focus,a=t.near*Math.tan(ps*t.fov*.5)/t.zoom;let o,l;xd.elements[12]=-i,vd.elements[12]=i,o=-a*t.aspect+s,l=a*t.aspect+s,ts.elements[0]=2*t.near/(l-o),ts.elements[8]=(l+o)/(l-o),this.cameraL.projectionMatrix.copy(ts),o=-a*t.aspect-s,l=a*t.aspect-s,ts.elements[0]=2*t.near/(l-o),ts.elements[8]=(l+o)/(l-o),this.cameraR.projectionMatrix.copy(ts)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(xd),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(vd)}}const Hs=-90,Ws=1;class Op extends _t{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Xt(Hs,Ws,e,t);i.layers=this.layers,this.add(i);const s=new Xt(Hs,Ws,e,t);s.layers=this.layers,this.add(s);const a=new Xt(Hs,Ws,e,t);a.layers=this.layers,this.add(a);const o=new Xt(Hs,Ws,e,t);o.layers=this.layers,this.add(o);const l=new Xt(Hs,Ws,e,t);l.layers=this.layers,this.add(l);const c=new Xt(Hs,Ws,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Sn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===xs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Bp extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class kp{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=f0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function f0(){this._document.hidden===!1&&this.reset()}const ns=new R,Lc=new tn,p0=new R,is=new R,ss=new R;class m0 extends _t{constructor(){super(),this.type="AudioListener",this.context=ih.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new kp}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e),this._timer.update();const t=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(ns,Lc,p0),is.set(0,0,-1).applyQuaternion(Lc),ss.set(0,1,0).applyQuaternion(Lc),t.positionX){const n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(ns.x,n),t.positionY.linearRampToValueAtTime(ns.y,n),t.positionZ.linearRampToValueAtTime(ns.z,n),t.forwardX.linearRampToValueAtTime(is.x,n),t.forwardY.linearRampToValueAtTime(is.y,n),t.forwardZ.linearRampToValueAtTime(is.z,n),t.upX.linearRampToValueAtTime(ss.x,n),t.upY.linearRampToValueAtTime(ss.y,n),t.upZ.linearRampToValueAtTime(ss.z,n)}else t.setPosition(ns.x,ns.y,ns.z),t.setOrientation(is.x,is.y,is.z,ss.x,ss.y,ss.z)}}class zp extends _t{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){we("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){we("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){we("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){we("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){we("Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(we("Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){we("Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}copy(e,t){return super.copy(e,t),e.sourceType!=="buffer"?(we("Audio: Audio source type cannot be copied."),this):(this.autoplay=e.autoplay,this.buffer=e.buffer,this.detune=e.detune,this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.offset=e.offset,this.duration=e.duration,this.playbackRate=e.playbackRate,this.hasPlaybackControl=e.hasPlaybackControl,this.sourceType=e.sourceType,this.filters=e.filters.slice(),this)}clone(e){return new this.constructor(this.listener).copy(this,e)}}const rs=new R,yd=new tn,g0=new R,as=new R;class _0 extends zp{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(rs,yd,g0),as.set(0,0,1).applyQuaternion(yd);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(rs.x,n),t.positionY.linearRampToValueAtTime(rs.y,n),t.positionZ.linearRampToValueAtTime(rs.z,n),t.orientationX.linearRampToValueAtTime(as.x,n),t.orientationY.linearRampToValueAtTime(as.y,n),t.orientationZ.linearRampToValueAtTime(as.z,n)}else t.setPosition(rs.x,rs.y,rs.z),t.setOrientation(as.x,as.y,as.z)}}class v0{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}}class Vp{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,a;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,a=i;s!==a;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){tn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const a=this._workIndex*s;tn.multiplyQuaternionsFlat(e,a,e,t,e,n),tn.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,s){const a=1-i;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,s){for(let a=0;a!==s;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const sh="\\[\\]\\.:\\/",x0=new RegExp("["+sh+"]","g"),rh="[^"+sh+"]",y0="[^"+sh.replace("\\.","")+"]",M0=/((?:WC+[\/:])*)/.source.replace("WC",rh),b0=/(WCOD+)?/.source.replace("WCOD",y0),S0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",rh),w0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",rh),E0=new RegExp("^"+M0+b0+S0+w0+"$"),A0=["material","materials","bones","map"];class T0{constructor(e,t,n){const i=n||gt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class gt{constructor(e,t,n){this.path=t,this.parsedPath=n||gt.parseTrackName(t),this.node=gt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new gt.Composite(e,t,n):new gt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(x0,"")}static parseTrackName(e){const t=E0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);A0.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=gt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){we("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){ze("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){ze("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){ze("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){ze("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){ze("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;ze("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}gt.Composite=T0;gt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};gt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};gt.prototype.GetterByBindingType=[gt.prototype._getValue_direct,gt.prototype._getValue_array,gt.prototype._getValue_arrayElement,gt.prototype._getValue_toArray];gt.prototype.SetterByBindingTypeAndVersioning=[[gt.prototype._setValue_direct,gt.prototype._setValue_direct_setNeedsUpdate,gt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_array,gt.prototype._setValue_array_setNeedsUpdate,gt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_arrayElement,gt.prototype._setValue_arrayElement_setNeedsUpdate,gt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_fromArray,gt.prototype._setValue_fromArray_setNeedsUpdate,gt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class C0{constructor(){this.isAnimationObjectGroup=!0,this.uuid=En(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,a=s.length;let o,l=e.length,c=this.nCachedObjects_;for(let u=0,d=arguments.length;u!==d;++u){const h=arguments[u],f=h.uuid;let p=t[f];if(p===void 0){p=l++,t[f]=p,e.push(h);for(let v=0,g=a;v!==g;++v)s[v].push(new gt(h,n[v],i[v]))}else if(p<c){o=e[p];const v=--c,g=e[v];t[g.uuid]=p,e[p]=g,t[f]=v,e[v]=h;for(let m=0,x=a;m!==x;++m){const _=s[m],y=_[v];let E=_[p];_[p]=y,E===void 0&&(E=new gt(h,n[m],i[m])),_[v]=E}}else e[p]!==o&&ze("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_;for(let a=0,o=arguments.length;a!==o;++a){const l=arguments[a],c=l.uuid,u=t[c];if(u!==void 0&&u>=s){const d=s++,h=e[d];t[h.uuid]=u,e[u]=h,t[c]=d,e[d]=l;for(let f=0,p=i;f!==p;++f){const v=n[f],g=v[d],m=v[u];v[u]=g,v[d]=m}}}this.nCachedObjects_=s}uncache(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_,a=e.length;for(let o=0,l=arguments.length;o!==l;++o){const c=arguments[o],u=c.uuid,d=t[u];if(d!==void 0)if(delete t[u],d<s){const h=--s,f=e[h],p=--a,v=e[p];t[f.uuid]=d,e[d]=f,t[v.uuid]=h,e[h]=v,e.pop();for(let g=0,m=i;g!==m;++g){const x=n[g],_=x[h],y=x[p];x[d]=_,x[h]=y,x.pop()}}else{const h=--a,f=e[h];h>0&&(t[f.uuid]=d),e[d]=f,e.pop();for(let p=0,v=i;p!==v;++p){const g=n[p];g[d]=g[h],g.pop()}}}this.nCachedObjects_=s}subscribe_(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const s=this._bindings;if(i!==void 0)return s[i];const a=this._paths,o=this._parsedPaths,l=this._objects,c=l.length,u=this.nCachedObjects_,d=new Array(c);i=s.length,n[e]=i,a.push(e),o.push(t),s.push(d);for(let h=u,f=l.length;h!==f;++h){const p=l[h];d[h]=new gt(p,e,t)}return d}unsubscribe_(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,s=this._parsedPaths,a=this._bindings,o=a.length-1,l=a[o],c=e[o];t[c]=n,a[n]=l,a.pop(),s[n]=s[o],s.pop(),i[n]=i[o],i.pop()}}}class Gp{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,a=s.length,o=new Array(a),l={endingStart:cs,endingEnd:cs};for(let c=0;c!==a;++c){const u=s[c].createInterpolant(null);o[c]=u,u.settings&&Object.assign(l,u.settings),u.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Df,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,s=e._clip.duration,a=s/i,o=i/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Ru:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(a),c[u].accumulateAdditive(o);break;case yl:default:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(a),c[u].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const a=n===Uf;if(e===0)return s===-1?i:a&&(s&1)===1?t-i:i;if(n===Lf){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=s,this.time=i;if(a&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=us,i.endingEnd=us):(e?i.endingStart=this.zeroSlopeAtStart?us:cs:i.endingStart=Zr,t?i.endingEnd=this.zeroSlopeAtEnd?us:cs:i.endingEnd=Zr)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}}const R0=new Float32Array(1);class I0 extends Wn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let u=c[l];u===void 0&&(u={},c[l]=u);for(let d=0;d!==s;++d){const h=i[d],f=h.name;let p=u[f];if(p!==void 0)++p.referenceCount,a[d]=p;else{if(p=a[d],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}const v=t&&t._propertyBindings[d].binding.parsedPath;p=new Vp(gt.create(n,f,v),h.ValueTypeName,h.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),a[d]=p}o[d].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;const d=o.actionByRoot,h=(e._localRoot||this._root).uuid;delete d[h],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Ku(new Float32Array(2),new Float32Array(2),1,R0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let a=typeof e=="string"?aa.findByName(i,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=yl),l!==void 0){const d=l.actionByRoot[s];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const u=new Gp(this,a,t,n);return this._bindAction(u,c),this._addInactiveAction(u,o,s),u}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?aa.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const u=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=u,t[u]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class P0 extends Pu{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isRenderTarget3D=!0,this.depth=n,this.texture=new wl(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class ah{constructor(e){this.value=e}clone(){return new ah(this.value.clone===void 0?this.value:this.value.clone())}}let L0=0;class D0 extends Wn{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:L0++}),this.name="",this.usage=jr,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){const s=Array.isArray(t[n])?t[n]:[t[n]];for(let a=0;a<s.length;a++)this.uniforms.push(s[a].clone())}return this}clone(){return new this.constructor().copy(this)}}class ul extends Cl{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class U0{constructor(e,t,n,i,s,a=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=s,this.normalized=a,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}const Md=new tt;class N0{constructor(e,t,n=0,i=1/0){this.ray=new lr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new El,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):ze("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Md.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Md),this}intersectObject(e,t=!0,n=[]){return lu(e,this,n,t),n.sort(bd),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)lu(e[i],this,n,t);return n.sort(bd),n}}function bd(r,e){return r.distance-e.distance}function lu(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let a=0,o=s.length;a<o;a++)lu(s[a],e,t,!0)}}class F0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,we("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class O0{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ke(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ke(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class B0{constructor(e=1,t=0,n=0){this.radius=e,this.theta=t,this.y=n}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}}const fh=class fh{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};fh.prototype.isMatrix2=!0;let cu=fh;const Sd=new he;class k0{constructor(e=new he(1/0,1/0),t=new he(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Sd.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sd).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const wd=new R,no=new R,Xs=new R,qs=new R,Dc=new R,z0=new R,V0=new R;class Hp{constructor(e=new R,t=new R){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){wd.subVectors(e,this.start),no.subVectors(this.end,this.start);const n=no.dot(no);if(n===0)return 0;let s=no.dot(wd)/n;return t&&(s=Ke(s,0,1)),s}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=z0,n=V0){const i=10000000000000001e-32;let s,a;const o=this.start,l=e.start,c=this.end,u=e.end;Xs.subVectors(c,o),qs.subVectors(u,l),Dc.subVectors(o,l);const d=Xs.dot(Xs),h=qs.dot(qs),f=qs.dot(Dc);if(d<=i&&h<=i)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(d<=i)s=0,a=f/h,a=Ke(a,0,1);else{const p=Xs.dot(Dc);if(h<=i)a=0,s=Ke(-p/d,0,1);else{const v=Xs.dot(qs),g=d*h-v*v;g!==0?s=Ke((v*f-p*h)/g,0,1):s=0,a=(v*s+f)/h,a<0?(a=0,s=Ke(-p/d,0,1)):a>1&&(a=1,s=Ke((v-p)/d,0,1))}}return t.copy(o).addScaledVector(Xs,s),n.copy(l).addScaledVector(qs,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const Ed=new R;class G0 extends _t{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new it,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let a=0,o=1,l=32;a<l;a++,o++){const c=a/l*Math.PI*2,u=o/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(u),Math.sin(u),1)}n.setAttribute("position",new Ue(i,3));const s=new un({fog:!1,toneMapped:!1});this.cone=new ci(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),Ed.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Ed),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const Ui=new R,io=new tt,Uc=new tt;class H0 extends ci{constructor(e){const t=Wp(e),n=new it,i=[],s=[];for(let c=0;c<t.length;c++){const u=t[c];u.parent&&u.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(0,0,0),s.push(0,0,0))}n.setAttribute("position",new Ue(i,3)),n.setAttribute("color",new Ue(s,3));const a=new un({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,a),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1;const o=new Pe(255),l=new Pe(65280);this.setColors(o,l)}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");Uc.copy(this.root.matrixWorld).invert();for(let s=0,a=0;s<t.length;s++){const o=t[s];o.parent&&o.parent.isBone&&(io.multiplyMatrices(Uc,o.matrixWorld),Ui.setFromMatrixPosition(io),i.setXYZ(a,Ui.x,Ui.y,Ui.z),io.multiplyMatrices(Uc,o.parent.matrixWorld),Ui.setFromMatrixPosition(io),i.setXYZ(a+1,Ui.x,Ui.y,Ui.z),a+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}setColors(e,t){const i=this.geometry.getAttribute("color");for(let s=0;s<i.count;s+=2)i.setXYZ(s,e.r,e.g,e.b),i.setXYZ(s+1,t.r,t.g,t.b);return i.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}function Wp(r){const e=[];r.isBone===!0&&e.push(r);for(let t=0;t<r.children.length;t++)e.push(...Wp(r.children[t]));return e}class W0 extends Mt{constructor(e,t,n){const i=new kn(t,4,2),s=new Jt({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const X0=new R,Ad=new Pe,Td=new Pe;class q0 extends _t{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new hr(t);i.rotateY(Math.PI*.5),this.material=new Jt({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const s=i.getAttribute("position"),a=new Float32Array(s.count*3);i.setAttribute("color",new bt(a,3)),this.add(new Mt(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");Ad.copy(this.light.color),Td.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){const s=n<i/2?Ad:Td;t.setXYZ(n,s.r,s.g,s.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(X0.setFromMatrixPosition(this.light.matrixWorld).negate())}}class $0 extends ci{constructor(e=10,t=10,n=4473924,i=8947848){n=new Pe(n),i=new Pe(i);const s=t/2,a=e/t,o=e/2,l=[],c=[];for(let h=0,f=0,p=-o;h<=t;h++,p+=a){l.push(-o,0,p,o,0,p),l.push(p,0,-o,p,0,o);const v=h===s?n:i;v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3}const u=new it;u.setAttribute("position",new Ue(l,3)),u.setAttribute("color",new Ue(c,3));const d=new un({vertexColors:!0,toneMapped:!1});super(u,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Y0 extends ci{constructor(e=10,t=16,n=8,i=64,s=4473924,a=8947848){s=new Pe(s),a=new Pe(a);const o=[],l=[];if(t>1)for(let d=0;d<t;d++){const h=d/t*(Math.PI*2),f=Math.sin(h)*e,p=Math.cos(h)*e;o.push(0,0,0),o.push(f,0,p);const v=d&1?s:a;l.push(v.r,v.g,v.b),l.push(v.r,v.g,v.b)}for(let d=0;d<n;d++){const h=d&1?s:a,f=e-e/n*d;for(let p=0;p<i;p++){let v=p/i*(Math.PI*2),g=Math.sin(v)*f,m=Math.cos(v)*f;o.push(g,0,m),l.push(h.r,h.g,h.b),v=(p+1)/i*(Math.PI*2),g=Math.sin(v)*f,m=Math.cos(v)*f,o.push(g,0,m),l.push(h.r,h.g,h.b)}}const c=new it;c.setAttribute("position",new Ue(o,3)),c.setAttribute("color",new Ue(l,3));const u=new un({vertexColors:!0,toneMapped:!1});super(c,u),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Cd=new R,so=new R,Rd=new R;class Z0 extends _t{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new it;i.setAttribute("position",new Ue([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const s=new un({fog:!1,toneMapped:!1});this.lightPlane=new Wi(i,s),this.add(this.lightPlane),i=new it,i.setAttribute("position",new Ue([0,0,0,0,0,1],3)),this.targetLine=new Wi(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Cd.setFromMatrixPosition(this.light.matrixWorld),so.setFromMatrixPosition(this.light.target.matrixWorld),Rd.subVectors(so,Cd),this.lightPlane.lookAt(so),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(so),this.targetLine.scale.z=Rd.length()}}const ro=new R,Lt=new Wl;class J0 extends ci{constructor(e){const t=new it,n=new un({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(p,v){l(p),l(v)}function l(p){i.push(0,0,0),s.push(0,0,0),a[p]===void 0&&(a[p]=[]),a[p].push(i.length/3-1)}t.setAttribute("position",new Ue(i,3)),t.setAttribute("color",new Ue(s,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();const c=new Pe(16755200),u=new Pe(16711680),d=new Pe(43775),h=new Pe(16777215),f=new Pe(3355443);this.setColors(c,u,d,h,f)}setColors(e,t,n,i,s){const o=this.geometry.getAttribute("color");return o.setXYZ(0,e.r,e.g,e.b),o.setXYZ(1,e.r,e.g,e.b),o.setXYZ(2,e.r,e.g,e.b),o.setXYZ(3,e.r,e.g,e.b),o.setXYZ(4,e.r,e.g,e.b),o.setXYZ(5,e.r,e.g,e.b),o.setXYZ(6,e.r,e.g,e.b),o.setXYZ(7,e.r,e.g,e.b),o.setXYZ(8,e.r,e.g,e.b),o.setXYZ(9,e.r,e.g,e.b),o.setXYZ(10,e.r,e.g,e.b),o.setXYZ(11,e.r,e.g,e.b),o.setXYZ(12,e.r,e.g,e.b),o.setXYZ(13,e.r,e.g,e.b),o.setXYZ(14,e.r,e.g,e.b),o.setXYZ(15,e.r,e.g,e.b),o.setXYZ(16,e.r,e.g,e.b),o.setXYZ(17,e.r,e.g,e.b),o.setXYZ(18,e.r,e.g,e.b),o.setXYZ(19,e.r,e.g,e.b),o.setXYZ(20,e.r,e.g,e.b),o.setXYZ(21,e.r,e.g,e.b),o.setXYZ(22,e.r,e.g,e.b),o.setXYZ(23,e.r,e.g,e.b),o.setXYZ(24,t.r,t.g,t.b),o.setXYZ(25,t.r,t.g,t.b),o.setXYZ(26,t.r,t.g,t.b),o.setXYZ(27,t.r,t.g,t.b),o.setXYZ(28,t.r,t.g,t.b),o.setXYZ(29,t.r,t.g,t.b),o.setXYZ(30,t.r,t.g,t.b),o.setXYZ(31,t.r,t.g,t.b),o.setXYZ(32,n.r,n.g,n.b),o.setXYZ(33,n.r,n.g,n.b),o.setXYZ(34,n.r,n.g,n.b),o.setXYZ(35,n.r,n.g,n.b),o.setXYZ(36,n.r,n.g,n.b),o.setXYZ(37,n.r,n.g,n.b),o.setXYZ(38,i.r,i.g,i.b),o.setXYZ(39,i.r,i.g,i.b),o.setXYZ(40,s.r,s.g,s.b),o.setXYZ(41,s.r,s.g,s.b),o.setXYZ(42,s.r,s.g,s.b),o.setXYZ(43,s.r,s.g,s.b),o.setXYZ(44,s.r,s.g,s.b),o.setXYZ(45,s.r,s.g,s.b),o.setXYZ(46,s.r,s.g,s.b),o.setXYZ(47,s.r,s.g,s.b),o.setXYZ(48,s.r,s.g,s.b),o.setXYZ(49,s.r,s.g,s.b),o.needsUpdate=!0,this}update(){const e=this.geometry,t=this.pointMap,n=1,i=1;let s,a;if(Lt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)s=1,a=0;else if(this.camera.coordinateSystem===Sn)s=-1,a=1;else if(this.camera.coordinateSystem===xs)s=0,a=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);Ft("c",t,e,Lt,0,0,s),Ft("t",t,e,Lt,0,0,a),Ft("n1",t,e,Lt,-n,-i,s),Ft("n2",t,e,Lt,n,-i,s),Ft("n3",t,e,Lt,-n,i,s),Ft("n4",t,e,Lt,n,i,s),Ft("f1",t,e,Lt,-n,-i,a),Ft("f2",t,e,Lt,n,-i,a),Ft("f3",t,e,Lt,-n,i,a),Ft("f4",t,e,Lt,n,i,a),Ft("u1",t,e,Lt,n*.7,i*1.1,s),Ft("u2",t,e,Lt,-n*.7,i*1.1,s),Ft("u3",t,e,Lt,0,i*2,s),Ft("cf1",t,e,Lt,-n,0,a),Ft("cf2",t,e,Lt,n,0,a),Ft("cf3",t,e,Lt,0,-i,a),Ft("cf4",t,e,Lt,0,i,a),Ft("cn1",t,e,Lt,-n,0,s),Ft("cn2",t,e,Lt,n,0,s),Ft("cn3",t,e,Lt,0,-i,s),Ft("cn4",t,e,Lt,0,i,s),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function Ft(r,e,t,n,i,s,a){ro.set(i,s,a).unproject(n);const o=e[r];if(o!==void 0){const l=t.getAttribute("position");for(let c=0,u=o.length;c<u;c++)l.setXYZ(o[c],ro.x,ro.y,ro.z)}}const ao=new zt;class K0 extends ci{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),s=new it;s.setIndex(new bt(n,1)),s.setAttribute("position",new bt(i,3)),super(s,new un({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&ao.setFromObject(this.object),ao.isEmpty())return;const e=ao.min,t=ao.max,n=this.geometry.attributes.position,i=n.array;i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=e.x,i[4]=t.y,i[5]=t.z,i[6]=e.x,i[7]=e.y,i[8]=t.z,i[9]=t.x,i[10]=e.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=e.z,i[15]=e.x,i[16]=t.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=t.x,i[22]=e.y,i[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class j0 extends ci{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new it;s.setIndex(new bt(n,1)),s.setAttribute("position",new Ue(i,3)),super(s,new un({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class Q0 extends Wi{constructor(e,t=1,n=16776960){const i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],a=new it;a.setAttribute("position",new Ue(s,3)),a.computeBoundingSphere(),super(a,new un({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const o=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new it;l.setAttribute("position",new Ue(o,3)),l.computeBoundingSphere(),this.add(new Mt(l,new Jt({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Id=new R;let oo,Nc;class ev extends _t{constructor(e=new R(0,0,1),t=new R(0,0,0),n=1,i=16776960,s=n*.2,a=s*.2){super(),this.type="ArrowHelper",oo===void 0&&(oo=new it,oo.setAttribute("position",new Ue([0,0,0,0,1,0],3)),Nc=new ur(.5,1,5,1),Nc.translate(0,-.5,0)),this.position.copy(t),this.line=new Wi(oo,new un({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Mt(Nc,new Jt({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,s,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Id.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Id,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class tv extends ci{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new it;i.setAttribute("position",new Ue(t,3)),i.setAttribute("color",new Ue(n,3));const s=new un({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){const i=new Pe,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class nv{constructor(){this.type="ShapePath",this.color=new Pe,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new cl,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,s,a){return this.currentPath.bezierCurveTo(e,t,n,i,s,a),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(m){const x=[];for(let _=0,y=m.length;_<y;_++){const E=m[_],S=new ms;S.curves=E.curves,x.push(S)}return x}function n(m,x){const _=x.length;let y=!1;for(let E=_-1,S=0;S<_;E=S++){let C=x[E],M=x[S],T=M.x-C.x,I=M.y-C.y;if(Math.abs(I)>Number.EPSILON){if(I<0&&(C=x[S],T=-T,M=x[E],I=-I),m.y<C.y||m.y>M.y)continue;if(m.y===C.y){if(m.x===C.x)return!0}else{const P=I*(m.x-C.x)-T*(m.y-C.y);if(P===0)return!0;if(P<0)continue;y=!y}}else{if(m.y!==C.y)continue;if(M.x<=m.x&&m.x<=C.x||C.x<=m.x&&m.x<=M.x)return!0}}return y}const i=zn.isClockWise,s=this.subPaths;if(s.length===0)return[];let a,o,l;const c=[];if(s.length===1)return o=s[0],l=new ms,l.curves=o.curves,c.push(l),c;let u=!i(s[0].getPoints());u=e?!u:u;const d=[],h=[];let f=[],p=0,v;h[p]=void 0,f[p]=[];for(let m=0,x=s.length;m<x;m++)o=s[m],v=o.getPoints(),a=i(v),a=e?!a:a,a?(!u&&h[p]&&p++,h[p]={s:new ms,p:v},h[p].s.curves=o.curves,u&&p++,f[p]=[]):f[p].push({h:o,p:v[0]});if(!h[0])return t(s);if(h.length>1){let m=!1,x=0;for(let _=0,y=h.length;_<y;_++)d[_]=[];for(let _=0,y=h.length;_<y;_++){const E=f[_];for(let S=0;S<E.length;S++){const C=E[S];let M=!0;for(let T=0;T<h.length;T++)n(C.p,h[T].p)&&(_!==T&&x++,M?(M=!1,d[T].push(C)):m=!0);M&&d[_].push(C)}}x>0&&m===!1&&(f=d)}let g;for(let m=0,x=h.length;m<x;m++){l=h[m].s,c.push(l),g=f[m];for(let _=0,y=g.length;_<y;_++)l.holes.push(g[_].h)}return c}}class iv extends Wn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){we("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function sv(r,e){const t=r.image&&r.image.width?r.image.width/r.image.height:1;return t>e?(r.repeat.x=1,r.repeat.y=t/e,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2):(r.repeat.x=e/t,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0),r}function rv(r,e){const t=r.image&&r.image.width?r.image.width/r.image.height:1;return t>e?(r.repeat.x=e/t,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0):(r.repeat.x=1,r.repeat.y=t/e,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2),r}function av(r){return r.repeat.x=1,r.repeat.y=1,r.offset.x=0,r.offset.y=0,r}function uu(r,e,t,n){const i=ov(n);switch(t){case Tu:return r*e;case _l:return r*e/i.components*i.byteLength;case ha:return r*e/i.components*i.byteLength;case Gi:return r*e*2/i.components*i.byteLength;case vl:return r*e*2/i.components*i.byteLength;case Cu:return r*e*3/i.components*i.byteLength;case ln:return r*e*4/i.components*i.byteLength;case xl:return r*e*4/i.components*i.byteLength;case Or:case Br:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case kr:case zr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Co:case Io:return Math.max(r,16)*Math.max(e,8)/4;case To:case Ro:return Math.max(r,8)*Math.max(e,8)/2;case Po:case Lo:case Uo:case No:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Do:case qr:case Fo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Oo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Bo:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case ko:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case zo:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Vo:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Go:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Wo:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Xo:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case qo:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case $o:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Yo:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Zo:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Jo:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Ko:case jo:case Qo:return Math.ceil(r/4)*Math.ceil(e/4)*16;case el:case tl:return Math.ceil(r/4)*Math.ceil(e/4)*8;case $r:case nl:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ov(r){switch(r){case pn:case Su:return{byteLength:1,components:1};case er:case wu:case oi:return{byteLength:2,components:1};case ml:case gl:return{byteLength:2,components:4};case Ln:case pl:case on:return{byteLength:4,components:1};case Eu:case Au:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}class lv{static contain(e,t){return sv(e,t)}static cover(e,t){return rv(e,t)}static fill(e){return av(e)}static getByteLength(e,t,n,i){return uu(e,t,n,i)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:dl}}));typeof window<"u"&&(window.__THREE__?we("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=dl);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Xp(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function cv(r){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,h=r.createBuffer();r.bindBuffer(l,h),r.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,o),d.length===0)r.bufferSubData(c,0,u);else{d.sort((f,p)=>f.start-p.start);let h=0;for(let f=1;f<d.length;f++){const p=d[h],v=d[f];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++h,d[h]=v)}d.length=h+1;for(let f=0,p=d.length;f<p;f++){const v=d[f];r.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var uv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hv=`#ifdef USE_ALPHAHASH
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
#endif`,dv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gv=`#ifdef USE_AOMAP
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
#endif`,_v=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vv=`#ifdef USE_BATCHING
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
#endif`,xv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Sv=`#ifdef USE_IRIDESCENCE
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
#endif`,wv=`#ifdef USE_BUMPMAP
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
#endif`,Ev=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Av=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Iv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Pv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Lv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Dv=`#define PI 3.141592653589793
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
} // validated`,Uv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Nv=`vec3 transformedNormal = objectNormal;
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
#endif`,Fv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ov=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,kv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gv=`#ifdef USE_ENVMAP
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
#endif`,Hv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Wv=`#ifdef USE_ENVMAP
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
#endif`,Xv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qv=`#ifdef USE_ENVMAP
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
#endif`,$v=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Jv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Kv=`#ifdef USE_GRADIENTMAP
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
}`,jv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Qv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ex=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tx=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,nx=`#ifdef USE_ENVMAP
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
#endif`,ix=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ax=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ox=`PhysicalMaterial material;
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
#endif`,lx=`uniform sampler2D dfgLUT;
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
}`,cx=`
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
#endif`,ux=`#if defined( RE_IndirectDiffuse )
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
#endif`,hx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dx=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,fx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,px=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_x=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,yx=`#if defined( USE_POINTS_UV )
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
#endif`,Mx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Sx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ex=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ax=`#ifdef USE_MORPHTARGETS
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
#endif`,Tx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Rx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ix=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Px=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Dx=`#ifdef USE_NORMALMAP
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
#endif`,Ux=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Nx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ox=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Bx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,kx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,zx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Vx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Wx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$x=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Zx=`float getShadowMask() {
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
}`,Jx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Kx=`#ifdef USE_SKINNING
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
#endif`,jx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Qx=`#ifdef USE_SKINNING
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
#endif`,ey=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ty=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ny=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,iy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,sy=`#ifdef USE_TRANSMISSION
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
#endif`,ry=`#ifdef USE_TRANSMISSION
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
#endif`,ay=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,oy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ly=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const uy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hy=`uniform sampler2D t2D;
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
}`,dy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,py=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,my=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gy=`#include <common>
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
}`,_y=`#if DEPTH_PACKING == 3200
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
}`,vy=`#define DISTANCE
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
}`,xy=`#define DISTANCE
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
}`,yy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,My=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,by=`uniform float scale;
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
}`,Sy=`uniform vec3 diffuse;
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
}`,wy=`#include <common>
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
}`,Ey=`uniform vec3 diffuse;
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
}`,Ay=`#define LAMBERT
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
}`,Ty=`#define LAMBERT
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
}`,Cy=`#define MATCAP
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
}`,Ry=`#define MATCAP
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
}`,Iy=`#define NORMAL
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
}`,Py=`#define NORMAL
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
}`,Ly=`#define PHONG
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
}`,Dy=`#define PHONG
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
}`,Uy=`#define STANDARD
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
}`,Ny=`#define STANDARD
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
}`,Fy=`#define TOON
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
}`,Oy=`#define TOON
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
}`,By=`uniform float size;
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
}`,ky=`uniform vec3 diffuse;
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
}`,zy=`#include <common>
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
}`,Vy=`uniform vec3 color;
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
}`,Gy=`uniform float rotation;
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
}`,Hy=`uniform vec3 diffuse;
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
}`,ot={alphahash_fragment:uv,alphahash_pars_fragment:hv,alphamap_fragment:dv,alphamap_pars_fragment:fv,alphatest_fragment:pv,alphatest_pars_fragment:mv,aomap_fragment:gv,aomap_pars_fragment:_v,batching_pars_vertex:vv,batching_vertex:xv,begin_vertex:yv,beginnormal_vertex:Mv,bsdfs:bv,iridescence_fragment:Sv,bumpmap_pars_fragment:wv,clipping_planes_fragment:Ev,clipping_planes_pars_fragment:Av,clipping_planes_pars_vertex:Tv,clipping_planes_vertex:Cv,color_fragment:Rv,color_pars_fragment:Iv,color_pars_vertex:Pv,color_vertex:Lv,common:Dv,cube_uv_reflection_fragment:Uv,defaultnormal_vertex:Nv,displacementmap_pars_vertex:Fv,displacementmap_vertex:Ov,emissivemap_fragment:Bv,emissivemap_pars_fragment:kv,colorspace_fragment:zv,colorspace_pars_fragment:Vv,envmap_fragment:Gv,envmap_common_pars_fragment:Hv,envmap_pars_fragment:Wv,envmap_pars_vertex:Xv,envmap_physical_pars_fragment:nx,envmap_vertex:qv,fog_vertex:$v,fog_pars_vertex:Yv,fog_fragment:Zv,fog_pars_fragment:Jv,gradientmap_pars_fragment:Kv,lightmap_pars_fragment:jv,lights_lambert_fragment:Qv,lights_lambert_pars_fragment:ex,lights_pars_begin:tx,lights_toon_fragment:ix,lights_toon_pars_fragment:sx,lights_phong_fragment:rx,lights_phong_pars_fragment:ax,lights_physical_fragment:ox,lights_physical_pars_fragment:lx,lights_fragment_begin:cx,lights_fragment_maps:ux,lights_fragment_end:hx,lightprobes_pars_fragment:dx,logdepthbuf_fragment:fx,logdepthbuf_pars_fragment:px,logdepthbuf_pars_vertex:mx,logdepthbuf_vertex:gx,map_fragment:_x,map_pars_fragment:vx,map_particle_fragment:xx,map_particle_pars_fragment:yx,metalnessmap_fragment:Mx,metalnessmap_pars_fragment:bx,morphinstance_vertex:Sx,morphcolor_vertex:wx,morphnormal_vertex:Ex,morphtarget_pars_vertex:Ax,morphtarget_vertex:Tx,normal_fragment_begin:Cx,normal_fragment_maps:Rx,normal_pars_fragment:Ix,normal_pars_vertex:Px,normal_vertex:Lx,normalmap_pars_fragment:Dx,clearcoat_normal_fragment_begin:Ux,clearcoat_normal_fragment_maps:Nx,clearcoat_pars_fragment:Fx,iridescence_pars_fragment:Ox,opaque_fragment:Bx,packing:kx,premultiplied_alpha_fragment:zx,project_vertex:Vx,dithering_fragment:Gx,dithering_pars_fragment:Hx,roughnessmap_fragment:Wx,roughnessmap_pars_fragment:Xx,shadowmap_pars_fragment:qx,shadowmap_pars_vertex:$x,shadowmap_vertex:Yx,shadowmask_pars_fragment:Zx,skinbase_vertex:Jx,skinning_pars_vertex:Kx,skinning_vertex:jx,skinnormal_vertex:Qx,specularmap_fragment:ey,specularmap_pars_fragment:ty,tonemapping_fragment:ny,tonemapping_pars_fragment:iy,transmission_fragment:sy,transmission_pars_fragment:ry,uv_pars_fragment:ay,uv_pars_vertex:oy,uv_vertex:ly,worldpos_vertex:cy,background_vert:uy,background_frag:hy,backgroundCube_vert:dy,backgroundCube_frag:fy,cube_vert:py,cube_frag:my,depth_vert:gy,depth_frag:_y,distance_vert:vy,distance_frag:xy,equirect_vert:yy,equirect_frag:My,linedashed_vert:by,linedashed_frag:Sy,meshbasic_vert:wy,meshbasic_frag:Ey,meshlambert_vert:Ay,meshlambert_frag:Ty,meshmatcap_vert:Cy,meshmatcap_frag:Ry,meshnormal_vert:Iy,meshnormal_frag:Py,meshphong_vert:Ly,meshphong_frag:Dy,meshphysical_vert:Uy,meshphysical_frag:Ny,meshtoon_vert:Fy,meshtoon_frag:Oy,points_vert:By,points_frag:ky,shadow_vert:zy,shadow_frag:Vy,sprite_vert:Gy,sprite_frag:Hy},Ae={common:{diffuse:{value:new Pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new nt}},envmap:{envMap:{value:null},envMapRotation:{value:new nt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new nt},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new Pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0},uvTransform:{value:new nt}},sprite:{diffuse:{value:new Pe(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}}},rn={basic:{uniforms:sn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:sn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Pe(0)},envMapIntensity:{value:1}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:sn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Pe(0)},specular:{value:new Pe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:sn([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new Pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:sn([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new Pe(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:sn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:sn([Ae.points,Ae.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:sn([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:sn([Ae.common,Ae.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:sn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:sn([Ae.sprite,Ae.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new nt}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distance:{uniforms:sn([Ae.common,Ae.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distance_vert,fragmentShader:ot.distance_frag},shadow:{uniforms:sn([Ae.lights,Ae.fog,{color:{value:new Pe(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};rn.physical={uniforms:sn([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new nt},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new nt},sheen:{value:0},sheenColor:{value:new Pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new nt},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new nt},attenuationDistance:{value:0},attenuationColor:{value:new Pe(0)},specularColor:{value:new Pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new nt},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new nt}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};const lo={r:0,b:0,g:0},Wy=new tt,qp=new nt;qp.set(-1,0,0,0,1,0,0,0,1);function Xy(r,e,t,n,i,s){const a=new Pe(0);let o=i===!0?0:1,l,c,u=null,d=0,h=null;function f(x){let _=x.isScene===!0?x.background:null;if(_&&_.isTexture){const y=x.backgroundBlurriness>0;_=e.get(_,y)}return _}function p(x){let _=!1;const y=f(x);y===null?g(a,o):y&&y.isColor&&(g(y,1),_=!0);const E=r.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,s):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||_)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function v(x,_){const y=f(_);y&&(y.isCubeTexture||y.mapping===or)?(c===void 0&&(c=new Mt(new Xi(1,1,1),new Tn({name:"BackgroundCubeMaterial",uniforms:rr(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,S,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Wy.makeRotationFromEuler(_.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(qp),c.material.toneMapped=dt.getTransfer(y.colorSpace)!==vt,(u!==y||d!==y.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,h=r.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Mt(new dr(2,2),new Tn({name:"BackgroundMaterial",uniforms:rr(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:yi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=dt.getTransfer(y.colorSpace)!==vt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||h!==r.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,h=r.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function g(x,_){x.getRGB(lo,mp(r)),t.buffers.color.setClear(lo.r,lo.g,lo.b,_,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,_=1){a.set(x),o=_,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,g(a,o)},render:p,addToRenderList:v,dispose:m}}function qy(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=h(null);let s=i,a=!1;function o(P,k,Z,z,L){let B=!1;const V=d(P,z,Z,k);s!==V&&(s=V,c(s.object)),B=f(P,z,Z,L),B&&p(P,z,Z,L),L!==null&&e.update(L,r.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,y(P,k,Z,z),L!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(L).buffer))}function l(){return r.createVertexArray()}function c(P){return r.bindVertexArray(P)}function u(P){return r.deleteVertexArray(P)}function d(P,k,Z,z){const L=z.wireframe===!0;let B=n[k.id];B===void 0&&(B={},n[k.id]=B);const V=P.isInstancedMesh===!0?P.id:0;let oe=B[V];oe===void 0&&(oe={},B[V]=oe);let Q=oe[Z.id];Q===void 0&&(Q={},oe[Z.id]=Q);let le=Q[L];return le===void 0&&(le=h(l()),Q[L]=le),le}function h(P){const k=[],Z=[],z=[];for(let L=0;L<t;L++)k[L]=0,Z[L]=0,z[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:Z,attributeDivisors:z,object:P,attributes:{},index:null}}function f(P,k,Z,z){const L=s.attributes,B=k.attributes;let V=0;const oe=Z.getAttributes();for(const Q in oe)if(oe[Q].location>=0){const ie=L[Q];let H=B[Q];if(H===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(H=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(H=P.instanceColor)),ie===void 0||ie.attribute!==H||H&&ie.data!==H.data)return!0;V++}return s.attributesNum!==V||s.index!==z}function p(P,k,Z,z){const L={},B=k.attributes;let V=0;const oe=Z.getAttributes();for(const Q in oe)if(oe[Q].location>=0){let ie=B[Q];ie===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(ie=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(ie=P.instanceColor));const H={};H.attribute=ie,ie&&ie.data&&(H.data=ie.data),L[Q]=H,V++}s.attributes=L,s.attributesNum=V,s.index=z}function v(){const P=s.newAttributes;for(let k=0,Z=P.length;k<Z;k++)P[k]=0}function g(P){m(P,0)}function m(P,k){const Z=s.newAttributes,z=s.enabledAttributes,L=s.attributeDivisors;Z[P]=1,z[P]===0&&(r.enableVertexAttribArray(P),z[P]=1),L[P]!==k&&(r.vertexAttribDivisor(P,k),L[P]=k)}function x(){const P=s.newAttributes,k=s.enabledAttributes;for(let Z=0,z=k.length;Z<z;Z++)k[Z]!==P[Z]&&(r.disableVertexAttribArray(Z),k[Z]=0)}function _(P,k,Z,z,L,B,V){V===!0?r.vertexAttribIPointer(P,k,Z,L,B):r.vertexAttribPointer(P,k,Z,z,L,B)}function y(P,k,Z,z){v();const L=z.attributes,B=Z.getAttributes(),V=k.defaultAttributeValues;for(const oe in B){const Q=B[oe];if(Q.location>=0){let le=L[oe];if(le===void 0&&(oe==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),oe==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),le!==void 0){const ie=le.normalized,H=le.itemSize,W=e.get(le);if(W===void 0)continue;const X=W.buffer,te=W.type,K=W.bytesPerElement,fe=te===r.INT||te===r.UNSIGNED_INT||le.gpuType===pl;if(le.isInterleavedBufferAttribute){const me=le.data,Ce=me.stride,Ge=le.offset;if(me.isInstancedInterleavedBuffer){for(let ke=0;ke<Q.locationSize;ke++)m(Q.location+ke,me.meshPerAttribute);P.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let ke=0;ke<Q.locationSize;ke++)g(Q.location+ke);r.bindBuffer(r.ARRAY_BUFFER,X);for(let ke=0;ke<Q.locationSize;ke++)_(Q.location+ke,H/Q.locationSize,te,ie,Ce*K,(Ge+H/Q.locationSize*ke)*K,fe)}else{if(le.isInstancedBufferAttribute){for(let me=0;me<Q.locationSize;me++)m(Q.location+me,le.meshPerAttribute);P.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let me=0;me<Q.locationSize;me++)g(Q.location+me);r.bindBuffer(r.ARRAY_BUFFER,X);for(let me=0;me<Q.locationSize;me++)_(Q.location+me,H/Q.locationSize,te,ie,H*K,H/Q.locationSize*me*K,fe)}}else if(V!==void 0){const ie=V[oe];if(ie!==void 0)switch(ie.length){case 2:r.vertexAttrib2fv(Q.location,ie);break;case 3:r.vertexAttrib3fv(Q.location,ie);break;case 4:r.vertexAttrib4fv(Q.location,ie);break;default:r.vertexAttrib1fv(Q.location,ie)}}}}x()}function E(){T();for(const P in n){const k=n[P];for(const Z in k){const z=k[Z];for(const L in z){const B=z[L];for(const V in B)u(B[V].object),delete B[V];delete z[L]}}delete n[P]}}function S(P){if(n[P.id]===void 0)return;const k=n[P.id];for(const Z in k){const z=k[Z];for(const L in z){const B=z[L];for(const V in B)u(B[V].object),delete B[V];delete z[L]}}delete n[P.id]}function C(P){for(const k in n){const Z=n[k];for(const z in Z){const L=Z[z];if(L[P.id]===void 0)continue;const B=L[P.id];for(const V in B)u(B[V].object),delete B[V];delete L[P.id]}}}function M(P){for(const k in n){const Z=n[k],z=P.isInstancedMesh===!0?P.id:0,L=Z[z];if(L!==void 0){for(const B in L){const V=L[B];for(const oe in V)u(V[oe].object),delete V[oe];delete L[B]}delete Z[z],Object.keys(Z).length===0&&delete n[k]}}}function T(){I(),a=!0,s!==i&&(s=i,c(s.object))}function I(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:T,resetDefaultState:I,dispose:E,releaseStatesOfGeometry:S,releaseStatesOfObject:M,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:g,disableUnusedAttributes:x}}function $y(r,e,t){let n;function i(l){n=l}function s(l,c){r.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(r.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let f=0;f<u;f++)h+=c[f];t.update(h,n,1)}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Yy(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==ln&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const M=C===oi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==pn&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==on&&!M)}function l(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(we("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&we("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),_=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),E=r.getParameter(r.MAX_SAMPLES),S=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:x,maxVaryings:_,maxFragmentUniforms:y,maxSamples:E,samples:S}}function Zy(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Ni,o=new nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||n!==0||i;return i=h,n=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const p=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,m=r.get(d);if(!i||p===null||p.length===0||s&&!g)s?u(null):c();else{const x=s?0:n,_=x*4;let y=m.clippingState||null;l.value=y,y=u(p,h,_,f);for(let E=0;E!==_;++E)y[E]=t[E];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,p){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=l.value,p!==!0||g===null){const m=f+v*4,x=h.matrixWorldInverse;o.getNormalMatrix(x),(g===null||g.length<m)&&(g=new Float32Array(m));for(let _=0,y=f;_!==v;++_,y+=4)a.copy(d[_]).applyMatrix4(x,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}const ki=4,Pd=[.125,.215,.35,.446,.526,.582],ls=20,Jy=256,Cr=new ga,Ld=new Pe;let Fc=null,Oc=0,Bc=0,kc=!1;const Ky=new R;class hu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:a=256,position:o=Ky}=s;Fc=this._renderer.getRenderTarget(),Oc=this._renderer.getActiveCubeFace(),Bc=this._renderer.getActiveMipmapLevel(),kc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ud(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Fc,Oc,Bc),this._renderer.xr.enabled=kc,e.scissorTest=!1,$s(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ai||e.mapping===Vi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fc=this._renderer.getRenderTarget(),Oc=this._renderer.getActiveCubeFace(),Bc=this._renderer.getActiveMipmapLevel(),kc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ct,minFilter:Ct,generateMipmaps:!1,type:oi,format:ln,colorSpace:Jr,depthBuffer:!1},i=Dd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dd(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=jy(s)),this._blurMaterial=eM(s,e,t),this._ggxMaterial=Qy(s,e,t)}return i}_compileMaterial(e){const t=new Mt(new it,e);this._renderer.compile(t,Cr)}_sceneToCubeUV(e,t,n,i,s){const l=new Xt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Ld),d.toneMapping=Vn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Mt(new Xi,new Jt({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let m=!1;const x=e.background;x?x.isColor&&(g.color.copy(x),e.background=null,m=!0):(g.color.copy(Ld),m=!0);for(let _=0;_<6;_++){const y=_%3;y===0?(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[_],s.y,s.z)):y===1?(l.up.set(0,0,c[_]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[_],s.z)):(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[_]));const E=this._cubeSize;$s(i,y*E,_>2?E:0,E,E),d.setRenderTarget(i),m&&d.render(v,l),d.render(e,l)}d.toneMapping=f,d.autoClear=h,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===ai||e.mapping===Vi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ud());const s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;$s(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Cr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=0+c*1.25,f=d*h,{_lodMax:p}=this,v=this._sizeLods[n],g=3*v*(n>p-ki?n-p+ki:0),m=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,$s(s,g,m,3*v,2*v),i.setRenderTarget(s),i.render(o,Cr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-n,$s(e,g,m,3*v,2*v),i.setRenderTarget(e),i.render(o,Cr)}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&ze("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[i];d.material=c;const h=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*ls-1),v=s/p,g=isFinite(s)?1+Math.floor(u*v):ls;g>ls&&we(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ls}`);const m=[];let x=0;for(let C=0;C<ls;++C){const M=C/v,T=Math.exp(-M*M/2);m.push(T),C===0?x+=T:C<g&&(x+=2*T)}for(let C=0;C<m.length;C++)m[C]=m[C]/x;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:_}=this;h.dTheta.value=p,h.mipInt.value=_-n;const y=this._sizeLods[i],E=3*y*(i>_-ki?i-_+ki:0),S=4*(this._cubeSize-y);$s(t,E,S,3*y,2*y),l.setRenderTarget(t),l.render(d,Cr)}}function jy(r){const e=[],t=[],n=[];let i=r;const s=r-ki+1+Pd.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>r-ki?l=Pd[a-r+ki-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,p=6,v=3,g=2,m=1,x=new Float32Array(v*p*f),_=new Float32Array(g*p*f),y=new Float32Array(m*p*f);for(let S=0;S<f;S++){const C=S%3*2/3-1,M=S>2?0:-1,T=[C,M,0,C+2/3,M,0,C+2/3,M+1,0,C,M,0,C+2/3,M+1,0,C,M+1,0];x.set(T,v*p*S),_.set(h,g*p*S);const I=[S,S,S,S,S,S];y.set(I,m*p*S)}const E=new it;E.setAttribute("position",new bt(x,v)),E.setAttribute("uv",new bt(_,g)),E.setAttribute("faceIndex",new bt(y,m)),n.push(new Mt(E,null)),i>ki&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Dd(r,e,t){const n=new An(r,e,t);return n.texture.mapping=or,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $s(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Qy(r,e,t){return new Tn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Jy,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ql(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function eM(r,e,t){const n=new Float32Array(ls),i=new R(0,1,0);return new Tn({name:"SphericalGaussianBlur",defines:{n:ls,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ql(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Ud(){return new Tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ql(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Nd(){return new Tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function ql(){return`

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
	`}class oh extends An{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new da(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Xi(5,5,5),s=new Tn({name:"CubemapFromEquirect",uniforms:rr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:cn,blending:ri});s.uniforms.tEquirect.value=t;const a=new Mt(i,s),o=t.minFilter;return t.minFilter===ii&&(t.minFilter=Ct),new Op(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}function tM(r){let e=new WeakMap,t=new WeakMap,n=null;function i(h,f=!1){return h==null?null:f?a(h):s(h)}function s(h){if(h&&h.isTexture){const f=h.mapping;if(f===Ur||f===Nr)if(e.has(h)){const p=e.get(h).texture;return o(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const v=new oh(p.height);return v.fromEquirectangularTexture(r,h),e.set(h,v),h.addEventListener("dispose",c),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const f=h.mapping,p=f===Ur||f===Nr,v=f===ai||f===Vi;if(p||v){let g=t.get(h);const m=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return n===null&&(n=new hu(r)),g=p?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{const x=h.image;return p&&x&&x.height>0||v&&x&&l(x)?(n===null&&(n=new hu(r)),g=p?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,f){return f===Ur?h.mapping=ai:f===Nr&&(h.mapping=Vi),h}function l(h){let f=0;const p=6;for(let v=0;v<p;v++)h[v]!==void 0&&f++;return f===p}function c(h){const f=h.target;f.removeEventListener("dispose",c);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function u(h){const f=h.target;f.removeEventListener("dispose",u);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function nM(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&sl("WebGLRenderer: "+n+" extension not supported."),i}}}function iM(r,e,t,n){const i={},s=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const p in h.attributes)e.remove(h.attributes[p]);h.removeEventListener("dispose",a),delete i[h.id];const f=s.get(h);f&&(e.remove(f),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return i[h.id]===!0||(h.addEventListener("dispose",a),i[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const f in h)e.update(h[f],r.ARRAY_BUFFER)}function c(d){const h=[],f=d.index,p=d.attributes.position;let v=0;if(p===void 0)return;if(f!==null){const x=f.array;v=f.version;for(let _=0,y=x.length;_<y;_+=3){const E=x[_+0],S=x[_+1],C=x[_+2];h.push(E,S,S,C,C,E)}}else{const x=p.array;v=p.version;for(let _=0,y=x.length/3-1;_<y;_+=3){const E=_+0,S=_+1,C=_+2;h.push(E,S,S,C,C,E)}}const g=new(p.count>=65535?Uu:Du)(h,1);g.version=v;const m=s.get(d);m&&e.remove(m),s.set(d,g)}function u(d){const h=s.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function sM(r,e,t){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,h){r.drawElements(n,h,s,d*a),t.update(h,n,1)}function c(d,h,f){f!==0&&(r.drawElementsInstanced(n,h,s,d*a,f),t.update(h,n,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,d,0,f);let v=0;for(let g=0;g<f;g++)v+=h[g];t.update(v,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function rM(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:ze("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function aM(r,e,t){const n=new WeakMap,i=new pt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let T=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();const f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let _=0;f===!0&&(_=1),p===!0&&(_=2),v===!0&&(_=3);let y=o.attributes.position.count*_,E=1;y>e.maxTextureSize&&(E=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const S=new Float32Array(y*E*4*d),C=new Sl(S,y,E,d);C.type=on,C.needsUpdate=!0;const M=_*4;for(let I=0;I<d;I++){const P=g[I],k=m[I],Z=x[I],z=y*E*4*I;for(let L=0;L<P.count;L++){const B=L*M;f===!0&&(i.fromBufferAttribute(P,L),S[z+B+0]=i.x,S[z+B+1]=i.y,S[z+B+2]=i.z,S[z+B+3]=0),p===!0&&(i.fromBufferAttribute(k,L),S[z+B+4]=i.x,S[z+B+5]=i.y,S[z+B+6]=i.z,S[z+B+7]=0),v===!0&&(i.fromBufferAttribute(Z,L),S[z+B+8]=i.x,S[z+B+9]=i.y,S[z+B+10]=i.z,S[z+B+11]=Z.itemSize===4?i.w:1)}}h={count:d,texture:C,size:new he(y,E)},n.set(o,h),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",p),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",h.size)}return{update:s}}function oM(r,e,t,n,i){let s=new WeakMap;function a(c){const u=i.render.frame,d=c.geometry,h=e.get(c,d);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return h}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const lM={[mu]:"LINEAR_TONE_MAPPING",[gu]:"REINHARD_TONE_MAPPING",[_u]:"CINEON_TONE_MAPPING",[vu]:"ACES_FILMIC_TONE_MAPPING",[yu]:"AGX_TONE_MAPPING",[Mu]:"NEUTRAL_TONE_MAPPING",[xu]:"CUSTOM_TONE_MAPPING"};function cM(r,e,t,n,i){const s=new An(e,t,{type:r,depthBuffer:n,stencilBuffer:i,depthTexture:n?new ys(e,t):void 0}),a=new An(e,t,{type:oi,depthBuffer:!1,stencilBuffer:!1}),o=new it;o.setAttribute("position",new Ue([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Ue([0,2,0,0,2,0],2));const l=new qu({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new Mt(o,l),u=new ga(-1,1,1,-1,0,1);let d=null,h=null,f=!1,p,v=null,g=[],m=!1;this.setSize=function(x,_){s.setSize(x,_),a.setSize(x,_);for(let y=0;y<g.length;y++){const E=g[y];E.setSize&&E.setSize(x,_)}},this.setEffects=function(x){g=x,m=g.length>0&&g[0].isRenderPass===!0;const _=s.width,y=s.height;for(let E=0;E<g.length;E++){const S=g[E];S.setSize&&S.setSize(_,y)}},this.begin=function(x,_){if(f||x.toneMapping===Vn&&g.length===0)return!1;if(v=_,_!==null){const y=_.width,E=_.height;(s.width!==y||s.height!==E)&&this.setSize(y,E)}return m===!1&&x.setRenderTarget(s),p=x.toneMapping,x.toneMapping=Vn,!0},this.hasRenderPass=function(){return m},this.end=function(x,_){x.toneMapping=p,f=!0;let y=s,E=a;for(let S=0;S<g.length;S++){const C=g[S];if(C.enabled!==!1&&(C.render(x,E,y,_),C.needsSwap!==!1)){const M=y;y=E,E=M}}if(d!==x.outputColorSpace||h!==x.toneMapping){d=x.outputColorSpace,h=x.toneMapping,l.defines={},dt.getTransfer(d)===vt&&(l.defines.SRGB_TRANSFER="");const S=lM[h];S&&(l.defines[S]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,x.setRenderTarget(v),x.render(c,u),v=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const $p=new It,du=new ys(1,1),Yp=new Sl,Zp=new wl,Jp=new da,Fd=[],Od=[],Bd=new Float32Array(16),kd=new Float32Array(9),zd=new Float32Array(4);function pr(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Fd[i];if(s===void 0&&(s=new Float32Array(i),Fd[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Gt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Ht(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function $l(r,e){let t=Od[e];t===void 0&&(t=new Int32Array(e),Od[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function uM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function hM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;r.uniform2fv(this.addr,e),Ht(t,e)}}function dM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;r.uniform3fv(this.addr,e),Ht(t,e)}}function fM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;r.uniform4fv(this.addr,e),Ht(t,e)}}function pM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Ht(t,e)}else{if(Gt(t,n))return;zd.set(n),r.uniformMatrix2fv(this.addr,!1,zd),Ht(t,n)}}function mM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Ht(t,e)}else{if(Gt(t,n))return;kd.set(n),r.uniformMatrix3fv(this.addr,!1,kd),Ht(t,n)}}function gM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Ht(t,e)}else{if(Gt(t,n))return;Bd.set(n),r.uniformMatrix4fv(this.addr,!1,Bd),Ht(t,n)}}function _M(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function vM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;r.uniform2iv(this.addr,e),Ht(t,e)}}function xM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;r.uniform3iv(this.addr,e),Ht(t,e)}}function yM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;r.uniform4iv(this.addr,e),Ht(t,e)}}function MM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function bM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;r.uniform2uiv(this.addr,e),Ht(t,e)}}function SM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;r.uniform3uiv(this.addr,e),Ht(t,e)}}function wM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;r.uniform4uiv(this.addr,e),Ht(t,e)}}function EM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(du.compareFunction=t.isReversedDepthBuffer()?bl:Ml,s=du):s=$p,t.setTexture2D(e||s,i)}function AM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Zp,i)}function TM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Jp,i)}function CM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Yp,i)}function RM(r){switch(r){case 5126:return uM;case 35664:return hM;case 35665:return dM;case 35666:return fM;case 35674:return pM;case 35675:return mM;case 35676:return gM;case 5124:case 35670:return _M;case 35667:case 35671:return vM;case 35668:case 35672:return xM;case 35669:case 35673:return yM;case 5125:return MM;case 36294:return bM;case 36295:return SM;case 36296:return wM;case 35678:case 36198:case 36298:case 36306:case 35682:return EM;case 35679:case 36299:case 36307:return AM;case 35680:case 36300:case 36308:case 36293:return TM;case 36289:case 36303:case 36311:case 36292:return CM}}function IM(r,e){r.uniform1fv(this.addr,e)}function PM(r,e){const t=pr(e,this.size,2);r.uniform2fv(this.addr,t)}function LM(r,e){const t=pr(e,this.size,3);r.uniform3fv(this.addr,t)}function DM(r,e){const t=pr(e,this.size,4);r.uniform4fv(this.addr,t)}function UM(r,e){const t=pr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function NM(r,e){const t=pr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function FM(r,e){const t=pr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function OM(r,e){r.uniform1iv(this.addr,e)}function BM(r,e){r.uniform2iv(this.addr,e)}function kM(r,e){r.uniform3iv(this.addr,e)}function zM(r,e){r.uniform4iv(this.addr,e)}function VM(r,e){r.uniform1uiv(this.addr,e)}function GM(r,e){r.uniform2uiv(this.addr,e)}function HM(r,e){r.uniform3uiv(this.addr,e)}function WM(r,e){r.uniform4uiv(this.addr,e)}function XM(r,e,t){const n=this.cache,i=e.length,s=$l(t,i);Gt(n,s)||(r.uniform1iv(this.addr,s),Ht(n,s));let a;this.type===r.SAMPLER_2D_SHADOW?a=du:a=$p;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,s[o])}function qM(r,e,t){const n=this.cache,i=e.length,s=$l(t,i);Gt(n,s)||(r.uniform1iv(this.addr,s),Ht(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Zp,s[a])}function $M(r,e,t){const n=this.cache,i=e.length,s=$l(t,i);Gt(n,s)||(r.uniform1iv(this.addr,s),Ht(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Jp,s[a])}function YM(r,e,t){const n=this.cache,i=e.length,s=$l(t,i);Gt(n,s)||(r.uniform1iv(this.addr,s),Ht(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Yp,s[a])}function ZM(r){switch(r){case 5126:return IM;case 35664:return PM;case 35665:return LM;case 35666:return DM;case 35674:return UM;case 35675:return NM;case 35676:return FM;case 5124:case 35670:return OM;case 35667:case 35671:return BM;case 35668:case 35672:return kM;case 35669:case 35673:return zM;case 5125:return VM;case 36294:return GM;case 36295:return HM;case 36296:return WM;case 35678:case 36198:case 36298:case 36306:case 35682:return XM;case 35679:case 36299:case 36307:return qM;case 35680:case 36300:case 36308:case 36293:return $M;case 36289:case 36303:case 36311:case 36292:return YM}}class JM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=RM(t.type)}}class KM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ZM(t.type)}}class jM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const zc=/(\w+)(\])?(\[|\.)?/g;function Vd(r,e){r.seq.push(e),r.map[e.id]=e}function QM(r,e,t){const n=r.name,i=n.length;for(zc.lastIndex=0;;){const s=zc.exec(n),a=zc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Vd(t,c===void 0?new JM(o,r,e):new KM(o,r,e));break}else{let d=t.map[o];d===void 0&&(d=new jM(o),Vd(t,d)),t=d}}}class go{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);QM(o,l,this)}const i=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Gd(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const eb=37297;let tb=0;function nb(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Hd=new nt;function ib(r){dt._getMatrix(Hd,dt.workingColorSpace,r);const e=`mat3( ${Hd.elements.map(t=>t.toFixed(4))} )`;switch(dt.getTransfer(r)){case Kr:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return we("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Wd(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+nb(r.getShaderSource(e),o)}else return s}function sb(r,e){const t=ib(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const rb={[mu]:"Linear",[gu]:"Reinhard",[_u]:"Cineon",[vu]:"ACESFilmic",[yu]:"AgX",[Mu]:"Neutral",[xu]:"Custom"};function ab(r,e){const t=rb[e];return t===void 0?(we("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const co=new R;function ob(){dt.getLuminanceCoefficients(co);const r=co.x.toFixed(4),e=co.y.toFixed(4),t=co.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lb(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lr).join(`
`)}function cb(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ub(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function Lr(r){return r!==""}function Xd(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function qd(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const hb=/^[ \t]*#include +<([\w\d./]+)>/gm;function fu(r){return r.replace(hb,fb)}const db=new Map;function fb(r,e){let t=ot[e];if(t===void 0){const n=db.get(e);if(n!==void 0)t=ot[n],we('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return fu(t)}const pb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $d(r){return r.replace(pb,mb)}function mb(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Yd(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const gb={[Dr]:"SHADOWMAP_TYPE_PCF",[Zs]:"SHADOWMAP_TYPE_VSM"};function _b(r){return gb[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const vb={[ai]:"ENVMAP_TYPE_CUBE",[Vi]:"ENVMAP_TYPE_CUBE",[or]:"ENVMAP_TYPE_CUBE_UV"};function xb(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":vb[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const yb={[Vi]:"ENVMAP_MODE_REFRACTION"};function Mb(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":yb[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const bb={[ua]:"ENVMAP_BLENDING_MULTIPLY",[Rf]:"ENVMAP_BLENDING_MIX",[If]:"ENVMAP_BLENDING_ADD"};function Sb(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":bb[r.combine]||"ENVMAP_BLENDING_NONE"}function wb(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Eb(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=_b(t),c=xb(t),u=Mb(t),d=Sb(t),h=wb(t),f=lb(t),p=cb(s),v=i.createProgram();let g,m,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Lr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Lr).join(`
`),m.length>0&&(m+=`
`)):(g=[Yd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lr).join(`
`),m=[Yd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Vn?"#define TONE_MAPPING":"",t.toneMapping!==Vn?ot.tonemapping_pars_fragment:"",t.toneMapping!==Vn?ab("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,sb("linearToOutputTexel",t.outputColorSpace),ob(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lr).join(`
`)),a=fu(a),a=Xd(a,t),a=qd(a,t),o=fu(o),o=Xd(o,t),o=qd(o,t),a=$d(a),o=$d(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===nu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===nu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const _=x+g+a,y=x+m+o,E=Gd(i,i.VERTEX_SHADER,_),S=Gd(i,i.FRAGMENT_SHADER,y);i.attachShader(v,E),i.attachShader(v,S),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function C(P){if(r.debug.checkShaderErrors){const k=i.getProgramInfoLog(v)||"",Z=i.getShaderInfoLog(E)||"",z=i.getShaderInfoLog(S)||"",L=k.trim(),B=Z.trim(),V=z.trim();let oe=!0,Q=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(oe=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,E,S);else{const le=Wd(i,E,"vertex"),ie=Wd(i,S,"fragment");ze("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+L+`
`+le+`
`+ie)}else L!==""?we("WebGLProgram: Program Info Log:",L):(B===""||V==="")&&(Q=!1);Q&&(P.diagnostics={runnable:oe,programLog:L,vertexShader:{log:B,prefix:g},fragmentShader:{log:V,prefix:m}})}i.deleteShader(E),i.deleteShader(S),M=new go(i,v),T=ub(i,v)}let M;this.getUniforms=function(){return M===void 0&&C(this),M};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=i.getProgramParameter(v,eb)),I},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=tb++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=E,this.fragmentShader=S,this}let Ab=0;class Tb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Cb(e),t.set(e,n)),n}}class Cb{constructor(e){this.id=Ab++,this.code=e,this.usedTimes=0}}function Rb(r){return r===Gi||r===qr||r===$r}function Ib(r,e,t,n,i,s){const a=new El,o=new Tb,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer;let h=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(M){return l.add(M),M===0?"uv":`uv${M}`}function v(M,T,I,P,k,Z){const z=P.fog,L=k.geometry,B=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?P.environment:null,V=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,oe=e.get(M.envMap||B,V),Q=oe&&oe.mapping===or?oe.image.height:null,le=f[M.type];M.precision!==null&&(h=n.getMaxPrecision(M.precision),h!==M.precision&&we("WebGLProgram.getParameters:",M.precision,"not supported, using",h,"instead."));const ie=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,H=ie!==void 0?ie.length:0;let W=0;L.morphAttributes.position!==void 0&&(W=1),L.morphAttributes.normal!==void 0&&(W=2),L.morphAttributes.color!==void 0&&(W=3);let X,te,K,fe;if(le){const st=rn[le];X=st.vertexShader,te=st.fragmentShader}else X=M.vertexShader,te=M.fragmentShader,o.update(M),K=o.getVertexShaderID(M),fe=o.getFragmentShaderID(M);const me=r.getRenderTarget(),Ce=r.state.buffers.depth.getReversed(),Ge=k.isInstancedMesh===!0,ke=k.isBatchedMesh===!0,ft=!!M.map,je=!!M.matcap,de=!!oe,xe=!!M.aoMap,pe=!!M.lightMap,Re=!!M.bumpMap,Ee=!!M.normalMap,Je=!!M.displacementMap,D=!!M.emissiveMap,Qe=!!M.metalnessMap,Be=!!M.roughnessMap,et=M.anisotropy>0,U=M.clearcoat>0,q=M.dispersion>0,w=M.iridescence>0,b=M.sheen>0,N=M.transmission>0,J=et&&!!M.anisotropyMap,ue=U&&!!M.clearcoatMap,re=U&&!!M.clearcoatNormalMap,ge=U&&!!M.clearcoatRoughnessMap,ee=w&&!!M.iridescenceMap,j=w&&!!M.iridescenceThicknessMap,Me=b&&!!M.sheenColorMap,Te=b&&!!M.sheenRoughnessMap,ye=!!M.specularMap,ve=!!M.specularColorMap,He=!!M.specularIntensityMap,Ye=N&&!!M.transmissionMap,ht=N&&!!M.thicknessMap,O=!!M.gradientMap,be=!!M.alphaMap,ce=M.alphaTest>0,De=!!M.alphaHash,Se=!!M.extensions;let _e=Vn;M.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(_e=r.toneMapping);const We={shaderID:le,shaderType:M.type,shaderName:M.name,vertexShader:X,fragmentShader:te,defines:M.defines,customVertexShaderID:K,customFragmentShaderID:fe,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:h,batching:ke,batchingColor:ke&&k._colorsTexture!==null,instancing:Ge,instancingColor:Ge&&k.instanceColor!==null,instancingMorph:Ge&&k.morphTexture!==null,outputColorSpace:me===null?r.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:dt.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:ft,matcap:je,envMap:de,envMapMode:de&&oe.mapping,envMapCubeUVHeight:Q,aoMap:xe,lightMap:pe,bumpMap:Re,normalMap:Ee,displacementMap:Je,emissiveMap:D,normalMapObjectSpace:Ee&&M.normalMapType===Ff,normalMapTangentSpace:Ee&&M.normalMapType===Mi,packedNormalMap:Ee&&M.normalMapType===Mi&&Rb(M.normalMap.format),metalnessMap:Qe,roughnessMap:Be,anisotropy:et,anisotropyMap:J,clearcoat:U,clearcoatMap:ue,clearcoatNormalMap:re,clearcoatRoughnessMap:ge,dispersion:q,iridescence:w,iridescenceMap:ee,iridescenceThicknessMap:j,sheen:b,sheenColorMap:Me,sheenRoughnessMap:Te,specularMap:ye,specularColorMap:ve,specularIntensityMap:He,transmission:N,transmissionMap:Ye,thicknessMap:ht,gradientMap:O,opaque:M.transparent===!1&&M.blending===fs&&M.alphaToCoverage===!1,alphaMap:be,alphaTest:ce,alphaHash:De,combine:M.combine,mapUv:ft&&p(M.map.channel),aoMapUv:xe&&p(M.aoMap.channel),lightMapUv:pe&&p(M.lightMap.channel),bumpMapUv:Re&&p(M.bumpMap.channel),normalMapUv:Ee&&p(M.normalMap.channel),displacementMapUv:Je&&p(M.displacementMap.channel),emissiveMapUv:D&&p(M.emissiveMap.channel),metalnessMapUv:Qe&&p(M.metalnessMap.channel),roughnessMapUv:Be&&p(M.roughnessMap.channel),anisotropyMapUv:J&&p(M.anisotropyMap.channel),clearcoatMapUv:ue&&p(M.clearcoatMap.channel),clearcoatNormalMapUv:re&&p(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&p(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&p(M.iridescenceMap.channel),iridescenceThicknessMapUv:j&&p(M.iridescenceThicknessMap.channel),sheenColorMapUv:Me&&p(M.sheenColorMap.channel),sheenRoughnessMapUv:Te&&p(M.sheenRoughnessMap.channel),specularMapUv:ye&&p(M.specularMap.channel),specularColorMapUv:ve&&p(M.specularColorMap.channel),specularIntensityMapUv:He&&p(M.specularIntensityMap.channel),transmissionMapUv:Ye&&p(M.transmissionMap.channel),thicknessMapUv:ht&&p(M.thicknessMap.channel),alphaMapUv:be&&p(M.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(Ee||et),vertexNormals:!!L.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!L.attributes.uv&&(ft||be),fog:!!z,useFog:M.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||L.attributes.normal===void 0&&Ee===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ce,skinning:k.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:H,morphTextureStride:W,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:Z.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&I.length>0,shadowMapType:r.shadowMap.type,toneMapping:_e,decodeVideoTexture:ft&&M.map.isVideoTexture===!0&&dt.getTransfer(M.map.colorSpace)===vt,decodeVideoTextureEmissive:D&&M.emissiveMap.isVideoTexture===!0&&dt.getTransfer(M.emissiveMap.colorSpace)===vt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===ei,flipSided:M.side===cn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Se&&M.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&M.extensions.multiDraw===!0||ke)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return We.vertexUv1s=l.has(1),We.vertexUv2s=l.has(2),We.vertexUv3s=l.has(3),l.clear(),We}function g(M){const T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(const I in M.defines)T.push(I),T.push(M.defines[I]);return M.isRawShaderMaterial===!1&&(m(T,M),x(T,M),T.push(r.outputColorSpace)),T.push(M.customProgramCacheKey),T.join()}function m(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function x(M,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),M.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),M.push(a.mask)}function _(M){const T=f[M.type];let I;if(T){const P=rn[T];I=Hl.clone(P.uniforms)}else I=M.uniforms;return I}function y(M,T){let I=u.get(T);return I!==void 0?++I.usedTimes:(I=new Eb(r,T,M,i),c.push(I),u.set(T,I)),I}function E(M){if(--M.usedTimes===0){const T=c.indexOf(M);c[T]=c[c.length-1],c.pop(),u.delete(M.cacheKey),M.destroy()}}function S(M){o.remove(M)}function C(){o.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:_,acquireProgram:y,releaseProgram:E,releaseShaderCache:S,programs:c,dispose:C}}function Pb(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function Lb(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function Zd(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Jd(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,p,v,g,m){let x=r[e];return x===void 0?(x={id:h.id,object:h,geometry:f,material:p,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:g,group:m},r[e]=x):(x.id=h.id,x.object=h,x.geometry=f,x.material=p,x.materialVariant=a(h),x.groupOrder=v,x.renderOrder=h.renderOrder,x.z=g,x.group=m),e++,x}function l(h,f,p,v,g,m){const x=o(h,f,p,v,g,m);p.transmission>0?n.push(x):p.transparent===!0?i.push(x):t.push(x)}function c(h,f,p,v,g,m){const x=o(h,f,p,v,g,m);p.transmission>0?n.unshift(x):p.transparent===!0?i.unshift(x):t.unshift(x)}function u(h,f){t.length>1&&t.sort(h||Lb),n.length>1&&n.sort(f||Zd),i.length>1&&i.sort(f||Zd)}function d(){for(let h=e,f=r.length;h<f;h++){const p=r[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:l,unshift:c,finish:d,sort:u}}function Db(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new Jd,r.set(n,[a])):i>=s.length?(a=new Jd,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function Ub(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new Pe};break;case"SpotLight":t={position:new R,direction:new R,color:new Pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Pe,groundColor:new Pe};break;case"RectAreaLight":t={color:new Pe,position:new R,halfWidth:new R,halfHeight:new R};break}return r[e.id]=t,t}}}function Nb(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let Fb=0;function Ob(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Bb(r){const e=new Ub,t=Nb(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);const i=new R,s=new tt,a=new tt;function o(c){let u=0,d=0,h=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let f=0,p=0,v=0,g=0,m=0,x=0,_=0,y=0,E=0,S=0,C=0;c.sort(Ob);for(let T=0,I=c.length;T<I;T++){const P=c[T],k=P.color,Z=P.intensity,z=P.distance;let L=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Gi?L=P.shadow.map.texture:L=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=k.r*Z,d+=k.g*Z,h+=k.b*Z;else if(P.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(P.sh.coefficients[B],Z);C++}else if(P.isDirectionalLight){const B=e.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const V=P.shadow,oe=t.get(P);oe.shadowIntensity=V.intensity,oe.shadowBias=V.bias,oe.shadowNormalBias=V.normalBias,oe.shadowRadius=V.radius,oe.shadowMapSize=V.mapSize,n.directionalShadow[f]=oe,n.directionalShadowMap[f]=L,n.directionalShadowMatrix[f]=P.shadow.matrix,x++}n.directional[f]=B,f++}else if(P.isSpotLight){const B=e.get(P);B.position.setFromMatrixPosition(P.matrixWorld),B.color.copy(k).multiplyScalar(Z),B.distance=z,B.coneCos=Math.cos(P.angle),B.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),B.decay=P.decay,n.spot[v]=B;const V=P.shadow;if(P.map&&(n.spotLightMap[E]=P.map,E++,V.updateMatrices(P),P.castShadow&&S++),n.spotLightMatrix[v]=V.matrix,P.castShadow){const oe=t.get(P);oe.shadowIntensity=V.intensity,oe.shadowBias=V.bias,oe.shadowNormalBias=V.normalBias,oe.shadowRadius=V.radius,oe.shadowMapSize=V.mapSize,n.spotShadow[v]=oe,n.spotShadowMap[v]=L,y++}v++}else if(P.isRectAreaLight){const B=e.get(P);B.color.copy(k).multiplyScalar(Z),B.halfWidth.set(P.width*.5,0,0),B.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=B,g++}else if(P.isPointLight){const B=e.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),B.distance=P.distance,B.decay=P.decay,P.castShadow){const V=P.shadow,oe=t.get(P);oe.shadowIntensity=V.intensity,oe.shadowBias=V.bias,oe.shadowNormalBias=V.normalBias,oe.shadowRadius=V.radius,oe.shadowMapSize=V.mapSize,oe.shadowCameraNear=V.camera.near,oe.shadowCameraFar=V.camera.far,n.pointShadow[p]=oe,n.pointShadowMap[p]=L,n.pointShadowMatrix[p]=P.shadow.matrix,_++}n.point[p]=B,p++}else if(P.isHemisphereLight){const B=e.get(P);B.skyColor.copy(P.color).multiplyScalar(Z),B.groundColor.copy(P.groundColor).multiplyScalar(Z),n.hemi[m]=B,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const M=n.hash;(M.directionalLength!==f||M.pointLength!==p||M.spotLength!==v||M.rectAreaLength!==g||M.hemiLength!==m||M.numDirectionalShadows!==x||M.numPointShadows!==_||M.numSpotShadows!==y||M.numSpotMaps!==E||M.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=y+E-S,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=C,M.directionalLength=f,M.pointLength=p,M.spotLength=v,M.rectAreaLength=g,M.hemiLength=m,M.numDirectionalShadows=x,M.numPointShadows=_,M.numSpotShadows=y,M.numSpotMaps=E,M.numLightProbes=C,n.version=Fb++)}function l(c,u){let d=0,h=0,f=0,p=0,v=0;const g=u.matrixWorldInverse;for(let m=0,x=c.length;m<x;m++){const _=c[m];if(_.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),d++}else if(_.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(_.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),a.identity(),s.copy(_.matrixWorld),s.premultiply(g),a.extractRotation(s),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),p++}else if(_.isPointLight){const y=n.point[h];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),h++}else if(_.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function Kd(r){const e=new Bb(r),t=[],n=[],i=[];function s(h){d.camera=h,t.length=0,n.length=0,i.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function l(h){i.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function kb(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new Kd(r),e.set(i,[o])):s>=a.length?(o=new Kd(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const zb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vb=`uniform sampler2D shadow_pass;
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
}`,Gb=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],Hb=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],jd=new tt,Rr=new R,Vc=new R;function Wb(r,e,t){let n=new cr;const i=new he,s=new he,a=new pt,o=new Yu,l=new Zu,c={},u=t.maxTextureSize,d={[yi]:cn,[cn]:yi,[ei]:ei},h=new Tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:zb,fragmentShader:Vb}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const p=new it;p.setAttribute("position",new bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Mt(p,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Dr;let m=this.type;this.render=function(S,C,M){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===uf&&(we("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Dr);const T=r.getRenderTarget(),I=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),k=r.state;k.setBlending(ri),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const Z=m!==this.type;Z&&C.traverse(function(z){z.material&&(Array.isArray(z.material)?z.material.forEach(L=>L.needsUpdate=!0):z.material.needsUpdate=!0)});for(let z=0,L=S.length;z<L;z++){const B=S[z],V=B.shadow;if(V===void 0){we("WebGLShadowMap:",B,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const oe=V.getFrameExtents();i.multiply(oe),s.copy(V.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/oe.x),i.x=s.x*oe.x,V.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/oe.y),i.y=s.y*oe.y,V.mapSize.y=s.y));const Q=r.state.buffers.depth.getReversed();if(V.camera._reversedDepth=Q,V.map===null||Z===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Zs){if(B.isPointLight){we("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new An(i.x,i.y,{format:Gi,type:oi,minFilter:Ct,magFilter:Ct,generateMipmaps:!1}),V.map.texture.name=B.name+".shadowMap",V.map.depthTexture=new ys(i.x,i.y,on),V.map.depthTexture.name=B.name+".shadowMapDepth",V.map.depthTexture.format=li,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ot,V.map.depthTexture.magFilter=Ot}else B.isPointLight?(V.map=new oh(i.x),V.map.depthTexture=new ip(i.x,Ln)):(V.map=new An(i.x,i.y),V.map.depthTexture=new ys(i.x,i.y,Ln)),V.map.depthTexture.name=B.name+".shadowMap",V.map.depthTexture.format=li,this.type===Dr?(V.map.depthTexture.compareFunction=Q?bl:Ml,V.map.depthTexture.minFilter=Ct,V.map.depthTexture.magFilter=Ct):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ot,V.map.depthTexture.magFilter=Ot);V.camera.updateProjectionMatrix()}const le=V.map.isWebGLCubeRenderTarget?6:1;for(let ie=0;ie<le;ie++){if(V.map.isWebGLCubeRenderTarget)r.setRenderTarget(V.map,ie),r.clear();else{ie===0&&(r.setRenderTarget(V.map),r.clear());const H=V.getViewport(ie);a.set(s.x*H.x,s.y*H.y,s.x*H.z,s.y*H.w),k.viewport(a)}if(B.isPointLight){const H=V.camera,W=V.matrix,X=B.distance||H.far;X!==H.far&&(H.far=X,H.updateProjectionMatrix()),Rr.setFromMatrixPosition(B.matrixWorld),H.position.copy(Rr),Vc.copy(H.position),Vc.add(Gb[ie]),H.up.copy(Hb[ie]),H.lookAt(Vc),H.updateMatrixWorld(),W.makeTranslation(-Rr.x,-Rr.y,-Rr.z),jd.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),V._frustum.setFromProjectionMatrix(jd,H.coordinateSystem,H.reversedDepth)}else V.updateMatrices(B);n=V.getFrustum(),y(C,M,V.camera,B,this.type)}V.isPointLightShadow!==!0&&this.type===Zs&&x(V,M),V.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(T,I,P)};function x(S,C){const M=e.update(v);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new An(i.x,i.y,{format:Gi,type:oi})),h.uniforms.shadow_pass.value=S.map.depthTexture,h.uniforms.resolution.value=S.mapSize,h.uniforms.radius.value=S.radius,r.setRenderTarget(S.mapPass),r.clear(),r.renderBufferDirect(C,null,M,h,v,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,r.setRenderTarget(S.map),r.clear(),r.renderBufferDirect(C,null,M,f,v,null)}function _(S,C,M,T){let I=null;const P=M.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)I=P;else if(I=M.isPointLight===!0?l:o,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const k=I.uuid,Z=C.uuid;let z=c[k];z===void 0&&(z={},c[k]=z);let L=z[Z];L===void 0&&(L=I.clone(),z[Z]=L,C.addEventListener("dispose",E)),I=L}if(I.visible=C.visible,I.wireframe=C.wireframe,T===Zs?I.side=C.shadowSide!==null?C.shadowSide:C.side:I.side=C.shadowSide!==null?C.shadowSide:d[C.side],I.alphaMap=C.alphaMap,I.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,I.map=C.map,I.clipShadows=C.clipShadows,I.clippingPlanes=C.clippingPlanes,I.clipIntersection=C.clipIntersection,I.displacementMap=C.displacementMap,I.displacementScale=C.displacementScale,I.displacementBias=C.displacementBias,I.wireframeLinewidth=C.wireframeLinewidth,I.linewidth=C.linewidth,M.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const k=r.properties.get(I);k.light=M}return I}function y(S,C,M,T,I){if(S.visible===!1)return;if(S.layers.test(C.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&I===Zs)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,S.matrixWorld);const Z=e.update(S),z=S.material;if(Array.isArray(z)){const L=Z.groups;for(let B=0,V=L.length;B<V;B++){const oe=L[B],Q=z[oe.materialIndex];if(Q&&Q.visible){const le=_(S,Q,T,I);S.onBeforeShadow(r,S,C,M,Z,le,oe),r.renderBufferDirect(M,null,Z,le,S,oe),S.onAfterShadow(r,S,C,M,Z,le,oe)}}}else if(z.visible){const L=_(S,z,T,I);S.onBeforeShadow(r,S,C,M,Z,L,null),r.renderBufferDirect(M,null,Z,L,S,null),S.onAfterShadow(r,S,C,M,Z,L,null)}}const k=S.children;for(let Z=0,z=k.length;Z<z;Z++)y(k[Z],C,M,T,I)}function E(S){S.target.removeEventListener("dispose",E);for(const M in c){const T=c[M],I=S.target.uuid;I in T&&(T[I].dispose(),delete T[I])}}}function Xb(r,e){function t(){let O=!1;const be=new pt;let ce=null;const De=new pt(0,0,0,0);return{setMask:function(Se){ce!==Se&&!O&&(r.colorMask(Se,Se,Se,Se),ce=Se)},setLocked:function(Se){O=Se},setClear:function(Se,_e,We,st,Dt){Dt===!0&&(Se*=st,_e*=st,We*=st),be.set(Se,_e,We,st),De.equals(be)===!1&&(r.clearColor(Se,_e,We,st),De.copy(be))},reset:function(){O=!1,ce=null,De.set(-1,0,0,0)}}}function n(){let O=!1,be=!1,ce=null,De=null,Se=null;return{setReversed:function(_e){if(be!==_e){const We=e.get("EXT_clip_control");_e?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT),be=_e;const st=Se;Se=null,this.setClear(st)}},getReversed:function(){return be},setTest:function(_e){_e?me(r.DEPTH_TEST):Ce(r.DEPTH_TEST)},setMask:function(_e){ce!==_e&&!O&&(r.depthMask(_e),ce=_e)},setFunc:function(_e){if(be&&(_e=ug[_e]),De!==_e){switch(_e){case yo:r.depthFunc(r.NEVER);break;case Mo:r.depthFunc(r.ALWAYS);break;case bo:r.depthFunc(r.LESS);break;case vs:r.depthFunc(r.LEQUAL);break;case So:r.depthFunc(r.EQUAL);break;case wo:r.depthFunc(r.GEQUAL);break;case Eo:r.depthFunc(r.GREATER);break;case Ao:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}De=_e}},setLocked:function(_e){O=_e},setClear:function(_e){Se!==_e&&(Se=_e,be&&(_e=1-_e),r.clearDepth(_e))},reset:function(){O=!1,ce=null,De=null,Se=null,be=!1}}}function i(){let O=!1,be=null,ce=null,De=null,Se=null,_e=null,We=null,st=null,Dt=null;return{setTest:function(xt){O||(xt?me(r.STENCIL_TEST):Ce(r.STENCIL_TEST))},setMask:function(xt){be!==xt&&!O&&(r.stencilMask(xt),be=xt)},setFunc:function(xt,ui,qn){(ce!==xt||De!==ui||Se!==qn)&&(r.stencilFunc(xt,ui,qn),ce=xt,De=ui,Se=qn)},setOp:function(xt,ui,qn){(_e!==xt||We!==ui||st!==qn)&&(r.stencilOp(xt,ui,qn),_e=xt,We=ui,st=qn)},setLocked:function(xt){O=xt},setClear:function(xt){Dt!==xt&&(r.clearStencil(xt),Dt=xt)},reset:function(){O=!1,be=null,ce=null,De=null,Se=null,_e=null,We=null,st=null,Dt=null}}}const s=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let u={},d={},h={},f=new WeakMap,p=[],v=null,g=!1,m=null,x=null,_=null,y=null,E=null,S=null,C=null,M=new Pe(0,0,0),T=0,I=!1,P=null,k=null,Z=null,z=null,L=null;const B=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,oe=0;const Q=r.getParameter(r.VERSION);Q.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec(Q)[1]),V=oe>=1):Q.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),V=oe>=2);let le=null,ie={};const H=r.getParameter(r.SCISSOR_BOX),W=r.getParameter(r.VIEWPORT),X=new pt().fromArray(H),te=new pt().fromArray(W);function K(O,be,ce,De){const Se=new Uint8Array(4),_e=r.createTexture();r.bindTexture(O,_e),r.texParameteri(O,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(O,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let We=0;We<ce;We++)O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY?r.texImage3D(be,0,r.RGBA,1,1,De,0,r.RGBA,r.UNSIGNED_BYTE,Se):r.texImage2D(be+We,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Se);return _e}const fe={};fe[r.TEXTURE_2D]=K(r.TEXTURE_2D,r.TEXTURE_2D,1),fe[r.TEXTURE_CUBE_MAP]=K(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),fe[r.TEXTURE_2D_ARRAY]=K(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),fe[r.TEXTURE_3D]=K(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),me(r.DEPTH_TEST),a.setFunc(vs),Re(!1),Ee(Zc),me(r.CULL_FACE),xe(ri);function me(O){u[O]!==!0&&(r.enable(O),u[O]=!0)}function Ce(O){u[O]!==!1&&(r.disable(O),u[O]=!1)}function Ge(O,be){return h[O]!==be?(r.bindFramebuffer(O,be),h[O]=be,O===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=be),O===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=be),!0):!1}function ke(O,be){let ce=p,De=!1;if(O){ce=f.get(be),ce===void 0&&(ce=[],f.set(be,ce));const Se=O.textures;if(ce.length!==Se.length||ce[0]!==r.COLOR_ATTACHMENT0){for(let _e=0,We=Se.length;_e<We;_e++)ce[_e]=r.COLOR_ATTACHMENT0+_e;ce.length=Se.length,De=!0}}else ce[0]!==r.BACK&&(ce[0]=r.BACK,De=!0);De&&r.drawBuffers(ce)}function ft(O){return v!==O?(r.useProgram(O),v=O,!0):!1}const je={[Fi]:r.FUNC_ADD,[df]:r.FUNC_SUBTRACT,[ff]:r.FUNC_REVERSE_SUBTRACT};je[pf]=r.MIN,je[mf]=r.MAX;const de={[gf]:r.ZERO,[_f]:r.ONE,[vf]:r.SRC_COLOR,[vo]:r.SRC_ALPHA,[wf]:r.SRC_ALPHA_SATURATE,[bf]:r.DST_COLOR,[yf]:r.DST_ALPHA,[xf]:r.ONE_MINUS_SRC_COLOR,[xo]:r.ONE_MINUS_SRC_ALPHA,[Sf]:r.ONE_MINUS_DST_COLOR,[Mf]:r.ONE_MINUS_DST_ALPHA,[Ef]:r.CONSTANT_COLOR,[Af]:r.ONE_MINUS_CONSTANT_COLOR,[Tf]:r.CONSTANT_ALPHA,[Cf]:r.ONE_MINUS_CONSTANT_ALPHA};function xe(O,be,ce,De,Se,_e,We,st,Dt,xt){if(O===ri){g===!0&&(Ce(r.BLEND),g=!1);return}if(g===!1&&(me(r.BLEND),g=!0),O!==hf){if(O!==m||xt!==I){if((x!==Fi||E!==Fi)&&(r.blendEquation(r.FUNC_ADD),x=Fi,E=Fi),xt)switch(O){case fs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Jc:r.blendFunc(r.ONE,r.ONE);break;case Kc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case jc:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:ze("WebGLState: Invalid blending: ",O);break}else switch(O){case fs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Jc:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Kc:ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case jc:ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ze("WebGLState: Invalid blending: ",O);break}_=null,y=null,S=null,C=null,M.set(0,0,0),T=0,m=O,I=xt}return}Se=Se||be,_e=_e||ce,We=We||De,(be!==x||Se!==E)&&(r.blendEquationSeparate(je[be],je[Se]),x=be,E=Se),(ce!==_||De!==y||_e!==S||We!==C)&&(r.blendFuncSeparate(de[ce],de[De],de[_e],de[We]),_=ce,y=De,S=_e,C=We),(st.equals(M)===!1||Dt!==T)&&(r.blendColor(st.r,st.g,st.b,Dt),M.copy(st),T=Dt),m=O,I=!1}function pe(O,be){O.side===ei?Ce(r.CULL_FACE):me(r.CULL_FACE);let ce=O.side===cn;be&&(ce=!ce),Re(ce),O.blending===fs&&O.transparent===!1?xe(ri):xe(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),s.setMask(O.colorWrite);const De=O.stencilWrite;o.setTest(De),De&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),D(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?me(r.SAMPLE_ALPHA_TO_COVERAGE):Ce(r.SAMPLE_ALPHA_TO_COVERAGE)}function Re(O){P!==O&&(O?r.frontFace(r.CW):r.frontFace(r.CCW),P=O)}function Ee(O){O!==lf?(me(r.CULL_FACE),O!==k&&(O===Zc?r.cullFace(r.BACK):O===cf?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ce(r.CULL_FACE),k=O}function Je(O){O!==Z&&(V&&r.lineWidth(O),Z=O)}function D(O,be,ce){O?(me(r.POLYGON_OFFSET_FILL),(z!==be||L!==ce)&&(z=be,L=ce,a.getReversed()&&(be=-be),r.polygonOffset(be,ce))):Ce(r.POLYGON_OFFSET_FILL)}function Qe(O){O?me(r.SCISSOR_TEST):Ce(r.SCISSOR_TEST)}function Be(O){O===void 0&&(O=r.TEXTURE0+B-1),le!==O&&(r.activeTexture(O),le=O)}function et(O,be,ce){ce===void 0&&(le===null?ce=r.TEXTURE0+B-1:ce=le);let De=ie[ce];De===void 0&&(De={type:void 0,texture:void 0},ie[ce]=De),(De.type!==O||De.texture!==be)&&(le!==ce&&(r.activeTexture(ce),le=ce),r.bindTexture(O,be||fe[O]),De.type=O,De.texture=be)}function U(){const O=ie[le];O!==void 0&&O.type!==void 0&&(r.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function q(){try{r.compressedTexImage2D(...arguments)}catch(O){ze("WebGLState:",O)}}function w(){try{r.compressedTexImage3D(...arguments)}catch(O){ze("WebGLState:",O)}}function b(){try{r.texSubImage2D(...arguments)}catch(O){ze("WebGLState:",O)}}function N(){try{r.texSubImage3D(...arguments)}catch(O){ze("WebGLState:",O)}}function J(){try{r.compressedTexSubImage2D(...arguments)}catch(O){ze("WebGLState:",O)}}function ue(){try{r.compressedTexSubImage3D(...arguments)}catch(O){ze("WebGLState:",O)}}function re(){try{r.texStorage2D(...arguments)}catch(O){ze("WebGLState:",O)}}function ge(){try{r.texStorage3D(...arguments)}catch(O){ze("WebGLState:",O)}}function ee(){try{r.texImage2D(...arguments)}catch(O){ze("WebGLState:",O)}}function j(){try{r.texImage3D(...arguments)}catch(O){ze("WebGLState:",O)}}function Me(O){return d[O]!==void 0?d[O]:r.getParameter(O)}function Te(O,be){d[O]!==be&&(r.pixelStorei(O,be),d[O]=be)}function ye(O){X.equals(O)===!1&&(r.scissor(O.x,O.y,O.z,O.w),X.copy(O))}function ve(O){te.equals(O)===!1&&(r.viewport(O.x,O.y,O.z,O.w),te.copy(O))}function He(O,be){let ce=c.get(be);ce===void 0&&(ce=new WeakMap,c.set(be,ce));let De=ce.get(O);De===void 0&&(De=r.getUniformBlockIndex(be,O.name),ce.set(O,De))}function Ye(O,be){const De=c.get(be).get(O);l.get(be)!==De&&(r.uniformBlockBinding(be,De,O.__bindingPointIndex),l.set(be,De))}function ht(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),u={},d={},le=null,ie={},h={},f=new WeakMap,p=[],v=null,g=!1,m=null,x=null,_=null,y=null,E=null,S=null,C=null,M=new Pe(0,0,0),T=0,I=!1,P=null,k=null,Z=null,z=null,L=null,X.set(0,0,r.canvas.width,r.canvas.height),te.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:me,disable:Ce,bindFramebuffer:Ge,drawBuffers:ke,useProgram:ft,setBlending:xe,setMaterial:pe,setFlipSided:Re,setCullFace:Ee,setLineWidth:Je,setPolygonOffset:D,setScissorTest:Qe,activeTexture:Be,bindTexture:et,unbindTexture:U,compressedTexImage2D:q,compressedTexImage3D:w,texImage2D:ee,texImage3D:j,pixelStorei:Te,getParameter:Me,updateUBOMapping:He,uniformBlockBinding:Ye,texStorage2D:re,texStorage3D:ge,texSubImage2D:b,texSubImage3D:N,compressedTexSubImage2D:J,compressedTexSubImage3D:ue,scissor:ye,viewport:ve,reset:ht}}function qb(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new he,u=new WeakMap,d=new Set;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(w,b){return p?new OffscreenCanvas(w,b):Qr("canvas")}function g(w,b,N){let J=1;const ue=q(w);if((ue.width>N||ue.height>N)&&(J=N/Math.max(ue.width,ue.height)),J<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const re=Math.floor(J*ue.width),ge=Math.floor(J*ue.height);h===void 0&&(h=v(re,ge));const ee=b?v(re,ge):h;return ee.width=re,ee.height=ge,ee.getContext("2d").drawImage(w,0,0,re,ge),we("WebGLRenderer: Texture has been resized from ("+ue.width+"x"+ue.height+") to ("+re+"x"+ge+")."),ee}else return"data"in w&&we("WebGLRenderer: Image in DataTexture is too big ("+ue.width+"x"+ue.height+")."),w;return w}function m(w){return w.generateMipmaps}function x(w){r.generateMipmap(w)}function _(w){return w.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?r.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(w,b,N,J,ue,re=!1){if(w!==null){if(r[w]!==void 0)return r[w];we("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ge;J&&(ge=e.get("EXT_texture_norm16"),ge||we("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ee=b;if(b===r.RED&&(N===r.FLOAT&&(ee=r.R32F),N===r.HALF_FLOAT&&(ee=r.R16F),N===r.UNSIGNED_BYTE&&(ee=r.R8),N===r.UNSIGNED_SHORT&&ge&&(ee=ge.R16_EXT),N===r.SHORT&&ge&&(ee=ge.R16_SNORM_EXT)),b===r.RED_INTEGER&&(N===r.UNSIGNED_BYTE&&(ee=r.R8UI),N===r.UNSIGNED_SHORT&&(ee=r.R16UI),N===r.UNSIGNED_INT&&(ee=r.R32UI),N===r.BYTE&&(ee=r.R8I),N===r.SHORT&&(ee=r.R16I),N===r.INT&&(ee=r.R32I)),b===r.RG&&(N===r.FLOAT&&(ee=r.RG32F),N===r.HALF_FLOAT&&(ee=r.RG16F),N===r.UNSIGNED_BYTE&&(ee=r.RG8),N===r.UNSIGNED_SHORT&&ge&&(ee=ge.RG16_EXT),N===r.SHORT&&ge&&(ee=ge.RG16_SNORM_EXT)),b===r.RG_INTEGER&&(N===r.UNSIGNED_BYTE&&(ee=r.RG8UI),N===r.UNSIGNED_SHORT&&(ee=r.RG16UI),N===r.UNSIGNED_INT&&(ee=r.RG32UI),N===r.BYTE&&(ee=r.RG8I),N===r.SHORT&&(ee=r.RG16I),N===r.INT&&(ee=r.RG32I)),b===r.RGB_INTEGER&&(N===r.UNSIGNED_BYTE&&(ee=r.RGB8UI),N===r.UNSIGNED_SHORT&&(ee=r.RGB16UI),N===r.UNSIGNED_INT&&(ee=r.RGB32UI),N===r.BYTE&&(ee=r.RGB8I),N===r.SHORT&&(ee=r.RGB16I),N===r.INT&&(ee=r.RGB32I)),b===r.RGBA_INTEGER&&(N===r.UNSIGNED_BYTE&&(ee=r.RGBA8UI),N===r.UNSIGNED_SHORT&&(ee=r.RGBA16UI),N===r.UNSIGNED_INT&&(ee=r.RGBA32UI),N===r.BYTE&&(ee=r.RGBA8I),N===r.SHORT&&(ee=r.RGBA16I),N===r.INT&&(ee=r.RGBA32I)),b===r.RGB&&(N===r.UNSIGNED_SHORT&&ge&&(ee=ge.RGB16_EXT),N===r.SHORT&&ge&&(ee=ge.RGB16_SNORM_EXT),N===r.UNSIGNED_INT_5_9_9_9_REV&&(ee=r.RGB9_E5),N===r.UNSIGNED_INT_10F_11F_11F_REV&&(ee=r.R11F_G11F_B10F)),b===r.RGBA){const j=re?Kr:dt.getTransfer(ue);N===r.FLOAT&&(ee=r.RGBA32F),N===r.HALF_FLOAT&&(ee=r.RGBA16F),N===r.UNSIGNED_BYTE&&(ee=j===vt?r.SRGB8_ALPHA8:r.RGBA8),N===r.UNSIGNED_SHORT&&ge&&(ee=ge.RGBA16_EXT),N===r.SHORT&&ge&&(ee=ge.RGBA16_SNORM_EXT),N===r.UNSIGNED_SHORT_4_4_4_4&&(ee=r.RGBA4),N===r.UNSIGNED_SHORT_5_5_5_1&&(ee=r.RGB5_A1)}return(ee===r.R16F||ee===r.R32F||ee===r.RG16F||ee===r.RG32F||ee===r.RGBA16F||ee===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function E(w,b){let N;return w?b===null||b===Ln||b===tr?N=r.DEPTH24_STENCIL8:b===on?N=r.DEPTH32F_STENCIL8:b===er&&(N=r.DEPTH24_STENCIL8,we("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Ln||b===tr?N=r.DEPTH_COMPONENT24:b===on?N=r.DEPTH_COMPONENT32F:b===er&&(N=r.DEPTH_COMPONENT16),N}function S(w,b){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ot&&w.minFilter!==Ct?Math.log2(Math.max(b.width,b.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?b.mipmaps.length:1}function C(w){const b=w.target;b.removeEventListener("dispose",C),T(b),b.isVideoTexture&&u.delete(b),b.isHTMLTexture&&d.delete(b)}function M(w){const b=w.target;b.removeEventListener("dispose",M),P(b)}function T(w){const b=n.get(w);if(b.__webglInit===void 0)return;const N=w.source,J=f.get(N);if(J){const ue=J[b.__cacheKey];ue.usedTimes--,ue.usedTimes===0&&I(w),Object.keys(J).length===0&&f.delete(N)}n.remove(w)}function I(w){const b=n.get(w);r.deleteTexture(b.__webglTexture);const N=w.source,J=f.get(N);delete J[b.__cacheKey],a.memory.textures--}function P(w){const b=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(b.__webglFramebuffer[J]))for(let ue=0;ue<b.__webglFramebuffer[J].length;ue++)r.deleteFramebuffer(b.__webglFramebuffer[J][ue]);else r.deleteFramebuffer(b.__webglFramebuffer[J]);b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer[J])}else{if(Array.isArray(b.__webglFramebuffer))for(let J=0;J<b.__webglFramebuffer.length;J++)r.deleteFramebuffer(b.__webglFramebuffer[J]);else r.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&r.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let J=0;J<b.__webglColorRenderbuffer.length;J++)b.__webglColorRenderbuffer[J]&&r.deleteRenderbuffer(b.__webglColorRenderbuffer[J]);b.__webglDepthRenderbuffer&&r.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const N=w.textures;for(let J=0,ue=N.length;J<ue;J++){const re=n.get(N[J]);re.__webglTexture&&(r.deleteTexture(re.__webglTexture),a.memory.textures--),n.remove(N[J])}n.remove(w)}let k=0;function Z(){k=0}function z(){return k}function L(w){k=w}function B(){const w=k;return w>=i.maxTextures&&we("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+i.maxTextures),k+=1,w}function V(w){const b=[];return b.push(w.wrapS),b.push(w.wrapT),b.push(w.wrapR||0),b.push(w.magFilter),b.push(w.minFilter),b.push(w.anisotropy),b.push(w.internalFormat),b.push(w.format),b.push(w.type),b.push(w.generateMipmaps),b.push(w.premultiplyAlpha),b.push(w.flipY),b.push(w.unpackAlignment),b.push(w.colorSpace),b.join()}function oe(w,b){const N=n.get(w);if(w.isVideoTexture&&et(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&N.__version!==w.version){const J=w.image;if(J===null)we("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)we("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(N,w,b);return}}else w.isExternalTexture&&(N.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,N.__webglTexture,r.TEXTURE0+b)}function Q(w,b){const N=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&N.__version!==w.version){Ce(N,w,b);return}else w.isExternalTexture&&(N.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,N.__webglTexture,r.TEXTURE0+b)}function le(w,b){const N=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&N.__version!==w.version){Ce(N,w,b);return}t.bindTexture(r.TEXTURE_3D,N.__webglTexture,r.TEXTURE0+b)}function ie(w,b){const N=n.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&N.__version!==w.version){Ge(N,w,b);return}t.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+b)}const H={[Wr]:r.REPEAT,[_n]:r.CLAMP_TO_EDGE,[Xr]:r.MIRRORED_REPEAT},W={[Ot]:r.NEAREST,[bu]:r.NEAREST_MIPMAP_NEAREST,[Js]:r.NEAREST_MIPMAP_LINEAR,[Ct]:r.LINEAR,[Fr]:r.LINEAR_MIPMAP_NEAREST,[ii]:r.LINEAR_MIPMAP_LINEAR},X={[Of]:r.NEVER,[Gf]:r.ALWAYS,[Bf]:r.LESS,[Ml]:r.LEQUAL,[kf]:r.EQUAL,[bl]:r.GEQUAL,[zf]:r.GREATER,[Vf]:r.NOTEQUAL};function te(w,b){if(b.type===on&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Ct||b.magFilter===Fr||b.magFilter===Js||b.magFilter===ii||b.minFilter===Ct||b.minFilter===Fr||b.minFilter===Js||b.minFilter===ii)&&we("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(w,r.TEXTURE_WRAP_S,H[b.wrapS]),r.texParameteri(w,r.TEXTURE_WRAP_T,H[b.wrapT]),(w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY)&&r.texParameteri(w,r.TEXTURE_WRAP_R,H[b.wrapR]),r.texParameteri(w,r.TEXTURE_MAG_FILTER,W[b.magFilter]),r.texParameteri(w,r.TEXTURE_MIN_FILTER,W[b.minFilter]),b.compareFunction&&(r.texParameteri(w,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(w,r.TEXTURE_COMPARE_FUNC,X[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ot||b.minFilter!==Js&&b.minFilter!==ii||b.type===on&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");r.texParameterf(w,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function K(w,b){let N=!1;w.__webglInit===void 0&&(w.__webglInit=!0,b.addEventListener("dispose",C));const J=b.source;let ue=f.get(J);ue===void 0&&(ue={},f.set(J,ue));const re=V(b);if(re!==w.__cacheKey){ue[re]===void 0&&(ue[re]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,N=!0),ue[re].usedTimes++;const ge=ue[w.__cacheKey];ge!==void 0&&(ue[w.__cacheKey].usedTimes--,ge.usedTimes===0&&I(b)),w.__cacheKey=re,w.__webglTexture=ue[re].texture}return N}function fe(w,b,N){return Math.floor(Math.floor(w/N)/b)}function me(w,b,N,J){const re=w.updateRanges;if(re.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,b.width,b.height,N,J,b.data);else{re.sort((Te,ye)=>Te.start-ye.start);let ge=0;for(let Te=1;Te<re.length;Te++){const ye=re[ge],ve=re[Te],He=ye.start+ye.count,Ye=fe(ve.start,b.width,4),ht=fe(ye.start,b.width,4);ve.start<=He+1&&Ye===ht&&fe(ve.start+ve.count-1,b.width,4)===Ye?ye.count=Math.max(ye.count,ve.start+ve.count-ye.start):(++ge,re[ge]=ve)}re.length=ge+1;const ee=t.getParameter(r.UNPACK_ROW_LENGTH),j=t.getParameter(r.UNPACK_SKIP_PIXELS),Me=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,b.width);for(let Te=0,ye=re.length;Te<ye;Te++){const ve=re[Te],He=Math.floor(ve.start/4),Ye=Math.ceil(ve.count/4),ht=He%b.width,O=Math.floor(He/b.width),be=Ye,ce=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,ht),t.pixelStorei(r.UNPACK_SKIP_ROWS,O),t.texSubImage2D(r.TEXTURE_2D,0,ht,O,be,ce,N,J,b.data)}w.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,ee),t.pixelStorei(r.UNPACK_SKIP_PIXELS,j),t.pixelStorei(r.UNPACK_SKIP_ROWS,Me)}}function Ce(w,b,N){let J=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(J=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(J=r.TEXTURE_3D);const ue=K(w,b),re=b.source;t.bindTexture(J,w.__webglTexture,r.TEXTURE0+N);const ge=n.get(re);if(re.version!==ge.__version||ue===!0){if(t.activeTexture(r.TEXTURE0+N),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const ce=dt.getPrimaries(dt.workingColorSpace),De=b.colorSpace===_i?null:dt.getPrimaries(b.colorSpace),Se=b.colorSpace===_i||ce===De?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se)}t.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment);let j=g(b.image,!1,i.maxTextureSize);j=U(b,j);const Me=s.convert(b.format,b.colorSpace),Te=s.convert(b.type);let ye=y(b.internalFormat,Me,Te,b.normalized,b.colorSpace,b.isVideoTexture);te(J,b);let ve;const He=b.mipmaps,Ye=b.isVideoTexture!==!0,ht=ge.__version===void 0||ue===!0,O=re.dataReady,be=S(b,j);if(b.isDepthTexture)ye=E(b.format===Oi,b.type),ht&&(Ye?t.texStorage2D(r.TEXTURE_2D,1,ye,j.width,j.height):t.texImage2D(r.TEXTURE_2D,0,ye,j.width,j.height,0,Me,Te,null));else if(b.isDataTexture)if(He.length>0){Ye&&ht&&t.texStorage2D(r.TEXTURE_2D,be,ye,He[0].width,He[0].height);for(let ce=0,De=He.length;ce<De;ce++)ve=He[ce],Ye?O&&t.texSubImage2D(r.TEXTURE_2D,ce,0,0,ve.width,ve.height,Me,Te,ve.data):t.texImage2D(r.TEXTURE_2D,ce,ye,ve.width,ve.height,0,Me,Te,ve.data);b.generateMipmaps=!1}else Ye?(ht&&t.texStorage2D(r.TEXTURE_2D,be,ye,j.width,j.height),O&&me(b,j,Me,Te)):t.texImage2D(r.TEXTURE_2D,0,ye,j.width,j.height,0,Me,Te,j.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Ye&&ht&&t.texStorage3D(r.TEXTURE_2D_ARRAY,be,ye,He[0].width,He[0].height,j.depth);for(let ce=0,De=He.length;ce<De;ce++)if(ve=He[ce],b.format!==ln)if(Me!==null)if(Ye){if(O)if(b.layerUpdates.size>0){const Se=uu(ve.width,ve.height,b.format,b.type);for(const _e of b.layerUpdates){const We=ve.data.subarray(_e*Se/ve.data.BYTES_PER_ELEMENT,(_e+1)*Se/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ce,0,0,_e,ve.width,ve.height,1,Me,We)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ce,0,0,0,ve.width,ve.height,j.depth,Me,ve.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ce,ye,ve.width,ve.height,j.depth,0,ve.data,0,0);else we("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?O&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,ce,0,0,0,ve.width,ve.height,j.depth,Me,Te,ve.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ce,ye,ve.width,ve.height,j.depth,0,Me,Te,ve.data)}else{Ye&&ht&&t.texStorage2D(r.TEXTURE_2D,be,ye,He[0].width,He[0].height);for(let ce=0,De=He.length;ce<De;ce++)ve=He[ce],b.format!==ln?Me!==null?Ye?O&&t.compressedTexSubImage2D(r.TEXTURE_2D,ce,0,0,ve.width,ve.height,Me,ve.data):t.compressedTexImage2D(r.TEXTURE_2D,ce,ye,ve.width,ve.height,0,ve.data):we("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?O&&t.texSubImage2D(r.TEXTURE_2D,ce,0,0,ve.width,ve.height,Me,Te,ve.data):t.texImage2D(r.TEXTURE_2D,ce,ye,ve.width,ve.height,0,Me,Te,ve.data)}else if(b.isDataArrayTexture)if(Ye){if(ht&&t.texStorage3D(r.TEXTURE_2D_ARRAY,be,ye,j.width,j.height,j.depth),O)if(b.layerUpdates.size>0){const ce=uu(j.width,j.height,b.format,b.type);for(const De of b.layerUpdates){const Se=j.data.subarray(De*ce/j.data.BYTES_PER_ELEMENT,(De+1)*ce/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,De,j.width,j.height,1,Me,Te,Se)}b.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,Me,Te,j.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,ye,j.width,j.height,j.depth,0,Me,Te,j.data);else if(b.isData3DTexture)Ye?(ht&&t.texStorage3D(r.TEXTURE_3D,be,ye,j.width,j.height,j.depth),O&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,Me,Te,j.data)):t.texImage3D(r.TEXTURE_3D,0,ye,j.width,j.height,j.depth,0,Me,Te,j.data);else if(b.isFramebufferTexture){if(ht)if(Ye)t.texStorage2D(r.TEXTURE_2D,be,ye,j.width,j.height);else{let ce=j.width,De=j.height;for(let Se=0;Se<be;Se++)t.texImage2D(r.TEXTURE_2D,Se,ye,ce,De,0,Me,Te,null),ce>>=1,De>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in r){const ce=r.canvas;if(ce.hasAttribute("layoutsubtree")||ce.setAttribute("layoutsubtree","true"),j.parentNode!==ce){ce.appendChild(j),d.add(b),ce.onpaint=st=>{const Dt=st.changedElements;for(const xt of d)Dt.includes(xt.image)&&(xt.needsUpdate=!0)},ce.requestPaint();return}const De=0,Se=r.RGBA,_e=r.RGBA,We=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,De,Se,_e,We,j),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(He.length>0){if(Ye&&ht){const ce=q(He[0]);t.texStorage2D(r.TEXTURE_2D,be,ye,ce.width,ce.height)}for(let ce=0,De=He.length;ce<De;ce++)ve=He[ce],Ye?O&&t.texSubImage2D(r.TEXTURE_2D,ce,0,0,Me,Te,ve):t.texImage2D(r.TEXTURE_2D,ce,ye,Me,Te,ve);b.generateMipmaps=!1}else if(Ye){if(ht){const ce=q(j);t.texStorage2D(r.TEXTURE_2D,be,ye,ce.width,ce.height)}O&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Me,Te,j)}else t.texImage2D(r.TEXTURE_2D,0,ye,Me,Te,j);m(b)&&x(J),ge.__version=re.version,b.onUpdate&&b.onUpdate(b)}w.__version=b.version}function Ge(w,b,N){if(b.image.length!==6)return;const J=K(w,b),ue=b.source;t.bindTexture(r.TEXTURE_CUBE_MAP,w.__webglTexture,r.TEXTURE0+N);const re=n.get(ue);if(ue.version!==re.__version||J===!0){t.activeTexture(r.TEXTURE0+N);const ge=dt.getPrimaries(dt.workingColorSpace),ee=b.colorSpace===_i?null:dt.getPrimaries(b.colorSpace),j=b.colorSpace===_i||ge===ee?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const Me=b.isCompressedTexture||b.image[0].isCompressedTexture,Te=b.image[0]&&b.image[0].isDataTexture,ye=[];for(let _e=0;_e<6;_e++)!Me&&!Te?ye[_e]=g(b.image[_e],!0,i.maxCubemapSize):ye[_e]=Te?b.image[_e].image:b.image[_e],ye[_e]=U(b,ye[_e]);const ve=ye[0],He=s.convert(b.format,b.colorSpace),Ye=s.convert(b.type),ht=y(b.internalFormat,He,Ye,b.normalized,b.colorSpace),O=b.isVideoTexture!==!0,be=re.__version===void 0||J===!0,ce=ue.dataReady;let De=S(b,ve);te(r.TEXTURE_CUBE_MAP,b);let Se;if(Me){O&&be&&t.texStorage2D(r.TEXTURE_CUBE_MAP,De,ht,ve.width,ve.height);for(let _e=0;_e<6;_e++){Se=ye[_e].mipmaps;for(let We=0;We<Se.length;We++){const st=Se[We];b.format!==ln?He!==null?O?ce&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,We,0,0,st.width,st.height,He,st.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,We,ht,st.width,st.height,0,st.data):we("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,We,0,0,st.width,st.height,He,Ye,st.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,We,ht,st.width,st.height,0,He,Ye,st.data)}}}else{if(Se=b.mipmaps,O&&be){Se.length>0&&De++;const _e=q(ye[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,De,ht,_e.width,_e.height)}for(let _e=0;_e<6;_e++)if(Te){O?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,ye[_e].width,ye[_e].height,He,Ye,ye[_e].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,ht,ye[_e].width,ye[_e].height,0,He,Ye,ye[_e].data);for(let We=0;We<Se.length;We++){const Dt=Se[We].image[_e].image;O?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,We+1,0,0,Dt.width,Dt.height,He,Ye,Dt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,We+1,ht,Dt.width,Dt.height,0,He,Ye,Dt.data)}}else{O?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,He,Ye,ye[_e]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,ht,He,Ye,ye[_e]);for(let We=0;We<Se.length;We++){const st=Se[We];O?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,We+1,0,0,He,Ye,st.image[_e]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,We+1,ht,He,Ye,st.image[_e])}}}m(b)&&x(r.TEXTURE_CUBE_MAP),re.__version=ue.version,b.onUpdate&&b.onUpdate(b)}w.__version=b.version}function ke(w,b,N,J,ue,re){const ge=s.convert(N.format,N.colorSpace),ee=s.convert(N.type),j=y(N.internalFormat,ge,ee,N.normalized,N.colorSpace),Me=n.get(b),Te=n.get(N);if(Te.__renderTarget=b,!Me.__hasExternalTextures){const ye=Math.max(1,b.width>>re),ve=Math.max(1,b.height>>re);ue===r.TEXTURE_3D||ue===r.TEXTURE_2D_ARRAY?t.texImage3D(ue,re,j,ye,ve,b.depth,0,ge,ee,null):t.texImage2D(ue,re,j,ye,ve,0,ge,ee,null)}t.bindFramebuffer(r.FRAMEBUFFER,w),Be(b)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,J,ue,Te.__webglTexture,0,Qe(b)):(ue===r.TEXTURE_2D||ue>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ue<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,J,ue,Te.__webglTexture,re),t.bindFramebuffer(r.FRAMEBUFFER,null)}function ft(w,b,N){if(r.bindRenderbuffer(r.RENDERBUFFER,w),b.depthBuffer){const J=b.depthTexture,ue=J&&J.isDepthTexture?J.type:null,re=E(b.stencilBuffer,ue),ge=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Be(b)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Qe(b),re,b.width,b.height):N?r.renderbufferStorageMultisample(r.RENDERBUFFER,Qe(b),re,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,re,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ge,r.RENDERBUFFER,w)}else{const J=b.textures;for(let ue=0;ue<J.length;ue++){const re=J[ue],ge=s.convert(re.format,re.colorSpace),ee=s.convert(re.type),j=y(re.internalFormat,ge,ee,re.normalized,re.colorSpace);Be(b)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Qe(b),j,b.width,b.height):N?r.renderbufferStorageMultisample(r.RENDERBUFFER,Qe(b),j,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,j,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function je(w,b,N){const J=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,w),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ue=n.get(b.depthTexture);if(ue.__renderTarget=b,(!ue.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),J){if(ue.__webglInit===void 0&&(ue.__webglInit=!0,b.depthTexture.addEventListener("dispose",C)),ue.__webglTexture===void 0){ue.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,ue.__webglTexture),te(r.TEXTURE_CUBE_MAP,b.depthTexture);const Me=s.convert(b.depthTexture.format),Te=s.convert(b.depthTexture.type);let ye;b.depthTexture.format===li?ye=r.DEPTH_COMPONENT24:b.depthTexture.format===Oi&&(ye=r.DEPTH24_STENCIL8);for(let ve=0;ve<6;ve++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ye,b.width,b.height,0,Me,Te,null)}}else oe(b.depthTexture,0);const re=ue.__webglTexture,ge=Qe(b),ee=J?r.TEXTURE_CUBE_MAP_POSITIVE_X+N:r.TEXTURE_2D,j=b.depthTexture.format===Oi?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(b.depthTexture.format===li)Be(b)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,j,ee,re,0,ge):r.framebufferTexture2D(r.FRAMEBUFFER,j,ee,re,0);else if(b.depthTexture.format===Oi)Be(b)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,j,ee,re,0,ge):r.framebufferTexture2D(r.FRAMEBUFFER,j,ee,re,0);else throw new Error("Unknown depthTexture format")}function de(w){const b=n.get(w),N=w.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==w.depthTexture){const J=w.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),J){const ue=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,J.removeEventListener("dispose",ue)};J.addEventListener("dispose",ue),b.__depthDisposeCallback=ue}b.__boundDepthTexture=J}if(w.depthTexture&&!b.__autoAllocateDepthBuffer)if(N)for(let J=0;J<6;J++)je(b.__webglFramebuffer[J],w,J);else{const J=w.texture.mipmaps;J&&J.length>0?je(b.__webglFramebuffer[0],w,0):je(b.__webglFramebuffer,w,0)}else if(N){b.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[J]),b.__webglDepthbuffer[J]===void 0)b.__webglDepthbuffer[J]=r.createRenderbuffer(),ft(b.__webglDepthbuffer[J],w,!1);else{const ue=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,re=b.__webglDepthbuffer[J];r.bindRenderbuffer(r.RENDERBUFFER,re),r.framebufferRenderbuffer(r.FRAMEBUFFER,ue,r.RENDERBUFFER,re)}}else{const J=w.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=r.createRenderbuffer(),ft(b.__webglDepthbuffer,w,!1);else{const ue=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,re=b.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,re),r.framebufferRenderbuffer(r.FRAMEBUFFER,ue,r.RENDERBUFFER,re)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function xe(w,b,N){const J=n.get(w);b!==void 0&&ke(J.__webglFramebuffer,w,w.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),N!==void 0&&de(w)}function pe(w){const b=w.texture,N=n.get(w),J=n.get(b);w.addEventListener("dispose",M);const ue=w.textures,re=w.isWebGLCubeRenderTarget===!0,ge=ue.length>1;if(ge||(J.__webglTexture===void 0&&(J.__webglTexture=r.createTexture()),J.__version=b.version,a.memory.textures++),re){N.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(b.mipmaps&&b.mipmaps.length>0){N.__webglFramebuffer[ee]=[];for(let j=0;j<b.mipmaps.length;j++)N.__webglFramebuffer[ee][j]=r.createFramebuffer()}else N.__webglFramebuffer[ee]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){N.__webglFramebuffer=[];for(let ee=0;ee<b.mipmaps.length;ee++)N.__webglFramebuffer[ee]=r.createFramebuffer()}else N.__webglFramebuffer=r.createFramebuffer();if(ge)for(let ee=0,j=ue.length;ee<j;ee++){const Me=n.get(ue[ee]);Me.__webglTexture===void 0&&(Me.__webglTexture=r.createTexture(),a.memory.textures++)}if(w.samples>0&&Be(w)===!1){N.__webglMultisampledFramebuffer=r.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ee=0;ee<ue.length;ee++){const j=ue[ee];N.__webglColorRenderbuffer[ee]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,N.__webglColorRenderbuffer[ee]);const Me=s.convert(j.format,j.colorSpace),Te=s.convert(j.type),ye=y(j.internalFormat,Me,Te,j.normalized,j.colorSpace,w.isXRRenderTarget===!0),ve=Qe(w);r.renderbufferStorageMultisample(r.RENDERBUFFER,ve,ye,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ee,r.RENDERBUFFER,N.__webglColorRenderbuffer[ee])}r.bindRenderbuffer(r.RENDERBUFFER,null),w.depthBuffer&&(N.__webglDepthRenderbuffer=r.createRenderbuffer(),ft(N.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(re){t.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture),te(r.TEXTURE_CUBE_MAP,b);for(let ee=0;ee<6;ee++)if(b.mipmaps&&b.mipmaps.length>0)for(let j=0;j<b.mipmaps.length;j++)ke(N.__webglFramebuffer[ee][j],w,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,j);else ke(N.__webglFramebuffer[ee],w,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);m(b)&&x(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ge){for(let ee=0,j=ue.length;ee<j;ee++){const Me=ue[ee],Te=n.get(Me);let ye=r.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ye=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ye,Te.__webglTexture),te(ye,Me),ke(N.__webglFramebuffer,w,Me,r.COLOR_ATTACHMENT0+ee,ye,0),m(Me)&&x(ye)}t.unbindTexture()}else{let ee=r.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ee=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ee,J.__webglTexture),te(ee,b),b.mipmaps&&b.mipmaps.length>0)for(let j=0;j<b.mipmaps.length;j++)ke(N.__webglFramebuffer[j],w,b,r.COLOR_ATTACHMENT0,ee,j);else ke(N.__webglFramebuffer,w,b,r.COLOR_ATTACHMENT0,ee,0);m(b)&&x(ee),t.unbindTexture()}w.depthBuffer&&de(w)}function Re(w){const b=w.textures;for(let N=0,J=b.length;N<J;N++){const ue=b[N];if(m(ue)){const re=_(w),ge=n.get(ue).__webglTexture;t.bindTexture(re,ge),x(re),t.unbindTexture()}}}const Ee=[],Je=[];function D(w){if(w.samples>0){if(Be(w)===!1){const b=w.textures,N=w.width,J=w.height;let ue=r.COLOR_BUFFER_BIT;const re=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ge=n.get(w),ee=b.length>1;if(ee)for(let Me=0;Me<b.length;Me++)t.bindFramebuffer(r.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Me,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,ge.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Me,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer);const j=w.texture.mipmaps;j&&j.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let Me=0;Me<b.length;Me++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(ue|=r.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(ue|=r.STENCIL_BUFFER_BIT)),ee){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ge.__webglColorRenderbuffer[Me]);const Te=n.get(b[Me]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Te,0)}r.blitFramebuffer(0,0,N,J,0,0,N,J,ue,r.NEAREST),l===!0&&(Ee.length=0,Je.length=0,Ee.push(r.COLOR_ATTACHMENT0+Me),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Ee.push(re),Je.push(re),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Je)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ee))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ee)for(let Me=0;Me<b.length;Me++){t.bindFramebuffer(r.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Me,r.RENDERBUFFER,ge.__webglColorRenderbuffer[Me]);const Te=n.get(b[Me]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,ge.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Me,r.TEXTURE_2D,Te,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const b=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}}function Qe(w){return Math.min(i.maxSamples,w.samples)}function Be(w){const b=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function et(w){const b=a.render.frame;u.get(w)!==b&&(u.set(w,b),w.update())}function U(w,b){const N=w.colorSpace,J=w.format,ue=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||N!==Jr&&N!==_i&&(dt.getTransfer(N)===vt?(J!==ln||ue!==pn)&&we("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ze("WebGLTextures: Unsupported texture color space:",N)),b}function q(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=Z,this.getTextureUnits=z,this.setTextureUnits=L,this.setTexture2D=oe,this.setTexture2DArray=Q,this.setTexture3D=le,this.setTextureCube=ie,this.rebindTextures=xe,this.setupRenderTarget=pe,this.updateRenderTargetMipmap=Re,this.updateMultisampleRenderTarget=D,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=ke,this.useMultisampledRTT=Be,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Kp(r,e){function t(n,i=_i){let s;const a=dt.getTransfer(i);if(n===pn)return r.UNSIGNED_BYTE;if(n===ml)return r.UNSIGNED_SHORT_4_4_4_4;if(n===gl)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Eu)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Au)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Su)return r.BYTE;if(n===wu)return r.SHORT;if(n===er)return r.UNSIGNED_SHORT;if(n===pl)return r.INT;if(n===Ln)return r.UNSIGNED_INT;if(n===on)return r.FLOAT;if(n===oi)return r.HALF_FLOAT;if(n===Tu)return r.ALPHA;if(n===Cu)return r.RGB;if(n===ln)return r.RGBA;if(n===li)return r.DEPTH_COMPONENT;if(n===Oi)return r.DEPTH_STENCIL;if(n===_l)return r.RED;if(n===ha)return r.RED_INTEGER;if(n===Gi)return r.RG;if(n===vl)return r.RG_INTEGER;if(n===xl)return r.RGBA_INTEGER;if(n===Or||n===Br||n===kr||n===zr)if(a===vt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Or)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Br)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===kr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===zr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Or)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Br)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===kr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===zr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===To||n===Co||n===Ro||n===Io)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===To)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Co)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ro)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Io)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Po||n===Lo||n===Do||n===Uo||n===No||n===qr||n===Fo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Po||n===Lo)return a===vt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Do)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Uo)return s.COMPRESSED_R11_EAC;if(n===No)return s.COMPRESSED_SIGNED_R11_EAC;if(n===qr)return s.COMPRESSED_RG11_EAC;if(n===Fo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Oo||n===Bo||n===ko||n===zo||n===Vo||n===Go||n===Ho||n===Wo||n===Xo||n===qo||n===$o||n===Yo||n===Zo||n===Jo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Oo)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Bo)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ko)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===zo)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Vo)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Go)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ho)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Wo)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xo)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===qo)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===$o)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Yo)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Zo)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Jo)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ko||n===jo||n===Qo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Ko)return a===vt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===jo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Qo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===el||n===tl||n===$r||n===nl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===el)return s.COMPRESSED_RED_RGTC1_EXT;if(n===tl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===$r)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===nl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===tr?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const $b=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Yb=`
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

}`;class Zb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Bu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Tn({vertexShader:$b,fragmentShader:Yb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Mt(new dr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Jb extends Wn{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,p=null;const v=typeof XRWebGLBinding<"u",g=new Zb,m={},x=t.getContextAttributes();let _=null,y=null;const E=[],S=[],C=new he;let M=null;const T=new Xt;T.viewport=new pt;const I=new Xt;I.viewport=new pt;const P=[T,I],k=new Bp;let Z=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let fe=E[K];return fe===void 0&&(fe=new mo,E[K]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function(K){let fe=E[K];return fe===void 0&&(fe=new mo,E[K]=fe),fe.getGripSpace()},this.getHand=function(K){let fe=E[K];return fe===void 0&&(fe=new mo,E[K]=fe),fe.getHandSpace()};function L(K){const fe=S.indexOf(K.inputSource);if(fe===-1)return;const me=E[fe];me!==void 0&&(me.update(K.inputSource,K.frame,c||a),me.dispatchEvent({type:K.type,data:K.inputSource}))}function B(){i.removeEventListener("select",L),i.removeEventListener("selectstart",L),i.removeEventListener("selectend",L),i.removeEventListener("squeeze",L),i.removeEventListener("squeezestart",L),i.removeEventListener("squeezeend",L),i.removeEventListener("end",B),i.removeEventListener("inputsourceschange",V);for(let K=0;K<E.length;K++){const fe=S[K];fe!==null&&(S[K]=null,E[K].disconnect(fe))}Z=null,z=null,g.reset();for(const K in m)delete m[K];e.setRenderTarget(_),f=null,h=null,d=null,i=null,y=null,te.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,n.isPresenting===!0&&we("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&we("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(K){if(i=K,i!==null){if(_=e.getRenderTarget(),i.addEventListener("select",L),i.addEventListener("selectstart",L),i.addEventListener("selectend",L),i.addEventListener("squeeze",L),i.addEventListener("squeezestart",L),i.addEventListener("squeezeend",L),i.addEventListener("end",B),i.addEventListener("inputsourceschange",V),x.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Ce=null,Ge=null;x.depth&&(Ge=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=x.stencil?Oi:li,Ce=x.stencil?tr:Ln);const ke={colorFormat:t.RGBA8,depthFormat:Ge,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(ke),i.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new An(h.textureWidth,h.textureHeight,{format:ln,type:pn,depthTexture:new ys(h.textureWidth,h.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const me={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,me),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new An(f.framebufferWidth,f.framebufferHeight,{format:ln,type:pn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),te.setContext(i),te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function V(K){for(let fe=0;fe<K.removed.length;fe++){const me=K.removed[fe],Ce=S.indexOf(me);Ce>=0&&(S[Ce]=null,E[Ce].disconnect(me))}for(let fe=0;fe<K.added.length;fe++){const me=K.added[fe];let Ce=S.indexOf(me);if(Ce===-1){for(let ke=0;ke<E.length;ke++)if(ke>=S.length){S.push(me),Ce=ke;break}else if(S[ke]===null){S[ke]=me,Ce=ke;break}if(Ce===-1)break}const Ge=E[Ce];Ge&&Ge.connect(me)}}const oe=new R,Q=new R;function le(K,fe,me){oe.setFromMatrixPosition(fe.matrixWorld),Q.setFromMatrixPosition(me.matrixWorld);const Ce=oe.distanceTo(Q),Ge=fe.projectionMatrix.elements,ke=me.projectionMatrix.elements,ft=Ge[14]/(Ge[10]-1),je=Ge[14]/(Ge[10]+1),de=(Ge[9]+1)/Ge[5],xe=(Ge[9]-1)/Ge[5],pe=(Ge[8]-1)/Ge[0],Re=(ke[8]+1)/ke[0],Ee=ft*pe,Je=ft*Re,D=Ce/(-pe+Re),Qe=D*-pe;if(fe.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Qe),K.translateZ(D),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ge[10]===-1)K.projectionMatrix.copy(fe.projectionMatrix),K.projectionMatrixInverse.copy(fe.projectionMatrixInverse);else{const Be=ft+D,et=je+D,U=Ee-Qe,q=Je+(Ce-Qe),w=de*je/et*Be,b=xe*je/et*Be;K.projectionMatrix.makePerspective(U,q,w,b,Be,et),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ie(K,fe){fe===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(fe.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(i===null)return;let fe=K.near,me=K.far;g.texture!==null&&(g.depthNear>0&&(fe=g.depthNear),g.depthFar>0&&(me=g.depthFar)),k.near=I.near=T.near=fe,k.far=I.far=T.far=me,(Z!==k.near||z!==k.far)&&(i.updateRenderState({depthNear:k.near,depthFar:k.far}),Z=k.near,z=k.far),k.layers.mask=K.layers.mask|6,T.layers.mask=k.layers.mask&-5,I.layers.mask=k.layers.mask&-3;const Ce=K.parent,Ge=k.cameras;ie(k,Ce);for(let ke=0;ke<Ge.length;ke++)ie(Ge[ke],Ce);Ge.length===2?le(k,T,I):k.projectionMatrix.copy(T.projectionMatrix),H(K,k,Ce)};function H(K,fe,me){me===null?K.matrix.copy(fe.matrixWorld):(K.matrix.copy(me.matrixWorld),K.matrix.invert(),K.matrix.multiply(fe.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(fe.projectionMatrix),K.projectionMatrixInverse.copy(fe.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=nr*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(K){l=K,h!==null&&(h.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(k)},this.getCameraTexture=function(K){return m[K]};let W=null;function X(K,fe){if(u=fe.getViewerPose(c||a),p=fe,u!==null){const me=u.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Ce=!1;me.length!==k.cameras.length&&(k.cameras.length=0,Ce=!0);for(let je=0;je<me.length;je++){const de=me[je];let xe=null;if(f!==null)xe=f.getViewport(de);else{const Re=d.getViewSubImage(h,de);xe=Re.viewport,je===0&&(e.setRenderTargetTextures(y,Re.colorTexture,Re.depthStencilTexture),e.setRenderTarget(y))}let pe=P[je];pe===void 0&&(pe=new Xt,pe.layers.enable(je),pe.viewport=new pt,P[je]=pe),pe.matrix.fromArray(de.transform.matrix),pe.matrix.decompose(pe.position,pe.quaternion,pe.scale),pe.projectionMatrix.fromArray(de.projectionMatrix),pe.projectionMatrixInverse.copy(pe.projectionMatrix).invert(),pe.viewport.set(xe.x,xe.y,xe.width,xe.height),je===0&&(k.matrix.copy(pe.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Ce===!0&&k.cameras.push(pe)}const Ge=i.enabledFeatures;if(Ge&&Ge.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){d=n.getBinding();const je=d.getDepthInformation(me[0]);je&&je.isValid&&je.texture&&g.init(je,i.renderState)}if(Ge&&Ge.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let je=0;je<me.length;je++){const de=me[je].camera;if(de){let xe=m[de];xe||(xe=new Bu,m[de]=xe);const pe=d.getCameraImage(de);xe.sourceTexture=pe}}}}for(let me=0;me<E.length;me++){const Ce=S[me],Ge=E[me];Ce!==null&&Ge!==void 0&&Ge.update(Ce,fe,c||a)}W&&W(K,fe),fe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:fe}),p=null}const te=new Xp;te.setAnimationLoop(X),this.setAnimationLoop=function(K){W=K},this.dispose=function(){}}}const Kb=new tt,jp=new nt;jp.set(-1,0,0,0,1,0,0,0,1);function jb(r,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,mp(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,x,_,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),d(g,m)):m.isMeshPhongMaterial?(s(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),h(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),v(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,x,_):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===cn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===cn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const x=e.get(m),_=x.envMap,y=x.envMapRotation;_&&(g.envMap.value=_,g.envMapRotation.value.setFromMatrix4(Kb.makeRotationFromEuler(y)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(jp),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,x,_){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*x,g.scale.value=_*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,x){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===cn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const x=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Qb(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,_){const y=_.program;n.uniformBlockBinding(x,y)}function c(x,_){let y=i[x.id];y===void 0&&(p(x),y=u(x),i[x.id]=y,x.addEventListener("dispose",g));const E=_.program;n.updateUBOMapping(x,E);const S=e.render.frame;s[x.id]!==S&&(h(x),s[x.id]=S)}function u(x){const _=d();x.__bindingPointIndex=_;const y=r.createBuffer(),E=x.__size,S=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,E,S),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,_,y),y}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const _=i[x.id],y=x.uniforms,E=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,_);for(let S=0,C=y.length;S<C;S++){const M=Array.isArray(y[S])?y[S]:[y[S]];for(let T=0,I=M.length;T<I;T++){const P=M[T];if(f(P,S,T,E)===!0){const k=P.__offset,Z=Array.isArray(P.value)?P.value:[P.value];let z=0;for(let L=0;L<Z.length;L++){const B=Z[L],V=v(B);typeof B=="number"||typeof B=="boolean"?(P.__data[0]=B,r.bufferSubData(r.UNIFORM_BUFFER,k+z,P.__data)):B.isMatrix3?(P.__data[0]=B.elements[0],P.__data[1]=B.elements[1],P.__data[2]=B.elements[2],P.__data[3]=0,P.__data[4]=B.elements[3],P.__data[5]=B.elements[4],P.__data[6]=B.elements[5],P.__data[7]=0,P.__data[8]=B.elements[6],P.__data[9]=B.elements[7],P.__data[10]=B.elements[8],P.__data[11]=0):ArrayBuffer.isView(B)?P.__data.set(new B.constructor(B.buffer,B.byteOffset,P.__data.length)):(B.toArray(P.__data,z),z+=V.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(x,_,y,E){const S=x.value,C=_+"_"+y;if(E[C]===void 0)return typeof S=="number"||typeof S=="boolean"?E[C]=S:ArrayBuffer.isView(S)?E[C]=S.slice():E[C]=S.clone(),!0;{const M=E[C];if(typeof S=="number"||typeof S=="boolean"){if(M!==S)return E[C]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(M.equals(S)===!1)return M.copy(S),!0}}return!1}function p(x){const _=x.uniforms;let y=0;const E=16;for(let C=0,M=_.length;C<M;C++){const T=Array.isArray(_[C])?_[C]:[_[C]];for(let I=0,P=T.length;I<P;I++){const k=T[I],Z=Array.isArray(k.value)?k.value:[k.value];for(let z=0,L=Z.length;z<L;z++){const B=Z[z],V=v(B),oe=y%E,Q=oe%V.boundary,le=oe+Q;y+=Q,le!==0&&E-le<V.storage&&(y+=E-le),k.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=V.storage}}}const S=y%E;return S>0&&(y+=E-S),x.__size=y,x.__cache={},this}function v(x){const _={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(_.boundary=4,_.storage=4):x.isVector2?(_.boundary=8,_.storage=8):x.isVector3||x.isColor?(_.boundary=16,_.storage=12):x.isVector4?(_.boundary=16,_.storage=16):x.isMatrix3?(_.boundary=48,_.storage=48):x.isMatrix4?(_.boundary=64,_.storage=64):x.isTexture?we("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(_.boundary=16,_.storage=x.byteLength):we("WebGLRenderer: Unsupported uniform value type.",x),_}function g(x){const _=x.target;_.removeEventListener("dispose",g);const y=a.indexOf(_.__bindingPointIndex);a.splice(y,1),r.deleteBuffer(i[_.id]),delete i[_.id],delete s[_.id]}function m(){for(const x in i)r.deleteBuffer(i[x]);a=[],i={},s={}}return{bind:l,update:c,dispose:m}}const eS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Kn=null;function tS(){return Kn===null&&(Kn=new Gn(eS,16,16,Gi,oi),Kn.name="DFG_LUT",Kn.minFilter=Ct,Kn.magFilter=Ct,Kn.wrapS=_n,Kn.wrapT=_n,Kn.generateMipmaps=!1,Kn.needsUpdate=!0),Kn}class Qp{constructor(e={}){const{canvas:t=Wf(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=pn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const v=f,g=new Set([xl,vl,ha]),m=new Set([pn,Ln,er,tr,ml,gl]),x=new Uint32Array(4),_=new Int32Array(4),y=new R;let E=null,S=null;const C=[],M=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let P=!1,k=null;this._outputColorSpace=fn;let Z=0,z=0,L=null,B=-1,V=null;const oe=new pt,Q=new pt;let le=null;const ie=new Pe(0);let H=0,W=t.width,X=t.height,te=1,K=null,fe=null;const me=new pt(0,0,W,X),Ce=new pt(0,0,W,X);let Ge=!1;const ke=new cr;let ft=!1,je=!1;const de=new tt,xe=new R,pe=new pt,Re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ee=!1;function Je(){return L===null?te:1}let D=n;function Qe(A,G){return t.getContext(A,G)}try{const A={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${dl}`),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",We,!1),t.addEventListener("webglcontextcreationerror",st,!1),D===null){const G="webgl2";if(D=Qe(G,A),D===null)throw Qe(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw ze("WebGLRenderer: "+A.message),A}let Be,et,U,q,w,b,N,J,ue,re,ge,ee,j,Me,Te,ye,ve,He,Ye,ht,O,be,ce;function De(){Be=new nM(D),Be.init(),O=new Kp(D,Be),et=new Yy(D,Be,e,O),U=new Xb(D,Be),et.reversedDepthBuffer&&h&&U.buffers.depth.setReversed(!0),q=new rM(D),w=new Pb,b=new qb(D,Be,U,w,et,O,q),N=new tM(I),J=new cv(D),be=new qy(D,J),ue=new iM(D,J,q,be),re=new oM(D,ue,J,be,q),He=new aM(D,et,b),Te=new Zy(w),ge=new Ib(I,N,Be,et,be,Te),ee=new jb(I,w),j=new Db,Me=new kb(Be),ve=new Xy(I,N,U,re,p,l),ye=new Wb(I,re,et),ce=new Qb(D,q,et,U),Ye=new $y(D,Be,q),ht=new sM(D,Be,q),q.programs=ge.programs,I.capabilities=et,I.extensions=Be,I.properties=w,I.renderLists=j,I.shadowMap=ye,I.state=U,I.info=q}De(),v!==pn&&(T=new cM(v,t.width,t.height,i,s));const Se=new Jb(I,D);this.xr=Se,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const A=Be.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Be.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(A){A!==void 0&&(te=A,this.setSize(W,X,!1))},this.getSize=function(A){return A.set(W,X)},this.setSize=function(A,G,ne=!0){if(Se.isPresenting){we("WebGLRenderer: Can't change size while VR device is presenting.");return}W=A,X=G,t.width=Math.floor(A*te),t.height=Math.floor(G*te),ne===!0&&(t.style.width=A+"px",t.style.height=G+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,A,G)},this.getDrawingBufferSize=function(A){return A.set(W*te,X*te).floor()},this.setDrawingBufferSize=function(A,G,ne){W=A,X=G,te=ne,t.width=Math.floor(A*ne),t.height=Math.floor(G*ne),this.setViewport(0,0,A,G)},this.setEffects=function(A){if(v===pn){ze("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let G=0;G<A.length;G++)if(A[G].isOutputPass===!0){we("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(oe)},this.getViewport=function(A){return A.copy(me)},this.setViewport=function(A,G,ne,$){A.isVector4?me.set(A.x,A.y,A.z,A.w):me.set(A,G,ne,$),U.viewport(oe.copy(me).multiplyScalar(te).round())},this.getScissor=function(A){return A.copy(Ce)},this.setScissor=function(A,G,ne,$){A.isVector4?Ce.set(A.x,A.y,A.z,A.w):Ce.set(A,G,ne,$),U.scissor(Q.copy(Ce).multiplyScalar(te).round())},this.getScissorTest=function(){return Ge},this.setScissorTest=function(A){U.setScissorTest(Ge=A)},this.setOpaqueSort=function(A){K=A},this.setTransparentSort=function(A){fe=A},this.getClearColor=function(A){return A.copy(ve.getClearColor())},this.setClearColor=function(){ve.setClearColor(...arguments)},this.getClearAlpha=function(){return ve.getClearAlpha()},this.setClearAlpha=function(){ve.setClearAlpha(...arguments)},this.clear=function(A=!0,G=!0,ne=!0){let $=0;if(A){let Y=!1;if(L!==null){const Le=L.texture.format;Y=g.has(Le)}if(Y){const Le=L.texture.type,Oe=m.has(Le),Ie=ve.getClearColor(),Ve=ve.getClearAlpha(),Xe=Ie.r,rt=Ie.g,ct=Ie.b;Oe?(x[0]=Xe,x[1]=rt,x[2]=ct,x[3]=Ve,D.clearBufferuiv(D.COLOR,0,x)):(_[0]=Xe,_[1]=rt,_[2]=ct,_[3]=Ve,D.clearBufferiv(D.COLOR,0,_))}else $|=D.COLOR_BUFFER_BIT}G&&($|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&($|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&D.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),k=A},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",We,!1),t.removeEventListener("webglcontextcreationerror",st,!1),ve.dispose(),j.dispose(),Me.dispose(),w.dispose(),N.dispose(),re.dispose(),be.dispose(),ce.dispose(),ge.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",ph),Se.removeEventListener("sessionend",mh),Yi.stop()};function _e(A){A.preventDefault(),ea("WebGLRenderer: Context Lost."),P=!0}function We(){ea("WebGLRenderer: Context Restored."),P=!1;const A=q.autoReset,G=ye.enabled,ne=ye.autoUpdate,$=ye.needsUpdate,Y=ye.type;De(),q.autoReset=A,ye.enabled=G,ye.autoUpdate=ne,ye.needsUpdate=$,ye.type=Y}function st(A){ze("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Dt(A){const G=A.target;G.removeEventListener("dispose",Dt),xt(G)}function xt(A){ui(A),w.remove(A)}function ui(A){const G=w.get(A).programs;G!==void 0&&(G.forEach(function(ne){ge.releaseProgram(ne)}),A.isShaderMaterial&&ge.releaseShaderCache(A))}this.renderBufferDirect=function(A,G,ne,$,Y,Le){G===null&&(G=Re);const Oe=Y.isMesh&&Y.matrixWorld.determinant()<0,Ie=am(A,G,ne,$,Y);U.setMaterial($,Oe);let Ve=ne.index,Xe=1;if($.wireframe===!0){if(Ve=ue.getWireframeAttribute(ne),Ve===void 0)return;Xe=2}const rt=ne.drawRange,ct=ne.attributes.position;let qe=rt.start*Xe,yt=(rt.start+rt.count)*Xe;Le!==null&&(qe=Math.max(qe,Le.start*Xe),yt=Math.min(yt,(Le.start+Le.count)*Xe)),Ve!==null?(qe=Math.max(qe,0),yt=Math.min(yt,Ve.count)):ct!=null&&(qe=Math.max(qe,0),yt=Math.min(yt,ct.count));const Ut=yt-qe;if(Ut<0||Ut===1/0)return;be.setup(Y,$,Ie,ne,Ve);let Pt,St=Ye;if(Ve!==null&&(Pt=J.get(Ve),St=ht,St.setIndex(Pt)),Y.isMesh)$.wireframe===!0?(U.setLineWidth($.wireframeLinewidth*Je()),St.setMode(D.LINES)):St.setMode(D.TRIANGLES);else if(Y.isLine){let Kt=$.linewidth;Kt===void 0&&(Kt=1),U.setLineWidth(Kt*Je()),Y.isLineSegments?St.setMode(D.LINES):Y.isLineLoop?St.setMode(D.LINE_LOOP):St.setMode(D.LINE_STRIP)}else Y.isPoints?St.setMode(D.POINTS):Y.isSprite&&St.setMode(D.TRIANGLES);if(Y.isBatchedMesh)if(Be.get("WEBGL_multi_draw"))St.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const Kt=Y._multiDrawStarts,Ne=Y._multiDrawCounts,xn=Y._multiDrawCount,mt=Ve?J.get(Ve).bytesPerElement:1,Cn=w.get($).currentProgram.getUniforms();for(let $n=0;$n<xn;$n++)Cn.setValue(D,"_gl_DrawID",$n),St.render(Kt[$n]/mt,Ne[$n])}else if(Y.isInstancedMesh)St.renderInstances(qe,Ut,Y.count);else if(ne.isInstancedBufferGeometry){const Kt=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Ne=Math.min(ne.instanceCount,Kt);St.renderInstances(qe,Ut,Ne)}else St.render(qe,Ut)};function qn(A,G,ne){A.transparent===!0&&A.side===ei&&A.forceSinglePass===!1?(A.side=cn,A.needsUpdate=!0,va(A,G,ne),A.side=yi,A.needsUpdate=!0,va(A,G,ne),A.side=ei):va(A,G,ne)}this.compile=function(A,G,ne=null){ne===null&&(ne=A),S=Me.get(ne),S.init(G),M.push(S),ne.traverseVisible(function(Y){Y.isLight&&Y.layers.test(G.layers)&&(S.pushLight(Y),Y.castShadow&&S.pushShadow(Y))}),A!==ne&&A.traverseVisible(function(Y){Y.isLight&&Y.layers.test(G.layers)&&(S.pushLight(Y),Y.castShadow&&S.pushShadow(Y))}),S.setupLights();const $=new Set;return A.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const Le=Y.material;if(Le)if(Array.isArray(Le))for(let Oe=0;Oe<Le.length;Oe++){const Ie=Le[Oe];qn(Ie,ne,Y),$.add(Ie)}else qn(Le,ne,Y),$.add(Le)}),S=M.pop(),$},this.compileAsync=function(A,G,ne=null){const $=this.compile(A,G,ne);return new Promise(Y=>{function Le(){if($.forEach(function(Oe){w.get(Oe).currentProgram.isReady()&&$.delete(Oe)}),$.size===0){Y(A);return}setTimeout(Le,10)}Be.get("KHR_parallel_shader_compile")!==null?Le():setTimeout(Le,10)})};let Zl=null;function sm(A){Zl&&Zl(A)}function ph(){Yi.stop()}function mh(){Yi.start()}const Yi=new Xp;Yi.setAnimationLoop(sm),typeof self<"u"&&Yi.setContext(self),this.setAnimationLoop=function(A){Zl=A,Se.setAnimationLoop(A),A===null?Yi.stop():Yi.start()},Se.addEventListener("sessionstart",ph),Se.addEventListener("sessionend",mh),this.render=function(A,G){if(G!==void 0&&G.isCamera!==!0){ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;k!==null&&k.renderStart(A,G);const ne=Se.enabled===!0&&Se.isPresenting===!0,$=T!==null&&(L===null||ne)&&T.begin(I,L);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(G),G=Se.getCamera()),A.isScene===!0&&A.onBeforeRender(I,A,G,L),S=Me.get(A,M.length),S.init(G),S.state.textureUnits=b.getTextureUnits(),M.push(S),de.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),ke.setFromProjectionMatrix(de,Sn,G.reversedDepth),je=this.localClippingEnabled,ft=Te.init(this.clippingPlanes,je),E=j.get(A,C.length),E.init(),C.push(E),Se.enabled===!0&&Se.isPresenting===!0){const Oe=I.xr.getDepthSensingMesh();Oe!==null&&Jl(Oe,G,-1/0,I.sortObjects)}Jl(A,G,0,I.sortObjects),E.finish(),I.sortObjects===!0&&E.sort(K,fe),Ee=Se.enabled===!1||Se.isPresenting===!1||Se.hasDepthSensing()===!1,Ee&&ve.addToRenderList(E,A),this.info.render.frame++,ft===!0&&Te.beginShadows();const Y=S.state.shadowsArray;if(ye.render(Y,A,G),ft===!0&&Te.endShadows(),this.info.autoReset===!0&&this.info.reset(),($&&T.hasRenderPass())===!1){const Oe=E.opaque,Ie=E.transmissive;if(S.setupLights(),G.isArrayCamera){const Ve=G.cameras;if(Ie.length>0)for(let Xe=0,rt=Ve.length;Xe<rt;Xe++){const ct=Ve[Xe];_h(Oe,Ie,A,ct)}Ee&&ve.render(A);for(let Xe=0,rt=Ve.length;Xe<rt;Xe++){const ct=Ve[Xe];gh(E,A,ct,ct.viewport)}}else Ie.length>0&&_h(Oe,Ie,A,G),Ee&&ve.render(A),gh(E,A,G)}L!==null&&z===0&&(b.updateMultisampleRenderTarget(L),b.updateRenderTargetMipmap(L)),$&&T.end(I),A.isScene===!0&&A.onAfterRender(I,A,G),be.resetDefaultState(),B=-1,V=null,M.pop(),M.length>0?(S=M[M.length-1],b.setTextureUnits(S.state.textureUnits),ft===!0&&Te.setGlobalState(I.clippingPlanes,S.state.camera)):S=null,C.pop(),C.length>0?E=C[C.length-1]:E=null,k!==null&&k.renderEnd()};function Jl(A,G,ne,$){if(A.visible===!1)return;if(A.layers.test(G.layers)){if(A.isGroup)ne=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(G);else if(A.isLightProbeGrid)S.pushLightProbeGrid(A);else if(A.isLight)S.pushLight(A),A.castShadow&&S.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||ke.intersectsSprite(A)){$&&pe.setFromMatrixPosition(A.matrixWorld).applyMatrix4(de);const Oe=re.update(A),Ie=A.material;Ie.visible&&E.push(A,Oe,Ie,ne,pe.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||ke.intersectsObject(A))){const Oe=re.update(A),Ie=A.material;if($&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),pe.copy(A.boundingSphere.center)):(Oe.boundingSphere===null&&Oe.computeBoundingSphere(),pe.copy(Oe.boundingSphere.center)),pe.applyMatrix4(A.matrixWorld).applyMatrix4(de)),Array.isArray(Ie)){const Ve=Oe.groups;for(let Xe=0,rt=Ve.length;Xe<rt;Xe++){const ct=Ve[Xe],qe=Ie[ct.materialIndex];qe&&qe.visible&&E.push(A,Oe,qe,ne,pe.z,ct)}}else Ie.visible&&E.push(A,Oe,Ie,ne,pe.z,null)}}const Le=A.children;for(let Oe=0,Ie=Le.length;Oe<Ie;Oe++)Jl(Le[Oe],G,ne,$)}function gh(A,G,ne,$){const{opaque:Y,transmissive:Le,transparent:Oe}=A;S.setupLightsView(ne),ft===!0&&Te.setGlobalState(I.clippingPlanes,ne),$&&U.viewport(oe.copy($)),Y.length>0&&_a(Y,G,ne),Le.length>0&&_a(Le,G,ne),Oe.length>0&&_a(Oe,G,ne),U.buffers.depth.setTest(!0),U.buffers.depth.setMask(!0),U.buffers.color.setMask(!0),U.setPolygonOffset(!1)}function _h(A,G,ne,$){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[$.id]===void 0){const qe=Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[$.id]=new An(1,1,{generateMipmaps:!0,type:qe?oi:pn,minFilter:ii,samples:Math.max(4,et.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:dt.workingColorSpace})}const Le=S.state.transmissionRenderTarget[$.id],Oe=$.viewport||oe;Le.setSize(Oe.z*I.transmissionResolutionScale,Oe.w*I.transmissionResolutionScale);const Ie=I.getRenderTarget(),Ve=I.getActiveCubeFace(),Xe=I.getActiveMipmapLevel();I.setRenderTarget(Le),I.getClearColor(ie),H=I.getClearAlpha(),H<1&&I.setClearColor(16777215,.5),I.clear(),Ee&&ve.render(ne);const rt=I.toneMapping;I.toneMapping=Vn;const ct=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),S.setupLightsView($),ft===!0&&Te.setGlobalState(I.clippingPlanes,$),_a(A,ne,$),b.updateMultisampleRenderTarget(Le),b.updateRenderTargetMipmap(Le),Be.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let yt=0,Ut=G.length;yt<Ut;yt++){const Pt=G[yt],{object:St,geometry:Kt,material:Ne,group:xn}=Pt;if(Ne.side===ei&&St.layers.test($.layers)){const mt=Ne.side;Ne.side=cn,Ne.needsUpdate=!0,vh(St,ne,$,Kt,Ne,xn),Ne.side=mt,Ne.needsUpdate=!0,qe=!0}}qe===!0&&(b.updateMultisampleRenderTarget(Le),b.updateRenderTargetMipmap(Le))}I.setRenderTarget(Ie,Ve,Xe),I.setClearColor(ie,H),ct!==void 0&&($.viewport=ct),I.toneMapping=rt}function _a(A,G,ne){const $=G.isScene===!0?G.overrideMaterial:null;for(let Y=0,Le=A.length;Y<Le;Y++){const Oe=A[Y],{object:Ie,geometry:Ve,group:Xe}=Oe;let rt=Oe.material;rt.allowOverride===!0&&$!==null&&(rt=$),Ie.layers.test(ne.layers)&&vh(Ie,G,ne,Ve,rt,Xe)}}function vh(A,G,ne,$,Y,Le){A.onBeforeRender(I,G,ne,$,Y,Le),A.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Y.onBeforeRender(I,G,ne,$,A,Le),Y.transparent===!0&&Y.side===ei&&Y.forceSinglePass===!1?(Y.side=cn,Y.needsUpdate=!0,I.renderBufferDirect(ne,G,$,Y,A,Le),Y.side=yi,Y.needsUpdate=!0,I.renderBufferDirect(ne,G,$,Y,A,Le),Y.side=ei):I.renderBufferDirect(ne,G,$,Y,A,Le),A.onAfterRender(I,G,ne,$,Y,Le)}function va(A,G,ne){G.isScene!==!0&&(G=Re);const $=w.get(A),Y=S.state.lights,Le=S.state.shadowsArray,Oe=Y.state.version,Ie=ge.getParameters(A,Y.state,Le,G,ne,S.state.lightProbeGridArray),Ve=ge.getProgramCacheKey(Ie);let Xe=$.programs;$.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?G.environment:null,$.fog=G.fog;const rt=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;$.envMap=N.get(A.envMap||$.environment,rt),$.envMapRotation=$.environment!==null&&A.envMap===null?G.environmentRotation:A.envMapRotation,Xe===void 0&&(A.addEventListener("dispose",Dt),Xe=new Map,$.programs=Xe);let ct=Xe.get(Ve);if(ct!==void 0){if($.currentProgram===ct&&$.lightsStateVersion===Oe)return yh(A,Ie),ct}else Ie.uniforms=ge.getUniforms(A),k!==null&&A.isNodeMaterial&&k.build(A,ne,Ie),A.onBeforeCompile(Ie,I),ct=ge.acquireProgram(Ie,Ve),Xe.set(Ve,ct),$.uniforms=Ie.uniforms;const qe=$.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(qe.clippingPlanes=Te.uniform),yh(A,Ie),$.needsLights=lm(A),$.lightsStateVersion=Oe,$.needsLights&&(qe.ambientLightColor.value=Y.state.ambient,qe.lightProbe.value=Y.state.probe,qe.directionalLights.value=Y.state.directional,qe.directionalLightShadows.value=Y.state.directionalShadow,qe.spotLights.value=Y.state.spot,qe.spotLightShadows.value=Y.state.spotShadow,qe.rectAreaLights.value=Y.state.rectArea,qe.ltc_1.value=Y.state.rectAreaLTC1,qe.ltc_2.value=Y.state.rectAreaLTC2,qe.pointLights.value=Y.state.point,qe.pointLightShadows.value=Y.state.pointShadow,qe.hemisphereLights.value=Y.state.hemi,qe.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,qe.spotLightMatrix.value=Y.state.spotLightMatrix,qe.spotLightMap.value=Y.state.spotLightMap,qe.pointShadowMatrix.value=Y.state.pointShadowMatrix),$.lightProbeGrid=S.state.lightProbeGridArray.length>0,$.currentProgram=ct,$.uniformsList=null,ct}function xh(A){if(A.uniformsList===null){const G=A.currentProgram.getUniforms();A.uniformsList=go.seqWithValue(G.seq,A.uniforms)}return A.uniformsList}function yh(A,G){const ne=w.get(A);ne.outputColorSpace=G.outputColorSpace,ne.batching=G.batching,ne.batchingColor=G.batchingColor,ne.instancing=G.instancing,ne.instancingColor=G.instancingColor,ne.instancingMorph=G.instancingMorph,ne.skinning=G.skinning,ne.morphTargets=G.morphTargets,ne.morphNormals=G.morphNormals,ne.morphColors=G.morphColors,ne.morphTargetsCount=G.morphTargetsCount,ne.numClippingPlanes=G.numClippingPlanes,ne.numIntersection=G.numClipIntersection,ne.vertexAlphas=G.vertexAlphas,ne.vertexTangents=G.vertexTangents,ne.toneMapping=G.toneMapping}function rm(A,G){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;y.setFromMatrixPosition(G.matrixWorld);for(let ne=0,$=A.length;ne<$;ne++){const Y=A[ne];if(Y.texture!==null&&Y.boundingBox.containsPoint(y))return Y}return null}function am(A,G,ne,$,Y){G.isScene!==!0&&(G=Re),b.resetTextureUnits();const Le=G.fog,Oe=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?G.environment:null,Ie=L===null?I.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:dt.workingColorSpace,Ve=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Xe=N.get($.envMap||Oe,Ve),rt=$.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,ct=!!ne.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),qe=!!ne.morphAttributes.position,yt=!!ne.morphAttributes.normal,Ut=!!ne.morphAttributes.color;let Pt=Vn;$.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Pt=I.toneMapping);const St=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,Kt=St!==void 0?St.length:0,Ne=w.get($),xn=S.state.lights;if(ft===!0&&(je===!0||A!==V)){const At=A===V&&$.id===B;Te.setState($,A,At)}let mt=!1;$.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==xn.state.version||Ne.outputColorSpace!==Ie||Y.isBatchedMesh&&Ne.batching===!1||!Y.isBatchedMesh&&Ne.batching===!0||Y.isBatchedMesh&&Ne.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&Ne.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&Ne.instancing===!1||!Y.isInstancedMesh&&Ne.instancing===!0||Y.isSkinnedMesh&&Ne.skinning===!1||!Y.isSkinnedMesh&&Ne.skinning===!0||Y.isInstancedMesh&&Ne.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Ne.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Ne.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Ne.instancingMorph===!1&&Y.morphTexture!==null||Ne.envMap!==Xe||$.fog===!0&&Ne.fog!==Le||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==Te.numPlanes||Ne.numIntersection!==Te.numIntersection)||Ne.vertexAlphas!==rt||Ne.vertexTangents!==ct||Ne.morphTargets!==qe||Ne.morphNormals!==yt||Ne.morphColors!==Ut||Ne.toneMapping!==Pt||Ne.morphTargetsCount!==Kt||!!Ne.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(mt=!0):(mt=!0,Ne.__version=$.version);let Cn=Ne.currentProgram;mt===!0&&(Cn=va($,G,Y),k&&$.isNodeMaterial&&k.onUpdateProgram($,Cn,Ne));let $n=!1,Ei=!1,Es=!1;const wt=Cn.getUniforms(),Nt=Ne.uniforms;if(U.useProgram(Cn.program)&&($n=!0,Ei=!0,Es=!0),$.id!==B&&(B=$.id,Ei=!0),Ne.needsLights){const At=rm(S.state.lightProbeGridArray,Y);Ne.lightProbeGrid!==At&&(Ne.lightProbeGrid=At,Ei=!0)}if($n||V!==A){U.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),wt.setValue(D,"projectionMatrix",A.projectionMatrix),wt.setValue(D,"viewMatrix",A.matrixWorldInverse);const Ti=wt.map.cameraPosition;Ti!==void 0&&Ti.setValue(D,xe.setFromMatrixPosition(A.matrixWorld)),et.logarithmicDepthBuffer&&wt.setValue(D,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&wt.setValue(D,"isOrthographic",A.isOrthographicCamera===!0),V!==A&&(V=A,Ei=!0,Es=!0)}if(Ne.needsLights&&(xn.state.directionalShadowMap.length>0&&wt.setValue(D,"directionalShadowMap",xn.state.directionalShadowMap,b),xn.state.spotShadowMap.length>0&&wt.setValue(D,"spotShadowMap",xn.state.spotShadowMap,b),xn.state.pointShadowMap.length>0&&wt.setValue(D,"pointShadowMap",xn.state.pointShadowMap,b)),Y.isSkinnedMesh){wt.setOptional(D,Y,"bindMatrix"),wt.setOptional(D,Y,"bindMatrixInverse");const At=Y.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),wt.setValue(D,"boneTexture",At.boneTexture,b))}Y.isBatchedMesh&&(wt.setOptional(D,Y,"batchingTexture"),wt.setValue(D,"batchingTexture",Y._matricesTexture,b),wt.setOptional(D,Y,"batchingIdTexture"),wt.setValue(D,"batchingIdTexture",Y._indirectTexture,b),wt.setOptional(D,Y,"batchingColorTexture"),Y._colorsTexture!==null&&wt.setValue(D,"batchingColorTexture",Y._colorsTexture,b));const Ai=ne.morphAttributes;if((Ai.position!==void 0||Ai.normal!==void 0||Ai.color!==void 0)&&He.update(Y,ne,Cn),(Ei||Ne.receiveShadow!==Y.receiveShadow)&&(Ne.receiveShadow=Y.receiveShadow,wt.setValue(D,"receiveShadow",Y.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&G.environment!==null&&(Nt.envMapIntensity.value=G.environmentIntensity),Nt.dfgLUT!==void 0&&(Nt.dfgLUT.value=tS()),Ei){if(wt.setValue(D,"toneMappingExposure",I.toneMappingExposure),Ne.needsLights&&om(Nt,Es),Le&&$.fog===!0&&ee.refreshFogUniforms(Nt,Le),ee.refreshMaterialUniforms(Nt,$,te,X,S.state.transmissionRenderTarget[A.id]),Ne.needsLights&&Ne.lightProbeGrid){const At=Ne.lightProbeGrid;Nt.probesSH.value=At.texture,Nt.probesMin.value.copy(At.boundingBox.min),Nt.probesMax.value.copy(At.boundingBox.max),Nt.probesResolution.value.copy(At.resolution)}go.upload(D,xh(Ne),Nt,b)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(go.upload(D,xh(Ne),Nt,b),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&wt.setValue(D,"center",Y.center),wt.setValue(D,"modelViewMatrix",Y.modelViewMatrix),wt.setValue(D,"normalMatrix",Y.normalMatrix),wt.setValue(D,"modelMatrix",Y.matrixWorld),$.uniformsGroups!==void 0){const At=$.uniformsGroups;for(let Ti=0,As=At.length;Ti<As;Ti++){const Mh=At[Ti];ce.update(Mh,Cn),ce.bind(Mh,Cn)}}return Cn}function om(A,G){A.ambientLightColor.needsUpdate=G,A.lightProbe.needsUpdate=G,A.directionalLights.needsUpdate=G,A.directionalLightShadows.needsUpdate=G,A.pointLights.needsUpdate=G,A.pointLightShadows.needsUpdate=G,A.spotLights.needsUpdate=G,A.spotLightShadows.needsUpdate=G,A.rectAreaLights.needsUpdate=G,A.hemisphereLights.needsUpdate=G}function lm(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(A,G,ne){const $=w.get(A);$.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),w.get(A.texture).__webglTexture=G,w.get(A.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:ne,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,G){const ne=w.get(A);ne.__webglFramebuffer=G,ne.__useDefaultFramebuffer=G===void 0};const cm=D.createFramebuffer();this.setRenderTarget=function(A,G=0,ne=0){L=A,Z=G,z=ne;let $=null,Y=!1,Le=!1;if(A){const Ie=w.get(A);if(Ie.__useDefaultFramebuffer!==void 0){U.bindFramebuffer(D.FRAMEBUFFER,Ie.__webglFramebuffer),oe.copy(A.viewport),Q.copy(A.scissor),le=A.scissorTest,U.viewport(oe),U.scissor(Q),U.setScissorTest(le),B=-1;return}else if(Ie.__webglFramebuffer===void 0)b.setupRenderTarget(A);else if(Ie.__hasExternalTextures)b.rebindTextures(A,w.get(A.texture).__webglTexture,w.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const rt=A.depthTexture;if(Ie.__boundDepthTexture!==rt){if(rt!==null&&w.has(rt)&&(A.width!==rt.image.width||A.height!==rt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(A)}}const Ve=A.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(Le=!0);const Xe=w.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Xe[G])?$=Xe[G][ne]:$=Xe[G],Y=!0):A.samples>0&&b.useMultisampledRTT(A)===!1?$=w.get(A).__webglMultisampledFramebuffer:Array.isArray(Xe)?$=Xe[ne]:$=Xe,oe.copy(A.viewport),Q.copy(A.scissor),le=A.scissorTest}else oe.copy(me).multiplyScalar(te).floor(),Q.copy(Ce).multiplyScalar(te).floor(),le=Ge;if(ne!==0&&($=cm),U.bindFramebuffer(D.FRAMEBUFFER,$)&&U.drawBuffers(A,$),U.viewport(oe),U.scissor(Q),U.setScissorTest(le),Y){const Ie=w.get(A.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+G,Ie.__webglTexture,ne)}else if(Le){const Ie=G;for(let Ve=0;Ve<A.textures.length;Ve++){const Xe=w.get(A.textures[Ve]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Ve,Xe.__webglTexture,ne,Ie)}}else if(A!==null&&ne!==0){const Ie=w.get(A.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ie.__webglTexture,ne)}B=-1},this.readRenderTargetPixels=function(A,G,ne,$,Y,Le,Oe,Ie=0){if(!(A&&A.isWebGLRenderTarget)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ve=w.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Oe!==void 0&&(Ve=Ve[Oe]),Ve){U.bindFramebuffer(D.FRAMEBUFFER,Ve);try{const Xe=A.textures[Ie],rt=Xe.format,ct=Xe.type;if(A.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ie),!et.textureFormatReadable(rt)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!et.textureTypeReadable(ct)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=A.width-$&&ne>=0&&ne<=A.height-Y&&D.readPixels(G,ne,$,Y,O.convert(rt),O.convert(ct),Le)}finally{const Xe=L!==null?w.get(L).__webglFramebuffer:null;U.bindFramebuffer(D.FRAMEBUFFER,Xe)}}},this.readRenderTargetPixelsAsync=async function(A,G,ne,$,Y,Le,Oe,Ie=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ve=w.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Oe!==void 0&&(Ve=Ve[Oe]),Ve)if(G>=0&&G<=A.width-$&&ne>=0&&ne<=A.height-Y){U.bindFramebuffer(D.FRAMEBUFFER,Ve);const Xe=A.textures[Ie],rt=Xe.format,ct=Xe.type;if(A.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ie),!et.textureFormatReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!et.textureTypeReadable(ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qe=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,qe),D.bufferData(D.PIXEL_PACK_BUFFER,Le.byteLength,D.STREAM_READ),D.readPixels(G,ne,$,Y,O.convert(rt),O.convert(ct),0);const yt=L!==null?w.get(L).__webglFramebuffer:null;U.bindFramebuffer(D.FRAMEBUFFER,yt);const Ut=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await cg(D,Ut,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,qe),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,Le),D.deleteBuffer(qe),D.deleteSync(Ut),Le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,G=null,ne=0){const $=Math.pow(2,-ne),Y=Math.floor(A.image.width*$),Le=Math.floor(A.image.height*$),Oe=G!==null?G.x:0,Ie=G!==null?G.y:0;b.setTexture2D(A,0),D.copyTexSubImage2D(D.TEXTURE_2D,ne,0,0,Oe,Ie,Y,Le),U.unbindTexture()};const um=D.createFramebuffer(),hm=D.createFramebuffer();this.copyTextureToTexture=function(A,G,ne=null,$=null,Y=0,Le=0){let Oe,Ie,Ve,Xe,rt,ct,qe,yt,Ut;const Pt=A.isCompressedTexture?A.mipmaps[Le]:A.image;if(ne!==null)Oe=ne.max.x-ne.min.x,Ie=ne.max.y-ne.min.y,Ve=ne.isBox3?ne.max.z-ne.min.z:1,Xe=ne.min.x,rt=ne.min.y,ct=ne.isBox3?ne.min.z:0;else{const Nt=Math.pow(2,-Y);Oe=Math.floor(Pt.width*Nt),Ie=Math.floor(Pt.height*Nt),A.isDataArrayTexture?Ve=Pt.depth:A.isData3DTexture?Ve=Math.floor(Pt.depth*Nt):Ve=1,Xe=0,rt=0,ct=0}$!==null?(qe=$.x,yt=$.y,Ut=$.z):(qe=0,yt=0,Ut=0);const St=O.convert(G.format),Kt=O.convert(G.type);let Ne;G.isData3DTexture?(b.setTexture3D(G,0),Ne=D.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(b.setTexture2DArray(G,0),Ne=D.TEXTURE_2D_ARRAY):(b.setTexture2D(G,0),Ne=D.TEXTURE_2D),U.activeTexture(D.TEXTURE0),U.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,G.flipY),U.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),U.pixelStorei(D.UNPACK_ALIGNMENT,G.unpackAlignment);const xn=U.getParameter(D.UNPACK_ROW_LENGTH),mt=U.getParameter(D.UNPACK_IMAGE_HEIGHT),Cn=U.getParameter(D.UNPACK_SKIP_PIXELS),$n=U.getParameter(D.UNPACK_SKIP_ROWS),Ei=U.getParameter(D.UNPACK_SKIP_IMAGES);U.pixelStorei(D.UNPACK_ROW_LENGTH,Pt.width),U.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Pt.height),U.pixelStorei(D.UNPACK_SKIP_PIXELS,Xe),U.pixelStorei(D.UNPACK_SKIP_ROWS,rt),U.pixelStorei(D.UNPACK_SKIP_IMAGES,ct);const Es=A.isDataArrayTexture||A.isData3DTexture,wt=G.isDataArrayTexture||G.isData3DTexture;if(A.isDepthTexture){const Nt=w.get(A),Ai=w.get(G),At=w.get(Nt.__renderTarget),Ti=w.get(Ai.__renderTarget);U.bindFramebuffer(D.READ_FRAMEBUFFER,At.__webglFramebuffer),U.bindFramebuffer(D.DRAW_FRAMEBUFFER,Ti.__webglFramebuffer);for(let As=0;As<Ve;As++)Es&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,w.get(A).__webglTexture,Y,ct+As),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,w.get(G).__webglTexture,Le,Ut+As)),D.blitFramebuffer(Xe,rt,Oe,Ie,qe,yt,Oe,Ie,D.DEPTH_BUFFER_BIT,D.NEAREST);U.bindFramebuffer(D.READ_FRAMEBUFFER,null),U.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(Y!==0||A.isRenderTargetTexture||w.has(A)){const Nt=w.get(A),Ai=w.get(G);U.bindFramebuffer(D.READ_FRAMEBUFFER,um),U.bindFramebuffer(D.DRAW_FRAMEBUFFER,hm);for(let At=0;At<Ve;At++)Es?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Nt.__webglTexture,Y,ct+At):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Nt.__webglTexture,Y),wt?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ai.__webglTexture,Le,Ut+At):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ai.__webglTexture,Le),Y!==0?D.blitFramebuffer(Xe,rt,Oe,Ie,qe,yt,Oe,Ie,D.COLOR_BUFFER_BIT,D.NEAREST):wt?D.copyTexSubImage3D(Ne,Le,qe,yt,Ut+At,Xe,rt,Oe,Ie):D.copyTexSubImage2D(Ne,Le,qe,yt,Xe,rt,Oe,Ie);U.bindFramebuffer(D.READ_FRAMEBUFFER,null),U.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else wt?A.isDataTexture||A.isData3DTexture?D.texSubImage3D(Ne,Le,qe,yt,Ut,Oe,Ie,Ve,St,Kt,Pt.data):G.isCompressedArrayTexture?D.compressedTexSubImage3D(Ne,Le,qe,yt,Ut,Oe,Ie,Ve,St,Pt.data):D.texSubImage3D(Ne,Le,qe,yt,Ut,Oe,Ie,Ve,St,Kt,Pt):A.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,Le,qe,yt,Oe,Ie,St,Kt,Pt.data):A.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,Le,qe,yt,Pt.width,Pt.height,St,Pt.data):D.texSubImage2D(D.TEXTURE_2D,Le,qe,yt,Oe,Ie,St,Kt,Pt);U.pixelStorei(D.UNPACK_ROW_LENGTH,xn),U.pixelStorei(D.UNPACK_IMAGE_HEIGHT,mt),U.pixelStorei(D.UNPACK_SKIP_PIXELS,Cn),U.pixelStorei(D.UNPACK_SKIP_ROWS,$n),U.pixelStorei(D.UNPACK_SKIP_IMAGES,Ei),Le===0&&G.generateMipmaps&&D.generateMipmap(Ne),U.unbindTexture()},this.initRenderTarget=function(A){w.get(A).__webglFramebuffer===void 0&&b.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?b.setTextureCube(A,0):A.isData3DTexture?b.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?b.setTexture2DArray(A,0):b.setTexture2D(A,0),U.unbindTexture()},this.resetState=function(){Z=0,z=0,L=null,U.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=dt._getUnpackColorSpace()}}const nS=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:vu,AddEquation:Fi,AddOperation:If,AdditiveAnimationBlendMode:Ru,AdditiveBlending:Jc,AgXToneMapping:yu,AlphaFormat:Tu,AlwaysCompare:Gf,AlwaysDepth:Mo,AlwaysStencilFunc:tu,AmbientLight:Dp,AnimationAction:Gp,AnimationClip:aa,AnimationLoader:e0,AnimationMixer:I0,AnimationObjectGroup:C0,AnimationUtils:J_,ArcCurve:rp,ArrayCamera:Bp,ArrowHelper:ev,AttachedBindMode:Qc,Audio:zp,AudioAnalyser:v0,AudioContext:ih,AudioListener:m0,AudioLoader:h0,AxesHelper:tv,BackSide:cn,BasicDepthPacking:Nf,BasicShadowMap:gm,BatchedMesh:Qf,BezierInterpolant:Ap,Bone:Fu,BooleanKeyframeTrack:Ss,Box2:k0,Box3:zt,Box3Helper:j0,BoxGeometry:Xi,BoxHelper:K0,BufferAttribute:bt,BufferGeometry:it,BufferGeometryLoader:Fp,ByteType:Su,Cache:si,Camera:Wl,CameraHelper:J0,CanvasTexture:m_,CapsuleGeometry:Ll,CatmullRomCurve3:ap,CineonToneMapping:_u,CircleGeometry:Dl,ClampToEdgeWrapping:_n,Clock:F0,Color:Pe,ColorKeyframeTrack:ju,ColorManagement:dt,Compatibility:sg,CompressedArrayTexture:f_,CompressedCubeTexture:p_,CompressedTexture:Pl,CompressedTextureLoader:t0,ConeGeometry:ur,ConstantAlphaFactor:Tf,ConstantColorFactor:Ef,Controls:iv,CubeCamera:Op,CubeDepthTexture:ip,CubeReflectionMapping:ai,CubeRefractionMapping:Vi,CubeTexture:da,CubeTextureLoader:n0,CubeUVReflectionMapping:or,CubicBezierCurve:zu,CubicBezierCurve3:op,CubicInterpolant:wp,CullFaceBack:Zc,CullFaceFront:cf,CullFaceFrontBack:mm,CullFaceNone:lf,Curve:Xn,CurvePath:cp,CustomBlending:hf,CustomToneMapping:xu,CylinderGeometry:fa,Cylindrical:B0,Data3DTexture:wl,DataArrayTexture:Sl,DataTexture:Gn,DataTextureLoader:i0,DataUtils:zg,DecrementStencilOp:Nm,DecrementWrapStencilOp:Om,DefaultLoadingManager:Cp,DepthFormat:li,DepthStencilFormat:Oi,DepthTexture:ys,DetachedBindMode:Pf,DirectionalLight:Lp,DirectionalLightHelper:Z0,DiscreteInterpolant:Ep,DodecahedronGeometry:Ul,DoubleSide:ei,DstAlphaFactor:yf,DstColorFactor:bf,DynamicCopyUsage:jm,DynamicDrawUsage:qm,DynamicReadUsage:Zm,EdgesGeometry:sp,EllipseCurve:Nl,EqualCompare:kf,EqualDepth:So,EqualStencilFunc:Vm,EquirectangularReflectionMapping:Ur,EquirectangularRefractionMapping:Nr,Euler:Hn,EventDispatcher:Wn,ExternalTexture:Bu,ExtrudeGeometry:Fl,FileLoader:bi,Float16BufferAttribute:$g,Float32BufferAttribute:Ue,FloatType:on,Fog:Tl,FogExp2:Al,FramebufferTexture:d_,FrontSide:yi,Frustum:cr,FrustumArray:Il,GLBufferAttribute:U0,GLSL1:eg,GLSL3:nu,GreaterCompare:zf,GreaterDepth:Eo,GreaterEqualCompare:bl,GreaterEqualDepth:wo,GreaterEqualStencilFunc:Xm,GreaterStencilFunc:Hm,GridHelper:$0,Group:js,HTMLTexture:g_,HalfFloatType:oi,HemisphereLight:Rp,HemisphereLightHelper:q0,IcosahedronGeometry:Ol,ImageBitmapLoader:u0,ImageLoader:oa,ImageUtils:qf,IncrementStencilOp:Um,IncrementWrapStencilOp:Fm,InstancedBufferAttribute:ir,InstancedBufferGeometry:nh,InstancedInterleavedBuffer:ul,InstancedMesh:jf,Int16BufferAttribute:Xg,Int32BufferAttribute:qg,Int8BufferAttribute:Gg,IntType:pl,InterleavedBuffer:Cl,InterleavedBufferAttribute:wn,Interpolant:fr,InterpolateBezier:eu,InterpolateDiscrete:Yr,InterpolateLinear:il,InterpolateSmooth:po,InterpolationSamplingMode:ig,InterpolationSamplingType:ng,InvertStencilOp:Bm,KeepStencilOp:os,KeyframeTrack:Dn,LOD:Jf,LatheGeometry:Bl,Layers:El,LessCompare:Bf,LessDepth:bo,LessEqualCompare:Ml,LessEqualDepth:vs,LessEqualStencilFunc:Gm,LessStencilFunc:zm,Light:$i,LightProbe:Np,Line:Wi,Line3:Hp,LineBasicMaterial:un,LineCurve:Vu,LineCurve3:lp,LineDashedMaterial:bp,LineLoop:ep,LineSegments:ci,LinearFilter:Ct,LinearInterpolant:Ku,LinearMipMapLinearFilter:Mm,LinearMipMapNearestFilter:ym,LinearMipmapLinearFilter:ii,LinearMipmapNearestFilter:Fr,LinearSRGBColorSpace:Jr,LinearToneMapping:mu,LinearTransfer:Kr,Loader:vn,LoaderUtils:ou,LoadingManager:Qu,LoopOnce:Lf,LoopPingPong:Uf,LoopRepeat:Df,MOUSE:fm,Material:qt,MaterialBlending:_m,MaterialLoader:Xl,MathUtils:rl,Matrix2:cu,Matrix3:nt,Matrix4:tt,MaxEquation:mf,Mesh:Mt,MeshBasicMaterial:Jt,MeshDepthMaterial:Yu,MeshDistanceMaterial:Zu,MeshLambertMaterial:yp,MeshMatcapMaterial:Mp,MeshNormalMaterial:xp,MeshPhongMaterial:_p,MeshPhysicalMaterial:gp,MeshStandardMaterial:$u,MeshToonMaterial:vp,MinEquation:pf,MirroredRepeatWrapping:Xr,MixOperation:Rf,MultiplyBlending:jc,MultiplyOperation:ua,NearestFilter:Ot,NearestMipMapLinearFilter:xm,NearestMipMapNearestFilter:vm,NearestMipmapLinearFilter:Js,NearestMipmapNearestFilter:bu,NeutralToneMapping:Mu,NeverCompare:Of,NeverDepth:yo,NeverStencilFunc:km,NoBlending:ri,NoColorSpace:_i,NoNormalPacking:Rm,NoToneMapping:Vn,NormalAnimationBlendMode:yl,NormalBlending:fs,NormalGAPacking:Pm,NormalRGPacking:Im,NotEqualCompare:Vf,NotEqualDepth:Ao,NotEqualStencilFunc:Wm,NumberKeyframeTrack:sa,Object3D:_t,ObjectLoader:l0,ObjectSpaceNormalMap:Ff,OctahedronGeometry:hr,OneFactor:_f,OneMinusConstantAlphaFactor:Cf,OneMinusConstantColorFactor:Af,OneMinusDstAlphaFactor:Mf,OneMinusDstColorFactor:Sf,OneMinusSrcAlphaFactor:xo,OneMinusSrcColorFactor:xf,OrthographicCamera:ga,PCFShadowMap:Dr,PCFSoftShadowMap:uf,PMREMGenerator:hu,Path:cl,PerspectiveCamera:Xt,Plane:Ni,PlaneGeometry:dr,PlaneHelper:Q0,PointLight:Pp,PointLightHelper:W0,Points:tp,PointsMaterial:Ou,PolarGridHelper:Y0,PolyhedronGeometry:qi,PositionalAudio:_0,PropertyBinding:gt,PropertyMixer:Vp,QuadraticBezierCurve:Gu,QuadraticBezierCurve3:Hu,Quaternion:tn,QuaternionKeyframeTrack:ma,QuaternionLinearInterpolant:Tp,R11_EAC_Format:Uo,RED_GREEN_RGTC2_Format:$r,RED_RGTC1_Format:el,REVISION:dl,RG11_EAC_Format:qr,RGBADepthPacking:Am,RGBAFormat:ln,RGBAIntegerFormat:xl,RGBA_ASTC_10x10_Format:Yo,RGBA_ASTC_10x5_Format:Xo,RGBA_ASTC_10x6_Format:qo,RGBA_ASTC_10x8_Format:$o,RGBA_ASTC_12x10_Format:Zo,RGBA_ASTC_12x12_Format:Jo,RGBA_ASTC_4x4_Format:Oo,RGBA_ASTC_5x4_Format:Bo,RGBA_ASTC_5x5_Format:ko,RGBA_ASTC_6x5_Format:zo,RGBA_ASTC_6x6_Format:Vo,RGBA_ASTC_8x5_Format:Go,RGBA_ASTC_8x6_Format:Ho,RGBA_ASTC_8x8_Format:Wo,RGBA_BPTC_Format:Ko,RGBA_ETC2_EAC_Format:Do,RGBA_PVRTC_2BPPV1_Format:Io,RGBA_PVRTC_4BPPV1_Format:Ro,RGBA_S3TC_DXT1_Format:Br,RGBA_S3TC_DXT3_Format:kr,RGBA_S3TC_DXT5_Format:zr,RGBDepthPacking:Tm,RGBFormat:Cu,RGBIntegerFormat:bm,RGB_BPTC_SIGNED_Format:jo,RGB_BPTC_UNSIGNED_Format:Qo,RGB_ETC1_Format:Po,RGB_ETC2_Format:Lo,RGB_PVRTC_2BPPV1_Format:Co,RGB_PVRTC_4BPPV1_Format:To,RGB_S3TC_DXT1_Format:Or,RGDepthPacking:Cm,RGFormat:Gi,RGIntegerFormat:vl,RawShaderMaterial:qu,Ray:lr,Raycaster:N0,RectAreaLight:Up,RedFormat:_l,RedIntegerFormat:ha,ReinhardToneMapping:gu,RenderTarget:Pu,RenderTarget3D:P0,RepeatWrapping:Wr,ReplaceStencilOp:Dm,ReverseSubtractEquation:ff,RingGeometry:kl,SIGNED_R11_EAC_Format:No,SIGNED_RED_GREEN_RGTC2_Format:nl,SIGNED_RED_RGTC1_Format:tl,SIGNED_RG11_EAC_Format:Fo,SRGBColorSpace:fn,SRGBTransfer:vt,Scene:Lu,ShaderChunk:ot,ShaderLib:rn,ShaderMaterial:Tn,ShadowMaterial:pp,Shape:ms,ShapeGeometry:zl,ShapePath:nv,ShapeUtils:zn,ShortType:wu,Skeleton:Rl,SkeletonHelper:H0,SkinnedMesh:Kf,Source:Bi,Sphere:Vt,SphereGeometry:kn,Spherical:O0,SphericalHarmonics3:th,SplineCurve:Wu,SpotLight:Ip,SpotLightHelper:G0,Sprite:Zf,SpriteMaterial:Nu,SrcAlphaFactor:vo,SrcAlphaSaturateFactor:wf,SrcColorFactor:vf,StaticCopyUsage:Km,StaticDrawUsage:jr,StaticReadUsage:Ym,StereoCamera:d0,StreamCopyUsage:Qm,StreamDrawUsage:$m,StreamReadUsage:Jm,StringKeyframeTrack:ws,SubtractEquation:df,SubtractiveBlending:Kc,TOUCH:pm,TangentSpaceNormalMap:Mi,TetrahedronGeometry:pa,Texture:It,TextureLoader:s0,TextureUtils:lv,Timer:kp,TimestampQuery:tg,TorusGeometry:bs,TorusKnotGeometry:Vl,Triangle:mn,TriangleFanDrawMode:Em,TriangleStripDrawMode:wm,TrianglesDrawMode:Sm,TubeGeometry:Gl,UVMapping:fl,Uint16BufferAttribute:Du,Uint32BufferAttribute:Uu,Uint8BufferAttribute:Hg,Uint8ClampedBufferAttribute:Wg,Uniform:ah,UniformsGroup:D0,UniformsLib:Ae,UniformsUtils:Hl,UnsignedByteType:pn,UnsignedInt101111Type:Au,UnsignedInt248Type:tr,UnsignedInt5999Type:Eu,UnsignedIntType:Ln,UnsignedShort4444Type:ml,UnsignedShort5551Type:gl,UnsignedShortType:er,VSMShadowMap:Zs,Vector2:he,Vector3:R,Vector4:pt,VectorKeyframeTrack:ra,VideoFrameTexture:h_,VideoTexture:np,WebGL3DRenderTarget:Pg,WebGLArrayRenderTarget:Ig,WebGLCoordinateSystem:Sn,WebGLCubeRenderTarget:oh,WebGLRenderTarget:An,WebGLRenderer:Qp,WebGLUtils:Kp,WebGPUCoordinateSystem:xs,WebXRController:mo,WireframeGeometry:Xu,WrapAroundEnding:Zr,ZeroCurvatureEnding:cs,ZeroFactor:gf,ZeroSlopeEnding:us,ZeroStencilOp:Lm,createCanvasElement:Wf,error:ze,getConsoleFunction:lg,log:ea,setConsoleFunction:og,warn:we,warnOnce:sl},Symbol.toStringTag,{value:"Module"})),Qd=new zt,uo=new R;class em extends nh{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new Ue(e,3)),this.setAttribute("uv",new Ue(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new ul(t,6,1);return this.setAttribute("instanceStart",new wn(n,3,0)),this.setAttribute("instanceEnd",new wn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new ul(t,6,1);return this.setAttribute("instanceColorStart",new wn(n,3,0)),this.setAttribute("instanceColorEnd",new wn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Xu(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zt);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Qd.setFromBufferAttribute(t),this.boundingBox.union(Qd))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vt),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)uo.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(uo)),uo.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(uo));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}Ae.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new he(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};rn.line={uniforms:Hl.merge([Ae.common,Ae.fog,Ae.line]),vertexShader:`
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
		`};class Yl extends Tn{constructor(e){super({type:"LineMaterial",uniforms:Hl.clone(rn.line.uniforms),vertexShader:rn.line.vertexShader,fragmentShader:rn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Gc=new pt,ef=new R,tf=new R,$t=new pt,Yt=new pt,jn=new pt,Hc=new R,Wc=new tt,Zt=new Hp,nf=new R,ho=new zt,fo=new Vt,Qn=new pt;let ti,gs;function sf(r,e,t){return Qn.set(0,0,-e,1).applyMatrix4(r.projectionMatrix),Qn.multiplyScalar(1/Qn.w),Qn.x=gs/t.width,Qn.y=gs/t.height,Qn.applyMatrix4(r.projectionMatrixInverse),Qn.multiplyScalar(1/Qn.w),Math.abs(Math.max(Qn.x,Qn.y))}function iS(r,e){const t=r.matrixWorld,n=r.geometry,i=n.attributes.instanceStart,s=n.attributes.instanceEnd,a=Math.min(n.instanceCount,i.count);for(let o=0,l=a;o<l;o++){Zt.start.fromBufferAttribute(i,o),Zt.end.fromBufferAttribute(s,o),Zt.applyMatrix4(t);const c=new R,u=new R;ti.distanceSqToSegment(Zt.start,Zt.end,u,c),u.distanceTo(c)<gs*.5&&e.push({point:u,pointOnLine:c,distance:ti.origin.distanceTo(u),object:r,face:null,faceIndex:o,uv:null,uv1:null})}}function sS(r,e,t){const n=e.projectionMatrix,s=r.material.resolution,a=r.matrixWorld,o=r.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,u=Math.min(o.instanceCount,l.count),d=-e.near;ti.at(1,jn),jn.w=1,jn.applyMatrix4(e.matrixWorldInverse),jn.applyMatrix4(n),jn.multiplyScalar(1/jn.w),jn.x*=s.x/2,jn.y*=s.y/2,jn.z=0,Hc.copy(jn),Wc.multiplyMatrices(e.matrixWorldInverse,a);for(let h=0,f=u;h<f;h++){if($t.fromBufferAttribute(l,h),Yt.fromBufferAttribute(c,h),$t.w=1,Yt.w=1,$t.applyMatrix4(Wc),Yt.applyMatrix4(Wc),$t.z>d&&Yt.z>d)continue;if($t.z>d){const _=$t.z-Yt.z,y=($t.z-d)/_;$t.lerp(Yt,y)}else if(Yt.z>d){const _=Yt.z-$t.z,y=(Yt.z-d)/_;Yt.lerp($t,y)}$t.applyMatrix4(n),Yt.applyMatrix4(n),$t.multiplyScalar(1/$t.w),Yt.multiplyScalar(1/Yt.w),$t.x*=s.x/2,$t.y*=s.y/2,Yt.x*=s.x/2,Yt.y*=s.y/2,Zt.start.copy($t),Zt.start.z=0,Zt.end.copy(Yt),Zt.end.z=0;const v=Zt.closestPointToPointParameter(Hc,!0);Zt.at(v,nf);const g=rl.lerp($t.z,Yt.z,v),m=g>=-1&&g<=1,x=Hc.distanceTo(nf)<gs*.5;if(m&&x){Zt.start.fromBufferAttribute(l,h),Zt.end.fromBufferAttribute(c,h),Zt.start.applyMatrix4(a),Zt.end.applyMatrix4(a);const _=new R,y=new R;ti.distanceSqToSegment(Zt.start,Zt.end,y,_),t.push({point:y,pointOnLine:_,distance:ti.origin.distanceTo(y),object:r,face:null,faceIndex:h,uv:null,uv1:null})}}}class rS extends Mt{constructor(e=new em,t=new Yl({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)ef.fromBufferAttribute(t,a),tf.fromBufferAttribute(n,a),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+ef.distanceTo(tf);const s=new ul(i,2,1);return e.setAttribute("instanceDistanceStart",new wn(s,1,0)),e.setAttribute("instanceDistanceEnd",new wn(s,1,1)),this}raycast(e,t){const n=this.material.worldUnits,i=e.camera;i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;ti=e.ray;const a=this.matrixWorld,o=this.geometry,l=this.material;gs=l.linewidth+s,o.boundingSphere===null&&o.computeBoundingSphere(),fo.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=gs*.5;else{const d=Math.max(i.near,fo.distanceToPoint(ti.origin));c=sf(i,d,l.resolution)}if(fo.radius+=c,ti.intersectsSphere(fo)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),ho.copy(o.boundingBox).applyMatrix4(a);let u;if(n)u=gs*.5;else{const d=Math.max(i.near,ho.distanceToPoint(ti.origin));u=sf(i,d,l.resolution)}ho.expandByScalar(u),ti.intersectsBox(ho)!==!1&&(n?iS(this,t):sS(this,i,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Gc),this.material.uniforms.resolution.value.set(Gc.z,Gc.w))}}class lh extends em{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}setFromPoints(e){const t=e.length-1,n=new Float32Array(6*t);for(let i=0;i<t;i++)n[6*i]=e[i].x,n[6*i+1]=e[i].y,n[6*i+2]=e[i].z||0,n[6*i+3]=e[i+1].x,n[6*i+4]=e[i+1].y,n[6*i+5]=e[i+1].z||0;return super.setPositions(n),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class tm extends rS{constructor(e=new lh,t=new Yl({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const zi={R0:.35,R1:1.6,R2:2.2,R3:3};function nm(r){const e=[];e.push({id:r.root.id,name:r.root.name,layer:0,position:new R(0,0,zi.R0)});const t=r.lifelines.filter(i=>i.parent_id===r.root.id),n=t.length;return t.forEach((i,s)=>{const a=s/n*Math.PI*2,o=Xc(zi.R1,a,0);e.push({id:i.id,name:i.name,layer:1,position:o,parentId:r.root.id})}),r.lifelines.filter(i=>i.parent_id!==r.root.id).forEach(i=>{const s=e.find(f=>f.id===i.parent_id);if(!s)return;const a=r.lifelines.filter(f=>f.parent_id===i.parent_id),o=a.findIndex(f=>f.id===i.id),l=Math.atan2(s.position.y,s.position.x),c=Math.PI/4,u=o-(a.length-1)/2,d=l+u*(c/Math.max(a.length,1)),h=Xc(zi.R2,d,(Math.random()-.5)*.15);e.push({id:i.id,name:i.name,layer:2,position:h,parentId:i.parent_id})}),r.entities.forEach(i=>{const s=e.find(f=>f.id===i.lifeline_id);if(!s)return;const a=r.entities.filter(f=>f.lifeline_id===i.lifeline_id),o=a.findIndex(f=>f.id===i.id),l=Math.atan2(s.position.y,s.position.x),c=Math.PI/6,u=o-(a.length-1)/2,d=l+u*(c/Math.max(a.length,1)),h=Xc(zi.R3,d+(Math.random()-.5)*.08,(Math.random()-.5)*.12);e.push({id:i.id,name:i.title,layer:3,position:h,parentId:i.lifeline_id,kind:i.kind})}),e}function Xc(r,e,t){const n=r*Math.cos(t)*Math.cos(e),i=r*Math.sin(t),s=r*Math.cos(t)*Math.sin(e);return new R(n,i,s)}function aS(r,e,t,n){const i=r.find(_=>_.id===e);if(!i)return{targets:new Map,constellationIds:new Set};const s=i.position.clone(),a=n.clone().normalize(),o=new R(0,1,0),l=new R().crossVectors(a,o);if(l.length()<.001){const _=new R(1,0,0);l.crossVectors(a,_).normalize()}else l.normalize();const c=new R().crossVectors(l,a).normalize(),u=new Map,d=new Set;u.set(e,s.clone()),d.add(e);const h=[];let f=i.parentId;for(;f&&h.length<2;){const _=r.find(y=>y.id===f);if(_)h.push(_),f=_.parentId;else break}h.forEach((_,y)=>{const E=s.clone().addScaledVector(a,.18+y*.14).addScaledVector(c,.06);u.set(_.id,E),d.add(_.id)});const p=r.filter(_=>_.id!==e&&_.layer===3&&_.parentId===i.parentId).slice(0,12);p.forEach((_,y)=>{const E=p.length===1?0:(y/(p.length-1)-.5)*(Math.PI*2/3),S=s.clone().addScaledVector(a,.12).addScaledVector(l,Math.cos(E)*.25).addScaledVector(c,Math.sin(E)*.25);u.set(_.id,S),d.add(_.id)});const v=new Set;for(const _ of t)_.confidence>=.7&&_.status!=="rejected"&&(_.from===e&&v.add(_.to),_.to===e&&v.add(_.from));const g=r.filter(_=>v.has(_.id)&&!d.has(_.id)).slice(0,6);g.forEach((_,y)=>{const E=g.length===1?0:(y/(g.length-1)-.5)*(Math.PI/2),S=s.clone().addScaledVector(a,-.08).addScaledVector(l,Math.cos(E)*.22).addScaledVector(c,Math.sin(E)*.22);u.set(_.id,S),d.add(_.id)});const m=new Set;for(const _ of t)_.confidence>=.3&&_.confidence<.7&&_.status!=="rejected"&&(_.from===e&&m.add(_.to),_.to===e&&m.add(_.from));const x=r.filter(_=>m.has(_.id)&&!d.has(_.id)).slice(0,6);return x.forEach((_,y)=>{const E=x.length===1?0:(y/(x.length-1)-.5)*(Math.PI*5/6),S=s.clone().addScaledVector(a,-.04).addScaledVector(l,Math.cos(E)*.38).addScaledVector(c,Math.sin(E)*.38);u.set(_.id,S),d.add(_.id)}),{targets:u,constellationIds:d}}const oS=Object.freeze(Object.defineProperty({__proto__:null,RADII:zi,computeFocusLayout:aS,computeLayout:nm},Symbol.toStringTag,{value:"Module"}));function On(r){const e=getComputedStyle(document.documentElement).getPropertyValue(r).trim();if(!e)return"#6ee7d0";const t=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);return t?"#"+[t[1],t[2],t[3]].map(n=>parseInt(n).toString(16).padStart(2,"0")).join(""):e}function lS(r){const e=[];for(const t of r)e.push(t.x,t.y,t.z);return e}async function cS(r,e){const t=new Lu;t.background=new Pe("#07090d");const n=r.clientWidth,i=r.clientHeight,s=new he(n,i),a=new Xt(60,n/i,.1,20);a.position.set(0,2.5,5.5),a.lookAt(0,0,0);const o=new Qp({canvas:r,antialias:!0});o.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.setSize(n,i);const l=nm(e),c=[],u=[],d=[],h=[];for(const _ of l){let y,E;const S=_.layer===0||_.layer===1?1:_.layer===2?.9:.85;if(_.layer===0)y=new kn(.06,16,16),E=new Jt({color:On("--accent")});else if(_.layer===1)y=new kn(.05,12,12),E=new Jt({color:On("--accent"),transparent:!0,opacity:S});else if(_.layer===2)y=new kn(.03,8,8),E=new Jt({color:On("--text-2"),transparent:!0,opacity:S});else{_.kind==="task"?y=new Xi(.022,.022,.022):_.kind==="decision"?y=new hr(.022):_.kind==="memory"?y=new kn(.02,8,8):_.kind==="item"?y=new pa(.02):y=new kn(.015,8,8);const T={task:"--accent",memory:"--text-2",decision:"--warm",item:"--text-3"}[_.kind||""]||"--text-3";E=new Jt({color:On(T),transparent:!0,opacity:S})}const C=new Mt(y,E);if(C.position.copy(_.position),C.userData={id:_.id,name:_.name,kind:_.kind,layer:_.layer,parentId:_.parentId,homePosition:_.position.clone(),targetPosition:_.position.clone()},t.add(C),c.push(C),u.push(C),_.layer===3){const M=new kn(.04,8,8),T=new Jt({visible:!1}),I=new Mt(M,T);I.position.copy(_.position),I.userData=C.userData,u.push(I)}}for(const _ of l){if(!_.parentId)continue;const y=l.find(I=>I.id===_.parentId);if(!y)continue;const E=8,S=[];for(let I=0;I<=E;I++){const P=I/E,k=new R().lerpVectors(y.position,_.position,P).normalize().multiplyScalar(y.position.length()*(1-P)+_.position.length()*P);S.push(k)}const C=new lh;C.setPositions(lS(S));const M=new Yl({color:new Pe(On("--line-2")),linewidth:1.5,worldUnits:!1,resolution:s,transparent:!0,opacity:.65,depthTest:!0});h.push(M);const T=new tm(C,M);T.computeLineDistances(),T.userData={fromLayer:y.layer,toLayer:_.layer},t.add(T),d.push(T)}const f=new bs(zi.R1,.006,8,80),p=new Mt(f,new Jt({color:On("--line-2"),transparent:!0,opacity:.12}));p.rotation.x=rl.degToRad(15),t.add(p);const v=new bs(zi.R2,.004,8,80),g=new Mt(v,new Jt({color:On("--line-2"),transparent:!0,opacity:.08}));g.rotation.x=rl.degToRad(15),t.add(g);function m(_,y){s.set(_,y),h.forEach(E=>{E.resolution.set(_,y)})}function x(){t.traverse(_=>{if(_ instanceof Mt){_.geometry?.dispose();const y=_.material;y instanceof qt&&(Array.isArray(y)?y.forEach(E=>E.dispose()):y.dispose())}}),d.forEach(_=>{_.geometry?.dispose()}),h.forEach(_=>_.dispose()),o.dispose()}return{scene:t,camera:a,renderer:o,nodes:c,pickables:u,lines:d,orbit:p,layoutNodes:l,dispose:x,setResolution:m}}const rf=1,uS=3.5;function hS(r){return Math.max(rf,Math.min(uS,rf+(r-.3)*3.57))}function dS(r,e,t,n){const i=new R().subVectors(e,r).normalize(),s=.03+n*.005,a=new ur(s,s*2.5,6,1),o=new Jt({color:new Pe(t)}),l=new Mt(a,o),c=e.clone().addScaledVector(i,-.04);l.position.copy(c);const u=new tn;return u.setFromUnitVectors(new R(0,1,0),i),l.setRotationFromQuaternion(u),l}function fS(r,e,t,n,i){const s=i||new he(window.innerWidth,window.innerHeight),a=[],o=e.associations.filter(c=>(c.from===n||c.to===n)&&c.confidence>=.7).slice(0,20),l={co_occurrence:"--text-3",causal:"--accent",tension:"--warm",derived_from:"--accent-dim",manual:"--accent"};for(const c of o){const u=t.find(_=>_.id===c.from),d=t.find(_=>_.id===c.to);if(!u||!d)continue;const h=new lh;h.setPositions([u.position.x,u.position.y,u.position.z,d.position.x,d.position.y,d.position.z]);const f=hS(c.confidence),p=.5+(c.confidence-.5)*.8,v=On(l[c.relation_type]||"--text-3"),g=new Yl({color:new Pe(v),linewidth:f,worldUnits:!1,resolution:s,transparent:!0,opacity:c.status==="pending"?p*.8:p,depthTest:!1,dashed:c.status==="pending",dashSize:.06,gapSize:.04}),m=new tm(h,g);m.computeLineDistances(),m.userData={associationId:c.id,...c,_origLinewidth:f,_origColor:m.material.color.getHex()},r.add(m);let x;c.status==="accepted"&&(x=dS(u.position,d.position,v,f),r.add(x)),a.push({line:m,data:c,fromNode:u,toNode:d,arrow:x})}return a}function pS(r,e,t=.05){r.forEach(n=>{const i=n.userData.id,s=n.material;e.has(i)?(s.opacity=1,s.transparent=!0):(s.opacity=t,s.transparent=!0),s.needsUpdate=!0})}function af(r){r.forEach(e=>{const t=e.userData.layer,n=t===0||t===1?1:t===2?.9:.85,i=e.material;i.opacity=n,i.transparent=!0,i.needsUpdate=!0})}function mS(r,e,t=6){const n=1-Math.exp(-t*e);for(const i of r){const s=i.userData.targetPosition;s&&i.position.lerp(s,n)}}function gS(r,e,t=.06){im(r,e,t)}function im(r,e,t=.06){for(const n of r){const i=n.userData.id,s=n.userData.layer,a=n.material;if(e.has(i)){const o=s===0||s===1?1:s===2?.9:.85;a.opacity=o}else a.opacity=t;a.transparent=!0,a.needsUpdate=!0}}function _S(r,e,t){const n=new bs(.04,.004,8,16),i=new Jt({color:new Pe(t),transparent:!0,opacity:.5}),s=new Mt(n,i);return s.position.copy(e),s.name="focusHalo",s.renderOrder=999,s.material.depthTest=!1,s.material.depthWrite=!1,r.add(s),s}function qc(r){const e=r.getObjectByName("focusHalo");if(e&&(r.remove(e),e.geometry&&e.geometry.dispose(),e.material)){const t=e.material;Array.isArray(t)?t.forEach(n=>n.dispose()):t.dispose()}}function vS(r){return r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2}let bn=null;function $c(r,e,t,n,i,s=800){bn={elapsed:0,duration:s,from:{position:r.position.clone(),target:e.target.clone(),fov:r.fov},to:{position:t.clone(),target:n.clone(),fov:i}}}function xS(r,e,t){if(!bn)return!1;bn.elapsed+=r*1e3;const n=Math.min(bn.elapsed/bn.duration,1),i=vS(n);return e.position.lerpVectors(bn.from.position,bn.to.position,i),t.target.lerpVectors(bn.from.target,bn.to.target,i),e.fov=bn.from.fov+(bn.to.fov-bn.from.fov)*i,e.updateProjectionMatrix(),n>=1?(bn=null,!1):!0}const yS={class:"breadcrumb"},MS={key:0,class:"crumb-current"},bS=wi({__name:"Breadcrumb",props:{state:{}},emits:["nav"],setup(r,{emit:e}){const t=r,n=e,i=In(()=>{const s=t.state;return s.kind==="global_overview"?"Atlas":s.kind==="region_zoom"?`Atlas › #${s.lifeline_id}`:s.kind==="node_focus"?`Atlas › #${s.entity_id}`:s.kind==="relation_reveal"?`Atlas › #${s.entity_id} (关联)`:"Atlas"});return(s,a)=>(se(),ae("div",yS,[F("button",{class:"crumb-link",onClick:a[0]||(a[0]=o=>n("nav",{kind:"global_overview"}))},"Atlas"),r.state.kind!=="global_overview"?(se(),ae("span",MS," › "+Fe(i.value.split("› ").slice(1).join(" › ")),1)):Ze("",!0)]))}}),SS=Si(bS,[["__scopeId","data-v-2c69558d"]]),wS={key:0,class:"lifeline-panel"},ES={class:"panel-header"},AS={key:0,class:"inline-form"},TS=["value"],CS={class:"form-actions"},RS={class:"tree"},IS=["onClick"],PS=["onClick"],LS={class:"badge"},DS={class:"actions"},US=["onClick"],NS=["onKeyup"],FS={class:"form-actions"},OS=["onClick"],BS=["onClick"],kS={key:0,class:"confirm-delete"},zS={class:"form-actions"},VS=["onClick"],GS={class:"entity-kind"},HS={class:"entity-title"},WS=["onClick"],XS=["onClick"],qS={key:1,class:"empty"},$S={class:"search-box"},YS={key:0,class:"loading-text"},ZS={key:1,class:"search-results"},JS={key:0,class:"loading-text"},KS=["onClick"],jS={class:"entity-kind"},QS={class:"entity-title"},ew={key:0,class:"mounted-tag"},tw=wi({__name:"LifelinePanel",emits:["focus-lifeline"],setup(r,{emit:e}){const t=e,n=ca(),i=In(()=>{const Q=n.state;return Q.kind==="region_zoom"?Q.lifeline_id??null:Q.kind==="node_focus"||Q.kind==="relation_reveal"?n.data?.entities.find(le=>le.id===Q.entity_id)?.lifeline_id??null:null}),s=$e(new Set),a=$e(!1),o=$e(null),l=$e(null),c=$e(null),u=$e(""),d=$e([]),h=$e(!1),f=$e(""),p=$e(""),v=$e("ROOT"),g=$e(""),m=In(()=>{if(!n.data)return[];const Q=n.data.lifelines,le={};for(const H of Q){const W=H.parent_id;le[W]||(le[W]=[]),le[W].push(H)}function ie(H,W){return(le[H]||[]).map(te=>({lifeline:te,children:ie(te.id,W+1),depth:W}))}return ie("ROOT",0)});function x(Q){return n.data?n.data.entities.filter(le=>le.lifeline_id===Q).length:0}function _(Q){return n.data?n.data.entities.filter(le=>le.lifeline_id===Q):[]}function y(Q){s.value.has(Q)?s.value.delete(Q):s.value.add(Q)}function E(Q){return s.value.has(Q)}function S(Q){return i.value===Q}function C(Q){t("focus-lifeline",Q)}async function M(){!f.value.trim()||!p.value.trim()||(await n.createLifeline({id:f.value.trim(),name:p.value.trim(),parent_id:v.value==="ROOT"?void 0:v.value}),f.value="",p.value="",v.value="ROOT",a.value=!1)}function T(Q){o.value=Q.id,g.value=Q.name}async function I(Q){g.value.trim()&&g.value!==Q.name&&await n.updateLifeline(Q.id,{name:g.value.trim()}),o.value=null}function P(){o.value=null}async function k(Q){await n.deleteLifeline(Q.id),l.value=null}async function Z(Q){const le=Q.id.split(":"),ie=le[0],H=parseInt(le.slice(1).join(":"),10);await n.mountEntity(ie,H,null)}async function z(Q){c.value=Q,u.value="",d.value=[]}async function L(){const Q=u.value.trim();if(!(!Q||Q.length<1)){h.value=!0;try{const{searchAll:le}=await Et(async()=>{const{searchAll:W}=await import("./index-CcsMsRh8.js").then(X=>X.e);return{searchAll:W}},__vite__mapDeps([0,1,2])),ie=await le(Q,5),H=[];for(const W of ie.items||[]){const X=`item:${W.id}`,te=n.data?.entities.find(K=>K.id===X);H.push({id:X,kind:"item",title:W.content?.slice(0,60)||"",lifeline_id:te?.lifeline_id,mounted_name:te?.lifeline_id?n.data?.lifelines.find(K=>K.id===te.lifeline_id)?.name||te.lifeline_id:void 0})}for(const W of ie.tasks||[]){const X=`task:${W.id}`,te=n.data?.entities.find(K=>K.id===X);H.push({id:X,kind:"task",title:W.title?.slice(0,60)||"",lifeline_id:te?.lifeline_id,mounted_name:te?.lifeline_id?n.data?.lifelines.find(K=>K.id===te.lifeline_id)?.name||te.lifeline_id:void 0})}for(const W of ie.memories||[]){const X=`memory:${W.id}`,te=n.data?.entities.find(K=>K.id===X);H.push({id:X,kind:"memory",title:W.content?.slice(0,60)||"",lifeline_id:te?.lifeline_id,mounted_name:te?.lifeline_id?n.data?.lifelines.find(K=>K.id===te.lifeline_id)?.name||te.lifeline_id:void 0})}for(const W of ie.decisions||[]){const X=`decision:${W.id}`,te=n.data?.entities.find(K=>K.id===X);H.push({id:X,kind:"decision",title:W.title?.slice(0,60)||"",lifeline_id:te?.lifeline_id,mounted_name:te?.lifeline_id?n.data?.lifelines.find(K=>K.id===te.lifeline_id)?.name||te.lifeline_id:void 0})}d.value=H}finally{h.value=!1}}}async function B(Q){if(!c.value)return;const le=Q.id.split(":"),ie=le[0],H=parseInt(le.slice(1).join(":"),10);await n.mountEntity(ie,H,c.value),c.value=null,d.value=[]}function V(){c.value=null,d.value=[]}function oe(){return n.data?[{id:"ROOT",name:"ROOT (根级)"},...n.data.lifelines.map(Q=>({id:Q.id,name:Q.name}))]:[{id:"ROOT",name:"ROOT (根级)"}]}return(Q,le)=>ut(n).data?(se(),ae("div",wS,[F("div",ES,[le[8]||(le[8]=F("span",{class:"panel-title"},"Lifeline",-1)),F("button",{class:"btn-text",onClick:le[0]||(le[0]=ie=>a.value=!a.value)},"+ 新建")]),a.value?(se(),ae("div",AS,[Tt(F("input",{"onUpdate:modelValue":le[1]||(le[1]=ie=>f.value=ie),class:"field",placeholder:"ID (英文短名)",onKeyup:Bn(M,["enter"])},null,544),[[kt,f.value]]),Tt(F("input",{"onUpdate:modelValue":le[2]||(le[2]=ie=>p.value=ie),class:"field",placeholder:"显示名称",onKeyup:Bn(M,["enter"])},null,544),[[kt,p.value]]),Tt(F("select",{"onUpdate:modelValue":le[3]||(le[3]=ie=>v.value=ie),class:"field"},[(se(!0),ae(lt,null,gn(oe(),ie=>(se(),ae("option",{key:ie.id,value:ie.id},Fe(ie.name),9,TS))),128))],512),[[ds,v.value]]),F("div",CS,[F("button",{class:"btn-text",onClick:M},"保存"),F("button",{class:"btn-text",onClick:le[4]||(le[4]=ie=>a.value=!1)},"取消")])])):Ze("",!0),F("div",RS,[(se(!0),ae(lt,null,gn(m.value,ie=>(se(),ae(lt,{key:ie.lifeline.id},[F("div",{class:Pn(["tree-row",{active:S(ie.lifeline.id)}]),style:Ys({paddingLeft:ie.depth*16+4+"px"})},[F("span",{class:"arrow",onClick:H=>y(ie.lifeline.id)},Fe(E(ie.lifeline.id)?"▼":"▶"),9,IS),F("span",{class:"name",onClick:H=>C(ie.lifeline.id)},[_s(Fe(ie.lifeline.name)+" ",1),F("span",LS,Fe(x(ie.lifeline.id)),1)],8,PS),F("span",DS,[o.value!==ie.lifeline.id?(se(),ae("button",{key:0,class:"btn-icon",onClick:ni(H=>T(ie.lifeline),["stop"])},"...",8,US)):Ze("",!0)])],6),o.value===ie.lifeline.id?(se(),ae("div",{key:0,class:"inline-edit",style:Ys({paddingLeft:ie.depth*16+20+"px"})},[Tt(F("input",{"onUpdate:modelValue":le[5]||(le[5]=H=>g.value=H),class:"field",onKeyup:[Bn(H=>I(ie.lifeline),["enter"]),Bn(P,["esc"])]},null,40,NS),[[kt,g.value]]),F("div",FS,[F("button",{class:"btn-text",onClick:H=>I(ie.lifeline)},"保存",8,OS),F("button",{class:"btn-text",onClick:P},"取消"),l.value!==ie.lifeline.id?(se(),ae("button",{key:0,class:"btn-text danger",onClick:H=>l.value=ie.lifeline.id},"删除",8,BS)):Ze("",!0)]),l.value===ie.lifeline.id?(se(),ae("div",kS,[_s(" 确定删除「"+Fe(ie.lifeline.name)+"」？挂载的 "+Fe(x(ie.lifeline.id))+" 个 entity 将被卸载。 ",1),F("div",zS,[F("button",{class:"btn-text danger",onClick:H=>k(ie.lifeline)},"确认删除",8,VS),F("button",{class:"btn-text",onClick:le[6]||(le[6]=H=>l.value=null)},"取消")])])):Ze("",!0)],4)):Ze("",!0),E(ie.lifeline.id)?(se(),ae(lt,{key:1},[(se(!0),ae(lt,null,gn(_(ie.lifeline.id),H=>(se(),ae("div",{key:H.id,class:"entity-row",style:Ys({paddingLeft:ie.depth*16+28+"px"})},[F("span",GS,Fe(H.kind[0].toUpperCase()),1),F("span",HS,Fe(H.title.slice(0,30)),1),F("button",{class:"btn-icon",onClick:W=>Z(H),title:"卸载"},"×",8,WS)],4))),128)),F("div",{class:"entity-row add-entity",style:Ys({paddingLeft:ie.depth*16+28+"px"})},[F("button",{class:"btn-text",onClick:H=>z(ie.lifeline.id)},"+ 关联 entity",8,XS)],4)],64)):Ze("",!0)],64))),128))]),m.value.length===0&&!a.value?(se(),ae("div",qS," 暂无 lifeline，点击「+ 新建」创建 ")):Ze("",!0),c.value?(se(),ae("div",{key:2,class:"search-overlay",onClick:ni(V,["self"])},[F("div",$S,[Tt(F("input",{"onUpdate:modelValue":le[7]||(le[7]=ie=>u.value=ie),class:"field",placeholder:"搜索 entity...",onKeyup:Bn(L,["enter"])},null,544),[[kt,u.value]]),F("button",{class:"btn-text",onClick:L},"搜索"),h.value?(se(),ae("div",YS,"搜索中...")):(se(),ae("div",ZS,[d.value.length===0&&u.value?(se(),ae("div",JS,"无结果")):Ze("",!0),(se(!0),ae(lt,null,gn(d.value,ie=>(se(),ae("div",{key:ie.id,class:Pn(["search-row",{mounted:ie.mounted_name}]),onClick:H=>ie.mounted_name?null:B(ie)},[F("span",jS,Fe(ie.kind[0].toUpperCase()),1),F("span",QS,Fe(ie.title.slice(0,40)),1),ie.mounted_name?(se(),ae("span",ew,"已归类到 "+Fe(ie.mounted_name),1)):Ze("",!0)],10,KS))),128))]))])])):Ze("",!0)])):Ze("",!0)}}),nw=Si(tw,[["__scopeId","data-v-5407fba8"]]),iw={key:0,class:"node-detail-card"},sw={class:"card-header"},rw={class:"kind-badge"},aw={class:"lifeline-path"},ow={key:1,class:"no-lifeline"},lw={key:0,class:"detail-loading"},cw={key:1,class:"detail-error"},uw={key:2,class:"detail-section"},hw={key:0,class:"field-row"},dw=["onDblclick"],fw=["onClick"],pw={key:1,class:"field-row"},mw=["onDblclick"],gw=["onClick"],_w={key:2,class:"field-row"},vw=["onDblclick"],xw=["onClick"],yw={key:3,class:"field-row"},Mw=["onDblclick"],bw=["onClick"],Sw={key:4,class:"field-row"},ww=["onDblclick"],Ew=["onClick"],Aw={key:5,class:"field-row"},Tw=["onDblclick"],Cw=["onClick"],Rw={key:6,class:"field-row"},Iw=["onDblclick"],Pw=["onClick"],Lw={key:7,class:"field-row"},Dw=["onDblclick"],Uw=["onClick"],Nw={key:8,class:"field-row"},Fw={class:"field-value"},Ow=["onClick"],Bw={key:9,class:"field-row"},kw={class:"field-value"},zw=["onClick"],Vw={key:10,class:"field-row"},Gw={class:"field-label"},Hw={class:"field-value readonly"},Ww={key:11,class:"field-row"},Xw={class:"field-label"},qw=["onDblclick"],$w={key:0,class:"field-row"},Yw={class:"field-value readonly"},Zw={key:3,class:"actions-section"},Jw={class:"assoc-section"},Kw={class:"assoc-title"},jw={key:0,class:"empty-text"},Qw=["onClick"],e1={class:"confidence"},t1={key:0,class:"assoc-actions"},n1=["onClick"],i1=["onClick"],s1={class:"assoc-edit-actions"},r1=["onClick"],a1=["onClick"],o1=["onClick"],l1={key:0,class:"evidence-block"},c1={class:"evidence-title"},u1={key:0,class:"no-evidence"},h1={class:"evidence-excerpt"},d1={class:"evidence-meta"},f1={class:"evidence-type"},p1={class:"evidence-weight"},m1=wi({__name:"NodeDetailCard",emits:["edit-assoc","delete-assoc"],setup(r,{expose:e,emit:t}){const n=ca(),i=In(()=>{const H=n.state;if(H.kind!=="node_focus"&&H.kind!=="relation_reveal")return null;const W=H.entity_id;return n.data?.entities.find(X=>X.id===W)??null}),s=$e(null),a=$e(!1),o=$e(!1);async function l(){if(!i.value)return;const H=i.value.id,W=n.entityDetailCache.get(H);if(W){s.value=W;return}a.value=!0,o.value=!1;try{const X=H.split(":"),te=X[0],K=parseInt(X.slice(1).join(":"),10);let fe={};if(te==="task"){const{getTask:me}=await Et(async()=>{const{getTask:Ge}=await import("./index-CcsMsRh8.js").then(ke=>ke.e);return{getTask:Ge}},__vite__mapDeps([0,1,2])),Ce=await me(K);fe=Ce.task||Ce}else if(te==="memory"){const{getMemory:me}=await Et(async()=>{const{getMemory:Ge}=await import("./index-CcsMsRh8.js").then(ke=>ke.e);return{getMemory:Ge}},__vite__mapDeps([0,1,2])),Ce=await me(K);fe=Ce.memory||Ce}else if(te==="decision"){const{getDecision:me}=await Et(async()=>{const{getDecision:Ge}=await import("./index-CcsMsRh8.js").then(ke=>ke.e);return{getDecision:Ge}},__vite__mapDeps([0,1,2])),Ce=await me(K);fe=Ce.decision||Ce}else if(te==="item"){const{getItem:me}=await Et(async()=>{const{getItem:Ge}=await import("./index-CcsMsRh8.js").then(ke=>ke.e);return{getItem:Ge}},__vite__mapDeps([0,1,2])),Ce=await me(K);fe=Ce.item||Ce}s.value=fe,n.entityDetailCache.set(H,fe)}catch{o.value=!0}finally{a.value=!1}}pu(()=>i.value?.id,()=>{s.value=null,l()},{immediate:!0});const c=$e(!1),u=$e(null),d=$e("");function h(){i.value&&(d.value=i.value.title,c.value=!0,Yc(()=>u.value?.focus()))}async function f(){if(!i.value)return;const H=d.value.trim();if(!H||H===i.value.title){c.value=!1;return}const W=i.value.id.split(":"),X=W[0],te=parseInt(W.slice(1).join(":"),10);try{await n.updateEntityTitle(X,te,H)}catch{await n.reload()}c.value=!1}function p(){c.value=!1}function v(H){H.key==="Enter"?(H.stopPropagation(),f()):H.key==="Escape"&&(H.stopPropagation(),p())}const g=$e(null),m=$e(null),x=$e("");function _(H){if(!s.value)return;const W=s.value[H];x.value=W!=null?String(W):"",g.value=H,Yc(()=>m.value?.focus())}async function y(){if(!i.value||!g.value||!s.value)return;const H=g.value,W=x.value.trim();if(W===String(s.value[H]||"")){g.value=null;return}const X=i.value.id.split(":"),te=X[0],K=parseInt(X.slice(1).join(":"),10);try{const{updateEntityField:fe}=await Et(async()=>{const{updateEntityField:me}=await import("./index-CcsMsRh8.js").then(Ce=>Ce.e);return{updateEntityField:me}},__vite__mapDeps([0,1,2]));await fe(te,K,{[H]:W}),s.value={...s.value,[H]:W},n.entityDetailCache.set(i.value.id,s.value)}catch{}g.value=null}function E(){g.value=null}function S(H){H.key==="Escape"?(H.stopPropagation(),E()):(H.key==="Enter"&&!(H.target instanceof HTMLTextAreaElement)||(H.ctrlKey||H.metaKey)&&H.key==="Enter"&&H.target instanceof HTMLTextAreaElement)&&(H.stopPropagation(),y())}async function C(){if(!i.value||!s.value)return;const H=i.value.id.split(":"),W=parseInt(H.slice(1).join(":"),10),X=s.value.status;try{if(X==="todo"){const{markTaskDone:te}=await Et(async()=>{const{markTaskDone:K}=await import("./index-CcsMsRh8.js").then(fe=>fe.e);return{markTaskDone:K}},__vite__mapDeps([0,1,2]));await te(W),s.value={...s.value,status:"done"}}else{const{markTaskTodo:te}=await Et(async()=>{const{markTaskTodo:K}=await import("./index-CcsMsRh8.js").then(fe=>fe.e);return{markTaskTodo:K}},__vite__mapDeps([0,1,2]));await te(W),s.value={...s.value,status:"todo"}}n.entityDetailCache.set(i.value.id,s.value),await n.reload()}catch{await n.reload()}}async function M(){if(!i.value||!s.value)return;const H=i.value.id.split(":"),W=parseInt(H.slice(1).join(":"),10),X=s.value.status;try{if(X==="candidate"){const{confirmMemory:te}=await Et(async()=>{const{confirmMemory:K}=await import("./index-CcsMsRh8.js").then(fe=>fe.e);return{confirmMemory:K}},__vite__mapDeps([0,1,2]));await te(W),s.value={...s.value,status:"confirmed"}}else{const{archiveMemory:te}=await Et(async()=>{const{archiveMemory:K}=await import("./index-CcsMsRh8.js").then(fe=>fe.e);return{archiveMemory:K}},__vite__mapDeps([0,1,2]));await te(W),s.value={...s.value,status:"archived"}}n.entityDetailCache.set(i.value.id,s.value),await n.reload()}catch{await n.reload()}}const T=t;e({startEditTitle:h});const I=In(()=>{if(!i.value||!n.data)return[];const H=i.value.id;return n.data.associations.filter(W=>(W.from===H||W.to===H)&&W.status!=="rejected")}),P=In(()=>{if(!i.value||!n.data)return null;const H=i.value.lifeline_id;if(!H)return null;const W=n.data.lifelines.find(X=>X.id===H);return W?{id:W.id,name:W.name}:null});function k(H){return H==="task"?"T":H==="memory"?"M":H==="decision"?"D":H==="item"?"I":"?"}function Z(H){switch(H){case"co_occurrence":return"共现";case"causal":return"因果";case"tension":return"张力";case"derived_from":return"衍生";default:return H}}function z(H){switch(H){case"causal":return"var(--accent)";case"tension":return"var(--text-5)";case"derived_from":return"var(--text-4)";default:return"var(--text-3)"}}function L(H){const W=i.value.id,te=H.from===W?H.to:H.from,K=te.split(":")[0],fe=n.data?.entities.find(me=>me.id===te);return{id:te,kind:K,title:fe?.title||te}}function B(H){const W=L(H);n.transition({kind:"node_focus",entity_kind:W.kind,entity_id:W.id})}function V(H){n.transition({kind:"region_zoom",lifeline_id:H})}async function oe(H){await n.reviewAssociation(H,"accepted")}async function Q(H){await n.reviewAssociation(H,"rejected")}function le(H){return H?H.slice(0,10):""}function ie(H){return H==="detail"||H==="content"||H==="decision"||H==="context"||H==="reasoning"||H==="expected_outcome"}return(H,W)=>i.value?(se(),ae("div",iw,[F("div",sw,[F("span",rw,Fe(k(i.value.kind)),1),c.value?Tt((se(),ae("input",{key:0,ref_key:"editInput",ref:u,"onUpdate:modelValue":W[0]||(W[0]=X=>d.value=X),class:"title-input",onBlur:f,onKeydown:v},null,544)),[[kt,d.value]]):(se(),ae("span",{key:1,class:"entity-name",onDblclick:h},Fe(i.value.title.slice(0,40)),33))]),F("div",aw,[P.value?(se(),ae("span",{key:0,class:"lifeline-link",onClick:W[1]||(W[1]=X=>V(P.value.id))},Fe(P.value.name),1)):(se(),ae("span",ow,"未归类"))]),a.value?(se(),ae("div",lw,"加载详情…")):o.value?(se(),ae("div",cw,[W[13]||(W[13]=_s(" 加载详情失败 ",-1)),F("button",{class:"btn-retry",onClick:l},"重试")])):s.value?(se(),ae("div",uw,[W[35]||(W[35]=F("div",{class:"section-title"},"详情",-1)),(se(!0),ae(lt,null,gn(Object.keys(s.value).filter(X=>!["id","created_at","updated_at","completed_at","due_date","estimated_minutes"].includes(X)),X=>(se(),ae(lt,{key:X},[X==="title"&&i.value.kind!=="item"?(se(),ae("div",hw,[W[14]||(W[14]=F("span",{class:"field-label"},"标题",-1)),g.value===X?Tt((se(),ae("input",{key:0,ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":W[2]||(W[2]=te=>x.value=te),class:"field-input",onKeydown:S,onBlur:y},null,544)),[[kt,x.value]]):(se(),ae(lt,{key:1},[F("span",{class:"field-value",onDblclick:te=>_(X)},Fe(s.value[X]?.slice(0,80)||"—"),41,dw),F("button",{class:"field-edit-btn",onClick:te=>_(X)},"✎",8,fw)],64))])):X==="content"&&(i.value.kind==="memory"||i.value.kind==="item")?(se(),ae("div",pw,[W[15]||(W[15]=F("span",{class:"field-label"},"内容",-1)),g.value===X?(se(),ae(lt,{key:0},[Tt(F("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":W[3]||(W[3]=te=>x.value=te),class:"field-textarea",rows:"3",onKeydown:S},null,544),[[kt,x.value]]),F("div",{class:"field-actions"},[F("button",{class:"btn-save",onClick:y},"保存"),F("button",{class:"btn-cancel",onClick:E},"取消")])],64)):(se(),ae(lt,{key:1},[F("span",{class:"field-value multiline",onDblclick:te=>_(X)},Fe(s.value[X]?.slice(0,200)||"—"),41,mw),F("button",{class:"field-edit-btn",onClick:te=>_(X)},"✎",8,gw)],64))])):X==="detail"&&i.value.kind==="task"?(se(),ae("div",_w,[W[16]||(W[16]=F("span",{class:"field-label"},"描述",-1)),g.value===X?(se(),ae(lt,{key:0},[Tt(F("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":W[4]||(W[4]=te=>x.value=te),class:"field-textarea",rows:"3",onKeydown:S},null,544),[[kt,x.value]]),F("div",{class:"field-actions"},[F("button",{class:"btn-save",onClick:y},"保存"),F("button",{class:"btn-cancel",onClick:E},"取消")])],64)):(se(),ae(lt,{key:1},[F("span",{class:"field-value multiline",onDblclick:te=>_(X)},Fe(s.value[X]?.slice(0,200)||"—"),41,vw),F("button",{class:"field-edit-btn",onClick:te=>_(X)},"✎",8,xw)],64))])):X==="decision"&&i.value.kind==="decision"?(se(),ae("div",yw,[W[17]||(W[17]=F("span",{class:"field-label"},"决策",-1)),g.value===X?(se(),ae(lt,{key:0},[Tt(F("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":W[5]||(W[5]=te=>x.value=te),class:"field-textarea",rows:"3",onKeydown:S},null,544),[[kt,x.value]]),F("div",{class:"field-actions"},[F("button",{class:"btn-save",onClick:y},"保存"),F("button",{class:"btn-cancel",onClick:E},"取消")])],64)):(se(),ae(lt,{key:1},[F("span",{class:"field-value multiline",onDblclick:te=>_(X)},Fe(s.value[X]?.slice(0,200)||"—"),41,Mw),F("button",{class:"field-edit-btn",onClick:te=>_(X)},"✎",8,bw)],64))])):X==="context"&&i.value.kind==="decision"?(se(),ae("div",Sw,[W[18]||(W[18]=F("span",{class:"field-label"},"背景",-1)),g.value===X?(se(),ae(lt,{key:0},[Tt(F("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":W[6]||(W[6]=te=>x.value=te),class:"field-textarea",rows:"2",onKeydown:S},null,544),[[kt,x.value]]),F("div",{class:"field-actions"},[F("button",{class:"btn-save",onClick:y},"保存"),F("button",{class:"btn-cancel",onClick:E},"取消")])],64)):(se(),ae(lt,{key:1},[F("span",{class:"field-value multiline",onDblclick:te=>_(X)},Fe(s.value[X]?.slice(0,120)||"—"),41,ww),F("button",{class:"field-edit-btn",onClick:te=>_(X)},"✎",8,Ew)],64))])):X==="reasoning"&&i.value.kind==="decision"?(se(),ae("div",Aw,[W[19]||(W[19]=F("span",{class:"field-label"},"推理",-1)),g.value===X?(se(),ae(lt,{key:0},[Tt(F("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":W[7]||(W[7]=te=>x.value=te),class:"field-textarea",rows:"2",onKeydown:S},null,544),[[kt,x.value]]),F("div",{class:"field-actions"},[F("button",{class:"btn-save",onClick:y},"保存"),F("button",{class:"btn-cancel",onClick:E},"取消")])],64)):(se(),ae(lt,{key:1},[F("span",{class:"field-value multiline",onDblclick:te=>_(X)},Fe(s.value[X]?.slice(0,120)||"—"),41,Tw),F("button",{class:"field-edit-btn",onClick:te=>_(X)},"✎",8,Cw)],64))])):X==="expected_outcome"&&i.value.kind==="decision"?(se(),ae("div",Rw,[W[20]||(W[20]=F("span",{class:"field-label"},"预期",-1)),g.value===X?(se(),ae(lt,{key:0},[Tt(F("textarea",{ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":W[8]||(W[8]=te=>x.value=te),class:"field-textarea",rows:"2",onKeydown:S},null,544),[[kt,x.value]]),F("div",{class:"field-actions"},[F("button",{class:"btn-save",onClick:y},"保存"),F("button",{class:"btn-cancel",onClick:E},"取消")])],64)):(se(),ae(lt,{key:1},[F("span",{class:"field-value multiline",onDblclick:te=>_(X)},Fe(s.value[X]?.slice(0,120)||"—"),41,Iw),F("button",{class:"field-edit-btn",onClick:te=>_(X)},"✎",8,Pw)],64))])):X==="priority"&&i.value.kind==="task"?(se(),ae("div",Lw,[W[22]||(W[22]=F("span",{class:"field-label"},"优先级",-1)),g.value===X?Tt((se(),ae("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":W[9]||(W[9]=te=>x.value=te),class:"field-select",onBlur:y,onKeydown:[Bn(y,["enter"]),Bn(E,["escape"])]},[...W[21]||(W[21]=[F("option",{value:"high"},"高",-1),F("option",{value:"medium"},"中",-1),F("option",{value:"low"},"低",-1)])],544)),[[ds,x.value]]):(se(),ae(lt,{key:1},[F("span",{class:"field-value",onDblclick:te=>_(X)},Fe(s.value[X]||"medium"),41,Dw),F("button",{class:"field-edit-btn",onClick:te=>_(X)},"✎",8,Uw)],64))])):X==="status"&&i.value.kind!=="item"?(se(),ae("div",Nw,[W[31]||(W[31]=F("span",{class:"field-label"},"状态",-1)),g.value===X?Tt((se(),ae("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":W[10]||(W[10]=te=>x.value=te),class:"field-select",onBlur:y,onKeydown:[Bn(y,["enter"]),Bn(E,["escape"])]},[i.value.kind==="task"?(se(),ae(lt,{key:0},[W[23]||(W[23]=F("option",{value:"todo"},"待办",-1)),W[24]||(W[24]=F("option",{value:"done"},"完成",-1)),W[25]||(W[25]=F("option",{value:"cancelled"},"取消",-1))],64)):i.value.kind==="memory"?(se(),ae(lt,{key:1},[W[26]||(W[26]=F("option",{value:"candidate"},"候选",-1)),W[27]||(W[27]=F("option",{value:"confirmed"},"已确认",-1)),W[28]||(W[28]=F("option",{value:"archived"},"归档",-1))],64)):(se(),ae(lt,{key:2},[W[29]||(W[29]=F("option",{value:"pending"},"待回顾",-1)),W[30]||(W[30]=F("option",{value:"reviewed"},"已回顾",-1))],64))],544)),[[ds,x.value]]):(se(),ae(lt,{key:1},[F("span",Fw,Fe(s.value[X]),1),F("button",{class:"field-edit-btn",onClick:te=>_(X)},"✎",8,Ow)],64))])):X==="category"&&i.value.kind==="memory"?(se(),ae("div",Bw,[W[33]||(W[33]=F("span",{class:"field-label"},"分类",-1)),g.value===X?Tt((se(),ae("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":W[11]||(W[11]=te=>x.value=te),class:"field-select",onBlur:y,onKeydown:[Bn(y,["enter"]),Bn(E,["escape"])]},[...W[32]||(W[32]=[_o('<option value="fact" data-v-b45816c5>事实</option><option value="preference" data-v-b45816c5>偏好</option><option value="goal" data-v-b45816c5>目标</option><option value="relationship" data-v-b45816c5>关系</option><option value="event" data-v-b45816c5>事件</option>',5)])],544)),[[ds,x.value]]):(se(),ae(lt,{key:1},[F("span",kw,Fe(s.value[X]),1),F("button",{class:"field-edit-btn",onClick:te=>_(X)},"✎",8,zw)],64))])):X==="source"||X==="type"?(se(),ae("div",Vw,[F("span",Gw,Fe(X==="source"?"来源":"类型"),1),F("span",Hw,Fe(s.value[X]||"—"),1)])):!ie(X)&&X!=="title"?(se(),ae("div",Ww,[F("span",Xw,Fe(X),1),g.value===X?Tt((se(),ae("input",{key:0,ref_for:!0,ref_key:"fieldEl",ref:m,"onUpdate:modelValue":W[12]||(W[12]=te=>x.value=te),class:"field-input",onKeydown:S,onBlur:y},null,544)),[[kt,x.value]]):(se(),ae("span",{key:1,class:"field-value",onDblclick:te=>_(X)},Fe(s.value[X]?.slice(0,60)||"—"),41,qw))])):Ze("",!0)],64))),128)),s.value.created_at?(se(),ae("div",$w,[W[34]||(W[34]=F("span",{class:"field-label"},"创建时间",-1)),F("span",Yw,Fe(le(s.value.created_at)),1)])):Ze("",!0)])):Ze("",!0),s.value?(se(),ae("div",Zw,[i.value.kind==="task"&&s.value.status!=="cancelled"?(se(),ae("button",{key:0,class:"btn-action",onClick:C},Fe(s.value.status==="todo"?"标记完成":"重开任务"),1)):Ze("",!0),i.value.kind==="memory"&&s.value.status!=="archived"?(se(),ae("button",{key:1,class:"btn-action",onClick:M},Fe(s.value.status==="candidate"?"确认":"归档"),1)):Ze("",!0)])):Ze("",!0),F("div",Jw,[F("div",Kw,"关联 ("+Fe(I.value.length)+")",1),I.value.length===0?(se(),ae("div",jw,"暂无关联")):Ze("",!0),(se(!0),ae(lt,null,gn(I.value,X=>(se(),ae("div",{key:X.id,class:"assoc-wrapper"},[F("div",{class:Pn(["assoc-row",{pending:X.status==="pending",expanded:ut(n).selectedAssocId===X.id}])},[F("span",{class:"rel-badge",style:Ys({color:z(X.relation_type)})},"["+Fe(Z(X.relation_type))+"]",5),F("span",{class:"assoc-target",onClick:ni(te=>B(X),["stop"])},Fe(L(X).title.slice(0,30)),9,Qw),F("span",e1,Fe(Math.round(X.confidence*100))+"%",1),F("span",{class:Pn(["status-badge",X.status])},Fe(X.status==="accepted"?"已确认":"待定"),3),X.status==="pending"?(se(),ae("span",t1,[F("button",{class:"btn-accept",onClick:te=>oe(X.id)},"✓",8,n1),F("button",{class:"btn-reject",onClick:te=>Q(X.id)},"✗",8,i1)])):Ze("",!0),F("span",s1,[F("button",{class:"btn-edit-assoc",onClick:ni(te=>T("edit-assoc",X),["stop"])},"✎",8,r1),F("button",{class:"btn-del-assoc",onClick:ni(te=>T("delete-assoc",X.id),["stop"])},"✕",8,a1)]),F("button",{class:"btn-expand",onClick:ni(te=>ut(n).selectedAssocId===X.id?ut(n).selectAssociation(null):ut(n).selectAssociation(X.id),["stop"])},Fe(ut(n).selectedAssocId===X.id?"▾":"▸"),9,o1)],2),ut(n).selectedAssocId===X.id?(se(),ae("div",l1,[F("div",c1,"证据 ("+Fe(X.evidence?.length||0)+" 条)",1),!X.evidence||X.evidence.length===0?(se(),ae("div",u1,"暂无证据详情")):Ze("",!0),(se(!0),ae(lt,null,gn(X.evidence,(te,K)=>(se(),ae("div",{key:K,class:"evidence-item"},[F("div",h1,'"'+Fe(te.excerpt.slice(0,120))+Fe(te.excerpt.length>120?"…":"")+'"',1),F("div",d1,[F("span",f1,Fe(te.type),1),F("span",p1,"权重: "+Fe(Math.round(te.weight*100))+"%",1)])]))),128))])):Ze("",!0)]))),128))])])):Ze("",!0)}}),g1=Si(m1,[["__scopeId","data-v-b45816c5"]]),_1={class:"atlas-search"},v1={key:0,class:"results"},x1={key:0,class:"no-results"},y1=["onClick"],M1={class:"result-kind"},b1={class:"result-info"},S1={class:"result-title"},w1={class:"result-path"},E1=wi({__name:"AtlasSearch",emits:["select","close"],setup(r,{emit:e}){const t=ca(),n=$e(""),i=$e(0),s=$e(null),a=In(()=>{const h=n.value.trim().toLowerCase();if(!h||!t.data)return[];const f=[];for(const p of t.data.entities)p.title.toLowerCase().includes(h)&&f.push({id:p.id,kind:p.kind,title:p.title,path:o(p.lifeline_id),layer:3});for(const p of t.data.lifelines)if(p.name.toLowerCase().includes(h)){const v=p.parent_id==="ROOT"?1:2,g=t.data.lifelines.find(x=>x.id===p.parent_id),m=g?g.name:"根级 lifeline";f.push({id:p.id,kind:"lifeline",title:p.name,path:m,layer:v})}return f.sort((p,v)=>{const g=p.title.toLowerCase()===h?0:p.title.toLowerCase().startsWith(h)?1:2,m=v.title.toLowerCase()===h?0:v.title.toLowerCase().startsWith(h)?1:2;return g-m||p.title.length-v.title.length}),f.slice(0,8)});function o(h){if(!t.data)return"";const f=[];let p=t.data.lifelines.find(v=>v.id===h);for(;p;){f.unshift(p.name);const v=p?.parent_id;p=v?t.data.lifelines.find(g=>g.id===v):void 0}return f.length>=2?`${f[f.length-1]} · ${f[0]}`:f.join(" · ")}function l(h){return h==="lifeline"?"L":h[0].toUpperCase()}function c(h){d("select",h),d("close")}function u(h){h.key==="ArrowDown"?(h.preventDefault(),i.value=Math.min(i.value+1,a.value.length-1)):h.key==="ArrowUp"?(h.preventDefault(),i.value=Math.max(i.value-1,0)):h.key==="Enter"?(h.preventDefault(),a.value[i.value]&&c(a.value[i.value])):h.key==="Escape"&&(h.preventDefault(),d("close"))}const d=e;return ar(()=>{s.value?.focus()}),(h,f)=>(se(),ae("div",_1,[Tt(F("input",{ref_key:"inputEl",ref:s,"onUpdate:modelValue":f[0]||(f[0]=p=>n.value=p),class:"search-input",placeholder:"搜索 entity 或 lifeline…",onKeydown:u},null,544),[[kt,n.value]]),n.value.trim()?(se(),ae("div",v1,[a.value.length===0?(se(),ae("div",x1,"无匹配结果")):Ze("",!0),(se(!0),ae(lt,null,gn(a.value,(p,v)=>(se(),ae("div",{key:p.id,class:Pn(["result-row",{selected:v===i.value}]),onClick:g=>c(p)},[F("span",M1,Fe(l(p.kind)),1),F("div",b1,[F("div",S1,Fe(p.title),1),F("div",w1,Fe(p.path),1)])],10,y1))),128))])):Ze("",!0)]))}}),A1=Si(E1,[["__scopeId","data-v-4cc4adb8"]]),T1={key:0,class:"submenu"},C1=["disabled","onClick"],R1=["disabled","onClick"],I1={key:0,class:"subitem empty"},P1={key:0,class:"submenu"},L1=["onClick"],D1=wi({__name:"ContextMenu",props:{target:{},x:{},y:{}},emits:["close","edit-title","delete-entity","move-lifeline","create-entity","edit-lifeline-name","associate-to"],setup(r,{emit:e}){const t=r,n=e,i=ca(),s=$e(null),a=$e(null),o=In(()=>{let C=t.x,M=t.y;return C+200>window.innerWidth&&(C=window.innerWidth-200-4),M+300>window.innerHeight&&(M=window.innerHeight-300-4),{left:`${C}px`,top:`${M}px`}}),l=In(()=>t.target.layer===3),c=In(()=>i.data?i.data.lifelines.filter(S=>S.parent_id==="ROOT").map(S=>({...S,children:i.data.lifelines.filter(C=>C.parent_id===S.id)})):[]),u=In(()=>!i.data||!t.target.id?null:i.data.entities.find(S=>S.id===t.target.id)?.lifeline_id??null),d=["task","memory","decision","item"],h={task:"任务",memory:"记忆",decision:"决策",item:"条目"};function f(){n("edit-title",t.target),n("close")}function p(){n("delete-entity",t.target),n("close")}function v(E){n("move-lifeline",t.target.id,E),n("close")}function g(E){n("create-entity",E,t.target.id),n("close")}function m(){n("associate-to",t.target),n("close")}function x(){n("edit-lifeline-name",t.target),n("close")}function _(E){s.value&&!s.value.contains(E.target)&&n("close")}function y(E){E.key==="Escape"&&n("close")}return ar(()=>{document.addEventListener("pointerdown",_,!0),document.addEventListener("keydown",y)}),la(()=>{document.removeEventListener("pointerdown",_,!0),document.removeEventListener("keydown",y)}),(E,S)=>(se(),ae("div",{ref_key:"menuRef",ref:s,class:"ctx-menu",style:Ys(o.value)},[l.value?(se(),ae(lt,{key:0},[F("button",{class:"ctx-item",onClick:f},"编辑标题…"),F("div",{class:"ctx-item has-sub",onPointerenter:S[0]||(S[0]=C=>a.value="lifeline"),onPointerleave:S[1]||(S[1]=C=>a.value=null)},[S[4]||(S[4]=_s(" 移动到 lifeline ▸ ",-1)),a.value==="lifeline"?(se(),ae("div",T1,[(se(!0),ae(lt,null,gn(c.value,C=>(se(),ae(lt,{key:C.id},[F("button",{class:Pn(["subitem r1-item",{current:C.id===u.value}]),disabled:C.id===u.value,onClick:M=>v(C.id)},Fe(C.name),11,C1),(se(!0),ae(lt,null,gn(C.children,M=>(se(),ae("button",{key:M.id,class:Pn(["subitem r2-item",{current:M.id===u.value}]),disabled:M.id===u.value,onClick:T=>v(M.id)},Fe(M.name),11,R1))),128))],64))),128)),c.value.length===0?(se(),ae("div",I1,"暂无 lifeline")):Ze("",!0)])):Ze("",!0)],32),F("button",{class:"ctx-item",onClick:m},"关联到…"),S[5]||(S[5]=F("div",{class:"ctx-separator"},null,-1)),F("button",{class:"ctx-item danger",onClick:p},"删除")],64)):(se(),ae(lt,{key:1},[F("div",{class:"ctx-item has-sub",onPointerenter:S[2]||(S[2]=C=>a.value="entity"),onPointerleave:S[3]||(S[3]=C=>a.value=null)},[S[6]||(S[6]=_s(" 新建 entity ▸ ",-1)),a.value==="entity"?(se(),ae("div",P1,[(se(),ae(lt,null,gn(d,C=>F("button",{key:C,class:"subitem",onClick:M=>g(C)},Fe(h[C]),9,L1)),64))])):Ze("",!0)],32),F("button",{class:"ctx-item",onClick:x},"编辑名称…")],64))],4))}}),U1=Si(D1,[["__scopeId","data-v-cdcbfb83"]]),N1={class:"confirm-title"},F1={key:0,class:"confirm-message"},O1={class:"confirm-actions"},B1=wi({__name:"ConfirmDialog",props:{title:{},message:{default:""},confirmLabel:{default:"确认"},cancelLabel:{default:"取消"},danger:{type:Boolean,default:!1}},emits:["confirm","cancel"],setup(r,{emit:e}){const t=e;function n(i){i.key==="Escape"&&t("cancel"),i.key==="Enter"&&t("confirm")}return ar(()=>{document.addEventListener("keydown",n)}),la(()=>{document.removeEventListener("keydown",n)}),(i,s)=>(se(),ae("div",{class:"confirm-overlay",onPointerdown:s[3]||(s[3]=a=>t("cancel"))},[F("div",{class:"confirm-dialog",onPointerdown:s[2]||(s[2]=ni(()=>{},["stop"]))},[F("div",N1,Fe(r.title),1),r.message?(se(),ae("div",F1,Fe(r.message),1)):Ze("",!0),F("div",O1,[F("button",{class:"confirm-btn cancel-btn",onClick:s[0]||(s[0]=a=>t("cancel"))},Fe(r.cancelLabel),1),F("button",{class:Pn(["confirm-btn",r.danger?"danger-btn":"primary-btn"]),onClick:s[1]||(s[1]=a=>t("confirm"))},Fe(r.confirmLabel),3)])],32)],32))}}),k1=Si(B1,[["__scopeId","data-v-128fcad2"]]),z1={class:"dialog"},V1={class:"dialog-title"},G1={class:"field-row"},H1={class:"entity-ref"},W1={class:"field-row"},X1={class:"entity-ref"},q1={key:0,class:"status-row"},$1={class:"field-row"},Y1=["value"],Z1={class:"field-row"},J1={class:"label"},K1={class:"conf-value"},j1={class:"evidence-section"},Q1=["onUpdate:modelValue"],eE=["onUpdate:modelValue"],tE=["onClick"],nE={class:"dialog-actions"},iE={key:1,class:"delete-area"},sE={key:2,class:"delete-confirm"},rE=wi({__name:"AssociationEditDialog",props:{fromId:{},fromTitle:{},toId:{},toTitle:{},existing:{}},emits:["cancel","create","update","delete"],setup(r,{emit:e}){const t=r,n=e,i=$e(t.existing?.relation_type||"manual"),s=$e(t.existing?.confidence??.7),a=of(t.existing?.evidence?.length?t.existing.evidence.map(v=>({...v})):[{type:"manual",excerpt:"",weight:.8}]),o=!t.existing,l=$e(!1),c=[{value:"co_occurrence",label:"共现"},{value:"causal",label:"因果"},{value:"tension",label:"张力"},{value:"derived_from",label:"衍生"},{value:"manual",label:"人工标注"}];function u(){a.length<5&&a.push({type:"manual",excerpt:"",weight:.5})}function d(v){a.length>1&&a.splice(v,1)}function h(){o?n("create",{from:t.fromId,to:t.toId,relation_type:i.value,confidence:s.value,evidence:a.filter(v=>v.excerpt.trim())}):n("update",{association_id:t.existing.id,relation_type:i.value,confidence:s.value,evidence:a.filter(v=>v.excerpt.trim())})}function f(){n("delete",t.existing.id)}function p(v){v.key==="Escape"&&n("cancel")}return ar(()=>{document.addEventListener("keydown",p)}),la(()=>{document.removeEventListener("keydown",p)}),(v,g)=>(se(),ae("div",{class:"dialog-overlay",onClick:g[5]||(g[5]=ni(m=>n("cancel"),["self"]))},[F("div",z1,[F("div",V1,Fe(o?"新建关联":"编辑关联"),1),F("div",G1,[g[6]||(g[6]=F("span",{class:"label"},"从",-1)),F("span",H1,Fe(r.fromTitle.slice(0,30)),1)]),F("div",W1,[g[7]||(g[7]=F("span",{class:"label"},"到",-1)),F("span",X1,Fe(r.toTitle.slice(0,30)),1)]),o?Ze("",!0):(se(),ae("div",q1,[g[8]||(g[8]=F("span",{class:"label"},"状态",-1)),F("span",{class:Pn(["status-badge",t.existing.status])},Fe(t.existing.status==="accepted"?"已确认":t.existing.status==="rejected"?"已拒绝":"待定"),3)])),F("div",$1,[g[9]||(g[9]=F("label",{class:"label",for:"rel-type"},"关系类型",-1)),Tt(F("select",{id:"rel-type","onUpdate:modelValue":g[0]||(g[0]=m=>i.value=m),class:"field"},[(se(),ae(lt,null,gn(c,m=>F("option",{key:m.value,value:m.value},Fe(m.label),9,Y1)),64))],512),[[ds,i.value]])]),F("div",Z1,[F("label",J1,[g[10]||(g[10]=_s(" 信心度 ",-1)),F("span",K1,Fe(s.value.toFixed(2)),1)]),Tt(F("input",{"onUpdate:modelValue":g[1]||(g[1]=m=>s.value=m),type:"range",min:"0.3",max:"1.0",step:"0.01",class:"slider"},null,512),[[kt,s.value,void 0,{number:!0}]])]),F("div",j1,[g[12]||(g[12]=F("span",{class:"label"},"证据",-1)),(se(!0),ae(lt,null,gn(a,(m,x)=>(se(),ae("div",{key:x,class:"evidence-edit-row"},[Tt(F("select",{"onUpdate:modelValue":_=>m.type=_,class:"field evidence-type-sel"},[...g[11]||(g[11]=[_o('<option value="manual" data-v-0ae04a56>人工标注</option><option value="semantic" data-v-0ae04a56>语义相似</option><option value="co_occurrence" data-v-0ae04a56>共现统计</option><option value="temporal" data-v-0ae04a56>时间序列</option><option value="causal_hint" data-v-0ae04a56>因果模式</option>',5)])],8,Q1),[[ds,m.type]]),Tt(F("input",{"onUpdate:modelValue":_=>m.excerpt=_,class:"field evidence-excerpt",placeholder:"证据摘要（10-120 字）"},null,8,eE),[[kt,m.excerpt]]),a.length>1?(se(),ae("button",{key:0,class:"btn-icon",onClick:_=>d(x)},"×",8,tE)):Ze("",!0)]))),128)),a.length<5?(se(),ae("button",{key:0,class:"btn-text",onClick:u},"+ 添加证据")):Ze("",!0)]),F("div",nE,[F("button",{class:"btn-cancel",onClick:g[2]||(g[2]=m=>n("cancel"))},"取消"),F("button",{class:"btn-submit",onClick:h},Fe(o?"创建关联":"保存修改"),1)]),!o&&!l.value?(se(),ae("div",iE,[F("button",{class:"btn-delete",onClick:g[3]||(g[3]=m=>l.value=!0)},"删除关联")])):Ze("",!0),l.value?(se(),ae("div",sE,[g[13]||(g[13]=_s(" 确定删除此关联？ ",-1)),F("button",{class:"btn-delete",onClick:f},"确认删除"),F("button",{class:"btn-text",onClick:g[4]||(g[4]=m=>l.value=!1)},"取消")])):Ze("",!0)])]))}}),aE=Si(rE,[["__scopeId","data-v-0ae04a56"]]),oE=wi({__name:"LegendBar",props:{showAssoc:{type:Boolean}},setup(r){const e=r,t=$e(!1),n=$e(!1);let i;function s(){t.value=!1,i&&clearTimeout(i),i=window.setTimeout(()=>{n.value||(t.value=!0)},5e3)}return ar(()=>s()),la(()=>{i&&clearTimeout(i)}),pu(()=>e.showAssoc,()=>s()),(a,o)=>(se(),ae("div",{class:Pn(["legend-bar",{faded:t.value&&!n.value}]),onMouseenter:o[0]||(o[0]=l=>{n.value=!0,t.value=!1}),onMouseleave:o[1]||(o[1]=l=>{n.value=!1,s()})},[o[3]||(o[3]=_o('<div class="legend-section" data-v-53c6bdbb><span class="legend-title" data-v-53c6bdbb>节点</span><span class="legend-item" data-v-53c6bdbb><span class="dot task" data-v-53c6bdbb>■</span> 任务</span><span class="legend-item" data-v-53c6bdbb><span class="dot memory" data-v-53c6bdbb>●</span> 记忆</span><span class="legend-item" data-v-53c6bdbb><span class="dot decision" data-v-53c6bdbb>◆</span> 决策</span><span class="legend-item" data-v-53c6bdbb><span class="dot item" data-v-53c6bdbb>▲</span> 条目</span></div>',1)),r.showAssoc?(se(),ae(lt,{key:0},[o[2]||(o[2]=_o('<div class="legend-sep" data-v-53c6bdbb>|</div><div class="legend-section" data-v-53c6bdbb><span class="legend-title" data-v-53c6bdbb>关联</span><span class="legend-item" data-v-53c6bdbb><span class="line-sample causal" data-v-53c6bdbb></span> 因果</span><span class="legend-item" data-v-53c6bdbb><span class="line-sample co" data-v-53c6bdbb></span> 共现</span><span class="legend-item" data-v-53c6bdbb><span class="line-sample tension" data-v-53c6bdbb></span> 张力</span><span class="legend-item" data-v-53c6bdbb><span class="line-sample derived" data-v-53c6bdbb></span> 衍生</span></div>',2))],64)):Ze("",!0)],34))}}),lE=Si(oE,[["__scopeId","data-v-53c6bdbb"]]),cE={class:"cosmos-view"},uE={class:"cosmos-hud"},hE={key:0,class:"overlay-state"},dE={key:1,class:"overlay-state"},fE={key:2,class:"overlay-state"},pE={key:0,class:"tooltip"},mE={class:"create-actions"},gE=["disabled"],_E={class:"create-title"},vE={class:"create-sub"},xE={class:"create-actions"},yE=["disabled"],ME={key:5,class:"select-hint"},bE={key:6,class:"assoc-filter-bar"},SE={class:"filter-chips"},wE=["onClick"],EE={class:"filter-slider"},AE={class:"filter-label"},TE={class:"filter-count"},CE={key:0,class:"filter-empty"},RE=1.5,IE=wi({__name:"CosmosView",setup(r){const e=ca(),t=$e(null);let n=null,i=null,s=0,a=[],o="";const l=$e(!1),c=$e(null),u=$e(null);function d(U,q,w,b){return new Promise(N=>{u.value={title:U,message:q,confirmLabel:w,danger:b,resolve:N}})}const h=$e(null),f=$e(""),p=$e(null),v=$e(null),g=$e(!0),m=$e(!1);let x,_=null,y=null;const E=of({types:["co_occurrence","causal","tension","derived_from","manual"],minConfidence:0,status:"all"});function S(){for(const U of a){const q=E.types.includes(U.data.relation_type),w=U.data.confidence>=E.minConfidence,b=E.status==="all"||U.data.status===E.status,N=q&&w&&b;U.line.visible=N,U.arrow&&(U.arrow.visible=N)}}function C(U){E.types.includes(U)?E.types.length>1&&(E.types=E.types.filter(q=>q!==U)):E.types=[...E.types,U],S()}const M=In(()=>a.filter(U=>U.line.visible).length);let T=null,I=null,P=null;async function k(){if(!e.data||!t.value)return;const U=await Et(()=>Promise.resolve().then(()=>nS),void 0),q=(await Et(async()=>{const{OrbitControls:re}=await import("./OrbitControls-CsLW2n6Y.js");return{OrbitControls:re}},__vite__mapDeps([3,0,1,2]))).OrbitControls,{CSS2DRenderer:w}=await Et(async()=>{const{CSS2DRenderer:re}=await import("./CSS2DRenderer-BYnuz-iR.js");return{CSS2DRenderer:re}},__vite__mapDeps([4,0,1,2]));n=await cS(t.value,e.data),i=new q(n.camera,n.renderer.domElement),i.enableDamping=!0,i.dampingFactor=.08,i.enableZoom=!0,i.zoomSpeed=.6,i.enablePan=!1,i.minDistance=.5,i.maxDistance=9,T=new w,T.setSize(window.innerWidth,window.innerHeight),T.domElement.style.position="absolute",T.domElement.style.top="0",T.domElement.style.pointerEvents="none",document.querySelector(".cosmos-view")?.appendChild(T.domElement);const{createLabelGroup:b}=await Et(async()=>{const{createLabelGroup:re}=await import("./labels-DDFPsODQ.js");return{createLabelGroup:re}},__vite__mapDeps([5,4,0,1,2]));I=b(),I.create(n.scene,n.layoutNodes),P=n.setResolution,window.addEventListener("resize",z);const N=new U.Raycaster,J=new U.Vector2;t.value.addEventListener("click",re=>{if(!n)return;if(J.x=re.offsetX/t.value.clientWidth*2-1,J.y=-(re.offsetY/t.value.clientHeight)*2+1,N.setFromCamera(J,n.camera),e.selectingTarget){const ve=N.intersectObjects(n.pickables);if(ve.length>0){const He=ve[0].object;if(He.userData.layer===3&&He.userData.id!==e.selectingTarget.fromId){const Ye=e.data?.entities.find(ht=>ht.id===He.userData.id)?.title||"";e.openEditAssoc({id:"",from:e.selectingTarget.fromId,fromTitle:e.selectingTarget.fromTitle,to:He.userData.id,toTitle:Ye,relation_type:"manual",confidence:.7,status:"accepted",evidence:[]}),e.cancelSelecting();return}}e.cancelSelecting();return}if(e.state.kind==="relation_reveal"&&a.length>0){const ve=N.intersectObjects(a.map(He=>He.line));if(ve.length>0){const He=ve[0].object,Ye=a.find(ht=>ht.line===He);if(Ye){e.selectedAssocId===Ye.data.id?e.selectAssociation(null):e.selectAssociation(Ye.data.id);return}}}const ge=N.intersectObjects(n.pickables);if(ge.length===0){if(e.selectAssociation(null),e.state.kind==="node_focus"||e.state.kind==="relation_reveal"){const ve=e.state.entity_id,Ye=e.data?.entities.find(ht=>ht.id===ve)?.lifeline_id;Ye?e.transition({kind:"region_zoom",lifeline_id:Ye}):e.transition({kind:"global_overview"})}else e.state.kind==="region_zoom"&&e.transition({kind:"global_overview"});return}e.selectAssociation(null);const ee=ge[0].object,j=ee.userData.layer,Me=ee.userData.id,Te=ee.userData.kind,ye=e.state;ye.kind==="global_overview"&&j===1?e.transition({kind:"region_zoom",lifeline_id:Me}):ye.kind==="region_zoom"&&(j===2||j===3)?e.transition({kind:"node_focus",entity_kind:Te||"lifeline",entity_id:Me}):ye.kind==="node_focus"?e.transition({kind:"node_focus",entity_kind:Te||"lifeline",entity_id:Me}):ye.kind==="relation_reveal"&&(Qe(),e.transition({kind:"node_focus",entity_kind:Te||"lifeline",entity_id:Me}))}),t.value.addEventListener("mousemove",re=>{if(!n)return;J.x=re.offsetX/t.value.clientWidth*2-1,J.y=-(re.offsetY/t.value.clientHeight)*2+1,N.setFromCamera(J,n.camera);const ge=N.intersectObjects(n.pickables);if(ge.length>0){const j=ge[0].object;j!==_&&(B(),_=j,L(j)),t.value.style.cursor=e.selectingTarget?"crosshair":"pointer"}else B(),t.value.style.cursor=e.selectingTarget?"crosshair":"";if(e.state.kind!=="relation_reveal")return;const ee=N.intersectObjects(n.lines.concat(a.map(j=>j.line)));if(ee.length>0&&a.some(j=>j.line===ee[0].object)){const j=a.find(Me=>Me.line===ee[0].object);j&&(o=j.data.evidence?.[0]?.excerpt||"",j.line!==y&&(oe(),y=j.line,V(j)))}else o="",oe()}),t.value.addEventListener("contextmenu",re=>{if(re.preventDefault(),!n||!e.data||e.state.kind==="global_overview")return;J.x=re.offsetX/t.value.clientWidth*2-1,J.y=-(re.offsetY/t.value.clientHeight)*2+1,N.setFromCamera(J,n.camera);const ge=N.intersectObjects(n.pickables);if(ge.length===0){c.value=null;return}const ee=ge[0].object,j=ee.userData.id,Me=ee.userData.kind,Te=ee.userData.layer;if(Te<1||Te>3){c.value=null;return}let ye="";Te<=2?ye=e.data.lifelines.find(He=>He.id===j)?.name||j:ye=e.data.entities.find(He=>He.id===j)?.title||j,c.value={x:re.clientX,y:re.clientY,target:{id:j,kind:Me,title:ye,layer:Te}}}),window.addEventListener("keydown",Je),document.querySelector(".cosmos-hud")?.addEventListener("mouseenter",()=>{g.value=!0,x&&clearTimeout(x)}),x=window.setTimeout(()=>{g.value=!1,m.value=!0},3e3),Be()}function Z(U){e.transition({kind:"region_zoom",lifeline_id:U})}function z(){if(!T||!P)return;const U=window.innerWidth,q=window.innerHeight;T.setSize(U,q),P(U,q)}function L(U){U.scale.setScalar(RE);const q=U.material;q._origColor=q._origColor??q.color.getHex(),q.color.set(On("--accent")),q.needsUpdate=!0}function B(){if(!_)return;_.scale.setScalar(1);const U=_.material;U._origColor!==void 0&&(U.color.setHex(U._origColor),delete U._origColor,U.needsUpdate=!0),_=null}function V(U){const q=U.line.material;q._origLinewidth=q._origLinewidth??q.linewidth,q._origColor=q._origColor??q.color.getHex(),q.linewidth=q._origLinewidth*1.3,q.color.set(On("--accent")),q.needsUpdate=!0,a.forEach(w=>{if(w.line!==U.line){const b=w.line.material;b.transparent=!0,b._origOpacity=b._origOpacity??b.opacity,b.opacity=(b._origOpacity||.8)*.3,b.needsUpdate=!0}})}function oe(){if(!y)return;const U=y.material;U._origLinewidth!==void 0&&(U.linewidth=U._origLinewidth,delete U._origLinewidth),U._origColor!==void 0&&(U.color.setHex(U._origColor),delete U._origColor),U.needsUpdate=!0,a.forEach(q=>{const w=q.line.material;w._origOpacity!==void 0&&(w.opacity=w._origOpacity,delete w._origOpacity,w.needsUpdate=!0)}),y=null}function Q(U){if(l.value=!1,!!n)if(U.kind==="lifeline")if(U.layer===1)e.transition({kind:"region_zoom",lifeline_id:U.id});else{let q=e.data?.lifelines.find(w=>w.id===U.id)?.parent_id;for(;q&&q!=="ROOT";){const w=e.data?.lifelines.find(b=>b.id===q);if(w&&w.parent_id==="ROOT")break;q=w?.parent_id}q&&q!=="ROOT"&&e.transition({kind:"region_zoom",lifeline_id:q})}else e.transition({kind:"node_focus",entity_kind:U.kind,entity_id:U.id})}function le(U){U.layer===3&&v.value?.startEditTitle()}async function ie(U){if(!await d(`确定删除「${U.title.slice(0,30)}」？`,"此操作不可撤销。","删除",!0))return;const w=U.id.split(":"),b=w[0],N=parseInt(w.slice(1).join(":"),10);try{await e.deleteEntityById(b,N)}catch{await e.reload()}const J=e.state;if((J.kind==="node_focus"||J.kind==="relation_reveal")&&J.entity_id===U.id){const re=e.data?.entities.find(ge=>ge.id===U.id)?.lifeline_id;re?e.transition({kind:"region_zoom",lifeline_id:re}):e.transition({kind:"global_overview"})}}async function H(U,q){const w=U.split(":"),b=w[0],N=parseInt(w.slice(1).join(":"),10);try{await e.mountEntity(b,N,q)}catch{await e.reload()}}function W(U,q){const w=e.data?.lifelines.find(b=>b.id===q);h.value={kind:U,lifelineId:q,lifelineName:w?.name||q},f.value="",setTimeout(()=>p.value?.focus(),50)}async function X(){if(!h.value)return;const U=f.value.trim();if(!U)return;const{kind:q,lifelineId:w}=h.value;try{await e.createEntityUnderLifeline(q,U,w)}catch{await e.reload()}h.value=null}function te(){h.value=null}function K(U){U.key==="Enter"?X():U.key==="Escape"&&te()}const fe=$e(null),me=$e(""),Ce=$e(null);function Ge(U){fe.value={id:U.id,name:U.title},me.value=U.title,Yc(()=>Ce.value?.focus())}async function ke(){if(!fe.value)return;const U=me.value.trim();if(!U||U===fe.value.name){fe.value=null;return}try{await e.updateLifeline(fe.value.id,{name:U}),fe.value=null}catch{await e.reload(),fe.value=null}}function ft(U){U.key==="Enter"?(U.stopPropagation(),ke()):U.key==="Escape"&&(U.stopPropagation(),fe.value=null)}function je(U){e.startSelectingTarget(U.id,U.title)}async function de(U){await e.createAssoc(U),e.closeEditAssoc()}async function xe(U){await e.updateAssoc(U.association_id,{relation_type:U.relation_type,confidence:U.confidence,evidence:U.evidence}),e.closeEditAssoc()}async function pe(U){e.closeEditAssoc(),await e.deleteAssoc(U)}async function Re(U){if(!e.data)return;const q=e.state;if(q.kind!=="node_focus"&&q.kind!=="relation_reveal")return;const w=q.entity_id;if(!e.data.entities.find(re=>re.id===w))return;const N=e.data.associations.find(re=>re.id===U.id);if(!N)return;const J=e.data.entities.find(re=>re.id===N.from),ue=e.data.entities.find(re=>re.id===N.to);e.openEditAssoc({id:N.id,from:N.from,fromTitle:J?.title||N.from,to:N.to,toTitle:ue?.title||N.to,relation_type:N.relation_type,confidence:N.confidence,status:N.status,evidence:N.evidence||[]})}async function Ee(U){await d("删除关联","确定删除这条关联？此操作不可撤销。","确认删除",!0)&&await e.deleteAssoc(U)}function Je(U){if((U.ctrlKey||U.metaKey)&&U.key==="k"){U.preventDefault(),U.stopPropagation(),l.value=!l.value;return}if(U.key==="/"&&!l.value){const w=U.target;if(w.tagName==="INPUT"||w.tagName==="TEXTAREA")return;U.preventDefault(),l.value=!0;return}const q=e.state;if(U.key==="Escape"){if(e.selectingTarget){e.cancelSelecting();return}if(l.value){l.value=!1;return}q.kind==="relation_reveal"?(Qe(),e.transition({kind:"node_focus",entity_kind:q.entity_kind,entity_id:q.entity_id})):q.kind==="node_focus"?e.transition({kind:q.lifeline_id?"region_zoom":"global_overview",lifeline_id:q.lifeline_id}):q.kind==="region_zoom"&&e.transition({kind:"global_overview"})}(U.key==="r"||U.key==="R")&&(q.kind==="node_focus"?D():q.kind==="relation_reveal"&&Qe())}function D(){if(!e.data||!n)return;const U=e.state;if(U.kind!=="node_focus")return;const q=U.entity_id;e.transition({kind:"relation_reveal",entity_kind:U.entity_kind,entity_id:q}),a=fS(n.scene,e.data,n.layoutNodes,q,new he(t.value.clientWidth,t.value.clientHeight));const w=new Set([q]);a.forEach(b=>{w.add(b.fromNode.id),w.add(b.toNode.id)}),pS(n.nodes,w),S()}function Qe(){n&&(oe(),a.forEach(U=>{if(n.scene.remove(U.line),U.line.geometry?.dispose(),U.line.material){const q=U.line.material;Array.isArray(q)?q.forEach(w=>w.dispose()):q.dispose()}U.arrow&&(n.scene.remove(U.arrow),U.arrow.geometry?.dispose(),U.arrow.material instanceof qt&&U.arrow.material.dispose())}),a=[],af(n.nodes))}function Be(){if(!n)return;s=requestAnimationFrame(Be),i?.update(),xS(.016,n.camera,i);const U=n.camera.position.length(),q=U>3.5?1:U>=2?2:3,w=e.state.kind==="node_focus"||e.state.kind==="relation_reveal";n.nodes.forEach(b=>{const N=b.userData.layer;b.visible=w||N<=q}),n.lines.forEach(b=>{const N=b.userData?.fromLayer??3,J=b.userData?.toLayer??3;b.visible=w||Math.max(N,J)<=q}),mS(n.nodes,.016),I&&I.syncPositions(n.nodes),n.renderer.render(n.scene,n.camera),I&&T&&(I.update(e.state,n.camera,e.data?.associations),T.render(n.scene,n.camera))}async function et(){if(!n)return;const U=e.state,q=n.layoutNodes;if(U.kind==="global_overview"){qc(n.scene);for(const w of n.nodes)w.userData.targetPosition=w.userData.homePosition.clone();af(n.nodes),$c(n.camera,i,new R(0,2.5,5.5),new R(0,0,0),60,800)}else if(U.kind==="region_zoom"){qc(n.scene);for(const J of n.nodes)J.userData.targetPosition=J.userData.homePosition.clone();const w=U.lifeline_id;let N=q.find(J=>J.id===w&&J.layer===1);if(!N){const J=q.find(ue=>ue.id===w);if(J){let ue=J.parentId;for(;ue;){const re=q.find(ge=>ge.id===ue);if(re&&re.layer===1){N=re;break}ue=re?.parentId}}}if(N){const J=N.position.clone().normalize(),ue=zi.R1+1.8;$c(n.camera,i,J.clone().multiplyScalar(ue),N.position,50,800);const re=N.id,ge=new Set,ee=[re];for(;ee.length>0;){const j=ee.shift();ge.add(j),q.filter(Me=>Me.parentId===j).forEach(Me=>ee.push(Me.id))}im(n.nodes,ge)}}else if(U.kind==="node_focus"||U.kind==="relation_reveal"){const w=U.entity_id,b=q.find(j=>j.id===w);if(!b)return;qc(n.scene),_S(n.scene,b.position,On("--accent"));const N=b.position.clone().normalize(),J=b.position.length()+.6,ue=N.clone().multiplyScalar(J);$c(n.camera,i,ue,b.position,U.kind==="node_focus"?35:55,800);const{computeFocusLayout:re}=await Et(async()=>{const{computeFocusLayout:j}=await Promise.resolve().then(()=>oS);return{computeFocusLayout:j}},void 0),{targets:ge,constellationIds:ee}=re(q,w,e.data?.associations||[],N);for(const j of n.nodes){const Me=j.userData.id,Te=ge.get(Me);j.userData.targetPosition=Te?Te.clone():j.userData.homePosition.clone()}gS(n.nodes,ee)}}return pu(()=>e.state,et,{deep:!0}),ar(async()=>{await e.load(),e.data&&await k()}),la(()=>{cancelAnimationFrame(s),n?.dispose(),i?.dispose(),window.removeEventListener("keydown",Je),window.removeEventListener("resize",z),I&&(I.dispose(),I=null),T?.domElement&&T.domElement.remove(),x&&clearTimeout(x)}),(U,q)=>(se(),ae("div",cE,[F("div",uE,[Kl(SS,{state:ut(e).state,onNav:q[0]||(q[0]=w=>ut(e).transition(w))},null,8,["state"]),l.value?(se(),mr(A1,{key:0,onSelect:Q,onClose:q[1]||(q[1]=w=>l.value=!1)})):Ze("",!0),l.value?Ze("",!0):(se(),mr(nw,{key:1,onFocusLifeline:Z})),l.value?Ze("",!0):(se(),ae("button",{key:2,class:"search-trigger",onClick:q[2]||(q[2]=w=>l.value=!0)},"搜索 ⌘K"))]),ut(e).loading?(se(),ae("div",hE,[...q[16]||(q[16]=[F("div",{class:"loader-ring"},null,-1),F("div",{class:"state-text"},"加载 Atlas…",-1)])])):ut(e).error?(se(),ae("div",dE,[q[17]||(q[17]=F("div",{class:"state-text"},"Cosmos 数据加载失败",-1)),q[18]||(q[18]=F("div",{class:"state-sub"},"API 和 mock 均不可用",-1)),F("button",{class:"retry-btn",onClick:q[3]||(q[3]=w=>ut(e).reload())},"重试")])):ut(e).data&&ut(e).data.lifelines.length===0?(se(),ae("div",fE,[...q[19]||(q[19]=[F("div",{class:"state-text"},"暂无 lifeline",-1),F("div",{class:"state-sub"},"在左侧面板中创建第一条 lifeline 来开始构建知识星球",-1)])])):Ze("",!0),!ut(e).loading&&!ut(e).error&&ut(e).data&&ut(e).data.lifelines.length>0?(se(),ae(lt,{key:3},[F("canvas",{ref_key:"canvasRef",ref:t,class:"cosmos-canvas"},null,512),Kl(g1,{ref_key:"nodeDetailRef",ref:v,onEditAssoc:Re,onDeleteAssoc:Ee},null,512),ut(o)&&ut(e).state.kind==="relation_reveal"?(se(),ae("div",pE,Fe(ut(o)),1)):Ze("",!0),ut(e).state.kind==="global_overview"&&g.value?(se(),ae("div",{key:1,class:Pn(["shortcuts-hint",{fade:m.value}])}," R 显示关联   Esc 返回   滚轮缩放   拖拽旋转   Ctrl+K 搜索 ",2)):Ze("",!0),c.value?(se(),mr(U1,{key:2,target:c.value.target,x:c.value.x,y:c.value.y,onClose:q[4]||(q[4]=w=>c.value=null),onEditTitle:le,onDeleteEntity:ie,onMoveLifeline:H,onCreateEntity:W,onEditLifelineName:Ge,onAssociateTo:je},null,8,["target","x","y"])):Ze("",!0),u.value?(se(),mr(k1,{key:3,title:u.value.title,message:u.value.message,"confirm-label":u.value.confirmLabel,danger:u.value.danger,onConfirm:q[5]||(q[5]=w=>{u.value.resolve(!0),u.value=null}),onCancel:q[6]||(q[6]=w=>{u.value.resolve(!1),u.value=null})},null,8,["title","message","confirm-label","danger"])):Ze("",!0),fe.value?(se(),ae("div",{key:4,class:"create-overlay",onPointerdown:q[10]||(q[10]=w=>fe.value=null)},[F("div",{class:"create-dialog",onPointerdown:q[9]||(q[9]=ni(()=>{},["stop"]))},[q[20]||(q[20]=F("div",{class:"create-title"},"编辑 lifeline 名称",-1)),Tt(F("input",{ref_key:"lifelineEditEl",ref:Ce,"onUpdate:modelValue":q[7]||(q[7]=w=>me.value=w),class:"create-input",onKeydown:ft},null,544),[[kt,me.value]]),F("div",mE,[F("button",{class:"confirm-btn cancel-btn",onClick:q[8]||(q[8]=w=>fe.value=null)},"取消"),F("button",{class:"confirm-btn primary-btn",disabled:!me.value.trim(),onClick:ke},"保存",8,gE)])],32)],32)):Ze("",!0),h.value?(se(),ae("div",{key:5,class:"create-overlay",onPointerdown:te},[F("div",{class:"create-dialog",onPointerdown:q[12]||(q[12]=ni(()=>{},["stop"]))},[F("div",_E,"新建 "+Fe(h.value.kind),1),F("div",vE,"添加到「"+Fe(h.value.lifelineName)+"」",1),Tt(F("input",{ref_key:"createInputEl",ref:p,"onUpdate:modelValue":q[11]||(q[11]=w=>f.value=w),class:"create-input",placeholder:"输入标题…",onKeydown:K},null,544),[[kt,f.value]]),F("div",xE,[F("button",{class:"confirm-btn cancel-btn",onClick:te},"取消"),F("button",{class:"confirm-btn primary-btn",disabled:!f.value.trim(),onClick:X},"创建",8,yE)])],32)],32)):Ze("",!0)],64)):Ze("",!0),ut(e).editAssoc?(se(),mr(aE,{key:4,"from-id":ut(e).editAssoc.from,"from-title":ut(e).editAssoc.fromTitle,"to-id":ut(e).editAssoc.to,"to-title":ut(e).editAssoc.toTitle,existing:ut(e).editAssoc.id?{id:ut(e).editAssoc.id,relation_type:ut(e).editAssoc.relation_type,confidence:ut(e).editAssoc.confidence,status:ut(e).editAssoc.status,evidence:ut(e).editAssoc.evidence}:void 0,onCancel:q[13]||(q[13]=w=>ut(e).closeEditAssoc()),onCreate:de,onUpdate:xe,onDelete:pe},null,8,["from-id","from-title","to-id","to-title","existing"])):Ze("",!0),ut(e).selectingTarget?(se(),ae("div",ME," crosshair 点击目标 entity 来创建关联 (Esc 取消) ")):Ze("",!0),Kl(lE,{"show-assoc":ut(e).state.kind==="relation_reveal"},null,8,["show-assoc"]),ut(e).state.kind==="relation_reveal"?(se(),ae("div",bE,[F("div",SE,[(se(),ae(lt,null,gn(["co_occurrence","causal","tension","derived_from","manual"],w=>F("button",{key:w,class:Pn(["filter-chip",{active:E.types.includes(w)}]),onClick:b=>C(w)},Fe({co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[w]),11,wE)),64))]),F("div",EE,[F("span",AE,"信心度 ≥ "+Fe(E.minConfidence.toFixed(2)),1),Tt(F("input",{"onUpdate:modelValue":q[14]||(q[14]=w=>E.minConfidence=w),type:"range",min:"0",max:"1",step:"0.05",class:"filter-range",onInput:S},null,544),[[kt,E.minConfidence,void 0,{number:!0}]])]),Tt(F("select",{"onUpdate:modelValue":q[15]||(q[15]=w=>E.status=w),class:"filter-select",onChange:S},[...q[21]||(q[21]=[F("option",{value:"all"},"全部",-1),F("option",{value:"accepted"},"已确认",-1),F("option",{value:"pending"},"待定",-1)])],544),[[ds,E.status]]),F("span",TE,"显示 "+Fe(M.value)+"/"+Fe(ut(a).length)+" 条关联",1),ut(a).length>0&&M.value===0?(se(),ae("span",CE,"当前筛选条件下无可见关联")):Ze("",!0)])):Ze("",!0)]))}}),PE=Si(IE,[["__scopeId","data-v-2426a5ea"]]),UE=Object.freeze(Object.defineProperty({__proto__:null,default:PE},Symbol.toStringTag,{value:"Module"}));export{iv as C,fm as M,_t as O,Ni as P,tn as Q,lr as R,O0 as S,pm as T,he as V,UE as a,rl as b,tt as c,R as d};
