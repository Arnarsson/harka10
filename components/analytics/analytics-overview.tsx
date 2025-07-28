"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Users, Clock, Target, Download } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts"

const overviewData = [
  { month: "Jul", learners: 18, completed: 12, engagement: 85 },
  { month: "Aug", learners: 22, completed: 16, engagement: 88 },
  { month: "Sep", learners: 24, completed: 18, engagement: 92 },
  { month: "Oct", learners: 26, completed: 20, engagement: 89 },
  { month: "Nov", learners: 28, completed: 22, engagement: 94 },
  { month: "Dec", learners: 24, completed: 18, engagement: 91 },
]

const phaseData = [
  { phase: "Fundamentals", completed: 24, inProgress: 0, notStarted: 0 },
  { phase: "Ethics", completed: 18, inProgress: 6, notStarted: 0 },
  { phase: "Implementation", completed: 8, inProgress: 10, notStarted: 6 },
]

export function AnalyticsOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights into your AI training program</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            Last 6 months
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/20">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="stella-card border-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Active Learners</p>
                    <div className="text-2xl font-bold">24</div>
                    <div className="flex items-center space-x-1 text-xs text-primary">
                      <TrendingUp className="h-3 w-3" />
                      <span>+12% vs last month</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stella-card border-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Completion Rate</p>
                    <div className="text-2xl font-bold">75%</div>
                    <div className="flex items-center space-x-1 text-xs text-primary">
                      <TrendingUp className="h-3 w-3" />
                      <span>+8% vs last month</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stella-card border-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Avg. Study Time</p>
                    <div className="text-2xl font-bold">4.2h</div>
                    <div className="flex items-center space-x-1 text-xs text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      <span>+0.5h vs last month</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stella-card border-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Engagement Score</p>
                    <div className="text-2xl font-bold">91%</div>
                    <div className="flex items-center space-x-1 text-xs text-primary">
                      <TrendingUp className="h-3 w-3" />
                      <span>+3% vs last month</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="stella-card border-primary/10">
              <CardHeader>
                <CardTitle>Learning Progress Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={overviewData}>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#8b949e" }}
                      />
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
                        dataKey="learners"
                        stroke="#00d4ff"
                        strokeWidth={2}
                        dot={false}
                        name="Active Learners"
                      />
                      <Line
                        type="monotone"
                        dataKey="completed"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                        name="Completed"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="stella-card border-primary/10">
              <CardHeader>
                <CardTitle>Phase Completion Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={phaseData}>
                      <XAxis
                        dataKey="phase"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#8b949e" }}
                      />
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="learning" className="space-y-4">
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Learning Analytics</h3>
            <p className="text-muted-foreground text-sm mb-4">Detailed insights into learning patterns and progress</p>
            <Button variant="outline">View Learning Analytics</Button>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Engagement Metrics</h3>
            <p className="text-muted-foreground text-sm mb-4">Track user engagement and participation rates</p>
            <Button variant="outline">View Engagement Data</Button>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="text-center py-8">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Performance Insights</h3>
            <p className="text-muted-foreground text-sm mb-4">Analyze performance trends and outcomes</p>
            <Button variant="outline">View Performance Data</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
