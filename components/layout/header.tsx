"use client"

import { useState } from "react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Menu, X, Settings, HelpCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SmartNavigation } from "@/components/navigation/smart-navigation"
import { MobileNav } from "@/components/navigation/mobile-nav"
import { QuickSearch } from "@/components/navigation/quick-search"
import { NotificationBadge } from "@/components/navigation/notification-badge"
import { getUserRole } from "@/lib/auth/roles"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useUser()
  const userRole = getUserRole(user)

  return (
    <header className="sticky top-0 z-50 w-full harka-nav">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="text-2xl font-bold font-satoshi tracking-tight">HARKA</div>
        </Link>

        {/* Desktop Navigation - Smart Navigation */}
        <div className="hidden md:block">
          <SmartNavigation userRole={userRole} />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {/* Quick Search */}
          <div className="w-64">
            <QuickSearch />
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-muted-foreground font-satoshi">Connected</span>
          </div>

          <NotificationBadge />

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

      {/* Mobile Navigation - Smart Mobile Nav */}
      <MobileNav 
        userRole={userRole} 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </header>
  )
}
