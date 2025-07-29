"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Clock,
  Download,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Activity,
  Star,
  PlayCircle,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign
} from "lucide-react"
import { motion } from "framer-motion"

interface CourseMetrics {
  id: string
  title: string
  instructor: string
  status: 'published' | 'draft' | 'archived'
  enrollments: number
  activeStudents: number
  completions: number
  completionRate: number
  avgProgress: number
  totalViews: number
  avgRating: number
  totalRevenue: number
  createdAt: string
  lastUpdated: string
  lessons: number
  duration: string
  discussions: number
  certificates: number
}

interface ProgressData {
  week: string
  enrollments: number
  completions: number
  revenue: number
}

interface StudentProgress {
  userId: string
  userName: string
  email: string
  progress: number
  lastAccessed: string
  timeSpent: number
  completed: boolean
}

export function CourseAnalytics() {
  const [courses, setCourses] = useState<CourseMetrics[]>([])
  const [progressData, setProgressData] = useState<ProgressData[]>([])
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month')
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadCourseMetrics()
    loadProgressData()
  }, [timeRange])

  const loadCourseMetrics = async () => {
    // Mock data - replace with actual API call
    const mockCourses: CourseMetrics[] = [
      {
        id: '1',
        title: 'Complete Web Development Bootcamp',
        instructor: 'Sarah Johnson',
        status: 'published',
        enrollments: 1247,
        activeStudents: 892,
        completions: 743,
        completionRate: 59.6,
        avgProgress: 73.2,
        totalViews: 15420,
        avgRating: 4.8,
        totalRevenue: 87345,
        createdAt: '2023-06-15',
        lastUpdated: '2024-02-20',
        lessons: 127,
        duration: '42 hours',
        discussions: 234,
        certificates: 743
      },
      {
        id: '2',
        title: 'AI Fundamentals & Ethics',
        instructor: 'Dr. Michael Chen',
        status: 'published',
        enrollments: 934,
        activeStudents: 567,
        completions: 445,
        completionRate: 47.6,
        avgProgress: 62.1,
        totalViews: 9876,
        avgRating: 4.6,
        totalRevenue: 56780,
        createdAt: '2023-08-10',
        lastUpdated: '2024-02-18',
        lessons: 89,
        duration: '28 hours',
        discussions: 167,
        certificates: 445
      },
      {
        id: '3',
        title: 'Advanced Data Science',
        instructor: 'Emma Wilson',
        status: 'published',
        enrollments: 678,
        activeStudents: 423,
        completions: 289,
        completionRate: 42.6,
        avgProgress: 55.8,
        totalViews: 7234,
        avgRating: 4.9,
        totalRevenue: 45670,
        createdAt: '2023-09-01',
        lastUpdated: '2024-02-15',
        lessons: 156,
        duration: '65 hours',
        discussions: 98,
        certificates: 289
      }
    ]
    setCourses(mockCourses)
    if (!selectedCourse) {
      setSelectedCourse(mockCourses[0].id)
    }
  }

  const loadProgressData = async () => {
    // Mock progress data
    const mockProgress: ProgressData[] = [
      { week: 'Week 1', enrollments: 156, completions: 23, revenue: 8760 },
      { week: 'Week 2', enrollments: 189, completions: 34, revenue: 10340 },
      { week: 'Week 3', enrollments: 223, completions: 45, revenue: 12450 },
      { week: 'Week 4', enrollments: 167, completions: 56, revenue: 9890 }
    ]
    setProgressData(mockProgress)
  }

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalStats = {
    totalEnrollments: courses.reduce((sum, c) => sum + c.enrollments, 0),
    totalCompletions: courses.reduce((sum, c) => sum + c.completions, 0),
    totalRevenue: courses.reduce((sum, c) => sum + c.totalRevenue, 0),
    avgCompletionRate: courses.reduce((sum, c) => sum + c.completionRate, 0) / courses.length
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const exportCourseData = (format: 'csv' | 'json') => {
    // Implementation would use ExportService from export-utils.ts
    console.log(`Exporting course data as ${format}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Course Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive insights into course performance and student engagement
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportCourseData('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => exportCourseData('json')}>
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.totalEnrollments.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">+12.5%</span>
                <span className="ml-1">this month</span>
              </div>
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
              <CardTitle className="text-sm font-medium">Completions</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.totalCompletions.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">+8.3%</span>
                <span className="ml-1">completion rate</span>
              </div>
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
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalStats.totalRevenue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">+15.2%</span>
                <span className="ml-1">this quarter</span>
              </div>
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
              <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.avgCompletionRate.toFixed(1)}%</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Activity className="h-3 w-3 mr-1" />
                <span>across all courses</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="students">Student Progress</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Performance Overview</CardTitle>
              <CardDescription>
                Key metrics for all courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>by {course.instructor}</span>
                          <Badge className={getStatusColor(course.status)}>
                            {course.status}
                          </Badge>
                          <span>{course.lessons} lessons</span>
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-lg">{course.enrollments}</div>
                        <div className="text-muted-foreground">Enrolled</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <div className="font-bold text-lg">{course.completionRate.toFixed(1)}%</div>
                          {course.completionRate > 50 ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div className="text-muted-foreground">Completion</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-lg">{course.avgRating}</span>
                        </div>
                        <div className="text-muted-foreground">Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg">${course.totalRevenue.toLocaleString()}</div>
                        <div className="text-muted-foreground">Revenue</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Completion Rates by Course</CardTitle>
                <CardDescription>
                  Track how well students are completing each course
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{course.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {course.completionRate.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={course.completionRate} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Engagement</CardTitle>
                <CardDescription>
                  Active students vs total enrollments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{course.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {course.activeStudents}/{course.enrollments}
                      </span>
                    </div>
                    <Progress 
                      value={(course.activeStudents / course.enrollments) * 100} 
                      className="h-2" 
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Progress Tracking</CardTitle>
              <CardDescription>
                Monitor individual student progress across courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Select a specific course to view detailed student progress</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Course</CardTitle>
                <CardDescription>
                  Compare revenue performance across courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCourses
                    .sort((a, b) => b.totalRevenue - a.totalRevenue)
                    .map((course, index) => (
                      <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">
                            #{index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{course.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {course.enrollments} enrollments
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${course.totalRevenue.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            ${(course.totalRevenue / course.enrollments).toFixed(2)} per user
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>
                  Revenue growth over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{data.week}</div>
                        <div className="text-sm text-muted-foreground">
                          {data.enrollments} new enrollments
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${data.revenue.toLocaleString()}</div>
                        <div className="flex items-center gap-1 text-sm">
                          <TrendingUp className="h-3 w-3 text-green-600" />
                          <span className="text-green-600">
                            {index > 0 ? 
                              `+${(((data.revenue - progressData[index-1].revenue) / progressData[index-1].revenue) * 100).toFixed(1)}%` 
                              : '+0%'
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}