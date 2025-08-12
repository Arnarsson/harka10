"use client"

import Link from "next/link"
import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  BookOpen, 
  Brain, 
  Users, 
  BarChart, 
  Settings, 
  PlayCircle,
  Shield,
  Upload,
  Compass,
  Menu,
  X,
  Sparkles,
  CreditCard,
  Info,
  FileText,
  Globe,
  Sun,
  Moon
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/i18n/language-context"

export function SimpleHeader() {
  const { isSignedIn, user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isAdmin = user?.publicMetadata?.role === 'admin'
  const isTeacher = user?.publicMetadata?.role === 'teacher' || isAdmin
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  // Different navigation items for guests vs authenticated users
  const guestNavItems = [
    { href: '/', label: language === 'da' ? 'Hjem' : 'Home', icon: Home },
    { href: '#features', label: language === 'da' ? 'Funktioner' : 'Features', icon: Sparkles },
    { href: '#pricing', label: language === 'da' ? 'Priser' : 'Pricing', icon: CreditCard },
    { href: '/demo/interactive-learning', label: 'Demo', icon: PlayCircle },
    { href: '#about', label: language === 'da' ? 'Om os' : 'About', icon: Info },
  ]

  const authenticatedNavItems = [
    { href: '/dashboard', label: language === 'da' ? 'Dashboard' : 'Dashboard', icon: BookOpen },
    { href: '/learn/courses', label: language === 'da' ? 'Kurser' : 'Courses', icon: PlayCircle },
    { href: '/learn/ai-kompas', label: 'AI Compass', icon: Compass },
    { href: '/community/power-hour', label: language === 'da' ? 'Fællesskab' : 'Community', icon: Users },
    { href: '/analytics', label: language === 'da' ? 'Analyser' : 'Analytics', icon: BarChart },
    { href: '/toolkit', label: language === 'da' ? 'Værktøjskasse' : 'Toolkit', icon: FileText },
    { href: '/teach/dashboard', label: language === 'da' ? 'Undervis' : 'Teach', icon: Upload, requireTeacher: true },
    { href: '/admin/dashboard', label: 'Admin', icon: Shield, requireAdmin: true },
  ]

  const navItems = isSignedIn ? authenticatedNavItems : guestNavItems

  const visibleItems = navItems.filter(item => {
    if (item.requireAdmin && !isAdmin) return false
    if (item.requireTeacher && !isTeacher) return false
    return true
  })

  const handleLanguageToggle = () => {
    setLanguage(language === 'da' ? 'en' : 'da')
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HARKA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {visibleItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="h-9 w-9"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLanguageToggle}
              className="flex items-center gap-1.5"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium">
                {language === 'da' ? 'EN' : 'DA'}
              </span>
            </Button>

            {/* Auth Section */}
            {isSignedIn ? (
              <>
                <Link href="/settings">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Settings className="h-4 w-4" />
                  </Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    {language === 'da' ? 'Log ind' : 'Sign In'}
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">
                    {language === 'da' ? 'Kom i gang' : 'Get Started'}
                  </Button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="h-9 w-9"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            
            {/* Mobile Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLanguageToggle}
              className="h-9 w-9"
            >
              <Globe className="h-4 w-4" />
            </Button>

            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {visibleItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="pt-4 border-t">
                {isSignedIn ? (
                  <div className="px-3 py-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 px-3">
                    <SignInButton mode="modal">
                      <Button variant="ghost" className="w-full">
                        {language === 'da' ? 'Log ind' : 'Sign In'}
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full">
                        {language === 'da' ? 'Kom i gang' : 'Get Started'}
                      </Button>
                    </SignUpButton>
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}