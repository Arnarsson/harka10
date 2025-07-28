import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, Clock, Target, Award } from "lucide-react"

const stats = [
  {
    title: "Overall Progress",
    value: "73%",
    change: "+12%",
    trend: "up",
    icon: Target,
    description: "Across all phases",
  },
  {
    title: "Team Members",
    value: "24",
    change: "+3",
    trend: "up",
    icon: Users,
    description: "Active learners",
  },
  {
    title: "Avg. Completion Time",
    value: "5.2 weeks",
    change: "-0.8 weeks",
    trend: "down",
    icon: Clock,
    description: "Per phase",
  },
  {
    title: "Certificates Earned",
    value: "18",
    change: "+6",
    trend: "up",
    icon: Award,
    description: "This month",
  },
]

const phases = [
  { name: "Fundamentals", progress: 100, status: "completed", color: "bg-green-500" },
  { name: "Ethics & Governance", progress: 85, status: "in-progress", color: "bg-blue-500" },
  { name: "Implementation", progress: 35, status: "in-progress", color: "bg-purple-500" },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6 smooth-enter">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-satoshi">Good morning, John! 👋</h2>
          <p className="text-muted-foreground font-satoshi">Here's your AI training progress overview</p>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary font-satoshi">
          Premium Plan
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="harka-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-satoshi">{stat.title}</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold font-satoshi">{stat.value}</span>
                    <div
                      className={`flex items-center space-x-1 text-xs font-satoshi ${
                        stat.trend === "up" ? "text-green-600" : "text-green-600"
                      }`}
                    >
                      {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-satoshi">{stat.description}</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Phase Progress */}
      <Card className="harka-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between font-satoshi">
            <span>Learning Phase Progress</span>
            <Badge variant="outline" className="text-xs font-satoshi">
              Updated 2 min ago
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {phases.map((phase) => (
            <div key={phase.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${phase.color}`} />
                  <span className="font-medium font-satoshi">{phase.name}</span>
                  <Badge
                    variant={phase.status === "completed" ? "default" : "secondary"}
                    className={
                      phase.status === "completed"
                        ? "bg-green-100 text-green-700 font-satoshi"
                        : "bg-blue-100 text-blue-700 font-satoshi"
                    }
                  >
                    {phase.status === "completed" ? "Completed" : "In Progress"}
                  </Badge>
                </div>
                <span className="text-sm font-medium font-satoshi">{phase.progress}%</span>
              </div>
              <Progress value={phase.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
