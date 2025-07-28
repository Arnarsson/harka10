"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Settings, HelpCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full harka-nav">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="text-2xl font-bold font-satoshi tracking-tight">HARKA</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/dashboard" className="text-sm font-medium font-satoshi hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/learning" className="text-sm font-medium font-satoshi hover:text-primary transition-colors">
            Learning
          </Link>
          <Link href="/playground" className="text-sm font-medium font-satoshi hover:text-primary transition-colors">
            Playground
          </Link>
          <Link href="/analytics" className="text-sm font-medium font-satoshi hover:text-primary transition-colors">
            Analytics
          </Link>
          <Link href="/toolkit" className="text-sm font-medium font-satoshi hover:text-primary transition-colors">
            Toolkit
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-muted-foreground font-satoshi">Connected</span>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <HelpCircle className="h-4 w-4" />
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-satoshi">JD</AvatarFallback>
          </Avatar>
        </div>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur">
          <div className="container py-4 space-y-4">
            <Link href="/dashboard" className="block py-2 text-sm font-medium font-satoshi">
              Dashboard
            </Link>
            <Link href="/learning" className="block py-2 text-sm font-medium font-satoshi">
              Learning
            </Link>
            <Link href="/playground" className="block py-2 text-sm font-medium font-satoshi">
              Playground
            </Link>
            <Link href="/analytics" className="block py-2 text-sm font-medium font-satoshi">
              Analytics
            </Link>
            <Link href="/toolkit" className="block py-2 text-sm font-medium font-satoshi">
              Toolkit
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
