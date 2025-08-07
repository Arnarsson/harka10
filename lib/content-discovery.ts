import { getUserRole, type UserRole } from '@/lib/auth/roles'

interface ContentItem {
  id: string
  title: string
  description: string
  type: 'course' | 'lesson' | 'interactive' | 'demo' | 'community' | 'tool'
  url: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  rating: number
  views: number
  completionRate: number
  isNew: boolean
  isLive: boolean
  duration?: string
  prerequisites: string[]
  learningObjectives: string[]
  createdAt: Date
  updatedAt: Date
}

interface UserProfile {
  id: string
  role: UserRole
  interests: string[]
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
  completedContent: string[]
  preferredDuration: 'short' | 'medium' | 'long' // <30min, 30-60min, >60min
  learningGoals: string[]
  activityHistory: {
    contentId: string
    action: 'viewed' | 'completed' | 'liked' | 'shared'
    timestamp: Date
  }[]
}

// Mock content database
const CONTENT_DATABASE: ContentItem[] = [
  {
    id: 'interactive-learning',
    title: 'Interactive Learning Demo',
    description: 'Experience AI-powered interactive lessons with hands-on coding',
    type: 'interactive',
    url: '/demo/interactive-learning',
    category: 'AI & Machine Learning',
    difficulty: 'beginner',
    tags: ['AI', 'Interactive', 'React', 'Demo'],
    rating: 4.8,
    views: 1234,
    completionRate: 0.87,
    isNew: true,
    isLive: false,
    duration: '15 min',
    prerequisites: [],
    learningObjectives: ['Understand interactive learning', 'Experience AI assistance', 'Practice with real code'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'enhanced-interactive',
    title: 'Enhanced Interactive Experience',
    description: 'Advanced interactive lessons with pause points, quizzes, and code exercises',
    type: 'interactive',
    url: '/demo/enhanced-interactive',
    category: 'Advanced Learning',
    difficulty: 'intermediate',
    tags: ['Interactive', 'Quiz', 'Code', 'Advanced', 'Pause Points'],
    rating: 4.9,
    views: 856,
    completionRate: 0.92,
    isNew: true,
    isLive: false,
    duration: '25 min',
    prerequisites: ['interactive-learning'],
    learningObjectives: ['Master interactive elements', 'Complete coding challenges', 'Understand quiz patterns'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: 'power-hour',
    title: 'Power Hour Community',
    description: 'Join live collaborative learning sessions with other students',
    type: 'community',
    url: '/community/power-hour',
    category: 'Community',
    difficulty: 'beginner',
    tags: ['Community', 'Live', 'Collaboration', 'Networking'],
    rating: 4.7,
    views: 2341,
    completionRate: 0.73,
    isNew: false,
    isLive: true,
    prerequisites: [],
    learningObjectives: ['Connect with learners', 'Collaborative problem solving', 'Build learning network'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: 'code-playground',
    title: 'Code Playground',
    description: 'Practice coding in real-time with AI assistance',
    type: 'tool',
    url: '/learn/playground',
    category: 'Development Tools',
    difficulty: 'beginner',
    tags: ['Coding', 'Practice', 'AI', 'Real-time'],
    rating: 4.6,
    views: 3421,
    completionRate: 0.65,
    isNew: false,
    isLive: true,
    prerequisites: [],
    learningObjectives: ['Practice coding skills', 'Get AI assistance', 'Experiment with code'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: 'react-hooks-course',
    title: 'React Hooks Deep Dive',
    description: 'Master useState, useEffect, and custom hooks with hands-on exercises',
    type: 'course',
    url: '/learn/courses/react-hooks',
    category: 'Web Development',
    difficulty: 'intermediate',
    tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
    rating: 4.8,
    views: 5234,
    completionRate: 0.78,
    isNew: false,
    isLive: false,
    duration: '2h 30min',
    prerequisites: ['javascript-basics'],
    learningObjectives: ['Master React Hooks', 'Build custom hooks', 'Optimize React performance'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  }
]

export class ContentDiscoveryEngine {
  private content: ContentItem[]
  
  constructor(content: ContentItem[] = CONTENT_DATABASE) {
    this.content = content
  }

  /**
   * Get personalized content recommendations for a user
   */
  getRecommendations(userProfile: UserProfile, limit: number = 6): ContentItem[] {
    const scored = this.content
      .filter(item => !userProfile.completedContent.includes(item.id))
      .map(item => ({
        item,
        score: this.calculateRelevanceScore(item, userProfile)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)

    return scored.map(s => s.item)
  }

  /**
   * Get trending content based on recent activity
   */
  getTrendingContent(limit: number = 6): ContentItem[] {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    return this.content
      .filter(item => item.updatedAt >= weekAgo || item.isNew)
      .sort((a, b) => {
        // Priority: New content, high rating, high completion rate, recent updates
        const scoreA = (a.isNew ? 100 : 0) + a.rating * 10 + a.completionRate * 50
        const scoreB = (b.isNew ? 100 : 0) + b.rating * 10 + b.completionRate * 50
        return scoreB - scoreA
      })
      .slice(0, limit)
  }

  /**
   * Get content by category
   */
  getContentByCategory(category: string, userSkillLevel?: string, limit: number = 10): ContentItem[] {
    return this.content
      .filter(item => {
        const categoryMatch = item.category.toLowerCase() === category.toLowerCase()
        const skillMatch = !userSkillLevel || item.difficulty === userSkillLevel
        return categoryMatch && skillMatch
      })
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }

  /**
   * Get learning path suggestions
   */
  getLearningPath(startingContentId: string): ContentItem[] {
    const startingContent = this.content.find(c => c.id === startingContentId)
    if (!startingContent) return []

    const relatedContent = this.content
      .filter(item => {
        // Content in same category
        const sameCategory = item.category === startingContent.category
        // Content with overlapping tags
        const sharedTags = item.tags.some(tag => startingContent.tags.includes(tag))
        // Progressive difficulty
        const nextLevel = this.getNextDifficultyLevel(startingContent.difficulty)
        const appropriateDifficulty = item.difficulty === startingContent.difficulty || 
                                    item.difficulty === nextLevel

        return item.id !== startingContentId && (sameCategory || sharedTags) && appropriateDifficulty
      })
      .sort((a, b) => {
        // Prioritize: same category > shared tags > rating
        const categoryWeight = a.category === startingContent.category ? 100 : 0
        const tagWeight = a.tags.filter(tag => startingContent.tags.includes(tag)).length * 20
        const ratingWeight = a.rating * 10
        
        const scoreA = categoryWeight + tagWeight + ratingWeight
        const scoreB = (b.category === startingContent.category ? 100 : 0) +
                      (b.tags.filter(tag => startingContent.tags.includes(tag)).length * 20) +
                      (b.rating * 10)
        
        return scoreB - scoreA
      })
      .slice(0, 5)

    return [startingContent, ...relatedContent]
  }

  /**
   * Search content with intelligent ranking
   */
  searchContent(query: string, userProfile?: UserProfile, limit: number = 10): ContentItem[] {
    const searchTerms = query.toLowerCase().split(' ')
    
    const results = this.content
      .map(item => {
        const searchText = `${item.title} ${item.description} ${item.tags.join(' ')} ${item.category}`.toLowerCase()
        
        // Calculate search relevance score
        let relevanceScore = 0
        
        searchTerms.forEach(term => {
          if (item.title.toLowerCase().includes(term)) relevanceScore += 50
          if (item.description.toLowerCase().includes(term)) relevanceScore += 30
          if (item.tags.some(tag => tag.toLowerCase().includes(term))) relevanceScore += 40
          if (item.category.toLowerCase().includes(term)) relevanceScore += 20
        })

        // Boost score based on content quality
        relevanceScore += item.rating * 5
        relevanceScore += item.completionRate * 20
        if (item.isNew) relevanceScore += 10

        // Personal relevance boost
        if (userProfile) {
          const personalRelevance = this.calculateRelevanceScore(item, userProfile) * 0.3
          relevanceScore += personalRelevance
        }

        return { item, relevanceScore }
      })
      .filter(result => result.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit)

    return results.map(r => r.item)
  }

  /**
   * Get featured content for homepage
   */
  getFeaturedContent(): {
    hero: ContentItem
    new: ContentItem[]
    popular: ContentItem[]
    interactive: ContentItem[]
  } {
    const hero = this.content
      .filter(item => item.isNew && item.rating >= 4.8)
      .sort((a, b) => b.views - a.views)[0]

    const newContent = this.content
      .filter(item => item.isNew)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4)

    const popular = this.content
      .filter(item => !item.isNew)
      .sort((a, b) => b.views - a.views)
      .slice(0, 4)

    const interactive = this.content
      .filter(item => item.type === 'interactive' || item.tags.includes('Interactive'))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4)

    return { hero, new: newContent, popular, interactive }
  }

  /**
   * Calculate content relevance score for a user
   */
  private calculateRelevanceScore(content: ContentItem, userProfile: UserProfile): number {
    let score = 0

    // Interest alignment
    const interestMatch = userProfile.interests.some(interest => 
      content.tags.includes(interest) || content.category.includes(interest)
    )
    if (interestMatch) score += 50

    // Skill level appropriateness
    if (content.difficulty === userProfile.skillLevel) {
      score += 40
    } else if (this.isProgression(userProfile.skillLevel, content.difficulty)) {
      score += 30 // Good for skill advancement
    } else if (this.isRegression(userProfile.skillLevel, content.difficulty)) {
      score += 10 // Maybe review material
    }

    // Learning goals alignment
    const goalMatch = userProfile.learningGoals.some(goal =>
      content.learningObjectives.some(objective => 
        objective.toLowerCase().includes(goal.toLowerCase())
      )
    )
    if (goalMatch) score += 35

    // Duration preference
    if (userProfile.preferredDuration && content.duration) {
      const matchesDuration = this.matchesDurationPreference(content.duration, userProfile.preferredDuration)
      if (matchesDuration) score += 20
    }

    // Content quality factors
    score += content.rating * 5
    score += content.completionRate * 20
    if (content.isNew) score += 15
    if (content.isLive && userProfile.interests.includes('Live')) score += 25

    // Prerequisites check (penalize if not met)
    const hasPrerequisites = content.prerequisites.every(prereq => 
      userProfile.completedContent.includes(prereq)
    )
    if (!hasPrerequisites && content.prerequisites.length > 0) {
      score -= 30
    }

    // Recent activity boost
    const recentActivity = userProfile.activityHistory
      .filter(activity => {
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        return activity.timestamp >= weekAgo
      })
      .filter(activity => 
        content.tags.some(tag => 
          userProfile.activityHistory.some(a => 
            this.content.find(c => c.id === a.contentId)?.tags.includes(tag)
          )
        )
      )
    
    if (recentActivity.length > 0) score += 15

    return Math.max(0, score)
  }

  private getNextDifficultyLevel(current: string): string {
    switch (current) {
      case 'beginner': return 'intermediate'
      case 'intermediate': return 'advanced'
      case 'advanced': return 'advanced'
      default: return 'beginner'
    }
  }

  private isProgression(userLevel: string, contentLevel: string): boolean {
    const levels = ['beginner', 'intermediate', 'advanced']
    const userIndex = levels.indexOf(userLevel)
    const contentIndex = levels.indexOf(contentLevel)
    return contentIndex === userIndex + 1
  }

  private isRegression(userLevel: string, contentLevel: string): boolean {
    const levels = ['beginner', 'intermediate', 'advanced']
    const userIndex = levels.indexOf(userLevel)
    const contentIndex = levels.indexOf(contentLevel)
    return contentIndex < userIndex
  }

  private matchesDurationPreference(contentDuration: string, preference: string): boolean {
    const minutes = this.parseDuration(contentDuration)
    switch (preference) {
      case 'short': return minutes <= 30
      case 'medium': return minutes > 30 && minutes <= 60
      case 'long': return minutes > 60
      default: return true
    }
  }

  private parseDuration(duration: string): number {
    const match = duration.match(/(\d+)/)
    return match ? parseInt(match[1]) : 30 // Default to 30 minutes
  }
}

// Singleton instance
export const contentDiscovery = new ContentDiscoveryEngine()

// Helper functions
export const getPersonalizedRecommendations = (userProfile: UserProfile) => {
  return contentDiscovery.getRecommendations(userProfile)
}

export const getTrendingContent = () => {
  return contentDiscovery.getTrendingContent()
}

export const searchContent = (query: string, userProfile?: UserProfile) => {
  return contentDiscovery.searchContent(query, userProfile)
}

export const getFeaturedContent = () => {
  return contentDiscovery.getFeaturedContent()
}