import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Lock, BookOpen } from "lucide-react"

const learningPath = [
  {
    phase: "Fundamentals",
    modules: [
      { title: "Introduction to AI", completed: true, current: false },
      { title: "Machine Learning Basics", completed: true, current: false },
      { title: "Neural Networks", completed: true, current: false },
      { title: "Deep Learning", completed: true, current: false },
    ],
    progress: 100,
    status: "completed",
  },
  {
    phase: "Ethics & Governance",
    modules: [
      { title: "AI Ethics Principles", completed: true, current: false },
      { title: "Bias Detection", completed: true, current: false },
      { title: "Privacy & Security", completed: false, current: true },
      { title: "Regulatory Compliance", completed: false, current: false },
    ],
    progress: 75,
    status: "in-progress",
  },
  {
    phase: "Implementation",
    modules: [
      { title: "Project Planning", completed: false, current: false },
      { title: "ROI Measurement", completed: false, current: false },
      { title: "Change Management", completed: false, current: false },
      { title: "Scaling AI", completed: false, current: false },
    ],
    progress: 0,
    status: "locked",
  },
]

export function LearningPath() {
  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <span>Learning Path</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {learningPath.map((phase, phaseIndex) => (
          <div key={phase.phase} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{phase.phase}</h3>
              <Badge
                variant={
                  phase.status === "completed" ? "default" : phase.status === "in-progress" ? "secondary" : "outline"
                }
                className={
                  phase.status === "completed"
                    ? "bg-green-500/10 text-green-400"
                    : phase.status === "in-progress"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                }
              >
                {phase.status === "completed" ? "Completed" : phase.status === "in-progress" ? "In Progress" : "Locked"}
              </Badge>
            </div>

            <Progress value={phase.progress} className="h-2" />

            <div className="space-y-2">
              {phase.modules.map((module, moduleIndex) => (
                <div
                  key={moduleIndex}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                    module.current ? "bg-primary/5 border border-primary/20" : ""
                  }`}
                >
                  <div>
                    {module.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : module.current ? (
                      <Circle className="h-4 w-4 text-primary" />
                    ) : phase.status === "locked" ? (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      module.completed
                        ? "text-foreground"
                        : module.current
                          ? "text-primary font-medium"
                          : phase.status === "locked"
                            ? "text-muted-foreground"
                            : "text-muted-foreground"
                    }`}
                  >
                    {module.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
