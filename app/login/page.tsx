'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn } from 'lucide-react'
import { useAuth } from '@/lib/auth/hooks'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await signIn(email, password)
    } catch (err: any) {
      setError(err.message || 'Failed to sign in')
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (role: 'admin' | 'instructor' | 'student') => {
    setError('')
    setIsLoading(true)

    const demoCredentials = {
      admin: { email: 'admin@demo.com', password: 'admin123' },
      instructor: { email: 'instructor@demo.com', password: 'instructor123' },
      student: { email: 'student@demo.com', password: 'student123' }
    }

    try {
      const creds = demoCredentials[role]
      await signIn(creds.email, creds.password)
    } catch (err: any) {
      setError('Demo account not available. Please sign up.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Login form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            <Link href="/" className="block mb-8">
              <h1 className="text-3xl font-bold">AI Training Platform</h1>
              <p className="text-zinc-600 mt-2">Welcome back! Please sign in to continue.</p>
            </Link>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-sm text-red-600">{error}</p>
              </motion.div>
            )}

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-zinc-300 rounded focus:ring-black"
                  />
                  <span className="ml-2 text-sm text-zinc-600">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    Sign in
                  </>
                )}
              </button>

              {/* Sign up link */}
              <p className="text-center text-sm text-zinc-600">
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </form>

            {/* Demo accounts */}
            <div className="mt-8 pt-8 border-t border-zinc-200">
              <p className="text-sm text-zinc-600 text-center mb-4">
                Or try a demo account
              </p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleDemoLogin('student')}
                  disabled={isLoading}
                  className="py-2 text-sm border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors disabled:opacity-50"
                >
                  Student
                </button>
                <button
                  onClick={() => handleDemoLogin('instructor')}
                  disabled={isLoading}
                  className="py-2 text-sm border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors disabled:opacity-50"
                >
                  Instructor
                </button>
                <button
                  onClick={() => handleDemoLogin('admin')}
                  disabled={isLoading}
                  className="py-2 text-sm border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors disabled:opacity-50"
                >
                  Admin
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Image/Graphics */}
      <div className="hidden lg:block lg:w-1/2 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black opacity-50" />
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-4">
              Learn. Build. Earn Certificates.
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Join thousands of learners advancing their careers with verified credentials
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">15K+</div>
                <div className="text-sm text-zinc-400">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-sm text-zinc-400">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">98%</div>
                <div className="text-sm text-zinc-400">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">10K+</div>
                <div className="text-sm text-zinc-400">Certificates</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}