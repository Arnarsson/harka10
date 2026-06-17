"use client"

export function HarkaCertificates() {
  const certificates = [
    {
      id: "1",
      title: "AI Fundamentals Certification",
      course: "AI Fundamentals",
      completedDate: "Jan 15, 2024",
      certificateNumber: "HEKLA-AI-2024-001",
      instructor: "Dr. Sarah Chen",
      skills: ["Machine Learning", "Neural Networks", "AI Ethics", "Data Processing"],
      grade: "A+",
      score: 95,
      verificationUrl: "https://verify.harka.com/cert/HEKLA-AI-2024-001",
      chipClass: "chip--moss",
    },
    {
      id: "2",
      title: "Machine Learning Specialist",
      course: "Advanced Machine Learning",
      completedDate: "Dec 20, 2023",
      certificateNumber: "HEKLA-ML-2023-078",
      instructor: "Prof. Michael Zhang",
      skills: ["Deep Learning", "TensorFlow", "Model Optimization", "Computer Vision"],
      grade: "A",
      score: 88,
      verificationUrl: "https://verify.harka.com/cert/HEKLA-ML-2023-078",
      chipClass: "chip--ghost",
    },
    {
      id: "3",
      title: "AI Ethics & Governance",
      course: "Ethics & Governance",
      completedDate: "Nov 10, 2023",
      certificateNumber: "HEKLA-ETH-2023-156",
      instructor: "Dr. Emma Wilson",
      skills: ["Ethical AI", "Bias Detection", "Regulatory Compliance", "Risk Assessment"],
      grade: "A+",
      score: 92,
      verificationUrl: "https://verify.harka.com/cert/HEKLA-ETH-2023-156",
      chipClass: "chip--moss",
    },
  ]

  const achievements = [
    { label: "First Certificate", date: "Nov 2023" },
    { label: "High Achiever", date: "Jan 2024" },
    { label: "Ethics Champion", date: "Nov 2023" },
    { label: "ML Expert", date: "Dec 2023" },
  ]

  const inProgress = [
    { name: "AI Implementation Specialist", progress: 75, est: "Est. 2 weeks" },
    { name: "Advanced Neural Networks", progress: 45, est: "Est. 1 month" },
    { name: "AI Project Management", progress: 20, est: "Est. 6 weeks" },
  ]

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
          <div className="num">3</div>
        </div>
        <div className="card stat">
          <div className="eyebrow">Credits earned</div>
          <div className="num">13</div>
        </div>
        <div className="card stat">
          <div className="eyebrow">Average score</div>
          <div className="num">91.7%</div>
        </div>
        <div className="card stat edge-moss-b">
          <div className="eyebrow">Completion</div>
          <div className="num">100%</div>
        </div>
      </div>

      {/* Split: left certificates, right sidebar */}
      <div className="split">
        {/* LEFT */}
        <div>
          <div className="section-label">My certificates</div>

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
