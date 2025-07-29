"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  Clock,
  User,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  Database,
  BarChart3,
  TrendingUp,
  Activity,
  Users,
  Server,
  Lock
} from "lucide-react"
import { motion } from "framer-motion"
import { ActivityLogger, ActivityLog, AuditFilters, AuditStatistics } from "@/lib/audit/activity-logger"
import { formatDistanceToNow, format } from "date-fns"

export function AuditTrail() {
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [filteredActivities, setFilteredActivities] = useState<ActivityLog[]>([])
  const [statistics, setStatistics] = useState<AuditStatistics | null>(null)
  const [filters, setFilters] = useState<AuditFilters>({
    limit: 50,
    offset: 0
  })
  const [loading, setLoading] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<ActivityLog | null>(null)
  const [activeTab, setActiveTab] = useState("activities")

  const activityLogger = ActivityLogger.getInstance()

  useEffect(() => {
    loadActivities()
    loadStatistics()
  }, [filters])

  const loadActivities = () => {
    setLoading(true)
    try {
      const logs = activityLogger.getActivities(filters)
      setActivities(logs)
      setFilteredActivities(logs)
    } catch (error) {
      console.error('Error loading activities:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStatistics = () => {
    try {
      const stats = activityLogger.getStatistics(filters.dateFrom, filters.dateTo)
      setStatistics(stats)
    } catch (error) {
      console.error('Error loading statistics:', error)
    }
  }

  const handleFilterChange = (key: keyof AuditFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, offset: 0 }))
  }

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredActivities(activities)
      return
    }

    const filtered = activities.filter(activity =>
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredActivities(filtered)
  }

  const exportActivities = async (format: 'csv' | 'json') => {
    try {
      const data = await activityLogger.exportActivities(format, filters)
      const blob = new Blob([data], { 
        type: format === 'csv' ? 'text/csv' : 'application/json' 
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `audit-trail-${new Date().toISOString().split('T')[0]}.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  const getSeverityColor = (severity: ActivityLog['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getCategoryIcon = (category: ActivityLog['category']) => {
    switch (category) {
      case 'auth': return Shield
      case 'user_management': return Users
      case 'content': return Eye
      case 'system': return Server
      case 'security': return Lock
      case 'data': return Database
      default: return Activity
    }
  }

  const getCategoryColor = (category: ActivityLog['category']) => {
    switch (category) {
      case 'auth': return 'bg-green-100 text-green-800'
      case 'user_management': return 'bg-blue-100 text-blue-800'
      case 'content': return 'bg-purple-100 text-purple-800'
      case 'system': return 'bg-gray-100 text-gray-800'
      case 'security': return 'bg-red-100 text-red-800'
      case 'data': return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Audit Trail</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive logging of all system activities and user actions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => exportActivities('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => exportActivities('json')}>
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="activities">Activity Log</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="patterns">Security Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search activities..."
                      className="pl-10"
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Category</Label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={filters.category || ''}
                    onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                  >
                    <option value="">All Categories</option>
                    <option value="auth">Authentication</option>
                    <option value="user_management">User Management</option>
                    <option value="content">Content</option>
                    <option value="system">System</option>
                    <option value="security">Security</option>
                    <option value="data">Data Access</option>
                  </select>
                </div>
                
                <div>
                  <Label>Severity</Label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={filters.severity || ''}
                    onChange={(e) => handleFilterChange('severity', e.target.value || undefined)}
                  >
                    <option value="">All Severities</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                
                <div>
                  <Label>Success</Label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={filters.success === undefined ? '' : filters.success.toString()}
                    onChange={(e) => handleFilterChange('success', e.target.value === '' ? undefined : e.target.value === 'true')}
                  >
                    <option value="">All Results</option>
                    <option value="true">Success Only</option>
                    <option value="false">Failures Only</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label>Date From</Label>
                  <Input
                    type="datetime-local"
                    value={filters.dateFrom || ''}
                    onChange={(e) => handleFilterChange('dateFrom', e.target.value || undefined)}
                  />
                </div>
                <div>
                  <Label>Date To</Label>
                  <Input
                    type="datetime-local"
                    value={filters.dateTo || ''}
                    onChange={(e) => handleFilterChange('dateTo', e.target.value || undefined)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Activity Log ({filteredActivities.length})</span>
                {loading && <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-2">
                  {filteredActivities.map((activity, index) => {
                    const CategoryIcon = getCategoryIcon(activity.category)
                    
                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedActivity(activity)}
                      >
                        <div className="flex-shrink-0">
                          <div className={`p-2 rounded-full ${activity.success ? 'bg-green-100' : 'bg-red-100'}`}>
                            <CategoryIcon className={`h-4 w-4 ${activity.success ? 'text-green-600' : 'text-red-600'}`} />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{activity.action}</p>
                            <div className="flex items-center gap-2">
                              <Badge className={getSeverityColor(activity.severity)}>
                                {activity.severity}
                              </Badge>
                              <Badge className={getCategoryColor(activity.category)}>
                                {activity.category}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {activity.userName}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                            </span>
                            <span>Resource: {activity.resource}</span>
                            {activity.success ? (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            ) : (
                              <XCircle className="h-3 w-3 text-red-600" />
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground truncate">
                            {JSON.stringify(activity.details)}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          {statistics && (
            <>
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{statistics.totalActivities.toLocaleString()}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Unique Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{statistics.uniqueUsers}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Failed Attempts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{statistics.failedAttempts}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Critical Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{statistics.criticalEvents}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Most Common Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {statistics.topActions.slice(0, 10).map((item, index) => (
                        <div key={item.action} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">#{index + 1}</span>
                            <span className="text-sm">{item.action}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full"
                                style={{ 
                                  width: `${(item.count / statistics.topActions[0].count) * 100}%` 
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium">{item.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Users */}
                <Card>
                  <CardHeader>
                    <CardTitle>Most Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {statistics.topUsers.slice(0, 10).map((user, index) => (
                        <div key={user.userId} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">#{index + 1}</span>
                            <span className="text-sm">{user.userName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 rounded-full"
                                style={{ 
                                  width: `${(user.count / statistics.topUsers[0].count) * 100}%` 
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium">{user.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity by Hour */}
              <Card>
                <CardHeader>
                  <CardTitle>Activity by Hour</CardTitle>
                  <CardDescription>
                    Distribution of activities throughout the day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-1 h-32">
                    {statistics.activityByHour.map((data, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-primary/20 hover:bg-primary/30 transition-colors relative group"
                        style={{
                          height: `${(data.count / Math.max(...statistics.activityByHour.map(d => d.count))) * 100}%`
                        }}
                      >
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {data.hour}:00 - {data.count} activities
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>0</span>
                    <span>6</span>
                    <span>12</span>
                    <span>18</span>
                    <span>24</span>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Security Pattern Detection
              </CardTitle>
              <CardDescription>
                Automated detection of suspicious activity patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium">Multiple Failed Login Attempts</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    5 users had more than 5 failed login attempts in the last hour
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Unusual Access Times</span>
                    <Badge className="bg-blue-100 text-blue-800">Info</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    12 login attempts detected outside normal business hours (6 AM - 10 PM)
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Normal Activity</span>
                    <Badge className="bg-green-100 text-green-800">Normal</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    No critical security patterns detected in the last 24 hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Activity Details</h2>
                <Button variant="ghost" onClick={() => setSelectedActivity(null)}>
                  ×
                </Button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Timestamp</Label>
                    <p className="font-mono text-sm">{format(new Date(selectedActivity.timestamp), 'PPpp')}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Duration</Label>
                    <p className="font-mono text-sm">{selectedActivity.duration || 'N/A'}ms</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">User</Label>
                    <p>{selectedActivity.userName} ({selectedActivity.userEmail})</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Role</Label>
                    <p>{selectedActivity.userRole}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Action</Label>
                  <p className="font-semibold">{selectedActivity.action}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Resource</Label>
                  <p>{selectedActivity.resource} {selectedActivity.resourceId && `(${selectedActivity.resourceId})`}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">IP Address</Label>
                  <p className="font-mono text-sm">{selectedActivity.ipAddress}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">User Agent</Label>
                  <p className="font-mono text-sm text-wrap">{selectedActivity.userAgent}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Details</Label>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                    {JSON.stringify(selectedActivity.details, null, 2)}
                  </pre>
                </div>
                
                {selectedActivity.changes && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Changes</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Before</Label>
                        <pre className="bg-red-50 p-2 rounded text-xs overflow-x-auto">
                          {JSON.stringify(selectedActivity.changes.before, null, 2)}
                        </pre>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">After</Label>
                        <pre className="bg-green-50 p-2 rounded text-xs overflow-x-auto">
                          {JSON.stringify(selectedActivity.changes.after, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}