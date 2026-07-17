import { Quote } from 'lucide-react'
import type { Translation } from '../i18n'
import { Section, SectionHeading, Reveal } from './Section'

export default function Testimonials({ t }: { t: Translation }) {
  return (
    <Section id="testimonials">
      <SectionHeading title={t.testimonials.title} subtitle={t.testimonials.subtitle} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {t.testimonials.items.map((item, i) => (
          <Reveal key={item.name} delay={i * 0.1}>
            <div className="relative h-full bg-white rounded-2xl p-7 shadow-sm border border-black/[0.04]">
              <span className="absolute top-5 right-5 text-[10px] uppercase tracking-wide text-zinc-400 bg-zinc-100 rounded-full px-2.5 py-1">
                {t.testimonials.badge}
              </span>
              <Quote size={22} strokeWidth={1.8} className="text-zinc-300 mb-4" />
              <p className="text-[13.5px] leading-relaxed text-zinc-600 mb-6">&ldquo;{item.quote}&rdquo;</p>
              <div>
                <p className="text-[13px] font-medium text-[#1a1a1a]">{item.name}</p>
                <p className="text-[12.5px] text-zinc-500">{item.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
