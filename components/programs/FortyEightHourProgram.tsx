// components/programs/FortyEightHourProgram.tsx
'use client'

import React, { useState } from 'react'
import { Clock, Zap, Award, Users, CheckCircle, ArrowRight, Play, Code, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

const modules = [
  {
    id: 1,
    hours: "0-12",
    title: "AI Fundamentals & Hands-on Setup",
    description: "Master AI basics and set up your development environment",
    topics: [
      "Understanding LLMs and AI capabilities",
      "Setting up API access and tools",
      "Your first AI integration",
      "Prompt engineering fundamentals"
    ],
    deliverable: "Working AI chatbot",
    interactive: true,
    interactiveFeatures: ["Pause & edit code examples", "AI pair programming", "Live debugging"]
  },
  {
    id: 2,
    hours: "12-24",
    title: "Building Your First AI Automation",
    description: "Create real-world automations with n8n and AI",
    topics: [
      "n8n workflow basics",
      "Connecting AI to business tools",
      "Data processing and transformation",
      "Error handling and reliability"
    ],
    deliverable: "Automated workflow for your business",
    interactive: true,
    interactiveFeatures: ["Visual workflow builder", "Test automations live", "Branch & experiment"]
  },
  {
    id: 3,
    hours: "24-36",
    title: "Advanced Integrations",
    description: "Master MCPs, APIs, and complex integrations",
    topics: [
      "Model Context Protocol (MCP) servers",
      "Claude Code for development",
      "Multi-step AI workflows",
      "Security and best practices"
    ],
    deliverable: "Custom AI integration",
    interactive: true,
    interactiveFeatures: ["API playground", "Real-time testing", "Collaborative debugging"]
  },
  {
    id: 4,
    hours: "36-48",
    title: "Launch Your AI Solution",
    description: "Deploy, document, and deliver to clients",
    topics: [
      "Deployment strategies",
      "Client documentation",
      "Monitoring and maintenance",
      "Presenting to stakeholders"
    ],
    deliverable: "Production-ready AI solution",
    interactive: true,
    interactiveFeatures: ["Deploy with one click", "Live monitoring dashboard", "Client presentation mode"]
  }
]

const benefits = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Lightning Fast",
    description: "Go from zero to AI expert in just 48 hours"
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: "Certificate & Portfolio",
    description: "HARKA AI Practitioner Certificate + 3 working projects"
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Live Support",
    description: "Direct access to instructors throughout the program"
  }
]

export function FortyEightHourProgram() {
  const router = useRouter()
  const [showInteractiveDemo, setShowInteractiveDemo] = useState(false)

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="mb-4" variant="secondary">
          <Sparkles className="h-3 w-3 mr-1" />
          HARKA Signature Program - Now Interactive!
        </Badge>
        <h1 className="text-4xl font-bold mb-4">
          48-Hour AI Mastery Program
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transform from AI beginner to practitioner in just 48 hours. 
          Build real solutions, not just theory.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button size="lg" onClick={() => router.push('/demo/interactive-learning')}>
            <Play className="h-4 w-4 mr-2" />
            Try Interactive Demo
          </Button>
          <Button size="lg" variant="outline" onClick={() => router.push('/community/power-hour')}>
            <Users className="h-4 w-4 mr-2" />
            Join Power Hour
          </Button>
        </div>
      </div>

      {/* New Interactive Features Banner */}
      <Card className="mb-12 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">🎉 New: Interactive Learning Experience</h3>
              <p className="text-sm text-muted-foreground">
                Pause any lesson to experiment with code. Get real-time AI assistance. 
                Join live Power Hours with the community. Learning has never been this engaging!
              </p>
            </div>
            <Button variant="secondary" onClick={() => router.push('/demo/interactive-learning')}>
              See It In Action
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {benefits.map((benefit, idx) => (
          <Card key={idx} className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                {benefit.icon}
              </div>
              <CardTitle className="text-lg">{benefit.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Timeline */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Your 48-Hour Journey</h2>
        <div className="space-y-8">
          {modules.map((module, idx) => (
            <div key={module.id} className="relative">
              {idx < modules.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-full bg-border" />
              )}
              
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {module.id}
                  </div>
                </div>
                
                <Card className="flex-grow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        Hour {module.hours}
                      </Badge>
                      <Badge variant="secondary">
                        {module.deliverable}
                      </Badge>
                    </div>
                    <CardTitle>{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {module.topics.map((topic, topicIdx) => (
                        <li key={topicIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{topic}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {module.interactive && module.interactiveFeatures && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Interactive Features:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {module.interactiveFeatures.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Master AI in 48 Hours?
            </h3>
            <p className="mb-6 opacity-90">
              Join the next cohort starting Monday. Limited to 20 participants for personalized attention.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Enroll Now - 12,000 DKK
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Schedule a Call
              </Button>
            </div>
            <p className="mt-4 text-sm opacity-75">
              Includes certificate, lifetime access, and 30-day support
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Optional: Danish version
export function FortyEightHourProgramDK() {
  // Danish translation of the component
  // Implement when Danish localization is set up
  return null
}
