/*
 * 智能捕获 — Axiom 的核心交互
 *
 * 流程：
 *   text → /parse → 根据 type 路由到 /tasks /memories /decisions /fetch /add
 *
 * 失败兜底：
 *   - /parse 失败（AI 没配 / 超时）→ 走简单规则：URL→/fetch，其他→/add
 *   - 创建端点失败 → 抛错，UI 显示原因
 *
 * 反馈：
 *   - 成功返回 { kind, item, parsed }
 *   - kind 用于 UI 显示"AI 判定为 任务"
 *   - item 用于乐观插入 timeline
 */

import { ref } from 'vue';
import {
  addNote,
  uploadFile,
  fetchUrl,
  aiParse,
  createTask,
  createMemory,
  createDecision,
  mountEntity,
} from '@/api/endpoints';
import type { Item, ParseResult, ParseType } from '@/api/types';
import { ApiError } from '@/api/client';
import { useTimelineStore } from '@/stores/timeline';

export interface CaptureSuccess {
  kind: ParseType | 'file' | 'url';
  label: string;        // 中文展示标签
  item?: Item;          // 如果对应 item 表的记录，回填 timeline
  parsed?: ParseResult; // AI 解析结果（用于撤销/纠错）
  raw: unknown;         // 后端返回原文，给详情面板用
  suggestedLifelineId?: string;
  suggestedLifelineName?: string;
}

const URL_RE = /^https?:\/\/\S+$/i;

const KIND_LABEL: Record<string, string> = {
  task: '任务',
  memory: '记忆',
  decision: '决策',
  note: '笔记',
  health: '健康',
  url: '链接',
  file: '文件',
};

export function useSmartCapture() {
  const submitting = ref(false);
  const lastResult = ref<CaptureSuccess | null>(null);
  const lastError = ref<string | null>(null);

  async function capture(text: string, files: File[] = []): Promise<CaptureSuccess> {
    submitting.value = true;
    lastError.value = null;

    try {
      // 1. 有文件 → 走 /upload（每个文件一次），最后一个作为返回
      if (files.length > 0) {
        let last: { id: number; item: Item } | null = null;
        for (const file of files) {
          last = await uploadFile(file, text || undefined);
        }
        const result: CaptureSuccess = {
          kind: 'file',
          label: KIND_LABEL.file,
          item: last!.item,
          raw: last,
        };
        afterSuccess(result);
        return result;
      }

      const trimmed = text.trim();
      if (!trimmed) throw new ApiError('empty', '内容为空', 400);

      // 2. 纯 URL → 直接 /fetch（绕过 AI，更快）
      if (URL_RE.test(trimmed) && !trimmed.includes(' ')) {
        const data = await fetchUrl(trimmed);
        const result: CaptureSuccess = {
          kind: 'url',
          label: KIND_LABEL.url,
          item: data.item,
          raw: data,
        };
        afterSuccess(result);
        return result;
      }

      // 3. 走 AI 路由
      let parsed: ParseResult;
      try {
        parsed = await aiParse(trimmed);
      } catch (err) {
        // AI 不可用 → 兜底 /add
        const data = await addNote(trimmed);
        const result: CaptureSuccess = {
          kind: 'note',
          label: KIND_LABEL.note + ' (AI 离线)',
          item: data.item,
          raw: data,
        };
        afterSuccess(result);
        return result;
      }

      // 4. 根据 type 路由
      const result = await route(parsed, trimmed);
      afterSuccess(result);
      return result;
    } catch (err) {
      lastError.value = err instanceof ApiError ? err.message : '捕获失败';
      throw err;
    } finally {
      submitting.value = false;
    }
  }

  function afterSuccess(result: CaptureSuccess) {
    lastResult.value = result;
    if (result.item) {
      useTimelineStore().prepend(result.item);
    }
  }

  async function acceptLifeline(result: CaptureSuccess) {
    if (!result.suggestedLifelineId || !result.raw) return
    const kind = result.kind === 'file' || result.kind === 'url' ? 'item' : result.kind
    const entityId = (result.raw as any).id
    if (!entityId) return
    try {
      await mountEntity(kind, entityId, result.suggestedLifelineId)
    } catch {
      // 静默失败，不影响主流程
    }
  }

  return { capture, submitting, lastResult, lastError, acceptLifeline };
}

async function route(parsed: ParseResult, originalText: string): Promise<CaptureSuccess> {
  switch (parsed.type) {
    case 'task': {
      const data = await createTask({
        title: parsed.title || originalText,
        priority: parsed.priority || 'medium',
        due_date: parsed.due_date,
        estimated_minutes: parsed.estimated_minutes,
      });
      return { kind: 'task', label: KIND_LABEL.task, parsed, raw: data,
        suggestedLifelineId: parsed.suggested_lifeline_id, suggestedLifelineName: parsed.suggested_lifeline_name };
    }
    case 'memory': {
      const data = await createMemory({
        category: parsed.category || 'fact',
        content: parsed.content || originalText,
      });
      return { kind: 'memory', label: KIND_LABEL.memory, parsed, raw: data,
        suggestedLifelineId: parsed.suggested_lifeline_id, suggestedLifelineName: parsed.suggested_lifeline_name };
    }
    case 'decision': {
      const data = await createDecision({
        title: parsed.title || originalText.slice(0, 40),
        decision: parsed.content || originalText,
      });
      return { kind: 'decision', label: KIND_LABEL.decision, parsed, raw: data,
        suggestedLifelineId: parsed.suggested_lifeline_id, suggestedLifelineName: parsed.suggested_lifeline_name };
    }
    case 'url': {
      if (parsed.url) {
        const data = await fetchUrl(parsed.url);
        return { kind: 'url', label: KIND_LABEL.url, item: data.item, parsed, raw: data,
          suggestedLifelineId: parsed.suggested_lifeline_id, suggestedLifelineName: parsed.suggested_lifeline_name };
      }
      // 没解析出 url 字段就当 note
      const data = await addNote(originalText);
      return { kind: 'note', label: KIND_LABEL.note, item: data.item, parsed, raw: data,
        suggestedLifelineId: parsed.suggested_lifeline_id, suggestedLifelineName: parsed.suggested_lifeline_name };
    }
    case 'note':
    case 'health':
    default: {
      const data = await addNote(parsed.content || originalText);
      return {
        kind: parsed.type === 'health' ? 'health' : 'note',
        label: KIND_LABEL[parsed.type] || KIND_LABEL.note,
        item: data.item,
        parsed,
        raw: data,
        suggestedLifelineId: parsed.suggested_lifeline_id,
        suggestedLifelineName: parsed.suggested_lifeline_name,
      };
    }
  }
}
