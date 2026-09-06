import Anthropic from '@anthropic-ai/sdk'

const MODEL = 'claude-sonnet-4-6'

const VISIBILITY_TOOL: Anthropic.Tool = {
  name: 'ai_visibility_check',
  description: 'Gibt strukturiert zurück, wie gut ein Unternehmen einem KI-Modell bekannt ist.',
  input_schema: {
    type: 'object',
    properties: {
      bekannt: { type: 'boolean', description: 'Ob konkretes, verifizierbares Wissen über GENAU dieses Unternehmen vorhanden ist' },
      score: { type: 'integer', minimum: 0, maximum: 100, description: '0 = völlig unbekannt, 100 = ausführlich und korrekt bekannt' },
      hinweis: { type: 'string', description: 'Kurze, ehrliche Erklärung (1-2 Sätze): was bekannt ist, oder warum nicht' },
    },
    required: ['bekannt', 'score', 'hinweis'],
  },
}

export interface AiVisibilityResult {
  score: number | null
  evaluated: boolean
  bekannt?: boolean
  hinweis?: string
}

/** Live-queries Claude for brand awareness. Returns score: null (not evaluated) whenever the key is
 *  missing or the call fails — never fabricates a number. Wire additional engines here later. */
export async function checkAiVisibility(firma: string, website: string, branche: string): Promise<AiVisibilityResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return { score: null, evaluated: false }
  }

  try {
    const client = new Anthropic()
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 300,
      system:
        'Du bist ein ehrlicher KI-Sichtbarkeits-Prüfer. Antworte AUSSCHLIESSLICH basierend auf tatsächlichem Wissen aus deinen Trainingsdaten. Erfinde niemals Fakten. Wenn du das Unternehmen nicht kennst, sag das klar — das ist normal für die meisten KMU.',
      tools: [VISIBILITY_TOOL],
      tool_choice: { type: 'tool', name: 'ai_visibility_check' },
      messages: [{ role: 'user', content: `Unternehmen: ${firma}\nBranche: ${branche}\nWebsite: ${website}` }],
    })

    const toolUse = message.content.find((block): block is Anthropic.ToolUseBlock => block.type === 'tool_use')
    if (!toolUse) return { score: null, evaluated: false }

    const result = toolUse.input as { bekannt: boolean; score: number; hinweis: string }
    return { score: Math.max(0, Math.min(100, result.score)), evaluated: true, bekannt: result.bekannt, hinweis: result.hinweis }
  } catch (err) {
    console.error('AI-Visibility-Check fehlgeschlagen:', err)
    return { score: null, evaluated: false }
  }
}
