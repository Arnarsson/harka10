// schema.org JSON-LD builders. Pure functions returning plain objects; render them
// with <JsonLd schema={...} />. Beats hverdagsai (Organization only) and matches
// bigum's best page — but on EVERY programmatic page.
import { SITE, absoluteUrl } from "./config"

const CTX = "https://schema.org"

export function organizationSchema() {
  return {
    "@context": CTX,
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    sameAs: [] as string[],
  }
}

export function websiteSchema() {
  return {
    "@context": CTX,
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "da-DK",
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": CTX,
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  }
}

export function faqSchema(qas: { q: string; a: string }[]) {
  return {
    "@context": CTX,
    "@type": "FAQPage",
    mainEntity: qas.map((qa) => ({
      "@type": "Question",
      name: qa.q,
      acceptedAnswer: { "@type": "Answer", text: qa.a },
    })),
  }
}

export function definedTermSchema(opts: {
  term: string
  description: string
  path: string
}) {
  return {
    "@context": CTX,
    "@type": "DefinedTerm",
    name: opts.term,
    description: opts.description,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "HEKLA AI-ordbog",
      url: absoluteUrl("/ordbog"),
    },
    url: absoluteUrl(opts.path),
  }
}

export function courseSchema(opts: {
  name: string
  description: string
  path: string
  inLanguage?: string
  isFree?: boolean
  priceDkk?: number
}) {
  return {
    "@context": CTX,
    "@type": "Course",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    inLanguage: opts.inLanguage || "da-DK",
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    offers: {
      "@type": "Offer",
      category: opts.isFree ? "Free" : "Paid",
      price: opts.isFree ? 0 : opts.priceDkk ?? 0,
      priceCurrency: "DKK",
      availability: "https://schema.org/InStock",
    },
  }
}

// For the funded "AI for ledige" city pages — the program the jobcenter funds.
export function educationalProgramSchema(opts: {
  name: string
  description: string
  path: string
  city: string
}) {
  return {
    "@context": CTX,
    "@type": "EducationalOccupationalProgram",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    educationalProgramMode: "full-time",
    occupationalCategory: "AI / digitale kompetencer",
    programType: "6 ugers jobrettet uddannelse",
    availableLanguage: "da-DK",
  }
}

export function howToSchema(opts: {
  name: string
  description: string
  steps: { name: string; text: string }[]
}) {
  return {
    "@context": CTX,
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}

export function itemListSchema(items: { name: string; path: string }[]) {
  return {
    "@context": CTX,
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.path),
    })),
  }
}
