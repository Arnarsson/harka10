"use client"

import { motion, AnimatePresence } from "framer-motion"
import { pageVariants } from "@/lib/animations"
import { usePathname } from "next/navigation"

interface PageTransitionProps {
  children: React.ReactNode
  mode?: 'fade' | 'slideUp' | 'slideRight' | 'scale'
  duration?: number
}

const transitionVariants = {
  fade: {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -40 }
  },
  slideRight: {
    initial: { opacity: 0, x: -40 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 40 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.05 }
  }
}

export function PageTransition({ 
  children, 
  mode = 'slideUp',
  duration = 0.3 
}: PageTransitionProps) {
  const pathname = usePathname()
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={transitionVariants[mode] || pageVariants}
        transition={{
          type: "tween",
          duration,
          ease: "easeInOut",
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Section transition for animating page sections
interface SectionTransitionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function SectionTransition({ 
  children, 
  delay = 0,
  className = ""
}: SectionTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger children animations
interface StaggerContainerProps {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggerContainer({ 
  children, 
  staggerDelay = 0.1,
  className = ""
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {children}
    </motion.div>
  )
}