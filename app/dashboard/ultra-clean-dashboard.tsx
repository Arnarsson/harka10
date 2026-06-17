"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import {
  BookOpen,
  TrendingUp,
  Users,
  Compass,
  ArrowRight,
  Play,
  Clock,
  Target,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function UltraCleanDashboard() {
  const { user } = useUser()
  const firstName = user?.firstName || "Learner"

  // Simulated data for demo
  const currentCourse = {
    title: "AI Fundamentals",
    progress: 65,
    nextLesson: "Prompt Engineering Fundamentals",
    timeLeft: "23 min"
  }

  const stats = {
    streakDays: 12,
    coursesCompleted: 3,
    hoursLearned: 24.5
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-10">

          {/* Clean Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {firstName} 👋
            </h1>
            <p className="text-muted-foreground">
              Ready to continue your learning journey?
            </p>
          </div>

          {/* Primary Action - Continue Learning */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white border-0 shadow-lg">
            <div className="pointer-events-none absolute -top-16 -right-10 h-48 w-48 rounded-full bg-emerald-400/15 blur-3xl" />
            <CardContent className="relative p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80 ring-1 ring-inset ring-white/15 mb-3">
                    Pick up where you left off
                  </span>
                  <h2 className="text-2xl font-bold mb-1">{currentCourse.title}</h2>
                  <p className="text-white/70 mb-4">Next: {currentCourse.nextLesson}</p>
                  <div className="mb-5 max-w-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">{currentCourse.progress}% complete</span>
                      <span className="text-sm text-white/60 flex items-center">
                        <Clock className="mr-1 h-3.5 w-3.5" />
                        {currentCourse.timeLeft} left
                      </span>
                    </div>
                    <Progress value={currentCourse.progress} className="h-2 bg-white/15" />
                  </div>
                  <Button
                    size="lg"
                    className="bg-white text-slate-900 hover:bg-white/90"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Resume Learning
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats - Minimal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Learning Streak</p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.streakDays} days
                    </p>
                  </div>
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Courses Completed</p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.coursesCompleted}
                    </p>
                  </div>
                  <Target className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Hours Learned</p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.hoursLearned}
                    </p>
                  </div>
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Actions - Just 3 key actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/learn/courses">
              <Card className="hover:shadow-lg transition-all cursor-pointer border-border group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <BookOpen className="h-10 w-10 text-primary" />
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Browse Courses</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore new topics and expand your knowledge
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/learn/ai-kompas">
              <Card className="hover:shadow-lg transition-all cursor-pointer border-border group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Compass className="h-10 w-10 text-primary" />
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">AI Recommendations</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized learning paths tailored to you
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/community/power-hour">
              <Card className="hover:shadow-lg transition-all cursor-pointer border-border group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="h-10 w-10 text-accent" />
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Join Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with peers and learn together
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Recommended Courses - Clean Grid */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Recommended for you</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Prompt Engineering", duration: "4 hours", level: "Beginner", initials: "PE" },
                { title: "AI for Business Leaders", duration: "6 hours", level: "Intermediate", initials: "AI" },
                { title: "Working with LLMs", duration: "8 hours", level: "Intermediate", initials: "LLM" },
                { title: "AI Ethics & Governance", duration: "5 hours", level: "Beginner", initials: "EG" },
              ].map((course, idx) => (
                <Card key={idx} className="overflow-hidden border-border hover:shadow-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-indigo-950 flex items-center justify-center">
                    <span className="text-2xl font-bold tracking-tight text-white/90">{course.initials}</span>
                    <div className="pointer-events-none absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-emerald-400/15 blur-2xl" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground mb-2">{course.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{course.duration}</span>
                      <span className="text-xs px-2 py-1 bg-muted rounded-full">
                        {course.level}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
