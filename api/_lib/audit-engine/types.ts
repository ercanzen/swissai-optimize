export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'passed'
export type Category = 'geo' | 'technical' | 'content' | 'ai_visibility'
export type EvidenceType = 'robots_txt' | 'meta_tag' | 'schema_ld_json' | 'sitemap' | 'content_snippet' | 'llm_response'

export interface Evidence {
  id: string
  type: EvidenceType
  source: string
  snippet: string
}

export interface Recommendation {
  id: string
  title: string
  impact: 'high' | 'medium' | 'low'
  relatedIssueIds: string[]
}

export interface Issue {
  id: string
  category: Category
  severity: Severity
  message: string
  evidenceId?: string
  recommendationId?: string
}

export interface Competitor {
  name: string
  domain?: string
  mentionedBy?: string
}

/** What one check contributes: its share of the category score plus the findings that justify it. */
export interface CheckResult {
  score: number
  maxScore: number
  issues: Issue[]
  evidence: Evidence[]
}

export interface AuditReport {
  overall_score: number
  geo_score: number
  technical_score: number
  content_score: number
  ai_visibility_score: number | null
  issues: Issue[]
  recommendations: Recommendation[]
  evidence: Evidence[]
  competitors: Competitor[]
}

export interface FetchedPage {
  ok: boolean
  status: number
  html: string
}
