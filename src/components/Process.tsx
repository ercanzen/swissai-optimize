import type { Translation } from '../i18n'
import { Section, SectionHeading, Reveal } from './Section'

export default function Process({ t }: { t: Translation }) {
  return (
    <Section id="process">
      <SectionHeading title={t.process.title} subtitle={t.process.subtitle} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {t.process.steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.12}>
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-display text-5xl md:text-6xl font-light text-[#1a1a1a]/10 leading-none select-none">
                  0{i + 1}
                </span>
                <span className="h-px flex-1 bg-[#1a1a1a]/10 hidden md:block" />
              </div>
              <h3 className="font-display text-xl font-medium text-[#1a1a1a] mb-2 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-yellow inline-block" />
                {step.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-zinc-500">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
