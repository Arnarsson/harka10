"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Award, Users, BarChart3, Zap, X } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { pageVariants } from "@/lib/animations"

const steps = [
  {
    id: 1,
    title: "Welcome to AI Platform",
    description: "Learn AI skills, earn certificates, and advance your career",
    icon: Zap,
    color: "text-primary",
  },
  {
    id: 2,
    title: "Interactive Learning",
    description: "Engage with hands-on modules and real-world projects",
    icon: BarChart3,
    color: "text-blue-500",
  },
  {
    id: 3,
    title: "Team Collaboration",
    description: "Learn together with your team and track collective progress",
    icon: Users,
    color: "text-green-500",
  },
  {
    id: 4,
    title: "Earn Certificates",
    description: "Get LinkedIn-ready certificates for every course you complete",
    icon: Award,
    color: "text-purple-500",
  },
]

interface OnboardingFlowProps {
  onComplete: () => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    setIsVisible(false)
    setTimeout(onComplete, 300)
  }

  const step = steps[currentStep]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-background border rounded-lg p-8 max-w-md w-full"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-1">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1 w-12 rounded-full ${
                      index <= currentStep ? "bg-primary" : "bg-muted"
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: index <= currentStep ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  />
                ))}
              </div>
              <button
                onClick={handleComplete}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className={`inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full ${step.color}`}
                >
                  <step.icon className="h-8 w-8" />
                </motion.div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-medium">{step.title}</h2>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {currentStep === steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-muted/50 rounded-lg p-4"
                  >
                    <p className="text-sm text-muted-foreground">
                      🎓 Your first certificate awaits! Complete any course to earn a professional certificate that you can add to your LinkedIn profile.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex justify-end"
            >
              <AnimatedButton onClick={handleNext}>
                {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}