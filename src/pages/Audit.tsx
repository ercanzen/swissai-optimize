import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type { Lang, Translation } from '../i18n'
import { MITARBEITERZAHLEN } from '../i18n'
import './Audit.css'

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

type Severity = 'critical' | 'high' | 'medium' | 'low' | 'passed'
type ReportCategory = 'geo' | 'technical' | 'content' | 'ai_visibility'

interface Evidence {
  id: string
  type: string
  source: string
  snippet: string
}

interface Issue {
  id: string
  category: ReportCategory
  severity: Severity
  message: string
  evidenceId?: string
}

interface Competitor {
  name: string
  domain?: string
  mentionedBy?: string
}

interface AuditReport {
  overall_score: number
  geo_score: number
  technical_score: number
  content_score: number
  ai_visibility_score: number | null
  issues: Issue[]
  evidence: Evidence[]
  competitors: Competitor[]
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

function severityClass(severity: Severity) {
  return `audit-severity-dot audit-severity-${severity}`
}

function severityLabel(severity: Severity, t: Translation) {
  return t.audit.report.severityLabels[severity]
}

function scoreTone(score: number) {
  if (score >= 80) return 'is-good'
  if (score >= 50) return 'is-medium'
  return 'is-bad'
}

export default function Audit({ lang, t }: { lang: Lang; t: Translation }) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [phase, setPhase] = useState<Phase>('form')
  const [data, setData] = useState<AuditFormData>(initialData)
  const [report, setReport] = useState<AuditReport | null>(null)
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
        body: JSON.stringify({ ...data, lang }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || t.audit.unknownError)
      setReport(json as AuditReport)
      setPhase('results')
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : t.audit.unknownError)
      setPhase('error')
    }
  }

  const restart = () => {
    setStep(1)
    setPhase('form')
    setData(initialData)
    setReport(null)
    setErrorMessage('')
  }

  return (
    <div className="audit-page">
      <div className="audit-container">
        <div className="audit-header">
          <h1 className="audit-title">{t.audit.pageTitle}</h1>
          <p className="audit-subtitle">{t.audit.pageSubtitle}</p>
        </div>

        {phase === 'form' && (
          <>
            <div className="audit-steps">
              <span className="audit-step-label">
                {t.audit.stepLabel} {step}/3
              </span>
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
                    <h2 className="audit-step-title">{t.audit.step1Title}</h2>
                    <div className="audit-field">
                      <label className="audit-label" htmlFor="firma">
                        {t.audit.firmaLabel}
                      </label>
                      <input
                        id="firma"
                        type="text"
                        className="audit-input"
                        placeholder={t.audit.firmaPlaceholder}
                        value={data.firma}
                        onChange={(e) => setData({ ...data, firma: e.target.value })}
                      />
                    </div>
                    <div className="audit-field">
                      <label className="audit-label" htmlFor="website">
                        {t.audit.websiteLabel}
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
                        {t.audit.brancheLabel}
                      </label>
                      <select
                        id="branche"
                        className="audit-select"
                        value={data.branche}
                        onChange={(e) => setData({ ...data, branche: e.target.value })}
                      >
                        <option value="" disabled>
                          {t.audit.branchePlaceholder}
                        </option>
                        {t.audit.branchen.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="audit-field">
                      <label className="audit-label" htmlFor="mitarbeiterzahl">
                        {t.audit.mitarbeiterzahlLabel}
                      </label>
                      <select
                        id="mitarbeiterzahl"
                        className="audit-select"
                        value={data.mitarbeiterzahl}
                        onChange={(e) => setData({ ...data, mitarbeiterzahl: e.target.value })}
                      >
                        <option value="" disabled>
                          {t.audit.branchePlaceholder}
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
                        {t.audit.weiter}
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
                    <h2 className="audit-step-title">{t.audit.step2Title}</h2>
                    <div className="audit-checkbox-list">
                      {t.audit.herausforderungenList.map((item) => {
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
                          {t.audit.stundenLabel}
                        </label>
                        <span className="audit-slider-value">
                          {data.stundenProWoche} {t.audit.stundenUnit}
                        </span>
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
                        {t.audit.zurueck}
                      </button>
                      <button
                        type="button"
                        className="audit-btn audit-btn-primary"
                        disabled={!canProceedStep2}
                        onClick={() => setStep(3)}
                      >
                        {t.audit.weiter}
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
                    <h2 className="audit-step-title">{t.audit.step3Title}</h2>
                    <div className="audit-field">
                      <label className="audit-label" htmlFor="name">
                        {t.audit.nameLabel}
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
                        {t.audit.emailLabel}
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
                        {t.audit.zurueck}
                      </button>
                      <button type="submit" className="audit-btn audit-btn-primary" disabled={!canSubmit}>
                        {t.audit.auditAnfordern}
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
              <p className="audit-loading-text">{t.audit.loadingText}</p>
            </div>
          </div>
        )}

        {phase === 'error' && (
          <div className="audit-card">
            <div className="audit-error">
              <p className="audit-error-text">{errorMessage}</p>
              <button type="button" className="audit-btn audit-btn-primary" onClick={() => setPhase('form')}>
                {t.audit.errorRetry}
              </button>
            </div>
          </div>
        )}

        {phase === 'results' && report && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="audit-score-grid">
              <div className={`audit-score-card is-overall ${scoreTone(report.overall_score)}`}>
                <span className="audit-score-value">{report.overall_score}</span>
                <span className="audit-score-label">{t.audit.report.scoreLabels.overall}</span>
              </div>
              <div className={`audit-score-card ${scoreTone(report.technical_score)}`}>
                <span className="audit-score-value">{report.technical_score}</span>
                <span className="audit-score-label">{t.audit.report.scoreLabels.technical}</span>
              </div>
              <div className={`audit-score-card ${scoreTone(report.geo_score)}`}>
                <span className="audit-score-value">{report.geo_score}</span>
                <span className="audit-score-label">{t.audit.report.scoreLabels.geo}</span>
              </div>
              <div className={`audit-score-card ${scoreTone(report.content_score)}`}>
                <span className="audit-score-value">{report.content_score}</span>
                <span className="audit-score-label">{t.audit.report.scoreLabels.content}</span>
              </div>
            </div>

            <div className="audit-ai-visibility-banner">
              <span className="audit-ai-visibility-title">{t.audit.report.aiVisibilityTitle}</span>
              {report.ai_visibility_score !== null ? (
                <span className="audit-ai-visibility-value">{report.ai_visibility_score}/100</span>
              ) : (
                <div className="audit-ai-visibility-pending">
                  <span>{t.audit.report.aiVisibilityNotMeasured}</span>
                  <span className="audit-ai-visibility-caption">{t.audit.report.aiVisibilityComingSoon}</span>
                </div>
              )}
            </div>

            <div className="audit-issues">
              <h3 className="audit-issues-title">{t.audit.report.issuesTitle}</h3>
              <ul className="audit-issues-list">
                {report.issues.map((issue) => {
                  const evidence = issue.evidenceId ? report.evidence.find((e) => e.id === issue.evidenceId) : undefined
                  return (
                    <li key={issue.id} className="audit-issue-item">
                      <span className={severityClass(issue.severity)} aria-hidden="true" />
                      <div className="audit-issue-body">
                        <div className="audit-issue-header">
                          <span className="audit-issue-severity">{severityLabel(issue.severity, t)}</span>
                          <span className="audit-issue-message">{issue.message}</span>
                        </div>
                        {evidence && <blockquote className="audit-issue-evidence">{t.audit.report.evidenceLabel}: {evidence.snippet}</blockquote>}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            {report.competitors.length > 0 && (
              <div className="audit-competitors">
                <h3 className="audit-issues-title">{t.audit.report.competitorsTitle}</h3>
                <div className="audit-competitors-list">
                  {report.competitors.map((c) => (
                    <span className="audit-badge audit-badge-time" key={c.name}>
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="audit-results-cta">
              <a href="/#contact" className="audit-btn audit-btn-primary">
                {t.audit.ctaImplement}
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
                  {t.audit.restartAudit}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
