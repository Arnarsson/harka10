// Server-rendered JSON-LD. A plain <script> tag (NOT next/script) so the schema is
// in the SSR HTML where crawlers and AI engines read it. Accepts one object or many.
export function JsonLd({ schema }: { schema: object | object[] }) {
  const items = Array.isArray(schema) ? schema : [schema]
  return (
    <>
      {items.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  )
}
