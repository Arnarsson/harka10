'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { 
  Users, Award, Clock, TrendingUp, BookOpen, Target, 
  Calendar, MessageSquare, ArrowRight, ChevronRight,
  BarChart3, PieChart, Activity
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedCard } from '@/components/ui/animated-card'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { SkeletonCard } from '@/components/ui/skeleton-loader'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { useAuth } from '@/lib/auth/hooks'
import { getDashboardOverview, getLearningModules, getTeamAnalytics } from '@/lib/services/dashboard'
import type { DashboardOverview, LearningModule, TeamAnalytics } from '@/lib/services/dashboard'

export function DashboardOverviewEnhanced() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DashboardOverview | null>(null)
  const [modules, setModules] = useState<LearningModule[]>([])
  const [teamAnalytics, setTeamAnalytics] = useState<TeamAnalytics | null>(null)

  useEffect(() => {
    if (user?.id) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    try {
      const [dashboardData, modulesData, analyticsData] = await Promise.all([
        getDashboardOverview(user!.id),
        getLearningModules(user!.id),
        getTeamAnalytics(user!.metadata?.team_id || 'default')
      ])
      
      setData(dashboardData)
      setModules(modulesData)
      setTeamAnalytics(analyticsData)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (!data) return null

  const stats = [
    {
      title: 'Overall Progress',
      value: data.overallProgress,
      suffix: '%',
      change: `${data.progressChange > 0 ? '+' : ''}${data.progressChange}%`,
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Team Members',
      value: data.activeTeamMembers,
      change: `${data.teamMemberChange > 0 ? '+' : ''}${data.teamMemberChange}`,
      subtitle: 'Active learners',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Avg. Completion Time',
      value: data.avgCompletionWeeks,
      suffix: ' weeks',
      change: `${data.completionChange} weeks`,
      subtitle: 'Per phase',
      icon: Clock,
      color: 'text-purple-600'
    },
    {
      title: 'Certificates Earned',
      value: data.certificatesEarned,
      change: `${data.certificatesChange > 0 ? '+' : ''}${data.certificatesChange}`,
      subtitle: 'This month',
      icon: Award,
      color: 'text-yellow-600'
    }
  ]

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* Greeting */}
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-bold">{data.greeting}</h1>
        <p className="text-zinc-600">Here's your AI training progress overview</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div key={stat.title} variants={staggerItem}>
            <AnimatedCard>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-zinc-100`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-green-600' : 
                    stat.change.startsWith('-') ? 'text-red-600' : 'text-zinc-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-zinc-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  {stat.subtitle && (
                    <p className="text-xs text-zinc-500 mt-1">{stat.subtitle}</p>
                  )}
                </div>
              </div>
            </AnimatedCard>
          </motion.div>
        ))}
      </div>

      {/* Learning Phase Progress */}
      <motion.div variants={staggerItem}>
        <AnimatedCard>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Learning Phase Progress</h2>
              <span className="text-sm text-zinc-600">Updated 2 min ago</span>
            </div>
            <div className="space-y-4">
              {Object.entries(data.phaseProgress).map(([phase, progress]) => (
                <div key={phase} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">{phase}</span>
                    <span className="text-sm text-zinc-600">
                      {progress === 100 ? 'Completed' : 'In Progress'} • {progress}%
                    </span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-2 rounded-full ${
                        progress === 100 ? 'bg-green-600' : 'bg-black'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedCard>
      </motion.div>

      {/* Learning Modules */}
      <motion.div variants={staggerItem}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Learning Modules</h2>
          <Link 
            href="/learning" 
            className="text-sm text-zinc-600 hover:text-black transition-colors flex items-center gap-1"
          >
            View All Modules
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((module) => (
            <AnimatedCard key={module.id} hover>
              <Link href={`/learning/${module.id}`}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen size={20} />
                        <span className="text-xs px-2 py-1 bg-zinc-100 rounded-full capitalize">
                          {module.phase}
                        </span>
                        <span className="text-xs px-2 py-1 bg-zinc-100 rounded-full capitalize">
                          {module.level}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-1">{module.title}</h3>
                      <p className="text-sm text-zinc-600 line-clamp-2">{module.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-zinc-600">
                      <span>{module.duration} min</span>
                      <span>{module.learnerCount.toLocaleString()} learners</span>
                    </div>
                    {module.status === 'completed' && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-medium">Completed</span>
                        <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Score {module.progress}%
                        </div>
                      </div>
                    )}
                    {module.status === 'in-progress' && (
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-600">Progress {module.progress}%</span>
                        {module.nextLesson && (
                          <span className="text-xs text-zinc-500">Next: {module.nextLesson}</span>
                        )}
                      </div>
                    )}
                    {module.status === 'locked' && (
                      <span className="text-zinc-400">Locked</span>
                    )}
                  </div>
                  {module.status !== 'locked' && (
                    <motion.div 
                      className="mt-4 flex items-center gap-2 text-sm font-medium"
                      whileHover={{ x: 4 }}
                    >
                      {module.status === 'completed' ? 'Review' : 'Continue'}
                      <ChevronRight size={16} />
                    </motion.div>
                  )}
                </div>
              </Link>
            </AnimatedCard>
          ))}
        </div>
      </motion.div>

      {/* Team Analytics and Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Analytics */}
        <motion.div variants={staggerItem}>
          <AnimatedCard>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Team Analytics</h2>
                <Link 
                  href="/analytics" 
                  className="text-sm text-zinc-600 hover:text-black transition-colors"
                >
                  View Full Report
                </Link>
              </div>
              
              {/* Progress by Phase */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Team Progress by Phase</h3>
                <div className="space-y-3">
                  {teamAnalytics?.progressByPhase.map((item) => (
                    <div key={item.phase} className="flex items-center justify-between">
                      <span className="text-sm">{item.phase}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-zinc-200 rounded-full h-2">
                          <div 
                            className="bg-black rounded-full h-2"
                            style={{ width: `${(item.completed / item.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-zinc-600">
                          {item.completed}/{item.total} completed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Distribution */}
              <div>
                <h3 className="text-sm font-medium mb-3">Department Distribution</h3>
                <div className="grid grid-cols-2 gap-3">
                  {teamAnalytics?.departmentDistribution.map((dept) => (
                    <div key={dept.department} className="flex items-center justify-between">
                      <span className="text-sm">{dept.department}</span>
                      <span className="text-sm font-medium">{dept.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedCard>
        </motion.div>

        {/* Top Performers */}
        <motion.div variants={staggerItem}>
          <AnimatedCard>
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-6">Top Performers</h2>
              <div className="space-y-4">
                {data.topPerformers.map((performer, index) => (
                  <div key={performer.id} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-zinc-100 rounded-full text-sm font-medium">
                      #{index + 1}
                    </div>
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-200">
                      <Image
                        src={performer.avatarUrl}
                        alt={performer.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{performer.name}</p>
                      <p className="text-sm text-zinc-600">{performer.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Progress {performer.progress}%</p>
                      <p className="text-sm text-zinc-600">{performer.modulesCompleted} modules</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedCard>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={staggerItem}>
        <AnimatedCard>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {data.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'course_completed' ? 'bg-green-100' :
                    activity.type === 'comment' ? 'bg-blue-100' :
                    'bg-zinc-100'
                  }`}>
                    {activity.type === 'course_completed' && <Award size={16} className="text-green-600" />}
                    {activity.type === 'comment' && <MessageSquare size={16} className="text-blue-600" />}
                    {activity.type === 'team_joined' && <Users size={16} className="text-zinc-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-zinc-600">{activity.description}</p>
                  </div>
                  <span className="text-sm text-zinc-500">
                    {getRelativeTime(activity.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedCard>
      </motion.div>

      {/* Upcoming Deadlines */}
      <motion.div variants={staggerItem}>
        <AnimatedCard>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">Upcoming Deadlines</h2>
            <div className="space-y-4">
              {data.upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    deadline.priority === 'high' ? 'bg-red-100' :
                    deadline.priority === 'medium' ? 'bg-yellow-100' :
                    'bg-zinc-100'
                  }`}>
                    <Calendar size={16} className={
                      deadline.priority === 'high' ? 'text-red-600' :
                      deadline.priority === 'medium' ? 'text-yellow-600' :
                      'text-zinc-600'
                    } />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{deadline.title}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        deadline.priority === 'high' ? 'bg-red-100 text-red-800' :
                        deadline.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-zinc-100 text-zinc-800'
                      }`}>
                        {deadline.priority}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600">{deadline.description}</p>
                    <p className="text-sm text-zinc-600 mt-1">
                      {deadline.type} • Due {getRelativeTime(deadline.dueDate)}
                    </p>
                  </div>
                  <Link 
                    href={`/deadlines/${deadline.id}`}
                    className="text-sm text-zinc-600 hover:text-black transition-colors"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </AnimatedCard>
      </motion.div>
    </motion.div>
  )
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMs < 0) {
    // Future date
    const futureDiffMs = Math.abs(diffMs)
    const futureDiffDays = Math.floor(futureDiffMs / (1000 * 60 * 60 * 24))
    if (futureDiffDays === 0) return 'Tomorrow'
    if (futureDiffDays === 1) return 'Tomorrow'
    return `in ${futureDiffDays} days`
  }

  if (diffHours < 1) return 'Just now'
  if (diffHours === 1) return '1 hour ago'
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return date.toLocaleDateString()
}