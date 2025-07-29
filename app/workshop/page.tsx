import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { DanishCurriculum } from "@/components/workshop/danish-curriculum"
import { PageTransition } from "@/components/layout/page-transition"

export default function WorkshopPage() {
  return (
    <DashboardLayoutMinimal>
      <PageTransition>
        <DanishCurriculum />
      </PageTransition>
    </DashboardLayoutMinimal>
  )
}