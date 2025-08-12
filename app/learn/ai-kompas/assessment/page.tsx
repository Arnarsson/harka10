'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Question {
  id: string;
  title: string;
  description: string;
  type: 'radio' | 'textarea' | 'input';
  options?: { value: string; label: string; description?: string }[];
  required: boolean;
}

const questions: Question[] = [
  {
    id: 'company_size',
    title: 'Hvor stor er jeres virksomhed?',
    description: 'Dette hjælper os med at tilpasse anbefalingerne til jeres skala',
    type: 'radio',
    options: [
      { value: '1-10', label: '1-10 medarbejdere', description: 'Startup/lille virksomhed' },
      { value: '11-50', label: '11-50 medarbejdere', description: 'Mindre virksomhed' },
      { value: '51-200', label: '51-200 medarbejdere', description: 'Mellemstor virksomhed' },
      { value: '201+', label: '200+ medarbejdere', description: 'Større virksomhed' }
    ],
    required: true
  },
  {
    id: 'industry',
    title: 'Hvilken branche arbejder I i?',
    description: 'Forskellige brancher har forskellige AI-muligheder',
    type: 'radio',
    options: [
      { value: 'tech', label: 'Teknologi/Software' },
      { value: 'manufacturing', label: 'Produktion/Manufacturing' },
      { value: 'retail', label: 'Detail/E-commerce' },
      { value: 'finance', label: 'Finans/Forsikring' },
      { value: 'healthcare', label: 'Sundhed/Medicin' },
      { value: 'education', label: 'Uddannelse' },
      { value: 'consulting', label: 'Rådgivning/Konsulentvirksomhed' },
      { value: 'other', label: 'Andet' }
    ],
    required: true
  },
  {
    id: 'ai_experience',
    title: 'Hvor meget erfaring har I med AI-værktøjer?',
    description: 'Dette hjælper os med at vurdere jeres nuværende modenhed',
    type: 'radio',
    options: [
      { value: 'none', label: 'Ingen erfaring', description: 'Vi har ikke brugt AI-værktøjer endnu' },
      { value: 'basic', label: 'Grundlæggende', description: 'Nogle medarbejdere bruger ChatGPT el.lign.' },
      { value: 'moderate', label: 'Moderat', description: 'Vi har implementeret enkelte AI-løsninger' },
      { value: 'advanced', label: 'Avanceret', description: 'AI er integreret i flere forretningsprocesser' }
    ],
    required: true
  },
  {
    id: 'main_challenges',
    title: 'Hvad er jeres største udfordringer lige nu?',
    description: 'Beskriv de områder hvor I bruger mest tid eller har største frustrationer',
    type: 'textarea',
    required: true
  },
  {
    id: 'time_consuming_tasks',
    title: 'Hvilke opgaver tager mest tid i jeres hverdag?',
    description: 'Tænk på gentagne, manuelle opgaver der kunne automatiseres',
    type: 'radio',
    options: [
      { value: 'data_entry', label: 'Dataindtastning og administration' },
      { value: 'customer_service', label: 'Kundeservice og support' },
      { value: 'content_creation', label: 'Indhold og kommunikation' },
      { value: 'analysis_reporting', label: 'Analyse og rapportering' },
      { value: 'scheduling_planning', label: 'Planlægning og koordinering' },
      { value: 'quality_control', label: 'Kvalitetskontrol og revision' },
      { value: 'sales_marketing', label: 'Salgs- og marketingaktiviteter' }
    ],
    required: true
  },
  {
    id: 'budget_range',
    title: 'Hvad er jeres estimerede budget for AI-initiativer?',
    description: 'Dette hjælper os med at prioritere løsninger efter jeres investeringsramme',
    type: 'radio',
    options: [
      { value: 'under_50k', label: 'Under 50.000 kr.' },
      { value: '50k_200k', label: '50.000 - 200.000 kr.' },
      { value: '200k_500k', label: '200.000 - 500.000 kr.' },
      { value: 'over_500k', label: 'Over 500.000 kr.' },
      { value: 'not_sure', label: 'Ikke sikker endnu' }
    ],
    required: true
  },
  {
    id: 'implementation_timeline',
    title: 'Hvor hurtigt vil I gerne implementere AI-løsninger?',
    description: 'Dette påvirker hvilke løsninger vi anbefaler',
    type: 'radio',
    options: [
      { value: 'immediately', label: 'Så hurtigt som muligt (0-3 måneder)' },
      { value: 'soon', label: 'Inden for 6 måneder' },
      { value: 'planned', label: 'Det næste år' },
      { value: 'exploring', label: 'Vi undersøger stadig mulighederne' }
    ],
    required: true
  },
  {
    id: 'contact_info',
    title: 'Kontaktoplysninger',
    description: 'Så vi kan sende jeres personlige AI-Kompas rapport',
    type: 'input',
    required: true
  }
];

export default function AIAssessmentPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    const question = questions[currentQuestion];
    
    if (question.required && !answers[question.id]) {
      alert('Dette spørgsmål er påkrævet');
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Submit assessment to API
      const response = await fetch('/api/ai-kompas/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: {
            ...answers,
            // Handle contact info specially
            company_name: answers.company_name || '',
            contact_name: answers.contact_name || '',
            email: answers.email || '',
            phone: answers.phone || '',
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        // Store assessment result in sessionStorage for the results page
        sessionStorage.setItem('ai_kompas_result', JSON.stringify(result.assessment));
        
        // Redirect to results page
        router.push('/learn/ai-kompas/results');
      } else {
        throw new Error('Assessment processing failed');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Der opstod en fejl under behandling af jeres assessment. Prøv venligst igen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Analyserer jeres svar...</h2>
            <p className="text-gray-600">Vi forbereder jeres personlige AI-Kompas rapport</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI-Parathedsvurdering
          </h1>
          <p className="text-gray-600">
            {questions.length} spørgsmål - ca. 15 minutter
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Spørgsmål {currentQuestion + 1} af {questions.length}</span>
            <span>{Math.round(progress)}% færdig</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{question.title}</CardTitle>
            <CardDescription>{question.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {question.type === 'radio' && question.options && (
              <RadioGroup 
                value={answers[question.id] || ''} 
                onValueChange={(value) => handleAnswer(question.id, value)}
              >
                {question.options.map((option) => (
                  <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={option.value} className="font-medium cursor-pointer">
                        {option.label}
                      </Label>
                      {option.description && (
                        <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question.type === 'textarea' && (
              <Textarea
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswer(question.id, e.target.value)}
                placeholder="Beskriv jeres situation her..."
                rows={4}
                className="resize-none"
              />
            )}

            {question.type === 'input' && question.id === 'contact_info' && (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Virksomhedens navn"
                  value={answers['company_name'] || ''}
                  onChange={(e) => handleAnswer('company_name', e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Dit navn"
                  value={answers['contact_name'] || ''}
                  onChange={(e) => handleAnswer('contact_name', e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email adresse"
                  value={answers['email'] || ''}
                  onChange={(e) => handleAnswer('email', e.target.value)}
                />
                <Input
                  type="tel"
                  placeholder="Telefonnummer (valgfrit)"
                  value={answers['phone'] || ''}
                  onChange={(e) => handleAnswer('phone', e.target.value)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Forrige
          </Button>
          
          <Button onClick={handleNext}>
            {isLastQuestion ? (
              <>
                Få min rapport
                <CheckCircle className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Næste
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>Jeres data behandles fortroligt og bruges kun til at generere jeres rapport</p>
        </div>
      </div>
    </div>
  );
}