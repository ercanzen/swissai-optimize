import { motion } from 'motion/react'
import type { Lang, Translation } from '../i18n'

const VIDEO_URL = '/hero-video.mp4'

const LANGS: Lang[] = ['de', 'en', 'fr', 'it']

function EyePill() {
  return (
    <span className="w-[16px] md:w-[42px] lg:w-[62px] border-[2px] border-[#1a1a1a] rounded-full inline-flex items-center justify-center align-middle mx-1 py-0.5 md:py-1.5">
      <span className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
    </span>
  )
}

interface HeroProps {
  t: Translation
  lang: Lang
  setLang: (l: Lang) => void
}

export default function Hero({ t, lang, setLang }: HeroProps) {
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
        <div className="absolute top-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-b from-bg-base to-transparent"></div>
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

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.12]"
          >
            <span className="text-[#1a1a1a]">{t.headDark} </span>
            <span className="text-[#8e8e8e]">{t.headGray1}</span>
            <br />
            <span className="text-[#8e8e8e]">{t.headLine2}</span>
            <br />
            <span className="text-[#8e8e8e]">
              {t.headLine3a} <EyePill /> {t.headLine3b}
            </span>
          </motion.h1>

          {/* Search pill + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="bg-white rounded-[6px] border border-black/[0.05] p-1 pl-4 flex items-center shadow-sm w-full max-w-sm">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
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
          </motion.div>
        </div>
      </div>

      {/* Edge anchor — language switcher (middle right) */}
      <div className="absolute right-3 md:right-6 top-[48vh] -translate-y-1/2 z-20 flex flex-col items-center gap-1 rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-sm px-1.5 py-2">
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`w-8 h-8 rounded-full text-[11px] lowercase font-medium transition-all duration-200 ${
              lang === l ? 'bg-[#1a1a1a] text-white' : 'text-zinc-600 hover:bg-white/70'
            }`}
          >
            {l}
          </button>
        ))}
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
