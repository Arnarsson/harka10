"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Users, Clock, TrendingUp, Brain, Zap, Target, Calendar, BarChart, Building2, Rocket, Shield, Award } from "lucide-react"
import { useEffect, useState } from "react"
import { SignInButton } from "@clerk/nextjs"

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let startTime: number | null = null
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration])
  
  return count
}

export function DanishB2BLanding() {
  const adoptionRate = useCounter(30, 2000)
  const efficiencyGain = useCounter(70, 2000)
  const hoursToMinutes = useCounter(85, 2500)
  const companiesTrained = useCounter(60, 2000)
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
  
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-hekla-orange/5 to-white">
      
      {/* Hero Section - Danish B2B Focus */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center space-y-6"
          >
            {/* Danish market insight */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-hekla-orange/10 rounded-full text-sm font-medium text-hekla-orange"
            >
              <TrendingUp className="w-4 h-4" />
              <span>70% af danske virksomheder går glip af AI-muligheder</span>
            </motion.div>

            {/* Main headline - Danish */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-gray-900">Fra idé til implementering</span>
              <br />
              <span className="text-hekla-orange">
                på kun 48 timer
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
            >
              Vi omdanner AI-potentiale til praktiske løsninger, der leverer målbare resultater
              – uden lange projektforløb eller PowerPoints.
            </motion.p>

            {/* Key value props */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base pt-4"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Praktisk hands-on workshop</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">ROI inden for første uge</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">GDPR-compliant</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
            >
              <Link href="/workshop/booking">
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-lg bg-hekla-orange text-white hover:bg-hekla-orange-lt shadow-xl hover:shadow-2xl transition-all duration-200"
                >
                  Book 2-dages workshop
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/ai-kompas">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-14 px-8 text-lg border-2"
                >
                  <Target className="mr-2 h-5 w-5" />
                  Tag AI-parathedsvurdering
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Danish Market Stats */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Udfordringen & muligheden
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              En ny rapport fra Digitaliseringsstyrelsen viser, at selvom kun {adoptionRate}% af danske virksomheder 
              anvender AI i dag, oplever {efficiencyGain}% markante effektivitetsgevinster.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-hekla-orange">{adoptionRate}%</div>
              <div className="text-gray-600">Bruger AI i dag</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-600">{efficiencyGain}%</div>
              <div className="text-gray-600">Oplever effektivitetsgevinster</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-hekla-orange">48</div>
              <div className="text-gray-600">Timer til værdi</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-600">{companiesTrained}+</div>
              <div className="text-gray-600">Virksomheder trænet</div>
            </div>
          </div>
        </div>
      </section>

      {/* VMS Case Study Highlight */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-hekla-bg to-hekla-card rounded-3xl p-8 md:p-12 text-white"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                  <Award className="w-4 h-4" />
                  <span>Kundecase: VMS Group</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  Fra 60 minutter til 5 minutter
                </h3>
                <p className="text-lg mb-6 text-hekla-body">
                  VMS Group automatiserede deres motordata-analyse og frigav hundredvis af timer. 
                  Servicerapporter der tog timer tager nu minutter. Risikoanalyser udføres {hoursToMinutes}% hurtigere.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Service-rapport automation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Turbo-risikoanalyse på 10 minutter</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Frigjort kapital fra lageroptimering</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                  <div className="text-center space-y-4">
                    <div className="text-5xl font-bold">{hoursToMinutes}%</div>
                    <div className="text-xl">Hurtigere analyser</div>
                    <div className="text-sm text-hekla-body">
                      "HEKLA leverede ikke konsulentrapporter, 
                      men ægte værktøjer vi bruger hver dag."
                    </div>
                    <div className="text-sm font-medium">- Thomas Fisker-Jepsen, IT Manager</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workshop Offerings */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vælg jeres AI-rejse
            </h2>
            <p className="text-lg text-gray-600">
              Skræddersyede workshops designet til danske virksomheders behov
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 2-Day Workshop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 relative"
            >
              <div className="absolute -top-4 left-8 px-4 py-1 bg-hekla-orange text-white text-sm rounded-full">
                Mest populære
              </div>
              <Brain className="w-12 h-12 text-hekla-orange mb-4" />
              <h3 className="text-2xl font-bold mb-2">2-dages AI Workshop</h3>
              <p className="text-gray-600 mb-6">
                Komplet AI-transformation for jeres team. Fra grundlæggende til avanceret implementering.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm">Dag 1: AI-fundamentals & prototyper</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm">Dag 2: GDPR & virksomhedsspecifikke løsninger</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm">90 dages support inkluderet</span>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">DKK 30.000</span>
                <span className="text-gray-600"> / virksomhed</span>
              </div>
              <Button className="w-full bg-hekla-orange hover:bg-hekla-orange-lt text-white">
                Book workshop
              </Button>
            </motion.div>

            {/* VibeCoding Workshop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <Rocket className="w-12 h-12 text-hekla-orange mb-4" />
              <h3 className="text-2xl font-bold mb-2">VibeCoding Workshop</h3>
              <p className="text-gray-600 mb-6">
                Fra idé til fungerende MVP på én dag med Loveable.dev og no-code AI.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm">65% fokus på Loveable.dev</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm">Byg fungerende prototype</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm">Perfekt til startups</span>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">DKK 28.000</span>
                <span className="text-gray-600"> / dag</span>
              </div>
              <Button className="w-full" variant="outline">
                Læs mere
              </Button>
            </motion.div>

            {/* Business Advisor Training */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <Shield className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Erhvervsrådgiver Training</h3>
              <p className="text-gray-600 mb-6">
                Specialdesignet forløb for erhvervsrådgivere og konsulenter.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm">3 x 2 sessioner</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm">Streaming til 50+ deltagere</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm">Train-the-trainer model</span>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">DKK 74.000</span>
                <span className="text-gray-600"> / forløb</span>
              </div>
              <Button className="w-full" variant="outline">
                Kontakt os
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Resultatet: Fra strategi til handling på 48 timer
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-hekla-orange/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-hekla-orange">1</span>
                </div>
                <h3 className="text-xl font-bold">Dag 1: Muligheder & Prototyper</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Identifikation af processer med AI-potentiale</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Hands-on træning i relevante værktøjer</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Udvikling af prototypeløsninger</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Opbygning af AI-kompetencer i dit team</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-bold">Dag 2: Implementering & Overdragelse</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Færdiggørelse og integration af løsninger</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Tilpasning til jeres workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Kompetenceoverførsel og dokumentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Handlingsplan for de næste 90 dage</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Betroet af førende danske virksomheder
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            {["VMS Group", "Seven Oceans", "Pouchy", "Startup Bootcamp", "Beyond Beta"].map((company) => (
              <div key={company} className="flex items-center justify-center">
                <span className="text-xl font-bold text-gray-400">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-hekla-bg to-hekla-card rounded-3xl p-12 md:p-16 text-center"
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Klar til at transformere jeres virksomhed med AI?
              </h2>
              <p className="text-xl text-hekla-body max-w-2xl mx-auto">
                Bliv en del af de 30% danske virksomheder der allerede høster AI's fordele. 
                Start med en uforpligtende samtale.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/workshop/booking">
                  <Button 
                    size="lg" 
                    className="h-14 px-8 text-lg bg-hekla-orange text-white hover:bg-hekla-orange-lt shadow-xl"
                  >
                    Book workshop
                    <Calendar className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="h-14 px-8 text-lg border-2 border-white text-white hover:bg-white/10"
                  >
                    Kontakt os
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-hekla-dim">
                Ingen forpligtelser • Gratis konsultation • ROI inden for første uge
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}