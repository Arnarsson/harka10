"use client"

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  getUserRole, 
  getUserDisplayRole, 
  canPromoteToTeacher, 
  type UserRole 
} from '@/lib/auth/roles'
import { GraduationCap, User, Settings, Shield, CheckCircle, Clock } from 'lucide-react'
import { toast } from 'sonner'

export function RoleSwitcher() {
  const { user, isLoaded } = useUser()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [teacherApplication, setTeacherApplication] = useState({
    experience: '',
    subjects: '',
    reason: ''
  })

  if (!isLoaded || !user) {
    return null
  }

  const currentRole = getUserRole(user)
  const displayRole = getUserDisplayRole(user)
  const canApplyForTeacher = canPromoteToTeacher(user)
  const isTeacherPending = user.publicMetadata?.teacherApplicationPending === true
  const isTeacherVerified = user.publicMetadata?.teacherVerified === true

  const handleTeacherApplication = async () => {
    if (!user || !teacherApplication.experience.trim() || !teacherApplication.reason.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Update user metadata to indicate pending teacher application
      await user.update({
        publicMetadata: {
          ...user.publicMetadata,
          teacherApplicationPending: true,
          teacherApplication: {
            ...teacherApplication,
            appliedAt: new Date().toISOString(),
            status: 'pending'
          }
        }
      })
      
      toast.success('Teacher application submitted! We\'ll review it soon.')
      setIsDialogOpen(false)
      setTeacherApplication({ experience: '', subjects: '', reason: '' })
      
      // TODO: Send notification to admins about new teacher application
      
    } catch (error) {
      console.error('Error submitting teacher application:', error)
      toast.error('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />
      case 'teacher': return <GraduationCap className="h-4 w-4" />
      default: return <User className="h-4 w-4" />
    }
  }

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'destructive'
      case 'teacher': return 'default'
      default: return 'secondary'
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          {getRoleIcon(currentRole)}
          <span>Account Role</span>
        </CardTitle>
        <CardDescription>
          Your current role determines what features you can access
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Current Role:</span>
          <Badge 
            variant={getRoleBadgeVariant(currentRole)} 
            className="flex items-center space-x-1"
          >
            {getRoleIcon(currentRole)}
            <span>{displayRole}</span>
          </Badge>
        </div>

        {/* Teacher Application Status */}
        {isTeacherPending && (
          <div className="flex items-center space-x-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <Clock className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-800 dark:text-yellow-200">
              Teacher application pending review
            </span>
          </div>
        )}

        {isTeacherVerified && currentRole === 'teacher' && (
          <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-800 dark:text-green-200">
              Verified teacher account
            </span>
          </div>
        )}

        {/* Teacher Application Button */}
        {canApplyForTeacher && !isTeacherPending && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <GraduationCap className="h-4 w-4 mr-2" />
                Apply to Become a Teacher
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Apply for Teacher Status</DialogTitle>
                <DialogDescription>
                  Tell us about your teaching experience and why you'd like to become a teacher on HARKA.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="experience">Teaching Experience *</Label>
                  <Textarea
                    id="experience"
                    placeholder="Describe your teaching or educational background..."
                    value={teacherApplication.experience}
                    onChange={(e) => setTeacherApplication(prev => ({ 
                      ...prev, 
                      experience: e.target.value 
                    }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="subjects">Subject Areas</Label>
                  <Textarea
                    id="subjects"
                    placeholder="What subjects or topics would you like to teach? (optional)"
                    value={teacherApplication.subjects}
                    onChange={(e) => setTeacherApplication(prev => ({ 
                      ...prev, 
                      subjects: e.target.value 
                    }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="reason">Why HARKA? *</Label>
                  <Textarea
                    id="reason"
                    placeholder="Why do you want to teach on HARKA? What value would you bring?"
                    value={teacherApplication.reason}
                    onChange={(e) => setTeacherApplication(prev => ({ 
                      ...prev, 
                      reason: e.target.value 
                    }))}
                    className="mt-1"
                  />
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button 
                    onClick={handleTeacherApplication}
                    disabled={isSubmitting || !teacherApplication.experience.trim() || !teacherApplication.reason.trim()}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        <div className="text-xs text-muted-foreground">
          <p><strong>Student:</strong> Access courses, playground, and community features</p>
          <p><strong>Teacher:</strong> Upload content, create interactive lessons, view analytics</p>
          <p><strong>Admin:</strong> Full system access and user management</p>
        </div>
      </CardContent>
    </Card>
  )
}