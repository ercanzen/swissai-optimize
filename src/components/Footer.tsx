import type { Translation } from '../i18n'

const NAV_HREFS = ['#services', '#process', '#about', '#faq']

export default function Footer({ t }: { t: Translation }) {
  return (
    <footer className="relative w-full border-t border-black/[0.05] bg-white/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-20 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center rounded-full w-10 h-10 bg-white/70 border border-white/60 shadow-sm">
                <img src="/logo-mark.png" alt="SwissAI Optimize" className="w-6 h-6 object-contain" />
              </span>
              <span className="font-display text-[16px] font-medium text-[#1a1a1a]">SwissAI Optimize</span>
            </div>
            <p className="text-[13.5px] text-zinc-500 max-w-xs">{t.footer.tagline}</p>
          </div>
          <div className="md:col-span-3">
            <h4 className="text-[12px] uppercase tracking-widest text-zinc-400 mb-4">{t.footer.nav}</h4>
            <div className="flex flex-col gap-2.5">
              {t.nav.map((link, i) => (
                <a
                  key={link}
                  href={NAV_HREFS[i]}
                  className="text-[13.5px] lowercase text-zinc-600 hover:text-[#1a1a1a] transition-colors w-fit"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            <h4 className="text-[12px] uppercase tracking-widest text-zinc-400 mb-4">{t.footer.legal}</h4>
            <div className="flex flex-col gap-2.5">
              <a href="#" className="text-[13.5px] text-zinc-600 hover:text-[#1a1a1a] transition-colors w-fit">
                {t.footer.impressum}
              </a>
              <a href="#" className="text-[13.5px] text-zinc-600 hover:text-[#1a1a1a] transition-colors w-fit">
                {t.footer.datenschutz}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-black/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-[12px] text-zinc-400">© 2026 SwissAI Optimize</span>
          <span className="text-[12px] text-zinc-400">{t.footer.madeIn} 🇨🇭</span>
        </div>
      </div>
    </footer>
  )
}
