"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, getTranslations, Translations } from './translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('da')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load language from localStorage
    const savedLang = localStorage.getItem('harka-language') as Language
    if (savedLang && (savedLang === 'da' || savedLang === 'en')) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('harka-language', lang)
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }))
  }

  const t = getTranslations(language)

  if (!mounted) {
    // Return a minimal provider to avoid hydration mismatch
    return (
      <LanguageContext.Provider value={{
        language: 'da',
        setLanguage: () => {},
        t: getTranslations('da')
      }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function useTranslations() {
  const { t } = useLanguage()
  return t
}