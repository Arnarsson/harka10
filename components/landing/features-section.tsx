import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, BarChart3, Shield, Zap, Globe } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Multi-Tenant Architecture",
    description: "Enterprise-grade platform supporting organizations and individuals with advanced role management.",
    metric: "500+ Teams",
  },
  {
    icon: Target,
    title: "Structured Learning Paths",
    description: "Customizable curricula aligned with our proven three-phase methodology for different roles.",
    metric: "95% Success",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Real-time progress tracking and comprehensive reporting on AI implementation outcomes.",
    metric: "50+ Metrics",
  },
  {
    icon: Shield,
    title: "Ethics Framework",
    description: "Built-in ethical assessment tools and governance frameworks for responsible AI deployment.",
    metric: "100% Compliant",
  },
  {
    icon: Zap,
    title: "Interactive Playground",
    description: "Hands-on experimentation environment with industry-specific templates and guided exercises.",
    metric: "1000+ Templates",
  },
  {
    icon: Globe,
    title: "Nordic Expertise",
    description: "Tailored content designed specifically for Nordic business culture and regulatory requirements.",
    metric: "5 Countries",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">Built for AI Excellence</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to successfully implement AI in your organization, backed by proven methodology and
            cutting-edge technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="stella-card border-primary/10 hover:border-primary/20 transition-all duration-300 group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {feature.metric}
                  </div>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
