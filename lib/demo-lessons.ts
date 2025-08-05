export const demoLessons = [
  {
    id: 'intro-to-ai-automation',
    title: 'Introduction to AI Automation',
    description: 'Learn the basics of AI-powered automation with hands-on examples',
    language: 'javascript',
    type: 'code' as const,
    code: `// Welcome to HARKA Interactive Learning!
// This is your first AI automation script

// Step 1: Import the AI library
import { OpenAI } from 'openai';

// Step 2: Initialize the AI client
const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Step 3: Create your first AI function
async function generateIdeas(topic) {
  // TODO: Try editing this prompt!
  const prompt = \`Generate 3 creative ideas about \${topic}\`;
  
  const response = await ai.completions.create({
    model: 'gpt-3.5-turbo',
    prompt: prompt,
    max_tokens: 200
  });
  
  return response.choices[0].text;
}

// Step 4: Test your function
const ideas = await generateIdeas('sustainable technology');
console.log('AI Generated Ideas:', ideas);

// 🎯 Try This: 
// 1. Pause the lesson and change the topic
// 2. Modify the prompt to be more specific
// 3. Add error handling`,
    duration: 15,
    objectives: [
      'Understand AI API basics',
      'Write your first AI automation',
      'Learn prompt engineering fundamentals'
    ]
  },
  {
    id: 'n8n-workflow-basics',
    title: 'Building Your First n8n Workflow',
    description: 'Create automation workflows without code using n8n',
    language: 'json',
    type: 'workflow' as const,
    code: `{
  "name": "My First Automation",
  "nodes": [
    {
      "id": "1",
      "type": "webhook",
      "name": "Webhook Trigger",
      "parameters": {
        "path": "/my-automation",
        "method": "POST"
      },
      "position": [100, 200]
    },
    {
      "id": "2", 
      "type": "openai",
      "name": "AI Processing",
      "parameters": {
        "model": "gpt-3.5-turbo",
        "prompt": "={{$json.message}}",
        "temperature": 0.7
      },
      "position": [300, 200]
    },
    {
      "id": "3",
      "type": "email",
      "name": "Send Email",
      "parameters": {
        "to": "={{$json.email}}",
        "subject": "AI Response",
        "body": "={{$node['AI Processing'].json.response}}"
      },
      "position": [500, 200]
    }
  ],
  "connections": {
    "1": ["2"],
    "2": ["3"]
  }
}

// 🎯 Interactive Challenge:
// 1. Add a new node to save responses to a database
// 2. Add error handling between nodes
// 3. Create a conditional path based on AI response`,
    duration: 20,
    objectives: [
      'Understand n8n workflow structure',
      'Connect multiple automation nodes',
      'Handle data flow between services'
    ]
  },
  {
    id: 'prompt-engineering-advanced',
    title: 'Advanced Prompt Engineering',
    description: 'Master the art of crafting effective AI prompts',
    language: 'markdown',
    type: 'prompt' as const,
    code: `# System Prompt Template

You are an expert {role} with {years} years of experience in {domain}.

## Your Expertise:
- {skill1}
- {skill2}
- {skill3}

## Your Communication Style:
- Clear and concise
- Use examples when helpful
- Ask clarifying questions

## Task Instructions:
{specific_task}

## Output Format:
{desired_format}

---

# Example Usage:

role: "Data Scientist"
years: 10
domain: "Machine Learning"
skill1: "Python and R programming"
skill2: "Statistical analysis"
skill3: "Deep learning frameworks"
specific_task: "Analyze this dataset and identify patterns"
desired_format: "Bullet points with insights and recommendations"

# 🎯 Try These Exercises:
# 1. Create a prompt for a Marketing Expert
# 2. Add constraints to limit response length
# 3. Include few-shot examples
# 4. Test with different temperatures`,
    duration: 25,
    objectives: [
      'Master prompt template design',
      'Understand role-based prompting',
      'Learn output formatting techniques'
    ]
  },
  {
    id: 'api-integration-basics',
    title: 'API Integration Fundamentals',
    description: 'Connect AI services with external APIs',
    language: 'typescript',
    type: 'code' as const,
    code: `// Building an AI-Powered API Integration

interface APIConfig {
  baseURL: string;
  headers: Record<string, string>;
  timeout?: number;
}

class AIAPIIntegration {
  private config: APIConfig;
  
  constructor(config: APIConfig) {
    this.config = config;
  }
  
  // Fetch data from external API
  async fetchData(endpoint: string) {
    try {
      const response = await fetch(
        \`\${this.config.baseURL}\${endpoint}\`,
        {
          headers: this.config.headers,
          signal: AbortSignal.timeout(this.config.timeout || 5000)
        }
      );
      
      if (!response.ok) {
        throw new Error(\`API Error: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
  
  // Process data with AI
  async processWithAI(data: any, instruction: string) {
    // AI processing logic here
    const prompt = \`
      Analyze this data and \${instruction}:
      \${JSON.stringify(data, null, 2)}
    \`;
    
    // Simulate AI response
    return {
      analysis: "AI analysis results...",
      insights: ["Insight 1", "Insight 2"],
      recommendations: ["Action 1", "Action 2"]
    };
  }
  
  // Complete integration flow
  async integrateAndAnalyze(endpoint: string, instruction: string) {
    const data = await this.fetchData(endpoint);
    const analysis = await this.processWithAI(data, instruction);
    
    return {
      originalData: data,
      aiAnalysis: analysis,
      timestamp: new Date().toISOString()
    };
  }
}

// Example usage
const integration = new AIAPIIntegration({
  baseURL: 'https://api.example.com',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// 🎯 Interactive Challenges:
// 1. Add retry logic for failed requests
// 2. Implement caching for API responses
// 3. Add webhook support for real-time data
// 4. Create error recovery strategies`,
    duration: 30,
    objectives: [
      'Build robust API integrations',
      'Handle errors gracefully',
      'Combine APIs with AI processing'
    ]
  }
];

export const interactiveLessonFeatures = {
  aiAssistant: {
    personality: 'friendly',
    expertise: ['coding', 'automation', 'AI'],
    responseStyle: 'conversational',
    features: [
      'Real-time code suggestions',
      'Error detection and fixes',
      'Best practice recommendations',
      'Alternative approaches'
    ]
  },
  
  collaboration: {
    maxCollaborators: 5,
    features: [
      'Real-time cursor sharing',
      'Voice chat',
      'Screen sharing',
      'Code comments'
    ]
  },
  
  gamification: {
    achievements: [
      { id: 'first-edit', name: 'Code Explorer', icon: '🔍' },
      { id: 'ai-chat', name: 'AI Conversationalist', icon: '🤖' },
      { id: 'branch-master', name: 'Branch Master', icon: '🌳' },
      { id: 'helper', name: 'Community Helper', icon: '🤝' }
    ]
  }
};