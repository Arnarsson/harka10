'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth/hooks'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SocialLoginProps {
  className?: string
}

const providers = [
  {
    name: 'google',
    displayName: 'Google',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="currentColor"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="currentColor"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="currentColor"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    ),
    bgColor: 'bg-white hover:bg-gray-50',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-300'
  },
  {
    name: 'github',
    displayName: 'GitHub',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    bgColor: 'bg-gray-900 hover:bg-gray-800',
    textColor: 'text-white',
    borderColor: 'border-gray-900'
  },
  {
    name: 'linkedin',
    displayName: 'LinkedIn',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    bgColor: 'bg-[#0077B5] hover:bg-[#006399]',
    textColor: 'text-white',
    borderColor: 'border-[#0077B5]'
  }
]

export function SocialLogin({ className }: SocialLoginProps) {
  const { signInWithProvider } = useAuth()
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleProviderLogin = async (provider: 'google' | 'github' | 'linkedin') => {
    setLoadingProvider(provider)
    setError(null)
    
    try {
      await signInWithProvider(provider)
    } catch (err: any) {
      setError(err.message || `Failed to sign in with ${provider}`)
      setLoadingProvider(null)
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {providers.map((provider, index) => (
          <motion.div
            key={provider.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              type="button"
              variant="outline"
              className={cn(
                "w-full relative",
                provider.bgColor,
                provider.textColor,
                provider.borderColor
              )}
              disabled={loadingProvider !== null}
              onClick={() => handleProviderLogin(provider.name as any)}
            >
              {loadingProvider === provider.name ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span className="absolute left-4">{provider.icon}</span>
                  Continue with {provider.displayName}
                </>
              )}
            </Button>
          </motion.div>
        ))}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-red-50 text-red-600 px-3 py-2 rounded-md text-sm text-center"
        >
          {error}
        </motion.div>
      )}
    </div>
  )
}

// Combined Auth Component
interface CombinedAuthProps {
  mode?: 'signin' | 'signup'
  showMagicLink?: boolean
  showSocial?: boolean
  onSuccess?: () => void
  className?: string
}

export function CombinedAuth({ 
  mode = 'signin',
  showMagicLink = true,
  showSocial = true,
  onSuccess,
  className 
}: CombinedAuthProps) {
  const [authMethod, setAuthMethod] = useState<'magic' | 'social' | null>(null)

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-gray-600">
          {mode === 'signin' 
            ? 'Sign in to continue your learning journey'
            : 'Start your learning journey today'
          }
        </p>
      </div>

      {authMethod === null && (
        <div className="space-y-4">
          {showMagicLink && (
            <Button
              onClick={() => setAuthMethod('magic')}
              className="w-full gap-2"
              size="lg"
            >
              <Mail className="h-5 w-5" />
              Continue with email
            </Button>
          )}

          {showSocial && <SocialLogin />}
        </div>
      )}

      {authMethod === 'magic' && (
        <>
          <Button
            variant="ghost"
            onClick={() => setAuthMethod(null)}
            className="mb-4"
          >
            ← Back to options
          </Button>
          <MagicLinkAuth onSuccess={onSuccess} />
        </>
      )}
    </div>
  )
}