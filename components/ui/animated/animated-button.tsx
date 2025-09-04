"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode
  shimmer?: boolean
  glow?: boolean
}

export function AnimatedButton({ 
  children, 
  className,
  shimmer = false,
  glow = false,
  ...props 
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Button 
        className={cn(
          "relative overflow-hidden",
          shimmer && "btn-enhanced",
          glow && "animate-pulse-glow",
          className
        )} 
        {...props}
      >
        {shimmer && (
          <motion.span
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ["0%", "200%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear"
            }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </Button>
    </motion.div>
  )
}

export function GradientButton({ 
  children, 
  className,
  variant = "primary",
  ...props 
}: AnimatedButtonProps & { variant?: "primary" | "secondary" | "accent" }) {
  const gradients = {
    primary: "from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
    secondary: "from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600",
    accent: "from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
  }

  return (
    <motion.button
      className={cn(
        "px-6 py-3 rounded-lg font-semibold text-white",
        "bg-gradient-to-r transition-all duration-200",
        "shadow-lg hover:shadow-xl",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        gradients[variant],
        className
      )}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}