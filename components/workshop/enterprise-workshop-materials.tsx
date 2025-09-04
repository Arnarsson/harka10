"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, Users, Target, Shield, Brain, Lightbulb, ChevronRight, Download, FileText, Video, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

interface Module {
  time: string
  title: string
  description: string
  outcomes: string[]
  materials?: string[]
}

const day1Modules: Module[] = [
  {
    time: "09:00 - 10:30",
    title: "AI Fundamentals & Danske Virksomheder",
    description: "Forstå AI's potentiale specifikt for danske SMV'er og enterprise",
    outcomes: [
      "Identificer jeres virksomheds AI-muligheder",
      "Forstå forskellen mellem GPT-4, Claude, og Gemini",
      "Vurder ROI på AI-implementering"
    ],
    materials: ["AI Readiness Assessment", "Danske Use Cases", "ROI Beregner"]
  },
  {
    time: "10:45 - 12:00",
    title: "Bullseye Prompt Framework™",
    description: "Lær vores bevisbaserede metode til præcise AI-instruktioner",
    outcomes: [
      "Mestrer struktureret prompt engineering",
      "Reducer fejlrate med 75%",
      "Skab genbrugelige prompt-templates"
    ],
    materials: ["Bullseye Template Library", "Prompt Testing Toolkit"]
  },
  {
    time: "13:00 - 15:00",
    title: "Hands-on: Automatiser Jeres Første Process",
    description: "Identificer og automatiser en reel arbejdsprocess fra jeres virksomhed",
    outcomes: [
      "Vælg den rigtige process til automatisering",
      "Byg jeres første AI-workflow",
      "Test og validér resultater"
    ],
    materials: ["Process Mapping Canvas", "Automation Checklist"]
  },
  {
    time: "15:15 - 17:00",
    title: "AI Model Sammenligning & Valg",
    description: "Find den rigtige AI-model til jeres specifikke behov",
    outcomes: [
      "Sammenlign GPT-4, Claude 3.5, og Gemini Pro",
      "Forstå pricing og performance trade-offs",
      "Vælg optimal model per use case"
    ],
    materials: ["Model Comparison Matrix", "Cost Calculator"]
  }
]

const day2Modules: Module[] = [
  {
    time: "09:00 - 10:30",
    title: "GDPR & Dansk Datalovgivning",
    description: "Sikker AI-implementering der overholder danske regler",
    outcomes: [
      "Forstå GDPR-krav for AI",
      "Implementer data governance",
      "Undgå compliance-fælder"
    ],
    materials: ["GDPR Checklist", "Data Processing Agreement Templates"]
  },
  {
    time: "10:45 - 12:00",
    title: "Virksomhedsspecifikke Løsninger",
    description: "Design AI-løsninger tilpasset jeres industri og workflows",
    outcomes: [
      "Map jeres unikke AI-muligheder",
      "Prioriter implementering efter ROI",
      "Definer success metrics"
    ],
    materials: ["Industry-Specific Templates", "KPI Dashboard"]
  },
  {
    time: "13:00 - 15:00",
    title: "Workshop: Byg Jeres AI Roadmap",
    description: "Skab en konkret 90-dages implementeringsplan",
    outcomes: [
      "30-60-90 dages handlingsplan",
      "Ressourceallokering og budget",
      "Change management strategi"
    ],
    materials: ["Roadmap Canvas", "Budget Template", "Change Management Guide"]
  },
  {
    time: "15:15 - 17:00",
    title: "Skalering & Organisatorisk Forankring",
    description: "Fra pilot til enterprise-wide implementation",
    outcomes: [
      "Skab AI Champions i organisationen",
      "Etabler Center of Excellence",
      "Mål og dokumentér værdi"
    ],
    materials: ["Scaling Playbook", "Training Materials", "Success Metrics Framework"]
  }
]

const deliverables = [
  {
    title: "Bullseye Prompt Library",
    description: "50+ testede prompts for danske virksomheder",
    icon: Target,
    format: "Digital + Print"
  },
  {
    title: "90-Dages Implementeringsplan",
    description: "Skræddersyet roadmap med konkrete milepæle",
    icon: FileText,
    format: "Personlig Plan"
  },
  {
    title: "ROI Calculator",
    description: "Excel-værktøj til at beregne AI-investeringsafkast",
    icon: Brain,
    format: "Excel + Guide"
  },
  {
    title: "GDPR Compliance Kit",
    description: "Skabeloner og checklists for sikker AI-brug",
    icon: Shield,
    format: "Word + PDF"
  }
]

export function EnterpriseWorkshopMaterials() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge className="bg-emerald-100 text-emerald-700">2-Dages Enterprise Workshop</Badge>
        <h1 className="text-4xl font-bold">Fra Idé til Implementering på 48 Timer</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Intensiv hands-on workshop der transformerer jeres virksomhed med AI - 
          fokuseret på danske virksomheders behov og compliance-krav
        </p>
      </div>

      {/* Key Benefits */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Clock, title: "48 Timer", description: "Fra første idé til fungerende løsning" },
          { icon: Users, title: "Max 12 Deltagere", description: "Personlig coaching og feedback" },
          { icon: Target, title: "100% Praktisk", description: "Arbejd med jeres egne processer" }
        ].map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <benefit.icon className="w-8 h-8 text-emerald-600 mb-3" />
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Workshop Program */}
      <Tabs defaultValue="day1" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="day1">Dag 1: Fundamentals</TabsTrigger>
          <TabsTrigger value="day2">Dag 2: Implementation</TabsTrigger>
        </TabsList>

        <TabsContent value="day1" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dag 1: AI Fundamentals & Hands-on Training</CardTitle>
              <CardDescription>
                Lær de essentielle AI-færdigheder og start med at automatisere jeres første processer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {day1Modules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-4 border-emerald-500 pl-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{module.title}</h3>
                    <Badge variant="outline">{module.time}</Badge>
                  </div>
                  <p className="text-muted-foreground">{module.description}</p>
                  <div className="space-y-1">
                    {module.outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{outcome}</span>
                      </div>
                    ))}
                  </div>
                  {module.materials && (
                    <div className="flex gap-2 flex-wrap pt-2">
                      {module.materials.map((material, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="day2" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dag 2: Virksomhedsspecifik Implementation</CardTitle>
              <CardDescription>
                Byg jeres AI-strategi, sikr compliance, og skab en konkret implementeringsplan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {day2Modules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-4 border-blue-500 pl-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{module.title}</h3>
                    <Badge variant="outline">{module.time}</Badge>
                  </div>
                  <p className="text-muted-foreground">{module.description}</p>
                  <div className="space-y-1">
                    {module.outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{outcome}</span>
                      </div>
                    ))}
                  </div>
                  {module.materials && (
                    <div className="flex gap-2 flex-wrap pt-2">
                      {module.materials.map((material, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Deliverables */}
      <Card>
        <CardHeader>
          <CardTitle>Workshop Materialer & Værktøjer</CardTitle>
          <CardDescription>
            Alt I får med hjem for at fortsætte jeres AI-transformation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {deliverables.map((deliverable, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <deliverable.icon className="w-10 h-10 text-emerald-600 flex-shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-semibold">{deliverable.title}</h4>
                  <p className="text-sm text-muted-foreground">{deliverable.description}</p>
                  <Badge variant="outline" className="text-xs">{deliverable.format}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Case Study Preview */}
      <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Lightbulb className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">VMS Group Case Study</h3>
              <p className="text-muted-foreground">
                "Efter kun 2 dages workshop automatiserede vi vores servicerapporter og 
                reducerede tiden fra 3 timer til 15 minutter per rapport. Den årlige 
                besparelse er over 950.000 DKK."
              </p>
              <p className="text-sm font-medium">- Lars Jensen, CTO, VMS Group</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="gap-2">
          <Download className="w-4 h-4" />
          Download Detaljeret Agenda
        </Button>
        <Button size="lg" variant="outline" className="gap-2">
          <Video className="w-4 h-4" />
          Se Workshop Video
        </Button>
        <Button size="lg" variant="outline" className="gap-2">
          <BookOpen className="w-4 h-4" />
          Læs Mere om Metoderne
        </Button>
      </div>
    </div>
  )
}