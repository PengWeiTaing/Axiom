const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-_ulAEbzr.js","assets/vue-Cvl-Tb45.js","assets/index-RjWMaq7c.css","assets/OrbitControls-BikD7SNb.js","assets/CSS2DRenderer-6i-PSdSd.js","assets/labels-BeSu0O4y.js"])))=>i.map(i=>d[i]);
import{_ as Et,a as Xn}from"./index-_ulAEbzr.js";import{m as mm,u as Be,l as $n,s as X,f as q,F as nt,v as cn,e as We,w as ye,c as nn,x as Je,b as P,C as Tt,z as Vt,D as ni,y as bi,E as pn,p as ur,o as Rn,i as Bn,A as Io,h as gr,n as su,r as zi,q as ls,t as df,j as Ia,d as Xi}from"./vue-Cvl-Tb45.js";const ks=mm("cosmos",()=>{const r=Be(null),e=Be({kind:"global_overview"}),t=Be(!1),n=Be(null),i=Be(null);function s(G){i.value=G}const a={};function o(G,U){a[G]?.forEach(O=>O(U))}function l(G,U){a[G]||(a[G]=[]),a[G].push(U)}async function c(){if(!r.value){t.value=!0;try{const{apiRequest:G}=await Et(async()=>{const{apiRequest:U}=await import("./index-_ulAEbzr.js").then(O=>O.c);return{apiRequest:U}},__vite__mapDeps([0,1,2]));r.value=await G("/cosmos")}catch{try{const U=await fetch("/mock/cosmos.json");r.value=await U.json()}catch{n.value="Cosmos 数据加载失败"}}finally{t.value=!1}}}function u(G){o(`leave_${e.value.kind}`,e.value),e.value=G,i.value=null,o(`enter_${G.kind}`,G)}async function h(){r.value=null,n.value=null,C.value.clear(),await c()}async function d(G){const{createLifeline:U}=await Et(async()=>{const{createLifeline:O}=await import("./index-_ulAEbzr.js").then(V=>V.e);return{createLifeline:O}},__vite__mapDeps([0,1,2]));await U(G),await h()}async function f(G,U){const{updateLifeline:O}=await Et(async()=>{const{updateLifeline:V}=await import("./index-_ulAEbzr.js").then(ce=>ce.e);return{updateLifeline:V}},__vite__mapDeps([0,1,2]));await O(G,U),await h()}async function g(G){const{deleteLifeline:U}=await Et(async()=>{const{deleteLifeline:O}=await import("./index-_ulAEbzr.js").then(V=>V.e);return{deleteLifeline:O}},__vite__mapDeps([0,1,2]));await U(G),await h()}async function x(G,U,O){const{mountEntity:V}=await Et(async()=>{const{mountEntity:ce}=await import("./index-_ulAEbzr.js").then(me=>me.e);return{mountEntity:ce}},__vite__mapDeps([0,1,2]));await V(G,U,O),await h()}async function m(G,U){if(r.value){const O=r.value.associations.findIndex(V=>V.id===G);O!==-1&&(r.value={...r.value,associations:[...r.value.associations.slice(0,O),{...r.value.associations[O],status:U},...r.value.associations.slice(O+1)]})}try{const{reviewAssociation:O}=await Et(async()=>{const{reviewAssociation:V}=await import("./index-_ulAEbzr.js").then(ce=>ce.e);return{reviewAssociation:V}},__vite__mapDeps([0,1,2]));await O(G,U)}catch{await h()}}async function p(G,U,O){const{updateEntity:V}=await Et(async()=>{const{updateEntity:ce}=await import("./index-_ulAEbzr.js").then(me=>me.e);return{updateEntity:ce}},__vite__mapDeps([0,1,2]));await V(G,U,{title:O}),await h()}async function _(G,U){const{deleteEntity:O}=await Et(async()=>{const{deleteEntity:V}=await import("./index-_ulAEbzr.js").then(ce=>ce.e);return{deleteEntity:V}},__vite__mapDeps([0,1,2]));await O(G,U),await h()}async function v(G,U,O){const{createEntity:V}=await Et(async()=>{const{createEntity:ce}=await import("./index-_ulAEbzr.js").then(me=>me.e);return{createEntity:ce}},__vite__mapDeps([0,1,2]));await V(G,U,O),await h()}async function y(G){const{createAssociation:U}=await Et(async()=>{const{createAssociation:O}=await import("./index-_ulAEbzr.js").then(V=>V.e);return{createAssociation:O}},__vite__mapDeps([0,1,2]));await U({...G,status:"accepted"}),await h()}async function w(G,U){const{updateAssociation:O}=await Et(async()=>{const{updateAssociation:V}=await import("./index-_ulAEbzr.js").then(ce=>ce.e);return{updateAssociation:V}},__vite__mapDeps([0,1,2]));await O(G,U),await h()}async function M(G){const{deleteAssociation:U}=await Et(async()=>{const{deleteAssociation:O}=await import("./index-_ulAEbzr.js").then(V=>V.e);return{deleteAssociation:O}},__vite__mapDeps([0,1,2]));await U(G),await h()}const C=Be(new Map),b=Be(null),T=Be(null);function L(G,U){b.value={fromId:G,fromTitle:U}}function I(){b.value=null}function B(G){T.value=G}function J(){T.value=null}return{data:r,state:e,loading:t,error:n,load:c,reload:h,transition:u,on:l,createLifeline:d,updateLifeline:f,deleteLifeline:g,mountEntity:x,reviewAssociation:m,selectedAssocId:i,selectAssociation:s,updateEntityTitle:p,deleteEntityById:_,createEntityUnderLifeline:v,createAssoc:y,updateAssoc:w,deleteAssoc:M,selectingTarget:b,startSelectingTarget:L,cancelSelecting:I,editAssoc:T,openEditAssoc:B,closeEditAssoc:J,entityDetailCache:C}});/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const El="184",gm={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},_m={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},hf=0,ru=1,ff=2,vm=3,xm=0,Yr=1,pf=2,dr=3,Oi=0,Mn=1,_i=2,Mi=0,Rs=1,au=2,ou=3,lu=4,mf=5,ym=6,es=100,gf=101,_f=102,vf=103,xf=104,yf=200,bf=201,Mf=202,Sf=203,Po=204,Lo=205,wf=206,Ef=207,Tf=208,Af=209,Cf=210,Rf=211,If=212,Pf=213,Lf=214,Do=0,Uo=1,No=2,Ds=3,Fo=4,Oo=5,ko=6,Bo=7,Sa=0,Df=1,Uf=2,ri=0,wu=1,Eu=2,Tu=3,Au=4,Cu=5,Ru=6,Iu=7,cu="attached",Nf="detached",Tl=300,Si=301,ss=302,Zr=303,Kr=304,Sr=306,ra=1e3,In=1001,aa=1002,Xt=1003,Pu=1004,bm=1004,hr=1005,Mm=1005,Ft=1006,Jr=1007,Sm=1007,xi=1008,wm=1008,An=1009,Lu=1010,Du=1011,_r=1012,Al=1013,Zn=1014,yn=1015,wi=1016,Cl=1017,Rl=1018,vr=1020,Uu=35902,Nu=35899,Fu=1021,Ou=1022,bn=1023,Ei=1026,ts=1027,Il=1028,wa=1029,rs=1030,Pl=1031,Em=1032,Ll=1033,jr=33776,Qr=33777,ea=33778,ta=33779,zo=35840,Vo=35841,Go=35842,Ho=35843,Wo=36196,Xo=37492,$o=37496,qo=37488,Yo=37489,oa=37490,Zo=37491,Ko=37808,Jo=37809,jo=37810,Qo=37811,el=37812,tl=37813,nl=37814,il=37815,sl=37816,rl=37817,al=37818,ol=37819,ll=37820,cl=37821,ul=36492,dl=36494,hl=36495,fl=36283,pl=36284,la=36285,ml=36286,Ff=2200,Of=2201,kf=2202,ca=2300,gl=2301,Ao=2302,uu=2303,Ts=2400,As=2401,ua=2402,Dl=2500,ku=2501,Tm=0,Am=1,Cm=2,Bf=3200,Rm=3201,Im=3202,Pm=3203,ki=0,zf=1,Di="",Tn="srgb",da="srgb-linear",ha="linear",At="srgb",Lm="",Dm="rg",Um="ga",Nm=0,ws=7680,Fm=7681,Om=7682,km=7683,Bm=34055,zm=34056,Vm=5386,Gm=512,Hm=513,Wm=514,Xm=515,$m=516,qm=517,Ym=518,du=519,Vf=512,Gf=513,Hf=514,Ul=515,Wf=516,Xf=517,Nl=518,$f=519,fa=35044,Zm=35048,Km=35040,Jm=35045,jm=35049,Qm=35041,eg=35046,tg=35050,ng=35042,ig="100",hu="300 es",zn=2e3,Us=2001,sg={COMPUTE:"compute",RENDER:"render"},rg={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},ag={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},og={TEXTURE_COMPARE:"depthTextureCompare"};function lg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}const cg={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function fr(r,e){return new cg[r](e)}function qf(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function pa(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Yf(){const r=pa("canvas");return r.style.display="block",r}const Ed={};let as=null;function ug(r){as=r}function dg(){return as}function ma(...r){const e="THREE."+r.shift();as?as("log",e,...r):console.log(e,...r)}function Zf(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Ce(...r){r=Zf(r);const e="THREE."+r.shift();if(as)as("warn",e,...r);else{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function qe(...r){r=Zf(r);const e="THREE."+r.shift();if(as)as("error",e,...r);else{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function _l(...r){const e=r.join(" ");e in Ed||(Ed[e]=!0,Ce(...r))}function hg(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const fg={[Do]:Uo,[No]:ko,[Fo]:Bo,[Ds]:Oo,[Uo]:Do,[ko]:No,[Bo]:Fo,[Oo]:Ds};class li{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const dn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Td=1234567;const Is=Math.PI/180,xr=180/Math.PI;function Gn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(dn[r&255]+dn[r>>8&255]+dn[r>>16&255]+dn[r>>24&255]+"-"+dn[e&255]+dn[e>>8&255]+"-"+dn[e>>16&15|64]+dn[e>>24&255]+"-"+dn[t&63|128]+dn[t>>8&255]+"-"+dn[t>>16&255]+dn[t>>24&255]+dn[n&255]+dn[n>>8&255]+dn[n>>16&255]+dn[n>>24&255]).toLowerCase()}function it(r,e,t){return Math.max(e,Math.min(t,r))}function Bu(r,e){return(r%e+e)%e}function pg(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function mg(r,e,t){return r!==e?(t-r)/(e-r):0}function na(r,e,t){return(1-t)*r+t*e}function gg(r,e,t,n){return na(r,e,1-Math.exp(-t*n))}function _g(r,e=1){return e-Math.abs(Bu(r,e*2)-e)}function vg(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function xg(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function yg(r,e){return r+Math.floor(Math.random()*(e-r+1))}function bg(r,e){return r+Math.random()*(e-r)}function Mg(r){return r*(.5-Math.random())}function Sg(r){r!==void 0&&(Td=r);let e=Td+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function wg(r){return r*Is}function Eg(r){return r*xr}function Tg(r){return(r&r-1)===0&&r!==0}function Ag(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Cg(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Rg(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),h=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":r.set(o*u,l*h,l*d,o*c);break;case"YZY":r.set(l*d,o*u,l*h,o*c);break;case"ZXZ":r.set(l*h,l*d,o*u,o*c);break;case"XZX":r.set(o*u,l*g,l*f,o*c);break;case"YXY":r.set(l*f,o*u,l*g,o*c);break;case"ZYZ":r.set(l*g,l*f,o*u,o*c);break;default:Ce("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function xn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function pt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const vl={DEG2RAD:Is,RAD2DEG:xr,generateUUID:Gn,clamp:it,euclideanModulo:Bu,mapLinear:pg,inverseLerp:mg,lerp:na,damp:gg,pingpong:_g,smoothstep:vg,smootherstep:xg,randInt:yg,randFloat:bg,randFloatSpread:Mg,seededRandom:Sg,degToRad:wg,radToDeg:Eg,isPowerOfTwo:Tg,ceilPowerOfTwo:Ag,floorPowerOfTwo:Cg,setQuaternionFromProperEuler:Rg,normalize:pt,denormalize:xn},vd=class vd{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(it(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};vd.prototype.isVector2=!0;let fe=vd;class mn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3],d=s[a+0],f=s[a+1],g=s[a+2],x=s[a+3];if(h!==x||l!==d||c!==f||u!==g){let m=l*d+c*f+u*g+h*x;m<0&&(d=-d,f=-f,g=-g,x=-x,m=-m);let p=1-o;if(m<.9995){const _=Math.acos(m),v=Math.sin(_);p=Math.sin(p*_)/v,o=Math.sin(o*_)/v,l=l*p+d*o,c=c*p+f*o,u=u*p+g*o,h=h*p+x*o}else{l=l*p+d*o,c=c*p+f*o,u=u*p+g*o,h=h*p+x*o;const _=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=_,c*=_,u*=_,h*=_}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[a],d=s[a+1],f=s[a+2],g=s[a+3];return e[t]=o*g+u*h+l*f-c*d,e[t+1]=l*g+u*d+c*h-o*f,e[t+2]=c*g+u*f+o*d-l*h,e[t+3]=u*g-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),h=o(s/2),d=l(n/2),f=l(i/2),g=l(s/2);switch(a){case"XYZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"YZX":this._x=d*u*h+c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h-d*f*g;break;case"XZY":this._x=d*u*h-c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h+d*f*g;break;default:Ce("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(it(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+i*c-s*l,this._y=i*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const xd=class xd{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ad.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ad.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),u=2*(o*t-s*i),h=2*(s*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-s*h,this.z=i+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return lc.copy(this).projectOnVector(e),this.sub(lc)}reflect(e){return this.sub(lc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(it(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};xd.prototype.isVector3=!0;let R=xd;const lc=new R,Ad=new mn,yd=class yd{constructor(e,t,n,i,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],x=i[0],m=i[3],p=i[6],_=i[1],v=i[4],y=i[7],w=i[2],M=i[5],C=i[8];return s[0]=a*x+o*_+l*w,s[3]=a*m+o*v+l*M,s[6]=a*p+o*y+l*C,s[1]=c*x+u*_+h*w,s[4]=c*m+u*v+h*M,s[7]=c*p+u*y+h*C,s[2]=d*x+f*_+g*w,s[5]=d*m+f*v+g*M,s[8]=d*p+f*y+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*s,f=c*s-a*l,g=t*h+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=h*x,e[1]=(i*c-u*n)*x,e[2]=(o*n-i*a)*x,e[3]=d*x,e[4]=(u*t-i*l)*x,e[5]=(i*s-o*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(cc.makeScale(e,t)),this}rotate(e){return this.premultiply(cc.makeRotation(-e)),this}translate(e,t){return this.premultiply(cc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};yd.prototype.isMatrix3=!0;let lt=yd;const cc=new lt,Cd=new lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rd=new lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ig(){const r={enabled:!0,workingColorSpace:da,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===At&&(i.r=Fi(i.r),i.g=Fi(i.g),i.b=Fi(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===At&&(i.r=mr(i.r),i.g=mr(i.g),i.b=mr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Di?ha:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return _l("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return _l("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[da]:{primaries:e,whitePoint:n,transfer:ha,toXYZ:Cd,fromXYZ:Rd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Tn},outputColorSpaceConfig:{drawingBufferColorSpace:Tn}},[Tn]:{primaries:e,whitePoint:n,transfer:At,toXYZ:Cd,fromXYZ:Rd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Tn}}}),r}const vt=Ig();function Fi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function mr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Hs;class Kf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Hs===void 0&&(Hs=pa("canvas")),Hs.width=e.width,Hs.height=e.height;const i=Hs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Hs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=pa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Fi(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Fi(t[n]/255)*255):t[n]=Fi(t[n]);return{data:t,width:e.width,height:e.height}}else return Ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Pg=0;class ns{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Pg++}),this.uuid=Gn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(uc(i[a].image)):s.push(uc(i[a]))}else s=uc(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function uc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Kf.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Ce("Texture: Unable to serialize Texture."),{})}let Lg=0;const dc=new R;class kt extends li{constructor(e=kt.DEFAULT_IMAGE,t=kt.DEFAULT_MAPPING,n=In,i=In,s=Ft,a=xi,o=bn,l=An,c=kt.DEFAULT_ANISOTROPY,u=Di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lg++}),this.uuid=Gn(),this.name="",this.source=new ns(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(dc).x}get height(){return this.source.getSize(dc).y}get depth(){return this.source.getSize(dc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ce(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ce(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Tl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ra:e.x=e.x-Math.floor(e.x);break;case In:e.x=e.x<0?0:1;break;case aa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ra:e.y=e.y-Math.floor(e.y);break;case In:e.y=e.y<0?0:1;break;case aa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}kt.DEFAULT_IMAGE=null;kt.DEFAULT_MAPPING=Tl;kt.DEFAULT_ANISOTROPY=1;const bd=class bd{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,y=(f+1)/2,w=(p+1)/2,M=(u+d)/4,C=(h+x)/4,b=(g+m)/4;return v>y&&v>w?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=M/n,s=C/n):y>w?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=M/i,s=b/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=C/s,i=b/s),this.set(n,i,s,t),this}let _=Math.sqrt((m-g)*(m-g)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(h-x)/_,this.z=(d-u)/_,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this.w=it(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this.w=it(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};bd.prototype.isVector4=!0;let yt=bd;class zu extends li{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ft,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},s=new kt(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Ft,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new ns(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Hn extends zu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Fl extends kt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Dg extends Hn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Fl(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class Ol extends kt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ug extends Hn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Ol(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}const wl=class wl{constructor(e,t,n,i,s,a,o,l,c,u,h,d,f,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,u,h,d,f,g,x,m)}set(e,t,n,i,s,a,o,l,c,u,h,d,f,g,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new wl().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Ws.setFromMatrixColumn(e,0).length(),s=1/Ws.setFromMatrixColumn(e,1).length(),a=1/Ws.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*u,f=a*h,g=o*u,x=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+g*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,g=c*u,x=c*h;t[0]=d+x*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,g=c*u,x=c*h;t[0]=d-x*o,t[4]=-a*h,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,f=a*h,g=o*u,x=o*h;t[0]=l*u,t[4]=g*c-f,t[8]=d*c+x,t[1]=l*h,t[5]=x*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,g=o*l,x=o*c;t[0]=l*u,t[4]=x-d*h,t[8]=g*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+g,t[10]=d-x*h}else if(e.order==="XZY"){const d=a*l,f=a*c,g=o*l,x=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+x,t[5]=a*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=o*u,t[10]=x*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ng,e,Fg)}lookAt(e,t,n){const i=this.elements;return Nn.subVectors(e,t),Nn.lengthSq()===0&&(Nn.z=1),Nn.normalize(),$i.crossVectors(n,Nn),$i.lengthSq()===0&&(Math.abs(n.z)===1?Nn.x+=1e-4:Nn.z+=1e-4,Nn.normalize(),$i.crossVectors(n,Nn)),$i.normalize(),Pa.crossVectors(Nn,$i),i[0]=$i.x,i[4]=Pa.x,i[8]=Nn.x,i[1]=$i.y,i[5]=Pa.y,i[9]=Nn.y,i[2]=$i.z,i[6]=Pa.z,i[10]=Nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],_=n[3],v=n[7],y=n[11],w=n[15],M=i[0],C=i[4],b=i[8],T=i[12],L=i[1],I=i[5],B=i[9],J=i[13],G=i[2],U=i[6],O=i[10],V=i[14],ce=i[3],me=i[7],we=i[11],Ie=i[15];return s[0]=a*M+o*L+l*G+c*ce,s[4]=a*C+o*I+l*U+c*me,s[8]=a*b+o*B+l*O+c*we,s[12]=a*T+o*J+l*V+c*Ie,s[1]=u*M+h*L+d*G+f*ce,s[5]=u*C+h*I+d*U+f*me,s[9]=u*b+h*B+d*O+f*we,s[13]=u*T+h*J+d*V+f*Ie,s[2]=g*M+x*L+m*G+p*ce,s[6]=g*C+x*I+m*U+p*me,s[10]=g*b+x*B+m*O+p*we,s[14]=g*T+x*J+m*V+p*Ie,s[3]=_*M+v*L+y*G+w*ce,s[7]=_*C+v*I+y*U+w*me,s[11]=_*b+v*B+y*O+w*we,s[15]=_*T+v*J+y*V+w*Ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15],_=l*f-c*d,v=o*f-c*h,y=o*d-l*h,w=a*f-c*u,M=a*d-l*u,C=a*h-o*u;return t*(x*_-m*v+p*y)-n*(g*_-m*w+p*M)+i*(g*v-x*w+p*C)-s*(g*y-x*M+m*C)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],_=t*o-n*a,v=t*l-i*a,y=t*c-s*a,w=n*l-i*o,M=n*c-s*o,C=i*c-s*l,b=u*x-h*g,T=u*m-d*g,L=u*p-f*g,I=h*m-d*x,B=h*p-f*x,J=d*p-f*m,G=_*J-v*B+y*I+w*L-M*T+C*b;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/G;return e[0]=(o*J-l*B+c*I)*U,e[1]=(i*B-n*J-s*I)*U,e[2]=(x*C-m*M+p*w)*U,e[3]=(d*M-h*C-f*w)*U,e[4]=(l*L-a*J-c*T)*U,e[5]=(t*J-i*L+s*T)*U,e[6]=(m*y-g*C-p*v)*U,e[7]=(u*C-d*y+f*v)*U,e[8]=(a*B-o*L+c*b)*U,e[9]=(n*L-t*B-s*b)*U,e[10]=(g*M-x*y+p*_)*U,e[11]=(h*y-u*M-f*_)*U,e[12]=(o*T-a*I-l*b)*U,e[13]=(t*I-n*T+i*b)*U,e[14]=(x*v-g*w-m*_)*U,e[15]=(u*w-h*v+d*_)*U,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,d=s*c,f=s*u,g=s*h,x=a*u,m=a*h,p=o*h,_=l*c,v=l*u,y=l*h,w=n.x,M=n.y,C=n.z;return i[0]=(1-(x+p))*w,i[1]=(f+y)*w,i[2]=(g-v)*w,i[3]=0,i[4]=(f-y)*M,i[5]=(1-(d+p))*M,i[6]=(m+_)*M,i[7]=0,i[8]=(g+v)*C,i[9]=(m-_)*C,i[10]=(1-(d+x))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Ws.set(i[0],i[1],i[2]).length();const o=Ws.set(i[4],i[5],i[6]).length(),l=Ws.set(i[8],i[9],i[10]).length();s<0&&(a=-a),jn.copy(this);const c=1/a,u=1/o,h=1/l;return jn.elements[0]*=c,jn.elements[1]*=c,jn.elements[2]*=c,jn.elements[4]*=u,jn.elements[5]*=u,jn.elements[6]*=u,jn.elements[8]*=h,jn.elements[9]*=h,jn.elements[10]*=h,t.setFromRotationMatrix(jn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,s,a,o=zn,l=!1){const c=this.elements,u=2*s/(t-e),h=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let g,x;if(l)g=s/(a-s),x=a*s/(a-s);else if(o===zn)g=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Us)g=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=zn,l=!1){const c=this.elements,u=2/(t-e),h=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let g,x;if(l)g=1/(a-s),x=a/(a-s);else if(o===zn)g=-2/(a-s),x=-(a+s)/(a-s);else if(o===Us)g=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};wl.prototype.isMatrix4=!0;let rt=wl;const Ws=new R,jn=new rt,Ng=new R(0,0,0),Fg=new R(1,1,1),$i=new R,Pa=new R,Nn=new R,Id=new rt,Pd=new mn;class oi{constructor(e=0,t=0,n=0,i=oi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(it(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-it(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(it(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-it(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(it(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-it(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Ce("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Id.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Id,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Pd.setFromEuler(this),this.setFromQuaternion(Pd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}oi.DEFAULT_ORDER="XYZ";class kl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Og=0;const Ld=new R,Xs=new mn,Ai=new rt,La=new R,Pr=new R,kg=new R,Bg=new mn,Dd=new R(1,0,0),Ud=new R(0,1,0),Nd=new R(0,0,1),Fd={type:"added"},zg={type:"removed"},$s={type:"childadded",child:null},hc={type:"childremoved",child:null};class St extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Og++}),this.uuid=Gn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new R,t=new oi,n=new mn,i=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new rt},normalMatrix:{value:new lt}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xs.setFromAxisAngle(e,t),this.quaternion.multiply(Xs),this}rotateOnWorldAxis(e,t){return Xs.setFromAxisAngle(e,t),this.quaternion.premultiply(Xs),this}rotateX(e){return this.rotateOnAxis(Dd,e)}rotateY(e){return this.rotateOnAxis(Ud,e)}rotateZ(e){return this.rotateOnAxis(Nd,e)}translateOnAxis(e,t){return Ld.copy(e).applyQuaternion(this.quaternion),this.position.add(Ld.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dd,e)}translateY(e){return this.translateOnAxis(Ud,e)}translateZ(e){return this.translateOnAxis(Nd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ai.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?La.copy(e):La.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ai.lookAt(Pr,La,this.up):Ai.lookAt(La,Pr,this.up),this.quaternion.setFromRotationMatrix(Ai),i&&(Ai.extractRotation(i.matrixWorld),Xs.setFromRotationMatrix(Ai),this.quaternion.premultiply(Xs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Fd),$s.child=e,this.dispatchEvent($s),$s.child=null):qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(zg),hc.child=e,this.dispatchEvent(hc),hc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Fd),$s.child=e,this.dispatchEvent($s),$s.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,e,kg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,Bg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}St.DEFAULT_UP=new R(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class pr extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vg={type:"move"};class Co{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vg)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new pr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Jf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},Da={h:0,s:0,l:0};function fc(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Ne{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,vt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=vt.workingColorSpace){return this.r=e,this.g=t,this.b=n,vt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=vt.workingColorSpace){if(e=Bu(e,1),t=it(t,0,1),n=it(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=fc(a,s,e+1/3),this.g=fc(a,s,e),this.b=fc(a,s,e-1/3)}return vt.colorSpaceToWorking(this,i),this}setStyle(e,t=Tn){function n(s){s!==void 0&&parseFloat(s)<1&&Ce("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ce("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ce("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tn){const n=Jf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ce("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fi(e.r),this.g=Fi(e.g),this.b=Fi(e.b),this}copyLinearToSRGB(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tn){return vt.workingToColorSpace(hn.copy(this),e),Math.round(it(hn.r*255,0,255))*65536+Math.round(it(hn.g*255,0,255))*256+Math.round(it(hn.b*255,0,255))}getHexString(e=Tn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=vt.workingColorSpace){vt.workingToColorSpace(hn.copy(this),t);const n=hn.r,i=hn.g,s=hn.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=vt.workingColorSpace){return vt.workingToColorSpace(hn.copy(this),t),e.r=hn.r,e.g=hn.g,e.b=hn.b,e}getStyle(e=Tn){vt.workingToColorSpace(hn.copy(this),e);const t=hn.r,n=hn.g,i=hn.b;return e!==Tn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(qi),this.setHSL(qi.h+e,qi.s+t,qi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(qi),e.getHSL(Da);const n=na(qi.h,Da.h,t),i=na(qi.s,Da.s,t),s=na(qi.l,Da.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const hn=new Ne;Ne.NAMES=Jf;class Bl{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ne(e),this.density=t}clone(){return new Bl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class zl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ne(e),this.near=t,this.far=n}clone(){return new zl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Vu extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new oi,this.environmentIntensity=1,this.environmentRotation=new oi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Qn=new R,Ci=new R,pc=new R,Ri=new R,qs=new R,Ys=new R,Od=new R,mc=new R,gc=new R,_c=new R,vc=new yt,xc=new yt,yc=new yt;class Cn{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Qn.subVectors(e,t),i.cross(Qn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Qn.subVectors(i,t),Ci.subVectors(n,t),pc.subVectors(e,t);const a=Qn.dot(Qn),o=Qn.dot(Ci),l=Qn.dot(pc),c=Ci.dot(Ci),u=Ci.dot(pc),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,g=(a*u-o*l)*d;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ri)===null?!1:Ri.x>=0&&Ri.y>=0&&Ri.x+Ri.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,Ri)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ri.x),l.addScaledVector(a,Ri.y),l.addScaledVector(o,Ri.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return vc.setScalar(0),xc.setScalar(0),yc.setScalar(0),vc.fromBufferAttribute(e,t),xc.fromBufferAttribute(e,n),yc.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(vc,s.x),a.addScaledVector(xc,s.y),a.addScaledVector(yc,s.z),a}static isFrontFacing(e,t,n,i){return Qn.subVectors(n,t),Ci.subVectors(e,t),Qn.cross(Ci).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qn.subVectors(this.c,this.b),Ci.subVectors(this.a,this.b),Qn.cross(Ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Cn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Cn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Cn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Cn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Cn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;qs.subVectors(i,n),Ys.subVectors(s,n),mc.subVectors(e,n);const l=qs.dot(mc),c=Ys.dot(mc);if(l<=0&&c<=0)return t.copy(n);gc.subVectors(e,i);const u=qs.dot(gc),h=Ys.dot(gc);if(u>=0&&h<=u)return t.copy(i);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(qs,a);_c.subVectors(e,s);const f=qs.dot(_c),g=Ys.dot(_c);if(g>=0&&f<=g)return t.copy(s);const x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Ys,o);const m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return Od.subVectors(s,i),o=(h-u)/(h-u+(f-g)),t.copy(i).addScaledVector(Od,o);const p=1/(m+x+d);return a=x*p,o=d*p,t.copy(n).addScaledVector(qs,a).addScaledVector(Ys,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Kt{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ei.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ei.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ei.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ei):ei.fromBufferAttribute(s,a),ei.applyMatrix4(e.matrixWorld),this.expandByPoint(ei);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ua.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ua.copy(n.boundingBox)),Ua.applyMatrix4(e.matrixWorld),this.union(Ua)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ei),ei.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Lr),Na.subVectors(this.max,Lr),Zs.subVectors(e.a,Lr),Ks.subVectors(e.b,Lr),Js.subVectors(e.c,Lr),Yi.subVectors(Ks,Zs),Zi.subVectors(Js,Ks),hs.subVectors(Zs,Js);let t=[0,-Yi.z,Yi.y,0,-Zi.z,Zi.y,0,-hs.z,hs.y,Yi.z,0,-Yi.x,Zi.z,0,-Zi.x,hs.z,0,-hs.x,-Yi.y,Yi.x,0,-Zi.y,Zi.x,0,-hs.y,hs.x,0];return!bc(t,Zs,Ks,Js,Na)||(t=[1,0,0,0,1,0,0,0,1],!bc(t,Zs,Ks,Js,Na))?!1:(Fa.crossVectors(Yi,Zi),t=[Fa.x,Fa.y,Fa.z],bc(t,Zs,Ks,Js,Na))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ei).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ei).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ii=[new R,new R,new R,new R,new R,new R,new R,new R],ei=new R,Ua=new Kt,Zs=new R,Ks=new R,Js=new R,Yi=new R,Zi=new R,hs=new R,Lr=new R,Na=new R,Fa=new R,fs=new R;function bc(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){fs.fromArray(r,s);const o=i.x*Math.abs(fs.x)+i.y*Math.abs(fs.y)+i.z*Math.abs(fs.z),l=e.dot(fs),c=t.dot(fs),u=n.dot(fs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Ui=Gg();function Gg(){const r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,s[l]=c|u}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}function En(r){Math.abs(r)>65504&&Ce("DataUtils.toHalfFloat(): Value out of range."),r=it(r,-65504,65504),Ui.floatView[0]=r;const e=Ui.uint32View[0],t=e>>23&511;return Ui.baseTable[t]+((e&8388607)>>Ui.shiftTable[t])}function Xr(r){const e=r>>10;return Ui.uint32View[0]=Ui.mantissaTable[Ui.offsetTable[e]+(r&1023)]+Ui.exponentTable[e],Ui.floatView[0]}class Hg{static toHalfFloat(e){return En(e)}static fromHalfFloat(e){return Xr(e)}}const Yt=new R,Oa=new fe;let Wg=0;class Pt extends li{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=fa,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Oa.fromBufferAttribute(this,t),Oa.applyMatrix3(e),this.setXY(t,Oa.x,Oa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix3(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=xn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xn(t,this.array)),t}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xn(t,this.array)),t}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xn(t,this.array)),t}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array),s=pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==fa&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Xg extends Pt{constructor(e,t,n){super(new Int8Array(e),t,n)}}class $g extends Pt{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class qg extends Pt{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class Yg extends Pt{constructor(e,t,n){super(new Int16Array(e),t,n)}}class Gu extends Pt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Zg extends Pt{constructor(e,t,n){super(new Int32Array(e),t,n)}}class Hu extends Pt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Kg extends Pt{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=Xr(this.array[e*this.itemSize]);return this.normalized&&(t=xn(t,this.array)),t}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize]=En(t),this}getY(e){let t=Xr(this.array[e*this.itemSize+1]);return this.normalized&&(t=xn(t,this.array)),t}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+1]=En(t),this}getZ(e){let t=Xr(this.array[e*this.itemSize+2]);return this.normalized&&(t=xn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+2]=En(t),this}getW(e){let t=Xr(this.array[e*this.itemSize+3]);return this.normalized&&(t=xn(t,this.array)),t}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+3]=En(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.array[e+0]=En(t),this.array[e+1]=En(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array)),this.array[e+0]=En(t),this.array[e+1]=En(n),this.array[e+2]=En(i),this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array),s=pt(s,this.array)),this.array[e+0]=En(t),this.array[e+1]=En(n),this.array[e+2]=En(i),this.array[e+3]=En(s),this}}class Ve extends Pt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Jg=new Kt,Dr=new R,Mc=new R;class Jt{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Jg.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Dr.subVectors(e,this.center);const t=Dr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Dr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Mc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Dr.copy(e.center).add(Mc)),this.expandByPoint(Dr.copy(e.center).sub(Mc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let jg=0;const Yn=new rt,Sc=new St,js=new R,Fn=new Kt,Ur=new Kt,en=new R;class ct extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jg++}),this.uuid=Gn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(lg(e)?Hu:Gu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new lt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Yn.makeRotationFromQuaternion(e),this.applyMatrix4(Yn),this}rotateX(e){return Yn.makeRotationX(e),this.applyMatrix4(Yn),this}rotateY(e){return Yn.makeRotationY(e),this.applyMatrix4(Yn),this}rotateZ(e){return Yn.makeRotationZ(e),this.applyMatrix4(Yn),this}translate(e,t,n){return Yn.makeTranslation(e,t,n),this.applyMatrix4(Yn),this}scale(e,t,n){return Yn.makeScale(e,t,n),this.applyMatrix4(Yn),this}lookAt(e){return Sc.lookAt(e),Sc.updateMatrix(),this.applyMatrix4(Sc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(js).negate(),this.translate(js.x,js.y,js.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ve(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Fn.setFromBufferAttribute(s),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,Fn.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,Fn.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(Fn.min),this.boundingBox.expandByPoint(Fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(Fn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Ur.setFromBufferAttribute(o),this.morphTargetsRelative?(en.addVectors(Fn.min,Ur.min),Fn.expandByPoint(en),en.addVectors(Fn.max,Ur.max),Fn.expandByPoint(en)):(Fn.expandByPoint(Ur.min),Fn.expandByPoint(Ur.max))}Fn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)en.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(en));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)en.fromBufferAttribute(o,c),l&&(js.fromBufferAttribute(e,c),en.add(js)),i=Math.max(i,n.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let b=0;b<n.count;b++)o[b]=new R,l[b]=new R;const c=new R,u=new R,h=new R,d=new fe,f=new fe,g=new fe,x=new R,m=new R;function p(b,T,L){c.fromBufferAttribute(n,b),u.fromBufferAttribute(n,T),h.fromBufferAttribute(n,L),d.fromBufferAttribute(s,b),f.fromBufferAttribute(s,T),g.fromBufferAttribute(s,L),u.sub(c),h.sub(c),f.sub(d),g.sub(d);const I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(I),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(I),o[b].add(x),o[T].add(x),o[L].add(x),l[b].add(m),l[T].add(m),l[L].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let b=0,T=_.length;b<T;++b){const L=_[b],I=L.start,B=L.count;for(let J=I,G=I+B;J<G;J+=3)p(e.getX(J+0),e.getX(J+1),e.getX(J+2))}const v=new R,y=new R,w=new R,M=new R;function C(b){w.fromBufferAttribute(i,b),M.copy(w);const T=o[b];v.copy(T),v.sub(w.multiplyScalar(w.dot(T))).normalize(),y.crossVectors(M,T);const I=y.dot(l[b])<0?-1:1;a.setXYZW(b,v.x,v.y,v.z,I)}for(let b=0,T=_.length;b<T;++b){const L=_[b],I=L.start,B=L.count;for(let J=I,G=I+B;J<G;J+=3)C(e.getX(J+0)),C(e.getX(J+1)),C(e.getX(J+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new R,s=new R,a=new R,o=new R,l=new R,c=new R,u=new R,h=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)en.fromBufferAttribute(e,t),en.normalize(),e.setXYZ(t,en.x,en.y,en.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*u;for(let p=0;p<u;p++)d[g++]=c[f++]}return new Pt(d,u,h)}if(this.index===null)return Ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ct,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vl{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=fa,this.updateRanges=[],this.version=0,this.uuid=Gn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const gn=new R;class Vn{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyMatrix4(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyNormalMatrix(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.transformDirection(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=xn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=xn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=xn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=xn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=xn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array),s=pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){ma("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Pt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Vn(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ma("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Qg=0;class sn extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qg++}),this.uuid=Gn(),this.name="",this.type="Material",this.blending=Rs,this.side=Oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Po,this.blendDst=Lo,this.blendEquation=es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=Ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=du,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ws,this.stencilZFail=ws,this.stencilZPass=ws,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ce(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ce(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Rs&&(n.blending=this.blending),this.side!==Oi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Po&&(n.blendSrc=this.blendSrc),this.blendDst!==Lo&&(n.blendDst=this.blendDst),this.blendEquation!==es&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ds&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==du&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ws&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ws&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ws&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Wu extends sn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Qs;const Nr=new R,er=new R,tr=new R,nr=new fe,Fr=new fe,jf=new rt,ka=new R,Or=new R,Ba=new R,kd=new fe,wc=new fe,Bd=new fe;class Qf extends St{constructor(e=new Wu){if(super(),this.isSprite=!0,this.type="Sprite",Qs===void 0){Qs=new ct;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Vl(t,5);Qs.setIndex([0,1,2,0,2,3]),Qs.setAttribute("position",new Vn(n,3,0,!1)),Qs.setAttribute("uv",new Vn(n,2,3,!1))}this.geometry=Qs,this.material=e,this.center=new fe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&qe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),er.setFromMatrixScale(this.matrixWorld),jf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),tr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&er.multiplyScalar(-tr.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;za(ka.set(-.5,-.5,0),tr,a,er,i,s),za(Or.set(.5,-.5,0),tr,a,er,i,s),za(Ba.set(.5,.5,0),tr,a,er,i,s),kd.set(0,0),wc.set(1,0),Bd.set(1,1);let o=e.ray.intersectTriangle(ka,Or,Ba,!1,Nr);if(o===null&&(za(Or.set(-.5,.5,0),tr,a,er,i,s),wc.set(0,1),o=e.ray.intersectTriangle(ka,Ba,Or,!1,Nr),o===null))return;const l=e.ray.origin.distanceTo(Nr);l<e.near||l>e.far||t.push({distance:l,point:Nr.clone(),uv:Cn.getInterpolation(Nr,ka,Or,Ba,kd,wc,Bd,new fe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function za(r,e,t,n,i,s){nr.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Fr.x=s*nr.x-i*nr.y,Fr.y=i*nr.x+s*nr.y):Fr.copy(nr),r.copy(e),r.x+=Fr.x,r.y+=Fr.y,r.applyMatrix4(jf)}const Va=new R,zd=new R;class ep extends St{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const s=t[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let s;for(s=0;s<i.length&&!(t<i[s].distance);s++);return i.splice(s,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let s=t[n].distance;if(t[n].object.visible&&(s-=s*t[n].hysteresis),e<s)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){Va.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(Va);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){Va.setFromMatrixPosition(e.matrixWorld),zd.setFromMatrixPosition(this.matrixWorld);const n=Va.distanceTo(zd)/e.zoom;t[0].object.visible=!0;let i,s;for(i=1,s=t.length;i<s;i++){let a=t[i].distance;if(t[i].object.visible&&(a-=a*t[i].hysteresis),n>=a)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const a=n[i];t.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return t}}const Pi=new R,Ec=new R,Ga=new R,Ki=new R,Tc=new R,Ha=new R,Ac=new R;class wr{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pi.copy(this.origin).addScaledVector(this.direction,t),Pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ec.copy(e).add(t).multiplyScalar(.5),Ga.copy(t).sub(e).normalize(),Ki.copy(this.origin).sub(Ec);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Ga),o=Ki.dot(this.direction),l=-Ki.dot(Ga),c=Ki.lengthSq(),u=Math.abs(1-a*a);let h,d,f,g;if(u>0)if(h=a*l-o,d=a*o-l,g=s*u,h>=0)if(d>=-g)if(d<=g){const x=1/u;h*=x,d*=x,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Ec).addScaledVector(Ga,d),f}intersectSphere(e,t){Pi.subVectors(e.center,this.origin);const n=Pi.dot(this.direction),i=Pi.dot(Pi)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Pi)!==null}intersectTriangle(e,t,n,i,s){Tc.subVectors(t,e),Ha.subVectors(n,e),Ac.crossVectors(Tc,Ha);let a=this.direction.dot(Ac),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ki.subVectors(this.origin,e);const l=o*this.direction.dot(Ha.crossVectors(Ki,Ha));if(l<0)return null;const c=o*this.direction.dot(Tc.cross(Ki));if(c<0||l+c>a)return null;const u=-o*Ki.dot(Ac);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ln extends sn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=Sa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Vd=new rt,ps=new wr,Wa=new Jt,Gd=new R,Xa=new R,$a=new R,qa=new R,Cc=new R,Ya=new R,Hd=new R,Za=new R;class It extends St{constructor(e=new ct,t=new ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){Ya.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Cc.fromBufferAttribute(h,e),a?Ya.addScaledVector(Cc,u):Ya.addScaledVector(Cc.sub(t),u))}t.add(Ya)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Wa.copy(n.boundingSphere),Wa.applyMatrix4(s),ps.copy(e.ray).recast(e.near),!(Wa.containsPoint(ps.origin)===!1&&(ps.intersectSphere(Wa,Gd)===null||ps.origin.distanceToSquared(Gd)>(e.far-e.near)**2))&&(Vd.copy(s).invert(),ps.copy(e.ray).applyMatrix4(Vd),!(n.boundingBox!==null&&ps.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ps)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){const m=d[g],p=a[m.materialIndex],_=Math.max(m.start,f.start),v=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=_,w=v;y<w;y+=3){const M=o.getX(y),C=o.getX(y+1),b=o.getX(y+2);i=Ka(this,p,e,n,c,u,h,M,C,b),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const _=o.getX(m),v=o.getX(m+1),y=o.getX(m+2);i=Ka(this,a,e,n,c,u,h,_,v,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){const m=d[g],p=a[m.materialIndex],_=Math.max(m.start,f.start),v=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=_,w=v;y<w;y+=3){const M=y,C=y+1,b=y+2;i=Ka(this,p,e,n,c,u,h,M,C,b),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const _=m,v=m+1,y=m+2;i=Ka(this,a,e,n,c,u,h,_,v,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function e_(r,e,t,n,i,s,a,o){let l;if(e.side===Mn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===Oi,o),l===null)return null;Za.copy(o),Za.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Za);return c<t.near||c>t.far?null:{distance:c,point:Za.clone(),object:r}}function Ka(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,Xa),r.getVertexPosition(l,$a),r.getVertexPosition(c,qa);const u=e_(r,e,t,n,Xa,$a,qa,Hd);if(u){const h=new R;Cn.getBarycoord(Hd,Xa,$a,qa,h),i&&(u.uv=Cn.getInterpolatedAttribute(i,o,l,c,h,new fe)),s&&(u.uv1=Cn.getInterpolatedAttribute(s,o,l,c,h,new fe)),a&&(u.normal=Cn.getInterpolatedAttribute(a,o,l,c,h,new R),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new R,materialIndex:0};Cn.getNormal(Xa,$a,qa,d.normal),u.face=d,u.barycoord=h}return u}const kr=new yt,Wd=new yt,Xd=new yt,t_=new yt,$d=new rt,Ja=new R,Rc=new Jt,qd=new rt,Ic=new wr;class tp extends It{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=cu,this.bindMatrix=new rt,this.bindMatrixInverse=new rt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Kt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ja),this.boundingBox.expandByPoint(Ja)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Jt),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ja),this.boundingSphere.expandByPoint(Ja)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rc.copy(this.boundingSphere),Rc.applyMatrix4(i),e.ray.intersectsSphere(Rc)!==!1&&(qd.copy(i).invert(),Ic.copy(e.ray).applyMatrix4(qd),!(this.boundingBox!==null&&Ic.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ic)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new yt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===cu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Nf?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ce("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Wd.fromBufferAttribute(i.attributes.skinIndex,e),Xd.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(kr.copy(t),t.set(0,0,0,0)):(kr.set(...t,1),t.set(0,0,0)),kr.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const a=Xd.getComponent(s);if(a!==0){const o=Wd.getComponent(s);$d.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(t_.copy(kr).applyMatrix4($d),a)}}return t.isVector4&&(t.w=kr.w),t.applyMatrix4(this.bindMatrixInverse)}}class Xu extends St{constructor(){super(),this.isBone=!0,this.type="Bone"}}class ai extends kt{constructor(e=null,t=1,n=1,i,s,a,o,l,c=Xt,u=Xt,h,d){super(null,a,o,l,c,u,i,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Yd=new rt,n_=new rt;class Gl{constructor(e=[],t=[]){this.uuid=Gn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ce("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new rt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new rt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:n_;Yd.multiplyMatrices(o,t[s]),Yd.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Gl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new ai(t,e,e,bn,yn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(Ce("Skeleton: No bone found with UUID:",s),a=new Xu),this.bones.push(a),this.boneInverses.push(new rt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class yr extends Pt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ir=new rt,Zd=new rt,ja=[],Kd=new Kt,i_=new rt,Br=new It,zr=new Jt;class np extends It{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new yr(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,i_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Kt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ir),Kd.copy(e.boundingBox).applyMatrix4(ir),this.boundingBox.union(Kd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Jt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ir),zr.copy(e.boundingSphere).applyMatrix4(ir),this.boundingSphere.union(zr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Br.geometry=this.geometry,Br.material=this.material,Br.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zr.copy(this.boundingSphere),zr.applyMatrix4(n),e.ray.intersectsSphere(zr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,ir),Zd.multiplyMatrices(n,ir),Br.matrixWorld=Zd,Br.raycast(e,ja);for(let a=0,o=ja.length;a<o;a++){const l=ja[a];l.instanceId=s,l.object=this,t.push(l)}ja.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new yr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ai(new Float32Array(i*this.count),i,this.count,Il,yn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Pc=new R,s_=new R,r_=new lt;class Qi{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Pc.subVectors(n,t).cross(s_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(Pc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||r_.getNormalMatrix(e),i=this.coplanarPoint(Pc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ms=new Jt,a_=new fe(.5,.5),Qa=new R;class Er{constructor(e=new Qi,t=new Qi,n=new Qi,i=new Qi,s=new Qi,a=new Qi){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zn,n=!1){const i=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],d=s[6],f=s[7],g=s[8],x=s[9],m=s[10],p=s[11],_=s[12],v=s[13],y=s[14],w=s[15];if(i[0].setComponents(c-a,f-u,p-g,w-_).normalize(),i[1].setComponents(c+a,f+u,p+g,w+_).normalize(),i[2].setComponents(c+o,f+h,p+x,w+v).normalize(),i[3].setComponents(c-o,f-h,p-x,w-v).normalize(),n)i[4].setComponents(l,d,m,y).normalize(),i[5].setComponents(c-l,f-d,p-m,w-y).normalize();else if(i[4].setComponents(c-l,f-d,p-m,w-y).normalize(),t===zn)i[5].setComponents(c+l,f+d,p+m,w+y).normalize();else if(t===Us)i[5].setComponents(l,d,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ms.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ms.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ms)}intersectsSprite(e){ms.center.set(0,0,0);const t=a_.distanceTo(e.center);return ms.radius=.7071067811865476+t,ms.applyMatrix4(e.matrixWorld),this.intersectsSphere(ms)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Qa.x=i.normal.x>0?e.max.x:e.min.x,Qa.y=i.normal.y>0?e.max.y:e.min.y,Qa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Qa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const di=new rt,hi=new Er;class Hl{constructor(){this.coordinateSystem=zn}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(di.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),hi.setFromProjectionMatrix(di,i.coordinateSystem,i.reversedDepth),hi.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(di.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),hi.setFromProjectionMatrix(di,i.coordinateSystem,i.reversedDepth),hi.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(di.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),hi.setFromProjectionMatrix(di,i.coordinateSystem,i.reversedDepth),hi.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(di.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),hi.setFromProjectionMatrix(di,i.coordinateSystem,i.reversedDepth),hi.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(di.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),hi.setFromProjectionMatrix(di,i.coordinateSystem,i.reversedDepth),hi.containsPoint(e))return!0}return!1}clone(){return new Hl}}function Lc(r,e){return r-e}function o_(r,e){return r.z-e.z}function l_(r,e){return e.z-r.z}class c_{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){const s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});const o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}}const wn=new rt,u_=new Ne(1,1,1),Jd=new Er,d_=new Hl,eo=new Kt,gs=new Jt,Vr=new R,jd=new R,h_=new R,Dc=new c_,fn=new It,to=[];function f_(r,e,t=0){const n=e.itemSize;if(r.isInterleavedBufferAttribute||r.array.constructor!==e.array.constructor){const i=r.count;for(let s=0;s<i;s++)for(let a=0;a<n;a++)e.setComponent(s+t,a,r.getComponent(s,a))}else e.array.set(r.array,t*n);e.needsUpdate=!0}function _s(r,e){if(r.constructor!==e.constructor){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++)e[n]=r[n]}else{const t=Math.min(r.length,e.length);e.set(new r.constructor(r.buffer,0,t))}}class ip extends It{constructor(e,t,n=t*2,i){super(new ct,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new ai(t,e,e,bn,yn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new ai(t,e,e,wa,Zn);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new ai(t,e,e,bn,yn);n.colorSpace=vt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in e.attributes){const a=e.getAttribute(s),{array:o,itemSize:l,normalized:c}=a,u=new o.constructor(n*l),h=new Pt(u,l,c);t.setAttribute(s,h)}if(e.getIndex()!==null){const s=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Pt(s,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=e.getAttribute(n),s=t.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){const t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){const t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kt);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,wn),this.getBoundingBoxAt(s,eo).applyMatrix4(wn),e.union(eo)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jt);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,wn),this.getBoundingSphereAt(s,gs).applyMatrix4(wn),e.union(gs)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Lc),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const s=this._matricesTexture;wn.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;const a=this._colorsTexture;return a&&(u_.toArray(a.image.data,i*4),a.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const a=e.getIndex();if(a!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?a.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Lc),l=this._availableGeometryIds.shift(),s[l]=i):(l=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),a=t.getIndex(),o=this._geometryInfo[e];if(i&&a.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");const l=o.vertexStart,c=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(const u in n.attributes){const h=t.getAttribute(u),d=n.getAttribute(u);f_(h,d,l);const f=h.itemSize;for(let g=h.count,x=c;g<x;g++){const m=l+g;for(let p=0;p<f;p++)d.setComponent(m,p,0)}d.needsUpdate=!0,d.addUpdateRange(l*f,c*f)}if(i){const u=o.indexStart,h=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let d=0;d<a.count;d++)s.setX(u+d,l+a.getX(d));for(let d=a.count,f=h;d<f;d++)s.setX(u+d,l);s.needsUpdate=!0,s.addUpdateRange(u,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0;const n=this._geometryInfo,i=n.map((a,o)=>o).sort((a,o)=>n[a].vertexStart-n[o].vertexStart),s=this.geometry;for(let a=0,o=n.length;a<o;a++){const l=i[a],c=n[l];if(c.active!==!1){if(s.index!==null){if(c.indexStart!==t){const{indexStart:u,vertexStart:h,reservedIndexCount:d}=c,f=s.index,g=f.array,x=e-h;for(let m=u;m<u+d;m++)g[m]=g[m]+x;f.array.copyWithin(t,u,u+d),f.addUpdateRange(t,d),f.needsUpdate=!0,c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){const{vertexStart:u,reservedVertexCount:h}=c,d=s.attributes;for(const f in d){const g=d[f],{array:x,itemSize:m}=g;x.copyWithin(e*m,u*m,(u+h)*m),g.addUpdateRange(e*m,h*m),g.needsUpdate=!0}c.vertexStart=e}e+=c.reservedVertexCount,c.start=s.index?c.indexStart:c.vertexStart}}return this._nextIndexStart=t,this._nextVertexStart=e,this._visibilityChanged=!0,this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){const s=new Kt,a=n.index,o=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let u=l;a&&(u=a.getX(u)),s.expandByPoint(Vr.fromBufferAttribute(o,u))}i.boundingBox=s}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){const s=new Jt;this.getBoundingBoxAt(e,eo),eo.getCenter(s.center);const a=n.index,o=n.attributes.position;let l=0;for(let c=i.start,u=i.start+i.count;c<u;c++){let h=c;a&&(h=a.getX(h)),Vr.fromBufferAttribute(o,h),l=Math.max(l,s.center.distanceToSquared(Vr))}s.radius=Math.sqrt(l),i.boundingSphere=s}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);const n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null?t.isVector4?t.set(1,1,1,1):t.setRGB(1,1,1):t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(Lc);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const i=new Int32Array(e),s=new Int32Array(e);_s(this._multiDrawCounts,i),_s(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=e;const a=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),_s(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),_s(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),_s(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const s=this.geometry;s.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new ct,this._initializeGeometry(s));const a=this.geometry;s.index&&_s(s.index.array,a.index.array);for(const o in s.attributes)_s(s.attributes[o].array,a.attributes[o].array)}raycast(e,t){const n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,a=this.geometry;fn.material=this.material,fn.geometry.index=a.index,fn.geometry.attributes=a.attributes,fn.geometry.boundingBox===null&&(fn.geometry.boundingBox=new Kt),fn.geometry.boundingSphere===null&&(fn.geometry.boundingSphere=new Jt);for(let o=0,l=n.length;o<l;o++){if(!n[o].visible||!n[o].active)continue;const c=n[o].geometryIndex,u=i[c];fn.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(o,fn.matrixWorld).premultiply(s),this.getBoundingBoxAt(c,fn.geometry.boundingBox),this.getBoundingSphereAt(c,fn.geometry.boundingSphere),fn.raycast(e,to);for(let h=0,d=to.length;h<d;h++){const f=to[h];f.object=this,f.batchId=o,t.push(f)}to.length=0}fn.material=null,fn.geometry.index=null,fn.geometry.attributes={},fn.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const a=i.getIndex();let o=a===null?1:a.array.BYTES_PER_ELEMENT,l=1;s.wireframe&&(l=2,o=i.attributes.position.count>65535?4:2);const c=this._instanceInfo,u=this._multiDrawStarts,h=this._multiDrawCounts,d=this._geometryInfo,f=this.perObjectFrustumCulled,g=this._indirectTexture,x=g.image.data,m=n.isArrayCamera?d_:Jd;f&&!n.isArrayCamera&&(wn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),Jd.setFromProjectionMatrix(wn,n.coordinateSystem,n.reversedDepth));let p=0;if(this.sortObjects){wn.copy(this.matrixWorld).invert(),Vr.setFromMatrixPosition(n.matrixWorld).applyMatrix4(wn),jd.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(wn);for(let y=0,w=c.length;y<w;y++)if(c[y].visible&&c[y].active){const M=c[y].geometryIndex;this.getMatrixAt(y,wn),this.getBoundingSphereAt(M,gs).applyMatrix4(wn);let C=!1;if(f&&(C=!m.intersectsSphere(gs,n)),!C){const b=d[M],T=h_.subVectors(gs.center,Vr).dot(jd);Dc.push(b.start,b.count,T,y)}}const _=Dc.list,v=this.customSort;v===null?_.sort(s.transparent?l_:o_):v.call(this,_,n);for(let y=0,w=_.length;y<w;y++){const M=_[y];u[p]=M.start*o*l,h[p]=M.count*l,x[p]=M.index,p++}Dc.reset()}else for(let _=0,v=c.length;_<v;_++)if(c[_].visible&&c[_].active){const y=c[_].geometryIndex;let w=!1;if(f&&(this.getMatrixAt(_,wn),this.getBoundingSphereAt(y,gs).applyMatrix4(wn),w=!m.intersectsSphere(gs,n)),!w){const M=d[y];u[p]=M.start*o*l,h[p]=M.count*l,x[p]=_,p++}}g.needsUpdate=!0,this._multiDrawCount=p,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,s,a){this.onBeforeRender(e,null,i,s,a)}}class Sn extends sn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const xl=new R,yl=new R,Qd=new rt,Gr=new wr,no=new Jt,Uc=new R,eh=new R;class os extends St{constructor(e=new ct,t=new Sn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)xl.fromBufferAttribute(t,i-1),yl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=xl.distanceTo(yl);e.setAttribute("lineDistance",new Ve(n,1))}else Ce("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),no.copy(n.boundingSphere),no.applyMatrix4(i),no.radius+=s,e.ray.intersectsSphere(no)===!1)return;Qd.copy(i).invert(),Gr.copy(e.ray).applyMatrix4(Qd);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=c){const p=u.getX(x),_=u.getX(x+1),v=io(this,e,Gr,l,p,_,x);v&&t.push(v)}if(this.isLineLoop){const x=u.getX(g-1),m=u.getX(f),p=io(this,e,Gr,l,x,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=c){const p=io(this,e,Gr,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){const x=io(this,e,Gr,l,g-1,f,g-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function io(r,e,t,n,i,s,a){const o=r.geometry.attributes.position;if(xl.fromBufferAttribute(o,i),yl.fromBufferAttribute(o,s),t.distanceSqToSegment(xl,yl,Uc,eh)>n)return;Uc.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Uc);if(!(c<e.near||c>e.far))return{distance:c,point:eh.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const th=new R,nh=new R;class Ti extends os{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)th.fromBufferAttribute(t,i),nh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+th.distanceTo(nh);e.setAttribute("lineDistance",new Ve(n,1))}else Ce("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class sp extends os{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class $u extends sn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ih=new rt,fu=new wr,so=new Jt,ro=new R;class rp extends St{constructor(e=new ct,t=new $u){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),so.copy(n.boundingSphere),so.applyMatrix4(i),so.radius+=s,e.ray.intersectsSphere(so)===!1)return;ih.copy(i).invert(),fu.copy(e.ray).applyMatrix4(ih);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,x=f;g<x;g++){const m=c.getX(g);ro.fromBufferAttribute(h,m),sh(ro,m,l,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let g=d,x=f;g<x;g++)ro.fromBufferAttribute(h,g),sh(ro,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function sh(r,e,t,n,i,s,a){const o=fu.distanceSqToPoint(r);if(o<t){const l=new R;fu.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class ap extends kt{constructor(e,t,n,i,s=Ft,a=Ft,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;const u=this;function h(){u.needsUpdate=!0,u._requestVideoFrameCallbackId=e.requestVideoFrameCallback(h)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(h))}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}}class p_ extends ap{constructor(e,t,n,i,s,a,o,l){super({},e,t,n,i,s,a,o,l),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(e){this.image=e,this.needsUpdate=!0}}class m_ extends kt{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=Xt,this.minFilter=Xt,this.generateMipmaps=!1,this.needsUpdate=!0}}class Wl extends kt{constructor(e,t,n,i,s,a,o,l,c,u,h,d){super(null,a,o,l,c,u,i,s,h,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class g_ extends Wl{constructor(e,t,n,i,s,a){super(e,t,n,s,a),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=In,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class __ extends Wl{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,Si),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class Ea extends kt{constructor(e=[],t=Si,n,i,s,a,o,l,c,u){super(e,t,n,i,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class v_ extends kt{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class x_ extends kt{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;const u=e?e.parentNode:null;u!==null&&"requestPaint"in u&&(u.onpaint=()=>{this.needsUpdate=!0},u.requestPaint())}dispose(){const e=this.image?this.image.parentNode:null;e!==null&&"onpaint"in e&&(e.onpaint=null),super.dispose()}}class Ns extends kt{constructor(e,t,n=Zn,i,s,a,o=Xt,l=Xt,c,u=Ei,h=1){if(u!==Ei&&u!==ts)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,i,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ns(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class op extends Ns{constructor(e,t=Zn,n=Si,i,s,a=Xt,o=Xt,l,c=Ei){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,n,i,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class qu extends kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class cs extends ct{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ve(c,3)),this.setAttribute("normal",new Ve(u,3)),this.setAttribute("uv",new Ve(h,2));function g(x,m,p,_,v,y,w,M,C,b,T){const L=y/C,I=w/b,B=y/2,J=w/2,G=M/2,U=C+1,O=b+1;let V=0,ce=0;const me=new R;for(let we=0;we<O;we++){const Ie=we*I-J;for(let ke=0;ke<U;ke++){const st=ke*L-B;me[x]=st*_,me[m]=Ie*v,me[p]=G,c.push(me.x,me.y,me.z),me[x]=0,me[m]=0,me[p]=M>0?1:-1,u.push(me.x,me.y,me.z),h.push(ke/C),h.push(1-we/b),V+=1}}for(let we=0;we<b;we++)for(let Ie=0;Ie<C;Ie++){const ke=d+Ie+U*we,st=d+Ie+U*(we+1),oe=d+(Ie+1)+U*(we+1),$=d+(Ie+1)+U*we;l.push(ke,st,$),l.push(st,oe,$),ce+=6}o.addGroup(f,ce,T),f+=ce,d+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Xl extends ct{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const a=[],o=[],l=[],c=[],u=t/2,h=Math.PI/2*e,d=t,f=2*h+d,g=n*2+s,x=i+1,m=new R,p=new R;for(let _=0;_<=g;_++){let v=0,y=0,w=0,M=0;if(_<=n){const T=_/n,L=T*Math.PI/2;y=-u-e*Math.cos(L),w=e*Math.sin(L),M=-e*Math.cos(L),v=T*h}else if(_<=n+s){const T=(_-n)/s;y=-u+T*t,w=e,M=0,v=h+T*d}else{const T=(_-n-s)/n,L=T*Math.PI/2;y=u+e*Math.sin(L),w=e*Math.cos(L),M=e*Math.sin(L),v=h+d+T*h}const C=Math.max(0,Math.min(1,v/f));let b=0;_===0?b=.5/i:_===g&&(b=-.5/i);for(let T=0;T<=i;T++){const L=T/i,I=L*Math.PI*2,B=Math.sin(I),J=Math.cos(I);p.x=-w*J,p.y=y,p.z=w*B,o.push(p.x,p.y,p.z),m.set(-w*J,M,w*B),m.normalize(),l.push(m.x,m.y,m.z),c.push(L+b,C)}if(_>0){const T=(_-1)*x;for(let L=0;L<i;L++){const I=T+L,B=T+L+1,J=_*x+L,G=_*x+L+1;a.push(I,B,J),a.push(B,G,J)}}}this.setIndex(a),this.setAttribute("position",new Ve(o,3)),this.setAttribute("normal",new Ve(l,3)),this.setAttribute("uv",new Ve(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xl(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class $l extends ct{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new R,u=new fe;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=n+h/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Ve(a,3)),this.setAttribute("normal",new Ve(o,3)),this.setAttribute("uv",new Ve(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $l(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ta extends ct{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],h=[],d=[],f=[];let g=0;const x=[],m=n/2;let p=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new Ve(h,3)),this.setAttribute("normal",new Ve(d,3)),this.setAttribute("uv",new Ve(f,2));function _(){const y=new R,w=new R;let M=0;const C=(t-e)/n;for(let b=0;b<=s;b++){const T=[],L=b/s,I=L*(t-e)+e;for(let B=0;B<=i;B++){const J=B/i,G=J*l+o,U=Math.sin(G),O=Math.cos(G);w.x=I*U,w.y=-L*n+m,w.z=I*O,h.push(w.x,w.y,w.z),y.set(U,C,O).normalize(),d.push(y.x,y.y,y.z),f.push(J,1-L),T.push(g++)}x.push(T)}for(let b=0;b<i;b++)for(let T=0;T<s;T++){const L=x[T][b],I=x[T+1][b],B=x[T+1][b+1],J=x[T][b+1];(e>0||T!==0)&&(u.push(L,I,J),M+=3),(t>0||T!==s-1)&&(u.push(I,B,J),M+=3)}c.addGroup(p,M,0),p+=M}function v(y){const w=g,M=new fe,C=new R;let b=0;const T=y===!0?e:t,L=y===!0?1:-1;for(let B=1;B<=i;B++)h.push(0,m*L,0),d.push(0,L,0),f.push(.5,.5),g++;const I=g;for(let B=0;B<=i;B++){const G=B/i*l+o,U=Math.cos(G),O=Math.sin(G);C.x=T*O,C.y=m*L,C.z=T*U,h.push(C.x,C.y,C.z),d.push(0,L,0),M.x=U*.5+.5,M.y=O*.5*L+.5,f.push(M.x,M.y),g++}for(let B=0;B<i;B++){const J=w+B,G=I+B;y===!0?u.push(G,G+1,J):u.push(G+1,G,J),b+=3}c.addGroup(p,b,y===!0?1:2),p+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ta(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Tr extends Ta{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Tr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class us extends ct{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],a=[];o(i),c(n),u(),this.setAttribute("position",new Ve(s,3)),this.setAttribute("normal",new Ve(s.slice(),3)),this.setAttribute("uv",new Ve(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(_){const v=new R,y=new R,w=new R;for(let M=0;M<t.length;M+=3)f(t[M+0],v),f(t[M+1],y),f(t[M+2],w),l(v,y,w,_)}function l(_,v,y,w){const M=w+1,C=[];for(let b=0;b<=M;b++){C[b]=[];const T=_.clone().lerp(y,b/M),L=v.clone().lerp(y,b/M),I=M-b;for(let B=0;B<=I;B++)B===0&&b===M?C[b][B]=T:C[b][B]=T.clone().lerp(L,B/I)}for(let b=0;b<M;b++)for(let T=0;T<2*(M-b)-1;T++){const L=Math.floor(T/2);T%2===0?(d(C[b][L+1]),d(C[b+1][L]),d(C[b][L])):(d(C[b][L+1]),d(C[b+1][L+1]),d(C[b+1][L]))}}function c(_){const v=new R;for(let y=0;y<s.length;y+=3)v.x=s[y+0],v.y=s[y+1],v.z=s[y+2],v.normalize().multiplyScalar(_),s[y+0]=v.x,s[y+1]=v.y,s[y+2]=v.z}function u(){const _=new R;for(let v=0;v<s.length;v+=3){_.x=s[v+0],_.y=s[v+1],_.z=s[v+2];const y=m(_)/2/Math.PI+.5,w=p(_)/Math.PI+.5;a.push(y,1-w)}g(),h()}function h(){for(let _=0;_<a.length;_+=6){const v=a[_+0],y=a[_+2],w=a[_+4],M=Math.max(v,y,w),C=Math.min(v,y,w);M>.9&&C<.1&&(v<.2&&(a[_+0]+=1),y<.2&&(a[_+2]+=1),w<.2&&(a[_+4]+=1))}}function d(_){s.push(_.x,_.y,_.z)}function f(_,v){const y=_*3;v.x=e[y+0],v.y=e[y+1],v.z=e[y+2]}function g(){const _=new R,v=new R,y=new R,w=new R,M=new fe,C=new fe,b=new fe;for(let T=0,L=0;T<s.length;T+=9,L+=6){_.set(s[T+0],s[T+1],s[T+2]),v.set(s[T+3],s[T+4],s[T+5]),y.set(s[T+6],s[T+7],s[T+8]),M.set(a[L+0],a[L+1]),C.set(a[L+2],a[L+3]),b.set(a[L+4],a[L+5]),w.copy(_).add(v).add(y).divideScalar(3);const I=m(w);x(M,L+0,_,I),x(C,L+2,v,I),x(b,L+4,y,I)}}function x(_,v,y,w){w<0&&_.x===1&&(a[v]=_.x-1),y.x===0&&y.z===0&&(a[v]=w/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function p(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new us(e.vertices,e.indices,e.radius,e.detail)}}class ql extends us{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ql(e.radius,e.detail)}}const ao=new R,oo=new R,Nc=new R,lo=new Cn;class lp extends ct{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(Is*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:x,b:m,c:p}=lo;if(x.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),lo.getNormal(Nc),h[0]=`${Math.round(x.x*i)},${Math.round(x.y*i)},${Math.round(x.z*i)}`,h[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,h[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let _=0;_<3;_++){const v=(_+1)%3,y=h[_],w=h[v],M=lo[u[_]],C=lo[u[v]],b=`${y}_${w}`,T=`${w}_${y}`;T in d&&d[T]?(Nc.dot(d[T].normal)<=s&&(f.push(M.x,M.y,M.z),f.push(C.x,C.y,C.z)),d[T]=null):b in d||(d[b]={index0:c[_],index1:c[v],normal:Nc.clone()})}}for(const g in d)if(d[g]){const{index0:x,index1:m}=d[g];ao.fromBufferAttribute(o,x),oo.fromBufferAttribute(o,m),f.push(ao.x,ao.y,ao.z),f.push(oo.x,oo.y,oo.z)}this.setAttribute("position",new Ve(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class ci{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ce("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);const u=n[i],d=n[i+1]-u,f=(a-u)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new fe:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new R,i=[],s=[],a=[],o=new R,l=new rt;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new R)}s[0]=new R,a[0]=new R;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),d=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(it(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(it(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Yl extends ci{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new fe){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class cp extends Yl{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Yu(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,h){let d=(a-s)/c-(o-s)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+h)+(l-o)/h;d*=u,f*=u,i(a,o,d,f)},calc:function(s){const a=s*s,o=a*s;return r+e*s+t*a+n*o}}}const rh=new R,ah=new R,Fc=new Yu,Oc=new Yu,kc=new Yu;class up extends ci{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new R){const n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=i[(o-1)%s]:(ah.subVectors(i[0],i[1]).add(i[0]),c=ah);const h=i[o%s],d=i[(o+1)%s];if(this.closed||o+2<s?u=i[(o+2)%s]:(rh.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=rh),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),f),x=Math.pow(h.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(u),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),Fc.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,g,x,m),Oc.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,g,x,m),kc.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,g,x,m)}else this.curveType==="catmullrom"&&(Fc.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),Oc.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),kc.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return n.set(Fc.calc(l),Oc.calc(l),kc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new R().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function oh(r,e,t,n,i){const s=(n-e)*.5,a=(i-t)*.5,o=r*r,l=r*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*r+t}function y_(r,e){const t=1-r;return t*t*e}function b_(r,e){return 2*(1-r)*r*e}function M_(r,e){return r*r*e}function ia(r,e,t,n){return y_(r,e)+b_(r,t)+M_(r,n)}function S_(r,e){const t=1-r;return t*t*t*e}function w_(r,e){const t=1-r;return 3*t*t*r*e}function E_(r,e){return 3*(1-r)*r*r*e}function T_(r,e){return r*r*r*e}function sa(r,e,t,n,i){return S_(r,e)+w_(r,t)+E_(r,n)+T_(r,i)}class Zu extends ci{constructor(e=new fe,t=new fe,n=new fe,i=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new fe){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(sa(e,i.x,s.x,a.x,o.x),sa(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class dp extends ci{constructor(e=new R,t=new R,n=new R,i=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new R){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(sa(e,i.x,s.x,a.x,o.x),sa(e,i.y,s.y,a.y,o.y),sa(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ku extends ci{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class hp extends ci{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ju extends ci{constructor(e=new fe,t=new fe,n=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new fe){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(ia(e,i.x,s.x,a.x),ia(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ju extends ci{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(ia(e,i.x,s.x,a.x),ia(e,i.y,s.y,a.y),ia(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Qu extends ci{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){const n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],u=i[a>i.length-2?i.length-1:a+1],h=i[a>i.length-3?i.length-1:a+2];return n.set(oh(o,l.x,c.x,u.x,h.x),oh(o,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new fe().fromArray(i))}return this}}var bl=Object.freeze({__proto__:null,ArcCurve:cp,CatmullRomCurve3:up,CubicBezierCurve:Zu,CubicBezierCurve3:dp,EllipseCurve:Yl,LineCurve:Ku,LineCurve3:hp,QuadraticBezierCurve:Ju,QuadraticBezierCurve3:ju,SplineCurve:Qu});class fp extends ci{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new bl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const a=s[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new bl[i.type]().fromJSON(i))}return this}}class Ml extends fp{constructor(e){super(),this.type="Path",this.currentPoint=new fe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Ku(this.currentPoint.clone(),new fe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new Ju(this.currentPoint.clone(),new fe(e,t),new fe(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){const o=new Zu(this.currentPoint.clone(),new fe(e,t),new fe(n,i),new fe(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Qu(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){const c=new Yl(e,t,n,i,s,a,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ps extends Ml{constructor(e){super(e),this.uuid=Gn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Ml().fromJSON(i))}return this}}function A_(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=pp(r,0,i,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=L_(r,e,s,t)),r.length>80*t){o=r[0],l=r[1];let u=o,h=l;for(let d=t;d<i;d+=t){const f=r[d],g=r[d+1];f<o&&(o=f),g<l&&(l=g),f>u&&(u=f),g>h&&(h=g)}c=Math.max(u-o,h-l),c=c!==0?32767/c:0}return ga(s,a,t,o,l,c,0),a}function pp(r,e,t,n,i){let s;if(i===H_(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=lh(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=lh(a/n|0,r[a],r[a+1],s);return s&&br(s,s.next)&&(va(s),s=s.next),s}function Fs(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(br(t,t.next)||Ot(t.prev,t,t.next)===0)){if(va(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ga(r,e,t,n,i,s,a){if(!r)return;!a&&s&&O_(r,n,i,s);let o=r;for(;r.prev!==r.next;){const l=r.prev,c=r.next;if(s?R_(r,n,i,s):C_(r)){e.push(l.i,r.i,c.i),va(r),r=c.next,o=c.next;continue}if(r=c,r===o){a?a===1?(r=I_(Fs(r),e),ga(r,e,t,n,i,s,2)):a===2&&P_(r,e,t,n,i,s):ga(Fs(r),e,t,n,i,s,1);break}}}function C_(r){const e=r.prev,t=r,n=r.next;if(Ot(e,t,n)>=0)return!1;const i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(i,s,a),h=Math.min(o,l,c),d=Math.max(i,s,a),f=Math.max(o,l,c);let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=d&&g.y>=h&&g.y<=f&&$r(i,o,s,l,a,c,g.x,g.y)&&Ot(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function R_(r,e,t,n){const i=r.prev,s=r,a=r.next;if(Ot(i,s,a)>=0)return!1;const o=i.x,l=s.x,c=a.x,u=i.y,h=s.y,d=a.y,f=Math.min(o,l,c),g=Math.min(u,h,d),x=Math.max(o,l,c),m=Math.max(u,h,d),p=pu(f,g,e,t,n),_=pu(x,m,e,t,n);let v=r.prevZ,y=r.nextZ;for(;v&&v.z>=p&&y&&y.z<=_;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==i&&v!==a&&$r(o,u,l,h,c,d,v.x,v.y)&&Ot(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=f&&y.x<=x&&y.y>=g&&y.y<=m&&y!==i&&y!==a&&$r(o,u,l,h,c,d,y.x,y.y)&&Ot(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==i&&v!==a&&$r(o,u,l,h,c,d,v.x,v.y)&&Ot(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=_;){if(y.x>=f&&y.x<=x&&y.y>=g&&y.y<=m&&y!==i&&y!==a&&$r(o,u,l,h,c,d,y.x,y.y)&&Ot(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function I_(r,e){let t=r;do{const n=t.prev,i=t.next.next;!br(n,i)&&gp(n,t,t.next,i)&&_a(n,i)&&_a(i,n)&&(e.push(n.i,t.i,i.i),va(t),va(t.next),t=r=i),t=t.next}while(t!==r);return Fs(t)}function P_(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&z_(a,o)){let l=_p(a,o);a=Fs(a,a.next),l=Fs(l,l.next),ga(a,e,t,n,i,s,0),ga(l,e,t,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function L_(r,e,t,n){const i=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*n,l=s<a-1?e[s+1]*n:r.length,c=pp(r,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(B_(c))}i.sort(D_);for(let s=0;s<i.length;s++)t=U_(i[s],t);return t}function D_(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function U_(r,e){const t=N_(r,e);if(!t)return e;const n=_p(t,r);return Fs(n,n.next),Fs(t,t.next)}function N_(r,e){let t=e;const n=r.x,i=r.y;let s=-1/0,a;if(br(r,t))return t;do{if(br(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const h=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>s&&(s=h,a=t.x<t.next.x?t:t.next,h===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&mp(i<c?n:s,i,l,c,i<c?s:n,i,t.x,t.y)){const h=Math.abs(i-t.y)/(n-t.x);_a(t,r)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&F_(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function F_(r,e){return Ot(r.prev,r,e.prev)<0&&Ot(e.next,r,r.next)<0}function O_(r,e,t,n){let i=r;do i.z===0&&(i.z=pu(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,k_(i)}function k_(r){let e,t=1;do{let n=r,i;r=null;let s=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=a}s.nextZ=null,t*=2}while(e>1);return r}function pu(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function B_(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function mp(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function $r(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&mp(r,e,t,n,i,s,a,o)}function z_(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!V_(r,e)&&(_a(r,e)&&_a(e,r)&&G_(r,e)&&(Ot(r.prev,r,e.prev)||Ot(r,e.prev,e))||br(r,e)&&Ot(r.prev,r,r.next)>0&&Ot(e.prev,e,e.next)>0)}function Ot(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function br(r,e){return r.x===e.x&&r.y===e.y}function gp(r,e,t,n){const i=uo(Ot(r,e,t)),s=uo(Ot(r,e,n)),a=uo(Ot(t,n,r)),o=uo(Ot(t,n,e));return!!(i!==s&&a!==o||i===0&&co(r,t,e)||s===0&&co(r,n,e)||a===0&&co(t,r,n)||o===0&&co(t,e,n))}function co(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function uo(r){return r>0?1:r<0?-1:0}function V_(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&gp(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function _a(r,e){return Ot(r.prev,r,r.next)<0?Ot(r,e,r.next)>=0&&Ot(r,r.prev,e)>=0:Ot(r,e,r.prev)<0||Ot(r,r.next,e)<0}function G_(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function _p(r,e){const t=mu(r.i,r.x,r.y),n=mu(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function lh(r,e,t,n){const i=mu(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function va(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function mu(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function H_(r,e,t,n){let i=0;for(let s=e,a=t-n;s<t;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}class W_{static triangulate(e,t,n=2){return A_(e,t,n)}}class si{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return si.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];ch(e),uh(n,e);let a=e.length;t.forEach(ch);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,uh(n,t[l]);const o=W_.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function ch(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function uh(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class Zl extends ct{constructor(e=new Ps([new fe(.5,.5),new fe(-.5,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new Ve(i,3)),this.setAttribute("uv",new Ve(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:X_;let v,y=!1,w,M,C,b;if(p){v=p.getSpacedPoints(u),y=!0,d=!1;const se=p.isCatmullRomCurve3?p.closed:!1;w=p.computeFrenetFrames(u,se),M=new R,C=new R,b=new R}d||(m=0,f=0,g=0,x=0);const T=o.extractPoints(c);let L=T.shape;const I=T.holes;if(!si.isClockWise(L)){L=L.reverse();for(let se=0,ee=I.length;se<ee;se++){const re=I[se];si.isClockWise(re)&&(I[se]=re.reverse())}}function J(se){const re=10000000000000001e-36;let ge=se[0];for(let _e=1;_e<=se.length;_e++){const Qe=_e%se.length,N=se[Qe],tt=N.x-ge.x,Ge=N.y-ge.y,et=tt*tt+Ge*Ge,ve=Math.max(Math.abs(N.x),Math.abs(N.y),Math.abs(ge.x),Math.abs(ge.y)),wt=re*ve*ve;if(et<=wt){se.splice(Qe,1),_e--;continue}ge=N}}J(L),I.forEach(J);const G=I.length,U=L;for(let se=0;se<G;se++){const ee=I[se];L=L.concat(ee)}function O(se,ee,re){return ee||qe("ExtrudeGeometry: vec does not exist"),se.clone().addScaledVector(ee,re)}const V=L.length;function ce(se,ee,re){let ge,_e,Qe;const N=se.x-ee.x,tt=se.y-ee.y,Ge=re.x-se.x,et=re.y-se.y,ve=N*N+tt*tt,wt=N*et-tt*Ge;if(Math.abs(wt)>Number.EPSILON){const A=Math.sqrt(ve),S=Math.sqrt(Ge*Ge+et*et),W=ee.x-tt/A,le=ee.y+N/A,he=re.x-et/S,xe=re.y+Ge/S,be=((he-W)*et-(xe-le)*Ge)/(N*et-tt*Ge);ge=W+N*be-se.x,_e=le+tt*be-se.y;const ie=ge*ge+_e*_e;if(ie<=2)return new fe(ge,_e);Qe=Math.sqrt(ie/2)}else{let A=!1;N>Number.EPSILON?Ge>Number.EPSILON&&(A=!0):N<-Number.EPSILON?Ge<-Number.EPSILON&&(A=!0):Math.sign(tt)===Math.sign(et)&&(A=!0),A?(ge=-tt,_e=N,Qe=Math.sqrt(ve)):(ge=N,_e=tt,Qe=Math.sqrt(ve/2))}return new fe(ge/Qe,_e/Qe)}const me=[];for(let se=0,ee=U.length,re=ee-1,ge=se+1;se<ee;se++,re++,ge++)re===ee&&(re=0),ge===ee&&(ge=0),me[se]=ce(U[se],U[re],U[ge]);const we=[];let Ie,ke=me.concat();for(let se=0,ee=G;se<ee;se++){const re=I[se];Ie=[];for(let ge=0,_e=re.length,Qe=_e-1,N=ge+1;ge<_e;ge++,Qe++,N++)Qe===_e&&(Qe=0),N===_e&&(N=0),Ie[ge]=ce(re[ge],re[Qe],re[N]);we.push(Ie),ke=ke.concat(Ie)}let st;if(m===0)st=si.triangulateShape(U,I);else{const se=[],ee=[];for(let re=0;re<m;re++){const ge=re/m,_e=f*Math.cos(ge*Math.PI/2),Qe=g*Math.sin(ge*Math.PI/2)+x;for(let N=0,tt=U.length;N<tt;N++){const Ge=O(U[N],me[N],Qe);Ae(Ge.x,Ge.y,-_e),ge===0&&se.push(Ge)}for(let N=0,tt=G;N<tt;N++){const Ge=I[N];Ie=we[N];const et=[];for(let ve=0,wt=Ge.length;ve<wt;ve++){const A=O(Ge[ve],Ie[ve],Qe);Ae(A.x,A.y,-_e),ge===0&&et.push(A)}ge===0&&ee.push(et)}}st=si.triangulateShape(se,ee)}const oe=st.length,$=g+x;for(let se=0;se<V;se++){const ee=d?O(L[se],ke[se],$):L[se];y?(C.copy(w.normals[0]).multiplyScalar(ee.x),M.copy(w.binormals[0]).multiplyScalar(ee.y),b.copy(v[0]).add(C).add(M),Ae(b.x,b.y,b.z)):Ae(ee.x,ee.y,0)}for(let se=1;se<=u;se++)for(let ee=0;ee<V;ee++){const re=d?O(L[ee],ke[ee],$):L[ee];y?(C.copy(w.normals[se]).multiplyScalar(re.x),M.copy(w.binormals[se]).multiplyScalar(re.y),b.copy(v[se]).add(C).add(M),Ae(b.x,b.y,b.z)):Ae(re.x,re.y,h/u*se)}for(let se=m-1;se>=0;se--){const ee=se/m,re=f*Math.cos(ee*Math.PI/2),ge=g*Math.sin(ee*Math.PI/2)+x;for(let _e=0,Qe=U.length;_e<Qe;_e++){const N=O(U[_e],me[_e],ge);Ae(N.x,N.y,h+re)}for(let _e=0,Qe=I.length;_e<Qe;_e++){const N=I[_e];Ie=we[_e];for(let tt=0,Ge=N.length;tt<Ge;tt++){const et=O(N[tt],Ie[tt],ge);y?Ae(et.x,et.y+v[u-1].y,v[u-1].x+re):Ae(et.x,et.y,h+re)}}}F(),K();function F(){const se=i.length/3;if(d){let ee=0,re=V*ee;for(let ge=0;ge<oe;ge++){const _e=st[ge];$e(_e[2]+re,_e[1]+re,_e[0]+re)}ee=u+m*2,re=V*ee;for(let ge=0;ge<oe;ge++){const _e=st[ge];$e(_e[0]+re,_e[1]+re,_e[2]+re)}}else{for(let ee=0;ee<oe;ee++){const re=st[ee];$e(re[2],re[1],re[0])}for(let ee=0;ee<oe;ee++){const re=st[ee];$e(re[0]+V*u,re[1]+V*u,re[2]+V*u)}}n.addGroup(se,i.length/3-se,0)}function K(){const se=i.length/3;let ee=0;pe(U,ee),ee+=U.length;for(let re=0,ge=I.length;re<ge;re++){const _e=I[re];pe(_e,ee),ee+=_e.length}n.addGroup(se,i.length/3-se,1)}function pe(se,ee){let re=se.length;for(;--re>=0;){const ge=re;let _e=re-1;_e<0&&(_e=se.length-1);for(let Qe=0,N=u+m*2;Qe<N;Qe++){const tt=V*Qe,Ge=V*(Qe+1),et=ee+ge+tt,ve=ee+_e+tt,wt=ee+_e+Ge,A=ee+ge+Ge;te(et,ve,wt,A)}}}function Ae(se,ee,re){l.push(se),l.push(ee),l.push(re)}function $e(se,ee,re){ue(se),ue(ee),ue(re);const ge=i.length/3,_e=_.generateTopUV(n,i,ge-3,ge-2,ge-1);ne(_e[0]),ne(_e[1]),ne(_e[2])}function te(se,ee,re,ge){ue(se),ue(ee),ue(ge),ue(ee),ue(re),ue(ge);const _e=i.length/3,Qe=_.generateSideWallUV(n,i,_e-6,_e-3,_e-2,_e-1);ne(Qe[0]),ne(Qe[1]),ne(Qe[3]),ne(Qe[1]),ne(Qe[2]),ne(Qe[3])}function ue(se){i.push(l[se*3+0]),i.push(l[se*3+1]),i.push(l[se*3+2])}function ne(se){s.push(se.x),s.push(se.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return $_(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];n.push(o)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new bl[i.type]().fromJSON(i)),new Zl(n,e.options)}}const X_={generateTopUV:function(r,e,t,n,i){const s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],u=e[i*3+1];return[new fe(s,a),new fe(o,l),new fe(c,u)]},generateSideWallUV:function(r,e,t,n,i,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],d=e[i*3],f=e[i*3+1],g=e[i*3+2],x=e[s*3],m=e[s*3+1],p=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new fe(a,1-l),new fe(c,1-h),new fe(d,1-g),new fe(x,1-p)]:[new fe(o,1-l),new fe(u,1-h),new fe(f,1-g),new fe(m,1-p)]}};function $_(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Kl extends us{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Kl(e.radius,e.detail)}}class Jl extends ct{constructor(e=[new fe(0,-.5),new fe(.5,0),new fe(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=it(i,0,Math.PI*2);const s=[],a=[],o=[],l=[],c=[],u=1/t,h=new R,d=new fe,f=new R,g=new R,x=new R;let m=0,p=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:m=e[_+1].x-e[_].x,p=e[_+1].y-e[_].y,f.x=p*1,f.y=-m,f.z=p*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:m=e[_+1].x-e[_].x,p=e[_+1].y-e[_].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(g)}for(let _=0;_<=t;_++){const v=n+_*u*i,y=Math.sin(v),w=Math.cos(v);for(let M=0;M<=e.length-1;M++){h.x=e[M].x*y,h.y=e[M].y,h.z=e[M].x*w,a.push(h.x,h.y,h.z),d.x=_/t,d.y=M/(e.length-1),o.push(d.x,d.y);const C=l[3*M+0]*y,b=l[3*M+1],T=l[3*M+0]*w;c.push(C,b,T)}}for(let _=0;_<t;_++)for(let v=0;v<e.length-1;v++){const y=v+_*e.length,w=y,M=y+e.length,C=y+e.length+1,b=y+1;s.push(w,M,b),s.push(C,b,M)}this.setIndex(s),this.setAttribute("position",new Ve(a,3)),this.setAttribute("uv",new Ve(o,2)),this.setAttribute("normal",new Ve(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jl(e.points,e.segments,e.phiStart,e.phiLength)}}class Ar extends us{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ar(e.radius,e.detail)}}class Cr extends ct{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,h=e/o,d=t/l,f=[],g=[],x=[],m=[];for(let p=0;p<u;p++){const _=p*d-a;for(let v=0;v<c;v++){const y=v*h-s;g.push(y,-_,0),x.push(0,0,1),m.push(v/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let _=0;_<o;_++){const v=_+c*p,y=_+c*(p+1),w=_+1+c*(p+1),M=_+1+c*p;f.push(v,y,M),f.push(y,w,M)}this.setIndex(f),this.setAttribute("position",new Ve(g,3)),this.setAttribute("normal",new Ve(x,3)),this.setAttribute("uv",new Ve(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cr(e.width,e.height,e.widthSegments,e.heightSegments)}}class jl extends ct{constructor(e=.5,t=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],u=[];let h=e;const d=(t-e)/i,f=new R,g=new fe;for(let x=0;x<=i;x++){for(let m=0;m<=n;m++){const p=s+m/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}h+=d}for(let x=0;x<i;x++){const m=x*(n+1);for(let p=0;p<n;p++){const _=p+m,v=_,y=_+n+1,w=_+n+2,M=_+1;o.push(v,y,M),o.push(y,w,M)}}this.setIndex(o),this.setAttribute("position",new Ve(l,3)),this.setAttribute("normal",new Ve(c,3)),this.setAttribute("uv",new Ve(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ql extends ct{constructor(e=new Ps([new fe(0,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Ve(i,3)),this.setAttribute("normal",new Ve(s,3)),this.setAttribute("uv",new Ve(a,2));function c(u){const h=i.length/3,d=u.extractPoints(t);let f=d.shape;const g=d.holes;si.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const _=g[m];si.isClockWise(_)===!0&&(g[m]=_.reverse())}const x=si.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const _=g[m];f=f.concat(_)}for(let m=0,p=f.length;m<p;m++){const _=f[m];i.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let m=0,p=x.length;m<p;m++){const _=x[m],v=_[0]+h,y=_[1]+h,w=_[2]+h;n.push(v,y,w),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return q_(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const a=t[e.shapes[i]];n.push(a)}return new Ql(n,e.curveSegments)}}function q_(r,e){if(e.shapes=[],Array.isArray(r))for(let t=0,n=r.length;t<n;t++){const i=r[t];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e}class ii extends ct{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new R,d=new R,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){const _=[],v=p/n;let y=0;p===0&&a===0?y=.5/t:p===n&&l===Math.PI&&(y=-.5/t);for(let w=0;w<=t;w++){const M=w/t;h.x=-e*Math.cos(i+M*s)*Math.sin(a+v*o),h.y=e*Math.cos(a+v*o),h.z=e*Math.sin(i+M*s)*Math.sin(a+v*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),m.push(M+y,1-v),_.push(c++)}u.push(_)}for(let p=0;p<n;p++)for(let _=0;_<t;_++){const v=u[p][_+1],y=u[p][_],w=u[p+1][_],M=u[p+1][_+1];(p!==0||a>0)&&f.push(v,y,M),(p!==n-1||l<Math.PI)&&f.push(y,w,M)}this.setIndex(f),this.setAttribute("position",new Ve(g,3)),this.setAttribute("normal",new Ve(x,3)),this.setAttribute("uv",new Ve(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ii(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Aa extends us{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Aa(e.radius,e.detail)}}class Os extends ct{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);const l=[],c=[],u=[],h=[],d=new R,f=new R,g=new R;for(let x=0;x<=n;x++){const m=a+x/n*o;for(let p=0;p<=i;p++){const _=p/i*s;f.x=(e+t*Math.cos(m))*Math.cos(_),f.y=(e+t*Math.cos(m))*Math.sin(_),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(_),d.y=e*Math.sin(_),g.subVectors(f,d).normalize(),u.push(g.x,g.y,g.z),h.push(p/i),h.push(x/n)}}for(let x=1;x<=n;x++)for(let m=1;m<=i;m++){const p=(i+1)*x+m-1,_=(i+1)*(x-1)+m-1,v=(i+1)*(x-1)+m,y=(i+1)*x+m;l.push(p,_,y),l.push(_,v,y)}this.setIndex(l),this.setAttribute("position",new Ve(c,3)),this.setAttribute("normal",new Ve(u,3)),this.setAttribute("uv",new Ve(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Os(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ec extends ct{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);const o=[],l=[],c=[],u=[],h=new R,d=new R,f=new R,g=new R,x=new R,m=new R,p=new R;for(let v=0;v<=n;++v){const y=v/n*s*Math.PI*2;_(y,s,a,e,f),_(y+.01,s,a,e,g),m.subVectors(g,f),p.addVectors(g,f),x.crossVectors(m,p),p.crossVectors(x,m),x.normalize(),p.normalize();for(let w=0;w<=i;++w){const M=w/i*Math.PI*2,C=-t*Math.cos(M),b=t*Math.sin(M);h.x=f.x+(C*p.x+b*x.x),h.y=f.y+(C*p.y+b*x.y),h.z=f.z+(C*p.z+b*x.z),l.push(h.x,h.y,h.z),d.subVectors(h,f).normalize(),c.push(d.x,d.y,d.z),u.push(v/n),u.push(w/i)}}for(let v=1;v<=n;v++)for(let y=1;y<=i;y++){const w=(i+1)*(v-1)+(y-1),M=(i+1)*v+(y-1),C=(i+1)*v+y,b=(i+1)*(v-1)+y;o.push(w,M,b),o.push(M,C,b)}this.setIndex(o),this.setAttribute("position",new Ve(l,3)),this.setAttribute("normal",new Ve(c,3)),this.setAttribute("uv",new Ve(u,2));function _(v,y,w,M,C){const b=Math.cos(v),T=Math.sin(v),L=w/y*v,I=Math.cos(L);C.x=M*(2+I)*.5*b,C.y=M*(2+I)*T*.5,C.z=M*Math.sin(L)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ec(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class tc extends ct{constructor(e=new ju(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new R,l=new R,c=new fe;let u=new R;const h=[],d=[],f=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new Ve(h,3)),this.setAttribute("normal",new Ve(d,3)),this.setAttribute("uv",new Ve(f,2));function x(){for(let v=0;v<t;v++)m(v);m(s===!1?t:0),_(),p()}function m(v){u=e.getPointAt(v/t,u);const y=a.normals[v],w=a.binormals[v];for(let M=0;M<=i;M++){const C=M/i*Math.PI*2,b=Math.sin(C),T=-Math.cos(C);l.x=T*y.x+b*w.x,l.y=T*y.y+b*w.y,l.z=T*y.z+b*w.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,h.push(o.x,o.y,o.z)}}function p(){for(let v=1;v<=t;v++)for(let y=1;y<=i;y++){const w=(i+1)*(v-1)+(y-1),M=(i+1)*v+(y-1),C=(i+1)*v+y,b=(i+1)*(v-1)+y;g.push(w,M,b),g.push(M,C,b)}}function _(){for(let v=0;v<=t;v++)for(let y=0;y<=i;y++)c.x=v/t,c.y=y/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new tc(new bl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class ed extends ct{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new R,s=new R;if(e.index!==null){const a=e.attributes.position,o=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const h=l[c],d=h.start,f=h.count;for(let g=d,x=d+f;g<x;g+=3)for(let m=0;m<3;m++){const p=o.getX(g+m),_=o.getX(g+(m+1)%3);i.fromBufferAttribute(a,p),s.fromBufferAttribute(a,_),dh(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{const a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){const u=3*o+c,h=3*o+(c+1)%3;i.fromBufferAttribute(a,u),s.fromBufferAttribute(a,h),dh(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Ve(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function dh(r,e,t){const n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var hh=Object.freeze({__proto__:null,BoxGeometry:cs,CapsuleGeometry:Xl,CircleGeometry:$l,ConeGeometry:Tr,CylinderGeometry:Ta,DodecahedronGeometry:ql,EdgesGeometry:lp,ExtrudeGeometry:Zl,IcosahedronGeometry:Kl,LatheGeometry:Jl,OctahedronGeometry:Ar,PlaneGeometry:Cr,PolyhedronGeometry:us,RingGeometry:jl,ShapeGeometry:Ql,SphereGeometry:ii,TetrahedronGeometry:Aa,TorusGeometry:Os,TorusKnotGeometry:ec,TubeGeometry:tc,WireframeGeometry:ed});class vp extends sn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ne(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}function Mr(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];if(fh(i))i.isRenderTargetTexture?(Ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(fh(i[0])){const s=[];for(let a=0,o=i.length;a<o;a++)s[a]=i[a].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function _n(r){const e={};for(let t=0;t<r.length;t++){const n=Mr(r[t]);for(const i in n)e[i]=n[i]}return e}function fh(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function Y_(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function xp(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:vt.workingColorSpace}const nc={clone:Mr,merge:_n};var Z_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,K_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wn extends sn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Z_,this.fragmentShader=K_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Mr(e.uniforms),this.uniformsGroups=Y_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class td extends Wn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class nd extends sn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ki,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class yp extends nd{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new fe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return it(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ne(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ne(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ne(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class bp extends sn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ne(16777215),this.specular=new Ne(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ki,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=Sa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Mp extends sn{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Ne(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ki,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class Sp extends sn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ki,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class wp extends sn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ki,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=Sa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class id extends sn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class sd extends sn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ep extends sn{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Ne(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ki,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Tp extends Sn{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function Cs(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Ap(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function gu(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function rd(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}function J_(r,e,t,n,i=30){const s=r.clone();s.name=e;const a=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],u=c.getValueSize(),h=[],d=[];for(let f=0;f<c.times.length;++f){const g=c.times[f]*i;if(!(g<t||g>=n)){h.push(c.times[f]);for(let x=0;x<u;++x)d.push(c.values[f*u+x])}}h.length!==0&&(c.times=Cs(h,c.times.constructor),c.values=Cs(d,c.values.constructor),a.push(c))}s.tracks=a;let o=1/0;for(let l=0;l<s.tracks.length;++l)o>s.tracks[l].times[0]&&(o=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*o);return s.resetDuration(),s}function j_(r,e=0,t=r,n=30){n<=0&&(n=30);const i=t.tracks.length,s=e/n;for(let a=0;a<i;++a){const o=t.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;const c=r.tracks.find(function(p){return p.name===o.name&&p.ValueTypeName===l});if(c===void 0)continue;let u=0;const h=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=h/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const g=o.times.length-1;let x;if(s<=o.times[0]){const p=u,_=h-u;x=o.values.slice(p,_)}else if(s>=o.times[g]){const p=g*h+u,_=p+h-u;x=o.values.slice(p,_)}else{const p=o.createInterpolant(),_=u,v=h-u;p.evaluate(s),x=p.resultBuffer.slice(_,v)}l==="quaternion"&&new mn().fromArray(x).normalize().conjugate().toArray(x);const m=c.times.length;for(let p=0;p<m;++p){const _=p*f+d;if(l==="quaternion")mn.multiplyQuaternionsFlat(c.values,_,x,0,c.values,_);else{const v=f-d*2;for(let y=0;y<v;++y)c.values[_+y]-=x[y]}}}return r.blendMode=ku,r}class Q_{static convertArray(e,t){return Cs(e,t)}static isTypedArray(e){return qf(e)}static getKeyframeOrder(e){return Ap(e)}static sortedArray(e,t,n){return gu(e,t,n)}static flattenJSON(e,t,n,i){rd(e,t,n,i)}static subclip(e,t,n,i,s=30){return J_(e,t,n,i,s)}static makeClipAdditive(e,t=0,n=e,i=30){return j_(e,t,n,i)}}class Rr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Cp extends Rr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ts,endingEnd:Ts}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case As:s=e,o=2*t-n;break;case ua:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case As:a=e,l=2*n-t;break;case ua:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,_=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,v=(-1-f)*m+(1.5+f)*x+.5*g,y=f*m-f*x;for(let w=0;w!==o;++w)s[w]=p*a[u+w]+_*a[c+w]+v*a[l+w]+y*a[h+w];return s}}class ad extends Rr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==o;++d)s[d]=a[c+d]*h+a[l+d]*u;return s}}class Rp extends Rr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Ip extends Rr{interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.settings||this.DefaultSettings_,h=u.inTangents,d=u.outTangents;if(!h||!d){const x=(n-t)/(i-t),m=1-x;for(let p=0;p!==o;++p)s[p]=a[c+p]*m+a[l+p]*x;return s}const f=o*2,g=e-1;for(let x=0;x!==o;++x){const m=a[c+x],p=a[l+x],_=g*f+x*2,v=d[_],y=d[_+1],w=e*f+x*2,M=h[w],C=h[w+1];let b=(n-t)/(i-t),T,L,I,B,J;for(let G=0;G<8;G++){T=b*b,L=T*b,I=1-b,B=I*I,J=B*I;const O=J*t+3*B*b*v+3*I*T*M+L*i-n;if(Math.abs(O)<1e-10)break;const V=3*B*(v-t)+6*I*b*(M-v)+3*T*(i-M);if(Math.abs(V)<1e-10)break;b=b-O/V,b=Math.max(0,Math.min(1,b))}s[x]=J*m+3*B*b*y+3*I*T*C+L*p}return s}}class Kn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Cs(t,this.TimeBufferType),this.values=Cs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Cs(e.times,Array),values:Cs(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Rp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ad(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Cp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new Ip(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case ca:t=this.InterpolantFactoryMethodDiscrete;break;case gl:t=this.InterpolantFactoryMethodLinear;break;case Ao:t=this.InterpolantFactoryMethodSmooth;break;case uu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ce("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ca;case this.InterpolantFactoryMethodLinear:return gl;case this.InterpolantFactoryMethodSmooth:return Ao;case this.InterpolantFactoryMethodBezier:return uu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(qe("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(qe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){qe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){qe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&qf(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){qe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ao,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(i)l=!0;else{const h=o*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){const x=t[h+g];if(x!==t[d+g]||x!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Kn.prototype.ValueTypeName="";Kn.prototype.TimeBufferType=Float32Array;Kn.prototype.ValueBufferType=Float32Array;Kn.prototype.DefaultInterpolation=gl;class Bs extends Kn{constructor(e,t,n){super(e,t,n)}}Bs.prototype.ValueTypeName="bool";Bs.prototype.ValueBufferType=Array;Bs.prototype.DefaultInterpolation=ca;Bs.prototype.InterpolantFactoryMethodLinear=void 0;Bs.prototype.InterpolantFactoryMethodSmooth=void 0;class od extends Kn{constructor(e,t,n,i){super(e,t,n,i)}}od.prototype.ValueTypeName="color";class xa extends Kn{constructor(e,t,n,i){super(e,t,n,i)}}xa.prototype.ValueTypeName="number";class Pp extends Rr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let u=c+o;c!==u;c+=4)mn.slerpFlat(s,0,a,c-o,a,c,l);return s}}class Ca extends Kn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Pp(this.times,this.values,this.getValueSize(),e)}}Ca.prototype.ValueTypeName="quaternion";Ca.prototype.InterpolantFactoryMethodSmooth=void 0;class zs extends Kn{constructor(e,t,n){super(e,t,n)}}zs.prototype.ValueTypeName="string";zs.prototype.ValueBufferType=Array;zs.prototype.DefaultInterpolation=ca;zs.prototype.InterpolantFactoryMethodLinear=void 0;zs.prototype.InterpolantFactoryMethodSmooth=void 0;class ya extends Kn{constructor(e,t,n,i){super(e,t,n,i)}}ya.prototype.ValueTypeName="vector";class ba{constructor(e="",t=-1,n=[],i=Dl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Gn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(t0(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(Kn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const u=Ap(l);l=gu(l,1,u),c=gu(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new xa(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],u=c.name.match(s);if(u&&u.length>1){const h=u[1];let d=i[h];d||(i[h]=d=[]),d.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(Ce("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return qe("AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,g,x){if(f.length!==0){const m=[],p=[];rd(f,m,p,g),m.length!==0&&x.push(new h(d,m,p))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let x=0;x<d[g].morphTargets.length;x++)f[d[g].morphTargets[x]]=-1;for(const x in f){const m=[],p=[];for(let _=0;_!==d[g].morphTargets.length;++_){const v=d[g];m.push(v.time),p.push(v.morphTarget===x?1:0)}i.push(new xa(".morphTargetInfluence["+x+"]",m,p))}l=f.length*a}else{const f=".bones["+t[h].name+"]";n(ya,f+".position",d,"pos",i),n(Ca,f+".quaternion",d,"rot",i),n(ya,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function e0(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return xa;case"vector":case"vector2":case"vector3":case"vector4":return ya;case"color":return od;case"quaternion":return Ca;case"bool":case"boolean":return Bs;case"string":return zs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function t0(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=e0(r.type);if(r.times===void 0){const t=[],n=[];rd(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const yi={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(ph(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!ph(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function ph(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class ld{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&i.onStart!==void 0&&i.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],g=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Lp=new ld;class Pn{constructor(e){this.manager=e!==void 0?e:Lp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Pn.DEFAULT_MATERIAL_NAME="__DEFAULT";const Li={};class n0 extends Error{constructor(e,t){super(e),this.response=t}}class Bi extends Pn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=yi.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(Li[e]!==void 0){Li[e].push({onLoad:t,onProgress:n,onError:i});return}Li[e]=[],Li[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ce("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Li[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let x=0;const m=new ReadableStream({start(p){_();function _(){h.read().then(({done:v,value:y})=>{if(v)p.close();else{x+=y.byteLength;const w=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let M=0,C=u.length;M<C;M++){const b=u[M];b.onProgress&&b.onProgress(w)}p.enqueue(y),_()}},v=>{p.error(v)})}}});return new Response(m)}else throw new n0(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{yi.add(`file:${e}`,c);const u=Li[e];delete Li[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=Li[e];if(u===void 0)throw this.manager.itemError(e),c;delete Li[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class i0 extends Pn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new Bi(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):qe(l),s.manager.itemError(e)}},n,i)}parse(e){const t=[];for(let n=0;n<e.length;n++){const i=ba.parse(e[n]);t.push(i)}return t}}class s0 extends Pn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=[],o=new Wl,l=new Bi(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(s.withCredentials);let c=0;function u(h){l.load(e[h],function(d){const f=s.parse(d,!0);a[h]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(o.minFilter=Ft),o.image=a,o.format=f.format,o.needsUpdate=!0,t&&t(o))},n,i)}if(Array.isArray(e))for(let h=0,d=e.length;h<d;++h)u(h);else l.load(e,function(h){const d=s.parse(h,!0);if(d.isCubemap){const f=d.mipmaps.length/d.mipmapCount;for(let g=0;g<f;g++){a[g]={mipmaps:[]};for(let x=0;x<d.mipmapCount;x++)a[g].mipmaps.push(d.mipmaps[g*d.mipmapCount+x]),a[g].format=d.format,a[g].width=d.width,a[g].height=d.height}o.image=a}else o.image.width=d.width,o.image.height=d.height,o.mipmaps=d.mipmaps;d.mipmapCount===1&&(o.minFilter=Ft),o.format=d.format,o.needsUpdate=!0,t&&t(o)},n,i);return o}}const sr=new WeakMap;class Ma extends Pn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=yi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=sr.get(a);h===void 0&&(h=[],sr.set(a,h)),h.push({onLoad:t,onError:i})}return a}const o=pa("img");function l(){u(),t&&t(this);const h=sr.get(this)||[];for(let d=0;d<h.length;d++){const f=h[d];f.onLoad&&f.onLoad(this)}sr.delete(this),s.manager.itemEnd(e)}function c(h){u(),i&&i(h),yi.remove(`image:${e}`);const d=sr.get(this)||[];for(let f=0;f<d.length;f++){const g=d[f];g.onError&&g.onError(h)}sr.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),yi.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class r0 extends Pn{constructor(e){super(e)}load(e,t,n,i){const s=new Ea;s.colorSpace=Tn;const a=new Ma(this.manager);a.setCrossOrigin(this.crossOrigin),a.setPath(this.path);let o=0;function l(c){a.load(e[c],function(u){s.images[c]=u,o++,o===6&&(s.needsUpdate=!0,t&&t(s))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return s}}class a0 extends Pn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new ai,o=new Bi(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(e,function(l){let c;try{c=s.parse(l)}catch(u){i!==void 0?i(u):qe(u);return}c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:In,a.wrapT=c.wrapT!==void 0?c.wrapT:In,a.magFilter=c.magFilter!==void 0?c.magFilter:Ft,a.minFilter=c.minFilter!==void 0?c.minFilter:Ft,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(a.colorSpace=c.colorSpace),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=xi),c.mipmapCount===1&&(a.minFilter=Ft),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,t&&t(a,c)},n,i),a}}class o0 extends Pn{constructor(e){super(e)}load(e,t,n,i){const s=new kt,a=new Ma(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class ds extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Dp extends ds{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Bc=new rt,mh=new R,gh=new R;class cd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new fe(512,512),this.mapType=An,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Er,this._frameExtents=new fe(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;mh.setFromMatrixPosition(e.matrixWorld),t.position.copy(mh),gh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(gh),t.updateMatrixWorld(),Bc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bc,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Us||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Bc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ho=new R,fo=new mn,fi=new R;class ic extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ho,fo,fi),fi.x===1&&fi.y===1&&fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ho,fo,fi.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(ho,fo,fi),fi.x===1&&fi.y===1&&fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ho,fo,fi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ji=new R,_h=new fe,vh=new fe;class tn extends ic{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=xr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Is*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xr*2*Math.atan(Math.tan(Is*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z)}getViewSize(e,t){return this.getViewBounds(e,_h,vh),t.subVectors(vh,_h)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Is*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class l0 extends cd{constructor(){super(new tn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=xr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Up extends ds{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new l0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class c0 extends cd{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0}}class Np extends ds{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new c0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Ra extends ic{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class u0 extends cd{constructor(){super(new Ra(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fp extends ds{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new u0}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Op extends ds{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class kp extends ds{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class ud{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new R)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,s=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.282095),t.addScaledVector(a[1],.488603*i),t.addScaledVector(a[2],.488603*s),t.addScaledVector(a[3],.488603*n),t.addScaledVector(a[4],1.092548*(n*i)),t.addScaledVector(a[5],1.092548*(i*s)),t.addScaledVector(a[6],.315392*(3*s*s-1)),t.addScaledVector(a[7],1.092548*(n*s)),t.addScaledVector(a[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,s=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.886227),t.addScaledVector(a[1],2*.511664*i),t.addScaledVector(a[2],2*.511664*s),t.addScaledVector(a[3],2*.511664*n),t.addScaledVector(a[4],2*.429043*n*i),t.addScaledVector(a[5],2*.429043*i*s),t.addScaledVector(a[6],.743125*s*s-.247708),t.addScaledVector(a[7],2*.429043*n*s),t.addScaledVector(a[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,s=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*s,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*s,t[6]=.315392*(3*s*s-1),t[7]=1.092548*n*s,t[8]=.546274*(n*n-i*i)}}class Bp extends ds{constructor(e=new ud,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class sc extends Pn{constructor(e){super(e),this.textures={}}load(e,t,n,i){const s=this,a=new Bi(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):qe(l),s.manager.itemError(e)}},n,i)}parse(e){const t=this.textures;function n(s){return t[s]===void 0&&Ce("MaterialLoader: Undefined texture",s),t[s]}const i=this.createMaterialFromType(e.type);if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=e.sheen),e.sheenColor!==void 0&&(i.sheenColor=new Ne().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(i.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.specularIntensity!==void 0&&(i.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(i.dispersion=e.dispersion),e.iridescence!==void 0&&(i.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(i.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.attenuationDistance!==void 0&&(i.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(i.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.shadowSide!==void 0&&(i.shadowSide=e.shadowSide),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(i.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(i.depthFunc=e.depthFunc),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(i.blendSrc=e.blendSrc),e.blendDst!==void 0&&(i.blendDst=e.blendDst),e.blendEquation!==void 0&&(i.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(i.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(i.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==void 0&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(i.dithering=e.dithering),e.alphaToCoverage!==void 0&&(i.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(i.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(i.allowOverride=e.allowOverride),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const s in e.uniforms){const a=e.uniforms[s];switch(i.uniforms[s]={},a.type){case"t":i.uniforms[s].value=n(a.value);break;case"c":i.uniforms[s].value=new Ne().setHex(a.value);break;case"v2":i.uniforms[s].value=new fe().fromArray(a.value);break;case"v3":i.uniforms[s].value=new R().fromArray(a.value);break;case"v4":i.uniforms[s].value=new yt().fromArray(a.value);break;case"m3":i.uniforms[s].value=new lt().fromArray(a.value);break;case"m4":i.uniforms[s].value=new rt().fromArray(a.value);break;default:i.uniforms[s].value=a.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(i.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)i.extensions[s]=e.extensions[s];if(e.lights!==void 0&&(i.lights=e.lights),e.clipping!==void 0&&(i.clipping=e.clipping),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),i.normalScale=new fe().fromArray(s)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(i.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapRotation!==void 0&&i.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new fe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(i.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(i.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(i.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(i.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(e.sheenRoughnessMap)),i}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return sc.createMaterialFromType(e)}static createMaterialFromType(e){const t={ShadowMaterial:vp,SpriteMaterial:Wu,RawShaderMaterial:td,ShaderMaterial:Wn,PointsMaterial:$u,MeshPhysicalMaterial:yp,MeshStandardMaterial:nd,MeshPhongMaterial:bp,MeshToonMaterial:Mp,MeshNormalMaterial:Sp,MeshLambertMaterial:wp,MeshDepthMaterial:id,MeshDistanceMaterial:sd,MeshBasicMaterial:ln,MeshMatcapMaterial:Ep,LineDashedMaterial:Tp,LineBasicMaterial:Sn,Material:sn};return new t[e]}}class _u{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class dd extends ct{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class zp extends Pn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new Bi(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):qe(l),s.manager.itemError(e)}},n,i)}parse(e){const t={},n={};function i(f,g){if(t[g]!==void 0)return t[g];const m=f.interleavedBuffers[g],p=s(f,m.buffer),_=fr(m.type,p),v=new Vl(_,m.stride);return v.uuid=m.uuid,t[g]=v,v}function s(f,g){if(n[g]!==void 0)return n[g];const m=f.arrayBuffers[g],p=new Uint32Array(m).buffer;return n[g]=p,p}const a=e.isInstancedBufferGeometry?new dd:new ct,o=e.data.index;if(o!==void 0){const f=fr(o.type,o.array);a.setIndex(new Pt(f,1))}const l=e.data.attributes;for(const f in l){const g=l[f];let x;if(g.isInterleavedBufferAttribute){const m=i(e.data,g.data);x=new Vn(m,g.itemSize,g.offset,g.normalized)}else{const m=fr(g.type,g.array),p=g.isInstancedBufferAttribute?yr:Pt;x=new p(m,g.itemSize,g.normalized)}g.name!==void 0&&(x.name=g.name),g.usage!==void 0&&x.setUsage(g.usage),a.setAttribute(f,x)}const c=e.data.morphAttributes;if(c)for(const f in c){const g=c[f],x=[];for(let m=0,p=g.length;m<p;m++){const _=g[m];let v;if(_.isInterleavedBufferAttribute){const y=i(e.data,_.data);v=new Vn(y,_.itemSize,_.offset,_.normalized)}else{const y=fr(_.type,_.array);v=new Pt(y,_.itemSize,_.normalized)}_.name!==void 0&&(v.name=_.name),x.push(v)}a.morphAttributes[f]=x}e.data.morphTargetsRelative&&(a.morphTargetsRelative=!0);const h=e.data.groups||e.data.drawcalls||e.data.offsets;if(h!==void 0)for(let f=0,g=h.length;f!==g;++f){const x=h[f];a.addGroup(x.start,x.count,x.materialIndex)}const d=e.data.boundingSphere;return d!==void 0&&(a.boundingSphere=new Jt().fromJSON(d)),e.name&&(a.name=e.name),e.userData&&(a.userData=e.userData),a}}const zc={};class d0 extends Pn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=this.path===""?_u.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||a;const o=new Bi(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(h){i!==void 0&&i(h),qe("ObjectLoader: Can't parse "+e+".",h.message);return}const u=c.metadata;if(u===void 0||u.type===void 0||u.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),qe("ObjectLoader: Can't load "+e);return}s.parse(c,t)},n,i)}async loadAsync(e,t){const n=this,i=this.path===""?_u.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;const s=new Bi(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const a=await s.loadAsync(e,t);let o;try{o=JSON.parse(a)}catch(c){throw new Error("ObjectLoader: Can't parse "+e+". "+c.message)}const l=o.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(o)}parse(e,t){const n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),s=this.parseGeometries(e.geometries,i),a=this.parseImages(e.images,function(){t!==void 0&&t(c)}),o=this.parseTextures(e.textures,a),l=this.parseMaterials(e.materials,o),c=this.parseObject(e.object,s,l,o,n),u=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,u),this.bindLightTargets(c),t!==void 0){let h=!1;for(const d in a)if(a[d].data instanceof HTMLImageElement){h=!0;break}h===!1&&t(c)}return c}async parseAsync(e){const t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),s=await this.parseImagesAsync(e.images),a=this.parseTextures(e.textures,s),o=this.parseMaterials(e.materials,a),l=this.parseObject(e.object,i,o,a,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}static registerGeometry(e,t){zc[e]=t}parseShapes(e){const t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){const s=new Ps().fromJSON(e[n]);t[s.uuid]=s}return t}parseSkeletons(e,t){const n={},i={};if(t.traverse(function(s){s.isBone&&(i[s.uuid]=s)}),e!==void 0)for(let s=0,a=e.length;s<a;s++){const o=new Gl().fromJSON(e[s],i);n[o.uuid]=o}return n}parseGeometries(e,t){const n={};if(e!==void 0){const i=new zp;for(let s=0,a=e.length;s<a;s++){let o;const l=e[s];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":o=i.parse(l);break;default:l.type in hh?o=hh[l.type].fromJSON(l,t):l.type in zc?o=zc[l.type].fromJSON(l,t):Ce(`ObjectLoader: Unknown geometry type "${l.type}". Use .registerGeometry() before starting the deserialization process.`)}o.uuid=l.uuid,l.name!==void 0&&(o.name=l.name),l.userData!==void 0&&(o.userData=l.userData),n[l.uuid]=o}}return n}parseMaterials(e,t){const n={},i={};if(e!==void 0){const s=new sc;s.setTextures(t);for(let a=0,o=e.length;a<o;a++){const l=e[a];n[l.uuid]===void 0&&(n[l.uuid]=s.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){const t={};if(e!==void 0)for(let n=0;n<e.length;n++){const i=e[n],s=ba.parse(i);t[s.uuid]=s}return t}parseImages(e,t){const n=this,i={};let s;function a(l){return n.manager.itemStart(l),s.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function o(l){if(typeof l=="string"){const c=l,u=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return a(u)}else return l.data?{data:fr(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){const l=new ld(t);s=new Ma(l),s.setCrossOrigin(this.crossOrigin);for(let c=0,u=e.length;c<u;c++){const h=e[c],d=h.url;if(Array.isArray(d)){const f=[];for(let g=0,x=d.length;g<x;g++){const m=d[g],p=o(m);p!==null&&(p instanceof HTMLImageElement?f.push(p):f.push(new ai(p.data,p.width,p.height)))}i[h.uuid]=new ns(f)}else{const f=o(h.url);i[h.uuid]=new ns(f)}}}return i}async parseImagesAsync(e){const t=this,n={};let i;async function s(a){if(typeof a=="string"){const o=a,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(o)?o:t.resourcePath+o;return await i.loadAsync(l)}else return a.data?{data:fr(a.type,a.data),width:a.width,height:a.height}:null}if(e!==void 0&&e.length>0){i=new Ma(this.manager),i.setCrossOrigin(this.crossOrigin);for(let a=0,o=e.length;a<o;a++){const l=e[a],c=l.url;if(Array.isArray(c)){const u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h],g=await s(f);g!==null&&(g instanceof HTMLImageElement?u.push(g):u.push(new ai(g.data,g.width,g.height)))}n[l.uuid]=new ns(u)}else{const u=await s(l.url);n[l.uuid]=new ns(u)}}}return n}parseTextures(e,t){function n(s,a){return typeof s=="number"?s:(Ce("ObjectLoader.parseTexture: Constant should be in numeric form.",s),a[s])}const i={};if(e!==void 0)for(let s=0,a=e.length;s<a;s++){const o=e[s];o.image===void 0&&Ce('ObjectLoader: No "image" specified for',o.uuid),t[o.image]===void 0&&Ce("ObjectLoader: Undefined image",o.image);const l=t[o.image],c=l.data;let u;Array.isArray(c)?(u=new Ea,c.length===6&&(u.needsUpdate=!0)):(c&&c.data?u=new ai:u=new kt,c&&(u.needsUpdate=!0)),u.source=l,u.uuid=o.uuid,o.name!==void 0&&(u.name=o.name),o.mapping!==void 0&&(u.mapping=n(o.mapping,h0)),o.channel!==void 0&&(u.channel=o.channel),o.offset!==void 0&&u.offset.fromArray(o.offset),o.repeat!==void 0&&u.repeat.fromArray(o.repeat),o.center!==void 0&&u.center.fromArray(o.center),o.rotation!==void 0&&(u.rotation=o.rotation),o.wrap!==void 0&&(u.wrapS=n(o.wrap[0],xh),u.wrapT=n(o.wrap[1],xh)),o.format!==void 0&&(u.format=o.format),o.internalFormat!==void 0&&(u.internalFormat=o.internalFormat),o.type!==void 0&&(u.type=o.type),o.colorSpace!==void 0&&(u.colorSpace=o.colorSpace),o.minFilter!==void 0&&(u.minFilter=n(o.minFilter,yh)),o.magFilter!==void 0&&(u.magFilter=n(o.magFilter,yh)),o.anisotropy!==void 0&&(u.anisotropy=o.anisotropy),o.flipY!==void 0&&(u.flipY=o.flipY),o.generateMipmaps!==void 0&&(u.generateMipmaps=o.generateMipmaps),o.premultiplyAlpha!==void 0&&(u.premultiplyAlpha=o.premultiplyAlpha),o.unpackAlignment!==void 0&&(u.unpackAlignment=o.unpackAlignment),o.compareFunction!==void 0&&(u.compareFunction=o.compareFunction),o.normalized!==void 0&&(u.normalized=o.normalized),o.userData!==void 0&&(u.userData=o.userData),i[o.uuid]=u}return i}parseObject(e,t,n,i,s){let a;function o(d){return t[d]===void 0&&Ce("ObjectLoader: Undefined geometry",d),t[d]}function l(d){if(d!==void 0){if(Array.isArray(d)){const f=[];for(let g=0,x=d.length;g<x;g++){const m=d[g];n[m]===void 0&&Ce("ObjectLoader: Undefined material",m),f.push(n[m])}return f}return n[d]===void 0&&Ce("ObjectLoader: Undefined material",d),n[d]}}function c(d){return i[d]===void 0&&Ce("ObjectLoader: Undefined texture",d),i[d]}let u,h;switch(e.type){case"Scene":a=new Vu,e.background!==void 0&&(Number.isInteger(e.background)?a.background=new Ne(e.background):a.background=c(e.background)),e.environment!==void 0&&(a.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?a.fog=new zl(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(a.fog=new Bl(e.fog.color,e.fog.density)),e.fog.name!==""&&(a.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(a.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(a.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&a.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(a.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&a.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":a=new tn(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(a.focus=e.focus),e.zoom!==void 0&&(a.zoom=e.zoom),e.filmGauge!==void 0&&(a.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(a.filmOffset=e.filmOffset),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"OrthographicCamera":a=new Ra(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(a.zoom=e.zoom),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"AmbientLight":a=new Op(e.color,e.intensity);break;case"DirectionalLight":a=new Fp(e.color,e.intensity),a.target=e.target||"";break;case"PointLight":a=new Np(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":a=new kp(e.color,e.intensity,e.width,e.height);break;case"SpotLight":a=new Up(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),a.target=e.target||"";break;case"HemisphereLight":a=new Dp(e.color,e.groundColor,e.intensity);break;case"LightProbe":const d=new ud().fromArray(e.sh);a=new Bp(d,e.intensity);break;case"SkinnedMesh":u=o(e.geometry),h=l(e.material),a=new tp(u,h),e.bindMode!==void 0&&(a.bindMode=e.bindMode),e.bindMatrix!==void 0&&a.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(a.skeleton=e.skeleton);break;case"Mesh":u=o(e.geometry),h=l(e.material),a=new It(u,h);break;case"InstancedMesh":u=o(e.geometry),h=l(e.material);const f=e.count,g=e.instanceMatrix,x=e.instanceColor;a=new np(u,h,f),a.instanceMatrix=new yr(new Float32Array(g.array),16),x!==void 0&&(a.instanceColor=new yr(new Float32Array(x.array),x.itemSize));break;case"BatchedMesh":u=o(e.geometry),h=l(e.material),a=new ip(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,h),a.geometry=u,a.perObjectFrustumCulled=e.perObjectFrustumCulled,a.sortObjects=e.sortObjects,a._drawRanges=e.drawRanges,a._reservedRanges=e.reservedRanges,a._geometryInfo=e.geometryInfo.map(m=>{let p=null,_=null;return m.boundingBox!==void 0&&(p=new Kt().fromJSON(m.boundingBox)),m.boundingSphere!==void 0&&(_=new Jt().fromJSON(m.boundingSphere)),{...m,boundingBox:p,boundingSphere:_}}),a._instanceInfo=e.instanceInfo,a._availableInstanceIds=e._availableInstanceIds,a._availableGeometryIds=e._availableGeometryIds,a._nextIndexStart=e.nextIndexStart,a._nextVertexStart=e.nextVertexStart,a._geometryCount=e.geometryCount,a._maxInstanceCount=e.maxInstanceCount,a._maxVertexCount=e.maxVertexCount,a._maxIndexCount=e.maxIndexCount,a._geometryInitialized=e.geometryInitialized,a._matricesTexture=c(e.matricesTexture.uuid),a._indirectTexture=c(e.indirectTexture.uuid),e.colorsTexture!==void 0&&(a._colorsTexture=c(e.colorsTexture.uuid)),e.boundingSphere!==void 0&&(a.boundingSphere=new Jt().fromJSON(e.boundingSphere)),e.boundingBox!==void 0&&(a.boundingBox=new Kt().fromJSON(e.boundingBox));break;case"LOD":a=new ep;break;case"Line":a=new os(o(e.geometry),l(e.material));break;case"LineLoop":a=new sp(o(e.geometry),l(e.material));break;case"LineSegments":a=new Ti(o(e.geometry),l(e.material));break;case"PointCloud":case"Points":a=new rp(o(e.geometry),l(e.material));break;case"Sprite":a=new Qf(l(e.material));break;case"Group":a=new pr;break;case"Bone":a=new Xu;break;default:a=new St}if(a.uuid=e.uuid,e.name!==void 0&&(a.name=e.name),e.matrix!==void 0?(a.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(a.matrixAutoUpdate=e.matrixAutoUpdate),a.matrixAutoUpdate&&a.matrix.decompose(a.position,a.quaternion,a.scale)):(e.position!==void 0&&a.position.fromArray(e.position),e.rotation!==void 0&&a.rotation.fromArray(e.rotation),e.quaternion!==void 0&&a.quaternion.fromArray(e.quaternion),e.scale!==void 0&&a.scale.fromArray(e.scale)),e.up!==void 0&&a.up.fromArray(e.up),e.pivot!==void 0&&(a.pivot=new R().fromArray(e.pivot)),e.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),e.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=e.morphTargetInfluences.slice()),e.castShadow!==void 0&&(a.castShadow=e.castShadow),e.receiveShadow!==void 0&&(a.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(a.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(a.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(a.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(a.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&a.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(a.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(a.visible=e.visible),e.frustumCulled!==void 0&&(a.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(a.renderOrder=e.renderOrder),e.static!==void 0&&(a.static=e.static),e.userData!==void 0&&(a.userData=e.userData),e.layers!==void 0&&(a.layers.mask=e.layers),e.children!==void 0){const d=e.children;for(let f=0;f<d.length;f++)a.add(this.parseObject(d[f],t,n,i,s))}if(e.animations!==void 0){const d=e.animations;for(let f=0;f<d.length;f++){const g=d[f];a.animations.push(s[g])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(a.autoUpdate=e.autoUpdate);const d=e.levels;for(let f=0;f<d.length;f++){const g=d[f],x=a.getObjectByProperty("uuid",g.object);x!==void 0&&a.addLevel(x,g.distance,g.hysteresis)}}return a}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=t[n.skeleton];i===void 0?Ce("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){const n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new St}})}}const h0={UVMapping:Tl,CubeReflectionMapping:Si,CubeRefractionMapping:ss,EquirectangularReflectionMapping:Zr,EquirectangularRefractionMapping:Kr,CubeUVReflectionMapping:Sr},xh={RepeatWrapping:ra,ClampToEdgeWrapping:In,MirroredRepeatWrapping:aa},yh={NearestFilter:Xt,NearestMipmapNearestFilter:Pu,NearestMipmapLinearFilter:hr,LinearFilter:Ft,LinearMipmapNearestFilter:Jr,LinearMipmapLinearFilter:xi},Vc=new WeakMap;class f0 extends Pn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ce("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ce("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=yi.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{Vc.has(a)===!0?(i&&i(Vc.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(c),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){yi.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e)}).catch(function(c){i&&i(c),Vc.set(l,c),yi.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});yi.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}let po;class hd{static getContext(){return po===void 0&&(po=new(window.AudioContext||window.webkitAudioContext)),po}static setContext(e){po=e}}class p0 extends Pn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new Bi(this.manager);a.setResponseType("arraybuffer"),a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){try{const c=l.slice(0),u=hd.getContext(),h=e+"#decode";s.manager.itemStart(h),u.decodeAudioData(c,function(d){t(d),s.manager.itemEnd(h)}).catch(function(d){o(d),s.manager.itemEnd(h)})}catch(c){o(c)}},n,i);function o(l){i?i(l):qe(l),s.manager.itemError(e)}}}const bh=new rt,Mh=new rt,vs=new rt;class m0{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new tn,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new tn,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,vs.copy(e.projectionMatrix);const i=t.eyeSep/2,s=i*t.near/t.focus,a=t.near*Math.tan(Is*t.fov*.5)/t.zoom;let o,l;Mh.elements[12]=-i,bh.elements[12]=i,o=-a*t.aspect+s,l=a*t.aspect+s,vs.elements[0]=2*t.near/(l-o),vs.elements[8]=(l+o)/(l-o),this.cameraL.projectionMatrix.copy(vs),o=-a*t.aspect-s,l=a*t.aspect-s,vs.elements[0]=2*t.near/(l-o),vs.elements[8]=(l+o)/(l-o),this.cameraR.projectionMatrix.copy(vs)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(Mh),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(bh)}}const rr=-90,ar=1;class Vp extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new tn(rr,ar,e,t);i.layers=this.layers,this.add(i);const s=new tn(rr,ar,e,t);s.layers=this.layers,this.add(s);const a=new tn(rr,ar,e,t);a.layers=this.layers,this.add(a);const o=new tn(rr,ar,e,t);o.layers=this.layers,this.add(o);const l=new tn(rr,ar,e,t);l.layers=this.layers,this.add(l);const c=new tn(rr,ar,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===zn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Us)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Gp extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Hp{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=g0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function g0(){this._document.hidden===!1&&this.reset()}const xs=new R,Gc=new mn,_0=new R,ys=new R,bs=new R;class v0 extends St{constructor(){super(),this.type="AudioListener",this.context=hd.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new Hp}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e),this._timer.update();const t=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(xs,Gc,_0),ys.set(0,0,-1).applyQuaternion(Gc),bs.set(0,1,0).applyQuaternion(Gc),t.positionX){const n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(xs.x,n),t.positionY.linearRampToValueAtTime(xs.y,n),t.positionZ.linearRampToValueAtTime(xs.z,n),t.forwardX.linearRampToValueAtTime(ys.x,n),t.forwardY.linearRampToValueAtTime(ys.y,n),t.forwardZ.linearRampToValueAtTime(ys.z,n),t.upX.linearRampToValueAtTime(bs.x,n),t.upY.linearRampToValueAtTime(bs.y,n),t.upZ.linearRampToValueAtTime(bs.z,n)}else t.setPosition(xs.x,xs.y,xs.z),t.setOrientation(ys.x,ys.y,ys.z,bs.x,bs.y,bs.z)}}class Wp extends St{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){Ce("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){Ce("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){Ce("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){Ce("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){Ce("Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(Ce("Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){Ce("Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}copy(e,t){return super.copy(e,t),e.sourceType!=="buffer"?(Ce("Audio: Audio source type cannot be copied."),this):(this.autoplay=e.autoplay,this.buffer=e.buffer,this.detune=e.detune,this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.offset=e.offset,this.duration=e.duration,this.playbackRate=e.playbackRate,this.hasPlaybackControl=e.hasPlaybackControl,this.sourceType=e.sourceType,this.filters=e.filters.slice(),this)}clone(e){return new this.constructor(this.listener).copy(this,e)}}const Ms=new R,Sh=new mn,x0=new R,Ss=new R;class y0 extends Wp{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(Ms,Sh,x0),Ss.set(0,0,1).applyQuaternion(Sh);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(Ms.x,n),t.positionY.linearRampToValueAtTime(Ms.y,n),t.positionZ.linearRampToValueAtTime(Ms.z,n),t.orientationX.linearRampToValueAtTime(Ss.x,n),t.orientationY.linearRampToValueAtTime(Ss.y,n),t.orientationZ.linearRampToValueAtTime(Ss.z,n)}else t.setPosition(Ms.x,Ms.y,Ms.z),t.setOrientation(Ss.x,Ss.y,Ss.z)}}class b0{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}}class Xp{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,a;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,a=i;s!==a;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){mn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const a=this._workIndex*s;mn.multiplyQuaternionsFlat(e,a,e,t,e,n),mn.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,s){const a=1-i;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,s){for(let a=0;a!==s;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const fd="\\[\\]\\.:\\/",M0=new RegExp("["+fd+"]","g"),pd="[^"+fd+"]",S0="[^"+fd.replace("\\.","")+"]",w0=/((?:WC+[\/:])*)/.source.replace("WC",pd),E0=/(WCOD+)?/.source.replace("WCOD",S0),T0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",pd),A0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",pd),C0=new RegExp("^"+w0+E0+T0+A0+"$"),R0=["material","materials","bones","map"];class I0{constructor(e,t,n){const i=n||Mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Mt{constructor(e,t,n){this.path=t,this.parsedPath=n||Mt.parseTrackName(t),this.node=Mt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Mt.Composite(e,t,n):new Mt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(M0,"")}static parseTrackName(e){const t=C0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);R0.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Mt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ce("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){qe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){qe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){qe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){qe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){qe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;qe("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Mt.Composite=I0;Mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Mt.prototype.GetterByBindingType=[Mt.prototype._getValue_direct,Mt.prototype._getValue_array,Mt.prototype._getValue_arrayElement,Mt.prototype._getValue_toArray];Mt.prototype.SetterByBindingTypeAndVersioning=[[Mt.prototype._setValue_direct,Mt.prototype._setValue_direct_setNeedsUpdate,Mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_array,Mt.prototype._setValue_array_setNeedsUpdate,Mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_arrayElement,Mt.prototype._setValue_arrayElement_setNeedsUpdate,Mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_fromArray,Mt.prototype._setValue_fromArray_setNeedsUpdate,Mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class P0{constructor(){this.isAnimationObjectGroup=!0,this.uuid=Gn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,a=s.length;let o,l=e.length,c=this.nCachedObjects_;for(let u=0,h=arguments.length;u!==h;++u){const d=arguments[u],f=d.uuid;let g=t[f];if(g===void 0){g=l++,t[f]=g,e.push(d);for(let x=0,m=a;x!==m;++x)s[x].push(new Mt(d,n[x],i[x]))}else if(g<c){o=e[g];const x=--c,m=e[x];t[m.uuid]=g,e[g]=m,t[f]=x,e[x]=d;for(let p=0,_=a;p!==_;++p){const v=s[p],y=v[x];let w=v[g];v[g]=y,w===void 0&&(w=new Mt(d,n[p],i[p])),v[x]=w}}else e[g]!==o&&qe("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_;for(let a=0,o=arguments.length;a!==o;++a){const l=arguments[a],c=l.uuid,u=t[c];if(u!==void 0&&u>=s){const h=s++,d=e[h];t[d.uuid]=u,e[u]=d,t[c]=h,e[h]=l;for(let f=0,g=i;f!==g;++f){const x=n[f],m=x[h],p=x[u];x[u]=m,x[h]=p}}}this.nCachedObjects_=s}uncache(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_,a=e.length;for(let o=0,l=arguments.length;o!==l;++o){const c=arguments[o],u=c.uuid,h=t[u];if(h!==void 0)if(delete t[u],h<s){const d=--s,f=e[d],g=--a,x=e[g];t[f.uuid]=h,e[h]=f,t[x.uuid]=d,e[d]=x,e.pop();for(let m=0,p=i;m!==p;++m){const _=n[m],v=_[d],y=_[g];_[h]=v,_[d]=y,_.pop()}}else{const d=--a,f=e[d];d>0&&(t[f.uuid]=h),e[h]=f,e.pop();for(let g=0,x=i;g!==x;++g){const m=n[g];m[h]=m[d],m.pop()}}}this.nCachedObjects_=s}subscribe_(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const s=this._bindings;if(i!==void 0)return s[i];const a=this._paths,o=this._parsedPaths,l=this._objects,c=l.length,u=this.nCachedObjects_,h=new Array(c);i=s.length,n[e]=i,a.push(e),o.push(t),s.push(h);for(let d=u,f=l.length;d!==f;++d){const g=l[d];h[d]=new Mt(g,e,t)}return h}unsubscribe_(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,s=this._parsedPaths,a=this._bindings,o=a.length-1,l=a[o],c=e[o];t[c]=n,a[n]=l,a.pop(),s[n]=s[o],s.pop(),i[n]=i[o],i.pop()}}}class $p{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,a=s.length,o=new Array(a),l={endingStart:Ts,endingEnd:Ts};for(let c=0;c!==a;++c){const u=s[c].createInterpolant(null);o[c]=u,u.settings&&Object.assign(l,u.settings),u.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Of,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,s=e._clip.duration,a=s/i,o=i/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case ku:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulateAdditive(o);break;case Dl:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const a=n===kf;if(e===0)return s===-1?i:a&&(s&1)===1?t-i:i;if(n===Ff){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=s,this.time=i;if(a&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=As,i.endingEnd=As):(e?i.endingStart=this.zeroSlopeAtStart?As:Ts:i.endingStart=ua,t?i.endingEnd=this.zeroSlopeAtEnd?As:Ts:i.endingEnd=ua)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}}const L0=new Float32Array(1);class D0 extends li{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==s;++h){const d=i[h],f=d.name;let g=u[f];if(g!==void 0)++g.referenceCount,a[h]=g;else{if(g=a[h],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}const x=t&&t._propertyBindings[h].binding.parsedPath;g=new Xp(Mt.create(n,f,x),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),a[h]=g}o[h].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;const h=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new ad(new Float32Array(2),new Float32Array(2),1,L0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let a=typeof e=="string"?ba.findByName(i,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Dl),l!==void 0){const h=l.actionByRoot[s];if(h!==void 0&&h.blendMode===n)return h;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const u=new $p(this,a,t,n);return this._bindAction(u,c),this._addInactiveAction(u,o,s),u}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?ba.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class U0 extends zu{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isRenderTarget3D=!0,this.depth=n,this.texture=new Ol(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class md{constructor(e){this.value=e}clone(){return new md(this.value.clone===void 0?this.value:this.value.clone())}}let N0=0;class F0 extends li{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:N0++}),this.name="",this.usage=fa,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){const s=Array.isArray(t[n])?t[n]:[t[n]];for(let a=0;a<s.length;a++)this.uniforms.push(s[a].clone())}return this}clone(){return new this.constructor().copy(this)}}class Sl extends Vl{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class O0{constructor(e,t,n,i,s,a=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=s,this.normalized=a,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}const wh=new rt;class k0{constructor(e,t,n=0,i=1/0){this.ray=new wr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new kl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):qe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return wh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(wh),this}intersectObject(e,t=!0,n=[]){return vu(e,this,n,t),n.sort(Eh),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)vu(e[i],this,n,t);return n.sort(Eh),n}}function Eh(r,e){return r.distance-e.distance}function vu(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let a=0,o=s.length;a<o;a++)vu(s[a],e,t,!0)}}class B0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Ce("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class z0{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=it(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(it(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class V0{constructor(e=1,t=0,n=0){this.radius=e,this.theta=t,this.y=n}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}}const Md=class Md{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};Md.prototype.isMatrix2=!0;let xu=Md;const Th=new fe;class G0{constructor(e=new fe(1/0,1/0),t=new fe(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Th.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Th).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ah=new R,mo=new R,or=new R,lr=new R,Hc=new R,H0=new R,W0=new R;class qp{constructor(e=new R,t=new R){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Ah.subVectors(e,this.start),mo.subVectors(this.end,this.start);const n=mo.dot(mo);if(n===0)return 0;let s=mo.dot(Ah)/n;return t&&(s=it(s,0,1)),s}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=H0,n=W0){const i=10000000000000001e-32;let s,a;const o=this.start,l=e.start,c=this.end,u=e.end;or.subVectors(c,o),lr.subVectors(u,l),Hc.subVectors(o,l);const h=or.dot(or),d=lr.dot(lr),f=lr.dot(Hc);if(h<=i&&d<=i)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(h<=i)s=0,a=f/d,a=it(a,0,1);else{const g=or.dot(Hc);if(d<=i)a=0,s=it(-g/h,0,1);else{const x=or.dot(lr),m=h*d-x*x;m!==0?s=it((x*f-g*d)/m,0,1):s=0,a=(x*s+f)/d,a<0?(a=0,s=it(-g/h,0,1)):a>1&&(a=1,s=it((x-g)/h,0,1))}}return t.copy(o).addScaledVector(or,s),n.copy(l).addScaledVector(lr,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const Ch=new R;class X0 extends St{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new ct,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let a=0,o=1,l=32;a<l;a++,o++){const c=a/l*Math.PI*2,u=o/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(u),Math.sin(u),1)}n.setAttribute("position",new Ve(i,3));const s=new Sn({fog:!1,toneMapped:!1});this.cone=new Ti(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),Ch.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Ch),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const ji=new R,go=new rt,Wc=new rt;class $0 extends Ti{constructor(e){const t=Yp(e),n=new ct,i=[],s=[];for(let c=0;c<t.length;c++){const u=t[c];u.parent&&u.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(0,0,0),s.push(0,0,0))}n.setAttribute("position",new Ve(i,3)),n.setAttribute("color",new Ve(s,3));const a=new Sn({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,a),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1;const o=new Ne(255),l=new Ne(65280);this.setColors(o,l)}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");Wc.copy(this.root.matrixWorld).invert();for(let s=0,a=0;s<t.length;s++){const o=t[s];o.parent&&o.parent.isBone&&(go.multiplyMatrices(Wc,o.matrixWorld),ji.setFromMatrixPosition(go),i.setXYZ(a,ji.x,ji.y,ji.z),go.multiplyMatrices(Wc,o.parent.matrixWorld),ji.setFromMatrixPosition(go),i.setXYZ(a+1,ji.x,ji.y,ji.z),a+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}setColors(e,t){const i=this.geometry.getAttribute("color");for(let s=0;s<i.count;s+=2)i.setXYZ(s,e.r,e.g,e.b),i.setXYZ(s+1,t.r,t.g,t.b);return i.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}function Yp(r){const e=[];r.isBone===!0&&e.push(r);for(let t=0;t<r.children.length;t++)e.push(...Yp(r.children[t]));return e}class q0 extends It{constructor(e,t,n){const i=new ii(t,4,2),s=new ln({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const Y0=new R,Rh=new Ne,Ih=new Ne;class Z0 extends St{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new Ar(t);i.rotateY(Math.PI*.5),this.material=new ln({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const s=i.getAttribute("position"),a=new Float32Array(s.count*3);i.setAttribute("color",new Pt(a,3)),this.add(new It(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");Rh.copy(this.light.color),Ih.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){const s=n<i/2?Rh:Ih;t.setXYZ(n,s.r,s.g,s.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(Y0.setFromMatrixPosition(this.light.matrixWorld).negate())}}class K0 extends Ti{constructor(e=10,t=10,n=4473924,i=8947848){n=new Ne(n),i=new Ne(i);const s=t/2,a=e/t,o=e/2,l=[],c=[];for(let d=0,f=0,g=-o;d<=t;d++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);const x=d===s?n:i;x.toArray(c,f),f+=3,x.toArray(c,f),f+=3,x.toArray(c,f),f+=3,x.toArray(c,f),f+=3}const u=new ct;u.setAttribute("position",new Ve(l,3)),u.setAttribute("color",new Ve(c,3));const h=new Sn({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class J0 extends Ti{constructor(e=10,t=16,n=8,i=64,s=4473924,a=8947848){s=new Ne(s),a=new Ne(a);const o=[],l=[];if(t>1)for(let h=0;h<t;h++){const d=h/t*(Math.PI*2),f=Math.sin(d)*e,g=Math.cos(d)*e;o.push(0,0,0),o.push(f,0,g);const x=h&1?s:a;l.push(x.r,x.g,x.b),l.push(x.r,x.g,x.b)}for(let h=0;h<n;h++){const d=h&1?s:a,f=e-e/n*h;for(let g=0;g<i;g++){let x=g/i*(Math.PI*2),m=Math.sin(x)*f,p=Math.cos(x)*f;o.push(m,0,p),l.push(d.r,d.g,d.b),x=(g+1)/i*(Math.PI*2),m=Math.sin(x)*f,p=Math.cos(x)*f,o.push(m,0,p),l.push(d.r,d.g,d.b)}}const c=new ct;c.setAttribute("position",new Ve(o,3)),c.setAttribute("color",new Ve(l,3));const u=new Sn({vertexColors:!0,toneMapped:!1});super(c,u),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Ph=new R,_o=new R,Lh=new R;class j0 extends St{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new ct;i.setAttribute("position",new Ve([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const s=new Sn({fog:!1,toneMapped:!1});this.lightPlane=new os(i,s),this.add(this.lightPlane),i=new ct,i.setAttribute("position",new Ve([0,0,0,0,0,1],3)),this.targetLine=new os(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Ph.setFromMatrixPosition(this.light.matrixWorld),_o.setFromMatrixPosition(this.light.target.matrixWorld),Lh.subVectors(_o,Ph),this.lightPlane.lookAt(_o),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(_o),this.targetLine.scale.z=Lh.length()}}const vo=new R,zt=new ic;class Q0 extends Ti{constructor(e){const t=new ct,n=new Sn({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(g,x){l(g),l(x)}function l(g){i.push(0,0,0),s.push(0,0,0),a[g]===void 0&&(a[g]=[]),a[g].push(i.length/3-1)}t.setAttribute("position",new Ve(i,3)),t.setAttribute("color",new Ve(s,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();const c=new Ne(16755200),u=new Ne(16711680),h=new Ne(43775),d=new Ne(16777215),f=new Ne(3355443);this.setColors(c,u,h,d,f)}setColors(e,t,n,i,s){const o=this.geometry.getAttribute("color");return o.setXYZ(0,e.r,e.g,e.b),o.setXYZ(1,e.r,e.g,e.b),o.setXYZ(2,e.r,e.g,e.b),o.setXYZ(3,e.r,e.g,e.b),o.setXYZ(4,e.r,e.g,e.b),o.setXYZ(5,e.r,e.g,e.b),o.setXYZ(6,e.r,e.g,e.b),o.setXYZ(7,e.r,e.g,e.b),o.setXYZ(8,e.r,e.g,e.b),o.setXYZ(9,e.r,e.g,e.b),o.setXYZ(10,e.r,e.g,e.b),o.setXYZ(11,e.r,e.g,e.b),o.setXYZ(12,e.r,e.g,e.b),o.setXYZ(13,e.r,e.g,e.b),o.setXYZ(14,e.r,e.g,e.b),o.setXYZ(15,e.r,e.g,e.b),o.setXYZ(16,e.r,e.g,e.b),o.setXYZ(17,e.r,e.g,e.b),o.setXYZ(18,e.r,e.g,e.b),o.setXYZ(19,e.r,e.g,e.b),o.setXYZ(20,e.r,e.g,e.b),o.setXYZ(21,e.r,e.g,e.b),o.setXYZ(22,e.r,e.g,e.b),o.setXYZ(23,e.r,e.g,e.b),o.setXYZ(24,t.r,t.g,t.b),o.setXYZ(25,t.r,t.g,t.b),o.setXYZ(26,t.r,t.g,t.b),o.setXYZ(27,t.r,t.g,t.b),o.setXYZ(28,t.r,t.g,t.b),o.setXYZ(29,t.r,t.g,t.b),o.setXYZ(30,t.r,t.g,t.b),o.setXYZ(31,t.r,t.g,t.b),o.setXYZ(32,n.r,n.g,n.b),o.setXYZ(33,n.r,n.g,n.b),o.setXYZ(34,n.r,n.g,n.b),o.setXYZ(35,n.r,n.g,n.b),o.setXYZ(36,n.r,n.g,n.b),o.setXYZ(37,n.r,n.g,n.b),o.setXYZ(38,i.r,i.g,i.b),o.setXYZ(39,i.r,i.g,i.b),o.setXYZ(40,s.r,s.g,s.b),o.setXYZ(41,s.r,s.g,s.b),o.setXYZ(42,s.r,s.g,s.b),o.setXYZ(43,s.r,s.g,s.b),o.setXYZ(44,s.r,s.g,s.b),o.setXYZ(45,s.r,s.g,s.b),o.setXYZ(46,s.r,s.g,s.b),o.setXYZ(47,s.r,s.g,s.b),o.setXYZ(48,s.r,s.g,s.b),o.setXYZ(49,s.r,s.g,s.b),o.needsUpdate=!0,this}update(){const e=this.geometry,t=this.pointMap,n=1,i=1;let s,a;if(zt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)s=1,a=0;else if(this.camera.coordinateSystem===zn)s=-1,a=1;else if(this.camera.coordinateSystem===Us)s=0,a=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);Wt("c",t,e,zt,0,0,s),Wt("t",t,e,zt,0,0,a),Wt("n1",t,e,zt,-n,-i,s),Wt("n2",t,e,zt,n,-i,s),Wt("n3",t,e,zt,-n,i,s),Wt("n4",t,e,zt,n,i,s),Wt("f1",t,e,zt,-n,-i,a),Wt("f2",t,e,zt,n,-i,a),Wt("f3",t,e,zt,-n,i,a),Wt("f4",t,e,zt,n,i,a),Wt("u1",t,e,zt,n*.7,i*1.1,s),Wt("u2",t,e,zt,-n*.7,i*1.1,s),Wt("u3",t,e,zt,0,i*2,s),Wt("cf1",t,e,zt,-n,0,a),Wt("cf2",t,e,zt,n,0,a),Wt("cf3",t,e,zt,0,-i,a),Wt("cf4",t,e,zt,0,i,a),Wt("cn1",t,e,zt,-n,0,s),Wt("cn2",t,e,zt,n,0,s),Wt("cn3",t,e,zt,0,-i,s),Wt("cn4",t,e,zt,0,i,s),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function Wt(r,e,t,n,i,s,a){vo.set(i,s,a).unproject(n);const o=e[r];if(o!==void 0){const l=t.getAttribute("position");for(let c=0,u=o.length;c<u;c++)l.setXYZ(o[c],vo.x,vo.y,vo.z)}}const xo=new Kt;class ev extends Ti{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),s=new ct;s.setIndex(new Pt(n,1)),s.setAttribute("position",new Pt(i,3)),super(s,new Sn({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&xo.setFromObject(this.object),xo.isEmpty())return;const e=xo.min,t=xo.max,n=this.geometry.attributes.position,i=n.array;i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=e.x,i[4]=t.y,i[5]=t.z,i[6]=e.x,i[7]=e.y,i[8]=t.z,i[9]=t.x,i[10]=e.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=e.z,i[15]=e.x,i[16]=t.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=t.x,i[22]=e.y,i[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class tv extends Ti{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new ct;s.setIndex(new Pt(n,1)),s.setAttribute("position",new Ve(i,3)),super(s,new Sn({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class nv extends os{constructor(e,t=1,n=16776960){const i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],a=new ct;a.setAttribute("position",new Ve(s,3)),a.computeBoundingSphere(),super(a,new Sn({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const o=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new ct;l.setAttribute("position",new Ve(o,3)),l.computeBoundingSphere(),this.add(new It(l,new ln({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Dh=new R;let yo,Xc;class iv extends St{constructor(e=new R(0,0,1),t=new R(0,0,0),n=1,i=16776960,s=n*.2,a=s*.2){super(),this.type="ArrowHelper",yo===void 0&&(yo=new ct,yo.setAttribute("position",new Ve([0,0,0,0,1,0],3)),Xc=new Tr(.5,1,5,1),Xc.translate(0,-.5,0)),this.position.copy(t),this.line=new os(yo,new Sn({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new It(Xc,new ln({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,s,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Dh.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Dh,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class sv extends Ti{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new ct;i.setAttribute("position",new Ve(t,3)),i.setAttribute("color",new Ve(n,3));const s=new Sn({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){const i=new Ne,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class rv{constructor(){this.type="ShapePath",this.color=new Ne,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new Ml,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,s,a){return this.currentPath.bezierCurveTo(e,t,n,i,s,a),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(p){const _=[];for(let v=0,y=p.length;v<y;v++){const w=p[v],M=new Ps;M.curves=w.curves,_.push(M)}return _}function n(p,_){const v=_.length;let y=!1;for(let w=v-1,M=0;M<v;w=M++){let C=_[w],b=_[M],T=b.x-C.x,L=b.y-C.y;if(Math.abs(L)>Number.EPSILON){if(L<0&&(C=_[M],T=-T,b=_[w],L=-L),p.y<C.y||p.y>b.y)continue;if(p.y===C.y){if(p.x===C.x)return!0}else{const I=L*(p.x-C.x)-T*(p.y-C.y);if(I===0)return!0;if(I<0)continue;y=!y}}else{if(p.y!==C.y)continue;if(b.x<=p.x&&p.x<=C.x||C.x<=p.x&&p.x<=b.x)return!0}}return y}const i=si.isClockWise,s=this.subPaths;if(s.length===0)return[];let a,o,l;const c=[];if(s.length===1)return o=s[0],l=new Ps,l.curves=o.curves,c.push(l),c;let u=!i(s[0].getPoints());u=e?!u:u;const h=[],d=[];let f=[],g=0,x;d[g]=void 0,f[g]=[];for(let p=0,_=s.length;p<_;p++)o=s[p],x=o.getPoints(),a=i(x),a=e?!a:a,a?(!u&&d[g]&&g++,d[g]={s:new Ps,p:x},d[g].s.curves=o.curves,u&&g++,f[g]=[]):f[g].push({h:o,p:x[0]});if(!d[0])return t(s);if(d.length>1){let p=!1,_=0;for(let v=0,y=d.length;v<y;v++)h[v]=[];for(let v=0,y=d.length;v<y;v++){const w=f[v];for(let M=0;M<w.length;M++){const C=w[M];let b=!0;for(let T=0;T<d.length;T++)n(C.p,d[T].p)&&(v!==T&&_++,b?(b=!1,h[T].push(C)):p=!0);b&&h[v].push(C)}}_>0&&p===!1&&(f=h)}let m;for(let p=0,_=d.length;p<_;p++){l=d[p].s,c.push(l),m=f[p];for(let v=0,y=m.length;v<y;v++)l.holes.push(m[v].h)}return c}}class av extends li{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ce("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function ov(r,e){const t=r.image&&r.image.width?r.image.width/r.image.height:1;return t>e?(r.repeat.x=1,r.repeat.y=t/e,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2):(r.repeat.x=e/t,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0),r}function lv(r,e){const t=r.image&&r.image.width?r.image.width/r.image.height:1;return t>e?(r.repeat.x=e/t,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0):(r.repeat.x=1,r.repeat.y=t/e,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2),r}function cv(r){return r.repeat.x=1,r.repeat.y=1,r.offset.x=0,r.offset.y=0,r}function yu(r,e,t,n){const i=uv(n);switch(t){case Fu:return r*e;case Il:return r*e/i.components*i.byteLength;case wa:return r*e/i.components*i.byteLength;case rs:return r*e*2/i.components*i.byteLength;case Pl:return r*e*2/i.components*i.byteLength;case Ou:return r*e*3/i.components*i.byteLength;case bn:return r*e*4/i.components*i.byteLength;case Ll:return r*e*4/i.components*i.byteLength;case jr:case Qr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case ea:case ta:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Vo:case Ho:return Math.max(r,16)*Math.max(e,8)/4;case zo:case Go:return Math.max(r,8)*Math.max(e,8)/2;case Wo:case Xo:case qo:case Yo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case $o:case oa:case Zo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ko:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Jo:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case jo:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Qo:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case el:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case tl:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case nl:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case il:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case sl:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case rl:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case al:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case ol:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case ll:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case cl:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case ul:case dl:case hl:return Math.ceil(r/4)*Math.ceil(e/4)*16;case fl:case pl:return Math.ceil(r/4)*Math.ceil(e/4)*8;case la:case ml:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function uv(r){switch(r){case An:case Lu:return{byteLength:1,components:1};case _r:case Du:case wi:return{byteLength:2,components:1};case Cl:case Rl:return{byteLength:2,components:4};case Zn:case Al:case yn:return{byteLength:4,components:1};case Uu:case Nu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}class dv{static contain(e,t){return ov(e,t)}static cover(e,t){return lv(e,t)}static fill(e){return cv(e)}static getByteLength(e,t,n,i){return yu(e,t,n,i)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:El}}));typeof window<"u"&&(window.__THREE__?Ce("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=El);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Zp(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function hv(r){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const u=l.array,h=l.updateRanges;if(r.bindBuffer(c,o),h.length===0)r.bufferSubData(c,0,u);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){const g=h[d],x=h[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,h[d]=x)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){const x=h[f];r.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var fv=`#ifdef USE_ALPHAHASH
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
#endif`,Kv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jv=`#ifdef USE_FOG
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
#endif`,Kx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
}`,mt={alphahash_fragment:fv,alphahash_pars_fragment:pv,alphamap_fragment:mv,alphamap_pars_fragment:gv,alphatest_fragment:_v,alphatest_pars_fragment:vv,aomap_fragment:xv,aomap_pars_fragment:yv,batching_pars_vertex:bv,batching_vertex:Mv,begin_vertex:Sv,beginnormal_vertex:wv,bsdfs:Ev,iridescence_fragment:Tv,bumpmap_pars_fragment:Av,clipping_planes_fragment:Cv,clipping_planes_pars_fragment:Rv,clipping_planes_pars_vertex:Iv,clipping_planes_vertex:Pv,color_fragment:Lv,color_pars_fragment:Dv,color_pars_vertex:Uv,color_vertex:Nv,common:Fv,cube_uv_reflection_fragment:Ov,defaultnormal_vertex:kv,displacementmap_pars_vertex:Bv,displacementmap_vertex:zv,emissivemap_fragment:Vv,emissivemap_pars_fragment:Gv,colorspace_fragment:Hv,colorspace_pars_fragment:Wv,envmap_fragment:Xv,envmap_common_pars_fragment:$v,envmap_pars_fragment:qv,envmap_pars_vertex:Yv,envmap_physical_pars_fragment:rx,envmap_vertex:Zv,fog_vertex:Kv,fog_pars_vertex:Jv,fog_fragment:jv,fog_pars_fragment:Qv,gradientmap_pars_fragment:ex,lightmap_pars_fragment:tx,lights_lambert_fragment:nx,lights_lambert_pars_fragment:ix,lights_pars_begin:sx,lights_toon_fragment:ax,lights_toon_pars_fragment:ox,lights_phong_fragment:lx,lights_phong_pars_fragment:cx,lights_physical_fragment:ux,lights_physical_pars_fragment:dx,lights_fragment_begin:hx,lights_fragment_maps:fx,lights_fragment_end:px,lightprobes_pars_fragment:mx,logdepthbuf_fragment:gx,logdepthbuf_pars_fragment:_x,logdepthbuf_pars_vertex:vx,logdepthbuf_vertex:xx,map_fragment:yx,map_pars_fragment:bx,map_particle_fragment:Mx,map_particle_pars_fragment:Sx,metalnessmap_fragment:wx,metalnessmap_pars_fragment:Ex,morphinstance_vertex:Tx,morphcolor_vertex:Ax,morphnormal_vertex:Cx,morphtarget_pars_vertex:Rx,morphtarget_vertex:Ix,normal_fragment_begin:Px,normal_fragment_maps:Lx,normal_pars_fragment:Dx,normal_pars_vertex:Ux,normal_vertex:Nx,normalmap_pars_fragment:Fx,clearcoat_normal_fragment_begin:Ox,clearcoat_normal_fragment_maps:kx,clearcoat_pars_fragment:Bx,iridescence_pars_fragment:zx,opaque_fragment:Vx,packing:Gx,premultiplied_alpha_fragment:Hx,project_vertex:Wx,dithering_fragment:Xx,dithering_pars_fragment:$x,roughnessmap_fragment:qx,roughnessmap_pars_fragment:Yx,shadowmap_pars_fragment:Zx,shadowmap_pars_vertex:Kx,shadowmap_vertex:Jx,shadowmask_pars_fragment:jx,skinbase_vertex:Qx,skinning_pars_vertex:ey,skinning_vertex:ty,skinnormal_vertex:ny,specularmap_fragment:iy,specularmap_pars_fragment:sy,tonemapping_fragment:ry,tonemapping_pars_fragment:ay,transmission_fragment:oy,transmission_pars_fragment:ly,uv_pars_fragment:cy,uv_pars_vertex:uy,uv_vertex:dy,worldpos_vertex:hy,background_vert:fy,background_frag:py,backgroundCube_vert:my,backgroundCube_frag:gy,cube_vert:_y,cube_frag:vy,depth_vert:xy,depth_frag:yy,distance_vert:by,distance_frag:My,equirect_vert:Sy,equirect_frag:wy,linedashed_vert:Ey,linedashed_frag:Ty,meshbasic_vert:Ay,meshbasic_frag:Cy,meshlambert_vert:Ry,meshlambert_frag:Iy,meshmatcap_vert:Py,meshmatcap_frag:Ly,meshnormal_vert:Dy,meshnormal_frag:Uy,meshphong_vert:Ny,meshphong_frag:Fy,meshphysical_vert:Oy,meshphysical_frag:ky,meshtoon_vert:By,meshtoon_frag:zy,points_vert:Vy,points_frag:Gy,shadow_vert:Hy,shadow_frag:Wy,sprite_vert:Xy,sprite_frag:$y},Re={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},envMapRotation:{value:new lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},vn={basic:{uniforms:_n([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:mt.meshbasic_vert,fragmentShader:mt.meshbasic_frag},lambert:{uniforms:_n([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Ne(0)},envMapIntensity:{value:1}}]),vertexShader:mt.meshlambert_vert,fragmentShader:mt.meshlambert_frag},phong:{uniforms:_n([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:mt.meshphong_vert,fragmentShader:mt.meshphong_frag},standard:{uniforms:_n([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag},toon:{uniforms:_n([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new Ne(0)}}]),vertexShader:mt.meshtoon_vert,fragmentShader:mt.meshtoon_frag},matcap:{uniforms:_n([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:mt.meshmatcap_vert,fragmentShader:mt.meshmatcap_frag},points:{uniforms:_n([Re.points,Re.fog]),vertexShader:mt.points_vert,fragmentShader:mt.points_frag},dashed:{uniforms:_n([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:mt.linedashed_vert,fragmentShader:mt.linedashed_frag},depth:{uniforms:_n([Re.common,Re.displacementmap]),vertexShader:mt.depth_vert,fragmentShader:mt.depth_frag},normal:{uniforms:_n([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:mt.meshnormal_vert,fragmentShader:mt.meshnormal_frag},sprite:{uniforms:_n([Re.sprite,Re.fog]),vertexShader:mt.sprite_vert,fragmentShader:mt.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:mt.background_vert,fragmentShader:mt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new lt}},vertexShader:mt.backgroundCube_vert,fragmentShader:mt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:mt.cube_vert,fragmentShader:mt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:mt.equirect_vert,fragmentShader:mt.equirect_frag},distance:{uniforms:_n([Re.common,Re.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:mt.distance_vert,fragmentShader:mt.distance_frag},shadow:{uniforms:_n([Re.lights,Re.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:mt.shadow_vert,fragmentShader:mt.shadow_frag}};vn.physical={uniforms:_n([vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag};const bo={r:0,b:0,g:0},qy=new rt,Kp=new lt;Kp.set(-1,0,0,0,1,0,0,0,1);function Yy(r,e,t,n,i,s){const a=new Ne(0);let o=i===!0?0:1,l,c,u=null,h=0,d=null;function f(_){let v=_.isScene===!0?_.background:null;if(v&&v.isTexture){const y=_.backgroundBlurriness>0;v=e.get(v,y)}return v}function g(_){let v=!1;const y=f(_);y===null?m(a,o):y&&y.isColor&&(m(y,1),v=!0);const w=r.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function x(_,v){const y=f(v);y&&(y.isCubeTexture||y.mapping===Sr)?(c===void 0&&(c=new It(new cs(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:Mr(vn.backgroundCube.uniforms),vertexShader:vn.backgroundCube.vertexShader,fragmentShader:vn.backgroundCube.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,M,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(qy.makeRotationFromEuler(v.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Kp),c.material.toneMapped=vt.getTransfer(y.colorSpace)!==At,(u!==y||h!==y.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,u=y,h=y.version,d=r.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new It(new Cr(2,2),new Wn({name:"BackgroundMaterial",uniforms:Mr(vn.background.uniforms),vertexShader:vn.background.vertexShader,fragmentShader:vn.background.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=vt.getTransfer(y.colorSpace)!==At,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||h!==y.version||d!==r.toneMapping)&&(l.material.needsUpdate=!0,u=y,h=y.version,d=r.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function m(_,v){_.getRGB(bo,xp(r)),t.buffers.color.setClear(bo.r,bo.g,bo.b,v,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,v=1){a.set(_),o=v,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,m(a,o)},render:g,addToRenderList:x,dispose:p}}function Zy(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,a=!1;function o(I,B,J,G,U){let O=!1;const V=h(I,G,J,B);s!==V&&(s=V,c(s.object)),O=f(I,G,J,U),O&&g(I,G,J,U),U!==null&&e.update(U,r.ELEMENT_ARRAY_BUFFER),(O||a)&&(a=!1,y(I,B,J,G),U!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return r.createVertexArray()}function c(I){return r.bindVertexArray(I)}function u(I){return r.deleteVertexArray(I)}function h(I,B,J,G){const U=G.wireframe===!0;let O=n[B.id];O===void 0&&(O={},n[B.id]=O);const V=I.isInstancedMesh===!0?I.id:0;let ce=O[V];ce===void 0&&(ce={},O[V]=ce);let me=ce[J.id];me===void 0&&(me={},ce[J.id]=me);let we=me[U];return we===void 0&&(we=d(l()),me[U]=we),we}function d(I){const B=[],J=[],G=[];for(let U=0;U<t;U++)B[U]=0,J[U]=0,G[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:J,attributeDivisors:G,object:I,attributes:{},index:null}}function f(I,B,J,G){const U=s.attributes,O=B.attributes;let V=0;const ce=J.getAttributes();for(const me in ce)if(ce[me].location>=0){const Ie=U[me];let ke=O[me];if(ke===void 0&&(me==="instanceMatrix"&&I.instanceMatrix&&(ke=I.instanceMatrix),me==="instanceColor"&&I.instanceColor&&(ke=I.instanceColor)),Ie===void 0||Ie.attribute!==ke||ke&&Ie.data!==ke.data)return!0;V++}return s.attributesNum!==V||s.index!==G}function g(I,B,J,G){const U={},O=B.attributes;let V=0;const ce=J.getAttributes();for(const me in ce)if(ce[me].location>=0){let Ie=O[me];Ie===void 0&&(me==="instanceMatrix"&&I.instanceMatrix&&(Ie=I.instanceMatrix),me==="instanceColor"&&I.instanceColor&&(Ie=I.instanceColor));const ke={};ke.attribute=Ie,Ie&&Ie.data&&(ke.data=Ie.data),U[me]=ke,V++}s.attributes=U,s.attributesNum=V,s.index=G}function x(){const I=s.newAttributes;for(let B=0,J=I.length;B<J;B++)I[B]=0}function m(I){p(I,0)}function p(I,B){const J=s.newAttributes,G=s.enabledAttributes,U=s.attributeDivisors;J[I]=1,G[I]===0&&(r.enableVertexAttribArray(I),G[I]=1),U[I]!==B&&(r.vertexAttribDivisor(I,B),U[I]=B)}function _(){const I=s.newAttributes,B=s.enabledAttributes;for(let J=0,G=B.length;J<G;J++)B[J]!==I[J]&&(r.disableVertexAttribArray(J),B[J]=0)}function v(I,B,J,G,U,O,V){V===!0?r.vertexAttribIPointer(I,B,J,U,O):r.vertexAttribPointer(I,B,J,G,U,O)}function y(I,B,J,G){x();const U=G.attributes,O=J.getAttributes(),V=B.defaultAttributeValues;for(const ce in O){const me=O[ce];if(me.location>=0){let we=U[ce];if(we===void 0&&(ce==="instanceMatrix"&&I.instanceMatrix&&(we=I.instanceMatrix),ce==="instanceColor"&&I.instanceColor&&(we=I.instanceColor)),we!==void 0){const Ie=we.normalized,ke=we.itemSize,st=e.get(we);if(st===void 0)continue;const oe=st.buffer,$=st.type,F=st.bytesPerElement,K=$===r.INT||$===r.UNSIGNED_INT||we.gpuType===Al;if(we.isInterleavedBufferAttribute){const pe=we.data,Ae=pe.stride,$e=we.offset;if(pe.isInstancedInterleavedBuffer){for(let te=0;te<me.locationSize;te++)p(me.location+te,pe.meshPerAttribute);I.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let te=0;te<me.locationSize;te++)m(me.location+te);r.bindBuffer(r.ARRAY_BUFFER,oe);for(let te=0;te<me.locationSize;te++)v(me.location+te,ke/me.locationSize,$,Ie,Ae*F,($e+ke/me.locationSize*te)*F,K)}else{if(we.isInstancedBufferAttribute){for(let pe=0;pe<me.locationSize;pe++)p(me.location+pe,we.meshPerAttribute);I.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=we.meshPerAttribute*we.count)}else for(let pe=0;pe<me.locationSize;pe++)m(me.location+pe);r.bindBuffer(r.ARRAY_BUFFER,oe);for(let pe=0;pe<me.locationSize;pe++)v(me.location+pe,ke/me.locationSize,$,Ie,ke*F,ke/me.locationSize*pe*F,K)}}else if(V!==void 0){const Ie=V[ce];if(Ie!==void 0)switch(Ie.length){case 2:r.vertexAttrib2fv(me.location,Ie);break;case 3:r.vertexAttrib3fv(me.location,Ie);break;case 4:r.vertexAttrib4fv(me.location,Ie);break;default:r.vertexAttrib1fv(me.location,Ie)}}}}_()}function w(){T();for(const I in n){const B=n[I];for(const J in B){const G=B[J];for(const U in G){const O=G[U];for(const V in O)u(O[V].object),delete O[V];delete G[U]}}delete n[I]}}function M(I){if(n[I.id]===void 0)return;const B=n[I.id];for(const J in B){const G=B[J];for(const U in G){const O=G[U];for(const V in O)u(O[V].object),delete O[V];delete G[U]}}delete n[I.id]}function C(I){for(const B in n){const J=n[B];for(const G in J){const U=J[G];if(U[I.id]===void 0)continue;const O=U[I.id];for(const V in O)u(O[V].object),delete O[V];delete U[I.id]}}}function b(I){for(const B in n){const J=n[B],G=I.isInstancedMesh===!0?I.id:0,U=J[G];if(U!==void 0){for(const O in U){const V=U[O];for(const ce in V)u(V[ce].object),delete V[ce];delete U[O]}delete J[G],Object.keys(J).length===0&&delete n[B]}}}function T(){L(),a=!0,s!==i&&(s=i,c(s.object))}function L(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:T,resetDefaultState:L,dispose:w,releaseStatesOfGeometry:M,releaseStatesOfObject:b,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:_}}function Ky(r,e,t){let n;function i(l){n=l}function s(l,c){r.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(r.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let d=0;for(let f=0;f<u;f++)d+=c[f];t.update(d,n,1)}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Jy(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==bn&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const b=C===wi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==An&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==yn&&!b)}function l(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ce("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ce("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),_=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),v=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=r.getParameter(r.MAX_SAMPLES),M=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:_,maxVaryings:v,maxFragmentUniforms:y,maxSamples:w,samples:M}}function jy(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Qi,o=new lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,p=r.get(h);if(!i||g===null||g.length===0||s&&!m)s?u(null):c();else{const _=s?0:n,v=_*4;let y=p.clippingState||null;l.value=y,y=u(g,d,v,f);for(let w=0;w!==v;++w)y[w]=t[w];p.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,g){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const p=f+x*4,_=d.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,y=f;v!==x;++v,y+=4)a.copy(h[v]).applyMatrix4(_,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}const is=4,Uh=[.125,.215,.35,.446,.526,.582],Es=20,Qy=256,Hr=new Ra,Nh=new Ne;let $c=null,qc=0,Yc=0,Zc=!1;const eb=new R;class bu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:a=256,position:o=eb}=s;$c=this._renderer.getRenderTarget(),qc=this._renderer.getActiveCubeFace(),Yc=this._renderer.getActiveMipmapLevel(),Zc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Oh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget($c,qc,Yc),this._renderer.xr.enabled=Zc,e.scissorTest=!1,cr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Si||e.mapping===ss?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$c=this._renderer.getRenderTarget(),qc=this._renderer.getActiveCubeFace(),Yc=this._renderer.getActiveMipmapLevel(),Zc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ft,minFilter:Ft,generateMipmaps:!1,type:wi,format:bn,colorSpace:da,depthBuffer:!1},i=Fh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fh(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=tb(s)),this._blurMaterial=ib(s,e,t),this._ggxMaterial=nb(s,e,t)}return i}_compileMaterial(e){const t=new It(new ct,e);this._renderer.compile(t,Hr)}_sceneToCubeUV(e,t,n,i,s){const l=new tn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Nh),h.toneMapping=ri,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new It(new cs,new ln({name:"PMREM.Background",side:Mn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let p=!1;const _=e.background;_?_.isColor&&(m.color.copy(_),e.background=null,p=!0):(m.color.copy(Nh),p=!0);for(let v=0;v<6;v++){const y=v%3;y===0?(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[v],s.y,s.z)):y===1?(l.up.set(0,0,c[v]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[v],s.z)):(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[v]));const w=this._cubeSize;cr(i,y*w,v>2?w:0,w,w),h.setRenderTarget(i),p&&h.render(x,l),h.render(e,l)}h.toneMapping=f,h.autoClear=d,e.background=_}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Si||e.mapping===ss;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=kh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Oh());const s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;cr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Hr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=0+c*1.25,f=h*d,{_lodMax:g}=this,x=this._sizeLods[n],m=3*x*(n>g-is?n-g+is:0),p=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,cr(s,m,p,3*x,2*x),i.setRenderTarget(s),i.render(o,Hr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-n,cr(e,m,p,3*x,2*x),i.setRenderTarget(e),i.render(o,Hr)}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&qe("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[i];h.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Es-1),x=s/g,m=isFinite(s)?1+Math.floor(u*x):Es;m>Es&&Ce(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Es}`);const p=[];let _=0;for(let C=0;C<Es;++C){const b=C/x,T=Math.exp(-b*b/2);p.push(T),C===0?_+=T:C<m&&(_+=2*T)}for(let C=0;C<p.length;C++)p[C]=p[C]/_;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;const y=this._sizeLods[i],w=3*y*(i>v-is?i-v+is:0),M=4*(this._cubeSize-y);cr(t,w,M,3*y,2*y),l.setRenderTarget(t),l.render(h,Hr)}}function tb(r){const e=[],t=[],n=[];let i=r;const s=r-is+1+Uh.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>r-is?l=Uh[a-r+is-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,x=3,m=2,p=1,_=new Float32Array(x*g*f),v=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let M=0;M<f;M++){const C=M%3*2/3-1,b=M>2?0:-1,T=[C,b,0,C+2/3,b,0,C+2/3,b+1,0,C,b,0,C+2/3,b+1,0,C,b+1,0];_.set(T,x*g*M),v.set(d,m*g*M);const L=[M,M,M,M,M,M];y.set(L,p*g*M)}const w=new ct;w.setAttribute("position",new Pt(_,x)),w.setAttribute("uv",new Pt(v,m)),w.setAttribute("faceIndex",new Pt(y,p)),n.push(new It(w,null)),i>is&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Fh(r,e,t){const n=new Hn(r,e,t);return n.texture.mapping=Sr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function cr(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function nb(r,e,t){return new Wn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Qy,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:rc(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function ib(r,e,t){const n=new Float32Array(Es),i=new R(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:Es,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:rc(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Oh(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rc(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function kh(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function rc(){return`

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
	`}class gd extends Hn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ea(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new cs(5,5,5),s=new Wn({name:"CubemapFromEquirect",uniforms:Mr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Mn,blending:Mi});s.uniforms.tEquirect.value=t;const a=new It(i,s),o=t.minFilter;return t.minFilter===xi&&(t.minFilter=Ft),new Vp(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}function sb(r){let e=new WeakMap,t=new WeakMap,n=null;function i(d,f=!1){return d==null?null:f?a(d):s(d)}function s(d){if(d&&d.isTexture){const f=d.mapping;if(f===Zr||f===Kr)if(e.has(d)){const g=e.get(d).texture;return o(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const x=new gd(g.height);return x.fromEquirectangularTexture(r,d),e.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,g=f===Zr||f===Kr,x=f===Si||f===ss;if(g||x){let m=t.get(d);const p=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new bu(r)),m=g?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const _=d.image;return g&&_&&_.height>0||x&&_&&l(_)?(n===null&&(n=new bu(r)),m=g?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function o(d,f){return f===Zr?d.mapping=Si:f===Kr&&(d.mapping=ss),d}function l(d){let f=0;const g=6;for(let x=0;x<g;x++)d[x]!==void 0&&f++;return f===g}function c(d){const f=d.target;f.removeEventListener("dispose",c);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function u(d){const f=d.target;f.removeEventListener("dispose",u);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:h}}function rb(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&_l("WebGLRenderer: "+n+" extension not supported."),i}}}function ab(r,e,t,n){const i={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],r.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,g=h.attributes.position;let x=0;if(g===void 0)return;if(f!==null){const _=f.array;x=f.version;for(let v=0,y=_.length;v<y;v+=3){const w=_[v+0],M=_[v+1],C=_[v+2];d.push(w,M,M,C,C,w)}}else{const _=g.array;x=g.version;for(let v=0,y=_.length/3-1;v<y;v+=3){const w=v+0,M=v+1,C=v+2;d.push(w,M,M,C,C,w)}}const m=new(g.count>=65535?Hu:Gu)(d,1);m.version=x;const p=s.get(h);p&&e.remove(p),s.set(h,m)}function u(h){const d=s.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function ob(r,e,t){let n;function i(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){r.drawElements(n,d,s,h*a),t.update(d,n,1)}function c(h,d,f){f!==0&&(r.drawElementsInstanced(n,d,s,h*a,f),t.update(d,n,f))}function u(h,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,f);let x=0;for(let m=0;m<f;m++)x+=d[m];t.update(x,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function lb(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:qe("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function cb(r,e,t){const n=new WeakMap,i=new yt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let T=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",T)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let v=0;f===!0&&(v=1),g===!0&&(v=2),x===!0&&(v=3);let y=o.attributes.position.count*v,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const M=new Float32Array(y*w*4*h),C=new Fl(M,y,w,h);C.type=yn,C.needsUpdate=!0;const b=v*4;for(let L=0;L<h;L++){const I=m[L],B=p[L],J=_[L],G=y*w*4*L;for(let U=0;U<I.count;U++){const O=U*b;f===!0&&(i.fromBufferAttribute(I,U),M[G+O+0]=i.x,M[G+O+1]=i.y,M[G+O+2]=i.z,M[G+O+3]=0),g===!0&&(i.fromBufferAttribute(B,U),M[G+O+4]=i.x,M[G+O+5]=i.y,M[G+O+6]=i.z,M[G+O+7]=0),x===!0&&(i.fromBufferAttribute(J,U),M[G+O+8]=i.x,M[G+O+9]=i.y,M[G+O+10]=i.z,M[G+O+11]=J.itemSize===4?i.w:1)}}d={count:h,texture:C,size:new fe(y,w)},n.set(o,d),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function ub(r,e,t,n,i){let s=new WeakMap;function a(c){const u=i.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return d}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const db={[wu]:"LINEAR_TONE_MAPPING",[Eu]:"REINHARD_TONE_MAPPING",[Tu]:"CINEON_TONE_MAPPING",[Au]:"ACES_FILMIC_TONE_MAPPING",[Ru]:"AGX_TONE_MAPPING",[Iu]:"NEUTRAL_TONE_MAPPING",[Cu]:"CUSTOM_TONE_MAPPING"};function hb(r,e,t,n,i){const s=new Hn(e,t,{type:r,depthBuffer:n,stencilBuffer:i,depthTexture:n?new Ns(e,t):void 0}),a=new Hn(e,t,{type:wi,depthBuffer:!1,stencilBuffer:!1}),o=new ct;o.setAttribute("position",new Ve([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Ve([0,2,0,0,2,0],2));const l=new td({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new It(o,l),u=new Ra(-1,1,1,-1,0,1);let h=null,d=null,f=!1,g,x=null,m=[],p=!1;this.setSize=function(_,v){s.setSize(_,v),a.setSize(_,v);for(let y=0;y<m.length;y++){const w=m[y];w.setSize&&w.setSize(_,v)}},this.setEffects=function(_){m=_,p=m.length>0&&m[0].isRenderPass===!0;const v=s.width,y=s.height;for(let w=0;w<m.length;w++){const M=m[w];M.setSize&&M.setSize(v,y)}},this.begin=function(_,v){if(f||_.toneMapping===ri&&m.length===0)return!1;if(x=v,v!==null){const y=v.width,w=v.height;(s.width!==y||s.height!==w)&&this.setSize(y,w)}return p===!1&&_.setRenderTarget(s),g=_.toneMapping,_.toneMapping=ri,!0},this.hasRenderPass=function(){return p},this.end=function(_,v){_.toneMapping=g,f=!0;let y=s,w=a;for(let M=0;M<m.length;M++){const C=m[M];if(C.enabled!==!1&&(C.render(_,w,y,v),C.needsSwap!==!1)){const b=y;y=w,w=b}}if(h!==_.outputColorSpace||d!==_.toneMapping){h=_.outputColorSpace,d=_.toneMapping,l.defines={},vt.getTransfer(h)===At&&(l.defines.SRGB_TRANSFER="");const M=db[d];M&&(l.defines[M]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,_.setRenderTarget(x),_.render(c,u),x=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const Jp=new kt,Mu=new Ns(1,1),jp=new Fl,Qp=new Ol,em=new Ea,Bh=[],zh=[],Vh=new Float32Array(16),Gh=new Float32Array(9),Hh=new Float32Array(4);function Ir(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Bh[i];if(s===void 0&&(s=new Float32Array(i),Bh[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function jt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Qt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function ac(r,e){let t=zh[e];t===void 0&&(t=new Int32Array(e),zh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function fb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function pb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;r.uniform2fv(this.addr,e),Qt(t,e)}}function mb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(jt(t,e))return;r.uniform3fv(this.addr,e),Qt(t,e)}}function gb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;r.uniform4fv(this.addr,e),Qt(t,e)}}function _b(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Qt(t,e)}else{if(jt(t,n))return;Hh.set(n),r.uniformMatrix2fv(this.addr,!1,Hh),Qt(t,n)}}function vb(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Qt(t,e)}else{if(jt(t,n))return;Gh.set(n),r.uniformMatrix3fv(this.addr,!1,Gh),Qt(t,n)}}function xb(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Qt(t,e)}else{if(jt(t,n))return;Vh.set(n),r.uniformMatrix4fv(this.addr,!1,Vh),Qt(t,n)}}function yb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function bb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;r.uniform2iv(this.addr,e),Qt(t,e)}}function Mb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;r.uniform3iv(this.addr,e),Qt(t,e)}}function Sb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;r.uniform4iv(this.addr,e),Qt(t,e)}}function wb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Eb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;r.uniform2uiv(this.addr,e),Qt(t,e)}}function Tb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;r.uniform3uiv(this.addr,e),Qt(t,e)}}function Ab(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;r.uniform4uiv(this.addr,e),Qt(t,e)}}function Cb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Mu.compareFunction=t.isReversedDepthBuffer()?Nl:Ul,s=Mu):s=Jp,t.setTexture2D(e||s,i)}function Rb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Qp,i)}function Ib(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||em,i)}function Pb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||jp,i)}function Lb(r){switch(r){case 5126:return fb;case 35664:return pb;case 35665:return mb;case 35666:return gb;case 35674:return _b;case 35675:return vb;case 35676:return xb;case 5124:case 35670:return yb;case 35667:case 35671:return bb;case 35668:case 35672:return Mb;case 35669:case 35673:return Sb;case 5125:return wb;case 36294:return Eb;case 36295:return Tb;case 36296:return Ab;case 35678:case 36198:case 36298:case 36306:case 35682:return Cb;case 35679:case 36299:case 36307:return Rb;case 35680:case 36300:case 36308:case 36293:return Ib;case 36289:case 36303:case 36311:case 36292:return Pb}}function Db(r,e){r.uniform1fv(this.addr,e)}function Ub(r,e){const t=Ir(e,this.size,2);r.uniform2fv(this.addr,t)}function Nb(r,e){const t=Ir(e,this.size,3);r.uniform3fv(this.addr,t)}function Fb(r,e){const t=Ir(e,this.size,4);r.uniform4fv(this.addr,t)}function Ob(r,e){const t=Ir(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function kb(r,e){const t=Ir(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Bb(r,e){const t=Ir(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function zb(r,e){r.uniform1iv(this.addr,e)}function Vb(r,e){r.uniform2iv(this.addr,e)}function Gb(r,e){r.uniform3iv(this.addr,e)}function Hb(r,e){r.uniform4iv(this.addr,e)}function Wb(r,e){r.uniform1uiv(this.addr,e)}function Xb(r,e){r.uniform2uiv(this.addr,e)}function $b(r,e){r.uniform3uiv(this.addr,e)}function qb(r,e){r.uniform4uiv(this.addr,e)}function Yb(r,e,t){const n=this.cache,i=e.length,s=ac(t,i);jt(n,s)||(r.uniform1iv(this.addr,s),Qt(n,s));let a;this.type===r.SAMPLER_2D_SHADOW?a=Mu:a=Jp;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,s[o])}function Zb(r,e,t){const n=this.cache,i=e.length,s=ac(t,i);jt(n,s)||(r.uniform1iv(this.addr,s),Qt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Qp,s[a])}function Kb(r,e,t){const n=this.cache,i=e.length,s=ac(t,i);jt(n,s)||(r.uniform1iv(this.addr,s),Qt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||em,s[a])}function Jb(r,e,t){const n=this.cache,i=e.length,s=ac(t,i);jt(n,s)||(r.uniform1iv(this.addr,s),Qt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||jp,s[a])}function jb(r){switch(r){case 5126:return Db;case 35664:return Ub;case 35665:return Nb;case 35666:return Fb;case 35674:return Ob;case 35675:return kb;case 35676:return Bb;case 5124:case 35670:return zb;case 35667:case 35671:return Vb;case 35668:case 35672:return Gb;case 35669:case 35673:return Hb;case 5125:return Wb;case 36294:return Xb;case 36295:return $b;case 36296:return qb;case 35678:case 36198:case 36298:case 36306:case 35682:return Yb;case 35679:case 36299:case 36307:return Zb;case 35680:case 36300:case 36308:case 36293:return Kb;case 36289:case 36303:case 36311:case 36292:return Jb}}class Qb{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Lb(t.type)}}class eM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jb(t.type)}}class tM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const Kc=/(\w+)(\])?(\[|\.)?/g;function Wh(r,e){r.seq.push(e),r.map[e.id]=e}function nM(r,e,t){const n=r.name,i=n.length;for(Kc.lastIndex=0;;){const s=Kc.exec(n),a=Kc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Wh(t,c===void 0?new Qb(o,r,e):new eM(o,r,e));break}else{let h=t.map[o];h===void 0&&(h=new tM(o),Wh(t,h)),t=h}}}class Ro{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);nM(o,l,this)}const i=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Xh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const iM=37297;let sM=0;function rM(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const $h=new lt;function aM(r){vt._getMatrix($h,vt.workingColorSpace,r);const e=`mat3( ${$h.elements.map(t=>t.toFixed(4))} )`;switch(vt.getTransfer(r)){case ha:return[e,"LinearTransferOETF"];case At:return[e,"sRGBTransferOETF"];default:return Ce("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function qh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+rM(r.getShaderSource(e),o)}else return s}function oM(r,e){const t=aM(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const lM={[wu]:"Linear",[Eu]:"Reinhard",[Tu]:"Cineon",[Au]:"ACESFilmic",[Ru]:"AgX",[Iu]:"Neutral",[Cu]:"Custom"};function cM(r,e){const t=lM[e];return t===void 0?(Ce("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Mo=new R;function uM(){vt.getLuminanceCoefficients(Mo);const r=Mo.x.toFixed(4),e=Mo.y.toFixed(4),t=Mo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function dM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qr).join(`
`)}function hM(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function fM(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function qr(r){return r!==""}function Yh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const pM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Su(r){return r.replace(pM,gM)}const mM=new Map;function gM(r,e){let t=mt[e];if(t===void 0){const n=mM.get(e);if(n!==void 0)t=mt[n],Ce('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Su(t)}const _M=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kh(r){return r.replace(_M,vM)}function vM(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Jh(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const xM={[Yr]:"SHADOWMAP_TYPE_PCF",[dr]:"SHADOWMAP_TYPE_VSM"};function yM(r){return xM[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const bM={[Si]:"ENVMAP_TYPE_CUBE",[ss]:"ENVMAP_TYPE_CUBE",[Sr]:"ENVMAP_TYPE_CUBE_UV"};function MM(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":bM[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const SM={[ss]:"ENVMAP_MODE_REFRACTION"};function wM(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":SM[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const EM={[Sa]:"ENVMAP_BLENDING_MULTIPLY",[Df]:"ENVMAP_BLENDING_MIX",[Uf]:"ENVMAP_BLENDING_ADD"};function TM(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":EM[r.combine]||"ENVMAP_BLENDING_NONE"}function AM(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function CM(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=yM(t),c=MM(t),u=wM(t),h=TM(t),d=AM(t),f=dM(t),g=hM(s),x=i.createProgram();let m,p,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(qr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(qr).join(`
`),p.length>0&&(p+=`
`)):(m=[Jh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qr).join(`
`),p=[Jh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ri?"#define TONE_MAPPING":"",t.toneMapping!==ri?mt.tonemapping_pars_fragment:"",t.toneMapping!==ri?cM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",mt.colorspace_pars_fragment,oM("linearToOutputTexel",t.outputColorSpace),uM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qr).join(`
`)),a=Su(a),a=Yh(a,t),a=Zh(a,t),o=Su(o),o=Yh(o,t),o=Zh(o,t),a=Kh(a),o=Kh(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===hu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===hu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=_+m+a,y=_+p+o,w=Xh(i,i.VERTEX_SHADER,v),M=Xh(i,i.FRAGMENT_SHADER,y);i.attachShader(x,w),i.attachShader(x,M),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function C(I){if(r.debug.checkShaderErrors){const B=i.getProgramInfoLog(x)||"",J=i.getShaderInfoLog(w)||"",G=i.getShaderInfoLog(M)||"",U=B.trim(),O=J.trim(),V=G.trim();let ce=!0,me=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(ce=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,x,w,M);else{const we=qh(i,w,"vertex"),Ie=qh(i,M,"fragment");qe("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+U+`
`+we+`
`+Ie)}else U!==""?Ce("WebGLProgram: Program Info Log:",U):(O===""||V==="")&&(me=!1);me&&(I.diagnostics={runnable:ce,programLog:U,vertexShader:{log:O,prefix:m},fragmentShader:{log:V,prefix:p}})}i.deleteShader(w),i.deleteShader(M),b=new Ro(i,x),T=fM(i,x)}let b;this.getUniforms=function(){return b===void 0&&C(this),b};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=i.getProgramParameter(x,iM)),L},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=sM++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=M,this}let RM=0;class IM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new PM(e),t.set(e,n)),n}}class PM{constructor(e){this.id=RM++,this.code=e,this.usedTimes=0}}function LM(r){return r===rs||r===oa||r===la}function DM(r,e,t,n,i,s){const a=new kl,o=new IM,l=new Set,c=[],u=new Map,h=n.logarithmicDepthBuffer;let d=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(b){return l.add(b),b===0?"uv":`uv${b}`}function x(b,T,L,I,B,J){const G=I.fog,U=B.geometry,O=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?I.environment:null,V=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,ce=e.get(b.envMap||O,V),me=ce&&ce.mapping===Sr?ce.image.height:null,we=f[b.type];b.precision!==null&&(d=n.getMaxPrecision(b.precision),d!==b.precision&&Ce("WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const Ie=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ke=Ie!==void 0?Ie.length:0;let st=0;U.morphAttributes.position!==void 0&&(st=1),U.morphAttributes.normal!==void 0&&(st=2),U.morphAttributes.color!==void 0&&(st=3);let oe,$,F,K;if(we){const Q=vn[we];oe=Q.vertexShader,$=Q.fragmentShader}else oe=b.vertexShader,$=b.fragmentShader,o.update(b),F=o.getVertexShaderID(b),K=o.getFragmentShaderID(b);const pe=r.getRenderTarget(),Ae=r.state.buffers.depth.getReversed(),$e=B.isInstancedMesh===!0,te=B.isBatchedMesh===!0,ue=!!b.map,ne=!!b.matcap,se=!!ce,ee=!!b.aoMap,re=!!b.lightMap,ge=!!b.bumpMap,_e=!!b.normalMap,Qe=!!b.displacementMap,N=!!b.emissiveMap,tt=!!b.metalnessMap,Ge=!!b.roughnessMap,et=b.anisotropy>0,ve=b.clearcoat>0,wt=b.dispersion>0,A=b.iridescence>0,S=b.sheen>0,W=b.transmission>0,le=et&&!!b.anisotropyMap,he=ve&&!!b.clearcoatMap,xe=ve&&!!b.clearcoatNormalMap,be=ve&&!!b.clearcoatRoughnessMap,ie=A&&!!b.iridescenceMap,de=A&&!!b.iridescenceThicknessMap,Le=S&&!!b.sheenColorMap,ze=S&&!!b.sheenRoughnessMap,Ee=!!b.specularMap,Me=!!b.specularColorMap,at=!!b.specularIntensityMap,ut=W&&!!b.transmissionMap,xt=W&&!!b.thicknessMap,z=!!b.gradientMap,Se=!!b.alphaMap,ae=b.alphaTest>0,Oe=!!b.alphaHash,Te=!!b.extensions;let D=ri;b.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(D=r.toneMapping);const k={shaderID:we,shaderType:b.type,shaderName:b.name,vertexShader:oe,fragmentShader:$,defines:b.defines,customVertexShaderID:F,customFragmentShaderID:K,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:te,batchingColor:te&&B._colorsTexture!==null,instancing:$e,instancingColor:$e&&B.instanceColor!==null,instancingMorph:$e&&B.morphTexture!==null,outputColorSpace:pe===null?r.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:vt.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:ue,matcap:ne,envMap:se,envMapMode:se&&ce.mapping,envMapCubeUVHeight:me,aoMap:ee,lightMap:re,bumpMap:ge,normalMap:_e,displacementMap:Qe,emissiveMap:N,normalMapObjectSpace:_e&&b.normalMapType===zf,normalMapTangentSpace:_e&&b.normalMapType===ki,packedNormalMap:_e&&b.normalMapType===ki&&LM(b.normalMap.format),metalnessMap:tt,roughnessMap:Ge,anisotropy:et,anisotropyMap:le,clearcoat:ve,clearcoatMap:he,clearcoatNormalMap:xe,clearcoatRoughnessMap:be,dispersion:wt,iridescence:A,iridescenceMap:ie,iridescenceThicknessMap:de,sheen:S,sheenColorMap:Le,sheenRoughnessMap:ze,specularMap:Ee,specularColorMap:Me,specularIntensityMap:at,transmission:W,transmissionMap:ut,thicknessMap:xt,gradientMap:z,opaque:b.transparent===!1&&b.blending===Rs&&b.alphaToCoverage===!1,alphaMap:Se,alphaTest:ae,alphaHash:Oe,combine:b.combine,mapUv:ue&&g(b.map.channel),aoMapUv:ee&&g(b.aoMap.channel),lightMapUv:re&&g(b.lightMap.channel),bumpMapUv:ge&&g(b.bumpMap.channel),normalMapUv:_e&&g(b.normalMap.channel),displacementMapUv:Qe&&g(b.displacementMap.channel),emissiveMapUv:N&&g(b.emissiveMap.channel),metalnessMapUv:tt&&g(b.metalnessMap.channel),roughnessMapUv:Ge&&g(b.roughnessMap.channel),anisotropyMapUv:le&&g(b.anisotropyMap.channel),clearcoatMapUv:he&&g(b.clearcoatMap.channel),clearcoatNormalMapUv:xe&&g(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&g(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&g(b.iridescenceMap.channel),iridescenceThicknessMapUv:de&&g(b.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&g(b.sheenColorMap.channel),sheenRoughnessMapUv:ze&&g(b.sheenRoughnessMap.channel),specularMapUv:Ee&&g(b.specularMap.channel),specularColorMapUv:Me&&g(b.specularColorMap.channel),specularIntensityMapUv:at&&g(b.specularIntensityMap.channel),transmissionMapUv:ut&&g(b.transmissionMap.channel),thicknessMapUv:xt&&g(b.thicknessMap.channel),alphaMapUv:Se&&g(b.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(_e||et),vertexNormals:!!U.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!U.attributes.uv&&(ue||Se),fog:!!G,useFog:b.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||U.attributes.normal===void 0&&_e===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Ae,skinning:B.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:ke,morphTextureStride:st,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:J.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:D,decodeVideoTexture:ue&&b.map.isVideoTexture===!0&&vt.getTransfer(b.map.colorSpace)===At,decodeVideoTextureEmissive:N&&b.emissiveMap.isVideoTexture===!0&&vt.getTransfer(b.emissiveMap.colorSpace)===At,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===_i,flipSided:b.side===Mn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Te&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Te&&b.extensions.multiDraw===!0||te)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return k.vertexUv1s=l.has(1),k.vertexUv2s=l.has(2),k.vertexUv3s=l.has(3),l.clear(),k}function m(b){const T=[];if(b.shaderID?T.push(b.shaderID):(T.push(b.customVertexShaderID),T.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)T.push(L),T.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(p(T,b),_(T,b),T.push(r.outputColorSpace)),T.push(b.customProgramCacheKey),T.join()}function p(b,T){b.push(T.precision),b.push(T.outputColorSpace),b.push(T.envMapMode),b.push(T.envMapCubeUVHeight),b.push(T.mapUv),b.push(T.alphaMapUv),b.push(T.lightMapUv),b.push(T.aoMapUv),b.push(T.bumpMapUv),b.push(T.normalMapUv),b.push(T.displacementMapUv),b.push(T.emissiveMapUv),b.push(T.metalnessMapUv),b.push(T.roughnessMapUv),b.push(T.anisotropyMapUv),b.push(T.clearcoatMapUv),b.push(T.clearcoatNormalMapUv),b.push(T.clearcoatRoughnessMapUv),b.push(T.iridescenceMapUv),b.push(T.iridescenceThicknessMapUv),b.push(T.sheenColorMapUv),b.push(T.sheenRoughnessMapUv),b.push(T.specularMapUv),b.push(T.specularColorMapUv),b.push(T.specularIntensityMapUv),b.push(T.transmissionMapUv),b.push(T.thicknessMapUv),b.push(T.combine),b.push(T.fogExp2),b.push(T.sizeAttenuation),b.push(T.morphTargetsCount),b.push(T.morphAttributeCount),b.push(T.numDirLights),b.push(T.numPointLights),b.push(T.numSpotLights),b.push(T.numSpotLightMaps),b.push(T.numHemiLights),b.push(T.numRectAreaLights),b.push(T.numDirLightShadows),b.push(T.numPointLightShadows),b.push(T.numSpotLightShadows),b.push(T.numSpotLightShadowsWithMaps),b.push(T.numLightProbes),b.push(T.shadowMapType),b.push(T.toneMapping),b.push(T.numClippingPlanes),b.push(T.numClipIntersection),b.push(T.depthPacking)}function _(b,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),b.push(a.mask)}function v(b){const T=f[b.type];let L;if(T){const I=vn[T];L=nc.clone(I.uniforms)}else L=b.uniforms;return L}function y(b,T){let L=u.get(T);return L!==void 0?++L.usedTimes:(L=new CM(r,T,b,i),c.push(L),u.set(T,L)),L}function w(b){if(--b.usedTimes===0){const T=c.indexOf(b);c[T]=c[c.length-1],c.pop(),u.delete(b.cacheKey),b.destroy()}}function M(b){o.remove(b)}function C(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:v,acquireProgram:y,releaseProgram:w,releaseShaderCache:M,programs:c,dispose:C}}function UM(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function NM(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function jh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Qh(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,g,x,m,p){let _=r[e];return _===void 0?(_={id:d.id,object:d,geometry:f,material:g,materialVariant:a(d),groupOrder:x,renderOrder:d.renderOrder,z:m,group:p},r[e]=_):(_.id=d.id,_.object=d,_.geometry=f,_.material=g,_.materialVariant=a(d),_.groupOrder=x,_.renderOrder=d.renderOrder,_.z=m,_.group=p),e++,_}function l(d,f,g,x,m,p){const _=o(d,f,g,x,m,p);g.transmission>0?n.push(_):g.transparent===!0?i.push(_):t.push(_)}function c(d,f,g,x,m,p){const _=o(d,f,g,x,m,p);g.transmission>0?n.unshift(_):g.transparent===!0?i.unshift(_):t.unshift(_)}function u(d,f){t.length>1&&t.sort(d||NM),n.length>1&&n.sort(f||jh),i.length>1&&i.sort(f||jh)}function h(){for(let d=e,f=r.length;d<f;d++){const g=r[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:l,unshift:c,finish:h,sort:u}}function FM(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new Qh,r.set(n,[a])):i>=s.length?(a=new Qh,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function OM(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new Ne};break;case"SpotLight":t={position:new R,direction:new R,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new R,halfWidth:new R,halfHeight:new R};break}return r[e.id]=t,t}}}function kM(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let BM=0;function zM(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function VM(r){const e=new OM,t=kM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);const i=new R,s=new rt,a=new rt;function o(c){let u=0,h=0,d=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,_=0,v=0,y=0,w=0,M=0,C=0;c.sort(zM);for(let T=0,L=c.length;T<L;T++){const I=c[T],B=I.color,J=I.intensity,G=I.distance;let U=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===rs?U=I.shadow.map.texture:U=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=B.r*J,h+=B.g*J,d+=B.b*J;else if(I.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(I.sh.coefficients[O],J);C++}else if(I.isDirectionalLight){const O=e.get(I);if(O.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const V=I.shadow,ce=t.get(I);ce.shadowIntensity=V.intensity,ce.shadowBias=V.bias,ce.shadowNormalBias=V.normalBias,ce.shadowRadius=V.radius,ce.shadowMapSize=V.mapSize,n.directionalShadow[f]=ce,n.directionalShadowMap[f]=U,n.directionalShadowMatrix[f]=I.shadow.matrix,_++}n.directional[f]=O,f++}else if(I.isSpotLight){const O=e.get(I);O.position.setFromMatrixPosition(I.matrixWorld),O.color.copy(B).multiplyScalar(J),O.distance=G,O.coneCos=Math.cos(I.angle),O.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),O.decay=I.decay,n.spot[x]=O;const V=I.shadow;if(I.map&&(n.spotLightMap[w]=I.map,w++,V.updateMatrices(I),I.castShadow&&M++),n.spotLightMatrix[x]=V.matrix,I.castShadow){const ce=t.get(I);ce.shadowIntensity=V.intensity,ce.shadowBias=V.bias,ce.shadowNormalBias=V.normalBias,ce.shadowRadius=V.radius,ce.shadowMapSize=V.mapSize,n.spotShadow[x]=ce,n.spotShadowMap[x]=U,y++}x++}else if(I.isRectAreaLight){const O=e.get(I);O.color.copy(B).multiplyScalar(J),O.halfWidth.set(I.width*.5,0,0),O.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=O,m++}else if(I.isPointLight){const O=e.get(I);if(O.color.copy(I.color).multiplyScalar(I.intensity),O.distance=I.distance,O.decay=I.decay,I.castShadow){const V=I.shadow,ce=t.get(I);ce.shadowIntensity=V.intensity,ce.shadowBias=V.bias,ce.shadowNormalBias=V.normalBias,ce.shadowRadius=V.radius,ce.shadowMapSize=V.mapSize,ce.shadowCameraNear=V.camera.near,ce.shadowCameraFar=V.camera.far,n.pointShadow[g]=ce,n.pointShadowMap[g]=U,n.pointShadowMatrix[g]=I.shadow.matrix,v++}n.point[g]=O,g++}else if(I.isHemisphereLight){const O=e.get(I);O.skyColor.copy(I.color).multiplyScalar(J),O.groundColor.copy(I.groundColor).multiplyScalar(J),n.hemi[p]=O,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Re.LTC_FLOAT_1,n.rectAreaLTC2=Re.LTC_FLOAT_2):(n.rectAreaLTC1=Re.LTC_HALF_1,n.rectAreaLTC2=Re.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const b=n.hash;(b.directionalLength!==f||b.pointLength!==g||b.spotLength!==x||b.rectAreaLength!==m||b.hemiLength!==p||b.numDirectionalShadows!==_||b.numPointShadows!==v||b.numSpotShadows!==y||b.numSpotMaps!==w||b.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+w-M,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=C,b.directionalLength=f,b.pointLength=g,b.spotLength=x,b.rectAreaLength=m,b.hemiLength=p,b.numDirectionalShadows=_,b.numPointShadows=v,b.numSpotShadows=y,b.numSpotMaps=w,b.numLightProbes=C,n.version=BM++)}function l(c,u){let h=0,d=0,f=0,g=0,x=0;const m=u.matrixWorldInverse;for(let p=0,_=c.length;p<_;p++){const v=c[p];if(v.isDirectionalLight){const y=n.directional[h];y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),h++}else if(v.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),f++}else if(v.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),a.identity(),s.copy(v.matrixWorld),s.premultiply(m),a.extractRotation(s),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(v.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){const y=n.hemi[x];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:n}}function ef(r){const e=new VM(r),t=[],n=[],i=[];function s(d){h.camera=d,t.length=0,n.length=0,i.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){i.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const h={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function GM(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new ef(r),e.set(i,[o])):s>=a.length?(o=new ef(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const HM=`void main() {
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
}`,XM=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],$M=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],tf=new rt,Wr=new R,Jc=new R;function qM(r,e,t){let n=new Er;const i=new fe,s=new fe,a=new yt,o=new id,l=new sd,c={},u=t.maxTextureSize,h={[Oi]:Mn,[Mn]:Oi,[_i]:_i},d=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:HM,fragmentShader:WM}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new ct;g.setAttribute("position",new Pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new It(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yr;let p=this.type;this.render=function(M,C,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;this.type===pf&&(Ce("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Yr);const T=r.getRenderTarget(),L=r.getActiveCubeFace(),I=r.getActiveMipmapLevel(),B=r.state;B.setBlending(Mi),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const J=p!==this.type;J&&C.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(U=>U.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,U=M.length;G<U;G++){const O=M[G],V=O.shadow;if(V===void 0){Ce("WebGLShadowMap:",O,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const ce=V.getFrameExtents();i.multiply(ce),s.copy(V.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/ce.x),i.x=s.x*ce.x,V.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/ce.y),i.y=s.y*ce.y,V.mapSize.y=s.y));const me=r.state.buffers.depth.getReversed();if(V.camera._reversedDepth=me,V.map===null||J===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===dr){if(O.isPointLight){Ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Hn(i.x,i.y,{format:rs,type:wi,minFilter:Ft,magFilter:Ft,generateMipmaps:!1}),V.map.texture.name=O.name+".shadowMap",V.map.depthTexture=new Ns(i.x,i.y,yn),V.map.depthTexture.name=O.name+".shadowMapDepth",V.map.depthTexture.format=Ei,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Xt,V.map.depthTexture.magFilter=Xt}else O.isPointLight?(V.map=new gd(i.x),V.map.depthTexture=new op(i.x,Zn)):(V.map=new Hn(i.x,i.y),V.map.depthTexture=new Ns(i.x,i.y,Zn)),V.map.depthTexture.name=O.name+".shadowMap",V.map.depthTexture.format=Ei,this.type===Yr?(V.map.depthTexture.compareFunction=me?Nl:Ul,V.map.depthTexture.minFilter=Ft,V.map.depthTexture.magFilter=Ft):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Xt,V.map.depthTexture.magFilter=Xt);V.camera.updateProjectionMatrix()}const we=V.map.isWebGLCubeRenderTarget?6:1;for(let Ie=0;Ie<we;Ie++){if(V.map.isWebGLCubeRenderTarget)r.setRenderTarget(V.map,Ie),r.clear();else{Ie===0&&(r.setRenderTarget(V.map),r.clear());const ke=V.getViewport(Ie);a.set(s.x*ke.x,s.y*ke.y,s.x*ke.z,s.y*ke.w),B.viewport(a)}if(O.isPointLight){const ke=V.camera,st=V.matrix,oe=O.distance||ke.far;oe!==ke.far&&(ke.far=oe,ke.updateProjectionMatrix()),Wr.setFromMatrixPosition(O.matrixWorld),ke.position.copy(Wr),Jc.copy(ke.position),Jc.add(XM[Ie]),ke.up.copy($M[Ie]),ke.lookAt(Jc),ke.updateMatrixWorld(),st.makeTranslation(-Wr.x,-Wr.y,-Wr.z),tf.multiplyMatrices(ke.projectionMatrix,ke.matrixWorldInverse),V._frustum.setFromProjectionMatrix(tf,ke.coordinateSystem,ke.reversedDepth)}else V.updateMatrices(O);n=V.getFrustum(),y(C,b,V.camera,O,this.type)}V.isPointLightShadow!==!0&&this.type===dr&&_(V,b),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(T,L,I)};function _(M,C){const b=e.update(x);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Hn(i.x,i.y,{format:rs,type:wi})),d.uniforms.shadow_pass.value=M.map.depthTexture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,r.setRenderTarget(M.mapPass),r.clear(),r.renderBufferDirect(C,null,b,d,x,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,r.setRenderTarget(M.map),r.clear(),r.renderBufferDirect(C,null,b,f,x,null)}function v(M,C,b,T){let L=null;const I=b.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(I!==void 0)L=I;else if(L=b.isPointLight===!0?l:o,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const B=L.uuid,J=C.uuid;let G=c[B];G===void 0&&(G={},c[B]=G);let U=G[J];U===void 0&&(U=L.clone(),G[J]=U,C.addEventListener("dispose",w)),L=U}if(L.visible=C.visible,L.wireframe=C.wireframe,T===dr?L.side=C.shadowSide!==null?C.shadowSide:C.side:L.side=C.shadowSide!==null?C.shadowSide:h[C.side],L.alphaMap=C.alphaMap,L.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,L.map=C.map,L.clipShadows=C.clipShadows,L.clippingPlanes=C.clippingPlanes,L.clipIntersection=C.clipIntersection,L.displacementMap=C.displacementMap,L.displacementScale=C.displacementScale,L.displacementBias=C.displacementBias,L.wireframeLinewidth=C.wireframeLinewidth,L.linewidth=C.linewidth,b.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const B=r.properties.get(L);B.light=b}return L}function y(M,C,b,T,L){if(M.visible===!1)return;if(M.layers.test(C.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&L===dr)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,M.matrixWorld);const J=e.update(M),G=M.material;if(Array.isArray(G)){const U=J.groups;for(let O=0,V=U.length;O<V;O++){const ce=U[O],me=G[ce.materialIndex];if(me&&me.visible){const we=v(M,me,T,L);M.onBeforeShadow(r,M,C,b,J,we,ce),r.renderBufferDirect(b,null,J,we,M,ce),M.onAfterShadow(r,M,C,b,J,we,ce)}}}else if(G.visible){const U=v(M,G,T,L);M.onBeforeShadow(r,M,C,b,J,U,null),r.renderBufferDirect(b,null,J,U,M,null),M.onAfterShadow(r,M,C,b,J,U,null)}}const B=M.children;for(let J=0,G=B.length;J<G;J++)y(B[J],C,b,T,L)}function w(M){M.target.removeEventListener("dispose",w);for(const b in c){const T=c[b],L=M.target.uuid;L in T&&(T[L].dispose(),delete T[L])}}}function YM(r,e){function t(){let z=!1;const Se=new yt;let ae=null;const Oe=new yt(0,0,0,0);return{setMask:function(Te){ae!==Te&&!z&&(r.colorMask(Te,Te,Te,Te),ae=Te)},setLocked:function(Te){z=Te},setClear:function(Te,D,k,Q,Pe){Pe===!0&&(Te*=Q,D*=Q,k*=Q),Se.set(Te,D,k,Q),Oe.equals(Se)===!1&&(r.clearColor(Te,D,k,Q),Oe.copy(Se))},reset:function(){z=!1,ae=null,Oe.set(-1,0,0,0)}}}function n(){let z=!1,Se=!1,ae=null,Oe=null,Te=null;return{setReversed:function(D){if(Se!==D){const k=e.get("EXT_clip_control");D?k.clipControlEXT(k.LOWER_LEFT_EXT,k.ZERO_TO_ONE_EXT):k.clipControlEXT(k.LOWER_LEFT_EXT,k.NEGATIVE_ONE_TO_ONE_EXT),Se=D;const Q=Te;Te=null,this.setClear(Q)}},getReversed:function(){return Se},setTest:function(D){D?pe(r.DEPTH_TEST):Ae(r.DEPTH_TEST)},setMask:function(D){ae!==D&&!z&&(r.depthMask(D),ae=D)},setFunc:function(D){if(Se&&(D=fg[D]),Oe!==D){switch(D){case Do:r.depthFunc(r.NEVER);break;case Uo:r.depthFunc(r.ALWAYS);break;case No:r.depthFunc(r.LESS);break;case Ds:r.depthFunc(r.LEQUAL);break;case Fo:r.depthFunc(r.EQUAL);break;case Oo:r.depthFunc(r.GEQUAL);break;case ko:r.depthFunc(r.GREATER);break;case Bo:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Oe=D}},setLocked:function(D){z=D},setClear:function(D){Te!==D&&(Te=D,Se&&(D=1-D),r.clearDepth(D))},reset:function(){z=!1,ae=null,Oe=null,Te=null,Se=!1}}}function i(){let z=!1,Se=null,ae=null,Oe=null,Te=null,D=null,k=null,Q=null,Pe=null;return{setTest:function(De){z||(De?pe(r.STENCIL_TEST):Ae(r.STENCIL_TEST))},setMask:function(De){Se!==De&&!z&&(r.stencilMask(De),Se=De)},setFunc:function(De,ot,gt){(ae!==De||Oe!==ot||Te!==gt)&&(r.stencilFunc(De,ot,gt),ae=De,Oe=ot,Te=gt)},setOp:function(De,ot,gt){(D!==De||k!==ot||Q!==gt)&&(r.stencilOp(De,ot,gt),D=De,k=ot,Q=gt)},setLocked:function(De){z=De},setClear:function(De){Pe!==De&&(r.clearStencil(De),Pe=De)},reset:function(){z=!1,Se=null,ae=null,Oe=null,Te=null,D=null,k=null,Q=null,Pe=null}}}const s=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let u={},h={},d={},f=new WeakMap,g=[],x=null,m=!1,p=null,_=null,v=null,y=null,w=null,M=null,C=null,b=new Ne(0,0,0),T=0,L=!1,I=null,B=null,J=null,G=null,U=null;const O=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,ce=0;const me=r.getParameter(r.VERSION);me.indexOf("WebGL")!==-1?(ce=parseFloat(/^WebGL (\d)/.exec(me)[1]),V=ce>=1):me.indexOf("OpenGL ES")!==-1&&(ce=parseFloat(/^OpenGL ES (\d)/.exec(me)[1]),V=ce>=2);let we=null,Ie={};const ke=r.getParameter(r.SCISSOR_BOX),st=r.getParameter(r.VIEWPORT),oe=new yt().fromArray(ke),$=new yt().fromArray(st);function F(z,Se,ae,Oe){const Te=new Uint8Array(4),D=r.createTexture();r.bindTexture(z,D),r.texParameteri(z,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(z,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let k=0;k<ae;k++)z===r.TEXTURE_3D||z===r.TEXTURE_2D_ARRAY?r.texImage3D(Se,0,r.RGBA,1,1,Oe,0,r.RGBA,r.UNSIGNED_BYTE,Te):r.texImage2D(Se+k,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Te);return D}const K={};K[r.TEXTURE_2D]=F(r.TEXTURE_2D,r.TEXTURE_2D,1),K[r.TEXTURE_CUBE_MAP]=F(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[r.TEXTURE_2D_ARRAY]=F(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),K[r.TEXTURE_3D]=F(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),pe(r.DEPTH_TEST),a.setFunc(Ds),ge(!1),_e(ru),pe(r.CULL_FACE),ee(Mi);function pe(z){u[z]!==!0&&(r.enable(z),u[z]=!0)}function Ae(z){u[z]!==!1&&(r.disable(z),u[z]=!1)}function $e(z,Se){return d[z]!==Se?(r.bindFramebuffer(z,Se),d[z]=Se,z===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=Se),z===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=Se),!0):!1}function te(z,Se){let ae=g,Oe=!1;if(z){ae=f.get(Se),ae===void 0&&(ae=[],f.set(Se,ae));const Te=z.textures;if(ae.length!==Te.length||ae[0]!==r.COLOR_ATTACHMENT0){for(let D=0,k=Te.length;D<k;D++)ae[D]=r.COLOR_ATTACHMENT0+D;ae.length=Te.length,Oe=!0}}else ae[0]!==r.BACK&&(ae[0]=r.BACK,Oe=!0);Oe&&r.drawBuffers(ae)}function ue(z){return x!==z?(r.useProgram(z),x=z,!0):!1}const ne={[es]:r.FUNC_ADD,[gf]:r.FUNC_SUBTRACT,[_f]:r.FUNC_REVERSE_SUBTRACT};ne[vf]=r.MIN,ne[xf]=r.MAX;const se={[yf]:r.ZERO,[bf]:r.ONE,[Mf]:r.SRC_COLOR,[Po]:r.SRC_ALPHA,[Cf]:r.SRC_ALPHA_SATURATE,[Tf]:r.DST_COLOR,[wf]:r.DST_ALPHA,[Sf]:r.ONE_MINUS_SRC_COLOR,[Lo]:r.ONE_MINUS_SRC_ALPHA,[Af]:r.ONE_MINUS_DST_COLOR,[Ef]:r.ONE_MINUS_DST_ALPHA,[Rf]:r.CONSTANT_COLOR,[If]:r.ONE_MINUS_CONSTANT_COLOR,[Pf]:r.CONSTANT_ALPHA,[Lf]:r.ONE_MINUS_CONSTANT_ALPHA};function ee(z,Se,ae,Oe,Te,D,k,Q,Pe,De){if(z===Mi){m===!0&&(Ae(r.BLEND),m=!1);return}if(m===!1&&(pe(r.BLEND),m=!0),z!==mf){if(z!==p||De!==L){if((_!==es||w!==es)&&(r.blendEquation(r.FUNC_ADD),_=es,w=es),De)switch(z){case Rs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case au:r.blendFunc(r.ONE,r.ONE);break;case ou:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case lu:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:qe("WebGLState: Invalid blending: ",z);break}else switch(z){case Rs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case au:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case ou:qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case lu:qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qe("WebGLState: Invalid blending: ",z);break}v=null,y=null,M=null,C=null,b.set(0,0,0),T=0,p=z,L=De}return}Te=Te||Se,D=D||ae,k=k||Oe,(Se!==_||Te!==w)&&(r.blendEquationSeparate(ne[Se],ne[Te]),_=Se,w=Te),(ae!==v||Oe!==y||D!==M||k!==C)&&(r.blendFuncSeparate(se[ae],se[Oe],se[D],se[k]),v=ae,y=Oe,M=D,C=k),(Q.equals(b)===!1||Pe!==T)&&(r.blendColor(Q.r,Q.g,Q.b,Pe),b.copy(Q),T=Pe),p=z,L=!1}function re(z,Se){z.side===_i?Ae(r.CULL_FACE):pe(r.CULL_FACE);let ae=z.side===Mn;Se&&(ae=!ae),ge(ae),z.blending===Rs&&z.transparent===!1?ee(Mi):ee(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),s.setMask(z.colorWrite);const Oe=z.stencilWrite;o.setTest(Oe),Oe&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),N(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?pe(r.SAMPLE_ALPHA_TO_COVERAGE):Ae(r.SAMPLE_ALPHA_TO_COVERAGE)}function ge(z){I!==z&&(z?r.frontFace(r.CW):r.frontFace(r.CCW),I=z)}function _e(z){z!==hf?(pe(r.CULL_FACE),z!==B&&(z===ru?r.cullFace(r.BACK):z===ff?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ae(r.CULL_FACE),B=z}function Qe(z){z!==J&&(V&&r.lineWidth(z),J=z)}function N(z,Se,ae){z?(pe(r.POLYGON_OFFSET_FILL),(G!==Se||U!==ae)&&(G=Se,U=ae,a.getReversed()&&(Se=-Se),r.polygonOffset(Se,ae))):Ae(r.POLYGON_OFFSET_FILL)}function tt(z){z?pe(r.SCISSOR_TEST):Ae(r.SCISSOR_TEST)}function Ge(z){z===void 0&&(z=r.TEXTURE0+O-1),we!==z&&(r.activeTexture(z),we=z)}function et(z,Se,ae){ae===void 0&&(we===null?ae=r.TEXTURE0+O-1:ae=we);let Oe=Ie[ae];Oe===void 0&&(Oe={type:void 0,texture:void 0},Ie[ae]=Oe),(Oe.type!==z||Oe.texture!==Se)&&(we!==ae&&(r.activeTexture(ae),we=ae),r.bindTexture(z,Se||K[z]),Oe.type=z,Oe.texture=Se)}function ve(){const z=Ie[we];z!==void 0&&z.type!==void 0&&(r.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function wt(){try{r.compressedTexImage2D(...arguments)}catch(z){qe("WebGLState:",z)}}function A(){try{r.compressedTexImage3D(...arguments)}catch(z){qe("WebGLState:",z)}}function S(){try{r.texSubImage2D(...arguments)}catch(z){qe("WebGLState:",z)}}function W(){try{r.texSubImage3D(...arguments)}catch(z){qe("WebGLState:",z)}}function le(){try{r.compressedTexSubImage2D(...arguments)}catch(z){qe("WebGLState:",z)}}function he(){try{r.compressedTexSubImage3D(...arguments)}catch(z){qe("WebGLState:",z)}}function xe(){try{r.texStorage2D(...arguments)}catch(z){qe("WebGLState:",z)}}function be(){try{r.texStorage3D(...arguments)}catch(z){qe("WebGLState:",z)}}function ie(){try{r.texImage2D(...arguments)}catch(z){qe("WebGLState:",z)}}function de(){try{r.texImage3D(...arguments)}catch(z){qe("WebGLState:",z)}}function Le(z){return h[z]!==void 0?h[z]:r.getParameter(z)}function ze(z,Se){h[z]!==Se&&(r.pixelStorei(z,Se),h[z]=Se)}function Ee(z){oe.equals(z)===!1&&(r.scissor(z.x,z.y,z.z,z.w),oe.copy(z))}function Me(z){$.equals(z)===!1&&(r.viewport(z.x,z.y,z.z,z.w),$.copy(z))}function at(z,Se){let ae=c.get(Se);ae===void 0&&(ae=new WeakMap,c.set(Se,ae));let Oe=ae.get(z);Oe===void 0&&(Oe=r.getUniformBlockIndex(Se,z.name),ae.set(z,Oe))}function ut(z,Se){const Oe=c.get(Se).get(z);l.get(Se)!==Oe&&(r.uniformBlockBinding(Se,Oe,z.__bindingPointIndex),l.set(Se,Oe))}function xt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),u={},h={},we=null,Ie={},d={},f=new WeakMap,g=[],x=null,m=!1,p=null,_=null,v=null,y=null,w=null,M=null,C=null,b=new Ne(0,0,0),T=0,L=!1,I=null,B=null,J=null,G=null,U=null,oe.set(0,0,r.canvas.width,r.canvas.height),$.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:pe,disable:Ae,bindFramebuffer:$e,drawBuffers:te,useProgram:ue,setBlending:ee,setMaterial:re,setFlipSided:ge,setCullFace:_e,setLineWidth:Qe,setPolygonOffset:N,setScissorTest:tt,activeTexture:Ge,bindTexture:et,unbindTexture:ve,compressedTexImage2D:wt,compressedTexImage3D:A,texImage2D:ie,texImage3D:de,pixelStorei:ze,getParameter:Le,updateUBOMapping:at,uniformBlockBinding:ut,texStorage2D:xe,texStorage3D:be,texSubImage2D:S,texSubImage3D:W,compressedTexSubImage2D:le,compressedTexSubImage3D:he,scissor:Ee,viewport:Me,reset:xt}}function ZM(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new fe,u=new WeakMap,h=new Set;let d;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,S){return g?new OffscreenCanvas(A,S):pa("canvas")}function m(A,S,W){let le=1;const he=wt(A);if((he.width>W||he.height>W)&&(le=W/Math.max(he.width,he.height)),le<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const xe=Math.floor(le*he.width),be=Math.floor(le*he.height);d===void 0&&(d=x(xe,be));const ie=S?x(xe,be):d;return ie.width=xe,ie.height=be,ie.getContext("2d").drawImage(A,0,0,xe,be),Ce("WebGLRenderer: Texture has been resized from ("+he.width+"x"+he.height+") to ("+xe+"x"+be+")."),ie}else return"data"in A&&Ce("WebGLRenderer: Image in DataTexture is too big ("+he.width+"x"+he.height+")."),A;return A}function p(A){return A.generateMipmaps}function _(A){r.generateMipmap(A)}function v(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(A,S,W,le,he,xe=!1){if(A!==null){if(r[A]!==void 0)return r[A];Ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let be;le&&(be=e.get("EXT_texture_norm16"),be||Ce("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ie=S;if(S===r.RED&&(W===r.FLOAT&&(ie=r.R32F),W===r.HALF_FLOAT&&(ie=r.R16F),W===r.UNSIGNED_BYTE&&(ie=r.R8),W===r.UNSIGNED_SHORT&&be&&(ie=be.R16_EXT),W===r.SHORT&&be&&(ie=be.R16_SNORM_EXT)),S===r.RED_INTEGER&&(W===r.UNSIGNED_BYTE&&(ie=r.R8UI),W===r.UNSIGNED_SHORT&&(ie=r.R16UI),W===r.UNSIGNED_INT&&(ie=r.R32UI),W===r.BYTE&&(ie=r.R8I),W===r.SHORT&&(ie=r.R16I),W===r.INT&&(ie=r.R32I)),S===r.RG&&(W===r.FLOAT&&(ie=r.RG32F),W===r.HALF_FLOAT&&(ie=r.RG16F),W===r.UNSIGNED_BYTE&&(ie=r.RG8),W===r.UNSIGNED_SHORT&&be&&(ie=be.RG16_EXT),W===r.SHORT&&be&&(ie=be.RG16_SNORM_EXT)),S===r.RG_INTEGER&&(W===r.UNSIGNED_BYTE&&(ie=r.RG8UI),W===r.UNSIGNED_SHORT&&(ie=r.RG16UI),W===r.UNSIGNED_INT&&(ie=r.RG32UI),W===r.BYTE&&(ie=r.RG8I),W===r.SHORT&&(ie=r.RG16I),W===r.INT&&(ie=r.RG32I)),S===r.RGB_INTEGER&&(W===r.UNSIGNED_BYTE&&(ie=r.RGB8UI),W===r.UNSIGNED_SHORT&&(ie=r.RGB16UI),W===r.UNSIGNED_INT&&(ie=r.RGB32UI),W===r.BYTE&&(ie=r.RGB8I),W===r.SHORT&&(ie=r.RGB16I),W===r.INT&&(ie=r.RGB32I)),S===r.RGBA_INTEGER&&(W===r.UNSIGNED_BYTE&&(ie=r.RGBA8UI),W===r.UNSIGNED_SHORT&&(ie=r.RGBA16UI),W===r.UNSIGNED_INT&&(ie=r.RGBA32UI),W===r.BYTE&&(ie=r.RGBA8I),W===r.SHORT&&(ie=r.RGBA16I),W===r.INT&&(ie=r.RGBA32I)),S===r.RGB&&(W===r.UNSIGNED_SHORT&&be&&(ie=be.RGB16_EXT),W===r.SHORT&&be&&(ie=be.RGB16_SNORM_EXT),W===r.UNSIGNED_INT_5_9_9_9_REV&&(ie=r.RGB9_E5),W===r.UNSIGNED_INT_10F_11F_11F_REV&&(ie=r.R11F_G11F_B10F)),S===r.RGBA){const de=xe?ha:vt.getTransfer(he);W===r.FLOAT&&(ie=r.RGBA32F),W===r.HALF_FLOAT&&(ie=r.RGBA16F),W===r.UNSIGNED_BYTE&&(ie=de===At?r.SRGB8_ALPHA8:r.RGBA8),W===r.UNSIGNED_SHORT&&be&&(ie=be.RGBA16_EXT),W===r.SHORT&&be&&(ie=be.RGBA16_SNORM_EXT),W===r.UNSIGNED_SHORT_4_4_4_4&&(ie=r.RGBA4),W===r.UNSIGNED_SHORT_5_5_5_1&&(ie=r.RGB5_A1)}return(ie===r.R16F||ie===r.R32F||ie===r.RG16F||ie===r.RG32F||ie===r.RGBA16F||ie===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function w(A,S){let W;return A?S===null||S===Zn||S===vr?W=r.DEPTH24_STENCIL8:S===yn?W=r.DEPTH32F_STENCIL8:S===_r&&(W=r.DEPTH24_STENCIL8,Ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Zn||S===vr?W=r.DEPTH_COMPONENT24:S===yn?W=r.DEPTH_COMPONENT32F:S===_r&&(W=r.DEPTH_COMPONENT16),W}function M(A,S){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Xt&&A.minFilter!==Ft?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function C(A){const S=A.target;S.removeEventListener("dispose",C),T(S),S.isVideoTexture&&u.delete(S),S.isHTMLTexture&&h.delete(S)}function b(A){const S=A.target;S.removeEventListener("dispose",b),I(S)}function T(A){const S=n.get(A);if(S.__webglInit===void 0)return;const W=A.source,le=f.get(W);if(le){const he=le[S.__cacheKey];he.usedTimes--,he.usedTimes===0&&L(A),Object.keys(le).length===0&&f.delete(W)}n.remove(A)}function L(A){const S=n.get(A);r.deleteTexture(S.__webglTexture);const W=A.source,le=f.get(W);delete le[S.__cacheKey],a.memory.textures--}function I(A){const S=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let le=0;le<6;le++){if(Array.isArray(S.__webglFramebuffer[le]))for(let he=0;he<S.__webglFramebuffer[le].length;he++)r.deleteFramebuffer(S.__webglFramebuffer[le][he]);else r.deleteFramebuffer(S.__webglFramebuffer[le]);S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer[le])}else{if(Array.isArray(S.__webglFramebuffer))for(let le=0;le<S.__webglFramebuffer.length;le++)r.deleteFramebuffer(S.__webglFramebuffer[le]);else r.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&r.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let le=0;le<S.__webglColorRenderbuffer.length;le++)S.__webglColorRenderbuffer[le]&&r.deleteRenderbuffer(S.__webglColorRenderbuffer[le]);S.__webglDepthRenderbuffer&&r.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const W=A.textures;for(let le=0,he=W.length;le<he;le++){const xe=n.get(W[le]);xe.__webglTexture&&(r.deleteTexture(xe.__webglTexture),a.memory.textures--),n.remove(W[le])}n.remove(A)}let B=0;function J(){B=0}function G(){return B}function U(A){B=A}function O(){const A=B;return A>=i.maxTextures&&Ce("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),B+=1,A}function V(A){const S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function ce(A,S){const W=n.get(A);if(A.isVideoTexture&&et(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&W.__version!==A.version){const le=A.image;if(le===null)Ce("WebGLRenderer: Texture marked for update but no image data found.");else if(le.complete===!1)Ce("WebGLRenderer: Texture marked for update but image is incomplete");else{Ae(W,A,S);return}}else A.isExternalTexture&&(W.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,W.__webglTexture,r.TEXTURE0+S)}function me(A,S){const W=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version){Ae(W,A,S);return}else A.isExternalTexture&&(W.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,W.__webglTexture,r.TEXTURE0+S)}function we(A,S){const W=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version){Ae(W,A,S);return}t.bindTexture(r.TEXTURE_3D,W.__webglTexture,r.TEXTURE0+S)}function Ie(A,S){const W=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&W.__version!==A.version){$e(W,A,S);return}t.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture,r.TEXTURE0+S)}const ke={[ra]:r.REPEAT,[In]:r.CLAMP_TO_EDGE,[aa]:r.MIRRORED_REPEAT},st={[Xt]:r.NEAREST,[Pu]:r.NEAREST_MIPMAP_NEAREST,[hr]:r.NEAREST_MIPMAP_LINEAR,[Ft]:r.LINEAR,[Jr]:r.LINEAR_MIPMAP_NEAREST,[xi]:r.LINEAR_MIPMAP_LINEAR},oe={[Vf]:r.NEVER,[$f]:r.ALWAYS,[Gf]:r.LESS,[Ul]:r.LEQUAL,[Hf]:r.EQUAL,[Nl]:r.GEQUAL,[Wf]:r.GREATER,[Xf]:r.NOTEQUAL};function $(A,S){if(S.type===yn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Ft||S.magFilter===Jr||S.magFilter===hr||S.magFilter===xi||S.minFilter===Ft||S.minFilter===Jr||S.minFilter===hr||S.minFilter===xi)&&Ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,ke[S.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,ke[S.wrapT]),(A===r.TEXTURE_3D||A===r.TEXTURE_2D_ARRAY)&&r.texParameteri(A,r.TEXTURE_WRAP_R,ke[S.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,st[S.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,st[S.minFilter]),S.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,oe[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Xt||S.minFilter!==hr&&S.minFilter!==xi||S.type===yn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");r.texParameterf(A,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function F(A,S){let W=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",C));const le=S.source;let he=f.get(le);he===void 0&&(he={},f.set(le,he));const xe=V(S);if(xe!==A.__cacheKey){he[xe]===void 0&&(he[xe]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,W=!0),he[xe].usedTimes++;const be=he[A.__cacheKey];be!==void 0&&(he[A.__cacheKey].usedTimes--,be.usedTimes===0&&L(S)),A.__cacheKey=xe,A.__webglTexture=he[xe].texture}return W}function K(A,S,W){return Math.floor(Math.floor(A/W)/S)}function pe(A,S,W,le){const xe=A.updateRanges;if(xe.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,S.width,S.height,W,le,S.data);else{xe.sort((ze,Ee)=>ze.start-Ee.start);let be=0;for(let ze=1;ze<xe.length;ze++){const Ee=xe[be],Me=xe[ze],at=Ee.start+Ee.count,ut=K(Me.start,S.width,4),xt=K(Ee.start,S.width,4);Me.start<=at+1&&ut===xt&&K(Me.start+Me.count-1,S.width,4)===ut?Ee.count=Math.max(Ee.count,Me.start+Me.count-Ee.start):(++be,xe[be]=Me)}xe.length=be+1;const ie=t.getParameter(r.UNPACK_ROW_LENGTH),de=t.getParameter(r.UNPACK_SKIP_PIXELS),Le=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,S.width);for(let ze=0,Ee=xe.length;ze<Ee;ze++){const Me=xe[ze],at=Math.floor(Me.start/4),ut=Math.ceil(Me.count/4),xt=at%S.width,z=Math.floor(at/S.width),Se=ut,ae=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,xt),t.pixelStorei(r.UNPACK_SKIP_ROWS,z),t.texSubImage2D(r.TEXTURE_2D,0,xt,z,Se,ae,W,le,S.data)}A.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,ie),t.pixelStorei(r.UNPACK_SKIP_PIXELS,de),t.pixelStorei(r.UNPACK_SKIP_ROWS,Le)}}function Ae(A,S,W){let le=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(le=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(le=r.TEXTURE_3D);const he=F(A,S),xe=S.source;t.bindTexture(le,A.__webglTexture,r.TEXTURE0+W);const be=n.get(xe);if(xe.version!==be.__version||he===!0){if(t.activeTexture(r.TEXTURE0+W),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){const ae=vt.getPrimaries(vt.workingColorSpace),Oe=S.colorSpace===Di?null:vt.getPrimaries(S.colorSpace),Te=S.colorSpace===Di||ae===Oe?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te)}t.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment);let de=m(S.image,!1,i.maxTextureSize);de=ve(S,de);const Le=s.convert(S.format,S.colorSpace),ze=s.convert(S.type);let Ee=y(S.internalFormat,Le,ze,S.normalized,S.colorSpace,S.isVideoTexture);$(le,S);let Me;const at=S.mipmaps,ut=S.isVideoTexture!==!0,xt=be.__version===void 0||he===!0,z=xe.dataReady,Se=M(S,de);if(S.isDepthTexture)Ee=w(S.format===ts,S.type),xt&&(ut?t.texStorage2D(r.TEXTURE_2D,1,Ee,de.width,de.height):t.texImage2D(r.TEXTURE_2D,0,Ee,de.width,de.height,0,Le,ze,null));else if(S.isDataTexture)if(at.length>0){ut&&xt&&t.texStorage2D(r.TEXTURE_2D,Se,Ee,at[0].width,at[0].height);for(let ae=0,Oe=at.length;ae<Oe;ae++)Me=at[ae],ut?z&&t.texSubImage2D(r.TEXTURE_2D,ae,0,0,Me.width,Me.height,Le,ze,Me.data):t.texImage2D(r.TEXTURE_2D,ae,Ee,Me.width,Me.height,0,Le,ze,Me.data);S.generateMipmaps=!1}else ut?(xt&&t.texStorage2D(r.TEXTURE_2D,Se,Ee,de.width,de.height),z&&pe(S,de,Le,ze)):t.texImage2D(r.TEXTURE_2D,0,Ee,de.width,de.height,0,Le,ze,de.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){ut&&xt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Se,Ee,at[0].width,at[0].height,de.depth);for(let ae=0,Oe=at.length;ae<Oe;ae++)if(Me=at[ae],S.format!==bn)if(Le!==null)if(ut){if(z)if(S.layerUpdates.size>0){const Te=yu(Me.width,Me.height,S.format,S.type);for(const D of S.layerUpdates){const k=Me.data.subarray(D*Te/Me.data.BYTES_PER_ELEMENT,(D+1)*Te/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ae,0,0,D,Me.width,Me.height,1,Le,k)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ae,0,0,0,Me.width,Me.height,de.depth,Le,Me.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ae,Ee,Me.width,Me.height,de.depth,0,Me.data,0,0);else Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ut?z&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,ae,0,0,0,Me.width,Me.height,de.depth,Le,ze,Me.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ae,Ee,Me.width,Me.height,de.depth,0,Le,ze,Me.data)}else{ut&&xt&&t.texStorage2D(r.TEXTURE_2D,Se,Ee,at[0].width,at[0].height);for(let ae=0,Oe=at.length;ae<Oe;ae++)Me=at[ae],S.format!==bn?Le!==null?ut?z&&t.compressedTexSubImage2D(r.TEXTURE_2D,ae,0,0,Me.width,Me.height,Le,Me.data):t.compressedTexImage2D(r.TEXTURE_2D,ae,Ee,Me.width,Me.height,0,Me.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ut?z&&t.texSubImage2D(r.TEXTURE_2D,ae,0,0,Me.width,Me.height,Le,ze,Me.data):t.texImage2D(r.TEXTURE_2D,ae,Ee,Me.width,Me.height,0,Le,ze,Me.data)}else if(S.isDataArrayTexture)if(ut){if(xt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Se,Ee,de.width,de.height,de.depth),z)if(S.layerUpdates.size>0){const ae=yu(de.width,de.height,S.format,S.type);for(const Oe of S.layerUpdates){const Te=de.data.subarray(Oe*ae/de.data.BYTES_PER_ELEMENT,(Oe+1)*ae/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Oe,de.width,de.height,1,Le,ze,Te)}S.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,Le,ze,de.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ee,de.width,de.height,de.depth,0,Le,ze,de.data);else if(S.isData3DTexture)ut?(xt&&t.texStorage3D(r.TEXTURE_3D,Se,Ee,de.width,de.height,de.depth),z&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,Le,ze,de.data)):t.texImage3D(r.TEXTURE_3D,0,Ee,de.width,de.height,de.depth,0,Le,ze,de.data);else if(S.isFramebufferTexture){if(xt)if(ut)t.texStorage2D(r.TEXTURE_2D,Se,Ee,de.width,de.height);else{let ae=de.width,Oe=de.height;for(let Te=0;Te<Se;Te++)t.texImage2D(r.TEXTURE_2D,Te,Ee,ae,Oe,0,Le,ze,null),ae>>=1,Oe>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in r){const ae=r.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),de.parentNode!==ae){ae.appendChild(de),h.add(S),ae.onpaint=Q=>{const Pe=Q.changedElements;for(const De of h)Pe.includes(De.image)&&(De.needsUpdate=!0)},ae.requestPaint();return}const Oe=0,Te=r.RGBA,D=r.RGBA,k=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,Oe,Te,D,k,de),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(at.length>0){if(ut&&xt){const ae=wt(at[0]);t.texStorage2D(r.TEXTURE_2D,Se,Ee,ae.width,ae.height)}for(let ae=0,Oe=at.length;ae<Oe;ae++)Me=at[ae],ut?z&&t.texSubImage2D(r.TEXTURE_2D,ae,0,0,Le,ze,Me):t.texImage2D(r.TEXTURE_2D,ae,Ee,Le,ze,Me);S.generateMipmaps=!1}else if(ut){if(xt){const ae=wt(de);t.texStorage2D(r.TEXTURE_2D,Se,Ee,ae.width,ae.height)}z&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Le,ze,de)}else t.texImage2D(r.TEXTURE_2D,0,Ee,Le,ze,de);p(S)&&_(le),be.__version=xe.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function $e(A,S,W){if(S.image.length!==6)return;const le=F(A,S),he=S.source;t.bindTexture(r.TEXTURE_CUBE_MAP,A.__webglTexture,r.TEXTURE0+W);const xe=n.get(he);if(he.version!==xe.__version||le===!0){t.activeTexture(r.TEXTURE0+W);const be=vt.getPrimaries(vt.workingColorSpace),ie=S.colorSpace===Di?null:vt.getPrimaries(S.colorSpace),de=S.colorSpace===Di||be===ie?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Le=S.isCompressedTexture||S.image[0].isCompressedTexture,ze=S.image[0]&&S.image[0].isDataTexture,Ee=[];for(let D=0;D<6;D++)!Le&&!ze?Ee[D]=m(S.image[D],!0,i.maxCubemapSize):Ee[D]=ze?S.image[D].image:S.image[D],Ee[D]=ve(S,Ee[D]);const Me=Ee[0],at=s.convert(S.format,S.colorSpace),ut=s.convert(S.type),xt=y(S.internalFormat,at,ut,S.normalized,S.colorSpace),z=S.isVideoTexture!==!0,Se=xe.__version===void 0||le===!0,ae=he.dataReady;let Oe=M(S,Me);$(r.TEXTURE_CUBE_MAP,S);let Te;if(Le){z&&Se&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Oe,xt,Me.width,Me.height);for(let D=0;D<6;D++){Te=Ee[D].mipmaps;for(let k=0;k<Te.length;k++){const Q=Te[k];S.format!==bn?at!==null?z?ae&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,k,0,0,Q.width,Q.height,at,Q.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,k,xt,Q.width,Q.height,0,Q.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,k,0,0,Q.width,Q.height,at,ut,Q.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,k,xt,Q.width,Q.height,0,at,ut,Q.data)}}}else{if(Te=S.mipmaps,z&&Se){Te.length>0&&Oe++;const D=wt(Ee[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Oe,xt,D.width,D.height)}for(let D=0;D<6;D++)if(ze){z?ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,0,0,Ee[D].width,Ee[D].height,at,ut,Ee[D].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,xt,Ee[D].width,Ee[D].height,0,at,ut,Ee[D].data);for(let k=0;k<Te.length;k++){const Pe=Te[k].image[D].image;z?ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,k+1,0,0,Pe.width,Pe.height,at,ut,Pe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,k+1,xt,Pe.width,Pe.height,0,at,ut,Pe.data)}}else{z?ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,0,0,at,ut,Ee[D]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,xt,at,ut,Ee[D]);for(let k=0;k<Te.length;k++){const Q=Te[k];z?ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,k+1,0,0,at,ut,Q.image[D]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,k+1,xt,at,ut,Q.image[D])}}}p(S)&&_(r.TEXTURE_CUBE_MAP),xe.__version=he.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function te(A,S,W,le,he,xe){const be=s.convert(W.format,W.colorSpace),ie=s.convert(W.type),de=y(W.internalFormat,be,ie,W.normalized,W.colorSpace),Le=n.get(S),ze=n.get(W);if(ze.__renderTarget=S,!Le.__hasExternalTextures){const Ee=Math.max(1,S.width>>xe),Me=Math.max(1,S.height>>xe);he===r.TEXTURE_3D||he===r.TEXTURE_2D_ARRAY?t.texImage3D(he,xe,de,Ee,Me,S.depth,0,be,ie,null):t.texImage2D(he,xe,de,Ee,Me,0,be,ie,null)}t.bindFramebuffer(r.FRAMEBUFFER,A),Ge(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,le,he,ze.__webglTexture,0,tt(S)):(he===r.TEXTURE_2D||he>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&he<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,le,he,ze.__webglTexture,xe),t.bindFramebuffer(r.FRAMEBUFFER,null)}function ue(A,S,W){if(r.bindRenderbuffer(r.RENDERBUFFER,A),S.depthBuffer){const le=S.depthTexture,he=le&&le.isDepthTexture?le.type:null,xe=w(S.stencilBuffer,he),be=S.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Ge(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,tt(S),xe,S.width,S.height):W?r.renderbufferStorageMultisample(r.RENDERBUFFER,tt(S),xe,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,xe,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,be,r.RENDERBUFFER,A)}else{const le=S.textures;for(let he=0;he<le.length;he++){const xe=le[he],be=s.convert(xe.format,xe.colorSpace),ie=s.convert(xe.type),de=y(xe.internalFormat,be,ie,xe.normalized,xe.colorSpace);Ge(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,tt(S),de,S.width,S.height):W?r.renderbufferStorageMultisample(r.RENDERBUFFER,tt(S),de,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,de,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ne(A,S,W){const le=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const he=n.get(S.depthTexture);if(he.__renderTarget=S,(!he.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),le){if(he.__webglInit===void 0&&(he.__webglInit=!0,S.depthTexture.addEventListener("dispose",C)),he.__webglTexture===void 0){he.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,he.__webglTexture),$(r.TEXTURE_CUBE_MAP,S.depthTexture);const Le=s.convert(S.depthTexture.format),ze=s.convert(S.depthTexture.type);let Ee;S.depthTexture.format===Ei?Ee=r.DEPTH_COMPONENT24:S.depthTexture.format===ts&&(Ee=r.DEPTH24_STENCIL8);for(let Me=0;Me<6;Me++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,Ee,S.width,S.height,0,Le,ze,null)}}else ce(S.depthTexture,0);const xe=he.__webglTexture,be=tt(S),ie=le?r.TEXTURE_CUBE_MAP_POSITIVE_X+W:r.TEXTURE_2D,de=S.depthTexture.format===ts?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(S.depthTexture.format===Ei)Ge(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,de,ie,xe,0,be):r.framebufferTexture2D(r.FRAMEBUFFER,de,ie,xe,0);else if(S.depthTexture.format===ts)Ge(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,de,ie,xe,0,be):r.framebufferTexture2D(r.FRAMEBUFFER,de,ie,xe,0);else throw new Error("Unknown depthTexture format")}function se(A){const S=n.get(A),W=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){const le=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),le){const he=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,le.removeEventListener("dispose",he)};le.addEventListener("dispose",he),S.__depthDisposeCallback=he}S.__boundDepthTexture=le}if(A.depthTexture&&!S.__autoAllocateDepthBuffer)if(W)for(let le=0;le<6;le++)ne(S.__webglFramebuffer[le],A,le);else{const le=A.texture.mipmaps;le&&le.length>0?ne(S.__webglFramebuffer[0],A,0):ne(S.__webglFramebuffer,A,0)}else if(W){S.__webglDepthbuffer=[];for(let le=0;le<6;le++)if(t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[le]),S.__webglDepthbuffer[le]===void 0)S.__webglDepthbuffer[le]=r.createRenderbuffer(),ue(S.__webglDepthbuffer[le],A,!1);else{const he=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,xe=S.__webglDepthbuffer[le];r.bindRenderbuffer(r.RENDERBUFFER,xe),r.framebufferRenderbuffer(r.FRAMEBUFFER,he,r.RENDERBUFFER,xe)}}else{const le=A.texture.mipmaps;if(le&&le.length>0?t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=r.createRenderbuffer(),ue(S.__webglDepthbuffer,A,!1);else{const he=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,xe=S.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,xe),r.framebufferRenderbuffer(r.FRAMEBUFFER,he,r.RENDERBUFFER,xe)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function ee(A,S,W){const le=n.get(A);S!==void 0&&te(le.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),W!==void 0&&se(A)}function re(A){const S=A.texture,W=n.get(A),le=n.get(S);A.addEventListener("dispose",b);const he=A.textures,xe=A.isWebGLCubeRenderTarget===!0,be=he.length>1;if(be||(le.__webglTexture===void 0&&(le.__webglTexture=r.createTexture()),le.__version=S.version,a.memory.textures++),xe){W.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer[ie]=[];for(let de=0;de<S.mipmaps.length;de++)W.__webglFramebuffer[ie][de]=r.createFramebuffer()}else W.__webglFramebuffer[ie]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer=[];for(let ie=0;ie<S.mipmaps.length;ie++)W.__webglFramebuffer[ie]=r.createFramebuffer()}else W.__webglFramebuffer=r.createFramebuffer();if(be)for(let ie=0,de=he.length;ie<de;ie++){const Le=n.get(he[ie]);Le.__webglTexture===void 0&&(Le.__webglTexture=r.createTexture(),a.memory.textures++)}if(A.samples>0&&Ge(A)===!1){W.__webglMultisampledFramebuffer=r.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ie=0;ie<he.length;ie++){const de=he[ie];W.__webglColorRenderbuffer[ie]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,W.__webglColorRenderbuffer[ie]);const Le=s.convert(de.format,de.colorSpace),ze=s.convert(de.type),Ee=y(de.internalFormat,Le,ze,de.normalized,de.colorSpace,A.isXRRenderTarget===!0),Me=tt(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Me,Ee,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ie,r.RENDERBUFFER,W.__webglColorRenderbuffer[ie])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(W.__webglDepthRenderbuffer=r.createRenderbuffer(),ue(W.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(xe){t.bindTexture(r.TEXTURE_CUBE_MAP,le.__webglTexture),$(r.TEXTURE_CUBE_MAP,S);for(let ie=0;ie<6;ie++)if(S.mipmaps&&S.mipmaps.length>0)for(let de=0;de<S.mipmaps.length;de++)te(W.__webglFramebuffer[ie][de],A,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,de);else te(W.__webglFramebuffer[ie],A,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);p(S)&&_(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let ie=0,de=he.length;ie<de;ie++){const Le=he[ie],ze=n.get(Le);let Ee=r.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Ee=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Ee,ze.__webglTexture),$(Ee,Le),te(W.__webglFramebuffer,A,Le,r.COLOR_ATTACHMENT0+ie,Ee,0),p(Le)&&_(Ee)}t.unbindTexture()}else{let ie=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ie=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ie,le.__webglTexture),$(ie,S),S.mipmaps&&S.mipmaps.length>0)for(let de=0;de<S.mipmaps.length;de++)te(W.__webglFramebuffer[de],A,S,r.COLOR_ATTACHMENT0,ie,de);else te(W.__webglFramebuffer,A,S,r.COLOR_ATTACHMENT0,ie,0);p(S)&&_(ie),t.unbindTexture()}A.depthBuffer&&se(A)}function ge(A){const S=A.textures;for(let W=0,le=S.length;W<le;W++){const he=S[W];if(p(he)){const xe=v(A),be=n.get(he).__webglTexture;t.bindTexture(xe,be),_(xe),t.unbindTexture()}}}const _e=[],Qe=[];function N(A){if(A.samples>0){if(Ge(A)===!1){const S=A.textures,W=A.width,le=A.height;let he=r.COLOR_BUFFER_BIT;const xe=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,be=n.get(A),ie=S.length>1;if(ie)for(let Le=0;Le<S.length;Le++)t.bindFramebuffer(r.FRAMEBUFFER,be.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,be.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);const de=A.texture.mipmaps;de&&de.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Le=0;Le<S.length;Le++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(he|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(he|=r.STENCIL_BUFFER_BIT)),ie){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,be.__webglColorRenderbuffer[Le]);const ze=n.get(S[Le]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ze,0)}r.blitFramebuffer(0,0,W,le,0,0,W,le,he,r.NEAREST),l===!0&&(_e.length=0,Qe.length=0,_e.push(r.COLOR_ATTACHMENT0+Le),A.depthBuffer&&A.resolveDepthBuffer===!1&&(_e.push(xe),Qe.push(xe),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Qe)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,_e))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ie)for(let Le=0;Le<S.length;Le++){t.bindFramebuffer(r.FRAMEBUFFER,be.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.RENDERBUFFER,be.__webglColorRenderbuffer[Le]);const ze=n.get(S[Le]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,be.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.TEXTURE_2D,ze,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const S=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[S])}}}function tt(A){return Math.min(i.maxSamples,A.samples)}function Ge(A){const S=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function et(A){const S=a.render.frame;u.get(A)!==S&&(u.set(A,S),A.update())}function ve(A,S){const W=A.colorSpace,le=A.format,he=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||W!==da&&W!==Di&&(vt.getTransfer(W)===At?(le!==bn||he!==An)&&Ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qe("WebGLTextures: Unsupported texture color space:",W)),S}function wt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=J,this.getTextureUnits=G,this.setTextureUnits=U,this.setTexture2D=ce,this.setTexture2DArray=me,this.setTexture3D=we,this.setTextureCube=Ie,this.rebindTextures=ee,this.setupRenderTarget=re,this.updateRenderTargetMipmap=ge,this.updateMultisampleRenderTarget=N,this.setupDepthRenderbuffer=se,this.setupFrameBufferTexture=te,this.useMultisampledRTT=Ge,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function tm(r,e){function t(n,i=Di){let s;const a=vt.getTransfer(i);if(n===An)return r.UNSIGNED_BYTE;if(n===Cl)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Rl)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Uu)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Nu)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Lu)return r.BYTE;if(n===Du)return r.SHORT;if(n===_r)return r.UNSIGNED_SHORT;if(n===Al)return r.INT;if(n===Zn)return r.UNSIGNED_INT;if(n===yn)return r.FLOAT;if(n===wi)return r.HALF_FLOAT;if(n===Fu)return r.ALPHA;if(n===Ou)return r.RGB;if(n===bn)return r.RGBA;if(n===Ei)return r.DEPTH_COMPONENT;if(n===ts)return r.DEPTH_STENCIL;if(n===Il)return r.RED;if(n===wa)return r.RED_INTEGER;if(n===rs)return r.RG;if(n===Pl)return r.RG_INTEGER;if(n===Ll)return r.RGBA_INTEGER;if(n===jr||n===Qr||n===ea||n===ta)if(a===At)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===jr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Qr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ea)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ta)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===jr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Qr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ea)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ta)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===zo||n===Vo||n===Go||n===Ho)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===zo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Vo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Go)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ho)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Wo||n===Xo||n===$o||n===qo||n===Yo||n===oa||n===Zo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Wo||n===Xo)return a===At?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===$o)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===qo)return s.COMPRESSED_R11_EAC;if(n===Yo)return s.COMPRESSED_SIGNED_R11_EAC;if(n===oa)return s.COMPRESSED_RG11_EAC;if(n===Zo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ko||n===Jo||n===jo||n===Qo||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===al||n===ol||n===ll||n===cl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ko)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Jo)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===jo)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Qo)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===el)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===tl)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===nl)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===il)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===sl)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===rl)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===al)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ol)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ll)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===cl)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ul||n===dl||n===hl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===ul)return a===At?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===dl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===hl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===fl||n===pl||n===la||n===ml)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===fl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===pl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===la)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ml)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===vr?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const KM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,JM=`
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

}`;class jM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new qu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Wn({vertexShader:KM,fragmentShader:JM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new It(new Cr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class QM extends li{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,g=null;const x=typeof XRWebGLBinding<"u",m=new jM,p={},_=t.getContextAttributes();let v=null,y=null;const w=[],M=[],C=new fe;let b=null;const T=new tn;T.viewport=new yt;const L=new tn;L.viewport=new yt;const I=[T,L],B=new Gp;let J=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(F){let K=w[F];return K===void 0&&(K=new Co,w[F]=K),K.getTargetRaySpace()},this.getControllerGrip=function(F){let K=w[F];return K===void 0&&(K=new Co,w[F]=K),K.getGripSpace()},this.getHand=function(F){let K=w[F];return K===void 0&&(K=new Co,w[F]=K),K.getHandSpace()};function U(F){const K=M.indexOf(F.inputSource);if(K===-1)return;const pe=w[K];pe!==void 0&&(pe.update(F.inputSource,F.frame,c||a),pe.dispatchEvent({type:F.type,data:F.inputSource}))}function O(){i.removeEventListener("select",U),i.removeEventListener("selectstart",U),i.removeEventListener("selectend",U),i.removeEventListener("squeeze",U),i.removeEventListener("squeezestart",U),i.removeEventListener("squeezeend",U),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",V);for(let F=0;F<w.length;F++){const K=M[F];K!==null&&(M[F]=null,w[F].disconnect(K))}J=null,G=null,m.reset();for(const F in p)delete p[F];e.setRenderTarget(v),f=null,d=null,h=null,i=null,y=null,$.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(F){s=F,n.isPresenting===!0&&Ce("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(F){o=F,n.isPresenting===!0&&Ce("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(F){c=F},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(i,t)),h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(F){if(i=F,i!==null){if(v=e.getRenderTarget(),i.addEventListener("select",U),i.addEventListener("selectstart",U),i.addEventListener("selectend",U),i.addEventListener("squeeze",U),i.addEventListener("squeezestart",U),i.addEventListener("squeezeend",U),i.addEventListener("end",O),i.addEventListener("inputsourceschange",V),_.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,Ae=null,$e=null;_.depth&&($e=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=_.stencil?ts:Ei,Ae=_.stencil?vr:Zn);const te={colorFormat:t.RGBA8,depthFormat:$e,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(te),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Hn(d.textureWidth,d.textureHeight,{format:bn,type:An,depthTexture:new Ns(d.textureWidth,d.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const pe={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,pe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Hn(f.framebufferWidth,f.framebufferHeight,{format:bn,type:An,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),$.setContext(i),$.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function V(F){for(let K=0;K<F.removed.length;K++){const pe=F.removed[K],Ae=M.indexOf(pe);Ae>=0&&(M[Ae]=null,w[Ae].disconnect(pe))}for(let K=0;K<F.added.length;K++){const pe=F.added[K];let Ae=M.indexOf(pe);if(Ae===-1){for(let te=0;te<w.length;te++)if(te>=M.length){M.push(pe),Ae=te;break}else if(M[te]===null){M[te]=pe,Ae=te;break}if(Ae===-1)break}const $e=w[Ae];$e&&$e.connect(pe)}}const ce=new R,me=new R;function we(F,K,pe){ce.setFromMatrixPosition(K.matrixWorld),me.setFromMatrixPosition(pe.matrixWorld);const Ae=ce.distanceTo(me),$e=K.projectionMatrix.elements,te=pe.projectionMatrix.elements,ue=$e[14]/($e[10]-1),ne=$e[14]/($e[10]+1),se=($e[9]+1)/$e[5],ee=($e[9]-1)/$e[5],re=($e[8]-1)/$e[0],ge=(te[8]+1)/te[0],_e=ue*re,Qe=ue*ge,N=Ae/(-re+ge),tt=N*-re;if(K.matrixWorld.decompose(F.position,F.quaternion,F.scale),F.translateX(tt),F.translateZ(N),F.matrixWorld.compose(F.position,F.quaternion,F.scale),F.matrixWorldInverse.copy(F.matrixWorld).invert(),$e[10]===-1)F.projectionMatrix.copy(K.projectionMatrix),F.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const Ge=ue+N,et=ne+N,ve=_e-tt,wt=Qe+(Ae-tt),A=se*ne/et*Ge,S=ee*ne/et*Ge;F.projectionMatrix.makePerspective(ve,wt,A,S,Ge,et),F.projectionMatrixInverse.copy(F.projectionMatrix).invert()}}function Ie(F,K){K===null?F.matrixWorld.copy(F.matrix):F.matrixWorld.multiplyMatrices(K.matrixWorld,F.matrix),F.matrixWorldInverse.copy(F.matrixWorld).invert()}this.updateCamera=function(F){if(i===null)return;let K=F.near,pe=F.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(pe=m.depthFar)),B.near=L.near=T.near=K,B.far=L.far=T.far=pe,(J!==B.near||G!==B.far)&&(i.updateRenderState({depthNear:B.near,depthFar:B.far}),J=B.near,G=B.far),B.layers.mask=F.layers.mask|6,T.layers.mask=B.layers.mask&-5,L.layers.mask=B.layers.mask&-3;const Ae=F.parent,$e=B.cameras;Ie(B,Ae);for(let te=0;te<$e.length;te++)Ie($e[te],Ae);$e.length===2?we(B,T,L):B.projectionMatrix.copy(T.projectionMatrix),ke(F,B,Ae)};function ke(F,K,pe){pe===null?F.matrix.copy(K.matrixWorld):(F.matrix.copy(pe.matrixWorld),F.matrix.invert(),F.matrix.multiply(K.matrixWorld)),F.matrix.decompose(F.position,F.quaternion,F.scale),F.updateMatrixWorld(!0),F.projectionMatrix.copy(K.projectionMatrix),F.projectionMatrixInverse.copy(K.projectionMatrixInverse),F.isPerspectiveCamera&&(F.fov=xr*2*Math.atan(1/F.projectionMatrix.elements[5]),F.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(F){l=F,d!==null&&(d.fixedFoveation=F),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=F)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(F){return p[F]};let st=null;function oe(F,K){if(u=K.getViewerPose(c||a),g=K,u!==null){const pe=u.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Ae=!1;pe.length!==B.cameras.length&&(B.cameras.length=0,Ae=!0);for(let ne=0;ne<pe.length;ne++){const se=pe[ne];let ee=null;if(f!==null)ee=f.getViewport(se);else{const ge=h.getViewSubImage(d,se);ee=ge.viewport,ne===0&&(e.setRenderTargetTextures(y,ge.colorTexture,ge.depthStencilTexture),e.setRenderTarget(y))}let re=I[ne];re===void 0&&(re=new tn,re.layers.enable(ne),re.viewport=new yt,I[ne]=re),re.matrix.fromArray(se.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(se.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(ee.x,ee.y,ee.width,ee.height),ne===0&&(B.matrix.copy(re.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ae===!0&&B.cameras.push(re)}const $e=i.enabledFeatures;if($e&&$e.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){h=n.getBinding();const ne=h.getDepthInformation(pe[0]);ne&&ne.isValid&&ne.texture&&m.init(ne,i.renderState)}if($e&&$e.includes("camera-access")&&x){e.state.unbindTexture(),h=n.getBinding();for(let ne=0;ne<pe.length;ne++){const se=pe[ne].camera;if(se){let ee=p[se];ee||(ee=new qu,p[se]=ee);const re=h.getCameraImage(se);ee.sourceTexture=re}}}}for(let pe=0;pe<w.length;pe++){const Ae=M[pe],$e=w[pe];Ae!==null&&$e!==void 0&&$e.update(Ae,K,c||a)}st&&st(F,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}const $=new Zp;$.setAnimationLoop(oe),this.setAnimationLoop=function(F){st=F},this.dispose=function(){}}}const eS=new rt,nm=new lt;nm.set(-1,0,0,0,1,0,0,0,1);function tS(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,xp(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,_,v,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),x(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,_,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Mn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Mn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const _=e.get(p),v=_.envMap,y=_.envMapRotation;v&&(m.envMap.value=v,m.envMapRotation.value.setFromMatrix4(eS.makeRotationFromEuler(y)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(nm),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,_,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*_,m.scale.value=v*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,_){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Mn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const _=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function nS(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,v){const y=v.program;n.uniformBlockBinding(_,y)}function c(_,v){let y=i[_.id];y===void 0&&(g(_),y=u(_),i[_.id]=y,_.addEventListener("dispose",m));const w=v.program;n.updateUBOMapping(_,w);const M=e.render.frame;s[_.id]!==M&&(d(_),s[_.id]=M)}function u(_){const v=h();_.__bindingPointIndex=v;const y=r.createBuffer(),w=_.__size,M=_.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,w,M),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,y),y}function h(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){const v=i[_.id],y=_.uniforms,w=_.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let M=0,C=y.length;M<C;M++){const b=Array.isArray(y[M])?y[M]:[y[M]];for(let T=0,L=b.length;T<L;T++){const I=b[T];if(f(I,M,T,w)===!0){const B=I.__offset,J=Array.isArray(I.value)?I.value:[I.value];let G=0;for(let U=0;U<J.length;U++){const O=J[U],V=x(O);typeof O=="number"||typeof O=="boolean"?(I.__data[0]=O,r.bufferSubData(r.UNIFORM_BUFFER,B+G,I.__data)):O.isMatrix3?(I.__data[0]=O.elements[0],I.__data[1]=O.elements[1],I.__data[2]=O.elements[2],I.__data[3]=0,I.__data[4]=O.elements[3],I.__data[5]=O.elements[4],I.__data[6]=O.elements[5],I.__data[7]=0,I.__data[8]=O.elements[6],I.__data[9]=O.elements[7],I.__data[10]=O.elements[8],I.__data[11]=0):ArrayBuffer.isView(O)?I.__data.set(new O.constructor(O.buffer,O.byteOffset,I.__data.length)):(O.toArray(I.__data,G),G+=V.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,B,I.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(_,v,y,w){const M=_.value,C=v+"_"+y;if(w[C]===void 0)return typeof M=="number"||typeof M=="boolean"?w[C]=M:ArrayBuffer.isView(M)?w[C]=M.slice():w[C]=M.clone(),!0;{const b=w[C];if(typeof M=="number"||typeof M=="boolean"){if(b!==M)return w[C]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(b.equals(M)===!1)return b.copy(M),!0}}return!1}function g(_){const v=_.uniforms;let y=0;const w=16;for(let C=0,b=v.length;C<b;C++){const T=Array.isArray(v[C])?v[C]:[v[C]];for(let L=0,I=T.length;L<I;L++){const B=T[L],J=Array.isArray(B.value)?B.value:[B.value];for(let G=0,U=J.length;G<U;G++){const O=J[G],V=x(O),ce=y%w,me=ce%V.boundary,we=ce+me;y+=me,we!==0&&w-we<V.storage&&(y+=w-we),B.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=y,y+=V.storage}}}const M=y%w;return M>0&&(y+=w-M),_.__size=y,_.__cache={},this}function x(_){const v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?Ce("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(v.boundary=16,v.storage=_.byteLength):Ce("WebGLRenderer: Unsupported uniform value type.",_),v}function m(_){const v=_.target;v.removeEventListener("dispose",m);const y=a.indexOf(v.__bindingPointIndex);a.splice(y,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function p(){for(const _ in i)r.deleteBuffer(i[_]);a=[],i={},s={}}return{bind:l,update:c,dispose:p}}const iS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let pi=null;function sS(){return pi===null&&(pi=new ai(iS,16,16,rs,wi),pi.name="DFG_LUT",pi.minFilter=Ft,pi.magFilter=Ft,pi.wrapS=In,pi.wrapT=In,pi.generateMipmaps=!1,pi.needsUpdate=!0),pi}class im{constructor(e={}){const{canvas:t=Yf(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:f=An}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const x=f,m=new Set([Ll,Pl,wa]),p=new Set([An,Zn,_r,vr,Cl,Rl]),_=new Uint32Array(4),v=new Int32Array(4),y=new R;let w=null,M=null;const C=[],b=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let I=!1,B=null;this._outputColorSpace=Tn;let J=0,G=0,U=null,O=-1,V=null;const ce=new yt,me=new yt;let we=null;const Ie=new Ne(0);let ke=0,st=t.width,oe=t.height,$=1,F=null,K=null;const pe=new yt(0,0,st,oe),Ae=new yt(0,0,st,oe);let $e=!1;const te=new Er;let ue=!1,ne=!1;const se=new rt,ee=new R,re=new yt,ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let _e=!1;function Qe(){return U===null?$:1}let N=n;function tt(E,H){return t.getContext(E,H)}try{const E={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${El}`),t.addEventListener("webglcontextlost",D,!1),t.addEventListener("webglcontextrestored",k,!1),t.addEventListener("webglcontextcreationerror",Q,!1),N===null){const H="webgl2";if(N=tt(H,E),N===null)throw tt(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw qe("WebGLRenderer: "+E.message),E}let Ge,et,ve,wt,A,S,W,le,he,xe,be,ie,de,Le,ze,Ee,Me,at,ut,xt,z,Se,ae;function Oe(){Ge=new rb(N),Ge.init(),z=new tm(N,Ge),et=new Jy(N,Ge,e,z),ve=new YM(N,Ge),et.reversedDepthBuffer&&d&&ve.buffers.depth.setReversed(!0),wt=new lb(N),A=new UM,S=new ZM(N,Ge,ve,A,et,z,wt),W=new sb(L),le=new hv(N),Se=new Zy(N,le),he=new ab(N,le,wt,Se),xe=new ub(N,he,le,Se,wt),at=new cb(N,et,S),ze=new jy(A),be=new DM(L,W,Ge,et,Se,ze),ie=new tS(L,A),de=new FM,Le=new GM(Ge),Me=new Yy(L,W,ve,xe,g,l),Ee=new qM(L,xe,et),ae=new nS(N,wt,et,ve),ut=new Ky(N,Ge,wt),xt=new ob(N,Ge,wt),wt.programs=be.programs,L.capabilities=et,L.extensions=Ge,L.properties=A,L.renderLists=de,L.shadowMap=Ee,L.state=ve,L.info=wt}Oe(),x!==An&&(T=new hb(x,t.width,t.height,i,s));const Te=new QM(L,N);this.xr=Te,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=Ge.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ge.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(E){E!==void 0&&($=E,this.setSize(st,oe,!1))},this.getSize=function(E){return E.set(st,oe)},this.setSize=function(E,H,j=!0){if(Te.isPresenting){Ce("WebGLRenderer: Can't change size while VR device is presenting.");return}st=E,oe=H,t.width=Math.floor(E*$),t.height=Math.floor(H*$),j===!0&&(t.style.width=E+"px",t.style.height=H+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,E,H)},this.getDrawingBufferSize=function(E){return E.set(st*$,oe*$).floor()},this.setDrawingBufferSize=function(E,H,j){st=E,oe=H,$=j,t.width=Math.floor(E*j),t.height=Math.floor(H*j),this.setViewport(0,0,E,H)},this.setEffects=function(E){if(x===An){qe("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let H=0;H<E.length;H++)if(E[H].isOutputPass===!0){Ce("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(ce)},this.getViewport=function(E){return E.copy(pe)},this.setViewport=function(E,H,j,Y){E.isVector4?pe.set(E.x,E.y,E.z,E.w):pe.set(E,H,j,Y),ve.viewport(ce.copy(pe).multiplyScalar($).round())},this.getScissor=function(E){return E.copy(Ae)},this.setScissor=function(E,H,j,Y){E.isVector4?Ae.set(E.x,E.y,E.z,E.w):Ae.set(E,H,j,Y),ve.scissor(me.copy(Ae).multiplyScalar($).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(E){ve.setScissorTest($e=E)},this.setOpaqueSort=function(E){F=E},this.setTransparentSort=function(E){K=E},this.getClearColor=function(E){return E.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(E=!0,H=!0,j=!0){let Y=0;if(E){let Z=!1;if(U!==null){const Fe=U.texture.format;Z=m.has(Fe)}if(Z){const Fe=U.texture.type,Xe=p.has(Fe),Ue=Me.getClearColor(),Ye=Me.getClearAlpha(),Ze=Ue.r,ft=Ue.g,_t=Ue.b;Xe?(_[0]=Ze,_[1]=ft,_[2]=_t,_[3]=Ye,N.clearBufferuiv(N.COLOR,0,_)):(v[0]=Ze,v[1]=ft,v[2]=_t,v[3]=Ye,N.clearBufferiv(N.COLOR,0,v))}else Y|=N.COLOR_BUFFER_BIT}H&&(Y|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(Y|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y!==0&&N.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),B=E},this.dispose=function(){t.removeEventListener("webglcontextlost",D,!1),t.removeEventListener("webglcontextrestored",k,!1),t.removeEventListener("webglcontextcreationerror",Q,!1),Me.dispose(),de.dispose(),Le.dispose(),A.dispose(),W.dispose(),xe.dispose(),Se.dispose(),ae.dispose(),be.dispose(),Te.dispose(),Te.removeEventListener("sessionstart",Ct),Te.removeEventListener("sessionend",ht),dt.stop()};function D(E){E.preventDefault(),ma("WebGLRenderer: Context Lost."),I=!0}function k(){ma("WebGLRenderer: Context Restored."),I=!1;const E=wt.autoReset,H=Ee.enabled,j=Ee.autoUpdate,Y=Ee.needsUpdate,Z=Ee.type;Oe(),wt.autoReset=E,Ee.enabled=H,Ee.autoUpdate=j,Ee.needsUpdate=Y,Ee.type=Z}function Q(E){qe("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Pe(E){const H=E.target;H.removeEventListener("dispose",Pe),De(H)}function De(E){ot(E),A.remove(E)}function ot(E){const H=A.get(E).programs;H!==void 0&&(H.forEach(function(j){be.releaseProgram(j)}),E.isShaderMaterial&&be.releaseShaderCache(E))}this.renderBufferDirect=function(E,H,j,Y,Z,Fe){H===null&&(H=ge);const Xe=Z.isMesh&&Z.matrixWorld.determinant()<0,Ue=cm(E,H,j,Y,Z);ve.setMaterial(Y,Xe);let Ye=j.index,Ze=1;if(Y.wireframe===!0){if(Ye=he.getWireframeAttribute(j),Ye===void 0)return;Ze=2}const ft=j.drawRange,_t=j.attributes.position;let Ke=ft.start*Ze,Rt=(ft.start+ft.count)*Ze;Fe!==null&&(Ke=Math.max(Ke,Fe.start*Ze),Rt=Math.min(Rt,(Fe.start+Fe.count)*Ze)),Ye!==null?(Ke=Math.max(Ke,0),Rt=Math.min(Rt,Ye.count)):_t!=null&&(Ke=Math.max(Ke,0),Rt=Math.min(Rt,_t.count));const Gt=Rt-Ke;if(Gt<0||Gt===1/0)return;Se.setup(Z,Y,Ue,j,Ye);let Bt,Lt=ut;if(Ye!==null&&(Bt=le.get(Ye),Lt=xt,Lt.setIndex(Bt)),Z.isMesh)Y.wireframe===!0?(ve.setLineWidth(Y.wireframeLinewidth*Qe()),Lt.setMode(N.LINES)):Lt.setMode(N.TRIANGLES);else if(Z.isLine){let un=Y.linewidth;un===void 0&&(un=1),ve.setLineWidth(un*Qe()),Z.isLineSegments?Lt.setMode(N.LINES):Z.isLineLoop?Lt.setMode(N.LINE_LOOP):Lt.setMode(N.LINE_STRIP)}else Z.isPoints?Lt.setMode(N.POINTS):Z.isSprite&&Lt.setMode(N.TRIANGLES);if(Z.isBatchedMesh)if(Ge.get("WEBGL_multi_draw"))Lt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const un=Z._multiDrawStarts,He=Z._multiDrawCounts,Un=Z._multiDrawCount,bt=Ye?le.get(Ye).bytesPerElement:1,qn=A.get(Y).currentProgram.getUniforms();for(let ui=0;ui<Un;ui++)qn.setValue(N,"_gl_DrawID",ui),Lt.render(un[ui]/bt,He[ui])}else if(Z.isInstancedMesh)Lt.renderInstances(Ke,Gt,Z.count);else if(j.isInstancedBufferGeometry){const un=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,He=Math.min(j.instanceCount,un);Lt.renderInstances(Ke,Gt,He)}else Lt.render(Ke,Gt)};function gt(E,H,j){E.transparent===!0&&E.side===_i&&E.forceSinglePass===!1?(E.side=Mn,E.needsUpdate=!0,Dn(E,H,j),E.side=Oi,E.needsUpdate=!0,Dn(E,H,j),E.side=_i):Dn(E,H,j)}this.compile=function(E,H,j=null){j===null&&(j=E),M=Le.get(j),M.init(H),b.push(M),j.traverseVisible(function(Z){Z.isLight&&Z.layers.test(H.layers)&&(M.pushLight(Z),Z.castShadow&&M.pushShadow(Z))}),E!==j&&E.traverseVisible(function(Z){Z.isLight&&Z.layers.test(H.layers)&&(M.pushLight(Z),Z.castShadow&&M.pushShadow(Z))}),M.setupLights();const Y=new Set;return E.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const Fe=Z.material;if(Fe)if(Array.isArray(Fe))for(let Xe=0;Xe<Fe.length;Xe++){const Ue=Fe[Xe];gt(Ue,j,Z),Y.add(Ue)}else gt(Fe,j,Z),Y.add(Fe)}),M=b.pop(),Y},this.compileAsync=function(E,H,j=null){const Y=this.compile(E,H,j);return new Promise(Z=>{function Fe(){if(Y.forEach(function(Xe){A.get(Xe).currentProgram.isReady()&&Y.delete(Xe)}),Y.size===0){Z(E);return}setTimeout(Fe,10)}Ge.get("KHR_parallel_shader_compile")!==null?Fe():setTimeout(Fe,10)})};let Ut=null;function je(E){Ut&&Ut(E)}function Ct(){dt.stop()}function ht(){dt.start()}const dt=new Zp;dt.setAnimationLoop(je),typeof self<"u"&&dt.setContext(self),this.setAnimationLoop=function(E){Ut=E,Te.setAnimationLoop(E),E===null?dt.stop():dt.start()},Te.addEventListener("sessionstart",Ct),Te.addEventListener("sessionend",ht),this.render=function(E,H){if(H!==void 0&&H.isCamera!==!0){qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;B!==null&&B.renderStart(E,H);const j=Te.enabled===!0&&Te.isPresenting===!0,Y=T!==null&&(U===null||j)&&T.begin(L,U);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Te.enabled===!0&&Te.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Te.cameraAutoUpdate===!0&&Te.updateCamera(H),H=Te.getCamera()),E.isScene===!0&&E.onBeforeRender(L,E,H,U),M=Le.get(E,b.length),M.init(H),M.state.textureUnits=S.getTextureUnits(),b.push(M),se.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),te.setFromProjectionMatrix(se,zn,H.reversedDepth),ne=this.localClippingEnabled,ue=ze.init(this.clippingPlanes,ne),w=de.get(E,C.length),w.init(),C.push(w),Te.enabled===!0&&Te.isPresenting===!0){const Xe=L.xr.getDepthSensingMesh();Xe!==null&&$t(Xe,H,-1/0,L.sortObjects)}$t(E,H,0,L.sortObjects),w.finish(),L.sortObjects===!0&&w.sort(F,K),_e=Te.enabled===!1||Te.isPresenting===!1||Te.hasDepthSensing()===!1,_e&&Me.addToRenderList(w,E),this.info.render.frame++,ue===!0&&ze.beginShadows();const Z=M.state.shadowsArray;if(Ee.render(Z,E,H),ue===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset(),(Y&&T.hasRenderPass())===!1){const Xe=w.opaque,Ue=w.transmissive;if(M.setupLights(),H.isArrayCamera){const Ye=H.cameras;if(Ue.length>0)for(let Ze=0,ft=Ye.length;Ze<ft;Ze++){const _t=Ye[Ze];Jn(Xe,Ue,E,_t)}_e&&Me.render(E);for(let Ze=0,ft=Ye.length;Ze<ft;Ze++){const _t=Ye[Ze];Ln(w,E,_t,_t.viewport)}}else Ue.length>0&&Jn(Xe,Ue,E,H),_e&&Me.render(E),Ln(w,E,H)}U!==null&&G===0&&(S.updateMultisampleRenderTarget(U),S.updateRenderTargetMipmap(U)),Y&&T.end(L),E.isScene===!0&&E.onAfterRender(L,E,H),Se.resetDefaultState(),O=-1,V=null,b.pop(),b.length>0?(M=b[b.length-1],S.setTextureUnits(M.state.textureUnits),ue===!0&&ze.setGlobalState(L.clippingPlanes,M.state.camera)):M=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,B!==null&&B.renderEnd()};function $t(E,H,j,Y){if(E.visible===!1)return;if(E.layers.test(H.layers)){if(E.isGroup)j=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(H);else if(E.isLightProbeGrid)M.pushLightProbeGrid(E);else if(E.isLight)M.pushLight(E),E.castShadow&&M.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||te.intersectsSprite(E)){Y&&re.setFromMatrixPosition(E.matrixWorld).applyMatrix4(se);const Xe=xe.update(E),Ue=E.material;Ue.visible&&w.push(E,Xe,Ue,j,re.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||te.intersectsObject(E))){const Xe=xe.update(E),Ue=E.material;if(Y&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),re.copy(E.boundingSphere.center)):(Xe.boundingSphere===null&&Xe.computeBoundingSphere(),re.copy(Xe.boundingSphere.center)),re.applyMatrix4(E.matrixWorld).applyMatrix4(se)),Array.isArray(Ue)){const Ye=Xe.groups;for(let Ze=0,ft=Ye.length;Ze<ft;Ze++){const _t=Ye[Ze],Ke=Ue[_t.materialIndex];Ke&&Ke.visible&&w.push(E,Xe,Ke,j,re.z,_t)}}else Ue.visible&&w.push(E,Xe,Ue,j,re.z,null)}}const Fe=E.children;for(let Xe=0,Ue=Fe.length;Xe<Ue;Xe++)$t(Fe[Xe],H,j,Y)}function Ln(E,H,j,Y){const{opaque:Z,transmissive:Fe,transparent:Xe}=E;M.setupLightsView(j),ue===!0&&ze.setGlobalState(L.clippingPlanes,j),Y&&ve.viewport(ce.copy(Y)),Z.length>0&&qt(Z,H,j),Fe.length>0&&qt(Fe,H,j),Xe.length>0&&qt(Xe,H,j),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function Jn(E,H,j,Y){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[Y.id]===void 0){const Ke=Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[Y.id]=new Hn(1,1,{generateMipmaps:!0,type:Ke?wi:An,minFilter:xi,samples:Math.max(4,et.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:vt.workingColorSpace})}const Fe=M.state.transmissionRenderTarget[Y.id],Xe=Y.viewport||ce;Fe.setSize(Xe.z*L.transmissionResolutionScale,Xe.w*L.transmissionResolutionScale);const Ue=L.getRenderTarget(),Ye=L.getActiveCubeFace(),Ze=L.getActiveMipmapLevel();L.setRenderTarget(Fe),L.getClearColor(Ie),ke=L.getClearAlpha(),ke<1&&L.setClearColor(16777215,.5),L.clear(),_e&&Me.render(j);const ft=L.toneMapping;L.toneMapping=ri;const _t=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),M.setupLightsView(Y),ue===!0&&ze.setGlobalState(L.clippingPlanes,Y),qt(E,j,Y),S.updateMultisampleRenderTarget(Fe),S.updateRenderTargetMipmap(Fe),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let Rt=0,Gt=H.length;Rt<Gt;Rt++){const Bt=H[Rt],{object:Lt,geometry:un,material:He,group:Un}=Bt;if(He.side===_i&&Lt.layers.test(Y.layers)){const bt=He.side;He.side=Mn,He.needsUpdate=!0,Zt(Lt,j,Y,un,He,Un),He.side=bt,He.needsUpdate=!0,Ke=!0}}Ke===!0&&(S.updateMultisampleRenderTarget(Fe),S.updateRenderTargetMipmap(Fe))}L.setRenderTarget(Ue,Ye,Ze),L.setClearColor(Ie,ke),_t!==void 0&&(Y.viewport=_t),L.toneMapping=ft}function qt(E,H,j){const Y=H.isScene===!0?H.overrideMaterial:null;for(let Z=0,Fe=E.length;Z<Fe;Z++){const Xe=E[Z],{object:Ue,geometry:Ye,group:Ze}=Xe;let ft=Xe.material;ft.allowOverride===!0&&Y!==null&&(ft=Y),Ue.layers.test(j.layers)&&Zt(Ue,H,j,Ye,ft,Ze)}}function Zt(E,H,j,Y,Z,Fe){E.onBeforeRender(L,H,j,Y,Z,Fe),E.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),Z.onBeforeRender(L,H,j,Y,E,Fe),Z.transparent===!0&&Z.side===_i&&Z.forceSinglePass===!1?(Z.side=Mn,Z.needsUpdate=!0,L.renderBufferDirect(j,H,Y,Z,E,Fe),Z.side=Oi,Z.needsUpdate=!0,L.renderBufferDirect(j,H,Y,Z,E,Fe),Z.side=_i):L.renderBufferDirect(j,H,Y,Z,E,Fe),E.onAfterRender(L,H,j,Y,Z,Fe)}function Dn(E,H,j){H.isScene!==!0&&(H=ge);const Y=A.get(E),Z=M.state.lights,Fe=M.state.shadowsArray,Xe=Z.state.version,Ue=be.getParameters(E,Z.state,Fe,H,j,M.state.lightProbeGridArray),Ye=be.getProgramCacheKey(Ue);let Ze=Y.programs;Y.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?H.environment:null,Y.fog=H.fog;const ft=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;Y.envMap=W.get(E.envMap||Y.environment,ft),Y.envMapRotation=Y.environment!==null&&E.envMap===null?H.environmentRotation:E.envMapRotation,Ze===void 0&&(E.addEventListener("dispose",Pe),Ze=new Map,Y.programs=Ze);let _t=Ze.get(Ye);if(_t!==void 0){if(Y.currentProgram===_t&&Y.lightsStateVersion===Xe)return Sd(E,Ue),_t}else Ue.uniforms=be.getUniforms(E),B!==null&&E.isNodeMaterial&&B.build(E,j,Ue),E.onBeforeCompile(Ue,L),_t=be.acquireProgram(Ue,Ye),Ze.set(Ye,_t),Y.uniforms=Ue.uniforms;const Ke=Y.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ke.clippingPlanes=ze.uniform),Sd(E,Ue),Y.needsLights=dm(E),Y.lightsStateVersion=Xe,Y.needsLights&&(Ke.ambientLightColor.value=Z.state.ambient,Ke.lightProbe.value=Z.state.probe,Ke.directionalLights.value=Z.state.directional,Ke.directionalLightShadows.value=Z.state.directionalShadow,Ke.spotLights.value=Z.state.spot,Ke.spotLightShadows.value=Z.state.spotShadow,Ke.rectAreaLights.value=Z.state.rectArea,Ke.ltc_1.value=Z.state.rectAreaLTC1,Ke.ltc_2.value=Z.state.rectAreaLTC2,Ke.pointLights.value=Z.state.point,Ke.pointLightShadows.value=Z.state.pointShadow,Ke.hemisphereLights.value=Z.state.hemi,Ke.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Ke.spotLightMatrix.value=Z.state.spotLightMatrix,Ke.spotLightMap.value=Z.state.spotLightMap,Ke.pointShadowMatrix.value=Z.state.pointShadowMatrix),Y.lightProbeGrid=M.state.lightProbeGridArray.length>0,Y.currentProgram=_t,Y.uniformsList=null,_t}function Vi(E){if(E.uniformsList===null){const H=E.currentProgram.getUniforms();E.uniformsList=Ro.seqWithValue(H.seq,E.uniforms)}return E.uniformsList}function Sd(E,H){const j=A.get(E);j.outputColorSpace=H.outputColorSpace,j.batching=H.batching,j.batchingColor=H.batchingColor,j.instancing=H.instancing,j.instancingColor=H.instancingColor,j.instancingMorph=H.instancingMorph,j.skinning=H.skinning,j.morphTargets=H.morphTargets,j.morphNormals=H.morphNormals,j.morphColors=H.morphColors,j.morphTargetsCount=H.morphTargetsCount,j.numClippingPlanes=H.numClippingPlanes,j.numIntersection=H.numClipIntersection,j.vertexAlphas=H.vertexAlphas,j.vertexTangents=H.vertexTangents,j.toneMapping=H.toneMapping}function lm(E,H){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;y.setFromMatrixPosition(H.matrixWorld);for(let j=0,Y=E.length;j<Y;j++){const Z=E[j];if(Z.texture!==null&&Z.boundingBox.containsPoint(y))return Z}return null}function cm(E,H,j,Y,Z){H.isScene!==!0&&(H=ge),S.resetTextureUnits();const Fe=H.fog,Xe=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial?H.environment:null,Ue=U===null?L.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:vt.workingColorSpace,Ye=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial&&!Y.envMap||Y.isMeshPhongMaterial&&!Y.envMap,Ze=W.get(Y.envMap||Xe,Ye),ft=Y.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,_t=!!j.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ke=!!j.morphAttributes.position,Rt=!!j.morphAttributes.normal,Gt=!!j.morphAttributes.color;let Bt=ri;Y.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Bt=L.toneMapping);const Lt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,un=Lt!==void 0?Lt.length:0,He=A.get(Y),Un=M.state.lights;if(ue===!0&&(ne===!0||E!==V)){const Nt=E===V&&Y.id===O;ze.setState(Y,E,Nt)}let bt=!1;Y.version===He.__version?(He.needsLights&&He.lightsStateVersion!==Un.state.version||He.outputColorSpace!==Ue||Z.isBatchedMesh&&He.batching===!1||!Z.isBatchedMesh&&He.batching===!0||Z.isBatchedMesh&&He.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&He.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&He.instancing===!1||!Z.isInstancedMesh&&He.instancing===!0||Z.isSkinnedMesh&&He.skinning===!1||!Z.isSkinnedMesh&&He.skinning===!0||Z.isInstancedMesh&&He.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&He.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&He.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&He.instancingMorph===!1&&Z.morphTexture!==null||He.envMap!==Ze||Y.fog===!0&&He.fog!==Fe||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==ze.numPlanes||He.numIntersection!==ze.numIntersection)||He.vertexAlphas!==ft||He.vertexTangents!==_t||He.morphTargets!==Ke||He.morphNormals!==Rt||He.morphColors!==Gt||He.toneMapping!==Bt||He.morphTargetsCount!==un||!!He.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(bt=!0):(bt=!0,He.__version=Y.version);let qn=He.currentProgram;bt===!0&&(qn=Dn(Y,H,Z),B&&Y.isNodeMaterial&&B.onUpdateProgram(Y,qn,He));let ui=!1,Gi=!1,Vs=!1;const Dt=qn.getUniforms(),Ht=He.uniforms;if(ve.useProgram(qn.program)&&(ui=!0,Gi=!0,Vs=!0),Y.id!==O&&(O=Y.id,Gi=!0),He.needsLights){const Nt=lm(M.state.lightProbeGridArray,Z);He.lightProbeGrid!==Nt&&(He.lightProbeGrid=Nt,Gi=!0)}if(ui||V!==E){ve.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Dt.setValue(N,"projectionMatrix",E.projectionMatrix),Dt.setValue(N,"viewMatrix",E.matrixWorldInverse);const Wi=Dt.map.cameraPosition;Wi!==void 0&&Wi.setValue(N,ee.setFromMatrixPosition(E.matrixWorld)),et.logarithmicDepthBuffer&&Dt.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Dt.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),V!==E&&(V=E,Gi=!0,Vs=!0)}if(He.needsLights&&(Un.state.directionalShadowMap.length>0&&Dt.setValue(N,"directionalShadowMap",Un.state.directionalShadowMap,S),Un.state.spotShadowMap.length>0&&Dt.setValue(N,"spotShadowMap",Un.state.spotShadowMap,S),Un.state.pointShadowMap.length>0&&Dt.setValue(N,"pointShadowMap",Un.state.pointShadowMap,S)),Z.isSkinnedMesh){Dt.setOptional(N,Z,"bindMatrix"),Dt.setOptional(N,Z,"bindMatrixInverse");const Nt=Z.skeleton;Nt&&(Nt.boneTexture===null&&Nt.computeBoneTexture(),Dt.setValue(N,"boneTexture",Nt.boneTexture,S))}Z.isBatchedMesh&&(Dt.setOptional(N,Z,"batchingTexture"),Dt.setValue(N,"batchingTexture",Z._matricesTexture,S),Dt.setOptional(N,Z,"batchingIdTexture"),Dt.setValue(N,"batchingIdTexture",Z._indirectTexture,S),Dt.setOptional(N,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Dt.setValue(N,"batchingColorTexture",Z._colorsTexture,S));const Hi=j.morphAttributes;if((Hi.position!==void 0||Hi.normal!==void 0||Hi.color!==void 0)&&at.update(Z,j,qn),(Gi||He.receiveShadow!==Z.receiveShadow)&&(He.receiveShadow=Z.receiveShadow,Dt.setValue(N,"receiveShadow",Z.receiveShadow)),(Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial)&&Y.envMap===null&&H.environment!==null&&(Ht.envMapIntensity.value=H.environmentIntensity),Ht.dfgLUT!==void 0&&(Ht.dfgLUT.value=sS()),Gi){if(Dt.setValue(N,"toneMappingExposure",L.toneMappingExposure),He.needsLights&&um(Ht,Vs),Fe&&Y.fog===!0&&ie.refreshFogUniforms(Ht,Fe),ie.refreshMaterialUniforms(Ht,Y,$,oe,M.state.transmissionRenderTarget[E.id]),He.needsLights&&He.lightProbeGrid){const Nt=He.lightProbeGrid;Ht.probesSH.value=Nt.texture,Ht.probesMin.value.copy(Nt.boundingBox.min),Ht.probesMax.value.copy(Nt.boundingBox.max),Ht.probesResolution.value.copy(Nt.resolution)}Ro.upload(N,Vi(He),Ht,S)}if(Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Ro.upload(N,Vi(He),Ht,S),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Dt.setValue(N,"center",Z.center),Dt.setValue(N,"modelViewMatrix",Z.modelViewMatrix),Dt.setValue(N,"normalMatrix",Z.normalMatrix),Dt.setValue(N,"modelMatrix",Z.matrixWorld),Y.uniformsGroups!==void 0){const Nt=Y.uniformsGroups;for(let Wi=0,Gs=Nt.length;Wi<Gs;Wi++){const wd=Nt[Wi];ae.update(wd,qn),ae.bind(wd,qn)}}return qn}function um(E,H){E.ambientLightColor.needsUpdate=H,E.lightProbe.needsUpdate=H,E.directionalLights.needsUpdate=H,E.directionalLightShadows.needsUpdate=H,E.pointLights.needsUpdate=H,E.pointLightShadows.needsUpdate=H,E.spotLights.needsUpdate=H,E.spotLightShadows.needsUpdate=H,E.rectAreaLights.needsUpdate=H,E.hemisphereLights.needsUpdate=H}function dm(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(E,H,j){const Y=A.get(E);Y.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),A.get(E.texture).__webglTexture=H,A.get(E.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:j,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,H){const j=A.get(E);j.__webglFramebuffer=H,j.__useDefaultFramebuffer=H===void 0};const hm=N.createFramebuffer();this.setRenderTarget=function(E,H=0,j=0){U=E,J=H,G=j;let Y=null,Z=!1,Fe=!1;if(E){const Ue=A.get(E);if(Ue.__useDefaultFramebuffer!==void 0){ve.bindFramebuffer(N.FRAMEBUFFER,Ue.__webglFramebuffer),ce.copy(E.viewport),me.copy(E.scissor),we=E.scissorTest,ve.viewport(ce),ve.scissor(me),ve.setScissorTest(we),O=-1;return}else if(Ue.__webglFramebuffer===void 0)S.setupRenderTarget(E);else if(Ue.__hasExternalTextures)S.rebindTextures(E,A.get(E.texture).__webglTexture,A.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const ft=E.depthTexture;if(Ue.__boundDepthTexture!==ft){if(ft!==null&&A.has(ft)&&(E.width!==ft.image.width||E.height!==ft.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");S.setupDepthRenderbuffer(E)}}const Ye=E.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(Fe=!0);const Ze=A.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ze[H])?Y=Ze[H][j]:Y=Ze[H],Z=!0):E.samples>0&&S.useMultisampledRTT(E)===!1?Y=A.get(E).__webglMultisampledFramebuffer:Array.isArray(Ze)?Y=Ze[j]:Y=Ze,ce.copy(E.viewport),me.copy(E.scissor),we=E.scissorTest}else ce.copy(pe).multiplyScalar($).floor(),me.copy(Ae).multiplyScalar($).floor(),we=$e;if(j!==0&&(Y=hm),ve.bindFramebuffer(N.FRAMEBUFFER,Y)&&ve.drawBuffers(E,Y),ve.viewport(ce),ve.scissor(me),ve.setScissorTest(we),Z){const Ue=A.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+H,Ue.__webglTexture,j)}else if(Fe){const Ue=H;for(let Ye=0;Ye<E.textures.length;Ye++){const Ze=A.get(E.textures[Ye]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ye,Ze.__webglTexture,j,Ue)}}else if(E!==null&&j!==0){const Ue=A.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ue.__webglTexture,j)}O=-1},this.readRenderTargetPixels=function(E,H,j,Y,Z,Fe,Xe,Ue=0){if(!(E&&E.isWebGLRenderTarget)){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ye=A.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Xe!==void 0&&(Ye=Ye[Xe]),Ye){ve.bindFramebuffer(N.FRAMEBUFFER,Ye);try{const Ze=E.textures[Ue],ft=Ze.format,_t=Ze.type;if(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Ue),!et.textureFormatReadable(ft)){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!et.textureTypeReadable(_t)){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=E.width-Y&&j>=0&&j<=E.height-Z&&N.readPixels(H,j,Y,Z,z.convert(ft),z.convert(_t),Fe)}finally{const Ze=U!==null?A.get(U).__webglFramebuffer:null;ve.bindFramebuffer(N.FRAMEBUFFER,Ze)}}},this.readRenderTargetPixelsAsync=async function(E,H,j,Y,Z,Fe,Xe,Ue=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ye=A.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Xe!==void 0&&(Ye=Ye[Xe]),Ye)if(H>=0&&H<=E.width-Y&&j>=0&&j<=E.height-Z){ve.bindFramebuffer(N.FRAMEBUFFER,Ye);const Ze=E.textures[Ue],ft=Ze.format,_t=Ze.type;if(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Ue),!et.textureFormatReadable(ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!et.textureTypeReadable(_t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ke=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ke),N.bufferData(N.PIXEL_PACK_BUFFER,Fe.byteLength,N.STREAM_READ),N.readPixels(H,j,Y,Z,z.convert(ft),z.convert(_t),0);const Rt=U!==null?A.get(U).__webglFramebuffer:null;ve.bindFramebuffer(N.FRAMEBUFFER,Rt);const Gt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await hg(N,Gt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ke),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Fe),N.deleteBuffer(Ke),N.deleteSync(Gt),Fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,H=null,j=0){const Y=Math.pow(2,-j),Z=Math.floor(E.image.width*Y),Fe=Math.floor(E.image.height*Y),Xe=H!==null?H.x:0,Ue=H!==null?H.y:0;S.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,j,0,0,Xe,Ue,Z,Fe),ve.unbindTexture()};const fm=N.createFramebuffer(),pm=N.createFramebuffer();this.copyTextureToTexture=function(E,H,j=null,Y=null,Z=0,Fe=0){let Xe,Ue,Ye,Ze,ft,_t,Ke,Rt,Gt;const Bt=E.isCompressedTexture?E.mipmaps[Fe]:E.image;if(j!==null)Xe=j.max.x-j.min.x,Ue=j.max.y-j.min.y,Ye=j.isBox3?j.max.z-j.min.z:1,Ze=j.min.x,ft=j.min.y,_t=j.isBox3?j.min.z:0;else{const Ht=Math.pow(2,-Z);Xe=Math.floor(Bt.width*Ht),Ue=Math.floor(Bt.height*Ht),E.isDataArrayTexture?Ye=Bt.depth:E.isData3DTexture?Ye=Math.floor(Bt.depth*Ht):Ye=1,Ze=0,ft=0,_t=0}Y!==null?(Ke=Y.x,Rt=Y.y,Gt=Y.z):(Ke=0,Rt=0,Gt=0);const Lt=z.convert(H.format),un=z.convert(H.type);let He;H.isData3DTexture?(S.setTexture3D(H,0),He=N.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(S.setTexture2DArray(H,0),He=N.TEXTURE_2D_ARRAY):(S.setTexture2D(H,0),He=N.TEXTURE_2D),ve.activeTexture(N.TEXTURE0),ve.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,H.flipY),ve.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),ve.pixelStorei(N.UNPACK_ALIGNMENT,H.unpackAlignment);const Un=ve.getParameter(N.UNPACK_ROW_LENGTH),bt=ve.getParameter(N.UNPACK_IMAGE_HEIGHT),qn=ve.getParameter(N.UNPACK_SKIP_PIXELS),ui=ve.getParameter(N.UNPACK_SKIP_ROWS),Gi=ve.getParameter(N.UNPACK_SKIP_IMAGES);ve.pixelStorei(N.UNPACK_ROW_LENGTH,Bt.width),ve.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Bt.height),ve.pixelStorei(N.UNPACK_SKIP_PIXELS,Ze),ve.pixelStorei(N.UNPACK_SKIP_ROWS,ft),ve.pixelStorei(N.UNPACK_SKIP_IMAGES,_t);const Vs=E.isDataArrayTexture||E.isData3DTexture,Dt=H.isDataArrayTexture||H.isData3DTexture;if(E.isDepthTexture){const Ht=A.get(E),Hi=A.get(H),Nt=A.get(Ht.__renderTarget),Wi=A.get(Hi.__renderTarget);ve.bindFramebuffer(N.READ_FRAMEBUFFER,Nt.__webglFramebuffer),ve.bindFramebuffer(N.DRAW_FRAMEBUFFER,Wi.__webglFramebuffer);for(let Gs=0;Gs<Ye;Gs++)Vs&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,A.get(E).__webglTexture,Z,_t+Gs),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,A.get(H).__webglTexture,Fe,Gt+Gs)),N.blitFramebuffer(Ze,ft,Xe,Ue,Ke,Rt,Xe,Ue,N.DEPTH_BUFFER_BIT,N.NEAREST);ve.bindFramebuffer(N.READ_FRAMEBUFFER,null),ve.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(Z!==0||E.isRenderTargetTexture||A.has(E)){const Ht=A.get(E),Hi=A.get(H);ve.bindFramebuffer(N.READ_FRAMEBUFFER,fm),ve.bindFramebuffer(N.DRAW_FRAMEBUFFER,pm);for(let Nt=0;Nt<Ye;Nt++)Vs?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ht.__webglTexture,Z,_t+Nt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ht.__webglTexture,Z),Dt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Hi.__webglTexture,Fe,Gt+Nt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Hi.__webglTexture,Fe),Z!==0?N.blitFramebuffer(Ze,ft,Xe,Ue,Ke,Rt,Xe,Ue,N.COLOR_BUFFER_BIT,N.NEAREST):Dt?N.copyTexSubImage3D(He,Fe,Ke,Rt,Gt+Nt,Ze,ft,Xe,Ue):N.copyTexSubImage2D(He,Fe,Ke,Rt,Ze,ft,Xe,Ue);ve.bindFramebuffer(N.READ_FRAMEBUFFER,null),ve.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Dt?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(He,Fe,Ke,Rt,Gt,Xe,Ue,Ye,Lt,un,Bt.data):H.isCompressedArrayTexture?N.compressedTexSubImage3D(He,Fe,Ke,Rt,Gt,Xe,Ue,Ye,Lt,Bt.data):N.texSubImage3D(He,Fe,Ke,Rt,Gt,Xe,Ue,Ye,Lt,un,Bt):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,Fe,Ke,Rt,Xe,Ue,Lt,un,Bt.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,Fe,Ke,Rt,Bt.width,Bt.height,Lt,Bt.data):N.texSubImage2D(N.TEXTURE_2D,Fe,Ke,Rt,Xe,Ue,Lt,un,Bt);ve.pixelStorei(N.UNPACK_ROW_LENGTH,Un),ve.pixelStorei(N.UNPACK_IMAGE_HEIGHT,bt),ve.pixelStorei(N.UNPACK_SKIP_PIXELS,qn),ve.pixelStorei(N.UNPACK_SKIP_ROWS,ui),ve.pixelStorei(N.UNPACK_SKIP_IMAGES,Gi),Fe===0&&H.generateMipmaps&&N.generateMipmap(He),ve.unbindTexture()},this.initRenderTarget=function(E){A.get(E).__webglFramebuffer===void 0&&S.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?S.setTextureCube(E,0):E.isData3DTexture?S.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?S.setTexture2DArray(E,0):S.setTexture2D(E,0),ve.unbindTexture()},this.resetState=function(){J=0,G=0,U=null,ve.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=vt._getDrawingBufferColorSpace(e),t.unpackColorSpace=vt._getUnpackColorSpace()}}const rS=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Au,AddEquation:es,AddOperation:Uf,AdditiveAnimationBlendMode:ku,AdditiveBlending:au,AgXToneMapping:Ru,AlphaFormat:Fu,AlwaysCompare:$f,AlwaysDepth:Uo,AlwaysStencilFunc:du,AmbientLight:Op,AnimationAction:$p,AnimationClip:ba,AnimationLoader:i0,AnimationMixer:D0,AnimationObjectGroup:P0,AnimationUtils:Q_,ArcCurve:cp,ArrayCamera:Gp,ArrowHelper:iv,AttachedBindMode:cu,Audio:Wp,AudioAnalyser:b0,AudioContext:hd,AudioListener:v0,AudioLoader:p0,AxesHelper:sv,BackSide:Mn,BasicDepthPacking:Bf,BasicShadowMap:xm,BatchedMesh:ip,BezierInterpolant:Ip,Bone:Xu,BooleanKeyframeTrack:Bs,Box2:G0,Box3:Kt,Box3Helper:tv,BoxGeometry:cs,BoxHelper:ev,BufferAttribute:Pt,BufferGeometry:ct,BufferGeometryLoader:zp,ByteType:Lu,Cache:yi,Camera:ic,CameraHelper:Q0,CanvasTexture:v_,CapsuleGeometry:Xl,CatmullRomCurve3:up,CineonToneMapping:Tu,CircleGeometry:$l,ClampToEdgeWrapping:In,Clock:B0,Color:Ne,ColorKeyframeTrack:od,ColorManagement:vt,Compatibility:og,CompressedArrayTexture:g_,CompressedCubeTexture:__,CompressedTexture:Wl,CompressedTextureLoader:s0,ConeGeometry:Tr,ConstantAlphaFactor:Pf,ConstantColorFactor:Rf,Controls:av,CubeCamera:Vp,CubeDepthTexture:op,CubeReflectionMapping:Si,CubeRefractionMapping:ss,CubeTexture:Ea,CubeTextureLoader:r0,CubeUVReflectionMapping:Sr,CubicBezierCurve:Zu,CubicBezierCurve3:dp,CubicInterpolant:Cp,CullFaceBack:ru,CullFaceFront:ff,CullFaceFrontBack:vm,CullFaceNone:hf,Curve:ci,CurvePath:fp,CustomBlending:mf,CustomToneMapping:Cu,CylinderGeometry:Ta,Cylindrical:V0,Data3DTexture:Ol,DataArrayTexture:Fl,DataTexture:ai,DataTextureLoader:a0,DataUtils:Hg,DecrementStencilOp:km,DecrementWrapStencilOp:zm,DefaultLoadingManager:Lp,DepthFormat:Ei,DepthStencilFormat:ts,DepthTexture:Ns,DetachedBindMode:Nf,DirectionalLight:Fp,DirectionalLightHelper:j0,DiscreteInterpolant:Rp,DodecahedronGeometry:ql,DoubleSide:_i,DstAlphaFactor:wf,DstColorFactor:Tf,DynamicCopyUsage:tg,DynamicDrawUsage:Zm,DynamicReadUsage:jm,EdgesGeometry:lp,EllipseCurve:Yl,EqualCompare:Hf,EqualDepth:Fo,EqualStencilFunc:Wm,EquirectangularReflectionMapping:Zr,EquirectangularRefractionMapping:Kr,Euler:oi,EventDispatcher:li,ExternalTexture:qu,ExtrudeGeometry:Zl,FileLoader:Bi,Float16BufferAttribute:Kg,Float32BufferAttribute:Ve,FloatType:yn,Fog:zl,FogExp2:Bl,FramebufferTexture:m_,FrontSide:Oi,Frustum:Er,FrustumArray:Hl,GLBufferAttribute:O0,GLSL1:ig,GLSL3:hu,GreaterCompare:Wf,GreaterDepth:ko,GreaterEqualCompare:Nl,GreaterEqualDepth:Oo,GreaterEqualStencilFunc:Ym,GreaterStencilFunc:$m,GridHelper:K0,Group:pr,HTMLTexture:x_,HalfFloatType:wi,HemisphereLight:Dp,HemisphereLightHelper:Z0,IcosahedronGeometry:Kl,ImageBitmapLoader:f0,ImageLoader:Ma,ImageUtils:Kf,IncrementStencilOp:Om,IncrementWrapStencilOp:Bm,InstancedBufferAttribute:yr,InstancedBufferGeometry:dd,InstancedInterleavedBuffer:Sl,InstancedMesh:np,Int16BufferAttribute:Yg,Int32BufferAttribute:Zg,Int8BufferAttribute:Xg,IntType:Al,InterleavedBuffer:Vl,InterleavedBufferAttribute:Vn,Interpolant:Rr,InterpolateBezier:uu,InterpolateDiscrete:ca,InterpolateLinear:gl,InterpolateSmooth:Ao,InterpolationSamplingMode:ag,InterpolationSamplingType:rg,InvertStencilOp:Vm,KeepStencilOp:ws,KeyframeTrack:Kn,LOD:ep,LatheGeometry:Jl,Layers:kl,LessCompare:Gf,LessDepth:No,LessEqualCompare:Ul,LessEqualDepth:Ds,LessEqualStencilFunc:Xm,LessStencilFunc:Hm,Light:ds,LightProbe:Bp,Line:os,Line3:qp,LineBasicMaterial:Sn,LineCurve:Ku,LineCurve3:hp,LineDashedMaterial:Tp,LineLoop:sp,LineSegments:Ti,LinearFilter:Ft,LinearInterpolant:ad,LinearMipMapLinearFilter:wm,LinearMipMapNearestFilter:Sm,LinearMipmapLinearFilter:xi,LinearMipmapNearestFilter:Jr,LinearSRGBColorSpace:da,LinearToneMapping:wu,LinearTransfer:ha,Loader:Pn,LoaderUtils:_u,LoadingManager:ld,LoopOnce:Ff,LoopPingPong:kf,LoopRepeat:Of,MOUSE:gm,Material:sn,MaterialBlending:ym,MaterialLoader:sc,MathUtils:vl,Matrix2:xu,Matrix3:lt,Matrix4:rt,MaxEquation:xf,Mesh:It,MeshBasicMaterial:ln,MeshDepthMaterial:id,MeshDistanceMaterial:sd,MeshLambertMaterial:wp,MeshMatcapMaterial:Ep,MeshNormalMaterial:Sp,MeshPhongMaterial:bp,MeshPhysicalMaterial:yp,MeshStandardMaterial:nd,MeshToonMaterial:Mp,MinEquation:vf,MirroredRepeatWrapping:aa,MixOperation:Df,MultiplyBlending:lu,MultiplyOperation:Sa,NearestFilter:Xt,NearestMipMapLinearFilter:Mm,NearestMipMapNearestFilter:bm,NearestMipmapLinearFilter:hr,NearestMipmapNearestFilter:Pu,NeutralToneMapping:Iu,NeverCompare:Vf,NeverDepth:Do,NeverStencilFunc:Gm,NoBlending:Mi,NoColorSpace:Di,NoNormalPacking:Lm,NoToneMapping:ri,NormalAnimationBlendMode:Dl,NormalBlending:Rs,NormalGAPacking:Um,NormalRGPacking:Dm,NotEqualCompare:Xf,NotEqualDepth:Bo,NotEqualStencilFunc:qm,NumberKeyframeTrack:xa,Object3D:St,ObjectLoader:d0,ObjectSpaceNormalMap:zf,OctahedronGeometry:Ar,OneFactor:bf,OneMinusConstantAlphaFactor:Lf,OneMinusConstantColorFactor:If,OneMinusDstAlphaFactor:Ef,OneMinusDstColorFactor:Af,OneMinusSrcAlphaFactor:Lo,OneMinusSrcColorFactor:Sf,OrthographicCamera:Ra,PCFShadowMap:Yr,PCFSoftShadowMap:pf,PMREMGenerator:bu,Path:Ml,PerspectiveCamera:tn,Plane:Qi,PlaneGeometry:Cr,PlaneHelper:nv,PointLight:Np,PointLightHelper:q0,Points:rp,PointsMaterial:$u,PolarGridHelper:J0,PolyhedronGeometry:us,PositionalAudio:y0,PropertyBinding:Mt,PropertyMixer:Xp,QuadraticBezierCurve:Ju,QuadraticBezierCurve3:ju,Quaternion:mn,QuaternionKeyframeTrack:Ca,QuaternionLinearInterpolant:Pp,R11_EAC_Format:qo,RED_GREEN_RGTC2_Format:la,RED_RGTC1_Format:fl,REVISION:El,RG11_EAC_Format:oa,RGBADepthPacking:Rm,RGBAFormat:bn,RGBAIntegerFormat:Ll,RGBA_ASTC_10x10_Format:ol,RGBA_ASTC_10x5_Format:sl,RGBA_ASTC_10x6_Format:rl,RGBA_ASTC_10x8_Format:al,RGBA_ASTC_12x10_Format:ll,RGBA_ASTC_12x12_Format:cl,RGBA_ASTC_4x4_Format:Ko,RGBA_ASTC_5x4_Format:Jo,RGBA_ASTC_5x5_Format:jo,RGBA_ASTC_6x5_Format:Qo,RGBA_ASTC_6x6_Format:el,RGBA_ASTC_8x5_Format:tl,RGBA_ASTC_8x6_Format:nl,RGBA_ASTC_8x8_Format:il,RGBA_BPTC_Format:ul,RGBA_ETC2_EAC_Format:$o,RGBA_PVRTC_2BPPV1_Format:Ho,RGBA_PVRTC_4BPPV1_Format:Go,RGBA_S3TC_DXT1_Format:Qr,RGBA_S3TC_DXT3_Format:ea,RGBA_S3TC_DXT5_Format:ta,RGBDepthPacking:Im,RGBFormat:Ou,RGBIntegerFormat:Em,RGB_BPTC_SIGNED_Format:dl,RGB_BPTC_UNSIGNED_Format:hl,RGB_ETC1_Format:Wo,RGB_ETC2_Format:Xo,RGB_PVRTC_2BPPV1_Format:Vo,RGB_PVRTC_4BPPV1_Format:zo,RGB_S3TC_DXT1_Format:jr,RGDepthPacking:Pm,RGFormat:rs,RGIntegerFormat:Pl,RawShaderMaterial:td,Ray:wr,Raycaster:k0,RectAreaLight:kp,RedFormat:Il,RedIntegerFormat:wa,ReinhardToneMapping:Eu,RenderTarget:zu,RenderTarget3D:U0,RepeatWrapping:ra,ReplaceStencilOp:Fm,ReverseSubtractEquation:_f,RingGeometry:jl,SIGNED_R11_EAC_Format:Yo,SIGNED_RED_GREEN_RGTC2_Format:ml,SIGNED_RED_RGTC1_Format:pl,SIGNED_RG11_EAC_Format:Zo,SRGBColorSpace:Tn,SRGBTransfer:At,Scene:Vu,ShaderChunk:mt,ShaderLib:vn,ShaderMaterial:Wn,ShadowMaterial:vp,Shape:Ps,ShapeGeometry:Ql,ShapePath:rv,ShapeUtils:si,ShortType:Du,Skeleton:Gl,SkeletonHelper:$0,SkinnedMesh:tp,Source:ns,Sphere:Jt,SphereGeometry:ii,Spherical:z0,SphericalHarmonics3:ud,SplineCurve:Qu,SpotLight:Up,SpotLightHelper:X0,Sprite:Qf,SpriteMaterial:Wu,SrcAlphaFactor:Po,SrcAlphaSaturateFactor:Cf,SrcColorFactor:Mf,StaticCopyUsage:eg,StaticDrawUsage:fa,StaticReadUsage:Jm,StereoCamera:m0,StreamCopyUsage:ng,StreamDrawUsage:Km,StreamReadUsage:Qm,StringKeyframeTrack:zs,SubtractEquation:gf,SubtractiveBlending:ou,TOUCH:_m,TangentSpaceNormalMap:ki,TetrahedronGeometry:Aa,Texture:kt,TextureLoader:o0,TextureUtils:dv,Timer:Hp,TimestampQuery:sg,TorusGeometry:Os,TorusKnotGeometry:ec,Triangle:Cn,TriangleFanDrawMode:Cm,TriangleStripDrawMode:Am,TrianglesDrawMode:Tm,TubeGeometry:tc,UVMapping:Tl,Uint16BufferAttribute:Gu,Uint32BufferAttribute:Hu,Uint8BufferAttribute:$g,Uint8ClampedBufferAttribute:qg,Uniform:md,UniformsGroup:F0,UniformsLib:Re,UniformsUtils:nc,UnsignedByteType:An,UnsignedInt101111Type:Nu,UnsignedInt248Type:vr,UnsignedInt5999Type:Uu,UnsignedIntType:Zn,UnsignedShort4444Type:Cl,UnsignedShort5551Type:Rl,UnsignedShortType:_r,VSMShadowMap:dr,Vector2:fe,Vector3:R,Vector4:yt,VectorKeyframeTrack:ya,VideoFrameTexture:p_,VideoTexture:ap,WebGL3DRenderTarget:Ug,WebGLArrayRenderTarget:Dg,WebGLCoordinateSystem:zn,WebGLCubeRenderTarget:gd,WebGLRenderTarget:Hn,WebGLRenderer:im,WebGLUtils:tm,WebGPUCoordinateSystem:Us,WebXRController:Co,WireframeGeometry:ed,WrapAroundEnding:ua,ZeroCurvatureEnding:Ts,ZeroFactor:yf,ZeroSlopeEnding:As,ZeroStencilOp:Nm,createCanvasElement:Yf,error:qe,getConsoleFunction:dg,log:ma,setConsoleFunction:ug,warn:Ce,warnOnce:_l},Symbol.toStringTag,{value:"Module"})),nf=new Kt,So=new R;class sm extends dd{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new Ve(e,3)),this.setAttribute("uv",new Ve(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new Sl(t,6,1);return this.setAttribute("instanceStart",new Vn(n,3,0)),this.setAttribute("instanceEnd",new Vn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new Sl(t,6,1);return this.setAttribute("instanceColorStart",new Vn(n,3,0)),this.setAttribute("instanceColorEnd",new Vn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ed(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kt);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),nf.setFromBufferAttribute(t),this.boundingBox.union(nf))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jt),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)So.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(So)),So.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(So));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}Re.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new fe(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};vn.line={uniforms:nc.merge([Re.common,Re.fog,Re.line]),vertexShader:`
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
		`};class oc extends Wn{constructor(e){super({type:"LineMaterial",uniforms:nc.clone(vn.line.uniforms),vertexShader:vn.line.vertexShader,fragmentShader:vn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const jc=new yt,sf=new R,rf=new R,rn=new yt,an=new yt,mi=new yt,Qc=new R,eu=new rt,on=new qp,af=new R,wo=new Kt,Eo=new Jt,gi=new yt;let vi,Ls;function of(r,e,t){return gi.set(0,0,-e,1).applyMatrix4(r.projectionMatrix),gi.multiplyScalar(1/gi.w),gi.x=Ls/t.width,gi.y=Ls/t.height,gi.applyMatrix4(r.projectionMatrixInverse),gi.multiplyScalar(1/gi.w),Math.abs(Math.max(gi.x,gi.y))}function aS(r,e){const t=r.matrixWorld,n=r.geometry,i=n.attributes.instanceStart,s=n.attributes.instanceEnd,a=Math.min(n.instanceCount,i.count);for(let o=0,l=a;o<l;o++){on.start.fromBufferAttribute(i,o),on.end.fromBufferAttribute(s,o),on.applyMatrix4(t);const c=new R,u=new R;vi.distanceSqToSegment(on.start,on.end,u,c),u.distanceTo(c)<Ls*.5&&e.push({point:u,pointOnLine:c,distance:vi.origin.distanceTo(u),object:r,face:null,faceIndex:o,uv:null,uv1:null})}}function oS(r,e,t){const n=e.projectionMatrix,s=r.material.resolution,a=r.matrixWorld,o=r.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,u=Math.min(o.instanceCount,l.count),h=-e.near;vi.at(1,mi),mi.w=1,mi.applyMatrix4(e.matrixWorldInverse),mi.applyMatrix4(n),mi.multiplyScalar(1/mi.w),mi.x*=s.x/2,mi.y*=s.y/2,mi.z=0,Qc.copy(mi),eu.multiplyMatrices(e.matrixWorldInverse,a);for(let d=0,f=u;d<f;d++){if(rn.fromBufferAttribute(l,d),an.fromBufferAttribute(c,d),rn.w=1,an.w=1,rn.applyMatrix4(eu),an.applyMatrix4(eu),rn.z>h&&an.z>h)continue;if(rn.z>h){const v=rn.z-an.z,y=(rn.z-h)/v;rn.lerp(an,y)}else if(an.z>h){const v=an.z-rn.z,y=(an.z-h)/v;an.lerp(rn,y)}rn.applyMatrix4(n),an.applyMatrix4(n),rn.multiplyScalar(1/rn.w),an.multiplyScalar(1/an.w),rn.x*=s.x/2,rn.y*=s.y/2,an.x*=s.x/2,an.y*=s.y/2,on.start.copy(rn),on.start.z=0,on.end.copy(an),on.end.z=0;const x=on.closestPointToPointParameter(Qc,!0);on.at(x,af);const m=vl.lerp(rn.z,an.z,x),p=m>=-1&&m<=1,_=Qc.distanceTo(af)<Ls*.5;if(p&&_){on.start.fromBufferAttribute(l,d),on.end.fromBufferAttribute(c,d),on.start.applyMatrix4(a),on.end.applyMatrix4(a);const v=new R,y=new R;vi.distanceSqToSegment(on.start,on.end,y,v),t.push({point:y,pointOnLine:v,distance:vi.origin.distanceTo(y),object:r,face:null,faceIndex:d,uv:null,uv1:null})}}}class lS extends It{constructor(e=new sm,t=new oc({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)sf.fromBufferAttribute(t,a),rf.fromBufferAttribute(n,a),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+sf.distanceTo(rf);const s=new Sl(i,2,1);return e.setAttribute("instanceDistanceStart",new Vn(s,1,0)),e.setAttribute("instanceDistanceEnd",new Vn(s,1,1)),this}raycast(e,t){const n=this.material.worldUnits,i=e.camera;i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;vi=e.ray;const a=this.matrixWorld,o=this.geometry,l=this.material;Ls=l.linewidth+s,o.boundingSphere===null&&o.computeBoundingSphere(),Eo.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=Ls*.5;else{const h=Math.max(i.near,Eo.distanceToPoint(vi.origin));c=of(i,h,l.resolution)}if(Eo.radius+=c,vi.intersectsSphere(Eo)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),wo.copy(o.boundingBox).applyMatrix4(a);let u;if(n)u=Ls*.5;else{const h=Math.max(i.near,wo.distanceToPoint(vi.origin));u=of(i,h,l.resolution)}wo.expandByScalar(u),vi.intersectsBox(wo)!==!1&&(n?aS(this,t):oS(this,i,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(jc),this.material.uniforms.resolution.value.set(jc.z,jc.w))}}class _d extends sm{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}setFromPoints(e){const t=e.length-1,n=new Float32Array(6*t);for(let i=0;i<t;i++)n[6*i]=e[i].x,n[6*i+1]=e[i].y,n[6*i+2]=e[i].z||0,n[6*i+3]=e[i+1].x,n[6*i+4]=e[i+1].y,n[6*i+5]=e[i+1].z||0;return super.setPositions(n),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class rm extends lS{constructor(e=new _d,t=new oc({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const Ni={R0:.35,R1:1.6,R2:2.2,R3:3};function am(r){const e=[];e.push({id:r.root.id,name:r.root.name,layer:0,position:new R(0,0,Ni.R0)});const t=r.lifelines.filter(i=>i.parent_id===r.root.id),n=t.length;return t.forEach((i,s)=>{const a=s/n*Math.PI*2,o=tu(Ni.R1,a,0);e.push({id:i.id,name:i.name,layer:1,position:o,parentId:r.root.id})}),r.lifelines.filter(i=>i.parent_id!==r.root.id).forEach(i=>{const s=e.find(f=>f.id===i.parent_id);if(!s)return;const a=r.lifelines.filter(f=>f.parent_id===i.parent_id),o=a.findIndex(f=>f.id===i.id),l=Math.atan2(s.position.y,s.position.x),c=Math.PI/4,u=o-(a.length-1)/2,h=l+u*(c/Math.max(a.length,1)),d=tu(Ni.R2,h,(Math.random()-.5)*.15);e.push({id:i.id,name:i.name,layer:2,position:d,parentId:i.parent_id})}),r.entities.forEach(i=>{const s=e.find(f=>f.id===i.lifeline_id);if(!s)return;const a=r.entities.filter(f=>f.lifeline_id===i.lifeline_id),o=a.findIndex(f=>f.id===i.id),l=Math.atan2(s.position.y,s.position.x),c=Math.PI/6,u=o-(a.length-1)/2,h=l+u*(c/Math.max(a.length,1)),d=tu(Ni.R3,h+(Math.random()-.5)*.08,(Math.random()-.5)*.12);e.push({id:i.id,name:i.title,layer:3,position:d,parentId:i.lifeline_id,kind:i.kind})}),e}function tu(r,e,t){const n=r*Math.cos(t)*Math.cos(e),i=r*Math.sin(t),s=r*Math.cos(t)*Math.sin(e);return new R(n,i,s)}function cS(r,e,t,n){const i=r.find(v=>v.id===e);if(!i)return{targets:new Map,constellationIds:new Set};const s=i.position.clone(),a=n.clone().normalize(),o=new R(0,1,0),l=new R().crossVectors(a,o);if(l.length()<.001){const v=new R(1,0,0);l.crossVectors(a,v).normalize()}else l.normalize();const c=new R().crossVectors(l,a).normalize(),u=new Map,h=new Set;u.set(e,s.clone()),h.add(e);const d=[];let f=i.parentId;for(;f&&d.length<2;){const v=r.find(y=>y.id===f);if(v)d.push(v),f=v.parentId;else break}d.forEach((v,y)=>{const w=s.clone().addScaledVector(a,.18+y*.14).addScaledVector(c,.06);u.set(v.id,w),h.add(v.id)});const g=r.filter(v=>v.id!==e&&v.layer===3&&v.parentId===i.parentId).slice(0,12);g.forEach((v,y)=>{const w=g.length===1?0:(y/(g.length-1)-.5)*(Math.PI*2/3),M=s.clone().addScaledVector(a,.12).addScaledVector(l,Math.cos(w)*.25).addScaledVector(c,Math.sin(w)*.25);u.set(v.id,M),h.add(v.id)});const x=new Set;for(const v of t)v.confidence>=.7&&v.status!=="rejected"&&(v.from===e&&x.add(v.to),v.to===e&&x.add(v.from));const m=r.filter(v=>x.has(v.id)&&!h.has(v.id)).slice(0,6);m.forEach((v,y)=>{const w=m.length===1?0:(y/(m.length-1)-.5)*(Math.PI/2),M=s.clone().addScaledVector(a,-.08).addScaledVector(l,Math.cos(w)*.22).addScaledVector(c,Math.sin(w)*.22);u.set(v.id,M),h.add(v.id)});const p=new Set;for(const v of t)v.confidence>=.3&&v.confidence<.7&&v.status!=="rejected"&&(v.from===e&&p.add(v.to),v.to===e&&p.add(v.from));const _=r.filter(v=>p.has(v.id)&&!h.has(v.id)).slice(0,6);return _.forEach((v,y)=>{const w=_.length===1?0:(y/(_.length-1)-.5)*(Math.PI*5/6),M=s.clone().addScaledVector(a,-.04).addScaledVector(l,Math.cos(w)*.38).addScaledVector(c,Math.sin(w)*.38);u.set(v.id,M),h.add(v.id)}),{targets:u,constellationIds:h}}const uS=Object.freeze(Object.defineProperty({__proto__:null,RADII:Ni,computeFocusLayout:cS,computeLayout:am},Symbol.toStringTag,{value:"Module"}));function ti(r){const e=getComputedStyle(document.documentElement).getPropertyValue(r).trim();if(!e)return"#6ee7d0";const t=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);return t?"#"+[t[1],t[2],t[3]].map(n=>parseInt(n).toString(16).padStart(2,"0")).join(""):e}function dS(r){const e=[];for(const t of r)e.push(t.x,t.y,t.z);return e}async function hS(r,e){const t=new Vu;t.background=new Ne("#07090d");const n=r.clientWidth,i=r.clientHeight,s=new fe(n,i),a=new tn(60,n/i,.1,20);a.position.set(0,2.5,5.5),a.lookAt(0,0,0);const o=new im({canvas:r,antialias:!0});o.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.setSize(n,i);const l=am(e),c=[],u=[],h=[],d=[];for(const v of l){let y,w;const M=v.layer===0||v.layer===1?1:v.layer===2?.9:.85;if(v.layer===0)y=new ii(.06,16,16),w=new ln({color:ti("--accent")});else if(v.layer===1)y=new ii(.05,12,12),w=new ln({color:ti("--accent"),transparent:!0,opacity:M});else if(v.layer===2)y=new ii(.03,8,8),w=new ln({color:ti("--text-2"),transparent:!0,opacity:M});else{v.kind==="task"?y=new cs(.022,.022,.022):v.kind==="decision"?y=new Ar(.022):v.kind==="memory"?y=new ii(.02,8,8):v.kind==="item"?y=new Aa(.02):y=new ii(.015,8,8);const T={task:"--accent",memory:"--text-2",decision:"--warm",item:"--text-3"}[v.kind||""]||"--text-3";w=new ln({color:ti(T),transparent:!0,opacity:M})}const C=new It(y,w);if(C.position.copy(v.position),C.userData={id:v.id,name:v.name,kind:v.kind,layer:v.layer,parentId:v.parentId,homePosition:v.position.clone(),targetPosition:v.position.clone()},t.add(C),c.push(C),u.push(C),v.layer===3){const b=new ii(.04,8,8),T=new ln({visible:!1}),L=new It(b,T);L.position.copy(v.position),L.userData=C.userData,u.push(L)}}for(const v of l){if(!v.parentId)continue;const y=l.find(L=>L.id===v.parentId);if(!y)continue;const w=8,M=[];for(let L=0;L<=w;L++){const I=L/w,B=new R().lerpVectors(y.position,v.position,I).normalize().multiplyScalar(y.position.length()*(1-I)+v.position.length()*I);M.push(B)}const C=new _d;C.setPositions(dS(M));const b=new oc({color:new Ne(ti("--line-2")),linewidth:1.5,worldUnits:!1,resolution:s,transparent:!0,opacity:.65,depthTest:!0});d.push(b);const T=new rm(C,b);T.computeLineDistances(),T.userData={fromLayer:y.layer,toLayer:v.layer},t.add(T),h.push(T)}const f=new Os(Ni.R1,.006,8,80),g=new It(f,new ln({color:ti("--line-2"),transparent:!0,opacity:.12}));g.rotation.x=vl.degToRad(15),t.add(g);const x=new Os(Ni.R2,.004,8,80),m=new It(x,new ln({color:ti("--line-2"),transparent:!0,opacity:.08}));m.rotation.x=vl.degToRad(15),t.add(m);function p(v,y){s.set(v,y),d.forEach(w=>{w.resolution.set(v,y)})}function _(){t.traverse(v=>{if(v instanceof It){v.geometry?.dispose();const y=v.material;y instanceof sn&&(Array.isArray(y)?y.forEach(w=>w.dispose()):y.dispose())}}),h.forEach(v=>{v.geometry?.dispose()}),d.forEach(v=>v.dispose()),o.dispose()}return{scene:t,camera:a,renderer:o,nodes:c,pickables:u,lines:h,orbit:g,layoutNodes:l,dispose:_,setResolution:p}}const lf=1,fS=3.5;function pS(r){return Math.max(lf,Math.min(fS,lf+(r-.3)*3.57))}function mS(r,e,t,n){const i=new R().subVectors(e,r).normalize(),s=.03+n*.005,a=new Tr(s,s*2.5,6,1),o=new ln({color:new Ne(t)}),l=new It(a,o),c=e.clone().addScaledVector(i,-.04);l.position.copy(c);const u=new mn;return u.setFromUnitVectors(new R(0,1,0),i),l.setRotationFromQuaternion(u),l}function gS(r,e,t,n,i){const s=i||new fe(window.innerWidth,window.innerHeight),a=[],o=e.associations.filter(c=>(c.from===n||c.to===n)&&c.confidence>=.7).slice(0,20),l={co_occurrence:"--text-3",causal:"--accent",tension:"--warm",derived_from:"--accent-dim",manual:"--accent"};for(const c of o){const u=t.find(v=>v.id===c.from),h=t.find(v=>v.id===c.to);if(!u||!h)continue;const d=new _d;d.setPositions([u.position.x,u.position.y,u.position.z,h.position.x,h.position.y,h.position.z]);const f=pS(c.confidence),g=.5+(c.confidence-.5)*.8,x=ti(l[c.relation_type]||"--text-3"),m=new oc({color:new Ne(x),linewidth:f,worldUnits:!1,resolution:s,transparent:!0,opacity:c.status==="pending"?g*.8:g,depthTest:!1,dashed:c.status==="pending",dashSize:.06,gapSize:.04}),p=new rm(d,m);p.computeLineDistances(),p.userData={associationId:c.id,...c,_origLinewidth:f,_origColor:p.material.color.getHex()},r.add(p);let _;c.status==="accepted"&&(_=mS(u.position,h.position,x,f),r.add(_)),a.push({line:p,data:c,fromNode:u,toNode:h,arrow:_})}return a}function _S(r,e,t=.05){r.forEach(n=>{const i=n.userData.id,s=n.material;e.has(i)?(s.opacity=1,s.transparent=!0):(s.opacity=t,s.transparent=!0),s.needsUpdate=!0})}function cf(r){r.forEach(e=>{const t=e.userData.layer,n=t===0||t===1?1:t===2?.9:.85,i=e.material;i.opacity=n,i.transparent=!0,i.needsUpdate=!0})}function vS(r,e,t=6){const n=1-Math.exp(-t*e);for(const i of r){const s=i.userData.targetPosition;s&&i.position.lerp(s,n)}}function xS(r,e,t=.06){om(r,e,t)}function om(r,e,t=.06){for(const n of r){const i=n.userData.id,s=n.userData.layer,a=n.material;if(e.has(i)){const o=s===0||s===1?1:s===2?.9:.85;a.opacity=o}else a.opacity=t;a.transparent=!0,a.needsUpdate=!0}}function yS(r,e,t){const n=new Os(.04,.004,8,16),i=new ln({color:new Ne(t),transparent:!0,opacity:.5}),s=new It(n,i);return s.position.copy(e),s.name="focusHalo",s.renderOrder=999,s.material.depthTest=!1,s.material.depthWrite=!1,r.add(s),s}function nu(r){const e=r.getObjectByName("focusHalo");if(e&&(r.remove(e),e.geometry&&e.geometry.dispose(),e.material)){const t=e.material;Array.isArray(t)?t.forEach(n=>n.dispose()):t.dispose()}}function bS(r,e,t,n){for(const i of r){const s=i.userData.id;if(i.userData.layer===3&&t.has(s)){i.scale.setScalar(1.3);const a=i.material;a._pathOrigColor=a._pathOrigColor??a.color.getHex(),a.color.set("#a0fff0"),a.needsUpdate=!0}}for(const i of e){const s=i.line.material;n.has(i.data.id)?(s._pathOrigLinewidth=s._pathOrigLinewidth??s.linewidth,s._pathOrigColor=s._pathOrigColor??s.color.getHex(),s.linewidth=(s._pathOrigLinewidth||1.5)*2,s.color.set("#a0fff0"),s.opacity=1):s.opacity=.15}}function uf(r,e){for(const t of r){const n=t.material;n._pathOrigColor!==void 0&&(n.color.setHex(n._pathOrigColor),delete n._pathOrigColor,t.scale.setScalar(1),n.needsUpdate=!0)}for(const t of e){const n=t.line.material;n._pathOrigLinewidth!==void 0&&(n.linewidth=n._pathOrigLinewidth,delete n._pathOrigLinewidth),n._pathOrigColor!==void 0&&(n.color.setHex(n._pathOrigColor),delete n._pathOrigColor),n.opacity=n.opacity<.2?.8:n.opacity}}function MS(r){return r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2}let kn=null;function To(r,e,t,n,i,s=800){kn={elapsed:0,duration:s,from:{position:r.position.clone(),target:e.target.clone(),fov:r.fov},to:{position:t.clone(),target:n.clone(),fov:i}}}function SS(r,e,t){if(!kn)return!1;kn.elapsed+=r*1e3;const n=Math.min(kn.elapsed/kn.duration,1),i=MS(n);return e.position.lerpVectors(kn.from.position,kn.to.position,i),t.target.lerpVectors(kn.from.target,kn.to.target,i),e.fov=kn.from.fov+(kn.to.fov-kn.from.fov)*i,e.updateProjectionMatrix(),n>=1?(kn=null,!1):!0}const wS={class:"breadcrumb"},ES={key:0,class:"sep"},TS=["onClick"],AS={key:2,class:"crumb-current"},CS=$n({__name:"Breadcrumb",props:{state:{}},emits:["nav"],setup(r,{emit:e}){const t=r,n=e,i=ks(),s=nn(()=>{const a=t.state,o=[{label:"Atlas",action:{kind:"global_overview"}}],l=a.kind==="region_zoom"?a.lifeline_id:a.kind==="node_focus"||a.kind==="relation_reveal"?i.data?.entities.find(h=>h.id===a.entity_id)?.lifeline_id:null;if(!l)return o;const c=[];let u=l;for(;u;){const h=i.data?.lifelines.find(f=>f.id===u);if(!h)break;const d=h.parent_id==="ROOT"?1:2;c.unshift({id:h.id,name:h.name,layer:d}),u=h.parent_id!=="ROOT"?h.parent_id:void 0}for(const h of c)o.push({label:h.name,action:{kind:"region_zoom",lifeline_id:h.id}});if(a.kind==="node_focus"||a.kind==="relation_reveal"){const h=a.entity_id,d=i.data?.entities.find(f=>f.id===h);d&&o.push({label:d.title.slice(0,20),action:null}),a.kind==="relation_reveal"&&o.push({label:"(关联)",action:null})}return o});return(a,o)=>(X(),q("div",wS,[(X(!0),q(nt,null,cn(s.value,(l,c)=>(X(),q(nt,{key:c},[c>0?(X(),q("span",ES,"›")):We("",!0),l.action?(X(),q("button",{key:1,class:"crumb-link",onClick:u=>n("nav",l.action)},ye(l.label),9,TS)):(X(),q("span",AS,ye(l.label),1))],64))),128))]))}}),RS=Xn(CS,[["__scopeId","data-v-54bd57ef"]]),IS={key:0,class:"lifeline-panel"},PS={class:"panel-header"},LS={class:"stats-row"},DS={class:"stats-count"},US={class:"stats-kinds"},NS={class:"kind-t"},FS={class:"kind-m"},OS={class:"kind-d"},kS={class:"kind-i"},BS={key:0,class:"inline-form"},zS=["value"],VS={class:"form-actions"},GS={key:0,class:"drop-line"},HS=["onDragstart","onDragover","onDrop"],WS=["onClick"],XS=["onClick","onDblclick"],$S={class:"kind-t"},qS={class:"kind-m"},YS={class:"kind-d"},ZS={class:"kind-i"},KS={class:"badge"},JS={key:0,class:"actions"},jS=["onClick"],QS=["onClick"],e1=["onKeyup"],t1={class:"form-actions"},n1=["onClick"],i1=["onClick"],s1={key:0,class:"confirm-delete"},r1={class:"form-actions"},a1=["onClick"],o1=["onClick"],l1={class:"entity-kind"},c1={class:"entity-title"},u1=["onClick"],d1=["onClick"],h1={key:1,class:"empty"},f1={class:"search-box"},p1={key:0,class:"loading-text"},m1={key:1,class:"search-results"},g1={key:0,class:"loading-text"},_1=["onClick"],v1={class:"entity-kind"},x1={class:"entity-title"},y1={key:0,class:"mounted-tag"},b1=$n({__name:"LifelinePanel",emits:["focus-lifeline","focus-entity"],setup(r,{emit:e}){const t=e,n=ks(),i=nn(()=>{const te=n.state;return te.kind==="region_zoom"?te.lifeline_id??null:te.kind==="node_focus"||te.kind==="relation_reveal"?n.data?.entities.find(ue=>ue.id===te.entity_id)?.lifeline_id??null:null}),s=nn(()=>{const te=n.state;return te.kind==="node_focus"||te.kind==="relation_reveal"?te.entity_id??null:null}),a=nn(()=>{if(!n.data)return{lifelines:0,entities:0,byKind:{task:0,memory:0,decision:0,item:0}};const te={task:0,memory:0,decision:0,item:0};for(const ue of n.data.entities)te[ue.kind]!==void 0&&te[ue.kind]++;return{lifelines:n.data.lifelines.length,entities:n.data.entities.length,byKind:te}});function o(te){const ue={task:0,memory:0,decision:0,item:0};if(!n.data)return ue;for(const ne of n.data.entities)ne.lifeline_id===te&&ue[ne.kind]!==void 0&&ue[ne.kind]++;return ue}const l=Be(new Set),c=Be(!1),u=Be(null),h=Be(null),d=Be(null),f=Be(null),g=Be(-1),x=Be(null);function m(te,ue){f.value={id:ue.id,parentId:ue.parent_id},x.value=ue.parent_id,te.dataTransfer&&(te.dataTransfer.effectAllowed="move",te.dataTransfer.setData("text/plain",ue.id))}function p(te,ue){te.preventDefault(),g.value=ue}function _(){g.value=-1}function v(te){te.preventDefault()}async function y(te,ue,ne){if(te.preventDefault(),g.value=-1,!f.value||!n.data)return;const{id:se,parentId:ee}=f.value;if(ee!==ne){f.value=null,x.value=null;return}const re=n.data.lifelines.filter(et=>et.parent_id===ee);re.sort((et,ve)=>et.order_index-ve.order_index);const ge=re.findIndex(et=>et.id===se);if(ge===-1||ge===ue){f.value=null,x.value=null;return}const _e=[...re.slice(0,ge),...re.slice(ge+1)],Qe=ue>ge?ue-1:ue,N=Qe>0?_e[Qe-1]:null,tt=Qe<_e.length?_e[Qe]:null;let Ge;N?tt?Ge=(N.order_index+tt.order_index)/2:Ge=N.order_index+1:Ge=(tt?.order_index??1)-1,f.value=null,x.value=null,await n.updateLifeline(se,{order_index:Ge})}function w(){f.value=null,x.value=null,g.value=-1}const M=Be(""),C=Be([]),b=Be(!1),T=Be(""),L=Be(""),I=Be("ROOT"),B=Be(""),J=nn(()=>{if(!n.data)return[];const te=n.data.lifelines,ue={};for(const se of te){const ee=se.parent_id;ue[ee]||(ue[ee]=[]),ue[ee].push(se)}function ne(se,ee){return(ue[se]||[]).map(ge=>({lifeline:ge,children:ne(ge.id,ee+1),depth:ee}))}return ne("ROOT",0)});function G(te){return n.data?n.data.entities.filter(ue=>ue.lifeline_id===te).length:0}function U(te){return n.data?n.data.entities.filter(ue=>ue.lifeline_id===te):[]}function O(te){l.value.has(te)?l.value.delete(te):l.value.add(te)}function V(te){return l.value.has(te)}function ce(te){return i.value===te}function me(te){t("focus-lifeline",te)}async function we(){!T.value.trim()||!L.value.trim()||(await n.createLifeline({id:T.value.trim(),name:L.value.trim(),parent_id:I.value==="ROOT"?void 0:I.value}),T.value="",L.value="",I.value="ROOT",c.value=!1)}function Ie(te){u.value=te.id,B.value=te.name}async function ke(te){B.value.trim()&&B.value!==te.name&&await n.updateLifeline(te.id,{name:B.value.trim()}),u.value=null}function st(){u.value=null}async function oe(te){await n.deleteLifeline(te.id),h.value=null}async function $(te){const ue=te.id.split(":"),ne=ue[0],se=parseInt(ue.slice(1).join(":"),10);await n.mountEntity(ne,se,null)}async function F(te){d.value=te,M.value="",C.value=[]}async function K(){const te=M.value.trim();if(!(!te||te.length<1)){b.value=!0;try{const{searchAll:ue}=await Et(async()=>{const{searchAll:ee}=await import("./index-_ulAEbzr.js").then(re=>re.e);return{searchAll:ee}},__vite__mapDeps([0,1,2])),ne=await ue(te,5),se=[];for(const ee of ne.items||[]){const re=`item:${ee.id}`,ge=n.data?.entities.find(_e=>_e.id===re);se.push({id:re,kind:"item",title:ee.content?.slice(0,60)||"",lifeline_id:ge?.lifeline_id,mounted_name:ge?.lifeline_id?n.data?.lifelines.find(_e=>_e.id===ge.lifeline_id)?.name||ge.lifeline_id:void 0})}for(const ee of ne.tasks||[]){const re=`task:${ee.id}`,ge=n.data?.entities.find(_e=>_e.id===re);se.push({id:re,kind:"task",title:ee.title?.slice(0,60)||"",lifeline_id:ge?.lifeline_id,mounted_name:ge?.lifeline_id?n.data?.lifelines.find(_e=>_e.id===ge.lifeline_id)?.name||ge.lifeline_id:void 0})}for(const ee of ne.memories||[]){const re=`memory:${ee.id}`,ge=n.data?.entities.find(_e=>_e.id===re);se.push({id:re,kind:"memory",title:ee.content?.slice(0,60)||"",lifeline_id:ge?.lifeline_id,mounted_name:ge?.lifeline_id?n.data?.lifelines.find(_e=>_e.id===ge.lifeline_id)?.name||ge.lifeline_id:void 0})}for(const ee of ne.decisions||[]){const re=`decision:${ee.id}`,ge=n.data?.entities.find(_e=>_e.id===re);se.push({id:re,kind:"decision",title:ee.title?.slice(0,60)||"",lifeline_id:ge?.lifeline_id,mounted_name:ge?.lifeline_id?n.data?.lifelines.find(_e=>_e.id===ge.lifeline_id)?.name||ge.lifeline_id:void 0})}C.value=se}finally{b.value=!1}}}async function pe(te){if(!d.value)return;const ue=te.id.split(":"),ne=ue[0],se=parseInt(ue.slice(1).join(":"),10);await n.mountEntity(ne,se,d.value),d.value=null,C.value=[]}function Ae(){d.value=null,C.value=[]}function $e(){return n.data?[{id:"ROOT",name:"ROOT (根级)"},...n.data.lifelines.map(te=>({id:te.id,name:te.name}))]:[{id:"ROOT",name:"ROOT (根级)"}]}return(te,ue)=>Je(n).data?(X(),q("div",IS,[P("div",PS,[ue[10]||(ue[10]=P("span",{class:"panel-title"},"Lifeline",-1)),P("button",{class:"btn-text",onClick:ue[0]||(ue[0]=ne=>c.value=!c.value)},"+ 新建")]),P("div",LS,[P("span",DS,ye(a.value.lifelines)+" lifeline · "+ye(a.value.entities)+" entity",1),P("span",US,[P("span",NS,"T:"+ye(a.value.byKind.task),1),P("span",FS,"M:"+ye(a.value.byKind.memory),1),P("span",OS,"D:"+ye(a.value.byKind.decision),1),P("span",kS,"I:"+ye(a.value.byKind.item),1)])]),c.value?(X(),q("div",BS,[Tt(P("input",{"onUpdate:modelValue":ue[1]||(ue[1]=ne=>T.value=ne),class:"field",placeholder:"ID (英文短名)",onKeyup:ni(we,["enter"])},null,544),[[Vt,T.value]]),Tt(P("input",{"onUpdate:modelValue":ue[2]||(ue[2]=ne=>L.value=ne),class:"field",placeholder:"显示名称",onKeyup:ni(we,["enter"])},null,544),[[Vt,L.value]]),Tt(P("select",{"onUpdate:modelValue":ue[3]||(ue[3]=ne=>I.value=ne),class:"field"},[(X(!0),q(nt,null,cn($e(),ne=>(X(),q("option",{key:ne.id,value:ne.id},ye(ne.name),9,zS))),128))],512),[[bi,I.value]]),P("div",VS,[P("button",{class:"btn-text",onClick:we},"保存"),P("button",{class:"btn-text",onClick:ue[4]||(ue[4]=ne=>c.value=!1)},"取消")])])):We("",!0),P("div",{class:"tree",onDragover:v,onDrop:ue[7]||(ue[7]=pn(()=>{},["prevent"]))},[(X(!0),q(nt,null,cn(J.value,(ne,se)=>(X(),q(nt,{key:ne.lifeline.id},[g.value===se&&x.value===ne.lifeline.parent_id?(X(),q("div",GS)):We("",!0),P("div",{class:Rn(["tree-row",{active:ce(ne.lifeline.id),dragging:f.value?.id===ne.lifeline.id}]),style:ur({paddingLeft:ne.depth*16+4+"px"}),draggable:!0,onDragstart:ee=>m(ee,ne.lifeline),onDragover:ee=>p(ee,se),onDragleave:_,onDrop:ee=>y(ee,se,ne.lifeline.parent_id),onDragend:w},[P("span",{class:Rn(["drag-handle",{visible:f.value}])},"⠿",2),P("span",{class:"arrow",onClick:ee=>O(ne.lifeline.id)},ye(V(ne.lifeline.id)?"▼":"▶"),9,WS),P("span",{class:"name",onClick:ee=>me(ne.lifeline.id),onDblclick:pn(ee=>Ie(ne.lifeline),["stop"])},[Bn(ye(ne.lifeline.name)+" ",1),V(ne.lifeline.id)?(X(),q(nt,{key:0},[P("span",$S,"T:"+ye(o(ne.lifeline.id).task),1),P("span",qS,"M:"+ye(o(ne.lifeline.id).memory),1),P("span",YS,"D:"+ye(o(ne.lifeline.id).decision),1),P("span",ZS,"I:"+ye(o(ne.lifeline.id).item),1)],64)):We("",!0),P("span",KS,"("+ye(G(ne.lifeline.id))+")",1)],40,XS),u.value!==ne.lifeline.id?(X(),q("span",JS,[P("button",{class:"btn-icon",onClick:pn(ee=>Ie(ne.lifeline),["stop"]),title:"编辑名称"},"✎",8,jS),P("button",{class:"btn-icon",onClick:pn(ee=>h.value=ne.lifeline.id,["stop"]),title:"删除 lifeline"},"✕",8,QS)])):We("",!0)],46,HS),u.value===ne.lifeline.id?(X(),q("div",{key:1,class:"inline-edit",style:ur({paddingLeft:ne.depth*16+20+"px"})},[Tt(P("input",{"onUpdate:modelValue":ue[5]||(ue[5]=ee=>B.value=ee),class:"field",onKeyup:[ni(ee=>ke(ne.lifeline),["enter"]),ni(st,["esc"])]},null,40,e1),[[Vt,B.value]]),P("div",t1,[P("button",{class:"btn-text",onClick:ee=>ke(ne.lifeline)},"保存",8,n1),P("button",{class:"btn-text",onClick:st},"取消"),h.value!==ne.lifeline.id?(X(),q("button",{key:0,class:"btn-text danger",onClick:ee=>h.value=ne.lifeline.id},"删除",8,i1)):We("",!0)]),h.value===ne.lifeline.id?(X(),q("div",s1,[Bn(" 确定删除「"+ye(ne.lifeline.name)+"」？挂载的 "+ye(G(ne.lifeline.id))+" 个 entity 将被卸载。 ",1),P("div",r1,[P("button",{class:"btn-text danger",onClick:ee=>oe(ne.lifeline)},"确认删除",8,a1),P("button",{class:"btn-text",onClick:ue[6]||(ue[6]=ee=>h.value=null)},"取消")])])):We("",!0)],4)):We("",!0),V(ne.lifeline.id)?(X(),q(nt,{key:2},[(X(!0),q(nt,null,cn(U(ne.lifeline.id),ee=>(X(),q("div",{key:ee.id,class:Rn(["entity-row",{active:s.value===ee.id}]),style:ur({paddingLeft:ne.depth*16+28+"px"}),onClick:re=>t("focus-entity",ee.id)},[P("span",l1,ye(ee.kind[0].toUpperCase()),1),P("span",c1,ye(ee.title.slice(0,30)),1),P("button",{class:"btn-icon",onClick:pn(re=>$(ee),["stop"]),title:"卸载"},"×",8,u1)],14,o1))),128)),P("div",{class:"entity-row add-entity",style:ur({paddingLeft:ne.depth*16+28+"px"})},[P("button",{class:"btn-text",onClick:ee=>F(ne.lifeline.id)},"+ 关联 entity",8,d1)],4)],64)):We("",!0)],64))),128))],32),J.value.length===0&&!c.value?(X(),q("div",h1,[ue[11]||(ue[11]=P("div",{class:"empty-icon"},"◇",-1)),ue[12]||(ue[12]=P("div",{class:"empty-title"},"暂无 Lifeline",-1)),ue[13]||(ue[13]=P("div",{class:"empty-desc"},[Bn(' Lifeline 是实体分类的主线，例如"健康""学习""工作"。'),P("br"),Bn(" 创建后实体将分布在 3D 球面上。 ")],-1)),P("button",{class:"btn-text",onClick:ue[8]||(ue[8]=ne=>c.value=!0)},"+ 创建第一个 Lifeline")])):We("",!0),d.value?(X(),q("div",{key:2,class:"search-overlay",onClick:pn(Ae,["self"])},[P("div",f1,[Tt(P("input",{"onUpdate:modelValue":ue[9]||(ue[9]=ne=>M.value=ne),class:"field",placeholder:"搜索 entity...",onKeyup:ni(K,["enter"])},null,544),[[Vt,M.value]]),P("button",{class:"btn-text",onClick:K},"搜索"),b.value?(X(),q("div",p1,"搜索中...")):(X(),q("div",m1,[C.value.length===0&&M.value?(X(),q("div",g1,"无结果")):We("",!0),(X(!0),q(nt,null,cn(C.value,ne=>(X(),q("div",{key:ne.id,class:Rn(["search-row",{mounted:ne.mounted_name}]),onClick:se=>ne.mounted_name?null:pe(ne)},[P("span",v1,ye(ne.kind[0].toUpperCase()),1),P("span",x1,ye(ne.title.slice(0,40)),1),ne.mounted_name?(X(),q("span",y1,"已归类到 "+ye(ne.mounted_name),1)):We("",!0)],10,_1))),128))]))])])):We("",!0)])):We("",!0)}}),M1=Xn(b1,[["__scopeId","data-v-0c96ae5f"]]),S1={key:0,class:"node-detail-card"},w1={class:"card-header"},E1={class:"kind-badge"},T1={class:"entity-id-row"},A1=["title"],C1={class:"lifeline-path"},R1={key:1,class:"no-lifeline"},I1={key:0,class:"detail-loading"},P1={key:1,class:"detail-error"},L1={key:2,class:"detail-section"},D1={key:0,class:"field-row"},U1=["onDblclick"],N1=["onClick"],F1={key:1,class:"field-row"},O1=["onDblclick"],k1=["onClick"],B1={key:2,class:"field-row"},z1=["onDblclick"],V1=["onClick"],G1={key:3,class:"field-row"},H1=["onDblclick"],W1=["onClick"],X1={key:4,class:"field-row"},$1=["onDblclick"],q1=["onClick"],Y1={key:5,class:"field-row"},Z1=["onDblclick"],K1=["onClick"],J1={key:6,class:"field-row"},j1=["onDblclick"],Q1=["onClick"],ew={key:7,class:"field-row"},tw=["onDblclick"],nw=["onClick"],iw={key:8,class:"field-row"},sw={class:"field-value"},rw=["onClick"],aw={key:9,class:"field-row"},ow={class:"field-value"},lw=["onClick"],cw={key:10,class:"field-row"},uw={class:"field-label"},dw={class:"field-value readonly"},hw={key:11,class:"field-row"},fw={class:"field-label"},pw=["onDblclick"],mw={key:0,class:"field-row"},gw={class:"field-value readonly"},_w={key:3,class:"actions-section"},vw={class:"assoc-section"},xw={class:"assoc-title"},yw={key:0,class:"empty-text"},bw=["onClick"],Mw={class:"confidence"},Sw={key:0,class:"assoc-actions"},ww=["onClick"],Ew=["onClick"],Tw={class:"assoc-edit-actions"},Aw=["onClick"],Cw=["onClick"],Rw=["onClick"],Iw={key:0,class:"evidence-block"},Pw={class:"evidence-title"},Lw={key:0,class:"no-evidence"},Dw={class:"evidence-excerpt"},Uw={class:"evidence-meta"},Nw={class:"evidence-type"},Fw={class:"evidence-weight"},Ow=$n({__name:"NodeDetailCard",emits:["edit-assoc","delete-assoc","copied"],setup(r,{expose:e,emit:t}){const n=ks(),i=nn(()=>{const oe=n.state;if(oe.kind!=="node_focus"&&oe.kind!=="relation_reveal")return null;const $=oe.entity_id;return n.data?.entities.find(F=>F.id===$)??null}),s=Be(null),a=Be(!1),o=Be(!1);async function l(){if(!i.value)return;const oe=i.value.id,$=n.entityDetailCache.get(oe);if($){s.value=$;return}a.value=!0,o.value=!1;try{const F=oe.split(":"),K=F[0],pe=parseInt(F.slice(1).join(":"),10);let Ae={};if(K==="task"){const{getTask:$e}=await Et(async()=>{const{getTask:ue}=await import("./index-_ulAEbzr.js").then(ne=>ne.e);return{getTask:ue}},__vite__mapDeps([0,1,2])),te=await $e(pe);Ae=te.task||te}else if(K==="memory"){const{getMemory:$e}=await Et(async()=>{const{getMemory:ue}=await import("./index-_ulAEbzr.js").then(ne=>ne.e);return{getMemory:ue}},__vite__mapDeps([0,1,2])),te=await $e(pe);Ae=te.memory||te}else if(K==="decision"){const{getDecision:$e}=await Et(async()=>{const{getDecision:ue}=await import("./index-_ulAEbzr.js").then(ne=>ne.e);return{getDecision:ue}},__vite__mapDeps([0,1,2])),te=await $e(pe);Ae=te.decision||te}else if(K==="item"){const{getItem:$e}=await Et(async()=>{const{getItem:ue}=await import("./index-_ulAEbzr.js").then(ne=>ne.e);return{getItem:ue}},__vite__mapDeps([0,1,2])),te=await $e(pe);Ae=te.item||te}s.value=Ae,n.entityDetailCache.set(oe,Ae)}catch{o.value=!0}finally{a.value=!1}}Io(()=>i.value?.id,()=>{s.value=null,l()},{immediate:!0});const c=Be(!1),u=Be(null),h=Be("");function d(){i.value&&(h.value=i.value.title,c.value=!0,su(()=>u.value?.focus()))}async function f(){if(!i.value)return;const oe=h.value.trim();if(!oe||oe===i.value.title){c.value=!1;return}const $=i.value.id.split(":"),F=$[0],K=parseInt($.slice(1).join(":"),10);try{await n.updateEntityTitle(F,K,oe)}catch{await n.reload()}c.value=!1}function g(){c.value=!1}function x(oe){oe.key==="Enter"?(oe.stopPropagation(),f()):oe.key==="Escape"&&(oe.stopPropagation(),g())}const m=Be(null),p=Be(null),_=Be("");function v(oe){if(!s.value)return;const $=s.value[oe];_.value=$!=null?String($):"",m.value=oe,su(()=>p.value?.focus())}async function y(){if(!i.value||!m.value||!s.value)return;const oe=m.value,$=_.value.trim();if($===String(s.value[oe]||"")){m.value=null;return}const F=i.value.id.split(":"),K=F[0],pe=parseInt(F.slice(1).join(":"),10);try{const{updateEntityField:Ae}=await Et(async()=>{const{updateEntityField:$e}=await import("./index-_ulAEbzr.js").then(te=>te.e);return{updateEntityField:$e}},__vite__mapDeps([0,1,2]));await Ae(K,pe,{[oe]:$}),s.value={...s.value,[oe]:$},n.entityDetailCache.set(i.value.id,s.value)}catch{}m.value=null}function w(){m.value=null}function M(oe){oe.key==="Escape"?(oe.stopPropagation(),w()):(oe.key==="Enter"&&!(oe.target instanceof HTMLTextAreaElement)||(oe.ctrlKey||oe.metaKey)&&oe.key==="Enter"&&oe.target instanceof HTMLTextAreaElement)&&(oe.stopPropagation(),y())}async function C(){if(!i.value||!s.value)return;const oe=i.value.id.split(":"),$=parseInt(oe.slice(1).join(":"),10),F=s.value.status;try{if(F==="todo"){const{markTaskDone:K}=await Et(async()=>{const{markTaskDone:pe}=await import("./index-_ulAEbzr.js").then(Ae=>Ae.e);return{markTaskDone:pe}},__vite__mapDeps([0,1,2]));await K($),s.value={...s.value,status:"done"}}else{const{markTaskTodo:K}=await Et(async()=>{const{markTaskTodo:pe}=await import("./index-_ulAEbzr.js").then(Ae=>Ae.e);return{markTaskTodo:pe}},__vite__mapDeps([0,1,2]));await K($),s.value={...s.value,status:"todo"}}n.entityDetailCache.set(i.value.id,s.value),await n.reload()}catch{await n.reload()}}async function b(){if(!i.value||!s.value)return;const oe=i.value.id.split(":"),$=parseInt(oe.slice(1).join(":"),10),F=s.value.status;try{if(F==="candidate"){const{confirmMemory:K}=await Et(async()=>{const{confirmMemory:pe}=await import("./index-_ulAEbzr.js").then(Ae=>Ae.e);return{confirmMemory:pe}},__vite__mapDeps([0,1,2]));await K($),s.value={...s.value,status:"confirmed"}}else{const{archiveMemory:K}=await Et(async()=>{const{archiveMemory:pe}=await import("./index-_ulAEbzr.js").then(Ae=>Ae.e);return{archiveMemory:pe}},__vite__mapDeps([0,1,2]));await K($),s.value={...s.value,status:"archived"}}n.entityDetailCache.set(i.value.id,s.value),await n.reload()}catch{await n.reload()}}const T=t;e({startEditTitle:d});const L=nn(()=>{if(!i.value||!n.data)return[];const oe=i.value.id;return n.data.associations.filter($=>($.from===oe||$.to===oe)&&$.status!=="rejected")}),I=nn(()=>{if(!i.value||!n.data)return null;const oe=i.value.lifeline_id;if(!oe)return null;const $=n.data.lifelines.find(F=>F.id===oe);return $?{id:$.id,name:$.name}:null});function B(oe){return oe==="task"?"T":oe==="memory"?"M":oe==="decision"?"D":oe==="item"?"I":"?"}function J(oe){switch(oe){case"co_occurrence":return"共现";case"causal":return"因果";case"tension":return"张力";case"derived_from":return"衍生";default:return oe}}function G(oe){switch(oe){case"causal":return"var(--accent)";case"tension":return"var(--text-5)";case"derived_from":return"var(--text-4)";default:return"var(--text-3)"}}function U(oe){const $=i.value.id,K=oe.from===$?oe.to:oe.from,pe=K.split(":")[0],Ae=n.data?.entities.find($e=>$e.id===K);return{id:K,kind:pe,title:Ae?.title||K}}function O(oe){const $=U(oe);n.transition({kind:"node_focus",entity_kind:$.kind,entity_id:$.id})}function V(oe){n.transition({kind:"region_zoom",lifeline_id:oe})}async function ce(oe){await navigator.clipboard.writeText(oe),T("copied")}async function me(oe){const $=`[${oe.kind}] ${oe.title} (\`${oe.id}\`)`;await navigator.clipboard.writeText($),T("copied")}async function we(oe){await n.reviewAssociation(oe,"accepted")}async function Ie(oe){await n.reviewAssociation(oe,"rejected")}function ke(oe){return oe?oe.slice(0,10):""}function st(oe){return oe==="detail"||oe==="content"||oe==="decision"||oe==="context"||oe==="reasoning"||oe==="expected_outcome"}return(oe,$)=>i.value?(X(),q("div",S1,[P("div",w1,[P("span",E1,ye(B(i.value.kind)),1),c.value?Tt((X(),q("input",{key:0,ref_key:"editInput",ref:u,"onUpdate:modelValue":$[0]||($[0]=F=>h.value=F),class:"title-input",onBlur:f,onKeydown:x},null,544)),[[Vt,h.value]]):(X(),q("span",{key:1,class:"entity-name",onDblclick:d},ye(i.value.title.slice(0,40)),33))]),P("div",T1,[P("span",{class:"entity-id",onClick:$[1]||($[1]=F=>ce(i.value.id)),title:"点击复制 "+i.value.id},ye(i.value.id),9,A1),P("button",{class:"btn-copy-md",onClick:$[2]||($[2]=F=>me(i.value)),title:"复制为 Markdown"},"⎘")]),P("div",C1,[I.value?(X(),q("span",{key:0,class:"lifeline-link",onClick:$[3]||($[3]=F=>V(I.value.id))},ye(I.value.name),1)):(X(),q("span",R1,"未归类"))]),a.value?(X(),q("div",I1,"加载详情…")):o.value?(X(),q("div",P1,[$[15]||($[15]=Bn(" 加载详情失败 ",-1)),P("button",{class:"btn-retry",onClick:l},"重试")])):s.value?(X(),q("div",L1,[$[37]||($[37]=P("div",{class:"section-title"},"详情",-1)),(X(!0),q(nt,null,cn(Object.keys(s.value).filter(F=>!["id","created_at","updated_at","completed_at","due_date","estimated_minutes"].includes(F)),F=>(X(),q(nt,{key:F},[F==="title"&&i.value.kind!=="item"?(X(),q("div",D1,[$[16]||($[16]=P("span",{class:"field-label"},"标题",-1)),m.value===F?Tt((X(),q("input",{key:0,ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":$[4]||($[4]=K=>_.value=K),class:"field-input",onKeydown:M,onBlur:y},null,544)),[[Vt,_.value]]):(X(),q(nt,{key:1},[P("span",{class:"field-value",onDblclick:K=>v(F)},ye(s.value[F]?.slice(0,80)||"—"),41,U1),P("button",{class:"field-edit-btn",onClick:K=>v(F)},"✎",8,N1)],64))])):F==="content"&&(i.value.kind==="memory"||i.value.kind==="item")?(X(),q("div",F1,[$[17]||($[17]=P("span",{class:"field-label"},"内容",-1)),m.value===F?(X(),q(nt,{key:0},[Tt(P("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":$[5]||($[5]=K=>_.value=K),class:"field-textarea",rows:"3",onKeydown:M},null,544),[[Vt,_.value]]),P("div",{class:"field-actions"},[P("button",{class:"btn-save",onClick:y},"保存"),P("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(X(),q(nt,{key:1},[P("span",{class:"field-value multiline",onDblclick:K=>v(F)},ye(s.value[F]?.slice(0,200)||"—"),41,O1),P("button",{class:"field-edit-btn",onClick:K=>v(F)},"✎",8,k1)],64))])):F==="detail"&&i.value.kind==="task"?(X(),q("div",B1,[$[18]||($[18]=P("span",{class:"field-label"},"描述",-1)),m.value===F?(X(),q(nt,{key:0},[Tt(P("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":$[6]||($[6]=K=>_.value=K),class:"field-textarea",rows:"3",onKeydown:M},null,544),[[Vt,_.value]]),P("div",{class:"field-actions"},[P("button",{class:"btn-save",onClick:y},"保存"),P("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(X(),q(nt,{key:1},[P("span",{class:"field-value multiline",onDblclick:K=>v(F)},ye(s.value[F]?.slice(0,200)||"—"),41,z1),P("button",{class:"field-edit-btn",onClick:K=>v(F)},"✎",8,V1)],64))])):F==="decision"&&i.value.kind==="decision"?(X(),q("div",G1,[$[19]||($[19]=P("span",{class:"field-label"},"决策",-1)),m.value===F?(X(),q(nt,{key:0},[Tt(P("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":$[7]||($[7]=K=>_.value=K),class:"field-textarea",rows:"3",onKeydown:M},null,544),[[Vt,_.value]]),P("div",{class:"field-actions"},[P("button",{class:"btn-save",onClick:y},"保存"),P("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(X(),q(nt,{key:1},[P("span",{class:"field-value multiline",onDblclick:K=>v(F)},ye(s.value[F]?.slice(0,200)||"—"),41,H1),P("button",{class:"field-edit-btn",onClick:K=>v(F)},"✎",8,W1)],64))])):F==="context"&&i.value.kind==="decision"?(X(),q("div",X1,[$[20]||($[20]=P("span",{class:"field-label"},"背景",-1)),m.value===F?(X(),q(nt,{key:0},[Tt(P("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":$[8]||($[8]=K=>_.value=K),class:"field-textarea",rows:"2",onKeydown:M},null,544),[[Vt,_.value]]),P("div",{class:"field-actions"},[P("button",{class:"btn-save",onClick:y},"保存"),P("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(X(),q(nt,{key:1},[P("span",{class:"field-value multiline",onDblclick:K=>v(F)},ye(s.value[F]?.slice(0,120)||"—"),41,$1),P("button",{class:"field-edit-btn",onClick:K=>v(F)},"✎",8,q1)],64))])):F==="reasoning"&&i.value.kind==="decision"?(X(),q("div",Y1,[$[21]||($[21]=P("span",{class:"field-label"},"推理",-1)),m.value===F?(X(),q(nt,{key:0},[Tt(P("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":$[9]||($[9]=K=>_.value=K),class:"field-textarea",rows:"2",onKeydown:M},null,544),[[Vt,_.value]]),P("div",{class:"field-actions"},[P("button",{class:"btn-save",onClick:y},"保存"),P("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(X(),q(nt,{key:1},[P("span",{class:"field-value multiline",onDblclick:K=>v(F)},ye(s.value[F]?.slice(0,120)||"—"),41,Z1),P("button",{class:"field-edit-btn",onClick:K=>v(F)},"✎",8,K1)],64))])):F==="expected_outcome"&&i.value.kind==="decision"?(X(),q("div",J1,[$[22]||($[22]=P("span",{class:"field-label"},"预期",-1)),m.value===F?(X(),q(nt,{key:0},[Tt(P("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":$[10]||($[10]=K=>_.value=K),class:"field-textarea",rows:"2",onKeydown:M},null,544),[[Vt,_.value]]),P("div",{class:"field-actions"},[P("button",{class:"btn-save",onClick:y},"保存"),P("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(X(),q(nt,{key:1},[P("span",{class:"field-value multiline",onDblclick:K=>v(F)},ye(s.value[F]?.slice(0,120)||"—"),41,j1),P("button",{class:"field-edit-btn",onClick:K=>v(F)},"✎",8,Q1)],64))])):F==="priority"&&i.value.kind==="task"?(X(),q("div",ew,[$[24]||($[24]=P("span",{class:"field-label"},"优先级",-1)),m.value===F?Tt((X(),q("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":$[11]||($[11]=K=>_.value=K),class:"field-select",onBlur:y,onKeydown:[ni(y,["enter"]),ni(w,["escape"])]},[...$[23]||($[23]=[P("option",{value:"high"},"高",-1),P("option",{value:"medium"},"中",-1),P("option",{value:"low"},"低",-1)])],544)),[[bi,_.value]]):(X(),q(nt,{key:1},[P("span",{class:"field-value",onDblclick:K=>v(F)},ye(s.value[F]||"medium"),41,tw),P("button",{class:"field-edit-btn",onClick:K=>v(F)},"✎",8,nw)],64))])):F==="status"&&i.value.kind!=="item"?(X(),q("div",iw,[$[33]||($[33]=P("span",{class:"field-label"},"状态",-1)),m.value===F?Tt((X(),q("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":$[12]||($[12]=K=>_.value=K),class:"field-select",onBlur:y,onKeydown:[ni(y,["enter"]),ni(w,["escape"])]},[i.value.kind==="task"?(X(),q(nt,{key:0},[$[25]||($[25]=P("option",{value:"todo"},"待办",-1)),$[26]||($[26]=P("option",{value:"done"},"完成",-1)),$[27]||($[27]=P("option",{value:"cancelled"},"取消",-1))],64)):i.value.kind==="memory"?(X(),q(nt,{key:1},[$[28]||($[28]=P("option",{value:"candidate"},"候选",-1)),$[29]||($[29]=P("option",{value:"confirmed"},"已确认",-1)),$[30]||($[30]=P("option",{value:"archived"},"归档",-1))],64)):(X(),q(nt,{key:2},[$[31]||($[31]=P("option",{value:"pending"},"待回顾",-1)),$[32]||($[32]=P("option",{value:"reviewed"},"已回顾",-1))],64))],544)),[[bi,_.value]]):(X(),q(nt,{key:1},[P("span",sw,ye(s.value[F]),1),P("button",{class:"field-edit-btn",onClick:K=>v(F)},"✎",8,rw)],64))])):F==="category"&&i.value.kind==="memory"?(X(),q("div",aw,[$[35]||($[35]=P("span",{class:"field-label"},"分类",-1)),m.value===F?Tt((X(),q("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":$[13]||($[13]=K=>_.value=K),class:"field-select",onBlur:y,onKeydown:[ni(y,["enter"]),ni(w,["escape"])]},[...$[34]||($[34]=[gr('<option value="fact" data-v-84c97b2e>事实</option><option value="preference" data-v-84c97b2e>偏好</option><option value="goal" data-v-84c97b2e>目标</option><option value="relationship" data-v-84c97b2e>关系</option><option value="event" data-v-84c97b2e>事件</option>',5)])],544)),[[bi,_.value]]):(X(),q(nt,{key:1},[P("span",ow,ye(s.value[F]),1),P("button",{class:"field-edit-btn",onClick:K=>v(F)},"✎",8,lw)],64))])):F==="source"||F==="type"?(X(),q("div",cw,[P("span",uw,ye(F==="source"?"来源":"类型"),1),P("span",dw,ye(s.value[F]||"—"),1)])):!st(F)&&F!=="title"?(X(),q("div",hw,[P("span",fw,ye(F),1),m.value===F?Tt((X(),q("input",{key:0,ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":$[14]||($[14]=K=>_.value=K),class:"field-input",onKeydown:M,onBlur:y},null,544)),[[Vt,_.value]]):(X(),q("span",{key:1,class:"field-value",onDblclick:K=>v(F)},ye(s.value[F]?.slice(0,60)||"—"),41,pw))])):We("",!0)],64))),128)),s.value.created_at?(X(),q("div",mw,[$[36]||($[36]=P("span",{class:"field-label"},"创建时间",-1)),P("span",gw,ye(ke(s.value.created_at)),1)])):We("",!0)])):We("",!0),s.value?(X(),q("div",_w,[i.value.kind==="task"&&s.value.status!=="cancelled"?(X(),q("button",{key:0,class:"btn-action",onClick:C},ye(s.value.status==="todo"?"标记完成":"重开任务"),1)):We("",!0),i.value.kind==="memory"&&s.value.status!=="archived"?(X(),q("button",{key:1,class:"btn-action",onClick:b},ye(s.value.status==="candidate"?"确认":"归档"),1)):We("",!0)])):We("",!0),P("div",vw,[P("div",xw,"关联 ("+ye(L.value.length)+")",1),L.value.length===0?(X(),q("div",yw,"暂无关联")):We("",!0),(X(!0),q(nt,null,cn(L.value,F=>(X(),q("div",{key:F.id,class:"assoc-wrapper"},[P("div",{class:Rn(["assoc-row",{pending:F.status==="pending",expanded:Je(n).selectedAssocId===F.id}])},[P("span",{class:"rel-badge",style:ur({color:G(F.relation_type)})},"["+ye(J(F.relation_type))+"]",5),P("span",{class:"assoc-target",onClick:pn(K=>O(F),["stop"])},ye(U(F).title.slice(0,30)),9,bw),P("span",Mw,ye(Math.round(F.confidence*100))+"%",1),P("span",{class:Rn(["status-badge",F.status])},ye(F.status==="accepted"?"已确认":"待定"),3),F.status==="pending"?(X(),q("span",Sw,[P("button",{class:"btn-accept",onClick:K=>we(F.id)},"✓",8,ww),P("button",{class:"btn-reject",onClick:K=>Ie(F.id)},"✗",8,Ew)])):We("",!0),P("span",Tw,[P("button",{class:"btn-edit-assoc",onClick:pn(K=>T("edit-assoc",F),["stop"])},"✎",8,Aw),P("button",{class:"btn-del-assoc",onClick:pn(K=>T("delete-assoc",F.id),["stop"])},"✕",8,Cw)]),P("button",{class:"btn-expand",onClick:pn(K=>Je(n).selectedAssocId===F.id?Je(n).selectAssociation(null):Je(n).selectAssociation(F.id),["stop"])},ye(Je(n).selectedAssocId===F.id?"▾":"▸"),9,Rw)],2),Je(n).selectedAssocId===F.id?(X(),q("div",Iw,[P("div",Pw,"证据 ("+ye(F.evidence?.length||0)+" 条)",1),!F.evidence||F.evidence.length===0?(X(),q("div",Lw,"暂无证据详情")):We("",!0),(X(!0),q(nt,null,cn(F.evidence,(K,pe)=>(X(),q("div",{key:pe,class:"evidence-item"},[P("div",Dw,'"'+ye(K.excerpt.slice(0,120))+ye(K.excerpt.length>120?"…":"")+'"',1),P("div",Uw,[P("span",Nw,ye(K.type),1),P("span",Fw,"权重: "+ye(Math.round(K.weight*100))+"%",1)])]))),128))])):We("",!0)]))),128))])])):We("",!0)}}),kw=Xn(Ow,[["__scopeId","data-v-84c97b2e"]]),Bw={class:"atlas-search"},zw={key:0,class:"results"},Vw={key:0,class:"no-results"},Gw=["onClick"],Hw={class:"result-kind"},Ww={class:"result-info"},Xw={class:"result-title"},$w={class:"result-path"},qw={key:1,class:"recent"},Yw=["onClick"],iu="atlas_recent_searches",Zw=5,Kw=$n({__name:"AtlasSearch",emits:["select","close"],setup(r,{emit:e}){function t(){try{return JSON.parse(localStorage.getItem(iu)||"[]")}catch{return[]}}function n(_){localStorage.setItem(iu,JSON.stringify(_))}const i=Be(t());function s(_){const v=_.trim();if(!v)return;const y=t().filter(M=>M!==v);y.unshift(v);const w=y.slice(0,Zw);n(w),i.value=w}function a(){localStorage.removeItem(iu),i.value=[]}function o(_){c.value=_,s(_),h.value?.focus()}const l=ks(),c=Be(""),u=Be(0),h=Be(null),d=nn(()=>{const _=c.value.trim().toLowerCase();if(!_||!l.data)return[];const v=[];for(const y of l.data.entities)y.title.toLowerCase().includes(_)&&v.push({id:y.id,kind:y.kind,title:y.title,path:f(y.lifeline_id),layer:3});for(const y of l.data.lifelines)if(y.name.toLowerCase().includes(_)){const w=y.parent_id==="ROOT"?1:2,M=l.data.lifelines.find(b=>b.id===y.parent_id),C=M?M.name:"根级 lifeline";v.push({id:y.id,kind:"lifeline",title:y.name,path:C,layer:w})}return v.sort((y,w)=>{const M=y.title.toLowerCase()===_?0:y.title.toLowerCase().startsWith(_)?1:2,C=w.title.toLowerCase()===_?0:w.title.toLowerCase().startsWith(_)?1:2;return M-C||y.title.length-w.title.length}),v.slice(0,8)});function f(_){if(!l.data)return"";const v=[];let y=l.data.lifelines.find(w=>w.id===_);for(;y;){v.unshift(y.name);const w=y?.parent_id;y=w?l.data.lifelines.find(M=>M.id===w):void 0}return v.length>=2?`${v[v.length-1]} · ${v[0]}`:v.join(" · ")}function g(_){return _==="lifeline"?"L":_[0].toUpperCase()}function x(_){s(c.value),p("select",_),p("close")}function m(_){_.key==="ArrowDown"?(_.preventDefault(),u.value=Math.min(u.value+1,d.value.length-1)):_.key==="ArrowUp"?(_.preventDefault(),u.value=Math.max(u.value-1,0)):_.key==="Enter"?(_.preventDefault(),d.value[u.value]&&x(d.value[u.value])):_.key==="Escape"&&(_.preventDefault(),p("close"))}const p=e;return zi(()=>{h.value?.focus()}),(_,v)=>(X(),q("div",Bw,[Tt(P("input",{ref_key:"inputEl",ref:h,"onUpdate:modelValue":v[0]||(v[0]=y=>c.value=y),class:"search-input",placeholder:"搜索 entity 或 lifeline…",onKeydown:m},null,544),[[Vt,c.value]]),c.value.trim()?(X(),q("div",zw,[d.value.length===0?(X(),q("div",Vw,"无匹配结果")):We("",!0),(X(!0),q(nt,null,cn(d.value,(y,w)=>(X(),q("div",{key:y.id,class:Rn(["result-row",{selected:w===u.value}]),onClick:M=>x(y)},[P("span",Hw,ye(g(y.kind)),1),P("div",Ww,[P("div",Xw,ye(y.title),1),P("div",$w,ye(y.path),1)])],10,Gw))),128))])):i.value.length>0?(X(),q("div",qw,[v[1]||(v[1]=P("div",{class:"recent-title"},"最近搜索",-1)),(X(!0),q(nt,null,cn(i.value,(y,w)=>(X(),q("div",{key:w,class:"recent-row",onClick:M=>o(y)},ye(y),9,Yw))),128)),P("button",{class:"recent-clear",onClick:a},"清除历史")])):We("",!0)]))}}),Jw=Xn(Kw,[["__scopeId","data-v-14f6145c"]]),jw={key:0,class:"submenu"},Qw=["disabled","onClick"],eE=["disabled","onClick"],tE={key:0,class:"subitem empty"},nE=$n({__name:"ContextMenu",props:{target:{},x:{},y:{}},emits:["close","edit-title","delete-entity","move-lifeline","create-entity","edit-lifeline-name","associate-to","find-path-to","copy-title","delete-lifeline","quick-create"],setup(r,{emit:e}){const t=r,n=e,i=ks(),s=Be(null),a=Be(null),o=nn(()=>{let M=t.x,C=t.y;return M+200>window.innerWidth&&(M=window.innerWidth-200-4),C+300>window.innerHeight&&(C=window.innerHeight-300-4),{left:`${M}px`,top:`${C}px`}}),l=nn(()=>t.target.layer===3),c=nn(()=>i.data?i.data.lifelines.filter(w=>w.parent_id==="ROOT").map(w=>({...w,children:i.data.lifelines.filter(M=>M.parent_id===w.id)})):[]),u=nn(()=>!i.data||!t.target.id?null:i.data.entities.find(w=>w.id===t.target.id)?.lifeline_id??null);function h(){n("edit-title",t.target),n("close")}function d(){n("delete-entity",t.target),n("close")}function f(y){n("move-lifeline",t.target.id,y),n("close")}function g(){n("associate-to",t.target),n("close")}function x(){n("find-path-to",t.target),n("close")}function m(){n("copy-title",t.target),n("close")}function p(){n("edit-lifeline-name",t.target),n("close")}function _(y){s.value&&!s.value.contains(y.target)&&n("close")}function v(y){y.key==="Escape"&&n("close")}return zi(()=>{document.addEventListener("pointerdown",_,!0),document.addEventListener("keydown",v)}),ls(()=>{document.removeEventListener("pointerdown",_,!0),document.removeEventListener("keydown",v)}),(y,w)=>(X(),q("div",{ref_key:"menuRef",ref:s,class:"ctx-menu",style:ur(o.value)},[l.value?(X(),q(nt,{key:0},[P("button",{class:"ctx-item",onClick:h},"编辑标题…"),P("div",{class:"ctx-item has-sub",onPointerenter:w[0]||(w[0]=M=>a.value="lifeline"),onPointerleave:w[1]||(w[1]=M=>a.value=null)},[w[4]||(w[4]=Bn(" 移动到 lifeline ▸ ",-1)),a.value==="lifeline"?(X(),q("div",jw,[(X(!0),q(nt,null,cn(c.value,M=>(X(),q(nt,{key:M.id},[P("button",{class:Rn(["subitem r1-item",{current:M.id===u.value}]),disabled:M.id===u.value,onClick:C=>f(M.id)},ye(M.name),11,Qw),(X(!0),q(nt,null,cn(M.children,C=>(X(),q("button",{key:C.id,class:Rn(["subitem r2-item",{current:C.id===u.value}]),disabled:C.id===u.value,onClick:b=>f(C.id)},ye(C.name),11,eE))),128))],64))),128)),c.value.length===0?(X(),q("div",tE,"暂无 lifeline")):We("",!0)])):We("",!0)],32),P("button",{class:"ctx-item",onClick:g},"关联到…"),P("button",{class:"ctx-item",onClick:x},"查找路径到…"),P("button",{class:"ctx-item",onClick:m},"复制标题"),w[5]||(w[5]=P("div",{class:"ctx-separator"},null,-1)),P("button",{class:"ctx-item danger",onClick:d},"删除")],64)):(X(),q(nt,{key:1},[P("button",{class:"ctx-item",onClick:w[2]||(w[2]=M=>{n("quick-create",t.target.id),n("close")})},"新建 entity…"),w[6]||(w[6]=P("div",{class:"ctx-separator"},null,-1)),P("button",{class:"ctx-item",onClick:p},"编辑名称…"),w[7]||(w[7]=P("div",{class:"ctx-separator"},null,-1)),P("button",{class:"ctx-item danger",onClick:w[3]||(w[3]=M=>{n("delete-lifeline",t.target.id,t.target.title),n("close")})},"删除 lifeline")],64))],4))}}),iE=Xn(nE,[["__scopeId","data-v-b6623d69"]]),sE={class:"confirm-title"},rE={key:0,class:"confirm-message"},aE={class:"confirm-actions"},oE=$n({__name:"ConfirmDialog",props:{title:{},message:{default:""},confirmLabel:{default:"确认"},cancelLabel:{default:"取消"},danger:{type:Boolean,default:!1}},emits:["confirm","cancel"],setup(r,{emit:e}){const t=e;function n(i){i.key==="Escape"&&t("cancel"),i.key==="Enter"&&t("confirm")}return zi(()=>{document.addEventListener("keydown",n)}),ls(()=>{document.removeEventListener("keydown",n)}),(i,s)=>(X(),q("div",{class:"confirm-overlay",onPointerdown:s[3]||(s[3]=a=>t("cancel"))},[P("div",{class:"confirm-dialog",onPointerdown:s[2]||(s[2]=pn(()=>{},["stop"]))},[P("div",sE,ye(r.title),1),r.message?(X(),q("div",rE,ye(r.message),1)):We("",!0),P("div",aE,[P("button",{class:"confirm-btn cancel-btn",onClick:s[0]||(s[0]=a=>t("cancel"))},ye(r.cancelLabel),1),P("button",{class:Rn(["confirm-btn",r.danger?"danger-btn":"primary-btn"]),onClick:s[1]||(s[1]=a=>t("confirm"))},ye(r.confirmLabel),3)])],32)],32))}}),lE=Xn(oE,[["__scopeId","data-v-128fcad2"]]),cE={class:"dialog"},uE={class:"dialog-title"},dE={class:"field-row"},hE={class:"entity-ref"},fE={class:"field-row"},pE={class:"entity-ref"},mE={key:0,class:"status-row"},gE={class:"field-row"},_E=["value"],vE={class:"field-row"},xE={class:"label"},yE={class:"conf-value"},bE={class:"evidence-section"},ME=["onUpdate:modelValue"],SE=["onUpdate:modelValue"],wE=["onClick"],EE={class:"dialog-actions"},TE={key:1,class:"delete-area"},AE={key:2,class:"delete-confirm"},CE=$n({__name:"AssociationEditDialog",props:{fromId:{},fromTitle:{},toId:{},toTitle:{},existing:{}},emits:["cancel","create","update","delete"],setup(r,{emit:e}){const t=r,n=e,i=Be(t.existing?.relation_type||"manual"),s=Be(t.existing?.confidence??.7),a=df(t.existing?.evidence?.length?t.existing.evidence.map(x=>({...x})):[{type:"manual",excerpt:"",weight:.8}]),o=!t.existing,l=Be(!1),c=[{value:"co_occurrence",label:"共现"},{value:"causal",label:"因果"},{value:"tension",label:"张力"},{value:"derived_from",label:"衍生"},{value:"manual",label:"人工标注"}];function u(){a.length<5&&a.push({type:"manual",excerpt:"",weight:.5})}function h(x){a.length>1&&a.splice(x,1)}function d(){o?n("create",{from:t.fromId,to:t.toId,relation_type:i.value,confidence:s.value,evidence:a.filter(x=>x.excerpt.trim())}):n("update",{association_id:t.existing.id,relation_type:i.value,confidence:s.value,evidence:a.filter(x=>x.excerpt.trim())})}function f(){n("delete",t.existing.id)}function g(x){x.key==="Escape"&&n("cancel")}return zi(()=>{document.addEventListener("keydown",g)}),ls(()=>{document.removeEventListener("keydown",g)}),(x,m)=>(X(),q("div",{class:"dialog-overlay",onClick:m[5]||(m[5]=pn(p=>n("cancel"),["self"]))},[P("div",cE,[P("div",uE,ye(o?"新建关联":"编辑关联"),1),P("div",dE,[m[6]||(m[6]=P("span",{class:"label"},"从",-1)),P("span",hE,ye(r.fromTitle.slice(0,30)),1)]),P("div",fE,[m[7]||(m[7]=P("span",{class:"label"},"到",-1)),P("span",pE,ye(r.toTitle.slice(0,30)),1)]),o?We("",!0):(X(),q("div",mE,[m[8]||(m[8]=P("span",{class:"label"},"状态",-1)),P("span",{class:Rn(["status-badge",t.existing.status])},ye(t.existing.status==="accepted"?"已确认":t.existing.status==="rejected"?"已拒绝":"待定"),3)])),P("div",gE,[m[9]||(m[9]=P("label",{class:"label",for:"rel-type"},"关系类型",-1)),Tt(P("select",{id:"rel-type","onUpdate:modelValue":m[0]||(m[0]=p=>i.value=p),class:"field"},[(X(),q(nt,null,cn(c,p=>P("option",{key:p.value,value:p.value},ye(p.label),9,_E)),64))],512),[[bi,i.value]])]),P("div",vE,[P("label",xE,[m[10]||(m[10]=Bn(" 信心度 ",-1)),P("span",yE,ye(s.value.toFixed(2)),1)]),Tt(P("input",{"onUpdate:modelValue":m[1]||(m[1]=p=>s.value=p),type:"range",min:"0.3",max:"1.0",step:"0.01",class:"slider"},null,512),[[Vt,s.value,void 0,{number:!0}]])]),P("div",bE,[m[12]||(m[12]=P("span",{class:"label"},"证据",-1)),(X(!0),q(nt,null,cn(a,(p,_)=>(X(),q("div",{key:_,class:"evidence-edit-row"},[Tt(P("select",{"onUpdate:modelValue":v=>p.type=v,class:"field evidence-type-sel"},[...m[11]||(m[11]=[gr('<option value="manual" data-v-0ae04a56>人工标注</option><option value="semantic" data-v-0ae04a56>语义相似</option><option value="co_occurrence" data-v-0ae04a56>共现统计</option><option value="temporal" data-v-0ae04a56>时间序列</option><option value="causal_hint" data-v-0ae04a56>因果模式</option>',5)])],8,ME),[[bi,p.type]]),Tt(P("input",{"onUpdate:modelValue":v=>p.excerpt=v,class:"field evidence-excerpt",placeholder:"证据摘要（10-120 字）"},null,8,SE),[[Vt,p.excerpt]]),a.length>1?(X(),q("button",{key:0,class:"btn-icon",onClick:v=>h(_)},"×",8,wE)):We("",!0)]))),128)),a.length<5?(X(),q("button",{key:0,class:"btn-text",onClick:u},"+ 添加证据")):We("",!0)]),P("div",EE,[P("button",{class:"btn-cancel",onClick:m[2]||(m[2]=p=>n("cancel"))},"取消"),P("button",{class:"btn-submit",onClick:d},ye(o?"创建关联":"保存修改"),1)]),!o&&!l.value?(X(),q("div",TE,[P("button",{class:"btn-delete",onClick:m[3]||(m[3]=p=>l.value=!0)},"删除关联")])):We("",!0),l.value?(X(),q("div",AE,[m[13]||(m[13]=Bn(" 确定删除此关联？ ",-1)),P("button",{class:"btn-delete",onClick:f},"确认删除"),P("button",{class:"btn-text",onClick:m[4]||(m[4]=p=>l.value=!1)},"取消")])):We("",!0)])]))}}),RE=Xn(CE,[["__scopeId","data-v-0ae04a56"]]),IE=$n({__name:"LegendBar",props:{showAssoc:{type:Boolean}},setup(r){const e=r,t=Be(!1),n=Be(!1);let i;function s(){t.value=!1,i&&clearTimeout(i),i=window.setTimeout(()=>{n.value||(t.value=!0)},5e3)}return zi(()=>s()),ls(()=>{i&&clearTimeout(i)}),Io(()=>e.showAssoc,()=>s()),(a,o)=>(X(),q("div",{class:Rn(["legend-bar",{faded:t.value&&!n.value}]),onMouseenter:o[0]||(o[0]=l=>{n.value=!0,t.value=!1}),onMouseleave:o[1]||(o[1]=l=>{n.value=!1,s()})},[o[3]||(o[3]=gr('<div class="legend-section" data-v-53c6bdbb><span class="legend-title" data-v-53c6bdbb>节点</span><span class="legend-item" data-v-53c6bdbb><span class="dot task" data-v-53c6bdbb>■</span> 任务</span><span class="legend-item" data-v-53c6bdbb><span class="dot memory" data-v-53c6bdbb>●</span> 记忆</span><span class="legend-item" data-v-53c6bdbb><span class="dot decision" data-v-53c6bdbb>◆</span> 决策</span><span class="legend-item" data-v-53c6bdbb><span class="dot item" data-v-53c6bdbb>▲</span> 条目</span></div>',1)),r.showAssoc?(X(),q(nt,{key:0},[o[2]||(o[2]=gr('<div class="legend-sep" data-v-53c6bdbb>|</div><div class="legend-section" data-v-53c6bdbb><span class="legend-title" data-v-53c6bdbb>关联</span><span class="legend-item" data-v-53c6bdbb><span class="line-sample causal" data-v-53c6bdbb></span> 因果</span><span class="legend-item" data-v-53c6bdbb><span class="line-sample co" data-v-53c6bdbb></span> 共现</span><span class="legend-item" data-v-53c6bdbb><span class="line-sample tension" data-v-53c6bdbb></span> 张力</span><span class="legend-item" data-v-53c6bdbb><span class="line-sample derived" data-v-53c6bdbb></span> 衍生</span></div>',2))],64)):We("",!0)],34))}}),PE=Xn(IE,[["__scopeId","data-v-53c6bdbb"]]),On=180,LE=$n({__name:"Minimap",props:{layoutNodes:{},camera:{},controls:{},worldRadius:{},focusedLifelineId:{}},emits:["jump"],setup(r,{emit:e}){const t=r,n=e,i=Be(null);let s=0;function a(c){const u=On/(t.worldRadius*2.4),h=On/2,d=On/2;return{x:h+c.x*u,y:d-c.z*u}}function o(){const c=i.value;if(!c)return;const u=c.getContext("2d");if(!u)return;const h=window.devicePixelRatio||1;c.width=On*h,c.height=On*h,u.scale(h,h),u.fillStyle="rgba(7, 9, 13, 0.85)",u.beginPath(),u.roundRect(0,0,On,On,8),u.fill(),u.strokeStyle="rgba(255,255,255,0.06)",u.lineWidth=1,u.beginPath(),u.arc(On/2,On/2,On/2.6,0,Math.PI*2),u.stroke();const d=t.layoutNodes.filter(g=>g.layer===1),f=t.layoutNodes.filter(g=>g.layer===2);for(const g of f){const x=a(g.position);u.fillStyle="rgba(255,255,255,0.2)",u.beginPath(),u.arc(x.x,x.y,2,0,Math.PI*2),u.fill()}for(const g of d){const x=a(g.position);g.id===t.focusedLifelineId&&(u.strokeStyle="#6ee7d0",u.lineWidth=2,u.beginPath(),u.arc(x.x,x.y,5,0,Math.PI*2),u.stroke()),u.fillStyle="#6ee7d0",u.beginPath(),u.arc(x.x,x.y,3,0,Math.PI*2),u.fill()}if(t.camera&&t.controls){const g=t.camera.position,x=a(g),m=t.controls.target||new R(0,0,0),p=a(m);u.strokeStyle="#6ee7d0",u.lineWidth=1;const _=22+(g.length()-2)*5,v=16+(g.length()-2)*3.5;u.strokeRect(x.x-_/2,x.y-v/2,_,v),u.beginPath(),u.moveTo(x.x,x.y),u.lineTo(p.x,p.y),u.strokeStyle="rgba(110,231,208,0.3)",u.stroke()}s=requestAnimationFrame(o)}function l(c){if(!i.value?.getBoundingClientRect())return;const h=c.offsetX,d=c.offsetY,f=On/(t.worldRadius*2.4),g=On/2,x=On/2,m=(h-g)/f,p=-(d-x)/f,v=new R(m,.3,p).normalize().clone().multiplyScalar(4.5),y=new R(0,0,0);n("jump",v,y)}return zi(()=>{s=requestAnimationFrame(o)}),ls(()=>{cancelAnimationFrame(s)}),(c,u)=>(X(),q("canvas",{ref_key:"canvasRef",ref:i,class:"minimap",width:180,height:180,onClick:l},null,512))}}),DE=Xn(LE,[["__scopeId","data-v-210e4d3a"]]),UE={key:0,class:"path-panel"},NE={class:"path-title"},FE={key:0},OE={class:"path-steps"},kE=["onClick"],BE={class:"path-kind"},zE={class:"path-e-title"},VE={key:0,class:"path-assoc"},GE={class:"path-a-type"},HE={class:"path-a-conf"},WE={class:"path-actions"},XE=["disabled"],$E=["disabled"],qE={key:1,class:"path-panel"},YE=$n({__name:"PathPanel",props:{paths:{},currentPathIndex:{},fromTitle:{},toTitle:{}},emits:["prev-path","next-path","clear","focus-entity","copied"],setup(r,{emit:e}){const t=r,n=e;async function i(){let c=`**路径（${a.value} 跳）**：
`;s.value.forEach((u,h)=>{c+=`${h+1}. ${u.entityTitle} (\`${u.entityId}\`)
`,u.assocId&&(c+=`   [${o(u.assocType||"")} ${u.assocConfidence?Math.round(u.assocConfidence*100)+"%":""}] →
`)}),await navigator.clipboard.writeText(c),n("copied")}const s=nn(()=>t.paths[t.currentPathIndex]||[]),a=nn(()=>s.value.length-1);function o(c){return{co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[c]||c}function l(c){const u=c.split(":")[0];return u==="task"?"T":u==="memory"?"M":u==="decision"?"D":u==="item"?"I":"?"}return(c,u)=>r.paths.length>0?(X(),q("div",UE,[P("div",NE,[Bn("路径（"+ye(a.value)+" 跳）",1),r.paths.length>1?(X(),q("span",FE," 共 "+ye(r.paths.length)+" 条 · "+ye(r.currentPathIndex+1)+"/"+ye(r.paths.length),1)):We("",!0)]),P("div",OE,[(X(!0),q(nt,null,cn(s.value,(h,d)=>(X(),q(nt,{key:d},[P("div",{class:"path-entity",onClick:f=>n("focus-entity",h.entityId)},[P("span",BE,ye(l(h.entityId)),1),P("span",zE,ye(h.entityTitle.slice(0,30)),1)],8,kE),h.assocId?(X(),q("div",VE,[u[4]||(u[4]=P("span",{class:"path-line"},"┊",-1)),P("span",GE,"["+ye(o(h.assocType||""))+"]",1),P("span",HE,ye(h.assocConfidence?Math.round(h.assocConfidence*100)+"%":""),1)])):We("",!0)],64))),128))]),P("div",WE,[r.paths.length>1?(X(),q("button",{key:0,class:"path-btn",disabled:r.currentPathIndex===0,onClick:u[0]||(u[0]=h=>n("prev-path"))},"上一条",8,XE)):We("",!0),r.paths.length>1?(X(),q("button",{key:1,class:"path-btn",disabled:r.currentPathIndex>=r.paths.length-1,onClick:u[1]||(u[1]=h=>n("next-path"))},"下一条",8,$E)):We("",!0),P("button",{class:"path-btn",onClick:i},"复制路径"),P("button",{class:"path-btn clear",onClick:u[2]||(u[2]=h=>n("clear"))},"清除")])])):(X(),q("div",qE,[u[5]||(u[5]=P("div",{class:"path-title"},"未找到路径",-1)),u[6]||(u[6]=P("div",{class:"path-none"},"深度 5 内无连接",-1)),P("button",{class:"path-btn clear",onClick:u[3]||(u[3]=h=>n("clear"))},"关闭")]))}}),ZE=Xn(YE,[["__scopeId","data-v-cb34b2fb"]]),KE={class:"sp-panel"},JE={class:"sp-header"},jE=$n({__name:"ShortcutPanel",emits:["close"],setup(r,{emit:e}){const t=e;function n(i){(i.key==="?"||i.key==="Escape")&&t("close")}return zi(()=>{document.addEventListener("keydown",n)}),ls(()=>{document.removeEventListener("keydown",n)}),(i,s)=>(X(),q("div",{class:"sp-overlay",onClick:s[1]||(s[1]=pn(a=>t("close"),["self"]))},[P("div",KE,[P("div",JE,[s[2]||(s[2]=P("span",{class:"sp-title"},"快捷键参考",-1)),P("button",{class:"sp-close",onClick:s[0]||(s[0]=a=>t("close"))},"✕")]),s[3]||(s[3]=gr('<div class="sp-grid" data-v-4c3ba46f><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>全局</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Ctrl+K</kbd> <kbd data-v-4c3ba46f>/</kbd> <span data-v-4c3ba46f>搜索 entity/lifeline</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>?</kbd> <span data-v-4c3ba46f>显示/隐藏此面板</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>滚轮</kbd> <span data-v-4c3ba46f>缩放</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>拖拽</kbd> <span data-v-4c3ba46f>旋转</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>global_overview</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>左键点击 R1</kbd> <span data-v-4c3ba46f>进入 lifeline 区域</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>region_zoom</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>返回全局视图</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>左键点击 R2/R3</kbd> <span data-v-4c3ba46f>聚焦 entity</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>右键 R1/R2</kbd> <span data-v-4c3ba46f>新建 entity / 编辑名称</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>node_focus</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>返回 lifeline 区域</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>R</kbd> <span data-v-4c3ba46f>查看关联（relation_reveal）</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>右键 entity</kbd> <span data-v-4c3ba46f>编辑/移动/删除/关联/路径查找</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>双击标题</kbd> <span data-v-4c3ba46f>内联编辑标题</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>relation_reveal</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>返回 node_focus</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>R</kbd> <span data-v-4c3ba46f>退出关联视图</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>点击关联线</kbd> <span data-v-4c3ba46f>查看证据</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>筛选条</kbd> <span data-v-4c3ba46f>按类型/信心度过滤</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>路径查找</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>右键 → 查找路径</kbd> <span data-v-4c3ba46f>进入路径选择模式</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>退出路径模式</span></div></div></div>',1))])]))}}),QE=Xn(jE,[["__scopeId","data-v-4c3ba46f"]]),eT={class:"qcd-dialog"},tT={class:"qcd-header"},nT={class:"qcd-field"},iT={key:0,class:"qcd-field"},sT={key:1,class:"qcd-field"},rT={key:2,class:"qcd-field"},aT={key:3,class:"qcd-field"},oT={class:"qcd-field"},lT=["value"],cT={class:"qcd-actions"},uT=["disabled"],dT=$n({__name:"QuickCreateDialog",props:{defaultLifelineId:{}},emits:["close"],setup(r,{emit:e}){const t=r,n=e,i=ks(),s=Be("task"),a=Be(""),o=Be(""),l=Be(""),c=Be("fact"),u=Be(t.defaultLifelineId||""),h=Be(!1),d=nn(()=>s.value==="task"?a.value.trim():s.value==="memory"?o.value.trim():s.value==="decision"?a.value.trim():s.value==="item"?o.value.trim():!1),f=nn(()=>{const m=[];if(!i.data)return m;const p=i.data.lifelines.filter(_=>_.parent_id==="ROOT");for(const _ of p){m.push({id:_.id,name:_.name,depth:0});const v=i.data.lifelines.filter(y=>y.parent_id===_.id);for(const y of v)m.push({id:y.id,name:"  "+y.name,depth:1})}return m});async function g(){if(!(!d.value||h.value)){h.value=!0;try{let m,p=s.value;if(s.value==="task"){const{createTask:_}=await Et(async()=>{const{createTask:y}=await import("./index-_ulAEbzr.js").then(w=>w.e);return{createTask:y}},__vite__mapDeps([0,1,2]));m=(await _({title:a.value.trim()})).id}else if(s.value==="memory"){const{createMemory:_}=await Et(async()=>{const{createMemory:y}=await import("./index-_ulAEbzr.js").then(w=>w.e);return{createMemory:y}},__vite__mapDeps([0,1,2]));m=(await _({category:c.value,content:o.value.trim()})).id}else if(s.value==="decision"){const{createDecision:_}=await Et(async()=>{const{createDecision:y}=await import("./index-_ulAEbzr.js").then(w=>w.e);return{createDecision:y}},__vite__mapDeps([0,1,2]));m=(await _({title:a.value.trim(),decision:l.value.trim()})).id}else{const{addNote:_}=await Et(async()=>{const{addNote:y}=await import("./index-_ulAEbzr.js").then(w=>w.e);return{addNote:y}},__vite__mapDeps([0,1,2]));m=(await _(o.value.trim())).id,p="item"}u.value&&await i.mountEntity(p,m,u.value),await i.reload(),n("close")}finally{h.value=!1}}}function x(m){m.key==="Escape"&&n("close")}return zi(()=>{document.addEventListener("keydown",x)}),ls(()=>{document.removeEventListener("keydown",x)}),(m,p)=>(X(),q("div",{class:"qcd-overlay",onClick:p[8]||(p[8]=pn(_=>n("close"),["self"]))},[P("div",eT,[P("div",tT,[p[9]||(p[9]=P("span",{class:"qcd-title"},"快速创建",-1)),P("button",{class:"qcd-close",onClick:p[0]||(p[0]=_=>n("close"))},"✕")]),P("div",nT,[p[11]||(p[11]=P("label",{class:"qcd-label"},"类型",-1)),Tt(P("select",{"onUpdate:modelValue":p[1]||(p[1]=_=>s.value=_),class:"qcd-select"},[...p[10]||(p[10]=[P("option",{value:"task"},"任务",-1),P("option",{value:"memory"},"记忆",-1),P("option",{value:"decision"},"决策",-1),P("option",{value:"item"},"条目",-1)])],512),[[bi,s.value]])]),s.value==="task"||s.value==="decision"?(X(),q("div",iT,[p[12]||(p[12]=P("label",{class:"qcd-label"},"标题",-1)),Tt(P("input",{"onUpdate:modelValue":p[2]||(p[2]=_=>a.value=_),class:"qcd-input",placeholder:"输入标题…"},null,512),[[Vt,a.value]])])):We("",!0),s.value==="memory"||s.value==="item"?(X(),q("div",sT,[p[13]||(p[13]=P("label",{class:"qcd-label"},"内容",-1)),Tt(P("input",{"onUpdate:modelValue":p[3]||(p[3]=_=>o.value=_),class:"qcd-input",placeholder:"输入内容…"},null,512),[[Vt,o.value]])])):We("",!0),s.value==="decision"?(X(),q("div",rT,[p[14]||(p[14]=P("label",{class:"qcd-label"},"决策",-1)),Tt(P("input",{"onUpdate:modelValue":p[4]||(p[4]=_=>l.value=_),class:"qcd-input",placeholder:"决策描述（选填）"},null,512),[[Vt,l.value]])])):We("",!0),s.value==="memory"?(X(),q("div",aT,[p[16]||(p[16]=P("label",{class:"qcd-label"},"分类",-1)),Tt(P("select",{"onUpdate:modelValue":p[5]||(p[5]=_=>c.value=_),class:"qcd-select"},[...p[15]||(p[15]=[gr('<option value="fact" data-v-22486ab5>事实</option><option value="preference" data-v-22486ab5>偏好</option><option value="goal" data-v-22486ab5>目标</option><option value="relationship" data-v-22486ab5>关系</option><option value="event" data-v-22486ab5>事件</option>',5)])],512),[[bi,c.value]])])):We("",!0),P("div",oT,[p[18]||(p[18]=P("label",{class:"qcd-label"},"归类",-1)),Tt(P("select",{"onUpdate:modelValue":p[6]||(p[6]=_=>u.value=_),class:"qcd-select"},[p[17]||(p[17]=P("option",{value:""},"不挂载",-1)),(X(!0),q(nt,null,cn(f.value,_=>(X(),q("option",{key:_.id,value:_.id},ye(_.name),9,lT))),128))],512),[[bi,u.value]])]),P("div",cT,[P("button",{class:"qcd-btn cancel",onClick:p[7]||(p[7]=_=>n("close"))},"取消"),P("button",{class:"qcd-btn submit",disabled:!d.value||h.value,onClick:g},ye(h.value?"创建中…":"创建"),9,uT)])])]))}}),hT=Xn(dT,[["__scopeId","data-v-22486ab5"]]),fT={class:"cosmos-view"},pT={class:"cosmos-hud"},mT={key:0,class:"overlay-state"},gT={key:1,class:"overlay-state"},_T={key:2,class:"overlay-state"},vT={key:0,class:"tooltip"},xT={class:"create-actions"},yT=["disabled"],bT={class:"create-title"},MT={class:"create-sub"},ST={class:"create-actions"},wT=["disabled"],ET={key:5,class:"select-hint"},TT={key:6,class:"select-hint"},AT={key:10,class:"copy-toast"},CT={key:11,class:"minimap-wrapper"},RT={key:12,class:"assoc-filter-bar"},IT={class:"filter-chips"},PT=["onClick"],LT={class:"filter-slider"},DT={class:"filter-label"},UT={class:"filter-count"},NT={key:0,class:"filter-empty"},FT=1.5,OT=$n({__name:"CosmosView",setup(r){const e=ks(),t=Be(null);let n=null,i=null,s=0,a=[],o="";const l=Be(!1),c=Be(!1),u=Be(!1);let h;const d=Be(!1),f=Be();function g(D){f.value=D,d.value=!0}const x=Be(null),m=Be(null);function p(D,k,Q,Pe){return new Promise(De=>{m.value={title:D,message:k,confirmLabel:Q,danger:Pe,resolve:De}})}const _=Be(null),v=Be(""),y=Be(null),w=Be(null),M=Be(!0),C=Be(!1);let b,T=null,L=null;const I=df({types:["co_occurrence","causal","tension","derived_from","manual"],minConfidence:0,status:"all"});function B(){for(const D of a){const k=I.types.includes(D.data.relation_type),Q=D.data.confidence>=I.minConfidence,Pe=I.status==="all"||D.data.status===I.status,De=k&&Q&&Pe;D.line.visible=De,D.arrow&&(D.arrow.visible=De)}}function J(D){I.types.includes(D)?I.types.length>1&&(I.types=I.types.filter(k=>k!==D)):I.types=[...I.types,D],B()}const G=nn(()=>a.filter(D=>D.line.visible).length),U=Be(null),O=Be(null),V=Be(0);function ce(D,k){if(!e.data)return[];const Q=new Map;for(const je of e.data.associations)je.status!=="rejected"&&(Q.has(je.from)||Q.set(je.from,[]),Q.has(je.to)||Q.set(je.to,[]),Q.get(je.from).push({to:je.to,assocId:je.id,type:je.relation_type,confidence:je.confidence}),Q.get(je.to).push({to:je.from,assocId:je.id,type:je.relation_type,confidence:je.confidence}));const Pe=new Set,De=[{id:D,path:[{entityId:D,entityTitle:"",assocId:null,assocType:null,assocConfidence:null}]}];Pe.add(D);const ot=[];let gt=-1;const Ut=5;for(;De.length>0;){const{id:je,path:Ct}=De.shift();if(gt>-1&&Ct.length>gt)break;if(je===k){Ct.forEach(ht=>{ht.entityTitle||(ht.entityTitle=e.data?.entities.find(dt=>dt.id===ht.entityId)?.title||ht.entityId)}),ot.push(Ct),gt=Ct.length;continue}if(!(Ct.length>=Ut)){for(const ht of Q.get(je)||[])if(!Pe.has(ht.to)||gt>-1&&Ct.length<gt){Pe.add(ht.to);const dt=e.data?.entities.find($t=>$t.id===ht.to);De.push({id:ht.to,path:[...Ct,{entityId:ht.to,entityTitle:dt?.title||ht.to,assocId:ht.assocId,assocType:ht.type,assocConfidence:ht.confidence}]})}}}return ot}function me(D){U.value={id:D.id,title:D.title}}function we(D){if(!U.value)return;if(D===U.value.id){ke();return}const k=ce(U.value.id,D);O.value=k.length>0?k:[],V.value=0,U.value=null,k.length>0&&n&&Ie(k[0])}function Ie(D){if(!n)return;uf(n.nodes,a);const k=new Set(D.map(Pe=>Pe.entityId)),Q=new Set(D.filter(Pe=>Pe.assocId).map(Pe=>Pe.assocId));bS(n.nodes,a,k,Q)}function ke(){U.value=null,O.value=null,V.value=0,n&&uf(n.nodes,a)}function st(){O.value&&(V.value=Math.max(0,V.value-1),Ie(O.value[V.value]))}function oe(){O.value&&(V.value=Math.min(O.value.length-1,V.value+1),Ie(O.value[V.value]))}function $(D){const k=D.split(":");e.transition({kind:"node_focus",entity_kind:k[0],entity_id:D})}function F(){u.value=!0,h&&clearTimeout(h),h=window.setTimeout(()=>{u.value=!1},1500)}function K(D){navigator.clipboard.writeText(D.title).then(()=>F())}async function pe(D,k){window.confirm(`确定删除 lifeline「${k}」？挂载的 entity 将被卸载。`)&&(await e.deleteLifeline(D),e.transition({kind:"global_overview"}))}function Ae(){F()}function $e(){F()}let te=null,ue=null,ne=null;async function se(){if(!e.data||!t.value)return;const D=await Et(()=>Promise.resolve().then(()=>rS),void 0),k=(await Et(async()=>{const{OrbitControls:je}=await import("./OrbitControls-BikD7SNb.js");return{OrbitControls:je}},__vite__mapDeps([3,0,1,2]))).OrbitControls,{CSS2DRenderer:Q}=await Et(async()=>{const{CSS2DRenderer:je}=await import("./CSS2DRenderer-6i-PSdSd.js");return{CSS2DRenderer:je}},__vite__mapDeps([4,0,1,2]));n=await hS(t.value,e.data),i=new k(n.camera,n.renderer.domElement),i.enableDamping=!0,i.dampingFactor=.08,i.enableZoom=!0,i.zoomSpeed=.6,i.enablePan=!1,i.minDistance=.5,i.maxDistance=9,te=new Q,te.setSize(window.innerWidth,window.innerHeight),te.domElement.style.position="absolute",te.domElement.style.top="0",te.domElement.style.pointerEvents="none",document.querySelector(".cosmos-view")?.appendChild(te.domElement);const{createLabelGroup:Pe}=await Et(async()=>{const{createLabelGroup:je}=await import("./labels-BeSu0O4y.js");return{createLabelGroup:je}},__vite__mapDeps([5,4,0,1,2]));ue=Pe(),ue.create(n.scene,n.layoutNodes);const De=new Map;for(const je of e.data.entities)De.set(je.lifeline_id,(De.get(je.lifeline_id)||0)+1);for(const je of n.layoutNodes){if(je.layer!==1&&je.layer!==2)continue;const Ct=document.createElement("div"),ht=De.get(je.id)||0;Ct.textContent=String(ht),Ct.style.cssText="font-size:9px;color:var(--text-4);font-family:var(--font-mono);text-align:center;";const{CSS2DObject:dt}=await Et(async()=>{const{CSS2DObject:Ln}=await import("./CSS2DRenderer-6i-PSdSd.js");return{CSS2DObject:Ln}},__vite__mapDeps([4,0,1,2])),$t=new dt(Ct);$t.position.copy(je.position.clone().add(new R(0,-.07,0))),n.scene.add($t)}ne=n.setResolution,window.addEventListener("resize",ge);const ot=new D.Raycaster,gt=new D.Vector2;t.value.addEventListener("click",je=>{if(!n)return;if(gt.x=je.offsetX/t.value.clientWidth*2-1,gt.y=-(je.offsetY/t.value.clientHeight)*2+1,ot.setFromCamera(gt,n.camera),U.value){const qt=ot.intersectObjects(n.pickables);if(qt.length>0){const Zt=qt[0].object;if(Zt.userData.layer===3){we(Zt.userData.id);return}}ke();return}if(e.selectingTarget){const qt=ot.intersectObjects(n.pickables);if(qt.length>0){const Zt=qt[0].object;if(Zt.userData.layer===3&&Zt.userData.id!==e.selectingTarget.fromId){const Dn=e.data?.entities.find(Vi=>Vi.id===Zt.userData.id)?.title||"";e.openEditAssoc({id:"",from:e.selectingTarget.fromId,fromTitle:e.selectingTarget.fromTitle,to:Zt.userData.id,toTitle:Dn,relation_type:"manual",confidence:.7,status:"accepted",evidence:[]}),e.cancelSelecting();return}}e.cancelSelecting();return}if(e.state.kind==="relation_reveal"&&a.length>0){const qt=ot.intersectObjects(a.map(Zt=>Zt.line));if(qt.length>0){const Zt=qt[0].object,Dn=a.find(Vi=>Vi.line===Zt);if(Dn){e.selectedAssocId===Dn.data.id?e.selectAssociation(null):e.selectAssociation(Dn.data.id);return}}}const Ct=ot.intersectObjects(n.pickables);if(Ct.length===0){if(e.selectAssociation(null),e.state.kind==="node_focus"||e.state.kind==="relation_reveal"){const qt=e.state.entity_id,Dn=e.data?.entities.find(Vi=>Vi.id===qt)?.lifeline_id;Dn?e.transition({kind:"region_zoom",lifeline_id:Dn}):e.transition({kind:"global_overview"})}else e.state.kind==="region_zoom"&&e.transition({kind:"global_overview"});return}e.selectAssociation(null);const ht=Ct[0].object,dt=ht.userData.layer,$t=ht.userData.id,Ln=ht.userData.kind,Jn=e.state;Jn.kind==="global_overview"&&dt===1?e.transition({kind:"region_zoom",lifeline_id:$t}):Jn.kind==="region_zoom"&&(dt===2||dt===3)?e.transition({kind:"node_focus",entity_kind:Ln||"lifeline",entity_id:$t}):Jn.kind==="node_focus"?e.transition({kind:"node_focus",entity_kind:Ln||"lifeline",entity_id:$t}):Jn.kind==="relation_reveal"&&(ae(),e.transition({kind:"node_focus",entity_kind:Ln||"lifeline",entity_id:$t}))}),t.value.addEventListener("mousemove",je=>{if(!n)return;gt.x=je.offsetX/t.value.clientWidth*2-1,gt.y=-(je.offsetY/t.value.clientHeight)*2+1,ot.setFromCamera(gt,n.camera);const Ct=ot.intersectObjects(n.pickables);if(Ct.length>0){const dt=Ct[0].object;dt!==T&&(Qe(),T=dt,_e(dt)),t.value.style.cursor=e.selectingTarget?"crosshair":"pointer"}else Qe(),t.value.style.cursor=e.selectingTarget?"crosshair":"";if(e.state.kind!=="relation_reveal")return;const ht=ot.intersectObjects(n.lines.concat(a.map(dt=>dt.line)));if(ht.length>0&&a.some(dt=>dt.line===ht[0].object)){const dt=a.find($t=>$t.line===ht[0].object);dt&&(o=dt.data.evidence?.[0]?.excerpt||"",dt.line!==L&&(tt(),L=dt.line,N(dt)))}else o="",tt()}),t.value.addEventListener("contextmenu",je=>{if(je.preventDefault(),!n||!e.data)return;gt.x=je.offsetX/t.value.clientWidth*2-1,gt.y=-(je.offsetY/t.value.clientHeight)*2+1,ot.setFromCamera(gt,n.camera);const Ct=ot.intersectObjects(n.pickables);if(Ct.length===0){const qt=e.state.kind;(qt==="global_overview"||qt==="region_zoom")&&g(),x.value=null;return}if(e.state.kind==="global_overview"){x.value=null;return}const ht=Ct[0].object,dt=ht.userData.id,$t=ht.userData.kind,Ln=ht.userData.layer;if(Ln<1||Ln>3){x.value=null;return}let Jn="";Ln<=2?Jn=e.data.lifelines.find(Zt=>Zt.id===dt)?.name||dt:Jn=e.data.entities.find(Zt=>Zt.id===dt)?.title||dt,x.value={x:je.clientX,y:je.clientY,target:{id:dt,kind:$t,title:Jn,layer:Ln}}}),window.addEventListener("keydown",z),document.querySelector(".cosmos-hud")?.addEventListener("mouseenter",()=>{M.value=!0,b&&clearTimeout(b)}),b=window.setTimeout(()=>{M.value=!1,C.value=!0},3e3),Oe()}function ee(D){e.transition({kind:"region_zoom",lifeline_id:D})}function re(D){if(!e.data)return;const k=e.data.entities.find(Q=>Q.id===D);k&&e.transition({kind:"node_focus",entity_kind:k.kind,entity_id:D})}function ge(){if(!te||!ne)return;const D=window.innerWidth,k=window.innerHeight;te.setSize(D,k),ne(D,k)}function _e(D){D.scale.setScalar(FT);const k=D.material;k._origColor=k._origColor??k.color.getHex(),k.color.set(ti("--accent")),k.needsUpdate=!0}function Qe(){if(!T)return;T.scale.setScalar(1);const D=T.material;D._origColor!==void 0&&(D.color.setHex(D._origColor),delete D._origColor,D.needsUpdate=!0),T=null}function N(D){const k=D.line.material;k._origLinewidth=k._origLinewidth??k.linewidth,k._origColor=k._origColor??k.color.getHex(),k.linewidth=k._origLinewidth*1.3,k.color.set(ti("--accent")),k.needsUpdate=!0,a.forEach(Q=>{if(Q.line!==D.line){const Pe=Q.line.material;Pe.transparent=!0,Pe._origOpacity=Pe._origOpacity??Pe.opacity,Pe.opacity=(Pe._origOpacity||.8)*.3,Pe.needsUpdate=!0}})}function tt(){if(!L)return;const D=L.material;D._origLinewidth!==void 0&&(D.linewidth=D._origLinewidth,delete D._origLinewidth),D._origColor!==void 0&&(D.color.setHex(D._origColor),delete D._origColor),D.needsUpdate=!0,a.forEach(k=>{const Q=k.line.material;Q._origOpacity!==void 0&&(Q.opacity=Q._origOpacity,delete Q._origOpacity,Q.needsUpdate=!0)}),L=null}function Ge(D){if(l.value=!1,!!n)if(D.kind==="lifeline")if(D.layer===1)e.transition({kind:"region_zoom",lifeline_id:D.id});else{let k=e.data?.lifelines.find(Q=>Q.id===D.id)?.parent_id;for(;k&&k!=="ROOT";){const Q=e.data?.lifelines.find(Pe=>Pe.id===k);if(Q&&Q.parent_id==="ROOT")break;k=Q?.parent_id}k&&k!=="ROOT"&&e.transition({kind:"region_zoom",lifeline_id:k})}else e.transition({kind:"node_focus",entity_kind:D.kind,entity_id:D.id})}function et(D){D.layer===3&&w.value?.startEditTitle()}async function ve(D){if(!await p(`确定删除「${D.title.slice(0,30)}」？`,"此操作不可撤销。","删除",!0))return;const Q=D.id.split(":"),Pe=Q[0],De=parseInt(Q.slice(1).join(":"),10);try{await e.deleteEntityById(Pe,De)}catch{await e.reload()}const ot=e.state;if((ot.kind==="node_focus"||ot.kind==="relation_reveal")&&ot.entity_id===D.id){const Ut=e.data?.entities.find(je=>je.id===D.id)?.lifeline_id;Ut?e.transition({kind:"region_zoom",lifeline_id:Ut}):e.transition({kind:"global_overview"})}}async function wt(D,k){const Q=D.split(":"),Pe=Q[0],De=parseInt(Q.slice(1).join(":"),10);try{await e.mountEntity(Pe,De,k)}catch{await e.reload()}}function A(D,k){const Q=e.data?.lifelines.find(Pe=>Pe.id===k);_.value={kind:D,lifelineId:k,lifelineName:Q?.name||k},v.value="",setTimeout(()=>y.value?.focus(),50)}async function S(){if(!_.value)return;const D=v.value.trim();if(!D)return;const{kind:k,lifelineId:Q}=_.value;try{await e.createEntityUnderLifeline(k,D,Q)}catch{await e.reload()}_.value=null}function W(){_.value=null}function le(D){D.key==="Enter"?S():D.key==="Escape"&&W()}const he=Be(null),xe=Be(""),be=Be(null);function ie(D){he.value={id:D.id,name:D.title},xe.value=D.title,su(()=>be.value?.focus())}async function de(){if(!he.value)return;const D=xe.value.trim();if(!D||D===he.value.name){he.value=null;return}try{await e.updateLifeline(he.value.id,{name:D}),he.value=null}catch{await e.reload(),he.value=null}}function Le(D){D.key==="Enter"?(D.stopPropagation(),de()):D.key==="Escape"&&(D.stopPropagation(),he.value=null)}function ze(D){e.startSelectingTarget(D.id,D.title)}async function Ee(D){await e.createAssoc(D),e.closeEditAssoc()}async function Me(D){await e.updateAssoc(D.association_id,{relation_type:D.relation_type,confidence:D.confidence,evidence:D.evidence}),e.closeEditAssoc()}async function at(D){e.closeEditAssoc(),await e.deleteAssoc(D)}async function ut(D){if(!e.data)return;const k=e.state;if(k.kind!=="node_focus"&&k.kind!=="relation_reveal")return;const Q=k.entity_id;if(!e.data.entities.find(Ut=>Ut.id===Q))return;const De=e.data.associations.find(Ut=>Ut.id===D.id);if(!De)return;const ot=e.data.entities.find(Ut=>Ut.id===De.from),gt=e.data.entities.find(Ut=>Ut.id===De.to);e.openEditAssoc({id:De.id,from:De.from,fromTitle:ot?.title||De.from,to:De.to,toTitle:gt?.title||De.to,relation_type:De.relation_type,confidence:De.confidence,status:De.status,evidence:De.evidence||[]})}async function xt(D){await p("删除关联","确定删除这条关联？此操作不可撤销。","确认删除",!0)&&await e.deleteAssoc(D)}function z(D){if((D.ctrlKey||D.metaKey)&&D.key==="k"){D.preventDefault(),D.stopPropagation(),l.value=!l.value;return}if((D.ctrlKey||D.metaKey)&&D.key==="n"){D.preventDefault();let Q;const Pe=e.state.kind;if(Pe==="region_zoom")Q=e.state.lifeline_id;else if(Pe==="node_focus"||Pe==="relation_reveal"){const De=e.state.entity_id;Q=e.data?.entities.find(ot=>ot.id===De)?.lifeline_id}g(Q);return}if(D.key==="/"&&!l.value){const Q=D.target;if(Q.tagName==="INPUT"||Q.tagName==="TEXTAREA")return;D.preventDefault(),l.value=!0;return}if(D.key==="?"){const Q=D.target;if(Q.tagName==="INPUT"||Q.tagName==="TEXTAREA")return;D.preventDefault(),c.value=!c.value;return}const k=e.state;if(D.key==="Escape"){if(e.selectingTarget){e.cancelSelecting();return}if(U.value||O.value){ke();return}if(l.value){l.value=!1;return}k.kind==="relation_reveal"?(ae(),e.transition({kind:"node_focus",entity_kind:k.entity_kind,entity_id:k.entity_id})):k.kind==="node_focus"?e.transition({kind:k.lifeline_id?"region_zoom":"global_overview",lifeline_id:k.lifeline_id}):k.kind==="region_zoom"&&e.transition({kind:"global_overview"})}(D.key==="r"||D.key==="R")&&(k.kind==="node_focus"?Se():k.kind==="relation_reveal"&&ae())}function Se(){if(!e.data||!n)return;const D=e.state;if(D.kind!=="node_focus")return;const k=D.entity_id;e.transition({kind:"relation_reveal",entity_kind:D.entity_kind,entity_id:k}),a=gS(n.scene,e.data,n.layoutNodes,k,new fe(t.value.clientWidth,t.value.clientHeight));const Q=new Set([k]);a.forEach(Pe=>{Q.add(Pe.fromNode.id),Q.add(Pe.toNode.id)}),_S(n.nodes,Q),B()}function ae(){n&&(tt(),a.forEach(D=>{if(n.scene.remove(D.line),D.line.geometry?.dispose(),D.line.material){const k=D.line.material;Array.isArray(k)?k.forEach(Q=>Q.dispose()):k.dispose()}D.arrow&&(n.scene.remove(D.arrow),D.arrow.geometry?.dispose(),D.arrow.material instanceof sn&&D.arrow.material.dispose())}),a=[],cf(n.nodes))}function Oe(){if(!n)return;s=requestAnimationFrame(Oe),i?.update(),SS(.016,n.camera,i);const D=n.camera.position.length(),k=D>3.5?1:D>=2?2:3,Q=e.state.kind==="node_focus"||e.state.kind==="relation_reveal";n.nodes.forEach(Pe=>{const De=Pe.userData.layer;Pe.visible=Q||De<=k}),n.lines.forEach(Pe=>{const De=Pe.userData?.fromLayer??3,ot=Pe.userData?.toLayer??3;Pe.visible=Q||Math.max(De,ot)<=k}),vS(n.nodes,.016),ue&&ue.syncPositions(n.nodes),n.renderer.render(n.scene,n.camera),ue&&te&&(ue.update(e.state,n.camera,e.data?.associations),te.render(n.scene,n.camera))}async function Te(){if(!n)return;const D=e.state,k=n.layoutNodes;if(D.kind==="global_overview"){nu(n.scene);for(const Q of n.nodes)Q.userData.targetPosition=Q.userData.homePosition.clone();cf(n.nodes),To(n.camera,i,new R(0,2.5,5.5),new R(0,0,0),60,800)}else if(D.kind==="region_zoom"){nu(n.scene);for(const ot of n.nodes)ot.userData.targetPosition=ot.userData.homePosition.clone();const Q=D.lifeline_id;let De=k.find(ot=>ot.id===Q&&ot.layer===1);if(!De){const ot=k.find(gt=>gt.id===Q);if(ot){let gt=ot.parentId;for(;gt;){const Ut=k.find(je=>je.id===gt);if(Ut&&Ut.layer===1){De=Ut;break}gt=Ut?.parentId}}}if(De){const ot=De.position.clone().normalize(),gt=Ni.R1+1.8;To(n.camera,i,ot.clone().multiplyScalar(gt),De.position,50,800);const Ut=De.id,je=new Set,Ct=[Ut];for(;Ct.length>0;){const ht=Ct.shift();je.add(ht),k.filter(dt=>dt.parentId===ht).forEach(dt=>Ct.push(dt.id))}om(n.nodes,je)}}else if(D.kind==="node_focus"||D.kind==="relation_reveal"){const Q=D.entity_id,Pe=k.find(ht=>ht.id===Q);if(!Pe)return;nu(n.scene),yS(n.scene,Pe.position,ti("--accent"));const De=Pe.position.clone().normalize(),ot=Pe.position.length()+.6,gt=De.clone().multiplyScalar(ot);To(n.camera,i,gt,Pe.position,D.kind==="node_focus"?35:55,800);const{computeFocusLayout:Ut}=await Et(async()=>{const{computeFocusLayout:ht}=await Promise.resolve().then(()=>uS);return{computeFocusLayout:ht}},void 0),{targets:je,constellationIds:Ct}=Ut(k,Q,e.data?.associations||[],De);for(const ht of n.nodes){const dt=ht.userData.id,$t=je.get(dt);ht.userData.targetPosition=$t?$t.clone():ht.userData.homePosition.clone()}xS(n.nodes,Ct)}}return Io(()=>e.state,Te,{deep:!0}),Io(()=>e.state.kind,()=>{M.value=!0,C.value=!1,b&&clearTimeout(b),b=window.setTimeout(()=>{M.value=!1,C.value=!0},3e3)}),zi(async()=>{await e.load(),e.data&&await se()}),ls(()=>{cancelAnimationFrame(s),n?.dispose(),i?.dispose(),window.removeEventListener("keydown",z),window.removeEventListener("resize",ge),ue&&(ue.dispose(),ue=null),te?.domElement&&te.domElement.remove(),b&&clearTimeout(b)}),(D,k)=>(X(),q("div",fT,[P("div",pT,[Ia(RS,{state:Je(e).state,onNav:k[0]||(k[0]=Q=>Je(e).transition(Q))},null,8,["state"]),Je(e).state.kind!=="global_overview"?(X(),q("button",{key:0,class:"home-btn",onClick:k[1]||(k[1]=Q=>Je(e).transition({kind:"global_overview"})),title:"回到全局"},"⌂")):We("",!0),l.value?(X(),Xi(Jw,{key:1,onSelect:Ge,onClose:k[2]||(k[2]=Q=>l.value=!1)})):We("",!0),l.value?We("",!0):(X(),Xi(M1,{key:2,onFocusLifeline:ee,onFocusEntity:re})),l.value?We("",!0):(X(),q("button",{key:3,class:"search-trigger",onClick:k[3]||(k[3]=Q=>l.value=!0)},"搜索 ⌘K"))]),Je(e).loading?(X(),q("div",mT,[...k[20]||(k[20]=[P("div",{class:"loader-ring"},null,-1),P("div",{class:"state-text"},"加载 Atlas…",-1)])])):Je(e).error?(X(),q("div",gT,[k[21]||(k[21]=P("div",{class:"state-text"},"Cosmos 数据加载失败",-1)),k[22]||(k[22]=P("div",{class:"state-sub"},"API 和 mock 均不可用",-1)),P("button",{class:"retry-btn",onClick:k[4]||(k[4]=Q=>Je(e).reload())},"重试")])):Je(e).data&&Je(e).data.lifelines.length===0?(X(),q("div",_T,[...k[23]||(k[23]=[P("div",{class:"state-text"},"暂无 lifeline",-1),P("div",{class:"state-sub"},"在左侧面板中创建第一条 lifeline 来开始构建知识星球",-1)])])):We("",!0),!Je(e).loading&&!Je(e).error&&Je(e).data&&Je(e).data.lifelines.length>0?(X(),q(nt,{key:3},[P("canvas",{ref_key:"canvasRef",ref:t,class:"cosmos-canvas"},null,512),Ia(kw,{ref_key:"nodeDetailRef",ref:w,onEditAssoc:ut,onDeleteAssoc:xt,onCopied:$e},null,512),Je(o)&&Je(e).state.kind==="relation_reveal"?(X(),q("div",vT,ye(Je(o)),1)):We("",!0),M.value?(X(),q("div",{key:1,class:Rn(["shortcuts-hint",{fade:C.value}])},[Je(e).state.kind==="global_overview"?(X(),q(nt,{key:0},[Bn("点击 R1 进入 lifeline   滚轮缩放   拖拽旋转   Ctrl+K 搜索")],64)):Je(e).state.kind==="region_zoom"?(X(),q(nt,{key:1},[Bn("点击 R2/R3 聚焦 entity   滚轮缩放   Esc 返回全局   Ctrl+K 搜索")],64)):Je(e).state.kind==="node_focus"?(X(),q(nt,{key:2},[Bn("R 查看关联   Esc 返回 lifeline   拖拽旋转")],64)):Je(e).state.kind==="relation_reveal"?(X(),q(nt,{key:3},[Bn("Esc 返回焦点   点击关联线查看证据   底部筛选")],64)):We("",!0)],2)):We("",!0),x.value?(X(),Xi(iE,{key:2,target:x.value.target,x:x.value.x,y:x.value.y,onClose:k[5]||(k[5]=Q=>x.value=null),onEditTitle:et,onDeleteEntity:ve,onMoveLifeline:wt,onCreateEntity:A,onEditLifelineName:ie,onAssociateTo:ze,onFindPathTo:me,onCopyTitle:K,onDeleteLifeline:pe,onQuickCreate:g},null,8,["target","x","y"])):We("",!0),m.value?(X(),Xi(lE,{key:3,title:m.value.title,message:m.value.message,"confirm-label":m.value.confirmLabel,danger:m.value.danger,onConfirm:k[6]||(k[6]=Q=>{m.value.resolve(!0),m.value=null}),onCancel:k[7]||(k[7]=Q=>{m.value.resolve(!1),m.value=null})},null,8,["title","message","confirm-label","danger"])):We("",!0),he.value?(X(),q("div",{key:4,class:"create-overlay",onPointerdown:k[11]||(k[11]=Q=>he.value=null)},[P("div",{class:"create-dialog",onPointerdown:k[10]||(k[10]=pn(()=>{},["stop"]))},[k[24]||(k[24]=P("div",{class:"create-title"},"编辑 lifeline 名称",-1)),Tt(P("input",{ref_key:"lifelineEditEl",ref:be,"onUpdate:modelValue":k[8]||(k[8]=Q=>xe.value=Q),class:"create-input",onKeydown:Le},null,544),[[Vt,xe.value]]),P("div",xT,[P("button",{class:"confirm-btn cancel-btn",onClick:k[9]||(k[9]=Q=>he.value=null)},"取消"),P("button",{class:"confirm-btn primary-btn",disabled:!xe.value.trim(),onClick:de},"保存",8,yT)])],32)],32)):We("",!0),_.value?(X(),q("div",{key:5,class:"create-overlay",onPointerdown:W},[P("div",{class:"create-dialog",onPointerdown:k[13]||(k[13]=pn(()=>{},["stop"]))},[P("div",bT,"新建 "+ye(_.value.kind),1),P("div",MT,"添加到「"+ye(_.value.lifelineName)+"」",1),Tt(P("input",{ref_key:"createInputEl",ref:y,"onUpdate:modelValue":k[12]||(k[12]=Q=>v.value=Q),class:"create-input",placeholder:"输入标题…",onKeydown:le},null,544),[[Vt,v.value]]),P("div",ST,[P("button",{class:"confirm-btn cancel-btn",onClick:W},"取消"),P("button",{class:"confirm-btn primary-btn",disabled:!v.value.trim(),onClick:S},"创建",8,wT)])],32)],32)):We("",!0)],64)):We("",!0),Je(e).editAssoc?(X(),Xi(RE,{key:4,"from-id":Je(e).editAssoc.from,"from-title":Je(e).editAssoc.fromTitle,"to-id":Je(e).editAssoc.to,"to-title":Je(e).editAssoc.toTitle,existing:Je(e).editAssoc.id?{id:Je(e).editAssoc.id,relation_type:Je(e).editAssoc.relation_type,confidence:Je(e).editAssoc.confidence,status:Je(e).editAssoc.status,evidence:Je(e).editAssoc.evidence}:void 0,onCancel:k[14]||(k[14]=Q=>Je(e).closeEditAssoc()),onCreate:Ee,onUpdate:Me,onDelete:at},null,8,["from-id","from-title","to-id","to-title","existing"])):We("",!0),Je(e).selectingTarget?(X(),q("div",ET," crosshair 点击目标 entity 来创建关联 (Esc 取消) ")):We("",!0),U.value?(X(),q("div",TT," crosshair 点击目标 entity 查找最短路径 (Esc 取消) ")):We("",!0),O.value?(X(),Xi(ZE,{key:7,paths:O.value,"current-path-index":V.value,"from-title":O.value[V.value]?.[0]?.entityTitle||"","to-title":O.value[V.value]?.[O.value[V.value].length-1]?.entityTitle||"",onPrevPath:st,onNextPath:oe,onClear:ke,onFocusEntity:$,onCopied:Ae},null,8,["paths","current-path-index","from-title","to-title"])):We("",!0),c.value?(X(),Xi(QE,{key:8,onClose:k[15]||(k[15]=Q=>c.value=!1)})):We("",!0),d.value?(X(),Xi(hT,{key:9,"default-lifeline-id":f.value,onClose:k[16]||(k[16]=Q=>d.value=!1)},null,8,["default-lifeline-id"])):We("",!0),u.value?(X(),q("div",AT,"已复制到剪贴板")):We("",!0),Ia(PE,{"show-assoc":Je(e).state.kind==="relation_reveal"},null,8,["show-assoc"]),Je(n)&&Je(e).state.kind!=="node_focus"&&Je(e).state.kind!=="relation_reveal"?(X(),q("div",CT,[Ia(DE,{"layout-nodes":Je(n).layoutNodes,camera:Je(n).camera,controls:Je(i),"world-radius":Je(Ni).R3,"focused-lifeline-id":Je(e).state.kind==="region_zoom"?Je(e).state.lifeline_id:null,onJump:k[17]||(k[17]=(Q,Pe)=>Je(To)(Je(n).camera,Je(i),Q,Pe,60,800))},null,8,["layout-nodes","camera","controls","world-radius","focused-lifeline-id"])])):We("",!0),Je(e).state.kind==="relation_reveal"?(X(),q("div",RT,[P("div",IT,[(X(),q(nt,null,cn(["co_occurrence","causal","tension","derived_from","manual"],Q=>P("button",{key:Q,class:Rn(["filter-chip",{active:I.types.includes(Q)}]),onClick:Pe=>J(Q)},ye({co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[Q]),11,PT)),64))]),P("div",LT,[P("span",DT,"信心度 ≥ "+ye(I.minConfidence.toFixed(2)),1),Tt(P("input",{"onUpdate:modelValue":k[18]||(k[18]=Q=>I.minConfidence=Q),type:"range",min:"0",max:"1",step:"0.05",class:"filter-range",onInput:B},null,544),[[Vt,I.minConfidence,void 0,{number:!0}]])]),Tt(P("select",{"onUpdate:modelValue":k[19]||(k[19]=Q=>I.status=Q),class:"filter-select",onChange:B},[...k[25]||(k[25]=[P("option",{value:"all"},"全部",-1),P("option",{value:"accepted"},"已确认",-1),P("option",{value:"pending"},"待定",-1)])],544),[[bi,I.status]]),P("span",UT,"显示 "+ye(G.value)+"/"+ye(Je(a).length)+" 条关联",1),Je(a).length>0&&G.value===0?(X(),q("span",NT,"当前筛选条件下无可见关联")):We("",!0)])):We("",!0)]))}}),kT=Xn(OT,[["__scopeId","data-v-205a8f22"]]),VT=Object.freeze(Object.defineProperty({__proto__:null,default:kT},Symbol.toStringTag,{value:"Module"}));export{av as C,gm as M,St as O,Qi as P,mn as Q,wr as R,z0 as S,_m as T,fe as V,VT as a,vl as b,rt as c,R as d};
