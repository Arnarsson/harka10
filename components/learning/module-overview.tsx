import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Users, Award, Play, CheckCircle } from "lucide-react"

const currentPhase = {
  name: "Ethics & Governance",
  progress: 75,
  modules: 8,
  completed: 6,
  timeRemaining: "2 weeks",
}

const achievements = [
  { title: "Fast Learner", description: "Completed 5 modules in one week", icon: Award },
  { title: "Discussion Leader", description: "Top contributor in forums", icon: Users },
  { title: "Perfect Score", description: "100% on ML Fundamentals", icon: CheckCircle },
]

export function ModuleOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Learning Dashboard</h1>
          <p className="text-muted-foreground">Continue your AI training journey</p>
        </div>
        <Button>
          <Play className="mr-2 h-4 w-4" />
          Continue Learning
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Current Phase */}
        <Card className="stella-card border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Current Phase</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{currentPhase.name}</h3>
              <p className="text-sm text-muted-foreground">
                {currentPhase.completed}/{currentPhase.modules} modules completed
              </p>
            </div>
            <Progress value={currentPhase.progress} className="h-3" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{currentPhase.progress}%</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{currentPhase.timeRemaining} remaining</span>
            </div>
          </CardContent>
        </Card>

        {/* Learning Stats */}
        <Card className="stella-card border-primary/10">
          <CardHeader>
            <CardTitle>Learning Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">18</div>
                <div className="text-xs text-muted-foreground">Modules Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">42h</div>
                <div className="text-xs text-muted-foreground">Study Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-xs text-muted-foreground">Avg Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-xs text-muted-foreground">Certificates</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="stella-card border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span>Recent Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <achievement.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
