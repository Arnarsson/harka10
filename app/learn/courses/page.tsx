import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { HeklaCourses } from "@/components/courses/hekla-courses"
import { PageTransition } from "@/components/layout/page-transition"

export default function CoursesPage() {
  return (
    <DashboardLayoutMinimal>
      <PageTransition>
        <HeklaCourses />
      </PageTransition>
    </DashboardLayoutMinimal>
  )
}