"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Award, Download, Share2 } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { certificateUnlock } from "@/lib/animations"

interface CertificateAchievementProps {
  courseName: string
  userName: string
  completionDate: string
  onClose: () => void
  onShare: () => void
  onDownload: () => void
}

export function CertificateAchievement({
  courseName,
  userName,
  completionDate,
  onClose,
  onShare,
  onDownload,
}: CertificateAchievementProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    
    // Trigger confetti
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
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#000000', '#666666', '#999999', '#CCCCCC', '#FFFFFF'],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#000000', '#666666', '#999999', '#CCCCCC', '#FFFFFF'],
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={certificateUnlock}
            initial="initial"
            animate="animate"
            exit="initial"
            className="bg-background border rounded-lg p-8 max-w-lg w-full space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-primary text-primary-foreground rounded-full"
              >
                <Award className="h-10 w-10" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-medium">Congratulations! 🎉</h2>
                <p className="text-muted-foreground mt-2">
                  You've earned your certificate
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-muted/50 rounded-lg p-6 text-center space-y-2"
            >
              <h3 className="text-lg font-medium">{courseName}</h3>
              <p className="text-sm text-muted-foreground">Awarded to</p>
              <p className="text-base font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">{completionDate}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3"
            >
              <AnimatedButton
                onClick={onShare}
                className="flex-1"
                variant="default"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </AnimatedButton>
              <AnimatedButton
                onClick={onDownload}
                className="flex-1"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}