export interface AdminNotification {
  id: string
  type: 'user_action' | 'system_alert' | 'content_moderation' | 'course_activity' | 'security' | 'revenue'
  priority: 'low' | 'medium' | 'high' | 'critical'
  title: string
  message: string
  data?: Record<string, any>
  timestamp: string
  read: boolean
  actions?: NotificationAction[]
  userId?: string
  metadata?: {
    source: string
    category: string
    tags: string[]
  }
}

export interface NotificationAction {
  id: string
  label: string
  type: 'button' | 'link'
  variant: 'primary' | 'secondary' | 'danger'
  action: string
  params?: Record<string, any>
}

export interface NotificationSettings {
  enabled: boolean
  email: boolean
  push: boolean
  desktop: boolean
  sound: boolean
  types: {
    [key in AdminNotification['type']]: boolean
  }
  priorities: {
    [key in AdminNotification['priority']]: boolean
  }
}

export class NotificationService {
  private static instance: NotificationService
  private notifications: AdminNotification[] = []
  private subscribers: ((notifications: AdminNotification[]) => void)[] = []
  private settings: NotificationSettings = {
    enabled: true,
    email: true,
    push: true,
    desktop: true,
    sound: true,
    types: {
      user_action: true,
      system_alert: true,
      content_moderation: true,
      course_activity: true,
      security: true,
      revenue: true
    },
    priorities: {
      low: true,
      medium: true,
      high: true,
      critical: true
    }
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  // Subscribe to notification updates
  subscribe(callback: (notifications: AdminNotification[]) => void) {
    this.subscribers.push(callback)
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback)
    }
  }

  // Notify all subscribers
  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.notifications))
  }

  // Add new notification
  addNotification(notification: Omit<AdminNotification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: AdminNotification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false
    }

    // Check if notification should be shown based on settings
    if (!this.shouldShowNotification(newNotification)) {
      return
    }

    this.notifications.unshift(newNotification)
    
    // Limit to last 100 notifications
    if (this.notifications.length > 100) {
      this.notifications = this.notifications.slice(0, 100)
    }

    this.notifySubscribers()
    this.showDesktopNotification(newNotification)
    this.playNotificationSound(newNotification)

    return newNotification.id
  }

  // Mark notification as read
  markAsRead(id: string) {
    const notification = this.notifications.find(n => n.id === id)
    if (notification) {
      notification.read = true
      this.notifySubscribers()
    }
  }

  // Mark all notifications as read
  markAllAsRead() {
    this.notifications.forEach(n => n.read = true)
    this.notifySubscribers()
  }

  // Remove notification
  removeNotification(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id)
    this.notifySubscribers()
  }

  // Clear all notifications
  clearAll() {
    this.notifications = []
    this.notifySubscribers()
  }

  // Get notifications with filtering
  getNotifications(filters?: {
    type?: AdminNotification['type']
    priority?: AdminNotification['priority']
    read?: boolean
    limit?: number
  }) {
    let filtered = [...this.notifications]

    if (filters?.type) {
      filtered = filtered.filter(n => n.type === filters.type)
    }
    if (filters?.priority) {
      filtered = filtered.filter(n => n.priority === filters.priority)
    }
    if (filters?.read !== undefined) {
      filtered = filtered.filter(n => n.read === filters.read)
    }
    if (filters?.limit) {
      filtered = filtered.slice(0, filters.limit)
    }

    return filtered
  }

  // Get unread count
  getUnreadCount() {
    return this.notifications.filter(n => !n.read).length
  }

  // Update settings
  updateSettings(newSettings: Partial<NotificationSettings>) {
    this.settings = { ...this.settings, ...newSettings }
  }

  // Get current settings
  getSettings() {
    return { ...this.settings }
  }

  // Check if notification should be shown
  private shouldShowNotification(notification: AdminNotification): boolean {
    return this.settings.enabled &&
           this.settings.types[notification.type] &&
           this.settings.priorities[notification.priority]
  }

  // Show desktop notification
  private showDesktopNotification(notification: AdminNotification) {
    if (!this.settings.desktop || notification.priority === 'low') return

    if ('Notification' in window && Notification.permission === 'granted') {
      const desktopNotification = new Notification(notification.title, {
        body: notification.message,
        icon: '/admin-icon.png',
        tag: notification.id,
        requireInteraction: notification.priority === 'critical'
      })

      desktopNotification.onclick = () => {
        window.focus()
        desktopNotification.close()
      }

      // Auto close after 5 seconds for non-critical notifications
      if (notification.priority !== 'critical') {
        setTimeout(() => desktopNotification.close(), 5000)
      }
    }
  }

  // Play notification sound
  private playNotificationSound(notification: AdminNotification) {
    if (!this.settings.sound) return

    const audio = new Audio()
    
    switch (notification.priority) {
      case 'critical':
        audio.src = '/sounds/critical-alert.wav'
        break
      case 'high':
        audio.src = '/sounds/high-priority.wav'
        break
      default:
        audio.src = '/sounds/notification.wav'
    }

    audio.play().catch(() => {
      // Ignore audio play errors (browser restrictions)
    })
  }

  // Request desktop notification permission
  static async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return 'denied'
    }

    if (Notification.permission === 'default') {
      return await Notification.requestPermission()
    }

    return Notification.permission
  }

  // Create predefined notification templates
  static createUserActionNotification(action: string, userName: string, details?: string) {
    return {
      type: 'user_action' as const,
      priority: 'medium' as const,
      title: `User Action: ${action}`,
      message: `${userName} ${action}${details ? '. ' + details : ''}`,
      metadata: {
        source: 'user_management',
        category: 'user_action',
        tags: [action, 'user']
      }
    }
  }

  static createSystemAlertNotification(alert: string, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium') {
    return {
      type: 'system_alert' as const,
      priority: severity,
      title: 'System Alert',
      message: alert,
      metadata: {
        source: 'system',
        category: 'alert',
        tags: ['system', 'alert']
      }
    }
  }

  static createContentModerationNotification(contentType: string, action: string, details: string) {
    return {
      type: 'content_moderation' as const,
      priority: 'high' as const,
      title: `Content Moderation: ${contentType}`,
      message: `${action}: ${details}`,
      actions: [
        {
          id: 'review',
          label: 'Review',
          type: 'button' as const,
          variant: 'primary' as const,
          action: 'review_content'
        },
        {
          id: 'approve',
          label: 'Approve',
          type: 'button' as const,
          variant: 'secondary' as const,
          action: 'approve_content'
        }
      ],
      metadata: {
        source: 'content_moderation',
        category: 'moderation',
        tags: ['content', 'moderation', contentType]
      }
    }
  }

  static createCourseActivityNotification(courseTitle: string, activity: string, count?: number) {
    return {
      type: 'course_activity' as const,
      priority: 'low' as const,
      title: `Course Activity: ${courseTitle}`,
      message: `${activity}${count ? ` (${count})` : ''}`,
      metadata: {
        source: 'course_management',
        category: 'activity',
        tags: ['course', 'activity']
      }
    }
  }

  static createSecurityNotification(event: string, details: string, critical: boolean = false) {
    return {
      type: 'security' as const,
      priority: critical ? 'critical' as const : 'high' as const,
      title: `Security Alert: ${event}`,
      message: details,
      actions: critical ? [
        {
          id: 'investigate',
          label: 'Investigate',
          type: 'button' as const,
          variant: 'danger' as const,
          action: 'investigate_security'
        }
      ] : undefined,
      metadata: {
        source: 'security',
        category: 'security',
        tags: ['security', 'alert']
      }
    }
  }

  static createRevenueNotification(milestone: string, amount: number) {
    return {
      type: 'revenue' as const,
      priority: 'medium' as const,
      title: `Revenue Milestone: ${milestone}`,
      message: `Platform has reached $${amount.toLocaleString()} in total revenue!`,
      metadata: {
        source: 'revenue',
        category: 'milestone',
        tags: ['revenue', 'milestone']
      }
    }
  }
}

// WebSocket connection for real-time notifications (mock implementation)
export class NotificationWebSocket {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectInterval = 1000

  connect(userId: string) {
    try {
      // In a real implementation, this would connect to your WebSocket server
      this.ws = new WebSocket(`ws://localhost:8080/notifications?userId=${userId}`)
      
      this.ws.onopen = () => {
        console.log('Notification WebSocket connected')
        this.reconnectAttempts = 0
      }

      this.ws.onmessage = (event) => {
        try {
          const notification = JSON.parse(event.data)
          NotificationService.getInstance().addNotification(notification)
        } catch (error) {
          console.error('Failed to parse notification:', error)
        }
      }

      this.ws.onclose = () => {
        console.log('Notification WebSocket disconnected')
        this.reconnect(userId)
      }

      this.ws.onerror = (error) => {
        console.error('Notification WebSocket error:', error)
      }

    } catch (error) {
      console.error('Failed to connect to notification WebSocket:', error)
      this.reconnect(userId)
    }
  }

  private reconnect(userId: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`)
        this.connect(userId)
      }, this.reconnectInterval * this.reconnectAttempts)
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}