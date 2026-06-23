// Server-rendered glossary term page: /ordbog/hvad-er-{slug}
// Content is in the initial HTML (no client i18n) so AI engines can cite it.
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { GLOSSARY, getTerm } from "@/lib/seo/glossary"
import { JsonLd } from "@/components/seo/json-ld"
import { AnswerBlock } from "@/components/seo/answer-block"
import { SITE, absoluteUrl } from "@/lib/seo/config"
import {
  breadcrumbSchema,
  definedTermSchema,
  faqSchema,
} from "@/lib/seo/schema"

export const revalidate = 86400

export function generateStaticParams() {
  return GLOSSARY.map((t) => ({ slug: `hvad-er-${t.slug}` }))
}

function resolve(slug: string) {
  return getTerm(slug.replace(/^hvad-er-/, ""))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const t = resolve(slug)
  if (!t) return { title: "Ordbog — HEKLA" }
  const path = `/ordbog/hvad-er-${t.slug}`
  const title = `Hvad er ${t.term}? Forklaret enkelt — HEKLA`
  return {
    title,
    description: t.short,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title,
      description: t.short,
      url: absoluteUrl(path),
      type: "article",
      locale: "da_DK",
      siteName: SITE.name,
    },
  }
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const t = resolve(slug)
  if (!t) notFound()

  const path = `/ordbog/hvad-er-${t.slug}`
  const schema = [
    breadcrumbSchema([
      { name: "HEKLA", path: "/" },
      { name: "AI-ordbog", path: "/ordbog" },
      { name: t.term, path },
    ]),
    definedTermSchema({ term: t.term, description: t.short, path }),
    faqSchema(t.faqs.map((f) => ({ q: f.q, a: f.a }))),
  ]
  const related = t.related
    .map((s) => getTerm(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px 96px" }}>
      <JsonLd schema={schema} />

      <nav className="eyebrow" style={{ marginBottom: 24, color: "var(--ash)" }}>
        <Link href="/ordbog" style={{ color: "var(--ash)" }}>
          AI-ordbog
        </Link>{" "}
        / {t.term}
      </nav>

      <h1 className="display" style={{ marginBottom: 6 }}>
        Hvad er {t.term}?
      </h1>
      {t.aka && (
        <p className="muted" style={{ color: "var(--ash)", marginBottom: 24 }}>
          Også kaldet: {t.aka}
        </p>
      )}

      <AnswerBlock>{t.short}</AnswerBlock>

      <article>
        {t.body.map((para, i) => (
          <p key={i} style={{ marginBottom: 18, maxWidth: "68ch", fontSize: 17 }}>
            {para}
          </p>
        ))}
      </article>

      <section style={{ marginTop: 40 }}>
        <div className="section-label">Ofte stillede spørgsmål</div>
        {t.faqs.map((f) => (
          <div key={f.q} style={{ marginBottom: 22 }}>
            <h3 style={{ marginBottom: 6 }}>{f.q}</h3>
            <p style={{ maxWidth: "68ch", color: "var(--black)" }}>{f.a}</p>
          </div>
        ))}
      </section>

      {related.length > 0 && (
        <section style={{ marginTop: 40 }}>
          <div className="section-label">Relaterede begreber</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/ordbog/hvad-er-${r.slug}`}
                className="chip chip--ghost"
              >
                {r.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section
        className="card card--ink"
        style={{ marginTop: 48, padding: "28px 32px" }}
      >
        <div className="cut" style={{ width: 56, height: 10, marginBottom: 14 }} />
        <h3 style={{ marginBottom: 8 }}>Lær at bruge {t.term} i praksis</h3>
        <p style={{ marginBottom: 18, maxWidth: "60ch" }}>
          HEKLA's AI-kurser tager dig fra begreb til konkret brug på dine egne opgaver —
          på dansk, uden teknisk baggrund.
        </p>
        <Link href="/learn/courses" className="btn btn--primary">
          Se kurser →
        </Link>
      </section>
    </main>
  )
}
