"use client"

import { StatsCardMinimal } from "./stats-card-minimal"
import { Users, BookOpen, Target, TrendingUp } from "lucide-react"

export function DashboardOverviewMinimal() {
  const stats = [
    {
      title: "Total Users",
      value: "2,456",
      change: "+12% from last month",
      icon: Users,
    },
    {
      title: "Active Modules",
      value: "18",
      change: "3 new this week",
      icon: BookOpen,
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+5% from last month",
      icon: Target,
    },
    {
      title: "Engagement Score",
      value: "9.2",
      change: "Above average",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCardMinimal key={stat.title} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Recent Activity</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-card rounded-[var(--radius)] border">
                <div className="flex-1 space-y-1">
                  <p className="text-sm">User completed "Introduction to AI"</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Progress */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Team Progress</h2>
          <div className="space-y-3">
            {[
              { name: "AI Fundamentals", progress: 85 },
              { name: "Machine Learning", progress: 62 },
              { name: "Neural Networks", progress: 45 },
              { name: "Deep Learning", progress: 30 },
            ].map((module) => (
              <div key={module.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{module.name}</span>
                  <span className="text-muted-foreground">{module.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}