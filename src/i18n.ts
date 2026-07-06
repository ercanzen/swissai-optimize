export type Lang = 'de' | 'en' | 'fr' | 'it'

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
  cornerRight: string
  services: {
    title: string
    subtitle: string
    items: { title: string; desc: string }[]
  }
  process: {
    title: string
    subtitle: string
    steps: { title: string; desc: string }[]
  }
  stats: { value: number; suffix: string; label: string }[]
  about: {
    title: string
    p1: string
    p2: string
    points: string[]
  }
  faq: {
    title: string
    items: { q: string; a: string }[]
  }
  contactSection: {
    title: string
    subtitle: string
    name: string
    email: string
    message: string
    send: string
    or: string
  }
  footer: {
    tagline: string
    nav: string
    legal: string
    impressum: string
    datenschutz: string
    madeIn: string
  }
}

export const translations: Record<Lang, Translation> = {
  de: {
    nav: ['leistungen', 'prozess', 'über uns', 'faq'],
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
    cornerRight: 'ki-sichtbarkeit',
    services: {
      title: 'Unsere Leistungen',
      subtitle: 'Wir integrieren KI in Ihren Betrieb — und sorgen dafür, dass die KI Sie kennt.',
      items: [
        {
          title: 'KI-Sichtbarkeit',
          desc: 'Immer mehr Menschen fragen ChatGPT, Perplexity oder die Google KI-Übersicht statt zu googeln. Wir sorgen dafür, dass diese Systeme Ihr Unternehmen kennen — und empfehlen.',
        },
        {
          title: 'Prozessautomatisierung',
          desc: 'Wiederkehrende Aufgaben laufen automatisch — von der Rechnungsverarbeitung bis zum Reporting. Ihr Team gewinnt Zeit für das Wesentliche.',
        },
        {
          title: 'KI-Chatbots & Kundenservice',
          desc: 'Intelligente Assistenten beantworten Kundenanfragen rund um die Uhr — in Deutsch, Französisch, Italienisch und Englisch.',
        },
        {
          title: 'KI-Beratung & Schulung',
          desc: 'Wir zeigen Ihnen, wo KI in Ihrem Betrieb den grössten Unterschied macht, und schulen Ihr Team im sicheren Umgang damit.',
        },
      ],
    },
    process: {
      title: 'So arbeiten wir',
      subtitle: 'Von der ersten Analyse bis zur Empfehlung durch die KI — in drei Schritten.',
      steps: [
        {
          title: 'Analyse',
          desc: 'Wir prüfen, wie sichtbar Ihr Unternehmen heute in KI-Antworten ist — und wo in Ihrem Betrieb KI am meisten bewirkt.',
        },
        {
          title: 'Integration',
          desc: 'Wir integrieren KI in Ihre Systeme und optimieren Ihre Präsenz, damit ChatGPT, Perplexity & Co. Sie korrekt und positiv wiedergeben.',
        },
        {
          title: 'Resultate',
          desc: 'Mehr Anfragen durch KI-Empfehlungen, weniger manueller Aufwand im Alltag. Wir bleiben an Ihrer Seite.',
        },
      ],
    },
    stats: [
      { value: 40, suffix: '%', label: 'Zeitersparnis im Schnitt' },
      { value: 4, suffix: '', label: 'Sprachen, ein Ansprechpartner' },
      { value: 100, suffix: '%', label: 'Datenhaltung in der Schweiz' },
      { value: 24, suffix: '/7', label: 'KI-Assistenten im Einsatz' },
    ],
    about: {
      title: 'Über uns',
      p1: 'SwissAI Optimize ist ein Schweizer Unternehmen mit einem klaren Ziel: Ihr Unternehmen dort sichtbar zu machen, wo Ihre Kunden heute wirklich suchen — in der KI.',
      p2: 'Wir integrieren KI in Ihre Abläufe und optimieren gleichzeitig, wie ChatGPT, Perplexity und Google KI über Sie sprechen. Swiss made, mit Fokus auf Qualität und Datenschutz.',
      points: ['Sichtbarkeit in ChatGPT, Perplexity & Google KI', 'KI-Integration statt Buzzwords', 'Persönliche Betreuung in 4 Sprachen'],
    },
    faq: {
      title: 'Häufige Fragen',
      items: [
        {
          q: 'Was bedeutet "KI-Sichtbarkeit"?',
          a: 'Immer mehr Menschen fragen ChatGPT, Perplexity oder die KI-Übersicht von Google nach Empfehlungen — statt zu googeln. KI-Sichtbarkeit bedeutet, dass diese Systeme Ihr Unternehmen kennen, korrekt darstellen und empfehlen. Genau darauf optimieren wir.',
        },
        {
          q: 'Wie lange dauert ein KI-Projekt?',
          a: 'Erste Resultate sehen Sie oft schon nach 2–4 Wochen. Eine vollständige Integration dauert je nach Umfang 1–3 Monate.',
        },
        {
          q: 'Wo werden meine Daten gespeichert?',
          a: 'Auf Wunsch ausschliesslich in der Schweiz. Wir arbeiten nach nDSG und DSGVO und beraten Sie transparent zu allen Datenflüssen.',
        },
        {
          q: 'Brauche ich technisches Vorwissen?',
          a: 'Nein. Wir übernehmen die Technik und schulen Ihr Team so, dass alle die neuen Werkzeuge sicher nutzen können.',
        },
        {
          q: 'Was kostet eine Zusammenarbeit?',
          a: 'Die Erstanalyse ist kostenlos. Danach erhalten Sie ein transparentes Fixpreis-Angebot — ohne versteckte Kosten.',
        },
        {
          q: 'Funktioniert das auch für kleine Betriebe?',
          a: 'Gerade dort! Kleine Teams profitieren am stärksten, wenn Routinearbeit wegfällt und neue Kunden über die KI zu ihnen finden. Wir dimensionieren jede Lösung passend zum Betrieb.',
        },
      ],
    },
    contactSection: {
      title: 'Sprechen wir über Ihr Projekt',
      subtitle: 'Erzählen Sie uns von Ihrem Unternehmen — wir zeigen Ihnen, wie sichtbar Sie heute in der KI sind und was möglich ist. Antwort innert 24 Stunden.',
      name: 'Name',
      email: 'E-Mail',
      message: 'Ihre Nachricht',
      send: 'Nachricht senden',
      or: 'oder direkt per E-Mail:',
    },
    footer: {
      tagline: 'KI-Integration und Sichtbarkeit für Schweizer Unternehmen.',
      nav: 'Navigation',
      legal: 'Rechtliches',
      impressum: 'Impressum',
      datenschutz: 'Datenschutz',
      madeIn: 'Mit Präzision gebaut in der Schweiz',
    },
  },
  en: {
    nav: ['services', 'process', 'about us', 'faq'],
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
    cornerRight: 'ai visibility',
    services: {
      title: 'Our Services',
      subtitle: 'We integrate AI into your business — and make sure AI knows you.',
      items: [
        {
          title: 'AI Visibility',
          desc: "More and more people ask ChatGPT, Perplexity or Google's AI overview instead of googling. We make sure these systems know your business — and recommend it.",
        },
        {
          title: 'Process Automation',
          desc: 'Recurring tasks run automatically — from invoice processing to reporting. Your team gains time for what matters.',
        },
        {
          title: 'AI Chatbots & Customer Service',
          desc: 'Intelligent assistants answer customer requests around the clock — in German, French, Italian and English.',
        },
        {
          title: 'AI Consulting & Training',
          desc: 'We show you where AI makes the biggest difference in your business, and train your team to use it safely.',
        },
      ],
    },
    process: {
      title: 'How we work',
      subtitle: 'From first analysis to being recommended by AI — in three steps.',
      steps: [
        {
          title: 'Analysis',
          desc: 'We check how visible your business is in AI answers today — and where AI can have the biggest impact in your operations.',
        },
        {
          title: 'Integration',
          desc: 'We integrate AI into your systems and optimize your presence so ChatGPT, Perplexity & co. represent you accurately and positively.',
        },
        {
          title: 'Results',
          desc: 'More inquiries from AI recommendations, less manual effort day to day. And we stay by your side.',
        },
      ],
    },
    stats: [
      { value: 40, suffix: '%', label: 'average time saved' },
      { value: 4, suffix: '', label: 'languages, one partner' },
      { value: 100, suffix: '%', label: 'data hosted in Switzerland' },
      { value: 24, suffix: '/7', label: 'AI assistants at work' },
    ],
    about: {
      title: 'About us',
      p1: 'SwissAI Optimize is a Swiss company with one clear goal: making your business visible where your customers actually search today — in AI.',
      p2: 'We integrate AI into your operations while optimizing how ChatGPT, Perplexity and Google AI talk about you. Swiss made, with a focus on quality and data protection.',
      points: ['Visibility in ChatGPT, Perplexity & Google AI', 'AI integration instead of buzzwords', 'Personal support in 4 languages'],
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'What does "AI visibility" mean?',
          a: "More and more people ask ChatGPT, Perplexity or Google's AI overview for recommendations — instead of googling. AI visibility means these systems know your business, represent it correctly, and recommend it. That's exactly what we optimize for.",
        },
        {
          q: 'How long does an AI project take?',
          a: 'You often see first results within 2–4 weeks. A full integration takes 1–3 months depending on scope.',
        },
        {
          q: 'Where is my data stored?',
          a: 'Exclusively in Switzerland if you wish. We work in line with nFADP and GDPR and advise you transparently on all data flows.',
        },
        {
          q: 'Do I need technical knowledge?',
          a: 'No. We handle the technology and train your team so everyone can use the new tools with confidence.',
        },
        {
          q: 'What does it cost?',
          a: 'The initial analysis is free. After that you receive a transparent fixed-price offer — no hidden costs.',
        },
        {
          q: 'Does this work for small businesses too?',
          a: 'Especially there! Small teams benefit the most when routine work disappears and new customers find them through AI. We size every solution to fit your business.',
        },
      ],
    },
    contactSection: {
      title: "Let's talk about your project",
      subtitle: "Tell us about your business — we'll show you how visible you are in AI today, and what's possible. Reply within 24 hours.",
      name: 'Name',
      email: 'Email',
      message: 'Your message',
      send: 'Send message',
      or: 'or directly by email:',
    },
    footer: {
      tagline: 'AI integration and visibility for Swiss businesses.',
      nav: 'Navigation',
      legal: 'Legal',
      impressum: 'Legal notice',
      datenschutz: 'Privacy policy',
      madeIn: 'Built with precision in Switzerland',
    },
  },
  fr: {
    nav: ['services', 'processus', 'à propos', 'faq'],
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
    cornerRight: 'visibilité ia',
    services: {
      title: 'Nos services',
      subtitle: "Nous intégrons l'IA dans votre entreprise — et veillons à ce que l'IA vous connaisse.",
      items: [
        {
          title: 'Visibilité IA',
          desc: "De plus en plus de personnes demandent à ChatGPT, Perplexity ou à l'aperçu IA de Google au lieu de googler. Nous veillons à ce que ces systèmes connaissent votre entreprise — et la recommandent.",
        },
        {
          title: 'Automatisation des processus',
          desc: "Les tâches récurrentes s'exécutent automatiquement — du traitement des factures au reporting. Votre équipe gagne du temps pour l'essentiel.",
        },
        {
          title: 'Chatbots IA & service client',
          desc: 'Des assistants intelligents répondent aux demandes de vos clients 24h/24 — en allemand, français, italien et anglais.',
        },
        {
          title: 'Conseil & formation IA',
          desc: "Nous vous montrons où l'IA fait la plus grande différence dans votre entreprise, et formons votre équipe à l'utiliser en toute sécurité.",
        },
      ],
    },
    process: {
      title: 'Notre méthode',
      subtitle: "De la première analyse à la recommandation par l'IA — en trois étapes.",
      steps: [
        {
          title: 'Analyse',
          desc: "Nous évaluons votre visibilité actuelle dans les réponses de l'IA — et où l'IA peut avoir le plus d'impact dans votre entreprise.",
        },
        {
          title: 'Intégration',
          desc: "Nous intégrons l'IA dans vos systèmes et optimisons votre présence pour que ChatGPT, Perplexity & co. vous représentent correctement et positivement.",
        },
        {
          title: 'Résultats',
          desc: "Plus de demandes grâce aux recommandations de l'IA, moins de travail manuel au quotidien. Et nous restons à vos côtés.",
        },
      ],
    },
    stats: [
      { value: 40, suffix: '%', label: 'de temps gagné en moyenne' },
      { value: 4, suffix: '', label: 'langues, un seul partenaire' },
      { value: 100, suffix: '%', label: 'données hébergées en Suisse' },
      { value: 24, suffix: '/7', label: 'assistants IA en service' },
    ],
    about: {
      title: 'À propos',
      p1: "SwissAI Optimize est une entreprise suisse avec un objectif clair : rendre votre entreprise visible là où vos clients recherchent vraiment aujourd'hui — dans l'IA.",
      p2: "Nous intégrons l'IA dans vos activités tout en optimisant la façon dont ChatGPT, Perplexity et Google IA parlent de vous. Swiss made, avec un accent sur la qualité et la protection des données.",
      points: ["Visibilité dans ChatGPT, Perplexity & Google IA", "De l'intégration IA, pas des slogans", 'Un accompagnement personnel en 4 langues'],
    },
    faq: {
      title: 'Questions fréquentes',
      items: [
        {
          q: 'Que signifie la « visibilité IA » ?',
          a: "De plus en plus de personnes demandent des recommandations à ChatGPT, Perplexity ou à l'aperçu IA de Google — au lieu de googler. La visibilité IA signifie que ces systèmes connaissent votre entreprise, la représentent correctement et la recommandent. C'est exactement ce que nous optimisons.",
        },
        {
          q: 'Combien de temps dure un projet IA ?',
          a: 'Les premiers résultats apparaissent souvent après 2 à 4 semaines. Une intégration complète prend 1 à 3 mois selon le périmètre.',
        },
        {
          q: 'Où mes données sont-elles stockées ?',
          a: 'Exclusivement en Suisse si vous le souhaitez. Nous travaillons selon la nLPD et le RGPD et vous conseillons en toute transparence.',
        },
        {
          q: 'Ai-je besoin de connaissances techniques ?',
          a: 'Non. Nous gérons la technique et formons votre équipe pour que chacun utilise les nouveaux outils en confiance.',
        },
        {
          q: 'Combien ça coûte ?',
          a: "L'analyse initiale est gratuite. Vous recevez ensuite une offre transparente à prix fixe — sans coûts cachés.",
        },
        {
          q: 'Est-ce que ça fonctionne aussi pour les petites entreprises ?',
          a: "Surtout pour elles ! Les petites équipes profitent le plus de la disparition des tâches routinières et de nouveaux clients trouvés via l'IA. Nous dimensionnons chaque solution à votre mesure.",
        },
      ],
    },
    contactSection: {
      title: 'Parlons de votre projet',
      subtitle: "Parlez-nous de votre entreprise — nous vous montrerons votre visibilité actuelle dans l'IA, et ce qui est possible. Réponse sous 24 heures.",
      name: 'Nom',
      email: 'E-mail',
      message: 'Votre message',
      send: 'Envoyer le message',
      or: 'ou directement par e-mail :',
    },
    footer: {
      tagline: "Intégration et visibilité IA pour les entreprises suisses.",
      nav: 'Navigation',
      legal: 'Mentions légales',
      impressum: 'Impressum',
      datenschutz: 'Confidentialité',
      madeIn: 'Construit avec précision en Suisse',
    },
  },
  it: {
    nav: ['servizi', 'processo', 'chi siamo', 'faq'],
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
    cornerRight: 'visibilità ia',
    services: {
      title: 'I nostri servizi',
      subtitle: "Integriamo l'IA nella tua azienda — e ci assicuriamo che l'IA ti conosca.",
      items: [
        {
          title: 'Visibilità IA',
          desc: "Sempre più persone chiedono a ChatGPT, Perplexity o alla panoramica IA di Google invece di cercare su Google. Ci assicuriamo che questi sistemi conoscano la tua azienda — e la consiglino.",
        },
        {
          title: 'Automazione dei processi',
          desc: 'Le attività ricorrenti vengono eseguite automaticamente — dalla gestione delle fatture al reporting. Il tuo team guadagna tempo per ciò che conta.',
        },
        {
          title: 'Chatbot IA & servizio clienti',
          desc: 'Assistenti intelligenti rispondono alle richieste dei clienti 24 ore su 24 — in tedesco, francese, italiano e inglese.',
        },
        {
          title: 'Consulenza & formazione IA',
          desc: "Ti mostriamo dove l'IA fa la differenza maggiore nella tua azienda e formiamo il tuo team a usarla in sicurezza.",
        },
      ],
    },
    process: {
      title: 'Come lavoriamo',
      subtitle: "Dalla prima analisi alla raccomandazione da parte dell'IA — in tre passi.",
      steps: [
        {
          title: 'Analisi',
          desc: "Verifichiamo quanto la tua azienda sia visibile oggi nelle risposte dell'IA — e dove l'IA può avere il maggiore impatto nella tua attività.",
        },
        {
          title: 'Integrazione',
          desc: "Integriamo l'IA nei tuoi sistemi e ottimizziamo la tua presenza affinché ChatGPT, Perplexity & co. ti rappresentino correttamente e positivamente.",
        },
        {
          title: 'Risultati',
          desc: "Più richieste grazie ai consigli dell'IA, meno lavoro manuale quotidiano. E restiamo al tuo fianco.",
        },
      ],
    },
    stats: [
      { value: 40, suffix: '%', label: 'di tempo risparmiato in media' },
      { value: 4, suffix: '', label: 'lingue, un unico partner' },
      { value: 100, suffix: '%', label: 'dati ospitati in Svizzera' },
      { value: 24, suffix: '/7', label: 'assistenti IA al lavoro' },
    ],
    about: {
      title: 'Chi siamo',
      p1: "SwissAI Optimize è un'azienda svizzera con un obiettivo chiaro: rendere la tua azienda visibile dove i tuoi clienti cercano davvero oggi — nell'IA.",
      p2: "Integriamo l'IA nelle tue attività ottimizzando allo stesso tempo il modo in cui ChatGPT, Perplexity e Google IA parlano di te. Swiss made, con attenzione a qualità e protezione dei dati.",
      points: ['Visibilità in ChatGPT, Perplexity & Google IA', 'Integrazione IA, non slogan', 'Assistenza personale in 4 lingue'],
    },
    faq: {
      title: 'Domande frequenti',
      items: [
        {
          q: "Cosa significa 'visibilità IA'?",
          a: "Sempre più persone chiedono consigli a ChatGPT, Perplexity o alla panoramica IA di Google — invece di cercare su Google. Visibilità IA significa che questi sistemi conoscono la tua azienda, la rappresentano correttamente e la consigliano. È esattamente ciò che ottimizziamo.",
        },
        {
          q: 'Quanto dura un progetto IA?',
          a: "I primi risultati arrivano spesso già dopo 2–4 settimane. Un'integrazione completa richiede 1–3 mesi a seconda della portata.",
        },
        {
          q: 'Dove vengono salvati i miei dati?',
          a: 'Su richiesta, esclusivamente in Svizzera. Lavoriamo secondo nLPD e GDPR e ti consigliamo con trasparenza su tutti i flussi di dati.',
        },
        {
          q: 'Servono conoscenze tecniche?',
          a: 'No. Ci occupiamo noi della tecnologia e formiamo il tuo team perché tutti possano usare i nuovi strumenti con sicurezza.',
        },
        {
          q: 'Quanto costa?',
          a: "L'analisi iniziale è gratuita. Poi ricevi un'offerta trasparente a prezzo fisso — senza costi nascosti.",
        },
        {
          q: 'Funziona anche per le piccole imprese?',
          a: "Soprattutto lì! I piccoli team traggono il massimo beneficio quando il lavoro di routine scompare e nuovi clienti li trovano tramite l'IA. Dimensioniamo ogni soluzione su misura.",
        },
      ],
    },
    contactSection: {
      title: 'Parliamo del tuo progetto',
      subtitle: "Raccontaci della tua azienda — ti mostreremo quanto sei visibile oggi nell'IA e cosa è possibile fare. Risposta entro 24 ore.",
      name: 'Nome',
      email: 'E-mail',
      message: 'Il tuo messaggio',
      send: 'Invia messaggio',
      or: 'oppure direttamente via e-mail:',
    },
    footer: {
      tagline: "Integrazione e visibilità IA per le aziende svizzere.",
      nav: 'Navigazione',
      legal: 'Note legali',
      impressum: 'Impressum',
      datenschutz: 'Privacy',
      madeIn: 'Costruito con precisione in Svizzera',
    },
  },
}
