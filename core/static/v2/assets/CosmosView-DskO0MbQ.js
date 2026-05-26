const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CmSQsQ1p.js","assets/vue-Cvl-Tb45.js","assets/index-RjWMaq7c.css","assets/OrbitControls-Cp0G7l1N.js","assets/CSS2DRenderer-HyXOXZeX.js","assets/labels-Df-tmGc7.js"])))=>i.map(i=>d[i]);
import{_ as Tt,a as Xn}from"./index-CmSQsQ1p.js";import{m as mm,u as Xe,l as $n,s as Y,f as Q,F as et,v as sn,e as We,w as Me,c as dn,x as Je,b as D,C as Lt,z as Xt,D as Qn,y as ws,E as mn,p as ar,o as An,i as Cn,A as Co,h as ta,n as nu,r as ns,q as Us,t as df,j as Ca,d as as}from"./vue-Cvl-Tb45.js";const vr=mm("cosmos",()=>{const r=Xe(null),e=Xe({kind:"global_overview"}),t=Xe(!1),n=Xe(null),i=Xe(null);function s(z){i.value=z}const a={};function o(z,N){a[z]?.forEach(V=>V(N))}function l(z,N){a[z]||(a[z]=[]),a[z].push(N)}async function c(){if(!r.value){t.value=!0;try{const{apiRequest:z}=await Tt(async()=>{const{apiRequest:N}=await import("./index-CmSQsQ1p.js").then(V=>V.c);return{apiRequest:N}},__vite__mapDeps([0,1,2]));r.value=await z("/cosmos")}catch{try{const N=await fetch("/mock/cosmos.json");r.value=await N.json()}catch{n.value="Cosmos 数据加载失败"}}finally{t.value=!1}}}function u(z){o(`leave_${e.value.kind}`,e.value),e.value=z,i.value=null,o(`enter_${z.kind}`,z)}async function h(){r.value=null,n.value=null,C.value.clear(),await c()}async function d(z){const{createLifeline:N}=await Tt(async()=>{const{createLifeline:V}=await import("./index-CmSQsQ1p.js").then(G=>G.e);return{createLifeline:V}},__vite__mapDeps([0,1,2]));await N(z),await h()}async function f(z,N){const{updateLifeline:V}=await Tt(async()=>{const{updateLifeline:G}=await import("./index-CmSQsQ1p.js").then(le=>le.e);return{updateLifeline:G}},__vite__mapDeps([0,1,2]));await V(z,N),await h()}async function m(z){const{deleteLifeline:N}=await Tt(async()=>{const{deleteLifeline:V}=await import("./index-CmSQsQ1p.js").then(G=>G.e);return{deleteLifeline:V}},__vite__mapDeps([0,1,2]));await N(z),await h()}async function x(z,N,V){const{mountEntity:G}=await Tt(async()=>{const{mountEntity:le}=await import("./index-CmSQsQ1p.js").then(pe=>pe.e);return{mountEntity:le}},__vite__mapDeps([0,1,2]));await G(z,N,V),await h()}async function g(z,N){if(r.value){const V=r.value.associations.findIndex(G=>G.id===z);V!==-1&&(r.value={...r.value,associations:[...r.value.associations.slice(0,V),{...r.value.associations[V],status:N},...r.value.associations.slice(V+1)]})}try{const{reviewAssociation:V}=await Tt(async()=>{const{reviewAssociation:G}=await import("./index-CmSQsQ1p.js").then(le=>le.e);return{reviewAssociation:G}},__vite__mapDeps([0,1,2]));await V(z,N)}catch{await h()}}async function p(z,N,V){const{updateEntity:G}=await Tt(async()=>{const{updateEntity:le}=await import("./index-CmSQsQ1p.js").then(pe=>pe.e);return{updateEntity:le}},__vite__mapDeps([0,1,2]));await G(z,N,{title:V}),await h()}async function v(z,N){const{deleteEntity:V}=await Tt(async()=>{const{deleteEntity:G}=await import("./index-CmSQsQ1p.js").then(le=>le.e);return{deleteEntity:G}},__vite__mapDeps([0,1,2]));await V(z,N),await h()}async function _(z,N,V){const{createEntity:G}=await Tt(async()=>{const{createEntity:le}=await import("./index-CmSQsQ1p.js").then(pe=>pe.e);return{createEntity:le}},__vite__mapDeps([0,1,2]));await G(z,N,V),await h()}async function y(z){const{createAssociation:N}=await Tt(async()=>{const{createAssociation:V}=await import("./index-CmSQsQ1p.js").then(G=>G.e);return{createAssociation:V}},__vite__mapDeps([0,1,2]));await N({...z,status:"accepted"}),await h()}async function E(z,N){const{updateAssociation:V}=await Tt(async()=>{const{updateAssociation:G}=await import("./index-CmSQsQ1p.js").then(le=>le.e);return{updateAssociation:G}},__vite__mapDeps([0,1,2]));await V(z,N),await h()}async function S(z){const{deleteAssociation:N}=await Tt(async()=>{const{deleteAssociation:V}=await import("./index-CmSQsQ1p.js").then(G=>G.e);return{deleteAssociation:V}},__vite__mapDeps([0,1,2]));await N(z),await h()}const C=Xe(new Map),b=Xe(null),w=Xe(null);function P(z,N){b.value={fromId:z,fromTitle:N}}function L(){b.value=null}function k(z){w.value=z}function $(){w.value=null}return{data:r,state:e,loading:t,error:n,load:c,reload:h,transition:u,on:l,createLifeline:d,updateLifeline:f,deleteLifeline:m,mountEntity:x,reviewAssociation:g,selectedAssocId:i,selectAssociation:s,updateEntityTitle:p,deleteEntityById:v,createEntityUnderLifeline:_,createAssoc:y,updateAssoc:E,deleteAssoc:S,selectingTarget:b,startSelectingTarget:P,cancelSelecting:L,editAssoc:w,openEditAssoc:k,closeEditAssoc:$,entityDetailCache:C}});/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Sl="184",gm={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},_m={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},hf=0,iu=1,ff=2,vm=3,xm=0,Wr=1,pf=2,or=3,Ui=0,yn=1,mi=2,xi=0,Es=1,su=2,ru=3,au=4,mf=5,ym=6,Yi=100,gf=101,_f=102,vf=103,xf=104,yf=200,bf=201,Mf=202,Sf=203,Ro=204,Io=205,wf=206,Ef=207,Tf=208,Af=209,Cf=210,Rf=211,If=212,Pf=213,Lf=214,Po=0,Lo=1,Do=2,Rs=3,Uo=4,No=5,Fo=6,Oo=7,ya=0,Df=1,Uf=2,ni=0,Mu=1,Su=2,wu=3,Eu=4,Tu=5,Au=6,Cu=7,ou="attached",Nf="detached",wl=300,yi=301,ji=302,Xr=303,$r=304,xr=306,na=1e3,Rn=1001,ia=1002,Vt=1003,Ru=1004,bm=1004,lr=1005,Mm=1005,Dt=1006,qr=1007,Sm=1007,_i=1008,wm=1008,En=1009,Iu=1010,Pu=1011,hr=1012,El=1013,Wn=1014,vn=1015,bi=1016,Tl=1017,Al=1018,fr=1020,Lu=35902,Du=35899,Uu=1021,Nu=1022,xn=1023,Mi=1026,Zi=1027,Cl=1028,ba=1029,Qi=1030,Rl=1031,Em=1032,Il=1033,Yr=33776,Zr=33777,Jr=33778,Kr=33779,ko=35840,Bo=35841,zo=35842,Vo=35843,Go=36196,Ho=37492,Wo=37496,Xo=37488,$o=37489,sa=37490,qo=37491,Yo=37808,Zo=37809,Jo=37810,Ko=37811,jo=37812,Qo=37813,el=37814,tl=37815,nl=37816,il=37817,sl=37818,rl=37819,al=37820,ol=37821,ll=36492,cl=36494,ul=36495,dl=36283,hl=36284,ra=36285,fl=36286,Ff=2200,Of=2201,kf=2202,aa=2300,pl=2301,Eo=2302,lu=2303,bs=2400,Ms=2401,oa=2402,Pl=2500,Fu=2501,Tm=0,Am=1,Cm=2,Bf=3200,Rm=3201,Im=3202,Pm=3203,Ni=0,zf=1,Ii="",wn="srgb",la="srgb-linear",ca="linear",wt="srgb",Lm="",Dm="rg",Um="ga",Nm=0,xs=7680,Fm=7681,Om=7682,km=7683,Bm=34055,zm=34056,Vm=5386,Gm=512,Hm=513,Wm=514,Xm=515,$m=516,qm=517,Ym=518,cu=519,Vf=512,Gf=513,Hf=514,Ll=515,Wf=516,Xf=517,Dl=518,$f=519,ua=35044,Zm=35048,Jm=35040,Km=35045,jm=35049,Qm=35041,eg=35046,tg=35050,ng=35042,ig="100",uu="300 es",On=2e3,Is=2001,sg={COMPUTE:"compute",RENDER:"render"},rg={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},ag={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},og={TEXTURE_COMPARE:"depthTextureCompare"};function lg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}const cg={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function cr(r,e){return new cg[r](e)}function qf(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function da(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Yf(){const r=da("canvas");return r.style.display="block",r}const Ed={};let es=null;function ug(r){es=r}function dg(){return es}function ha(...r){const e="THREE."+r.shift();es?es("log",e,...r):console.log(e,...r)}function Zf(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Ce(...r){r=Zf(r);const e="THREE."+r.shift();if(es)es("warn",e,...r);else{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function $e(...r){r=Zf(r);const e="THREE."+r.shift();if(es)es("error",e,...r);else{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function ml(...r){const e=r.join(" ");e in Ed||(Ed[e]=!0,Ce(...r))}function hg(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const fg={[Po]:Lo,[Do]:Fo,[Uo]:Oo,[Rs]:No,[Lo]:Po,[Fo]:Do,[Oo]:Uo,[No]:Rs};class ri{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Td=1234567;const Ts=Math.PI/180,pr=180/Math.PI;function Bn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ln[r&255]+ln[r>>8&255]+ln[r>>16&255]+ln[r>>24&255]+"-"+ln[e&255]+ln[e>>8&255]+"-"+ln[e>>16&15|64]+ln[e>>24&255]+"-"+ln[t&63|128]+ln[t>>8&255]+"-"+ln[t>>16&255]+ln[t>>24&255]+ln[n&255]+ln[n>>8&255]+ln[n>>16&255]+ln[n>>24&255]).toLowerCase()}function st(r,e,t){return Math.max(e,Math.min(t,r))}function Ou(r,e){return(r%e+e)%e}function pg(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function mg(r,e,t){return r!==e?(t-r)/(e-r):0}function jr(r,e,t){return(1-t)*r+t*e}function gg(r,e,t,n){return jr(r,e,1-Math.exp(-t*n))}function _g(r,e=1){return e-Math.abs(Ou(r,e*2)-e)}function vg(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function xg(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function yg(r,e){return r+Math.floor(Math.random()*(e-r+1))}function bg(r,e){return r+Math.random()*(e-r)}function Mg(r){return r*(.5-Math.random())}function Sg(r){r!==void 0&&(Td=r);let e=Td+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function wg(r){return r*Ts}function Eg(r){return r*pr}function Tg(r){return(r&r-1)===0&&r!==0}function Ag(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Cg(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Rg(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),h=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":r.set(o*u,l*h,l*d,o*c);break;case"YZY":r.set(l*d,o*u,l*h,o*c);break;case"ZXZ":r.set(l*h,l*d,o*u,o*c);break;case"XZX":r.set(o*u,l*m,l*f,o*c);break;case"YXY":r.set(l*f,o*u,l*m,o*c);break;case"ZYZ":r.set(l*m,l*f,o*u,o*c);break;default:Ce("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function _n(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ht(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const gl={DEG2RAD:Ts,RAD2DEG:pr,generateUUID:Bn,clamp:st,euclideanModulo:Ou,mapLinear:pg,inverseLerp:mg,lerp:jr,damp:gg,pingpong:_g,smoothstep:vg,smootherstep:xg,randInt:yg,randFloat:bg,randFloatSpread:Mg,seededRandom:Sg,degToRad:wg,radToDeg:Eg,isPowerOfTwo:Tg,ceilPowerOfTwo:Ag,floorPowerOfTwo:Cg,setQuaternionFromProperEuler:Rg,normalize:ht,denormalize:_n},gd=class gd{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};gd.prototype.isVector2=!0;let fe=gd;class hn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3],d=s[a+0],f=s[a+1],m=s[a+2],x=s[a+3];if(h!==x||l!==d||c!==f||u!==m){let g=l*d+c*f+u*m+h*x;g<0&&(d=-d,f=-f,m=-m,x=-x,g=-g);let p=1-o;if(g<.9995){const v=Math.acos(g),_=Math.sin(v);p=Math.sin(p*v)/_,o=Math.sin(o*v)/_,l=l*p+d*o,c=c*p+f*o,u=u*p+m*o,h=h*p+x*o}else{l=l*p+d*o,c=c*p+f*o,u=u*p+m*o,h=h*p+x*o;const v=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=v,c*=v,u*=v,h*=v}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[a],d=s[a+1],f=s[a+2],m=s[a+3];return e[t]=o*m+u*h+l*f-c*d,e[t+1]=l*m+u*d+c*h-o*f,e[t+2]=c*m+u*f+o*d-l*h,e[t+3]=u*m-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),h=o(s/2),d=l(n/2),f=l(i/2),m=l(s/2);switch(a){case"XYZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"YZX":this._x=d*u*h+c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h-d*f*m;break;case"XZY":this._x=d*u*h-c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h+d*f*m;break;default:Ce("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+i*c-s*l,this._y=i*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const _d=class _d{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ad.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ad.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),u=2*(o*t-s*i),h=2*(s*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-s*h,this.z=i+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ac.copy(this).projectOnVector(e),this.sub(ac)}reflect(e){return this.sub(ac.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};_d.prototype.isVector3=!0;let R=_d;const ac=new R,Ad=new hn,vd=class vd{constructor(e,t,n,i,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],m=n[8],x=i[0],g=i[3],p=i[6],v=i[1],_=i[4],y=i[7],E=i[2],S=i[5],C=i[8];return s[0]=a*x+o*v+l*E,s[3]=a*g+o*_+l*S,s[6]=a*p+o*y+l*C,s[1]=c*x+u*v+h*E,s[4]=c*g+u*_+h*S,s[7]=c*p+u*y+h*C,s[2]=d*x+f*v+m*E,s[5]=d*g+f*_+m*S,s[8]=d*p+f*y+m*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*s,f=c*s-a*l,m=t*h+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return e[0]=h*x,e[1]=(i*c-u*n)*x,e[2]=(o*n-i*a)*x,e[3]=d*x,e[4]=(u*t-i*l)*x,e[5]=(i*s-o*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(oc.makeScale(e,t)),this}rotate(e){return this.premultiply(oc.makeRotation(-e)),this}translate(e,t){return this.premultiply(oc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};vd.prototype.isMatrix3=!0;let ot=vd;const oc=new ot,Cd=new ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rd=new ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ig(){const r={enabled:!0,workingColorSpace:la,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===wt&&(i.r=Di(i.r),i.g=Di(i.g),i.b=Di(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===wt&&(i.r=dr(i.r),i.g=dr(i.g),i.b=dr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ii?ca:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return ml("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return ml("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[la]:{primaries:e,whitePoint:n,transfer:ca,toXYZ:Cd,fromXYZ:Rd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:wn},outputColorSpaceConfig:{drawingBufferColorSpace:wn}},[wn]:{primaries:e,whitePoint:n,transfer:wt,toXYZ:Cd,fromXYZ:Rd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:wn}}}),r}const _t=Ig();function Di(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function dr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Bs;class Jf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Bs===void 0&&(Bs=da("canvas")),Bs.width=e.width,Bs.height=e.height;const i=Bs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Bs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=da("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Di(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Di(t[n]/255)*255):t[n]=Di(t[n]);return{data:t,width:e.width,height:e.height}}else return Ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Pg=0;class Ji{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Pg++}),this.uuid=Bn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(lc(i[a].image)):s.push(lc(i[a]))}else s=lc(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function lc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Jf.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Ce("Texture: Unable to serialize Texture."),{})}let Lg=0;const cc=new R;class Nt extends ri{constructor(e=Nt.DEFAULT_IMAGE,t=Nt.DEFAULT_MAPPING,n=Rn,i=Rn,s=Dt,a=_i,o=xn,l=En,c=Nt.DEFAULT_ANISOTROPY,u=Ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lg++}),this.uuid=Bn(),this.name="",this.source=new Ji(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(cc).x}get height(){return this.source.getSize(cc).y}get depth(){return this.source.getSize(cc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ce(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ce(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==wl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case na:e.x=e.x-Math.floor(e.x);break;case Rn:e.x=e.x<0?0:1;break;case ia:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case na:e.y=e.y-Math.floor(e.y);break;case Rn:e.y=e.y<0?0:1;break;case ia:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Nt.DEFAULT_IMAGE=null;Nt.DEFAULT_MAPPING=wl;Nt.DEFAULT_ANISOTROPY=1;const xd=class xd{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,y=(f+1)/2,E=(p+1)/2,S=(u+d)/4,C=(h+x)/4,b=(m+g)/4;return _>y&&_>E?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=S/n,s=C/n):y>E?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=S/i,s=b/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=C/s,i=b/s),this.set(n,i,s,t),this}let v=Math.sqrt((g-m)*(g-m)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(h-x)/v,this.z=(d-u)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};xd.prototype.isVector4=!0;let yt=xd;class ku extends ri{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},s=new Nt(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Dt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Ji(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zn extends ku{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ul extends Nt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Dg extends zn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Ul(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class Nl extends Nt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ug extends zn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Nl(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}const Ml=class Ml{constructor(e,t,n,i,s,a,o,l,c,u,h,d,f,m,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,u,h,d,f,m,x,g)}set(e,t,n,i,s,a,o,l,c,u,h,d,f,m,x,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ml().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/zs.setFromMatrixColumn(e,0).length(),s=1/zs.setFromMatrixColumn(e,1).length(),a=1/zs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*u,f=a*h,m=o*u,x=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+m*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,m=c*u,x=c*h;t[0]=d+x*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-m,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,m=c*u,x=c*h;t[0]=d-x*o,t[4]=-a*h,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*u,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,f=a*h,m=o*u,x=o*h;t[0]=l*u,t[4]=m*c-f,t[8]=d*c+x,t[1]=l*h,t[5]=x*c+d,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,m=o*l,x=o*c;t[0]=l*u,t[4]=x-d*h,t[8]=m*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+m,t[10]=d-x*h}else if(e.order==="XZY"){const d=a*l,f=a*c,m=o*l,x=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+x,t[5]=a*u,t[9]=f*h-m,t[2]=m*h-f,t[6]=o*u,t[10]=x*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ng,e,Fg)}lookAt(e,t,n){const i=this.elements;return Dn.subVectors(e,t),Dn.lengthSq()===0&&(Dn.z=1),Dn.normalize(),zi.crossVectors(n,Dn),zi.lengthSq()===0&&(Math.abs(n.z)===1?Dn.x+=1e-4:Dn.z+=1e-4,Dn.normalize(),zi.crossVectors(n,Dn)),zi.normalize(),Ra.crossVectors(Dn,zi),i[0]=zi.x,i[4]=Ra.x,i[8]=Dn.x,i[1]=zi.y,i[5]=Ra.y,i[9]=Dn.y,i[2]=zi.z,i[6]=Ra.z,i[10]=Dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],m=n[2],x=n[6],g=n[10],p=n[14],v=n[3],_=n[7],y=n[11],E=n[15],S=i[0],C=i[4],b=i[8],w=i[12],P=i[1],L=i[5],k=i[9],$=i[13],z=i[2],N=i[6],V=i[10],G=i[14],le=i[3],pe=i[7],Ee=i[11],Ie=i[15];return s[0]=a*S+o*P+l*z+c*le,s[4]=a*C+o*L+l*N+c*pe,s[8]=a*b+o*k+l*V+c*Ee,s[12]=a*w+o*$+l*G+c*Ie,s[1]=u*S+h*P+d*z+f*le,s[5]=u*C+h*L+d*N+f*pe,s[9]=u*b+h*k+d*V+f*Ee,s[13]=u*w+h*$+d*G+f*Ie,s[2]=m*S+x*P+g*z+p*le,s[6]=m*C+x*L+g*N+p*pe,s[10]=m*b+x*k+g*V+p*Ee,s[14]=m*w+x*$+g*G+p*Ie,s[3]=v*S+_*P+y*z+E*le,s[7]=v*C+_*L+y*N+E*pe,s[11]=v*b+_*k+y*V+E*Ee,s[15]=v*w+_*$+y*G+E*Ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],m=e[3],x=e[7],g=e[11],p=e[15],v=l*f-c*d,_=o*f-c*h,y=o*d-l*h,E=a*f-c*u,S=a*d-l*u,C=a*h-o*u;return t*(x*v-g*_+p*y)-n*(m*v-g*E+p*S)+i*(m*_-x*E+p*C)-s*(m*y-x*S+g*C)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],m=e[12],x=e[13],g=e[14],p=e[15],v=t*o-n*a,_=t*l-i*a,y=t*c-s*a,E=n*l-i*o,S=n*c-s*o,C=i*c-s*l,b=u*x-h*m,w=u*g-d*m,P=u*p-f*m,L=h*g-d*x,k=h*p-f*x,$=d*p-f*g,z=v*$-_*k+y*L+E*P-S*w+C*b;if(z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/z;return e[0]=(o*$-l*k+c*L)*N,e[1]=(i*k-n*$-s*L)*N,e[2]=(x*C-g*S+p*E)*N,e[3]=(d*S-h*C-f*E)*N,e[4]=(l*P-a*$-c*w)*N,e[5]=(t*$-i*P+s*w)*N,e[6]=(g*y-m*C-p*_)*N,e[7]=(u*C-d*y+f*_)*N,e[8]=(a*k-o*P+c*b)*N,e[9]=(n*P-t*k-s*b)*N,e[10]=(m*S-x*y+p*v)*N,e[11]=(h*y-u*S-f*v)*N,e[12]=(o*w-a*L-l*b)*N,e[13]=(t*L-n*w+i*b)*N,e[14]=(x*_-m*E-g*v)*N,e[15]=(u*E-h*_+d*v)*N,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,d=s*c,f=s*u,m=s*h,x=a*u,g=a*h,p=o*h,v=l*c,_=l*u,y=l*h,E=n.x,S=n.y,C=n.z;return i[0]=(1-(x+p))*E,i[1]=(f+y)*E,i[2]=(m-_)*E,i[3]=0,i[4]=(f-y)*S,i[5]=(1-(d+p))*S,i[6]=(g+v)*S,i[7]=0,i[8]=(m+_)*C,i[9]=(g-v)*C,i[10]=(1-(d+x))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=zs.set(i[0],i[1],i[2]).length();const o=zs.set(i[4],i[5],i[6]).length(),l=zs.set(i[8],i[9],i[10]).length();s<0&&(a=-a),Zn.copy(this);const c=1/a,u=1/o,h=1/l;return Zn.elements[0]*=c,Zn.elements[1]*=c,Zn.elements[2]*=c,Zn.elements[4]*=u,Zn.elements[5]*=u,Zn.elements[6]*=u,Zn.elements[8]*=h,Zn.elements[9]*=h,Zn.elements[10]*=h,t.setFromRotationMatrix(Zn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,s,a,o=On,l=!1){const c=this.elements,u=2*s/(t-e),h=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let m,x;if(l)m=s/(a-s),x=a*s/(a-s);else if(o===On)m=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Is)m=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=On,l=!1){const c=this.elements,u=2/(t-e),h=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let m,x;if(l)m=1/(a-s),x=a/(a-s);else if(o===On)m=-2/(a-s),x=-(a+s)/(a-s);else if(o===Is)m=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ml.prototype.isMatrix4=!0;let rt=Ml;const zs=new R,Zn=new rt,Ng=new R(0,0,0),Fg=new R(1,1,1),zi=new R,Ra=new R,Dn=new R,Id=new rt,Pd=new hn;class si{constructor(e=0,t=0,n=0,i=si.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-st(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(st(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-st(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(st(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Ce("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Id.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Id,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Pd.setFromEuler(this),this.setFromQuaternion(Pd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}si.DEFAULT_ORDER="XYZ";class Fl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Og=0;const Ld=new R,Vs=new hn,wi=new rt,Ia=new R,Ar=new R,kg=new R,Bg=new hn,Dd=new R(1,0,0),Ud=new R(0,1,0),Nd=new R(0,0,1),Fd={type:"added"},zg={type:"removed"},Gs={type:"childadded",child:null},uc={type:"childremoved",child:null};class St extends ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Og++}),this.uuid=Bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new R,t=new si,n=new hn,i=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new rt},normalMatrix:{value:new ot}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vs.setFromAxisAngle(e,t),this.quaternion.multiply(Vs),this}rotateOnWorldAxis(e,t){return Vs.setFromAxisAngle(e,t),this.quaternion.premultiply(Vs),this}rotateX(e){return this.rotateOnAxis(Dd,e)}rotateY(e){return this.rotateOnAxis(Ud,e)}rotateZ(e){return this.rotateOnAxis(Nd,e)}translateOnAxis(e,t){return Ld.copy(e).applyQuaternion(this.quaternion),this.position.add(Ld.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dd,e)}translateY(e){return this.translateOnAxis(Ud,e)}translateZ(e){return this.translateOnAxis(Nd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(wi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ia.copy(e):Ia.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wi.lookAt(Ar,Ia,this.up):wi.lookAt(Ia,Ar,this.up),this.quaternion.setFromRotationMatrix(wi),i&&(wi.extractRotation(i.matrixWorld),Vs.setFromRotationMatrix(wi),this.quaternion.premultiply(Vs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?($e("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Fd),Gs.child=e,this.dispatchEvent(Gs),Gs.child=null):$e("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(zg),uc.child=e,this.dispatchEvent(uc),uc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),wi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),wi.multiply(e.parent.matrixWorld)),e.applyMatrix4(wi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Fd),Gs.child=e,this.dispatchEvent(Gs),Gs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,e,kg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,Bg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}St.DEFAULT_UP=new R(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ur extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vg={type:"move"};class To{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ur,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ur,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ur,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,n),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vg)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ur;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Kf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},Pa={h:0,s:0,l:0};function dc(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Ue{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,_t.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=_t.workingColorSpace){return this.r=e,this.g=t,this.b=n,_t.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=_t.workingColorSpace){if(e=Ou(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=dc(a,s,e+1/3),this.g=dc(a,s,e),this.b=dc(a,s,e-1/3)}return _t.colorSpaceToWorking(this,i),this}setStyle(e,t=wn){function n(s){s!==void 0&&parseFloat(s)<1&&Ce("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ce("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ce("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wn){const n=Kf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ce("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Di(e.r),this.g=Di(e.g),this.b=Di(e.b),this}copyLinearToSRGB(e){return this.r=dr(e.r),this.g=dr(e.g),this.b=dr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wn){return _t.workingToColorSpace(cn.copy(this),e),Math.round(st(cn.r*255,0,255))*65536+Math.round(st(cn.g*255,0,255))*256+Math.round(st(cn.b*255,0,255))}getHexString(e=wn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_t.workingColorSpace){_t.workingToColorSpace(cn.copy(this),t);const n=cn.r,i=cn.g,s=cn.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=_t.workingColorSpace){return _t.workingToColorSpace(cn.copy(this),t),e.r=cn.r,e.g=cn.g,e.b=cn.b,e}getStyle(e=wn){_t.workingToColorSpace(cn.copy(this),e);const t=cn.r,n=cn.g,i=cn.b;return e!==wn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Vi),this.setHSL(Vi.h+e,Vi.s+t,Vi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Vi),e.getHSL(Pa);const n=jr(Vi.h,Pa.h,t),i=jr(Vi.s,Pa.s,t),s=jr(Vi.l,Pa.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const cn=new Ue;Ue.NAMES=Kf;class Ol{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ue(e),this.density=t}clone(){return new Ol(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class kl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ue(e),this.near=t,this.far=n}clone(){return new kl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Bu extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new si,this.environmentIntensity=1,this.environmentRotation=new si,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Jn=new R,Ei=new R,hc=new R,Ti=new R,Hs=new R,Ws=new R,Od=new R,fc=new R,pc=new R,mc=new R,gc=new yt,_c=new yt,vc=new yt;class Tn{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Jn.subVectors(e,t),i.cross(Jn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Jn.subVectors(i,t),Ei.subVectors(n,t),hc.subVectors(e,t);const a=Jn.dot(Jn),o=Jn.dot(Ei),l=Jn.dot(hc),c=Ei.dot(Ei),u=Ei.dot(hc),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,m=(a*u-o*l)*d;return s.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ti)===null?!1:Ti.x>=0&&Ti.y>=0&&Ti.x+Ti.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,Ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ti.x),l.addScaledVector(a,Ti.y),l.addScaledVector(o,Ti.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return gc.setScalar(0),_c.setScalar(0),vc.setScalar(0),gc.fromBufferAttribute(e,t),_c.fromBufferAttribute(e,n),vc.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(gc,s.x),a.addScaledVector(_c,s.y),a.addScaledVector(vc,s.z),a}static isFrontFacing(e,t,n,i){return Jn.subVectors(n,t),Ei.subVectors(e,t),Jn.cross(Ei).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jn.subVectors(this.c,this.b),Ei.subVectors(this.a,this.b),Jn.cross(Ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Tn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Tn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;Hs.subVectors(i,n),Ws.subVectors(s,n),fc.subVectors(e,n);const l=Hs.dot(fc),c=Ws.dot(fc);if(l<=0&&c<=0)return t.copy(n);pc.subVectors(e,i);const u=Hs.dot(pc),h=Ws.dot(pc);if(u>=0&&h<=u)return t.copy(i);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Hs,a);mc.subVectors(e,s);const f=Hs.dot(mc),m=Ws.dot(mc);if(m>=0&&f<=m)return t.copy(s);const x=f*c-l*m;if(x<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(Ws,o);const g=u*m-f*h;if(g<=0&&h-u>=0&&f-m>=0)return Od.subVectors(s,i),o=(h-u)/(h-u+(f-m)),t.copy(i).addScaledVector(Od,o);const p=1/(g+x+d);return a=x*p,o=d*p,t.copy(n).addScaledVector(Hs,a).addScaledVector(Ws,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class $t{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Kn):Kn.fromBufferAttribute(s,a),Kn.applyMatrix4(e.matrixWorld),this.expandByPoint(Kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),La.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),La.copy(n.boundingBox)),La.applyMatrix4(e.matrixWorld),this.union(La)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kn),Kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Cr),Da.subVectors(this.max,Cr),Xs.subVectors(e.a,Cr),$s.subVectors(e.b,Cr),qs.subVectors(e.c,Cr),Gi.subVectors($s,Xs),Hi.subVectors(qs,$s),os.subVectors(Xs,qs);let t=[0,-Gi.z,Gi.y,0,-Hi.z,Hi.y,0,-os.z,os.y,Gi.z,0,-Gi.x,Hi.z,0,-Hi.x,os.z,0,-os.x,-Gi.y,Gi.x,0,-Hi.y,Hi.x,0,-os.y,os.x,0];return!xc(t,Xs,$s,qs,Da)||(t=[1,0,0,0,1,0,0,0,1],!xc(t,Xs,$s,qs,Da))?!1:(Ua.crossVectors(Gi,Hi),t=[Ua.x,Ua.y,Ua.z],xc(t,Xs,$s,qs,Da))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ai[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ai[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ai[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ai[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ai[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ai[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ai[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ai[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ai),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ai=[new R,new R,new R,new R,new R,new R,new R,new R],Kn=new R,La=new $t,Xs=new R,$s=new R,qs=new R,Gi=new R,Hi=new R,os=new R,Cr=new R,Da=new R,Ua=new R,ls=new R;function xc(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){ls.fromArray(r,s);const o=i.x*Math.abs(ls.x)+i.y*Math.abs(ls.y)+i.z*Math.abs(ls.z),l=e.dot(ls),c=t.dot(ls),u=n.dot(ls);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Pi=Gg();function Gg(){const r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,s[l]=c|u}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}function Sn(r){Math.abs(r)>65504&&Ce("DataUtils.toHalfFloat(): Value out of range."),r=st(r,-65504,65504),Pi.floatView[0]=r;const e=Pi.uint32View[0],t=e>>23&511;return Pi.baseTable[t]+((e&8388607)>>Pi.shiftTable[t])}function Vr(r){const e=r>>10;return Pi.uint32View[0]=Pi.mantissaTable[Pi.offsetTable[e]+(r&1023)]+Pi.exponentTable[e],Pi.floatView[0]}class Hg{static toHalfFloat(e){return Sn(e)}static fromHalfFloat(e){return Vr(e)}}const Gt=new R,Na=new fe;let Wg=0;class Ct extends ri{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ua,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Na.fromBufferAttribute(this,t),Na.applyMatrix3(e),this.setXY(t,Na.x,Na.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=_n(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=_n(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=_n(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=_n(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=_n(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ua&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Xg extends Ct{constructor(e,t,n){super(new Int8Array(e),t,n)}}class $g extends Ct{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class qg extends Ct{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class Yg extends Ct{constructor(e,t,n){super(new Int16Array(e),t,n)}}class zu extends Ct{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Zg extends Ct{constructor(e,t,n){super(new Int32Array(e),t,n)}}class Vu extends Ct{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Jg extends Ct{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=Vr(this.array[e*this.itemSize]);return this.normalized&&(t=_n(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=Sn(t),this}getY(e){let t=Vr(this.array[e*this.itemSize+1]);return this.normalized&&(t=_n(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=Sn(t),this}getZ(e){let t=Vr(this.array[e*this.itemSize+2]);return this.normalized&&(t=_n(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=Sn(t),this}getW(e){let t=Vr(this.array[e*this.itemSize+3]);return this.normalized&&(t=_n(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=Sn(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.array[e+0]=Sn(t),this.array[e+1]=Sn(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.array[e+0]=Sn(t),this.array[e+1]=Sn(n),this.array[e+2]=Sn(i),this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.array[e+0]=Sn(t),this.array[e+1]=Sn(n),this.array[e+2]=Sn(i),this.array[e+3]=Sn(s),this}}class ke extends Ct{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Kg=new $t,Rr=new R,yc=new R;class qt{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Kg.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Rr.subVectors(e,this.center);const t=Rr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Rr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(yc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Rr.copy(e.center).add(yc)),this.expandByPoint(Rr.copy(e.center).sub(yc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let jg=0;const Hn=new rt,bc=new St,Ys=new R,Un=new $t,Ir=new $t,Jt=new R;class lt extends ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jg++}),this.uuid=Bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(lg(e)?Vu:zu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ot().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Hn.makeRotationFromQuaternion(e),this.applyMatrix4(Hn),this}rotateX(e){return Hn.makeRotationX(e),this.applyMatrix4(Hn),this}rotateY(e){return Hn.makeRotationY(e),this.applyMatrix4(Hn),this}rotateZ(e){return Hn.makeRotationZ(e),this.applyMatrix4(Hn),this}translate(e,t,n){return Hn.makeTranslation(e,t,n),this.applyMatrix4(Hn),this}scale(e,t,n){return Hn.makeScale(e,t,n),this.applyMatrix4(Hn),this}lookAt(e){return bc.lookAt(e),bc.updateMatrix(),this.applyMatrix4(bc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ys).negate(),this.translate(Ys.x,Ys.y,Ys.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ke(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $t);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Un.setFromBufferAttribute(s),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,Un.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,Un.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(Un.min),this.boundingBox.expandByPoint(Un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$e('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(Un.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Ir.setFromBufferAttribute(o),this.morphTargetsRelative?(Jt.addVectors(Un.min,Ir.min),Un.expandByPoint(Jt),Jt.addVectors(Un.max,Ir.max),Un.expandByPoint(Jt)):(Un.expandByPoint(Ir.min),Un.expandByPoint(Ir.max))}Un.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Jt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Jt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Jt.fromBufferAttribute(o,c),l&&(Ys.fromBufferAttribute(e,c),Jt.add(Ys)),i=Math.max(i,n.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&$e('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){$e("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let b=0;b<n.count;b++)o[b]=new R,l[b]=new R;const c=new R,u=new R,h=new R,d=new fe,f=new fe,m=new fe,x=new R,g=new R;function p(b,w,P){c.fromBufferAttribute(n,b),u.fromBufferAttribute(n,w),h.fromBufferAttribute(n,P),d.fromBufferAttribute(s,b),f.fromBufferAttribute(s,w),m.fromBufferAttribute(s,P),u.sub(c),h.sub(c),f.sub(d),m.sub(d);const L=1/(f.x*m.y-m.x*f.y);isFinite(L)&&(x.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(L),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(L),o[b].add(x),o[w].add(x),o[P].add(x),l[b].add(g),l[w].add(g),l[P].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let b=0,w=v.length;b<w;++b){const P=v[b],L=P.start,k=P.count;for(let $=L,z=L+k;$<z;$+=3)p(e.getX($+0),e.getX($+1),e.getX($+2))}const _=new R,y=new R,E=new R,S=new R;function C(b){E.fromBufferAttribute(i,b),S.copy(E);const w=o[b];_.copy(w),_.sub(E.multiplyScalar(E.dot(w))).normalize(),y.crossVectors(S,w);const L=y.dot(l[b])<0?-1:1;a.setXYZW(b,_.x,_.y,_.z,L)}for(let b=0,w=v.length;b<w;++b){const P=v[b],L=P.start,k=P.count;for(let $=L,z=L+k;$<z;$+=3)C(e.getX($+0)),C(e.getX($+1)),C(e.getX($+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ct(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new R,s=new R,a=new R,o=new R,l=new R,c=new R,u=new R,h=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),x=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,m=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*u;for(let p=0;p<u;p++)d[m++]=c[f++]}return new Ct(d,u,h)}if(this.index===null)return Ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new lt,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bl{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ua,this.updateRanges=[],this.version=0,this.uuid=Bn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const fn=new R;class kn{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)fn.fromBufferAttribute(this,t),fn.applyMatrix4(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)fn.fromBufferAttribute(this,t),fn.applyNormalMatrix(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)fn.fromBufferAttribute(this,t),fn.transformDirection(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=_n(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=_n(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=_n(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=_n(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=_n(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){ha("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Ct(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new kn(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ha("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Qg=0;class jt extends ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qg++}),this.uuid=Bn(),this.name="",this.type="Material",this.blending=Es,this.side=Ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ro,this.blendDst=Io,this.blendEquation=Yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=Rs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xs,this.stencilZFail=xs,this.stencilZPass=xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ce(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ce(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Es&&(n.blending=this.blending),this.side!==Ui&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ro&&(n.blendSrc=this.blendSrc),this.blendDst!==Io&&(n.blendDst=this.blendDst),this.blendEquation!==Yi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Rs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==cu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Gu extends jt{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Zs;const Pr=new R,Js=new R,Ks=new R,js=new fe,Lr=new fe,jf=new rt,Fa=new R,Dr=new R,Oa=new R,kd=new fe,Mc=new fe,Bd=new fe;class Qf extends St{constructor(e=new Gu){if(super(),this.isSprite=!0,this.type="Sprite",Zs===void 0){Zs=new lt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Bl(t,5);Zs.setIndex([0,1,2,0,2,3]),Zs.setAttribute("position",new kn(n,3,0,!1)),Zs.setAttribute("uv",new kn(n,2,3,!1))}this.geometry=Zs,this.material=e,this.center=new fe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&$e('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Js.setFromMatrixScale(this.matrixWorld),jf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ks.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Js.multiplyScalar(-Ks.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;ka(Fa.set(-.5,-.5,0),Ks,a,Js,i,s),ka(Dr.set(.5,-.5,0),Ks,a,Js,i,s),ka(Oa.set(.5,.5,0),Ks,a,Js,i,s),kd.set(0,0),Mc.set(1,0),Bd.set(1,1);let o=e.ray.intersectTriangle(Fa,Dr,Oa,!1,Pr);if(o===null&&(ka(Dr.set(-.5,.5,0),Ks,a,Js,i,s),Mc.set(0,1),o=e.ray.intersectTriangle(Fa,Oa,Dr,!1,Pr),o===null))return;const l=e.ray.origin.distanceTo(Pr);l<e.near||l>e.far||t.push({distance:l,point:Pr.clone(),uv:Tn.getInterpolation(Pr,Fa,Dr,Oa,kd,Mc,Bd,new fe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ka(r,e,t,n,i,s){js.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Lr.x=s*js.x-i*js.y,Lr.y=i*js.x+s*js.y):Lr.copy(js),r.copy(e),r.x+=Lr.x,r.y+=Lr.y,r.applyMatrix4(jf)}const Ba=new R,zd=new R;class ep extends St{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const s=t[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let s;for(s=0;s<i.length&&!(t<i[s].distance);s++);return i.splice(s,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let s=t[n].distance;if(t[n].object.visible&&(s-=s*t[n].hysteresis),e<s)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){Ba.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(Ba);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){Ba.setFromMatrixPosition(e.matrixWorld),zd.setFromMatrixPosition(this.matrixWorld);const n=Ba.distanceTo(zd)/e.zoom;t[0].object.visible=!0;let i,s;for(i=1,s=t.length;i<s;i++){let a=t[i].distance;if(t[i].object.visible&&(a-=a*t[i].hysteresis),n>=a)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const a=n[i];t.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return t}}const Ci=new R,Sc=new R,za=new R,Wi=new R,wc=new R,Va=new R,Ec=new R;class yr{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ci)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ci.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ci.copy(this.origin).addScaledVector(this.direction,t),Ci.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Sc.copy(e).add(t).multiplyScalar(.5),za.copy(t).sub(e).normalize(),Wi.copy(this.origin).sub(Sc);const s=e.distanceTo(t)*.5,a=-this.direction.dot(za),o=Wi.dot(this.direction),l=-Wi.dot(za),c=Wi.lengthSq(),u=Math.abs(1-a*a);let h,d,f,m;if(u>0)if(h=a*l-o,d=a*o-l,m=s*u,h>=0)if(d>=-m)if(d<=m){const x=1/u;h*=x,d*=x,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-m?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=m?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Sc).addScaledVector(za,d),f}intersectSphere(e,t){Ci.subVectors(e.center,this.origin);const n=Ci.dot(this.direction),i=Ci.dot(Ci)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ci)!==null}intersectTriangle(e,t,n,i,s){wc.subVectors(t,e),Va.subVectors(n,e),Ec.crossVectors(wc,Va);let a=this.direction.dot(Ec),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Wi.subVectors(this.origin,e);const l=o*this.direction.dot(Va.crossVectors(Wi,Va));if(l<0)return null;const c=o*this.direction.dot(wc.cross(Wi));if(c<0||l+c>a)return null;const u=-o*Wi.dot(Ec);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class nn extends jt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=ya,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Vd=new rt,cs=new yr,Ga=new qt,Gd=new R,Ha=new R,Wa=new R,Xa=new R,Tc=new R,$a=new R,Hd=new R,qa=new R;class At extends St{constructor(e=new lt,t=new nn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){$a.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Tc.fromBufferAttribute(h,e),a?$a.addScaledVector(Tc,u):$a.addScaledVector(Tc.sub(t),u))}t.add($a)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ga.copy(n.boundingSphere),Ga.applyMatrix4(s),cs.copy(e.ray).recast(e.near),!(Ga.containsPoint(cs.origin)===!1&&(cs.intersectSphere(Ga,Gd)===null||cs.origin.distanceToSquared(Gd)>(e.far-e.near)**2))&&(Vd.copy(s).invert(),cs.copy(e.ray).applyMatrix4(Vd),!(n.boundingBox!==null&&cs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,cs)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){const g=d[m],p=a[g.materialIndex],v=Math.max(g.start,f.start),_=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let y=v,E=_;y<E;y+=3){const S=o.getX(y),C=o.getX(y+1),b=o.getX(y+2);i=Ya(this,p,e,n,c,u,h,S,C,b),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const v=o.getX(g),_=o.getX(g+1),y=o.getX(g+2);i=Ya(this,a,e,n,c,u,h,v,_,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){const g=d[m],p=a[g.materialIndex],v=Math.max(g.start,f.start),_=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=v,E=_;y<E;y+=3){const S=y,C=y+1,b=y+2;i=Ya(this,p,e,n,c,u,h,S,C,b),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const v=g,_=g+1,y=g+2;i=Ya(this,a,e,n,c,u,h,v,_,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function e_(r,e,t,n,i,s,a,o){let l;if(e.side===yn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===Ui,o),l===null)return null;qa.copy(o),qa.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(qa);return c<t.near||c>t.far?null:{distance:c,point:qa.clone(),object:r}}function Ya(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,Ha),r.getVertexPosition(l,Wa),r.getVertexPosition(c,Xa);const u=e_(r,e,t,n,Ha,Wa,Xa,Hd);if(u){const h=new R;Tn.getBarycoord(Hd,Ha,Wa,Xa,h),i&&(u.uv=Tn.getInterpolatedAttribute(i,o,l,c,h,new fe)),s&&(u.uv1=Tn.getInterpolatedAttribute(s,o,l,c,h,new fe)),a&&(u.normal=Tn.getInterpolatedAttribute(a,o,l,c,h,new R),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new R,materialIndex:0};Tn.getNormal(Ha,Wa,Xa,d.normal),u.face=d,u.barycoord=h}return u}const Ur=new yt,Wd=new yt,Xd=new yt,t_=new yt,$d=new rt,Za=new R,Ac=new qt,qd=new rt,Cc=new yr;class tp extends At{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ou,this.bindMatrix=new rt,this.bindMatrixInverse=new rt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new $t),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Za),this.boundingBox.expandByPoint(Za)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new qt),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Za),this.boundingSphere.expandByPoint(Za)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ac.copy(this.boundingSphere),Ac.applyMatrix4(i),e.ray.intersectsSphere(Ac)!==!1&&(qd.copy(i).invert(),Cc.copy(e.ray).applyMatrix4(qd),!(this.boundingBox!==null&&Cc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Cc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new yt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ou?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Nf?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ce("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Wd.fromBufferAttribute(i.attributes.skinIndex,e),Xd.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Ur.copy(t),t.set(0,0,0,0)):(Ur.set(...t,1),t.set(0,0,0)),Ur.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const a=Xd.getComponent(s);if(a!==0){const o=Wd.getComponent(s);$d.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(t_.copy(Ur).applyMatrix4($d),a)}}return t.isVector4&&(t.w=Ur.w),t.applyMatrix4(this.bindMatrixInverse)}}class Hu extends St{constructor(){super(),this.isBone=!0,this.type="Bone"}}class ii extends Nt{constructor(e=null,t=1,n=1,i,s,a,o,l,c=Vt,u=Vt,h,d){super(null,a,o,l,c,u,i,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Yd=new rt,n_=new rt;class zl{constructor(e=[],t=[]){this.uuid=Bn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ce("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new rt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new rt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:n_;Yd.multiplyMatrices(o,t[s]),Yd.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new zl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new ii(t,e,e,xn,vn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(Ce("Skeleton: No bone found with UUID:",s),a=new Hu),this.bones.push(a),this.boneInverses.push(new rt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class mr extends Ct{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Qs=new rt,Zd=new rt,Ja=[],Jd=new $t,i_=new rt,Nr=new At,Fr=new qt;class np extends At{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new mr(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,i_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new $t),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Qs),Jd.copy(e.boundingBox).applyMatrix4(Qs),this.boundingBox.union(Jd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new qt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Qs),Fr.copy(e.boundingSphere).applyMatrix4(Qs),this.boundingSphere.union(Fr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Nr.geometry=this.geometry,Nr.material=this.material,Nr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fr.copy(this.boundingSphere),Fr.applyMatrix4(n),e.ray.intersectsSphere(Fr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Qs),Zd.multiplyMatrices(n,Qs),Nr.matrixWorld=Zd,Nr.raycast(e,Ja);for(let a=0,o=Ja.length;a<o;a++){const l=Ja[a];l.instanceId=s,l.object=this,t.push(l)}Ja.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new mr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ii(new Float32Array(i*this.count),i,this.count,Cl,vn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Rc=new R,s_=new R,r_=new ot;class qi{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Rc.subVectors(n,t).cross(s_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(Rc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||r_.getNormalMatrix(e),i=this.coplanarPoint(Rc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const us=new qt,a_=new fe(.5,.5),Ka=new R;class br{constructor(e=new qi,t=new qi,n=new qi,i=new qi,s=new qi,a=new qi){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=On,n=!1){const i=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],d=s[6],f=s[7],m=s[8],x=s[9],g=s[10],p=s[11],v=s[12],_=s[13],y=s[14],E=s[15];if(i[0].setComponents(c-a,f-u,p-m,E-v).normalize(),i[1].setComponents(c+a,f+u,p+m,E+v).normalize(),i[2].setComponents(c+o,f+h,p+x,E+_).normalize(),i[3].setComponents(c-o,f-h,p-x,E-_).normalize(),n)i[4].setComponents(l,d,g,y).normalize(),i[5].setComponents(c-l,f-d,p-g,E-y).normalize();else if(i[4].setComponents(c-l,f-d,p-g,E-y).normalize(),t===On)i[5].setComponents(c+l,f+d,p+g,E+y).normalize();else if(t===Is)i[5].setComponents(l,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),us.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),us.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(us)}intersectsSprite(e){us.center.set(0,0,0);const t=a_.distanceTo(e.center);return us.radius=.7071067811865476+t,us.applyMatrix4(e.matrixWorld),this.intersectsSphere(us)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Ka.x=i.normal.x>0?e.max.x:e.min.x,Ka.y=i.normal.y>0?e.max.y:e.min.y,Ka.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ka)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const ci=new rt,ui=new br;class Vl{constructor(){this.coordinateSystem=On}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(ci.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),ui.setFromProjectionMatrix(ci,i.coordinateSystem,i.reversedDepth),ui.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(ci.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),ui.setFromProjectionMatrix(ci,i.coordinateSystem,i.reversedDepth),ui.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(ci.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),ui.setFromProjectionMatrix(ci,i.coordinateSystem,i.reversedDepth),ui.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(ci.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),ui.setFromProjectionMatrix(ci,i.coordinateSystem,i.reversedDepth),ui.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(ci.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),ui.setFromProjectionMatrix(ci,i.coordinateSystem,i.reversedDepth),ui.containsPoint(e))return!0}return!1}clone(){return new Vl}}function Ic(r,e){return r-e}function o_(r,e){return r.z-e.z}function l_(r,e){return e.z-r.z}class c_{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){const s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});const o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}}const Mn=new rt,u_=new Ue(1,1,1),Kd=new br,d_=new Vl,ja=new $t,ds=new qt,Or=new R,jd=new R,h_=new R,Pc=new c_,un=new At,Qa=[];function f_(r,e,t=0){const n=e.itemSize;if(r.isInterleavedBufferAttribute||r.array.constructor!==e.array.constructor){const i=r.count;for(let s=0;s<i;s++)for(let a=0;a<n;a++)e.setComponent(s+t,a,r.getComponent(s,a))}else e.array.set(r.array,t*n);e.needsUpdate=!0}function hs(r,e){if(r.constructor!==e.constructor){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++)e[n]=r[n]}else{const t=Math.min(r.length,e.length);e.set(new r.constructor(r.buffer,0,t))}}class ip extends At{constructor(e,t,n=t*2,i){super(new lt,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new ii(t,e,e,xn,vn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new ii(t,e,e,ba,Wn);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new ii(t,e,e,xn,vn);n.colorSpace=_t.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in e.attributes){const a=e.getAttribute(s),{array:o,itemSize:l,normalized:c}=a,u=new o.constructor(n*l),h=new Ct(u,l,c);t.setAttribute(s,h)}if(e.getIndex()!==null){const s=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Ct(s,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=e.getAttribute(n),s=t.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){const t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){const t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $t);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,Mn),this.getBoundingBoxAt(s,ja).applyMatrix4(Mn),e.union(ja)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qt);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,Mn),this.getBoundingSphereAt(s,ds).applyMatrix4(Mn),e.union(ds)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Ic),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const s=this._matricesTexture;Mn.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;const a=this._colorsTexture;return a&&(u_.toArray(a.image.data,i*4),a.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const a=e.getIndex();if(a!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?a.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Ic),l=this._availableGeometryIds.shift(),s[l]=i):(l=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),a=t.getIndex(),o=this._geometryInfo[e];if(i&&a.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");const l=o.vertexStart,c=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(const u in n.attributes){const h=t.getAttribute(u),d=n.getAttribute(u);f_(h,d,l);const f=h.itemSize;for(let m=h.count,x=c;m<x;m++){const g=l+m;for(let p=0;p<f;p++)d.setComponent(g,p,0)}d.needsUpdate=!0,d.addUpdateRange(l*f,c*f)}if(i){const u=o.indexStart,h=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let d=0;d<a.count;d++)s.setX(u+d,l+a.getX(d));for(let d=a.count,f=h;d<f;d++)s.setX(u+d,l);s.needsUpdate=!0,s.addUpdateRange(u,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0;const n=this._geometryInfo,i=n.map((a,o)=>o).sort((a,o)=>n[a].vertexStart-n[o].vertexStart),s=this.geometry;for(let a=0,o=n.length;a<o;a++){const l=i[a],c=n[l];if(c.active!==!1){if(s.index!==null){if(c.indexStart!==t){const{indexStart:u,vertexStart:h,reservedIndexCount:d}=c,f=s.index,m=f.array,x=e-h;for(let g=u;g<u+d;g++)m[g]=m[g]+x;f.array.copyWithin(t,u,u+d),f.addUpdateRange(t,d),f.needsUpdate=!0,c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){const{vertexStart:u,reservedVertexCount:h}=c,d=s.attributes;for(const f in d){const m=d[f],{array:x,itemSize:g}=m;x.copyWithin(e*g,u*g,(u+h)*g),m.addUpdateRange(e*g,h*g),m.needsUpdate=!0}c.vertexStart=e}e+=c.reservedVertexCount,c.start=s.index?c.indexStart:c.vertexStart}}return this._nextIndexStart=t,this._nextVertexStart=e,this._visibilityChanged=!0,this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){const s=new $t,a=n.index,o=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let u=l;a&&(u=a.getX(u)),s.expandByPoint(Or.fromBufferAttribute(o,u))}i.boundingBox=s}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){const s=new qt;this.getBoundingBoxAt(e,ja),ja.getCenter(s.center);const a=n.index,o=n.attributes.position;let l=0;for(let c=i.start,u=i.start+i.count;c<u;c++){let h=c;a&&(h=a.getX(h)),Or.fromBufferAttribute(o,h),l=Math.max(l,s.center.distanceToSquared(Or))}s.radius=Math.sqrt(l),i.boundingSphere=s}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);const n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null?t.isVector4?t.set(1,1,1,1):t.setRGB(1,1,1):t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(Ic);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const i=new Int32Array(e),s=new Int32Array(e);hs(this._multiDrawCounts,i),hs(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=e;const a=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),hs(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),hs(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),hs(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const s=this.geometry;s.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new lt,this._initializeGeometry(s));const a=this.geometry;s.index&&hs(s.index.array,a.index.array);for(const o in s.attributes)hs(s.attributes[o].array,a.attributes[o].array)}raycast(e,t){const n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,a=this.geometry;un.material=this.material,un.geometry.index=a.index,un.geometry.attributes=a.attributes,un.geometry.boundingBox===null&&(un.geometry.boundingBox=new $t),un.geometry.boundingSphere===null&&(un.geometry.boundingSphere=new qt);for(let o=0,l=n.length;o<l;o++){if(!n[o].visible||!n[o].active)continue;const c=n[o].geometryIndex,u=i[c];un.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(o,un.matrixWorld).premultiply(s),this.getBoundingBoxAt(c,un.geometry.boundingBox),this.getBoundingSphereAt(c,un.geometry.boundingSphere),un.raycast(e,Qa);for(let h=0,d=Qa.length;h<d;h++){const f=Qa[h];f.object=this,f.batchId=o,t.push(f)}Qa.length=0}un.material=null,un.geometry.index=null,un.geometry.attributes={},un.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const a=i.getIndex();let o=a===null?1:a.array.BYTES_PER_ELEMENT,l=1;s.wireframe&&(l=2,o=i.attributes.position.count>65535?4:2);const c=this._instanceInfo,u=this._multiDrawStarts,h=this._multiDrawCounts,d=this._geometryInfo,f=this.perObjectFrustumCulled,m=this._indirectTexture,x=m.image.data,g=n.isArrayCamera?d_:Kd;f&&!n.isArrayCamera&&(Mn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),Kd.setFromProjectionMatrix(Mn,n.coordinateSystem,n.reversedDepth));let p=0;if(this.sortObjects){Mn.copy(this.matrixWorld).invert(),Or.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Mn),jd.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(Mn);for(let y=0,E=c.length;y<E;y++)if(c[y].visible&&c[y].active){const S=c[y].geometryIndex;this.getMatrixAt(y,Mn),this.getBoundingSphereAt(S,ds).applyMatrix4(Mn);let C=!1;if(f&&(C=!g.intersectsSphere(ds,n)),!C){const b=d[S],w=h_.subVectors(ds.center,Or).dot(jd);Pc.push(b.start,b.count,w,y)}}const v=Pc.list,_=this.customSort;_===null?v.sort(s.transparent?l_:o_):_.call(this,v,n);for(let y=0,E=v.length;y<E;y++){const S=v[y];u[p]=S.start*o*l,h[p]=S.count*l,x[p]=S.index,p++}Pc.reset()}else for(let v=0,_=c.length;v<_;v++)if(c[v].visible&&c[v].active){const y=c[v].geometryIndex;let E=!1;if(f&&(this.getMatrixAt(v,Mn),this.getBoundingSphereAt(y,ds).applyMatrix4(Mn),E=!g.intersectsSphere(ds,n)),!E){const S=d[y];u[p]=S.start*o*l,h[p]=S.count*l,x[p]=v,p++}}m.needsUpdate=!0,this._multiDrawCount=p,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,s,a){this.onBeforeRender(e,null,i,s,a)}}class bn extends jt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const _l=new R,vl=new R,Qd=new rt,kr=new yr,eo=new qt,Lc=new R,eh=new R;class ts extends St{constructor(e=new lt,t=new bn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)_l.fromBufferAttribute(t,i-1),vl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=_l.distanceTo(vl);e.setAttribute("lineDistance",new ke(n,1))}else Ce("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),eo.copy(n.boundingSphere),eo.applyMatrix4(i),eo.radius+=s,e.ray.intersectsSphere(eo)===!1)return;Qd.copy(i).invert(),kr.copy(e.ray).applyMatrix4(Qd);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let x=f,g=m-1;x<g;x+=c){const p=u.getX(x),v=u.getX(x+1),_=to(this,e,kr,l,p,v,x);_&&t.push(_)}if(this.isLineLoop){const x=u.getX(m-1),g=u.getX(f),p=to(this,e,kr,l,x,g,m-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let x=f,g=m-1;x<g;x+=c){const p=to(this,e,kr,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){const x=to(this,e,kr,l,m-1,f,m-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function to(r,e,t,n,i,s,a){const o=r.geometry.attributes.position;if(_l.fromBufferAttribute(o,i),vl.fromBufferAttribute(o,s),t.distanceSqToSegment(_l,vl,Lc,eh)>n)return;Lc.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Lc);if(!(c<e.near||c>e.far))return{distance:c,point:eh.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const th=new R,nh=new R;class Si extends ts{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)th.fromBufferAttribute(t,i),nh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+th.distanceTo(nh);e.setAttribute("lineDistance",new ke(n,1))}else Ce("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class sp extends ts{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Wu extends jt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ih=new rt,du=new yr,no=new qt,io=new R;class rp extends St{constructor(e=new lt,t=new Wu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),no.copy(n.boundingSphere),no.applyMatrix4(i),no.radius+=s,e.ray.intersectsSphere(no)===!1)return;ih.copy(i).invert(),du.copy(e.ray).applyMatrix4(ih);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=d,x=f;m<x;m++){const g=c.getX(m);io.fromBufferAttribute(h,g),sh(io,g,l,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let m=d,x=f;m<x;m++)io.fromBufferAttribute(h,m),sh(io,m,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function sh(r,e,t,n,i,s,a){const o=du.distanceSqToPoint(r);if(o<t){const l=new R;du.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class ap extends Nt{constructor(e,t,n,i,s=Dt,a=Dt,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;const u=this;function h(){u.needsUpdate=!0,u._requestVideoFrameCallbackId=e.requestVideoFrameCallback(h)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(h))}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}}class p_ extends ap{constructor(e,t,n,i,s,a,o,l){super({},e,t,n,i,s,a,o,l),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(e){this.image=e,this.needsUpdate=!0}}class m_ extends Nt{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=Vt,this.minFilter=Vt,this.generateMipmaps=!1,this.needsUpdate=!0}}class Gl extends Nt{constructor(e,t,n,i,s,a,o,l,c,u,h,d){super(null,a,o,l,c,u,i,s,h,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class g_ extends Gl{constructor(e,t,n,i,s,a){super(e,t,n,s,a),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Rn,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class __ extends Gl{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,yi),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class Ma extends Nt{constructor(e=[],t=yi,n,i,s,a,o,l,c,u){super(e,t,n,i,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class v_ extends Nt{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class x_ extends Nt{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;const u=e?e.parentNode:null;u!==null&&"requestPaint"in u&&(u.onpaint=()=>{this.needsUpdate=!0},u.requestPaint())}dispose(){const e=this.image?this.image.parentNode:null;e!==null&&"onpaint"in e&&(e.onpaint=null),super.dispose()}}class Ps extends Nt{constructor(e,t,n=Wn,i,s,a,o=Vt,l=Vt,c,u=Mi,h=1){if(u!==Mi&&u!==Zi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,i,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ji(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class op extends Ps{constructor(e,t=Wn,n=yi,i,s,a=Vt,o=Vt,l,c=Mi){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,n,i,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Xu extends Nt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class is extends lt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,f=0;m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new ke(c,3)),this.setAttribute("normal",new ke(u,3)),this.setAttribute("uv",new ke(h,2));function m(x,g,p,v,_,y,E,S,C,b,w){const P=y/C,L=E/b,k=y/2,$=E/2,z=S/2,N=C+1,V=b+1;let G=0,le=0;const pe=new R;for(let Ee=0;Ee<V;Ee++){const Ie=Ee*L-$;for(let Fe=0;Fe<N;Fe++){const tt=Fe*P-k;pe[x]=tt*v,pe[g]=Ie*_,pe[p]=z,c.push(pe.x,pe.y,pe.z),pe[x]=0,pe[g]=0,pe[p]=S>0?1:-1,u.push(pe.x,pe.y,pe.z),h.push(Fe/C),h.push(1-Ee/b),G+=1}}for(let Ee=0;Ee<b;Ee++)for(let Ie=0;Ie<C;Ie++){const Fe=d+Ie+N*Ee,tt=d+Ie+N*(Ee+1),ce=d+(Ie+1)+N*(Ee+1),q=d+(Ie+1)+N*Ee;l.push(Fe,tt,q),l.push(tt,ce,q),le+=6}o.addGroup(f,le,w),f+=le,d+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new is(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Hl extends lt{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const a=[],o=[],l=[],c=[],u=t/2,h=Math.PI/2*e,d=t,f=2*h+d,m=n*2+s,x=i+1,g=new R,p=new R;for(let v=0;v<=m;v++){let _=0,y=0,E=0,S=0;if(v<=n){const w=v/n,P=w*Math.PI/2;y=-u-e*Math.cos(P),E=e*Math.sin(P),S=-e*Math.cos(P),_=w*h}else if(v<=n+s){const w=(v-n)/s;y=-u+w*t,E=e,S=0,_=h+w*d}else{const w=(v-n-s)/n,P=w*Math.PI/2;y=u+e*Math.sin(P),E=e*Math.cos(P),S=e*Math.sin(P),_=h+d+w*h}const C=Math.max(0,Math.min(1,_/f));let b=0;v===0?b=.5/i:v===m&&(b=-.5/i);for(let w=0;w<=i;w++){const P=w/i,L=P*Math.PI*2,k=Math.sin(L),$=Math.cos(L);p.x=-E*$,p.y=y,p.z=E*k,o.push(p.x,p.y,p.z),g.set(-E*$,S,E*k),g.normalize(),l.push(g.x,g.y,g.z),c.push(P+b,C)}if(v>0){const w=(v-1)*x;for(let P=0;P<i;P++){const L=w+P,k=w+P+1,$=v*x+P,z=v*x+P+1;a.push(L,k,$),a.push(k,z,$)}}}this.setIndex(a),this.setAttribute("position",new ke(o,3)),this.setAttribute("normal",new ke(l,3)),this.setAttribute("uv",new ke(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hl(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Wl extends lt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new R,u=new fe;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=n+h/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new ke(a,3)),this.setAttribute("normal",new ke(o,3)),this.setAttribute("uv",new ke(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wl(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Sa extends lt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],h=[],d=[],f=[];let m=0;const x=[],g=n/2;let p=0;v(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new ke(h,3)),this.setAttribute("normal",new ke(d,3)),this.setAttribute("uv",new ke(f,2));function v(){const y=new R,E=new R;let S=0;const C=(t-e)/n;for(let b=0;b<=s;b++){const w=[],P=b/s,L=P*(t-e)+e;for(let k=0;k<=i;k++){const $=k/i,z=$*l+o,N=Math.sin(z),V=Math.cos(z);E.x=L*N,E.y=-P*n+g,E.z=L*V,h.push(E.x,E.y,E.z),y.set(N,C,V).normalize(),d.push(y.x,y.y,y.z),f.push($,1-P),w.push(m++)}x.push(w)}for(let b=0;b<i;b++)for(let w=0;w<s;w++){const P=x[w][b],L=x[w+1][b],k=x[w+1][b+1],$=x[w][b+1];(e>0||w!==0)&&(u.push(P,L,$),S+=3),(t>0||w!==s-1)&&(u.push(L,k,$),S+=3)}c.addGroup(p,S,0),p+=S}function _(y){const E=m,S=new fe,C=new R;let b=0;const w=y===!0?e:t,P=y===!0?1:-1;for(let k=1;k<=i;k++)h.push(0,g*P,0),d.push(0,P,0),f.push(.5,.5),m++;const L=m;for(let k=0;k<=i;k++){const z=k/i*l+o,N=Math.cos(z),V=Math.sin(z);C.x=w*V,C.y=g*P,C.z=w*N,h.push(C.x,C.y,C.z),d.push(0,P,0),S.x=N*.5+.5,S.y=V*.5*P+.5,f.push(S.x,S.y),m++}for(let k=0;k<i;k++){const $=E+k,z=L+k;y===!0?u.push(z,z+1,$):u.push(z+1,z,$),b+=3}c.addGroup(p,b,y===!0?1:2),p+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sa(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Mr extends Sa{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Mr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ss extends lt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],a=[];o(i),c(n),u(),this.setAttribute("position",new ke(s,3)),this.setAttribute("normal",new ke(s.slice(),3)),this.setAttribute("uv",new ke(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const _=new R,y=new R,E=new R;for(let S=0;S<t.length;S+=3)f(t[S+0],_),f(t[S+1],y),f(t[S+2],E),l(_,y,E,v)}function l(v,_,y,E){const S=E+1,C=[];for(let b=0;b<=S;b++){C[b]=[];const w=v.clone().lerp(y,b/S),P=_.clone().lerp(y,b/S),L=S-b;for(let k=0;k<=L;k++)k===0&&b===S?C[b][k]=w:C[b][k]=w.clone().lerp(P,k/L)}for(let b=0;b<S;b++)for(let w=0;w<2*(S-b)-1;w++){const P=Math.floor(w/2);w%2===0?(d(C[b][P+1]),d(C[b+1][P]),d(C[b][P])):(d(C[b][P+1]),d(C[b+1][P+1]),d(C[b+1][P]))}}function c(v){const _=new R;for(let y=0;y<s.length;y+=3)_.x=s[y+0],_.y=s[y+1],_.z=s[y+2],_.normalize().multiplyScalar(v),s[y+0]=_.x,s[y+1]=_.y,s[y+2]=_.z}function u(){const v=new R;for(let _=0;_<s.length;_+=3){v.x=s[_+0],v.y=s[_+1],v.z=s[_+2];const y=g(v)/2/Math.PI+.5,E=p(v)/Math.PI+.5;a.push(y,1-E)}m(),h()}function h(){for(let v=0;v<a.length;v+=6){const _=a[v+0],y=a[v+2],E=a[v+4],S=Math.max(_,y,E),C=Math.min(_,y,E);S>.9&&C<.1&&(_<.2&&(a[v+0]+=1),y<.2&&(a[v+2]+=1),E<.2&&(a[v+4]+=1))}}function d(v){s.push(v.x,v.y,v.z)}function f(v,_){const y=v*3;_.x=e[y+0],_.y=e[y+1],_.z=e[y+2]}function m(){const v=new R,_=new R,y=new R,E=new R,S=new fe,C=new fe,b=new fe;for(let w=0,P=0;w<s.length;w+=9,P+=6){v.set(s[w+0],s[w+1],s[w+2]),_.set(s[w+3],s[w+4],s[w+5]),y.set(s[w+6],s[w+7],s[w+8]),S.set(a[P+0],a[P+1]),C.set(a[P+2],a[P+3]),b.set(a[P+4],a[P+5]),E.copy(v).add(_).add(y).divideScalar(3);const L=g(E);x(S,P+0,v,L),x(C,P+2,_,L),x(b,P+4,y,L)}}function x(v,_,y,E){E<0&&v.x===1&&(a[_]=v.x-1),y.x===0&&y.z===0&&(a[_]=E/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ss(e.vertices,e.indices,e.radius,e.detail)}}class Xl extends ss{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Xl(e.radius,e.detail)}}const so=new R,ro=new R,Dc=new R,ao=new Tn;class lp extends lt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(Ts*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);const{a:x,b:g,c:p}=ao;if(x.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),ao.getNormal(Dc),h[0]=`${Math.round(x.x*i)},${Math.round(x.y*i)},${Math.round(x.z*i)}`,h[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,h[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let v=0;v<3;v++){const _=(v+1)%3,y=h[v],E=h[_],S=ao[u[v]],C=ao[u[_]],b=`${y}_${E}`,w=`${E}_${y}`;w in d&&d[w]?(Dc.dot(d[w].normal)<=s&&(f.push(S.x,S.y,S.z),f.push(C.x,C.y,C.z)),d[w]=null):b in d||(d[b]={index0:c[v],index1:c[_],normal:Dc.clone()})}}for(const m in d)if(d[m]){const{index0:x,index1:g}=d[m];so.fromBufferAttribute(o,x),ro.fromBufferAttribute(o,g),f.push(so.x,so.y,so.z),f.push(ro.x,ro.y,ro.z)}this.setAttribute("position",new ke(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class ai{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ce("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);const u=n[i],d=n[i+1]-u,f=(a-u)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new fe:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new R,i=[],s=[],a=[],o=new R,l=new rt;for(let f=0;f<=e;f++){const m=f/e;i[f]=this.getTangentAt(m,new R)}s[0]=new R,a[0]=new R;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),d=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(st(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(st(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),a[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class $l extends ai{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new fe){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class cp extends $l{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function $u(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,h){let d=(a-s)/c-(o-s)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+h)+(l-o)/h;d*=u,f*=u,i(a,o,d,f)},calc:function(s){const a=s*s,o=a*s;return r+e*s+t*a+n*o}}}const rh=new R,ah=new R,Uc=new $u,Nc=new $u,Fc=new $u;class up extends ai{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new R){const n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=i[(o-1)%s]:(ah.subVectors(i[0],i[1]).add(i[0]),c=ah);const h=i[o%s],d=i[(o+1)%s];if(this.closed||o+2<s?u=i[(o+2)%s]:(rh.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=rh),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(h),f),x=Math.pow(h.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(u),f);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),Uc.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,m,x,g),Nc.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,m,x,g),Fc.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,m,x,g)}else this.curveType==="catmullrom"&&(Uc.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),Nc.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),Fc.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return n.set(Uc.calc(l),Nc.calc(l),Fc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new R().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function oh(r,e,t,n,i){const s=(n-e)*.5,a=(i-t)*.5,o=r*r,l=r*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*r+t}function y_(r,e){const t=1-r;return t*t*e}function b_(r,e){return 2*(1-r)*r*e}function M_(r,e){return r*r*e}function Qr(r,e,t,n){return y_(r,e)+b_(r,t)+M_(r,n)}function S_(r,e){const t=1-r;return t*t*t*e}function w_(r,e){const t=1-r;return 3*t*t*r*e}function E_(r,e){return 3*(1-r)*r*r*e}function T_(r,e){return r*r*r*e}function ea(r,e,t,n,i){return S_(r,e)+w_(r,t)+E_(r,n)+T_(r,i)}class qu extends ai{constructor(e=new fe,t=new fe,n=new fe,i=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new fe){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ea(e,i.x,s.x,a.x,o.x),ea(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class dp extends ai{constructor(e=new R,t=new R,n=new R,i=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new R){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ea(e,i.x,s.x,a.x,o.x),ea(e,i.y,s.y,a.y,o.y),ea(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Yu extends ai{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class hp extends ai{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Zu extends ai{constructor(e=new fe,t=new fe,n=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new fe){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Qr(e,i.x,s.x,a.x),Qr(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ju extends ai{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Qr(e,i.x,s.x,a.x),Qr(e,i.y,s.y,a.y),Qr(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ku extends ai{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){const n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],u=i[a>i.length-2?i.length-1:a+1],h=i[a>i.length-3?i.length-1:a+2];return n.set(oh(o,l.x,c.x,u.x,h.x),oh(o,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new fe().fromArray(i))}return this}}var xl=Object.freeze({__proto__:null,ArcCurve:cp,CatmullRomCurve3:up,CubicBezierCurve:qu,CubicBezierCurve3:dp,EllipseCurve:$l,LineCurve:Yu,LineCurve3:hp,QuadraticBezierCurve:Zu,QuadraticBezierCurve3:Ju,SplineCurve:Ku});class fp extends ai{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new xl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const a=s[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new xl[i.type]().fromJSON(i))}return this}}class yl extends fp{constructor(e){super(),this.type="Path",this.currentPoint=new fe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Yu(this.currentPoint.clone(),new fe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new Zu(this.currentPoint.clone(),new fe(e,t),new fe(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){const o=new qu(this.currentPoint.clone(),new fe(e,t),new fe(n,i),new fe(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Ku(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){const c=new $l(e,t,n,i,s,a,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class As extends yl{constructor(e){super(e),this.uuid=Bn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new yl().fromJSON(i))}return this}}function A_(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=pp(r,0,i,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=L_(r,e,s,t)),r.length>80*t){o=r[0],l=r[1];let u=o,h=l;for(let d=t;d<i;d+=t){const f=r[d],m=r[d+1];f<o&&(o=f),m<l&&(l=m),f>u&&(u=f),m>h&&(h=m)}c=Math.max(u-o,h-l),c=c!==0?32767/c:0}return fa(s,a,t,o,l,c,0),a}function pp(r,e,t,n,i){let s;if(i===H_(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=lh(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=lh(a/n|0,r[a],r[a+1],s);return s&&gr(s,s.next)&&(ma(s),s=s.next),s}function Ls(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(gr(t,t.next)||Ut(t.prev,t,t.next)===0)){if(ma(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function fa(r,e,t,n,i,s,a){if(!r)return;!a&&s&&O_(r,n,i,s);let o=r;for(;r.prev!==r.next;){const l=r.prev,c=r.next;if(s?R_(r,n,i,s):C_(r)){e.push(l.i,r.i,c.i),ma(r),r=c.next,o=c.next;continue}if(r=c,r===o){a?a===1?(r=I_(Ls(r),e),fa(r,e,t,n,i,s,2)):a===2&&P_(r,e,t,n,i,s):fa(Ls(r),e,t,n,i,s,1);break}}}function C_(r){const e=r.prev,t=r,n=r.next;if(Ut(e,t,n)>=0)return!1;const i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(i,s,a),h=Math.min(o,l,c),d=Math.max(i,s,a),f=Math.max(o,l,c);let m=n.next;for(;m!==e;){if(m.x>=u&&m.x<=d&&m.y>=h&&m.y<=f&&Gr(i,o,s,l,a,c,m.x,m.y)&&Ut(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function R_(r,e,t,n){const i=r.prev,s=r,a=r.next;if(Ut(i,s,a)>=0)return!1;const o=i.x,l=s.x,c=a.x,u=i.y,h=s.y,d=a.y,f=Math.min(o,l,c),m=Math.min(u,h,d),x=Math.max(o,l,c),g=Math.max(u,h,d),p=hu(f,m,e,t,n),v=hu(x,g,e,t,n);let _=r.prevZ,y=r.nextZ;for(;_&&_.z>=p&&y&&y.z<=v;){if(_.x>=f&&_.x<=x&&_.y>=m&&_.y<=g&&_!==i&&_!==a&&Gr(o,u,l,h,c,d,_.x,_.y)&&Ut(_.prev,_,_.next)>=0||(_=_.prevZ,y.x>=f&&y.x<=x&&y.y>=m&&y.y<=g&&y!==i&&y!==a&&Gr(o,u,l,h,c,d,y.x,y.y)&&Ut(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;_&&_.z>=p;){if(_.x>=f&&_.x<=x&&_.y>=m&&_.y<=g&&_!==i&&_!==a&&Gr(o,u,l,h,c,d,_.x,_.y)&&Ut(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;y&&y.z<=v;){if(y.x>=f&&y.x<=x&&y.y>=m&&y.y<=g&&y!==i&&y!==a&&Gr(o,u,l,h,c,d,y.x,y.y)&&Ut(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function I_(r,e){let t=r;do{const n=t.prev,i=t.next.next;!gr(n,i)&&gp(n,t,t.next,i)&&pa(n,i)&&pa(i,n)&&(e.push(n.i,t.i,i.i),ma(t),ma(t.next),t=r=i),t=t.next}while(t!==r);return Ls(t)}function P_(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&z_(a,o)){let l=_p(a,o);a=Ls(a,a.next),l=Ls(l,l.next),fa(a,e,t,n,i,s,0),fa(l,e,t,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function L_(r,e,t,n){const i=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*n,l=s<a-1?e[s+1]*n:r.length,c=pp(r,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(B_(c))}i.sort(D_);for(let s=0;s<i.length;s++)t=U_(i[s],t);return t}function D_(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function U_(r,e){const t=N_(r,e);if(!t)return e;const n=_p(t,r);return Ls(n,n.next),Ls(t,t.next)}function N_(r,e){let t=e;const n=r.x,i=r.y;let s=-1/0,a;if(gr(r,t))return t;do{if(gr(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const h=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>s&&(s=h,a=t.x<t.next.x?t:t.next,h===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&mp(i<c?n:s,i,l,c,i<c?s:n,i,t.x,t.y)){const h=Math.abs(i-t.y)/(n-t.x);pa(t,r)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&F_(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function F_(r,e){return Ut(r.prev,r,e.prev)<0&&Ut(e.next,r,r.next)<0}function O_(r,e,t,n){let i=r;do i.z===0&&(i.z=hu(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,k_(i)}function k_(r){let e,t=1;do{let n=r,i;r=null;let s=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=a}s.nextZ=null,t*=2}while(e>1);return r}function hu(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function B_(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function mp(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function Gr(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&mp(r,e,t,n,i,s,a,o)}function z_(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!V_(r,e)&&(pa(r,e)&&pa(e,r)&&G_(r,e)&&(Ut(r.prev,r,e.prev)||Ut(r,e.prev,e))||gr(r,e)&&Ut(r.prev,r,r.next)>0&&Ut(e.prev,e,e.next)>0)}function Ut(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function gr(r,e){return r.x===e.x&&r.y===e.y}function gp(r,e,t,n){const i=lo(Ut(r,e,t)),s=lo(Ut(r,e,n)),a=lo(Ut(t,n,r)),o=lo(Ut(t,n,e));return!!(i!==s&&a!==o||i===0&&oo(r,t,e)||s===0&&oo(r,n,e)||a===0&&oo(t,r,n)||o===0&&oo(t,e,n))}function oo(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function lo(r){return r>0?1:r<0?-1:0}function V_(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&gp(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function pa(r,e){return Ut(r.prev,r,r.next)<0?Ut(r,e,r.next)>=0&&Ut(r,r.prev,e)>=0:Ut(r,e,r.prev)<0||Ut(r,r.next,e)<0}function G_(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function _p(r,e){const t=fu(r.i,r.x,r.y),n=fu(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function lh(r,e,t,n){const i=fu(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ma(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function fu(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function H_(r,e,t,n){let i=0;for(let s=e,a=t-n;s<t;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}class W_{static triangulate(e,t,n=2){return A_(e,t,n)}}class ti{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return ti.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];ch(e),uh(n,e);let a=e.length;t.forEach(ch);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,uh(n,t[l]);const o=W_.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function ch(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function uh(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class ql extends lt{constructor(e=new As([new fe(.5,.5),new fe(-.5,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new ke(i,3)),this.setAttribute("uv",new ke(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:X_;let _,y=!1,E,S,C,b;if(p){_=p.getSpacedPoints(u),y=!0,d=!1;const ie=p.isCatmullRomCurve3?p.closed:!1;E=p.computeFrenetFrames(u,ie),S=new R,C=new R,b=new R}d||(g=0,f=0,m=0,x=0);const w=o.extractPoints(c);let P=w.shape;const L=w.holes;if(!ti.isClockWise(P)){P=P.reverse();for(let ie=0,te=L.length;ie<te;ie++){const ae=L[ie];ti.isClockWise(ae)&&(L[ie]=ae.reverse())}}function $(ie){const ae=10000000000000001e-36;let me=ie[0];for(let ge=1;ge<=ie.length;ge++){const je=ge%ie.length,U=ie[je],nt=U.x-me.x,Be=U.y-me.y,Ke=nt*nt+Be*Be,xe=Math.max(Math.abs(U.x),Math.abs(U.y),Math.abs(me.x),Math.abs(me.y)),xt=ae*xe*xe;if(Ke<=xt){ie.splice(je,1),ge--;continue}me=U}}$(P),L.forEach($);const z=L.length,N=P;for(let ie=0;ie<z;ie++){const te=L[ie];P=P.concat(te)}function V(ie,te,ae){return te||$e("ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(te,ae)}const G=P.length;function le(ie,te,ae){let me,ge,je;const U=ie.x-te.x,nt=ie.y-te.y,Be=ae.x-ie.x,Ke=ae.y-ie.y,xe=U*U+nt*nt,xt=U*Ke-nt*Be;if(Math.abs(xt)>Number.EPSILON){const A=Math.sqrt(xe),M=Math.sqrt(Be*Be+Ke*Ke),X=te.x-nt/A,oe=te.y+U/A,_e=ae.x-Ke/M,be=ae.y+Be/M,Te=((_e-X)*Ke-(be-oe)*Be)/(U*Ke-nt*Be);me=X+U*Te-ie.x,ge=oe+nt*Te-ie.y;const se=me*me+ge*ge;if(se<=2)return new fe(me,ge);je=Math.sqrt(se/2)}else{let A=!1;U>Number.EPSILON?Be>Number.EPSILON&&(A=!0):U<-Number.EPSILON?Be<-Number.EPSILON&&(A=!0):Math.sign(nt)===Math.sign(Ke)&&(A=!0),A?(me=-nt,ge=U,je=Math.sqrt(xe)):(me=U,ge=nt,je=Math.sqrt(xe/2))}return new fe(me/je,ge/je)}const pe=[];for(let ie=0,te=N.length,ae=te-1,me=ie+1;ie<te;ie++,ae++,me++)ae===te&&(ae=0),me===te&&(me=0),pe[ie]=le(N[ie],N[ae],N[me]);const Ee=[];let Ie,Fe=pe.concat();for(let ie=0,te=z;ie<te;ie++){const ae=L[ie];Ie=[];for(let me=0,ge=ae.length,je=ge-1,U=me+1;me<ge;me++,je++,U++)je===ge&&(je=0),U===ge&&(U=0),Ie[me]=le(ae[me],ae[je],ae[U]);Ee.push(Ie),Fe=Fe.concat(Ie)}let tt;if(g===0)tt=ti.triangulateShape(N,L);else{const ie=[],te=[];for(let ae=0;ae<g;ae++){const me=ae/g,ge=f*Math.cos(me*Math.PI/2),je=m*Math.sin(me*Math.PI/2)+x;for(let U=0,nt=N.length;U<nt;U++){const Be=V(N[U],pe[U],je);ye(Be.x,Be.y,-ge),me===0&&ie.push(Be)}for(let U=0,nt=z;U<nt;U++){const Be=L[U];Ie=Ee[U];const Ke=[];for(let xe=0,xt=Be.length;xe<xt;xe++){const A=V(Be[xe],Ie[xe],je);ye(A.x,A.y,-ge),me===0&&Ke.push(A)}me===0&&te.push(Ke)}}tt=ti.triangulateShape(ie,te)}const ce=tt.length,q=m+x;for(let ie=0;ie<G;ie++){const te=d?V(P[ie],Fe[ie],q):P[ie];y?(C.copy(E.normals[0]).multiplyScalar(te.x),S.copy(E.binormals[0]).multiplyScalar(te.y),b.copy(_[0]).add(C).add(S),ye(b.x,b.y,b.z)):ye(te.x,te.y,0)}for(let ie=1;ie<=u;ie++)for(let te=0;te<G;te++){const ae=d?V(P[te],Fe[te],q):P[te];y?(C.copy(E.normals[ie]).multiplyScalar(ae.x),S.copy(E.binormals[ie]).multiplyScalar(ae.y),b.copy(_[ie]).add(C).add(S),ye(b.x,b.y,b.z)):ye(ae.x,ae.y,h/u*ie)}for(let ie=g-1;ie>=0;ie--){const te=ie/g,ae=f*Math.cos(te*Math.PI/2),me=m*Math.sin(te*Math.PI/2)+x;for(let ge=0,je=N.length;ge<je;ge++){const U=V(N[ge],pe[ge],me);ye(U.x,U.y,h+ae)}for(let ge=0,je=L.length;ge<je;ge++){const U=L[ge];Ie=Ee[ge];for(let nt=0,Be=U.length;nt<Be;nt++){const Ke=V(U[nt],Ie[nt],me);y?ye(Ke.x,Ke.y+_[u-1].y,_[u-1].x+ae):ye(Ke.x,Ke.y,h+ae)}}}F(),K();function F(){const ie=i.length/3;if(d){let te=0,ae=G*te;for(let me=0;me<ce;me++){const ge=tt[me];Ve(ge[2]+ae,ge[1]+ae,ge[0]+ae)}te=u+g*2,ae=G*te;for(let me=0;me<ce;me++){const ge=tt[me];Ve(ge[0]+ae,ge[1]+ae,ge[2]+ae)}}else{for(let te=0;te<ce;te++){const ae=tt[te];Ve(ae[2],ae[1],ae[0])}for(let te=0;te<ce;te++){const ae=tt[te];Ve(ae[0]+G*u,ae[1]+G*u,ae[2]+G*u)}}n.addGroup(ie,i.length/3-ie,0)}function K(){const ie=i.length/3;let te=0;ue(N,te),te+=N.length;for(let ae=0,me=L.length;ae<me;ae++){const ge=L[ae];ue(ge,te),te+=ge.length}n.addGroup(ie,i.length/3-ie,1)}function ue(ie,te){let ae=ie.length;for(;--ae>=0;){const me=ae;let ge=ae-1;ge<0&&(ge=ie.length-1);for(let je=0,U=u+g*2;je<U;je++){const nt=G*je,Be=G*(je+1),Ke=te+me+nt,xe=te+ge+nt,xt=te+ge+Be,A=te+me+Be;re(Ke,xe,xt,A)}}}function ye(ie,te,ae){l.push(ie),l.push(te),l.push(ae)}function Ve(ie,te,ae){he(ie),he(te),he(ae);const me=i.length/3,ge=v.generateTopUV(n,i,me-3,me-2,me-1);ne(ge[0]),ne(ge[1]),ne(ge[2])}function re(ie,te,ae,me){he(ie),he(te),he(me),he(te),he(ae),he(me);const ge=i.length/3,je=v.generateSideWallUV(n,i,ge-6,ge-3,ge-2,ge-1);ne(je[0]),ne(je[1]),ne(je[3]),ne(je[1]),ne(je[2]),ne(je[3])}function he(ie){i.push(l[ie*3+0]),i.push(l[ie*3+1]),i.push(l[ie*3+2])}function ne(ie){s.push(ie.x),s.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return $_(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];n.push(o)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new xl[i.type]().fromJSON(i)),new ql(n,e.options)}}const X_={generateTopUV:function(r,e,t,n,i){const s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],u=e[i*3+1];return[new fe(s,a),new fe(o,l),new fe(c,u)]},generateSideWallUV:function(r,e,t,n,i,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],d=e[i*3],f=e[i*3+1],m=e[i*3+2],x=e[s*3],g=e[s*3+1],p=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new fe(a,1-l),new fe(c,1-h),new fe(d,1-m),new fe(x,1-p)]:[new fe(o,1-l),new fe(u,1-h),new fe(f,1-m),new fe(g,1-p)]}};function $_(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Yl extends ss{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Yl(e.radius,e.detail)}}class Zl extends lt{constructor(e=[new fe(0,-.5),new fe(.5,0),new fe(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=st(i,0,Math.PI*2);const s=[],a=[],o=[],l=[],c=[],u=1/t,h=new R,d=new fe,f=new R,m=new R,x=new R;let g=0,p=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:g=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,f.x=p*1,f.y=-g,f.z=p*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:g=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(m)}for(let v=0;v<=t;v++){const _=n+v*u*i,y=Math.sin(_),E=Math.cos(_);for(let S=0;S<=e.length-1;S++){h.x=e[S].x*y,h.y=e[S].y,h.z=e[S].x*E,a.push(h.x,h.y,h.z),d.x=v/t,d.y=S/(e.length-1),o.push(d.x,d.y);const C=l[3*S+0]*y,b=l[3*S+1],w=l[3*S+0]*E;c.push(C,b,w)}}for(let v=0;v<t;v++)for(let _=0;_<e.length-1;_++){const y=_+v*e.length,E=y,S=y+e.length,C=y+e.length+1,b=y+1;s.push(E,S,b),s.push(C,b,S)}this.setIndex(s),this.setAttribute("position",new ke(a,3)),this.setAttribute("uv",new ke(o,2)),this.setAttribute("normal",new ke(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zl(e.points,e.segments,e.phiStart,e.phiLength)}}class Sr extends ss{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Sr(e.radius,e.detail)}}class wr extends lt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,h=e/o,d=t/l,f=[],m=[],x=[],g=[];for(let p=0;p<u;p++){const v=p*d-a;for(let _=0;_<c;_++){const y=_*h-s;m.push(y,-v,0),x.push(0,0,1),g.push(_/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<o;v++){const _=v+c*p,y=v+c*(p+1),E=v+1+c*(p+1),S=v+1+c*p;f.push(_,y,S),f.push(y,E,S)}this.setIndex(f),this.setAttribute("position",new ke(m,3)),this.setAttribute("normal",new ke(x,3)),this.setAttribute("uv",new ke(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Jl extends lt{constructor(e=.5,t=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],u=[];let h=e;const d=(t-e)/i,f=new R,m=new fe;for(let x=0;x<=i;x++){for(let g=0;g<=n;g++){const p=s+g/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,u.push(m.x,m.y)}h+=d}for(let x=0;x<i;x++){const g=x*(n+1);for(let p=0;p<n;p++){const v=p+g,_=v,y=v+n+1,E=v+n+2,S=v+1;o.push(_,y,S),o.push(y,E,S)}}this.setIndex(o),this.setAttribute("position",new ke(l,3)),this.setAttribute("normal",new ke(c,3)),this.setAttribute("uv",new ke(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Kl extends lt{constructor(e=new As([new fe(0,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new ke(i,3)),this.setAttribute("normal",new ke(s,3)),this.setAttribute("uv",new ke(a,2));function c(u){const h=i.length/3,d=u.extractPoints(t);let f=d.shape;const m=d.holes;ti.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){const v=m[g];ti.isClockWise(v)===!0&&(m[g]=v.reverse())}const x=ti.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){const v=m[g];f=f.concat(v)}for(let g=0,p=f.length;g<p;g++){const v=f[g];i.push(v.x,v.y,0),s.push(0,0,1),a.push(v.x,v.y)}for(let g=0,p=x.length;g<p;g++){const v=x[g],_=v[0]+h,y=v[1]+h,E=v[2]+h;n.push(_,y,E),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return q_(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const a=t[e.shapes[i]];n.push(a)}return new Kl(n,e.curveSegments)}}function q_(r,e){if(e.shapes=[],Array.isArray(r))for(let t=0,n=r.length;t<n;t++){const i=r[t];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e}class ei extends lt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new R,d=new R,f=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){const v=[],_=p/n;let y=0;p===0&&a===0?y=.5/t:p===n&&l===Math.PI&&(y=-.5/t);for(let E=0;E<=t;E++){const S=E/t;h.x=-e*Math.cos(i+S*s)*Math.sin(a+_*o),h.y=e*Math.cos(a+_*o),h.z=e*Math.sin(i+S*s)*Math.sin(a+_*o),m.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),g.push(S+y,1-_),v.push(c++)}u.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){const _=u[p][v+1],y=u[p][v],E=u[p+1][v],S=u[p+1][v+1];(p!==0||a>0)&&f.push(_,y,S),(p!==n-1||l<Math.PI)&&f.push(y,E,S)}this.setIndex(f),this.setAttribute("position",new ke(m,3)),this.setAttribute("normal",new ke(x,3)),this.setAttribute("uv",new ke(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ei(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class wa extends ss{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new wa(e.radius,e.detail)}}class Ds extends lt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);const l=[],c=[],u=[],h=[],d=new R,f=new R,m=new R;for(let x=0;x<=n;x++){const g=a+x/n*o;for(let p=0;p<=i;p++){const v=p/i*s;f.x=(e+t*Math.cos(g))*Math.cos(v),f.y=(e+t*Math.cos(g))*Math.sin(v),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),d.x=e*Math.cos(v),d.y=e*Math.sin(v),m.subVectors(f,d).normalize(),u.push(m.x,m.y,m.z),h.push(p/i),h.push(x/n)}}for(let x=1;x<=n;x++)for(let g=1;g<=i;g++){const p=(i+1)*x+g-1,v=(i+1)*(x-1)+g-1,_=(i+1)*(x-1)+g,y=(i+1)*x+g;l.push(p,v,y),l.push(v,_,y)}this.setIndex(l),this.setAttribute("position",new ke(c,3)),this.setAttribute("normal",new ke(u,3)),this.setAttribute("uv",new ke(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ds(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class jl extends lt{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);const o=[],l=[],c=[],u=[],h=new R,d=new R,f=new R,m=new R,x=new R,g=new R,p=new R;for(let _=0;_<=n;++_){const y=_/n*s*Math.PI*2;v(y,s,a,e,f),v(y+.01,s,a,e,m),g.subVectors(m,f),p.addVectors(m,f),x.crossVectors(g,p),p.crossVectors(x,g),x.normalize(),p.normalize();for(let E=0;E<=i;++E){const S=E/i*Math.PI*2,C=-t*Math.cos(S),b=t*Math.sin(S);h.x=f.x+(C*p.x+b*x.x),h.y=f.y+(C*p.y+b*x.y),h.z=f.z+(C*p.z+b*x.z),l.push(h.x,h.y,h.z),d.subVectors(h,f).normalize(),c.push(d.x,d.y,d.z),u.push(_/n),u.push(E/i)}}for(let _=1;_<=n;_++)for(let y=1;y<=i;y++){const E=(i+1)*(_-1)+(y-1),S=(i+1)*_+(y-1),C=(i+1)*_+y,b=(i+1)*(_-1)+y;o.push(E,S,b),o.push(S,C,b)}this.setIndex(o),this.setAttribute("position",new ke(l,3)),this.setAttribute("normal",new ke(c,3)),this.setAttribute("uv",new ke(u,2));function v(_,y,E,S,C){const b=Math.cos(_),w=Math.sin(_),P=E/y*_,L=Math.cos(P);C.x=S*(2+L)*.5*b,C.y=S*(2+L)*w*.5,C.z=S*Math.sin(P)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jl(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class Ql extends lt{constructor(e=new Ju(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new R,l=new R,c=new fe;let u=new R;const h=[],d=[],f=[],m=[];x(),this.setIndex(m),this.setAttribute("position",new ke(h,3)),this.setAttribute("normal",new ke(d,3)),this.setAttribute("uv",new ke(f,2));function x(){for(let _=0;_<t;_++)g(_);g(s===!1?t:0),v(),p()}function g(_){u=e.getPointAt(_/t,u);const y=a.normals[_],E=a.binormals[_];for(let S=0;S<=i;S++){const C=S/i*Math.PI*2,b=Math.sin(C),w=-Math.cos(C);l.x=w*y.x+b*E.x,l.y=w*y.y+b*E.y,l.z=w*y.z+b*E.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,h.push(o.x,o.y,o.z)}}function p(){for(let _=1;_<=t;_++)for(let y=1;y<=i;y++){const E=(i+1)*(_-1)+(y-1),S=(i+1)*_+(y-1),C=(i+1)*_+y,b=(i+1)*(_-1)+y;m.push(E,S,b),m.push(S,C,b)}}function v(){for(let _=0;_<=t;_++)for(let y=0;y<=i;y++)c.x=_/t,c.y=y/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Ql(new xl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class ju extends lt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new R,s=new R;if(e.index!==null){const a=e.attributes.position,o=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const h=l[c],d=h.start,f=h.count;for(let m=d,x=d+f;m<x;m+=3)for(let g=0;g<3;g++){const p=o.getX(m+g),v=o.getX(m+(g+1)%3);i.fromBufferAttribute(a,p),s.fromBufferAttribute(a,v),dh(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{const a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){const u=3*o+c,h=3*o+(c+1)%3;i.fromBufferAttribute(a,u),s.fromBufferAttribute(a,h),dh(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new ke(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function dh(r,e,t){const n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var hh=Object.freeze({__proto__:null,BoxGeometry:is,CapsuleGeometry:Hl,CircleGeometry:Wl,ConeGeometry:Mr,CylinderGeometry:Sa,DodecahedronGeometry:Xl,EdgesGeometry:lp,ExtrudeGeometry:ql,IcosahedronGeometry:Yl,LatheGeometry:Zl,OctahedronGeometry:Sr,PlaneGeometry:wr,PolyhedronGeometry:ss,RingGeometry:Jl,ShapeGeometry:Kl,SphereGeometry:ei,TetrahedronGeometry:wa,TorusGeometry:Ds,TorusKnotGeometry:jl,TubeGeometry:Ql,WireframeGeometry:ju});class vp extends jt{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ue(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}function _r(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];if(fh(i))i.isRenderTargetTexture?(Ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(fh(i[0])){const s=[];for(let a=0,o=i.length;a<o;a++)s[a]=i[a].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function pn(r){const e={};for(let t=0;t<r.length;t++){const n=_r(r[t]);for(const i in n)e[i]=n[i]}return e}function fh(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function Y_(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function xp(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:_t.workingColorSpace}const ec={clone:_r,merge:pn};var Z_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,J_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vn extends jt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Z_,this.fragmentShader=J_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_r(e.uniforms),this.uniformsGroups=Y_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Qu extends Vn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ed extends jt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ni,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class yp extends ed{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new fe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return st(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ue(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ue(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ue(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class bp extends jt{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ue(16777215),this.specular=new Ue(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ni,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=ya,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Mp extends jt{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Ue(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ni,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class Sp extends jt{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ni,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class wp extends jt{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ni,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=ya,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class td extends jt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class nd extends jt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ep extends jt{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Ue(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ni,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Tp extends bn{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function Ss(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Ap(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function pu(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function id(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}function K_(r,e,t,n,i=30){const s=r.clone();s.name=e;const a=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],u=c.getValueSize(),h=[],d=[];for(let f=0;f<c.times.length;++f){const m=c.times[f]*i;if(!(m<t||m>=n)){h.push(c.times[f]);for(let x=0;x<u;++x)d.push(c.values[f*u+x])}}h.length!==0&&(c.times=Ss(h,c.times.constructor),c.values=Ss(d,c.values.constructor),a.push(c))}s.tracks=a;let o=1/0;for(let l=0;l<s.tracks.length;++l)o>s.tracks[l].times[0]&&(o=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*o);return s.resetDuration(),s}function j_(r,e=0,t=r,n=30){n<=0&&(n=30);const i=t.tracks.length,s=e/n;for(let a=0;a<i;++a){const o=t.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;const c=r.tracks.find(function(p){return p.name===o.name&&p.ValueTypeName===l});if(c===void 0)continue;let u=0;const h=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=h/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const m=o.times.length-1;let x;if(s<=o.times[0]){const p=u,v=h-u;x=o.values.slice(p,v)}else if(s>=o.times[m]){const p=m*h+u,v=p+h-u;x=o.values.slice(p,v)}else{const p=o.createInterpolant(),v=u,_=h-u;p.evaluate(s),x=p.resultBuffer.slice(v,_)}l==="quaternion"&&new hn().fromArray(x).normalize().conjugate().toArray(x);const g=c.times.length;for(let p=0;p<g;++p){const v=p*f+d;if(l==="quaternion")hn.multiplyQuaternionsFlat(c.values,v,x,0,c.values,v);else{const _=f-d*2;for(let y=0;y<_;++y)c.values[v+y]-=x[y]}}}return r.blendMode=Fu,r}class Q_{static convertArray(e,t){return Ss(e,t)}static isTypedArray(e){return qf(e)}static getKeyframeOrder(e){return Ap(e)}static sortedArray(e,t,n){return pu(e,t,n)}static flattenJSON(e,t,n,i){id(e,t,n,i)}static subclip(e,t,n,i,s=30){return K_(e,t,n,i,s)}static makeClipAdditive(e,t=0,n=e,i=30){return j_(e,t,n,i)}}class Er{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Cp extends Er{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:bs,endingEnd:bs}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ms:s=e,o=2*t-n;break;case oa:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ms:a=e,l=2*n-t;break;case oa:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),x=m*m,g=x*m,p=-d*g+2*d*x-d*m,v=(1+d)*g+(-1.5-2*d)*x+(-.5+d)*m+1,_=(-1-f)*g+(1.5+f)*x+.5*m,y=f*g-f*x;for(let E=0;E!==o;++E)s[E]=p*a[u+E]+v*a[c+E]+_*a[l+E]+y*a[h+E];return s}}class sd extends Er{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==o;++d)s[d]=a[c+d]*h+a[l+d]*u;return s}}class Rp extends Er{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Ip extends Er{interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.settings||this.DefaultSettings_,h=u.inTangents,d=u.outTangents;if(!h||!d){const x=(n-t)/(i-t),g=1-x;for(let p=0;p!==o;++p)s[p]=a[c+p]*g+a[l+p]*x;return s}const f=o*2,m=e-1;for(let x=0;x!==o;++x){const g=a[c+x],p=a[l+x],v=m*f+x*2,_=d[v],y=d[v+1],E=e*f+x*2,S=h[E],C=h[E+1];let b=(n-t)/(i-t),w,P,L,k,$;for(let z=0;z<8;z++){w=b*b,P=w*b,L=1-b,k=L*L,$=k*L;const V=$*t+3*k*b*_+3*L*w*S+P*i-n;if(Math.abs(V)<1e-10)break;const G=3*k*(_-t)+6*L*b*(S-_)+3*w*(i-S);if(Math.abs(G)<1e-10)break;b=b-V/G,b=Math.max(0,Math.min(1,b))}s[x]=$*g+3*k*b*y+3*L*w*C+P*p}return s}}class qn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ss(t,this.TimeBufferType),this.values=Ss(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ss(e.times,Array),values:Ss(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Rp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new sd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Cp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new Ip(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case aa:t=this.InterpolantFactoryMethodDiscrete;break;case pl:t=this.InterpolantFactoryMethodLinear;break;case Eo:t=this.InterpolantFactoryMethodSmooth;break;case lu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ce("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return aa;case this.InterpolantFactoryMethodLinear:return pl;case this.InterpolantFactoryMethodSmooth:return Eo;case this.InterpolantFactoryMethodBezier:return lu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&($e("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&($e("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){$e("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){$e("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&qf(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){$e("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Eo,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(i)l=!0;else{const h=o*n,d=h-n,f=h+n;for(let m=0;m!==n;++m){const x=t[h+m];if(x!==t[d+m]||x!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}qn.prototype.ValueTypeName="";qn.prototype.TimeBufferType=Float32Array;qn.prototype.ValueBufferType=Float32Array;qn.prototype.DefaultInterpolation=pl;class Ns extends qn{constructor(e,t,n){super(e,t,n)}}Ns.prototype.ValueTypeName="bool";Ns.prototype.ValueBufferType=Array;Ns.prototype.DefaultInterpolation=aa;Ns.prototype.InterpolantFactoryMethodLinear=void 0;Ns.prototype.InterpolantFactoryMethodSmooth=void 0;class rd extends qn{constructor(e,t,n,i){super(e,t,n,i)}}rd.prototype.ValueTypeName="color";class ga extends qn{constructor(e,t,n,i){super(e,t,n,i)}}ga.prototype.ValueTypeName="number";class Pp extends Er{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let u=c+o;c!==u;c+=4)hn.slerpFlat(s,0,a,c-o,a,c,l);return s}}class Ea extends qn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Pp(this.times,this.values,this.getValueSize(),e)}}Ea.prototype.ValueTypeName="quaternion";Ea.prototype.InterpolantFactoryMethodSmooth=void 0;class Fs extends qn{constructor(e,t,n){super(e,t,n)}}Fs.prototype.ValueTypeName="string";Fs.prototype.ValueBufferType=Array;Fs.prototype.DefaultInterpolation=aa;Fs.prototype.InterpolantFactoryMethodLinear=void 0;Fs.prototype.InterpolantFactoryMethodSmooth=void 0;class _a extends qn{constructor(e,t,n,i){super(e,t,n,i)}}_a.prototype.ValueTypeName="vector";class va{constructor(e="",t=-1,n=[],i=Pl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Bn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(t0(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(qn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const u=Ap(l);l=pu(l,1,u),c=pu(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new ga(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],u=c.name.match(s);if(u&&u.length>1){const h=u[1];let d=i[h];d||(i[h]=d=[]),d.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(Ce("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return $e("AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,m,x){if(f.length!==0){const g=[],p=[];id(f,g,p,m),g.length!==0&&x.push(new h(d,g,p))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let x=0;x<d[m].morphTargets.length;x++)f[d[m].morphTargets[x]]=-1;for(const x in f){const g=[],p=[];for(let v=0;v!==d[m].morphTargets.length;++v){const _=d[m];g.push(_.time),p.push(_.morphTarget===x?1:0)}i.push(new ga(".morphTargetInfluence["+x+"]",g,p))}l=f.length*a}else{const f=".bones["+t[h].name+"]";n(_a,f+".position",d,"pos",i),n(Ea,f+".quaternion",d,"rot",i),n(_a,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function e0(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ga;case"vector":case"vector2":case"vector3":case"vector4":return _a;case"color":return rd;case"quaternion":return Ea;case"bool":case"boolean":return Ns;case"string":return Fs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function t0(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=e0(r.type);if(r.times===void 0){const t=[],n=[];id(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const vi={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(ph(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!ph(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function ph(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class ad{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&i.onStart!==void 0&&i.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],m=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Lp=new ad;class In{constructor(e){this.manager=e!==void 0?e:Lp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}In.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ri={};class n0 extends Error{constructor(e,t){super(e),this.response=t}}class Fi extends In{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=vi.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(Ri[e]!==void 0){Ri[e].push({onLoad:t,onProgress:n,onError:i});return}Ri[e]=[],Ri[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ce("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Ri[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let x=0;const g=new ReadableStream({start(p){v();function v(){h.read().then(({done:_,value:y})=>{if(_)p.close();else{x+=y.byteLength;const E=new ProgressEvent("progress",{lengthComputable:m,loaded:x,total:f});for(let S=0,C=u.length;S<C;S++){const b=u[S];b.onProgress&&b.onProgress(E)}p.enqueue(y),v()}},_=>{p.error(_)})}}});return new Response(g)}else throw new n0(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{vi.add(`file:${e}`,c);const u=Ri[e];delete Ri[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=Ri[e];if(u===void 0)throw this.manager.itemError(e),c;delete Ri[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class i0 extends In{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new Fi(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):$e(l),s.manager.itemError(e)}},n,i)}parse(e){const t=[];for(let n=0;n<e.length;n++){const i=va.parse(e[n]);t.push(i)}return t}}class s0 extends In{constructor(e){super(e)}load(e,t,n,i){const s=this,a=[],o=new Gl,l=new Fi(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(s.withCredentials);let c=0;function u(h){l.load(e[h],function(d){const f=s.parse(d,!0);a[h]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(o.minFilter=Dt),o.image=a,o.format=f.format,o.needsUpdate=!0,t&&t(o))},n,i)}if(Array.isArray(e))for(let h=0,d=e.length;h<d;++h)u(h);else l.load(e,function(h){const d=s.parse(h,!0);if(d.isCubemap){const f=d.mipmaps.length/d.mipmapCount;for(let m=0;m<f;m++){a[m]={mipmaps:[]};for(let x=0;x<d.mipmapCount;x++)a[m].mipmaps.push(d.mipmaps[m*d.mipmapCount+x]),a[m].format=d.format,a[m].width=d.width,a[m].height=d.height}o.image=a}else o.image.width=d.width,o.image.height=d.height,o.mipmaps=d.mipmaps;d.mipmapCount===1&&(o.minFilter=Dt),o.format=d.format,o.needsUpdate=!0,t&&t(o)},n,i);return o}}const er=new WeakMap;class xa extends In{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=vi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=er.get(a);h===void 0&&(h=[],er.set(a,h)),h.push({onLoad:t,onError:i})}return a}const o=da("img");function l(){u(),t&&t(this);const h=er.get(this)||[];for(let d=0;d<h.length;d++){const f=h[d];f.onLoad&&f.onLoad(this)}er.delete(this),s.manager.itemEnd(e)}function c(h){u(),i&&i(h),vi.remove(`image:${e}`);const d=er.get(this)||[];for(let f=0;f<d.length;f++){const m=d[f];m.onError&&m.onError(h)}er.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),vi.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class r0 extends In{constructor(e){super(e)}load(e,t,n,i){const s=new Ma;s.colorSpace=wn;const a=new xa(this.manager);a.setCrossOrigin(this.crossOrigin),a.setPath(this.path);let o=0;function l(c){a.load(e[c],function(u){s.images[c]=u,o++,o===6&&(s.needsUpdate=!0,t&&t(s))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return s}}class a0 extends In{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new ii,o=new Fi(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(e,function(l){let c;try{c=s.parse(l)}catch(u){i!==void 0?i(u):$e(u);return}c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:Rn,a.wrapT=c.wrapT!==void 0?c.wrapT:Rn,a.magFilter=c.magFilter!==void 0?c.magFilter:Dt,a.minFilter=c.minFilter!==void 0?c.minFilter:Dt,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(a.colorSpace=c.colorSpace),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=_i),c.mipmapCount===1&&(a.minFilter=Dt),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,t&&t(a,c)},n,i),a}}class o0 extends In{constructor(e){super(e)}load(e,t,n,i){const s=new Nt,a=new xa(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class rs extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Dp extends rs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Oc=new rt,mh=new R,gh=new R;class od{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new fe(512,512),this.mapType=En,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new br,this._frameExtents=new fe(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;mh.setFromMatrixPosition(e.matrixWorld),t.position.copy(mh),gh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(gh),t.updateMatrixWorld(),Oc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Oc,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Is||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Oc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const co=new R,uo=new hn,di=new R;class tc extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=On,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(co,uo,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(co,uo,di.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(co,uo,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(co,uo,di.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Xi=new R,_h=new fe,vh=new fe;class Kt extends tc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=pr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ts*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return pr*2*Math.atan(Math.tan(Ts*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z),Xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z)}getViewSize(e,t){return this.getViewBounds(e,_h,vh),t.subVectors(vh,_h)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ts*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class l0 extends od{constructor(){super(new Kt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=pr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Up extends rs{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new l0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class c0 extends od{constructor(){super(new Kt(90,1,.5,500)),this.isPointLightShadow=!0}}class Np extends rs{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new c0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Ta extends tc{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class u0 extends od{constructor(){super(new Ta(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fp extends rs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new u0}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Op extends rs{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class kp extends rs{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class ld{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new R)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,s=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.282095),t.addScaledVector(a[1],.488603*i),t.addScaledVector(a[2],.488603*s),t.addScaledVector(a[3],.488603*n),t.addScaledVector(a[4],1.092548*(n*i)),t.addScaledVector(a[5],1.092548*(i*s)),t.addScaledVector(a[6],.315392*(3*s*s-1)),t.addScaledVector(a[7],1.092548*(n*s)),t.addScaledVector(a[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,s=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.886227),t.addScaledVector(a[1],2*.511664*i),t.addScaledVector(a[2],2*.511664*s),t.addScaledVector(a[3],2*.511664*n),t.addScaledVector(a[4],2*.429043*n*i),t.addScaledVector(a[5],2*.429043*i*s),t.addScaledVector(a[6],.743125*s*s-.247708),t.addScaledVector(a[7],2*.429043*n*s),t.addScaledVector(a[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,s=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*s,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*s,t[6]=.315392*(3*s*s-1),t[7]=1.092548*n*s,t[8]=.546274*(n*n-i*i)}}class Bp extends rs{constructor(e=new ld,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class nc extends In{constructor(e){super(e),this.textures={}}load(e,t,n,i){const s=this,a=new Fi(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):$e(l),s.manager.itemError(e)}},n,i)}parse(e){const t=this.textures;function n(s){return t[s]===void 0&&Ce("MaterialLoader: Undefined texture",s),t[s]}const i=this.createMaterialFromType(e.type);if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=e.sheen),e.sheenColor!==void 0&&(i.sheenColor=new Ue().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(i.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.specularIntensity!==void 0&&(i.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(i.dispersion=e.dispersion),e.iridescence!==void 0&&(i.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(i.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.attenuationDistance!==void 0&&(i.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(i.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.shadowSide!==void 0&&(i.shadowSide=e.shadowSide),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(i.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(i.depthFunc=e.depthFunc),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(i.blendSrc=e.blendSrc),e.blendDst!==void 0&&(i.blendDst=e.blendDst),e.blendEquation!==void 0&&(i.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(i.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(i.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==void 0&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(i.dithering=e.dithering),e.alphaToCoverage!==void 0&&(i.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(i.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(i.allowOverride=e.allowOverride),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const s in e.uniforms){const a=e.uniforms[s];switch(i.uniforms[s]={},a.type){case"t":i.uniforms[s].value=n(a.value);break;case"c":i.uniforms[s].value=new Ue().setHex(a.value);break;case"v2":i.uniforms[s].value=new fe().fromArray(a.value);break;case"v3":i.uniforms[s].value=new R().fromArray(a.value);break;case"v4":i.uniforms[s].value=new yt().fromArray(a.value);break;case"m3":i.uniforms[s].value=new ot().fromArray(a.value);break;case"m4":i.uniforms[s].value=new rt().fromArray(a.value);break;default:i.uniforms[s].value=a.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(i.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)i.extensions[s]=e.extensions[s];if(e.lights!==void 0&&(i.lights=e.lights),e.clipping!==void 0&&(i.clipping=e.clipping),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),i.normalScale=new fe().fromArray(s)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(i.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapRotation!==void 0&&i.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new fe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(i.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(i.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(i.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(i.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(e.sheenRoughnessMap)),i}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return nc.createMaterialFromType(e)}static createMaterialFromType(e){const t={ShadowMaterial:vp,SpriteMaterial:Gu,RawShaderMaterial:Qu,ShaderMaterial:Vn,PointsMaterial:Wu,MeshPhysicalMaterial:yp,MeshStandardMaterial:ed,MeshPhongMaterial:bp,MeshToonMaterial:Mp,MeshNormalMaterial:Sp,MeshLambertMaterial:wp,MeshDepthMaterial:td,MeshDistanceMaterial:nd,MeshBasicMaterial:nn,MeshMatcapMaterial:Ep,LineDashedMaterial:Tp,LineBasicMaterial:bn,Material:jt};return new t[e]}}class mu{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class cd extends lt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class zp extends In{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new Fi(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):$e(l),s.manager.itemError(e)}},n,i)}parse(e){const t={},n={};function i(f,m){if(t[m]!==void 0)return t[m];const g=f.interleavedBuffers[m],p=s(f,g.buffer),v=cr(g.type,p),_=new Bl(v,g.stride);return _.uuid=g.uuid,t[m]=_,_}function s(f,m){if(n[m]!==void 0)return n[m];const g=f.arrayBuffers[m],p=new Uint32Array(g).buffer;return n[m]=p,p}const a=e.isInstancedBufferGeometry?new cd:new lt,o=e.data.index;if(o!==void 0){const f=cr(o.type,o.array);a.setIndex(new Ct(f,1))}const l=e.data.attributes;for(const f in l){const m=l[f];let x;if(m.isInterleavedBufferAttribute){const g=i(e.data,m.data);x=new kn(g,m.itemSize,m.offset,m.normalized)}else{const g=cr(m.type,m.array),p=m.isInstancedBufferAttribute?mr:Ct;x=new p(g,m.itemSize,m.normalized)}m.name!==void 0&&(x.name=m.name),m.usage!==void 0&&x.setUsage(m.usage),a.setAttribute(f,x)}const c=e.data.morphAttributes;if(c)for(const f in c){const m=c[f],x=[];for(let g=0,p=m.length;g<p;g++){const v=m[g];let _;if(v.isInterleavedBufferAttribute){const y=i(e.data,v.data);_=new kn(y,v.itemSize,v.offset,v.normalized)}else{const y=cr(v.type,v.array);_=new Ct(y,v.itemSize,v.normalized)}v.name!==void 0&&(_.name=v.name),x.push(_)}a.morphAttributes[f]=x}e.data.morphTargetsRelative&&(a.morphTargetsRelative=!0);const h=e.data.groups||e.data.drawcalls||e.data.offsets;if(h!==void 0)for(let f=0,m=h.length;f!==m;++f){const x=h[f];a.addGroup(x.start,x.count,x.materialIndex)}const d=e.data.boundingSphere;return d!==void 0&&(a.boundingSphere=new qt().fromJSON(d)),e.name&&(a.name=e.name),e.userData&&(a.userData=e.userData),a}}const kc={};class d0 extends In{constructor(e){super(e)}load(e,t,n,i){const s=this,a=this.path===""?mu.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||a;const o=new Fi(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(h){i!==void 0&&i(h),$e("ObjectLoader: Can't parse "+e+".",h.message);return}const u=c.metadata;if(u===void 0||u.type===void 0||u.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),$e("ObjectLoader: Can't load "+e);return}s.parse(c,t)},n,i)}async loadAsync(e,t){const n=this,i=this.path===""?mu.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;const s=new Fi(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const a=await s.loadAsync(e,t);let o;try{o=JSON.parse(a)}catch(c){throw new Error("ObjectLoader: Can't parse "+e+". "+c.message)}const l=o.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(o)}parse(e,t){const n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),s=this.parseGeometries(e.geometries,i),a=this.parseImages(e.images,function(){t!==void 0&&t(c)}),o=this.parseTextures(e.textures,a),l=this.parseMaterials(e.materials,o),c=this.parseObject(e.object,s,l,o,n),u=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,u),this.bindLightTargets(c),t!==void 0){let h=!1;for(const d in a)if(a[d].data instanceof HTMLImageElement){h=!0;break}h===!1&&t(c)}return c}async parseAsync(e){const t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),s=await this.parseImagesAsync(e.images),a=this.parseTextures(e.textures,s),o=this.parseMaterials(e.materials,a),l=this.parseObject(e.object,i,o,a,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}static registerGeometry(e,t){kc[e]=t}parseShapes(e){const t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){const s=new As().fromJSON(e[n]);t[s.uuid]=s}return t}parseSkeletons(e,t){const n={},i={};if(t.traverse(function(s){s.isBone&&(i[s.uuid]=s)}),e!==void 0)for(let s=0,a=e.length;s<a;s++){const o=new zl().fromJSON(e[s],i);n[o.uuid]=o}return n}parseGeometries(e,t){const n={};if(e!==void 0){const i=new zp;for(let s=0,a=e.length;s<a;s++){let o;const l=e[s];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":o=i.parse(l);break;default:l.type in hh?o=hh[l.type].fromJSON(l,t):l.type in kc?o=kc[l.type].fromJSON(l,t):Ce(`ObjectLoader: Unknown geometry type "${l.type}". Use .registerGeometry() before starting the deserialization process.`)}o.uuid=l.uuid,l.name!==void 0&&(o.name=l.name),l.userData!==void 0&&(o.userData=l.userData),n[l.uuid]=o}}return n}parseMaterials(e,t){const n={},i={};if(e!==void 0){const s=new nc;s.setTextures(t);for(let a=0,o=e.length;a<o;a++){const l=e[a];n[l.uuid]===void 0&&(n[l.uuid]=s.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){const t={};if(e!==void 0)for(let n=0;n<e.length;n++){const i=e[n],s=va.parse(i);t[s.uuid]=s}return t}parseImages(e,t){const n=this,i={};let s;function a(l){return n.manager.itemStart(l),s.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function o(l){if(typeof l=="string"){const c=l,u=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return a(u)}else return l.data?{data:cr(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){const l=new ad(t);s=new xa(l),s.setCrossOrigin(this.crossOrigin);for(let c=0,u=e.length;c<u;c++){const h=e[c],d=h.url;if(Array.isArray(d)){const f=[];for(let m=0,x=d.length;m<x;m++){const g=d[m],p=o(g);p!==null&&(p instanceof HTMLImageElement?f.push(p):f.push(new ii(p.data,p.width,p.height)))}i[h.uuid]=new Ji(f)}else{const f=o(h.url);i[h.uuid]=new Ji(f)}}}return i}async parseImagesAsync(e){const t=this,n={};let i;async function s(a){if(typeof a=="string"){const o=a,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(o)?o:t.resourcePath+o;return await i.loadAsync(l)}else return a.data?{data:cr(a.type,a.data),width:a.width,height:a.height}:null}if(e!==void 0&&e.length>0){i=new xa(this.manager),i.setCrossOrigin(this.crossOrigin);for(let a=0,o=e.length;a<o;a++){const l=e[a],c=l.url;if(Array.isArray(c)){const u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h],m=await s(f);m!==null&&(m instanceof HTMLImageElement?u.push(m):u.push(new ii(m.data,m.width,m.height)))}n[l.uuid]=new Ji(u)}else{const u=await s(l.url);n[l.uuid]=new Ji(u)}}}return n}parseTextures(e,t){function n(s,a){return typeof s=="number"?s:(Ce("ObjectLoader.parseTexture: Constant should be in numeric form.",s),a[s])}const i={};if(e!==void 0)for(let s=0,a=e.length;s<a;s++){const o=e[s];o.image===void 0&&Ce('ObjectLoader: No "image" specified for',o.uuid),t[o.image]===void 0&&Ce("ObjectLoader: Undefined image",o.image);const l=t[o.image],c=l.data;let u;Array.isArray(c)?(u=new Ma,c.length===6&&(u.needsUpdate=!0)):(c&&c.data?u=new ii:u=new Nt,c&&(u.needsUpdate=!0)),u.source=l,u.uuid=o.uuid,o.name!==void 0&&(u.name=o.name),o.mapping!==void 0&&(u.mapping=n(o.mapping,h0)),o.channel!==void 0&&(u.channel=o.channel),o.offset!==void 0&&u.offset.fromArray(o.offset),o.repeat!==void 0&&u.repeat.fromArray(o.repeat),o.center!==void 0&&u.center.fromArray(o.center),o.rotation!==void 0&&(u.rotation=o.rotation),o.wrap!==void 0&&(u.wrapS=n(o.wrap[0],xh),u.wrapT=n(o.wrap[1],xh)),o.format!==void 0&&(u.format=o.format),o.internalFormat!==void 0&&(u.internalFormat=o.internalFormat),o.type!==void 0&&(u.type=o.type),o.colorSpace!==void 0&&(u.colorSpace=o.colorSpace),o.minFilter!==void 0&&(u.minFilter=n(o.minFilter,yh)),o.magFilter!==void 0&&(u.magFilter=n(o.magFilter,yh)),o.anisotropy!==void 0&&(u.anisotropy=o.anisotropy),o.flipY!==void 0&&(u.flipY=o.flipY),o.generateMipmaps!==void 0&&(u.generateMipmaps=o.generateMipmaps),o.premultiplyAlpha!==void 0&&(u.premultiplyAlpha=o.premultiplyAlpha),o.unpackAlignment!==void 0&&(u.unpackAlignment=o.unpackAlignment),o.compareFunction!==void 0&&(u.compareFunction=o.compareFunction),o.normalized!==void 0&&(u.normalized=o.normalized),o.userData!==void 0&&(u.userData=o.userData),i[o.uuid]=u}return i}parseObject(e,t,n,i,s){let a;function o(d){return t[d]===void 0&&Ce("ObjectLoader: Undefined geometry",d),t[d]}function l(d){if(d!==void 0){if(Array.isArray(d)){const f=[];for(let m=0,x=d.length;m<x;m++){const g=d[m];n[g]===void 0&&Ce("ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[d]===void 0&&Ce("ObjectLoader: Undefined material",d),n[d]}}function c(d){return i[d]===void 0&&Ce("ObjectLoader: Undefined texture",d),i[d]}let u,h;switch(e.type){case"Scene":a=new Bu,e.background!==void 0&&(Number.isInteger(e.background)?a.background=new Ue(e.background):a.background=c(e.background)),e.environment!==void 0&&(a.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?a.fog=new kl(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(a.fog=new Ol(e.fog.color,e.fog.density)),e.fog.name!==""&&(a.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(a.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(a.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&a.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(a.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&a.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":a=new Kt(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(a.focus=e.focus),e.zoom!==void 0&&(a.zoom=e.zoom),e.filmGauge!==void 0&&(a.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(a.filmOffset=e.filmOffset),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"OrthographicCamera":a=new Ta(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(a.zoom=e.zoom),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"AmbientLight":a=new Op(e.color,e.intensity);break;case"DirectionalLight":a=new Fp(e.color,e.intensity),a.target=e.target||"";break;case"PointLight":a=new Np(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":a=new kp(e.color,e.intensity,e.width,e.height);break;case"SpotLight":a=new Up(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),a.target=e.target||"";break;case"HemisphereLight":a=new Dp(e.color,e.groundColor,e.intensity);break;case"LightProbe":const d=new ld().fromArray(e.sh);a=new Bp(d,e.intensity);break;case"SkinnedMesh":u=o(e.geometry),h=l(e.material),a=new tp(u,h),e.bindMode!==void 0&&(a.bindMode=e.bindMode),e.bindMatrix!==void 0&&a.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(a.skeleton=e.skeleton);break;case"Mesh":u=o(e.geometry),h=l(e.material),a=new At(u,h);break;case"InstancedMesh":u=o(e.geometry),h=l(e.material);const f=e.count,m=e.instanceMatrix,x=e.instanceColor;a=new np(u,h,f),a.instanceMatrix=new mr(new Float32Array(m.array),16),x!==void 0&&(a.instanceColor=new mr(new Float32Array(x.array),x.itemSize));break;case"BatchedMesh":u=o(e.geometry),h=l(e.material),a=new ip(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,h),a.geometry=u,a.perObjectFrustumCulled=e.perObjectFrustumCulled,a.sortObjects=e.sortObjects,a._drawRanges=e.drawRanges,a._reservedRanges=e.reservedRanges,a._geometryInfo=e.geometryInfo.map(g=>{let p=null,v=null;return g.boundingBox!==void 0&&(p=new $t().fromJSON(g.boundingBox)),g.boundingSphere!==void 0&&(v=new qt().fromJSON(g.boundingSphere)),{...g,boundingBox:p,boundingSphere:v}}),a._instanceInfo=e.instanceInfo,a._availableInstanceIds=e._availableInstanceIds,a._availableGeometryIds=e._availableGeometryIds,a._nextIndexStart=e.nextIndexStart,a._nextVertexStart=e.nextVertexStart,a._geometryCount=e.geometryCount,a._maxInstanceCount=e.maxInstanceCount,a._maxVertexCount=e.maxVertexCount,a._maxIndexCount=e.maxIndexCount,a._geometryInitialized=e.geometryInitialized,a._matricesTexture=c(e.matricesTexture.uuid),a._indirectTexture=c(e.indirectTexture.uuid),e.colorsTexture!==void 0&&(a._colorsTexture=c(e.colorsTexture.uuid)),e.boundingSphere!==void 0&&(a.boundingSphere=new qt().fromJSON(e.boundingSphere)),e.boundingBox!==void 0&&(a.boundingBox=new $t().fromJSON(e.boundingBox));break;case"LOD":a=new ep;break;case"Line":a=new ts(o(e.geometry),l(e.material));break;case"LineLoop":a=new sp(o(e.geometry),l(e.material));break;case"LineSegments":a=new Si(o(e.geometry),l(e.material));break;case"PointCloud":case"Points":a=new rp(o(e.geometry),l(e.material));break;case"Sprite":a=new Qf(l(e.material));break;case"Group":a=new ur;break;case"Bone":a=new Hu;break;default:a=new St}if(a.uuid=e.uuid,e.name!==void 0&&(a.name=e.name),e.matrix!==void 0?(a.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(a.matrixAutoUpdate=e.matrixAutoUpdate),a.matrixAutoUpdate&&a.matrix.decompose(a.position,a.quaternion,a.scale)):(e.position!==void 0&&a.position.fromArray(e.position),e.rotation!==void 0&&a.rotation.fromArray(e.rotation),e.quaternion!==void 0&&a.quaternion.fromArray(e.quaternion),e.scale!==void 0&&a.scale.fromArray(e.scale)),e.up!==void 0&&a.up.fromArray(e.up),e.pivot!==void 0&&(a.pivot=new R().fromArray(e.pivot)),e.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),e.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=e.morphTargetInfluences.slice()),e.castShadow!==void 0&&(a.castShadow=e.castShadow),e.receiveShadow!==void 0&&(a.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(a.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(a.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(a.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(a.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&a.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(a.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(a.visible=e.visible),e.frustumCulled!==void 0&&(a.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(a.renderOrder=e.renderOrder),e.static!==void 0&&(a.static=e.static),e.userData!==void 0&&(a.userData=e.userData),e.layers!==void 0&&(a.layers.mask=e.layers),e.children!==void 0){const d=e.children;for(let f=0;f<d.length;f++)a.add(this.parseObject(d[f],t,n,i,s))}if(e.animations!==void 0){const d=e.animations;for(let f=0;f<d.length;f++){const m=d[f];a.animations.push(s[m])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(a.autoUpdate=e.autoUpdate);const d=e.levels;for(let f=0;f<d.length;f++){const m=d[f],x=a.getObjectByProperty("uuid",m.object);x!==void 0&&a.addLevel(x,m.distance,m.hysteresis)}}return a}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=t[n.skeleton];i===void 0?Ce("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){const n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new St}})}}const h0={UVMapping:wl,CubeReflectionMapping:yi,CubeRefractionMapping:ji,EquirectangularReflectionMapping:Xr,EquirectangularRefractionMapping:$r,CubeUVReflectionMapping:xr},xh={RepeatWrapping:na,ClampToEdgeWrapping:Rn,MirroredRepeatWrapping:ia},yh={NearestFilter:Vt,NearestMipmapNearestFilter:Ru,NearestMipmapLinearFilter:lr,LinearFilter:Dt,LinearMipmapNearestFilter:qr,LinearMipmapLinearFilter:_i},Bc=new WeakMap;class f0 extends In{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ce("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ce("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=vi.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{Bc.has(a)===!0?(i&&i(Bc.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(c),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){vi.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e)}).catch(function(c){i&&i(c),Bc.set(l,c),vi.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});vi.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}let ho;class ud{static getContext(){return ho===void 0&&(ho=new(window.AudioContext||window.webkitAudioContext)),ho}static setContext(e){ho=e}}class p0 extends In{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new Fi(this.manager);a.setResponseType("arraybuffer"),a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){try{const c=l.slice(0),u=ud.getContext(),h=e+"#decode";s.manager.itemStart(h),u.decodeAudioData(c,function(d){t(d),s.manager.itemEnd(h)}).catch(function(d){o(d),s.manager.itemEnd(h)})}catch(c){o(c)}},n,i);function o(l){i?i(l):$e(l),s.manager.itemError(e)}}}const bh=new rt,Mh=new rt,fs=new rt;class m0{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Kt,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Kt,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,fs.copy(e.projectionMatrix);const i=t.eyeSep/2,s=i*t.near/t.focus,a=t.near*Math.tan(Ts*t.fov*.5)/t.zoom;let o,l;Mh.elements[12]=-i,bh.elements[12]=i,o=-a*t.aspect+s,l=a*t.aspect+s,fs.elements[0]=2*t.near/(l-o),fs.elements[8]=(l+o)/(l-o),this.cameraL.projectionMatrix.copy(fs),o=-a*t.aspect-s,l=a*t.aspect-s,fs.elements[0]=2*t.near/(l-o),fs.elements[8]=(l+o)/(l-o),this.cameraR.projectionMatrix.copy(fs)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(Mh),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(bh)}}const tr=-90,nr=1;class Vp extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Kt(tr,nr,e,t);i.layers=this.layers,this.add(i);const s=new Kt(tr,nr,e,t);s.layers=this.layers,this.add(s);const a=new Kt(tr,nr,e,t);a.layers=this.layers,this.add(a);const o=new Kt(tr,nr,e,t);o.layers=this.layers,this.add(o);const l=new Kt(tr,nr,e,t);l.layers=this.layers,this.add(l);const c=new Kt(tr,nr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===On)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Is)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Gp extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Hp{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=g0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function g0(){this._document.hidden===!1&&this.reset()}const ps=new R,zc=new hn,_0=new R,ms=new R,gs=new R;class v0 extends St{constructor(){super(),this.type="AudioListener",this.context=ud.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new Hp}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e),this._timer.update();const t=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(ps,zc,_0),ms.set(0,0,-1).applyQuaternion(zc),gs.set(0,1,0).applyQuaternion(zc),t.positionX){const n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(ps.x,n),t.positionY.linearRampToValueAtTime(ps.y,n),t.positionZ.linearRampToValueAtTime(ps.z,n),t.forwardX.linearRampToValueAtTime(ms.x,n),t.forwardY.linearRampToValueAtTime(ms.y,n),t.forwardZ.linearRampToValueAtTime(ms.z,n),t.upX.linearRampToValueAtTime(gs.x,n),t.upY.linearRampToValueAtTime(gs.y,n),t.upZ.linearRampToValueAtTime(gs.z,n)}else t.setPosition(ps.x,ps.y,ps.z),t.setOrientation(ms.x,ms.y,ms.z,gs.x,gs.y,gs.z)}}class Wp extends St{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){Ce("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){Ce("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){Ce("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){Ce("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){Ce("Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(Ce("Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){Ce("Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}copy(e,t){return super.copy(e,t),e.sourceType!=="buffer"?(Ce("Audio: Audio source type cannot be copied."),this):(this.autoplay=e.autoplay,this.buffer=e.buffer,this.detune=e.detune,this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.offset=e.offset,this.duration=e.duration,this.playbackRate=e.playbackRate,this.hasPlaybackControl=e.hasPlaybackControl,this.sourceType=e.sourceType,this.filters=e.filters.slice(),this)}clone(e){return new this.constructor(this.listener).copy(this,e)}}const _s=new R,Sh=new hn,x0=new R,vs=new R;class y0 extends Wp{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(_s,Sh,x0),vs.set(0,0,1).applyQuaternion(Sh);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(_s.x,n),t.positionY.linearRampToValueAtTime(_s.y,n),t.positionZ.linearRampToValueAtTime(_s.z,n),t.orientationX.linearRampToValueAtTime(vs.x,n),t.orientationY.linearRampToValueAtTime(vs.y,n),t.orientationZ.linearRampToValueAtTime(vs.z,n)}else t.setPosition(_s.x,_s.y,_s.z),t.setOrientation(vs.x,vs.y,vs.z)}}class b0{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}}class Xp{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,a;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,a=i;s!==a;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){hn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const a=this._workIndex*s;hn.multiplyQuaternionsFlat(e,a,e,t,e,n),hn.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,s){const a=1-i;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,s){for(let a=0;a!==s;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const dd="\\[\\]\\.:\\/",M0=new RegExp("["+dd+"]","g"),hd="[^"+dd+"]",S0="[^"+dd.replace("\\.","")+"]",w0=/((?:WC+[\/:])*)/.source.replace("WC",hd),E0=/(WCOD+)?/.source.replace("WCOD",S0),T0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",hd),A0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",hd),C0=new RegExp("^"+w0+E0+T0+A0+"$"),R0=["material","materials","bones","map"];class I0{constructor(e,t,n){const i=n||Mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Mt{constructor(e,t,n){this.path=t,this.parsedPath=n||Mt.parseTrackName(t),this.node=Mt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Mt.Composite(e,t,n):new Mt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(M0,"")}static parseTrackName(e){const t=C0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);R0.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Mt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ce("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){$e("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){$e("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){$e("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){$e("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){$e("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){$e("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){$e("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;$e("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){$e("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){$e("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Mt.Composite=I0;Mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Mt.prototype.GetterByBindingType=[Mt.prototype._getValue_direct,Mt.prototype._getValue_array,Mt.prototype._getValue_arrayElement,Mt.prototype._getValue_toArray];Mt.prototype.SetterByBindingTypeAndVersioning=[[Mt.prototype._setValue_direct,Mt.prototype._setValue_direct_setNeedsUpdate,Mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_array,Mt.prototype._setValue_array_setNeedsUpdate,Mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_arrayElement,Mt.prototype._setValue_arrayElement_setNeedsUpdate,Mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_fromArray,Mt.prototype._setValue_fromArray_setNeedsUpdate,Mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class P0{constructor(){this.isAnimationObjectGroup=!0,this.uuid=Bn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,a=s.length;let o,l=e.length,c=this.nCachedObjects_;for(let u=0,h=arguments.length;u!==h;++u){const d=arguments[u],f=d.uuid;let m=t[f];if(m===void 0){m=l++,t[f]=m,e.push(d);for(let x=0,g=a;x!==g;++x)s[x].push(new Mt(d,n[x],i[x]))}else if(m<c){o=e[m];const x=--c,g=e[x];t[g.uuid]=m,e[m]=g,t[f]=x,e[x]=d;for(let p=0,v=a;p!==v;++p){const _=s[p],y=_[x];let E=_[m];_[m]=y,E===void 0&&(E=new Mt(d,n[p],i[p])),_[x]=E}}else e[m]!==o&&$e("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_;for(let a=0,o=arguments.length;a!==o;++a){const l=arguments[a],c=l.uuid,u=t[c];if(u!==void 0&&u>=s){const h=s++,d=e[h];t[d.uuid]=u,e[u]=d,t[c]=h,e[h]=l;for(let f=0,m=i;f!==m;++f){const x=n[f],g=x[h],p=x[u];x[u]=g,x[h]=p}}}this.nCachedObjects_=s}uncache(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_,a=e.length;for(let o=0,l=arguments.length;o!==l;++o){const c=arguments[o],u=c.uuid,h=t[u];if(h!==void 0)if(delete t[u],h<s){const d=--s,f=e[d],m=--a,x=e[m];t[f.uuid]=h,e[h]=f,t[x.uuid]=d,e[d]=x,e.pop();for(let g=0,p=i;g!==p;++g){const v=n[g],_=v[d],y=v[m];v[h]=_,v[d]=y,v.pop()}}else{const d=--a,f=e[d];d>0&&(t[f.uuid]=h),e[h]=f,e.pop();for(let m=0,x=i;m!==x;++m){const g=n[m];g[h]=g[d],g.pop()}}}this.nCachedObjects_=s}subscribe_(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const s=this._bindings;if(i!==void 0)return s[i];const a=this._paths,o=this._parsedPaths,l=this._objects,c=l.length,u=this.nCachedObjects_,h=new Array(c);i=s.length,n[e]=i,a.push(e),o.push(t),s.push(h);for(let d=u,f=l.length;d!==f;++d){const m=l[d];h[d]=new Mt(m,e,t)}return h}unsubscribe_(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,s=this._parsedPaths,a=this._bindings,o=a.length-1,l=a[o],c=e[o];t[c]=n,a[n]=l,a.pop(),s[n]=s[o],s.pop(),i[n]=i[o],i.pop()}}}class $p{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,a=s.length,o=new Array(a),l={endingStart:bs,endingEnd:bs};for(let c=0;c!==a;++c){const u=s[c].createInterpolant(null);o[c]=u,u.settings&&Object.assign(l,u.settings),u.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Of,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,s=e._clip.duration,a=s/i,o=i/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Fu:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulateAdditive(o);break;case Pl:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const a=n===kf;if(e===0)return s===-1?i:a&&(s&1)===1?t-i:i;if(n===Ff){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=s,this.time=i;if(a&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Ms,i.endingEnd=Ms):(e?i.endingStart=this.zeroSlopeAtStart?Ms:bs:i.endingStart=oa,t?i.endingEnd=this.zeroSlopeAtEnd?Ms:bs:i.endingEnd=oa)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}}const L0=new Float32Array(1);class D0 extends ri{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==s;++h){const d=i[h],f=d.name;let m=u[f];if(m!==void 0)++m.referenceCount,a[h]=m;else{if(m=a[h],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,f));continue}const x=t&&t._propertyBindings[h].binding.parsedPath;m=new Xp(Mt.create(n,f,x),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,f),a[h]=m}o[h].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;const h=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new sd(new Float32Array(2),new Float32Array(2),1,L0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let a=typeof e=="string"?va.findByName(i,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Pl),l!==void 0){const h=l.actionByRoot[s];if(h!==void 0&&h.blendMode===n)return h;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const u=new $p(this,a,t,n);return this._bindAction(u,c),this._addInactiveAction(u,o,s),u}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?va.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class U0 extends ku{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isRenderTarget3D=!0,this.depth=n,this.texture=new Nl(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class fd{constructor(e){this.value=e}clone(){return new fd(this.value.clone===void 0?this.value:this.value.clone())}}let N0=0;class F0 extends ri{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:N0++}),this.name="",this.usage=ua,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){const s=Array.isArray(t[n])?t[n]:[t[n]];for(let a=0;a<s.length;a++)this.uniforms.push(s[a].clone())}return this}clone(){return new this.constructor().copy(this)}}class bl extends Bl{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class O0{constructor(e,t,n,i,s,a=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=s,this.normalized=a,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}const wh=new rt;class k0{constructor(e,t,n=0,i=1/0){this.ray=new yr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Fl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):$e("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return wh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(wh),this}intersectObject(e,t=!0,n=[]){return gu(e,this,n,t),n.sort(Eh),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)gu(e[i],this,n,t);return n.sort(Eh),n}}function Eh(r,e){return r.distance-e.distance}function gu(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let a=0,o=s.length;a<o;a++)gu(s[a],e,t,!0)}}class B0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Ce("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class z0{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=st(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(st(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class V0{constructor(e=1,t=0,n=0){this.radius=e,this.theta=t,this.y=n}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}}const yd=class yd{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};yd.prototype.isMatrix2=!0;let _u=yd;const Th=new fe;class G0{constructor(e=new fe(1/0,1/0),t=new fe(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Th.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Th).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ah=new R,fo=new R,ir=new R,sr=new R,Vc=new R,H0=new R,W0=new R;class qp{constructor(e=new R,t=new R){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Ah.subVectors(e,this.start),fo.subVectors(this.end,this.start);const n=fo.dot(fo);if(n===0)return 0;let s=fo.dot(Ah)/n;return t&&(s=st(s,0,1)),s}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=H0,n=W0){const i=10000000000000001e-32;let s,a;const o=this.start,l=e.start,c=this.end,u=e.end;ir.subVectors(c,o),sr.subVectors(u,l),Vc.subVectors(o,l);const h=ir.dot(ir),d=sr.dot(sr),f=sr.dot(Vc);if(h<=i&&d<=i)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(h<=i)s=0,a=f/d,a=st(a,0,1);else{const m=ir.dot(Vc);if(d<=i)a=0,s=st(-m/h,0,1);else{const x=ir.dot(sr),g=h*d-x*x;g!==0?s=st((x*f-m*d)/g,0,1):s=0,a=(x*s+f)/d,a<0?(a=0,s=st(-m/h,0,1)):a>1&&(a=1,s=st((x-m)/h,0,1))}}return t.copy(o).addScaledVector(ir,s),n.copy(l).addScaledVector(sr,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const Ch=new R;class X0 extends St{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new lt,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let a=0,o=1,l=32;a<l;a++,o++){const c=a/l*Math.PI*2,u=o/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(u),Math.sin(u),1)}n.setAttribute("position",new ke(i,3));const s=new bn({fog:!1,toneMapped:!1});this.cone=new Si(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),Ch.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Ch),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const $i=new R,po=new rt,Gc=new rt;class $0 extends Si{constructor(e){const t=Yp(e),n=new lt,i=[],s=[];for(let c=0;c<t.length;c++){const u=t[c];u.parent&&u.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(0,0,0),s.push(0,0,0))}n.setAttribute("position",new ke(i,3)),n.setAttribute("color",new ke(s,3));const a=new bn({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,a),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1;const o=new Ue(255),l=new Ue(65280);this.setColors(o,l)}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");Gc.copy(this.root.matrixWorld).invert();for(let s=0,a=0;s<t.length;s++){const o=t[s];o.parent&&o.parent.isBone&&(po.multiplyMatrices(Gc,o.matrixWorld),$i.setFromMatrixPosition(po),i.setXYZ(a,$i.x,$i.y,$i.z),po.multiplyMatrices(Gc,o.parent.matrixWorld),$i.setFromMatrixPosition(po),i.setXYZ(a+1,$i.x,$i.y,$i.z),a+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}setColors(e,t){const i=this.geometry.getAttribute("color");for(let s=0;s<i.count;s+=2)i.setXYZ(s,e.r,e.g,e.b),i.setXYZ(s+1,t.r,t.g,t.b);return i.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}function Yp(r){const e=[];r.isBone===!0&&e.push(r);for(let t=0;t<r.children.length;t++)e.push(...Yp(r.children[t]));return e}class q0 extends At{constructor(e,t,n){const i=new ei(t,4,2),s=new nn({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const Y0=new R,Rh=new Ue,Ih=new Ue;class Z0 extends St{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new Sr(t);i.rotateY(Math.PI*.5),this.material=new nn({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const s=i.getAttribute("position"),a=new Float32Array(s.count*3);i.setAttribute("color",new Ct(a,3)),this.add(new At(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");Rh.copy(this.light.color),Ih.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){const s=n<i/2?Rh:Ih;t.setXYZ(n,s.r,s.g,s.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(Y0.setFromMatrixPosition(this.light.matrixWorld).negate())}}class J0 extends Si{constructor(e=10,t=10,n=4473924,i=8947848){n=new Ue(n),i=new Ue(i);const s=t/2,a=e/t,o=e/2,l=[],c=[];for(let d=0,f=0,m=-o;d<=t;d++,m+=a){l.push(-o,0,m,o,0,m),l.push(m,0,-o,m,0,o);const x=d===s?n:i;x.toArray(c,f),f+=3,x.toArray(c,f),f+=3,x.toArray(c,f),f+=3,x.toArray(c,f),f+=3}const u=new lt;u.setAttribute("position",new ke(l,3)),u.setAttribute("color",new ke(c,3));const h=new bn({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class K0 extends Si{constructor(e=10,t=16,n=8,i=64,s=4473924,a=8947848){s=new Ue(s),a=new Ue(a);const o=[],l=[];if(t>1)for(let h=0;h<t;h++){const d=h/t*(Math.PI*2),f=Math.sin(d)*e,m=Math.cos(d)*e;o.push(0,0,0),o.push(f,0,m);const x=h&1?s:a;l.push(x.r,x.g,x.b),l.push(x.r,x.g,x.b)}for(let h=0;h<n;h++){const d=h&1?s:a,f=e-e/n*h;for(let m=0;m<i;m++){let x=m/i*(Math.PI*2),g=Math.sin(x)*f,p=Math.cos(x)*f;o.push(g,0,p),l.push(d.r,d.g,d.b),x=(m+1)/i*(Math.PI*2),g=Math.sin(x)*f,p=Math.cos(x)*f,o.push(g,0,p),l.push(d.r,d.g,d.b)}}const c=new lt;c.setAttribute("position",new ke(o,3)),c.setAttribute("color",new ke(l,3));const u=new bn({vertexColors:!0,toneMapped:!1});super(c,u),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Ph=new R,mo=new R,Lh=new R;class j0 extends St{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new lt;i.setAttribute("position",new ke([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const s=new bn({fog:!1,toneMapped:!1});this.lightPlane=new ts(i,s),this.add(this.lightPlane),i=new lt,i.setAttribute("position",new ke([0,0,0,0,0,1],3)),this.targetLine=new ts(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Ph.setFromMatrixPosition(this.light.matrixWorld),mo.setFromMatrixPosition(this.light.target.matrixWorld),Lh.subVectors(mo,Ph),this.lightPlane.lookAt(mo),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(mo),this.targetLine.scale.z=Lh.length()}}const go=new R,Ot=new tc;class Q0 extends Si{constructor(e){const t=new lt,n=new bn({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(m,x){l(m),l(x)}function l(m){i.push(0,0,0),s.push(0,0,0),a[m]===void 0&&(a[m]=[]),a[m].push(i.length/3-1)}t.setAttribute("position",new ke(i,3)),t.setAttribute("color",new ke(s,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();const c=new Ue(16755200),u=new Ue(16711680),h=new Ue(43775),d=new Ue(16777215),f=new Ue(3355443);this.setColors(c,u,h,d,f)}setColors(e,t,n,i,s){const o=this.geometry.getAttribute("color");return o.setXYZ(0,e.r,e.g,e.b),o.setXYZ(1,e.r,e.g,e.b),o.setXYZ(2,e.r,e.g,e.b),o.setXYZ(3,e.r,e.g,e.b),o.setXYZ(4,e.r,e.g,e.b),o.setXYZ(5,e.r,e.g,e.b),o.setXYZ(6,e.r,e.g,e.b),o.setXYZ(7,e.r,e.g,e.b),o.setXYZ(8,e.r,e.g,e.b),o.setXYZ(9,e.r,e.g,e.b),o.setXYZ(10,e.r,e.g,e.b),o.setXYZ(11,e.r,e.g,e.b),o.setXYZ(12,e.r,e.g,e.b),o.setXYZ(13,e.r,e.g,e.b),o.setXYZ(14,e.r,e.g,e.b),o.setXYZ(15,e.r,e.g,e.b),o.setXYZ(16,e.r,e.g,e.b),o.setXYZ(17,e.r,e.g,e.b),o.setXYZ(18,e.r,e.g,e.b),o.setXYZ(19,e.r,e.g,e.b),o.setXYZ(20,e.r,e.g,e.b),o.setXYZ(21,e.r,e.g,e.b),o.setXYZ(22,e.r,e.g,e.b),o.setXYZ(23,e.r,e.g,e.b),o.setXYZ(24,t.r,t.g,t.b),o.setXYZ(25,t.r,t.g,t.b),o.setXYZ(26,t.r,t.g,t.b),o.setXYZ(27,t.r,t.g,t.b),o.setXYZ(28,t.r,t.g,t.b),o.setXYZ(29,t.r,t.g,t.b),o.setXYZ(30,t.r,t.g,t.b),o.setXYZ(31,t.r,t.g,t.b),o.setXYZ(32,n.r,n.g,n.b),o.setXYZ(33,n.r,n.g,n.b),o.setXYZ(34,n.r,n.g,n.b),o.setXYZ(35,n.r,n.g,n.b),o.setXYZ(36,n.r,n.g,n.b),o.setXYZ(37,n.r,n.g,n.b),o.setXYZ(38,i.r,i.g,i.b),o.setXYZ(39,i.r,i.g,i.b),o.setXYZ(40,s.r,s.g,s.b),o.setXYZ(41,s.r,s.g,s.b),o.setXYZ(42,s.r,s.g,s.b),o.setXYZ(43,s.r,s.g,s.b),o.setXYZ(44,s.r,s.g,s.b),o.setXYZ(45,s.r,s.g,s.b),o.setXYZ(46,s.r,s.g,s.b),o.setXYZ(47,s.r,s.g,s.b),o.setXYZ(48,s.r,s.g,s.b),o.setXYZ(49,s.r,s.g,s.b),o.needsUpdate=!0,this}update(){const e=this.geometry,t=this.pointMap,n=1,i=1;let s,a;if(Ot.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)s=1,a=0;else if(this.camera.coordinateSystem===On)s=-1,a=1;else if(this.camera.coordinateSystem===Is)s=0,a=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);zt("c",t,e,Ot,0,0,s),zt("t",t,e,Ot,0,0,a),zt("n1",t,e,Ot,-n,-i,s),zt("n2",t,e,Ot,n,-i,s),zt("n3",t,e,Ot,-n,i,s),zt("n4",t,e,Ot,n,i,s),zt("f1",t,e,Ot,-n,-i,a),zt("f2",t,e,Ot,n,-i,a),zt("f3",t,e,Ot,-n,i,a),zt("f4",t,e,Ot,n,i,a),zt("u1",t,e,Ot,n*.7,i*1.1,s),zt("u2",t,e,Ot,-n*.7,i*1.1,s),zt("u3",t,e,Ot,0,i*2,s),zt("cf1",t,e,Ot,-n,0,a),zt("cf2",t,e,Ot,n,0,a),zt("cf3",t,e,Ot,0,-i,a),zt("cf4",t,e,Ot,0,i,a),zt("cn1",t,e,Ot,-n,0,s),zt("cn2",t,e,Ot,n,0,s),zt("cn3",t,e,Ot,0,-i,s),zt("cn4",t,e,Ot,0,i,s),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function zt(r,e,t,n,i,s,a){go.set(i,s,a).unproject(n);const o=e[r];if(o!==void 0){const l=t.getAttribute("position");for(let c=0,u=o.length;c<u;c++)l.setXYZ(o[c],go.x,go.y,go.z)}}const _o=new $t;class ev extends Si{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),s=new lt;s.setIndex(new Ct(n,1)),s.setAttribute("position",new Ct(i,3)),super(s,new bn({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&_o.setFromObject(this.object),_o.isEmpty())return;const e=_o.min,t=_o.max,n=this.geometry.attributes.position,i=n.array;i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=e.x,i[4]=t.y,i[5]=t.z,i[6]=e.x,i[7]=e.y,i[8]=t.z,i[9]=t.x,i[10]=e.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=e.z,i[15]=e.x,i[16]=t.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=t.x,i[22]=e.y,i[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class tv extends Si{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new lt;s.setIndex(new Ct(n,1)),s.setAttribute("position",new ke(i,3)),super(s,new bn({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class nv extends ts{constructor(e,t=1,n=16776960){const i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],a=new lt;a.setAttribute("position",new ke(s,3)),a.computeBoundingSphere(),super(a,new bn({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const o=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new lt;l.setAttribute("position",new ke(o,3)),l.computeBoundingSphere(),this.add(new At(l,new nn({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Dh=new R;let vo,Hc;class iv extends St{constructor(e=new R(0,0,1),t=new R(0,0,0),n=1,i=16776960,s=n*.2,a=s*.2){super(),this.type="ArrowHelper",vo===void 0&&(vo=new lt,vo.setAttribute("position",new ke([0,0,0,0,1,0],3)),Hc=new Mr(.5,1,5,1),Hc.translate(0,-.5,0)),this.position.copy(t),this.line=new ts(vo,new bn({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new At(Hc,new nn({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,s,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Dh.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Dh,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class sv extends Si{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new lt;i.setAttribute("position",new ke(t,3)),i.setAttribute("color",new ke(n,3));const s=new bn({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){const i=new Ue,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class rv{constructor(){this.type="ShapePath",this.color=new Ue,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new yl,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,s,a){return this.currentPath.bezierCurveTo(e,t,n,i,s,a),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(p){const v=[];for(let _=0,y=p.length;_<y;_++){const E=p[_],S=new As;S.curves=E.curves,v.push(S)}return v}function n(p,v){const _=v.length;let y=!1;for(let E=_-1,S=0;S<_;E=S++){let C=v[E],b=v[S],w=b.x-C.x,P=b.y-C.y;if(Math.abs(P)>Number.EPSILON){if(P<0&&(C=v[S],w=-w,b=v[E],P=-P),p.y<C.y||p.y>b.y)continue;if(p.y===C.y){if(p.x===C.x)return!0}else{const L=P*(p.x-C.x)-w*(p.y-C.y);if(L===0)return!0;if(L<0)continue;y=!y}}else{if(p.y!==C.y)continue;if(b.x<=p.x&&p.x<=C.x||C.x<=p.x&&p.x<=b.x)return!0}}return y}const i=ti.isClockWise,s=this.subPaths;if(s.length===0)return[];let a,o,l;const c=[];if(s.length===1)return o=s[0],l=new As,l.curves=o.curves,c.push(l),c;let u=!i(s[0].getPoints());u=e?!u:u;const h=[],d=[];let f=[],m=0,x;d[m]=void 0,f[m]=[];for(let p=0,v=s.length;p<v;p++)o=s[p],x=o.getPoints(),a=i(x),a=e?!a:a,a?(!u&&d[m]&&m++,d[m]={s:new As,p:x},d[m].s.curves=o.curves,u&&m++,f[m]=[]):f[m].push({h:o,p:x[0]});if(!d[0])return t(s);if(d.length>1){let p=!1,v=0;for(let _=0,y=d.length;_<y;_++)h[_]=[];for(let _=0,y=d.length;_<y;_++){const E=f[_];for(let S=0;S<E.length;S++){const C=E[S];let b=!0;for(let w=0;w<d.length;w++)n(C.p,d[w].p)&&(_!==w&&v++,b?(b=!1,h[w].push(C)):p=!0);b&&h[_].push(C)}}v>0&&p===!1&&(f=h)}let g;for(let p=0,v=d.length;p<v;p++){l=d[p].s,c.push(l),g=f[p];for(let _=0,y=g.length;_<y;_++)l.holes.push(g[_].h)}return c}}class av extends ri{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ce("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function ov(r,e){const t=r.image&&r.image.width?r.image.width/r.image.height:1;return t>e?(r.repeat.x=1,r.repeat.y=t/e,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2):(r.repeat.x=e/t,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0),r}function lv(r,e){const t=r.image&&r.image.width?r.image.width/r.image.height:1;return t>e?(r.repeat.x=e/t,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0):(r.repeat.x=1,r.repeat.y=t/e,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2),r}function cv(r){return r.repeat.x=1,r.repeat.y=1,r.offset.x=0,r.offset.y=0,r}function vu(r,e,t,n){const i=uv(n);switch(t){case Uu:return r*e;case Cl:return r*e/i.components*i.byteLength;case ba:return r*e/i.components*i.byteLength;case Qi:return r*e*2/i.components*i.byteLength;case Rl:return r*e*2/i.components*i.byteLength;case Nu:return r*e*3/i.components*i.byteLength;case xn:return r*e*4/i.components*i.byteLength;case Il:return r*e*4/i.components*i.byteLength;case Yr:case Zr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Jr:case Kr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Bo:case Vo:return Math.max(r,16)*Math.max(e,8)/4;case ko:case zo:return Math.max(r,8)*Math.max(e,8)/2;case Go:case Ho:case Xo:case $o:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Wo:case sa:case qo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Yo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Zo:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Jo:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Ko:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case jo:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Qo:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case el:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case tl:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case nl:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case il:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case sl:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case rl:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case al:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case ol:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case ll:case cl:case ul:return Math.ceil(r/4)*Math.ceil(e/4)*16;case dl:case hl:return Math.ceil(r/4)*Math.ceil(e/4)*8;case ra:case fl:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function uv(r){switch(r){case En:case Iu:return{byteLength:1,components:1};case hr:case Pu:case bi:return{byteLength:2,components:1};case Tl:case Al:return{byteLength:2,components:4};case Wn:case El:case vn:return{byteLength:4,components:1};case Lu:case Du:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}class dv{static contain(e,t){return ov(e,t)}static cover(e,t){return lv(e,t)}static fill(e){return cv(e)}static getByteLength(e,t,n,i){return vu(e,t,n,i)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sl}}));typeof window<"u"&&(window.__THREE__?Ce("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sl);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Zp(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function hv(r){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const u=l.array,h=l.updateRanges;if(r.bindBuffer(c,o),h.length===0)r.bufferSubData(c,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){const m=h[d],x=h[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++d,h[d]=x)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){const x=h[f];r.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var fv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pv=`#ifdef USE_ALPHAHASH
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
#endif`,mv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_v=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xv=`#ifdef USE_AOMAP
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
#endif`,yv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bv=`#ifdef USE_BATCHING
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
#endif`,Mv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ev=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Tv=`#ifdef USE_IRIDESCENCE
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
#endif`,Av=`#ifdef USE_BUMPMAP
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
#endif`,Cv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Rv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Iv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Pv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Dv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Uv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Nv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Fv=`#define PI 3.141592653589793
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
} // validated`,Ov=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,kv=`vec3 transformedNormal = objectNormal;
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
#endif`,Bv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xv=`#ifdef USE_ENVMAP
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
#endif`,$v=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,qv=`#ifdef USE_ENVMAP
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
#endif`,Yv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zv=`#ifdef USE_ENVMAP
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
#endif`,Jv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ex=`#ifdef USE_GRADIENTMAP
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
}`,tx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ix=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sx=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,rx=`#ifdef USE_ENVMAP
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
#endif`,ax=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ox=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ux=`PhysicalMaterial material;
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
#endif`,dx=`uniform sampler2D dfgLUT;
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
}`,hx=`
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
#endif`,fx=`#if defined( RE_IndirectDiffuse )
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
#endif`,px=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mx=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,gx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_x=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Sx=`#if defined( USE_POINTS_UV )
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
#endif`,wx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ex=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ax=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rx=`#ifdef USE_MORPHTARGETS
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
#endif`,Ix=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Px=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Lx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Dx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ux=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Fx=`#ifdef USE_NORMALMAP
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
#endif`,Ox=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Hx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$x=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,jx=`float getShadowMask() {
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
}`,Qx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ey=`#ifdef USE_SKINNING
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
#endif`,ty=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ny=`#ifdef USE_SKINNING
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
#endif`,iy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ry=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ay=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,oy=`#ifdef USE_TRANSMISSION
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
#endif`,ly=`#ifdef USE_TRANSMISSION
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
#endif`,cy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const fy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,py=`uniform sampler2D t2D;
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
}`,my=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_y=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xy=`#include <common>
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
}`,yy=`#if DEPTH_PACKING == 3200
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
}`,by=`#define DISTANCE
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
}`,My=`#define DISTANCE
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
}`,Sy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ey=`uniform float scale;
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
}`,Ty=`uniform vec3 diffuse;
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
}`,Ay=`#include <common>
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
}`,Cy=`uniform vec3 diffuse;
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
}`,Ry=`#define LAMBERT
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
}`,Iy=`#define LAMBERT
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
}`,Py=`#define MATCAP
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
}`,Ly=`#define MATCAP
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
}`,Dy=`#define NORMAL
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
}`,Uy=`#define NORMAL
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
}`,Ny=`#define PHONG
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
}`,Fy=`#define PHONG
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
}`,Oy=`#define STANDARD
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
}`,ky=`#define STANDARD
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
}`,By=`#define TOON
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
}`,zy=`#define TOON
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
}`,Vy=`uniform float size;
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
}`,Gy=`uniform vec3 diffuse;
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
}`,Hy=`#include <common>
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
}`,Wy=`uniform vec3 color;
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
}`,Xy=`uniform float rotation;
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
}`,$y=`uniform vec3 diffuse;
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
}`,ft={alphahash_fragment:fv,alphahash_pars_fragment:pv,alphamap_fragment:mv,alphamap_pars_fragment:gv,alphatest_fragment:_v,alphatest_pars_fragment:vv,aomap_fragment:xv,aomap_pars_fragment:yv,batching_pars_vertex:bv,batching_vertex:Mv,begin_vertex:Sv,beginnormal_vertex:wv,bsdfs:Ev,iridescence_fragment:Tv,bumpmap_pars_fragment:Av,clipping_planes_fragment:Cv,clipping_planes_pars_fragment:Rv,clipping_planes_pars_vertex:Iv,clipping_planes_vertex:Pv,color_fragment:Lv,color_pars_fragment:Dv,color_pars_vertex:Uv,color_vertex:Nv,common:Fv,cube_uv_reflection_fragment:Ov,defaultnormal_vertex:kv,displacementmap_pars_vertex:Bv,displacementmap_vertex:zv,emissivemap_fragment:Vv,emissivemap_pars_fragment:Gv,colorspace_fragment:Hv,colorspace_pars_fragment:Wv,envmap_fragment:Xv,envmap_common_pars_fragment:$v,envmap_pars_fragment:qv,envmap_pars_vertex:Yv,envmap_physical_pars_fragment:rx,envmap_vertex:Zv,fog_vertex:Jv,fog_pars_vertex:Kv,fog_fragment:jv,fog_pars_fragment:Qv,gradientmap_pars_fragment:ex,lightmap_pars_fragment:tx,lights_lambert_fragment:nx,lights_lambert_pars_fragment:ix,lights_pars_begin:sx,lights_toon_fragment:ax,lights_toon_pars_fragment:ox,lights_phong_fragment:lx,lights_phong_pars_fragment:cx,lights_physical_fragment:ux,lights_physical_pars_fragment:dx,lights_fragment_begin:hx,lights_fragment_maps:fx,lights_fragment_end:px,lightprobes_pars_fragment:mx,logdepthbuf_fragment:gx,logdepthbuf_pars_fragment:_x,logdepthbuf_pars_vertex:vx,logdepthbuf_vertex:xx,map_fragment:yx,map_pars_fragment:bx,map_particle_fragment:Mx,map_particle_pars_fragment:Sx,metalnessmap_fragment:wx,metalnessmap_pars_fragment:Ex,morphinstance_vertex:Tx,morphcolor_vertex:Ax,morphnormal_vertex:Cx,morphtarget_pars_vertex:Rx,morphtarget_vertex:Ix,normal_fragment_begin:Px,normal_fragment_maps:Lx,normal_pars_fragment:Dx,normal_pars_vertex:Ux,normal_vertex:Nx,normalmap_pars_fragment:Fx,clearcoat_normal_fragment_begin:Ox,clearcoat_normal_fragment_maps:kx,clearcoat_pars_fragment:Bx,iridescence_pars_fragment:zx,opaque_fragment:Vx,packing:Gx,premultiplied_alpha_fragment:Hx,project_vertex:Wx,dithering_fragment:Xx,dithering_pars_fragment:$x,roughnessmap_fragment:qx,roughnessmap_pars_fragment:Yx,shadowmap_pars_fragment:Zx,shadowmap_pars_vertex:Jx,shadowmap_vertex:Kx,shadowmask_pars_fragment:jx,skinbase_vertex:Qx,skinning_pars_vertex:ey,skinning_vertex:ty,skinnormal_vertex:ny,specularmap_fragment:iy,specularmap_pars_fragment:sy,tonemapping_fragment:ry,tonemapping_pars_fragment:ay,transmission_fragment:oy,transmission_pars_fragment:ly,uv_pars_fragment:cy,uv_pars_vertex:uy,uv_vertex:dy,worldpos_vertex:hy,background_vert:fy,background_frag:py,backgroundCube_vert:my,backgroundCube_frag:gy,cube_vert:_y,cube_frag:vy,depth_vert:xy,depth_frag:yy,distance_vert:by,distance_frag:My,equirect_vert:Sy,equirect_frag:wy,linedashed_vert:Ey,linedashed_frag:Ty,meshbasic_vert:Ay,meshbasic_frag:Cy,meshlambert_vert:Ry,meshlambert_frag:Iy,meshmatcap_vert:Py,meshmatcap_frag:Ly,meshnormal_vert:Dy,meshnormal_frag:Uy,meshphong_vert:Ny,meshphong_frag:Fy,meshphysical_vert:Oy,meshphysical_frag:ky,meshtoon_vert:By,meshtoon_frag:zy,points_vert:Vy,points_frag:Gy,shadow_vert:Hy,shadow_frag:Wy,sprite_vert:Xy,sprite_frag:$y},Re={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ot}},envmap:{envMap:{value:null},envMapRotation:{value:new ot},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ot},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0},uvTransform:{value:new ot}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}}},gn={basic:{uniforms:pn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:ft.meshbasic_vert,fragmentShader:ft.meshbasic_frag},lambert:{uniforms:pn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Ue(0)},envMapIntensity:{value:1}}]),vertexShader:ft.meshlambert_vert,fragmentShader:ft.meshlambert_frag},phong:{uniforms:pn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ft.meshphong_vert,fragmentShader:ft.meshphong_frag},standard:{uniforms:pn([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag},toon:{uniforms:pn([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new Ue(0)}}]),vertexShader:ft.meshtoon_vert,fragmentShader:ft.meshtoon_frag},matcap:{uniforms:pn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:ft.meshmatcap_vert,fragmentShader:ft.meshmatcap_frag},points:{uniforms:pn([Re.points,Re.fog]),vertexShader:ft.points_vert,fragmentShader:ft.points_frag},dashed:{uniforms:pn([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ft.linedashed_vert,fragmentShader:ft.linedashed_frag},depth:{uniforms:pn([Re.common,Re.displacementmap]),vertexShader:ft.depth_vert,fragmentShader:ft.depth_frag},normal:{uniforms:pn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:ft.meshnormal_vert,fragmentShader:ft.meshnormal_frag},sprite:{uniforms:pn([Re.sprite,Re.fog]),vertexShader:ft.sprite_vert,fragmentShader:ft.sprite_frag},background:{uniforms:{uvTransform:{value:new ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ft.background_vert,fragmentShader:ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ot}},vertexShader:ft.backgroundCube_vert,fragmentShader:ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ft.cube_vert,fragmentShader:ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ft.equirect_vert,fragmentShader:ft.equirect_frag},distance:{uniforms:pn([Re.common,Re.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ft.distance_vert,fragmentShader:ft.distance_frag},shadow:{uniforms:pn([Re.lights,Re.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:ft.shadow_vert,fragmentShader:ft.shadow_frag}};gn.physical={uniforms:pn([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ot},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ot},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ot},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ot},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ot},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ot}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag};const xo={r:0,b:0,g:0},qy=new rt,Jp=new ot;Jp.set(-1,0,0,0,1,0,0,0,1);function Yy(r,e,t,n,i,s){const a=new Ue(0);let o=i===!0?0:1,l,c,u=null,h=0,d=null;function f(v){let _=v.isScene===!0?v.background:null;if(_&&_.isTexture){const y=v.backgroundBlurriness>0;_=e.get(_,y)}return _}function m(v){let _=!1;const y=f(v);y===null?g(a,o):y&&y.isColor&&(g(y,1),_=!0);const E=r.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,s):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||_)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function x(v,_){const y=f(_);y&&(y.isCubeTexture||y.mapping===xr)?(c===void 0&&(c=new At(new is(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:_r(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,S,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(qy.makeRotationFromEuler(_.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Jp),c.material.toneMapped=_t.getTransfer(y.colorSpace)!==wt,(u!==y||h!==y.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,u=y,h=y.version,d=r.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new At(new wr(2,2),new Vn({name:"BackgroundMaterial",uniforms:_r(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Ui,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=_t.getTransfer(y.colorSpace)!==wt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||h!==y.version||d!==r.toneMapping)&&(l.material.needsUpdate=!0,u=y,h=y.version,d=r.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function g(v,_){v.getRGB(xo,xp(r)),t.buffers.color.setClear(xo.r,xo.g,xo.b,_,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,_=1){a.set(v),o=_,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(a,o)},render:m,addToRenderList:x,dispose:p}}function Zy(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,a=!1;function o(L,k,$,z,N){let V=!1;const G=h(L,z,$,k);s!==G&&(s=G,c(s.object)),V=f(L,z,$,N),V&&m(L,z,$,N),N!==null&&e.update(N,r.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,y(L,k,$,z),N!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return r.createVertexArray()}function c(L){return r.bindVertexArray(L)}function u(L){return r.deleteVertexArray(L)}function h(L,k,$,z){const N=z.wireframe===!0;let V=n[k.id];V===void 0&&(V={},n[k.id]=V);const G=L.isInstancedMesh===!0?L.id:0;let le=V[G];le===void 0&&(le={},V[G]=le);let pe=le[$.id];pe===void 0&&(pe={},le[$.id]=pe);let Ee=pe[N];return Ee===void 0&&(Ee=d(l()),pe[N]=Ee),Ee}function d(L){const k=[],$=[],z=[];for(let N=0;N<t;N++)k[N]=0,$[N]=0,z[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:$,attributeDivisors:z,object:L,attributes:{},index:null}}function f(L,k,$,z){const N=s.attributes,V=k.attributes;let G=0;const le=$.getAttributes();for(const pe in le)if(le[pe].location>=0){const Ie=N[pe];let Fe=V[pe];if(Fe===void 0&&(pe==="instanceMatrix"&&L.instanceMatrix&&(Fe=L.instanceMatrix),pe==="instanceColor"&&L.instanceColor&&(Fe=L.instanceColor)),Ie===void 0||Ie.attribute!==Fe||Fe&&Ie.data!==Fe.data)return!0;G++}return s.attributesNum!==G||s.index!==z}function m(L,k,$,z){const N={},V=k.attributes;let G=0;const le=$.getAttributes();for(const pe in le)if(le[pe].location>=0){let Ie=V[pe];Ie===void 0&&(pe==="instanceMatrix"&&L.instanceMatrix&&(Ie=L.instanceMatrix),pe==="instanceColor"&&L.instanceColor&&(Ie=L.instanceColor));const Fe={};Fe.attribute=Ie,Ie&&Ie.data&&(Fe.data=Ie.data),N[pe]=Fe,G++}s.attributes=N,s.attributesNum=G,s.index=z}function x(){const L=s.newAttributes;for(let k=0,$=L.length;k<$;k++)L[k]=0}function g(L){p(L,0)}function p(L,k){const $=s.newAttributes,z=s.enabledAttributes,N=s.attributeDivisors;$[L]=1,z[L]===0&&(r.enableVertexAttribArray(L),z[L]=1),N[L]!==k&&(r.vertexAttribDivisor(L,k),N[L]=k)}function v(){const L=s.newAttributes,k=s.enabledAttributes;for(let $=0,z=k.length;$<z;$++)k[$]!==L[$]&&(r.disableVertexAttribArray($),k[$]=0)}function _(L,k,$,z,N,V,G){G===!0?r.vertexAttribIPointer(L,k,$,N,V):r.vertexAttribPointer(L,k,$,z,N,V)}function y(L,k,$,z){x();const N=z.attributes,V=$.getAttributes(),G=k.defaultAttributeValues;for(const le in V){const pe=V[le];if(pe.location>=0){let Ee=N[le];if(Ee===void 0&&(le==="instanceMatrix"&&L.instanceMatrix&&(Ee=L.instanceMatrix),le==="instanceColor"&&L.instanceColor&&(Ee=L.instanceColor)),Ee!==void 0){const Ie=Ee.normalized,Fe=Ee.itemSize,tt=e.get(Ee);if(tt===void 0)continue;const ce=tt.buffer,q=tt.type,F=tt.bytesPerElement,K=q===r.INT||q===r.UNSIGNED_INT||Ee.gpuType===El;if(Ee.isInterleavedBufferAttribute){const ue=Ee.data,ye=ue.stride,Ve=Ee.offset;if(ue.isInstancedInterleavedBuffer){for(let re=0;re<pe.locationSize;re++)p(pe.location+re,ue.meshPerAttribute);L.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let re=0;re<pe.locationSize;re++)g(pe.location+re);r.bindBuffer(r.ARRAY_BUFFER,ce);for(let re=0;re<pe.locationSize;re++)_(pe.location+re,Fe/pe.locationSize,q,Ie,ye*F,(Ve+Fe/pe.locationSize*re)*F,K)}else{if(Ee.isInstancedBufferAttribute){for(let ue=0;ue<pe.locationSize;ue++)p(pe.location+ue,Ee.meshPerAttribute);L.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let ue=0;ue<pe.locationSize;ue++)g(pe.location+ue);r.bindBuffer(r.ARRAY_BUFFER,ce);for(let ue=0;ue<pe.locationSize;ue++)_(pe.location+ue,Fe/pe.locationSize,q,Ie,Fe*F,Fe/pe.locationSize*ue*F,K)}}else if(G!==void 0){const Ie=G[le];if(Ie!==void 0)switch(Ie.length){case 2:r.vertexAttrib2fv(pe.location,Ie);break;case 3:r.vertexAttrib3fv(pe.location,Ie);break;case 4:r.vertexAttrib4fv(pe.location,Ie);break;default:r.vertexAttrib1fv(pe.location,Ie)}}}}v()}function E(){w();for(const L in n){const k=n[L];for(const $ in k){const z=k[$];for(const N in z){const V=z[N];for(const G in V)u(V[G].object),delete V[G];delete z[N]}}delete n[L]}}function S(L){if(n[L.id]===void 0)return;const k=n[L.id];for(const $ in k){const z=k[$];for(const N in z){const V=z[N];for(const G in V)u(V[G].object),delete V[G];delete z[N]}}delete n[L.id]}function C(L){for(const k in n){const $=n[k];for(const z in $){const N=$[z];if(N[L.id]===void 0)continue;const V=N[L.id];for(const G in V)u(V[G].object),delete V[G];delete N[L.id]}}}function b(L){for(const k in n){const $=n[k],z=L.isInstancedMesh===!0?L.id:0,N=$[z];if(N!==void 0){for(const V in N){const G=N[V];for(const le in G)u(G[le].object),delete G[le];delete N[V]}delete $[z],Object.keys($).length===0&&delete n[k]}}}function w(){P(),a=!0,s!==i&&(s=i,c(s.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:w,resetDefaultState:P,dispose:E,releaseStatesOfGeometry:S,releaseStatesOfObject:b,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:g,disableUnusedAttributes:v}}function Jy(r,e,t){let n;function i(l){n=l}function s(l,c){r.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(r.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let d=0;for(let f=0;f<u;f++)d+=c[f];t.update(d,n,1)}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Ky(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==xn&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const b=C===bi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==En&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==vn&&!b)}function l(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ce("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ce("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),_=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),E=r.getParameter(r.MAX_SAMPLES),S=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:_,maxFragmentUniforms:y,maxSamples:E,samples:S}}function jy(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new qi,o=new ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const m=h.clippingPlanes,x=h.clipIntersection,g=h.clipShadows,p=r.get(h);if(!i||m===null||m.length===0||s&&!g)s?u(null):c();else{const v=s?0:n,_=v*4;let y=p.clippingState||null;l.value=y,y=u(m,d,_,f);for(let E=0;E!==_;++E)y[E]=t[E];p.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,m){const x=h!==null?h.length:0;let g=null;if(x!==0){if(g=l.value,m!==!0||g===null){const p=f+x*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let _=0,y=f;_!==x;++_,y+=4)a.copy(h[_]).applyMatrix4(v,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}const Ki=4,Uh=[.125,.215,.35,.446,.526,.582],ys=20,Qy=256,Br=new Ta,Nh=new Ue;let Wc=null,Xc=0,$c=0,qc=!1;const eb=new R;class xu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:a=256,position:o=eb}=s;Wc=this._renderer.getRenderTarget(),Xc=this._renderer.getActiveCubeFace(),$c=this._renderer.getActiveMipmapLevel(),qc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Oh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Wc,Xc,$c),this._renderer.xr.enabled=qc,e.scissorTest=!1,rr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===yi||e.mapping===ji?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wc=this._renderer.getRenderTarget(),Xc=this._renderer.getActiveCubeFace(),$c=this._renderer.getActiveMipmapLevel(),qc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:bi,format:xn,colorSpace:la,depthBuffer:!1},i=Fh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fh(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=tb(s)),this._blurMaterial=ib(s,e,t),this._ggxMaterial=nb(s,e,t)}return i}_compileMaterial(e){const t=new At(new lt,e);this._renderer.compile(t,Br)}_sceneToCubeUV(e,t,n,i,s){const l=new Kt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Nh),h.toneMapping=ni,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new At(new is,new nn({name:"PMREM.Background",side:yn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let p=!1;const v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,p=!0):(g.color.copy(Nh),p=!0);for(let _=0;_<6;_++){const y=_%3;y===0?(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[_],s.y,s.z)):y===1?(l.up.set(0,0,c[_]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[_],s.z)):(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[_]));const E=this._cubeSize;rr(i,y*E,_>2?E:0,E,E),h.setRenderTarget(i),p&&h.render(x,l),h.render(e,l)}h.toneMapping=f,h.autoClear=d,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===yi||e.mapping===ji;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=kh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Oh());const s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;rr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Br)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=0+c*1.25,f=h*d,{_lodMax:m}=this,x=this._sizeLods[n],g=3*x*(n>m-Ki?n-m+Ki:0),p=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,rr(s,g,p,3*x,2*x),i.setRenderTarget(s),i.render(o,Br),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-n,rr(e,g,p,3*x,2*x),i.setRenderTarget(e),i.render(o,Br)}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&$e("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[i];h.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*ys-1),x=s/m,g=isFinite(s)?1+Math.floor(u*x):ys;g>ys&&Ce(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ys}`);const p=[];let v=0;for(let C=0;C<ys;++C){const b=C/x,w=Math.exp(-b*b/2);p.push(w),C===0?v+=w:C<g&&(v+=2*w)}for(let C=0;C<p.length;C++)p[C]=p[C]/v;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:_}=this;d.dTheta.value=m,d.mipInt.value=_-n;const y=this._sizeLods[i],E=3*y*(i>_-Ki?i-_+Ki:0),S=4*(this._cubeSize-y);rr(t,E,S,3*y,2*y),l.setRenderTarget(t),l.render(h,Br)}}function tb(r){const e=[],t=[],n=[];let i=r;const s=r-Ki+1+Uh.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>r-Ki?l=Uh[a-r+Ki-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,m=6,x=3,g=2,p=1,v=new Float32Array(x*m*f),_=new Float32Array(g*m*f),y=new Float32Array(p*m*f);for(let S=0;S<f;S++){const C=S%3*2/3-1,b=S>2?0:-1,w=[C,b,0,C+2/3,b,0,C+2/3,b+1,0,C,b,0,C+2/3,b+1,0,C,b+1,0];v.set(w,x*m*S),_.set(d,g*m*S);const P=[S,S,S,S,S,S];y.set(P,p*m*S)}const E=new lt;E.setAttribute("position",new Ct(v,x)),E.setAttribute("uv",new Ct(_,g)),E.setAttribute("faceIndex",new Ct(y,p)),n.push(new At(E,null)),i>Ki&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Fh(r,e,t){const n=new zn(r,e,t);return n.texture.mapping=xr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function rr(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function nb(r,e,t){return new Vn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Qy,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ic(),fragmentShader:`

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
		`,blending:xi,depthTest:!1,depthWrite:!1})}function ib(r,e,t){const n=new Float32Array(ys),i=new R(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:ys,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ic(),fragmentShader:`

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
		`,blending:xi,depthTest:!1,depthWrite:!1})}function Oh(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ic(),fragmentShader:`

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
		`,blending:xi,depthTest:!1,depthWrite:!1})}function kh(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ic(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function ic(){return`

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
	`}class pd extends zn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ma(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new is(5,5,5),s=new Vn({name:"CubemapFromEquirect",uniforms:_r(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:yn,blending:xi});s.uniforms.tEquirect.value=t;const a=new At(i,s),o=t.minFilter;return t.minFilter===_i&&(t.minFilter=Dt),new Vp(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}function sb(r){let e=new WeakMap,t=new WeakMap,n=null;function i(d,f=!1){return d==null?null:f?a(d):s(d)}function s(d){if(d&&d.isTexture){const f=d.mapping;if(f===Xr||f===$r)if(e.has(d)){const m=e.get(d).texture;return o(m,d.mapping)}else{const m=d.image;if(m&&m.height>0){const x=new pd(m.height);return x.fromEquirectangularTexture(r,d),e.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,m=f===Xr||f===$r,x=f===yi||f===ji;if(m||x){let g=t.get(d);const p=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new xu(r)),g=m?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{const v=d.image;return m&&v&&v.height>0||x&&v&&l(v)?(n===null&&(n=new xu(r)),g=m?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",u),g.texture):null}}}return d}function o(d,f){return f===Xr?d.mapping=yi:f===$r&&(d.mapping=ji),d}function l(d){let f=0;const m=6;for(let x=0;x<m;x++)d[x]!==void 0&&f++;return f===m}function c(d){const f=d.target;f.removeEventListener("dispose",c);const m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(d){const f=d.target;f.removeEventListener("dispose",u);const m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:h}}function rb(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&ml("WebGLRenderer: "+n+" extension not supported."),i}}}function ab(r,e,t,n){const i={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],r.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,m=h.attributes.position;let x=0;if(m===void 0)return;if(f!==null){const v=f.array;x=f.version;for(let _=0,y=v.length;_<y;_+=3){const E=v[_+0],S=v[_+1],C=v[_+2];d.push(E,S,S,C,C,E)}}else{const v=m.array;x=m.version;for(let _=0,y=v.length/3-1;_<y;_+=3){const E=_+0,S=_+1,C=_+2;d.push(E,S,S,C,C,E)}}const g=new(m.count>=65535?Vu:zu)(d,1);g.version=x;const p=s.get(h);p&&e.remove(p),s.set(h,g)}function u(h){const d=s.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function ob(r,e,t){let n;function i(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){r.drawElements(n,d,s,h*a),t.update(d,n,1)}function c(h,d,f){f!==0&&(r.drawElementsInstanced(n,d,s,h*a,f),t.update(d,n,f))}function u(h,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,f);let x=0;for(let g=0;g<f;g++)x+=d[g];t.update(x,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function lb(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:$e("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function cb(r,e,t){const n=new WeakMap,i=new yt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let w=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",w)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let _=0;f===!0&&(_=1),m===!0&&(_=2),x===!0&&(_=3);let y=o.attributes.position.count*_,E=1;y>e.maxTextureSize&&(E=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const S=new Float32Array(y*E*4*h),C=new Ul(S,y,E,h);C.type=vn,C.needsUpdate=!0;const b=_*4;for(let P=0;P<h;P++){const L=g[P],k=p[P],$=v[P],z=y*E*4*P;for(let N=0;N<L.count;N++){const V=N*b;f===!0&&(i.fromBufferAttribute(L,N),S[z+V+0]=i.x,S[z+V+1]=i.y,S[z+V+2]=i.z,S[z+V+3]=0),m===!0&&(i.fromBufferAttribute(k,N),S[z+V+4]=i.x,S[z+V+5]=i.y,S[z+V+6]=i.z,S[z+V+7]=0),x===!0&&(i.fromBufferAttribute($,N),S[z+V+8]=i.x,S[z+V+9]=i.y,S[z+V+10]=i.z,S[z+V+11]=$.itemSize===4?i.w:1)}}d={count:h,texture:C,size:new fe(y,E)},n.set(o,d),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];const m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",m),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function ub(r,e,t,n,i){let s=new WeakMap;function a(c){const u=i.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return d}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const db={[Mu]:"LINEAR_TONE_MAPPING",[Su]:"REINHARD_TONE_MAPPING",[wu]:"CINEON_TONE_MAPPING",[Eu]:"ACES_FILMIC_TONE_MAPPING",[Au]:"AGX_TONE_MAPPING",[Cu]:"NEUTRAL_TONE_MAPPING",[Tu]:"CUSTOM_TONE_MAPPING"};function hb(r,e,t,n,i){const s=new zn(e,t,{type:r,depthBuffer:n,stencilBuffer:i,depthTexture:n?new Ps(e,t):void 0}),a=new zn(e,t,{type:bi,depthBuffer:!1,stencilBuffer:!1}),o=new lt;o.setAttribute("position",new ke([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new ke([0,2,0,0,2,0],2));const l=new Qu({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new At(o,l),u=new Ta(-1,1,1,-1,0,1);let h=null,d=null,f=!1,m,x=null,g=[],p=!1;this.setSize=function(v,_){s.setSize(v,_),a.setSize(v,_);for(let y=0;y<g.length;y++){const E=g[y];E.setSize&&E.setSize(v,_)}},this.setEffects=function(v){g=v,p=g.length>0&&g[0].isRenderPass===!0;const _=s.width,y=s.height;for(let E=0;E<g.length;E++){const S=g[E];S.setSize&&S.setSize(_,y)}},this.begin=function(v,_){if(f||v.toneMapping===ni&&g.length===0)return!1;if(x=_,_!==null){const y=_.width,E=_.height;(s.width!==y||s.height!==E)&&this.setSize(y,E)}return p===!1&&v.setRenderTarget(s),m=v.toneMapping,v.toneMapping=ni,!0},this.hasRenderPass=function(){return p},this.end=function(v,_){v.toneMapping=m,f=!0;let y=s,E=a;for(let S=0;S<g.length;S++){const C=g[S];if(C.enabled!==!1&&(C.render(v,E,y,_),C.needsSwap!==!1)){const b=y;y=E,E=b}}if(h!==v.outputColorSpace||d!==v.toneMapping){h=v.outputColorSpace,d=v.toneMapping,l.defines={},_t.getTransfer(h)===wt&&(l.defines.SRGB_TRANSFER="");const S=db[d];S&&(l.defines[S]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,v.setRenderTarget(x),v.render(c,u),x=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const Kp=new Nt,yu=new Ps(1,1),jp=new Ul,Qp=new Nl,em=new Ma,Bh=[],zh=[],Vh=new Float32Array(16),Gh=new Float32Array(9),Hh=new Float32Array(4);function Tr(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Bh[i];if(s===void 0&&(s=new Float32Array(i),Bh[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Yt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Zt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function sc(r,e){let t=zh[e];t===void 0&&(t=new Int32Array(e),zh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function fb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function pb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;r.uniform2fv(this.addr,e),Zt(t,e)}}function mb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;r.uniform3fv(this.addr,e),Zt(t,e)}}function gb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;r.uniform4fv(this.addr,e),Zt(t,e)}}function _b(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,n))return;Hh.set(n),r.uniformMatrix2fv(this.addr,!1,Hh),Zt(t,n)}}function vb(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,n))return;Gh.set(n),r.uniformMatrix3fv(this.addr,!1,Gh),Zt(t,n)}}function xb(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,n))return;Vh.set(n),r.uniformMatrix4fv(this.addr,!1,Vh),Zt(t,n)}}function yb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function bb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;r.uniform2iv(this.addr,e),Zt(t,e)}}function Mb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;r.uniform3iv(this.addr,e),Zt(t,e)}}function Sb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;r.uniform4iv(this.addr,e),Zt(t,e)}}function wb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Eb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;r.uniform2uiv(this.addr,e),Zt(t,e)}}function Tb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;r.uniform3uiv(this.addr,e),Zt(t,e)}}function Ab(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;r.uniform4uiv(this.addr,e),Zt(t,e)}}function Cb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(yu.compareFunction=t.isReversedDepthBuffer()?Dl:Ll,s=yu):s=Kp,t.setTexture2D(e||s,i)}function Rb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Qp,i)}function Ib(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||em,i)}function Pb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||jp,i)}function Lb(r){switch(r){case 5126:return fb;case 35664:return pb;case 35665:return mb;case 35666:return gb;case 35674:return _b;case 35675:return vb;case 35676:return xb;case 5124:case 35670:return yb;case 35667:case 35671:return bb;case 35668:case 35672:return Mb;case 35669:case 35673:return Sb;case 5125:return wb;case 36294:return Eb;case 36295:return Tb;case 36296:return Ab;case 35678:case 36198:case 36298:case 36306:case 35682:return Cb;case 35679:case 36299:case 36307:return Rb;case 35680:case 36300:case 36308:case 36293:return Ib;case 36289:case 36303:case 36311:case 36292:return Pb}}function Db(r,e){r.uniform1fv(this.addr,e)}function Ub(r,e){const t=Tr(e,this.size,2);r.uniform2fv(this.addr,t)}function Nb(r,e){const t=Tr(e,this.size,3);r.uniform3fv(this.addr,t)}function Fb(r,e){const t=Tr(e,this.size,4);r.uniform4fv(this.addr,t)}function Ob(r,e){const t=Tr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function kb(r,e){const t=Tr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Bb(r,e){const t=Tr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function zb(r,e){r.uniform1iv(this.addr,e)}function Vb(r,e){r.uniform2iv(this.addr,e)}function Gb(r,e){r.uniform3iv(this.addr,e)}function Hb(r,e){r.uniform4iv(this.addr,e)}function Wb(r,e){r.uniform1uiv(this.addr,e)}function Xb(r,e){r.uniform2uiv(this.addr,e)}function $b(r,e){r.uniform3uiv(this.addr,e)}function qb(r,e){r.uniform4uiv(this.addr,e)}function Yb(r,e,t){const n=this.cache,i=e.length,s=sc(t,i);Yt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));let a;this.type===r.SAMPLER_2D_SHADOW?a=yu:a=Kp;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,s[o])}function Zb(r,e,t){const n=this.cache,i=e.length,s=sc(t,i);Yt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Qp,s[a])}function Jb(r,e,t){const n=this.cache,i=e.length,s=sc(t,i);Yt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||em,s[a])}function Kb(r,e,t){const n=this.cache,i=e.length,s=sc(t,i);Yt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||jp,s[a])}function jb(r){switch(r){case 5126:return Db;case 35664:return Ub;case 35665:return Nb;case 35666:return Fb;case 35674:return Ob;case 35675:return kb;case 35676:return Bb;case 5124:case 35670:return zb;case 35667:case 35671:return Vb;case 35668:case 35672:return Gb;case 35669:case 35673:return Hb;case 5125:return Wb;case 36294:return Xb;case 36295:return $b;case 36296:return qb;case 35678:case 36198:case 36298:case 36306:case 35682:return Yb;case 35679:case 36299:case 36307:return Zb;case 35680:case 36300:case 36308:case 36293:return Jb;case 36289:case 36303:case 36311:case 36292:return Kb}}class Qb{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Lb(t.type)}}class eM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jb(t.type)}}class tM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const Yc=/(\w+)(\])?(\[|\.)?/g;function Wh(r,e){r.seq.push(e),r.map[e.id]=e}function nM(r,e,t){const n=r.name,i=n.length;for(Yc.lastIndex=0;;){const s=Yc.exec(n),a=Yc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Wh(t,c===void 0?new Qb(o,r,e):new eM(o,r,e));break}else{let h=t.map[o];h===void 0&&(h=new tM(o),Wh(t,h)),t=h}}}class Ao{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);nM(o,l,this)}const i=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Xh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const iM=37297;let sM=0;function rM(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const $h=new ot;function aM(r){_t._getMatrix($h,_t.workingColorSpace,r);const e=`mat3( ${$h.elements.map(t=>t.toFixed(4))} )`;switch(_t.getTransfer(r)){case ca:return[e,"LinearTransferOETF"];case wt:return[e,"sRGBTransferOETF"];default:return Ce("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function qh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+rM(r.getShaderSource(e),o)}else return s}function oM(r,e){const t=aM(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const lM={[Mu]:"Linear",[Su]:"Reinhard",[wu]:"Cineon",[Eu]:"ACESFilmic",[Au]:"AgX",[Cu]:"Neutral",[Tu]:"Custom"};function cM(r,e){const t=lM[e];return t===void 0?(Ce("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const yo=new R;function uM(){_t.getLuminanceCoefficients(yo);const r=yo.x.toFixed(4),e=yo.y.toFixed(4),t=yo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function dM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hr).join(`
`)}function hM(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function fM(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function Hr(r){return r!==""}function Yh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const pM=/^[ \t]*#include +<([\w\d./]+)>/gm;function bu(r){return r.replace(pM,gM)}const mM=new Map;function gM(r,e){let t=ft[e];if(t===void 0){const n=mM.get(e);if(n!==void 0)t=ft[n],Ce('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return bu(t)}const _M=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jh(r){return r.replace(_M,vM)}function vM(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Kh(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const xM={[Wr]:"SHADOWMAP_TYPE_PCF",[or]:"SHADOWMAP_TYPE_VSM"};function yM(r){return xM[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const bM={[yi]:"ENVMAP_TYPE_CUBE",[ji]:"ENVMAP_TYPE_CUBE",[xr]:"ENVMAP_TYPE_CUBE_UV"};function MM(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":bM[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const SM={[ji]:"ENVMAP_MODE_REFRACTION"};function wM(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":SM[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const EM={[ya]:"ENVMAP_BLENDING_MULTIPLY",[Df]:"ENVMAP_BLENDING_MIX",[Uf]:"ENVMAP_BLENDING_ADD"};function TM(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":EM[r.combine]||"ENVMAP_BLENDING_NONE"}function AM(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function CM(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=yM(t),c=MM(t),u=wM(t),h=TM(t),d=AM(t),f=dM(t),m=hM(s),x=i.createProgram();let g,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Hr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Hr).join(`
`),p.length>0&&(p+=`
`)):(g=[Kh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hr).join(`
`),p=[Kh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ni?"#define TONE_MAPPING":"",t.toneMapping!==ni?ft.tonemapping_pars_fragment:"",t.toneMapping!==ni?cM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ft.colorspace_pars_fragment,oM("linearToOutputTexel",t.outputColorSpace),uM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Hr).join(`
`)),a=bu(a),a=Yh(a,t),a=Zh(a,t),o=bu(o),o=Yh(o,t),o=Zh(o,t),a=Jh(a),o=Jh(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===uu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===uu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const _=v+g+a,y=v+p+o,E=Xh(i,i.VERTEX_SHADER,_),S=Xh(i,i.FRAGMENT_SHADER,y);i.attachShader(x,E),i.attachShader(x,S),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function C(L){if(r.debug.checkShaderErrors){const k=i.getProgramInfoLog(x)||"",$=i.getShaderInfoLog(E)||"",z=i.getShaderInfoLog(S)||"",N=k.trim(),V=$.trim(),G=z.trim();let le=!0,pe=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(le=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,x,E,S);else{const Ee=qh(i,E,"vertex"),Ie=qh(i,S,"fragment");$e("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+N+`
`+Ee+`
`+Ie)}else N!==""?Ce("WebGLProgram: Program Info Log:",N):(V===""||G==="")&&(pe=!1);pe&&(L.diagnostics={runnable:le,programLog:N,vertexShader:{log:V,prefix:g},fragmentShader:{log:G,prefix:p}})}i.deleteShader(E),i.deleteShader(S),b=new Ao(i,x),w=fM(i,x)}let b;this.getUniforms=function(){return b===void 0&&C(this),b};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(x,iM)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=sM++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=E,this.fragmentShader=S,this}let RM=0;class IM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new PM(e),t.set(e,n)),n}}class PM{constructor(e){this.id=RM++,this.code=e,this.usedTimes=0}}function LM(r){return r===Qi||r===sa||r===ra}function DM(r,e,t,n,i,s){const a=new Fl,o=new IM,l=new Set,c=[],u=new Map,h=n.logarithmicDepthBuffer;let d=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(b){return l.add(b),b===0?"uv":`uv${b}`}function x(b,w,P,L,k,$){const z=L.fog,N=k.geometry,V=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?L.environment:null,G=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,le=e.get(b.envMap||V,G),pe=le&&le.mapping===xr?le.image.height:null,Ee=f[b.type];b.precision!==null&&(d=n.getMaxPrecision(b.precision),d!==b.precision&&Ce("WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const Ie=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,Fe=Ie!==void 0?Ie.length:0;let tt=0;N.morphAttributes.position!==void 0&&(tt=1),N.morphAttributes.normal!==void 0&&(tt=2),N.morphAttributes.color!==void 0&&(tt=3);let ce,q,F,K;if(Ee){const Pe=gn[Ee];ce=Pe.vertexShader,q=Pe.fragmentShader}else ce=b.vertexShader,q=b.fragmentShader,o.update(b),F=o.getVertexShaderID(b),K=o.getFragmentShaderID(b);const ue=r.getRenderTarget(),ye=r.state.buffers.depth.getReversed(),Ve=k.isInstancedMesh===!0,re=k.isBatchedMesh===!0,he=!!b.map,ne=!!b.matcap,ie=!!le,te=!!b.aoMap,ae=!!b.lightMap,me=!!b.bumpMap,ge=!!b.normalMap,je=!!b.displacementMap,U=!!b.emissiveMap,nt=!!b.metalnessMap,Be=!!b.roughnessMap,Ke=b.anisotropy>0,xe=b.clearcoat>0,xt=b.dispersion>0,A=b.iridescence>0,M=b.sheen>0,X=b.transmission>0,oe=Ke&&!!b.anisotropyMap,_e=xe&&!!b.clearcoatMap,be=xe&&!!b.clearcoatNormalMap,Te=xe&&!!b.clearcoatRoughnessMap,se=A&&!!b.iridescenceMap,de=A&&!!b.iridescenceThicknessMap,Le=M&&!!b.sheenColorMap,Oe=M&&!!b.sheenRoughnessMap,Ae=!!b.specularMap,Se=!!b.specularColorMap,at=!!b.specularIntensityMap,ct=X&&!!b.transmissionMap,vt=X&&!!b.thicknessMap,B=!!b.gradientMap,we=!!b.alphaMap,I=b.alphaTest>0,O=!!b.alphaHash,W=!!b.extensions;let j=ni;b.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(j=r.toneMapping);const ve={shaderID:Ee,shaderType:b.type,shaderName:b.name,vertexShader:ce,fragmentShader:q,defines:b.defines,customVertexShaderID:F,customFragmentShaderID:K,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:re,batchingColor:re&&k._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&k.instanceColor!==null,instancingMorph:Ve&&k.morphTexture!==null,outputColorSpace:ue===null?r.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:_t.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:he,matcap:ne,envMap:ie,envMapMode:ie&&le.mapping,envMapCubeUVHeight:pe,aoMap:te,lightMap:ae,bumpMap:me,normalMap:ge,displacementMap:je,emissiveMap:U,normalMapObjectSpace:ge&&b.normalMapType===zf,normalMapTangentSpace:ge&&b.normalMapType===Ni,packedNormalMap:ge&&b.normalMapType===Ni&&LM(b.normalMap.format),metalnessMap:nt,roughnessMap:Be,anisotropy:Ke,anisotropyMap:oe,clearcoat:xe,clearcoatMap:_e,clearcoatNormalMap:be,clearcoatRoughnessMap:Te,dispersion:xt,iridescence:A,iridescenceMap:se,iridescenceThicknessMap:de,sheen:M,sheenColorMap:Le,sheenRoughnessMap:Oe,specularMap:Ae,specularColorMap:Se,specularIntensityMap:at,transmission:X,transmissionMap:ct,thicknessMap:vt,gradientMap:B,opaque:b.transparent===!1&&b.blending===Es&&b.alphaToCoverage===!1,alphaMap:we,alphaTest:I,alphaHash:O,combine:b.combine,mapUv:he&&m(b.map.channel),aoMapUv:te&&m(b.aoMap.channel),lightMapUv:ae&&m(b.lightMap.channel),bumpMapUv:me&&m(b.bumpMap.channel),normalMapUv:ge&&m(b.normalMap.channel),displacementMapUv:je&&m(b.displacementMap.channel),emissiveMapUv:U&&m(b.emissiveMap.channel),metalnessMapUv:nt&&m(b.metalnessMap.channel),roughnessMapUv:Be&&m(b.roughnessMap.channel),anisotropyMapUv:oe&&m(b.anisotropyMap.channel),clearcoatMapUv:_e&&m(b.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&m(b.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&m(b.iridescenceMap.channel),iridescenceThicknessMapUv:de&&m(b.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&m(b.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&m(b.sheenRoughnessMap.channel),specularMapUv:Ae&&m(b.specularMap.channel),specularColorMapUv:Se&&m(b.specularColorMap.channel),specularIntensityMapUv:at&&m(b.specularIntensityMap.channel),transmissionMapUv:ct&&m(b.transmissionMap.channel),thicknessMapUv:vt&&m(b.thicknessMap.channel),alphaMapUv:we&&m(b.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(ge||Ke),vertexNormals:!!N.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!N.attributes.uv&&(he||we),fog:!!z,useFog:b.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||N.attributes.normal===void 0&&ge===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ye,skinning:k.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:Fe,morphTextureStride:tt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:$.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:j,decodeVideoTexture:he&&b.map.isVideoTexture===!0&&_t.getTransfer(b.map.colorSpace)===wt,decodeVideoTextureEmissive:U&&b.emissiveMap.isVideoTexture===!0&&_t.getTransfer(b.emissiveMap.colorSpace)===wt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===mi,flipSided:b.side===yn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:W&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(W&&b.extensions.multiDraw===!0||re)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return ve.vertexUv1s=l.has(1),ve.vertexUv2s=l.has(2),ve.vertexUv3s=l.has(3),l.clear(),ve}function g(b){const w=[];if(b.shaderID?w.push(b.shaderID):(w.push(b.customVertexShaderID),w.push(b.customFragmentShaderID)),b.defines!==void 0)for(const P in b.defines)w.push(P),w.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(p(w,b),v(w,b),w.push(r.outputColorSpace)),w.push(b.customProgramCacheKey),w.join()}function p(b,w){b.push(w.precision),b.push(w.outputColorSpace),b.push(w.envMapMode),b.push(w.envMapCubeUVHeight),b.push(w.mapUv),b.push(w.alphaMapUv),b.push(w.lightMapUv),b.push(w.aoMapUv),b.push(w.bumpMapUv),b.push(w.normalMapUv),b.push(w.displacementMapUv),b.push(w.emissiveMapUv),b.push(w.metalnessMapUv),b.push(w.roughnessMapUv),b.push(w.anisotropyMapUv),b.push(w.clearcoatMapUv),b.push(w.clearcoatNormalMapUv),b.push(w.clearcoatRoughnessMapUv),b.push(w.iridescenceMapUv),b.push(w.iridescenceThicknessMapUv),b.push(w.sheenColorMapUv),b.push(w.sheenRoughnessMapUv),b.push(w.specularMapUv),b.push(w.specularColorMapUv),b.push(w.specularIntensityMapUv),b.push(w.transmissionMapUv),b.push(w.thicknessMapUv),b.push(w.combine),b.push(w.fogExp2),b.push(w.sizeAttenuation),b.push(w.morphTargetsCount),b.push(w.morphAttributeCount),b.push(w.numDirLights),b.push(w.numPointLights),b.push(w.numSpotLights),b.push(w.numSpotLightMaps),b.push(w.numHemiLights),b.push(w.numRectAreaLights),b.push(w.numDirLightShadows),b.push(w.numPointLightShadows),b.push(w.numSpotLightShadows),b.push(w.numSpotLightShadowsWithMaps),b.push(w.numLightProbes),b.push(w.shadowMapType),b.push(w.toneMapping),b.push(w.numClippingPlanes),b.push(w.numClipIntersection),b.push(w.depthPacking)}function v(b,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),b.push(a.mask)}function _(b){const w=f[b.type];let P;if(w){const L=gn[w];P=ec.clone(L.uniforms)}else P=b.uniforms;return P}function y(b,w){let P=u.get(w);return P!==void 0?++P.usedTimes:(P=new CM(r,w,b,i),c.push(P),u.set(w,P)),P}function E(b){if(--b.usedTimes===0){const w=c.indexOf(b);c[w]=c[c.length-1],c.pop(),u.delete(b.cacheKey),b.destroy()}}function S(b){o.remove(b)}function C(){o.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:_,acquireProgram:y,releaseProgram:E,releaseShaderCache:S,programs:c,dispose:C}}function UM(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function NM(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function jh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Qh(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,m,x,g,p){let v=r[e];return v===void 0?(v={id:d.id,object:d,geometry:f,material:m,materialVariant:a(d),groupOrder:x,renderOrder:d.renderOrder,z:g,group:p},r[e]=v):(v.id=d.id,v.object=d,v.geometry=f,v.material=m,v.materialVariant=a(d),v.groupOrder=x,v.renderOrder=d.renderOrder,v.z=g,v.group=p),e++,v}function l(d,f,m,x,g,p){const v=o(d,f,m,x,g,p);m.transmission>0?n.push(v):m.transparent===!0?i.push(v):t.push(v)}function c(d,f,m,x,g,p){const v=o(d,f,m,x,g,p);m.transmission>0?n.unshift(v):m.transparent===!0?i.unshift(v):t.unshift(v)}function u(d,f){t.length>1&&t.sort(d||NM),n.length>1&&n.sort(f||jh),i.length>1&&i.sort(f||jh)}function h(){for(let d=e,f=r.length;d<f;d++){const m=r[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:l,unshift:c,finish:h,sort:u}}function FM(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new Qh,r.set(n,[a])):i>=s.length?(a=new Qh,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function OM(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new Ue};break;case"SpotLight":t={position:new R,direction:new R,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new R,halfWidth:new R,halfHeight:new R};break}return r[e.id]=t,t}}}function kM(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let BM=0;function zM(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function VM(r){const e=new OM,t=kM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);const i=new R,s=new rt,a=new rt;function o(c){let u=0,h=0,d=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,m=0,x=0,g=0,p=0,v=0,_=0,y=0,E=0,S=0,C=0;c.sort(zM);for(let w=0,P=c.length;w<P;w++){const L=c[w],k=L.color,$=L.intensity,z=L.distance;let N=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Qi?N=L.shadow.map.texture:N=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)u+=k.r*$,h+=k.g*$,d+=k.b*$;else if(L.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(L.sh.coefficients[V],$);C++}else if(L.isDirectionalLight){const V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const G=L.shadow,le=t.get(L);le.shadowIntensity=G.intensity,le.shadowBias=G.bias,le.shadowNormalBias=G.normalBias,le.shadowRadius=G.radius,le.shadowMapSize=G.mapSize,n.directionalShadow[f]=le,n.directionalShadowMap[f]=N,n.directionalShadowMatrix[f]=L.shadow.matrix,v++}n.directional[f]=V,f++}else if(L.isSpotLight){const V=e.get(L);V.position.setFromMatrixPosition(L.matrixWorld),V.color.copy(k).multiplyScalar($),V.distance=z,V.coneCos=Math.cos(L.angle),V.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),V.decay=L.decay,n.spot[x]=V;const G=L.shadow;if(L.map&&(n.spotLightMap[E]=L.map,E++,G.updateMatrices(L),L.castShadow&&S++),n.spotLightMatrix[x]=G.matrix,L.castShadow){const le=t.get(L);le.shadowIntensity=G.intensity,le.shadowBias=G.bias,le.shadowNormalBias=G.normalBias,le.shadowRadius=G.radius,le.shadowMapSize=G.mapSize,n.spotShadow[x]=le,n.spotShadowMap[x]=N,y++}x++}else if(L.isRectAreaLight){const V=e.get(L);V.color.copy(k).multiplyScalar($),V.halfWidth.set(L.width*.5,0,0),V.halfHeight.set(0,L.height*.5,0),n.rectArea[g]=V,g++}else if(L.isPointLight){const V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),V.distance=L.distance,V.decay=L.decay,L.castShadow){const G=L.shadow,le=t.get(L);le.shadowIntensity=G.intensity,le.shadowBias=G.bias,le.shadowNormalBias=G.normalBias,le.shadowRadius=G.radius,le.shadowMapSize=G.mapSize,le.shadowCameraNear=G.camera.near,le.shadowCameraFar=G.camera.far,n.pointShadow[m]=le,n.pointShadowMap[m]=N,n.pointShadowMatrix[m]=L.shadow.matrix,_++}n.point[m]=V,m++}else if(L.isHemisphereLight){const V=e.get(L);V.skyColor.copy(L.color).multiplyScalar($),V.groundColor.copy(L.groundColor).multiplyScalar($),n.hemi[p]=V,p++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Re.LTC_FLOAT_1,n.rectAreaLTC2=Re.LTC_FLOAT_2):(n.rectAreaLTC1=Re.LTC_HALF_1,n.rectAreaLTC2=Re.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const b=n.hash;(b.directionalLength!==f||b.pointLength!==m||b.spotLength!==x||b.rectAreaLength!==g||b.hemiLength!==p||b.numDirectionalShadows!==v||b.numPointShadows!==_||b.numSpotShadows!==y||b.numSpotMaps!==E||b.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=y+E-S,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=C,b.directionalLength=f,b.pointLength=m,b.spotLength=x,b.rectAreaLength=g,b.hemiLength=p,b.numDirectionalShadows=v,b.numPointShadows=_,b.numSpotShadows=y,b.numSpotMaps=E,b.numLightProbes=C,n.version=BM++)}function l(c,u){let h=0,d=0,f=0,m=0,x=0;const g=u.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const _=c[p];if(_.isDirectionalLight){const y=n.directional[h];y.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),h++}else if(_.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(_.isRectAreaLight){const y=n.rectArea[m];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),a.identity(),s.copy(_.matrixWorld),s.premultiply(g),a.extractRotation(s),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),m++}else if(_.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),d++}else if(_.isHemisphereLight){const y=n.hemi[x];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(g),x++}}}return{setup:o,setupView:l,state:n}}function ef(r){const e=new VM(r),t=[],n=[],i=[];function s(d){h.camera=d,t.length=0,n.length=0,i.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){i.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const h={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function GM(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new ef(r),e.set(i,[o])):s>=a.length?(o=new ef(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const HM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,WM=`uniform sampler2D shadow_pass;
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
}`,XM=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],$M=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],tf=new rt,zr=new R,Zc=new R;function qM(r,e,t){let n=new br;const i=new fe,s=new fe,a=new yt,o=new td,l=new nd,c={},u=t.maxTextureSize,h={[Ui]:yn,[yn]:Ui,[mi]:mi},d=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:HM,fragmentShader:WM}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new lt;m.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new At(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wr;let p=this.type;this.render=function(S,C,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===pf&&(Ce("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Wr);const w=r.getRenderTarget(),P=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),k=r.state;k.setBlending(xi),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const $=p!==this.type;$&&C.traverse(function(z){z.material&&(Array.isArray(z.material)?z.material.forEach(N=>N.needsUpdate=!0):z.material.needsUpdate=!0)});for(let z=0,N=S.length;z<N;z++){const V=S[z],G=V.shadow;if(G===void 0){Ce("WebGLShadowMap:",V,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const le=G.getFrameExtents();i.multiply(le),s.copy(G.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/le.x),i.x=s.x*le.x,G.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/le.y),i.y=s.y*le.y,G.mapSize.y=s.y));const pe=r.state.buffers.depth.getReversed();if(G.camera._reversedDepth=pe,G.map===null||$===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===or){if(V.isPointLight){Ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new zn(i.x,i.y,{format:Qi,type:bi,minFilter:Dt,magFilter:Dt,generateMipmaps:!1}),G.map.texture.name=V.name+".shadowMap",G.map.depthTexture=new Ps(i.x,i.y,vn),G.map.depthTexture.name=V.name+".shadowMapDepth",G.map.depthTexture.format=Mi,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Vt,G.map.depthTexture.magFilter=Vt}else V.isPointLight?(G.map=new pd(i.x),G.map.depthTexture=new op(i.x,Wn)):(G.map=new zn(i.x,i.y),G.map.depthTexture=new Ps(i.x,i.y,Wn)),G.map.depthTexture.name=V.name+".shadowMap",G.map.depthTexture.format=Mi,this.type===Wr?(G.map.depthTexture.compareFunction=pe?Dl:Ll,G.map.depthTexture.minFilter=Dt,G.map.depthTexture.magFilter=Dt):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Vt,G.map.depthTexture.magFilter=Vt);G.camera.updateProjectionMatrix()}const Ee=G.map.isWebGLCubeRenderTarget?6:1;for(let Ie=0;Ie<Ee;Ie++){if(G.map.isWebGLCubeRenderTarget)r.setRenderTarget(G.map,Ie),r.clear();else{Ie===0&&(r.setRenderTarget(G.map),r.clear());const Fe=G.getViewport(Ie);a.set(s.x*Fe.x,s.y*Fe.y,s.x*Fe.z,s.y*Fe.w),k.viewport(a)}if(V.isPointLight){const Fe=G.camera,tt=G.matrix,ce=V.distance||Fe.far;ce!==Fe.far&&(Fe.far=ce,Fe.updateProjectionMatrix()),zr.setFromMatrixPosition(V.matrixWorld),Fe.position.copy(zr),Zc.copy(Fe.position),Zc.add(XM[Ie]),Fe.up.copy($M[Ie]),Fe.lookAt(Zc),Fe.updateMatrixWorld(),tt.makeTranslation(-zr.x,-zr.y,-zr.z),tf.multiplyMatrices(Fe.projectionMatrix,Fe.matrixWorldInverse),G._frustum.setFromProjectionMatrix(tf,Fe.coordinateSystem,Fe.reversedDepth)}else G.updateMatrices(V);n=G.getFrustum(),y(C,b,G.camera,V,this.type)}G.isPointLightShadow!==!0&&this.type===or&&v(G,b),G.needsUpdate=!1}p=this.type,g.needsUpdate=!1,r.setRenderTarget(w,P,L)};function v(S,C){const b=e.update(x);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new zn(i.x,i.y,{format:Qi,type:bi})),d.uniforms.shadow_pass.value=S.map.depthTexture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,r.setRenderTarget(S.mapPass),r.clear(),r.renderBufferDirect(C,null,b,d,x,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,r.setRenderTarget(S.map),r.clear(),r.renderBufferDirect(C,null,b,f,x,null)}function _(S,C,b,w){let P=null;const L=b.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(L!==void 0)P=L;else if(P=b.isPointLight===!0?l:o,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const k=P.uuid,$=C.uuid;let z=c[k];z===void 0&&(z={},c[k]=z);let N=z[$];N===void 0&&(N=P.clone(),z[$]=N,C.addEventListener("dispose",E)),P=N}if(P.visible=C.visible,P.wireframe=C.wireframe,w===or?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:h[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,b.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const k=r.properties.get(P);k.light=b}return P}function y(S,C,b,w,P){if(S.visible===!1)return;if(S.layers.test(C.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&P===or)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,S.matrixWorld);const $=e.update(S),z=S.material;if(Array.isArray(z)){const N=$.groups;for(let V=0,G=N.length;V<G;V++){const le=N[V],pe=z[le.materialIndex];if(pe&&pe.visible){const Ee=_(S,pe,w,P);S.onBeforeShadow(r,S,C,b,$,Ee,le),r.renderBufferDirect(b,null,$,Ee,S,le),S.onAfterShadow(r,S,C,b,$,Ee,le)}}}else if(z.visible){const N=_(S,z,w,P);S.onBeforeShadow(r,S,C,b,$,N,null),r.renderBufferDirect(b,null,$,N,S,null),S.onAfterShadow(r,S,C,b,$,N,null)}}const k=S.children;for(let $=0,z=k.length;$<z;$++)y(k[$],C,b,w,P)}function E(S){S.target.removeEventListener("dispose",E);for(const b in c){const w=c[b],P=S.target.uuid;P in w&&(w[P].dispose(),delete w[P])}}}function YM(r,e){function t(){let B=!1;const we=new yt;let I=null;const O=new yt(0,0,0,0);return{setMask:function(W){I!==W&&!B&&(r.colorMask(W,W,W,W),I=W)},setLocked:function(W){B=W},setClear:function(W,j,ve,Pe,it){it===!0&&(W*=Pe,j*=Pe,ve*=Pe),we.set(W,j,ve,Pe),O.equals(we)===!1&&(r.clearColor(W,j,ve,Pe),O.copy(we))},reset:function(){B=!1,I=null,O.set(-1,0,0,0)}}}function n(){let B=!1,we=!1,I=null,O=null,W=null;return{setReversed:function(j){if(we!==j){const ve=e.get("EXT_clip_control");j?ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.ZERO_TO_ONE_EXT):ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.NEGATIVE_ONE_TO_ONE_EXT),we=j;const Pe=W;W=null,this.setClear(Pe)}},getReversed:function(){return we},setTest:function(j){j?ue(r.DEPTH_TEST):ye(r.DEPTH_TEST)},setMask:function(j){I!==j&&!B&&(r.depthMask(j),I=j)},setFunc:function(j){if(we&&(j=fg[j]),O!==j){switch(j){case Po:r.depthFunc(r.NEVER);break;case Lo:r.depthFunc(r.ALWAYS);break;case Do:r.depthFunc(r.LESS);break;case Rs:r.depthFunc(r.LEQUAL);break;case Uo:r.depthFunc(r.EQUAL);break;case No:r.depthFunc(r.GEQUAL);break;case Fo:r.depthFunc(r.GREATER);break;case Oo:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}O=j}},setLocked:function(j){B=j},setClear:function(j){W!==j&&(W=j,we&&(j=1-j),r.clearDepth(j))},reset:function(){B=!1,I=null,O=null,W=null,we=!1}}}function i(){let B=!1,we=null,I=null,O=null,W=null,j=null,ve=null,Pe=null,it=null;return{setTest:function(Qe){B||(Qe?ue(r.STENCIL_TEST):ye(r.STENCIL_TEST))},setMask:function(Qe){we!==Qe&&!B&&(r.stencilMask(Qe),we=Qe)},setFunc:function(Qe,He,mt){(I!==Qe||O!==He||W!==mt)&&(r.stencilFunc(Qe,He,mt),I=Qe,O=He,W=mt)},setOp:function(Qe,He,mt){(j!==Qe||ve!==He||Pe!==mt)&&(r.stencilOp(Qe,He,mt),j=Qe,ve=He,Pe=mt)},setLocked:function(Qe){B=Qe},setClear:function(Qe){it!==Qe&&(r.clearStencil(Qe),it=Qe)},reset:function(){B=!1,we=null,I=null,O=null,W=null,j=null,ve=null,Pe=null,it=null}}}const s=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let u={},h={},d={},f=new WeakMap,m=[],x=null,g=!1,p=null,v=null,_=null,y=null,E=null,S=null,C=null,b=new Ue(0,0,0),w=0,P=!1,L=null,k=null,$=null,z=null,N=null;const V=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,le=0;const pe=r.getParameter(r.VERSION);pe.indexOf("WebGL")!==-1?(le=parseFloat(/^WebGL (\d)/.exec(pe)[1]),G=le>=1):pe.indexOf("OpenGL ES")!==-1&&(le=parseFloat(/^OpenGL ES (\d)/.exec(pe)[1]),G=le>=2);let Ee=null,Ie={};const Fe=r.getParameter(r.SCISSOR_BOX),tt=r.getParameter(r.VIEWPORT),ce=new yt().fromArray(Fe),q=new yt().fromArray(tt);function F(B,we,I,O){const W=new Uint8Array(4),j=r.createTexture();r.bindTexture(B,j),r.texParameteri(B,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(B,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ve=0;ve<I;ve++)B===r.TEXTURE_3D||B===r.TEXTURE_2D_ARRAY?r.texImage3D(we,0,r.RGBA,1,1,O,0,r.RGBA,r.UNSIGNED_BYTE,W):r.texImage2D(we+ve,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,W);return j}const K={};K[r.TEXTURE_2D]=F(r.TEXTURE_2D,r.TEXTURE_2D,1),K[r.TEXTURE_CUBE_MAP]=F(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[r.TEXTURE_2D_ARRAY]=F(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),K[r.TEXTURE_3D]=F(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ue(r.DEPTH_TEST),a.setFunc(Rs),me(!1),ge(iu),ue(r.CULL_FACE),te(xi);function ue(B){u[B]!==!0&&(r.enable(B),u[B]=!0)}function ye(B){u[B]!==!1&&(r.disable(B),u[B]=!1)}function Ve(B,we){return d[B]!==we?(r.bindFramebuffer(B,we),d[B]=we,B===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=we),B===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=we),!0):!1}function re(B,we){let I=m,O=!1;if(B){I=f.get(we),I===void 0&&(I=[],f.set(we,I));const W=B.textures;if(I.length!==W.length||I[0]!==r.COLOR_ATTACHMENT0){for(let j=0,ve=W.length;j<ve;j++)I[j]=r.COLOR_ATTACHMENT0+j;I.length=W.length,O=!0}}else I[0]!==r.BACK&&(I[0]=r.BACK,O=!0);O&&r.drawBuffers(I)}function he(B){return x!==B?(r.useProgram(B),x=B,!0):!1}const ne={[Yi]:r.FUNC_ADD,[gf]:r.FUNC_SUBTRACT,[_f]:r.FUNC_REVERSE_SUBTRACT};ne[vf]=r.MIN,ne[xf]=r.MAX;const ie={[yf]:r.ZERO,[bf]:r.ONE,[Mf]:r.SRC_COLOR,[Ro]:r.SRC_ALPHA,[Cf]:r.SRC_ALPHA_SATURATE,[Tf]:r.DST_COLOR,[wf]:r.DST_ALPHA,[Sf]:r.ONE_MINUS_SRC_COLOR,[Io]:r.ONE_MINUS_SRC_ALPHA,[Af]:r.ONE_MINUS_DST_COLOR,[Ef]:r.ONE_MINUS_DST_ALPHA,[Rf]:r.CONSTANT_COLOR,[If]:r.ONE_MINUS_CONSTANT_COLOR,[Pf]:r.CONSTANT_ALPHA,[Lf]:r.ONE_MINUS_CONSTANT_ALPHA};function te(B,we,I,O,W,j,ve,Pe,it,Qe){if(B===xi){g===!0&&(ye(r.BLEND),g=!1);return}if(g===!1&&(ue(r.BLEND),g=!0),B!==mf){if(B!==p||Qe!==P){if((v!==Yi||E!==Yi)&&(r.blendEquation(r.FUNC_ADD),v=Yi,E=Yi),Qe)switch(B){case Es:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case su:r.blendFunc(r.ONE,r.ONE);break;case ru:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case au:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:$e("WebGLState: Invalid blending: ",B);break}else switch(B){case Es:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case su:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case ru:$e("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case au:$e("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$e("WebGLState: Invalid blending: ",B);break}_=null,y=null,S=null,C=null,b.set(0,0,0),w=0,p=B,P=Qe}return}W=W||we,j=j||I,ve=ve||O,(we!==v||W!==E)&&(r.blendEquationSeparate(ne[we],ne[W]),v=we,E=W),(I!==_||O!==y||j!==S||ve!==C)&&(r.blendFuncSeparate(ie[I],ie[O],ie[j],ie[ve]),_=I,y=O,S=j,C=ve),(Pe.equals(b)===!1||it!==w)&&(r.blendColor(Pe.r,Pe.g,Pe.b,it),b.copy(Pe),w=it),p=B,P=!1}function ae(B,we){B.side===mi?ye(r.CULL_FACE):ue(r.CULL_FACE);let I=B.side===yn;we&&(I=!I),me(I),B.blending===Es&&B.transparent===!1?te(xi):te(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),s.setMask(B.colorWrite);const O=B.stencilWrite;o.setTest(O),O&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),U(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?ue(r.SAMPLE_ALPHA_TO_COVERAGE):ye(r.SAMPLE_ALPHA_TO_COVERAGE)}function me(B){L!==B&&(B?r.frontFace(r.CW):r.frontFace(r.CCW),L=B)}function ge(B){B!==hf?(ue(r.CULL_FACE),B!==k&&(B===iu?r.cullFace(r.BACK):B===ff?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ye(r.CULL_FACE),k=B}function je(B){B!==$&&(G&&r.lineWidth(B),$=B)}function U(B,we,I){B?(ue(r.POLYGON_OFFSET_FILL),(z!==we||N!==I)&&(z=we,N=I,a.getReversed()&&(we=-we),r.polygonOffset(we,I))):ye(r.POLYGON_OFFSET_FILL)}function nt(B){B?ue(r.SCISSOR_TEST):ye(r.SCISSOR_TEST)}function Be(B){B===void 0&&(B=r.TEXTURE0+V-1),Ee!==B&&(r.activeTexture(B),Ee=B)}function Ke(B,we,I){I===void 0&&(Ee===null?I=r.TEXTURE0+V-1:I=Ee);let O=Ie[I];O===void 0&&(O={type:void 0,texture:void 0},Ie[I]=O),(O.type!==B||O.texture!==we)&&(Ee!==I&&(r.activeTexture(I),Ee=I),r.bindTexture(B,we||K[B]),O.type=B,O.texture=we)}function xe(){const B=Ie[Ee];B!==void 0&&B.type!==void 0&&(r.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function xt(){try{r.compressedTexImage2D(...arguments)}catch(B){$e("WebGLState:",B)}}function A(){try{r.compressedTexImage3D(...arguments)}catch(B){$e("WebGLState:",B)}}function M(){try{r.texSubImage2D(...arguments)}catch(B){$e("WebGLState:",B)}}function X(){try{r.texSubImage3D(...arguments)}catch(B){$e("WebGLState:",B)}}function oe(){try{r.compressedTexSubImage2D(...arguments)}catch(B){$e("WebGLState:",B)}}function _e(){try{r.compressedTexSubImage3D(...arguments)}catch(B){$e("WebGLState:",B)}}function be(){try{r.texStorage2D(...arguments)}catch(B){$e("WebGLState:",B)}}function Te(){try{r.texStorage3D(...arguments)}catch(B){$e("WebGLState:",B)}}function se(){try{r.texImage2D(...arguments)}catch(B){$e("WebGLState:",B)}}function de(){try{r.texImage3D(...arguments)}catch(B){$e("WebGLState:",B)}}function Le(B){return h[B]!==void 0?h[B]:r.getParameter(B)}function Oe(B,we){h[B]!==we&&(r.pixelStorei(B,we),h[B]=we)}function Ae(B){ce.equals(B)===!1&&(r.scissor(B.x,B.y,B.z,B.w),ce.copy(B))}function Se(B){q.equals(B)===!1&&(r.viewport(B.x,B.y,B.z,B.w),q.copy(B))}function at(B,we){let I=c.get(we);I===void 0&&(I=new WeakMap,c.set(we,I));let O=I.get(B);O===void 0&&(O=r.getUniformBlockIndex(we,B.name),I.set(B,O))}function ct(B,we){const O=c.get(we).get(B);l.get(we)!==O&&(r.uniformBlockBinding(we,O,B.__bindingPointIndex),l.set(we,O))}function vt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),u={},h={},Ee=null,Ie={},d={},f=new WeakMap,m=[],x=null,g=!1,p=null,v=null,_=null,y=null,E=null,S=null,C=null,b=new Ue(0,0,0),w=0,P=!1,L=null,k=null,$=null,z=null,N=null,ce.set(0,0,r.canvas.width,r.canvas.height),q.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ue,disable:ye,bindFramebuffer:Ve,drawBuffers:re,useProgram:he,setBlending:te,setMaterial:ae,setFlipSided:me,setCullFace:ge,setLineWidth:je,setPolygonOffset:U,setScissorTest:nt,activeTexture:Be,bindTexture:Ke,unbindTexture:xe,compressedTexImage2D:xt,compressedTexImage3D:A,texImage2D:se,texImage3D:de,pixelStorei:Oe,getParameter:Le,updateUBOMapping:at,uniformBlockBinding:ct,texStorage2D:be,texStorage3D:Te,texSubImage2D:M,texSubImage3D:X,compressedTexSubImage2D:oe,compressedTexSubImage3D:_e,scissor:Ae,viewport:Se,reset:vt}}function ZM(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new fe,u=new WeakMap,h=new Set;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,M){return m?new OffscreenCanvas(A,M):da("canvas")}function g(A,M,X){let oe=1;const _e=xt(A);if((_e.width>X||_e.height>X)&&(oe=X/Math.max(_e.width,_e.height)),oe<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const be=Math.floor(oe*_e.width),Te=Math.floor(oe*_e.height);d===void 0&&(d=x(be,Te));const se=M?x(be,Te):d;return se.width=be,se.height=Te,se.getContext("2d").drawImage(A,0,0,be,Te),Ce("WebGLRenderer: Texture has been resized from ("+_e.width+"x"+_e.height+") to ("+be+"x"+Te+")."),se}else return"data"in A&&Ce("WebGLRenderer: Image in DataTexture is too big ("+_e.width+"x"+_e.height+")."),A;return A}function p(A){return A.generateMipmaps}function v(A){r.generateMipmap(A)}function _(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(A,M,X,oe,_e,be=!1){if(A!==null){if(r[A]!==void 0)return r[A];Ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Te;oe&&(Te=e.get("EXT_texture_norm16"),Te||Ce("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let se=M;if(M===r.RED&&(X===r.FLOAT&&(se=r.R32F),X===r.HALF_FLOAT&&(se=r.R16F),X===r.UNSIGNED_BYTE&&(se=r.R8),X===r.UNSIGNED_SHORT&&Te&&(se=Te.R16_EXT),X===r.SHORT&&Te&&(se=Te.R16_SNORM_EXT)),M===r.RED_INTEGER&&(X===r.UNSIGNED_BYTE&&(se=r.R8UI),X===r.UNSIGNED_SHORT&&(se=r.R16UI),X===r.UNSIGNED_INT&&(se=r.R32UI),X===r.BYTE&&(se=r.R8I),X===r.SHORT&&(se=r.R16I),X===r.INT&&(se=r.R32I)),M===r.RG&&(X===r.FLOAT&&(se=r.RG32F),X===r.HALF_FLOAT&&(se=r.RG16F),X===r.UNSIGNED_BYTE&&(se=r.RG8),X===r.UNSIGNED_SHORT&&Te&&(se=Te.RG16_EXT),X===r.SHORT&&Te&&(se=Te.RG16_SNORM_EXT)),M===r.RG_INTEGER&&(X===r.UNSIGNED_BYTE&&(se=r.RG8UI),X===r.UNSIGNED_SHORT&&(se=r.RG16UI),X===r.UNSIGNED_INT&&(se=r.RG32UI),X===r.BYTE&&(se=r.RG8I),X===r.SHORT&&(se=r.RG16I),X===r.INT&&(se=r.RG32I)),M===r.RGB_INTEGER&&(X===r.UNSIGNED_BYTE&&(se=r.RGB8UI),X===r.UNSIGNED_SHORT&&(se=r.RGB16UI),X===r.UNSIGNED_INT&&(se=r.RGB32UI),X===r.BYTE&&(se=r.RGB8I),X===r.SHORT&&(se=r.RGB16I),X===r.INT&&(se=r.RGB32I)),M===r.RGBA_INTEGER&&(X===r.UNSIGNED_BYTE&&(se=r.RGBA8UI),X===r.UNSIGNED_SHORT&&(se=r.RGBA16UI),X===r.UNSIGNED_INT&&(se=r.RGBA32UI),X===r.BYTE&&(se=r.RGBA8I),X===r.SHORT&&(se=r.RGBA16I),X===r.INT&&(se=r.RGBA32I)),M===r.RGB&&(X===r.UNSIGNED_SHORT&&Te&&(se=Te.RGB16_EXT),X===r.SHORT&&Te&&(se=Te.RGB16_SNORM_EXT),X===r.UNSIGNED_INT_5_9_9_9_REV&&(se=r.RGB9_E5),X===r.UNSIGNED_INT_10F_11F_11F_REV&&(se=r.R11F_G11F_B10F)),M===r.RGBA){const de=be?ca:_t.getTransfer(_e);X===r.FLOAT&&(se=r.RGBA32F),X===r.HALF_FLOAT&&(se=r.RGBA16F),X===r.UNSIGNED_BYTE&&(se=de===wt?r.SRGB8_ALPHA8:r.RGBA8),X===r.UNSIGNED_SHORT&&Te&&(se=Te.RGBA16_EXT),X===r.SHORT&&Te&&(se=Te.RGBA16_SNORM_EXT),X===r.UNSIGNED_SHORT_4_4_4_4&&(se=r.RGBA4),X===r.UNSIGNED_SHORT_5_5_5_1&&(se=r.RGB5_A1)}return(se===r.R16F||se===r.R32F||se===r.RG16F||se===r.RG32F||se===r.RGBA16F||se===r.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function E(A,M){let X;return A?M===null||M===Wn||M===fr?X=r.DEPTH24_STENCIL8:M===vn?X=r.DEPTH32F_STENCIL8:M===hr&&(X=r.DEPTH24_STENCIL8,Ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Wn||M===fr?X=r.DEPTH_COMPONENT24:M===vn?X=r.DEPTH_COMPONENT32F:M===hr&&(X=r.DEPTH_COMPONENT16),X}function S(A,M){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Vt&&A.minFilter!==Dt?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function C(A){const M=A.target;M.removeEventListener("dispose",C),w(M),M.isVideoTexture&&u.delete(M),M.isHTMLTexture&&h.delete(M)}function b(A){const M=A.target;M.removeEventListener("dispose",b),L(M)}function w(A){const M=n.get(A);if(M.__webglInit===void 0)return;const X=A.source,oe=f.get(X);if(oe){const _e=oe[M.__cacheKey];_e.usedTimes--,_e.usedTimes===0&&P(A),Object.keys(oe).length===0&&f.delete(X)}n.remove(A)}function P(A){const M=n.get(A);r.deleteTexture(M.__webglTexture);const X=A.source,oe=f.get(X);delete oe[M.__cacheKey],a.memory.textures--}function L(A){const M=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(M.__webglFramebuffer[oe]))for(let _e=0;_e<M.__webglFramebuffer[oe].length;_e++)r.deleteFramebuffer(M.__webglFramebuffer[oe][_e]);else r.deleteFramebuffer(M.__webglFramebuffer[oe]);M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer[oe])}else{if(Array.isArray(M.__webglFramebuffer))for(let oe=0;oe<M.__webglFramebuffer.length;oe++)r.deleteFramebuffer(M.__webglFramebuffer[oe]);else r.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&r.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let oe=0;oe<M.__webglColorRenderbuffer.length;oe++)M.__webglColorRenderbuffer[oe]&&r.deleteRenderbuffer(M.__webglColorRenderbuffer[oe]);M.__webglDepthRenderbuffer&&r.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const X=A.textures;for(let oe=0,_e=X.length;oe<_e;oe++){const be=n.get(X[oe]);be.__webglTexture&&(r.deleteTexture(be.__webglTexture),a.memory.textures--),n.remove(X[oe])}n.remove(A)}let k=0;function $(){k=0}function z(){return k}function N(A){k=A}function V(){const A=k;return A>=i.maxTextures&&Ce("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),k+=1,A}function G(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function le(A,M){const X=n.get(A);if(A.isVideoTexture&&Ke(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&X.__version!==A.version){const oe=A.image;if(oe===null)Ce("WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)Ce("WebGLRenderer: Texture marked for update but image is incomplete");else{ye(X,A,M);return}}else A.isExternalTexture&&(X.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,X.__webglTexture,r.TEXTURE0+M)}function pe(A,M){const X=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&X.__version!==A.version){ye(X,A,M);return}else A.isExternalTexture&&(X.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,X.__webglTexture,r.TEXTURE0+M)}function Ee(A,M){const X=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&X.__version!==A.version){ye(X,A,M);return}t.bindTexture(r.TEXTURE_3D,X.__webglTexture,r.TEXTURE0+M)}function Ie(A,M){const X=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&X.__version!==A.version){Ve(X,A,M);return}t.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture,r.TEXTURE0+M)}const Fe={[na]:r.REPEAT,[Rn]:r.CLAMP_TO_EDGE,[ia]:r.MIRRORED_REPEAT},tt={[Vt]:r.NEAREST,[Ru]:r.NEAREST_MIPMAP_NEAREST,[lr]:r.NEAREST_MIPMAP_LINEAR,[Dt]:r.LINEAR,[qr]:r.LINEAR_MIPMAP_NEAREST,[_i]:r.LINEAR_MIPMAP_LINEAR},ce={[Vf]:r.NEVER,[$f]:r.ALWAYS,[Gf]:r.LESS,[Ll]:r.LEQUAL,[Hf]:r.EQUAL,[Dl]:r.GEQUAL,[Wf]:r.GREATER,[Xf]:r.NOTEQUAL};function q(A,M){if(M.type===vn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Dt||M.magFilter===qr||M.magFilter===lr||M.magFilter===_i||M.minFilter===Dt||M.minFilter===qr||M.minFilter===lr||M.minFilter===_i)&&Ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,Fe[M.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,Fe[M.wrapT]),(A===r.TEXTURE_3D||A===r.TEXTURE_2D_ARRAY)&&r.texParameteri(A,r.TEXTURE_WRAP_R,Fe[M.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,tt[M.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,tt[M.minFilter]),M.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,ce[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Vt||M.minFilter!==lr&&M.minFilter!==_i||M.type===vn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");r.texParameterf(A,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function F(A,M){let X=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",C));const oe=M.source;let _e=f.get(oe);_e===void 0&&(_e={},f.set(oe,_e));const be=G(M);if(be!==A.__cacheKey){_e[be]===void 0&&(_e[be]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,X=!0),_e[be].usedTimes++;const Te=_e[A.__cacheKey];Te!==void 0&&(_e[A.__cacheKey].usedTimes--,Te.usedTimes===0&&P(M)),A.__cacheKey=be,A.__webglTexture=_e[be].texture}return X}function K(A,M,X){return Math.floor(Math.floor(A/X)/M)}function ue(A,M,X,oe){const be=A.updateRanges;if(be.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,M.width,M.height,X,oe,M.data);else{be.sort((Oe,Ae)=>Oe.start-Ae.start);let Te=0;for(let Oe=1;Oe<be.length;Oe++){const Ae=be[Te],Se=be[Oe],at=Ae.start+Ae.count,ct=K(Se.start,M.width,4),vt=K(Ae.start,M.width,4);Se.start<=at+1&&ct===vt&&K(Se.start+Se.count-1,M.width,4)===ct?Ae.count=Math.max(Ae.count,Se.start+Se.count-Ae.start):(++Te,be[Te]=Se)}be.length=Te+1;const se=t.getParameter(r.UNPACK_ROW_LENGTH),de=t.getParameter(r.UNPACK_SKIP_PIXELS),Le=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,M.width);for(let Oe=0,Ae=be.length;Oe<Ae;Oe++){const Se=be[Oe],at=Math.floor(Se.start/4),ct=Math.ceil(Se.count/4),vt=at%M.width,B=Math.floor(at/M.width),we=ct,I=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,vt),t.pixelStorei(r.UNPACK_SKIP_ROWS,B),t.texSubImage2D(r.TEXTURE_2D,0,vt,B,we,I,X,oe,M.data)}A.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,se),t.pixelStorei(r.UNPACK_SKIP_PIXELS,de),t.pixelStorei(r.UNPACK_SKIP_ROWS,Le)}}function ye(A,M,X){let oe=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(oe=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(oe=r.TEXTURE_3D);const _e=F(A,M),be=M.source;t.bindTexture(oe,A.__webglTexture,r.TEXTURE0+X);const Te=n.get(be);if(be.version!==Te.__version||_e===!0){if(t.activeTexture(r.TEXTURE0+X),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const I=_t.getPrimaries(_t.workingColorSpace),O=M.colorSpace===Ii?null:_t.getPrimaries(M.colorSpace),W=M.colorSpace===Ii||I===O?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,W)}t.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment);let de=g(M.image,!1,i.maxTextureSize);de=xe(M,de);const Le=s.convert(M.format,M.colorSpace),Oe=s.convert(M.type);let Ae=y(M.internalFormat,Le,Oe,M.normalized,M.colorSpace,M.isVideoTexture);q(oe,M);let Se;const at=M.mipmaps,ct=M.isVideoTexture!==!0,vt=Te.__version===void 0||_e===!0,B=be.dataReady,we=S(M,de);if(M.isDepthTexture)Ae=E(M.format===Zi,M.type),vt&&(ct?t.texStorage2D(r.TEXTURE_2D,1,Ae,de.width,de.height):t.texImage2D(r.TEXTURE_2D,0,Ae,de.width,de.height,0,Le,Oe,null));else if(M.isDataTexture)if(at.length>0){ct&&vt&&t.texStorage2D(r.TEXTURE_2D,we,Ae,at[0].width,at[0].height);for(let I=0,O=at.length;I<O;I++)Se=at[I],ct?B&&t.texSubImage2D(r.TEXTURE_2D,I,0,0,Se.width,Se.height,Le,Oe,Se.data):t.texImage2D(r.TEXTURE_2D,I,Ae,Se.width,Se.height,0,Le,Oe,Se.data);M.generateMipmaps=!1}else ct?(vt&&t.texStorage2D(r.TEXTURE_2D,we,Ae,de.width,de.height),B&&ue(M,de,Le,Oe)):t.texImage2D(r.TEXTURE_2D,0,Ae,de.width,de.height,0,Le,Oe,de.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){ct&&vt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,we,Ae,at[0].width,at[0].height,de.depth);for(let I=0,O=at.length;I<O;I++)if(Se=at[I],M.format!==xn)if(Le!==null)if(ct){if(B)if(M.layerUpdates.size>0){const W=vu(Se.width,Se.height,M.format,M.type);for(const j of M.layerUpdates){const ve=Se.data.subarray(j*W/Se.data.BYTES_PER_ELEMENT,(j+1)*W/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,I,0,0,j,Se.width,Se.height,1,Le,ve)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,I,0,0,0,Se.width,Se.height,de.depth,Le,Se.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,I,Ae,Se.width,Se.height,de.depth,0,Se.data,0,0);else Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ct?B&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,I,0,0,0,Se.width,Se.height,de.depth,Le,Oe,Se.data):t.texImage3D(r.TEXTURE_2D_ARRAY,I,Ae,Se.width,Se.height,de.depth,0,Le,Oe,Se.data)}else{ct&&vt&&t.texStorage2D(r.TEXTURE_2D,we,Ae,at[0].width,at[0].height);for(let I=0,O=at.length;I<O;I++)Se=at[I],M.format!==xn?Le!==null?ct?B&&t.compressedTexSubImage2D(r.TEXTURE_2D,I,0,0,Se.width,Se.height,Le,Se.data):t.compressedTexImage2D(r.TEXTURE_2D,I,Ae,Se.width,Se.height,0,Se.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ct?B&&t.texSubImage2D(r.TEXTURE_2D,I,0,0,Se.width,Se.height,Le,Oe,Se.data):t.texImage2D(r.TEXTURE_2D,I,Ae,Se.width,Se.height,0,Le,Oe,Se.data)}else if(M.isDataArrayTexture)if(ct){if(vt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,we,Ae,de.width,de.height,de.depth),B)if(M.layerUpdates.size>0){const I=vu(de.width,de.height,M.format,M.type);for(const O of M.layerUpdates){const W=de.data.subarray(O*I/de.data.BYTES_PER_ELEMENT,(O+1)*I/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,O,de.width,de.height,1,Le,Oe,W)}M.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,Le,Oe,de.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ae,de.width,de.height,de.depth,0,Le,Oe,de.data);else if(M.isData3DTexture)ct?(vt&&t.texStorage3D(r.TEXTURE_3D,we,Ae,de.width,de.height,de.depth),B&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,Le,Oe,de.data)):t.texImage3D(r.TEXTURE_3D,0,Ae,de.width,de.height,de.depth,0,Le,Oe,de.data);else if(M.isFramebufferTexture){if(vt)if(ct)t.texStorage2D(r.TEXTURE_2D,we,Ae,de.width,de.height);else{let I=de.width,O=de.height;for(let W=0;W<we;W++)t.texImage2D(r.TEXTURE_2D,W,Ae,I,O,0,Le,Oe,null),I>>=1,O>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in r){const I=r.canvas;if(I.hasAttribute("layoutsubtree")||I.setAttribute("layoutsubtree","true"),de.parentNode!==I){I.appendChild(de),h.add(M),I.onpaint=Pe=>{const it=Pe.changedElements;for(const Qe of h)it.includes(Qe.image)&&(Qe.needsUpdate=!0)},I.requestPaint();return}const O=0,W=r.RGBA,j=r.RGBA,ve=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,O,W,j,ve,de),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(at.length>0){if(ct&&vt){const I=xt(at[0]);t.texStorage2D(r.TEXTURE_2D,we,Ae,I.width,I.height)}for(let I=0,O=at.length;I<O;I++)Se=at[I],ct?B&&t.texSubImage2D(r.TEXTURE_2D,I,0,0,Le,Oe,Se):t.texImage2D(r.TEXTURE_2D,I,Ae,Le,Oe,Se);M.generateMipmaps=!1}else if(ct){if(vt){const I=xt(de);t.texStorage2D(r.TEXTURE_2D,we,Ae,I.width,I.height)}B&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Le,Oe,de)}else t.texImage2D(r.TEXTURE_2D,0,Ae,Le,Oe,de);p(M)&&v(oe),Te.__version=be.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function Ve(A,M,X){if(M.image.length!==6)return;const oe=F(A,M),_e=M.source;t.bindTexture(r.TEXTURE_CUBE_MAP,A.__webglTexture,r.TEXTURE0+X);const be=n.get(_e);if(_e.version!==be.__version||oe===!0){t.activeTexture(r.TEXTURE0+X);const Te=_t.getPrimaries(_t.workingColorSpace),se=M.colorSpace===Ii?null:_t.getPrimaries(M.colorSpace),de=M.colorSpace===Ii||Te===se?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Le=M.isCompressedTexture||M.image[0].isCompressedTexture,Oe=M.image[0]&&M.image[0].isDataTexture,Ae=[];for(let j=0;j<6;j++)!Le&&!Oe?Ae[j]=g(M.image[j],!0,i.maxCubemapSize):Ae[j]=Oe?M.image[j].image:M.image[j],Ae[j]=xe(M,Ae[j]);const Se=Ae[0],at=s.convert(M.format,M.colorSpace),ct=s.convert(M.type),vt=y(M.internalFormat,at,ct,M.normalized,M.colorSpace),B=M.isVideoTexture!==!0,we=be.__version===void 0||oe===!0,I=_e.dataReady;let O=S(M,Se);q(r.TEXTURE_CUBE_MAP,M);let W;if(Le){B&&we&&t.texStorage2D(r.TEXTURE_CUBE_MAP,O,vt,Se.width,Se.height);for(let j=0;j<6;j++){W=Ae[j].mipmaps;for(let ve=0;ve<W.length;ve++){const Pe=W[ve];M.format!==xn?at!==null?B?I&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve,0,0,Pe.width,Pe.height,at,Pe.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve,vt,Pe.width,Pe.height,0,Pe.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?I&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve,0,0,Pe.width,Pe.height,at,ct,Pe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve,vt,Pe.width,Pe.height,0,at,ct,Pe.data)}}}else{if(W=M.mipmaps,B&&we){W.length>0&&O++;const j=xt(Ae[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,O,vt,j.width,j.height)}for(let j=0;j<6;j++)if(Oe){B?I&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ae[j].width,Ae[j].height,at,ct,Ae[j].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,vt,Ae[j].width,Ae[j].height,0,at,ct,Ae[j].data);for(let ve=0;ve<W.length;ve++){const it=W[ve].image[j].image;B?I&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve+1,0,0,it.width,it.height,at,ct,it.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve+1,vt,it.width,it.height,0,at,ct,it.data)}}else{B?I&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,at,ct,Ae[j]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,vt,at,ct,Ae[j]);for(let ve=0;ve<W.length;ve++){const Pe=W[ve];B?I&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve+1,0,0,at,ct,Pe.image[j]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve+1,vt,at,ct,Pe.image[j])}}}p(M)&&v(r.TEXTURE_CUBE_MAP),be.__version=_e.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function re(A,M,X,oe,_e,be){const Te=s.convert(X.format,X.colorSpace),se=s.convert(X.type),de=y(X.internalFormat,Te,se,X.normalized,X.colorSpace),Le=n.get(M),Oe=n.get(X);if(Oe.__renderTarget=M,!Le.__hasExternalTextures){const Ae=Math.max(1,M.width>>be),Se=Math.max(1,M.height>>be);_e===r.TEXTURE_3D||_e===r.TEXTURE_2D_ARRAY?t.texImage3D(_e,be,de,Ae,Se,M.depth,0,Te,se,null):t.texImage2D(_e,be,de,Ae,Se,0,Te,se,null)}t.bindFramebuffer(r.FRAMEBUFFER,A),Be(M)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,oe,_e,Oe.__webglTexture,0,nt(M)):(_e===r.TEXTURE_2D||_e>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&_e<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,oe,_e,Oe.__webglTexture,be),t.bindFramebuffer(r.FRAMEBUFFER,null)}function he(A,M,X){if(r.bindRenderbuffer(r.RENDERBUFFER,A),M.depthBuffer){const oe=M.depthTexture,_e=oe&&oe.isDepthTexture?oe.type:null,be=E(M.stencilBuffer,_e),Te=M.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Be(M)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,nt(M),be,M.width,M.height):X?r.renderbufferStorageMultisample(r.RENDERBUFFER,nt(M),be,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,be,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Te,r.RENDERBUFFER,A)}else{const oe=M.textures;for(let _e=0;_e<oe.length;_e++){const be=oe[_e],Te=s.convert(be.format,be.colorSpace),se=s.convert(be.type),de=y(be.internalFormat,Te,se,be.normalized,be.colorSpace);Be(M)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,nt(M),de,M.width,M.height):X?r.renderbufferStorageMultisample(r.RENDERBUFFER,nt(M),de,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,de,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ne(A,M,X){const oe=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const _e=n.get(M.depthTexture);if(_e.__renderTarget=M,(!_e.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),oe){if(_e.__webglInit===void 0&&(_e.__webglInit=!0,M.depthTexture.addEventListener("dispose",C)),_e.__webglTexture===void 0){_e.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,_e.__webglTexture),q(r.TEXTURE_CUBE_MAP,M.depthTexture);const Le=s.convert(M.depthTexture.format),Oe=s.convert(M.depthTexture.type);let Ae;M.depthTexture.format===Mi?Ae=r.DEPTH_COMPONENT24:M.depthTexture.format===Zi&&(Ae=r.DEPTH24_STENCIL8);for(let Se=0;Se<6;Se++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,Ae,M.width,M.height,0,Le,Oe,null)}}else le(M.depthTexture,0);const be=_e.__webglTexture,Te=nt(M),se=oe?r.TEXTURE_CUBE_MAP_POSITIVE_X+X:r.TEXTURE_2D,de=M.depthTexture.format===Zi?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(M.depthTexture.format===Mi)Be(M)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,de,se,be,0,Te):r.framebufferTexture2D(r.FRAMEBUFFER,de,se,be,0);else if(M.depthTexture.format===Zi)Be(M)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,de,se,be,0,Te):r.framebufferTexture2D(r.FRAMEBUFFER,de,se,be,0);else throw new Error("Unknown depthTexture format")}function ie(A){const M=n.get(A),X=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const oe=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),oe){const _e=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,oe.removeEventListener("dispose",_e)};oe.addEventListener("dispose",_e),M.__depthDisposeCallback=_e}M.__boundDepthTexture=oe}if(A.depthTexture&&!M.__autoAllocateDepthBuffer)if(X)for(let oe=0;oe<6;oe++)ne(M.__webglFramebuffer[oe],A,oe);else{const oe=A.texture.mipmaps;oe&&oe.length>0?ne(M.__webglFramebuffer[0],A,0):ne(M.__webglFramebuffer,A,0)}else if(X){M.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[oe]),M.__webglDepthbuffer[oe]===void 0)M.__webglDepthbuffer[oe]=r.createRenderbuffer(),he(M.__webglDepthbuffer[oe],A,!1);else{const _e=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,be=M.__webglDepthbuffer[oe];r.bindRenderbuffer(r.RENDERBUFFER,be),r.framebufferRenderbuffer(r.FRAMEBUFFER,_e,r.RENDERBUFFER,be)}}else{const oe=A.texture.mipmaps;if(oe&&oe.length>0?t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=r.createRenderbuffer(),he(M.__webglDepthbuffer,A,!1);else{const _e=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,be=M.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,be),r.framebufferRenderbuffer(r.FRAMEBUFFER,_e,r.RENDERBUFFER,be)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function te(A,M,X){const oe=n.get(A);M!==void 0&&re(oe.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),X!==void 0&&ie(A)}function ae(A){const M=A.texture,X=n.get(A),oe=n.get(M);A.addEventListener("dispose",b);const _e=A.textures,be=A.isWebGLCubeRenderTarget===!0,Te=_e.length>1;if(Te||(oe.__webglTexture===void 0&&(oe.__webglTexture=r.createTexture()),oe.__version=M.version,a.memory.textures++),be){X.__webglFramebuffer=[];for(let se=0;se<6;se++)if(M.mipmaps&&M.mipmaps.length>0){X.__webglFramebuffer[se]=[];for(let de=0;de<M.mipmaps.length;de++)X.__webglFramebuffer[se][de]=r.createFramebuffer()}else X.__webglFramebuffer[se]=r.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){X.__webglFramebuffer=[];for(let se=0;se<M.mipmaps.length;se++)X.__webglFramebuffer[se]=r.createFramebuffer()}else X.__webglFramebuffer=r.createFramebuffer();if(Te)for(let se=0,de=_e.length;se<de;se++){const Le=n.get(_e[se]);Le.__webglTexture===void 0&&(Le.__webglTexture=r.createTexture(),a.memory.textures++)}if(A.samples>0&&Be(A)===!1){X.__webglMultisampledFramebuffer=r.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let se=0;se<_e.length;se++){const de=_e[se];X.__webglColorRenderbuffer[se]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,X.__webglColorRenderbuffer[se]);const Le=s.convert(de.format,de.colorSpace),Oe=s.convert(de.type),Ae=y(de.internalFormat,Le,Oe,de.normalized,de.colorSpace,A.isXRRenderTarget===!0),Se=nt(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Se,Ae,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+se,r.RENDERBUFFER,X.__webglColorRenderbuffer[se])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(X.__webglDepthRenderbuffer=r.createRenderbuffer(),he(X.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(be){t.bindTexture(r.TEXTURE_CUBE_MAP,oe.__webglTexture),q(r.TEXTURE_CUBE_MAP,M);for(let se=0;se<6;se++)if(M.mipmaps&&M.mipmaps.length>0)for(let de=0;de<M.mipmaps.length;de++)re(X.__webglFramebuffer[se][de],A,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+se,de);else re(X.__webglFramebuffer[se],A,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);p(M)&&v(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let se=0,de=_e.length;se<de;se++){const Le=_e[se],Oe=n.get(Le);let Ae=r.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Ae=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Ae,Oe.__webglTexture),q(Ae,Le),re(X.__webglFramebuffer,A,Le,r.COLOR_ATTACHMENT0+se,Ae,0),p(Le)&&v(Ae)}t.unbindTexture()}else{let se=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(se=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(se,oe.__webglTexture),q(se,M),M.mipmaps&&M.mipmaps.length>0)for(let de=0;de<M.mipmaps.length;de++)re(X.__webglFramebuffer[de],A,M,r.COLOR_ATTACHMENT0,se,de);else re(X.__webglFramebuffer,A,M,r.COLOR_ATTACHMENT0,se,0);p(M)&&v(se),t.unbindTexture()}A.depthBuffer&&ie(A)}function me(A){const M=A.textures;for(let X=0,oe=M.length;X<oe;X++){const _e=M[X];if(p(_e)){const be=_(A),Te=n.get(_e).__webglTexture;t.bindTexture(be,Te),v(be),t.unbindTexture()}}}const ge=[],je=[];function U(A){if(A.samples>0){if(Be(A)===!1){const M=A.textures,X=A.width,oe=A.height;let _e=r.COLOR_BUFFER_BIT;const be=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Te=n.get(A),se=M.length>1;if(se)for(let Le=0;Le<M.length;Le++)t.bindFramebuffer(r.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Te.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);const de=A.texture.mipmaps;de&&de.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Le=0;Le<M.length;Le++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(_e|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(_e|=r.STENCIL_BUFFER_BIT)),se){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Te.__webglColorRenderbuffer[Le]);const Oe=n.get(M[Le]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Oe,0)}r.blitFramebuffer(0,0,X,oe,0,0,X,oe,_e,r.NEAREST),l===!0&&(ge.length=0,je.length=0,ge.push(r.COLOR_ATTACHMENT0+Le),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ge.push(be),je.push(be),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,je)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ge))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),se)for(let Le=0;Le<M.length;Le++){t.bindFramebuffer(r.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.RENDERBUFFER,Te.__webglColorRenderbuffer[Le]);const Oe=n.get(M[Le]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Te.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.TEXTURE_2D,Oe,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const M=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[M])}}}function nt(A){return Math.min(i.maxSamples,A.samples)}function Be(A){const M=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ke(A){const M=a.render.frame;u.get(A)!==M&&(u.set(A,M),A.update())}function xe(A,M){const X=A.colorSpace,oe=A.format,_e=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||X!==la&&X!==Ii&&(_t.getTransfer(X)===wt?(oe!==xn||_e!==En)&&Ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$e("WebGLTextures: Unsupported texture color space:",X)),M}function xt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=$,this.getTextureUnits=z,this.setTextureUnits=N,this.setTexture2D=le,this.setTexture2DArray=pe,this.setTexture3D=Ee,this.setTextureCube=Ie,this.rebindTextures=te,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=me,this.updateMultisampleRenderTarget=U,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=re,this.useMultisampledRTT=Be,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function tm(r,e){function t(n,i=Ii){let s;const a=_t.getTransfer(i);if(n===En)return r.UNSIGNED_BYTE;if(n===Tl)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Al)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Lu)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Du)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Iu)return r.BYTE;if(n===Pu)return r.SHORT;if(n===hr)return r.UNSIGNED_SHORT;if(n===El)return r.INT;if(n===Wn)return r.UNSIGNED_INT;if(n===vn)return r.FLOAT;if(n===bi)return r.HALF_FLOAT;if(n===Uu)return r.ALPHA;if(n===Nu)return r.RGB;if(n===xn)return r.RGBA;if(n===Mi)return r.DEPTH_COMPONENT;if(n===Zi)return r.DEPTH_STENCIL;if(n===Cl)return r.RED;if(n===ba)return r.RED_INTEGER;if(n===Qi)return r.RG;if(n===Rl)return r.RG_INTEGER;if(n===Il)return r.RGBA_INTEGER;if(n===Yr||n===Zr||n===Jr||n===Kr)if(a===wt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Yr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Zr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Kr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Yr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Zr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Jr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Kr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ko||n===Bo||n===zo||n===Vo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ko)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Bo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===zo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Vo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Go||n===Ho||n===Wo||n===Xo||n===$o||n===sa||n===qo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Go||n===Ho)return a===wt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Wo)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Xo)return s.COMPRESSED_R11_EAC;if(n===$o)return s.COMPRESSED_SIGNED_R11_EAC;if(n===sa)return s.COMPRESSED_RG11_EAC;if(n===qo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Yo||n===Zo||n===Jo||n===Ko||n===jo||n===Qo||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===al||n===ol)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Yo)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Zo)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Jo)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ko)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===jo)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Qo)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===el)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===tl)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===nl)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===il)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===sl)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===rl)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===al)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ol)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ll||n===cl||n===ul)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===ll)return a===wt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===cl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ul)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===dl||n===hl||n===ra||n===fl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===dl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===hl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ra)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===fl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===fr?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const JM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,KM=`
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

}`;class jM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Xu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Vn({vertexShader:JM,fragmentShader:KM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new At(new wr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class QM extends ri{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,m=null;const x=typeof XRWebGLBinding<"u",g=new jM,p={},v=t.getContextAttributes();let _=null,y=null;const E=[],S=[],C=new fe;let b=null;const w=new Kt;w.viewport=new yt;const P=new Kt;P.viewport=new yt;const L=[w,P],k=new Gp;let $=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(F){let K=E[F];return K===void 0&&(K=new To,E[F]=K),K.getTargetRaySpace()},this.getControllerGrip=function(F){let K=E[F];return K===void 0&&(K=new To,E[F]=K),K.getGripSpace()},this.getHand=function(F){let K=E[F];return K===void 0&&(K=new To,E[F]=K),K.getHandSpace()};function N(F){const K=S.indexOf(F.inputSource);if(K===-1)return;const ue=E[K];ue!==void 0&&(ue.update(F.inputSource,F.frame,c||a),ue.dispatchEvent({type:F.type,data:F.inputSource}))}function V(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",G);for(let F=0;F<E.length;F++){const K=S[F];K!==null&&(S[F]=null,E[F].disconnect(K))}$=null,z=null,g.reset();for(const F in p)delete p[F];e.setRenderTarget(_),f=null,d=null,h=null,i=null,y=null,q.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(F){s=F,n.isPresenting===!0&&Ce("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(F){o=F,n.isPresenting===!0&&Ce("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(F){c=F},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(i,t)),h},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(F){if(i=F,i!==null){if(_=e.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",V),i.addEventListener("inputsourceschange",G),v.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,ye=null,Ve=null;v.depth&&(Ve=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=v.stencil?Zi:Mi,ye=v.stencil?fr:Wn);const re={colorFormat:t.RGBA8,depthFormat:Ve,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(re),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new zn(d.textureWidth,d.textureHeight,{format:xn,type:En,depthTexture:new Ps(d.textureWidth,d.textureHeight,ye,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ue={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,ue),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new zn(f.framebufferWidth,f.framebufferHeight,{format:xn,type:En,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),q.setContext(i),q.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function G(F){for(let K=0;K<F.removed.length;K++){const ue=F.removed[K],ye=S.indexOf(ue);ye>=0&&(S[ye]=null,E[ye].disconnect(ue))}for(let K=0;K<F.added.length;K++){const ue=F.added[K];let ye=S.indexOf(ue);if(ye===-1){for(let re=0;re<E.length;re++)if(re>=S.length){S.push(ue),ye=re;break}else if(S[re]===null){S[re]=ue,ye=re;break}if(ye===-1)break}const Ve=E[ye];Ve&&Ve.connect(ue)}}const le=new R,pe=new R;function Ee(F,K,ue){le.setFromMatrixPosition(K.matrixWorld),pe.setFromMatrixPosition(ue.matrixWorld);const ye=le.distanceTo(pe),Ve=K.projectionMatrix.elements,re=ue.projectionMatrix.elements,he=Ve[14]/(Ve[10]-1),ne=Ve[14]/(Ve[10]+1),ie=(Ve[9]+1)/Ve[5],te=(Ve[9]-1)/Ve[5],ae=(Ve[8]-1)/Ve[0],me=(re[8]+1)/re[0],ge=he*ae,je=he*me,U=ye/(-ae+me),nt=U*-ae;if(K.matrixWorld.decompose(F.position,F.quaternion,F.scale),F.translateX(nt),F.translateZ(U),F.matrixWorld.compose(F.position,F.quaternion,F.scale),F.matrixWorldInverse.copy(F.matrixWorld).invert(),Ve[10]===-1)F.projectionMatrix.copy(K.projectionMatrix),F.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const Be=he+U,Ke=ne+U,xe=ge-nt,xt=je+(ye-nt),A=ie*ne/Ke*Be,M=te*ne/Ke*Be;F.projectionMatrix.makePerspective(xe,xt,A,M,Be,Ke),F.projectionMatrixInverse.copy(F.projectionMatrix).invert()}}function Ie(F,K){K===null?F.matrixWorld.copy(F.matrix):F.matrixWorld.multiplyMatrices(K.matrixWorld,F.matrix),F.matrixWorldInverse.copy(F.matrixWorld).invert()}this.updateCamera=function(F){if(i===null)return;let K=F.near,ue=F.far;g.texture!==null&&(g.depthNear>0&&(K=g.depthNear),g.depthFar>0&&(ue=g.depthFar)),k.near=P.near=w.near=K,k.far=P.far=w.far=ue,($!==k.near||z!==k.far)&&(i.updateRenderState({depthNear:k.near,depthFar:k.far}),$=k.near,z=k.far),k.layers.mask=F.layers.mask|6,w.layers.mask=k.layers.mask&-5,P.layers.mask=k.layers.mask&-3;const ye=F.parent,Ve=k.cameras;Ie(k,ye);for(let re=0;re<Ve.length;re++)Ie(Ve[re],ye);Ve.length===2?Ee(k,w,P):k.projectionMatrix.copy(w.projectionMatrix),Fe(F,k,ye)};function Fe(F,K,ue){ue===null?F.matrix.copy(K.matrixWorld):(F.matrix.copy(ue.matrixWorld),F.matrix.invert(),F.matrix.multiply(K.matrixWorld)),F.matrix.decompose(F.position,F.quaternion,F.scale),F.updateMatrixWorld(!0),F.projectionMatrix.copy(K.projectionMatrix),F.projectionMatrixInverse.copy(K.projectionMatrixInverse),F.isPerspectiveCamera&&(F.fov=pr*2*Math.atan(1/F.projectionMatrix.elements[5]),F.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(F){l=F,d!==null&&(d.fixedFoveation=F),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=F)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(k)},this.getCameraTexture=function(F){return p[F]};let tt=null;function ce(F,K){if(u=K.getViewerPose(c||a),m=K,u!==null){const ue=u.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let ye=!1;ue.length!==k.cameras.length&&(k.cameras.length=0,ye=!0);for(let ne=0;ne<ue.length;ne++){const ie=ue[ne];let te=null;if(f!==null)te=f.getViewport(ie);else{const me=h.getViewSubImage(d,ie);te=me.viewport,ne===0&&(e.setRenderTargetTextures(y,me.colorTexture,me.depthStencilTexture),e.setRenderTarget(y))}let ae=L[ne];ae===void 0&&(ae=new Kt,ae.layers.enable(ne),ae.viewport=new yt,L[ne]=ae),ae.matrix.fromArray(ie.transform.matrix),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.projectionMatrix.fromArray(ie.projectionMatrix),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert(),ae.viewport.set(te.x,te.y,te.width,te.height),ne===0&&(k.matrix.copy(ae.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),ye===!0&&k.cameras.push(ae)}const Ve=i.enabledFeatures;if(Ve&&Ve.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){h=n.getBinding();const ne=h.getDepthInformation(ue[0]);ne&&ne.isValid&&ne.texture&&g.init(ne,i.renderState)}if(Ve&&Ve.includes("camera-access")&&x){e.state.unbindTexture(),h=n.getBinding();for(let ne=0;ne<ue.length;ne++){const ie=ue[ne].camera;if(ie){let te=p[ie];te||(te=new Xu,p[ie]=te);const ae=h.getCameraImage(ie);te.sourceTexture=ae}}}}for(let ue=0;ue<E.length;ue++){const ye=S[ue],Ve=E[ue];ye!==null&&Ve!==void 0&&Ve.update(ye,K,c||a)}tt&&tt(F,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),m=null}const q=new Zp;q.setAnimationLoop(ce),this.setAnimationLoop=function(F){tt=F},this.dispose=function(){}}}const eS=new rt,nm=new ot;nm.set(-1,0,0,0,1,0,0,0,1);function tS(r,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,xp(r)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,v,_,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(g,p):p.isMeshLambertMaterial?(s(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(g,p),h(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),x(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,v,_):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===yn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===yn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const v=e.get(p),_=v.envMap,y=v.envMapRotation;_&&(g.envMap.value=_,g.envMapRotation.value.setFromMatrix4(eS.makeRotationFromEuler(y)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(nm),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,v,_){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=_*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===yn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){const v=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function nS(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,_){const y=_.program;n.uniformBlockBinding(v,y)}function c(v,_){let y=i[v.id];y===void 0&&(m(v),y=u(v),i[v.id]=y,v.addEventListener("dispose",g));const E=_.program;n.updateUBOMapping(v,E);const S=e.render.frame;s[v.id]!==S&&(d(v),s[v.id]=S)}function u(v){const _=h();v.__bindingPointIndex=_;const y=r.createBuffer(),E=v.__size,S=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,E,S),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,_,y),y}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return $e("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const _=i[v.id],y=v.uniforms,E=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,_);for(let S=0,C=y.length;S<C;S++){const b=Array.isArray(y[S])?y[S]:[y[S]];for(let w=0,P=b.length;w<P;w++){const L=b[w];if(f(L,S,w,E)===!0){const k=L.__offset,$=Array.isArray(L.value)?L.value:[L.value];let z=0;for(let N=0;N<$.length;N++){const V=$[N],G=x(V);typeof V=="number"||typeof V=="boolean"?(L.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,k+z,L.__data)):V.isMatrix3?(L.__data[0]=V.elements[0],L.__data[1]=V.elements[1],L.__data[2]=V.elements[2],L.__data[3]=0,L.__data[4]=V.elements[3],L.__data[5]=V.elements[4],L.__data[6]=V.elements[5],L.__data[7]=0,L.__data[8]=V.elements[6],L.__data[9]=V.elements[7],L.__data[10]=V.elements[8],L.__data[11]=0):ArrayBuffer.isView(V)?L.__data.set(new V.constructor(V.buffer,V.byteOffset,L.__data.length)):(V.toArray(L.__data,z),z+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(v,_,y,E){const S=v.value,C=_+"_"+y;if(E[C]===void 0)return typeof S=="number"||typeof S=="boolean"?E[C]=S:ArrayBuffer.isView(S)?E[C]=S.slice():E[C]=S.clone(),!0;{const b=E[C];if(typeof S=="number"||typeof S=="boolean"){if(b!==S)return E[C]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(b.equals(S)===!1)return b.copy(S),!0}}return!1}function m(v){const _=v.uniforms;let y=0;const E=16;for(let C=0,b=_.length;C<b;C++){const w=Array.isArray(_[C])?_[C]:[_[C]];for(let P=0,L=w.length;P<L;P++){const k=w[P],$=Array.isArray(k.value)?k.value:[k.value];for(let z=0,N=$.length;z<N;z++){const V=$[z],G=x(V),le=y%E,pe=le%G.boundary,Ee=le+pe;y+=pe,Ee!==0&&E-Ee<G.storage&&(y+=E-Ee),k.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=G.storage}}}const S=y%E;return S>0&&(y+=E-S),v.__size=y,v.__cache={},this}function x(v){const _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?Ce("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(_.boundary=16,_.storage=v.byteLength):Ce("WebGLRenderer: Unsupported uniform value type.",v),_}function g(v){const _=v.target;_.removeEventListener("dispose",g);const y=a.indexOf(_.__bindingPointIndex);a.splice(y,1),r.deleteBuffer(i[_.id]),delete i[_.id],delete s[_.id]}function p(){for(const v in i)r.deleteBuffer(i[v]);a=[],i={},s={}}return{bind:l,update:c,dispose:p}}const iS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let hi=null;function sS(){return hi===null&&(hi=new ii(iS,16,16,Qi,bi),hi.name="DFG_LUT",hi.minFilter=Dt,hi.magFilter=Dt,hi.wrapS=Rn,hi.wrapT=Rn,hi.generateMipmaps=!1,hi.needsUpdate=!0),hi}class im{constructor(e={}){const{canvas:t=Yf(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:f=En}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const x=f,g=new Set([Il,Rl,ba]),p=new Set([En,Wn,hr,fr,Tl,Al]),v=new Uint32Array(4),_=new Int32Array(4),y=new R;let E=null,S=null;const C=[],b=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ni,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let L=!1,k=null;this._outputColorSpace=wn;let $=0,z=0,N=null,V=-1,G=null;const le=new yt,pe=new yt;let Ee=null;const Ie=new Ue(0);let Fe=0,tt=t.width,ce=t.height,q=1,F=null,K=null;const ue=new yt(0,0,tt,ce),ye=new yt(0,0,tt,ce);let Ve=!1;const re=new br;let he=!1,ne=!1;const ie=new rt,te=new R,ae=new yt,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ge=!1;function je(){return N===null?q:1}let U=n;function nt(T,H){return t.getContext(T,H)}try{const T={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Sl}`),t.addEventListener("webglcontextlost",j,!1),t.addEventListener("webglcontextrestored",ve,!1),t.addEventListener("webglcontextcreationerror",Pe,!1),U===null){const H="webgl2";if(U=nt(H,T),U===null)throw nt(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw $e("WebGLRenderer: "+T.message),T}let Be,Ke,xe,xt,A,M,X,oe,_e,be,Te,se,de,Le,Oe,Ae,Se,at,ct,vt,B,we,I;function O(){Be=new rb(U),Be.init(),B=new tm(U,Be),Ke=new Ky(U,Be,e,B),xe=new YM(U,Be),Ke.reversedDepthBuffer&&d&&xe.buffers.depth.setReversed(!0),xt=new lb(U),A=new UM,M=new ZM(U,Be,xe,A,Ke,B,xt),X=new sb(P),oe=new hv(U),we=new Zy(U,oe),_e=new ab(U,oe,xt,we),be=new ub(U,_e,oe,we,xt),at=new cb(U,Ke,M),Oe=new jy(A),Te=new DM(P,X,Be,Ke,we,Oe),se=new tS(P,A),de=new FM,Le=new GM(Be),Se=new Yy(P,X,xe,be,m,l),Ae=new qM(P,be,Ke),I=new nS(U,xt,Ke,xe),ct=new Jy(U,Be,xt),vt=new ob(U,Be,xt),xt.programs=Te.programs,P.capabilities=Ke,P.extensions=Be,P.properties=A,P.renderLists=de,P.shadowMap=Ae,P.state=xe,P.info=xt}O(),x!==En&&(w=new hb(x,t.width,t.height,i,s));const W=new QM(P,U);this.xr=W,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const T=Be.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Be.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(T){T!==void 0&&(q=T,this.setSize(tt,ce,!1))},this.getSize=function(T){return T.set(tt,ce)},this.setSize=function(T,H,ee=!0){if(W.isPresenting){Ce("WebGLRenderer: Can't change size while VR device is presenting.");return}tt=T,ce=H,t.width=Math.floor(T*q),t.height=Math.floor(H*q),ee===!0&&(t.style.width=T+"px",t.style.height=H+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,T,H)},this.getDrawingBufferSize=function(T){return T.set(tt*q,ce*q).floor()},this.setDrawingBufferSize=function(T,H,ee){tt=T,ce=H,q=ee,t.width=Math.floor(T*ee),t.height=Math.floor(H*ee),this.setViewport(0,0,T,H)},this.setEffects=function(T){if(x===En){$e("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let H=0;H<T.length;H++)if(T[H].isOutputPass===!0){Ce("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(le)},this.getViewport=function(T){return T.copy(ue)},this.setViewport=function(T,H,ee,Z){T.isVector4?ue.set(T.x,T.y,T.z,T.w):ue.set(T,H,ee,Z),xe.viewport(le.copy(ue).multiplyScalar(q).round())},this.getScissor=function(T){return T.copy(ye)},this.setScissor=function(T,H,ee,Z){T.isVector4?ye.set(T.x,T.y,T.z,T.w):ye.set(T,H,ee,Z),xe.scissor(pe.copy(ye).multiplyScalar(q).round())},this.getScissorTest=function(){return Ve},this.setScissorTest=function(T){xe.setScissorTest(Ve=T)},this.setOpaqueSort=function(T){F=T},this.setTransparentSort=function(T){K=T},this.getClearColor=function(T){return T.copy(Se.getClearColor())},this.setClearColor=function(){Se.setClearColor(...arguments)},this.getClearAlpha=function(){return Se.getClearAlpha()},this.setClearAlpha=function(){Se.setClearAlpha(...arguments)},this.clear=function(T=!0,H=!0,ee=!0){let Z=0;if(T){let J=!1;if(N!==null){const Ne=N.texture.format;J=g.has(Ne)}if(J){const Ne=N.texture.type,Ge=p.has(Ne),De=Se.getClearColor(),qe=Se.getClearAlpha(),Ye=De.r,dt=De.g,pt=De.b;Ge?(v[0]=Ye,v[1]=dt,v[2]=pt,v[3]=qe,U.clearBufferuiv(U.COLOR,0,v)):(_[0]=Ye,_[1]=dt,_[2]=pt,_[3]=qe,U.clearBufferiv(U.COLOR,0,_))}else Z|=U.COLOR_BUFFER_BIT}H&&(Z|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ee&&(Z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&U.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),k=T},this.dispose=function(){t.removeEventListener("webglcontextlost",j,!1),t.removeEventListener("webglcontextrestored",ve,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),Se.dispose(),de.dispose(),Le.dispose(),A.dispose(),X.dispose(),be.dispose(),we.dispose(),I.dispose(),Te.dispose(),W.dispose(),W.removeEventListener("sessionstart",Ht),W.removeEventListener("sessionend",Pn),rn.stop()};function j(T){T.preventDefault(),ha("WebGLRenderer: Context Lost."),L=!0}function ve(){ha("WebGLRenderer: Context Restored."),L=!1;const T=xt.autoReset,H=Ae.enabled,ee=Ae.autoUpdate,Z=Ae.needsUpdate,J=Ae.type;O(),xt.autoReset=T,Ae.enabled=H,Ae.autoUpdate=ee,Ae.needsUpdate=Z,Ae.type=J}function Pe(T){$e("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function it(T){const H=T.target;H.removeEventListener("dispose",it),Qe(H)}function Qe(T){He(T),A.remove(T)}function He(T){const H=A.get(T).programs;H!==void 0&&(H.forEach(function(ee){Te.releaseProgram(ee)}),T.isShaderMaterial&&Te.releaseShaderCache(T))}this.renderBufferDirect=function(T,H,ee,Z,J,Ne){H===null&&(H=me);const Ge=J.isMesh&&J.matrixWorld.determinant()<0,De=cm(T,H,ee,Z,J);xe.setMaterial(Z,Ge);let qe=ee.index,Ye=1;if(Z.wireframe===!0){if(qe=_e.getWireframeAttribute(ee),qe===void 0)return;Ye=2}const dt=ee.drawRange,pt=ee.attributes.position;let Ze=dt.start*Ye,Et=(dt.start+dt.count)*Ye;Ne!==null&&(Ze=Math.max(Ze,Ne.start*Ye),Et=Math.min(Et,(Ne.start+Ne.count)*Ye)),qe!==null?(Ze=Math.max(Ze,0),Et=Math.min(Et,qe.count)):pt!=null&&(Ze=Math.max(Ze,0),Et=Math.min(Et,pt.count));const kt=Et-Ze;if(kt<0||kt===1/0)return;we.setup(J,Z,De,ee,qe);let Ft,Rt=ct;if(qe!==null&&(Ft=oe.get(qe),Rt=vt,Rt.setIndex(Ft)),J.isMesh)Z.wireframe===!0?(xe.setLineWidth(Z.wireframeLinewidth*je()),Rt.setMode(U.LINES)):Rt.setMode(U.TRIANGLES);else if(J.isLine){let on=Z.linewidth;on===void 0&&(on=1),xe.setLineWidth(on*je()),J.isLineSegments?Rt.setMode(U.LINES):J.isLineLoop?Rt.setMode(U.LINE_LOOP):Rt.setMode(U.LINE_STRIP)}else J.isPoints?Rt.setMode(U.POINTS):J.isSprite&&Rt.setMode(U.TRIANGLES);if(J.isBatchedMesh)if(Be.get("WEBGL_multi_draw"))Rt.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{const on=J._multiDrawStarts,ze=J._multiDrawCounts,Ln=J._multiDrawCount,bt=qe?oe.get(qe).bytesPerElement:1,Gn=A.get(Z).currentProgram.getUniforms();for(let li=0;li<Ln;li++)Gn.setValue(U,"_gl_DrawID",li),Rt.render(on[li]/bt,ze[li])}else if(J.isInstancedMesh)Rt.renderInstances(Ze,kt,J.count);else if(ee.isInstancedBufferGeometry){const on=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,ze=Math.min(ee.instanceCount,on);Rt.renderInstances(Ze,kt,ze)}else Rt.render(Ze,kt)};function mt(T,H,ee){T.transparent===!0&&T.side===mi&&T.forceSinglePass===!1?(T.side=yn,T.needsUpdate=!0,Aa(T,H,ee),T.side=Ui,T.needsUpdate=!0,Aa(T,H,ee),T.side=mi):Aa(T,H,ee)}this.compile=function(T,H,ee=null){ee===null&&(ee=T),S=Le.get(ee),S.init(H),b.push(S),ee.traverseVisible(function(J){J.isLight&&J.layers.test(H.layers)&&(S.pushLight(J),J.castShadow&&S.pushShadow(J))}),T!==ee&&T.traverseVisible(function(J){J.isLight&&J.layers.test(H.layers)&&(S.pushLight(J),J.castShadow&&S.pushShadow(J))}),S.setupLights();const Z=new Set;return T.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;const Ne=J.material;if(Ne)if(Array.isArray(Ne))for(let Ge=0;Ge<Ne.length;Ge++){const De=Ne[Ge];mt(De,ee,J),Z.add(De)}else mt(Ne,ee,J),Z.add(Ne)}),S=b.pop(),Z},this.compileAsync=function(T,H,ee=null){const Z=this.compile(T,H,ee);return new Promise(J=>{function Ne(){if(Z.forEach(function(Ge){A.get(Ge).currentProgram.isReady()&&Z.delete(Ge)}),Z.size===0){J(T);return}setTimeout(Ne,10)}Be.get("KHR_parallel_shader_compile")!==null?Ne():setTimeout(Ne,10)})};let ut=null;function gt(T){ut&&ut(T)}function Ht(){rn.stop()}function Pn(){rn.start()}const rn=new Zp;rn.setAnimationLoop(gt),typeof self<"u"&&rn.setContext(self),this.setAnimationLoop=function(T){ut=T,W.setAnimationLoop(T),T===null?rn.stop():rn.start()},W.addEventListener("sessionstart",Ht),W.addEventListener("sessionend",Pn),this.render=function(T,H){if(H!==void 0&&H.isCamera!==!0){$e("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;k!==null&&k.renderStart(T,H);const ee=W.enabled===!0&&W.isPresenting===!0,Z=w!==null&&(N===null||ee)&&w.begin(P,N);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(W.cameraAutoUpdate===!0&&W.updateCamera(H),H=W.getCamera()),T.isScene===!0&&T.onBeforeRender(P,T,H,N),S=Le.get(T,b.length),S.init(H),S.state.textureUnits=M.getTextureUnits(),b.push(S),ie.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),re.setFromProjectionMatrix(ie,On,H.reversedDepth),ne=this.localClippingEnabled,he=Oe.init(this.clippingPlanes,ne),E=de.get(T,C.length),E.init(),C.push(E),W.enabled===!0&&W.isPresenting===!0){const Ge=P.xr.getDepthSensingMesh();Ge!==null&&an(Ge,H,-1/0,P.sortObjects)}an(T,H,0,P.sortObjects),E.finish(),P.sortObjects===!0&&E.sort(F,K),ge=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,ge&&Se.addToRenderList(E,T),this.info.render.frame++,he===!0&&Oe.beginShadows();const J=S.state.shadowsArray;if(Ae.render(J,T,H),he===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(Z&&w.hasRenderPass())===!1){const Ge=E.opaque,De=E.transmissive;if(S.setupLights(),H.isArrayCamera){const qe=H.cameras;if(De.length>0)for(let Ye=0,dt=qe.length;Ye<dt;Ye++){const pt=qe[Ye];Yn(Ge,De,T,pt)}ge&&Se.render(T);for(let Ye=0,dt=qe.length;Ye<dt;Ye++){const pt=qe[Ye];Wt(E,T,pt,pt.viewport)}}else De.length>0&&Yn(Ge,De,T,H),ge&&Se.render(T),Wt(E,T,H)}N!==null&&z===0&&(M.updateMultisampleRenderTarget(N),M.updateRenderTargetMipmap(N)),Z&&w.end(P),T.isScene===!0&&T.onAfterRender(P,T,H),we.resetDefaultState(),V=-1,G=null,b.pop(),b.length>0?(S=b[b.length-1],M.setTextureUnits(S.state.textureUnits),he===!0&&Oe.setGlobalState(P.clippingPlanes,S.state.camera)):S=null,C.pop(),C.length>0?E=C[C.length-1]:E=null,k!==null&&k.renderEnd()};function an(T,H,ee,Z){if(T.visible===!1)return;if(T.layers.test(H.layers)){if(T.isGroup)ee=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(H);else if(T.isLightProbeGrid)S.pushLightProbeGrid(T);else if(T.isLight)S.pushLight(T),T.castShadow&&S.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||re.intersectsSprite(T)){Z&&ae.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ie);const Ge=be.update(T),De=T.material;De.visible&&E.push(T,Ge,De,ee,ae.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||re.intersectsObject(T))){const Ge=be.update(T),De=T.material;if(Z&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ae.copy(T.boundingSphere.center)):(Ge.boundingSphere===null&&Ge.computeBoundingSphere(),ae.copy(Ge.boundingSphere.center)),ae.applyMatrix4(T.matrixWorld).applyMatrix4(ie)),Array.isArray(De)){const qe=Ge.groups;for(let Ye=0,dt=qe.length;Ye<dt;Ye++){const pt=qe[Ye],Ze=De[pt.materialIndex];Ze&&Ze.visible&&E.push(T,Ge,Ze,ee,ae.z,pt)}}else De.visible&&E.push(T,Ge,De,ee,ae.z,null)}}const Ne=T.children;for(let Ge=0,De=Ne.length;Ge<De;Ge++)an(Ne[Ge],H,ee,Z)}function Wt(T,H,ee,Z){const{opaque:J,transmissive:Ne,transparent:Ge}=T;S.setupLightsView(ee),he===!0&&Oe.setGlobalState(P.clippingPlanes,ee),Z&&xe.viewport(le.copy(Z)),J.length>0&&oi(J,H,ee),Ne.length>0&&oi(Ne,H,ee),Ge.length>0&&oi(Ge,H,ee),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function Yn(T,H,ee,Z){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[Z.id]===void 0){const Ze=Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[Z.id]=new zn(1,1,{generateMipmaps:!0,type:Ze?bi:En,minFilter:_i,samples:Math.max(4,Ke.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:_t.workingColorSpace})}const Ne=S.state.transmissionRenderTarget[Z.id],Ge=Z.viewport||le;Ne.setSize(Ge.z*P.transmissionResolutionScale,Ge.w*P.transmissionResolutionScale);const De=P.getRenderTarget(),qe=P.getActiveCubeFace(),Ye=P.getActiveMipmapLevel();P.setRenderTarget(Ne),P.getClearColor(Ie),Fe=P.getClearAlpha(),Fe<1&&P.setClearColor(16777215,.5),P.clear(),ge&&Se.render(ee);const dt=P.toneMapping;P.toneMapping=ni;const pt=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),S.setupLightsView(Z),he===!0&&Oe.setGlobalState(P.clippingPlanes,Z),oi(T,ee,Z),M.updateMultisampleRenderTarget(Ne),M.updateRenderTargetMipmap(Ne),Be.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let Et=0,kt=H.length;Et<kt;Et++){const Ft=H[Et],{object:Rt,geometry:on,material:ze,group:Ln}=Ft;if(ze.side===mi&&Rt.layers.test(Z.layers)){const bt=ze.side;ze.side=yn,ze.needsUpdate=!0,bd(Rt,ee,Z,on,ze,Ln),ze.side=bt,ze.needsUpdate=!0,Ze=!0}}Ze===!0&&(M.updateMultisampleRenderTarget(Ne),M.updateRenderTargetMipmap(Ne))}P.setRenderTarget(De,qe,Ye),P.setClearColor(Ie,Fe),pt!==void 0&&(Z.viewport=pt),P.toneMapping=dt}function oi(T,H,ee){const Z=H.isScene===!0?H.overrideMaterial:null;for(let J=0,Ne=T.length;J<Ne;J++){const Ge=T[J],{object:De,geometry:qe,group:Ye}=Ge;let dt=Ge.material;dt.allowOverride===!0&&Z!==null&&(dt=Z),De.layers.test(ee.layers)&&bd(De,H,ee,qe,dt,Ye)}}function bd(T,H,ee,Z,J,Ne){T.onBeforeRender(P,H,ee,Z,J,Ne),T.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),J.onBeforeRender(P,H,ee,Z,T,Ne),J.transparent===!0&&J.side===mi&&J.forceSinglePass===!1?(J.side=yn,J.needsUpdate=!0,P.renderBufferDirect(ee,H,Z,J,T,Ne),J.side=Ui,J.needsUpdate=!0,P.renderBufferDirect(ee,H,Z,J,T,Ne),J.side=mi):P.renderBufferDirect(ee,H,Z,J,T,Ne),T.onAfterRender(P,H,ee,Z,J,Ne)}function Aa(T,H,ee){H.isScene!==!0&&(H=me);const Z=A.get(T),J=S.state.lights,Ne=S.state.shadowsArray,Ge=J.state.version,De=Te.getParameters(T,J.state,Ne,H,ee,S.state.lightProbeGridArray),qe=Te.getProgramCacheKey(De);let Ye=Z.programs;Z.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?H.environment:null,Z.fog=H.fog;const dt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;Z.envMap=X.get(T.envMap||Z.environment,dt),Z.envMapRotation=Z.environment!==null&&T.envMap===null?H.environmentRotation:T.envMapRotation,Ye===void 0&&(T.addEventListener("dispose",it),Ye=new Map,Z.programs=Ye);let pt=Ye.get(qe);if(pt!==void 0){if(Z.currentProgram===pt&&Z.lightsStateVersion===Ge)return Sd(T,De),pt}else De.uniforms=Te.getUniforms(T),k!==null&&T.isNodeMaterial&&k.build(T,ee,De),T.onBeforeCompile(De,P),pt=Te.acquireProgram(De,qe),Ye.set(qe,pt),Z.uniforms=De.uniforms;const Ze=Z.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ze.clippingPlanes=Oe.uniform),Sd(T,De),Z.needsLights=dm(T),Z.lightsStateVersion=Ge,Z.needsLights&&(Ze.ambientLightColor.value=J.state.ambient,Ze.lightProbe.value=J.state.probe,Ze.directionalLights.value=J.state.directional,Ze.directionalLightShadows.value=J.state.directionalShadow,Ze.spotLights.value=J.state.spot,Ze.spotLightShadows.value=J.state.spotShadow,Ze.rectAreaLights.value=J.state.rectArea,Ze.ltc_1.value=J.state.rectAreaLTC1,Ze.ltc_2.value=J.state.rectAreaLTC2,Ze.pointLights.value=J.state.point,Ze.pointLightShadows.value=J.state.pointShadow,Ze.hemisphereLights.value=J.state.hemi,Ze.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Ze.spotLightMatrix.value=J.state.spotLightMatrix,Ze.spotLightMap.value=J.state.spotLightMap,Ze.pointShadowMatrix.value=J.state.pointShadowMatrix),Z.lightProbeGrid=S.state.lightProbeGridArray.length>0,Z.currentProgram=pt,Z.uniformsList=null,pt}function Md(T){if(T.uniformsList===null){const H=T.currentProgram.getUniforms();T.uniformsList=Ao.seqWithValue(H.seq,T.uniforms)}return T.uniformsList}function Sd(T,H){const ee=A.get(T);ee.outputColorSpace=H.outputColorSpace,ee.batching=H.batching,ee.batchingColor=H.batchingColor,ee.instancing=H.instancing,ee.instancingColor=H.instancingColor,ee.instancingMorph=H.instancingMorph,ee.skinning=H.skinning,ee.morphTargets=H.morphTargets,ee.morphNormals=H.morphNormals,ee.morphColors=H.morphColors,ee.morphTargetsCount=H.morphTargetsCount,ee.numClippingPlanes=H.numClippingPlanes,ee.numIntersection=H.numClipIntersection,ee.vertexAlphas=H.vertexAlphas,ee.vertexTangents=H.vertexTangents,ee.toneMapping=H.toneMapping}function lm(T,H){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;y.setFromMatrixPosition(H.matrixWorld);for(let ee=0,Z=T.length;ee<Z;ee++){const J=T[ee];if(J.texture!==null&&J.boundingBox.containsPoint(y))return J}return null}function cm(T,H,ee,Z,J){H.isScene!==!0&&(H=me),M.resetTextureUnits();const Ne=H.fog,Ge=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?H.environment:null,De=N===null?P.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:_t.workingColorSpace,qe=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Ye=X.get(Z.envMap||Ge,qe),dt=Z.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,pt=!!ee.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ze=!!ee.morphAttributes.position,Et=!!ee.morphAttributes.normal,kt=!!ee.morphAttributes.color;let Ft=ni;Z.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Ft=P.toneMapping);const Rt=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,on=Rt!==void 0?Rt.length:0,ze=A.get(Z),Ln=S.state.lights;if(he===!0&&(ne===!0||T!==G)){const Pt=T===G&&Z.id===V;Oe.setState(Z,T,Pt)}let bt=!1;Z.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==Ln.state.version||ze.outputColorSpace!==De||J.isBatchedMesh&&ze.batching===!1||!J.isBatchedMesh&&ze.batching===!0||J.isBatchedMesh&&ze.batchingColor===!0&&J.colorTexture===null||J.isBatchedMesh&&ze.batchingColor===!1&&J.colorTexture!==null||J.isInstancedMesh&&ze.instancing===!1||!J.isInstancedMesh&&ze.instancing===!0||J.isSkinnedMesh&&ze.skinning===!1||!J.isSkinnedMesh&&ze.skinning===!0||J.isInstancedMesh&&ze.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&ze.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&ze.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&ze.instancingMorph===!1&&J.morphTexture!==null||ze.envMap!==Ye||Z.fog===!0&&ze.fog!==Ne||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==Oe.numPlanes||ze.numIntersection!==Oe.numIntersection)||ze.vertexAlphas!==dt||ze.vertexTangents!==pt||ze.morphTargets!==Ze||ze.morphNormals!==Et||ze.morphColors!==kt||ze.toneMapping!==Ft||ze.morphTargetsCount!==on||!!ze.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(bt=!0):(bt=!0,ze.__version=Z.version);let Gn=ze.currentProgram;bt===!0&&(Gn=Aa(Z,H,J),k&&Z.isNodeMaterial&&k.onUpdateProgram(Z,Gn,ze));let li=!1,Oi=!1,Os=!1;const It=Gn.getUniforms(),Bt=ze.uniforms;if(xe.useProgram(Gn.program)&&(li=!0,Oi=!0,Os=!0),Z.id!==V&&(V=Z.id,Oi=!0),ze.needsLights){const Pt=lm(S.state.lightProbeGridArray,J);ze.lightProbeGrid!==Pt&&(ze.lightProbeGrid=Pt,Oi=!0)}if(li||G!==T){xe.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),It.setValue(U,"projectionMatrix",T.projectionMatrix),It.setValue(U,"viewMatrix",T.matrixWorldInverse);const Bi=It.map.cameraPosition;Bi!==void 0&&Bi.setValue(U,te.setFromMatrixPosition(T.matrixWorld)),Ke.logarithmicDepthBuffer&&It.setValue(U,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&It.setValue(U,"isOrthographic",T.isOrthographicCamera===!0),G!==T&&(G=T,Oi=!0,Os=!0)}if(ze.needsLights&&(Ln.state.directionalShadowMap.length>0&&It.setValue(U,"directionalShadowMap",Ln.state.directionalShadowMap,M),Ln.state.spotShadowMap.length>0&&It.setValue(U,"spotShadowMap",Ln.state.spotShadowMap,M),Ln.state.pointShadowMap.length>0&&It.setValue(U,"pointShadowMap",Ln.state.pointShadowMap,M)),J.isSkinnedMesh){It.setOptional(U,J,"bindMatrix"),It.setOptional(U,J,"bindMatrixInverse");const Pt=J.skeleton;Pt&&(Pt.boneTexture===null&&Pt.computeBoneTexture(),It.setValue(U,"boneTexture",Pt.boneTexture,M))}J.isBatchedMesh&&(It.setOptional(U,J,"batchingTexture"),It.setValue(U,"batchingTexture",J._matricesTexture,M),It.setOptional(U,J,"batchingIdTexture"),It.setValue(U,"batchingIdTexture",J._indirectTexture,M),It.setOptional(U,J,"batchingColorTexture"),J._colorsTexture!==null&&It.setValue(U,"batchingColorTexture",J._colorsTexture,M));const ki=ee.morphAttributes;if((ki.position!==void 0||ki.normal!==void 0||ki.color!==void 0)&&at.update(J,ee,Gn),(Oi||ze.receiveShadow!==J.receiveShadow)&&(ze.receiveShadow=J.receiveShadow,It.setValue(U,"receiveShadow",J.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&H.environment!==null&&(Bt.envMapIntensity.value=H.environmentIntensity),Bt.dfgLUT!==void 0&&(Bt.dfgLUT.value=sS()),Oi){if(It.setValue(U,"toneMappingExposure",P.toneMappingExposure),ze.needsLights&&um(Bt,Os),Ne&&Z.fog===!0&&se.refreshFogUniforms(Bt,Ne),se.refreshMaterialUniforms(Bt,Z,q,ce,S.state.transmissionRenderTarget[T.id]),ze.needsLights&&ze.lightProbeGrid){const Pt=ze.lightProbeGrid;Bt.probesSH.value=Pt.texture,Bt.probesMin.value.copy(Pt.boundingBox.min),Bt.probesMax.value.copy(Pt.boundingBox.max),Bt.probesResolution.value.copy(Pt.resolution)}Ao.upload(U,Md(ze),Bt,M)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Ao.upload(U,Md(ze),Bt,M),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&It.setValue(U,"center",J.center),It.setValue(U,"modelViewMatrix",J.modelViewMatrix),It.setValue(U,"normalMatrix",J.normalMatrix),It.setValue(U,"modelMatrix",J.matrixWorld),Z.uniformsGroups!==void 0){const Pt=Z.uniformsGroups;for(let Bi=0,ks=Pt.length;Bi<ks;Bi++){const wd=Pt[Bi];I.update(wd,Gn),I.bind(wd,Gn)}}return Gn}function um(T,H){T.ambientLightColor.needsUpdate=H,T.lightProbe.needsUpdate=H,T.directionalLights.needsUpdate=H,T.directionalLightShadows.needsUpdate=H,T.pointLights.needsUpdate=H,T.pointLightShadows.needsUpdate=H,T.spotLights.needsUpdate=H,T.spotLightShadows.needsUpdate=H,T.rectAreaLights.needsUpdate=H,T.hemisphereLights.needsUpdate=H}function dm(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(T,H,ee){const Z=A.get(T);Z.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),A.get(T.texture).__webglTexture=H,A.get(T.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:ee,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,H){const ee=A.get(T);ee.__webglFramebuffer=H,ee.__useDefaultFramebuffer=H===void 0};const hm=U.createFramebuffer();this.setRenderTarget=function(T,H=0,ee=0){N=T,$=H,z=ee;let Z=null,J=!1,Ne=!1;if(T){const De=A.get(T);if(De.__useDefaultFramebuffer!==void 0){xe.bindFramebuffer(U.FRAMEBUFFER,De.__webglFramebuffer),le.copy(T.viewport),pe.copy(T.scissor),Ee=T.scissorTest,xe.viewport(le),xe.scissor(pe),xe.setScissorTest(Ee),V=-1;return}else if(De.__webglFramebuffer===void 0)M.setupRenderTarget(T);else if(De.__hasExternalTextures)M.rebindTextures(T,A.get(T.texture).__webglTexture,A.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const dt=T.depthTexture;if(De.__boundDepthTexture!==dt){if(dt!==null&&A.has(dt)&&(T.width!==dt.image.width||T.height!==dt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(T)}}const qe=T.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(Ne=!0);const Ye=A.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ye[H])?Z=Ye[H][ee]:Z=Ye[H],J=!0):T.samples>0&&M.useMultisampledRTT(T)===!1?Z=A.get(T).__webglMultisampledFramebuffer:Array.isArray(Ye)?Z=Ye[ee]:Z=Ye,le.copy(T.viewport),pe.copy(T.scissor),Ee=T.scissorTest}else le.copy(ue).multiplyScalar(q).floor(),pe.copy(ye).multiplyScalar(q).floor(),Ee=Ve;if(ee!==0&&(Z=hm),xe.bindFramebuffer(U.FRAMEBUFFER,Z)&&xe.drawBuffers(T,Z),xe.viewport(le),xe.scissor(pe),xe.setScissorTest(Ee),J){const De=A.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+H,De.__webglTexture,ee)}else if(Ne){const De=H;for(let qe=0;qe<T.textures.length;qe++){const Ye=A.get(T.textures[qe]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+qe,Ye.__webglTexture,ee,De)}}else if(T!==null&&ee!==0){const De=A.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,De.__webglTexture,ee)}V=-1},this.readRenderTargetPixels=function(T,H,ee,Z,J,Ne,Ge,De=0){if(!(T&&T.isWebGLRenderTarget)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qe=A.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ge!==void 0&&(qe=qe[Ge]),qe){xe.bindFramebuffer(U.FRAMEBUFFER,qe);try{const Ye=T.textures[De],dt=Ye.format,pt=Ye.type;if(T.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+De),!Ke.textureFormatReadable(dt)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ke.textureTypeReadable(pt)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=T.width-Z&&ee>=0&&ee<=T.height-J&&U.readPixels(H,ee,Z,J,B.convert(dt),B.convert(pt),Ne)}finally{const Ye=N!==null?A.get(N).__webglFramebuffer:null;xe.bindFramebuffer(U.FRAMEBUFFER,Ye)}}},this.readRenderTargetPixelsAsync=async function(T,H,ee,Z,J,Ne,Ge,De=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let qe=A.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ge!==void 0&&(qe=qe[Ge]),qe)if(H>=0&&H<=T.width-Z&&ee>=0&&ee<=T.height-J){xe.bindFramebuffer(U.FRAMEBUFFER,qe);const Ye=T.textures[De],dt=Ye.format,pt=Ye.type;if(T.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+De),!Ke.textureFormatReadable(dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ke.textureTypeReadable(pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ze=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Ze),U.bufferData(U.PIXEL_PACK_BUFFER,Ne.byteLength,U.STREAM_READ),U.readPixels(H,ee,Z,J,B.convert(dt),B.convert(pt),0);const Et=N!==null?A.get(N).__webglFramebuffer:null;xe.bindFramebuffer(U.FRAMEBUFFER,Et);const kt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await hg(U,kt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Ze),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Ne),U.deleteBuffer(Ze),U.deleteSync(kt),Ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,H=null,ee=0){const Z=Math.pow(2,-ee),J=Math.floor(T.image.width*Z),Ne=Math.floor(T.image.height*Z),Ge=H!==null?H.x:0,De=H!==null?H.y:0;M.setTexture2D(T,0),U.copyTexSubImage2D(U.TEXTURE_2D,ee,0,0,Ge,De,J,Ne),xe.unbindTexture()};const fm=U.createFramebuffer(),pm=U.createFramebuffer();this.copyTextureToTexture=function(T,H,ee=null,Z=null,J=0,Ne=0){let Ge,De,qe,Ye,dt,pt,Ze,Et,kt;const Ft=T.isCompressedTexture?T.mipmaps[Ne]:T.image;if(ee!==null)Ge=ee.max.x-ee.min.x,De=ee.max.y-ee.min.y,qe=ee.isBox3?ee.max.z-ee.min.z:1,Ye=ee.min.x,dt=ee.min.y,pt=ee.isBox3?ee.min.z:0;else{const Bt=Math.pow(2,-J);Ge=Math.floor(Ft.width*Bt),De=Math.floor(Ft.height*Bt),T.isDataArrayTexture?qe=Ft.depth:T.isData3DTexture?qe=Math.floor(Ft.depth*Bt):qe=1,Ye=0,dt=0,pt=0}Z!==null?(Ze=Z.x,Et=Z.y,kt=Z.z):(Ze=0,Et=0,kt=0);const Rt=B.convert(H.format),on=B.convert(H.type);let ze;H.isData3DTexture?(M.setTexture3D(H,0),ze=U.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(M.setTexture2DArray(H,0),ze=U.TEXTURE_2D_ARRAY):(M.setTexture2D(H,0),ze=U.TEXTURE_2D),xe.activeTexture(U.TEXTURE0),xe.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,H.flipY),xe.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),xe.pixelStorei(U.UNPACK_ALIGNMENT,H.unpackAlignment);const Ln=xe.getParameter(U.UNPACK_ROW_LENGTH),bt=xe.getParameter(U.UNPACK_IMAGE_HEIGHT),Gn=xe.getParameter(U.UNPACK_SKIP_PIXELS),li=xe.getParameter(U.UNPACK_SKIP_ROWS),Oi=xe.getParameter(U.UNPACK_SKIP_IMAGES);xe.pixelStorei(U.UNPACK_ROW_LENGTH,Ft.width),xe.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ft.height),xe.pixelStorei(U.UNPACK_SKIP_PIXELS,Ye),xe.pixelStorei(U.UNPACK_SKIP_ROWS,dt),xe.pixelStorei(U.UNPACK_SKIP_IMAGES,pt);const Os=T.isDataArrayTexture||T.isData3DTexture,It=H.isDataArrayTexture||H.isData3DTexture;if(T.isDepthTexture){const Bt=A.get(T),ki=A.get(H),Pt=A.get(Bt.__renderTarget),Bi=A.get(ki.__renderTarget);xe.bindFramebuffer(U.READ_FRAMEBUFFER,Pt.__webglFramebuffer),xe.bindFramebuffer(U.DRAW_FRAMEBUFFER,Bi.__webglFramebuffer);for(let ks=0;ks<qe;ks++)Os&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,A.get(T).__webglTexture,J,pt+ks),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,A.get(H).__webglTexture,Ne,kt+ks)),U.blitFramebuffer(Ye,dt,Ge,De,Ze,Et,Ge,De,U.DEPTH_BUFFER_BIT,U.NEAREST);xe.bindFramebuffer(U.READ_FRAMEBUFFER,null),xe.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(J!==0||T.isRenderTargetTexture||A.has(T)){const Bt=A.get(T),ki=A.get(H);xe.bindFramebuffer(U.READ_FRAMEBUFFER,fm),xe.bindFramebuffer(U.DRAW_FRAMEBUFFER,pm);for(let Pt=0;Pt<qe;Pt++)Os?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Bt.__webglTexture,J,pt+Pt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Bt.__webglTexture,J),It?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ki.__webglTexture,Ne,kt+Pt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ki.__webglTexture,Ne),J!==0?U.blitFramebuffer(Ye,dt,Ge,De,Ze,Et,Ge,De,U.COLOR_BUFFER_BIT,U.NEAREST):It?U.copyTexSubImage3D(ze,Ne,Ze,Et,kt+Pt,Ye,dt,Ge,De):U.copyTexSubImage2D(ze,Ne,Ze,Et,Ye,dt,Ge,De);xe.bindFramebuffer(U.READ_FRAMEBUFFER,null),xe.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else It?T.isDataTexture||T.isData3DTexture?U.texSubImage3D(ze,Ne,Ze,Et,kt,Ge,De,qe,Rt,on,Ft.data):H.isCompressedArrayTexture?U.compressedTexSubImage3D(ze,Ne,Ze,Et,kt,Ge,De,qe,Rt,Ft.data):U.texSubImage3D(ze,Ne,Ze,Et,kt,Ge,De,qe,Rt,on,Ft):T.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Ne,Ze,Et,Ge,De,Rt,on,Ft.data):T.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Ne,Ze,Et,Ft.width,Ft.height,Rt,Ft.data):U.texSubImage2D(U.TEXTURE_2D,Ne,Ze,Et,Ge,De,Rt,on,Ft);xe.pixelStorei(U.UNPACK_ROW_LENGTH,Ln),xe.pixelStorei(U.UNPACK_IMAGE_HEIGHT,bt),xe.pixelStorei(U.UNPACK_SKIP_PIXELS,Gn),xe.pixelStorei(U.UNPACK_SKIP_ROWS,li),xe.pixelStorei(U.UNPACK_SKIP_IMAGES,Oi),Ne===0&&H.generateMipmaps&&U.generateMipmap(ze),xe.unbindTexture()},this.initRenderTarget=function(T){A.get(T).__webglFramebuffer===void 0&&M.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?M.setTextureCube(T,0):T.isData3DTexture?M.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?M.setTexture2DArray(T,0):M.setTexture2D(T,0),xe.unbindTexture()},this.resetState=function(){$=0,z=0,N=null,xe.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=_t._getDrawingBufferColorSpace(e),t.unpackColorSpace=_t._getUnpackColorSpace()}}const rS=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Eu,AddEquation:Yi,AddOperation:Uf,AdditiveAnimationBlendMode:Fu,AdditiveBlending:su,AgXToneMapping:Au,AlphaFormat:Uu,AlwaysCompare:$f,AlwaysDepth:Lo,AlwaysStencilFunc:cu,AmbientLight:Op,AnimationAction:$p,AnimationClip:va,AnimationLoader:i0,AnimationMixer:D0,AnimationObjectGroup:P0,AnimationUtils:Q_,ArcCurve:cp,ArrayCamera:Gp,ArrowHelper:iv,AttachedBindMode:ou,Audio:Wp,AudioAnalyser:b0,AudioContext:ud,AudioListener:v0,AudioLoader:p0,AxesHelper:sv,BackSide:yn,BasicDepthPacking:Bf,BasicShadowMap:xm,BatchedMesh:ip,BezierInterpolant:Ip,Bone:Hu,BooleanKeyframeTrack:Ns,Box2:G0,Box3:$t,Box3Helper:tv,BoxGeometry:is,BoxHelper:ev,BufferAttribute:Ct,BufferGeometry:lt,BufferGeometryLoader:zp,ByteType:Iu,Cache:vi,Camera:tc,CameraHelper:Q0,CanvasTexture:v_,CapsuleGeometry:Hl,CatmullRomCurve3:up,CineonToneMapping:wu,CircleGeometry:Wl,ClampToEdgeWrapping:Rn,Clock:B0,Color:Ue,ColorKeyframeTrack:rd,ColorManagement:_t,Compatibility:og,CompressedArrayTexture:g_,CompressedCubeTexture:__,CompressedTexture:Gl,CompressedTextureLoader:s0,ConeGeometry:Mr,ConstantAlphaFactor:Pf,ConstantColorFactor:Rf,Controls:av,CubeCamera:Vp,CubeDepthTexture:op,CubeReflectionMapping:yi,CubeRefractionMapping:ji,CubeTexture:Ma,CubeTextureLoader:r0,CubeUVReflectionMapping:xr,CubicBezierCurve:qu,CubicBezierCurve3:dp,CubicInterpolant:Cp,CullFaceBack:iu,CullFaceFront:ff,CullFaceFrontBack:vm,CullFaceNone:hf,Curve:ai,CurvePath:fp,CustomBlending:mf,CustomToneMapping:Tu,CylinderGeometry:Sa,Cylindrical:V0,Data3DTexture:Nl,DataArrayTexture:Ul,DataTexture:ii,DataTextureLoader:a0,DataUtils:Hg,DecrementStencilOp:km,DecrementWrapStencilOp:zm,DefaultLoadingManager:Lp,DepthFormat:Mi,DepthStencilFormat:Zi,DepthTexture:Ps,DetachedBindMode:Nf,DirectionalLight:Fp,DirectionalLightHelper:j0,DiscreteInterpolant:Rp,DodecahedronGeometry:Xl,DoubleSide:mi,DstAlphaFactor:wf,DstColorFactor:Tf,DynamicCopyUsage:tg,DynamicDrawUsage:Zm,DynamicReadUsage:jm,EdgesGeometry:lp,EllipseCurve:$l,EqualCompare:Hf,EqualDepth:Uo,EqualStencilFunc:Wm,EquirectangularReflectionMapping:Xr,EquirectangularRefractionMapping:$r,Euler:si,EventDispatcher:ri,ExternalTexture:Xu,ExtrudeGeometry:ql,FileLoader:Fi,Float16BufferAttribute:Jg,Float32BufferAttribute:ke,FloatType:vn,Fog:kl,FogExp2:Ol,FramebufferTexture:m_,FrontSide:Ui,Frustum:br,FrustumArray:Vl,GLBufferAttribute:O0,GLSL1:ig,GLSL3:uu,GreaterCompare:Wf,GreaterDepth:Fo,GreaterEqualCompare:Dl,GreaterEqualDepth:No,GreaterEqualStencilFunc:Ym,GreaterStencilFunc:$m,GridHelper:J0,Group:ur,HTMLTexture:x_,HalfFloatType:bi,HemisphereLight:Dp,HemisphereLightHelper:Z0,IcosahedronGeometry:Yl,ImageBitmapLoader:f0,ImageLoader:xa,ImageUtils:Jf,IncrementStencilOp:Om,IncrementWrapStencilOp:Bm,InstancedBufferAttribute:mr,InstancedBufferGeometry:cd,InstancedInterleavedBuffer:bl,InstancedMesh:np,Int16BufferAttribute:Yg,Int32BufferAttribute:Zg,Int8BufferAttribute:Xg,IntType:El,InterleavedBuffer:Bl,InterleavedBufferAttribute:kn,Interpolant:Er,InterpolateBezier:lu,InterpolateDiscrete:aa,InterpolateLinear:pl,InterpolateSmooth:Eo,InterpolationSamplingMode:ag,InterpolationSamplingType:rg,InvertStencilOp:Vm,KeepStencilOp:xs,KeyframeTrack:qn,LOD:ep,LatheGeometry:Zl,Layers:Fl,LessCompare:Gf,LessDepth:Do,LessEqualCompare:Ll,LessEqualDepth:Rs,LessEqualStencilFunc:Xm,LessStencilFunc:Hm,Light:rs,LightProbe:Bp,Line:ts,Line3:qp,LineBasicMaterial:bn,LineCurve:Yu,LineCurve3:hp,LineDashedMaterial:Tp,LineLoop:sp,LineSegments:Si,LinearFilter:Dt,LinearInterpolant:sd,LinearMipMapLinearFilter:wm,LinearMipMapNearestFilter:Sm,LinearMipmapLinearFilter:_i,LinearMipmapNearestFilter:qr,LinearSRGBColorSpace:la,LinearToneMapping:Mu,LinearTransfer:ca,Loader:In,LoaderUtils:mu,LoadingManager:ad,LoopOnce:Ff,LoopPingPong:kf,LoopRepeat:Of,MOUSE:gm,Material:jt,MaterialBlending:ym,MaterialLoader:nc,MathUtils:gl,Matrix2:_u,Matrix3:ot,Matrix4:rt,MaxEquation:xf,Mesh:At,MeshBasicMaterial:nn,MeshDepthMaterial:td,MeshDistanceMaterial:nd,MeshLambertMaterial:wp,MeshMatcapMaterial:Ep,MeshNormalMaterial:Sp,MeshPhongMaterial:bp,MeshPhysicalMaterial:yp,MeshStandardMaterial:ed,MeshToonMaterial:Mp,MinEquation:vf,MirroredRepeatWrapping:ia,MixOperation:Df,MultiplyBlending:au,MultiplyOperation:ya,NearestFilter:Vt,NearestMipMapLinearFilter:Mm,NearestMipMapNearestFilter:bm,NearestMipmapLinearFilter:lr,NearestMipmapNearestFilter:Ru,NeutralToneMapping:Cu,NeverCompare:Vf,NeverDepth:Po,NeverStencilFunc:Gm,NoBlending:xi,NoColorSpace:Ii,NoNormalPacking:Lm,NoToneMapping:ni,NormalAnimationBlendMode:Pl,NormalBlending:Es,NormalGAPacking:Um,NormalRGPacking:Dm,NotEqualCompare:Xf,NotEqualDepth:Oo,NotEqualStencilFunc:qm,NumberKeyframeTrack:ga,Object3D:St,ObjectLoader:d0,ObjectSpaceNormalMap:zf,OctahedronGeometry:Sr,OneFactor:bf,OneMinusConstantAlphaFactor:Lf,OneMinusConstantColorFactor:If,OneMinusDstAlphaFactor:Ef,OneMinusDstColorFactor:Af,OneMinusSrcAlphaFactor:Io,OneMinusSrcColorFactor:Sf,OrthographicCamera:Ta,PCFShadowMap:Wr,PCFSoftShadowMap:pf,PMREMGenerator:xu,Path:yl,PerspectiveCamera:Kt,Plane:qi,PlaneGeometry:wr,PlaneHelper:nv,PointLight:Np,PointLightHelper:q0,Points:rp,PointsMaterial:Wu,PolarGridHelper:K0,PolyhedronGeometry:ss,PositionalAudio:y0,PropertyBinding:Mt,PropertyMixer:Xp,QuadraticBezierCurve:Zu,QuadraticBezierCurve3:Ju,Quaternion:hn,QuaternionKeyframeTrack:Ea,QuaternionLinearInterpolant:Pp,R11_EAC_Format:Xo,RED_GREEN_RGTC2_Format:ra,RED_RGTC1_Format:dl,REVISION:Sl,RG11_EAC_Format:sa,RGBADepthPacking:Rm,RGBAFormat:xn,RGBAIntegerFormat:Il,RGBA_ASTC_10x10_Format:rl,RGBA_ASTC_10x5_Format:nl,RGBA_ASTC_10x6_Format:il,RGBA_ASTC_10x8_Format:sl,RGBA_ASTC_12x10_Format:al,RGBA_ASTC_12x12_Format:ol,RGBA_ASTC_4x4_Format:Yo,RGBA_ASTC_5x4_Format:Zo,RGBA_ASTC_5x5_Format:Jo,RGBA_ASTC_6x5_Format:Ko,RGBA_ASTC_6x6_Format:jo,RGBA_ASTC_8x5_Format:Qo,RGBA_ASTC_8x6_Format:el,RGBA_ASTC_8x8_Format:tl,RGBA_BPTC_Format:ll,RGBA_ETC2_EAC_Format:Wo,RGBA_PVRTC_2BPPV1_Format:Vo,RGBA_PVRTC_4BPPV1_Format:zo,RGBA_S3TC_DXT1_Format:Zr,RGBA_S3TC_DXT3_Format:Jr,RGBA_S3TC_DXT5_Format:Kr,RGBDepthPacking:Im,RGBFormat:Nu,RGBIntegerFormat:Em,RGB_BPTC_SIGNED_Format:cl,RGB_BPTC_UNSIGNED_Format:ul,RGB_ETC1_Format:Go,RGB_ETC2_Format:Ho,RGB_PVRTC_2BPPV1_Format:Bo,RGB_PVRTC_4BPPV1_Format:ko,RGB_S3TC_DXT1_Format:Yr,RGDepthPacking:Pm,RGFormat:Qi,RGIntegerFormat:Rl,RawShaderMaterial:Qu,Ray:yr,Raycaster:k0,RectAreaLight:kp,RedFormat:Cl,RedIntegerFormat:ba,ReinhardToneMapping:Su,RenderTarget:ku,RenderTarget3D:U0,RepeatWrapping:na,ReplaceStencilOp:Fm,ReverseSubtractEquation:_f,RingGeometry:Jl,SIGNED_R11_EAC_Format:$o,SIGNED_RED_GREEN_RGTC2_Format:fl,SIGNED_RED_RGTC1_Format:hl,SIGNED_RG11_EAC_Format:qo,SRGBColorSpace:wn,SRGBTransfer:wt,Scene:Bu,ShaderChunk:ft,ShaderLib:gn,ShaderMaterial:Vn,ShadowMaterial:vp,Shape:As,ShapeGeometry:Kl,ShapePath:rv,ShapeUtils:ti,ShortType:Pu,Skeleton:zl,SkeletonHelper:$0,SkinnedMesh:tp,Source:Ji,Sphere:qt,SphereGeometry:ei,Spherical:z0,SphericalHarmonics3:ld,SplineCurve:Ku,SpotLight:Up,SpotLightHelper:X0,Sprite:Qf,SpriteMaterial:Gu,SrcAlphaFactor:Ro,SrcAlphaSaturateFactor:Cf,SrcColorFactor:Mf,StaticCopyUsage:eg,StaticDrawUsage:ua,StaticReadUsage:Km,StereoCamera:m0,StreamCopyUsage:ng,StreamDrawUsage:Jm,StreamReadUsage:Qm,StringKeyframeTrack:Fs,SubtractEquation:gf,SubtractiveBlending:ru,TOUCH:_m,TangentSpaceNormalMap:Ni,TetrahedronGeometry:wa,Texture:Nt,TextureLoader:o0,TextureUtils:dv,Timer:Hp,TimestampQuery:sg,TorusGeometry:Ds,TorusKnotGeometry:jl,Triangle:Tn,TriangleFanDrawMode:Cm,TriangleStripDrawMode:Am,TrianglesDrawMode:Tm,TubeGeometry:Ql,UVMapping:wl,Uint16BufferAttribute:zu,Uint32BufferAttribute:Vu,Uint8BufferAttribute:$g,Uint8ClampedBufferAttribute:qg,Uniform:fd,UniformsGroup:F0,UniformsLib:Re,UniformsUtils:ec,UnsignedByteType:En,UnsignedInt101111Type:Du,UnsignedInt248Type:fr,UnsignedInt5999Type:Lu,UnsignedIntType:Wn,UnsignedShort4444Type:Tl,UnsignedShort5551Type:Al,UnsignedShortType:hr,VSMShadowMap:or,Vector2:fe,Vector3:R,Vector4:yt,VectorKeyframeTrack:_a,VideoFrameTexture:p_,VideoTexture:ap,WebGL3DRenderTarget:Ug,WebGLArrayRenderTarget:Dg,WebGLCoordinateSystem:On,WebGLCubeRenderTarget:pd,WebGLRenderTarget:zn,WebGLRenderer:im,WebGLUtils:tm,WebGPUCoordinateSystem:Is,WebXRController:To,WireframeGeometry:ju,WrapAroundEnding:oa,ZeroCurvatureEnding:bs,ZeroFactor:yf,ZeroSlopeEnding:Ms,ZeroStencilOp:Nm,createCanvasElement:Yf,error:$e,getConsoleFunction:dg,log:ha,setConsoleFunction:ug,warn:Ce,warnOnce:ml},Symbol.toStringTag,{value:"Module"})),nf=new $t,bo=new R;class sm extends cd{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new ke(e,3)),this.setAttribute("uv",new ke(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new bl(t,6,1);return this.setAttribute("instanceStart",new kn(n,3,0)),this.setAttribute("instanceEnd",new kn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new bl(t,6,1);return this.setAttribute("instanceColorStart",new kn(n,3,0)),this.setAttribute("instanceColorEnd",new kn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ju(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $t);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),nf.setFromBufferAttribute(t),this.boundingBox.union(nf))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qt),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)bo.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(bo)),bo.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(bo));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}Re.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new fe(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};gn.line={uniforms:ec.merge([Re.common,Re.fog,Re.line]),vertexShader:`
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
		`};class rc extends Vn{constructor(e){super({type:"LineMaterial",uniforms:ec.clone(gn.line.uniforms),vertexShader:gn.line.vertexShader,fragmentShader:gn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Jc=new yt,sf=new R,rf=new R,Qt=new yt,en=new yt,fi=new yt,Kc=new R,jc=new rt,tn=new qp,af=new R,Mo=new $t,So=new qt,pi=new yt;let gi,Cs;function of(r,e,t){return pi.set(0,0,-e,1).applyMatrix4(r.projectionMatrix),pi.multiplyScalar(1/pi.w),pi.x=Cs/t.width,pi.y=Cs/t.height,pi.applyMatrix4(r.projectionMatrixInverse),pi.multiplyScalar(1/pi.w),Math.abs(Math.max(pi.x,pi.y))}function aS(r,e){const t=r.matrixWorld,n=r.geometry,i=n.attributes.instanceStart,s=n.attributes.instanceEnd,a=Math.min(n.instanceCount,i.count);for(let o=0,l=a;o<l;o++){tn.start.fromBufferAttribute(i,o),tn.end.fromBufferAttribute(s,o),tn.applyMatrix4(t);const c=new R,u=new R;gi.distanceSqToSegment(tn.start,tn.end,u,c),u.distanceTo(c)<Cs*.5&&e.push({point:u,pointOnLine:c,distance:gi.origin.distanceTo(u),object:r,face:null,faceIndex:o,uv:null,uv1:null})}}function oS(r,e,t){const n=e.projectionMatrix,s=r.material.resolution,a=r.matrixWorld,o=r.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,u=Math.min(o.instanceCount,l.count),h=-e.near;gi.at(1,fi),fi.w=1,fi.applyMatrix4(e.matrixWorldInverse),fi.applyMatrix4(n),fi.multiplyScalar(1/fi.w),fi.x*=s.x/2,fi.y*=s.y/2,fi.z=0,Kc.copy(fi),jc.multiplyMatrices(e.matrixWorldInverse,a);for(let d=0,f=u;d<f;d++){if(Qt.fromBufferAttribute(l,d),en.fromBufferAttribute(c,d),Qt.w=1,en.w=1,Qt.applyMatrix4(jc),en.applyMatrix4(jc),Qt.z>h&&en.z>h)continue;if(Qt.z>h){const _=Qt.z-en.z,y=(Qt.z-h)/_;Qt.lerp(en,y)}else if(en.z>h){const _=en.z-Qt.z,y=(en.z-h)/_;en.lerp(Qt,y)}Qt.applyMatrix4(n),en.applyMatrix4(n),Qt.multiplyScalar(1/Qt.w),en.multiplyScalar(1/en.w),Qt.x*=s.x/2,Qt.y*=s.y/2,en.x*=s.x/2,en.y*=s.y/2,tn.start.copy(Qt),tn.start.z=0,tn.end.copy(en),tn.end.z=0;const x=tn.closestPointToPointParameter(Kc,!0);tn.at(x,af);const g=gl.lerp(Qt.z,en.z,x),p=g>=-1&&g<=1,v=Kc.distanceTo(af)<Cs*.5;if(p&&v){tn.start.fromBufferAttribute(l,d),tn.end.fromBufferAttribute(c,d),tn.start.applyMatrix4(a),tn.end.applyMatrix4(a);const _=new R,y=new R;gi.distanceSqToSegment(tn.start,tn.end,y,_),t.push({point:y,pointOnLine:_,distance:gi.origin.distanceTo(y),object:r,face:null,faceIndex:d,uv:null,uv1:null})}}}class lS extends At{constructor(e=new sm,t=new rc({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)sf.fromBufferAttribute(t,a),rf.fromBufferAttribute(n,a),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+sf.distanceTo(rf);const s=new bl(i,2,1);return e.setAttribute("instanceDistanceStart",new kn(s,1,0)),e.setAttribute("instanceDistanceEnd",new kn(s,1,1)),this}raycast(e,t){const n=this.material.worldUnits,i=e.camera;i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;gi=e.ray;const a=this.matrixWorld,o=this.geometry,l=this.material;Cs=l.linewidth+s,o.boundingSphere===null&&o.computeBoundingSphere(),So.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=Cs*.5;else{const h=Math.max(i.near,So.distanceToPoint(gi.origin));c=of(i,h,l.resolution)}if(So.radius+=c,gi.intersectsSphere(So)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Mo.copy(o.boundingBox).applyMatrix4(a);let u;if(n)u=Cs*.5;else{const h=Math.max(i.near,Mo.distanceToPoint(gi.origin));u=of(i,h,l.resolution)}Mo.expandByScalar(u),gi.intersectsBox(Mo)!==!1&&(n?aS(this,t):oS(this,i,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Jc),this.material.uniforms.resolution.value.set(Jc.z,Jc.w))}}class md extends sm{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}setFromPoints(e){const t=e.length-1,n=new Float32Array(6*t);for(let i=0;i<t;i++)n[6*i]=e[i].x,n[6*i+1]=e[i].y,n[6*i+2]=e[i].z||0,n[6*i+3]=e[i+1].x,n[6*i+4]=e[i+1].y,n[6*i+5]=e[i+1].z||0;return super.setPositions(n),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class rm extends lS{constructor(e=new md,t=new rc({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const Li={R0:.35,R1:1.6,R2:2.2,R3:3};function am(r){const e=[];e.push({id:r.root.id,name:r.root.name,layer:0,position:new R(0,0,Li.R0)});const t=r.lifelines.filter(i=>i.parent_id===r.root.id),n=t.length;return t.forEach((i,s)=>{const a=s/n*Math.PI*2,o=Qc(Li.R1,a,0);e.push({id:i.id,name:i.name,layer:1,position:o,parentId:r.root.id})}),r.lifelines.filter(i=>i.parent_id!==r.root.id).forEach(i=>{const s=e.find(f=>f.id===i.parent_id);if(!s)return;const a=r.lifelines.filter(f=>f.parent_id===i.parent_id),o=a.findIndex(f=>f.id===i.id),l=Math.atan2(s.position.y,s.position.x),c=Math.PI/4,u=o-(a.length-1)/2,h=l+u*(c/Math.max(a.length,1)),d=Qc(Li.R2,h,(Math.random()-.5)*.15);e.push({id:i.id,name:i.name,layer:2,position:d,parentId:i.parent_id})}),r.entities.forEach(i=>{const s=e.find(f=>f.id===i.lifeline_id);if(!s)return;const a=r.entities.filter(f=>f.lifeline_id===i.lifeline_id),o=a.findIndex(f=>f.id===i.id),l=Math.atan2(s.position.y,s.position.x),c=Math.PI/6,u=o-(a.length-1)/2,h=l+u*(c/Math.max(a.length,1)),d=Qc(Li.R3,h+(Math.random()-.5)*.08,(Math.random()-.5)*.12);e.push({id:i.id,name:i.title,layer:3,position:d,parentId:i.lifeline_id,kind:i.kind})}),e}function Qc(r,e,t){const n=r*Math.cos(t)*Math.cos(e),i=r*Math.sin(t),s=r*Math.cos(t)*Math.sin(e);return new R(n,i,s)}function cS(r,e,t,n){const i=r.find(_=>_.id===e);if(!i)return{targets:new Map,constellationIds:new Set};const s=i.position.clone(),a=n.clone().normalize(),o=new R(0,1,0),l=new R().crossVectors(a,o);if(l.length()<.001){const _=new R(1,0,0);l.crossVectors(a,_).normalize()}else l.normalize();const c=new R().crossVectors(l,a).normalize(),u=new Map,h=new Set;u.set(e,s.clone()),h.add(e);const d=[];let f=i.parentId;for(;f&&d.length<2;){const _=r.find(y=>y.id===f);if(_)d.push(_),f=_.parentId;else break}d.forEach((_,y)=>{const E=s.clone().addScaledVector(a,.18+y*.14).addScaledVector(c,.06);u.set(_.id,E),h.add(_.id)});const m=r.filter(_=>_.id!==e&&_.layer===3&&_.parentId===i.parentId).slice(0,12);m.forEach((_,y)=>{const E=m.length===1?0:(y/(m.length-1)-.5)*(Math.PI*2/3),S=s.clone().addScaledVector(a,.12).addScaledVector(l,Math.cos(E)*.25).addScaledVector(c,Math.sin(E)*.25);u.set(_.id,S),h.add(_.id)});const x=new Set;for(const _ of t)_.confidence>=.7&&_.status!=="rejected"&&(_.from===e&&x.add(_.to),_.to===e&&x.add(_.from));const g=r.filter(_=>x.has(_.id)&&!h.has(_.id)).slice(0,6);g.forEach((_,y)=>{const E=g.length===1?0:(y/(g.length-1)-.5)*(Math.PI/2),S=s.clone().addScaledVector(a,-.08).addScaledVector(l,Math.cos(E)*.22).addScaledVector(c,Math.sin(E)*.22);u.set(_.id,S),h.add(_.id)});const p=new Set;for(const _ of t)_.confidence>=.3&&_.confidence<.7&&_.status!=="rejected"&&(_.from===e&&p.add(_.to),_.to===e&&p.add(_.from));const v=r.filter(_=>p.has(_.id)&&!h.has(_.id)).slice(0,6);return v.forEach((_,y)=>{const E=v.length===1?0:(y/(v.length-1)-.5)*(Math.PI*5/6),S=s.clone().addScaledVector(a,-.04).addScaledVector(l,Math.cos(E)*.38).addScaledVector(c,Math.sin(E)*.38);u.set(_.id,S),h.add(_.id)}),{targets:u,constellationIds:h}}const uS=Object.freeze(Object.defineProperty({__proto__:null,RADII:Li,computeFocusLayout:cS,computeLayout:am},Symbol.toStringTag,{value:"Module"}));function jn(r){const e=getComputedStyle(document.documentElement).getPropertyValue(r).trim();if(!e)return"#6ee7d0";const t=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);return t?"#"+[t[1],t[2],t[3]].map(n=>parseInt(n).toString(16).padStart(2,"0")).join(""):e}function dS(r){const e=[];for(const t of r)e.push(t.x,t.y,t.z);return e}async function hS(r,e){const t=new Bu;t.background=new Ue("#07090d");const n=r.clientWidth,i=r.clientHeight,s=new fe(n,i),a=new Kt(60,n/i,.1,20);a.position.set(0,2.5,5.5),a.lookAt(0,0,0);const o=new im({canvas:r,antialias:!0});o.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.setSize(n,i);const l=am(e),c=[],u=[],h=[],d=[];for(const _ of l){let y,E;const S=_.layer===0||_.layer===1?1:_.layer===2?.9:.85;if(_.layer===0)y=new ei(.06,16,16),E=new nn({color:jn("--accent")});else if(_.layer===1)y=new ei(.05,12,12),E=new nn({color:jn("--accent"),transparent:!0,opacity:S});else if(_.layer===2)y=new ei(.03,8,8),E=new nn({color:jn("--text-2"),transparent:!0,opacity:S});else{_.kind==="task"?y=new is(.022,.022,.022):_.kind==="decision"?y=new Sr(.022):_.kind==="memory"?y=new ei(.02,8,8):_.kind==="item"?y=new wa(.02):y=new ei(.015,8,8);const w={task:"--accent",memory:"--text-2",decision:"--warm",item:"--text-3"}[_.kind||""]||"--text-3";E=new nn({color:jn(w),transparent:!0,opacity:S})}const C=new At(y,E);if(C.position.copy(_.position),C.userData={id:_.id,name:_.name,kind:_.kind,layer:_.layer,parentId:_.parentId,homePosition:_.position.clone(),targetPosition:_.position.clone()},t.add(C),c.push(C),u.push(C),_.layer===3){const b=new ei(.04,8,8),w=new nn({visible:!1}),P=new At(b,w);P.position.copy(_.position),P.userData=C.userData,u.push(P)}}for(const _ of l){if(!_.parentId)continue;const y=l.find(P=>P.id===_.parentId);if(!y)continue;const E=8,S=[];for(let P=0;P<=E;P++){const L=P/E,k=new R().lerpVectors(y.position,_.position,L).normalize().multiplyScalar(y.position.length()*(1-L)+_.position.length()*L);S.push(k)}const C=new md;C.setPositions(dS(S));const b=new rc({color:new Ue(jn("--line-2")),linewidth:1.5,worldUnits:!1,resolution:s,transparent:!0,opacity:.65,depthTest:!0});d.push(b);const w=new rm(C,b);w.computeLineDistances(),w.userData={fromLayer:y.layer,toLayer:_.layer},t.add(w),h.push(w)}const f=new Ds(Li.R1,.006,8,80),m=new At(f,new nn({color:jn("--line-2"),transparent:!0,opacity:.12}));m.rotation.x=gl.degToRad(15),t.add(m);const x=new Ds(Li.R2,.004,8,80),g=new At(x,new nn({color:jn("--line-2"),transparent:!0,opacity:.08}));g.rotation.x=gl.degToRad(15),t.add(g);function p(_,y){s.set(_,y),d.forEach(E=>{E.resolution.set(_,y)})}function v(){t.traverse(_=>{if(_ instanceof At){_.geometry?.dispose();const y=_.material;y instanceof jt&&(Array.isArray(y)?y.forEach(E=>E.dispose()):y.dispose())}}),h.forEach(_=>{_.geometry?.dispose()}),d.forEach(_=>_.dispose()),o.dispose()}return{scene:t,camera:a,renderer:o,nodes:c,pickables:u,lines:h,orbit:m,layoutNodes:l,dispose:v,setResolution:p}}const lf=1,fS=3.5;function pS(r){return Math.max(lf,Math.min(fS,lf+(r-.3)*3.57))}function mS(r,e,t,n){const i=new R().subVectors(e,r).normalize(),s=.03+n*.005,a=new Mr(s,s*2.5,6,1),o=new nn({color:new Ue(t)}),l=new At(a,o),c=e.clone().addScaledVector(i,-.04);l.position.copy(c);const u=new hn;return u.setFromUnitVectors(new R(0,1,0),i),l.setRotationFromQuaternion(u),l}function gS(r,e,t,n,i){const s=i||new fe(window.innerWidth,window.innerHeight),a=[],o=e.associations.filter(c=>(c.from===n||c.to===n)&&c.confidence>=.7).slice(0,20),l={co_occurrence:"--text-3",causal:"--accent",tension:"--warm",derived_from:"--accent-dim",manual:"--accent"};for(const c of o){const u=t.find(_=>_.id===c.from),h=t.find(_=>_.id===c.to);if(!u||!h)continue;const d=new md;d.setPositions([u.position.x,u.position.y,u.position.z,h.position.x,h.position.y,h.position.z]);const f=pS(c.confidence),m=.5+(c.confidence-.5)*.8,x=jn(l[c.relation_type]||"--text-3"),g=new rc({color:new Ue(x),linewidth:f,worldUnits:!1,resolution:s,transparent:!0,opacity:c.status==="pending"?m*.8:m,depthTest:!1,dashed:c.status==="pending",dashSize:.06,gapSize:.04}),p=new rm(d,g);p.computeLineDistances(),p.userData={associationId:c.id,...c,_origLinewidth:f,_origColor:p.material.color.getHex()},r.add(p);let v;c.status==="accepted"&&(v=mS(u.position,h.position,x,f),r.add(v)),a.push({line:p,data:c,fromNode:u,toNode:h,arrow:v})}return a}function _S(r,e,t=.05){r.forEach(n=>{const i=n.userData.id,s=n.material;e.has(i)?(s.opacity=1,s.transparent=!0):(s.opacity=t,s.transparent=!0),s.needsUpdate=!0})}function cf(r){r.forEach(e=>{const t=e.userData.layer,n=t===0||t===1?1:t===2?.9:.85,i=e.material;i.opacity=n,i.transparent=!0,i.needsUpdate=!0})}function vS(r,e,t=6){const n=1-Math.exp(-t*e);for(const i of r){const s=i.userData.targetPosition;s&&i.position.lerp(s,n)}}function xS(r,e,t=.06){om(r,e,t)}function om(r,e,t=.06){for(const n of r){const i=n.userData.id,s=n.userData.layer,a=n.material;if(e.has(i)){const o=s===0||s===1?1:s===2?.9:.85;a.opacity=o}else a.opacity=t;a.transparent=!0,a.needsUpdate=!0}}function yS(r,e,t){const n=new Ds(.04,.004,8,16),i=new nn({color:new Ue(t),transparent:!0,opacity:.5}),s=new At(n,i);return s.position.copy(e),s.name="focusHalo",s.renderOrder=999,s.material.depthTest=!1,s.material.depthWrite=!1,r.add(s),s}function eu(r){const e=r.getObjectByName("focusHalo");if(e&&(r.remove(e),e.geometry&&e.geometry.dispose(),e.material)){const t=e.material;Array.isArray(t)?t.forEach(n=>n.dispose()):t.dispose()}}function bS(r,e,t,n){for(const i of r){const s=i.userData.id;if(i.userData.layer===3&&t.has(s)){i.scale.setScalar(1.3);const a=i.material;a._pathOrigColor=a._pathOrigColor??a.color.getHex(),a.color.set("#a0fff0"),a.needsUpdate=!0}}for(const i of e){const s=i.line.material;n.has(i.data.id)?(s._pathOrigLinewidth=s._pathOrigLinewidth??s.linewidth,s._pathOrigColor=s._pathOrigColor??s.color.getHex(),s.linewidth=(s._pathOrigLinewidth||1.5)*2,s.color.set("#a0fff0"),s.opacity=1):s.opacity=.15}}function uf(r,e){for(const t of r){const n=t.material;n._pathOrigColor!==void 0&&(n.color.setHex(n._pathOrigColor),delete n._pathOrigColor,t.scale.setScalar(1),n.needsUpdate=!0)}for(const t of e){const n=t.line.material;n._pathOrigLinewidth!==void 0&&(n.linewidth=n._pathOrigLinewidth,delete n._pathOrigLinewidth),n._pathOrigColor!==void 0&&(n.color.setHex(n._pathOrigColor),delete n._pathOrigColor),n.opacity=n.opacity<.2?.8:n.opacity}}function MS(r){return r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2}let Fn=null;function wo(r,e,t,n,i,s=800){Fn={elapsed:0,duration:s,from:{position:r.position.clone(),target:e.target.clone(),fov:r.fov},to:{position:t.clone(),target:n.clone(),fov:i}}}function SS(r,e,t){if(!Fn)return!1;Fn.elapsed+=r*1e3;const n=Math.min(Fn.elapsed/Fn.duration,1),i=MS(n);return e.position.lerpVectors(Fn.from.position,Fn.to.position,i),t.target.lerpVectors(Fn.from.target,Fn.to.target,i),e.fov=Fn.from.fov+(Fn.to.fov-Fn.from.fov)*i,e.updateProjectionMatrix(),n>=1?(Fn=null,!1):!0}const wS={class:"breadcrumb"},ES={key:0,class:"sep"},TS=["onClick"],AS={key:2,class:"crumb-current"},CS=$n({__name:"Breadcrumb",props:{state:{}},emits:["nav"],setup(r,{emit:e}){const t=r,n=e,i=vr(),s=dn(()=>{const a=t.state,o=[{label:"Atlas",action:{kind:"global_overview"}}],l=a.kind==="region_zoom"?a.lifeline_id:a.kind==="node_focus"||a.kind==="relation_reveal"?i.data?.entities.find(h=>h.id===a.entity_id)?.lifeline_id:null;if(!l)return o;const c=[];let u=l;for(;u;){const h=i.data?.lifelines.find(f=>f.id===u);if(!h)break;const d=h.parent_id==="ROOT"?1:2;c.unshift({id:h.id,name:h.name,layer:d}),u=h.parent_id!=="ROOT"?h.parent_id:void 0}for(const h of c)o.push({label:h.name,action:{kind:"region_zoom",lifeline_id:h.id}});if(a.kind==="node_focus"||a.kind==="relation_reveal"){const h=a.entity_id,d=i.data?.entities.find(f=>f.id===h);d&&o.push({label:d.title.slice(0,20),action:null}),a.kind==="relation_reveal"&&o.push({label:"(关联)",action:null})}return o});return(a,o)=>(Y(),Q("div",wS,[(Y(!0),Q(et,null,sn(s.value,(l,c)=>(Y(),Q(et,{key:c},[c>0?(Y(),Q("span",ES,"›")):We("",!0),l.action?(Y(),Q("button",{key:1,class:"crumb-link",onClick:u=>n("nav",l.action)},Me(l.label),9,TS)):(Y(),Q("span",AS,Me(l.label),1))],64))),128))]))}}),RS=Xn(CS,[["__scopeId","data-v-54bd57ef"]]),IS={key:0,class:"lifeline-panel"},PS={class:"panel-header"},LS={class:"stats-row"},DS={class:"stats-count"},US={class:"stats-kinds"},NS={class:"kind-t"},FS={class:"kind-m"},OS={class:"kind-d"},kS={class:"kind-i"},BS={key:0,class:"inline-form"},zS=["value"],VS={class:"form-actions"},GS={key:0,class:"drop-line"},HS=["onDragstart","onDragover","onDrop"],WS=["onClick"],XS=["onClick","onDblclick"],$S={class:"kind-t"},qS={class:"kind-m"},YS={class:"kind-d"},ZS={class:"kind-i"},JS={class:"badge"},KS={key:0,class:"actions"},jS=["onClick"],QS=["onClick"],ew=["onKeyup"],tw={class:"form-actions"},nw=["onClick"],iw=["onClick"],sw={key:0,class:"confirm-delete"},rw={class:"form-actions"},aw=["onClick"],ow=["onClick"],lw={class:"entity-kind"},cw={class:"entity-title"},uw=["onClick"],dw=["onClick"],hw={key:1,class:"empty"},fw={class:"search-box"},pw={key:0,class:"loading-text"},mw={key:1,class:"search-results"},gw={key:0,class:"loading-text"},_w=["onClick"],vw={class:"entity-kind"},xw={class:"entity-title"},yw={key:0,class:"mounted-tag"},bw=$n({__name:"LifelinePanel",emits:["focus-lifeline","focus-entity"],setup(r,{emit:e}){const t=e,n=vr(),i=dn(()=>{const re=n.state;return re.kind==="region_zoom"?re.lifeline_id??null:re.kind==="node_focus"||re.kind==="relation_reveal"?n.data?.entities.find(he=>he.id===re.entity_id)?.lifeline_id??null:null}),s=dn(()=>{const re=n.state;return re.kind==="node_focus"||re.kind==="relation_reveal"?re.entity_id??null:null}),a=dn(()=>{if(!n.data)return{lifelines:0,entities:0,byKind:{task:0,memory:0,decision:0,item:0}};const re={task:0,memory:0,decision:0,item:0};for(const he of n.data.entities)re[he.kind]!==void 0&&re[he.kind]++;return{lifelines:n.data.lifelines.length,entities:n.data.entities.length,byKind:re}});function o(re){const he={task:0,memory:0,decision:0,item:0};if(!n.data)return he;for(const ne of n.data.entities)ne.lifeline_id===re&&he[ne.kind]!==void 0&&he[ne.kind]++;return he}const l=Xe(new Set),c=Xe(!1),u=Xe(null),h=Xe(null),d=Xe(null),f=Xe(null),m=Xe(-1),x=Xe(null);function g(re,he){f.value={id:he.id,parentId:he.parent_id},x.value=he.parent_id,re.dataTransfer&&(re.dataTransfer.effectAllowed="move",re.dataTransfer.setData("text/plain",he.id))}function p(re,he){re.preventDefault(),m.value=he}function v(){m.value=-1}function _(re){re.preventDefault()}async function y(re,he,ne){if(re.preventDefault(),m.value=-1,!f.value||!n.data)return;const{id:ie,parentId:te}=f.value;if(te!==ne){f.value=null,x.value=null;return}const ae=n.data.lifelines.filter(Ke=>Ke.parent_id===te);ae.sort((Ke,xe)=>Ke.order_index-xe.order_index);const me=ae.findIndex(Ke=>Ke.id===ie);if(me===-1||me===he){f.value=null,x.value=null;return}const ge=[...ae.slice(0,me),...ae.slice(me+1)],je=he>me?he-1:he,U=je>0?ge[je-1]:null,nt=je<ge.length?ge[je]:null;let Be;U?nt?Be=(U.order_index+nt.order_index)/2:Be=U.order_index+1:Be=(nt?.order_index??1)-1,f.value=null,x.value=null,await n.updateLifeline(ie,{order_index:Be})}function E(){f.value=null,x.value=null,m.value=-1}const S=Xe(""),C=Xe([]),b=Xe(!1),w=Xe(""),P=Xe(""),L=Xe("ROOT"),k=Xe(""),$=dn(()=>{if(!n.data)return[];const re=n.data.lifelines,he={};for(const ie of re){const te=ie.parent_id;he[te]||(he[te]=[]),he[te].push(ie)}function ne(ie,te){return(he[ie]||[]).map(me=>({lifeline:me,children:ne(me.id,te+1),depth:te}))}return ne("ROOT",0)});function z(re){return n.data?n.data.entities.filter(he=>he.lifeline_id===re).length:0}function N(re){return n.data?n.data.entities.filter(he=>he.lifeline_id===re):[]}function V(re){l.value.has(re)?l.value.delete(re):l.value.add(re)}function G(re){return l.value.has(re)}function le(re){return i.value===re}function pe(re){t("focus-lifeline",re)}async function Ee(){!w.value.trim()||!P.value.trim()||(await n.createLifeline({id:w.value.trim(),name:P.value.trim(),parent_id:L.value==="ROOT"?void 0:L.value}),w.value="",P.value="",L.value="ROOT",c.value=!1)}function Ie(re){u.value=re.id,k.value=re.name}async function Fe(re){k.value.trim()&&k.value!==re.name&&await n.updateLifeline(re.id,{name:k.value.trim()}),u.value=null}function tt(){u.value=null}async function ce(re){await n.deleteLifeline(re.id),h.value=null}async function q(re){const he=re.id.split(":"),ne=he[0],ie=parseInt(he.slice(1).join(":"),10);await n.mountEntity(ne,ie,null)}async function F(re){d.value=re,S.value="",C.value=[]}async function K(){const re=S.value.trim();if(!(!re||re.length<1)){b.value=!0;try{const{searchAll:he}=await Tt(async()=>{const{searchAll:te}=await import("./index-CmSQsQ1p.js").then(ae=>ae.e);return{searchAll:te}},__vite__mapDeps([0,1,2])),ne=await he(re,5),ie=[];for(const te of ne.items||[]){const ae=`item:${te.id}`,me=n.data?.entities.find(ge=>ge.id===ae);ie.push({id:ae,kind:"item",title:te.content?.slice(0,60)||"",lifeline_id:me?.lifeline_id,mounted_name:me?.lifeline_id?n.data?.lifelines.find(ge=>ge.id===me.lifeline_id)?.name||me.lifeline_id:void 0})}for(const te of ne.tasks||[]){const ae=`task:${te.id}`,me=n.data?.entities.find(ge=>ge.id===ae);ie.push({id:ae,kind:"task",title:te.title?.slice(0,60)||"",lifeline_id:me?.lifeline_id,mounted_name:me?.lifeline_id?n.data?.lifelines.find(ge=>ge.id===me.lifeline_id)?.name||me.lifeline_id:void 0})}for(const te of ne.memories||[]){const ae=`memory:${te.id}`,me=n.data?.entities.find(ge=>ge.id===ae);ie.push({id:ae,kind:"memory",title:te.content?.slice(0,60)||"",lifeline_id:me?.lifeline_id,mounted_name:me?.lifeline_id?n.data?.lifelines.find(ge=>ge.id===me.lifeline_id)?.name||me.lifeline_id:void 0})}for(const te of ne.decisions||[]){const ae=`decision:${te.id}`,me=n.data?.entities.find(ge=>ge.id===ae);ie.push({id:ae,kind:"decision",title:te.title?.slice(0,60)||"",lifeline_id:me?.lifeline_id,mounted_name:me?.lifeline_id?n.data?.lifelines.find(ge=>ge.id===me.lifeline_id)?.name||me.lifeline_id:void 0})}C.value=ie}finally{b.value=!1}}}async function ue(re){if(!d.value)return;const he=re.id.split(":"),ne=he[0],ie=parseInt(he.slice(1).join(":"),10);await n.mountEntity(ne,ie,d.value),d.value=null,C.value=[]}function ye(){d.value=null,C.value=[]}function Ve(){return n.data?[{id:"ROOT",name:"ROOT (根级)"},...n.data.lifelines.map(re=>({id:re.id,name:re.name}))]:[{id:"ROOT",name:"ROOT (根级)"}]}return(re,he)=>Je(n).data?(Y(),Q("div",IS,[D("div",PS,[he[10]||(he[10]=D("span",{class:"panel-title"},"Lifeline",-1)),D("button",{class:"btn-text",onClick:he[0]||(he[0]=ne=>c.value=!c.value)},"+ 新建")]),D("div",LS,[D("span",DS,Me(a.value.lifelines)+" lifeline · "+Me(a.value.entities)+" entity",1),D("span",US,[D("span",NS,"T:"+Me(a.value.byKind.task),1),D("span",FS,"M:"+Me(a.value.byKind.memory),1),D("span",OS,"D:"+Me(a.value.byKind.decision),1),D("span",kS,"I:"+Me(a.value.byKind.item),1)])]),c.value?(Y(),Q("div",BS,[Lt(D("input",{"onUpdate:modelValue":he[1]||(he[1]=ne=>w.value=ne),class:"field",placeholder:"ID (英文短名)",onKeyup:Qn(Ee,["enter"])},null,544),[[Xt,w.value]]),Lt(D("input",{"onUpdate:modelValue":he[2]||(he[2]=ne=>P.value=ne),class:"field",placeholder:"显示名称",onKeyup:Qn(Ee,["enter"])},null,544),[[Xt,P.value]]),Lt(D("select",{"onUpdate:modelValue":he[3]||(he[3]=ne=>L.value=ne),class:"field"},[(Y(!0),Q(et,null,sn(Ve(),ne=>(Y(),Q("option",{key:ne.id,value:ne.id},Me(ne.name),9,zS))),128))],512),[[ws,L.value]]),D("div",VS,[D("button",{class:"btn-text",onClick:Ee},"保存"),D("button",{class:"btn-text",onClick:he[4]||(he[4]=ne=>c.value=!1)},"取消")])])):We("",!0),D("div",{class:"tree",onDragover:_,onDrop:he[7]||(he[7]=mn(()=>{},["prevent"]))},[(Y(!0),Q(et,null,sn($.value,(ne,ie)=>(Y(),Q(et,{key:ne.lifeline.id},[m.value===ie&&x.value===ne.lifeline.parent_id?(Y(),Q("div",GS)):We("",!0),D("div",{class:An(["tree-row",{active:le(ne.lifeline.id),dragging:f.value?.id===ne.lifeline.id}]),style:ar({paddingLeft:ne.depth*16+4+"px"}),draggable:!0,onDragstart:te=>g(te,ne.lifeline),onDragover:te=>p(te,ie),onDragleave:v,onDrop:te=>y(te,ie,ne.lifeline.parent_id),onDragend:E},[D("span",{class:An(["drag-handle",{visible:f.value}])},"⠿",2),D("span",{class:"arrow",onClick:te=>V(ne.lifeline.id)},Me(G(ne.lifeline.id)?"▼":"▶"),9,WS),D("span",{class:"name",onClick:te=>pe(ne.lifeline.id),onDblclick:mn(te=>Ie(ne.lifeline),["stop"])},[Cn(Me(ne.lifeline.name)+" ",1),G(ne.lifeline.id)?(Y(),Q(et,{key:0},[D("span",$S,"T:"+Me(o(ne.lifeline.id).task),1),D("span",qS,"M:"+Me(o(ne.lifeline.id).memory),1),D("span",YS,"D:"+Me(o(ne.lifeline.id).decision),1),D("span",ZS,"I:"+Me(o(ne.lifeline.id).item),1)],64)):We("",!0),D("span",JS,"("+Me(z(ne.lifeline.id))+")",1)],40,XS),u.value!==ne.lifeline.id?(Y(),Q("span",KS,[D("button",{class:"btn-icon",onClick:mn(te=>Ie(ne.lifeline),["stop"]),title:"编辑名称"},"✎",8,jS),D("button",{class:"btn-icon",onClick:mn(te=>h.value=ne.lifeline.id,["stop"]),title:"删除 lifeline"},"✕",8,QS)])):We("",!0)],46,HS),u.value===ne.lifeline.id?(Y(),Q("div",{key:1,class:"inline-edit",style:ar({paddingLeft:ne.depth*16+20+"px"})},[Lt(D("input",{"onUpdate:modelValue":he[5]||(he[5]=te=>k.value=te),class:"field",onKeyup:[Qn(te=>Fe(ne.lifeline),["enter"]),Qn(tt,["esc"])]},null,40,ew),[[Xt,k.value]]),D("div",tw,[D("button",{class:"btn-text",onClick:te=>Fe(ne.lifeline)},"保存",8,nw),D("button",{class:"btn-text",onClick:tt},"取消"),h.value!==ne.lifeline.id?(Y(),Q("button",{key:0,class:"btn-text danger",onClick:te=>h.value=ne.lifeline.id},"删除",8,iw)):We("",!0)]),h.value===ne.lifeline.id?(Y(),Q("div",sw,[Cn(" 确定删除「"+Me(ne.lifeline.name)+"」？挂载的 "+Me(z(ne.lifeline.id))+" 个 entity 将被卸载。 ",1),D("div",rw,[D("button",{class:"btn-text danger",onClick:te=>ce(ne.lifeline)},"确认删除",8,aw),D("button",{class:"btn-text",onClick:he[6]||(he[6]=te=>h.value=null)},"取消")])])):We("",!0)],4)):We("",!0),G(ne.lifeline.id)?(Y(),Q(et,{key:2},[(Y(!0),Q(et,null,sn(N(ne.lifeline.id),te=>(Y(),Q("div",{key:te.id,class:An(["entity-row",{active:s.value===te.id}]),style:ar({paddingLeft:ne.depth*16+28+"px"}),onClick:ae=>t("focus-entity",te.id)},[D("span",lw,Me(te.kind[0].toUpperCase()),1),D("span",cw,Me(te.title.slice(0,30)),1),D("button",{class:"btn-icon",onClick:mn(ae=>q(te),["stop"]),title:"卸载"},"×",8,uw)],14,ow))),128)),D("div",{class:"entity-row add-entity",style:ar({paddingLeft:ne.depth*16+28+"px"})},[D("button",{class:"btn-text",onClick:te=>F(ne.lifeline.id)},"+ 关联 entity",8,dw)],4)],64)):We("",!0)],64))),128))],32),$.value.length===0&&!c.value?(Y(),Q("div",hw,[he[11]||(he[11]=D("div",{class:"empty-icon"},"◇",-1)),he[12]||(he[12]=D("div",{class:"empty-title"},"暂无 Lifeline",-1)),he[13]||(he[13]=D("div",{class:"empty-desc"},[Cn(' Lifeline 是实体分类的主线，例如"健康""学习""工作"。'),D("br"),Cn(" 创建后实体将分布在 3D 球面上。 ")],-1)),D("button",{class:"btn-text",onClick:he[8]||(he[8]=ne=>c.value=!0)},"+ 创建第一个 Lifeline")])):We("",!0),d.value?(Y(),Q("div",{key:2,class:"search-overlay",onClick:mn(ye,["self"])},[D("div",fw,[Lt(D("input",{"onUpdate:modelValue":he[9]||(he[9]=ne=>S.value=ne),class:"field",placeholder:"搜索 entity...",onKeyup:Qn(K,["enter"])},null,544),[[Xt,S.value]]),D("button",{class:"btn-text",onClick:K},"搜索"),b.value?(Y(),Q("div",pw,"搜索中...")):(Y(),Q("div",mw,[C.value.length===0&&S.value?(Y(),Q("div",gw,"无结果")):We("",!0),(Y(!0),Q(et,null,sn(C.value,ne=>(Y(),Q("div",{key:ne.id,class:An(["search-row",{mounted:ne.mounted_name}]),onClick:ie=>ne.mounted_name?null:ue(ne)},[D("span",vw,Me(ne.kind[0].toUpperCase()),1),D("span",xw,Me(ne.title.slice(0,40)),1),ne.mounted_name?(Y(),Q("span",yw,"已归类到 "+Me(ne.mounted_name),1)):We("",!0)],10,_w))),128))]))])])):We("",!0)])):We("",!0)}}),Mw=Xn(bw,[["__scopeId","data-v-0c96ae5f"]]),Sw={key:0,class:"node-detail-card"},ww={class:"card-header"},Ew={class:"kind-badge"},Tw={class:"entity-id-row"},Aw=["title"],Cw={class:"lifeline-path"},Rw={key:1,class:"no-lifeline"},Iw={key:0,class:"detail-loading"},Pw={key:1,class:"detail-error"},Lw={key:2,class:"detail-section"},Dw={key:0,class:"field-row"},Uw=["onDblclick"],Nw=["onClick"],Fw={key:1,class:"field-row"},Ow=["onDblclick"],kw=["onClick"],Bw={key:2,class:"field-row"},zw=["onDblclick"],Vw=["onClick"],Gw={key:3,class:"field-row"},Hw=["onDblclick"],Ww=["onClick"],Xw={key:4,class:"field-row"},$w=["onDblclick"],qw=["onClick"],Yw={key:5,class:"field-row"},Zw=["onDblclick"],Jw=["onClick"],Kw={key:6,class:"field-row"},jw=["onDblclick"],Qw=["onClick"],e1={key:7,class:"field-row"},t1=["onDblclick"],n1=["onClick"],i1={key:8,class:"field-row"},s1={class:"field-value"},r1=["onClick"],a1={key:9,class:"field-row"},o1={class:"field-value"},l1=["onClick"],c1={key:10,class:"field-row"},u1={class:"field-label"},d1={class:"field-value readonly"},h1={key:11,class:"field-row"},f1={class:"field-label"},p1=["onDblclick"],m1={key:0,class:"field-row"},g1={class:"field-value readonly"},_1={key:3,class:"actions-section"},v1={class:"assoc-section"},x1={class:"assoc-title"},y1={key:0,class:"empty-text"},b1=["onClick"],M1={class:"confidence"},S1={key:0,class:"assoc-actions"},w1=["onClick"],E1=["onClick"],T1={class:"assoc-edit-actions"},A1=["onClick"],C1=["onClick"],R1=["onClick"],I1={key:0,class:"evidence-block"},P1={class:"evidence-title"},L1={key:0,class:"no-evidence"},D1={class:"evidence-excerpt"},U1={class:"evidence-meta"},N1={class:"evidence-type"},F1={class:"evidence-weight"},O1=$n({__name:"NodeDetailCard",emits:["edit-assoc","delete-assoc","copied"],setup(r,{expose:e,emit:t}){const n=vr(),i=dn(()=>{const ce=n.state;if(ce.kind!=="node_focus"&&ce.kind!=="relation_reveal")return null;const q=ce.entity_id;return n.data?.entities.find(F=>F.id===q)??null}),s=Xe(null),a=Xe(!1),o=Xe(!1);async function l(){if(!i.value)return;const ce=i.value.id,q=n.entityDetailCache.get(ce);if(q){s.value=q;return}a.value=!0,o.value=!1;try{const F=ce.split(":"),K=F[0],ue=parseInt(F.slice(1).join(":"),10);let ye={};if(K==="task"){const{getTask:Ve}=await Tt(async()=>{const{getTask:he}=await import("./index-CmSQsQ1p.js").then(ne=>ne.e);return{getTask:he}},__vite__mapDeps([0,1,2])),re=await Ve(ue);ye=re.task||re}else if(K==="memory"){const{getMemory:Ve}=await Tt(async()=>{const{getMemory:he}=await import("./index-CmSQsQ1p.js").then(ne=>ne.e);return{getMemory:he}},__vite__mapDeps([0,1,2])),re=await Ve(ue);ye=re.memory||re}else if(K==="decision"){const{getDecision:Ve}=await Tt(async()=>{const{getDecision:he}=await import("./index-CmSQsQ1p.js").then(ne=>ne.e);return{getDecision:he}},__vite__mapDeps([0,1,2])),re=await Ve(ue);ye=re.decision||re}else if(K==="item"){const{getItem:Ve}=await Tt(async()=>{const{getItem:he}=await import("./index-CmSQsQ1p.js").then(ne=>ne.e);return{getItem:he}},__vite__mapDeps([0,1,2])),re=await Ve(ue);ye=re.item||re}s.value=ye,n.entityDetailCache.set(ce,ye)}catch{o.value=!0}finally{a.value=!1}}Co(()=>i.value?.id,()=>{s.value=null,l()},{immediate:!0});const c=Xe(!1),u=Xe(null),h=Xe("");function d(){i.value&&(h.value=i.value.title,c.value=!0,nu(()=>u.value?.focus()))}async function f(){if(!i.value)return;const ce=h.value.trim();if(!ce||ce===i.value.title){c.value=!1;return}const q=i.value.id.split(":"),F=q[0],K=parseInt(q.slice(1).join(":"),10);try{await n.updateEntityTitle(F,K,ce)}catch{await n.reload()}c.value=!1}function m(){c.value=!1}function x(ce){ce.key==="Enter"?(ce.stopPropagation(),f()):ce.key==="Escape"&&(ce.stopPropagation(),m())}const g=Xe(null),p=Xe(null),v=Xe("");function _(ce){if(!s.value)return;const q=s.value[ce];v.value=q!=null?String(q):"",g.value=ce,nu(()=>p.value?.focus())}async function y(){if(!i.value||!g.value||!s.value)return;const ce=g.value,q=v.value.trim();if(q===String(s.value[ce]||"")){g.value=null;return}const F=i.value.id.split(":"),K=F[0],ue=parseInt(F.slice(1).join(":"),10);try{const{updateEntityField:ye}=await Tt(async()=>{const{updateEntityField:Ve}=await import("./index-CmSQsQ1p.js").then(re=>re.e);return{updateEntityField:Ve}},__vite__mapDeps([0,1,2]));await ye(K,ue,{[ce]:q}),s.value={...s.value,[ce]:q},n.entityDetailCache.set(i.value.id,s.value)}catch{}g.value=null}function E(){g.value=null}function S(ce){ce.key==="Escape"?(ce.stopPropagation(),E()):(ce.key==="Enter"&&!(ce.target instanceof HTMLTextAreaElement)||(ce.ctrlKey||ce.metaKey)&&ce.key==="Enter"&&ce.target instanceof HTMLTextAreaElement)&&(ce.stopPropagation(),y())}async function C(){if(!i.value||!s.value)return;const ce=i.value.id.split(":"),q=parseInt(ce.slice(1).join(":"),10),F=s.value.status;try{if(F==="todo"){const{markTaskDone:K}=await Tt(async()=>{const{markTaskDone:ue}=await import("./index-CmSQsQ1p.js").then(ye=>ye.e);return{markTaskDone:ue}},__vite__mapDeps([0,1,2]));await K(q),s.value={...s.value,status:"done"}}else{const{markTaskTodo:K}=await Tt(async()=>{const{markTaskTodo:ue}=await import("./index-CmSQsQ1p.js").then(ye=>ye.e);return{markTaskTodo:ue}},__vite__mapDeps([0,1,2]));await K(q),s.value={...s.value,status:"todo"}}n.entityDetailCache.set(i.value.id,s.value),await n.reload()}catch{await n.reload()}}async function b(){if(!i.value||!s.value)return;const ce=i.value.id.split(":"),q=parseInt(ce.slice(1).join(":"),10),F=s.value.status;try{if(F==="candidate"){const{confirmMemory:K}=await Tt(async()=>{const{confirmMemory:ue}=await import("./index-CmSQsQ1p.js").then(ye=>ye.e);return{confirmMemory:ue}},__vite__mapDeps([0,1,2]));await K(q),s.value={...s.value,status:"confirmed"}}else{const{archiveMemory:K}=await Tt(async()=>{const{archiveMemory:ue}=await import("./index-CmSQsQ1p.js").then(ye=>ye.e);return{archiveMemory:ue}},__vite__mapDeps([0,1,2]));await K(q),s.value={...s.value,status:"archived"}}n.entityDetailCache.set(i.value.id,s.value),await n.reload()}catch{await n.reload()}}const w=t;e({startEditTitle:d});const P=dn(()=>{if(!i.value||!n.data)return[];const ce=i.value.id;return n.data.associations.filter(q=>(q.from===ce||q.to===ce)&&q.status!=="rejected")}),L=dn(()=>{if(!i.value||!n.data)return null;const ce=i.value.lifeline_id;if(!ce)return null;const q=n.data.lifelines.find(F=>F.id===ce);return q?{id:q.id,name:q.name}:null});function k(ce){return ce==="task"?"T":ce==="memory"?"M":ce==="decision"?"D":ce==="item"?"I":"?"}function $(ce){switch(ce){case"co_occurrence":return"共现";case"causal":return"因果";case"tension":return"张力";case"derived_from":return"衍生";default:return ce}}function z(ce){switch(ce){case"causal":return"var(--accent)";case"tension":return"var(--text-5)";case"derived_from":return"var(--text-4)";default:return"var(--text-3)"}}function N(ce){const q=i.value.id,K=ce.from===q?ce.to:ce.from,ue=K.split(":")[0],ye=n.data?.entities.find(Ve=>Ve.id===K);return{id:K,kind:ue,title:ye?.title||K}}function V(ce){const q=N(ce);n.transition({kind:"node_focus",entity_kind:q.kind,entity_id:q.id})}function G(ce){n.transition({kind:"region_zoom",lifeline_id:ce})}async function le(ce){await navigator.clipboard.writeText(ce),w("copied")}async function pe(ce){const q=`[${ce.kind}] ${ce.title} (\`${ce.id}\`)`;await navigator.clipboard.writeText(q),w("copied")}async function Ee(ce){await n.reviewAssociation(ce,"accepted")}async function Ie(ce){await n.reviewAssociation(ce,"rejected")}function Fe(ce){return ce?ce.slice(0,10):""}function tt(ce){return ce==="detail"||ce==="content"||ce==="decision"||ce==="context"||ce==="reasoning"||ce==="expected_outcome"}return(ce,q)=>i.value?(Y(),Q("div",Sw,[D("div",ww,[D("span",Ew,Me(k(i.value.kind)),1),c.value?Lt((Y(),Q("input",{key:0,ref_key:"editInput",ref:u,"onUpdate:modelValue":q[0]||(q[0]=F=>h.value=F),class:"title-input",onBlur:f,onKeydown:x},null,544)),[[Xt,h.value]]):(Y(),Q("span",{key:1,class:"entity-name",onDblclick:d},Me(i.value.title.slice(0,40)),33))]),D("div",Tw,[D("span",{class:"entity-id",onClick:q[1]||(q[1]=F=>le(i.value.id)),title:"点击复制 "+i.value.id},Me(i.value.id),9,Aw),D("button",{class:"btn-copy-md",onClick:q[2]||(q[2]=F=>pe(i.value)),title:"复制为 Markdown"},"⎘")]),D("div",Cw,[L.value?(Y(),Q("span",{key:0,class:"lifeline-link",onClick:q[3]||(q[3]=F=>G(L.value.id))},Me(L.value.name),1)):(Y(),Q("span",Rw,"未归类"))]),a.value?(Y(),Q("div",Iw,"加载详情…")):o.value?(Y(),Q("div",Pw,[q[15]||(q[15]=Cn(" 加载详情失败 ",-1)),D("button",{class:"btn-retry",onClick:l},"重试")])):s.value?(Y(),Q("div",Lw,[q[37]||(q[37]=D("div",{class:"section-title"},"详情",-1)),(Y(!0),Q(et,null,sn(Object.keys(s.value).filter(F=>!["id","created_at","updated_at","completed_at","due_date","estimated_minutes"].includes(F)),F=>(Y(),Q(et,{key:F},[F==="title"&&i.value.kind!=="item"?(Y(),Q("div",Dw,[q[16]||(q[16]=D("span",{class:"field-label"},"标题",-1)),g.value===F?Lt((Y(),Q("input",{key:0,ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":q[4]||(q[4]=K=>v.value=K),class:"field-input",onKeydown:S,onBlur:y},null,544)),[[Xt,v.value]]):(Y(),Q(et,{key:1},[D("span",{class:"field-value",onDblclick:K=>_(F)},Me(s.value[F]?.slice(0,80)||"—"),41,Uw),D("button",{class:"field-edit-btn",onClick:K=>_(F)},"✎",8,Nw)],64))])):F==="content"&&(i.value.kind==="memory"||i.value.kind==="item")?(Y(),Q("div",Fw,[q[17]||(q[17]=D("span",{class:"field-label"},"内容",-1)),g.value===F?(Y(),Q(et,{key:0},[Lt(D("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":q[5]||(q[5]=K=>v.value=K),class:"field-textarea",rows:"3",onKeydown:S},null,544),[[Xt,v.value]]),D("div",{class:"field-actions"},[D("button",{class:"btn-save",onClick:y},"保存"),D("button",{class:"btn-cancel",onClick:E},"取消")])],64)):(Y(),Q(et,{key:1},[D("span",{class:"field-value multiline",onDblclick:K=>_(F)},Me(s.value[F]?.slice(0,200)||"—"),41,Ow),D("button",{class:"field-edit-btn",onClick:K=>_(F)},"✎",8,kw)],64))])):F==="detail"&&i.value.kind==="task"?(Y(),Q("div",Bw,[q[18]||(q[18]=D("span",{class:"field-label"},"描述",-1)),g.value===F?(Y(),Q(et,{key:0},[Lt(D("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":q[6]||(q[6]=K=>v.value=K),class:"field-textarea",rows:"3",onKeydown:S},null,544),[[Xt,v.value]]),D("div",{class:"field-actions"},[D("button",{class:"btn-save",onClick:y},"保存"),D("button",{class:"btn-cancel",onClick:E},"取消")])],64)):(Y(),Q(et,{key:1},[D("span",{class:"field-value multiline",onDblclick:K=>_(F)},Me(s.value[F]?.slice(0,200)||"—"),41,zw),D("button",{class:"field-edit-btn",onClick:K=>_(F)},"✎",8,Vw)],64))])):F==="decision"&&i.value.kind==="decision"?(Y(),Q("div",Gw,[q[19]||(q[19]=D("span",{class:"field-label"},"决策",-1)),g.value===F?(Y(),Q(et,{key:0},[Lt(D("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":q[7]||(q[7]=K=>v.value=K),class:"field-textarea",rows:"3",onKeydown:S},null,544),[[Xt,v.value]]),D("div",{class:"field-actions"},[D("button",{class:"btn-save",onClick:y},"保存"),D("button",{class:"btn-cancel",onClick:E},"取消")])],64)):(Y(),Q(et,{key:1},[D("span",{class:"field-value multiline",onDblclick:K=>_(F)},Me(s.value[F]?.slice(0,200)||"—"),41,Hw),D("button",{class:"field-edit-btn",onClick:K=>_(F)},"✎",8,Ww)],64))])):F==="context"&&i.value.kind==="decision"?(Y(),Q("div",Xw,[q[20]||(q[20]=D("span",{class:"field-label"},"背景",-1)),g.value===F?(Y(),Q(et,{key:0},[Lt(D("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":q[8]||(q[8]=K=>v.value=K),class:"field-textarea",rows:"2",onKeydown:S},null,544),[[Xt,v.value]]),D("div",{class:"field-actions"},[D("button",{class:"btn-save",onClick:y},"保存"),D("button",{class:"btn-cancel",onClick:E},"取消")])],64)):(Y(),Q(et,{key:1},[D("span",{class:"field-value multiline",onDblclick:K=>_(F)},Me(s.value[F]?.slice(0,120)||"—"),41,$w),D("button",{class:"field-edit-btn",onClick:K=>_(F)},"✎",8,qw)],64))])):F==="reasoning"&&i.value.kind==="decision"?(Y(),Q("div",Yw,[q[21]||(q[21]=D("span",{class:"field-label"},"推理",-1)),g.value===F?(Y(),Q(et,{key:0},[Lt(D("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":q[9]||(q[9]=K=>v.value=K),class:"field-textarea",rows:"2",onKeydown:S},null,544),[[Xt,v.value]]),D("div",{class:"field-actions"},[D("button",{class:"btn-save",onClick:y},"保存"),D("button",{class:"btn-cancel",onClick:E},"取消")])],64)):(Y(),Q(et,{key:1},[D("span",{class:"field-value multiline",onDblclick:K=>_(F)},Me(s.value[F]?.slice(0,120)||"—"),41,Zw),D("button",{class:"field-edit-btn",onClick:K=>_(F)},"✎",8,Jw)],64))])):F==="expected_outcome"&&i.value.kind==="decision"?(Y(),Q("div",Kw,[q[22]||(q[22]=D("span",{class:"field-label"},"预期",-1)),g.value===F?(Y(),Q(et,{key:0},[Lt(D("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":q[10]||(q[10]=K=>v.value=K),class:"field-textarea",rows:"2",onKeydown:S},null,544),[[Xt,v.value]]),D("div",{class:"field-actions"},[D("button",{class:"btn-save",onClick:y},"保存"),D("button",{class:"btn-cancel",onClick:E},"取消")])],64)):(Y(),Q(et,{key:1},[D("span",{class:"field-value multiline",onDblclick:K=>_(F)},Me(s.value[F]?.slice(0,120)||"—"),41,jw),D("button",{class:"field-edit-btn",onClick:K=>_(F)},"✎",8,Qw)],64))])):F==="priority"&&i.value.kind==="task"?(Y(),Q("div",e1,[q[24]||(q[24]=D("span",{class:"field-label"},"优先级",-1)),g.value===F?Lt((Y(),Q("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":q[11]||(q[11]=K=>v.value=K),class:"field-select",onBlur:y,onKeydown:[Qn(y,["enter"]),Qn(E,["escape"])]},[...q[23]||(q[23]=[D("option",{value:"high"},"高",-1),D("option",{value:"medium"},"中",-1),D("option",{value:"low"},"低",-1)])],544)),[[ws,v.value]]):(Y(),Q(et,{key:1},[D("span",{class:"field-value",onDblclick:K=>_(F)},Me(s.value[F]||"medium"),41,t1),D("button",{class:"field-edit-btn",onClick:K=>_(F)},"✎",8,n1)],64))])):F==="status"&&i.value.kind!=="item"?(Y(),Q("div",i1,[q[33]||(q[33]=D("span",{class:"field-label"},"状态",-1)),g.value===F?Lt((Y(),Q("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":q[12]||(q[12]=K=>v.value=K),class:"field-select",onBlur:y,onKeydown:[Qn(y,["enter"]),Qn(E,["escape"])]},[i.value.kind==="task"?(Y(),Q(et,{key:0},[q[25]||(q[25]=D("option",{value:"todo"},"待办",-1)),q[26]||(q[26]=D("option",{value:"done"},"完成",-1)),q[27]||(q[27]=D("option",{value:"cancelled"},"取消",-1))],64)):i.value.kind==="memory"?(Y(),Q(et,{key:1},[q[28]||(q[28]=D("option",{value:"candidate"},"候选",-1)),q[29]||(q[29]=D("option",{value:"confirmed"},"已确认",-1)),q[30]||(q[30]=D("option",{value:"archived"},"归档",-1))],64)):(Y(),Q(et,{key:2},[q[31]||(q[31]=D("option",{value:"pending"},"待回顾",-1)),q[32]||(q[32]=D("option",{value:"reviewed"},"已回顾",-1))],64))],544)),[[ws,v.value]]):(Y(),Q(et,{key:1},[D("span",s1,Me(s.value[F]),1),D("button",{class:"field-edit-btn",onClick:K=>_(F)},"✎",8,r1)],64))])):F==="category"&&i.value.kind==="memory"?(Y(),Q("div",a1,[q[35]||(q[35]=D("span",{class:"field-label"},"分类",-1)),g.value===F?Lt((Y(),Q("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":q[13]||(q[13]=K=>v.value=K),class:"field-select",onBlur:y,onKeydown:[Qn(y,["enter"]),Qn(E,["escape"])]},[...q[34]||(q[34]=[ta('<option value="fact" data-v-84c97b2e>事实</option><option value="preference" data-v-84c97b2e>偏好</option><option value="goal" data-v-84c97b2e>目标</option><option value="relationship" data-v-84c97b2e>关系</option><option value="event" data-v-84c97b2e>事件</option>',5)])],544)),[[ws,v.value]]):(Y(),Q(et,{key:1},[D("span",o1,Me(s.value[F]),1),D("button",{class:"field-edit-btn",onClick:K=>_(F)},"✎",8,l1)],64))])):F==="source"||F==="type"?(Y(),Q("div",c1,[D("span",u1,Me(F==="source"?"来源":"类型"),1),D("span",d1,Me(s.value[F]||"—"),1)])):!tt(F)&&F!=="title"?(Y(),Q("div",h1,[D("span",f1,Me(F),1),g.value===F?Lt((Y(),Q("input",{key:0,ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":q[14]||(q[14]=K=>v.value=K),class:"field-input",onKeydown:S,onBlur:y},null,544)),[[Xt,v.value]]):(Y(),Q("span",{key:1,class:"field-value",onDblclick:K=>_(F)},Me(s.value[F]?.slice(0,60)||"—"),41,p1))])):We("",!0)],64))),128)),s.value.created_at?(Y(),Q("div",m1,[q[36]||(q[36]=D("span",{class:"field-label"},"创建时间",-1)),D("span",g1,Me(Fe(s.value.created_at)),1)])):We("",!0)])):We("",!0),s.value?(Y(),Q("div",_1,[i.value.kind==="task"&&s.value.status!=="cancelled"?(Y(),Q("button",{key:0,class:"btn-action",onClick:C},Me(s.value.status==="todo"?"标记完成":"重开任务"),1)):We("",!0),i.value.kind==="memory"&&s.value.status!=="archived"?(Y(),Q("button",{key:1,class:"btn-action",onClick:b},Me(s.value.status==="candidate"?"确认":"归档"),1)):We("",!0)])):We("",!0),D("div",v1,[D("div",x1,"关联 ("+Me(P.value.length)+")",1),P.value.length===0?(Y(),Q("div",y1,"暂无关联")):We("",!0),(Y(!0),Q(et,null,sn(P.value,F=>(Y(),Q("div",{key:F.id,class:"assoc-wrapper"},[D("div",{class:An(["assoc-row",{pending:F.status==="pending",expanded:Je(n).selectedAssocId===F.id}])},[D("span",{class:"rel-badge",style:ar({color:z(F.relation_type)})},"["+Me($(F.relation_type))+"]",5),D("span",{class:"assoc-target",onClick:mn(K=>V(F),["stop"])},Me(N(F).title.slice(0,30)),9,b1),D("span",M1,Me(Math.round(F.confidence*100))+"%",1),D("span",{class:An(["status-badge",F.status])},Me(F.status==="accepted"?"已确认":"待定"),3),F.status==="pending"?(Y(),Q("span",S1,[D("button",{class:"btn-accept",onClick:K=>Ee(F.id)},"✓",8,w1),D("button",{class:"btn-reject",onClick:K=>Ie(F.id)},"✗",8,E1)])):We("",!0),D("span",T1,[D("button",{class:"btn-edit-assoc",onClick:mn(K=>w("edit-assoc",F),["stop"])},"✎",8,A1),D("button",{class:"btn-del-assoc",onClick:mn(K=>w("delete-assoc",F.id),["stop"])},"✕",8,C1)]),D("button",{class:"btn-expand",onClick:mn(K=>Je(n).selectedAssocId===F.id?Je(n).selectAssociation(null):Je(n).selectAssociation(F.id),["stop"])},Me(Je(n).selectedAssocId===F.id?"▾":"▸"),9,R1)],2),Je(n).selectedAssocId===F.id?(Y(),Q("div",I1,[D("div",P1,"证据 ("+Me(F.evidence?.length||0)+" 条)",1),!F.evidence||F.evidence.length===0?(Y(),Q("div",L1,"暂无证据详情")):We("",!0),(Y(!0),Q(et,null,sn(F.evidence,(K,ue)=>(Y(),Q("div",{key:ue,class:"evidence-item"},[D("div",D1,'"'+Me(K.excerpt.slice(0,120))+Me(K.excerpt.length>120?"…":"")+'"',1),D("div",U1,[D("span",N1,Me(K.type),1),D("span",F1,"权重: "+Me(Math.round(K.weight*100))+"%",1)])]))),128))])):We("",!0)]))),128))])])):We("",!0)}}),k1=Xn(O1,[["__scopeId","data-v-84c97b2e"]]),B1={class:"atlas-search"},z1={key:0,class:"results"},V1={key:0,class:"no-results"},G1=["onClick"],H1={class:"result-kind"},W1={class:"result-info"},X1={class:"result-title"},$1={class:"result-path"},q1={key:1,class:"recent"},Y1=["onClick"],tu="atlas_recent_searches",Z1=5,J1=$n({__name:"AtlasSearch",emits:["select","close"],setup(r,{emit:e}){function t(){try{return JSON.parse(localStorage.getItem(tu)||"[]")}catch{return[]}}function n(v){localStorage.setItem(tu,JSON.stringify(v))}const i=Xe(t());function s(v){const _=v.trim();if(!_)return;const y=t().filter(S=>S!==_);y.unshift(_);const E=y.slice(0,Z1);n(E),i.value=E}function a(){localStorage.removeItem(tu),i.value=[]}function o(v){c.value=v,s(v),h.value?.focus()}const l=vr(),c=Xe(""),u=Xe(0),h=Xe(null),d=dn(()=>{const v=c.value.trim().toLowerCase();if(!v||!l.data)return[];const _=[];for(const y of l.data.entities)y.title.toLowerCase().includes(v)&&_.push({id:y.id,kind:y.kind,title:y.title,path:f(y.lifeline_id),layer:3});for(const y of l.data.lifelines)if(y.name.toLowerCase().includes(v)){const E=y.parent_id==="ROOT"?1:2,S=l.data.lifelines.find(b=>b.id===y.parent_id),C=S?S.name:"根级 lifeline";_.push({id:y.id,kind:"lifeline",title:y.name,path:C,layer:E})}return _.sort((y,E)=>{const S=y.title.toLowerCase()===v?0:y.title.toLowerCase().startsWith(v)?1:2,C=E.title.toLowerCase()===v?0:E.title.toLowerCase().startsWith(v)?1:2;return S-C||y.title.length-E.title.length}),_.slice(0,8)});function f(v){if(!l.data)return"";const _=[];let y=l.data.lifelines.find(E=>E.id===v);for(;y;){_.unshift(y.name);const E=y?.parent_id;y=E?l.data.lifelines.find(S=>S.id===E):void 0}return _.length>=2?`${_[_.length-1]} · ${_[0]}`:_.join(" · ")}function m(v){return v==="lifeline"?"L":v[0].toUpperCase()}function x(v){s(c.value),p("select",v),p("close")}function g(v){v.key==="ArrowDown"?(v.preventDefault(),u.value=Math.min(u.value+1,d.value.length-1)):v.key==="ArrowUp"?(v.preventDefault(),u.value=Math.max(u.value-1,0)):v.key==="Enter"?(v.preventDefault(),d.value[u.value]&&x(d.value[u.value])):v.key==="Escape"&&(v.preventDefault(),p("close"))}const p=e;return ns(()=>{h.value?.focus()}),(v,_)=>(Y(),Q("div",B1,[Lt(D("input",{ref_key:"inputEl",ref:h,"onUpdate:modelValue":_[0]||(_[0]=y=>c.value=y),class:"search-input",placeholder:"搜索 entity 或 lifeline…",onKeydown:g},null,544),[[Xt,c.value]]),c.value.trim()?(Y(),Q("div",z1,[d.value.length===0?(Y(),Q("div",V1,"无匹配结果")):We("",!0),(Y(!0),Q(et,null,sn(d.value,(y,E)=>(Y(),Q("div",{key:y.id,class:An(["result-row",{selected:E===u.value}]),onClick:S=>x(y)},[D("span",H1,Me(m(y.kind)),1),D("div",W1,[D("div",X1,Me(y.title),1),D("div",$1,Me(y.path),1)])],10,G1))),128))])):i.value.length>0?(Y(),Q("div",q1,[_[1]||(_[1]=D("div",{class:"recent-title"},"最近搜索",-1)),(Y(!0),Q(et,null,sn(i.value,(y,E)=>(Y(),Q("div",{key:E,class:"recent-row",onClick:S=>o(y)},Me(y),9,Y1))),128)),D("button",{class:"recent-clear",onClick:a},"清除历史")])):We("",!0)]))}}),K1=Xn(J1,[["__scopeId","data-v-14f6145c"]]),j1={key:0,class:"submenu"},Q1=["disabled","onClick"],eE=["disabled","onClick"],tE={key:0,class:"subitem empty"},nE={key:0,class:"submenu"},iE=["onClick"],sE=$n({__name:"ContextMenu",props:{target:{},x:{},y:{}},emits:["close","edit-title","delete-entity","move-lifeline","create-entity","edit-lifeline-name","associate-to","find-path-to","copy-title","delete-lifeline"],setup(r,{emit:e}){const t=r,n=e,i=vr(),s=Xe(null),a=Xe(null),o=dn(()=>{let w=t.x,P=t.y;return w+200>window.innerWidth&&(w=window.innerWidth-200-4),P+300>window.innerHeight&&(P=window.innerHeight-300-4),{left:`${w}px`,top:`${P}px`}}),l=dn(()=>t.target.layer===3),c=dn(()=>i.data?i.data.lifelines.filter(b=>b.parent_id==="ROOT").map(b=>({...b,children:i.data.lifelines.filter(w=>w.parent_id===b.id)})):[]),u=dn(()=>!i.data||!t.target.id?null:i.data.entities.find(b=>b.id===t.target.id)?.lifeline_id??null),h=["task","memory","decision","item"],d={task:"任务",memory:"记忆",decision:"决策",item:"条目"};function f(){n("edit-title",t.target),n("close")}function m(){n("delete-entity",t.target),n("close")}function x(C){n("move-lifeline",t.target.id,C),n("close")}function g(C){n("create-entity",C,t.target.id),n("close")}function p(){n("associate-to",t.target),n("close")}function v(){n("find-path-to",t.target),n("close")}function _(){n("copy-title",t.target),n("close")}function y(){n("edit-lifeline-name",t.target),n("close")}function E(C){s.value&&!s.value.contains(C.target)&&n("close")}function S(C){C.key==="Escape"&&n("close")}return ns(()=>{document.addEventListener("pointerdown",E,!0),document.addEventListener("keydown",S)}),Us(()=>{document.removeEventListener("pointerdown",E,!0),document.removeEventListener("keydown",S)}),(C,b)=>(Y(),Q("div",{ref_key:"menuRef",ref:s,class:"ctx-menu",style:ar(o.value)},[l.value?(Y(),Q(et,{key:0},[D("button",{class:"ctx-item",onClick:f},"编辑标题…"),D("div",{class:"ctx-item has-sub",onPointerenter:b[0]||(b[0]=w=>a.value="lifeline"),onPointerleave:b[1]||(b[1]=w=>a.value=null)},[b[5]||(b[5]=Cn(" 移动到 lifeline ▸ ",-1)),a.value==="lifeline"?(Y(),Q("div",j1,[(Y(!0),Q(et,null,sn(c.value,w=>(Y(),Q(et,{key:w.id},[D("button",{class:An(["subitem r1-item",{current:w.id===u.value}]),disabled:w.id===u.value,onClick:P=>x(w.id)},Me(w.name),11,Q1),(Y(!0),Q(et,null,sn(w.children,P=>(Y(),Q("button",{key:P.id,class:An(["subitem r2-item",{current:P.id===u.value}]),disabled:P.id===u.value,onClick:L=>x(P.id)},Me(P.name),11,eE))),128))],64))),128)),c.value.length===0?(Y(),Q("div",tE,"暂无 lifeline")):We("",!0)])):We("",!0)],32),D("button",{class:"ctx-item",onClick:p},"关联到…"),D("button",{class:"ctx-item",onClick:v},"查找路径到…"),D("button",{class:"ctx-item",onClick:_},"复制标题"),b[6]||(b[6]=D("div",{class:"ctx-separator"},null,-1)),D("button",{class:"ctx-item danger",onClick:m},"删除")],64)):(Y(),Q(et,{key:1},[D("div",{class:"ctx-item has-sub",onPointerenter:b[2]||(b[2]=w=>a.value="entity"),onPointerleave:b[3]||(b[3]=w=>a.value=null)},[b[7]||(b[7]=Cn(" 新建 entity ▸ ",-1)),a.value==="entity"?(Y(),Q("div",nE,[(Y(),Q(et,null,sn(h,w=>D("button",{key:w,class:"subitem",onClick:P=>g(w)},Me(d[w]),9,iE)),64))])):We("",!0)],32),D("button",{class:"ctx-item",onClick:y},"编辑名称…"),b[8]||(b[8]=D("div",{class:"ctx-separator"},null,-1)),D("button",{class:"ctx-item danger",onClick:b[4]||(b[4]=w=>{n("delete-lifeline",t.target.id,t.target.title),n("close")})},"删除 lifeline")],64))],4))}}),rE=Xn(sE,[["__scopeId","data-v-3f33d6d0"]]),aE={class:"confirm-title"},oE={key:0,class:"confirm-message"},lE={class:"confirm-actions"},cE=$n({__name:"ConfirmDialog",props:{title:{},message:{default:""},confirmLabel:{default:"确认"},cancelLabel:{default:"取消"},danger:{type:Boolean,default:!1}},emits:["confirm","cancel"],setup(r,{emit:e}){const t=e;function n(i){i.key==="Escape"&&t("cancel"),i.key==="Enter"&&t("confirm")}return ns(()=>{document.addEventListener("keydown",n)}),Us(()=>{document.removeEventListener("keydown",n)}),(i,s)=>(Y(),Q("div",{class:"confirm-overlay",onPointerdown:s[3]||(s[3]=a=>t("cancel"))},[D("div",{class:"confirm-dialog",onPointerdown:s[2]||(s[2]=mn(()=>{},["stop"]))},[D("div",aE,Me(r.title),1),r.message?(Y(),Q("div",oE,Me(r.message),1)):We("",!0),D("div",lE,[D("button",{class:"confirm-btn cancel-btn",onClick:s[0]||(s[0]=a=>t("cancel"))},Me(r.cancelLabel),1),D("button",{class:An(["confirm-btn",r.danger?"danger-btn":"primary-btn"]),onClick:s[1]||(s[1]=a=>t("confirm"))},Me(r.confirmLabel),3)])],32)],32))}}),uE=Xn(cE,[["__scopeId","data-v-128fcad2"]]),dE={class:"dialog"},hE={class:"dialog-title"},fE={class:"field-row"},pE={class:"entity-ref"},mE={class:"field-row"},gE={class:"entity-ref"},_E={key:0,class:"status-row"},vE={class:"field-row"},xE=["value"],yE={class:"field-row"},bE={class:"label"},ME={class:"conf-value"},SE={class:"evidence-section"},wE=["onUpdate:modelValue"],EE=["onUpdate:modelValue"],TE=["onClick"],AE={class:"dialog-actions"},CE={key:1,class:"delete-area"},RE={key:2,class:"delete-confirm"},IE=$n({__name:"AssociationEditDialog",props:{fromId:{},fromTitle:{},toId:{},toTitle:{},existing:{}},emits:["cancel","create","update","delete"],setup(r,{emit:e}){const t=r,n=e,i=Xe(t.existing?.relation_type||"manual"),s=Xe(t.existing?.confidence??.7),a=df(t.existing?.evidence?.length?t.existing.evidence.map(x=>({...x})):[{type:"manual",excerpt:"",weight:.8}]),o=!t.existing,l=Xe(!1),c=[{value:"co_occurrence",label:"共现"},{value:"causal",label:"因果"},{value:"tension",label:"张力"},{value:"derived_from",label:"衍生"},{value:"manual",label:"人工标注"}];function u(){a.length<5&&a.push({type:"manual",excerpt:"",weight:.5})}function h(x){a.length>1&&a.splice(x,1)}function d(){o?n("create",{from:t.fromId,to:t.toId,relation_type:i.value,confidence:s.value,evidence:a.filter(x=>x.excerpt.trim())}):n("update",{association_id:t.existing.id,relation_type:i.value,confidence:s.value,evidence:a.filter(x=>x.excerpt.trim())})}function f(){n("delete",t.existing.id)}function m(x){x.key==="Escape"&&n("cancel")}return ns(()=>{document.addEventListener("keydown",m)}),Us(()=>{document.removeEventListener("keydown",m)}),(x,g)=>(Y(),Q("div",{class:"dialog-overlay",onClick:g[5]||(g[5]=mn(p=>n("cancel"),["self"]))},[D("div",dE,[D("div",hE,Me(o?"新建关联":"编辑关联"),1),D("div",fE,[g[6]||(g[6]=D("span",{class:"label"},"从",-1)),D("span",pE,Me(r.fromTitle.slice(0,30)),1)]),D("div",mE,[g[7]||(g[7]=D("span",{class:"label"},"到",-1)),D("span",gE,Me(r.toTitle.slice(0,30)),1)]),o?We("",!0):(Y(),Q("div",_E,[g[8]||(g[8]=D("span",{class:"label"},"状态",-1)),D("span",{class:An(["status-badge",t.existing.status])},Me(t.existing.status==="accepted"?"已确认":t.existing.status==="rejected"?"已拒绝":"待定"),3)])),D("div",vE,[g[9]||(g[9]=D("label",{class:"label",for:"rel-type"},"关系类型",-1)),Lt(D("select",{id:"rel-type","onUpdate:modelValue":g[0]||(g[0]=p=>i.value=p),class:"field"},[(Y(),Q(et,null,sn(c,p=>D("option",{key:p.value,value:p.value},Me(p.label),9,xE)),64))],512),[[ws,i.value]])]),D("div",yE,[D("label",bE,[g[10]||(g[10]=Cn(" 信心度 ",-1)),D("span",ME,Me(s.value.toFixed(2)),1)]),Lt(D("input",{"onUpdate:modelValue":g[1]||(g[1]=p=>s.value=p),type:"range",min:"0.3",max:"1.0",step:"0.01",class:"slider"},null,512),[[Xt,s.value,void 0,{number:!0}]])]),D("div",SE,[g[12]||(g[12]=D("span",{class:"label"},"证据",-1)),(Y(!0),Q(et,null,sn(a,(p,v)=>(Y(),Q("div",{key:v,class:"evidence-edit-row"},[Lt(D("select",{"onUpdate:modelValue":_=>p.type=_,class:"field evidence-type-sel"},[...g[11]||(g[11]=[ta('<option value="manual" data-v-0ae04a56>人工标注</option><option value="semantic" data-v-0ae04a56>语义相似</option><option value="co_occurrence" data-v-0ae04a56>共现统计</option><option value="temporal" data-v-0ae04a56>时间序列</option><option value="causal_hint" data-v-0ae04a56>因果模式</option>',5)])],8,wE),[[ws,p.type]]),Lt(D("input",{"onUpdate:modelValue":_=>p.excerpt=_,class:"field evidence-excerpt",placeholder:"证据摘要（10-120 字）"},null,8,EE),[[Xt,p.excerpt]]),a.length>1?(Y(),Q("button",{key:0,class:"btn-icon",onClick:_=>h(v)},"×",8,TE)):We("",!0)]))),128)),a.length<5?(Y(),Q("button",{key:0,class:"btn-text",onClick:u},"+ 添加证据")):We("",!0)]),D("div",AE,[D("button",{class:"btn-cancel",onClick:g[2]||(g[2]=p=>n("cancel"))},"取消"),D("button",{class:"btn-submit",onClick:d},Me(o?"创建关联":"保存修改"),1)]),!o&&!l.value?(Y(),Q("div",CE,[D("button",{class:"btn-delete",onClick:g[3]||(g[3]=p=>l.value=!0)},"删除关联")])):We("",!0),l.value?(Y(),Q("div",RE,[g[13]||(g[13]=Cn(" 确定删除此关联？ ",-1)),D("button",{class:"btn-delete",onClick:f},"确认删除"),D("button",{class:"btn-text",onClick:g[4]||(g[4]=p=>l.value=!1)},"取消")])):We("",!0)])]))}}),PE=Xn(IE,[["__scopeId","data-v-0ae04a56"]]),LE=$n({__name:"LegendBar",props:{showAssoc:{type:Boolean}},setup(r){const e=r,t=Xe(!1),n=Xe(!1);let i;function s(){t.value=!1,i&&clearTimeout(i),i=window.setTimeout(()=>{n.value||(t.value=!0)},5e3)}return ns(()=>s()),Us(()=>{i&&clearTimeout(i)}),Co(()=>e.showAssoc,()=>s()),(a,o)=>(Y(),Q("div",{class:An(["legend-bar",{faded:t.value&&!n.value}]),onMouseenter:o[0]||(o[0]=l=>{n.value=!0,t.value=!1}),onMouseleave:o[1]||(o[1]=l=>{n.value=!1,s()})},[o[3]||(o[3]=ta('<div class="legend-section" data-v-53c6bdbb><span class="legend-title" data-v-53c6bdbb>节点</span><span class="legend-item" data-v-53c6bdbb><span class="dot task" data-v-53c6bdbb>■</span> 任务</span><span class="legend-item" data-v-53c6bdbb><span class="dot memory" data-v-53c6bdbb>●</span> 记忆</span><span class="legend-item" data-v-53c6bdbb><span class="dot decision" data-v-53c6bdbb>◆</span> 决策</span><span class="legend-item" data-v-53c6bdbb><span class="dot item" data-v-53c6bdbb>▲</span> 条目</span></div>',1)),r.showAssoc?(Y(),Q(et,{key:0},[o[2]||(o[2]=ta('<div class="legend-sep" data-v-53c6bdbb>|</div><div class="legend-section" data-v-53c6bdbb><span class="legend-title" data-v-53c6bdbb>关联</span><span class="legend-item" data-v-53c6bdbb><span class="line-sample causal" data-v-53c6bdbb></span> 因果</span><span class="legend-item" data-v-53c6bdbb><span class="line-sample co" data-v-53c6bdbb></span> 共现</span><span class="legend-item" data-v-53c6bdbb><span class="line-sample tension" data-v-53c6bdbb></span> 张力</span><span class="legend-item" data-v-53c6bdbb><span class="line-sample derived" data-v-53c6bdbb></span> 衍生</span></div>',2))],64)):We("",!0)],34))}}),DE=Xn(LE,[["__scopeId","data-v-53c6bdbb"]]),Nn=180,UE=$n({__name:"Minimap",props:{layoutNodes:{},camera:{},controls:{},worldRadius:{},focusedLifelineId:{}},emits:["jump"],setup(r,{emit:e}){const t=r,n=e,i=Xe(null);let s=0;function a(c){const u=Nn/(t.worldRadius*2.4),h=Nn/2,d=Nn/2;return{x:h+c.x*u,y:d-c.z*u}}function o(){const c=i.value;if(!c)return;const u=c.getContext("2d");if(!u)return;const h=window.devicePixelRatio||1;c.width=Nn*h,c.height=Nn*h,u.scale(h,h),u.fillStyle="rgba(7, 9, 13, 0.85)",u.beginPath(),u.roundRect(0,0,Nn,Nn,8),u.fill(),u.strokeStyle="rgba(255,255,255,0.06)",u.lineWidth=1,u.beginPath(),u.arc(Nn/2,Nn/2,Nn/2.6,0,Math.PI*2),u.stroke();const d=t.layoutNodes.filter(m=>m.layer===1),f=t.layoutNodes.filter(m=>m.layer===2);for(const m of f){const x=a(m.position);u.fillStyle="rgba(255,255,255,0.2)",u.beginPath(),u.arc(x.x,x.y,2,0,Math.PI*2),u.fill()}for(const m of d){const x=a(m.position);m.id===t.focusedLifelineId&&(u.strokeStyle="#6ee7d0",u.lineWidth=2,u.beginPath(),u.arc(x.x,x.y,5,0,Math.PI*2),u.stroke()),u.fillStyle="#6ee7d0",u.beginPath(),u.arc(x.x,x.y,3,0,Math.PI*2),u.fill()}if(t.camera&&t.controls){const m=t.camera.position,x=a(m),g=t.controls.target||new R(0,0,0),p=a(g);u.strokeStyle="#6ee7d0",u.lineWidth=1;const v=22+(m.length()-2)*5,_=16+(m.length()-2)*3.5;u.strokeRect(x.x-v/2,x.y-_/2,v,_),u.beginPath(),u.moveTo(x.x,x.y),u.lineTo(p.x,p.y),u.strokeStyle="rgba(110,231,208,0.3)",u.stroke()}s=requestAnimationFrame(o)}function l(c){if(!i.value?.getBoundingClientRect())return;const h=c.offsetX,d=c.offsetY,f=Nn/(t.worldRadius*2.4),m=Nn/2,x=Nn/2,g=(h-m)/f,p=-(d-x)/f,_=new R(g,.3,p).normalize().clone().multiplyScalar(4.5),y=new R(0,0,0);n("jump",_,y)}return ns(()=>{s=requestAnimationFrame(o)}),Us(()=>{cancelAnimationFrame(s)}),(c,u)=>(Y(),Q("canvas",{ref_key:"canvasRef",ref:i,class:"minimap",width:180,height:180,onClick:l},null,512))}}),NE=Xn(UE,[["__scopeId","data-v-210e4d3a"]]),FE={key:0,class:"path-panel"},OE={class:"path-title"},kE={key:0},BE={class:"path-steps"},zE=["onClick"],VE={class:"path-kind"},GE={class:"path-e-title"},HE={key:0,class:"path-assoc"},WE={class:"path-a-type"},XE={class:"path-a-conf"},$E={class:"path-actions"},qE=["disabled"],YE=["disabled"],ZE={key:1,class:"path-panel"},JE=$n({__name:"PathPanel",props:{paths:{},currentPathIndex:{},fromTitle:{},toTitle:{}},emits:["prev-path","next-path","clear","focus-entity","copied"],setup(r,{emit:e}){const t=r,n=e;async function i(){let c=`**路径（${a.value} 跳）**：
`;s.value.forEach((u,h)=>{c+=`${h+1}. ${u.entityTitle} (\`${u.entityId}\`)
`,u.assocId&&(c+=`   [${o(u.assocType||"")} ${u.assocConfidence?Math.round(u.assocConfidence*100)+"%":""}] →
`)}),await navigator.clipboard.writeText(c),n("copied")}const s=dn(()=>t.paths[t.currentPathIndex]||[]),a=dn(()=>s.value.length-1);function o(c){return{co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[c]||c}function l(c){const u=c.split(":")[0];return u==="task"?"T":u==="memory"?"M":u==="decision"?"D":u==="item"?"I":"?"}return(c,u)=>r.paths.length>0?(Y(),Q("div",FE,[D("div",OE,[Cn("路径（"+Me(a.value)+" 跳）",1),r.paths.length>1?(Y(),Q("span",kE," 共 "+Me(r.paths.length)+" 条 · "+Me(r.currentPathIndex+1)+"/"+Me(r.paths.length),1)):We("",!0)]),D("div",BE,[(Y(!0),Q(et,null,sn(s.value,(h,d)=>(Y(),Q(et,{key:d},[D("div",{class:"path-entity",onClick:f=>n("focus-entity",h.entityId)},[D("span",VE,Me(l(h.entityId)),1),D("span",GE,Me(h.entityTitle.slice(0,30)),1)],8,zE),h.assocId?(Y(),Q("div",HE,[u[4]||(u[4]=D("span",{class:"path-line"},"┊",-1)),D("span",WE,"["+Me(o(h.assocType||""))+"]",1),D("span",XE,Me(h.assocConfidence?Math.round(h.assocConfidence*100)+"%":""),1)])):We("",!0)],64))),128))]),D("div",$E,[r.paths.length>1?(Y(),Q("button",{key:0,class:"path-btn",disabled:r.currentPathIndex===0,onClick:u[0]||(u[0]=h=>n("prev-path"))},"上一条",8,qE)):We("",!0),r.paths.length>1?(Y(),Q("button",{key:1,class:"path-btn",disabled:r.currentPathIndex>=r.paths.length-1,onClick:u[1]||(u[1]=h=>n("next-path"))},"下一条",8,YE)):We("",!0),D("button",{class:"path-btn",onClick:i},"复制路径"),D("button",{class:"path-btn clear",onClick:u[2]||(u[2]=h=>n("clear"))},"清除")])])):(Y(),Q("div",ZE,[u[5]||(u[5]=D("div",{class:"path-title"},"未找到路径",-1)),u[6]||(u[6]=D("div",{class:"path-none"},"深度 5 内无连接",-1)),D("button",{class:"path-btn clear",onClick:u[3]||(u[3]=h=>n("clear"))},"关闭")]))}}),KE=Xn(JE,[["__scopeId","data-v-cb34b2fb"]]),jE={class:"sp-panel"},QE={class:"sp-header"},eT=$n({__name:"ShortcutPanel",emits:["close"],setup(r,{emit:e}){const t=e;function n(i){(i.key==="?"||i.key==="Escape")&&t("close")}return ns(()=>{document.addEventListener("keydown",n)}),Us(()=>{document.removeEventListener("keydown",n)}),(i,s)=>(Y(),Q("div",{class:"sp-overlay",onClick:s[1]||(s[1]=mn(a=>t("close"),["self"]))},[D("div",jE,[D("div",QE,[s[2]||(s[2]=D("span",{class:"sp-title"},"快捷键参考",-1)),D("button",{class:"sp-close",onClick:s[0]||(s[0]=a=>t("close"))},"✕")]),s[3]||(s[3]=ta('<div class="sp-grid" data-v-4c3ba46f><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>全局</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Ctrl+K</kbd> <kbd data-v-4c3ba46f>/</kbd> <span data-v-4c3ba46f>搜索 entity/lifeline</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>?</kbd> <span data-v-4c3ba46f>显示/隐藏此面板</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>滚轮</kbd> <span data-v-4c3ba46f>缩放</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>拖拽</kbd> <span data-v-4c3ba46f>旋转</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>global_overview</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>左键点击 R1</kbd> <span data-v-4c3ba46f>进入 lifeline 区域</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>region_zoom</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>返回全局视图</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>左键点击 R2/R3</kbd> <span data-v-4c3ba46f>聚焦 entity</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>右键 R1/R2</kbd> <span data-v-4c3ba46f>新建 entity / 编辑名称</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>node_focus</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>返回 lifeline 区域</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>R</kbd> <span data-v-4c3ba46f>查看关联（relation_reveal）</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>右键 entity</kbd> <span data-v-4c3ba46f>编辑/移动/删除/关联/路径查找</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>双击标题</kbd> <span data-v-4c3ba46f>内联编辑标题</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>relation_reveal</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>返回 node_focus</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>R</kbd> <span data-v-4c3ba46f>退出关联视图</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>点击关联线</kbd> <span data-v-4c3ba46f>查看证据</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>筛选条</kbd> <span data-v-4c3ba46f>按类型/信心度过滤</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>路径查找</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>右键 → 查找路径</kbd> <span data-v-4c3ba46f>进入路径选择模式</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>退出路径模式</span></div></div></div>',1))])]))}}),tT=Xn(eT,[["__scopeId","data-v-4c3ba46f"]]),nT={class:"cosmos-view"},iT={class:"cosmos-hud"},sT={key:0,class:"overlay-state"},rT={key:1,class:"overlay-state"},aT={key:2,class:"overlay-state"},oT={key:0,class:"tooltip"},lT={class:"create-actions"},cT=["disabled"],uT={class:"create-title"},dT={class:"create-sub"},hT={class:"create-actions"},fT=["disabled"],pT={key:5,class:"select-hint"},mT={key:6,class:"select-hint"},gT={key:9,class:"copy-toast"},_T={key:10,class:"minimap-wrapper"},vT={key:11,class:"assoc-filter-bar"},xT={class:"filter-chips"},yT=["onClick"],bT={class:"filter-slider"},MT={class:"filter-label"},ST={class:"filter-count"},wT={key:0,class:"filter-empty"},ET=1.5,TT=$n({__name:"CosmosView",setup(r){const e=vr(),t=Xe(null);let n=null,i=null,s=0,a=[],o="";const l=Xe(!1),c=Xe(!1),u=Xe(!1);let h;const d=Xe(null),f=Xe(null);function m(I,O,W,j){return new Promise(ve=>{f.value={title:I,message:O,confirmLabel:W,danger:j,resolve:ve}})}const x=Xe(null),g=Xe(""),p=Xe(null),v=Xe(null),_=Xe(!0),y=Xe(!1);let E,S=null,C=null;const b=df({types:["co_occurrence","causal","tension","derived_from","manual"],minConfidence:0,status:"all"});function w(){for(const I of a){const O=b.types.includes(I.data.relation_type),W=I.data.confidence>=b.minConfidence,j=b.status==="all"||I.data.status===b.status,ve=O&&W&&j;I.line.visible=ve,I.arrow&&(I.arrow.visible=ve)}}function P(I){b.types.includes(I)?b.types.length>1&&(b.types=b.types.filter(O=>O!==I)):b.types=[...b.types,I],w()}const L=dn(()=>a.filter(I=>I.line.visible).length),k=Xe(null),$=Xe(null),z=Xe(0);function N(I,O){if(!e.data)return[];const W=new Map;for(const He of e.data.associations)He.status!=="rejected"&&(W.has(He.from)||W.set(He.from,[]),W.has(He.to)||W.set(He.to,[]),W.get(He.from).push({to:He.to,assocId:He.id,type:He.relation_type,confidence:He.confidence}),W.get(He.to).push({to:He.from,assocId:He.id,type:He.relation_type,confidence:He.confidence}));const j=new Set,ve=[{id:I,path:[{entityId:I,entityTitle:"",assocId:null,assocType:null,assocConfidence:null}]}];j.add(I);const Pe=[];let it=-1;const Qe=5;for(;ve.length>0;){const{id:He,path:mt}=ve.shift();if(it>-1&&mt.length>it)break;if(He===O){mt.forEach(ut=>{ut.entityTitle||(ut.entityTitle=e.data?.entities.find(gt=>gt.id===ut.entityId)?.title||ut.entityId)}),Pe.push(mt),it=mt.length;continue}if(!(mt.length>=Qe)){for(const ut of W.get(He)||[])if(!j.has(ut.to)||it>-1&&mt.length<it){j.add(ut.to);const gt=e.data?.entities.find(Ht=>Ht.id===ut.to);ve.push({id:ut.to,path:[...mt,{entityId:ut.to,entityTitle:gt?.title||ut.to,assocId:ut.assocId,assocType:ut.type,assocConfidence:ut.confidence}]})}}}return Pe}function V(I){k.value={id:I.id,title:I.title}}function G(I){if(!k.value)return;if(I===k.value.id){pe();return}const O=N(k.value.id,I);$.value=O.length>0?O:[],z.value=0,k.value=null,O.length>0&&n&&le(O[0])}function le(I){if(!n)return;uf(n.nodes,a);const O=new Set(I.map(j=>j.entityId)),W=new Set(I.filter(j=>j.assocId).map(j=>j.assocId));bS(n.nodes,a,O,W)}function pe(){k.value=null,$.value=null,z.value=0,n&&uf(n.nodes,a)}function Ee(){$.value&&(z.value=Math.max(0,z.value-1),le($.value[z.value]))}function Ie(){$.value&&(z.value=Math.min($.value.length-1,z.value+1),le($.value[z.value]))}function Fe(I){const O=I.split(":");e.transition({kind:"node_focus",entity_kind:O[0],entity_id:I})}function tt(){u.value=!0,h&&clearTimeout(h),h=window.setTimeout(()=>{u.value=!1},1500)}function ce(I){navigator.clipboard.writeText(I.title).then(()=>tt())}async function q(I,O){window.confirm(`确定删除 lifeline「${O}」？挂载的 entity 将被卸载。`)&&(await e.deleteLifeline(I),e.transition({kind:"global_overview"}))}function F(){tt()}function K(){tt()}let ue=null,ye=null,Ve=null;async function re(){if(!e.data||!t.value)return;const I=await Tt(()=>Promise.resolve().then(()=>rS),void 0),O=(await Tt(async()=>{const{OrbitControls:He}=await import("./OrbitControls-Cp0G7l1N.js");return{OrbitControls:He}},__vite__mapDeps([3,0,1,2]))).OrbitControls,{CSS2DRenderer:W}=await Tt(async()=>{const{CSS2DRenderer:He}=await import("./CSS2DRenderer-HyXOXZeX.js");return{CSS2DRenderer:He}},__vite__mapDeps([4,0,1,2]));n=await hS(t.value,e.data),i=new O(n.camera,n.renderer.domElement),i.enableDamping=!0,i.dampingFactor=.08,i.enableZoom=!0,i.zoomSpeed=.6,i.enablePan=!1,i.minDistance=.5,i.maxDistance=9,ue=new W,ue.setSize(window.innerWidth,window.innerHeight),ue.domElement.style.position="absolute",ue.domElement.style.top="0",ue.domElement.style.pointerEvents="none",document.querySelector(".cosmos-view")?.appendChild(ue.domElement);const{createLabelGroup:j}=await Tt(async()=>{const{createLabelGroup:He}=await import("./labels-Df-tmGc7.js");return{createLabelGroup:He}},__vite__mapDeps([5,4,0,1,2]));ye=j(),ye.create(n.scene,n.layoutNodes);const ve=new Map;for(const He of e.data.entities)ve.set(He.lifeline_id,(ve.get(He.lifeline_id)||0)+1);for(const He of n.layoutNodes){if(He.layer!==1&&He.layer!==2)continue;const mt=document.createElement("div"),ut=ve.get(He.id)||0;mt.textContent=String(ut),mt.style.cssText="font-size:9px;color:var(--text-4);font-family:var(--font-mono);text-align:center;";const{CSS2DObject:gt}=await Tt(async()=>{const{CSS2DObject:Pn}=await import("./CSS2DRenderer-HyXOXZeX.js");return{CSS2DObject:Pn}},__vite__mapDeps([4,0,1,2])),Ht=new gt(mt);Ht.position.copy(He.position.clone().add(new R(0,-.07,0))),n.scene.add(Ht)}Ve=n.setResolution,window.addEventListener("resize",ie);const Pe=new I.Raycaster,it=new I.Vector2;t.value.addEventListener("click",He=>{if(!n)return;if(it.x=He.offsetX/t.value.clientWidth*2-1,it.y=-(He.offsetY/t.value.clientHeight)*2+1,Pe.setFromCamera(it,n.camera),k.value){const an=Pe.intersectObjects(n.pickables);if(an.length>0){const Wt=an[0].object;if(Wt.userData.layer===3){G(Wt.userData.id);return}}pe();return}if(e.selectingTarget){const an=Pe.intersectObjects(n.pickables);if(an.length>0){const Wt=an[0].object;if(Wt.userData.layer===3&&Wt.userData.id!==e.selectingTarget.fromId){const Yn=e.data?.entities.find(oi=>oi.id===Wt.userData.id)?.title||"";e.openEditAssoc({id:"",from:e.selectingTarget.fromId,fromTitle:e.selectingTarget.fromTitle,to:Wt.userData.id,toTitle:Yn,relation_type:"manual",confidence:.7,status:"accepted",evidence:[]}),e.cancelSelecting();return}}e.cancelSelecting();return}if(e.state.kind==="relation_reveal"&&a.length>0){const an=Pe.intersectObjects(a.map(Wt=>Wt.line));if(an.length>0){const Wt=an[0].object,Yn=a.find(oi=>oi.line===Wt);if(Yn){e.selectedAssocId===Yn.data.id?e.selectAssociation(null):e.selectAssociation(Yn.data.id);return}}}const mt=Pe.intersectObjects(n.pickables);if(mt.length===0){if(e.selectAssociation(null),e.state.kind==="node_focus"||e.state.kind==="relation_reveal"){const an=e.state.entity_id,Yn=e.data?.entities.find(oi=>oi.id===an)?.lifeline_id;Yn?e.transition({kind:"region_zoom",lifeline_id:Yn}):e.transition({kind:"global_overview"})}else e.state.kind==="region_zoom"&&e.transition({kind:"global_overview"});return}e.selectAssociation(null);const ut=mt[0].object,gt=ut.userData.layer,Ht=ut.userData.id,Pn=ut.userData.kind,rn=e.state;rn.kind==="global_overview"&&gt===1?e.transition({kind:"region_zoom",lifeline_id:Ht}):rn.kind==="region_zoom"&&(gt===2||gt===3)?e.transition({kind:"node_focus",entity_kind:Pn||"lifeline",entity_id:Ht}):rn.kind==="node_focus"?e.transition({kind:"node_focus",entity_kind:Pn||"lifeline",entity_id:Ht}):rn.kind==="relation_reveal"&&(vt(),e.transition({kind:"node_focus",entity_kind:Pn||"lifeline",entity_id:Ht}))}),t.value.addEventListener("mousemove",He=>{if(!n)return;it.x=He.offsetX/t.value.clientWidth*2-1,it.y=-(He.offsetY/t.value.clientHeight)*2+1,Pe.setFromCamera(it,n.camera);const mt=Pe.intersectObjects(n.pickables);if(mt.length>0){const gt=mt[0].object;gt!==S&&(ae(),S=gt,te(gt)),t.value.style.cursor=e.selectingTarget?"crosshair":"pointer"}else ae(),t.value.style.cursor=e.selectingTarget?"crosshair":"";if(e.state.kind!=="relation_reveal")return;const ut=Pe.intersectObjects(n.lines.concat(a.map(gt=>gt.line)));if(ut.length>0&&a.some(gt=>gt.line===ut[0].object)){const gt=a.find(Ht=>Ht.line===ut[0].object);gt&&(o=gt.data.evidence?.[0]?.excerpt||"",gt.line!==C&&(ge(),C=gt.line,me(gt)))}else o="",ge()}),t.value.addEventListener("contextmenu",He=>{if(He.preventDefault(),!n||!e.data||e.state.kind==="global_overview")return;it.x=He.offsetX/t.value.clientWidth*2-1,it.y=-(He.offsetY/t.value.clientHeight)*2+1,Pe.setFromCamera(it,n.camera);const mt=Pe.intersectObjects(n.pickables);if(mt.length===0){d.value=null;return}const ut=mt[0].object,gt=ut.userData.id,Ht=ut.userData.kind,Pn=ut.userData.layer;if(Pn<1||Pn>3){d.value=null;return}let rn="";Pn<=2?rn=e.data.lifelines.find(Wt=>Wt.id===gt)?.name||gt:rn=e.data.entities.find(Wt=>Wt.id===gt)?.title||gt,d.value={x:He.clientX,y:He.clientY,target:{id:gt,kind:Ht,title:rn,layer:Pn}}}),window.addEventListener("keydown",at),document.querySelector(".cosmos-hud")?.addEventListener("mouseenter",()=>{_.value=!0,E&&clearTimeout(E)}),E=window.setTimeout(()=>{_.value=!1,y.value=!0},3e3),B()}function he(I){e.transition({kind:"region_zoom",lifeline_id:I})}function ne(I){if(!e.data)return;const O=e.data.entities.find(W=>W.id===I);O&&e.transition({kind:"node_focus",entity_kind:O.kind,entity_id:I})}function ie(){if(!ue||!Ve)return;const I=window.innerWidth,O=window.innerHeight;ue.setSize(I,O),Ve(I,O)}function te(I){I.scale.setScalar(ET);const O=I.material;O._origColor=O._origColor??O.color.getHex(),O.color.set(jn("--accent")),O.needsUpdate=!0}function ae(){if(!S)return;S.scale.setScalar(1);const I=S.material;I._origColor!==void 0&&(I.color.setHex(I._origColor),delete I._origColor,I.needsUpdate=!0),S=null}function me(I){const O=I.line.material;O._origLinewidth=O._origLinewidth??O.linewidth,O._origColor=O._origColor??O.color.getHex(),O.linewidth=O._origLinewidth*1.3,O.color.set(jn("--accent")),O.needsUpdate=!0,a.forEach(W=>{if(W.line!==I.line){const j=W.line.material;j.transparent=!0,j._origOpacity=j._origOpacity??j.opacity,j.opacity=(j._origOpacity||.8)*.3,j.needsUpdate=!0}})}function ge(){if(!C)return;const I=C.material;I._origLinewidth!==void 0&&(I.linewidth=I._origLinewidth,delete I._origLinewidth),I._origColor!==void 0&&(I.color.setHex(I._origColor),delete I._origColor),I.needsUpdate=!0,a.forEach(O=>{const W=O.line.material;W._origOpacity!==void 0&&(W.opacity=W._origOpacity,delete W._origOpacity,W.needsUpdate=!0)}),C=null}function je(I){if(l.value=!1,!!n)if(I.kind==="lifeline")if(I.layer===1)e.transition({kind:"region_zoom",lifeline_id:I.id});else{let O=e.data?.lifelines.find(W=>W.id===I.id)?.parent_id;for(;O&&O!=="ROOT";){const W=e.data?.lifelines.find(j=>j.id===O);if(W&&W.parent_id==="ROOT")break;O=W?.parent_id}O&&O!=="ROOT"&&e.transition({kind:"region_zoom",lifeline_id:O})}else e.transition({kind:"node_focus",entity_kind:I.kind,entity_id:I.id})}function U(I){I.layer===3&&v.value?.startEditTitle()}async function nt(I){if(!await m(`确定删除「${I.title.slice(0,30)}」？`,"此操作不可撤销。","删除",!0))return;const W=I.id.split(":"),j=W[0],ve=parseInt(W.slice(1).join(":"),10);try{await e.deleteEntityById(j,ve)}catch{await e.reload()}const Pe=e.state;if((Pe.kind==="node_focus"||Pe.kind==="relation_reveal")&&Pe.entity_id===I.id){const Qe=e.data?.entities.find(He=>He.id===I.id)?.lifeline_id;Qe?e.transition({kind:"region_zoom",lifeline_id:Qe}):e.transition({kind:"global_overview"})}}async function Be(I,O){const W=I.split(":"),j=W[0],ve=parseInt(W.slice(1).join(":"),10);try{await e.mountEntity(j,ve,O)}catch{await e.reload()}}function Ke(I,O){const W=e.data?.lifelines.find(j=>j.id===O);x.value={kind:I,lifelineId:O,lifelineName:W?.name||O},g.value="",setTimeout(()=>p.value?.focus(),50)}async function xe(){if(!x.value)return;const I=g.value.trim();if(!I)return;const{kind:O,lifelineId:W}=x.value;try{await e.createEntityUnderLifeline(O,I,W)}catch{await e.reload()}x.value=null}function xt(){x.value=null}function A(I){I.key==="Enter"?xe():I.key==="Escape"&&xt()}const M=Xe(null),X=Xe(""),oe=Xe(null);function _e(I){M.value={id:I.id,name:I.title},X.value=I.title,nu(()=>oe.value?.focus())}async function be(){if(!M.value)return;const I=X.value.trim();if(!I||I===M.value.name){M.value=null;return}try{await e.updateLifeline(M.value.id,{name:I}),M.value=null}catch{await e.reload(),M.value=null}}function Te(I){I.key==="Enter"?(I.stopPropagation(),be()):I.key==="Escape"&&(I.stopPropagation(),M.value=null)}function se(I){e.startSelectingTarget(I.id,I.title)}async function de(I){await e.createAssoc(I),e.closeEditAssoc()}async function Le(I){await e.updateAssoc(I.association_id,{relation_type:I.relation_type,confidence:I.confidence,evidence:I.evidence}),e.closeEditAssoc()}async function Oe(I){e.closeEditAssoc(),await e.deleteAssoc(I)}async function Ae(I){if(!e.data)return;const O=e.state;if(O.kind!=="node_focus"&&O.kind!=="relation_reveal")return;const W=O.entity_id;if(!e.data.entities.find(Qe=>Qe.id===W))return;const ve=e.data.associations.find(Qe=>Qe.id===I.id);if(!ve)return;const Pe=e.data.entities.find(Qe=>Qe.id===ve.from),it=e.data.entities.find(Qe=>Qe.id===ve.to);e.openEditAssoc({id:ve.id,from:ve.from,fromTitle:Pe?.title||ve.from,to:ve.to,toTitle:it?.title||ve.to,relation_type:ve.relation_type,confidence:ve.confidence,status:ve.status,evidence:ve.evidence||[]})}async function Se(I){await m("删除关联","确定删除这条关联？此操作不可撤销。","确认删除",!0)&&await e.deleteAssoc(I)}function at(I){if((I.ctrlKey||I.metaKey)&&I.key==="k"){I.preventDefault(),I.stopPropagation(),l.value=!l.value;return}if(I.key==="/"&&!l.value){const W=I.target;if(W.tagName==="INPUT"||W.tagName==="TEXTAREA")return;I.preventDefault(),l.value=!0;return}if(I.key==="?"){const W=I.target;if(W.tagName==="INPUT"||W.tagName==="TEXTAREA")return;I.preventDefault(),c.value=!c.value;return}const O=e.state;if(I.key==="Escape"){if(e.selectingTarget){e.cancelSelecting();return}if(k.value||$.value){pe();return}if(l.value){l.value=!1;return}O.kind==="relation_reveal"?(vt(),e.transition({kind:"node_focus",entity_kind:O.entity_kind,entity_id:O.entity_id})):O.kind==="node_focus"?e.transition({kind:O.lifeline_id?"region_zoom":"global_overview",lifeline_id:O.lifeline_id}):O.kind==="region_zoom"&&e.transition({kind:"global_overview"})}(I.key==="r"||I.key==="R")&&(O.kind==="node_focus"?ct():O.kind==="relation_reveal"&&vt())}function ct(){if(!e.data||!n)return;const I=e.state;if(I.kind!=="node_focus")return;const O=I.entity_id;e.transition({kind:"relation_reveal",entity_kind:I.entity_kind,entity_id:O}),a=gS(n.scene,e.data,n.layoutNodes,O,new fe(t.value.clientWidth,t.value.clientHeight));const W=new Set([O]);a.forEach(j=>{W.add(j.fromNode.id),W.add(j.toNode.id)}),_S(n.nodes,W),w()}function vt(){n&&(ge(),a.forEach(I=>{if(n.scene.remove(I.line),I.line.geometry?.dispose(),I.line.material){const O=I.line.material;Array.isArray(O)?O.forEach(W=>W.dispose()):O.dispose()}I.arrow&&(n.scene.remove(I.arrow),I.arrow.geometry?.dispose(),I.arrow.material instanceof jt&&I.arrow.material.dispose())}),a=[],cf(n.nodes))}function B(){if(!n)return;s=requestAnimationFrame(B),i?.update(),SS(.016,n.camera,i);const I=n.camera.position.length(),O=I>3.5?1:I>=2?2:3,W=e.state.kind==="node_focus"||e.state.kind==="relation_reveal";n.nodes.forEach(j=>{const ve=j.userData.layer;j.visible=W||ve<=O}),n.lines.forEach(j=>{const ve=j.userData?.fromLayer??3,Pe=j.userData?.toLayer??3;j.visible=W||Math.max(ve,Pe)<=O}),vS(n.nodes,.016),ye&&ye.syncPositions(n.nodes),n.renderer.render(n.scene,n.camera),ye&&ue&&(ye.update(e.state,n.camera,e.data?.associations),ue.render(n.scene,n.camera))}async function we(){if(!n)return;const I=e.state,O=n.layoutNodes;if(I.kind==="global_overview"){eu(n.scene);for(const W of n.nodes)W.userData.targetPosition=W.userData.homePosition.clone();cf(n.nodes),wo(n.camera,i,new R(0,2.5,5.5),new R(0,0,0),60,800)}else if(I.kind==="region_zoom"){eu(n.scene);for(const Pe of n.nodes)Pe.userData.targetPosition=Pe.userData.homePosition.clone();const W=I.lifeline_id;let ve=O.find(Pe=>Pe.id===W&&Pe.layer===1);if(!ve){const Pe=O.find(it=>it.id===W);if(Pe){let it=Pe.parentId;for(;it;){const Qe=O.find(He=>He.id===it);if(Qe&&Qe.layer===1){ve=Qe;break}it=Qe?.parentId}}}if(ve){const Pe=ve.position.clone().normalize(),it=Li.R1+1.8;wo(n.camera,i,Pe.clone().multiplyScalar(it),ve.position,50,800);const Qe=ve.id,He=new Set,mt=[Qe];for(;mt.length>0;){const ut=mt.shift();He.add(ut),O.filter(gt=>gt.parentId===ut).forEach(gt=>mt.push(gt.id))}om(n.nodes,He)}}else if(I.kind==="node_focus"||I.kind==="relation_reveal"){const W=I.entity_id,j=O.find(ut=>ut.id===W);if(!j)return;eu(n.scene),yS(n.scene,j.position,jn("--accent"));const ve=j.position.clone().normalize(),Pe=j.position.length()+.6,it=ve.clone().multiplyScalar(Pe);wo(n.camera,i,it,j.position,I.kind==="node_focus"?35:55,800);const{computeFocusLayout:Qe}=await Tt(async()=>{const{computeFocusLayout:ut}=await Promise.resolve().then(()=>uS);return{computeFocusLayout:ut}},void 0),{targets:He,constellationIds:mt}=Qe(O,W,e.data?.associations||[],ve);for(const ut of n.nodes){const gt=ut.userData.id,Ht=He.get(gt);ut.userData.targetPosition=Ht?Ht.clone():ut.userData.homePosition.clone()}xS(n.nodes,mt)}}return Co(()=>e.state,we,{deep:!0}),Co(()=>e.state.kind,()=>{_.value=!0,y.value=!1,E&&clearTimeout(E),E=window.setTimeout(()=>{_.value=!1,y.value=!0},3e3)}),ns(async()=>{await e.load(),e.data&&await re()}),Us(()=>{cancelAnimationFrame(s),n?.dispose(),i?.dispose(),window.removeEventListener("keydown",at),window.removeEventListener("resize",ie),ye&&(ye.dispose(),ye=null),ue?.domElement&&ue.domElement.remove(),E&&clearTimeout(E)}),(I,O)=>(Y(),Q("div",nT,[D("div",iT,[Ca(RS,{state:Je(e).state,onNav:O[0]||(O[0]=W=>Je(e).transition(W))},null,8,["state"]),Je(e).state.kind!=="global_overview"?(Y(),Q("button",{key:0,class:"home-btn",onClick:O[1]||(O[1]=W=>Je(e).transition({kind:"global_overview"})),title:"回到全局"},"⌂")):We("",!0),l.value?(Y(),as(K1,{key:1,onSelect:je,onClose:O[2]||(O[2]=W=>l.value=!1)})):We("",!0),l.value?We("",!0):(Y(),as(Mw,{key:2,onFocusLifeline:he,onFocusEntity:ne})),l.value?We("",!0):(Y(),Q("button",{key:3,class:"search-trigger",onClick:O[3]||(O[3]=W=>l.value=!0)},"搜索 ⌘K"))]),Je(e).loading?(Y(),Q("div",sT,[...O[19]||(O[19]=[D("div",{class:"loader-ring"},null,-1),D("div",{class:"state-text"},"加载 Atlas…",-1)])])):Je(e).error?(Y(),Q("div",rT,[O[20]||(O[20]=D("div",{class:"state-text"},"Cosmos 数据加载失败",-1)),O[21]||(O[21]=D("div",{class:"state-sub"},"API 和 mock 均不可用",-1)),D("button",{class:"retry-btn",onClick:O[4]||(O[4]=W=>Je(e).reload())},"重试")])):Je(e).data&&Je(e).data.lifelines.length===0?(Y(),Q("div",aT,[...O[22]||(O[22]=[D("div",{class:"state-text"},"暂无 lifeline",-1),D("div",{class:"state-sub"},"在左侧面板中创建第一条 lifeline 来开始构建知识星球",-1)])])):We("",!0),!Je(e).loading&&!Je(e).error&&Je(e).data&&Je(e).data.lifelines.length>0?(Y(),Q(et,{key:3},[D("canvas",{ref_key:"canvasRef",ref:t,class:"cosmos-canvas"},null,512),Ca(k1,{ref_key:"nodeDetailRef",ref:v,onEditAssoc:Ae,onDeleteAssoc:Se,onCopied:K},null,512),Je(o)&&Je(e).state.kind==="relation_reveal"?(Y(),Q("div",oT,Me(Je(o)),1)):We("",!0),_.value?(Y(),Q("div",{key:1,class:An(["shortcuts-hint",{fade:y.value}])},[Je(e).state.kind==="global_overview"?(Y(),Q(et,{key:0},[Cn("点击 R1 进入 lifeline   滚轮缩放   拖拽旋转   Ctrl+K 搜索")],64)):Je(e).state.kind==="region_zoom"?(Y(),Q(et,{key:1},[Cn("点击 R2/R3 聚焦 entity   滚轮缩放   Esc 返回全局   Ctrl+K 搜索")],64)):Je(e).state.kind==="node_focus"?(Y(),Q(et,{key:2},[Cn("R 查看关联   Esc 返回 lifeline   拖拽旋转")],64)):Je(e).state.kind==="relation_reveal"?(Y(),Q(et,{key:3},[Cn("Esc 返回焦点   点击关联线查看证据   底部筛选")],64)):We("",!0)],2)):We("",!0),d.value?(Y(),as(rE,{key:2,target:d.value.target,x:d.value.x,y:d.value.y,onClose:O[5]||(O[5]=W=>d.value=null),onEditTitle:U,onDeleteEntity:nt,onMoveLifeline:Be,onCreateEntity:Ke,onEditLifelineName:_e,onAssociateTo:se,onFindPathTo:V,onCopyTitle:ce,onDeleteLifeline:q},null,8,["target","x","y"])):We("",!0),f.value?(Y(),as(uE,{key:3,title:f.value.title,message:f.value.message,"confirm-label":f.value.confirmLabel,danger:f.value.danger,onConfirm:O[6]||(O[6]=W=>{f.value.resolve(!0),f.value=null}),onCancel:O[7]||(O[7]=W=>{f.value.resolve(!1),f.value=null})},null,8,["title","message","confirm-label","danger"])):We("",!0),M.value?(Y(),Q("div",{key:4,class:"create-overlay",onPointerdown:O[11]||(O[11]=W=>M.value=null)},[D("div",{class:"create-dialog",onPointerdown:O[10]||(O[10]=mn(()=>{},["stop"]))},[O[23]||(O[23]=D("div",{class:"create-title"},"编辑 lifeline 名称",-1)),Lt(D("input",{ref_key:"lifelineEditEl",ref:oe,"onUpdate:modelValue":O[8]||(O[8]=W=>X.value=W),class:"create-input",onKeydown:Te},null,544),[[Xt,X.value]]),D("div",lT,[D("button",{class:"confirm-btn cancel-btn",onClick:O[9]||(O[9]=W=>M.value=null)},"取消"),D("button",{class:"confirm-btn primary-btn",disabled:!X.value.trim(),onClick:be},"保存",8,cT)])],32)],32)):We("",!0),x.value?(Y(),Q("div",{key:5,class:"create-overlay",onPointerdown:xt},[D("div",{class:"create-dialog",onPointerdown:O[13]||(O[13]=mn(()=>{},["stop"]))},[D("div",uT,"新建 "+Me(x.value.kind),1),D("div",dT,"添加到「"+Me(x.value.lifelineName)+"」",1),Lt(D("input",{ref_key:"createInputEl",ref:p,"onUpdate:modelValue":O[12]||(O[12]=W=>g.value=W),class:"create-input",placeholder:"输入标题…",onKeydown:A},null,544),[[Xt,g.value]]),D("div",hT,[D("button",{class:"confirm-btn cancel-btn",onClick:xt},"取消"),D("button",{class:"confirm-btn primary-btn",disabled:!g.value.trim(),onClick:xe},"创建",8,fT)])],32)],32)):We("",!0)],64)):We("",!0),Je(e).editAssoc?(Y(),as(PE,{key:4,"from-id":Je(e).editAssoc.from,"from-title":Je(e).editAssoc.fromTitle,"to-id":Je(e).editAssoc.to,"to-title":Je(e).editAssoc.toTitle,existing:Je(e).editAssoc.id?{id:Je(e).editAssoc.id,relation_type:Je(e).editAssoc.relation_type,confidence:Je(e).editAssoc.confidence,status:Je(e).editAssoc.status,evidence:Je(e).editAssoc.evidence}:void 0,onCancel:O[14]||(O[14]=W=>Je(e).closeEditAssoc()),onCreate:de,onUpdate:Le,onDelete:Oe},null,8,["from-id","from-title","to-id","to-title","existing"])):We("",!0),Je(e).selectingTarget?(Y(),Q("div",pT," crosshair 点击目标 entity 来创建关联 (Esc 取消) ")):We("",!0),k.value?(Y(),Q("div",mT," crosshair 点击目标 entity 查找最短路径 (Esc 取消) ")):We("",!0),$.value?(Y(),as(KE,{key:7,paths:$.value,"current-path-index":z.value,"from-title":$.value[z.value]?.[0]?.entityTitle||"","to-title":$.value[z.value]?.[$.value[z.value].length-1]?.entityTitle||"",onPrevPath:Ee,onNextPath:Ie,onClear:pe,onFocusEntity:Fe,onCopied:F},null,8,["paths","current-path-index","from-title","to-title"])):We("",!0),c.value?(Y(),as(tT,{key:8,onClose:O[15]||(O[15]=W=>c.value=!1)})):We("",!0),u.value?(Y(),Q("div",gT,"已复制到剪贴板")):We("",!0),Ca(DE,{"show-assoc":Je(e).state.kind==="relation_reveal"},null,8,["show-assoc"]),Je(n)&&Je(e).state.kind!=="node_focus"&&Je(e).state.kind!=="relation_reveal"?(Y(),Q("div",_T,[Ca(NE,{"layout-nodes":Je(n).layoutNodes,camera:Je(n).camera,controls:Je(i),"world-radius":Je(Li).R3,"focused-lifeline-id":Je(e).state.kind==="region_zoom"?Je(e).state.lifeline_id:null,onJump:O[16]||(O[16]=(W,j)=>Je(wo)(Je(n).camera,Je(i),W,j,60,800))},null,8,["layout-nodes","camera","controls","world-radius","focused-lifeline-id"])])):We("",!0),Je(e).state.kind==="relation_reveal"?(Y(),Q("div",vT,[D("div",xT,[(Y(),Q(et,null,sn(["co_occurrence","causal","tension","derived_from","manual"],W=>D("button",{key:W,class:An(["filter-chip",{active:b.types.includes(W)}]),onClick:j=>P(W)},Me({co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[W]),11,yT)),64))]),D("div",bT,[D("span",MT,"信心度 ≥ "+Me(b.minConfidence.toFixed(2)),1),Lt(D("input",{"onUpdate:modelValue":O[17]||(O[17]=W=>b.minConfidence=W),type:"range",min:"0",max:"1",step:"0.05",class:"filter-range",onInput:w},null,544),[[Xt,b.minConfidence,void 0,{number:!0}]])]),Lt(D("select",{"onUpdate:modelValue":O[18]||(O[18]=W=>b.status=W),class:"filter-select",onChange:w},[...O[24]||(O[24]=[D("option",{value:"all"},"全部",-1),D("option",{value:"accepted"},"已确认",-1),D("option",{value:"pending"},"待定",-1)])],544),[[ws,b.status]]),D("span",ST,"显示 "+Me(L.value)+"/"+Me(Je(a).length)+" 条关联",1),Je(a).length>0&&L.value===0?(Y(),Q("span",wT,"当前筛选条件下无可见关联")):We("",!0)])):We("",!0)]))}}),AT=Xn(TT,[["__scopeId","data-v-6ba17759"]]),IT=Object.freeze(Object.defineProperty({__proto__:null,default:AT},Symbol.toStringTag,{value:"Module"}));export{av as C,gm as M,St as O,qi as P,hn as Q,yr as R,z0 as S,_m as T,fe as V,IT as a,gl as b,rt as c,R as d};
