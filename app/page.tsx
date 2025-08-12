import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { HarkaHeroComplete } from '@/components/landing/harka-hero-complete'

export default async function HomePage() {
  const { userId } = await auth()
  
  // If user is logged in, redirect to dashboard
  if (userId) {
    redirect('/dashboard')
  }

  // Otherwise show the landing page
  return <HarkaHeroComplete />
}