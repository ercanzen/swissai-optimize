import { createHmac } from 'node:crypto'

function getSecret(): string {
  const secret = process.env.RESEND_API_KEY
  if (!secret) {
    throw new Error('RESEND_API_KEY ist nicht gesetzt — wird als Signierschlüssel für Unsubscribe-Links benötigt.')
  }
  return secret
}

export function createUnsubscribeToken(email: string): string {
  return createHmac('sha256', getSecret()).update(email.toLowerCase()).digest('hex').slice(0, 32)
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  return createUnsubscribeToken(email) === token
}
