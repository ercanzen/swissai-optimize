import type { CheckResult, Evidence, Issue, Recommendation } from './types'

/** Overall = weighted mean of the three free categories. ai_visibility_score is excluded while it's
 *  null (no Anthropic credit) — a missing measurement must never silently drag the score down. */
export const OVERALL_WEIGHTS = { technical: 0.35, geo: 0.35, content: 0.3 } as const

export function combineCategory(results: CheckResult[]): { score: number; issues: Issue[]; evidence: Evidence[] } {
  const totalScore = results.reduce((sum, r) => sum + r.score, 0)
  const totalMax = results.reduce((sum, r) => sum + r.maxScore, 0)
  const score = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0
  return {
    score: Math.max(0, Math.min(100, score)),
    issues: results.flatMap((r) => r.issues),
    evidence: results.flatMap((r) => r.evidence),
  }
}

export function computeOverallScore(technical: number, geo: number, content: number): number {
  const weighted = technical * OVERALL_WEIGHTS.technical + geo * OVERALL_WEIGHTS.geo + content * OVERALL_WEIGHTS.content
  return Math.round(weighted)
}

const SEVERITY_IMPACT: Record<string, 'high' | 'medium' | 'low' | null> = {
  critical: 'high',
  high: 'high',
  medium: 'medium',
  low: 'low',
  passed: null,
}

const SEVERITY_RANK: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3, passed: 4 }

/** Builds one recommendation per open issue and wires issue<->recommendation back-references.
 *  Mutates the issue objects in place (sets recommendationId) — call once, after all issues are collected. */
export function buildRecommendations(issues: Issue[]): Recommendation[] {
  const recommendations: Recommendation[] = []
  for (const issue of issues) {
    const impact = SEVERITY_IMPACT[issue.severity]
    if (!impact) continue // "passed" issues don't need a recommendation
    const id = `rec-${issue.id}`
    issue.recommendationId = id
    recommendations.push({
      id,
      title: issue.message,
      impact,
      relatedIssueIds: [issue.id],
    })
  }
  return recommendations
}

/** Sorts issues worst-first so the UI can render Critical → High → Medium → Low → Passed. */
export function sortIssuesBySeverity(issues: Issue[]): Issue[] {
  return [...issues].sort((a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity])
}
