import Anthropic from '@anthropic-ai/sdk'
import type { Competitor } from './types.js'

const MODEL = 'claude-sonnet-4-6'
const MAX_COMPETITORS = 5

const COMPETITORS_TOOL: Anthropic.Tool = {
  name: 'competitor_list',
  description: 'Gibt bis zu 5 bekannte Wettbewerber des genannten Unternehmens zurück.',
  input_schema: {
    type: 'object',
    properties: {
      competitors: {
        type: 'array',
        maxItems: MAX_COMPETITORS,
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            domain: { type: 'string', description: 'Domain falls bekannt, sonst leer lassen' },
          },
          required: ['name'],
        },
      },
    },
    required: ['competitors'],
  },
}

/** One judge-LLM call to surface known competitors. Returns [] whenever the key is missing, the
 *  brand is unknown, or the call fails — an empty list, never a guessed one. */
export async function findCompetitors(firma: string, branche: string): Promise<Competitor[]> {
  if (!process.env.ANTHROPIC_API_KEY) return []

  try {
    const client = new Anthropic()
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 300,
      system:
        'Du nennst nur Wettbewerber, die dir tatsächlich aus deinen Trainingsdaten bekannt sind. Wenn du das Unternehmen nicht kennst oder keine echten Wettbewerber weisst, gib eine leere Liste zurück — erfinde niemals Namen.',
      tools: [COMPETITORS_TOOL],
      tool_choice: { type: 'tool', name: 'competitor_list' },
      messages: [{ role: 'user', content: `Unternehmen: ${firma}\nBranche: ${branche}` }],
    })

    const toolUse = message.content.find((block): block is Anthropic.ToolUseBlock => block.type === 'tool_use')
    if (!toolUse) return []

    const result = toolUse.input as { competitors: { name: string; domain?: string }[] }
    return result.competitors.slice(0, MAX_COMPETITORS).map((c) => ({ name: c.name, domain: c.domain, mentionedBy: 'claude' }))
  } catch (err) {
    console.error('Wettbewerber-Suche fehlgeschlagen:', err)
    return []
  }
}
