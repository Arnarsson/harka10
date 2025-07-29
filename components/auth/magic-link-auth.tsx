'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import { cn } from '@/lib/utils'

interface MagicLinkAuthProps {
  redirectTo?: string
  onSuccess?: () => void
  className?: string
}

export function MagicLinkAuth({ 
  redirectTo = '/dashboard',
  onSuccess,
  className 
}: MagicLinkAuthProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectTo}`,
        }
      })

      if (error) throw error

      setIsSuccess(true)
      if (onSuccess) onSuccess()
    } catch (err: any) {
      setError(err.message || 'Failed to send magic link')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("w-full max-w-md", className)}>
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Mail className="h-8 w-8 text-gray-600" />
                </motion.div>
                <h2 className="text-2xl font-semibold">Sign in with email</h2>
                <p className="text-gray-600 mt-2">
                  We'll send you a magic link to sign in
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email address
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <AnimatedTooltip content="We'll never share your email" side="right">
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail className="h-4 w-4" />
                    </div>
                  </AnimatedTooltip>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-50 text-red-600 px-3 py-2 rounded-md text-sm"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isLoading || !email}
                className="w-full gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending magic link...
                  </>
                ) : (
                  <>
                    Send magic link
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-gray-500">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center py-8"
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>
            
            <h3 className="text-xl font-semibold mb-2">Check your email!</h3>
            <p className="text-gray-600 mb-6">
              We sent a magic link to <strong>{email}</strong>
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p className="mb-2">Didn't receive the email?</p>
              <ul className="space-y-1 text-left list-disc list-inside">
                <li>Check your spam folder</li>
                <li>Make sure you entered the correct email</li>
                <li>Try requesting a new link</li>
              </ul>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setIsSuccess(false)
                setEmail('')
              }}
              className="mt-6"
            >
              Try another email
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Magic Link Callback Handler
export function MagicLinkCallback() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient()
      
      try {
        const { error } = await supabase.auth.exchangeCodeForSession(
          window.location.href
        )
        
        if (error) throw error
        
        setStatus('success')
        
        // Get redirect URL from query params
        const params = new URLSearchParams(window.location.search)
        const redirectTo = params.get('redirectTo') || '/dashboard'
        
        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = redirectTo
        }, 1000)
      } catch (err: any) {
        setError(err.message || 'Failed to authenticate')
        setStatus('error')
      }
    }

    handleCallback()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {status === 'loading' && (
          <>
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-gray-600" />
            <p className="text-gray-600">Authenticating...</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <p className="text-green-600 font-medium">Authentication successful!</p>
            <p className="text-gray-600 mt-2">Redirecting you to the app...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="text-red-600 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-red-600 font-medium">Authentication failed</p>
            <p className="text-gray-600 mt-2">{error}</p>
            <Button
              onClick={() => window.location.href = '/login'}
              className="mt-4"
            >
              Back to login
            </Button>
          </>
        )}
      </motion.div>
    </div>
  )
}