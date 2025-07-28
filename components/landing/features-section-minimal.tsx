import { BookOpen, Users, BarChart3, Zap } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Structured Learning",
    description: "Progressive modules designed for effective AI skill development.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Learn together with shared progress tracking and team insights.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track learning progress and identify knowledge gaps.",
  },
  {
    icon: Zap,
    title: "Practical Application",
    description: "Real-world projects and interactive AI playground.",
  },
]

export function FeaturesSectionMinimal() {
  return (
    <section id="features" className="py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Everything you need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete platform for AI training and skill development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-[var(--radius)] bg-secondary mb-4">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}