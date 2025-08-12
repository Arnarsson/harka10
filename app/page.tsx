import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { AbstractMinimalLanding } from '@/components/landing/abstract-minimal-landing'

export default async function HomePage() {
  const { userId } = await auth()
  
  // If user is logged in, redirect to dashboard
  if (userId) {
    redirect('/dashboard')
  }

  // Otherwise show the abstract minimal landing page for guests
  return <AbstractMinimalLanding />
}