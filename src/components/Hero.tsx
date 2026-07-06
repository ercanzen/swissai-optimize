import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import type { Translation } from '../i18n'

const VIDEO_URL = '/hero-video.mp4'
const WORD_EASE = [0.16, 1, 0.3, 1] as const

function Word({ children, index, className = '' }: { children: string; index: number; className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: WORD_EASE }}
      className={`inline-block ${className}`}
    >
      {children}
      <>&nbsp;</>
    </motion.span>
  )
}

function EyePill({ index }: { index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: WORD_EASE }}
      className="w-[16px] md:w-[42px] lg:w-[62px] border-[2px] border-[#1a1a1a] rounded-full inline-flex items-center justify-center align-middle mx-1 py-0.5 md:py-1.5"
    >
      <span className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
    </motion.span>
  )
}

function AnimatedHeadline({ t }: { t: Translation }) {
  const darkWords = t.headDark.split(' ')
  const grayWords1 = t.headGray1.split(' ')
  const line2Words = t.headLine2.split(' ')
  const line3aWords = t.headLine3a.split(' ')
  const line3bWords = t.headLine3b.split(' ')

  let i = 0
  const darkIdx = darkWords.map(() => i++)
  const gray1Idx = grayWords1.map(() => i++)
  const line2Idx = line2Words.map(() => i++)
  const line3aIdx = line3aWords.map(() => i++)
  const pillIdx = i++
  const line3bIdx = line3bWords.map(() => i++)

  return (
    <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.12]">
      {darkWords.map((w, idx) => (
        <Word key={`d${idx}`} index={darkIdx[idx]} className="text-[#1a1a1a]">
          {w}
        </Word>
      ))}
      {grayWords1.map((w, idx) => (
        <Word key={`g1${idx}`} index={gray1Idx[idx]} className="text-[#8e8e8e]">
          {w}
        </Word>
      ))}
      <br />
      {line2Words.map((w, idx) => (
        <Word key={`l2${idx}`} index={line2Idx[idx]} className="text-[#8e8e8e]">
          {w}
        </Word>
      ))}
      <br />
      {line3aWords.map((w, idx) => (
        <Word key={`l3a${idx}`} index={line3aIdx[idx]} className="text-[#8e8e8e]">
          {w}
        </Word>
      ))}
      <EyePill index={pillIdx} />
      {line3bWords.map((w, idx) => (
        <Word key={`l3b${idx}`} index={line3bIdx[idx]} className="text-[#8e8e8e]">
          {w}
        </Word>
      ))}
    </h1>
  )
}

function useTypedPlaceholder(fullText: string) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    setTyped('')
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(fullText.slice(0, i))
      if (i >= fullText.length) clearInterval(id)
    }, 45)
    return () => clearInterval(id)
  }, [fullText])

  return typed
}

export default function Hero({ t }: { t: Translation }) {
  const typedPlaceholder = useTypedPlaceholder(t.searchPlaceholder)

  return (
    <section className="relative min-h-[110vh] sm:min-h-[140vh] w-full flex flex-col items-center justify-start overflow-hidden bg-bg-base">
      {/* Background video */}
      <div className="absolute top-[15vh] sm:top-[20vh] left-0 w-full h-[95vh] sm:h-[120vh] z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-poster.jpg"
          className="w-full h-full object-cover opacity-100"
          src={VIDEO_URL}
        />
        {/* Top mask: blend video into page background */}
        <div className="absolute top-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-b from-bg-base to-transparent"></div>
        {/* Left mask: keep headline readable over the video */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-base via-bg-base/55 to-transparent"></div>
      </div>

      {/* Hero content */}
      <div className="max-w-7xl w-full mx-auto px-8 md:px-16 lg:px-20 relative z-10 grid grid-cols-12 gap-x-4 md:gap-x-8 pt-32 md:pt-44">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          {/* Badge */}
          <motion.a
            href="#services"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-zinc-600 hover:text-zinc-900 transition-colors mb-4 group"
          >
            <span className="w-2 h-2 rounded-full bg-brand-yellow inline-block" />
            {t.badge}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </motion.a>

          <AnimatedHeadline t={t} />

          {/* Search pill + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-8 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4"
          >
            <div className="bg-white rounded-[6px] border border-black/[0.05] p-1 pl-4 flex items-center shadow-sm w-full max-w-sm">
              <input
                type="text"
                placeholder={typedPlaceholder}
                className="flex-1 bg-transparent outline-none text-[14px] text-zinc-800 placeholder:text-zinc-400"
              />
              <button
                aria-label="Send"
                className="bg-[#1a1a1a] text-white w-9 h-9 rounded-full relative shrink-0 hover:bg-black transition-colors"
              >
                <svg
                  className="absolute inset-0 m-auto"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#1a1a1a] border border-[#1a1a1a]/30 rounded-full px-5 py-2.5 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all duration-200 group whitespace-nowrap"
            >
              {t.cta}
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[13px] font-medium bg-[#1a1a1a] text-white rounded-full px-5 py-2.5 hover:bg-black transition-all duration-200 group whitespace-nowrap"
            >
              {t.consultCta}
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Edge anchor — bottom left */}
      <div className="absolute bottom-6 left-6 md:left-10 z-10 text-[11px] tracking-widest text-zinc-500 lowercase">
        2026
      </div>

      {/* Edge anchor — bottom right */}
      <div className="absolute bottom-6 right-6 md:right-10 z-10 text-[11px] tracking-widest text-zinc-500 lowercase">
        {t.cornerRight}
      </div>
    </section>
  )
}
