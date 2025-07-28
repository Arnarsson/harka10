import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Play } from "lucide-react"

const modules = [
  {
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of ML algorithms and their applications in business.",
    duration: "45 min",
    participants: 1247,
    progress: 100,
    status: "completed",
    phase: "Fundamentals",
  },
  {
    title: "AI Ethics in Practice",
    description: "Understand ethical considerations and bias mitigation in AI systems.",
    duration: "60 min",
    participants: 892,
    progress: 60,
    status: "in-progress",
    phase: "Ethics",
  },
  {
    title: "Project Planning for AI Implementation",
    description: "Step-by-step guide to planning and executing AI projects.",
    duration: "90 min",
    participants: 634,
    progress: 0,
    status: "not-started",
    phase: "Implementation",
  },
  {
    title: "ROI Measurement and Tracking",
    description: "Learn how to measure and track the return on investment for AI initiatives.",
    duration: "75 min",
    participants: 456,
    progress: 0,
    status: "locked",
    phase: "Implementation",
  },
]

export function LearningModules() {
  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle>Continue Learning</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {modules.map((module) => (
          <div key={module.title} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{module.title}</h3>
                <Badge
                  variant={
                    module.phase === "Fundamentals" ? "default" : module.phase === "Ethics" ? "secondary" : "outline"
                  }
                >
                  {module.phase}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{module.description}</p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{module.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{module.participants} learners</span>
                </div>
              </div>
              {module.progress > 0 && (
                <div className="space-y-1">
                  <Progress value={module.progress} className="h-1" />
                  <span className="text-xs text-muted-foreground">{module.progress}% complete</span>
                </div>
              )}
            </div>
            <div className="ml-4">
              <Button
                size="sm"
                disabled={module.status === "locked"}
                variant={module.status === "completed" ? "outline" : "default"}
              >
                {module.status === "completed"
                  ? "Review"
                  : module.status === "in-progress"
                    ? "Continue"
                    : module.status === "locked"
                      ? "Locked"
                      : "Start"}
                {module.status !== "locked" && <Play className="ml-2 h-3 w-3" />}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
