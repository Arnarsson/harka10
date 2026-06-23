"use client"

export function HarkaCertificates() {
  // Certificates are issued only after a learner passes a real assessment.
  // Until the assessment/issuance flow is wired to the database, these lists
  // are empty — we never show fabricated credentials or instructors.
  type Certificate = {
    id: string
    title: string
    course: string
    completedDate: string
    certificateNumber: string
    instructor: string
    skills: string[]
    grade: string
    score: number
    verificationUrl: string
    chipClass: string
  }
  const certificates: Certificate[] = []

  const achievements: { label: string; date: string }[] = []

  const inProgress: { name: string; progress: number; est: string }[] = []

  return (
    <div>
      {/* Page head */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <span className="cut">
            <span className="v" />
            <span className="m" />
          </span>
          <h1 className="display">Certificates</h1>
          <p className="sub muted">Your HEKLA credentials, verified.</p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", paddingTop: "0.25rem" }}>
          <button className="btn">Verify →</button>
          <button className="btn btn--primary">Browse available →</button>
        </div>
      </div>

      {/* Stat row */}
      <div className="row r4" style={{ marginBottom: "2rem" }}>
        <div className="card stat">
          <div className="eyebrow">Certificates</div>
          <div className="num">{certificates.length}</div>
        </div>
        <div className="card stat">
          <div className="eyebrow">Credits earned</div>
          <div className="num">0</div>
        </div>
        <div className="card stat">
          <div className="eyebrow">Average score</div>
          <div className="num">—</div>
        </div>
        <div className="card stat edge-moss-b">
          <div className="eyebrow">Completion</div>
          <div className="num">—</div>
        </div>
      </div>

      {/* Split: left certificates, right sidebar */}
      <div className="split">
        {/* LEFT */}
        <div>
          <div className="section-label">My certificates</div>

          {certificates.length === 0 && (
            <div className="card" style={{ marginBottom: "1.25rem" }}>
              <h3 style={{ margin: "0 0 0.5rem" }}>No certificates yet</h3>
              <p className="muted" style={{ fontSize: "0.85rem", margin: 0 }}>
                Complete a course and pass its assessment to earn your first verified HEKLA
                credential. Certificates are only issued for assessed, completed courses.
              </p>
            </div>
          )}

          {certificates.map((cert, idx) => (
            <div
              key={cert.id}
              className={`card${idx === 1 ? " card--hair" : ""}`}
              style={{ marginBottom: "1.25rem" }}
            >
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  {/* Brand tile */}
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      background: "var(--violet)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span className="mark" style={{ color: "#fff", fontStyle: "italic" }}>
                      H
                    </span>
                  </div>
                  <div>
                    <h3 style={{ margin: 0, lineHeight: 1.2 }}>{cert.title}</h3>
                    <span className="muted" style={{ fontSize: "0.8rem" }}>
                      {cert.course}
                    </span>
                  </div>
                </div>
                <span className={`chip ${cert.chipClass}`}>
                  {cert.grade} · {cert.score}%
                </span>
              </div>

              {/* KV block */}
              <div className="kv" style={{ marginBottom: "1rem" }}>
                <div className="r">
                  <div className="k">Completed</div>
                  <div className="v">{cert.completedDate}</div>
                </div>
                <div className="r">
                  <div className="k">Instructor</div>
                  <div className="v">{cert.instructor}</div>
                </div>
                <div className="r">
                  <div className="k">Skills</div>
                  <div className="v" style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                    {cert.skills.map((skill) => (
                      <span key={skill} className="chip chip--ghost">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Button row */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button className="btn btn--sm btn--primary">Download PDF ↓</button>
                <button className="btn btn--sm">Share on LinkedIn →</button>
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--sm"
                  style={{ marginLeft: "auto" }}
                >
                  Verify →
                </a>
              </div>

              {/* ID line */}
              <div
                style={{
                  marginTop: "0.75rem",
                  fontFamily: "monospace",
                  fontSize: "0.72rem",
                  color: "var(--ash, #888)",
                }}
              >
                ID · {cert.certificateNumber}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT sidebar */}
        <div className="right-col">
          {/* Achievements */}
          <div className="card" style={{ marginBottom: "1.25rem" }}>
            <div className="section-label">Achievements</div>
            {achievements.length === 0 && (
              <div className="muted" style={{ fontSize: "0.78rem" }}>
                Earn achievements as you progress through courses.
              </div>
            )}
            {achievements.map((a) => (
              <div key={a.label} className="mini" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{a.label}</span>
                <span className="muted" style={{ fontSize: "0.75rem" }}>
                  {a.date}
                </span>
              </div>
            ))}
          </div>

          {/* In progress */}
          <div className="card">
            <div className="section-label">In progress</div>
            {inProgress.length === 0 && (
              <div className="muted" style={{ fontSize: "0.78rem" }}>
                Courses you start will appear here.
              </div>
            )}
            {inProgress.map((item) => (
              <div key={item.name} style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "0.82rem" }}>{item.name}</span>
                  <strong style={{ fontSize: "0.82rem" }}>{item.progress}%</strong>
                </div>
                <div className="bar">
                  <i style={{ width: `${item.progress}%` }} />
                </div>
                <div
                  style={{
                    marginTop: "0.25rem",
                    fontSize: "0.7rem",
                    color: "var(--ash, #888)",
                  }}
                >
                  {item.est}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
