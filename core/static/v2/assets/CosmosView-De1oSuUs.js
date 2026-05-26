const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CVZL5f_h.js","assets/vue-Cvl-Tb45.js","assets/index-RjWMaq7c.css","assets/OrbitControls-D5JS8Arn.js","assets/labels-CLoSxnbF.js"])))=>i.map(i=>d[i]);
import{_ as Et,a as In}from"./index-CVZL5f_h.js";import{m as Tm,u as Ne,c as Dt,l as Pn,s as W,f as q,F as Qe,v as Ht,e as ke,w as fe,x as Ke,b as R,C as wt,z as Gt,D as Qn,y as xi,E as fn,p as ws,o as $t,i as Cn,A as Ro,h as mr,n as iu,r as Bi,q as rs,t as bf,j as Ra,d as Ei}from"./vue-Cvl-Tb45.js";function Am(r,e){if(r.kind!==e.kind)return!1;if(r.kind==="global_overview")return!0;const t=r.lifeline_id,n=e.lifeline_id;if(t&&n)return t===n;const i=r.entity_id,s=e.entity_id;return i&&s?i===s:!1}const as=Tm("cosmos",()=>{const r=Ne(null),e=Ne({kind:"global_overview"}),t=Ne(!1),n=Ne(null),i=Ne(null),s=Ne([{state:{kind:"global_overview"},title:"全局"}]),a=Ne(0),o=Dt(()=>a.value>0),l=Dt(()=>a.value<s.value.length-1);function c(le){switch(le.kind){case"global_overview":return"全局";case"region_zoom":return r.value?.lifelines.find(Be=>Be.id===le.lifeline_id)?.name||le.lifeline_id||"?";case"node_focus":case"relation_reveal":{const Ee=le.entity_id,Le=r.value?.entities.find(re=>re.id===Ee)?.title||Ee;return le.kind==="relation_reveal"?`${Le} · 关联`:Le}}}function u(le){const Ee=s.value[a.value];Ee&&Am(Ee.state,le)||(s.value=s.value.slice(0,a.value+1),s.value.push({state:{...le},title:c(le)}),s.value.length>50?s.value.shift():a.value=s.value.length-1)}function h(le){m(`leave_${e.value.kind}`,e.value),e.value=le,i.value=null,m(`enter_${le.kind}`,le)}function d(le){i.value=le}const f={};function m(le,Ee){f[le]?.forEach(Be=>Be(Ee))}function _(le,Ee){f[le]||(f[le]=[]),f[le].push(Ee)}async function g(){if(!r.value){t.value=!0;try{const{apiRequest:le}=await Et(async()=>{const{apiRequest:Ee}=await import("./index-CVZL5f_h.js").then(Be=>Be.c);return{apiRequest:Ee}},__vite__mapDeps([0,1,2]));r.value=await le("/cosmos"),s.value=[{state:{kind:"global_overview"},title:"全局"}],a.value=0}catch{try{const Ee=await fetch("/mock/cosmos.json");r.value=await Ee.json(),s.value=[{state:{kind:"global_overview"},title:"全局"}],a.value=0}catch{n.value="Cosmos 数据加载失败"}}finally{t.value=!1}}}function p(le){u(le),h(le)}function v(){o.value&&(a.value--,h(s.value[a.value].state))}function x(){l.value&&(a.value++,h(s.value[a.value].state))}async function y(){r.value=null,n.value=null,B.value.clear(),await g()}async function w(le){const{createLifeline:Ee}=await Et(async()=>{const{createLifeline:Be}=await import("./index-CVZL5f_h.js").then(Le=>Le.e);return{createLifeline:Be}},__vite__mapDeps([0,1,2]));await Ee(le),await y()}async function M(le,Ee){const{updateLifeline:Be}=await Et(async()=>{const{updateLifeline:Le}=await import("./index-CVZL5f_h.js").then(re=>re.e);return{updateLifeline:Le}},__vite__mapDeps([0,1,2]));await Be(le,Ee),await y()}async function A(le){const{deleteLifeline:Ee}=await Et(async()=>{const{deleteLifeline:Be}=await import("./index-CVZL5f_h.js").then(Le=>Le.e);return{deleteLifeline:Be}},__vite__mapDeps([0,1,2]));await Ee(le),await y()}async function b(le,Ee,Be){const{mountEntity:Le}=await Et(async()=>{const{mountEntity:re}=await import("./index-CVZL5f_h.js").then(Ae=>Ae.e);return{mountEntity:re}},__vite__mapDeps([0,1,2]));await Le(le,Ee,Be),await y()}async function E(le,Ee){if(r.value){const Be=r.value.associations.findIndex(Le=>Le.id===le);Be!==-1&&(r.value={...r.value,associations:[...r.value.associations.slice(0,Be),{...r.value.associations[Be],status:Ee},...r.value.associations.slice(Be+1)]})}try{const{reviewAssociation:Be}=await Et(async()=>{const{reviewAssociation:Le}=await import("./index-CVZL5f_h.js").then(re=>re.e);return{reviewAssociation:Le}},__vite__mapDeps([0,1,2]));await Be(le,Ee)}catch{await y()}}async function P(le,Ee,Be){const{updateEntity:Le}=await Et(async()=>{const{updateEntity:re}=await import("./index-CVZL5f_h.js").then(Ae=>Ae.e);return{updateEntity:re}},__vite__mapDeps([0,1,2]));await Le(le,Ee,{title:Be}),await y()}async function D(le,Ee){const{deleteEntity:Be}=await Et(async()=>{const{deleteEntity:Le}=await import("./index-CVZL5f_h.js").then(re=>re.e);return{deleteEntity:Le}},__vite__mapDeps([0,1,2]));await Be(le,Ee),await y()}async function V(le){const{createAssociation:Ee}=await Et(async()=>{const{createAssociation:Be}=await import("./index-CVZL5f_h.js").then(Le=>Le.e);return{createAssociation:Be}},__vite__mapDeps([0,1,2]));await Ee({...le,status:"accepted"}),await y()}async function J(le,Ee){const{updateAssociation:Be}=await Et(async()=>{const{updateAssociation:Le}=await import("./index-CVZL5f_h.js").then(re=>re.e);return{updateAssociation:Le}},__vite__mapDeps([0,1,2]));await Be(le,Ee),await y()}async function K(le){const{deleteAssociation:Ee}=await Et(async()=>{const{deleteAssociation:Be}=await import("./index-CVZL5f_h.js").then(Le=>Le.e);return{deleteAssociation:Be}},__vite__mapDeps([0,1,2]));await Ee(le),await y()}const B=Ne(new Map),H=Ne(null),Y=Ne(null);function pe(le,Ee){H.value={fromId:le,fromTitle:Ee}}function _e(){H.value=null}function ye(le){Y.value=le}function Re(){Y.value=null}return{data:r,state:e,loading:t,error:n,load:g,reload:y,transition:p,on:_,createLifeline:w,updateLifeline:M,deleteLifeline:A,mountEntity:b,reviewAssociation:E,selectedAssocId:i,selectAssociation:d,updateEntityTitle:P,deleteEntityById:D,canGoBack:o,canGoForward:l,navigateBack:v,navigateForward:x,createAssoc:V,updateAssoc:J,deleteAssoc:K,selectingTarget:H,startSelectingTarget:pe,cancelSelecting:_e,editAssoc:Y,openEditAssoc:ye,closeEditAssoc:Re,entityDetailCache:B}});/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wl="184",Cm={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Rm={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Mf=0,su=1,Sf=2,Im=3,Pm=0,$r=1,wf=2,ur=3,Fi=0,bn=1,mi=2,yi=0,Cs=1,ru=2,au=3,ou=4,Ef=5,Lm=6,Ji=100,Tf=101,Af=102,Cf=103,Rf=104,If=200,Pf=201,Lf=202,Df=203,Io=204,Po=205,Uf=206,Nf=207,Ff=208,Of=209,kf=210,Bf=211,zf=212,Vf=213,Gf=214,Lo=0,Do=1,Uo=2,Ls=3,No=4,Fo=5,Oo=6,ko=7,ba=0,Hf=1,Wf=2,ni=0,Tu=1,Au=2,Cu=3,Ru=4,Iu=5,Pu=6,Lu=7,lu="attached",Xf="detached",El=300,bi=301,ts=302,qr=303,Yr=304,Mr=306,ia=1e3,Rn=1001,sa=1002,Wt=1003,Du=1004,Dm=1004,dr=1005,Um=1005,Ut=1006,Zr=1007,Nm=1007,_i=1008,Fm=1008,Tn=1009,Uu=1010,Nu=1011,gr=1012,Tl=1013,$n=1014,xn=1015,Mi=1016,Al=1017,Cl=1018,_r=1020,Fu=35902,Ou=35899,ku=1021,Bu=1022,yn=1023,Si=1026,ji=1027,Rl=1028,Ma=1029,ns=1030,Il=1031,Om=1032,Pl=1033,Kr=33776,Jr=33777,jr=33778,Qr=33779,Bo=35840,zo=35841,Vo=35842,Go=35843,Ho=36196,Wo=37492,Xo=37496,$o=37488,qo=37489,ra=37490,Yo=37491,Zo=37808,Ko=37809,Jo=37810,jo=37811,Qo=37812,el=37813,tl=37814,nl=37815,il=37816,sl=37817,rl=37818,al=37819,ol=37820,ll=37821,cl=36492,ul=36494,dl=36495,hl=36283,fl=36284,aa=36285,pl=36286,$f=2200,qf=2201,Yf=2202,oa=2300,ml=2301,To=2302,cu=2303,Es=2400,Ts=2401,la=2402,Ll=2500,zu=2501,km=0,Bm=1,zm=2,Zf=3200,Vm=3201,Gm=3202,Hm=3203,Oi=0,Kf=1,Li="",En="srgb",ca="srgb-linear",ua="linear",Tt="srgb",Wm="",Xm="rg",$m="ga",qm=0,Ms=7680,Ym=7681,Zm=7682,Km=7683,Jm=34055,jm=34056,Qm=5386,eg=512,tg=513,ng=514,ig=515,sg=516,rg=517,ag=518,uu=519,Jf=512,jf=513,Qf=514,Dl=515,ep=516,tp=517,Ul=518,np=519,da=35044,og=35048,lg=35040,cg=35045,ug=35049,dg=35041,hg=35046,fg=35050,pg=35042,mg="100",du="300 es",Bn=2e3,Ds=2001,gg={COMPUTE:"compute",RENDER:"render"},_g={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},vg={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},xg={TEXTURE_COMPARE:"depthTextureCompare"};function yg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}const bg={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function hr(r,e){return new bg[r](e)}function ip(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function ha(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function sp(){const r=ha("canvas");return r.style.display="block",r}const Rd={};let is=null;function Mg(r){is=r}function Sg(){return is}function fa(...r){const e="THREE."+r.shift();is?is("log",e,...r):console.log(e,...r)}function rp(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Ie(...r){r=rp(r);const e="THREE."+r.shift();if(is)is("warn",e,...r);else{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function Ye(...r){r=rp(r);const e="THREE."+r.shift();if(is)is("error",e,...r);else{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function gl(...r){const e=r.join(" ");e in Rd||(Rd[e]=!0,Ie(...r))}function wg(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Eg={[Lo]:Do,[Uo]:Oo,[No]:ko,[Ls]:Fo,[Do]:Lo,[Oo]:Uo,[ko]:No,[Fo]:Ls};class ri{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const un=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Id=1234567;const Rs=Math.PI/180,vr=180/Math.PI;function Vn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(un[r&255]+un[r>>8&255]+un[r>>16&255]+un[r>>24&255]+"-"+un[e&255]+un[e>>8&255]+"-"+un[e>>16&15|64]+un[e>>24&255]+"-"+un[t&63|128]+un[t>>8&255]+"-"+un[t>>16&255]+un[t>>24&255]+un[n&255]+un[n>>8&255]+un[n>>16&255]+un[n>>24&255]).toLowerCase()}function rt(r,e,t){return Math.max(e,Math.min(t,r))}function Vu(r,e){return(r%e+e)%e}function Tg(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Ag(r,e,t){return r!==e?(t-r)/(e-r):0}function ea(r,e,t){return(1-t)*r+t*e}function Cg(r,e,t,n){return ea(r,e,1-Math.exp(-t*n))}function Rg(r,e=1){return e-Math.abs(Vu(r,e*2)-e)}function Ig(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Pg(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Lg(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Dg(r,e){return r+Math.random()*(e-r)}function Ug(r){return r*(.5-Math.random())}function Ng(r){r!==void 0&&(Id=r);let e=Id+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Fg(r){return r*Rs}function Og(r){return r*vr}function kg(r){return(r&r-1)===0&&r!==0}function Bg(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function zg(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Vg(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),h=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":r.set(o*u,l*h,l*d,o*c);break;case"YZY":r.set(l*d,o*u,l*h,o*c);break;case"ZXZ":r.set(l*h,l*d,o*u,o*c);break;case"XZX":r.set(o*u,l*m,l*f,o*c);break;case"YXY":r.set(l*f,o*u,l*m,o*c);break;case"ZYZ":r.set(l*m,l*f,o*u,o*c);break;default:Ie("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function vn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ht(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const _l={DEG2RAD:Rs,RAD2DEG:vr,generateUUID:Vn,clamp:rt,euclideanModulo:Vu,mapLinear:Tg,inverseLerp:Ag,lerp:ea,damp:Cg,pingpong:Rg,smoothstep:Ig,smootherstep:Pg,randInt:Lg,randFloat:Dg,randFloatSpread:Ug,seededRandom:Ng,degToRad:Fg,radToDeg:Og,isPowerOfTwo:kg,ceilPowerOfTwo:Bg,floorPowerOfTwo:zg,setQuaternionFromProperEuler:Vg,normalize:ht,denormalize:vn},yd=class yd{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};yd.prototype.isVector2=!0;let de=yd;class pn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3],d=s[a+0],f=s[a+1],m=s[a+2],_=s[a+3];if(h!==_||l!==d||c!==f||u!==m){let g=l*d+c*f+u*m+h*_;g<0&&(d=-d,f=-f,m=-m,_=-_,g=-g);let p=1-o;if(g<.9995){const v=Math.acos(g),x=Math.sin(v);p=Math.sin(p*v)/x,o=Math.sin(o*v)/x,l=l*p+d*o,c=c*p+f*o,u=u*p+m*o,h=h*p+_*o}else{l=l*p+d*o,c=c*p+f*o,u=u*p+m*o,h=h*p+_*o;const v=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=v,c*=v,u*=v,h*=v}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[a],d=s[a+1],f=s[a+2],m=s[a+3];return e[t]=o*m+u*h+l*f-c*d,e[t+1]=l*m+u*d+c*h-o*f,e[t+2]=c*m+u*f+o*d-l*h,e[t+3]=u*m-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),h=o(s/2),d=l(n/2),f=l(i/2),m=l(s/2);switch(a){case"XYZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"YZX":this._x=d*u*h+c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h-d*f*m;break;case"XZY":this._x=d*u*h-c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h+d*f*m;break;default:Ie("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+i*c-s*l,this._y=i*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const bd=class bd{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Pd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Pd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),u=2*(o*t-s*i),h=2*(s*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-s*h,this.z=i+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return oc.copy(this).projectOnVector(e),this.sub(oc)}reflect(e){return this.sub(oc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};bd.prototype.isVector3=!0;let I=bd;const oc=new I,Pd=new pn,Md=class Md{constructor(e,t,n,i,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],m=n[8],_=i[0],g=i[3],p=i[6],v=i[1],x=i[4],y=i[7],w=i[2],M=i[5],A=i[8];return s[0]=a*_+o*v+l*w,s[3]=a*g+o*x+l*M,s[6]=a*p+o*y+l*A,s[1]=c*_+u*v+h*w,s[4]=c*g+u*x+h*M,s[7]=c*p+u*y+h*A,s[2]=d*_+f*v+m*w,s[5]=d*g+f*x+m*M,s[8]=d*p+f*y+m*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*s,f=c*s-a*l,m=t*h+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=h*_,e[1]=(i*c-u*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(u*t-i*l)*_,e[5]=(i*s-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(lc.makeScale(e,t)),this}rotate(e){return this.premultiply(lc.makeRotation(-e)),this}translate(e,t){return this.premultiply(lc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Md.prototype.isMatrix3=!0;let ot=Md;const lc=new ot,Ld=new ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dd=new ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Gg(){const r={enabled:!0,workingColorSpace:ca,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Tt&&(i.r=Ni(i.r),i.g=Ni(i.g),i.b=Ni(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Tt&&(i.r=pr(i.r),i.g=pr(i.g),i.b=pr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Li?ua:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return gl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return gl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[ca]:{primaries:e,whitePoint:n,transfer:ua,toXYZ:Ld,fromXYZ:Dd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:En},outputColorSpaceConfig:{drawingBufferColorSpace:En}},[En]:{primaries:e,whitePoint:n,transfer:Tt,toXYZ:Ld,fromXYZ:Dd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:En}}}),r}const _t=Gg();function Ni(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function pr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Gs;class ap{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Gs===void 0&&(Gs=ha("canvas")),Gs.width=e.width,Gs.height=e.height;const i=Gs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Gs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ha("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Ni(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ni(t[n]/255)*255):t[n]=Ni(t[n]);return{data:t,width:e.width,height:e.height}}else return Ie("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Hg=0;class Qi{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hg++}),this.uuid=Vn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(cc(i[a].image)):s.push(cc(i[a]))}else s=cc(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function cc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?ap.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Ie("Texture: Unable to serialize Texture."),{})}let Wg=0;const uc=new I;class Ft extends ri{constructor(e=Ft.DEFAULT_IMAGE,t=Ft.DEFAULT_MAPPING,n=Rn,i=Rn,s=Ut,a=_i,o=yn,l=Tn,c=Ft.DEFAULT_ANISOTROPY,u=Li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wg++}),this.uuid=Vn(),this.name="",this.source=new Qi(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(uc).x}get height(){return this.source.getSize(uc).y}get depth(){return this.source.getSize(uc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ie(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ie(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==El)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ia:e.x=e.x-Math.floor(e.x);break;case Rn:e.x=e.x<0?0:1;break;case sa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ia:e.y=e.y-Math.floor(e.y);break;case Rn:e.y=e.y<0?0:1;break;case sa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=El;Ft.DEFAULT_ANISOTROPY=1;const Sd=class Sd{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],m=l[9],_=l[2],g=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,y=(f+1)/2,w=(p+1)/2,M=(u+d)/4,A=(h+_)/4,b=(m+g)/4;return x>y&&x>w?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=M/n,s=A/n):y>w?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=M/i,s=b/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=A/s,i=b/s),this.set(n,i,s,t),this}let v=Math.sqrt((g-m)*(g-m)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(h-_)/v,this.z=(d-u)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Sd.prototype.isVector4=!0;let xt=Sd;class Gu extends ri{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ut,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},s=new Ft(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Ut,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Qi(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gn extends Gu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Nl extends Ft{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Xg extends Gn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Nl(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class Fl extends Ft{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $g extends Gn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Fl(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}const Sl=class Sl{constructor(e,t,n,i,s,a,o,l,c,u,h,d,f,m,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,u,h,d,f,m,_,g)}set(e,t,n,i,s,a,o,l,c,u,h,d,f,m,_,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Sl().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Hs.setFromMatrixColumn(e,0).length(),s=1/Hs.setFromMatrixColumn(e,1).length(),a=1/Hs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*u,f=a*h,m=o*u,_=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+m*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,m=c*u,_=c*h;t[0]=d+_*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-m,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,m=c*u,_=c*h;t[0]=d-_*o,t[4]=-a*h,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*u,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,f=a*h,m=o*u,_=o*h;t[0]=l*u,t[4]=m*c-f,t[8]=d*c+_,t[1]=l*h,t[5]=_*c+d,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,m=o*l,_=o*c;t[0]=l*u,t[4]=_-d*h,t[8]=m*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+m,t[10]=d-_*h}else if(e.order==="XZY"){const d=a*l,f=a*c,m=o*l,_=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+_,t[5]=a*u,t[9]=f*h-m,t[2]=m*h-f,t[6]=o*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qg,e,Yg)}lookAt(e,t,n){const i=this.elements;return Nn.subVectors(e,t),Nn.lengthSq()===0&&(Nn.z=1),Nn.normalize(),Hi.crossVectors(n,Nn),Hi.lengthSq()===0&&(Math.abs(n.z)===1?Nn.x+=1e-4:Nn.z+=1e-4,Nn.normalize(),Hi.crossVectors(n,Nn)),Hi.normalize(),Ia.crossVectors(Nn,Hi),i[0]=Hi.x,i[4]=Ia.x,i[8]=Nn.x,i[1]=Hi.y,i[5]=Ia.y,i[9]=Nn.y,i[2]=Hi.z,i[6]=Ia.z,i[10]=Nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],v=n[3],x=n[7],y=n[11],w=n[15],M=i[0],A=i[4],b=i[8],E=i[12],P=i[1],D=i[5],V=i[9],J=i[13],K=i[2],B=i[6],H=i[10],Y=i[14],pe=i[3],_e=i[7],ye=i[11],Re=i[15];return s[0]=a*M+o*P+l*K+c*pe,s[4]=a*A+o*D+l*B+c*_e,s[8]=a*b+o*V+l*H+c*ye,s[12]=a*E+o*J+l*Y+c*Re,s[1]=u*M+h*P+d*K+f*pe,s[5]=u*A+h*D+d*B+f*_e,s[9]=u*b+h*V+d*H+f*ye,s[13]=u*E+h*J+d*Y+f*Re,s[2]=m*M+_*P+g*K+p*pe,s[6]=m*A+_*D+g*B+p*_e,s[10]=m*b+_*V+g*H+p*ye,s[14]=m*E+_*J+g*Y+p*Re,s[3]=v*M+x*P+y*K+w*pe,s[7]=v*A+x*D+y*B+w*_e,s[11]=v*b+x*V+y*H+w*ye,s[15]=v*E+x*J+y*Y+w*Re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],m=e[3],_=e[7],g=e[11],p=e[15],v=l*f-c*d,x=o*f-c*h,y=o*d-l*h,w=a*f-c*u,M=a*d-l*u,A=a*h-o*u;return t*(_*v-g*x+p*y)-n*(m*v-g*w+p*M)+i*(m*x-_*w+p*A)-s*(m*y-_*M+g*A)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],m=e[12],_=e[13],g=e[14],p=e[15],v=t*o-n*a,x=t*l-i*a,y=t*c-s*a,w=n*l-i*o,M=n*c-s*o,A=i*c-s*l,b=u*_-h*m,E=u*g-d*m,P=u*p-f*m,D=h*g-d*_,V=h*p-f*_,J=d*p-f*g,K=v*J-x*V+y*D+w*P-M*E+A*b;if(K===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/K;return e[0]=(o*J-l*V+c*D)*B,e[1]=(i*V-n*J-s*D)*B,e[2]=(_*A-g*M+p*w)*B,e[3]=(d*M-h*A-f*w)*B,e[4]=(l*P-a*J-c*E)*B,e[5]=(t*J-i*P+s*E)*B,e[6]=(g*y-m*A-p*x)*B,e[7]=(u*A-d*y+f*x)*B,e[8]=(a*V-o*P+c*b)*B,e[9]=(n*P-t*V-s*b)*B,e[10]=(m*M-_*y+p*v)*B,e[11]=(h*y-u*M-f*v)*B,e[12]=(o*E-a*D-l*b)*B,e[13]=(t*D-n*E+i*b)*B,e[14]=(_*x-m*w-g*v)*B,e[15]=(u*w-h*x+d*v)*B,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,d=s*c,f=s*u,m=s*h,_=a*u,g=a*h,p=o*h,v=l*c,x=l*u,y=l*h,w=n.x,M=n.y,A=n.z;return i[0]=(1-(_+p))*w,i[1]=(f+y)*w,i[2]=(m-x)*w,i[3]=0,i[4]=(f-y)*M,i[5]=(1-(d+p))*M,i[6]=(g+v)*M,i[7]=0,i[8]=(m+x)*A,i[9]=(g-v)*A,i[10]=(1-(d+_))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Hs.set(i[0],i[1],i[2]).length();const o=Hs.set(i[4],i[5],i[6]).length(),l=Hs.set(i[8],i[9],i[10]).length();s<0&&(a=-a),Zn.copy(this);const c=1/a,u=1/o,h=1/l;return Zn.elements[0]*=c,Zn.elements[1]*=c,Zn.elements[2]*=c,Zn.elements[4]*=u,Zn.elements[5]*=u,Zn.elements[6]*=u,Zn.elements[8]*=h,Zn.elements[9]*=h,Zn.elements[10]*=h,t.setFromRotationMatrix(Zn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,s,a,o=Bn,l=!1){const c=this.elements,u=2*s/(t-e),h=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let m,_;if(l)m=s/(a-s),_=a*s/(a-s);else if(o===Bn)m=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Ds)m=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=Bn,l=!1){const c=this.elements,u=2/(t-e),h=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let m,_;if(l)m=1/(a-s),_=a/(a-s);else if(o===Bn)m=-2/(a-s),_=-(a+s)/(a-s);else if(o===Ds)m=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Sl.prototype.isMatrix4=!0;let st=Sl;const Hs=new I,Zn=new st,qg=new I(0,0,0),Yg=new I(1,1,1),Hi=new I,Ia=new I,Nn=new I,Ud=new st,Nd=new pn;class si{constructor(e=0,t=0,n=0,i=si.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(rt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-rt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Ie("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ud.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ud,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Nd.setFromEuler(this),this.setFromQuaternion(Nd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}si.DEFAULT_ORDER="XYZ";class Ol{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Zg=0;const Fd=new I,Ws=new pn,Ti=new st,Pa=new I,Rr=new I,Kg=new I,Jg=new pn,Od=new I(1,0,0),kd=new I(0,1,0),Bd=new I(0,0,1),zd={type:"added"},jg={type:"removed"},Xs={type:"childadded",child:null},dc={type:"childremoved",child:null};class yt extends ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zg++}),this.uuid=Vn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new I,t=new si,n=new pn,i=new I(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new st},normalMatrix:{value:new ot}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ol,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ws.setFromAxisAngle(e,t),this.quaternion.multiply(Ws),this}rotateOnWorldAxis(e,t){return Ws.setFromAxisAngle(e,t),this.quaternion.premultiply(Ws),this}rotateX(e){return this.rotateOnAxis(Od,e)}rotateY(e){return this.rotateOnAxis(kd,e)}rotateZ(e){return this.rotateOnAxis(Bd,e)}translateOnAxis(e,t){return Fd.copy(e).applyQuaternion(this.quaternion),this.position.add(Fd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Od,e)}translateY(e){return this.translateOnAxis(kd,e)}translateZ(e){return this.translateOnAxis(Bd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Pa.copy(e):Pa.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(Rr,Pa,this.up):Ti.lookAt(Pa,Rr,this.up),this.quaternion.setFromRotationMatrix(Ti),i&&(Ti.extractRotation(i.matrixWorld),Ws.setFromRotationMatrix(Ti),this.quaternion.premultiply(Ws.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ye("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zd),Xs.child=e,this.dispatchEvent(Xs),Xs.child=null):Ye("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(jg),dc.child=e,this.dispatchEvent(dc),dc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zd),Xs.child=e,this.dispatchEvent(Xs),Xs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rr,e,Kg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rr,Jg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}yt.DEFAULT_UP=new I(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class fr extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qg={type:"move"};class Ao{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),p=this._getHandJoint(c,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Qg)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new fr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const op={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},La={h:0,s:0,l:0};function hc(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Fe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=En){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,_t.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=_t.workingColorSpace){return this.r=e,this.g=t,this.b=n,_t.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=_t.workingColorSpace){if(e=Vu(e,1),t=rt(t,0,1),n=rt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=hc(a,s,e+1/3),this.g=hc(a,s,e),this.b=hc(a,s,e-1/3)}return _t.colorSpaceToWorking(this,i),this}setStyle(e,t=En){function n(s){s!==void 0&&parseFloat(s)<1&&Ie("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ie("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ie("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=En){const n=op[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ie("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}copyLinearToSRGB(e){return this.r=pr(e.r),this.g=pr(e.g),this.b=pr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=En){return _t.workingToColorSpace(dn.copy(this),e),Math.round(rt(dn.r*255,0,255))*65536+Math.round(rt(dn.g*255,0,255))*256+Math.round(rt(dn.b*255,0,255))}getHexString(e=En){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_t.workingColorSpace){_t.workingToColorSpace(dn.copy(this),t);const n=dn.r,i=dn.g,s=dn.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=_t.workingColorSpace){return _t.workingToColorSpace(dn.copy(this),t),e.r=dn.r,e.g=dn.g,e.b=dn.b,e}getStyle(e=En){_t.workingToColorSpace(dn.copy(this),e);const t=dn.r,n=dn.g,i=dn.b;return e!==En?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Wi),this.setHSL(Wi.h+e,Wi.s+t,Wi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Wi),e.getHSL(La);const n=ea(Wi.h,La.h,t),i=ea(Wi.s,La.s,t),s=ea(Wi.l,La.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const dn=new Fe;Fe.NAMES=op;class kl{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Fe(e),this.density=t}clone(){return new kl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Bl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Fe(e),this.near=t,this.far=n}clone(){return new Bl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Hu extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new si,this.environmentIntensity=1,this.environmentRotation=new si,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Kn=new I,Ai=new I,fc=new I,Ci=new I,$s=new I,qs=new I,Vd=new I,pc=new I,mc=new I,gc=new I,_c=new xt,vc=new xt,xc=new xt;class An{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Kn.subVectors(e,t),i.cross(Kn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Kn.subVectors(i,t),Ai.subVectors(n,t),fc.subVectors(e,t);const a=Kn.dot(Kn),o=Kn.dot(Ai),l=Kn.dot(fc),c=Ai.dot(Ai),u=Ai.dot(fc),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,m=(a*u-o*l)*d;return s.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ci)===null?!1:Ci.x>=0&&Ci.y>=0&&Ci.x+Ci.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,Ci)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ci.x),l.addScaledVector(a,Ci.y),l.addScaledVector(o,Ci.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return _c.setScalar(0),vc.setScalar(0),xc.setScalar(0),_c.fromBufferAttribute(e,t),vc.fromBufferAttribute(e,n),xc.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(_c,s.x),a.addScaledVector(vc,s.y),a.addScaledVector(xc,s.z),a}static isFrontFacing(e,t,n,i){return Kn.subVectors(n,t),Ai.subVectors(e,t),Kn.cross(Ai).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kn.subVectors(this.c,this.b),Ai.subVectors(this.a,this.b),Kn.cross(Ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return An.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return An.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return An.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return An.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return An.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;$s.subVectors(i,n),qs.subVectors(s,n),pc.subVectors(e,n);const l=$s.dot(pc),c=qs.dot(pc);if(l<=0&&c<=0)return t.copy(n);mc.subVectors(e,i);const u=$s.dot(mc),h=qs.dot(mc);if(u>=0&&h<=u)return t.copy(i);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector($s,a);gc.subVectors(e,s);const f=$s.dot(gc),m=qs.dot(gc);if(m>=0&&f<=m)return t.copy(s);const _=f*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(qs,o);const g=u*m-f*h;if(g<=0&&h-u>=0&&f-m>=0)return Vd.subVectors(s,i),o=(h-u)/(h-u+(f-m)),t.copy(i).addScaledVector(Vd,o);const p=1/(g+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector($s,a).addScaledVector(qs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Kt{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Jn):Jn.fromBufferAttribute(s,a),Jn.applyMatrix4(e.matrixWorld),this.expandByPoint(Jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Da.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Da.copy(n.boundingBox)),Da.applyMatrix4(e.matrixWorld),this.union(Da)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jn),Jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ir),Ua.subVectors(this.max,Ir),Ys.subVectors(e.a,Ir),Zs.subVectors(e.b,Ir),Ks.subVectors(e.c,Ir),Xi.subVectors(Zs,Ys),$i.subVectors(Ks,Zs),us.subVectors(Ys,Ks);let t=[0,-Xi.z,Xi.y,0,-$i.z,$i.y,0,-us.z,us.y,Xi.z,0,-Xi.x,$i.z,0,-$i.x,us.z,0,-us.x,-Xi.y,Xi.x,0,-$i.y,$i.x,0,-us.y,us.x,0];return!yc(t,Ys,Zs,Ks,Ua)||(t=[1,0,0,0,1,0,0,0,1],!yc(t,Ys,Zs,Ks,Ua))?!1:(Na.crossVectors(Xi,$i),t=[Na.x,Na.y,Na.z],yc(t,Ys,Zs,Ks,Ua))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ri=[new I,new I,new I,new I,new I,new I,new I,new I],Jn=new I,Da=new Kt,Ys=new I,Zs=new I,Ks=new I,Xi=new I,$i=new I,us=new I,Ir=new I,Ua=new I,Na=new I,ds=new I;function yc(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){ds.fromArray(r,s);const o=i.x*Math.abs(ds.x)+i.y*Math.abs(ds.y)+i.z*Math.abs(ds.z),l=e.dot(ds),c=t.dot(ds),u=n.dot(ds);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Di=e_();function e_(){const r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,s[l]=c|u}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}function wn(r){Math.abs(r)>65504&&Ie("DataUtils.toHalfFloat(): Value out of range."),r=rt(r,-65504,65504),Di.floatView[0]=r;const e=Di.uint32View[0],t=e>>23&511;return Di.baseTable[t]+((e&8388607)>>Di.shiftTable[t])}function Hr(r){const e=r>>10;return Di.uint32View[0]=Di.mantissaTable[Di.offsetTable[e]+(r&1023)]+Di.exponentTable[e],Di.floatView[0]}class t_{static toHalfFloat(e){return wn(e)}static fromHalfFloat(e){return Hr(e)}}const Xt=new I,Fa=new de;let n_=0;class Rt extends ri{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:n_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=da,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Fa.fromBufferAttribute(this,t),Fa.applyMatrix3(e),this.setXY(t,Fa.x,Fa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix3(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix4(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.applyNormalMatrix(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.transformDirection(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=vn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=vn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=vn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=vn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=vn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==da&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class i_ extends Rt{constructor(e,t,n){super(new Int8Array(e),t,n)}}class s_ extends Rt{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class r_ extends Rt{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class a_ extends Rt{constructor(e,t,n){super(new Int16Array(e),t,n)}}class Wu extends Rt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class o_ extends Rt{constructor(e,t,n){super(new Int32Array(e),t,n)}}class Xu extends Rt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class l_ extends Rt{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=Hr(this.array[e*this.itemSize]);return this.normalized&&(t=vn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=wn(t),this}getY(e){let t=Hr(this.array[e*this.itemSize+1]);return this.normalized&&(t=vn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=wn(t),this}getZ(e){let t=Hr(this.array[e*this.itemSize+2]);return this.normalized&&(t=vn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=wn(t),this}getW(e){let t=Hr(this.array[e*this.itemSize+3]);return this.normalized&&(t=vn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=wn(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.array[e+0]=wn(t),this.array[e+1]=wn(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.array[e+0]=wn(t),this.array[e+1]=wn(n),this.array[e+2]=wn(i),this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.array[e+0]=wn(t),this.array[e+1]=wn(n),this.array[e+2]=wn(i),this.array[e+3]=wn(s),this}}class Ge extends Rt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const c_=new Kt,Pr=new I,bc=new I;class Jt{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):c_.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Pr.subVectors(e,this.center);const t=Pr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Pr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(bc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Pr.copy(e.center).add(bc)),this.expandByPoint(Pr.copy(e.center).sub(bc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let u_=0;const Xn=new st,Mc=new yt,Js=new I,Fn=new Kt,Lr=new Kt,en=new I;class ct extends ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:u_++}),this.uuid=Vn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(yg(e)?Xu:Wu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ot().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Xn.makeRotationFromQuaternion(e),this.applyMatrix4(Xn),this}rotateX(e){return Xn.makeRotationX(e),this.applyMatrix4(Xn),this}rotateY(e){return Xn.makeRotationY(e),this.applyMatrix4(Xn),this}rotateZ(e){return Xn.makeRotationZ(e),this.applyMatrix4(Xn),this}translate(e,t,n){return Xn.makeTranslation(e,t,n),this.applyMatrix4(Xn),this}scale(e,t,n){return Xn.makeScale(e,t,n),this.applyMatrix4(Xn),this}lookAt(e){return Mc.lookAt(e),Mc.updateMatrix(),this.applyMatrix4(Mc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Js).negate(),this.translate(Js.x,Js.y,Js.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ge(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Ie("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Fn.setFromBufferAttribute(s),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,Fn.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,Fn.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(Fn.min),this.boundingBox.expandByPoint(Fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ye('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(Fn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Lr.setFromBufferAttribute(o),this.morphTargetsRelative?(en.addVectors(Fn.min,Lr.min),Fn.expandByPoint(en),en.addVectors(Fn.max,Lr.max),Fn.expandByPoint(en)):(Fn.expandByPoint(Lr.min),Fn.expandByPoint(Lr.max))}Fn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)en.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(en));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)en.fromBufferAttribute(o,c),l&&(Js.fromBufferAttribute(e,c),en.add(Js)),i=Math.max(i,n.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Ye('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ye("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Rt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let b=0;b<n.count;b++)o[b]=new I,l[b]=new I;const c=new I,u=new I,h=new I,d=new de,f=new de,m=new de,_=new I,g=new I;function p(b,E,P){c.fromBufferAttribute(n,b),u.fromBufferAttribute(n,E),h.fromBufferAttribute(n,P),d.fromBufferAttribute(s,b),f.fromBufferAttribute(s,E),m.fromBufferAttribute(s,P),u.sub(c),h.sub(c),f.sub(d),m.sub(d);const D=1/(f.x*m.y-m.x*f.y);isFinite(D)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(D),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(D),o[b].add(_),o[E].add(_),o[P].add(_),l[b].add(g),l[E].add(g),l[P].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let b=0,E=v.length;b<E;++b){const P=v[b],D=P.start,V=P.count;for(let J=D,K=D+V;J<K;J+=3)p(e.getX(J+0),e.getX(J+1),e.getX(J+2))}const x=new I,y=new I,w=new I,M=new I;function A(b){w.fromBufferAttribute(i,b),M.copy(w);const E=o[b];x.copy(E),x.sub(w.multiplyScalar(w.dot(E))).normalize(),y.crossVectors(M,E);const D=y.dot(l[b])<0?-1:1;a.setXYZW(b,x.x,x.y,x.z,D)}for(let b=0,E=v.length;b<E;++b){const P=v[b],D=P.start,V=P.count;for(let J=D,K=D+V;J<K;J+=3)A(e.getX(J+0)),A(e.getX(J+1)),A(e.getX(J+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Rt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new I,s=new I,a=new I,o=new I,l=new I,c=new I,u=new I,h=new I;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)en.fromBufferAttribute(e,t),en.normalize(),e.setXYZ(t,en.x,en.y,en.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,m=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*u;for(let p=0;p<u;p++)d[m++]=c[f++]}return new Rt(d,u,h)}if(this.index===null)return Ie("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ct,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zl{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=da,this.updateRanges=[],this.version=0,this.uuid=Vn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const mn=new I;class zn{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix4(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyNormalMatrix(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.transformDirection(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=vn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=vn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=vn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=vn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=vn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){fa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Rt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new zn(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){fa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let d_=0;class sn extends ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:d_++}),this.uuid=Vn(),this.name="",this.type="Material",this.blending=Cs,this.side=Fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Io,this.blendDst=Po,this.blendEquation=Ji,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Fe(0,0,0),this.blendAlpha=0,this.depthFunc=Ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ms,this.stencilZFail=Ms,this.stencilZPass=Ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ie(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ie(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Cs&&(n.blending=this.blending),this.side!==Fi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Io&&(n.blendSrc=this.blendSrc),this.blendDst!==Po&&(n.blendDst=this.blendDst),this.blendEquation!==Ji&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ls&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==uu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ms&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ms&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ms&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class $u extends sn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Fe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let js;const Dr=new I,Qs=new I,er=new I,tr=new de,Ur=new de,lp=new st,Oa=new I,Nr=new I,ka=new I,Gd=new de,Sc=new de,Hd=new de;class cp extends yt{constructor(e=new $u){if(super(),this.isSprite=!0,this.type="Sprite",js===void 0){js=new ct;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new zl(t,5);js.setIndex([0,1,2,0,2,3]),js.setAttribute("position",new zn(n,3,0,!1)),js.setAttribute("uv",new zn(n,2,3,!1))}this.geometry=js,this.material=e,this.center=new de(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ye('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Qs.setFromMatrixScale(this.matrixWorld),lp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),er.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Qs.multiplyScalar(-er.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;Ba(Oa.set(-.5,-.5,0),er,a,Qs,i,s),Ba(Nr.set(.5,-.5,0),er,a,Qs,i,s),Ba(ka.set(.5,.5,0),er,a,Qs,i,s),Gd.set(0,0),Sc.set(1,0),Hd.set(1,1);let o=e.ray.intersectTriangle(Oa,Nr,ka,!1,Dr);if(o===null&&(Ba(Nr.set(-.5,.5,0),er,a,Qs,i,s),Sc.set(0,1),o=e.ray.intersectTriangle(Oa,ka,Nr,!1,Dr),o===null))return;const l=e.ray.origin.distanceTo(Dr);l<e.near||l>e.far||t.push({distance:l,point:Dr.clone(),uv:An.getInterpolation(Dr,Oa,Nr,ka,Gd,Sc,Hd,new de),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ba(r,e,t,n,i,s){tr.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Ur.x=s*tr.x-i*tr.y,Ur.y=i*tr.x+s*tr.y):Ur.copy(tr),r.copy(e),r.x+=Ur.x,r.y+=Ur.y,r.applyMatrix4(lp)}const za=new I,Wd=new I;class up extends yt{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const s=t[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let s;for(s=0;s<i.length&&!(t<i[s].distance);s++);return i.splice(s,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let s=t[n].distance;if(t[n].object.visible&&(s-=s*t[n].hysteresis),e<s)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){za.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(za);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){za.setFromMatrixPosition(e.matrixWorld),Wd.setFromMatrixPosition(this.matrixWorld);const n=za.distanceTo(Wd)/e.zoom;t[0].object.visible=!0;let i,s;for(i=1,s=t.length;i<s;i++){let a=t[i].distance;if(t[i].object.visible&&(a-=a*t[i].hysteresis),n>=a)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const a=n[i];t.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return t}}const Ii=new I,wc=new I,Va=new I,qi=new I,Ec=new I,Ga=new I,Tc=new I;class Sr{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ii)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ii.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ii.copy(this.origin).addScaledVector(this.direction,t),Ii.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){wc.copy(e).add(t).multiplyScalar(.5),Va.copy(t).sub(e).normalize(),qi.copy(this.origin).sub(wc);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Va),o=qi.dot(this.direction),l=-qi.dot(Va),c=qi.lengthSq(),u=Math.abs(1-a*a);let h,d,f,m;if(u>0)if(h=a*l-o,d=a*o-l,m=s*u,h>=0)if(d>=-m)if(d<=m){const _=1/u;h*=_,d*=_,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-m?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=m?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(wc).addScaledVector(Va,d),f}intersectSphere(e,t){Ii.subVectors(e.center,this.origin);const n=Ii.dot(this.direction),i=Ii.dot(Ii)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ii)!==null}intersectTriangle(e,t,n,i,s){Ec.subVectors(t,e),Ga.subVectors(n,e),Tc.crossVectors(Ec,Ga);let a=this.direction.dot(Tc),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;qi.subVectors(this.origin,e);const l=o*this.direction.dot(Ga.crossVectors(qi,Ga));if(l<0)return null;const c=o*this.direction.dot(Ec.cross(qi));if(c<0||l+c>a)return null;const u=-o*qi.dot(Tc);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tn extends sn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=ba,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Xd=new st,hs=new Sr,Ha=new Jt,$d=new I,Wa=new I,Xa=new I,$a=new I,Ac=new I,qa=new I,qd=new I,Ya=new I;class At extends yt{constructor(e=new ct,t=new tn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){qa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Ac.fromBufferAttribute(h,e),a?qa.addScaledVector(Ac,u):qa.addScaledVector(Ac.sub(t),u))}t.add(qa)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ha.copy(n.boundingSphere),Ha.applyMatrix4(s),hs.copy(e.ray).recast(e.near),!(Ha.containsPoint(hs.origin)===!1&&(hs.intersectSphere(Ha,$d)===null||hs.origin.distanceToSquared($d)>(e.far-e.near)**2))&&(Xd.copy(s).invert(),hs.copy(e.ray).applyMatrix4(Xd),!(n.boundingBox!==null&&hs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,hs)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],v=Math.max(g.start,f.start),x=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let y=v,w=x;y<w;y+=3){const M=o.getX(y),A=o.getX(y+1),b=o.getX(y+2);i=Za(this,p,e,n,c,u,h,M,A,b),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const v=o.getX(g),x=o.getX(g+1),y=o.getX(g+2);i=Za(this,a,e,n,c,u,h,v,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],v=Math.max(g.start,f.start),x=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=v,w=x;y<w;y+=3){const M=y,A=y+1,b=y+2;i=Za(this,p,e,n,c,u,h,M,A,b),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const v=g,x=g+1,y=g+2;i=Za(this,a,e,n,c,u,h,v,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function h_(r,e,t,n,i,s,a,o){let l;if(e.side===bn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===Fi,o),l===null)return null;Ya.copy(o),Ya.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Ya);return c<t.near||c>t.far?null:{distance:c,point:Ya.clone(),object:r}}function Za(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,Wa),r.getVertexPosition(l,Xa),r.getVertexPosition(c,$a);const u=h_(r,e,t,n,Wa,Xa,$a,qd);if(u){const h=new I;An.getBarycoord(qd,Wa,Xa,$a,h),i&&(u.uv=An.getInterpolatedAttribute(i,o,l,c,h,new de)),s&&(u.uv1=An.getInterpolatedAttribute(s,o,l,c,h,new de)),a&&(u.normal=An.getInterpolatedAttribute(a,o,l,c,h,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new I,materialIndex:0};An.getNormal(Wa,Xa,$a,d.normal),u.face=d,u.barycoord=h}return u}const Fr=new xt,Yd=new xt,Zd=new xt,f_=new xt,Kd=new st,Ka=new I,Cc=new Jt,Jd=new st,Rc=new Sr;class dp extends At{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=lu,this.bindMatrix=new st,this.bindMatrixInverse=new st,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Kt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ka),this.boundingBox.expandByPoint(Ka)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Jt),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ka),this.boundingSphere.expandByPoint(Ka)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cc.copy(this.boundingSphere),Cc.applyMatrix4(i),e.ray.intersectsSphere(Cc)!==!1&&(Jd.copy(i).invert(),Rc.copy(e.ray).applyMatrix4(Jd),!(this.boundingBox!==null&&Rc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Rc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new xt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===lu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Xf?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ie("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Yd.fromBufferAttribute(i.attributes.skinIndex,e),Zd.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Fr.copy(t),t.set(0,0,0,0)):(Fr.set(...t,1),t.set(0,0,0)),Fr.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const a=Zd.getComponent(s);if(a!==0){const o=Yd.getComponent(s);Kd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(f_.copy(Fr).applyMatrix4(Kd),a)}}return t.isVector4&&(t.w=Fr.w),t.applyMatrix4(this.bindMatrixInverse)}}class qu extends yt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class ii extends Ft{constructor(e=null,t=1,n=1,i,s,a,o,l,c=Wt,u=Wt,h,d){super(null,a,o,l,c,u,i,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const jd=new st,p_=new st;class Vl{constructor(e=[],t=[]){this.uuid=Vn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ie("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new st)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new st;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:p_;jd.multiplyMatrices(o,t[s]),jd.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Vl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new ii(t,e,e,yn,xn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(Ie("Skeleton: No bone found with UUID:",s),a=new qu),this.bones.push(a),this.boneInverses.push(new st().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class xr extends Rt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const nr=new st,Qd=new st,Ja=[],eh=new Kt,m_=new st,Or=new At,kr=new Jt;class hp extends At{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new xr(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,m_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Kt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,nr),eh.copy(e.boundingBox).applyMatrix4(nr),this.boundingBox.union(eh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Jt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,nr),kr.copy(e.boundingSphere).applyMatrix4(nr),this.boundingSphere.union(kr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Or.geometry=this.geometry,Or.material=this.material,Or.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),kr.copy(this.boundingSphere),kr.applyMatrix4(n),e.ray.intersectsSphere(kr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,nr),Qd.multiplyMatrices(n,nr),Or.matrixWorld=Qd,Or.raycast(e,Ja);for(let a=0,o=Ja.length;a<o;a++){const l=Ja[a];l.instanceId=s,l.object=this,t.push(l)}Ja.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new xr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ii(new Float32Array(i*this.count),i,this.count,Rl,xn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ic=new I,g_=new I,__=new ot;class Ki{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Ic.subVectors(n,t).cross(g_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(Ic),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||__.getNormalMatrix(e),i=this.coplanarPoint(Ic).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fs=new Jt,v_=new de(.5,.5),ja=new I;class wr{constructor(e=new Ki,t=new Ki,n=new Ki,i=new Ki,s=new Ki,a=new Ki){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Bn,n=!1){const i=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],d=s[6],f=s[7],m=s[8],_=s[9],g=s[10],p=s[11],v=s[12],x=s[13],y=s[14],w=s[15];if(i[0].setComponents(c-a,f-u,p-m,w-v).normalize(),i[1].setComponents(c+a,f+u,p+m,w+v).normalize(),i[2].setComponents(c+o,f+h,p+_,w+x).normalize(),i[3].setComponents(c-o,f-h,p-_,w-x).normalize(),n)i[4].setComponents(l,d,g,y).normalize(),i[5].setComponents(c-l,f-d,p-g,w-y).normalize();else if(i[4].setComponents(c-l,f-d,p-g,w-y).normalize(),t===Bn)i[5].setComponents(c+l,f+d,p+g,w+y).normalize();else if(t===Ds)i[5].setComponents(l,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),fs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),fs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(fs)}intersectsSprite(e){fs.center.set(0,0,0);const t=v_.distanceTo(e.center);return fs.radius=.7071067811865476+t,fs.applyMatrix4(e.matrixWorld),this.intersectsSphere(fs)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(ja.x=i.normal.x>0?e.max.x:e.min.x,ja.y=i.normal.y>0?e.max.y:e.min.y,ja.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ja)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const ci=new st,ui=new wr;class Gl{constructor(){this.coordinateSystem=Bn}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(ci.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),ui.setFromProjectionMatrix(ci,i.coordinateSystem,i.reversedDepth),ui.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(ci.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),ui.setFromProjectionMatrix(ci,i.coordinateSystem,i.reversedDepth),ui.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(ci.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),ui.setFromProjectionMatrix(ci,i.coordinateSystem,i.reversedDepth),ui.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(ci.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),ui.setFromProjectionMatrix(ci,i.coordinateSystem,i.reversedDepth),ui.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if(ci.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),ui.setFromProjectionMatrix(ci,i.coordinateSystem,i.reversedDepth),ui.containsPoint(e))return!0}return!1}clone(){return new Gl}}function Pc(r,e){return r-e}function x_(r,e){return r.z-e.z}function y_(r,e){return e.z-r.z}class b_{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){const s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});const o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}}const Sn=new st,M_=new Fe(1,1,1),th=new wr,S_=new Gl,Qa=new Kt,ps=new Jt,Br=new I,nh=new I,w_=new I,Lc=new b_,hn=new At,eo=[];function E_(r,e,t=0){const n=e.itemSize;if(r.isInterleavedBufferAttribute||r.array.constructor!==e.array.constructor){const i=r.count;for(let s=0;s<i;s++)for(let a=0;a<n;a++)e.setComponent(s+t,a,r.getComponent(s,a))}else e.array.set(r.array,t*n);e.needsUpdate=!0}function ms(r,e){if(r.constructor!==e.constructor){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++)e[n]=r[n]}else{const t=Math.min(r.length,e.length);e.set(new r.constructor(r.buffer,0,t))}}class fp extends At{constructor(e,t,n=t*2,i){super(new ct,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new ii(t,e,e,yn,xn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new ii(t,e,e,Ma,$n);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new ii(t,e,e,yn,xn);n.colorSpace=_t.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in e.attributes){const a=e.getAttribute(s),{array:o,itemSize:l,normalized:c}=a,u=new o.constructor(n*l),h=new Rt(u,l,c);t.setAttribute(s,h)}if(e.getIndex()!==null){const s=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Rt(s,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=e.getAttribute(n),s=t.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){const t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){const t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kt);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,Sn),this.getBoundingBoxAt(s,Qa).applyMatrix4(Sn),e.union(Qa)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jt);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,Sn),this.getBoundingSphereAt(s,ps).applyMatrix4(Sn),e.union(ps)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Pc),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const s=this._matricesTexture;Sn.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;const a=this._colorsTexture;return a&&(M_.toArray(a.image.data,i*4),a.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const a=e.getIndex();if(a!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?a.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Pc),l=this._availableGeometryIds.shift(),s[l]=i):(l=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),a=t.getIndex(),o=this._geometryInfo[e];if(i&&a.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");const l=o.vertexStart,c=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(const u in n.attributes){const h=t.getAttribute(u),d=n.getAttribute(u);E_(h,d,l);const f=h.itemSize;for(let m=h.count,_=c;m<_;m++){const g=l+m;for(let p=0;p<f;p++)d.setComponent(g,p,0)}d.needsUpdate=!0,d.addUpdateRange(l*f,c*f)}if(i){const u=o.indexStart,h=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let d=0;d<a.count;d++)s.setX(u+d,l+a.getX(d));for(let d=a.count,f=h;d<f;d++)s.setX(u+d,l);s.needsUpdate=!0,s.addUpdateRange(u,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0;const n=this._geometryInfo,i=n.map((a,o)=>o).sort((a,o)=>n[a].vertexStart-n[o].vertexStart),s=this.geometry;for(let a=0,o=n.length;a<o;a++){const l=i[a],c=n[l];if(c.active!==!1){if(s.index!==null){if(c.indexStart!==t){const{indexStart:u,vertexStart:h,reservedIndexCount:d}=c,f=s.index,m=f.array,_=e-h;for(let g=u;g<u+d;g++)m[g]=m[g]+_;f.array.copyWithin(t,u,u+d),f.addUpdateRange(t,d),f.needsUpdate=!0,c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){const{vertexStart:u,reservedVertexCount:h}=c,d=s.attributes;for(const f in d){const m=d[f],{array:_,itemSize:g}=m;_.copyWithin(e*g,u*g,(u+h)*g),m.addUpdateRange(e*g,h*g),m.needsUpdate=!0}c.vertexStart=e}e+=c.reservedVertexCount,c.start=s.index?c.indexStart:c.vertexStart}}return this._nextIndexStart=t,this._nextVertexStart=e,this._visibilityChanged=!0,this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){const s=new Kt,a=n.index,o=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let u=l;a&&(u=a.getX(u)),s.expandByPoint(Br.fromBufferAttribute(o,u))}i.boundingBox=s}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){const s=new Jt;this.getBoundingBoxAt(e,Qa),Qa.getCenter(s.center);const a=n.index,o=n.attributes.position;let l=0;for(let c=i.start,u=i.start+i.count;c<u;c++){let h=c;a&&(h=a.getX(h)),Br.fromBufferAttribute(o,h),l=Math.max(l,s.center.distanceToSquared(Br))}s.radius=Math.sqrt(l),i.boundingSphere=s}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);const n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null?t.isVector4?t.set(1,1,1,1):t.setRGB(1,1,1):t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(Pc);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const i=new Int32Array(e),s=new Int32Array(e);ms(this._multiDrawCounts,i),ms(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=e;const a=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),ms(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),ms(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),ms(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const s=this.geometry;s.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new ct,this._initializeGeometry(s));const a=this.geometry;s.index&&ms(s.index.array,a.index.array);for(const o in s.attributes)ms(s.attributes[o].array,a.attributes[o].array)}raycast(e,t){const n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,a=this.geometry;hn.material=this.material,hn.geometry.index=a.index,hn.geometry.attributes=a.attributes,hn.geometry.boundingBox===null&&(hn.geometry.boundingBox=new Kt),hn.geometry.boundingSphere===null&&(hn.geometry.boundingSphere=new Jt);for(let o=0,l=n.length;o<l;o++){if(!n[o].visible||!n[o].active)continue;const c=n[o].geometryIndex,u=i[c];hn.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(o,hn.matrixWorld).premultiply(s),this.getBoundingBoxAt(c,hn.geometry.boundingBox),this.getBoundingSphereAt(c,hn.geometry.boundingSphere),hn.raycast(e,eo);for(let h=0,d=eo.length;h<d;h++){const f=eo[h];f.object=this,f.batchId=o,t.push(f)}eo.length=0}hn.material=null,hn.geometry.index=null,hn.geometry.attributes={},hn.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const a=i.getIndex();let o=a===null?1:a.array.BYTES_PER_ELEMENT,l=1;s.wireframe&&(l=2,o=i.attributes.position.count>65535?4:2);const c=this._instanceInfo,u=this._multiDrawStarts,h=this._multiDrawCounts,d=this._geometryInfo,f=this.perObjectFrustumCulled,m=this._indirectTexture,_=m.image.data,g=n.isArrayCamera?S_:th;f&&!n.isArrayCamera&&(Sn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),th.setFromProjectionMatrix(Sn,n.coordinateSystem,n.reversedDepth));let p=0;if(this.sortObjects){Sn.copy(this.matrixWorld).invert(),Br.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Sn),nh.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(Sn);for(let y=0,w=c.length;y<w;y++)if(c[y].visible&&c[y].active){const M=c[y].geometryIndex;this.getMatrixAt(y,Sn),this.getBoundingSphereAt(M,ps).applyMatrix4(Sn);let A=!1;if(f&&(A=!g.intersectsSphere(ps,n)),!A){const b=d[M],E=w_.subVectors(ps.center,Br).dot(nh);Lc.push(b.start,b.count,E,y)}}const v=Lc.list,x=this.customSort;x===null?v.sort(s.transparent?y_:x_):x.call(this,v,n);for(let y=0,w=v.length;y<w;y++){const M=v[y];u[p]=M.start*o*l,h[p]=M.count*l,_[p]=M.index,p++}Lc.reset()}else for(let v=0,x=c.length;v<x;v++)if(c[v].visible&&c[v].active){const y=c[v].geometryIndex;let w=!1;if(f&&(this.getMatrixAt(v,Sn),this.getBoundingSphereAt(y,ps).applyMatrix4(Sn),w=!g.intersectsSphere(ps,n)),!w){const M=d[y];u[p]=M.start*o*l,h[p]=M.count*l,_[p]=v,p++}}m.needsUpdate=!0,this._multiDrawCount=p,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,s,a){this.onBeforeRender(e,null,i,s,a)}}class Mn extends sn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const vl=new I,xl=new I,ih=new st,zr=new Sr,to=new Jt,Dc=new I,sh=new I;class ss extends yt{constructor(e=new ct,t=new Mn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)vl.fromBufferAttribute(t,i-1),xl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=vl.distanceTo(xl);e.setAttribute("lineDistance",new Ge(n,1))}else Ie("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),to.copy(n.boundingSphere),to.applyMatrix4(i),to.radius+=s,e.ray.intersectsSphere(to)===!1)return;ih.copy(i).invert(),zr.copy(e.ray).applyMatrix4(ih);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=c){const p=u.getX(_),v=u.getX(_+1),x=no(this,e,zr,l,p,v,_);x&&t.push(x)}if(this.isLineLoop){const _=u.getX(m-1),g=u.getX(f),p=no(this,e,zr,l,_,g,m-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=c){const p=no(this,e,zr,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=no(this,e,zr,l,m-1,f,m-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function no(r,e,t,n,i,s,a){const o=r.geometry.attributes.position;if(vl.fromBufferAttribute(o,i),xl.fromBufferAttribute(o,s),t.distanceSqToSegment(vl,xl,Dc,sh)>n)return;Dc.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Dc);if(!(c<e.near||c>e.far))return{distance:c,point:sh.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const rh=new I,ah=new I;class wi extends ss{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)rh.fromBufferAttribute(t,i),ah.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+rh.distanceTo(ah);e.setAttribute("lineDistance",new Ge(n,1))}else Ie("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class pp extends ss{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Yu extends sn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const oh=new st,hu=new Sr,io=new Jt,so=new I;class mp extends yt{constructor(e=new ct,t=new Yu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),io.copy(n.boundingSphere),io.applyMatrix4(i),io.radius+=s,e.ray.intersectsSphere(io)===!1)return;oh.copy(i).invert(),hu.copy(e.ray).applyMatrix4(oh);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=d,_=f;m<_;m++){const g=c.getX(m);so.fromBufferAttribute(h,g),lh(so,g,l,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let m=d,_=f;m<_;m++)so.fromBufferAttribute(h,m),lh(so,m,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function lh(r,e,t,n,i,s,a){const o=hu.distanceSqToPoint(r);if(o<t){const l=new I;hu.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class gp extends Ft{constructor(e,t,n,i,s=Ut,a=Ut,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;const u=this;function h(){u.needsUpdate=!0,u._requestVideoFrameCallbackId=e.requestVideoFrameCallback(h)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(h))}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}}class T_ extends gp{constructor(e,t,n,i,s,a,o,l){super({},e,t,n,i,s,a,o,l),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(e){this.image=e,this.needsUpdate=!0}}class A_ extends Ft{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=Wt,this.minFilter=Wt,this.generateMipmaps=!1,this.needsUpdate=!0}}class Hl extends Ft{constructor(e,t,n,i,s,a,o,l,c,u,h,d){super(null,a,o,l,c,u,i,s,h,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class C_ extends Hl{constructor(e,t,n,i,s,a){super(e,t,n,s,a),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Rn,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class R_ extends Hl{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,bi),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class Sa extends Ft{constructor(e=[],t=bi,n,i,s,a,o,l,c,u){super(e,t,n,i,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class I_ extends Ft{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class P_ extends Ft{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;const u=e?e.parentNode:null;u!==null&&"requestPaint"in u&&(u.onpaint=()=>{this.needsUpdate=!0},u.requestPaint())}dispose(){const e=this.image?this.image.parentNode:null;e!==null&&"onpaint"in e&&(e.onpaint=null),super.dispose()}}class Us extends Ft{constructor(e,t,n=$n,i,s,a,o=Wt,l=Wt,c,u=Si,h=1){if(u!==Si&&u!==ji)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,i,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Qi(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class _p extends Us{constructor(e,t=$n,n=bi,i,s,a=Wt,o=Wt,l,c=Si){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,n,i,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Zu extends Ft{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class os extends ct{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,f=0;m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ge(c,3)),this.setAttribute("normal",new Ge(u,3)),this.setAttribute("uv",new Ge(h,2));function m(_,g,p,v,x,y,w,M,A,b,E){const P=y/A,D=w/b,V=y/2,J=w/2,K=M/2,B=A+1,H=b+1;let Y=0,pe=0;const _e=new I;for(let ye=0;ye<H;ye++){const Re=ye*D-J;for(let le=0;le<B;le++){const Ee=le*P-V;_e[_]=Ee*v,_e[g]=Re*x,_e[p]=K,c.push(_e.x,_e.y,_e.z),_e[_]=0,_e[g]=0,_e[p]=M>0?1:-1,u.push(_e.x,_e.y,_e.z),h.push(le/A),h.push(1-ye/b),Y+=1}}for(let ye=0;ye<b;ye++)for(let Re=0;Re<A;Re++){const le=d+Re+B*ye,Ee=d+Re+B*(ye+1),Be=d+(Re+1)+B*(ye+1),Le=d+(Re+1)+B*ye;l.push(le,Ee,Le),l.push(Ee,Be,Le),pe+=6}o.addGroup(f,pe,E),f+=pe,d+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new os(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Wl extends ct{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const a=[],o=[],l=[],c=[],u=t/2,h=Math.PI/2*e,d=t,f=2*h+d,m=n*2+s,_=i+1,g=new I,p=new I;for(let v=0;v<=m;v++){let x=0,y=0,w=0,M=0;if(v<=n){const E=v/n,P=E*Math.PI/2;y=-u-e*Math.cos(P),w=e*Math.sin(P),M=-e*Math.cos(P),x=E*h}else if(v<=n+s){const E=(v-n)/s;y=-u+E*t,w=e,M=0,x=h+E*d}else{const E=(v-n-s)/n,P=E*Math.PI/2;y=u+e*Math.sin(P),w=e*Math.cos(P),M=e*Math.sin(P),x=h+d+E*h}const A=Math.max(0,Math.min(1,x/f));let b=0;v===0?b=.5/i:v===m&&(b=-.5/i);for(let E=0;E<=i;E++){const P=E/i,D=P*Math.PI*2,V=Math.sin(D),J=Math.cos(D);p.x=-w*J,p.y=y,p.z=w*V,o.push(p.x,p.y,p.z),g.set(-w*J,M,w*V),g.normalize(),l.push(g.x,g.y,g.z),c.push(P+b,A)}if(v>0){const E=(v-1)*_;for(let P=0;P<i;P++){const D=E+P,V=E+P+1,J=v*_+P,K=v*_+P+1;a.push(D,V,J),a.push(V,K,J)}}}this.setIndex(a),this.setAttribute("position",new Ge(o,3)),this.setAttribute("normal",new Ge(l,3)),this.setAttribute("uv",new Ge(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wl(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Xl extends ct{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new I,u=new de;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=n+h/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Ge(a,3)),this.setAttribute("normal",new Ge(o,3)),this.setAttribute("uv",new Ge(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xl(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class wa extends ct{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],h=[],d=[],f=[];let m=0;const _=[],g=n/2;let p=0;v(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new Ge(h,3)),this.setAttribute("normal",new Ge(d,3)),this.setAttribute("uv",new Ge(f,2));function v(){const y=new I,w=new I;let M=0;const A=(t-e)/n;for(let b=0;b<=s;b++){const E=[],P=b/s,D=P*(t-e)+e;for(let V=0;V<=i;V++){const J=V/i,K=J*l+o,B=Math.sin(K),H=Math.cos(K);w.x=D*B,w.y=-P*n+g,w.z=D*H,h.push(w.x,w.y,w.z),y.set(B,A,H).normalize(),d.push(y.x,y.y,y.z),f.push(J,1-P),E.push(m++)}_.push(E)}for(let b=0;b<i;b++)for(let E=0;E<s;E++){const P=_[E][b],D=_[E+1][b],V=_[E+1][b+1],J=_[E][b+1];(e>0||E!==0)&&(u.push(P,D,J),M+=3),(t>0||E!==s-1)&&(u.push(D,V,J),M+=3)}c.addGroup(p,M,0),p+=M}function x(y){const w=m,M=new de,A=new I;let b=0;const E=y===!0?e:t,P=y===!0?1:-1;for(let V=1;V<=i;V++)h.push(0,g*P,0),d.push(0,P,0),f.push(.5,.5),m++;const D=m;for(let V=0;V<=i;V++){const K=V/i*l+o,B=Math.cos(K),H=Math.sin(K);A.x=E*H,A.y=g*P,A.z=E*B,h.push(A.x,A.y,A.z),d.push(0,P,0),M.x=B*.5+.5,M.y=H*.5*P+.5,f.push(M.x,M.y),m++}for(let V=0;V<i;V++){const J=w+V,K=D+V;y===!0?u.push(K,K+1,J):u.push(K+1,K,J),b+=3}c.addGroup(p,b,y===!0?1:2),p+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wa(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Os extends wa{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Os(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ls extends ct{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],a=[];o(i),c(n),u(),this.setAttribute("position",new Ge(s,3)),this.setAttribute("normal",new Ge(s.slice(),3)),this.setAttribute("uv",new Ge(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const x=new I,y=new I,w=new I;for(let M=0;M<t.length;M+=3)f(t[M+0],x),f(t[M+1],y),f(t[M+2],w),l(x,y,w,v)}function l(v,x,y,w){const M=w+1,A=[];for(let b=0;b<=M;b++){A[b]=[];const E=v.clone().lerp(y,b/M),P=x.clone().lerp(y,b/M),D=M-b;for(let V=0;V<=D;V++)V===0&&b===M?A[b][V]=E:A[b][V]=E.clone().lerp(P,V/D)}for(let b=0;b<M;b++)for(let E=0;E<2*(M-b)-1;E++){const P=Math.floor(E/2);E%2===0?(d(A[b][P+1]),d(A[b+1][P]),d(A[b][P])):(d(A[b][P+1]),d(A[b+1][P+1]),d(A[b+1][P]))}}function c(v){const x=new I;for(let y=0;y<s.length;y+=3)x.x=s[y+0],x.y=s[y+1],x.z=s[y+2],x.normalize().multiplyScalar(v),s[y+0]=x.x,s[y+1]=x.y,s[y+2]=x.z}function u(){const v=new I;for(let x=0;x<s.length;x+=3){v.x=s[x+0],v.y=s[x+1],v.z=s[x+2];const y=g(v)/2/Math.PI+.5,w=p(v)/Math.PI+.5;a.push(y,1-w)}m(),h()}function h(){for(let v=0;v<a.length;v+=6){const x=a[v+0],y=a[v+2],w=a[v+4],M=Math.max(x,y,w),A=Math.min(x,y,w);M>.9&&A<.1&&(x<.2&&(a[v+0]+=1),y<.2&&(a[v+2]+=1),w<.2&&(a[v+4]+=1))}}function d(v){s.push(v.x,v.y,v.z)}function f(v,x){const y=v*3;x.x=e[y+0],x.y=e[y+1],x.z=e[y+2]}function m(){const v=new I,x=new I,y=new I,w=new I,M=new de,A=new de,b=new de;for(let E=0,P=0;E<s.length;E+=9,P+=6){v.set(s[E+0],s[E+1],s[E+2]),x.set(s[E+3],s[E+4],s[E+5]),y.set(s[E+6],s[E+7],s[E+8]),M.set(a[P+0],a[P+1]),A.set(a[P+2],a[P+3]),b.set(a[P+4],a[P+5]),w.copy(v).add(x).add(y).divideScalar(3);const D=g(w);_(M,P+0,v,D),_(A,P+2,x,D),_(b,P+4,y,D)}}function _(v,x,y,w){w<0&&v.x===1&&(a[x]=v.x-1),y.x===0&&y.z===0&&(a[x]=w/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ls(e.vertices,e.indices,e.radius,e.detail)}}class $l extends ls{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new $l(e.radius,e.detail)}}const ro=new I,ao=new I,Uc=new I,oo=new An;class vp extends ct{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(Rs*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);const{a:_,b:g,c:p}=oo;if(_.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),oo.getNormal(Uc),h[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,h[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,h[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let v=0;v<3;v++){const x=(v+1)%3,y=h[v],w=h[x],M=oo[u[v]],A=oo[u[x]],b=`${y}_${w}`,E=`${w}_${y}`;E in d&&d[E]?(Uc.dot(d[E].normal)<=s&&(f.push(M.x,M.y,M.z),f.push(A.x,A.y,A.z)),d[E]=null):b in d||(d[b]={index0:c[v],index1:c[x],normal:Uc.clone()})}}for(const m in d)if(d[m]){const{index0:_,index1:g}=d[m];ro.fromBufferAttribute(o,_),ao.fromBufferAttribute(o,g),f.push(ro.x,ro.y,ro.z),f.push(ao.x,ao.y,ao.z)}this.setAttribute("position",new Ge(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class ai{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ie("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);const u=n[i],d=n[i+1]-u,f=(a-u)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new de:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new I,i=[],s=[],a=[],o=new I,l=new st;for(let f=0;f<=e;f++){const m=f/e;i[f]=this.getTangentAt(m,new I)}s[0]=new I,a[0]=new I;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),d=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(rt(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(rt(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),a[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ql extends ai{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new de){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class xp extends ql{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Ku(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,h){let d=(a-s)/c-(o-s)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+h)+(l-o)/h;d*=u,f*=u,i(a,o,d,f)},calc:function(s){const a=s*s,o=a*s;return r+e*s+t*a+n*o}}}const ch=new I,uh=new I,Nc=new Ku,Fc=new Ku,Oc=new Ku;class yp extends ai{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new I){const n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=i[(o-1)%s]:(uh.subVectors(i[0],i[1]).add(i[0]),c=uh);const h=i[o%s],d=i[(o+1)%s];if(this.closed||o+2<s?u=i[(o+2)%s]:(ch.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=ch),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(h),f),_=Math.pow(h.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(u),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),Nc.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,m,_,g),Fc.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,m,_,g),Oc.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,m,_,g)}else this.curveType==="catmullrom"&&(Nc.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),Fc.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),Oc.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return n.set(Nc.calc(l),Fc.calc(l),Oc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new I().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function dh(r,e,t,n,i){const s=(n-e)*.5,a=(i-t)*.5,o=r*r,l=r*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*r+t}function L_(r,e){const t=1-r;return t*t*e}function D_(r,e){return 2*(1-r)*r*e}function U_(r,e){return r*r*e}function ta(r,e,t,n){return L_(r,e)+D_(r,t)+U_(r,n)}function N_(r,e){const t=1-r;return t*t*t*e}function F_(r,e){const t=1-r;return 3*t*t*r*e}function O_(r,e){return 3*(1-r)*r*r*e}function k_(r,e){return r*r*r*e}function na(r,e,t,n,i){return N_(r,e)+F_(r,t)+O_(r,n)+k_(r,i)}class Ju extends ai{constructor(e=new de,t=new de,n=new de,i=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new de){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(na(e,i.x,s.x,a.x,o.x),na(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class bp extends ai{constructor(e=new I,t=new I,n=new I,i=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new I){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(na(e,i.x,s.x,a.x,o.x),na(e,i.y,s.y,a.y,o.y),na(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ju extends ai{constructor(e=new de,t=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new de){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new de){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Mp extends ai{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Qu extends ai{constructor(e=new de,t=new de,n=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new de){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(ta(e,i.x,s.x,a.x),ta(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ed extends ai{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(ta(e,i.x,s.x,a.x),ta(e,i.y,s.y,a.y),ta(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class td extends ai{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new de){const n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],u=i[a>i.length-2?i.length-1:a+1],h=i[a>i.length-3?i.length-1:a+2];return n.set(dh(o,l.x,c.x,u.x,h.x),dh(o,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new de().fromArray(i))}return this}}var yl=Object.freeze({__proto__:null,ArcCurve:xp,CatmullRomCurve3:yp,CubicBezierCurve:Ju,CubicBezierCurve3:bp,EllipseCurve:ql,LineCurve:ju,LineCurve3:Mp,QuadraticBezierCurve:Qu,QuadraticBezierCurve3:ed,SplineCurve:td});class Sp extends ai{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new yl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const a=s[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new yl[i.type]().fromJSON(i))}return this}}class bl extends Sp{constructor(e){super(),this.type="Path",this.currentPoint=new de,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new ju(this.currentPoint.clone(),new de(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new Qu(this.currentPoint.clone(),new de(e,t),new de(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){const o=new Ju(this.currentPoint.clone(),new de(e,t),new de(n,i),new de(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new td(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){const c=new ql(e,t,n,i,s,a,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Is extends bl{constructor(e){super(e),this.uuid=Vn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new bl().fromJSON(i))}return this}}function B_(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=wp(r,0,i,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=W_(r,e,s,t)),r.length>80*t){o=r[0],l=r[1];let u=o,h=l;for(let d=t;d<i;d+=t){const f=r[d],m=r[d+1];f<o&&(o=f),m<l&&(l=m),f>u&&(u=f),m>h&&(h=m)}c=Math.max(u-o,h-l),c=c!==0?32767/c:0}return pa(s,a,t,o,l,c,0),a}function wp(r,e,t,n,i){let s;if(i===t0(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=hh(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=hh(a/n|0,r[a],r[a+1],s);return s&&yr(s,s.next)&&(ga(s),s=s.next),s}function Ns(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(yr(t,t.next)||Nt(t.prev,t,t.next)===0)){if(ga(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function pa(r,e,t,n,i,s,a){if(!r)return;!a&&s&&Z_(r,n,i,s);let o=r;for(;r.prev!==r.next;){const l=r.prev,c=r.next;if(s?V_(r,n,i,s):z_(r)){e.push(l.i,r.i,c.i),ga(r),r=c.next,o=c.next;continue}if(r=c,r===o){a?a===1?(r=G_(Ns(r),e),pa(r,e,t,n,i,s,2)):a===2&&H_(r,e,t,n,i,s):pa(Ns(r),e,t,n,i,s,1);break}}}function z_(r){const e=r.prev,t=r,n=r.next;if(Nt(e,t,n)>=0)return!1;const i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(i,s,a),h=Math.min(o,l,c),d=Math.max(i,s,a),f=Math.max(o,l,c);let m=n.next;for(;m!==e;){if(m.x>=u&&m.x<=d&&m.y>=h&&m.y<=f&&Wr(i,o,s,l,a,c,m.x,m.y)&&Nt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function V_(r,e,t,n){const i=r.prev,s=r,a=r.next;if(Nt(i,s,a)>=0)return!1;const o=i.x,l=s.x,c=a.x,u=i.y,h=s.y,d=a.y,f=Math.min(o,l,c),m=Math.min(u,h,d),_=Math.max(o,l,c),g=Math.max(u,h,d),p=fu(f,m,e,t,n),v=fu(_,g,e,t,n);let x=r.prevZ,y=r.nextZ;for(;x&&x.z>=p&&y&&y.z<=v;){if(x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==i&&x!==a&&Wr(o,u,l,h,c,d,x.x,x.y)&&Nt(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=f&&y.x<=_&&y.y>=m&&y.y<=g&&y!==i&&y!==a&&Wr(o,u,l,h,c,d,y.x,y.y)&&Nt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=p;){if(x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==i&&x!==a&&Wr(o,u,l,h,c,d,x.x,x.y)&&Nt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=v;){if(y.x>=f&&y.x<=_&&y.y>=m&&y.y<=g&&y!==i&&y!==a&&Wr(o,u,l,h,c,d,y.x,y.y)&&Nt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function G_(r,e){let t=r;do{const n=t.prev,i=t.next.next;!yr(n,i)&&Tp(n,t,t.next,i)&&ma(n,i)&&ma(i,n)&&(e.push(n.i,t.i,i.i),ga(t),ga(t.next),t=r=i),t=t.next}while(t!==r);return Ns(t)}function H_(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&j_(a,o)){let l=Ap(a,o);a=Ns(a,a.next),l=Ns(l,l.next),pa(a,e,t,n,i,s,0),pa(l,e,t,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function W_(r,e,t,n){const i=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*n,l=s<a-1?e[s+1]*n:r.length,c=wp(r,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(J_(c))}i.sort(X_);for(let s=0;s<i.length;s++)t=$_(i[s],t);return t}function X_(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function $_(r,e){const t=q_(r,e);if(!t)return e;const n=Ap(t,r);return Ns(n,n.next),Ns(t,t.next)}function q_(r,e){let t=e;const n=r.x,i=r.y;let s=-1/0,a;if(yr(r,t))return t;do{if(yr(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const h=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>s&&(s=h,a=t.x<t.next.x?t:t.next,h===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Ep(i<c?n:s,i,l,c,i<c?s:n,i,t.x,t.y)){const h=Math.abs(i-t.y)/(n-t.x);ma(t,r)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&Y_(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function Y_(r,e){return Nt(r.prev,r,e.prev)<0&&Nt(e.next,r,r.next)<0}function Z_(r,e,t,n){let i=r;do i.z===0&&(i.z=fu(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,K_(i)}function K_(r){let e,t=1;do{let n=r,i;r=null;let s=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=a}s.nextZ=null,t*=2}while(e>1);return r}function fu(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function J_(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Ep(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function Wr(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&Ep(r,e,t,n,i,s,a,o)}function j_(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!Q_(r,e)&&(ma(r,e)&&ma(e,r)&&e0(r,e)&&(Nt(r.prev,r,e.prev)||Nt(r,e.prev,e))||yr(r,e)&&Nt(r.prev,r,r.next)>0&&Nt(e.prev,e,e.next)>0)}function Nt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function yr(r,e){return r.x===e.x&&r.y===e.y}function Tp(r,e,t,n){const i=co(Nt(r,e,t)),s=co(Nt(r,e,n)),a=co(Nt(t,n,r)),o=co(Nt(t,n,e));return!!(i!==s&&a!==o||i===0&&lo(r,t,e)||s===0&&lo(r,n,e)||a===0&&lo(t,r,n)||o===0&&lo(t,e,n))}function lo(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function co(r){return r>0?1:r<0?-1:0}function Q_(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Tp(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function ma(r,e){return Nt(r.prev,r,r.next)<0?Nt(r,e,r.next)>=0&&Nt(r,r.prev,e)>=0:Nt(r,e,r.prev)<0||Nt(r,r.next,e)<0}function e0(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Ap(r,e){const t=pu(r.i,r.x,r.y),n=pu(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function hh(r,e,t,n){const i=pu(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ga(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function pu(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function t0(r,e,t,n){let i=0;for(let s=e,a=t-n;s<t;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}class n0{static triangulate(e,t,n=2){return B_(e,t,n)}}class ti{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return ti.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];fh(e),ph(n,e);let a=e.length;t.forEach(fh);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,ph(n,t[l]);const o=n0.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function fh(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function ph(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class Yl extends ct{constructor(e=new Is([new de(.5,.5),new de(-.5,.5),new de(-.5,-.5),new de(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new Ge(i,3)),this.setAttribute("uv",new Ge(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:i0;let x,y=!1,w,M,A,b;if(p){x=p.getSpacedPoints(u),y=!0,d=!1;const Q=p.isCatmullRomCurve3?p.closed:!1;w=p.computeFrenetFrames(u,Q),M=new I,A=new I,b=new I}d||(g=0,f=0,m=0,_=0);const E=o.extractPoints(c);let P=E.shape;const D=E.holes;if(!ti.isClockWise(P)){P=P.reverse();for(let Q=0,Z=D.length;Q<Z;Q++){const se=D[Q];ti.isClockWise(se)&&(D[Q]=se.reverse())}}function J(Q){const se=10000000000000001e-36;let ce=Q[0];for(let he=1;he<=Q.length;he++){const qe=he%Q.length,F=Q[qe],nt=F.x-ce.x,ze=F.y-ce.y,et=nt*nt+ze*ze,ve=Math.max(Math.abs(F.x),Math.abs(F.y),Math.abs(ce.x),Math.abs(ce.y)),St=se*ve*ve;if(et<=St){Q.splice(qe,1),he--;continue}ce=F}}J(P),D.forEach(J);const K=D.length,B=P;for(let Q=0;Q<K;Q++){const Z=D[Q];P=P.concat(Z)}function H(Q,Z,se){return Z||Ye("ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(Z,se)}const Y=P.length;function pe(Q,Z,se){let ce,he,qe;const F=Q.x-Z.x,nt=Q.y-Z.y,ze=se.x-Q.x,et=se.y-Q.y,ve=F*F+nt*nt,St=F*et-nt*ze;if(Math.abs(St)>Number.EPSILON){const C=Math.sqrt(ve),S=Math.sqrt(ze*ze+et*et),$=Z.x-nt/C,oe=Z.y+F/C,ge=se.x-et/S,be=se.y+ze/S,Te=((ge-$)*et-(be-oe)*ze)/(F*et-nt*ze);ce=$+F*Te-Q.x,he=oe+nt*Te-Q.y;const ae=ce*ce+he*he;if(ae<=2)return new de(ce,he);qe=Math.sqrt(ae/2)}else{let C=!1;F>Number.EPSILON?ze>Number.EPSILON&&(C=!0):F<-Number.EPSILON?ze<-Number.EPSILON&&(C=!0):Math.sign(nt)===Math.sign(et)&&(C=!0),C?(ce=-nt,he=F,qe=Math.sqrt(ve)):(ce=F,he=nt,qe=Math.sqrt(ve/2))}return new de(ce/qe,he/qe)}const _e=[];for(let Q=0,Z=B.length,se=Z-1,ce=Q+1;Q<Z;Q++,se++,ce++)se===Z&&(se=0),ce===Z&&(ce=0),_e[Q]=pe(B[Q],B[se],B[ce]);const ye=[];let Re,le=_e.concat();for(let Q=0,Z=K;Q<Z;Q++){const se=D[Q];Re=[];for(let ce=0,he=se.length,qe=he-1,F=ce+1;ce<he;ce++,qe++,F++)qe===he&&(qe=0),F===he&&(F=0),Re[ce]=pe(se[ce],se[qe],se[F]);ye.push(Re),le=le.concat(Re)}let Ee;if(g===0)Ee=ti.triangulateShape(B,D);else{const Q=[],Z=[];for(let se=0;se<g;se++){const ce=se/g,he=f*Math.cos(ce*Math.PI/2),qe=m*Math.sin(ce*Math.PI/2)+_;for(let F=0,nt=B.length;F<nt;F++){const ze=H(B[F],_e[F],qe);Xe(ze.x,ze.y,-he),ce===0&&Q.push(ze)}for(let F=0,nt=K;F<nt;F++){const ze=D[F];Re=ye[F];const et=[];for(let ve=0,St=ze.length;ve<St;ve++){const C=H(ze[ve],Re[ve],qe);Xe(C.x,C.y,-he),ce===0&&et.push(C)}ce===0&&Z.push(et)}}Ee=ti.triangulateShape(Q,Z)}const Be=Ee.length,Le=m+_;for(let Q=0;Q<Y;Q++){const Z=d?H(P[Q],le[Q],Le):P[Q];y?(A.copy(w.normals[0]).multiplyScalar(Z.x),M.copy(w.binormals[0]).multiplyScalar(Z.y),b.copy(x[0]).add(A).add(M),Xe(b.x,b.y,b.z)):Xe(Z.x,Z.y,0)}for(let Q=1;Q<=u;Q++)for(let Z=0;Z<Y;Z++){const se=d?H(P[Z],le[Z],Le):P[Z];y?(A.copy(w.normals[Q]).multiplyScalar(se.x),M.copy(w.binormals[Q]).multiplyScalar(se.y),b.copy(x[Q]).add(A).add(M),Xe(b.x,b.y,b.z)):Xe(se.x,se.y,h/u*Q)}for(let Q=g-1;Q>=0;Q--){const Z=Q/g,se=f*Math.cos(Z*Math.PI/2),ce=m*Math.sin(Z*Math.PI/2)+_;for(let he=0,qe=B.length;he<qe;he++){const F=H(B[he],_e[he],ce);Xe(F.x,F.y,h+se)}for(let he=0,qe=D.length;he<qe;he++){const F=D[he];Re=ye[he];for(let nt=0,ze=F.length;nt<ze;nt++){const et=H(F[nt],Re[nt],ce);y?Xe(et.x,et.y+x[u-1].y,x[u-1].x+se):Xe(et.x,et.y,h+se)}}}re(),Ae();function re(){const Q=i.length/3;if(d){let Z=0,se=Y*Z;for(let ce=0;ce<Be;ce++){const he=Ee[ce];ne(he[2]+se,he[1]+se,he[0]+se)}Z=u+g*2,se=Y*Z;for(let ce=0;ce<Be;ce++){const he=Ee[ce];ne(he[0]+se,he[1]+se,he[2]+se)}}else{for(let Z=0;Z<Be;Z++){const se=Ee[Z];ne(se[2],se[1],se[0])}for(let Z=0;Z<Be;Z++){const se=Ee[Z];ne(se[0]+Y*u,se[1]+Y*u,se[2]+Y*u)}}n.addGroup(Q,i.length/3-Q,0)}function Ae(){const Q=i.length/3;let Z=0;xe(B,Z),Z+=B.length;for(let se=0,ce=D.length;se<ce;se++){const he=D[se];xe(he,Z),Z+=he.length}n.addGroup(Q,i.length/3-Q,1)}function xe(Q,Z){let se=Q.length;for(;--se>=0;){const ce=se;let he=se-1;he<0&&(he=Q.length-1);for(let qe=0,F=u+g*2;qe<F;qe++){const nt=Y*qe,ze=Y*(qe+1),et=Z+ce+nt,ve=Z+he+nt,St=Z+he+ze,C=Z+ce+ze;N(et,ve,St,C)}}}function Xe(Q,Z,se){l.push(Q),l.push(Z),l.push(se)}function ne(Q,Z,se){U(Q),U(Z),U(se);const ce=i.length/3,he=v.generateTopUV(n,i,ce-3,ce-2,ce-1);k(he[0]),k(he[1]),k(he[2])}function N(Q,Z,se,ce){U(Q),U(Z),U(ce),U(Z),U(se),U(ce);const he=i.length/3,qe=v.generateSideWallUV(n,i,he-6,he-3,he-2,he-1);k(qe[0]),k(qe[1]),k(qe[3]),k(qe[1]),k(qe[2]),k(qe[3])}function U(Q){i.push(l[Q*3+0]),i.push(l[Q*3+1]),i.push(l[Q*3+2])}function k(Q){s.push(Q.x),s.push(Q.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return s0(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];n.push(o)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new yl[i.type]().fromJSON(i)),new Yl(n,e.options)}}const i0={generateTopUV:function(r,e,t,n,i){const s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],u=e[i*3+1];return[new de(s,a),new de(o,l),new de(c,u)]},generateSideWallUV:function(r,e,t,n,i,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],d=e[i*3],f=e[i*3+1],m=e[i*3+2],_=e[s*3],g=e[s*3+1],p=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new de(a,1-l),new de(c,1-h),new de(d,1-m),new de(_,1-p)]:[new de(o,1-l),new de(u,1-h),new de(f,1-m),new de(g,1-p)]}};function s0(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Zl extends ls{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Zl(e.radius,e.detail)}}class Kl extends ct{constructor(e=[new de(0,-.5),new de(.5,0),new de(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=rt(i,0,Math.PI*2);const s=[],a=[],o=[],l=[],c=[],u=1/t,h=new I,d=new de,f=new I,m=new I,_=new I;let g=0,p=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:g=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,f.x=p*1,f.y=-g,f.z=p*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:g=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(m)}for(let v=0;v<=t;v++){const x=n+v*u*i,y=Math.sin(x),w=Math.cos(x);for(let M=0;M<=e.length-1;M++){h.x=e[M].x*y,h.y=e[M].y,h.z=e[M].x*w,a.push(h.x,h.y,h.z),d.x=v/t,d.y=M/(e.length-1),o.push(d.x,d.y);const A=l[3*M+0]*y,b=l[3*M+1],E=l[3*M+0]*w;c.push(A,b,E)}}for(let v=0;v<t;v++)for(let x=0;x<e.length-1;x++){const y=x+v*e.length,w=y,M=y+e.length,A=y+e.length+1,b=y+1;s.push(w,M,b),s.push(A,b,M)}this.setIndex(s),this.setAttribute("position",new Ge(a,3)),this.setAttribute("uv",new Ge(o,2)),this.setAttribute("normal",new Ge(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kl(e.points,e.segments,e.phiStart,e.phiLength)}}class Er extends ls{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Er(e.radius,e.detail)}}class Tr extends ct{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,h=e/o,d=t/l,f=[],m=[],_=[],g=[];for(let p=0;p<u;p++){const v=p*d-a;for(let x=0;x<c;x++){const y=x*h-s;m.push(y,-v,0),_.push(0,0,1),g.push(x/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<o;v++){const x=v+c*p,y=v+c*(p+1),w=v+1+c*(p+1),M=v+1+c*p;f.push(x,y,M),f.push(y,w,M)}this.setIndex(f),this.setAttribute("position",new Ge(m,3)),this.setAttribute("normal",new Ge(_,3)),this.setAttribute("uv",new Ge(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Jl extends ct{constructor(e=.5,t=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],u=[];let h=e;const d=(t-e)/i,f=new I,m=new de;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){const p=s+g/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,u.push(m.x,m.y)}h+=d}for(let _=0;_<i;_++){const g=_*(n+1);for(let p=0;p<n;p++){const v=p+g,x=v,y=v+n+1,w=v+n+2,M=v+1;o.push(x,y,M),o.push(y,w,M)}}this.setIndex(o),this.setAttribute("position",new Ge(l,3)),this.setAttribute("normal",new Ge(c,3)),this.setAttribute("uv",new Ge(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class jl extends ct{constructor(e=new Is([new de(0,.5),new de(-.5,-.5),new de(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Ge(i,3)),this.setAttribute("normal",new Ge(s,3)),this.setAttribute("uv",new Ge(a,2));function c(u){const h=i.length/3,d=u.extractPoints(t);let f=d.shape;const m=d.holes;ti.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){const v=m[g];ti.isClockWise(v)===!0&&(m[g]=v.reverse())}const _=ti.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){const v=m[g];f=f.concat(v)}for(let g=0,p=f.length;g<p;g++){const v=f[g];i.push(v.x,v.y,0),s.push(0,0,1),a.push(v.x,v.y)}for(let g=0,p=_.length;g<p;g++){const v=_[g],x=v[0]+h,y=v[1]+h,w=v[2]+h;n.push(x,y,w),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return r0(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const a=t[e.shapes[i]];n.push(a)}return new jl(n,e.curveSegments)}}function r0(r,e){if(e.shapes=[],Array.isArray(r))for(let t=0,n=r.length;t<n;t++){const i=r[t];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e}class ei extends ct{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new I,d=new I,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){const v=[],x=p/n;let y=0;p===0&&a===0?y=.5/t:p===n&&l===Math.PI&&(y=-.5/t);for(let w=0;w<=t;w++){const M=w/t;h.x=-e*Math.cos(i+M*s)*Math.sin(a+x*o),h.y=e*Math.cos(a+x*o),h.z=e*Math.sin(i+M*s)*Math.sin(a+x*o),m.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),g.push(M+y,1-x),v.push(c++)}u.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){const x=u[p][v+1],y=u[p][v],w=u[p+1][v],M=u[p+1][v+1];(p!==0||a>0)&&f.push(x,y,M),(p!==n-1||l<Math.PI)&&f.push(y,w,M)}this.setIndex(f),this.setAttribute("position",new Ge(m,3)),this.setAttribute("normal",new Ge(_,3)),this.setAttribute("uv",new Ge(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ei(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ea extends ls{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ea(e.radius,e.detail)}}class Fs extends ct{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);const l=[],c=[],u=[],h=[],d=new I,f=new I,m=new I;for(let _=0;_<=n;_++){const g=a+_/n*o;for(let p=0;p<=i;p++){const v=p/i*s;f.x=(e+t*Math.cos(g))*Math.cos(v),f.y=(e+t*Math.cos(g))*Math.sin(v),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),d.x=e*Math.cos(v),d.y=e*Math.sin(v),m.subVectors(f,d).normalize(),u.push(m.x,m.y,m.z),h.push(p/i),h.push(_/n)}}for(let _=1;_<=n;_++)for(let g=1;g<=i;g++){const p=(i+1)*_+g-1,v=(i+1)*(_-1)+g-1,x=(i+1)*(_-1)+g,y=(i+1)*_+g;l.push(p,v,y),l.push(v,x,y)}this.setIndex(l),this.setAttribute("position",new Ge(c,3)),this.setAttribute("normal",new Ge(u,3)),this.setAttribute("uv",new Ge(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fs(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ql extends ct{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);const o=[],l=[],c=[],u=[],h=new I,d=new I,f=new I,m=new I,_=new I,g=new I,p=new I;for(let x=0;x<=n;++x){const y=x/n*s*Math.PI*2;v(y,s,a,e,f),v(y+.01,s,a,e,m),g.subVectors(m,f),p.addVectors(m,f),_.crossVectors(g,p),p.crossVectors(_,g),_.normalize(),p.normalize();for(let w=0;w<=i;++w){const M=w/i*Math.PI*2,A=-t*Math.cos(M),b=t*Math.sin(M);h.x=f.x+(A*p.x+b*_.x),h.y=f.y+(A*p.y+b*_.y),h.z=f.z+(A*p.z+b*_.z),l.push(h.x,h.y,h.z),d.subVectors(h,f).normalize(),c.push(d.x,d.y,d.z),u.push(x/n),u.push(w/i)}}for(let x=1;x<=n;x++)for(let y=1;y<=i;y++){const w=(i+1)*(x-1)+(y-1),M=(i+1)*x+(y-1),A=(i+1)*x+y,b=(i+1)*(x-1)+y;o.push(w,M,b),o.push(M,A,b)}this.setIndex(o),this.setAttribute("position",new Ge(l,3)),this.setAttribute("normal",new Ge(c,3)),this.setAttribute("uv",new Ge(u,2));function v(x,y,w,M,A){const b=Math.cos(x),E=Math.sin(x),P=w/y*x,D=Math.cos(P);A.x=M*(2+D)*.5*b,A.y=M*(2+D)*E*.5,A.z=M*Math.sin(P)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ql(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class ec extends ct{constructor(e=new ed(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new I,l=new I,c=new de;let u=new I;const h=[],d=[],f=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new Ge(h,3)),this.setAttribute("normal",new Ge(d,3)),this.setAttribute("uv",new Ge(f,2));function _(){for(let x=0;x<t;x++)g(x);g(s===!1?t:0),v(),p()}function g(x){u=e.getPointAt(x/t,u);const y=a.normals[x],w=a.binormals[x];for(let M=0;M<=i;M++){const A=M/i*Math.PI*2,b=Math.sin(A),E=-Math.cos(A);l.x=E*y.x+b*w.x,l.y=E*y.y+b*w.y,l.z=E*y.z+b*w.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,h.push(o.x,o.y,o.z)}}function p(){for(let x=1;x<=t;x++)for(let y=1;y<=i;y++){const w=(i+1)*(x-1)+(y-1),M=(i+1)*x+(y-1),A=(i+1)*x+y,b=(i+1)*(x-1)+y;m.push(w,M,b),m.push(M,A,b)}}function v(){for(let x=0;x<=t;x++)for(let y=0;y<=i;y++)c.x=x/t,c.y=y/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ec(new yl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class nd extends ct{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new I,s=new I;if(e.index!==null){const a=e.attributes.position,o=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const h=l[c],d=h.start,f=h.count;for(let m=d,_=d+f;m<_;m+=3)for(let g=0;g<3;g++){const p=o.getX(m+g),v=o.getX(m+(g+1)%3);i.fromBufferAttribute(a,p),s.fromBufferAttribute(a,v),mh(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{const a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){const u=3*o+c,h=3*o+(c+1)%3;i.fromBufferAttribute(a,u),s.fromBufferAttribute(a,h),mh(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Ge(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function mh(r,e,t){const n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var gh=Object.freeze({__proto__:null,BoxGeometry:os,CapsuleGeometry:Wl,CircleGeometry:Xl,ConeGeometry:Os,CylinderGeometry:wa,DodecahedronGeometry:$l,EdgesGeometry:vp,ExtrudeGeometry:Yl,IcosahedronGeometry:Zl,LatheGeometry:Kl,OctahedronGeometry:Er,PlaneGeometry:Tr,PolyhedronGeometry:ls,RingGeometry:Jl,ShapeGeometry:jl,SphereGeometry:ei,TetrahedronGeometry:Ea,TorusGeometry:Fs,TorusKnotGeometry:Ql,TubeGeometry:ec,WireframeGeometry:nd});class Cp extends sn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Fe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}function br(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];if(_h(i))i.isRenderTargetTexture?(Ie("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(_h(i[0])){const s=[];for(let a=0,o=i.length;a<o;a++)s[a]=i[a].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function gn(r){const e={};for(let t=0;t<r.length;t++){const n=br(r[t]);for(const i in n)e[i]=n[i]}return e}function _h(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function a0(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Rp(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:_t.workingColorSpace}const tc={clone:br,merge:gn};var o0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,l0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Hn extends sn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=o0,this.fragmentShader=l0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=br(e.uniforms),this.uniformsGroups=a0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class id extends Hn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class sd extends sn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Oi,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ip extends sd{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new de(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return rt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Fe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Fe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Fe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Pp extends sn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Fe(16777215),this.specular=new Fe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Oi,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=ba,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Lp extends sn{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Fe(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Oi,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class Dp extends sn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Oi,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Up extends sn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Oi,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=ba,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class rd extends sn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ad extends sn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Np extends sn{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Fe(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Oi,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Fp extends Mn{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function As(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Op(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function mu(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function od(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}function c0(r,e,t,n,i=30){const s=r.clone();s.name=e;const a=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],u=c.getValueSize(),h=[],d=[];for(let f=0;f<c.times.length;++f){const m=c.times[f]*i;if(!(m<t||m>=n)){h.push(c.times[f]);for(let _=0;_<u;++_)d.push(c.values[f*u+_])}}h.length!==0&&(c.times=As(h,c.times.constructor),c.values=As(d,c.values.constructor),a.push(c))}s.tracks=a;let o=1/0;for(let l=0;l<s.tracks.length;++l)o>s.tracks[l].times[0]&&(o=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*o);return s.resetDuration(),s}function u0(r,e=0,t=r,n=30){n<=0&&(n=30);const i=t.tracks.length,s=e/n;for(let a=0;a<i;++a){const o=t.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;const c=r.tracks.find(function(p){return p.name===o.name&&p.ValueTypeName===l});if(c===void 0)continue;let u=0;const h=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=h/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const m=o.times.length-1;let _;if(s<=o.times[0]){const p=u,v=h-u;_=o.values.slice(p,v)}else if(s>=o.times[m]){const p=m*h+u,v=p+h-u;_=o.values.slice(p,v)}else{const p=o.createInterpolant(),v=u,x=h-u;p.evaluate(s),_=p.resultBuffer.slice(v,x)}l==="quaternion"&&new pn().fromArray(_).normalize().conjugate().toArray(_);const g=c.times.length;for(let p=0;p<g;++p){const v=p*f+d;if(l==="quaternion")pn.multiplyQuaternionsFlat(c.values,v,_,0,c.values,v);else{const x=f-d*2;for(let y=0;y<x;++y)c.values[v+y]-=_[y]}}}return r.blendMode=zu,r}class d0{static convertArray(e,t){return As(e,t)}static isTypedArray(e){return ip(e)}static getKeyframeOrder(e){return Op(e)}static sortedArray(e,t,n){return mu(e,t,n)}static flattenJSON(e,t,n,i){od(e,t,n,i)}static subclip(e,t,n,i,s=30){return c0(e,t,n,i,s)}static makeClipAdditive(e,t=0,n=e,i=30){return u0(e,t,n,i)}}class Ar{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class kp extends Ar{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Es,endingEnd:Es}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ts:s=e,o=2*t-n;break;case la:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ts:a=e,l=2*n-t;break;case la:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),_=m*m,g=_*m,p=-d*g+2*d*_-d*m,v=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*m+1,x=(-1-f)*g+(1.5+f)*_+.5*m,y=f*g-f*_;for(let w=0;w!==o;++w)s[w]=p*a[u+w]+v*a[c+w]+x*a[l+w]+y*a[h+w];return s}}class ld extends Ar{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==o;++d)s[d]=a[c+d]*h+a[l+d]*u;return s}}class Bp extends Ar{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class zp extends Ar{interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.settings||this.DefaultSettings_,h=u.inTangents,d=u.outTangents;if(!h||!d){const _=(n-t)/(i-t),g=1-_;for(let p=0;p!==o;++p)s[p]=a[c+p]*g+a[l+p]*_;return s}const f=o*2,m=e-1;for(let _=0;_!==o;++_){const g=a[c+_],p=a[l+_],v=m*f+_*2,x=d[v],y=d[v+1],w=e*f+_*2,M=h[w],A=h[w+1];let b=(n-t)/(i-t),E,P,D,V,J;for(let K=0;K<8;K++){E=b*b,P=E*b,D=1-b,V=D*D,J=V*D;const H=J*t+3*V*b*x+3*D*E*M+P*i-n;if(Math.abs(H)<1e-10)break;const Y=3*V*(x-t)+6*D*b*(M-x)+3*E*(i-M);if(Math.abs(Y)<1e-10)break;b=b-H/Y,b=Math.max(0,Math.min(1,b))}s[_]=J*g+3*V*b*y+3*D*E*A+P*p}return s}}class qn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=As(t,this.TimeBufferType),this.values=As(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:As(e.times,Array),values:As(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Bp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ld(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new kp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new zp(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case oa:t=this.InterpolantFactoryMethodDiscrete;break;case ml:t=this.InterpolantFactoryMethodLinear;break;case To:t=this.InterpolantFactoryMethodSmooth;break;case cu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ie("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return oa;case this.InterpolantFactoryMethodLinear:return ml;case this.InterpolantFactoryMethodSmooth:return To;case this.InterpolantFactoryMethodBezier:return cu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Ye("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(Ye("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){Ye("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ye("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&ip(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){Ye("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===To,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(i)l=!0;else{const h=o*n,d=h-n,f=h+n;for(let m=0;m!==n;++m){const _=t[h+m];if(_!==t[d+m]||_!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}qn.prototype.ValueTypeName="";qn.prototype.TimeBufferType=Float32Array;qn.prototype.ValueBufferType=Float32Array;qn.prototype.DefaultInterpolation=ml;class ks extends qn{constructor(e,t,n){super(e,t,n)}}ks.prototype.ValueTypeName="bool";ks.prototype.ValueBufferType=Array;ks.prototype.DefaultInterpolation=oa;ks.prototype.InterpolantFactoryMethodLinear=void 0;ks.prototype.InterpolantFactoryMethodSmooth=void 0;class cd extends qn{constructor(e,t,n,i){super(e,t,n,i)}}cd.prototype.ValueTypeName="color";class _a extends qn{constructor(e,t,n,i){super(e,t,n,i)}}_a.prototype.ValueTypeName="number";class Vp extends Ar{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let u=c+o;c!==u;c+=4)pn.slerpFlat(s,0,a,c-o,a,c,l);return s}}class Ta extends qn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Vp(this.times,this.values,this.getValueSize(),e)}}Ta.prototype.ValueTypeName="quaternion";Ta.prototype.InterpolantFactoryMethodSmooth=void 0;class Bs extends qn{constructor(e,t,n){super(e,t,n)}}Bs.prototype.ValueTypeName="string";Bs.prototype.ValueBufferType=Array;Bs.prototype.DefaultInterpolation=oa;Bs.prototype.InterpolantFactoryMethodLinear=void 0;Bs.prototype.InterpolantFactoryMethodSmooth=void 0;class va extends qn{constructor(e,t,n,i){super(e,t,n,i)}}va.prototype.ValueTypeName="vector";class xa{constructor(e="",t=-1,n=[],i=Ll){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Vn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(f0(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(qn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const u=Op(l);l=mu(l,1,u),c=mu(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new _a(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],u=c.name.match(s);if(u&&u.length>1){const h=u[1];let d=i[h];d||(i[h]=d=[]),d.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(Ie("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Ye("AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,m,_){if(f.length!==0){const g=[],p=[];od(f,g,p,m),g.length!==0&&_.push(new h(d,g,p))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let _=0;_<d[m].morphTargets.length;_++)f[d[m].morphTargets[_]]=-1;for(const _ in f){const g=[],p=[];for(let v=0;v!==d[m].morphTargets.length;++v){const x=d[m];g.push(x.time),p.push(x.morphTarget===_?1:0)}i.push(new _a(".morphTargetInfluence["+_+"]",g,p))}l=f.length*a}else{const f=".bones["+t[h].name+"]";n(va,f+".position",d,"pos",i),n(Ta,f+".quaternion",d,"rot",i),n(va,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function h0(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return _a;case"vector":case"vector2":case"vector3":case"vector4":return va;case"color":return cd;case"quaternion":return Ta;case"bool":case"boolean":return ks;case"string":return Bs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function f0(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=h0(r.type);if(r.times===void 0){const t=[],n=[];od(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const vi={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(vh(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!vh(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function vh(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class ud{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&i.onStart!==void 0&&i.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],m=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Gp=new ud;class Ln{constructor(e){this.manager=e!==void 0?e:Gp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ln.DEFAULT_MATERIAL_NAME="__DEFAULT";const Pi={};class p0 extends Error{constructor(e,t){super(e),this.response=t}}class ki extends Ln{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=vi.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(Pi[e]!==void 0){Pi[e].push({onLoad:t,onProgress:n,onError:i});return}Pi[e]=[],Pi[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ie("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Pi[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let _=0;const g=new ReadableStream({start(p){v();function v(){h.read().then(({done:x,value:y})=>{if(x)p.close();else{_+=y.byteLength;const w=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let M=0,A=u.length;M<A;M++){const b=u[M];b.onProgress&&b.onProgress(w)}p.enqueue(y),v()}},x=>{p.error(x)})}}});return new Response(g)}else throw new p0(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{vi.add(`file:${e}`,c);const u=Pi[e];delete Pi[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=Pi[e];if(u===void 0)throw this.manager.itemError(e),c;delete Pi[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class m0 extends Ln{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new ki(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):Ye(l),s.manager.itemError(e)}},n,i)}parse(e){const t=[];for(let n=0;n<e.length;n++){const i=xa.parse(e[n]);t.push(i)}return t}}class g0 extends Ln{constructor(e){super(e)}load(e,t,n,i){const s=this,a=[],o=new Hl,l=new ki(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(s.withCredentials);let c=0;function u(h){l.load(e[h],function(d){const f=s.parse(d,!0);a[h]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(o.minFilter=Ut),o.image=a,o.format=f.format,o.needsUpdate=!0,t&&t(o))},n,i)}if(Array.isArray(e))for(let h=0,d=e.length;h<d;++h)u(h);else l.load(e,function(h){const d=s.parse(h,!0);if(d.isCubemap){const f=d.mipmaps.length/d.mipmapCount;for(let m=0;m<f;m++){a[m]={mipmaps:[]};for(let _=0;_<d.mipmapCount;_++)a[m].mipmaps.push(d.mipmaps[m*d.mipmapCount+_]),a[m].format=d.format,a[m].width=d.width,a[m].height=d.height}o.image=a}else o.image.width=d.width,o.image.height=d.height,o.mipmaps=d.mipmaps;d.mipmapCount===1&&(o.minFilter=Ut),o.format=d.format,o.needsUpdate=!0,t&&t(o)},n,i);return o}}const ir=new WeakMap;class ya extends Ln{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=vi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=ir.get(a);h===void 0&&(h=[],ir.set(a,h)),h.push({onLoad:t,onError:i})}return a}const o=ha("img");function l(){u(),t&&t(this);const h=ir.get(this)||[];for(let d=0;d<h.length;d++){const f=h[d];f.onLoad&&f.onLoad(this)}ir.delete(this),s.manager.itemEnd(e)}function c(h){u(),i&&i(h),vi.remove(`image:${e}`);const d=ir.get(this)||[];for(let f=0;f<d.length;f++){const m=d[f];m.onError&&m.onError(h)}ir.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),vi.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class _0 extends Ln{constructor(e){super(e)}load(e,t,n,i){const s=new Sa;s.colorSpace=En;const a=new ya(this.manager);a.setCrossOrigin(this.crossOrigin),a.setPath(this.path);let o=0;function l(c){a.load(e[c],function(u){s.images[c]=u,o++,o===6&&(s.needsUpdate=!0,t&&t(s))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return s}}class v0 extends Ln{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new ii,o=new ki(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(e,function(l){let c;try{c=s.parse(l)}catch(u){i!==void 0?i(u):Ye(u);return}c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:Rn,a.wrapT=c.wrapT!==void 0?c.wrapT:Rn,a.magFilter=c.magFilter!==void 0?c.magFilter:Ut,a.minFilter=c.minFilter!==void 0?c.minFilter:Ut,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(a.colorSpace=c.colorSpace),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=_i),c.mipmapCount===1&&(a.minFilter=Ut),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,t&&t(a,c)},n,i),a}}class x0 extends Ln{constructor(e){super(e)}load(e,t,n,i){const s=new Ft,a=new ya(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class cs extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Fe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Hp extends cs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Fe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const kc=new st,xh=new I,yh=new I;class dd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.mapType=Tn,this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wr,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;xh.setFromMatrixPosition(e.matrixWorld),t.position.copy(xh),yh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yh),t.updateMatrixWorld(),kc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kc,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ds||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(kc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const uo=new I,ho=new pn,di=new I;class nc extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=Bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(uo,ho,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(uo,ho,di.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(uo,ho,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(uo,ho,di.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Yi=new I,bh=new de,Mh=new de;class nn extends nc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=vr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Rs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vr*2*Math.atan(Math.tan(Rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z),Yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z)}getViewSize(e,t){return this.getViewBounds(e,bh,Mh),t.subVectors(Mh,bh)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Rs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class y0 extends dd{constructor(){super(new nn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=vr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Wp extends cs{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new y0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class b0 extends dd{constructor(){super(new nn(90,1,.5,500)),this.isPointLightShadow=!0}}class Xp extends cs{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new b0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Aa extends nc{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class M0 extends dd{constructor(){super(new Aa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class $p extends cs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new M0}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class qp extends cs{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Yp extends cs{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class hd{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new I)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,s=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.282095),t.addScaledVector(a[1],.488603*i),t.addScaledVector(a[2],.488603*s),t.addScaledVector(a[3],.488603*n),t.addScaledVector(a[4],1.092548*(n*i)),t.addScaledVector(a[5],1.092548*(i*s)),t.addScaledVector(a[6],.315392*(3*s*s-1)),t.addScaledVector(a[7],1.092548*(n*s)),t.addScaledVector(a[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,s=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.886227),t.addScaledVector(a[1],2*.511664*i),t.addScaledVector(a[2],2*.511664*s),t.addScaledVector(a[3],2*.511664*n),t.addScaledVector(a[4],2*.429043*n*i),t.addScaledVector(a[5],2*.429043*i*s),t.addScaledVector(a[6],.743125*s*s-.247708),t.addScaledVector(a[7],2*.429043*n*s),t.addScaledVector(a[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,s=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*s,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*s,t[6]=.315392*(3*s*s-1),t[7]=1.092548*n*s,t[8]=.546274*(n*n-i*i)}}class Zp extends cs{constructor(e=new hd,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class ic extends Ln{constructor(e){super(e),this.textures={}}load(e,t,n,i){const s=this,a=new ki(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):Ye(l),s.manager.itemError(e)}},n,i)}parse(e){const t=this.textures;function n(s){return t[s]===void 0&&Ie("MaterialLoader: Undefined texture",s),t[s]}const i=this.createMaterialFromType(e.type);if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=e.sheen),e.sheenColor!==void 0&&(i.sheenColor=new Fe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(i.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.specularIntensity!==void 0&&(i.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(i.dispersion=e.dispersion),e.iridescence!==void 0&&(i.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(i.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.attenuationDistance!==void 0&&(i.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(i.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.shadowSide!==void 0&&(i.shadowSide=e.shadowSide),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(i.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(i.depthFunc=e.depthFunc),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(i.blendSrc=e.blendSrc),e.blendDst!==void 0&&(i.blendDst=e.blendDst),e.blendEquation!==void 0&&(i.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(i.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(i.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==void 0&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(i.dithering=e.dithering),e.alphaToCoverage!==void 0&&(i.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(i.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(i.allowOverride=e.allowOverride),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const s in e.uniforms){const a=e.uniforms[s];switch(i.uniforms[s]={},a.type){case"t":i.uniforms[s].value=n(a.value);break;case"c":i.uniforms[s].value=new Fe().setHex(a.value);break;case"v2":i.uniforms[s].value=new de().fromArray(a.value);break;case"v3":i.uniforms[s].value=new I().fromArray(a.value);break;case"v4":i.uniforms[s].value=new xt().fromArray(a.value);break;case"m3":i.uniforms[s].value=new ot().fromArray(a.value);break;case"m4":i.uniforms[s].value=new st().fromArray(a.value);break;default:i.uniforms[s].value=a.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(i.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)i.extensions[s]=e.extensions[s];if(e.lights!==void 0&&(i.lights=e.lights),e.clipping!==void 0&&(i.clipping=e.clipping),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),i.normalScale=new de().fromArray(s)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(i.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapRotation!==void 0&&i.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new de().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(i.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(i.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(i.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(i.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(e.sheenRoughnessMap)),i}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return ic.createMaterialFromType(e)}static createMaterialFromType(e){const t={ShadowMaterial:Cp,SpriteMaterial:$u,RawShaderMaterial:id,ShaderMaterial:Hn,PointsMaterial:Yu,MeshPhysicalMaterial:Ip,MeshStandardMaterial:sd,MeshPhongMaterial:Pp,MeshToonMaterial:Lp,MeshNormalMaterial:Dp,MeshLambertMaterial:Up,MeshDepthMaterial:rd,MeshDistanceMaterial:ad,MeshBasicMaterial:tn,MeshMatcapMaterial:Np,LineDashedMaterial:Fp,LineBasicMaterial:Mn,Material:sn};return new t[e]}}class gu{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class fd extends ct{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class Kp extends Ln{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new ki(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(o){try{t(s.parse(JSON.parse(o)))}catch(l){i?i(l):Ye(l),s.manager.itemError(e)}},n,i)}parse(e){const t={},n={};function i(f,m){if(t[m]!==void 0)return t[m];const g=f.interleavedBuffers[m],p=s(f,g.buffer),v=hr(g.type,p),x=new zl(v,g.stride);return x.uuid=g.uuid,t[m]=x,x}function s(f,m){if(n[m]!==void 0)return n[m];const g=f.arrayBuffers[m],p=new Uint32Array(g).buffer;return n[m]=p,p}const a=e.isInstancedBufferGeometry?new fd:new ct,o=e.data.index;if(o!==void 0){const f=hr(o.type,o.array);a.setIndex(new Rt(f,1))}const l=e.data.attributes;for(const f in l){const m=l[f];let _;if(m.isInterleavedBufferAttribute){const g=i(e.data,m.data);_=new zn(g,m.itemSize,m.offset,m.normalized)}else{const g=hr(m.type,m.array),p=m.isInstancedBufferAttribute?xr:Rt;_=new p(g,m.itemSize,m.normalized)}m.name!==void 0&&(_.name=m.name),m.usage!==void 0&&_.setUsage(m.usage),a.setAttribute(f,_)}const c=e.data.morphAttributes;if(c)for(const f in c){const m=c[f],_=[];for(let g=0,p=m.length;g<p;g++){const v=m[g];let x;if(v.isInterleavedBufferAttribute){const y=i(e.data,v.data);x=new zn(y,v.itemSize,v.offset,v.normalized)}else{const y=hr(v.type,v.array);x=new Rt(y,v.itemSize,v.normalized)}v.name!==void 0&&(x.name=v.name),_.push(x)}a.morphAttributes[f]=_}e.data.morphTargetsRelative&&(a.morphTargetsRelative=!0);const h=e.data.groups||e.data.drawcalls||e.data.offsets;if(h!==void 0)for(let f=0,m=h.length;f!==m;++f){const _=h[f];a.addGroup(_.start,_.count,_.materialIndex)}const d=e.data.boundingSphere;return d!==void 0&&(a.boundingSphere=new Jt().fromJSON(d)),e.name&&(a.name=e.name),e.userData&&(a.userData=e.userData),a}}const Bc={};class S0 extends Ln{constructor(e){super(e)}load(e,t,n,i){const s=this,a=this.path===""?gu.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||a;const o=new ki(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(h){i!==void 0&&i(h),Ye("ObjectLoader: Can't parse "+e+".",h.message);return}const u=c.metadata;if(u===void 0||u.type===void 0||u.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),Ye("ObjectLoader: Can't load "+e);return}s.parse(c,t)},n,i)}async loadAsync(e,t){const n=this,i=this.path===""?gu.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;const s=new ki(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const a=await s.loadAsync(e,t);let o;try{o=JSON.parse(a)}catch(c){throw new Error("ObjectLoader: Can't parse "+e+". "+c.message)}const l=o.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(o)}parse(e,t){const n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),s=this.parseGeometries(e.geometries,i),a=this.parseImages(e.images,function(){t!==void 0&&t(c)}),o=this.parseTextures(e.textures,a),l=this.parseMaterials(e.materials,o),c=this.parseObject(e.object,s,l,o,n),u=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,u),this.bindLightTargets(c),t!==void 0){let h=!1;for(const d in a)if(a[d].data instanceof HTMLImageElement){h=!0;break}h===!1&&t(c)}return c}async parseAsync(e){const t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),s=await this.parseImagesAsync(e.images),a=this.parseTextures(e.textures,s),o=this.parseMaterials(e.materials,a),l=this.parseObject(e.object,i,o,a,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}static registerGeometry(e,t){Bc[e]=t}parseShapes(e){const t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){const s=new Is().fromJSON(e[n]);t[s.uuid]=s}return t}parseSkeletons(e,t){const n={},i={};if(t.traverse(function(s){s.isBone&&(i[s.uuid]=s)}),e!==void 0)for(let s=0,a=e.length;s<a;s++){const o=new Vl().fromJSON(e[s],i);n[o.uuid]=o}return n}parseGeometries(e,t){const n={};if(e!==void 0){const i=new Kp;for(let s=0,a=e.length;s<a;s++){let o;const l=e[s];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":o=i.parse(l);break;default:l.type in gh?o=gh[l.type].fromJSON(l,t):l.type in Bc?o=Bc[l.type].fromJSON(l,t):Ie(`ObjectLoader: Unknown geometry type "${l.type}". Use .registerGeometry() before starting the deserialization process.`)}o.uuid=l.uuid,l.name!==void 0&&(o.name=l.name),l.userData!==void 0&&(o.userData=l.userData),n[l.uuid]=o}}return n}parseMaterials(e,t){const n={},i={};if(e!==void 0){const s=new ic;s.setTextures(t);for(let a=0,o=e.length;a<o;a++){const l=e[a];n[l.uuid]===void 0&&(n[l.uuid]=s.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){const t={};if(e!==void 0)for(let n=0;n<e.length;n++){const i=e[n],s=xa.parse(i);t[s.uuid]=s}return t}parseImages(e,t){const n=this,i={};let s;function a(l){return n.manager.itemStart(l),s.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function o(l){if(typeof l=="string"){const c=l,u=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return a(u)}else return l.data?{data:hr(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){const l=new ud(t);s=new ya(l),s.setCrossOrigin(this.crossOrigin);for(let c=0,u=e.length;c<u;c++){const h=e[c],d=h.url;if(Array.isArray(d)){const f=[];for(let m=0,_=d.length;m<_;m++){const g=d[m],p=o(g);p!==null&&(p instanceof HTMLImageElement?f.push(p):f.push(new ii(p.data,p.width,p.height)))}i[h.uuid]=new Qi(f)}else{const f=o(h.url);i[h.uuid]=new Qi(f)}}}return i}async parseImagesAsync(e){const t=this,n={};let i;async function s(a){if(typeof a=="string"){const o=a,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(o)?o:t.resourcePath+o;return await i.loadAsync(l)}else return a.data?{data:hr(a.type,a.data),width:a.width,height:a.height}:null}if(e!==void 0&&e.length>0){i=new ya(this.manager),i.setCrossOrigin(this.crossOrigin);for(let a=0,o=e.length;a<o;a++){const l=e[a],c=l.url;if(Array.isArray(c)){const u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h],m=await s(f);m!==null&&(m instanceof HTMLImageElement?u.push(m):u.push(new ii(m.data,m.width,m.height)))}n[l.uuid]=new Qi(u)}else{const u=await s(l.url);n[l.uuid]=new Qi(u)}}}return n}parseTextures(e,t){function n(s,a){return typeof s=="number"?s:(Ie("ObjectLoader.parseTexture: Constant should be in numeric form.",s),a[s])}const i={};if(e!==void 0)for(let s=0,a=e.length;s<a;s++){const o=e[s];o.image===void 0&&Ie('ObjectLoader: No "image" specified for',o.uuid),t[o.image]===void 0&&Ie("ObjectLoader: Undefined image",o.image);const l=t[o.image],c=l.data;let u;Array.isArray(c)?(u=new Sa,c.length===6&&(u.needsUpdate=!0)):(c&&c.data?u=new ii:u=new Ft,c&&(u.needsUpdate=!0)),u.source=l,u.uuid=o.uuid,o.name!==void 0&&(u.name=o.name),o.mapping!==void 0&&(u.mapping=n(o.mapping,w0)),o.channel!==void 0&&(u.channel=o.channel),o.offset!==void 0&&u.offset.fromArray(o.offset),o.repeat!==void 0&&u.repeat.fromArray(o.repeat),o.center!==void 0&&u.center.fromArray(o.center),o.rotation!==void 0&&(u.rotation=o.rotation),o.wrap!==void 0&&(u.wrapS=n(o.wrap[0],Sh),u.wrapT=n(o.wrap[1],Sh)),o.format!==void 0&&(u.format=o.format),o.internalFormat!==void 0&&(u.internalFormat=o.internalFormat),o.type!==void 0&&(u.type=o.type),o.colorSpace!==void 0&&(u.colorSpace=o.colorSpace),o.minFilter!==void 0&&(u.minFilter=n(o.minFilter,wh)),o.magFilter!==void 0&&(u.magFilter=n(o.magFilter,wh)),o.anisotropy!==void 0&&(u.anisotropy=o.anisotropy),o.flipY!==void 0&&(u.flipY=o.flipY),o.generateMipmaps!==void 0&&(u.generateMipmaps=o.generateMipmaps),o.premultiplyAlpha!==void 0&&(u.premultiplyAlpha=o.premultiplyAlpha),o.unpackAlignment!==void 0&&(u.unpackAlignment=o.unpackAlignment),o.compareFunction!==void 0&&(u.compareFunction=o.compareFunction),o.normalized!==void 0&&(u.normalized=o.normalized),o.userData!==void 0&&(u.userData=o.userData),i[o.uuid]=u}return i}parseObject(e,t,n,i,s){let a;function o(d){return t[d]===void 0&&Ie("ObjectLoader: Undefined geometry",d),t[d]}function l(d){if(d!==void 0){if(Array.isArray(d)){const f=[];for(let m=0,_=d.length;m<_;m++){const g=d[m];n[g]===void 0&&Ie("ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[d]===void 0&&Ie("ObjectLoader: Undefined material",d),n[d]}}function c(d){return i[d]===void 0&&Ie("ObjectLoader: Undefined texture",d),i[d]}let u,h;switch(e.type){case"Scene":a=new Hu,e.background!==void 0&&(Number.isInteger(e.background)?a.background=new Fe(e.background):a.background=c(e.background)),e.environment!==void 0&&(a.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?a.fog=new Bl(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(a.fog=new kl(e.fog.color,e.fog.density)),e.fog.name!==""&&(a.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(a.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(a.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&a.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(a.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&a.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":a=new nn(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(a.focus=e.focus),e.zoom!==void 0&&(a.zoom=e.zoom),e.filmGauge!==void 0&&(a.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(a.filmOffset=e.filmOffset),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"OrthographicCamera":a=new Aa(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(a.zoom=e.zoom),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"AmbientLight":a=new qp(e.color,e.intensity);break;case"DirectionalLight":a=new $p(e.color,e.intensity),a.target=e.target||"";break;case"PointLight":a=new Xp(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":a=new Yp(e.color,e.intensity,e.width,e.height);break;case"SpotLight":a=new Wp(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),a.target=e.target||"";break;case"HemisphereLight":a=new Hp(e.color,e.groundColor,e.intensity);break;case"LightProbe":const d=new hd().fromArray(e.sh);a=new Zp(d,e.intensity);break;case"SkinnedMesh":u=o(e.geometry),h=l(e.material),a=new dp(u,h),e.bindMode!==void 0&&(a.bindMode=e.bindMode),e.bindMatrix!==void 0&&a.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(a.skeleton=e.skeleton);break;case"Mesh":u=o(e.geometry),h=l(e.material),a=new At(u,h);break;case"InstancedMesh":u=o(e.geometry),h=l(e.material);const f=e.count,m=e.instanceMatrix,_=e.instanceColor;a=new hp(u,h,f),a.instanceMatrix=new xr(new Float32Array(m.array),16),_!==void 0&&(a.instanceColor=new xr(new Float32Array(_.array),_.itemSize));break;case"BatchedMesh":u=o(e.geometry),h=l(e.material),a=new fp(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,h),a.geometry=u,a.perObjectFrustumCulled=e.perObjectFrustumCulled,a.sortObjects=e.sortObjects,a._drawRanges=e.drawRanges,a._reservedRanges=e.reservedRanges,a._geometryInfo=e.geometryInfo.map(g=>{let p=null,v=null;return g.boundingBox!==void 0&&(p=new Kt().fromJSON(g.boundingBox)),g.boundingSphere!==void 0&&(v=new Jt().fromJSON(g.boundingSphere)),{...g,boundingBox:p,boundingSphere:v}}),a._instanceInfo=e.instanceInfo,a._availableInstanceIds=e._availableInstanceIds,a._availableGeometryIds=e._availableGeometryIds,a._nextIndexStart=e.nextIndexStart,a._nextVertexStart=e.nextVertexStart,a._geometryCount=e.geometryCount,a._maxInstanceCount=e.maxInstanceCount,a._maxVertexCount=e.maxVertexCount,a._maxIndexCount=e.maxIndexCount,a._geometryInitialized=e.geometryInitialized,a._matricesTexture=c(e.matricesTexture.uuid),a._indirectTexture=c(e.indirectTexture.uuid),e.colorsTexture!==void 0&&(a._colorsTexture=c(e.colorsTexture.uuid)),e.boundingSphere!==void 0&&(a.boundingSphere=new Jt().fromJSON(e.boundingSphere)),e.boundingBox!==void 0&&(a.boundingBox=new Kt().fromJSON(e.boundingBox));break;case"LOD":a=new up;break;case"Line":a=new ss(o(e.geometry),l(e.material));break;case"LineLoop":a=new pp(o(e.geometry),l(e.material));break;case"LineSegments":a=new wi(o(e.geometry),l(e.material));break;case"PointCloud":case"Points":a=new mp(o(e.geometry),l(e.material));break;case"Sprite":a=new cp(l(e.material));break;case"Group":a=new fr;break;case"Bone":a=new qu;break;default:a=new yt}if(a.uuid=e.uuid,e.name!==void 0&&(a.name=e.name),e.matrix!==void 0?(a.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(a.matrixAutoUpdate=e.matrixAutoUpdate),a.matrixAutoUpdate&&a.matrix.decompose(a.position,a.quaternion,a.scale)):(e.position!==void 0&&a.position.fromArray(e.position),e.rotation!==void 0&&a.rotation.fromArray(e.rotation),e.quaternion!==void 0&&a.quaternion.fromArray(e.quaternion),e.scale!==void 0&&a.scale.fromArray(e.scale)),e.up!==void 0&&a.up.fromArray(e.up),e.pivot!==void 0&&(a.pivot=new I().fromArray(e.pivot)),e.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),e.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=e.morphTargetInfluences.slice()),e.castShadow!==void 0&&(a.castShadow=e.castShadow),e.receiveShadow!==void 0&&(a.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(a.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(a.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(a.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(a.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&a.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(a.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(a.visible=e.visible),e.frustumCulled!==void 0&&(a.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(a.renderOrder=e.renderOrder),e.static!==void 0&&(a.static=e.static),e.userData!==void 0&&(a.userData=e.userData),e.layers!==void 0&&(a.layers.mask=e.layers),e.children!==void 0){const d=e.children;for(let f=0;f<d.length;f++)a.add(this.parseObject(d[f],t,n,i,s))}if(e.animations!==void 0){const d=e.animations;for(let f=0;f<d.length;f++){const m=d[f];a.animations.push(s[m])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(a.autoUpdate=e.autoUpdate);const d=e.levels;for(let f=0;f<d.length;f++){const m=d[f],_=a.getObjectByProperty("uuid",m.object);_!==void 0&&a.addLevel(_,m.distance,m.hysteresis)}}return a}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=t[n.skeleton];i===void 0?Ie("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){const n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new yt}})}}const w0={UVMapping:El,CubeReflectionMapping:bi,CubeRefractionMapping:ts,EquirectangularReflectionMapping:qr,EquirectangularRefractionMapping:Yr,CubeUVReflectionMapping:Mr},Sh={RepeatWrapping:ia,ClampToEdgeWrapping:Rn,MirroredRepeatWrapping:sa},wh={NearestFilter:Wt,NearestMipmapNearestFilter:Du,NearestMipmapLinearFilter:dr,LinearFilter:Ut,LinearMipmapNearestFilter:Zr,LinearMipmapLinearFilter:_i},zc=new WeakMap;class E0 extends Ln{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ie("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ie("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=vi.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{zc.has(a)===!0?(i&&i(zc.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(c),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){vi.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e)}).catch(function(c){i&&i(c),zc.set(l,c),vi.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});vi.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}let fo;class pd{static getContext(){return fo===void 0&&(fo=new(window.AudioContext||window.webkitAudioContext)),fo}static setContext(e){fo=e}}class T0 extends Ln{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new ki(this.manager);a.setResponseType("arraybuffer"),a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){try{const c=l.slice(0),u=pd.getContext(),h=e+"#decode";s.manager.itemStart(h),u.decodeAudioData(c,function(d){t(d),s.manager.itemEnd(h)}).catch(function(d){o(d),s.manager.itemEnd(h)})}catch(c){o(c)}},n,i);function o(l){i?i(l):Ye(l),s.manager.itemError(e)}}}const Eh=new st,Th=new st,gs=new st;class A0{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new nn,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new nn,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,gs.copy(e.projectionMatrix);const i=t.eyeSep/2,s=i*t.near/t.focus,a=t.near*Math.tan(Rs*t.fov*.5)/t.zoom;let o,l;Th.elements[12]=-i,Eh.elements[12]=i,o=-a*t.aspect+s,l=a*t.aspect+s,gs.elements[0]=2*t.near/(l-o),gs.elements[8]=(l+o)/(l-o),this.cameraL.projectionMatrix.copy(gs),o=-a*t.aspect-s,l=a*t.aspect-s,gs.elements[0]=2*t.near/(l-o),gs.elements[8]=(l+o)/(l-o),this.cameraR.projectionMatrix.copy(gs)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(Th),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(Eh)}}const sr=-90,rr=1;class Jp extends yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new nn(sr,rr,e,t);i.layers=this.layers,this.add(i);const s=new nn(sr,rr,e,t);s.layers=this.layers,this.add(s);const a=new nn(sr,rr,e,t);a.layers=this.layers,this.add(a);const o=new nn(sr,rr,e,t);o.layers=this.layers,this.add(o);const l=new nn(sr,rr,e,t);l.layers=this.layers,this.add(l);const c=new nn(sr,rr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Bn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ds)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class jp extends nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Qp{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=C0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function C0(){this._document.hidden===!1&&this.reset()}const _s=new I,Vc=new pn,R0=new I,vs=new I,xs=new I;class I0 extends yt{constructor(){super(),this.type="AudioListener",this.context=pd.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new Qp}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e),this._timer.update();const t=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(_s,Vc,R0),vs.set(0,0,-1).applyQuaternion(Vc),xs.set(0,1,0).applyQuaternion(Vc),t.positionX){const n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(_s.x,n),t.positionY.linearRampToValueAtTime(_s.y,n),t.positionZ.linearRampToValueAtTime(_s.z,n),t.forwardX.linearRampToValueAtTime(vs.x,n),t.forwardY.linearRampToValueAtTime(vs.y,n),t.forwardZ.linearRampToValueAtTime(vs.z,n),t.upX.linearRampToValueAtTime(xs.x,n),t.upY.linearRampToValueAtTime(xs.y,n),t.upZ.linearRampToValueAtTime(xs.z,n)}else t.setPosition(_s.x,_s.y,_s.z),t.setOrientation(vs.x,vs.y,vs.z,xs.x,xs.y,xs.z)}}class em extends yt{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){Ie("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){Ie("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){Ie("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){Ie("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){Ie("Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(Ie("Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){Ie("Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}copy(e,t){return super.copy(e,t),e.sourceType!=="buffer"?(Ie("Audio: Audio source type cannot be copied."),this):(this.autoplay=e.autoplay,this.buffer=e.buffer,this.detune=e.detune,this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.offset=e.offset,this.duration=e.duration,this.playbackRate=e.playbackRate,this.hasPlaybackControl=e.hasPlaybackControl,this.sourceType=e.sourceType,this.filters=e.filters.slice(),this)}clone(e){return new this.constructor(this.listener).copy(this,e)}}const ys=new I,Ah=new pn,P0=new I,bs=new I;class L0 extends em{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(ys,Ah,P0),bs.set(0,0,1).applyQuaternion(Ah);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(ys.x,n),t.positionY.linearRampToValueAtTime(ys.y,n),t.positionZ.linearRampToValueAtTime(ys.z,n),t.orientationX.linearRampToValueAtTime(bs.x,n),t.orientationY.linearRampToValueAtTime(bs.y,n),t.orientationZ.linearRampToValueAtTime(bs.z,n)}else t.setPosition(ys.x,ys.y,ys.z),t.setOrientation(bs.x,bs.y,bs.z)}}class D0{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}}class tm{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,a;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,a=i;s!==a;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){pn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const a=this._workIndex*s;pn.multiplyQuaternionsFlat(e,a,e,t,e,n),pn.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,s){const a=1-i;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,s){for(let a=0;a!==s;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const md="\\[\\]\\.:\\/",U0=new RegExp("["+md+"]","g"),gd="[^"+md+"]",N0="[^"+md.replace("\\.","")+"]",F0=/((?:WC+[\/:])*)/.source.replace("WC",gd),O0=/(WCOD+)?/.source.replace("WCOD",N0),k0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",gd),B0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",gd),z0=new RegExp("^"+F0+O0+k0+B0+"$"),V0=["material","materials","bones","map"];class G0{constructor(e,t,n){const i=n||Mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Mt{constructor(e,t,n){this.path=t,this.parsedPath=n||Mt.parseTrackName(t),this.node=Mt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Mt.Composite(e,t,n):new Mt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(U0,"")}static parseTrackName(e){const t=z0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);V0.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Mt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ie("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ye("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ye("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ye("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ye("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ye("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;Ye("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Mt.Composite=G0;Mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Mt.prototype.GetterByBindingType=[Mt.prototype._getValue_direct,Mt.prototype._getValue_array,Mt.prototype._getValue_arrayElement,Mt.prototype._getValue_toArray];Mt.prototype.SetterByBindingTypeAndVersioning=[[Mt.prototype._setValue_direct,Mt.prototype._setValue_direct_setNeedsUpdate,Mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_array,Mt.prototype._setValue_array_setNeedsUpdate,Mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_arrayElement,Mt.prototype._setValue_arrayElement_setNeedsUpdate,Mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_fromArray,Mt.prototype._setValue_fromArray_setNeedsUpdate,Mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class H0{constructor(){this.isAnimationObjectGroup=!0,this.uuid=Vn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,a=s.length;let o,l=e.length,c=this.nCachedObjects_;for(let u=0,h=arguments.length;u!==h;++u){const d=arguments[u],f=d.uuid;let m=t[f];if(m===void 0){m=l++,t[f]=m,e.push(d);for(let _=0,g=a;_!==g;++_)s[_].push(new Mt(d,n[_],i[_]))}else if(m<c){o=e[m];const _=--c,g=e[_];t[g.uuid]=m,e[m]=g,t[f]=_,e[_]=d;for(let p=0,v=a;p!==v;++p){const x=s[p],y=x[_];let w=x[m];x[m]=y,w===void 0&&(w=new Mt(d,n[p],i[p])),x[_]=w}}else e[m]!==o&&Ye("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_;for(let a=0,o=arguments.length;a!==o;++a){const l=arguments[a],c=l.uuid,u=t[c];if(u!==void 0&&u>=s){const h=s++,d=e[h];t[d.uuid]=u,e[u]=d,t[c]=h,e[h]=l;for(let f=0,m=i;f!==m;++f){const _=n[f],g=_[h],p=_[u];_[u]=g,_[h]=p}}}this.nCachedObjects_=s}uncache(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_,a=e.length;for(let o=0,l=arguments.length;o!==l;++o){const c=arguments[o],u=c.uuid,h=t[u];if(h!==void 0)if(delete t[u],h<s){const d=--s,f=e[d],m=--a,_=e[m];t[f.uuid]=h,e[h]=f,t[_.uuid]=d,e[d]=_,e.pop();for(let g=0,p=i;g!==p;++g){const v=n[g],x=v[d],y=v[m];v[h]=x,v[d]=y,v.pop()}}else{const d=--a,f=e[d];d>0&&(t[f.uuid]=h),e[h]=f,e.pop();for(let m=0,_=i;m!==_;++m){const g=n[m];g[h]=g[d],g.pop()}}}this.nCachedObjects_=s}subscribe_(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const s=this._bindings;if(i!==void 0)return s[i];const a=this._paths,o=this._parsedPaths,l=this._objects,c=l.length,u=this.nCachedObjects_,h=new Array(c);i=s.length,n[e]=i,a.push(e),o.push(t),s.push(h);for(let d=u,f=l.length;d!==f;++d){const m=l[d];h[d]=new Mt(m,e,t)}return h}unsubscribe_(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,s=this._parsedPaths,a=this._bindings,o=a.length-1,l=a[o],c=e[o];t[c]=n,a[n]=l,a.pop(),s[n]=s[o],s.pop(),i[n]=i[o],i.pop()}}}class nm{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,a=s.length,o=new Array(a),l={endingStart:Es,endingEnd:Es};for(let c=0;c!==a;++c){const u=s[c].createInterpolant(null);o[c]=u,u.settings&&Object.assign(l,u.settings),u.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=qf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,s=e._clip.duration,a=s/i,o=i/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case zu:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulateAdditive(o);break;case Ll:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const a=n===Yf;if(e===0)return s===-1?i:a&&(s&1)===1?t-i:i;if(n===$f){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=s,this.time=i;if(a&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Ts,i.endingEnd=Ts):(e?i.endingStart=this.zeroSlopeAtStart?Ts:Es:i.endingStart=la,t?i.endingEnd=this.zeroSlopeAtEnd?Ts:Es:i.endingEnd=la)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}}const W0=new Float32Array(1);class X0 extends ri{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==s;++h){const d=i[h],f=d.name;let m=u[f];if(m!==void 0)++m.referenceCount,a[h]=m;else{if(m=a[h],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,f));continue}const _=t&&t._propertyBindings[h].binding.parsedPath;m=new tm(Mt.create(n,f,_),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,f),a[h]=m}o[h].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;const h=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new ld(new Float32Array(2),new Float32Array(2),1,W0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let a=typeof e=="string"?xa.findByName(i,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Ll),l!==void 0){const h=l.actionByRoot[s];if(h!==void 0&&h.blendMode===n)return h;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const u=new nm(this,a,t,n);return this._bindAction(u,c),this._addInactiveAction(u,o,s),u}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?xa.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class $0 extends Gu{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isRenderTarget3D=!0,this.depth=n,this.texture=new Fl(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class _d{constructor(e){this.value=e}clone(){return new _d(this.value.clone===void 0?this.value:this.value.clone())}}let q0=0;class Y0 extends ri{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:q0++}),this.name="",this.usage=da,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){const s=Array.isArray(t[n])?t[n]:[t[n]];for(let a=0;a<s.length;a++)this.uniforms.push(s[a].clone())}return this}clone(){return new this.constructor().copy(this)}}class Ml extends zl{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class Z0{constructor(e,t,n,i,s,a=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=s,this.normalized=a,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}const Ch=new st;class K0{constructor(e,t,n=0,i=1/0){this.ray=new Sr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Ol,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ye("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ch.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ch),this}intersectObject(e,t=!0,n=[]){return _u(e,this,n,t),n.sort(Rh),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)_u(e[i],this,n,t);return n.sort(Rh),n}}function Rh(r,e){return r.distance-e.distance}function _u(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let a=0,o=s.length;a<o;a++)_u(s[a],e,t,!0)}}class J0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Ie("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class j0{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=rt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(rt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Q0{constructor(e=1,t=0,n=0){this.radius=e,this.theta=t,this.y=n}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}}const wd=class wd{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};wd.prototype.isMatrix2=!0;let vu=wd;const Ih=new de;class ev{constructor(e=new de(1/0,1/0),t=new de(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ih.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ih).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ph=new I,po=new I,ar=new I,or=new I,Gc=new I,tv=new I,nv=new I;class im{constructor(e=new I,t=new I){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Ph.subVectors(e,this.start),po.subVectors(this.end,this.start);const n=po.dot(po);if(n===0)return 0;let s=po.dot(Ph)/n;return t&&(s=rt(s,0,1)),s}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=tv,n=nv){const i=10000000000000001e-32;let s,a;const o=this.start,l=e.start,c=this.end,u=e.end;ar.subVectors(c,o),or.subVectors(u,l),Gc.subVectors(o,l);const h=ar.dot(ar),d=or.dot(or),f=or.dot(Gc);if(h<=i&&d<=i)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(h<=i)s=0,a=f/d,a=rt(a,0,1);else{const m=ar.dot(Gc);if(d<=i)a=0,s=rt(-m/h,0,1);else{const _=ar.dot(or),g=h*d-_*_;g!==0?s=rt((_*f-m*d)/g,0,1):s=0,a=(_*s+f)/d,a<0?(a=0,s=rt(-m/h,0,1)):a>1&&(a=1,s=rt((_-m)/h,0,1))}}return t.copy(o).addScaledVector(ar,s),n.copy(l).addScaledVector(or,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const Lh=new I;class iv extends yt{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new ct,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let a=0,o=1,l=32;a<l;a++,o++){const c=a/l*Math.PI*2,u=o/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(u),Math.sin(u),1)}n.setAttribute("position",new Ge(i,3));const s=new Mn({fog:!1,toneMapped:!1});this.cone=new wi(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),Lh.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Lh),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const Zi=new I,mo=new st,Hc=new st;class sv extends wi{constructor(e){const t=sm(e),n=new ct,i=[],s=[];for(let c=0;c<t.length;c++){const u=t[c];u.parent&&u.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(0,0,0),s.push(0,0,0))}n.setAttribute("position",new Ge(i,3)),n.setAttribute("color",new Ge(s,3));const a=new Mn({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,a),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1;const o=new Fe(255),l=new Fe(65280);this.setColors(o,l)}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");Hc.copy(this.root.matrixWorld).invert();for(let s=0,a=0;s<t.length;s++){const o=t[s];o.parent&&o.parent.isBone&&(mo.multiplyMatrices(Hc,o.matrixWorld),Zi.setFromMatrixPosition(mo),i.setXYZ(a,Zi.x,Zi.y,Zi.z),mo.multiplyMatrices(Hc,o.parent.matrixWorld),Zi.setFromMatrixPosition(mo),i.setXYZ(a+1,Zi.x,Zi.y,Zi.z),a+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}setColors(e,t){const i=this.geometry.getAttribute("color");for(let s=0;s<i.count;s+=2)i.setXYZ(s,e.r,e.g,e.b),i.setXYZ(s+1,t.r,t.g,t.b);return i.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}function sm(r){const e=[];r.isBone===!0&&e.push(r);for(let t=0;t<r.children.length;t++)e.push(...sm(r.children[t]));return e}class rv extends At{constructor(e,t,n){const i=new ei(t,4,2),s=new tn({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const av=new I,Dh=new Fe,Uh=new Fe;class ov extends yt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new Er(t);i.rotateY(Math.PI*.5),this.material=new tn({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const s=i.getAttribute("position"),a=new Float32Array(s.count*3);i.setAttribute("color",new Rt(a,3)),this.add(new At(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");Dh.copy(this.light.color),Uh.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){const s=n<i/2?Dh:Uh;t.setXYZ(n,s.r,s.g,s.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(av.setFromMatrixPosition(this.light.matrixWorld).negate())}}class lv extends wi{constructor(e=10,t=10,n=4473924,i=8947848){n=new Fe(n),i=new Fe(i);const s=t/2,a=e/t,o=e/2,l=[],c=[];for(let d=0,f=0,m=-o;d<=t;d++,m+=a){l.push(-o,0,m,o,0,m),l.push(m,0,-o,m,0,o);const _=d===s?n:i;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}const u=new ct;u.setAttribute("position",new Ge(l,3)),u.setAttribute("color",new Ge(c,3));const h=new Mn({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class cv extends wi{constructor(e=10,t=16,n=8,i=64,s=4473924,a=8947848){s=new Fe(s),a=new Fe(a);const o=[],l=[];if(t>1)for(let h=0;h<t;h++){const d=h/t*(Math.PI*2),f=Math.sin(d)*e,m=Math.cos(d)*e;o.push(0,0,0),o.push(f,0,m);const _=h&1?s:a;l.push(_.r,_.g,_.b),l.push(_.r,_.g,_.b)}for(let h=0;h<n;h++){const d=h&1?s:a,f=e-e/n*h;for(let m=0;m<i;m++){let _=m/i*(Math.PI*2),g=Math.sin(_)*f,p=Math.cos(_)*f;o.push(g,0,p),l.push(d.r,d.g,d.b),_=(m+1)/i*(Math.PI*2),g=Math.sin(_)*f,p=Math.cos(_)*f,o.push(g,0,p),l.push(d.r,d.g,d.b)}}const c=new ct;c.setAttribute("position",new Ge(o,3)),c.setAttribute("color",new Ge(l,3));const u=new Mn({vertexColors:!0,toneMapped:!1});super(c,u),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Nh=new I,go=new I,Fh=new I;class uv extends yt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new ct;i.setAttribute("position",new Ge([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const s=new Mn({fog:!1,toneMapped:!1});this.lightPlane=new ss(i,s),this.add(this.lightPlane),i=new ct,i.setAttribute("position",new Ge([0,0,0,0,0,1],3)),this.targetLine=new ss(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Nh.setFromMatrixPosition(this.light.matrixWorld),go.setFromMatrixPosition(this.light.target.matrixWorld),Fh.subVectors(go,Nh),this.lightPlane.lookAt(go),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(go),this.targetLine.scale.z=Fh.length()}}const _o=new I,kt=new nc;class dv extends wi{constructor(e){const t=new ct,n=new Mn({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(m,_){l(m),l(_)}function l(m){i.push(0,0,0),s.push(0,0,0),a[m]===void 0&&(a[m]=[]),a[m].push(i.length/3-1)}t.setAttribute("position",new Ge(i,3)),t.setAttribute("color",new Ge(s,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();const c=new Fe(16755200),u=new Fe(16711680),h=new Fe(43775),d=new Fe(16777215),f=new Fe(3355443);this.setColors(c,u,h,d,f)}setColors(e,t,n,i,s){const o=this.geometry.getAttribute("color");return o.setXYZ(0,e.r,e.g,e.b),o.setXYZ(1,e.r,e.g,e.b),o.setXYZ(2,e.r,e.g,e.b),o.setXYZ(3,e.r,e.g,e.b),o.setXYZ(4,e.r,e.g,e.b),o.setXYZ(5,e.r,e.g,e.b),o.setXYZ(6,e.r,e.g,e.b),o.setXYZ(7,e.r,e.g,e.b),o.setXYZ(8,e.r,e.g,e.b),o.setXYZ(9,e.r,e.g,e.b),o.setXYZ(10,e.r,e.g,e.b),o.setXYZ(11,e.r,e.g,e.b),o.setXYZ(12,e.r,e.g,e.b),o.setXYZ(13,e.r,e.g,e.b),o.setXYZ(14,e.r,e.g,e.b),o.setXYZ(15,e.r,e.g,e.b),o.setXYZ(16,e.r,e.g,e.b),o.setXYZ(17,e.r,e.g,e.b),o.setXYZ(18,e.r,e.g,e.b),o.setXYZ(19,e.r,e.g,e.b),o.setXYZ(20,e.r,e.g,e.b),o.setXYZ(21,e.r,e.g,e.b),o.setXYZ(22,e.r,e.g,e.b),o.setXYZ(23,e.r,e.g,e.b),o.setXYZ(24,t.r,t.g,t.b),o.setXYZ(25,t.r,t.g,t.b),o.setXYZ(26,t.r,t.g,t.b),o.setXYZ(27,t.r,t.g,t.b),o.setXYZ(28,t.r,t.g,t.b),o.setXYZ(29,t.r,t.g,t.b),o.setXYZ(30,t.r,t.g,t.b),o.setXYZ(31,t.r,t.g,t.b),o.setXYZ(32,n.r,n.g,n.b),o.setXYZ(33,n.r,n.g,n.b),o.setXYZ(34,n.r,n.g,n.b),o.setXYZ(35,n.r,n.g,n.b),o.setXYZ(36,n.r,n.g,n.b),o.setXYZ(37,n.r,n.g,n.b),o.setXYZ(38,i.r,i.g,i.b),o.setXYZ(39,i.r,i.g,i.b),o.setXYZ(40,s.r,s.g,s.b),o.setXYZ(41,s.r,s.g,s.b),o.setXYZ(42,s.r,s.g,s.b),o.setXYZ(43,s.r,s.g,s.b),o.setXYZ(44,s.r,s.g,s.b),o.setXYZ(45,s.r,s.g,s.b),o.setXYZ(46,s.r,s.g,s.b),o.setXYZ(47,s.r,s.g,s.b),o.setXYZ(48,s.r,s.g,s.b),o.setXYZ(49,s.r,s.g,s.b),o.needsUpdate=!0,this}update(){const e=this.geometry,t=this.pointMap,n=1,i=1;let s,a;if(kt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)s=1,a=0;else if(this.camera.coordinateSystem===Bn)s=-1,a=1;else if(this.camera.coordinateSystem===Ds)s=0,a=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);Vt("c",t,e,kt,0,0,s),Vt("t",t,e,kt,0,0,a),Vt("n1",t,e,kt,-n,-i,s),Vt("n2",t,e,kt,n,-i,s),Vt("n3",t,e,kt,-n,i,s),Vt("n4",t,e,kt,n,i,s),Vt("f1",t,e,kt,-n,-i,a),Vt("f2",t,e,kt,n,-i,a),Vt("f3",t,e,kt,-n,i,a),Vt("f4",t,e,kt,n,i,a),Vt("u1",t,e,kt,n*.7,i*1.1,s),Vt("u2",t,e,kt,-n*.7,i*1.1,s),Vt("u3",t,e,kt,0,i*2,s),Vt("cf1",t,e,kt,-n,0,a),Vt("cf2",t,e,kt,n,0,a),Vt("cf3",t,e,kt,0,-i,a),Vt("cf4",t,e,kt,0,i,a),Vt("cn1",t,e,kt,-n,0,s),Vt("cn2",t,e,kt,n,0,s),Vt("cn3",t,e,kt,0,-i,s),Vt("cn4",t,e,kt,0,i,s),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function Vt(r,e,t,n,i,s,a){_o.set(i,s,a).unproject(n);const o=e[r];if(o!==void 0){const l=t.getAttribute("position");for(let c=0,u=o.length;c<u;c++)l.setXYZ(o[c],_o.x,_o.y,_o.z)}}const vo=new Kt;class hv extends wi{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),s=new ct;s.setIndex(new Rt(n,1)),s.setAttribute("position",new Rt(i,3)),super(s,new Mn({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&vo.setFromObject(this.object),vo.isEmpty())return;const e=vo.min,t=vo.max,n=this.geometry.attributes.position,i=n.array;i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=e.x,i[4]=t.y,i[5]=t.z,i[6]=e.x,i[7]=e.y,i[8]=t.z,i[9]=t.x,i[10]=e.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=e.z,i[15]=e.x,i[16]=t.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=t.x,i[22]=e.y,i[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class fv extends wi{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new ct;s.setIndex(new Rt(n,1)),s.setAttribute("position",new Ge(i,3)),super(s,new Mn({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class pv extends ss{constructor(e,t=1,n=16776960){const i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],a=new ct;a.setAttribute("position",new Ge(s,3)),a.computeBoundingSphere(),super(a,new Mn({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const o=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new ct;l.setAttribute("position",new Ge(o,3)),l.computeBoundingSphere(),this.add(new At(l,new tn({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Oh=new I;let xo,Wc;class mv extends yt{constructor(e=new I(0,0,1),t=new I(0,0,0),n=1,i=16776960,s=n*.2,a=s*.2){super(),this.type="ArrowHelper",xo===void 0&&(xo=new ct,xo.setAttribute("position",new Ge([0,0,0,0,1,0],3)),Wc=new Os(.5,1,5,1),Wc.translate(0,-.5,0)),this.position.copy(t),this.line=new ss(xo,new Mn({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new At(Wc,new tn({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,s,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Oh.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Oh,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class gv extends wi{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new ct;i.setAttribute("position",new Ge(t,3)),i.setAttribute("color",new Ge(n,3));const s=new Mn({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){const i=new Fe,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class _v{constructor(){this.type="ShapePath",this.color=new Fe,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new bl,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,s,a){return this.currentPath.bezierCurveTo(e,t,n,i,s,a),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(p){const v=[];for(let x=0,y=p.length;x<y;x++){const w=p[x],M=new Is;M.curves=w.curves,v.push(M)}return v}function n(p,v){const x=v.length;let y=!1;for(let w=x-1,M=0;M<x;w=M++){let A=v[w],b=v[M],E=b.x-A.x,P=b.y-A.y;if(Math.abs(P)>Number.EPSILON){if(P<0&&(A=v[M],E=-E,b=v[w],P=-P),p.y<A.y||p.y>b.y)continue;if(p.y===A.y){if(p.x===A.x)return!0}else{const D=P*(p.x-A.x)-E*(p.y-A.y);if(D===0)return!0;if(D<0)continue;y=!y}}else{if(p.y!==A.y)continue;if(b.x<=p.x&&p.x<=A.x||A.x<=p.x&&p.x<=b.x)return!0}}return y}const i=ti.isClockWise,s=this.subPaths;if(s.length===0)return[];let a,o,l;const c=[];if(s.length===1)return o=s[0],l=new Is,l.curves=o.curves,c.push(l),c;let u=!i(s[0].getPoints());u=e?!u:u;const h=[],d=[];let f=[],m=0,_;d[m]=void 0,f[m]=[];for(let p=0,v=s.length;p<v;p++)o=s[p],_=o.getPoints(),a=i(_),a=e?!a:a,a?(!u&&d[m]&&m++,d[m]={s:new Is,p:_},d[m].s.curves=o.curves,u&&m++,f[m]=[]):f[m].push({h:o,p:_[0]});if(!d[0])return t(s);if(d.length>1){let p=!1,v=0;for(let x=0,y=d.length;x<y;x++)h[x]=[];for(let x=0,y=d.length;x<y;x++){const w=f[x];for(let M=0;M<w.length;M++){const A=w[M];let b=!0;for(let E=0;E<d.length;E++)n(A.p,d[E].p)&&(x!==E&&v++,b?(b=!1,h[E].push(A)):p=!0);b&&h[x].push(A)}}v>0&&p===!1&&(f=h)}let g;for(let p=0,v=d.length;p<v;p++){l=d[p].s,c.push(l),g=f[p];for(let x=0,y=g.length;x<y;x++)l.holes.push(g[x].h)}return c}}class vv extends ri{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ie("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function xv(r,e){const t=r.image&&r.image.width?r.image.width/r.image.height:1;return t>e?(r.repeat.x=1,r.repeat.y=t/e,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2):(r.repeat.x=e/t,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0),r}function yv(r,e){const t=r.image&&r.image.width?r.image.width/r.image.height:1;return t>e?(r.repeat.x=e/t,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0):(r.repeat.x=1,r.repeat.y=t/e,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2),r}function bv(r){return r.repeat.x=1,r.repeat.y=1,r.offset.x=0,r.offset.y=0,r}function xu(r,e,t,n){const i=Mv(n);switch(t){case ku:return r*e;case Rl:return r*e/i.components*i.byteLength;case Ma:return r*e/i.components*i.byteLength;case ns:return r*e*2/i.components*i.byteLength;case Il:return r*e*2/i.components*i.byteLength;case Bu:return r*e*3/i.components*i.byteLength;case yn:return r*e*4/i.components*i.byteLength;case Pl:return r*e*4/i.components*i.byteLength;case Kr:case Jr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case jr:case Qr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case zo:case Go:return Math.max(r,16)*Math.max(e,8)/4;case Bo:case Vo:return Math.max(r,8)*Math.max(e,8)/2;case Ho:case Wo:case $o:case qo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Xo:case ra:case Yo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Zo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ko:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Jo:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case jo:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Qo:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case el:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case tl:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case nl:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case il:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case sl:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case rl:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case al:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case ol:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case ll:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case cl:case ul:case dl:return Math.ceil(r/4)*Math.ceil(e/4)*16;case hl:case fl:return Math.ceil(r/4)*Math.ceil(e/4)*8;case aa:case pl:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Mv(r){switch(r){case Tn:case Uu:return{byteLength:1,components:1};case gr:case Nu:case Mi:return{byteLength:2,components:1};case Al:case Cl:return{byteLength:2,components:4};case $n:case Tl:case xn:return{byteLength:4,components:1};case Fu:case Ou:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}class Sv{static contain(e,t){return xv(e,t)}static cover(e,t){return yv(e,t)}static fill(e){return bv(e)}static getByteLength(e,t,n,i){return xu(e,t,n,i)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wl}}));typeof window<"u"&&(window.__THREE__?Ie("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wl);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function rm(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function wv(r){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const u=l.array,h=l.updateRanges;if(r.bindBuffer(c,o),h.length===0)r.bufferSubData(c,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){const m=h[d],_=h[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){const _=h[f];r.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var Ev=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Tv=`#ifdef USE_ALPHAHASH
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
#endif`,Av=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Iv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Pv=`#ifdef USE_AOMAP
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
#endif`,Lv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Dv=`#ifdef USE_BATCHING
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
#endif`,Uv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Nv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ov=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,kv=`#ifdef USE_IRIDESCENCE
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
#endif`,Bv=`#ifdef USE_BUMPMAP
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
#endif`,zv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Vv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Hv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Xv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,$v=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,qv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Yv=`#define PI 3.141592653589793
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
} // validated`,Zv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Kv=`vec3 transformedNormal = objectNormal;
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
#endif`,Jv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qv=`#ifdef USE_EMISSIVEMAP
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
#include <lightprobes_pars_fragment>`,_x=`#ifdef USE_ENVMAP
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
#endif`,vx=`ToonMaterial material;
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
#endif`,_y=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vy=`#ifndef saturate
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
}`,ft={alphahash_fragment:Ev,alphahash_pars_fragment:Tv,alphamap_fragment:Av,alphamap_pars_fragment:Cv,alphatest_fragment:Rv,alphatest_pars_fragment:Iv,aomap_fragment:Pv,aomap_pars_fragment:Lv,batching_pars_vertex:Dv,batching_vertex:Uv,begin_vertex:Nv,beginnormal_vertex:Fv,bsdfs:Ov,iridescence_fragment:kv,bumpmap_pars_fragment:Bv,clipping_planes_fragment:zv,clipping_planes_pars_fragment:Vv,clipping_planes_pars_vertex:Gv,clipping_planes_vertex:Hv,color_fragment:Wv,color_pars_fragment:Xv,color_pars_vertex:$v,color_vertex:qv,common:Yv,cube_uv_reflection_fragment:Zv,defaultnormal_vertex:Kv,displacementmap_pars_vertex:Jv,displacementmap_vertex:jv,emissivemap_fragment:Qv,emissivemap_pars_fragment:ex,colorspace_fragment:tx,colorspace_pars_fragment:nx,envmap_fragment:ix,envmap_common_pars_fragment:sx,envmap_pars_fragment:rx,envmap_pars_vertex:ax,envmap_physical_pars_fragment:_x,envmap_vertex:ox,fog_vertex:lx,fog_pars_vertex:cx,fog_fragment:ux,fog_pars_fragment:dx,gradientmap_pars_fragment:hx,lightmap_pars_fragment:fx,lights_lambert_fragment:px,lights_lambert_pars_fragment:mx,lights_pars_begin:gx,lights_toon_fragment:vx,lights_toon_pars_fragment:xx,lights_phong_fragment:yx,lights_phong_pars_fragment:bx,lights_physical_fragment:Mx,lights_physical_pars_fragment:Sx,lights_fragment_begin:wx,lights_fragment_maps:Ex,lights_fragment_end:Tx,lightprobes_pars_fragment:Ax,logdepthbuf_fragment:Cx,logdepthbuf_pars_fragment:Rx,logdepthbuf_pars_vertex:Ix,logdepthbuf_vertex:Px,map_fragment:Lx,map_pars_fragment:Dx,map_particle_fragment:Ux,map_particle_pars_fragment:Nx,metalnessmap_fragment:Fx,metalnessmap_pars_fragment:Ox,morphinstance_vertex:kx,morphcolor_vertex:Bx,morphnormal_vertex:zx,morphtarget_pars_vertex:Vx,morphtarget_vertex:Gx,normal_fragment_begin:Hx,normal_fragment_maps:Wx,normal_pars_fragment:Xx,normal_pars_vertex:$x,normal_vertex:qx,normalmap_pars_fragment:Yx,clearcoat_normal_fragment_begin:Zx,clearcoat_normal_fragment_maps:Kx,clearcoat_pars_fragment:Jx,iridescence_pars_fragment:jx,opaque_fragment:Qx,packing:ey,premultiplied_alpha_fragment:ty,project_vertex:ny,dithering_fragment:iy,dithering_pars_fragment:sy,roughnessmap_fragment:ry,roughnessmap_pars_fragment:ay,shadowmap_pars_fragment:oy,shadowmap_pars_vertex:ly,shadowmap_vertex:cy,shadowmask_pars_fragment:uy,skinbase_vertex:dy,skinning_pars_vertex:hy,skinning_vertex:fy,skinnormal_vertex:py,specularmap_fragment:my,specularmap_pars_fragment:gy,tonemapping_fragment:_y,tonemapping_pars_fragment:vy,transmission_fragment:xy,transmission_pars_fragment:yy,uv_pars_fragment:by,uv_pars_vertex:My,uv_vertex:Sy,worldpos_vertex:wy,background_vert:Ey,background_frag:Ty,backgroundCube_vert:Ay,backgroundCube_frag:Cy,cube_vert:Ry,cube_frag:Iy,depth_vert:Py,depth_frag:Ly,distance_vert:Dy,distance_frag:Uy,equirect_vert:Ny,equirect_frag:Fy,linedashed_vert:Oy,linedashed_frag:ky,meshbasic_vert:By,meshbasic_frag:zy,meshlambert_vert:Vy,meshlambert_frag:Gy,meshmatcap_vert:Hy,meshmatcap_frag:Wy,meshnormal_vert:Xy,meshnormal_frag:$y,meshphong_vert:qy,meshphong_frag:Yy,meshphysical_vert:Zy,meshphysical_frag:Ky,meshtoon_vert:Jy,meshtoon_frag:jy,points_vert:Qy,points_frag:eb,shadow_vert:tb,shadow_frag:nb,sprite_vert:ib,sprite_frag:sb},Pe={common:{diffuse:{value:new Fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ot}},envmap:{envMap:{value:null},envMapRotation:{value:new ot},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ot},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0},uvTransform:{value:new ot}},sprite:{diffuse:{value:new Fe(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}}},_n={basic:{uniforms:gn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:ft.meshbasic_vert,fragmentShader:ft.meshbasic_frag},lambert:{uniforms:gn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new Fe(0)},envMapIntensity:{value:1}}]),vertexShader:ft.meshlambert_vert,fragmentShader:ft.meshlambert_frag},phong:{uniforms:gn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new Fe(0)},specular:{value:new Fe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ft.meshphong_vert,fragmentShader:ft.meshphong_frag},standard:{uniforms:gn([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new Fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag},toon:{uniforms:gn([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new Fe(0)}}]),vertexShader:ft.meshtoon_vert,fragmentShader:ft.meshtoon_frag},matcap:{uniforms:gn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:ft.meshmatcap_vert,fragmentShader:ft.meshmatcap_frag},points:{uniforms:gn([Pe.points,Pe.fog]),vertexShader:ft.points_vert,fragmentShader:ft.points_frag},dashed:{uniforms:gn([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ft.linedashed_vert,fragmentShader:ft.linedashed_frag},depth:{uniforms:gn([Pe.common,Pe.displacementmap]),vertexShader:ft.depth_vert,fragmentShader:ft.depth_frag},normal:{uniforms:gn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:ft.meshnormal_vert,fragmentShader:ft.meshnormal_frag},sprite:{uniforms:gn([Pe.sprite,Pe.fog]),vertexShader:ft.sprite_vert,fragmentShader:ft.sprite_frag},background:{uniforms:{uvTransform:{value:new ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ft.background_vert,fragmentShader:ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ot}},vertexShader:ft.backgroundCube_vert,fragmentShader:ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ft.cube_vert,fragmentShader:ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ft.equirect_vert,fragmentShader:ft.equirect_frag},distance:{uniforms:gn([Pe.common,Pe.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ft.distance_vert,fragmentShader:ft.distance_frag},shadow:{uniforms:gn([Pe.lights,Pe.fog,{color:{value:new Fe(0)},opacity:{value:1}}]),vertexShader:ft.shadow_vert,fragmentShader:ft.shadow_frag}};_n.physical={uniforms:gn([_n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ot},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ot},sheen:{value:0},sheenColor:{value:new Fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ot},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ot},attenuationDistance:{value:0},attenuationColor:{value:new Fe(0)},specularColor:{value:new Fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ot},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ot}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag};const yo={r:0,b:0,g:0},rb=new st,am=new ot;am.set(-1,0,0,0,1,0,0,0,1);function ab(r,e,t,n,i,s){const a=new Fe(0);let o=i===!0?0:1,l,c,u=null,h=0,d=null;function f(v){let x=v.isScene===!0?v.background:null;if(x&&x.isTexture){const y=v.backgroundBlurriness>0;x=e.get(x,y)}return x}function m(v){let x=!1;const y=f(v);y===null?g(a,o):y&&y.isColor&&(g(y,1),x=!0);const w=r.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||x)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function _(v,x){const y=f(x);y&&(y.isCubeTexture||y.mapping===Mr)?(c===void 0&&(c=new At(new os(1,1,1),new Hn({name:"BackgroundCubeMaterial",uniforms:br(_n.backgroundCube.uniforms),vertexShader:_n.backgroundCube.vertexShader,fragmentShader:_n.backgroundCube.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,M,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(rb.makeRotationFromEuler(x.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(am),c.material.toneMapped=_t.getTransfer(y.colorSpace)!==Tt,(u!==y||h!==y.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,u=y,h=y.version,d=r.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new At(new Tr(2,2),new Hn({name:"BackgroundMaterial",uniforms:br(_n.background.uniforms),vertexShader:_n.background.vertexShader,fragmentShader:_n.background.fragmentShader,side:Fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=_t.getTransfer(y.colorSpace)!==Tt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||h!==y.version||d!==r.toneMapping)&&(l.material.needsUpdate=!0,u=y,h=y.version,d=r.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function g(v,x){v.getRGB(yo,Rp(r)),t.buffers.color.setClear(yo.r,yo.g,yo.b,x,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),o=x,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(a,o)},render:m,addToRenderList:_,dispose:p}}function ob(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,a=!1;function o(D,V,J,K,B){let H=!1;const Y=h(D,K,J,V);s!==Y&&(s=Y,c(s.object)),H=f(D,K,J,B),H&&m(D,K,J,B),B!==null&&e.update(B,r.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,y(D,V,J,K),B!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return r.createVertexArray()}function c(D){return r.bindVertexArray(D)}function u(D){return r.deleteVertexArray(D)}function h(D,V,J,K){const B=K.wireframe===!0;let H=n[V.id];H===void 0&&(H={},n[V.id]=H);const Y=D.isInstancedMesh===!0?D.id:0;let pe=H[Y];pe===void 0&&(pe={},H[Y]=pe);let _e=pe[J.id];_e===void 0&&(_e={},pe[J.id]=_e);let ye=_e[B];return ye===void 0&&(ye=d(l()),_e[B]=ye),ye}function d(D){const V=[],J=[],K=[];for(let B=0;B<t;B++)V[B]=0,J[B]=0,K[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:J,attributeDivisors:K,object:D,attributes:{},index:null}}function f(D,V,J,K){const B=s.attributes,H=V.attributes;let Y=0;const pe=J.getAttributes();for(const _e in pe)if(pe[_e].location>=0){const Re=B[_e];let le=H[_e];if(le===void 0&&(_e==="instanceMatrix"&&D.instanceMatrix&&(le=D.instanceMatrix),_e==="instanceColor"&&D.instanceColor&&(le=D.instanceColor)),Re===void 0||Re.attribute!==le||le&&Re.data!==le.data)return!0;Y++}return s.attributesNum!==Y||s.index!==K}function m(D,V,J,K){const B={},H=V.attributes;let Y=0;const pe=J.getAttributes();for(const _e in pe)if(pe[_e].location>=0){let Re=H[_e];Re===void 0&&(_e==="instanceMatrix"&&D.instanceMatrix&&(Re=D.instanceMatrix),_e==="instanceColor"&&D.instanceColor&&(Re=D.instanceColor));const le={};le.attribute=Re,Re&&Re.data&&(le.data=Re.data),B[_e]=le,Y++}s.attributes=B,s.attributesNum=Y,s.index=K}function _(){const D=s.newAttributes;for(let V=0,J=D.length;V<J;V++)D[V]=0}function g(D){p(D,0)}function p(D,V){const J=s.newAttributes,K=s.enabledAttributes,B=s.attributeDivisors;J[D]=1,K[D]===0&&(r.enableVertexAttribArray(D),K[D]=1),B[D]!==V&&(r.vertexAttribDivisor(D,V),B[D]=V)}function v(){const D=s.newAttributes,V=s.enabledAttributes;for(let J=0,K=V.length;J<K;J++)V[J]!==D[J]&&(r.disableVertexAttribArray(J),V[J]=0)}function x(D,V,J,K,B,H,Y){Y===!0?r.vertexAttribIPointer(D,V,J,B,H):r.vertexAttribPointer(D,V,J,K,B,H)}function y(D,V,J,K){_();const B=K.attributes,H=J.getAttributes(),Y=V.defaultAttributeValues;for(const pe in H){const _e=H[pe];if(_e.location>=0){let ye=B[pe];if(ye===void 0&&(pe==="instanceMatrix"&&D.instanceMatrix&&(ye=D.instanceMatrix),pe==="instanceColor"&&D.instanceColor&&(ye=D.instanceColor)),ye!==void 0){const Re=ye.normalized,le=ye.itemSize,Ee=e.get(ye);if(Ee===void 0)continue;const Be=Ee.buffer,Le=Ee.type,re=Ee.bytesPerElement,Ae=Le===r.INT||Le===r.UNSIGNED_INT||ye.gpuType===Tl;if(ye.isInterleavedBufferAttribute){const xe=ye.data,Xe=xe.stride,ne=ye.offset;if(xe.isInstancedInterleavedBuffer){for(let N=0;N<_e.locationSize;N++)p(_e.location+N,xe.meshPerAttribute);D.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=xe.meshPerAttribute*xe.count)}else for(let N=0;N<_e.locationSize;N++)g(_e.location+N);r.bindBuffer(r.ARRAY_BUFFER,Be);for(let N=0;N<_e.locationSize;N++)x(_e.location+N,le/_e.locationSize,Le,Re,Xe*re,(ne+le/_e.locationSize*N)*re,Ae)}else{if(ye.isInstancedBufferAttribute){for(let xe=0;xe<_e.locationSize;xe++)p(_e.location+xe,ye.meshPerAttribute);D.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let xe=0;xe<_e.locationSize;xe++)g(_e.location+xe);r.bindBuffer(r.ARRAY_BUFFER,Be);for(let xe=0;xe<_e.locationSize;xe++)x(_e.location+xe,le/_e.locationSize,Le,Re,le*re,le/_e.locationSize*xe*re,Ae)}}else if(Y!==void 0){const Re=Y[pe];if(Re!==void 0)switch(Re.length){case 2:r.vertexAttrib2fv(_e.location,Re);break;case 3:r.vertexAttrib3fv(_e.location,Re);break;case 4:r.vertexAttrib4fv(_e.location,Re);break;default:r.vertexAttrib1fv(_e.location,Re)}}}}v()}function w(){E();for(const D in n){const V=n[D];for(const J in V){const K=V[J];for(const B in K){const H=K[B];for(const Y in H)u(H[Y].object),delete H[Y];delete K[B]}}delete n[D]}}function M(D){if(n[D.id]===void 0)return;const V=n[D.id];for(const J in V){const K=V[J];for(const B in K){const H=K[B];for(const Y in H)u(H[Y].object),delete H[Y];delete K[B]}}delete n[D.id]}function A(D){for(const V in n){const J=n[V];for(const K in J){const B=J[K];if(B[D.id]===void 0)continue;const H=B[D.id];for(const Y in H)u(H[Y].object),delete H[Y];delete B[D.id]}}}function b(D){for(const V in n){const J=n[V],K=D.isInstancedMesh===!0?D.id:0,B=J[K];if(B!==void 0){for(const H in B){const Y=B[H];for(const pe in Y)u(Y[pe].object),delete Y[pe];delete B[H]}delete J[K],Object.keys(J).length===0&&delete n[V]}}}function E(){P(),a=!0,s!==i&&(s=i,c(s.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:E,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:M,releaseStatesOfObject:b,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function lb(r,e,t){let n;function i(l){n=l}function s(l,c){r.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(r.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let d=0;for(let f=0;f<u;f++)d+=c[f];t.update(d,n,1)}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function cb(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(A){return!(A!==yn&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const b=A===Mi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Tn&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==xn&&!b)}function l(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ie("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ie("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=r.getParameter(r.MAX_SAMPLES),M=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:x,maxFragmentUniforms:y,maxSamples:w,samples:M}}function ub(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Ki,o=new ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const m=h.clippingPlanes,_=h.clipIntersection,g=h.clipShadows,p=r.get(h);if(!i||m===null||m.length===0||s&&!g)s?u(null):c();else{const v=s?0:n,x=v*4;let y=p.clippingState||null;l.value=y,y=u(m,d,x,f);for(let w=0;w!==x;++w)y[w]=t[w];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,m){const _=h!==null?h.length:0;let g=null;if(_!==0){if(g=l.value,m!==!0||g===null){const p=f+_*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let x=0,y=f;x!==_;++x,y+=4)a.copy(h[x]).applyMatrix4(v,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}const es=4,kh=[.125,.215,.35,.446,.526,.582],Ss=20,db=256,Vr=new Aa,Bh=new Fe;let Xc=null,$c=0,qc=0,Yc=!1;const hb=new I;class yu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:a=256,position:o=hb}=s;Xc=this._renderer.getRenderTarget(),$c=this._renderer.getActiveCubeFace(),qc=this._renderer.getActiveMipmapLevel(),Yc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Xc,$c,qc),this._renderer.xr.enabled=Yc,e.scissorTest=!1,lr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===bi||e.mapping===ts?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Xc=this._renderer.getRenderTarget(),$c=this._renderer.getActiveCubeFace(),qc=this._renderer.getActiveMipmapLevel(),Yc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ut,minFilter:Ut,generateMipmaps:!1,type:Mi,format:yn,colorSpace:ca,depthBuffer:!1},i=zh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zh(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=fb(s)),this._blurMaterial=mb(s,e,t),this._ggxMaterial=pb(s,e,t)}return i}_compileMaterial(e){const t=new At(new ct,e);this._renderer.compile(t,Vr)}_sceneToCubeUV(e,t,n,i,s){const l=new nn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Bh),h.toneMapping=ni,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new At(new os,new tn({name:"PMREM.Background",side:bn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let p=!1;const v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,p=!0):(g.color.copy(Bh),p=!0);for(let x=0;x<6;x++){const y=x%3;y===0?(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[x],s.y,s.z)):y===1?(l.up.set(0,0,c[x]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[x],s.z)):(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[x]));const w=this._cubeSize;lr(i,y*w,x>2?w:0,w,w),h.setRenderTarget(i),p&&h.render(_,l),h.render(e,l)}h.toneMapping=f,h.autoClear=d,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===bi||e.mapping===ts;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vh());const s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;lr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Vr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=0+c*1.25,f=h*d,{_lodMax:m}=this,_=this._sizeLods[n],g=3*_*(n>m-es?n-m+es:0),p=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,lr(s,g,p,3*_,2*_),i.setRenderTarget(s),i.render(o,Vr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-n,lr(e,g,p,3*_,2*_),i.setRenderTarget(e),i.render(o,Vr)}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ye("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[i];h.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Ss-1),_=s/m,g=isFinite(s)?1+Math.floor(u*_):Ss;g>Ss&&Ie(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ss}`);const p=[];let v=0;for(let A=0;A<Ss;++A){const b=A/_,E=Math.exp(-b*b/2);p.push(E),A===0?v+=E:A<g&&(v+=2*E)}for(let A=0;A<p.length;A++)p[A]=p[A]/v;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=m,d.mipInt.value=x-n;const y=this._sizeLods[i],w=3*y*(i>x-es?i-x+es:0),M=4*(this._cubeSize-y);lr(t,w,M,3*y,2*y),l.setRenderTarget(t),l.render(h,Vr)}}function fb(r){const e=[],t=[],n=[];let i=r;const s=r-es+1+kh.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>r-es?l=kh[a-r+es-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,m=6,_=3,g=2,p=1,v=new Float32Array(_*m*f),x=new Float32Array(g*m*f),y=new Float32Array(p*m*f);for(let M=0;M<f;M++){const A=M%3*2/3-1,b=M>2?0:-1,E=[A,b,0,A+2/3,b,0,A+2/3,b+1,0,A,b,0,A+2/3,b+1,0,A,b+1,0];v.set(E,_*m*M),x.set(d,g*m*M);const P=[M,M,M,M,M,M];y.set(P,p*m*M)}const w=new ct;w.setAttribute("position",new Rt(v,_)),w.setAttribute("uv",new Rt(x,g)),w.setAttribute("faceIndex",new Rt(y,p)),n.push(new At(w,null)),i>es&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function zh(r,e,t){const n=new Gn(r,e,t);return n.texture.mapping=Mr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function lr(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function pb(r,e,t){return new Hn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:db,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:sc(),fragmentShader:`

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
		`,blending:yi,depthTest:!1,depthWrite:!1})}function mb(r,e,t){const n=new Float32Array(Ss),i=new I(0,1,0);return new Hn({name:"SphericalGaussianBlur",defines:{n:Ss,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:sc(),fragmentShader:`

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
		`,blending:yi,depthTest:!1,depthWrite:!1})}function Vh(){return new Hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sc(),fragmentShader:`

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
		`,blending:yi,depthTest:!1,depthWrite:!1})}function Gh(){return new Hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function sc(){return`

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
	`}class vd extends Gn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Sa(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new os(5,5,5),s=new Hn({name:"CubemapFromEquirect",uniforms:br(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:bn,blending:yi});s.uniforms.tEquirect.value=t;const a=new At(i,s),o=t.minFilter;return t.minFilter===_i&&(t.minFilter=Ut),new Jp(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}function gb(r){let e=new WeakMap,t=new WeakMap,n=null;function i(d,f=!1){return d==null?null:f?a(d):s(d)}function s(d){if(d&&d.isTexture){const f=d.mapping;if(f===qr||f===Yr)if(e.has(d)){const m=e.get(d).texture;return o(m,d.mapping)}else{const m=d.image;if(m&&m.height>0){const _=new vd(m.height);return _.fromEquirectangularTexture(r,d),e.set(d,_),d.addEventListener("dispose",c),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,m=f===qr||f===Yr,_=f===bi||f===ts;if(m||_){let g=t.get(d);const p=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new yu(r)),g=m?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{const v=d.image;return m&&v&&v.height>0||_&&v&&l(v)?(n===null&&(n=new yu(r)),g=m?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",u),g.texture):null}}}return d}function o(d,f){return f===qr?d.mapping=bi:f===Yr&&(d.mapping=ts),d}function l(d){let f=0;const m=6;for(let _=0;_<m;_++)d[_]!==void 0&&f++;return f===m}function c(d){const f=d.target;f.removeEventListener("dispose",c);const m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(d){const f=d.target;f.removeEventListener("dispose",u);const m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:h}}function _b(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&gl("WebGLRenderer: "+n+" extension not supported."),i}}}function vb(r,e,t,n){const i={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],r.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,m=h.attributes.position;let _=0;if(m===void 0)return;if(f!==null){const v=f.array;_=f.version;for(let x=0,y=v.length;x<y;x+=3){const w=v[x+0],M=v[x+1],A=v[x+2];d.push(w,M,M,A,A,w)}}else{const v=m.array;_=m.version;for(let x=0,y=v.length/3-1;x<y;x+=3){const w=x+0,M=x+1,A=x+2;d.push(w,M,M,A,A,w)}}const g=new(m.count>=65535?Xu:Wu)(d,1);g.version=_;const p=s.get(h);p&&e.remove(p),s.set(h,g)}function u(h){const d=s.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function xb(r,e,t){let n;function i(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){r.drawElements(n,d,s,h*a),t.update(d,n,1)}function c(h,d,f){f!==0&&(r.drawElementsInstanced(n,d,s,h*a,f),t.update(d,n,f))}function u(h,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,f);let _=0;for(let g=0;g<f;g++)_+=d[g];t.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function yb(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:Ye("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function bb(r,e,t){const n=new WeakMap,i=new xt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let E=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let x=0;f===!0&&(x=1),m===!0&&(x=2),_===!0&&(x=3);let y=o.attributes.position.count*x,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const M=new Float32Array(y*w*4*h),A=new Nl(M,y,w,h);A.type=xn,A.needsUpdate=!0;const b=x*4;for(let P=0;P<h;P++){const D=g[P],V=p[P],J=v[P],K=y*w*4*P;for(let B=0;B<D.count;B++){const H=B*b;f===!0&&(i.fromBufferAttribute(D,B),M[K+H+0]=i.x,M[K+H+1]=i.y,M[K+H+2]=i.z,M[K+H+3]=0),m===!0&&(i.fromBufferAttribute(V,B),M[K+H+4]=i.x,M[K+H+5]=i.y,M[K+H+6]=i.z,M[K+H+7]=0),_===!0&&(i.fromBufferAttribute(J,B),M[K+H+8]=i.x,M[K+H+9]=i.y,M[K+H+10]=i.z,M[K+H+11]=J.itemSize===4?i.w:1)}}d={count:h,texture:A,size:new de(y,w)},n.set(o,d),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",m),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function Mb(r,e,t,n,i){let s=new WeakMap;function a(c){const u=i.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return d}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const Sb={[Tu]:"LINEAR_TONE_MAPPING",[Au]:"REINHARD_TONE_MAPPING",[Cu]:"CINEON_TONE_MAPPING",[Ru]:"ACES_FILMIC_TONE_MAPPING",[Pu]:"AGX_TONE_MAPPING",[Lu]:"NEUTRAL_TONE_MAPPING",[Iu]:"CUSTOM_TONE_MAPPING"};function wb(r,e,t,n,i){const s=new Gn(e,t,{type:r,depthBuffer:n,stencilBuffer:i,depthTexture:n?new Us(e,t):void 0}),a=new Gn(e,t,{type:Mi,depthBuffer:!1,stencilBuffer:!1}),o=new ct;o.setAttribute("position",new Ge([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Ge([0,2,0,0,2,0],2));const l=new id({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new At(o,l),u=new Aa(-1,1,1,-1,0,1);let h=null,d=null,f=!1,m,_=null,g=[],p=!1;this.setSize=function(v,x){s.setSize(v,x),a.setSize(v,x);for(let y=0;y<g.length;y++){const w=g[y];w.setSize&&w.setSize(v,x)}},this.setEffects=function(v){g=v,p=g.length>0&&g[0].isRenderPass===!0;const x=s.width,y=s.height;for(let w=0;w<g.length;w++){const M=g[w];M.setSize&&M.setSize(x,y)}},this.begin=function(v,x){if(f||v.toneMapping===ni&&g.length===0)return!1;if(_=x,x!==null){const y=x.width,w=x.height;(s.width!==y||s.height!==w)&&this.setSize(y,w)}return p===!1&&v.setRenderTarget(s),m=v.toneMapping,v.toneMapping=ni,!0},this.hasRenderPass=function(){return p},this.end=function(v,x){v.toneMapping=m,f=!0;let y=s,w=a;for(let M=0;M<g.length;M++){const A=g[M];if(A.enabled!==!1&&(A.render(v,w,y,x),A.needsSwap!==!1)){const b=y;y=w,w=b}}if(h!==v.outputColorSpace||d!==v.toneMapping){h=v.outputColorSpace,d=v.toneMapping,l.defines={},_t.getTransfer(h)===Tt&&(l.defines.SRGB_TRANSFER="");const M=Sb[d];M&&(l.defines[M]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,v.setRenderTarget(_),v.render(c,u),_=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const om=new Ft,bu=new Us(1,1),lm=new Nl,cm=new Fl,um=new Sa,Hh=[],Wh=[],Xh=new Float32Array(16),$h=new Float32Array(9),qh=new Float32Array(4);function Cr(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Hh[i];if(s===void 0&&(s=new Float32Array(i),Hh[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function jt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Qt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function rc(r,e){let t=Wh[e];t===void 0&&(t=new Int32Array(e),Wh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Eb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Tb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;r.uniform2fv(this.addr,e),Qt(t,e)}}function Ab(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(jt(t,e))return;r.uniform3fv(this.addr,e),Qt(t,e)}}function Cb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;r.uniform4fv(this.addr,e),Qt(t,e)}}function Rb(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Qt(t,e)}else{if(jt(t,n))return;qh.set(n),r.uniformMatrix2fv(this.addr,!1,qh),Qt(t,n)}}function Ib(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Qt(t,e)}else{if(jt(t,n))return;$h.set(n),r.uniformMatrix3fv(this.addr,!1,$h),Qt(t,n)}}function Pb(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Qt(t,e)}else{if(jt(t,n))return;Xh.set(n),r.uniformMatrix4fv(this.addr,!1,Xh),Qt(t,n)}}function Lb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Db(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;r.uniform2iv(this.addr,e),Qt(t,e)}}function Ub(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;r.uniform3iv(this.addr,e),Qt(t,e)}}function Nb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;r.uniform4iv(this.addr,e),Qt(t,e)}}function Fb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Ob(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;r.uniform2uiv(this.addr,e),Qt(t,e)}}function kb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;r.uniform3uiv(this.addr,e),Qt(t,e)}}function Bb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;r.uniform4uiv(this.addr,e),Qt(t,e)}}function zb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(bu.compareFunction=t.isReversedDepthBuffer()?Ul:Dl,s=bu):s=om,t.setTexture2D(e||s,i)}function Vb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||cm,i)}function Gb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||um,i)}function Hb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||lm,i)}function Wb(r){switch(r){case 5126:return Eb;case 35664:return Tb;case 35665:return Ab;case 35666:return Cb;case 35674:return Rb;case 35675:return Ib;case 35676:return Pb;case 5124:case 35670:return Lb;case 35667:case 35671:return Db;case 35668:case 35672:return Ub;case 35669:case 35673:return Nb;case 5125:return Fb;case 36294:return Ob;case 36295:return kb;case 36296:return Bb;case 35678:case 36198:case 36298:case 36306:case 35682:return zb;case 35679:case 36299:case 36307:return Vb;case 35680:case 36300:case 36308:case 36293:return Gb;case 36289:case 36303:case 36311:case 36292:return Hb}}function Xb(r,e){r.uniform1fv(this.addr,e)}function $b(r,e){const t=Cr(e,this.size,2);r.uniform2fv(this.addr,t)}function qb(r,e){const t=Cr(e,this.size,3);r.uniform3fv(this.addr,t)}function Yb(r,e){const t=Cr(e,this.size,4);r.uniform4fv(this.addr,t)}function Zb(r,e){const t=Cr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Kb(r,e){const t=Cr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Jb(r,e){const t=Cr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function jb(r,e){r.uniform1iv(this.addr,e)}function Qb(r,e){r.uniform2iv(this.addr,e)}function eM(r,e){r.uniform3iv(this.addr,e)}function tM(r,e){r.uniform4iv(this.addr,e)}function nM(r,e){r.uniform1uiv(this.addr,e)}function iM(r,e){r.uniform2uiv(this.addr,e)}function sM(r,e){r.uniform3uiv(this.addr,e)}function rM(r,e){r.uniform4uiv(this.addr,e)}function aM(r,e,t){const n=this.cache,i=e.length,s=rc(t,i);jt(n,s)||(r.uniform1iv(this.addr,s),Qt(n,s));let a;this.type===r.SAMPLER_2D_SHADOW?a=bu:a=om;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,s[o])}function oM(r,e,t){const n=this.cache,i=e.length,s=rc(t,i);jt(n,s)||(r.uniform1iv(this.addr,s),Qt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||cm,s[a])}function lM(r,e,t){const n=this.cache,i=e.length,s=rc(t,i);jt(n,s)||(r.uniform1iv(this.addr,s),Qt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||um,s[a])}function cM(r,e,t){const n=this.cache,i=e.length,s=rc(t,i);jt(n,s)||(r.uniform1iv(this.addr,s),Qt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||lm,s[a])}function uM(r){switch(r){case 5126:return Xb;case 35664:return $b;case 35665:return qb;case 35666:return Yb;case 35674:return Zb;case 35675:return Kb;case 35676:return Jb;case 5124:case 35670:return jb;case 35667:case 35671:return Qb;case 35668:case 35672:return eM;case 35669:case 35673:return tM;case 5125:return nM;case 36294:return iM;case 36295:return sM;case 36296:return rM;case 35678:case 36198:case 36298:case 36306:case 35682:return aM;case 35679:case 36299:case 36307:return oM;case 35680:case 36300:case 36308:case 36293:return lM;case 36289:case 36303:case 36311:case 36292:return cM}}class dM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Wb(t.type)}}class hM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=uM(t.type)}}class fM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const Zc=/(\w+)(\])?(\[|\.)?/g;function Yh(r,e){r.seq.push(e),r.map[e.id]=e}function pM(r,e,t){const n=r.name,i=n.length;for(Zc.lastIndex=0;;){const s=Zc.exec(n),a=Zc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Yh(t,c===void 0?new dM(o,r,e):new hM(o,r,e));break}else{let h=t.map[o];h===void 0&&(h=new fM(o),Yh(t,h)),t=h}}}class Co{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);pM(o,l,this)}const i=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Zh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const mM=37297;let gM=0;function _M(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Kh=new ot;function vM(r){_t._getMatrix(Kh,_t.workingColorSpace,r);const e=`mat3( ${Kh.elements.map(t=>t.toFixed(4))} )`;switch(_t.getTransfer(r)){case ua:return[e,"LinearTransferOETF"];case Tt:return[e,"sRGBTransferOETF"];default:return Ie("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Jh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+_M(r.getShaderSource(e),o)}else return s}function xM(r,e){const t=vM(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const yM={[Tu]:"Linear",[Au]:"Reinhard",[Cu]:"Cineon",[Ru]:"ACESFilmic",[Pu]:"AgX",[Lu]:"Neutral",[Iu]:"Custom"};function bM(r,e){const t=yM[e];return t===void 0?(Ie("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const bo=new I;function MM(){_t.getLuminanceCoefficients(bo);const r=bo.x.toFixed(4),e=bo.y.toFixed(4),t=bo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function SM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xr).join(`
`)}function wM(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function EM(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function Xr(r){return r!==""}function jh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Qh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const TM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mu(r){return r.replace(TM,CM)}const AM=new Map;function CM(r,e){let t=ft[e];if(t===void 0){const n=AM.get(e);if(n!==void 0)t=ft[n],Ie('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Mu(t)}const RM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ef(r){return r.replace(RM,IM)}function IM(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function tf(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const PM={[$r]:"SHADOWMAP_TYPE_PCF",[ur]:"SHADOWMAP_TYPE_VSM"};function LM(r){return PM[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const DM={[bi]:"ENVMAP_TYPE_CUBE",[ts]:"ENVMAP_TYPE_CUBE",[Mr]:"ENVMAP_TYPE_CUBE_UV"};function UM(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":DM[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const NM={[ts]:"ENVMAP_MODE_REFRACTION"};function FM(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":NM[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const OM={[ba]:"ENVMAP_BLENDING_MULTIPLY",[Hf]:"ENVMAP_BLENDING_MIX",[Wf]:"ENVMAP_BLENDING_ADD"};function kM(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":OM[r.combine]||"ENVMAP_BLENDING_NONE"}function BM(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function zM(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=LM(t),c=UM(t),u=FM(t),h=kM(t),d=BM(t),f=SM(t),m=wM(s),_=i.createProgram();let g,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Xr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Xr).join(`
`),p.length>0&&(p+=`
`)):(g=[tf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xr).join(`
`),p=[tf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ni?"#define TONE_MAPPING":"",t.toneMapping!==ni?ft.tonemapping_pars_fragment:"",t.toneMapping!==ni?bM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ft.colorspace_pars_fragment,xM("linearToOutputTexel",t.outputColorSpace),MM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Xr).join(`
`)),a=Mu(a),a=jh(a,t),a=Qh(a,t),o=Mu(o),o=jh(o,t),o=Qh(o,t),a=ef(a),o=ef(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===du?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===du?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=v+g+a,y=v+p+o,w=Zh(i,i.VERTEX_SHADER,x),M=Zh(i,i.FRAGMENT_SHADER,y);i.attachShader(_,w),i.attachShader(_,M),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(D){if(r.debug.checkShaderErrors){const V=i.getProgramInfoLog(_)||"",J=i.getShaderInfoLog(w)||"",K=i.getShaderInfoLog(M)||"",B=V.trim(),H=J.trim(),Y=K.trim();let pe=!0,_e=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(pe=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,w,M);else{const ye=Jh(i,w,"vertex"),Re=Jh(i,M,"fragment");Ye("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+B+`
`+ye+`
`+Re)}else B!==""?Ie("WebGLProgram: Program Info Log:",B):(H===""||Y==="")&&(_e=!1);_e&&(D.diagnostics={runnable:pe,programLog:B,vertexShader:{log:H,prefix:g},fragmentShader:{log:Y,prefix:p}})}i.deleteShader(w),i.deleteShader(M),b=new Co(i,_),E=EM(i,_)}let b;this.getUniforms=function(){return b===void 0&&A(this),b};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(_,mM)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=gM++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=M,this}let VM=0;class GM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new HM(e),t.set(e,n)),n}}class HM{constructor(e){this.id=VM++,this.code=e,this.usedTimes=0}}function WM(r){return r===ns||r===ra||r===aa}function XM(r,e,t,n,i,s){const a=new Ol,o=new GM,l=new Set,c=[],u=new Map,h=n.logarithmicDepthBuffer;let d=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(b){return l.add(b),b===0?"uv":`uv${b}`}function _(b,E,P,D,V,J){const K=D.fog,B=V.geometry,H=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?D.environment:null,Y=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,pe=e.get(b.envMap||H,Y),_e=pe&&pe.mapping===Mr?pe.image.height:null,ye=f[b.type];b.precision!==null&&(d=n.getMaxPrecision(b.precision),d!==b.precision&&Ie("WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const Re=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,le=Re!==void 0?Re.length:0;let Ee=0;B.morphAttributes.position!==void 0&&(Ee=1),B.morphAttributes.normal!==void 0&&(Ee=2),B.morphAttributes.color!==void 0&&(Ee=3);let Be,Le,re,Ae;if(ye){const we=_n[ye];Be=we.vertexShader,Le=we.fragmentShader}else Be=b.vertexShader,Le=b.fragmentShader,o.update(b),re=o.getVertexShaderID(b),Ae=o.getFragmentShaderID(b);const xe=r.getRenderTarget(),Xe=r.state.buffers.depth.getReversed(),ne=V.isInstancedMesh===!0,N=V.isBatchedMesh===!0,U=!!b.map,k=!!b.matcap,Q=!!pe,Z=!!b.aoMap,se=!!b.lightMap,ce=!!b.bumpMap,he=!!b.normalMap,qe=!!b.displacementMap,F=!!b.emissiveMap,nt=!!b.metalnessMap,ze=!!b.roughnessMap,et=b.anisotropy>0,ve=b.clearcoat>0,St=b.dispersion>0,C=b.iridescence>0,S=b.sheen>0,$=b.transmission>0,oe=et&&!!b.anisotropyMap,ge=ve&&!!b.clearcoatMap,be=ve&&!!b.clearcoatNormalMap,Te=ve&&!!b.clearcoatRoughnessMap,ae=C&&!!b.iridescenceMap,ue=C&&!!b.iridescenceThicknessMap,De=S&&!!b.sheenColorMap,Ve=S&&!!b.sheenRoughnessMap,Ce=!!b.specularMap,Me=!!b.specularColorMap,at=!!b.specularIntensityMap,lt=$&&!!b.transmissionMap,vt=$&&!!b.thicknessMap,z=!!b.gradientMap,Se=!!b.alphaMap,L=b.alphaTest>0,O=!!b.alphaHash,G=!!b.extensions;let te=ni;b.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(te=r.toneMapping);const me={shaderID:ye,shaderType:b.type,shaderName:b.name,vertexShader:Be,fragmentShader:Le,defines:b.defines,customVertexShaderID:re,customFragmentShaderID:Ae,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:N,batchingColor:N&&V._colorsTexture!==null,instancing:ne,instancingColor:ne&&V.instanceColor!==null,instancingMorph:ne&&V.morphTexture!==null,outputColorSpace:xe===null?r.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:_t.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:U,matcap:k,envMap:Q,envMapMode:Q&&pe.mapping,envMapCubeUVHeight:_e,aoMap:Z,lightMap:se,bumpMap:ce,normalMap:he,displacementMap:qe,emissiveMap:F,normalMapObjectSpace:he&&b.normalMapType===Kf,normalMapTangentSpace:he&&b.normalMapType===Oi,packedNormalMap:he&&b.normalMapType===Oi&&WM(b.normalMap.format),metalnessMap:nt,roughnessMap:ze,anisotropy:et,anisotropyMap:oe,clearcoat:ve,clearcoatMap:ge,clearcoatNormalMap:be,clearcoatRoughnessMap:Te,dispersion:St,iridescence:C,iridescenceMap:ae,iridescenceThicknessMap:ue,sheen:S,sheenColorMap:De,sheenRoughnessMap:Ve,specularMap:Ce,specularColorMap:Me,specularIntensityMap:at,transmission:$,transmissionMap:lt,thicknessMap:vt,gradientMap:z,opaque:b.transparent===!1&&b.blending===Cs&&b.alphaToCoverage===!1,alphaMap:Se,alphaTest:L,alphaHash:O,combine:b.combine,mapUv:U&&m(b.map.channel),aoMapUv:Z&&m(b.aoMap.channel),lightMapUv:se&&m(b.lightMap.channel),bumpMapUv:ce&&m(b.bumpMap.channel),normalMapUv:he&&m(b.normalMap.channel),displacementMapUv:qe&&m(b.displacementMap.channel),emissiveMapUv:F&&m(b.emissiveMap.channel),metalnessMapUv:nt&&m(b.metalnessMap.channel),roughnessMapUv:ze&&m(b.roughnessMap.channel),anisotropyMapUv:oe&&m(b.anisotropyMap.channel),clearcoatMapUv:ge&&m(b.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&m(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ae&&m(b.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&m(b.iridescenceThicknessMap.channel),sheenColorMapUv:De&&m(b.sheenColorMap.channel),sheenRoughnessMapUv:Ve&&m(b.sheenRoughnessMap.channel),specularMapUv:Ce&&m(b.specularMap.channel),specularColorMapUv:Me&&m(b.specularColorMap.channel),specularIntensityMapUv:at&&m(b.specularIntensityMap.channel),transmissionMapUv:lt&&m(b.transmissionMap.channel),thicknessMapUv:vt&&m(b.thicknessMap.channel),alphaMapUv:Se&&m(b.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(he||et),vertexNormals:!!B.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!B.attributes.uv&&(U||Se),fog:!!K,useFog:b.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||B.attributes.normal===void 0&&he===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Xe,skinning:V.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:Ee,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:J.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:te,decodeVideoTexture:U&&b.map.isVideoTexture===!0&&_t.getTransfer(b.map.colorSpace)===Tt,decodeVideoTextureEmissive:F&&b.emissiveMap.isVideoTexture===!0&&_t.getTransfer(b.emissiveMap.colorSpace)===Tt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===mi,flipSided:b.side===bn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:G&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(G&&b.extensions.multiDraw===!0||N)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return me.vertexUv1s=l.has(1),me.vertexUv2s=l.has(2),me.vertexUv3s=l.has(3),l.clear(),me}function g(b){const E=[];if(b.shaderID?E.push(b.shaderID):(E.push(b.customVertexShaderID),E.push(b.customFragmentShaderID)),b.defines!==void 0)for(const P in b.defines)E.push(P),E.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(p(E,b),v(E,b),E.push(r.outputColorSpace)),E.push(b.customProgramCacheKey),E.join()}function p(b,E){b.push(E.precision),b.push(E.outputColorSpace),b.push(E.envMapMode),b.push(E.envMapCubeUVHeight),b.push(E.mapUv),b.push(E.alphaMapUv),b.push(E.lightMapUv),b.push(E.aoMapUv),b.push(E.bumpMapUv),b.push(E.normalMapUv),b.push(E.displacementMapUv),b.push(E.emissiveMapUv),b.push(E.metalnessMapUv),b.push(E.roughnessMapUv),b.push(E.anisotropyMapUv),b.push(E.clearcoatMapUv),b.push(E.clearcoatNormalMapUv),b.push(E.clearcoatRoughnessMapUv),b.push(E.iridescenceMapUv),b.push(E.iridescenceThicknessMapUv),b.push(E.sheenColorMapUv),b.push(E.sheenRoughnessMapUv),b.push(E.specularMapUv),b.push(E.specularColorMapUv),b.push(E.specularIntensityMapUv),b.push(E.transmissionMapUv),b.push(E.thicknessMapUv),b.push(E.combine),b.push(E.fogExp2),b.push(E.sizeAttenuation),b.push(E.morphTargetsCount),b.push(E.morphAttributeCount),b.push(E.numDirLights),b.push(E.numPointLights),b.push(E.numSpotLights),b.push(E.numSpotLightMaps),b.push(E.numHemiLights),b.push(E.numRectAreaLights),b.push(E.numDirLightShadows),b.push(E.numPointLightShadows),b.push(E.numSpotLightShadows),b.push(E.numSpotLightShadowsWithMaps),b.push(E.numLightProbes),b.push(E.shadowMapType),b.push(E.toneMapping),b.push(E.numClippingPlanes),b.push(E.numClipIntersection),b.push(E.depthPacking)}function v(b,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),b.push(a.mask)}function x(b){const E=f[b.type];let P;if(E){const D=_n[E];P=tc.clone(D.uniforms)}else P=b.uniforms;return P}function y(b,E){let P=u.get(E);return P!==void 0?++P.usedTimes:(P=new zM(r,E,b,i),c.push(P),u.set(E,P)),P}function w(b){if(--b.usedTimes===0){const E=c.indexOf(b);c[E]=c[c.length-1],c.pop(),u.delete(b.cacheKey),b.destroy()}}function M(b){o.remove(b)}function A(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:x,acquireProgram:y,releaseProgram:w,releaseShaderCache:M,programs:c,dispose:A}}function $M(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function qM(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function nf(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function sf(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,m,_,g,p){let v=r[e];return v===void 0?(v={id:d.id,object:d,geometry:f,material:m,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:g,group:p},r[e]=v):(v.id=d.id,v.object=d,v.geometry=f,v.material=m,v.materialVariant=a(d),v.groupOrder=_,v.renderOrder=d.renderOrder,v.z=g,v.group=p),e++,v}function l(d,f,m,_,g,p){const v=o(d,f,m,_,g,p);m.transmission>0?n.push(v):m.transparent===!0?i.push(v):t.push(v)}function c(d,f,m,_,g,p){const v=o(d,f,m,_,g,p);m.transmission>0?n.unshift(v):m.transparent===!0?i.unshift(v):t.unshift(v)}function u(d,f){t.length>1&&t.sort(d||qM),n.length>1&&n.sort(f||nf),i.length>1&&i.sort(f||nf)}function h(){for(let d=e,f=r.length;d<f;d++){const m=r[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:l,unshift:c,finish:h,sort:u}}function YM(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new sf,r.set(n,[a])):i>=s.length?(a=new sf,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function ZM(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Fe};break;case"SpotLight":t={position:new I,direction:new I,color:new Fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Fe,groundColor:new Fe};break;case"RectAreaLight":t={color:new Fe,position:new I,halfWidth:new I,halfHeight:new I};break}return r[e.id]=t,t}}}function KM(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let JM=0;function jM(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function QM(r){const e=new ZM,t=KM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const i=new I,s=new st,a=new st;function o(c){let u=0,h=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,v=0,x=0,y=0,w=0,M=0,A=0;c.sort(jM);for(let E=0,P=c.length;E<P;E++){const D=c[E],V=D.color,J=D.intensity,K=D.distance;let B=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===ns?B=D.shadow.map.texture:B=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=V.r*J,h+=V.g*J,d+=V.b*J;else if(D.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(D.sh.coefficients[H],J);A++}else if(D.isDirectionalLight){const H=e.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Y=D.shadow,pe=t.get(D);pe.shadowIntensity=Y.intensity,pe.shadowBias=Y.bias,pe.shadowNormalBias=Y.normalBias,pe.shadowRadius=Y.radius,pe.shadowMapSize=Y.mapSize,n.directionalShadow[f]=pe,n.directionalShadowMap[f]=B,n.directionalShadowMatrix[f]=D.shadow.matrix,v++}n.directional[f]=H,f++}else if(D.isSpotLight){const H=e.get(D);H.position.setFromMatrixPosition(D.matrixWorld),H.color.copy(V).multiplyScalar(J),H.distance=K,H.coneCos=Math.cos(D.angle),H.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),H.decay=D.decay,n.spot[_]=H;const Y=D.shadow;if(D.map&&(n.spotLightMap[w]=D.map,w++,Y.updateMatrices(D),D.castShadow&&M++),n.spotLightMatrix[_]=Y.matrix,D.castShadow){const pe=t.get(D);pe.shadowIntensity=Y.intensity,pe.shadowBias=Y.bias,pe.shadowNormalBias=Y.normalBias,pe.shadowRadius=Y.radius,pe.shadowMapSize=Y.mapSize,n.spotShadow[_]=pe,n.spotShadowMap[_]=B,y++}_++}else if(D.isRectAreaLight){const H=e.get(D);H.color.copy(V).multiplyScalar(J),H.halfWidth.set(D.width*.5,0,0),H.halfHeight.set(0,D.height*.5,0),n.rectArea[g]=H,g++}else if(D.isPointLight){const H=e.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),H.distance=D.distance,H.decay=D.decay,D.castShadow){const Y=D.shadow,pe=t.get(D);pe.shadowIntensity=Y.intensity,pe.shadowBias=Y.bias,pe.shadowNormalBias=Y.normalBias,pe.shadowRadius=Y.radius,pe.shadowMapSize=Y.mapSize,pe.shadowCameraNear=Y.camera.near,pe.shadowCameraFar=Y.camera.far,n.pointShadow[m]=pe,n.pointShadowMap[m]=B,n.pointShadowMatrix[m]=D.shadow.matrix,x++}n.point[m]=H,m++}else if(D.isHemisphereLight){const H=e.get(D);H.skyColor.copy(D.color).multiplyScalar(J),H.groundColor.copy(D.groundColor).multiplyScalar(J),n.hemi[p]=H,p++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pe.LTC_FLOAT_1,n.rectAreaLTC2=Pe.LTC_FLOAT_2):(n.rectAreaLTC1=Pe.LTC_HALF_1,n.rectAreaLTC2=Pe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const b=n.hash;(b.directionalLength!==f||b.pointLength!==m||b.spotLength!==_||b.rectAreaLength!==g||b.hemiLength!==p||b.numDirectionalShadows!==v||b.numPointShadows!==x||b.numSpotShadows!==y||b.numSpotMaps!==w||b.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=y+w-M,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=A,b.directionalLength=f,b.pointLength=m,b.spotLength=_,b.rectAreaLength=g,b.hemiLength=p,b.numDirectionalShadows=v,b.numPointShadows=x,b.numSpotShadows=y,b.numSpotMaps=w,b.numLightProbes=A,n.version=JM++)}function l(c,u){let h=0,d=0,f=0,m=0,_=0;const g=u.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const x=c[p];if(x.isDirectionalLight){const y=n.directional[h];y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),h++}else if(x.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(x.isRectAreaLight){const y=n.rectArea[m];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),a.identity(),s.copy(x.matrixWorld),s.premultiply(g),a.extractRotation(s),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),m++}else if(x.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),d++}else if(x.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(g),_++}}}return{setup:o,setupView:l,state:n}}function rf(r){const e=new QM(r),t=[],n=[],i=[];function s(d){h.camera=d,t.length=0,n.length=0,i.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){i.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const h={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function eS(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new rf(r),e.set(i,[o])):s>=a.length?(o=new rf(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const tS=`void main() {
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
}`,iS=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],sS=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],af=new st,Gr=new I,Kc=new I;function rS(r,e,t){let n=new wr;const i=new de,s=new de,a=new xt,o=new rd,l=new ad,c={},u=t.maxTextureSize,h={[Fi]:bn,[bn]:Fi,[mi]:mi},d=new Hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:tS,fragmentShader:nS}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new ct;m.setAttribute("position",new Rt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new At(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$r;let p=this.type;this.render=function(M,A,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||M.length===0)return;this.type===wf&&(Ie("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=$r);const E=r.getRenderTarget(),P=r.getActiveCubeFace(),D=r.getActiveMipmapLevel(),V=r.state;V.setBlending(yi),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const J=p!==this.type;J&&A.traverse(function(K){K.material&&(Array.isArray(K.material)?K.material.forEach(B=>B.needsUpdate=!0):K.material.needsUpdate=!0)});for(let K=0,B=M.length;K<B;K++){const H=M[K],Y=H.shadow;if(Y===void 0){Ie("WebGLShadowMap:",H,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;i.copy(Y.mapSize);const pe=Y.getFrameExtents();i.multiply(pe),s.copy(Y.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/pe.x),i.x=s.x*pe.x,Y.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/pe.y),i.y=s.y*pe.y,Y.mapSize.y=s.y));const _e=r.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=_e,Y.map===null||J===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===ur){if(H.isPointLight){Ie("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new Gn(i.x,i.y,{format:ns,type:Mi,minFilter:Ut,magFilter:Ut,generateMipmaps:!1}),Y.map.texture.name=H.name+".shadowMap",Y.map.depthTexture=new Us(i.x,i.y,xn),Y.map.depthTexture.name=H.name+".shadowMapDepth",Y.map.depthTexture.format=Si,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Wt,Y.map.depthTexture.magFilter=Wt}else H.isPointLight?(Y.map=new vd(i.x),Y.map.depthTexture=new _p(i.x,$n)):(Y.map=new Gn(i.x,i.y),Y.map.depthTexture=new Us(i.x,i.y,$n)),Y.map.depthTexture.name=H.name+".shadowMap",Y.map.depthTexture.format=Si,this.type===$r?(Y.map.depthTexture.compareFunction=_e?Ul:Dl,Y.map.depthTexture.minFilter=Ut,Y.map.depthTexture.magFilter=Ut):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Wt,Y.map.depthTexture.magFilter=Wt);Y.camera.updateProjectionMatrix()}const ye=Y.map.isWebGLCubeRenderTarget?6:1;for(let Re=0;Re<ye;Re++){if(Y.map.isWebGLCubeRenderTarget)r.setRenderTarget(Y.map,Re),r.clear();else{Re===0&&(r.setRenderTarget(Y.map),r.clear());const le=Y.getViewport(Re);a.set(s.x*le.x,s.y*le.y,s.x*le.z,s.y*le.w),V.viewport(a)}if(H.isPointLight){const le=Y.camera,Ee=Y.matrix,Be=H.distance||le.far;Be!==le.far&&(le.far=Be,le.updateProjectionMatrix()),Gr.setFromMatrixPosition(H.matrixWorld),le.position.copy(Gr),Kc.copy(le.position),Kc.add(iS[Re]),le.up.copy(sS[Re]),le.lookAt(Kc),le.updateMatrixWorld(),Ee.makeTranslation(-Gr.x,-Gr.y,-Gr.z),af.multiplyMatrices(le.projectionMatrix,le.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(af,le.coordinateSystem,le.reversedDepth)}else Y.updateMatrices(H);n=Y.getFrustum(),y(A,b,Y.camera,H,this.type)}Y.isPointLightShadow!==!0&&this.type===ur&&v(Y,b),Y.needsUpdate=!1}p=this.type,g.needsUpdate=!1,r.setRenderTarget(E,P,D)};function v(M,A){const b=e.update(_);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Gn(i.x,i.y,{format:ns,type:Mi})),d.uniforms.shadow_pass.value=M.map.depthTexture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,r.setRenderTarget(M.mapPass),r.clear(),r.renderBufferDirect(A,null,b,d,_,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,r.setRenderTarget(M.map),r.clear(),r.renderBufferDirect(A,null,b,f,_,null)}function x(M,A,b,E){let P=null;const D=b.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(D!==void 0)P=D;else if(P=b.isPointLight===!0?l:o,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const V=P.uuid,J=A.uuid;let K=c[V];K===void 0&&(K={},c[V]=K);let B=K[J];B===void 0&&(B=P.clone(),K[J]=B,A.addEventListener("dispose",w)),P=B}if(P.visible=A.visible,P.wireframe=A.wireframe,E===ur?P.side=A.shadowSide!==null?A.shadowSide:A.side:P.side=A.shadowSide!==null?A.shadowSide:h[A.side],P.alphaMap=A.alphaMap,P.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,P.map=A.map,P.clipShadows=A.clipShadows,P.clippingPlanes=A.clippingPlanes,P.clipIntersection=A.clipIntersection,P.displacementMap=A.displacementMap,P.displacementScale=A.displacementScale,P.displacementBias=A.displacementBias,P.wireframeLinewidth=A.wireframeLinewidth,P.linewidth=A.linewidth,b.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const V=r.properties.get(P);V.light=b}return P}function y(M,A,b,E,P){if(M.visible===!1)return;if(M.layers.test(A.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&P===ur)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,M.matrixWorld);const J=e.update(M),K=M.material;if(Array.isArray(K)){const B=J.groups;for(let H=0,Y=B.length;H<Y;H++){const pe=B[H],_e=K[pe.materialIndex];if(_e&&_e.visible){const ye=x(M,_e,E,P);M.onBeforeShadow(r,M,A,b,J,ye,pe),r.renderBufferDirect(b,null,J,ye,M,pe),M.onAfterShadow(r,M,A,b,J,ye,pe)}}}else if(K.visible){const B=x(M,K,E,P);M.onBeforeShadow(r,M,A,b,J,B,null),r.renderBufferDirect(b,null,J,B,M,null),M.onAfterShadow(r,M,A,b,J,B,null)}}const V=M.children;for(let J=0,K=V.length;J<K;J++)y(V[J],A,b,E,P)}function w(M){M.target.removeEventListener("dispose",w);for(const b in c){const E=c[b],P=M.target.uuid;P in E&&(E[P].dispose(),delete E[P])}}}function aS(r,e){function t(){let z=!1;const Se=new xt;let L=null;const O=new xt(0,0,0,0);return{setMask:function(G){L!==G&&!z&&(r.colorMask(G,G,G,G),L=G)},setLocked:function(G){z=G},setClear:function(G,te,me,we,it){it===!0&&(G*=we,te*=we,me*=we),Se.set(G,te,me,we),O.equals(Se)===!1&&(r.clearColor(G,te,me,we),O.copy(Se))},reset:function(){z=!1,L=null,O.set(-1,0,0,0)}}}function n(){let z=!1,Se=!1,L=null,O=null,G=null;return{setReversed:function(te){if(Se!==te){const me=e.get("EXT_clip_control");te?me.clipControlEXT(me.LOWER_LEFT_EXT,me.ZERO_TO_ONE_EXT):me.clipControlEXT(me.LOWER_LEFT_EXT,me.NEGATIVE_ONE_TO_ONE_EXT),Se=te;const we=G;G=null,this.setClear(we)}},getReversed:function(){return Se},setTest:function(te){te?xe(r.DEPTH_TEST):Xe(r.DEPTH_TEST)},setMask:function(te){L!==te&&!z&&(r.depthMask(te),L=te)},setFunc:function(te){if(Se&&(te=Eg[te]),O!==te){switch(te){case Lo:r.depthFunc(r.NEVER);break;case Do:r.depthFunc(r.ALWAYS);break;case Uo:r.depthFunc(r.LESS);break;case Ls:r.depthFunc(r.LEQUAL);break;case No:r.depthFunc(r.EQUAL);break;case Fo:r.depthFunc(r.GEQUAL);break;case Oo:r.depthFunc(r.GREATER);break;case ko:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}O=te}},setLocked:function(te){z=te},setClear:function(te){G!==te&&(G=te,Se&&(te=1-te),r.clearDepth(te))},reset:function(){z=!1,L=null,O=null,G=null,Se=!1}}}function i(){let z=!1,Se=null,L=null,O=null,G=null,te=null,me=null,we=null,it=null;return{setTest:function(tt){z||(tt?xe(r.STENCIL_TEST):Xe(r.STENCIL_TEST))},setMask:function(tt){Se!==tt&&!z&&(r.stencilMask(tt),Se=tt)},setFunc:function(tt,$e,mt){(L!==tt||O!==$e||G!==mt)&&(r.stencilFunc(tt,$e,mt),L=tt,O=$e,G=mt)},setOp:function(tt,$e,mt){(te!==tt||me!==$e||we!==mt)&&(r.stencilOp(tt,$e,mt),te=tt,me=$e,we=mt)},setLocked:function(tt){z=tt},setClear:function(tt){it!==tt&&(r.clearStencil(tt),it=tt)},reset:function(){z=!1,Se=null,L=null,O=null,G=null,te=null,me=null,we=null,it=null}}}const s=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let u={},h={},d={},f=new WeakMap,m=[],_=null,g=!1,p=null,v=null,x=null,y=null,w=null,M=null,A=null,b=new Fe(0,0,0),E=0,P=!1,D=null,V=null,J=null,K=null,B=null;const H=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,pe=0;const _e=r.getParameter(r.VERSION);_e.indexOf("WebGL")!==-1?(pe=parseFloat(/^WebGL (\d)/.exec(_e)[1]),Y=pe>=1):_e.indexOf("OpenGL ES")!==-1&&(pe=parseFloat(/^OpenGL ES (\d)/.exec(_e)[1]),Y=pe>=2);let ye=null,Re={};const le=r.getParameter(r.SCISSOR_BOX),Ee=r.getParameter(r.VIEWPORT),Be=new xt().fromArray(le),Le=new xt().fromArray(Ee);function re(z,Se,L,O){const G=new Uint8Array(4),te=r.createTexture();r.bindTexture(z,te),r.texParameteri(z,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(z,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let me=0;me<L;me++)z===r.TEXTURE_3D||z===r.TEXTURE_2D_ARRAY?r.texImage3D(Se,0,r.RGBA,1,1,O,0,r.RGBA,r.UNSIGNED_BYTE,G):r.texImage2D(Se+me,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,G);return te}const Ae={};Ae[r.TEXTURE_2D]=re(r.TEXTURE_2D,r.TEXTURE_2D,1),Ae[r.TEXTURE_CUBE_MAP]=re(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ae[r.TEXTURE_2D_ARRAY]=re(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ae[r.TEXTURE_3D]=re(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),xe(r.DEPTH_TEST),a.setFunc(Ls),ce(!1),he(su),xe(r.CULL_FACE),Z(yi);function xe(z){u[z]!==!0&&(r.enable(z),u[z]=!0)}function Xe(z){u[z]!==!1&&(r.disable(z),u[z]=!1)}function ne(z,Se){return d[z]!==Se?(r.bindFramebuffer(z,Se),d[z]=Se,z===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=Se),z===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=Se),!0):!1}function N(z,Se){let L=m,O=!1;if(z){L=f.get(Se),L===void 0&&(L=[],f.set(Se,L));const G=z.textures;if(L.length!==G.length||L[0]!==r.COLOR_ATTACHMENT0){for(let te=0,me=G.length;te<me;te++)L[te]=r.COLOR_ATTACHMENT0+te;L.length=G.length,O=!0}}else L[0]!==r.BACK&&(L[0]=r.BACK,O=!0);O&&r.drawBuffers(L)}function U(z){return _!==z?(r.useProgram(z),_=z,!0):!1}const k={[Ji]:r.FUNC_ADD,[Tf]:r.FUNC_SUBTRACT,[Af]:r.FUNC_REVERSE_SUBTRACT};k[Cf]=r.MIN,k[Rf]=r.MAX;const Q={[If]:r.ZERO,[Pf]:r.ONE,[Lf]:r.SRC_COLOR,[Io]:r.SRC_ALPHA,[kf]:r.SRC_ALPHA_SATURATE,[Ff]:r.DST_COLOR,[Uf]:r.DST_ALPHA,[Df]:r.ONE_MINUS_SRC_COLOR,[Po]:r.ONE_MINUS_SRC_ALPHA,[Of]:r.ONE_MINUS_DST_COLOR,[Nf]:r.ONE_MINUS_DST_ALPHA,[Bf]:r.CONSTANT_COLOR,[zf]:r.ONE_MINUS_CONSTANT_COLOR,[Vf]:r.CONSTANT_ALPHA,[Gf]:r.ONE_MINUS_CONSTANT_ALPHA};function Z(z,Se,L,O,G,te,me,we,it,tt){if(z===yi){g===!0&&(Xe(r.BLEND),g=!1);return}if(g===!1&&(xe(r.BLEND),g=!0),z!==Ef){if(z!==p||tt!==P){if((v!==Ji||w!==Ji)&&(r.blendEquation(r.FUNC_ADD),v=Ji,w=Ji),tt)switch(z){case Cs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ru:r.blendFunc(r.ONE,r.ONE);break;case au:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ou:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ye("WebGLState: Invalid blending: ",z);break}else switch(z){case Cs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ru:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case au:Ye("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ou:Ye("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ye("WebGLState: Invalid blending: ",z);break}x=null,y=null,M=null,A=null,b.set(0,0,0),E=0,p=z,P=tt}return}G=G||Se,te=te||L,me=me||O,(Se!==v||G!==w)&&(r.blendEquationSeparate(k[Se],k[G]),v=Se,w=G),(L!==x||O!==y||te!==M||me!==A)&&(r.blendFuncSeparate(Q[L],Q[O],Q[te],Q[me]),x=L,y=O,M=te,A=me),(we.equals(b)===!1||it!==E)&&(r.blendColor(we.r,we.g,we.b,it),b.copy(we),E=it),p=z,P=!1}function se(z,Se){z.side===mi?Xe(r.CULL_FACE):xe(r.CULL_FACE);let L=z.side===bn;Se&&(L=!L),ce(L),z.blending===Cs&&z.transparent===!1?Z(yi):Z(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),s.setMask(z.colorWrite);const O=z.stencilWrite;o.setTest(O),O&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),F(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?xe(r.SAMPLE_ALPHA_TO_COVERAGE):Xe(r.SAMPLE_ALPHA_TO_COVERAGE)}function ce(z){D!==z&&(z?r.frontFace(r.CW):r.frontFace(r.CCW),D=z)}function he(z){z!==Mf?(xe(r.CULL_FACE),z!==V&&(z===su?r.cullFace(r.BACK):z===Sf?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Xe(r.CULL_FACE),V=z}function qe(z){z!==J&&(Y&&r.lineWidth(z),J=z)}function F(z,Se,L){z?(xe(r.POLYGON_OFFSET_FILL),(K!==Se||B!==L)&&(K=Se,B=L,a.getReversed()&&(Se=-Se),r.polygonOffset(Se,L))):Xe(r.POLYGON_OFFSET_FILL)}function nt(z){z?xe(r.SCISSOR_TEST):Xe(r.SCISSOR_TEST)}function ze(z){z===void 0&&(z=r.TEXTURE0+H-1),ye!==z&&(r.activeTexture(z),ye=z)}function et(z,Se,L){L===void 0&&(ye===null?L=r.TEXTURE0+H-1:L=ye);let O=Re[L];O===void 0&&(O={type:void 0,texture:void 0},Re[L]=O),(O.type!==z||O.texture!==Se)&&(ye!==L&&(r.activeTexture(L),ye=L),r.bindTexture(z,Se||Ae[z]),O.type=z,O.texture=Se)}function ve(){const z=Re[ye];z!==void 0&&z.type!==void 0&&(r.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function St(){try{r.compressedTexImage2D(...arguments)}catch(z){Ye("WebGLState:",z)}}function C(){try{r.compressedTexImage3D(...arguments)}catch(z){Ye("WebGLState:",z)}}function S(){try{r.texSubImage2D(...arguments)}catch(z){Ye("WebGLState:",z)}}function $(){try{r.texSubImage3D(...arguments)}catch(z){Ye("WebGLState:",z)}}function oe(){try{r.compressedTexSubImage2D(...arguments)}catch(z){Ye("WebGLState:",z)}}function ge(){try{r.compressedTexSubImage3D(...arguments)}catch(z){Ye("WebGLState:",z)}}function be(){try{r.texStorage2D(...arguments)}catch(z){Ye("WebGLState:",z)}}function Te(){try{r.texStorage3D(...arguments)}catch(z){Ye("WebGLState:",z)}}function ae(){try{r.texImage2D(...arguments)}catch(z){Ye("WebGLState:",z)}}function ue(){try{r.texImage3D(...arguments)}catch(z){Ye("WebGLState:",z)}}function De(z){return h[z]!==void 0?h[z]:r.getParameter(z)}function Ve(z,Se){h[z]!==Se&&(r.pixelStorei(z,Se),h[z]=Se)}function Ce(z){Be.equals(z)===!1&&(r.scissor(z.x,z.y,z.z,z.w),Be.copy(z))}function Me(z){Le.equals(z)===!1&&(r.viewport(z.x,z.y,z.z,z.w),Le.copy(z))}function at(z,Se){let L=c.get(Se);L===void 0&&(L=new WeakMap,c.set(Se,L));let O=L.get(z);O===void 0&&(O=r.getUniformBlockIndex(Se,z.name),L.set(z,O))}function lt(z,Se){const O=c.get(Se).get(z);l.get(Se)!==O&&(r.uniformBlockBinding(Se,O,z.__bindingPointIndex),l.set(Se,O))}function vt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),u={},h={},ye=null,Re={},d={},f=new WeakMap,m=[],_=null,g=!1,p=null,v=null,x=null,y=null,w=null,M=null,A=null,b=new Fe(0,0,0),E=0,P=!1,D=null,V=null,J=null,K=null,B=null,Be.set(0,0,r.canvas.width,r.canvas.height),Le.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:xe,disable:Xe,bindFramebuffer:ne,drawBuffers:N,useProgram:U,setBlending:Z,setMaterial:se,setFlipSided:ce,setCullFace:he,setLineWidth:qe,setPolygonOffset:F,setScissorTest:nt,activeTexture:ze,bindTexture:et,unbindTexture:ve,compressedTexImage2D:St,compressedTexImage3D:C,texImage2D:ae,texImage3D:ue,pixelStorei:Ve,getParameter:De,updateUBOMapping:at,uniformBlockBinding:lt,texStorage2D:be,texStorage3D:Te,texSubImage2D:S,texSubImage3D:$,compressedTexSubImage2D:oe,compressedTexSubImage3D:ge,scissor:Ce,viewport:Me,reset:vt}}function oS(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new de,u=new WeakMap,h=new Set;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,S){return m?new OffscreenCanvas(C,S):ha("canvas")}function g(C,S,$){let oe=1;const ge=St(C);if((ge.width>$||ge.height>$)&&(oe=$/Math.max(ge.width,ge.height)),oe<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const be=Math.floor(oe*ge.width),Te=Math.floor(oe*ge.height);d===void 0&&(d=_(be,Te));const ae=S?_(be,Te):d;return ae.width=be,ae.height=Te,ae.getContext("2d").drawImage(C,0,0,be,Te),Ie("WebGLRenderer: Texture has been resized from ("+ge.width+"x"+ge.height+") to ("+be+"x"+Te+")."),ae}else return"data"in C&&Ie("WebGLRenderer: Image in DataTexture is too big ("+ge.width+"x"+ge.height+")."),C;return C}function p(C){return C.generateMipmaps}function v(C){r.generateMipmap(C)}function x(C){return C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?r.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(C,S,$,oe,ge,be=!1){if(C!==null){if(r[C]!==void 0)return r[C];Ie("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Te;oe&&(Te=e.get("EXT_texture_norm16"),Te||Ie("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ae=S;if(S===r.RED&&($===r.FLOAT&&(ae=r.R32F),$===r.HALF_FLOAT&&(ae=r.R16F),$===r.UNSIGNED_BYTE&&(ae=r.R8),$===r.UNSIGNED_SHORT&&Te&&(ae=Te.R16_EXT),$===r.SHORT&&Te&&(ae=Te.R16_SNORM_EXT)),S===r.RED_INTEGER&&($===r.UNSIGNED_BYTE&&(ae=r.R8UI),$===r.UNSIGNED_SHORT&&(ae=r.R16UI),$===r.UNSIGNED_INT&&(ae=r.R32UI),$===r.BYTE&&(ae=r.R8I),$===r.SHORT&&(ae=r.R16I),$===r.INT&&(ae=r.R32I)),S===r.RG&&($===r.FLOAT&&(ae=r.RG32F),$===r.HALF_FLOAT&&(ae=r.RG16F),$===r.UNSIGNED_BYTE&&(ae=r.RG8),$===r.UNSIGNED_SHORT&&Te&&(ae=Te.RG16_EXT),$===r.SHORT&&Te&&(ae=Te.RG16_SNORM_EXT)),S===r.RG_INTEGER&&($===r.UNSIGNED_BYTE&&(ae=r.RG8UI),$===r.UNSIGNED_SHORT&&(ae=r.RG16UI),$===r.UNSIGNED_INT&&(ae=r.RG32UI),$===r.BYTE&&(ae=r.RG8I),$===r.SHORT&&(ae=r.RG16I),$===r.INT&&(ae=r.RG32I)),S===r.RGB_INTEGER&&($===r.UNSIGNED_BYTE&&(ae=r.RGB8UI),$===r.UNSIGNED_SHORT&&(ae=r.RGB16UI),$===r.UNSIGNED_INT&&(ae=r.RGB32UI),$===r.BYTE&&(ae=r.RGB8I),$===r.SHORT&&(ae=r.RGB16I),$===r.INT&&(ae=r.RGB32I)),S===r.RGBA_INTEGER&&($===r.UNSIGNED_BYTE&&(ae=r.RGBA8UI),$===r.UNSIGNED_SHORT&&(ae=r.RGBA16UI),$===r.UNSIGNED_INT&&(ae=r.RGBA32UI),$===r.BYTE&&(ae=r.RGBA8I),$===r.SHORT&&(ae=r.RGBA16I),$===r.INT&&(ae=r.RGBA32I)),S===r.RGB&&($===r.UNSIGNED_SHORT&&Te&&(ae=Te.RGB16_EXT),$===r.SHORT&&Te&&(ae=Te.RGB16_SNORM_EXT),$===r.UNSIGNED_INT_5_9_9_9_REV&&(ae=r.RGB9_E5),$===r.UNSIGNED_INT_10F_11F_11F_REV&&(ae=r.R11F_G11F_B10F)),S===r.RGBA){const ue=be?ua:_t.getTransfer(ge);$===r.FLOAT&&(ae=r.RGBA32F),$===r.HALF_FLOAT&&(ae=r.RGBA16F),$===r.UNSIGNED_BYTE&&(ae=ue===Tt?r.SRGB8_ALPHA8:r.RGBA8),$===r.UNSIGNED_SHORT&&Te&&(ae=Te.RGBA16_EXT),$===r.SHORT&&Te&&(ae=Te.RGBA16_SNORM_EXT),$===r.UNSIGNED_SHORT_4_4_4_4&&(ae=r.RGBA4),$===r.UNSIGNED_SHORT_5_5_5_1&&(ae=r.RGB5_A1)}return(ae===r.R16F||ae===r.R32F||ae===r.RG16F||ae===r.RG32F||ae===r.RGBA16F||ae===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ae}function w(C,S){let $;return C?S===null||S===$n||S===_r?$=r.DEPTH24_STENCIL8:S===xn?$=r.DEPTH32F_STENCIL8:S===gr&&($=r.DEPTH24_STENCIL8,Ie("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===$n||S===_r?$=r.DEPTH_COMPONENT24:S===xn?$=r.DEPTH_COMPONENT32F:S===gr&&($=r.DEPTH_COMPONENT16),$}function M(C,S){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Wt&&C.minFilter!==Ut?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function A(C){const S=C.target;S.removeEventListener("dispose",A),E(S),S.isVideoTexture&&u.delete(S),S.isHTMLTexture&&h.delete(S)}function b(C){const S=C.target;S.removeEventListener("dispose",b),D(S)}function E(C){const S=n.get(C);if(S.__webglInit===void 0)return;const $=C.source,oe=f.get($);if(oe){const ge=oe[S.__cacheKey];ge.usedTimes--,ge.usedTimes===0&&P(C),Object.keys(oe).length===0&&f.delete($)}n.remove(C)}function P(C){const S=n.get(C);r.deleteTexture(S.__webglTexture);const $=C.source,oe=f.get($);delete oe[S.__cacheKey],a.memory.textures--}function D(C){const S=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(S.__webglFramebuffer[oe]))for(let ge=0;ge<S.__webglFramebuffer[oe].length;ge++)r.deleteFramebuffer(S.__webglFramebuffer[oe][ge]);else r.deleteFramebuffer(S.__webglFramebuffer[oe]);S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer[oe])}else{if(Array.isArray(S.__webglFramebuffer))for(let oe=0;oe<S.__webglFramebuffer.length;oe++)r.deleteFramebuffer(S.__webglFramebuffer[oe]);else r.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&r.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let oe=0;oe<S.__webglColorRenderbuffer.length;oe++)S.__webglColorRenderbuffer[oe]&&r.deleteRenderbuffer(S.__webglColorRenderbuffer[oe]);S.__webglDepthRenderbuffer&&r.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const $=C.textures;for(let oe=0,ge=$.length;oe<ge;oe++){const be=n.get($[oe]);be.__webglTexture&&(r.deleteTexture(be.__webglTexture),a.memory.textures--),n.remove($[oe])}n.remove(C)}let V=0;function J(){V=0}function K(){return V}function B(C){V=C}function H(){const C=V;return C>=i.maxTextures&&Ie("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),V+=1,C}function Y(C){const S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function pe(C,S){const $=n.get(C);if(C.isVideoTexture&&et(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&$.__version!==C.version){const oe=C.image;if(oe===null)Ie("WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)Ie("WebGLRenderer: Texture marked for update but image is incomplete");else{Xe($,C,S);return}}else C.isExternalTexture&&($.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,$.__webglTexture,r.TEXTURE0+S)}function _e(C,S){const $=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&$.__version!==C.version){Xe($,C,S);return}else C.isExternalTexture&&($.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,$.__webglTexture,r.TEXTURE0+S)}function ye(C,S){const $=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&$.__version!==C.version){Xe($,C,S);return}t.bindTexture(r.TEXTURE_3D,$.__webglTexture,r.TEXTURE0+S)}function Re(C,S){const $=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&$.__version!==C.version){ne($,C,S);return}t.bindTexture(r.TEXTURE_CUBE_MAP,$.__webglTexture,r.TEXTURE0+S)}const le={[ia]:r.REPEAT,[Rn]:r.CLAMP_TO_EDGE,[sa]:r.MIRRORED_REPEAT},Ee={[Wt]:r.NEAREST,[Du]:r.NEAREST_MIPMAP_NEAREST,[dr]:r.NEAREST_MIPMAP_LINEAR,[Ut]:r.LINEAR,[Zr]:r.LINEAR_MIPMAP_NEAREST,[_i]:r.LINEAR_MIPMAP_LINEAR},Be={[Jf]:r.NEVER,[np]:r.ALWAYS,[jf]:r.LESS,[Dl]:r.LEQUAL,[Qf]:r.EQUAL,[Ul]:r.GEQUAL,[ep]:r.GREATER,[tp]:r.NOTEQUAL};function Le(C,S){if(S.type===xn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Ut||S.magFilter===Zr||S.magFilter===dr||S.magFilter===_i||S.minFilter===Ut||S.minFilter===Zr||S.minFilter===dr||S.minFilter===_i)&&Ie("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,le[S.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,le[S.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,le[S.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,Ee[S.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,Ee[S.minFilter]),S.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,Be[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Wt||S.minFilter!==dr&&S.minFilter!==_i||S.type===xn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");r.texParameterf(C,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function re(C,S){let $=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",A));const oe=S.source;let ge=f.get(oe);ge===void 0&&(ge={},f.set(oe,ge));const be=Y(S);if(be!==C.__cacheKey){ge[be]===void 0&&(ge[be]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,$=!0),ge[be].usedTimes++;const Te=ge[C.__cacheKey];Te!==void 0&&(ge[C.__cacheKey].usedTimes--,Te.usedTimes===0&&P(S)),C.__cacheKey=be,C.__webglTexture=ge[be].texture}return $}function Ae(C,S,$){return Math.floor(Math.floor(C/$)/S)}function xe(C,S,$,oe){const be=C.updateRanges;if(be.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,S.width,S.height,$,oe,S.data);else{be.sort((Ve,Ce)=>Ve.start-Ce.start);let Te=0;for(let Ve=1;Ve<be.length;Ve++){const Ce=be[Te],Me=be[Ve],at=Ce.start+Ce.count,lt=Ae(Me.start,S.width,4),vt=Ae(Ce.start,S.width,4);Me.start<=at+1&&lt===vt&&Ae(Me.start+Me.count-1,S.width,4)===lt?Ce.count=Math.max(Ce.count,Me.start+Me.count-Ce.start):(++Te,be[Te]=Me)}be.length=Te+1;const ae=t.getParameter(r.UNPACK_ROW_LENGTH),ue=t.getParameter(r.UNPACK_SKIP_PIXELS),De=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,S.width);for(let Ve=0,Ce=be.length;Ve<Ce;Ve++){const Me=be[Ve],at=Math.floor(Me.start/4),lt=Math.ceil(Me.count/4),vt=at%S.width,z=Math.floor(at/S.width),Se=lt,L=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,vt),t.pixelStorei(r.UNPACK_SKIP_ROWS,z),t.texSubImage2D(r.TEXTURE_2D,0,vt,z,Se,L,$,oe,S.data)}C.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,ae),t.pixelStorei(r.UNPACK_SKIP_PIXELS,ue),t.pixelStorei(r.UNPACK_SKIP_ROWS,De)}}function Xe(C,S,$){let oe=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(oe=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(oe=r.TEXTURE_3D);const ge=re(C,S),be=S.source;t.bindTexture(oe,C.__webglTexture,r.TEXTURE0+$);const Te=n.get(be);if(be.version!==Te.__version||ge===!0){if(t.activeTexture(r.TEXTURE0+$),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){const L=_t.getPrimaries(_t.workingColorSpace),O=S.colorSpace===Li?null:_t.getPrimaries(S.colorSpace),G=S.colorSpace===Li||L===O?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,G)}t.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment);let ue=g(S.image,!1,i.maxTextureSize);ue=ve(S,ue);const De=s.convert(S.format,S.colorSpace),Ve=s.convert(S.type);let Ce=y(S.internalFormat,De,Ve,S.normalized,S.colorSpace,S.isVideoTexture);Le(oe,S);let Me;const at=S.mipmaps,lt=S.isVideoTexture!==!0,vt=Te.__version===void 0||ge===!0,z=be.dataReady,Se=M(S,ue);if(S.isDepthTexture)Ce=w(S.format===ji,S.type),vt&&(lt?t.texStorage2D(r.TEXTURE_2D,1,Ce,ue.width,ue.height):t.texImage2D(r.TEXTURE_2D,0,Ce,ue.width,ue.height,0,De,Ve,null));else if(S.isDataTexture)if(at.length>0){lt&&vt&&t.texStorage2D(r.TEXTURE_2D,Se,Ce,at[0].width,at[0].height);for(let L=0,O=at.length;L<O;L++)Me=at[L],lt?z&&t.texSubImage2D(r.TEXTURE_2D,L,0,0,Me.width,Me.height,De,Ve,Me.data):t.texImage2D(r.TEXTURE_2D,L,Ce,Me.width,Me.height,0,De,Ve,Me.data);S.generateMipmaps=!1}else lt?(vt&&t.texStorage2D(r.TEXTURE_2D,Se,Ce,ue.width,ue.height),z&&xe(S,ue,De,Ve)):t.texImage2D(r.TEXTURE_2D,0,Ce,ue.width,ue.height,0,De,Ve,ue.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){lt&&vt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Se,Ce,at[0].width,at[0].height,ue.depth);for(let L=0,O=at.length;L<O;L++)if(Me=at[L],S.format!==yn)if(De!==null)if(lt){if(z)if(S.layerUpdates.size>0){const G=xu(Me.width,Me.height,S.format,S.type);for(const te of S.layerUpdates){const me=Me.data.subarray(te*G/Me.data.BYTES_PER_ELEMENT,(te+1)*G/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,L,0,0,te,Me.width,Me.height,1,De,me)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,L,0,0,0,Me.width,Me.height,ue.depth,De,Me.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,L,Ce,Me.width,Me.height,ue.depth,0,Me.data,0,0);else Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else lt?z&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,L,0,0,0,Me.width,Me.height,ue.depth,De,Ve,Me.data):t.texImage3D(r.TEXTURE_2D_ARRAY,L,Ce,Me.width,Me.height,ue.depth,0,De,Ve,Me.data)}else{lt&&vt&&t.texStorage2D(r.TEXTURE_2D,Se,Ce,at[0].width,at[0].height);for(let L=0,O=at.length;L<O;L++)Me=at[L],S.format!==yn?De!==null?lt?z&&t.compressedTexSubImage2D(r.TEXTURE_2D,L,0,0,Me.width,Me.height,De,Me.data):t.compressedTexImage2D(r.TEXTURE_2D,L,Ce,Me.width,Me.height,0,Me.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?z&&t.texSubImage2D(r.TEXTURE_2D,L,0,0,Me.width,Me.height,De,Ve,Me.data):t.texImage2D(r.TEXTURE_2D,L,Ce,Me.width,Me.height,0,De,Ve,Me.data)}else if(S.isDataArrayTexture)if(lt){if(vt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Se,Ce,ue.width,ue.height,ue.depth),z)if(S.layerUpdates.size>0){const L=xu(ue.width,ue.height,S.format,S.type);for(const O of S.layerUpdates){const G=ue.data.subarray(O*L/ue.data.BYTES_PER_ELEMENT,(O+1)*L/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,O,ue.width,ue.height,1,De,Ve,G)}S.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,De,Ve,ue.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ce,ue.width,ue.height,ue.depth,0,De,Ve,ue.data);else if(S.isData3DTexture)lt?(vt&&t.texStorage3D(r.TEXTURE_3D,Se,Ce,ue.width,ue.height,ue.depth),z&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,De,Ve,ue.data)):t.texImage3D(r.TEXTURE_3D,0,Ce,ue.width,ue.height,ue.depth,0,De,Ve,ue.data);else if(S.isFramebufferTexture){if(vt)if(lt)t.texStorage2D(r.TEXTURE_2D,Se,Ce,ue.width,ue.height);else{let L=ue.width,O=ue.height;for(let G=0;G<Se;G++)t.texImage2D(r.TEXTURE_2D,G,Ce,L,O,0,De,Ve,null),L>>=1,O>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in r){const L=r.canvas;if(L.hasAttribute("layoutsubtree")||L.setAttribute("layoutsubtree","true"),ue.parentNode!==L){L.appendChild(ue),h.add(S),L.onpaint=we=>{const it=we.changedElements;for(const tt of h)it.includes(tt.image)&&(tt.needsUpdate=!0)},L.requestPaint();return}const O=0,G=r.RGBA,te=r.RGBA,me=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,O,G,te,me,ue),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(at.length>0){if(lt&&vt){const L=St(at[0]);t.texStorage2D(r.TEXTURE_2D,Se,Ce,L.width,L.height)}for(let L=0,O=at.length;L<O;L++)Me=at[L],lt?z&&t.texSubImage2D(r.TEXTURE_2D,L,0,0,De,Ve,Me):t.texImage2D(r.TEXTURE_2D,L,Ce,De,Ve,Me);S.generateMipmaps=!1}else if(lt){if(vt){const L=St(ue);t.texStorage2D(r.TEXTURE_2D,Se,Ce,L.width,L.height)}z&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,De,Ve,ue)}else t.texImage2D(r.TEXTURE_2D,0,Ce,De,Ve,ue);p(S)&&v(oe),Te.__version=be.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function ne(C,S,$){if(S.image.length!==6)return;const oe=re(C,S),ge=S.source;t.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+$);const be=n.get(ge);if(ge.version!==be.__version||oe===!0){t.activeTexture(r.TEXTURE0+$);const Te=_t.getPrimaries(_t.workingColorSpace),ae=S.colorSpace===Li?null:_t.getPrimaries(S.colorSpace),ue=S.colorSpace===Li||Te===ae?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const De=S.isCompressedTexture||S.image[0].isCompressedTexture,Ve=S.image[0]&&S.image[0].isDataTexture,Ce=[];for(let te=0;te<6;te++)!De&&!Ve?Ce[te]=g(S.image[te],!0,i.maxCubemapSize):Ce[te]=Ve?S.image[te].image:S.image[te],Ce[te]=ve(S,Ce[te]);const Me=Ce[0],at=s.convert(S.format,S.colorSpace),lt=s.convert(S.type),vt=y(S.internalFormat,at,lt,S.normalized,S.colorSpace),z=S.isVideoTexture!==!0,Se=be.__version===void 0||oe===!0,L=ge.dataReady;let O=M(S,Me);Le(r.TEXTURE_CUBE_MAP,S);let G;if(De){z&&Se&&t.texStorage2D(r.TEXTURE_CUBE_MAP,O,vt,Me.width,Me.height);for(let te=0;te<6;te++){G=Ce[te].mipmaps;for(let me=0;me<G.length;me++){const we=G[me];S.format!==yn?at!==null?z?L&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,me,0,0,we.width,we.height,at,we.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,me,vt,we.width,we.height,0,we.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,me,0,0,we.width,we.height,at,lt,we.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,me,vt,we.width,we.height,0,at,lt,we.data)}}}else{if(G=S.mipmaps,z&&Se){G.length>0&&O++;const te=St(Ce[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,O,vt,te.width,te.height)}for(let te=0;te<6;te++)if(Ve){z?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ce[te].width,Ce[te].height,at,lt,Ce[te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,vt,Ce[te].width,Ce[te].height,0,at,lt,Ce[te].data);for(let me=0;me<G.length;me++){const it=G[me].image[te].image;z?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,me+1,0,0,it.width,it.height,at,lt,it.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,me+1,vt,it.width,it.height,0,at,lt,it.data)}}else{z?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,at,lt,Ce[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,vt,at,lt,Ce[te]);for(let me=0;me<G.length;me++){const we=G[me];z?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,me+1,0,0,at,lt,we.image[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,me+1,vt,at,lt,we.image[te])}}}p(S)&&v(r.TEXTURE_CUBE_MAP),be.__version=ge.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function N(C,S,$,oe,ge,be){const Te=s.convert($.format,$.colorSpace),ae=s.convert($.type),ue=y($.internalFormat,Te,ae,$.normalized,$.colorSpace),De=n.get(S),Ve=n.get($);if(Ve.__renderTarget=S,!De.__hasExternalTextures){const Ce=Math.max(1,S.width>>be),Me=Math.max(1,S.height>>be);ge===r.TEXTURE_3D||ge===r.TEXTURE_2D_ARRAY?t.texImage3D(ge,be,ue,Ce,Me,S.depth,0,Te,ae,null):t.texImage2D(ge,be,ue,Ce,Me,0,Te,ae,null)}t.bindFramebuffer(r.FRAMEBUFFER,C),ze(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,oe,ge,Ve.__webglTexture,0,nt(S)):(ge===r.TEXTURE_2D||ge>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ge<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,oe,ge,Ve.__webglTexture,be),t.bindFramebuffer(r.FRAMEBUFFER,null)}function U(C,S,$){if(r.bindRenderbuffer(r.RENDERBUFFER,C),S.depthBuffer){const oe=S.depthTexture,ge=oe&&oe.isDepthTexture?oe.type:null,be=w(S.stencilBuffer,ge),Te=S.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;ze(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,nt(S),be,S.width,S.height):$?r.renderbufferStorageMultisample(r.RENDERBUFFER,nt(S),be,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,be,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Te,r.RENDERBUFFER,C)}else{const oe=S.textures;for(let ge=0;ge<oe.length;ge++){const be=oe[ge],Te=s.convert(be.format,be.colorSpace),ae=s.convert(be.type),ue=y(be.internalFormat,Te,ae,be.normalized,be.colorSpace);ze(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,nt(S),ue,S.width,S.height):$?r.renderbufferStorageMultisample(r.RENDERBUFFER,nt(S),ue,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,ue,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function k(C,S,$){const oe=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ge=n.get(S.depthTexture);if(ge.__renderTarget=S,(!ge.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),oe){if(ge.__webglInit===void 0&&(ge.__webglInit=!0,S.depthTexture.addEventListener("dispose",A)),ge.__webglTexture===void 0){ge.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,ge.__webglTexture),Le(r.TEXTURE_CUBE_MAP,S.depthTexture);const De=s.convert(S.depthTexture.format),Ve=s.convert(S.depthTexture.type);let Ce;S.depthTexture.format===Si?Ce=r.DEPTH_COMPONENT24:S.depthTexture.format===ji&&(Ce=r.DEPTH24_STENCIL8);for(let Me=0;Me<6;Me++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,Ce,S.width,S.height,0,De,Ve,null)}}else pe(S.depthTexture,0);const be=ge.__webglTexture,Te=nt(S),ae=oe?r.TEXTURE_CUBE_MAP_POSITIVE_X+$:r.TEXTURE_2D,ue=S.depthTexture.format===ji?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(S.depthTexture.format===Si)ze(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ue,ae,be,0,Te):r.framebufferTexture2D(r.FRAMEBUFFER,ue,ae,be,0);else if(S.depthTexture.format===ji)ze(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ue,ae,be,0,Te):r.framebufferTexture2D(r.FRAMEBUFFER,ue,ae,be,0);else throw new Error("Unknown depthTexture format")}function Q(C){const S=n.get(C),$=C.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==C.depthTexture){const oe=C.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),oe){const ge=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,oe.removeEventListener("dispose",ge)};oe.addEventListener("dispose",ge),S.__depthDisposeCallback=ge}S.__boundDepthTexture=oe}if(C.depthTexture&&!S.__autoAllocateDepthBuffer)if($)for(let oe=0;oe<6;oe++)k(S.__webglFramebuffer[oe],C,oe);else{const oe=C.texture.mipmaps;oe&&oe.length>0?k(S.__webglFramebuffer[0],C,0):k(S.__webglFramebuffer,C,0)}else if($){S.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[oe]),S.__webglDepthbuffer[oe]===void 0)S.__webglDepthbuffer[oe]=r.createRenderbuffer(),U(S.__webglDepthbuffer[oe],C,!1);else{const ge=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,be=S.__webglDepthbuffer[oe];r.bindRenderbuffer(r.RENDERBUFFER,be),r.framebufferRenderbuffer(r.FRAMEBUFFER,ge,r.RENDERBUFFER,be)}}else{const oe=C.texture.mipmaps;if(oe&&oe.length>0?t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=r.createRenderbuffer(),U(S.__webglDepthbuffer,C,!1);else{const ge=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,be=S.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,be),r.framebufferRenderbuffer(r.FRAMEBUFFER,ge,r.RENDERBUFFER,be)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Z(C,S,$){const oe=n.get(C);S!==void 0&&N(oe.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),$!==void 0&&Q(C)}function se(C){const S=C.texture,$=n.get(C),oe=n.get(S);C.addEventListener("dispose",b);const ge=C.textures,be=C.isWebGLCubeRenderTarget===!0,Te=ge.length>1;if(Te||(oe.__webglTexture===void 0&&(oe.__webglTexture=r.createTexture()),oe.__version=S.version,a.memory.textures++),be){$.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(S.mipmaps&&S.mipmaps.length>0){$.__webglFramebuffer[ae]=[];for(let ue=0;ue<S.mipmaps.length;ue++)$.__webglFramebuffer[ae][ue]=r.createFramebuffer()}else $.__webglFramebuffer[ae]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){$.__webglFramebuffer=[];for(let ae=0;ae<S.mipmaps.length;ae++)$.__webglFramebuffer[ae]=r.createFramebuffer()}else $.__webglFramebuffer=r.createFramebuffer();if(Te)for(let ae=0,ue=ge.length;ae<ue;ae++){const De=n.get(ge[ae]);De.__webglTexture===void 0&&(De.__webglTexture=r.createTexture(),a.memory.textures++)}if(C.samples>0&&ze(C)===!1){$.__webglMultisampledFramebuffer=r.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let ae=0;ae<ge.length;ae++){const ue=ge[ae];$.__webglColorRenderbuffer[ae]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,$.__webglColorRenderbuffer[ae]);const De=s.convert(ue.format,ue.colorSpace),Ve=s.convert(ue.type),Ce=y(ue.internalFormat,De,Ve,ue.normalized,ue.colorSpace,C.isXRRenderTarget===!0),Me=nt(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,Me,Ce,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.RENDERBUFFER,$.__webglColorRenderbuffer[ae])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&($.__webglDepthRenderbuffer=r.createRenderbuffer(),U($.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(be){t.bindTexture(r.TEXTURE_CUBE_MAP,oe.__webglTexture),Le(r.TEXTURE_CUBE_MAP,S);for(let ae=0;ae<6;ae++)if(S.mipmaps&&S.mipmaps.length>0)for(let ue=0;ue<S.mipmaps.length;ue++)N($.__webglFramebuffer[ae][ue],C,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ue);else N($.__webglFramebuffer[ae],C,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);p(S)&&v(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let ae=0,ue=ge.length;ae<ue;ae++){const De=ge[ae],Ve=n.get(De);let Ce=r.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Ce=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Ce,Ve.__webglTexture),Le(Ce,De),N($.__webglFramebuffer,C,De,r.COLOR_ATTACHMENT0+ae,Ce,0),p(De)&&v(Ce)}t.unbindTexture()}else{let ae=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ae=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ae,oe.__webglTexture),Le(ae,S),S.mipmaps&&S.mipmaps.length>0)for(let ue=0;ue<S.mipmaps.length;ue++)N($.__webglFramebuffer[ue],C,S,r.COLOR_ATTACHMENT0,ae,ue);else N($.__webglFramebuffer,C,S,r.COLOR_ATTACHMENT0,ae,0);p(S)&&v(ae),t.unbindTexture()}C.depthBuffer&&Q(C)}function ce(C){const S=C.textures;for(let $=0,oe=S.length;$<oe;$++){const ge=S[$];if(p(ge)){const be=x(C),Te=n.get(ge).__webglTexture;t.bindTexture(be,Te),v(be),t.unbindTexture()}}}const he=[],qe=[];function F(C){if(C.samples>0){if(ze(C)===!1){const S=C.textures,$=C.width,oe=C.height;let ge=r.COLOR_BUFFER_BIT;const be=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Te=n.get(C),ae=S.length>1;if(ae)for(let De=0;De<S.length;De++)t.bindFramebuffer(r.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Te.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);const ue=C.texture.mipmaps;ue&&ue.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let De=0;De<S.length;De++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ge|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ge|=r.STENCIL_BUFFER_BIT)),ae){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Te.__webglColorRenderbuffer[De]);const Ve=n.get(S[De]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ve,0)}r.blitFramebuffer(0,0,$,oe,0,0,$,oe,ge,r.NEAREST),l===!0&&(he.length=0,qe.length=0,he.push(r.COLOR_ATTACHMENT0+De),C.depthBuffer&&C.resolveDepthBuffer===!1&&(he.push(be),qe.push(be),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,qe)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,he))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ae)for(let De=0;De<S.length;De++){t.bindFramebuffer(r.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.RENDERBUFFER,Te.__webglColorRenderbuffer[De]);const Ve=n.get(S[De]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Te.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.TEXTURE_2D,Ve,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const S=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[S])}}}function nt(C){return Math.min(i.maxSamples,C.samples)}function ze(C){const S=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function et(C){const S=a.render.frame;u.get(C)!==S&&(u.set(C,S),C.update())}function ve(C,S){const $=C.colorSpace,oe=C.format,ge=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||$!==ca&&$!==Li&&(_t.getTransfer($)===Tt?(oe!==yn||ge!==Tn)&&Ie("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ye("WebGLTextures: Unsupported texture color space:",$)),S}function St(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=J,this.getTextureUnits=K,this.setTextureUnits=B,this.setTexture2D=pe,this.setTexture2DArray=_e,this.setTexture3D=ye,this.setTextureCube=Re,this.rebindTextures=Z,this.setupRenderTarget=se,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=Q,this.setupFrameBufferTexture=N,this.useMultisampledRTT=ze,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function dm(r,e){function t(n,i=Li){let s;const a=_t.getTransfer(i);if(n===Tn)return r.UNSIGNED_BYTE;if(n===Al)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Cl)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Fu)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Ou)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Uu)return r.BYTE;if(n===Nu)return r.SHORT;if(n===gr)return r.UNSIGNED_SHORT;if(n===Tl)return r.INT;if(n===$n)return r.UNSIGNED_INT;if(n===xn)return r.FLOAT;if(n===Mi)return r.HALF_FLOAT;if(n===ku)return r.ALPHA;if(n===Bu)return r.RGB;if(n===yn)return r.RGBA;if(n===Si)return r.DEPTH_COMPONENT;if(n===ji)return r.DEPTH_STENCIL;if(n===Rl)return r.RED;if(n===Ma)return r.RED_INTEGER;if(n===ns)return r.RG;if(n===Il)return r.RG_INTEGER;if(n===Pl)return r.RGBA_INTEGER;if(n===Kr||n===Jr||n===jr||n===Qr)if(a===Tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Kr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Qr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Kr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Jr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===jr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Qr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Bo||n===zo||n===Vo||n===Go)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Bo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===zo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Vo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Go)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ho||n===Wo||n===Xo||n===$o||n===qo||n===ra||n===Yo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ho||n===Wo)return a===Tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Xo)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===$o)return s.COMPRESSED_R11_EAC;if(n===qo)return s.COMPRESSED_SIGNED_R11_EAC;if(n===ra)return s.COMPRESSED_RG11_EAC;if(n===Yo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Zo||n===Ko||n===Jo||n===jo||n===Qo||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===al||n===ol||n===ll)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Zo)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ko)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Jo)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===jo)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Qo)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===el)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===tl)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===nl)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===il)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===sl)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===rl)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===al)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ol)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ll)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===cl||n===ul||n===dl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===cl)return a===Tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ul)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===dl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===hl||n===fl||n===aa||n===pl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===hl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===fl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===aa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===pl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===_r?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const lS=`
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

}`;class uS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Zu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Hn({vertexShader:lS,fragmentShader:cS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new At(new Tr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class dS extends ri{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,m=null;const _=typeof XRWebGLBinding<"u",g=new uS,p={},v=t.getContextAttributes();let x=null,y=null;const w=[],M=[],A=new de;let b=null;const E=new nn;E.viewport=new xt;const P=new nn;P.viewport=new xt;const D=[E,P],V=new jp;let J=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let Ae=w[re];return Ae===void 0&&(Ae=new Ao,w[re]=Ae),Ae.getTargetRaySpace()},this.getControllerGrip=function(re){let Ae=w[re];return Ae===void 0&&(Ae=new Ao,w[re]=Ae),Ae.getGripSpace()},this.getHand=function(re){let Ae=w[re];return Ae===void 0&&(Ae=new Ao,w[re]=Ae),Ae.getHandSpace()};function B(re){const Ae=M.indexOf(re.inputSource);if(Ae===-1)return;const xe=w[Ae];xe!==void 0&&(xe.update(re.inputSource,re.frame,c||a),xe.dispatchEvent({type:re.type,data:re.inputSource}))}function H(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",H),i.removeEventListener("inputsourceschange",Y);for(let re=0;re<w.length;re++){const Ae=M[re];Ae!==null&&(M[re]=null,w[re].disconnect(Ae))}J=null,K=null,g.reset();for(const re in p)delete p[re];e.setRenderTarget(x),f=null,d=null,h=null,i=null,y=null,Le.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){s=re,n.isPresenting===!0&&Ie("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){o=re,n.isPresenting===!0&&Ie("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(re){c=re},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(i,t)),h},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(re){if(i=re,i!==null){if(x=e.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",H),i.addEventListener("inputsourceschange",Y),v.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,Xe=null,ne=null;v.depth&&(ne=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,xe=v.stencil?ji:Si,Xe=v.stencil?_r:$n);const N={colorFormat:t.RGBA8,depthFormat:ne,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(N),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Gn(d.textureWidth,d.textureHeight,{format:yn,type:Tn,depthTexture:new Us(d.textureWidth,d.textureHeight,Xe,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const xe={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,xe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Gn(f.framebufferWidth,f.framebufferHeight,{format:yn,type:Tn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Le.setContext(i),Le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Y(re){for(let Ae=0;Ae<re.removed.length;Ae++){const xe=re.removed[Ae],Xe=M.indexOf(xe);Xe>=0&&(M[Xe]=null,w[Xe].disconnect(xe))}for(let Ae=0;Ae<re.added.length;Ae++){const xe=re.added[Ae];let Xe=M.indexOf(xe);if(Xe===-1){for(let N=0;N<w.length;N++)if(N>=M.length){M.push(xe),Xe=N;break}else if(M[N]===null){M[N]=xe,Xe=N;break}if(Xe===-1)break}const ne=w[Xe];ne&&ne.connect(xe)}}const pe=new I,_e=new I;function ye(re,Ae,xe){pe.setFromMatrixPosition(Ae.matrixWorld),_e.setFromMatrixPosition(xe.matrixWorld);const Xe=pe.distanceTo(_e),ne=Ae.projectionMatrix.elements,N=xe.projectionMatrix.elements,U=ne[14]/(ne[10]-1),k=ne[14]/(ne[10]+1),Q=(ne[9]+1)/ne[5],Z=(ne[9]-1)/ne[5],se=(ne[8]-1)/ne[0],ce=(N[8]+1)/N[0],he=U*se,qe=U*ce,F=Xe/(-se+ce),nt=F*-se;if(Ae.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(nt),re.translateZ(F),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),ne[10]===-1)re.projectionMatrix.copy(Ae.projectionMatrix),re.projectionMatrixInverse.copy(Ae.projectionMatrixInverse);else{const ze=U+F,et=k+F,ve=he-nt,St=qe+(Xe-nt),C=Q*k/et*ze,S=Z*k/et*ze;re.projectionMatrix.makePerspective(ve,St,C,S,ze,et),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function Re(re,Ae){Ae===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(Ae.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(i===null)return;let Ae=re.near,xe=re.far;g.texture!==null&&(g.depthNear>0&&(Ae=g.depthNear),g.depthFar>0&&(xe=g.depthFar)),V.near=P.near=E.near=Ae,V.far=P.far=E.far=xe,(J!==V.near||K!==V.far)&&(i.updateRenderState({depthNear:V.near,depthFar:V.far}),J=V.near,K=V.far),V.layers.mask=re.layers.mask|6,E.layers.mask=V.layers.mask&-5,P.layers.mask=V.layers.mask&-3;const Xe=re.parent,ne=V.cameras;Re(V,Xe);for(let N=0;N<ne.length;N++)Re(ne[N],Xe);ne.length===2?ye(V,E,P):V.projectionMatrix.copy(E.projectionMatrix),le(re,V,Xe)};function le(re,Ae,xe){xe===null?re.matrix.copy(Ae.matrixWorld):(re.matrix.copy(xe.matrixWorld),re.matrix.invert(),re.matrix.multiply(Ae.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(Ae.projectionMatrix),re.projectionMatrixInverse.copy(Ae.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=vr*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(re){l=re,d!==null&&(d.fixedFoveation=re),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=re)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(V)},this.getCameraTexture=function(re){return p[re]};let Ee=null;function Be(re,Ae){if(u=Ae.getViewerPose(c||a),m=Ae,u!==null){const xe=u.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Xe=!1;xe.length!==V.cameras.length&&(V.cameras.length=0,Xe=!0);for(let k=0;k<xe.length;k++){const Q=xe[k];let Z=null;if(f!==null)Z=f.getViewport(Q);else{const ce=h.getViewSubImage(d,Q);Z=ce.viewport,k===0&&(e.setRenderTargetTextures(y,ce.colorTexture,ce.depthStencilTexture),e.setRenderTarget(y))}let se=D[k];se===void 0&&(se=new nn,se.layers.enable(k),se.viewport=new xt,D[k]=se),se.matrix.fromArray(Q.transform.matrix),se.matrix.decompose(se.position,se.quaternion,se.scale),se.projectionMatrix.fromArray(Q.projectionMatrix),se.projectionMatrixInverse.copy(se.projectionMatrix).invert(),se.viewport.set(Z.x,Z.y,Z.width,Z.height),k===0&&(V.matrix.copy(se.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Xe===!0&&V.cameras.push(se)}const ne=i.enabledFeatures;if(ne&&ne.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){h=n.getBinding();const k=h.getDepthInformation(xe[0]);k&&k.isValid&&k.texture&&g.init(k,i.renderState)}if(ne&&ne.includes("camera-access")&&_){e.state.unbindTexture(),h=n.getBinding();for(let k=0;k<xe.length;k++){const Q=xe[k].camera;if(Q){let Z=p[Q];Z||(Z=new Zu,p[Q]=Z);const se=h.getCameraImage(Q);Z.sourceTexture=se}}}}for(let xe=0;xe<w.length;xe++){const Xe=M[xe],ne=w[xe];Xe!==null&&ne!==void 0&&ne.update(Xe,Ae,c||a)}Ee&&Ee(re,Ae),Ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Ae}),m=null}const Le=new rm;Le.setAnimationLoop(Be),this.setAnimationLoop=function(re){Ee=re},this.dispose=function(){}}}const hS=new st,hm=new ot;hm.set(-1,0,0,0,1,0,0,0,1);function fS(r,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Rp(r)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,v,x,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(g,p):p.isMeshLambertMaterial?(s(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(g,p),h(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),_(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,v,x):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===bn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===bn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const v=e.get(p),x=v.envMap,y=v.envMapRotation;x&&(g.envMap.value=x,g.envMapRotation.value.setFromMatrix4(hS.makeRotationFromEuler(y)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(hm),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,v,x){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=x*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===bn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const v=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function pS(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,x){const y=x.program;n.uniformBlockBinding(v,y)}function c(v,x){let y=i[v.id];y===void 0&&(m(v),y=u(v),i[v.id]=y,v.addEventListener("dispose",g));const w=x.program;n.updateUBOMapping(v,w);const M=e.render.frame;s[v.id]!==M&&(d(v),s[v.id]=M)}function u(v){const x=h();v.__bindingPointIndex=x;const y=r.createBuffer(),w=v.__size,M=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,w,M),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,y),y}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Ye("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const x=i[v.id],y=v.uniforms,w=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let M=0,A=y.length;M<A;M++){const b=Array.isArray(y[M])?y[M]:[y[M]];for(let E=0,P=b.length;E<P;E++){const D=b[E];if(f(D,M,E,w)===!0){const V=D.__offset,J=Array.isArray(D.value)?D.value:[D.value];let K=0;for(let B=0;B<J.length;B++){const H=J[B],Y=_(H);typeof H=="number"||typeof H=="boolean"?(D.__data[0]=H,r.bufferSubData(r.UNIFORM_BUFFER,V+K,D.__data)):H.isMatrix3?(D.__data[0]=H.elements[0],D.__data[1]=H.elements[1],D.__data[2]=H.elements[2],D.__data[3]=0,D.__data[4]=H.elements[3],D.__data[5]=H.elements[4],D.__data[6]=H.elements[5],D.__data[7]=0,D.__data[8]=H.elements[6],D.__data[9]=H.elements[7],D.__data[10]=H.elements[8],D.__data[11]=0):ArrayBuffer.isView(H)?D.__data.set(new H.constructor(H.buffer,H.byteOffset,D.__data.length)):(H.toArray(D.__data,K),K+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,V,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(v,x,y,w){const M=v.value,A=x+"_"+y;if(w[A]===void 0)return typeof M=="number"||typeof M=="boolean"?w[A]=M:ArrayBuffer.isView(M)?w[A]=M.slice():w[A]=M.clone(),!0;{const b=w[A];if(typeof M=="number"||typeof M=="boolean"){if(b!==M)return w[A]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(b.equals(M)===!1)return b.copy(M),!0}}return!1}function m(v){const x=v.uniforms;let y=0;const w=16;for(let A=0,b=x.length;A<b;A++){const E=Array.isArray(x[A])?x[A]:[x[A]];for(let P=0,D=E.length;P<D;P++){const V=E[P],J=Array.isArray(V.value)?V.value:[V.value];for(let K=0,B=J.length;K<B;K++){const H=J[K],Y=_(H),pe=y%w,_e=pe%Y.boundary,ye=pe+_e;y+=_e,ye!==0&&w-ye<Y.storage&&(y+=w-ye),V.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=y,y+=Y.storage}}}const M=y%w;return M>0&&(y+=w-M),v.__size=y,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?Ie("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(x.boundary=16,x.storage=v.byteLength):Ie("WebGLRenderer: Unsupported uniform value type.",v),x}function g(v){const x=v.target;x.removeEventListener("dispose",g);const y=a.indexOf(x.__bindingPointIndex);a.splice(y,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function p(){for(const v in i)r.deleteBuffer(i[v]);a=[],i={},s={}}return{bind:l,update:c,dispose:p}}const mS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let hi=null;function gS(){return hi===null&&(hi=new ii(mS,16,16,ns,Mi),hi.name="DFG_LUT",hi.minFilter=Ut,hi.magFilter=Ut,hi.wrapS=Rn,hi.wrapT=Rn,hi.generateMipmaps=!1,hi.needsUpdate=!0),hi}class fm{constructor(e={}){const{canvas:t=sp(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Tn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const _=f,g=new Set([Pl,Il,Ma]),p=new Set([Tn,$n,gr,_r,Al,Cl]),v=new Uint32Array(4),x=new Int32Array(4),y=new I;let w=null,M=null;const A=[],b=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ni,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let D=!1,V=null;this._outputColorSpace=En;let J=0,K=0,B=null,H=-1,Y=null;const pe=new xt,_e=new xt;let ye=null;const Re=new Fe(0);let le=0,Ee=t.width,Be=t.height,Le=1,re=null,Ae=null;const xe=new xt(0,0,Ee,Be),Xe=new xt(0,0,Ee,Be);let ne=!1;const N=new wr;let U=!1,k=!1;const Q=new st,Z=new I,se=new xt,ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let he=!1;function qe(){return B===null?Le:1}let F=n;function nt(T,X){return t.getContext(T,X)}try{const T={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${wl}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",me,!1),t.addEventListener("webglcontextcreationerror",we,!1),F===null){const X="webgl2";if(F=nt(X,T),F===null)throw nt(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw Ye("WebGLRenderer: "+T.message),T}let ze,et,ve,St,C,S,$,oe,ge,be,Te,ae,ue,De,Ve,Ce,Me,at,lt,vt,z,Se,L;function O(){ze=new _b(F),ze.init(),z=new dm(F,ze),et=new cb(F,ze,e,z),ve=new aS(F,ze),et.reversedDepthBuffer&&d&&ve.buffers.depth.setReversed(!0),St=new yb(F),C=new $M,S=new oS(F,ze,ve,C,et,z,St),$=new gb(P),oe=new wv(F),Se=new ob(F,oe),ge=new vb(F,oe,St,Se),be=new Mb(F,ge,oe,Se,St),at=new bb(F,et,S),Ve=new ub(C),Te=new XM(P,$,ze,et,Se,Ve),ae=new fS(P,C),ue=new YM,De=new eS(ze),Me=new ab(P,$,ve,be,m,l),Ce=new rS(P,be,et),L=new pS(F,St,et,ve),lt=new lb(F,ze,St),vt=new xb(F,ze,St),St.programs=Te.programs,P.capabilities=et,P.extensions=ze,P.properties=C,P.renderLists=ue,P.shadowMap=Ce,P.state=ve,P.info=St}O(),_!==Tn&&(E=new wb(_,t.width,t.height,i,s));const G=new dS(P,F);this.xr=G,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const T=ze.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ze.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Le},this.setPixelRatio=function(T){T!==void 0&&(Le=T,this.setSize(Ee,Be,!1))},this.getSize=function(T){return T.set(Ee,Be)},this.setSize=function(T,X,ie=!0){if(G.isPresenting){Ie("WebGLRenderer: Can't change size while VR device is presenting.");return}Ee=T,Be=X,t.width=Math.floor(T*Le),t.height=Math.floor(X*Le),ie===!0&&(t.style.width=T+"px",t.style.height=X+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,T,X)},this.getDrawingBufferSize=function(T){return T.set(Ee*Le,Be*Le).floor()},this.setDrawingBufferSize=function(T,X,ie){Ee=T,Be=X,Le=ie,t.width=Math.floor(T*ie),t.height=Math.floor(X*ie),this.setViewport(0,0,T,X)},this.setEffects=function(T){if(_===Tn){Ye("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let X=0;X<T.length;X++)if(T[X].isOutputPass===!0){Ie("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(pe)},this.getViewport=function(T){return T.copy(xe)},this.setViewport=function(T,X,ie,j){T.isVector4?xe.set(T.x,T.y,T.z,T.w):xe.set(T,X,ie,j),ve.viewport(pe.copy(xe).multiplyScalar(Le).round())},this.getScissor=function(T){return T.copy(Xe)},this.setScissor=function(T,X,ie,j){T.isVector4?Xe.set(T.x,T.y,T.z,T.w):Xe.set(T,X,ie,j),ve.scissor(_e.copy(Xe).multiplyScalar(Le).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(T){ve.setScissorTest(ne=T)},this.setOpaqueSort=function(T){re=T},this.setTransparentSort=function(T){Ae=T},this.getClearColor=function(T){return T.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(T=!0,X=!0,ie=!0){let j=0;if(T){let ee=!1;if(B!==null){const Oe=B.texture.format;ee=g.has(Oe)}if(ee){const Oe=B.texture.type,We=p.has(Oe),Ue=Me.getClearColor(),Ze=Me.getClearAlpha(),Je=Ue.r,dt=Ue.g,pt=Ue.b;We?(v[0]=Je,v[1]=dt,v[2]=pt,v[3]=Ze,F.clearBufferuiv(F.COLOR,0,v)):(x[0]=Je,x[1]=dt,x[2]=pt,x[3]=Ze,F.clearBufferiv(F.COLOR,0,x))}else j|=F.COLOR_BUFFER_BIT}X&&(j|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ie&&(j|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j!==0&&F.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),V=T},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",me,!1),t.removeEventListener("webglcontextcreationerror",we,!1),Me.dispose(),ue.dispose(),De.dispose(),C.dispose(),$.dispose(),be.dispose(),Se.dispose(),L.dispose(),Te.dispose(),G.dispose(),G.removeEventListener("sessionstart",qt),G.removeEventListener("sessionend",Dn),ln.stop()};function te(T){T.preventDefault(),fa("WebGLRenderer: Context Lost."),D=!0}function me(){fa("WebGLRenderer: Context Restored."),D=!1;const T=St.autoReset,X=Ce.enabled,ie=Ce.autoUpdate,j=Ce.needsUpdate,ee=Ce.type;O(),St.autoReset=T,Ce.enabled=X,Ce.autoUpdate=ie,Ce.needsUpdate=j,Ce.type=ee}function we(T){Ye("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function it(T){const X=T.target;X.removeEventListener("dispose",it),tt(X)}function tt(T){$e(T),C.remove(T)}function $e(T){const X=C.get(T).programs;X!==void 0&&(X.forEach(function(ie){Te.releaseProgram(ie)}),T.isShaderMaterial&&Te.releaseShaderCache(T))}this.renderBufferDirect=function(T,X,ie,j,ee,Oe){X===null&&(X=ce);const We=ee.isMesh&&ee.matrixWorld.determinant()<0,Ue=ym(T,X,ie,j,ee);ve.setMaterial(j,We);let Ze=ie.index,Je=1;if(j.wireframe===!0){if(Ze=ge.getWireframeAttribute(ie),Ze===void 0)return;Je=2}const dt=ie.drawRange,pt=ie.attributes.position;let je=dt.start*Je,Ct=(dt.start+dt.count)*Je;Oe!==null&&(je=Math.max(je,Oe.start*Je),Ct=Math.min(Ct,(Oe.start+Oe.count)*Je)),Ze!==null?(je=Math.max(je,0),Ct=Math.min(Ct,Ze.count)):pt!=null&&(je=Math.max(je,0),Ct=Math.min(Ct,pt.count));const Bt=Ct-je;if(Bt<0||Bt===1/0)return;Se.setup(ee,j,Ue,ie,Ze);let Ot,It=lt;if(Ze!==null&&(Ot=oe.get(Ze),It=vt,It.setIndex(Ot)),ee.isMesh)j.wireframe===!0?(ve.setLineWidth(j.wireframeLinewidth*qe()),It.setMode(F.LINES)):It.setMode(F.TRIANGLES);else if(ee.isLine){let cn=j.linewidth;cn===void 0&&(cn=1),ve.setLineWidth(cn*qe()),ee.isLineSegments?It.setMode(F.LINES):ee.isLineLoop?It.setMode(F.LINE_LOOP):It.setMode(F.LINE_STRIP)}else ee.isPoints?It.setMode(F.POINTS):ee.isSprite&&It.setMode(F.TRIANGLES);if(ee.isBatchedMesh)if(ze.get("WEBGL_multi_draw"))It.renderMultiDraw(ee._multiDrawStarts,ee._multiDrawCounts,ee._multiDrawCount);else{const cn=ee._multiDrawStarts,He=ee._multiDrawCounts,Un=ee._multiDrawCount,bt=Ze?oe.get(Ze).bytesPerElement:1,Wn=C.get(j).currentProgram.getUniforms();for(let li=0;li<Un;li++)Wn.setValue(F,"_gl_DrawID",li),It.render(cn[li]/bt,He[li])}else if(ee.isInstancedMesh)It.renderInstances(je,Bt,ee.count);else if(ie.isInstancedBufferGeometry){const cn=ie._maxInstanceCount!==void 0?ie._maxInstanceCount:1/0,He=Math.min(ie.instanceCount,cn);It.renderInstances(je,Bt,He)}else It.render(je,Bt)};function mt(T,X,ie){T.transparent===!0&&T.side===mi&&T.forceSinglePass===!1?(T.side=bn,T.needsUpdate=!0,Ca(T,X,ie),T.side=Fi,T.needsUpdate=!0,Ca(T,X,ie),T.side=mi):Ca(T,X,ie)}this.compile=function(T,X,ie=null){ie===null&&(ie=T),M=De.get(ie),M.init(X),b.push(M),ie.traverseVisible(function(ee){ee.isLight&&ee.layers.test(X.layers)&&(M.pushLight(ee),ee.castShadow&&M.pushShadow(ee))}),T!==ie&&T.traverseVisible(function(ee){ee.isLight&&ee.layers.test(X.layers)&&(M.pushLight(ee),ee.castShadow&&M.pushShadow(ee))}),M.setupLights();const j=new Set;return T.traverse(function(ee){if(!(ee.isMesh||ee.isPoints||ee.isLine||ee.isSprite))return;const Oe=ee.material;if(Oe)if(Array.isArray(Oe))for(let We=0;We<Oe.length;We++){const Ue=Oe[We];mt(Ue,ie,ee),j.add(Ue)}else mt(Oe,ie,ee),j.add(Oe)}),M=b.pop(),j},this.compileAsync=function(T,X,ie=null){const j=this.compile(T,X,ie);return new Promise(ee=>{function Oe(){if(j.forEach(function(We){C.get(We).currentProgram.isReady()&&j.delete(We)}),j.size===0){ee(T);return}setTimeout(Oe,10)}ze.get("KHR_parallel_shader_compile")!==null?Oe():setTimeout(Oe,10)})};let ut=null;function gt(T){ut&&ut(T)}function qt(){ln.stop()}function Dn(){ln.start()}const ln=new rm;ln.setAnimationLoop(gt),typeof self<"u"&&ln.setContext(self),this.setAnimationLoop=function(T){ut=T,G.setAnimationLoop(T),T===null?ln.stop():ln.start()},G.addEventListener("sessionstart",qt),G.addEventListener("sessionend",Dn),this.render=function(T,X){if(X!==void 0&&X.isCamera!==!0){Ye("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;V!==null&&V.renderStart(T,X);const ie=G.enabled===!0&&G.isPresenting===!0,j=E!==null&&(B===null||ie)&&E.begin(P,B);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(G.cameraAutoUpdate===!0&&G.updateCamera(X),X=G.getCamera()),T.isScene===!0&&T.onBeforeRender(P,T,X,B),M=De.get(T,b.length),M.init(X),M.state.textureUnits=S.getTextureUnits(),b.push(M),Q.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),N.setFromProjectionMatrix(Q,Bn,X.reversedDepth),k=this.localClippingEnabled,U=Ve.init(this.clippingPlanes,k),w=ue.get(T,A.length),w.init(),A.push(w),G.enabled===!0&&G.isPresenting===!0){const We=P.xr.getDepthSensingMesh();We!==null&&Yt(We,X,-1/0,P.sortObjects)}Yt(T,X,0,P.sortObjects),w.finish(),P.sortObjects===!0&&w.sort(re,Ae),he=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,he&&Me.addToRenderList(w,T),this.info.render.frame++,U===!0&&Ve.beginShadows();const ee=M.state.shadowsArray;if(Ce.render(ee,T,X),U===!0&&Ve.endShadows(),this.info.autoReset===!0&&this.info.reset(),(j&&E.hasRenderPass())===!1){const We=w.opaque,Ue=w.transmissive;if(M.setupLights(),X.isArrayCamera){const Ze=X.cameras;if(Ue.length>0)for(let Je=0,dt=Ze.length;Je<dt;Je++){const pt=Ze[Je];Yn(We,Ue,T,pt)}he&&Me.render(T);for(let Je=0,dt=Ze.length;Je<dt;Je++){const pt=Ze[Je];Zt(w,T,pt,pt.viewport)}}else Ue.length>0&&Yn(We,Ue,T,X),he&&Me.render(T),Zt(w,T,X)}B!==null&&K===0&&(S.updateMultisampleRenderTarget(B),S.updateRenderTargetMipmap(B)),j&&E.end(P),T.isScene===!0&&T.onAfterRender(P,T,X),Se.resetDefaultState(),H=-1,Y=null,b.pop(),b.length>0?(M=b[b.length-1],S.setTextureUnits(M.state.textureUnits),U===!0&&Ve.setGlobalState(P.clippingPlanes,M.state.camera)):M=null,A.pop(),A.length>0?w=A[A.length-1]:w=null,V!==null&&V.renderEnd()};function Yt(T,X,ie,j){if(T.visible===!1)return;if(T.layers.test(X.layers)){if(T.isGroup)ie=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(X);else if(T.isLightProbeGrid)M.pushLightProbeGrid(T);else if(T.isLight)M.pushLight(T),T.castShadow&&M.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||N.intersectsSprite(T)){j&&se.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Q);const We=be.update(T),Ue=T.material;Ue.visible&&w.push(T,We,Ue,ie,se.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||N.intersectsObject(T))){const We=be.update(T),Ue=T.material;if(j&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),se.copy(T.boundingSphere.center)):(We.boundingSphere===null&&We.computeBoundingSphere(),se.copy(We.boundingSphere.center)),se.applyMatrix4(T.matrixWorld).applyMatrix4(Q)),Array.isArray(Ue)){const Ze=We.groups;for(let Je=0,dt=Ze.length;Je<dt;Je++){const pt=Ze[Je],je=Ue[pt.materialIndex];je&&je.visible&&w.push(T,We,je,ie,se.z,pt)}}else Ue.visible&&w.push(T,We,Ue,ie,se.z,null)}}const Oe=T.children;for(let We=0,Ue=Oe.length;We<Ue;We++)Yt(Oe[We],X,ie,j)}function Zt(T,X,ie,j){const{opaque:ee,transmissive:Oe,transparent:We}=T;M.setupLightsView(ie),U===!0&&Ve.setGlobalState(P.clippingPlanes,ie),j&&ve.viewport(pe.copy(j)),ee.length>0&&oi(ee,X,ie),Oe.length>0&&oi(Oe,X,ie),We.length>0&&oi(We,X,ie),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function Yn(T,X,ie,j){if((ie.isScene===!0?ie.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[j.id]===void 0){const je=ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[j.id]=new Gn(1,1,{generateMipmaps:!0,type:je?Mi:Tn,minFilter:_i,samples:Math.max(4,et.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:_t.workingColorSpace})}const Oe=M.state.transmissionRenderTarget[j.id],We=j.viewport||pe;Oe.setSize(We.z*P.transmissionResolutionScale,We.w*P.transmissionResolutionScale);const Ue=P.getRenderTarget(),Ze=P.getActiveCubeFace(),Je=P.getActiveMipmapLevel();P.setRenderTarget(Oe),P.getClearColor(Re),le=P.getClearAlpha(),le<1&&P.setClearColor(16777215,.5),P.clear(),he&&Me.render(ie);const dt=P.toneMapping;P.toneMapping=ni;const pt=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),M.setupLightsView(j),U===!0&&Ve.setGlobalState(P.clippingPlanes,j),oi(T,ie,j),S.updateMultisampleRenderTarget(Oe),S.updateRenderTargetMipmap(Oe),ze.has("WEBGL_multisampled_render_to_texture")===!1){let je=!1;for(let Ct=0,Bt=X.length;Ct<Bt;Ct++){const Ot=X[Ct],{object:It,geometry:cn,material:He,group:Un}=Ot;if(He.side===mi&&It.layers.test(j.layers)){const bt=He.side;He.side=bn,He.needsUpdate=!0,Ed(It,ie,j,cn,He,Un),He.side=bt,He.needsUpdate=!0,je=!0}}je===!0&&(S.updateMultisampleRenderTarget(Oe),S.updateRenderTargetMipmap(Oe))}P.setRenderTarget(Ue,Ze,Je),P.setClearColor(Re,le),pt!==void 0&&(j.viewport=pt),P.toneMapping=dt}function oi(T,X,ie){const j=X.isScene===!0?X.overrideMaterial:null;for(let ee=0,Oe=T.length;ee<Oe;ee++){const We=T[ee],{object:Ue,geometry:Ze,group:Je}=We;let dt=We.material;dt.allowOverride===!0&&j!==null&&(dt=j),Ue.layers.test(ie.layers)&&Ed(Ue,X,ie,Ze,dt,Je)}}function Ed(T,X,ie,j,ee,Oe){T.onBeforeRender(P,X,ie,j,ee,Oe),T.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),ee.onBeforeRender(P,X,ie,j,T,Oe),ee.transparent===!0&&ee.side===mi&&ee.forceSinglePass===!1?(ee.side=bn,ee.needsUpdate=!0,P.renderBufferDirect(ie,X,j,ee,T,Oe),ee.side=Fi,ee.needsUpdate=!0,P.renderBufferDirect(ie,X,j,ee,T,Oe),ee.side=mi):P.renderBufferDirect(ie,X,j,ee,T,Oe),T.onAfterRender(P,X,ie,j,ee,Oe)}function Ca(T,X,ie){X.isScene!==!0&&(X=ce);const j=C.get(T),ee=M.state.lights,Oe=M.state.shadowsArray,We=ee.state.version,Ue=Te.getParameters(T,ee.state,Oe,X,ie,M.state.lightProbeGridArray),Ze=Te.getProgramCacheKey(Ue);let Je=j.programs;j.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?X.environment:null,j.fog=X.fog;const dt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;j.envMap=$.get(T.envMap||j.environment,dt),j.envMapRotation=j.environment!==null&&T.envMap===null?X.environmentRotation:T.envMapRotation,Je===void 0&&(T.addEventListener("dispose",it),Je=new Map,j.programs=Je);let pt=Je.get(Ze);if(pt!==void 0){if(j.currentProgram===pt&&j.lightsStateVersion===We)return Ad(T,Ue),pt}else Ue.uniforms=Te.getUniforms(T),V!==null&&T.isNodeMaterial&&V.build(T,ie,Ue),T.onBeforeCompile(Ue,P),pt=Te.acquireProgram(Ue,Ze),Je.set(Ze,pt),j.uniforms=Ue.uniforms;const je=j.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(je.clippingPlanes=Ve.uniform),Ad(T,Ue),j.needsLights=Mm(T),j.lightsStateVersion=We,j.needsLights&&(je.ambientLightColor.value=ee.state.ambient,je.lightProbe.value=ee.state.probe,je.directionalLights.value=ee.state.directional,je.directionalLightShadows.value=ee.state.directionalShadow,je.spotLights.value=ee.state.spot,je.spotLightShadows.value=ee.state.spotShadow,je.rectAreaLights.value=ee.state.rectArea,je.ltc_1.value=ee.state.rectAreaLTC1,je.ltc_2.value=ee.state.rectAreaLTC2,je.pointLights.value=ee.state.point,je.pointLightShadows.value=ee.state.pointShadow,je.hemisphereLights.value=ee.state.hemi,je.directionalShadowMatrix.value=ee.state.directionalShadowMatrix,je.spotLightMatrix.value=ee.state.spotLightMatrix,je.spotLightMap.value=ee.state.spotLightMap,je.pointShadowMatrix.value=ee.state.pointShadowMatrix),j.lightProbeGrid=M.state.lightProbeGridArray.length>0,j.currentProgram=pt,j.uniformsList=null,pt}function Td(T){if(T.uniformsList===null){const X=T.currentProgram.getUniforms();T.uniformsList=Co.seqWithValue(X.seq,T.uniforms)}return T.uniformsList}function Ad(T,X){const ie=C.get(T);ie.outputColorSpace=X.outputColorSpace,ie.batching=X.batching,ie.batchingColor=X.batchingColor,ie.instancing=X.instancing,ie.instancingColor=X.instancingColor,ie.instancingMorph=X.instancingMorph,ie.skinning=X.skinning,ie.morphTargets=X.morphTargets,ie.morphNormals=X.morphNormals,ie.morphColors=X.morphColors,ie.morphTargetsCount=X.morphTargetsCount,ie.numClippingPlanes=X.numClippingPlanes,ie.numIntersection=X.numClipIntersection,ie.vertexAlphas=X.vertexAlphas,ie.vertexTangents=X.vertexTangents,ie.toneMapping=X.toneMapping}function xm(T,X){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;y.setFromMatrixPosition(X.matrixWorld);for(let ie=0,j=T.length;ie<j;ie++){const ee=T[ie];if(ee.texture!==null&&ee.boundingBox.containsPoint(y))return ee}return null}function ym(T,X,ie,j,ee){X.isScene!==!0&&(X=ce),S.resetTextureUnits();const Oe=X.fog,We=j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial?X.environment:null,Ue=B===null?P.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:_t.workingColorSpace,Ze=j.isMeshStandardMaterial||j.isMeshLambertMaterial&&!j.envMap||j.isMeshPhongMaterial&&!j.envMap,Je=$.get(j.envMap||We,Ze),dt=j.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,pt=!!ie.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),je=!!ie.morphAttributes.position,Ct=!!ie.morphAttributes.normal,Bt=!!ie.morphAttributes.color;let Ot=ni;j.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(Ot=P.toneMapping);const It=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,cn=It!==void 0?It.length:0,He=C.get(j),Un=M.state.lights;if(U===!0&&(k===!0||T!==Y)){const Lt=T===Y&&j.id===H;Ve.setState(j,T,Lt)}let bt=!1;j.version===He.__version?(He.needsLights&&He.lightsStateVersion!==Un.state.version||He.outputColorSpace!==Ue||ee.isBatchedMesh&&He.batching===!1||!ee.isBatchedMesh&&He.batching===!0||ee.isBatchedMesh&&He.batchingColor===!0&&ee.colorTexture===null||ee.isBatchedMesh&&He.batchingColor===!1&&ee.colorTexture!==null||ee.isInstancedMesh&&He.instancing===!1||!ee.isInstancedMesh&&He.instancing===!0||ee.isSkinnedMesh&&He.skinning===!1||!ee.isSkinnedMesh&&He.skinning===!0||ee.isInstancedMesh&&He.instancingColor===!0&&ee.instanceColor===null||ee.isInstancedMesh&&He.instancingColor===!1&&ee.instanceColor!==null||ee.isInstancedMesh&&He.instancingMorph===!0&&ee.morphTexture===null||ee.isInstancedMesh&&He.instancingMorph===!1&&ee.morphTexture!==null||He.envMap!==Je||j.fog===!0&&He.fog!==Oe||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==Ve.numPlanes||He.numIntersection!==Ve.numIntersection)||He.vertexAlphas!==dt||He.vertexTangents!==pt||He.morphTargets!==je||He.morphNormals!==Ct||He.morphColors!==Bt||He.toneMapping!==Ot||He.morphTargetsCount!==cn||!!He.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(bt=!0):(bt=!0,He.__version=j.version);let Wn=He.currentProgram;bt===!0&&(Wn=Ca(j,X,ee),V&&j.isNodeMaterial&&V.onUpdateProgram(j,Wn,He));let li=!1,zi=!1,zs=!1;const Pt=Wn.getUniforms(),zt=He.uniforms;if(ve.useProgram(Wn.program)&&(li=!0,zi=!0,zs=!0),j.id!==H&&(H=j.id,zi=!0),He.needsLights){const Lt=xm(M.state.lightProbeGridArray,ee);He.lightProbeGrid!==Lt&&(He.lightProbeGrid=Lt,zi=!0)}if(li||Y!==T){ve.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Pt.setValue(F,"projectionMatrix",T.projectionMatrix),Pt.setValue(F,"viewMatrix",T.matrixWorldInverse);const Gi=Pt.map.cameraPosition;Gi!==void 0&&Gi.setValue(F,Z.setFromMatrixPosition(T.matrixWorld)),et.logarithmicDepthBuffer&&Pt.setValue(F,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&Pt.setValue(F,"isOrthographic",T.isOrthographicCamera===!0),Y!==T&&(Y=T,zi=!0,zs=!0)}if(He.needsLights&&(Un.state.directionalShadowMap.length>0&&Pt.setValue(F,"directionalShadowMap",Un.state.directionalShadowMap,S),Un.state.spotShadowMap.length>0&&Pt.setValue(F,"spotShadowMap",Un.state.spotShadowMap,S),Un.state.pointShadowMap.length>0&&Pt.setValue(F,"pointShadowMap",Un.state.pointShadowMap,S)),ee.isSkinnedMesh){Pt.setOptional(F,ee,"bindMatrix"),Pt.setOptional(F,ee,"bindMatrixInverse");const Lt=ee.skeleton;Lt&&(Lt.boneTexture===null&&Lt.computeBoneTexture(),Pt.setValue(F,"boneTexture",Lt.boneTexture,S))}ee.isBatchedMesh&&(Pt.setOptional(F,ee,"batchingTexture"),Pt.setValue(F,"batchingTexture",ee._matricesTexture,S),Pt.setOptional(F,ee,"batchingIdTexture"),Pt.setValue(F,"batchingIdTexture",ee._indirectTexture,S),Pt.setOptional(F,ee,"batchingColorTexture"),ee._colorsTexture!==null&&Pt.setValue(F,"batchingColorTexture",ee._colorsTexture,S));const Vi=ie.morphAttributes;if((Vi.position!==void 0||Vi.normal!==void 0||Vi.color!==void 0)&&at.update(ee,ie,Wn),(zi||He.receiveShadow!==ee.receiveShadow)&&(He.receiveShadow=ee.receiveShadow,Pt.setValue(F,"receiveShadow",ee.receiveShadow)),(j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial)&&j.envMap===null&&X.environment!==null&&(zt.envMapIntensity.value=X.environmentIntensity),zt.dfgLUT!==void 0&&(zt.dfgLUT.value=gS()),zi){if(Pt.setValue(F,"toneMappingExposure",P.toneMappingExposure),He.needsLights&&bm(zt,zs),Oe&&j.fog===!0&&ae.refreshFogUniforms(zt,Oe),ae.refreshMaterialUniforms(zt,j,Le,Be,M.state.transmissionRenderTarget[T.id]),He.needsLights&&He.lightProbeGrid){const Lt=He.lightProbeGrid;zt.probesSH.value=Lt.texture,zt.probesMin.value.copy(Lt.boundingBox.min),zt.probesMax.value.copy(Lt.boundingBox.max),zt.probesResolution.value.copy(Lt.resolution)}Co.upload(F,Td(He),zt,S)}if(j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Co.upload(F,Td(He),zt,S),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&Pt.setValue(F,"center",ee.center),Pt.setValue(F,"modelViewMatrix",ee.modelViewMatrix),Pt.setValue(F,"normalMatrix",ee.normalMatrix),Pt.setValue(F,"modelMatrix",ee.matrixWorld),j.uniformsGroups!==void 0){const Lt=j.uniformsGroups;for(let Gi=0,Vs=Lt.length;Gi<Vs;Gi++){const Cd=Lt[Gi];L.update(Cd,Wn),L.bind(Cd,Wn)}}return Wn}function bm(T,X){T.ambientLightColor.needsUpdate=X,T.lightProbe.needsUpdate=X,T.directionalLights.needsUpdate=X,T.directionalLightShadows.needsUpdate=X,T.pointLights.needsUpdate=X,T.pointLightShadows.needsUpdate=X,T.spotLights.needsUpdate=X,T.spotLightShadows.needsUpdate=X,T.rectAreaLights.needsUpdate=X,T.hemisphereLights.needsUpdate=X}function Mm(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return K},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(T,X,ie){const j=C.get(T);j.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),C.get(T.texture).__webglTexture=X,C.get(T.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:ie,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,X){const ie=C.get(T);ie.__webglFramebuffer=X,ie.__useDefaultFramebuffer=X===void 0};const Sm=F.createFramebuffer();this.setRenderTarget=function(T,X=0,ie=0){B=T,J=X,K=ie;let j=null,ee=!1,Oe=!1;if(T){const Ue=C.get(T);if(Ue.__useDefaultFramebuffer!==void 0){ve.bindFramebuffer(F.FRAMEBUFFER,Ue.__webglFramebuffer),pe.copy(T.viewport),_e.copy(T.scissor),ye=T.scissorTest,ve.viewport(pe),ve.scissor(_e),ve.setScissorTest(ye),H=-1;return}else if(Ue.__webglFramebuffer===void 0)S.setupRenderTarget(T);else if(Ue.__hasExternalTextures)S.rebindTextures(T,C.get(T.texture).__webglTexture,C.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const dt=T.depthTexture;if(Ue.__boundDepthTexture!==dt){if(dt!==null&&C.has(dt)&&(T.width!==dt.image.width||T.height!==dt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");S.setupDepthRenderbuffer(T)}}const Ze=T.texture;(Ze.isData3DTexture||Ze.isDataArrayTexture||Ze.isCompressedArrayTexture)&&(Oe=!0);const Je=C.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Je[X])?j=Je[X][ie]:j=Je[X],ee=!0):T.samples>0&&S.useMultisampledRTT(T)===!1?j=C.get(T).__webglMultisampledFramebuffer:Array.isArray(Je)?j=Je[ie]:j=Je,pe.copy(T.viewport),_e.copy(T.scissor),ye=T.scissorTest}else pe.copy(xe).multiplyScalar(Le).floor(),_e.copy(Xe).multiplyScalar(Le).floor(),ye=ne;if(ie!==0&&(j=Sm),ve.bindFramebuffer(F.FRAMEBUFFER,j)&&ve.drawBuffers(T,j),ve.viewport(pe),ve.scissor(_e),ve.setScissorTest(ye),ee){const Ue=C.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ue.__webglTexture,ie)}else if(Oe){const Ue=X;for(let Ze=0;Ze<T.textures.length;Ze++){const Je=C.get(T.textures[Ze]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Ze,Je.__webglTexture,ie,Ue)}}else if(T!==null&&ie!==0){const Ue=C.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ue.__webglTexture,ie)}H=-1},this.readRenderTargetPixels=function(T,X,ie,j,ee,Oe,We,Ue=0){if(!(T&&T.isWebGLRenderTarget)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ze=C.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&We!==void 0&&(Ze=Ze[We]),Ze){ve.bindFramebuffer(F.FRAMEBUFFER,Ze);try{const Je=T.textures[Ue],dt=Je.format,pt=Je.type;if(T.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Ue),!et.textureFormatReadable(dt)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!et.textureTypeReadable(pt)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=T.width-j&&ie>=0&&ie<=T.height-ee&&F.readPixels(X,ie,j,ee,z.convert(dt),z.convert(pt),Oe)}finally{const Je=B!==null?C.get(B).__webglFramebuffer:null;ve.bindFramebuffer(F.FRAMEBUFFER,Je)}}},this.readRenderTargetPixelsAsync=async function(T,X,ie,j,ee,Oe,We,Ue=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ze=C.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&We!==void 0&&(Ze=Ze[We]),Ze)if(X>=0&&X<=T.width-j&&ie>=0&&ie<=T.height-ee){ve.bindFramebuffer(F.FRAMEBUFFER,Ze);const Je=T.textures[Ue],dt=Je.format,pt=Je.type;if(T.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Ue),!et.textureFormatReadable(dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!et.textureTypeReadable(pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const je=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,je),F.bufferData(F.PIXEL_PACK_BUFFER,Oe.byteLength,F.STREAM_READ),F.readPixels(X,ie,j,ee,z.convert(dt),z.convert(pt),0);const Ct=B!==null?C.get(B).__webglFramebuffer:null;ve.bindFramebuffer(F.FRAMEBUFFER,Ct);const Bt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await wg(F,Bt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,je),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Oe),F.deleteBuffer(je),F.deleteSync(Bt),Oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,X=null,ie=0){const j=Math.pow(2,-ie),ee=Math.floor(T.image.width*j),Oe=Math.floor(T.image.height*j),We=X!==null?X.x:0,Ue=X!==null?X.y:0;S.setTexture2D(T,0),F.copyTexSubImage2D(F.TEXTURE_2D,ie,0,0,We,Ue,ee,Oe),ve.unbindTexture()};const wm=F.createFramebuffer(),Em=F.createFramebuffer();this.copyTextureToTexture=function(T,X,ie=null,j=null,ee=0,Oe=0){let We,Ue,Ze,Je,dt,pt,je,Ct,Bt;const Ot=T.isCompressedTexture?T.mipmaps[Oe]:T.image;if(ie!==null)We=ie.max.x-ie.min.x,Ue=ie.max.y-ie.min.y,Ze=ie.isBox3?ie.max.z-ie.min.z:1,Je=ie.min.x,dt=ie.min.y,pt=ie.isBox3?ie.min.z:0;else{const zt=Math.pow(2,-ee);We=Math.floor(Ot.width*zt),Ue=Math.floor(Ot.height*zt),T.isDataArrayTexture?Ze=Ot.depth:T.isData3DTexture?Ze=Math.floor(Ot.depth*zt):Ze=1,Je=0,dt=0,pt=0}j!==null?(je=j.x,Ct=j.y,Bt=j.z):(je=0,Ct=0,Bt=0);const It=z.convert(X.format),cn=z.convert(X.type);let He;X.isData3DTexture?(S.setTexture3D(X,0),He=F.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(S.setTexture2DArray(X,0),He=F.TEXTURE_2D_ARRAY):(S.setTexture2D(X,0),He=F.TEXTURE_2D),ve.activeTexture(F.TEXTURE0),ve.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,X.flipY),ve.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),ve.pixelStorei(F.UNPACK_ALIGNMENT,X.unpackAlignment);const Un=ve.getParameter(F.UNPACK_ROW_LENGTH),bt=ve.getParameter(F.UNPACK_IMAGE_HEIGHT),Wn=ve.getParameter(F.UNPACK_SKIP_PIXELS),li=ve.getParameter(F.UNPACK_SKIP_ROWS),zi=ve.getParameter(F.UNPACK_SKIP_IMAGES);ve.pixelStorei(F.UNPACK_ROW_LENGTH,Ot.width),ve.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ot.height),ve.pixelStorei(F.UNPACK_SKIP_PIXELS,Je),ve.pixelStorei(F.UNPACK_SKIP_ROWS,dt),ve.pixelStorei(F.UNPACK_SKIP_IMAGES,pt);const zs=T.isDataArrayTexture||T.isData3DTexture,Pt=X.isDataArrayTexture||X.isData3DTexture;if(T.isDepthTexture){const zt=C.get(T),Vi=C.get(X),Lt=C.get(zt.__renderTarget),Gi=C.get(Vi.__renderTarget);ve.bindFramebuffer(F.READ_FRAMEBUFFER,Lt.__webglFramebuffer),ve.bindFramebuffer(F.DRAW_FRAMEBUFFER,Gi.__webglFramebuffer);for(let Vs=0;Vs<Ze;Vs++)zs&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,C.get(T).__webglTexture,ee,pt+Vs),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,C.get(X).__webglTexture,Oe,Bt+Vs)),F.blitFramebuffer(Je,dt,We,Ue,je,Ct,We,Ue,F.DEPTH_BUFFER_BIT,F.NEAREST);ve.bindFramebuffer(F.READ_FRAMEBUFFER,null),ve.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(ee!==0||T.isRenderTargetTexture||C.has(T)){const zt=C.get(T),Vi=C.get(X);ve.bindFramebuffer(F.READ_FRAMEBUFFER,wm),ve.bindFramebuffer(F.DRAW_FRAMEBUFFER,Em);for(let Lt=0;Lt<Ze;Lt++)zs?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,zt.__webglTexture,ee,pt+Lt):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,zt.__webglTexture,ee),Pt?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Vi.__webglTexture,Oe,Bt+Lt):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Vi.__webglTexture,Oe),ee!==0?F.blitFramebuffer(Je,dt,We,Ue,je,Ct,We,Ue,F.COLOR_BUFFER_BIT,F.NEAREST):Pt?F.copyTexSubImage3D(He,Oe,je,Ct,Bt+Lt,Je,dt,We,Ue):F.copyTexSubImage2D(He,Oe,je,Ct,Je,dt,We,Ue);ve.bindFramebuffer(F.READ_FRAMEBUFFER,null),ve.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Pt?T.isDataTexture||T.isData3DTexture?F.texSubImage3D(He,Oe,je,Ct,Bt,We,Ue,Ze,It,cn,Ot.data):X.isCompressedArrayTexture?F.compressedTexSubImage3D(He,Oe,je,Ct,Bt,We,Ue,Ze,It,Ot.data):F.texSubImage3D(He,Oe,je,Ct,Bt,We,Ue,Ze,It,cn,Ot):T.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Oe,je,Ct,We,Ue,It,cn,Ot.data):T.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Oe,je,Ct,Ot.width,Ot.height,It,Ot.data):F.texSubImage2D(F.TEXTURE_2D,Oe,je,Ct,We,Ue,It,cn,Ot);ve.pixelStorei(F.UNPACK_ROW_LENGTH,Un),ve.pixelStorei(F.UNPACK_IMAGE_HEIGHT,bt),ve.pixelStorei(F.UNPACK_SKIP_PIXELS,Wn),ve.pixelStorei(F.UNPACK_SKIP_ROWS,li),ve.pixelStorei(F.UNPACK_SKIP_IMAGES,zi),Oe===0&&X.generateMipmaps&&F.generateMipmap(He),ve.unbindTexture()},this.initRenderTarget=function(T){C.get(T).__webglFramebuffer===void 0&&S.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?S.setTextureCube(T,0):T.isData3DTexture?S.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?S.setTexture2DArray(T,0):S.setTexture2D(T,0),ve.unbindTexture()},this.resetState=function(){J=0,K=0,B=null,ve.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=_t._getDrawingBufferColorSpace(e),t.unpackColorSpace=_t._getUnpackColorSpace()}}const _S=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Ru,AddEquation:Ji,AddOperation:Wf,AdditiveAnimationBlendMode:zu,AdditiveBlending:ru,AgXToneMapping:Pu,AlphaFormat:ku,AlwaysCompare:np,AlwaysDepth:Do,AlwaysStencilFunc:uu,AmbientLight:qp,AnimationAction:nm,AnimationClip:xa,AnimationLoader:m0,AnimationMixer:X0,AnimationObjectGroup:H0,AnimationUtils:d0,ArcCurve:xp,ArrayCamera:jp,ArrowHelper:mv,AttachedBindMode:lu,Audio:em,AudioAnalyser:D0,AudioContext:pd,AudioListener:I0,AudioLoader:T0,AxesHelper:gv,BackSide:bn,BasicDepthPacking:Zf,BasicShadowMap:Pm,BatchedMesh:fp,BezierInterpolant:zp,Bone:qu,BooleanKeyframeTrack:ks,Box2:ev,Box3:Kt,Box3Helper:fv,BoxGeometry:os,BoxHelper:hv,BufferAttribute:Rt,BufferGeometry:ct,BufferGeometryLoader:Kp,ByteType:Uu,Cache:vi,Camera:nc,CameraHelper:dv,CanvasTexture:I_,CapsuleGeometry:Wl,CatmullRomCurve3:yp,CineonToneMapping:Cu,CircleGeometry:Xl,ClampToEdgeWrapping:Rn,Clock:J0,Color:Fe,ColorKeyframeTrack:cd,ColorManagement:_t,Compatibility:xg,CompressedArrayTexture:C_,CompressedCubeTexture:R_,CompressedTexture:Hl,CompressedTextureLoader:g0,ConeGeometry:Os,ConstantAlphaFactor:Vf,ConstantColorFactor:Bf,Controls:vv,CubeCamera:Jp,CubeDepthTexture:_p,CubeReflectionMapping:bi,CubeRefractionMapping:ts,CubeTexture:Sa,CubeTextureLoader:_0,CubeUVReflectionMapping:Mr,CubicBezierCurve:Ju,CubicBezierCurve3:bp,CubicInterpolant:kp,CullFaceBack:su,CullFaceFront:Sf,CullFaceFrontBack:Im,CullFaceNone:Mf,Curve:ai,CurvePath:Sp,CustomBlending:Ef,CustomToneMapping:Iu,CylinderGeometry:wa,Cylindrical:Q0,Data3DTexture:Fl,DataArrayTexture:Nl,DataTexture:ii,DataTextureLoader:v0,DataUtils:t_,DecrementStencilOp:Km,DecrementWrapStencilOp:jm,DefaultLoadingManager:Gp,DepthFormat:Si,DepthStencilFormat:ji,DepthTexture:Us,DetachedBindMode:Xf,DirectionalLight:$p,DirectionalLightHelper:uv,DiscreteInterpolant:Bp,DodecahedronGeometry:$l,DoubleSide:mi,DstAlphaFactor:Uf,DstColorFactor:Ff,DynamicCopyUsage:fg,DynamicDrawUsage:og,DynamicReadUsage:ug,EdgesGeometry:vp,EllipseCurve:ql,EqualCompare:Qf,EqualDepth:No,EqualStencilFunc:ng,EquirectangularReflectionMapping:qr,EquirectangularRefractionMapping:Yr,Euler:si,EventDispatcher:ri,ExternalTexture:Zu,ExtrudeGeometry:Yl,FileLoader:ki,Float16BufferAttribute:l_,Float32BufferAttribute:Ge,FloatType:xn,Fog:Bl,FogExp2:kl,FramebufferTexture:A_,FrontSide:Fi,Frustum:wr,FrustumArray:Gl,GLBufferAttribute:Z0,GLSL1:mg,GLSL3:du,GreaterCompare:ep,GreaterDepth:Oo,GreaterEqualCompare:Ul,GreaterEqualDepth:Fo,GreaterEqualStencilFunc:ag,GreaterStencilFunc:sg,GridHelper:lv,Group:fr,HTMLTexture:P_,HalfFloatType:Mi,HemisphereLight:Hp,HemisphereLightHelper:ov,IcosahedronGeometry:Zl,ImageBitmapLoader:E0,ImageLoader:ya,ImageUtils:ap,IncrementStencilOp:Zm,IncrementWrapStencilOp:Jm,InstancedBufferAttribute:xr,InstancedBufferGeometry:fd,InstancedInterleavedBuffer:Ml,InstancedMesh:hp,Int16BufferAttribute:a_,Int32BufferAttribute:o_,Int8BufferAttribute:i_,IntType:Tl,InterleavedBuffer:zl,InterleavedBufferAttribute:zn,Interpolant:Ar,InterpolateBezier:cu,InterpolateDiscrete:oa,InterpolateLinear:ml,InterpolateSmooth:To,InterpolationSamplingMode:vg,InterpolationSamplingType:_g,InvertStencilOp:Qm,KeepStencilOp:Ms,KeyframeTrack:qn,LOD:up,LatheGeometry:Kl,Layers:Ol,LessCompare:jf,LessDepth:Uo,LessEqualCompare:Dl,LessEqualDepth:Ls,LessEqualStencilFunc:ig,LessStencilFunc:tg,Light:cs,LightProbe:Zp,Line:ss,Line3:im,LineBasicMaterial:Mn,LineCurve:ju,LineCurve3:Mp,LineDashedMaterial:Fp,LineLoop:pp,LineSegments:wi,LinearFilter:Ut,LinearInterpolant:ld,LinearMipMapLinearFilter:Fm,LinearMipMapNearestFilter:Nm,LinearMipmapLinearFilter:_i,LinearMipmapNearestFilter:Zr,LinearSRGBColorSpace:ca,LinearToneMapping:Tu,LinearTransfer:ua,Loader:Ln,LoaderUtils:gu,LoadingManager:ud,LoopOnce:$f,LoopPingPong:Yf,LoopRepeat:qf,MOUSE:Cm,Material:sn,MaterialBlending:Lm,MaterialLoader:ic,MathUtils:_l,Matrix2:vu,Matrix3:ot,Matrix4:st,MaxEquation:Rf,Mesh:At,MeshBasicMaterial:tn,MeshDepthMaterial:rd,MeshDistanceMaterial:ad,MeshLambertMaterial:Up,MeshMatcapMaterial:Np,MeshNormalMaterial:Dp,MeshPhongMaterial:Pp,MeshPhysicalMaterial:Ip,MeshStandardMaterial:sd,MeshToonMaterial:Lp,MinEquation:Cf,MirroredRepeatWrapping:sa,MixOperation:Hf,MultiplyBlending:ou,MultiplyOperation:ba,NearestFilter:Wt,NearestMipMapLinearFilter:Um,NearestMipMapNearestFilter:Dm,NearestMipmapLinearFilter:dr,NearestMipmapNearestFilter:Du,NeutralToneMapping:Lu,NeverCompare:Jf,NeverDepth:Lo,NeverStencilFunc:eg,NoBlending:yi,NoColorSpace:Li,NoNormalPacking:Wm,NoToneMapping:ni,NormalAnimationBlendMode:Ll,NormalBlending:Cs,NormalGAPacking:$m,NormalRGPacking:Xm,NotEqualCompare:tp,NotEqualDepth:ko,NotEqualStencilFunc:rg,NumberKeyframeTrack:_a,Object3D:yt,ObjectLoader:S0,ObjectSpaceNormalMap:Kf,OctahedronGeometry:Er,OneFactor:Pf,OneMinusConstantAlphaFactor:Gf,OneMinusConstantColorFactor:zf,OneMinusDstAlphaFactor:Nf,OneMinusDstColorFactor:Of,OneMinusSrcAlphaFactor:Po,OneMinusSrcColorFactor:Df,OrthographicCamera:Aa,PCFShadowMap:$r,PCFSoftShadowMap:wf,PMREMGenerator:yu,Path:bl,PerspectiveCamera:nn,Plane:Ki,PlaneGeometry:Tr,PlaneHelper:pv,PointLight:Xp,PointLightHelper:rv,Points:mp,PointsMaterial:Yu,PolarGridHelper:cv,PolyhedronGeometry:ls,PositionalAudio:L0,PropertyBinding:Mt,PropertyMixer:tm,QuadraticBezierCurve:Qu,QuadraticBezierCurve3:ed,Quaternion:pn,QuaternionKeyframeTrack:Ta,QuaternionLinearInterpolant:Vp,R11_EAC_Format:$o,RED_GREEN_RGTC2_Format:aa,RED_RGTC1_Format:hl,REVISION:wl,RG11_EAC_Format:ra,RGBADepthPacking:Vm,RGBAFormat:yn,RGBAIntegerFormat:Pl,RGBA_ASTC_10x10_Format:al,RGBA_ASTC_10x5_Format:il,RGBA_ASTC_10x6_Format:sl,RGBA_ASTC_10x8_Format:rl,RGBA_ASTC_12x10_Format:ol,RGBA_ASTC_12x12_Format:ll,RGBA_ASTC_4x4_Format:Zo,RGBA_ASTC_5x4_Format:Ko,RGBA_ASTC_5x5_Format:Jo,RGBA_ASTC_6x5_Format:jo,RGBA_ASTC_6x6_Format:Qo,RGBA_ASTC_8x5_Format:el,RGBA_ASTC_8x6_Format:tl,RGBA_ASTC_8x8_Format:nl,RGBA_BPTC_Format:cl,RGBA_ETC2_EAC_Format:Xo,RGBA_PVRTC_2BPPV1_Format:Go,RGBA_PVRTC_4BPPV1_Format:Vo,RGBA_S3TC_DXT1_Format:Jr,RGBA_S3TC_DXT3_Format:jr,RGBA_S3TC_DXT5_Format:Qr,RGBDepthPacking:Gm,RGBFormat:Bu,RGBIntegerFormat:Om,RGB_BPTC_SIGNED_Format:ul,RGB_BPTC_UNSIGNED_Format:dl,RGB_ETC1_Format:Ho,RGB_ETC2_Format:Wo,RGB_PVRTC_2BPPV1_Format:zo,RGB_PVRTC_4BPPV1_Format:Bo,RGB_S3TC_DXT1_Format:Kr,RGDepthPacking:Hm,RGFormat:ns,RGIntegerFormat:Il,RawShaderMaterial:id,Ray:Sr,Raycaster:K0,RectAreaLight:Yp,RedFormat:Rl,RedIntegerFormat:Ma,ReinhardToneMapping:Au,RenderTarget:Gu,RenderTarget3D:$0,RepeatWrapping:ia,ReplaceStencilOp:Ym,ReverseSubtractEquation:Af,RingGeometry:Jl,SIGNED_R11_EAC_Format:qo,SIGNED_RED_GREEN_RGTC2_Format:pl,SIGNED_RED_RGTC1_Format:fl,SIGNED_RG11_EAC_Format:Yo,SRGBColorSpace:En,SRGBTransfer:Tt,Scene:Hu,ShaderChunk:ft,ShaderLib:_n,ShaderMaterial:Hn,ShadowMaterial:Cp,Shape:Is,ShapeGeometry:jl,ShapePath:_v,ShapeUtils:ti,ShortType:Nu,Skeleton:Vl,SkeletonHelper:sv,SkinnedMesh:dp,Source:Qi,Sphere:Jt,SphereGeometry:ei,Spherical:j0,SphericalHarmonics3:hd,SplineCurve:td,SpotLight:Wp,SpotLightHelper:iv,Sprite:cp,SpriteMaterial:$u,SrcAlphaFactor:Io,SrcAlphaSaturateFactor:kf,SrcColorFactor:Lf,StaticCopyUsage:hg,StaticDrawUsage:da,StaticReadUsage:cg,StereoCamera:A0,StreamCopyUsage:pg,StreamDrawUsage:lg,StreamReadUsage:dg,StringKeyframeTrack:Bs,SubtractEquation:Tf,SubtractiveBlending:au,TOUCH:Rm,TangentSpaceNormalMap:Oi,TetrahedronGeometry:Ea,Texture:Ft,TextureLoader:x0,TextureUtils:Sv,Timer:Qp,TimestampQuery:gg,TorusGeometry:Fs,TorusKnotGeometry:Ql,Triangle:An,TriangleFanDrawMode:zm,TriangleStripDrawMode:Bm,TrianglesDrawMode:km,TubeGeometry:ec,UVMapping:El,Uint16BufferAttribute:Wu,Uint32BufferAttribute:Xu,Uint8BufferAttribute:s_,Uint8ClampedBufferAttribute:r_,Uniform:_d,UniformsGroup:Y0,UniformsLib:Pe,UniformsUtils:tc,UnsignedByteType:Tn,UnsignedInt101111Type:Ou,UnsignedInt248Type:_r,UnsignedInt5999Type:Fu,UnsignedIntType:$n,UnsignedShort4444Type:Al,UnsignedShort5551Type:Cl,UnsignedShortType:gr,VSMShadowMap:ur,Vector2:de,Vector3:I,Vector4:xt,VectorKeyframeTrack:va,VideoFrameTexture:T_,VideoTexture:gp,WebGL3DRenderTarget:$g,WebGLArrayRenderTarget:Xg,WebGLCoordinateSystem:Bn,WebGLCubeRenderTarget:vd,WebGLRenderTarget:Gn,WebGLRenderer:fm,WebGLUtils:dm,WebGPUCoordinateSystem:Ds,WebXRController:Ao,WireframeGeometry:nd,WrapAroundEnding:la,ZeroCurvatureEnding:Es,ZeroFactor:If,ZeroSlopeEnding:Ts,ZeroStencilOp:qm,createCanvasElement:sp,error:Ye,getConsoleFunction:Sg,log:fa,setConsoleFunction:Mg,warn:Ie,warnOnce:gl},Symbol.toStringTag,{value:"Module"})),of=new Kt,Mo=new I;class pm extends fd{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new Ge(e,3)),this.setAttribute("uv",new Ge(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new Ml(t,6,1);return this.setAttribute("instanceStart",new zn(n,3,0)),this.setAttribute("instanceEnd",new zn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new Ml(t,6,1);return this.setAttribute("instanceColorStart",new zn(n,3,0)),this.setAttribute("instanceColorEnd",new zn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new nd(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kt);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),of.setFromBufferAttribute(t),this.boundingBox.union(of))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jt),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Mo.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Mo)),Mo.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Mo));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}Pe.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new de(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};_n.line={uniforms:tc.merge([Pe.common,Pe.fog,Pe.line]),vertexShader:`
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
		`};class ac extends Hn{constructor(e){super({type:"LineMaterial",uniforms:tc.clone(_n.line.uniforms),vertexShader:_n.line.vertexShader,fragmentShader:_n.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Jc=new xt,lf=new I,cf=new I,rn=new xt,an=new xt,fi=new xt,jc=new I,Qc=new st,on=new im,uf=new I,So=new Kt,wo=new Jt,pi=new xt;let gi,Ps;function df(r,e,t){return pi.set(0,0,-e,1).applyMatrix4(r.projectionMatrix),pi.multiplyScalar(1/pi.w),pi.x=Ps/t.width,pi.y=Ps/t.height,pi.applyMatrix4(r.projectionMatrixInverse),pi.multiplyScalar(1/pi.w),Math.abs(Math.max(pi.x,pi.y))}function vS(r,e){const t=r.matrixWorld,n=r.geometry,i=n.attributes.instanceStart,s=n.attributes.instanceEnd,a=Math.min(n.instanceCount,i.count);for(let o=0,l=a;o<l;o++){on.start.fromBufferAttribute(i,o),on.end.fromBufferAttribute(s,o),on.applyMatrix4(t);const c=new I,u=new I;gi.distanceSqToSegment(on.start,on.end,u,c),u.distanceTo(c)<Ps*.5&&e.push({point:u,pointOnLine:c,distance:gi.origin.distanceTo(u),object:r,face:null,faceIndex:o,uv:null,uv1:null})}}function xS(r,e,t){const n=e.projectionMatrix,s=r.material.resolution,a=r.matrixWorld,o=r.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,u=Math.min(o.instanceCount,l.count),h=-e.near;gi.at(1,fi),fi.w=1,fi.applyMatrix4(e.matrixWorldInverse),fi.applyMatrix4(n),fi.multiplyScalar(1/fi.w),fi.x*=s.x/2,fi.y*=s.y/2,fi.z=0,jc.copy(fi),Qc.multiplyMatrices(e.matrixWorldInverse,a);for(let d=0,f=u;d<f;d++){if(rn.fromBufferAttribute(l,d),an.fromBufferAttribute(c,d),rn.w=1,an.w=1,rn.applyMatrix4(Qc),an.applyMatrix4(Qc),rn.z>h&&an.z>h)continue;if(rn.z>h){const x=rn.z-an.z,y=(rn.z-h)/x;rn.lerp(an,y)}else if(an.z>h){const x=an.z-rn.z,y=(an.z-h)/x;an.lerp(rn,y)}rn.applyMatrix4(n),an.applyMatrix4(n),rn.multiplyScalar(1/rn.w),an.multiplyScalar(1/an.w),rn.x*=s.x/2,rn.y*=s.y/2,an.x*=s.x/2,an.y*=s.y/2,on.start.copy(rn),on.start.z=0,on.end.copy(an),on.end.z=0;const _=on.closestPointToPointParameter(jc,!0);on.at(_,uf);const g=_l.lerp(rn.z,an.z,_),p=g>=-1&&g<=1,v=jc.distanceTo(uf)<Ps*.5;if(p&&v){on.start.fromBufferAttribute(l,d),on.end.fromBufferAttribute(c,d),on.start.applyMatrix4(a),on.end.applyMatrix4(a);const x=new I,y=new I;gi.distanceSqToSegment(on.start,on.end,y,x),t.push({point:y,pointOnLine:x,distance:gi.origin.distanceTo(y),object:r,face:null,faceIndex:d,uv:null,uv1:null})}}}class yS extends At{constructor(e=new pm,t=new ac({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)lf.fromBufferAttribute(t,a),cf.fromBufferAttribute(n,a),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+lf.distanceTo(cf);const s=new Ml(i,2,1);return e.setAttribute("instanceDistanceStart",new zn(s,1,0)),e.setAttribute("instanceDistanceEnd",new zn(s,1,1)),this}raycast(e,t){const n=this.material.worldUnits,i=e.camera;i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;gi=e.ray;const a=this.matrixWorld,o=this.geometry,l=this.material;Ps=l.linewidth+s,o.boundingSphere===null&&o.computeBoundingSphere(),wo.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=Ps*.5;else{const h=Math.max(i.near,wo.distanceToPoint(gi.origin));c=df(i,h,l.resolution)}if(wo.radius+=c,gi.intersectsSphere(wo)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),So.copy(o.boundingBox).applyMatrix4(a);let u;if(n)u=Ps*.5;else{const h=Math.max(i.near,So.distanceToPoint(gi.origin));u=df(i,h,l.resolution)}So.expandByScalar(u),gi.intersectsBox(So)!==!1&&(n?vS(this,t):xS(this,i,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Jc),this.material.uniforms.resolution.value.set(Jc.z,Jc.w))}}class xd extends pm{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}setFromPoints(e){const t=e.length-1,n=new Float32Array(6*t);for(let i=0;i<t;i++)n[6*i]=e[i].x,n[6*i+1]=e[i].y,n[6*i+2]=e[i].z||0,n[6*i+3]=e[i+1].x,n[6*i+4]=e[i+1].y,n[6*i+5]=e[i+1].z||0;return super.setPositions(n),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class mm extends yS{constructor(e=new xd,t=new ac({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}class gm extends yt{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new de(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const cr=new I,hf=new st,ff=new st,pf=new I,mf=new I;class bS{constructor(e={}){const t=this;let n,i,s,a;const o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.sortObjects=!0,this.getSize=function(){return{width:n,height:i}},this.render=function(m,_){m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),hf.copy(_.matrixWorldInverse),ff.multiplyMatrices(_.projectionMatrix,hf),u(m,m,_),this.sortObjects&&f(m)},this.setSize=function(m,_){n=m,i=_,s=n/2,a=i/2,l.style.width=m+"px",l.style.height=_+"px"};function c(m){m.isCSS2DObject&&(m.element.style.display="none");for(let _=0,g=m.children.length;_<g;_++)c(m.children[_])}function u(m,_,g){if(m.visible===!1){c(m);return}if(m.isCSS2DObject){cr.setFromMatrixPosition(m.matrixWorld),cr.applyMatrix4(ff);const p=cr.z>=-1&&cr.z<=1&&m.layers.test(g.layers)===!0,v=m.element;v.style.display=p===!0?"":"none",p===!0&&(m.onBeforeRender(t,_,g),v.style.transform="translate("+-100*m.center.x+"%,"+-100*m.center.y+"%)translate("+(cr.x*s+s)+"px,"+(-cr.y*a+a)+"px)",v.parentNode!==l&&l.appendChild(v),m.onAfterRender(t,_,g));const x={distanceToCameraSquared:h(g,m)};o.objects.set(m,x)}for(let p=0,v=m.children.length;p<v;p++)u(m.children[p],_,g)}function h(m,_){return pf.setFromMatrixPosition(m.matrixWorld),mf.setFromMatrixPosition(_.matrixWorld),pf.distanceToSquared(mf)}function d(m){const _=[];return m.traverseVisible(function(g){g.isCSS2DObject&&_.push(g)}),_}function f(m){const _=d(m).sort(function(p,v){if(p.renderOrder!==v.renderOrder)return v.renderOrder-p.renderOrder;const x=o.objects.get(p).distanceToCameraSquared,y=o.objects.get(v).distanceToCameraSquared;return x-y}),g=_.length;for(let p=0,v=_.length;p<v;p++)_[p].element.style.zIndex=g-p}}}const gf=Object.freeze(Object.defineProperty({__proto__:null,CSS2DObject:gm,CSS2DRenderer:bS},Symbol.toStringTag,{value:"Module"})),Ui={R0:.35,R1:1.6,R2:2.2,R3:3};function _m(r){const e=[];e.push({id:r.root.id,name:r.root.name,layer:0,position:new I(0,0,Ui.R0)});const t=r.lifelines.filter(i=>i.parent_id===r.root.id),n=t.length;return t.forEach((i,s)=>{const a=s/n*Math.PI*2,o=eu(Ui.R1,a,0);e.push({id:i.id,name:i.name,layer:1,position:o,parentId:r.root.id})}),r.lifelines.filter(i=>i.parent_id!==r.root.id).forEach(i=>{const s=e.find(f=>f.id===i.parent_id);if(!s)return;const a=r.lifelines.filter(f=>f.parent_id===i.parent_id),o=a.findIndex(f=>f.id===i.id),l=Math.atan2(s.position.y,s.position.x),c=Math.PI/4,u=o-(a.length-1)/2,h=l+u*(c/Math.max(a.length,1)),d=eu(Ui.R2,h,(Math.random()-.5)*.15);e.push({id:i.id,name:i.name,layer:2,position:d,parentId:i.parent_id})}),r.entities.forEach(i=>{const s=e.find(f=>f.id===i.lifeline_id);if(!s)return;const a=r.entities.filter(f=>f.lifeline_id===i.lifeline_id),o=a.findIndex(f=>f.id===i.id),l=Math.atan2(s.position.y,s.position.x),c=Math.PI/6,u=o-(a.length-1)/2,h=l+u*(c/Math.max(a.length,1)),d=eu(Ui.R3,h+(Math.random()-.5)*.08,(Math.random()-.5)*.12);e.push({id:i.id,name:i.title,layer:3,position:d,parentId:i.lifeline_id,kind:i.kind,meta:i.meta})}),e}function eu(r,e,t){const n=r*Math.cos(t)*Math.cos(e),i=r*Math.sin(t),s=r*Math.cos(t)*Math.sin(e);return new I(n,i,s)}function MS(r,e,t,n){const i=r.find(x=>x.id===e);if(!i)return{targets:new Map,constellationIds:new Set};const s=i.position.clone(),a=n.clone().normalize(),o=new I(0,1,0),l=new I().crossVectors(a,o);if(l.length()<.001){const x=new I(1,0,0);l.crossVectors(a,x).normalize()}else l.normalize();const c=new I().crossVectors(l,a).normalize(),u=new Map,h=new Set;u.set(e,s.clone()),h.add(e);const d=[];let f=i.parentId;for(;f&&d.length<2;){const x=r.find(y=>y.id===f);if(x)d.push(x),f=x.parentId;else break}d.forEach((x,y)=>{const w=s.clone().addScaledVector(a,.18+y*.14).addScaledVector(c,.06);u.set(x.id,w),h.add(x.id)});const m=r.filter(x=>x.id!==e&&x.layer===3&&x.parentId===i.parentId).slice(0,12);m.forEach((x,y)=>{const w=m.length===1?0:(y/(m.length-1)-.5)*(Math.PI*2/3),M=s.clone().addScaledVector(a,.12).addScaledVector(l,Math.cos(w)*.25).addScaledVector(c,Math.sin(w)*.25);u.set(x.id,M),h.add(x.id)});const _=new Set;for(const x of t)x.confidence>=.7&&x.status!=="rejected"&&(x.from===e&&_.add(x.to),x.to===e&&_.add(x.from));const g=r.filter(x=>_.has(x.id)&&!h.has(x.id)).slice(0,6);g.forEach((x,y)=>{const w=g.length===1?0:(y/(g.length-1)-.5)*(Math.PI/2),M=s.clone().addScaledVector(a,-.08).addScaledVector(l,Math.cos(w)*.22).addScaledVector(c,Math.sin(w)*.22);u.set(x.id,M),h.add(x.id)});const p=new Set;for(const x of t)x.confidence>=.3&&x.confidence<.7&&x.status!=="rejected"&&(x.from===e&&p.add(x.to),x.to===e&&p.add(x.from));const v=r.filter(x=>p.has(x.id)&&!h.has(x.id)).slice(0,6);return v.forEach((x,y)=>{const w=v.length===1?0:(y/(v.length-1)-.5)*(Math.PI*5/6),M=s.clone().addScaledVector(a,-.04).addScaledVector(l,Math.cos(w)*.38).addScaledVector(c,Math.sin(w)*.38);u.set(x.id,M),h.add(x.id)}),{targets:u,constellationIds:h}}const SS=Object.freeze(Object.defineProperty({__proto__:null,RADII:Ui,computeFocusLayout:MS,computeLayout:_m},Symbol.toStringTag,{value:"Module"}));function jn(r){const e=getComputedStyle(document.documentElement).getPropertyValue(r).trim();if(!e)return"#6ee7d0";const t=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);return t?"#"+[t[1],t[2],t[3]].map(n=>parseInt(n).toString(16).padStart(2,"0")).join(""):e}function wS(r){const e=[];for(const t of r)e.push(t.x,t.y,t.z);return e}async function ES(r,e){const t=new Hu;t.background=new Fe("#07090d");const n=r.clientWidth,i=r.clientHeight,s=new de(n,i),a=new nn(60,n/i,.1,20);a.position.set(0,2.5,5.5),a.lookAt(0,0,0);const o=new fm({canvas:r,antialias:!0});o.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.setSize(n,i);const l=_m(e),c=[],u=[],h=[],d=[];for(const x of l){let y,w;const M=x.layer===0||x.layer===1?1:x.layer===2?.9:.85;if(x.layer===0)y=new ei(.06,16,16),w=new tn({color:jn("--accent")});else if(x.layer===1)y=new ei(.05,12,12),w=new tn({color:jn("--accent"),transparent:!0,opacity:M});else if(x.layer===2)y=new ei(.03,8,8),w=new tn({color:jn("--text-2"),transparent:!0,opacity:M});else{x.kind==="task"?y=new os(.022,.022,.022):x.kind==="decision"?y=new Er(.022):x.kind==="memory"?y=new ei(.02,8,8):x.kind==="item"?y=new Ea(.02):y=new ei(.015,8,8);const E={task:"--accent",memory:"--text-2",decision:"--warm",item:"--text-3"}[x.kind||""]||"--text-3";let P=M;x.kind==="task"&&x.meta&&(x.meta.status==="done"?P=.4:x.meta.status==="cancelled"?P=.25:x.meta.priority==="high"&&(P=.95)),w=new tn({color:jn(E),transparent:!0,opacity:P})}const A=new At(y,w);if(A.position.copy(x.position),A.userData={id:x.id,name:x.name,kind:x.kind,layer:x.layer,parentId:x.parentId,homePosition:x.position.clone(),targetPosition:x.position.clone()},x.layer===3&&x.kind==="task"&&x.meta&&(x.meta.status==="done"?A.scale.setScalar(.75):x.meta.status==="cancelled"&&A.scale.setScalar(.6)),t.add(A),c.push(A),u.push(A),x.layer===3){const b=new ei(.04,8,8),E=new tn({visible:!1}),P=new At(b,E);P.position.copy(x.position),P.userData=A.userData,u.push(P)}}for(const x of l){if(!x.parentId)continue;const y=l.find(P=>P.id===x.parentId);if(!y)continue;const w=8,M=[];for(let P=0;P<=w;P++){const D=P/w,V=new I().lerpVectors(y.position,x.position,D).normalize().multiplyScalar(y.position.length()*(1-D)+x.position.length()*D);M.push(V)}const A=new xd;A.setPositions(wS(M));const b=new ac({color:new Fe(jn("--line-2")),linewidth:1.5,worldUnits:!1,resolution:s,transparent:!0,opacity:.65,depthTest:!0});d.push(b);const E=new mm(A,b);E.computeLineDistances(),E.userData={fromLayer:y.layer,toLayer:x.layer},t.add(E),h.push(E)}const f=new Fs(Ui.R1,.006,8,80),m=new At(f,new tn({color:jn("--line-2"),transparent:!0,opacity:.12}));m.rotation.x=_l.degToRad(15),t.add(m);const _=new Fs(Ui.R2,.004,8,80),g=new At(_,new tn({color:jn("--line-2"),transparent:!0,opacity:.08}));g.rotation.x=_l.degToRad(15),t.add(g);function p(x,y){s.set(x,y),d.forEach(w=>{w.resolution.set(x,y)})}function v(){t.traverse(x=>{if(x instanceof At){x.geometry?.dispose();const y=x.material;y instanceof sn&&(Array.isArray(y)?y.forEach(w=>w.dispose()):y.dispose())}}),h.forEach(x=>{x.geometry?.dispose()}),d.forEach(x=>x.dispose()),o.dispose()}return{scene:t,camera:a,renderer:o,nodes:c,pickables:u,lines:h,orbit:m,layoutNodes:l,dispose:v,setResolution:p}}const _f=1,TS=3.5;function AS(r){return Math.max(_f,Math.min(TS,_f+(r-.3)*3.57))}function CS(r,e,t,n){const i=new I().subVectors(e,r).normalize(),s=.03+n*.005,a=new Os(s,s*2.5,6,1),o=new tn({color:new Fe(t)}),l=new At(a,o),c=e.clone().addScaledVector(i,-.04);l.position.copy(c);const u=new pn;return u.setFromUnitVectors(new I(0,1,0),i),l.setRotationFromQuaternion(u),l}function RS(r,e,t,n,i){const s=i||new de(window.innerWidth,window.innerHeight),a=[],o=e.associations.filter(c=>(c.from===n||c.to===n)&&c.confidence>=.7).slice(0,20),l={co_occurrence:"--text-3",causal:"--accent",tension:"--warm",derived_from:"--accent-dim",manual:"--accent"};for(const c of o){const u=t.find(x=>x.id===c.from),h=t.find(x=>x.id===c.to);if(!u||!h)continue;const d=new xd;d.setPositions([u.position.x,u.position.y,u.position.z,h.position.x,h.position.y,h.position.z]);const f=AS(c.confidence),m=.5+(c.confidence-.5)*.8,_=jn(l[c.relation_type]||"--text-3"),g=new ac({color:new Fe(_),linewidth:f,worldUnits:!1,resolution:s,transparent:!0,opacity:c.status==="pending"?m*.8:m,depthTest:!1,dashed:c.status==="pending",dashSize:.06,gapSize:.04}),p=new mm(d,g);p.computeLineDistances(),p.userData={associationId:c.id,...c,_origLinewidth:f,_origColor:p.material.color.getHex()},r.add(p);let v;c.status==="accepted"&&(v=CS(u.position,h.position,_,f),r.add(v)),a.push({line:p,data:c,fromNode:u,toNode:h,arrow:v})}return a}function IS(r,e,t=.05){r.forEach(n=>{const i=n.userData.id,s=n.material;e.has(i)?(s.opacity=1,s.transparent=!0):(s.opacity=t,s.transparent=!0),s.needsUpdate=!0})}function vf(r){r.forEach(e=>{const t=e.userData.layer,n=t===0||t===1?1:t===2?.9:.85,i=e.material;i.opacity=n,i.transparent=!0,i.needsUpdate=!0})}function PS(r,e,t=6){const n=1-Math.exp(-t*e);for(const i of r){const s=i.userData.targetPosition;s&&i.position.lerp(s,n)}}function LS(r,e,t=.06){vm(r,e,t)}function vm(r,e,t=.06){for(const n of r){const i=n.userData.id,s=n.userData.layer,a=n.material;if(e.has(i)){const o=s===0||s===1?1:s===2?.9:.85;a.opacity=o}else a.opacity=t;a.transparent=!0,a.needsUpdate=!0}}function DS(r,e,t){const n=new Fs(.04,.004,8,16),i=new tn({color:new Fe(t),transparent:!0,opacity:.5}),s=new At(n,i);return s.position.copy(e),s.name="focusHalo",s.renderOrder=999,s.material.depthTest=!1,s.material.depthWrite=!1,r.add(s),s}function tu(r){const e=r.getObjectByName("focusHalo");if(e&&(r.remove(e),e.geometry&&e.geometry.dispose(),e.material)){const t=e.material;Array.isArray(t)?t.forEach(n=>n.dispose()):t.dispose()}}const xf=[10551280,16771744,16752895,10526880];let Su=[],wu=[];function US(r,e,t,n){Eu(n);const i=new Set(t.flatMap(a=>[...a.pathEntityIds])),s=new Set(t.flatMap(a=>[...a.pathAssocIds]));for(const a of r)if(a.userData.layer===3&&!i.has(a.userData.id)){const o=a.material;o.opacity=.3,o.transparent=!0,o.needsUpdate=!0}for(const a of e)s.has(a.data.id)||(a.line.material.opacity=.1);for(const a of t){const o=a.isCurrent?1.3:1.1,l=a.isCurrent?2:1;for(const c of r){const u=c.userData.id;if(!a.pathEntityIds.has(u))continue;const h=c.material;h._pathOrigColor=h._pathOrigColor??h.color.getHex(),u===a.startId?(c.scale.setScalar(1.5),h.color.set("#80ff80")):u===a.endId?(c.scale.setScalar(1.5),h.color.set("#ffaa44")):(c.scale.setScalar(o),h.color.set(a.color)),h.needsUpdate=!0}for(const c of e){if(!a.pathAssocIds.has(c.data.id))continue;const u=c.line.material;u._pathOrigLinewidth=u._pathOrigLinewidth??u.linewidth,u.linewidth=(u._pathOrigLinewidth||1.5)*l,u.opacity=1,a.isCurrent&&NS(c.fromNode,c.toNode,a.color,n)}}}function NS(r,e,t,n){const i=new I().addVectors(r.position,e.position).multiplyScalar(.5),s=new I().subVectors(e.position,r.position).normalize(),a=new Os(.015,.04,6),o=new tn({color:t}),l=new At(a,o);l.position.copy(i),l.quaternion.setFromUnitVectors(new I(0,1,0),s),l.userData.isPathCone=!0,n.add(l),wu.push(l)}function FS(r,e,t){for(let n=1;n<r.length-1;n++){const i=e.find(o=>o.userData.id===r[n]);if(!i)continue;const s=document.createElement("div");s.style.cssText="width:18px;height:18px;border-radius:50%;background:var(--accent);color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;",s.textContent=String(n);const a=new gm(s);a.position.copy(i.position.clone().add(new I(0,.05,0))),a.userData.isPathLabel=!0,t.add(a),Su.push(a)}}function Eu(r){for(const e of Su)r.remove(e);for(const e of wu)r.remove(e),e.geometry?.dispose(),e.material.dispose();Su=[],wu=[]}function yf(r,e){for(const t of r){const n=t.material;n._pathOrigColor!==void 0&&(n.color.setHex(n._pathOrigColor),delete n._pathOrigColor,t.scale.setScalar(1),n.needsUpdate=!0)}for(const t of e){const n=t.line.material;n._pathOrigLinewidth!==void 0&&(n.linewidth=n._pathOrigLinewidth,delete n._pathOrigLinewidth),n.opacity=n.opacity<.2?.8:n.opacity}}function OS(r){return r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2}let kn=null;function Eo(r,e,t,n,i,s=800){kn={elapsed:0,duration:s,from:{position:r.position.clone(),target:e.target.clone(),fov:r.fov},to:{position:t.clone(),target:n.clone(),fov:i}}}function kS(r,e,t){if(!kn)return!1;kn.elapsed+=r*1e3;const n=Math.min(kn.elapsed/kn.duration,1),i=OS(n);return e.position.lerpVectors(kn.from.position,kn.to.position,i),t.target.lerpVectors(kn.from.target,kn.to.target,i),e.fov=kn.from.fov+(kn.to.fov-kn.from.fov)*i,e.updateProjectionMatrix(),n>=1?(kn=null,!1):!0}const BS={class:"breadcrumb"},zS={key:0,class:"sep"},VS=["onClick"],GS={key:2,class:"crumb-current"},HS=Pn({__name:"Breadcrumb",props:{state:{}},emits:["nav"],setup(r,{emit:e}){const t=r,n=e,i=as(),s=Dt(()=>{const a=t.state,o=[{label:"Atlas",action:{kind:"global_overview"}}],l=a.kind==="region_zoom"?a.lifeline_id:a.kind==="node_focus"||a.kind==="relation_reveal"?i.data?.entities.find(h=>h.id===a.entity_id)?.lifeline_id:null;if(!l)return o;const c=[];let u=l;for(;u;){const h=i.data?.lifelines.find(f=>f.id===u);if(!h)break;const d=h.parent_id==="ROOT"?1:2;c.unshift({id:h.id,name:h.name,layer:d}),u=h.parent_id!=="ROOT"?h.parent_id:void 0}for(const h of c)o.push({label:h.name,action:{kind:"region_zoom",lifeline_id:h.id}});if(a.kind==="node_focus"||a.kind==="relation_reveal"){const h=a.entity_id,d=i.data?.entities.find(f=>f.id===h);d&&o.push({label:d.title.slice(0,20),action:null}),a.kind==="relation_reveal"&&o.push({label:"(关联)",action:null})}return o});return(a,o)=>(W(),q("div",BS,[(W(!0),q(Qe,null,Ht(s.value,(l,c)=>(W(),q(Qe,{key:c},[c>0?(W(),q("span",zS,"›")):ke("",!0),l.action?(W(),q("button",{key:1,class:"crumb-link",onClick:u=>n("nav",l.action)},fe(l.label),9,VS)):(W(),q("span",GS,fe(l.label),1))],64))),128))]))}}),WS=In(HS,[["__scopeId","data-v-54bd57ef"]]),XS={key:0,class:"lifeline-panel"},$S={class:"panel-header"},qS={class:"stats-row"},YS={class:"stats-count"},ZS={class:"stats-kinds"},KS={class:"kind-t"},JS={class:"kind-m"},jS={class:"kind-d"},QS={class:"kind-i"},e1={key:0,class:"inline-form"},t1=["value"],n1={class:"form-actions"},i1={key:0,class:"drop-line"},s1=["onDragstart","onDragover","onDrop"],r1=["onClick"],a1=["onClick","onDblclick"],o1={class:"kind-t"},l1={class:"kind-m"},c1={class:"kind-d"},u1={class:"kind-i"},d1={class:"badge"},h1={key:0,class:"actions"},f1=["onClick"],p1=["onClick"],m1=["onKeyup"],g1={class:"form-actions"},_1=["onClick"],v1=["onClick"],x1={key:0,class:"confirm-delete"},y1={class:"form-actions"},b1=["onClick"],M1=["onClick"],S1={class:"entity-kind"},w1={class:"entity-title"},E1=["onClick"],T1=["onClick"],A1={key:1,class:"empty"},C1={class:"search-box"},R1={key:0,class:"loading-text"},I1={key:1,class:"search-results"},P1={key:0,class:"loading-text"},L1=["onClick"],D1={class:"entity-kind"},U1={class:"entity-title"},N1={key:0,class:"mounted-tag"},F1=Pn({__name:"LifelinePanel",emits:["focus-lifeline","focus-entity"],setup(r,{emit:e}){const t=e,n=as(),i=Dt(()=>{const N=n.state;return N.kind==="region_zoom"?N.lifeline_id??null:N.kind==="node_focus"||N.kind==="relation_reveal"?n.data?.entities.find(U=>U.id===N.entity_id)?.lifeline_id??null:null}),s=Dt(()=>{const N=n.state;return N.kind==="node_focus"||N.kind==="relation_reveal"?N.entity_id??null:null}),a=Dt(()=>{if(!n.data)return{lifelines:0,entities:0,byKind:{task:0,memory:0,decision:0,item:0}};const N={task:0,memory:0,decision:0,item:0};for(const U of n.data.entities)N[U.kind]!==void 0&&N[U.kind]++;return{lifelines:n.data.lifelines.length,entities:n.data.entities.length,byKind:N}});function o(N){const U={task:0,memory:0,decision:0,item:0};if(!n.data)return U;for(const k of n.data.entities)k.lifeline_id===N&&U[k.kind]!==void 0&&U[k.kind]++;return U}const l=Ne(new Set),c=Ne(!1),u=Ne(null),h=Ne(null),d=Ne(null),f=Ne(null),m=Ne(-1),_=Ne(null);function g(N,U){f.value={id:U.id,parentId:U.parent_id},_.value=U.parent_id,N.dataTransfer&&(N.dataTransfer.effectAllowed="move",N.dataTransfer.setData("text/plain",U.id))}function p(N,U){N.preventDefault(),m.value=U}function v(){m.value=-1}function x(N){N.preventDefault()}async function y(N,U,k){if(N.preventDefault(),m.value=-1,!f.value||!n.data)return;const{id:Q,parentId:Z}=f.value;if(Z!==k){f.value=null,_.value=null;return}const se=n.data.lifelines.filter(et=>et.parent_id===Z);se.sort((et,ve)=>et.order_index-ve.order_index);const ce=se.findIndex(et=>et.id===Q);if(ce===-1||ce===U){f.value=null,_.value=null;return}const he=[...se.slice(0,ce),...se.slice(ce+1)],qe=U>ce?U-1:U,F=qe>0?he[qe-1]:null,nt=qe<he.length?he[qe]:null;let ze;F?nt?ze=(F.order_index+nt.order_index)/2:ze=F.order_index+1:ze=(nt?.order_index??1)-1,f.value=null,_.value=null,await n.updateLifeline(Q,{order_index:ze})}function w(){f.value=null,_.value=null,m.value=-1}const M=Ne(""),A=Ne([]),b=Ne(!1),E=Ne(""),P=Ne(""),D=Ne("ROOT"),V=Ne(""),J=Dt(()=>{if(!n.data)return[];const N=n.data.lifelines,U={};for(const Q of N){const Z=Q.parent_id;U[Z]||(U[Z]=[]),U[Z].push(Q)}function k(Q,Z){return(U[Q]||[]).map(ce=>({lifeline:ce,children:k(ce.id,Z+1),depth:Z}))}return k("ROOT",0)});function K(N){return n.data?n.data.entities.filter(U=>U.lifeline_id===N).length:0}function B(N){return n.data?n.data.entities.filter(U=>U.lifeline_id===N):[]}function H(N){l.value.has(N)?l.value.delete(N):l.value.add(N)}function Y(N){return l.value.has(N)}function pe(N){return i.value===N}function _e(N){t("focus-lifeline",N)}async function ye(){!E.value.trim()||!P.value.trim()||(await n.createLifeline({id:E.value.trim(),name:P.value.trim(),parent_id:D.value==="ROOT"?void 0:D.value}),E.value="",P.value="",D.value="ROOT",c.value=!1)}function Re(N){u.value=N.id,V.value=N.name}async function le(N){V.value.trim()&&V.value!==N.name&&await n.updateLifeline(N.id,{name:V.value.trim()}),u.value=null}function Ee(){u.value=null}async function Be(N){await n.deleteLifeline(N.id),h.value=null}async function Le(N){const U=N.id.split(":"),k=U[0],Q=parseInt(U.slice(1).join(":"),10);await n.mountEntity(k,Q,null)}async function re(N){d.value=N,M.value="",A.value=[]}async function Ae(){const N=M.value.trim();if(!(!N||N.length<1)){b.value=!0;try{const{searchAll:U}=await Et(async()=>{const{searchAll:Z}=await import("./index-CVZL5f_h.js").then(se=>se.e);return{searchAll:Z}},__vite__mapDeps([0,1,2])),k=await U(N,5),Q=[];for(const Z of k.items||[]){const se=`item:${Z.id}`,ce=n.data?.entities.find(he=>he.id===se);Q.push({id:se,kind:"item",title:Z.content?.slice(0,60)||"",lifeline_id:ce?.lifeline_id,mounted_name:ce?.lifeline_id?n.data?.lifelines.find(he=>he.id===ce.lifeline_id)?.name||ce.lifeline_id:void 0})}for(const Z of k.tasks||[]){const se=`task:${Z.id}`,ce=n.data?.entities.find(he=>he.id===se);Q.push({id:se,kind:"task",title:Z.title?.slice(0,60)||"",lifeline_id:ce?.lifeline_id,mounted_name:ce?.lifeline_id?n.data?.lifelines.find(he=>he.id===ce.lifeline_id)?.name||ce.lifeline_id:void 0})}for(const Z of k.memories||[]){const se=`memory:${Z.id}`,ce=n.data?.entities.find(he=>he.id===se);Q.push({id:se,kind:"memory",title:Z.content?.slice(0,60)||"",lifeline_id:ce?.lifeline_id,mounted_name:ce?.lifeline_id?n.data?.lifelines.find(he=>he.id===ce.lifeline_id)?.name||ce.lifeline_id:void 0})}for(const Z of k.decisions||[]){const se=`decision:${Z.id}`,ce=n.data?.entities.find(he=>he.id===se);Q.push({id:se,kind:"decision",title:Z.title?.slice(0,60)||"",lifeline_id:ce?.lifeline_id,mounted_name:ce?.lifeline_id?n.data?.lifelines.find(he=>he.id===ce.lifeline_id)?.name||ce.lifeline_id:void 0})}A.value=Q}finally{b.value=!1}}}async function xe(N){if(!d.value)return;const U=N.id.split(":"),k=U[0],Q=parseInt(U.slice(1).join(":"),10);await n.mountEntity(k,Q,d.value),d.value=null,A.value=[]}function Xe(){d.value=null,A.value=[]}function ne(){return n.data?[{id:"ROOT",name:"ROOT (根级)"},...n.data.lifelines.map(N=>({id:N.id,name:N.name}))]:[{id:"ROOT",name:"ROOT (根级)"}]}return(N,U)=>Ke(n).data?(W(),q("div",XS,[R("div",$S,[U[10]||(U[10]=R("span",{class:"panel-title"},"Lifeline",-1)),R("button",{class:"btn-text",onClick:U[0]||(U[0]=k=>c.value=!c.value)},"+ 新建")]),R("div",qS,[R("span",YS,fe(a.value.lifelines)+" lifeline · "+fe(a.value.entities)+" entity",1),R("span",ZS,[R("span",KS,"T:"+fe(a.value.byKind.task),1),R("span",JS,"M:"+fe(a.value.byKind.memory),1),R("span",jS,"D:"+fe(a.value.byKind.decision),1),R("span",QS,"I:"+fe(a.value.byKind.item),1)])]),c.value?(W(),q("div",e1,[wt(R("input",{"onUpdate:modelValue":U[1]||(U[1]=k=>E.value=k),class:"field",placeholder:"ID (英文短名)",onKeyup:Qn(ye,["enter"])},null,544),[[Gt,E.value]]),wt(R("input",{"onUpdate:modelValue":U[2]||(U[2]=k=>P.value=k),class:"field",placeholder:"显示名称",onKeyup:Qn(ye,["enter"])},null,544),[[Gt,P.value]]),wt(R("select",{"onUpdate:modelValue":U[3]||(U[3]=k=>D.value=k),class:"field"},[(W(!0),q(Qe,null,Ht(ne(),k=>(W(),q("option",{key:k.id,value:k.id},fe(k.name),9,t1))),128))],512),[[xi,D.value]]),R("div",n1,[R("button",{class:"btn-text",onClick:ye},"保存"),R("button",{class:"btn-text",onClick:U[4]||(U[4]=k=>c.value=!1)},"取消")])])):ke("",!0),R("div",{class:"tree",onDragover:x,onDrop:U[7]||(U[7]=fn(()=>{},["prevent"]))},[(W(!0),q(Qe,null,Ht(J.value,(k,Q)=>(W(),q(Qe,{key:k.lifeline.id},[m.value===Q&&_.value===k.lifeline.parent_id?(W(),q("div",i1)):ke("",!0),R("div",{class:$t(["tree-row",{active:pe(k.lifeline.id),dragging:f.value?.id===k.lifeline.id}]),style:ws({paddingLeft:k.depth*16+4+"px"}),draggable:!0,onDragstart:Z=>g(Z,k.lifeline),onDragover:Z=>p(Z,Q),onDragleave:v,onDrop:Z=>y(Z,Q,k.lifeline.parent_id),onDragend:w},[R("span",{class:$t(["drag-handle",{visible:f.value}])},"⠿",2),R("span",{class:"arrow",onClick:Z=>H(k.lifeline.id)},fe(Y(k.lifeline.id)?"▼":"▶"),9,r1),R("span",{class:"name",onClick:Z=>_e(k.lifeline.id),onDblclick:fn(Z=>Re(k.lifeline),["stop"])},[Cn(fe(k.lifeline.name)+" ",1),Y(k.lifeline.id)?(W(),q(Qe,{key:0},[R("span",o1,"T:"+fe(o(k.lifeline.id).task),1),R("span",l1,"M:"+fe(o(k.lifeline.id).memory),1),R("span",c1,"D:"+fe(o(k.lifeline.id).decision),1),R("span",u1,"I:"+fe(o(k.lifeline.id).item),1)],64)):ke("",!0),R("span",d1,"("+fe(K(k.lifeline.id))+")",1)],40,a1),u.value!==k.lifeline.id?(W(),q("span",h1,[R("button",{class:"btn-icon",onClick:fn(Z=>Re(k.lifeline),["stop"]),title:"编辑名称"},"✎",8,f1),R("button",{class:"btn-icon",onClick:fn(Z=>h.value=k.lifeline.id,["stop"]),title:"删除 lifeline"},"✕",8,p1)])):ke("",!0)],46,s1),u.value===k.lifeline.id?(W(),q("div",{key:1,class:"inline-edit",style:ws({paddingLeft:k.depth*16+20+"px"})},[wt(R("input",{"onUpdate:modelValue":U[5]||(U[5]=Z=>V.value=Z),class:"field",onKeyup:[Qn(Z=>le(k.lifeline),["enter"]),Qn(Ee,["esc"])]},null,40,m1),[[Gt,V.value]]),R("div",g1,[R("button",{class:"btn-text",onClick:Z=>le(k.lifeline)},"保存",8,_1),R("button",{class:"btn-text",onClick:Ee},"取消"),h.value!==k.lifeline.id?(W(),q("button",{key:0,class:"btn-text danger",onClick:Z=>h.value=k.lifeline.id},"删除",8,v1)):ke("",!0)]),h.value===k.lifeline.id?(W(),q("div",x1,[Cn(" 确定删除「"+fe(k.lifeline.name)+"」？挂载的 "+fe(K(k.lifeline.id))+" 个 entity 将被卸载。 ",1),R("div",y1,[R("button",{class:"btn-text danger",onClick:Z=>Be(k.lifeline)},"确认删除",8,b1),R("button",{class:"btn-text",onClick:U[6]||(U[6]=Z=>h.value=null)},"取消")])])):ke("",!0)],4)):ke("",!0),Y(k.lifeline.id)?(W(),q(Qe,{key:2},[(W(!0),q(Qe,null,Ht(B(k.lifeline.id),Z=>(W(),q("div",{key:Z.id,class:$t(["entity-row",{active:s.value===Z.id}]),style:ws({paddingLeft:k.depth*16+28+"px"}),onClick:se=>t("focus-entity",Z.id)},[R("span",S1,fe(Z.kind[0].toUpperCase()),1),R("span",w1,fe(Z.title.slice(0,30)),1),R("button",{class:"btn-icon",onClick:fn(se=>Le(Z),["stop"]),title:"卸载"},"×",8,E1)],14,M1))),128)),R("div",{class:"entity-row add-entity",style:ws({paddingLeft:k.depth*16+28+"px"})},[R("button",{class:"btn-text",onClick:Z=>re(k.lifeline.id)},"+ 关联 entity",8,T1)],4)],64)):ke("",!0)],64))),128))],32),J.value.length===0&&!c.value?(W(),q("div",A1,[U[11]||(U[11]=R("div",{class:"empty-icon"},"◇",-1)),U[12]||(U[12]=R("div",{class:"empty-title"},"暂无 Lifeline",-1)),U[13]||(U[13]=R("div",{class:"empty-desc"},[Cn(' Lifeline 是实体分类的主线，例如"健康""学习""工作"。'),R("br"),Cn(" 创建后实体将分布在 3D 球面上。 ")],-1)),R("button",{class:"btn-text",onClick:U[8]||(U[8]=k=>c.value=!0)},"+ 创建第一个 Lifeline")])):ke("",!0),d.value?(W(),q("div",{key:2,class:"search-overlay",onClick:fn(Xe,["self"])},[R("div",C1,[wt(R("input",{"onUpdate:modelValue":U[9]||(U[9]=k=>M.value=k),class:"field",placeholder:"搜索 entity...",onKeyup:Qn(Ae,["enter"])},null,544),[[Gt,M.value]]),R("button",{class:"btn-text",onClick:Ae},"搜索"),b.value?(W(),q("div",R1,"搜索中...")):(W(),q("div",I1,[A.value.length===0&&M.value?(W(),q("div",P1,"无结果")):ke("",!0),(W(!0),q(Qe,null,Ht(A.value,k=>(W(),q("div",{key:k.id,class:$t(["search-row",{mounted:k.mounted_name}]),onClick:Q=>k.mounted_name?null:xe(k)},[R("span",D1,fe(k.kind[0].toUpperCase()),1),R("span",U1,fe(k.title.slice(0,40)),1),k.mounted_name?(W(),q("span",N1,"已归类到 "+fe(k.mounted_name),1)):ke("",!0)],10,L1))),128))]))])])):ke("",!0)])):ke("",!0)}}),O1=In(F1,[["__scopeId","data-v-0c96ae5f"]]),k1={key:0,class:"node-detail-card"},B1={class:"card-header"},z1={class:"kind-badge"},V1={class:"entity-id-row"},G1=["title"],H1={class:"lifeline-path"},W1={key:1,class:"no-lifeline"},X1={key:0,class:"detail-loading"},$1={key:1,class:"detail-error"},q1={key:2,class:"detail-section"},Y1={key:0,class:"field-row"},Z1=["onDblclick"],K1=["onClick"],J1={key:1,class:"field-row"},j1=["onDblclick"],Q1=["onClick"],ew={key:2,class:"field-row"},tw=["onDblclick"],nw=["onClick"],iw={key:3,class:"field-row"},sw=["onDblclick"],rw=["onClick"],aw={key:4,class:"field-row"},ow=["onDblclick"],lw=["onClick"],cw={key:5,class:"field-row"},uw=["onDblclick"],dw=["onClick"],hw={key:6,class:"field-row"},fw=["onDblclick"],pw=["onClick"],mw={key:7,class:"field-row"},gw=["onDblclick"],_w=["onClick"],vw={key:8,class:"field-row"},xw={class:"field-value"},yw=["onClick"],bw={key:9,class:"field-row"},Mw={class:"field-value"},Sw=["onClick"],ww={key:10,class:"field-row"},Ew={class:"field-label"},Tw={class:"field-value readonly"},Aw={key:11,class:"field-row"},Cw={class:"field-label"},Rw=["onDblclick"],Iw={key:0,class:"field-row"},Pw={class:"field-value readonly"},Lw={key:3,class:"actions-section"},Dw={key:4,class:"assoc-summary"},Uw={class:"assoc-type-counts"},Nw={key:0,class:"assoc-summary-list"},Fw=["onClick"],Ow={class:"assoc-summary-type"},kw={class:"assoc-summary-conf"},Bw={class:"assoc-summary-arrow"},zw={class:"assoc-summary-kind"},Vw={class:"assoc-summary-title"},Gw={key:0,class:"assoc-summary-more"},Hw={class:"assoc-section"},Ww={class:"assoc-title"},Xw={key:0,class:"empty-text"},$w=["onClick"],qw={class:"confidence"},Yw={key:0,class:"assoc-actions"},Zw=["onClick"],Kw=["onClick"],Jw={class:"assoc-edit-actions"},jw=["onClick"],Qw=["onClick"],eE=["onClick"],tE={key:0,class:"evidence-block"},nE={class:"evidence-title"},iE={key:0,class:"no-evidence"},sE={class:"evidence-excerpt"},rE={class:"evidence-meta"},aE={class:"evidence-type"},oE={class:"evidence-weight"},lE=Pn({__name:"NodeDetailCard",emits:["edit-assoc","delete-assoc","copied","enter-relation","navigate-entity"],setup(r,{expose:e,emit:t}){const n=as(),i=Dt(()=>{const ne=n.state;if(ne.kind!=="node_focus"&&ne.kind!=="relation_reveal")return null;const N=ne.entity_id;return n.data?.entities.find(U=>U.id===N)??null}),s=Ne(null),a=Ne(!1),o=Ne(!1);async function l(){if(!i.value)return;const ne=i.value.id,N=n.entityDetailCache.get(ne);if(N){s.value=N;return}a.value=!0,o.value=!1;try{const U=ne.split(":"),k=U[0],Q=parseInt(U.slice(1).join(":"),10);let Z={};if(k==="task"){const{getTask:se}=await Et(async()=>{const{getTask:he}=await import("./index-CVZL5f_h.js").then(qe=>qe.e);return{getTask:he}},__vite__mapDeps([0,1,2])),ce=await se(Q);Z=ce.task||ce}else if(k==="memory"){const{getMemory:se}=await Et(async()=>{const{getMemory:he}=await import("./index-CVZL5f_h.js").then(qe=>qe.e);return{getMemory:he}},__vite__mapDeps([0,1,2])),ce=await se(Q);Z=ce.memory||ce}else if(k==="decision"){const{getDecision:se}=await Et(async()=>{const{getDecision:he}=await import("./index-CVZL5f_h.js").then(qe=>qe.e);return{getDecision:he}},__vite__mapDeps([0,1,2])),ce=await se(Q);Z=ce.decision||ce}else if(k==="item"){const{getItem:se}=await Et(async()=>{const{getItem:he}=await import("./index-CVZL5f_h.js").then(qe=>qe.e);return{getItem:he}},__vite__mapDeps([0,1,2])),ce=await se(Q);Z=ce.item||ce}s.value=Z,n.entityDetailCache.set(ne,Z)}catch{o.value=!0}finally{a.value=!1}}Ro(()=>i.value?.id,()=>{s.value=null,l()},{immediate:!0});const c=Ne(!1),u=Ne(null),h=Ne("");function d(){i.value&&(h.value=i.value.title,c.value=!0,iu(()=>u.value?.focus()))}async function f(){if(!i.value)return;const ne=h.value.trim();if(!ne||ne===i.value.title){c.value=!1;return}const N=i.value.id.split(":"),U=N[0],k=parseInt(N.slice(1).join(":"),10);try{await n.updateEntityTitle(U,k,ne)}catch{await n.reload()}c.value=!1}function m(){c.value=!1}function _(ne){ne.key==="Enter"?(ne.stopPropagation(),f()):ne.key==="Escape"&&(ne.stopPropagation(),m())}const g=Ne(null),p=Ne(null),v=Ne("");function x(ne){if(!s.value)return;const N=s.value[ne];v.value=N!=null?String(N):"",g.value=ne,iu(()=>p.value?.focus())}async function y(){if(!i.value||!g.value||!s.value)return;const ne=g.value,N=v.value.trim();if(N===String(s.value[ne]||"")){g.value=null;return}const U=i.value.id.split(":"),k=U[0],Q=parseInt(U.slice(1).join(":"),10);try{const{updateEntityField:Z}=await Et(async()=>{const{updateEntityField:se}=await import("./index-CVZL5f_h.js").then(ce=>ce.e);return{updateEntityField:se}},__vite__mapDeps([0,1,2]));await Z(k,Q,{[ne]:N}),s.value={...s.value,[ne]:N},n.entityDetailCache.set(i.value.id,s.value)}catch{}g.value=null}function w(){g.value=null}function M(ne){ne.key==="Escape"?(ne.stopPropagation(),w()):(ne.key==="Enter"&&!(ne.target instanceof HTMLTextAreaElement)||(ne.ctrlKey||ne.metaKey)&&ne.key==="Enter"&&ne.target instanceof HTMLTextAreaElement)&&(ne.stopPropagation(),y())}async function A(){if(!i.value||!s.value)return;const ne=i.value.id.split(":"),N=parseInt(ne.slice(1).join(":"),10),U=s.value.status;try{if(U==="todo"){const{markTaskDone:k}=await Et(async()=>{const{markTaskDone:Q}=await import("./index-CVZL5f_h.js").then(Z=>Z.e);return{markTaskDone:Q}},__vite__mapDeps([0,1,2]));await k(N),s.value={...s.value,status:"done"}}else{const{markTaskTodo:k}=await Et(async()=>{const{markTaskTodo:Q}=await import("./index-CVZL5f_h.js").then(Z=>Z.e);return{markTaskTodo:Q}},__vite__mapDeps([0,1,2]));await k(N),s.value={...s.value,status:"todo"}}n.entityDetailCache.set(i.value.id,s.value),await n.reload()}catch{await n.reload()}}async function b(){if(!i.value||!s.value)return;const ne=i.value.id.split(":"),N=parseInt(ne.slice(1).join(":"),10),U=s.value.status;try{if(U==="candidate"){const{confirmMemory:k}=await Et(async()=>{const{confirmMemory:Q}=await import("./index-CVZL5f_h.js").then(Z=>Z.e);return{confirmMemory:Q}},__vite__mapDeps([0,1,2]));await k(N),s.value={...s.value,status:"confirmed"}}else{const{archiveMemory:k}=await Et(async()=>{const{archiveMemory:Q}=await import("./index-CVZL5f_h.js").then(Z=>Z.e);return{archiveMemory:Q}},__vite__mapDeps([0,1,2]));await k(N),s.value={...s.value,status:"archived"}}n.entityDetailCache.set(i.value.id,s.value),await n.reload()}catch{await n.reload()}}const E=t;e({startEditTitle:d});const P=Dt(()=>{if(!i.value||!n.data)return[];const ne=i.value.id,N=[];for(const U of n.data.associations){if(U.status==="rejected")continue;const k=U.from===ne,Q=U.to===ne;if(!k&&!Q)continue;const Z=k?U.to:U.from,se=n.data.entities.find(ce=>ce.id===Z);se&&N.push({assoc:U,isFrom:k,target:se})}return N}),D=Dt(()=>P.value.slice(0,5)),V=Dt(()=>{const ne={};for(const{assoc:N}of P.value)ne[N.relation_type]=(ne[N.relation_type]||0)+1;return ne}),J=Ne(!0);function K(ne){E("navigate-entity",ne)}function B(ne){return{co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[ne]||ne}const H=Dt(()=>{if(!i.value||!n.data)return[];const ne=i.value.id;return n.data.associations.filter(N=>(N.from===ne||N.to===ne)&&N.status!=="rejected")}),Y=Dt(()=>{if(!i.value||!n.data)return null;const ne=i.value.lifeline_id;if(!ne)return null;const N=n.data.lifelines.find(U=>U.id===ne);return N?{id:N.id,name:N.name}:null});function pe(ne){return ne==="task"?"T":ne==="memory"?"M":ne==="decision"?"D":ne==="item"?"I":"?"}function _e(ne){switch(ne){case"co_occurrence":return"共现";case"causal":return"因果";case"tension":return"张力";case"derived_from":return"衍生";default:return ne}}function ye(ne){switch(ne){case"causal":return"var(--accent)";case"tension":return"var(--text-5)";case"derived_from":return"var(--text-4)";default:return"var(--text-3)"}}function Re(ne){const N=i.value.id,k=ne.from===N?ne.to:ne.from,Q=k.split(":")[0],Z=n.data?.entities.find(se=>se.id===k);return{id:k,kind:Q,title:Z?.title||k}}function le(ne){const N=Re(ne);n.transition({kind:"node_focus",entity_kind:N.kind,entity_id:N.id})}function Ee(ne){n.transition({kind:"region_zoom",lifeline_id:ne})}async function Be(ne){await navigator.clipboard.writeText(ne),E("copied")}async function Le(ne){const N=`[${ne.kind}] ${ne.title} (\`${ne.id}\`)`;await navigator.clipboard.writeText(N),E("copied")}async function re(ne){await n.reviewAssociation(ne,"accepted")}async function Ae(ne){await n.reviewAssociation(ne,"rejected")}function xe(ne){return ne?ne.slice(0,10):""}function Xe(ne){return ne==="detail"||ne==="content"||ne==="decision"||ne==="context"||ne==="reasoning"||ne==="expected_outcome"}return(ne,N)=>i.value?(W(),q("div",k1,[R("div",B1,[R("span",z1,fe(pe(i.value.kind)),1),c.value?wt((W(),q("input",{key:0,ref_key:"editInput",ref:u,"onUpdate:modelValue":N[0]||(N[0]=U=>h.value=U),class:"title-input",onBlur:f,onKeydown:_},null,544)),[[Gt,h.value]]):(W(),q("span",{key:1,class:"entity-name",onDblclick:d},fe(i.value.title.slice(0,40)),33))]),R("div",V1,[R("span",{class:"entity-id",onClick:N[1]||(N[1]=U=>Be(i.value.id)),title:"点击复制 "+i.value.id},fe(i.value.id),9,G1),R("button",{class:"btn-copy-md",onClick:N[2]||(N[2]=U=>Le(i.value)),title:"复制为 Markdown"},"⎘")]),R("div",H1,[Y.value?(W(),q("span",{key:0,class:"lifeline-link",onClick:N[3]||(N[3]=U=>Ee(Y.value.id))},fe(Y.value.name),1)):(W(),q("span",W1,"未归类"))]),a.value?(W(),q("div",X1,"加载详情…")):o.value?(W(),q("div",$1,[N[17]||(N[17]=Cn(" 加载详情失败 ",-1)),R("button",{class:"btn-retry",onClick:l},"重试")])):s.value?(W(),q("div",q1,[N[39]||(N[39]=R("div",{class:"section-title"},"详情",-1)),(W(!0),q(Qe,null,Ht(Object.keys(s.value).filter(U=>!["id","created_at","updated_at","completed_at","due_date","estimated_minutes"].includes(U)),U=>(W(),q(Qe,{key:U},[U==="title"&&i.value.kind!=="item"?(W(),q("div",Y1,[N[18]||(N[18]=R("span",{class:"field-label"},"标题",-1)),g.value===U?wt((W(),q("input",{key:0,ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":N[4]||(N[4]=k=>v.value=k),class:"field-input",onKeydown:M,onBlur:y},null,544)),[[Gt,v.value]]):(W(),q(Qe,{key:1},[R("span",{class:"field-value",onDblclick:k=>x(U)},fe(s.value[U]?.slice(0,80)||"—"),41,Z1),R("button",{class:"field-edit-btn",onClick:k=>x(U)},"✎",8,K1)],64))])):U==="content"&&(i.value.kind==="memory"||i.value.kind==="item")?(W(),q("div",J1,[N[19]||(N[19]=R("span",{class:"field-label"},"内容",-1)),g.value===U?(W(),q(Qe,{key:0},[wt(R("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":N[5]||(N[5]=k=>v.value=k),class:"field-textarea",rows:"3",onKeydown:M},null,544),[[Gt,v.value]]),R("div",{class:"field-actions"},[R("button",{class:"btn-save",onClick:y},"保存"),R("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(W(),q(Qe,{key:1},[R("span",{class:"field-value multiline",onDblclick:k=>x(U)},fe(s.value[U]?.slice(0,200)||"—"),41,j1),R("button",{class:"field-edit-btn",onClick:k=>x(U)},"✎",8,Q1)],64))])):U==="detail"&&i.value.kind==="task"?(W(),q("div",ew,[N[20]||(N[20]=R("span",{class:"field-label"},"描述",-1)),g.value===U?(W(),q(Qe,{key:0},[wt(R("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":N[6]||(N[6]=k=>v.value=k),class:"field-textarea",rows:"3",onKeydown:M},null,544),[[Gt,v.value]]),R("div",{class:"field-actions"},[R("button",{class:"btn-save",onClick:y},"保存"),R("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(W(),q(Qe,{key:1},[R("span",{class:"field-value multiline",onDblclick:k=>x(U)},fe(s.value[U]?.slice(0,200)||"—"),41,tw),R("button",{class:"field-edit-btn",onClick:k=>x(U)},"✎",8,nw)],64))])):U==="decision"&&i.value.kind==="decision"?(W(),q("div",iw,[N[21]||(N[21]=R("span",{class:"field-label"},"决策",-1)),g.value===U?(W(),q(Qe,{key:0},[wt(R("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":N[7]||(N[7]=k=>v.value=k),class:"field-textarea",rows:"3",onKeydown:M},null,544),[[Gt,v.value]]),R("div",{class:"field-actions"},[R("button",{class:"btn-save",onClick:y},"保存"),R("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(W(),q(Qe,{key:1},[R("span",{class:"field-value multiline",onDblclick:k=>x(U)},fe(s.value[U]?.slice(0,200)||"—"),41,sw),R("button",{class:"field-edit-btn",onClick:k=>x(U)},"✎",8,rw)],64))])):U==="context"&&i.value.kind==="decision"?(W(),q("div",aw,[N[22]||(N[22]=R("span",{class:"field-label"},"背景",-1)),g.value===U?(W(),q(Qe,{key:0},[wt(R("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":N[8]||(N[8]=k=>v.value=k),class:"field-textarea",rows:"2",onKeydown:M},null,544),[[Gt,v.value]]),R("div",{class:"field-actions"},[R("button",{class:"btn-save",onClick:y},"保存"),R("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(W(),q(Qe,{key:1},[R("span",{class:"field-value multiline",onDblclick:k=>x(U)},fe(s.value[U]?.slice(0,120)||"—"),41,ow),R("button",{class:"field-edit-btn",onClick:k=>x(U)},"✎",8,lw)],64))])):U==="reasoning"&&i.value.kind==="decision"?(W(),q("div",cw,[N[23]||(N[23]=R("span",{class:"field-label"},"推理",-1)),g.value===U?(W(),q(Qe,{key:0},[wt(R("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":N[9]||(N[9]=k=>v.value=k),class:"field-textarea",rows:"2",onKeydown:M},null,544),[[Gt,v.value]]),R("div",{class:"field-actions"},[R("button",{class:"btn-save",onClick:y},"保存"),R("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(W(),q(Qe,{key:1},[R("span",{class:"field-value multiline",onDblclick:k=>x(U)},fe(s.value[U]?.slice(0,120)||"—"),41,uw),R("button",{class:"field-edit-btn",onClick:k=>x(U)},"✎",8,dw)],64))])):U==="expected_outcome"&&i.value.kind==="decision"?(W(),q("div",hw,[N[24]||(N[24]=R("span",{class:"field-label"},"预期",-1)),g.value===U?(W(),q(Qe,{key:0},[wt(R("textarea",{ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":N[10]||(N[10]=k=>v.value=k),class:"field-textarea",rows:"2",onKeydown:M},null,544),[[Gt,v.value]]),R("div",{class:"field-actions"},[R("button",{class:"btn-save",onClick:y},"保存"),R("button",{class:"btn-cancel",onClick:w},"取消")])],64)):(W(),q(Qe,{key:1},[R("span",{class:"field-value multiline",onDblclick:k=>x(U)},fe(s.value[U]?.slice(0,120)||"—"),41,fw),R("button",{class:"field-edit-btn",onClick:k=>x(U)},"✎",8,pw)],64))])):U==="priority"&&i.value.kind==="task"?(W(),q("div",mw,[N[26]||(N[26]=R("span",{class:"field-label"},"优先级",-1)),g.value===U?wt((W(),q("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":N[11]||(N[11]=k=>v.value=k),class:"field-select",onBlur:y,onKeydown:[Qn(y,["enter"]),Qn(w,["escape"])]},[...N[25]||(N[25]=[R("option",{value:"high"},"高",-1),R("option",{value:"medium"},"中",-1),R("option",{value:"low"},"低",-1)])],544)),[[xi,v.value]]):(W(),q(Qe,{key:1},[R("span",{class:"field-value",onDblclick:k=>x(U)},fe(s.value[U]||"medium"),41,gw),R("button",{class:"field-edit-btn",onClick:k=>x(U)},"✎",8,_w)],64))])):U==="status"&&i.value.kind!=="item"?(W(),q("div",vw,[N[35]||(N[35]=R("span",{class:"field-label"},"状态",-1)),g.value===U?wt((W(),q("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":N[12]||(N[12]=k=>v.value=k),class:"field-select",onBlur:y,onKeydown:[Qn(y,["enter"]),Qn(w,["escape"])]},[i.value.kind==="task"?(W(),q(Qe,{key:0},[N[27]||(N[27]=R("option",{value:"todo"},"待办",-1)),N[28]||(N[28]=R("option",{value:"done"},"完成",-1)),N[29]||(N[29]=R("option",{value:"cancelled"},"取消",-1))],64)):i.value.kind==="memory"?(W(),q(Qe,{key:1},[N[30]||(N[30]=R("option",{value:"candidate"},"候选",-1)),N[31]||(N[31]=R("option",{value:"confirmed"},"已确认",-1)),N[32]||(N[32]=R("option",{value:"archived"},"归档",-1))],64)):(W(),q(Qe,{key:2},[N[33]||(N[33]=R("option",{value:"pending"},"待回顾",-1)),N[34]||(N[34]=R("option",{value:"reviewed"},"已回顾",-1))],64))],544)),[[xi,v.value]]):(W(),q(Qe,{key:1},[R("span",xw,fe(s.value[U]),1),R("button",{class:"field-edit-btn",onClick:k=>x(U)},"✎",8,yw)],64))])):U==="category"&&i.value.kind==="memory"?(W(),q("div",bw,[N[37]||(N[37]=R("span",{class:"field-label"},"分类",-1)),g.value===U?wt((W(),q("select",{key:0,ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":N[13]||(N[13]=k=>v.value=k),class:"field-select",onBlur:y,onKeydown:[Qn(y,["enter"]),Qn(w,["escape"])]},[...N[36]||(N[36]=[mr('<option value="fact" data-v-00ca8067>事实</option><option value="preference" data-v-00ca8067>偏好</option><option value="goal" data-v-00ca8067>目标</option><option value="relationship" data-v-00ca8067>关系</option><option value="event" data-v-00ca8067>事件</option>',5)])],544)),[[xi,v.value]]):(W(),q(Qe,{key:1},[R("span",Mw,fe(s.value[U]),1),R("button",{class:"field-edit-btn",onClick:k=>x(U)},"✎",8,Sw)],64))])):U==="source"||U==="type"?(W(),q("div",ww,[R("span",Ew,fe(U==="source"?"来源":"类型"),1),R("span",Tw,fe(s.value[U]||"—"),1)])):!Xe(U)&&U!=="title"?(W(),q("div",Aw,[R("span",Cw,fe(U),1),g.value===U?wt((W(),q("input",{key:0,ref_for:!0,ref_key:"fieldEl",ref:p,"onUpdate:modelValue":N[14]||(N[14]=k=>v.value=k),class:"field-input",onKeydown:M,onBlur:y},null,544)),[[Gt,v.value]]):(W(),q("span",{key:1,class:"field-value",onDblclick:k=>x(U)},fe(s.value[U]?.slice(0,60)||"—"),41,Rw))])):ke("",!0)],64))),128)),s.value.created_at?(W(),q("div",Iw,[N[38]||(N[38]=R("span",{class:"field-label"},"创建时间",-1)),R("span",Pw,fe(xe(s.value.created_at)),1)])):ke("",!0)])):ke("",!0),s.value?(W(),q("div",Lw,[i.value.kind==="task"&&s.value.status!=="cancelled"?(W(),q("button",{key:0,class:"btn-action",onClick:A},fe(s.value.status==="todo"?"标记完成":"重开任务"),1)):ke("",!0),i.value.kind==="memory"&&s.value.status!=="archived"?(W(),q("button",{key:1,class:"btn-action",onClick:b},fe(s.value.status==="candidate"?"确认":"归档"),1)):ke("",!0)])):ke("",!0),P.value.length>0?(W(),q("div",Dw,[R("div",{class:"assoc-title",onClick:N[16]||(N[16]=U=>J.value=!J.value)},[Cn(" 关联 ("+fe(P.value.length)+") ",1),R("span",Uw,[(W(!0),q(Qe,null,Ht(V.value,(U,k)=>(W(),q("span",{key:k,class:"assoc-type-cnt"},fe(B(k))+":"+fe(U),1))),128))]),R("button",{class:"btn-r",onClick:N[15]||(N[15]=fn(U=>E("enter-relation"),["stop"])),title:"查看关联 (R)"},"R")]),J.value?(W(),q("div",Nw,[(W(!0),q(Qe,null,Ht(D.value,U=>(W(),q("div",{key:U.assoc.id,class:$t(["assoc-summary-row",{pending:U.assoc.status==="pending"}]),onClick:k=>K(U.target.id)},[R("span",Ow,fe(B(U.assoc.relation_type)),1),R("span",kw,fe(Math.round(U.assoc.confidence*100))+"%",1),R("span",Bw,fe(U.isFrom?"→":"←"),1),R("span",zw,fe(pe(U.target.kind)),1),R("span",Vw,fe(U.target.title.slice(0,25)),1)],10,Fw))),128)),P.value.length>5?(W(),q("div",Gw," … 查看全部 (共 "+fe(P.value.length)+" 条) ",1)):ke("",!0)])):ke("",!0)])):ke("",!0),R("div",Hw,[R("div",Ww,"关联 ("+fe(H.value.length)+")",1),H.value.length===0?(W(),q("div",Xw,"暂无关联")):ke("",!0),(W(!0),q(Qe,null,Ht(H.value,U=>(W(),q("div",{key:U.id,class:"assoc-wrapper"},[R("div",{class:$t(["assoc-row",{pending:U.status==="pending",expanded:Ke(n).selectedAssocId===U.id}])},[R("span",{class:"rel-badge",style:ws({color:ye(U.relation_type)})},"["+fe(_e(U.relation_type))+"]",5),R("span",{class:"assoc-target",onClick:fn(k=>le(U),["stop"])},fe(Re(U).title.slice(0,30)),9,$w),R("span",qw,fe(Math.round(U.confidence*100))+"%",1),R("span",{class:$t(["status-badge",U.status])},fe(U.status==="accepted"?"已确认":"待定"),3),U.status==="pending"?(W(),q("span",Yw,[R("button",{class:"btn-accept",onClick:k=>re(U.id)},"✓",8,Zw),R("button",{class:"btn-reject",onClick:k=>Ae(U.id)},"✗",8,Kw)])):ke("",!0),R("span",Jw,[R("button",{class:"btn-edit-assoc",onClick:fn(k=>E("edit-assoc",U),["stop"])},"✎",8,jw),R("button",{class:"btn-del-assoc",onClick:fn(k=>E("delete-assoc",U.id),["stop"])},"✕",8,Qw)]),R("button",{class:"btn-expand",onClick:fn(k=>Ke(n).selectedAssocId===U.id?Ke(n).selectAssociation(null):Ke(n).selectAssociation(U.id),["stop"])},fe(Ke(n).selectedAssocId===U.id?"▾":"▸"),9,eE)],2),Ke(n).selectedAssocId===U.id?(W(),q("div",tE,[R("div",nE,"证据 ("+fe(U.evidence?.length||0)+" 条)",1),!U.evidence||U.evidence.length===0?(W(),q("div",iE,"暂无证据详情")):ke("",!0),(W(!0),q(Qe,null,Ht(U.evidence,(k,Q)=>(W(),q("div",{key:Q,class:"evidence-item"},[R("div",sE,'"'+fe(k.excerpt.slice(0,120))+fe(k.excerpt.length>120?"…":"")+'"',1),R("div",rE,[R("span",aE,fe(k.type),1),R("span",oE,"权重: "+fe(Math.round(k.weight*100))+"%",1)])]))),128))])):ke("",!0)]))),128))])])):ke("",!0)}}),cE=In(lE,[["__scopeId","data-v-00ca8067"]]),uE={class:"atlas-search"},dE={key:0,class:"results"},hE={class:"kind-chips"},fE={key:0,class:"no-results"},pE=["onClick"],mE={class:"result-kind"},gE={class:"result-info"},_E={class:"result-title"},vE={class:"result-path"},xE={key:1,class:"recent"},yE=["onClick"],nu="atlas_recent_searches",bE=5,ME=Pn({__name:"AtlasSearch",emits:["select","close"],setup(r,{emit:e}){function t(){try{return JSON.parse(localStorage.getItem(nu)||"[]")}catch{return[]}}function n(w){localStorage.setItem(nu,JSON.stringify(w))}const i=Ne(t());function s(w){const M=w.trim();if(!M)return;const A=t().filter(E=>E!==M);A.unshift(M);const b=A.slice(0,bE);n(b),i.value=b}function a(){localStorage.removeItem(nu),i.value=[]}function o(w){c.value=w,s(w),h.value?.focus()}const l=as(),c=Ne(""),u=Ne(0),h=Ne(null),d=Ne(null),f=Dt(()=>{const w=c.value.trim().toLowerCase();if(!w||!l.data)return[];const M=[];for(const A of l.data.entities)A.title.toLowerCase().includes(w)&&M.push({id:A.id,kind:A.kind,title:A.title,path:g(A.lifeline_id),layer:3});for(const A of l.data.lifelines)if(A.name.toLowerCase().includes(w)){const b=A.parent_id==="ROOT"?1:2,E=l.data.lifelines.find(D=>D.id===A.parent_id),P=E?E.name:"根级 lifeline";M.push({id:A.id,kind:"lifeline",title:A.name,path:P,layer:b})}return M.sort((A,b)=>{const E=A.title.toLowerCase()===w?0:A.title.toLowerCase().startsWith(w)?1:2,P=b.title.toLowerCase()===w?0:b.title.toLowerCase().startsWith(w)?1:2;return E-P||A.title.length-b.title.length}),M.slice(0,8)}),m=Dt(()=>d.value?f.value.filter(w=>w.kind===d.value):f.value);function _(w){d.value=d.value===w?null:w}function g(w){if(!l.data)return"";const M=[];let A=l.data.lifelines.find(b=>b.id===w);for(;A;){M.unshift(A.name);const b=A?.parent_id;A=b?l.data.lifelines.find(E=>E.id===b):void 0}return M.length>=2?`${M[M.length-1]} · ${M[0]}`:M.join(" · ")}function p(w){return w==="lifeline"?"L":w[0].toUpperCase()}function v(w){s(c.value),y("select",w),y("close")}function x(w){w.key==="ArrowDown"?(w.preventDefault(),u.value=Math.min(u.value+1,f.value.length-1)):w.key==="ArrowUp"?(w.preventDefault(),u.value=Math.max(u.value-1,0)):w.key==="Enter"?(w.preventDefault(),f.value[u.value]&&v(f.value[u.value])):w.key==="Escape"&&(w.preventDefault(),y("close"))}const y=e;return Bi(()=>{h.value?.focus()}),(w,M)=>(W(),q("div",uE,[wt(R("input",{ref_key:"inputEl",ref:h,"onUpdate:modelValue":M[0]||(M[0]=A=>c.value=A),class:"search-input",placeholder:"搜索 entity 或 lifeline…",onKeydown:x},null,544),[[Gt,c.value]]),c.value.trim()?(W(),q("div",dE,[R("div",hE,[R("button",{class:$t(["kind-chip",{active:!d.value}]),onClick:M[1]||(M[1]=A=>d.value=null)},"全部",2),R("button",{class:$t(["kind-chip",{active:d.value==="task"}]),onClick:M[2]||(M[2]=A=>_("task"))},"T",2),R("button",{class:$t(["kind-chip",{active:d.value==="memory"}]),onClick:M[3]||(M[3]=A=>_("memory"))},"M",2),R("button",{class:$t(["kind-chip",{active:d.value==="decision"}]),onClick:M[4]||(M[4]=A=>_("decision"))},"D",2),R("button",{class:$t(["kind-chip",{active:d.value==="item"}]),onClick:M[5]||(M[5]=A=>_("item"))},"I",2)]),m.value.length===0?(W(),q("div",fE,"无匹配结果")):ke("",!0),(W(!0),q(Qe,null,Ht(m.value,(A,b)=>(W(),q("div",{key:A.id,class:$t(["result-row",{selected:b===u.value}]),onClick:E=>v(A)},[R("span",mE,fe(p(A.kind)),1),R("div",gE,[R("div",_E,fe(A.title),1),R("div",vE,fe(A.path),1)])],10,pE))),128))])):i.value.length>0?(W(),q("div",xE,[M[6]||(M[6]=R("div",{class:"recent-title"},"最近搜索",-1)),(W(!0),q(Qe,null,Ht(i.value,(A,b)=>(W(),q("div",{key:b,class:"recent-row",onClick:E=>o(A)},fe(A),9,yE))),128)),R("button",{class:"recent-clear",onClick:a},"清除历史")])):ke("",!0)]))}}),SE=In(ME,[["__scopeId","data-v-700b2580"]]),wE={key:0,class:"submenu"},EE=["disabled","onClick"],TE=["disabled","onClick"],AE={key:0,class:"subitem empty"},CE=Pn({__name:"ContextMenu",props:{target:{},x:{},y:{}},emits:["close","edit-title","delete-entity","move-lifeline","edit-lifeline-name","associate-to","find-path-to","copy-title","delete-lifeline","quick-create"],setup(r,{emit:e}){const t=r,n=e,i=as(),s=Ne(null),a=Ne(null),o=Dt(()=>{let M=t.x,A=t.y;return M+200>window.innerWidth&&(M=window.innerWidth-200-4),A+300>window.innerHeight&&(A=window.innerHeight-300-4),{left:`${M}px`,top:`${A}px`}}),l=Dt(()=>t.target.layer===3),c=Dt(()=>i.data?i.data.lifelines.filter(w=>w.parent_id==="ROOT").map(w=>({...w,children:i.data.lifelines.filter(M=>M.parent_id===w.id)})):[]),u=Dt(()=>!i.data||!t.target.id?null:i.data.entities.find(w=>w.id===t.target.id)?.lifeline_id??null);function h(){n("edit-title",t.target),n("close")}function d(){n("delete-entity",t.target),n("close")}function f(y){n("move-lifeline",t.target.id,y),n("close")}function m(){n("associate-to",t.target),n("close")}function _(){n("find-path-to",t.target),n("close")}function g(){n("copy-title",t.target),n("close")}function p(){n("edit-lifeline-name",t.target),n("close")}function v(y){s.value&&!s.value.contains(y.target)&&n("close")}function x(y){y.key==="Escape"&&n("close")}return Bi(()=>{document.addEventListener("pointerdown",v,!0),document.addEventListener("keydown",x)}),rs(()=>{document.removeEventListener("pointerdown",v,!0),document.removeEventListener("keydown",x)}),(y,w)=>(W(),q("div",{ref_key:"menuRef",ref:s,class:"ctx-menu",style:ws(o.value)},[l.value?(W(),q(Qe,{key:0},[R("button",{class:"ctx-item",onClick:h},"编辑标题…"),R("div",{class:"ctx-item has-sub",onPointerenter:w[0]||(w[0]=M=>a.value="lifeline"),onPointerleave:w[1]||(w[1]=M=>a.value=null)},[w[4]||(w[4]=Cn(" 移动到 lifeline ▸ ",-1)),a.value==="lifeline"?(W(),q("div",wE,[(W(!0),q(Qe,null,Ht(c.value,M=>(W(),q(Qe,{key:M.id},[R("button",{class:$t(["subitem r1-item",{current:M.id===u.value}]),disabled:M.id===u.value,onClick:A=>f(M.id)},fe(M.name),11,EE),(W(!0),q(Qe,null,Ht(M.children,A=>(W(),q("button",{key:A.id,class:$t(["subitem r2-item",{current:A.id===u.value}]),disabled:A.id===u.value,onClick:b=>f(A.id)},fe(A.name),11,TE))),128))],64))),128)),c.value.length===0?(W(),q("div",AE,"暂无 lifeline")):ke("",!0)])):ke("",!0)],32),R("button",{class:"ctx-item",onClick:m},"关联到…"),R("button",{class:"ctx-item",onClick:_},"查找路径到…"),R("button",{class:"ctx-item",onClick:g},"复制标题"),w[5]||(w[5]=R("div",{class:"ctx-separator"},null,-1)),R("button",{class:"ctx-item danger",onClick:d},"删除")],64)):(W(),q(Qe,{key:1},[R("button",{class:"ctx-item",onClick:w[2]||(w[2]=M=>{n("quick-create",t.target.id),n("close")})},"新建 entity…"),w[6]||(w[6]=R("div",{class:"ctx-separator"},null,-1)),R("button",{class:"ctx-item",onClick:p},"编辑名称…"),w[7]||(w[7]=R("div",{class:"ctx-separator"},null,-1)),R("button",{class:"ctx-item danger",onClick:w[3]||(w[3]=M=>{n("delete-lifeline",t.target.id,t.target.title),n("close")})},"删除 lifeline")],64))],4))}}),RE=In(CE,[["__scopeId","data-v-59974e34"]]),IE={class:"confirm-title"},PE={key:0,class:"confirm-message"},LE={class:"confirm-actions"},DE=Pn({__name:"ConfirmDialog",props:{title:{},message:{default:""},confirmLabel:{default:"确认"},cancelLabel:{default:"取消"},danger:{type:Boolean,default:!1}},emits:["confirm","cancel"],setup(r,{emit:e}){const t=e;function n(i){i.key==="Escape"&&t("cancel"),i.key==="Enter"&&t("confirm")}return Bi(()=>{document.addEventListener("keydown",n)}),rs(()=>{document.removeEventListener("keydown",n)}),(i,s)=>(W(),q("div",{class:"confirm-overlay",onPointerdown:s[3]||(s[3]=a=>t("cancel"))},[R("div",{class:"confirm-dialog",onPointerdown:s[2]||(s[2]=fn(()=>{},["stop"]))},[R("div",IE,fe(r.title),1),r.message?(W(),q("div",PE,fe(r.message),1)):ke("",!0),R("div",LE,[R("button",{class:"confirm-btn cancel-btn",onClick:s[0]||(s[0]=a=>t("cancel"))},fe(r.cancelLabel),1),R("button",{class:$t(["confirm-btn",r.danger?"danger-btn":"primary-btn"]),onClick:s[1]||(s[1]=a=>t("confirm"))},fe(r.confirmLabel),3)])],32)],32))}}),UE=In(DE,[["__scopeId","data-v-128fcad2"]]),NE={class:"dialog"},FE={class:"dialog-title"},OE={class:"field-row"},kE={class:"entity-ref"},BE={class:"field-row"},zE={class:"entity-ref"},VE={key:0,class:"status-row"},GE={class:"field-row"},HE=["value"],WE={class:"field-row"},XE={class:"label"},$E={class:"conf-value"},qE={class:"evidence-section"},YE=["onUpdate:modelValue"],ZE=["onUpdate:modelValue"],KE=["onClick"],JE={class:"dialog-actions"},jE={key:1,class:"delete-area"},QE={key:2,class:"delete-confirm"},eT=Pn({__name:"AssociationEditDialog",props:{fromId:{},fromTitle:{},toId:{},toTitle:{},existing:{}},emits:["cancel","create","update","delete"],setup(r,{emit:e}){const t=r,n=e,i=Ne(t.existing?.relation_type||"manual"),s=Ne(t.existing?.confidence??.7),a=bf(t.existing?.evidence?.length?t.existing.evidence.map(_=>({..._})):[{type:"manual",excerpt:"",weight:.8}]),o=!t.existing,l=Ne(!1),c=[{value:"co_occurrence",label:"共现"},{value:"causal",label:"因果"},{value:"tension",label:"张力"},{value:"derived_from",label:"衍生"},{value:"manual",label:"人工标注"}];function u(){a.length<5&&a.push({type:"manual",excerpt:"",weight:.5})}function h(_){a.length>1&&a.splice(_,1)}function d(){o?n("create",{from:t.fromId,to:t.toId,relation_type:i.value,confidence:s.value,evidence:a.filter(_=>_.excerpt.trim())}):n("update",{association_id:t.existing.id,relation_type:i.value,confidence:s.value,evidence:a.filter(_=>_.excerpt.trim())})}function f(){n("delete",t.existing.id)}function m(_){_.key==="Escape"&&n("cancel")}return Bi(()=>{document.addEventListener("keydown",m)}),rs(()=>{document.removeEventListener("keydown",m)}),(_,g)=>(W(),q("div",{class:"dialog-overlay",onClick:g[5]||(g[5]=fn(p=>n("cancel"),["self"]))},[R("div",NE,[R("div",FE,fe(o?"新建关联":"编辑关联"),1),R("div",OE,[g[6]||(g[6]=R("span",{class:"label"},"从",-1)),R("span",kE,fe(r.fromTitle.slice(0,30)),1)]),R("div",BE,[g[7]||(g[7]=R("span",{class:"label"},"到",-1)),R("span",zE,fe(r.toTitle.slice(0,30)),1)]),o?ke("",!0):(W(),q("div",VE,[g[8]||(g[8]=R("span",{class:"label"},"状态",-1)),R("span",{class:$t(["status-badge",t.existing.status])},fe(t.existing.status==="accepted"?"已确认":t.existing.status==="rejected"?"已拒绝":"待定"),3)])),R("div",GE,[g[9]||(g[9]=R("label",{class:"label",for:"rel-type"},"关系类型",-1)),wt(R("select",{id:"rel-type","onUpdate:modelValue":g[0]||(g[0]=p=>i.value=p),class:"field"},[(W(),q(Qe,null,Ht(c,p=>R("option",{key:p.value,value:p.value},fe(p.label),9,HE)),64))],512),[[xi,i.value]])]),R("div",WE,[R("label",XE,[g[10]||(g[10]=Cn(" 信心度 ",-1)),R("span",$E,fe(s.value.toFixed(2)),1)]),wt(R("input",{"onUpdate:modelValue":g[1]||(g[1]=p=>s.value=p),type:"range",min:"0.3",max:"1.0",step:"0.01",class:"slider"},null,512),[[Gt,s.value,void 0,{number:!0}]])]),R("div",qE,[g[12]||(g[12]=R("span",{class:"label"},"证据",-1)),(W(!0),q(Qe,null,Ht(a,(p,v)=>(W(),q("div",{key:v,class:"evidence-edit-row"},[wt(R("select",{"onUpdate:modelValue":x=>p.type=x,class:"field evidence-type-sel"},[...g[11]||(g[11]=[mr('<option value="manual" data-v-0ae04a56>人工标注</option><option value="semantic" data-v-0ae04a56>语义相似</option><option value="co_occurrence" data-v-0ae04a56>共现统计</option><option value="temporal" data-v-0ae04a56>时间序列</option><option value="causal_hint" data-v-0ae04a56>因果模式</option>',5)])],8,YE),[[xi,p.type]]),wt(R("input",{"onUpdate:modelValue":x=>p.excerpt=x,class:"field evidence-excerpt",placeholder:"证据摘要（10-120 字）"},null,8,ZE),[[Gt,p.excerpt]]),a.length>1?(W(),q("button",{key:0,class:"btn-icon",onClick:x=>h(v)},"×",8,KE)):ke("",!0)]))),128)),a.length<5?(W(),q("button",{key:0,class:"btn-text",onClick:u},"+ 添加证据")):ke("",!0)]),R("div",JE,[R("button",{class:"btn-cancel",onClick:g[2]||(g[2]=p=>n("cancel"))},"取消"),R("button",{class:"btn-submit",onClick:d},fe(o?"创建关联":"保存修改"),1)]),!o&&!l.value?(W(),q("div",jE,[R("button",{class:"btn-delete",onClick:g[3]||(g[3]=p=>l.value=!0)},"删除关联")])):ke("",!0),l.value?(W(),q("div",QE,[g[13]||(g[13]=Cn(" 确定删除此关联？ ",-1)),R("button",{class:"btn-delete",onClick:f},"确认删除"),R("button",{class:"btn-text",onClick:g[4]||(g[4]=p=>l.value=!1)},"取消")])):ke("",!0)])]))}}),tT=In(eT,[["__scopeId","data-v-0ae04a56"]]),nT=Pn({__name:"LegendBar",props:{showAssoc:{type:Boolean}},setup(r){const e=r,t=Ne(!1),n=Ne(!1);let i;function s(){t.value=!1,i&&clearTimeout(i),i=window.setTimeout(()=>{n.value||(t.value=!0)},5e3)}return Bi(()=>s()),rs(()=>{i&&clearTimeout(i)}),Ro(()=>e.showAssoc,()=>s()),(a,o)=>(W(),q("div",{class:$t(["legend-bar",{faded:t.value&&!n.value}]),onMouseenter:o[0]||(o[0]=l=>{n.value=!0,t.value=!1}),onMouseleave:o[1]||(o[1]=l=>{n.value=!1,s()})},[o[3]||(o[3]=mr('<div class="legend-section" data-v-53c6bdbb><span class="legend-title" data-v-53c6bdbb>节点</span><span class="legend-item" data-v-53c6bdbb><span class="dot task" data-v-53c6bdbb>■</span> 任务</span><span class="legend-item" data-v-53c6bdbb><span class="dot memory" data-v-53c6bdbb>●</span> 记忆</span><span class="legend-item" data-v-53c6bdbb><span class="dot decision" data-v-53c6bdbb>◆</span> 决策</span><span class="legend-item" data-v-53c6bdbb><span class="dot item" data-v-53c6bdbb>▲</span> 条目</span></div>',1)),r.showAssoc?(W(),q(Qe,{key:0},[o[2]||(o[2]=mr('<div class="legend-sep" data-v-53c6bdbb>|</div><div class="legend-section" data-v-53c6bdbb><span class="legend-title" data-v-53c6bdbb>关联</span><span class="legend-item" data-v-53c6bdbb><span class="line-sample causal" data-v-53c6bdbb></span> 因果</span><span class="legend-item" data-v-53c6bdbb><span class="line-sample co" data-v-53c6bdbb></span> 共现</span><span class="legend-item" data-v-53c6bdbb><span class="line-sample tension" data-v-53c6bdbb></span> 张力</span><span class="legend-item" data-v-53c6bdbb><span class="line-sample derived" data-v-53c6bdbb></span> 衍生</span></div>',2))],64)):ke("",!0)],34))}}),iT=In(nT,[["__scopeId","data-v-53c6bdbb"]]),On=180,sT=Pn({__name:"Minimap",props:{layoutNodes:{},camera:{},controls:{},worldRadius:{},focusedLifelineId:{}},emits:["jump"],setup(r,{emit:e}){const t=r,n=e,i=Ne(null);let s=0;function a(c){const u=On/(t.worldRadius*2.4),h=On/2,d=On/2;return{x:h+c.x*u,y:d-c.z*u}}function o(){const c=i.value;if(!c)return;const u=c.getContext("2d");if(!u)return;const h=window.devicePixelRatio||1;c.width=On*h,c.height=On*h,u.scale(h,h),u.fillStyle="rgba(7, 9, 13, 0.85)",u.beginPath(),u.roundRect(0,0,On,On,8),u.fill(),u.strokeStyle="rgba(255,255,255,0.06)",u.lineWidth=1,u.beginPath(),u.arc(On/2,On/2,On/2.6,0,Math.PI*2),u.stroke();const d=t.layoutNodes.filter(m=>m.layer===1),f=t.layoutNodes.filter(m=>m.layer===2);for(const m of f){const _=a(m.position);u.fillStyle="rgba(255,255,255,0.2)",u.beginPath(),u.arc(_.x,_.y,2,0,Math.PI*2),u.fill()}for(const m of d){const _=a(m.position);m.id===t.focusedLifelineId&&(u.strokeStyle="#6ee7d0",u.lineWidth=2,u.beginPath(),u.arc(_.x,_.y,5,0,Math.PI*2),u.stroke()),u.fillStyle="#6ee7d0",u.beginPath(),u.arc(_.x,_.y,3,0,Math.PI*2),u.fill()}if(t.camera&&t.controls){const m=t.camera.position,_=a(m),g=t.controls.target||new I(0,0,0),p=a(g);u.strokeStyle="#6ee7d0",u.lineWidth=1;const v=22+(m.length()-2)*5,x=16+(m.length()-2)*3.5;u.strokeRect(_.x-v/2,_.y-x/2,v,x),u.beginPath(),u.moveTo(_.x,_.y),u.lineTo(p.x,p.y),u.strokeStyle="rgba(110,231,208,0.3)",u.stroke()}s=requestAnimationFrame(o)}function l(c){if(!i.value?.getBoundingClientRect())return;const h=c.offsetX,d=c.offsetY,f=On/(t.worldRadius*2.4),m=On/2,_=On/2,g=(h-m)/f,p=-(d-_)/f,x=new I(g,.3,p).normalize().clone().multiplyScalar(4.5),y=new I(0,0,0);n("jump",x,y)}return Bi(()=>{s=requestAnimationFrame(o)}),rs(()=>{cancelAnimationFrame(s)}),(c,u)=>(W(),q("canvas",{ref_key:"canvasRef",ref:i,class:"minimap",width:180,height:180,onClick:l},null,512))}}),rT=In(sT,[["__scopeId","data-v-210e4d3a"]]),aT={key:0,class:"path-panel"},oT={class:"path-title"},lT={key:0},cT={class:"path-steps"},uT=["onClick"],dT={class:"path-kind"},hT={class:"path-e-title"},fT={key:0,class:"path-assoc"},pT={class:"path-a-type"},mT={class:"path-a-conf"},gT={class:"path-actions"},_T=["disabled"],vT=["disabled"],xT={key:1,class:"path-panel"},yT=Pn({__name:"PathPanel",props:{paths:{},currentPathIndex:{},fromTitle:{},toTitle:{}},emits:["prev-path","next-path","clear","focus-entity","copied"],setup(r,{emit:e}){const t=r,n=e;async function i(){let c=`**路径（${a.value} 跳）**：
`;s.value.forEach((u,h)=>{c+=`${h+1}. ${u.entityTitle} (\`${u.entityId}\`)
`,u.assocId&&(c+=`   [${o(u.assocType||"")} ${u.assocConfidence?Math.round(u.assocConfidence*100)+"%":""}] →
`)}),await navigator.clipboard.writeText(c),n("copied")}const s=Dt(()=>t.paths[t.currentPathIndex]||[]),a=Dt(()=>s.value.length-1);function o(c){return{co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[c]||c}function l(c){const u=c.split(":")[0];return u==="task"?"T":u==="memory"?"M":u==="decision"?"D":u==="item"?"I":"?"}return(c,u)=>r.paths.length>0?(W(),q("div",aT,[R("div",oT,[Cn("路径（"+fe(a.value)+" 跳）",1),r.paths.length>1?(W(),q("span",lT," 共 "+fe(r.paths.length)+" 条 · "+fe(r.currentPathIndex+1)+"/"+fe(r.paths.length),1)):ke("",!0)]),R("div",cT,[(W(!0),q(Qe,null,Ht(s.value,(h,d)=>(W(),q(Qe,{key:d},[R("div",{class:"path-entity",onClick:f=>n("focus-entity",h.entityId)},[R("span",dT,fe(l(h.entityId)),1),R("span",hT,fe(h.entityTitle.slice(0,30)),1)],8,uT),h.assocId?(W(),q("div",fT,[u[4]||(u[4]=R("span",{class:"path-line"},"┊",-1)),R("span",pT,"["+fe(o(h.assocType||""))+"]",1),R("span",mT,fe(h.assocConfidence?Math.round(h.assocConfidence*100)+"%":""),1)])):ke("",!0)],64))),128))]),R("div",gT,[r.paths.length>1?(W(),q("button",{key:0,class:"path-btn",disabled:r.currentPathIndex===0,onClick:u[0]||(u[0]=h=>n("prev-path"))},"上一条",8,_T)):ke("",!0),r.paths.length>1?(W(),q("button",{key:1,class:"path-btn",disabled:r.currentPathIndex>=r.paths.length-1,onClick:u[1]||(u[1]=h=>n("next-path"))},"下一条",8,vT)):ke("",!0),R("button",{class:"path-btn",onClick:i},"复制路径"),R("button",{class:"path-btn clear",onClick:u[2]||(u[2]=h=>n("clear"))},"清除")])])):(W(),q("div",xT,[u[5]||(u[5]=R("div",{class:"path-title"},"未找到路径",-1)),u[6]||(u[6]=R("div",{class:"path-none"},"深度 5 内无连接",-1)),R("button",{class:"path-btn clear",onClick:u[3]||(u[3]=h=>n("clear"))},"关闭")]))}}),bT=In(yT,[["__scopeId","data-v-cb34b2fb"]]),MT={class:"sp-panel"},ST={class:"sp-header"},wT=Pn({__name:"ShortcutPanel",emits:["close"],setup(r,{emit:e}){const t=e;function n(i){(i.key==="?"||i.key==="Escape")&&t("close")}return Bi(()=>{document.addEventListener("keydown",n)}),rs(()=>{document.removeEventListener("keydown",n)}),(i,s)=>(W(),q("div",{class:"sp-overlay",onClick:s[1]||(s[1]=fn(a=>t("close"),["self"]))},[R("div",MT,[R("div",ST,[s[2]||(s[2]=R("span",{class:"sp-title"},"快捷键参考",-1)),R("button",{class:"sp-close",onClick:s[0]||(s[0]=a=>t("close"))},"✕")]),s[3]||(s[3]=mr('<div class="sp-grid" data-v-4c3ba46f><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>全局</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Ctrl+K</kbd> <kbd data-v-4c3ba46f>/</kbd> <span data-v-4c3ba46f>搜索 entity/lifeline</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>?</kbd> <span data-v-4c3ba46f>显示/隐藏此面板</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>滚轮</kbd> <span data-v-4c3ba46f>缩放</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>拖拽</kbd> <span data-v-4c3ba46f>旋转</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>global_overview</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>左键点击 R1</kbd> <span data-v-4c3ba46f>进入 lifeline 区域</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>region_zoom</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>返回全局视图</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>左键点击 R2/R3</kbd> <span data-v-4c3ba46f>聚焦 entity</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>右键 R1/R2</kbd> <span data-v-4c3ba46f>新建 entity / 编辑名称</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>node_focus</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>返回 lifeline 区域</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>R</kbd> <span data-v-4c3ba46f>查看关联（relation_reveal）</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>右键 entity</kbd> <span data-v-4c3ba46f>编辑/移动/删除/关联/路径查找</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>双击标题</kbd> <span data-v-4c3ba46f>内联编辑标题</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>relation_reveal</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>返回 node_focus</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>R</kbd> <span data-v-4c3ba46f>退出关联视图</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>点击关联线</kbd> <span data-v-4c3ba46f>查看证据</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>筛选条</kbd> <span data-v-4c3ba46f>按类型/信心度过滤</span></div></div><div class="sp-section" data-v-4c3ba46f><div class="sp-section-title" data-v-4c3ba46f>路径查找</div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>右键 → 查找路径</kbd> <span data-v-4c3ba46f>进入路径选择模式</span></div><div class="sp-row" data-v-4c3ba46f><kbd data-v-4c3ba46f>Esc</kbd> <span data-v-4c3ba46f>退出路径模式</span></div></div></div>',1))])]))}}),ET=In(wT,[["__scopeId","data-v-4c3ba46f"]]),TT={class:"qcd-dialog"},AT={class:"qcd-header"},CT={class:"qcd-field"},RT={key:0,class:"qcd-field"},IT={key:1,class:"qcd-field"},PT={key:2,class:"qcd-field"},LT={key:3,class:"qcd-field"},DT={class:"qcd-field"},UT=["value"],NT={class:"qcd-actions"},FT=["disabled"],OT=Pn({__name:"QuickCreateDialog",props:{defaultLifelineId:{}},emits:["close"],setup(r,{emit:e}){const t=r,n=e,i=as(),s=Ne("task"),a=Ne(""),o=Ne(""),l=Ne(""),c=Ne("fact"),u=Ne(t.defaultLifelineId||""),h=Ne(!1),d=Dt(()=>s.value==="task"?a.value.trim():s.value==="memory"?o.value.trim():s.value==="decision"?a.value.trim():s.value==="item"?o.value.trim():!1),f=Dt(()=>{const g=[];if(!i.data)return g;const p=i.data.lifelines.filter(v=>v.parent_id==="ROOT");for(const v of p){g.push({id:v.id,name:v.name,depth:0});const x=i.data.lifelines.filter(y=>y.parent_id===v.id);for(const y of x)g.push({id:y.id,name:"  "+y.name,depth:1})}return g});async function m(){if(!(!d.value||h.value)){h.value=!0;try{let g,p=s.value;if(s.value==="task"){const{createTask:v}=await Et(async()=>{const{createTask:y}=await import("./index-CVZL5f_h.js").then(w=>w.e);return{createTask:y}},__vite__mapDeps([0,1,2]));g=(await v({title:a.value.trim()})).id}else if(s.value==="memory"){const{createMemory:v}=await Et(async()=>{const{createMemory:y}=await import("./index-CVZL5f_h.js").then(w=>w.e);return{createMemory:y}},__vite__mapDeps([0,1,2]));g=(await v({category:c.value,content:o.value.trim()})).id}else if(s.value==="decision"){const{createDecision:v}=await Et(async()=>{const{createDecision:y}=await import("./index-CVZL5f_h.js").then(w=>w.e);return{createDecision:y}},__vite__mapDeps([0,1,2]));g=(await v({title:a.value.trim(),decision:l.value.trim()})).id}else{const{addNote:v}=await Et(async()=>{const{addNote:y}=await import("./index-CVZL5f_h.js").then(w=>w.e);return{addNote:y}},__vite__mapDeps([0,1,2]));g=(await v(o.value.trim())).id,p="item"}u.value&&await i.mountEntity(p,g,u.value),await i.reload(),n("close")}finally{h.value=!1}}}function _(g){g.key==="Escape"&&n("close")}return Bi(()=>{document.addEventListener("keydown",_)}),rs(()=>{document.removeEventListener("keydown",_)}),(g,p)=>(W(),q("div",{class:"qcd-overlay",onClick:p[8]||(p[8]=fn(v=>n("close"),["self"]))},[R("div",TT,[R("div",AT,[p[9]||(p[9]=R("span",{class:"qcd-title"},"快速创建",-1)),R("button",{class:"qcd-close",onClick:p[0]||(p[0]=v=>n("close"))},"✕")]),R("div",CT,[p[11]||(p[11]=R("label",{class:"qcd-label"},"类型",-1)),wt(R("select",{"onUpdate:modelValue":p[1]||(p[1]=v=>s.value=v),class:"qcd-select"},[...p[10]||(p[10]=[R("option",{value:"task"},"任务",-1),R("option",{value:"memory"},"记忆",-1),R("option",{value:"decision"},"决策",-1),R("option",{value:"item"},"条目",-1)])],512),[[xi,s.value]])]),s.value==="task"||s.value==="decision"?(W(),q("div",RT,[p[12]||(p[12]=R("label",{class:"qcd-label"},"标题",-1)),wt(R("input",{"onUpdate:modelValue":p[2]||(p[2]=v=>a.value=v),class:"qcd-input",placeholder:"输入标题…"},null,512),[[Gt,a.value]])])):ke("",!0),s.value==="memory"||s.value==="item"?(W(),q("div",IT,[p[13]||(p[13]=R("label",{class:"qcd-label"},"内容",-1)),wt(R("input",{"onUpdate:modelValue":p[3]||(p[3]=v=>o.value=v),class:"qcd-input",placeholder:"输入内容…"},null,512),[[Gt,o.value]])])):ke("",!0),s.value==="decision"?(W(),q("div",PT,[p[14]||(p[14]=R("label",{class:"qcd-label"},"决策",-1)),wt(R("input",{"onUpdate:modelValue":p[4]||(p[4]=v=>l.value=v),class:"qcd-input",placeholder:"决策描述（选填）"},null,512),[[Gt,l.value]])])):ke("",!0),s.value==="memory"?(W(),q("div",LT,[p[16]||(p[16]=R("label",{class:"qcd-label"},"分类",-1)),wt(R("select",{"onUpdate:modelValue":p[5]||(p[5]=v=>c.value=v),class:"qcd-select"},[...p[15]||(p[15]=[mr('<option value="fact" data-v-22486ab5>事实</option><option value="preference" data-v-22486ab5>偏好</option><option value="goal" data-v-22486ab5>目标</option><option value="relationship" data-v-22486ab5>关系</option><option value="event" data-v-22486ab5>事件</option>',5)])],512),[[xi,c.value]])])):ke("",!0),R("div",DT,[p[18]||(p[18]=R("label",{class:"qcd-label"},"归类",-1)),wt(R("select",{"onUpdate:modelValue":p[6]||(p[6]=v=>u.value=v),class:"qcd-select"},[p[17]||(p[17]=R("option",{value:""},"不挂载",-1)),(W(!0),q(Qe,null,Ht(f.value,v=>(W(),q("option",{key:v.id,value:v.id},fe(v.name),9,UT))),128))],512),[[xi,u.value]])]),R("div",NT,[R("button",{class:"qcd-btn cancel",onClick:p[7]||(p[7]=v=>n("close"))},"取消"),R("button",{class:"qcd-btn submit",disabled:!d.value||h.value,onClick:m},fe(h.value?"创建中…":"创建"),9,FT)])])]))}}),kT=In(OT,[["__scopeId","data-v-22486ab5"]]),BT={class:"pending-panel"},zT={class:"pending-header"},VT={class:"pending-count"},GT={key:0,class:"pending-empty"},HT={class:"pending-list"},WT={class:"pending-assoc-info"},XT={class:"pending-rel"},$T={class:"pending-conf"},qT={class:"pending-entity from"},YT={class:"pending-kind"},ZT=["onClick"],KT={class:"pending-entity to"},JT={class:"pending-kind"},jT=["onClick"],QT=["onClick"],eA={class:"ev-toggle-icon"},tA={key:1,class:"no-evidence"},nA={key:2,class:"evidence-list"},iA={class:"ev-header"},sA={class:"ev-type"},rA={class:"ev-weight"},aA={class:"ev-weight-track"},oA=["title"],lA={class:"pending-actions"},cA=["onClick"],uA=["onClick"],dA=Pn({__name:"PendingReviewPanel",emits:["close","focus-entity"],setup(r,{emit:e}){const t=as(),n=Ne(new Set);function i(f){n.value.has(f)?n.value.delete(f):n.value.add(f),n.value=new Set(n.value)}function s(f){return{semantic:"语义",keyword:"关键词",co_occurrence:"共现",temporal:"时序",causal:"因果",manual:"手动"}[f]||f}const a=e,o=Dt(()=>t.data?t.data.associations.filter(f=>f.status==="pending").map(f=>{const m=t.data?.entities.find(g=>g.id===f.from),_=t.data?.entities.find(g=>g.id===f.to);return{assoc:f,fromTitle:m?.title||f.from,toTitle:_?.title||f.to}}):[]);function l(f){return{co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[f]||f}function c(f){const m=f.split(":")[0];return m==="task"?"T":m==="memory"?"M":m==="decision"?"D":m==="item"?"I":"?"}async function u(f){await t.reviewAssociation(f,"accepted")}async function h(f){await t.reviewAssociation(f,"rejected")}function d(f){a("focus-entity",f),a("close")}return(f,m)=>(W(),q("div",BT,[R("div",zT,[m[1]||(m[1]=R("span",{class:"pending-title"},"待确认关联",-1)),R("span",VT,"共 "+fe(o.value.length)+" 条",1),R("button",{class:"pending-close",onClick:m[0]||(m[0]=_=>a("close"))},"✕")]),o.value.length===0?(W(),q("div",GT,"无待确认关联")):ke("",!0),R("div",HT,[(W(!0),q(Qe,null,Ht(o.value,_=>(W(),q("div",{key:_.assoc.id,class:"pending-item"},[R("div",WT,[R("span",XT,fe(l(_.assoc.relation_type)),1),R("span",$T,fe(Math.round(_.assoc.confidence*100))+"%",1)]),R("div",qT,[R("span",YT,fe(c(_.assoc.from)),1),R("span",{class:"pending-entity-title",onClick:g=>d(_.assoc.from)},fe(_.fromTitle.slice(0,30)),9,ZT)]),m[2]||(m[2]=R("div",{class:"pending-arrow"},"→",-1)),R("div",KT,[R("span",JT,fe(c(_.assoc.to)),1),R("span",{class:"pending-entity-title",onClick:g=>d(_.assoc.to)},fe(_.toTitle.slice(0,30)),9,jT)]),_.assoc.evidence&&_.assoc.evidence.length>0?(W(),q("div",{key:0,class:"evidence-toggle",onClick:g=>i(_.assoc.id)},[R("span",eA,fe(n.value.has(_.assoc.id)?"▾":"▸"),1),R("span",null,fe(_.assoc.evidence.length)+" 条证据",1)],8,QT)):(W(),q("div",tA,"无证据")),n.value.has(_.assoc.id)&&_.assoc.evidence?(W(),q("div",nA,[(W(!0),q(Qe,null,Ht(_.assoc.evidence||[],(g,p)=>(W(),q("div",{key:p,class:"ev-item"},[R("div",iA,[R("span",sA,fe(s(g.type)),1),R("span",rA,fe(Math.round(g.weight*100))+"%",1)]),R("div",aA,[R("div",{class:"ev-weight-fill",style:ws({width:g.weight*100+"%"})},null,4)]),R("div",{class:"ev-excerpt",title:g.excerpt},fe(g.excerpt.slice(0,100))+fe(g.excerpt.length>100?"…":""),9,oA)]))),128))])):ke("",!0),R("div",lA,[R("button",{class:"pending-btn accept",onClick:g=>u(_.assoc.id)},"✓",8,cA),R("button",{class:"pending-btn reject",onClick:g=>h(_.assoc.id)},"✗",8,uA)])]))),128))])]))}}),hA=In(dA,[["__scopeId","data-v-85412e96"]]),fA={class:"cosmos-view"},pA={class:"cosmos-hud"},mA=["disabled"],gA=["disabled"],_A={key:0,class:"overlay-state"},vA={key:1,class:"overlay-state"},xA={key:2,class:"overlay-state"},yA={key:0,class:"tooltip"},bA={class:"create-actions"},MA=["disabled"],SA={key:5,class:"select-hint"},wA={key:6,class:"select-hint"},EA={key:11,class:"copy-toast"},TA={key:12,class:"minimap-wrapper"},AA={key:13,class:"assoc-filter-bar"},CA={class:"filter-chips"},RA=["onClick"],IA={class:"filter-slider"},PA={class:"filter-label"},LA={class:"filter-count"},DA={key:0,class:"filter-empty"},UA=1.5,NA=Pn({__name:"CosmosView",setup(r){const e=as(),t=Ne(null);let n=null,i=null,s=0,a=[],o="";const l=Ne(!1),c=Ne(!1),u=Ne(!1);let h;const d=Ne(!1),f=Ne(),m=Ne(!1),_=Dt(()=>e.data?e.data.associations.filter(L=>L.status==="pending").length:0);function g(L){f.value=L,d.value=!0}const p=Ne(null),v=Ne(null);function x(L,O,G,te){return new Promise(me=>{v.value={title:L,message:O,confirmLabel:G,danger:te,resolve:me}})}const y=Ne(null),w=Ne(!0),M=Ne(!1);let A,b=null,E=null;const P=bf({types:["co_occurrence","causal","tension","derived_from","manual"],minConfidence:0,status:"all"});function D(){for(const L of a){const O=P.types.includes(L.data.relation_type),G=L.data.confidence>=P.minConfidence,te=P.status==="all"||L.data.status===P.status,me=O&&G&&te;L.line.visible=me,L.arrow&&(L.arrow.visible=me)}}function V(L){P.types.includes(L)?P.types.length>1&&(P.types=P.types.filter(O=>O!==L)):P.types=[...P.types,L],D()}const J=Dt(()=>a.filter(L=>L.line.visible).length),K=Ne(null),B=Ne(null),H=Ne(0);function Y(L,O){if(!e.data)return[];const G=new Map;for(const $e of e.data.associations)$e.status!=="rejected"&&(G.has($e.from)||G.set($e.from,[]),G.has($e.to)||G.set($e.to,[]),G.get($e.from).push({to:$e.to,assocId:$e.id,type:$e.relation_type,confidence:$e.confidence}),G.get($e.to).push({to:$e.from,assocId:$e.id,type:$e.relation_type,confidence:$e.confidence}));const te=new Set,me=[{id:L,path:[{entityId:L,entityTitle:"",assocId:null,assocType:null,assocConfidence:null}]}];te.add(L);const we=[];let it=-1;const tt=5;for(;me.length>0;){const{id:$e,path:mt}=me.shift();if(it>-1&&mt.length>it)break;if($e===O){mt.forEach(ut=>{ut.entityTitle||(ut.entityTitle=e.data?.entities.find(gt=>gt.id===ut.entityId)?.title||ut.entityId)}),we.push(mt),it=mt.length;continue}if(!(mt.length>=tt)){for(const ut of G.get($e)||[])if(!te.has(ut.to)||it>-1&&mt.length<it){te.add(ut.to);const gt=e.data?.entities.find(qt=>qt.id===ut.to);me.push({id:ut.to,path:[...mt,{entityId:ut.to,entityTitle:gt?.title||ut.to,assocId:ut.assocId,assocType:ut.type,assocConfidence:ut.confidence}]})}}}return we}function pe(L){K.value={id:L.id,title:L.title}}function _e(L){if(!K.value)return;if(L===K.value.id){Re();return}const O=Y(K.value.id,L);B.value=O.length>0?O:[],H.value=0,K.value=null,O.length>0&&n&&ye(O[0])}function ye(L){if(!n||!e.data)return;yf(n.nodes,a),Eu(n.scene);const O=L.map(we=>we.entityId),G=new Set(L.filter(we=>we.assocId).map(we=>we.assocId)),te={startId:O[0],endId:O[O.length-1],pathEntityIds:new Set(O),pathAssocIds:G,color:xf[H.value%xf.length],isCurrent:!0},me=a.filter(we=>G.has(we.data.id));US(n.nodes,me.length>0?me:a,[te],n.scene),FS(O,n.nodes,n.scene)}function Re(){K.value=null,B.value=null,H.value=0,n&&(yf(n.nodes,a),Eu(n.scene))}function le(){B.value&&(H.value=Math.max(0,H.value-1),ye(B.value[H.value]))}function Ee(){B.value&&(H.value=Math.min(B.value.length-1,H.value+1),ye(B.value[H.value]))}function Be(L){const O=L.split(":");e.transition({kind:"node_focus",entity_kind:O[0],entity_id:L})}function Le(){u.value=!0,h&&clearTimeout(h),h=window.setTimeout(()=>{u.value=!1},1500)}function re(L){navigator.clipboard.writeText(L.title).then(()=>Le())}async function Ae(L,O){window.confirm(`确定删除 lifeline「${O}」？挂载的 entity 将被卸载。`)&&(await e.deleteLifeline(L),e.transition({kind:"global_overview"}))}function xe(){Le()}function Xe(){Le()}function ne(){lt()}function N(L){if(!e.data)return;const O=e.data.entities.find(G=>G.id===L);O&&e.transition({kind:"node_focus",entity_kind:O.kind,entity_id:L})}let U=null,k=null,Q=null;async function Z(){if(!e.data||!t.value)return;const L=await Et(()=>Promise.resolve().then(()=>_S),void 0),O=(await Et(async()=>{const{OrbitControls:$e}=await import("./OrbitControls-D5JS8Arn.js");return{OrbitControls:$e}},__vite__mapDeps([3,0,1,2]))).OrbitControls,{CSS2DRenderer:G}=await Et(async()=>{const{CSS2DRenderer:$e}=await Promise.resolve().then(()=>gf);return{CSS2DRenderer:$e}},void 0);n=await ES(t.value,e.data),i=new O(n.camera,n.renderer.domElement),i.enableDamping=!0,i.dampingFactor=.08,i.enableZoom=!0,i.zoomSpeed=.6,i.enablePan=!1,i.minDistance=.5,i.maxDistance=9,U=new G,U.setSize(window.innerWidth,window.innerHeight),U.domElement.style.position="absolute",U.domElement.style.top="0",U.domElement.style.pointerEvents="none",document.querySelector(".cosmos-view")?.appendChild(U.domElement);const{createLabelGroup:te}=await Et(async()=>{const{createLabelGroup:$e}=await import("./labels-CLoSxnbF.js");return{createLabelGroup:$e}},__vite__mapDeps([4,0,1,2]));k=te(),k.create(n.scene,n.layoutNodes);const me=new Map;for(const $e of e.data.entities)me.set($e.lifeline_id,(me.get($e.lifeline_id)||0)+1);for(const $e of n.layoutNodes){if($e.layer!==1&&$e.layer!==2)continue;const mt=document.createElement("div"),ut=me.get($e.id)||0;mt.textContent=String(ut),mt.style.cssText="font-size:9px;color:var(--text-4);font-family:var(--font-mono);text-align:center;";const{CSS2DObject:gt}=await Et(async()=>{const{CSS2DObject:Dn}=await Promise.resolve().then(()=>gf);return{CSS2DObject:Dn}},void 0),qt=new gt(mt);qt.position.copy($e.position.clone().add(new I(0,-.07,0))),n.scene.add(qt)}Q=n.setResolution,window.addEventListener("resize",he);const we=new L.Raycaster,it=new L.Vector2;t.value.addEventListener("click",$e=>{if(!n)return;if(it.x=$e.offsetX/t.value.clientWidth*2-1,it.y=-($e.offsetY/t.value.clientHeight)*2+1,we.setFromCamera(it,n.camera),K.value){const Yt=we.intersectObjects(n.pickables);if(Yt.length>0){const Zt=Yt[0].object;if(Zt.userData.layer===3){_e(Zt.userData.id);return}}Re();return}if(e.selectingTarget){const Yt=we.intersectObjects(n.pickables);if(Yt.length>0){const Zt=Yt[0].object;if(Zt.userData.layer===3&&Zt.userData.id!==e.selectingTarget.fromId){const Yn=e.data?.entities.find(oi=>oi.id===Zt.userData.id)?.title||"";e.openEditAssoc({id:"",from:e.selectingTarget.fromId,fromTitle:e.selectingTarget.fromTitle,to:Zt.userData.id,toTitle:Yn,relation_type:"manual",confidence:.7,status:"accepted",evidence:[]}),e.cancelSelecting();return}}e.cancelSelecting();return}if(e.state.kind==="relation_reveal"&&a.length>0){const Yt=we.intersectObjects(a.map(Zt=>Zt.line));if(Yt.length>0){const Zt=Yt[0].object,Yn=a.find(oi=>oi.line===Zt);if(Yn){e.selectedAssocId===Yn.data.id?e.selectAssociation(null):e.selectAssociation(Yn.data.id);return}}}const mt=we.intersectObjects(n.pickables);if(mt.length===0){if(e.selectAssociation(null),e.state.kind==="node_focus"||e.state.kind==="relation_reveal"){const Yt=e.state.entity_id,Yn=e.data?.entities.find(oi=>oi.id===Yt)?.lifeline_id;Yn?e.transition({kind:"region_zoom",lifeline_id:Yn}):e.transition({kind:"global_overview"})}else e.state.kind==="region_zoom"&&e.transition({kind:"global_overview"});return}e.selectAssociation(null);const ut=mt[0].object,gt=ut.userData.layer,qt=ut.userData.id,Dn=ut.userData.kind,ln=e.state;ln.kind==="global_overview"&&gt===1?e.transition({kind:"region_zoom",lifeline_id:qt}):ln.kind==="region_zoom"&&(gt===2||gt===3)?e.transition({kind:"node_focus",entity_kind:Dn||"lifeline",entity_id:qt}):ln.kind==="node_focus"?e.transition({kind:"node_focus",entity_kind:Dn||"lifeline",entity_id:qt}):ln.kind==="relation_reveal"&&(vt(),e.transition({kind:"node_focus",entity_kind:Dn||"lifeline",entity_id:qt}))}),t.value.addEventListener("mousemove",$e=>{if(!n)return;it.x=$e.offsetX/t.value.clientWidth*2-1,it.y=-($e.offsetY/t.value.clientHeight)*2+1,we.setFromCamera(it,n.camera);const mt=we.intersectObjects(n.pickables);if(mt.length>0){const gt=mt[0].object;gt!==b&&(F(),b=gt,qe(gt)),t.value.style.cursor=e.selectingTarget?"crosshair":"pointer"}else F(),t.value.style.cursor=e.selectingTarget?"crosshair":"";if(e.state.kind!=="relation_reveal")return;const ut=we.intersectObjects(n.lines.concat(a.map(gt=>gt.line)));if(ut.length>0&&a.some(gt=>gt.line===ut[0].object)){const gt=a.find(qt=>qt.line===ut[0].object);gt&&(o=gt.data.evidence?.[0]?.excerpt||"",gt.line!==E&&(ze(),E=gt.line,nt(gt)))}else o="",ze()}),t.value.addEventListener("contextmenu",$e=>{if($e.preventDefault(),!n||!e.data)return;it.x=$e.offsetX/t.value.clientWidth*2-1,it.y=-($e.offsetY/t.value.clientHeight)*2+1,we.setFromCamera(it,n.camera);const mt=we.intersectObjects(n.pickables);if(mt.length===0){const Yt=e.state.kind;(Yt==="global_overview"||Yt==="region_zoom")&&g(),p.value=null;return}if(e.state.kind==="global_overview"){p.value=null;return}const ut=mt[0].object,gt=ut.userData.id,qt=ut.userData.kind,Dn=ut.userData.layer;if(Dn<1||Dn>3){p.value=null;return}let ln="";Dn<=2?ln=e.data.lifelines.find(Zt=>Zt.id===gt)?.name||gt:ln=e.data.entities.find(Zt=>Zt.id===gt)?.title||gt,p.value={x:$e.clientX,y:$e.clientY,target:{id:gt,kind:qt,title:ln,layer:Dn}}}),window.addEventListener("keydown",at),document.querySelector(".cosmos-hud")?.addEventListener("mouseenter",()=>{w.value=!0,A&&clearTimeout(A)}),A=window.setTimeout(()=>{w.value=!1,M.value=!0},3e3),z()}function se(L){e.transition({kind:"region_zoom",lifeline_id:L})}function ce(L){if(!e.data)return;const O=e.data.entities.find(G=>G.id===L);O&&e.transition({kind:"node_focus",entity_kind:O.kind,entity_id:L})}function he(){if(!U||!Q)return;const L=window.innerWidth,O=window.innerHeight;U.setSize(L,O),Q(L,O)}function qe(L){L.scale.setScalar(UA);const O=L.material;O._origColor=O._origColor??O.color.getHex(),O.color.set(jn("--accent")),O.needsUpdate=!0}function F(){if(!b)return;b.scale.setScalar(1);const L=b.material;L._origColor!==void 0&&(L.color.setHex(L._origColor),delete L._origColor,L.needsUpdate=!0),b=null}function nt(L){const O=L.line.material;O._origLinewidth=O._origLinewidth??O.linewidth,O._origColor=O._origColor??O.color.getHex(),O.linewidth=O._origLinewidth*1.3,O.color.set(jn("--accent")),O.needsUpdate=!0,a.forEach(G=>{if(G.line!==L.line){const te=G.line.material;te.transparent=!0,te._origOpacity=te._origOpacity??te.opacity,te.opacity=(te._origOpacity||.8)*.3,te.needsUpdate=!0}})}function ze(){if(!E)return;const L=E.material;L._origLinewidth!==void 0&&(L.linewidth=L._origLinewidth,delete L._origLinewidth),L._origColor!==void 0&&(L.color.setHex(L._origColor),delete L._origColor),L.needsUpdate=!0,a.forEach(O=>{const G=O.line.material;G._origOpacity!==void 0&&(G.opacity=G._origOpacity,delete G._origOpacity,G.needsUpdate=!0)}),E=null}function et(L){if(l.value=!1,!!n)if(L.kind==="lifeline")if(L.layer===1)e.transition({kind:"region_zoom",lifeline_id:L.id});else{let O=e.data?.lifelines.find(G=>G.id===L.id)?.parent_id;for(;O&&O!=="ROOT";){const G=e.data?.lifelines.find(te=>te.id===O);if(G&&G.parent_id==="ROOT")break;O=G?.parent_id}O&&O!=="ROOT"&&e.transition({kind:"region_zoom",lifeline_id:O})}else e.transition({kind:"node_focus",entity_kind:L.kind,entity_id:L.id})}function ve(L){L.layer===3&&y.value?.startEditTitle()}async function St(L){if(!await x(`确定删除「${L.title.slice(0,30)}」？`,"此操作不可撤销。","删除",!0))return;const G=L.id.split(":"),te=G[0],me=parseInt(G.slice(1).join(":"),10);try{await e.deleteEntityById(te,me)}catch{await e.reload()}const we=e.state;if((we.kind==="node_focus"||we.kind==="relation_reveal")&&we.entity_id===L.id){const tt=e.data?.entities.find($e=>$e.id===L.id)?.lifeline_id;tt?e.transition({kind:"region_zoom",lifeline_id:tt}):e.transition({kind:"global_overview"})}}async function C(L,O){const G=L.split(":"),te=G[0],me=parseInt(G.slice(1).join(":"),10);try{await e.mountEntity(te,me,O)}catch{await e.reload()}}const S=Ne(null),$=Ne(""),oe=Ne(null);function ge(L){S.value={id:L.id,name:L.title},$.value=L.title,iu(()=>oe.value?.focus())}async function be(){if(!S.value)return;const L=$.value.trim();if(!L||L===S.value.name){S.value=null;return}try{await e.updateLifeline(S.value.id,{name:L}),S.value=null}catch{await e.reload(),S.value=null}}function Te(L){L.key==="Enter"?(L.stopPropagation(),be()):L.key==="Escape"&&(L.stopPropagation(),S.value=null)}function ae(L){e.startSelectingTarget(L.id,L.title)}async function ue(L){await e.createAssoc(L),e.closeEditAssoc()}async function De(L){await e.updateAssoc(L.association_id,{relation_type:L.relation_type,confidence:L.confidence,evidence:L.evidence}),e.closeEditAssoc()}async function Ve(L){e.closeEditAssoc(),await e.deleteAssoc(L)}async function Ce(L){if(!e.data)return;const O=e.state;if(O.kind!=="node_focus"&&O.kind!=="relation_reveal")return;const G=O.entity_id;if(!e.data.entities.find(tt=>tt.id===G))return;const me=e.data.associations.find(tt=>tt.id===L.id);if(!me)return;const we=e.data.entities.find(tt=>tt.id===me.from),it=e.data.entities.find(tt=>tt.id===me.to);e.openEditAssoc({id:me.id,from:me.from,fromTitle:we?.title||me.from,to:me.to,toTitle:it?.title||me.to,relation_type:me.relation_type,confidence:me.confidence,status:me.status,evidence:me.evidence||[]})}async function Me(L){await x("删除关联","确定删除这条关联？此操作不可撤销。","确认删除",!0)&&await e.deleteAssoc(L)}function at(L){if((L.ctrlKey||L.metaKey)&&L.key==="k"){L.preventDefault(),L.stopPropagation(),l.value=!l.value;return}if((L.ctrlKey||L.metaKey)&&L.key==="n"){L.preventDefault();let G;const te=e.state.kind;if(te==="region_zoom")G=e.state.lifeline_id;else if(te==="node_focus"||te==="relation_reveal"){const me=e.state.entity_id;G=e.data?.entities.find(we=>we.id===me)?.lifeline_id}g(G);return}if(L.key==="/"&&!l.value){const G=L.target;if(G.tagName==="INPUT"||G.tagName==="TEXTAREA")return;L.preventDefault(),l.value=!0;return}if(L.key==="?"){const G=L.target;if(G.tagName==="INPUT"||G.tagName==="TEXTAREA")return;L.preventDefault(),c.value=!c.value;return}if(L.altKey&&L.key==="ArrowLeft"){L.preventDefault(),e.navigateBack();return}if(L.altKey&&L.key==="ArrowRight"){L.preventDefault(),e.navigateForward();return}const O=e.state;if(L.key==="Escape"){if(e.selectingTarget){e.cancelSelecting();return}if(K.value||B.value){Re();return}if(l.value){l.value=!1;return}O.kind==="relation_reveal"?(vt(),e.transition({kind:"node_focus",entity_kind:O.entity_kind,entity_id:O.entity_id})):O.kind==="node_focus"?e.transition({kind:O.lifeline_id?"region_zoom":"global_overview",lifeline_id:O.lifeline_id}):O.kind==="region_zoom"&&e.transition({kind:"global_overview"})}(L.key==="r"||L.key==="R")&&(O.kind==="node_focus"?lt():O.kind==="relation_reveal"&&vt())}function lt(){if(!e.data||!n)return;const L=e.state;if(L.kind!=="node_focus")return;const O=L.entity_id;e.transition({kind:"relation_reveal",entity_kind:L.entity_kind,entity_id:O}),a=RS(n.scene,e.data,n.layoutNodes,O,new de(t.value.clientWidth,t.value.clientHeight));const G=new Set([O]);a.forEach(te=>{G.add(te.fromNode.id),G.add(te.toNode.id)}),IS(n.nodes,G),D()}function vt(){n&&(ze(),a.forEach(L=>{if(n.scene.remove(L.line),L.line.geometry?.dispose(),L.line.material){const O=L.line.material;Array.isArray(O)?O.forEach(G=>G.dispose()):O.dispose()}L.arrow&&(n.scene.remove(L.arrow),L.arrow.geometry?.dispose(),L.arrow.material instanceof sn&&L.arrow.material.dispose())}),a=[],vf(n.nodes))}function z(){if(!n)return;s=requestAnimationFrame(z),i?.update(),kS(.016,n.camera,i);const L=n.camera.position.length(),O=L>3.5?1:L>=2?2:3,G=e.state.kind==="node_focus"||e.state.kind==="relation_reveal";n.nodes.forEach(te=>{const me=te.userData.layer;te.visible=G||me<=O}),n.lines.forEach(te=>{const me=te.userData?.fromLayer??3,we=te.userData?.toLayer??3;te.visible=G||Math.max(me,we)<=O}),PS(n.nodes,.016),k&&k.syncPositions(n.nodes),n.renderer.render(n.scene,n.camera),k&&U&&(k.update(e.state,n.camera,e.data?.associations),U.render(n.scene,n.camera))}async function Se(){if(!n)return;const L=e.state,O=n.layoutNodes;if(L.kind==="global_overview"){tu(n.scene);for(const G of n.nodes)G.userData.targetPosition=G.userData.homePosition.clone();vf(n.nodes),Eo(n.camera,i,new I(0,2.5,5.5),new I(0,0,0),60,800)}else if(L.kind==="region_zoom"){tu(n.scene);for(const we of n.nodes)we.userData.targetPosition=we.userData.homePosition.clone();const G=L.lifeline_id;let me=O.find(we=>we.id===G&&we.layer===1);if(!me){const we=O.find(it=>it.id===G);if(we){let it=we.parentId;for(;it;){const tt=O.find($e=>$e.id===it);if(tt&&tt.layer===1){me=tt;break}it=tt?.parentId}}}if(me){const we=me.position.clone().normalize(),it=Ui.R1+1.8;Eo(n.camera,i,we.clone().multiplyScalar(it),me.position,50,800);const tt=me.id,$e=new Set,mt=[tt];for(;mt.length>0;){const ut=mt.shift();$e.add(ut),O.filter(gt=>gt.parentId===ut).forEach(gt=>mt.push(gt.id))}vm(n.nodes,$e)}}else if(L.kind==="node_focus"||L.kind==="relation_reveal"){const G=L.entity_id,te=O.find(ut=>ut.id===G);if(!te)return;tu(n.scene),DS(n.scene,te.position,jn("--accent"));const me=te.position.clone().normalize(),we=te.position.length()+.6,it=me.clone().multiplyScalar(we);Eo(n.camera,i,it,te.position,L.kind==="node_focus"?35:55,800);const{computeFocusLayout:tt}=await Et(async()=>{const{computeFocusLayout:ut}=await Promise.resolve().then(()=>SS);return{computeFocusLayout:ut}},void 0),{targets:$e,constellationIds:mt}=tt(O,G,e.data?.associations||[],me);for(const ut of n.nodes){const gt=ut.userData.id,qt=$e.get(gt);ut.userData.targetPosition=qt?qt.clone():ut.userData.homePosition.clone()}LS(n.nodes,mt)}}return Ro(()=>e.state,Se,{deep:!0}),Ro(()=>e.state.kind,()=>{w.value=!0,M.value=!1,A&&clearTimeout(A),A=window.setTimeout(()=>{w.value=!1,M.value=!0},3e3)}),Bi(async()=>{await e.load(),e.data&&await Z()}),rs(()=>{cancelAnimationFrame(s),n?.dispose(),i?.dispose(),window.removeEventListener("keydown",at),window.removeEventListener("resize",he),k&&(k.dispose(),k=null),U?.domElement&&U.domElement.remove(),A&&clearTimeout(A)}),(L,O)=>(W(),q("div",fA,[R("div",pA,[Ra(WS,{state:Ke(e).state,onNav:O[0]||(O[0]=G=>Ke(e).transition(G))},null,8,["state"]),Ke(e).state.kind!=="global_overview"?(W(),q("button",{key:0,class:"home-btn",onClick:O[1]||(O[1]=G=>Ke(e).transition({kind:"global_overview"})),title:"回到全局"},"⌂")):ke("",!0),R("button",{class:"nav-btn",disabled:!Ke(e).canGoBack,onClick:O[2]||(O[2]=G=>Ke(e).navigateBack()),title:"后退 (Alt+←)"},"←",8,mA),R("button",{class:"nav-btn",disabled:!Ke(e).canGoForward,onClick:O[3]||(O[3]=G=>Ke(e).navigateForward()),title:"前进 (Alt+→)"},"→",8,gA),_.value>0?(W(),q("button",{key:1,class:"pending-trigger",onClick:O[4]||(O[4]=G=>m.value=!m.value)}," 待确认 "+fe(_.value),1)):ke("",!0),l.value?(W(),Ei(SE,{key:2,onSelect:et,onClose:O[5]||(O[5]=G=>l.value=!1)})):ke("",!0),l.value?ke("",!0):(W(),Ei(O1,{key:3,onFocusLifeline:se,onFocusEntity:ce})),l.value?ke("",!0):(W(),q("button",{key:4,class:"search-trigger",onClick:O[6]||(O[6]=G=>l.value=!0)},"搜索 ⌘K"))]),Ke(e).loading?(W(),q("div",_A,[...O[23]||(O[23]=[R("div",{class:"loader-ring"},null,-1),R("div",{class:"state-text"},"加载 Atlas…",-1)])])):Ke(e).error?(W(),q("div",vA,[O[24]||(O[24]=R("div",{class:"state-text"},"Cosmos 数据加载失败",-1)),O[25]||(O[25]=R("div",{class:"state-sub"},"API 和 mock 均不可用",-1)),R("button",{class:"retry-btn",onClick:O[7]||(O[7]=G=>Ke(e).reload())},"重试")])):Ke(e).data&&Ke(e).data.lifelines.length===0?(W(),q("div",xA,[...O[26]||(O[26]=[R("div",{class:"state-text"},"暂无 lifeline",-1),R("div",{class:"state-sub"},"在左侧面板中创建第一条 lifeline 来开始构建知识星球",-1)])])):ke("",!0),!Ke(e).loading&&!Ke(e).error&&Ke(e).data&&Ke(e).data.lifelines.length>0?(W(),q(Qe,{key:3},[R("canvas",{ref_key:"canvasRef",ref:t,class:"cosmos-canvas"},null,512),Ra(cE,{ref_key:"nodeDetailRef",ref:y,onEditAssoc:Ce,onDeleteAssoc:Me,onCopied:Xe,onEnterRelation:ne,onNavigateEntity:N},null,512),Ke(o)&&Ke(e).state.kind==="relation_reveal"?(W(),q("div",yA,fe(Ke(o)),1)):ke("",!0),w.value?(W(),q("div",{key:1,class:$t(["shortcuts-hint",{fade:M.value}])},[Ke(e).state.kind==="global_overview"?(W(),q(Qe,{key:0},[Cn("点击 R1 进入 lifeline   滚轮缩放   拖拽旋转   Ctrl+K 搜索")],64)):Ke(e).state.kind==="region_zoom"?(W(),q(Qe,{key:1},[Cn("点击 R2/R3 聚焦 entity   滚轮缩放   Esc 返回全局   Ctrl+K 搜索")],64)):Ke(e).state.kind==="node_focus"?(W(),q(Qe,{key:2},[Cn("R 查看关联   Esc 返回 lifeline   拖拽旋转")],64)):Ke(e).state.kind==="relation_reveal"?(W(),q(Qe,{key:3},[Cn("Esc 返回焦点   点击关联线查看证据   底部筛选")],64)):ke("",!0)],2)):ke("",!0),p.value?(W(),Ei(RE,{key:2,target:p.value.target,x:p.value.x,y:p.value.y,onClose:O[8]||(O[8]=G=>p.value=null),onEditTitle:ve,onDeleteEntity:St,onMoveLifeline:C,onEditLifelineName:ge,onAssociateTo:ae,onFindPathTo:pe,onCopyTitle:re,onDeleteLifeline:Ae,onQuickCreate:g},null,8,["target","x","y"])):ke("",!0),v.value?(W(),Ei(UE,{key:3,title:v.value.title,message:v.value.message,"confirm-label":v.value.confirmLabel,danger:v.value.danger,onConfirm:O[9]||(O[9]=G=>{v.value.resolve(!0),v.value=null}),onCancel:O[10]||(O[10]=G=>{v.value.resolve(!1),v.value=null})},null,8,["title","message","confirm-label","danger"])):ke("",!0),S.value?(W(),q("div",{key:4,class:"create-overlay",onPointerdown:O[14]||(O[14]=G=>S.value=null)},[R("div",{class:"create-dialog",onPointerdown:O[13]||(O[13]=fn(()=>{},["stop"]))},[O[27]||(O[27]=R("div",{class:"create-title"},"编辑 lifeline 名称",-1)),wt(R("input",{ref_key:"lifelineEditEl",ref:oe,"onUpdate:modelValue":O[11]||(O[11]=G=>$.value=G),class:"create-input",onKeydown:Te},null,544),[[Gt,$.value]]),R("div",bA,[R("button",{class:"confirm-btn cancel-btn",onClick:O[12]||(O[12]=G=>S.value=null)},"取消"),R("button",{class:"confirm-btn primary-btn",disabled:!$.value.trim(),onClick:be},"保存",8,MA)])],32)],32)):ke("",!0)],64)):ke("",!0),Ke(e).editAssoc?(W(),Ei(tT,{key:4,"from-id":Ke(e).editAssoc.from,"from-title":Ke(e).editAssoc.fromTitle,"to-id":Ke(e).editAssoc.to,"to-title":Ke(e).editAssoc.toTitle,existing:Ke(e).editAssoc.id?{id:Ke(e).editAssoc.id,relation_type:Ke(e).editAssoc.relation_type,confidence:Ke(e).editAssoc.confidence,status:Ke(e).editAssoc.status,evidence:Ke(e).editAssoc.evidence}:void 0,onCancel:O[15]||(O[15]=G=>Ke(e).closeEditAssoc()),onCreate:ue,onUpdate:De,onDelete:Ve},null,8,["from-id","from-title","to-id","to-title","existing"])):ke("",!0),Ke(e).selectingTarget?(W(),q("div",SA," crosshair 点击目标 entity 来创建关联 (Esc 取消) ")):ke("",!0),K.value?(W(),q("div",wA," crosshair 点击目标 entity 查找最短路径 (Esc 取消) ")):ke("",!0),B.value?(W(),Ei(bT,{key:7,paths:B.value,"current-path-index":H.value,"from-title":B.value[H.value]?.[0]?.entityTitle||"","to-title":B.value[H.value]?.[B.value[H.value].length-1]?.entityTitle||"",onPrevPath:le,onNextPath:Ee,onClear:Re,onFocusEntity:Be,onCopied:xe},null,8,["paths","current-path-index","from-title","to-title"])):ke("",!0),c.value?(W(),Ei(ET,{key:8,onClose:O[16]||(O[16]=G=>c.value=!1)})):ke("",!0),d.value?(W(),Ei(kT,{key:9,"default-lifeline-id":f.value,onClose:O[17]||(O[17]=G=>d.value=!1)},null,8,["default-lifeline-id"])):ke("",!0),m.value?(W(),Ei(hA,{key:10,onClose:O[18]||(O[18]=G=>m.value=!1),onFocusEntity:O[19]||(O[19]=G=>{m.value=!1,ce(G)})})):ke("",!0),u.value?(W(),q("div",EA,"已复制到剪贴板")):ke("",!0),Ra(iT,{"show-assoc":Ke(e).state.kind==="relation_reveal"},null,8,["show-assoc"]),Ke(n)&&Ke(e).state.kind!=="node_focus"&&Ke(e).state.kind!=="relation_reveal"?(W(),q("div",TA,[Ra(rT,{"layout-nodes":Ke(n).layoutNodes,camera:Ke(n).camera,controls:Ke(i),"world-radius":Ke(Ui).R3,"focused-lifeline-id":Ke(e).state.kind==="region_zoom"?Ke(e).state.lifeline_id:null,onJump:O[20]||(O[20]=(G,te)=>Ke(Eo)(Ke(n).camera,Ke(i),G,te,60,800))},null,8,["layout-nodes","camera","controls","world-radius","focused-lifeline-id"])])):ke("",!0),Ke(e).state.kind==="relation_reveal"?(W(),q("div",AA,[R("div",CA,[(W(),q(Qe,null,Ht(["co_occurrence","causal","tension","derived_from","manual"],G=>R("button",{key:G,class:$t(["filter-chip",{active:P.types.includes(G)}]),onClick:te=>V(G)},fe({co_occurrence:"共现",causal:"因果",tension:"张力",derived_from:"衍生",manual:"人工"}[G]),11,RA)),64))]),R("div",IA,[R("span",PA,"信心度 ≥ "+fe(P.minConfidence.toFixed(2)),1),wt(R("input",{"onUpdate:modelValue":O[21]||(O[21]=G=>P.minConfidence=G),type:"range",min:"0",max:"1",step:"0.05",class:"filter-range",onInput:D},null,544),[[Gt,P.minConfidence,void 0,{number:!0}]])]),wt(R("select",{"onUpdate:modelValue":O[22]||(O[22]=G=>P.status=G),class:"filter-select",onChange:D},[...O[28]||(O[28]=[R("option",{value:"all"},"全部",-1),R("option",{value:"accepted"},"已确认",-1),R("option",{value:"pending"},"待定",-1)])],544),[[xi,P.status]]),R("span",LA,"显示 "+fe(J.value)+"/"+fe(Ke(a).length)+" 条关联",1),Ke(a).length>0&&J.value===0?(W(),q("span",DA,"当前筛选条件下无可见关联")):ke("",!0)])):ke("",!0)]))}}),FA=In(NA,[["__scopeId","data-v-4038477d"]]),BA=Object.freeze(Object.defineProperty({__proto__:null,default:FA},Symbol.toStringTag,{value:"Module"}));export{gm as C,Cm as M,Ki as P,pn as Q,Sr as R,j0 as S,Rm as T,de as V,vv as a,BA as b,_l as c,I as d};
