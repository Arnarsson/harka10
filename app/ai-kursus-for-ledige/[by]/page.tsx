// Server-rendered funded city page: /ai-kursus-for-ledige/{by}
// The SEO/GEO land-grab the rival bigum.co opened then abandoned (every city past
// Viborg 404s). HEKLA's edge: REAL localized content per city — local jobcenter,
// local labour-market context, an a-kasse/jobcenter HowTo, positivliste framing —
// NOT a thin doorway page. Emits EducationalOccupationalProgram + HowTo + FAQPage +
// BreadcrumbList JSON-LD. NOT behind Clerk; content is in the SSR HTML so AI
// answer engines can read and cite it. Funnels into the gated app.
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { CITIES, getCity, fundingSteps } from "@/lib/seo/cities"
import { getTerm } from "@/lib/seo/glossary"
import { JsonLd } from "@/components/seo/json-ld"
import { AnswerBlock } from "@/components/seo/answer-block"
import { SITE, absoluteUrl } from "@/lib/seo/config"
import {
  breadcrumbSchema,
  educationalProgramSchema,
  howToSchema,
  faqSchema,
} from "@/lib/seo/schema"

export const revalidate = 86400

export function generateStaticParams() {
  return CITIES.map((c) => ({ by: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ by: string }>
}): Promise<Metadata> {
  const { by } = await params
  const c = getCity(by)
  if (!c) return { title: "AI-kursus for ledige — HEKLA" }
  const path = `/ai-kursus-for-ledige/${c.slug}`
  const title = `AI-kursus for ledige i ${c.name} — betalt via a-kasse | HEKLA`
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

export default async function CityPage({
  params,
}: {
  params: Promise<{ by: string }>
}) {
  const { by } = await params
  const c = getCity(by)
  if (!c) notFound()

  const path = `/ai-kursus-for-ledige/${c.slug}`
  const steps = fundingSteps(c)
  const programName = `AI-kursus for ledige i ${c.name}`

  const schema = [
    breadcrumbSchema([
      { name: "HEKLA", path: "/" },
      { name: "AI-kursus for ledige", path: "/ai-kursus-for-ledige" },
      { name: c.name, path },
    ]),
    educationalProgramSchema({
      name: programName,
      description: c.description,
      path,
      city: c.name,
    }),
    howToSchema({
      name: `Sådan får du et AI-kursus betalt som ledig i ${c.name}`,
      description: `Trin for trin: sådan får du HEKLA's AI-forløb godkendt som jobrettet opkvalificering via din a-kasse eller ${c.jobcenter}.`,
      steps: steps.map((s) => ({ name: s.name, text: s.text })),
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
        <Link href="/ai-kursus-for-ledige" style={{ color: "var(--ash)" }}>
          AI-kursus for ledige
        </Link>{" "}
        / {c.name}
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
        <span className="chip chip--ghost">{c.region}</span>
        <span className="chip chip--ghost">{c.jobcenter}</span>
        <span className="chip chip--ghost">{c.startDatePlaceholder}</span>
      </div>

      <h1 className="display" style={{ marginBottom: 16 }}>
        AI-kursus for ledige i {c.name}
      </h1>

      <AnswerBlock>{c.answer}</AnswerBlock>

      {/* Primary CTA into the app/enrollment. The dashboard stays gated. */}
      <div className="card card--ink" style={{ padding: "24px 28px", marginBottom: 36 }}>
        <h2 style={{ marginBottom: 8 }}>Kom i gang i {c.name}</h2>
        <p style={{ marginBottom: 18, maxWidth: "60ch" }}>
          Få bevillingen på plads hos {c.jobcenter} eller din a-kasse, opret en gratis
          HEKLA-konto og følg forløbet online — med øvelser, fremdrift og certifikat.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link href="/sign-up" className="btn btn--primary">
            Tilmeld dig →
          </Link>
          <Link href="/kurser" className="btn">
            Se kurserne
          </Link>
        </div>
      </div>

      {/* Local labour-market context — the genuine, distinct local content. */}
      <section style={{ marginBottom: 36 }}>
        <div className="section-label">Arbejdsmarkedet i {c.name}</div>
        <div style={{ marginTop: 12 }}>
          {c.localContext.map((para, i) => (
            <p
              key={i}
              style={{ marginBottom: 16, maxWidth: "68ch", fontSize: 16.5, lineHeight: 1.55 }}
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Funding HowTo — rendered as visible steps (mirrors the HowTo schema). */}
      <section style={{ marginBottom: 36 }}>
        <div className="section-label">
          Sådan får du kurset betalt i {c.name}
        </div>
        <p style={{ marginTop: 12, maxWidth: "68ch", fontSize: 16, color: "var(--ash)" }}>
          Jobrettet uddannelse for ledige tages fra de regionale positivlister. Et
          AI- og digitalt kompetenceforløb hører under it- og digitale kompetencer.
          Det er din a-kasse eller {c.jobcenter}, der godkender finansieringen — så tag
          det op tidligt.
        </p>
        <ol style={{ marginTop: 16, paddingLeft: 0, listStyle: "none", display: "grid", gap: 16 }}>
          {steps.map((s, i) => (
            <li key={s.name} className="card" style={{ padding: "18px 22px" }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "baseline",
                  flexWrap: "wrap",
                }}
              >
                <span className="eyebrow" style={{ color: "var(--violet)" }}>
                  Trin {i + 1}
                </span>
                <span style={{ fontWeight: 600 }}>{s.name}</span>
              </div>
              <p style={{ margin: "6px 0 0", maxWidth: "66ch", fontSize: 15.5, lineHeight: 1.55 }}>
                {s.text}
              </p>
            </li>
          ))}
        </ol>
        <p style={{ marginTop: 14, maxWidth: "68ch", fontSize: 14, color: "var(--ash)" }}>
          Bemærk: vi kan ikke garantere godkendelse. Hvad der kan betales, afhænger af din
          konkrete situation og afgøres af din a-kasse eller {c.jobcenter}.
        </p>
      </section>

      {/* What you learn — points into the real course corpus. */}
      <section style={{ marginBottom: 36 }}>
        <div className="section-label">Det lærer du</div>
        <ul style={{ marginTop: 12, paddingLeft: 20, maxWidth: "68ch" }}>
          <li style={{ marginBottom: 8, fontSize: 16 }}>
            Prompt engineering: at få brugbare svar fra ChatGPT, Claude og lignende værktøjer
          </li>
          <li style={{ marginBottom: 8, fontSize: 16 }}>
            AI-automatisering: at fjerne gentaget kontorarbejde med arbejdsgange
          </li>
          <li style={{ marginBottom: 8, fontSize: 16 }}>
            AI-værktøjer i praksis på dine egne opgaver — på dansk, uden teknisk baggrund
          </li>
          <li style={{ marginBottom: 8, fontSize: 16 }}>
            Et HEKLA-certifikat, du kan vise frem i din jobsøgning
          </li>
        </ul>
        <p style={{ marginTop: 12, maxWidth: "68ch", fontSize: 15 }}>
          Se det fulde indhold på{" "}
          <Link href="/kurser" style={{ textDecoration: "underline" }}>
            HEKLA's AI-kurser
          </Link>
          .
        </p>
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
          <div className="section-label">Begreber, du møder undervejs</div>
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
        <h3 style={{ marginBottom: 8 }}>Klar til at gå i gang i {c.name}?</h3>
        <p style={{ marginBottom: 18, maxWidth: "60ch" }}>
          Tal med {c.jobcenter} eller din a-kasse om at få AI-opkvalificering med i din
          jobplan — og styrk din profil, mens du søger.
        </p>
        <Link href="/sign-up" className="btn btn--primary">
          Tilmeld dig →
        </Link>
      </section>
    </main>
  )
}
