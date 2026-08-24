import { submitContactForm, type ContactFormData } from './_lib/contact'

const MAX_SHORT_FIELD = 200
const MAX_MESSAGE = 5000

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  try {
    const data = req.body as ContactFormData
    if (!data?.name?.trim() || !data?.email?.trim() || !data?.message?.trim()) {
      res.status(400).json({ error: 'Name, E-Mail und Nachricht sind erforderlich.' })
      return
    }
    if (
      data.name.length > MAX_SHORT_FIELD ||
      data.email.length > MAX_SHORT_FIELD ||
      (data.company && data.company.length > MAX_SHORT_FIELD) ||
      (data.service && data.service.length > MAX_SHORT_FIELD) ||
      data.message.length > MAX_MESSAGE
    ) {
      res.status(400).json({ error: 'Eingabe zu lang.' })
      return
    }
    await submitContactForm(data)
    res.status(200).json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unbekannter Fehler' })
  }
}
