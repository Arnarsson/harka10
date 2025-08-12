export type Language = 'da' | 'en';

export interface Translations {
  // Navigation
  method: string;
  results: string;
  team: string;
  blog: string;
  contact: string;
  switchTheme: string;
  switchLanguage: string;
  bookMeeting: string;
  
  // Hero section
  heroHeadline: string;
  heroSubheadline: string;
  heroCta: string;
  
  // Stats
  statDays: string;
  statMonths: string;
  statAdmin: string;
  statRoi: string;
  
  // Value props
  valueTitle: string;
  valueSubtitle: string;
  accelerated: string;
  acceleratedDesc: string;
  competency: string;
  competencyDesc: string;
  immediate: string;
  immediateDesc: string;
  tailored: string;
  tailoredDesc: string;
  practical: string;
  practicalDesc: string;
  market: string;
  marketDesc: string;
  marketSource: string;
  
  // Two-day process
  processTitle: string;
  day1Title: string;
  day1Items: string[];
  day2Title: string;
  day2Items: string[];
  contactToday: string;
  noObligations: string;
  
  // AI-Kompas
  aiKompas: string;
  aiKompasTagline: string;
  aiKompasDescription: string;
  aiKompasStartAssessment: string;
  
  // AI-Kompas Value Props
  aiKompasIdentifyPotential: string;
  aiKompasIdentifyPotentialDesc: string;
  aiKompasExpectedRoi: string;
  aiKompasExpectedRoiDesc: string;
  aiKompasQuickWins: string;
  aiKompasQuickWinsDesc: string;
  
  // AI-Kompas Assessment
  aiKompasAssessment: string;
  aiKompasAssessmentSubtitle: string;
  aiKompasReadinessAssessment: string;
  aiKompasGetConcreteInsights: string;
  aiKompasStartReadinessAssessment: string;
  aiKompasOutputsTitle: string;
  aiKompasPerfectIfTitle: string;
  aiKompasReadyToMap: string;
  aiKompasReadyToMapDesc: string;
  
  // Assessment Questions
  assessmentCompanySize: string;
  assessmentCompanySizeDesc: string;
  assessmentIndustry: string;
  assessmentIndustryDesc: string;
  assessmentAiExperience: string;
  assessmentAiExperienceDesc: string;
  assessmentMainChallenges: string;
  assessmentMainChallengesDesc: string;
  assessmentTimeConsumingTasks: string;
  assessmentTimeConsumingTasksDesc: string;
  assessmentBudgetRange: string;
  assessmentBudgetRangeDesc: string;
  assessmentImplementationTimeline: string;
  assessmentImplementationTimelineDesc: string;
  assessmentContactInfo: string;
  assessmentContactInfoDesc: string;
  
  // Assessment Results
  aiKompasReport: string;
  aiKompasReportDesc: string;
  executiveSummary: string;
  topOpportunitiesIdentified: string;
  expectedEfficiencyIncrease: string;
  onPriorityProjects: string;
  ourRecommendation: string;
  processHeatMap: string;
  processHeatMapDesc: string;
  topOpportunities: string;
  implementationRoadmap: string;
  recommendedImplementationRoadmap: string;
  structuredApproachToTransformation: string;
  
  // Process Areas
  currentEfficiency: string;
  quickWins: string;
  
  // CTA Sections
  getPersonalReport: string;
  getPersonalReportDesc: string;
  downloadFullReport: string;
  bookStrategyMeeting: string;
  bookStrategyMeetingDesc: string;
  bookFreeConsultation: string;
  nextStepChooseJourney: string;
  
  // Service Packages
  aiTransformation: string;
  aiTransformationDesc: string;
  aiCompetenceLift: string;
  aiCompetenceLiftDesc: string;
  aiAccelerator: string;
  aiAcceleratorDesc: string;
  readMore: string;
  recommended: string;
  
  // Results section
  resultsTitle: string;
  resultsSubtitle: string;
  
  // Case study section
  caseStudyTitle: string;
  caseStudySubtitle: string;
  caseStudyDescription: string;
  challengeTitle: string;
  challengeDesc: string;
  challengeItems: string[];
  workshopTitle: string;
  workshopDesc: string;
  workshopItems: string[];
  spotlightTitle: string;
  spotlightDesc: string;
  spotlightItems: string[];
  spotlightResult: string;
  valueTitle: string;
  valueItems: string[];
  customerExperienceTitle: string;
  customerQuote: string;
  customerRole: string;
  nextStepsTitle: string;
  nextStepsDesc: string;
  
  // Team section
  teamTitle: string;
  teamSubtitle: string;
  
  // Blog section
  blogTitle: string;
  blogSubtitle: string;
  
  // Footer CTA
  footerTitle: string;
  footerSubtitle: string;
  
  // Footer
  footerDescription: string;
  navigation: string;
  legal: string;
  privacyPolicy: string;
  cookiePolicy: string;
  terms: string;
  allRights: string;
  
  // Stats cards
  fasterRiskAssessment: string;
  reductionInCapital: string;
  speedIncrease: string;
  fromManualToAI: string;
  fromOverstocked: string;
  fromHoursToMinutes: string;
  
  // Testimonials
  testimonialTitle: string;
  testimonialSubtitle: string;
  fasterAssessments: string;
  testimonialQuote1: string;
  testimonialRole1: string;
  testimonialQuote2: string;
  testimonialRole2: string;
  testimonialQuote3: string;
  testimonialRole3: string;
  roiFirstWeek: string;
  teamProductivity: string;
  
  // FAQ
  faqTitle: string;
  faqSubtitle: string;
  faqQ1: string;
  faqA1: string;
  faqQ2: string;
  faqA2: string;
  faqQ3: string;
  faqA3: string;
  faqQ4: string;
  faqA4: string;
  faqQ5: string;
  faqA5: string;
  faqQ6: string;
  faqA6: string;
  stillQuestions: string;
  
  // CTA
  bookDiscoveryCall: string;
  freeConsultation: string;
  trustedByNordic: string;
  satisfactionRate: string;
  companiesTrained: string;
  companiesGrown: string;
  participantsTrained: string;
  viewAllArticles: string;
  joinCompanies: string;
  hours: string;
  value: string;
  potential: string;
  isoCertified: string;
}

export const translations: Record<Language, Translations> = {
  da: {
    // Navigation
    method: "Metode",
    results: "Resultater", 
    team: "Team",
    blog: "Blog",
    contact: "Kontakt",
    switchTheme: "Skift tema",
    switchLanguage: "Switch language",
    bookMeeting: "Book møde",
    
    // Hero section
    heroHeadline: "Fra idé til implementering på kun 48 timer.",
    heroSubheadline: "Vi omdanner AI-potentiale til praktiske løsninger, der leverer målbare resultater – uden lange projektforløb eller PowerPoints.",
    heroCta: "Fra strategi til handling på 2 dage - kontakt os i dag",
    
    // Stats
    statDays: "Dage fra start til værdi",
    statMonths: "Måneder kortere time-to-value", 
    statAdmin: "Mindre admin-tid efter implementering",
    statRoi: "Gennemsnitlig ROI inden for første kvartal",
    
    // Value props
    valueTitle: "AI-implementering: Fra måneder til timer",
    valueSubtitle: "De fleste virksomheder kæmper med at omdanne AI-løfter til forretningsværdi. Vi gør det anderledes.",
    
    accelerated: "Accelereret implementering",
    acceleratedDesc: "Traditionelle AI-implementeringer tager måneder eller år. HARKA leverer brugbare løsninger på kun 48 timer.",
    
    competency: "Kompetenceoverførsel fra dag ét", 
    competencyDesc: "I stedet for at skabe løbende konsulentforhold overfører vi færdigheder til dit team fra dag ét.",
    
    immediate: "Øjeblikkelig værdiskabelse",
    immediateDesc: "Vores kunder har typisk tjent workshop-omkostningerne hjem, før de to dage er ovre. Værdiskabelse starter med det samme.",
    
    tailored: "Skræddersyet til dine behov",
    tailoredDesc: "Vi implementerer ikke standardløsninger, men skaber teknologi, der passer præcist til dine processer og krav.",
    
    practical: "AI gjort praktisk og forståelig",
    practicalDesc: "Vi fjerner mystikken omkring AI og omdanner teknologien til et konkret værktøj, som dine medarbejdere kan bruge i det daglige arbejde.",
    
    market: "Markedsvalideret tidsramme",
    marketDesc: "AI-projekter kan strække sig op til 9-12 måneder, før du begynder at realisere konkret værdi, mens moderne gen-AI-piloter kan være produktionsklar på blot få måneder.",
    marketSource: "McKinsey",
    
    // Two-day process
    processTitle: "Resultatet: Fra strategi til handling på 48 timer",
    
    day1Title: "Dag 1: Muligheder & Prototyper",
    day1Items: [
      "Identifikation af processer med AI-potentiale",
      "Hands-on træning i relevante værktøjer", 
      "Udvikling af prototypeløsninger",
      "Opbygning af AI-kompetencer i dit team"
    ],
    
    day2Title: "Dag 2: Implementering & Overdragelse",
    day2Items: [
      "Færdiggørelse og integration af løsninger",
      "Tilpasning til jeres workflows",
      "Kompetenceoverførsel og dokumentation", 
      "Handlingsplan for de næste 90 dage"
    ],
    
    contactToday: "Kontakt os i dag",
    noObligations: "Ingen forpligtelser, bare en samtale",
    
    // Results section
    resultsTitle: "Resultater, der taler for sig selv",
    resultsSubtitle: "På kun 48 timer har vores kunder opnået betydelige forretningsgennembrud.",
    
    // Case study section
    caseStudyTitle: "Kundecase • Marine- og industrivirksomhed opnår store tidsbesparelser på kritiske analyser",
    caseStudySubtitle: "Om kunden",
    caseStudyDescription: "En ledende aktør inden for marine services og kraftløsninger med speciale i vedligeholdelse af skibsmotorer, kraftværker og industrielle anlæg.",
    challengeTitle: "Udfordringen",
    challengeDesc: "Før samarbejdet med HARKA havde kunden en række ressourcekrævende processer:",
    challengeItems: [
      "Servicerapporter krævede mange timers manuel indtastning per rapport.",
      "Risikoanalyser af turbosystemer tog dage at udarbejde.",
      "Kapital var bundet i ældre reservedele uden overblik over lagerstatus.",
      "Dokumentationen var uensartet på tværs af tekniske teams."
    ],
    workshopTitle: "Workshop-resultater",
    workshopDesc: "I løbet af to dages workshop byggede medarbejderne selv følgende AI-løsninger:",
    workshopItems: [
      "Service-rapport-bot: Den manuelle indtastning blev automatiseret, så rapporter, der tidligere tog flere timer at udfylde, nu kan gennemføres på få minutter med en markant tidsbesparelse.",
      "Turbo-risikoanalyse: Specialistanalyser, der før tog timer, kan nu udføres på under et kvarter.",
      "Lager-intelligens: Analyse af reservedelslageret frigjorde en væsentlig del af kapitalen, der tidligere var bundet i forældet inventar."
    ],
    spotlightTitle: "Spotlight: Fra specialistviden til AI-værktøj",
    spotlightDesc: "Workshoppens højdepunkt var en risikoanalyse-løsning for turbosystemer. Ved kun at bruge:",
    spotlightItems: [
      "Billeder af relevante komponenter",
      "Korte videooptagelser af systemet i drift",
      "En standard servicehåndbog"
    ],
    spotlightResult: "… kunne AI'en på under 10 minutter generere en detaljeret teknisk vurdering, der identificerede potentielle svagheder, prioriterede problemer efter alvor og gav konkrete handlingsanbefalinger. En opgave, der tidligere krævede timers ekspertanalyse, er nu en proces, enhver tekniker kan gennemføre. Dette viser, hvordan specialiseret viden kan demokratiseres og skaleres gennem AI – selv i højtekniske domæner.",
    valueTitle: "Værdi udover workshoppen",
    valueItems: [
      "AI-governance på plads: Medarbejderne implementerede en skræddersyet etisk kontrolramme, som nu fungerer som standard for alle nye teknologiprojekter.",
      "Kompetenceløft: Hele teamet mestrer nu både ChatGPT og Microsoft Copilot i deres daglige arbejde.",
      "Kontinuerlig læring: Adgang til HARKAs videobibliotek og et helt års sparring sikrer, at kompetencerne fortsat udvikles.",
      "Selvkørende AI-kultur: Virksomheden har etableret månedlige \"AI-dage\", hvor nye use cases identificeres og prototyper bygges."
    ],
    customerExperienceTitle: "Kundeoplevelsen",
    customerQuote: "Det mest overraskende var ikke bare, at vi fik konkrete løsninger på to dage – men at løsningerne faktisk fungerer i vores hverdag og allerede har sparet os for hundredvis af arbejdstimer. HARKA leverede ikke konsulentrapporter, men ægte værktøjer vi bruger hver dag.",
    customerRole: "Afdelingsleder",
    nextStepsTitle: "Næste skridt",
    nextStepsDesc: "Virksomheden arbejder nu på permanente versioner af prototypeløsningerne med fortsat sparring fra HARKA.",
    
    // Team section
    teamTitle: "Teamet bag HARKA",
    teamSubtitle: "Mød de to eksperter, der på kun 48 timer omdanner din virksomheds AI-potentiale til praktiske løsninger og konkrete resultater.",
    
    // Blog section
    blogTitle: "Seneste Indsigter",
    blogSubtitle: "Udforsk vores seneste tanker og indsigter om AI-implementering, forretningstransformation og opnåelse af praktiske resultater.",
    
    // Footer CTA
    footerTitle: "Start din AI-rejse",
    footerSubtitle: "Få en uforpligtende samtale om, hvordan vi kan hjælpe din virksomhed med at udnytte AI's potentiale.",
    
    // Footer
    footerDescription: "Vi hjælper virksomheder med at strømline workflows, reducere spildtid og styrke beslutningstagning – på kun 2 dage.",
    navigation: "Navigation",
    legal: "Juridisk",
    privacyPolicy: "Privatlivspolitik",
    cookiePolicy: "Cookie-politik", 
    terms: "Vilkår og betingelser",
    allRights: "Alle rettigheder forbeholdes",
    
    // Stats cards
    fasterRiskAssessment: "hurtigere risikovurdering",
    reductionInCapital: "reduktion i bundet kapital",
    speedIncrease: "hastighedsforøgelse i dataanalyse",
    fromManualToAI: "Fra manuelle inspektioner til intelligent analyse",
    fromOverstocked: "Fra overfyldt lager til optimeret lager",
    fromHoursToMinutes: "Fra timers manuel behandling til øjeblikkelig indsigt",
    
    // Testimonials
    testimonialTitle: "Hvad vores kunder siger",
    testimonialSubtitle: "Virkelige resultater fra virkelige virksomheder, der transformerede deres forretning med AI",
    fasterAssessments: "85% hurtigere risikovurderinger",
    testimonialQuote1: "HARKA transformerede vores tekniske analyseproces. Det, der plejede at tage vores eksperter timer, tager nu minutter.",
    testimonialRole1: "Maritime Company CTO",
    testimonialQuote2: "HARKA lærte os ikke bare AI - de hjalp os med at gentænke hele vores arbejdsgang.",
    testimonialRole2: "Energisektorleder",
    testimonialQuote3: "Workshoppen betalte sig selv, før vi overhovedet var færdige. Vores team er nu AI-drevet.",
    testimonialRole3: "Produktionsdirektør",
    roiFirstWeek: "ROI inden for første uge",
    teamProductivity: "Teamproduktivitet op 60%",
    
    // FAQ
    faqTitle: "Ofte stillede spørgsmål",
    faqSubtitle: "Alt du behøver at vide om vores AI-workshops",
    faqQ1: "Hvor realistisk er påstanden om \"ROI inden for første uge\"?",
    faqA1: "Baseret på 12 kundeimplementeringer i 4. kvartal 2024 ser virksomheder typisk øjeblikkelig værdi gennem automatiseret rapportgenerering og hurtigere dataanalyse. Marine-casestudiet viser 85% tidsbesparelser på risikovurderinger fra dag et.",
    faqQ2: "Hvad sker der præcist i den 48-timers workshop?",
    faqA2: "Dag 1 fokuserer på AI-fundamentals, prompt engineering og opbygning af dine første prototyper. Dag 2 dækker etik, GDPR-overholdelse og udvikling af virksomhedsspecifikke AI-løsninger. Du forlader med fungerende værktøjer, ikke bare teori.",
    faqQ3: "Hvad hvis vores team ikke har teknisk baggrund?",
    faqA3: "Perfekt! Vores workshops er designet til forretningsprofessionelle, ikke udviklere. Vi lærer praktisk AI-brug gennem brugervenlige værktøjer som ChatGPT og Microsoft Copilot. Ingen kodning påkrævet.",
    faqQ4: "Hvordan sikrer I GDPR-overholdelse med AI-værktøjer?",
    faqA4: "Vi implementerer zero-trust sikkerhedsmodeller og lærer dataanonymiseringsteknikker. Alle AI-løsninger inkluderer indbyggede compliance-rammer, der opfylder nordiske regulatoriske standarder.",
    faqQ5: "Hvilken support får vi efter workshoppen?",
    faqA5: "Hver workshop inkluderer 90 dages e-mail support, adgang til vores videobibliotek og månedlige Q&A-sessioner. Vi leverer også implementeringsskabeloner og fejlfindingsguider.",
    faqQ6: "Hvor meget koster workshoppen, og hvad er inkluderet?",
    faqA6: "Investeringen varierer efter virksomhedsstørrelse og krav. Alle workshops inkluderer materialer, skabeloner, 90-dages support og adgang til vores læringsplatform. Book et discovery call for personlig prissætning.",
    stillQuestions: "Har du stadig spørgsmål? Lad os diskutere dine specifikke behov",
    
    // CTA
    bookDiscoveryCall: "Book dit Discovery Call",
    freeConsultation: "Gratis konsultation - ingen forpligtelser, bare en samtale",
    trustedByNordic: "Betroet af førende nordiske virksomheder",
    satisfactionRate: "98% Tilfredshedsrate",
    companiesTrained: "500+ Virksomheder trænet",
    companiesGrown: "Virksomheder vokset",
    participantsTrained: "Kursusdeltagere og medarbejdere trænet",
    viewAllArticles: "Se alle artikler",
    joinCompanies: "Slut dig til 500+ virksomheder, der allerede transformerer med AI",
    hours: "Timer",
    value: "Værdi",
    potential: "Potentiale",
    isoCertified: "ISO 27001 Certificeret",
    
    // AI-Kompas
    aiKompas: "AI-Kompas",
    aiKompasTagline: "Find jeres vej ind i AI-revolutionen",
    aiKompasDescription: "Fra uklarhed til konkret handleplan.",
    aiKompasStartAssessment: "Start AI-Parathedsvurdering",
    
    // AI-Kompas Value Props
    aiKompasIdentifyPotential: "Identificer AI-Potentiale",
    aiKompasIdentifyPotentialDesc: "Kortlægning af alle processer med heat-map visualisering af AI-muligheder",
    aiKompasExpectedRoi: "Forventet ROI",
    aiKompasExpectedRoiDesc: "Top 10 AI-muligheder rangeret efter return on investment",
    aiKompasQuickWins: "Quick Wins",
    aiKompasQuickWinsDesc: "Hurtige gevinster du kan implementere allerede i morgen",
    
    // AI-Kompas Assessment
    aiKompasAssessment: "AI-Parathedsvurdering",
    aiKompasAssessmentSubtitle: "8 spørgsmål - ca. 15 minutter",
    aiKompasReadinessAssessment: "Start AI-Parathedsvurdering",
    aiKompasGetConcreteInsights: "få konkrete indsigter på 15 minutter",
    aiKompasStartReadinessAssessment: "Start AI-Parathedsvurdering",
    aiKompasOutputsTitle: "Konkrete Outputs:",
    aiKompasPerfectIfTitle: "Perfekt hvis du:",
    aiKompasReadyToMap: "Klar til at kortlægge jeres AI-potentiale?",
    aiKompasReadyToMapDesc: "Start med vores AI-parathedsvurdering - få konkrete indsigter på 15 minutter",
    
    // Assessment Questions
    assessmentCompanySize: "Hvor stor er jeres virksomhed?",
    assessmentCompanySizeDesc: "Dette hjælper os med at tilpasse anbefalingerne til jeres skala",
    assessmentIndustry: "Hvilken branche arbejder I i?",
    assessmentIndustryDesc: "Forskellige brancher har forskellige AI-muligheder",
    assessmentAiExperience: "Hvor meget erfaring har I med AI-værktøjer?",
    assessmentAiExperienceDesc: "Dette hjælper os med at vurdere jeres nuværende modenhed",
    assessmentMainChallenges: "Hvad er jeres største udfordringer lige nu?",
    assessmentMainChallengesDesc: "Beskriv de områder hvor I bruger mest tid eller har største frustrationer",
    assessmentTimeConsumingTasks: "Hvilke opgaver tager mest tid i jeres hverdag?",
    assessmentTimeConsumingTasksDesc: "Tænk på gentagne, manuelle opgaver der kunne automatiseres",
    assessmentBudgetRange: "Hvad er jeres estimerede budget for AI-initiativer?",
    assessmentBudgetRangeDesc: "Dette hjælper os med at prioritere løsninger efter jeres investeringsramme",
    assessmentImplementationTimeline: "Hvor hurtigt vil I gerne implementere AI-løsninger?",
    assessmentImplementationTimelineDesc: "Dette påvirker hvilke løsninger vi anbefaler",
    assessmentContactInfo: "Kontaktoplysninger",
    assessmentContactInfoDesc: "Så vi kan sende jeres personlige AI-Kompas rapport",
    
    // Assessment Results
    aiKompasReport: "Jeres AI-Kompas Rapport",
    aiKompasReportDesc: "Vi har analyseret jeres virksomhed og identificeret de bedste AI-muligheder",
    executiveSummary: "Executive Summary",
    topOpportunitiesIdentified: "Top AI-muligheder identificeret",
    expectedEfficiencyIncrease: "Forventet effektivitetsforøgelse",
    onPriorityProjects: "På prioriterede projekter",
    ourRecommendation: "Vores anbefaling til jer:",
    processHeatMap: "Proces Heat-Map: AI-Potentiale",
    processHeatMapDesc: "Rød = Høj prioritet, Gul = Medium prioritet, Grøn = Lav prioritet",
    topOpportunities: "Top 5 AI-Muligheder (Rangeret efter ROI)",
    implementationRoadmap: "Anbefalet Implementerings-Roadmap",
    recommendedImplementationRoadmap: "Anbefalet Implementerings-Roadmap",
    structuredApproachToTransformation: "Struktureret tilgang til jeres AI-transformation",
    
    // Process Areas
    currentEfficiency: "Nuværende effektivitet",
    quickWins: "Quick Wins:",
    
    // CTA Sections
    getPersonalReport: "Få jeres personlige rapport som PDF",
    getPersonalReportDesc: "Download den komplette analyse med detaljerede anbefalinger og budget-estimater",
    downloadFullReport: "Download Fuld Rapport",
    bookStrategyMeeting: "Book 90-minutters strategimøde",
    bookStrategyMeetingDesc: "Få personlig rådgivning og detaljeret implementeringsplan fra vores AI-eksperter",
    bookFreeConsultation: "Book Gratis Konsultation",
    nextStepChooseJourney: "Næste skridt: Vælg jeres AI-rejse",
    
    // Service Packages
    aiTransformation: "AI-Transformation",
    aiTransformationDesc: "Implementer jeres top 3 muligheder",
    aiCompetenceLift: "AI-Kompetenceløft",
    aiCompetenceLiftDesc: "Gør jeres team AI-klar",
    aiAccelerator: "AI Accelerator",
    aiAcceleratorDesc: "Komplet transformation (alle pakker)",
    readMore: "Læs mere",
    recommended: "Anbefalet"
  },
  en: {
    // Navigation
    method: "Method",
    results: "Results",
    team: "Team", 
    blog: "Blog",
    contact: "Contact",
    switchTheme: "Switch theme",
    switchLanguage: "Skift sprog", 
    bookMeeting: "Book meeting",
    
    // Hero section
    heroHeadline: "From idea to implementation in just 48 hours.",
    heroSubheadline: "We turn AI potential into practical solutions that deliver measurable results – without lengthy project cycles or PowerPoints.",
    heroCta: "From strategy to action in 2 days - contact us today",
    
    // Stats
    statDays: "Days from start to value",
    statMonths: "Months shorter time-to-value",
    statAdmin: "Less admin time after implementation", 
    statRoi: "Average ROI within the first quarter",
    
    // Value props
    valueTitle: "AI implementation: From months to hours",
    valueSubtitle: "Most companies struggle to convert AI promises into business value. We do it differently.",
    
    accelerated: "Accelerated implementation",
    acceleratedDesc: "Traditional AI implementations take months or years. HARKA delivers usable solutions in just 48 hours.",
    
    competency: "Competency transfer from day one",
    competencyDesc: "Instead of creating ongoing consulting relationships, we transfer skills to your team from day one.",
    
    immediate: "Immediate value creation", 
    immediateDesc: "Our customers have typically earned back the workshop cost before the two days are over. Value creation starts immediately.",
    
    tailored: "Tailored to your needs",
    tailoredDesc: "We don't implement standard solutions, but create technology that fits exactly with your processes and requirements.",
    
    practical: "AI made practical and understandable",
    practicalDesc: "We remove the mystique around AI and turn the technology into a concrete tool that your employees can use in everyday work.",
    
    market: "Market-validated timeframe", 
    marketDesc: "AI projects can stretch up to 9-12 months before you begin to realize concrete value, while modern gen-AI pilots can be production-ready in just a few months.",
    marketSource: "McKinsey",
    
    // Two-day process
    processTitle: "The result: From strategy to action in 48 hours",
    
    day1Title: "Day 1: Opportunities & Prototypes",
    day1Items: [
      "Identification of processes with AI potential",
      "Hands-on training in relevant tools",
      "Development of prototype solutions", 
      "Building AI competencies in your team"
    ],
    
    day2Title: "Day 2: Implementation & Handover",
    day2Items: [
      "Finalization and integration of solutions",
      "Adaptation to your workflows",
      "Competency transfer and documentation",
      "Action plan for the next 90 days"
    ],
    
    contactToday: "Contact us today", 
    noObligations: "No obligations, just a conversation",
    
    // Results section
    resultsTitle: "Results that speak for themselves",
    resultsSubtitle: "In just 48 hours, our customers have achieved significant business breakthroughs.",
    
    // Case study section
    caseStudyTitle: "Customer Case • Marine and Industrial Company Achieves Major Time Savings on Critical Analyses",
    caseStudySubtitle: "About the Customer",
    caseStudyDescription: "A leading player in marine services and power solutions specializing in maintenance of ship engines, power plants and industrial facilities.",
    challengeTitle: "The Challenge",
    challengeDesc: "Before working with HARKA, the customer had several resource-intensive processes:",
    challengeItems: [
      "Service reports required many hours of manual entry per report.",
      "Risk analyses of turbo systems took days to complete.",
      "Capital was tied up in older spare parts without inventory overview.",
      "Documentation was inconsistent across technical teams."
    ],
    workshopTitle: "Workshop Results",
    workshopDesc: "During a two-day workshop, employees built the following AI solutions themselves:",
    workshopItems: [
      "Service Report Bot: Manual entry was automated, so reports that previously took several hours to complete can now be done in minutes with significant time savings.",
      "Turbo Risk Analysis: Specialist analyses that previously took hours can now be performed in under fifteen minutes.",
      "Inventory Intelligence: Analysis of the spare parts inventory freed up a significant portion of capital previously tied up in obsolete inventory."
    ],
    spotlightTitle: "Spotlight: From Expert Knowledge to AI Tool",
    spotlightDesc: "The workshop's highlight was a risk analysis solution for turbo systems. Using only:",
    spotlightItems: [
      "Images of relevant components",
      "Short video recordings of the system in operation",
      "A standard service handbook"
    ],
    spotlightResult: "...the AI could generate a detailed technical assessment in under 10 minutes that identified potential weaknesses, prioritized problems by severity, and gave concrete action recommendations. A task that previously required hours of expert analysis is now a process any technician can perform. This shows how specialized knowledge can be democratized and scaled through AI – even in highly technical domains.",
    valueTitle: "Value Beyond the Workshop",
    valueItems: [
      "AI governance in place: Employees implemented a tailored ethical control framework that now serves as the standard for all new technology projects.",
      "Competency boost: The entire team now masters both ChatGPT and Microsoft Copilot in their daily work.",
      "Continuous learning: Access to HARKA's video library and a full year of sparring ensures skills continue to develop.",
      "Self-driving AI culture: The company has established monthly \"AI days\" where new use cases are identified and prototypes built."
    ],
    customerExperienceTitle: "Customer Experience",
    customerQuote: "The most surprising thing was not just that we got concrete solutions in two days – but that the solutions actually work in our everyday life and have already saved us hundreds of working hours. HARKA delivered not consultant reports, but real tools we use every day.",
    customerRole: "Department Manager",
    nextStepsTitle: "Next Steps",
    nextStepsDesc: "The company is now working on permanent versions of the prototype solutions with continued sparring from HARKA.",
    
    // Team section
    teamTitle: "The team behind HARKA",
    teamSubtitle: "Meet the two experts who, in just 48 hours, transform your company's AI potential into practical solutions and concrete results.",
    
    // Blog section
    blogTitle: "Latest Insights",
    blogSubtitle: "Explore our latest thoughts and insights on AI implementation, business transformation, and achieving practical results.",
    
    // Footer CTA
    footerTitle: "Start your AI journey",
    footerSubtitle: "Get a non-binding conversation about how we can help your company leverage AI's potential.",
    
    // Footer
    footerDescription: "We help companies streamline workflows, reduce wasted time, and strengthen decision-making – in just 2 days.",
    navigation: "Navigation", 
    legal: "Legal",
    privacyPolicy: "Privacy policy",
    cookiePolicy: "Cookie policy",
    terms: "Terms and conditions", 
    allRights: "All rights reserved",
    
    // Stats cards
    fasterRiskAssessment: "faster risk assessment",
    reductionInCapital: "reduction in tied-up capital",
    speedIncrease: "speed increase in data analysis",
    fromManualToAI: "From manual inspections to intelligent analysis",
    fromOverstocked: "From overstocked inventory to optimized stock",
    fromHoursToMinutes: "From hours of manual processing to instant insight",
    
    // Testimonials
    testimonialTitle: "What Our Clients Say",
    testimonialSubtitle: "Real results from real companies who transformed their business with AI",
    fasterAssessments: "85% faster risk assessments",
    testimonialQuote1: "HARKA transformed our technical analysis process. What used to take our experts hours now takes minutes.",
    testimonialRole1: "Maritime Company CTO",
    testimonialQuote2: "HARKA didn't just teach us AI - they helped us reimagine our entire workflow.",
    testimonialRole2: "Energy Sector Manager",
    testimonialQuote3: "The workshop paid for itself before we even finished. Our team is now AI-powered.",
    testimonialRole3: "Manufacturing Director",
    roiFirstWeek: "ROI within first week",
    teamProductivity: "Team productivity up 60%",
    
    // FAQ
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything you need to know about our AI workshops",
    faqQ1: "How realistic is the \"ROI within first week\" claim?",
    faqA1: "Based on 12 client implementations in Q4 2024, companies typically see immediate value through automated report generation and faster data analysis. The marine case study shows 85% time savings on risk assessments starting day one.",
    faqQ2: "What exactly happens in the 48-hour workshop?",
    faqA2: "Day 1 focuses on AI fundamentals, prompt engineering, and building your first prototypes. Day 2 covers ethics, GDPR compliance, and developing company-specific AI solutions. You'll leave with working tools, not just theory.",
    faqQ3: "What if our team has no technical background?",
    faqA3: "Perfect! Our workshops are designed for business professionals, not developers. We teach practical AI usage through user-friendly tools like ChatGPT and Microsoft Copilot. No coding required.",
    faqQ4: "How do you ensure GDPR compliance with AI tools?",
    faqA4: "We implement zero-trust security models and teach data anonymization techniques. All AI solutions include built-in compliance frameworks that meet Nordic regulatory standards.",
    faqQ5: "What support do we get after the workshop?",
    faqA5: "Every workshop includes 90 days of email support, access to our video library, and monthly Q&A sessions. We also provide implementation templates and troubleshooting guides.",
    faqQ6: "How much does the workshop cost and what's included?",
    faqA6: "Investment varies by company size and requirements. All workshops include materials, templates, 90-day support, and access to our learning platform. Book a discovery call for personalized pricing.",
    stillQuestions: "Still have questions? Let's discuss your specific needs",
    
    // CTA
    bookDiscoveryCall: "Book Your Discovery Call",
    freeConsultation: "Free consultation - no obligations, just a conversation",
    trustedByNordic: "Trusted by leading Nordic companies",
    satisfactionRate: "98% Satisfaction Rate",
    companiesTrained: "500+ Companies Trained",
    companiesGrown: "Companies grown",
    participantsTrained: "Course participants and employees trained",
    viewAllArticles: "View all articles",
    joinCompanies: "Join 500+ companies already transforming with AI",
    hours: "Hours",
    value: "Value",
    potential: "Potential",
    isoCertified: "ISO 27001 Certified",
    
    // AI-Kompas
    aiKompas: "AI-Kompas",
    aiKompasTagline: "Navigate your way into the AI revolution",
    aiKompasDescription: "From uncertainty to concrete action plan.",
    aiKompasStartAssessment: "Start AI Readiness Assessment",
    
    // AI-Kompas Value Props
    aiKompasIdentifyPotential: "Identify AI Potential",
    aiKompasIdentifyPotentialDesc: "Process mapping with heat-map visualization of AI opportunities",
    aiKompasExpectedRoi: "Expected ROI",
    aiKompasExpectedRoiDesc: "Top 10 AI opportunities ranked by return on investment",
    aiKompasQuickWins: "Quick Wins",
    aiKompasQuickWinsDesc: "Fast gains you can implement tomorrow",
    
    // AI-Kompas Assessment
    aiKompasAssessment: "AI Readiness Assessment",
    aiKompasAssessmentSubtitle: "8 questions - approximately 15 minutes",
    aiKompasReadinessAssessment: "Start AI Readiness Assessment",
    aiKompasGetConcreteInsights: "get concrete insights in 15 minutes",
    aiKompasStartReadinessAssessment: "Start AI Readiness Assessment",
    aiKompasOutputsTitle: "Concrete Outputs:",
    aiKompasPerfectIfTitle: "Perfect if you:",
    aiKompasReadyToMap: "Ready to map your AI potential?",
    aiKompasReadyToMapDesc: "Start with our AI readiness assessment - get concrete insights in 15 minutes",
    
    // Assessment Questions
    assessmentCompanySize: "How large is your company?",
    assessmentCompanySizeDesc: "This helps us tailor recommendations to your scale",
    assessmentIndustry: "What industry do you work in?",
    assessmentIndustryDesc: "Different industries have different AI opportunities",
    assessmentAiExperience: "How much experience do you have with AI tools?",
    assessmentAiExperienceDesc: "This helps us assess your current maturity level",
    assessmentMainChallenges: "What are your biggest challenges right now?",
    assessmentMainChallengesDesc: "Describe the areas where you spend most time or have biggest frustrations",
    assessmentTimeConsumingTasks: "Which tasks take the most time in your daily work?",
    assessmentTimeConsumingTasksDesc: "Think about repetitive, manual tasks that could be automated",
    assessmentBudgetRange: "What is your estimated budget for AI initiatives?",
    assessmentBudgetRangeDesc: "This helps us prioritize solutions according to your investment framework",
    assessmentImplementationTimeline: "How quickly would you like to implement AI solutions?",
    assessmentImplementationTimelineDesc: "This affects which solutions we recommend",
    assessmentContactInfo: "Contact Information",
    assessmentContactInfoDesc: "So we can send your personal AI-Kompas report",
    
    // Assessment Results
    aiKompasReport: "Your AI-Kompas Report",
    aiKompasReportDesc: "We have analyzed your company and identified the best AI opportunities",
    executiveSummary: "Executive Summary",
    topOpportunitiesIdentified: "Top AI opportunities identified",
    expectedEfficiencyIncrease: "Expected efficiency increase",
    onPriorityProjects: "On priority projects",
    ourRecommendation: "Our recommendation for you:",
    processHeatMap: "Process Heat-Map: AI Potential",
    processHeatMapDesc: "Red = High priority, Yellow = Medium priority, Green = Low priority",
    topOpportunities: "Top 5 AI Opportunities (Ranked by ROI)",
    implementationRoadmap: "Recommended Implementation Roadmap",
    recommendedImplementationRoadmap: "Recommended Implementation Roadmap",
    structuredApproachToTransformation: "Structured approach to your AI transformation",
    
    // Process Areas
    currentEfficiency: "Current efficiency",
    quickWins: "Quick Wins:",
    
    // CTA Sections
    getPersonalReport: "Get your personal report as PDF",
    getPersonalReportDesc: "Download the complete analysis with detailed recommendations and budget estimates",
    downloadFullReport: "Download Full Report",
    bookStrategyMeeting: "Book 90-minute strategy meeting",
    bookStrategyMeetingDesc: "Get personal advice and detailed implementation plan from our AI experts",
    bookFreeConsultation: "Book Free Consultation",
    nextStepChooseJourney: "Next step: Choose your AI journey",
    
    // Service Packages
    aiTransformation: "AI-Transformation",
    aiTransformationDesc: "Implement your top 3 opportunities",
    aiCompetenceLift: "AI-Competence Lift",
    aiCompetenceLiftDesc: "Make your team AI-ready",
    aiAccelerator: "AI Accelerator",
    aiAcceleratorDesc: "Complete transformation (all packages)",
    readMore: "Read more",
    recommended: "Recommended"
  }
};

export function getTranslations(language: Language): Translations {
  return translations[language];
}