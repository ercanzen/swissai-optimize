import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import type { Translation } from '../i18n'
import { Section, Reveal } from './Section'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1200
    const start = performance.now()
    let frame: number
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export default function Stats({ t }: { t: Translation }) {
  return (
    <Section id="stats" className="!py-12 md:!py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 rounded-3xl bg-[#1a1a1a] px-8 py-10 md:px-12 md:py-12">
        {t.stats.items.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.08} className="text-center md:text-left">
            <div className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-white">
              <Counter value={item.value} suffix={item.suffix} />
            </div>
            <p className="mt-2 text-[12.5px] leading-snug text-zinc-400">{item.label}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
