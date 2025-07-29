"use client"

import { useState } from "react"
import { PricingSection } from "@/components/pricing/pricing-section"
import { Button } from "@/components/ui/button"
import { Globe, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [language, setLanguage] = useState<'da' | 'en'>('da')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-xl font-bold">HARKA</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'da' ? 'en' : 'da')}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="ml-2 text-sm">{language === 'da' ? 'EN' : 'DA'}</span>
            </button>
            
            <Link href="/sign-in">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <PricingSection language={language} />
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 HARKA. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}