// Central SEO/GEO config. Single source of truth for the programmatic surface.
// Canonical host. MUST match app/layout.tsx metadataBase (same env var + default) or
// canonical and OG URLs disagree. NEEDS-HUMAN: when DNS for the brand domain lands,
// set NEXT_PUBLIC_SITE_URL=https://learn.harka.dk in Vercel (one var, both consumers).
export const SITE = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://harka10.vercel.app").replace(/\/$/, ""),
  name: "HEKLA",
  // Used in titles/llms.txt. The brand is HEKLA — never the old name.
  legalName: "HEKLA",
  tagline: "Lær AI i praksis — kurser, certificering og vejen til job",
  description:
    "HEKLA er den danske AI-læringsplatform: praktiske kurser i AI, prompt engineering og AI-værktøjer, med certificering og en vej videre til job.",
  defaultLocale: "da" as const,
  twitter: "@hekla",
}

// Current year for "i 2026"-style titles that signal freshness to search + AI engines.
export const SEO_YEAR = 2026

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`
}
