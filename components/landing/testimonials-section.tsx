import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Erik Lindqvist",
    role: "CTO",
    company: "TechNordic AB",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The three-phase methodology transformed how we approach AI implementation. Our team went from AI-curious to AI-confident in just 8 weeks.",
    rating: 5,
  },
  {
    name: "Astrid Hansen",
    role: "Innovation Director",
    company: "Nordic Solutions",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The ethics framework was exactly what we needed. We now have clear guidelines for responsible AI deployment across all our projects.",
    rating: 5,
  },
  {
    name: "Magnus Olsen",
    role: "Head of Digital",
    company: "Fjord Industries",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The implementation toolkit saved us months of planning. The ROI calculator alone justified our investment in the platform.",
    rating: 5,
  },
  {
    name: "Ingrid Svensson",
    role: "Learning & Development",
    company: "Baltic Corp",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Our employees love the interactive learning format. The completion rates are the highest we've ever seen for any training program.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">Trusted by Nordic Leaders</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how organizations across the Nordic region are successfully implementing AI with our comprehensive
            training platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="glass-effect border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                <blockquote className="text-lg mb-6">"{testimonial.content}"</blockquote>

                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
