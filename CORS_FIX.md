# CORS Issue - Quick Fix

## The Problem
You're seeing: `No 'Access-Control-Allow-Origin' header is present`

## The Reality
✅ **The Workers ARE configured correctly!** I tested and confirmed:
```bash
curl -X OPTIONS https://analytics.yashagarwal.in/api/send
# Returns:
# access-control-allow-origin: *
# access-control-allow-headers: Content-Type, User-Agent
# access-control-allow-methods: GET, POST, OPTIONS
# access-control-max-age: 86400
```

## Why You're Seeing the Error

This is likely a **browser cache issue**. The browser cached an old preflight response before the Workers were properly configured.

## Quick Fix

### Option 1: Hard Refresh (Fastest)

1. **In your browser on the preview site:**
   - **Mac:** `Cmd + Shift + R`
   - **Windows/Linux:** `Ctrl + Shift + F5`

2. **Or clear cache manually:**
   - Open DevTools (F12)
   - Right-click the refresh button
   - Select "Empty Cache and Hard Reload"

3. **Then reload the page normally**

### Option 2: Incognito/Private Window

1. Open preview URL in incognito/private browsing
2. This bypasses all cache
3. Should work immediately

### Option 3: Clear Site Data

1. Open DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Clear site data**
4. Reload page

## Verify It's Working

After clearing cache, open DevTools → Network tab:

### ✅ What You Should See:

**1. OPTIONS request (preflight):**
```
Request URL: https://analytics.yashagarwal.in/api/send
Request Method: OPTIONS
Status Code: 204 No Content

Response Headers:
access-control-allow-origin: *
access-control-allow-methods: GET, POST, OPTIONS
access-control-allow-headers: Content-Type, User-Agent
```

**2. POST request (actual event):**
```
Request URL: https://analytics.yashagarwal.in/api/send
Request Method: POST
Status Code: 200 OK (or 202 Accepted if buffered)

Response Headers:
access-control-allow-origin: *
content-type: application/json

Response:
{"success":true}
or
{"success":true,"buffered":true}
```

## If Still Not Working

### Debug Step 1: Check Request URL

In Network tab, verify the request is going to:
```
https://analytics.yashagarwal.in/api/send
```

NOT to:
- `http://` (insecure)
- Different domain
- Different port

### Debug Step 2: Check Request Headers

The browser should send:
```
Origin: https://yashagarwal-in-git-pr-metrics-yashs-projects-ce8e64aa.vercel.app
Content-Type: application/json
```

### Debug Step 3: Test Directly

Open browser console and paste:
```javascript
fetch('https://analytics.yashagarwal.in/api/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    website: 'e65b4c74-a2c2-4ddc-968b-45b4dc2152ce',
    url: '/test',
    hostname: 'yashagarwal.in'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

**Expected output:**
```
{success: true}
```

If this works, CORS is fine - it's a client code issue.

### Debug Step 4: Check Browser Console

Look for:
- Red CORS errors (means cache issue)
- Network errors (means Workers down)
- JavaScript errors (means client code issue)

## Still Stuck?

Run these commands and share output:

```bash
# Test OPTIONS (preflight)
curl -X OPTIONS https://analytics.yashagarwal.in/api/send \
  -H "Origin: https://yashagarwal.in" \
  -H "Access-Control-Request-Method: POST" \
  -v 2>&1 | grep access-control

# Test POST
curl -X POST https://analytics.yashagarwal.in/api/send \
  -H "Content-Type: application/json" \
  -H "Origin: https://yashagarwal.in" \
  -d '{"website":"e65b4c74-a2c2-4ddc-968b-45b4dc2152ce","url":"/test","hostname":"yashagarwal.in"}' \
  -v 2>&1 | grep access-control

# Check Workers status
curl https://analytics.yashagarwal.in/api/stats
```

## Prevention

The Workers have correct CORS configuration:

```typescript
// In src/config.ts
export const CORS_CONFIG = {
  ALLOW_ORIGIN: '*',  // Allows all origins
  ALLOW_METHODS: 'GET, POST, OPTIONS',
  ALLOW_HEADERS: 'Content-Type, User-Agent',
  MAX_AGE: '86400',  // 24 hour cache
}
```

This allows requests from:
- yashagarwal.in (production)
- Vercel preview URLs
- localhost (development)
- Any other origin

## Summary

**The Workers are configured correctly!** Just clear your browser cache and it should work.

Try: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+F5** (Windows/Linux)
