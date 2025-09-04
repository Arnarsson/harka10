import { DashboardSkeleton } from "@/components/ui/skeleton-loaders/dashboard-skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen">
      <DashboardSkeleton />
    </div>
  )
}
