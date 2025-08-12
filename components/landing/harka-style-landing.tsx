"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { 
  ArrowRight, 
  Check,
  ChevronRight,
  Clock,
  Users,
  Zap,
  Target,
  Shield,
  Calendar,
  BarChart3,
  Brain,
  Rocket,
  Building2,
  MessageSquare
} from "lucide-react"

export function HarkaStyleLanding() {
  const [language, setLanguage] = useState<'da' | 'en'>('da')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem('harka-language') as 'da' | 'en'
    if (savedLang && (savedLang === 'da' || savedLang === 'en')) {
      setLanguage(savedLang)
    }

    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail)
    }
    window.addEventListener('languageChange', handleLanguageChange as any)
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as any)
    }
  }, [])

  if (!mounted) return null

  const t = {
    da: {
      // Hero
      heroTag: "AI-implementering for danske virksomheder",
      heroTitle: "Fra idé til implementering på kun 48 timer",
      heroSubtitle: "Vi hjælper danske virksomheder med at implementere AI-løsninger, der skaber værdi fra dag ét. Ingen buzzwords, kun resultater.",
      ctaPrimary: "Book et møde",
      ctaSecondary: "Se hvordan",
      
      // Stats
      stat1Value: "48 timer",
      stat1Label: "Fra start til færdig løsning",
      stat2Value: "30%",
      stat2Label: "Reduktion i manuelle opgaver",
      stat3Value: "3-6 mdr",
      stat3Label: "Kortere implementering",
      
      // Process
      processTitle: "Vores 48-timers proces",
      processSubtitle: "Struktureret tilgang der sikrer resultater",
      
      process1Title: "Dag 1: Kortlægning",
      process1Desc: "Vi analyserer jeres arbejdsgange og identificerer de mest værdifulde AI-muligheder",
      process1Items: ["Workshop med nøglemedarbejdere", "Proces-mapping", "ROI-beregning"],
      
      process2Title: "Dag 2: Implementering",
      process2Desc: "Vi opsætter og træner de valgte AI-løsninger sammen med jeres team",
      process2Items: ["Opsætning af værktøjer", "Hands-on træning", "Dokumentation"],
      
      process3Title: "Efterfølgende: Support",
      process3Desc: "30 dages support sikrer succesfuld adoption i hele organisationen",
      process3Items: ["Ugentlige check-ins", "Justering af workflows", "Måling af resultater"],
      
      // Barriers
      barriersTitle: "Hvorfor fejler 70% af AI-projekter?",
      barrier1: "Manglende forståelse af muligheder",
      barrier2: "For teknisk tilgang",
      barrier3: "Ingen klar implementeringsplan",
      barrier4: "Manglende medarbejderinddragelse",
      
      // Results
      resultsTitle: "Dokumenterede resultater",
      result1Company: "Dansk Produktionsvirksomhed",
      result1Text: "Sparede 4 timer dagligt på ordrebehandling med AI-automatisering",
      result2Company: "Rådgivningsvirksomhed",
      result2Text: "Reducerede rapporteringstid med 60% gennem intelligent dokumenthåndtering",
      result3Company: "E-handelsvirksomhed",
      result3Text: "Forbedrede kundeservice og sparede 2 FTE med AI-chatbot",
      
      // CTA
      ctaTitle: "Klar til at komme i gang?",
      ctaSubtitle: "Book et uforpligtende møde og hør hvordan AI kan transformere jeres forretning",
      ctaButton: "Book møde nu",
      ctaNote: "Ingen binding · Gratis konsultation · Resultater fra dag 1"
    },
    en: {
      // Hero
      heroTag: "AI implementation for Danish companies",
      heroTitle: "From idea to implementation in just 48 hours",
      heroSubtitle: "We help Danish companies implement AI solutions that create value from day one. No buzzwords, only results.",
      ctaPrimary: "Book a meeting",
      ctaSecondary: "See how",
      
      // Stats
      stat1Value: "48 hours",
      stat1Label: "From start to finished solution",
      stat2Value: "30%",
      stat2Label: "Reduction in manual tasks",
      stat3Value: "3-6 mo",
      stat3Label: "Shorter implementation",
      
      // Process
      processTitle: "Our 48-hour process",
      processSubtitle: "Structured approach that ensures results",
      
      process1Title: "Day 1: Mapping",
      process1Desc: "We analyze your workflows and identify the most valuable AI opportunities",
      process1Items: ["Workshop with key employees", "Process mapping", "ROI calculation"],
      
      process2Title: "Day 2: Implementation",
      process2Desc: "We set up and train the selected AI solutions with your team",
      process2Items: ["Tool setup", "Hands-on training", "Documentation"],
      
      process3Title: "Follow-up: Support",
      process3Desc: "30 days of support ensures successful adoption throughout the organization",
      process3Items: ["Weekly check-ins", "Workflow adjustments", "Results measurement"],
      
      // Barriers
      barriersTitle: "Why do 70% of AI projects fail?",
      barrier1: "Lack of understanding opportunities",
      barrier2: "Too technical approach",
      barrier3: "No clear implementation plan",
      barrier4: "Missing employee involvement",
      
      // Results
      resultsTitle: "Documented results",
      result1Company: "Danish Manufacturing Company",
      result1Text: "Saved 4 hours daily on order processing with AI automation",
      result2Company: "Consulting Firm",
      result2Text: "Reduced reporting time by 60% through intelligent document handling",
      result3Company: "E-commerce Company",
      result3Text: "Improved customer service and saved 2 FTE with AI chatbot",
      
      // CTA
      ctaTitle: "Ready to get started?",
      ctaSubtitle: "Book a non-binding meeting and hear how AI can transform your business",
      ctaButton: "Book meeting now",
      ctaNote: "No commitment · Free consultation · Results from day 1"
    }
  }

  const content = t[language]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Clean and Professional */}
      <section className="relative py-20 md:py-32">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-sm font-medium mb-6">
              <Zap className="w-3 h-3" />
              {content.heroTag}
            </div>
            
            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              {content.heroTitle}
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              {content.heroSubtitle}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/learn/ai-kompas">
                <Button size="lg" className="font-semibold">
                  {content.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                {content.ctaSecondary}
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t">
            <div>
              <div className="text-4xl font-bold text-primary">{content.stat1Value}</div>
              <div className="text-sm text-muted-foreground mt-1">{content.stat1Label}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">{content.stat2Value}</div>
              <div className="text-sm text-muted-foreground mt-1">{content.stat2Label}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">{content.stat3Value}</div>
              <div className="text-sm text-muted-foreground mt-1">{content.stat3Label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.processTitle}</h2>
            <p className="text-lg text-muted-foreground">{content.processSubtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Day 1 */}
            <Card className="p-6 border-0 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{content.process1Title}</h3>
              </div>
              <p className="text-muted-foreground mb-4">{content.process1Desc}</p>
              <ul className="space-y-2">
                {content.process1Items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            
            {/* Day 2 */}
            <Card className="p-6 border-0 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{content.process2Title}</h3>
              </div>
              <p className="text-muted-foreground mb-4">{content.process2Desc}</p>
              <ul className="space-y-2">
                {content.process2Items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            
            {/* Support */}
            <Card className="p-6 border-0 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{content.process3Title}</h3>
              </div>
              <p className="text-muted-foreground mb-4">{content.process3Desc}</p>
              <ul className="space-y-2">
                {content.process3Items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Barriers Section */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              {content.barriersTitle}
            </h2>
            <div className="space-y-4">
              {[content.barrier1, content.barrier2, content.barrier3, content.barrier4].map((barrier, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-destructive font-bold">{i + 1}</span>
                  </div>
                  <p className="text-lg">{barrier}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {content.resultsTitle}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-0 shadow-sm">
              <Building2 className="w-8 h-8 text-primary mb-4" />
              <div className="font-semibold mb-2">{content.result1Company}</div>
              <p className="text-muted-foreground">{content.result1Text}</p>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <MessageSquare className="w-8 h-8 text-primary mb-4" />
              <div className="font-semibold mb-2">{content.result2Company}</div>
              <p className="text-muted-foreground">{content.result2Text}</p>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <BarChart3 className="w-8 h-8 text-primary mb-4" />
              <div className="font-semibold mb-2">{content.result3Company}</div>
              <p className="text-muted-foreground">{content.result3Text}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content.ctaTitle}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {content.ctaSubtitle}
          </p>
          <Link href="/learn/ai-kompas">
            <Button size="lg" className="font-semibold">
              {content.ctaButton}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            {content.ctaNote}
          </p>
        </div>
      </section>
    </div>
  )
}