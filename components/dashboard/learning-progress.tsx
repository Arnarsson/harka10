"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Clock, Users, CheckCircle, Lock, BookOpen } from "lucide-react"

const modules = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    description: "Understand the fundamentals of ML algorithms and their business applications",
    phase: "Fundamentals",
    duration: "45 min",
    participants: 1247,
    progress: 100,
    status: "completed",
    difficulty: "Beginner",
    nextModule: "Neural Networks Basics",
  },
  {
    id: 2,
    title: "AI Ethics in Practice",
    description: "Learn ethical considerations and bias mitigation strategies",
    phase: "Ethics",
    duration: "60 min",
    participants: 892,
    progress: 75,
    status: "in-progress",
    difficulty: "Intermediate",
    nextModule: "Regulatory Compliance",
  },
  {
    id: 3,
    title: "Project Planning for AI Implementation",
    description: "Step-by-step guide to planning and executing AI projects",
    phase: "Implementation",
    duration: "90 min",
    participants: 634,
    progress: 0,
    status: "available",
    difficulty: "Advanced",
    nextModule: "ROI Measurement",
  },
  {
    id: 4,
    title: "Advanced Neural Networks",
    description: "Deep dive into complex neural network architectures",
    phase: "Fundamentals",
    duration: "120 min",
    participants: 456,
    progress: 0,
    status: "locked",
    difficulty: "Advanced",
    nextModule: "Computer Vision",
  },
]

const phaseColors = {
  Fundamentals: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Ethics: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Implementation: "bg-green-500/10 text-green-400 border-green-500/20",
}

const difficultyColors = {
  Beginner: "bg-green-500/10 text-green-400",
  Intermediate: "bg-yellow-500/10 text-yellow-400",
  Advanced: "bg-red-500/10 text-red-400",
}

export function LearningProgress() {
  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>Learning Modules</span>
          </CardTitle>
          <Button variant="outline" size="sm" className="border-primary/20 bg-transparent">
            View All Modules
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {modules.map((module) => (
          <div key={module.id} className="stella-card p-6 border-primary/5 hover:border-primary/10 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-lg">{module.title}</h3>
                    <Badge className={phaseColors[module.phase as keyof typeof phaseColors]}>{module.phase}</Badge>
                    <Badge
                      variant="outline"
                      className={difficultyColors[module.difficulty as keyof typeof difficultyColors]}
                    >
                      {module.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{module.description}</p>
                </div>

                <div className="flex items-center space-x-6 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{module.participants.toLocaleString()} learners</span>
                  </div>
                  {module.status === "completed" && (
                    <div className="flex items-center space-x-1 text-primary">
                      <CheckCircle className="h-3 w-3" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>

                {module.progress > 0 && module.status !== "completed" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">Next: {module.nextModule}</p>
                  </div>
                )}
              </div>

              <div className="ml-6 flex flex-col items-end space-y-3">
                <Button
                  size="sm"
                  disabled={module.status === "locked"}
                  variant={module.status === "completed" ? "outline" : "default"}
                  className={module.status === "completed" ? "border-primary/20" : ""}
                >
                  {module.status === "completed" ? (
                    <>
                      <CheckCircle className="mr-2 h-3 w-3" />
                      Review
                    </>
                  ) : module.status === "in-progress" ? (
                    <>
                      <Play className="mr-2 h-3 w-3" />
                      Continue
                    </>
                  ) : module.status === "locked" ? (
                    <>
                      <Lock className="mr-2 h-3 w-3" />
                      Locked
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-3 w-3" />
                      Start
                    </>
                  )}
                </Button>

                {module.status === "completed" && (
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Score</div>
                    <div className="text-sm font-bold text-primary">95%</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
