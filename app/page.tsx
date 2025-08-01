"use client"

import { useState, useEffect } from "react"
import { HarkaHero } from "@/components/landing/harka-hero"

export default function LandingPage() {
  const [language, setLanguage] = useState<'da' | 'en'>('da')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLanguageChange = (lang: 'da' | 'en') => {
    console.log('Language changing to:', lang)
    setLanguage(lang)
  }

  return (
    <HarkaHero 
      language={language} 
      onLanguageChange={handleLanguageChange}
    />
  )
}