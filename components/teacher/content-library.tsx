"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Search, Filter, Play, FileText, Image, Code, 
  MoreVertical, Eye, Edit, Trash2, Star, Users,
  Calendar, Clock
} from 'lucide-react'

// Mock data - would come from API in real app
const MOCK_CONTENT_LIBRARY = [
  {
    id: '1',
    title: 'React Hooks Deep Dive',
    description: 'Complete guide to useState, useEffect, and custom hooks',
    type: 'video',
    status: 'published',
    category: 'Web Development',
    difficulty: 'intermediate',
    tags: ['React', 'Hooks', 'JavaScript'],
    views: 2431,
    rating: 4.8,
    ratingCount: 89,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-16',
    duration: '32 min',
    thumbnail: null
  },
  {
    id: '2', 
    title: 'CSS Grid Layout Mastery',
    description: 'Master CSS Grid with practical examples and exercises',
    type: 'interactive',
    status: 'draft',
    category: 'Web Development',
    difficulty: 'beginner',
    tags: ['CSS', 'Grid', 'Layout'],
    views: 0,
    rating: null,
    ratingCount: 0,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    duration: '45 min',
    thumbnail: null
  },
  {
    id: '3',
    title: 'JavaScript ES2024 Features',
    description: 'Comprehensive overview of the latest JavaScript features',
    type: 'document',
    status: 'published',
    category: 'Web Development', 
    difficulty: 'advanced',
    tags: ['JavaScript', 'ES2024', 'Modern JS'],
    views: 1567,
    rating: 4.6,
    ratingCount: 43,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
    duration: null,
    thumbnail: null
  }
]

export function ContentLibrary() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4 text-blue-500" />
      case 'interactive': return <Code className="h-4 w-4 text-purple-500" />
      case 'document': return <FileText className="h-4 w-4 text-green-500" />
      case 'image': return <Image className="h-4 w-4 text-orange-500" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': 
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'draft': 
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
      default: 
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600'
      case 'intermediate': return 'text-yellow-600'
      case 'advanced': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  // Filter and sort content
  const filteredContent = MOCK_CONTENT_LIBRARY.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesType = filterType === 'all' || content.type === filterType
    const matchesStatus = filterStatus === 'all' || content.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      case 'views':
        return b.views - a.views
      case 'rating':
        return (b.rating || 0) - (a.rating || 0)
      case 'title':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Content Library</h2>
          <p className="text-muted-foreground">
            Manage and organize all your teaching content
          </p>
        </div>
        <Button>
          <Play className="h-4 w-4 mr-2" />
          Upload Content
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search content, tags, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="interactive">Interactive</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="views">Views</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((content) => (
          <Card key={content.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(content.type)}
                  <Badge className={getStatusColor(content.status)}>
                    {content.status}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <CardTitle className="text-lg line-clamp-2">
                {content.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {content.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {content.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {content.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{content.tags.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{content.views}</span>
                  </div>
                  {content.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span>{content.rating}</span>
                      <span className="text-xs">({content.ratingCount})</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-medium ${getDifficultyColor(content.difficulty)}`}>
                    {content.difficulty}
                  </span>
                  {content.duration && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">{content.duration}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredContent.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No content found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || filterType !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Start by uploading your first piece of content'
              }
            </p>
            {(!searchQuery && filterType === 'all' && filterStatus === 'all') && (
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Upload Content
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}