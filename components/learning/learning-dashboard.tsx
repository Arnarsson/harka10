"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  PlayCircle, 
  Clock, 
  CheckCircle2,
  Lock,
  FileText,
  Video,
  Download,
  ExternalLink,
  BookOpen,
  Users,
  Star,
  AlertCircle,
  ChevronRight,
  Target,
  Award
} from "lucide-react"

export function LearningDashboard() {
  const currentModule = {
    title: "Case Studies: Bias in Practice",
    description: "Real-world examples of AI bias",
    duration: "7:40",
    progress: 75
  }

  const modules = [
    { 
      id: 1, 
      title: "Introduction to AI Bias", 
      duration: "10 min", 
      type: "Video", 
      completed: true 
    },
    { 
      id: 2, 
      title: "Types of Algorithmic Bias", 
      duration: "15 min", 
      type: "Interactive", 
      completed: true 
    },
    { 
      id: 3, 
      title: "Case Studies: Bias in Practice", 
      duration: "12 min", 
      type: "Video", 
      completed: false,
      current: true
    },
    { 
      id: 4, 
      title: "Bias Detection Techniques", 
      duration: "8 min", 
      type: "Exercise", 
      completed: false,
      locked: true
    }
  ]

  const learningPaths = [
    {
      title: "Fundamentals",
      status: "completed",
      modules: [
        { name: "Introduction to AI", completed: true },
        { name: "Machine Learning Basics", completed: true },
        { name: "Neural Networks", completed: true },
        { name: "Deep Learning", completed: true }
      ]
    },
    {
      title: "Ethics & Governance",
      status: "in-progress",
      modules: [
        { name: "AI Ethics Principles", completed: true },
        { name: "Bias Detection", completed: false },
        { name: "Privacy & Security", completed: false },
        { name: "Regulatory Compliance", completed: false }
      ]
    },
    {
      title: "Implementation",
      status: "locked",
      modules: [
        { name: "Project Planning", completed: false },
        { name: "ROI Measurement", completed: false },
        { name: "Change Management", completed: false },
        { name: "Scaling AI", completed: false }
      ]
    }
  ]

  const resourceLibrary = [
    {
      title: "AI Ethics Framework Guide",
      type: "Ethics",
      description: "Comprehensive guide to implementing ethical AI practices",
      format: "PDF",
      size: "2.4 MB"
    },
    {
      title: "Bias Detection Workshop",
      type: "Ethics",
      description: "Interactive workshop on identifying and mitigating AI bias",
      format: "Video",
      duration: "45 min"
    },
    {
      title: "Implementation Checklist",
      type: "Implementation",
      description: "Step-by-step checklist for AI project deployment",
      format: "PDF",
      size: "1.2 MB"
    },
    {
      title: "ROI Calculator Template",
      type: "Implementation",
      description: "Template for calculating AI project return on investment",
      format: "Excel",
      size: "856 KB"
    }
  ]

  const achievements = [
    { title: "Fast Learner", description: "Completed 5 modules in one week", icon: "⚡" },
    { title: "Discussion Leader", description: "Started 10 forum discussions", icon: "💬" },
    { title: "Perfect Score", description: "100% on 5+ assessments", icon: "🎯" }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Learning Dashboard</h1>
        <p className="text-muted-foreground mt-2">Continue your AI training journey</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <CardTitle>Current Phase</CardTitle>
                </div>
                <Badge>Ethics & Governance</Badge>
              </div>
              <CardDescription>5/8 modules completed</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={62.5} className="mb-2" />
              <p className="text-xs text-muted-foreground">2 weeks remaining</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Current Module</CardTitle>
                    <Badge variant="outline">In Progress</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg aspect-video relative group cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-16 w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white font-semibold">{currentModule.title}</h3>
                      <p className="text-white/80 text-sm">{currentModule.description}</p>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <span className="text-white/80 text-xs bg-black/50 px-2 py-1 rounded">
                        {currentModule.duration}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Progress value={currentModule.progress} />
                    <p className="text-sm text-muted-foreground">
                      {currentModule.progress}% completed
                    </p>
                  </div>
                  <Button className="w-full mt-4">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Continue
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Module Sections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {modules.map((module) => (
                      <div
                        key={module.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          module.current ? 'border-primary bg-primary/5' : ''
                        } ${module.locked ? 'opacity-50' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          {module.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : module.locked ? (
                            <Lock className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                          )}
                          <div>
                            <p className="font-medium text-sm">{module.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{module.duration}</span>
                              <Badge variant="secondary" className="text-xs">
                                {module.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {module.current && (
                          <Button size="sm">Continue</Button>
                        )}
                        {module.completed && (
                          <Button size="sm" variant="ghost">Review</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    Discussion forum coming soon...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    Resources section coming soon...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Modules Completed</span>
                </div>
                <span className="font-semibold">18</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Avg Score</span>
                </div>
                <span className="font-semibold">95%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Study Time</span>
                </div>
                <span className="font-semibold">42h</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Certificates</span>
                </div>
                <span className="font-semibold">12</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Path</CardTitle>
              <CardDescription>Your complete AI training journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningPaths.map((path, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {path.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                        {path.status === 'in-progress' && <div className="w-4 h-4 rounded-full bg-blue-500" />}
                        {path.status === 'locked' && <Lock className="h-4 w-4 text-muted-foreground" />}
                        <span className={`font-medium text-sm ${path.status === 'locked' ? 'text-muted-foreground' : ''}`}>
                          {path.title}
                        </span>
                      </div>
                      {path.status === 'completed' && (
                        <Badge variant="secondary" className="text-xs">Completed</Badge>
                      )}
                      {path.status === 'in-progress' && (
                        <span className="text-xs text-muted-foreground">In Progress</span>
                      )}
                    </div>
                    <div className="ml-6 space-y-1">
                      {path.modules.map((module, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          {module.completed ? (
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                          ) : (
                            <div className="w-3 h-3 rounded-full border border-muted-foreground" />
                          )}
                          <span className={`text-xs ${module.completed ? '' : 'text-muted-foreground'}`}>
                            {module.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resource Library
            </CardTitle>
            <Button variant="link" size="sm">
              Browse All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {resourceLibrary.map((resource, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-sm">{resource.title}</CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    {resource.format === 'PDF' ? (
                      <FileText className="h-8 w-8 text-red-500" />
                    ) : resource.format === 'Video' ? (
                      <Video className="h-8 w-8 text-blue-500" />
                    ) : (
                      <FileText className="h-8 w-8 text-green-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {resource.format} • {resource.size || resource.duration}
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}