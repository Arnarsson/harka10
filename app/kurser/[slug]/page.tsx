// Server-rendered public course page: /kurser/{slug}
// The SEO/GEO marketing surface for each course (NOT behind Clerk). Emits Course +
// FAQPage + BreadcrumbList JSON-LD, leads with a 40-60 word answer block, lists the
// full module/lesson outline (real Danish content), and funnels into the gated app.
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import {
  COURSES,
  getCourse,
  formatDuration,
  lessonCount,
  levelLabel,
} from "@/lib/seo/courses"
import { getTerm } from "@/lib/seo/glossary"
import { JsonLd } from "@/components/seo/json-ld"
import { AnswerBlock } from "@/components/seo/answer-block"
import { SITE, absoluteUrl } from "@/lib/seo/config"
import {
  breadcrumbSchema,
  courseSchema,
  faqSchema,
} from "@/lib/seo/schema"

export const revalidate = 86400

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const c = getCourse(slug)
  if (!c) return { title: "Kurser — HEKLA" }
  const path = `/kurser/${c.slug}`
  const title = `${c.title} — HEKLA`
  return {
    title,
    description: c.description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title,
      description: c.answer,
      url: absoluteUrl(path),
      type: "article",
      locale: "da_DK",
      siteName: SITE.name,
    },
  }
}

const KIND_LABEL: Record<string, string> = {
  tekst: "Tekst",
  øvelse: "Øvelse",
  quiz: "Quiz",
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const c = getCourse(slug)
  if (!c) notFound()

  const path = `/kurser/${c.slug}`
  const schema = [
    breadcrumbSchema([
      { name: "HEKLA", path: "/" },
      { name: "AI-kurser", path: "/kurser" },
      { name: c.title, path },
    ]),
    courseSchema({
      name: c.title,
      description: c.description,
      path,
      inLanguage: "da-DK",
      isFree: c.isFree,
      priceDkk: c.priceDkk,
    }),
    faqSchema(c.faqs.map((f) => ({ q: f.q, a: f.a }))),
  ]

  const relatedTerms = c.relatedTerms
    .map((s) => getTerm(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px 96px" }}>
      <JsonLd schema={schema} />

      <nav className="eyebrow" style={{ marginBottom: 24, color: "var(--ash)" }}>
        <Link href="/kurser" style={{ color: "var(--ash)" }}>
          AI-kurser
        </Link>{" "}
        / {c.shortTitle}
      </nav>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 14,
          alignItems: "center",
        }}
      >
        <span className="chip chip--ghost">{levelLabel(c.level)}</span>
        <span className="chip chip--ghost">{formatDuration(c.durationMinutes)}</span>
        <span className="chip chip--ghost">{lessonCount(c)} lektioner</span>
        <span className="chip chip--ghost">{c.modules.length} moduler</span>
        {c.isFree && <span className="chip chip--ghost">Gratis</span>}
      </div>

      <h1 className="display" style={{ marginBottom: 16 }}>
        {c.title}
      </h1>

      <AnswerBlock>{c.answer}</AnswerBlock>

      {/* Primary CTA into the app/enrollment. The dashboard stays gated. */}
      <div
        className="card card--ink"
        style={{ padding: "24px 28px", marginBottom: 36 }}
      >
        <h2 style={{ marginBottom: 8 }}>Start kurset</h2>
        <p style={{ marginBottom: 18, maxWidth: "60ch" }}>
          Opret en gratis HEKLA-konto og følg lektionerne i platformen — med øvelser,
          fremdrift og certifikat.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link href="/sign-up" className="btn btn--primary">
            Tilmeld dig →
          </Link>
          <Link href="/learn/courses" className="btn">
            Se kurset i platformen
          </Link>
        </div>
      </div>

      <p style={{ maxWidth: "68ch", fontSize: 17, marginBottom: 36 }}>{c.description}</p>

      {/* Objectives */}
      <section style={{ marginBottom: 36 }}>
        <div className="section-label">Det lærer du</div>
        <ul style={{ marginTop: 12, paddingLeft: 20, maxWidth: "68ch" }}>
          {c.objectives.map((o) => (
            <li key={o} style={{ marginBottom: 8, fontSize: 16 }}>
              {o}
            </li>
          ))}
        </ul>
      </section>

      {/* Audience + requirements */}
      <section style={{ marginBottom: 36 }}>
        <div className="section-label">Hvem er kurset til</div>
        <p style={{ marginTop: 12, maxWidth: "68ch", fontSize: 16 }}>{c.audience}</p>
        <div className="section-label" style={{ marginTop: 22 }}>
          Forudsætninger
        </div>
        <ul style={{ marginTop: 12, paddingLeft: 20, maxWidth: "68ch" }}>
          {c.requirements.map((r) => (
            <li key={r} style={{ marginBottom: 8, fontSize: 16 }}>
              {r}
            </li>
          ))}
        </ul>
      </section>

      {/* Curriculum */}
      <section style={{ marginBottom: 36 }}>
        <div className="section-label">Indhold</div>
        <div style={{ marginTop: 16, display: "grid", gap: 18 }}>
          {c.modules.map((m, mi) => (
            <div key={m.title} className="card" style={{ padding: "22px 24px" }}>
              <h3 style={{ marginBottom: 6 }}>
                Modul {mi + 1} — {m.title}
              </h3>
              <p style={{ color: "var(--ash)", marginBottom: 14, maxWidth: "68ch" }}>
                {m.summary}
              </p>
              <div style={{ display: "grid", gap: 16 }}>
                {m.lessons.map((l) => (
                  <div key={l.title}>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "baseline",
                        flexWrap: "wrap",
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>{l.title}</span>
                      <span className="eyebrow" style={{ color: "var(--ash)" }}>
                        {KIND_LABEL[l.kind] ?? l.kind} · {l.minutes}m
                      </span>
                    </div>
                    <p
                      style={{
                        color: "var(--ash)",
                        margin: "4px 0 0",
                        fontSize: 15,
                        maxWidth: "68ch",
                      }}
                    >
                      {l.outline}
                    </p>
                    {l.body && (
                      <div
                        style={{
                          marginTop: 12,
                          paddingLeft: 14,
                          borderLeft: "2px solid var(--moss, #2f3d2f)",
                        }}
                      >
                        <h4 style={{ marginBottom: 8, fontSize: 15 }}>{l.body.heading}</h4>
                        {l.body.paragraphs.map((para, pi) => (
                          <p
                            key={pi}
                            style={{
                              marginBottom: 10,
                              maxWidth: "66ch",
                              fontSize: 15.5,
                              lineHeight: 1.55,
                            }}
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ marginBottom: 36 }}>
        <div className="section-label">Ofte stillede spørgsmål</div>
        <div style={{ marginTop: 12 }}>
          {c.faqs.map((f) => (
            <div key={f.q} style={{ marginBottom: 22 }}>
              <h3 style={{ marginBottom: 6 }}>{f.q}</h3>
              <p style={{ maxWidth: "68ch", color: "var(--black)" }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related glossary terms */}
      {relatedTerms.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <div className="section-label">Begreber fra kurset</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
            {relatedTerms.map((r) => (
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

      {/* Closing CTA */}
      <section className="card card--ink" style={{ marginTop: 8, padding: "28px 32px" }}>
        <div className="cut" style={{ width: 56, height: 10, marginBottom: 14 }} />
        <h3 style={{ marginBottom: 8 }}>Klar til at gå i gang?</h3>
        <p style={{ marginBottom: 18, maxWidth: "60ch" }}>
          Tilmeld dig {c.shortTitle} og lær at bruge AI på dine egne opgaver — på dansk,
          uden teknisk baggrund.
        </p>
        <Link href="/sign-up" className="btn btn--primary">
          Tilmeld dig →
        </Link>
      </section>
    </main>
  )
}
