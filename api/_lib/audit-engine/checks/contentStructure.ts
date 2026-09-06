import * as cheerio from 'cheerio'
import type { CheckResult, Evidence, Issue } from '../types.js'

const HEADING_POINTS = 25
const QUESTION_HEADING_POINTS = 20
const READABILITY_POINTS = 25
const WORD_COUNT_POINTS = 15
const INTERNAL_LINKS_POINTS = 15

const QUESTION_WORDS = ['wie', 'was', 'warum', 'wann', 'wo', 'wer', 'how', 'what', 'why', 'when', 'who', 'comment', 'pourquoi', 'come', 'perché']

export function checkContentStructure(html: string, origin: string): CheckResult {
  const $ = cheerio.load(html)
  const issues: Issue[] = []
  const evidence: Evidence[] = []
  let score = 0

  // --- heading hierarchy ---
  const h1s = $('h1')
  if (h1s.length === 1) {
    score += 15
    issues.push({ id: 'h1-single', category: 'content', severity: 'passed', message: 'Sayfada tek ve net bir H1 başlığı var.' })
  } else if (h1s.length === 0) {
    issues.push({ id: 'h1-missing', category: 'content', severity: 'high', message: 'Sayfada H1 başlığı yok.' })
  } else {
    score += 5
    issues.push({ id: 'h1-multiple', category: 'content', severity: 'medium', message: `Sayfada ${h1s.length} adet H1 var — tek H1 önerilir.` })
  }

  const h2s = $('h2')
  if (h2s.length > 0) {
    score += 10
    issues.push({ id: 'h2-present', category: 'content', severity: 'passed', message: 'İçerik alt başlıklarla (H2) yapılandırılmış.' })
  } else {
    issues.push({ id: 'h2-missing', category: 'content', severity: 'low', message: 'H2 alt başlığı bulunamadı — uzun içerik bölümlere ayrılmamış olabilir.' })
  }

  // --- question-oriented headings ---
  const headingTexts = $('h1, h2, h3')
    .map((_, el) => $(el).text().trim())
    .get()
  const questionHeadings = headingTexts.filter(
    (t) => t.endsWith('?') || QUESTION_WORDS.some((w) => t.toLowerCase().startsWith(w + ' ')),
  )
  if (questionHeadings.length > 0) {
    score += QUESTION_HEADING_POINTS
    const evidenceId = 'ev-question-headings'
    evidence.push({ id: evidenceId, type: 'content_snippet', source: 'headings', snippet: questionHeadings.slice(0, 3).join(' | ') })
    issues.push({
      id: 'question-headings-present',
      category: 'content',
      severity: 'passed',
      message: 'Soru şeklinde başlıklar var — AI motorlarının doğrudan alıntılaması kolaylaşır.',
      evidenceId,
    })
  } else {
    issues.push({
      id: 'question-headings-missing',
      category: 'content',
      severity: 'medium',
      message: 'Soru şeklinde başlık ("Wie funktioniert...?" gibi) bulunamadı.',
    })
  }

  // --- readability: average words per sentence in body text ---
  $('script, style, nav, header, footer').remove()
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim()
  const words = bodyText.split(' ').filter(Boolean)
  const sentences = bodyText.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  const avgWordsPerSentence = sentences.length > 0 ? words.length / sentences.length : 0

  if (avgWordsPerSentence > 0 && avgWordsPerSentence <= 22) {
    score += READABILITY_POINTS
    issues.push({ id: 'readability-ok', category: 'content', severity: 'passed', message: 'Cümleler okunabilir uzunlukta.' })
  } else if (avgWordsPerSentence > 22) {
    score += 10
    issues.push({
      id: 'readability-long',
      category: 'content',
      severity: 'low',
      message: `Ortalama cümle uzunluğu ${Math.round(avgWordsPerSentence)} kelime — daha kısa cümleler AI özetlemesini kolaylaştırır.`,
    })
  }

  // --- word count / thin content ---
  if (words.length >= 300) {
    score += WORD_COUNT_POINTS
    issues.push({ id: 'word-count-ok', category: 'content', severity: 'passed', message: `Sayfa yeterli içerik uzunluğuna sahip (~${words.length} kelime).` })
  } else {
    issues.push({
      id: 'word-count-thin',
      category: 'content',
      severity: 'medium',
      message: `Sayfa içeriği kısa (~${words.length} kelime) — AI motorları yetersiz bulabilir.`,
    })
  }

  // --- internal links ---
  const internalLinks = $('a[href]').filter((_, el) => {
    const href = $(el).attr('href') ?? ''
    return href.startsWith('/') || href.startsWith(origin)
  })
  if (internalLinks.length >= 3) {
    score += INTERNAL_LINKS_POINTS
    issues.push({ id: 'internal-links-ok', category: 'content', severity: 'passed', message: 'Yeterli iç bağlantı mevcut.' })
  } else {
    issues.push({ id: 'internal-links-few', category: 'content', severity: 'low', message: 'İç bağlantı sayısı az — site içi gezinme AI motorları için zayıf olabilir.' })
  }

  return {
    score,
    maxScore: HEADING_POINTS + QUESTION_HEADING_POINTS + READABILITY_POINTS + WORD_COUNT_POINTS + INTERNAL_LINKS_POINTS,
    issues,
    evidence,
  }
}
