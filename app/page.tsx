"use client"

import { useState } from "react"
import { HarkaHero } from "@/components/landing/harka-hero"

export default function LandingPage() {
  const [language, setLanguage] = useState<'da' | 'en'>('da')

  const handleLanguageChange = (lang: 'da' | 'en') => {
    setLanguage(lang)
  }

  return (
    <div className="min-h-screen">
      <HarkaHero 
        language={language} 
        onLanguageChange={handleLanguageChange}
      />
    </div>
  )
}
