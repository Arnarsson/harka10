import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Shield, Rocket, ArrowRight, Clock, Users, CheckCircle } from "lucide-react"

const phases = [
  {
    icon: BookOpen,
    title: "Phase 1: Fundamentals",
    description: "Build comprehensive AI literacy across your organization",
    duration: "2-3 weeks",
    participants: "All team members",
    features: [
      "AI concepts and terminology",
      "Machine learning fundamentals",
      "Capability assessment",
      "Industry applications",
    ],
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Shield,
    title: "Phase 2: Ethics & Governance",
    description: "Establish responsible AI practices and frameworks",
    duration: "1-2 weeks",
    participants: "Leadership & key stakeholders",
    features: [
      "Ethics and bias mitigation",
      "Privacy and security protocols",
      "Regulatory compliance",
      "Risk assessment frameworks",
    ],
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: Rocket,
    title: "Phase 3: Implementation",
    description: "Execute real-world AI projects with confidence",
    duration: "3-4 weeks",
    participants: "Project teams",
    features: [
      "Project planning and execution",
      "ROI measurement and tracking",
      "Change management strategies",
      "Continuous improvement",
    ],
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
]

export function MethodologySection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">Proven Three-Phase Methodology</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A structured approach to AI implementation that ensures sustainable success and measurable outcomes for
            Nordic organizations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {phases.map((phase, index) => (
            <div key={phase.title} className="relative group">
              <Card
                className={`stella-card border-primary/10 hover:border-primary/20 transition-all duration-300 h-full bg-gradient-to-br ${phase.color}`}
              >
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-background/50 ${phase.iconColor}`}>
                      <phase.icon className="h-6 w-6" />
                    </div>
                    <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {index + 1}/3
                    </div>
                  </div>
                  <CardTitle className="text-xl">{phase.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{phase.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{phase.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{phase.participants}</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {phase.features.map((feature) => (
                      <li key={feature} className="flex items-start space-x-3 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Arrow connector */}
              {index < phases.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="stella-card p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Complete Journey Timeline</h3>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <span>6-9 weeks total</span>
              <div className="w-1 h-1 rounded-full bg-primary" />
              <span>Flexible pacing</span>
              <div className="w-1 h-1 rounded-full bg-primary" />
              <span>Continuous support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
