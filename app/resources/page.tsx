import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { ResourcesPage } from "@/components/resources/resources-page"
import { PageTransition } from "@/components/layout/page-transition"

export default function Resources() {
  return (
    <DashboardLayoutMinimal>
      <PageTransition>
        <ResourcesPage />
      </PageTransition>
    </DashboardLayoutMinimal>
  )
}