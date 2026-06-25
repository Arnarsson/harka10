// HEKLA's funded-channel city matrix — the source of truth for /ai-kursus-for-ledige/[by].
//
// This is the SEO/GEO surface aimed at the funded "ledig"-channel: people on
// dagpenge or kontanthjælp who can get an AI/digital upskilling course paid via
// their a-kasse or jobcenter (6 ugers jobrettet uddannelse / positivliste). The
// rival bigum.co opened this lane, ranked, then abandoned it (every city past
// Viborg 404s). HEKLA's edge is REAL localized pages, not thin doorway pages —
// each city below has genuinely distinct local content: its own jobcenter, its
// own labour-market context, its own start-date placeholder.
//
// Like courses.ts and glossary.ts, this is a plain server-rendered data module
// (no client i18n) so the corpus lands in the SSR HTML where crawlers and AI
// answer engines can read and cite it.
//
// HONESTY NOTE: no instructor names, no fabricated certificates, no invented
// jobcenter quotes. Start dates are explicit placeholders ("NEEDS-HUMAN") until
// a real cohort is scheduled. Funding eligibility is framed as "ask your a-kasse /
// jobcenter" — we do not claim a guaranteed approval.

export type CityFaq = { q: string; a: string }

export type City = {
  slug: string // /ai-kursus-for-ledige/{slug}
  // Proper Danish display name (e.g. "København").
  name: string
  // Genitive/locative-friendly inflection for prose ("i København", "i Aarhus").
  inName: string
  // Region (administrative) — used in prose + schema.
  region: string
  // The real local jobcenter name (verifiable public institution).
  jobcenter: string
  // 40-60 word answer block — the citable passage. Mentions the city + funding.
  answer: string
  // Longer intro / meta description source.
  description: string
  // 2-3 paragraphs of genuinely local labour-market context (Danish). Distinct
  // per city — this is what makes the page real content, not a doorway.
  localContext: string[]
  // Start-date placeholder. NEEDS-HUMAN: replace with a real scheduled cohort
  // date before promoting the page. Kept honest as "løbende optag" for now.
  startDatePlaceholder: string
  faqs: CityFaq[]
  // Related glossary term slugs (cross-link into /ordbog).
  relatedTerms: string[]
}

// The a-kasse / jobcenter HowTo is shared (the national process is the same), but
// each city page renders it with its own jobcenter name woven in.
export type FundingStep = { name: string; text: string }

export function fundingSteps(city: City): FundingStep[] {
  return [
    {
      name: "Tjek om du er i målgruppen",
      text: "Er du ledig og medlem af en a-kasse — eller tilmeldt som jobsøgende hos jobcenteret — kan du ofte få et AI- og digitalt opkvalificeringsforløb betalt. Det gælder typisk dig på dagpenge eller i et jobafklarings-/kontanthjælpsforløb.",
    },
    {
      name: "Find kurset på en positivliste",
      text: "Jobrettet uddannelse for ledige tages fra de regionale positivlister. Et AI- og digitalt kompetenceforløb hører under it- og digitale kompetencer. Spørg din a-kasse, om HEKLA's forløb kan godkendes under den ramme, eller som anden vejledning og opkvalificering.",
    },
    {
      name: `Tal med ${city.jobcenter}`,
      text: `Book en samtale med ${city.jobcenter} eller din a-kasse og bed om at få AI-opkvalificering med i din jobplan ("Min Plan"). Det er sagsbehandleren eller a-kassen, der godkender, at forløbet betales — derfor er det vigtigt at tage det op tidligt.`,
    },
    {
      name: "Få godkendelsen på skrift",
      text: "Få bevillingen skriftligt, før du starter, så finansieringen er på plads. Når den er godkendt, tilmelder du dig HEKLA-forløbet og følger lektionerne online med øvelser, fremdrift og certifikat.",
    },
  ]
}

export const CITIES: City[] = [
  // ---------------------------------------------------------------------------
  // København
  // ---------------------------------------------------------------------------
  {
    slug: "kobenhavn",
    name: "København",
    inName: "København",
    region: "Region Hovedstaden",
    jobcenter: "Jobcenter København",
    answer:
      "Er du ledig i København, kan du ofte få et AI-kursus betalt gennem din a-kasse eller Jobcenter København som jobrettet opkvalificering. HEKLA's danske AI-forløb lærer dig at bruge AI-værktøjer i praksis — prompt engineering, automatisering og AI på kontoret — så du står stærkere på et hovedstadsarbejdsmarked, hvor digitale kompetencer efterspørges bredt.",
    description:
      "AI-kursus for ledige i København, der ofte kan betales via a-kasse eller Jobcenter København som jobrettet opkvalificering. Lær at bruge AI i praksis — prompt engineering, automatisering og AI-værktøjer på kontoret — på dansk, uden teknisk baggrund, og gør dig mere attraktiv på hovedstadens arbejdsmarked.",
    localContext: [
      "København har Danmarks største og mest sammensatte arbejdsmarked: en stor offentlig sektor, et tæt erhvervsliv inden for service, handel, life science og it, samt hovedparten af landets tech- og startup-miljø. Det betyder, at efterspørgslen efter digitale og AI-nære kompetencer er bred — fra administration og kommunikation til kundeservice og projektledelse — og ikke kun forbeholdt egentlige udviklerstillinger.",
      "For dig, der er ledig i hovedstaden, er konkurrencen om jobbene høj, men det er omsætningen af stillinger også. Arbejdsgivere i København nævner i stigende grad AI-værktøjer i jobopslag inden for kontor, marketing, HR og drift. At kunne dokumentere, at du faktisk kan bruge ChatGPT, Copilot og automatisering i en arbejdsgang — ikke bare have hørt om det — er et konkret signal, der adskiller din ansøgning.",
      "Jobcenter København og a-kasserne i hovedstaden samarbejder om opkvalificering af ledige inden for digitale kompetencer. Et kort, jobrettet AI-forløb passer ind i den ramme: det er praktisk, afgrænset og målrettet hurtigere tilbagevenden til arbejde frem for en lang uddannelse.",
    ],
    startDatePlaceholder: "Løbende optag — start når din bevilling er på plads",
    relatedTerms: ["prompt-engineering", "ai-automatisering", "ai-agent"],
    faqs: [
      {
        q: "Kan jeg få et AI-kursus betalt som ledig i København?",
        a: "Ofte ja. Er du ledig og medlem af en a-kasse — eller tilmeldt hos Jobcenter København — kan AI- og digital opkvalificering godkendes som jobrettet uddannelse. Det er din a-kasse eller sagsbehandler, der bevilger det, så tag det op tidligt og få godkendelsen på skrift.",
      },
      {
        q: "Skal jeg møde fysisk op et sted i København?",
        a: "Nej. HEKLA's forløb følges online med øvelser og fremdrift i platformen, så du kan tage det hjemmefra i København i dit eget tempo. Du skal kun mødes med Jobcenter København eller din a-kasse om selve bevillingen og din jobplan.",
      },
      {
        q: "Hvilke job i København bruger AI-kompetencer?",
        a: "Bredt: kontor og administration, kundeservice, marketing, HR, kommunikation og projektledelse — på tværs af den store offentlige sektor og erhvervslivet i hovedstaden. Du behøver ikke at være udvikler; mange stillinger efterspørger nu praktisk brug af AI-værktøjer i den daglige arbejdsgang.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Aarhus
  // ---------------------------------------------------------------------------
  {
    slug: "aarhus",
    name: "Aarhus",
    inName: "Aarhus",
    region: "Region Midtjylland",
    jobcenter: "Jobcenter Aarhus",
    answer:
      "Er du ledig i Aarhus, kan du ofte få et AI-kursus betalt via din a-kasse eller Jobcenter Aarhus som jobrettet opkvalificering. HEKLA's danske AI-forløb lærer dig at bruge AI-værktøjer i praksis, så du står stærkere på et østjysk arbejdsmarked med stor studenterbestand, et voksende tech-miljø og mange videnstunge arbejdspladser.",
    description:
      "AI-kursus for ledige i Aarhus, der ofte kan betales via a-kasse eller Jobcenter Aarhus som jobrettet opkvalificering. Lær at bruge AI i praksis — prompt engineering, automatisering og AI-værktøjer på kontoret — på dansk, og gør dig mere attraktiv på det østjyske arbejdsmarked.",
    localContext: [
      "Aarhus er Danmarks næststørste by og Jyllands økonomiske og uddannelsesmæssige tyngdepunkt. Med Aarhus Universitet og en stor studenterbestand har byen et ungt, veluddannet arbejdsudbud og et erhvervsliv med mange videnstunge virksomheder inden for it, ingeniørarbejde, energi og handel. Det skaber både muligheder og skarp konkurrence om de kvalificerede stillinger.",
      "For ledige i Aarhus er det ofte de digitale og AI-nære kompetencer, der gør forskellen mellem at blive i bunken og blive kaldt til samtale. Mange østjyske arbejdspladser — fra rådgivning og administration til produktion og logistik — indfører AI-værktøjer i deres arbejdsgange og efterspørger medarbejdere, der kan tage dem i brug uden lang oplæring.",
      "Jobcenter Aarhus har et stærkt fokus på opkvalificering og hurtig tilbagevenden til arbejde. Et kort, jobrettet AI-forløb falder godt ind i den indsats: det er praktisk, dokumenterbart og målrettet de kompetencer, østjyske arbejdsgivere efterspørger lige nu.",
    ],
    startDatePlaceholder: "Løbende optag — start når din bevilling er på plads",
    relatedTerms: ["prompt-engineering", "ai-automatisering", "llm"],
    faqs: [
      {
        q: "Kan jeg få et AI-kursus betalt som ledig i Aarhus?",
        a: "Ofte ja. Er du ledig og medlem af en a-kasse — eller tilmeldt hos Jobcenter Aarhus — kan AI- og digital opkvalificering godkendes som jobrettet uddannelse. Det er din a-kasse eller sagsbehandler, der bevilger det, så tag det op tidligt og få godkendelsen på skrift.",
      },
      {
        q: "Foregår kurset i Aarhus eller online?",
        a: "Online. HEKLA's forløb følges i platformen med øvelser og fremdrift, så du kan tage det hjemmefra i Aarhus i dit eget tempo. Du skal kun mødes med Jobcenter Aarhus eller din a-kasse om selve bevillingen og din jobplan.",
      },
      {
        q: "Hvilke aarhusianske brancher efterspørger AI-kompetencer?",
        a: "It og rådgivning, administration og kontor, handel, energi og produktion — mange østjyske arbejdspladser indfører nu AI-værktøjer. Du behøver ikke at være udvikler; det, der efterspørges, er evnen til at bruge AI praktisk i en daglig arbejdsgang.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Odense
  // ---------------------------------------------------------------------------
  {
    slug: "odense",
    name: "Odense",
    inName: "Odense",
    region: "Region Syddanmark",
    jobcenter: "Jobcenter Odense",
    answer:
      "Er du ledig i Odense, kan du ofte få et AI-kursus betalt gennem din a-kasse eller Jobcenter Odense som jobrettet opkvalificering. HEKLA's danske AI-forløb lærer dig at bruge AI-værktøjer i praksis — relevant på et fynsk arbejdsmarked i forandring, hvor robot-, velfærdsteknologi- og servicebrancher i stigende grad efterspørger digitale kompetencer.",
    description:
      "AI-kursus for ledige i Odense, der ofte kan betales via a-kasse eller Jobcenter Odense som jobrettet opkvalificering. Lær at bruge AI i praksis — prompt engineering, automatisering og AI-værktøjer på kontoret — på dansk, og styrk din profil på det fynske arbejdsmarked.",
    localContext: [
      "Odense har gennemgået en markant erhvervsmæssig forvandling: fra et traditionelt industri- og værftsbysamfund til et center for robotteknologi, automatisering og velfærdsteknologi omkring Syddansk Universitet og robotklyngen. Det har skabt et fynsk arbejdsmarked, hvor teknologi og digitale kompetencer i stigende grad er afgørende — også uden for de rene tech-job.",
      "For ledige i Odense betyder den udvikling, at AI- og automatiseringsforståelse er en konkret fordel. Når byens robot- og teknologivirksomheder vokser, trækker de også efterspørgsel med sig i de omkringliggende service-, administrations- og logistikfunktioner, hvor evnen til at bruge AI-værktøjer effektivt bliver et stadig mere efterspurgt plus.",
      "Jobcenter Odense arbejder målrettet med opkvalificering, der matcher den fynske erhvervsudvikling. Et kort, jobrettet AI-forløb passer ind her: det er praktisk, hurtigt at gennemføre og giver et dokumenterbart kompetenceløft, der peger mod de brancher, Fyn satser på.",
    ],
    startDatePlaceholder: "Løbende optag — start når din bevilling er på plads",
    relatedTerms: ["ai-automatisering", "ai-agent", "prompt-engineering"],
    faqs: [
      {
        q: "Kan jeg få et AI-kursus betalt som ledig i Odense?",
        a: "Ofte ja. Er du ledig og medlem af en a-kasse — eller tilmeldt hos Jobcenter Odense — kan AI- og digital opkvalificering godkendes som jobrettet uddannelse. Det er din a-kasse eller sagsbehandler, der bevilger det, så tag det op tidligt og få godkendelsen på skrift.",
      },
      {
        q: "Skal jeg møde op i Odense for at tage kurset?",
        a: "Nej. HEKLA's forløb følges online med øvelser og fremdrift i platformen, så du kan tage det hjemmefra i Odense i dit eget tempo. Du skal kun mødes med Jobcenter Odense eller din a-kasse om selve bevillingen og din jobplan.",
      },
      {
        q: "Hvorfor er AI-kompetencer relevante på Fyn?",
        a: "Odense er et center for robotteknologi, automatisering og velfærdsteknologi. Når de brancher vokser, stiger efterspørgslen efter digitale kompetencer bredt — også i service-, administrations- og logistikfunktioner omkring dem — hvor praktisk brug af AI-værktøjer er et tydeligt plus.",
      },
    ],
  },
]

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug)
}
