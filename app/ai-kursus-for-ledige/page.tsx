// Server-rendered index for the funded "AI for ledige" city matrix:
// /ai-kursus-for-ledige
// The SEO/GEO front door for ledige (people on dagpenge/kontanthjælp) who can get
// AI upskilling paid via a-kasse or jobcenter. Lists the cities we have real local
// content for. NOT behind Clerk; content is in the SSR HTML so AI engines can cite it.
import type { Metadata } from "next"
import Link from "next/link"
import { CITIES } from "@/lib/seo/cities"
import { JsonLd } from "@/components/seo/json-ld"
import { AnswerBlock } from "@/components/seo/answer-block"
import { SITE, absoluteUrl } from "@/lib/seo/config"
import { breadcrumbSchema, itemListSchema } from "@/lib/seo/schema"

export const revalidate = 86400

export const metadata: Metadata = {
  title: "AI-kursus for ledige — betalt via a-kasse eller jobcenter | HEKLA",
  description:
    "Er du ledig? Få ofte et AI-kursus betalt via din a-kasse eller dit jobcenter som jobrettet opkvalificering. HEKLA's danske AI-forløb lærer dig at bruge AI i praksis — find din by og se, hvordan du kommer i gang.",
  alternates: { canonical: absoluteUrl("/ai-kursus-for-ledige") },
  openGraph: {
    title: "AI-kursus for ledige — betalt via a-kasse eller jobcenter | HEKLA",
    description:
      "Få ofte et AI-kursus betalt via a-kasse eller jobcenter som ledig. Find din by og kom i gang.",
    url: absoluteUrl("/ai-kursus-for-ledige"),
    type: "website",
    locale: "da_DK",
    siteName: SITE.name,
  },
}

export default function LedigeIndexPage() {
  const schema = [
    breadcrumbSchema([
      { name: "HEKLA", path: "/" },
      { name: "AI-kursus for ledige", path: "/ai-kursus-for-ledige" },
    ]),
    itemListSchema(
      CITIES.map((c) => ({
        name: `AI-kursus for ledige i ${c.name}`,
        path: `/ai-kursus-for-ledige/${c.slug}`,
      }))
    ),
  ]

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "48px 24px 96px" }}>
      <JsonLd schema={schema} />

      <div className="cut" style={{ marginBottom: 20 }} />
      <h1 className="display" style={{ marginBottom: 10 }}>
        AI-kursus for ledige — betalt via a-kasse eller jobcenter
      </h1>

      <AnswerBlock>
        Er du ledig, kan du ofte få et AI-kursus betalt gennem din a-kasse eller dit
        jobcenter som jobrettet opkvalificering. HEKLA's danske AI-forløb lærer dig at
        bruge AI i praksis — prompt engineering, automatisering og AI-værktøjer på
        kontoret — uden teknisk baggrund. Vælg din by nedenfor og se, hvordan du kommer i
        gang.
      </AnswerBlock>

      <p style={{ maxWidth: "68ch", fontSize: 17, marginBottom: 28 }}>
        Et kort, jobrettet AI-forløb er en praktisk vej til at styrke din profil, mens du
        er ledig. Du lærer at bruge AI-værktøjer på rigtige opgaver — og du får et
        certifikat, du kan vise frem. Hvad der kan betales, og hvordan, afhænger af din
        situation og afgøres af din a-kasse eller dit jobcenter; siderne herunder forklarer
        processen i din by.
      </p>

      <div style={{ display: "grid", gap: 18, marginTop: 12 }}>
        {CITIES.map((c) => (
          <Link
            key={c.slug}
            href={`/ai-kursus-for-ledige/${c.slug}`}
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
              <span className="chip chip--ghost">{c.region}</span>
              <span className="chip chip--ghost">{c.jobcenter}</span>
            </div>
            <h2 className="display" style={{ fontSize: 24, marginBottom: 8 }}>
              AI-kursus for ledige i {c.name}
            </h2>
            <p style={{ color: "var(--ash)", maxWidth: "68ch", margin: 0, fontSize: 16 }}>
              {c.answer}
            </p>
          </Link>
        ))}
      </div>

      <p style={{ maxWidth: "68ch", fontSize: 15, marginTop: 28, color: "var(--ash)" }}>
        Din by er ikke med endnu? Forløbet er det samme — kontakt dit lokale jobcenter
        eller din a-kasse og spørg, om HEKLA's AI-opkvalificering kan godkendes som
        jobrettet uddannelse.
      </p>
    </main>
  )
}
