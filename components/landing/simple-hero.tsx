"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BookOpen, 
  Brain, 
  Users, 
  BarChart, 
  PlayCircle, 
  Upload, 
  Shield, 
  Compass,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Zap
} from "lucide-react"
import { SignInButton, SignUpButton } from "@clerk/nextjs"

export function SimpleHero() {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Courses",
      description: "Learn through hands-on, AI-powered interactive lessons"
    },
    {
      icon: Compass,
      title: "AI Compass",
      description: "Get personalized learning recommendations based on your goals"
    },
    {
      icon: Brain,
      title: "Smart Learning",
      description: "Adaptive content that adjusts to your learning pace"
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect and learn with peers in Power Hour sessions"
    },
    {
      icon: BarChart,
      title: "Analytics",
      description: "Track your progress with detailed learning analytics"
    },
    {
      icon: Upload,
      title: "Teaching Tools",
      description: "Create and share your own interactive content"
    }
  ]

  const quickLinks = [
    { href: "/learn/dashboard", label: "Student Dashboard", icon: BookOpen, color: "bg-blue-500" },
    { href: "/learn/ai-kompas", label: "AI Compass", icon: Compass, color: "bg-purple-500" },
    { href: "/teach/dashboard", label: "Teacher Portal", icon: Upload, color: "bg-green-500" },
    { href: "/admin/dashboard", label: "Admin Panel", icon: Shield, color: "bg-red-500" },
    { href: "/community/power-hour", label: "Power Hour", icon: Zap, color: "bg-yellow-500" },
    { href: "/toolkit", label: "Toolkit", icon: Target, color: "bg-indigo-500" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to HARKA
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Transform your organization with AI-powered learning. 
            Interactive lessons, personalized paths, and real-time collaboration.
          </p>
          <div className="flex gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button size="lg" className="gap-2">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="container mx-auto px-4 py-16 border-t">
        <h2 className="text-3xl font-bold text-center mb-12">Quick Access to All Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className={`${link.color} p-3 rounded-lg mb-3`}>
                    <link.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium text-sm">{link.label}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <Sparkles className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of learners and educators using HARKA
            </p>
            <div className="flex gap-4 justify-center">
              <SignUpButton mode="modal">
                <Button size="lg" variant="secondary">
                  Start Learning Now
                </Button>
              </SignUpButton>
              <Link href="/demo/interactive-learning">
                <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Try Demo
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © 2024 HARKA. All rights reserved.
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/learn/courses" className="text-sm hover:underline">Courses</Link>
              <Link href="/learn/ai-kompas" className="text-sm hover:underline">AI Compass</Link>
              <Link href="/community/power-hour" className="text-sm hover:underline">Community</Link>
              <Link href="/admin/dashboard" className="text-sm hover:underline">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}