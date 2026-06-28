#!/usr/bin/env bash
# Create and optionally test/send a listmonk campaign.
#
# Usage:
#   scripts/create-listmonk-campaign --title "Issue 1" --subject "Hello" --body-file body.md
#   scripts/create-listmonk-campaign --title "Issue 1" --subject "Hello" --body "Hey {{ .Subscriber.FirstName }}"
#   scripts/create-listmonk-campaign --title "Issue 1" --subject "Hello" --body-file body.md --test yash@example.com
#
# Options:
#   --title       Campaign name (internal, not shown to subscribers)
#   --subject     Email subject line
#   --body        Campaign body text (markdown). Use {{ .Subscriber.FirstName }} for names.
#   --body-file   Read body from a file instead
#   --test        Email address to send a test to before starting (can repeat)
#   --start       Start the campaign immediately after creating (skips test)
#   --list-ids    Comma-separated list IDs (default: 1)
#
# Environment variables (from .env):
#   LISTMONK_API_USER     API username (default: api)
#   LISTMONK_API_TOKEN    API token
#   LISTMONK_BASE_URL     Base URL (default: http://localhost:9000)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Load .env from the skill directory
ENV_FILE="${SCRIPT_DIR}/../.env"
if [ ! -f "$ENV_FILE" ]; then
  echo "Error: .env not found at $ENV_FILE"
  echo "Create one with:"
  echo "  LISTMONK_API_USER=api"
  echo "  LISTMONK_API_TOKEN=your-token"
  echo "  LISTMONK_BASE_URL=http://localhost:9000"
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

API_USER="${LISTMONK_API_USER:-api}"
API_TOKEN="${LISTMONK_API_TOKEN:-}"
BASE_URL="${LISTMONK_BASE_URL:-http://localhost:9000}"

if [ -z "$API_TOKEN" ]; then
  echo "Error: LISTMONK_API_TOKEN is not set. Add it to .env or export it."
  exit 1
fi

AUTH="-u ${API_USER}:${API_TOKEN}"

# Parse arguments
TITLE=""
SUBJECT=""
BODY=""
BODY_FILE=""
TEST_EMAILS=()
START=false
LIST_IDS="1"

while [ $# -gt 0 ]; do
  case "$1" in
    --title)
      TITLE="$2"
      shift 2
      ;;
    --subject)
      SUBJECT="$2"
      shift 2
      ;;
    --body)
      BODY="$2"
      shift 2
      ;;
    --body-file)
      BODY_FILE="$2"
      shift 2
      ;;
    --test)
      TEST_EMAILS+=("$2")
      shift 2
      ;;
    --start)
      START=true
      shift
      ;;
    --list-ids)
      LIST_IDS="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Validate
if [ -z "$TITLE" ]; then
  echo "Error: --title is required"
  exit 1
fi
if [ -z "$SUBJECT" ]; then
  echo "Error: --subject is required"
  exit 1
fi

if [ -n "$BODY_FILE" ]; then
  BODY=$(cat "$BODY_FILE")
elif [ -z "$BODY" ]; then
  echo "Error: --body or --body-file is required"
  exit 1
fi

# Convert list IDs to JSON array
IFS=',' read -ra LIST_ARRAY <<< "$LIST_IDS"
LIST_JSON="["
for i in "${!LIST_ARRAY[@]}"; do
  [ $i -gt 0 ] && LIST_JSON+=","
  LIST_JSON+="${LIST_ARRAY[$i]}"
done
LIST_JSON+="]"

# Escape body for JSON
BODY_ESCAPED=$(python3 -c "import json; print(json.dumps('''${BODY}'''))" 2> /dev/null || echo "")

if [ -z "$BODY_ESCAPED" ]; then
  # Fallback: write JSON with python
  BODY_ESCAPED=$(python3 -c "
import json, sys
body = sys.stdin.read()
print(json.dumps(body))
" <<< "$BODY")
fi

echo "Creating campaign: $TITLE"
echo "Subject: $SUBJECT"
echo ""

# Create campaign
RESPONSE=$(curl -s $AUTH \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": $(python3 -c "import json; print(json.dumps('$TITLE'))"),
    \"subject\": $(python3 -c "import json; print(json.dumps('$SUBJECT'))"),
    \"lists\": $LIST_JSON,
    \"type\": \"regular\",
    \"content_type\": \"markdown\",
    \"messenger\": \"email\",
    \"body\": $BODY_ESCAPED,
    \"template_id\": 7
  }" \
  "${BASE_URL}/api/campaigns")

CAMPAIGN_ID=$(echo "$RESPONSE" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('data',{}).get('id',''))" 2> /dev/null)

if [ -z "$CAMPAIGN_ID" ]; then
  echo "Error creating campaign:"
  echo "$RESPONSE" | python3 -m json.tool 2> /dev/null || echo "$RESPONSE"
  exit 1
fi

echo "Campaign #${CAMPAIGN_ID} created (draft)"

# Send test emails if requested
if [ ${#TEST_EMAILS[@]} -gt 0 ]; then
  echo ""
  echo "Sending test to: ${TEST_EMAILS[*]}"

  EMAIL_JSON="["
  for i in "${!TEST_EMAILS[@]}"; do
    [ $i -gt 0 ] && EMAIL_JSON+=","
    EMAIL_JSON+="\"${TEST_EMAILS[$i]}\""
  done
  EMAIL_JSON+="]"

  TEST_RESPONSE=$(curl -s $AUTH \
    -X POST \
    -H "Content-Type: application/json" \
    -d "{
      \"subscribers\": $EMAIL_JSON,
      \"name\": $(python3 -c "import json; print(json.dumps('$TITLE'))"),
      \"subject\": $(python3 -c "import json; print(json.dumps('$SUBJECT'))"),
      \"lists\": $LIST_JSON,
      \"type\": \"regular\",
      \"content_type\": \"markdown\",
      \"messenger\": \"email\",
      \"body\": $BODY_ESCAPED,
      \"template_id\": 7
    }" \
    "${BASE_URL}/api/campaigns/${CAMPAIGN_ID}/test")

  if echo "$TEST_RESPONSE" | python3 -c "import json,sys; json.load(sys.stdin).get('data')" 2> /dev/null; then
    echo "Test sent. Check the inbox(es) before starting."
  else
    echo "Test failed:"
    echo "$TEST_RESPONSE" | python3 -m json.tool 2> /dev/null || echo "$TEST_RESPONSE"
    exit 1
  fi
fi

# Start campaign if requested
if [ "$START" = true ]; then
  echo ""
  echo "Starting campaign #${CAMPAIGN_ID}..."
  STATUS_RESPONSE=$(curl -s $AUTH \
    -X PUT \
    -H "Content-Type: application/json" \
    -d '{"status": "running"}' \
    "${BASE_URL}/api/campaigns/${CAMPAIGN_ID}/status")

  if echo "$STATUS_RESPONSE" | python3 -c "import json,sys; json.load(sys.stdin).get('data')" 2> /dev/null; then
    echo "Campaign started."
  else
    echo "Failed to start campaign:"
    echo "$STATUS_RESPONSE" | python3 -m json.tool 2> /dev/null || echo "$STATUS_RESPONSE"
    exit 1
  fi
fi

echo ""
echo "Done. Campaign #${CAMPAIGN_ID} URL: ${BASE_URL}/admin/campaigns/${CAMPAIGN_ID}"
