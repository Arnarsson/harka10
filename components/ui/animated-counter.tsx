'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
  className?: string
  formatValue?: (value: number) => string
}

export function AnimatedCounter({
  value,
  duration = 2,
  decimals = 0,
  suffix = '',
  prefix = '',
  className = '',
  formatValue
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  
  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0
  })
  
  const display = useTransform(spring, (current) => {
    if (formatValue) {
      return formatValue(current)
    }
    
    const formatted = decimals > 0 
      ? current.toFixed(decimals)
      : Math.round(current).toLocaleString()
    
    return `${prefix}${formatted}${suffix}`
  })
  
  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [spring, value, isInView])
  
  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <motion.span>{display}</motion.span>
    </motion.span>
  )
}

interface PercentageCounterProps extends Omit<AnimatedCounterProps, 'suffix' | 'formatValue'> {
  showDecimal?: boolean
}

export function PercentageCounter({
  value,
  duration = 2,
  showDecimal = false,
  className = '',
  prefix = ''
}: PercentageCounterProps) {
  return (
    <AnimatedCounter
      value={value}
      duration={duration}
      decimals={showDecimal ? 1 : 0}
      suffix="%"
      prefix={prefix}
      className={className}
    />
  )
}

interface StatCardProps {
  title: string
  value: number
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  suffix?: string
  prefix?: string
  decimals?: number
  formatValue?: (value: number) => string
  className?: string
}

export function AnimatedStatCard({
  title,
  value,
  icon,
  trend,
  suffix,
  prefix,
  decimals = 0,
  formatValue,
  className = ''
}: StatCardProps) {
  return (
    <motion.div
      className={`bg-white rounded-lg p-6 shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && (
          <motion.div
            className="text-gray-400"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {icon}
          </motion.div>
        )}
      </div>
      
      <div className="flex items-baseline gap-2">
        <AnimatedCounter
          value={value}
          duration={2.5}
          decimals={decimals}
          suffix={suffix}
          prefix={prefix}
          formatValue={formatValue}
          className="text-2xl font-bold text-gray-900"
        />
        
        {trend && (
          <motion.span
            className={`text-sm font-medium flex items-center gap-1 ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.span
              animate={{ y: trend.isPositive ? -1 : 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            >
              {trend.isPositive ? '↑' : '↓'}
            </motion.span>
            {Math.abs(trend.value)}%
          </motion.span>
        )}
      </div>
    </motion.div>
  )
}