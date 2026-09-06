import { describe, expect, it } from 'vitest'
import { checkStructuredData } from './structuredData'

describe('checkStructuredData', () => {
  it('flags missing JSON-LD as a critical issue with zero score', () => {
    const result = checkStructuredData('<html><head></head><body>Hallo</body></html>')
    expect(result.score).toBe(0)
    expect(result.issues.find((i) => i.id === 'schema-missing')?.severity).toBe('critical')
  })

  it('scores Organization schema and detects FAQPage', () => {
    const html = `<html><head>
      <script type="application/ld+json">${JSON.stringify({ '@type': 'Organization', name: 'Test AG' })}</script>
      <script type="application/ld+json">${JSON.stringify({ '@type': 'FAQPage' })}</script>
    </head><body></body></html>`
    const result = checkStructuredData(html)
    expect(result.issues.find((i) => i.id === 'faq-schema-present')).toBeDefined()
    expect(result.score).toBeGreaterThan(0)
  })

  it('does not crash on invalid JSON in a script block', () => {
    const html = '<html><head><script type="application/ld+json">{not valid json</script></head><body></body></html>'
    expect(() => checkStructuredData(html)).not.toThrow()
  })
})
