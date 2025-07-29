export interface ActivityLog {
  id: string
  timestamp: string
  userId: string
  userEmail: string
  userName: string
  userRole: string
  action: string
  resource: string
  resourceId?: string
  details: Record<string, any>
  ipAddress: string
  userAgent: string
  sessionId: string
  severity: 'info' | 'warning' | 'error' | 'critical'
  category: 'auth' | 'user_management' | 'content' | 'system' | 'security' | 'data'
  success: boolean
  duration?: number
  changes?: {
    before: Record<string, any>
    after: Record<string, any>
  }
  metadata?: {
    source: string
    version: string
    environment: string
  }
}

export interface AuditFilters {
  userId?: string
  action?: string
  resource?: string
  category?: ActivityLog['category']
  severity?: ActivityLog['severity']
  dateFrom?: string
  dateTo?: string
  success?: boolean
  limit?: number
  offset?: number
}

export interface AuditStatistics {
  totalActivities: number
  uniqueUsers: number
  failedAttempts: number
  criticalEvents: number
  topActions: Array<{ action: string; count: number }>
  topUsers: Array<{ userId: string; userName: string; count: number }>
  activityByHour: Array<{ hour: number; count: number }>
  activityByDay: Array<{ date: string; count: number }>
}

export class ActivityLogger {
  private static instance: ActivityLogger
  private logs: ActivityLog[] = []
  private maxLogs = 10000 // Keep last 10k logs in memory
  
  static getInstance(): ActivityLogger {
    if (!ActivityLogger.instance) {
      ActivityLogger.instance = new ActivityLogger()
    }
    return ActivityLogger.instance
  }

  // Log an activity
  async logActivity(activity: Omit<ActivityLog, 'id' | 'timestamp'>) {
    const logEntry: ActivityLog = {
      ...activity,
      id: this.generateId(),
      timestamp: new Date().toISOString()
    }

    // Add to in-memory logs
    this.logs.unshift(logEntry)
    
    // Maintain log limit
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs)
    }

    // In production, this would also persist to database/external service
    await this.persistToStorage(logEntry)
    
    // Check for security alerts
    this.checkSecurityPatterns(logEntry)
    
    return logEntry.id
  }

  // Get activities with filtering
  getActivities(filters: AuditFilters = {}): ActivityLog[] {
    let filtered = [...this.logs]

    if (filters.userId) {
      filtered = filtered.filter(log => log.userId === filters.userId)
    }
    if (filters.action) {
      filtered = filtered.filter(log => log.action.toLowerCase().includes(filters.action.toLowerCase()))
    }
    if (filters.resource) {
      filtered = filtered.filter(log => log.resource.toLowerCase().includes(filters.resource.toLowerCase()))
    }
    if (filters.category) {
      filtered = filtered.filter(log => log.category === filters.category)
    }
    if (filters.severity) {
      filtered = filtered.filter(log => log.severity === filters.severity)
    }
    if (filters.success !== undefined) {
      filtered = filtered.filter(log => log.success === filters.success)
    }
    if (filters.dateFrom) {
      filtered = filtered.filter(log => log.timestamp >= filters.dateFrom!)
    }
    if (filters.dateTo) {
      filtered = filtered.filter(log => log.timestamp <= filters.dateTo!)
    }

    // Apply pagination
    const offset = filters.offset || 0
    const limit = filters.limit || 50
    return filtered.slice(offset, offset + limit)
  }

  // Get audit statistics
  getStatistics(dateFrom?: string, dateTo?: string): AuditStatistics {
    let filtered = this.logs
    
    if (dateFrom) {
      filtered = filtered.filter(log => log.timestamp >= dateFrom)
    }
    if (dateTo) {
      filtered = filtered.filter(log => log.timestamp <= dateTo)
    }

    const actionCounts = new Map<string, number>()
    const userCounts = new Map<string, { name: string; count: number }>()
    const hourCounts = new Array(24).fill(0)
    const dayCounts = new Map<string, number>()

    filtered.forEach(log => {
      // Count actions
      actionCounts.set(log.action, (actionCounts.get(log.action) || 0) + 1)
      
      // Count users
      const userKey = log.userId
      if (userCounts.has(userKey)) {
        userCounts.get(userKey)!.count++
      } else {
        userCounts.set(userKey, { name: log.userName, count: 1 })
      }
      
      // Count by hour
      const hour = new Date(log.timestamp).getHours()
      hourCounts[hour]++
      
      // Count by day
      const day = log.timestamp.split('T')[0]
      dayCounts.set(day, (dayCounts.get(day) || 0) + 1)
    })

    return {
      totalActivities: filtered.length,
      uniqueUsers: userCounts.size,
      failedAttempts: filtered.filter(log => !log.success).length,
      criticalEvents: filtered.filter(log => log.severity === 'critical').length,
      topActions: Array.from(actionCounts.entries())
        .map(([action, count]) => ({ action, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      topUsers: Array.from(userCounts.entries())
        .map(([userId, data]) => ({ userId, userName: data.name, count: data.count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      activityByHour: hourCounts.map((count, hour) => ({ hour, count })),
      activityByDay: Array.from(dayCounts.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date))
    }
  }

  // Export activities to various formats
  async exportActivities(format: 'csv' | 'json' | 'xlsx', filters: AuditFilters = {}): Promise<string> {
    const activities = this.getActivities({ ...filters, limit: 10000 })
    
    switch (format) {
      case 'csv':
        return this.exportToCSV(activities)
      case 'json':
        return JSON.stringify(activities, null, 2)
      case 'xlsx':
        return this.exportToXLSX(activities)
      default:
        throw new Error(`Unsupported export format: ${format}`)
    }
  }

  // Helper methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  private async persistToStorage(log: ActivityLog): Promise<void> {
    // In production, persist to database or external logging service
    try {
      // Mock persistence - would use actual database/API
      localStorage.setItem(`audit_log_${log.id}`, JSON.stringify(log))
    } catch (error) {
      console.error('Failed to persist audit log:', error)
    }
  }

  private checkSecurityPatterns(log: ActivityLog): void {
    // Check for suspicious patterns that might indicate security issues
    const patterns = [
      {
        name: 'Multiple failed login attempts',
        check: () => {
          if (log.action === 'login' && !log.success) {
            const recentFailures = this.logs
              .filter(l => l.userId === log.userId && l.action === 'login' && !l.success)
              .filter(l => Date.now() - new Date(l.timestamp).getTime() < 15 * 60 * 1000) // Last 15 minutes
            
            return recentFailures.length >= 5
          }
          return false
        },
        severity: 'warning' as const
      },
      {
        name: 'Admin privilege escalation',
        check: () => {
          return log.action === 'role_change' && 
                 log.details.newRole === 'admin' && 
                 log.details.oldRole !== 'admin'
        },
        severity: 'critical' as const
      },
      {
        name: 'Bulk data access',
        check: () => {
          return log.resource === 'user_data' && 
                 log.details.recordCount && 
                 log.details.recordCount > 1000
        },
        severity: 'warning' as const
      },
      {
        name: 'Unusual access time',
        check: () => {
          const hour = new Date(log.timestamp).getHours()
          return hour < 6 || hour > 22 // Outside business hours
        },
        severity: 'info' as const
      }
    ]

    patterns.forEach(pattern => {
      if (pattern.check()) {
        this.triggerSecurityAlert(pattern.name, log, pattern.severity)
      }
    })
  }

  private triggerSecurityAlert(patternName: string, log: ActivityLog, severity: 'info' | 'warning' | 'critical'): void {
    // This would integrate with the notification system
    console.warn(`Security pattern detected: ${patternName}`, {
      userId: log.userId,
      action: log.action,
      timestamp: log.timestamp,
      severity
    })
  }

  private exportToCSV(activities: ActivityLog[]): string {
    const headers = [
      'Timestamp', 'User ID', 'User Name', 'User Email', 'Role', 'Action',
      'Resource', 'Resource ID', 'Success', 'Severity', 'Category', 'IP Address',
      'User Agent', 'Duration', 'Details'
    ]

    const rows = activities.map(log => [
      log.timestamp,
      log.userId,
      log.userName,
      log.userEmail,
      log.userRole,
      log.action,
      log.resource,
      log.resourceId || '',
      log.success ? 'Yes' : 'No',
      log.severity,
      log.category,
      log.ipAddress,
      log.userAgent,
      log.duration?.toString() || '',
      JSON.stringify(log.details)
    ])

    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')
  }

  private exportToXLSX(activities: ActivityLog[]): string {
    // This would use a library like SheetJS to create actual XLSX
    // For now, return CSV format
    return this.exportToCSV(activities)
  }

  // Predefined logging methods for common activities
  static async logUserAction(
    userId: string, 
    userInfo: { email: string; name: string; role: string },
    action: string,
    details: Record<string, any>,
    success: boolean = true,
    request?: { ip: string; userAgent: string; sessionId: string }
  ) {
    const logger = ActivityLogger.getInstance()
    
    return logger.logActivity({
      userId,
      userEmail: userInfo.email,
      userName: userInfo.name,
      userRole: userInfo.role,
      action,
      resource: 'user',
      details,
      success,
      severity: success ? 'info' : 'warning',
      category: 'user_management',
      ipAddress: request?.ip || 'unknown',
      userAgent: request?.userAgent || 'unknown',
      sessionId: request?.sessionId || 'unknown'
    })
  }

  static async logSystemEvent(
    action: string,
    details: Record<string, any>,
    severity: ActivityLog['severity'] = 'info',
    adminUser?: { id: string; email: string; name: string; role: string }
  ) {
    const logger = ActivityLogger.getInstance()
    
    return logger.logActivity({
      userId: adminUser?.id || 'system',
      userEmail: adminUser?.email || 'system@platform.com',
      userName: adminUser?.name || 'System',
      userRole: adminUser?.role || 'system',
      action,
      resource: 'system',
      details,
      success: true,
      severity,
      category: 'system',
      ipAddress: 'localhost',
      userAgent: 'system',
      sessionId: 'system'
    })
  }

  static async logSecurityEvent(
    userId: string,
    userInfo: { email: string; name: string; role: string },
    action: string,
    details: Record<string, any>,
    success: boolean,
    severity: ActivityLog['severity'] = 'warning',
    request?: { ip: string; userAgent: string; sessionId: string }
  ) {
    const logger = ActivityLogger.getInstance()
    
    return logger.logActivity({
      userId,
      userEmail: userInfo.email,
      userName: userInfo.name,
      userRole: userInfo.role,
      action,
      resource: 'security',
      details,
      success,
      severity,
      category: 'security',
      ipAddress: request?.ip || 'unknown',
      userAgent: request?.userAgent || 'unknown',
      sessionId: request?.sessionId || 'unknown'
    })
  }

  static async logDataAccess(
    userId: string,
    userInfo: { email: string; name: string; role: string },
    resource: string,
    resourceId: string,
    action: string,
    details: Record<string, any>,
    request?: { ip: string; userAgent: string; sessionId: string }
  ) {
    const logger = ActivityLogger.getInstance()
    
    return logger.logActivity({
      userId,
      userEmail: userInfo.email,
      userName: userInfo.name,
      userRole: userInfo.role,
      action,
      resource,
      resourceId,
      details,
      success: true,
      severity: 'info',
      category: 'data',
      ipAddress: request?.ip || 'unknown',
      userAgent: request?.userAgent || 'unknown',
      sessionId: request?.sessionId || 'unknown'
    })
  }
}