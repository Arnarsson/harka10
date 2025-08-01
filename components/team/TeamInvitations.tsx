'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { 
  Send, 
  UserPlus, 
  Mail, 
  Shield, 
  Users,
  Check,
  X,
  Loader2
} from 'lucide-react'

interface TeamMember {
  id: string
  email: string
  name?: string
  role: 'admin' | 'instructor' | 'student'
  status: 'pending' | 'active'
  invitedAt: Date
  joinedAt?: Date
}

export function TeamInvitations() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'admin' | 'instructor' | 'student'>('student')
  const [isInviting, setIsInviting] = useState(false)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    // Mock data for demonstration
    {
      id: '1',
      email: 'instructor@harka.dk',
      name: 'Anna Nielsen',
      role: 'instructor',
      status: 'active',
      invitedAt: new Date('2024-12-01'),
      joinedAt: new Date('2024-12-02'),
    },
    {
      id: '2',
      email: 'student@example.com',
      role: 'student',
      status: 'pending',
      invitedAt: new Date('2024-12-10'),
    },
  ])
  const { toast } = useToast()

  const handleInvite = async () => {
    if (!email || !email.includes('@')) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      })
      return
    }

    setIsInviting(true)

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      const newMember: TeamMember = {
        id: Date.now().toString(),
        email,
        role,
        status: 'pending',
        invitedAt: new Date(),
      }

      setTeamMembers([...teamMembers, newMember])
      setEmail('')
      
      toast({
        title: 'Invitation sent!',
        description: `An invitation has been sent to ${email}`,
      })
    } catch (error) {
      toast({
        title: 'Failed to send invitation',
        description: 'Please try again later',
        variant: 'destructive',
      })
    } finally {
      setIsInviting(false)
    }
  }

  const handleResendInvite = async (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId)
    if (!member) return

    toast({
      title: 'Invitation resent',
      description: `A new invitation has been sent to ${member.email}`,
    })
  }

  const handleRemoveMember = async (memberId: string) => {
    setTeamMembers(teamMembers.filter(m => m.id !== memberId))
    toast({
      title: 'Member removed',
      description: 'The team member has been removed',
    })
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'instructor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'student':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return ''
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-6">
      {/* Invite New Member */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite Team Member
          </CardTitle>
          <CardDescription>
            Send an invitation to join your HARKA AI training team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="colleague@company.dk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value: any) => setRole(value)}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Student
                      </div>
                    </SelectItem>
                    <SelectItem value="instructor">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Instructor
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-red-500" />
                        Admin
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button 
              onClick={handleInvite} 
              disabled={isInviting}
              className="w-full md:w-auto"
            >
              {isInviting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending invitation...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Invitation
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members
          </CardTitle>
          <CardDescription>
            Manage your team members and pending invitations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No team members yet. Send your first invitation above!
              </p>
            ) : (
              teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {member.name || member.email}
                      </p>
                      <Badge className={getRoleBadgeColor(member.role)}>
                        {member.role}
                      </Badge>
                      <Badge className={getStatusBadgeColor(member.status)}>
                        {member.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      {member.email}
                      {member.status === 'pending' && (
                        <span className="ml-2">
                          • Invited {member.invitedAt.toLocaleDateString()}
                        </span>
                      )}
                      {member.status === 'active' && member.joinedAt && (
                        <span className="ml-2">
                          • Joined {member.joinedAt.toLocaleDateString()}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {member.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResendInvite(member.id)}
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Resend
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}