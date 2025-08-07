"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Bell, BellRing, X, Check, Clock, Users, 
  Sparkles, MessageSquare, Upload, Star,
  Play, BookOpen, AlertCircle, Info
} from 'lucide-react'
import { toast } from 'sonner'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'community' | 'content' | 'system'
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  isLive?: boolean
  actionUrl?: string
  metadata?: {
    authorName?: string
    contentTitle?: string
    rating?: number
    views?: number
  }
}

// Mock notifications - in real app would come from WebSocket/API
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'content',
    title: 'New Interactive Lesson Available',
    message: 'Enhanced Interactive Experience has been published by Sarah Johnson',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    isRead: false,
    actionUrl: '/demo/enhanced-interactive',
    metadata: {
      authorName: 'Sarah Johnson',
      contentTitle: 'Enhanced Interactive Experience',
      rating: 4.9
    }
  },
  {
    id: '2',
    type: 'community',
    title: 'Power Hour Starting Soon',
    message: 'Join 12 other learners in a live React Hooks session',
    timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    isRead: false,
    isLive: true,
    actionUrl: '/community/power-hour',
    metadata: {
      views: 12
    }
  },
  {
    id: '3',
    type: 'success',
    title: 'Quiz Completed Successfully',
    message: 'You scored 95% on the React Hooks Deep Dive quiz!',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isRead: false,
    metadata: {
      rating: 4.8
    }
  },
  {
    id: '4',
    type: 'system',
    title: 'Interactive Builder Updated',
    message: 'New AI assistance features are now available in the lesson builder',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: true,
    actionUrl: '/teach/interactive'
  },
  {
    id: '5',
    type: 'content',
    title: 'Recommended Content',
    message: 'Based on your progress, you might like "Advanced JavaScript Patterns"',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    isRead: true,
    actionUrl: '/demo/content-discovery',
    metadata: {
      contentTitle: 'Advanced JavaScript Patterns',
      rating: 4.7
    }
  }
]

export function NotificationBadge() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.isRead).length
  const recentNotifications = notifications
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5)

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new notifications for demo
      if (Math.random() > 0.8) { // 20% chance every 10 seconds
        const newNotification: Notification = {
          id: `notif_${Date.now()}`,
          type: Math.random() > 0.5 ? 'community' : 'content',
          title: Math.random() > 0.5 ? 'New Content Available' : 'Live Session Starting',
          message: Math.random() > 0.5 
            ? 'A new interactive lesson has been published'
            : 'Join others in a collaborative coding session',
          timestamp: new Date(),
          isRead: false,
          isLive: Math.random() > 0.7,
          actionUrl: Math.random() > 0.5 ? '/demo/enhanced-interactive' : '/community/power-hour'
        }
        
        setNotifications(prev => [newNotification, ...prev])
        
        // Show toast notification
        toast.info(newNotification.title, {
          description: newNotification.message,
        })
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
  }

  const getNotificationIcon = (type: string, isLive?: boolean) => {
    if (isLive) return <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
    
    switch (type) {
      case 'content': return <BookOpen className="h-4 w-4 text-blue-500" />
      case 'community': return <Users className="h-4 w-4 text-orange-500" />
      case 'success': return <Check className="h-4 w-4 text-green-500" />
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'system': return <Sparkles className="h-4 w-4 text-purple-500" />
      default: return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          {unreadCount > 0 ? <BellRing className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-96 p-0">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
                <Badge variant="secondary" className="text-xs">
                  {notifications.length}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              {recentNotifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-40" />
                  <p>No notifications yet</p>
                  <p className="text-xs mt-1">You'll see updates about your learning progress here</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {recentNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                        !notification.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-1 flex-shrink-0">
                          {getNotificationIcon(notification.type, notification.isLive)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`text-sm font-medium truncate ${
                              !notification.isRead ? 'font-semibold' : ''
                            }`}>
                              {notification.title}
                              {notification.isLive && (
                                <Badge variant="destructive" className="ml-2 text-xs animate-pulse">
                                  LIVE
                                </Badge>
                              )}
                            </h4>
                            <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                              {!notification.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeNotification(notification.id)}
                                className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            
                            {notification.actionUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  window.location.href = notification.actionUrl!
                                  markAsRead(notification.id)
                                  setIsOpen(false)
                                }}
                                className="text-xs h-6"
                              >
                                View
                              </Button>
                            )}
                          </div>
                          
                          {notification.metadata && (
                            <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                              {notification.metadata.authorName && (
                                <span>by {notification.metadata.authorName}</span>
                              )}
                              {notification.metadata.rating && (
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                  <span>{notification.metadata.rating}</span>
                                </div>
                              )}
                              {notification.metadata.views && (
                                <div className="flex items-center space-x-1">
                                  <Users className="h-3 w-3" />
                                  <span>{notification.metadata.views}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            
            {notifications.length > 5 && (
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 text-center">
                <Button variant="outline" size="sm" className="text-xs">
                  View all notifications
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}