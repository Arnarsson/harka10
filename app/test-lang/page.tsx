"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function TestLangPage() {
  const [language, setLanguage] = useState<'da' | 'en'>('da')

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Language Test Page</h1>
      
      <div className="space-y-4">
        <p>Current language: <strong>{language}</strong></p>
        
        <Button 
          onClick={() => {
            console.log('Button clicked!');
            setLanguage(language === 'da' ? 'en' : 'da')
          }}
        >
          Click to toggle language (currently: {language})
        </Button>
        
        <div className="p-4 border rounded">
          {language === 'da' ? (
            <p>Dette er dansk tekst</p>
          ) : (
            <p>This is English text</p>
          )}
        </div>
      </div>
    </div>
  )
}