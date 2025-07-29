// Stripe configuration and plans
// Note: Stripe instance is created in API routes to avoid build-time issues

export const PLANS = {
  FREE_TRIAL: {
    name: 'Free Trial',
    price: 0,
    priceId: '',
    features: [
      '7-day free trial',
      'Access to all courses',
      'Basic support',
      'Certificate of completion',
      'Mobile app access'
    ],
    limitations: [
      'Limited to 1 user',
      'No team features',
      'Basic analytics only'
    ]
  },
  PREMIUM: {
    name: 'Premium',
    price: 299,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID || '',
    features: [
      'Everything in Free Trial',
      'Up to 50 users',
      'Team analytics',
      'Advanced progress tracking',
      'Priority support',
      'Custom branding',
      'Integration with LMS',
      'Bulk user management'
    ]
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: null,
    priceId: '',
    features: [
      'Everything in Premium',
      'Unlimited users',
      'Single Sign-On',
      'Custom integrations',
      'Dedicated success manager',
      'Advanced analytics',
      'API access',
      'White-label solution'
    ]
  }
} as const

export type PlanType = keyof typeof PLANS