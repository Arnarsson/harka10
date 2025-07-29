import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { HarkaCourses } from "@/components/courses/harka-courses"
import { PageTransition } from "@/components/layout/page-transition"

export default function CoursesPage() {
  return (
    <DashboardLayoutMinimal>
      <PageTransition>
        <HarkaCourses />
      </PageTransition>
    </DashboardLayoutMinimal>
  )
}