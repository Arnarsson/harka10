'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { withAuth } from '@/lib/auth/hooks'
import { 
  Trophy, Award, Share2, Download, ArrowRight, 
  Star, CheckCircle, Sparkles, Gift, X
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { CertificateGenerator } from '@/components/certificates/certificate-generator'
import { CourseCompletionAnimation } from '@/components/animations/course-completion'
import type { Course } from '@/lib/types/course'

function CourseCompletionPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  const [course, setCourse] = useState<Course | null>(null)
  const [completionData, setCompletionData] = useState<any>(null)
  const [showCertificateGenerator, setShowCertificateGenerator] = useState(false)

  useEffect(() => {
    loadCompletionData()
    triggerCelebration()
  }, [])

  const loadCompletionData = async () => {
    // Mock data for demo
    const mockCourse: Course = {
      id: courseId,
      title: 'Complete Web Development Bootcamp',
      description: 'Learn HTML, CSS, JavaScript, React, Node.js and more',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop',
      category: 'Development',
      level: 'beginner',
      duration: 2400,
      price: 89.99,
      currency: 'USD',
      instructor: {
        id: '1',
        name: 'Sarah Chen',
        bio: 'Full-stack developer with 10+ years experience',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        title: 'Senior Developer',
        courses: 5,
        students: 15000,
        rating: 4.8
      },
      modules: [],
      tags: ['Web Development', 'React', 'Node.js'],
      language: 'English',
      requirements: [],
      objectives: [],
      enrollmentCount: 12543,
      rating: 4.7,
      reviewCount: 3421,
      lastUpdated: '2024-01-15',
      createdAt: '2023-06-01',
      publishedAt: '2023-06-15',
      status: 'published'
    }

    const mockCompletionData = {
      completedAt: new Date().toISOString(),
      totalTimeSpent: 3600, // minutes
      lessonsCompleted: 42,
      assignmentsCompleted: 8,
      quizzesPassed: 12,
      finalScore: 92,
      achievements: [
        { title: 'Fast Learner', description: 'Completed course in record time' },
        { title: 'Quiz Master', description: 'Scored 90%+ on all quizzes' },
        { title: 'Active Participant', description: 'Engaged in all discussions' }
      ],
      skills: ['React', 'Node.js', 'TypeScript', 'Next.js', 'MongoDB']
    }

    setCourse(mockCourse)
    setCompletionData(mockCompletionData)
  }

  const triggerCelebration = () => {
    // Trigger confetti animation
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
  }

  if (!course || !completionData) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-zinc-200 border-t-black" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100">
      {/* Success Header */}
      <div className="relative overflow-hidden bg-black text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-4xl mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full mb-6"
          >
            <Trophy size={48} className="text-yellow-400" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Congratulations! 🎉
          </h1>
          <p className="text-xl text-zinc-300 mb-8">
            You've successfully completed {course.title}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-2xl font-bold">{completionData.finalScore}%</p>
              <p className="text-sm text-zinc-300">Final Score</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-2xl font-bold">{completionData.lessonsCompleted}</p>
              <p className="text-sm text-zinc-300">Lessons Completed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-2xl font-bold">{Math.floor(completionData.totalTimeSpent / 60)}h</p>
              <p className="text-sm text-zinc-300">Time Invested</p>
            </div>
          </div>

          <button
            onClick={() => setShowCertificateGenerator(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-lg font-semibold text-lg hover:bg-zinc-100 transition-colors hover:shadow-md active:scale-95"
          >
            <Award size={24} />
            Get Your Certificate
          </button>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Sparkles className="text-yellow-500" />
            Your Achievements
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {completionData.achievements.map((achievement: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-lg p-4 border border-zinc-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mb-3">
                  <Star className="text-white" size={24} />
                </div>
                <h3 className="font-semibold mb-1">{achievement.title}</h3>
                <p className="text-sm text-zinc-600">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Acquired */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Skills You've Mastered</h2>
          <div className="flex flex-wrap gap-3">
            {completionData.skills.map((skill: string, index: number) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Gift className="text-blue-600" />
            What's Next?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <CheckCircle className="text-green-600 mt-1" size={20} />
              <div>
                <h3 className="font-semibold mb-1">Share Your Achievement</h3>
                <p className="text-zinc-600">Add your certificate to LinkedIn and showcase your new skills</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="text-green-600 mt-1" size={20} />
              <div>
                <h3 className="font-semibold mb-1">Apply Your Knowledge</h3>
                <p className="text-zinc-600">Start building projects with your newly acquired skills</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="text-green-600 mt-1" size={20} />
              <div>
                <h3 className="font-semibold mb-1">Continue Learning</h3>
                <p className="text-zinc-600">Explore advanced courses to further enhance your expertise</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => router.push('/courses')}
              className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors hover:shadow-md active:scale-95"
            >
              Browse More Courses
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => router.push('/profile')}
              className="flex items-center gap-2 px-6 py-3 border border-zinc-200 rounded-lg hover:bg-white transition-colors hover:shadow-md active:scale-95"
            >
              View Your Profile
            </button>
          </div>
        </motion.div>
      </div>

      {/* Certificate Generator Modal */}
      {showCertificateGenerator && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Generate Your Certificate</h2>
              <button
                onClick={() => setShowCertificateGenerator(false)}
                className="p-2 hover:bg-zinc-100 rounded-lg transition-colors active:scale-95"
              >
                <X size={24} />
              </button>
            </div>

            <CertificateGenerator
              courseId={course.id}
              courseTitle={course.title}
              recipientName="John Doe" // In production, get from auth context
              completionDate={completionData.completedAt}
              score={completionData.finalScore}
              skills={completionData.skills}
              instructorName={course.instructor.name}
              instructorTitle={course.instructor.title}
              onCertificateGenerated={(certificateId) => {
                console.log('Certificate generated:', certificateId)
              }}
            />
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default withAuth(CourseCompletionPage, {
  requireAuth: true,
  redirectTo: '/login'
})
