import React, { createContext, useCallback, useContext, useState } from 'react'
import { createCheckState, type CheckState } from './checkState'

export interface PracticeSession {
  stage: 'predict' | 'observe' | 'transfer' | 'complete'
  prediction: CheckState
  transfer: CheckState
}
type Updater = (state: PracticeSession) => PracticeSession
const Sessions = createContext<{
  states: Record<string, PracticeSession>
  update: (key: string, updater: Updater) => void
} | null>(null)

function initial(): PracticeSession {
  return { stage: 'predict', prediction: createCheckState(), transfer: createCheckState() }
}

// Lives above the wide/narrow layout branches: resizing must not erase a hint
// or turn a second attempt into first-try success. Resets with the scene only.
export function ComputedPracticeProvider({ children }: { children: React.ReactNode }) {
  const [states, setStates] = useState<Record<string, PracticeSession>>({})
  const update = useCallback((key: string, updater: Updater) => {
    setStates(current => ({ ...current, [key]: updater(current[key] ?? initial()) }))
  }, [])
  return <Sessions.Provider value={{ states, update }}>{children}</Sessions.Provider>
}

export function useComputedPracticeSession(key: string): [PracticeSession, (updater: Updater) => void] {
  const context = useContext(Sessions)
  if (!context) throw new Error('Computed practice requires a scene session')
  const { update } = context
  const setState = useCallback((updater: Updater) => update(key, updater), [key, update])
  return [context.states[key] ?? initial(), setState]
}
