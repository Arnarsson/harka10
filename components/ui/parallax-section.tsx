'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParallaxSectionProps {
  children: React.ReactNode
  offset?: number
  className?: string
}

export function ParallaxSection({ 
  children, 
  offset = 50,
  className 
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 0 }
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, offset]),
    springConfig
  )

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
}

export function ParallaxImage({ 
  src, 
  alt, 
  className,
  speed = 0.5 
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute inset-0 w-full h-full object-cover scale-110"
      />
    </div>
  )
}

interface ParallaxTextProps {
  children: React.ReactNode
  className?: string
  y?: MotionValue<number>
}

export function ParallaxText({ children, className, y }: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const defaultY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      style={{ y: y || defaultY, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Multi-layer parallax hero section
interface ParallaxHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  foregroundImage?: string
  className?: string
}

export function ParallaxHero({
  title,
  subtitle,
  backgroundImage,
  foregroundImage,
  className
}: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <div 
      ref={containerRef}
      className={cn("relative h-screen overflow-hidden", className)}
    >
      {/* Background Layer */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: y1 }}
        >
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        </motion.div>
      )}

      {/* Content Layer */}
      <motion.div
        className="relative z-10 flex items-center justify-center h-full"
        style={{ opacity }}
      >
        <div className="text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Foreground Layer */}
      {foregroundImage && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-20"
          style={{ y: y2 }}
        >
          <img
            src={foregroundImage}
            alt="Foreground"
            className="w-full"
          />
        </motion.div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  )
}

// Floating elements that move with parallax
interface FloatingElementProps {
  children: React.ReactNode
  speed?: number
  rotateSpeed?: number
  className?: string
}

export function FloatingElement({
  children,
  speed = 0.5,
  rotateSpeed = 0.2,
  className
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, rotateSpeed * 360])

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  )
}