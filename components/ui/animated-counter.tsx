"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
}

export function AnimatedCounter({ value, suffix = "", duration = 1 }: AnimatedCounterProps) {
  const [hasAnimated, setHasAnimated] = useState(false)
  
  const spring = useSpring(0, {
    damping: 30,
    stiffness: 100,
  })
  
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  )

  useEffect(() => {
    if (!hasAnimated) {
      spring.set(value)
      setHasAnimated(true)
    }
  }, [spring, value, hasAnimated])

  return (
    <span>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}