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
      title: "HARKA AI Workshop",
      subtitle: "2-dages intensiv AI træning for danske virksomheder",
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
      bookWorkshop: "Book workshop",
      day1Title: "Grundlæggende AI-værktøjer og -teknikker",
      day2Title: "Etik og praktisk anvendelse",
      break: "Pause",
      lunch: "Frokostpause",
      coffee: "Kaffepause"
    },
    en: {
      title: "HARKA AI Workshop",
      subtitle: "2-day intensive AI training for Danish companies",
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
      bookWorkshop: "Book workshop",
      day1Title: "Basic AI Tools & Techniques",
      day2Title: "Ethics & Practical Application",
      break: "Break",
      lunch: "Lunch break",
      coffee: "Coffee break"
    }
  }

  const t = content[language]

  const workshopOverview = {
    duration: "2 dage / 2 days",
    participants: "8-12 personer",
    level: "Begynder til mellemliggende",
    language: "Dansk / English",
    certificate: "HARKA AI Certification",
    price: "DKK 12.500 per deltager"
  }

  const day1Schedule = [
    {
      time: "09:00-09:30",
      title: "Velkomst og Bullseye-Introduktion",
      titleEn: "Welcome & Bullseye Introduction",
      type: "welcome",
      icon: Users,
      description: "Velkomst, præsentationer og introduktion til Bullseye-metaforen",
      descriptionEn: "Welcome, presentations and introduction to the Bullseye metaphor"
    },
    {
      time: "09:30-10:15",
      title: "Model-overblik",
      titleEn: "Model Overview", 
      type: "lecture",
      icon: BookOpen,
      description: "Oversigt over AI-modeller og deres anvendelser",
      descriptionEn: "Overview of AI models and their applications"
    },
    {
      time: "10:15-10:30",
      title: "Kaffepause",
      titleEn: "Coffee Break",
      type: "break",
      icon: Coffee,
      description: "Kort pause til afslapning og netværk",
      descriptionEn: "Short break for relaxation and networking"
    },
    {
      time: "10:30-12:00",
      title: "Prompt Engineering & Custom Instructions",
      titleEn: "Prompt Engineering & Custom Instructions",
      type: "workshop", 
      icon: Settings,
      description: "Hands-on træning i effektive prompts og custom instructions",
      descriptionEn: "Hands-on training in effective prompts and custom instructions"
    },
    {
      time: "12:00-13:00",
      title: "Frokostpause",
      titleEn: "Lunch Break",
      type: "lunch",
      icon: Utensils,
      description: "Netværk og diskussion over frokost",
      descriptionEn: "Networking and discussion over lunch"
    },
    {
      time: "13:00-14:30",
      title: "Hallucination & Bias",
      titleEn: "Hallucination & Bias",
      type: "lecture",
      icon: Shield,
      description: "Forståelse af AI-begrænsninger og bias-problematikker",
      descriptionEn: "Understanding AI limitations and bias issues"
    },
    {
      time: "14:30-16:00", 
      title: "Projekter & 'Deep Research'",
      titleEn: "Projects & 'Deep Research'",
      type: "workshop",
      icon: Target,
      description: "Arbejde med store datasæt og dybdegående analyser",
      descriptionEn: "Working with large datasets and in-depth analysis"
    },
    {
      time: "16:00-16:30",
      title: "Spørgsmål & Opsamling",
      titleEn: "Q&A & Summary",
      type: "discussion",
      icon: Lightbulb,
      description: "Åben diskussion og næste skridt",
      descriptionEn: "Open discussion and next steps"
    }
  ]

  const day2Schedule = [
    {
      time: "09:00-09:30",
      title: "Opsummering af dag 1",
      titleEn: "Day 1 Summary",
      type: "review",
      icon: BookOpen,
      description: "Gennemgang med AI-genereret resumé",
      descriptionEn: "Review with AI-generated summary"
    },
    {
      time: "09:30-11:00",
      title: "Etiske overvejelser",  
      titleEn: "Ethical Considerations",
      type: "lecture",
      icon: Shield,
      description: "GDPR, datasikkerhed og Zero Trust principper",
      descriptionEn: "GDPR, data security and Zero Trust principles"
    },
    {
      time: "11:00-11:15",
      title: "Kaffepause",
      titleEn: "Coffee Break", 
      type: "break",
      icon: Coffee,
      description: "Kort pause og diskussion",
      descriptionEn: "Short break and discussion"
    },
    {
      time: "11:15-13:00",
      title: "Workshops med virksomhedsspecifikke use cases",
      titleEn: "Company-specific Use Case Workshops",
      type: "workshop",
      icon: Target,
      description: "Udvikling af AI-løsninger til reelle scenarier",
      descriptionEn: "Development of AI solutions for real scenarios"
    },
    {
      time: "13:00-14:00", 
      title: "Frokostpause",
      titleEn: "Lunch Break",
      type: "lunch",
      icon: Utensils,
      description: "Netværk og refleksion",
      descriptionEn: "Networking and reflection"
    },
    {
      time: "14:00-15:00",
      title: "Pitching-øvelse",
      titleEn: "Pitching Exercise", 
      type: "workshop",
      icon: Users,
      description: "Præsentation af AI-løsninger til stakeholders",
      descriptionEn: "Presentation of AI solutions to stakeholders"
    },
    {
      time: "15:00-15:45",
      title: "Identifikation af automatiseringsmuligheder",
      titleEn: "Automation Opportunity Identification",
      type: "workshop", 
      icon: Settings,
      description: "Refleksion over processer til automatisering",
      descriptionEn: "Reflection on processes for automation"
    },
    {
      time: "15:45-16:30",
      title: "Opsamling og konklusion",
      titleEn: "Summary & Conclusion",
      type: "discussion",
      icon: Award,
      description: "Erfaring deling og implementeringsplaner",
      descriptionEn: "Experience sharing and implementation plans"
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
              (selectedDay === 1 ? 'Basic AI Tools & Techniques' : 'Ethics & Practical Application')
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
                "Forstå Bullseye-metaforen for prompt progression",
                "Mestre grundlæggende prompt engineering teknikker", 
                "Implementere custom instructions effektivt",
                "Identificere og håndtere AI hallucination og bias",
                "Arbejde med store datasæt og dybdegående analyser"
              ] : [
                "Navigere GDPR compliance i AI-projekter",
                "Implementere Zero Trust sikkerhedsmodeller",
                "Udvikle virksomhedsspecifikke AI use cases",
                "Præsentere AI-løsninger overbevisende",
                "Identificere automatiseringsmuligheder i organisationen"
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
                "Bullseye Prompt Framework Template",
                "AI Model Comparison Guide",
                "Custom Instructions Library",
                "Bias Detection Checklist",
                "Data Analysis Toolkit"
              ] : [
                "GDPR AI Compliance Checklist", 
                "Zero Trust Implementation Guide",
                "Use Case Development Template",
                "Pitch Deck Framework",
                "Automation Assessment Tool"
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
          <h3 className="text-2xl font-bold mb-4">Klar til at transformere din organisation med AI?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Tilmeld dig HARKA AI Workshop og få hands-on erfaring med de nyeste AI-værktøjer og -teknikker. 
            Perfekt til teams der vil implementere AI på en ansvarlig og effektiv måde.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg">
              {t.bookWorkshop}
            </Button>
            <Button size="lg" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Se ledige datoer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}