import type { CheckQuestion } from './checkState'

export const INTEGRAL_LESSON_REVISION = 'integral-practice-v1'

// This authored lesson accompanies only the existing general-area demo.
// A custom integral (sin, other bounds, etc.) must keep its own scene.
export function supportsIntegralPractice(scene: {
  template_id: string
  renderer: { kind: string; src?: string }
}): boolean {
  return scene.template_id === 'calculus_area_v1'
    && scene.renderer.kind === 'static_html'
    && scene.renderer.src === '/static/board/knowledge-scenes/calculus-area.html'
}

export const INTEGRAL_PREDICTION: CheckQuestion = {
  id: 'quadratic-right-refinement-v1',
  prompt: 'y = x²，区间 [0, 1]。每段用右端点的函数值当矩形高度。把 4 个矩形细分成 8 个，矩形面积之和会怎样？',
  options: [
    { id: 'count', label: '变大，因为矩形数量翻倍了', feedback: '矩形变多的同时，每块的宽度也减半了。不能只数矩形；要比较所有“高度 × 宽度”的和。' },
    { id: 'refine', label: '变小，但仍大于曲线下的面积', feedback: '判断正确。x² 在这个区间递增，右端点矩形盖住了曲线上方的一小块；细分后，这些多出来的面积减少了。' },
    { id: 'exact', label: '不变，两次都等于曲线下的面积', feedback: '有限个矩形还没有贴合曲线。右端点取样会多算一部分面积；分割加密时，多算的部分才逐渐缩小。' },
  ],
  answerId: 'refine',
  hint: '比较一个旧矩形和细分后的两个矩形：右边的小矩形高度不变，左边的小矩形变矮了。',
  solution: [
    '每块宽度 Δx = 1/n；第 i 块的右端点是 i/n，高度是 (i/n)²。',
    '所以 Sₙ = Σ(i/n)² · (1/n)，其中 i 从 1 到 n。',
    'S₄ = 15/32 = 0.46875；S₈ = 51/128 = 0.3984375。',
    '∫₀¹ x² dx = [x³/3]₀¹ = 1/3。两次矩形和都偏大，细分后更接近 1/3。',
  ],
}

export const TRANSFER_EXAMPLE = {
  slope: 2, domain: [0, 2] as const, partitions: 4,
  choices: [
    { id: 'no-width', sum: 10, integral: 4 },
    { id: 'exact', sum: 4, integral: 4 },
    { id: 'right', sum: 5, integral: 4 },
    { id: 'finite', sum: 5, integral: 5 },
  ],
}

const transferFeedback: Record<string, string> = {
  'no-width': '你把矩形的高度加起来了。每块面积还要乘上它的宽度；这里区间长度为 2，被分成 4 份。',
  exact: '曲线下的面积和有限个右端点矩形的面积之和不是同一个量。递增直线的右端点矩形仍会多算一点。',
  right: '两个量都算对了：有限矩形和是近似值，曲线下的面积是定积分。',
  finite: '矩形和的计算没问题，但不能把它直接当作定积分值。想一想直线与横轴围出的是什么图形。',
}

export const INTEGRAL_TRANSFER: CheckQuestion = {
  id: 'linear-right-transfer-v1',
  prompt: '换成 y = 2x，区间也换成 [0, 2]，等分成 4 段，仍取右端点。矩形面积之和 S₄ 和定积分 I 分别是多少？',
  options: TRANSFER_EXAMPLE.choices.map(choice => ({
    id: choice.id, label: `S₄ = ${choice.sum}，I = ${choice.integral}`,
    feedback: transferFeedback[choice.id],
  })),
  answerId: 'right',
  hint: '把“宽度、4 个右端点、4 个高度”分别写出来。矩形和要乘宽度；定积分也可以用三角形面积核对。',
  solution: [
    '每段宽度 Δx = (2 − 0)/4 = 1/2。',
    '右端点是 1/2、1、3/2、2；代入 y = 2x，高度是 1、2、3、4。',
    'S₄ = (1 + 2 + 3 + 4) × 1/2 = 5。',
    'I = ∫₀² 2x dx = [x²]₀² = 4，也等于底为 2、高为 4 的三角形面积。',
    '右端点矩形多算了 1。对这条直线，继续细分时 Sₙ = 4 + 4/n，趋向 4。',
  ],
}
