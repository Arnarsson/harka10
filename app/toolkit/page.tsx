import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"

function ToolkitContent() {
  return (
    <div
      style={{
        maxWidth: 1180,
        margin: "0 auto",
        padding: "40px 32px 90px",
      }}
    >
      {/* ── Page head ─────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 24,
          marginBottom: 40,
        }}
      >
        <div>
          <span className="chip chip--ghost" style={{ marginBottom: 16, display: "inline-block" }}>
            <span>AI project resources</span>
          </span>
          <h1 className="display" style={{ fontSize: 52, margin: "8px 0 12px" }}>
            Implementation Toolkit
          </h1>
          <p className="muted" style={{ fontSize: 17, margin: 0 }}>
            Everything to get an AI project off the ground.{" "}
            <strong style={{ color: "var(--black)" }}>42 tools.</strong>
          </p>
        </div>
        <div style={{ paddingTop: 8 }}>
          <a href="/toolkit/start" className="btn btn--primary">
            Start project →
          </a>
        </div>
      </div>

      {/* ── Category grid (6 cards, r3) ──────────────────────────── */}
      <div className="row r3" style={{ marginBottom: 28 }}>
        {[
          { cat: "Strategy", count: "8 tools", title: "Strategic Planning", desc: "Frameworks for AI roadmapping and stakeholder alignment.", accent: true },
          { cat: "Data", count: "7 tools", title: "Data Readiness", desc: "Audit pipelines, label quality, and feature stores.", accent: false },
          { cat: "Modeling", count: "9 tools", title: "Model Development", desc: "Fine-tuning guides, eval suites, and benchmark harnesses.", accent: false },
          { cat: "Infra", count: "6 tools", title: "Infrastructure", desc: "Deployment patterns, scaling playbooks, and cost estimators.", accent: false },
          { cat: "Governance", count: "5 tools", title: "AI Governance", desc: "Risk registers, audit templates, and compliance checklists.", accent: false },
          { cat: "Change", count: "7 tools", title: "Change Management", desc: "Adoption playbooks, training kits, and comms templates.", accent: false },
        ].map(({ cat, count, title, desc, accent }) => (
          <div
            key={cat}
            className={`card${accent ? " edge-moss-b" : ""}`}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span className="eyebrow">{cat}</span>
              <span className="eyebrow">{count}</span>
            </div>
            <div
              className="display"
              style={{ fontSize: 20, marginBottom: 10 }}
            >
              {title}
            </div>
            <p className="muted" style={{ fontSize: 13, margin: "0 0 16px", lineHeight: 1.5 }}>
              {desc}
            </p>
            <a
              href={`/toolkit/${cat.toLowerCase()}`}
              style={{ color: "var(--violet)", fontWeight: 600, fontSize: 12, textDecoration: "none" }}
            >
              Explore →
            </a>
          </div>
        ))}
      </div>

      {/* ── Split: tools list + right col ─────────────────────────── */}
      <div className="split">
        {/* LEFT */}
        <div>
          {/* Implementation tools list */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <span className="eyebrow">Implementation tools</span>
              <a
                href="/toolkit/all"
                style={{ color: "var(--violet)", fontWeight: 600, fontSize: 12, textDecoration: "none" }}
              >
                View all →
              </a>
            </div>

            <ul className="list" style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {[
                {
                  title: "AI Readiness Scorecard",
                  tag: "Assessment",
                  meta: "PDF · 12 pages · Updated Jan 2026",
                },
                {
                  title: "LLM Evaluation Framework",
                  tag: "Template",
                  meta: "XLSX · Benchmark suite · 8 metrics",
                },
                {
                  title: "Data Labeling Playbook",
                  tag: "Guide",
                  meta: "PDF · 28 pages · Includes QA protocol",
                },
                {
                  title: "Cost Estimation Calculator",
                  tag: "Tool",
                  meta: "Google Sheets · Infra + licensing",
                },
              ].map(({ title, tag, meta }) => (
                <li key={title} className="li">
                  <div
                    className="badge-file"
                    style={{ flexShrink: 0 }}
                    aria-hidden="true"
                  >
                    {tag.slice(0, 3).toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>
                      {title}
                      <span
                        className="chip chip--ghost"
                        style={{ transform: "none", padding: "3px 8px" }}
                      >
                        <span>{tag}</span>
                      </span>
                    </h3>
                    <div className="d">{meta}</div>
                  </div>
                  <a href="#" className="btn btn--sm btn--primary" style={{ flexShrink: 0 }}>
                    Download ↓
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Project templates */}
          <div style={{ marginBottom: 10 }}>
            <span className="eyebrow" style={{ display: "block", marginBottom: 14 }}>
              Project templates
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              {
                title: "90-Day AI Pilot Program",
                tags: ["Strategy", "Roadmap"],
                desc: "End-to-end template for scoping and running a contained AI pilot with exec sign-off gates.",
              },
              {
                title: "AI Ethics Review Charter",
                tags: ["Governance", "Legal"],
                desc: "Structured charter for standing up a cross-functional AI review committee.",
              },
            ].map(({ title, tags, desc }) => (
              <div
                key={title}
                className="card--hair"
                style={{ border: "1px solid var(--smoke)", padding: 18 }}
              >
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 10 }}>
                  {title}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                  {tags.map((t) => (
                    <span key={t} className="chip chip--ghost" style={{ transform: "none", padding: "3px 9px" }}>
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
                <p className="muted" style={{ fontSize: 13, margin: "0 0 14px", lineHeight: 1.5 }}>
                  {desc}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <a href="#" className="btn btn--sm">Preview →</a>
                  <a href="#" className="btn btn--sm btn--primary">Use template ↓</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="right-col">
          <div className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <span className="eyebrow">Resource center</span>
            </div>

            <ul className="list" style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {[
                {
                  title: "State of Enterprise AI 2025",
                  meta: "Research report · McKinsey · 2.4 MB",
                },
                {
                  title: "EU AI Act Compliance Checklist",
                  meta: "PDF · Legal · Updated Mar 2026",
                },
                {
                  title: "Prompt Engineering Handbook",
                  meta: "Guide · Anthropic · 64 pages",
                },
              ].map(({ title, meta }) => (
                <li key={title} className="li">
                  <div style={{ gridColumn: "1 / -1" }}>
                    <h3 style={{ margin: "0 0 3px", fontSize: 14 }}>{title}</h3>
                    <div className="d">{meta}</div>
                  </div>
                  <a
                    href="#"
                    style={{
                      color: "var(--violet)",
                      fontWeight: 700,
                      fontSize: 16,
                      textDecoration: "none",
                      flexShrink: 0,
                    }}
                    aria-label={`Download ${title}`}
                  >
                    ↓
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="/toolkit/resources"
              className="btn btn--sm"
              style={{ width: "100%", justifyContent: "center", marginTop: 16 }}
            >
              Browse all resources →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ToolkitPage() {
  return (
    <DashboardLayoutMinimal>
      <ToolkitContent />
    </DashboardLayoutMinimal>
  )
}
