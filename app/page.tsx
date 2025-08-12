import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { PublicLanding } from '@/components/landing/public-landing'

export default async function HomePage() {
  const { userId } = await auth()
  
  // If user is logged in, redirect to dashboard
  if (userId) {
    redirect('/dashboard')
  }

  // Otherwise show the public landing page for guests
  return <PublicLanding />
}