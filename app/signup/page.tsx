import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Sign up form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold">HARKA</h1>
            </Link>
            <p className="text-zinc-600 mt-2">Create your account to get started.</p>
          </div>
          
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-black hover:bg-zinc-800 text-white',
                card: 'shadow-2xl border-0 bg-white',
              }
            }}
            afterSignInUrl="/learn/dashboard"
            afterSignUpUrl="/learn/dashboard"
            redirectUrl="/learn/dashboard"
          />
        </div>
      </div>

      {/* Right side - Image/Graphics */}
      <div className="hidden lg:block lg:w-1/2 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black opacity-50" />
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-4">
              Start Your Learning Journey
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Join thousands of learners and build your expertise with verified certificates
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
                <div className="text-sm text-zinc-400">Certificates Issued</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}