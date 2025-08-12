"use client"

import Link from "next/link"
import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  BookOpen, 
  Brain, 
  Users, 
  BarChart, 
  Settings, 
  PlayCircle,
  Shield,
  Upload,
  Compass,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function SimpleHeader() {
  const { isSignedIn, user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isAdmin = user?.publicMetadata?.role === 'admin'
  const isTeacher = user?.publicMetadata?.role === 'teacher' || isAdmin

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/learn/dashboard', label: 'Dashboard', icon: BookOpen, requireAuth: true },
    { href: '/learn/courses', label: 'Courses', icon: PlayCircle, requireAuth: true },
    { href: '/learn/ai-kompas', label: 'AI Compass', icon: Compass, requireAuth: true },
    { href: '/community/power-hour', label: 'Community', icon: Users },
    { href: '/analytics', label: 'Analytics', icon: BarChart, requireAuth: true },
    { href: '/teach/dashboard', label: 'Teach', icon: Upload, requireAuth: true, requireTeacher: true },
    { href: '/admin/dashboard', label: 'Admin', icon: Shield, requireAuth: true, requireAdmin: true },
  ]

  const visibleItems = navItems.filter(item => {
    if (item.requireAuth && !isSignedIn) return false
    if (item.requireAdmin && !isAdmin) return false
    if (item.requireTeacher && !isTeacher) return false
    return true
  })

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">HARKA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {visibleItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <Link href="/learn/dashboard">
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Get Started</Button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {visibleItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="pt-4 border-t">
                {isSignedIn ? (
                  <div className="px-3 py-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 px-3">
                    <SignInButton mode="modal">
                      <Button variant="ghost" className="w-full">Sign In</Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full">Get Started</Button>
                    </SignUpButton>
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}