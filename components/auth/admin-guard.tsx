'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { LoadingPage } from '@/components/ui/loading-states'

interface AdminGuardProps {
  children: React.ReactNode
  fallbackUrl?: string
}

export function AdminGuard({ children, fallbackUrl = '/sign-in' }: AdminGuardProps) {
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(fallbackUrl)
    }
    
    // Check if user has admin role
    if (isLoaded && isSignedIn && user) {
      const userRole = user.publicMetadata?.role || user.unsafeMetadata?.role
      if (userRole !== 'admin') {
        // Redirect non-admin users to dashboard
        router.push('/learn/dashboard')
      }
    }
  }, [isLoaded, isSignedIn, user, router, fallbackUrl])

  // Show loading while checking auth
  if (!isLoaded) {
    return <LoadingPage />
  }

  // Don't render children until we know user is authenticated and authorized
  if (!isSignedIn || !user) {
    return <LoadingPage />
  }

  const userRole = user.publicMetadata?.role || user.unsafeMetadata?.role
  if (userRole !== 'admin') {
    return <LoadingPage />
  }

  return <>{children}</>
}