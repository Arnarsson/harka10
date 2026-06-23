// HEKLA's first 3 real courses — structured, server-rendered Danish content.
//
// This is the SEO/GEO source of truth for the PUBLIC discovery layer at
// /kurser/[slug]. It is intentionally a plain data module (no client i18n) so the
// content lands in the SSR HTML where crawlers and AI answer engines can read and
// cite it. The gated, interactive dashboard (/learn/[courseId]) is a separate
// surface; this is the marketing/SEO front door that funnels into it.
//
// Each course: real outlines for every module + a few fully written lesson bodies
// (Danish), so the corpus is genuine content, not lorem ipsum. No fake video.

export type CourseLevel = "begynder" | "let-øvet" | "øvet"

export type CourseLessonBody = {
  // Optional fully written lesson body (Danish). When present, it is rendered on
  // the public course page as real, citable content. Paragraphs.
  heading: string
  paragraphs: string[]
}

export type CourseLesson = {
  title: string
  // One-line outline of what the lesson covers.
  outline: string
  // Lesson type — text/exercise only for now (no fabricated video).
  kind: "tekst" | "øvelse" | "quiz"
  minutes: number
  // A few lessons carry a real written body; most are outlines for now.
  body?: CourseLessonBody
}

export type CourseModule = {
  title: string
  summary: string
  lessons: CourseLesson[]
}

export type CourseFaq = { q: string; a: string }

export type SeoCourse = {
  slug: string // /kurser/{slug}
  // Maps to the gated dashboard course id (best-effort; the dashboard is demo
  // today, so the CTA points at /learn/courses until per-course ids land).
  dashboardCourseId?: string
  title: string
  // <title>-friendly short title.
  shortTitle: string
  // 40-60 word answer block — the citable passage.
  answer: string
  // Longer marketing/SEO description (meta description source + intro).
  description: string
  level: CourseLevel
  // Total duration in minutes (sum of lessons, kept in sync by hand).
  durationMinutes: number
  language: string // "da"
  isFree: boolean
  priceDkk?: number
  objectives: string[]
  audience: string
  requirements: string[]
  tags: string[]
  // Primary target keywords (for our own reference + tag rendering).
  keywords: string[]
  modules: CourseModule[]
  faqs: CourseFaq[]
  // Related glossary term slugs (cross-link into /ordbog).
  relatedTerms: string[]
}

export const COURSES: SeoCourse[] = [
  // ---------------------------------------------------------------------------
  // 1. Lær Cursor
  // ---------------------------------------------------------------------------
  {
    slug: "laer-cursor",
    dashboardCourseId: "cursor",
    title: "Lær Cursor: byg software med AI-kodeassistenten",
    shortTitle: "Lær Cursor",
    answer:
      "Cursor er en kode-editor med en indbygget AI-assistent, der skriver, retter og forklarer kode for dig. På dette danske kursus lærer du at installere Cursor, styre AI'en med præcise prompts og bygge et lille program fra bunden — uden at være erfaren udvikler.",
    description:
      "Et praktisk, dansk Cursor-kursus for begyndere og let øvede. Du lærer at bruge Cursor — AI-kodeassistenten — til at skrive, forstå og rette kode hurtigere. Fra installation og de vigtigste genveje til at bygge et færdigt lille projekt med AI som makker. Ingen dyb programmeringsbaggrund nødvendig.",
    level: "begynder",
    durationMinutes: 210,
    language: "da",
    isFree: false,
    priceDkk: 0,
    objectives: [
      "Installere og konfigurere Cursor på din egen maskine",
      "Bruge Chat, Inline Edit (Cmd/Ctrl+K) og Composer til daglige opgaver",
      "Skrive præcise prompts, der giver kode du kan stole på",
      "Læse og forstå AI-genereret kode, så du ikke kopierer i blinde",
      "Bygge et lille, fungerende projekt fra bunden med Cursor som makker",
    ],
    audience:
      "Nybegyndere og let øvede, der vil bygge software hurtigere med AI — selvlærte, produktfolk, analytikere og udviklere, der vil bruge en AI-kodeassistent professionelt.",
    requirements: [
      "En computer (Windows, macOS eller Linux)",
      "Grundlæggende fortrolighed med at installere programmer",
      "Ingen programmeringserfaring krævet — vi starter forfra",
    ],
    tags: ["Cursor", "AI-kodning", "VS Code", "produktivitet", "begynder"],
    keywords: ["lær cursor", "cursor dansk guide", "cursor ai editor", "ai kodeassistent"],
    relatedTerms: ["ai-agent", "prompt-engineering", "llm"],
    modules: [
      {
        title: "Kom i gang med Cursor",
        summary:
          "Hvad Cursor er, hvorfor det er anderledes end en almindelig editor, og hvordan du kommer i gang på under en time.",
        lessons: [
          {
            title: "Hvad er Cursor — og hvorfor det ændrer måden du koder på",
            outline:
              "Cursor som en AI-first fork af VS Code; forskellen på autocomplete og en rigtig kodeassistent.",
            kind: "tekst",
            minutes: 12,
            body: {
              heading: "Hvad er Cursor?",
              paragraphs: [
                "Cursor er en kode-editor bygget oven på VS Code, men med en kunstig intelligens i centrum. Hvor en almindelig editor venter på, at du skriver hvert tegn, kan Cursor skrive hele funktioner, forklare ukendt kode, finde fejl og lave ændringer på tværs af flere filer — ud fra en instruktion på almindeligt dansk eller engelsk.",
                "Forskellen fra simpel autocomplete er stor. Autocomplete gætter det næste ord; Cursor forstår din hensigt. Du kan markere en kodeblok og skrive „gør denne funktion hurtigere og tilføj fejlhåndtering“, og den foreslår en konkret ændring, du kan godkende eller afvise.",
                "Det gør Cursor til mere end et værktøj for eksperter. Hvis du er nybegynder, fungerer AI'en som en tålmodig makker, der både skriver kode og forklarer hvad den gør. Resten af kurset handler om at styre den makker, så du får kode, du faktisk forstår og kan stole på.",
              ],
            },
          },
          {
            title: "Installation og første opsætning",
            outline:
              "Download, login, valg af AI-model, og import af dine VS Code-indstillinger og extensions.",
            kind: "tekst",
            minutes: 10,
          },
          {
            title: "Rundvisning i grænsefladen",
            outline:
              "Editor, filtræ, terminal og de tre AI-flader: Chat, Inline Edit og Composer.",
            kind: "tekst",
            minutes: 12,
          },
          {
            title: "Øvelse: stil dit første spørgsmål til Cursor",
            outline:
              "Åbn en fil, brug Chat til at få koden forklaret linje for linje.",
            kind: "øvelse",
            minutes: 15,
          },
        ],
      },
      {
        title: "De tre måder at arbejde med AI'en",
        summary:
          "Chat til spørgsmål, Inline Edit til hurtige ændringer, og Composer til større opgaver på tværs af filer.",
        lessons: [
          {
            title: "Chat: spørg, forstå, fejlsøg",
            outline:
              "Brug @-referencer til filer og symboler; få forklaringer og fejlrettelser uden at forlade editoren.",
            kind: "tekst",
            minutes: 14,
          },
          {
            title: "Inline Edit (Cmd/Ctrl+K): ret kode hvor markøren er",
            outline:
              "Den hurtigste loop: markér, beskriv ændringen, godkend diff'en.",
            kind: "tekst",
            minutes: 12,
            body: {
              heading: "Den hurtige redigerings-loop",
              paragraphs: [
                "Inline Edit er Cursors hurtigste arbejdsgang. Du sætter markøren et sted — eller markerer en blok kode — og trykker Cmd+K (Mac) eller Ctrl+K (Windows/Linux). Et lille felt åbner, hvor du beskriver ændringen på dansk: „omdøb variablen til noget mere sigende“ eller „tilføj en kommentar, der forklarer hvad funktionen gør“.",
                "Cursor svarer med en diff — en side-om-side visning af det gamle og det nye. Du ser præcis hvad der ændres, før noget sker. Tryk for at acceptere eller afvise. Denne „beskriv, se diff, godkend“-rytme er kernen i sikker AI-kodning: du giver aldrig kontrollen fra dig.",
                "Tommelfingerregel: brug Inline Edit til afgrænsede ændringer i én fil. Når en opgave spænder over flere filer — fx „tilføj en ny side og link til den fra menuen“ — er det Composer, vi kigger på i næste lektion, der er det rigtige værktøj.",
              ],
            },
          },
          {
            title: "Composer: byg på tværs af flere filer",
            outline:
              "Beskriv en feature; Composer foreslår ændringer i flere filer på én gang.",
            kind: "tekst",
            minutes: 14,
          },
          {
            title: "Øvelse: tilføj en funktion med Inline Edit",
            outline:
              "Tag en eksempel-fil og tilføj inputvalidering med Cmd/Ctrl+K.",
            kind: "øvelse",
            minutes: 18,
          },
        ],
      },
      {
        title: "Gode prompts giver god kode",
        summary:
          "Hvordan du formulerer instruktioner, der giver kode du kan stole på — og hvordan du fanger fejl.",
        lessons: [
          {
            title: "Anatomien i en god kode-prompt",
            outline: "Mål, kontekst, begrænsninger og format — med kode-eksempler.",
            kind: "tekst",
            minutes: 14,
          },
          {
            title: "Læs koden, stol ikke blindt",
            outline:
              "Hvorfor AI hallucinerer i kode, og en simpel rutine til at verificere før du gemmer.",
            kind: "tekst",
            minutes: 12,
          },
          {
            title: "Quiz: genkend en svag prompt",
            outline: "Fem prompts — vælg den, der vil give det bedste resultat.",
            kind: "quiz",
            minutes: 10,
          },
        ],
      },
      {
        title: "Byg dit første projekt",
        summary:
          "Saml det hele: byg en lille, fungerende app fra bunden med Cursor som makker.",
        lessons: [
          {
            title: "Projektoplæg: en simpel opgaveliste-app",
            outline: "Krav, datamodel og hvordan vi beder Cursor om at stilladsere projektet.",
            kind: "tekst",
            minutes: 12,
          },
          {
            title: "Fra tom mappe til kørende app",
            outline: "Composer-drevet opbygning, trin for trin, med løbende test.",
            kind: "øvelse",
            minutes: 25,
          },
          {
            title: "Find og ret en fejl med AI'en",
            outline: "Introducér en bug bevidst, og brug Chat til at finde og rette den.",
            kind: "øvelse",
            minutes: 18,
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Skal jeg kunne programmere for at lære Cursor?",
        a: "Nej. Kurset starter forfra og bruger Cursors AI til at forklare koden undervejs. Du lærer at læse og styre koden, ikke at skrive alt selv fra hukommelsen. Lidt teknisk nysgerrighed er nok.",
      },
      {
        q: "Er Cursor gratis?",
        a: "Cursor har en gratis plan, der rækker til at følge kurset. Der findes betalte planer med flere og hurtigere AI-svar, men du behøver dem ikke for at komme i gang og bygge dit første projekt.",
      },
      {
        q: "Hvad er forskellen på Cursor og ChatGPT til kode?",
        a: "ChatGPT er en chat ved siden af din editor; du kopierer kode frem og tilbage. Cursor har AI'en indbygget i editoren, så den kan se dine filer, lave ændringer direkte og vise dig en diff, du godkender.",
      },
      {
        q: "Virker Cursor på dansk?",
        a: "Ja. Du kan skrive dine instruktioner på dansk, og AI'en svarer og forklarer på dansk. Selve koden og mange biblioteker er på engelsk, men din dialog med assistenten kan foregå på dit eget sprog.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. Prompt engineering på dansk
  // ---------------------------------------------------------------------------
  {
    slug: "prompt-engineering-paa-dansk",
    dashboardCourseId: "prompt-engineering",
    title: "Prompt engineering på dansk: få brugbare svar hver gang",
    shortTitle: "Prompt engineering på dansk",
    answer:
      "Prompt engineering er kunsten at formulere instruktioner til en AI, så du får brugbare svar. På dette danske kursus lærer du en simpel ramme for gode prompts — rolle, kontekst, eksempel og format — og øver den på rigtige kontoropgaver. Ingen kode, ingen teknisk baggrund nødvendig.",
    description:
      "Et hands-on, dansk kursus i prompt engineering for alle, der bruger ChatGPT, Claude eller Gemini i arbejdet. Du lærer en gennemprøvet ramme for at skrive prompts, der giver pålidelige, brugbare svar — og hvordan du undgår de typiske fælder som vage instruktioner og hallucinationer. Bygget på rigtige opgaver fra dansk kontorarbejde.",
    level: "begynder",
    durationMinutes: 180,
    language: "da",
    isFree: true,
    priceDkk: 0,
    objectives: [
      "Skrive prompts med en klar struktur: rolle, kontekst, eksempel, format",
      "Bruge few-shot-eksempler til at vise modellen, hvad „godt“ ser ud",
      "Bede modellen tænke i trin for mere pålidelige svar",
      "Genkende og reducere hallucinationer i praksis",
      "Bygge dine egne genbrugelige prompt-skabeloner til daglige opgaver",
    ],
    audience:
      "Alle, der vil have mere ud af AI-værktøjer i arbejdet — uden teknisk baggrund. Kontorfolk, ledere, marketing, HR, undervisere og selvstændige.",
    requirements: [
      "Adgang til et AI-værktøj (ChatGPT, Claude eller Gemini — gratis version er nok)",
      "Ingen teknisk baggrund eller kode krævet",
    ],
    tags: ["prompt engineering", "ChatGPT", "Claude", "produktivitet", "begynder"],
    keywords: [
      "prompt engineering dansk",
      "gode prompts",
      "chatgpt prompts dansk",
      "ai prompts",
    ],
    relatedTerms: ["prompt-engineering", "llm", "hallucination"],
    modules: [
      {
        title: "Fundamentet: hvordan en AI læser din prompt",
        summary:
          "Hvorfor små ændringer i ordlyden giver store ændringer i svaret — og hvad det betyder for, hvordan du skriver.",
        lessons: [
          {
            title: "Hvad en prompt egentlig er",
            outline:
              "Prompten som instruktion; hvorfor modellen forudsiger ord frem for at slå facit op.",
            kind: "tekst",
            minutes: 10,
            body: {
              heading: "Din prompt er en instruktion, ikke en søgning",
              paragraphs: [
                "En prompt er den instruktion, du giver en AI. Det er fristende at behandle ChatGPT som Google — at smide et par søgeord ind og håbe. Men en sprogmodel slår ikke svar op i en database; den forudsiger den mest sandsynlige tekst som fortsættelse af det, du skrev. Jo tydeligere din instruktion, jo bedre kan den forudsige noget brugbart.",
                "Det er derfor små ændringer giver store udsving. „Skriv en e-mail til en kunde“ giver et fladt, generisk resultat. „Skriv en kort, venlig e-mail til en utilfreds kunde, der har ventet to uger på en leverance — undskyld, giv en konkret ny dato, og tilbyd en rabat“ giver noget, du faktisk kan bruge. Forskellen er ikke magi; det er kontekst.",
                "Resten af modulet handler om at gøre den kontekst systematisk, så du ikke skal gætte dig frem hver gang. Vi bygger en fast ramme, du kan genbruge på enhver opgave.",
              ],
            },
          },
          {
            title: "De fire byggesten: rolle, kontekst, eksempel, format",
            outline:
              "En enkel ramme du kan lægge ned over enhver opgave — med før/efter-eksempler.",
            kind: "tekst",
            minutes: 14,
            body: {
              heading: "Rammen: rolle, kontekst, eksempel, format",
              paragraphs: [
                "Næsten alle gode prompts har fire dele. Rolle: hvem skal AI'en være? („Du er en erfaren dansk tekstforfatter.“) Det sætter tone og fagligt niveau. Kontekst: hvad er situationen og målet? Hvem er modtageren, hvad ved de allerede, hvad skal der ske bagefter?",
                "Eksempel: vis et eksempel på det resultat, du ønsker. Dette ene greb — at vise frem for kun at beskrive — løfter kvaliteten mere end noget andet. Format: hvordan skal svaret se ud? Punktopstilling, en tabel, maks 100 ord, et bestemt tonefald?",
                "Du behøver ikke alle fire hver gang, men når et svar skuffer, er det næsten altid fordi en af dem mangler. Når du øver dig, så stil dig selv spørgsmålet: hvilken af de fire glemte jeg? Det gør fejlretning af prompts hurtig og konkret.",
              ],
            },
          },
          {
            title: "Øvelse: forbedr en svag prompt",
            outline: "Tag tre vage prompts og omskriv dem med rammen.",
            kind: "øvelse",
            minutes: 15,
          },
        ],
      },
      {
        title: "Teknikker, der løfter kvaliteten",
        summary:
          "Few-shot-eksempler, trin-for-trin-tænkning og at bede om kilder — de greb, der gør størst forskel.",
        lessons: [
          {
            title: "Few-shot: vis i stedet for at forklare",
            outline: "Giv modellen 2-3 eksempler på input og ønsket output.",
            kind: "tekst",
            minutes: 12,
          },
          {
            title: "Bed modellen tænke i trin",
            outline: "Hvorfor „tænk det igennem trin for trin“ giver færre fejl på svære opgaver.",
            kind: "tekst",
            minutes: 12,
          },
          {
            title: "Hold modellen ærlig: kilder og forbehold",
            outline: "Bed om kilder, og om at sige „det ved jeg ikke“ frem for at gætte.",
            kind: "tekst",
            minutes: 12,
          },
          {
            title: "Øvelse: byg en few-shot-prompt til klassificering",
            outline: "Sortér kundehenvendelser i kategorier med eksempler.",
            kind: "øvelse",
            minutes: 18,
          },
        ],
      },
      {
        title: "Undgå fælderne",
        summary:
          "Hallucinationer, vage instruktioner og følsomme data — det du skal passe på i praksis.",
        lessons: [
          {
            title: "Hallucinationer: hvorfor de sker og hvad du gør",
            outline: "Genkend selvsikre fejl; verificér alt der påvirker en kunde eller beslutning.",
            kind: "tekst",
            minutes: 12,
          },
          {
            title: "Data og fortrolighed",
            outline: "Hvad du ikke bør indtaste, og hvordan du arbejder sikkert med følsomme oplysninger.",
            kind: "tekst",
            minutes: 10,
          },
          {
            title: "Quiz: spot fejlen",
            outline: "Find problemet i fem prompts — fra datalæk til vag instruktion.",
            kind: "quiz",
            minutes: 10,
          },
        ],
      },
      {
        title: "Dine egne skabeloner",
        summary:
          "Gør det varigt: byg en lille samling genbrugelige prompts til dine faste opgaver.",
        lessons: [
          {
            title: "Skabelon-tankegangen",
            outline: "Fra engangsprompt til genbrugelig skabelon med pladsholdere.",
            kind: "tekst",
            minutes: 10,
          },
          {
            title: "Øvelse: byg tre skabeloner til dit eget arbejde",
            outline: "E-mail, opsummering og idéudvikling — tilpasset din hverdag.",
            kind: "øvelse",
            minutes: 23,
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Skal jeg kunne kode for at lære prompt engineering?",
        a: "Nej. Prompt engineering foregår på dit eget sprog. Hele kurset er uden kode — du lærer at formulere klare instruktioner, give kontekst og vise eksempler, så AI'en giver dig brugbare svar.",
      },
      {
        q: "Virker teknikkerne på både ChatGPT og Claude?",
        a: "Ja. Rammen — rolle, kontekst, eksempel, format — virker på tværs af ChatGPT, Claude, Gemini og lignende værktøjer, fordi de alle er sprogmodeller, der forudsiger tekst ud fra din instruktion.",
      },
      {
        q: "Hvad er den vigtigste enkeltteknik?",
        a: "At vise et eksempel på det, du vil have (few-shot). Et konkret eksempel på „godt“ output løfter kvaliteten mere end nogen anden enkeltteknik, fordi modellen så ikke skal gætte, hvad du mener.",
      },
      {
        q: "Er kurset gratis?",
        a: "Ja, dette kursus er gratis. Du skal bruge adgang til et AI-værktøj som ChatGPT, Claude eller Gemini — gratis-versionen er nok til at følge med og lave øvelserne.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. AI-assistent-operatør
  // ---------------------------------------------------------------------------
  {
    slug: "ai-assistent-operatoer",
    dashboardCourseId: "ai-automation",
    title: "AI-assistent-operatør: automatisér dit kontorarbejde",
    shortTitle: "AI-assistent-operatør",
    answer:
      "AI-automatisering er at lade AI udføre gentagne kontoropgaver for dig — fra at sortere e-mails til at opsummere dokumenter. På dette danske kursus lærer du at kortlægge dine opgaver, bygge dine første automatiseringer i n8n og kombinere dem med AI, så timer bliver til minutter.",
    description:
      "Et praktisk, dansk kursus i AI-automatisering for kontorfolk. Du lærer at finde de opgaver, der er værd at automatisere, bygge arbejdsgange i n8n uden kode, og koble dem sammen med AI, så du fjerner gentaget rutinearbejde. Fra første webhook til en fuld, kørende automatisering — sikkert og med tilsyn.",
    level: "let-øvet",
    durationMinutes: 240,
    language: "da",
    isFree: false,
    priceDkk: 0,
    objectives: [
      "Kortlægge dit arbejde og finde de opgaver, der er værd at automatisere",
      "Bygge dine første arbejdsgange i n8n uden at skrive kode",
      "Koble AI ind i en arbejdsgang (opsummering, klassificering, udkast)",
      "Forbinde de værktøjer du allerede bruger: e-mail, regneark, chat",
      "Køre automatiseringer sikkert med fejlhåndtering og menneskeligt tilsyn",
    ],
    audience:
      "Let øvede, der vil fjerne rutinearbejde: kontorfolk, koordinatorer, selvstændige og små teams uden en udviklingsafdeling.",
    requirements: [
      "Fortrolighed med almindelige kontorværktøjer (e-mail, regneark)",
      "En n8n-konto (gratis sky-prøve eller selv-hostet) — vi hjælper i gang",
      "Ingen kode krævet, men nysgerrighed på logik er en fordel",
    ],
    tags: ["AI-automatisering", "n8n", "workflows", "produktivitet", "let-øvet"],
    keywords: [
      "ai automatisering kursus",
      "n8n dansk",
      "automatisér kontorarbejde",
      "ai workflows",
    ],
    relatedTerms: ["ai-agent", "prompt-engineering", "rag"],
    modules: [
      {
        title: "Find det rigtige at automatisere",
        summary:
          "Ikke alt skal automatiseres. Lær at finde de gentagne, velforståede opgaver, hvor automatisering betaler sig.",
        lessons: [
          {
            title: "Hvad AI-automatisering er — og ikke er",
            outline:
              "Forskellen på en chat-assistent, en copilot og en automatisk arbejdsgang.",
            kind: "tekst",
            minutes: 12,
            body: {
              heading: "Fra assistent til operatør",
              paragraphs: [
                "AI-automatisering er at lade software — gerne med AI indbygget — udføre en opgave for dig, uden at du sidder og klikker hvert trin. Hvor en chat-assistent svarer, når du spørger, kører en automatisering af sig selv: den udløses af en begivenhed (en ny e-mail, en ny række i et regneark) og udfører en kæde af handlinger.",
                "AI'en kommer ind, hvor opgaven kræver sprogforståelse: opsummér denne lange mail, afgør om den er vigtig, skriv et udkast til svar. Resten — at hente mailen, gemme resultatet, sende beskeden — er almindelig automatisering. Styrken ligger i kombinationen.",
                "Som „operatør“ er din rolle ikke at gøre arbejdet, men at designe og overvåge maskinen, der gør det. Det kræver, at du vælger de rigtige opgaver. Det er emnet for næste lektion: hvordan du kortlægger dit arbejde og finder kandidaterne.",
              ],
            },
          },
          {
            title: "Kortlæg dit arbejde",
            outline:
              "En enkel metode til at liste opgaver og score dem på hyppighed, tid og regelmæssighed.",
            kind: "tekst",
            minutes: 12,
          },
          {
            title: "Øvelse: vælg din første automatisering",
            outline: "Anvend scoringen på din egen uge og vælg én god kandidat.",
            kind: "øvelse",
            minutes: 15,
          },
        ],
      },
      {
        title: "Grundlæggende n8n",
        summary:
          "n8n er et visuelt værktøj til at bygge arbejdsgange uden kode. Her lærer du de byggeklodser, alt andet hviler på.",
        lessons: [
          {
            title: "Sådan tænker n8n: triggers og noder",
            outline:
              "Trigger starter arbejdsgangen; noder er trinene; data flyder fra node til node.",
            kind: "tekst",
            minutes: 14,
            body: {
              heading: "Triggers, noder og dataflow",
              paragraphs: [
                "n8n bygger arbejdsgange visuelt: du trækker kasser (noder) ud på et lærred og forbinder dem med streger. Hver arbejdsgang starter med en trigger — den begivenhed, der sætter det hele i gang. Det kan være et fast tidspunkt, en indkommende webhook eller „der er kommet en ny e-mail“.",
                "Efter triggeren følger noderne, ét trin ad gangen. En node kan hente data fra et værktøj, omforme det, sende det videre eller kalde en AI. Data flyder fra venstre mod højre: det en node sender ud, kan den næste bruge — fx „tag emnet fra mailen, triggeren fangede“.",
                "Det er hele modellen. Når du forstår trigger → node → node → resultat, kan du læse enhver arbejdsgang. I øvelsen bygger du din første: en webhook, der modtager data og sender en besked retur.",
              ],
            },
          },
          {
            title: "Forbind dine værktøjer",
            outline: "Credentials og de mest brugte integrationer: e-mail, Google Sheets, Slack.",
            kind: "tekst",
            minutes: 12,
          },
          {
            title: "Øvelse: byg en webhook-til-besked-arbejdsgang",
            outline: "Modtag data via webhook, formatér det, og send en besked.",
            kind: "øvelse",
            minutes: 20,
          },
        ],
      },
      {
        title: "Sæt AI ind i arbejdsgangen",
        summary:
          "Den del, der gør automatiseringen smart: opsummering, klassificering og udkast med en sprogmodel.",
        lessons: [
          {
            title: "AI-noden: send en prompt fra en arbejdsgang",
            outline: "Byg en prompt af data fra tidligere noder og brug svaret videre.",
            kind: "tekst",
            minutes: 14,
          },
          {
            title: "Mønster: klassificér og dirigér",
            outline: "Lad AI afgøre kategori, og send arbejdsgangen ad forskellige veje.",
            kind: "tekst",
            minutes: 14,
          },
          {
            title: "Øvelse: auto-opsummér indkommende mails",
            outline: "Mail ind → AI-opsummering → notat i et regneark.",
            kind: "øvelse",
            minutes: 22,
          },
        ],
      },
      {
        title: "Kør det sikkert i drift",
        summary:
          "En automatisering der fejler i stilhed er værre end ingen. Lær fejlhåndtering, tilsyn og grænser.",
        lessons: [
          {
            title: "Fejlhåndtering og logning",
            outline: "Fang fejl, få besked, og undgå at noget går galt i det skjulte.",
            kind: "tekst",
            minutes: 12,
          },
          {
            title: "Menneske i loopet",
            outline: "Hvornår en handling skal godkendes af et menneske før den udføres.",
            kind: "tekst",
            minutes: 12,
            body: {
              heading: "Behold mennesket på de vigtige beslutninger",
              paragraphs: [
                "En automatisering, der handler helt på egen hånd, er stærk — og risikabel. Jo mere konsekvensfuld en handling er (sende et svar til en kunde, flytte penge, slette data), jo vigtigere er det, at et menneske godkender den, før den udføres.",
                "I praksis bygger du et godkendelsestrin ind: arbejdsgangen forbereder alt — fx skriver udkastet til kundesvaret — men stopper og venter på et klik fra dig, før det sendes. Du beholder farten ved det rutineprægede og kontrollen ved det vigtige.",
                "En god tommelfingerregel: start altid med mennesket i loopet. Når du har set arbejdsgangen ramme rigtigt mange gange i træk, kan du gradvist give den mere selvstændighed på de lavrisiko-dele. Tillid til en automatisering bygges, den antages ikke.",
              ],
            },
          },
          {
            title: "Quiz: hvad gik galt?",
            outline: "Diagnosticér fem fejlende arbejdsgange og find årsagen.",
            kind: "quiz",
            minutes: 10,
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Skal jeg kunne kode for at automatisere med n8n?",
        a: "Nej. n8n er et visuelt værktøj, hvor du bygger arbejdsgange ved at forbinde kasser. Kurset er uden kode. Lidt sans for logik — „hvis dette, så det“ — er en fordel, men ikke et krav.",
      },
      {
        q: "Hvad er n8n, og hvorfor det frem for andre værktøjer?",
        a: "n8n er en open source-platform til at bygge automatiserede arbejdsgange visuelt. Vi bruger den, fordi den kan selv-hostes (godt for datafortrolighed), har en gratis mulighed og kobler nemt AI ind i arbejdsgange.",
      },
      {
        q: "Hvilke opgaver giver det mening at automatisere?",
        a: "Gentagne, velforståede opgaver med klare regler: sortere og opsummere mails, flytte data mellem systemer, lave faste rapporter. Engangsopgaver og opgaver, der kræver skøn, hører ikke til — det lærer du at skelne i modul 1.",
      },
      {
        q: "Er det sikkert at lade AI håndtere mit arbejde?",
        a: "Ja, med de rette rammer. Kurset lægger vægt på fejlhåndtering og „menneske i loopet“, så vigtige handlinger godkendes af dig, før de udføres. Du bygger tillid gradvist frem for at give kontrollen fra dig på én gang.",
      },
    ],
  },
]

export function getCourse(slug: string): SeoCourse | undefined {
  return COURSES.find((c) => c.slug === slug)
}

// Total lessons across a course — used for the "X lektioner" badge.
export function lessonCount(course: SeoCourse): number {
  return course.modules.reduce((n, m) => n + m.lessons.length, 0)
}

// Human-friendly duration, e.g. "3t 30m" / "45m".
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}t`
  return `${h}t ${m}m`
}

const LEVEL_LABEL: Record<CourseLevel, string> = {
  begynder: "Begynder",
  "let-øvet": "Let øvet",
  øvet: "Øvet",
}

export function levelLabel(level: CourseLevel): string {
  return LEVEL_LABEL[level]
}
