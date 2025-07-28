"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, TrendingUp, Users } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const learningData = [
  { week: "W1", fundamentals: 20, ethics: 5, implementation: 0 },
  { week: "W2", fundamentals: 45, ethics: 15, implementation: 0 },
  { week: "W3", fundamentals: 70, ethics: 30, implementation: 5 },
  { week: "W4", fundamentals: 85, ethics: 50, implementation: 15 },
  { week: "W5", fundamentals: 95, ethics: 70, implementation: 30 },
  { week: "W6", fundamentals: 100, ethics: 85, implementation: 45 },
]

const moduleStats = [
  {
    title: "Most Popular Module",
    value: "AI Ethics in Practice",
    metric: "892 completions",
    icon: BookOpen,
  },
  {
    title: "Average Study Time",
    value: "4.2 hours",
    metric: "per week",
    icon: Clock,
  },
  {
    title: "Completion Rate",
    value: "94.2%",
    metric: "+5.2% vs last month",
    icon: TrendingUp,
  },
  {
    title: "Active Learners",
    value: "24",
    metric: "this week",
    icon: Users,
  },
]

export function LearningAnalytics() {
  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <span>Learning Analytics</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Module Stats */}
        <div className="grid grid-cols-2 gap-4">
          {moduleStats.map((stat) => (
            <div key={stat.title} className="p-4 rounded-lg bg-muted/20 border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                  <p className="font-semibold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.metric}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Progress Chart */}
        <div className="space-y-4">
          <h3 className="font-semibold">Phase Progress Over Time</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={learningData}>
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8b949e" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8b949e" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="fundamentals"
                  stroke="#00d4ff"
                  strokeWidth={2}
                  dot={false}
                  name="Fundamentals"
                />
                <Line type="monotone" dataKey="ethics" stroke="#8b5cf6" strokeWidth={2} dot={false} name="Ethics" />
                <Line
                  type="monotone"
                  dataKey="implementation"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  name="Implementation"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center space-x-6 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-primary rounded-full" />
              <span className="text-muted-foreground">Fundamentals</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-purple-400 rounded-full" />
              <span className="text-muted-foreground">Ethics</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-green-400 rounded-full" />
              <span className="text-muted-foreground">Implementation</span>
            </div>
          </div>
        </div>

        {/* Phase Progress Bars */}
        <div className="space-y-4">
          <h3 className="font-semibold">Current Phase Status</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Fundamentals</span>
                  <Badge variant="default" className="bg-primary/10 text-primary">
                    Completed
                  </Badge>
                </div>
                <span className="text-sm font-medium">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="text-sm font-medium">Ethics & Governance</span>
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-400">
                    In Progress
                  </Badge>
                </div>
                <span className="text-sm font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">Implementation</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-400">
                    Starting
                  </Badge>
                </div>
                <span className="text-sm font-medium">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
