import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { BookmarkNotes } from '@/components/learning/BookmarkNotes'

export default async function NotesPage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Mine Noter & Bogmærker
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Organiser dine noter, bogmærker og læringsmateriale ét sted.
          </p>
        </div>

        <BookmarkNotes />
      </div>
    </DashboardLayout>
  )
}