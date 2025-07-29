'use client'

import { motion } from 'framer-motion'
import { Award, Lock, CheckCircle2, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CertificateProgressBarProps {
  progress: number
  milestones?: {
    percent: number
    label: string
    icon?: 'check' | 'trophy' | 'award'
  }[]
  showPercentage?: boolean
  height?: 'sm' | 'md' | 'lg'
  color?: 'default' | 'gradient' | 'gold'
  certificateUnlocked?: boolean
  onUnlock?: () => void
}

export function CertificateProgressBar({
  progress,
  milestones = [],
  showPercentage = true,
  height = 'md',
  color = 'gradient',
  certificateUnlocked = false,
  onUnlock
}: CertificateProgressBarProps) {
  const heightClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  }

  const colorClasses = {
    default: 'from-blue-500 to-blue-600',
    gradient: 'from-purple-500 via-pink-500 to-orange-500',
    gold: 'from-yellow-400 to-yellow-600'
  }

  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case 'trophy':
        return Trophy
      case 'award':
        return Award
      default:
        return CheckCircle2
    }
  }

  const isComplete = progress >= 100

  return (
    <div className="relative">
      {/* Progress Bar Container */}
      <div className="relative">
        <div className={cn(
          "w-full bg-gray-200 rounded-full overflow-hidden shadow-inner",
          heightClasses[height]
        )}>
          <motion.div
            className={cn(
              "h-full bg-gradient-to-r rounded-full relative",
              colorClasses[color]
            )}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          </motion.div>
        </div>

        {/* Milestones */}
        {milestones.map((milestone, index) => {
          const Icon = getIcon(milestone.icon)
          const isPassed = progress >= milestone.percent

          return (
            <motion.div
              key={index}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${milestone.percent}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="relative">
                <motion.div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center -translate-x-1/2",
                    isPassed ? "bg-white shadow-md" : "bg-gray-300"
                  )}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className={cn(
                    "h-3 w-3",
                    isPassed ? "text-purple-600" : "text-gray-500"
                  )} />
                </motion.div>
                <span className={cn(
                  "absolute top-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap",
                  isPassed ? "text-gray-700 font-medium" : "text-gray-500"
                )}>
                  {milestone.label}
                </span>
              </div>
            </motion.div>
          )
        })}

        {/* Certificate Unlock Icon */}
        <motion.div
          className="absolute -right-12 top-1/2 -translate-y-1/2"
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: isComplete ? 1 : 0.8,
            rotate: isComplete ? 0 : -180
          }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <button
            onClick={onUnlock}
            disabled={!isComplete}
            className={cn(
              "relative group",
              isComplete && "cursor-pointer"
            )}
          >
            <motion.div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shadow-lg",
                isComplete 
                  ? "bg-gradient-to-br from-yellow-400 to-orange-500" 
                  : "bg-gray-300"
              )}
              whileHover={isComplete ? { scale: 1.1 } : {}}
              whileTap={isComplete ? { scale: 0.95 } : {}}
            >
              {isComplete ? (
                <Award className="h-5 w-5 text-white" />
              ) : (
                <Lock className="h-4 w-4 text-gray-500" />
              )}
            </motion.div>
            
            {isComplete && !certificateUnlocked && (
              <motion.div
                className="absolute inset-0 rounded-full bg-yellow-400"
                animate={{
                  scale: [1, 1.5, 1.5],
                  opacity: [0.5, 0, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
            )}
          </button>
        </motion.div>
      </div>

      {/* Progress Text */}
      {showPercentage && (
        <div className="mt-2 flex justify-between items-center">
          <motion.span
            className="text-sm font-medium text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {isComplete ? "🎉 Ready for certificate!" : "Progress to certificate"}
          </motion.span>
          <motion.span
            className={cn(
              "text-sm font-bold",
              isComplete ? "text-green-600" : "text-gray-600"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
      )}
    </div>
  )
}