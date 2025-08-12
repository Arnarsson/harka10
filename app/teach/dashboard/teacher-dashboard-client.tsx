"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UploadHub } from '@/components/teacher/upload-hub'
import { RoleSwitcher } from '@/components/auth/role-switcher'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Upload, FileText, BarChart3, Users, Play, 
  Calendar, Clock, TrendingUp, Star, 
  Plus, Eye, Edit, Trash2, MoreVertical,
  AlertCircle, RefreshCw
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Content {
  id: string
  title: string
  type: string
  status: string
  views: number
  rating: number | null
  created_at: string
  duration?: string
  description?: string
}

interface TeacherStats {
  totalContent: number
  publishedContent: number
  totalViews: number
  averageRating: string
  totalStudents: number
  contentByType: Record<string, number>
}

interface Analytics {
  stats: TeacherStats
  recentActivity: {
    viewsLastWeek: number
    viewsByDay: Record<string, number>
  }
  topContent: Content[]
}

export function TeacherDashboardClient() {
  const [currentTab, setCurrentTab] = useState('overview')
  const [content, setContent] = useState<Content[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch content using secure endpoint
      const contentRes = await fetch('/api/content/secure?mine=true&limit=50')
      if (contentRes.ok) {
        const contentData = await contentRes.json()
        setContent(contentData.content || [])
      }

      // Fetch analytics
      const analyticsRes = await fetch('/api/analytics/teacher')
      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json()
        setAnalytics(analyticsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
    toast.success('Dashboard refreshed')
  }

  const handleDeleteContent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return

    try {
      const res = await fetch(`/api/content/secure?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Content deleted successfully')
        setContent(content.filter(c => c.id !== id))
      } else {
        toast.error('Failed to delete content')
      }
    } catch (error) {
      toast.error('Error deleting content')
    }
  }

  const handlePublishContent = async (id: string) => {
    try {
      const res = await fetch('/api/content/secure', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'published', published: true })
      })
      
      if (res.ok) {
        toast.success('Content published successfully')
        fetchData()
      } else {
        toast.error('Failed to publish content')
      }
    } catch (error) {
      toast.error('Error publishing content')
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />
      case 'document': return <FileText className="h-4 w-4" />
      case 'interactive': return <Upload className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-6">
          <Skeleton className="h-10 w-64 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map(i => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    )
  }

  const stats = analytics?.stats || {
    totalContent: 0,
    publishedContent: 0,
    totalViews: 0,
    averageRating: '0.0',
    totalStudents: 0,
    contentByType: {}
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Teacher Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your content, track student progress, and grow your teaching impact.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button onClick={() => router.push('/teach/upload')}>
                <Plus className="h-4 w-4 mr-2" />
                New Content
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Content</p>
                    <p className="text-2xl font-bold">{stats.totalContent}</p>
                    <p className="text-xs text-muted-foreground">
                      {stats.publishedContent} published
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Eye className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Views</p>
                    <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {analytics?.recentActivity.viewsLastWeek || 0} this week
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Star className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <p className="text-2xl font-bold">{stats.averageRating}</p>
                    <p className="text-xs text-muted-foreground">
                      Average rating
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Students</p>
                    <p className="text-2xl font-bold">{stats.totalStudents}</p>
                    <p className="text-xs text-muted-foreground">
                      Unique viewers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">My Content</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>
                  Your latest content performance and student engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analytics?.topContent && analytics.topContent.length > 0 ? (
                  <div className="space-y-4">
                    {analytics.topContent.slice(0, 3).map((content) => (
                      <div key={content.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getTypeIcon(content.type)}
                          <div>
                            <p className="font-medium">{content.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {content.views} views • {new Date(content.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(content.status)}>
                            {content.status}
                          </Badge>
                          {content.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{content.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No content yet. Start by uploading your first content!</p>
                    <Button className="mt-4" onClick={() => setCurrentTab('upload')}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Content
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentTab('upload')}>
                <CardContent className="p-6 text-center">
                  <Upload className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                  <h3 className="font-semibold mb-2">Upload Content</h3>
                  <p className="text-sm text-muted-foreground">
                    Share videos, documents, or resources
                  </p>
                </CardContent>
              </Card>

              <Link href="/teach/interactive">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="relative">
                      <Play className="h-12 w-12 mx-auto text-purple-500 mb-4" />
                      <div className="absolute -top-1 -right-1">
                        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">Interactive Builder</h3>
                    <p className="text-sm text-muted-foreground">
                      Create interactive lessons with quizzes and code
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/analytics">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-green-500 mb-4" />
                    <h3 className="font-semibold mb-2">View Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      Track engagement and student progress
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto text-orange-500 mb-4" />
                  <h3 className="font-semibold mb-2">Student Messages</h3>
                  <p className="text-sm text-muted-foreground">
                    Respond to questions and feedback
                  </p>
                  <Badge variant="outline" className="mt-2">Coming Soon</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Content Library</CardTitle>
                <CardDescription>
                  Manage all your uploaded content and track performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                {content.length > 0 ? (
                  <div className="space-y-4">
                    {content.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                            {getTypeIcon(item.type)}
                          </div>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-muted-foreground">
                                {item.views} views
                              </span>
                              {item.duration && (
                                <span className="text-sm text-muted-foreground">
                                  {item.duration}
                                </span>
                              )}
                              {item.rating && (
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                  <span className="text-sm">{item.rating}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              {item.status === 'draft' && (
                                <DropdownMenuItem onClick={() => handlePublishContent(item.id)}>
                                  <Upload className="h-4 w-4 mr-2" />
                                  Publish
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                className="text-red-600" 
                                onClick={() => handleDeleteContent(item.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No content uploaded yet.</p>
                    <Button className="mt-4" onClick={() => setCurrentTab('upload')}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Your First Content
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload">
            <UploadHub />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Teacher Profile</CardTitle>
                  <CardDescription>
                    Manage your teaching profile and verification status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RoleSwitcher />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upload Preferences</CardTitle>
                  <CardDescription>
                    Configure default settings for your content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Content upload and publishing preferences will be available in the next update.
                    </p>
                    <Badge variant="outline">Coming Soon</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}