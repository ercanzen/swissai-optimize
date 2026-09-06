import robotsParser from 'robots-parser'
import type { CheckResult, Evidence, Issue } from '../types'

const AI_BOTS = [
  { name: 'GPTBot', vendor: 'OpenAI' },
  { name: 'ChatGPT-User', vendor: 'OpenAI' },
  { name: 'OAI-SearchBot', vendor: 'OpenAI' },
  { name: 'ClaudeBot', vendor: 'Anthropic' },
  { name: 'anthropic-ai', vendor: 'Anthropic' },
  { name: 'PerplexityBot', vendor: 'Perplexity' },
  { name: 'Google-Extended', vendor: 'Google' },
  { name: 'CCBot', vendor: 'Common Crawl' },
]

const ROBOTS_POINTS = 45
const LLMS_TXT_POINTS = 15
// remaining 40 points of the technical category come from checkSitemap + checkMetaHygiene

export interface CrawlerAccessInput {
  origin: string
  robotsTxt: { ok: boolean; text: string }
  llmsTxtFound: boolean
  llmsFullTxtFound: boolean
}

export function checkCrawlerAccess(input: CrawlerAccessInput): CheckResult {
  const issues: Issue[] = []
  const evidence: Evidence[] = []
  let score = 0

  if (!input.robotsTxt.ok || !input.robotsTxt.text.trim()) {
    issues.push({
      id: 'robots-missing',
      category: 'technical',
      severity: 'high',
      message: 'robots.txt bulunamadı — AI botları için erişim kuralı tanımlanmamış.',
    })
  } else {
    const evidenceId = 'ev-robots-txt'
    evidence.push({
      id: evidenceId,
      type: 'robots_txt',
      source: `${input.origin}/robots.txt`,
      snippet: input.robotsTxt.text.slice(0, 500),
    })

    const robots = robotsParser(`${input.origin}/robots.txt`, input.robotsTxt.text)
    const blocked = AI_BOTS.filter((bot) => !robots.isAllowed(`${input.origin}/`, bot.name))

    if (blocked.length === 0) {
      score += ROBOTS_POINTS
      issues.push({
        id: 'robots-ai-bots-ok',
        category: 'technical',
        severity: 'passed',
        message: 'Tüm önemli AI botları (GPTBot, ClaudeBot, PerplexityBot, Google-Extended vb.) erişebiliyor.',
        evidenceId,
      })
    } else if (blocked.length < AI_BOTS.length) {
      score += Math.round(ROBOTS_POINTS * (1 - blocked.length / AI_BOTS.length))
      issues.push({
        id: 'robots-ai-bots-partial',
        category: 'technical',
        severity: 'medium',
        message: `Bazı AI botları engelli: ${blocked.map((b) => b.name).join(', ')}.`,
        evidenceId,
      })
    } else {
      issues.push({
        id: 'robots-ai-bots-blocked',
        category: 'technical',
        severity: 'critical',
        message: 'robots.txt tüm büyük AI botlarını engelliyor — site AI motorlarında görünmüyor olabilir.',
        evidenceId,
      })
    }
  }

  if (input.llmsTxtFound || input.llmsFullTxtFound) {
    score += LLMS_TXT_POINTS
    issues.push({
      id: 'llms-txt-present',
      category: 'technical',
      severity: 'passed',
      message: 'llms.txt bulundu — AI motorları için özet bir site haritası mevcut.',
    })
  } else {
    issues.push({
      id: 'llms-txt-missing',
      category: 'technical',
      severity: 'low',
      message: 'llms.txt yok. Zorunlu değil ama AI motorlarına içeriği özetlemekte yardımcı olur.',
    })
  }

  return { score, maxScore: ROBOTS_POINTS + LLMS_TXT_POINTS, issues, evidence }
}
