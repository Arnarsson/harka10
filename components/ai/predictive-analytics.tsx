"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown,
  Brain,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Eye,
  Users,
  Award,
  Lightbulb,
  BarChart3,
  Sparkles
} from "lucide-react"

export function PredictiveAnalytics() {
  // AI-generated predictions based on learning patterns
  const learningPredictions = [
    { week: 'Week 1', actual: 20, predicted: 22, optimal: 25 },
    { week: 'Week 2', actual: 35, predicted: 38, optimal: 45 },
    { week: 'Week 3', actual: 52, predicted: 55, optimal: 65 },
    { week: 'Week 4', actual: null, predicted: 71, optimal: 80 },
    { week: 'Week 5', actual: null, predicted: 85, optimal: 95 },
  ]

  const skillGapAnalysis = [
    { skill: 'AI Fundamentals', current: 85, target: 90, industry: 75 },
    { skill: 'Ethics & Governance', current: 70, target: 95, industry: 65 },
    { skill: 'Implementation', current: 45, target: 80, industry: 55 },
    { skill: 'Business ROI', current: 60, target: 85, industry: 50 },
    { skill: 'Team Leadership', current: 80, target: 90, industry: 70 },
  ]

  const riskFactors = [
    {
      type: 'high',
      title: 'Course Completion Risk',
      description: '3 learners showing decreased engagement',
      impact: 'High',
      probability: '72%',
      recommendation: 'Implement immediate intervention with personalized support'
    },
    {
      type: 'medium',
      title: 'Knowledge Retention',
      description: 'Lower than expected quiz scores in Ethics module',
      impact: 'Medium',
      probability: '45%',
      recommendation: 'Add more practical examples and case studies'
    },
    {
      type: 'low',
      title: 'Implementation Delay',
      description: 'Current pace may delay practical implementation',
      impact: 'Low',
      probability: '28%',
      recommendation: 'Accelerate hands-on workshops in week 3'
    }
  ]

  const aiInsights = [
    {
      icon: Brain,
      title: 'Learning Pattern Analysis',
      insight: 'Learners perform 40% better with interactive content vs. video lectures',
      action: 'Increase interactive elements in upcoming modules',
      confidence: 94
    },
    {
      icon: Target,
      title: 'Optimal Learning Time',
      insight: 'Peak engagement occurs between 10-11 AM and 2-3 PM',
      action: 'Schedule live sessions during high-engagement periods',
      confidence: 87
    },
    {
      icon: Users,
      title: 'Peer Learning Effect',
      insight: 'Group discussions increase retention by 35%',
      action: 'Add mandatory peer review sessions',
      confidence: 91
    },
    {
      icon: Zap,
      title: 'Micro-Learning Impact',
      insight: '15-minute sessions show 60% higher completion rates',
      action: 'Break down current 30-min modules into shorter segments',
      confidence: 89
    }
  ]

  const businessImpactForecast = [
    { metric: 'ROI Achievement', current: '2.1x', predicted: '4.8x', timeline: '6 months' },
    { metric: 'Process Efficiency', current: '+25%', predicted: '+75%', timeline: '3 months' },
    { metric: 'Employee Satisfaction', current: '7.2/10', predicted: '8.9/10', timeline: '2 months' },
    { metric: 'Innovation Index', current: '6.1/10', predicted: '8.7/10', timeline: '4 months' }
  ]

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <div className="flex items-center gap-3 p-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">AI-Powered Predictive Analytics</h2>
          <p className="opacity-90">Real-time insights and future predictions for optimal learning outcomes</p>
        </div>
      </div>

      {/* Learning Progress Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Learning Progress Prediction
          </CardTitle>
          <CardDescription>
            AI-powered forecast of learning completion with optimization recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={learningPredictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="optimal" 
                  stackId="1" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.3}
                  name="Optimal Path"
                />
                <Area 
                  type="monotone" 
                  dataKey="predicted" 
                  stackId="2" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                  name="AI Prediction"
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  name="Actual Progress"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">+15%</div>
              <div className="text-sm text-green-700">Above Average Pace</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">71%</div>
              <div className="text-sm text-blue-700">Predicted Week 4</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">5.2 days</div>
              <div className="text-sm text-purple-700">Earlier than Expected</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skill Gap Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              AI Skill Gap Analysis
            </CardTitle>
            <CardDescription>
              Personalized recommendations based on industry benchmarks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillGapAnalysis.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{skill.skill}</span>
                    <Badge variant={skill.current >= skill.target ? "default" : "secondary"}>
                      {skill.current}% / {skill.target}%
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <Progress value={skill.current} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Current: {skill.current}%</span>
                      <span>Industry Avg: {skill.industry}%</span>
                      <span>Target: {skill.target}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              AI Risk Assessment
            </CardTitle>
            <CardDescription>
              Predictive risk analysis with automated interventions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-4">
                {riskFactors.map((risk, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            risk.type === 'high' ? 'destructive' : 
                            risk.type === 'medium' ? 'secondary' : 
                            'outline'
                          }>
                            {risk.impact} Risk
                          </Badge>
                          <span className="text-sm font-medium">{risk.probability}</span>
                        </div>
                        <h4 className="font-medium mt-1">{risk.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{risk.description}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <div className="font-medium text-gray-900 mb-1">AI Recommendation:</div>
                      <div className="text-gray-700">{risk.recommendation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiInsights.map((insight, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <insight.icon className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="text-sm">{insight.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3">{insight.insight}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">AI Confidence</span>
                  <span className="text-xs font-medium">{insight.confidence}%</span>
                </div>
                <Progress value={insight.confidence} className="h-1" />
              </div>
              <div className="mt-3 p-2 bg-blue-50 rounded text-xs">
                <div className="font-medium text-blue-900">Action:</div>
                <div className="text-blue-700">{insight.action}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Business Impact Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-600" />
            Business Impact Forecast
          </CardTitle>
          <CardDescription>
            AI-predicted business outcomes based on current learning trajectory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessImpactForecast.map((forecast, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">{forecast.metric}</h4>
                  <div className="mt-2 space-y-1">
                    <div className="text-2xl font-bold text-green-600">{forecast.predicted}</div>
                    <div className="text-sm text-gray-500">from {forecast.current}</div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {forecast.timeline}
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-green-900">AI Prediction Summary</h4>
                <p className="text-green-700 text-sm">Based on current learning patterns, your organization is on track to achieve 380% ROI within 6 months, significantly outperforming industry averages.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}