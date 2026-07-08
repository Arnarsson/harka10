import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { HeklaCertificates } from "@/components/certificates/hekla-certificates"
import { PageTransition } from "@/components/layout/page-transition"

export default function CertificatesPage() {
  return (
    <DashboardLayoutMinimal>
      <PageTransition>
        <HeklaCertificates />
      </PageTransition>
    </DashboardLayoutMinimal>
  )
}