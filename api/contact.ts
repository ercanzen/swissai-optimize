import { submitContactForm, type ContactFormData } from './_lib/contact'

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
    await submitContactForm(data)
    res.status(200).json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unbekannter Fehler' })
  }
}
