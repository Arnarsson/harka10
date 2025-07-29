'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ChevronRight, Sparkles, Target, Trophy, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'

interface CertificateOnboardingProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  userName?: string
}

export function CertificateOnboarding({
  isOpen,
  onClose,
  onComplete,
  userName = 'there'
}: CertificateOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: `Welcome ${userName}!`,
      description: "Let's explore how you can earn certificates and showcase your achievements",
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      content: (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mx-auto w-64 h-64"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="relative flex items-center justify-center h-full">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-12 rounded-full">
              <Award className="h-32 w-32 text-purple-600" />
            </div>
          </div>
        </motion.div>
      )
    },
    {
      title: "Complete Courses & Assessments",
      description: "Progress through lessons, complete quizzes, and finish projects to unlock certificates",
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      content: (
        <div className="space-y-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <div>
              <h4 className="font-semibold">Watch Video Lessons</h4>
              <p className="text-sm text-gray-600">Complete all required video content</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 p-4 bg-cyan-50 rounded-lg"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
              <span className="text-cyan-600 font-bold">2</span>
            </div>
            <div>
              <h4 className="font-semibold">Pass Assessments</h4>
              <p className="text-sm text-gray-600">Score 80% or higher on quizzes</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 p-4 bg-teal-50 rounded-lg"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-teal-600 font-bold">3</span>
            </div>
            <div>
              <h4 className="font-semibold">Complete Projects</h4>
              <p className="text-sm text-gray-600">Apply your skills in real projects</p>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      title: "Earn Your Certificate",
      description: "Get a beautiful, verifiable certificate upon completion",
      icon: Award,
      color: 'from-yellow-500 to-orange-500',
      content: (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg shadow-xl">
            <div className="aspect-[16/11] relative overflow-hidden rounded-md">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <Award className="h-16 w-16 text-orange-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Certificate of Completion</h3>
                <p className="text-gray-600 mb-4">This is to certify that</p>
                <p className="text-xl font-semibold text-gray-900 mb-4">{userName}</p>
                <p className="text-gray-600 text-center">has successfully completed the course</p>
                <p className="text-lg font-semibold text-gray-800 mt-2">Advanced Web Development</p>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                Sample Certificate
              </div>
            </div>
          </div>
        </motion.div>
      )
    },
    {
      title: "Share & Showcase",
      description: "Share on LinkedIn, add to your portfolio, and get verified",
      icon: Trophy,
      color: 'from-green-500 to-emerald-500',
      content: (
        <div className="space-y-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <h4 className="font-semibold mb-2">One-Click LinkedIn Sharing</h4>
            <p className="text-sm text-gray-600">Share your achievements with your professional network</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center p-4 bg-green-50 rounded-lg"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Verified Badges</p>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center p-4 bg-emerald-50 rounded-lg"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <p className="text-sm font-medium">QR Verification</p>
            </motion.div>
          </div>
        </div>
      )
    }
  ]

  const currentStepData = steps[currentStep]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] overflow-hidden p-0">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className={`bg-gradient-to-r ${currentStepData.color} p-6 text-white`}>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <currentStepData.icon className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">{currentStepData.title}</h2>
              <p className="text-white/90">{currentStepData.description}</p>
            </motion.div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 py-4 bg-gray-50">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-8 bg-gray-800'
                    : index < currentStep
                    ? 'w-2 bg-gray-400'
                    : 'w-2 bg-gray-300'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStepData.content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center p-6 border-t">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="gap-2"
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              className="gap-2"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}