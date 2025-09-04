# HARKA – Implementeringsplan (Beyond Beta, VibeCoding, EHHS)

Formålet er at produktisere jeres dokumenterede tilbud (3-dages "AI som konkurrencefordel", 1-dags "AI & VibeCoding", og EHHS 3×2 sessioner) i denne platform, så I kan sælge, levere og dokumentere effekt med minimal friktion.

## 1) Strategi og positionering
- Udfordring: Kun ~30% af danske virksomheder bruger AI; 7/10 af disse ser markante effektivitetsgevinster; >50% forbedrer produkter/ydelser (Digitaliseringsstyrelsen, april 2025). 70% står udenfor.
- Mulighed: Start med at optimere "rugbrødsarbejdet" (PDF-sammenligning, garantisager, lager, servicerapporter) – målbare gevinster på dage, ikke måneder.
- Positionering: “AI der betaler sig på 48 timer” + “No/Low‑code først, prototyper der virker.”

## 2) Produkter (som sider og flows)
- Beyond Beta – 3 dage: Competitive Intelligence → Zero‑Code Prototyping → Investor‑Pitch Design. Output: AI‑strategi one‑pager, klikbar prototype, pitch‑outline.
- AI & VibeCoding – 1 dag: 65% Loveable.dev, live MVP, 3 mdr. support, video-materialer. Output: deployet prototype + checklister.
- EHHS – 3×2 sessioner: Fundament → Hackaton → Vedligehold; inkl. streaming/optagelse, opgaver mellem sessioner. Output: rådgiver‑toolkit og vedligeholdelsesplan.
- Cases: VMS (maritim), Seven Oceans (Kickstarter), Pouchy (Duolingo‑analyse). Struktur: Problem → AI‑løsning → Effekt.

## 3) Faser og leverancer
### Fase 1 – Indhold og sider (Uge 1–2)
- Nye sider (Next.js):
  - `app/programs/ai-advantage-3d/page.tsx`
  - `app/workshops/vibecoding-1d/page.tsx`
  - `app/programs/advisors-3x2/page.tsx`
  - `app/cases/[slug]/page.tsx` (+ liste `app/cases/page.tsx`)
- Komponenter:
  - `components/programs/ProgramDetail.tsx` (genbruges til alle 3)
  - `components/cases/CaseDetail.tsx`
- i18n (udvid `lib/i18n/translations.ts`): navigationstekster, programtekster, CTA’er, cases, FAQ.
- CTA’er: "Book intro-kald" (Calendly), "Hent program som PDF", "Kontakt".

### Fase 2 – AI‑Kompas kobling (Uge 2–3)
- Map AI‑Kompas resultater til anbefalet program (startup → 3 dage, early-stage → 1 dag, rådgivere → EHHS).
- PDF: generér personlig rapport (logo, CVR, anbefaling, budget-estimat) fra server‑route.

### Fase 3 – Ops/Portal (Uge 3–4)
- Supabase skema (ny migration):
  - `workshops` (id, type, titel, beskrivelse, pris, valuta, varighed)
  - `cohorts` (id, workshop_id, start_at, end_at, kapacitet, lokation, stream_url)
  - `participants` (id, cohort_id, user_id?, navn, email, firma, cvr, consent, created_at)
  - `materials` (id, workshop_id?, cohort_id?, titel, type[video|pdf|template], url, visibility)
  - `bookings` (id, workshop_id?, cohort_id?, kontakt_navn, email, firma, cvr, message, source, status)
  - `leads` (id, source, medium, campaign, utm, payload)
  - Relation til eksisterende `certificates` (tilknyt `workshop_id`/`cohort_id` via view eller kolonne)
- Admin UI:
  - `app/admin/workshops` – Opret forløb, planlæg cohort, håndter deltagere, upload materialer, udsted certifikater.
- Deltagerportal:
  - `app/portal/[cohortId]` – Agenda, materialer (Vimeo/PDF), checklister, certifikater.

### Fase 4 – Proposals & PDF (Uge 4)
- Proposal builder (light): skabeloner for Beyond Beta, VibeCoding, EHHS; felter: pris, lokation, gyldighed, deltagere, kontakt.
- Gem som PDF + (valgfrit) `proposals`‑tabel til versionering.

### Fase 5 – Integrationer & Compliance (Uge 4–5)
- Calendly embed på CTA’er; e‑mail (Postmark/Resend) til materialer/certifikater.
- Vimeo: gated embeds i deltagerportal.
- CRM (valgfrit): HubSpot/Pipedrive lead‑sync.
- GDPR: samtykke i booking, privatlivspolitik, retention‑copy, Zero‑Trust sektion.

## 4) Acceptkriterier
- Program‑sider live med klare outputs, formater og CTA’er.
- 3 cases publiceret med målbar effekt (før/efter) og værktøjer.
- AI‑Kompas anbefaler program + kan eksportere personlig PDF.
- Admin: oprette forløb/cohort, tilføje deltagere/materialer, udstede certifikater.
- Portal: deltagere kan tilgå materialer og certifikat (gated).
- Compliance‑copy og samtykke på plads.

## 5) Tidslinje (estimat)
- Uge 1–2: Sider, i18n, cases (marketing klar).
- Uge 2–3: AI‑Kompas kobling + PDF.
- Uge 3–4: DB, Admin, Portal (MVP).
- Uge 4–5: Integrationer, GDPR, QA, lancering.

## 6) Afklaringer (før implementering)
- CRM: HubSpot vs. Pipedrive?
- Video: Vimeo mappestruktur/adgang (pr. cohort eller pr. program).
- Priser: Fastpris vs. "fra" på 3‑dages og EHHS.
- No‑code: Loveable.dev obligatorisk; n8n/make.com prioritet.

## 7) Supabase skema – udkast (SQL‑skitse)
```sql
create table workshops (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('ai-advantage-3d','vibecoding-1d','advisors-3x2')),
  title text not null,
  description text,
  price_cents integer,
  currency text default 'DKK',
  duration_days integer,
  created_at timestamptz default now()
);

create table cohorts (
  id uuid primary key default gen_random_uuid(),
  workshop_id uuid references workshops(id) on delete cascade,
  start_at timestamptz,
  end_at timestamptz,
  capacity integer,
  location text,
  stream_url text,
  created_at timestamptz default now()
);

create table participants (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid references cohorts(id) on delete cascade,
  user_id uuid,
  name text not null,
  email text not null,
  company text,
  cvr text,
  consent boolean default false,
  created_at timestamptz default now()
);

create table materials (
  id uuid primary key default gen_random_uuid(),
  workshop_id uuid references workshops(id) on delete set null,
  cohort_id uuid references cohorts(id) on delete cascade,
  title text not null,
  type text not null check (type in ('video','pdf','template')),
  url text not null,
  visibility text not null check (visibility in ('participant','public')) default 'participant',
  created_at timestamptz default now()
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  workshop_id uuid references workshops(id) on delete set null,
  cohort_id uuid references cohorts(id) on delete set null,
  contact_name text,
  email text,
  company text,
  cvr text,
  message text,
  source text,
  status text check (status in ('new','contacted','qualified','won','lost')) default 'new',
  created_at timestamptz default now()
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  source text,
  medium text,
  campaign text,
  utm jsonb,
  payload jsonb,
  created_at timestamptz default now()
);
```

## 8) Tracking & QA
- KPI: AI‑Kompas → booking konvertering, side‑CTR, program‑formularer, portal‑engagement.
- QA: Playwright flows (program‑side → booking, portal login, certifikat visning, case‑navigation).

## 9) Risici og mitigering
- Værktøjsskift (AI/no‑code): hold copy generisk; opdater demos.
- Video‑adgang: brug gated embeds + deltagerportal.
- Data/GDPR: begræns persondata; tydelig samtykke; retention‑politik i copy.

## 10) Næste skridt
- Godkend side‑copy (se `docs/page-copy-drafts-da.md`).
- Vælg CRM og video‑setup.
- Bekræft prisvisning og CTA‑strategi.

