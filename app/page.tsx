"use client"

import { HeroSectionAnimated } from "@/components/landing/hero-section-animated"
import { FeaturesSectionMinimal } from "@/components/landing/features-section-minimal"
import { Header } from "@/components/layout/header"
import Link from "next/link"
import { PageTransition } from "@/components/layout/page-transition"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function LandingPage() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // Show onboarding for first-time visitors (only on client side)
    if (typeof window !== 'undefined') {
      const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding")
      if (!hasSeenOnboarding) {
        setShowOnboarding(true)
      }
    }
  }, [])

  const handleOnboardingComplete = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("hasSeenOnboarding", "true")
    }
    setShowOnboarding(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {showOnboarding && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}
      
      {/* Use the shared Header component with language switching and proper navigation */}
      <Header />

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
