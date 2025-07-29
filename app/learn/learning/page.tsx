import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { LearningDashboard } from "@/components/learning/learning-dashboard"
import { PersonalizedRecommendations } from "@/components/ai/personalized-recommendations"

export default function LearningPage() {
  return (
    <DashboardLayoutMinimal>
      <div className="space-y-8">
        {/* AI-Powered Personalized Recommendations */}
        <PersonalizedRecommendations />
        
        {/* Original Learning Dashboard */}
        <LearningDashboard />
      </div>
    </DashboardLayoutMinimal>
  )
}
