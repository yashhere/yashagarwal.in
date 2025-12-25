# Chart Generation Prompts for "My Bug of the Year" Blog Post

## Chart 1: API Request Rate

**Prompt:**
Create a clean, modern line chart showing API request rate over time with the following specifications:

**Data Pattern:**
- Time range: December 7th to December 21st (approximately 14 days)
- Y-axis range: 0 to 750 requests per minute (req/m)
- Before December 11th: Steady baseline around 240-260 req/m with natural fluctuations and noise
- December 11th (around midday): Sharp exponential spike reaching peak of approximately 690 req/m
- The spike has a brief plateau at the top creating a "double peak" effect (two peaks at ~600 and ~690 req/m)
- December 11th (late): **CRITICAL MOMENT - THE FIX DEPLOYMENT** - Dramatic vertical drop from 690 req/m to near 0 req/m (drops to ~10-20 req/m)
- After fix: Extremely low, almost flat line hovering near 0-20 req/m with minimal activity
- December 17th: Very small bump to ~40 req/m, then back to baseline
- December 19th onwards: Slight uptick to ~30-50 req/m

**Visual Design:**
- Style: Clean, minimalist, modern data visualization (NOT Grafana-style)
- Chart type: Smooth area chart with gradient fill
- Line color: Warm golden yellow (#F4B942 or similar)
- Area fill: Gradient from warm yellow at top to light cream/beige at bottom, creating a "sunset glow" effect
- Background: Pure white (#FFFFFF)
- NO X-axis labels or gridlines
- Y-axis: Left side only, with labels at key intervals (0, 150, 300, 450, 600, 750 req/m)
- Y-axis style: Thin gray lines (#E5E5E5), minimalist labels in dark gray (#666666)
- Horizontal gridlines: Very subtle light gray (#F5F5F5), only at major Y-axis intervals

**Critical Annotation:**
- At the exact point where the spike drops vertically (December 11th, around 4-5 PM mark), add a **prominent downward-pointing arrow**
- Arrow style: Solid dark color (#2C3E50 or similar), thick stroke, clean modern design
- Arrow label: "Fix Deployed" in bold sans-serif font
- Position the arrow and label so they clearly point to the inflection point where the line drops

**Additional Details:**
- Chart dimensions: 1600px wide × 800px tall (2:1 ratio) for blog post embedding
- Title: "API Request Rate" in clean sans-serif font (24px, #2C3E50), positioned top-left
- Legend: Bottom-right corner, small text: "Requests per minute" with matching yellow color indicator
- Padding: Adequate white space around all edges (80px left for Y-axis, 40px top, 40px right, 60px bottom)
- The dramatic drop should be the visual focal point - make it unmistakably obvious
- Optimized for light mode viewing on web browsers

**Storytelling Notes:**
This chart should visually tell the story of a system under severe load (the spike representing zombie requests piling up), followed by immediate relief when the monkey patch fix was deployed. The contrast between the chaotic spike and the calm after the fix should be stark and dramatic.

---

## Chart 2: HTTP Request Latency (P95 Percentile)

**Prompt:**
Create a clean, modern area chart showing HTTP request latency percentiles over time with the following specifications:

**Data Pattern:**
- Time range: December 7th to December 21st (approximately 14 days)
- Y-axis range: 0 to 5.5 seconds
- Logarithmic-style spacing preferred for better visualization of the dramatic differences
- Before December 11th: Fluctuating latency between 1.9s and 2.8s (P95), showing instability
- The line should have natural "noise" with regular peaks and valleys indicating system stress
- December 11th (midday): Brief dip to ~1.5s, then MASSIVE spike to ~4.9s (near 5 seconds)
- This represents the system choking under load - requests timing out
- December 11th (late): **CRITICAL MOMENT - THE FIX DEPLOYMENT** - Sharp vertical drop from ~4.9s to ~500ms (0.5s)
- After fix: Extremely stable, flat line at ~500ms with almost no variation
- The post-fix line should be perfectly smooth, indicating healthy stable performance

**Visual Design:**
- Style: Clean, minimalist, modern data visualization (NOT Grafana-style)
- Chart type: Smooth area chart with gradient fill
- Line color: Cool blue (#4A90E2 or similar)
- Area fill: Gradient from medium blue at top to very light blue/white (#E8F4FD) at bottom, creating a "calm water" effect
- Background: Pure white (#FFFFFF)
- NO X-axis labels or gridlines
- Y-axis: Left side only, with labels at key intervals (0s, 1s, 2s, 3s, 4s, 5s)
- Y-axis style: Thin gray lines (#E5E5E5), minimalist labels in dark gray (#666666)
- Horizontal reference lines:
  - Dashed line at 1s (light gray) labeled "Target SLA"
  - Dashed line at 3s (light orange/warning color #FFB84D) labeled "Warning Threshold"
  - These help show how badly the system was performing before the fix

**Critical Annotation:**
- At the exact point where latency drops from ~5s to 0.5s (December 11th), add a **prominent downward-pointing arrow**
- Arrow style: Solid dark blue (#2C5282 or similar), thick stroke, clean modern design
- Arrow label: "Fix Deployed - 8x Improvement" in bold sans-serif font
- The arrow should emphasize the dramatic performance improvement

**Additional Details:**
- Chart dimensions: 1600px wide × 800px tall (2:1 ratio) for blog post embedding
- Title: "HTTP Request Latency (P95)" in clean sans-serif font (24px, #2C3E50), positioned top-left
- Subtitle: "95th percentile response time" in smaller gray text (16px, #666666) below title
- Legend: Bottom-right corner showing:
  - Blue line indicator: "P95 Latency"
  - Gray dashed line: "Target (1s)"
  - Orange dashed line: "Warning (3s)"
- Padding: Adequate white space around all edges (80px left for Y-axis, 50px top, 40px right, 60px bottom)
- The contrast between the unstable pre-fix latency and the rock-solid post-fix latency should be immediately obvious
- Optimized for light mode viewing on web browsers

**Storytelling Notes:**
This chart illustrates the user experience before and after the fix. Before: painful 2-5 second waits with high variability (frustrated users). After: consistent 500ms responses (happy users). The visual should make the 8x improvement unmistakable.

---

## Chart 3: HTTP Requests by Status Code

**Prompt:**
Create a clean, modern area chart showing HTTP request volume by status code over time with the following specifications:

**Data Pattern:**
- Time range: December 7th to December 21st (approximately 14 days)
- Y-axis range: 0 to 35,000 requests
- Before December 11th: Steady baseline around 1,500-2,000 requests per time window
- Relatively stable with minor fluctuations
- December 11th (midday-afternoon): Exponential spike beginning, climbing from 2K to 3K
- December 11th (peak): **MASSIVE SPIKE** reaching approximately 31,500 requests
- This represents the accumulation of zombie requests and retries flooding the system
- December 11th (late): **CRITICAL MOMENT - THE FIX DEPLOYMENT** - Near-vertical drop from 31.5K to ~200 requests
- After fix: Extremely low, flat baseline near 0-500 requests
- December 17th: Very small bump to ~1,000 requests
- December 19th onwards: Minimal activity around 200-400 requests

**Visual Design:**
- Style: Clean, minimalist, modern data visualization (NOT Grafana-style)
- Chart type: Smooth area chart with gradient fill
- Line color: Rich purple/indigo (#7C3AED or similar)
- Area fill: Gradient from medium purple at top to very light lavender (#F3F0FF) at bottom
- Background: Pure white (#FFFFFF)
- NO X-axis labels or gridlines
- Y-axis: Left side only, with labels at key intervals (0, 5K, 10K, 15K, 20K, 25K, 30K, 35K)
- Y-axis format: Use "K" notation (5K, 10K, etc.) for thousands
- Y-axis style: Thin gray lines (#E5E5E5), minimalist labels in dark gray (#666666)
- Horizontal gridlines: Very subtle light gray (#F5F5F5), only at major intervals (10K, 20K, 30K)

**Critical Annotation:**
- At the exact point where the spike drops from 31.5K to ~200 (December 11th evening), add a **prominent downward-pointing arrow**
- Arrow style: Solid dark purple (#5B21B6 or similar), thick stroke, clean modern design
- Arrow label: "Fix Deployed - 99% Reduction" in bold sans-serif font
- Consider adding a subtle highlight box or annotation showing "31,500 → 200 requests"
- The arrow should make it crystal clear where the intervention happened

**Additional Details:**
- Chart dimensions: 1600px wide × 800px tall (2:1 ratio) for blog post embedding
- Title: "HTTP Requests by Status Code" in clean sans-serif font (24px, #2C3E50), positioned top-left
- Subtitle: "Total processed requests per interval" in smaller gray text (16px, #666666)
- Legend: Bottom-right corner, small text: "HTTP Requests" with matching purple color indicator
- Optional callout: Small text annotation near the peak showing "Peak: 31.5K requests" to emphasize the magnitude
- Padding: Adequate white space around all edges (80px left for Y-axis, 50px top, 40px right, 60px bottom)
- The scale of the disaster (31K requests) vs the fix (200 requests) should be immediately shocking
- Optimized for light mode viewing on web browsers

**Storytelling Notes:**
This is the "smoking gun" chart - it shows the zombie request apocalypse in full glory. The 31.5K peak represents duplicate retries flooding the system, all being processed even though clients had already given up. The immediate 99% drop proves the fix worked instantly. Make the peak dramatic and terrifying, then show the relief of the fix.

---

## Chart 4: Memory Usage Pattern (Multi-Pod)

**Prompt:**
Create a clean, modern multi-line chart showing memory usage patterns across multiple pods over time with the following specifications:

**Data Pattern:**
- Time range: December 7th to December 21st (approximately 14 days)
- Y-axis range: 0 to 7 GiB (Gibibytes)
- Three distinct lines representing different pods or memory percentiles
- **Line 1 (Highest - Pod A or Max):**
  - Starts at ~2.5 GiB on Dec 7th
  - Steady exponential growth to ~6 GiB by Dec 11th (classic memory leak pattern)
  - Shows relentless upward trajectory with step-like increases
  - Sudden drop at fix deployment
- **Line 2 (Middle - Pod B or P75):**
  - Starts at ~3.5 GiB on Dec 7th
  - Grows to peak of ~3.2 GiB on Dec 11th
  - More gradual growth pattern than Line 1
  - Sharp drop at fix deployment to ~1.4 GiB
- **Line 3 (Lowest - Pod C or P50):**
  - Starts near 0 GiB on Dec 7th
  - Steady linear growth to ~2.7 GiB by Dec 11th
  - Most stable growth pattern
  - Drop at fix deployment to ~800 MiB
- December 11th (late): **CRITICAL MOMENT - THE FIX DEPLOYMENT** - All three lines drop sharply
- After fix: All lines stabilize at much lower levels:
  - Line 1: Flatlines at ~1.4 GiB
  - Line 2: Flatlines at ~800 MiB
  - Line 3: Flatlines at ~650 MiB (roughly, showing as flat line near bottom)
- Post-fix pattern: Completely flat, stable lines with no growth - healthy memory behavior

**Visual Design:**
- Style: Clean, minimalist, modern data visualization (NOT Grafana-style)
- Chart type: Multi-line chart with three distinct colored lines, NO fill
- Line 1 color: Deep burgundy/maroon (#9B4444 or similar) - represents danger/high usage
- Line 2 color: Medium orange (#E67E22 or similar) - represents warning
- Line 3 color: Olive/dark yellow (#B8860B or similar) - represents caution
- Line thickness: Medium weight (2-3px), smooth curves
- Background: Pure white (#FFFFFF)
- NO X-axis labels or gridlines
- Y-axis: Left side only, with labels at key intervals (0 GiB, 1 GiB, 2 GiB, 3 GiB, 4 GiB, 5 GiB, 6 GiB, 7 GiB)
- Y-axis style: Thin gray lines (#E5E5E5), minimalist labels in dark gray (#666666)
- Y-axis format: Use "GiB" notation consistently
- Horizontal gridlines: Very subtle light gray (#F5F5F5) at each 1 GiB interval
- Danger zone: Optional subtle red-tinted background area above 5 GiB to indicate critical memory zone

**Critical Annotation:**
- At the exact point where all three lines drop (December 11th), add a **prominent downward-pointing arrow**
- Arrow style: Solid dark gray/black (#2C3E50 or similar), thick stroke, clean modern design
- Arrow label: "Fix Deployed" in bold sans-serif font
- Arrow should be positioned to clearly point at the inflection point across all three lines
- Consider adding a subtle vertical line at the deployment moment to help align the three drops

**Additional Details:**
- Chart dimensions: 1600px wide × 900px tall (16:9 ratio) - slightly taller to accommodate three lines
- Title: "Memory Usage Pattern (Multi-Pod)" in clean sans-serif font (24px, #2C3E50), positioned top-left
- Subtitle: "Memory consumption across pods over time" in smaller gray text (16px, #666666)
- Legend: Bottom-right corner showing:
  - Burgundy line: "Pod A (Max)" or "P95 Memory"
  - Orange line: "Pod B (P75)" or "P75 Memory"
  - Yellow line: "Pod C (P50)" or "P50 Memory"
- Additional annotation: Small text near Line 1's peak showing "Peak: 6 GiB" to emphasize the severity
- Padding: Adequate white space around all edges (80px left for Y-axis, 50px top, 40px right, 80px bottom for legend)
- The upward "memory leak" pattern before the fix vs the flat stability after should be dramatic
- Optimized for light mode viewing on web browsers

**Storytelling Notes:**
This chart reveals the root cause evidence: greenlets piling up in memory waiting to be processed, never being released. The relentless upward march of all three lines (especially Line 1 approaching OOM territory at 6 GiB) shows a system heading toward inevitable crash. The instant drop and subsequent flatline proves the fix didn't just reduce load - it fixed the fundamental concurrency problem. The three lines together show this wasn't a fluke but a system-wide issue affecting all pods.

---

## General Design Guidelines for All Charts:

**Typography:**
- Use clean, modern sans-serif fonts (e.g., Inter, Helvetica Neue, SF Pro, or similar)
- Title size: 24-28px, weight: 600-700
- Subtitle size: 14-16px, weight: 400
- Axis labels: 12-14px, weight: 400
- Legend text: 11-13px, weight: 400

**Colors:**
- Maintain high contrast for accessibility
- Use distinct, professionally-selected color palettes
- Avoid Grafana's default blue-on-dark aesthetic
- Optimize for light mode display on modern web browsers
- Ensure colors work well together when charts are viewed side-by-side

**Layout:**
- Generous white space around charts
- Clean, uncluttered design
- Remove unnecessary chart junk (excessive gridlines, borders, decorations)
- Focus on data storytelling, not dashboard aesthetics
- Make the "fix deployed" moment the visual anchor point in each chart

**Export:**
- High resolution (2x or 3x for retina displays)
- PNG format with transparency support
- Optimized file size for web delivery
- Dimensions suitable for blog post embedding (full-width on desktop, responsive on mobile)

---

**Note:** These prompts are designed to be used with AI image generation tools (DALL-E, Midjourney, Stable Diffusion, etc.) or can be provided to a data visualization designer. Each prompt contains precise data patterns, visual specifications, and storytelling guidance to ensure the recreated charts effectively communicate the blog post's narrative about the gevent monkey patching bug and its dramatic fix.
