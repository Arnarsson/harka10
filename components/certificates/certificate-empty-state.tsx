"use client"

import { motion } from "framer-motion"
import { Award, ArrowRight } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"

export function CertificateEmptyState() {
  const illustration = (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle
        cx="100"
        cy="100"
        r="80"
        stroke="currentColor"
        strokeWidth="2"
        className="text-muted-foreground/20"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.path
        d="M100 50 L110 70 L135 70 L115 85 L125 110 L100 90 L75 110 L85 85 L65 70 L90 70 Z"
        fill="currentColor"
        className="text-muted-foreground/30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      />
      <motion.circle
        cx="100"
        cy="150"
        r="5"
        fill="currentColor"
        className="text-primary"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 0.8, duration: 0.3 }}
      />
      <motion.path
        d="M100 150 Q120 130 140 130 T180 150"
        stroke="currentColor"
        strokeWidth="2"
        className="text-muted-foreground/20"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
      <motion.path
        d="M100 150 Q80 130 60 130 T20 150"
        stroke="currentColor"
        strokeWidth="2"
        className="text-muted-foreground/20"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
    </svg>
  )

  return (
    <EmptyState
      illustration={illustration}
      title="No certificates yet"
      description="Complete your first course to earn a certificate that you can share on LinkedIn"
      action={{
        label: "Browse Courses",
        onClick: () => window.location.href = "/learning",
      }}
    />
  )
}

export function CertificateGalleryEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-muted/20 rounded-lg border-2 border-dashed p-12"
    >
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-background rounded-full"
        >
          <Award className="h-8 w-8 text-muted-foreground" />
        </motion.div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Your certificates will appear here</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Each certificate can be shared on LinkedIn with one click
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 text-sm text-primary"
        >
          Start learning <ArrowRight className="h-4 w-4" />
        </motion.div>
      </div>
    </motion.div>
  )
}