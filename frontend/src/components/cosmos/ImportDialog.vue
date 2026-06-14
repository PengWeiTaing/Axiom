<script setup lang="ts">
import { ref } from 'vue'

type Step = 'select' | 'preview' | 'result'

interface ImportStats {
  lifelineCount: number; entityCount: number; assocCount: number
  kindCounts: Record<string, number>; statusCounts: Record<string, number>
  exportedAt: string
}

interface ImportResult {
  lifelines: { created: number; updated: number }
  entities: { created: number }
  associations: { created: number; skipped: number }
}

const emit = defineEmits<{ (e: 'close'): void; (e: 'imported'): void }>()

const step = ref<Step>('select')
const error = ref('')
const stats = ref<ImportStats | null>(null)
const fileData = ref<Record<string, unknown> | null>(null)
const result = ref<ImportResult | null>(null)
const importing = ref(false)

function handleFile(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  error.value = ''
  const reader = new FileReader()
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result as string)
      const v = validate(data)
      if (!v.valid) { error.value = v.error || '验证失败'; return }
      stats.value = v.stats!
      fileData.value = data
      step.value = 'preview'
    } catch { error.value = 'JSON 解析失败，请确认文件格式正确' }
  }
  reader.readAsText(file)
}

function validate(data: unknown): { valid: boolean; error?: string; stats?: ImportStats } {
  if (!data || typeof data !== 'object') return { valid: false, error: '无效的 JSON 格式' }
  const d = data as Record<string, unknown>
  if (!Array.isArray(d.entities)) return { valid: false, error: '缺少 entities 数组' }
  if (!Array.isArray(d.associations)) return { valid: false, error: '缺少 associations 数组' }
  const entities = d.entities as Array<{ kind: string }>
  const assocs = d.associations as Array<{ status: string }>
  const lifelines = (d.lifelines as Array<unknown>) || []
  const kindCounts: Record<string, number> = {}
  for (const e of entities) { kindCounts[e.kind] = (kindCounts[e.kind] || 0) + 1 }
  const statusCounts: Record<string, number> = {}
  for (const a of assocs) { statusCounts[a.status || 'unknown'] = (statusCounts[a.status || 'unknown'] || 0) + 1 }
  return { valid: true, stats: { lifelineCount: lifelines.length, entityCount: entities.length, assocCount: assocs.length, kindCounts, statusCounts, exportedAt: (d.exported_at as string) || '未知' } }
}

async function doImport() {
  if (!fileData.value) return
  importing.value = true
  try {
    const { importCosmos } = await import('@/api/cosmos')
    const r = (await importCosmos(fileData.value)) as any
    result.value = r.imported
    step.value = 'result'
    emit('imported')
  } catch (e: any) {
    error.value = e?.message || '导入失败'
  } finally { importing.value = false }
}

function kindLabel(k: string): string {
  const m: Record<string, string> = { task: 'Task', memory: 'Memory', decision: 'Decision', item: 'Item' }
  return m[k] || k
}

function statusLabel(s: string): string {
  const m: Record<string, string> = { accepted: '已确认', pending: '待确认', rejected: '已拒绝' }
  return m[s] || s
}
</script>

<template>
  <div class="import-overlay" @click.self="emit('close')">
    <div class="import-dialog">
      <div class="import-title">导入数据</div>

      <!-- Step 1: File select -->
      <template v-if="step === 'select'">
        <div class="file-area">
          <label class="file-label">
            <span class="file-icon">📁</span>
            <span>选择 JSON 文件</span>
            <input type="file" accept=".json" class="file-input" @change="handleFile" />
          </label>
        </div>
        <div v-if="error" class="import-error">{{ error }}</div>
      </template>

      <!-- Step 2: Preview -->
      <template v-if="step === 'preview' && stats">
        <div class="preview-stats">
          <div class="preview-row">即将导入：</div>
          <div class="preview-row">· Lifeline: {{ stats.lifelineCount }} 条</div>
          <div class="preview-row">· Entity: {{ stats.entityCount }} 个
            <template v-for="(cnt, k) in stats.kindCounts" :key="k">
              <span class="preview-tag">{{ kindLabel(k) }} {{ cnt }}</span>
            </template>
          </div>
          <div class="preview-row">· 关联: {{ stats.assocCount }} 条
            <template v-for="(cnt, s) in stats.statusCounts" :key="s">
              <span class="preview-tag">{{ statusLabel(s) }} {{ cnt }}</span>
            </template>
          </div>
          <div class="preview-row export-at">导出时间: {{ stats.exportedAt }}</div>
          <div class="preview-note">⚠ Entity 将获得新 ID，关联自动重新映射</div>
        </div>
        <div v-if="error" class="import-error">{{ error }}</div>
        <div class="import-actions">
          <button class="import-btn cancel" @click="emit('close')">取消</button>
          <button class="import-btn submit" :disabled="importing" @click="doImport">{{ importing ? '导入中…' : '确认导入' }}</button>
        </div>
      </template>

      <!-- Step 3: Result -->
      <template v-if="step === 'result' && result">
        <div class="result-stats">
          <div class="result-row">✅ Lifeline: 新建 {{ result.lifelines.created }}, 更新 {{ result.lifelines.updated }}</div>
          <div class="result-row">✅ Entity: 新建 {{ result.entities.created }}</div>
          <div class="result-row">✅ 关联: 新建 {{ result.associations.created }}<span v-if="result.associations.skipped > 0">, 跳过 {{ result.associations.skipped }}</span></div>
          <div class="preview-note">数据已刷新，请查看 3D 场景</div>
        </div>
        <div class="import-actions">
          <button class="import-btn submit" @click="emit('close')">关闭</button>
        </div>
      </template>

      <button v-if="step !== 'result'" class="import-cancel-bottom" @click="emit('close')">取消</button>
    </div>
  </div>
</template>

<style scoped>
.import-overlay {
  position: fixed; inset: 0; z-index: 120;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
}

.import-dialog {
  background: var(--surface-1); border-radius: var(--r-2);
  padding: var(--s-4); width: 380px;
  display: flex; flex-direction: column; gap: var(--s-3);
}

.import-title {
  font-size: var(--fs-3); color: var(--text-1); font-weight: 600;
}

.file-area {
  border: 2px dashed var(--line-2); border-radius: var(--r-2);
  padding: var(--s-4); text-align: center;
}

.file-label {
  cursor: pointer; display: flex; flex-direction: column;
  align-items: center; gap: var(--s-1); color: var(--text-2); font-size: var(--fs-2);
}

.file-icon { font-size: 32px; }
.file-input { display: none; }

.import-error {
  color: #f87171; font-size: var(--fs-2); padding: var(--s-2);
  background: rgba(248,113,113,0.08); border-radius: var(--r-1);
}

.preview-stats, .result-stats {
  display: flex; flex-direction: column; gap: var(--s-1);
  background: var(--surface-2); border-radius: var(--r-1); padding: var(--s-2);
}

.preview-row, .result-row {
  font-size: var(--fs-2); color: var(--text-2);
}

.preview-tag {
  font-size: var(--fs-1); color: var(--text-4); margin-left: var(--s-1);
}

.export-at {
  font-size: var(--fs-1); color: var(--text-4);
}

.preview-note {
  font-size: var(--fs-1); color: var(--warm); margin-top: var(--s-1);
}

.import-actions {
  display: flex; justify-content: flex-end; gap: var(--s-2);
}

.import-btn {
  font-size: var(--fs-2); padding: var(--s-1) var(--s-3); border-radius: var(--r-1); cursor: pointer;
}

.import-btn.cancel {
  background: var(--surface-2); border: 1px solid var(--line-1); color: var(--text-2);
}

.import-btn.submit {
  background: var(--accent); border: none; color: var(--surface-0); font-weight: 500;
}

.import-btn.submit:disabled { opacity: 0.4; cursor: default; }

.import-cancel-bottom {
  background: var(--surface-2); border: 1px solid var(--line-1); border-radius: var(--r-1);
  color: var(--text-2); font-size: var(--fs-2); padding: var(--s-1) var(--s-3); cursor: pointer;
  align-self: flex-end;
}
</style>
