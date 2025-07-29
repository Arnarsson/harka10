export interface ModerationResult {
  id: string
  contentId: string
  contentType: 'post' | 'comment' | 'lesson' | 'message' | 'user_profile'
  score: number
  flags: ModerationFlag[]
  action: ModerationAction
  confidence: number
  timestamp: string
  reviewerId?: string
  reviewerNote?: string
  status: 'pending' | 'approved' | 'rejected' | 'flagged'
}

export interface ModerationFlag {
  type: 'spam' | 'profanity' | 'harassment' | 'inappropriate' | 'copyright' | 'violence' | 'hate_speech' | 'adult_content'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  confidence: number
  evidence: string[]
}

export interface ModerationAction {
  type: 'allow' | 'flag' | 'hide' | 'delete' | 'ban_user'
  reason: string
  automatic: boolean
  expiry?: string
}

export interface ContentToModerate {
  id: string
  type: 'post' | 'comment' | 'lesson' | 'message' | 'user_profile'
  content: string
  authorId: string
  authorEmail: string
  authorName: string
  metadata: {
    ip?: string
    userAgent?: string
    location?: string
    images?: string[]
    links?: string[]
    attachments?: string[]
  }
  createdAt: string
}

export interface ModerationConfig {
  enabled: boolean
  autoAction: boolean
  strictMode: boolean
  thresholds: {
    spam: number
    profanity: number
    harassment: number
    overall: number
  }
  whitelist: string[]
  blacklist: string[]
  trustedUsers: string[]
  exemptRoles: string[]
}

export class ContentModerationService {
  private static instance: ContentModerationService
  private config: ModerationConfig = {
    enabled: true,
    autoAction: true,
    strictMode: false,
    thresholds: {
      spam: 0.7,
      profanity: 0.6,
      harassment: 0.8,
      overall: 0.65
    },
    whitelist: [],
    blacklist: [
      'spam', 'scam', 'fraud', 'fake', 'phishing',
      'casino', 'gambling', 'bitcoin', 'cryptocurrency',
      'viagra', 'pharmacy', 'pills', 'drugs'
    ],
    trustedUsers: [],
    exemptRoles: ['admin', 'moderator', 'instructor']
  }
  
  private profanityList = [
    // Common profanity patterns
    'damn', 'hell', 'crap', 'shit', 'fuck', 'bitch', 'asshole',
    'bastard', 'piss', 'cock', 'dick', 'pussy', 'whore', 'slut'
  ]

  private spamPatterns = [
    /\b(free|win|winner|congratulations|prize|lottery|click here|act now|limited time|urgent|hurry)\b/gi,
    /\b(buy now|discount|save money|cash|earnings|income|work from home)\b/gi,
    /\b(viagra|cialis|pharmacy|pills|medication|weight loss|diet pills)\b/gi,
    /\b(casino|gambling|poker|slots|bet|odds|jackpot)\b/gi,
    /https?:\/\/[^\s]+/gi, // Excessive links
    /(.)(\1{4,})/g, // Repeated characters
    /[A-Z]{10,}/g, // Excessive caps
    /\b\d{10,}\b/g // Long numbers (phone/account numbers)
  ]

  private harassmentPatterns = [
    /\b(kill yourself|kys|die|death|threat|harm|hurt|violence)\b/gi,
    /\b(stupid|idiot|moron|loser|pathetic|worthless|useless)\b/gi,
    /\b(hate|despise|disgusting|awful|terrible)\b/gi
  ]

  static getInstance(): ContentModerationService {
    if (!ContentModerationService.instance) {
      ContentModerationService.instance = new ContentModerationService()
    }
    return ContentModerationService.instance
  }

  async moderateContent(content: ContentToModerate): Promise<ModerationResult> {
    if (!this.config.enabled) {
      return this.createResult(content, [], 'allow', 0, 1.0)
    }

    // Skip moderation for exempt users
    if (this.isExemptUser(content.authorId)) {
      return this.createResult(content, [], 'allow', 0, 1.0)
    }

    const flags = await this.analyzeContent(content)
    const overallScore = this.calculateOverallScore(flags)
    const action = this.determineAction(flags, overallScore)
    const confidence = this.calculateConfidence(flags)

    const result = this.createResult(content, flags, action.type, overallScore, confidence)
    result.action = action

    // Log moderation decision
    await this.logModerationDecision(result)

    // Send notifications for flagged content
    if (action.type !== 'allow') {
      await this.notifyModerators(result)
    }

    return result
  }

  private async analyzeContent(content: ContentToModerate): Promise<ModerationFlag[]> {
    const flags: ModerationFlag[] = []
    const text = content.content.toLowerCase()

    // Spam detection
    const spamScore = await this.detectSpam(content)
    if (spamScore > this.config.thresholds.spam) {
      flags.push({
        type: 'spam',
        severity: spamScore > 0.9 ? 'critical' : spamScore > 0.8 ? 'high' : 'medium',
        description: 'Content appears to be spam or promotional',
        confidence: spamScore,
        evidence: this.getSpamEvidence(content)
      })
    }

    // Profanity detection
    const profanityScore = this.detectProfanity(text)
    if (profanityScore > this.config.thresholds.profanity) {
      flags.push({
        type: 'profanity',
        severity: profanityScore > 0.9 ? 'high' : 'medium',
        description: 'Content contains inappropriate language',
        confidence: profanityScore,
        evidence: this.getProfanityEvidence(text)
      })
    }

    // Harassment detection
    const harassmentScore = this.detectHarassment(text)
    if (harassmentScore > this.config.thresholds.harassment) {
      flags.push({
        type: 'harassment',
        severity: harassmentScore > 0.9 ? 'critical' : 'high',
        description: 'Content may contain harassment or threats',
        confidence: harassmentScore,
        evidence: this.getHarassmentEvidence(text)
      })
    }

    // Link analysis
    const linkFlags = await this.analyzeLinksSafety(content.metadata.links || [])
    flags.push(...linkFlags)

    // Image analysis (placeholder for actual AI service)
    if (content.metadata.images?.length) {
      const imageFlags = await this.analyzeImages(content.metadata.images)
      flags.push(...imageFlags)
    }

    return flags
  }

  private async detectSpam(content: ContentToModerate): Promise<number> {
    let score = 0
    let matches = 0
    const text = content.content.toLowerCase()

    // Check against spam patterns
    for (const pattern of this.spamPatterns) {
      const patternMatches = text.match(pattern)
      if (patternMatches) {
        matches += patternMatches.length
        score += 0.2
      }
    }

    // Check blacklisted terms
    for (const term of this.config.blacklist) {
      if (text.includes(term.toLowerCase())) {
        score += 0.3
        matches++
      }
    }

    // Excessive links penalty
    const links = content.metadata.links || []
    if (links.length > 3) {
      score += Math.min(links.length * 0.1, 0.5)
    }

    // Repeated content penalty
    const words = text.split(/\s+/)
    const uniqueWords = new Set(words)
    const repetitionRatio = 1 - (uniqueWords.size / words.length)
    if (repetitionRatio > 0.7) {
      score += 0.3
    }

    // Length vs content quality
    if (text.length > 50 && words.length < 10) {
      score += 0.2 // Likely gibberish or repeated characters
    }

    return Math.min(score, 1.0)
  }

  private detectProfanity(text: string): Promise<number> {
    let score = 0
    let matches = 0

    for (const word of this.profanityList) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi')
      const wordMatches = text.match(regex)
      if (wordMatches) {
        matches += wordMatches.length
        score += 0.2
      }
    }

    // Check for censored profanity (e.g., "f*ck", "sh!t")
    const censoredPattern = /\b\w*[*!@#$%]\w*\b/g
    const censoredMatches = text.match(censoredPattern)
    if (censoredMatches) {
      score += censoredMatches.length * 0.15
    }

    return Promise.resolve(Math.min(score, 1.0))
  }

  private detectHarassment(text: string): number {
    let score = 0

    for (const pattern of this.harassmentPatterns) {
      const matches = text.match(pattern)
      if (matches) {
        score += matches.length * 0.25
      }
    }

    // Check for personal attacks
    const personalAttacks = [
      /you are .*(stupid|dumb|idiot|moron)/gi,
      /shut up/gi,
      /nobody (cares|likes|wants)/gi
    ]

    for (const pattern of personalAttacks) {
      if (pattern.test(text)) {
        score += 0.3
      }
    }

    return Math.min(score, 1.0)
  }

  private async analyzeLinksSafety(links: string[]): Promise<ModerationFlag[]> {
    const flags: ModerationFlag[] = []

    for (const link of links) {
      try {
        const url = new URL(link)
        
        // Known malicious domains (simplified list)
        const maliciousDomains = [
          'bit.ly', 'tinyurl.com', 'goo.gl', 't.co' // Shortened URLs are suspicious
        ]

        if (maliciousDomains.some(domain => url.hostname.includes(domain))) {
          flags.push({
            type: 'spam',
            severity: 'medium',
            description: `Suspicious shortened URL detected: ${url.hostname}`,
            confidence: 0.7,
            evidence: [link]
          })
        }

        // Check for phishing patterns
        if (url.hostname.includes('secure') || url.hostname.includes('verify')) {
          flags.push({
            type: 'spam',
            severity: 'high',
            description: 'Potential phishing URL detected',
            confidence: 0.8,
            evidence: [link]
          })
        }

      } catch (error) {
        // Invalid URL
        flags.push({
          type: 'inappropriate',
          severity: 'low',
          description: 'Invalid URL format',
          confidence: 0.5,
          evidence: [link]
        })
      }
    }

    return flags
  }

  private async analyzeImages(imageUrls: string[]): Promise<ModerationFlag[]> {
    // Placeholder for actual image analysis service (Google Vision, AWS Rekognition, etc.)
    const flags: ModerationFlag[] = []

    for (const imageUrl of imageUrls) {
      // Mock analysis - in production, use actual AI service
      const mockScore = Math.random()
      
      if (mockScore > 0.8) {
        flags.push({
          type: 'inappropriate',
          severity: 'high',
          description: 'Image may contain inappropriate content',
          confidence: mockScore,
          evidence: [imageUrl]
        })
      }
    }

    return flags
  }

  private calculateOverallScore(flags: ModerationFlag[]): number {
    if (flags.length === 0) return 0

    const weightedScore = flags.reduce((sum, flag) => {
      const severityWeight = {
        low: 1,
        medium: 2,
        high: 3,
        critical: 4
      }[flag.severity]

      return sum + (flag.confidence * severityWeight)
    }, 0)

    const maxPossibleScore = flags.length * 4 // Max severity weight
    return Math.min(weightedScore / maxPossibleScore, 1.0)
  }

  private determineAction(flags: ModerationFlag[], overallScore: number): ModerationAction {
    if (overallScore < this.config.thresholds.overall) {
      return {
        type: 'allow',
        reason: 'Content passed moderation checks',
        automatic: true
      }
    }

    const criticalFlags = flags.filter(f => f.severity === 'critical')
    const highFlags = flags.filter(f => f.severity === 'high')

    if (criticalFlags.length > 0 || overallScore > 0.9) {
      return {
        type: 'delete',
        reason: `Critical violations detected: ${criticalFlags.map(f => f.type).join(', ')}`,
        automatic: this.config.autoAction
      }
    }

    if (highFlags.length > 1 || overallScore > 0.8) {
      return {
        type: 'hide',
        reason: `Multiple high-severity violations: ${highFlags.map(f => f.type).join(', ')}`,
        automatic: this.config.autoAction
      }
    }

    return {
      type: 'flag',
      reason: `Content flagged for manual review: ${flags.map(f => f.type).join(', ')}`,
      automatic: true
    }
  }

  private calculateConfidence(flags: ModerationFlag[]): number {
    if (flags.length === 0) return 1.0

    const avgConfidence = flags.reduce((sum, flag) => sum + flag.confidence, 0) / flags.length
    const flagCount = Math.min(flags.length / 5, 1) // More flags = higher confidence
    
    return Math.min(avgConfidence + flagCount * 0.1, 1.0)
  }

  private createResult(
    content: ContentToModerate,
    flags: ModerationFlag[],
    actionType: ModerationAction['type'],
    score: number,
    confidence: number
  ): ModerationResult {
    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      contentId: content.id,
      contentType: content.type,
      score,
      flags,
      action: {
        type: actionType,
        reason: '',
        automatic: true
      },
      confidence,
      timestamp: new Date().toISOString(),
      status: actionType === 'allow' ? 'approved' : 'flagged'
    }
  }

  private isExemptUser(userId: string): boolean {
    return this.config.trustedUsers.includes(userId)
  }

  private getSpamEvidence(content: ContentToModerate): string[] {
    const evidence: string[] = []
    const text = content.content.toLowerCase()

    for (const pattern of this.spamPatterns) {
      const matches = text.match(pattern)
      if (matches) {
        evidence.push(...matches.slice(0, 3)) // Limit evidence
      }
    }

    return evidence
  }

  private getProfanityEvidence(text: string): string[] {
    const evidence: string[] = []

    for (const word of this.profanityList) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi')
      const matches = text.match(regex)
      if (matches) {
        evidence.push(...matches.slice(0, 3))
      }
    }

    return evidence
  }

  private getHarassmentEvidence(text: string): string[] {
    const evidence: string[] = []

    for (const pattern of this.harassmentPatterns) {
      const matches = text.match(pattern)
      if (matches) {
        evidence.push(...matches.slice(0, 3))
      }
    }

    return evidence
  }

  private async logModerationDecision(result: ModerationResult): Promise<void> {
    // Integration with activity logger
    try {
      const { ActivityLogger } = await import('../audit/activity-logger')
      
      await ActivityLogger.logSystemEvent(
        'content_moderation',
        {
          contentId: result.contentId,
          contentType: result.contentType,
          action: result.action.type,
          score: result.score,
          flags: result.flags.map(f => f.type),
          confidence: result.confidence
        },
        result.action.type === 'delete' ? 'critical' : 
        result.action.type === 'hide' ? 'warning' : 'info'
      )
    } catch (error) {
      console.error('Failed to log moderation decision:', error)
    }
  }

  private async notifyModerators(result: ModerationResult): Promise<void> {
    // Integration with notification system
    try {
      const { NotificationService } = await import('../notifications/notification-system')
      
      const notificationService = NotificationService.getInstance()
      
      const notification = NotificationService.createContentModerationNotification(
        result.contentType,
        result.action.type,
        `Content flagged with ${result.flags.length} violations (Score: ${Math.round(result.score * 100)}%)`
      )

      notification.data = {
        contentId: result.contentId,
        moderationId: result.id,
        flags: result.flags
      }

      notificationService.addNotification(notification)
    } catch (error) {
      console.error('Failed to notify moderators:', error)
    }
  }

  // Admin methods
  async getModerationQueue(filters?: {
    status?: ModerationResult['status']
    contentType?: ContentToModerate['type']
    severity?: ModerationFlag['severity']
    limit?: number
  }): Promise<ModerationResult[]> {
    // In production, this would query a database
    // For now, return mock data
    return []
  }

  async reviewContent(moderationId: string, decision: 'approve' | 'reject', reviewerId: string, note?: string): Promise<void> {
    // Update moderation result with human review
    console.log(`Content ${moderationId} ${decision} by ${reviewerId}: ${note}`)
  }

  async updateConfig(newConfig: Partial<ModerationConfig>): Promise<void> {
    this.config = { ...this.config, ...newConfig }
  }

  getConfig(): ModerationConfig {
    return { ...this.config }
  }

  async getStatistics(dateFrom?: string, dateTo?: string): Promise<{
    totalModerated: number
    autoActions: number
    manualReviews: number
    flagsByType: Record<string, number>
    actionsByType: Record<string, number>
    averageScore: number
    averageConfidence: number
  }> {
    // Mock statistics - in production, query from database
    return {
      totalModerated: 1250,
      autoActions: 980,
      manualReviews: 270,
      flagsByType: {
        spam: 456,
        profanity: 234,
        harassment: 89,
        inappropriate: 167,
        copyright: 34
      },
      actionsByType: {
        allow: 850,
        flag: 270,
        hide: 95,
        delete: 35
      },
      averageScore: 0.23,
      averageConfidence: 0.82
    }
  }
}

// Content moderation middleware for API routes
export async function moderateContentMiddleware(content: ContentToModerate): Promise<ModerationResult> {
  const moderationService = ContentModerationService.getInstance()
  return await moderationService.moderateContent(content)
}

// Helper functions for common use cases
export async function moderatePost(postId: string, content: string, authorId: string, authorEmail: string, authorName: string): Promise<ModerationResult> {
  const contentToModerate: ContentToModerate = {
    id: postId,
    type: 'post',
    content,
    authorId,
    authorEmail,
    authorName,
    metadata: {},
    createdAt: new Date().toISOString()
  }

  return await moderateContentMiddleware(contentToModerate)
}

export async function moderateComment(commentId: string, content: string, authorId: string, authorEmail: string, authorName: string): Promise<ModerationResult> {
  const contentToModerate: ContentToModerate = {
    id: commentId,
    type: 'comment',
    content,
    authorId,
    authorEmail,
    authorName,
    metadata: {},
    createdAt: new Date().toISOString()
  }

  return await moderateContentMiddleware(contentToModerate)
}