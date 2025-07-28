import { AnalyticsLayout } from "@/components/analytics/analytics-layout"
import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { LearningAnalytics } from "@/components/analytics/learning-analytics"
import { EngagementMetrics } from "@/components/analytics/engagement-metrics"
import { PerformanceInsights } from "@/components/analytics/performance-insights"

export default function AnalyticsPage() {
  return (
    <AnalyticsLayout>
      <div className="space-y-8">
        <AnalyticsOverview />

        <div className="grid lg:grid-cols-2 gap-8">
          <LearningAnalytics />
          <EngagementMetrics />
        </div>

        <PerformanceInsights />
      </div>
    </AnalyticsLayout>
  )
}
