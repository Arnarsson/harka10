import { createClient } from '@/lib/supabase/client'

export interface DashboardOverview {
  greeting: string
  plan: string
  overallProgress: number
  progressChange: number
  activeTeamMembers: number
  teamMemberChange: number
  avgCompletionWeeks: number
  completionChange: number
  certificatesEarned: number
  certificatesChange: number
  phaseProgress: {
    fundamentals: number
    ethics: number
    implementation: number
  }
  topPerformers: Array<{
    id: string
    name: string
    avatarUrl: string
    role: string
    progress: number
    modulesCompleted: number
  }>
  recentActivities: Array<{
    id: string
    type: string
    title: string
    description: string
    metadata: any
    createdAt: string
  }>
  upcomingDeadlines: Array<{
    id: string
    title: string
    description: string
    type: string
    priority: 'low' | 'medium' | 'high'
    dueDate: string
  }>
}

export interface LearningModule {
  id: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  phase: 'fundamentals' | 'ethics' | 'implementation'
  duration: number
  learnerCount: number
  progress?: number
  status: 'completed' | 'in-progress' | 'locked'
  nextLesson?: string
}

export interface TeamAnalytics {
  progressByPhase: {
    phase: string
    completed: number
    total: number
  }[]
  departmentDistribution: {
    department: string
    percentage: number
  }[]
}

export async function getDashboardOverview(userId: string): Promise<DashboardOverview> {
  const supabase = createClient()

  try {
    // Call the database function
    const { data, error } = await supabase
      .rpc('get_dashboard_overview', { p_user_id: userId })
      .single()

    if (error) throw error

    // Get user's name for greeting
    const { data: userData } = await supabase
      .from('user_profiles')
      .select('full_name')
      .eq('id', userId)
      .single()

    const firstName = userData?.full_name?.split(' ')[0] || 'there'
    const greeting = getGreeting(firstName)

    return {
      greeting,
      plan: 'Premium Plan',
      overallProgress: data.overall_progress || 0,
      progressChange: data.progress_change || 0,
      activeTeamMembers: data.active_team_members || 0,
      teamMemberChange: data.team_member_change || 0,
      avgCompletionWeeks: data.avg_completion_weeks || 0,
      completionChange: data.completion_change || 0,
      certificatesEarned: data.certificates_earned || 0,
      certificatesChange: data.certificates_change || 0,
      phaseProgress: data.phase_progress || {
        fundamentals: 0,
        ethics: 0,
        implementation: 0
      },
      topPerformers: data.top_performers || [],
      recentActivities: data.recent_activities || [],
      upcomingDeadlines: data.upcoming_deadlines || []
    }
  } catch (error) {
    console.error('Error fetching dashboard overview:', error)
    // Return mock data for demo
    return getMockDashboardData(firstName)
  }
}

export async function getLearningModules(userId: string): Promise<LearningModule[]> {
  // For now, return mock data
  return [
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      description: 'Understand the fundamentals of ML algorithms and their business applications',
      level: 'beginner',
      phase: 'fundamentals',
      duration: 45,
      learnerCount: 1247,
      progress: 100,
      status: 'completed'
    },
    {
      id: '2',
      title: 'AI Ethics in Practice',
      description: 'Learn ethical considerations and bias mitigation strategies',
      level: 'intermediate',
      phase: 'ethics',
      duration: 60,
      learnerCount: 892,
      progress: 75,
      status: 'in-progress',
      nextLesson: 'Regulatory Compliance'
    },
    {
      id: '3',
      title: 'Project Planning for AI Implementation',
      description: 'Step-by-step guide to planning and executing AI projects',
      level: 'advanced',
      phase: 'implementation',
      duration: 90,
      learnerCount: 634,
      status: 'in-progress'
    },
    {
      id: '4',
      title: 'Advanced Neural Networks',
      description: 'Deep dive into complex neural network architectures',
      level: 'advanced',
      phase: 'fundamentals',
      duration: 120,
      learnerCount: 456,
      status: 'locked'
    }
  ]
}

export async function getTeamAnalytics(teamId: string): Promise<TeamAnalytics> {
  return {
    progressByPhase: [
      { phase: 'Fundamentals', completed: 18, total: 24 },
      { phase: 'Ethics', completed: 12, total: 24 },
      { phase: 'Implementation', completed: 6, total: 24 }
    ],
    departmentDistribution: [
      { department: 'Engineering', percentage: 35 },
      { department: 'Marketing', percentage: 25 },
      { department: 'Sales', percentage: 20 },
      { department: 'HR', percentage: 20 }
    ]
  }
}

function getGreeting(name: string): string {
  const hour = new Date().getHours()
  let greeting = ''
  
  if (hour < 12) {
    greeting = 'Good morning'
  } else if (hour < 18) {
    greeting = 'Good afternoon'
  } else {
    greeting = 'Good evening'
  }
  
  return `${greeting}, ${name}! 👋`
}

function getMockDashboardData(firstName: string): DashboardOverview {
  return {
    greeting: getGreeting(firstName),
    plan: 'Premium Plan',
    overallProgress: 73,
    progressChange: 12,
    activeTeamMembers: 24,
    teamMemberChange: 3,
    avgCompletionWeeks: 5.2,
    completionChange: -0.8,
    certificatesEarned: 18,
    certificatesChange: 6,
    phaseProgress: {
      fundamentals: 100,
      ethics: 85,
      implementation: 35
    },
    topPerformers: [
      {
        id: '1',
        name: 'Sarah Johnson',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        role: 'Senior Developer',
        progress: 95,
        modulesCompleted: 12
      },
      {
        id: '2',
        name: 'Erik Lindqvist',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        role: 'Product Manager',
        progress: 88,
        modulesCompleted: 10
      },
      {
        id: '3',
        name: 'Anna Svensson',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        role: 'Data Scientist',
        progress: 82,
        modulesCompleted: 9
      }
    ],
    recentActivities: [
      {
        id: '1',
        type: 'course_completed',
        title: 'Completed ML Fundamentals',
        description: 'Earned certificate with 95% score',
        metadata: {},
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        type: 'comment',
        title: 'Sarah commented on your prompt',
        description: 'Customer service automation template',
        metadata: { userId: '1', userName: 'Sarah Johnson' },
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        type: 'team_joined',
        title: 'New team member joined',
        description: 'Erik Lindqvist joined your organization',
        metadata: { userId: '2' },
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    upcomingDeadlines: [
      {
        id: '1',
        title: 'Ethics Assessment',
        description: 'Complete ethical framework evaluation',
        type: 'assessment',
        priority: 'high',
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        title: 'Team Workshop',
        description: 'AI Implementation Planning session',
        type: 'workshop',
        priority: 'medium',
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  }
}