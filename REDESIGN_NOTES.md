# HEKLA Entry-Surface Redesign — Working Notes

Driven by: TrainingPlatform/docs/handoffs/2026-06-17-hekla-dashboard-redesign-smart-goal-loop.md
Repo: ~/code/harka10 (Arnarsson/harka10), Next.js 14 App Router + Clerk + Supabase + shadcn/ui.

## Why /dashboard and /learn/courses "redirect to sign-in"
middleware.ts gates them. Anonymous users only ever see `/` (landing) and `/sign-in`.
So the real anonymous **front door = `/sign-in`** + landing `/`.

## Target files
| Surface | File | Current state |
|---|---|---|
| Sign-in (front door) | `app/sign-in/[[...sign-in]]/page.tsx` | **WEAKEST.** Floating Clerk card on near-empty white. "HEKLA / Sign in to your learning platform". No value prop, no trust, dead space. |
| Landing `/` | `components/landing/danish-b2b-landing.tsx` (510 ln) | Full Danish B2B landing — review hero only. |
| Dashboard | `app/dashboard/ultra-clean-dashboard.tsx` (203 ln) | OK structure (continue-learning hero, stats, actions). Uses hardcoded grays not tokens; generic English content ("Advanced React Patterns", "Python Fundamentals") off-brand for a Danish AI-training product. |
| Courses | `components/courses/harka-courses.tsx` (317 ln) | OK structure. Bookmarked resources are leftover v0 junk (React/Next/Tailwind) — off-brand. |

## Design system (shadcn tokens, app/globals.css)
- primary = vibrant purple `262 83% 58%`; accent = emerald `142 76% 36%`; gradient purple→blue→emerald.
- Use `bg-background/text-foreground/text-muted-foreground/border-border/bg-primary` tokens — NOT hardcoded grays.
- Fonts: Inter (sans). radius 0.5rem.

## Plan (priority = impact, per handoff "one dominant action per screen")
1. **Sign-in** — two-column "step into the platform": left = HEKLA brand + 1-line value prop + 3 trust/benefit signals on a branded gradient panel; right = Clerk SignIn card. Kills dead white, answers "what is HEKLA / why trust it". Mobile: stack, brand panel collapses to compact header.
2. **Dashboard** — swap hardcoded grays → tokens; AI-training content; keep continue-learning dominant.
3. **Courses** — fix off-brand bookmarked resources; strengthen resume.

## Verify
- `pnpm dev` (mock Clerk key fallback exists in layout). Screenshot before/after `/sign-in`, `/`, `/dashboard`, `/learn/courses` via /browse.
- `pnpm build` (next build) must pass. `pnpm type-check`.

## Exit
Stop when entry surface clearly reads as a premium AI-training platform with a dominant primary action + clear course hierarchy — not endless polish.
