"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ChevronDown, Globe, Menu, X, Sun, Moon, User, Shield } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useUser } from "@clerk/nextjs"
import { useAnalytics } from "@/components/analytics/analytics-tracker"

interface HarkaHeroProps {
  language: 'da' | 'en'
  onLanguageChange: (lang: 'da' | 'en') => void
}

export function HarkaHero({ language, onLanguageChange }: HarkaHeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { isSignedIn, user } = useUser()
  const { trackCTAClick } = useAnalytics()
  
  // Check if user is admin
  const isAdmin = user?.publicMetadata?.role === 'admin'

  const content = {
    da: {
      // Navigation
      method: "Method",
      results: "Results", 
      team: "Team",
      blog: "Blog",
      contact: "Contact",
      switchTheme: "Skift tema",
      switchLanguage: "Switch language",
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
      
      contactToday: "Kontakt os i dag",
      noObligations: "Ingen forpligtelser, bare en samtale",
      
      // Results section
      resultsTitle: "Results that speak for themselves",
      resultsSubtitle: "In just 48 hours, our customers have achieved significant business breakthroughs.",
      
      // Case study section
      caseStudyTitle: "Kundecase • Marine‑ og industrivirksomhed opnår store tidsbesparelser på kritiske analyser",
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
      workshopTitle: "Workshop‑resultater",
      workshopDesc: "I løbet af to dages workshop byggede medarbejderne selv følgende AI‑løsninger:",
      workshopItems: [
        "Service‑rapport‑bot: Den manuelle indtastning blev automatiseret, så rapporter, der tidligere tog flere timer at udfylde, nu kan gennemføres på få minutter med en markant tidsbesparelse.",
        "Turbo‑risikoanalyse: Specialistanalyser, der før tog timer, kan nu udføres på under et kvarter.",
        "Lager‑intelligens: Analyse af reservedelslageret frigjorde en væsentlig del af kapitalen, der tidligere var bundet i forældet inventar."
      ],
      spotlightTitle: "Spotlight: Fra specialistviden til AI‑værktøj",
      spotlightDesc: "Workshoppens højdepunkt var en risikoanalyse‑løsning for turbosystemer. Ved kun at bruge:",
      spotlightItems: [
        "Billeder af relevante komponenter",
        "Korte videooptagelser af systemet i drift",
        "En standard servicehåndbog"
      ],
      spotlightResult: "… kunne AI'en på under 10 minutter generere en detaljeret teknisk vurdering, der identificerede potentielle svagheder, prioriterede problemer efter alvor og gav konkrete handlingsanbefalinger. En opgave, der tidligere krævede timers ekspertanalyse, er nu en proces, enhver tekniker kan gennemføre. Dette viser, hvordan specialiseret viden kan demokratiseres og skaleres gennem AI – selv i højtekniske domæner.",
      valueTitle: "Værdi udover workshoppen",
      valueItems: [
        "AI‑governance på plads: Medarbejderne implementerede en skræddersyet etisk kontrolramme, som nu fungerer som standard for alle nye teknologiprojekter.",
        "Kompetenceløft: Hele teamet mestrer nu både ChatGPT og Microsoft Copilot i deres daglige arbejde.",
        "Kontinuerlig læring: Adgang til HARKAs videobibliotek og et helt års sparring sikrer, at kompetencerne fortsat udvikles.",
        "Selvkørende AI‑kultur: Virksomheden har etableret månedlige \"AI‑dage\", hvor nye use cases identificeres og prototyper bygges."
      ],
      customerExperienceTitle: "Kundeoplevelsen",
      customerQuote: "Det mest overraskende var ikke bare, at vi fik konkrete løsninger på to dage – men at løsningerne faktisk fungerer i vores hverdag og allerede har sparet os for hundredvis af arbejdstimer. HARKA leverede ikke konsulentrapporter, men ægte værktøjer vi bruger hver dag.",
      customerRole: "Afdelingsleder",
      nextStepsTitle: "Næste skridt",
      nextStepsDesc: "Virksomheden arbejder nu på permanente versioner af prototype‑løsningerne med fortsat sparring fra HARKA.",
      
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
      allRights: "All rights reserved"
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
      allRights: "All rights reserved"
    }
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
                HARKA
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/learn/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/learn/learning" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Learning
              </Link>
              <Link href="/learn/playground" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Playground
              </Link>
              <Link href="/learn/analytics" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Analytics
              </Link>
              <Link href="/learn/toolkit" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Toolkit
              </Link>
              {isAdmin && (
                <Link href="/admin" className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              )}
            </div>

            {/* Right side controls */}
            <div className="hidden md:flex items-center space-x-4">
              {isSignedIn ? (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Connected</span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="flex items-center gap-2"
                  >
                    {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLanguageChange(language === 'da' ? 'en' : 'da')}
                    className="flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    {language === 'da' ? 'EN' : 'DA'}
                  </Button>

                  <Link href="/learn/dashboard">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="flex items-center gap-2"
                  >
                    {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLanguageChange(language === 'da' ? 'en' : 'da')}
                    className="flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    {language === 'da' ? 'EN' : 'DA'}
                  </Button>

                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>

                  <Link href="/signup">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/learn/dashboard" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Dashboard
              </Link>
              <Link href="/learn/learning" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Learning
              </Link>
              <Link href="/learn/playground" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Playground
              </Link>
              <Link href="/learn/analytics" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Analytics
              </Link>
              <Link href="/learn/toolkit" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Toolkit
              </Link>
              {isAdmin && (
                <Link href="/admin" className="block px-3 py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admin Panel
                </Link>
              )}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="w-full justify-start mb-2"
                >
                  {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLanguageChange(language === 'da' ? 'en' : 'da')}
                  className="w-full justify-start"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language === 'da' ? 'EN' : 'DA'}
                </Button>
                {isSignedIn ? (
                  <Link href="/learn/dashboard">
                    <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <div className="space-y-2 mt-2">
                    <Link href="/login">
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-6rem)]">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                Trusted by 500+ Nordic Companies
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gray-900 dark:text-white">{t.heroHeadline}</span>
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
                  {t.heroSubheadline}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {isSignedIn ? (
                  <Link href="/learn/dashboard">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
                    trackCTAClick('hero_cta', 'Book Discovery Call')
                    window.open('https://calendly.com/harka-ai-workshop', '_blank')
                  }}>
                    Book Discovery Call
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
              
              {!isSignedIn && (
                <div className="mt-4 p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg border">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    🎯 <strong>Free 15-minute consultation</strong> - No obligations, just explore how AI can transform your business
                  </p>
                  <p className="text-xs text-gray-500">
                    ✓ Understand your specific use cases ✓ Get implementation timeline ✓ Receive custom recommendations
                  </p>
                </div>
              )}
            </div>

            {/* Right Content - Learning Progress Dashboard */}
            <div className="relative">
              <Card className="p-8 bg-white dark:bg-gray-800 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Learning Progress</h3>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">?</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Fundamentals</span>
                      <span className="text-green-600 font-semibold">100%</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full w-full" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Ethics & Governance</span>
                      <span className="text-blue-600 font-semibold">75%</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full w-3/4" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Implementation</span>
                      <span className="text-purple-600 font-semibold">45%</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-[45%]" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Next Module</div>
                      <div className="text-sm font-medium">Project Planning Workshop</div>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Continue
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="text-center mt-8">
            <ChevronDown className="h-6 w-6 text-gray-400 mx-auto animate-bounce" />
            <div className="text-sm text-gray-500 mt-2">Scroll down</div>
          </div>
        </div>
      </section>

      {/* Client Logo Wall */}
      <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Trusted by leading Nordic companies</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60 hover:opacity-80 transition-opacity">
            {/* Maritime Industry */}
            <div className="flex items-center justify-center h-12">
              <div className="text-center">
                <div className="text-2xl mb-1">⚓</div>
                <div className="text-xs text-gray-400">Maritime</div>
              </div>
            </div>
            
            {/* Manufacturing */}
            <div className="flex items-center justify-center h-12">
              <div className="text-center">
                <div className="text-2xl mb-1">⚙️</div>
                <div className="text-xs text-gray-400">Manufacturing</div>
              </div>
            </div>
            
            {/* Energy */}
            <div className="flex items-center justify-center h-12">
              <div className="text-center">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-xs text-gray-400">Energy</div>
              </div>
            </div>
            
            {/* Finance */}
            <div className="flex items-center justify-center h-12">
              <div className="text-center">
                <div className="text-2xl mb-1">🏦</div>
                <div className="text-xs text-gray-400">Finance</div>
              </div>
            </div>
            
            {/* Healthcare */}
            <div className="flex items-center justify-center h-12">
              <div className="text-center">
                <div className="text-2xl mb-1">🏥</div>
                <div className="text-xs text-gray-400">Healthcare</div>
              </div>
            </div>
            
            {/* Technology */}
            <div className="flex items-center justify-center h-12">
              <div className="text-center">
                <div className="text-2xl mb-1">💻</div>
                <div className="text-xs text-gray-400">Technology</div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>500+ Companies Trained</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>98% Satisfaction Rate</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>ISO 27001 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions Section */}
      <section id="method" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.valueTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.valueSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4">{t.accelerated}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.acceleratedDesc}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4">{t.competency}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.competencyDesc}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4">{t.immediate}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.immediateDesc}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4">{t.tailored}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.tailoredDesc}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4">{t.practical}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.practicalDesc}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4">
                  {t.market}
                  <Badge variant="secondary" className="ml-2 text-xs">✨</Badge>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{t.marketDesc}</p>
                <p className="text-sm text-gray-500 mt-2 italic">{t.marketSource}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Two-Day Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.processTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold text-xl mr-4">
                    1
                  </div>
                  <h3 className="text-2xl font-semibold">{t.day1Title}</h3>
                </div>
                <ul className="space-y-3">
                  {t.day1Items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold text-xl mr-4">
                    2
                  </div>
                  <h3 className="text-2xl font-semibold">{t.day2Title}</h3>
                </div>
                <ul className="space-y-3">
                  {t.day2Items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.open('https://calendly.com/harka-ai-workshop', '_blank')}>
              Book Discovery Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-sm text-gray-500 mt-2">Free consultation - no obligations, just a conversation</p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.resultsTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.resultsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                <h3 className="text-lg font-semibold mb-2">faster risk assessment</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">From manual inspections to intelligent analysis</p>
                <p className="text-sm text-gray-500 mt-2">Automated risk analysis based on complex data inputs reduces assessment time and significantly increases precision.</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
                <h3 className="text-lg font-semibold mb-2">liberated technician capacity</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">From administrative burdens to value-creating work</p>
                <p className="text-sm text-gray-500 mt-2">Technicians now use their expertise where it creates the most value, while AI handles documentation and reporting.</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-purple-600 mb-2">32%</div>
                <h3 className="text-lg font-semibold mb-2">reduction in tied-up capital</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">From overstocked inventory to optimized stock</p>
                <p className="text-sm text-gray-500 mt-2">Intelligent inventory analysis identifies patterns and optimizes purchasing, freeing up significant capital without affecting delivery capacity.</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-orange-600 mb-2">60x</div>
                <h3 className="text-lg font-semibold mb-2">speed increase in data analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">From hours of manual processing to instant insight</p>
                <p className="text-sm text-gray-500 mt-2">Complex documents and technical data are compared and analyzed in minutes instead of hours or days.</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-red-600 mb-2">45%</div>
                <h3 className="text-lg font-semibold mb-2">fewer resource-intensive cases</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">From recurring problems to proactive solutions</p>
                <p className="text-sm text-gray-500 mt-2">AI-driven pattern recognition in warranty cases reduces case processing time and prevents recurring problems.</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-green-600 mb-2">ROI</div>
                <h3 className="text-lg font-semibold mb-2">Documented ROI within the first week</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Documented value</p>
                <p className="text-sm text-gray-500 mt-2">Measurable ROI from day one. Our 48-hour workshop delivers immediate value with implemented solutions that provide a positive return already during the course.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.caseStudyTitle}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Company & Challenge */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t.caseStudySubtitle}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t.caseStudyDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t.challengeTitle}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t.challengeDesc}
                  </p>
                  <ul className="space-y-2">
                    {t.challengeItems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Solutions & Results */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t.workshopTitle}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t.workshopDesc}
                  </p>
                  <ul className="space-y-3">
                    {t.workshopItems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Spotlight Section */}
            <div className="mt-12 bg-white/60 dark:bg-gray-700/30 rounded-xl p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t.spotlightTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t.spotlightDesc}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                {t.spotlightItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 dark:text-gray-200 italic">
                {t.spotlightResult}
              </p>
            </div>

            {/* Value & Experience */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t.valueTitle}
                </h3>
                <ul className="space-y-2">
                  {t.valueItems.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t.customerExperienceTitle}
                </h3>
                <blockquote className="bg-white/40 dark:bg-gray-600/20 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 dark:text-gray-200 italic text-sm mb-2">
                    "{t.customerQuote}"
                  </p>
                  <cite className="text-gray-600 dark:text-gray-400 text-xs">
                    – {t.customerRole}
                  </cite>
                </blockquote>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
                    {t.nextStepsTitle}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {t.nextStepsDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real results from real companies who transformed their business with AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Video Testimonial 1 */}
            <Card className="relative overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-blue-900 to-blue-700 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative text-center text-white p-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-0 h-0 border-l-6 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                    </div>
                    <p className="text-sm mb-2">"85% faster risk assessments"</p>
                    <p className="text-xs opacity-80">Maritime Company CTO</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    "HARKA transformed our technical analysis process. What used to take our experts hours now takes minutes."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Video Testimonial 2 */}
            <Card className="relative overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-green-900 to-green-700 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative text-center text-white p-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-0 h-0 border-l-6 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                    </div>
                    <p className="text-sm mb-2">"ROI within first week"</p>
                    <p className="text-xs opacity-80">Manufacturing Director</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    "The workshop paid for itself before we even finished. Our team is now AI-powered."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Video Testimonial 3 */}
            <Card className="relative overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-purple-900 to-purple-700 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative text-center text-white p-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-0 h-0 border-l-6 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                    </div>
                    <p className="text-sm mb-2">"Team productivity up 60%"</p>
                    <p className="text-xs opacity-80">Energy Sector Manager</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    "HARKA didn't just teach us AI - they helped us reimagine our entire workflow."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.open('https://calendly.com/harka-ai-workshop', '_blank')}>
              Book Your Discovery Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-sm text-gray-500 mt-2">Join 500+ companies already transforming with AI</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.teamTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.teamSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-2xl font-semibold">Sven Arnarsson</h3>
                  <p className="text-gray-600 dark:text-gray-300">Founder - AI Implementation & Business Development</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">20+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Companies grown</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">10+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Years of startup experience</div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Sven has an extensive background in tech and startup environments, where he has specialized in converting complex technologies into practical solutions with immediate business value.
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Areas of expertise:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Rapid AI implementation with focus on concrete results</li>
                    <li>• Data-driven decision support and business optimization</li>
                    <li>• Strategic use of AI in daily workflows</li>
                    <li>• Technology-driven efficiency and automation</li>
                  </ul>
                </div>

                <blockquote className="text-sm italic text-gray-600 dark:text-gray-300 border-l-4 border-gray-300 pl-4">
                  "My mission is to demystify AI and make it an effective tool that creates immediate value for any company."
                </blockquote>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-2xl font-semibold">Carsten Timm</h3>
                  <p className="text-gray-600 dark:text-gray-300">Founder - Competency Development & Technology Communication and Training</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">10.000+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Course participants and employees trained</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">11+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Years of teaching experience</div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Carsten combines his background in IT, economics, and digital marketing with an outstanding ability to make complex technology accessible and applicable.
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Areas of expertise:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Customized technology training for all levels</li>
                    <li>• Effective competency transfer and knowledge sharing</li>
                    <li>• Practical integration of AI into existing workflows</li>
                    <li>• Business-oriented technology understanding</li>
                  </ul>
                </div>

                <blockquote className="text-sm italic text-gray-600 dark:text-gray-300 border-l-4 border-gray-300 pl-4">
                  "I am passionate about making advanced technology an everyday tool that can be used by all employees – not just specialists."
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.blogTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t.blogSubtitle}
            </p>
            <Button variant="outline">View all articles</Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to know about our AI workshops
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">What exactly happens in the 48-hour workshop?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Day 1 focuses on AI fundamentals, prompt engineering, and building your first prototypes. Day 2 covers ethics, GDPR compliance, and developing company-specific AI solutions. You'll leave with working tools, not just theory.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">How realistic is the "ROI within first week" claim?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Based on 12 client implementations in Q4 2024, companies typically see immediate value through automated report generation and faster data analysis. The marine case study shows 85% time savings on risk assessments starting day one.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">What if our team has no technical background?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Perfect! Our workshops are designed for business professionals, not developers. We teach practical AI usage through user-friendly tools like ChatGPT and Microsoft Copilot. No coding required.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">How do you ensure GDPR compliance with AI tools?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We implement zero-trust security models and teach data anonymization techniques. All AI solutions include built-in compliance frameworks that meet Nordic regulatory standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">What support do we get after the workshop?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every workshop includes 90 days of email support, access to our video library, and monthly Q&A sessions. We also provide implementation templates and troubleshooting guides.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">How much does the workshop cost and what's included?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Investment varies by company size and requirements. All workshops include materials, templates, 90-day support, and access to our learning platform. Book a discovery call for personalized pricing.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.open('https://calendly.com/harka-ai-workshop', '_blank')}>
              Book Discovery Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-sm text-gray-500 mt-2">Still have questions? Let's discuss your specific needs</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.footerTitle}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t.footerSubtitle}
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.open('https://calendly.com/harka-ai-workshop', '_blank')}>
            Book Discovery Call
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white">48</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Hours</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Value</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white">∞</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Potential</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">HARKA</h3>
              <p className="text-gray-300 mb-4">{t.footerDescription}</p>
              <div className="space-y-2 text-sm text-gray-300">
                <div>hellyeah@harka.dk</div>
                <div>+45 29 12 83 81</div>
                <div>Danneskiold-Samsøes Allé 41, 1434 Copenhagen</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t.navigation}</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>Our method</div>
                <div>Results</div>
                <div>Team</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t.legal}</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>Privacy policy</div>
                <div>Cookie policy</div>
                <div>Terms and conditions</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2025 HARKA. {t.allRights}
          </div>
        </div>
      </footer>
    </div>
  )
}