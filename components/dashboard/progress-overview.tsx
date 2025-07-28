import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Shield, Rocket, Trophy } from "lucide-react"

const phases = [
  {
    icon: BookOpen,
    title: "Fundamentals",
    progress: 100,
    status: "Completed",
    color: "text-green-500",
  },
  {
    icon: Shield,
    title: "Ethics & Governance",
    progress: 75,
    status: "In Progress",
    color: "text-blue-500",
  },
  {
    icon: Rocket,
    title: "Implementation",
    progress: 25,
    status: "Not Started",
    color: "text-muted-foreground",
  },
]

export function ProgressOverview() {
  const overallProgress = Math.round(phases.reduce((acc, phase) => acc + phase.progress, 0) / phases.length)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">Overall Progress: {overallProgress}%</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {phases.map((phase) => (
          <Card key={phase.title} className="glass-effect border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{phase.title}</CardTitle>
              <phase.icon className={`h-4 w-4 ${phase.color}`} />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{phase.progress}%</div>
                <Progress value={phase.progress} className="h-2" />
                <p className={`text-xs ${phase.color}`}>{phase.status}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
