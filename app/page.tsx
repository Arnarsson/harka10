import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { HarkaHero } from '@/components/landing/harka-hero'

export default async function HomePage() {
  const { userId } = auth()
  
  // If user is logged in, redirect to dashboard
  if (userId) {
    redirect('/dashboard')
  }

  // Otherwise show the landing page
  return <HarkaHero />
}