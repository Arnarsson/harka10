import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "./hekla-brand.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker"
import { ClerkProvider } from '@clerk/nextjs'
import { LanguageProvider } from "@/lib/i18n/language-context"
import { UltraCleanHeader } from "@/components/layout/ultra-clean-header"

export const metadata: Metadata = {
  title: "HEKLA - AI-Powered Learning Platform",
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
  
  // Check if we have a valid Clerk key
  const hasValidClerkKey = publishableKey && !publishableKey.includes('mocked')
  
  if (!hasValidClerkKey && process.env.NODE_ENV === 'production') {
    console.warn('⚠️ Clerk authentication not configured. Please set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in your environment variables.')
  }
  
  return (
    <ClerkProvider 
      publishableKey={publishableKey}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,200;0,400;0,500;0,600;0,800;1,900&display=swap" rel="stylesheet" />
        </head>
        <body 
          className="font-sans antialiased"
          style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
          data-disable-animations={disableAnimations ? 'true' : undefined}
        >
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <LanguageProvider>
              <AnalyticsTracker />
              {!hasValidClerkKey && process.env.NODE_ENV === 'development' && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 text-center text-sm font-medium">
                  ⚠️ Development Mode: Clerk authentication not configured. See .env.example for setup instructions.
                </div>
              )}
              <UltraCleanHeader />
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
