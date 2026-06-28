---
name: create-listmonk-campaign
description: Create, test, and send newsletter campaigns through the self-hosted listmonk instance. Use when the user mentions sending a newsletter, creating a campaign, writing a newsletter issue, emailing subscribers, or publishing an update to their mailing list. Also use when the user says they want to share something with subscribers or asks about their newsletter.
---

# Create Listmonk Campaign

Create and send newsletter campaigns through the listmonk API. The skill is self-contained — all API credentials and endpoints are documented here. The bash script at `scripts/create-campaign.sh` handles the API calls.

## Setup

Before first use, create a `.env` file in the skill directory:

```bash
cp .env.example .env
# Edit .env with real values from the listmonk admin dashboard (Settings → API)
```

Before running the script, ensure the listmonk SSH port-forward is active:

```bash
ssh -L localhost:9000:127.0.0.1:9001 -N oci &
```

## Credentials and Configuration

The script reads these environment variables from the `.env` file:
- `LISTMONK_API_USER` — API username (default: `api`)
- `LISTMONK_API_TOKEN` — API token
- `LISTMONK_BASE_URL` — listmonk URL (default: `http://localhost:9000`, requires SSH port-forward to OCI)

Before running the script, ensure the listmonk port-forward is active:

```bash
ssh -L localhost:9000:127.0.0.1:9001 -N oci &
```

Key configuration:
- Template ID: `7` (Site style — matches yashagarwal.in design)
- Default list ID: `1` (yashagarwal.in subscribers)
- `from_email` is set automatically from the `LISTMONK_FROM_EMAIL` env var

## Workflow

### Step 1: Write the campaign body

Write the body in Markdown. The campaign template (Site style) wraps it with the site's header, footer, and styling.

Available template variables:
- `{{ .Subscriber.FirstName }}` — subscriber's first name (auto-extracted from full name)
- `{{ .Subscriber.Email }}` — subscriber's email address
- `{{ UnsubscribeURL }}` — auto-generated unsubscribe link (included in template footer)
- `{{ MessageURL }}` — view in browser link

Keep the writing plain and personal. Match the voice of the site — no hype, no marketing language, no emojis. Write as if emailing a friend about what you have been up to.

### Step 2: Create the campaign as a draft

Run the script with `--title`, `--subject`, and `--body-file` (write the body to a temp file first):

```bash
scripts/create-campaign.sh \
  --title "Issue N - Short description" \
  --subject "The email subject line" \
  --body-file /tmp/campaign-body.md
```

The script outputs the campaign ID. Write it down — you will need it for the next steps.

### Step 3: Send a test

Ask the user: "Send a test to yourself first?" If yes, use the user's email address (find it from the subscriber list or ask):

```bash
scripts/create-campaign.sh \
  --title "Issue N - Short description" \
  --subject "The email subject line" \
  --body-file /tmp/campaign-body.md \
  --test user@example.com
```

Wait for the user to check their inbox and confirm the email looks right.

### Step 4: Start the campaign

Ask the user: "Start the campaign? This will send to all subscribers." If yes:

```bash
curl -s -u "${LISTMONK_API_USER}:${LISTMONK_API_TOKEN}" \
  -X PUT \
  -H "Content-Type: application/json" \
  -d '{"status": "running"}' \
  "${LISTMONK_BASE_URL}/api/campaigns/<CAMPAIGN_ID>/status"
```

Report the campaign URL: `https://newsletter.yashagarwal.in/admin/campaigns/<CAMPAIGN_ID>`

## Example Campaign Body

```
Hey {{ .Subscriber.FirstName }},

Thanks for subscribing.

Here is what I have been working on lately.

**Mum's Memories.** I shipped a new feature that lets you add voice notes to journal entries. The app now supports three entry types: text, voice, and video. You can read more at https://mumsmemories.app.

**This site.** I added a /scratch section for quick notes. These are rough and often written with AI help. They are not polished posts, but they capture things I figure out day to day. You can browse them at https://yashagarwal.in/scratch.

That is it for now. Reply to this email if you have thoughts or just want to say hello.

— Yash
```

## Notes

- The campaign body is Markdown. The template injects it between the header and footer.
- Test emails go only to the specified addresses. The campaign stays in draft until explicitly started.
- After starting, the campaign cannot be edited. Create a new one if changes are needed.
- Campaign analytics (opens, clicks) are available in the listmonk dashboard after sending.
