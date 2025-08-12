"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { 
  BookOpen, 
  Brain, 
  Users, 
  BarChart, 
  PlayCircle, 
  Upload, 
  Shield, 
  Compass,
  Zap,
  Target,
  FileText,
  Settings,
  GraduationCap,
  Code,
  Sparkles,
  Video,
  MessageSquare,
  Award
} from "lucide-react"

export function SimpleDashboard() {
  const { user } = useUser()
  const isAdmin = user?.publicMetadata?.role === 'admin'
  const isTeacher = user?.publicMetadata?.role === 'teacher' || isAdmin

  const sections = [
    {
      title: "Learning",
      description: "Your courses and learning tools",
      cards: [
        { 
          href: "/learn/courses", 
          label: "My Courses", 
          icon: BookOpen, 
          description: "Continue your learning journey",
          color: "bg-blue-500"
        },
        { 
          href: "/learn/ai-kompas", 
          label: "AI Compass", 
          icon: Compass, 
          description: "Get personalized recommendations",
          color: "bg-purple-500"
        },
        { 
          href: "/learn/playground", 
          label: "Code Playground", 
          icon: Code, 
          description: "Practice coding in real-time",
          color: "bg-green-500"
        },
        { 
          href: "/demo/interactive-learning", 
          label: "Interactive Lessons", 
          icon: PlayCircle, 
          description: "Hands-on learning experiences",
          color: "bg-indigo-500"
        },
      ]
    },
    {
      title: "Community & Collaboration",
      description: "Connect with peers and experts",
      cards: [
        { 
          href: "/community/power-hour", 
          label: "Power Hour", 
          icon: Zap, 
          description: "Live collaborative sessions",
          color: "bg-yellow-500"
        },
        { 
          href: "/learn/discussion", 
          label: "Discussions", 
          icon: MessageSquare, 
          description: "Ask questions and share insights",
          color: "bg-pink-500"
        },
        { 
          href: "/team", 
          label: "Teams", 
          icon: Users, 
          description: "Collaborate with your team",
          color: "bg-orange-500"
        },
      ]
    },
    {
      title: "Tools & Analytics",
      description: "Track progress and access resources",
      cards: [
        { 
          href: "/analytics", 
          label: "Analytics", 
          icon: BarChart, 
          description: "View your learning metrics",
          color: "bg-cyan-500"
        },
        { 
          href: "/toolkit", 
          label: "Toolkit", 
          icon: Target, 
          description: "Essential learning resources",
          color: "bg-teal-500"
        },
        { 
          href: "/learn/certificates", 
          label: "Certificates", 
          icon: Award, 
          description: "Your achievements",
          color: "bg-emerald-500"
        },
        { 
          href: "/learn/resources", 
          label: "Resources", 
          icon: FileText, 
          description: "Learning materials",
          color: "bg-lime-500"
        },
      ]
    },
  ]

  // Add teacher section if user is teacher/admin
  if (isTeacher) {
    sections.push({
      title: "Teaching & Content Creation",
      description: "Create and manage educational content",
      cards: [
        { 
          href: "/teach/dashboard", 
          label: "Teacher Dashboard", 
          icon: GraduationCap, 
          description: "Manage your courses",
          color: "bg-violet-500"
        },
        { 
          href: "/teach/upload", 
          label: "Upload Content", 
          icon: Upload, 
          description: "Add videos and materials",
          color: "bg-fuchsia-500"
        },
        { 
          href: "/teach/interactive", 
          label: "Interactive Builder", 
          icon: Sparkles, 
          description: "Create interactive lessons",
          color: "bg-rose-500"
        },
        { 
          href: "/demo/video", 
          label: "Video Tools", 
          icon: Video, 
          description: "Manage video content",
          color: "bg-amber-500"
        },
      ]
    })
  }

  // Add admin section if user is admin
  if (isAdmin) {
    sections.push({
      title: "Administration",
      description: "System management and configuration",
      cards: [
        { 
          href: "/admin/dashboard", 
          label: "Admin Panel", 
          icon: Shield, 
          description: "System administration",
          color: "bg-red-500"
        },
        { 
          href: "/admin/users", 
          label: "User Management", 
          icon: Users, 
          description: "Manage users and roles",
          color: "bg-slate-500"
        },
        { 
          href: "/admin/content", 
          label: "Content Management", 
          icon: FileText, 
          description: "Manage all content",
          color: "bg-zinc-500"
        },
        { 
          href: "/admin/settings", 
          label: "Settings", 
          icon: Settings, 
          description: "System configuration",
          color: "bg-gray-500"
        },
      ]
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.firstName || 'Learner'}!
        </h1>
        <p className="text-muted-foreground">
          Here's everything you can access from your dashboard
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Courses</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hours Learned</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Certificates</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <Award className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Community Points</p>
                <p className="text-2xl font-bold">150</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Sections */}
      {sections.map((section) => (
        <div key={section.title} className="mb-12">
          <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
          <p className="text-muted-foreground mb-6">{section.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {section.cards.map((card) => (
              <Link key={card.href} href={card.href}>
                <Card className="hover:shadow-lg transition-all cursor-pointer h-full hover:scale-105">
                  <CardHeader className="pb-3">
                    <div className={`${card.color} p-3 rounded-lg mb-3 w-fit`}>
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{card.label}</CardTitle>
                    <CardDescription className="text-sm">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Quick Actions */}
      <Card className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-8">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/learn/ai-kompas">
              <Button className="gap-2">
                <Compass className="h-4 w-4" />
                Start AI Assessment
              </Button>
            </Link>
            <Link href="/community/power-hour">
              <Button variant="outline" className="gap-2">
                <Zap className="h-4 w-4" />
                Join Power Hour
              </Button>
            </Link>
            <Link href="/learn/playground">
              <Button variant="outline" className="gap-2">
                <Code className="h-4 w-4" />
                Open Playground
              </Button>
            </Link>
            {isTeacher && (
              <Link href="/teach/upload">
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Content
                </Button>
              </Link>
            )}
            {isAdmin && (
              <Link href="/admin/dashboard">
                <Button variant="outline" className="gap-2">
                  <Shield className="h-4 w-4" />
                  Admin Panel
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}