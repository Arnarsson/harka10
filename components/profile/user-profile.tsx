'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Camera, 
  Edit2, 
  Mail, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github,
  Twitter,
  Check,
  X,
  Award,
  BookOpen,
  Clock,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { CertificateCard } from '@/components/certificates/CertificateCard'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface UserProfileData {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
  linkedin?: string
  github?: string
  twitter?: string
  role: string
  joinedDate: string
  stats: {
    coursesCompleted: number
    certificatesEarned: number
    learningHours: number
    currentStreak: number
  }
  certificates: Array<{
    id: string
    title: string
    courseName: string
    issueDate: string
    imageUrl?: string
    skills: string[]
    verified: boolean
    viewCount?: number
  }>
}

interface UserProfileProps {
  user: UserProfileData
  isOwnProfile?: boolean
  onUpdate?: (data: Partial<UserProfileData>) => void
}

export function UserProfile({ user, isOwnProfile = false, onUpdate }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(user)
  const [activeTab, setActiveTab] = useState<'overview' | 'certificates' | 'activity'>('overview')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editData)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(user)
    setIsEditing(false)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditData({ ...editData, avatar: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const stats = [
    {
      label: 'Courses Completed',
      value: user.stats.coursesCompleted,
      icon: <BookOpen className="h-5 w-5" />,
      color: 'text-blue-600'
    },
    {
      label: 'Certificates Earned',
      value: user.stats.certificatesEarned,
      icon: <Award className="h-5 w-5" />,
      color: 'text-purple-600'
    },
    {
      label: 'Learning Hours',
      value: user.stats.learningHours,
      icon: <Clock className="h-5 w-5" />,
      color: 'text-green-600'
    },
    {
      label: 'Current Streak',
      value: user.stats.currentStreak,
      suffix: ' days',
      icon: <Target className="h-5 w-5" />,
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6 mb-6"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
              {editData.avatar ? (
                <Image
                  src={editData.avatar}
                  alt={editData.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
                  {editData.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="h-8 w-8 text-white" />
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                {isEditing ? (
                  <Input
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="text-2xl font-bold"
                    placeholder="Your name"
                  />
                ) : (
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                )}
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>
              </div>
              
              {isOwnProfile && (
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="gap-2"
                      >
                        <Check className="h-4 w-4" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      className="gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Bio */}
            {isEditing ? (
              <Textarea
                value={editData.bio || ''}
                onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            ) : (
              user.bio && <p className="text-gray-700">{user.bio}</p>
            )}

            {/* Details */}
            <div className="flex flex-wrap gap-4 text-sm">
              {(isEditing || user.location) && (
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {isEditing ? (
                    <Input
                      value={editData.location || ''}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                      placeholder="Location"
                      className="h-7 text-sm"
                    />
                  ) : (
                    <span>{user.location}</span>
                  )}
                </div>
              )}

              {(isEditing || user.website) && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Globe className="h-4 w-4" />
                  {isEditing ? (
                    <Input
                      value={editData.website || ''}
                      onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                      placeholder="Website"
                      className="h-7 text-sm"
                    />
                  ) : (
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {user.website}
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {(isEditing || user.linkedin) && (
                <a
                  href={isEditing ? '#' : user.linkedin}
                  target={isEditing ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isEditing ? "bg-gray-100" : "hover:bg-gray-100"
                  )}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {(isEditing || user.github) && (
                <a
                  href={isEditing ? '#' : user.github}
                  target={isEditing ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isEditing ? "bg-gray-100" : "hover:bg-gray-100"
                  )}
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {(isEditing || user.twitter) && (
                <a
                  href={isEditing ? '#' : user.twitter}
                  target={isEditing ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isEditing ? "bg-gray-100" : "hover:bg-gray-100"
                  )}
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={cn("mx-auto mb-2", stat.color)}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <div className="flex gap-8 px-6">
            {['overview', 'certificates', 'activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "py-4 border-b-2 transition-colors capitalize",
                  activeTab === tab
                    ? "border-black text-black"
                    : "border-transparent text-gray-600 hover:text-black"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Certificates Earned</h2>
                <span className="text-sm text-gray-600">
                  {user.certificates.length} certificates
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.certificates.map((cert) => (
                  <CertificateCard
                    key={cert.id}
                    certificate={cert}
                    onView={() => console.log('View certificate', cert.id)}
                    onShare={() => console.log('Share certificate', cert.id)}
                    onDownload={() => console.log('Download certificate', cert.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="prose max-w-none">
              <p className="text-gray-600">
                Member since {new Date(user.joinedDate).toLocaleDateString()}
              </p>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="text-center py-12 text-gray-500">
              Activity feed coming soon...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}