'use client'

import { withAuth } from '@/lib/auth/hooks'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, GraduationCap, Users, Award, 
  TrendingUp, DollarSign, Calendar, Settings 
} from 'lucide-react'
import Link from 'next/link'

function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, change: '+12%' },
    { label: 'Active Courses', value: '56', icon: GraduationCap, change: '+5%' },
    { label: 'Certificates Issued', value: '892', icon: Award, change: '+18%' },
    { label: 'Revenue', value: '$45,231', icon: DollarSign, change: '+23%' }
  ]

  const quickActions = [
    { label: 'Create Course', href: '/admin/courses/new', icon: GraduationCap },
    { label: 'Manage Users', href: '/admin/users', icon: Users },
    { label: 'Certificate Templates', href: '/admin/certificates', icon: Award },
    { label: 'Platform Settings', href: '/admin/settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <LayoutDashboard size={24} />
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>
            <Link
              href="/dashboard"
              className="text-sm text-zinc-600 hover:text-black transition-colors hover:shadow-sm active:scale-95"
            >
              Back to Platform
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg border border-zinc-200"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon size={24} className="text-zinc-600" />
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-zinc-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="bg-white p-4 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors hover:shadow-md active:scale-95 flex items-center gap-3"
              >
                <action.icon size={20} />
                <span className="font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Enrollments */}
          <section className="bg-white p-6 rounded-lg border border-zinc-200">
            <h2 className="text-lg font-semibold mb-4">Recent Enrollments</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b border-zinc-100 last:border-0">
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-zinc-600">Complete Web Development Bootcamp</p>
                  </div>
                  <span className="text-sm text-zinc-500">2 hours ago</span>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Certificates */}
          <section className="bg-white p-6 rounded-lg border border-zinc-200">
            <h2 className="text-lg font-semibold mb-4">Recent Certificates</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b border-zinc-100 last:border-0">
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-zinc-600">UI/UX Design Masterclass</p>
                  </div>
                  <span className="text-sm text-zinc-500">5 hours ago</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

// Protect this page - only admins can access
export default withAuth(AdminDashboard, {
  requireAuth: true,
  requireRole: 'admin',
  redirectTo: '/login'
})
