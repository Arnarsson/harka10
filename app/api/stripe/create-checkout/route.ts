import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PLANS } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  try {
    // Check if Stripe is properly configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
    }
    
    // Initialize Stripe only when needed
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
      typescript: true,
    })
    
    const user = await currentUser()
    const userId = user?.id
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planType, billingCycle = 'monthly' } = await req.json()

    if (!planType || !PLANS[planType as keyof typeof PLANS]) {
      return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 })
    }

    const plan = PLANS[planType as keyof typeof PLANS]
    
    if (!plan.priceId) {
      return NextResponse.json({ error: 'Plan not available for purchase' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/learn/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        userId,
        planType,
        billingCycle,
      },
      subscription_data: {
        metadata: {
          userId,
          planType,
        },
      },
      customer_email: undefined, // Let Stripe handle email collection
      allow_promotion_codes: true,
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}