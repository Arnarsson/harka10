"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ChevronDown, Globe, Menu, X, Sun, Moon, User, Shield, Star, CheckCircle, Play, BarChart3, Users, FileText, Zap, Clock } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useUser } from "@clerk/nextjs"
import { useAnalytics } from "@/components/analytics/analytics-tracker"
import { useLanguage } from "@/lib/i18n/language-context"

export function HarkaHeroComplete() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { isSignedIn, user } = useUser()
  const { trackCTAClick } = useAnalytics()
  const { language, setLanguage, t } = useLanguage()
  
  // Check if user is admin
  const isAdmin = user?.publicMetadata?.role === 'admin'

  const handleLanguageToggle = () => {
    setLanguage(language === 'da' ? 'en' : 'da')
  }

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
              {isAdmin && (
                <Link href="/admin" className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              )}
            </div>

            {/* Right side controls */}
            <div className="hidden md:flex items-center space-x-4">
              {isSignedIn ? (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Connected</span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="flex items-center gap-2"
                  >
                    {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLanguageToggle}
                    className="flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    {language === 'da' ? 'EN' : 'DA'}
                  </Button>

                  <Link href="/dashboard">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="flex items-center gap-2"
                  >
                    {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLanguageToggle}
                    className="flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    {language === 'da' ? 'EN' : 'DA'}
                  </Button>

                  <Link href="/sign-in">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>

                  <Link href="/sign-up">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
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
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="w-full justify-start mb-2"
                >
                  {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLanguageToggle}
                  className="w-full justify-start"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language === 'da' ? 'EN' : 'DA'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-6rem)]">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                {t.trustedByNordic}
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gray-900 dark:text-white">{t.heroHeadline}</span>
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
                  {t.heroSubheadline}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {isSignedIn ? (
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
                    trackCTAClick('hero_cta', t.heroCta)
                    window.open('https://calendly.com/harka-ai-workshop', '_blank')
                  }}>
                    {t.heroCta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
              
              {!isSignedIn && (
                <div className="mt-4 p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg border">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    🎯 <strong>{t.freeConsultation}</strong>
                  </p>
                  <p className="text-xs text-gray-500">
                    ✓ {language === 'da' ? 'Forstå dine specifikke use cases' : 'Understand your specific use cases'} ✓ {language === 'da' ? 'Få implementeringstidsplan' : 'Get implementation timeline'} ✓ {language === 'da' ? 'Modtag skræddersyede anbefalinger' : 'Receive custom recommendations'}
                  </p>
                </div>
              )}
            </div>

            {/* Right Content - Learning Progress Dashboard */}
            <div className="relative">
              <Card className="p-8 bg-white dark:bg-gray-800 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">{language === 'da' ? 'Læringsforløb' : 'Learning Progress'}</h3>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">?</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Fundamentals</span>
                      <span className="text-green-600 font-semibold">100%</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full w-full" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Ethics & Governance</span>
                      <span className="text-blue-600 font-semibold">75%</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full w-3/4" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Implementation</span>
                      <span className="text-purple-600 font-semibold">45%</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-[45%]" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">{language === 'da' ? 'Næste Modul' : 'Next Module'}</div>
                      <div className="text-sm font-medium">Project Planning Workshop</div>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Continue
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="text-center mt-8">
            <ChevronDown className="h-6 w-6 text-gray-400 mx-auto animate-bounce" />
            <div className="text-sm text-gray-500 mt-2">{language === 'da' ? 'Scroll ned' : 'Scroll down'}</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t.statDays}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">6-12</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t.statMonths}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">60%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t.statAdmin}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">200%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t.statRoi}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section id="method" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.valueTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t.valueSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <Zap className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-semibold">{t.accelerated}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.acceleratedDesc}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <Users className="h-12 w-12 text-green-600" />
                <h3 className="text-xl font-semibold">{t.competency}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.competencyDesc}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <BarChart3 className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-semibold">{t.immediate}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.immediateDesc}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <CheckCircle className="h-12 w-12 text-orange-600" />
                <h3 className="text-xl font-semibold">{t.tailored}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.tailoredDesc}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <FileText className="h-12 w-12 text-red-600" />
                <h3 className="text-xl font-semibold">{t.practical}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.practicalDesc}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <Clock className="h-12 w-12 text-indigo-600" />
                <h3 className="text-xl font-semibold">{t.market}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.marketDesc}
                  <span className="block mt-2 text-sm italic">- {t.marketSource}</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Two-Day Process Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.processTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-semibold">{t.day1Title}</h3>
                </div>
                <ul className="space-y-3">
                  {t.day1Items.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-semibold">{t.day2Title}</h3>
                </div>
                <ul className="space-y-3">
                  {t.day2Items.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
              trackCTAClick('process_cta', t.contactToday)
              window.open('https://calendly.com/harka-ai-workshop', '_blank')
            }}>
              {t.contactToday}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-sm text-gray-500 mt-2">{t.noObligations}</p>
          </div>
        </div>
      </section>

      {/* Results/Case Study Section */}
      <section id="results" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.resultsTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.resultsSubtitle}
            </p>
          </div>

          {/* Case Study */}
          <Card className="p-8 mb-12">
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">{t.caseStudyTitle}</h3>
                <h4 className="text-lg font-semibold mb-2">{t.caseStudySubtitle}</h4>
                <p className="text-gray-600 dark:text-gray-300">{t.caseStudyDescription}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">{t.challengeTitle}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t.challengeDesc}</p>
                <ul className="space-y-2">
                  {t.challengeItems.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">{t.workshopTitle}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t.workshopDesc}</p>
                <ul className="space-y-3">
                  {t.workshopItems.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">{t.spotlightTitle}</h4>
                <p className="mb-4">{t.spotlightDesc}</p>
                <ul className="space-y-2 mb-4">
                  {t.spotlightItems.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="italic">{t.spotlightResult}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">{t.valueTitle}</h4>
                <ul className="space-y-3">
                  {t.valueItems.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">{t.customerExperienceTitle}</h4>
                <blockquote className="italic text-lg mb-2">"{t.customerQuote}"</blockquote>
                <cite className="text-gray-600 dark:text-gray-300">— {t.customerRole}</cite>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 text-center">
              <CardContent>
                <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
                <div className="text-sm">{t.fasterRiskAssessment}</div>
              </CardContent>
            </Card>
            <Card className="p-6 text-center">
              <CardContent>
                <div className="text-4xl font-bold text-green-600 mb-2">40%</div>
                <div className="text-sm">{t.reductionInCapital}</div>
              </CardContent>
            </Card>
            <Card className="p-6 text-center">
              <CardContent>
                <div className="text-4xl font-bold text-purple-600 mb-2">10x</div>
                <div className="text-sm">{t.speedIncrease}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.testimonialTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.testimonialSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                </div>
                <blockquote className="italic">"{t.testimonialQuote1}"</blockquote>
                <cite className="text-gray-600 dark:text-gray-300">— {t.testimonialRole1}</cite>
                <div className="text-sm font-semibold text-blue-600">{t.fasterAssessments}</div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                </div>
                <blockquote className="italic">"{t.testimonialQuote2}"</blockquote>
                <cite className="text-gray-600 dark:text-gray-300">— {t.testimonialRole2}</cite>
                <div className="text-sm font-semibold text-green-600">{t.teamProductivity}</div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                </div>
                <blockquote className="italic">"{t.testimonialQuote3}"</blockquote>
                <cite className="text-gray-600 dark:text-gray-300">— {t.testimonialRole3}</cite>
                <div className="text-sm font-semibold text-purple-600">{t.roiFirstWeek}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.faqTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.faqSubtitle}
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-6">
              <CardContent>
                <h3 className="text-lg font-semibold mb-3">{t.faqQ1}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.faqA1}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <h3 className="text-lg font-semibold mb-3">{t.faqQ2}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.faqA2}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <h3 className="text-lg font-semibold mb-3">{t.faqQ3}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.faqA3}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <h3 className="text-lg font-semibold mb-3">{t.faqQ4}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.faqA4}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <h3 className="text-lg font-semibold mb-3">{t.faqQ5}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.faqA5}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <h3 className="text-lg font-semibold mb-3">{t.faqQ6}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.faqA6}</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg mb-6">{t.stillQuestions}</p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
              trackCTAClick('faq_cta', t.bookDiscoveryCall)
              window.open('https://calendly.com/harka-ai-workshop', '_blank')
            }}>
              {t.bookDiscoveryCall}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.footerTitle}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t.footerSubtitle}
          </p>
          
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" onClick={() => {
            trackCTAClick('final_cta', t.bookDiscoveryCall)
            window.open('https://calendly.com/harka-ai-workshop', '_blank')
          }}>
            {t.bookDiscoveryCall}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
            <div>
              <div className="text-2xl font-bold">{t.satisfactionRate}</div>
              <div className="text-sm text-blue-100">{language === 'da' ? 'Tilfredshedsrate' : 'Satisfaction Rate'}</div>
            </div>
            <div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-blue-100">{t.companiesTrained}</div>
            </div>
            <div>
              <div className="text-2xl font-bold">2000+</div>
              <div className="text-sm text-blue-100">{t.participantsTrained}</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{t.isoCertified}</div>
              <div className="text-sm text-blue-100">{language === 'da' ? 'Sikkerhed' : 'Security'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="text-2xl font-bold mb-4">HARKA</div>
              <p className="text-gray-300 mb-4">
                {t.footerDescription}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.navigation}</h4>
              <ul className="space-y-2">
                <li><Link href="#method" className="text-gray-300 hover:text-white">{t.method}</Link></li>
                <li><Link href="#results" className="text-gray-300 hover:text-white">{t.results}</Link></li>
                <li><Link href="#team" className="text-gray-300 hover:text-white">{t.team}</Link></li>
                <li><Link href="#blog" className="text-gray-300 hover:text-white">{t.blog}</Link></li>
                <li><Link href="#contact" className="text-gray-300 hover:text-white">{t.contact}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.legal}</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-300 hover:text-white">{t.privacyPolicy}</Link></li>
                <li><Link href="/cookies" className="text-gray-300 hover:text-white">{t.cookiePolicy}</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-white">{t.terms}</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 HARKA. {t.allRights}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}