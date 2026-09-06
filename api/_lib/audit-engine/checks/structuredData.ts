import * as cheerio from 'cheerio'
import type { CheckResult, Evidence, Issue } from '../types.js'

const PRESENCE_POINTS = 20
const TYPE_COVERAGE_POINTS = 25
const FAQ_SCHEMA_POINTS = 15

const VALUABLE_TYPES = ['Organization', 'LocalBusiness', 'Article', 'BreadcrumbList', 'Person', 'Product', 'Service']

function flattenTypes(json: unknown, out: string[]): void {
  if (Array.isArray(json)) {
    for (const item of json) flattenTypes(item, out)
    return
  }
  if (json && typeof json === 'object') {
    const obj = json as Record<string, unknown>
    const t = obj['@type']
    if (typeof t === 'string') out.push(t)
    else if (Array.isArray(t)) out.push(...t.filter((x): x is string => typeof x === 'string'))
    if (Array.isArray(obj['@graph'])) flattenTypes(obj['@graph'], out)
  }
}

export function checkStructuredData(html: string): CheckResult {
  const $ = cheerio.load(html)
  const issues: Issue[] = []
  const evidence: Evidence[] = []
  let score = 0

  const blocks = $('script[type="application/ld+json"]')
  if (blocks.length === 0) {
    issues.push({
      id: 'schema-missing',
      category: 'geo',
      severity: 'critical',
      message: 'Yapılandırılmış veri (JSON-LD schema.org) bulunamadı — AI motorları içeriği doğru sınıflandıramayabilir.',
    })
    return { score, maxScore: PRESENCE_POINTS + TYPE_COVERAGE_POINTS + FAQ_SCHEMA_POINTS, issues, evidence }
  }

  score += PRESENCE_POINTS
  const rawSnippet = $(blocks[0]).text().trim().slice(0, 400)
  const evidenceId = 'ev-schema'
  evidence.push({ id: evidenceId, type: 'schema_ld_json', source: 'JSON-LD', snippet: rawSnippet })
  issues.push({ id: 'schema-present', category: 'geo', severity: 'passed', message: 'Yapılandırılmış veri mevcut.', evidenceId })

  const allTypes: string[] = []
  let parseErrors = 0
  blocks.each((_, el) => {
    try {
      const json = JSON.parse($(el).text())
      flattenTypes(json, allTypes)
    } catch {
      parseErrors++
    }
  })

  if (parseErrors > 0 && allTypes.length === 0) {
    issues.push({
      id: 'schema-invalid-json',
      category: 'geo',
      severity: 'high',
      message: 'JSON-LD bloğu geçersiz JSON içeriyor — ayrıştırılamadı.',
      evidenceId,
    })
  }

  const covered = VALUABLE_TYPES.filter((t) => allTypes.includes(t))
  if (covered.length > 0) {
    score += Math.round(TYPE_COVERAGE_POINTS * Math.min(1, covered.length / 3))
    issues.push({
      id: 'schema-types-covered',
      category: 'geo',
      severity: covered.length >= 2 ? 'passed' : 'low',
      message: `Tanımlı schema türleri: ${covered.join(', ')}.`,
      evidenceId,
    })
  } else {
    issues.push({
      id: 'schema-types-generic',
      category: 'geo',
      severity: 'medium',
      message: 'Schema bulundu ama Organization/LocalBusiness/Article gibi değerli türler tanımlı değil.',
      evidenceId,
    })
  }

  const hasFaq = allTypes.some((t) => t === 'FAQPage' || t === 'QAPage')
  if (hasFaq) {
    score += FAQ_SCHEMA_POINTS
    issues.push({ id: 'faq-schema-present', category: 'geo', severity: 'passed', message: 'FAQPage yapılandırılmış verisi mevcut.', evidenceId })
  } else {
    issues.push({
      id: 'faq-schema-missing',
      category: 'geo',
      severity: 'low',
      message: 'FAQPage schema yok — sıkça sorulan sorular varsa işaretlenmesi AI motorlarında görünürlüğü artırır.',
    })
  }

  return { score, maxScore: PRESENCE_POINTS + TYPE_COVERAGE_POINTS + FAQ_SCHEMA_POINTS, issues, evidence }
}
