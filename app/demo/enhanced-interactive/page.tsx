"use client"

import { EnhancedInteractiveViewer } from '@/components/learning/enhanced-interactive-viewer'

export default function EnhancedInteractivePage() {
  const handleComplete = (lessonId: string) => {
    console.log(`Lesson ${lessonId} completed!`)
  }

  return (
    <div className="min-h-screen bg-background">
      <EnhancedInteractiveViewer 
        onComplete={handleComplete}
      />
    </div>
  )
}