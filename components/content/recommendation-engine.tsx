"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  getTrendingContent, 
  getFeaturedContent, 
  getPersonalizedRecommendations,
  ContentDiscoveryEngine
} from '@/lib/content-discovery'
import { 
  TrendingUp, Star, Clock, Users, Play, BookOpen, 
  Sparkles, ChevronRight, Eye, Target, Zap, 
  ThumbsUp, Share, Bookmark
} from 'lucide-react'
import Link from 'next/link'

// Mock user profile - in real app this would come from auth context
const MOCK_USER_PROFILE = {
  id: 'user_123',
  role: 'student' as const,
  interests: ['React', 'AI', 'Interactive'],
  skillLevel: 'intermediate' as const,
  completedContent: ['javascript-basics'],
  preferredDuration: 'medium' as const,
  learningGoals: ['Master React', 'Learn AI development'],
  activityHistory: [
    {
      contentId: 'interactive-learning',
      action: 'viewed' as const,
      timestamp: new Date('2024-01-20')
    }
  ]
}

interface ContentItemProps {
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
  isNew: boolean
  isLive: boolean
  duration?: string
}

interface RecommendationEngineProps {
  userId?: string
  showCategories?: string[]
  maxItems?: number
  layout?: 'grid' | 'list' | 'compact'
  showPersonalized?: boolean
}

export function RecommendationEngine({ 
  userId,
  showCategories = ['trending', 'personalized', 'new', 'popular'],
  maxItems = 6,
  layout = 'grid',
  showPersonalized = true
}: RecommendationEngineProps) {
  const [activeTab, setActiveTab] = useState('trending')
  const [recommendations, setRecommendations] = useState<{
    trending: any[]
    personalized: any[]
    new: any[]
    popular: any[]
    interactive: any[]
  }>({
    trending: [],
    personalized: [],
    new: [],
    popular: [],
    interactive: []
  })

  useEffect(() => {
    // Load recommendations
    const featured = getFeaturedContent()
    const trending = getTrendingContent(maxItems)
    const personalized = showPersonalized 
      ? getPersonalizedRecommendations(MOCK_USER_PROFILE, maxItems)
      : []

    setRecommendations({
      trending,
      personalized,
      new: featured.new,
      popular: featured.popular,
      interactive: featured.interactive
    })
  }, [maxItems, showPersonalized])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'interactive': return <Sparkles className="h-4 w-4 text-purple-500" />
      case 'course': return <BookOpen className="h-4 w-4 text-blue-500" />
      case 'community': return <Users className="h-4 w-4 text-orange-500" />
      case 'demo': return <Play className="h-4 w-4 text-green-500" />
      case 'tool': return <Zap className="h-4 w-4 text-yellow-500" />
      case 'lesson': return <Clock className="h-4 w-4 text-gray-500" />
      default: return <BookOpen className="h-4 w-4 text-gray-400" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
    }
  }

  const renderContentCard = (item: ContentItemProps, index: number) => {
    const isCompact = layout === 'compact'
    const isList = layout === 'list'

    if (isCompact) {
      return (
        <Link key={item.id} href={item.url} className="block">
          <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer">
            <div className="flex-shrink-0">
              {getTypeIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium truncate">{item.title}</p>
                {item.isNew && (
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                    NEW
                  </Badge>
                )}
                {item.isLive && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                    LIVE
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-muted-foreground">{item.category}</span>
                {item.duration && (
                  <>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{item.duration}</span>
                  </>
                )}
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </Link>
      )
    }

    return (
      <Link key={item.id} href={item.url} className="block">
        <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getTypeIcon(item.type)}
                <Badge className={getDifficultyColor(item.difficulty)}>
                  {item.difficulty}
                </Badge>
              </div>
              <div className="flex space-x-1">
                {item.isNew && (
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                    NEW
                  </Badge>
                )}
                {item.isLive && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                    LIVE
                  </Badge>
                )}
              </div>
            </div>

            <h3 className="font-semibold text-sm mb-1 line-clamp-2">
              {item.title}
            </h3>
            
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {item.description}
            </p>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <div className="flex items-center space-x-3">
                {item.rating > 0 && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span>{item.rating}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{item.views.toLocaleString()}</span>
                </div>
                {item.duration && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{item.duration}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{item.tags.length - 2}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  const renderContentSection = (title: string, items: ContentItemProps[], icon: any) => {
    if (items.length === 0) return null

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {React.createElement(icon, { className: "h-5 w-5" })}
            <h3 className="font-semibold">{title}</h3>
            <Badge variant="outline" className="text-xs">
              {items.length}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" className="text-sm">
            View all
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className={
          layout === 'compact' 
            ? 'space-y-1' 
            : layout === 'list'
            ? 'space-y-3'
            : `grid grid-cols-1 md:grid-cols-2 ${maxItems > 4 ? 'lg:grid-cols-3' : ''} gap-4`
        }>
          {items.map((item, index) => renderContentCard(item, index))}
        </div>
      </div>
    )
  }

  const tabContent = [
    { id: 'trending', label: 'Trending', icon: TrendingUp, data: recommendations.trending },
    { id: 'personalized', label: 'For You', icon: Target, data: recommendations.personalized },
    { id: 'new', label: 'New', icon: Sparkles, data: recommendations.new },
    { id: 'popular', label: 'Popular', icon: Star, data: recommendations.popular },
    { id: 'interactive', label: 'Interactive', icon: Play, data: recommendations.interactive }
  ].filter(tab => showCategories.includes(tab.id))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Discover Content</h2>
          <p className="text-muted-foreground">
            Personalized recommendations based on your interests and progress
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            Saved
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          {tabContent.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-2">
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabContent.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-6">
            {renderContentSection(tab.label, tab.data, tab.icon)}
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {recommendations.interactive.length}
              </div>
              <div className="text-sm text-muted-foreground">Interactive Lessons</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {recommendations.new.length}
              </div>
              <div className="text-sm text-muted-foreground">New Content</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {recommendations.trending.filter(item => item.isLive).length}
              </div>
              <div className="text-sm text-muted-foreground">Live Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {showPersonalized ? recommendations.personalized.length : recommendations.popular.length}
              </div>
              <div className="text-sm text-muted-foreground">Recommended</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}