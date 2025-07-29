'use client'

import { motion } from 'framer-motion'
import { Award, Sparkles, BookOpen, Target, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CertificateEmptyStateProps {
  variant?: 'gallery' | 'profile' | 'team'
  userName?: string
  onBrowseCourses?: () => void
}

export function CertificateEmptyState({
  variant = 'gallery',
  userName,
  onBrowseCourses
}: CertificateEmptyStateProps) {
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
        type: "spring",
        stiffness: 100
      }
    }
  }

  if (variant === 'gallery') {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[400px] px-4 py-12 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="relative mb-8"
          variants={itemVariants}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-full">
            <Award className="h-20 w-20 text-purple-600" />
          </div>
          
          {/* Floating icons */}
          <motion.div
            className="absolute -top-4 -right-4"
            animate={{
              y: [-5, 5, -5],
              rotate: [-10, 10, -10]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="h-6 w-6 text-yellow-500" />
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -left-4"
            animate={{
              y: [5, -5, 5],
              rotate: [10, -10, 10]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <Trophy className="h-6 w-6 text-orange-500" />
          </motion.div>
        </motion.div>

        <motion.h3
          className="text-2xl font-bold text-gray-900 mb-2"
          variants={itemVariants}
        >
          Start Your Certificate Journey
        </motion.h3>
        
        <motion.p
          className="text-gray-600 max-w-md mb-8"
          variants={itemVariants}
        >
          Complete courses, pass assessments, and earn certificates to showcase your skills and knowledge.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          variants={itemVariants}
        >
          <Button
            onClick={onBrowseCourses}
            size="lg"
            className="gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Browse Courses
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            asChild
          >
            <Link href="/learning-paths">
              <Target className="h-4 w-4" />
              View Learning Paths
            </Link>
          </Button>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-3 gap-8 text-center"
          variants={itemVariants}
        >
          <div>
            <div className="text-3xl font-bold text-purple-600">500+</div>
            <div className="text-sm text-gray-600">Courses Available</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-600">50k+</div>
            <div className="text-sm text-gray-600">Certificates Earned</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600">95%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  if (variant === 'profile') {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[300px] px-4 py-8 text-center bg-gray-50 rounded-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-6"
          variants={itemVariants}
        >
          <div className="bg-white p-6 rounded-full shadow-sm">
            <Award className="h-12 w-12 text-gray-400" />
          </div>
        </motion.div>

        <motion.h3
          className="text-lg font-semibold text-gray-900 mb-2"
          variants={itemVariants}
        >
          {userName ? `${userName} hasn't earned any certificates yet` : 'No certificates earned yet'}
        </motion.h3>
        
        <motion.p
          className="text-gray-600 text-sm"
          variants={itemVariants}
        >
          Start learning to earn your first certificate!
        </motion.p>
      </motion.div>
    )
  }

  if (variant === 'team') {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[400px] px-4 py-12 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="relative mb-8"
          variants={itemVariants}
        >
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="bg-gray-100 p-4 rounded-lg"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              >
                <Award className="h-8 w-8 text-gray-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.h3
          className="text-2xl font-bold text-gray-900 mb-2"
          variants={itemVariants}
        >
          No Team Certificates Yet
        </motion.h3>
        
        <motion.p
          className="text-gray-600 max-w-md mb-8"
          variants={itemVariants}
        >
          Encourage your team members to complete courses and earn certificates together.
        </motion.p>

        <motion.div
          variants={itemVariants}
        >
          <Button size="lg">
            Invite Team Members
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  return null
}