"use client"

import { motion } from "framer-motion"
import { Button, ButtonProps } from "./button"
import { buttonHover } from "@/lib/animations"
import { forwardRef } from "react"

export const AnimatedButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <motion.div
        variants={buttonHover}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        style={{ display: "inline-block" }}
      >
        <Button ref={ref} {...props}>
          {children}
        </Button>
      </motion.div>
    )
  }
)

AnimatedButton.displayName = "AnimatedButton"