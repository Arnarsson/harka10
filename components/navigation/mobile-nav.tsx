"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { navigationItems, getFeaturedInteractiveItems } from '@/lib/navigation-config'
import { Sparkles, Users, Zap } from 'lucide-react'

interface MobileNavProps {
  userRole?: 'student' | 'teacher' | 'admin'
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ userRole = 'student', isOpen, onClose }: MobileNavProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('featured')

  const getVisibleItems = () => {
    let categories = ['learning', 'interactive', 'community', 'tools']
    
    if (userRole === 'teacher' || userRole === 'admin') {
      categories.push('teacher')
    }
    
    return navigationItems.filter(item => categories.includes(item.category))
  }

  const visibleItems = getVisibleItems()
  const featuredItems = getFeaturedInteractiveItems()
  const interactiveItems = visibleItems.filter(item => item.category === 'interactive')
  const learningItems = visibleItems.filter(item => item.category === 'learning')
  const communityItems = visibleItems.filter(item => item.category === 'community')
  const toolItems = visibleItems.filter(item => item.category === 'tools')
  const teacherItems = visibleItems.filter(item => item.category === 'teacher')

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  if (!isOpen) return null

  return (
    <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur">
      <ScrollArea className="h-[60vh]">
        <div className="container py-4 space-y-1">
          
          {/* Featured Interactive (Always expanded on mobile) */}
          <div className="py-2">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                Interactive Features
              </span>
              <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                NEW
              </Badge>
            </div>
            
            <div className="space-y-2 pl-6">
              {featuredItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-2 text-sm font-medium font-satoshi hover:text-primary transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          item.isLive 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {item.isLive && (
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          <div className="border-t pt-3 mt-3">
            <h4 className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              Quick Access
            </h4>
            <Link
              href="/learn/dashboard"
              onClick={onClose}
              className="block py-2 text-sm font-medium font-satoshi hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/learn/courses"
              onClick={onClose}
              className="block py-2 text-sm font-medium font-satoshi hover:text-primary transition-colors"
            >
              Courses
            </Link>
          </div>

          {/* Community */}
          {communityItems.length > 0 && (
            <div className="border-t pt-3 mt-3">
              <h4 className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Community
              </h4>
              {communityItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-2 text-sm font-medium font-satoshi hover:text-primary transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </div>
                  {item.isLive && (
                    <div className="flex items-center space-x-1">
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        LIVE
                      </Badge>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* Tools */}
          {toolItems.length > 0 && (
            <div className="border-t pt-3 mt-3">
              <h4 className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Tools
              </h4>
              {toolItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center space-x-2 py-2 text-sm font-medium font-satoshi hover:text-primary transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Teacher Features (if applicable) */}
          {(userRole === 'teacher' || userRole === 'admin') && teacherItems.length > 0 && (
            <div className="border-t pt-3 mt-3">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="text-xs text-muted-foreground uppercase tracking-wide">
                  Teacher Tools
                </h4>
                <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                  BETA
                </Badge>
              </div>
              {teacherItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center space-x-2 py-2 text-sm font-medium font-satoshi hover:text-primary transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}