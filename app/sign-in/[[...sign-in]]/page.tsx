import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">HARKA</h1>
          <p className="text-gray-600 dark:text-gray-300">Sign in to your learning platform</p>
        </div>
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
              card: 'shadow-2xl border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80',
            }
          }}
        />
      </div>
    </div>
  )
}