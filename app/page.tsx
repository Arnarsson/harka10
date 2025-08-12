import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { EnhancedHero } from '@/components/landing/enhanced-hero'

export default async function HomePage() {
  const { userId } = await auth()
  
  // If user is logged in, redirect to dashboard
  if (userId) {
    redirect('/dashboard')
  }

  // Otherwise show the enhanced landing page
  return <EnhancedHero />
}