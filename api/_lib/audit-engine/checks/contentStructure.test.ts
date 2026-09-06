import { describe, expect, it } from 'vitest'
import { checkContentStructure } from './contentStructure'

const ORIGIN = 'https://example.ch'

describe('checkContentStructure', () => {
  it('rewards a single H1 and penalizes missing H1', () => {
    const withH1 = checkContentStructure(`<html><body><h1>Titel</h1><p>${'Wort '.repeat(400)}</p></body></html>`, ORIGIN)
    expect(withH1.issues.find((i) => i.id === 'h1-single')).toBeDefined()

    const withoutH1 = checkContentStructure('<html><body><p>Kein Titel hier.</p></body></html>', ORIGIN)
    expect(withoutH1.issues.find((i) => i.id === 'h1-missing')?.severity).toBe('high')
  })

  it('detects question-style headings', () => {
    const html = '<html><body><h1>x</h1><h2>Wie funktioniert das?</h2></body></html>'
    const result = checkContentStructure(html, ORIGIN)
    expect(result.issues.find((i) => i.id === 'question-headings-present')).toBeDefined()
  })

  it('flags thin content below the word-count threshold', () => {
    const html = '<html><body><h1>x</h1><p>Nur ein paar Worte.</p></body></html>'
    const result = checkContentStructure(html, ORIGIN)
    expect(result.issues.find((i) => i.id === 'word-count-thin')).toBeDefined()
  })
})
