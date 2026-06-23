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
    <div className="min-h-screen bg-[#F5F5F3]">

      {/* Hero — editorial, hekla-site voice (black ground, violet/moss emphasis) */}
      <section className="bg-[#0B0B0B] text-[#F5F5F3]">
        <div className="container max-w-5xl mx-auto px-6 py-28 md:py-36">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* the cut */}
            <motion.div variants={fadeInUp} className="cut mb-10">
              <span className="v"></span><span className="m"></span>
            </motion.div>

            {/* Main headline — Danish, editorial emphasis */}
            <motion.h1
              variants={fadeInUp}
              className="display max-w-4xl text-[#F5F5F3] text-[clamp(2.5rem,6.5vw,5.25rem)]"
            >
              Fra idé til <span className="em-violet">AI i praksis</span> — på <span className="em-moss">48 timer</span>.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-[#b8afa2]"
            >
              Vi omdanner AI-potentiale til praktiske løsninger, der leverer målbare resultater
              — uden lange projektforløb eller PowerPoints.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <Link href="/workshop/booking">
                <button className="btn btn--primary">
                  Book 2-dages workshop <span className="arrow">→</span>
                </button>
              </Link>
              <Link href="/ai-kompas">
                <button className="btn btn--ghost-paper">
                  Tag AI-parathedsvurdering <span className="arrow">→</span>
                </button>
              </Link>
            </motion.div>

            {/* Key value props */}
            <motion.div
              variants={fadeInUp}
              className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#b8afa2]"
            >
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#6FC15E]" /> Praktisk hands-on workshop
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#6FC15E]" /> ROI inden for første uge
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#6FC15E]" /> GDPR-compliant
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Danish Market Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#0B0B0B] mb-4">
              Udfordringen & muligheden
            </h2>
            <p className="text-lg text-[#6b6b6b] max-w-3xl mx-auto">
              En ny rapport fra Digitaliseringsstyrelsen viser, at selvom kun {adoptionRate}% af danske virksomheder 
              anvender AI i dag, oplever {efficiencyGain}% markante effektivitetsgevinster.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[#5708D8]">{adoptionRate}%</div>
              <div className="text-[#6b6b6b]">Bruger AI i dag</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[#6FC15E]">{efficiencyGain}%</div>
              <div className="text-[#6b6b6b]">Oplever effektivitetsgevinster</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[#5708D8]">48</div>
              <div className="text-[#6b6b6b]">Timer til værdi</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[#5708D8]">{companiesTrained}+</div>
              <div className="text-[#6b6b6b]">Virksomheder trænet</div>
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
                    <CheckCircle className="w-5 h-5 text-[#6FC15E]" />
                    <span>Service-rapport automation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#6FC15E]" />
                    <span>Turbo-risikoanalyse på 10 minutter</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#6FC15E]" />
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
            <h2 className="text-3xl font-bold text-[#0B0B0B] mb-4">
              Vælg jeres AI-rejse
            </h2>
            <p className="text-lg text-[#6b6b6b]">
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
              <div className="absolute -top-4 left-8 px-4 py-1 bg-[#5708D8] text-white text-sm rounded-full">
                Mest populære
              </div>
              <Brain className="w-12 h-12 text-[#5708D8] mb-4" />
              <h3 className="text-2xl font-bold mb-2">2-dages AI Workshop</h3>
              <p className="text-[#6b6b6b] mb-6">
                Komplet AI-transformation for jeres team. Fra grundlæggende til avanceret implementering.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
                  <span className="text-sm">Dag 1: AI-fundamentals & prototyper</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
                  <span className="text-sm">Dag 2: GDPR & virksomhedsspecifikke løsninger</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
                  <span className="text-sm">90 dages support inkluderet</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
                  <span className="text-sm">12 måneders adgang til HEKLA-platformen for alle deltagere</span>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">DKK 30.000</span>
                <span className="text-[#6b6b6b]"> / virksomhed</span>
              </div>
              <Button className="w-full bg-[#5708D8] hover:bg-[#6d28d9] text-white">
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
              <Rocket className="w-12 h-12 text-[#5708D8] mb-4" />
              <h3 className="text-2xl font-bold mb-2">VibeCoding Workshop</h3>
              <p className="text-[#6b6b6b] mb-6">
                Fra idé til fungerende MVP på én dag med Loveable.dev og no-code AI.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
                  <span className="text-sm">65% fokus på Loveable.dev</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
                  <span className="text-sm">Byg fungerende prototype</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
                  <span className="text-sm">Perfekt til startups</span>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">DKK 28.000</span>
                <span className="text-[#6b6b6b]"> / dag</span>
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
              <Shield className="w-12 h-12 text-[#6FC15E] mb-4" />
              <h3 className="text-2xl font-bold mb-2">Erhvervsrådgiver Training</h3>
              <p className="text-[#6b6b6b] mb-6">
                Specialdesignet forløb for erhvervsrådgivere og konsulenter.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
                  <span className="text-sm">3 x 2 sessioner</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
                  <span className="text-sm">Streaming til 50+ deltagere</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
                  <span className="text-sm">Train-the-trainer model</span>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">DKK 74.000</span>
                <span className="text-[#6b6b6b]"> / forløb</span>
              </div>
              <Button className="w-full" variant="outline">
                Kontakt os
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#0B0B0B] mb-4">
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
                <div className="w-12 h-12 bg-[#5708D8]/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-[#5708D8]">1</span>
                </div>
                <h3 className="text-xl font-bold">Dag 1: Muligheder & Prototyper</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
                  <span>Identifikation af processer med AI-potentiale</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
                  <span>Hands-on træning i relevante værktøjer</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
                  <span>Udvikling af prototypeløsninger</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
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
                  <span className="text-xl font-bold text-[#6FC15E]">2</span>
                </div>
                <h3 className="text-xl font-bold">Dag 2: Implementering & Overdragelse</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
                  <span>Færdiggørelse og integration af løsninger</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
                  <span>Tilpasning til jeres workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
                  <span>Kompetenceoverførsel og dokumentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6FC15E] mt-0.5" />
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
            <p className="text-sm font-medium text-[#8A8A8A] uppercase tracking-wider">
              Betroet af førende danske virksomheder
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            {["VMS Group", "Seven Oceans", "Pouchy", "Startup Bootcamp", "Beyond Beta"].map((company) => (
              <div key={company} className="flex items-center justify-center">
                <span className="text-xl font-bold text-[#8A8A8A]">{company}</span>
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
                    className="h-14 px-8 text-lg bg-[#5708D8] text-white hover:bg-[#6d28d9] shadow-xl"
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

      {/* HEKLA wordmark footer band — the editorial signature (hekla-site / site-navy) */}
      <footer style={{ background: "var(--black)", padding: "64px 32px 52px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 26 }}>
          <div className="cut"><span className="v" /><span className="m" /></div>
          <div className="mark" style={{ color: "var(--paper)", fontSize: "clamp(60px,15vw,184px)", lineHeight: 0.88 }}>
            HEKLA
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 22, color: "var(--ash)", fontSize: 13 }}>
            <span>Danmarks praktiske AI-træningsplatform</span>
            <span>© 2026 HEKLA · Culture × Commerce × Technology</span>
          </div>
        </div>
      </footer>
    </div>
  )
}