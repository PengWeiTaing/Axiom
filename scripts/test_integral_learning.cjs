/* Offline checks for the authored lesson and page-local attempt reducer. */
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const Module = require('node:module')
const ts = require('../frontend/board/node_modules/typescript')

function loadTS(relative) {
  const filename = path.resolve(__dirname, '../frontend/board/src/learning', relative)
  const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: filename,
  })
  const loaded = new Module(filename, module)
  loaded._compile(output.outputText, filename)
  return loaded.exports
}

const { createCheckState, updateCheck } = loadTS('checkState.ts')
const { INTEGRAL_PREDICTION: prediction, INTEGRAL_TRANSFER: transfer, TRANSFER_EXAMPLE: example, supportsIntegralPractice } = loadTS('integralLesson.ts')
const { getComputedIntegralLesson } = loadTS('computedIntegral.ts')
const { isNumericalCancellation } = loadTS('../knowledge-scene/numericalReadout.ts')
let checks = 0
function test(name, check) { check(); checks++; console.log(`PASS ${name}`) }
const act = (state, action) => updateCheck(transfer, state, action)
const answer = (state, id) => act(act(state, { type: 'select', id }), { type: 'submit' })

test('empty or unknown answers are not attempts', () => {
  const initial = createCheckState()
  assert.equal(act(initial, { type: 'submit' }), initial)
  assert.equal(act(initial, { type: 'select', id: 'invented' }), initial)
  assert.equal(initial.submittedIds.length, 0)
})
test('correct first answer is independent within this page', () => {
  const state = answer(createCheckState(), transfer.answerId)
  assert.equal(state.result, 'independent')
  assert.deepEqual(state.submittedIds, [transfer.answerId])
})
test('wrong answer does not claim completion', () => {
  const state = answer(createCheckState(), 'no-width')
  assert.equal(state.result, null)
  assert.equal(state.feedbackId, 'no-width')
  assert.equal(state.selectedId, null)
})
test('correcting a wrong answer is not first-try success', () => {
  const state = answer(answer(createCheckState(), 'no-width'), transfer.answerId)
  assert.equal(state.result, 'corrected')
  assert.equal(state.submittedIds.length, 2)
})
test('all incorrect options have distinct actionable feedback', () => {
  const wrong = transfer.options.filter(option => option.id !== transfer.answerId)
  assert.equal(new Set(wrong.map(option => option.feedback)).size, wrong.length)
  for (const option of wrong) assert.equal(answer(createCheckState(), option.id).result, null)
})
test('hint and reference viewing make later success assisted', () => {
  const state = answer(act(createCheckState(), { type: 'hint' }), transfer.answerId)
  assert.equal(state.result, 'assisted')
  assert.equal(state.hintUsed, true)
})
test('hint after an error remains assisted', () => {
  const state = answer(act(answer(createCheckState(), 'exact'), { type: 'hint' }), transfer.answerId)
  assert.equal(state.result, 'assisted')
  assert.equal(state.submittedIds.length, 2)
})
test('revealing then choosing the right answer cannot become success', () => {
  const state = act(createCheckState(), { type: 'reveal' })
  assert.equal(state.result, 'revealed')
  assert.equal(state.answerRevealed, true)
  assert.equal(answer(state, transfer.answerId), state)
  assert.equal(state.submittedIds.length, 0)
})
test('skipping is neither correct nor wrong', () => {
  const state = act(createCheckState(), { type: 'skip' })
  assert.equal(state.result, 'skipped')
  assert.equal(state.submittedIds.length, 0)
  assert.equal(answer(state, transfer.answerId), state)
})
test('skip after a mistake preserves attempts', () => {
  const state = act(answer(createCheckState(), 'finite'), { type: 'skip' })
  assert.equal(state.result, 'skipped')
  assert.deepEqual(state.submittedIds, ['finite'])
})
test('double submission does not double count', () => {
  for (const id of ['right', 'no-width']) {
    const state = answer(createCheckState(), id)
    assert.equal(act(state, { type: 'submit' }), state)
    assert.equal(state.submittedIds.length, 1)
  }
})
test('reading after completion does not rewrite earlier evidence', () => {
  const state = answer(createCheckState(), transfer.answerId)
  for (const type of ['hint', 'reveal', 'skip']) assert.equal(act(state, { type }), state)
})
test('new page state does not reuse another question state', () => {
  const state = answer(createCheckState(), 'no-width')
  assert.equal(createCheckState().submittedIds.length, 0)
  assert.equal(state.submittedIds.length, 1)
})
test('prediction values independently match right Riemann sums', () => {
  const sum = n => Array.from({ length: n }, (_, i) => ((i + 1) / n) ** 2 / n).reduce((a, b) => a + b)
  assert.equal(sum(4), 15 / 32)
  assert.equal(sum(8), 51 / 128)
  assert(sum(4) > sum(8) && sum(8) > 1 / 3)
  assert.equal(prediction.answerId, 'refine')
})
test('transfer answer independently follows stated function and bounds', () => {
  const [a, b] = example.domain
  const dx = (b - a) / example.partitions
  const sum = Array.from({ length: example.partitions }, (_, i) => example.slope * (a + (i + 1) * dx) * dx).reduce((a, b) => a + b)
  const integral = example.slope / 2 * (b * b - a * a)
  const correct = example.choices.filter(choice => choice.sum === sum && choice.integral === integral)
  assert.equal(sum, 5)
  assert.equal(integral, 4)
  assert.equal(correct.length, 1)
  assert.equal(correct[0].id, transfer.answerId)
})
test('only the reviewed general-area scene gets this lesson', () => {
  const scene = { template_id: 'calculus_area_v1', renderer: { kind: 'static_html', src: '/static/board/knowledge-scenes/calculus-area.html' } }
  assert(supportsIntegralPractice(scene))
  assert(!supportsIntegralPractice({ ...scene, template_id: 'custom-integral' }))
  assert(!supportsIntegralPractice({ ...scene, renderer: { kind: 'structured_scene' } }))
  assert(!supportsIntegralPractice({ ...scene, renderer: { kind: 'static_html', src: '/sin.html' } }))
})
for (const question of [prediction, transfer]) {
  test(`${question.id} has a single answer and complete explanations`, () => {
    assert.equal(new Set(question.options.map(option => option.id)).size, question.options.length)
    assert.equal(question.options.filter(option => option.id === question.answerId).length, 1)
    assert(question.hint && question.solution.length >= 4)
    assert(question.options.every(option => option.label && option.feedback))
  })
}
const computedId = 'integral-0123456789abcdef0123'
const computedSource = { expression: 'x^2', domain: [0, 2], sample: 'midpoint', n_initial: 8 }
const computedDemo = {
  kind: 'riemann_sum', data: { ...computedSource, mode: 'area_under_curve', n_min: 2, n_max: 64 },
  practice: {
    version: '1.0', generator: 'axiom-rational-integral-v1', id: computedId,
    source: computedSource,
    prediction: { ...prediction, id: `${computedId}-predict` },
    transfer: { ...transfer, id: `${computedId}-transfer` },
    conclusion: 'shape check fixture, not an arithmetic oracle', scope_note: 'local only',
  },
}
test('computed practice validates shape and exact demo binding', () => {
  assert(getComputedIntegralLesson(computedDemo))
  for (const [key, value] of [['expression', 'sin(x)'], ['domain', [0, 1]], ['sample', 'left'], ['n_initial', 4], ['n_min', 9], ['n_max', 7], ['mode', 'unknown']]) {
    assert.equal(getComputedIntegralLesson({ ...computedDemo, data: { ...computedDemo.data, [key]: value } }), null)
  }
})
test('malformed cached practice safely falls back to the original demo', () => {
  for (const bad of [null, [], {}, { ...computedDemo.practice, version: '2.0' }, { ...computedDemo.practice, generator: 'model' }]) {
    assert.equal(getComputedIntegralLesson({ ...computedDemo, practice: bad }), null)
  }
  const bad = structuredClone(computedDemo)
  bad.practice.transfer.answerId = 'invented'
  assert.equal(getComputedIntegralLesson(bad), null)
  bad.practice.transfer = { ...computedDemo.practice.transfer, options: [transfer.options[0], transfer.options[0]] }
  assert.equal(getComputedIntegralLesson(bad), null)
  bad.practice.transfer = { ...computedDemo.practice.transfer, id: 'another-question' }
  assert.equal(getComputedIntegralLesson(bad), null)
})
test('trig practice requires its explicit-bound marker and labels', () => {
  const item = structuredClone(computedDemo)
  const id = 'trig-integral-0123456789abcdef0123'
  item.practice.id = id
  item.practice.generator = 'axiom-trig-signed-area-v1'
  item.practice.prediction.id = `${id}-predict`
  item.practice.transfer.id = `${id}-transfer`
  item.practice.source.bound_origin = 'explicit_request'
  item.practice.source.domain_labels = ['0', '2π']
  item.practice.source.expression = item.data.expression = 'sin(x)'
  item.practice.source.domain = item.data.domain = [0, 2 * Math.PI]
  assert(getComputedIntegralLesson(item))
  delete item.practice.source.bound_origin
  assert.equal(getComputedIntegralLesson(item), null)
  item.practice.source.bound_origin = 'explicit_request'
  item.practice.source.domain_labels = ['0', '3.14']
  assert.equal(getComputedIntegralLesson(item), null)
})
test('near-zero display distinguishes cancellation from genuinely tiny integrals', () => {
  assert(isNumericalCancellation(5e-16, 4))
  assert(isNumericalCancellation(-5e-16, 4))
  assert(!isNumericalCancellation(1e-16, 1e-16))
  assert(!isNumericalCancellation(1e-8, 4))
  assert(!isNumericalCancellation(null, 4))
  assert(!isNumericalCancellation(0, null))
  assert(!isNumericalCancellation(0, Infinity))
})
console.log(`OK: ${checks} integral learning checks; no network or credential access.`)
