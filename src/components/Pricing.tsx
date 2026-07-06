import { Check } from 'lucide-react'
import type { Translation } from '../i18n'
import { Section, SectionHeading, Reveal } from './Section'

export default function Pricing({ t }: { t: Translation }) {
  return (
    <Section id="pricing">
      <SectionHeading title={t.pricing.title} subtitle={t.pricing.subtitle} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {t.pricing.tiers.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 0.1}>
            <div
              className={`h-full rounded-3xl p-8 flex flex-col ${
                tier.highlight
                  ? 'bg-[#1a1a1a] text-white shadow-xl md:-translate-y-3'
                  : 'bg-white text-[#1a1a1a] border border-black/[0.06] shadow-sm'
              }`}
            >
              {tier.highlight && (
                <span className="self-start mb-4 text-[11px] font-medium uppercase tracking-wide bg-white/15 text-white rounded-full px-3 py-1">
                  {t.pricing.mostPopular}
                </span>
              )}
              <h3 className="font-display text-lg font-medium mb-1">{tier.name}</h3>
              <div className="mb-6">
                <span className="font-display text-4xl font-medium tracking-tight">{tier.price}</span>
                <span className={`ml-1.5 text-[13px] ${tier.highlight ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {tier.period}
                </span>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-snug">
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded-full shrink-0 mt-0.5 ${
                        tier.highlight ? 'bg-white/15 text-white' : 'bg-zinc-100 text-[#1a1a1a]'
                      }`}
                    >
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    <span className={tier.highlight ? 'text-zinc-200' : 'text-zinc-600'}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[13.5px] font-medium transition-colors duration-200 ${
                  tier.highlight
                    ? 'bg-white text-[#1a1a1a] hover:bg-zinc-100'
                    : 'bg-[#1a1a1a] text-white hover:bg-black'
                }`}
              >
                {t.pricing.ctaLabel}
                <span>→</span>
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
