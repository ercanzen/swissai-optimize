const RESEND_ENDPOINT = 'https://api.resend.com/emails'

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function getApiKey(): string {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error(
      'RESEND_API_KEY ist nicht gesetzt. Lokal: .env Datei anlegen (siehe .env.example). Auf Vercel: Environment Variable in den Projekteinstellungen setzen.',
    )
  }
  return apiKey
}

export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const apiKey = getApiKey()
  const from = process.env.RESEND_FROM_EMAIL || 'SwissAI Optimize <onboarding@resend.dev>'

  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, html }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Resend-Fehler (${res.status}): ${errText}`)
  }
}

export async function sendLeadEmail(subject: string, html: string): Promise<void> {
  const to = process.env.LEAD_NOTIFY_EMAIL || 'info@swissai-optimize.ch'
  await sendEmail(to, subject, html)
}
