// The 40-60 word direct-answer block that leads every programmatic page. This is the
// passage AI engines (ChatGPT, Perplexity, Google AI Overviews) lift and cite. Keep it
// tight, factual, and self-contained — depth goes below it on the page.
export function AnswerBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="card"
      style={{ padding: "20px 24px", margin: "0 0 32px", background: "var(--white)" }}
    >
      <div className="cut" style={{ width: 56, height: 10, marginBottom: 12 }} />
      <div className="eyebrow" style={{ color: "var(--violet)", marginBottom: 8 }}>
        Kort fortalt
      </div>
      <p style={{ fontSize: 17, lineHeight: 1.55, maxWidth: "68ch", margin: 0 }}>
        {children}
      </p>
    </div>
  )
}
