'use client'

import type React from "react"
import { AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { PageTransition } from "@/components/layout/page-transition"

interface RootLayoutClientProps {
  children: React.ReactNode
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pathname}>
        {children}
      </PageTransition>
    </AnimatePresence>
  )
}
