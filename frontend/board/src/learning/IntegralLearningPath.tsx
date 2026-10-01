import React, { useEffect, useRef, useState } from 'react'
import { RiemannSum, type RiemannSumData } from '../knowledge-scene/RiemannSum'
import { createCheckState, RESULT_LABELS, updateCheck } from './checkState'
import { CheckOptions as Options, CheckSolution as Solution } from './CheckParts'
import { INTEGRAL_LESSON_REVISION, INTEGRAL_PREDICTION, INTEGRAL_TRANSFER } from './integralLesson'
import './learning-path.css'

const DEMO: RiemannSumData = {
  mode: 'area_under_curve', expression: 'x^2', domain: [0, 1], range: [0, 1.12],
  n_initial: 4, n_min: 2, n_max: 64, sample: 'right', duration_ms: 11000,
}

export default function IntegralLearningPath({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState<'predict' | 'observe' | 'transfer' | 'complete'>('predict')
  const [prediction, setPrediction] = useState(createCheckState)
  const [transfer, setTransfer] = useState(createCheckState)
  const [reading, setReading] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const mountedRef = useRef(false)
  const boardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mountedRef.current) {
      headingRef.current?.focus({ preventScroll: true })
      headingRef.current?.scrollIntoView({ block: 'start' })
    }
    mountedRef.current = true
  }, [stage])

  const predict = (skip: boolean) => {
    setPrediction(current => updateCheck(INTEGRAL_PREDICTION, current, { type: skip ? 'skip' : 'submit' }))
    setStage('observe')
  }
  const beginTransfer = () => {
    setReading(false)
    setStage('transfer')
  }
  const reveal = () => {
    setTransfer(current => updateCheck(INTEGRAL_TRANSFER, current, { type: 'reveal' }))
    setStage('complete')
  }
  const toggleBoard = () => {
    const opening = !reading
    if (opening && stage === 'predict') predict(true)
    if (opening && stage === 'transfer') {
      setTransfer(current => updateCheck(INTEGRAL_TRANSFER, current, { type: 'hint' }))
    }
    setReading(opening)
    if (opening) requestAnimationFrame(() => boardRef.current?.scrollIntoView({ block: 'start' }))
  }
  const predictionFeedback = INTEGRAL_PREDICTION.options.find(option => option.id === prediction.feedbackId)
  const transferFeedback = INTEGRAL_TRANSFER.options.find(option => option.id === transfer.feedbackId)
  const step = stage === 'predict' ? 0 : stage === 'observe' ? 1 : 2

  return <div className="integral-learning" data-lesson-revision={INTEGRAL_LESSON_REVISION}>
    <section className="learning-path" data-stage={stage} aria-label="定积分小练习">
      <div className="learning-path__eyebrow">定积分 · 一个短练习</div>
      <ol className="learning-path__steps" aria-label="练习进度">
        {['做个预测', '看图核对', '换题试试'].map((label, index) => <li
          key={label} aria-current={index === step ? 'step' : undefined}
        ><span>{index + 1}</span>{label}</li>)}
      </ol>
      <h2 ref={headingRef} tabIndex={-1}>{stage === 'predict' ? '矩形更多，总面积就更大吗？'
        : stage === 'observe' ? '看一看多算的面积去了哪里'
          : stage === 'transfer' ? '换个函数、换个区间，你来算一次'
            : '这道变式题做到了哪一步'}</h2>

      {stage === 'predict' && <>
        <p>{INTEGRAL_PREDICTION.prompt}</p>
        <Options question={INTEGRAL_PREDICTION} state={prediction} select={id => {
          setPrediction(current => updateCheck(INTEGRAL_PREDICTION, current, { type: 'select', id }))
        }} />
        <div className="learning-path__actions">
          <button type="button" className="learning-path__primary" disabled={!prediction.selectedId} onClick={() => predict(false)}>提交预测</button>
          <button type="button" onClick={() => predict(true)}>跳过预测，看讲解</button>
        </div>
      </>}

      {stage === 'observe' && <>
        <p className="learning-path__feedback" role="status">{predictionFeedback?.feedback ?? '没有提交预测也没关系。拖动分割数，比较矩形和与曲线下面积。'}</p>
        <div className="learning-path__observation">
          <div><RiemannSum data={DEMO} /><p className="learning-path__muted">可以暂停或直接拖动分割数；不需要看完整段动画。</p></div>
          <aside aria-label="这个例子的结论和推导">
            <h3>这个例子的结论</h3>
            <p>右端点矩形和偏大。把每段一分为二后，多算的面积变少，矩形和向 1/3 靠近。</p>
            <p className="learning-path__muted">这里讨论的是 [0, 1] 上的 x² 和右端点取样，不是所有函数、所有取样方式都会从上方逼近。</p>
            <details><summary>展开完整推导</summary><Solution question={INTEGRAL_PREDICTION} /></details>
          </aside>
        </div>
        <div className="learning-path__actions">
          <button type="button" className="learning-path__primary" onClick={beginTransfer}>{transfer.submittedIds.length || transfer.hintUsed ? '回到变式题' : '换一道题试试'}</button>
          <button type="button" onClick={() => {
            setTransfer(current => updateCheck(INTEGRAL_TRANSFER, current, { type: 'skip' }))
            setStage('complete')
          }}>暂不做变式题</button>
        </div>
      </>}

      {stage === 'transfer' && <>
        <p>{INTEGRAL_TRANSFER.prompt}</p>
        <Options question={INTEGRAL_TRANSFER} state={transfer} select={id => {
          setTransfer(current => updateCheck(INTEGRAL_TRANSFER, current, { type: 'select', id }))
        }} />
        {transferFeedback && <p className="learning-path__feedback" role="status">{transferFeedback.feedback}</p>}
        {transfer.hintUsed && <p className="learning-path__hint">提示：{INTEGRAL_TRANSFER.hint}</p>}
        {transfer.result && <p role="status">{RESULT_LABELS[transfer.result]}</p>}
        <div className="learning-path__actions">
          {!transfer.result ? <>
            <button type="button" className="learning-path__primary" disabled={!transfer.selectedId} onClick={() => {
              setTransfer(current => updateCheck(INTEGRAL_TRANSFER, current, { type: 'submit' }))
            }}>提交答案</button>
            <button type="button" onClick={() => setTransfer(current => updateCheck(INTEGRAL_TRANSFER, current, { type: 'hint' }))}>给一点提示</button>
            <button type="button" onClick={reveal}>直接看答案</button>
            <button type="button" onClick={() => {
              setTransfer(current => updateCheck(INTEGRAL_TRANSFER, current, { type: 'hint' }))
              setStage('observe')
            }}>回看演示（算使用提示）</button>
            <button type="button" onClick={() => {
              setTransfer(current => updateCheck(INTEGRAL_TRANSFER, current, { type: 'skip' }))
              setStage('complete')
            }}>跳过这题</button>
          </> : <button type="button" className="learning-path__primary" onClick={() => setStage('complete')}>查看本次结果</button>}
        </div>
      </>}

      {stage === 'complete' && <>
        <p className="learning-path__feedback" role="status">{transfer.result ? RESULT_LABELS[transfer.result] : '尚未完成变式题'}</p>
        <p>提交了 {transfer.submittedIds.length} 次{transfer.hintUsed ? '，用过提示或回看资料' : '，未使用提示'}。这只描述本页的作答过程，不代表已经掌握这个知识点。</p>
        {transfer.result !== 'skipped' ? <div className="learning-path__review">
          <p>结论：S₄ = 5，I = 4。有限矩形和与定积分要分开计算。</p>
          <details open={transfer.result === 'revealed' ? true : undefined}>
            <summary>查看变式题的完整推导</summary><Solution question={INTEGRAL_TRANSFER} />
          </details>
        </div> : <p>没有把跳过记成答错或答对。你可以继续阅读完整白板。</p>}
      </>}

      <div className="learning-path__footer">
        <button type="button" aria-expanded={reading} aria-controls="integral-full-board" onClick={toggleBoard}>{reading ? '收起完整白板' : '直接看完整白板'}</button>
        <small>练习不调用模型，不上传作答。刷新或切换白板会清空练习记录。</small>
      </div>
    </section>
    {reading && <div id="integral-full-board" ref={boardRef} className="learning-path__full-board">{children}</div>}
  </div>
}
