"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  variant?: "text" | "circular" | "rectangular"
  width?: string | number
  height?: string | number
}

export function SkeletonLoader({
  className,
  variant = "text",
  width,
  height,
}: SkeletonProps) {
  const baseClasses = "relative overflow-hidden bg-muted"
  
  const variantClasses = {
    text: "h-4 w-full rounded",
    circular: "rounded-full",
    rectangular: "rounded-[var(--radius)]",
  }

  const shimmerAnimation = {
    animate: {
      backgroundPosition: ["200% 0", "-200% 0"],
    },
    transition: {
      duration: 1.5,
      ease: "linear",
      repeat: Infinity,
    },
  }

  return (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{
        width,
        height,
        background: `linear-gradient(
          90deg,
          hsl(var(--muted)) 0%,
          hsl(var(--muted) / 0.7) 50%,
          hsl(var(--muted)) 100%
        )`,
        backgroundSize: "200% 100%",
      }}
      animate={shimmerAnimation.animate}
      transition={shimmerAnimation.transition}
    />
  )
}

// Preset skeleton components
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLoader
          key={i}
          variant="text"
          width={i === lines - 1 ? "60%" : "100%"}
        />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="p-6 border rounded-[var(--radius)] space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <SkeletonLoader variant="text" width="40%" />
          <SkeletonLoader variant="rectangular" width="60%" height={32} />
          <SkeletonLoader variant="text" width="30%" />
        </div>
        <SkeletonLoader variant="circular" width={32} height={32} />
      </div>
    </div>
  )
}