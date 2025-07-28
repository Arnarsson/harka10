"use client"

import { motion } from "framer-motion"
import { Card, CardProps } from "./card"
import { cardHover } from "@/lib/animations"
import { forwardRef } from "react"

interface AnimatedCardProps extends CardProps {
  children: React.ReactNode
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.div
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        <Card ref={ref} className={className} {...props}>
          {children}
        </Card>
      </motion.div>
    )
  }
)

AnimatedCard.displayName = "AnimatedCard"