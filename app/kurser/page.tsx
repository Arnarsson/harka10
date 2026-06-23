// Server-rendered public course index: /kurser
// The SEO/GEO discovery layer for HEKLA's courses (NOT behind Clerk). Content is in
// the SSR HTML so crawlers and AI answer engines can read and cite it.
import type { Metadata } from "next"
import Link from "next/link"
import { COURSES, formatDuration, lessonCount, levelLabel } from "@/lib/seo/courses"
import { JsonLd } from "@/components/seo/json-ld"
import { AnswerBlock } from "@/components/seo/answer-block"
import { SITE, absoluteUrl } from "@/lib/seo/config"
import { breadcrumbSchema, itemListSchema } from "@/lib/seo/schema"

export const revalidate = 86400

export const metadata: Metadata = {
  title: "AI-kurser på dansk: Cursor, prompt engineering og automatisering — HEKLA",
  description:
    "HEKLA's danske AI-kurser tager dig fra nysgerrig til brugbar: lær Cursor, prompt engineering og AI-automatisering med praktiske øvelser. Bygget til at bruge AI i dit eget arbejde — uden teknisk baggrund.",
  alternates: { canonical: absoluteUrl("/kurser") },
  openGraph: {
    title: "AI-kurser på dansk — HEKLA",
    description:
      "Lær Cursor, prompt engineering og AI-automatisering på dansk, med praktiske øvelser.",
    url: absoluteUrl("/kurser"),
    type: "website",
    locale: "da_DK",
    siteName: SITE.name,
  },
}

export default function CoursesIndexPage() {
  const schema = [
    breadcrumbSchema([
      { name: "HEKLA", path: "/" },
      { name: "AI-kurser", path: "/kurser" },
    ]),
    itemListSchema(
      COURSES.map((c) => ({ name: c.title, path: `/kurser/${c.slug}` }))
    ),
  ]

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "48px 24px 96px" }}>
      <JsonLd schema={schema} />

      <div className="cut" style={{ marginBottom: 20 }} />
      <h1 className="display" style={{ marginBottom: 10 }}>
        AI-kurser på dansk
      </h1>

      <AnswerBlock>
        HEKLA's AI-kurser tager dig fra nysgerrig til brugbar. Du lærer at bruge AI på dine
        egne opgaver — fra Cursor og prompt engineering til at automatisere kontorarbejde —
        gennem korte lektioner og praktiske øvelser. Alt på dansk, skrevet til dig der vil
        bruge AI i praksis, ikke til forskere.
      </AnswerBlock>

      <div style={{ display: "grid", gap: 18, marginTop: 12 }}>
        {COURSES.map((c) => (
          <Link
            key={c.slug}
            href={`/kurser/${c.slug}`}
            className="card"
            style={{ padding: "26px 28px", display: "block" }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 12,
                alignItems: "center",
              }}
            >
              <span className="chip chip--ghost">{levelLabel(c.level)}</span>
              <span className="chip chip--ghost">{formatDuration(c.durationMinutes)}</span>
              <span className="chip chip--ghost">{lessonCount(c)} lektioner</span>
              {c.isFree && <span className="chip chip--ghost">Gratis</span>}
            </div>
            <h2 className="display" style={{ fontSize: 24, marginBottom: 8 }}>
              {c.title}
            </h2>
            <p style={{ color: "var(--ash)", maxWidth: "68ch", margin: 0, fontSize: 16 }}>
              {c.answer}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}
