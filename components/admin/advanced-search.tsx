'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, Filter, X, Plus, Minus, ChevronDown, SortAsc, SortDesc } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { advancedSearchService, SearchFilter, SearchSort, SearchOptions, SearchResult } from '@/lib/search/advanced-search'

interface AdvancedSearchProps {
  entityType: string
  onResults: (results: SearchResult<any>) => void
  placeholder?: string
  filters?: Array<{
    field: string
    label: string
    type: 'text' | 'select' | 'date' | 'number'
    options?: Array<{ value: string; label: string }>
  }>
  sortOptions?: Array<{
    field: string
    label: string
  }>
}

export function AdvancedSearch({
  entityType,
  onResults,
  placeholder = 'Search...',
  filters = [],
  sortOptions = []
}: AdvancedSearchProps) {
  const [query, setQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<SearchFilter[]>([])
  const [sortRules, setSortRules] = useState<SearchSort[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [facets, setFacets] = useState<Record<string, Array<{ value: string; count: number }>>>({})

  const searchOptions = useMemo((): SearchOptions => ({
    query: query.trim() || undefined,
    filters: activeFilters.length > 0 ? activeFilters : undefined,
    sort: sortRules.length > 0 ? sortRules : undefined,
    limit: 50
  }), [query, activeFilters, sortRules])

  useEffect(() => {
    const performSearch = async () => {
      try {
        const results = await advancedSearchService.search(entityType, searchOptions)
        onResults(results)
        if (results.facets) {
          setFacets(results.facets)
        }
      } catch (error) {
        console.error('Search error:', error)
      }
    }

    performSearch()
  }, [entityType, searchOptions, onResults])

  useEffect(() => {
    const getSuggestions = async () => {
      if (query.length > 1) {
        try {
          const suggestions = await advancedSearchService.getSearchSuggestions(entityType, query)
          setSuggestions(suggestions)
        } catch (error) {
          console.error('Suggestions error:', error)
        }
      } else {
        setSuggestions([])
      }
    }

    const debounceTimer = setTimeout(getSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [query, entityType])

  const addFilter = () => {
    if (filters.length > 0) {
      setActiveFilters([...activeFilters, {
        field: filters[0].field,
        operator: 'contains',
        value: ''
      }])
    }
  }

  const updateFilter = (index: number, updates: Partial<SearchFilter>) => {
    const newFilters = [...activeFilters]
    newFilters[index] = { ...newFilters[index], ...updates }
    setActiveFilters(newFilters)
  }

  const removeFilter = (index: number) => {
    setActiveFilters(activeFilters.filter((_, i) => i !== index))
  }

  const addSort = () => {
    if (sortOptions.length > 0) {
      setSortRules([...sortRules, {
        field: sortOptions[0].field,
        direction: 'asc'
      }])
    }
  }

  const updateSort = (index: number, updates: Partial<SearchSort>) => {
    const newSort = [...sortRules]
    newSort[index] = { ...newSort[index], ...updates }
    setSortRules(newSort)
  }

  const removeSort = (index: number) => {
    setSortRules(sortRules.filter((_, i) => i !== index))
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setSortRules([])
    setQuery('')
  }

  const getOperatorOptions = (fieldType: string) => {
    switch (fieldType) {
      case 'number':
      case 'date':
        return [
          { value: 'equals', label: 'Equals' },
          { value: 'greater_than', label: 'Greater than' },
          { value: 'less_than', label: 'Less than' },
          { value: 'between', label: 'Between' }
        ]
      case 'select':
        return [
          { value: 'equals', label: 'Equals' },
          { value: 'in', label: 'In' }
        ]
      default:
        return [
          { value: 'contains', label: 'Contains' },
          { value: 'equals', label: 'Equals' },
          { value: 'starts_with', label: 'Starts with' },
          { value: 'ends_with', label: 'Ends with' }
        ]
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={placeholder}
            className="pl-10"
          />
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <Card className="absolute top-full left-0 right-0 z-50 mt-1">
            <CardContent className="p-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-muted cursor-pointer text-sm"
                  onClick={() => {
                    setQuery(suggestion)
                    setShowSuggestions(false)
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilters.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilters.length}
            </Badge>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="gap-2"
        >
          <SortAsc className="h-4 w-4" />
          Sort
          {sortRules.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {sortRules.length}
            </Badge>
          )}
        </Button>

        {(activeFilters.length > 0 || sortRules.length > 0 || query) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <CollapsibleContent className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                Active Filters
                <Button variant="ghost" size="sm" onClick={addFilter}>
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeFilters.length === 0 ? (
                <p className="text-sm text-muted-foreground">No filters applied</p>
              ) : (
                activeFilters.map((filter, index) => {
                  const filterConfig = filters.find(f => f.field === filter.field)
                  const operatorOptions = getOperatorOptions(filterConfig?.type || 'text')

                  return (
                    <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                      <Select
                        value={filter.field}
                        onValueChange={(value) => updateFilter(index, { field: value })}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {filters.map((f) => (
                            <SelectItem key={f.field} value={f.field}>
                              {f.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={filter.operator}
                        onValueChange={(value: any) => updateFilter(index, { operator: value })}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {operatorOptions.map((op) => (
                            <SelectItem key={op.value} value={op.value}>
                              {op.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {filterConfig?.type === 'select' ? (
                        <Select
                          value={filter.value}
                          onValueChange={(value) => updateFilter(index, { value })}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Select value" />
                          </SelectTrigger>
                          <SelectContent>
                            {filterConfig.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          value={filter.value}
                          onChange={(e) => updateFilter(index, { value: e.target.value })}
                          placeholder="Enter value"
                          type={filterConfig?.type === 'number' ? 'number' : 'text'}
                          className="flex-1"
                        />
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFilter(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                })
              )}
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={isSortOpen} onOpenChange={setIsSortOpen}>
        <CollapsibleContent className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                Sort Rules
                <Button variant="ghost" size="sm" onClick={addSort}>
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sortRules.length === 0 ? (
                <p className="text-sm text-muted-foreground">No sort rules applied</p>
              ) : (
                sortRules.map((sort, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                    <Select
                      value={sort.field}
                      onValueChange={(value) => updateSort(index, { field: value })}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.field} value={option.field}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSort(index, { 
                        direction: sort.direction === 'asc' ? 'desc' : 'asc' 
                      })}
                      className="gap-2"
                    >
                      {sort.direction === 'asc' ? (
                        <>
                          <SortAsc className="h-4 w-4" />
                          Ascending
                        </>
                      ) : (
                        <>
                          <SortDesc className="h-4 w-4" />
                          Descending
                        </>
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSort(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {Object.keys(facets).length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Search Facets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(facets).map(([facetKey, facetValues]) => (
                <div key={facetKey} className="space-y-2">
                  <Label className="text-xs font-medium capitalize">{facetKey}</Label>
                  <div className="space-y-1">
                    {facetValues.slice(0, 5).map((facet) => (
                      <div key={facet.value} className="flex items-center justify-between text-xs">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-1 justify-start text-left"
                          onClick={() => {
                            const existingFilter = activeFilters.find(f => 
                              f.field === `metadata.${facetKey}` && f.value === facet.value
                            )
                            if (!existingFilter) {
                              setActiveFilters([...activeFilters, {
                                field: `metadata.${facetKey}`,
                                operator: 'equals',
                                value: facet.value
                              }])
                            }
                          }}
                        >
                          {facet.value}
                        </Button>
                        <Badge variant="secondary" className="text-xs">
                          {facet.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}