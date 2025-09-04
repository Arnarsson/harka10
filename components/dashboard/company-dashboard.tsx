"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building2, 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Award,
  BarChart,
  FileText,
  Download,
  Play,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Briefcase,
  Target,
  Brain,
  Zap,
  ChevronRight
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface Workshop {
  id: string
  type: "2-day" | "vibecoding" | "advisor"
  date: string
  status: "upcoming" | "completed" | "in-progress"
  participants: number
  facilitator: string
  materials: number
  feedback?: number
}

interface ROIMetric {
  category: string
  before: string
  after: string
  improvement: number
  value: string
}

export function CompanyDashboard() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null)

  // Mock data - would come from API
  const company = {
    name: "VMS Group",
    industry: "Maritime & Industrial",
    size: "250-500",
    workshopsCompleted: 2,
    participantsTrained: 24,
    averageSatisfaction: 4.8
  }

  const workshops: Workshop[] = [
    {
      id: "1",
      type: "2-day",
      date: "2025-03-15",
      status: "upcoming",
      participants: 12,
      facilitator: "Sven Arnarsson",
      materials: 8
    },
    {
      id: "2",
      type: "2-day",
      date: "2024-11-20",
      status: "completed",
      participants: 12,
      facilitator: "Carsten Timm",
      materials: 12,
      feedback: 4.9
    }
  ]

  const roiMetrics: ROIMetric[] = [
    {
      category: "Servicerapporter",
      before: "3 timer/rapport",
      after: "15 min/rapport",
      improvement: 85,
      value: "DKK 450.000/år"
    },
    {
      category: "Risikoanalyse",
      before: "8 timer",
      after: "45 minutter",
      improvement: 90,
      value: "DKK 320.000/år"
    },
    {
      category: "Lageroptimering",
      before: "Manuel oversigt",
      after: "AI-drevet analyse",
      improvement: 60,
      value: "DKK 180.000/år"
    }
  ]

  const upcomingTasks = [
    {
      title: "Forbered deltagerliste",
      due: "7 dage",
      type: "action"
    },
    {
      title: "Gennemgå forberedelsesmateriale",
      due: "5 dage",
      type: "review"
    },
    {
      title: "Book mødelokale",
      due: "3 dage",
      type: "action"
    }
  ]

  const totalROI = roiMetrics.reduce((acc, metric) => {
    const value = parseInt(metric.value.replace(/[^0-9]/g, ''))
    return acc + value
  }, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700"
      case "upcoming": return "bg-blue-100 text-blue-700"
      case "in-progress": return "bg-orange-100 text-orange-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getWorkshopTitle = (type: string) => {
    switch (type) {
      case "2-day": return "2-dages AI Workshop"
      case "vibecoding": return "VibeCoding Workshop"
      case "advisor": return "Erhvervsrådgiver Training"
      default: return "Workshop"
    }
  }

  return (
    <div className="space-y-6">
      {/* Company Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
        <CardContent className="p-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-8 w-8" />
                <h1 className="text-3xl font-bold">{company.name}</h1>
              </div>
              <p className="text-blue-100 mb-6">
                {company.industry} • {company.size} medarbejdere
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold">{company.workshopsCompleted}</div>
                  <div className="text-sm text-blue-100">Workshops gennemført</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{company.participantsTrained}</div>
                  <div className="text-sm text-blue-100">Medarbejdere trænet</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{company.averageSatisfaction}/5</div>
                  <div className="text-sm text-blue-100">Gennemsnitlig tilfredshed</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Link href="/workshop/booking">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book ny workshop
                </Button>
              </Link>
              <Link href="/ai-kompas">
                <Button variant="outline" className="border-white text-white hover:bg-white/20 w-full">
                  <Target className="mr-2 h-4 w-4" />
                  Tag ny vurdering
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Samlet ROI</p>
                <p className="text-2xl font-bold">DKK {totalROI.toLocaleString('da-DK')}</p>
                <p className="text-xs text-green-600">+250% siden start</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Timer sparet/måned</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-blue-600">+45% sidste kvartal</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI-værktøjer i brug</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-purple-600">3 nye denne måned</p>
              </div>
              <Zap className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Adoption rate</p>
                <p className="text-2xl font-bold">87%</p>
                <Progress value={87} className="mt-2" />
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="workshops" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
          <TabsTrigger value="roi">ROI & Værdi</TabsTrigger>
          <TabsTrigger value="participants">Deltagere</TabsTrigger>
          <TabsTrigger value="materials">Materialer</TabsTrigger>
        </TabsList>

        <TabsContent value="workshops" className="space-y-4">
          {/* Upcoming Tasks */}
          {workshops.some(w => w.status === "upcoming") && (
            <Card className="border-orange-200 bg-orange-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Kommende opgaver
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <span className="font-medium">{task.title}</span>
                      </div>
                      <Badge variant="outline">{task.due}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Workshop List */}
          <div className="grid gap-4">
            {workshops.map((workshop) => (
              <Card key={workshop.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Brain className="h-6 w-6 text-blue-600" />
                        <h3 className="text-lg font-semibold">{getWorkshopTitle(workshop.type)}</h3>
                        <Badge className={getStatusColor(workshop.status)}>
                          {workshop.status === "completed" ? "Gennemført" : 
                           workshop.status === "upcoming" ? "Kommende" : "I gang"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                          <span className="block font-medium text-gray-900">Dato</span>
                          {new Date(workshop.date).toLocaleDateString('da-DK', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div>
                          <span className="block font-medium text-gray-900">Deltagere</span>
                          {workshop.participants} personer
                        </div>
                        <div>
                          <span className="block font-medium text-gray-900">Facilitator</span>
                          {workshop.facilitator}
                        </div>
                        <div>
                          <span className="block font-medium text-gray-900">Materialer</span>
                          {workshop.materials} filer
                        </div>
                      </div>
                      {workshop.feedback && (
                        <div className="flex items-center gap-4 pt-3 border-t">
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">Feedback: {workshop.feedback}/5</span>
                          </div>
                          <Button variant="link" size="sm" className="text-blue-600">
                            Se evalueringer →
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="mr-1 h-4 w-4" />
                        Materialer
                      </Button>
                      {workshop.status === "upcoming" && (
                        <Button size="sm">
                          <Users className="mr-1 h-4 w-4" />
                          Administrer
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ROI Oversigt</CardTitle>
              <CardDescription>
                Målbare forbedringer efter AI-implementering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {roiMetrics.map((metric, i) => (
                  <div key={i} className="border-b last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-lg">{metric.category}</h4>
                      <Badge className="bg-green-100 text-green-700">
                        {metric.improvement}% forbedring
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Før</span>
                        <p className="font-medium">{metric.before}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Efter</span>
                        <p className="font-medium text-green-600">{metric.after}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Årlig værdi</span>
                        <p className="font-bold text-blue-600">{metric.value}</p>
                      </div>
                    </div>
                    <Progress value={metric.improvement} className="mt-3" />
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Total årlig værdi: DKK {totalROI.toLocaleString('da-DK')}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      ROI opnået inden for første måned efter workshop
                    </p>
                  </div>
                  <Button size="lg">
                    <Download className="mr-2 h-4 w-4" />
                    Download ROI rapport
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deltageroversigt</CardTitle>
              <CardDescription>
                Medarbejdere der har gennemført AI-træning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Department overview */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">IT & Tech</div>
                      <div className="text-sm text-gray-600">8 deltagere • 100% gennemført</div>
                      <Progress value={100} className="mt-2" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">Service</div>
                      <div className="text-sm text-gray-600">12 deltagere • 92% gennemført</div>
                      <Progress value={92} className="mt-2" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">Ledelse</div>
                      <div className="text-sm text-gray-600">4 deltagere • 100% gennemført</div>
                      <Progress value={100} className="mt-2" />
                    </CardContent>
                  </Card>
                </div>

                {/* Participant list preview */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Seneste deltagere</h4>
                    <Button variant="link" size="sm">Se alle →</Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Thomas Fisker-Jepsen", role: "IT Manager", workshop: "2-dages AI", status: "Certificeret" },
                      { name: "Marie Hansen", role: "Service Tekniker", workshop: "2-dages AI", status: "Certificeret" },
                      { name: "Lars Nielsen", role: "Projektleder", workshop: "VibeCoding", status: "I gang" }
                    ].map((participant, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{participant.name}</p>
                            <p className="text-sm text-gray-600">{participant.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{participant.workshop}</p>
                          <Badge variant="outline" className="text-xs">
                            {participant.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workshop Materialer</CardTitle>
              <CardDescription>
                Alle ressourcer fra jeres workshops
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-4">2-dages AI Workshop - November 2024</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "Bullseye Prompt Framework.pdf", size: "2.4 MB", type: "PDF" },
                      { name: "Custom Instructions Templates.docx", size: "156 KB", type: "DOC" },
                      { name: "Workshop Præsentation.pptx", size: "8.7 MB", type: "PPT" },
                      { name: "Service Rapport Automation Guide.pdf", size: "3.2 MB", type: "PDF" },
                      { name: "GDPR Compliance Checklist.pdf", size: "1.1 MB", type: "PDF" },
                      { name: "Workshop Optagelse - Dag 1.mp4", size: "2.3 GB", type: "Video" },
                    ].map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-4">Løbende ressourcer</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Play className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Video bibliotek</p>
                          <p className="text-sm text-gray-600">24 videoer • Opdateret ugentligt</p>
                        </div>
                      </div>
                      <Button variant="link" size="sm" className="text-blue-600">
                        Åbn bibliotek →
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Brain className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium">AI Værktøjer & Templates</p>
                          <p className="text-sm text-gray-600">48 templates • Klar til brug</p>
                        </div>
                      </div>
                      <Button variant="link" size="sm" className="text-purple-600">
                        Se værktøjer →
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}