import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Shield, 
  Users, 
  BookOpen, 
  Settings, 
  BarChart3, 
  CreditCard,
  FileText,
  Upload,
  ArrowLeft
} from 'lucide-react'

export default async function AdminQuickAccess() {
  const { userId, sessionClaims } = await auth()
  
  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please sign in to access admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/sign-in">
              <Button className="w-full">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart3, desc: 'Overview and analytics' },
    { href: '/admin/users', label: 'Users', icon: Users, desc: 'Manage user accounts' },
    { href: '/admin/content', label: 'Content', icon: FileText, desc: 'Manage courses and content' },
    { href: '/admin/courses', label: 'Courses', icon: BookOpen, desc: 'Course management' },
    { href: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard, desc: 'Billing and subscriptions' },
    { href: '/admin/blog', label: 'Blog', icon: FileText, desc: 'Blog post management' },
    { href: '/admin/settings', label: 'Settings', icon: Settings, desc: 'System configuration' },
    { href: '/upload-admin', label: 'Upload Admin', icon: Upload, desc: 'File management' },
  ]

  const teacherLinks = [
    { href: '/teach/dashboard', label: 'Teacher Dashboard', icon: BarChart3, desc: 'Teaching analytics' },
    { href: '/teach/upload', label: 'Upload Content', icon: Upload, desc: 'Upload teaching materials' },
    { href: '/teach/interactive', label: 'Interactive Tools', icon: BookOpen, desc: 'Teaching tools' },
    { href: '/teacher-access', label: 'Teacher Access', icon: Shield, desc: 'Teacher portal' },
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mt-4">Admin Quick Access</h1>
          <p className="text-muted-foreground mt-2">
            Development mode - All admin routes accessible for testing
          </p>
        </div>

        {/* User Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>User ID:</strong> {userId}</p>
              <p><strong>Role:</strong> {sessionClaims?.metadata?.role || sessionClaims?.publicMetadata?.role || 'No role set'}</p>
              <p className="text-sm text-muted-foreground">
                Note: In development mode, all admin routes are accessible regardless of role.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Admin Links */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {adminLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <link.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{link.label}</CardTitle>
                        <CardDescription className="text-xs">{link.desc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Teacher Links */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Teacher Panel</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teacherLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-600/10 flex items-center justify-center">
                        <link.icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{link.label}</CardTitle>
                        <CardDescription className="text-xs">{link.desc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Role Management Info */}
        <Card className="mt-8 border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="text-orange-800 dark:text-orange-200">
              Setting User Roles in Production
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>To properly set user roles in Clerk:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Go to the Clerk Dashboard</li>
              <li>Navigate to Users</li>
              <li>Select a user</li>
              <li>Click on "Edit" → "Public metadata"</li>
              <li>Add: <code className="bg-orange-100 dark:bg-orange-900 px-1 rounded">{"{ \"role\": \"admin\" }"}</code></li>
              <li>Save changes</li>
            </ol>
            <p className="mt-2">Available roles: <code>admin</code>, <code>teacher</code>, <code>student</code></p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}