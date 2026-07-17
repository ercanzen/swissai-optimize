import { setUnsubscribed } from './store'
import { verifyUnsubscribeToken } from './unsubscribe-token'

export async function processUnsubscribe(email: string, token: string): Promise<void> {
  if (!email || !token || !verifyUnsubscribeToken(email, token)) {
    throw new Error('Ungültiger oder abgelaufener Abmelde-Link.')
  }
  await setUnsubscribed(email)
}
