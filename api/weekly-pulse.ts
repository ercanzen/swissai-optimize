import { runWeeklyPulse } from './_lib/weekly-pulse.js'

export default async function handler(req: any, res: any) {
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && req.headers?.authorization !== `Bearer ${cronSecret}`) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  try {
    const result = await runWeeklyPulse()
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unbekannter Fehler' })
  }
}
