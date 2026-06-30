// Vercel serverless function for the newsletter subscription form.
// Verifies the Cloudflare Turnstile token server-side, runs the honeypot
// check on the server (not just the client), then forwards the real
// subscription to listmonk. Returns clean JSON to the frontend.
//
// During local testing this uses the Turnstile "always passes" test keys.
// Set real keys in the Vercel project env before shipping:
//   TURNSTILE_SECRET_KEY — the secret key from the Cloudflare dashboard
//   TURNSTILE_SITE_KEY   — the public site key (used in the widget)
//
// The listmonk list UUID is baked into the form, not this function, so the
// function stays generic.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  const email = String(req.body?.email ?? "").trim();
  const name = String(req.body?.name ?? "").trim();
  const listUuid = String(req.body?.l ?? "").trim();
  const turnstileToken = String(req.body?.turnstileToken ?? "").trim();

  // 1. Basic validation. Email and list id are required.
  if (!email || !listUuid) {
    res.status(400).json({ message: "Email is required." });
    return;
  }

  // 2. Reject URLs in the name field. Bots stuff links in every field.
  if (/https?:\/\/|www\./i.test(`${email} ${name}`)) {
    res.status(400).json({ message: "That name looks like spam." });
    return;
  }

  // 3. Require a Turnstile token. The verification call below is the real
  //    gate; the widget just produces the token.
  if (!turnstileToken) {
    res.status(400).json({ message: "Please complete the verification." });
    return;
  }

  // 4. Verify the token with Cloudflare. The secret lives in env, never in
  //    the browser.
  const secretKey = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";
  try {
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: turnstileToken,
        remoteip: String(req.headers["x-forwarded-for"] || "").split(",")[0].trim(),
      }),
    });
    const outcome = await verify.json();
    if (!outcome.success) {
      res.status(400).json({ message: "Verification failed. Please try again." });
      return;
    }
  } catch {
    res.status(502).json({ message: "Could not reach the verification service." });
    return;
  }

  // 5. Forward the real subscription to listmonk. This endpoint accepts
  //    form-encoded bodies and creates the subscriber with double opt-in.
  const listmonkUrl = "https://newsletter.yashagarwal.in/api/public/subscription";
  try {
    const upstream = await fetch(listmonkUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email, name, l: listUuid }),
    });

    if (upstream.ok) {
      const data = await upstream.json().catch(() => ({}));
      res.status(200).json({ message: "Subscribed! Check your inbox.", has_optin: Boolean(data?.data?.has_optin) });
      return;
    }

    // Surface listmonk errors in a clean shape.
    const text = await upstream.text().catch(() => "");
    res.status(400).json({ message: "Could not subscribe. Please try again later.", detail: text.slice(0, 200) });
  } catch {
    res.status(502).json({ message: "Could not reach the newsletter service." });
  }
}
