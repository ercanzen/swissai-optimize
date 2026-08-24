import { setUnsubscribed } from './store.js'
import { verifyUnsubscribeToken } from './unsubscribe-token.js'

export async function processUnsubscribe(email: string, token: string): Promise<void> {
  if (!email || !token || !verifyUnsubscribeToken(email, token)) {
    throw new Error('Ungültiger oder abgelaufener Abmelde-Link.')
  }
  await setUnsubscribed(email)
}
