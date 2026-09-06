import { describe, expect, it } from 'vitest'
import { combineCategory, computeOverallScore, buildRecommendations, sortIssuesBySeverity } from './scoring'
import type { CheckResult, Issue } from './types'

describe('combineCategory', () => {
  it('sums scores and max scores across checks into a 0-100 percentage', () => {
    const results: CheckResult[] = [
      { score: 50, maxScore: 100, issues: [], evidence: [] },
      { score: 25, maxScore: 100, issues: [], evidence: [] },
    ]
    expect(combineCategory(results).score).toBe(38) // 75/200 -> 37.5 -> rounds to 38
  })

  it('returns 0 when there is no max score to divide by', () => {
    expect(combineCategory([]).score).toBe(0)
  })

  it('flattens issues and evidence from every check', () => {
    const issueA: Issue = { id: 'a', category: 'technical', severity: 'high', message: 'a' }
    const issueB: Issue = { id: 'b', category: 'technical', severity: 'low', message: 'b' }
    const results: CheckResult[] = [
      { score: 0, maxScore: 10, issues: [issueA], evidence: [] },
      { score: 0, maxScore: 10, issues: [issueB], evidence: [] },
    ]
    expect(combineCategory(results).issues).toEqual([issueA, issueB])
  })
})

describe('computeOverallScore', () => {
  it('weights technical/geo at 0.35 and content at 0.30', () => {
    expect(computeOverallScore(100, 100, 100)).toBe(100)
    expect(computeOverallScore(0, 0, 0)).toBe(0)
    expect(computeOverallScore(100, 0, 0)).toBe(35)
  })
})

describe('buildRecommendations', () => {
  it('creates one recommendation per non-passed issue and links them back', () => {
    const issues: Issue[] = [
      { id: 'i1', category: 'technical', severity: 'critical', message: 'Critical thing' },
      { id: 'i2', category: 'content', severity: 'passed', message: 'All good' },
    ]
    const recs = buildRecommendations(issues)
    expect(recs).toHaveLength(1)
    expect(recs[0].impact).toBe('high')
    expect(issues[0].recommendationId).toBe(recs[0].id)
    expect(issues[1].recommendationId).toBeUndefined()
  })
})

describe('sortIssuesBySeverity', () => {
  it('orders critical > high > medium > low > passed', () => {
    const issues: Issue[] = [
      { id: '1', category: 'technical', severity: 'passed', message: '' },
      { id: '2', category: 'technical', severity: 'low', message: '' },
      { id: '3', category: 'technical', severity: 'critical', message: '' },
      { id: '4', category: 'technical', severity: 'medium', message: '' },
      { id: '5', category: 'technical', severity: 'high', message: '' },
    ]
    expect(sortIssuesBySeverity(issues).map((i) => i.severity)).toEqual(['critical', 'high', 'medium', 'low', 'passed'])
  })
})
