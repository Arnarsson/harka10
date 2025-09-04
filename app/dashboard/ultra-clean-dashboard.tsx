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
    title: "Advanced React Patterns",
    progress: 65,
    nextLesson: "Custom Hooks Deep Dive",
    timeLeft: "23 min"
  }
  
  const stats = {
    streakDays: 12,
    coursesCompleted: 3,
    hoursLearned: 24.5
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        
        {/* Clean Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-gray-600">
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Primary Action - Continue Learning */}
        <Card className="mb-8 bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Continue where you left off</h2>
                <p className="text-violet-100 mb-4">{currentCourse.title}</p>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-violet-100">Lesson: {currentCourse.nextLesson}</span>
                    <span className="text-sm text-violet-100">{currentCourse.progress}% complete</span>
                  </div>
                  <Progress value={currentCourse.progress} className="h-2 bg-violet-400" />
                </div>
                <div className="flex items-center gap-6">
                  <Button 
                    size="lg" 
                    className="bg-white text-violet-600 hover:bg-gray-100"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Resume Learning
                  </Button>
                  <span className="text-sm text-violet-100 flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {currentCourse.timeLeft} to complete
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats - Minimal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Learning Streak</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.streakDays} days 🔥
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Courses Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.coursesCompleted}
                  </p>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Hours Learned</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.hoursLearned}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Actions - Just 3 key actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/learn/courses">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-gray-200 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="h-10 w-10 text-violet-600" />
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-violet-600 transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Browse Courses</h3>
                <p className="text-sm text-gray-600">
                  Explore new topics and expand your knowledge
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/learn/ai-kompas">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-gray-200 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Compass className="h-10 w-10 text-indigo-600" />
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Recommendations</h3>
                <p className="text-sm text-gray-600">
                  Get personalized learning paths tailored to you
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/community/power-hour">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-gray-200 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-10 w-10 text-green-600" />
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Join Community</h3>
                <p className="text-sm text-gray-600">
                  Connect with peers and learn together
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recommended Courses - Clean Grid */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommended for you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Python Fundamentals", duration: "4 hours", level: "Beginner" },
              { title: "Machine Learning Basics", duration: "8 hours", level: "Intermediate" },
              { title: "Web Development", duration: "12 hours", level: "Beginner" },
              { title: "Data Visualization", duration: "6 hours", level: "Intermediate" },
            ].map((course, idx) => (
              <Card key={idx} className="border-gray-200 hover:shadow-md transition-all cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg" />
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{course.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{course.duration}</span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
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
  )
}