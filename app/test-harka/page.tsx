"use client"

import { useState } from "react"
import { HarkaHero } from "@/components/landing/harka-hero"

export default function TestHarkaPage() {
  const [language, setLanguage] = useState<'da' | 'en'>('da')

  console.log('TestHarkaPage rendering with language:', language)

  const handleLanguageChange = (lang: 'da' | 'en') => {
    console.log('Language change requested:', lang)
    setLanguage(lang)
  }

  return (
    <div className="min-h-screen">
      <p className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded">
        Test Page - Language: {language}
      </p>
      <HarkaHero 
        language={language} 
        onLanguageChange={handleLanguageChange}
      />
    </div>
  )
}