import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, UserPlus, Award, TrendingUp, Clock, Target } from "lucide-react"

const teamStats = [
  {
    title: "Team Members",
    value: "24",
    change: "+3 this month",
    trend: "up",
    icon: Users,
  },
  {
    title: "Average Progress",
    value: "73%",
    change: "+12% this week",
    trend: "up",
    icon: Target,
  },
  {
    title: "Certificates Earned",
    value: "18",
    change: "+6 this month",
    trend: "up",
    icon: Award,
  },
  {
    title: "Avg. Completion Time",
    value: "5.2 weeks",
    change: "-0.8 weeks",
    trend: "down",
    icon: Clock,
  },
]

const departments = [
  { name: "Engineering", members: 12, progress: 85, color: "bg-blue-500" },
  { name: "Marketing", members: 6, progress: 72, color: "bg-purple-500" },
  { name: "Sales", members: 4, progress: 68, color: "bg-green-500" },
  { name: "HR", members: 2, progress: 90, color: "bg-yellow-500" },
]

export function TeamOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">Manage your organization's AI training progress</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            TechNordic AB
          </Badge>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Members
          </Button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamStats.map((stat) => (
          <Card key={stat.title} className="stella-card border-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <div
                    className={`flex items-center space-x-1 text-xs ${
                      stat.trend === "up" ? "text-primary" : "text-green-400"
                    }`}
                  >
                    <TrendingUp className="h-3 w-3" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Progress */}
      <Card className="stella-card border-primary/10">
        <CardHeader>
          <CardTitle>Department Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {departments.map((dept) => (
            <div key={dept.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${dept.color}`} />
                  <span className="font-medium">{dept.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {dept.members} members
                  </Badge>
                </div>
                <span className="text-sm font-medium">{dept.progress}%</span>
              </div>
              <Progress value={dept.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
