import React from 'react'
import type { CheckQuestion, CheckState } from './checkState'

export function CheckOptions({ question, state, select }: {
  question: CheckQuestion; state: CheckState; select: (id: string) => void
}) {
  return <div className="learning-path__options" role="group" aria-label={question.prompt}>
    {question.options.map(option => <button
      type="button" key={option.id} aria-pressed={state.selectedId === option.id}
      disabled={state.result !== null} onClick={() => select(option.id)}
    >{option.label}</button>)}
  </div>
}

export function CheckSolution({ question }: { question: CheckQuestion }) {
  return <ol className="learning-path__solution">
    {question.solution.map(step => <li key={step}>{step}</li>)}
  </ol>
}
