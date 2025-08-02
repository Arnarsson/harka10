"use client"

import type React from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Settings, Users, UserPlus, Download } from "lucide-react"

interface TeamLayoutProps {
  children: React.ReactNode
}

export function TeamLayout({ children }: TeamLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Use shared Header with language switching and navigation */}
      <Header />

      {/* Team-specific sub-header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold">Team Management</h1>
                <p className="text-xs text-muted-foreground">TechNordic AB</p>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Members
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-xs text-muted-foreground">24 Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-6">{children}</main>
    </div>
  )
}
