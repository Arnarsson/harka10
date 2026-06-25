import type { MetadataRoute } from "next"
import { SITE } from "@/lib/seo/config"
import { COURSES } from "@/lib/seo/courses"
import { GLOSSARY } from "@/lib/seo/glossary"
import { CITIES } from "@/lib/seo/cities"

// XML sitemap for the PUBLIC, indexable surface: marketing pages, the public course
// discovery layer (/kurser), and the Danish AI glossary (/ordbog). Auth-gated app
// areas are excluded here and in robots.ts. Generated from the same data the pages
// render, so it never drifts out of sync.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/kurser`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/ordbog`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${base}/ai-kursus-for-ledige`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/programs`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ]

  const coursePages: MetadataRoute.Sitemap = COURSES.map((c) => ({
    url: `${base}/kurser/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const glossaryPages: MetadataRoute.Sitemap = GLOSSARY.map((t) => ({
    url: `${base}/ordbog/hvad-er-${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const cityPages: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${base}/ai-kursus-for-ledige/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...coursePages, ...glossaryPages, ...cityPages]
}
