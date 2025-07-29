import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { clerkClient } from '@clerk/nextjs/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  
  if (!process.env.STRIPE_SECRET_KEY || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  }
  
  // Initialize Stripe only when needed
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
    typescript: true,
  })
  
  const body = await req.text()
  const signature = headers().get('stripe-signature')
  
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const userId = session.metadata?.userId
        const planType = session.metadata?.planType

        if (userId && planType) {
          // Update user metadata with subscription info
          await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
              subscriptionStatus: 'active',
            },
            privateMetadata: {
              stripeCustomerId: session.customer,
              subscriptionId: session.subscription,
              planType,
            },
          })

          console.log(`Subscription activated for user ${userId} with plan ${planType}`)
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object
        const userId = subscription.metadata?.userId

        if (userId) {
          await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
              subscriptionStatus: subscription.status,
            },
            privateMetadata: {
              subscriptionId: subscription.id,
            },
          })

          console.log(`Subscription updated for user ${userId}: ${subscription.status}`)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        const userId = subscription.metadata?.userId

        if (userId) {
          await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
              subscriptionStatus: 'cancelled',
            },
          })

          console.log(`Subscription cancelled for user ${userId}`)
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
        const userId = subscription.metadata?.userId

        if (userId) {
          await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
              subscriptionStatus: 'past_due',
            },
          })

          console.log(`Payment failed for user ${userId}`)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}