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
}

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
  },
}
