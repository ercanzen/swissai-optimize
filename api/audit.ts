import { generateAuditReport, type AuditFormData } from './_lib/audit'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  try {
    const data = req.body as AuditFormData
    const result = await generateAuditReport(data)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unbekannter Fehler' })
  }
}
