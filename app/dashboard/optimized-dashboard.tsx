"use client"

import { lazy, Suspense, useMemo } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { AnimatedCard } from "@/components/ui/animated/animated-card"
import { GradientButton } from "@/components/ui/animated/animated-button"
import { CardSkeleton } from "@/components/ui/skeleton-loaders/dashboard-skeleton"
import { motion } from "framer-motion"
import { 
  BookOpen, Brain, Users, BarChart, PlayCircle, Upload, Shield, 
  Compass, Zap, Target, FileText, Settings, GraduationCap, Code, 
  Sparkles, Video, MessageSquare, Award, TrendingUp, Clock, Star
} from "lucide-react"

// Lazy load heavy components
const Card = dynamic(() => import("@/components/ui/card").then(mod => ({ default: mod.Card })))
const Button = dynamic(() => import("@/components/ui/button").then(mod => ({ default: mod.Button })))

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100
    }
  }
}

// Stat Card Component with animation
function StatCard({ title, value, icon: Icon, color, trend }: any) {
  return (
    <AnimatedCard className="relative overflow-hidden" hover>
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className={`w-full h-full ${color} rounded-full blur-3xl`} />
      </div>
      <div className="p-6 relative">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <Icon className={`h-5 w-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <p className="text-3xl font-bold gradient-text">{value}</p>
        {trend && (
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
            <span className="text-emerald-500">{trend}%</span>
            <span className="text-muted-foreground ml-1">vs last week</span>
          </div>
        )}
      </div>
    </AnimatedCard>
  )
}

// Feature Card Component with glassmorphism
function FeatureCard({ href, label, icon: Icon, description, color, badge }: any) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="h-full"
      >
        <div className="card-modern glass h-full p-6 group cursor-pointer hover:shadow-xl hover:shadow-purple-500/10 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
              <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            {badge && (
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                {badge}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-gradient transition-all">
            {label}
          </h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}

export function OptimizedDashboard() {
  const { user, isLoaded } = useUser()
  
  // Memoize role checks
  const { isAdmin, isTeacher } = useMemo(() => ({
    isAdmin: user?.publicMetadata?.role === 'admin',
    isTeacher: user?.publicMetadata?.role === 'teacher' || user?.publicMetadata?.role === 'admin'
  }), [user])

  const stats = [
    { title: "Active Courses", value: "3", icon: BookOpen, color: "bg-blue-500", trend: 12 },
    { title: "Hours Learned", value: "24", icon: Clock, color: "bg-purple-500", trend: 8 },
    { title: "Certificates", value: "2", icon: Award, color: "bg-emerald-500", trend: 0 },
    { title: "Community Points", value: "150", icon: Star, color: "bg-orange-500", trend: 25 },
  ]

  const sections = [
    {
      title: "🎓 Learning Hub",
      description: "Your personalized learning journey",
      cards: [
        { href: "/learn/courses", label: "My Courses", icon: BookOpen, description: "Continue your learning journey", color: "bg-blue-500", badge: "3 Active" },
        { href: "/learn/ai-kompas", label: "AI Compass", icon: Compass, description: "Get personalized recommendations", color: "bg-purple-500", badge: "NEW" },
        { href: "/learn/playground", label: "Code Playground", icon: Code, description: "Practice coding in real-time", color: "bg-green-500" },
        { href: "/demo/interactive-learning", label: "Interactive Lessons", icon: PlayCircle, description: "Hands-on learning experiences", color: "bg-indigo-500" },
      ]
    },
    {
      title: "👥 Community",
      description: "Connect and collaborate with peers",
      cards: [
        { href: "/community/power-hour", label: "Power Hour", icon: Zap, description: "Live collaborative sessions", color: "bg-yellow-500", badge: "LIVE" },
        { href: "/learn/discussion", label: "Discussions", icon: MessageSquare, description: "Ask questions and share insights", color: "bg-pink-500" },
        { href: "/team", label: "Teams", icon: Users, description: "Collaborate with your team", color: "bg-orange-500" },
      ]
    },
    {
      title: "📊 Analytics & Tools",
      description: "Track your progress and achievements",
      cards: [
        { href: "/analytics", label: "Analytics", icon: BarChart, description: "View your learning metrics", color: "bg-cyan-500" },
        { href: "/toolkit", label: "Toolkit", icon: Target, description: "Essential learning resources", color: "bg-teal-500" },
        { href: "/learn/certificates", label: "Certificates", icon: Award, description: "Your achievements", color: "bg-emerald-500", badge: "2 Earned" },
        { href: "/learn/resources", label: "Resources", icon: FileText, description: "Learning materials", color: "bg-lime-500" },
      ]
    },
  ]

  // Add teacher section conditionally
  if (isTeacher) {
    sections.push({
      title: "🎯 Teaching Tools",
      description: "Create and manage educational content",
      cards: [
        { href: "/teach/dashboard", label: "Teacher Dashboard", icon: GraduationCap, description: "Manage your courses", color: "bg-violet-500" },
        { href: "/teach/upload", label: "Upload Content", icon: Upload, description: "Add videos and materials", color: "bg-fuchsia-500" },
        { href: "/teach/interactive", label: "Interactive Builder", icon: Sparkles, description: "Create interactive lessons", color: "bg-rose-500", badge: "BETA" },
        { href: "/demo/video", label: "Video Tools", icon: Video, description: "Manage video content", color: "bg-amber-500" },
      ]
    })
  }

  // Add admin section conditionally
  if (isAdmin) {
    sections.push({
      title: "⚙️ Administration",
      description: "System management and configuration",
      cards: [
        { href: "/admin/dashboard", label: "Admin Panel", icon: Shield, description: "System administration", color: "bg-red-500" },
        { href: "/admin/users", label: "User Management", icon: Users, description: "Manage users and roles", color: "bg-slate-500" },
        { href: "/admin/content", label: "Content Management", icon: FileText, description: "Manage all content", color: "bg-zinc-500" },
        { href: "/admin/settings", label: "Settings", icon: Settings, description: "System configuration", color: "bg-gray-500" },
      ]
    })
  }

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(j => (
                <CardSkeleton key={j} />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-8"
    >
      {/* Animated Welcome Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">Welcome back</span>, {user?.firstName || 'Learner'}! 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Your learning adventure continues. Here's what's happening today.
        </p>
      </motion.div>

      {/* Animated Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </motion.div>

      {/* Feature Sections with staggered animations */}
      {sections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          variants={itemVariants}
          className="mb-12"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
            <p className="text-muted-foreground">{section.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Suspense fallback={<CardSkeleton />}>
              {section.cards.map((card) => (
                <FeatureCard key={card.href} {...card} />
              ))}
            </Suspense>
          </div>
        </motion.div>
      ))}

      {/* Quick Actions with gradient background */}
      <motion.div variants={itemVariants} className="mt-12">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-emerald-600/10 p-8">
          <div className="absolute inset-0 bg-grid opacity-5" />
          <div className="relative">
            <h3 className="text-xl font-bold mb-6 gradient-text">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/learn/ai-kompas">
                <GradientButton variant="primary">
                  <Compass className="h-4 w-4" />
                  Start AI Assessment
                </GradientButton>
              </Link>
              <Link href="/community/power-hour">
                <GradientButton variant="secondary">
                  <Zap className="h-4 w-4" />
                  Join Power Hour
                </GradientButton>
              </Link>
              <Link href="/learn/playground">
                <GradientButton variant="accent">
                  <Code className="h-4 w-4" />
                  Open Playground
                </GradientButton>
              </Link>
              {isTeacher && (
                <Link href="/teach/upload">
                  <GradientButton variant="primary">
                    <Upload className="h-4 w-4" />
                    Upload Content
                  </GradientButton>
                </Link>
              )}
              {isAdmin && (
                <Link href="/admin/dashboard">
                  <GradientButton variant="secondary">
                    <Shield className="h-4 w-4" />
                    Admin Panel
                  </GradientButton>
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}