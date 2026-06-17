"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Users, TrendingUp, Target, BookOpen, Briefcase, Calculator, FileCheck, ChevronRight, Download, GraduationCap, Star } from "lucide-react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

interface TrainingModule {
  session: string
  title: string
  duration: string
  topics: string[]
  skills: string[]
  certification: string
}

const trainingModules: TrainingModule[] = [
  {
    session: "Session 1-2",
    title: "AI Fundamentals & Dansk Erhvervsliv",
    duration: "2 x 4 timer",
    topics: [
      "AI-teknologiens muligheder og begrænsninger",
      "Danske virksomheders AI-modenhed",
      "Branchespecifikke use cases",
      "ROI beregning og business cases"
    ],
    skills: [
      "AI readiness assessment",
      "Opportunity mapping",
      "Value proposition development",
      "Stakeholder communication"
    ],
    certification: "AI Business Fundamentals"
  },
  {
    session: "Session 3-4",
    title: "Workshop Facilitation & Metodologi",
    duration: "2 x 4 timer",
    topics: [
      "HEKLA workshop framework",
      "Bullseye Prompt metodologi",
      "Hands-on øvelser design",
      "Change management strategier"
    ],
    skills: [
      "Workshop planning og execution",
      "Group dynamics management",
      "Technical demonstration",
      "Feedback og coaching"
    ],
    certification: "Certified Workshop Facilitator"
  },
  {
    session: "Session 5-6",
    title: "Implementation & Skalering",
    duration: "2 x 4 timer",
    topics: [
      "90-dages implementeringsplaner",
      "Organisatorisk forankring",
      "Success metrics og KPIs",
      "Ongoing support modeller"
    ],
    skills: [
      "Project management",
      "Success measurement",
      "Client relationship management",
      "Continuous improvement"
    ],
    certification: "AI Implementation Specialist"
  }
]

const certificationPath = [
  { level: "Foundation", hours: 8, modules: 2, status: "current" },
  { level: "Practitioner", hours: 16, modules: 4, status: "upcoming" },
  { level: "Expert", hours: 24, modules: 6, status: "upcoming" },
  { level: "Master Trainer", hours: 32, modules: 8, status: "locked" }
]

const businessOpportunity = {
  clients_per_year: 12,
  revenue_per_client: 30000,
  annual_revenue: 360000,
  support_revenue: 120000,
  total_potential: 480000
}

const deliverables = [
  {
    title: "Complete Workshop Toolkit",
    items: [
      "50+ slide presentations",
      "Hands-on øvelser og templates",
      "Facilitator guides og scripts",
      "Marketing materialer"
    ],
    value: "DKK 25.000"
  },
  {
    title: "Sales & Marketing Package",
    items: [
      "Lead generation strategier",
      "Proposal templates",
      "Case studies og referencer",
      "LinkedIn og email templates"
    ],
    value: "DKK 15.000"
  },
  {
    title: "Ongoing Support",
    items: [
      "Månedlige masterclasses",
      "Peer learning netværk",
      "Nye materialer og updates",
      "1-on-1 coaching sessions"
    ],
    value: "DKK 3.000/måned"
  }
]

const targetAudience = [
  "Management consultants",
  "Digital transformation rådgivere",
  "IT konsulenter",
  "Erhvervsrådgivere",
  "Innovation facilitators",
  "Business coaches"
]

export function AdvisorTrainingMaterials() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge className="bg-amber-100 text-amber-700">Erhvervsrådgiver Certificering</Badge>
        <h1 className="text-4xl font-bold">Bliv Certificeret AI Business Advisor</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Komplet træningsprogram der gør dig i stand til at levere professionelle 
          AI-workshops og rådgivning til danske virksomheder
        </p>
      </div>

      {/* Key Benefits */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { icon: Award, label: "Certificering", value: "3 Levels" },
          { icon: Users, label: "Netværk", value: "50+ Advisors" },
          { icon: TrendingUp, label: "Potentiale", value: "DKK 480K/år" },
          { icon: Target, label: "Success Rate", value: "92%" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Training Program */}
      <Card>
        <CardHeader>
          <CardTitle>6-Session Træningsprogram</CardTitle>
          <CardDescription>
            24 timer intensiv træning fordelt over 3 uger - kombination af online og in-person sessions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {trainingModules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="border-l-4 border-amber-500 pl-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{module.title}</h3>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline">{module.session}</Badge>
                    <Badge variant="secondary">{module.duration}</Badge>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  {module.certification}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2 text-muted-foreground">Topics Covered:</p>
                  <ul className="space-y-1">
                    {module.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-3 h-3 mt-0.5 text-amber-600 flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-muted-foreground">Skills Developed:</p>
                  <ul className="space-y-1">
                    {module.skills.map((skill, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Star className="w-3 h-3 mt-0.5 text-amber-600 flex-shrink-0" />
                        <span className="text-sm">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Certification Path */}
      <Card>
        <CardHeader>
          <CardTitle>Certificeringsvej</CardTitle>
          <CardDescription>
            Progressive certificering der bygger dine kompetencer over tid
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {certificationPath.map((level, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                level.status === 'current' 
                  ? 'bg-amber-50 border-amber-300' 
                  : level.status === 'upcoming'
                  ? 'bg-background border-border'
                  : 'bg-muted opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <GraduationCap className={`w-5 h-5 ${
                    level.status === 'current' ? 'text-amber-600' : 'text-muted-foreground'
                  }`} />
                  <h4 className="font-semibold">{level.level}</h4>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{level.hours} timer</Badge>
                  <Badge variant="outline">{level.modules} moduler</Badge>
                </div>
              </div>
              {level.status === 'current' && (
                <Progress value={33} className="h-2 mt-2" />
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Business Opportunity */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle>Din Business Opportunity</CardTitle>
          <CardDescription>
            Realistisk indtjeningspotentiale som certificeret AI Business Advisor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-600" />
                Revenue Projection (År 1)
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Workshops (12 x DKK 30.000)</span>
                  <span className="font-semibold">DKK {businessOpportunity.annual_revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Support & Advisory</span>
                  <span className="font-semibold">DKK {businessOpportunity.support_revenue.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Potentiale</span>
                    <span className="font-bold text-lg text-amber-600">
                      DKK {businessOpportunity.total_potential.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-600" />
                Typisk Kunde Pipeline
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700">Måned 1-2</Badge>
                  <span>2-3 prospekter</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-700">Måned 3-4</Badge>
                  <span>Første workshop leveret</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-100 text-purple-700">Måned 5-6</Badge>
                  <span>3-4 workshops, support aftaler</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-700">År 1</Badge>
                  <span>12+ workshops, etableret praksis</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What You Get */}
      <div className="grid md:grid-cols-3 gap-6">
        {deliverables.map((deliverable, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">{deliverable.title}</CardTitle>
                <Badge className="w-fit">{deliverable.value}</Badge>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {deliverable.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <FileCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Target Audience */}
      <Card>
        <CardHeader>
          <CardTitle>Er Dette for Dig?</CardTitle>
          <CardDescription>
            Ideelle kandidater for AI Business Advisor certificering
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Perfekt for:</h4>
              <div className="space-y-2">
                {targetAudience.map((audience, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-600" />
                    <span className="text-sm">{audience}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Du skal have:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-amber-600 mt-0.5" />
                  <span>Erfaring med business consulting eller rådgivning</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-amber-600 mt-0.5" />
                  <span>Netværk blandt danske virksomheder</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-amber-600 mt-0.5" />
                  <span>Passion for teknologi og innovation</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-amber-600 mt-0.5" />
                  <span>Vilje til at investere i egen udvikling</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Story */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Award className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Success Story: Thomas Nielsen</h3>
                <p className="text-muted-foreground mb-3">
                  "Efter certificeringen har jeg leveret 18 workshops på 8 måneder og 
                  bygget en praksis med over DKK 600.000 i årlig omsætning. HEKLA's 
                  materialer og support har været afgørende for min succes."
                </p>
                <p className="text-sm font-medium">
                  - Thomas Nielsen, Certificeret AI Business Advisor, tidligere McKinsey consultant
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="gap-2 bg-amber-600 hover:bg-amber-700">
          <GraduationCap className="w-4 h-4" />
          Start Din Certificering
        </Button>
        <Button size="lg" variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Download Curriculum
        </Button>
        <Button size="lg" variant="outline" className="gap-2">
          <BookOpen className="w-4 h-4" />
          Book Informationsmøde
        </Button>
      </div>
    </div>
  )
}