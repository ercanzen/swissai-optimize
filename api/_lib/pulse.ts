import Anthropic from '@anthropic-ai/sdk'
import { escapeHtml } from './notify.js'
import type { StoredLead } from './store.js'

const MODEL = 'claude-sonnet-4-6'

const PULSE_SYSTEM_PROMPT =
  'Du bist ein KI-Automatisierungsexperte für Schweizer KMU. Schreibe eine kurze wöchentliche Update-Nachricht (3-5 Sätze, Deutsch) für ein Unternehmen, das vor einiger Zeit einen KI-Audit gemacht hat. Vermittle EIN neues, konkretes Learning oder eine Beobachtung zu KI-Sichtbarkeit (ChatGPT/Perplexity/Google KI) oder Prozessautomatisierung, das zu ihrem Profil passt. Kein Fülltext, keine Grussformel, keine Signatur — nur der Inhalt.'

export async function generatePulse(lead: StoredLead): Promise<string> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY ist nicht gesetzt.')
  }

  const client = new Anthropic()
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 300,
    system: PULSE_SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: JSON.stringify({
          firma: lead.firma,
          branche: lead.branche,
          website: lead.website,
          mitarbeiterzahl: lead.mitarbeiterzahl,
          herausforderungen: lead.herausforderungen,
          bisherigeEmpfehlungen: lead.empfehlungen,
          letzterSichtbarkeitsCheck: lead.sichtbarkeit,
        }),
      },
    ],
  })

  const text = message.content.find((block): block is Anthropic.TextBlock => block.type === 'text')
  if (!text) {
    throw new Error('Claude hat keinen Text zurückgegeben.')
  }
  return text.text
}

export function renderPulseHtml(lead: StoredLead, pulse: string, unsubscribeUrl: string): string {
  return `
    <p>Hallo ${escapeHtml(lead.name)},</p>
    <p>${escapeHtml(pulse).replace(/\n/g, '<br/>')}</p>
    <p><a href="https://swissai-optimize.ch/#contact">Jetzt umsetzen – Beratung buchen →</a></p>
    <hr/>
    <p style="font-size:12px;color:#999;">
      <a href="${unsubscribeUrl}">Diese wöchentlichen Updates abbestellen</a>
    </p>
  `
}
