"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Play, ArrowRight, Globe } from "lucide-react"
import Link from "next/link"

interface HarkaHeroProps {
  language: 'da' | 'en'
  onLanguageChange: (lang: 'da' | 'en') => void
}

export function HarkaHero({ language, onLanguageChange }: HarkaHeroProps) {
  const content = {
    da: {
      trustBadge: "Trusted by 500+ Nordic Companies",
      headline: "AI der leverer reel forretningsværdi",
      description: "Transform your organization through our comprehensive three-phase AI training methodology. From fundamentals to ethical implementation.",
      startTrial: "Start Free Trial",
      watchDemo: "Watch Demo",
      learningProgress: "Learning Progress",
      phases: {
        fundamentals: "Fundamentals",
        ethics: "Ethics & Governance", 
        implementation: "Implementation"
      },
      nextModule: "Next Module",
      nextModuleTitle: "Project Planning Workshop",
      continue: "Continue"
    },
    en: {
      trustBadge: "Trusted by 500+ Nordic Companies",
      headline: "AI that delivers real business value",
      description: "Transform your organization through our comprehensive three-phase AI training methodology. From fundamentals to ethical implementation.",
      startTrial: "Start Free Trial",
      watchDemo: "Watch Demo", 
      learningProgress: "Learning Progress",
      phases: {
        fundamentals: "Fundamentals",
        ethics: "Ethics & Governance",
        implementation: "Implementation"
      },
      nextModule: "Next Module",
      nextModuleTitle: "Project Planning Workshop", 
      continue: "Continue"
    }
  }

  const t = content[language]

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">HARKA</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/learn/dashboard" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Dashboard
          </Link>
          <Link href="/learn/learning" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Learning
          </Link>
          <Link href="/learn/playground" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Playground
          </Link>
          <Link href="/analytics" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Analytics
          </Link>
          <Link href="/toolkit" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Toolkit
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Connected</span>
          </div>
          
          <button 
            onClick={() => onLanguageChange(language === 'da' ? 'en' : 'da')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Globe className="h-4 w-4" />
          </button>
          
          <Link href="/sign-in">
            <div className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"></div>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <Badge variant="secondary" className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>{t.trustBadge}</span>
            </Badge>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900 dark:text-white">AI der leverer</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 bg-clip-text text-transparent">
                  reel
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                  forretningsværdi
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                {t.description}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/sign-up">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl">
                  {t.startTrial}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="px-8 py-3 rounded-xl">
                <Play className="mr-2 h-4 w-4" />
                {t.watchDemo}
              </Button>
            </div>
          </div>

          {/* Right Column - Learning Progress Card */}
          <div className="relative">
            <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
              <CardContent className="space-y-6 p-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t.learningProgress}
                  </h3>
                  <div className="text-blue-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Fundamentals */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {t.phases.fundamentals}
                      </span>
                      <span className="text-2xl font-bold text-green-600">100%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                      <div 
                        className="bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-orange-500 to-green-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>

                  {/* Ethics & Governance */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {t.phases.ethics}
                      </span>
                      <span className="text-2xl font-bold text-blue-600">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                      <div 
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: '75%' }}
                      />
                    </div>
                  </div>

                  {/* Implementation */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {t.phases.implementation}
                      </span>
                      <span className="text-2xl font-bold text-purple-600">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: '45%' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t.nextModule}</p>
                      <p className="font-medium text-gray-900 dark:text-white">{t.nextModuleTitle}</p>
                    </div>
                    <Link href="/learn/dashboard">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl">
                        {t.continue}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}