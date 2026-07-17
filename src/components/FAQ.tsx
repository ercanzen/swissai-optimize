import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus } from 'lucide-react'
import type { Translation } from '../i18n'
import { Section, SectionHeading, Reveal } from './Section'

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-black/[0.08] py-5">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-[15px] font-medium text-[#1a1a1a]">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-[#1a1a1a]"
        >
          <Plus size={18} strokeWidth={2} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-[13.5px] leading-relaxed text-zinc-500 max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ({ t }: { t: Translation }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <Section id="faq">
      <SectionHeading title={t.faq.title} subtitle={t.faq.subtitle} />
      <Reveal className="max-w-3xl">
        {t.faq.items.map((item, i) => (
          <FAQItem
            key={item.q}
            q={item.q}
            a={item.a}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </Reveal>
    </Section>
  )
}
