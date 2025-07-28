"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, MessageSquare, Clock, Users } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts"

const engagementData = [
  { day: "Mon", sessions: 18, duration: 45 },
  { day: "Tue", sessions: 22, duration: 52 },
  { day: "Wed", sessions: 19, duration: 38 },
  { day: "Thu", sessions: 25, duration: 48 },
  { day: "Fri", sessions: 21, duration: 42 },
  { day: "Sat", sessions: 8, duration: 25 },
  { day: "Sun", sessions: 6, duration: 20 },
]

const activityData = [
  { name: "Video Watching", value: 45, color: "#00d4ff" },
  { name: "Interactive Exercises", value: 30, color: "#8b5cf6" },
  { name: "Discussion Forums", value: 15, color: "#10b981" },
  { name: "Resource Reading", value: 10, color: "#f59e0b" },
]

const engagementStats = [
  {
    title: "Daily Active Users",
    value: "18",
    change: "+12%",
    icon: Users,
  },
  {
    title: "Avg. Session Duration",
    value: "42 min",
    change: "+8%",
    icon: Clock,
  },
  {
    title: "Discussion Posts",
    value: "156",
    change: "+24%",
    icon: MessageSquare,
  },
  {
    title: "Engagement Score",
    value: "91%",
    change: "+3%",
    icon: Activity,
  },
]

export function EngagementMetrics() {
  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-primary" />
          <span>Engagement Metrics</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Engagement Stats */}
        <div className="grid grid-cols-2 gap-4">
          {engagementStats.map((stat) => (
            <div key={stat.title} className="p-4 rounded-lg bg-muted/20 border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                  <p className="font-semibold">{stat.value}</p>
                  <p className="text-xs text-primary">{stat.change}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Engagement Chart */}
        <div className="space-y-4">
          <h3 className="font-semibold">Weekly Engagement Pattern</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
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
                <Bar dataKey="sessions" fill="#00d4ff" radius={[4, 4, 0, 0]} name="Sessions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Distribution */}
        <div className="space-y-4">
          <h3 className="font-semibold">Activity Distribution</h3>
          <div className="flex items-center space-x-6">
            <div className="h-32 w-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {activityData.map((activity) => (
                <div key={activity.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activity.color }} />
                    <span className="text-muted-foreground">{activity.name}</span>
                  </div>
                  <span className="font-medium">{activity.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
