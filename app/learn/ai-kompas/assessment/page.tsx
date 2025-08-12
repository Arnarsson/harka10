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
import { useLanguage } from '@/lib/i18n/language-context';
import { getTranslations } from '@/lib/i18n/translations';

interface Question {
  id: string;
  title: string;
  description: string;
  type: 'radio' | 'textarea' | 'input';
  options?: { value: string; label: string; description?: string }[];
  required: boolean;
}

function getLocalizedQuestions(t: any, language: string): Question[] {
  return [
    {
      id: 'company_size',
      title: t.assessmentCompanySize,
      description: t.assessmentCompanySizeDesc,
      type: 'radio',
      options: [
        { value: '1-10', label: language === 'da' ? '1-10 medarbejdere' : '1-10 employees', description: language === 'da' ? 'Startup/lille virksomhed' : 'Startup/small business' },
        { value: '11-50', label: language === 'da' ? '11-50 medarbejdere' : '11-50 employees', description: language === 'da' ? 'Mindre virksomhed' : 'Small business' },
        { value: '51-200', label: language === 'da' ? '51-200 medarbejdere' : '51-200 employees', description: language === 'da' ? 'Mellemstor virksomhed' : 'Medium business' },
        { value: '201+', label: language === 'da' ? '200+ medarbejdere' : '200+ employees', description: language === 'da' ? 'Større virksomhed' : 'Large business' }
      ],
      required: true
    },
    {
      id: 'industry',
      title: t.assessmentIndustry,
      description: t.assessmentIndustryDesc,
      type: 'radio',
      options: [
        { value: 'tech', label: language === 'da' ? 'Teknologi/Software' : 'Technology/Software' },
        { value: 'manufacturing', label: language === 'da' ? 'Produktion/Manufacturing' : 'Manufacturing/Production' },
        { value: 'retail', label: language === 'da' ? 'Detail/E-commerce' : 'Retail/E-commerce' },
        { value: 'finance', label: language === 'da' ? 'Finans/Forsikring' : 'Finance/Insurance' },
        { value: 'healthcare', label: language === 'da' ? 'Sundhed/Medicin' : 'Healthcare/Medicine' },
        { value: 'education', label: language === 'da' ? 'Uddannelse' : 'Education' },
        { value: 'consulting', label: language === 'da' ? 'Rådgivning/Konsulentvirksomhed' : 'Consulting/Advisory' },
        { value: 'other', label: language === 'da' ? 'Andet' : 'Other' }
      ],
      required: true
    },
    {
      id: 'ai_experience',
      title: t.assessmentAiExperience,
      description: t.assessmentAiExperienceDesc,
      type: 'radio',
      options: [
        { value: 'none', label: language === 'da' ? 'Ingen erfaring' : 'No experience', description: language === 'da' ? 'Vi har ikke brugt AI-værktøjer endnu' : 'We haven\'t used AI tools yet' },
        { value: 'basic', label: language === 'da' ? 'Grundlæggende' : 'Basic', description: language === 'da' ? 'Nogle medarbejdere bruger ChatGPT el.lign.' : 'Some employees use ChatGPT or similar' },
        { value: 'moderate', label: language === 'da' ? 'Moderat' : 'Moderate', description: language === 'da' ? 'Vi har implementeret enkelte AI-løsninger' : 'We have implemented some AI solutions' },
        { value: 'advanced', label: language === 'da' ? 'Avanceret' : 'Advanced', description: language === 'da' ? 'AI er integreret i flere forretningsprocesser' : 'AI is integrated in multiple business processes' }
      ],
      required: true
    },
    {
      id: 'main_challenges',
      title: t.assessmentMainChallenges,
      description: t.assessmentMainChallengesDesc,
      type: 'textarea',
      required: true
    },
    {
      id: 'time_consuming_tasks',
      title: t.assessmentTimeConsumingTasks,
      description: t.assessmentTimeConsumingTasksDesc,
      type: 'radio',
      options: [
        { value: 'data_entry', label: language === 'da' ? 'Dataindtastning og administration' : 'Data entry and administration' },
        { value: 'customer_service', label: language === 'da' ? 'Kundeservice og support' : 'Customer service and support' },
        { value: 'content_creation', label: language === 'da' ? 'Indhold og kommunikation' : 'Content and communication' },
        { value: 'analysis_reporting', label: language === 'da' ? 'Analyse og rapportering' : 'Analysis and reporting' },
        { value: 'scheduling_planning', label: language === 'da' ? 'Planlægning og koordinering' : 'Scheduling and coordination' },
        { value: 'quality_control', label: language === 'da' ? 'Kvalitetskontrol og revision' : 'Quality control and auditing' },
        { value: 'sales_marketing', label: language === 'da' ? 'Salgs- og marketingaktiviteter' : 'Sales and marketing activities' }
      ],
      required: true
    },
    {
      id: 'budget_range',
      title: t.assessmentBudgetRange,
      description: t.assessmentBudgetRangeDesc,
      type: 'radio',
      options: [
        { value: 'under_50k', label: language === 'da' ? 'Under 50.000 kr.' : 'Under €7,500' },
        { value: '50k_200k', label: language === 'da' ? '50.000 - 200.000 kr.' : '€7,500 - €30,000' },
        { value: '200k_500k', label: language === 'da' ? '200.000 - 500.000 kr.' : '€30,000 - €75,000' },
        { value: 'over_500k', label: language === 'da' ? 'Over 500.000 kr.' : 'Over €75,000' },
        { value: 'not_sure', label: language === 'da' ? 'Ikke sikker endnu' : 'Not sure yet' }
      ],
      required: true
    },
    {
      id: 'implementation_timeline',
      title: t.assessmentImplementationTimeline,
      description: t.assessmentImplementationTimelineDesc,
      type: 'radio',
      options: [
        { value: 'immediately', label: language === 'da' ? 'Så hurtigt som muligt (0-3 måneder)' : 'As soon as possible (0-3 months)' },
        { value: 'soon', label: language === 'da' ? 'Inden for 6 måneder' : 'Within 6 months' },
        { value: 'planned', label: language === 'da' ? 'Det næste år' : 'Next year' },
        { value: 'exploring', label: language === 'da' ? 'Vi undersøger stadig mulighederne' : 'We are still exploring options' }
      ],
      required: true
    },
    {
      id: 'contact_info',
      title: t.assessmentContactInfo,
      description: t.assessmentContactInfoDesc,
      type: 'input',
      required: true
    }
  ];
}


export default function AIAssessmentPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = getTranslations(language);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = getLocalizedQuestions(t, language);
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
            <h2 className="text-xl font-semibold mb-2">
              {language === 'da' ? 'Analyserer jeres svar...' : 'Analyzing your answers...'}
            </h2>
            <p className="text-gray-600">
              {language === 'da' 
                ? 'Vi forbereder jeres personlige AI-Kompas rapport' 
                : 'We are preparing your personal AI-Kompas report'
              }
            </p>
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
            {t.aiKompasAssessment}
          </h1>
          <p className="text-gray-600">
            {t.aiKompasAssessmentSubtitle}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              {language === 'da' ? `Spørgsmål ${currentQuestion + 1} af ${questions.length}` : `Question ${currentQuestion + 1} of ${questions.length}`}
            </span>
            <span>
              {Math.round(progress)}% {language === 'da' ? 'færdig' : 'complete'}
            </span>
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
                placeholder={language === 'da' ? 'Beskriv jeres situation her...' : 'Describe your situation here...'}
                rows={4}
                className="resize-none"
              />
            )}

            {question.type === 'input' && question.id === 'contact_info' && (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder={language === 'da' ? 'Virksomhedens navn' : 'Company name'}
                  value={answers['company_name'] || ''}
                  onChange={(e) => handleAnswer('company_name', e.target.value)}
                />
                <Input
                  type="text"
                  placeholder={language === 'da' ? 'Dit navn' : 'Your name'}
                  value={answers['contact_name'] || ''}
                  onChange={(e) => handleAnswer('contact_name', e.target.value)}
                />
                <Input
                  type="email"
                  placeholder={language === 'da' ? 'Email adresse' : 'Email address'}
                  value={answers['email'] || ''}
                  onChange={(e) => handleAnswer('email', e.target.value)}
                />
                <Input
                  type="tel"
                  placeholder={language === 'da' ? 'Telefonnummer (valgfrit)' : 'Phone number (optional)'}
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
            {language === 'da' ? 'Forrige' : 'Previous'}
          </Button>
          
          <Button onClick={handleNext}>
            {isLastQuestion ? (
              <>
                {language === 'da' ? 'Få min rapport' : 'Get my report'}
                <CheckCircle className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                {language === 'da' ? 'Næste' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>
            {language === 'da' 
              ? 'Jeres data behandles fortroligt og bruges kun til at generere jeres rapport'
              : 'Your data is handled confidentially and used only to generate your report'
            }
          </p>
        </div>
      </div>
    </div>
  );
}