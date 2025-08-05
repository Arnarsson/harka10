import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { AIAssistant } from '@/components/ai/AIAssistant'

export default async function AIAssistantPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            AI Læringsassistent
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Få hjælp med dine spørgsmål, udforsk koncepter og få kodeeksempler
          </p>
        </div>

        <AIAssistant />
      </div>
    </DashboardLayout>
  )
}