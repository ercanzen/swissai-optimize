import { Section, Reveal } from '../components/Section'

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[13px] font-medium uppercase tracking-wide text-zinc-400 mb-2">{title}</h2>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  )
}

export default function Datenschutz() {
  return (
    <main className="pt-32 md:pt-44 pb-16 md:pb-[120px]">
      <Section id="datenschutz">
        <Reveal className="max-w-2xl">
          <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1a1a1a] mb-8">
            Datenschutzerklärung
          </h1>

          <div className="flex flex-col gap-8 text-[15px] leading-relaxed text-zinc-600">
            <Block title="Verantwortliche Stelle">
              <p>
                Ercan Zengin, Einzelunternehmen, Aarestrasse 12, 3052 Zollikofen, Kanton Bern, Schweiz.
                <br />
                E-Mail:{' '}
                <a href="mailto:info@swissai-optimize.ch" className="underline underline-offset-4 hover:no-underline">
                  info@swissai-optimize.ch
                </a>
              </p>
            </Block>

            <Block title="Welche Daten wir erheben">
              <p>
                <strong>Kontaktformular:</strong> Name, E-Mail-Adresse, Unternehmen, gewähltes Thema und Ihre
                Nachricht.
              </p>
              <p>
                <strong>KI-Audit-Tool:</strong> Firmenname, Website-URL, Branche, Mitarbeiterzahl, angegebene
                Herausforderungen, geschätzter Zeitaufwand pro Woche, sowie Ihr Name und Ihre E-Mail-Adresse.
              </p>
            </Block>

            <Block title="Zweck der Bearbeitung">
              <p>
                Wir verwenden diese Angaben, um Ihre Anfrage zu beantworten, Ihnen einen personalisierten
                KI-Audit-Bericht zu erstellen und Ihnen — sofern Sie das KI-Audit-Tool genutzt haben — in
                unregelmässigen Abständen eine kurze, auf Ihr Unternehmen zugeschnittene Update-E-Mail zu KI-Themen
                zuzusenden. Jede dieser E-Mails enthält einen Abmeldelink.
              </p>
            </Block>

            <Block title="Weitergabe an Dritte / Auftragsverarbeiter">
              <p>Zur Erbringung unserer Dienstleistung setzen wir folgende externe Anbieter ein:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>
                  <strong>Anthropic PBC</strong> (USA) — verarbeitet Ihre Angaben aus dem KI-Audit-Tool, um die
                  Empfehlungen und den Sichtbarkeits-Check zu erstellen.
                </li>
                <li>
                  <strong>Resend</strong> (USA) — versendet unsere E-Mails an Sie und unsere internen
                  Lead-Benachrichtigungen.
                </li>
                <li>
                  <strong>Upstash</strong> — speichert die Angaben aus dem KI-Audit-Tool, damit wir Ihnen die
                  wöchentlichen Updates zusenden können.
                </li>
              </ul>
              <p>
                Eine Datenübermittlung an diese Anbieter kann eine Bearbeitung ausserhalb der Schweiz und der EU
                (insbesondere in den USA) beinhalten.
              </p>
            </Block>

            <Block title="Speicherdauer">
              <p>
                Daten aus dem KI-Audit-Tool werden gespeichert, bis Sie sich über den Abmeldelink abmelden oder eine
                Löschung verlangen (siehe unten).
              </p>
            </Block>

            <Block title="Cookies & Tracking">
              <p>Diese Website verwendet derzeit keine Analyse- oder Tracking-Cookies.</p>
            </Block>

            <Block title="Ihre Rechte">
              <p>
                Sie haben das Recht, Auskunft über die von uns bearbeiteten Daten zu verlangen sowie deren
                Berichtigung oder Löschung zu beantragen. Kontaktieren Sie uns dazu unter{' '}
                <a href="mailto:info@swissai-optimize.ch" className="underline underline-offset-4 hover:no-underline">
                  info@swissai-optimize.ch
                </a>
                .
              </p>
            </Block>
          </div>
        </Reveal>
      </Section>
    </main>
  )
}
