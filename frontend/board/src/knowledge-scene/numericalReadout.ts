// A cancellation residue is only below display resolution relative to the
// total absolute contribution. Do not turn genuinely tiny positive integrals
// into zero, and do not use this display heuristic to grade any answer.
export function isNumericalCancellation(value: number | null, absoluteTotal: number | null): boolean {
  return value !== null && absoluteTotal !== null
    && Number.isFinite(value) && Number.isFinite(absoluteTotal) && absoluteTotal > 0
    && Math.abs(value) <= 64 * Number.EPSILON * absoluteTotal
}
