"use client"

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

interface AnalyticsEvent {
  event: string
  page: string
  user_id?: string
  timestamp: string
  properties?: Record<string, any>
}

export function AnalyticsTracker() {
  const pathname = usePathname()
  const { user } = useUser()

  const trackEvent = (event: string, properties?: Record<string, any>) => {
    const analyticsEvent: AnalyticsEvent = {
      event,
      page: pathname,
      user_id: user?.id,
      timestamp: new Date().toISOString(),
      properties
    }

    // In a real implementation, you would send this to your analytics service
    console.log('Analytics Event:', analyticsEvent)
    
    // For now, store in localStorage for demo purposes
    const existingEvents = JSON.parse(localStorage.getItem('harka-analytics') || '[]')
    existingEvents.push(analyticsEvent)
    localStorage.setItem('harka-analytics', JSON.stringify(existingEvents.slice(-100))) // Keep last 100 events
  }

  const trackPageView = () => {
    trackEvent('page_view', {
      path: pathname,
      referrer: document.referrer,
      user_agent: navigator.userAgent
    })
  }

  const trackCTAClick = (ctaType: string, ctaText: string) => {
    trackEvent('cta_click', {
      cta_type: ctaType,
      cta_text: ctaText,
      page: pathname
    })
  }

  const trackVideoPlay = (videoTitle: string, source: string) => {
    trackEvent('video_play', {
      video_title: videoTitle,
      video_source: source,
      page: pathname
    })
  }

  const trackModuleComplete = (moduleId: string, completionRate: number) => {
    trackEvent('module_complete', {
      module_id: moduleId,
      completion_rate: completionRate,
      page: pathname
    })
  }

  const trackSearch = (query: string, resultCount: number) => {
    trackEvent('search', {
      query,
      result_count: resultCount,
      page: pathname
    })
  }

  // Track page views
  useEffect(() => {
    trackPageView()
  }, [pathname])

  // Make tracking functions available globally
  useEffect(() => {
    (window as any).harkaAnalytics = {
      trackEvent,
      trackCTAClick,
      trackVideoPlay,
      trackModuleComplete,
      trackSearch
    }
  }, [])

  return null // This component doesn't render anything
}

// Hook to use analytics in components
export function useAnalytics() {
  return {
    trackEvent: (event: string, properties?: Record<string, any>) => {
      if ((window as any).harkaAnalytics) {
        (window as any).harkaAnalytics.trackEvent(event, properties)
      }
    },
    trackCTAClick: (ctaType: string, ctaText: string) => {
      if ((window as any).harkaAnalytics) {
        (window as any).harkaAnalytics.trackCTAClick(ctaType, ctaText)
      }
    },
    trackVideoPlay: (videoTitle: string, source: string) => {
      if ((window as any).harkaAnalytics) {
        (window as any).harkaAnalytics.trackVideoPlay(videoTitle, source)
      }
    },
    trackModuleComplete: (moduleId: string, completionRate: number) => {
      if ((window as any).harkaAnalytics) {
        (window as any).harkaAnalytics.trackModuleComplete(moduleId, completionRate)
      }
    },
    trackSearch: (query: string, resultCount: number) => {
      if ((window as any).harkaAnalytics) {
        (window as any).harkaAnalytics.trackSearch(query, resultCount)
      }
    }
  }
}