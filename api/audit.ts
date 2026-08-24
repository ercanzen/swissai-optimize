import { generateAuditReport, type AuditFormData } from './_lib/audit'
import { checkAuditRateLimit, clientIp } from './_lib/ratelimit'

const MAX_SHORT_FIELD = 200
const MAX_HERAUSFORDERUNGEN = 20

export function isValidAuditPayload(data: any): data is AuditFormData {
  if (!data || typeof data !== 'object') return false
  const shortFields = ['firma', 'website', 'branche', 'mitarbeiterzahl', 'name', 'email']
  for (const field of shortFields) {
    if (typeof data[field] !== 'string' || !data[field].trim() || data[field].length > MAX_SHORT_FIELD) return false
  }
  if (
    !Array.isArray(data.herausforderungen) ||
    data.herausforderungen.length === 0 ||
    data.herausforderungen.length > MAX_HERAUSFORDERUNGEN ||
    !data.herausforderungen.every((h: unknown) => typeof h === 'string' && h.length <= MAX_SHORT_FIELD)
  ) {
    return false
  }
  if (typeof data.stundenProWoche !== 'number' || data.stundenProWoche < 0 || data.stundenProWoche > 168) {
    return false
  }
  return true
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const data = req.body
  if (!isValidAuditPayload(data)) {
    res.status(400).json({ error: 'Ungültige oder unvollständige Angaben.' })
    return
  }

  const { allowed, retryAfterSeconds } = await checkAuditRateLimit(clientIp(req))
  if (!allowed) {
    res.setHeader('Retry-After', String(retryAfterSeconds ?? 3600))
    res.status(429).json({ error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' })
    return
  }

  try {
    const result = await generateAuditReport(data)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unbekannter Fehler' })
  }
}
