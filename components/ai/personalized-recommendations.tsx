"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Sparkles, 
  Target, 
  Clock, 
  Star,
  TrendingUp,
  BookOpen,
  Users,
  Award,
  ChevronRight,
  Play,
  Bookmark,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Zap,
  Brain,
  Rocket
} from "lucide-react"

interface LearningRecommendation {
  id: string
  type: 'course' | 'module' | 'exercise' | 'assessment'
  title: string
  description: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  relevanceScore: number
  completionRate: number
  tags: string[]
  aiReason: string
  urgency: 'high' | 'medium' | 'low'
  businessImpact: string
}

interface PersonalizedRecommendationsProps {
  userProfile?: {
    name: string
    role: string
    level: string
    goals: string[]
    completedModules: string[]
    weakAreas: string[]
    strongAreas: string[]
    learningStyle: string
    availableTime: string
  }
}

export function PersonalizedRecommendations({ 
  userProfile = {
    name: "Alex Thompson",
    role: "Product Manager",
    level: "Intermediate",
    goals: ["Implement AI in product development", "Lead AI transformation", "Measure AI ROI"],
    completedModules: ["AI Fundamentals", "Business Strategy"],
    weakAreas: ["Technical Implementation", "Ethics & Governance"],
    strongAreas: ["Strategic Planning", "Team Leadership"],
    learningStyle: "Visual + Hands-on",
    availableTime: "30 min/day"
  }
}: PersonalizedRecommendationsProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'urgent' | 'quick' | 'skill-gap'>('all')

  const recommendations: LearningRecommendation[] = [
    {
      id: '1',
      type: 'module',
      title: 'AI Ethics for Product Leaders',
      description: 'Practical framework for implementing ethical AI in product development',
      duration: '25 min',
      difficulty: 'Intermediate',
      relevanceScore: 98,
      completionRate: 87,
      tags: ['Ethics', 'Product Management', 'Leadership'],
      aiReason: 'Addresses your weak area in Ethics & Governance while leveraging your Product Management background',
      urgency: 'high',
      businessImpact: 'Critical for responsible AI implementation'
    },
    {
      id: '2',
      type: 'exercise',
      title: 'AI ROI Calculator Workshop',
      description: 'Interactive tool to calculate and present AI business value',
      duration: '20 min',
      difficulty: 'Intermediate',
      relevanceScore: 95,
      completionRate: 92,
      tags: ['ROI', 'Business Value', 'Metrics'],
      aiReason: 'Directly aligned with your goal to "Measure AI ROI" and fits your available time',
      urgency: 'high',
      businessImpact: 'Immediate application to current projects'
    },
    {
      id: '3',
      type: 'course',
      title: 'Technical AI Implementation for Non-Engineers',
      description: 'Bridge the gap between strategy and technical implementation',
      duration: '45 min',
      difficulty: 'Intermediate',
      relevanceScore: 89,
      completionRate: 78,
      tags: ['Implementation', 'Technical', 'Strategy'],
      aiReason: 'Targets your weak area in Technical Implementation with a non-technical approach',
      urgency: 'medium',
      businessImpact: 'Essential for successful AI project leadership'
    },
    {
      id: '4',
      type: 'assessment',
      title: 'AI Readiness Assessment',
      description: 'Evaluate your organization\'s readiness for AI implementation',
      duration: '15 min',
      difficulty: 'Beginner',
      relevanceScore: 92,
      completionRate: 96,
      tags: ['Assessment', 'Strategy', 'Planning'],
      aiReason: 'Quick win that provides immediate value for your transformation goals',
      urgency: 'medium',
      businessImpact: 'Foundation for strategic planning'
    },
    {
      id: '5',
      type: 'module',
      title: 'Visual AI Storytelling for Stakeholders',
      description: 'Create compelling AI presentations using visual frameworks',
      duration: '30 min',
      difficulty: 'Intermediate',
      relevanceScore: 85,
      completionRate: 89,
      tags: ['Communication', 'Visual Learning', 'Stakeholder Management'],
      aiReason: 'Matches your visual learning style and leadership strengths',
      urgency: 'low',
      businessImpact: 'Improves stakeholder buy-in'
    }
  ]

  const filteredRecommendations = recommendations.filter(rec => {
    switch (selectedFilter) {
      case 'urgent':
        return rec.urgency === 'high'
      case 'quick':
        return parseInt(rec.duration) <= 20
      case 'skill-gap':
        return rec.tags.some(tag => userProfile.weakAreas.some(weak => 
          weak.toLowerCase().includes(tag.toLowerCase()) || 
          tag.toLowerCase().includes(weak.toLowerCase())
        ))
      default:
        return true
    }
  })

  const filters = [
    { id: 'all', label: 'All Recommendations', count: recommendations.length },
    { id: 'urgent', label: 'Urgent', count: recommendations.filter(r => r.urgency === 'high').length },
    { id: 'quick', label: 'Quick Wins (≤20 min)', count: recommendations.filter(r => parseInt(r.duration) <= 20).length },
    { id: 'skill-gap', label: 'Skill Gap Focus', count: recommendations.filter(r => 
      r.tags.some(tag => userProfile.weakAreas.some(weak => 
        weak.toLowerCase().includes(tag.toLowerCase())
      ))
    ).length }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Personalization Info */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI-Personalized Learning Path</h2>
            <p className="opacity-90">Tailored recommendations for {userProfile.name}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white/10 rounded p-3">
            <div className="text-sm opacity-80">Current Focus</div>
            <div className="font-semibold">{userProfile.goals[0]}</div>
          </div>
          <div className="bg-white/10 rounded p-3">
            <div className="text-sm opacity-80">Learning Style</div>
            <div className="font-semibold">{userProfile.learningStyle}</div>
          </div>
          <div className="bg-white/10 rounded p-3">
            <div className="text-sm opacity-80">Available Time</div>
            <div className="font-semibold">{userProfile.availableTime}</div>
          </div>
        </div>
      </div>

      {/* AI Insights Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Analysis & Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Strengths to Leverage</h4>
                <div className="space-y-2">
                  {userProfile.strongAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">🎯 Recommended Focus Areas</h4>
                <div className="space-y-2">
                  {userProfile.weakAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-purple-600" />
                  <h4 className="font-semibold text-purple-900">AI Recommendation</h4>
                </div>
                <p className="text-sm text-purple-800">
                  Based on your role as {userProfile.role} and {userProfile.availableTime} daily availability, 
                  focus on bite-sized, practical modules that bridge strategy and implementation. 
                  Your visual learning style suggests interactive workshops will be most effective.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-green-50 rounded">
                  <div className="text-xl font-bold text-green-600">94%</div>
                  <div className="text-xs text-green-700">Match Score</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded">
                  <div className="text-xl font-bold text-blue-600">3.2x</div>
                  <div className="text-xs text-blue-700">Faster Learning</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(filter.id as any)}
            className="flex items-center gap-2"
          >
            {filter.label}
            <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
              {filter.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Recommendations Grid */}
      <div className="grid gap-4">
        {filteredRecommendations.map((rec) => (
          <Card key={rec.id} className={`transition-all hover:shadow-md border-l-4 ${getUrgencyColor(rec.urgency).split(' ')[2]}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      {rec.type === 'course' && <BookOpen className="h-5 w-5 text-white" />}
                      {rec.type === 'module' && <Play className="h-5 w-5 text-white" />}
                      {rec.type === 'exercise' && <Zap className="h-5 w-5 text-white" />}
                      {rec.type === 'assessment' && <Target className="h-5 w-5 text-white" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{rec.title}</h3>
                        <Badge variant="outline" className={getDifficultyColor(rec.difficulty)}>
                          {rec.difficulty}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{rec.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {rec.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI Reasoning */}
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Why AI recommends this:</span>
                    </div>
                    <p className="text-sm text-blue-800">{rec.aiReason}</p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-sm font-medium">{rec.duration}</div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{rec.relevanceScore}%</div>
                      <div className="text-xs text-gray-500">AI Match</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{rec.completionRate}%</div>
                      <div className="text-xs text-gray-500">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-green-600">{rec.businessImpact}</div>
                      <div className="text-xs text-gray-500">Impact</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Play className="h-4 w-4 mr-2" />
                    Start Now
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save for Later
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Path Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-green-600" />
            Your Optimized Learning Journey
          </CardTitle>
          <CardDescription>
            AI-generated sequence for maximum impact and efficiency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecommendations.slice(0, 3).map((rec, index) => (
              <div key={rec.id} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{rec.title}</div>
                  <div className="text-sm text-gray-600">{rec.duration} • {rec.businessImpact}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg text-center">
              <h4 className="font-semibold text-green-900 mb-2">Projected Outcome</h4>
              <p className="text-sm text-green-800">
                Following this path will increase your AI implementation success rate by <strong>340%</strong> 
                and reduce time-to-value by <strong>65%</strong> based on similar learner profiles.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}