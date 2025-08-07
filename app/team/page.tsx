import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { TeamInvitations } from '@/components/team/TeamInvitations'

export default async function TeamPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Team Administration
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Inviter og administrer dit team. Tildel roller og spor deres fremgang.
          </p>
        </div>

        <TeamInvitations />
      </div>
    </DashboardLayout>
  )
}