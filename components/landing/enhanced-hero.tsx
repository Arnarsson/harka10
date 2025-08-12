"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ChevronDown, Globe, Menu, X, Sun, Moon, User, Shield, Star, CheckCircle, Play, BarChart3, Users, FileText, Zap, Clock, Sparkles } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useUser } from "@clerk/nextjs"
import { useAnalytics } from "@/components/analytics/analytics-tracker"
import { useLanguage } from "@/lib/i18n/language-context"

// Animated gradient background component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden hero-background">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-x hero-gradient"></div>
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
      
      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/20 dark:to-gray-900/20" />
    </div>
  )
}

// Typing animation component
const TypewriterText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])
  
  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}

// Interactive floating dashboard component
const FloatingDashboard = ({ language }: { language: string }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="relative transform transition-all duration-700 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      <Card className="relative p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl border-0 ring-1 ring-white/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {language === 'da' ? 'Læringsanalyse' : 'Learning Analytics'}
            </h3>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        <div className="space-y-6">
          {/* Progress bars with animations */}
          {[
            { label: 'AI Fundamentals', progress: 100, color: 'from-green-400 to-green-600' },
            { label: 'Ethics & Governance', progress: 75, color: 'from-blue-400 to-blue-600' },
            { label: 'Implementation', progress: 45, color: 'from-purple-400 to-purple-600' }
          ].map((item, index) => (
            <div key={item.label} className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.label}</span>
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {item.progress}%
                </span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ 
                    width: `${item.progress}%`,
                    animationDelay: `${index * 0.2}s`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm text-gray-500">{language === 'da' ? 'Næste Modul' : 'Next Module'}</div>
              <div className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                Project Planning Workshop
              </div>
            </div>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {language === 'da' ? 'Fortsæt' : 'Continue'}
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export function EnhancedHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [animationsDisabled, setAnimationsDisabled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { isSignedIn, user } = useUser()
  const { trackCTAClick } = useAnalytics()
  const { language, setLanguage, t } = useLanguage()
  const heroRef = useRef<HTMLElement>(null)
  
  // Check if user is admin
  const isAdmin = user?.publicMetadata?.role === 'admin'

  const handleLanguageToggle = () => {
    setLanguage(language === 'da' ? 'en' : 'da')
  }

  // Mark mounted to avoid SSR/CSR random mismatch for visuals
  useEffect(() => {
    setMounted(true)
    // Determine whether animations should be disabled
    try {
      const envDisabled = process.env.NEXT_PUBLIC_DISABLE_ANIMATIONS === 'true'
      const mediaReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const attrDisabled = typeof document !== 'undefined' && document.body?.dataset?.disableAnimations === 'true'
      setAnimationsDisabled(Boolean(envDisabled || mediaReduced || attrDisabled))
    } catch {
      setAnimationsDisabled(false)
    }
  }, [])

  // Scroll animations
  useEffect(() => {
    if (animationsDisabled) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.scroll-animate')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [animationsDisabled])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with gradient */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                HARKA
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { href: "#method", label: t.method },
                { href: "#results", label: t.results },
                { href: "#team", label: t.team },
                { href: "#blog", label: t.blog },
                { href: "#contact", label: t.contact }
              ].map(({ href, label }) => (
                <Link 
                  key={href}
                  href={href} 
                  className="text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text transition-all duration-300 font-medium"
                >
                  {label}
                </Link>
              ))}
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
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700 dark:text-gray-300">Connected</span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLanguageToggle}
                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    <Globe className="h-4 w-4" />
                    {language === 'da' ? 'EN' : 'DA'}
                  </Button>

                  <Link href="/dashboard">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
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
                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLanguageToggle}
                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    <Globe className="h-4 w-4" />
                    {language === 'da' ? 'EN' : 'DA'}
                  </Button>

                  <Link href="/sign-in">
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
                      Sign In
                    </Button>
                  </Link>

                  <Link href="/sign-up">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
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
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-800/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { href: "#method", label: t.method },
                { href: "#results", label: t.results },
                { href: "#team", label: t.team },
                { href: "#blog", label: t.blog },
                { href: "#contact", label: t.contact }
              ].map(({ href, label }) => (
                <Link 
                  key={href}
                  href={href} 
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-300"
                >
                  {label}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="w-full justify-start mb-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLanguageToggle}
                  className="w-full justify-start hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language === 'da' ? 'EN' : 'DA'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen relative overflow-hidden">
        {mounted && !animationsDisabled && <AnimatedBackground />}
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-6rem)]">
            {/* Left Content */}
            <div className="space-y-8 scroll-animate">
              <div className="inline-flex items-center rounded-full border border-blue-200/50 bg-blue-50/50 dark:bg-blue-900/20 backdrop-blur-sm px-4 py-2 text-sm shadow-lg">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse" />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                  {t.trustedByNordic}
                </span>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl lg:text-7xl font-bold leading-tight">
                  {animationsDisabled ? (
                    <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                      {t.heroHeadline}
                    </span>
                  ) : (
                    <TypewriterText 
                      text={t.heroHeadline}
                      className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent"
                    />
                  )}
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '2s', animationFillMode: 'both' }}>
                  {t.heroSubheadline}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '2.5s', animationFillMode: 'both' }}>
                {isSignedIn ? (
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group" 
                    onClick={() => {
                      trackCTAClick('hero_cta', t.heroCta)
                      window.open('https://calendly.com/harka-ai-workshop', '_blank')
                    }}
                  >
                    {t.heroCta}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </div>
              
              {!isSignedIn && (
                <div className="mt-4 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg animate-fade-in-up" style={{ animationDelay: '3s', animationFillMode: 'both' }}>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    <strong>{t.freeConsultation}</strong>
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      language === 'da' ? 'Forstå dine specifikke use cases' : 'Understand your specific use cases',
                      language === 'da' ? 'Få implementeringstidsplan' : 'Get implementation timeline',
                      language === 'da' ? 'Modtag skræddersyede anbefalinger' : 'Receive custom recommendations'
                    ].map((item, index) => (
                      <p key={index} className="text-xs text-gray-500 flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Content - Enhanced Dashboard */}
            <div className="relative scroll-animate" style={{ animationDelay: '1s' }}>
              <FloatingDashboard language={language} />
            </div>
          </div>

          {/* Enhanced scroll indicator */}
          <div className="text-center mt-8 animate-fade-in-up" style={{ animationDelay: '3.5s', animationFillMode: 'both' }}>
            <div className="inline-flex flex-col items-center gap-2 p-4 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm">
              <ChevronDown className="h-6 w-6 text-gray-600 dark:text-gray-400 animate-bounce" />
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {language === 'da' ? 'Udforsk mere' : 'Explore more'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2", label: t.statDays, color: "text-blue-600", gradient: "from-blue-400 to-blue-600" },
              { value: "6-12", label: t.statMonths, color: "text-green-600", gradient: "from-green-400 to-green-600" },
              { value: "60%", label: t.statAdmin, color: "text-purple-600", gradient: "from-purple-400 to-purple-600" },
              { value: "200%", label: t.statRoi, color: "text-orange-600", gradient: "from-orange-400 to-orange-600" }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 scroll-animate">
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Value Props Section */}
      <section id="method" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6">
              {t.valueTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t.valueSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: t.accelerated, desc: t.acceleratedDesc, color: "text-blue-600", bgColor: "bg-blue-100 dark:bg-blue-900/20" },
              { icon: Users, title: t.competency, desc: t.competencyDesc, color: "text-green-600", bgColor: "bg-green-100 dark:bg-green-900/20" },
              { icon: BarChart3, title: t.immediate, desc: t.immediateDesc, color: "text-purple-600", bgColor: "bg-purple-100 dark:bg-purple-900/20" },
              { icon: CheckCircle, title: t.tailored, desc: t.tailoredDesc, color: "text-orange-600", bgColor: "bg-orange-100 dark:bg-orange-900/20" },
              { icon: FileText, title: t.practical, desc: t.practicalDesc, color: "text-red-600", bgColor: "bg-red-100 dark:bg-red-900/20" },
              { icon: Clock, title: t.market, desc: t.marketDesc, color: "text-indigo-600", bgColor: "bg-indigo-100 dark:bg-indigo-900/20" }
            ].map((item, index) => (
              <Card key={item.title} className="group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 ring-1 ring-white/20 dark:ring-gray-700/20 hover:ring-2 hover:ring-blue-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 scroll-animate" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="space-y-6 p-0">
                  <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                    <item.icon className={`h-8 w-8 ${item.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
                  {item.title === t.market && (
                    <p className="text-sm italic text-gray-500 dark:text-gray-400">- {t.marketSource}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Two-Day Process Section */}
      <section className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-50/30 to-purple-50/30 dark:via-blue-900/10 dark:to-purple-900/10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-green-700 to-blue-700 dark:from-white dark:via-green-200 dark:to-blue-200 bg-clip-text text-transparent mb-6">
              {t.processTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {[
              { 
                day: 1, 
                title: t.day1Title, 
                items: t.day1Items, 
                color: "bg-blue-600", 
                ringColor: "ring-blue-500/20",
                gradientFrom: "from-blue-500",
                gradientTo: "to-blue-600"
              },
              { 
                day: 2, 
                title: t.day2Title, 
                items: t.day2Items, 
                color: "bg-green-600", 
                ringColor: "ring-green-500/20",
                gradientFrom: "from-green-500",
                gradientTo: "to-green-600"
              }
            ].map((dayInfo, index) => (
              <Card key={dayInfo.day} className={`group p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 ring-1 ring-white/20 dark:ring-gray-700/20 hover:ring-2 hover:${dayInfo.ringColor} transition-all duration-500 hover:scale-105 scroll-animate`} style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="space-y-8 p-0">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${dayInfo.gradientFrom} ${dayInfo.gradientTo} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl group-hover:scale-110 transition-all duration-300`}>
                      {dayInfo.day}
                    </div>
                    <h3 className="text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      {dayInfo.title}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {dayInfo.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3 group/item">
                        <CheckCircle className={`h-5 w-5 ${dayInfo.day === 1 ? 'text-blue-600' : 'text-green-600'} mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-all duration-200`} />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center scroll-animate">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group mb-4" 
              onClick={() => {
                trackCTAClick('process_cta', t.contactToday)
                window.open('https://calendly.com/harka-ai-workshop', '_blank')
              }}
            >
              {t.contactToday}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t.noObligations}</p>
          </div>
        </div>
      </section>

      {/* Enhanced Results/Case Study Section */}
      <section id="results" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-green-50/50 to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-green-700 to-blue-700 dark:from-white dark:via-green-200 dark:to-blue-200 bg-clip-text text-transparent mb-6">
              {t.resultsTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t.resultsSubtitle}
            </p>
          </div>

          {/* Enhanced Case Study */}
          <Card className="p-12 mb-16 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 ring-1 ring-white/20 dark:ring-gray-700/20 scroll-animate">
            <CardContent className="space-y-10 p-0">
              <div>
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t.caseStudyTitle}</h3>
                <h4 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">{t.caseStudySubtitle}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{t.caseStudyDescription}</p>
              </div>

              {/* Challenge Section */}
              <div className="bg-red-50/50 dark:bg-red-900/10 p-8 rounded-2xl">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                  </div>
                  {t.challengeTitle}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{t.challengeDesc}</p>
                <ul className="space-y-3">
                  {t.challengeItems.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Workshop Solution */}
              <div className="bg-green-50/50 dark:bg-green-900/10 p-8 rounded-2xl">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  {t.workshopTitle}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{t.workshopDesc}</p>
                <ul className="space-y-4">
                  {t.workshopItems.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Spotlight Results */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 p-8 rounded-2xl">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                  {t.spotlightTitle}
                </h4>
                <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">{t.spotlightDesc}</p>
                <ul className="space-y-3 mb-6">
                  {t.spotlightItems.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="italic text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t.spotlightResult}</p>
              </div>

              {/* Customer Quote */}
              <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl text-center">
                <blockquote className="text-xl italic mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">"{t.customerQuote}"</blockquote>
                <cite className="text-gray-600 dark:text-gray-400 font-medium">— {t.customerRole}</cite>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Stats Cards */}
          <div className="grid md:grid-cols-3 gap-8 scroll-animate">
            {[
              { value: "85%", label: t.fasterRiskAssessment, gradient: "from-blue-400 to-blue-600", icon: BarChart3 },
              { value: "40%", label: t.reductionInCapital, gradient: "from-green-400 to-green-600", icon: CheckCircle },
              { value: "10x", label: t.speedIncrease, gradient: "from-purple-400 to-purple-600", icon: Zap }
            ].map((stat, index) => (
              <Card key={stat.label} className="group p-8 text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 ring-1 ring-white/20 dark:ring-gray-700/20 hover:ring-2 hover:ring-blue-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className={`text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-3`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-50/30 to-orange-50/30 dark:from-yellow-900/5 dark:to-orange-900/5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-orange-700 to-yellow-600 dark:from-white dark:via-orange-200 dark:to-yellow-200 bg-clip-text text-transparent mb-6">
              {t.testimonialTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t.testimonialSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: t.testimonialQuote1, role: t.testimonialRole1, result: t.fasterAssessments, resultColor: "text-blue-600" },
              { quote: t.testimonialQuote2, role: t.testimonialRole2, result: t.teamProductivity, resultColor: "text-green-600" },
              { quote: t.testimonialQuote3, role: t.testimonialRole3, result: t.roiFirstWeek, resultColor: "text-purple-600" }
            ].map((testimonial, index) => (
              <Card key={index} className="group p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 ring-1 ring-white/20 dark:ring-gray-700/20 hover:ring-2 hover:ring-yellow-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 scroll-animate" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="space-y-6 p-0">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 italic leading-relaxed">"{testimonial.quote}"</blockquote>
                  <cite className="text-gray-600 dark:text-gray-300 font-medium">— {testimonial.role}</cite>
                  <div className={`text-sm font-semibold ${testimonial.resultColor} bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-full inline-block`}>
                    {testimonial.result}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-50/50 to-blue-50/50 dark:from-indigo-900/10 dark:to-blue-900/10" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-700 to-blue-700 dark:from-white dark:via-indigo-200 dark:to-blue-200 bg-clip-text text-transparent mb-6">
              {t.faqTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {t.faqSubtitle}
            </p>
          </div>

          <div className="space-y-6">
            {[
              { q: t.faqQ1, a: t.faqA1 },
              { q: t.faqQ2, a: t.faqA2 },
              { q: t.faqQ3, a: t.faqA3 },
              { q: t.faqQ4, a: t.faqA4 },
              { q: t.faqQ5, a: t.faqA5 },
              { q: t.faqQ6, a: t.faqA6 }
            ].map((faq, index) => (
              <Card key={index} className="group p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 ring-1 ring-white/20 dark:ring-gray-700/20 hover:ring-2 hover:ring-indigo-500/20 transition-all duration-300 scroll-animate" style={{ animationDelay: `${index * 0.05}s` }}>
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16 scroll-animate">
            <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">{t.stillQuestions}</p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group" 
              onClick={() => {
                trackCTAClick('faq_cta', t.bookDiscoveryCall)
                window.open('https://calendly.com/harka-ai-workshop', '_blank')
              }}
            >
              {t.bookDiscoveryCall}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          {/* Animated particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="scroll-animate">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t.footerTitle}
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t.footerSubtitle}
            </p>
            
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group mb-16 text-lg px-8 py-4"
              onClick={() => {
                trackCTAClick('final_cta', t.bookDiscoveryCall)
                window.open('https://calendly.com/harka-ai-workshop', '_blank')
              }}
            >
              {t.bookDiscoveryCall}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
              {[
                { value: t.satisfactionRate, label: language === 'da' ? 'Tilfredshedsrate' : 'Satisfaction Rate' },
                { value: '500+', label: t.companiesTrained },
                { value: '2000+', label: t.participantsTrained },
                { value: t.isoCertified, label: language === 'da' ? 'Sikkerhed' : 'Security' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                HARKA
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
                {t.footerDescription}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">{t.navigation}</h4>
              <ul className="space-y-3">
                {[
                  { href: "#method", label: t.method },
                  { href: "#results", label: t.results },
                  { href: "#team", label: t.team },
                  { href: "#blog", label: t.blog },
                  { href: "#contact", label: t.contact }
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent transition-all duration-300">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">{t.legal}</h4>
              <ul className="space-y-3">
                {[
                  { href: "/privacy", label: t.privacyPolicy },
                  { href: "/cookies", label: t.cookiePolicy },
                  { href: "/terms", label: t.terms }
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent transition-all duration-300">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2024 HARKA. {t.allRights}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
