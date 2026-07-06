import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import Stats from './components/Stats'
import About from './components/About'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { translations, type Lang } from './i18n'

const LANGS: Lang[] = ['de', 'en', 'fr', 'it']

function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (fromUrl && LANGS.includes(fromUrl as Lang)) return fromUrl as Lang
  const stored = localStorage.getItem('lang')
  if (stored && LANGS.includes(stored as Lang)) return stored as Lang
  return 'de'
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const t = translations[lang]

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <div className="min-h-screen bg-bg-base selection:bg-brand-yellow selection:text-black">
      <Navbar t={t} />
      <main>
        <Hero t={t} lang={lang} setLang={setLang} />
        <Services t={t} />
        <Process t={t} />
        <Stats t={t} />
        <About t={t} />
        <Faq t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}
