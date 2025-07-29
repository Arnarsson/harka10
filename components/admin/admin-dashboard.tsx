"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp,
  TrendingDown,
  Plus,
  Settings,
  FileText,
  Video,
  Upload,
  BarChart3,
  Activity,
  Clock,
  MessageSquare,
  Download,
  Eye,
  Star,
  Calendar,
  PieChart,
  Target,
  DollarSign
} from "lucide-react"
import { motion } from "framer-motion"

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalCourses: number
  completedCourses: number
  certificatesIssued: number
  revenue: number
  monthlyGrowth: number
  discussionPosts: number
}

interface RecentActivity {
  id: string
  type: 'enrollment' | 'completion' | 'discussion' | 'certificate'
  user: string
  action: string
  course?: string
  timestamp: string
}

interface CourseAnalytics {
  id: string
  title: string
  enrollments: number
  completions: number
  completionRate: number
  avgRating: number
  revenue: number
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 1247,
    activeUsers: 892,
    totalCourses: 45,
    completedCourses: 1834,
    certificatesIssued: 723,
    revenue: 89450,
    monthlyGrowth: 12.5,
    discussionPosts: 156
  })

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'enrollment',
      user: 'Sarah Jensen',
      action: 'enrolled in',
      course: 'Advanced React Development',
      timestamp: '2 minutes ago'
    },
    {
      id: '2',
      type: 'completion',
      user: 'Michael Chen',
      action: 'completed',
      course: 'Introduction to AI',
      timestamp: '15 minutes ago'
    },
    {
      id: '3',
      type: 'certificate',
      user: 'Emma Rodriguez',
      action: 'earned certificate for',
      course: 'Data Science Fundamentals',
      timestamp: '32 minutes ago'
    },
    {
      id: '4',
      type: 'discussion',
      user: 'Alex Kim',
      action: 'started discussion',
      course: 'Machine Learning Best Practices',
      timestamp: '1 hour ago'
    }
  ])

  const [topCourses, setTopCourses] = useState<CourseAnalytics[]>([
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      enrollments: 234,
      completions: 187,
      completionRate: 79.9,
      avgRating: 4.8,
      revenue: 18760
    },
    {
      id: '2',
      title: 'AI Fundamentals & Ethics',
      enrollments: 189,
      completions: 156,
      completionRate: 82.5,
      avgRating: 4.7,
      revenue: 15120
    },
    {
      id: '3',
      title: 'Advanced Data Science',
      enrollments: 167,
      completions: 134,
      completionRate: 80.2,
      avgRating: 4.9,
      revenue: 13360
    }
  ])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'enrollment': return BookOpen
      case 'completion': return Award
      case 'certificate': return Award
      case 'discussion': return MessageSquare
      default: return Activity
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'enrollment': return 'text-blue-600'
      case 'completion': return 'text-green-600'
      case 'certificate': return 'text-purple-600'  
      case 'discussion': return 'text-orange-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Monitor platform performance and user engagement
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">+{stats.monthlyGrowth}%</span>
                <span className="ml-1">from last month</span>
              </div>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Activity className="h-3 w-3 mr-1" />
                <span>{stats.activeUsers} active learners</span>
              </div>
              <Progress value={89} className="mt-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.certificatesIssued}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Target className="h-3 w-3 mr-1" />
                <span>{((stats.certificatesIssued / stats.completedCourses) * 100).toFixed(1)}% completion rate</span>
              </div>
              <Progress value={65} className="mt-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">+23%</span>
                <span className="ml-1">vs last month</span>
              </div>
              <Progress value={82} className="mt-2" />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest user interactions and platform events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type)
                  const colorClass = getActivityColor(activity.type)
                  
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg border"
                    >
                      <div className={`mt-0.5 ${colorClass}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">
                          <span className="font-semibold">{activity.user}</span>{' '}
                          {activity.action}{' '}
                          {activity.course && (
                            <span className="font-semibold">{activity.course}</span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Course Completion</p>
                  <p className="text-xs text-muted-foreground">Average across all courses</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">78%</div>
                  <div className="text-xs text-green-600">+5% this month</div>
                </div>
              </div>
              <Progress value={78} />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">User Engagement</p>
                  <p className="text-xs text-muted-foreground">Daily active users</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-xs text-green-600">+8% this week</div>
                </div>
              </div>
              <Progress value={85} />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Discussion Activity</p>
                  <p className="text-xs text-muted-foreground">Posts this month</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{stats.discussionPosts}</div>
                  <div className="text-xs text-green-600">+12% vs last month</div>
                </div>
              </div>
              <Progress value={67} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export User Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Generate Analytics
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Announcement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Performing Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Top Performing Courses
          </CardTitle>
          <CardDescription>
            Courses with highest engagement and completion rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold">#{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{course.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{course.enrollments} enrolled</span>
                      <span>{course.completions} completed</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{course.avgRating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-lg font-bold">${course.revenue.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">
                    {course.completionRate}% completion
                  </div>
                  <Progress value={course.completionRate} className="w-20" />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}