"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Settings, Users, UserPlus, Download } from "lucide-react"

interface TeamLayoutProps {
  children: React.ReactNode
}

export function TeamLayout({ children }: TeamLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Team Header */}
      <header className="stella-nav h-16 flex items-center justify-between px-6 border-b border-white/5">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </a>
          </Button>

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

        <div className="flex items-center space-x-4">
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

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">{children}</main>
    </div>
  )
}
