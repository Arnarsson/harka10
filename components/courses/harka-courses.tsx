"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search,
  PlayCircle,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Grid3X3,
  List,
  Filter,
  Star,
  Eye,
  Calendar,
  User,
  BarChart3,
  Target,
  TrendingUp
} from "lucide-react"

export function HarkaCourses() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  const currentCourse = {
    title: "AI Fundamentals",
    progress: 38,
    modules: 4,
    completedModules: 2
  }

  const modules = [
    {
      id: 1,
      title: "Introduction to AI",
      subtitle: "Core concepts and terminology",
      lessons: [
        { title: "What is Artificial Intelligence?", completed: true },
        { title: "History of AI Development", completed: true },
        { title: "Types of AI Systems", completed: true },
        { title: "Knowledge Check: AI Fundamentals", completed: false }
      ],
      completed: false,
      current: false
    },
    {
      id: 2,
      title: "Machine Learning Basics",
      subtitle: "Understanding how machines learn",
      lessons: [
        { title: "Supervised vs. Unsupervised Learning", completed: true },
        { title: "Neural Networks Explained", completed: true },
        { title: "Training Models: Best Practices", completed: false },
        { title: "Your First Machine Learning Model", completed: false }
      ],
      completed: false,
      current: true
    },
    {
      id: 3,
      title: "Language Models",
      subtitle: "Deep dive into NLP and language models",
      lessons: [
        { title: "Introduction to NLP", completed: false },
        { title: "How Language Models Work", completed: false },
        { title: "Prompt Engineering Fundamentals", completed: false },
        { title: "Crafting Effective Prompts", completed: false },
        { title: "Module Assessment", completed: false }
      ],
      completed: false,
      current: false
    },
    {
      id: 4,
      title: "Advanced Topics",
      subtitle: "Exploring further AI concepts",
      lessons: [
        { title: "AI Ethics and Responsibility", completed: false },
        { title: "Reinforcement Learning Intro", completed: false },
        { title: "Building an AI Project", completed: false }
      ],
      completed: false,
      current: false
    }
  ]

  const bookmarkedResources = [
    {
      title: "React Fundamentals",
      description: "Core concepts and hooks",
      type: "Documentation"
    },
    {
      title: "Next.js App Router",
      description: "Server and Client Components",
      type: "Guide"
    },
    {
      title: "Tailwind CSS Guide",
      description: "Utility-first CSS framework",
      type: "Documentation"
    }
  ]

  const stats = {
    totalProgress: 38,
    activeCourses: 5,
    hoursSpent: 25.5,
    achievements: 12
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Sven!</h1>
          <p className="text-muted-foreground mt-1">Continue your learning journey</p>
        </div>
        <div className="relative w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
          />
        </div>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Current Course: {currentCourse.title}</CardTitle>
              <CardDescription className="text-base mt-1">
                Module {currentCourse.completedModules + 1} of {currentCourse.modules}
              </CardDescription>
            </div>
            <Button>
              <PlayCircle className="mr-2 h-4 w-4" />
              Continue Learning
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{currentCourse.progress}%</span>
            </div>
            <Progress value={currentCourse.progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Modules
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                    List View
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                    Grid View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={viewMode === 'grid' ? 'grid gap-4 md:grid-cols-2' : 'space-y-4'}>
                {modules.map((module) => (
                  <Card 
                    key={module.id} 
                    className={`cursor-pointer hover:shadow-md transition-all ${
                      module.current ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base">
                            Module {module.id}: {module.title}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {module.subtitle}
                          </CardDescription>
                        </div>
                        {module.completed && (
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        )}
                        {module.current && (
                          <Badge className="flex-shrink-0">Current</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {module.lessons.map((lesson, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            {lesson.completed ? (
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                            ) : (
                              <div className="w-3 h-3 rounded-full border border-muted-foreground" />
                            )}
                            <span className={lesson.completed ? 'text-muted-foreground' : ''}>
                              {lesson.title}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {module.lessons.filter(l => l.completed).length} of {module.lessons.length} completed
                        </span>
                        <Progress 
                          value={(module.lessons.filter(l => l.completed).length / module.lessons.length) * 100} 
                          className="w-20 h-1"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Total Progress</span>
                  </div>
                  <span className="font-semibold">{stats.totalProgress}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Active Courses</span>
                  </div>
                  <span className="font-semibold">{stats.activeCourses}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Hours Spent</span>
                  </div>
                  <span className="font-semibold">{stats.hoursSpent}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Achievements</span>
                  </div>
                  <span className="font-semibold">{stats.achievements}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bookmarked Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bookmarkedResources.map((resource, index) => (
                  <Card key={index} className="cursor-pointer hover:bg-accent">
                    <CardContent className="p-3">
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">{resource.title}</h4>
                        <p className="text-xs text-muted-foreground">{resource.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}