import type { CheckResult, Evidence, Issue } from '../types'

const SITEMAP_POINTS = 25
const FRESHNESS_BONUS = 10 // included within SITEMAP_POINTS, not additive

export interface SitemapInput {
  origin: string
  sitemapUrl: string | null // resolved location, e.g. from robots.txt "Sitemap:" line or /sitemap.xml
  sitemapXml: { ok: boolean; text: string } | null
}

function extractLastmods(xml: string): Date[] {
  const dates: Date[] = []
  const re = /<lastmod>([^<]+)<\/lastmod>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(xml))) {
    const d = new Date(m[1])
    if (!Number.isNaN(d.getTime())) dates.push(d)
  }
  return dates
}

export function checkSitemap(input: SitemapInput): CheckResult {
  const issues: Issue[] = []
  const evidence: Evidence[] = []
  let score = 0

  if (!input.sitemapXml?.ok || !input.sitemapXml.text.trim()) {
    issues.push({
      id: 'sitemap-missing',
      category: 'technical',
      severity: 'high',
      message: 'sitemap.xml bulunamadı — arama motorları ve AI botları sayfaları keşfetmekte zorlanabilir.',
    })
    return { score, maxScore: SITEMAP_POINTS, issues, evidence }
  }

  const base = SITEMAP_POINTS - FRESHNESS_BONUS
  score += base
  const evidenceId = 'ev-sitemap'
  evidence.push({
    id: evidenceId,
    type: 'sitemap',
    source: input.sitemapUrl ?? `${input.origin}/sitemap.xml`,
    snippet: input.sitemapXml.text.slice(0, 400),
  })
  issues.push({
    id: 'sitemap-present',
    category: 'technical',
    severity: 'passed',
    message: 'Sitemap bulundu.',
    evidenceId,
  })

  const lastmods = extractLastmods(input.sitemapXml.text)
  if (lastmods.length > 0) {
    const newest = new Date(Math.max(...lastmods.map((d) => d.getTime())))
    const ageDays = (Date.now() - newest.getTime()) / 86_400_000
    if (ageDays <= 90) {
      score += FRESHNESS_BONUS
      issues.push({
        id: 'sitemap-fresh',
        category: 'technical',
        severity: 'passed',
        message: 'Sitemap yakın zamanda güncellenmiş.',
      })
    } else {
      issues.push({
        id: 'sitemap-stale',
        category: 'technical',
        severity: 'low',
        message: `Sitemap'teki en yeni tarih ${Math.round(ageDays)} gün önce — güncelliğini yitirmiş olabilir.`,
      })
    }
  }

  return { score, maxScore: SITEMAP_POINTS, issues, evidence }
}
