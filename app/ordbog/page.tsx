// Server-rendered glossary index: /ordbog
import type { Metadata } from "next"
import Link from "next/link"
import { GLOSSARY } from "@/lib/seo/glossary"
import { JsonLd } from "@/components/seo/json-ld"
import { AnswerBlock } from "@/components/seo/answer-block"
import { SITE, absoluteUrl } from "@/lib/seo/config"
import { breadcrumbSchema, itemListSchema } from "@/lib/seo/schema"

export const revalidate = 86400

export const metadata: Metadata = {
  title: "AI-ordbog: AI-begreber forklaret på dansk — HEKLA",
  description:
    "HEKLA's danske AI-ordbog forklarer de vigtigste AI-begreber enkelt: AI-agent, prompt engineering, LLM, RAG, AI-forordningen og flere — uden teknisk jargon.",
  alternates: { canonical: absoluteUrl("/ordbog") },
  openGraph: {
    title: "AI-ordbog: AI-begreber forklaret på dansk — HEKLA",
    description:
      "De vigtigste AI-begreber forklaret enkelt på dansk: AI-agent, prompt engineering, LLM, RAG og flere.",
    url: absoluteUrl("/ordbog"),
    type: "website",
    locale: "da_DK",
    siteName: SITE.name,
  },
}

export default function GlossaryIndexPage() {
  const schema = [
    breadcrumbSchema([
      { name: "HEKLA", path: "/" },
      { name: "AI-ordbog", path: "/ordbog" },
    ]),
    itemListSchema(
      GLOSSARY.map((t) => ({
        name: t.term,
        path: `/ordbog/hvad-er-${t.slug}`,
      }))
    ),
  ]

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "48px 24px 96px" }}>
      <JsonLd schema={schema} />

      <div className="cut" style={{ marginBottom: 20 }} />
      <h1 className="display" style={{ marginBottom: 10 }}>
        AI-ordbog
      </h1>

      <AnswerBlock>
        HEKLA's AI-ordbog forklarer de vigtigste begreber inden for kunstig intelligens
        på almindeligt dansk — fra AI-agent og prompt engineering til LLM, RAG og
        AI-forordningen. Hvert opslag er kort, konkret og skrevet til dig, der vil bruge
        AI i praksis, ikke til forskere.
      </AnswerBlock>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
          marginTop: 12,
        }}
      >
        {GLOSSARY.map((t) => (
          <Link
            key={t.slug}
            href={`/ordbog/hvad-er-${t.slug}`}
            className="card"
            style={{ padding: "20px 22px", display: "block" }}
          >
            <h3 style={{ marginBottom: 6 }}>{t.term}</h3>
            <p
              style={{
                fontSize: 14,
                color: "var(--ash)",
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {t.short}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}
