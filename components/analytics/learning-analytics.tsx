"use client"

import { useState } from "react"

export function LearningAnalytics() {
  const [_timeRange] = useState("7d")

  const skillGaps = [
    { skill: "Prompt Engineering", score: 85, industry: 75, target: 90 },
    { skill: "AI Implementation", score: 72, industry: 68, target: 85 },
    { skill: "Data Analysis", score: 90, industry: 80, target: 90 },
    { skill: "Machine Learning", score: 65, industry: 70, target: 88 },
    { skill: "Python Programming", score: 78, industry: 72, target: 85 },
  ]

  const weeklyEngagement = [
    { label: "W1", pct: 62, type: "v" },
    { label: "W2", pct: 48, type: "a" },
    { label: "W3", pct: 75, type: "v" },
    { label: "W4", pct: 55, type: "a" },
    { label: "W5", pct: 88, type: "v" },
    { label: "W6", pct: 70, type: "v" },
    { label: "W7", pct: 92, type: "v" },
  ]

  const phaseCompletion = [
    { label: "Phase 1", pct: 100, type: "m" },
    { label: "Phase 2", pct: 78, type: "v" },
    { label: "Phase 3", pct: 32, type: "a" },
  ]

  const perfVsTarget = [
    { skill: "Prompt Engineering", score: 85, target: 90, done: false },
    { skill: "Data Analysis", score: 90, target: 90, done: true },
    { skill: "Python Programming", score: 78, target: 85, done: false },
    { skill: "AI Implementation", score: 72, target: 85, done: false },
    { skill: "Machine Learning", score: 65, target: 88, done: false },
    { skill: "AI Fundamentals", score: 95, target: 80, done: true },
  ]

  const monthStats = [
    { eyebrow: "Hours logged", num: "42.5", delta: "+12%", accent: "" },
    { eyebrow: "Courses done", num: "8", delta: "+2", accent: "" },
    { eyebrow: "Avg score", num: "87%", delta: "+5%", accent: "" },
    { eyebrow: "Streak days", num: "12", delta: "+4", accent: "edge-moss-b" },
  ]

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 32px 90px" }}>

      {/* Page head */}
      <div style={{ marginBottom: 40 }}>
        <div className="cut" style={{ marginBottom: 18 }}>
          <span className="v" />
          <span className="m" />
        </div>
        <h1 className="display" style={{ fontSize: 52 }}>Analytics</h1>
        <p className="muted" style={{ marginTop: 10, fontSize: 16 }}>
          Where the program is, and where to step in.
        </p>
      </div>

      {/* FORECAST card */}
      <div className="card card--ink" style={{ marginBottom: 20 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Forecast</div>
        <div className="display" style={{ fontSize: 24, color: "var(--paper)", marginBottom: 10 }}>
          Projected completion, with the moves that change it
        </div>
        <p className="muted" style={{ fontSize: 13, marginBottom: 28, color: "#9a9a9a" }}>
          At current velocity, on track to complete 6 weeks ahead of cohort average.
        </p>

        {/* Inline SVG line chart */}
        <div style={{ marginBottom: 12 }}>
          <svg viewBox="0 0 680 160" width="100%" height="160" style={{ display: "block" }}>
            {/* Grid lines */}
            {[0, 40, 80, 120].map((y) => (
              <line
                key={y}
                x1="0" y1={y} x2="680" y2={y}
                stroke="#333" strokeWidth="1" strokeDasharray="4 4"
              />
            ))}
            {[0, 97, 194, 291, 388, 485, 582, 679].map((x) => (
              <line
                key={x}
                x1={x} y1="0" x2={x} y2="160"
                stroke="#222" strokeWidth="1" strokeDasharray="2 6"
              />
            ))}
            {/* Violet polyline */}
            <polyline
              points="0,140 97,120 194,100 291,85 388,60 485,45 582,30 679,18"
              fill="none"
              stroke="#5708D8"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Data points */}
            {[
              [0, 140], [194, 100], [388, 60], [582, 30], [679, 18],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="#5708D8" />
            ))}
            {/* Highlighted point */}
            <circle cx="388" cy="60" r="6" fill="none" stroke="#6FC15E" strokeWidth="2" />
          </svg>
        </div>

        {/* Week labels */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "#9a9a9a",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 28,
        }}>
          {["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7", "Wk 8"].map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>

        {/* Three bordered forecast boxes */}
        <div className="row r3">
          <div style={{ border: "1px solid #333", padding: 16 }}>
            <div className="num" style={{ fontSize: 30, color: "#6FC15E", marginBottom: 8 }}>+6 wk</div>
            <div className="eyebrow">Ahead of cohort</div>
          </div>
          <div style={{ border: "1px solid #333", padding: 16 }}>
            <div className="num" style={{ fontSize: 30, color: "var(--paper)", marginBottom: 8 }}>Sep 14</div>
            <div className="eyebrow">Projected finish</div>
          </div>
          <div style={{ border: "1px solid #333", padding: 16 }}>
            <div className="num" style={{ fontSize: 30, color: "#5708D8", marginBottom: 8 }}>87%</div>
            <div className="eyebrow">Confidence</div>
          </div>
        </div>
      </div>

      {/* Skill gap + Risk assessment */}
      <div className="row r2" style={{ marginBottom: 20 }}>
        {/* Skill gap */}
        <div className="card">
          <div className="eyebrow" style={{ marginBottom: 18 }}>Skill gap vs. industry</div>
          {skillGaps.map((s) => (
            <div key={s.skill} className="skillbar">
              <div className="top">
                <span>{s.skill}</span>
                <b>{s.score} / {s.target}</b>
              </div>
              <div className="bar">
                <i style={{ width: `${s.score}%` }} />
              </div>
              <div className="meta">
                <span>Industry avg {s.industry}</span>
                <span>Target {s.target}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Risk assessment */}
        <div className="card">
          <div className="eyebrow" style={{ marginBottom: 18 }}>Risk assessment</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="card--hair" style={{ border: "1px solid var(--smoke)", padding: 16 }}>
              <div style={{ marginBottom: 10 }}>
                <span className="chip">
                  <span>High · 72%</span>
                </span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>
                Machine Learning gap
              </div>
              <p className="muted" style={{ fontSize: 13 }}>
                Current score is 5 pts below industry average. Requires focused sprint this week.
              </p>
            </div>
            <div className="card--hair" style={{ border: "1px solid var(--smoke)", padding: 16 }}>
              <div style={{ marginBottom: 10 }}>
                <span className="chip chip--ghost">
                  <span>Medium · 45%</span>
                </span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>
                Engagement drop W2
              </div>
              <p className="muted" style={{ fontSize: 13 }}>
                A 14-point dip in week 2 may recur. Cohort comparison shows similar pattern.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section label: This month */}
      <div className="section-label">
        <span className="n">→</span>
        <h2>This month</h2>
        <span className="act">
          <a href="#">Export report →</a>
        </span>
      </div>

      {/* 4 stat cards */}
      <div className="row r4" style={{ marginBottom: 20 }}>
        {monthStats.map((s) => (
          <div key={s.eyebrow} className={`card stat${s.accent ? ` ${s.accent}` : ""}`}>
            <span className="eyebrow">{s.eyebrow}</span>
            <div className="num" style={{ fontSize: 46 }}>{s.num}</div>
            <div className="delta"><b>{s.delta}</b> vs last month</div>
          </div>
        ))}
      </div>

      {/* Two bar charts */}
      <div className="row r2" style={{ marginBottom: 20 }}>
        {/* Weekly engagement */}
        <div className="card">
          <div className="eyebrow" style={{ marginBottom: 18 }}>Weekly engagement</div>
          <div className="bars">
            {weeklyEngagement.map((bar) => (
              <div key={bar.label} className={`b ${bar.type}`}>
                <i style={{ height: `${bar.pct}%` }} />
                <span>{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase completion */}
        <div className="card">
          <div className="eyebrow" style={{ marginBottom: 18 }}>Phase completion</div>
          <div className="bars">
            {phaseCompletion.map((bar) => (
              <div key={bar.label} className={`b ${bar.type}`}>
                <i style={{ height: `${bar.pct}%` }} />
                <span>{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance vs. target */}
      <div className="card">
        <div className="eyebrow" style={{ marginBottom: 18 }}>Performance vs. target</div>
        {perfVsTarget.map((s) => (
          <div key={s.skill} className="skillbar">
            <div className="top">
              <span>{s.skill}</span>
              <b>{s.score} / {s.target}</b>
            </div>
            <div className={`bar${s.done ? " is-done" : ""}`}>
              <i style={{ width: `${s.score}%` }} />
            </div>
            <div className="meta">
              <span>Target {s.target}</span>
              <span style={{ color: s.done ? "var(--moss)" : "var(--ash)" }}>
                {s.done ? "Above target" : `Gap ${s.target - s.score} pts`}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
