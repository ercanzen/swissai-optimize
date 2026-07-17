import Hero from '../components/Hero'
import Services from '../components/Services'
import Stats from '../components/Stats'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
import type { Translation } from '../i18n'

export default function Landing({ t }: { t: Translation }) {
  return (
    <main>
      <Hero t={t} />
      <Services t={t} />
      <Stats t={t} />
      <About t={t} />
      <Testimonials t={t} />
      <FAQ t={t} />
      <Pricing t={t} />
      <Contact t={t} />
    </main>
  )
}
