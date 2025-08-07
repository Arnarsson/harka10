# HARKA Global Localization Strategy

## 10+ Language Expansion Plan

### Target Markets & Languages

#### Phase 1: Core Markets (Q1 2025)
1. **🇩🇰 Danish** (Native) - Already implemented
2. **🇬🇧 English** - Primary international
3. **🇩🇪 German** - DACH region
4. **🇪🇸 Spanish** - Spain + LATAM
5. **🇫🇷 French** - France + Africa

#### Phase 2: Growth Markets (Q2 2025)
6. **🇵🇹 Portuguese** - Brazil + Portugal
7. **🇯🇵 Japanese** - High-tech market
8. **🇨🇳 Chinese (Simplified)** - Mainland China
9. **🇦🇪 Arabic** - MENA region
10. **🇮🇳 Hindi** - India market

#### Phase 3: Expansion (Q3-Q4 2025)
11. **🇰🇷 Korean** - South Korea
12. **🇷🇺 Russian** - CIS countries
13. **🇮🇹 Italian** - Italy
14. **🇳🇱 Dutch** - Netherlands/Belgium
15. **🇵🇱 Polish** - Poland

## Technical Implementation

### 1. Internationalization Architecture
```typescript
// next-intl configuration
export const i18nConfig = {
  locales: ['da', 'en', 'de', 'es', 'fr', 'pt', 'ja', 'zh', 'ar', 'hi'],
  defaultLocale: 'da',
  domains: [
    { domain: 'harka.dk', defaultLocale: 'da' },
    { domain: 'harka.ai', defaultLocale: 'en' },
    { domain: 'harka.de', defaultLocale: 'de' },
    { domain: 'harka.es', defaultLocale: 'es' },
    { domain: 'harka.jp', defaultLocale: 'ja' }
  ]
}

// Locale detection strategy
export function detectLocale(req: Request): string {
  // 1. Check subdomain (da.harka.ai)
  const subdomain = getSubdomain(req.url)
  if (i18nConfig.locales.includes(subdomain)) {
    return subdomain
  }
  
  // 2. Check domain
  const domain = getDomain(req.url)
  const domainConfig = i18nConfig.domains.find(d => d.domain === domain)
  if (domainConfig) {
    return domainConfig.defaultLocale
  }
  
  // 3. Check user preference
  const userLocale = getUserPreference(req)
  if (userLocale) {
    return userLocale
  }
  
  // 4. Check Accept-Language header
  const browserLocale = detectBrowserLocale(req.headers)
  if (browserLocale) {
    return browserLocale
  }
  
  // 5. Geo-location fallback
  const geoLocale = await detectGeoLocale(req.ip)
  return geoLocale || i18nConfig.defaultLocale
}
```

### 2. AI-Powered Translation Pipeline
```typescript
// Automated translation workflow
class TranslationPipeline {
  private ai: AITranslator
  private reviewQueue: ReviewQueue
  
  async translateContent(content: Content, targetLocales: string[]) {
    const translations = new Map()
    
    for (const locale of targetLocales) {
      // Step 1: AI Translation
      const aiTranslation = await this.ai.translate({
        content,
        sourceLocale: content.locale,
        targetLocale: locale,
        context: content.metadata,
        glossary: await this.getGlossary(locale)
      })
      
      // Step 2: Quality checks
      const quality = await this.checkQuality(aiTranslation)
      
      if (quality.score < 0.95) {
        // Step 3: Human review needed
        await this.reviewQueue.add({
          content: aiTranslation,
          locale,
          priority: quality.issues
        })
      }
      
      translations.set(locale, aiTranslation)
    }
    
    return translations
  }
  
  async checkQuality(translation: Translation) {
    return {
      score: await this.ai.evaluateTranslation(translation),
      issues: await this.detectIssues(translation),
      culturalCheck: await this.checkCulturalAppropriateness(translation)
    }
  }
}
```

### 3. Content Management System
```typescript
// Multi-language CMS
interface LocalizedContent {
  id: string
  type: 'course' | 'lesson' | 'quiz' | 'article'
  translations: {
    [locale: string]: {
      title: string
      description: string
      content: any
      metadata: {
        translator: string
        reviewedBy?: string
        translatedAt: Date
        lastUpdated: Date
        quality: number
      }
    }
  }
  masterLocale: string
  syncStatus: {
    [locale: string]: 'synced' | 'outdated' | 'missing'
  }
}

// Sync management
class ContentSync {
  async updateMasterContent(contentId: string, updates: any) {
    const content = await this.getContent(contentId)
    
    // Update master
    content.translations[content.masterLocale] = updates
    
    // Mark other locales as outdated
    for (const locale of Object.keys(content.translations)) {
      if (locale !== content.masterLocale) {
        content.syncStatus[locale] = 'outdated'
        
        // Trigger retranslation
        await this.queueRetranslation(contentId, locale)
      }
    }
  }
}
```

### 4. Locale-Specific Features
```typescript
// Regional customization
const localeFeatures = {
  'zh': {
    payment: ['alipay', 'wechat'],
    social: ['wechat', 'weibo'],
    cdn: 'china-optimized',
    search: 'baidu-integration'
  },
  'ja': {
    payment: ['paypay', 'rakuten'],
    social: ['line'],
    design: 'compact-ui',
    certificates: 'vertical-layout'
  },
  'ar': {
    direction: 'rtl',
    calendar: 'hijri',
    fonts: 'arabic-optimized',
    culturalAdaptations: true
  },
  'de': {
    privacy: 'gdpr-strict',
    dataLocation: 'eu-only',
    legalDocs: 'german-compliant'
  }
}
```

## Cultural Adaptation

### 1. Content Localization Guidelines
```yaml
localization_rules:
  general:
    - Avoid idioms and cultural references
    - Use neutral imagery
    - Respect local customs
    - Consider reading direction
  
  specific:
    china:
      - Remove references to blocked services
      - Use local examples
      - Adapt to local regulations
    
    middle_east:
      - Gender-appropriate imagery
      - Respect religious sensitivities
      - Friday-Saturday weekend
    
    japan:
      - Formal language options
      - Respect hierarchies
      - Local business practices
```

### 2. UI/UX Adaptations
```typescript
// Locale-specific UI components
const LocaleAdaptiveUI = {
  // Date/Time formatting
  dateFormat: {
    'en': 'MM/DD/YYYY',
    'da': 'DD-MM-YYYY',
    'ja': 'YYYY年MM月DD日',
    'ar': 'DD/MM/YYYY'
  },
  
  // Number formatting
  numberFormat: {
    'en': { decimal: '.', thousand: ',' },
    'da': { decimal: ',', thousand: '.' },
    'fr': { decimal: ',', thousand: ' ' }
  },
  
  // Currency display
  currency: {
    'en': 'USD',
    'da': 'DKK',
    'de': 'EUR',
    'ja': 'JPY',
    'in': 'INR'
  }
}
```

## Implementation Roadmap

### Phase 1: Foundation (Month 1)
- [ ] Set up next-intl infrastructure
- [ ] Create translation management system
- [ ] Implement locale detection
- [ ] Build review workflow

### Phase 2: Initial Languages (Months 2-3)
- [ ] Launch English version
- [ ] Launch German version
- [ ] Launch Spanish version
- [ ] Set up regional CDNs

### Phase 3: Expansion (Months 4-6)
- [ ] Add 5 more languages
- [ ] Implement cultural adaptations
- [ ] Launch regional domains
- [ ] Local payment methods

## Quality Assurance

### 1. Translation Quality Metrics
```typescript
interface TranslationMetrics {
  accuracy: number      // AI evaluation score
  fluency: number      // Readability score
  consistency: number  // Terminology consistency
  cultural: number     // Cultural appropriateness
  technical: number    // Technical accuracy
}

// Automated quality checks
class QualityAssurance {
  async validateTranslation(translation: Translation): Promise<ValidationResult> {
    const checks = await Promise.all([
      this.checkGrammar(translation),
      this.checkTerminology(translation),
      this.checkFormatting(translation),
      this.checkLinks(translation),
      this.checkVariables(translation)
    ])
    
    return {
      passed: checks.every(c => c.passed),
      issues: checks.filter(c => !c.passed)
    }
  }
}
```

### 2. A/B Testing for Locales
```typescript
// Test different translations
class LocaleABTesting {
  async runTest(contentId: string, locale: string) {
    const variants = await this.getTranslationVariants(contentId, locale)
    
    return {
      control: variants[0],
      variations: variants.slice(1),
      metrics: ['engagement', 'completion', 'satisfaction'],
      duration: '2 weeks',
      sampleSize: 1000
    }
  }
}
```

## Cost Optimization

### 1. Smart Caching
```typescript
// Edge caching for translations
const cacheStrategy = {
  static: {
    // UI strings, menus
    ttl: 86400, // 24 hours
    scope: 'global'
  },
  content: {
    // Course content
    ttl: 3600, // 1 hour
    scope: 'regional'
  },
  dynamic: {
    // User-specific
    ttl: 300, // 5 minutes
    scope: 'user'
  }
}
```

### 2. Progressive Loading
```typescript
// Load translations on demand
class ProgressiveLocaleLoader {
  async loadLocale(locale: string, route: string) {
    // Load core translations first
    const core = await import(`/locales/${locale}/core.json`)
    
    // Load route-specific translations
    const routeTranslations = await import(`/locales/${locale}/${route}.json`)
    
    // Lazy load additional features
    if (userNeeds.includes('admin')) {
      await import(`/locales/${locale}/admin.json`)
    }
    
    return mergeTranslations(core, routeTranslations)
  }
}
```

## Success Metrics

### KPIs by Locale
```typescript
const localeKPIs = {
  adoption: {
    target: '10% of country internet users',
    measure: 'monthly active users'
  },
  engagement: {
    target: '80% course completion',
    measure: 'by locale'
  },
  satisfaction: {
    target: 'NPS > 70',
    measure: 'per locale'
  },
  revenue: {
    target: '$1M ARR per major locale',
    measure: 'locale-specific revenue'
  }
}
```

---

This localization strategy enables HARKA to serve millions globally while maintaining quality and cultural relevance.