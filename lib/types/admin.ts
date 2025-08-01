// Admin-specific type definitions

export interface AdminUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'instructor' | 'student' | 'user'
  status: 'active' | 'inactive' | 'suspended'
  createdAt: Date
  lastSignIn?: Date
  metadata?: {
    coursesEnrolled?: number
    coursesCompleted?: number
    totalSpent?: number
  }
}

export interface AdminSettings {
  general: GeneralSettings
  appearance: AppearanceSettings
  notifications: NotificationSettings
  security: SecuritySettings
  system: SystemSettings
  billing?: BillingSettings
}

export interface GeneralSettings {
  siteName: string
  siteDescription: string
  defaultLanguage: string
  timezone: string
  platformName?: string
  companyName?: string
}

export interface AppearanceSettings {
  primaryColor: string
  secondaryColor: string
  logoUrl: string
  faviconUrl: string
  darkMode: boolean
}

export interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  courseCompletions: boolean
  newEnrollments: boolean
  systemUpdates: boolean
  marketingCommunications: boolean
}

export interface SecuritySettings {
  registrationEnabled: boolean
  requireEmailVerification: boolean
  twoFactorEnabled: boolean
  passwordPolicy: {
    minLength: number
    requireUppercase: boolean
    requireNumbers: boolean
    requireSymbols: boolean
  }
}

export interface SystemSettings {
  maintenanceMode: boolean
  maxFileUploadSize: number // in MB
  allowedFileTypes: string[]
  apiRateLimit: number
  sessionTimeout: number // in minutes
}

export interface BillingSettings {
  stripePublishableKey?: string
  currency: string
  taxRate: number
  trialPeriodDays: number
}

export interface MediaFile {
  id: string
  filename: string
  url: string
  type: 'image' | 'video' | 'document' | 'audio'
  mimeType: string
  size: number // in bytes
  uploadedBy: string
  uploadedAt: Date
  metadata?: {
    width?: number
    height?: number
    duration?: number // for video/audio in seconds
    thumbnailUrl?: string
  }
}

export interface AuditLogEntry {
  id: string
  userId: string
  userEmail: string
  action: string
  resource: string
  resourceId?: string
  category: 'auth' | 'content' | 'settings' | 'user' | 'system'
  severity: 'info' | 'warning' | 'error' | 'critical'
  success: boolean
  ipAddress?: string
  userAgent?: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface ContentModerationItem {
  id: string
  type: 'discussion' | 'comment' | 'course' | 'lesson'
  content: string
  authorId: string
  authorName: string
  flags: ModerationFlag[]
  status: 'pending' | 'approved' | 'rejected' | 'flagged'
  reviewedBy?: string
  reviewedAt?: Date
  createdAt: Date
}

export interface ModerationFlag {
  type: 'spam' | 'inappropriate' | 'offensive' | 'copyright' | 'other'
  confidence: number // 0-1
  details?: string
  flaggedBy: 'system' | 'user'
  flaggedAt: Date
}

export interface AdminDashboardStats {
  totalUsers: number
  activeUsers: number
  totalCourses: number
  completions: number
  certificates: number
  revenue: number
  growth: {
    users: number // percentage
    revenue: number // percentage
    courses: number // percentage
  }
  recentActivity: ActivityItem[]
  topCourses: CoursePerformance[]
}

export interface ActivityItem {
  id: string
  type: 'enrollment' | 'completion' | 'certificate' | 'payment' | 'login'
  userId: string
  userName: string
  description: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface CoursePerformance {
  id: string
  title: string
  enrollments: number
  completions: number
  rating: number
  revenue: number
  completionRate: number
}

export interface BulkAction {
  type: 'export' | 'delete' | 'activate' | 'deactivate' | 'email'
  targetIds: string[]
  options?: Record<string, any>
}

export interface ExportOptions {
  format: 'csv' | 'json' | 'xlsx'
  fields?: string[]
  filters?: Record<string, any>
  dateRange?: {
    start: Date
    end: Date
  }
}