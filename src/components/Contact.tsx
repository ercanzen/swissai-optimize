import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Translation } from '../i18n'
import { Section, Reveal } from './Section'

const CONTACT_EMAIL = 'info@swissai-optimize.ch'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact({ t }: { t: Translation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const openMailClient = () => {
    const subject = encodeURIComponent(`Anfrage von ${name}${company ? ` (${company})` : ''}`)
    const body = encodeURIComponent(
      `${message}\n\n— ${name} (${email})\nUnternehmen: ${company}\nThema: ${service}`,
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, service, message }),
      })
      if (!res.ok) throw new Error('Kontaktanfrage fehlgeschlagen')
      setStatus('sent')
    } catch {
      setStatus('error')
      openMailClient()
    }
  }

  const inputClasses =
    'w-full bg-white rounded-xl border border-black/[0.08] px-4 py-3 text-[14px] text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-[#1a1a1a]/30 shadow-sm transition-colors'

  return (
    <Section id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1a1a1a] mb-5">
              {t.contactSection.title}
            </h2>
            <p className="text-[15px] leading-relaxed text-zinc-500 max-w-md mb-8">{t.contactSection.subtitle}</p>
            <p className="text-[13.5px] text-zinc-500">
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-[#1a1a1a] underline underline-offset-4 hover:no-underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          {status === 'sent' ? (
            <p className="text-[15px] leading-relaxed text-zinc-600 bg-zinc-50 border border-black/[0.06] rounded-xl px-5 py-6">
              {t.contactSection.success}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.contactSection.name}
                  className={inputClasses}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.contactSection.email}
                  className={inputClasses}
                />
              </div>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={t.contactSection.company}
                className={inputClasses}
              />
              <select
                required
                aria-label={t.contactSection.servicePlaceholder}
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={`${inputClasses} ${service ? 'text-zinc-800' : 'text-zinc-400'}`}
              >
                <option value="" disabled>
                  {t.contactSection.servicePlaceholder}
                </option>
                {t.contactSection.serviceOptions.map((opt) => (
                  <option key={opt} value={opt} className="text-zinc-800">
                    {opt}
                  </option>
                ))}
              </select>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.contactSection.message}
                rows={5}
                className={`${inputClasses} resize-none`}
              />
              {status === 'error' && (
                <p className="text-[13px] text-red-500">{t.contactSection.errorFallback}</p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="self-start inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-[14px] font-medium rounded-full px-7 py-3.5 hover:bg-black transition-colors duration-200 group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? t.contactSection.sending : t.contactSection.send}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  )
}
