import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { DashboardOverviewAnimated } from "@/components/dashboard/dashboard-overview-animated"
import { PageTransition } from "@/components/layout/page-transition"

export default function DashboardPage() {
  return (
    <DashboardLayoutMinimal>
      <PageTransition>
        <DashboardOverviewAnimated />
      </PageTransition>
    </DashboardLayoutMinimal>
  )
}