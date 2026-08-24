import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Audit from './pages/Audit'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
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
    <div className="min-h-screen bg-white selection:bg-brand-yellow selection:text-black">
      <Navbar t={t} lang={lang} setLang={setLang} />
      <Routes>
        <Route path="/" element={<Landing t={t} />} />
        <Route path="/audit" element={<Audit lang={lang} t={t} />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
      </Routes>
      <Footer t={t} />
    </div>
  )
}
