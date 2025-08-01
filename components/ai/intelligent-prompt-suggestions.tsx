"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Sparkles, 
  Lightbulb, 
  TrendingUp, 
  Star,
  Copy,
  RefreshCw,
  ChevronRight,
  Zap,
  Target,
  Brain,
  Rocket,
  MessageSquare,
  Code,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  Wand2
} from "lucide-react"

interface PromptSuggestion {
  id: string
  category: string
  title: string
  prompt: string
  description: string
  useCase: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]
  rating: number
  uses: number
  expectedOutput: string
}

interface IntelligentPromptSuggestionsProps {
  currentPrompt: string
  onPromptSelect: (prompt: string) => void
  userContext?: {
    role: string
    industry: string
    experience: string
  }
}

export function IntelligentPromptSuggestions({ 
  currentPrompt, 
  onPromptSelect,
  userContext = {
    role: "Product Manager",
    industry: "Technology",
    experience: "Intermediate"
  }
}: IntelligentPromptSuggestionsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('recommended')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'recommended', label: 'AI Recommended', icon: Brain, count: 8 },
    { id: 'business', label: 'Business Strategy', icon: Briefcase, count: 12 },
    { id: 'communication', label: 'Communication', icon: MessageSquare, count: 15 },
    { id: 'analysis', label: 'Data Analysis', icon: BarChart3, count: 10 },
    { id: 'creative', label: 'Creative Content', icon: Lightbulb, count: 9 },
    { id: 'technical', label: 'Technical', icon: Code, count: 7 },
    { id: 'team', label: 'Team Management', icon: Users, count: 6 }
  ]

  const allSuggestions: PromptSuggestion[] = [
    // AI Recommended (personalized based on user context)
    {
      id: 'rec1',
      category: 'recommended',
      title: 'AI Implementation Roadmap',
      prompt: `As a ${userContext.role} in the ${userContext.industry} industry, create a detailed 90-day AI implementation roadmap that includes:

1. Week 1-30: Foundation phase
2. Week 31-60: Pilot implementation
3. Week 61-90: Scale and optimization

For each phase, include:
- Key milestones and deliverables
- Resource requirements
- Risk mitigation strategies
- Success metrics
- Stakeholder communication plan

Focus on practical, actionable steps that can deliver measurable business value.`,
      description: 'Generate a comprehensive AI implementation plan tailored to your role and industry',
      useCase: 'Strategic planning and project management',
      difficulty: 'Intermediate',
      tags: ['Strategy', 'Implementation', 'Roadmap', 'AI'],
      rating: 4.9,
      uses: 2341,
      expectedOutput: 'Detailed 90-day roadmap with phases, milestones, and actionable steps'
    },
    {
      id: 'rec2',
      category: 'recommended',
      title: 'ROI Calculation Framework',
      prompt: `Create an AI ROI calculation framework for a ${userContext.industry} company that includes:

1. Cost components:
   - Initial investment (technology, training, consulting)
   - Ongoing operational costs
   - Opportunity costs

2. Benefit components:
   - Efficiency gains (time savings, automation)
   - Revenue increases (new capabilities, improved quality)
   - Cost reductions (reduced errors, optimized processes)

3. Risk factors and their financial impact
4. Timeline for value realization
5. Key metrics to track

Provide both a template and a worked example with realistic numbers.`,
      description: 'Build a comprehensive ROI framework for AI investments',
      useCase: 'Business case development and financial planning',
      difficulty: 'Advanced',
      tags: ['ROI', 'Financial', 'Business Case', 'Metrics'],
      rating: 4.8,
      uses: 1876,
      expectedOutput: 'Complete ROI framework with templates and examples'
    },
    // Business Strategy
    {
      id: 'bus1',
      category: 'business',
      title: 'Competitive AI Analysis',
      prompt: `Analyze how AI is being used by competitors in the [INDUSTRY] space. Include:

1. Current AI applications by top 5 competitors
2. Competitive advantages they've gained
3. Gaps and opportunities for differentiation
4. Emerging AI trends in the industry
5. Recommendations for competitive positioning

Structure this as an executive briefing with clear actionable insights.`,
      description: 'Comprehensive competitive analysis focused on AI adoption',
      useCase: 'Market research and strategic positioning',
      difficulty: 'Intermediate',
      tags: ['Competition', 'Market Research', 'Strategy'],
      rating: 4.7,
      uses: 1654,
      expectedOutput: 'Executive briefing with competitive insights and recommendations'
    },
    // Communication
    {
      id: 'comm1',
      category: 'communication',
      title: 'Stakeholder AI Update',
      prompt: `Write a monthly AI initiative update for executive stakeholders that includes:

1. Progress summary (accomplishments, metrics, milestones reached)
2. Current challenges and mitigation strategies
3. Upcoming priorities and timeline
4. Resource needs or decisions required
5. Risk assessment and mitigation plans
6. ROI tracking and business impact

Keep it executive-friendly: concise, metric-driven, and action-oriented. Use bullet points and highlight key achievements.`,
      description: 'Executive-level communication for AI project updates',
      useCase: 'Stakeholder management and reporting',
      difficulty: 'Intermediate',
      tags: ['Communication', 'Executive', 'Reporting', 'Updates'],
      rating: 4.6,
      uses: 2103,
      expectedOutput: 'Professional stakeholder update with key metrics and insights'
    },
    // Data Analysis
    {
      id: 'data1',
      category: 'analysis',
      title: 'AI Metrics Dashboard Design',
      prompt: `Design a comprehensive AI performance dashboard that tracks:

1. Technical metrics:
   - Model performance (accuracy, precision, recall)
   - System performance (latency, throughput, uptime)
   - Data quality indicators

2. Business metrics:
   - ROI and cost savings
   - User adoption and engagement
   - Process efficiency improvements
   - Customer satisfaction impact

3. Operational metrics:
   - Error rates and resolution times
   - Maintenance requirements
   - Scaling indicators

For each metric, specify: measurement method, target values, alert thresholds, and visualization type.`,
      description: 'Complete dashboard design for AI system monitoring',
      useCase: 'Performance monitoring and optimization',
      difficulty: 'Advanced',
      tags: ['Metrics', 'Dashboard', 'Monitoring', 'KPIs'],
      rating: 4.8,
      uses: 1432,
      expectedOutput: 'Detailed dashboard specification with metrics and visualizations'
    },
    // Creative Content
    {
      id: 'creative1',
      category: 'creative',
      title: 'AI Training Content Creator',
      prompt: `Create engaging training content for [TOPIC] that includes:

1. Learning objectives (specific, measurable outcomes)
2. Interactive scenarios and case studies
3. Practical exercises with step-by-step instructions
4. Knowledge check questions
5. Real-world application examples
6. Common pitfalls and how to avoid them

Make it suitable for [SKILL LEVEL] learners and ensure content is actionable and immediately applicable. Include visual description suggestions for any diagrams or illustrations.`,
      description: 'Comprehensive training content with interactive elements',
      useCase: 'Training development and knowledge transfer',
      difficulty: 'Intermediate',
      tags: ['Training', 'Content Creation', 'Education', 'Interactive'],
      rating: 4.7,
      uses: 1765,
      expectedOutput: 'Complete training module with exercises and assessments'
    }
  ]

  const getAIRecommendations = (prompt: string): PromptSuggestion[] => {
    // Simulate AI analysis of current prompt to suggest improvements
    const keywords = prompt.toLowerCase().split(' ')
    
    // Simple matching algorithm (in production, this would use embeddings/ML)
    return allSuggestions.filter(suggestion => {
      const relevanceScore = suggestion.tags.some(tag => 
        keywords.some(word => tag.toLowerCase().includes(word) || word.includes(tag.toLowerCase()))
      )
      return relevanceScore && suggestion.category === 'recommended'
    }).slice(0, 3)
  }

  const getPromptImprovements = (prompt: string): string[] => {
    const improvements = []
    
    if (prompt.length < 50) {
      improvements.push("Add more specific context and requirements")
    }
    if (!prompt.includes('include:') && !prompt.includes('1.')) {
      improvements.push("Structure with numbered points for better results")
    }
    if (!prompt.includes('example') && !prompt.includes('specific')) {
      improvements.push("Request specific examples for clarity")
    }
    if (!prompt.includes(userContext.role) && !prompt.includes(userContext.industry)) {
      improvements.push("Include your role and industry for personalized output")
    }
    
    return improvements
  }

  const filteredSuggestions = allSuggestions.filter(suggestion => {
    const matchesCategory = selectedCategory === 'recommended' ? 
      getAIRecommendations(currentPrompt).some(rec => rec.id === suggestion.id) || suggestion.category === 'recommended' :
      suggestion.category === selectedCategory
    
    const matchesSearch = !searchTerm || 
      suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suggestion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suggestion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  const improvements = currentPrompt ? getPromptImprovements(currentPrompt) : []

  return (
    <div className="space-y-6">
      {/* AI Analysis Header */}
      {currentPrompt && (
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              AI Prompt Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {improvements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-orange-700">💡 Suggested Improvements:</h4>
                  <ul className="space-y-1">
                    {improvements.map((improvement, index) => (
                      <li key={index} className="text-sm text-orange-600 flex items-center gap-2">
                        <ChevronRight className="h-3 w-3" />
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded">
                  <div className="text-lg font-bold text-blue-600">
                    {Math.min(100, Math.max(20, 100 - improvements.length * 15))}%
                  </div>
                  <div className="text-xs text-blue-700">Optimization Score</div>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <div className="text-lg font-bold text-green-600">
                    {currentPrompt.split(' ').length}
                  </div>
                  <div className="text-xs text-green-700">Words</div>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <div className="text-lg font-bold text-purple-600">
                    {Math.ceil(currentPrompt.length / 100)}min
                  </div>
                  <div className="text-xs text-purple-700">Est. Response Time</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="space-y-4">
        <Input
          placeholder="Search prompts by keyword, use case, or tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <category.icon className="h-4 w-4" />
                {category.label}
                <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Smart Suggestions */}
      {selectedCategory === 'recommended' && currentPrompt && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              AI-Powered Suggestions for You
            </CardTitle>
            <CardDescription>
              Based on your current prompt and {userContext.role} role in {userContext.industry}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {getAIRecommendations(currentPrompt).map((suggestion) => (
                <div key={suggestion.id} className="p-3 bg-white rounded border">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onPromptSelect(suggestion.prompt)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600"
                    >
                      <Wand2 className="h-4 w-4 mr-1" />
                      Use
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prompt Library */}
      <div className="grid gap-4">
        {filteredSuggestions.map((suggestion) => (
          <Card key={suggestion.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{suggestion.title}</h3>
                      <Badge variant="outline" className={
                        suggestion.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        suggestion.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {suggestion.difficulty}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{suggestion.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {suggestion.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      <strong>Use case:</strong> {suggestion.useCase}
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Expected output:</strong> {suggestion.expectedOutput}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => onPromptSelect(suggestion.prompt)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      <Rocket className="h-4 w-4 mr-2" />
                      Use Prompt
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(suggestion.prompt)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>
                
                {/* Prompt Preview */}
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <div className="font-medium mb-2">Prompt Preview:</div>
                  <div className="text-gray-700 max-h-20 overflow-hidden">
                    {suggestion.prompt.substring(0, 200)}...
                  </div>
                </div>
                
                {/* Usage Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {suggestion.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {suggestion.uses.toLocaleString()} uses
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {suggestion.category}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredSuggestions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">No prompts found</h3>
            <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}