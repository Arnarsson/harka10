"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Bell, 
  BellRing, 
  Check, 
  X, 
  Settings, 
  Filter,
  Users,
  AlertTriangle,
  Shield,
  DollarSign,
  BookOpen,
  Eye,
  MoreVertical,
  Clock,
  CheckCheck,
  Trash2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  AdminNotification, 
  NotificationService, 
  NotificationSettings 
} from "@/lib/notifications/notification-system"
import { formatDistanceToNow } from "date-fns"

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([])
  const [settings, setSettings] = useState<NotificationSettings | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [showSettings, setShowSettings] = useState(false)
  
  const notificationService = NotificationService.getInstance()

  useEffect(() => {
    // Subscribe to notification updates
    const unsubscribe = notificationService.subscribe(setNotifications)
    
    // Load initial notifications and settings
    setNotifications(notificationService.getNotifications())
    setSettings(notificationService.getSettings())

    return unsubscribe
  }, [])

  const getNotificationIcon = (type: AdminNotification['type']) => {
    switch (type) {
      case 'user_action': return Users
      case 'system_alert': return AlertTriangle
      case 'content_moderation': return Eye
      case 'course_activity': return BookOpen
      case 'security': return Shield
      case 'revenue': return DollarSign
      default: return Bell
    }
  }

  const getPriorityColor = (priority: AdminNotification['priority']) => {
    switch (priority) {
      case 'critical': return 'border-red-500 bg-red-50'
      case 'high': return 'border-orange-500 bg-orange-50'
      case 'medium': return 'border-blue-500 bg-blue-50'
      case 'low': return 'border-gray-500 bg-gray-50'
    }
  }

  const getPriorityBadgeColor = (priority: AdminNotification['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-blue-100 text-blue-800'
      case 'low': return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true
    if (activeTab === 'unread') return !notification.read
    return notification.type === activeTab
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const handleMarkAsRead = (id: string) => {
    notificationService.markAsRead(id)
  }

  const handleMarkAllAsRead = () => {
    notificationService.markAllAsRead()
  }

  const handleRemoveNotification = (id: string) => {
    notificationService.removeNotification(id)
  }

  const handleNotificationAction = (notification: AdminNotification, actionId: string) => {
    const action = notification.actions?.find(a => a.id === actionId)
    if (action) {
      console.log('Executing action:', action.action, action.params)
      // Handle the action based on action.action
      // This would typically call an API or navigate to a specific page
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <BellRing className="h-8 w-8" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs bg-red-500">
                {unreadCount > 99 ? '99+' : unreadCount}
              </Badge>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {showSettings && settings && (
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Delivery Methods</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.desktop}
                      onChange={(e) => {
                        const newSettings = { ...settings, desktop: e.target.checked }
                        setSettings(newSettings)
                        notificationService.updateSettings(newSettings)
                      }}
                    />
                    <span className="text-sm">Desktop notifications</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.email}
                      onChange={(e) => {
                        const newSettings = { ...settings, email: e.target.checked }
                        setSettings(newSettings)
                        notificationService.updateSettings(newSettings)
                      }}
                    />
                    <span className="text-sm">Email notifications</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.sound}
                      onChange={(e) => {
                        const newSettings = { ...settings, sound: e.target.checked }
                        setSettings(newSettings)
                        notificationService.updateSettings(newSettings)
                      }}
                    />
                    <span className="text-sm">Sound alerts</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Priority Levels</h4>
                <div className="space-y-2">
                  {(['critical', 'high', 'medium', 'low'] as const).map(priority => (
                    <label key={priority} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={settings.priorities[priority]}
                        onChange={(e) => {
                          const newSettings = {
                            ...settings,
                            priorities: { ...settings.priorities, [priority]: e.target.checked }
                          }
                          setSettings(newSettings)
                          notificationService.updateSettings(newSettings)
                        }}
                      />
                      <span className="text-sm capitalize">{priority} priority</span>
                      <Badge className={`text-xs ${getPriorityBadgeColor(priority)}`}>
                        {priority}
                      </Badge>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All
            <Badge variant="secondary">{notifications.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex items-center gap-2">
            Unread
            {unreadCount > 0 && <Badge className="bg-red-500">{unreadCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="user_action">Users</TabsTrigger>
          <TabsTrigger value="system_alert">System</TabsTrigger>
          <TabsTrigger value="content_moderation">Content</TabsTrigger>
          <TabsTrigger value="course_activity">Courses</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              <AnimatePresence>
                {filteredNotifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type)
                  
                  return (
                    <motion.div
                      key={notification.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className={`border rounded-lg p-4 ${getPriorityColor(notification.priority)} ${
                        !notification.read ? 'ring-2 ring-primary/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${notification.read ? 'bg-gray-200' : 'bg-primary'}`}>
                          <Icon className={`h-4 w-4 ${notification.read ? 'text-gray-600' : 'text-primary-foreground'}`} />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{notification.title}</h4>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={`text-xs ${getPriorityBadgeColor(notification.priority)}`}>
                                {notification.priority}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                              </span>
                            </div>
                          </div>
                          
                          {notification.actions && notification.actions.length > 0 && (
                            <div className="flex items-center gap-2">
                              {notification.actions.map((action) => (
                                <Button
                                  key={action.id}
                                  size="sm"
                                  variant={action.variant === 'primary' ? 'default' : 
                                          action.variant === 'danger' ? 'destructive' : 'outline'}
                                  onClick={() => handleNotificationAction(notification, action.id)}
                                >
                                  {action.label}
                                </Button>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {notification.metadata?.tags?.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-1">
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRemoveNotification(notification.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
              
              {filteredNotifications.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                  <p className="text-muted-foreground">
                    {activeTab === 'unread' 
                      ? "You're all caught up! No unread notifications."
                      : `No ${activeTab === 'all' ? '' : activeTab.replace('_', ' ')} notifications to show.`
                    }
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}