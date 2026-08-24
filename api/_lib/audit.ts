import Anthropic from '@anthropic-ai/sdk'
import { sendLeadEmail, escapeHtml } from './notify'
import { saveAuditLead } from './store'

const MODEL = 'claude-sonnet-4-6'

type Lang = 'de' | 'en' | 'fr' | 'it'

const LANGUAGE_NAMES: Record<Lang, string> = {
  de: 'Deutsch',
  en: 'Englisch (English)',
  fr: 'Französisch (français)',
  it: 'Italienisch (italiano)',
}

function languageInstruction(lang: Lang): string {
  return ` WICHTIG: Antworte ausschliesslich auf ${LANGUAGE_NAMES[lang]}, unabhängig von der Sprache der Eingabedaten.`
}

const RECOMMENDATIONS_SYSTEM_PROMPT =
  'Du bist ein KI-Automatisierungsexperte für Schweizer KMU. Analysiere die Angaben und erstelle einen kurzen, konkreten Audit-Bericht. Format: 3 konkrete Automatisierungsempfehlungen mit je: Titel, Problem das gelöst wird, geschätzte Zeitersparnis pro Woche, Implementierungsaufwand (Niedrig/Mittel/Hoch). Sei spezifisch und praxisnah.'

const RECOMMENDATIONS_TOOL: Anthropic.Tool = {
  name: 'audit_bericht',
  description: 'Übermittelt den strukturierten KI-Audit-Bericht mit genau drei Automatisierungsempfehlungen.',
  input_schema: {
    type: 'object',
    properties: {
      empfehlungen: {
        type: 'array',
        minItems: 3,
        maxItems: 3,
        items: {
          type: 'object',
          properties: {
            titel: { type: 'string', description: 'Kurzer Titel der Automatisierungsempfehlung' },
            problem: { type: 'string', description: 'Welches konkrete Problem wird gelöst' },
            zeitersparnis: { type: 'string', description: 'Geschätzte Zeitersparnis pro Woche, z.B. "5 Stunden pro Woche"' },
            aufwand: { type: 'string', enum: ['Niedrig', 'Mittel', 'Hoch'], description: 'Implementierungsaufwand' },
          },
          required: ['titel', 'problem', 'zeitersparnis', 'aufwand'],
        },
      },
    },
    required: ['empfehlungen'],
  },
}

const VISIBILITY_SYSTEM_PROMPT =
  'Du bist ein ehrlicher KI-Sichtbarkeits-Prüfer. Antworte AUSSCHLIESSLICH basierend auf tatsächlichem Wissen aus deinen Trainingsdaten über das genannte Unternehmen. Erfinde niemals Fakten oder Details. Wenn der Firmenname generisch ist oder mehrere gleichnamige Unternehmen existieren könnten, weise explizit auf diese Unsicherheit hin statt zu raten. Wenn du das Unternehmen nicht kennst, sag das klar und ehrlich — das ist ein normales, erwartetes Ergebnis für die meisten kleinen und mittleren Unternehmen.'

const VISIBILITY_TOOL: Anthropic.Tool = {
  name: 'sichtbarkeits_check',
  description: 'Gibt strukturiert zurück, ob das Unternehmen bekannt ist.',
  input_schema: {
    type: 'object',
    properties: {
      bekannt: {
        type: 'boolean',
        description: 'Ob konkretes, verifizierbares Wissen über GENAU dieses Unternehmen vorhanden ist',
      },
      hinweis: {
        type: 'string',
        description: 'Kurze, ehrliche Erklärung auf Deutsch (1-2 Sätze): was bekannt ist, oder warum nicht',
      },
    },
    required: ['bekannt', 'hinweis'],
  },
}

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

export interface AuditRecommendation {
  titel: string
  problem: string
  zeitersparnis: string
  aufwand: 'Niedrig' | 'Mittel' | 'Hoch'
}

export interface VisibilityCheck {
  bekannt: boolean
  hinweis: string
}

export interface AuditResult {
  empfehlungen: AuditRecommendation[]
  sichtbarkeit: VisibilityCheck
}

function resolveLang(lang: unknown): Lang {
  return lang === 'en' || lang === 'fr' || lang === 'it' ? lang : 'de'
}

async function generateRecommendations(
  client: Anthropic,
  data: AuditFormData,
  lang: Lang,
): Promise<AuditRecommendation[]> {
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 1000,
    system: RECOMMENDATIONS_SYSTEM_PROMPT + languageInstruction(lang),
    tools: [RECOMMENDATIONS_TOOL],
    tool_choice: { type: 'tool', name: 'audit_bericht' },
    messages: [{ role: 'user', content: JSON.stringify(data) }],
  })

  const toolUse = message.content.find((block): block is Anthropic.ToolUseBlock => block.type === 'tool_use')
  if (!toolUse) {
    throw new Error('Claude hat keinen strukturierten Bericht zurückgegeben.')
  }

  return (toolUse.input as { empfehlungen: AuditRecommendation[] }).empfehlungen
}

async function checkVisibility(client: Anthropic, data: AuditFormData, lang: Lang): Promise<VisibilityCheck> {
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 300,
    system: VISIBILITY_SYSTEM_PROMPT + languageInstruction(lang),
    tools: [VISIBILITY_TOOL],
    tool_choice: { type: 'tool', name: 'sichtbarkeits_check' },
    messages: [
      {
        role: 'user',
        content: `Unternehmen: ${data.firma}\nBranche: ${data.branche}\nWebsite: ${data.website}`,
      },
    ],
  })

  const toolUse = message.content.find((block): block is Anthropic.ToolUseBlock => block.type === 'tool_use')
  if (!toolUse) {
    throw new Error('Claude hat keinen Sichtbarkeits-Check zurückgegeben.')
  }

  return toolUse.input as VisibilityCheck
}

export async function generateAuditReport(data: AuditFormData): Promise<AuditResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      'ANTHROPIC_API_KEY ist nicht gesetzt. Lokal: .env Datei anlegen (siehe .env.example). Auf Vercel: Environment Variable in den Projekteinstellungen setzen.',
    )
  }

  const client = new Anthropic()
  const lang = resolveLang(data.lang)

  const [empfehlungen, sichtbarkeit] = await Promise.all([
    generateRecommendations(client, data, lang),
    checkVisibility(client, data, lang),
  ])

  try {
    await sendLeadEmail(`Neuer KI-Audit Lead: ${data.name}`, renderAuditLeadHtml(data, empfehlungen, sichtbarkeit))
  } catch (err) {
    console.error('Audit-Lead-E-Mail fehlgeschlagen:', err)
  }

  try {
    await saveAuditLead({ ...data, empfehlungen, sichtbarkeit })
  } catch (err) {
    console.error('Audit-Lead konnte nicht gespeichert werden:', err)
  }

  return { empfehlungen, sichtbarkeit }
}

function renderAuditLeadHtml(
  data: AuditFormData,
  empfehlungen: AuditRecommendation[],
  sichtbarkeit: VisibilityCheck,
): string {
  const empfehlungenHtml = empfehlungen
    .map(
      (e) =>
        `<li><strong>${escapeHtml(e.titel)}</strong> (${escapeHtml(e.aufwand)}, ${escapeHtml(e.zeitersparnis)})<br/>${escapeHtml(e.problem)}</li>`,
    )
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
    <p><strong>KI-Sichtbarkeit:</strong> ${sichtbarkeit.bekannt ? 'bekannt' : 'nicht bekannt'} — ${escapeHtml(sichtbarkeit.hinweis)}</p>
    <p><strong>Generierte Empfehlungen:</strong></p>
    <ul>${empfehlungenHtml}</ul>
  `
}
