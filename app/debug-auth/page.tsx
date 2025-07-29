'use client'

import { useAuth, useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export default function DebugAuthPage() {
  const { isLoaded, isSignedIn, userId } = useAuth()
  const { user } = useUser()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Debug Page</h1>
        
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Auth State</h2>
            <div className="space-y-2">
              <p><strong>isLoaded:</strong> {String(isLoaded)}</p>
              <p><strong>isSignedIn:</strong> {String(isSignedIn)}</p>
              <p><strong>userId:</strong> {userId || 'null'}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">User Info</h2>
            <div className="space-y-2">
              <p><strong>User ID:</strong> {user?.id || 'null'}</p>
              <p><strong>Email:</strong> {user?.emailAddresses?.[0]?.emailAddress || 'null'}</p>
              <p><strong>First Name:</strong> {user?.firstName || 'null'}</p>
              <p><strong>Last Name:</strong> {user?.lastName || 'null'}</p>
              <p><strong>Created At:</strong> {user?.createdAt?.toString() || 'null'}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Session Info</h2>
            <div className="space-y-2">
              <p><strong>Session ID:</strong> {user?.primaryEmailAddress?.id || 'null'}</p>
              <p><strong>Verified:</strong> {String(user?.primaryEmailAddress?.verification?.status === 'verified')}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Navigation Test</h2>
            <div className="space-y-4">
              <a href="/learn/dashboard" className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Go to Dashboard
              </a>
              <a href="/learn/learning" className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Go to Learning
              </a>
              <a href="/analytics" className="block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Go to Analytics
              </a>
              <a href="/sign-in" className="block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                Go to Sign In
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Current URL Info</h2>
            <div className="space-y-2">
              <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'SSR'}</p>
              <p><strong>Pathname:</strong> {typeof window !== 'undefined' ? window.location.pathname : 'SSR'}</p>
              <p><strong>Search:</strong> {typeof window !== 'undefined' ? window.location.search : 'SSR'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}