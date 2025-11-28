# Giscus Comment System Implementation (Removed)

This document describes how the Giscus comment system was implemented in this blog before it was removed in favor of Disqus.

## Overview

Giscus is a comments system powered by GitHub Discussions. It was set up but never activated in production, with Disqus being the active comment system instead.

## Implementation Details

### 1. Configuration Files

#### `/giscus.json` (Deleted)

This file configured Giscus origins (allowed domains) and comment ordering:

```json
{
  "origins": ["https://yashagarwal.in"],
  "originsRegex": [
    "http://localhost:[0-9]+",
    "https://([A-Za-z0-9]+[.])yashagarwal[.]in",
    "https://yashagarwal-in-([A-Za-z0-9-])+-yashhere.vercel.app"
  ],
  "defaultCommentOrder": "newest"
}
```

**Purpose:**

- `origins`: Whitelist of allowed domains for Giscus to load
- `originsRegex`: Regex patterns for dynamic subdomains (localhost, preview deployments)
- `defaultCommentOrder`: Default sort order for comments

#### `/config/site.ts` (Modified)

The site config contained Giscus configuration:

```typescript
comment: {
  repo: "yashhere/yashagarwal.in-comments",      // GitHub repo for discussions
  repoId: "R_kgDOJ5aOmA",                        // GitHub repo ID
  category: "Comments",                          // Discussion category name
  categoryId: "DIC_kwDOJ5aOmM4CXxEK",           // Discussion category ID
  lightTheme: "light",                           // Theme for light mode
  darkTheme: "dark",                             // Theme for dark mode
}
```

### 2. Custom React Hook

#### `/lib/useGiscus.ts` (Deleted)

A custom hook that integrated Giscus with Next.js and handled theme switching:

```typescript
export const useGiscus = ({ mapping, commentNodeId }: IGiscus) => {
  const { resolvedTheme = "light" } = useTheme()
  const theme = React.useRef(resolvedTheme)

  // Effect 1: Inject Giscus script on mount
  React.useEffect(() => {
    const scriptParentNode = document.getElementById(commentNodeId)
    if (!scriptParentNode) return

    const script = document.createElement("script")
    const attributes = {
      src: "https://giscus.app/client.js",
      "data-repo": REPO_NAME,
      "data-repo-id": REPO_ID,
      "data-category": CATEGORY,
      "data-category-id": CATEGORY_ID,
      "data-strict": "0",
      "data-mapping": "pathname",
      "data-reactions-enabled": "1",
      "data-input-position": "top",
      "data-emit-metadata": "0",
      "data-theme": THEME_MAPPING[theme.current],
      "data-lang": "en",
      "data-loading": "lazy",
      crossorigin: "anonymous",
      async: "",
    }

    Object.entries(attributes).forEach(([name, value]) =>
      script.setAttribute(name, value)
    )

    scriptParentNode.appendChild(script)
  }, [commentNodeId, mapping])

  // Effect 2: Update theme dynamically when user toggles
  React.useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    )
    iframe?.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme: THEME_MAPPING[resolvedTheme],
          },
        },
      },
      "https://giscus.app"
    )
  }, [resolvedTheme])
}
```

**Key Features:**

1. **Dynamic Script Injection**

   - Injects the Giscus script tag into the DOM when the component mounts
   - Uses `data-*` attributes to configure Giscus behavior
   - Script loads asynchronously with `lazy` loading for performance

2. **Dark Mode Integration**

   - Reads current theme from `next-themes` via `useTheme()`
   - Maps internal theme names to Giscus theme values:
     - `light` → `"light"`
     - `dark` → `"dark"`

3. **Real-time Theme Updates**
   - Second `useEffect` watches for theme changes
   - Uses `postMessage` API to communicate with Giscus iframe
   - Sends theme update message when user toggles dark mode
   - No page reload required for theme changes

### 3. Comment Component

#### `/components/interactive/comments.tsx` (Modified)

The component exported two comment systems:

```typescript
// Giscus component (removed)
export const Comments = () => {
  const COMMENTS_NODE_ID = "comments"
  const MAPPING: string = "pathname"
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true })

  useGiscus({ mapping: MAPPING, commentNodeId: inView ? COMMENTS_NODE_ID : "" })

  return (
    <div ref={ref}>
      {inView ? <div id={COMMENTS_NODE_ID} className="pt-8" /> : null}
    </div>
  )
}

// Disqus component (kept, active)
export const DisqusComments = ({ url, slug }: ICommentProps) => {
  // ... Disqus implementation
}
```

**Lazy Loading Strategy:**

- Used `react-intersection-observer` to detect when comments section scrolled into view
- Only loaded Giscus script when user scrolled near comments (performance optimization)
- `triggerOnce: true` ensured script only loaded once per page

## How Dark Mode Worked

### Architecture

1. **Theme Provider** (`next-themes`)

   - Global theme state management
   - Persists user preference in localStorage
   - Provides `resolvedTheme` value ("light" or "dark")

2. **Initial Load**

   - Hook reads current theme via `useTheme()`
   - Passes theme to Giscus via `data-theme` attribute
   - Giscus iframe loads with correct theme immediately

3. **Theme Toggle**
   - User clicks theme toggle button anywhere on site
   - `next-themes` updates global theme state
   - `useGiscus` hook's second effect detects change
   - Hook sends message to Giscus iframe:
     ```typescript
     iframe.contentWindow.postMessage(
       { giscus: { setConfig: { theme: "dark" } } },
       "https://giscus.app"
     )
     ```
   - Giscus receives message and updates its theme
   - Comments UI transitions smoothly without reload

### Theme Mapping

```typescript
const THEME_MAPPING = {
  light: config.lightTheme, // "light"
  dark: config.darkTheme, // "dark"
}
```

This mapping allowed flexibility to use different Giscus themes:

- Could use custom GitHub themes like "dark_dimmed", "dark_high_contrast"
- Configured in `config/site.ts` for easy updates

## Why It Was Removed

1. **Never Activated**: Giscus was fully configured but never used in production
2. **Disqus Was Active**: All articles used `DisqusComments` component instead
3. **Redundant Configuration**: Maintaining two comment systems added unnecessary complexity
4. **Simplification Goal**: Part of broader effort to remove unnecessary features

## Migration Notes

If you want to re-enable Giscus in the future:

1. Restore the deleted files:

   - `lib/useGiscus.ts`
   - `giscus.json`

2. Restore config in `config/site.ts`:

   ```typescript
   comment: {
     repo: "yashhere/yashagarwal.in-comments",
     repoId: "R_kgDOJ5aOmA",
     category: "Comments",
     categoryId: "DIC_kwDOJ5aOmM4CXxEK",
     lightTheme: "light",
     darkTheme: "dark",
   }
   ```

3. Update TypeScript types in `types/index.d.ts`:

   ```typescript
   export type SiteConfig = {
     // ... other fields
     comment: {
       repo: string
       repoId: string
       category: string
       categoryId: string
       lightTheme: string
       darkTheme: string
     }
   }
   ```

4. Restore `Comments` component in `components/interactive/comments.tsx`

5. Replace `DisqusComments` with `Comments` in article pages

## Reference Links

- [Giscus Documentation](https://giscus.app/)
- [GitHub Discussion](https://github.com/orgs/giscus/discussions/152) (referenced in deleted code)
- [Next.js Themes](https://github.com/pacocoursey/next-themes)
- [React Intersection Observer](https://github.com/thebuilder/react-intersection-observer)

## Lessons Learned

1. **Dynamic Script Loading**: The implementation showed how to inject third-party scripts conditionally
2. **Cross-Frame Communication**: Used `postMessage` API for secure iframe communication
3. **Theme Synchronization**: Demonstrated pattern for syncing app theme with embedded widgets
4. **Performance Optimization**: Lazy loading prevented comments from blocking initial page load
5. **Configuration Management**: Centralized comment system config for easy switching
