import { Eye, Workflow, Bot } from 'lucide-react'
import type { Translation } from '../i18n'
import { Section, SectionHeading, Reveal } from './Section'

const ICONS = [Eye, Workflow, Bot]

export default function Services({ t }: { t: Translation }) {
  return (
    <Section id="services">
      <SectionHeading title={t.services.title} subtitle={t.services.subtitle} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {t.services.items.map((item, i) => {
          const Icon = ICONS[i]
          return (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="group h-full bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-black/[0.04]">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#1a1a1a] text-white mb-6">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-[17px] font-medium text-[#1a1a1a] mb-2.5">{item.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-zinc-500 mb-5">{item.desc}</p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1a1a1a] group/link"
                >
                  {t.services.learnMore}
                  <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
                </a>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
