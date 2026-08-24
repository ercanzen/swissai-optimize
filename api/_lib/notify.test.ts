import { describe, expect, it } from 'vitest'
import { escapeHtml } from './notify'

describe('escapeHtml', () => {
  it('escapes all HTML-sensitive characters', () => {
    expect(escapeHtml('<script>alert("x") & \'y\'</script>')).toBe(
      '&lt;script&gt;alert(&quot;x&quot;) &amp; &#39;y&#39;&lt;/script&gt;',
    )
  })

  it('leaves plain text untouched', () => {
    expect(escapeHtml('Ercan Zengin, 3052 Zollikofen')).toBe('Ercan Zengin, 3052 Zollikofen')
  })
})
