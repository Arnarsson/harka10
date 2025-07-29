import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { LearningAnalytics } from "@/components/analytics/learning-analytics"

export default function AnalyticsPage() {
  return (
    <DashboardLayoutMinimal>
      <LearningAnalytics />
    </DashboardLayoutMinimal>
  )
}