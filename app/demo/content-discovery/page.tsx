"use client"

import { RecommendationEngine } from '@/components/content/recommendation-engine'

export default function ContentDiscoveryPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <RecommendationEngine 
          layout="grid"
          maxItems={6}
          showPersonalized={true}
          showCategories={['trending', 'personalized', 'new', 'interactive']}
        />
      </div>
    </div>
  )
}