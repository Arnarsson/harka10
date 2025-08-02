'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  BrainCircuit, 
  Send, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  MessageSquare,
  Sparkles,
  Code,
  BookOpen,
  Lightbulb
} from 'lucide-react';
import { useLanguage } from '@/lib/language';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language?: 'en' | 'da';
  context?: string;
}

export default function AIAssistantPage() {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: language === 'da' 
        ? '👋 Hej! Jeg er din AI-læringssassistent. Jeg kan hjælpe dig med kursusmateriale, besvare spørgsmål og give kodeksempler. Hvad vil du gerne lære om i dag?'
        : '👋 Hi! I\'m your AI learning assistant. I can help you with course material, answer questions, and provide coding examples. What would you like to learn about today?',
      timestamp: new Date(),
      language,
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = language === 'da' ? [
    'Forklar neurale netværk',
    'Vis mig Python eksempler',
    'Quiz mig om AI-koncepter',
    'Bedste praksis for prompt engineering',
    'Hjælp med machine learning'
  ] : [
    'Explain neural networks',
    'Show me Python examples', 
    'Quiz me on AI concepts',
    'Best practices for prompt engineering',
    'Help with machine learning'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (language === 'da') {
      if (lowerMessage.includes('neural') || lowerMessage.includes('netværk')) {
        return `🧠 **Neurale Netværk Forklaring**

Neurale netværk er inspireret af den menneskelige hjerne og består af forbundne noder (neuroner) organiseret i lag:

**Arkitektur:**
- **Input lag**: Modtager data
- **Skjulte lag**: Behandler information
- **Output lag**: Producerer resultater

**Grundlæggende kode eksempel:**
\`\`\`python
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu', input_shape=(784,)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
\`\`\`

**Anvendelser:**
- Billedgenkendelse
- Naturlig sprogbehandling
- Forudsigelser og klassificering

Vil du vide mere om specifikke typer af neurale netværk?`;
      }
      
      if (lowerMessage.includes('python') || lowerMessage.includes('kod') || lowerMessage.includes('eksempel')) {
        return `🐍 **Python AI Eksempler**

Her er nogle praktiske eksempler til at komme i gang:

**1. Data Preprocessing:**
\`\`\`python
import pandas as pd
from sklearn.preprocessing import StandardScaler

# Indlæs data
data = pd.read_csv('dataset.csv')

# Standardiser features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
\`\`\`

**2. Simpel Machine Learning:**
\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Træn model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Forudsig
predictions = model.predict(X_test)
\`\`\`

Hvilken type AI-programmeringer vil du gerne lære mere om?`;
      }
      
      return `Tak for dit spørgsmål! Jeg forstår du spørger om "${userMessage}". 

Som din AI-læringssassistent kan jeg hjælpe med:
- Forklaringer af AI-koncepter
- Kodeksempler og programmeringsspørgsmål  
- Kursusmateriale og opgaver
- Bedste praksis og tips

Kan du være mere specifik om hvad du gerne vil lære? 🤔`;
    } else {
      // English responses
      if (lowerMessage.includes('neural') || lowerMessage.includes('network')) {
        return `🧠 **Neural Networks Explained**

Neural networks are inspired by the human brain and consist of interconnected nodes (neurons) organized in layers:

**Architecture:**
- **Input layer**: Receives data
- **Hidden layers**: Process information  
- **Output layer**: Produces results

**Basic code example:**
\`\`\`python
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu', input_shape=(784,)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
\`\`\`

**Applications:**
- Image recognition
- Natural language processing
- Predictions and classification

Would you like to know more about specific types of neural networks?`;
      }
      
      if (lowerMessage.includes('python') || lowerMessage.includes('code') || lowerMessage.includes('example')) {
        return `🐍 **Python AI Examples**

Here are some practical examples to get you started:

**1. Data Preprocessing:**
\`\`\`python
import pandas as pd
from sklearn.preprocessing import StandardScaler

# Load data
data = pd.read_csv('dataset.csv')

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
\`\`\`

**2. Simple Machine Learning:**
\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Predict
predictions = model.predict(X_test)
\`\`\`

What type of AI programming would you like to learn more about?`;
      }
      
      return `Thanks for your question! I understand you're asking about "${userMessage}".

As your AI learning assistant, I can help with:
- Explanations of AI concepts
- Code examples and programming questions
- Course material and assignments  
- Best practices and tips

Could you be more specific about what you'd like to learn? 🤔`;
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      language
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateResponse(inputValue),
        timestamp: new Date(),
        language
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    const parts = content.split(/(\`\`\`[\s\S]*?\`\`\`|\*\*.*?\*\*)/);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.slice(3, -3);
        return (
          <div key={index} className="bg-gray-900 text-gray-100 p-4 rounded-lg my-2 relative group">
            <pre className="text-sm overflow-x-auto"><code>{code}</code></pre>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => copyToClipboard(code)}
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        );
      } else if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Learning Assistant</h1>
            <p className="text-gray-600">
              {language === 'da' 
                ? 'Din personlige AI-guide til at mestre kunstig intelligens'
                : 'Your personal AI guide to mastering artificial intelligence'
              }
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">
                  {language === 'da' ? 'Samtaler i dag' : 'Conversations Today'}
                </span>
              </div>
              <p className="text-2xl font-bold mt-1">12</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">
                  {language === 'da' ? 'Kodeksempler' : 'Code Examples'}
                </span>
              </div>
              <p className="text-2xl font-bold mt-1">8</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium">
                  {language === 'da' ? 'Hjælpsomme tips' : 'Helpful Tips'}
                </span>
              </div>
              <p className="text-2xl font-bold mt-1">24</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            {language === 'da' ? 'AI Chat Assistent' : 'AI Chat Assistant'}
          </CardTitle>
          <CardDescription>
            {language === 'da' 
              ? 'Stil spørgsmål og få øjeblikkelig hjælp med dit AI-læringsforløb'
              : 'Ask questions and get instant help with your AI learning journey'
            }
          </CardDescription>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="prose prose-sm max-w-none">
                  {formatMessage(message.content)}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                  {message.type === 'assistant' && (
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard(message.content)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input Area */}
        <div className="p-4 border-t">
          {/* Quick Suggestions */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              {language === 'da' ? 'Hurtige forslag:' : 'Quick suggestions:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                language === 'da' 
                  ? 'Stil et spørgsmål om AI, machine learning, eller coding...'
                  : 'Ask a question about AI, machine learning, or coding...'
              }
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!inputValue.trim() || isLoading}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}