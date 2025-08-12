import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { SimpleHero } from '@/components/landing/simple-hero'

export default async function HomePage() {
  const { userId } = await auth()
  
  // If user is logged in, redirect to dashboard
  if (userId) {
    redirect('/learn/dashboard')
  }

  // Otherwise show the simple landing page
  return <SimpleHero />
}