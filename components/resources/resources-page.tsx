"use client"

import { useState } from "react"

export function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("all")

  const tabs = [
    { id: "all", label: "All" },
    { id: "guides", label: "Guides" },
    { id: "templates", label: "Templates" },
    { id: "tools", label: "Tools" },
    { id: "videos", label: "Videos" },
  ]

  const resources = [
    {
      id: 1,
      badge: "PDF",
      title: "AI Ethics Framework Guide",
      chip: "Guide",
      chipVariant: "ghost",
      meta: "by HEKLA Team · 1,247 downloads · ★ 4.8",
    },
    {
      id: 2,
      badge: "DOC",
      title: "Prompt Engineering Template Library",
      chip: "Template",
      chipVariant: "ghost",
      meta: "by Sarah Chen · 892 downloads · ★ 4.6",
    },
    {
      id: 3,
      badge: "MP4",
      title: "Bias Detection Workshop Video",
      chip: "Premium",
      chipVariant: "violet",
      meta: "by Dr. Michael Zhang · 634 downloads · ★ 4.9",
    },
    {
      id: 4,
      badge: "XLS",
      title: "ROI Calculator Spreadsheet",
      chip: "Tool",
      chipVariant: "ghost",
      meta: "by Emma Wilson · 458 downloads · ★ 4.5",
    },
    {
      id: 5,
      badge: "CSV",
      title: "Customer Service AI Training Dataset",
      chip: "Dataset",
      chipVariant: "ghost",
      meta: "by Alex Rivera · 289 downloads · ★ 4.7",
    },
  ]

  const stats = [
    { label: "Total Resources", value: "156" },
    { label: "Downloads Today", value: "89" },
    { label: "Popular This Week", value: "23" },
    { label: "Contributors", value: "12" },
  ]

  const popularTags = [
    { name: "ethics", count: 34 },
    { name: "prompts", count: 28 },
    { name: "implementation", count: 23 },
    { name: "templates", count: 19 },
    { name: "bias", count: 16 },
    { name: "business", count: 14 },
  ]

  const recentDownloads = [
    { title: "AI Ethics Framework Guide", user: "Sven", time: "2h ago" },
    { title: "Prompt Templates", user: "Lisa", time: "4h ago" },
    { title: "ROI Calculator", user: "John", time: "6h ago" },
    { title: "Bias Detection Video", user: "Maria", time: "8h ago" },
  ]

  return (
    <div>
      {/* PAGE HEAD */}
      <div className="page-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span className="cut"><span className="v" /><span className="m" /></span>
          <h1 className="display">Resources</h1>
          <p className="sub muted">Guides, templates, tools and datasets.</p>
        </div>
        <div style={{ display: "flex", gap: "8px", paddingTop: "4px" }}>
          <button className="btn">Upload →</button>
          <button className="btn btn--primary">Request →</button>
        </div>
      </div>

      {/* FEATURED */}
      <div className="row r2" style={{ marginTop: "32px" }}>
        {/* Featured card 1 */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span className="badge-file">PDF</span>
            <span className="eyebrow">★ 4.8</span>
          </div>
          <h3>AI Ethics Framework Guide</h3>
          <p className="muted" style={{ margin: "6px 0 16px" }}>
            Comprehensive guide to implementing ethical AI practices in your organisation.
          </p>
          <button className="btn btn--primary" style={{ width: "100%" }}>Download ↓</button>
        </div>

        {/* Featured card 2 — edge accent */}
        <div className="card edge-moss-b">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span className="badge-file">MP4</span>
            <span className="chip chip--violet"><span>Premium</span></span>
          </div>
          <h3>Bias Detection Workshop Video</h3>
          <p className="muted" style={{ margin: "6px 0 16px" }}>
            Interactive 45-minute workshop on identifying and mitigating AI bias.
          </p>
          <button className="btn btn--primary" style={{ width: "100%" }}>Download ↓</button>
        </div>
      </div>

      {/* SPLIT: list + sidebar */}
      <div className="split" style={{ marginTop: "32px" }}>
        {/* LEFT — resource list */}
        <div>
          <div className="card">
            <p className="eyebrow" style={{ marginBottom: "12px" }}>All resources · 156</p>

            {/* Tabs */}
            <div className="tabs" style={{ marginBottom: "20px" }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={activeTab === tab.id ? "on" : undefined}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="list">
              {resources.map((r) => (
                <div className="li" key={r.id}>
                  <span className="badge-file">{r.badge}</span>
                  <div>
                    <h3>{r.title}</h3>
                    <span className={`chip chip--${r.chipVariant}`}><span>{r.chip}</span></span>
                    <p className="d muted">{r.meta}</p>
                  </div>
                  <button className="btn btn--sm btn--primary">Download ↓</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT sidebar */}
        <div className="right-col">
          {/* Resource stats */}
          <div className="card">
            <p className="section-label" style={{ marginBottom: "12px" }}>Resource stats</p>
            {stats.map((s) => (
              <div className="mini" key={s.label} style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="muted">{s.label}</span>
                <strong>{s.value}</strong>
              </div>
            ))}
          </div>

          {/* Popular tags */}
          <div className="card">
            <p className="section-label" style={{ marginBottom: "12px" }}>Popular tags</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {popularTags.map((tag) => (
                <span className="chip chip--ghost" key={tag.name}>
                  <span>{tag.name} {tag.count}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Recent downloads */}
          <div className="card">
            <p className="section-label" style={{ marginBottom: "12px" }}>Recent downloads</p>
            {recentDownloads.map((d, i) => (
              <div className="mini" key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span>{d.user}</span>
                  <span className="muted" style={{ marginLeft: "4px" }}>{d.title}</span>
                </div>
                <span className="muted" style={{ color: "var(--ash, #888)", whiteSpace: "nowrap", marginLeft: "8px" }}>{d.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
