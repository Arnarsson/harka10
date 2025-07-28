"use client"

import { motion } from "framer-motion"
import { Users, BookOpen, Target, TrendingUp } from "lucide-react"
import { AnimatedCard } from "@/components/ui/animated-card"
import { SkeletonCard } from "@/components/ui/skeleton-loader"
import { staggerContainer, staggerItem } from "@/lib/animations"
import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { AnimatedCounter } from "@/components/ui/animated-counter"

export function DashboardOverviewAnimated() {
  const [isLoading, setIsLoading] = useState(true)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    {
      title: "Total Users",
      value: 2456,
      change: "+12% from last month",
      icon: Users,
    },
    {
      title: "Active Modules",
      value: 18,
      change: "3 new this week",
      icon: BookOpen,
    },
    {
      title: "Completion Rate",
      value: 87,
      suffix: "%",
      change: "+5% from last month",
      icon: Target,
    },
    {
      title: "Engagement Score",
      value: 9.2,
      change: "Above average",
      icon: TrendingUp,
    },
  ]

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={staggerItem}>
            <AnimatedCard>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-medium">
                      {inView && (
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity with animations */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={staggerItem} className="space-y-4">
          <h2 className="text-lg font-medium">Recent Activity</h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-3"
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div key={i} variants={staggerItem}>
                <AnimatedCard>
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">User completed "Introduction to AI"</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Learning Progress with animations */}
        <motion.div variants={staggerItem} className="space-y-4">
          <h2 className="text-lg font-medium">Team Progress</h2>
          <div className="space-y-3">
            {[
              { name: "AI Fundamentals", progress: 85 },
              { name: "Machine Learning", progress: 62 },
              { name: "Neural Networks", progress: 45 },
              { name: "Deep Learning", progress: 30 },
            ].map((module, index) => (
              <motion.div
                key={module.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between text-sm">
                  <span>{module.name}</span>
                  <span className="text-muted-foreground">{module.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${module.progress}%` }}
                    transition={{
                      duration: 1,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}