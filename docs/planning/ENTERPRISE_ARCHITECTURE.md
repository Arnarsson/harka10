# HARKA Enterprise Architecture

## Multi-Tenant System Design

### Core Architecture Principles
- **Isolation**: Complete data separation between tenants
- **Scalability**: Support 1-10,000+ users per tenant
- **Customization**: White-label capabilities
- **Performance**: Sub-second response times
- **Security**: SOC2, GDPR, ISO 27001 compliant

## Database Architecture

### Tenant Isolation Strategy
```sql
-- Shared database, separate schemas
CREATE SCHEMA IF NOT EXISTS tenant_${tenant_id};

-- Base tables with tenant_id
CREATE TABLE organizations (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  name VARCHAR(255),
  domain VARCHAR(255) UNIQUE,
  settings JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON courses
  USING (tenant_id = current_setting('app.current_tenant')::uuid);
```

### Data Models
```typescript
// Organization model
interface Organization {
  id: string
  name: string
  domain: string
  plan: 'starter' | 'growth' | 'enterprise'
  users: {
    limit: number
    active: number
  }
  features: {
    sso: boolean
    customBranding: boolean
    apiAccess: boolean
    advancedAnalytics: boolean
    customAI: boolean
  }
  branding: {
    logo: string
    primaryColor: string
    secondaryColor: string
    favicon: string
  }
}

// Tenant context
interface TenantContext {
  id: string
  organization: Organization
  user: User
  permissions: Permission[]
  settings: TenantSettings
}
```

## API Architecture

### Multi-Tenant API Gateway
```typescript
// Middleware for tenant resolution
export async function tenantMiddleware(req: Request) {
  const tenant = await resolveTenant(req)
  
  if (!tenant) {
    throw new Error('Tenant not found')
  }
  
  // Set tenant context
  req.context = {
    tenantId: tenant.id,
    organization: tenant.organization,
    limits: tenant.limits
  }
  
  // Set database context
  await db.setTenantContext(tenant.id)
}

// Tenant resolution strategies
async function resolveTenant(req: Request) {
  // 1. Subdomain
  const subdomain = getSubdomain(req.hostname)
  if (subdomain) {
    return await getTenantBySubdomain(subdomain)
  }
  
  // 2. Custom domain
  const customDomain = await getCustomDomain(req.hostname)
  if (customDomain) {
    return customDomain.tenant
  }
  
  // 3. API key
  const apiKey = req.headers['x-api-key']
  if (apiKey) {
    return await getTenantByApiKey(apiKey)
  }
  
  // 4. JWT claim
  const token = req.headers.authorization
  if (token) {
    const claims = verifyJWT(token)
    return await getTenantById(claims.tenantId)
  }
}
```

## Infrastructure Components

### 1. Load Balancer Configuration
```yaml
# HAProxy configuration for multi-tenant routing
frontend web
  bind *:443 ssl crt /etc/ssl/certs/
  
  # Route by subdomain
  acl tenant_subdomain hdr_beg(host) -i tenant1.harka.ai
  use_backend tenant1_backend if tenant_subdomain
  
  # Route by custom domain
  acl custom_domain hdr(host) -i training.company.com
  use_backend tenant_custom if custom_domain
  
  # Default backend
  default_backend main_app

backend main_app
  balance roundrobin
  server app1 10.0.1.1:3000 check
  server app2 10.0.1.2:3000 check
```

### 2. Caching Strategy
```typescript
// Redis-based multi-tenant cache
class TenantCache {
  private redis: Redis
  
  async get(tenantId: string, key: string) {
    return await this.redis.get(`tenant:${tenantId}:${key}`)
  }
  
  async set(tenantId: string, key: string, value: any, ttl?: number) {
    const tenantKey = `tenant:${tenantId}:${key}`
    
    // Check tenant limits
    const usage = await this.getTenantCacheUsage(tenantId)
    if (usage > TENANT_CACHE_LIMIT) {
      await this.evictOldestKeys(tenantId)
    }
    
    return await this.redis.set(tenantKey, value, ttl)
  }
  
  async invalidateTenant(tenantId: string) {
    const keys = await this.redis.keys(`tenant:${tenantId}:*`)
    if (keys.length) {
      await this.redis.del(...keys)
    }
  }
}
```

### 3. Queue System
```typescript
// Multi-tenant job queue
interface TenantJob {
  id: string
  tenantId: string
  type: string
  payload: any
  priority: number
  attempts: number
  createdAt: Date
}

class TenantQueue {
  async enqueue(job: TenantJob) {
    // Check tenant limits
    const queueSize = await this.getTenantQueueSize(job.tenantId)
    const limit = await this.getTenantQueueLimit(job.tenantId)
    
    if (queueSize >= limit) {
      throw new Error('Queue limit exceeded')
    }
    
    // Add to priority queue
    await this.queue.add(job.type, job, {
      priority: job.priority,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000
      }
    })
  }
  
  async process(jobType: string, handler: Function) {
    this.queue.process(jobType, async (job) => {
      // Set tenant context
      await setTenantContext(job.data.tenantId)
      
      // Process with rate limiting
      await this.rateLimiter.check(job.data.tenantId)
      
      return handler(job)
    })
  }
}
```

## Security Architecture

### 1. Authentication & SSO
```typescript
// Multi-provider SSO support
class EnterpriseAuth {
  providers = {
    saml: new SAMLProvider(),
    oidc: new OIDCProvider(),
    ldap: new LDAPProvider()
  }
  
  async authenticate(tenantId: string, credentials: any) {
    const tenant = await getTenant(tenantId)
    const ssoConfig = tenant.ssoConfig
    
    if (ssoConfig.enabled) {
      const provider = this.providers[ssoConfig.type]
      return await provider.authenticate(ssoConfig, credentials)
    }
    
    // Fall back to standard auth
    return await standardAuth(credentials)
  }
}
```

### 2. Data Encryption
```typescript
// Tenant-specific encryption
class TenantEncryption {
  async encrypt(tenantId: string, data: any) {
    const key = await this.getTenantKey(tenantId)
    return crypto.encrypt(data, key)
  }
  
  async decrypt(tenantId: string, encryptedData: string) {
    const key = await this.getTenantKey(tenantId)
    return crypto.decrypt(encryptedData, key)
  }
  
  private async getTenantKey(tenantId: string) {
    // Retrieve from secure key management service
    return await kms.getKey(`tenant-${tenantId}`)
  }
}
```

## Scaling Strategies

### 1. Horizontal Scaling
```yaml
# Kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: harka-app
spec:
  replicas: 10
  strategy:
    type: RollingUpdate
  template:
    spec:
      containers:
      - name: app
        image: harka/app:latest
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        env:
        - name: TENANT_MODE
          value: "multi"
```

### 2. Database Sharding
```typescript
// Shard by tenant size
class TenantSharding {
  getShardForTenant(tenantId: string, tenantSize: number) {
    if (tenantSize > 1000) {
      // Large tenants get dedicated shard
      return `shard_dedicated_${tenantId}`
    } else if (tenantSize > 100) {
      // Medium tenants share shards
      return `shard_medium_${hashTenant(tenantId) % 10}`
    } else {
      // Small tenants on shared shards
      return `shard_small_${hashTenant(tenantId) % 50}`
    }
  }
}
```

## Monitoring & Analytics

### 1. Tenant Metrics
```typescript
// Prometheus metrics
const tenantMetrics = {
  activeUsers: new Gauge({
    name: 'tenant_active_users',
    help: 'Active users per tenant',
    labelNames: ['tenant_id', 'plan']
  }),
  
  apiRequests: new Counter({
    name: 'tenant_api_requests_total',
    help: 'API requests per tenant',
    labelNames: ['tenant_id', 'endpoint', 'status']
  }),
  
  storageUsage: new Gauge({
    name: 'tenant_storage_bytes',
    help: 'Storage usage per tenant',
    labelNames: ['tenant_id']
  })
}
```

### 2. Tenant Dashboard
```typescript
// Real-time tenant analytics
interface TenantAnalytics {
  tenantId: string
  metrics: {
    activeUsers: number
    totalUsers: number
    coursesCompleted: number
    averageProgress: number
    apiUsage: {
      requests: number
      quota: number
    }
    storage: {
      used: number
      limit: number
    }
  }
  health: {
    status: 'healthy' | 'warning' | 'critical'
    issues: string[]
  }
}
```

## Migration Strategy

### Onboarding Large Enterprises
```typescript
// Enterprise migration workflow
class EnterpriseMigration {
  async migrate(source: DataSource, tenant: Tenant) {
    // 1. Validate data
    const validation = await this.validateSource(source)
    if (!validation.valid) {
      throw new Error(validation.errors)
    }
    
    // 2. Create tenant
    await this.createTenant(tenant)
    
    // 3. Import users
    await this.importUsers(source.users, tenant.id)
    
    // 4. Import content
    await this.importContent(source.courses, tenant.id)
    
    // 5. Set up SSO
    await this.configureSSOO(tenant.ssoConfig)
    
    // 6. Verify migration
    await this.verifyMigration(tenant.id)
  }
}
```

## Cost Optimization

### Resource Allocation
```typescript
// Dynamic resource allocation based on tenant plan
const resourceLimits = {
  starter: {
    cpu: '100m',
    memory: '256Mi',
    storage: '10Gi',
    bandwidth: '100GB'
  },
  growth: {
    cpu: '500m',
    memory: '1Gi',
    storage: '100Gi',
    bandwidth: '1TB'
  },
  enterprise: {
    cpu: '2000m',
    memory: '4Gi',
    storage: '1Ti',
    bandwidth: 'unlimited'
  }
}
```

---

This enterprise architecture supports massive scale while maintaining security, performance, and customization for each tenant.