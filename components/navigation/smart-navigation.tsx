"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Sparkles, Zap, Users } from 'lucide-react'
import { navigationItems, getFeaturedInteractiveItems } from '@/lib/navigation-config'

interface SmartNavigationProps {
  userRole?: 'student' | 'teacher' | 'admin'
}

export function SmartNavigation({ userRole = 'student' }: SmartNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const featuredItems = getFeaturedInteractiveItems()

  // Filter navigation based on user role
  const getVisibleItems = () => {
    let categories = ['learning', 'interactive', 'community', 'tools']
    
    if (userRole === 'teacher' || userRole === 'admin') {
      categories.push('teacher')
    }
    
    return navigationItems.filter(item => categories.includes(item.category))
  }

  const visibleItems = getVisibleItems()
  const interactiveItems = visibleItems.filter(item => item.category === 'interactive')
  const learningItems = visibleItems.filter(item => item.category === 'learning')
  const communityItems = visibleItems.filter(item => item.category === 'community')
  const toolItems = visibleItems.filter(item => item.category === 'tools')
  const teacherItems = visibleItems.filter(item => item.category === 'teacher')

  return (
    <nav className="flex items-center space-x-6">
      {/* Quick Access - Always visible */}
      <Link 
        href="/learn/dashboard" 
        className="text-sm font-medium font-satoshi hover:text-primary transition-colors"
      >
        Dashboard
      </Link>

      {/* Interactive Features Dropdown - Highlighted */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-1 text-sm font-medium font-satoshi group">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span>Interactive</span>
            <Badge variant="secondary" className="ml-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
              NEW
            </Badge>
            <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wide">
            Interactive Features
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {interactiveItems.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href} className="flex items-center space-x-3 cursor-pointer">
                <item.icon className="h-4 w-4" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  )}
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Community Features */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-1 text-sm font-medium font-satoshi group">
            <Users className="h-4 w-4" />
            <span>Community</span>
            <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wide">
            Community & Collaboration
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {communityItems.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href} className="flex items-center space-x-3 cursor-pointer">
                <item.icon className="h-4 w-4" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{item.title}</span>
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          item.isLive 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                            : ''
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {item.isLive && (
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  )}
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Learning */}
      <Link 
        href="/learn/courses" 
        className="text-sm font-medium font-satoshi hover:text-primary transition-colors"
      >
        Courses
      </Link>

      {/* Tools */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-sm font-medium font-satoshi">
            Tools
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {toolItems.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href} className="flex items-center space-x-2 cursor-pointer">
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Teacher Features (if applicable) */}
      {(userRole === 'teacher' || userRole === 'admin') && teacherItems.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-sm font-medium font-satoshi border-purple-200 hover:border-purple-300">
              <span>Teach</span>
              <Badge variant="secondary" className="ml-1 text-xs bg-purple-100 text-purple-700">
                BETA
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wide">
              Teacher Tools
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {teacherItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href} className="flex items-center space-x-3 cursor-pointer">
                  <item.icon className="h-4 w-4" />
                  <div className="flex-1">
                    <span className="font-medium">{item.title}</span>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                    )}
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  )
}