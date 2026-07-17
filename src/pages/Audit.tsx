import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './Audit.css'

const BRANCHEN = ['Gastronomie', 'Detailhandel', 'Gesundheit', 'Immobilien', 'Beratung', 'Andere']
const MITARBEITERZAHLEN = ['1-5', '6-20', '21-50', '50+']
const HERAUSFORDERUNGEN = [
  'E-Mails beantworten',
  'Terminplanung',
  'Angebote erstellen',
  'Kundenanfragen',
  'Berichte und Auswertungen',
  'Social Media / Content',
]

interface AuditFormData {
  firma: string
  website: string
  branche: string
  mitarbeiterzahl: string
  herausforderungen: string[]
  stundenProWoche: number
  name: string
  email: string
}

interface AuditRecommendation {
  titel: string
  problem: string
  zeitersparnis: string
  aufwand: 'Niedrig' | 'Mittel' | 'Hoch'
}

interface VisibilityCheck {
  bekannt: boolean
  hinweis: string
}

type Phase = 'form' | 'loading' | 'results' | 'error'

const initialData: AuditFormData = {
  firma: '',
  website: '',
  branche: '',
  mitarbeiterzahl: '',
  herausforderungen: [],
  stundenProWoche: 10,
  name: '',
  email: '',
}

function effortBadgeClass(aufwand: string) {
  const key = aufwand.toLowerCase()
  if (key === 'niedrig') return 'audit-badge audit-badge-effort-niedrig'
  if (key === 'mittel') return 'audit-badge audit-badge-effort-mittel'
  return 'audit-badge audit-badge-effort-hoch'
}

export default function Audit() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [phase, setPhase] = useState<Phase>('form')
  const [data, setData] = useState<AuditFormData>(initialData)
  const [results, setResults] = useState<AuditRecommendation[]>([])
  const [visibility, setVisibility] = useState<VisibilityCheck | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const toggleHerausforderung = (item: string) => {
    setData((prev) => ({
      ...prev,
      herausforderungen: prev.herausforderungen.includes(item)
        ? prev.herausforderungen.filter((h) => h !== item)
        : [...prev.herausforderungen, item],
    }))
  }

  const canProceedStep1 =
    data.firma.trim() !== '' && data.website.trim() !== '' && data.branche !== '' && data.mitarbeiterzahl !== ''
  const canProceedStep2 = data.herausforderungen.length > 0
  const canSubmit = data.name.trim() !== '' && data.email.trim() !== ''

  const submitAudit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setPhase('loading')
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Der Audit konnte nicht erstellt werden.')
      setResults(json.empfehlungen)
      setVisibility(json.sichtbarkeit)
      setPhase('results')
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Unbekannter Fehler')
      setPhase('error')
    }
  }

  const restart = () => {
    setStep(1)
    setPhase('form')
    setData(initialData)
    setResults([])
    setVisibility(null)
    setErrorMessage('')
  }

  return (
    <div className="audit-page">
      <div className="audit-container">
        <div className="audit-header">
          <h1 className="audit-title">Kostenloser KI-Audit</h1>
          <p className="audit-subtitle">
            In 2 Minuten erfahren Sie, welche KI-Automatisierungen Ihr Unternehmen voranbringen.
          </p>
        </div>

        {phase === 'form' && (
          <>
            <div className="audit-steps">
              <span className="audit-step-label">Schritt {step}/3</span>
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={`audit-step-dot ${step === n ? 'is-active' : ''} ${step > n ? 'is-done' : ''}`}
                />
              ))}
            </div>

            <div className="audit-card">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="audit-step-title">Ihr Unternehmen</h2>
                    <div className="audit-field">
                      <label className="audit-label" htmlFor="firma">
                        Firmenname
                      </label>
                      <input
                        id="firma"
                        type="text"
                        className="audit-input"
                        placeholder="Ihre Firma AG"
                        value={data.firma}
                        onChange={(e) => setData({ ...data, firma: e.target.value })}
                      />
                    </div>
                    <div className="audit-field">
                      <label className="audit-label" htmlFor="website">
                        Website URL
                      </label>
                      <input
                        id="website"
                        type="text"
                        className="audit-input"
                        placeholder="https://ihre-firma.ch"
                        value={data.website}
                        onChange={(e) => setData({ ...data, website: e.target.value })}
                      />
                    </div>
                    <div className="audit-field">
                      <label className="audit-label" htmlFor="branche">
                        Branche
                      </label>
                      <select
                        id="branche"
                        className="audit-select"
                        value={data.branche}
                        onChange={(e) => setData({ ...data, branche: e.target.value })}
                      >
                        <option value="" disabled>
                          Bitte wählen
                        </option>
                        {BRANCHEN.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="audit-field">
                      <label className="audit-label" htmlFor="mitarbeiterzahl">
                        Mitarbeiterzahl
                      </label>
                      <select
                        id="mitarbeiterzahl"
                        className="audit-select"
                        value={data.mitarbeiterzahl}
                        onChange={(e) => setData({ ...data, mitarbeiterzahl: e.target.value })}
                      >
                        <option value="" disabled>
                          Bitte wählen
                        </option>
                        {MITARBEITERZAHLEN.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="audit-actions" style={{ justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className="audit-btn audit-btn-primary"
                        disabled={!canProceedStep1}
                        onClick={() => setStep(2)}
                      >
                        Weiter →
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="audit-step-title">Herausforderungen</h2>
                    <div className="audit-checkbox-list">
                      {HERAUSFORDERUNGEN.map((item) => {
                        const checked = data.herausforderungen.includes(item)
                        return (
                          <label key={item} className={`audit-checkbox-item ${checked ? 'is-checked' : ''}`}>
                            <input type="checkbox" checked={checked} onChange={() => toggleHerausforderung(item)} />
                            <span>{item}</span>
                          </label>
                        )
                      })}
                    </div>
                    <div className="audit-field">
                      <div className="audit-slider-row">
                        <label className="audit-label" htmlFor="stunden" style={{ marginBottom: 0 }}>
                          Zeitaufwand pro Woche
                        </label>
                        <span className="audit-slider-value">{data.stundenProWoche} Std.</span>
                      </div>
                      <input
                        id="stunden"
                        type="range"
                        className="audit-slider"
                        min={0}
                        max={40}
                        step={1}
                        value={data.stundenProWoche}
                        onChange={(e) => setData({ ...data, stundenProWoche: Number(e.target.value) })}
                      />
                    </div>
                    <div className="audit-actions">
                      <button type="button" className="audit-btn audit-btn-secondary" onClick={() => setStep(1)}>
                        Zurück
                      </button>
                      <button
                        type="button"
                        className="audit-btn audit-btn-primary"
                        disabled={!canProceedStep2}
                        onClick={() => setStep(3)}
                      >
                        Weiter →
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.form
                    key="step3"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={submitAudit}
                  >
                    <h2 className="audit-step-title">Kontakt</h2>
                    <div className="audit-field">
                      <label className="audit-label" htmlFor="name">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="audit-input"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                      />
                    </div>
                    <div className="audit-field">
                      <label className="audit-label" htmlFor="email">
                        E-Mail
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="audit-input"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                      />
                    </div>
                    <div className="audit-actions">
                      <button type="button" className="audit-btn audit-btn-secondary" onClick={() => setStep(2)}>
                        Zurück
                      </button>
                      <button type="submit" className="audit-btn audit-btn-primary" disabled={!canSubmit}>
                        Audit anfordern →
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </>
        )}

        {phase === 'loading' && (
          <div className="audit-card">
            <div className="audit-loading">
              <div className="audit-spinner" />
              <p className="audit-loading-text">Ihr KI-Audit wird erstellt...</p>
            </div>
          </div>
        )}

        {phase === 'error' && (
          <div className="audit-card">
            <div className="audit-error">
              <p className="audit-error-text">{errorMessage}</p>
              <button type="button" className="audit-btn audit-btn-primary" onClick={() => setPhase('form')}>
                Erneut versuchen
              </button>
            </div>
          </div>
        )}

        {phase === 'results' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {visibility && (
              <div className={`audit-visibility-card ${visibility.bekannt ? 'is-known' : 'is-unknown'}`}>
                <span className="audit-visibility-icon">{visibility.bekannt ? '✅' : '❌'}</span>
                <div>
                  <h3 className={`audit-visibility-title ${visibility.bekannt ? 'is-known' : 'is-unknown'}`}>
                    {visibility.bekannt
                      ? `Claude kennt ${data.firma}`
                      : `Claude kennt ${data.firma} nicht`}
                  </h3>
                  <p className="audit-visibility-text">{visibility.hinweis}</p>
                  <p className="audit-visibility-caption">
                    Basiert auf den Trainingsdaten von Claude — ein Indikator für Ihre KI-Sichtbarkeit, kein
                    Live-Check von ChatGPT oder Perplexity.
                  </p>
                </div>
              </div>
            )}
            <div className="audit-results-intro">
              <p className="audit-subtitle">Ihre drei konkreten Automatisierungsempfehlungen:</p>
            </div>
            <div className="audit-results-grid">
              {results.map((r, i) => (
                <div className="audit-result-card" key={i}>
                  <h3 className="audit-result-title">{r.titel}</h3>
                  <p className="audit-result-problem">{r.problem}</p>
                  <div className="audit-result-badges">
                    <span className="audit-badge audit-badge-time">{r.zeitersparnis}</span>
                    <span className={effortBadgeClass(r.aufwand)}>Aufwand: {r.aufwand}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="audit-results-cta">
              <a href="/#contact" className="audit-btn audit-btn-primary">
                Jetzt umsetzen – Beratung buchen →
              </a>
              <div style={{ marginTop: '16px' }}>
                <button
                  type="button"
                  onClick={restart}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#999',
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Neuen Audit starten
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
