import { resolvePublicTarget, fetchHtml, fetchText, urlExists } from './fetcher.js'
import { checkCrawlerAccess } from './checks/crawlerAccess.js'
import { checkSitemap } from './checks/sitemap.js'
import { extractHeadInfo, checkTechnicalMetaHygiene, checkMetaQuality } from './checks/metadata.js'
import { checkStructuredData } from './checks/structuredData.js'
import { checkContentStructure } from './checks/contentStructure.js'
import { combineCategory, computeOverallScore, buildRecommendations, sortIssuesBySeverity } from './scoring.js'
import { checkAiVisibility } from './aiVisibility.js'
import { findCompetitors } from './competitors.js'
import type { AuditReport, Issue } from './types.js'

export interface RunAuditInput {
  website: string
  firma: string
  branche: string
}

function unreachableReport(reason: string): AuditReport {
  const issue: Issue = {
    id: 'site-unreachable',
    category: 'technical',
    severity: 'critical',
    message: reason,
  }
  return {
    overall_score: 0,
    geo_score: 0,
    technical_score: 0,
    content_score: 0,
    ai_visibility_score: null,
    issues: [issue],
    recommendations: buildRecommendations([issue]),
    evidence: [],
    competitors: [],
  }
}

async function findSitemapUrl(origin: string, robotsTxt: string): Promise<string | null> {
  const match = robotsTxt.match(/^Sitemap:\s*(\S+)/im)
  if (match) return match[1]
  const guess = `${origin}/sitemap.xml`
  return (await urlExists(guess)) ? guess : null
}

/** Runs the full free (crawler-based) audit plus the LLM-gated checks, which degrade to
 *  null/[] automatically when ANTHROPIC_API_KEY is absent or the call fails. Never throws —
 *  an unreachable target still returns a valid, if mostly-empty, AuditReport. */
export async function runAudit(input: RunAuditInput): Promise<AuditReport> {
  const target = await resolvePublicTarget(input.website)
  if (!target) {
    return unreachableReport('Website-URL ungültig oder nicht öffentlich erreichbar — der technische Check konnte nicht durchgeführt werden.')
  }

  const homepage = await fetchHtml(target.origin)
  if (!homepage.ok || !homepage.html) {
    return unreachableReport('Die Website konnte nicht erreicht werden — der technische Check wurde übersprungen.')
  }

  const [robotsTxt, llmsTxtFound, llmsFullTxtFound] = await Promise.all([
    fetchText(`${target.origin}/robots.txt`),
    urlExists(`${target.origin}/llms.txt`),
    urlExists(`${target.origin}/llms-full.txt`),
  ])

  const sitemapUrl = await findSitemapUrl(target.origin, robotsTxt.text)
  const sitemapXml = sitemapUrl ? await fetchText(sitemapUrl) : null

  const head = extractHeadInfo(homepage.html)

  const technical = combineCategory([
    checkCrawlerAccess({ origin: target.origin, robotsTxt, llmsTxtFound, llmsFullTxtFound }),
    checkSitemap({ origin: target.origin, sitemapUrl, sitemapXml }),
    checkTechnicalMetaHygiene(head),
  ])

  const geo = combineCategory([checkStructuredData(homepage.html), checkMetaQuality(head)])

  const content = combineCategory([checkContentStructure(homepage.html, target.origin)])

  const [aiVisibility, competitors] = await Promise.all([
    checkAiVisibility(input.firma, input.website, input.branche),
    findCompetitors(input.firma, input.branche),
  ])

  const allIssues = sortIssuesBySeverity([...technical.issues, ...geo.issues, ...content.issues])
  const recommendations = buildRecommendations(allIssues)

  return {
    overall_score: computeOverallScore(technical.score, geo.score, content.score),
    geo_score: geo.score,
    technical_score: technical.score,
    content_score: content.score,
    ai_visibility_score: aiVisibility.score,
    issues: allIssues,
    recommendations,
    evidence: [...technical.evidence, ...geo.evidence, ...content.evidence],
    competitors,
  }
}
