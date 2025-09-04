"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, Terminal, Zap, GitBranch, Database, Cloud, Lock, Workflow, ChevronRight, Download, Github, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

interface TechModule {
  time: string
  title: string
  tech: string[]
  hands_on: string[]
  deliverables: string[]
}

const modules: TechModule[] = [
  {
    time: "09:00 - 10:30",
    title: "AI API Integration & Arkitektur",
    tech: ["OpenAI API", "Anthropic Claude", "Google Vertex AI", "Azure OpenAI"],
    hands_on: [
      "Opsæt API keys og miljøvariabler",
      "Implementer retry logic og error handling",
      "Byg abstraktion layer for model switching"
    ],
    deliverables: ["API Client Library", "Error Handling Patterns", "Rate Limiting Implementation"]
  },
  {
    time: "10:45 - 12:00",
    title: "Prompt Engineering for Developers",
    tech: ["Langchain", "LlamaIndex", "Semantic Kernel"],
    hands_on: [
      "Strukturerede prompts med JSON schemas",
      "Chain-of-thought reasoning",
      "Few-shot og zero-shot learning patterns"
    ],
    deliverables: ["Prompt Template Library", "Testing Framework", "Performance Benchmarks"]
  },
  {
    time: "13:00 - 14:30",
    title: "RAG & Vector Databases",
    tech: ["Pinecone", "Weaviate", "Chroma", "pgvector"],
    hands_on: [
      "Implementer document chunking strategier",
      "Byg semantic search med embeddings",
      "Optimér retrieval performance"
    ],
    deliverables: ["RAG Pipeline", "Embedding Strategy Guide", "Search Optimization Toolkit"]
  },
  {
    time: "14:45 - 16:00",
    title: "Production Deployment & Monitoring",
    tech: ["Docker", "Kubernetes", "Prometheus", "Grafana"],
    hands_on: [
      "Containerize AI applications",
      "Implementer health checks og monitoring",
      "Setup A/B testing for prompts"
    ],
    deliverables: ["Deployment Scripts", "Monitoring Dashboard", "CI/CD Pipeline"]
  },
  {
    time: "16:15 - 17:30",
    title: "Security & Compliance",
    tech: ["OAuth 2.0", "JWT", "Vault", "GDPR Tools"],
    hands_on: [
      "Implementer secure API authentication",
      "Data anonymization og PII handling",
      "Audit logging og compliance tracking"
    ],
    deliverables: ["Security Checklist", "GDPR Compliance Code", "Audit System"]
  }
]

const techStack = [
  {
    category: "Languages & Frameworks",
    items: ["Python", "TypeScript", "Node.js", "FastAPI", "Next.js", "React"]
  },
  {
    category: "AI/ML Libraries",
    items: ["Langchain", "Transformers", "TensorFlow", "PyTorch", "scikit-learn"]
  },
  {
    category: "Infrastructure",
    items: ["Docker", "Kubernetes", "AWS/Azure/GCP", "Terraform", "GitHub Actions"]
  },
  {
    category: "Databases & Storage",
    items: ["PostgreSQL", "MongoDB", "Redis", "S3", "Vector DBs"]
  }
]

const codeExamples = [
  {
    title: "Resilient API Client",
    description: "Production-ready client med retry og error handling",
    language: "typescript",
    loc: 150
  },
  {
    title: "RAG Pipeline",
    description: "Komplet retrieval-augmented generation system",
    language: "python",
    loc: 300
  },
  {
    title: "Prompt Testing Suite",
    description: "Automated testing af prompt variations",
    language: "python",
    loc: 200
  },
  {
    title: "Monitoring Dashboard",
    description: "Real-time metrics og performance tracking",
    language: "typescript",
    loc: 250
  }
]

export function VibecodingWorkshopMaterials() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge className="bg-purple-100 text-purple-700">VibeCoding Workshop</Badge>
        <h1 className="text-4xl font-bold">AI Engineering for Developers</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Intensiv teknisk workshop for udviklere - byg production-ready AI features 
          med moderne værktøjer og best practices
        </p>
      </div>

      {/* Key Features */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { icon: Code2, title: "100% Hands-on", value: "Skriv kode hele dagen" },
          { icon: Terminal, title: "CLI & APIs", value: "Developer-first approach" },
          { icon: Zap, title: "Production Ready", value: "Deploy samme dag" },
          { icon: GitBranch, title: "Open Source", value: "Alt kode på GitHub" }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-purple-200 hover:border-purple-400 transition-colors">
              <CardContent className="pt-6 text-center">
                <feature.icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{feature.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Workshop Agenda */}
      <Card>
        <CardHeader>
          <CardTitle>Workshop Program</CardTitle>
          <CardDescription>
            8 timer intensiv kodning med AI APIs, vector databases, og production deployment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-3 pb-6 border-b last:border-0"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{module.title}</h3>
                  <Badge variant="outline" className="mt-1">{module.time}</Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Tech Stack:</p>
                  <div className="flex flex-wrap gap-1">
                    {module.tech.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Hands-on:</p>
                  <ul className="text-sm space-y-1">
                    {module.hands_on.map((item, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <ChevronRight className="w-3 h-3 mt-0.5 text-purple-600 flex-shrink-0" />
                        <span className="text-xs">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Du får:</p>
                  <ul className="text-sm space-y-1">
                    {module.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <Code2 className="w-3 h-3 mt-0.5 text-green-600 flex-shrink-0" />
                        <span className="text-xs">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Tech Stack Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Teknologier Vi Arbejder Med</CardTitle>
          <CardDescription>
            Modern tech stack for AI-powered applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((category, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold text-sm text-purple-600">{category.category}</h4>
                <div className="space-y-1">
                  {category.items.map((item, i) => (
                    <div key={i} className="text-sm text-muted-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Production-Ready Code Templates</CardTitle>
          <CardDescription>
            Fuldt funktionelle eksempler du kan bruge med det samme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {codeExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-4 hover:border-purple-400 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{example.title}</h4>
                    <p className="text-sm text-muted-foreground">{example.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="outline" className="text-xs">
                    {example.language}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    ~{example.loc} lines
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Developer Tools */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Terminal className="w-5 h-5 text-purple-600" />
              Developer Toolkit
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">CLI Tools</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• AI Model Testing CLI</li>
                  <li>• Prompt Optimization Tool</li>
                  <li>• Performance Profiler</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Libraries</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Custom AI Client SDK</li>
                  <li>• Monitoring Integrations</li>
                  <li>• Testing Frameworks</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Templates</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Docker Compose Setup</li>
                  <li>• CI/CD Pipelines</li>
                  <li>• Terraform Modules</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prerequisites */}
      <Card>
        <CardHeader>
          <CardTitle>Forudsætninger</CardTitle>
          <CardDescription>
            Hvad du skal have klar inden workshoppen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Technical Skills</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-start gap-2">
                  <Code2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Erfaring med Python eller TypeScript</span>
                </li>
                <li className="flex items-start gap-2">
                  <Database className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Grundlæggende database-kendskab</span>
                </li>
                <li className="flex items-start gap-2">
                  <GitBranch className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Git version control</span>
                </li>
                <li className="flex items-start gap-2">
                  <Cloud className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Basic cloud services (AWS/Azure/GCP)</span>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Setup Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-start gap-2">
                  <Terminal className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Docker Desktop installeret</span>
                </li>
                <li className="flex items-start gap-2">
                  <Code2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>VS Code eller preferred IDE</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>API keys (OpenAI/Anthropic)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Github className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>GitHub account</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700">
          <Github className="w-4 h-4" />
          Access GitHub Repository
        </Button>
        <Button size="lg" variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Download Setup Guide
        </Button>
        <Button size="lg" variant="outline" className="gap-2">
          <BookOpen className="w-4 h-4" />
          Pre-Workshop Materials
        </Button>
      </div>
    </div>
  )
}