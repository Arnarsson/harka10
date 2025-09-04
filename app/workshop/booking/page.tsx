"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Building2, Users, Target, Clock, CheckCircle, Brain, Rocket, Shield } from "lucide-react"
import { format } from "date-fns"
import { da } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type WorkshopType = "2-day" | "vibecoding" | "advisor"

interface BookingForm {
  workshopType: WorkshopType
  companyName: string
  cvr: string
  contactPerson: string
  email: string
  phone: string
  participants: string
  industry: string
  preferredDate: Date | undefined
  alternativeDate: Date | undefined
  currentChallenges: string
  expectations: string
}

export default function WorkshopBookingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<BookingForm>({
    workshopType: "2-day",
    companyName: "",
    cvr: "",
    contactPerson: "",
    email: "",
    phone: "",
    participants: "8-12",
    industry: "",
    preferredDate: undefined,
    alternativeDate: undefined,
    currentChallenges: "",
    expectations: ""
  })

  const workshopInfo = {
    "2-day": {
      title: "2-dages AI Workshop",
      price: "DKK 30.000",
      duration: "2 dage",
      icon: Brain,
      description: "Komplet AI-transformation for jeres team",
      highlights: [
        "AI-fundamentals & prompt engineering",
        "GDPR compliance & sikkerhed",
        "Virksomhedsspecifikke løsninger",
        "90 dages support"
      ]
    },
    "vibecoding": {
      title: "VibeCoding Workshop",
      price: "DKK 28.000",
      duration: "1 dag",
      icon: Rocket,
      description: "Fra idé til MVP med no-code AI",
      highlights: [
        "Loveable.dev fokus (65%)",
        "Byg fungerende prototype",
        "No-code/low-code løsninger",
        "Perfekt til startups"
      ]
    },
    "advisor": {
      title: "Erhvervsrådgiver Training",
      price: "DKK 74.000",
      duration: "3 x 2 sessioner",
      icon: Shield,
      description: "Train-the-trainer forløb",
      highlights: [
        "Streaming til 50+ deltagere",
        "Certificering inkluderet",
        "Omfattende kursusmateriale",
        "Løbende opdateringer"
      ]
    }
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    // In production, this would send to an API
    console.log("Booking submitted:", formData)
    setStep(4) // Show confirmation
  }

  const currentWorkshop = workshopInfo[formData.workshopType]
  const WorkshopIcon = currentWorkshop.icon

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  step >= i ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                )}>
                  {step > i ? <CheckCircle className="w-6 h-6" /> : i}
                </div>
                {i < 3 && (
                  <div className={cn(
                    "w-24 h-1 ml-2",
                    step > i ? "bg-blue-600" : "bg-gray-200"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {step === 4 ? (
          // Confirmation screen
          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="pt-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Tak for din booking!</h2>
              <p className="text-lg text-gray-600 mb-8">
                Vi har modtaget din forespørgsel og vender tilbage inden for 24 timer 
                med bekræftelse og praktiske detaljer.
              </p>
              <div className="bg-white rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
                <h3 className="font-semibold mb-4">Booking detaljer:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Workshop:</span>
                    <span className="font-medium">{currentWorkshop.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Virksomhed:</span>
                    <span className="font-medium">{formData.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ønsket dato:</span>
                    <span className="font-medium">
                      {formData.preferredDate ? format(formData.preferredDate, "d. MMMM yyyy", { locale: da }) : "Ikke valgt"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deltagere:</span>
                    <span className="font-medium">{formData.participants}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button size="lg">
                  Tilbage til forsiden
                </Button>
                <Button size="lg" variant="outline">
                  Book endnu en workshop
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Book AI Workshop</CardTitle>
              <CardDescription>
                {step === 1 && "Vælg workshoptype og antal deltagere"}
                {step === 2 && "Virksomhedsoplysninger"}
                {step === 3 && "Behov og forventninger"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label>Vælg workshop type</Label>
                    <RadioGroup 
                      value={formData.workshopType} 
                      onValueChange={(value: WorkshopType) => setFormData({...formData, workshopType: value})}
                      className="mt-4 space-y-4"
                    >
                      {Object.entries(workshopInfo).map(([key, info]) => {
                        const Icon = info.icon
                        return (
                          <label 
                            key={key} 
                            className={cn(
                              "flex items-start space-x-4 p-6 rounded-lg border-2 cursor-pointer transition-all",
                              formData.workshopType === key 
                                ? "border-blue-600 bg-blue-50/50" 
                                : "border-gray-200 hover:border-gray-300"
                            )}
                          >
                            <RadioGroupItem value={key} className="mt-1" />
                            <Icon className="w-8 h-8 text-blue-600 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-lg">{info.title}</h3>
                                  <p className="text-sm text-gray-600">{info.description}</p>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-lg">{info.price}</div>
                                  <div className="text-sm text-gray-600">{info.duration}</div>
                                </div>
                              </div>
                              <ul className="space-y-1 mt-3">
                                {info.highlights.map((highlight, i) => (
                                  <li key={i} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </label>
                        )
                      })}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="participants">Antal deltagere</Label>
                    <Select 
                      value={formData.participants} 
                      onValueChange={(value) => setFormData({...formData, participants: value})}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-7">1-7 personer</SelectItem>
                        <SelectItem value="8-12">8-12 personer (anbefalet)</SelectItem>
                        <SelectItem value="13-20">13-20 personer</SelectItem>
                        <SelectItem value="21-25">21-25 personer</SelectItem>
                        <SelectItem value="25+">25+ personer (kontakt os)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Virksomhedsnavn *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        placeholder="ACME A/S"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvr">CVR-nummer *</Label>
                      <Input
                        id="cvr"
                        value={formData.cvr}
                        onChange={(e) => setFormData({...formData, cvr: e.target.value})}
                        placeholder="12345678"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="industry">Branche *</Label>
                    <Select 
                      value={formData.industry} 
                      onValueChange={(value) => setFormData({...formData, industry: value})}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Vælg branche" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maritime">Maritim & Shipping</SelectItem>
                        <SelectItem value="energy">Energi & Forsyning</SelectItem>
                        <SelectItem value="manufacturing">Produktion & Industri</SelectItem>
                        <SelectItem value="finance">Finans & Forsikring</SelectItem>
                        <SelectItem value="retail">Detailhandel</SelectItem>
                        <SelectItem value="services">Professionelle Services</SelectItem>
                        <SelectItem value="tech">IT & Teknologi</SelectItem>
                        <SelectItem value="healthcare">Sundhed & Pharma</SelectItem>
                        <SelectItem value="other">Andet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactPerson">Kontaktperson *</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                        placeholder="Anders Andersen"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+45 12 34 56 78"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="anders@acme.dk"
                      className="mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Ønsket dato</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal mt-2",
                              !formData.preferredDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.preferredDate ? (
                              format(formData.preferredDate, "PPP", { locale: da })
                            ) : (
                              "Vælg dato"
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.preferredDate}
                            onSelect={(date) => setFormData({...formData, preferredDate: date})}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label>Alternativ dato</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal mt-2",
                              !formData.alternativeDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.alternativeDate ? (
                              format(formData.alternativeDate, "PPP", { locale: da })
                            ) : (
                              "Vælg dato"
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.alternativeDate}
                            onSelect={(date) => setFormData({...formData, alternativeDate: date})}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="challenges">
                      Hvad er jeres største udfordringer lige nu? *
                    </Label>
                    <Textarea
                      id="challenges"
                      value={formData.currentChallenges}
                      onChange={(e) => setFormData({...formData, currentChallenges: e.target.value})}
                      placeholder="Beskriv de processer eller opgaver der tager mest tid, eller hvor I ser størst potentiale for forbedring..."
                      className="mt-2 min-h-[120px]"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Tænk på gentagne, manuelle opgaver der kunne automatiseres (rugbrødsarbejde)
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="expectations">
                      Hvad håber I at få ud af workshoppen?
                    </Label>
                    <Textarea
                      id="expectations"
                      value={formData.expectations}
                      onChange={(e) => setFormData({...formData, expectations: e.target.value})}
                      placeholder="Hvilke konkrete resultater eller værktøjer ønsker I at gå hjem med?"
                      className="mt-2 min-h-[100px]"
                    />
                  </div>

                  <Card className="bg-blue-50/50 border-blue-200">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">Hvad sker der nu?</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>Vi gennemgår jeres behov og udarbejder et tilpasset workshop-program</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>I modtager bekræftelse og praktisk information inden for 24 timer</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>Vi sender forberedelsesmateriale 1 uge før workshoppen</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>Efter workshoppen får I adgang til alle materialer og 90 dages support</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                >
                  Tilbage
                </Button>
                {step < 3 ? (
                  <Button onClick={handleNext}>
                    Fortsæt
                  </Button>
                ) : (
                  <Button onClick={handleSubmit}>
                    Send booking
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}