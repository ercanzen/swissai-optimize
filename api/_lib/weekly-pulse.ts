import { getAllAuditLeads, markPulseSent, type StoredLead } from './store.js'
import { sendEmail } from './notify.js'
import { createUnsubscribeToken } from './unsubscribe-token.js'
import { generatePulse, renderPulseHtml } from './pulse.js'

const PULSE_INTERVAL_DAYS = 6
const MAX_PER_RUN = 25

export function isDue(lead: StoredLead, now: number): boolean {
  if (lead.unsubscribed) return false
  if (!lead.lastPulseAt) return true
  const days = (now - new Date(lead.lastPulseAt).getTime()) / (1000 * 60 * 60 * 24)
  return days >= PULSE_INTERVAL_DAYS
}

export interface WeeklyPulseResult {
  candidates: number
  due: number
  sent: number
}

export async function runWeeklyPulse(): Promise<WeeklyPulseResult> {
  const leads = await getAllAuditLeads()
  const now = Date.now()
  const due = leads.filter((lead) => isDue(lead, now)).slice(0, MAX_PER_RUN)

  let sent = 0
  for (const lead of due) {
    try {
      const pulse = await generatePulse(lead)
      const token = createUnsubscribeToken(lead.email)
      const host = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://swissai-optimize.ch'
      const unsubscribeUrl = `${host}/api/unsubscribe?email=${encodeURIComponent(lead.email)}&token=${token}`

      await sendEmail(lead.email, `Ihr wöchentliches KI-Update, ${lead.name}`, renderPulseHtml(lead, pulse, unsubscribeUrl))
      await markPulseSent(lead.email)
      sent++
    } catch (err) {
      console.error(`Pulse fehlgeschlagen für ${lead.email}:`, err)
    }
  }

  return { candidates: leads.length, due: due.length, sent }
}
