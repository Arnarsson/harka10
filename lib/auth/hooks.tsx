'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { UserProfile, AuthState } from './types'

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signInWithMagicLink: (email: string) => Promise<void>
  signInWithProvider: (provider: 'google' | 'github' | 'linkedin') => Promise<void>
  signOut: () => Promise<void>
  isAdmin: boolean
  isInstructor: boolean
  isStudent: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  })
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Skip auth initialization if Supabase is not configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setState({ user: null, loading: false, error: null })
      return
    }

    // Check active session
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          await checkUser()
        } else {
          setState({ user: null, loading: false, error: null })
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }))
      
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Fetch user profile with role
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) throw error

        setState({
          user: profile as UserProfile,
          loading: false,
          error: null
        })
      } else {
        setState({ user: null, loading: false, error: null })
      }
    } catch (error) {
      console.error('Error checking user:', error)
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setState(prev => ({ ...prev, error: 'Authentication is not configured' }))
      throw new Error('Authentication is not configured')
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }))

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      await checkUser()
      router.push('/dashboard')
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to sign in'
      }))
      throw error
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setState(prev => ({ ...prev, error: 'Authentication is not configured' }))
      throw new Error('Authentication is not configured')
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }))

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (error) throw error

      // Create user profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: data.user.id,
            email: data.user.email,
            full_name: fullName,
            role: 'student' // Default role
          })

        if (profileError) throw profileError
      }

      await checkUser()
      router.push('/dashboard')
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to sign up'
      }))
      throw error
    }
  }

  const signInWithMagicLink = async (email: string) => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setState(prev => ({ ...prev, error: 'Authentication is not configured' }))
      throw new Error('Authentication is not configured')
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }))

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      })

      if (error) throw error

      // Don't update state here as user needs to check email
      setState(prev => ({ ...prev, loading: false }))
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to send magic link'
      }))
      throw error
    }
  }

  const signInWithProvider = async (provider: 'google' | 'github' | 'linkedin') => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setState(prev => ({ ...prev, error: 'Authentication is not configured' }))
      throw new Error('Authentication is not configured')
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }))

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      })

      if (error) throw error

      // OAuth will redirect, so no need to update state here
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || `Failed to sign in with ${provider}`
      }))
      throw error
    }
  }

  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }))
      
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      setState({ user: null, loading: false, error: null })
      router.push('/')
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to sign out'
      }))
    }
  }

  const value: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signInWithMagicLink,
    signInWithProvider,
    signOut,
    isAdmin: state.user?.role === 'admin',
    isInstructor: state.user?.role === 'instructor',
    isStudent: state.user?.role === 'student'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    // During build time or when AuthProvider is not available, return default values
    return {
      user: null,
      loading: false,
      error: null,
      signIn: async () => {},
      signUp: async () => {},
      signOut: async () => {},
      isAdmin: false,
      isInstructor: false,
      isStudent: false,
    } as AuthContextType
  }
  return context
}

// HOC for protecting pages
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requireAuth?: boolean
    requireRole?: 'admin' | 'instructor' | 'student'
    redirectTo?: string
  }
) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading, isAdmin, isInstructor } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading) {
        if (options?.requireAuth && !user) {
          router.push(options.redirectTo || '/login')
        }

        if (options?.requireRole) {
          const hasRole = 
            (options.requireRole === 'admin' && isAdmin) ||
            (options.requireRole === 'instructor' && (isInstructor || isAdmin)) ||
            (options.requireRole === 'student' && user)

          if (!hasRole) {
            router.push('/unauthorized')
          }
        }
      }
    }, [user, loading, isAdmin, isInstructor])

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-zinc-200 border-t-black" />
        </div>
      )
    }

    if (options?.requireAuth && !user) {
      return null
    }

    return <Component {...props} />
  }
}