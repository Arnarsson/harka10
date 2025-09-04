"use client"

import { useState } from "react"
import { EnterpriseWorkshopMaterials } from "@/components/workshop/enterprise-workshop-materials"
import { VibecodingWorkshopMaterials } from "@/components/workshop/vibecoding-workshop-materials"
import { AdvisorTrainingMaterials } from "@/components/workshop/advisor-training-materials"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Code2, GraduationCap, ArrowLeft, Calendar, Phone } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function WorkshopMaterialsPage() {
  const [activeTab, setActiveTab] = useState("enterprise")

  const workshops = [
    {
      id: "enterprise",
      title: "2-Dages Enterprise Workshop",
      subtitle: "Fra idé til implementering",
      price: "DKK 30.000",
      participants: "Max 12 deltagere",
      icon: Building2,
      color: "emerald",
      description: "Intensiv hands-on workshop for virksomheder der vil transformere med AI"
    },
    {
      id: "vibecoding",
      title: "VibeCoding Workshop",
      subtitle: "AI Engineering for Developers",
      price: "DKK 28.000",
      participants: "Max 8 developers",
      icon: Code2,
      color: "purple",
      description: "Teknisk workshop for udviklere - byg production-ready AI features"
    },
    {
      id: "advisor",
      title: "Erhvervsrådgiver Certificering",
      subtitle: "Bliv AI Business Advisor",
      price: "DKK 74.000",
      participants: "6 sessions over 3 uger",
      icon: GraduationCap,
      color: "amber",
      description: "Komplet træningsprogram for konsulenter og rådgivere"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <Link href="/workshop/booking">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Tilbage til Booking
            </Button>
          </Link>
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Workshop Materialer & Curriculum</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Detaljeret gennemgang af vores tre workshop-formater og 
              alt hvad du får med hjem
            </p>
          </div>
        </div>

        {/* Workshop Selector Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {workshops.map((workshop, index) => {
            const isActive = activeTab === workshop.id
            const Icon = workshop.icon
            
            return (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    isActive ? 'ring-2 ring-offset-2' : ''
                  } ${
                    workshop.color === 'emerald' ? 'ring-emerald-500' :
                    workshop.color === 'purple' ? 'ring-purple-500' :
                    'ring-amber-500'
                  }`}
                  onClick={() => setActiveTab(workshop.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Icon className={`w-8 h-8 ${
                        workshop.color === 'emerald' ? 'text-emerald-600' :
                        workshop.color === 'purple' ? 'text-purple-600' :
                        'text-amber-600'
                      }`} />
                      {isActive && (
                        <Badge variant="secondary">Aktiv</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{workshop.title}</CardTitle>
                    <CardDescription>{workshop.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {workshop.description}
                    </p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pris:</span>
                        <span className="font-semibold">{workshop.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Format:</span>
                        <span className="font-semibold">{workshop.participants}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Workshop Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="hidden">
            <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            <TabsTrigger value="vibecoding">VibeCoding</TabsTrigger>
            <TabsTrigger value="advisor">Advisor</TabsTrigger>
          </TabsList>

          <TabsContent value="enterprise" className="space-y-6">
            <EnterpriseWorkshopMaterials />
          </TabsContent>

          <TabsContent value="vibecoding" className="space-y-6">
            <VibecodingWorkshopMaterials />
          </TabsContent>

          <TabsContent value="advisor" className="space-y-6">
            <AdvisorTrainingMaterials />
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Klar til at Starte?</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Book en gratis konsultation for at diskutere hvilken workshop 
                der passer bedst til jeres virksomheds behov
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/workshop/booking">
                  <Button size="lg" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    Book Workshop
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Ring +45 31 41 59 26
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}