"use client"

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, GraduationCap, Sparkles, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function TeacherAccessPage() {
  const { user } = useUser()
  const router = useRouter()
  
  // Direct access links - bypass navigation
  const teacherLinks = [
    {
      title: 'Upload Content Hub',
      description: 'Upload videos, documents, and course materials',
      href: '/teach/upload',
      icon: Upload,
      primary: true
    },
    {
      title: 'Teacher Dashboard',
      description: 'Overview of your teaching activities',
      href: '/teach/dashboard',
      icon: GraduationCap
    },
    {
      title: 'Interactive Builder',
      description: 'Create interactive lessons and exercises',
      href: '/teach/interactive',
      icon: Sparkles
    }
  ]

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Teacher Access Portal</h1>
          <p className="text-xl text-muted-foreground">
            Direct access to all teacher features
          </p>
        </div>

        {user ? (
          <>
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <p className="text-sm">
                  Logged in as: <strong>{user.emailAddresses[0]?.emailAddress}</strong>
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                User ID: {user.id}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teacherLinks.map((link) => (
                <Card 
                  key={link.href} 
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${
                    link.primary ? 'border-purple-500 border-2' : ''
                  }`}
                  onClick={() => router.push(link.href)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <link.icon className={`h-8 w-8 ${
                        link.primary ? 'text-purple-600' : 'text-gray-600'
                      }`} />
                      {link.primary && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          MAIN HUB
                        </span>
                      )}
                    </div>
                    <CardTitle className="mt-4">{link.title}</CardTitle>
                    <CardDescription>{link.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      variant={link.primary ? "default" : "outline"}
                    >
                      Access {link.title}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">Teacher Features Include:</h2>
              <ul className="space-y-2 text-sm">
                <li>✅ <strong>Video Upload</strong> - Upload or link video lessons</li>
                <li>✅ <strong>Document Management</strong> - PDFs, slides, course materials</li>
                <li>✅ <strong>Interactive Content</strong> - Create coding exercises</li>
                <li>✅ <strong>Content Organization</strong> - Categories, tags, difficulty levels</li>
                <li>✅ <strong>Student Preview</strong> - See how content appears to learners</li>
                <li>✅ <strong>Bulk Operations</strong> - Manage multiple files efficiently</li>
              </ul>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                If you're seeing "Access Denied" on teacher pages, make sure your account has teacher permissions in Clerk.
              </p>
            </div>
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Sign In Required</CardTitle>
              <CardDescription>
                Please sign in to access teacher features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/sign-in">
                <Button className="w-full">Sign In</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}