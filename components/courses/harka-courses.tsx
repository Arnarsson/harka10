"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  PlayCircle,
  CheckCircle2,
  BookOpen,
  Star,
} from "lucide-react"

export function HarkaCourses() {
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
      title: "Prompt Engineering Guide",
      description: "Patterns for reliable prompts",
      type: "Guide"
    },
    {
      title: "LLM Glossary",
      description: "Key terms, explained simply",
      type: "Reference"
    },
    {
      title: "AI Governance Checklist",
      description: "GDPR & responsible AI use",
      type: "Template"
    }
  ]

  const currentModule = modules.find((m) => m.current) ?? modules[0]
  const nextLesson = currentModule.lessons.find((l) => !l.completed)?.title ?? "Review"

  return (
    <div className="space-y-8">
      {/* Demoted eyebrow greeting — no big h1, no search bar */}
      <p className="text-sm text-muted-foreground">Welcome back, Sven</p>

      {/* INK hero card — the single dominant action */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white">
        {/* Emerald ambient glow */}
        <div className="pointer-events-none absolute -top-16 -right-10 h-48 w-48 rounded-full bg-emerald-400/15 blur-3xl" />

        <CardContent className="relative p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-xs text-white/70">Continue learning</p>
              <h2 className="text-2xl font-bold text-white">{currentCourse.title}</h2>
              <p className="text-sm text-white/80">
                Module {currentCourse.completedModules + 1} of {currentCourse.modules} · {currentModule.title}
              </p>
              <p className="text-sm font-medium text-white/90">
                Up next: {nextLesson}
              </p>
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60">Overall progress</span>
                  <span className="text-xs font-semibold text-white/90">{currentCourse.progress}%</span>
                </div>
                <Progress value={currentCourse.progress} className="h-2 bg-white/15" />
              </div>
            </div>
            <Button
              size="lg"
              className="shrink-0 bg-white text-slate-900 hover:bg-white/90"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Continue Learning
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main content: modules (3 cols) + bookmarked resources sidebar (1 col) */}
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Modules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modules.map((module) => (
                  <Card
                    key={module.id}
                    className={`cursor-pointer hover:shadow-md transition-all ${
                      module.current ? "ring-2 ring-primary bg-primary/5" : ""
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base">
                            Module {module.id}: {module.title}
                          </CardTitle>
                          <p className="mt-1 text-sm text-muted-foreground">{module.subtitle}</p>
                        </div>
                        {module.completed && (
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
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
                              <CheckCircle2 className="h-3 w-3 text-accent" />
                            ) : (
                              <div className="w-3 h-3 rounded-full border border-muted-foreground" />
                            )}
                            <span className={lesson.completed ? "text-muted-foreground" : ""}>
                              {lesson.title}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {module.lessons.filter((l) => l.completed).length} of {module.lessons.length} completed
                        </span>
                        <Progress
                          value={
                            (module.lessons.filter((l) => l.completed).length /
                              module.lessons.length) *
                            100
                          }
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

        {/* Sidebar: Bookmarked Resources only (Quick Stats removed) */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-4 w-4" />
                Bookmarked Resources
              </CardTitle>
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
