"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, TrendingUp } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import React from "react"

export function HeroSection() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={ref} className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"
        style={{ y: yBackground }}
      />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ y: yText }} className="space-y-8 smooth-enter">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-satoshi">
                <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                Trusted by 500+ Nordic Companies
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold font-satoshi tracking-tight leading-tight">
                AI der leverer
                <span className="block text-gradient">reel forretningsværdi</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed font-satoshi">
                Transform your organization through our comprehensive three-phase AI training methodology. From
                fundamentals to ethical implementation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group font-satoshi font-medium">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="group font-satoshi font-medium bg-transparent">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary font-satoshi">95%</div>
                <div className="text-sm text-muted-foreground font-satoshi">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary font-satoshi">500+</div>
                <div className="text-sm text-muted-foreground font-satoshi">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary font-satoshi">4.9</div>
                <div className="text-sm text-muted-foreground font-satoshi">User Rating</div>
              </div>
            </div>
          </motion.div>

          <div className="relative smooth-enter">
            <div className="harka-card p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold font-satoshi">Learning Progress</h3>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>

              {/* Progress visualization */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-satoshi">
                    <span>Fundamentals</span>
                    <span className="text-primary font-medium">100%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full harka-gradient rounded-full w-full transition-all duration-1000" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-satoshi">
                    <span>Ethics & Governance</span>
                    <span className="text-primary font-medium">75%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full harka-gradient rounded-full w-3/4 transition-all duration-1000" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-satoshi">
                    <span>Implementation</span>
                    <span className="text-muted-foreground font-medium">45%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary/60 to-primary/40 rounded-full w-[45%] transition-all duration-1000" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground font-satoshi">Next Module</div>
                    <div className="text-sm font-medium font-satoshi">Project Planning Workshop</div>
                  </div>
                  <Button size="sm" className="font-satoshi font-medium">
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient lines */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="harka-lines" />
      </div>
    </section>
  )
}
