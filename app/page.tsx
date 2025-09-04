import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DanishB2BLanding } from '@/components/landing/danish-b2b-landing'

export default async function HomePage() {
  const { userId } = await auth()
  
  // If user is logged in, redirect to dashboard
  if (userId) {
    redirect('/dashboard')
  }

  // Otherwise show the Danish B2B landing page for enterprise customers
  return <DanishB2BLanding />
}