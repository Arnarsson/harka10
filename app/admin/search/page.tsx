'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { AdvancedSearch } from '@/components/admin/advanced-search'
import { SearchResults } from '@/components/admin/search-results'
import { SearchResult, SearchableEntity } from '@/lib/search/advanced-search'
import { Users, BookOpen, MessageSquare, Activity, FileText, TrendingUp } from 'lucide-react'

const searchConfigs = {
  users: {
    icon: Users,
    label: 'Users',
    placeholder: 'Search users by name, email, or role...',
    filters: [
      {
        field: 'metadata.role',
        label: 'Role',
        type: 'select' as const,
        options: [
          { value: 'admin', label: 'Admin' },
          { value: 'instructor', label: 'Instructor' },
          { value: 'student', label: 'Student' },
          { value: 'user', label: 'User' }
        ]
      },
      {
        field: 'metadata.status',
        label: 'Status',
        type: 'select' as const,
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
          { value: 'suspended', label: 'Suspended' }
        ]
      },
      {
        field: 'title',
        label: 'Name',
        type: 'text' as const
      },
      {
        field: 'content',
        label: 'Description',
        type: 'text' as const
      }
    ],
    sortOptions: [
      { field: 'title', label: 'Name' },
      { field: 'createdAt', label: 'Join Date' },
      { field: 'updatedAt', label: 'Last Active' },
      { field: 'metadata.role', label: 'Role' }
    ]
  },
  courses: {
    icon: BookOpen,
    label: 'Courses',
    placeholder: 'Search courses by title, description, or tags...',
    filters: [
      {
        field: 'metadata.difficulty',
        label: 'Difficulty',
        type: 'select' as const,
        options: [
          { value: 'beginner', label: 'Beginner' },
          { value: 'intermediate', label: 'Intermediate' },
          { value: 'advanced', label: 'Advanced' }
        ]
      },
      {
        field: 'title',
        label: 'Title',
        type: 'text' as const
      },
      {
        field: 'description',
        label: 'Description',
        type: 'text' as const
      },
      {
        field: 'metadata.enrolled',
        label: 'Enrollment Count',
        type: 'number' as const
      }
    ],
    sortOptions: [
      { field: 'title', label: 'Title' },
      { field: 'createdAt', label: 'Created Date' },
      { field: 'updatedAt', label: 'Last Updated' },
      { field: 'metadata.enrolled', label: 'Enrollment' },
      { field: 'metadata.difficulty', label: 'Difficulty' }
    ]
  },
  discussions: {
    icon: MessageSquare,
    label: 'Discussions',
    placeholder: 'Search discussions by title, content, or tags...',
    filters: [
      {
        field: 'metadata.category',
        label: 'Category',
        type: 'select' as const,
        options: [
          { value: 'technical', label: 'Technical' },
          { value: 'general', label: 'General' },
          { value: 'feedback', label: 'Feedback' },
          { value: 'support', label: 'Support' }
        ]
      },
      {
        field: 'title',
        label: 'Title',
        type: 'text' as const
      },
      {
        field: 'content',
        label: 'Content',
        type: 'text' as const
      },
      {
        field: 'metadata.replies',
        label: 'Reply Count',
        type: 'number' as const
      }
    ],
    sortOptions: [
      { field: 'title', label: 'Title' },
      { field: 'createdAt', label: 'Created Date' },
      { field: 'updatedAt', label: 'Last Updated' },
      { field: 'metadata.replies', label: 'Replies' },
      { field: 'metadata.likes', label: 'Likes' }
    ]
  },
  activities: {
    icon: Activity,
    label: 'Activities',
    placeholder: 'Search activities by type, user, or description...',
    filters: [
      {
        field: 'metadata.type',
        label: 'Activity Type',
        type: 'select' as const,
        options: [
          { value: 'login', label: 'Login' },
          { value: 'logout', label: 'Logout' },
          { value: 'course_start', label: 'Course Started' },
          { value: 'course_complete', label: 'Course Completed' },
          { value: 'discussion_post', label: 'Discussion Post' }
        ]
      },
      {
        field: 'title',
        label: 'Title',
        type: 'text' as const
      },
      {
        field: 'content',
        label: 'Description',
        type: 'text' as const
      }
    ],
    sortOptions: [
      { field: 'createdAt', label: 'Date' },
      { field: 'title', label: 'Title' },
      { field: 'metadata.type', label: 'Type' }
    ]
  },
  content: {
    icon: FileText,
    label: 'Content',
    placeholder: 'Search content by title, description, or type...',
    filters: [
      {
        field: 'metadata.type',
        label: 'Content Type',
        type: 'select' as const,
        options: [
          { value: 'document', label: 'Document' },
          { value: 'video', label: 'Video' },
          { value: 'image', label: 'Image' },
          { value: 'audio', label: 'Audio' }
        ]
      },
      {
        field: 'title',
        label: 'Title',
        type: 'text' as const
      },
      {
        field: 'description',
        label: 'Description',
        type: 'text' as const
      }
    ],
    sortOptions: [
      { field: 'title', label: 'Title' },
      { field: 'createdAt', label: 'Created Date' },
      { field: 'updatedAt', label: 'Last Updated' },
      { field: 'metadata.type', label: 'Type' }
    ]
  }
}

export default function AdminSearchPage() {
  const [activeTab, setActiveTab] = useState('users')
  const [searchResults, setSearchResults] = useState<Record<string, SearchResult<SearchableEntity>>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSearchResults = useCallback((entityType: string) => 
    (results: SearchResult<SearchableEntity>) => {
      setSearchResults(prev => ({ ...prev, [entityType]: results }))
      setIsLoading(false)
    }, []
  )

  const handleItemClick = (item: SearchableEntity) => {
    console.log('Item clicked:', item)
    // Navigate to item detail page or open modal
  }

  const getTotalResults = () => {
    return Object.values(searchResults).reduce((total, result) => total + result.total, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Advanced Search</h1>
          <p className="text-muted-foreground">
            Search across all admin content with advanced filtering and sorting
          </p>
        </div>
        {getTotalResults() > 0 && (
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{getTotalResults()} total results</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          {Object.entries(searchConfigs).map(([key, config]) => {
            const Icon = config.icon
            const resultCount = searchResults[key]?.total || 0
            
            return (
              <TabsTrigger key={key} value={key} className="flex items-center space-x-2">
                <Icon className="h-4 w-4" />
                <span>{config.label}</span>
                {resultCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {resultCount}
                  </Badge>
                )}
              </TabsTrigger>
            )
          })}
        </TabsList>

        {Object.entries(searchConfigs).map(([key, config]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <config.icon className="h-5 w-5" />
                  <span>Search {config.label}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AdvancedSearch
                  entityType={key}
                  onResults={handleSearchResults(key)}
                  placeholder={config.placeholder}
                  filters={config.filters}
                  sortOptions={config.sortOptions}
                />
              </CardContent>
            </Card>

            {searchResults[key] && (
              <SearchResults
                results={searchResults[key]}
                entityType={key}
                onItemClick={handleItemClick}
                isLoading={isLoading}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}