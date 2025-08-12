import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker"
import { ClerkProvider } from '@clerk/nextjs'
import { LanguageProvider } from "@/lib/i18n/language-context"
import { SimpleHeader } from "@/components/layout/simple-header-fixed"

export const metadata: Metadata = {
  title: "HARKA - AI-Powered Learning Platform",
  description: "Transform your organization with interactive AI-powered learning, personalized paths, and real-time collaboration.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Use real Clerk key in production, fallback for build
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_bW9ja2VkLWtleS1mb3ItYnVpbGQtdGltZS5jbGVyay5hY2NvdW50cy5kZXYk'
  const disableAnimations = process.env.NEXT_PUBLIC_DISABLE_ANIMATIONS === 'true'
  
  return (
    <ClerkProvider 
      publishableKey={publishableKey}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
        </head>
        <body 
          style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
          data-disable-animations={disableAnimations ? 'true' : undefined}
        >
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <LanguageProvider>
              <AnalyticsTracker />
              <SimpleHeader />
              <main className="min-h-screen">
                {children}
              </main>
              <Toaster />
            </LanguageProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
