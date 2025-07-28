"use client"

import { motion } from "framer-motion"
import { pageVariants } from "@/lib/animations"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}