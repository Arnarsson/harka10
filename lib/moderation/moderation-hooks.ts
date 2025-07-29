import { ContentModerationService, moderatePost, moderateComment } from './content-moderation'
import { NotificationService } from '../notifications/notification-system'
import { ActivityLogger } from '../audit/activity-logger'

// Integration hooks for automatic moderation across the platform

export interface ModerationHookContext {
  userId: string
  userEmail: string
  userName: string
  userRole: string
  ipAddress?: string
  userAgent?: string
  sessionId?: string
}

export class ModerationHooks {
  private static instance: ModerationHooks
  private moderationService: ContentModerationService
  private notificationService: NotificationService

  static getInstance(): ModerationHooks {
    if (!ModerationHooks.instance) {
      ModerationHooks.instance = new ModerationHooks()
    }
    return ModerationHooks.instance
  }

  constructor() {
    this.moderationService = ContentModerationService.getInstance()
    this.notificationService = NotificationService.getInstance()
  }

  // Hook for new discussion posts
  async onDiscussionPostCreate(
    postId: string,
    content: string,
    context: ModerationHookContext
  ): Promise<{ allowed: boolean; reason?: string }> {
    try {
      const result = await moderatePost(postId, content, context.userId, context.userEmail, context.userName)
      
      // Log the moderation attempt
      await ActivityLogger.logUserAction(
        context.userId,
        { email: context.userEmail, name: context.userName, role: context.userRole },
        'create_discussion_post',
        { postId, moderationScore: result.score, action: result.action.type },
        result.action.type === 'allow',
        { ip: context.ipAddress || 'unknown', userAgent: context.userAgent || 'unknown', sessionId: context.sessionId || 'unknown' }
      )

      // Handle moderation actions
      switch (result.action.type) {
        case 'allow':
          return { allowed: true }
        
        case 'flag':
          // Allow post but flag for review
          this.notificationService.addNotification(
            NotificationService.createContentModerationNotification(
              'discussion post',
              'flagged for review',
              `Post by ${context.userName} has been flagged (Score: ${Math.round(result.score * 100)}%)`
            )
          )
          return { allowed: true }
        
        case 'hide':
          // Hide post from public view
          this.notificationService.addNotification(
            NotificationService.createContentModerationNotification(
              'discussion post',
              'hidden',
              `Post by ${context.userName} has been automatically hidden due to policy violations`
            )
          )
          return { allowed: false, reason: 'Content has been hidden due to policy violations' }
        
        case 'delete':
          // Block post creation
          this.notificationService.addNotification(
            NotificationService.createContentModerationNotification(
              'discussion post',
              'blocked',
              `Post by ${context.userName} was blocked due to severe policy violations`
            )
          )
          return { allowed: false, reason: 'Content violates community guidelines and cannot be posted' }
        
        default:
          return { allowed: true }
      }
    } catch (error) {
      console.error('Error in discussion post moderation hook:', error)
      // Fail safe - allow content but log error
      return { allowed: true }
    }
  }

  // Hook for new comments
  async onCommentCreate(
    commentId: string,
    content: string,
    context: ModerationHookContext
  ): Promise<{ allowed: boolean; reason?: string }> {
    try {
      const result = await moderateComment(commentId, content, context.userId, context.userEmail, context.userName)
      
      await ActivityLogger.logUserAction(
        context.userId,
        { email: context.userEmail, name: context.userName, role: context.userRole },
        'create_comment',
        { commentId, moderationScore: result.score, action: result.action.type },
        result.action.type === 'allow',
        { ip: context.ipAddress || 'unknown', userAgent: context.userAgent || 'unknown', sessionId: context.sessionId || 'unknown' }
      )

      return this.handleModerationResult(result, 'comment', context)
    } catch (error) {
      console.error('Error in comment moderation hook:', error)
      return { allowed: true }
    }
  }

  // Hook for lesson content creation/updates
  async onLessonContentUpdate(
    lessonId: string,
    content: string,
    context: ModerationHookContext
  ): Promise<{ allowed: boolean; reason?: string }> {
    try {
      // For lesson content, we might want stricter moderation
      const contentToModerate = {
        id: lessonId,
        type: 'lesson' as const,
        content,
        authorId: context.userId,
        authorEmail: context.userEmail,
        authorName: context.userName,
        metadata: {},
        createdAt: new Date().toISOString()
      }

      const result = await this.moderationService.moderateContent(contentToModerate)
      
      await ActivityLogger.logUserAction(
        context.userId,
        { email: context.userEmail, name: context.userName, role: context.userRole },
        'update_lesson_content',
        { lessonId, moderationScore: result.score, action: result.action.type },
        result.action.type === 'allow',
        { ip: context.ipAddress || 'unknown', userAgent: context.userAgent || 'unknown', sessionId: context.sessionId || 'unknown' }
      )

      return this.handleModerationResult(result, 'lesson', context)
    } catch (error) {
      console.error('Error in lesson content moderation hook:', error)
      return { allowed: true }
    }
  }

  // Hook for user profile updates
  async onProfileUpdate(
    userId: string,
    profileData: { bio?: string; about?: string; [key: string]: any },
    context: ModerationHookContext
  ): Promise<{ allowed: boolean; reason?: string; blockedFields?: string[] }> {
    try {
      const textFields = ['bio', 'about', 'description', 'summary']
      const blockedFields: string[] = []
      let overallAllowed = true
      let reasons: string[] = []

      // Check each text field in profile
      for (const field of textFields) {
        if (profileData[field] && typeof profileData[field] === 'string') {
          const contentToModerate = {
            id: `${userId}-${field}`,
            type: 'user_profile' as const,
            content: profileData[field],
            authorId: context.userId,
            authorEmail: context.userEmail,
            authorName: context.userName,
            metadata: {},
            createdAt: new Date().toISOString()
          }

          const result = await this.moderationService.moderateContent(contentToModerate)
          
          if (result.action.type !== 'allow') {
            blockedFields.push(field)
            reasons.push(`${field}: ${result.action.reason}`)
            
            if (result.action.type === 'delete' || result.score > 0.8) {
              overallAllowed = false
            }
          }
        }
      }

      await ActivityLogger.logUserAction(
        context.userId,
        { email: context.userEmail, name: context.userName, role: context.userRole },
        'update_profile',
        { blockedFields, allowed: overallAllowed },
        overallAllowed,
        { ip: context.ipAddress || 'unknown', userAgent: context.userAgent || 'unknown', sessionId: context.sessionId || 'unknown' }
      )

      if (blockedFields.length > 0) {
        this.notificationService.addNotification(
          NotificationService.createContentModerationNotification(
            'user profile',
            'fields blocked',
            `Profile update by ${context.userName} had ${blockedFields.length} fields blocked`
          )
        )
      }

      return {
        allowed: overallAllowed,
        reason: reasons.length > 0 ? reasons.join('; ') : undefined,
        blockedFields
      }
    } catch (error) {
      console.error('Error in profile update moderation hook:', error)
      return { allowed: true }
    }
  }

  // Hook for bulk content operations (like imports)
  async onBulkContentImport(
    contentItems: Array<{ id: string; content: string; type: string }>,
    context: ModerationHookContext
  ): Promise<{ allowed: Array<{ id: string; allowed: boolean; reason?: string }> }> {
    const results = []

    for (const item of contentItems) {
      try {
        const contentToModerate = {
          id: item.id,
          type: item.type as any,
          content: item.content,
          authorId: context.userId,
          authorEmail: context.userEmail,
          authorName: context.userName,
          metadata: {},
          createdAt: new Date().toISOString()
        }

        const result = await this.moderationService.moderateContent(contentToModerate)
        
        results.push({
          id: item.id,
          allowed: result.action.type === 'allow' || result.action.type === 'flag',
          reason: result.action.type !== 'allow' ? result.action.reason : undefined
        })
      } catch (error) {
        console.error(`Error moderating bulk content item ${item.id}:`, error)
        results.push({
          id: item.id,
          allowed: true // Fail safe
        })
      }
    }

    // Log bulk operation
    const allowed = results.filter(r => r.allowed).length
    const blocked = results.length - allowed
    
    await ActivityLogger.logUserAction(
      context.userId,
      { email: context.userEmail, name: context.userName, role: context.userRole },
      'bulk_content_import',
      { totalItems: results.length, allowed, blocked },
      blocked === 0,
      { ip: context.ipAddress || 'unknown', userAgent: context.userAgent || 'unknown', sessionId: context.sessionId || 'unknown' }
    )

    if (blocked > 0) {
      this.notificationService.addNotification(
        NotificationService.createContentModerationNotification(
          'bulk import',
          'items blocked',
          `Bulk import by ${context.userName}: ${blocked}/${results.length} items blocked`
        )
      )
    }

    return { allowed: results }
  }

  private async handleModerationResult(
    result: any,
    contentType: string,
    context: ModerationHookContext
  ): Promise<{ allowed: boolean; reason?: string }> {
    switch (result.action.type) {
      case 'allow':
        return { allowed: true }
      
      case 'flag':
        this.notificationService.addNotification(
          NotificationService.createContentModerationNotification(
            contentType,
            'flagged for review',
            `Content by ${context.userName} has been flagged (Score: ${Math.round(result.score * 100)}%)`
          )
        )
        return { allowed: true }
      
      case 'hide':
        this.notificationService.addNotification(
          NotificationService.createContentModerationNotification(
            contentType,
            'hidden',
            `Content by ${context.userName} has been automatically hidden`
          )
        )
        return { allowed: false, reason: result.action.reason }
      
      case 'delete':
        this.notificationService.addNotification(
          NotificationService.createContentModerationNotification(
            contentType,
            'blocked',
            `Content by ${context.userName} was blocked due to severe violations`
          )
        )
        return { allowed: false, reason: result.action.reason }
      
      default:
        return { allowed: true }
    }
  }

  // Method to check if user should be banned based on repeated violations
  async checkUserViolationHistory(userId: string): Promise<{
    shouldBan: boolean
    violations: number
    recentViolations: number
    recommendation: 'none' | 'warn' | 'restrict' | 'ban'
  }> {
    try {
      // In a real implementation, this would query the database for user's moderation history
      // For now, return mock data
      const mockViolations = Math.floor(Math.random() * 10)
      const mockRecentViolations = Math.floor(Math.random() * 5)
      
      let recommendation: 'none' | 'warn' | 'restrict' | 'ban' = 'none'
      
      if (mockRecentViolations >= 3) {
        recommendation = 'ban'
      } else if (mockRecentViolations >= 2) {
        recommendation = 'restrict'
      } else if (mockViolations >= 5) {
        recommendation = 'warn'
      }

      return {
        shouldBan: recommendation === 'ban',
        violations: mockViolations,
        recentViolations: mockRecentViolations,
        recommendation
      }
    } catch (error) {
      console.error('Error checking user violation history:', error)
      return {
        shouldBan: false,
        violations: 0,
        recentViolations: 0,
        recommendation: 'none'
      }
    }
  }
}

// Helper functions for easy integration
export const moderationHooks = ModerationHooks.getInstance()

export async function moderateDiscussionPost(
  postId: string,
  content: string,
  context: ModerationHookContext
) {
  return await moderationHooks.onDiscussionPostCreate(postId, content, context)
}

export async function moderateComment(
  commentId: string,
  content: string,
  context: ModerationHookContext
) {
  return await moderationHooks.onCommentCreate(commentId, content, context)
}

export async function moderateLessonContent(
  lessonId: string,
  content: string,
  context: ModerationHookContext
) {
  return await moderationHooks.onLessonContentUpdate(lessonId, content, context)
}

export async function moderateProfileUpdate(
  userId: string,
  profileData: { bio?: string; about?: string; [key: string]: any },
  context: ModerationHookContext
) {
  return await moderationHooks.onProfileUpdate(userId, profileData, context)
}