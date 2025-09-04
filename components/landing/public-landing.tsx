"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Users, Star, Zap, Brain, Trophy, Sparkles, BookOpen, Rocket } from "lucide-react"
import { useEffect, useState } from "react"
import { SignInButton, SignUpButton } from "@clerk/nextjs"

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let startTime: number | null = null
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration])
  
  return count
}

export function PublicLanding() {
  const learnerCount = useCounter(12847, 2500)
  const courseCount = useCounter(156, 2000)
  const completionRate = useCounter(94, 1500)
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
  
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-violet-50/20 to-white dark:from-gray-950 dark:via-violet-950/10 dark:to-gray-950">
      
      {/* Floating gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center space-y-8"
          >
            {/* Social proof pill */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 rounded-full text-sm font-medium text-violet-700 dark:text-violet-300"
            >
              <Sparkles className="w-4 h-4" />
              <span>Join {learnerCount.toLocaleString()}+ learners already mastering AI</span>
            </motion.div>

            {/* Main headline */}
            <motion.h1 
              variants={fadeInUp}
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            >
              <span className="text-gray-900 dark:text-white">Master AI</span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                In Weeks, Not Years
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              From zero to AI expert with personalized learning paths, 
              real-world projects, and a supportive community.
            </motion.p>

            {/* Feature points */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">No coding experience required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">Learn at your own pace</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">Get certified</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <SignUpButton mode="modal">
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Start Learning Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </SignUpButton>
              <Link href="/demo/interactive-learning">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-14 px-8 text-lg border-2 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  Watch Demo
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                {learnerCount.toLocaleString()}+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Active Learners</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                {courseCount}+
              </div>
              <div className="text-gray-600 dark:text-gray-400">AI Courses</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                {completionRate}%
              </div>
              <div className="text-gray-600 dark:text-gray-400">Completion Rate</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-20 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-12"
          >
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Trusted by learners at
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60 grayscale">
              {["Google", "Microsoft", "Meta", "Amazon", "Apple"].map((company) => (
                <div key={company} className="flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400">{company}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built by AI experts, for future AI experts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Learning",
                description: "Personalized curriculum that adapts to your learning style and pace"
              },
              {
                icon: Users,
                title: "Expert Community",
                description: "Learn alongside peers and get help from experienced mentors"
              },
              {
                icon: Trophy,
                title: "Industry Certificates",
                description: "Earn recognized credentials that open doors to new opportunities"
              },
              {
                icon: Zap,
                title: "Hands-On Projects",
                description: "Build real AI applications from day one with guided tutorials"
              },
              {
                icon: Star,
                title: "Career Support",
                description: "Get job-ready with interview prep and portfolio reviews"
              },
              {
                icon: CheckCircle,
                title: "Lifetime Access",
                description: "Learn once, access forever with free updates and new content"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-xl transition-all duration-200 bg-white dark:bg-gray-900"
              >
                <feature.icon className="w-12 h-12 text-violet-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Loved by learners worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our community has to say
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "ML Engineer at Google",
                content: "HARKA transformed my career. I went from knowing nothing about AI to landing my dream job in just 6 months.",
                rating: 5
              },
              {
                name: "Marcus Johnson",
                role: "Data Scientist at Meta",
                content: "The hands-on projects and personalized learning path made all the difference. Best investment I've ever made.",
                rating: 5
              },
              {
                name: "Emma Williams",
                role: "AI Researcher",
                content: "The community support is incredible. Whenever I got stuck, there was always someone ready to help.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 p-12 md:p-16 text-center"
          >
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Ready to start your AI journey?
              </h2>
              <p className="text-xl text-violet-100 max-w-2xl mx-auto">
                Join thousands of learners who are already building the future with AI
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <SignUpButton mode="modal">
                  <Button 
                    size="lg" 
                    className="h-14 px-8 text-lg bg-white text-violet-600 hover:bg-gray-100 shadow-xl"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </SignUpButton>
                <Link href="/pricing">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="h-14 px-8 text-lg border-2 border-white text-white hover:bg-white/10"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-violet-200">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}