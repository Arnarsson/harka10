"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Globe, 
  Layers,
  Grid3x3,
  Cpu,
  Compass
} from "lucide-react"

export function AbstractMinimalLanding() {
  const [language, setLanguage] = useState<'da' | 'en'>('da')
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem('harka-language') as 'da' | 'en'
    if (savedLang && (savedLang === 'da' || savedLang === 'en')) {
      setLanguage(savedLang)
    }

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)

    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail)
    }
    window.addEventListener('languageChange', handleLanguageChange as any)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('languageChange', handleLanguageChange as any)
    }
  }, [])

  if (!mounted) return null

  const t = {
    da: {
      tagline: "Fremtidens læring",
      headline: "AI der forstår dig",
      description: "Personaliseret læring gennem kunstig intelligens. Start din rejse med vores gratis AI-kompas.",
      startAssessment: "Start AI-vurdering",
      getStarted: "Kom i gang",
      learnMore: "Læs mere",
      features: "Funktioner",
      feature1Title: "Adaptiv læring",
      feature1Desc: "AI tilpasser indhold til dit tempo",
      feature2Title: "Øjeblikkelig feedback",
      feature2Desc: "Få svar og vejledning med det samme",
      feature3Title: "Målbar fremgang",
      feature3Desc: "Spor din udvikling i realtid",
      stats: {
        users: "10K+ brugere",
        completion: "95% gennemførelse",
        satisfaction: "4.9 rating"
      },
      cta: "Klar til at transformere din læring?",
      ctaButton: "Start gratis i dag"
    },
    en: {
      tagline: "Future of learning",
      headline: "AI that understands you",
      description: "Personalized learning through artificial intelligence. Start your journey with our free AI compass.",
      startAssessment: "Start AI Assessment",
      getStarted: "Get Started",
      learnMore: "Learn More",
      features: "Features",
      feature1Title: "Adaptive Learning",
      feature1Desc: "AI adapts content to your pace",
      feature2Title: "Instant Feedback",
      feature2Desc: "Get answers and guidance immediately",
      feature3Title: "Measurable Progress",
      feature3Desc: "Track your growth in real-time",
      stats: {
        users: "10K+ users",
        completion: "95% completion",
        satisfaction: "4.9 rating"
      },
      cta: "Ready to transform your learning?",
      ctaButton: "Start free today"
    }
  }

  const content = t[language]

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Abstract background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 mesh-gradient opacity-30 dark:opacity-20" />
        <div 
          className="decoration-circle w-96 h-96 -top-48 -right-48"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="decoration-circle w-[500px] h-[500px] -bottom-32 -left-32"
          style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>{content.tagline}</span>
              </div>
              
              <h1 className="text-foreground font-bold tracking-tight">
                {content.headline}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                {content.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/learn/ai-kompas">
                  <Button 
                    size="lg" 
                    className="btn-gradient group"
                  >
                    <Compass className="w-4 h-4 mr-2" />
                    {content.startAssessment}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <SignUpButton mode="modal">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-border/50 hover:bg-secondary/50"
                  >
                    {content.getStarted}
                  </Button>
                </SignUpButton>
              </div>

              {/* Quick stats */}
              <div className="flex gap-8 pt-8 border-t border-border/30">
                {Object.values(content.stats).map((stat, i) => (
                  <div key={i} className="text-sm">
                    <div className="font-semibold text-foreground">{stat}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Abstract visual element */}
            <div className="relative h-[500px] animate-float hidden lg:block">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Central shape */}
                  <div className="w-64 h-64 shape-blob gradient-abstract opacity-80 animate-morph" />
                  
                  {/* Orbiting elements */}
                  <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full glass flex items-center justify-center animate-pulse-soft">
                    <Cpu className="w-10 h-10 text-accent" />
                  </div>
                  
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-lg glass flex items-center justify-center animate-pulse-soft" style={{ animationDelay: '1s' }}>
                    <Grid3x3 className="w-12 h-12 text-accent" />
                  </div>
                  
                  <div className="absolute top-1/2 -right-16 w-16 h-16 shape-wave glass flex items-center justify-center animate-pulse-soft" style={{ animationDelay: '2s' }}>
                    <Layers className="w-8 h-8 text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{content.features}</h2>
            <div className="decoration-line w-32 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: content.feature1Title, desc: content.feature1Desc },
              { icon: Globe, title: content.feature2Title, desc: content.feature2Desc },
              { icon: Layers, title: content.feature3Title, desc: content.feature3Desc }
            ].map((feature, i) => (
              <div 
                key={i}
                className="card-minimal p-8 hover:scale-[1.02] transition-transform duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg gradient-subtle flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="glass rounded-2xl p-12 text-center space-y-6">
            <h2 className="text-3xl font-bold">{content.cta}</h2>
            <Link href="/learn/ai-kompas">
              <Button size="lg" className="btn-primary">
                <Sparkles className="w-4 h-4 mr-2" />
                {content.ctaButton}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}