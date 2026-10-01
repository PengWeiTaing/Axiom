import React from 'react'
import { CheckOptions, CheckSolution } from './CheckParts'
import { RESULT_LABELS, updateCheck, type CheckAction } from './checkState'
import type { ComputedIntegralLesson } from './computedIntegral'
import { useComputedPracticeSession } from './ComputedPracticeSession'
import './learning-path.css'

export default function ComputedIntegralPractice({ lesson, children }: {
  lesson: ComputedIntegralLesson; children: React.ReactNode
}) {
  const [state, setState] = useComputedPracticeSession(lesson.id)
  const { stage, prediction, transfer } = state
  const updateTransfer = (action: CheckAction) => setState(current => ({
    ...current, transfer: updateCheck(lesson.transfer, current.transfer, action),
  }))
  const revealPrediction = (skip: boolean) => setState(current => ({
    ...current, stage: 'observe', prediction: updateCheck(lesson.prediction, current.prediction, { type: skip ? 'skip' : 'submit' }),
  }))
  const finish = (action: 'skip' | 'reveal') => setState(current => ({
    ...current, stage: 'complete', transfer: updateCheck(lesson.transfer, current.transfer, { type: action }),
  }))
  const feedback = lesson.transfer.options.find(option => option.id === transfer.feedbackId)
  const predictionFeedback = lesson.prediction.options.find(option => option.id === prediction.feedbackId)

  return <div className="learning-path learning-path--inline" data-computed-practice={lesson.id} data-stage={stage}>
    <p className="learning-path__eyebrow">本题练习 · {stage === 'predict' ? '做个预测' : stage === 'observe' ? '看图核对' : stage === 'transfer' ? '换区间试试' : '本次结果'}</p>
    {stage === 'predict' && <>
      <p>{lesson.prediction.prompt}</p>
      <CheckOptions question={lesson.prediction} state={prediction} select={id => setState(current => ({
        ...current, prediction: updateCheck(lesson.prediction, current.prediction, { type: 'select', id }),
      }))} />
      <div className="learning-path__actions">
        <button type="button" disabled={!prediction.selectedId} onClick={() => revealPrediction(false)}>提交预测</button>
        <button type="button" onClick={() => revealPrediction(true)}>跳过预测，看演示</button>
      </div>
    </>}
    {stage === 'observe' && <>
      <p className="learning-path__feedback" role="status">{predictionFeedback?.feedback ?? lesson.conclusion}</p>
      {children}
      <p className="learning-path__muted">{lesson.generator === 'axiom-trig-signed-area-v1'
        ? '拖动只改变矩形近似；原区间的定积分和几何面积不会随分割数改变。图中是数值参考，上方给出精确值。'
        : '拖动后，图中数值会随分割数变化；上方核对仍对应预测题的初始条件。'}</p>
      <details><summary>查看本题计算过程</summary><CheckSolution question={lesson.prediction} /></details>
      <div className="learning-path__actions">
        <button type="button" onClick={() => setState(current => ({ ...current, stage: 'transfer' }))}>{transfer.submittedIds.length || transfer.hintUsed ? '回到变式题' : '换区间试试'}</button>
        <button type="button" onClick={() => finish('skip')}>暂不练习</button>
      </div>
    </>}
    {stage === 'transfer' && <>
      <p>{lesson.transfer.prompt}</p>
      <CheckOptions question={lesson.transfer} state={transfer} select={id => updateTransfer({ type: 'select', id })} />
      {feedback && <p className="learning-path__feedback" role="status">{feedback.feedback}</p>}
      {transfer.hintUsed && <p className="learning-path__hint">提示：{lesson.transfer.hint}</p>}
      {transfer.result && <p role="status">{RESULT_LABELS[transfer.result]}</p>}
      <div className="learning-path__actions">
        {!transfer.result ? <>
          <button type="button" disabled={!transfer.selectedId} onClick={() => updateTransfer({ type: 'submit' })}>提交答案</button>
          <button type="button" onClick={() => updateTransfer({ type: 'hint' })}>给一点提示</button>
          <button type="button" onClick={() => finish('reveal')}>直接看答案</button>
          <button type="button" onClick={() => setState(current => ({
            ...current, stage: 'observe', transfer: updateCheck(lesson.transfer, current.transfer, { type: 'hint' }),
          }))}>回看演示（算使用提示）</button>
          <button type="button" onClick={() => finish('skip')}>跳过这题</button>
        </> : <button type="button" onClick={() => setState(current => ({ ...current, stage: 'complete' }))}>查看本次结果</button>}
      </div>
    </>}
    {stage === 'complete' && <>
      <p className="learning-path__feedback" role="status">{transfer.result ? RESULT_LABELS[transfer.result] : '尚未完成'}</p>
      <p>提交了 {transfer.submittedIds.length} 次。{lesson.scope_note}</p>
      {transfer.result !== 'skipped' && <details open={transfer.result === 'revealed' ? true : undefined}>
        <summary>查看变式题计算过程</summary><CheckSolution question={lesson.transfer} />
      </details>}
      <details><summary>继续看原题演示</summary>{children}</details>
    </>}
    <p className="learning-path__muted">仅记录练习区操作，不上传作答或计入掌握度。刷新或换白板后清空；不能判断是否参考了正文或外部资料。</p>
  </div>
}
