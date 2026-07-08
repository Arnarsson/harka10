"use client"

export function HeklaCourses() {
  const currentCourse = {
    title: "AI Fundamentals",
    progress: 38,
    modules: 4,
    completedModules: 2
  }

  const modules = [
    {
      id: 1,
      title: "Introduction to AI",
      subtitle: "Core concepts and terminology",
      lessons: [
        { title: "What is Artificial Intelligence?", completed: true },
        { title: "History of AI Development", completed: true },
        { title: "Types of AI Systems", completed: true },
        { title: "Knowledge Check: AI Fundamentals", completed: false }
      ],
      completed: false,
      current: false
    },
    {
      id: 2,
      title: "Machine Learning Basics",
      subtitle: "Understanding how machines learn",
      lessons: [
        { title: "Supervised vs. Unsupervised Learning", completed: true },
        { title: "Neural Networks Explained", completed: true },
        { title: "Training Models: Best Practices", completed: false },
        { title: "Your First Machine Learning Model", completed: false }
      ],
      completed: false,
      current: true
    },
    {
      id: 3,
      title: "Language Models",
      subtitle: "Deep dive into NLP and language models",
      lessons: [
        { title: "Introduction to NLP", completed: false },
        { title: "How Language Models Work", completed: false },
        { title: "Prompt Engineering Fundamentals", completed: false },
        { title: "Crafting Effective Prompts", completed: false },
        { title: "Module Assessment", completed: false }
      ],
      completed: false,
      current: false
    },
    {
      id: 4,
      title: "Advanced Topics",
      subtitle: "Exploring further AI concepts",
      lessons: [
        { title: "AI Ethics and Responsibility", completed: false },
        { title: "Reinforcement Learning Intro", completed: false },
        { title: "Building an AI Project", completed: false }
      ],
      completed: false,
      current: false
    }
  ]

  const bookmarkedResources = [
    {
      title: "Prompt Engineering Guide",
      description: "Patterns for reliable prompts",
      type: "Guide"
    },
    {
      title: "LLM Glossary",
      description: "Key terms, explained simply",
      type: "Reference"
    },
    {
      title: "AI Governance Checklist",
      description: "GDPR & responsible AI use",
      type: "Template"
    }
  ]

  const currentModule = modules.find((m) => m.current) ?? modules[0]

  // Derive subtitle: "AI Fundamentals. Module 3 of 4."
  const currentModuleIndex = modules.findIndex((m) => m.current)
  const currentModuleNumber = currentModuleIndex >= 0 ? currentModuleIndex + 1 : currentCourse.completedModules + 1

  // Quick stats (static per spec)
  const quickStats = [
    { label: "Total progress", value: "38%" },
    { label: "Active courses", value: "5" },
    { label: "Hours spent", value: "24.5" },
    { label: "Achievements", value: "12" },
  ]

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 32px 90px" }}>
      {/* PAGE HEAD */}
      <div style={{ marginBottom: 34 }}>
        <div className="cut" style={{ marginBottom: 18 }}>
          <span className="v" />
          <span className="m" />
        </div>
        <h1 className="display" style={{ fontSize: "clamp(32px,4vw,46px)" }}>Learn</h1>
        <p className="sub muted" style={{ marginTop: 6 }}>
          {currentCourse.title}. Module {currentModuleNumber} of {currentCourse.modules}.
        </p>
      </div>

      {/* CURRENT COURSE BANNER */}
      <div className="card" style={{ marginTop: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
          <div>
            <p className="eyebrow">Current course</p>
            <h2 className="display" style={{ fontSize: 26, marginTop: 6, marginBottom: 12 }}>
              {currentCourse.title}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span className="muted" style={{ fontSize: 13 }}>Overall progress</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{currentCourse.progress}%</span>
            </div>
            <div className="bar">
              <i style={{ width: currentCourse.progress + "%" }} />
            </div>
          </div>
          <div>
            <button className="btn btn--primary">
              Continue <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* SPLIT LAYOUT */}
      <div className="split" style={{ marginTop: 30 }}>
        {/* LEFT: Module list */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h2 style={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em" }}>Modules</h2>
            <div className="tabs">
              <button className="on">List</button>
              <button>Grid</button>
            </div>
          </div>

          {modules.map((module) => {
            const completedCount = module.lessons.filter((l) => l.completed).length
            const totalCount = module.lessons.length
            const pct = Math.round((completedCount / totalCount) * 100)
            const hasStarted = completedCount > 0
            const isNotStarted = completedCount === 0 && !module.current

            const cardClass = [
              "card",
              isNotStarted ? "card--hair" : "",
              module.current ? "edge-moss" : "",
            ]
              .filter(Boolean)
              .join(" ")

            const cardStyle = module.current
              ? { borderColor: "var(--violet)", marginBottom: 18 }
              : { marginBottom: 18 }

            return (
              <div key={module.id} className={cardClass} style={cardStyle}>
                {/* Module header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                  <div>
                    <h3 style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>
                      Module {module.id} — {module.title}
                    </h3>
                    <p className="muted" style={{ marginTop: 3, fontSize: 13 }}>{module.subtitle}</p>
                  </div>
                  {module.current && (
                    <span className="chip chip--violet">
                      <span>Current</span>
                    </span>
                  )}
                </div>

                {/* Lessons */}
                <div className="lessons">
                  {module.lessons.map((lesson, idx) => (
                    <div key={idx} className={lesson.completed ? "lesson done" : "lesson"}>
                      <span className="tick" />
                      {lesson.title}
                    </div>
                  ))}
                </div>

                {/* Module footer */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 14 }}>
                  <span className="eyebrow">{completedCount} of {totalCount} done</span>
                  {hasStarted && (
                    <div className="bar" style={{ width: 120 }}>
                      <i style={{ width: pct + "%" }} />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* RIGHT: sidebar */}
        <div className="right-col">
          {/* Quick stats */}
          <div className="card" style={{ marginBottom: 18 }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>Quick stats</p>
            {quickStats.map((stat) => (
              <div key={stat.label} className="mini" style={{ marginBottom: 10 }}>
                {stat.label}
                <b>{stat.value}</b>
              </div>
            ))}
          </div>

          {/* Bookmarked */}
          <div className="card">
            <p className="eyebrow" style={{ marginBottom: 12 }}>Bookmarked</p>
            <div className="list">
              {bookmarkedResources.map((resource, idx) => (
                <div key={idx} className="li" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10, alignItems: "start" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{resource.title}</div>
                    <div className="d muted" style={{ fontSize: 12 }}>{resource.description}</div>
                  </div>
                  <span className="chip chip--ghost">{resource.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
