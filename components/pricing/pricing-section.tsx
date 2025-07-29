"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Star, Zap, Crown } from "lucide-react"

interface PricingSectionProps {
  language?: 'da' | 'en'
}

export function PricingSection({ language = 'da' }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const content = {
    da: {
      title: "Vælg din plan",
      subtitle: "Start din AI-rejse med den rigtige plan for din organisation",
      monthly: "Månedlig",
      annual: "Årlig",
      annualSavings: "Spar 20%",
      getStarted: "Kom i gang",
      startTrial: "Start gratis prøveperiode",
      contactSales: "Kontakt salg",
      mostPopular: "Mest populære",
      comingSoon: "Kommer snart",
      features: {
        everything: "Alt i Premium",
        support: "Prioriteret support",
        analytics: "Avanceret analyse",
        sso: "Single Sign-On",
        custom: "Brugerdefineret integration",
        dedicated: "Dedikeret kundesucces",
        unlimited: "Ubegrænset adgang",
        api: "API adgang"
      }
    },
    en: {
      title: "Choose your plan",
      subtitle: "Start your AI journey with the right plan for your organization",
      monthly: "Monthly",
      annual: "Annual",
      annualSavings: "Save 20%",
      getStarted: "Get started",
      startTrial: "Start free trial",
      contactSales: "Contact sales",
      mostPopular: "Most popular",
      comingSoon: "Coming soon",
      features: {
        everything: "Everything in Premium",
        support: "Priority support",
        analytics: "Advanced analytics",
        sso: "Single Sign-On",
        custom: "Custom integrations",
        dedicated: "Dedicated success manager",
        unlimited: "Unlimited access",
        api: "API access"
      }
    }
  }

  const t = content[language]

  const plans = [
    {
      name: "Free Trial",
      nameKey: "freeTrial",
      description: "Perfect for getting started",
      descriptionKey: "freeTrialDesc",
      price: { monthly: 0, annual: 0 },
      popular: false,
      icon: Star,
      features: [
        "7-day free trial",
        "Access to all courses",
        "Basic support",
        "Certificate of completion",
        "Mobile app access"
      ],
      limitations: [
        "Limited to 1 user",
        "No team features",
        "Basic analytics only"
      ]
    },
    {
      name: "Premium",
      nameKey: "premium",
      description: "For teams and organizations",
      descriptionKey: "premiumDesc",
      price: { monthly: 299, annual: 2390 },
      popular: true,
      icon: Crown,
      features: [
        "Everything in Free Trial",
        "Up to 50 users",
        "Team analytics",
        "Advanced progress tracking",
        "Priority support",
        "Custom branding",
        "Integration with LMS",
        "Bulk user management"
      ],
      limitations: []
    },
    {
      name: "Enterprise",
      nameKey: "enterprise",
      description: "For large organizations",
      descriptionKey: "enterpriseDesc",
      price: { monthly: null, annual: null },
      popular: false,
      comingSoon: true,
      icon: Zap,
      features: [
        t.features.everything,
        "Unlimited users",
        t.features.sso,
        t.features.custom,
        t.features.dedicated,
        t.features.analytics,
        t.features.api,
        "White-label solution"
      ],
      limitations: []
    }
  ]

  const getLocalizedFeatures = (plan: any) => {
    const featureTranslations = {
      da: {
        "7-day free trial": "7 dages gratis prøveperiode",
        "Access to all courses": "Adgang til alle kurser",
        "Basic support": "Grundlæggende support",
        "Certificate of completion": "Færdiggørelsescertifikat",
        "Mobile app access": "Mobil app adgang",
        "Everything in Free Trial": "Alt i gratis prøveperiode",
        "Up to 50 users": "Op til 50 brugere",
        "Team analytics": "Team analyse",
        "Advanced progress tracking": "Avanceret fremgangssporing",
        "Priority support": "Prioriteret support",
        "Custom branding": "Brugerdefineret branding",
        "Integration with LMS": "Integration med LMS",
        "Bulk user management": "Masse bruger administration",
        "Unlimited users": "Ubegrænset antal brugere",
        "White-label solution": "White-label løsning"
      },
      en: plan.features
    }

    return language === 'da' && featureTranslations.da ? 
      plan.features.map((feature: string) => featureTranslations.da[feature as keyof typeof featureTranslations.da] || feature) :
      plan.features
  }

  const getLocalizedLimitations = (plan: any) => {
    const limitationTranslations = {
      da: {
        "Limited to 1 user": "Begrænset til 1 bruger",
        "No team features": "Ingen team funktioner",
        "Basic analytics only": "Kun grundlæggende analyse"
      },
      en: plan.limitations
    }

    return language === 'da' && limitationTranslations.da ?
      plan.limitations.map((limitation: string) => limitationTranslations.da[limitation as keyof typeof limitationTranslations.da] || limitation) :
      plan.limitations
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.monthly}
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                  billingCycle === 'annual'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.annual}
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                  {t.annualSavings}
                </Badge>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            const price = plan.price[billingCycle]
            
            return (
              <Card
                key={plan.name}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? 'ring-2 ring-primary shadow-xl scale-105'
                    : 'hover:scale-102'
                } ${plan.comingSoon ? 'opacity-75' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-1 left-0 right-0">
                    <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                      {t.mostPopular}
                    </div>
                  </div>
                )}
                
                {plan.comingSoon && (
                  <div className="absolute -top-1 left-0 right-0">
                    <div className="bg-orange-500 text-white text-center py-2 text-sm font-medium">
                      {t.comingSoon}
                    </div>
                  </div>
                )}

                <CardHeader className={plan.popular ? 'pt-8' : 'pt-6'}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${
                      plan.name === 'Free Trial' ? 'bg-blue-100 text-blue-600' :
                      plan.name === 'Premium' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </div>
                  </div>

                  <div className="mb-6">
                    {price !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">
                          {price === 0 ? language === 'da' ? 'Gratis' : 'Free' : `${price} DKK`}
                        </span>
                        {price > 0 && (
                          <span className="text-muted-foreground">
                            /{billingCycle === 'monthly' ? (language === 'da' ? 'måned' : 'month') : (language === 'da' ? 'år' : 'year')}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="text-2xl font-bold">
                        {language === 'da' ? 'Tilpasset pris' : 'Custom pricing'}
                      </div>
                    )}
                    
                    {billingCycle === 'annual' && price && price > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {Math.round(price / 12)} DKK/{language === 'da' ? 'måned' : 'month'}
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3 text-green-600">
                        {language === 'da' ? 'Inkluderet:' : 'Included:'}
                      </h4>
                      <ul className="space-y-2">
                        {getLocalizedFeatures(plan).map((feature: string, featureIndex: number) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {getLocalizedLimitations(plan).length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3 text-orange-600">
                          {language === 'da' ? 'Begrænsninger:' : 'Limitations:'}
                        </h4>
                        <ul className="space-y-2">
                          {getLocalizedLimitations(plan).map((limitation: string, limitIndex: number) => (
                            <li key={limitIndex} className="flex items-center gap-2">
                              <X className="h-4 w-4 text-orange-500 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-6">
                      {plan.comingSoon ? (
                        <Button className="w-full" disabled>
                          {t.comingSoon}
                        </Button>
                      ) : plan.name === 'Free Trial' ? (
                        <Button className="w-full" variant="outline">
                          {t.startTrial}
                        </Button>
                      ) : plan.name === 'Enterprise' ? (
                        <Button className="w-full" variant="outline">
                          {t.contactSales}
                        </Button>
                      ) : (
                        <Button className="w-full">
                          {t.getStarted}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ or additional info */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            {language === 'da' 
              ? 'Har du spørgsmål? ' 
              : 'Questions? '}
            <a href="mailto:contact@harka.dk" className="text-primary hover:underline">
              {language === 'da' ? 'Kontakt os' : 'Contact us'}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}