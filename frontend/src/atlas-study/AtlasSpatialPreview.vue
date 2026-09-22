<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from '@lucide/vue';
import { deltaImage, materials, regions, relations } from './data';
import { spatialKinds, spatialNames } from './spatial-visuals';

const props = defineProps<{ id: string; canBack: boolean; rejected: boolean }>();
const emit = defineEmits<{ select: [id: string]; read: []; close: []; back: [] }>();
const pane = ref<HTMLElement | null>(null);
const body = ref<HTMLElement | null>(null);
const imageFailed = ref(false);
const material = computed(() => materials.find(item => item.id === props.id)!);
const area = computed(() => regions.find(item => item.id === material.value.region)!);
const links = computed(() => relations.filter(edge => edge.from === props.id || edge.to === props.id).map(edge => ({
  ...edge, target: materials.find(item => item.id === (edge.from === props.id ? edge.to : edge.from))!,
})));

async function focus() { await nextTick(); pane.value?.focus({ preventScroll: true }); }
watch(() => props.id, async () => { await focus(); body.value?.scrollTo({ top: 0 }); }, { immediate: true });
defineExpose({ focus });
</script>

<template>
  <aside id="spatial-preview" ref="pane" class="spatial-preview" :class="`tone-${material.region}`" tabindex="-1" aria-labelledby="spatial-preview-title">
    <header class="preview-top">
      <button v-if="canBack" class="icon-button" type="button" aria-label="返回上一个预览" title="返回上一个预览" @click="emit('back')"><ArrowLeft :size="17" /></button>
      <span>{{ area.title }}</span>
      <button class="icon-button" type="button" aria-label="关闭预览" title="关闭预览" @click="emit('close')"><X :size="18" /></button>
    </header>
    <div ref="body" class="preview-body">
      <span class="preview-kind"><span class="status-dot"></span>{{ spatialKinds[material.kind] }}</span>
      <h2 id="spatial-preview-title">{{ material.title }}</h2>
      <p class="preview-summary">{{ material.summary }}</p>
      <p v-if="material.kind === 'research'" class="preview-boundary">{{ material.detail }}</p>
      <img v-if="material.id === 'delta' && !imageFailed" class="preview-image" :src="deltaImage" alt="勒拿河三角洲卫星影像，NASA / USGS" width="177" height="112" @error="imageFailed = true" />
      <a v-if="material.source" class="preview-source" :href="material.source" target="_blank" rel="noreferrer">{{ material.provenance }}<ArrowUpRight :size="13" /></a>
      <span v-else class="preview-source">{{ material.provenance }}</span>
      <div class="preview-links">
        <h3>直接关联<span>{{ links.length }}</span></h3>
        <button v-for="edge in links" :key="edge.id" type="button" :data-preview-target="edge.target.id" :title="edge.statement" @click="emit('select', edge.target.id)">
          <span class="preview-link-title"><span class="status-dot" :class="`tone-${edge.target.region}`"></span>{{ spatialNames[edge.target.id] }}</span>
          <small v-if="rejected && edge.id === 'limit-wip'" class="preview-limit">有异议</small>
          <small v-else-if="edge.kind === 'hypothesis'">待验证</small>
          <small v-else-if="edge.kind === 'limit'" class="preview-limit">边界</small>
          <ArrowRight :size="13" />
        </button>
      </div>
    </div>
    <footer class="preview-bottom"><button class="quiet-command" type="button" @click="emit('read')">进入局部阅读<ArrowRight :size="17" /></button></footer>
  </aside>
</template>
