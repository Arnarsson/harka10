"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brain, ArrowLeft, Settings, Play, Pause, RotateCcw } from "lucide-react"

interface LearningLayoutProps {
  children: React.ReactNode
}

export function LearningLayout({ children }: LearningLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Learning Header */}
      <header className="stella-nav h-16 flex items-center justify-between px-6 border-b border-white/5">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </a>
          </Button>

          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold">AI Ethics in Practice</h1>
              <p className="text-xs text-muted-foreground">Phase 2: Ethics & Governance</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Learning Controls */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <div className="text-xs text-muted-foreground">Progress</div>
            <div className="w-24">
              <Progress value={75} className="h-2" />
            </div>
            <div className="text-xs font-medium">75%</div>
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
