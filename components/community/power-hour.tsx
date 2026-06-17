'use client'

import { useState } from 'react'

interface PowerHourSession {
  id: string
  startTime: string
  timezone: string
  participants: number
  maxParticipants: number
  focus: string
  host?: string
}

const upcomingSessions: PowerHourSession[] = [
  {
    id: '1',
    startTime: '09:00',
    timezone: 'CET',
    participants: 24,
    maxParticipants: 50,
    focus: 'AI Automation Projects',
    host: 'Sarah Chen',
  },
  {
    id: '2',
    startTime: '13:00',
    timezone: 'CET',
    participants: 18,
    maxParticipants: 50,
    focus: 'Deep Learning Study',
  },
  {
    id: '3',
    startTime: '17:00',
    timezone: 'CET',
    participants: 31,
    maxParticipants: 50,
    focus: 'Code Review & Practice',
  },
  {
    id: '4',
    startTime: '21:00',
    timezone: 'CET',
    participants: 12,
    maxParticipants: 50,
    focus: 'Open Study Session',
    host: 'Alex Kumar',
  },
]

export function PowerHour() {
  const [joined, setJoined] = useState<string | null>(null)

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 32px 90px' }}>

      {/* ── Hero ── */}
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <div className="cut">
          <span className="v" />
          <span className="m" />
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(34px,5vw,52px)', marginTop: 24 }}>
          Power Hours
        </h1>
        <p className="sub muted" style={{ marginTop: 16 }}>
          Sixty focused minutes with the HEKLA community. Distraction-free, with a coach on the line.
        </p>
      </div>

      {/* ── Three feature cards ── */}
      <div className="row r3" style={{ marginTop: 40 }}>

        <div className="card" style={{ textAlign: 'center' }}>
          <div className="num" style={{ fontSize: 48, color: '#5708D8' }}>60</div>
          <h3 style={{ marginTop: 8 }}>Time-Boxed Focus</h3>
          <p className="muted" style={{ marginTop: 4 }}>Sixty minutes of pure, uninterrupted productivity.</p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div className="num" style={{ fontSize: 48 }}>∞</div>
          <h3 style={{ marginTop: 8 }}>Community Support</h3>
          <p className="muted" style={{ marginTop: 4 }}>Learn alongside motivated peers around the globe.</p>
        </div>

        <div className="card edge-moss-b" style={{ textAlign: 'center' }}>
          <div className="num" style={{ fontSize: 48, color: '#6FC15E' }}>5</div>
          <h3 style={{ marginTop: 8 }}>Track Progress</h3>
          <p className="muted" style={{ marginTop: 4 }}>Build streaks, earn achievements, stay accountable.</p>
        </div>

      </div>

      {/* ── Today's sessions ── */}
      <div className="card" style={{ marginTop: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span className="eyebrow">Today's sessions</span>
          <span className="chip chip--moss">4 live</span>
        </div>

        <ul className="list">
          {upcomingSessions.map((session) => (
            <li key={session.id} className="li">
              {/* time */}
              <div>
                <span className="num" style={{ fontSize: 22 }}>{session.startTime}</span>
                {' '}
                <span className="eyebrow" style={{ verticalAlign: 'middle' }}>CET</span>
              </div>

              {/* title + host */}
              <div style={{ flex: 1, padding: '0 16px' }}>
                <h3 style={{ margin: 0 }}>{session.focus}</h3>
                <span className="d muted" style={{ fontSize: 13 }}>
                  {session.host ? `Hosted by ${session.host}` : 'Community session'}
                  {' · '}
                  {session.participants}/{session.maxParticipants}
                </span>
              </div>

              {/* action */}
              <div>
                <button
                  className="btn btn--sm btn--primary"
                  onClick={() => setJoined(session.id)}
                  disabled={joined === session.id}
                >
                  {joined === session.id ? 'Joined ✓' : 'Join →'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Stats ── */}
      <div className="card" style={{ marginTop: 32 }}>
        <div style={{ marginBottom: 20 }}>
          <span className="eyebrow">Your Power Hour stats</span>
        </div>

        <div className="row r4">
          <div className="stat">
            <div className="num" style={{ fontSize: 40 }}>12</div>
            <div className="eyebrow">Sessions</div>
          </div>
          <div className="stat">
            <div className="num" style={{ fontSize: 40 }}>720</div>
            <div className="eyebrow">Minutes focused</div>
          </div>
          <div className="stat">
            <div className="num" style={{ fontSize: 40, color: '#5708D8' }}>5</div>
            <div className="eyebrow">Day streak</div>
          </div>
          <div className="stat">
            <div className="num" style={{ fontSize: 40, color: '#6FC15E' }}>89%</div>
            <div className="eyebrow">Completion rate</div>
          </div>
        </div>
      </div>

    </div>
  )
}
