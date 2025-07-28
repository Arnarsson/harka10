"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Clock, Target } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const progressData = [
  { phase: "Fundamentals", completed: 24, inProgress: 0, notStarted: 0 },
  { phase: "Ethics", completed: 18, inProgress: 6, notStarted: 0 },
  { phase: "Implementation", completed: 8, inProgress: 10, notStarted: 6 },
]

const departmentProgress = [
  { name: "Engineering", progress: 85, members: 12 },
  { name: "Marketing", progress: 72, members: 6 },
  { name: "Sales", progress: 68, members: 4 },
  { name: "HR", progress: 90, members: 2 },
]

export function TeamProgress() {
  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span>Team Progress Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Chart */}
        <div className="space-y-4">
          <h3 className="font-semibold">Phase Completion Status</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData}>
                <XAxis dataKey="phase" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8b949e" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8b949e" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} name="Completed" />
                <Bar dataKey="inProgress" fill="#f59e0b" radius={[4, 4, 0, 0]} name="In Progress" />
                <Bar dataKey="notStarted" fill="#6b7280" radius={[4, 4, 0, 0]} name="Not Started" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Progress */}
        <div className="space-y-4">
          <h3 className="font-semibold">Department Progress</h3>
          <div className="space-y-4">
            {departmentProgress.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
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
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-muted/20">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="text-lg font-bold">24</div>
            <div className="text-xs text-muted-foreground">Active Learners</div>
          </div>

          <div className="text-center p-4 rounded-lg bg-muted/20">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div className="text-lg font-bold">73%</div>
            <div className="text-xs text-muted-foreground">Avg Progress</div>
          </div>

          <div className="text-center p-4 rounded-lg bg-muted/20">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div className="text-lg font-bold">5.2w</div>
            <div className="text-xs text-muted-foreground">Avg Time</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
