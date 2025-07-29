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
  // Always provide a publishable key - use a properly formatted mock during build time
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_bW9ja2VkLWtleS1mb3ItYnVpbGQtdGltZS5jbGVyay5hY2NvdW50cy5kZXYk'
  
  return (
    <ClerkProvider 
      publishableKey={publishableKey}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/learn/dashboard"
      signUpFallbackRedirectUrl="/learn/dashboard"
    >
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
    </ClerkProvider>
  )
}
