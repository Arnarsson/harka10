"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Settings, HelpCircle, Users, Globe, LogIn, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth/hooks"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const { user, signOut } = useAuth()

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'da' : 'en'
    setCurrentLanguage(newLanguage)
    localStorage.setItem('harka-language', newLanguage)
  }

  const translations = {
    en: {
      dashboard: "Dashboard",
      learning: "Learning", 
      team: "Team",
      playground: "Playground",
      analytics: "Analytics",
      toolkit: "Toolkit",
      signin: "Sign In",
      signup: "Sign Up",
      signout: "Sign Out",
      connected: "Connected"
    },
    da: {
      dashboard: "Dashboard",
      learning: "Læring",
      team: "Hold", 
      playground: "Legeplads",
      analytics: "Analyser",
      toolkit: "Værktøjer",
      signin: "Log Ind",
      signup: "Tilmeld",
      signout: "Log Ud", 
      connected: "Forbundet"
    }
  }

  const t = translations[currentLanguage as keyof typeof translations]

  return (
    <header className="sticky top-0 z-50 w-full harka-nav">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="text-2xl font-bold font-satoshi tracking-tight">HARKA</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/dashboard" className="text-sm font-medium font-satoshi hover:text-primary transition-colors">
            {t.dashboard}
          </Link>
          <Link href="/learning" className="text-sm font-medium font-satoshi hover:text-primary transition-colors">
            {t.learning}
          </Link>
          <Link href="/team" className="text-sm font-medium font-satoshi hover:text-primary transition-colors">
            {t.team}
          </Link>
          <Link href="/playground" className="text-sm font-medium font-satoshi hover:text-primary transition-colors">
            {t.playground}
          </Link>
          <Link href="/analytics" className="text-sm font-medium font-satoshi hover:text-primary transition-colors">
            {t.analytics}
          </Link>
          <Link href="/toolkit" className="text-sm font-medium font-satoshi hover:text-primary transition-colors">
            {t.toolkit}
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-muted-foreground font-satoshi">{t.connected}</span>
          </div>

          {/* Language Switcher */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className="h-8 px-3 text-xs font-satoshi"
            data-testid="language-switcher"
          >
            <Globe className="h-3 w-3 mr-1" />
            {currentLanguage.toUpperCase()}
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <HelpCircle className="h-4 w-4" />
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={user.avatar_url} alt={user.full_name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-satoshi">
                    {user.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={signOut}>
                  {t.signout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                data-testid="sign-in-button"
              >
                <Link href="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  {t.signin}
                </Link>
              </Button>
              <Button 
                size="sm" 
                asChild
                data-testid="sign-up-button"
              >
                <Link href="/signup">
                  <UserPlus className="h-4 w-4 mr-2" />
                  {t.signup}
                </Link>
              </Button>
            </div>
          )}
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
              {t.dashboard}
            </Link>
            <Link href="/learning" className="block py-2 text-sm font-medium font-satoshi">
              {t.learning}
            </Link>
            <Link href="/team" className="block py-2 text-sm font-medium font-satoshi">
              {t.team}
            </Link>
            <Link href="/playground" className="block py-2 text-sm font-medium font-satoshi">
              {t.playground}
            </Link>
            <Link href="/analytics" className="block py-2 text-sm font-medium font-satoshi">
              {t.analytics}
            </Link>
            <Link href="/toolkit" className="block py-2 text-sm font-medium font-satoshi">
              {t.toolkit}
            </Link>
            
            {/* Mobile Language & Auth */}
            <div className="border-t border-border/50 pt-4 space-y-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleLanguage}
                className="w-full justify-start"
                data-testid="mobile-language-switcher"
              >
                <Globe className="h-4 w-4 mr-2" />
                {currentLanguage === 'en' ? 'Switch to Danish' : 'Skift til Engelsk'}
              </Button>
              
              {!user && (
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    asChild
                    className="w-full justify-start"
                    data-testid="mobile-sign-in-button"
                  >
                    <Link href="/login">
                      <LogIn className="h-4 w-4 mr-2" />
                      {t.signin}
                    </Link>
                  </Button>
                  <Button 
                    size="sm" 
                    asChild
                    className="w-full"
                    data-testid="mobile-sign-up-button"
                  >
                    <Link href="/signup">
                      <UserPlus className="h-4 w-4 mr-2" />
                      {t.signup}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
