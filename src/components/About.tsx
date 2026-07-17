import { ShieldCheck, MapPin, UserRound } from 'lucide-react'
import type { Translation } from '../i18n'
import { Section, Reveal } from './Section'

const ICONS = [MapPin, ShieldCheck, UserRound]

export default function About({ t }: { t: Translation }) {
  return (
    <Section id="about" className="bg-bg-base/40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1a1a1a]">
              {t.about.title}
            </h2>
            <p className="mt-4 text-[15px] text-zinc-500 max-w-md">{t.about.subtitle}</p>
            <p className="mt-6 text-[14px] leading-relaxed text-zinc-600 max-w-md">{t.about.paragraph}</p>
          </Reveal>
        </div>
        <div className="flex flex-col gap-4">
          {t.about.points.map((point, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal key={point.title} delay={0.1 + i * 0.1}>
                <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm border border-black/[0.04]">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1a1a1a] text-white shrink-0">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-medium text-[#1a1a1a] mb-1">{point.title}</h3>
                    <p className="text-[13.5px] leading-relaxed text-zinc-500">{point.desc}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
