import { Section, Reveal } from '../components/Section'

export default function Impressum() {
  return (
    <main className="pt-32 md:pt-44">
      <Section id="impressum">
        <Reveal className="max-w-2xl">
          <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1a1a1a] mb-8">
            Impressum
          </h1>

          <div className="flex flex-col gap-6 text-[15px] leading-relaxed text-zinc-600">
            <div>
              <h2 className="text-[13px] font-medium uppercase tracking-wide text-zinc-400 mb-2">
                Verantwortlich für den Inhalt
              </h2>
              <p>
                Ercan Zengin
                <br />
                Einzelunternehmen
                <br />
                Aarestrasse 12
                <br />
                3052 Zollikofen
                <br />
                Kanton Bern, Schweiz
              </p>
            </div>

            <div>
              <h2 className="text-[13px] font-medium uppercase tracking-wide text-zinc-400 mb-2">Kontakt</h2>
              <p>
                E-Mail:{' '}
                <a href="mailto:info@swissai-optimize.ch" className="underline underline-offset-4 hover:no-underline">
                  info@swissai-optimize.ch
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-[13px] font-medium uppercase tracking-wide text-zinc-400 mb-2">Haftungsausschluss</h2>
              <p>
                Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit,
                Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Verweise und
                Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs; für deren Inhalte wird
                keine Haftung übernommen.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  )
}
