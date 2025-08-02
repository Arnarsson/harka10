"use client"

import type React from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Settings, Zap, Save, Share, Download } from "lucide-react"

interface PlaygroundLayoutProps {
  children: React.ReactNode
}

export function PlaygroundLayout({ children }: PlaygroundLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Use shared Header with language switching and navigation */}
      <Header />

      {/* Playground-specific sub-header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold">Prompt Playground</h1>
                <p className="text-xs text-muted-foreground">Experiment with AI prompts</p>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-xs text-muted-foreground">AI Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-6 h-[calc(100vh-8rem)]">{children}</main>
    </div>
  )
}
