import { describe, expect, it } from 'vitest'
import { isValidAuditPayload } from '../audit'

function basePayload() {
  return {
    firma: 'Beispiel AG',
    website: 'https://example.com',
    branche: 'Beratung',
    mitarbeiterzahl: '1-5',
    herausforderungen: ['E-Mails beantworten'],
    stundenProWoche: 10,
    name: 'A. B.',
    email: 'a@example.com',
  }
}

describe('isValidAuditPayload', () => {
  it('accepts a well-formed payload', () => {
    expect(isValidAuditPayload(basePayload())).toBe(true)
  })

  it('rejects missing required fields', () => {
    const { firma, ...rest } = basePayload()
    expect(isValidAuditPayload(rest)).toBe(false)
  })

  it('rejects an empty herausforderungen list', () => {
    expect(isValidAuditPayload({ ...basePayload(), herausforderungen: [] })).toBe(false)
  })

  it('rejects an oversized string field', () => {
    expect(isValidAuditPayload({ ...basePayload(), firma: 'x'.repeat(201) })).toBe(false)
  })

  it('rejects an out-of-range stundenProWoche', () => {
    expect(isValidAuditPayload({ ...basePayload(), stundenProWoche: 999 })).toBe(false)
  })

  it('rejects null/undefined payloads', () => {
    expect(isValidAuditPayload(null)).toBe(false)
    expect(isValidAuditPayload(undefined)).toBe(false)
  })
})
