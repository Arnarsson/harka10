'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, Target, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AIKompasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
            <Compass className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Kompas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find jeres vej ind i AI-revolutionen. Fra uklarhed til konkret handleplan.
          </p>
        </div>

        {/* Value Proposition */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Identificer AI-Potentiale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Kortlægning af alle processer med heat-map visualisering af AI-muligheder
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Forventet ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Top 10 AI-muligheder rangeret efter return on investment
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Zap className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <CardTitle>Quick Wins</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Hurtige gevinster du kan implementere allerede i morgen
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Assessment Overview */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Hvad får du ud af AI-Kompas?</CardTitle>
            <CardDescription>
              En struktureret analyse der giver dig konkrete og målbare resultater
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Konkrete Outputs:</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    Heat-map over alle processer (rød/gul/grøn for AI-potentiale)
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    Top 10 AI-muligheder rangeret efter ROI
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    Implementeringsplan med tidslinjer
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    Budget-estimater for hver mulighed
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    "Quick wins" der kan startes i morgen
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Perfekt hvis du:</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    Vil forstå jeres AI-potentiale før investering
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    Søger konkrete besparelsespotentialer
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    Ønsker en risikofri start på AI-rejsen
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    Har brug for data til beslutningstagning
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">
                Klar til at kortlægge jeres AI-potentiale?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Start med vores AI-parathedsvurdering - få konkrete indsigter på 15 minutter
              </p>
              <Link href="/learn/ai-kompas/assessment">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Start AI-Parathedsvurdering
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Process Overview */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Sådan fungerer processen</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Online Vurdering</h3>
              <p className="text-sm text-gray-600">15 minutters struktureret questionnaire</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Automatisk Analyse</h3>
              <p className="text-sm text-gray-600">AI-dreven procesvurdering og potentiale-kortlægning</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Personlig Rapport</h3>
              <p className="text-sm text-gray-600">Skræddersyet handleplan med ROI-estimater</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Opfølgning</h3>
              <p className="text-sm text-gray-600">Valgfrit 90-minutters strategimøde</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}