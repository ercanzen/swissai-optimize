export type Lang = 'de' | 'en' | 'fr' | 'it'

export interface PricingTier {
  name: string
  price: string
  period: string
  features: string[]
  highlight?: boolean
}

export interface Translation {
  nav: string[]
  contact: string
  getStarted: string
  badge: string
  headDark: string
  headGray1: string
  headLine2: string
  headLine3a: string
  headLine3b: string
  searchPlaceholder: string
  cta: string
  consultCta: string
  cornerRight: string
  services: {
    title: string
    subtitle: string
    learnMore: string
    items: { title: string; desc: string }[]
  }
  stats: {
    items: { value: number; suffix: string; label: string }[]
  }
  about: {
    title: string
    subtitle: string
    paragraph: string
    points: { title: string; desc: string }[]
  }
  testimonials: {
    title: string
    subtitle: string
    badge: string
    items: { quote: string; name: string; role: string }[]
  }
  faq: {
    title: string
    subtitle: string
    items: { q: string; a: string }[]
  }
  pricing: {
    title: string
    subtitle: string
    mostPopular: string
    ctaLabel: string
    tiers: PricingTier[]
  }
  contactSection: {
    title: string
    subtitle: string
    name: string
    email: string
    company: string
    servicePlaceholder: string
    serviceOptions: string[]
    message: string
    send: string
    sending: string
    success: string
    errorFallback: string
  }
  footer: {
    datenschutz: string
    impressum: string
    address: string
  }
  audit: {
    pageTitle: string
    pageSubtitle: string
    stepLabel: string
    step1Title: string
    step2Title: string
    step3Title: string
    firmaLabel: string
    firmaPlaceholder: string
    websiteLabel: string
    branchePlaceholder: string
    brancheLabel: string
    branchen: string[]
    mitarbeiterzahlLabel: string
    herausforderungenList: string[]
    stundenLabel: string
    stundenUnit: string
    nameLabel: string
    emailLabel: string
    weiter: string
    zurueck: string
    auditAnfordern: string
    loadingText: string
    errorRetry: string
    unknownError: string
    visibilityKnown: string
    visibilityUnknown: string
    visibilityCaption: string
    resultsIntro: string
    effortPrefix: string
    effortLevels: { niedrig: string; mittel: string; hoch: string }
    ctaImplement: string
    restartAudit: string
  }
}

export const MITARBEITERZAHLEN = ['1-5', '6-20', '21-50', '50+']

const NAV = {
  de: ['leistungen', 'preise', 'kontakt'],
  en: ['services', 'pricing', 'contact'],
  fr: ['services', 'tarifs', 'contact'],
  it: ['servizi', 'prezzi', 'contatto'],
}

export const translations: Record<Lang, Translation> = {
  de: {
    nav: NAV.de,
    contact: 'kontakt',
    getStarted: 'loslegen',
    badge: 'Sichtbarkeit in ChatGPT, Perplexity & Co.',
    headDark: 'SwissAI Optimize macht Sie',
    headGray1: 'sichtbar in der KI.',
    headLine2: 'Ihre Kunden fragen längst nicht mehr Google —',
    headLine3a: 'sie fragen',
    headLine3b: 'direkt die KI.',
    searchPlaceholder: 'Fragen Sie mich alles...',
    cta: 'Sichtbarkeit prüfen',
    consultCta: 'Kostenlose Beratung',
    cornerRight: 'ki-sichtbarkeit',
    services: {
      title: 'Unsere Leistungen',
      subtitle: 'Drei Wege, wie wir Ihr Unternehmen in der KI-Suche nach vorne bringen.',
      learnMore: 'Mehr erfahren',
      items: [
        {
          title: 'AEO / GEO',
          desc: 'Wir optimieren Ihre Präsenz für KI-Suchsysteme wie ChatGPT, Perplexity und Google KI — damit diese Sie kennen und empfehlen.',
        },
        {
          title: 'Prozess-Automatisierung',
          desc: 'Wiederkehrende Aufgaben laufen automatisch — von der Rechnungsverarbeitung bis zum Reporting. Mehr Zeit für das Wesentliche.',
        },
        {
          title: 'KI-Assistent',
          desc: 'Ein KI-Chatbot beantwortet Kundenanfragen rund um die Uhr — freundlich, präzise und in vier Sprachen.',
        },
      ],
    },
    stats: {
      items: [
        { value: 4, suffix: '', label: 'Sprachen im Einsatz' },
        { value: 24, suffix: '/7', label: 'KI-Erreichbarkeit möglich' },
        { value: 100, suffix: '%', label: 'Hosting & Support in der Schweiz' },
        { value: 45, suffix: ' Min.', label: 'kostenlose Erstberatung' },
      ],
    },
    about: {
      title: 'Warum SwissAI Optimize',
      subtitle: 'Schweizer Qualität, Schweizer Datenschutz — und ein Team, das erreichbar bleibt.',
      paragraph:
        'Wir sind ein Schweizer Team, das sich auf KI-Sichtbarkeit und Prozessautomatisierung für KMU spezialisiert hat. Statt Ihnen ein fertiges Paket zu verkaufen, schauen wir uns Ihr Unternehmen genau an und setzen dort an, wo es den grössten Unterschied macht.',
      points: [
        {
          title: 'Made in Switzerland',
          desc: 'Entwicklung, Hosting und Support aus der Schweiz — kurze Wege, direkter Kontakt.',
        },
        {
          title: 'Datenschutz nach Schweizer Recht',
          desc: 'Ihre Daten werden nach nDSG und DSGVO behandelt — keine Weitergabe an Dritte ohne Zustimmung.',
        },
        {
          title: 'Persönliche Betreuung',
          desc: 'Ein fester Ansprechpartner statt wechselnder Support-Tickets.',
        },
      ],
    },
    testimonials: {
      title: 'Das sagen unsere Kunden',
      subtitle: 'Beispielhafte Rückmeldungen — echte Kundenstimmen folgen in Kürze.',
      badge: 'Beispiel',
      items: [
        {
          quote:
            'Wir wissen jetzt, wie wir in ChatGPT & Co. vorkommen — und was wir tun müssen, um dort sichtbar zu bleiben.',
          name: 'A. B.',
          role: 'Inhaber, Treuhandbüro',
        },
        {
          quote: 'Die Rechnungsverarbeitung läuft jetzt automatisch. Das spart uns jede Woche mehrere Stunden.',
          name: 'S. M.',
          role: 'Geschäftsführerin, Handwerksbetrieb',
        },
        {
          quote: 'Der KI-Chatbot beantwortet die häufigsten Kundenfragen — auch ausserhalb der Öffnungszeiten.',
          name: 'D. R.',
          role: 'Marketingleiter, KMU',
        },
      ],
    },
    faq: {
      title: 'Häufige Fragen',
      subtitle: 'Antworten auf die Fragen, die uns am häufigsten gestellt werden.',
      items: [
        {
          q: 'Wie lange dauert ein KI-Projekt?',
          a: 'Der Sichtbarkeits-Audit ist innerhalb einer Woche abgeschlossen. Laufende Optimierung und Automatisierung sind fortlaufende Prozesse — erste Resultate sehen Sie meist innerhalb von 4–6 Wochen.',
        },
        {
          q: 'Wo werden meine Daten gespeichert?',
          a: 'Ihre Daten werden in der Schweiz gehostet und gemäss nDSG sowie DSGVO verarbeitet. Details finden Sie in unserer Datenschutzerklärung.',
        },
        {
          q: 'Muss ich mich langfristig binden?',
          a: 'Nein. Der Audit ist ein einmaliges Angebot, die monatlichen Pakete sind jederzeit kündbar.',
        },
        {
          q: 'In welchen Sprachen arbeiten Sie?',
          a: 'Wir arbeiten auf Deutsch, Englisch, Französisch und Italienisch — passend zur Schweizer Kundschaft.',
        },
        {
          q: 'Brauche ich technisches Vorwissen?',
          a: 'Nein. Wir übernehmen die technische Umsetzung; Sie müssen nur Ihr Unternehmen und Ihre Ziele kennen.',
        },
        {
          q: 'Wie starten wir?',
          a: 'Am einfachsten mit einem kostenlosen 45-minütigen Erstgespräch — dort klären wir Ihre Ausgangslage und die nächsten Schritte.',
        },
      ],
    },
    pricing: {
      title: 'Transparente Preise',
      subtitle: 'Wählen Sie das Modell, das zu Ihrem Unternehmen passt. Jederzeit kündbar.',
      mostPopular: 'Beliebteste Wahl',
      ctaLabel: 'Anfrage senden',
      tiers: [
        {
          name: 'Audit',
          price: 'CHF 690',
          period: 'einmalig',
          features: [
            'KI-Sichtbarkeits-Check (ChatGPT, Perplexity, Google KI)',
            'Wettbewerbsanalyse',
            'Massnahmenplan als PDF-Report',
            '45-minütiges Auswertungsgespräch',
          ],
        },
        {
          name: 'Basis',
          price: 'CHF 490',
          period: '/ Monat',
          highlight: true,
          features: [
            'Alles aus dem Audit',
            'Laufende KI-Sichtbarkeits-Optimierung',
            'Eine Prozessautomatisierung',
            'Monatliches Reporting',
            'E-Mail-Support',
          ],
        },
        {
          name: 'Premium',
          price: 'CHF 990',
          period: '/ Monat',
          features: [
            'Alles aus Basis',
            'Eigener KI-Chatbot für Ihre Website',
            'Unbegrenzte Prozessautomatisierungen',
            'Priority-Support (Telefon & E-Mail)',
            'Vierteljährliche Strategie-Session',
          ],
        },
      ],
    },
    contactSection: {
      title: 'Sprechen wir über Ihr Unternehmen',
      subtitle: 'Kostenlose Erstberatung, 45 Min., kein Verkaufsdruck.',
      name: 'Name',
      email: 'E-Mail',
      company: 'Unternehmen',
      servicePlaceholder: 'Welches Thema interessiert Sie?',
      serviceOptions: ['AEO / GEO – KI-Sichtbarkeit', 'Prozess-Automatisierung', 'KI-Assistent', 'Sonstiges'],
      message: 'Ihre Nachricht',
      send: 'Anfrage senden',
      sending: 'Wird gesendet...',
      success: 'Danke! Ihre Anfrage ist bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden.',
      errorFallback: 'Der Versand hat leider nicht geklappt — wir öffnen stattdessen Ihr E-Mail-Programm.',
    },
    footer: {
      datenschutz: 'Datenschutz',
      impressum: 'Impressum',
      address: 'Zollikofen, Bern',
    },
    audit: {
      pageTitle: 'Kostenloser KI-Audit',
      pageSubtitle: 'In 2 Minuten erfahren Sie, welche KI-Automatisierungen Ihr Unternehmen voranbringen.',
      stepLabel: 'Schritt',
      step1Title: 'Ihr Unternehmen',
      step2Title: 'Herausforderungen',
      step3Title: 'Kontakt',
      firmaLabel: 'Firmenname',
      firmaPlaceholder: 'Ihre Firma AG',
      websiteLabel: 'Website URL',
      branchePlaceholder: 'Bitte wählen',
      brancheLabel: 'Branche',
      branchen: ['Gastronomie', 'Detailhandel', 'Gesundheit', 'Immobilien', 'Beratung', 'Andere'],
      mitarbeiterzahlLabel: 'Mitarbeiterzahl',
      herausforderungenList: [
        'E-Mails beantworten',
        'Terminplanung',
        'Angebote erstellen',
        'Kundenanfragen',
        'Berichte und Auswertungen',
        'Social Media / Content',
      ],
      stundenLabel: 'Zeitaufwand pro Woche',
      stundenUnit: 'Std.',
      nameLabel: 'Name',
      emailLabel: 'E-Mail',
      weiter: 'Weiter →',
      zurueck: 'Zurück',
      auditAnfordern: 'Audit anfordern →',
      loadingText: 'Ihr KI-Audit wird erstellt...',
      errorRetry: 'Erneut versuchen',
      unknownError: 'Unbekannter Fehler',
      visibilityKnown: 'Claude kennt {firma}',
      visibilityUnknown: 'Claude kennt {firma} nicht',
      visibilityCaption:
        'Basiert auf den Trainingsdaten von Claude — ein Indikator für Ihre KI-Sichtbarkeit, kein Live-Check von ChatGPT oder Perplexity.',
      resultsIntro: 'Ihre drei konkreten Automatisierungsempfehlungen:',
      effortPrefix: 'Aufwand:',
      effortLevels: { niedrig: 'Niedrig', mittel: 'Mittel', hoch: 'Hoch' },
      ctaImplement: 'Jetzt umsetzen – Beratung buchen →',
      restartAudit: 'Neuen Audit starten',
    },
  },
  en: {
    nav: NAV.en,
    contact: 'contact',
    getStarted: 'get started',
    badge: 'Visibility in ChatGPT, Perplexity & co.',
    headDark: 'SwissAI Optimize makes you',
    headGray1: 'visible in AI.',
    headLine2: 'Your customers no longer google —',
    headLine3a: 'they ask',
    headLine3b: 'AI directly.',
    searchPlaceholder: 'Ask me anything...',
    cta: 'Check your visibility',
    consultCta: 'Free consultation',
    cornerRight: 'ai visibility',
    services: {
      title: 'Our Services',
      subtitle: 'Three ways we help your business get found in AI search.',
      learnMore: 'Learn more',
      items: [
        {
          title: 'AEO / GEO',
          desc: "We optimize your presence for AI search systems like ChatGPT, Perplexity and Google AI — so they know you and recommend you.",
        },
        {
          title: 'Process Automation',
          desc: 'Recurring tasks run automatically — from invoice processing to reporting. More time for what matters.',
        },
        {
          title: 'AI Assistant',
          desc: 'An AI chatbot answers customer questions around the clock — friendly, precise, and in four languages.',
        },
      ],
    },
    stats: {
      items: [
        { value: 4, suffix: '', label: 'Languages supported' },
        { value: 24, suffix: '/7', label: 'AI availability possible' },
        { value: 100, suffix: '%', label: 'Hosting & support in Switzerland' },
        { value: 45, suffix: ' min.', label: 'free initial consultation' },
      ],
    },
    about: {
      title: 'Why SwissAI Optimize',
      subtitle: 'Swiss quality, Swiss data protection — and a team that stays reachable.',
      paragraph:
        "We're a Swiss team specialised in AI visibility and process automation for SMEs. Instead of selling you a fixed package, we look closely at your business and start where it makes the biggest difference.",
      points: [
        {
          title: 'Made in Switzerland',
          desc: 'Development, hosting and support from Switzerland — short paths, direct contact.',
        },
        {
          title: 'Data protection under Swiss law',
          desc: 'Your data is handled under the Swiss FADP and GDPR — no sharing with third parties without consent.',
        },
        {
          title: 'Personal support',
          desc: 'One fixed point of contact instead of rotating support tickets.',
        },
      ],
    },
    testimonials: {
      title: 'What our clients say',
      subtitle: 'Sample feedback — real client voices are coming soon.',
      badge: 'Example',
      items: [
        {
          quote:
            "We now know how we show up in ChatGPT & co. — and what we need to do to stay visible there.",
          name: 'A. B.',
          role: 'Owner, fiduciary firm',
        },
        {
          quote: 'Invoice processing now runs automatically. It saves us several hours every week.',
          name: 'S. M.',
          role: 'Managing Director, trades business',
        },
        {
          quote: 'The AI chatbot answers the most common customer questions — even outside business hours.',
          name: 'D. R.',
          role: 'Head of Marketing, SME',
        },
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      subtitle: 'Answers to the questions we get asked most often.',
      items: [
        {
          q: 'How long does an AI project take?',
          a: 'The visibility audit is completed within a week. Ongoing optimisation and automation are continuous processes — you usually see first results within 4–6 weeks.',
        },
        {
          q: 'Where is my data stored?',
          a: 'Your data is hosted in Switzerland and processed under the Swiss FADP and GDPR. Details are in our privacy policy.',
        },
        {
          q: 'Do I need to commit long-term?',
          a: 'No. The audit is a one-time offer, and the monthly plans can be cancelled anytime.',
        },
        {
          q: 'What languages do you work in?',
          a: 'We work in German, English, French and Italian — matching Swiss customers.',
        },
        {
          q: 'Do I need technical knowledge?',
          a: "No. We handle the technical implementation; you just need to know your business and your goals.",
        },
        {
          q: 'How do we get started?',
          a: 'The easiest way is a free 45-minute initial call, where we clarify your starting point and next steps.',
        },
      ],
    },
    pricing: {
      title: 'Transparent pricing',
      subtitle: 'Choose the plan that fits your business. Cancel anytime.',
      mostPopular: 'Most popular',
      ctaLabel: 'Send inquiry',
      tiers: [
        {
          name: 'Audit',
          price: 'CHF 690',
          period: 'one-time',
          features: [
            'AI visibility check (ChatGPT, Perplexity, Google AI)',
            'Competitor analysis',
            'Action plan as PDF report',
            '45-minute review call',
          ],
        },
        {
          name: 'Basis',
          price: 'CHF 490',
          period: '/ month',
          highlight: true,
          features: [
            'Everything in Audit',
            'Ongoing AI visibility optimization',
            'One process automation',
            'Monthly reporting',
            'Email support',
          ],
        },
        {
          name: 'Premium',
          price: 'CHF 990',
          period: '/ month',
          features: [
            'Everything in Basis',
            'Your own AI chatbot for your website',
            'Unlimited process automations',
            'Priority support (phone & email)',
            'Quarterly strategy session',
          ],
        },
      ],
    },
    contactSection: {
      title: "Let's talk about your business",
      subtitle: 'Free initial consultation, 45 min., no sales pressure.',
      name: 'Name',
      email: 'Email',
      company: 'Company',
      servicePlaceholder: 'What are you interested in?',
      serviceOptions: ['AEO / GEO – AI visibility', 'Process automation', 'AI assistant', 'Other'],
      message: 'Your message',
      send: 'Send inquiry',
      sending: 'Sending...',
      success: "Thank you! Your request has reached us. We'll get back to you within 24 hours.",
      errorFallback: "Sending didn't work — we'll open your email app instead.",
    },
    footer: {
      datenschutz: 'Privacy policy',
      impressum: 'Legal notice',
      address: 'Zollikofen, Bern',
    },
    audit: {
      pageTitle: 'Free AI Audit',
      pageSubtitle: 'In 2 minutes, find out which AI automations will move your business forward.',
      stepLabel: 'Step',
      step1Title: 'Your company',
      step2Title: 'Challenges',
      step3Title: 'Contact',
      firmaLabel: 'Company name',
      firmaPlaceholder: 'Your Company Ltd.',
      websiteLabel: 'Website URL',
      branchePlaceholder: 'Please select',
      brancheLabel: 'Industry',
      branchen: ['Hospitality', 'Retail', 'Healthcare', 'Real estate', 'Consulting', 'Other'],
      mitarbeiterzahlLabel: 'Number of employees',
      herausforderungenList: [
        'Answering emails',
        'Scheduling appointments',
        'Creating quotes',
        'Customer inquiries',
        'Reports and analytics',
        'Social media / content',
      ],
      stundenLabel: 'Time spent per week',
      stundenUnit: 'hrs',
      nameLabel: 'Name',
      emailLabel: 'Email',
      weiter: 'Next →',
      zurueck: 'Back',
      auditAnfordern: 'Request audit →',
      loadingText: 'Your AI audit is being created...',
      errorRetry: 'Try again',
      unknownError: 'Unknown error',
      visibilityKnown: 'Claude knows {firma}',
      visibilityUnknown: "Claude doesn't know {firma}",
      visibilityCaption:
        "Based on Claude's training data — an indicator of your AI visibility, not a live check of ChatGPT or Perplexity.",
      resultsIntro: 'Your three concrete automation recommendations:',
      effortPrefix: 'Effort:',
      effortLevels: { niedrig: 'Low', mittel: 'Medium', hoch: 'High' },
      ctaImplement: 'Implement now – book a consultation →',
      restartAudit: 'Start new audit',
    },
  },
  fr: {
    nav: NAV.fr,
    contact: 'contact',
    getStarted: 'commencer',
    badge: 'Visibilité dans ChatGPT, Perplexity & co.',
    headDark: 'SwissAI Optimize vous rend',
    headGray1: "visible dans l'IA.",
    headLine2: 'Vos clients ne googlent plus —',
    headLine3a: 'ils demandent',
    headLine3b: "directement à l'IA.",
    searchPlaceholder: 'Demandez-moi tout...',
    cta: 'Vérifier ma visibilité',
    consultCta: 'Consultation gratuite',
    cornerRight: 'visibilité ia',
    services: {
      title: 'Nos services',
      subtitle: 'Trois façons de vous rendre visible dans la recherche IA.',
      learnMore: 'En savoir plus',
      items: [
        {
          title: 'AEO / GEO',
          desc: "Nous optimisons votre présence pour les systèmes de recherche IA comme ChatGPT, Perplexity et Google IA — pour qu'ils vous connaissent et vous recommandent.",
        },
        {
          title: 'Automatisation des processus',
          desc: "Les tâches récurrentes s'exécutent automatiquement — du traitement des factures au reporting. Plus de temps pour l'essentiel.",
        },
        {
          title: 'Assistant IA',
          desc: 'Un chatbot IA répond aux questions de vos clients 24h/24 — aimable, précis et en quatre langues.',
        },
      ],
    },
    stats: {
      items: [
        { value: 4, suffix: '', label: 'Langues prises en charge' },
        { value: 24, suffix: '/7', label: 'Disponibilité IA possible' },
        { value: 100, suffix: '%', label: 'Hébergement & support en Suisse' },
        { value: 45, suffix: ' min.', label: 'première consultation gratuite' },
      ],
    },
    about: {
      title: 'Pourquoi SwissAI Optimize',
      subtitle: 'Qualité suisse, protection des données suisse — et une équipe joignable.',
      paragraph:
        "Nous sommes une équipe suisse spécialisée dans la visibilité IA et l'automatisation des processus pour les PME. Plutôt que de vous vendre un forfait figé, nous examinons votre entreprise en détail et intervenons là où cela fait la plus grande différence.",
      points: [
        {
          title: 'Made in Switzerland',
          desc: 'Développement, hébergement et support depuis la Suisse — des circuits courts, un contact direct.',
        },
        {
          title: 'Protection des données selon le droit suisse',
          desc: 'Vos données sont traitées selon la nLPD et le RGPD — aucune transmission à des tiers sans consentement.',
        },
        {
          title: 'Suivi personnalisé',
          desc: "Un interlocuteur fixe plutôt que des tickets de support qui changent.",
        },
      ],
    },
    testimonials: {
      title: 'Ce que disent nos clients',
      subtitle: 'Retours d’exemple — de vrais témoignages clients arrivent bientôt.',
      badge: 'Exemple',
      items: [
        {
          quote:
            "Nous savons désormais comment nous apparaissons dans ChatGPT & co. — et ce qu'il faut faire pour y rester visibles.",
          name: 'A. B.',
          role: 'Propriétaire, fiduciaire',
        },
        {
          quote: 'Le traitement des factures se fait maintenant automatiquement. Cela nous fait gagner plusieurs heures par semaine.',
          name: 'S. M.',
          role: 'Directrice, entreprise artisanale',
        },
        {
          quote: "Le chatbot IA répond aux questions les plus fréquentes des clients — même en dehors des heures d'ouverture.",
          name: 'D. R.',
          role: 'Responsable marketing, PME',
        },
      ],
    },
    faq: {
      title: 'Questions fréquentes',
      subtitle: 'Les réponses aux questions qu’on nous pose le plus souvent.',
      items: [
        {
          q: 'Combien de temps dure un projet IA ?',
          a: "L'audit de visibilité est terminé en une semaine. L'optimisation et l'automatisation continues sont des processus permanents — les premiers résultats sont généralement visibles après 4 à 6 semaines.",
        },
        {
          q: 'Où mes données sont-elles stockées ?',
          a: 'Vos données sont hébergées en Suisse et traitées selon la nLPD et le RGPD. Les détails figurent dans notre politique de confidentialité.',
        },
        {
          q: 'Dois-je m’engager sur la durée ?',
          a: "Non. L'audit est une offre ponctuelle, et les forfaits mensuels sont résiliables à tout moment.",
        },
        {
          q: 'Dans quelles langues travaillez-vous ?',
          a: 'Nous travaillons en allemand, anglais, français et italien — adapté à la clientèle suisse.',
        },
        {
          q: "Ai-je besoin de connaissances techniques ?",
          a: "Non. Nous prenons en charge la mise en œuvre technique ; vous devez seulement connaître votre entreprise et vos objectifs.",
        },
        {
          q: 'Comment démarrer ?',
          a: "Le plus simple est un premier entretien gratuit de 45 minutes, où nous clarifions votre situation de départ et les prochaines étapes.",
        },
      ],
    },
    pricing: {
      title: 'Des prix transparents',
      subtitle: 'Choisissez la formule adaptée à votre entreprise. Résiliable à tout moment.',
      mostPopular: 'Le plus populaire',
      ctaLabel: 'Envoyer la demande',
      tiers: [
        {
          name: 'Audit',
          price: 'CHF 690',
          period: 'unique',
          features: [
            'Audit de visibilité IA (ChatGPT, Perplexity, Google IA)',
            'Analyse de la concurrence',
            "Plan d'action en rapport PDF",
            'Entretien de restitution de 45 min',
          ],
        },
        {
          name: 'Basis',
          price: 'CHF 490',
          period: '/ mois',
          highlight: true,
          features: [
            "Tout ce qui est inclus dans l'audit",
            'Optimisation continue de la visibilité IA',
            'Une automatisation de processus',
            'Rapport mensuel',
            'Support par e-mail',
          ],
        },
        {
          name: 'Premium',
          price: 'CHF 990',
          period: '/ mois',
          features: [
            'Tout ce qui est inclus dans Basis',
            'Votre propre chatbot IA pour votre site',
            'Automatisations de processus illimitées',
            'Support prioritaire (téléphone & e-mail)',
            'Session stratégique trimestrielle',
          ],
        },
      ],
    },
    contactSection: {
      title: 'Parlons de votre entreprise',
      subtitle: 'Première consultation gratuite, 45 min., sans pression commerciale.',
      name: 'Nom',
      email: 'E-mail',
      company: 'Entreprise',
      servicePlaceholder: 'Quel sujet vous intéresse ?',
      serviceOptions: ['AEO / GEO – visibilité IA', 'Automatisation des processus', 'Assistant IA', 'Autre'],
      message: 'Votre message',
      send: 'Envoyer la demande',
      sending: 'Envoi en cours...',
      success: 'Merci ! Votre demande nous est bien parvenue. Nous vous répondrons sous 24 heures.',
      errorFallback: "L'envoi a échoué — nous ouvrons votre messagerie à la place.",
    },
    footer: {
      datenschutz: 'Confidentialité',
      impressum: 'Impressum',
      address: 'Zollikofen, Berne',
    },
    audit: {
      pageTitle: 'Audit IA gratuit',
      pageSubtitle: 'En 2 minutes, découvrez quelles automatisations IA feront avancer votre entreprise.',
      stepLabel: 'Étape',
      step1Title: 'Votre entreprise',
      step2Title: 'Défis',
      step3Title: 'Contact',
      firmaLabel: "Nom de l'entreprise",
      firmaPlaceholder: 'Votre Entreprise SA',
      websiteLabel: 'URL du site web',
      branchePlaceholder: 'Veuillez choisir',
      brancheLabel: 'Secteur',
      branchen: ['Restauration', 'Commerce de détail', 'Santé', 'Immobilier', 'Conseil', 'Autre'],
      mitarbeiterzahlLabel: "Nombre d'employés",
      herausforderungenList: [
        'Répondre aux e-mails',
        'Planification des rendez-vous',
        'Création de devis',
        'Demandes clients',
        'Rapports et analyses',
        'Réseaux sociaux / contenu',
      ],
      stundenLabel: 'Temps consacré par semaine',
      stundenUnit: 'h',
      nameLabel: 'Nom',
      emailLabel: 'E-mail',
      weiter: 'Suivant →',
      zurueck: 'Retour',
      auditAnfordern: "Demander l'audit →",
      loadingText: 'Votre audit IA est en cours de création...',
      errorRetry: 'Réessayer',
      unknownError: 'Erreur inconnue',
      visibilityKnown: 'Claude connaît {firma}',
      visibilityUnknown: 'Claude ne connaît pas {firma}',
      visibilityCaption:
        "Basé sur les données d'entraînement de Claude — un indicateur de votre visibilité IA, pas une vérification en direct de ChatGPT ou Perplexity.",
      resultsIntro: "Vos trois recommandations d'automatisation concrètes :",
      effortPrefix: 'Effort :',
      effortLevels: { niedrig: 'Faible', mittel: 'Moyen', hoch: 'Élevé' },
      ctaImplement: 'Mettre en œuvre – réserver une consultation →',
      restartAudit: 'Nouvel audit',
    },
  },
  it: {
    nav: NAV.it,
    contact: 'contatto',
    getStarted: 'inizia',
    badge: 'Visibilità in ChatGPT, Perplexity & co.',
    headDark: 'SwissAI Optimize ti rende',
    headGray1: "visibile nell'IA.",
    headLine2: 'I tuoi clienti non usano più Google —',
    headLine3a: 'chiedono',
    headLine3b: "direttamente all'IA.",
    searchPlaceholder: 'Chiedimi qualsiasi cosa...',
    cta: 'Verifica la tua visibilità',
    consultCta: 'Consulenza gratuita',
    cornerRight: 'visibilità ia',
    services: {
      title: 'I nostri servizi',
      subtitle: 'Tre modi per farti trovare nella ricerca IA.',
      learnMore: 'Scopri di più',
      items: [
        {
          title: 'AEO / GEO',
          desc: 'Ottimizziamo la tua presenza per i sistemi di ricerca IA come ChatGPT, Perplexity e Google IA — affinché ti conoscano e ti consiglino.',
        },
        {
          title: 'Automazione dei processi',
          desc: 'Le attività ricorrenti vengono eseguite automaticamente — dalla gestione delle fatture al reporting. Più tempo per ciò che conta.',
        },
        {
          title: 'Assistente IA',
          desc: 'Un chatbot IA risponde alle domande dei clienti 24 ore su 24 — cordiale, preciso e in quattro lingue.',
        },
      ],
    },
    stats: {
      items: [
        { value: 4, suffix: '', label: 'Lingue supportate' },
        { value: 24, suffix: '/7', label: 'Disponibilità IA possibile' },
        { value: 100, suffix: '%', label: 'Hosting & supporto in Svizzera' },
        { value: 45, suffix: ' min.', label: 'prima consulenza gratuita' },
      ],
    },
    about: {
      title: 'Perché SwissAI Optimize',
      subtitle: 'Qualità svizzera, protezione dei dati svizzera — e un team sempre raggiungibile.',
      paragraph:
        'Siamo un team svizzero specializzato in visibilità IA e automazione dei processi per le PMI. Invece di venderle un pacchetto fisso, analizziamo a fondo la sua azienda e interveniamo dove fa la differenza maggiore.',
      points: [
        {
          title: 'Made in Switzerland',
          desc: 'Sviluppo, hosting e supporto dalla Svizzera — percorsi brevi, contatto diretto.',
        },
        {
          title: 'Protezione dei dati secondo il diritto svizzero',
          desc: 'I suoi dati vengono trattati secondo nLPD e GDPR — nessuna condivisione con terzi senza consenso.',
        },
        {
          title: 'Assistenza personale',
          desc: 'Un referente fisso invece di ticket di supporto sempre diversi.',
        },
      ],
    },
    testimonials: {
      title: 'Cosa dicono i nostri clienti',
      subtitle: 'Feedback esemplificativi — presto arriveranno testimonianze reali.',
      badge: 'Esempio',
      items: [
        {
          quote:
            'Ora sappiamo come compariamo su ChatGPT & co. — e cosa dobbiamo fare per restare visibili.',
          name: 'A. B.',
          role: 'Titolare, studio fiduciario',
        },
        {
          quote: 'La gestione delle fatture ora è automatica. Ci fa risparmiare diverse ore ogni settimana.',
          name: 'S. M.',
          role: 'Direttrice, azienda artigianale',
        },
        {
          quote: 'Il chatbot IA risponde alle domande più frequenti dei clienti — anche fuori orario.',
          name: 'D. R.',
          role: 'Responsabile marketing, PMI',
        },
      ],
    },
    faq: {
      title: 'Domande frequenti',
      subtitle: 'Le risposte alle domande che ci vengono poste più spesso.',
      items: [
        {
          q: 'Quanto dura un progetto IA?',
          a: "L'audit di visibilità si conclude entro una settimana. Ottimizzazione e automazione continue sono processi costanti — i primi risultati si vedono di solito entro 4-6 settimane.",
        },
        {
          q: 'Dove vengono salvati i miei dati?',
          a: "I suoi dati sono ospitati in Svizzera e trattati secondo nLPD e GDPR. I dettagli sono nella nostra informativa sulla privacy.",
        },
        {
          q: 'Devo vincolarmi a lungo termine?',
          a: "No. L'audit è un'offerta una tantum, i pacchetti mensili sono disdicibili in qualsiasi momento.",
        },
        {
          q: 'In quali lingue lavorate?',
          a: 'Lavoriamo in tedesco, inglese, francese e italiano — su misura per la clientela svizzera.',
        },
        {
          q: 'Servono conoscenze tecniche?',
          a: "No. Ci occupiamo noi della realizzazione tecnica; lei deve solo conoscere la sua azienda e i suoi obiettivi.",
        },
        {
          q: 'Come iniziamo?',
          a: "Il modo più semplice è un primo colloquio gratuito di 45 minuti, in cui chiariamo la situazione di partenza e i prossimi passi.",
        },
      ],
    },
    pricing: {
      title: 'Prezzi trasparenti',
      subtitle: 'Scegli il piano adatto alla tua azienda. Disdicibile in qualsiasi momento.',
      mostPopular: 'Il più scelto',
      ctaLabel: 'Invia richiesta',
      tiers: [
        {
          name: 'Audit',
          price: 'CHF 690',
          period: 'una tantum',
          features: [
            'Verifica di visibilità IA (ChatGPT, Perplexity, Google IA)',
            'Analisi della concorrenza',
            "Piano d'azione in report PDF",
            'Colloquio di revisione di 45 minuti',
          ],
        },
        {
          name: 'Basis',
          price: 'CHF 490',
          period: '/ mese',
          highlight: true,
          features: [
            "Tutto ciò che è incluso nell'Audit",
            'Ottimizzazione continua della visibilità IA',
            'Un automazione di processo',
            'Reportistica mensile',
            'Supporto via e-mail',
          ],
        },
        {
          name: 'Premium',
          price: 'CHF 990',
          period: '/ mese',
          features: [
            'Tutto ciò che è incluso in Basis',
            'Un chatbot IA dedicato per il tuo sito',
            'Automazioni di processo illimitate',
            'Supporto prioritario (telefono & e-mail)',
            'Sessione strategica trimestrale',
          ],
        },
      ],
    },
    contactSection: {
      title: 'Parliamo della tua azienda',
      subtitle: 'Prima consulenza gratuita, 45 min., senza pressione di vendita.',
      name: 'Nome',
      email: 'E-mail',
      company: 'Azienda',
      servicePlaceholder: 'Quale argomento ti interessa?',
      serviceOptions: ['AEO / GEO – visibilità IA', 'Automazione dei processi', 'Assistente IA', 'Altro'],
      message: 'Il tuo messaggio',
      send: 'Invia richiesta',
      sending: 'Invio in corso...',
      success: 'Grazie! La tua richiesta ci è arrivata. Ti risponderemo entro 24 ore.',
      errorFallback: "L'invio non è riuscito — apriamo invece il tuo programma di posta.",
    },
    footer: {
      datenschutz: 'Privacy',
      impressum: 'Impressum',
      address: 'Zollikofen, Berna',
    },
    audit: {
      pageTitle: 'Audit IA gratuito',
      pageSubtitle: 'In 2 minuti scopri quali automazioni IA fanno crescere la tua azienda.',
      stepLabel: 'Passo',
      step1Title: 'La tua azienda',
      step2Title: 'Sfide',
      step3Title: 'Contatto',
      firmaLabel: 'Nome azienda',
      firmaPlaceholder: 'La Tua Azienda SA',
      websiteLabel: 'URL del sito web',
      branchePlaceholder: 'Seleziona',
      brancheLabel: 'Settore',
      branchen: ['Ristorazione', 'Commercio al dettaglio', 'Sanità', 'Immobiliare', 'Consulenza', 'Altro'],
      mitarbeiterzahlLabel: 'Numero di dipendenti',
      herausforderungenList: [
        'Rispondere alle e-mail',
        'Pianificazione degli appuntamenti',
        'Creazione di preventivi',
        'Richieste dei clienti',
        'Report e analisi',
        'Social media / contenuti',
      ],
      stundenLabel: 'Tempo impiegato a settimana',
      stundenUnit: 'ore',
      nameLabel: 'Nome',
      emailLabel: 'E-mail',
      weiter: 'Avanti →',
      zurueck: 'Indietro',
      auditAnfordern: 'Richiedi audit →',
      loadingText: "Il tuo audit IA è in fase di creazione...",
      errorRetry: 'Riprova',
      unknownError: 'Errore sconosciuto',
      visibilityKnown: 'Claude conosce {firma}',
      visibilityUnknown: 'Claude non conosce {firma}',
      visibilityCaption:
        'Basato sui dati di addestramento di Claude — un indicatore della tua visibilità IA, non una verifica in tempo reale di ChatGPT o Perplexity.',
      resultsIntro: 'I tuoi tre consigli concreti di automazione:',
      effortPrefix: 'Impegno:',
      effortLevels: { niedrig: 'Basso', mittel: 'Medio', hoch: 'Alto' },
      ctaImplement: 'Implementa ora – prenota una consulenza →',
      restartAudit: 'Nuovo audit',
    },
  },
}
