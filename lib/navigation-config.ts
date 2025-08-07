import { Play, Users, Code, Zap, BookOpen, BarChart3, Settings, Wrench, GraduationCap } from 'lucide-react'

export interface NavigationItem {
  title: string
  href: string
  description?: string
  icon: any
  badge?: string
  category: 'learning' | 'interactive' | 'community' | 'tools' | 'teacher'
  isNew?: boolean
  isLive?: boolean
}

export const navigationItems: NavigationItem[] = [
  // Learning Core
  {
    title: 'Dashboard',
    href: '/learn/dashboard',
    description: 'Your learning progress and overview',
    icon: BarChart3,
    category: 'learning'
  },
  {
    title: 'Courses',
    href: '/learn/courses',
    description: 'Browse and continue your courses',
    icon: BookOpen,
    category: 'learning'
  },
  
  // Interactive Features (NEW)
  {
    title: 'Interactive Learning',
    href: '/demo/interactive-learning',
    description: 'Experience AI-powered interactive lessons',
    icon: Play,
    badge: 'NEW',
    category: 'interactive',
    isNew: true
  },
  {
    title: 'Code Playground',
    href: '/learn/playground',
    description: 'Practice coding in real-time',
    icon: Code,
    badge: 'LIVE',
    category: 'interactive',
    isLive: true
  },
  {
    title: 'Power Hour',
    href: '/community/power-hour',
    description: 'Join live collaborative learning sessions',
    icon: Zap,
    badge: 'LIVE',
    category: 'community',
    isLive: true
  },

  // Community
  {
    title: 'Discussion',
    href: '/learn/discussion',
    description: 'Connect with other learners',
    icon: Users,
    category: 'community'
  },

  // Tools
  {
    title: 'Analytics',
    href: '/analytics',
    description: 'Track your learning progress',
    icon: BarChart3,
    category: 'tools'
  },
  {
    title: 'Toolkit',
    href: '/toolkit',
    description: 'Essential learning resources',
    icon: Wrench,
    category: 'tools'
  },

  // Teacher Features (for role-based display)
  {
    title: 'Teach Dashboard',
    href: '/teach/dashboard',
    description: 'Manage your teaching content',
    icon: GraduationCap,
    badge: 'TEACHER',
    category: 'teacher'
  }
]

export const getNavigationByCategory = (categories: string[]) => {
  return navigationItems.filter(item => categories.includes(item.category))
}

export const getFeaturedInteractiveItems = () => {
  return navigationItems.filter(item => 
    item.category === 'interactive' || 
    (item.category === 'community' && item.isLive)
  )
}