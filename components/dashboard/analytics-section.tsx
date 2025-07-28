"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Activity, Clock } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { day: "Mon", fundamentals: 85, ethics: 45, implementation: 20 },
  { day: "Tue", fundamentals: 90, ethics: 52, implementation: 25 },
  { day: "Wed", fundamentals: 95, ethics: 58, implementation: 30 },
  { day: "Thu", fundamentals: 100, ethics: 65, implementation: 35 },
  { day: "Fri", fundamentals: 100, ethics: 72, implementation: 42 },
  { day: "Sat", fundamentals: 100, ethics: 75, implementation: 45 },
  { day: "Sun", fundamentals: 100, ethics: 75, implementation: 45 },
]

const metrics = [
  {
    title: "Learning Velocity",
    value: "2.4",
    unit: "modules/week",
    change: "+12%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Engagement Score",
    value: "94.2",
    unit: "%",
    change: "+5.2%",
    trend: "up",
    icon: Activity,
  },
  {
    title: "Time to Complete",
    value: "6.2",
    unit: "weeks",
    change: "-8%",
    trend: "down",
    icon: Clock,
  },
  {
    title: "Implementation Rate",
    value: "78",
    unit: "%",
    change: "+15%",
    trend: "up",
    icon: TrendingUp,
  },
]

export function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Learning Analytics</h2>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-xs">
            1W
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            1M
          </Button>
          <Button variant="ghost" size="sm" className="text-xs bg-primary/10 text-primary">
            3M
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            1Y
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="stella-card border-primary/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{metric.title}</p>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-xl font-bold">{metric.value}</span>
                    <span className="text-xs text-muted-foreground">{metric.unit}</span>
                  </div>
                  <div
                    className={`flex items-center space-x-1 text-xs ${
                      metric.trend === "up" ? "text-primary" : "text-red-400"
                    }`}
                  >
                    {metric.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>{metric.change}</span>
                  </div>
                </div>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Chart */}
      <Card className="stella-card border-primary/10">
        <CardHeader>
          <CardTitle className="text-lg">Phase Progress Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8b949e" }} />
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

          <div className="flex items-center justify-center space-x-6 mt-4 text-xs">
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
        </CardContent>
      </Card>
    </div>
  )
}
