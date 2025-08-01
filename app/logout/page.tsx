'use client'

import { useClerk } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const { signOut } = useClerk()
  const router = useRouter()

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await signOut()
        router.push('/')
      } catch (error) {
        console.error('Error signing out:', error)
        router.push('/')
      }
    }

    handleSignOut()
  }, [signOut, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Signing out...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  )
}