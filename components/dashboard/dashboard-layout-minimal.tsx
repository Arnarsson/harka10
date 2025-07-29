"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser, useClerk } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  MessageSquare,
  Target,
  Menu,
  X,
  LogOut,
  Award,
  GraduationCap,
  Moon,
  Sun,
  FileText,
  TrendingUp,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Wrench,
  Shield
} from "lucide-react"
import { useTheme } from "next-themes"

const navigation = [
  { name: "Dashboard", href: "/learn/dashboard", icon: LayoutDashboard },
  { name: "Learning", href: "/learn/learning", icon: GraduationCap },
  { name: "Playground", href: "/learn/playground", icon: Target },
  { name: "Analytics", href: "/learn/analytics", icon: BarChart3 },
  { name: "Toolkit", href: "/learn/toolkit", icon: Wrench },
  { name: "Discussion", href: "/learn/discussion", icon: MessageSquare },
  { name: "Resources", href: "/learn/resources", icon: FileText },
  { name: "Certificates", href: "/learn/certificates", icon: Award },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayoutMinimal({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  
  // Check user roles from metadata
  const isAdmin = user?.publicMetadata?.role === 'admin'
  const isInstructor = user?.publicMetadata?.role === 'instructor'
  const { theme, setTheme } = useTheme()

  // Add admin navigation if user is admin
  const navItems = isAdmin 
    ? [...navigation, { name: "Admin", href: "/admin", icon: Shield }]
    : navigation

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-background border-r">
            <div className="flex h-14 items-center justify-between px-6">
              <Link href="/dashboard" className="text-xl font-bold">
                HARKA
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="px-3 py-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 text-sm rounded-[var(--radius)] transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block transition-all duration-300 ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'}`}>
        <div className="h-full bg-background border-r">
          <div className="flex h-14 items-center justify-between px-6">
            <Link href="/learn/dashboard" className={`text-xl font-bold transition-opacity ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>
              HARKA
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          <nav className="px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 text-sm rounded-[var(--radius)] transition-colors group relative ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className={`transition-opacity ${sidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                    {item.name}
                  </span>
                  {sidebarCollapsed && (
                    <div className="absolute left-12 bg-background border rounded-md px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
                      {item.name}
                    </div>
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="border rounded-[var(--radius)] p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="text-xs">S</AvatarFallback>
                </Avatar>
                <div className={`flex-1 min-w-0 transition-opacity ${sidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                  <p className="text-sm font-medium truncate">Sven</p>
                  <p className="text-xs text-muted-foreground truncate">View Profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'}`}>
        {/* Top header */}
        <header className="h-14 border-b flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden lg:flex" 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-medium capitalize">
              {pathname.split('/')[1] || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.imageUrl || "/placeholder.svg?height=32&width=32"} alt={user?.fullName || "User"} />
                    <AvatarFallback className="text-xs">
                      {user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}