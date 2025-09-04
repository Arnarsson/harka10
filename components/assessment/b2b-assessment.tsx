"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  Clock,
  Zap,
  CheckCircle,
  ArrowRight,
  BarChart,
  Shield,
  Briefcase
} from "lucide-react"

interface AssessmentData {
  // Company info
  companyName: string
  industry: string
  size: string
  
  // AI maturity
  currentAIUsage: string
  aiTools: string[]
  aiExperience: string
  
  // Challenges & Goals
  mainChallenges: string[]
  timeConsumingTasks: string
  dataVolume: string
  
  // Readiness
  budget: string
  timeline: string
  decisionMakers: string
  
  // Contact
  contactName: string
  contactEmail: string
  contactPhone: string
  contactRole: string
}

export function B2BAssessment() {
  const [step, setStep] = useState(1)
  const totalSteps = 5
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    companyName: "",
    industry: "",
    size: "",
    currentAIUsage: "",
    aiTools: [],
    aiExperience: "",
    mainChallenges: [],
    timeConsumingTasks: "",
    dataVolume: "",
    budget: "",
    timeline: "",
    decisionMakers: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactRole: ""
  })

  const industries = [
    "Maritim & Shipping",
    "Energi & Forsyning",
    "Produktion & Industri",
    "Finans & Forsikring",
    "Detailhandel",
    "Professionelle Services",
    "IT & Teknologi",
    "Sundhed & Pharma",
    "Transport & Logistik",
    "Byggeri & Entreprenør",
    "Andet"
  ]

  const challenges = [
    "Manuel databehandling",
    "Tidskrævende rapportering",
    "Ineffektive processer",
    "Manglende overblik",
    "Kvalitetskontrol",
    "Kundeservice",
    "Dokumenthåndtering",
    "Ressourceplanlægning",
    "Lageroptimering",
    "Compliance & regulering"
  ]

  const aiToolOptions = [
    "ChatGPT",
    "Microsoft Copilot",
    "Google Gemini",
    "Claude",
    "Intern AI-løsning",
    "RPA/Automatisering",
    "Machine Learning modeller",
    "Ingen endnu"
  ]

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    // Submit assessment data
    console.log("Assessment submitted:", assessmentData)
    setStep(totalSteps + 1) // Show results
  }

  const progressPercentage = (step / totalSteps) * 100

  if (step === totalSteps + 1) {
    // Results screen
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-green-200 bg-green-50/30">
          <CardContent className="pt-12">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                AI-parathedsvurdering gennemført!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Baseret på jeres svar har vi identificeret flere områder med stort AI-potentiale
              </p>
            </div>

            {/* Quick insights */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <TrendingUp className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold mb-2">Estimeret effektivitetsgevinst</h3>
                  <p className="text-3xl font-bold text-blue-600">45-65%</p>
                  <p className="text-sm text-gray-600 mt-1">På identificerede processer</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <Clock className="h-8 w-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold mb-2">Time-to-value</h3>
                  <p className="text-3xl font-bold text-purple-600">48 timer</p>
                  <p className="text-sm text-gray-600 mt-1">Til første fungerende løsning</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <Zap className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold mb-2">Quick wins identificeret</h3>
                  <p className="text-3xl font-bold text-green-600">5-7</p>
                  <p className="text-sm text-gray-600 mt-1">Kan implementeres straks</p>
                </CardContent>
              </Card>
            </div>

            {/* Recommended next steps */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Anbefalede næste skridt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Book en gratis strategisession</h4>
                      <p className="text-gray-600 text-sm">
                        30 minutters gennemgang af jeres AI-muligheder med konkrete anbefalinger
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-green-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Download jeres personlige AI-rapport</h4>
                      <p className="text-gray-600 text-sm">
                        Detaljeret analyse med ROI-beregninger og implementeringsplan
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-purple-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Book 2-dages AI workshop</h4>
                      <p className="text-gray-600 text-sm">
                        Hands-on workshop hvor vi bygger jeres første AI-løsninger sammen
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Book gratis strategisession
              </Button>
              <Button size="lg" variant="outline">
                Download rapport (PDF)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI-parathedsvurdering for virksomheder</h1>
        <p className="text-gray-600">
          Få en skræddersyet analyse af jeres AI-potentiale på 5 minutter
        </p>
        <Progress value={progressPercentage} className="mt-4" />
        <p className="text-sm text-gray-500 mt-2">Trin {step} af {totalSteps}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Virksomhedsoplysninger"}
            {step === 2 && "Nuværende AI-brug"}
            {step === 3 && "Udfordringer & behov"}
            {step === 4 && "Ressourcer & tidslinje"}
            {step === 5 && "Kontaktoplysninger"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Fortæl os om jeres virksomhed"}
            {step === 2 && "Hvor står I i dag med AI?"}
            {step === 3 && "Hvad er jeres største udfordringer?"}
            {step === 4 && "Hvad er jeres rammer for AI-implementering?"}
            {step === 5 && "Hvem skal vi sende rapporten til?"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="companyName">Virksomhedsnavn *</Label>
                <Input
                  id="companyName"
                  value={assessmentData.companyName}
                  onChange={(e) => setAssessmentData({...assessmentData, companyName: e.target.value})}
                  placeholder="ACME A/S"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="industry">Branche *</Label>
                <Select 
                  value={assessmentData.industry} 
                  onValueChange={(value) => setAssessmentData({...assessmentData, industry: value})}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Vælg branche" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Antal medarbejdere *</Label>
                <RadioGroup 
                  value={assessmentData.size} 
                  onValueChange={(value) => setAssessmentData({...assessmentData, size: value})}
                  className="mt-3 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-10" id="size1" />
                    <Label htmlFor="size1">1-10 medarbejdere</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="11-50" id="size2" />
                    <Label htmlFor="size2">11-50 medarbejdere</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="51-250" id="size3" />
                    <Label htmlFor="size3">51-250 medarbejdere</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="251-1000" id="size4" />
                    <Label htmlFor="size4">251-1000 medarbejdere</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1000+" id="size5" />
                    <Label htmlFor="size5">1000+ medarbejdere</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label>Bruger I AI-værktøjer i dag? *</Label>
                <RadioGroup 
                  value={assessmentData.currentAIUsage} 
                  onValueChange={(value) => setAssessmentData({...assessmentData, currentAIUsage: value})}
                  className="mt-3 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="ai1" />
                    <Label htmlFor="ai1">Nej, vi bruger ikke AI endnu</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exploring" id="ai2" />
                    <Label htmlFor="ai2">Vi undersøger mulighederne</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pilot" id="ai3" />
                    <Label htmlFor="ai3">Vi har pilot-projekter</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id="ai4" />
                    <Label htmlFor="ai4">Vi bruger AI i enkelte afdelinger</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="widespread" id="ai5" />
                    <Label htmlFor="ai5">AI er udbredt i organisationen</Label>
                  </div>
                </RadioGroup>
              </div>

              {assessmentData.currentAIUsage !== "none" && (
                <div>
                  <Label>Hvilke AI-værktøjer bruger I? (vælg alle relevante)</Label>
                  <div className="mt-3 space-y-2">
                    {aiToolOptions.map((tool) => (
                      <div key={tool} className="flex items-center space-x-2">
                        <Checkbox 
                          id={tool}
                          checked={assessmentData.aiTools.includes(tool)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setAssessmentData({
                                ...assessmentData, 
                                aiTools: [...assessmentData.aiTools, tool]
                              })
                            } else {
                              setAssessmentData({
                                ...assessmentData,
                                aiTools: assessmentData.aiTools.filter(t => t !== tool)
                              })
                            }
                          }}
                        />
                        <Label htmlFor={tool}>{tool}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label>Hvordan vil I beskrive jeres AI-erfaring? *</Label>
                <RadioGroup 
                  value={assessmentData.aiExperience} 
                  onValueChange={(value) => setAssessmentData({...assessmentData, aiExperience: value})}
                  className="mt-3 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="exp1" />
                    <Label htmlFor="exp1">Begyndere - vi er helt nye</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="basic" id="exp2" />
                    <Label htmlFor="exp2">Grundlæggende - vi har prøvet simple værktøjer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="exp3" />
                    <Label htmlFor="exp3">Mellem - vi bruger AI regelmæssigt</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="exp4" />
                    <Label htmlFor="exp4">Avanceret - vi har erfaring med flere løsninger</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label>Hvad er jeres største udfordringer? (vælg op til 5)</Label>
                <div className="mt-3 space-y-2">
                  {challenges.map((challenge) => (
                    <div key={challenge} className="flex items-center space-x-2">
                      <Checkbox 
                        id={challenge}
                        checked={assessmentData.mainChallenges.includes(challenge)}
                        disabled={
                          !assessmentData.mainChallenges.includes(challenge) && 
                          assessmentData.mainChallenges.length >= 5
                        }
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setAssessmentData({
                              ...assessmentData, 
                              mainChallenges: [...assessmentData.mainChallenges, challenge]
                            })
                          } else {
                            setAssessmentData({
                              ...assessmentData,
                              mainChallenges: assessmentData.mainChallenges.filter(c => c !== challenge)
                            })
                          }
                        }}
                      />
                      <Label htmlFor={challenge}>{challenge}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="tasks">
                  Hvilke opgaver tager mest tid i jeres hverdag? *
                </Label>
                <Textarea
                  id="tasks"
                  value={assessmentData.timeConsumingTasks}
                  onChange={(e) => setAssessmentData({...assessmentData, timeConsumingTasks: e.target.value})}
                  placeholder="Beskriv de processer eller opgaver der er mest tidskrævende..."
                  className="mt-2 min-h-[100px]"
                />
              </div>

              <div>
                <Label>Hvor meget data arbejder I med? *</Label>
                <RadioGroup 
                  value={assessmentData.dataVolume} 
                  onValueChange={(value) => setAssessmentData({...assessmentData, dataVolume: value})}
                  className="mt-3 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="minimal" id="data1" />
                    <Label htmlFor="data1">Minimalt - mest manuel behandling</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="data2" />
                    <Label htmlFor="data2">Moderat - regneark og dokumenter</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="significant" id="data3" />
                    <Label htmlFor="data3">Betydeligt - databaser og systemer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="massive" id="data4" />
                    <Label htmlFor="data4">Massivt - big data og analytics</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <Label>Hvad er jeres budget for AI-initiativer? *</Label>
                <RadioGroup 
                  value={assessmentData.budget} 
                  onValueChange={(value) => setAssessmentData({...assessmentData, budget: value})}
                  className="mt-3 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exploring" id="budget1" />
                    <Label htmlFor="budget1">Vi undersøger mulighederne</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0-50k" id="budget2" />
                    <Label htmlFor="budget2">Op til 50.000 DKK</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="50-150k" id="budget3" />
                    <Label htmlFor="budget3">50.000 - 150.000 DKK</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="150-500k" id="budget4" />
                    <Label htmlFor="budget4">150.000 - 500.000 DKK</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="500k+" id="budget5" />
                    <Label htmlFor="budget5">Over 500.000 DKK</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Hvor hurtigt vil I implementere AI-løsninger? *</Label>
                <RadioGroup 
                  value={assessmentData.timeline} 
                  onValueChange={(value) => setAssessmentData({...assessmentData, timeline: value})}
                  className="mt-3 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="asap" id="time1" />
                    <Label htmlFor="time1">Hurtigst muligt</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-3months" id="time2" />
                    <Label htmlFor="time2">Inden for 1-3 måneder</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3-6months" id="time3" />
                    <Label htmlFor="time3">Inden for 3-6 måneder</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="6-12months" id="time4" />
                    <Label htmlFor="time4">Inden for 6-12 måneder</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exploring" id="time5" />
                    <Label htmlFor="time5">Vi undersøger mulighederne</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Hvem er involveret i beslutningsprocessen? *</Label>
                <Input
                  value={assessmentData.decisionMakers}
                  onChange={(e) => setAssessmentData({...assessmentData, decisionMakers: e.target.value})}
                  placeholder="F.eks. CEO, IT-chef, CFO..."
                  className="mt-2"
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName">Navn *</Label>
                  <Input
                    id="contactName"
                    value={assessmentData.contactName}
                    onChange={(e) => setAssessmentData({...assessmentData, contactName: e.target.value})}
                    placeholder="Anders Andersen"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="contactRole">Titel *</Label>
                  <Input
                    id="contactRole"
                    value={assessmentData.contactRole}
                    onChange={(e) => setAssessmentData({...assessmentData, contactRole: e.target.value})}
                    placeholder="IT-chef"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contactEmail">E-mail *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={assessmentData.contactEmail}
                  onChange={(e) => setAssessmentData({...assessmentData, contactEmail: e.target.value})}
                  placeholder="anders@virksomhed.dk"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="contactPhone">Telefon *</Label>
                <Input
                  id="contactPhone"
                  value={assessmentData.contactPhone}
                  onChange={(e) => setAssessmentData({...assessmentData, contactPhone: e.target.value})}
                  placeholder="+45 12 34 56 78"
                  className="mt-2"
                />
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Hvad sker der nu?</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>I modtager en personlig AI-rapport inden for 24 timer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Rapporten indeholder konkrete anbefalinger og ROI-beregninger</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Vi kontakter jer for at booke en gratis gennemgang</span>
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
            {step < totalSteps ? (
              <Button onClick={handleNext}>
                Fortsæt
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Få jeres AI-rapport
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}