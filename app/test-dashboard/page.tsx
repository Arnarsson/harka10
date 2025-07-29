"use client"

import { useUser } from "@clerk/nextjs"

export default function TestDashboard() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div className="p-8">Loading...</div>
  }

  if (!user) {
    return <div className="p-8">Not authenticated</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard Test</h1>
      <p>Welcome, {user.fullName || user.firstName || "User"}!</p>
      <p>User ID: {user.id}</p>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Authentication Status:</h2>
        <ul className="list-disc list-inside">
          <li>User loaded: {isLoaded ? "✅" : "❌"}</li>
          <li>User authenticated: {user ? "✅" : "❌"}</li>
          <li>Has email: {user?.primaryEmailAddress ? "✅" : "❌"}</li>
        </ul>
      </div>
    </div>
  )
}