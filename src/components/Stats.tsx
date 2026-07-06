import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import type { Translation } from '../i18n'
import { Reveal } from './Section'

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1200
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl font-medium text-white tracking-tight">
      {value}
      {suffix}
    </span>
  )
}

export default function Stats({ t }: { t: Translation }) {
  return (
    <section className="relative w-full py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-20">
        <Reveal>
          <div className="bg-[#1a1a1a] rounded-3xl px-8 md:px-14 py-12 md:py-14 grid grid-cols-2 lg:grid-cols-4 gap-10">
            {t.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                <CountUp target={s.value} suffix={s.suffix} />
                <span className="text-[12.5px] text-zinc-400 lowercase tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
