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
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Settings,
  Filter,
  Search,
  Download,
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  FileText,
  PlayCircle,
  Image,
  Link,
  Flag,
  Trash2,
  EyeOff,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Zap,
  Target,
  Activity
} from "lucide-react"
import { motion } from "framer-motion"
import { 
  ContentModerationService, 
  ModerationResult, 
  ModerationFlag,
  ModerationConfig 
} from "@/lib/moderation/content-moderation"
import { formatDistanceToNow } from "date-fns"

export function ContentModerationDashboard() {
  const [moderationQueue, setModerationQueue] = useState<ModerationResult[]>([])
  const [statistics, setStatistics] = useState<any>(null)
  const [config, setConfig] = useState<ModerationConfig | null>(null)
  const [activeTab, setActiveTab] = useState("queue")
  const [selectedContent, setSelectedContent] = useState<ModerationResult | null>(null)
  const [filters, setFilters] = useState({
    status: '',
    contentType: '',
    severity: '',
    search: ''
  })

  const moderationService = ContentModerationService.getInstance()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [queue, stats, currentConfig] = await Promise.all([
        moderationService.getModerationQueue(),
        moderationService.getStatistics(),
        Promise.resolve(moderationService.getConfig())
      ])
      
      setModerationQueue(mockModerationQueue()) // Using mock data for demo
      setStatistics(stats)
      setConfig(currentConfig)
    } catch (error) {
      console.error('Error loading moderation data:', error)
    }
  }

  const mockModerationQueue = (): ModerationResult[] => {
    return [
      {
        id: '1',
        contentId: 'post-123',
        contentType: 'post',
        score: 0.85,
        flags: [
          {
            type: 'spam',
            severity: 'high',
            description: 'Content contains spam patterns',
            confidence: 0.89,
            evidence: ['click here', 'free money', 'limited time']
          },
          {
            type: 'profanity',
            severity: 'medium',
            description: 'Contains inappropriate language',
            confidence: 0.72,
            evidence: ['damn', 'crap']
          }
        ],
        action: {
          type: 'flag',
          reason: 'Multiple violations detected',
          automatic: true
        },
        confidence: 0.85,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'flagged'
      },
      {
        id: '2',
        contentId: 'comment-456',
        contentType: 'comment',
        score: 0.92,
        flags: [
          {
            type: 'harassment',
            severity: 'critical',
            description: 'Contains harassment and threats',
            confidence: 0.94,
            evidence: ['kill yourself', 'you are worthless']
          }
        ],
        action: {
          type: 'hide',
          reason: 'Critical harassment detected',
          automatic: true
        },
        confidence: 0.94,
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        status: 'flagged'
      },
      {
        id: '3',
        contentId: 'lesson-789',
        contentType: 'lesson',
        score: 0.71,
        flags: [
          {
            type: 'inappropriate',
            severity: 'medium',
            description: 'May contain inappropriate content',
            confidence: 0.71,
            evidence: ['suspicious image content']
          }
        ],
        action: {
          type: 'flag',
          reason: 'Content needs manual review',
          automatic: true
        },
        confidence: 0.71,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        status: 'pending'
      }
    ]
  }

  const handleReviewContent = async (moderationId: string, decision: 'approve' | 'reject', note?: string) => {
    try {
      await moderationService.reviewContent(moderationId, decision, 'admin-user', note)
      
      // Update local state
      setModerationQueue(prev => 
        prev.map(item => 
          item.id === moderationId 
            ? { ...item, status: decision === 'approve' ? 'approved' : 'rejected' as any }
            : item
        )
      )
      
      setSelectedContent(null)
    } catch (error) {
      console.error('Error reviewing content:', error)
    }
  }

  const handleConfigUpdate = async (updates: Partial<ModerationConfig>) => {
    try {
      await moderationService.updateConfig(updates)
      setConfig(prev => prev ? { ...prev, ...updates } : null)
    } catch (error) {
      console.error('Error updating config:', error)
    }
  }

  const getFlagIcon = (type: ModerationFlag['type']) => {
    switch (type) {
      case 'spam': return Target
      case 'profanity': return AlertTriangle
      case 'harassment': return Shield
      case 'inappropriate': return EyeOff
      case 'copyright': return FileText
      case 'violence': return Flag
      case 'hate_speech': return Flag
      case 'adult_content': return EyeOff
      default: return AlertTriangle
    }
  }

  const getSeverityColor = (severity: ModerationFlag['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getContentTypeIcon = (type: ModerationResult['contentType']) => {
    switch (type) {
      case 'post': return MessageSquare
      case 'comment': return MessageSquare
      case 'lesson': return PlayCircle
      case 'message': return MessageSquare
      case 'user_profile': return Users
      default: return FileText
    }
  }

  const filteredQueue = moderationQueue.filter(item => {
    if (filters.status && item.status !== filters.status) return false
    if (filters.contentType && item.contentType !== filters.contentType) return false
    if (filters.severity && !item.flags.some(f => f.severity === filters.severity)) return false
    if (filters.search && !item.contentId.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Moderation</h1>
          <p className="text-muted-foreground mt-2">
            Automated content moderation and spam detection system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Statistics Overview */}
      {statistics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Moderated</p>
                  <p className="text-2xl font-bold">{statistics.totalModerated.toLocaleString()}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Auto Actions</p>
                  <p className="text-2xl font-bold">{statistics.autoActions.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((statistics.autoActions / statistics.totalModerated) * 100)}% automated
                  </p>
                </div>
                <Zap className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Manual Reviews</p>
                  <p className="text-2xl font-bold">{statistics.manualReviews.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((statistics.manualReviews / statistics.totalModerated) * 100)}% manual
                  </p>
                </div>
                <Eye className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Confidence</p>
                  <p className="text-2xl font-bold">{Math.round(statistics.averageConfidence * 100)}%</p>
                  <Progress value={statistics.averageConfidence * 100} className="w-full mt-2" />
                </div>
                <Activity className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="queue">Moderation Queue</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label>Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search content..."
                      className="pl-10"
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Status</Label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="flagged">Flagged</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                
                <div>
                  <Label>Content Type</Label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={filters.contentType}
                    onChange={(e) => setFilters(prev => ({ ...prev, contentType: e.target.value }))}
                  >
                    <option value="">All Types</option>
                    <option value="post">Posts</option>
                    <option value="comment">Comments</option>
                    <option value="lesson">Lessons</option>
                    <option value="message">Messages</option>
                    <option value="user_profile">Profiles</option>
                  </select>
                </div>
                
                <div>
                  <Label>Severity</Label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={filters.severity}
                    onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
                  >
                    <option value="">All Severities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={() => setFilters({ status: '', contentType: '', severity: '', search: '' })}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Moderation Queue */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Queue ({filteredQueue.length})</span>
                  <Filter className="h-4 w-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {filteredQueue.map((item) => {
                      const ContentIcon = getContentTypeIcon(item.contentType)
                      const highestSeverityFlag = item.flags.reduce((highest, flag) => {
                        const severityOrder = { low: 1, medium: 2, high: 3, critical: 4 }
                        return severityOrder[flag.severity] > severityOrder[highest.severity] ? flag : highest
                      }, item.flags[0])
                      
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedContent?.id === item.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                          }`}
                          onClick={() => setSelectedContent(item)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <div className={`p-2 rounded-full ${
                                item.status === 'approved' ? 'bg-green-100' :
                                item.status === 'rejected' ? 'bg-red-100' : 
                                'bg-yellow-100'
                              }`}>
                                <ContentIcon className={`h-4 w-4 ${
                                  item.status === 'approved' ? 'text-green-600' :
                                  item.status === 'rejected' ? 'text-red-600' : 
                                  'text-yellow-600'
                                }`} />
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {item.contentType}
                                  </Badge>
                                  <Badge className={`text-xs ${getSeverityColor(highestSeverityFlag?.severity || 'low')}`}>
                                    {highestSeverityFlag?.severity}
                                  </Badge>
                                </div>
                                <Badge className={
                                  item.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  item.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }>
                                  {item.status}
                                </Badge>
                              </div>
                              
                              <p className="text-sm font-medium">ID: {item.contentId}</p>
                              <p className="text-sm text-muted-foreground mb-2">
                                Score: {Math.round(item.score * 100)}% | Confidence: {Math.round(item.confidence * 100)}%
                              </p>
                              
                              <div className="flex flex-wrap gap-1 mb-2">
                                {item.flags.slice(0, 3).map((flag, index) => {
                                  const FlagIcon = getFlagIcon(flag.type)
                                  return (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      <FlagIcon className="h-3 w-3 mr-1" />
                                      {flag.type}
                                    </Badge>
                                  )
                                })}
                                {item.flags.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{item.flags.length - 3} more
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Content Detail */}
            <Card>
              <CardHeader>
                <CardTitle>Content Review</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedContent ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Content ID</Label>
                        <p className="font-mono text-sm">{selectedContent.contentId}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                        <p className="capitalize">{selectedContent.contentType}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Risk Score</Label>
                        <div className="flex items-center gap-2">
                          <Progress value={selectedContent.score * 100} className="flex-1" />
                          <span className="text-sm font-medium">{Math.round(selectedContent.score * 100)}%</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Confidence</Label>
                        <div className="flex items-center gap-2">
                          <Progress value={selectedContent.confidence * 100} className="flex-1" />
                          <span className="text-sm font-medium">{Math.round(selectedContent.confidence * 100)}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Flags</Label>
                      <div className="space-y-3 mt-2">
                        {selectedContent.flags.map((flag, index) => {
                          const FlagIcon = getFlagIcon(flag.type)
                          return (
                            <div key={index} className="border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <FlagIcon className="h-4 w-4" />
                                  <span className="font-medium capitalize">{flag.type.replace('_', ' ')}</span>
                                </div>
                                <Badge className={`text-xs ${getSeverityColor(flag.severity)}`}>
                                  {flag.severity}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{flag.description}</p>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs text-muted-foreground">Confidence:</span>
                                <Progress value={flag.confidence * 100} className="w-20" />
                                <span className="text-xs">{Math.round(flag.confidence * 100)}%</span>
                              </div>
                              {flag.evidence.length > 0 && (
                                <div>
                                  <Label className="text-xs text-muted-foreground">Evidence:</Label>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {flag.evidence.map((evidence, i) => (
                                      <Badge key={i} variant="outline" className="text-xs">
                                        "{evidence}"
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Recommended Action</Label>
                      <div className="mt-2 p-3 border rounded-lg bg-muted/20">
                        <div className="flex items-center gap-2 mb-1">
                          {selectedContent.action.type === 'allow' && <CheckCircle className="h-4 w-4 text-green-500" />}
                          {selectedContent.action.type === 'flag' && <Flag className="h-4 w-4 text-yellow-500" />}
                          {selectedContent.action.type === 'hide' && <EyeOff className="h-4 w-4 text-orange-500" />}
                          {selectedContent.action.type === 'delete' && <Trash2 className="h-4 w-4 text-red-500" />}
                          <span className="font-medium capitalize">{selectedContent.action.type}</span>
                          {selectedContent.action.automatic && (
                            <Badge variant="outline" className="text-xs">Auto</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{selectedContent.action.reason}</p>
                      </div>
                    </div>
                    
                    {selectedContent.status === 'flagged' || selectedContent.status === 'pending' ? (
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleReviewContent(selectedContent.id, 'approve')}
                          className="flex-1"
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          variant="destructive"
                          onClick={() => handleReviewContent(selectedContent.id, 'reject')}
                          className="flex-1"
                        >
                          <ThumbsDown className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <div className="p-3 border rounded-lg bg-muted/20 text-center">
                        <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          This content has already been reviewed
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Eye className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">No Content Selected</h3>
                    <p className="text-muted-foreground">
                      Select an item from the queue to review its details
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          {statistics && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Flags by Type */}
                <Card>
                  <CardHeader>
                    <CardTitle>Flags by Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(statistics.flagsByType).map(([type, count]) => (
                        <div key={type} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {(() => {
                              const Icon = getFlagIcon(type as any)
                              return <Icon className="h-4 w-4" />
                            })()}
                            <span className="capitalize">{type.replace('_', ' ')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full"
                                style={{ 
                                  width: `${(count / Math.max(...Object.values(statistics.flagsByType))) * 100}%` 
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium w-12 text-right">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions by Type */}
                <Card>
                  <CardHeader>
                    <CardTitle>Actions Taken</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(statistics.actionsByType).map(([action, count]) => (
                        <div key={action} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {action === 'allow' && <CheckCircle className="h-4 w-4 text-green-500" />}
                            {action === 'flag' && <Flag className="h-4 w-4 text-yellow-500" />}
                            {action === 'hide' && <EyeOff className="h-4 w-4 text-orange-500" />}
                            {action === 'delete' && <Trash2 className="h-4 w-4 text-red-500" />}
                            <span className="capitalize">{action}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 rounded-full"
                                style={{ 
                                  width: `${(count / Math.max(...Object.values(statistics.actionsByType))) * 100}%` 
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium w-12 text-right">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {Math.round(statistics.averageScore * 100)}%
                      </div>
                      <p className="text-sm text-muted-foreground">Average Risk Score</p>
                      <Progress value={statistics.averageScore * 100} className="mt-2" />
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">
                        {Math.round(statistics.averageConfidence * 100)}%
                      </div>
                      <p className="text-sm text-muted-foreground">Average Confidence</p>
                      <Progress value={statistics.averageConfidence * 100} className="mt-2" />
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">
                        {Math.round((statistics.autoActions / statistics.totalModerated) * 100)}%
                      </div>
                      <p className="text-sm text-muted-foreground">Automation Rate</p>
                      <Progress value={(statistics.autoActions / statistics.totalModerated) * 100} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {config && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Enable Moderation</Label>
                      <p className="text-sm text-muted-foreground">Turn on/off content moderation</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.enabled}
                      onChange={(e) => handleConfigUpdate({ enabled: e.target.checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Auto Actions</Label>
                      <p className="text-sm text-muted-foreground">Automatically execute moderation actions</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.autoAction}
                      onChange={(e) => handleConfigUpdate({ autoAction: e.target.checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Strict Mode</Label>
                      <p className="text-sm text-muted-foreground">Use stricter detection thresholds</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.strictMode}
                      onChange={(e) => handleConfigUpdate({ strictMode: e.target.checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Detection Thresholds</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(config.thresholds).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="capitalize">{key.replace('_', ' ')}</Label>
                        <span className="text-sm font-medium">{Math.round(value * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={value}
                        onChange={(e) => handleConfigUpdate({
                          thresholds: { ...config.thresholds, [key]: parseFloat(e.target.value) }
                        })}
                        className="w-full"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Blacklisted Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {config.blacklist.map((term, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {term}
                          <button
                            onClick={() => handleConfigUpdate({
                              blacklist: config.blacklist.filter((_, i) => i !== index)
                            })}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="Add blacklisted term..." />
                      <Button size="sm">Add</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exempt Roles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {config.exemptRoles.map((role, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="capitalize">{role}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleConfigUpdate({
                            exemptRoles: config.exemptRoles.filter((_, i) => i !== index)
                          })}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}