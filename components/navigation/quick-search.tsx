"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Search, Clock, Star, Play, Users, BookOpen, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'course' | 'lesson' | 'interactive' | 'demo' | 'community'
  url: string
  metadata: {
    duration?: string
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
    rating?: number
    views?: number
    tags: string[]
    isNew?: boolean
    isLive?: boolean
  }
}

// Mock search data - in real app this would come from API
const SEARCH_DATA: SearchResult[] = [
  {
    id: '1',
    title: 'Interactive Learning Demo',
    description: 'Experience AI-powered interactive lessons with hands-on coding',
    type: 'interactive',
    url: '/demo/interactive-learning',
    metadata: {
      duration: '15 min',
      difficulty: 'beginner',
      rating: 4.8,
      views: 1234,
      tags: ['AI', 'Interactive', 'React'],
      isNew: true
    }
  },
  {
    id: '2',
    title: 'Enhanced Interactive Experience',
    description: 'Advanced interactive lessons with pause points, quizzes, and code exercises',
    type: 'interactive',
    url: '/demo/enhanced-interactive',
    metadata: {
      duration: '25 min',
      difficulty: 'intermediate',
      rating: 4.9,
      views: 856,
      tags: ['Interactive', 'Quiz', 'Code', 'Advanced'],
      isNew: true
    }
  },
  {
    id: '3',
    title: 'Power Hour Community',
    description: 'Join live collaborative learning sessions with other students',
    type: 'community',
    url: '/community/power-hour',
    metadata: {
      difficulty: 'beginner',
      rating: 4.7,
      views: 2341,
      tags: ['Community', 'Live', 'Collaboration'],
      isLive: true
    }
  },
  {
    id: '4',
    title: 'Code Playground',
    description: 'Practice coding in real-time with AI assistance',
    type: 'demo',
    url: '/learn/playground',
    metadata: {
      difficulty: 'beginner',
      rating: 4.6,
      views: 3421,
      tags: ['Coding', 'Practice', 'AI'],
      isLive: true
    }
  },
  {
    id: '5',
    title: 'React Hooks Deep Dive',
    description: 'Master useState, useEffect, and custom hooks',
    type: 'course',
    url: '/learn/courses/react-hooks',
    metadata: {
      duration: '2h 30min',
      difficulty: 'intermediate',
      rating: 4.8,
      views: 5234,
      tags: ['React', 'Hooks', 'JavaScript']
    }
  },
  {
    id: '6',
    title: 'Teacher Dashboard',
    description: 'Upload content and create interactive lessons',
    type: 'lesson',
    url: '/teach/dashboard',
    metadata: {
      difficulty: 'beginner',
      tags: ['Teacher', 'Upload', 'Content Management']
    }
  },
  {
    id: '7',
    title: 'Interactive Builder',
    description: 'Create interactive lessons with quizzes and code exercises',
    type: 'lesson',
    url: '/teach/interactive',
    metadata: {
      difficulty: 'advanced',
      tags: ['Teacher', 'Interactive', 'Builder'],
      isNew: true
    }
  }
]

interface QuickSearchProps {
  onClose?: () => void
  className?: string
}

export function QuickSearch({ onClose, className }: QuickSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Search logic
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }

    const filtered = SEARCH_DATA.filter(item => {
      const searchText = `${item.title} ${item.description} ${item.metadata.tags.join(' ')}`.toLowerCase()
      return searchText.includes(query.toLowerCase())
    }).slice(0, 6) // Limit to 6 results

    setResults(filtered)
    setSelectedIndex(-1)
  }, [query])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || results.length === 0) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1))
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0) {
            window.location.href = results[selectedIndex].url
          }
          break
        case 'Escape':
          setIsOpen(false)
          inputRef.current?.blur()
          onClose?.()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'interactive': return <Sparkles className="h-4 w-4 text-purple-500" />
      case 'course': return <BookOpen className="h-4 w-4 text-blue-500" />
      case 'community': return <Users className="h-4 w-4 text-orange-500" />
      case 'demo': return <Play className="h-4 w-4 text-green-500" />
      case 'lesson': return <Clock className="h-4 w-4 text-gray-500" />
      default: return <Search className="h-4 w-4 text-gray-400" />
    }
  }

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
      case 'intermediate': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20'
      case 'advanced': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20'
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search lessons, courses, and features..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            // Delay to allow click events
            setTimeout(() => setIsOpen(false), 150)
          }}
          className="pl-10 pr-4"
        />
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <Card className="shadow-lg border">
            <CardContent className="p-0">
              {results.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p>No results found for "{query}"</p>
                  <p className="text-xs mt-1">Try searching for courses, lessons, or features</p>
                </div>
              ) : (
                <div ref={resultsRef} className="max-h-96 overflow-y-auto">
                  {results.map((result, index) => (
                    <Link 
                      key={result.id} 
                      href={result.url}
                      className="block"
                      onClick={() => {
                        setIsOpen(false)
                        onClose?.()
                      }}
                    >
                      <div className={`p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer ${
                        selectedIndex === index ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}>
                        <div className="flex items-start space-x-3">
                          <div className="mt-0.5">
                            {getTypeIcon(result.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold text-sm truncate">
                                {result.title}
                              </h4>
                              {result.metadata.isNew && (
                                <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                                  NEW
                                </Badge>
                              )}
                              {result.metadata.isLive && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                  LIVE
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {result.description}
                            </p>
                            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                              {result.metadata.duration && (
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{result.metadata.duration}</span>
                                </div>
                              )}
                              {result.metadata.rating && (
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                  <span>{result.metadata.rating}</span>
                                </div>
                              )}
                              {result.metadata.views && (
                                <div className="flex items-center space-x-1">
                                  <Users className="h-3 w-3" />
                                  <span>{result.metadata.views.toLocaleString()}</span>
                                </div>
                              )}
                              {result.metadata.difficulty && (
                                <Badge className={`text-xs ${getDifficultyColor(result.metadata.difficulty)}`}>
                                  {result.metadata.difficulty}
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {result.metadata.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {result.metadata.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{result.metadata.tags.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Tips */}
      {isOpen && query.trim().length < 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <Card className="shadow-lg border">
            <CardContent className="p-4">
              <div className="text-center space-y-3">
                <Search className="h-8 w-8 mx-auto text-gray-400" />
                <div>
                  <h4 className="font-semibold text-sm mb-2">Quick Search</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Type at least 2 characters to search
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="font-medium mb-1">Popular searches:</p>
                      <p className="text-muted-foreground">• Interactive</p>
                      <p className="text-muted-foreground">• React</p>
                      <p className="text-muted-foreground">• Playground</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Navigation:</p>
                      <p className="text-muted-foreground">• ↑↓ Navigate</p>
                      <p className="text-muted-foreground">• Enter Select</p>
                      <p className="text-muted-foreground">• Esc Close</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}