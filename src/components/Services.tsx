import { Eye, Workflow, Bot, GraduationCap } from 'lucide-react'
import type { Translation } from '../i18n'
import { Section, SectionHeading, Reveal } from './Section'

const ICONS = [Eye, Workflow, Bot, GraduationCap]

export default function Services({ t }: { t: Translation }) {
  return (
    <Section id="services">
      <SectionHeading title={t.services.title} subtitle={t.services.subtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {t.services.items.map((item, i) => {
          const Icon = ICONS[i]
          return (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="group h-full bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-yellow/90 text-[#1a1a1a] mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-[17px] font-medium text-[#1a1a1a] mb-2.5">{item.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-zinc-500">{item.desc}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
