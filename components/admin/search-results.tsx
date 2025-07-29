'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  BookOpen, 
  MessageSquare, 
  Activity, 
  FileText, 
  Calendar,
  MapPin,
  Eye,
  MoreHorizontal,
  Clock
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { SearchResult, SearchableEntity } from '@/lib/search/advanced-search'

interface SearchResultsProps {
  results: SearchResult<SearchableEntity>
  entityType: string
  onItemClick?: (item: SearchableEntity) => void
  onLoadMore?: () => void
  isLoading?: boolean
}

export function SearchResults({
  results,
  entityType,
  onItemClick,
  onLoadMore,
  isLoading = false
}: SearchResultsProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User className="h-4 w-4" />
      case 'course':
        return <BookOpen className="h-4 w-4" />
      case 'discussion':
        return <MessageSquare className="h-4 w-4" />
      case 'activity':
        return <Activity className="h-4 w-4" />
      case 'content':
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const renderUserResult = (item: SearchableEntity) => (
    <div className="flex items-start space-x-3">
      <Avatar className="h-10 w-10">
        <AvatarFallback>
          {item.title?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {item.title}
          </h3>
          <Badge variant={item.metadata?.status === 'active' ? 'default' : 'secondary'}>
            {item.metadata?.status || 'unknown'}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {item.content}
        </p>
        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            Joined {formatDistanceToNow(item.createdAt, { addSuffix: true })}
          </span>
          {item.metadata?.role && (
            <Badge variant="outline" className="text-xs">
              {item.metadata.role}
            </Badge>
          )}
        </div>
      </div>
    </div>
  )

  const renderCourseResult = (item: SearchableEntity) => (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {item.description}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {item.metadata?.difficulty && (
            <Badge variant={
              item.metadata.difficulty === 'advanced' ? 'destructive' :
              item.metadata.difficulty === 'intermediate' ? 'default' : 'secondary'
            }>
              {item.metadata.difficulty}
            </Badge>
          )}
          {item.metadata?.enrolled && (
            <Badge variant="outline">
              {item.metadata.enrolled} enrolled
            </Badge>
          )}
        </div>
      </div>
      
      {expandedItems.has(item.id) && item.content && (
        <div className="text-sm text-muted-foreground border-l-2 border-muted pl-3">
          {item.content}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {item.metadata?.duration || 'Self-paced'}
          </span>
          <span>
            Updated {formatDistanceToNow(item.updatedAt, { addSuffix: true })}
          </span>
        </div>
        {item.content && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleExpanded(item.id)}
          >
            {expandedItems.has(item.id) ? 'Show less' : 'Show more'}
          </Button>
        )}
      </div>

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )

  const renderDiscussionResult = (item: SearchableEntity) => (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {item.content}
          </p>
        </div>
        {item.metadata?.category && (
          <Badge variant="outline">
            {item.metadata.category}
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          {item.metadata?.replies && (
            <span>{item.metadata.replies} replies</span>
          )}
          {item.metadata?.likes && (
            <span>{item.metadata.likes} likes</span>
          )}
          <span>
            {formatDistanceToNow(item.createdAt, { addSuffix: true })}
          </span>
        </div>
      </div>

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )

  const renderGenericResult = (item: SearchableEntity) => (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">
            {item.title || `${item.type} #${item.id}`}
          </h3>
          {(item.description || item.content) && (
            <p className="text-sm text-muted-foreground mt-1">
              {item.description || item.content}
            </p>
          )}
        </div>
        <Badge variant="outline" className="capitalize">
          {item.type}
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span>
            Created {formatDistanceToNow(item.createdAt, { addSuffix: true })}
          </span>
          <span>
            Updated {formatDistanceToNow(item.updatedAt, { addSuffix: true })}
          </span>
        </div>
      </div>

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )

  const renderResultContent = (item: SearchableEntity) => {
    switch (item.type) {
      case 'user':
        return renderUserResult(item)
      case 'course':
        return renderCourseResult(item)
      case 'discussion':
        return renderDiscussionResult(item)
      default:
        return renderGenericResult(item)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 bg-muted rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-1/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (results.data.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
              <Eye className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          {getEntityIcon(entityType)}
          <span>
            {results.total} result{results.total !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {results.data.map((item) => (
          <Card 
            key={item.id} 
            className={`transition-all hover:shadow-md ${
              onItemClick ? 'cursor-pointer' : ''
            }`}
            onClick={() => onItemClick?.(item)}
          >
            <CardContent className="p-4">
              {renderResultContent(item)}
            </CardContent>
          </Card>
        ))}
      </div>

      {results.hasMore && (
        <>
          <Separator />
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={onLoadMore}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load more results'}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}