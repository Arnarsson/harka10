export interface SearchFilter {
  field: string
  operator: 'equals' | 'contains' | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than' | 'between' | 'in'
  value: any
}

export interface SearchSort {
  field: string
  direction: 'asc' | 'desc'
}

export interface SearchOptions {
  query?: string
  filters?: SearchFilter[]
  sort?: SearchSort[]
  limit?: number
  offset?: number
  includeFields?: string[]
  excludeFields?: string[]
}

export interface SearchResult<T> {
  data: T[]
  total: number
  hasMore: boolean
  facets?: Record<string, Array<{ value: string; count: number }>>
}

export interface SearchableEntity {
  id: string
  type: 'user' | 'course' | 'lesson' | 'discussion' | 'comment' | 'activity' | 'content'
  title?: string
  content?: string
  description?: string
  tags?: string[]
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

class AdvancedSearchService {
  private searchableData: Map<string, SearchableEntity[]> = new Map()

  constructor() {
    this.initializeSearchData()
  }

  private initializeSearchData() {
    // Initialize with mock data for different entity types
    this.searchableData.set('users', [
      {
        id: '1',
        type: 'user',
        title: 'John Doe',
        content: 'Senior Software Engineer with expertise in React and TypeScript',
        tags: ['developer', 'senior', 'active'],
        metadata: { role: 'admin', status: 'active', joinDate: '2023-01-15' },
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2024-01-20')
      },
      {
        id: '2',
        type: 'user',
        title: 'Jane Smith',
        content: 'Product Manager specializing in educational technology',
        tags: ['manager', 'education', 'active'],
        metadata: { role: 'user', status: 'active', joinDate: '2023-03-10' },
        createdAt: new Date('2023-03-10'),
        updatedAt: new Date('2024-01-18')
      }
    ])

    this.searchableData.set('courses', [
      {
        id: '1',
        type: 'course',
        title: 'Advanced TypeScript Patterns',
        description: 'Learn advanced TypeScript patterns and best practices for scalable applications',
        content: 'Complete course covering generics, decorators, advanced types, and more',
        tags: ['typescript', 'advanced', 'programming'],
        metadata: { difficulty: 'advanced', duration: '8 weeks', enrolled: 245 },
        createdAt: new Date('2023-06-01'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        type: 'course',
        title: 'React Performance Optimization',
        description: 'Master React performance optimization techniques',
        content: 'Deep dive into React rendering, memoization, code splitting, and performance monitoring',
        tags: ['react', 'performance', 'optimization'],
        metadata: { difficulty: 'intermediate', duration: '6 weeks', enrolled: 189 },
        createdAt: new Date('2023-07-15'),
        updatedAt: new Date('2024-01-10')
      }
    ])

    this.searchableData.set('discussions', [
      {
        id: '1',
        type: 'discussion',
        title: 'Best practices for state management',
        content: 'What are the current best practices for managing complex application state?',
        tags: ['state-management', 'architecture', 'question'],
        metadata: { author: 'user_123', replies: 12, likes: 8, category: 'technical' },
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-20')
      }
    ])
  }

  async search<T = SearchableEntity>(
    entityType: string,
    options: SearchOptions = {}
  ): Promise<SearchResult<T>> {
    const { query, filters = [], sort = [], limit = 20, offset = 0 } = options
    const entities = this.searchableData.get(entityType) || []

    let results = [...entities]

    // Apply text search
    if (query) {
      const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0)
      results = results.filter(entity => {
        const searchableText = [
          entity.title,
          entity.content,
          entity.description,
          ...(entity.tags || [])
        ].join(' ').toLowerCase()

        return searchTerms.every(term => searchableText.includes(term))
      })
    }

    // Apply filters
    results = results.filter(entity => {
      return filters.every(filter => this.applyFilter(entity, filter))
    })

    // Apply sorting
    if (sort.length > 0) {
      results.sort((a, b) => {
        for (const sortRule of sort) {
          const aValue = this.getFieldValue(a, sortRule.field)
          const bValue = this.getFieldValue(b, sortRule.field)
          
          if (aValue === bValue) continue
          
          const comparison = aValue < bValue ? -1 : 1
          return sortRule.direction === 'desc' ? -comparison : comparison
        }
        return 0
      })
    }

    // Calculate total before pagination
    const total = results.length

    // Apply pagination
    const paginatedResults = results.slice(offset, offset + limit)

    // Generate facets
    const facets = this.generateFacets(results, entityType)

    return {
      data: paginatedResults as T[],
      total,
      hasMore: offset + limit < total,
      facets
    }
  }

  private applyFilter(entity: SearchableEntity, filter: SearchFilter): boolean {
    const value = this.getFieldValue(entity, filter.field)
    
    switch (filter.operator) {
      case 'equals':
        return value === filter.value
      case 'contains':
        return String(value).toLowerCase().includes(String(filter.value).toLowerCase())
      case 'starts_with':
        return String(value).toLowerCase().startsWith(String(filter.value).toLowerCase())
      case 'ends_with':
        return String(value).toLowerCase().endsWith(String(filter.value).toLowerCase())
      case 'greater_than':
        return value > filter.value
      case 'less_than':
        return value < filter.value
      case 'between':
        return value >= filter.value[0] && value <= filter.value[1]
      case 'in':
        return Array.isArray(filter.value) && filter.value.includes(value)
      default:
        return true
    }
  }

  private getFieldValue(entity: SearchableEntity, field: string): any {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      return (entity as any)[parent]?.[child]
    }
    return (entity as any)[field]
  }

  private generateFacets(results: SearchableEntity[], entityType: string): Record<string, Array<{ value: string; count: number }>> {
    const facets: Record<string, Record<string, number>> = {}

    // Generate facets based on entity type
    switch (entityType) {
      case 'users':
        facets.role = {}
        facets.status = {}
        break
      case 'courses':
        facets.difficulty = {}
        facets.tags = {}
        break
      case 'discussions':
        facets.category = {}
        facets.tags = {}
        break
    }

    // Count occurrences
    results.forEach(entity => {
      Object.keys(facets).forEach(facetKey => {
        let values: string[] = []
        
        if (facetKey === 'tags' && entity.tags) {
          values = entity.tags
        } else if (entity.metadata?.[facetKey]) {
          values = [String(entity.metadata[facetKey])]
        }

        values.forEach(value => {
          facets[facetKey][value] = (facets[facetKey][value] || 0) + 1
        })
      })
    })

    // Convert to expected format
    const formattedFacets: Record<string, Array<{ value: string; count: number }>> = {}
    Object.entries(facets).forEach(([key, counts]) => {
      formattedFacets[key] = Object.entries(counts)
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count)
    })

    return formattedFacets
  }

  async addToIndex(entityType: string, entity: SearchableEntity): Promise<void> {
    const entities = this.searchableData.get(entityType) || []
    const existingIndex = entities.findIndex(e => e.id === entity.id)
    
    if (existingIndex >= 0) {
      entities[existingIndex] = entity
    } else {
      entities.push(entity)
    }
    
    this.searchableData.set(entityType, entities)
  }

  async removeFromIndex(entityType: string, entityId: string): Promise<void> {
    const entities = this.searchableData.get(entityType) || []
    const filteredEntities = entities.filter(e => e.id !== entityId)
    this.searchableData.set(entityType, filteredEntities)
  }

  async getSearchSuggestions(entityType: string, query: string, limit = 5): Promise<string[]> {
    const entities = this.searchableData.get(entityType) || []
    const suggestions = new Set<string>()

    entities.forEach(entity => {
      const words = [
        entity.title,
        entity.content,
        entity.description,
        ...(entity.tags || [])
      ].join(' ').toLowerCase().split(/\s+/)

      words.forEach(word => {
        if (word.includes(query.toLowerCase()) && word.length > 2) {
          suggestions.add(word)
        }
      })
    })

    return Array.from(suggestions).slice(0, limit)
  }
}

export const advancedSearchService = new AdvancedSearchService()