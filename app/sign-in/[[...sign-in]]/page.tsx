"use client"

import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/language-context'
import { Sparkles, Clock, ShieldCheck, ArrowLeft } from 'lucide-react'

const COPY = {
  da: {
    badge: 'Danmarks praktiske AI-træningsplatform',
    headline: 'Fra idé til AI i praksis',
    sub: 'Log ind og fortsæt der, hvor du slap. Din næste lektion, dit forløb og dit hold venter.',
    benefits: [
      { icon: Sparkles, title: 'Praktisk hands-on træning', desc: 'Rigtige opgaver, ikke slides.' },
      { icon: Clock, title: 'Værdi inden for 48 timer', desc: 'Kom i gang med det samme.' },
      { icon: ShieldCheck, title: 'GDPR-compliant og sikker', desc: 'Dine data bliver i Europa.' },
    ],
    stats: [
      { value: '34+', label: 'virksomheder trænet' },
      { value: '48t', label: 'til første værdi' },
      { value: '40%', label: 'effektivitetsgevinst' },
    ],
    cardTitle: 'Log ind',
    cardSub: 'Fortsæt til din læringsplatform',
    back: 'Tilbage til forsiden',
  },
  en: {
    badge: "Denmark's hands-on AI training platform",
    headline: 'From idea to AI in practice',
    sub: 'Sign in and pick up where you left off. Your next lesson, your track, and your team are waiting.',
    benefits: [
      { icon: Sparkles, title: 'Hands-on, practical training', desc: 'Real tasks, not slides.' },
      { icon: Clock, title: 'Value within 48 hours', desc: 'Get started right away.' },
      { icon: ShieldCheck, title: 'GDPR-compliant and secure', desc: 'Your data stays in Europe.' },
    ],
    stats: [
      { value: '34+', label: 'companies trained' },
      { value: '48h', label: 'to first value' },
      { value: '40%', label: 'efficiency gain' },
    ],
    cardTitle: 'Sign in',
    cardSub: 'Continue to your learning platform',
    back: 'Back to home',
  },
} as const

export default function Page() {
  const { language } = useLanguage()
  const t = COPY[language] ?? COPY.da

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Brand panel — what HARKA is + why trust it */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 lg:flex lg:flex-col lg:justify-between p-12 text-white">
        {/* soft glow accents */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/90 ring-1 ring-inset ring-white/20">
            <Sparkles className="h-3.5 w-3.5" />
            {t.badge}
          </span>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white">
            {t.headline}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/80">{t.sub}</p>

          <ul className="mt-10 space-y-5">
            {t.benefits.map((b) => (
              <li key={b.title} className="flex items-start gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-inset ring-white/20">
                  <b.icon className="h-5 w-5 text-white" />
                </span>
                <div>
                  <p className="font-semibold text-white">{b.title}</p>
                  <p className="text-sm text-white/70">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative grid grid-cols-3 gap-4 border-t border-white/15 pt-8">
          {t.stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs leading-snug text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Auth panel */}
      <div className="flex flex-col justify-center bg-background px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          {/* compact brand header (mobile + reassurance on desktop) */}
          <div className="mb-8 lg:hidden">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {t.badge}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{t.cardTitle}</h2>
            <p className="mt-1 text-muted-foreground">{t.cardSub}</p>
          </div>

          <SignIn
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'shadow-none border-0 bg-transparent p-0 w-full',
                header: 'hidden',
                formButtonPrimary:
                  'bg-primary hover:bg-primary/90 text-primary-foreground text-sm normal-case',
                footerAction: 'text-sm',
                socialButtonsBlockButton: 'border-border',
              },
            }}
          />

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.back}
          </Link>
        </div>
      </div>
    </div>
  )
}
