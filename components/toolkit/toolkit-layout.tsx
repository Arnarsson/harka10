"use client"

import type React from "react"

interface ToolkitLayoutProps {
  children: React.ReactNode
}

// Wrapper that matches the landing page look & feel
// Uses the same gradient background and container sizing
export function ToolkitLayout({ children }: ToolkitLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white">
      <main className="container max-w-6xl mx-auto px-4 py-10">
        {children}
      </main>
    </div>
  )
}
