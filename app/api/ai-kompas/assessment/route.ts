import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

interface AssessmentSubmission {
  answers: Record<string, string>;
  timestamp: string;
}

interface AIOpportunity {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  roi: string;
  timeframe: string;
  category: 'automation' | 'analytics' | 'customer' | 'content' | 'operations';
  priority_score: number;
}

interface ProcessAssessment {
  name: string;
  current_efficiency: number;
  ai_potential: 'high' | 'medium' | 'low';
  quick_wins: string[];
}

// AI Opportunity templates based on company characteristics
const opportunityTemplates: Record<string, AIOpportunity[]> = {
  'tech': [
    {
      id: 'code_review',
      title: 'AI-assisteret kodegennemgang',
      description: 'Automatiser kodegennemgang og bug-detection med 40% forbedret kvalitet',
      impact: 'high',
      effort: 'medium',
      roi: '250-400%',
      timeframe: '2-3 måneder',
      category: 'automation',
      priority_score: 85
    },
    {
      id: 'documentation',
      title: 'Automatisk dokumentationsgenerering',
      description: 'Generer og vedligehold teknisk dokumentation automatisk',
      impact: 'medium',
      effort: 'low',
      roi: '200-350%',
      timeframe: '1-2 måneder',
      category: 'content',
      priority_score: 80
    }
  ],
  'retail': [
    {
      id: 'demand_forecasting',
      title: 'AI-dreven efterspørgselsprognose',
      description: 'Reducer lageromkostninger med 25-35% gennem præcis efterspørgselsprognose',
      impact: 'high',
      effort: 'medium',
      roi: '300-500%',
      timeframe: '3-4 måneder',
      category: 'analytics',
      priority_score: 90
    },
    {
      id: 'personalization',
      title: 'Personaliseret produktanbefaling',
      description: 'Øg salg med 15-30% gennem AI-drevne produktanbefalinger',
      impact: 'high',
      effort: 'medium',
      roi: '400-700%',
      timeframe: '2-3 måneder',
      category: 'customer',
      priority_score: 95
    }
  ],
  'manufacturing': [
    {
      id: 'predictive_maintenance',
      title: 'Prediktiv vedligeholdelse',
      description: 'Reducer nedetid med 40% og vedligeholdelsesomkostninger med 25%',
      impact: 'high',
      effort: 'high',
      roi: '200-400%',
      timeframe: '4-6 måneder',
      category: 'operations',
      priority_score: 85
    },
    {
      id: 'quality_control',
      title: 'AI-baseret kvalitetskontrol',
      description: 'Automatiser kvalitetsinspektioner med 99% nøjagtighed',
      impact: 'high',
      effort: 'medium',
      roi: '300-500%',
      timeframe: '3-4 måneder',
      category: 'automation',
      priority_score: 88
    }
  ]
};

// Generic opportunities that apply to most companies
const genericOpportunities: AIOpportunity[] = [
  {
    id: 'chatbot',
    title: 'AI-powered kundeservice chatbot',
    description: 'Håndter 60-80% af kundeforespørgsler automatisk med intelligent chatbot',
    impact: 'high',
    effort: 'medium',
    roi: '300-500%',
    timeframe: '2-3 måneder',
    category: 'customer',
    priority_score: 92
  },
  {
    id: 'content_generation',
    title: 'AI-assisteret indholdsproduktion',
    description: 'Automatiser oprettelse af marketingmateriale og produktbeskrivelser',
    impact: 'high',
    effort: 'low',
    roi: '200-400%',
    timeframe: '2-4 uger',
    category: 'content',
    priority_score: 88
  },
  {
    id: 'invoice_processing',
    title: 'Automatisk fakturabehandling',
    description: 'Reducer manuel fakturabehandling fra timer til minutter med OCR og AI',
    impact: 'medium',
    effort: 'low',
    roi: '400-600%',
    timeframe: '1-2 måneder',
    category: 'automation',
    priority_score: 95
  },
  {
    id: 'sales_forecasting',
    title: 'AI-baseret salgsprognoser',
    description: 'Forbedre salgsprognoser og ressourceplanlægning med 40% højere nøjagtighed',
    impact: 'medium',
    effort: 'medium',
    roi: '180-300%',
    timeframe: '3-4 måneder',
    category: 'analytics',
    priority_score: 82
  },
  {
    id: 'email_automation',
    title: 'Intelligent email-automation',
    description: 'Personaliser og automatiser email-marketing med AI-drevne indsigter',
    impact: 'medium',
    effort: 'low',
    roi: '250-400%',
    timeframe: '1-3 måneder',
    category: 'customer',
    priority_score: 78
  }
];

function generateAssessment(answers: Record<string, string>): {
  opportunities: AIOpportunity[];
  processAreas: ProcessAssessment[];
  summary: {
    totalOpportunities: number;
    expectedEfficiencyGain: string;
    roiRange: string;
    recommendation: string;
  };
} {
  const industry = answers.industry || 'other';
  const companySize = answers.company_size || '1-10';
  const aiExperience = answers.ai_experience || 'none';
  const budget = answers.budget_range || 'not_sure';
  const timeline = answers.implementation_timeline || 'exploring';

  // Get industry-specific opportunities
  const industryOpportunities = opportunityTemplates[industry] || [];
  
  // Combine with generic opportunities
  let allOpportunities = [...genericOpportunities, ...industryOpportunities];

  // Filter and adjust based on company characteristics
  allOpportunities = allOpportunities.map(opp => {
    let adjustedOpp = { ...opp };
    
    // Adjust priority based on AI experience
    if (aiExperience === 'none' && opp.effort === 'high') {
      adjustedOpp.priority_score -= 20;
    } else if (aiExperience === 'advanced' && opp.effort === 'low') {
      adjustedOpp.priority_score += 10;
    }
    
    // Adjust based on timeline urgency
    if (timeline === 'immediately' && opp.timeframe.includes('måneder')) {
      adjustedOpp.priority_score += 15;
    }
    
    // Adjust based on budget
    if (budget === 'under_50k' && opp.effort === 'high') {
      adjustedOpp.priority_score -= 15;
    }
    
    return adjustedOpp;
  });

  // Sort by priority score and take top 5
  const topOpportunities = allOpportunities
    .sort((a, b) => b.priority_score - a.priority_score)
    .slice(0, 5);

  // Generate process areas assessment
  const processAreas: ProcessAssessment[] = [
    {
      name: 'Kundeservice',
      current_efficiency: 65,
      ai_potential: 'high',
      quick_wins: ['Chatbot implementering', 'FAQ automation', 'Ticket routing']
    },
    {
      name: 'Indholdsproduktion',
      current_efficiency: 50,
      ai_potential: 'high',
      quick_wins: ['AI-tekstgenerering', 'Billedoptimering', 'SEO-optimering']
    },
    {
      name: 'Dataanalyse',
      current_efficiency: 55,
      ai_potential: 'medium',
      quick_wins: ['Rapport automation', 'Trend analyse', 'KPI tracking']
    },
    {
      name: 'Økonomistyring',
      current_efficiency: 70,
      ai_potential: 'medium',
      quick_wins: ['Fakturabehandling', 'Budgetprognoser', 'Expense tracking']
    },
    {
      name: 'Salgsprognoser',
      current_efficiency: 60,
      ai_potential: industry === 'retail' ? 'high' : 'medium',
      quick_wins: ['Lead scoring', 'Pipeline analyse', 'Churn prediction']
    },
    {
      name: 'HR-processer',
      current_efficiency: 75,
      ai_potential: 'low',
      quick_wins: ['CV screening', 'Planlægningsassistance', 'Performance tracking']
    }
  ];

  // Adjust process efficiency based on answers
  if (answers.time_consuming_tasks === 'customer_service') {
    processAreas[0].current_efficiency -= 15;
    processAreas[0].ai_potential = 'high';
  }
  if (answers.time_consuming_tasks === 'content_creation') {
    processAreas[1].current_efficiency -= 20;
    processAreas[1].ai_potential = 'high';
  }

  // Generate summary
  const summary = {
    totalOpportunities: topOpportunities.length,
    expectedEfficiencyGain: '25-40%',
    roiRange: '200-600%',
    recommendation: generateRecommendation(answers, topOpportunities)
  };

  return {
    opportunities: topOpportunities,
    processAreas,
    summary
  };
}

function generateRecommendation(
  answers: Record<string, string>, 
  opportunities: AIOpportunity[]
): string {
  const budget = answers.budget_range;
  const timeline = answers.implementation_timeline;
  const aiExperience = answers.ai_experience;
  
  if (aiExperience === 'none') {
    return `Baseret på jeres begrænsede AI-erfaring anbefaler vi at starte med ${opportunities[0]?.title.toLowerCase()} og ${opportunities[1]?.title.toLowerCase()}. Disse giver hurtig værdi og bygger tillid til AI i organisationen.`;
  }
  
  if (timeline === 'immediately') {
    const quickWins = opportunities.filter(opp => opp.effort === 'low').slice(0, 2);
    return `Med jeres hurtige timeline anbefaler vi at fokusere på quick wins som ${quickWins.map(opp => opp.title.toLowerCase()).join(' og ')}. Disse kan implementeres inden for 1-2 måneder.`;
  }
  
  if (budget === 'under_50k') {
    const lowEffortOpps = opportunities.filter(opp => opp.effort === 'low' || opp.effort === 'medium').slice(0, 2);
    return `Inden for jeres budget anbefaler vi at starte med ${lowEffortOpps.map(opp => opp.title.toLowerCase()).join(' og ')}. Disse giver høj værdi uden store investeringer.`;
  }
  
  return `Start med ${opportunities[0]?.title.toLowerCase()} og ${opportunities[1]?.title.toLowerCase()} for at skabe momentum, og udvid derefter til ${opportunities[2]?.title.toLowerCase()}.`;
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { answers } = body as { answers: Record<string, string> };

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { error: 'Invalid assessment data' },
        { status: 400 }
      );
    }

    // Generate the AI assessment
    const assessment = generateAssessment(answers);
    
    // Here you could save the assessment to your database
    // await saveAssessment(user.id, answers, assessment);

    return NextResponse.json({
      success: true,
      assessment,
      userId: user.id,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Assessment processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Here you could fetch saved assessments from your database
    // const savedAssessments = await getAssessments(user.id);
    
    return NextResponse.json({
      success: true,
      message: 'Assessment API endpoint is working',
      userId: user.id
    });
    
  } catch (error) {
    console.error('Assessment API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}