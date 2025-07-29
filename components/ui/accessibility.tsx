'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// Screen Reader Only Text
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">{children}</span>
  )
}

// Skip to Content Link
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white px-4 py-2 rounded-md shadow-lg z-50 text-blue-600 font-medium"
    >
      Skip to main content
    </a>
  )
}

// Live Region for dynamic announcements
interface LiveRegionProps {
  message: string
  politeness?: 'polite' | 'assertive'
  atomic?: boolean
  className?: string
}

export function LiveRegion({ 
  message, 
  politeness = 'polite',
  atomic = true,
  className 
}: LiveRegionProps) {
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic={atomic}
      className={cn("sr-only", className)}
    >
      {message}
    </div>
  )
}

// Announce component for screen readers
export function useAnnounce() {
  const [announcement, setAnnouncement] = useState('')

  const announce = (message: string, delay = 100) => {
    setTimeout(() => {
      setAnnouncement(message)
      // Clear after announcement
      setTimeout(() => setAnnouncement(''), 1000)
    }, delay)
  }

  return {
    announcement,
    announce,
    AnnounceRegion: () => <LiveRegion message={announcement} politeness="assertive" />
  }
}

// Focus Management
export function FocusGuard() {
  return (
    <div
      tabIndex={0}
      onFocus={(e) => {
        const target = e.relatedTarget as HTMLElement
        if (target) {
          target.focus()
        }
      }}
      aria-hidden="true"
    />
  )
}

// High Contrast Mode Hook and Provider
interface HighContrastContextValue {
  isHighContrast: boolean
  toggleHighContrast: () => void
}

const HighContrastContext = React.createContext<HighContrastContextValue | null>(null)

export function HighContrastProvider({ children }: { children: React.ReactNode }) {
  const [isHighContrast, setIsHighContrast] = useState(false)

  useEffect(() => {
    // Check localStorage and system preference
    const stored = localStorage.getItem('highContrast')
    const systemPreference = window.matchMedia('(prefers-contrast: high)').matches
    
    setIsHighContrast(stored === 'true' || (!stored && systemPreference))
  }, [])

  useEffect(() => {
    // Apply high contrast class to document
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
    
    localStorage.setItem('highContrast', String(isHighContrast))
  }, [isHighContrast])

  const toggleHighContrast = () => setIsHighContrast(!isHighContrast)

  return (
    <HighContrastContext.Provider value={{ isHighContrast, toggleHighContrast }}>
      {children}
    </HighContrastContext.Provider>
  )
}

export function useHighContrast() {
  const context = React.useContext(HighContrastContext)
  if (!context) {
    throw new Error('useHighContrast must be used within HighContrastProvider')
  }
  return context
}

// Accessible Loading Indicator
interface AccessibleLoadingProps {
  isLoading: boolean
  loadingText?: string
  children: React.ReactNode
}

export function AccessibleLoading({ 
  isLoading, 
  loadingText = 'Loading...',
  children 
}: AccessibleLoadingProps) {
  const { announce, AnnounceRegion } = useAnnounce()

  useEffect(() => {
    if (isLoading) {
      announce(loadingText)
    } else {
      announce('Content loaded')
    }
  }, [isLoading, loadingText, announce])

  return (
    <>
      <AnnounceRegion />
      <div aria-busy={isLoading} aria-live="polite">
        {children}
      </div>
    </>
  )
}

// Accessible Progress Bar
interface AccessibleProgressProps {
  value: number
  max?: number
  label: string
  showVisualProgress?: boolean
  className?: string
}

export function AccessibleProgress({
  value,
  max = 100,
  label,
  showVisualProgress = true,
  className
}: AccessibleProgressProps) {
  const percentage = Math.round((value / max) * 100)

  return (
    <div className={className}>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-gray-600">{percentage}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${label}: ${percentage}% complete`}
        className="w-full bg-gray-200 rounded-full h-2.5"
      >
        {showVisualProgress && (
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
      <ScreenReaderOnly>
        {percentage}% complete
      </ScreenReaderOnly>
    </div>
  )
}

// Focus Visible Enhancement
export function FocusRing({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn(
      "focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 rounded-md",
      className
    )}>
      {children}
    </div>
  )
}

// Reduced Motion Hook
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}