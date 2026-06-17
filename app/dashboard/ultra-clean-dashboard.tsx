"use client"

import Link from "next/link"
import { useUser } from "@clerk/nextjs"

export function UltraCleanDashboard() {
  const { user } = useUser()
  const firstName = user?.firstName || "Learner"

  const currentCourse = {
    title: "AI Fundamentals",
    progress: 65,
    nextLesson: "Prompt Engineering Fundamentals",
    timeLeft: "23 min"
  }

  const stats = {
    streakDays: 12,
    coursesCompleted: 3,
    hoursLearned: 24.5
  }

  return (
    <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "40px 32px 90px" }}>

      {/* Page head */}
      <div style={{ marginBottom: "48px" }}>
        <div className="cut" style={{ marginBottom: "16px" }}>
          <span className="v" />
          <span className="m" />
        </div>
        <h1 className="display" style={{ fontSize: "clamp(32px,4vw,46px)", marginBottom: "8px" }}>
          Welcome back, {firstName}.
        </h1>
        <p className="sub muted">Pick up where you left off and keep the streak alive.</p>
      </div>

      {/* Continue card — the one dark moment */}
      <div
        className="card card--ink"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "32px",
          alignItems: "center",
          marginBottom: "40px",
          padding: "40px"
        }}
      >
        <div>
          <p className="eyebrow" style={{ marginBottom: "10px" }}>Pick up where you stopped</p>
          <p className="display" style={{ fontSize: "30px", marginBottom: "6px" }}>
            {currentCourse.title}
          </p>
          <p className="muted" style={{ marginBottom: "24px" }}>
            Lesson: {currentCourse.nextLesson}
          </p>
          <div className="bar bar--ink" style={{ marginBottom: "12px" }}>
            <i style={{ width: `${currentCourse.progress}%` }} />
          </div>
          <p className="muted" style={{ fontSize: "13px" }}>
            {currentCourse.progress}% complete / {currentCourse.timeLeft} left
          </p>
        </div>
        <div>
          <a className="btn btn--primary" href="/learn/courses" style={{ whiteSpace: "nowrap" }}>
            Resume <span className="arrow">→</span>
          </a>
        </div>
      </div>

      {/* Stats — row r3 */}
      <div className="row r3" style={{ marginBottom: "56px" }}>
        <div className="card stat">
          <p className="eyebrow">Learning Streak</p>
          <p className="num" style={{ fontSize: "46px" }}>
            {stats.streakDays}<span style={{ fontSize: "18px", color: "var(--ash, #888)", fontWeight: 400, marginLeft: "4px" }}>days</span>
          </p>
          <p className="delta">Keep it going →</p>
        </div>

        <div className="card stat">
          <p className="eyebrow">Courses Completed</p>
          <p className="num" style={{ fontSize: "46px" }}>
            {stats.coursesCompleted}
          </p>
          <p className="delta">+1 this month</p>
        </div>

        <div className="card stat edge-moss-b">
          <p className="eyebrow">Hours Learned</p>
          <p className="num" style={{ fontSize: "46px" }}>
            {stats.hoursLearned}<span style={{ fontSize: "18px", color: "var(--ash, #888)", fontWeight: 400, marginLeft: "4px" }}>hrs</span>
          </p>
          <p className="delta">On track</p>
        </div>
      </div>

      {/* Where to next */}
      <div style={{ marginBottom: "56px" }}>
        <div className="section-label" style={{ marginBottom: "24px" }}>
          <span className="n">→</span>
          <h2>Where to next</h2>
        </div>
        <div className="row r3">
          <Link href="/learn/courses" className="card" style={{ display: "block", textDecoration: "none" }}>
            <p className="eyebrow" style={{ marginBottom: "10px" }}>All Courses</p>
            <p className="display" style={{ fontSize: "22px", marginBottom: "6px" }}>
              Browse Courses <span className="arrow" style={{ color: "var(--violet, #5708D8)" }}>→</span>
            </p>
            <p className="muted">Explore new topics and expand your knowledge</p>
          </Link>

          <Link href="/learn/ai-kompas" className="card" style={{ display: "block", textDecoration: "none" }}>
            <p className="eyebrow" style={{ marginBottom: "10px" }}>AI Compass</p>
            <p className="display" style={{ fontSize: "22px", marginBottom: "6px" }}>
              AI Recommendations <span className="arrow" style={{ color: "var(--violet, #5708D8)" }}>→</span>
            </p>
            <p className="muted">Get personalized learning paths tailored to you</p>
          </Link>

          <Link href="/community/power-hour" className="card" style={{ display: "block", textDecoration: "none" }}>
            <p className="eyebrow" style={{ marginBottom: "10px" }}>Community</p>
            <p className="display" style={{ fontSize: "22px", marginBottom: "6px" }}>
              Join Power Hour <span className="arrow" style={{ color: "var(--violet, #5708D8)" }}>→</span>
            </p>
            <p className="muted">Connect with peers and learn together</p>
          </Link>
        </div>
      </div>

      {/* Recommended for you */}
      <div>
        <div className="section-label" style={{ marginBottom: "24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="n">→</span>
            <h2>Recommended for you</h2>
          </div>
          <Link href="/learn/courses" className="act muted" style={{ fontSize: "13px", textDecoration: "none" }}>
            See all →
          </Link>
        </div>
        <div className="row r4">
          {[
            { title: "Prompt Engineering", duration: "4 hours", level: "Beginner", code: "PE", shot: "s1" },
            { title: "AI for Business Leaders", duration: "6 hours", level: "Intermediate", code: "AI", shot: "s2" },
            { title: "Working with LLMs", duration: "8 hours", level: "Intermediate", code: "LLM", shot: "s3" },
            { title: "AI Ethics & Governance", duration: "5 hours", level: "Beginner", code: "EG", shot: "s4" },
          ].map((course, idx) => (
            <div key={idx} className="tile">
              <div className={`shot ${course.shot}`}>
                <span className="mono">{course.code}</span>
              </div>
              <div className="body">
                <h3>{course.title}</h3>
                <div className="meta">
                  <span className="t">{course.duration}</span>
                  <span className="chip chip--ghost">{course.level}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default UltraCleanDashboard
