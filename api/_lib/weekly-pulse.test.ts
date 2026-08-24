import { describe, expect, it } from 'vitest'
import { isDue } from './weekly-pulse'
import type { StoredLead } from './store'

function lead(overrides: Partial<StoredLead>): StoredLead {
  return {
    name: 'A. B.',
    email: 'a@example.com',
    firma: 'Beispiel AG',
    website: 'https://example.com',
    branche: 'Beratung',
    mitarbeiterzahl: '1-5',
    herausforderungen: [],
    stundenProWoche: 5,
    empfehlungen: [],
    sichtbarkeit: {},
    createdAt: new Date().toISOString(),
    lastPulseAt: null,
    unsubscribed: false,
    ...overrides,
  }
}

const DAY_MS = 1000 * 60 * 60 * 24

describe('isDue', () => {
  it('is due when no pulse has ever been sent', () => {
    expect(isDue(lead({ lastPulseAt: null }), Date.now())).toBe(true)
  })

  it('is not due before the interval has elapsed', () => {
    const now = Date.now()
    expect(isDue(lead({ lastPulseAt: new Date(now - 2 * DAY_MS).toISOString() }), now)).toBe(false)
  })

  it('is due once the interval has elapsed', () => {
    const now = Date.now()
    expect(isDue(lead({ lastPulseAt: new Date(now - 7 * DAY_MS).toISOString() }), now)).toBe(true)
  })

  it('is never due once unsubscribed, regardless of timing', () => {
    const now = Date.now()
    expect(isDue(lead({ lastPulseAt: null, unsubscribed: true }), now)).toBe(false)
  })
})
