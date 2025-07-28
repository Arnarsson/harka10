import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Basic",
    price: "€49",
    period: "per user/month",
    description: "Perfect for individuals and small teams getting started with AI",
    features: [
      "Access to all learning modules",
      "Basic prompt playground",
      "Progress tracking",
      "Community support",
      "Mobile app access",
      "Certificate of completion",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Standard",
    price: "€99",
    period: "per user/month",
    description: "Ideal for growing teams and departments implementing AI",
    features: [
      "Everything in Basic",
      "Advanced analytics dashboard",
      "Team collaboration tools",
      "Custom learning paths",
      "Implementation templates",
      "Priority email support",
      "API access",
      "Export capabilities",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Premium",
    price: "€199",
    period: "per user/month",
    description: "Complete solution for organizations with comprehensive AI initiatives",
    features: [
      "Everything in Standard",
      "Dedicated success manager",
      "Custom integrations",
      "White-label options",
      "Advanced security features",
      "SSO integration",
      "Custom workshops",
      "Phone support",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">Choose Your AI Journey</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Flexible pricing plans designed to scale with your organization's AI implementation needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative glass-effect ${
                plan.popular ? "border-primary/60 scale-105" : "border-primary/20"
              } hover:border-primary/40 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link href={plan.name === "Premium" ? "/contact" : "/signup"}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">All plans include a 14-day free trial. No credit card required.</p>
          <Button variant="ghost" asChild>
            <Link href="/pricing">View detailed comparison →</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
