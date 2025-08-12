import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { HarkaStyleLanding } from '@/components/landing/harka-style-landing'

export default async function HomePage() {
  const { userId } = await auth()
  
  // If user is logged in, redirect to dashboard
  if (userId) {
    redirect('/learn/dashboard')
  }

  // Otherwise show the harka.dk style landing page for guests
  return <HarkaStyleLanding />
}