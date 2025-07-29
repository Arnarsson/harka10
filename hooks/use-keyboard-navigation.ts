'use client'

import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  action: () => void
  description?: string
}

export function useKeyboardNavigation(shortcuts: KeyboardShortcut[]) {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    shortcuts.forEach(shortcut => {
      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase()
      const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : true
      const shiftMatch = shortcut.shift ? event.shiftKey : true
      const altMatch = shortcut.alt ? event.altKey : true

      if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
        event.preventDefault()
        shortcut.action()
      }
    })
  }, [shortcuts])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])
}

// Global keyboard navigation shortcuts
export function useGlobalKeyboardShortcuts() {
  const router = useRouter()

  const globalShortcuts: KeyboardShortcut[] = [
    // Navigation
    { key: 'h', ctrl: true, action: () => router.push('/'), description: 'Go to Home' },
    { key: 'd', ctrl: true, action: () => router.push('/dashboard'), description: 'Go to Dashboard' },
    { key: 'c', ctrl: true, action: () => router.push('/courses'), description: 'Go to Courses' },
    { key: 'p', ctrl: true, action: () => router.push('/certificates'), description: 'Go to Certificates' },
    
    // UI Actions
    { key: '/', ctrl: true, action: () => focusSearch(), description: 'Focus Search' },
    { key: 'Escape', action: () => closeModals(), description: 'Close Modal' },
    { key: '?', shift: true, action: () => showKeyboardHelp(), description: 'Show Keyboard Shortcuts' },
  ]

  useKeyboardNavigation(globalShortcuts)

  return globalShortcuts
}

function focusSearch() {
  const searchInput = document.querySelector('input[type="search"], input[placeholder*="Search"]') as HTMLInputElement
  if (searchInput) {
    searchInput.focus()
    searchInput.select()
  }
}

function closeModals() {
  // Close any open modals by clicking the backdrop or close button
  const backdrop = document.querySelector('[data-backdrop], [data-overlay]') as HTMLElement
  const closeButton = document.querySelector('[aria-label="Close"], [data-close]') as HTMLElement
  
  if (backdrop) backdrop.click()
  else if (closeButton) closeButton.click()
}

function showKeyboardHelp() {
  // This would typically open a modal showing all keyboard shortcuts
  console.log('Keyboard shortcuts help requested')
}

// Focus trap for modals and dialogs
export function useFocusTrap(isActive: boolean) {
  useEffect(() => {
    if (!isActive) return

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const focusableElements = document.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      
      const focusableArray = Array.from(focusableElements)
      const firstElement = focusableArray[0] as HTMLElement
      const lastElement = focusableArray[focusableArray.length - 1] as HTMLElement

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isActive])
}

// Arrow key navigation for lists
export function useArrowKeyNavigation(
  items: HTMLElement[],
  onSelect?: (index: number) => void
) {
  useEffect(() => {
    let currentIndex = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          currentIndex = Math.min(currentIndex + 1, items.length - 1)
          items[currentIndex]?.focus()
          break
        case 'ArrowUp':
          e.preventDefault()
          currentIndex = Math.max(currentIndex - 1, 0)
          items[currentIndex]?.focus()
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (onSelect) onSelect(currentIndex)
          break
        case 'Home':
          e.preventDefault()
          currentIndex = 0
          items[currentIndex]?.focus()
          break
        case 'End':
          e.preventDefault()
          currentIndex = items.length - 1
          items[currentIndex]?.focus()
          break
      }
    }

    items.forEach(item => {
      item.addEventListener('keydown', handleKeyDown)
    })

    return () => {
      items.forEach(item => {
        item.removeEventListener('keydown', handleKeyDown)
      })
    }
  }, [items, onSelect])
}