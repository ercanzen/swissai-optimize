import { Check } from 'lucide-react'
import type { Translation } from '../i18n'
import { Section, Reveal } from './Section'

export default function About({ t }: { t: Translation }) {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="relative">
            <img
              src="/about.jpg"
              alt="SwissAI Optimize"
              className="w-full rounded-3xl shadow-lg border border-white/60 object-cover aspect-[4/3]"
              loading="lazy"
            />
            <div className="absolute -bottom-4 -right-4 md:-bottom-5 md:-right-5 bg-brand-yellow rounded-2xl px-5 py-3.5 shadow-md">
              <span className="font-display text-[14px] font-medium text-[#1a1a1a]">🇨🇭 Swiss made</span>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1a1a1a] mb-6">
              {t.about.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[15px] leading-relaxed text-zinc-600 mb-4">{t.about.p1}</p>
            <p className="text-[15px] leading-relaxed text-zinc-500 mb-8">{t.about.p2}</p>
          </Reveal>
          <div className="flex flex-col gap-3.5">
            {t.about.points.map((point, i) => (
              <Reveal key={point} delay={0.12 + i * 0.07}>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-yellow shrink-0">
                    <Check size={13} strokeWidth={2.5} className="text-[#1a1a1a]" />
                  </span>
                  <span className="text-[14.5px] font-medium text-zinc-700">{point}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
