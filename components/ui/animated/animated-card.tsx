"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode
  delay?: number
  hover?: boolean
}

export function AnimatedCard({ 
  children, 
  className, 
  delay = 0,
  hover = true,
  ...props 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut"
      }}
      whileHover={hover ? { 
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
    >
      <Card 
        className={cn(
          "overflow-hidden transition-shadow hover:shadow-xl hover:shadow-purple-500/10",
          className
        )} 
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  )
}

export function GlassCard({ 
  children, 
  className,
  ...props 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "glass rounded-lg p-6 border border-white/20",
        "hover:border-purple-500/30 transition-colors",
        className
      )}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(147, 51, 234, 0.15)"
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}