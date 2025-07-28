import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { LearningProgress } from "@/components/dashboard/learning-progress"
import { TeamAnalytics } from "@/components/dashboard/team-analytics"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardOverview />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <LearningProgress />
            <TeamAnalytics />
          </div>

          <div className="space-y-8">
            <QuickActions />
            <UpcomingDeadlines />
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
