<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { ArrowUpRight, BookOpen, CircleHelp, FileText, Image, Lightbulb, LocateFixed, Map as MapIcon, Minus, Plus, RotateCw } from '@lucide/vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { materials, regions, relations } from './data';
import type { RegionId } from './model';
import { buildSpatialLayout } from './spatial-layout';
import { canInterpolateLabels, depthAppearance, findRearCrossings, followSpatialLabels, placeSpatialLabels, ribbonTriangles, separateFollowingLabels, spatialKinds, spatialNames, spatialRegionPatterns, spatialTones } from './spatial-visuals';
import type { LabelBox } from './spatial-visuals';

const props = defineProps<{ active: boolean }>();
const emit = defineEmits<{ select: [id: string]; region: [id: RegionId]; reading: [] }>();
const host = ref<HTMLElement | null>(null);
const failed = ref(false), ready = ref(false);
const moving = ref(false);
const hovered = ref<string | null>(null), hoveredRegion = ref<RegionId | null>(null);
const hoveredMaterial = computed(() => materials.find(item => item.id === hovered.value));
const elements = new Map<string, Element>();
const nodes = buildSpatialLayout(materials, relations).map(node => ({ ...node, material: materials.find(item => item.id === node.id)! }));
const positions = new Map(nodes.map(node => [node.id, new THREE.Vector3(node.x, node.y, node.z)]));
const domains = regions.map(region => ({ ...region, members: nodes.filter(node => node.region === region.id) }));
const ribbonEdges = relations.filter(edge => nodes.find(node => node.id === edge.from)!.region === nodes.find(node => node.id === edge.to)!.region);
const ribbons = new Map<string, THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>();
const icons = { question: CircleHelp, note: FileText, research: BookOpen, image: Image, hypothesis: Lightbulb };
const linked = computed(() => new Set(relations.filter(edge => edge.from === hovered.value || edge.to === hovered.value).flatMap(edge => [edge.from, edge.to])));
const edgeKinds = { context: '关联', hypothesis: '待验证的联系', limit: '限制与反例' };
let renderer: THREE.WebGLRenderer | undefined, controls: OrbitControls | undefined;
let scene: THREE.Scene, camera: THREE.PerspectiveCamera;
let points: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
let observer: ResizeObserver;
let frame = 0, width = 1, height = 1, homeDistance = 800;
let disposed = false, projectionDirty = true, resetLabels = true, fontsReady = false, gesture = false;
let labelBoxes = new Map<string, LabelBox>();
let labelAnchors = new Map<string, { x: number; y: number }>();
let labelMotion: { from: Map<string, LabelBox>; to: Map<string, LabelBox>; start: number; duration: number; slide: boolean } | null = null;
let pointerDown: { x: number; y: number } | null = null;
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
const vector = new THREE.Vector3();
const projected = new Map<string, { x: number; y: number; depth: number; distance: number; viewDistance: number }>();

function bind(key: string, element: unknown) {
  if (element instanceof Element) elements.set(key, element); else elements.delete(key);
}
function attrs(key: string, values: Record<string, string | number>) {
  const element = elements.get(key);
  if (element) for (const [name, value] of Object.entries(values)) element.setAttribute(name, String(value));
}
function related(id: string) {
  return hovered.value ? id === hovered.value || linked.value.has(id) : !hoveredRegion.value || nodes.find(node => node.id === id)!.region === hoveredRegion.value;
}
function projectScene() {
  const distances = nodes.map(node => -vector.copy(positions.get(node.id)!).applyMatrix4(camera.matrixWorldInverse).z);
  const near = Math.min(...distances), range = Math.max(1, Math.max(...distances) - near);
  nodes.forEach((node, index) => {
    vector.copy(positions.get(node.id)!).project(camera);
    projected.set(node.id, { x: (vector.x + 1) * width / 2, y: (1 - vector.y) * height / 2, depth: vector.z, distance: (distances[index]! - near) / range, viewDistance: distances[index]! });
  });
}
function projectRibbons() {
  const stripWidth = (width < 650 ? 23 : 36) * THREE.MathUtils.clamp(homeDistance * 0.78 / camera.position.distanceTo(controls!.target), 0.75, 1.3);
  for (const edge of ribbonEdges) {
    const mesh = ribbons.get(edge.id)!;
    const vertices = ribbonTriangles(projected.get(edge.from)!, projected.get(edge.to)!, stripWidth);
    const attribute = mesh.geometry.getAttribute('position');
    vertices.forEach((p, index) => {
      vector.set(p.x / width * 2 - 1, 1 - p.y / height * 2, p.depth).unproject(camera);
      attribute.setXYZ(index, vector.x, vector.y, vector.z);
    });
    attribute.needsUpdate = true; mesh.geometry.setDrawRange(0, vertices.length);
  }
}
function paintScene() {
  const color = new THREE.Color();
  const values = points.geometry.getAttribute('color'), sizes = points.geometry.getAttribute('size');
  const opacity = points.geometry.getAttribute('opacity'), rings = points.geometry.getAttribute('ring');
  nodes.forEach((node, index) => {
    const p = projected.get(node.id)!, appearance = depthAppearance(p.distance), relevant = related(node.id);
    color.set(spatialTones[node.region]);
    values.setXYZ(index, color.r, color.g, color.b);
    sizes.setX(index, hovered.value === node.id ? 11 : appearance.pointSize);
    opacity.setX(index, appearance.pointOpacity * (relevant ? 1 : 0.22));
    rings.setX(index, appearance.ring && hovered.value !== node.id ? 1 : 0);
    const element = elements.get('node:' + node.id) as HTMLElement | undefined;
    if (element) {
      element.style.setProperty('--depth-opacity', String(appearance.labelOpacity));
      element.dataset.depth = appearance.tier;
      element.dataset.related = String(relevant);
    }
  });
  for (const attribute of [values, sizes, opacity, rings]) attribute.needsUpdate = true;
  for (const edge of ribbonEdges) {
    const mesh = ribbons.get(edge.id)!;
    const region = nodes.find(node => node.id === edge.from)!.region;
    const depth = (projected.get(edge.from)!.distance + projected.get(edge.to)!.distance) / 2;
    const relevant = hoveredRegion.value ? region === hoveredRegion.value : !hovered.value || linked.value.has(edge.from) && linked.value.has(edge.to);
    // Opaque, background-mixed pigment uses the depth buffer, not stacked alpha blankets.
    const pigment = (0.17 - depth * 0.05) * (relevant ? hoveredRegion.value ? 1.35 : 1 : 0.24);
    mesh.material.color.set('#171919').convertLinearToSRGB().lerp(color.set(spatialTones[region]).convertLinearToSRGB(), pigment).convertSRGBToLinear();
  }
  const gaps = findRearCrossings(relations.map(edge => {
    const a = projected.get(edge.from)!, b = projected.get(edge.to)!;
    return { id: edge.id, from: { x: a.x, y: a.y, distance: a.viewDistance }, to: { x: b.x, y: b.y, distance: b.viewDistance } };
  }));
  for (const edge of relations) {
    const a = projected.get(edge.from)!, b = projected.get(edge.to)!;
    const appearance = depthAppearance((a.distance + b.distance) / 2);
    const active = hovered.value ? edge.from === hovered.value || edge.to === hovered.value : !!hoveredRegion.value && related(edge.from) && related(edge.to);
    const muted = (hovered.value || hoveredRegion.value) && !active;
    const d = 'M ' + a.x + ' ' + a.y + ' L ' + b.x + ' ' + b.y;
    const stroke = active ? 1.8 : appearance.edgeWidth;
    const alpha = muted ? 0.09 : active ? 0.95 : appearance.edgeOpacity;
    attrs('gradient:' + edge.id, { x1: a.x, y1: a.y, x2: b.x, y2: b.y });
    attrs('start:' + edge.id, { 'stop-opacity': 1 - a.distance * 0.5 });
    attrs('end:' + edge.id, { 'stop-opacity': 1 - b.distance * 0.5 });
    attrs('edge:' + edge.id, { d, 'stroke-width': stroke, opacity: alpha });
    attrs('holes:' + edge.id, { d: gaps.get(edge.id)!.map(p => 'M ' + (p.x - 3) + ' ' + p.y + ' a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0').join(' ') });
  }
}
function updateLabelAnchors() {
  const next = new Map(nodes.map(node => ['node:' + node.id, { x: projected.get(node.id)!.x, y: projected.get(node.id)!.y }]));
  for (const domain of domains) {
    const members = domain.members.map(node => projected.get(node.id)!);
    const center = members.reduce((sum, p) => ({ x: sum.x + p.x / members.length, y: sum.y + p.y / members.length }), { x: 0, y: 0 });
    const minY = Math.min(...members.map(p => p.y));
    next.set('domain:' + domain.id, { x: center.x, y: minY - 58 });
  }
  if (!resetLabels) {
    labelBoxes = followSpatialLabels(labelBoxes, labelAnchors, next);
    if (gesture) labelBoxes = separateFollowingLabels(labelBoxes, { x: 18, y: 94, w: width - 36, h: height - 194 }, [...projected.values()]);
    if (labelMotion) {
      labelMotion.from = followSpatialLabels(labelMotion.from, labelAnchors, next);
      labelMotion.to = followSpatialLabels(labelMotion.to, labelAnchors, next);
    }
  }
  labelAnchors = next;
}
function placeLabels(now: number) {
  if (!fontsReady) return;
  const bounds = { x: 18, y: 94, w: width - 36, h: height - 194 };
  const requests = [...labelAnchors].map(([id, p]) => {
    const el = elements.get(id) as HTMLElement;
    return { id, ...p, w: el.offsetWidth, h: el.offsetHeight, priority: id.startsWith('domain:') ? 40 : 10 + nodes.find(node => 'node:' + node.id === id)!.degree };
  });
  const preferred = new Map<string, LabelBox>();
  if (!resetLabels) for (const request of requests) {
    const old = labelBoxes.get(request.id);
    if (old) preferred.set(request.id, old);
  }
  const boxes = placeSpatialLabels(requests, bounds, [...projected.values()], preferred);
  const distance = Math.max(0, ...[...boxes].map(([id, box]) => { const old = labelBoxes.get(id); return old ? Math.hypot(box.x - old.x, box.y - old.y) : 0; }));
  if (!resetLabels && !motionQuery.matches && distance > 0.5) {
    labelMotion = { from: labelBoxes, to: boxes, start: now, duration: Math.min(480, 260 + distance * 0.45), slide: canInterpolateLabels(labelBoxes, boxes) };
    moving.value = true;
  } else { labelBoxes = boxes; labelMotion = null; moving.value = gesture; }
  resetLabels = false;
}
function applyLabelBoxes(now: number) {
  const placementOpacity = new Map<string, number>();
  if (labelMotion) {
    const t = Math.min(1, (now - labelMotion.start) / labelMotion.duration), eased = t * t * (3 - 2 * t);
    const motion = labelMotion;
    labelBoxes = new Map([...motion.to].map(([id, box]) => {
      const from = motion.from.get(id) || box;
      if (!motion.slide) {
        placementOpacity.set(id, Math.hypot(box.x - from.x, box.y - from.y) > 0.5 ? Math.abs(2 * t - 1) : 1);
        return [id, t < 0.5 ? from : box];
      }
      return [id, { ...box, x: from.x + (box.x - from.x) * eased, y: from.y + (box.y - from.y) * eased }];
    }));
    if (t === 1) { labelMotion = null; moving.value = gesture; }
  }
  for (const [key, element] of elements) {
    if (!key.startsWith('node:') && !key.startsWith('domain:')) continue;
    const label = element as HTMLElement, box = labelBoxes.get(key);
    label.style.setProperty('--placement-opacity', String(placementOpacity.get(key) ?? 1));
    label.style.visibility = box ? 'visible' : 'hidden';
    if (!box) continue;
    label.style.transform = 'translate(' + box.x + 'px, ' + box.y + 'px)';
    if (key.startsWith('node:')) {
      const p = projected.get(key.slice(5))!;
      label.dataset.anchorX = String(p.x); label.dataset.anchorY = String(p.y);
      label.style.visibility = p.depth > -1 && p.depth < 1 ? 'visible' : 'hidden';
    }
  }
}
function geometryChanged() { projectionDirty = true; requestRender(); }
function onGestureStart() { gesture = true; labelMotion = null; moving.value = true; }
function onGestureEnd() { gesture = false; geometryChanged(); }
function render(now: number) {
  frame = 0;
  if (!renderer || !props.active || document.hidden || disposed || failed.value) return;
  camera.updateMatrixWorld();
  if (projectionDirty) { projectScene(); projectRibbons(); updateLabelAnchors(); if (!gesture) placeLabels(now); projectionDirty = false; }
  applyLabelBoxes(now); paintScene(); renderer.render(scene, camera);
  if (labelMotion) requestRender();
}
function requestRender() {
  if (!frame && props.active && !document.hidden && !failed.value && !disposed) frame = requestAnimationFrame(render);
}
function visibilityChanged() {
  if (labelMotion && (document.hidden || !props.active || motionQuery.matches)) { labelBoxes = labelMotion.to; labelMotion = null; moving.value = false; }
  if (document.hidden || !props.active) { cancelAnimationFrame(frame); frame = 0; hovered.value = null; hoveredRegion.value = null; }
  else requestRender();
}
function resetCamera() {
  if (!camera || !controls) return;
  resetLabels = true;
  camera.position.set(0.8, 0.85, 1).normalize().multiplyScalar(homeDistance * 0.78);
  controls.target.set(0, 0, 0);
  controls.update(); geometryChanged();
}
function zoom(amount: number) {
  if (!camera || !controls) return;
  const offset = camera.position.clone().sub(controls.target);
  const distance = THREE.MathUtils.clamp(offset.length() * amount, controls.minDistance, controls.maxDistance);
  camera.position.copy(controls.target).add(offset.setLength(distance)); controls.update(); geometryChanged();
}
function turn() {
  if (!camera || !controls) return;
  const offset = camera.position.clone().sub(controls.target).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 8);
  camera.position.copy(controls.target).add(offset); controls.update(); geometryChanged();
}
function contextLost(event: Event) { event.preventDefault(); failed.value = true; cancelAnimationFrame(frame); frame = 0; }
function canvasDown(event: PointerEvent) { pointerDown = { x: event.clientX, y: event.clientY }; }
function canvasUp(event: PointerEvent) {
  if (!pointerDown || Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y) > 5) { pointerDown = null; return; }
  pointerDown = null;
  const rect = host.value!.getBoundingClientRect();
  const target = nodes.filter(node => { const p = projected.get(node.id)!; return Math.hypot(p.x - event.clientX + rect.x, p.y - event.clientY + rect.y) < 14; })
    .sort((a, b) => projected.get(a.id)!.distance - projected.get(b.id)!.distance)[0];
  if (target) emit('select', target.id);
}
function resize() {
  if (!host.value || !renderer) return;
  const bounds = host.value.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  if (ready.value && width === bounds.width && height === bounds.height) return;
  resetLabels = true;
  width = bounds.width; height = bounds.height;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75)); renderer.setSize(width, height, false);
  points.material.uniforms.pixelRatio!.value = renderer.getPixelRatio();
  camera.aspect = width / height; camera.updateProjectionMatrix();
  const oldDistance = homeDistance;
  homeDistance = 245 / Math.sin(THREE.MathUtils.degToRad(20)) / Math.min(1, camera.aspect) * 1.15;
  if (!ready.value) resetCamera();
  else camera.position.sub(controls!.target).multiplyScalar(homeDistance / oldDistance).add(controls!.target);
  controls!.minDistance = homeDistance * 0.5; controls!.maxDistance = homeDistance * 2.4;
  ready.value = true; geometryChanged();
}

onMounted(() => {
  try {
    scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(40, 1, 1, 5000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); renderer.setClearColor('#171919', 0);
    renderer.domElement.setAttribute('aria-label', '三维知识全貌'); renderer.domElement.setAttribute('role', 'img'); renderer.domElement.className = 'spatial-canvas';
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    renderer.domElement.addEventListener('pointerdown', canvasDown); renderer.domElement.addEventListener('pointerup', canvasUp);
    host.value!.prepend(renderer.domElement);
    for (const edge of ribbonEdges) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(66 * 3), 3));
      const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, depthTest: true, depthWrite: true, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }));
      mesh.frustumCulled = false; ribbons.set(edge.id, mesh); scene.add(mesh);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(nodes.flatMap(node => [node.x, node.y, node.z]), 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(nodes.length * 3), 3));
    for (const name of ['size', 'opacity', 'ring']) geometry.setAttribute(name, new THREE.Float32BufferAttribute(new Float32Array(nodes.length), 1));
    points = new THREE.Points(geometry, new THREE.ShaderMaterial({
      transparent: true, depthWrite: true, vertexColors: true,
      uniforms: { pixelRatio: { value: 1 } },
      vertexShader: `attribute float size; attribute float opacity; attribute float ring;
        uniform float pixelRatio; varying vec3 pointColor; varying float pointOpacity; varying float pointRing;
        void main() { pointColor = color; pointOpacity = opacity; pointRing = ring;
          gl_PointSize = size * pixelRatio;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `varying vec3 pointColor; varying float pointOpacity; varying float pointRing;
        void main() { float r = length(gl_PointCoord - vec2(0.5)); if (r > 0.5) discard;
          float alpha = (1.0 - smoothstep(0.36, 0.5, r)) * mix(1.0, smoothstep(0.16, 0.3, r), pointRing);
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(pointColor, alpha * pointOpacity);
          #include <colorspace_fragment>
        }`,
    }));
    points.renderOrder = 1; scene.add(points);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false; controls.enablePan = false;
    controls.rotateSpeed = 0.55; controls.zoomSpeed = 0.7;
    controls.addEventListener('change', geometryChanged);
    controls.addEventListener('start', onGestureStart); controls.addEventListener('end', onGestureEnd);
    observer = new ResizeObserver(resize); observer.observe(host.value!);
    document.addEventListener('visibilitychange', visibilityChanged); motionQuery.addEventListener('change', visibilityChanged);
    document.fonts.ready.then(() => { if (!disposed) { fontsReady = true; resetLabels = true; geometryChanged(); } });
    resize();
  } catch { failed.value = true; }
});
watch([hovered, hoveredRegion], requestRender);
watch(() => props.active, visibilityChanged);
onBeforeUnmount(() => {
  disposed = true; cancelAnimationFrame(frame); observer?.disconnect();
  document.removeEventListener('visibilitychange', visibilityChanged); motionQuery.removeEventListener('change', visibilityChanged);
  controls?.dispose(); points?.geometry.dispose(); points?.material.dispose();
  for (const mesh of ribbons.values()) { mesh.geometry.dispose(); mesh.material.dispose(); }
  ribbons.clear();
  renderer?.domElement.removeEventListener('webglcontextlost', contextLost);
  renderer?.domElement.removeEventListener('pointerdown', canvasDown); renderer?.domElement.removeEventListener('pointerup', canvasUp);
  renderer?.dispose(); renderer?.domElement.remove();
});
</script>

<template>
  <section ref="host" class="spatial-overview" :class="{ 'is-ready': ready, 'spatial-failed': failed, 'has-focus': hovered || hoveredRegion, 'is-moving': moving }" :data-ribbon-relations="ribbonEdges.map(edge => edge.id).join(' ')" aria-label="Atlas 三维全貌">
    <div class="spatial-heading"><h1>Atlas</h1><button class="quiet-command" type="button" @click="emit('reading')"><MapIcon :size="17" />二维阅读</button></div>
    <template v-if="!failed">
      <svg class="spatial-connections" aria-hidden="true">
        <defs><linearGradient v-for="edge in relations" :id="`spatial-edge-${edge.id}`" :key="edge.id" :ref="el => bind(`gradient:${edge.id}`, el)" gradientUnits="userSpaceOnUse">
          <stop :ref="el => bind(`start:${edge.id}`, el)" offset="0" :stop-color="spatialTones[materials.find(item => item.id === edge.from)!.region]" />
          <stop :ref="el => bind(`end:${edge.id}`, el)" offset="1" :stop-color="spatialTones[materials.find(item => item.id === edge.to)!.region]" />
        </linearGradient>
        <mask v-for="edge in relations" :id="`spatial-mask-${edge.id}`" :key="edge.id" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
          <rect width="100%" height="100%" fill="white" /><path :ref="el => bind(`holes:${edge.id}`, el)" fill="black" />
        </mask></defs>
        <g><g v-for="edge in relations" :key="edge.id" class="spatial-edge" :class="{ 'edge-active': hovered && (edge.from === hovered || edge.to === hovered) }" :data-relation="edge.kind">
          <title>{{ edgeKinds[edge.kind] }}：{{ edge.statement }}</title>
          <path :ref="el => bind(`edge:${edge.id}`, el)" :stroke="`url(#spatial-edge-${edge.id})`" :mask="`url(#spatial-mask-${edge.id})`" :stroke-dasharray="edge.kind === 'hypothesis' ? '7 5' : edge.kind === 'limit' ? '2 4' : undefined" class="edge-ink" />
        </g></g>
      </svg>
      <button v-for="node in nodes" :key="node.id" :ref="el => bind(`node:${node.id}`, el)" class="spatial-hit" :class="{ 'is-active': hovered === node.id }" :style="{ '--node-tone': spatialTones[node.region] }" type="button"
        :aria-label="`查看${node.material.title.replace('\n', '')}`" :title="`${spatialKinds[node.material.kind]}：${node.material.title.replace('\n', '')}`" :data-spatial-node="node.id" :data-region="node.region"
        @pointerenter="hovered = node.id" @pointerleave="hovered = null" @focus="hovered = node.id" @blur="hovered = null" @click="emit('select', node.id)">
        <component :is="icons[node.material.kind]" :size="13" :stroke-width="1.6" aria-hidden="true" /><span>{{ spatialNames[node.id] || node.material.title.replace('\n', '') }}</span>
      </button>
      <button v-for="domain in domains" :key="domain.id" :ref="el => bind(`domain:${domain.id}`, el)" class="spatial-domain" :style="{ '--tone': spatialTones[domain.id] }"
        type="button" :aria-label="`展开${domain.title}`" :data-spatial-region="domain.id" @pointerenter="hoveredRegion = domain.id" @pointerleave="hoveredRegion = null"
        @focus="hoveredRegion = domain.id" @blur="hoveredRegion = null" @click="emit('region', domain.id)">
        <span class="domain-name"><span class="region-mark" :data-pattern="spatialRegionPatterns[domain.id]" aria-hidden="true"></span>{{ domain.title }}</span><span class="domain-count">{{ domain.members.length }} 个片段 <ArrowUpRight :size="13" /></span>
      </button>
      <div class="spatial-controls" aria-label="三维视角">
        <button class="icon-button" type="button" aria-label="拉远三维视角" title="拉远" @click="zoom(1.16)"><Minus :size="17" /></button>
        <button class="icon-button" type="button" aria-label="拉近三维视角" title="拉近" @click="zoom(0.86)"><Plus :size="17" /></button>
        <button class="icon-button" type="button" aria-label="转动三维视角" title="转动视角" @click="turn"><RotateCw :size="17" /></button>
        <button class="icon-button" type="button" aria-label="恢复三维全貌" title="恢复全貌" @click="resetCamera"><LocateFixed :size="18" /></button>
      </div>
    </template>
    <div v-else class="spatial-fallback"><p>三维画面暂时无法显示。</p><button class="quiet-command" type="button" @click="emit('reading')">进入二维阅读 <ArrowUpRight :size="16" /></button></div>
    <footer class="spatial-footer"><span v-if="hoveredMaterial" class="spatial-caption">{{ hoveredMaterial.title.replace('\n', '') }}</span><span v-else>4 个领域<span class="spatial-footer-separator">/</span>20 个片段</span><span class="spatial-demo">演示集合</span></footer>
  </section>
</template>
