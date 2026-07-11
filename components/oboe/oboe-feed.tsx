"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowUpRight, Link as LinkIcon, Search, Tag, Timer, X } from 'lucide-react'

type ContentItem = {
  id: string
  title: string
  description?: string | null
  content_url?: string | null
  tags?: string[] | null
  created_at: string
}

function timeAgo(dateStr: string) {
  const then = new Date(dateStr).getTime()
  const now = Date.now()
  const diff = Math.max(0, Math.floor((now - then) / 1000))
  if (diff < 60) return `${diff}s`
  if (diff < 3600) return `${Math.floor(diff / 60)}m`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`
  const d = Math.floor(diff / 86400)
  return `${d}d`
}

function domainFromUrl(url?: string | null) {
  if (!url) return ''
  try {
    const { hostname } = new URL(url)
    return hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

function classNames(...xs: (string | false | null | undefined)[]) {
  return xs.filter(Boolean).join(' ')
}

export default function OboeFeed({ initialItems, initialQuery, initialTag, pageSize = 30 }: {
  initialItems: ContentItem[]
  initialQuery?: string
  initialTag?: string
  pageSize?: number
}) {
  const [items, setItems] = useState<ContentItem[]>(initialItems)
  const [loadingMore, setLoadingMore] = useState(false)
  const [query, setQuery] = useState(initialQuery || '')
  const [activeTag, setActiveTag] = useState(initialTag || '')
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const listRef = useRef<HTMLDivElement>(null)

  const allTags = useMemo(() => {
    const s = new Set<string>()
    for (const it of items) (it.tags || []).forEach(t => s.add(t))
    return Array.from(s).sort()
  }, [items])

  const filtered = useMemo(() => {
    return items.filter(it => {
      const matchesTag = !activeTag || (it.tags || []).includes(activeTag)
      if (!matchesTag) return false
      if (!query) return true
      const q = query.toLowerCase()
      return (
        it.title?.toLowerCase().includes(q) ||
        (it.description || '').toLowerCase().includes(q) ||
        domainFromUrl(it.content_url).toLowerCase().includes(q)
      )
    })
  }, [items, activeTag, query])

  const fetchMore = useCallback(async () => {
    if (loadingMore || items.length === 0) return
    setLoadingMore(true)
    try {
      const cursor = items[items.length - 1]?.created_at
      const p = new URLSearchParams()
      p.set('limit', String(pageSize))
      if (cursor) p.set('before', cursor)
      if (activeTag) p.set('tag', activeTag)
      if (query) p.set('q', query)
      const res = await fetch(`/api/oboe?${p.toString()}`)
      if (res.ok) {
        const { items: next } = await res.json()
        if (Array.isArray(next) && next.length) {
          setItems(prev => [...prev, ...next])
        }
      }
    } catch { /* noop */ } finally {
      setLoadingMore(false)
    }
  }, [loadingMore, items, pageSize, activeTag, query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Help: s: search, t: clear tag, j/k navigate, Enter open, / focus
      if (e.key === 's' || e.key === '/') {
        e.preventDefault()
        const el = document.getElementById('oboe-search') as HTMLInputElement | null
        el?.focus()
        return
      }
      if (e.key === 't' && (e.ctrlKey || e.altKey || !e.metaKey)) {
        // Alt/ctrl-t toggles tag clear
        e.preventDefault()
        setActiveTag(prev => (prev ? '' : (allTags[0] || '')))
        return
      }
      if (['j', 'ArrowDown'].includes(e.key)) {
        e.preventDefault()
        setSelectedIndex(i => Math.min(filtered.length - 1, i + 1))
        return
      }
      if (['k', 'ArrowUp'].includes(e.key)) {
        e.preventDefault()
        setSelectedIndex(i => Math.max(0, i - 1))
        return
      }
      if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < filtered.length) {
        e.preventDefault()
        const it = filtered[selectedIndex]
        const href = it.content_url || `#${it.id}`
        window.open(href, '_blank', 'noopener')
        return
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [filtered, selectedIndex, allTags])

  // Reset selection when filters change
  useEffect(() => {
    setSelectedIndex(-1)
  }, [query, activeTag])

  // When reaching bottom, auto-load more
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        fetchMore()
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [fetchMore])

  const clearQuery = useCallback(() => setQuery(''), [])

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            id="oboe-search"
            placeholder="Search notes, links, domains… (s)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
          {query && (
            <button aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600" onClick={clearQuery}>
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="hidden sm:flex gap-2">
          <Button variant={activeTag ? 'outline' : 'secondary'} size="sm" onClick={() => setActiveTag('')}>
            <Tag className="w-3 h-3 mr-1" /> All
          </Button>
        </div>
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {allTags.map(t => (
            <Badge key={t} variant={t === activeTag ? 'default' : 'secondary'} className="cursor-pointer" onClick={() => setActiveTag(t === activeTag ? '' : t)}>
              {t}
            </Badge>
          ))}
        </div>
      )}

      <div ref={listRef} className="divide-y divide-neutral-200">
        {filtered.length === 0 && (
          <div className="text-sm text-neutral-500 px-2 py-6">No items yet.</div>
        )}
        {filtered.map((it, idx) => {
          const selected = idx === selectedIndex
          const href = it.content_url || undefined
          return (
            <a
              key={it.id}
              href={href}
              target={href ? '_blank' : undefined}
              rel={href ? 'noopener' : undefined}
              className={
                classNames(
                  'block group px-2 py-3 transition-colors',
                  selected && 'bg-neutral-50'
                )
              }
              onMouseEnter={() => setSelectedIndex(idx)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {href ? (
                      <span className="inline-flex items-center text-[11px] uppercase tracking-wide text-neutral-400">
                        <LinkIcon className="w-3 h-3 mr-1" /> {domainFromUrl(href)}
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[11px] uppercase tracking-wide text-neutral-400">
                        <Timer className="w-3 h-3 mr-1" /> Note
                      </span>
                    )}
                    <span className="text-[11px] text-neutral-400">• {timeAgo(it.created_at)}</span>
                  </div>
                  <h3 className="text-[15px] font-medium leading-tight mt-1 mb-1 pr-2">
                    {it.title}
                    {href && (
                      <ArrowUpRight className="inline-block w-4 h-4 ml-1 text-neutral-400 group-hover:text-neutral-600 align-[-2px]" />
                    )}
                  </h3>
                  {!!it.description && (
                    <p className="text-[13px] text-neutral-600 line-clamp-3">{it.description}</p>
                  )}
                  {!!(it.tags && it.tags.length > 0) && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {it.tags!.map(t => (
                        <Badge key={t} variant="outline" className="text-[11px]" onClick={(e) => { e.preventDefault(); setActiveTag(t) }}>
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </a>
          )
        })}
      </div>

      <div className="flex justify-center py-6">
        <Button variant="outline" onClick={fetchMore} disabled={loadingMore}>
          {loadingMore ? 'Loading…' : 'Load more'}
        </Button>
      </div>
    </div>
  )
}

