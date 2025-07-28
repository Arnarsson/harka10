"use client"

import { HeroSectionAnimated } from "@/components/landing/hero-section-animated"
import { FeaturesSectionMinimal } from "@/components/landing/features-section-minimal"
import Link from "next/link"
import { PageTransition } from "@/components/layout/page-transition"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function LandingPage() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // Show onboarding for first-time visitors
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding")
    if (!hasSeenOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true")
    setShowOnboarding(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {showOnboarding && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}
      
      {/* Animated Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-40"
      >
        <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-medium">
            AI Platform
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </Link>
            <Link href="/certificates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Certificates
            </Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </nav>
        </div>
      </motion.header>

      <PageTransition>
        <main>
          <HeroSectionAnimated />
          <FeaturesSectionMinimal />
        </main>

        {/* Animated Footer */}
        <footer className="border-t py-12">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-center gap-4"
            >
              <p className="text-sm text-muted-foreground">
                © 2024 AI Platform. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
              </div>
            </motion.div>
          </div>
        </footer>
      </PageTransition>
    </div>
  )
}
