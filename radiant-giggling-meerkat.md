# Next.js to Astro Migration Plan

## Executive Summary

Migrate yashagarwal.in from Next.js 16 to Astro for improved performance, simplified codebase, and better maintainability. The migration will use git worktrees for parallel development, maintain all existing features, reduce dependencies by ~65%, and deploy to Cloudflare Pages.

**Expected Benefits:**
- 50%+ faster page loads
- 70% smaller JavaScript bundle
- 60% fewer dependencies (117→40 packages)
- Simplified developer experience
- 95+ Lighthouse scores

## Phase 0: Git Worktree Setup

### Create Worktree Environment
```bash
# From main repository
cd /Users/yash/code/yashagarwal.in
git worktree add ../yashagarwal.in-astro -b astro
```

**Result:** Two directories for parallel development:
- `/Users/yash/code/yashagarwal.in/` - Next.js (stable, stays on main)
- `/Users/yash/code/yashagarwal.in-astro/` - Astro migration

### Branch Strategy
- `main` - Current Next.js (production until migration complete)
- `astro` - Astro development branch
- When ready to switch: `main` → `nextjs-archive`, `astro` → `main`

## Phase 1: Initial Astro Setup

### 1.1 Initialize Astro Project
```bash
cd /Users/yash/code/yashagarwal.in-astro
bun create astro@latest . --template minimal --typescript strict
```

### 1.2 Install Core Dependencies
```bash
bun add -D \
  @astrojs/mdx \
  @astrojs/react \
  @astrojs/sitemap \
  @astrojs/tailwind \
  tailwindcss@next \
  @tailwindcss/typography \
  tailwindcss-animate
```

### 1.3 Install MDX Plugins (Preserve Pipeline)
```bash
bun add -D \
  remark-gfm \
  remark-math \
  remark-smartypants \
  remark-wiki-link \
  @portaljs/remark-callouts \
  rehype-katex \
  rehype-slug \
  rehype-autolink-headings \
  rehype-external-links \
  rehype-accessible-emojis \
  rehype-mermaid \
  shiki \
  reading-time \
  github-slugger
```

### 1.4 Install UI Dependencies
```bash
bun add \
  date-fns \
  clsx \
  tailwind-merge \
  @phosphor-icons/react

# React islands only (lighter than Radix UI)
bun add react react-dom
```

### 1.5 Create Core Configuration Files

**Critical File:** `/Users/yash/code/yashagarwal.in-astro/astro.config.mjs`
```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// Import all remark/rehype plugins
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkSmartypants from 'remark-smartypants';
import wikiLinkPlugin from 'remark-wiki-link';
import remarkCallouts from '@portaljs/remark-callouts';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeMermaid from 'rehype-mermaid';

export default defineConfig({
  site: 'https://yashagarwal.in',
  output: 'static', // Static only, no SSR
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        themes: {
          light: 'github-light',
          dark: 'github-dark-dimmed',
        },
      },
      remarkPlugins: [
        remarkGfm,
        remarkMath,
        [remarkSmartypants, { quotes: false, dashes: 'oldschool' }],
        [wikiLinkPlugin, {
          pageResolver: (name) => [name.replace(/-/g, '').replace(/ /g, '-').toLowerCase()],
          hrefTemplate: (permalink) => `/notes/${permalink}`,
          aliasDivider: '|',
        }],
        remarkCallouts,
      ],
      rehypePlugins: [
        [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
        rehypeSlug,
        [rehypeKatex, { output: 'mathml' }],
        rehypeAccessibleEmojis,
        [rehypeMermaid, { background: 'transparent', className: 'mermaid-diagram' }],
        [rehypeAutolinkHeadings, {
          behavior: 'wrap',
          properties: { className: 'anchor', ariaLabel: 'Link to section' },
        }],
      ],
    }),
    sitemap(),
  ],
  redirects: {
    // Migrate all 335+ redirects from next.config.js
  },
});
```

**Environment Variables:** `/Users/yash/code/yashagarwal.in-astro/.env`
```bash
# Simplified - no more @t3-oss/env-nextjs
PUBLIC_APP_URL=https://yashagarwal.in
```

## Phase 2: Content Migration

### 2.1 Content Collections Setup

**Critical File:** `/Users/yash/code/yashagarwal.in-astro/src/content/config.ts`
```typescript
import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    status: z.enum(['draft', 'published']).default('draft'),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    series: z.object({
      title: z.string(),
      order: z.number().optional(),
    }).optional(),
    createdOn: z.string(),
    updatedOn: z.string().optional(),
    related: z.array(z.string()).optional(),
  }),
});

const lifelog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    createdOn: z.string(),
    updatedOn: z.string().optional(),
  }),
});

export const collections = { notes, lifelog };
```

### 2.2 Copy Content Files
```bash
# Copy all MDX files as-is (no changes needed!)
cp -r /Users/yash/code/yashagarwal.in/content/notes/* \
      /Users/yash/code/yashagarwal.in-astro/src/content/notes/

cp -r /Users/yash/code/yashagarwal.in/content/lifelog/* \
      /Users/yash/code/yashagarwal.in-astro/src/content/lifelog/
```

### 2.3 Content Helper Functions

**Critical File:** `/Users/yash/code/yashagarwal.in-astro/src/lib/content.ts`
```typescript
import { getCollection } from 'astro:content';
import readingTime from 'reading-time';

export async function getNotes() {
  const notes = await getCollection('notes');
  return notes.sort((a, b) =>
    new Date(b.data.createdOn).getTime() - new Date(a.data.createdOn).getTime()
  );
}

export async function getPreviewNotes() {
  const notes = await getNotes();
  return notes.filter(note => note.data.status === 'published');
}

export async function getNoteBySlug(slug: string) {
  const notes = await getNotes();
  return notes.find(note => note.slug === slug);
}

export function getReadingTime(content: string) {
  return readingTime(content);
}

// Add backlinks, series helpers (from lib/content.ts)
```

## Phase 3: Layout System

### 3.1 Base Layout

**Critical File:** `/Users/yash/code/yashagarwal.in-astro/src/layouts/BaseLayout.astro`
```astro
---
import '@/styles/globals.css';
import Navigation from '@/components/layout/Navigation.astro';
import Footer from '@/components/layout/Footer.astro';

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const { title, description, image } = Astro.props;
const siteTitle = title ? `${title} | Yash Agarwal` : 'Yash Agarwal';
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{siteTitle}</title>
    {description && <meta name="description" content={description} />}

    <!-- Fonts (Geist, IBM Plex Mono, Newsreader) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />

    <!-- Theme script (runs before page load to prevent flash) -->
    <script is:inline>
      const theme = localStorage.getItem('theme') || 'system';
      if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    </script>

    <!-- SEO & Social Meta Tags -->
    <!-- Structured Data (JSON-LD) -->

    <slot name="head" />
  </head>
  <body>
    <Navigation />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### 3.2 Blog Post Layout

**Create:** `/Users/yash/code/yashagarwal.in-astro/src/layouts/BlogLayout.astro`
- Wrapper for blog posts with wider max-width
- Table of Contents sidebar
- Reading progress bar
- Breadcrumbs
- Series navigation
- Comments section

## Phase 4: Component Migration

### 4.1 Pure Astro Components (No JavaScript)

**Convert these to `.astro` files:**
- `components/ui/heading.tsx` → `Heading.astro`
- `components/ui/section.tsx` → `Section.astro`
- `components/content/reading-time.tsx` → `ReadingTime.astro`
- `components/content/notes-list.tsx` → `NotesList.astro`
- `components/content/note-preview.tsx` → `NotePreview.astro`
- `components/content/breadcrumbs.tsx` → `Breadcrumbs.astro`
- `components/content/tag-list.tsx` → `TagList.astro`
- `components/ui/social-links.tsx` → `SocialLinks.astro`
- All layout components (Navigation, Footer)

### 4.2 React Islands (Client-Side Only)

**Keep as React with `client:*` directives:**

**AnalogClock** (`components/ui/clock/Clock.tsx`)
```astro
---
import Clock from '@/components/ui/clock/Clock';
---
<Clock client:load />
```

**ThemeToggle** - Replace next-themes with simple implementation
```typescript
// components/interactive/ThemeToggle.tsx
export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    setTheme(stored as any || 'light');
  }, []);

  const toggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return <button onClick={toggle}>/* icon */</button>;
}
```

**Navigation with Active State** - Use ViewTransitions API for highlighting

**CodeBlock** - Keep copy functionality

**TableOfContents** - IntersectionObserver for active section

**MobileTOC** - Replace `vaul` with native `<dialog>` or simple CSS

**Comments** - Keep Disqus integration
```typescript
// components/interactive/Comments.tsx
import { DiscussionEmbed } from 'disqus-react';

export function Comments({ slug, title }: Props) {
  return (
    <DiscussionEmbed
      shortname="yashagarwal"
      config={{ identifier: slug, title }}
    />
  );
}
```
```astro
<Comments client:visible slug={slug} title={title} />
```

**Image Component** - Use Astro's `<Image>` with React wrapper for modal

### 4.3 MDX Components

**Create:** `/Users/yash/code/yashagarwal.in-astro/src/components/content/MDXComponents.ts`
```typescript
import Accordion from './Accordion.astro';
import Highlight from './Highlight.astro';
import Kbd from './Kbd.astro';
import CodeBlock from './CodeBlock';
import Draft from '../ui/Draft.astro';

export const components = {
  Accordion,
  Highlight,
  Kbd,
  CodeBlock,
  Draft,
  // Override default elements
  a: Link,
  img: Image,
  // ... rest
};
```

### 4.4 Radix UI Replacement

**Remove entirely** - Replace with simpler alternatives:
- **Popover** → CSS-based tooltip using `position: absolute`
- **Dropdown** → Native `<details>` element with styling
- **Tooltip** → CSS-only with `::before` pseudo-element
- **Avatar** → Simple `<img>` with fallback

## Phase 5: Routing & Pages

### 5.1 File Structure
```
src/pages/
├── index.astro                    # Homepage (/)
├── notes/
│   ├── index.astro               # Notes listing (/notes)
│   └── [slug].astro              # Blog post (/notes/[slug])
├── tags/
│   ├── index.astro               # Tags listing
│   └── [tag].astro               # Tag page
├── categories/
│   ├── index.astro               # Categories listing
│   └── [category].astro          # Category page
├── work.astro                     # Work page
├── colophon.astro                 # Colophon
├── lifelog.astro                  # Lifelog
├── rss.xml.ts                     # RSS feed
├── atom.xml.ts                    # Atom feed
├── robots.txt.ts                  # Robots.txt
└── sitemap.xml                    # Auto-generated by @astrojs/sitemap
```

### 5.2 Blog Post Template

**Critical File:** `/Users/yash/code/yashagarwal.in-astro/src/pages/notes/[slug].astro`
```astro
---
import { getCollection } from 'astro:content';
import BlogLayout from '@/layouts/BlogLayout.astro';
import TableOfContents from '@/components/content/TableOfContents';
import ReadingProgress from '@/components/content/ReadingProgress';
import Comments from '@/components/interactive/Comments';

export async function getStaticPaths() {
  const notes = await getCollection('notes');
  return notes.map(note => ({
    params: { slug: note.slug },
    props: { note },
  }));
}

const { note } = Astro.props;
const { Content, headings } = await note.render();
const readingTime = getReadingTime(note.body);
---

<BlogLayout title={note.data.title} description={note.data.description}>
  <ReadingProgress client:load />

  <article class="prose">
    <h1>{note.data.title}</h1>
    <Content />
  </article>

  <aside>
    <TableOfContents headings={headings} client:visible />
  </aside>

  <Comments client:visible slug={note.slug} title={note.data.title} />
</BlogLayout>
```

### 5.3 Dynamic Routes
Use `getStaticPaths()` for all dynamic routes (tags, categories, notes)

## Phase 6: SEO & Performance

### 6.1 OG Image Generation

**Different approach than Next.js** - Use `@vercel/og` or Satori directly:

**Create:** `/Users/yash/code/yashagarwal.in-astro/src/pages/og/[slug].png.ts`
```typescript
import satori from 'satori';
import { html } from 'satori-html';
import sharp from 'sharp';

export async function GET({ params }) {
  const { slug } = params;
  const note = await getNoteBySlug(slug);

  const svg = await satori(
    html`<div>/* OG image template */</div>`,
    { width: 1200, height: 630, fonts: [/* */] }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
}

export async function getStaticPaths() {
  const notes = await getCollection('notes');
  return notes.map(note => ({ params: { slug: note.slug } }));
}
```

### 6.2 RSS Feed

**Create:** `/Users/yash/code/yashagarwal.in-astro/src/pages/rss.xml.ts`
```typescript
import rss from '@astrojs/rss';
import { getPreviewNotes } from '@/lib/content';

export async function GET(context) {
  const notes = await getPreviewNotes();
  return rss({
    title: 'Yash Agarwal',
    description: 'Personal blog of Yash Agarwal',
    site: context.site,
    items: notes.map(note => ({
      title: note.data.title,
      pubDate: new Date(note.data.createdOn),
      description: note.data.description,
      link: `/notes/${note.slug}/`,
    })),
  });
}
```

### 6.3 Structured Data

Add JSON-LD to `BlogLayout.astro`:
```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "datePublished": createdOn,
  "author": { "@type": "Person", "name": "Yash Agarwal" },
})} />
```

## Phase 7: Styling (Tailwind v4)

### 7.1 Port Tailwind Config

**Copy:** `/Users/yash/code/yashagarwal.in/tailwind.config.js` → `/Users/yash/code/yashagarwal.in-astro/tailwind.config.js`

Key sections to preserve:
- Typography plugin configuration (prose styles)
- Custom animations (spinner, shimmer, blink, wobble)
- Custom font scale
- Syntax highlighting color tokens
- CSS variable theming

### 7.2 Global Styles

**Copy:** `/Users/yash/code/yashagarwal.in/styles/globals.css` → `/Users/yash/code/yashagarwal.in-astro/src/styles/globals.css`

**Copy:** `/Users/yash/code/yashagarwal.in/styles/mdx.css` → `/Users/yash/code/yashagarwal.in-astro/src/styles/mdx.css`

### 7.3 Fonts

Use `@fontsource` packages or self-host:
```bash
bun add @fontsource/geist-sans @fontsource/ibm-plex-mono @fontsource/newsreader
```

Import in `BaseLayout.astro`:
```typescript
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/600.css';
// ... etc
```

## Phase 8: Developer Tooling

### 8.1 Preserve Essential Tooling

**Keep as-is:**
- ESLint config (copy `eslint.config.mjs`)
- Prettier config (copy `.prettierrc.js`)
- Husky hooks (copy `.husky/`)
- lint-staged config (copy `.lintstagedrc`)
- commitlint config (copy `commitlint.config.js`)

**Scripts to preserve:**
- `/Users/yash/code/yashagarwal.in/scripts/create-note.ts` → Update paths to `src/content/notes/`
- `/Users/yash/code/yashagarwal.in/scripts/optimize-images.ts` → Keep as-is

### 8.2 Update package.json Scripts
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "lint": "eslint . --fix",
    "format": "prettier --write .",
    "typecheck": "astro check",
    "create-note": "bun scripts/create-note.ts"
  }
}
```

### 8.3 TypeScript Config

**Create:** `/Users/yash/code/yashagarwal.in-astro/tsconfig.json`
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "target": "ES2021",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/config": ["./src/config/site.ts"]
    }
  }
}
```

## Phase 9: Third-Party Integrations

### 9.1 Analytics

**Option A: Keep Vercel Analytics** (works on Cloudflare)
```astro
---
import { inject } from '@vercel/analytics';
---
<script is:inline set:html={inject()} />
```

**Option B: Cloudflare Web Analytics** (Recommended)
- Free, privacy-friendly, no cookies
- Add script tag in `BaseLayout.astro`
```html
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

### 9.2 Comments (Disqus)

Already covered in Phase 4.2 - React island with `client:visible`

## Phase 10: Cloudflare Pages Deployment

### 10.1 Build Configuration

**Create:** `/Users/yash/code/yashagarwal.in-astro/wrangler.toml`
```toml
name = "yashagarwal-in"
compatibility_date = "2024-01-01"

[site]
bucket = "./dist"
```

**Cloudflare Pages Settings:**
- Build command: `bun run build`
- Build output directory: `dist`
- Node version: 20

### 10.2 Redirects

**Create:** `/Users/yash/code/yashagarwal.in-astro/public/_redirects`
```
# Migrate all 335+ redirects from next.config.js
/blog/* /notes/:splat 301
# ... rest
```

### 10.3 Security Headers

**Create:** `/Users/yash/code/yashagarwal.in-astro/public/_headers`
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### 10.4 Environment Variables

Set in Cloudflare Pages dashboard:
- `PUBLIC_APP_URL=https://yashagarwal.in`

## Phase 11: Testing & Validation

### 11.1 Feature Parity Checklist

- [ ] All 66 notes render correctly
- [ ] Reading time calculation works
- [ ] Table of Contents highlights active section
- [ ] Dark mode toggles persist
- [ ] AnalogClock shows correct IST time
- [ ] Comments load on scroll
- [ ] All MDX components work (Accordion, Highlight, Kbd, etc.)
- [ ] Wiki-links resolve correctly
- [ ] Code highlighting matches themes
- [ ] Math equations render (KaTeX)
- [ ] Mermaid diagrams display
- [ ] Series navigation works
- [ ] Backlinks appear
- [ ] Tags and categories filter correctly
- [ ] RSS/Atom feeds validate
- [ ] Sitemap generates correctly
- [ ] OG images generate for all posts
- [ ] All 335+ redirects work
- [ ] Mobile navigation works
- [ ] Reading progress tracks scroll

### 11.2 Performance Benchmarks

**Test pages:**
- Homepage (`/`)
- Blog post (`/notes/how-i-built-a-blog-with-nextjs`)
- Notes listing (`/notes`)

**Metrics to compare (Next.js vs Astro):**
- Lighthouse scores (Performance, SEO, Accessibility, Best Practices)
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)
- Bundle size (JS transferred)

### 11.3 SEO Validation

- [ ] Google Search Console shows no errors
- [ ] All meta tags present (title, description, OG, Twitter)
- [ ] Structured data validates (Google Rich Results Test)
- [ ] Canonical URLs correct
- [ ] Sitemap submits successfully
- [ ] robots.txt accessible

## Phase 12: Branch Swap & Go Live

### 12.1 Final Pre-Launch Checks

1. All tests passing
2. Performance benchmarks better than Next.js
3. No broken links (use link checker)
4. All redirects tested
5. Environment variables configured in Cloudflare
6. Analytics tracking verified

### 12.2 Go Live Process

```bash
# In main repository
cd /Users/yash/code/yashagarwal.in

# Rename current main to nextjs-archive
git branch -m main nextjs-archive
git push origin nextjs-archive

# Push astro branch to main
git push origin astro:main --force

# Update local main
git checkout astro
git branch -m astro main
git push --set-upstream origin main

# Update Cloudflare Pages to build from main branch
```

### 12.3 Rollback Plan (If Needed)

```bash
# Revert to Next.js immediately
git push origin nextjs-archive:main --force

# Or use Cloudflare Pages instant rollback
# Dashboard → Deployments → [Previous deployment] → Rollback
```

## Critical Files Reference

**Must create/modify:**
1. `/Users/yash/code/yashagarwal.in-astro/astro.config.mjs` - Core config
2. `/Users/yash/code/yashagarwal.in-astro/src/content/config.ts` - Content Collections
3. `/Users/yash/code/yashagarwal.in-astro/src/layouts/BaseLayout.astro` - Root layout
4. `/Users/yash/code/yashagarwal.in-astro/src/lib/content.ts` - Content helpers
5. `/Users/yash/code/yashagarwal.in-astro/src/pages/notes/[slug].astro` - Blog template
6. `/Users/yash/code/yashagarwal.in-astro/tailwind.config.js` - Preserve custom config
7. `/Users/yash/code/yashagarwal.in-astro/public/_redirects` - 335+ redirects
8. `/Users/yash/code/yashagarwal.in-astro/public/_headers` - Security headers

**Must copy as-is:**
- `/Users/yash/code/yashagarwal.in/content/notes/*.mdx` → `src/content/notes/`
- `/Users/yash/code/yashagarwal.in/content/lifelog/*.mdx` → `src/content/lifelog/`
- `/Users/yash/code/yashagarwal.in/public/images/**` → `public/images/`
- `/Users/yash/code/yashagarwal.in/scripts/create-note.ts` → `scripts/` (update paths)
- `/Users/yash/code/yashagarwal.in/scripts/optimize-images.ts` → `scripts/`

## Simplified Architecture Benefits

**Removed Complexity:**
- ❌ @content-collections → ✅ Native Astro Content Collections
- ❌ @t3-oss/env-nextjs → ✅ Simple .env
- ❌ Radix UI (Avatar, Dropdown, Popover, Tooltip) → ✅ CSS-only or native elements
- ❌ next-themes → ✅ 10-line theme toggle
- ❌ vaul → ✅ Native `<dialog>` or CSS
- ❌ @upstash/redis + Google Sheets API → ✅ Removed
- ❌ React Compiler, Turbopack → ✅ Not needed
- ❌ Complex Next.js config → ✅ Simple Astro config

**Developer Experience:**
- Single `astro.config.mjs` (vs `next.config.js` + `content-collections.ts`)
- No environment validation library needed
- Simpler component model (`.astro` + React islands)
- Native MDX support (no compilation layer)
- Faster dev server (Vite)
- Zero-config TypeScript

**Performance:**
- Islands architecture (minimal JS)
- No React hydration overhead for static content
- Optimized asset pipeline
- Smaller bundle sizes
- Better caching on Cloudflare edge

## Timeline Estimate

- **Phase 0-1** (Setup): 1 day
- **Phase 2-3** (Content + Layouts): 2 days
- **Phase 4** (Components): 1 week
- **Phase 5** (Routing): 2 days
- **Phase 6** (SEO): 2 days
- **Phase 7** (Styling): 1 day
- **Phase 8** (Tooling): 1 day
- **Phase 9** (Integrations): 1 day
- **Phase 10** (Deployment): 1 day
- **Phase 11** (Testing): 3 days
- **Phase 12** (Go Live): 1 day

**Total: ~3-4 weeks** (can be faster with focused work)

## Success Metrics

**Before (Next.js):**
- Bundle size: ~300KB JS
- Lighthouse: 85-90
- Dependencies: 117 packages

**After (Astro):**
- Bundle size: <100KB JS (70% reduction)
- Lighthouse: 95+ (all metrics)
- Dependencies: ~40 packages (65% reduction)
- Load time: 50% faster
- Simplified codebase: Easier maintenance

---

This plan provides a complete roadmap for migrating from Next.js to Astro while maintaining feature parity, improving performance, and simplifying the codebase. All 10 user requirements are addressed with specific implementation details.
