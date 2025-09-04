import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in-up">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-64 skeleton-shimmer" />
        <Skeleton className="h-4 w-96 skeleton-shimmer" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card-modern p-6 space-y-2">
            <Skeleton className="h-4 w-24 skeleton-shimmer" />
            <Skeleton className="h-8 w-32 skeleton-shimmer" />
            <Skeleton className="h-3 w-20 skeleton-shimmer" />
          </div>
        ))}
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card-modern p-6 space-y-4 hover-lift">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-10 rounded-lg skeleton-shimmer" />
              <Skeleton className="h-4 w-4 rounded skeleton-shimmer" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4 skeleton-shimmer" />
              <Skeleton className="h-3 w-full skeleton-shimmer" />
              <Skeleton className="h-3 w-5/6 skeleton-shimmer" />
            </div>
            <Skeleton className="h-9 w-full rounded-lg skeleton-shimmer" />
          </div>
        ))}
      </div>

      {/* Progress Section Skeleton */}
      <div className="card-modern p-6 space-y-4">
        <Skeleton className="h-6 w-48 skeleton-shimmer" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32 skeleton-shimmer" />
                <Skeleton className="h-4 w-12 skeleton-shimmer" />
              </div>
              <Skeleton className="h-2 w-full rounded-full skeleton-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="card-modern p-6 space-y-4 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-10 rounded-lg skeleton-shimmer" />
        <Skeleton className="h-4 w-4 rounded skeleton-shimmer" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4 skeleton-shimmer" />
        <Skeleton className="h-3 w-full skeleton-shimmer" />
      </div>
      <Skeleton className="h-9 w-full rounded-lg skeleton-shimmer" />
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="card-modern overflow-hidden animate-fade-in-up">
      <div className="p-4 border-b">
        <Skeleton className="h-6 w-48 skeleton-shimmer" />
      </div>
      <div className="p-0">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              {[1, 2, 3, 4].map((i) => (
                <th key={i} className="p-4 text-left">
                  <Skeleton className="h-4 w-24 skeleton-shimmer" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((row) => (
              <tr key={row} className="border-b">
                {[1, 2, 3, 4].map((col) => (
                  <td key={col} className="p-4">
                    <Skeleton className="h-4 w-32 skeleton-shimmer" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function CourseSkeleton() {
  return (
    <div className="card-modern overflow-hidden animate-fade-in-up hover-lift">
      <Skeleton className="h-48 w-full skeleton-shimmer" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4 skeleton-shimmer" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-full skeleton-shimmer" />
          <Skeleton className="h-3 w-5/6 skeleton-shimmer" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24 skeleton-shimmer" />
          <Skeleton className="h-8 w-20 rounded-lg skeleton-shimmer" />
        </div>
      </div>
    </div>
  )
}