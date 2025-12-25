# Web Analytics & Metrics Implementation Plan (FINAL - Vercel + Workers + DO Buffer)

## Overview
Implement a robust, resilient analytics solution:
- **Self-hosted Umami** on Raspberry Pi for ALL analytics (pageviews, likes, custom events)
- **Cloudflare Workers** as intelligent proxy layer
- **Durable Objects** for event buffering when Pi is unavailable
- **Unified event structure** with deduplication and retry logic
- **Zero direct exposure** of Raspberry Pi to public internet
- **100% free** long-term solution

---

## Architecture (RESILIENT PROXY PATTERN)

### Critical Requirements Addressed:
1. ✅ **Vercel hosting** - Site hosted on Vercel (NOT Cloudflare Pages)
2. ✅ **Unified events** - All events (pageviews, likes, views) use same structure
3. ✅ **Buffering** - Events buffered in Durable Objects when Pi is down
4. ✅ **Retry with alarms** - Periodic retry + flush on enqueue
5. ✅ **Deduplication** - UUID per event prevents duplicates
6. ✅ **Header forwarding** - Exact headers forwarded for timestamp accuracy
7. ✅ **No direct tunnel access** - Workers proxy everything
8. ✅ **Umami custom events** - Likes stored as Umami custom events

### Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Browser (Vercel Site)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Umami Script │  │ Like Button  │  │ View Counter │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          │                  │                  │
          └──────────────────┴──────────────────┘
                             │
                             ▼
          ┌────────────────────────────────────────────┐
          │       Cloudflare Workers (Proxy)           │
          │  - Route: analytics.yashagarwal.in/api/*   │
          │  - Validates & enriches events             │
          │  - Adds UUID for deduplication             │
          │  - Forwards exact headers                  │
          └─────────┬─────────────────┬────────────────┘
                    │                 │
         (try)      │                 │ (catch - Pi down)
                    ▼                 ▼
    ┌──────────────────────┐   ┌─────────────────────────┐
    │   Raspberry Pi       │   │  Durable Objects        │
    │   Umami API          │   │  (Event Buffer)         │
    │   via Tunnel         │   │  - Stores failed events │
    │                      │   │  - Retry with alarm     │
    │   POST /api/send     │   │  - Flush on enqueue     │
    └──────────────────────┘   │  - Deduplicate by UUID  │
                               └──────────┬──────────────┘
                                          │
                    ┌─────────────────────┘
                    │ (periodic retry via alarm)
                    ▼
        ┌──────────────────────┐
        │   Raspberry Pi       │
        │   Umami API          │
        │   (retry delivery)   │
        └──────────────────────┘
```

### 1. Infrastructure Components

#### Vercel (Existing)
- **Static site hosting** - Current setup on Vercel
- No changes needed to Vercel configuration
- Astro site with Cloudflare adapter (prevents build failures, not used for hosting)

#### Cloudflare (Edge Layer)
- **Domain Management** - `yashagarwal.in` managed on Cloudflare
- **Cloudflare Workers** - Proxy for all analytics events
  - Deployed at: `analytics.yashagarwal.in`
  - Routes: `/api/send` (Umami events), `/api/query` (read data)
- **Durable Objects** - Event buffer and retry orchestration
  - One DO instance per "region" or global singleton
  - Alarm-based retry every 30 seconds
  - Configurable buffer retention (default: 24 hours)
- **Workers KV** (optional) - Cache for view counts

#### Raspberry Pi (Private)
- **Umami Analytics** - Receives ALL events (pageviews, likes, custom events)
- **PostgreSQL** - Stores all analytics data
- **Cloudflare Tunnel** - Private tunnel (only accessible to Workers)
  - Internal endpoint: `https://tunnel-internal.uuid.cfargotunnel.com`
  - NOT exposed to public internet
  - Workers authenticate via tunnel token

### 2. Simplified Proxy Event Structure

**CRITICAL DESIGN**: We don't transform or flatten Umami payloads - we proxy them exactly as received, just adding metadata for deduplication and retry.

```typescript
interface ProxyEvent {
  // Proxy metadata
  event_id: string          // UUID v4 for deduplication
  event_type: 'umami_pageview' | 'umami_event'  // Umami event types
  received_at: number       // When proxy received it (Unix ms)

  // Original Umami payload (forwarded unchanged)
  payload: UmamiPayload     // Exact request body from client

  // Client metadata (from request headers, not payload)
  client_ip: string         // From CF headers (CF-Connecting-IP)
  user_agent: string        // From User-Agent header
}

// Umami's native payload structure (we don't modify this)
interface UmamiPayload {
  website: string           // Umami website ID
  url?: string              // Page URL
  hostname?: string         // Domain
  language?: string         // Browser language
  referrer?: string         // Referrer
  screen?: string           // Screen resolution
  title?: string            // Page title

  // For custom events (likes, etc.)
  name?: string             // Event name ('like', 'unlike', etc.)
  data?: Record<string, any>  // Event properties
}
```

**Example - Pageview:**
```json
{
  "event_id": "550e8400-e29b-41d4-a716-446655440000",
  "event_type": "umami_pageview",
  "received_at": 1703001234567,
  "payload": {
    "website": "abc123",
    "url": "/notes/my-post",
    "hostname": "yashagarwal.in",
    "language": "en-US",
    "referrer": "",
    "screen": "1920x1080",
    "title": "My Post Title"
  },
  "client_ip": "1.2.3.4",
  "user_agent": "Mozilla/5.0..."
}
```

**Example - Like Event:**
```json
{
  "event_id": "660e8400-e29b-41d4-a716-446655440001",
  "event_type": "umami_event",
  "received_at": 1703001234890,
  "payload": {
    "website": "abc123",
    "url": "/notes/my-post",
    "hostname": "yashagarwal.in",
    "name": "like",
    "data": {
      "slug": "my-post",
      "action": "like"
    }
  },
  "client_ip": "1.2.3.4",
  "user_agent": "Mozilla/5.0..."
}
```

### 3. How Workers Forward to Umami

The Worker simply forwards the `payload` to Umami's `/api/send` endpoint, adding IP and User-Agent from headers:

```typescript
// In Worker
async function forwardToUmami(proxyEvent: ProxyEvent, env: Env) {
  const response = await fetch(`${env.UMAMI_TUNNEL_URL}/api/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': proxyEvent.user_agent,
      'X-Forwarded-For': proxyEvent.client_ip,
    },
    body: JSON.stringify(proxyEvent.payload)  // Forward unchanged
  })

  return response
}
```

**No transformation needed** - Umami receives exactly what the client sent.

**Umami Custom Events Documentation:**
- [Track Events](https://docs.umami.is/docs/track-events)
- [Events API](https://docs.umami.is/docs/api/events)
- [Event Data Properties](https://umami.is/docs/event-data)

---

## Implementation Details

### 1. Raspberry Pi Setup

#### A. Install Umami
```bash
git clone https://github.com/umami-software/umami.git
cd umami
npm install
npm run build

# Configure .env
DATABASE_URL=postgresql://user:pass@localhost:5432/umami

# Run migrations
npm run db:migrate

# Start with PM2
npm install -g pm2
pm2 start npm --name "umami" -- start
pm2 save
pm2 startup
```

#### B. Configure Cloudflare Tunnel (Private)
```bash
# Create tunnel
cloudflared tunnel create umami-private

# Edit ~/.cloudflared/config.yml
```

**~/.cloudflared/config.yml:**
```yaml
tunnel: <TUNNEL_ID>
credentials-file: /home/pi/.cloudflared/<TUNNEL_ID>.json

# IMPORTANT: NO PUBLIC DNS - internal only
ingress:
  - service: http://localhost:3000
```

```bash
# Run tunnel
pm2 start cloudflared --name "tunnel" -- tunnel run umami-private
pm2 save
```

**Tunnel Access:**
- Internal endpoint: `https://<TUNNEL_ID>.cfargotunnel.com`
- NOT publicly accessible
- Only accessible to Cloudflare Workers with tunnel token

#### C. Umami Configuration
1. Access locally: `http://localhost:3000`
2. Create website for `yashagarwal.in`
3. Note the `website_id`
4. Enable API access

---

### 2. Cloudflare Workers (Proxy Layer)

Deploy at subdomain: `analytics.yashagarwal.in`

#### Worker Structure
```
workers/
├── analytics-proxy/
│   ├── index.ts          # Main worker entry point
│   ├── durable-objects/
│   │   └── event-buffer.ts   # DO for buffering
│   ├── utils/
│   │   ├── umami.ts      # Umami API client
│   │   ├── dedup.ts      # UUID generation & dedup
│   │   └── headers.ts    # Header forwarding logic
│   └── wrangler.toml     # Worker configuration
```

#### wrangler.toml
```toml
name = "analytics-proxy"
main = "index.ts"
compatibility_date = "2024-01-01"

# Routes
routes = [
  { pattern = "analytics.yashagarwal.in/*", zone_name = "yashagarwal.in" }
]

# Durable Objects
[[durable_objects.bindings]]
name = "EVENT_BUFFER"
class_name = "EventBuffer"
script_name = "analytics-proxy"

# KV for caching view counts
[[kv_namespaces]]
binding = "CACHE"
id = "YOUR_KV_ID"

# Environment variables (set via CLI or dashboard)
[vars]
UMAMI_TUNNEL_URL = "https://<TUNNEL_ID>.cfargotunnel.com"
UMAMI_WEBSITE_ID = "your-website-id"
BUFFER_MAX_AGE_HOURS = "24"
BUFFER_MAX_AGE_EXTENDED_HOURS = "168"  # 7 days
```

---

### 4. Client-side Implementation

**IMPORTANT**: Since the site is on **Vercel** (NOT Cloudflare Pages), all requests go directly to Cloudflare Workers at `analytics.yashagarwal.in`. No Cloudflare Pages Functions needed.

#### A. Umami Script (Modified to use Workers proxy)
Add to `BaseLayout.astro`:

```astro
<!-- Umami Analytics - Already optimized, no need for extra lazy loading -->
<script
  defer
  src="https://analytics.yashagarwal.in/script.js"
  data-website-id="YOUR_UMAMI_WEBSITE_ID"
></script>
```

**Note:** Umami's script is tiny (~2KB) and already uses `defer`. No need for complex lazy-loading - it won't block rendering.

#### 4.2 Alpine.js Components (SECURITY-HARDENED)

**CRITICAL:** Move Alpine component logic to `/src/alpine-plugins.ts` to prevent XSS vulnerabilities.

Add to `src/alpine-plugins.ts`:

```typescript
import type { Alpine } from 'alpinejs'
import tooltip from '@ryangjchandler/alpine-tooltip'
import collapse from '@alpinejs/collapse'

export default (Alpine: Alpine) => {
  Alpine.plugin(tooltip)
  Alpine.plugin(collapse)

  // View Counter Component
  Alpine.data('viewCounter', (slug: string) => ({
    views: null as number | null,
    loading: true,

    async init() {
      const observer = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting) {
            await this.fetchViews()
            observer.disconnect()
          }
        },
        { rootMargin: '100px' }
      )
      observer.observe(this.$el)
    },

    async fetchViews() {
      try {
        const response = await fetch(`/api/views/${encodeURIComponent(slug)}`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        this.views = data.views || 0
      } catch (error) {
        console.error('Failed to load views:', error)
        this.views = null
      } finally {
        this.loading = false
      }
    }
  }))

  // Like Button Component
  Alpine.data('likeButton', (slug: string) => ({
    likes: 0,
    hasLiked: false,
    loading: true,
    submitting: false,

    async init() {
      // Check localStorage for optimistic UI
      const stored = localStorage.getItem('liked_posts')
      if (stored) {
        try {
          const likedPosts = JSON.parse(stored)
          this.hasLiked = Array.isArray(likedPosts) && likedPosts.includes(slug)
        } catch (e) {
          localStorage.removeItem('liked_posts')
        }
      }

      await this.fetchLikes()
    },

    async fetchLikes() {
      try {
        const response = await fetch(`/api/likes/${encodeURIComponent(slug)}`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        this.likes = data.likes || 0
      } catch (error) {
        console.error('Failed to load likes:', error)
      } finally {
        this.loading = false
      }
    },

    async toggleLike() {
      if (this.submitting) return

      this.submitting = true
      const wasLiked = this.hasLiked
      const previousLikes = this.likes

      // Optimistic update
      this.hasLiked = !this.hasLiked
      this.likes += this.hasLiked ? 1 : -1

      try {
        const response = await fetch(`/api/likes/${encodeURIComponent(slug)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: this.hasLiked ? 'like' : 'unlike' })
        })

        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const data = await response.json()
        this.likes = data.likes || 0

        // Update localStorage
        const stored = localStorage.getItem('liked_posts') || '[]'
        let likedPosts = JSON.parse(stored)
        if (!Array.isArray(likedPosts)) likedPosts = []

        if (this.hasLiked) {
          if (!likedPosts.includes(slug)) likedPosts.push(slug)
        } else {
          likedPosts = likedPosts.filter((s: string) => s !== slug)
        }
        localStorage.setItem('liked_posts', JSON.stringify(likedPosts))

      } catch (error) {
        // Revert on error
        this.hasLiked = wasLiked
        this.likes = previousLikes
        console.error('Failed to update like:', error)
        alert('Failed to update like. Please try again.')
      } finally {
        this.submitting = false
      }
    }
  }))
}
```

#### 4.3 View Count Component
Create `src/components/content/ViewCount.astro`:

```astro
---
interface Props {
  slug: string;
  class?: string;
}
const { slug, class: className } = Astro.props;
---

<div x-data={`viewCounter('${slug}')`} class={className}>
  <span x-show="loading" class="text-muted-foreground text-sm">
    <span class="inline-block animate-pulse">···</span>
  </span>
  <span x-show="!loading && views !== null" class="text-muted-foreground text-sm">
    <span x-text="views?.toLocaleString()"></span> views
  </span>
</div>
```

#### 4.4 Like Button Component
Create `src/components/content/LikeButton.astro`:

```astro
---
interface Props {
  slug: string;
  class?: string;
}
const { slug, class: className } = Astro.props;
---

<div x-data={`likeButton('${slug}')`} class={className}>
  <button
    @click="toggleLike"
    :disabled="submitting"
    class="flex items-center gap-2 rounded-lg border border-border px-4 py-2 transition-all hover:border-primary hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="{ 'border-primary bg-primary/10': hasLiked }"
  >
    <!-- Heart icon (filled when liked) -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      :fill="hasLiked ? 'currentColor' : 'none'"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="transition-all"
      :class="{ 'text-red-500': hasLiked, 'scale-110': submitting }"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>

    <span x-text="likes" class="font-medium"></span>
    <span x-show="loading" class="text-xs animate-pulse">···</span>
  </button>
</div>
```

### 5. Cloudflare Workers Implementation

This section details the complete Cloudflare Workers proxy implementation with Durable Objects buffering, exponential backoff retry, and deduplication.

#### 5.1 Project Structure

```
workers/analytics-proxy/
├── src/
│   ├── index.ts                    # Main Worker entry point
│   ├── types.ts                    # TypeScript interfaces
│   ├── durable-objects/
│   │   └── EventBuffer.ts          # DO for buffering with alarms
│   └── utils/
│       ├── umami.ts               # Umami API client
│       ├── dedup.ts               # UUID generation & deduplication
│       └── headers.ts             # Header extraction & forwarding
└── wrangler.toml                   # Worker configuration
```

#### 5.2 TypeScript Interfaces (`src/types.ts`)

```typescript
// src/types.ts

/**
 * Proxy event wrapper that preserves Umami payload unchanged
 */
export interface ProxyEvent {
  // Proxy metadata
  event_id: string          // UUID v4 for deduplication
  event_type: 'umami_pageview' | 'umami_event'
  received_at: number       // When proxy received it (Unix ms)

  // Original Umami payload (forwarded unchanged)
  payload: UmamiPayload

  // Client metadata (from request headers, not payload)
  client_ip: string         // From CF headers (CF-Connecting-IP)
  user_agent: string        // From User-Agent header
}

/**
 * Umami's native payload structure (we don't modify this)
 */
export interface UmamiPayload {
  website: string           // Umami website ID
  url?: string              // Page URL
  hostname?: string         // Domain
  language?: string         // Browser language
  referrer?: string         // Referrer
  screen?: string           // Screen resolution
  title?: string            // Page title

  // For custom events (likes, etc.)
  name?: string             // Event name ('like', 'unlike', etc.)
  data?: Record<string, any>  // Event properties
}

/**
 * Buffered event with retry metadata
 */
export interface BufferedEvent extends ProxyEvent {
  retry_count: number
  next_retry_at: number     // Unix ms
  buffered_at: number       // Unix ms
}

/**
 * Worker environment bindings
 */
export interface Env {
  // Durable Object binding
  EVENT_BUFFER: DurableObjectNamespace

  // KV for caching view counts
  CACHE: KVNamespace

  // Environment variables
  UMAMI_TUNNEL_URL: string
  UMAMI_WEBSITE_ID: string
  BUFFER_MAX_AGE_HOURS: string
  BUFFER_MAX_AGE_EXTENDED_HOURS: string
}

/**
 * Retry configuration
 */
export interface RetryConfig {
  intervals: number[]       // Retry intervals in ms [30s, 5m, 15m]
  maxRetries: number
}
```

#### 5.3 Main Worker (`src/index.ts`)

```typescript
// src/index.ts
import { Env, ProxyEvent, UmamiPayload } from './types'
import { generateEventId, isValidUUID } from './utils/dedup'
import { extractClientInfo } from './utils/headers'
import { forwardToUmami } from './utils/umami'
import { EventBuffer } from './durable-objects/EventBuffer'

export { EventBuffer }

/**
 * Main Worker entry point
 */
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return handleCORS()
    }

    // Route: /api/send - Umami event proxy
    if (url.pathname === '/api/send' && request.method === 'POST') {
      return handleEventProxy(request, env, ctx)
    }

    // Route: /api/query/* - Query view counts (fallback to KV cache)
    if (url.pathname.startsWith('/api/query/')) {
      return handleQuery(request, env)
    }

    // Route: /script.js - Serve Umami tracking script
    if (url.pathname === '/script.js') {
      return handleScript(request, env)
    }

    return new Response('Not Found', { status: 404 })
  }
}

/**
 * Handle CORS preflight
 */
function handleCORS(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, User-Agent',
      'Access-Control-Max-Age': '86400',
    }
  })
}

/**
 * Handle event proxy - main analytics logic
 */
async function handleEventProxy(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  try {
    // Parse Umami payload
    const payload: UmamiPayload = await request.json()

    // Validate payload
    if (!payload.website || payload.website !== env.UMAMI_WEBSITE_ID) {
      return new Response('Invalid website ID', { status: 400 })
    }

    // Extract client info from headers
    const { clientIp, userAgent } = extractClientInfo(request)

    // Determine event type
    const eventType = payload.name ? 'umami_event' : 'umami_pageview'

    // Create ProxyEvent wrapper
    const proxyEvent: ProxyEvent = {
      event_id: generateEventId(),
      event_type: eventType,
      received_at: Date.now(),
      payload,
      client_ip: clientIp,
      user_agent: userAgent,
    }

    // Try to forward to Umami directly
    try {
      const response = await forwardToUmami(proxyEvent, env)

      if (response.ok) {
        // Success - update KV cache if it's a pageview
        if (eventType === 'umami_pageview' && payload.url) {
          ctx.waitUntil(updateViewCountCache(payload.url, env))
        }

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        })
      }

      // Umami returned error - buffer the event
      throw new Error(`Umami error: ${response.status}`)

    } catch (error) {
      // Pi is down or unreachable - buffer in DO
      console.log(`Buffering event ${proxyEvent.event_id}: ${error}`)

      const doId = env.EVENT_BUFFER.idFromName('global')
      const doStub = env.EVENT_BUFFER.get(doId)

      await doStub.fetch('https://buffer.local/buffer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proxyEvent)
      })

      return new Response(JSON.stringify({ success: true, buffered: true }), {
        status: 202,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      })
    }

  } catch (error) {
    console.error('Error handling event:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

/**
 * Handle query requests - fallback to KV cache when Pi is down
 */
async function handleQuery(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const pathParts = url.pathname.split('/')
  const slug = pathParts[pathParts.length - 1]

  try {
    // Try to query Umami directly
    const umamiUrl = `${env.UMAMI_TUNNEL_URL}/api/websites/${env.UMAMI_WEBSITE_ID}/stats?` +
      new URLSearchParams({
        startAt: String(Date.now() - 365 * 24 * 60 * 60 * 1000),
        endAt: String(Date.now()),
        url: `/notes/${slug}`
      })

    const response = await fetch(umamiUrl, {
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(5000) // 5s timeout
    })

    if (response.ok) {
      const data = await response.json()
      const views = data.pageviews?.value || 0

      // Update cache
      await env.CACHE.put(`views:${slug}`, String(views), {
        expirationTtl: 300 // 5 minutes
      })

      return new Response(JSON.stringify({ views }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60',
          'Access-Control-Allow-Origin': '*',
        }
      })
    }

    throw new Error(`Umami query failed: ${response.status}`)

  } catch (error) {
    // Fallback to KV cache
    const cached = await env.CACHE.get(`views:${slug}`)
    const views = cached ? parseInt(cached) : 0

    return new Response(JSON.stringify({ views, stale: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'Access-Control-Allow-Origin': '*',
      }
    })
  }
}

/**
 * Serve Umami tracking script (proxy from Pi or serve cached version)
 */
async function handleScript(request: Request, env: Env): Promise<Response> {
  try {
    const response = await fetch(`${env.UMAMI_TUNNEL_URL}/script.js`, {
      signal: AbortSignal.timeout(5000)
    })

    if (response.ok) {
      return new Response(response.body, {
        headers: {
          'Content-Type': 'application/javascript',
          'Cache-Control': 'public, max-age=86400', // 24 hours
        }
      })
    }

    throw new Error('Failed to fetch script')

  } catch (error) {
    // Return minimal tracking script fallback
    const fallbackScript = `
      (function(){
        window.umami = {
          track: function(name, data) {
            fetch('/api/send', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                website: '${env.UMAMI_WEBSITE_ID}',
                url: location.pathname,
                hostname: location.hostname,
                name: name,
                data: data
              })
            });
          }
        };
      })();
    `

    return new Response(fallbackScript, {
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=300',
      }
    })
  }
}

/**
 * Update view count cache in KV
 */
async function updateViewCountCache(url: string, env: Env): Promise<void> {
  const slug = url.split('/').pop()
  if (!slug) return

  try {
    const cached = await env.CACHE.get(`views:${slug}`)
    const currentViews = cached ? parseInt(cached) : 0
    await env.CACHE.put(`views:${slug}`, String(currentViews + 1), {
      expirationTtl: 300 // 5 minutes
    })
  } catch (error) {
    console.error('Failed to update cache:', error)
  }
}
```

#### 5.4 Durable Object (`src/durable-objects/EventBuffer.ts`)

```typescript
// src/durable-objects/EventBuffer.ts
import { ProxyEvent, BufferedEvent, Env, RetryConfig } from '../types'
import { forwardToUmami } from '../utils/umami'

/**
 * Retry configuration - exponential backoff
 */
const RETRY_CONFIG: RetryConfig = {
  intervals: [
    30 * 1000,      // 30 seconds
    5 * 60 * 1000,  // 5 minutes
    15 * 60 * 1000, // 15 minutes
  ],
  maxRetries: 3
}

/**
 * Durable Object for event buffering with alarm-based retry
 */
export class EventBuffer {
  private state: DurableObjectState
  private env: Env

  constructor(state: DurableObjectState, env: Env) {
    this.state = state
    this.env = env
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    // Route: POST /buffer - Add event to buffer
    if (url.pathname === '/buffer' && request.method === 'POST') {
      return this.bufferEvent(request)
    }

    // Route: POST /flush - Manual flush trigger
    if (url.pathname === '/flush' && request.method === 'POST') {
      await this.flushBuffer()
      return new Response('Flushed', { status: 200 })
    }

    // Route: GET /stats - Get buffer stats
    if (url.pathname === '/stats' && request.method === 'GET') {
      return this.getStats()
    }

    return new Response('Not Found', { status: 404 })
  }

  /**
   * Buffer a new event
   */
  private async bufferEvent(request: Request): Promise<Response> {
    try {
      const proxyEvent: ProxyEvent = await request.json()

      // Check for duplicates
      const existing = await this.state.storage.get<BufferedEvent>(proxyEvent.event_id)
      if (existing) {
        return new Response('Duplicate event', { status: 200 })
      }

      // Create buffered event
      const bufferedEvent: BufferedEvent = {
        ...proxyEvent,
        retry_count: 0,
        next_retry_at: Date.now() + RETRY_CONFIG.intervals[0],
        buffered_at: Date.now()
      }

      // Store in DO storage
      await this.state.storage.put(proxyEvent.event_id, bufferedEvent)

      // Try immediate flush
      this.state.waitUntil(this.flushBuffer())

      // Ensure alarm is set for retry
      await this.ensureAlarm()

      return new Response('Buffered', { status: 202 })

    } catch (error) {
      console.error('Error buffering event:', error)
      return new Response('Error', { status: 500 })
    }
  }

  /**
   * Flush buffer - attempt to deliver all events
   */
  private async flushBuffer(): Promise<void> {
    const events = await this.state.storage.list<BufferedEvent>()
    const now = Date.now()

    const deliveryPromises: Promise<void>[] = []

    for (const [eventId, bufferedEvent] of events) {
      // Skip if not ready for retry yet
      if (bufferedEvent.next_retry_at > now) {
        continue
      }

      deliveryPromises.push(this.deliverEvent(eventId, bufferedEvent))
    }

    await Promise.allSettled(deliveryPromises)

    // Update alarm for remaining events
    await this.ensureAlarm()
  }

  /**
   * Attempt to deliver a single event
   */
  private async deliverEvent(eventId: string, bufferedEvent: BufferedEvent): Promise<void> {
    try {
      const response = await forwardToUmami(bufferedEvent, this.env)

      if (response.ok) {
        // Success - remove from buffer
        await this.state.storage.delete(eventId)
        console.log(`Delivered buffered event ${eventId}`)
        return
      }

      // Delivery failed - increment retry
      throw new Error(`Delivery failed: ${response.status}`)

    } catch (error) {
      // Increment retry count
      const newRetryCount = bufferedEvent.retry_count + 1

      if (newRetryCount >= RETRY_CONFIG.maxRetries) {
        // Max retries exceeded - check age
        const age = Date.now() - bufferedEvent.buffered_at
        const maxAge = this.getMaxBufferAge()

        if (age > maxAge) {
          // Too old - delete
          await this.state.storage.delete(eventId)
          console.log(`Dropped event ${eventId} - max age exceeded`)
        } else {
          // Keep trying with max interval
          const updatedEvent: BufferedEvent = {
            ...bufferedEvent,
            retry_count: newRetryCount,
            next_retry_at: Date.now() + RETRY_CONFIG.intervals[RETRY_CONFIG.intervals.length - 1]
          }
          await this.state.storage.put(eventId, updatedEvent)
        }
      } else {
        // Schedule next retry with exponential backoff
        const interval = RETRY_CONFIG.intervals[newRetryCount] || RETRY_CONFIG.intervals[RETRY_CONFIG.intervals.length - 1]
        const updatedEvent: BufferedEvent = {
          ...bufferedEvent,
          retry_count: newRetryCount,
          next_retry_at: Date.now() + interval
        }
        await this.state.storage.put(eventId, updatedEvent)
        console.log(`Retry ${newRetryCount} scheduled for event ${eventId} in ${interval}ms`)
      }
    }
  }

  /**
   * Get max buffer age based on current buffer size
   * Dynamic retention: 24h → 7 days
   */
  private getMaxBufferAge(): number {
    const events = this.state.storage.list()
    const eventCount = events ? Array.from(events).length : 0

    // If buffer is growing, extend retention
    if (eventCount > 100) {
      return parseInt(this.env.BUFFER_MAX_AGE_EXTENDED_HOURS) * 60 * 60 * 1000
    }

    return parseInt(this.env.BUFFER_MAX_AGE_HOURS) * 60 * 60 * 1000
  }

  /**
   * Ensure alarm is set for next retry
   */
  private async ensureAlarm(): Promise<void> {
    const events = await this.state.storage.list<BufferedEvent>()
    let nextRetryAt = Infinity

    for (const [_, bufferedEvent] of events) {
      if (bufferedEvent.next_retry_at < nextRetryAt) {
        nextRetryAt = bufferedEvent.next_retry_at
      }
    }

    if (nextRetryAt === Infinity) {
      // No events - clear alarm
      await this.state.storage.deleteAlarm()
    } else {
      // Set alarm for next retry
      await this.state.storage.setAlarm(nextRetryAt)
    }
  }

  /**
   * Alarm handler - triggered by DO alarm system
   */
  async alarm(): Promise<void> {
    console.log('Alarm triggered - flushing buffer')
    await this.flushBuffer()
  }

  /**
   * Get buffer statistics
   */
  private async getStats(): Promise<Response> {
    const events = await this.state.storage.list<BufferedEvent>()
    const eventArray = Array.from(events.values())

    const stats = {
      total_events: eventArray.length,
      by_retry_count: {} as Record<number, number>,
      oldest_event: eventArray.length > 0
        ? Math.min(...eventArray.map(e => e.buffered_at))
        : null,
      next_retry: eventArray.length > 0
        ? Math.min(...eventArray.map(e => e.next_retry_at))
        : null
    }

    eventArray.forEach(event => {
      stats.by_retry_count[event.retry_count] = (stats.by_retry_count[event.retry_count] || 0) + 1
    })

    return new Response(JSON.stringify(stats, null, 2), {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
```

#### 5.5 UUID & Deduplication (`src/utils/dedup.ts`)

```typescript
// src/utils/dedup.ts

/**
 * Generate UUID v4 for event deduplication
 */
export function generateEventId(): string {
  return crypto.randomUUID()
}

/**
 * Validate UUID format
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}
```

#### 5.6 Header Extraction (`src/utils/headers.ts`)

```typescript
// src/utils/headers.ts

/**
 * Extract client information from request headers
 */
export function extractClientInfo(request: Request): {
  clientIp: string
  userAgent: string
} {
  // Cloudflare provides CF-Connecting-IP header
  const clientIp = request.headers.get('CF-Connecting-IP') ||
                   request.headers.get('X-Forwarded-For')?.split(',')[0] ||
                   '0.0.0.0'

  const userAgent = request.headers.get('User-Agent') || 'Unknown'

  return { clientIp, userAgent }
}
```

#### 5.7 Umami API Client (`src/utils/umami.ts`)

```typescript
// src/utils/umami.ts
import { ProxyEvent, Env } from '../types'

/**
 * Forward ProxyEvent to Umami API
 * Preserves exact headers for timestamp accuracy
 */
export async function forwardToUmami(
  proxyEvent: ProxyEvent,
  env: Env
): Promise<Response> {
  return fetch(`${env.UMAMI_TUNNEL_URL}/api/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': proxyEvent.user_agent,
      'X-Forwarded-For': proxyEvent.client_ip,
    },
    body: JSON.stringify(proxyEvent.payload),  // Forward unchanged
    signal: AbortSignal.timeout(10000) // 10s timeout
  })
}
```

#### 5.8 Worker Configuration (`wrangler.toml`)

```toml
name = "analytics-proxy"
main = "src/index.ts"
compatibility_date = "2024-01-01"
node_compat = true

# Routes
routes = [
  { pattern = "analytics.yashagarwal.in/*", zone_name = "yashagarwal.in" }
]

# Durable Objects
[[durable_objects.bindings]]
name = "EVENT_BUFFER"
class_name = "EventBuffer"
script_name = "analytics-proxy"

[[migrations]]
tag = "v1"
new_classes = ["EventBuffer"]

# KV for caching view counts
[[kv_namespaces]]
binding = "CACHE"
id = "YOUR_KV_NAMESPACE_ID"  # Replace with actual KV ID
preview_id = "YOUR_KV_PREVIEW_ID"

# Environment variables
[vars]
UMAMI_WEBSITE_ID = "your-website-id"  # Replace with actual Umami website ID
BUFFER_MAX_AGE_HOURS = "24"
BUFFER_MAX_AGE_EXTENDED_HOURS = "168"  # 7 days

# Secrets (set via CLI or dashboard)
# UMAMI_TUNNEL_URL = "https://<TUNNEL_ID>.cfargotunnel.com"
```

#### 5.9 Deployment Commands

```bash
# Create KV namespace
npx wrangler kv:namespace create "CACHE"
npx wrangler kv:namespace create "CACHE" --preview

# Update wrangler.toml with KV IDs from output

# Set secrets
npx wrangler secret put UMAMI_TUNNEL_URL
# Enter: https://<TUNNEL_ID>.cfargotunnel.com

# Deploy Worker
npx wrangler deploy

# Test deployment
curl https://analytics.yashagarwal.in/api/send \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "website": "your-website-id",
    "url": "/test",
    "hostname": "yashagarwal.in",
    "language": "en-US"
  }'

# Check buffer stats
curl https://analytics.yashagarwal.in/api/stats
```

#### 5.10 Testing the Worker

**Test 1: Normal Event Delivery (Pi Up)**
```bash
# Send pageview event
curl -X POST https://analytics.yashagarwal.in/api/send \
  -H "Content-Type: application/json" \
  -d '{
    "website": "your-website-id",
    "url": "/notes/test-post",
    "hostname": "yashagarwal.in",
    "language": "en-US",
    "referrer": "",
    "screen": "1920x1080",
    "title": "Test Post"
  }'

# Expected: 200 OK, event delivered to Umami immediately
```

**Test 2: Buffering (Pi Down)**
```bash
# Simulate Pi down - send event while Pi is unreachable
curl -X POST https://analytics.yashagarwal.in/api/send \
  -H "Content-Type: application/json" \
  -d '{
    "website": "your-website-id",
    "url": "/notes/test-post",
    "hostname": "yashagarwal.in",
    "name": "like",
    "data": { "slug": "test-post", "action": "like" }
  }'

# Expected: 202 Accepted, event buffered in DO
# Check buffer stats:
curl https://analytics.yashagarwal.in/api/stats
```

**Test 3: Retry Logic**
```bash
# After Pi comes back up, DO alarm will trigger flush
# Check Cloudflare Durable Objects logs to see retry attempts

# Manual flush:
curl -X POST https://analytics.yashagarwal.in/flush

# Check stats again - buffer should be empty
curl https://analytics.yashagarwal.in/api/stats
```

**Test 4: View Count Query**
```bash
# Query view count (should try Umami first, fallback to KV)
curl https://analytics.yashagarwal.in/api/query/views/test-post

# Expected: {"views": 1} or {"views": 1, "stale": true}
```

#### 5.11 Monitoring & Debugging

**Cloudflare Dashboard:**
- **Workers > analytics-proxy > Logs** - View request logs
- **Durable Objects > EventBuffer** - Monitor DO instances
- **KV > CACHE** - Inspect cached view counts

**View Buffer Stats:**
```bash
curl https://analytics.yashagarwal.in/api/stats
```

**Expected Output:**
```json
{
  "total_events": 5,
  "by_retry_count": {
    "0": 2,
    "1": 2,
    "2": 1
  },
  "oldest_event": 1703001234567,
  "next_retry": 1703001534567
}
```

**Common Issues:**

1. **Events not delivering to Umami**
   - Check `UMAMI_TUNNEL_URL` is correct
   - Verify tunnel is running: `cloudflared tunnel info <TUNNEL_ID>`
   - Check Umami logs on Pi

2. **Events stuck in buffer**
   - Check DO alarm is firing: `wrangler tail` and watch for "Alarm triggered"
   - Verify retry intervals in code
   - Check Pi is reachable from Workers

3. **Duplicate events**
   - Verify UUID generation is working
   - Check DO deduplication logic
   - Umami may have its own deduplication

4. **KV cache not updating**
   - Check KV namespace binding in wrangler.toml
   - Verify cache TTL settings
   - Test direct KV writes

---

## Frontend Integration

**IMPORTANT:** The site is hosted on **Vercel** (NOT Cloudflare Pages). All API requests go directly to the Cloudflare Workers at `analytics.yashagarwal.in` (detailed in section 5 above).

No backend code is needed in the Astro site - it's purely frontend integration with Alpine.js components that communicate with the Workers proxy.

### 6. Integration into BlogLayout

Update `src/layouts/BlogLayout.astro` to include metrics:

```astro
<!-- After the title/metadata section (around line 224) -->
<div class="flex items-center gap-4 text-sm">
  <ViewCount slug={slug} />

  <!-- Separator -->
  <span class="text-muted-foreground">•</span>

  <!-- Like button inline -->
  <LikeButton slug={slug} />
</div>
```

### 7. Performance Optimizations

#### Non-blocking Loading Strategy
1. **Umami script:** Lazy load using `requestIdleCallback`
2. **View counts:** Lazy load when near viewport (`IntersectionObserver`)
3. **Like buttons:** Optimistic UI with localStorage
4. **API responses:** Cached with CDN (5-minute cache for views)
5. **Error handling:** Graceful degradation - if analytics fail, site still works

#### Caching Strategy
- **View counts:** 5-minute CDN cache
- **Like counts:** Real-time (no cache)
- **Umami dashboard:** Only accessible via private tunnel

---

## Implementation Steps

### Phase 1: Raspberry Pi Setup
1. **Install PostgreSQL**
   ```bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo -u postgres createdb umami
   ```

2. **Install Umami**
   ```bash
   git clone https://github.com/umami-software/umami.git
   cd umami
   npm install
   npm run build
   ```

3. **Configure Umami**
   - Edit `.env` with PostgreSQL connection
   - Run migrations: `npm run db:migrate`
   - Start: `npm start` (or use PM2 for production)

4. **Set up Cloudflare Tunnel**
   ```bash
   cloudflared tunnel create analytics-tunnel
   cloudflared tunnel route dns analytics-tunnel analytics.yashagarwal.in
   # Create config file: ~/.cloudflared/config.yml
   cloudflared tunnel run analytics-tunnel
   ```

### Phase 2: Cloudflare Workers Setup (Already detailed in Section 5)
See Section 5 above for complete Worker implementation with Durable Objects and KV cache.

### Phase 3: Frontend Implementation
1. **Update Alpine plugins** (`src/alpine-plugins.ts`)
   - Add `viewCounter` data function
   - Add `likeButton` data function

2. **Create Components**
   - Create `src/components/content/ViewCount.astro`
   - Create `src/components/content/LikeButton.astro`

3. **Update Layouts**
   - Add Umami script to `src/layouts/BaseLayout.astro`
   - Add ViewCount and LikeButton to `src/layouts/BlogLayout.astro`

### Phase 4: Testing & Deployment
1. **Local Testing (Astro Site)**
   ```bash
   npm run dev
   # Test that components load without errors
   # Note: Like/view functionality requires deployed Workers
   ```

2. **Deploy Cloudflare Workers** (Already covered in Section 5.9)
   ```bash
   cd workers/analytics-proxy
   npx wrangler deploy
   ```

3. **Deploy to Vercel**
   ```bash
   # Vercel deployment (already set up via Git integration)
   git push origin main  # Auto-deploys to Vercel
   ```

4. **Verify Production**
   - Verify Umami receiving analytics events
   - Test Workers proxy endpoints (Section 5.10)
   - Test like/unlike functionality on live site
   - Check Durable Objects buffer stats
   - Monitor Workers logs in Cloudflare dashboard

---

## Files to Modify/Create

### New Files (Priority Order)

#### Cloudflare Workers (New Project)
1. **`workers/analytics-proxy/wrangler.toml`** - Worker configuration with DO and KV bindings
2. **`workers/analytics-proxy/src/types.ts`** - TypeScript interfaces
3. **`workers/analytics-proxy/src/index.ts`** - Main Worker proxy logic
4. **`workers/analytics-proxy/src/durable-objects/EventBuffer.ts`** - DO for buffering with alarms
5. **`workers/analytics-proxy/src/utils/umami.ts`** - Umami API client
6. **`workers/analytics-proxy/src/utils/dedup.ts`** - UUID generation
7. **`workers/analytics-proxy/src/utils/headers.ts`** - Header extraction

#### Astro Site (Existing Project)
1. **`src/components/content/ViewCount.astro`** - View count UI component
2. **`src/components/content/LikeButton.astro`** - Like button UI component

### Modified Files
1. **`src/alpine-plugins.ts`** - Add viewCounter and likeButton components
2. **`src/layouts/BlogLayout.astro`** - Integrate ViewCount and LikeButton (around line 224)
3. **`src/layouts/BaseLayout.astro`** - Add Umami tracking script

### Raspberry Pi Files
- `~/.cloudflared/config.yml` - Cloudflare Tunnel config
- Umami `.env` file - Database connection
- Systemd service for Umami (optional)

---

## Security Considerations

1. **Session-based tracking:** Uses browser session ID, no personal data stored
2. **Rate limiting:** Implement on API endpoints to prevent spam
3. **CORS:** Configure properly for Cloudflare Workers
4. **Cloudflare Tunnel:** Only expose specific ports, no direct internet access to Pi
5. **Umami dashboard:** Password-protected, only accessible via tunnel
6. **Database:** Firewall rules to only accept connections from localhost + Cloudflare IPs

---

## Cost Analysis (CORRECTED)

| Service | Free Tier | Expected Usage | Monthly Cost |
|---------|-----------|----------------|--------------|
| Vercel | Hobby tier: unlimited bandwidth, 100GB/mo | ~50K requests, <10GB | $0 |
| Cloudflare Workers | 100K requests/day | ~5K requests/day | $0 |
| Cloudflare Durable Objects | 1M requests/mo, 1GB storage | ~10K requests/mo, <100MB | $0 |
| Cloudflare KV | 100K reads/day, 1K writes/day | ~1K reads/day, ~100 writes/day | $0 |
| Cloudflare Tunnel | Unlimited | 1 tunnel | $0 |
| Raspberry Pi Electricity | - | ~3W idle, 5W peak | ~$0.50 |
| PostgreSQL | Self-hosted | Umami only | $0 |
| Umami | Open source | Self-hosted | $0 |

**Total ongoing cost: ~$0.50/month** (electricity only)

All services stay within free tiers for typical blog traffic (< 10K visitors/month).

---

## Detailed File Contents

### Integration in `BlogLayout.astro` (after line 223)
```astro
{/* Add after readingTime section, before headerImage */}
<div class="flex items-center gap-3 text-sm mt-2">
  <ViewCount slug={slug} />
  <span class="text-muted-foreground">•</span>
  <LikeButton slug={slug} />
</div>
```

### Umami Script in `BaseLayout.astro` (before closing `</head>`)
```astro
<!-- Umami Analytics -->
<script
  defer
  src="https://analytics.yashagarwal.in/script.js"
  data-website-id="YOUR_UMAMI_WEBSITE_ID"
></script>
```

---

## Future Enhancements

1. **Multiple reaction types:** 👍 ❤️ 🎉 🤔 (beyond just likes) - Store as different Umami custom event types
2. **Trending posts:** Sort by recent view/like velocity using Umami events API
3. **Popular posts widget:** Show most liked/viewed posts on homepage from Umami stats
4. **Geographic analytics:** View distribution by country (via Umami dashboard)
5. **Real-time dashboard:** Live view counts on Umami
6. **Export data:** Download analytics as CSV from Umami export feature
7. **A/B testing:** Test like button placement and style, track via Umami custom events
8. **Aggregate statistics:** Total likes across all posts on homepage from Umami events API
