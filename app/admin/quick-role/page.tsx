"use client"

import { useState, useEffect } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Shield, GraduationCap, User, Loader2 } from 'lucide-react'

export default function QuickRolePage() {
  const { userId } = useAuth()
  const { user, isLoaded } = useUser()
  const [currentRole, setCurrentRole] = useState<string>('student')
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (user) {
      const role = user.publicMetadata?.role as string || 'student'
      setCurrentRole(role)
    }
  }, [user])

  const updateRole = async (newRole: string) => {
    if (!userId) {
      toast.error('You must be logged in to change roles')
      return
    }

    setIsUpdating(true)
    try {
      const response = await fetch('/api/user/role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      })

      if (!response.ok) {
        throw new Error('Failed to update role')
      }

      const data = await response.json()
      setCurrentRole(newRole)
      
      // Update local user object
      if (user) {
        await user.reload()
      }
      
      toast.success(`Role updated to ${newRole}! Refreshing page...`)
      
      // Refresh after a short delay to allow metadata to propagate
      setTimeout(() => {
        window.location.reload()
      }, 1500)
      
    } catch (error) {
      console.error('Error updating role:', error)
      toast.error('Failed to update role. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  const roles = [
    {
      id: 'student',
      name: 'Student',
      description: 'Access courses, playground, and community features',
      icon: User,
      color: 'text-blue-600'
    },
    {
      id: 'teacher',
      name: 'Teacher',
      description: 'Upload content, create lessons, view analytics',
      icon: GraduationCap,
      color: 'text-green-600'
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'Full system access and user management',
      icon: Shield,
      color: 'text-red-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Quick Role Assignment</h1>
          <p className="text-muted-foreground">
            For development and testing purposes only
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Current Role</CardTitle>
            <CardDescription>
              Your account currently has the following role assigned
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {currentRole === 'admin' && <Shield className="h-5 w-5 text-red-600" />}
                  {currentRole === 'teacher' && <GraduationCap className="h-5 w-5 text-green-600" />}
                  {currentRole === 'student' && <User className="h-5 w-5 text-blue-600" />}
                </div>
                <div>
                  <p className="font-semibold capitalize">{currentRole}</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>
              <Badge variant={currentRole === 'admin' ? 'destructive' : 'default'}>
                {currentRole}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold mb-3">Switch Role</h2>
          
          {roles.map((role) => (
            <Card 
              key={role.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                currentRole === role.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => currentRole !== role.id && !isUpdating && updateRole(role.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-gray-100 rounded-lg ${role.color}`}>
                      <role.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{role.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {role.description}
                      </p>
                    </div>
                  </div>
                  {currentRole === role.id ? (
                    <Badge variant="outline">Current</Badge>
                  ) : (
                    <Button 
                      size="sm" 
                      disabled={isUpdating}
                      onClick={(e) => {
                        e.stopPropagation()
                        updateRole(role.id)
                      }}
                    >
                      {isUpdating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Switch'
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Note:</strong> This page is for development purposes. In production, 
            teacher roles should be requested through the proper application process.
          </p>
        </div>
      </div>
    </div>
  )
}