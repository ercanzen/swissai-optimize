import * as cheerio from 'cheerio'
import type { CheckResult, Evidence, Issue } from '../types'

export interface HeadInfo {
  title: string
  description: string
  canonical: string
  robotsMeta: string
  ogTitle: string
  ogDescription: string
  twitterCard: string
}

export function extractHeadInfo(html: string): HeadInfo {
  const $ = cheerio.load(html)
  return {
    title: $('head > title').first().text().trim(),
    description: $('meta[name="description"]').attr('content')?.trim() ?? '',
    canonical: $('link[rel="canonical"]').attr('href')?.trim() ?? '',
    robotsMeta: $('meta[name="robots"]').attr('content')?.trim() ?? '',
    ogTitle: $('meta[property="og:title"]').attr('content')?.trim() ?? '',
    ogDescription: $('meta[property="og:description"]').attr('content')?.trim() ?? '',
    twitterCard: $('meta[name="twitter:card"]').attr('content')?.trim() ?? '',
  }
}

// --- technical category: canonical + robots-meta hygiene (15 pts) ---

const TECH_HYGIENE_POINTS = 15

export function checkTechnicalMetaHygiene(head: HeadInfo): CheckResult {
  const issues: Issue[] = []
  let score = 0

  if (head.canonical) {
    score += 8
    issues.push({ id: 'canonical-present', category: 'technical', severity: 'passed', message: 'Canonical URL tanımlı.' })
  } else {
    issues.push({
      id: 'canonical-missing',
      category: 'technical',
      severity: 'medium',
      message: 'Canonical URL eksik — arama/AI motorları hangi sayfanın asıl kaynak olduğundan emin olamayabilir.',
    })
  }

  if (/noindex/i.test(head.robotsMeta)) {
    issues.push({
      id: 'robots-meta-noindex',
      category: 'technical',
      severity: 'critical',
      message: `Sayfa meta etiketiyle "noindex" işaretlenmiş (${head.robotsMeta}) — arama/AI motorları bu sayfayı göz ardı edebilir.`,
    })
  } else {
    score += 7
    issues.push({ id: 'robots-meta-ok', category: 'technical', severity: 'passed', message: 'Sayfa indexlenmeye kapatılmamış.' })
  }

  return { score, maxScore: TECH_HYGIENE_POINTS, issues, evidence: [] }
}

// --- geo category: title/description/OG quality (40 pts) ---

const META_QUALITY_POINTS = 30
const SOCIAL_TAGS_POINTS = 10

export function checkMetaQuality(head: HeadInfo): CheckResult {
  const issues: Issue[] = []
  const evidence: Evidence[] = []
  let score = 0

  const evidenceId = 'ev-meta-tags'
  evidence.push({
    id: evidenceId,
    type: 'meta_tag',
    source: 'head',
    snippet: `title="${head.title}" · description="${head.description}"`,
  })

  if (head.title.length >= 10 && head.title.length <= 65) {
    score += 15
    issues.push({ id: 'title-ok', category: 'geo', severity: 'passed', message: 'Sayfa başlığı uygun uzunlukta.', evidenceId })
  } else if (!head.title) {
    issues.push({ id: 'title-missing', category: 'geo', severity: 'critical', message: '<title> etiketi eksik.', evidenceId })
  } else {
    score += 5
    issues.push({
      id: 'title-length',
      category: 'geo',
      severity: 'medium',
      message: `Sayfa başlığı ${head.title.length} karakter — 10-65 karakter aralığı önerilir.`,
      evidenceId,
    })
  }

  if (head.description.length >= 50 && head.description.length <= 160) {
    score += 15
    issues.push({ id: 'description-ok', category: 'geo', severity: 'passed', message: 'Meta açıklama uygun uzunlukta.', evidenceId })
  } else if (!head.description) {
    issues.push({ id: 'description-missing', category: 'geo', severity: 'high', message: 'Meta açıklama (description) eksik.', evidenceId })
  } else {
    score += 6
    issues.push({
      id: 'description-length',
      category: 'geo',
      severity: 'low',
      message: `Meta açıklama ${head.description.length} karakter — 50-160 karakter aralığı önerilir.`,
      evidenceId,
    })
  }

  const hasOg = !!(head.ogTitle && head.ogDescription)
  if (hasOg) {
    score += 6
    issues.push({ id: 'og-tags-ok', category: 'geo', severity: 'passed', message: 'Open Graph etiketleri mevcut.' })
  } else {
    issues.push({
      id: 'og-tags-missing',
      category: 'geo',
      severity: 'low',
      message: 'Open Graph etiketleri (og:title/og:description) eksik veya yetersiz.',
    })
  }

  if (head.twitterCard) {
    score += 4
    issues.push({ id: 'twitter-card-ok', category: 'geo', severity: 'passed', message: 'Twitter Card etiketi mevcut.' })
  } else {
    issues.push({ id: 'twitter-card-missing', category: 'geo', severity: 'low', message: 'Twitter Card etiketi eksik.' })
  }

  return { score, maxScore: META_QUALITY_POINTS + SOCIAL_TAGS_POINTS, issues, evidence }
}
