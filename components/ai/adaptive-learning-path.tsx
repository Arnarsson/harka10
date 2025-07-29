"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Brain,
  Target,
  Clock,
  Star,
  TrendingUp,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  SkipForward,
  RotateCcw,
  Zap,
  Award,
  Users,
  ArrowRight,
  Lightbulb,
  AlertCircle,
  Rocket,
  BookOpen,
  Sparkles
} from "lucide-react"

interface LearningModule {
  id: string
  title: string
  description: string
  duration: number // minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  prerequisites: string[]
  learningObjectives: string[]
  completionRate: number
  userRating: number
  adaptiveReasons: string[]
  businessImpact: 'Low' | 'Medium' | 'High'
  urgency: 'Low' | 'Medium' | 'High'
  status: 'locked' | 'available' | 'in-progress' | 'completed'
  estimatedEffort: number // 1-5 scale
  knowledgeGap: number // percentage
}

interface UserProfile {
  name: string
  role: string
  currentLevel: number // 1-10 scale
  learningVelocity: number // modules per week
  availableTime: number // minutes per day
  preferredDifficulty: 'Easy' | 'Balanced' | 'Challenging'
  strengths: string[]
  weaknesses: string[]
  goals: string[]
  deadlines: { goal: string; date: string }[]
}

interface AdaptiveLearningPathProps {
  userProfile?: UserProfile
}

export function AdaptiveLearningPath({ 
  userProfile = {
    name: "Sarah Chen",
    role: "AI Implementation Lead",
    currentLevel: 6,
    learningVelocity: 3,
    availableTime: 45,
    preferredDifficulty: 'Balanced',
    strengths: ['Strategic Planning', 'Stakeholder Management'],
    weaknesses: ['Technical Implementation', 'Data Science'],
    goals: ['Lead AI transformation', 'Achieve 5x ROI', 'Build AI-ready team'],
    deadlines: [
      { goal: 'Complete AI fundamentals', date: '2025-02-15' },
      { goal: 'Launch first AI pilot', date: '2025-03-30' }
    ]
  }
}: AdaptiveLearningPathProps) {
  const [selectedPath, setSelectedPath] = useState<'optimal' | 'fast-track' | 'comprehensive'>('optimal')
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)

  // AI-generated adaptive learning modules
  const adaptiveModules: LearningModule[] = [
    {
      id: 'ai-strategy-foundation',
      title: 'AI Strategy Foundation for Leaders',
      description: 'Build strategic framework for AI transformation in your organization',
      duration: 35,
      difficulty: 'Intermediate',
      prerequisites: [],
      learningObjectives: [
        'Define AI strategy aligned with business goals',
        'Identify high-impact AI use cases',
        'Create stakeholder alignment framework'
      ],
      completionRate: 94,
      userRating: 4.8,
      adaptiveReasons: [
        'Leverages your Strategic Planning strength',
        'Critical for your "Lead AI transformation" goal',
        'Matches your leadership role requirements'
      ],
      businessImpact: 'High',
      urgency: 'High',
      status: 'available',
      estimatedEffort: 3,
      knowledgeGap: 25
    },
    {
      id: 'stakeholder-buy-in',
      title: 'Securing Stakeholder Buy-in for AI Initiatives',
      description: 'Master the art of gaining executive and team support for AI projects',
      duration: 25,
      difficulty: 'Intermediate',
      prerequisites: ['ai-strategy-foundation'],
      learningObjectives: [
        'Create compelling AI business cases',
        'Address common stakeholder concerns',
        'Build cross-functional support'
      ],
      completionRate: 89,
      userRating: 4.7,
      adaptiveReasons: [
        'Builds on your Stakeholder Management strength',
        'Essential for transformation leadership',
        'Reduces implementation friction'
      ],
      businessImpact: 'High',
      urgency: 'High',
      status: 'locked',
      estimatedEffort: 2,
      knowledgeGap: 30
    },
    {
      id: 'technical-ai-basics',
      title: 'Technical AI Fundamentals for Non-Engineers',
      description: 'Understand AI technology without deep technical complexity',
      duration: 40,
      difficulty: 'Beginner',
      prerequisites: ['stakeholder-buy-in'],
      learningObjectives: [
        'Understand ML algorithms and their applications',
        'Evaluate AI solution architectures',
        'Communicate effectively with technical teams'
      ],
      completionRate: 76,
      userRating: 4.5,
      adaptiveReasons: [
        'Addresses your Technical Implementation weakness',
        'Simplified for leadership roles',
        'Bridges strategy-execution gap'
      ],
      businessImpact: 'Medium',
      urgency: 'Medium',
      status: 'locked',
      estimatedEffort: 4,
      knowledgeGap: 65
    },
    {
      id: 'roi-measurement',
      title: 'AI ROI Measurement & KPI Framework',
      description: 'Design measurement systems to track AI business impact',
      duration: 30,
      difficulty: 'Intermediate',
      prerequisites: ['technical-ai-basics'],
      learningObjectives: [
        'Design AI-specific KPI frameworks',
        'Calculate and present AI ROI',
        'Create continuous improvement loops'
      ],
      completionRate: 91,
      userRating: 4.9,
      adaptiveReasons: [
        'Directly supports your "Achieve 5x ROI" goal',
        'Critical for demonstrating AI value',
        'Enables data-driven optimization'
      ],
      businessImpact: 'High',
      urgency: 'High',
      status: 'locked',
      estimatedEffort: 3,
      knowledgeGap: 40
    },
    {
      id: 'team-ai-readiness',
      title: 'Building AI-Ready Teams',
      description: 'Transform your team for successful AI adoption',
      duration: 35,
      difficulty: 'Intermediate',
      prerequisites: ['roi-measurement'],
      learningObjectives: [
        'Assess team AI readiness',
        'Design upskilling programs',
        'Manage change and adoption'
      ],
      completionRate: 87,
      userRating: 4.6,
      adaptiveReasons: [
        'Aligns with "Build AI-ready team" goal',
        'Leverages your team management skills',
        'Ensures sustainable AI adoption'
      ],
      businessImpact: 'High',
      urgency: 'Medium',
      status: 'locked',
      estimatedEffort: 3,
      knowledgeGap: 35
    }
  ]

  const pathConfigurations = {
    optimal: {
      name: 'AI-Optimized Path',
      description: 'Personalized sequence for maximum impact and efficiency',
      totalDuration: 165,
      modules: adaptiveModules,
      completionDate: '2025-03-15',
      successRate: 94
    },
    'fast-track': {
      name: 'Fast-Track Essentials',
      description: 'Accelerated path focusing on immediate business value',
      totalDuration: 95,
      modules: adaptiveModules.filter(m => m.businessImpact === 'High'),
      completionDate: '2025-02-28',
      successRate: 87
    },
    comprehensive: {
      name: 'Comprehensive Mastery',
      description: 'Complete curriculum for deep AI expertise',
      totalDuration: 220,
      modules: [...adaptiveModules, 
        // Additional advanced modules would be here
      ],
      completionDate: '2025-04-10',
      successRate: 98
    }
  }

  const currentPath = pathConfigurations[selectedPath]
  const currentModule = currentPath.modules[currentModuleIndex]

  const calculateAdaptiveScore = (module: LearningModule): number => {
    let score = 0
    
    // Business impact weight
    score += module.businessImpact === 'High' ? 30 : module.businessImpact === 'Medium' ? 20 : 10
    
    // Urgency weight
    score += module.urgency === 'High' ? 25 : module.urgency === 'Medium' ? 15 : 5
    
    // Knowledge gap weight (higher gap = higher priority)
    score += module.knowledgeGap * 0.3
    
    // User goals alignment
    const goalAlignment = userProfile.goals.some(goal => 
      module.adaptiveReasons.some(reason => 
        reason.toLowerCase().includes(goal.toLowerCase().split(' ').slice(0, 2).join(' '))
      )
    )
    score += goalAlignment ? 20 : 0
    
    return Math.round(score)
  }

  const getRecommendedStudyTime = (): string => {
    const dailyTime = userProfile.availableTime
    const daysNeeded = Math.ceil(currentModule.duration / dailyTime)
    return `${daysNeeded} days (${dailyTime} min/day)`
  }

  const getPathBenefits = (pathType: string): string[] => {
    switch (pathType) {
      case 'optimal':
        return [
          '94% success rate for similar profiles',
          'Maximizes ROI per time invested',
          'Adapts to your learning velocity',
          'Balances theory with practical application'
        ]
      case 'fast-track':
        return [
          'Achieve immediate business impact',
          '50% faster completion time',
          'Focus on high-value activities only',
          'Perfect for urgent deadlines'
        ]
      case 'comprehensive':
        return [
          'Deep expertise development',
          'Prepare for advanced AI leadership',
          'Industry-leading knowledge depth',
          'Future-proof your AI skills'
        ]
      default:
        return []
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Adaptation Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Adaptive Learning Path</h2>
            <p className="opacity-90">AI-personalized for {userProfile.name} • {userProfile.role}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded p-3">
            <div className="text-sm opacity-80">Current Level</div>
            <div className="font-semibold">{userProfile.currentLevel}/10</div>
          </div>
          <div className="bg-white/10 rounded p-3">
            <div className="text-sm opacity-80">Learning Velocity</div>
            <div className="font-semibold">{userProfile.learningVelocity} modules/week</div>
          </div>
          <div className="bg-white/10 rounded p-3">
            <div className="text-sm opacity-80">Available Time</div>
            <div className="font-semibold">{userProfile.availableTime} min/day</div>
          </div>
          <div className="bg-white/10 rounded p-3">
            <div className="text-sm opacity-80">Adaptation Score</div>
            <div className="font-semibold">98% Match</div>
          </div>
        </div>
      </div>

      {/* Path Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Choose Your Learning Path
          </CardTitle>
          <CardDescription>
            AI-optimized paths based on your goals, timeline, and learning preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {Object.entries(pathConfigurations).map(([key, config]) => (
              <Card 
                key={key} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedPath === key ? 'ring-2 ring-blue-600 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedPath(key as any)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{config.name}</h3>
                      <Badge variant={selectedPath === key ? "default" : "outline"}>
                        {config.successRate}%
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600">{config.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{config.totalDuration} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Modules:</span>
                        <span className="font-medium">{config.modules.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completion:</span>
                        <span className="font-medium">{config.completionDate}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      {getPathBenefits(key).slice(0, 2).map((benefit, index) => (
                        <div key={index} className="text-xs text-green-700 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Module Focus */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-green-600" />
            Current Focus: {currentModule.title}
          </CardTitle>
          <CardDescription>
            AI-recommended next step • {getRecommendedStudyTime()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-gray-700">{currentModule.description}</p>
              
              <div className="space-y-3">
                <h4 className="font-semibold">🎯 Learning Objectives:</h4>
                <ul className="space-y-1">
                  {currentModule.learningObjectives.map((objective, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <Target className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">🤖 Why AI Recommends This:</h4>
                <ul className="space-y-1">
                  {currentModule.adaptiveReasons.map((reason, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <Sparkles className="h-3 w-3 text-purple-600 mt-0.5 flex-shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded text-center">
                  <div className="text-lg font-bold text-blue-600">{currentModule.duration} min</div>
                  <div className="text-xs text-blue-700">Est. Duration</div>
                </div>
                <div className="p-3 bg-green-50 rounded text-center">
                  <div className="text-lg font-bold text-green-600">{calculateAdaptiveScore(currentModule)}</div>
                  <div className="text-xs text-green-700">AI Priority Score</div>
                </div>
                <div className="p-3 bg-purple-50 rounded text-center">
                  <div className="text-lg font-bold text-purple-600">{currentModule.completionRate}%</div>
                  <div className="text-xs text-purple-700">Success Rate</div>
                </div>
                <div className="p-3 bg-orange-50 rounded text-center">
                  <div className="text-lg font-bold text-orange-600">{currentModule.businessImpact}</div>
                  <div className="text-xs text-orange-700">Business Impact</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Knowledge Gap</span>
                  <span>{currentModule.knowledgeGap}%</span>
                </div>
                <Progress value={currentModule.knowledgeGap} className="h-2" />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600">
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Start Module
                </Button>
                <Button variant="outline" size="sm">
                  <BookOpen className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Path Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            {currentPath.name} Timeline
          </CardTitle>
          <CardDescription>
            Your personalized learning journey with adaptive milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {currentPath.modules.map((module, index) => (
                <div key={module.id} className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === currentModuleIndex 
                      ? 'bg-blue-600 text-white' 
                      : index < currentModuleIndex 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index < currentModuleIndex ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : index === currentModuleIndex ? (
                      <PlayCircle className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{module.title}</h4>
                      <Badge variant={module.businessImpact === 'High' ? 'default' : 'secondary'}>
                        {module.businessImpact} Impact
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {module.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {module.userRating}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {calculateAdaptiveScore(module)} priority
                      </span>
                    </div>
                    
                    {index === currentModuleIndex && (
                      <div className="mt-3 p-3 bg-blue-50 rounded">
                        <div className="text-sm font-medium text-blue-900 mb-1">Next Action:</div>
                        <div className="text-sm text-blue-800">
                          Start this module to maintain your learning momentum and achieve your "{userProfile.goals[0]}" goal.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* AI Learning Insights */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-green-600" />
            AI Learning Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-900">🎯 Predicted Outcomes</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>94% probability of achieving 5x ROI goal</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Team readiness will increase by 340%</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Implementation speed 6x faster than industry average</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-900">⚡ Optimization Tips</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                  <span>Study during 10-11 AM for 25% better retention</span>
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                  <span>Take 5-min breaks every 15 minutes for optimal focus</span>
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                  <span>Practice concepts immediately after learning (+60% retention)</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}