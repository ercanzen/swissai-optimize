import Hero from '../components/Hero'
import Services from '../components/Services'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
import type { Translation } from '../i18n'

export default function Landing({ t }: { t: Translation }) {
  return (
    <main>
      <Hero t={t} />
      <Services t={t} />
      <Pricing t={t} />
      <Contact t={t} />
    </main>
  )
}
