"use client"

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Play, Sparkles, Search, Bell, Upload, Settings, 
  Users, Code, BookOpen, BarChart3, Zap, Target,
  ChevronRight, ExternalLink, Star, Clock, Eye,
  CheckSquare, MessageSquare, Brain
} from 'lucide-react'

const FEATURE_SECTIONS = [
  {
    title: "🎯 Phase 1: Teacher Content Management",
    description: "Complete teacher role system, smart navigation, and content upload",
    features: [
      {
        title: "Smart Navigation",
        description: "Role-aware navigation with interactive content highlights and mobile support",
        url: "/",
        status: "completed",
        icon: Target,
        highlights: ["Interactive badges", "Mobile responsive", "Role-based menus", "Quick search integrated"]
      },
      {
        title: "Teacher Dashboard", 
        description: "Full teacher dashboard with content management and analytics",
        url: "/teach/dashboard",
        status: "completed",
        icon: BarChart3,
        highlights: ["Content overview", "Upload interface", "Analytics view", "Quick actions"]
      },
      {
        title: "Teacher Upload Hub",
        description: "Comprehensive upload interface for videos, documents, and interactive content",
        url: "/teach/upload", 
        status: "completed",
        icon: Upload,
        highlights: ["Multiple content types", "Rich metadata", "Preview system", "Publish workflow"]
      },
      {
        title: "Role-Based Authentication",
        description: "Complete role system with permissions and teacher application flow",
        url: "/teach/dashboard",
        status: "completed", 
        icon: Settings,
        highlights: ["Student/Teacher/Admin roles", "Permission system", "Route protection", "Application flow"]
      }
    ]
  },
  {
    title: "🚀 Phase 2: Interactive Features Integration",
    description: "Advanced interactive learning with pause points, quizzes, and real-time features",
    features: [
      {
        title: "Interactive Lesson Builder",
        description: "Visual no-code builder for creating interactive lessons with timeline editor",
        url: "/teach/interactive",
        status: "completed",
        icon: Sparkles,
        highlights: ["6 element types", "Timeline editor", "Live preview", "No-code interface"],
        isNew: true
      },
      {
        title: "Enhanced Interactive Viewer", 
        description: "Advanced lesson playback with pause points, quizzes, and code exercises",
        url: "/demo/enhanced-interactive",
        status: "completed",
        icon: Play,
        highlights: ["Real-time elements", "Progress tracking", "Code integration", "Smart controls"],
        isNew: true
      },
      {
        title: "Content Discovery System",
        description: "AI-powered content recommendations and intelligent search",
        url: "/demo/content-discovery", 
        status: "completed",
        icon: Search,
        highlights: ["Smart recommendations", "Advanced search", "User profiling", "Content ranking"],
        isNew: true
      },
      {
        title: "Real-time Notifications",
        description: "Live notification system with smart badges and real-time updates",
        url: "/",
        status: "completed",
        icon: Bell,
        highlights: ["Live updates", "Smart badges", "Multiple types", "Action buttons"],
        isNew: true
      },
      {
        title: "Quick Search Integration",
        description: "Header-integrated search with keyboard navigation and live results",
        url: "/",
        status: "completed",
        icon: Target,
        highlights: ["Header integration", "Keyboard nav", "Live results", "Smart ranking"],
        isNew: true
      }
    ]
  },
  {
    title: "🎮 Interactive Learning Elements",
    description: "Specific interactive elements available in the lesson builder",
    features: [
      {
        title: "Pause Points",
        description: "Stop video playback for reflection, notes, or discussion",
        url: "/demo/enhanced-interactive",
        status: "completed",
        icon: Clock,
        highlights: ["Custom duration", "Note-taking", "Reflection prompts", "Auto-resume"]
      },
      {
        title: "Interactive Quizzes",
        description: "Multiple choice questions with explanations and instant feedback",
        url: "/demo/enhanced-interactive",
        status: "completed", 
        icon: CheckSquare,
        highlights: ["Multiple choice", "Instant feedback", "Explanations", "Progress tracking"]
      },
      {
        title: "Code Exercises",
        description: "Live coding challenges integrated with the interactive code editor",
        url: "/demo/enhanced-interactive",
        status: "completed",
        icon: Code,
        highlights: ["Live coding", "Syntax highlighting", "Hints system", "Auto-completion"]
      },
      {
        title: "Discussion Points",
        description: "Collaborative discussion areas for student interaction",
        url: "/demo/enhanced-interactive",
        status: "completed",
        icon: MessageSquare,
        highlights: ["Student collaboration", "Threaded discussions", "Moderation", "Anonymous options"]
      },
      {
        title: "AI Assistant Integration",
        description: "Context-aware AI help and suggestions during lessons",
        url: "/demo/enhanced-interactive", 
        status: "completed",
        icon: Brain,
        highlights: ["Context-aware help", "Smart suggestions", "Learning assistance", "Multiple triggers"]
      },
      {
        title: "Learning Paths",
        description: "Conditional content branching based on user progress",
        url: "/teach/interactive",
        status: "completed",
        icon: Zap,
        highlights: ["Conditional logic", "Progress-based", "Personalized paths", "Smart branching"]
      }
    ]
  },
  {
    title: "🌟 Existing Interactive Features",
    description: "Original Scrimba-inspired features that are preserved and enhanced",
    features: [
      {
        title: "Original Interactive Learning",
        description: "The original Scrimba-inspired interactive learning demo",
        url: "/demo/interactive-learning",
        status: "completed",
        icon: Play,
        highlights: ["AI-powered", "Code editor", "Interactive demos", "Learning progress"]
      },
      {
        title: "Code Playground",
        description: "Real-time coding environment with AI assistance", 
        url: "/learn/playground",
        status: "completed",
        icon: Code,
        highlights: ["Real-time coding", "AI assistance", "Multi-language", "Collaboration"]
      },
      {
        title: "Power Hour Community",
        description: "Live collaborative learning sessions",
        url: "/community/power-hour",
        status: "completed",
        icon: Users,
        highlights: ["Live sessions", "Community driven", "Collaborative", "Real-time chat"]
      },
      {
        title: "Learning Dashboard",
        description: "Student progress tracking and course management",
        url: "/learn/dashboard", 
        status: "completed",
        icon: BookOpen,
        highlights: ["Progress tracking", "Course overview", "Achievements", "Analytics"]
      }
    ]
  }
]

export default function ShowcasePage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
      case 'planned': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
    }
  }

  const totalFeatures = FEATURE_SECTIONS.reduce((acc, section) => acc + section.features.length, 0)
  const completedFeatures = FEATURE_SECTIONS.reduce((acc, section) => 
    acc + section.features.filter(f => f.status === 'completed').length, 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            HARKA Feature Showcase
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete interactive learning platform with teacher content management, 
            AI-powered recommendations, and advanced interactive features
          </p>
          
          <div className="flex items-center justify-center space-x-6 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{completedFeatures}</div>
              <div className="text-sm text-muted-foreground">Features Complete</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{FEATURE_SECTIONS.length}</div>
              <div className="text-sm text-muted-foreground">Major Phases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {Math.round((completedFeatures / totalFeatures) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Implementation</div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>🚀 Try These Features Now</span>
            </CardTitle>
            <CardDescription>
              Direct links to experience the key features we've built
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/teach/interactive" className="block">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Sparkles className="h-6 w-6 text-purple-500" />
                      <div>
                        <h4 className="font-semibold">Interactive Builder</h4>
                        <Badge className="bg-purple-100 text-purple-700 text-xs">NEW</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Create interactive lessons with timeline editor</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/demo/enhanced-interactive" className="block">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Play className="h-6 w-6 text-blue-500" />
                      <div>
                        <h4 className="font-semibold">Enhanced Viewer</h4>
                        <Badge className="bg-blue-100 text-blue-700 text-xs">DEMO</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Experience interactive lessons with pause points</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/demo/content-discovery" className="block">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Search className="h-6 w-6 text-green-500" />
                      <div>
                        <h4 className="font-semibold">Content Discovery</h4>
                        <Badge className="bg-green-100 text-green-700 text-xs">AI</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">AI-powered recommendations and search</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Feature Sections */}
        {FEATURE_SECTIONS.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
              <p className="text-muted-foreground">{section.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.features.map((feature, featureIndex) => (
                <Card key={featureIndex} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <feature.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{feature.title}</h3>
                          <Badge className={getStatusColor(feature.status)}>
                            {feature.status}
                          </Badge>
                        </div>
                      </div>
                      {feature.isNew && (
                        <Badge className="bg-purple-100 text-purple-700 text-xs">
                          NEW
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-semibold mb-2 uppercase tracking-wide">
                          Key Features:
                        </h4>
                        <div className="grid grid-cols-2 gap-1">
                          {feature.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center space-x-1">
                              <div className="w-1 h-1 rounded-full bg-primary" />
                              <span className="text-xs text-muted-foreground">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Link href={feature.url} className="block">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center space-x-2"
                        >
                          <span>Experience Feature</span>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Technical Overview */}
        <Card>
          <CardHeader>
            <CardTitle>🛠️ Technical Implementation</CardTitle>
            <CardDescription>
              Overview of the technologies and architecture powering these features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Frontend Stack</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Next.js 15 + React 18 + TypeScript</li>
                  <li>• Tailwind CSS + Radix UI</li>
                  <li>• Framer Motion animations</li>
                  <li>• Real-time updates & notifications</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Key Features</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Role-based authentication</li>
                  <li>• Interactive lesson builder</li>
                  <li>• AI-powered recommendations</li>
                  <li>• Real-time search & notifications</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Architecture</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Component-based design</li>
                  <li>• Type-safe development</li>
                  <li>• Mobile-first responsive</li>
                  <li>• Performance optimized</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 border-t">
          <p className="text-muted-foreground">
            🚀 All features are production-ready and fully tested
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Built with ❤️ for the HARKA interactive learning platform
          </p>
        </div>
      </div>
    </div>
  )
}