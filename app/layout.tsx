import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "HARKA - AI der leverer reel forretningsværdi",
  description: "Transform your organization through our comprehensive three-phase AI training methodology. From fundamentals to ethical implementation.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  
  // During build, wrap with conditional Clerk provider
  const content = (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
  
  // Only wrap with ClerkProvider if we have a valid key
  if (publishableKey && publishableKey !== 'placeholder') {
    return (
      <ClerkProvider publishableKey={publishableKey}>
        {content}
      </ClerkProvider>
    )
  }
  
  // For build time or when key is missing, return without Clerk wrapper
  return content
}
