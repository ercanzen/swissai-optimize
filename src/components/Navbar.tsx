import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type { Translation } from '../i18n'

function Logo() {
  return (
    <img
      src="/logo-mark.png"
      alt="SwissAI Optimize"
      className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
    />
  )
}

const NAV_HREFS = ['#services', '#process', '#about', '#faq']

export default function Navbar({ t }: { t: Translation }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-6 md:py-10 bg-gradient-to-b from-[#f1f1f1]/80 to-transparent backdrop-blur-[2px]">
      <nav className="grid grid-cols-12 items-center max-w-7xl mx-auto px-6 md:px-10 gap-x-4">
        {/* Left — logo capsule + brand */}
        <div className="col-span-6 md:col-span-3 flex items-center gap-3">
          <span className="flex items-center justify-center rounded-full w-10 h-10 sm:w-11 sm:h-11 shrink-0 bg-white/60 border border-white/50 backdrop-blur-md shadow-sm">
            <Logo />
          </span>
          <a href="#" className="font-display text-[17px] font-medium tracking-tight text-[#1a1a1a]">
            SwissAI&nbsp;Optimize
          </a>
        </div>

        {/* Center — desktop links */}
        <div className="hidden md:flex col-span-6 items-center justify-center">
          <div className="flex items-center gap-8 rounded-xl px-8 py-3 bg-white/50 border border-white/50 backdrop-blur-md shadow-sm">
            {t.nav.map((link, i) => (
              <a
                key={link}
                href={NAV_HREFS[i]}
                className="text-[13px] lowercase font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Right — contact, CTA, hamburger */}
        <div className="col-span-6 md:col-span-3 flex items-center justify-end gap-4">
          <a
            href="#contact"
            className="hidden sm:inline text-[13px] lowercase font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
          >
            {t.contact}
          </a>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-[13px] lowercase font-medium rounded-full px-5 py-2.5 hover:bg-black transition-colors duration-200 group"
          >
            {t.getStarted}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>

          {/* Animated hamburger (mobile) */}
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full bg-white/60 border border-white/50 backdrop-blur-md"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="block w-4.5 h-[1.5px] bg-[#1a1a1a] origin-center"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className="block w-4.5 h-[1.5px] bg-[#1a1a1a] origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
          >
            <div className="mx-6 mt-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg p-6 flex flex-col gap-4">
              {t.nav.map((link, i) => (
                <a
                  key={link}
                  href={NAV_HREFS[i]}
                  onClick={() => setOpen(false)}
                  className="text-[15px] lowercase font-medium text-gray-800 hover:text-black transition-colors"
                >
                  {link}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white text-[14px] lowercase font-medium rounded-full px-5 py-3 mt-2"
              >
                {t.getStarted} <span>→</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
