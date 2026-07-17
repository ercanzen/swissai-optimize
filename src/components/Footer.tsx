import { Link } from 'react-router-dom'
import type { Translation } from '../i18n'

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  )
}

export default function Footer({ t }: { t: Translation }) {
  return (
    <footer className="relative w-full bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src="/logo-mark-white-nav.png" alt="SwissAI Optimize" className="w-6 h-6 object-contain" />
          <span className="font-display text-[14px] font-medium text-white">SwissAI Optimize</span>
        </div>

        <div className="flex items-center gap-6 order-3 md:order-2">
          <Link to="/datenschutz" className="text-[13px] text-zinc-400 hover:text-white transition-colors">
            {t.footer.datenschutz}
          </Link>
          <Link to="/impressum" className="text-[13px] text-zinc-400 hover:text-white transition-colors">
            {t.footer.impressum}
          </Link>
        </div>

        <a
          href="https://www.linkedin.com/company/110310581/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="order-2 md:order-3 text-zinc-400 hover:text-white transition-colors"
        >
          <LinkedinIcon />
        </a>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 text-center">
          <span className="text-[12px] text-zinc-400">© 2026 SwissAI Optimize – {t.footer.address}</span>
        </div>
      </div>
    </footer>
  )
}
