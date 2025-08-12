'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Target, 
  DollarSign, 
  Calendar,
  Download,
  Phone,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/language-context';
import { getTranslations } from '@/lib/i18n/translations';

interface AIOpportunity {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  roi: string;
  timeframe: string;
  category: 'automation' | 'analytics' | 'customer' | 'content' | 'operations';
}

interface ProcessArea {
  name: string;
  current_efficiency: number;
  ai_potential: 'high' | 'medium' | 'low';
  quick_wins: string[];
}

const mockOpportunities: AIOpportunity[] = [
  {
    id: '1',
    title: 'Automatisk kundeservice chatbot',
    description: 'Håndter 70% af kundeforespørgsler automatisk med AI-drevet chatbot',
    impact: 'high',
    effort: 'medium',
    roi: '300-500%',
    timeframe: '2-3 måneder',
    category: 'customer'
  },
  {
    id: '2',
    title: 'AI-assisteret indholdsproduktion',
    description: 'Automatiser oprettelse af produktbeskrivelser og marketingmateriale',
    impact: 'high',
    effort: 'low',
    roi: '200-400%',
    timeframe: '2-4 uger',
    category: 'content'
  },
  {
    id: '3',
    title: 'Prediktiv lageroptimering',
    description: 'Reducer lageromkostninger med 20-30% gennem AI-dreven efterspørgselsprognose',
    impact: 'medium',
    effort: 'high',
    roi: '150-250%',
    timeframe: '4-6 måneder',
    category: 'operations'
  },
  {
    id: '4',
    title: 'Automatisk fakturabehandling',
    description: 'Reducer manuel fakturabehandling fra timer til minutter',
    impact: 'medium',
    effort: 'low',
    roi: '400-600%',
    timeframe: '1-2 måneder',
    category: 'automation'
  },
  {
    id: '5',
    title: 'AI-baseret salgsprognoser',
    description: 'Forbedre salgsprognoser og ressourceplanlægning med 40% nøjagtighed',
    impact: 'medium',
    effort: 'medium',
    roi: '180-300%',
    timeframe: '3-4 måneder',
    category: 'analytics'
  }
];

const mockProcessAreas: ProcessArea[] = [
  { name: 'Kundeservice', current_efficiency: 65, ai_potential: 'high', quick_wins: ['Chatbot implementering', 'FAQ automation'] },
  { name: 'Indholdsproduktion', current_efficiency: 45, ai_potential: 'high', quick_wins: ['AI-tekstgenerering', 'Billedoptimering'] },
  { name: 'Salgsprognoser', current_efficiency: 60, ai_potential: 'medium', quick_wins: ['Dataanalyse automation', 'Rapport generation'] },
  { name: 'Lageroptimering', current_efficiency: 70, ai_potential: 'medium', quick_wins: ['Demand forecasting', 'Automatisk genbestilling'] },
  { name: 'Fakturabehandling', current_efficiency: 55, ai_potential: 'high', quick_wins: ['OCR implementering', 'Godkendelsesflow'] },
  { name: 'HR-processer', current_efficiency: 75, ai_potential: 'low', quick_wins: ['CV screening', 'Planlægningsassistance'] }
];

export default function AIKompasResultsPage() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const [isLoading, setIsLoading] = useState(true);
  const [assessmentData, setAssessmentData] = useState<any>(null);

  useEffect(() => {
    // Get assessment result from sessionStorage
    const storedResult = sessionStorage.getItem('ai_kompas_result');
    
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult);
        setAssessmentData(parsedResult);
        
        // Simulate loading time for analysis
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Error parsing assessment result:', error);
        setIsLoading(false);
      }
    } else {
      // No assessment data found, redirect back to assessment
      window.location.href = '/learn/ai-kompas/assessment';
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Genererer jeres AI-Kompas...</h2>
            <p className="text-gray-600 mb-4">Analyserer processer og identificerer muligheder</p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>✓ Kortlægger nuværende processer</p>
              <p>✓ Beregner ROI-potentiale</p>
              <p>✓ Identificerer quick wins</p>
              <p className="animate-pulse">• Forbereder anbefalinger...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.aiKompasReport}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.aiKompasReportDesc}
          </p>
        </div>

        {/* Executive Summary */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">{t.executiveSummary}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {assessmentData?.summary?.totalOpportunities || 5}
                </div>
                <p className="text-gray-700">{t.topOpportunitiesIdentified}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {assessmentData?.summary?.expectedEfficiencyGain || '25-40%'}
                </div>
                <p className="text-gray-700">{t.expectedEfficiencyIncrease}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  ROI {assessmentData?.summary?.roiRange || '200-600%'}
                </div>
                <p className="text-gray-700">{t.onPriorityProjects}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold mb-2">{t.ourRecommendation}</h3>
              <p className="text-gray-600">
                {assessmentData?.summary?.recommendation || 
                 (language === 'da' 
                   ? 'Start med kundeservice chatbot og automatisk fakturabehandling - disse giver hurtig værdi og bygger tillid til AI i organisationen.'
                   : 'Start with customer service chatbot and automatic invoice processing - these provide quick value and build trust in AI within the organization.'
                 )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Process Heat Map */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Proces Heat-Map: AI-Potentiale
            </CardTitle>
            <CardDescription>
              Rød = Høj prioritet, Gul = Medium prioritet, Grøn = Lav prioritet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {(assessmentData?.processAreas || mockProcessAreas).map((area) => (
                <div key={area.name} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold">{area.name}</h3>
                    <div className={`w-4 h-4 rounded-full ${
                      area.ai_potential === 'high' ? 'bg-red-500' :
                      area.ai_potential === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Nuværende effektivitet</span>
                      <span>{area.current_efficiency}%</span>
                    </div>
                    <Progress value={area.current_efficiency} className="h-2" />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Quick Wins:</p>
                    <div className="flex flex-wrap gap-1">
                      {area.quick_wins.map((win, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {win}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top 5 AI Opportunities */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top 5 AI-Muligheder (Rangeret efter ROI)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(assessmentData?.opportunities || mockOpportunities).map((opportunity, index) => (
                <div key={opportunity.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 font-bold rounded-full">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                    </div>
                    <Badge className={getImpactColor(opportunity.impact)}>
                      {opportunity.impact === 'high' ? 'Høj impact' : 
                       opportunity.impact === 'medium' ? 'Medium impact' : 'Lav impact'}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{opportunity.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        <strong>ROI:</strong> {opportunity.roi}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">
                        <strong>Tidsramme:</strong> {opportunity.timeframe}
                      </span>
                    </div>
                    <div>
                      <Badge className={getEffortColor(opportunity.effort)}>
                        {opportunity.effort === 'low' ? 'Lille indsats' :
                         opportunity.effort === 'medium' ? 'Medium indsats' : 'Stor indsats'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Implementation Roadmap */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Anbefalet Implementerings-Roadmap</CardTitle>
            <CardDescription>
              Struktureret tilgang til jeres AI-transformation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-green-700">Måned 1-2: Quick Wins</h3>
                <p className="text-sm text-gray-600 mb-2">Start med lavthængende frugter</p>
                <ul className="text-sm space-y-1">
                  <li>• Automatisk fakturabehandling (ROI: 400-600%)</li>
                  <li>• AI-assisteret indholdsproduktion (ROI: 200-400%)</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="font-semibold text-yellow-700">Måned 3-4: Mellemlange projekter</h3>
                <p className="text-sm text-gray-600 mb-2">Byg videre på succeserne</p>
                <ul className="text-sm space-y-1">
                  <li>• Kundeservice chatbot (ROI: 300-500%)</li>
                  <li>• AI-baseret salgsprognoser (ROI: 180-300%)</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-blue-700">Måned 5-8: Strategiske initiativer</h3>
                <p className="text-sm text-gray-600 mb-2">Større transformation</p>
                <ul className="text-sm space-y-1">
                  <li>• Prediktiv lageroptimering (ROI: 150-250%)</li>
                  <li>• Avancerede analyseløsninger</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps CTA */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="py-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Få jeres personlige rapport som PDF
              </h2>
              <p className="mb-6 opacity-90">
                Download den komplette analyse med detaljerede anbefalinger og budget-estimater
              </p>
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Download className="mr-2 h-5 w-5" />
                Download Fuld Rapport
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
            <CardContent className="py-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Book 90-minutters strategimøde
              </h2>
              <p className="mb-6 opacity-90">
                Få personlig rådgivning og detaljeret implementeringsplan fra vores AI-eksperter
              </p>
              <Button variant="secondary" size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Phone className="mr-2 h-5 w-5" />
                Book Gratis Konsultation
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Service Packages */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-8">Næste skridt: Vælg jeres AI-rejse</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="relative">
              <CardHeader>
                <CardTitle>AI-Transformation</CardTitle>
                <CardDescription>Implementer jeres top 3 muligheder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600 mb-4">Fra 150.000 kr.</p>
                <Link href="/learn/ai-transformation">
                  <Button className="w-full">
                    Læs mere
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="relative border-blue-500 border-2">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-3 py-1">Anbefalet</Badge>
              </div>
              <CardHeader>
                <CardTitle>AI-Kompetenceløft</CardTitle>
                <CardDescription>Gør jeres team AI-klar</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600 mb-4">Fra 75.000 kr.</p>
                <Link href="/learn/ai-kompetence">
                  <Button className="w-full">
                    Læs mere
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Accelerator</CardTitle>
                <CardDescription>Komplet transformation (alle pakker)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600 mb-4">Fra 300.000 kr.</p>
                <Link href="/learn/ai-accelerator">
                  <Button className="w-full">
                    Læs mere
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500">
          <p className="mb-2">Denne rapport er genereret baseret på jeres svar og branche-best practices</p>
          <p>Har I spørgsmål? Kontakt os på hello@harka.ai eller +45 XX XX XX XX</p>
        </div>
      </div>
    </div>
  );
}