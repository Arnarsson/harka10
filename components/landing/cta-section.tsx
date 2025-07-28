import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Award } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 nordic-gradient opacity-90" />
          <div className="relative px-8 py-16 lg:px-16 lg:py-24 text-center">
            <div className="space-y-8 max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-bold text-white">
                Ready to Transform Your Organization with AI?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join hundreds of Nordic companies that have successfully implemented AI using our proven three-phase
                methodology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="group">
                  <Link href="/signup">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Link href="/demo">Schedule a Demo</Link>
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-8 pt-8">
                <div className="flex items-center space-x-2 text-white/80">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">500+ Companies</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <Award className="h-5 w-5" />
                  <span className="text-sm">95% Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
