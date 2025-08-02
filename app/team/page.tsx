'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Shield, 
  GraduationCap, 
  User,
  Clock,
  CheckCircle,
  Send,
  MoreHorizontal,
  Activity
} from 'lucide-react';
import { useLanguage } from '@/lib/language';

export default function TeamPage() {
  const { t } = useLanguage();
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('student');
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: 'Anna Nielsen',
      email: 'anna@example.com',
      role: 'admin',
      status: 'active',
      joinedDate: '2024-01-15',
      lastActive: '2 minutes ago',
      progress: 85,
      avatar: 'AN'
    },
    {
      id: 2,
      name: 'Lars Hansen',
      email: 'lars@example.com',
      role: 'instructor',
      status: 'active',
      joinedDate: '2024-02-01',
      lastActive: '1 hour ago',
      progress: 92,
      avatar: 'LH'
    },
    {
      id: 3,
      name: 'Sofia Andersen',
      email: 'sofia@example.com',
      role: 'student',
      status: 'active',
      joinedDate: '2024-02-10',
      lastActive: '3 hours ago',
      progress: 67,
      avatar: 'SA'
    }
  ];

  const pendingInvites = [
    {
      id: 1,
      email: 'erik@example.com',
      role: 'student',
      sentDate: '2024-08-01',
      status: 'pending'
    },
    {
      id: 2,
      email: 'maria@example.com',
      role: 'instructor',
      sentDate: '2024-07-30',
      status: 'pending'
    }
  ];

  const roleConfig = {
    admin: {
      icon: Shield,
      color: 'bg-red-100 text-red-800',
      label: 'Administrator'
    },
    instructor: {
      icon: GraduationCap,
      color: 'bg-blue-100 text-blue-800',
      label: 'Instructor'
    },
    student: {
      icon: User,
      color: 'bg-green-100 text-green-800',
      label: 'Student'
    }
  };

  const handleSendInvite = () => {
    // TODO: Implement actual invite sending
    console.log('Sending invite to:', inviteEmail, 'as', inviteRole);
    setInviteEmail('');
    setInviteRole('student');
    setIsInviteOpen(false);
  };

  const RoleIcon = ({ role }: { role: keyof typeof roleConfig }) => {
    const Icon = roleConfig[role].icon;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-2">Manage your team members and collaborate on learning</p>
        </div>
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your learning team
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Role</label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSendInvite} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">Active learners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingInvites.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">81%</div>
            <p className="text-xs text-muted-foreground">Team completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Now</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="invites">Pending Invites</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <div className="grid gap-4">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {member.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={roleConfig[member.role as keyof typeof roleConfig].color}>
                            <RoleIcon role={member.role as keyof typeof roleConfig} />
                            <span className="ml-1">{roleConfig[member.role as keyof typeof roleConfig].label}</span>
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {member.lastActive}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{member.progress}% Complete</div>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{width: `${member.progress}%`}}
                        ></div>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Invites Tab */}
        <TabsContent value="invites" className="space-y-4">
          <div className="grid gap-4">
            {pendingInvites.map((invite) => (
              <Card key={invite.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{invite.email}</h3>
                        <p className="text-sm text-gray-600">Invited as {invite.role}</p>
                        <p className="text-xs text-gray-500">Sent on {invite.sentDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                      <Button variant="outline" size="sm">
                        Resend
                      </Button>
                      <Button variant="ghost" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Different roles have different access levels within the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    <h4 className="font-medium">Administrator</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Full access to all features</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Manage team members and invitations</li>
                    <li>• Access all courses and content</li>
                    <li>• View analytics and reports</li>
                    <li>• Configure platform settings</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium">Instructor</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Can teach and guide students</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Access all learning content</li>
                    <li>• View student progress</li>
                    <li>• Create and assign tasks</li>
                    <li>• Moderate discussions</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-5 h-5 text-green-600" />
                    <h4 className="font-medium">Student</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Focused on learning and growth</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Access assigned courses</li>
                    <li>• Complete lessons and quizzes</li>
                    <li>• Participate in discussions</li>
                    <li>• Track personal progress</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}