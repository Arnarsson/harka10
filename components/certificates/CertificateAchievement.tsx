'use client'

import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Share2, Download, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface CertificateAchievementProps {
  isOpen: boolean
  onClose: () => void
  certificateData: {
    id: string
    title: string
    courseName: string
    userName: string
    issueDate: string
    imageUrl?: string
  }
  onShare?: () => void
  onDownload?: () => void
  onViewCertificate?: () => void
}

export function CertificateAchievement({
  isOpen,
  onClose,
  certificateData,
  onShare,
  onDownload,
  onViewCertificate
}: CertificateAchievementProps) {
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false)

  useEffect(() => {
    if (isOpen && !hasTriggeredConfetti) {
      // Trigger confetti animation
      const duration = 5000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      const interval: NodeJS.Timeout = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#FFD700', '#FFA500', '#FF6347', '#4169E1', '#32CD32']
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#FFD700', '#FFA500', '#FF6347', '#4169E1', '#32CD32']
        })
      }, 250)

      setHasTriggeredConfetti(true)

      return () => clearInterval(interval)
    }
  }, [isOpen, hasTriggeredConfetti])

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[600px] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="sr-only">Certificate Achievement</DialogTitle>
            </DialogHeader>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <button
                onClick={onClose}
                className="absolute right-0 top-0 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center space-y-6 p-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="relative inline-block"
                >
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl opacity-30 animate-pulse" />
                  <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-full">
                    <Award className="h-16 w-16 text-white" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    Congratulations!
                  </h2>
                  <p className="text-xl text-gray-700">
                    You've earned your certificate
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gray-50 rounded-lg p-4 space-y-2"
                >
                  <h3 className="font-semibold text-lg">{certificateData.title}</h3>
                  <p className="text-gray-600">{certificateData.courseName}</p>
                  <p className="text-sm text-gray-500">Issued on {certificateData.issueDate}</p>
                </motion.div>

                {certificateData.imageUrl && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="relative group cursor-pointer"
                    onClick={onViewCertificate}
                  >
                    <img 
                      src={certificateData.imageUrl} 
                      alt="Certificate Preview"
                      className="w-full rounded-lg shadow-lg transition-transform group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg" />
                  </motion.div>
                )}

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                  <Button
                    onClick={onShare}
                    className="gap-2"
                    size="lg"
                  >
                    <Share2 className="h-4 w-4" />
                    Share on LinkedIn
                  </Button>
                  <Button
                    onClick={onDownload}
                    variant="outline"
                    className="gap-2"
                    size="lg"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-sm text-gray-500"
                >
                  Your certificate has been added to your profile
                </motion.p>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}