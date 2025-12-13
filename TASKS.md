# Astro Migration Tasks

## Architecture: Alpine.js + Minimal React

**Strategy**: Alpine.js for all simple interactivity on every page, React reserved for complex interactive MDX components only

### Per-Page JavaScript Budget

| Page Type | Framework | Size | Notes |
|-----------|-----------|------|-------|
| **Static pages** (about, work, colophon) | Alpine.js | 3.5KB | AnalogClock, ThemeToggle, no React |
| **Blog posts (no interactive MDX)** | Alpine.js | 3.5KB | CodeBlock, ReadingProgress, TableOfContents, Disqus |
| **Blog posts (with interactive MDX)** | Alpine.js + React | 3.5KB + 42KB | Diagrams, charts, flows loaded on demand |
| **Homepage** | Alpine.js | 3.5KB | AnalogClock embedded, no React |

**Result**: 92% JS reduction on most pages, React only when necessary.

---

## Dependency Optimization Analysis

### Remark/Rehype Plugins

| Plugin | Usage | Recommendation |
|--------|-------|-----------------|
| remark-gfm | ✅ Tables (2+ files) | **KEEP** |
| remark-math | ✅ Used (2 files) | **KEEP** |
| remark-smartypants | ❌ Not critical | **REMOVE** |
| remark-wiki-link | ✅ Part of system | **KEEP** |
| @portaljs/remark-callouts | ❌ Not used | **REMOVE** |
| rehype-katex | ✅ Math rendering | **KEEP** |
| rehype-slug | ✅ Heading IDs | **KEEP** |
| rehype-autolink-headings | ✅ Good UX | **KEEP** |
| rehype-external-links | ✅ Link handling | **KEEP** |
| rehype-accessible-emojis | ⚠️ Nice to have | **OPTIONAL** |
| rehype-mermaid | ✅ 1 file uses it | **KEEP** |
| rehype-pretty-code (Shiki) | ✅ Essential | **KEEP** |

### Framework Dependencies

| Package | Purpose | Size | Notes |
|---------|---------|------|-------|
| **alpinejs** | Interactive components on every page | 3.5KB | AnalogClock, Theme toggle, CodeBlock copy, TOC |
| **react** | Complex interactive MDX only | 42KB | NOT loaded unless page has interactive components |
| **react-dom** | React support | included | Only with React |
| **@astrojs/react** | Astro React integration | - | NOT in default config, added per-file |

### Final Dependency List

```json
{
  "core": [
    "astro", "@astrojs/mdx", "@astrojs/sitemap", "@astrojs/tailwind",
    "tailwindcss", "typescript"
  ],
  "interactivity": [
    "alpinejs"
  ],
  "remark": [
    "remark-gfm",
    "remark-math",
    "remark-wiki-link"
  ],
  "rehype": [
    "rehype-slug",
    "rehype-autolink-headings",
    "rehype-external-links",
    "rehype-katex",
    "rehype-mermaid",
    "shiki"
  ],
  "ui": [
    "date-fns", "reading-time", "github-slugger", "@phosphor-icons/react"
  ],
  "optional": [
    "react", "react-dom", "@astrojs/react" (only if using interactive MDX)
  ],
  "dev": [
    "eslint", "prettier", "husky", "lint-staged", "commitlint"
  ]
}
```

---

## Task Breakdown

### TASK 1: Install Minimal Dependencies
**Goal**: Set up package.json with Alpine.js as default, React optional
**Deliverable**: package.json with streamlined deps
**Verification**: `bun install` completes without errors
**Note**: React/ReactDOM/Phosphor are optional - only install if using interactive MDX components

```json
{
  "dependencies": {
    "alpinejs": "^3.13.0",
    "date-fns": "^4.1.0",
    "reading-time": "^1.5.0",
    "github-slugger": "^2.0.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.4.0"
  },
  "optionalDependencies": {
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "@phosphor-icons/react": "^2.1.10"
  },
  "devDependencies": {
    "astro": "^5.16.5",
    "@astrojs/mdx": "^4.3.13",
    "@astrojs/sitemap": "^3.6.0",
    "@astrojs/tailwind": "^6.0.2",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/typography": "^0.5.19",
    "tailwindcss-animate": "^1.0.7",
    "shiki": "^3.20.0",
    "remark-gfm": "^4.0.1",
    "remark-math": "^6.0.0",
    "remark-wiki-link": "^2.0.1",
    "rehype-slug": "^6.0.0",
    "rehype-autolink-headings": "^7.1.0",
    "rehype-external-links": "^3.0.0",
    "rehype-katex": "^7.0.1",
    "rehype-mermaid": "^3.0.0"
  }
}
```

**Optional**: To add React support (for interactive MDX later):
```bash
bun add react react-dom @astrojs/react @phosphor-icons/react
```

---

### TASK 2: Create Astro Config
**Goal**: Set up astro.config.mjs with Alpine.js as default (NO React in base config)
**Location**: `/astro.config.mjs`
**Includes**: MDX, Tailwind, Sitemap integrations
**Excludes**: @astrojs/react (will be added per-file if needed)
**Remark Plugins**: remark-gfm, remark-math, remark-wiki-link
**Rehype Plugins**: rehype-slug, rehype-autolink-headings, rehype-external-links, rehype-katex, rehype-mermaid
**Alpine Setup**: Import Alpine.js in layouts so it's available on all pages
**Verification**: `bun run build` runs without errors, pages load Alpine functionality

---

### TASK 3: Configure TypeScript & Paths
**Goal**: Set up tsconfig.json with @ aliases
**Location**: `/tsconfig.json`
**Path aliases**:
- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/lib/*` → `./src/lib/*`
- `@/layouts/*` → `./src/layouts/*`

---

### TASK 4: Copy Tailwind Config ✅
**Goal**: Migrate Tailwind v4 configuration from Next.js
**Location**: `/tailwind.config.js`
**Source**: Copy from `/Users/yash/code/yashagarwal.in/tailwind.config.js`
**What to preserve**:
- All custom animations (spinner, shimmer, blink, wobble)
- Typography plugin config with prose styles
- Custom font scales
- Syntax highlighting color tokens
- CSS variable theming system

---

### TASK 5: Copy Global Styles ✅
**Goal**: Migrate CSS files
**Locations**:
- `/src/styles/globals.css` ← `styles/globals.css`
- `/src/styles/mdx.css` ← `styles/mdx.css`
**Notes**: No changes needed to CSS content

---

### TASK 6: Set Up Content Collections ✅
**Goal**: Configure Astro content collections for MDX
**Location**: `/src/content/config.ts`
**Collections**:
- `notes` - Blog posts with full schema (title, tags, category, series, etc)
- `lifelog` - Simple entries (title, createdOn)
**Verification**: Run `astro check` - no errors

---

### TASK 7: Copy MDX Content Files ✅
**Goal**: Migrate all 66 blog posts
**From**: `/Users/yash/code/yashagarwal.in/content/notes/*.mdx`
**To**: `/src/content/notes/*.mdx`
**Verification**: `ls src/content/notes | wc -l` returns 66

---

### TASK 8: Create Content Helper Library ✅
**Goal**: Build TypeScript utilities for content queries
**Location**: `/src/lib/content.ts`
**Functions needed**:
- `getNotes()` - All notes, sorted by date (DESC)
- `getPreviewNotes()` - Only published notes
- `getNoteBySlug(slug)` - Single note lookup
- `getReadingTime(content)` - Calculate reading time
- `getAllTags()` - Unique tags sorted
- `getAllCategories()` - Unique categories sorted
- `getNotesByTag(tag)` - Filter by tag
- `getNotesByCategory(category)` - Filter by category
- `getRelatedNotes(slug)` - Similar posts (same tags/category)
- `getSeriesNotes(title)` - Posts in same series, sorted by order
- `getBacklinks(slug)` - Posts linking to this post

---

### TASK 9: Create Base Layout Component ✅
**Goal**: Root HTML layout with theme support
**Location**: `/src/layouts/BaseLayout.astro`
**Must include**:
- HTML head with meta tags (charset, viewport, title, description)
- Theme detection script (runs before hydration)
- Font loading (Geist, IBM Plex Mono, Newsreader)
- Global CSS imports
- Named slots for page content and head customization
**Note**: No Analytics/Disqus yet, keep minimal

---

### TASK 10: Create Blog Post Layout ✅
**Goal**: Specialized layout for blog posts
**Location**: `/src/layouts/BlogLayout.astro`
**Features**:
- Extends BaseLayout
- Wider max-width for content (screen-2xl)
- Proper semantic HTML (article, aside)
- Accepts props: title, description, createdOn, etc
- Placeholder for: TOC, breadcrumbs, series nav, comments (will add later)

---

### TASK 11: Create Navigation Component ✅
**Goal**: Static header with links
**Location**: `/src/components/layout/Navigation.astro`
**Includes**:
- Avatar image
- Logo/home link
- Primary navigation links (Notes, Work, About)
- Static styling (no JavaScript yet for theme toggle)

---

### TASK 12: Create Footer Component ✅
**Goal**: Static footer
**Location**: `/src/components/layout/Footer.astro`
**Includes**:
- Copyright text
- Links
- Social links
- Basic structure only (AnalogClock comes later)

---

### TASK 13: Create Site Configuration ✅
**Goal**: Centralize site metadata
**Location**: `/src/config/site.ts`
**Details**:
- Define site name, description, URL, links
- Export `siteConfig` object

---

### TASK 14: Create Homepage ✅
**Goal**: Main landing page
**Location**: `/src/pages/index.astro`
**Features**:
- Use `BaseLayout`
- Introduction section
- Social links
- "Recent Writing" list (top 5 posts)
- Use `getPreviewNotes` helper

---

### TASK 15: Create Notes Page ✅
**Goal**: Blog archive
**Location**: `/src/pages/notes/index.astro`
**Features**:
- List all notes
- Search functionality (client-side)
- Filter by tag/category links

---

### TASK 16: Create Dynamic Blog Post Page ✅
**Goal**: Individual post pages
**Location**: `/src/pages/notes/[slug].astro`
**Includes**:
- `getStaticPaths()` to generate all post routes
- Post content rendering
- Metadata (title, date, reading time)
- Basic structure (tags, breadcrumbs, nav later)

---

### TASK 17: Create Tags System ✅
**Goal**: Tag-based filtering
**Files**:
- `/src/pages/tags/index.astro` - List all tags
- `/src/pages/tags/[tag].astro` - Posts for specific tag

---

### TASK 18: Create Categories System ✅
**Goal**: Category-based filtering
**Files**:
- `/src/pages/categories/index.astro` - List all categories
- `/src/pages/categories/[category].astro` - Posts for specific category

---

### TASK 19: Create Static Pages ✅
**Goal**: About, work, colophon pages
**Files**:
- `/src/pages/work.astro`
- `/src/pages/colophon.astro`
- `/src/pages/about.astro` (or rename from existing)

---

### TASK 20: Create RSS Feed ✅
**Goal**: Generate RSS/Atom feeds
**Location**: `/src/pages/rss.xml.ts` and `/src/pages/atom.xml.ts`
**Includes**:
- All published notes with date, title, description
- Proper XML formatting
- Site metadata

---

### TASK 21: Create Sitemap ✅
**Goal**: XML sitemap for SEO
**Note**: Auto-generated by `@astrojs/sitemap` - just verify it works

---

### TASK 22: Create Robots.txt ✅
**Goal**: `/robots.txt` endpoint
**Location**: `/src/pages/robots.txt.ts`

---

### TASK 23: Copy Public Assets ✅
**Goal**: Migrate static files
**From**: `/Users/yash/code/yashagarwal.in/public/images/*`
**To**: `/public/images/*`

---

### TASK 24: Create Alpine.js Theme Toggle Component
**Goal**: Dark mode switcher (client-only)
**Location**: `/src/components/interactive/ThemeToggle.astro`
**Features**:
- Toggle dark/light mode
- Persist to localStorage
- Use Phosphor icons (SVG)
- Alpine.js for interactivity

---

### TASK 25: Create React CodeBlock Component
**Goal**: Code block with copy button
**Location**: `/src/components/interactive/CodeBlock.tsx`
**Features**:
- Syntax highlighting (handled by Shiki in Astro)
- Copy-to-clipboard button
- Language label

---

### TASK 26: Create React Comments Component
**Goal**: Disqus integration
**Location**: `/src/components/interactive/Comments.tsx`
**Features**:
- Use `disqus-react` library
- Lazy load with `client:visible`

---

### TASK 27: Create React AnalogClock Component
**Goal**: Migrate existing clock
**Location**: `/src/components/ui/Clock.tsx`
**Source**: Migrate from Next.js with useClock hook
**Features**:
- Real-time IST clock
- Popover on hover
- SVG rendering

---

### TASK 28: Create MDX Component Overrides
**Goal**: Map custom MDX components
**Location**: `/src/components/content/MDXComponents.ts`
**Overrides needed**:
- `a` - Custom link handling
- `img` - Image component with loading
- `pre` - Code block wrapper
- `code` - Inline code
- Other common elements

---

### TASK 29: Copy & Adapt Scripts
**Goal**: Migration scripts from Next.js
**Files**:
- `/scripts/create-note.ts` - Update paths to `src/content/notes/`
- `/scripts/optimize-images.ts` - No changes needed

---

### TASK 30: Set Up Developer Tooling
**Goal**: Linting, formatting, git hooks
**Files**:
- Copy `.prettierrc.js`
- Copy `eslint.config.mjs`
- Copy `.husky/` hooks
- Copy `.lintstagedrc`
- Copy `commitlint.config.js`

---

### TASK 31: Test Build
**Goal**: Verify full build completes
**Command**: `bun run build`
**Verification**:
- No errors
- dist/ folder created
- All pages generated
- assets optimized

---

### TASK 32: Test Dev Server
**Goal**: Verify development experience
**Command**: `bun run dev`
**Verification**:
- Dev server starts
- Can navigate to pages
- CSS loads correctly
- No console errors

---

### TASK 33: Copy Image Assets
**Goal**: Copy all public images
**From**: `/Users/yash/code/yashagarwal.in/public/images/`
**To**: `/public/images/`
**Size**: ~300MB of WebP images

---

### TASK 34: Add Math Support
**Goal**: Configure KaTeX support for equations
**Status**: ✅ Included in Tasks 1-2 dependencies and config
**Verification**: Math equations render correctly in posts
**Files**: 2 posts use math blocks

---

### TASK 35: Add Mermaid Diagrams
**Goal**: Configure diagram support
**Status**: ✅ Included in Tasks 1-2 dependencies and config
**Verification**: Mermaid diagrams render correctly in posts
**Files**: 1 post uses mermaid

---

### TASK 36: Create Redirects File
**Goal**: Handle old URLs
**Location**: `/public/_redirects`
**Content**: All 335+ redirects from next.config.js redirects
**Format**: Cloudflare Pages format (for future deployment)

---

### TASK 37: Create Security Headers
**Goal**: Cloudflare Pages headers
**Location**: `/public/_headers`
**Headers**:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

### TASK 38: Commit Phase Checkpoint
**Goal**: Git commit with Phase 1-2 complete
**Includes**: Config, content, layouts, basic pages
**Commit message**:
```
feat: complete core Astro setup with pages and layouts

- Set up Astro config with MDX, React, Tailwind
- Configure Content Collections for notes
- Migrate 66 MDX blog posts
- Create layout components (Base, Blog)
- Create all page routes (notes, tags, categories)
- Set up RSS, sitemap, robots.txt
- Copy public assets
```

---

## Execution Strategy

1. **Quick Win Tasks** (Do first, fastest feedback):
   - Task 1: Dependencies
   - Task 2-3: Config
   - Task 4-5: Styling
   - Task 6-7: Content
   - Verify: `bun run build`

2. **Core Functionality** (Main content):
   - Task 8-13: Helpers and layouts
   - Task 14-22: Pages and feeds
   - Verify: All 66 posts render
   - Verify: Navigation works

3. **Interactivity** (Client components):
   - Task 24-28: React components
   - Task 25-27: Clock, code, comments
   - Verify: Theme toggles work
   - Verify: Comments load

4. **Polish** (Final touches):
   - Task 29-30: Scripts and tooling
   - Task 33: Images
   - Task 34-37: Math, mermaid, redirects, and headers
   - Task 38: Final commit

---

## Validation Checklist

After each task, verify:

```bash
# Type check
bun run typecheck

# Lint
bun run lint

# Build
bun run build

# No dist errors
echo "Check dist/ folder created"
```

---

## Parallel Completion

These tasks can be done in parallel by different people or in sequence by one person:

**Parallel Group A** (Independent):
- Task 1-5: Dependencies and config
- Task 29-30: Tooling

**Parallel Group B** (Depends on A):
- Task 6-7: Content
- Task 8: Helpers

**Parallel Group C** (Depends on B):
- Task 9-13: Components
- Task 24-28: React components (independent)

**Parallel Group D** (Depends on C):
- Task 14-22: Pages
- Task 33: Images

**Sequential** (Must be last):
- Task 31-32: Testing
- Task 36-38: Finalization

---

## Notes

- Each task is independently committable
- Each task has clear success criteria
- Tasks 34-35 (math & mermaid) are included as core features
- Image task (33) is large (~300MB) - can be parallelized
- No phase-based dependencies, pure task-based workflow
