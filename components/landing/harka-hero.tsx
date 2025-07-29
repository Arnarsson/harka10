"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ChevronDown, Globe, Menu, X, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"

interface HarkaHeroProps {
  language: 'da' | 'en'
  onLanguageChange: (lang: 'da' | 'en') => void
}

export function HarkaHero({ language, onLanguageChange }: HarkaHeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const content = {
    da: {
      // Navigation
      method: "Method",
      results: "Results", 
      team: "Team",
      blog: "Blog",
      contact: "Contact",
      switchTheme: "Skift tema",
      switchLanguage: "Switch language",
      bookMeeting: "Book meeting",
      
      // Hero section
      heroHeadline: "From idea to implementation in just 48 hours.",
      heroSubheadline: "We turn AI potential into practical solutions that deliver measurable results – without lengthy project cycles or PowerPoints.",
      heroCta: "From strategy to action in 2 days - contact us today",
      
      // Stats
      statDays: "Days from start to value",
      statMonths: "Months shorter time-to-value", 
      statAdmin: "Less admin time after implementation",
      statRoi: "Average ROI within the first quarter",
      
      // Value props
      valueTitle: "AI implementation: From months to hours",
      valueSubtitle: "Most companies struggle to convert AI promises into business value. We do it differently.",
      
      accelerated: "Accelerated implementation",
      acceleratedDesc: "Traditional AI implementations take months or years. HARKA delivers usable solutions in just 48 hours.",
      
      competency: "Competency transfer from day one", 
      competencyDesc: "Instead of creating ongoing consulting relationships, we transfer skills to your team from day one.",
      
      immediate: "Immediate value creation",
      immediateDesc: "Our customers have typically earned back the workshop cost before the two days are over. Value creation starts immediately.",
      
      tailored: "Tailored to your needs",
      tailoredDesc: "We don't implement standard solutions, but create technology that fits exactly with your processes and requirements.",
      
      practical: "AI made practical and understandable",
      practicalDesc: "We remove the mystique around AI and turn the technology into a concrete tool that your employees can use in everyday work.",
      
      market: "Market-validated timeframe",
      marketDesc: "AI projects can stretch up to 9-12 months before you begin to realize concrete value, while modern gen-AI pilots can be production-ready in just a few months.",
      marketSource: "McKinsey",
      
      // Two-day process
      processTitle: "The result: From strategy to action in 48 hours",
      
      day1Title: "Day 1: Opportunities & Prototypes",
      day1Items: [
        "Identification of processes with AI potential",
        "Hands-on training in relevant tools", 
        "Development of prototype solutions",
        "Building AI competencies in your team"
      ],
      
      day2Title: "Day 2: Implementation & Handover",
      day2Items: [
        "Finalization and integration of solutions",
        "Adaptation to your workflows",
        "Competency transfer and documentation", 
        "Action plan for the next 90 days"
      ],
      
      contactToday: "Kontakt os i dag",
      noObligations: "Ingen forpligtelser, bare en samtale",
      
      // Results section
      resultsTitle: "Results that speak for themselves",
      resultsSubtitle: "In just 48 hours, our customers have achieved significant business breakthroughs.",
      
      // Team section
      teamTitle: "The team behind HARKA",
      teamSubtitle: "Meet the two experts who, in just 48 hours, transform your company's AI potential into practical solutions and concrete results.",
      
      // Blog section
      blogTitle: "Latest Insights",
      blogSubtitle: "Explore our latest thoughts and insights on AI implementation, business transformation, and achieving practical results.",
      
      // Footer CTA
      footerTitle: "Start your AI journey",
      footerSubtitle: "Get a non-binding conversation about how we can help your company leverage AI's potential.",
      
      // Footer
      footerDescription: "We help companies streamline workflows, reduce wasted time, and strengthen decision-making – in just 2 days.",
      navigation: "Navigation",
      legal: "Legal",
      privacyPolicy: "Privacy policy",
      cookiePolicy: "Cookie policy", 
      terms: "Terms and conditions",
      allRights: "All rights reserved"
    },
    en: {
      // Navigation
      method: "Method",
      results: "Results",
      team: "Team", 
      blog: "Blog",
      contact: "Contact",
      switchTheme: "Switch theme",
      switchLanguage: "Skift sprog", 
      bookMeeting: "Book meeting",
      
      // Hero section
      heroHeadline: "From idea to implementation in just 48 hours.",
      heroSubheadline: "We turn AI potential into practical solutions that deliver measurable results – without lengthy project cycles or PowerPoints.",
      heroCta: "From strategy to action in 2 days - contact us today",
      
      // Stats
      statDays: "Days from start to value",
      statMonths: "Months shorter time-to-value",
      statAdmin: "Less admin time after implementation", 
      statRoi: "Average ROI within the first quarter",
      
      // Value props
      valueTitle: "AI implementation: From months to hours",
      valueSubtitle: "Most companies struggle to convert AI promises into business value. We do it differently.",
      
      accelerated: "Accelerated implementation",
      acceleratedDesc: "Traditional AI implementations take months or years. HARKA delivers usable solutions in just 48 hours.",
      
      competency: "Competency transfer from day one",
      competencyDesc: "Instead of creating ongoing consulting relationships, we transfer skills to your team from day one.",
      
      immediate: "Immediate value creation", 
      immediateDesc: "Our customers have typically earned back the workshop cost before the two days are over. Value creation starts immediately.",
      
      tailored: "Tailored to your needs",
      tailoredDesc: "We don't implement standard solutions, but create technology that fits exactly with your processes and requirements.",
      
      practical: "AI made practical and understandable",
      practicalDesc: "We remove the mystique around AI and turn the technology into a concrete tool that your employees can use in everyday work.",
      
      market: "Market-validated timeframe", 
      marketDesc: "AI projects can stretch up to 9-12 months before you begin to realize concrete value, while modern gen-AI pilots can be production-ready in just a few months.",
      marketSource: "McKinsey",
      
      // Two-day process
      processTitle: "The result: From strategy to action in 48 hours",
      
      day1Title: "Day 1: Opportunities & Prototypes",
      day1Items: [
        "Identification of processes with AI potential",
        "Hands-on training in relevant tools",
        "Development of prototype solutions", 
        "Building AI competencies in your team"
      ],
      
      day2Title: "Day 2: Implementation & Handover",
      day2Items: [
        "Finalization and integration of solutions",
        "Adaptation to your workflows",
        "Competency transfer and documentation",
        "Action plan for the next 90 days"
      ],
      
      contactToday: "Contact us today", 
      noObligations: "No obligations, just a conversation",
      
      // Results section
      resultsTitle: "Results that speak for themselves",
      resultsSubtitle: "In just 48 hours, our customers have achieved significant business breakthroughs.",
      
      // Team section
      teamTitle: "The team behind HARKA",
      teamSubtitle: "Meet the two experts who, in just 48 hours, transform your company's AI potential into practical solutions and concrete results.",
      
      // Blog section
      blogTitle: "Latest Insights",
      blogSubtitle: "Explore our latest thoughts and insights on AI implementation, business transformation, and achieving practical results.",
      
      // Footer CTA
      footerTitle: "Start your AI journey",
      footerSubtitle: "Get a non-binding conversation about how we can help your company leverage AI's potential.",
      
      // Footer
      footerDescription: "We help companies streamline workflows, reduce wasted time, and strengthen decision-making – in just 2 days.",
      navigation: "Navigation", 
      legal: "Legal",
      privacyPolicy: "Privacy policy",
      cookiePolicy: "Cookie policy",
      terms: "Terms and conditions", 
      allRights: "All rights reserved"
    }
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
                HARKA
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#method" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t.method}
              </Link>
              <Link href="#results" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t.results}
              </Link>
              <Link href="#team" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t.team}
              </Link>
              <Link href="#blog" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t.blog}
              </Link>
              <Link href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t.contact}
              </Link>
            </div>

            {/* Right side controls */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">{t.switchTheme}</span>
              </Button>

              {/* Language toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLanguageChange(language === 'da' ? 'en' : 'da')}
                className="flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                {language === 'da' ? 'EN' : 'DA'}
              </Button>

              {/* CTA Button */}
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                {t.bookMeeting}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="#method" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                {t.method}
              </Link>
              <Link href="#results" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                {t.results}
              </Link>
              <Link href="#team" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                {t.team}
              </Link>
              <Link href="#blog" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                {t.blog}
              </Link>
              <Link href="#contact" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                {t.contact}
              </Link>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLanguageChange(language === 'da' ? 'en' : 'da')}
                  className="w-full justify-start"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {t.switchLanguage}
                </Button>
                <Button className="w-full mt-2 bg-black dark:bg-white text-white dark:text-black">
                  {t.bookMeeting}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t.heroHeadline}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {t.heroSubheadline}
            </p>
            <Button size="lg" className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
              {t.heroCta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white">2</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t.statDays}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white">6</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t.statMonths}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white">75%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t.statAdmin}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white">10x</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t.statRoi}</div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 text-center">
            <ChevronDown className="h-6 w-6 text-gray-400 mx-auto animate-bounce" />
            <div className="text-sm text-gray-500 mt-2">Scroll down</div>
          </div>
        </div>
      </section>

      {/* Value Propositions Section */}
      <section id="method" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.valueTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.valueSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4">{t.accelerated}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.acceleratedDesc}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4">{t.competency}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.competencyDesc}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4">{t.immediate}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.immediateDesc}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4">{t.tailored}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.tailoredDesc}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4">{t.practical}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.practicalDesc}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4">
                  {t.market}
                  <Badge variant="secondary" className="ml-2 text-xs">✨</Badge>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{t.marketDesc}</p>
                <p className="text-sm text-gray-500 mt-2 italic">{t.marketSource}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Two-Day Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.processTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold text-xl mr-4">
                    1
                  </div>
                  <h3 className="text-2xl font-semibold">{t.day1Title}</h3>
                </div>
                <ul className="space-y-3">
                  {t.day1Items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold text-xl mr-4">
                    2
                  </div>
                  <h3 className="text-2xl font-semibold">{t.day2Title}</h3>
                </div>
                <ul className="space-y-3">
                  {t.day2Items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
              {t.contactToday}
            </Button>
            <p className="text-sm text-gray-500 mt-2">{t.noObligations}</p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.resultsTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.resultsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                <h3 className="text-lg font-semibold mb-2">faster risk assessment</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">From manual inspections to intelligent analysis</p>
                <p className="text-sm text-gray-500 mt-2">Automated risk analysis based on complex data inputs reduces assessment time and significantly increases precision.</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
                <h3 className="text-lg font-semibold mb-2">liberated technician capacity</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">From administrative burdens to value-creating work</p>
                <p className="text-sm text-gray-500 mt-2">Technicians now use their expertise where it creates the most value, while AI handles documentation and reporting.</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-purple-600 mb-2">32%</div>
                <h3 className="text-lg font-semibold mb-2">reduction in tied-up capital</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">From overstocked inventory to optimized stock</p>
                <p className="text-sm text-gray-500 mt-2">Intelligent inventory analysis identifies patterns and optimizes purchasing, freeing up significant capital without affecting delivery capacity.</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-orange-600 mb-2">60x</div>
                <h3 className="text-lg font-semibold mb-2">speed increase in data analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">From hours of manual processing to instant insight</p>
                <p className="text-sm text-gray-500 mt-2">Complex documents and technical data are compared and analyzed in minutes instead of hours or days.</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-red-600 mb-2">45%</div>
                <h3 className="text-lg font-semibold mb-2">fewer resource-intensive cases</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">From recurring problems to proactive solutions</p>
                <p className="text-sm text-gray-500 mt-2">AI-driven pattern recognition in warranty cases reduces case processing time and prevents recurring problems.</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-green-600 mb-2">ROI</div>
                <h3 className="text-lg font-semibold mb-2">Documented ROI within the first week</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Documented value</p>
                <p className="text-sm text-gray-500 mt-2">Measurable ROI from day one. Our 48-hour workshop delivers immediate value with implemented solutions that provide a positive return already during the course.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.teamTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.teamSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-2xl font-semibold">Sven Arnarsson</h3>
                  <p className="text-gray-600 dark:text-gray-300">Founder - AI Implementation & Business Development</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">20+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Companies grown</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">10+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Years of startup experience</div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Sven has an extensive background in tech and startup environments, where he has specialized in converting complex technologies into practical solutions with immediate business value.
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Areas of expertise:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Rapid AI implementation with focus on concrete results</li>
                    <li>• Data-driven decision support and business optimization</li>
                    <li>• Strategic use of AI in daily workflows</li>
                    <li>• Technology-driven efficiency and automation</li>
                  </ul>
                </div>

                <blockquote className="text-sm italic text-gray-600 dark:text-gray-300 border-l-4 border-gray-300 pl-4">
                  "My mission is to demystify AI and make it an effective tool that creates immediate value for any company."
                </blockquote>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-2xl font-semibold">Carsten Timm</h3>
                  <p className="text-gray-600 dark:text-gray-300">Founder - Competency Development & Technology Communication and Training</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">10.000+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Course participants and employees trained</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">11+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Years of teaching experience</div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Carsten combines his background in IT, economics, and digital marketing with an outstanding ability to make complex technology accessible and applicable.
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Areas of expertise:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Customized technology training for all levels</li>
                    <li>• Effective competency transfer and knowledge sharing</li>
                    <li>• Practical integration of AI into existing workflows</li>
                    <li>• Business-oriented technology understanding</li>
                  </ul>
                </div>

                <blockquote className="text-sm italic text-gray-600 dark:text-gray-300 border-l-4 border-gray-300 pl-4">
                  "I am passionate about making advanced technology an everyday tool that can be used by all employees – not just specialists."
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.blogTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t.blogSubtitle}
            </p>
            <Button variant="outline">View all articles</Button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.footerTitle}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t.footerSubtitle}
          </p>
          <Button size="lg" className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
            {t.bookMeeting}
          </Button>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white">48</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Hours</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Value</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white">∞</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Potential</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">HARKA</h3>
              <p className="text-gray-300 mb-4">{t.footerDescription}</p>
              <div className="space-y-2 text-sm text-gray-300">
                <div>hellyeah@harka.dk</div>
                <div>+45 29 12 83 81</div>
                <div>Danneskiold-Samsøes Allé 41, 1434 Copenhagen</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t.navigation}</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>Our method</div>
                <div>Results</div>
                <div>Team</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t.legal}</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>Privacy policy</div>
                <div>Cookie policy</div>
                <div>Terms and conditions</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2025 HARKA. {t.allRights}
          </div>
        </div>
      </footer>
    </div>
  )
}