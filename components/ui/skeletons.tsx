'use client'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface SkeletonWrapperProps {
  children: React.ReactNode
  baseColor?: string
  highlightColor?: string
}

export function SkeletonWrapper({ 
  children, 
  baseColor = '#e5e7eb', 
  highlightColor = '#f3f4f6' 
}: SkeletonWrapperProps) {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      {children}
    </SkeletonTheme>
  )
}

export function CertificateCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="aspect-[16/11] bg-gray-100">
        <Skeleton height="100%" />
      </div>
      <div className="p-4 space-y-3">
        <div>
          <Skeleton height={24} />
          <Skeleton height={16} width="60%" className="mt-1" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton width={100} height={14} />
          <Skeleton width={60} height={14} />
        </div>
        <div className="flex gap-1">
          <Skeleton width={60} height={24} borderRadius={20} />
          <Skeleton width={60} height={24} borderRadius={20} />
          <Skeleton width={60} height={24} borderRadius={20} />
        </div>
      </div>
    </div>
  )
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="aspect-video bg-gray-100">
        <Skeleton height="100%" />
      </div>
      <div className="p-4 space-y-3">
        <Skeleton height={20} />
        <Skeleton height={16} count={2} />
        <div className="flex items-center gap-4">
          <Skeleton width={80} height={16} />
          <Skeleton width={60} height={16} />
        </div>
        <Skeleton height={36} borderRadius={8} />
      </div>
    </div>
  )
}

export function DashboardStatSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <Skeleton width={120} height={16} />
        <Skeleton width={40} height={40} circle />
      </div>
      <Skeleton height={32} width={100} />
      <Skeleton height={14} width={80} className="mt-2" />
    </div>
  )
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <Skeleton height={16} />
        </td>
      ))}
    </tr>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton width={80} height={80} circle />
        <div className="flex-1">
          <Skeleton height={24} width={200} />
          <Skeleton height={16} width={150} className="mt-2" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-lg">
            <Skeleton height={40} />
            <Skeleton height={16} width="60%" className="mt-2" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function LessonContentSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton height={32} width="70%" />
      <div className="aspect-video bg-gray-100">
        <Skeleton height="100%" />
      </div>
      <div className="space-y-2">
        <Skeleton height={20} count={4} />
        <Skeleton height={20} width="80%" />
      </div>
    </div>
  )
}

export function CertificateGallerySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <CertificateCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ProgressBarSkeleton() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Skeleton width={150} height={16} />
        <Skeleton width={40} height={16} />
      </div>
      <Skeleton height={16} borderRadius={8} />
    </div>
  )
}