import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { LearningDashboard } from "@/components/learning/learning-dashboard"
import { PageTransition } from "@/components/layout/page-transition"

export default function LearningPage() {
  return (
    <DashboardLayoutMinimal>
      <PageTransition>
        <LearningDashboard />
      </PageTransition>
    </DashboardLayoutMinimal>
  )
}
