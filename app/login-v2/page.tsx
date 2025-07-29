'use client'

import { motion } from 'framer-motion'
import { CombinedAuth } from '@/components/auth/social-login'
import { FloatingElement } from '@/components/ui/parallax-section'
import { Award, BookOpen, Users, Zap } from 'lucide-react'
import Link from 'next/link'

export default function LoginV2Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Left side - Auth form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-8 left-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold">AI Training Platform</span>
          </Link>
        </div>

        <CombinedAuth mode="signin" />

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-purple-600 to-blue-600 relative overflow-hidden">
        {/* Floating elements */}
        <FloatingElement speed={0.3} className="absolute top-20 left-20">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <Award className="h-16 w-16 text-white/80" />
          </div>
        </FloatingElement>

        <FloatingElement speed={-0.5} className="absolute bottom-20 right-20">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <BookOpen className="h-20 w-20 text-white/80" />
          </div>
        </FloatingElement>

        <FloatingElement speed={0.7} className="absolute top-40 right-40">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <Users className="h-14 w-14 text-white/80" />
          </div>
        </FloatingElement>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-lg"
          >
            <h2 className="text-4xl font-bold mb-4">
              Welcome to the Future of Learning
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our AI-powered platform and transform your skills with personalized learning paths
            </p>

            <div className="grid grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-sm text-white/70">Courses</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl font-bold mb-1">50K+</div>
                <div className="text-sm text-white/70">Learners</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold mb-1">95%</div>
                <div className="text-sm text-white/70">Success Rate</div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl"
            >
              <p className="text-sm italic">
                "This platform revolutionized my learning journey. The AI-powered recommendations and certificate system helped me land my dream job!"
              </p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full" />
                <div className="text-left">
                  <p className="text-sm font-medium">Sarah Chen</p>
                  <p className="text-xs text-white/70">Software Engineer at Google</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>
    </div>
  )
}