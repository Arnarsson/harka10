'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Award, 
  TrendingUp, 
  Users, 
  Clock,
  Sparkles,
  Zap,
  Target,
  Trophy
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedCounter, PercentageCounter, AnimatedStatCard } from '@/components/ui/animated-counter'
import { AnimatedToast, ToastContainer, useToast } from '@/components/ui/animated-toast'
import { ParallaxSection, ParallaxImage, ParallaxText, FloatingElement } from '@/components/ui/parallax-section'
import { AnimatedTooltip, HelpTooltip, AnimatedHint } from '@/components/ui/animated-tooltip'
import { SectionTransition, StaggerContainer, StaggerItem } from '@/components/layout/page-transition'
import { useGlobalKeyboardShortcuts } from '@/hooks/use-keyboard-navigation'

export default function AnimationsDemoPage() {
  const { toasts, toast, removeToast } = useToast()
  const shortcuts = useGlobalKeyboardShortcuts()
  const [demoStats, setDemoStats] = useState({
    progress: 73,
    members: 24,
    completion: 5.2,
    certificates: 18
  })

  const stats = [
    {
      title: 'Overall Progress',
      value: demoStats.progress,
      icon: <TrendingUp className="h-5 w-5" />,
      suffix: '%',
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Team Members',
      value: demoStats.members,
      icon: <Users className="h-5 w-5" />,
      trend: { value: 3, isPositive: true }
    },
    {
      title: 'Avg. Completion Time',
      value: demoStats.completion,
      icon: <Clock className="h-5 w-5" />,
      suffix: ' weeks',
      decimals: 1,
      trend: { value: 0.8, isPositive: false }
    },
    {
      title: 'Certificates Earned',
      value: demoStats.certificates,
      icon: <Award className="h-5 w-5" />,
      trend: { value: 6, isPositive: true }
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax */}
      <ParallaxSection className="relative h-screen bg-gradient-to-br from-purple-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <FloatingElement speed={0.3} className="absolute top-20 left-20">
            <Sparkles className="h-32 w-32 text-white" />
          </FloatingElement>
          <FloatingElement speed={-0.5} rotateSpeed={0.5} className="absolute bottom-20 right-20">
            <Zap className="h-40 w-40 text-white" />
          </FloatingElement>
          <FloatingElement speed={0.7} className="absolute top-40 right-40">
            <Target className="h-24 w-24 text-white" />
          </FloatingElement>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="text-center">
            <ParallaxText className="mb-4">
              <h1 className="text-6xl font-bold mb-4">Phase 1 Complete</h1>
            </ParallaxText>
            <ParallaxText className="mb-8">
              <p className="text-2xl opacity-90">Polish & Delight - All Animations Demo</p>
            </ParallaxText>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                variant="secondary"
                onClick={() => toast.success('Welcome to the demo!', 'Explore all the new animations')}
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-white opacity-50">Scroll to explore</div>
        </motion.div>
      </ParallaxSection>

      {/* Animated Statistics Section */}
      <SectionTransition delay={0.2} className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Animated Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AnimatedStatCard {...stat} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-6">Progress Indicators</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Course Progress</span>
                <PercentageCounter value={85} />
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Team Achievement</span>
                <PercentageCounter value={92} showDecimal />
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: '92%' }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* Toast Notifications Demo */}
      <SectionTransition delay={0.3} className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Toast Notifications</h2>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={() => toast.success('Success!', 'Your changes have been saved')}>
            Show Success Toast
          </Button>
          <Button 
            variant="destructive"
            onClick={() => toast.error('Error!', 'Something went wrong')}
          >
            Show Error Toast
          </Button>
          <Button 
            variant="outline"
            onClick={() => toast.info('Info', 'New updates are available')}
          >
            Show Info Toast
          </Button>
          <Button 
            variant="secondary"
            onClick={() => toast.warning('Warning', 'Please review your settings')}
          >
            Show Warning Toast
          </Button>
        </div>
      </SectionTransition>

      {/* Tooltips & Hints Demo */}
      <SectionTransition delay={0.4} className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Tooltips & Hints</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <h3 className="font-semibold mb-4">Hover Tooltips</h3>
            <div className="flex justify-center gap-4">
              <AnimatedTooltip content="Top tooltip" side="top">
                <Button variant="outline">Top</Button>
              </AnimatedTooltip>
              <AnimatedTooltip content="Bottom tooltip" side="bottom">
                <Button variant="outline">Bottom</Button>
              </AnimatedTooltip>
              <AnimatedTooltip content="Left tooltip" side="left">
                <Button variant="outline">Left</Button>
              </AnimatedTooltip>
              <AnimatedTooltip content="Right tooltip" side="right">
                <Button variant="outline">Right</Button>
              </AnimatedTooltip>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <h3 className="font-semibold mb-4">Help Tooltips</h3>
            <div className="flex items-center justify-center gap-2">
              <span>Click for help</span>
              <HelpTooltip content="This is a helpful explanation" size="md" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <h3 className="font-semibold mb-4">Animated Hints</h3>
            <AnimatedHint content="Try clicking me!" delay={500}>
              <Button>Interactive Button</Button>
            </AnimatedHint>
          </div>
        </div>
      </SectionTransition>

      {/* Stagger Animation Demo */}
      <SectionTransition delay={0.5} className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Stagger Animations</h2>
        
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[Trophy, Award, Target, Zap].map((Icon, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-12 w-12 text-purple-600 mb-2" />
                <span className="text-sm font-medium">Achievement {index + 1}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionTransition>

      {/* Keyboard Shortcuts Info */}
      <SectionTransition delay={0.6} className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Keyboard Navigation</h2>
        
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <p className="text-gray-600 mb-6">Try these keyboard shortcuts:</p>
          <div className="space-y-2">
            {shortcuts.slice(0, 5).map((shortcut, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <span className="text-sm">{shortcut.description}</span>
                <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">
                  {shortcut.ctrl && 'Ctrl + '}{shortcut.shift && 'Shift + '}{shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">Press Shift + ? to see all shortcuts</p>
        </div>
      </SectionTransition>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}