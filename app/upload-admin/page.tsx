'use client'

import { useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Lock, ArrowRight } from 'lucide-react'

export default function UploadAdminPage() {
  const { userId, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to secure upload page if authenticated
    if (isLoaded && userId) {
      router.push('/teach/upload')
    }
  }, [isLoaded, userId, router])

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <CardTitle className="text-red-900 dark:text-red-100">
              Security Notice: This Page Has Been Deprecated
            </CardTitle>
          </div>
          <CardDescription className="text-red-700 dark:text-red-300">
            The direct upload page has been removed for security reasons
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-sm">
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Why was this page removed?
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• It allowed unauthenticated uploads</li>
                <li>• It exposed service keys publicly</li>
                <li>• It bypassed role-based access control</li>
                <li>• It created a security vulnerability</li>
              </ul>
            </div>

            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
              <h3 className="font-semibold mb-2">What should you do instead?</h3>
              <ol className="space-y-2 text-muted-foreground">
                <li>1. Sign in with your account</li>
                <li>2. Ensure you have teacher or admin role</li>
                <li>3. Use the secure upload interface</li>
              </ol>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {!userId ? (
              <Button 
                onClick={() => router.push('/sign-in')}
                className="w-full"
              >
                Sign In to Upload Content
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={() => router.push('/teach/upload')}
                className="w-full"
              >
                Go to Secure Upload
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            
            <Button 
              variant="outline"
              onClick={() => router.push('/')}
            >
              Return to Home
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            If you need admin access, contact your system administrator
          </div>
        </CardContent>
      </Card>
    </div>
  )
}