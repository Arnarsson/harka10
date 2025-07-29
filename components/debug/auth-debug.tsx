"use client"

import { useUser, useAuth } from "@clerk/nextjs"
import { useEffect } from "react"

export function AuthDebug() {
  const { user, isLoaded: userLoaded } = useUser()
  const { isLoaded: authLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    console.log("Auth Debug:", {
      userLoaded,
      authLoaded,
      isSignedIn,
      userId: user?.id,
      userEmail: user?.primaryEmailAddress?.emailAddress
    })
  }, [userLoaded, authLoaded, isSignedIn, user])

  return (
    <div className="fixed bottom-4 left-4 bg-black text-white p-4 rounded text-xs z-50">
      <div>User Loaded: {userLoaded ? "✅" : "❌"}</div>
      <div>Auth Loaded: {authLoaded ? "✅" : "❌"}</div>
      <div>Signed In: {isSignedIn ? "✅" : "❌"}</div>
      <div>User ID: {user?.id || "None"}</div>
    </div>
  )
}