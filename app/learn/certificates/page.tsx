import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { HarkaCertificates } from "@/components/certificates/harka-certificates"
import { PageTransition } from "@/components/layout/page-transition"

export default function CertificatesPage() {
  return (
    <DashboardLayoutMinimal>
      <PageTransition>
        <HarkaCertificates />
      </PageTransition>
    </DashboardLayoutMinimal>
  )
}