'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CourseCompletionAnimationProps {
  onComplete?: () => void
  score?: number
}

export function CourseCompletionAnimation({ 
  onComplete,
  score = 100 
}: CourseCompletionAnimationProps) {
  const [showAnimation, setShowAnimation] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false)
      if (onComplete) onComplete()
    }, 4000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        >
          {/* Background sparkles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 100,
                  scale: 0
                }}
                animate={{ 
                  y: -100,
                  scale: [0, 1, 0],
                  rotate: 360
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
                className="absolute"
              >
                <Sparkles 
                  size={20 + Math.random() * 20} 
                  className="text-yellow-400"
                />
              </motion.div>
            ))}
          </div>

          {/* Main content */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 1
            }}
            className="relative"
          >
            {/* Glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 blur-3xl"
            />

            {/* Trophy */}
            <motion.div
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative bg-gradient-to-br from-yellow-400 to-orange-400 p-8 rounded-full"
            >
              <Trophy size={80} className="text-white" />
            </motion.div>

            {/* Stars around trophy */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: 360
                }}
                transition={{
                  delay: 0.5 + i * 0.1,
                  duration: 0.5
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 72}deg) translateY(-80px)`
                }}
              >
                <Star size={24} className="text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-1/3 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Course Complete!
            </h1>
            <p className="text-xl text-zinc-300">
              You scored {score}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}