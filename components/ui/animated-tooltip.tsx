'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  sideOffset?: number
  delayDuration?: number
  className?: string
}

export function AnimatedTooltip({
  children,
  content,
  side = 'top',
  sideOffset = 5,
  delayDuration = 200,
  className
}: AnimatedTooltipProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true)
      updatePosition()
    }, delayDuration)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(false)
  }

  const updatePosition = () => {
    if (!triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    const offset = sideOffset

    switch (side) {
      case 'top':
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - offset
        })
        break
      case 'bottom':
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.bottom + offset
        })
        break
      case 'left':
        setPosition({
          x: rect.left - offset,
          y: rect.top + rect.height / 2
        })
        break
      case 'right':
        setPosition({
          x: rect.right + offset,
          y: rect.top + rect.height / 2
        })
        break
    }
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const tooltipVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      [side === 'top' || side === 'bottom' ? 'y' : 'x']: 
        side === 'top' ? 5 : side === 'bottom' ? -5 : side === 'left' ? 5 : -5
    },
    visible: {
      opacity: 1,
      scale: 1,
      [side === 'top' || side === 'bottom' ? 'y' : 'x']: 0
    }
  }

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "fixed z-50 px-3 py-2 text-sm bg-gray-900 text-white rounded-md shadow-lg pointer-events-none",
              "before:content-[''] before:absolute before:border-4 before:border-transparent",
              side === 'top' && "before:top-full before:left-1/2 before:-translate-x-1/2 before:border-t-gray-900",
              side === 'bottom' && "before:bottom-full before:left-1/2 before:-translate-x-1/2 before:border-b-gray-900",
              side === 'left' && "before:left-full before:top-1/2 before:-translate-y-1/2 before:border-l-gray-900",
              side === 'right' && "before:right-full before:top-1/2 before:-translate-y-1/2 before:border-r-gray-900",
              className
            )}
            style={{
              left: side === 'left' || side === 'right' ? position.x : position.x,
              top: position.y,
              transform: side === 'top' || side === 'bottom' 
                ? 'translateX(-50%)' + (side === 'top' ? ' translateY(-100%)' : '')
                : 'translateY(-50%)' + (side === 'left' ? ' translateX(-100%)' : '')
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={tooltipVariants}
            transition={{ duration: 0.15 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Hint component with pulsing indicator
interface AnimatedHintProps {
  content: string
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  delay?: number
  children: React.ReactNode
}

export function AnimatedHint({
  content,
  position = 'top-right',
  delay = 1000,
  children
}: AnimatedHintProps) {
  const [showHint, setShowHint] = React.useState(false)
  const [dismissed, setDismissed] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setShowHint(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, dismissed])

  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0'
  }

  return (
    <div className="relative inline-block">
      {children}
      
      <AnimatePresence>
        {showHint && !dismissed && (
          <motion.div
            className={cn(
              "absolute z-40",
              positionClasses[position]
            )}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {/* Pulsing dot */}
            <div className="relative">
              <motion.div
                className="absolute w-3 h-3 bg-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 0.3, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
            </div>

            {/* Tooltip */}
            <motion.div
              className="absolute top-5 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {content}
              <button
                onClick={() => setDismissed(true)}
                className="ml-2 text-white/70 hover:text-white"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Contextual help tooltip
interface HelpTooltipProps {
  content: string
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export function HelpTooltip({ 
  content, 
  children,
  size = 'sm' 
}: HelpTooltipProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <AnimatedTooltip content={content}>
      {children || (
        <motion.div
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-600 cursor-help",
            sizes[size]
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xs font-semibold">?</span>
        </motion.div>
      )}
    </AnimatedTooltip>
  )
}