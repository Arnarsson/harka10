"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { 
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Users,
  Brain,
  BookOpen,
  Award,
  TrendingUp,
  Globe,
  Shield,
  Play,
  ChevronRight,
  Sparkles,
  BarChart,
  Video,
  MessageSquare,
  Clock,
  Target,
  Compass
} from "lucide-react"
import { useState, useEffect } from "react"

export function PublicLanding() {
  const [language, setLanguage] = useState<'da' | 'en'>('da')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load language from localStorage
    const savedLang = localStorage.getItem('harka-language') as 'da' | 'en'
    if (savedLang && (savedLang === 'da' || savedLang === 'en')) {
      setLanguage(savedLang)
    }

    // Listen for language changes
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail)
    }
    window.addEventListener('languageChange', handleLanguageChange as any)
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as any)
    }
  }, [])

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  const t = {
    da: {
      heroTitle: "Transform dine færdigheder med HARKA",
      heroSubtitle: "Oplev fremtiden for læring med AI-drevet personalisering, interaktivt indhold og et levende fællesskab af lærende.",
      startFreeAssessment: "Start Gratis AI-Vurdering",
      getStarted: "Kom i gang",
      watchDemo: "Se Demo",
      tryAICompass: "Prøv vores AI Compass - ingen tilmelding påkrævet!",
      noCreditCard: "Ingen kreditkort påkrævet",
      freeTrial: "14-dages gratis prøveperiode",
      cancelAnytime: "Opsig når som helst",
      everythingYouNeed: "Alt hvad du behøver for at lykkes",
      platformDescription: "Vores omfattende platform giver alle de værktøjer og ressourcer, du har brug for til effektiv læring",
      aiKompas: "AI-Kompas",
      aiKompasTagline: "Dit AI-potentiale kortlagt på få minutter",
      aiKompasDescription: "Få en skræddersyet rapport der identificerer dine konkrete AI-muligheder.",
      identifyPotential: "Identificér potentiale",
      identifyPotentialDesc: "Find de områder hvor AI kan gøre størst forskel",
      expectedRoi: "Forventet ROI",
      expectedRoiDesc: "Se konkrete tal på værdiskabelsen",
      quickWins: "Quick wins",
      quickWinsDesc: "Start med de nemme gevinster først",
      twoDay: "2-dages proces",
      getStartedIn2Days: "Få din organisation op at køre med AI på kun 2 dage",
      day1: "Dag 1: AI Grundlag",
      day1Items: [
        "Forstå AI-teknologiens muligheder",
        "Identificér jeres use cases",
        "Hands-on med AI-værktøjer",
        "Workshop: Prompting og best practices"
      ],
      day2: "Dag 2: Implementering",
      day2Items: [
        "Udvikling af jeres AI-strategi",
        "Opsætning af første løsninger",
        "Træning af medarbejdere",
        "Roadmap for de næste 90 dage"
      ],
      whatLearnersay: "Hvad vores brugere siger",
      joinThousands: "Bliv en del af tusindvis af tilfredse brugere som har transformeret deres karrierer",
      readyToStart: "Klar til at starte din læringsrejse?",
      joinLearners: "Bliv en del af tusindvis af brugere som fremmer deres karrierer med HARKA",
      allRightsReserved: "Alle rettigheder forbeholdes."
    },
    en: {
      heroTitle: "Transform Your Skills with HARKA",
      heroSubtitle: "Experience the future of learning with AI-powered personalization, interactive content, and a vibrant community of learners.",
      startFreeAssessment: "Start Free AI Assessment",
      getStarted: "Get Started",
      watchDemo: "Watch Demo",
      tryAICompass: "Try our AI Compass - no signup required!",
      noCreditCard: "No credit card required",
      freeTrial: "14-day free trial",
      cancelAnytime: "Cancel anytime",
      everythingYouNeed: "Everything You Need to Succeed",
      platformDescription: "Our comprehensive platform provides all the tools and resources you need for effective learning",
      aiKompas: "AI Compass",
      aiKompasTagline: "Your AI potential mapped in minutes",
      aiKompasDescription: "Get a customized report that identifies your specific AI opportunities.",
      identifyPotential: "Identify Potential",
      identifyPotentialDesc: "Find the areas where AI can make the biggest difference",
      expectedRoi: "Expected ROI",
      expectedRoiDesc: "See concrete numbers on value creation",
      quickWins: "Quick Wins",
      quickWinsDesc: "Start with the easy wins first",
      twoDay: "2-Day Process",
      getStartedIn2Days: "Get your organization running with AI in just 2 days",
      day1: "Day 1: AI Foundation",
      day1Items: [
        "Understand AI technology opportunities",
        "Identify your use cases",
        "Hands-on with AI tools",
        "Workshop: Prompting and best practices"
      ],
      day2: "Day 2: Implementation",
      day2Items: [
        "Develop your AI strategy",
        "Set up first solutions",
        "Train employees",
        "Roadmap for the next 90 days"
      ],
      whatLearnersay: "What Our Learners Say",
      joinThousands: "Join thousands of satisfied learners who have transformed their careers",
      readyToStart: "Ready to Start Your Learning Journey?",
      joinLearners: "Join thousands of learners who are advancing their careers with HARKA",
      allRightsReserved: "All rights reserved."
    }
  }

  const content = t[language]

  const features = [
    {
      icon: Brain,
      title: language === 'da' ? 'AI-Drevet Læring' : 'AI-Powered Learning',
      description: language === 'da' ? 
        'Personlige læringsstier der tilpasser sig dit tempo og stil' :
        'Personalized learning paths that adapt to your pace and style'
    },
    {
      icon: Video,
      title: language === 'da' ? 'Interaktive Videolektioner' : 'Interactive Video Lessons',
      description: language === 'da' ?
        'Engagerende videoindhold med realtidsinteraktioner og quizzer' :
        'Engaging video content with real-time interactions and quizzes'
    },
    {
      icon: Users,
      title: language === 'da' ? 'Samarbejdslæring' : 'Collaborative Learning',
      description: language === 'da' ?
        'Lær sammen i Power Hour-sessioner og diskussionsfora' :
        'Learn together in Power Hour sessions and discussion forums'
    },
    {
      icon: BarChart,
      title: language === 'da' ? 'Fremskridtssporing' : 'Progress Tracking',
      description: language === 'da' ?
        'Detaljeret analyser for at overvåge din læringsrejse' :
        'Detailed analytics to monitor your learning journey'
    },
    {
      icon: Award,
      title: language === 'da' ? 'Certificeringer' : 'Certifications',
      description: language === 'da' ?
        'Optjen anerkendte certifikater ved kursusafslutning' :
        'Earn recognized certificates upon course completion'
    },
    {
      icon: Globe,
      title: language === 'da' ? 'Flersproget Support' : 'Multi-language Support',
      description: language === 'da' ?
        'Lær på dit foretrukne sprog med fuld lokalisering' :
        'Learn in your preferred language with full localization'
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: language === 'da' ? 'Produktleder' : 'Product Manager',
      company: "TechCorp",
      content: language === 'da' ?
        "HARKA transformerede hvordan vores team lærer. De AI-drevne anbefalinger hjalp os med at opgradere 3x hurtigere." :
        "HARKA transformed how our team learns. The AI-powered recommendations helped us upskill 3x faster.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: language === 'da' ? 'Softwareudvikler' : 'Software Developer',
      company: "StartupXYZ",
      content: language === 'da' ?
        "De interaktive lektioner og kodelegepladsen gjorde det sjovt og praktisk at lære nye teknologier." :
        "The interactive lessons and code playground made learning new technologies enjoyable and practical.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: language === 'da' ? 'HR-direktør' : 'HR Director',
      company: "GlobalCo",
      content: language === 'da' ?
        "Vi har set en 40% forbedring i medarbejderengagement siden implementeringen af HARKAs læringsplatform." :
        "We've seen a 40% improvement in employee engagement since implementing HARKA's learning platform.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              {language === 'da' ? 'AI-Drevet Læringsplatform' : 'AI-Powered Learning Platform'}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {content.heroTitle}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {content.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/learn/ai-kompas">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Compass className="h-4 w-4" />
                  {content.startFreeAssessment}
                </Button>
              </Link>
              <SignUpButton mode="modal">
                <Button size="lg" variant="outline" className="gap-2">
                  {content.getStarted}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </SignUpButton>
              <Link href="/demo/interactive-learning">
                <Button size="lg" variant="outline" className="gap-2">
                  <Play className="h-4 w-4" />
                  {content.watchDemo}
                </Button>
              </Link>
            </div>
            <p className="text-center text-sm text-muted-foreground mb-6">
              <Sparkles className="inline h-4 w-4 mr-1 text-purple-600" />
              {content.tryAICompass}
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {content.noCreditCard}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {content.freeTrial}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {content.cancelAnytime}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold">48h</div>
              <div className="text-sm text-muted-foreground">
                {language === 'da' ? 'På markedet' : 'Time to Value'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">2-4m</div>
              <div className="text-sm text-muted-foreground">
                {language === 'da' ? 'Implementeringstid' : 'Implementation Time'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">30%</div>
              <div className="text-sm text-muted-foreground">
                {language === 'da' ? 'Reduktion i admin' : 'Admin Reduction'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">300%</div>
              <div className="text-sm text-muted-foreground">
                {language === 'da' ? 'Gennemsnitlig ROI' : 'Average ROI'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Kompas Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20" id="ai-kompas">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Compass className="h-12 w-12 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">{content.aiKompas}</h2>
            <p className="text-xl text-muted-foreground mb-2">{content.aiKompasTagline}</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">{content.aiKompasDescription}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{content.identifyPotential}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{content.identifyPotentialDesc}</CardDescription>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{content.expectedRoi}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{content.expectedRoiDesc}</CardDescription>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{content.quickWins}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{content.quickWinsDesc}</CardDescription>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Link href="/learn/ai-kompas">
              <Button size="lg" className="gap-2">
                <Compass className="h-4 w-4" />
                {content.startFreeAssessment}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{content.everythingYouNeed}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {content.platformDescription}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{content.twoDay}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {content.getStartedIn2Days}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>{content.day1}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {content.day1Items.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{content.day2}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {content.day2Items.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {content.whatLearnersay}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {content.joinThousands}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <CardDescription className="text-base">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {content.readyToStart}
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {content.joinLearners}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/learn/ai-kompas">
              <Button size="lg" variant="secondary" className="gap-2">
                <Compass className="h-4 w-4" />
                {content.startFreeAssessment}
              </Button>
            </Link>
            <SignUpButton mode="modal">
              <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                {content.getStarted}
              </Button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 HARKA. {content.allRightsReserved}
          </div>
        </div>
      </footer>
    </div>
  )
}