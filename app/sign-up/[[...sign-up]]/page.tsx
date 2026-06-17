"use client"

import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/language-context'

const COPY = {
  da: {
    badge: 'Danmarks praktiske AI-træningsplatform',
    headline: 'Fra idé til AI i praksis',
    sub: 'Log ind og fortsæt der, hvor du slap. Din næste lektion, dit forløb og dit hold venter.',
    benefits: [
      { title: 'Praktisk hands-on træning', desc: 'Rigtige opgaver, ikke slides.' },
      { title: 'Værdi inden for 48 timer', desc: 'Kom i gang med det samme.' },
      { title: 'GDPR-compliant og sikker', desc: 'Dine data bliver i Europa.' },
    ],
    stats: [
      { value: '34+', label: 'virksomheder trænet' },
      { value: '48t', label: 'til første værdi' },
      { value: '40%', label: 'effektivitetsgevinst' },
    ],
    cardTitle: 'Opret konto',
    cardSub: 'Kom i gang med HEKLA på under et minut',
    back: 'Tilbage til forsiden',
  },
  en: {
    badge: "Denmark's hands-on AI training platform",
    headline: 'From idea to AI in practice',
    sub: 'Sign in and pick up where you left off. Your next lesson, your track, and your team are waiting.',
    benefits: [
      { title: 'Hands-on, practical training', desc: 'Real tasks, not slides.' },
      { title: 'Value within 48 hours', desc: 'Get started right away.' },
      { title: 'GDPR-compliant and secure', desc: 'Your data stays in Europe.' },
    ],
    stats: [
      { value: '34+', label: 'companies trained' },
      { value: '48h', label: 'to first value' },
      { value: '40%', label: 'efficiency gain' },
    ],
    cardTitle: 'Create account',
    cardSub: 'Get started with HEKLA in under a minute',
    back: 'Back to home',
  },
} as const

export default function Page() {
  const { language } = useLanguage()
  const t = COPY[language] ?? COPY.da

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* LEFT brand panel — desktop only */}
      <div className="card card--ink hidden lg:flex lg:flex-col lg:justify-between p-12">
        {/* Cut motif */}
        <div>
          <div className="cut mb-8" style={{ fontSize: '1.5rem' }}>
            <span className="v" />
            <span className="m" />
          </div>
          <span className="chip chip--violet" style={{ marginBottom: '2rem', display: 'inline-block' }}>
            {t.badge}
          </span>
          <h1 className="display" style={{ color: 'var(--paper)', marginTop: '1.5rem', fontSize: '2.5rem', lineHeight: 1.1 }}>
            {t.headline}
          </h1>
          <p className="muted" style={{ color: 'var(--ash)', marginTop: '1rem' }}>{t.sub}</p>
        </div>

        {/* Benefits list */}
        <ul style={{ margin: '2.5rem 0', listStyle: 'none', padding: 0 }}>
          {t.benefits.map((b, i) => (
            <li
              key={b.title}
              style={{
                paddingTop: i === 0 ? 0 : '1.25rem',
                paddingBottom: '1.25rem',
                borderTop: i > 0 ? '1px solid rgba(255,255,255,.12)' : undefined,
              }}
            >
              <p className="eyebrow" style={{ color: 'var(--paper)', marginBottom: '0.25rem' }}>{b.title}</p>
              <p className="muted" style={{ color: 'var(--ash)', fontSize: '0.875rem' }}>{b.desc}</p>
            </li>
          ))}
        </ul>

        {/* Stats row */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,.12)',
            paddingTop: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }}
        >
          {t.stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,.12)' : undefined,
                paddingLeft: i > 0 ? '1rem' : undefined,
              }}
            >
              <p
                className="mark"
                style={{
                  color: 'var(--paper)',
                  fontSize: '2rem',
                  fontWeight: 100,
                  fontStyle: 'normal',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p className="eyebrow" style={{ color: 'var(--ash)', marginTop: '0.25rem' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT auth column */}
      <div
        className="flex flex-col justify-start lg:justify-center px-6 pt-8 pb-12 sm:px-12 lg:py-12"
        style={{ background: 'var(--paper)' }}
      >
        <div className="mx-auto w-full" style={{ maxWidth: '28rem' }}>
          {/* Mobile compact ink block */}
          <div className="card card--ink lg:hidden" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <div className="cut" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
              <span className="v" />
              <span className="m" />
            </div>
            <span className="mark" style={{ color: 'var(--paper)', display: 'block', marginBottom: '0.75rem' }}>
              HEKLA
            </span>
            <h1 className="display" style={{ color: 'var(--paper)', fontSize: '1.5rem', lineHeight: 1.2, marginBottom: '1rem' }}>
              {t.headline}
            </h1>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {t.benefits.map((b) => (
                <li key={b.title} className="eyebrow" style={{ color: 'var(--ash)', marginBottom: '0.375rem' }}>
                  {b.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Auth card */}
          <div
            className="card"
            style={{
              background: 'var(--white)',
              border: '1px solid var(--black)',
              padding: '2rem',
            }}
          >
            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Account</p>
            <h2 className="display" style={{ fontSize: '1.75rem', lineHeight: 1.1, marginBottom: '0.5rem' }}>
              {t.cardTitle}
            </h2>
            <p className="muted" style={{ marginBottom: '1.5rem' }}>{t.cardSub}</p>

            <div style={{ minHeight: '24rem' }}>
              <SignUp
                appearance={{
                  elements: {
                    rootBox: 'w-full',
                    card: 'shadow-none border-0 bg-transparent p-0 w-full',
                    header: 'hidden',
                    formButtonPrimary:
                      'bg-[#5708D8] hover:bg-[#4a07b8] text-white rounded-none',
                    footerAction: 'text-sm',
                    socialButtonsBlockButton: 'rounded-none border border-black',
                  },
                }}
              />
            </div>
          </div>

          {/* Back link */}
          <Link
            href="/"
            className="muted"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              marginTop: '1.25rem',
              textDecoration: 'none',
            }}
          >
            <span className="arrow" style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>→</span>
            {t.back}
          </Link>
        </div>
      </div>
    </div>
  )
}
