'use client'

import { useState } from 'react'
import { UserProfile } from '@/components/profile/user-profile'
import { PageTransition } from '@/components/layout/page-transition'
import { useAuth } from '@/lib/auth/hooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// Mock data for demo
const mockUserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/api/placeholder/150/150',
  bio: 'Passionate learner and software developer. Always eager to explore new technologies and share knowledge with the community.',
  location: 'San Francisco, CA',
  website: 'https://johndoe.dev',
  linkedin: 'https://linkedin.com/in/johndoe',
  github: 'https://github.com/johndoe',
  twitter: 'https://twitter.com/johndoe',
  role: 'student',
  joinedDate: '2024-01-15',
  stats: {
    coursesCompleted: 12,
    certificatesEarned: 8,
    learningHours: 156,
    currentStreak: 15
  },
  certificates: [
    {
      id: '1',
      title: 'Advanced React Development',
      courseName: 'React Mastery Course',
      issueDate: '2024-03-15',
      imageUrl: '/api/placeholder/400/280',
      skills: ['React', 'TypeScript', 'Next.js'],
      verified: true,
      viewCount: 234
    },
    {
      id: '2',
      title: 'Node.js Backend Development',
      courseName: 'Full Stack JavaScript',
      issueDate: '2024-02-28',
      imageUrl: '/api/placeholder/400/280',
      skills: ['Node.js', 'Express', 'MongoDB'],
      verified: true,
      viewCount: 189
    },
    {
      id: '3',
      title: 'Machine Learning Fundamentals',
      courseName: 'AI & ML Bootcamp',
      issueDate: '2024-01-20',
      skills: ['Python', 'TensorFlow', 'Scikit-learn'],
      verified: true,
      viewCount: 312
    }
  ]
}

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [profileData, setProfileData] = useState(mockUserProfile)

  useEffect(() => {
    // In a real app, fetch user profile data based on auth user
    if (user) {
      setProfileData({
        ...mockUserProfile,
        name: user.full_name || user.email,
        email: user.email
      })
    }
  }, [user])

  const handleProfileUpdate = (data: any) => {
    setProfileData({ ...profileData, ...data })
    // In a real app, save to backend
    console.log('Profile updated:', data)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-black" />
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <UserProfile
            user={profileData}
            isOwnProfile={true}
            onUpdate={handleProfileUpdate}
          />
        </div>
      </div>
    </PageTransition>
  )
}