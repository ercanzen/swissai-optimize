import { processUnsubscribe } from './_lib/unsubscribe'

export default async function handler(req: any, res: any) {
  const email = typeof req.query?.email === 'string' ? req.query.email : ''
  const token = typeof req.query?.token === 'string' ? req.query.token : ''

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  try {
    await processUnsubscribe(email, token)
    res.status(200).send('<p>Sie wurden erfolgreich von den wöchentlichen KI-Updates abgemeldet.</p>')
  } catch (err) {
    res.status(400).send(`<p>${err instanceof Error ? err.message : 'Unbekannter Fehler'}</p>`)
  }
}
