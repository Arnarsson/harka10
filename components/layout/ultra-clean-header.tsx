"use client"

import Link from "next/link"
import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Sparkles, PlayCircle, LayoutDashboard } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function UltraCleanHeader() {
  const { isSignedIn, user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isAdmin = user?.publicMetadata?.role === 'admin'
  const isTeacher = user?.publicMetadata?.role === 'teacher' || isAdmin

  // Ultra-minimal navigation - 3 items max
  const guestNavItems = [
    { href: '/demo/interactive-learning', label: 'Demo', icon: PlayCircle },
    { href: '/toolkit', label: 'Resources', icon: Sparkles },
    { href: '#pricing', label: 'Pricing' },
  ]

  // For authenticated users - just 3 primary items, rest in user menu
  const authenticatedNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/learn/courses', label: 'Learn' },
    { href: '/community/power-hour', label: 'Community' },
  ]

  const navItems = isSignedIn ? authenticatedNavItems : guestNavItems

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-14 items-center justify-between">
          {/* Logo - more prominent */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              HARKA
            </span>
          </Link>

          {/* Center Navigation - Ultra Clean */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {/* More menu for secondary items (only for authenticated users) */}
            {isSignedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors">
                    More
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/learn/ai-kompas" className="cursor-pointer">
                      AI Compass
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/analytics" className="cursor-pointer">
                      Analytics
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/learn/resources" className="cursor-pointer">
                      Resources
                    </Link>
                  </DropdownMenuItem>
                  
                  {(isTeacher || isAdmin) && (
                    <>
                      <DropdownMenuSeparator />
                      {isTeacher && (
                        <DropdownMenuItem asChild>
                          <Link href="/teach/dashboard" className="cursor-pointer">
                            Teaching Portal
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {isAdmin && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin/dashboard" className="cursor-pointer">
                            Admin Panel
                          </Link>
                        </DropdownMenuItem>
                      )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          {/* Right Section - Clean CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            {isSignedIn ? (
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-700 hover:text-violet-600"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-sm"
                  >
                    Get Started
                  </Button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation - Slide Down */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-violet-600 px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {isSignedIn && (
                <>
                  <div className="border-t pt-3 mt-3">
                    <Link
                      href="/learn/ai-kompas"
                      className="block text-sm text-gray-600 px-2 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      AI Compass
                    </Link>
                    <Link
                      href="/analytics"
                      className="block text-sm text-gray-600 px-2 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Analytics
                    </Link>
                  </div>
                </>
              )}

              <div className="border-t pt-3">
                {isSignedIn ? (
                  <div className="px-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <SignInButton mode="modal">
                      <Button variant="ghost" size="sm" className="w-full">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button size="sm" className="w-full bg-gradient-to-r from-violet-600 to-indigo-600">
                        Get Started
                      </Button>
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