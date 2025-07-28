"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp, Award, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const insights = [
  {
    type: "success",
    title: "High Completion Rate",
    description: "Your team has achieved a 94% completion rate, exceeding the industry average of 75%.",
    action: "Continue current approach",
    icon: CheckCircle,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    type: "warning",
    title: "Implementation Phase Lag",
    description: "6 team members haven't started the Implementation phase. Consider providing additional support.",
    action: "Schedule check-in meetings",
    icon: AlertTriangle,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  {
    type: "info",
    title: "Peak Learning Hours",
    description: "Most learning activity occurs between 9-11 AM and 2-4 PM. Optimize content delivery accordingly.",
    action: "Schedule live sessions",
    icon: Clock,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
]

const performanceMetrics = [
  {
    title: "Knowledge Retention",
    value: 87,
    target: 85,
    status: "above",
    description: "Post-training assessment scores",
  },
  {
    title: "Practical Application",
    value: 73,
    target: 80,
    status: "below",
    description: "Real-world implementation success",
  },
  {
    title: "Team Collaboration",
    value: 91,
    target: 85,
    status: "above",
    description: "Cross-functional project participation",
  },
  {
    title: "Innovation Index",
    value: 68,
    target: 75,
    status: "below",
    description: "New AI initiative proposals",
  },
]

export function PerformanceInsights() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Performance Insights</h2>
        <Button variant="outline" size="sm" className="border-primary/20 bg-transparent">
          Generate Report
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Key Insights */}
        <Card className="stella-card border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Key Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg border ${insight.bgColor} border-white/10`}>
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-background/50 ${insight.color}`}>
                    <insight.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                    <Button size="sm" variant="ghost" className="h-8 px-3 text-xs">
                      {insight.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="stella-card border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span>Performance Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{metric.title}</h4>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{metric.value}%</span>
                      <Badge
                        variant={metric.status === "above" ? "default" : "secondary"}
                        className={
                          metric.status === "above"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }
                      >
                        {metric.status === "above" ? (
                          <TrendingUp className="mr-1 h-3 w-3" />
                        ) : (
                          <TrendingUp className="mr-1 h-3 w-3 rotate-180" />
                        )}
                        {metric.status === "above" ? "Above" : "Below"} Target
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Target: {metric.target}%</p>
                  </div>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
