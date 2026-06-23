// Danish AI glossary — the definitional layer AI Overviews quote. Each entry is
// SERVER-RENDERED into the page HTML (no client i18n) so crawlers and AI engines can
// read and cite it. `short` is the 40-60 word direct answer; `body` is the depth.
export type GlossaryFaq = { q: string; a: string }
export type GlossaryTerm = {
  slug: string // used in /ordbog/hvad-er-{slug}
  term: string
  aka?: string
  short: string // 40-60 word direct answer (the citable passage)
  body: string[] // paragraphs (Danish)
  related: string[] // other slugs
  faqs: GlossaryFaq[]
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: "ai-agent",
    term: "AI-agent",
    aka: "autonom AI",
    short:
      "En AI-agent er et AI-system, der selv kan tage flere skridt mod et mål: den læser data, bruger værktøjer og handler uden at spørge ved hvert trin. Hvor en chatbot svarer på ét spørgsmål, kan en agent udføre en hel opgave fra start til slut.",
    body: [
      "En AI-agent kombinerer en sprogmodel (LLM) med adgang til værktøjer — fx søgning, filer, e-mail eller et API — og en evne til at planlægge. Du giver den et mål, og den nedbryder selv målet i delopgaver og udfører dem.",
      "Forskellen fra en almindelig chatbot er handling. Chatbotten svarer; agenten gør. Det gør agenter stærke til gentagne arbejdsgange, men det kræver klare rammer: en agent, der handler uden tilsyn, skal have grænser, så den ikke gør noget forkert eller dyrt.",
      "I praksis starter de fleste virksomheder med en chat-assistent til egne opgaver, går videre til copilots i de værktøjer de allerede bruger, og bygger først agenter, når de har fundet en gentagen, velforstået proces, der er værd at automatisere.",
    ],
    related: ["prompt-engineering", "llm", "generativ-ai"],
    faqs: [
      {
        q: "Hvad er forskellen på en AI-agent og en chatbot?",
        a: "En chatbot svarer på det, du skriver. En AI-agent kan tage flere skridt selv — bruge værktøjer, læse data og udføre en hel opgave — uden at spørge ved hvert trin.",
      },
      {
        q: "Er AI-agenter sikre at bruge i en virksomhed?",
        a: "Ja, hvis de har klare grænser. Giv agenten et afgrænset mål, begrænset adgang og menneskeligt tilsyn på vigtige handlinger, indtil du stoler på den.",
      },
    ],
  },
  {
    slug: "prompt-engineering",
    term: "Prompt engineering",
    aka: "promptdesign",
    short:
      "Prompt engineering er kunsten at formulere instruktioner til en AI, så du får brugbare svar. Det handler om at give kontekst, eksempler og et klart mål — ikke om kode. Det er den vigtigste enkeltfærdighed, når du vil have reel værdi ud af værktøjer som ChatGPT og Claude.",
    body: [
      "En prompt er den instruktion, du giver en AI. Små ændringer i instruktionen giver store ændringer i svaret. Gode prompts beskriver rollen („du er en erfaren tekstforfatter“), giver kontekst, viser et eksempel på det ønskede resultat og beder om et bestemt format.",
      "Du behøver ingen teknisk baggrund. Den mest effektive teknik er at vise modellen et eksempel på, hvad „godt“ ser ud, og at bede den arbejde i trin frem for at svare med det samme.",
      "Prompt engineering er fundamentet under alt andet AI-arbejde: bedre prompts giver bedre output fra assistenter, copilots og agenter.",
    ],
    related: ["ai-agent", "llm", "hallucination"],
    faqs: [
      {
        q: "Skal jeg kunne kode for at lave gode prompts?",
        a: "Nej. Prompt engineering foregår på dit eget sprog. Den vigtigste teknik er at give kontekst og et eksempel på det resultat, du ønsker.",
      },
    ],
  },
  {
    slug: "llm",
    term: "LLM (stor sprogmodel)",
    aka: "large language model",
    short:
      "En LLM (large language model / stor sprogmodel) er en AI, der er trænet på enorme mængder tekst og lærer at forudsige det næste ord. Det enkle princip giver, i stor skala, en model der kan skrive, opsummere, oversætte og besvare spørgsmål. ChatGPT, Claude og Gemini er LLM'er.",
    body: [
      "En LLM er ikke en database af fakta. Den forudsiger det mest sandsynlige næste ord ud fra mønstre i den tekst, den er trænet på. Derfor kan den både skrive flydende og tage fejl med stor selvsikkerhed (se hallucination).",
      "En LLM ved som udgangspunkt intet om din virksomhed eller om begivenheder efter dens træning, medmindre du selv giver den den kontekst i din prompt eller via et opslag (se RAG).",
      "Værdien er tid: opgaver der tog en time, kan tage fem minutter. Færdigheden er at bruge modellen til reelle, gentagne tidsbesparelser — sikkert.",
    ],
    related: ["prompt-engineering", "rag", "hallucination"],
    faqs: [
      {
        q: "Kan en LLM huske mit firmas data?",
        a: "Ikke af sig selv. Den kender kun det, den blev trænet på, plus det du giver den i prompten. Vil du have den til at bruge dine egne data, bruger man typisk RAG.",
      },
    ],
  },
  {
    slug: "rag",
    term: "RAG (retrieval-augmented generation)",
    short:
      "RAG er en metode, hvor en sprogmodel slår relevante dokumenter op, før den svarer, og bruger dem som kilde. Det gør svarene mere præcise og forankret i dine egne data — fx jeres egne politikker eller produktark — i stedet for kun modellens hukommelse.",
    body: [
      "RAG (retrieval-augmented generation) løser et kerneproblem ved LLM'er: de kender ikke dine data og kan finde på. Med RAG søger systemet først i en samling dokumenter, finder de mest relevante, og giver dem til modellen som kontekst, før den genererer svaret.",
      "Resultatet er svar, der er forankret i dine kilder og kan henvise til dem. Det er fundamentet under de fleste „chat med dine dokumenter“-løsninger i virksomheder.",
    ],
    related: ["llm", "hallucination", "ai-agent"],
    faqs: [
      {
        q: "Hvorfor bruge RAG i stedet for at finjustere modellen?",
        a: "RAG er hurtigere og billigere at holde opdateret: du opdaterer bare dokumenterne. Finjustering ændrer selve modellen og bruges, når du vil ændre dens stil eller adfærd, ikke dens viden.",
      },
    ],
  },
  {
    slug: "ai-act",
    term: "AI-forordningen (EU AI Act)",
    aka: "EU AI Act",
    short:
      "AI-forordningen (EU AI Act) er EU's lov, der regulerer brugen af kunstig intelligens. Den inddeler AI-systemer efter risiko og stiller krav til de mest risikofyldte. Virksomheder skal kende loven for at bruge AI lovligt og ansvarligt — særligt ved fx ansættelse og kreditvurdering.",
    body: [
      "AI-forordningen er verdens første brede AI-lovgivning. Den kategoriserer systemer fra minimal til uacceptabel risiko og lægger flest krav på „højrisiko“-anvendelser som rekruttering, kreditvurdering og kritisk infrastruktur.",
      "For de fleste danske virksomheder betyder det: kortlæg hvor I bruger AI, vurder risikoen, og dokumentér. At forstå reglerne tidligt er billigere end at rette op bagefter.",
    ],
    related: ["ai-agent", "generativ-ai"],
    faqs: [
      {
        q: "Gælder AI-forordningen for min virksomhed?",
        a: "Hvis I udvikler eller bruger AI i EU, ja. Kravene afhænger af risikoen ved jeres anvendelse. De fleste almindelige kontoropgaver er lavrisiko, men fx AI i ansættelse er højrisiko.",
      },
    ],
  },
  {
    slug: "maskinlaering",
    term: "Maskinlæring",
    aka: "machine learning",
    short:
      "Maskinlæring er en gren af AI, hvor systemer lærer mønstre fra data i stedet for at følge håndskrevne regler. Du giver maskinen eksempler, og den finder selv reglerne. Spamfiltre, anbefalinger og svindeldetektion bygger på maskinlæring.",
    body: [
      "Hvor klassisk software følger regler, en udvikler har skrevet, lærer maskinlæring reglerne fra data. Ved overvåget læring giver du eksempler med facit („denne mail er spam“); ved ikke-overvåget læring finder maskinen selv struktur i data.",
      "LLM'er er en form for maskinlæring trænet på tekst. At kende grundbegreberne hjælper dig med at stille de rigtige spørgsmål til en AI-leverandør: „overvåget på hvilke labels?“.",
    ],
    related: ["llm", "neuralt-netvaerk", "generativ-ai"],
    faqs: [
      {
        q: "Er maskinlæring og AI det samme?",
        a: "Maskinlæring er en del af AI. AI er det brede felt; maskinlæring er den dominerende metode bag moderne AI, hvor systemer lærer fra data.",
      },
    ],
  },
  {
    slug: "generativ-ai",
    term: "Generativ AI",
    short:
      "Generativ AI er AI, der skaber nyt indhold — tekst, billeder, lyd eller kode — frem for kun at analysere eksisterende data. ChatGPT skriver tekst, Midjourney laver billeder. Det er den type AI, der har gjort værktøjerne brugbare for alle, uden teknisk baggrund.",
    body: [
      "Generativ AI genererer indhold ud fra et input. Tekstmodeller (LLM'er) skriver og opsummerer; billedmodeller laver illustrationer; kodemodeller skriver og forklarer kode.",
      "Det er skiftet fra AI som noget eksperter brugte, til et værktøj enhver medarbejder kan bruge — fordi grænsefladen er dit eget sprog.",
    ],
    related: ["llm", "prompt-engineering", "maskinlaering"],
    faqs: [
      {
        q: "Hvad kan generativ AI bruges til på arbejdet?",
        a: "Udkast til tekster, opsummering af lange dokumenter, idéudvikling, oversættelse og kode. Start med dine egne gentagne opgaver, hvor du selv kan tjekke resultatet.",
      },
    ],
  },
  {
    slug: "hallucination",
    term: "Hallucination",
    aka: "AI-hallucination",
    short:
      "En hallucination er, når en AI svarer forkert, men med stor selvsikkerhed — den finder på fakta, kilder eller tal, der lyder rigtige. Det sker, fordi en sprogmodel forudsiger sandsynlige ord, ikke slår sandheden op. Derfor skal vigtige AI-svar altid verificeres.",
    body: [
      "Hallucinationer er ikke fejl i klassisk forstand; de er en konsekvens af hvordan modellen virker. Den forudsiger den mest sandsynlige tekst, og nogle gange er den mest sandsynlige tekst forkert.",
      "Modgiften er enkel: bed om kilder, giv modellen de rigtige data (se RAG), og verificér alt der påvirker en kunde, en beslutning eller penge.",
    ],
    related: ["llm", "rag", "prompt-engineering"],
    faqs: [
      {
        q: "Hvordan undgår jeg AI-hallucinationer?",
        a: "Giv modellen de rigtige kilder i prompten, bed den citere dem, og kontrollér vigtige svar. Brug RAG, når svaret skal være forankret i dine egne data.",
      },
    ],
  },
  {
    slug: "finjustering",
    term: "Finjustering",
    aka: "fine-tuning",
    short:
      "Finjustering er at træne en eksisterende AI-model videre på dine egne eksempler, så den ændrer stil eller adfærd. Det bruges til at få en model til at svare i et bestemt tonefald eller format — ikke til at give den ny viden, hvor RAG som regel er bedre.",
    body: [
      "Ved finjustering tager du en færdig model og træner den videre på dine egne par af input og ønsket output. Resultatet er en model, der konsekvent rammer en bestemt stil eller struktur.",
      "Til viden er finjustering sjældent det rigtige valg — den er dyr at holde opdateret. Skal modellen kende dine aktuelle data, er RAG hurtigere og billigere.",
    ],
    related: ["llm", "rag"],
    faqs: [
      {
        q: "Finjustering eller RAG?",
        a: "Finjustering ændrer modellens stil og adfærd. RAG giver den adgang til din viden. Vil du have aktuelle, opdaterbare data ind, vælg RAG.",
      },
    ],
  },
  {
    slug: "cursor",
    term: "Cursor",
    aka: "AI-kodeassistent",
    short:
      "Cursor er en kode-editor med en indbygget AI-assistent, der kan skrive, rette og forklare kode for dig. Den er bygget oven på VS Code, men sætter AI'en i centrum: du beskriver, hvad du vil have, på almindeligt sprog, og Cursor foreslår ændringer, du kan godkende.",
    body: [
      "Cursor adskiller sig fra en almindelig editor ved at forstå din hensigt. Du kan markere kode og skrive „gør dette hurtigere og tilføj fejlhåndtering“, hvorefter Cursor viser en diff — en før/efter-visning — du godkender eller afviser. AI'en kan se dine filer og arbejde på tværs af dem.",
      "Det gør Cursor brugbart også for nybegyndere: AI'en fungerer som en makker, der både skriver kode og forklarer, hvad den gør. Den vigtigste færdighed er ikke at huske syntaks, men at give præcise instruktioner og læse den kode, du får — så du ikke kopierer i blinde.",
    ],
    related: ["ai-agent", "prompt-engineering", "llm"],
    faqs: [
      {
        q: "Hvad er forskellen på Cursor og ChatGPT til kode?",
        a: "ChatGPT er en chat ved siden af din editor, hvor du kopierer kode frem og tilbage. Cursor har AI'en indbygget i editoren, så den ser dine filer, laver ændringer direkte og viser en diff, du godkender.",
      },
      {
        q: "Skal jeg være udvikler for at bruge Cursor?",
        a: "Nej. Cursors AI kan forklare koden undervejs, så også nybegyndere kan komme i gang. Du lærer at styre og læse koden frem for at skrive alt selv fra hukommelsen.",
      },
    ],
  },
  {
    slug: "ai-automatisering",
    term: "AI-automatisering",
    aka: "AI-workflows",
    short:
      "AI-automatisering er at lade software med indbygget AI udføre gentagne opgaver for dig — fx sortere e-mails, opsummere dokumenter eller flytte data mellem systemer. En begivenhed udløser en kæde af handlinger, og AI'en klarer de trin, der kræver sprogforståelse. Timer bliver til minutter.",
    body: [
      "Hvor en chat-assistent svarer, når du spørger, kører en automatisering af sig selv. Den udløses af noget — en ny mail, en ny række i et regneark — og udfører en fast kæde af handlinger. AI'en kommer ind, hvor opgaven kræver sprog: opsummér, klassificér, skriv et udkast.",
      "Værktøjer som n8n lader dig bygge disse arbejdsgange visuelt, uden kode. Styrken ligger i kombinationen af almindelig automatisering (hente, gemme, sende) og AI (forstå og formulere). Det vigtige er at vælge de rigtige opgaver — gentagne og velforståede — og beholde et menneske i loopet på de vigtige beslutninger.",
    ],
    related: ["ai-agent", "prompt-engineering", "rag"],
    faqs: [
      {
        q: "Skal jeg kunne kode for at lave AI-automatisering?",
        a: "Nej. Værktøjer som n8n er visuelle: du bygger arbejdsgange ved at forbinde kasser. Lidt sans for logik hjælper, men du behøver ikke at skrive kode for at komme i gang.",
      },
      {
        q: "Hvilke opgaver er værd at automatisere?",
        a: "Gentagne, velforståede opgaver med klare regler — sortere mails, lave faste rapporter, flytte data. Engangsopgaver og opgaver, der kræver skøn, egner sig dårligt.",
      },
    ],
  },
  {
    slug: "token",
    term: "Token",
    short:
      "Et token er en tekstbid — typisk et ord eller en orddel — som en sprogmodel læser og skriver i. AI-værktøjer måler og prissætter arbejde i tokens. At forstå tokens hjælper dig med at styre både længden på svar og omkostningen ved at bruge AI i stor skala.",
    body: [
      "Sprogmodeller arbejder ikke i bogstaver eller hele ord, men i tokens. En tommelfingerregel: ét token er cirka 4 tegn, og 100 tokens er cirka 75 ord på engelsk.",
      "Både det du sender ind (kontekst) og det modellen skriver ud, koster tokens. Det er derfor lange prompts og lange svar bliver dyrere — relevant når en arbejdsgang køres tusindvis af gange.",
    ],
    related: ["llm", "prompt-engineering"],
    faqs: [
      {
        q: "Hvorfor koster nogle AI-opgaver mere end andre?",
        a: "Fordi de bruger flere tokens. Lange dokumenter ind og lange svar ud koster mere. Korte, præcise prompts er både billigere og ofte bedre.",
      },
    ],
  },
]

export function getTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug)
}
