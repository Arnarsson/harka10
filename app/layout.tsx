import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker"
import { ClerkProvider } from '@clerk/nextjs'
import { LanguageProvider } from "@/lib/i18n/language-context"

export const metadata: Metadata = {
  title: "HARKA - AI der leverer reel forretningsværdi",
  description: "Transform your organization through our comprehensive three-phase AI training methodology. From fundamentals to ethical implementation.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Use real Clerk key in production, fallback for build
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_bW9ja2VkLWtleS1mb3ItYnVpbGQtdGltZS5jbGVyay5hY2NvdW50cy5kZXYk'
  
  return (
    <ClerkProvider 
      publishableKey={publishableKey}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
        </head>
        <body style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <LanguageProvider>
              <AnalyticsTracker />
              {children}
              <Toaster />
            </LanguageProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
