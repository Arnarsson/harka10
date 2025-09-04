"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  PlayCircle, 
  Clock, 
  Users, 
  CheckCircle2,
  FileText,
  Coffee,
  Utensils,
  BookOpen,
  Target,
  Shield,
  Lightbulb,
  Settings,
  Calendar,
  Globe,
  Award
} from "lucide-react"

export function DanishCurriculum() {
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1)
  const [language, setLanguage] = useState<'da' | 'en'>('da')

  const content = {
    da: {
      title: "Strategisk AI-workshop (2 dage)",
      subtitle: "Skræddersyet til VMS Group: to undervisere, ChatGPT & Copilot, strategi og hands-on",
      day: "Dag",
      overview: "Oversigt",
      modules: "Moduler",
      schedule: "Program",
      resources: "Ressourcer",
      duration: "Varighed",
      participants: "Deltagere",
      level: "Niveau",
      language: "Sprog",
      certificate: "Certifikat",
      getStarted: "Kom i gang",
      bookWorkshop: "Book intro-kald",
      day1Title: "ChatGPT & Microsoft Copilot – effektiv anvendelse",
      day2Title: "Strategi, ansvarlig brug og praktisk workshop",
      break: "Pause",
      lunch: "Frokostpause",
      coffee: "Kaffepause"
    },
    en: {
      title: "Strategic AI Workshop (2 days)",
      subtitle: "Tailored for VMS Group: two instructors, ChatGPT & Copilot, strategy and hands-on",
      day: "Day",
      overview: "Overview",
      modules: "Modules",
      schedule: "Schedule",
      resources: "Resources", 
      duration: "Duration",
      participants: "Participants",
      level: "Level",
      language: "Language",
      certificate: "Certificate",
      getStarted: "Get started",
      bookWorkshop: "Book intro call",
      day1Title: "ChatGPT & Microsoft Copilot – effective use",
      day2Title: "Strategy, responsible use and hands-on workshop",
      break: "Break",
      lunch: "Lunch break",
      coffee: "Coffee break"
    }
  }

  const t = content[language]

  const workshopOverview = {
    duration: "2 dage (3 timer pr. session)",
    participants: "Maks. 10-15 pr. hold",
    level: "Begynder til mellemliggende",
    language: "Dansk",
    certificate: "HARKA AI-certifikat",
    price: "30.000 DKK ekskl. moms (≈1.000 DKK pr. medarbejder)"
  }

  const day1Schedule = [
    {
      time: "09:00-09:15",
      title: "Velkomst og mål",
      titleEn: "Welcome & objectives",
      type: "welcome",
      icon: Users,
      description: "Introduktion til forløbet og fokus på praktisk værdi for VMS",
      descriptionEn: "Introduction and focus on practical value for VMS"
    },
    {
      time: "09:15-12:15",
      title: "Formiddag (Hold A): ChatGPT – Effektiv anvendelse",
      titleEn: "Morning (Group A): ChatGPT – Effective use",
      type: "workshop",
      icon: Settings,
      description: "Introduktion til ChatGPT, prompt engineering og praktiske øvelser i optimering af interne processer (servicerapporter, dokumentation, kommunikation)",
      descriptionEn: "Intro to ChatGPT, prompt engineering and practical exercises focused on internal processes (service reports, documentation, communication)"
    },
    {
      time: "09:15-12:15",
      title: "Formiddag (Hold B): Microsoft Copilot – Effektiv anvendelse",
      titleEn: "Morning (Group B): Microsoft Copilot – Effective use",
      type: "workshop",
      icon: Settings,
      description: "Copilot i Word, Excel, PowerPoint og Teams – praktiske øvelser i dokumentoprettelse, dataanalyse og samarbejde",
      descriptionEn: "Copilot in Word, Excel, PowerPoint and Teams – practical exercises in document creation, data analysis and collaboration"
    },
    {
      time: "12:15-13:00",
      title: "Frokostpause",
      titleEn: "Lunch Break",
      type: "lunch",
      icon: Utensils,
      description: "Netværk og diskussion",
      descriptionEn: "Networking and discussion"
    },
    {
      time: "13:00-16:00",
      title: "Eftermiddag: Hold A og Hold B bytter moduler",
      titleEn: "Afternoon: Groups swap modules",
      type: "workshop",
      icon: Target,
      description: "Hold A: Microsoft Copilot · Hold B: ChatGPT – med fokus på virksomhedens egne dokumenter og flows",
      descriptionEn: "Group A: Microsoft Copilot · Group B: ChatGPT – applied to the company’s documents and flows"
    }
  ]

  const day2Schedule = [
    {
      time: "09:00-12:00",
      title: "Strategi og struktur – Effektiv anvendelse",
      titleEn: "Strategy & structure – Effective use",
      type: "lecture",
      icon: BookOpen,
      description: "Identifikation af workflows med AI-potentiale, effektivisering/automatisering og retningslinjer for ansvarlig brug (etik, kvalitet, governance)",
      descriptionEn: "Identify workflows with AI potential, efficiency/automation and guidelines for responsible use (ethics, quality, governance)"
    },
    {
      time: "12:00-13:00",
      title: "Frokostpause",
      titleEn: "Lunch Break",
      type: "lunch",
      icon: Utensils,
      description: "Netværk og refleksion",
      descriptionEn: "Networking and reflection"
    },
    {
      time: "13:00-15:00",
      title: "Praktisk anvendelse & workshop",
      titleEn: "Practical application & workshop",
      type: "workshop",
      icon: Target,
      description: "Deltagerne arbejder med virksomhedens egne cases og udvikler klar-til-brug løsninger",
      descriptionEn: "Participants work on company-specific cases and develop ready-to-use solutions"
    },
    {
      time: "15:00-16:00",
      title: "Præsentation og opsamling",
      titleEn: "Presentations & wrap-up",
      type: "discussion",
      icon: Award,
      description: "Gruppepræsentationer, fælles diskussion om implementering og næste skridt",
      descriptionEn: "Group presentations, discussion on implementation and next steps"
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'welcome':
      case 'discussion':
        return Users
      case 'lecture':
      case 'review':
        return BookOpen
      case 'workshop':
        return Target
      case 'break':
        return Coffee
      case 'lunch':
        return Utensils
      default:
        return BookOpen
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'welcome':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
      case 'lecture':
      case 'review':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
      case 'workshop':
        return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
      case 'break':
      case 'lunch':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300'
      case 'discussion':
        return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-300'
    }
  }

  const currentSchedule = selectedDay === 1 ? day1Schedule : day2Schedule

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground mt-2">{t.subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setLanguage('da')}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                language === 'da'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              🇩🇰 DA
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                language === 'en'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              🇬🇧 EN
            </button>
          </div>
          <Button>
            {t.bookWorkshop}
          </Button>
        </div>
      </div>

      {/* Workshop Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            {t.overview}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{t.duration}</p>
                <p className="text-xs text-muted-foreground">{workshopOverview.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{t.participants}</p>
                <p className="text-xs text-muted-foreground">{workshopOverview.participants}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{t.level}</p>
                <p className="text-xs text-muted-foreground">{workshopOverview.level}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{t.language}</p>
                <p className="text-xs text-muted-foreground">{workshopOverview.language}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{t.certificate}</p>
                <p className="text-xs text-muted-foreground">{workshopOverview.certificate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Pris</p>
                <p className="text-xs text-muted-foreground">{workshopOverview.price}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practical Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {language === 'da' ? 'Praktiske detaljer' : 'Practical details'}
          </CardTitle>
          <CardDescription>
            {language === 'da'
              ? 'To undervisere – større værdi. Fokus på målbare forbedringer og klar-til-brug løsninger.'
              : 'Two instructors – higher value. Focus on measurable improvements and ready-to-use solutions.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• {language === 'da' ? 'Deltagere: maks. 10–15 pr. hold' : 'Participants: max 10–15 per group'}</li>
            <li>• {language === 'da' ? 'Varighed: 3 timer pr. session (formiddag/eftermiddag)' : 'Duration: 3 hours per session (morning/afternoon)'}</li>
            <li>• {language === 'da' ? 'Tidspunkt: tilpasses jeres behov (inkl. pauser)' : 'Timing: tailored to your needs (incl. breaks)'}</li>
            <li>• {language === 'da' ? 'Sted: VMS hovedkontor eller efter aftale' : 'Location: VMS HQ or by agreement'}</li>
            <li>• {language === 'da' ? 'Pris: 30.000 DKK ekskl. moms' : 'Price: 30,000 DKK excl. VAT'}</li>
            <li>• {language === 'da' ? 'Inkluderer: forberedelse og afholdelse, materialer (videoer, slides, vejledninger) samt 1 års opfølgende support' : 'Includes: preparation and delivery, materials (videos, slides, guides) and 1 year of follow-up support'}</li>
          </ul>
        </CardContent>
      </Card>

      {/* Day Selection */}
      <div className="flex items-center gap-4">
        <Button
          variant={selectedDay === 1 ? "default" : "outline"}
          onClick={() => setSelectedDay(1)}
        >
          {t.day} 1: {language === 'da' ? t.day1Title : 'Basic AI Tools & Techniques'}
        </Button>
        <Button
          variant={selectedDay === 2 ? "default" : "outline"}
          onClick={() => setSelectedDay(2)}
        >
          {t.day} 2: {language === 'da' ? t.day2Title : 'Ethics & Practical Application'}
        </Button>
      </div>

      {/* Schedule Display */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t.day} {selectedDay}: {language === 'da' ? 
              (selectedDay === 1 ? t.day1Title : t.day2Title) :
              (selectedDay === 1 ? 'ChatGPT & Microsoft Copilot – effective use' : 'Strategy, responsible use and hands-on workshop')
            }
          </CardTitle>
          <CardDescription>
            Detaljeret program for dag {selectedDay} af HARKA AI Workshop
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentSchedule.map((session, index) => {
              const IconComponent = getTypeIcon(session.type)
              return (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className={`p-2 rounded-lg ${getTypeColor(session.type)}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs font-mono">
                        {session.time}
                      </Badge>
                      <h3 className="font-medium">
                        {language === 'da' ? session.title : session.titleEn}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'da' ? session.description : session.descriptionEn}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Learning Outcomes */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Læringsmål - {t.day} {selectedDay}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {selectedDay === 1 ? [
                "Anvende ChatGPT effektivt til daglige processer",
                "Udnytte Microsoft Copilot i O365 (Word/Excel/PP/Teams)",
                "Skrive præcise prompts til kvalitet og konsistens",
                "Omsætte viden til konkrete forbedringer i egne workflows"
              ] : [
                "Identificere højværdiprocesser for AI-optimering",
                "Udarbejde retningslinjer for ansvarlig AI-brug",
                "Bygge klar-til-brug løsninger på egne cases",
                "Planlægge implementering og næste skridt"
              ].map((outcome, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{outcome}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t.resources} - {t.day} {selectedDay}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {selectedDay === 1 ? [
                "ChatGPT Prompt Toolkit (øvelser og skabeloner)",
                "Microsoft Copilot øvelser (Word/Excel/PP/Teams)",
                "Procescheckliste til interne forbedringer",
                "Videomateriale og slides (efterfølgende adgang)"
              ] : [
                "Skabelon: Retningslinjer for ansvarlig AI-brug",
                "Kravspec og use case-ramme til workshop",
                "Implementeringscheckliste og næste skridt",
                "Adgang til opdaterede ressourcer i 12 måneder"
              ].map((resource, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span className="text-sm">{resource}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">{language === 'da' ? 'Klar til at accelerere AI hos VMS?' : 'Ready to accelerate AI at VMS?'}</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {language === 'da'
              ? 'To undervisere – større værdi. Skræddersyet 2-dages forløb med ChatGPT & Copilot, strategi og hands-on. Inkluderer materialer og 1 års opfølgende support.'
              : 'Two instructors – higher value. Tailored 2-day program with ChatGPT & Copilot, strategy and hands-on. Includes materials and 1 year of follow-up support.'}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg">
              {t.bookWorkshop}
            </Button>
            <Button size="lg" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              {language === 'da' ? 'Se ledige datoer' : 'See available dates'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
