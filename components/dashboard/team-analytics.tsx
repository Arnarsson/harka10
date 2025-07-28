"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Users, Award } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts"

const teamProgress = [
  { name: "Fundamentals", completed: 18, total: 24 },
  { name: "Ethics", completed: 12, total: 24 },
  { name: "Implementation", completed: 6, total: 24 },
]

const departmentData = [
  { name: "Engineering", value: 35, color: "#00d4ff" },
  { name: "Marketing", value: 25, color: "#8b5cf6" },
  { name: "Sales", value: 20, color: "#10b981" },
  { name: "HR", value: 20, color: "#f59e0b" },
]

const topPerformers = [
  {
    name: "Sarah Johnson",
    role: "Senior Developer",
    progress: 95,
    modules: 12,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Erik Lindqvist",
    role: "Product Manager",
    progress: 88,
    modules: 10,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Anna Svensson",
    role: "Data Scientist",
    progress: 82,
    modules: 9,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function TeamAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Team Analytics</h2>
        <Button variant="outline" size="sm" className="border-primary/20 bg-transparent">
          View Full Report
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Team Progress Chart */}
        <Card className="stella-card border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Team Progress by Phase</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamProgress}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8b949e" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8b949e" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="completed" fill="#00d4ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {teamProgress.map((phase) => (
                <div key={phase.name} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{phase.name}</span>
                  <span className="font-medium">
                    {phase.completed}/{phase.total} completed
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="stella-card border-primary/10">
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {departmentData.map((dept) => (
                <div key={dept.name} className="flex items-center space-x-2 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                  <span className="text-muted-foreground">{dept.name}</span>
                  <span className="font-medium">{dept.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card className="stella-card border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Top Performers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={performer.name} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/20">
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-bold text-primary">#{index + 1}</div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={performer.avatar || "/placeholder.svg"} alt={performer.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {performer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{performer.name}</p>
                    <p className="text-xs text-muted-foreground">{performer.role}</p>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{performer.progress}%</span>
                  </div>
                  <Progress value={performer.progress} className="h-2" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{performer.modules}</div>
                  <div className="text-xs text-muted-foreground">modules</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
