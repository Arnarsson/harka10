'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookmarkIcon,
  Bot,
  Settings,
  Menu,
  X,
  ChevronLeft,
  Globe,
  Sparkles,
  FileText,
  Calendar,
  BarChart3
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { user } = useUser()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [language, setLanguage] = useState<'da' | 'en'>('da')
  const [collapsed, setCollapsed] = useState(false)

  // Load language preference
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'da' | 'en'
    if (savedLang) {
      setLanguage(savedLang)
    }
  }, [])

  // Handle language switch
  const toggleLanguage = () => {
    const newLang = language === 'da' ? 'en' : 'da'
    setLanguage(newLang)
    localStorage.setItem('language', newLang)
    // Trigger a custom event for components to react to language change
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }))
  }

  const navigation = [
    {
      name: language === 'da' ? 'Oversigt' : 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      current: pathname === '/dashboard'
    },
    {
      name: language === 'da' ? 'Kurser' : 'Courses',
      href: '/learn',
      icon: GraduationCap,
      current: pathname.startsWith('/learn')
    },
    {
      name: language === 'da' ? 'Team' : 'Team',
      href: '/team',
      icon: Users,
      current: pathname === '/team'
    },
    {
      name: language === 'da' ? 'Noter' : 'Notes',
      href: '/notes',
      icon: BookmarkIcon,
      current: pathname === '/notes'
    },
    {
      name: language === 'da' ? 'AI Assistent' : 'AI Assistant',
      href: '/ai-assistant',
      icon: Bot,
      current: pathname === '/ai-assistant'
    },
    {
      name: language === 'da' ? 'Programmer' : 'Programs',
      href: '/programs',
      icon: Calendar,
      current: pathname === '/programs'
    },
    {
      name: language === 'da' ? 'Analyser' : 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      current: pathname === '/analytics'
    },
    {
      name: language === 'da' ? 'Indstillinger' : 'Settings',
      href: '/settings',
      icon: Settings,
      current: pathname === '/settings'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 flex flex-col transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          sidebarOpen ? "left-0" : "-left-full lg:left-0"
        )}
      >
        <div className="flex h-full flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4">
            {!collapsed && (
              <Link href="/dashboard" className="flex items-center gap-2">
                <Sparkles className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold">HARKA AI</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex"
            >
              <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    item.current
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700',
                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors'
                  )}
                >
                  <Icon
                    className={cn(
                      item.current
                        ? 'text-blue-700 dark:text-blue-200'
                        : 'text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300',
                      collapsed ? 'mx-auto' : 'mr-3',
                      'h-5 w-5 flex-shrink-0'
                    )}
                  />
                  {!collapsed && item.name}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
              <UserButton afterSignOutUrl="/" />
              {!collapsed && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className="h-8 w-8 p-0"
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                  <span className="text-xs font-medium">
                    {language.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            {!collapsed && user && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user.fullName || user.emailAddresses[0].emailAddress}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'da' ? 'Elev' : 'Student'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={cn("transition-all duration-300", collapsed ? "lg:pl-16" : "lg:pl-64")}>
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {navigation.find(item => item.current)?.name || 'HARKA AI'}
            </h1>
            
            {/* Language toggle for mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2 lg:hidden"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">{language.toUpperCase()}</span>
            </Button>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}