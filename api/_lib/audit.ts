import { sendLeadEmail, escapeHtml } from './notify.js'
import { saveAuditLead } from './store.js'
import { runAudit } from './audit-engine/engine.js'
import type { AuditReport } from './audit-engine/types.js'

type Lang = 'de' | 'en' | 'fr' | 'it'

export interface AuditFormData {
  firma: string
  website: string
  branche: string
  mitarbeiterzahl: string
  herausforderungen: string[]
  stundenProWoche: number
  name: string
  email: string
  lang?: Lang
}

export type { AuditReport } from './audit-engine/types.js'

function resolveLang(lang: unknown): Lang {
  return lang === 'en' || lang === 'fr' || lang === 'it' ? lang : 'de'
}

export async function generateAuditReport(data: AuditFormData): Promise<AuditReport> {
  resolveLang(data.lang) // reserved: check findings are German-only for now, i18n'd on the frontend

  const report = await runAudit({ website: data.website, firma: data.firma, branche: data.branche })

  try {
    await sendLeadEmail(`Neuer KI-Audit Lead: ${data.name}`, renderAuditLeadHtml(data, report))
  } catch (err) {
    console.error('Audit-Lead-E-Mail fehlgeschlagen:', err)
  }

  try {
    await saveAuditLead({ ...data, empfehlungen: report.recommendations, sichtbarkeit: { score: report.ai_visibility_score } })
  } catch (err) {
    console.error('Audit-Lead konnte nicht gespeichert werden:', err)
  }

  return report
}

function renderAuditLeadHtml(data: AuditFormData, report: AuditReport): string {
  const topIssues = report.issues
    .filter((i) => i.severity !== 'passed')
    .slice(0, 8)
    .map((i) => `<li>[${i.severity}] ${escapeHtml(i.message)}</li>`)
    .join('')

  return `
    <h2>Neuer KI-Audit Lead</h2>
    <p><strong>Firma:</strong> ${escapeHtml(data.firma)}</p>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Website:</strong> ${escapeHtml(data.website)}</p>
    <p><strong>Branche:</strong> ${escapeHtml(data.branche)}</p>
    <p><strong>Mitarbeiterzahl:</strong> ${escapeHtml(data.mitarbeiterzahl)}</p>
    <p><strong>Herausforderungen:</strong> ${escapeHtml(data.herausforderungen.join(', '))}</p>
    <p><strong>Zeitaufwand:</strong> ${data.stundenProWoche} Std./Woche</p>
    <p><strong>Audit-Ergebnis:</strong> Overall ${report.overall_score}/100 · Technical ${report.technical_score}/100 · GEO ${report.geo_score}/100 · Content ${report.content_score}/100 · AI Visibility ${report.ai_visibility_score ?? 'nicht gemessen'}</p>
    <p><strong>Wichtigste Befunde:</strong></p>
    <ul>${topIssues}</ul>
  `
}
