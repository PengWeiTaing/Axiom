// Page-local practice evidence, not a server grade or a mastery estimate.
export interface CheckQuestion {
  id: string
  prompt: string
  options: { id: string; label: string; feedback: string }[]
  answerId: string
  hint: string
  solution: string[]
}

export type CheckResult = 'independent' | 'assisted' | 'corrected' | 'revealed' | 'skipped'

export interface CheckState {
  selectedId: string | null
  submittedIds: string[]
  feedbackId: string | null
  hintUsed: boolean
  answerRevealed: boolean
  result: CheckResult | null
}

export type CheckAction =
  | { type: 'select'; id: string }
  | { type: 'submit' }
  | { type: 'hint' }
  | { type: 'reveal' }
  | { type: 'skip' }

export function createCheckState(): CheckState {
  return {
    selectedId: null, submittedIds: [], feedbackId: null,
    hintUsed: false, answerRevealed: false, result: null,
  }
}

export function updateCheck(question: CheckQuestion, state: CheckState, action: CheckAction): CheckState {
  // Finished attempts cannot be turned into independent success by retrying,
  // nor retroactively downgraded by reading the solution after answering.
  if (state.result !== null) return state
  switch (action.type) {
    case 'select':
      return question.options.some(option => option.id === action.id)
        ? { ...state, selectedId: action.id }
        : state
    case 'hint':
      return { ...state, hintUsed: true }
    case 'reveal':
      return { ...state, selectedId: null, answerRevealed: true, result: 'revealed' }
    case 'skip':
      return { ...state, selectedId: null, result: 'skipped' }
    case 'submit': {
      if (!question.options.some(option => option.id === state.selectedId)) return state
      const id = state.selectedId!
      const submittedIds = [...state.submittedIds, id]
      const result = id !== question.answerId ? null
        : state.hintUsed ? 'assisted'
          : submittedIds.length === 1 ? 'independent' : 'corrected'
      // Clear selection so a double click cannot count as a second attempt.
      return { ...state, selectedId: null, submittedIds, feedbackId: id, result }
    }
  }
}

export const RESULT_LABELS: Record<CheckResult, string> = {
  independent: '本页首次作答正确（未用提示）',
  assisted: '使用提示后答对',
  corrected: '根据反馈改正后答对',
  revealed: '已看答案，未计为独立答对',
  skipped: '本题已跳过，未记录答对',
}
