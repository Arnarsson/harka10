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
import { useLanguage } from "@/lib/i18n/language-context"

export function PublicLanding() {
  const { language, t } = useLanguage()

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

  // AI-Kompas section using translations
  const aiKompasSection = {
    title: t.aiKompas,
    tagline: t.aiKompasTagline,
    description: t.aiKompasDescription,
    cta: t.aiKompasStartAssessment,
    benefits: [
      {
        title: t.aiKompasIdentifyPotential,
        description: t.aiKompasIdentifyPotentialDesc
      },
      {
        title: t.aiKompasExpectedRoi,
        description: t.aiKompasExpectedRoiDesc
      },
      {
        title: t.aiKompasQuickWins,
        description: t.aiKompasQuickWinsDesc
      }
    ]
  }

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
              {t.heroHeadline}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t.heroSubheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/learn/ai-kompas">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Compass className="h-4 w-4" />
                  {language === 'da' ? 'Start Gratis AI-Vurdering' : 'Start Free AI Assessment'}
                </Button>
              </Link>
              <SignUpButton mode="modal">
                <Button size="lg" variant="outline" className="gap-2">
                  {t.heroCta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </SignUpButton>
              <Link href="/demo/interactive-learning">
                <Button size="lg" variant="outline" className="gap-2">
                  <Play className="h-4 w-4" />
                  {language === 'da' ? 'Se Demo' : 'Watch Demo'}
                </Button>
              </Link>
            </div>
            <p className="text-center text-sm text-muted-foreground mb-6">
              <Sparkles className="inline h-4 w-4 mr-1 text-purple-600" />
              {language === 'da' ? 
                'Prøv vores AI Compass - ingen tilmelding påkrævet!' : 
                'Try our AI Compass - no signup required!'}
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {language === 'da' ? 'Ingen kreditkort påkrævet' : 'No credit card required'}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {language === 'da' ? '14-dages gratis prøveperiode' : '14-day free trial'}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {language === 'da' ? 'Opsig når som helst' : 'Cancel anytime'}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold">{t.statDays}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'da' ? 'På markedet' : 'Time to Value'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{t.statMonths}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'da' ? 'Implementeringstid' : 'Implementation Time'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{t.statAdmin}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'da' ? 'Reduktion i admin' : 'Admin Reduction'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{t.statRoi}</div>
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
            <h2 className="text-3xl font-bold mb-4">{aiKompasSection.title}</h2>
            <p className="text-xl text-muted-foreground mb-2">{aiKompasSection.tagline}</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">{aiKompasSection.description}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {aiKompasSection.benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/learn/ai-kompas">
              <Button size="lg" className="gap-2">
                <Compass className="h-4 w-4" />
                {aiKompasSection.cta}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.valueTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.valueSubtitle}
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
            <h2 className="text-3xl font-bold mb-4">{t.processTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'da' ? 
                'Få din organisation op at køre med AI på kun 2 dage' :
                'Get your organization running with AI in just 2 days'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>{t.day1Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {t.day1Items.map((item, index) => (
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
                <CardTitle>{t.day2Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {t.day2Items.map((item, index) => (
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
              {language === 'da' ? 'Hvad vores brugere siger' : 'What Our Learners Say'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'da' ? 
                'Bliv en del af tusindvis af tilfredse brugere som har transformeret deres karrierer' :
                'Join thousands of satisfied learners who have transformed their careers'}
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
            {language === 'da' ? 
              'Klar til at starte din læringsrejse?' :
              'Ready to Start Your Learning Journey?'}
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {language === 'da' ?
              'Bliv en del af tusindvis af brugere som fremmer deres karrierer med HARKA' :
              'Join thousands of learners who are advancing their careers with HARKA'}
          </p>
          <div className="flex gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button size="lg" variant="secondary">
                {t.heroCta}
              </Button>
            </SignUpButton>
            <Link href="/learn/ai-kompas">
              <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                {t.aiKompasStartAssessment}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">HARKA</h3>
              <p className="text-sm text-muted-foreground">
                {language === 'da' ?
                  'AI-drevet læringsplatform for den moderne arbejdsstyrke.' :
                  'AI-powered learning platform for the modern workforce.'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{language === 'da' ? 'Produkt' : 'Product'}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground">{language === 'da' ? 'Funktioner' : 'Features'}</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground">{language === 'da' ? 'Priser' : 'Pricing'}</Link></li>
                <li><Link href="/demo/interactive-learning" className="hover:text-foreground">Demo</Link></li>
                <li><Link href="/learn/ai-kompas" className="hover:text-foreground">AI-Kompas</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{language === 'da' ? 'Virksomhed' : 'Company'}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#about" className="hover:text-foreground">{language === 'da' ? 'Om os' : 'About'}</Link></li>
                <li><Link href="#team" className="hover:text-foreground">{t.team}</Link></li>
                <li><Link href="#blog" className="hover:text-foreground">{t.blog}</Link></li>
                <li><Link href="#contact" className="hover:text-foreground">{t.contact}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{language === 'da' ? 'Juridisk' : 'Legal'}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground">{language === 'da' ? 'Privatliv' : 'Privacy'}</Link></li>
                <li><Link href="/terms" className="hover:text-foreground">{language === 'da' ? 'Vilkår' : 'Terms'}</Link></li>
                <li><Link href="/security" className="hover:text-foreground">{language === 'da' ? 'Sikkerhed' : 'Security'}</Link></li>
                <li><Link href="/gdpr" className="hover:text-foreground">GDPR</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 HARKA. {language === 'da' ? 'Alle rettigheder forbeholdes.' : 'All rights reserved.'}
          </div>
        </div>
      </footer>
    </div>
  )
}